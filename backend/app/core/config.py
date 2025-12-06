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
        env_file = None
        case_sensitive = False


settings = Settings()  # type: ignore

# CORS configuration
CORS_ORIGINS = [
    "https://commonminds.vercel.app",
    "https://commonminds-aloukikjoshis-projects.vercel.app",
    "http://localhost:5173",
    "http://localhost:8000",
]
