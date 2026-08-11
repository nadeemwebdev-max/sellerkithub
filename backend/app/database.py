from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

# Handle SQLite vs PostgreSQL engine arguments and Render/Supabase/Neon postgres:// URL formats
database_url = settings.DATABASE_URL
if database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

engine_kwargs = {}

if database_url.startswith("sqlite"):
    engine_kwargs["connect_args"] = {"check_same_thread": False}
else:
    # PostgreSQL cloud production optimizations
    engine_kwargs["pool_pre_ping"] = True      # Auto-reconnect dropped idle connections
    engine_kwargs["pool_recycle"] = 300       # Recycle connections every 5 minutes
    engine_kwargs["pool_size"] = 10           # Base connection pool
    engine_kwargs["max_overflow"] = 20        # Handle spikes in traffic

engine = create_engine(
    database_url,
    **engine_kwargs,
    echo=False
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
