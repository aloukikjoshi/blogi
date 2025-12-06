"""
Vercel serverless function handler for FastAPI
"""
from app.main import app

# Export the FastAPI app for Vercel
handler = app
