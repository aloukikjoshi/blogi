from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import os

from app.api.endpoints import auth, users, posts
from app.core.config import settings
from app.middleware.cors import VercelCORSMiddleware

app = FastAPI(
    title="Blogi API",
    description="API for Blogi platform",
    version="0.1.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Add our custom Vercel-compatible CORS middleware
app.add_middleware(VercelCORSMiddleware)

# Include API routes
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["authentication"])
app.include_router(users.router, prefix=f"{settings.API_V1_STR}/users", tags=["users"])
app.include_router(posts.router, prefix=f"{settings.API_V1_STR}/posts", tags=["posts"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Blogi API"}
