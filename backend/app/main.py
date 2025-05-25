from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import init_db
from api import router

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

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # React's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
init_db()

# Include the router with version prefix
app.include_router(
    router,
    prefix="/api/v1",
)
