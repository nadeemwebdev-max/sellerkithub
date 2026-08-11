import os
import re
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

# Handle SQLite vs PostgreSQL engine arguments and Render/Supabase/Neon postgres:// URL formats
raw_database_url = settings.DATABASE_URL.strip()

if raw_database_url.startswith("postgres://"):
    raw_database_url = raw_database_url.replace("postgres://", "postgresql://", 1)

def build_engine(url: str):
    engine_kwargs = {}
    if url.startswith("sqlite"):
        engine_kwargs["connect_args"] = {"check_same_thread": False}
    else:
        # PostgreSQL cloud production optimizations
        engine_kwargs["pool_pre_ping"] = True      # Auto-reconnect dropped idle connections
        engine_kwargs["pool_recycle"] = 300       # Recycle connections every 5 minutes
        engine_kwargs["pool_size"] = 10           # Base connection pool
        engine_kwargs["max_overflow"] = 20        # Handle traffic spikes
        engine_kwargs["connect_args"] = {"connect_timeout": 10}

    return create_engine(url, **engine_kwargs, echo=False)

try:
    engine = build_engine(raw_database_url)
    # Test connection on startup
    with engine.connect() as conn:
        pass
    print(f"Database connected successfully with {raw_database_url.split('@')[-1] if '@' in raw_database_url else 'SQLite'}")
except Exception as e:
    print(f"Primary database connection warning: {e}")
    # If a cloud PostgreSQL hostname is temporarily unresolved (e.g. cross-region Render internal URL), fallback to SQLite so the API stays healthy
    if not raw_database_url.startswith("sqlite"):
        print("Falling back to local SQLite database to prevent downtime...")
        engine = build_engine("sqlite:///./travelwithnj.db")
    else:
        engine = build_engine(raw_database_url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
