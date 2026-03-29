from fastapi import APIRouter

websocket_router = APIRouter(
    prefix='/websocket',
    tags=['WebSocket']
)

import asyncio
import base64
import json
from typing import Optional

from fastapi import WebSocket, WebSocketDisconnect, Query
from app.services.gemini_live import GeminiLive
from loguru import logger
from app.core.config import settings
from app.core.auth import get_current_user_from_token


@websocket_router.websocket("/gemini/live")
async def websocket_endpoint(
    websocket: WebSocket,
    token: Optional[str] = Query(default=None),
):
    """WebSocket endpoint for Gemini Live (requires Supabase JWT via ?token=)."""
    if not token:
        await websocket.close(code=4001, reason="Missing auth token")
        return

    user = get_current_user_from_token(token)
    if not user:
        await websocket.close(code=4001, reason="Invalid or expired token")
        return

    await websocket.accept()
    logger.info("WebSocket connection accepted for user {}", user.get("id"))

    disconnect_event = asyncio.Event()

    async def _send_bytes_safe(data: bytes) -> None:
        if disconnect_event.is_set():
            return
        try:
            await websocket.send_bytes(data)
        except (RuntimeError, WebSocketDisconnect):
            disconnect_event.set()

    async def _send_json_safe(payload: dict) -> None:
        if disconnect_event.is_set():
            return
        try:
            await websocket.send_json(payload)
        except (RuntimeError, WebSocketDisconnect):
            disconnect_event.set()

    audio_input_queue = asyncio.Queue()
    video_input_queue = asyncio.Queue()
    text_input_queue = asyncio.Queue()

    async def audio_output_callback(data):
        await _send_bytes_safe(data)

    async def audio_interrupt_callback():
        # The event queue handles the JSON message, but we might want to do something else here
        pass

    gemini_client = GeminiLive(
        api_key=settings.GEMINI_API_KEY, model=settings.GEMINI_MODEL, input_sample_rate=16000
    )

    session_task: asyncio.Task | None = None

    async def receive_from_client():
        try:
            while True:
                message = await websocket.receive()
                # Starlette returns this dict (does not raise); receiving again raises RuntimeError.
                if message["type"] == "websocket.disconnect":
                    logger.info("WebSocket disconnected")
                    disconnect_event.set()
                    if session_task and not session_task.done():
                        session_task.cancel()
                    break

                if message.get("bytes"):
                    await audio_input_queue.put(message["bytes"])
                elif message.get("text"):
                    text = message["text"]
                    try:
                        payload = json.loads(text)
                        if not isinstance(payload, dict):
                            pass
                        elif payload.get("type") == "config":
                            logger.info(
                                "Client session config frame | metadata={}",
                                payload.get("metadata", payload),
                            )
                            continue
                        elif payload.get("type") == "image":
                            logger.info(f"Received image chunk from client: {len(payload['data'])} base64 chars")
                            image_data = base64.b64decode(payload["data"])
                            await video_input_queue.put(image_data)
                            continue
                        elif payload.get("type") == "text":
                            await text_input_queue.put(payload.get("content") or "")
                            continue
                    except json.JSONDecodeError:
                        pass

                    await text_input_queue.put(text)
        except WebSocketDisconnect:
            logger.info("WebSocket disconnected")
            disconnect_event.set()
            if session_task and not session_task.done():
                session_task.cancel()
        except Exception as e:
            logger.error(f"Error receiving from client: {e}")
            disconnect_event.set()
            if session_task and not session_task.done():
                session_task.cancel()

    async def run_session():
        try:
            async for event in gemini_client.start_session(
                audio_input_queue=audio_input_queue,
                video_input_queue=video_input_queue,
                text_input_queue=text_input_queue,
                audio_output_callback=audio_output_callback,
                audio_interrupt_callback=audio_interrupt_callback,
            ):
                if disconnect_event.is_set():
                    break
                if event:
                    await _send_json_safe(event)
        except asyncio.CancelledError:
            raise

    session_task = asyncio.create_task(run_session())
    receive_task = asyncio.create_task(receive_from_client())

    try:
        await session_task
    except asyncio.CancelledError:
        logger.debug("Gemini session task cancelled (client gone)")
    except Exception as e:
        import traceback

        logger.error(f"Error in Gemini session: {type(e).__name__}: {e}\n{traceback.format_exc()}")
    finally:
        receive_task.cancel()
        try:
            await receive_task
        except asyncio.CancelledError:
            pass
        try:
            await websocket.close()
        except Exception:
            pass
