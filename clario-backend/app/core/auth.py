from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.core.supabase import get_supabase_user

bearer_scheme = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    """Verify Supabase JWT and return the authenticated user dict."""
    user = get_supabase_user(credentials.credentials)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


def get_current_user_from_token(token: str) -> dict | None:
    """Verify a raw JWT string — used for WebSocket auth via query param."""
    return get_supabase_user(token)
