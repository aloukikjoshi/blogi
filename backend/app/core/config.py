import os
from typing import List
from pydantic_settings import BaseSettings
from pydantic import field_validator
from dotenv import load_dotenv
import json

# Get environment mode
ENV = os.getenv("ENV", "development")

# Load appropriate .env file based on environment
if ENV == "production":
    env_file = ".env.production"
elif ENV == "development":
    env_file = ".env.development"
else:
    env_file = ".env"  # fallback

# Try environment-specific file first, then fall back to default .env
if os.path.exists(env_file):
    load_dotenv(env_file)
else:
    load_dotenv()

class Settings(BaseSettings):
    # Environment info
    ENV: str = ENV
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "commonminds API"
    
    # Database
    # Provide a sensible fallback so instantiating Settings() won't fail if env var is missing.
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    
    # JWT
    # Provide a fallback secret for local development; override via env in production.
    SECRET_KEY: str = os.getenv("SECRET_KEY", "change-me-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    CORS_ORIGINS_STR: str = ""
    CORS_ORIGINS: List[str] = []
    
    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v, info):
        cors_str = info.data.get("CORS_ORIGINS_STR", "")
        if isinstance(cors_str, str):
            if cors_str.startswith("["):
                # JSON-formatted list
                try:
                    return json.loads(cors_str)
                except json.JSONDecodeError:
                    return []
            else:
                # Comma-separated string
                return [i.strip() for i in cors_str.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return []

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False

settings = Settings()

# Log current environment for debugging during startup
print(f"Running in {settings.ENV} environment with CORS origins: {settings.CORS_ORIGINS}")
