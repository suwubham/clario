"""Voice session rows — PostgREST calls for voice_sessions table.

Run supabase/sql/voice_sessions.sql in the Supabase SQL editor first.
"""
import uuid
from datetime import datetime, timezone

from loguru import logger

from app.core.supabase import postgrest

TABLE = "voice_sessions"


def create_session(user_id: str) -> dict | None:
    """Insert a new session with a random id; returns the inserted row or None on failure."""
    session_id = str(uuid.uuid4())
    status, data = postgrest(
        "POST",
        TABLE,
        body={"session_id": session_id, "user_id": user_id},
        prefer="return=representation",
    )
    if status in (200, 201) and data and isinstance(data, list) and len(data) > 0:
        return data[0]
    logger.warning(
        "create_session PostgREST POST {} → {} body={}",
        TABLE,
        status,
        data,
    )
    return None


def get_session_for_user(session_id: str, user_id: str) -> dict | None:
    """Return the voice_sessions row if it exists and belongs to user_id."""
    status, data = postgrest(
        "GET",
        TABLE,
        params={
            "session_id": f"eq.{session_id}",
            "user_id": f"eq.{user_id}",
            "select": "*",
        },
    )
    if status == 200 and data and isinstance(data, list) and len(data) > 0:
        return data[0]
    return None


def list_sessions_for_user(user_id: str) -> list[dict] | None:
    """Return all voice_sessions rows for user_id, newest first. None on PostgREST error."""
    status, data = postgrest(
        "GET",
        TABLE,
        params={
            "user_id": f"eq.{user_id}",
            "select": "*",
            "order": "created_at.desc",
        },
    )
    if status == 200 and isinstance(data, list):
        return data
    return None


def end_session(session_id: str, user_id: str, duration_seconds: int) -> bool:
    """Set ended_at and duration_seconds when the live voice WebSocket closes."""
    if not get_session_for_user(session_id, user_id):
        logger.warning(
            "end_session: session not found or forbidden | session_id={}",
            session_id,
        )
        return False

    ended_at = datetime.now(timezone.utc).isoformat()
    status, data = postgrest(
        "PATCH",
        TABLE,
        params={
            "session_id": f"eq.{session_id}",
            "user_id": f"eq.{user_id}",
        },
        body={
            "ended_at": ended_at,
            "duration_seconds": max(0, int(duration_seconds)),
        },
        prefer="return=representation",
    )
    if status == 200 and data:
        return True
    logger.warning(
        "end_session PostgREST PATCH {} → {} body={}",
        TABLE,
        status,
        data,
    )
    return False


def save_call_report(session_id: str, user_id: str, report: dict) -> bool:
    """Persist structured JSON to voice_sessions.call_report (service role)."""
    if not get_session_for_user(session_id, user_id):
        logger.warning(
            "save_call_report: session not found or forbidden | session_id={}",
            session_id,
        )
        return False

    status, data = postgrest(
        "PATCH",
        TABLE,
        params={
            "session_id": f"eq.{session_id}",
            "user_id": f"eq.{user_id}",
        },
        body={"call_report": report},
        prefer="return=representation",
    )
    if status == 200 and data:
        return True
    logger.warning(
        "save_call_report PostgREST PATCH {} → {} body={}",
        TABLE,
        status,
        data,
    )
    return False
