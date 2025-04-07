from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
import json
import os

class VercelCORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Get CORS origins from environment
        origins_str = os.getenv("CORS_ORIGINS", "[]")
        allowed_origins = json.loads(origins_str)
        
        # Get the origin from the request
        origin = request.headers.get("origin")
        
        # Handle preflight OPTIONS request
        if request.method == "OPTIONS":
            headers = {
                "Access-Control-Allow-Origin": origin if origin in allowed_origins else "",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Max-Age": "600",  # Cache preflight for 10 minutes
            }
            return JSONResponse(content={}, status_code=200, headers=headers)
            
        # Process the request
        response = await call_next(request)
        
        # Add CORS headers to the response
        if origin in allowed_origins:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Credentials"] = "true"
            
        return response