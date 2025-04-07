import os
from typing import List
from pydantic_settings import BaseSettings
from pydantic import PostgresDsn, field_validator
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
    PROJECT_NAME: str = "Blogi API"
    
    # Database
    DATABASE_URL: PostgresDsn = os.getenv("DATABASE_URL")
    
    # JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    # CORS
    CORS_ORIGINS_STR: str = os.getenv("CORS_ORIGINS")
    CORS_ORIGINS: List[str] = []
    
    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v, info):
        if isinstance(v, str):
            if v.startswith("["):
                # JSON-formatted list
                try:
                    return json.loads(v)
                except json.JSONDecodeError:
                    return []
            else:
                # Comma-separated string
                return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return []

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()

# Log current environment for debugging during startup
print(f"Running in {settings.ENV} environment with CORS origins: {settings.CORS_ORIGINS}")
