import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "travelwithnj.kalebuddelogistics.in API"
    PROJECT_VERSION: str = "1.0.0"
    
    # Database: Supports PostgreSQL (e.g. postgresql://user:password@localhost/travelwithnj)
    # Default fallback to sqlite for rapid local development
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:///./travelwithnj.db"
    )
    
    # JWT Auth
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-creator-key-travelwithnj-2026-secure")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Default Admin Credentials for Creator (@travel_with.nj)
    ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "travelwithnj@gmail.com")
    ADMIN_USERNAME: str = os.getenv("ADMIN_USERNAME", "travel_with.nj")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "TravelNJ@2026")
    
    # Site details for SEO & WhatsApp
    SITE_URL: str = os.getenv("SITE_URL", "https://travelwithnj.kalebuddelogistics.in")
    DEFAULT_WHATSAPP_NUMBER: str = os.getenv("DEFAULT_WHATSAPP_NUMBER", "+919876543210")
    INSTAGRAM_HANDLE: str = "@travel_with.nj"
    INSTAGRAM_URL: str = "https://www.instagram.com/travel_with.nj"

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
