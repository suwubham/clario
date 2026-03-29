"""Supabase auth helpers using the REST API via httpx."""
import httpx
from app.core.config import settings

SUPABASE_AUTH_URL = f"{settings.SUPABASE_URL}/auth/v1/user"
_HEADERS = {
    "apikey": settings.SUPABASE_SECRET_KEY,
}


def get_supabase_user(token: str) -> dict | None:
    """Verify a Supabase JWT by calling the /auth/v1/user endpoint.
    Returns the user dict on success, None on failure.
    """
    try:
        response = httpx.get(
            SUPABASE_AUTH_URL,
            headers={**_HEADERS, "Authorization": f"Bearer {token}"},
            timeout=5.0,
        )
        if response.status_code == 200:
            return response.json()
        return None
    except httpx.RequestError:
        return None
