import os
from typing import List
from pydantic_settings import BaseSettings
import json

# Get environment mode
ENV = os.getenv("ENV", "development")

# Only load .env files in development, not in production
if ENV != "production":
    from dotenv import load_dotenv
    
    # Load appropriate .env file based on environment
    if ENV == "development":
        env_file = ".env.development"
    else:
        env_file = ".env"
    
    # Try environment-specific file first, then fall back to default .env
    if os.path.exists(env_file):
        load_dotenv(env_file)
    else:
        load_dotenv()

def parse_cors_origins(cors_str: str) -> List[str]:
    """Parse CORS origins from various formats"""
    if not cors_str:
        return ["*"]
    
    cors_str = cors_str.strip()
    
    # JSON-formatted list: ["http://...", "http://..."]
    if cors_str.startswith("[") and cors_str.endswith("]"):
        try:
            parsed = json.loads(cors_str)
            if isinstance(parsed, list) and parsed:
                return parsed
        except (json.JSONDecodeError, ValueError):
            pass
    
    # Comma-separated: "http://localhost:3000, https://example.com"
    if "," in cors_str:
        urls = [i.strip() for i in cors_str.split(",") if i.strip()]
        if urls:
            return urls
    
    # Single URL or wildcard
    if cors_str and cors_str != "*":
        return [cors_str]
    
    # Fallback
    return ["*"]

class Settings(BaseSettings):
    # Environment info
    ENV: str = ENV
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "commonminds API"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    
    # JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "change-me-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS - Plain string that we'll parse
    CORS_ORIGINS_STR: str = os.getenv("CORS_ORIGINS", "*")
    CORS_ORIGINS: List[str] = ["*"]  # Initialize with default

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False

settings = Settings()

# Parse CORS origins after settings initialization
try:
    settings.CORS_ORIGINS = parse_cors_origins(settings.CORS_ORIGINS_STR)
except Exception as e:
    print(f"Error parsing CORS origins: {e}")
    settings.CORS_ORIGINS = ["*"]

# Log current environment for debugging during startup
print(f"Running in {settings.ENV} environment with CORS origins: {settings.CORS_ORIGINS}")
