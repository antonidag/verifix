import os
from pathlib import Path
from dotenv import load_dotenv
# Load environment variables from .env file in the backend directory
env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from db import init
from api import router
import vertexai

# Initialize Vertex AI with project and location
project_id = os.getenv('GOOGLE_CLOUD_PROJECT')
location = os.getenv('VERTEXAI_LOCATION', 'us-central1')
vertexai.init(project=project_id, location=location)

app = FastAPI(
    title="Verfi AI API",
    description="""
    API for managing and retrieving manufacturing solutions and troubleshooting information.
    This system helps technicians find solutions to common manufacturing problems and document new solutions.
    """,
    version="1.0.0",
    contact={
        "name": "Manufacturing Support Team",
        "email": "antonidag@hotmail.com",
    },
    license_info={
        "name": "Proprietary",
        "url": "https://example.com/license",
    },
)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Firestore database
init()

# Include the router with version prefix
app.include_router(
    router,
    prefix="/api/v1",
)

# Serve frontend
frontend_path = Path(__file__).parent / "static"
app.mount("/static", StaticFiles(directory=frontend_path), name="static")

# Fallback route for SPA (e.g., /, /about, /dashboard)
@app.get("/{full_path:path}")
async def spa_fallback(full_path: str):
    index_file = frontend_path / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    return {"error": "index.html not found"}