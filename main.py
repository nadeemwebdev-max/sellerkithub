import os
import sys

# Add current folder and backend folder to sys.path
CURRENT_DIR = os.path.abspath(os.path.dirname(__file__))
BACKEND_DIR = os.path.join(CURRENT_DIR, "backend")

for path in [CURRENT_DIR, BACKEND_DIR]:
    if path not in sys.path:
        sys.path.insert(0, path)

try:
    from backend.app.main import app
except ImportError:
    from app.main import app

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
