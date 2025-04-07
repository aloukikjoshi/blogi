from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
import json
import os

class VercelCORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        origins_str = os.getenv("CORS_ORIGINS", "[]")
        allowed_origins = json.loads(origins_str)
        origin = request.headers.get("origin")

        if request.method == "OPTIONS":
            headers = {
                "Access-Control-Allow-Origin": origin if origin in allowed_origins else "",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Max-Age": "600",
            }
            return JSONResponse(content={}, status_code=200, headers=headers)

        response = await call_next(request)

        if origin in allowed_origins:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Credentials"] = "true"

        return response