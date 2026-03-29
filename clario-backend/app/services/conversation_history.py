"""Conversation rows — PostgREST calls for conversation_history table.

Run supabase/sql/conversation_history.sql in the Supabase SQL editor first.
"""
from typing import TypedDict

from loguru import logger

from app.core.supabase import postgrest
from app.services.voice_session import get_session_for_user

TABLE = "conversation_history"
_VALID_ROLES = frozenset({"user", "assistant", "system"})


class ConversationRow(TypedDict):
    session_id: str
    user_id: str
    role: str
    message: str


def _validate_and_build_payload(
    rows: list[ConversationRow],
) -> list[dict[str, str]] | None:
    """
    Build PostgREST body from client rows. Returns None if rows are invalid
    (mixed session, bad role). Empty list means only blank messages after trim.
    """
    sid, uid = rows[0]["session_id"], rows[0]["user_id"]
    payload: list[dict[str, str]] = []
    for i, row in enumerate(rows):
        if row["session_id"] != sid or row["user_id"] != uid:
            logger.warning(
                "bulk_insert: row {} mixes session_id or user_id",
                i,
            )
            return None
        role = row["role"]
        if role not in _VALID_ROLES:
            logger.warning("bulk_insert: invalid role at row {}", i)
            return None
        text = (row["message"] or "").strip()
        if not text:
            continue
        payload.append(
            {
                "session_id": sid,
                "user_id": uid,
                "role": role,
                "message": text,
            }
        )
    return payload


def bulk_insert_messages(rows: list[ConversationRow]) -> bool:
    """Insert all rows in one PostgREST request; validates session ownership once."""
    if not rows:
        return True

    sid, uid = rows[0]["session_id"], rows[0]["user_id"]
    if not get_session_for_user(sid, uid):
        logger.warning(
            "bulk_insert: session not found or forbidden | session_id={}",
            sid,
        )
        return False

    payload = _validate_and_build_payload(rows)
    if payload is None:
        return False
    if not payload:
        return True

    status, data = postgrest(
        "POST",
        TABLE,
        body=payload,
        prefer="return=representation",
    )
    if status in (200, 201) and data is not None:
        return True

    logger.warning(
        "bulk_insert PostgREST POST {} → {} body={}",
        TABLE,
        status,
        data,
    )
    return False


def list_messages_for_session(session_id: str, user_id: str) -> list[dict] | None:
    """Return conversation rows for session_id + user_id, oldest first. None on PostgREST error."""
    status, data = postgrest(
        "GET",
        TABLE,
        params={
            "session_id": f"eq.{session_id}",
            "user_id": f"eq.{user_id}",
            "select": "role,message,created_at",
            "order": "created_at.asc",
        },
    )
    if status == 200 and isinstance(data, list):
        return data
    return None


def get_messages_for_session(session_id: str, user_id: str) -> list[dict] | None:
    """Return conversation rows for the session, oldest first, or None if not owned."""
    if not get_session_for_user(session_id, user_id):
        return None
    return list_messages_for_session(session_id, user_id)
