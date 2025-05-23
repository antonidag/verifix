from fastapi import FastAPI
from db import init_db
from api import router

app = FastAPI(
    title="Manufacturing Solutions API",
    description="""
    API for managing and retrieving manufacturing solutions and troubleshooting information.
    This system helps technicians find solutions to common manufacturing problems and document new solutions.
    """,
    version="1.0.0",
    contact={
        "name": "Manufacturing Support Team",
        "email": "support@manufacturing.example.com",
    },
    license_info={
        "name": "Proprietary",
        "url": "https://example.com/license",
    },
)

# Initialize database
init_db()

# Include the router with version prefix
app.include_router(
    router,
    prefix="/api/v1",
    tags=["solutions"]
)
