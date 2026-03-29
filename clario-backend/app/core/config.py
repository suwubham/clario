from pydantic import AliasChoices, Field
from pydantic_settings import BaseSettings
from typing import Optional
from pathlib import Path

# Get the project root directory (two levels up from this file)
PROJECT_ROOT = Path(__file__).parent.parent.parent


class Settings(BaseSettings):
    # Database settings
    # POSTGRES_USER: str 
    # POSTGRES_PASSWORD: str
    # POSTGRES_HOST: str
    # POSTGRES_PORT: int
    # POSTGRES_DB: str 
    
    # # Redis settings
    # REDIS_HOST: str = "redis"
    # REDIS_PORT: int = 6379
    # REDIS_DB: int = 0
    # REDIS_PASSWORD: Optional[str] = None
    
    # Supabase settings
    SUPABASE_URL: str
    SUPABASE_SECRET_KEY: str

    # Gemini settings
    GEMINI_API_KEY: str
    GEMINI_MODEL: str = "gemini-3.1-flash-live-preview"

    # Application settings
    DEBUG: bool = False
    SECRET_KEY: Optional[str] = None

    model_config = {
        "env_file": PROJECT_ROOT / ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": True,
        "extra": "ignore",
    }


settings = Settings()