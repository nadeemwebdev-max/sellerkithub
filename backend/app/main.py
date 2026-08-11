import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .config import settings
from .database import engine, Base
from .seed import seed_database
from .routers import auth, announcements, posts, stays, leads, seo, reels

# Initialize database schema & seed initial data on boot
Base.metadata.create_all(bind=engine)
seed_database()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="Official API for travelwithnj.com creator platform & stays booking lead engine"
)

# Upload directory setup
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(auth.router)
app.include_router(announcements.router)
app.include_router(posts.router)
app.include_router(stays.router)
app.include_router(leads.router)
app.include_router(reels.router)
app.include_router(seo.router)


@app.get("/")
def root():
    return {
        "status": "online",
        "brand": "travelwithnj.com",
        "creator": settings.INSTAGRAM_HANDLE,
        "instagram": settings.INSTAGRAM_URL,
        "docs": "/docs",
        "sitemap": "/api/seo/sitemap.xml"
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "fastapi"}
