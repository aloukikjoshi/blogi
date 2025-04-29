from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
import json
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class VercelCORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        origins_str = os.getenv("CORS_ORIGINS", "[]")
        logger.info(f"CORS_ORIGINS from env: {origins_str}")
        
        try:
            allowed_origins = json.loads(origins_str)
            logger.info(f"Parsed allowed origins: {allowed_origins}")
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse CORS_ORIGINS: {e}")
            allowed_origins = []
            
        origin = request.headers.get("origin")
        logger.info(f"Request origin: {origin}")
        logger.info(f"Is origin allowed: {origin in allowed_origins}")
        
        if request.method == "OPTIONS":
            headers = {
                "Access-Control-Allow-Origin": origin if origin in allowed_origins else "",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Max-Age": "600",
            }
            return JSONResponse(content={}, status_code=200, headers=headers)

        try:
            response = await call_next(request)
            
            if origin in allowed_origins:
                response.headers["Access-Control-Allow-Origin"] = origin
                response.headers["Access-Control-Allow-Credentials"] = "true"
                
            return response
            
        except Exception as e:
            # Create a response for the error case
            error_response = JSONResponse(
                status_code=500,
                content={"detail": "Internal Server Error"}
            )
            
            # Apply CORS headers even to error responses
            if origin in allowed_origins:
                error_response.headers["Access-Control-Allow-Origin"] = origin
                error_response.headers["Access-Control-Allow-Credentials"] = "true"
                
            return error_response