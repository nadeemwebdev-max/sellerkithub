import os
import shutil
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import Reel, User
from ..schemas import ReelOut, ReelCreate, ReelUpdate
from ..auth import get_current_user

router = APIRouter(prefix="/api/reels", tags=["Reels & Video Stories"])

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "uploads")

@router.post("/upload")
def upload_reel_media(file: UploadFile = File(...), current_user: User = Depends(get_current_user)):
    """Uploads reel MP4 or cover image and returns static URL"""
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    extension = os.path.splitext(file.filename)[1] or ".mp4"
    unique_filename = f"reel_{uuid.uuid4().hex[:8]}{extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {
        "url": f"/uploads/{unique_filename}",
        "filename": unique_filename
    }

@router.get("/", response_model=List[ReelOut])

def get_active_reels(db: Session = Depends(get_db)):
    """Public endpoint to fetch active curated reels ordered by order_index / id"""
    return db.query(Reel).filter(Reel.is_active == True).order_by(Reel.order_index.asc(), Reel.id.asc()).all()

@router.get("/admin/all", response_model=List[ReelOut])
def get_all_reels_admin(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Admin endpoint to fetch all reels including inactive ones"""
    return db.query(Reel).order_by(Reel.order_index.asc(), Reel.id.asc()).all()

@router.get("/{reel_id}", response_model=ReelOut)
def get_reel_by_id(reel_id: int, db: Session = Depends(get_db)):
    reel = db.query(Reel).filter(Reel.id == reel_id).first()
    if not reel:
        raise HTTPException(status_code=404, detail="Reel not found")
    return reel

@router.post("/", response_model=ReelOut)
def create_reel(data: ReelCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    reel = Reel(
        title=data.title,
        location=data.location,
        views_count=data.views_count,
        likes_count=data.likes_count,
        thumbnail_url=data.thumbnail_url,
        fallback_thumbnail_url=data.fallback_thumbnail_url or data.thumbnail_url,
        video_url=data.video_url,
        instagram_url=data.instagram_url,
        is_active=data.is_active,
        order_index=data.order_index
    )
    db.add(reel)
    db.commit()
    db.refresh(reel)
    return reel

@router.put("/{reel_id}", response_model=ReelOut)
def update_reel(reel_id: int, data: ReelUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    reel = db.query(Reel).filter(Reel.id == reel_id).first()
    if not reel:
        raise HTTPException(status_code=404, detail="Reel not found")
    
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(reel, key, value)
        
    db.commit()
    db.refresh(reel)
    return reel

@router.delete("/{reel_id}")
def delete_reel(reel_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    reel = db.query(Reel).filter(Reel.id == reel_id).first()
    if not reel:
        raise HTTPException(status_code=404, detail="Reel not found")
    
    db.delete(reel)
    db.commit()
    return {"message": "Reel deleted successfully", "id": reel_id}
