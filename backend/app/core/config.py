import os
from typing import List

from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):

    # Basic API metadata
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "commonminds API"

    # Database (required in production)
    DATABASE_URL: str

    # JWT (required in production)
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Hard-coded CORS origins (exclude from env parsing)
    CORS_ORIGINS: List[str] = Field(
        default=[
            "https://commonminds.vercel.app",
            "https://commonminds-aloukikjoshis-projects.vercel.app",
            "http://localhost:8000",
            "http://localhost:5173",
        ],
        exclude=True,  # Don't try to read from environment
    )

    class Config:
        # Do NOT load any .env files; only real environment variables
        env_file = None
        case_sensitive = False


settings = Settings()  # type: ignore
