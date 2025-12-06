import os
from typing import List

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "commonminds API"
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        # Do NOT load any .env files; only real environment variables
        env_file = None
        case_sensitive = False


settings = Settings()  # type: ignore

# Hard-coded CORS origins - set after Settings initialization to avoid env parsing
settings.CORS_ORIGINS = [
    "https://commonminds.vercel.app",
    "https://commonminds-aloukikjoshis-projects.vercel.app"
]
