import os
from typing import List
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # Environment
    ENV: str = "production"
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "commonminds API"
    
    # Database - required in production
    DATABASE_URL: str
    
    # JWT - required in production
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        case_sensitive = False


# Initialize settings
settings = Settings()

# Parse CORS origins from environment variable
cors_env = os.getenv("CORS_ORIGINS", "*")

if cors_env and cors_env.strip():
    cors_str = cors_env.strip()
    
    # Comma-separated URLs
    if "," in cors_str:
        settings.CORS_ORIGINS = [url.strip() for url in cors_str.split(",") if url.strip()]
    # Single URL
    elif cors_str != "*":
        settings.CORS_ORIGINS = [cors_str]
    # Wildcard
    else:
        settings.CORS_ORIGINS = ["*"]
else:
    settings.CORS_ORIGINS = ["*"]

# Log for debugging
print(f"Environment: {settings.ENV}")
print(f"CORS Origins: {settings.CORS_ORIGINS}")
print(f"Database: {settings.DATABASE_URL[:20]}..." if settings.DATABASE_URL else "No DB")
