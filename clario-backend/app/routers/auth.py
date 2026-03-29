from fastapi import APIRouter, Depends
from app.core.auth import get_current_user

auth_router = APIRouter(prefix="/auth", tags=["Auth"])


@auth_router.get("/me")
def me(user: dict = Depends(get_current_user)):
    """Return the currently authenticated user's info."""
    return {
        "id": user.get("id"),
        "email": user.get("email"),
        "created_at": user.get("created_at"),
    }
