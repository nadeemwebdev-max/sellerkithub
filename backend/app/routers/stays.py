from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import re
from ..database import get_db
from ..models import StayExperience, User
from ..schemas import StayExperienceOut, StayExperienceCreate, StayExperienceUpdate
from ..auth import get_current_user

router = APIRouter(prefix="/api/stays", tags=["Stays & Experiences"])

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    text = re.sub(r'^-+|-+$', '', text)
    return text

@router.get("/", response_model=List[StayExperienceOut])
def get_active_stays(
    location: Optional[str] = None,
    category: Optional[str] = None,
    search: Optional[str] = None,
    featured_only: bool = False,
    db: Session = Depends(get_db)
):
    query = db.query(StayExperience).filter(StayExperience.is_active == True)
    
    if location and location.lower() != "all":
        query = query.filter(StayExperience.location.ilike(f"%{location}%"))
    if category and category.lower() != "all":
        query = query.filter(StayExperience.category.ilike(f"%{category}%"))
    if featured_only:
        query = query.filter(StayExperience.is_featured == True)
    if search:
        query = query.filter(
            (StayExperience.title.ilike(f"%{search}%")) |
            (StayExperience.location.ilike(f"%{search}%")) |
            (StayExperience.description.ilike(f"%{search}%")) |
            (StayExperience.amenities.ilike(f"%{search}%"))
        )
    return query.order_by(StayExperience.is_featured.desc(), StayExperience.rating.desc()).all()

@router.get("/admin/all", response_model=List[StayExperienceOut])
def get_all_stays_admin(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(StayExperience).order_by(StayExperience.created_at.desc()).all()

@router.get("/{slug}", response_model=StayExperienceOut)
def get_stay_by_slug(slug: str, db: Session = Depends(get_db)):
    stay = db.query(StayExperience).filter(StayExperience.slug == slug).first()
    if not stay:
        raise HTTPException(status_code=404, detail="Stay or experience not found")
    return stay

@router.post("/", response_model=StayExperienceOut)
def create_stay(data: StayExperienceCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    slug = data.slug or slugify(f"{data.title}-{data.location}")
    existing = db.query(StayExperience).filter(StayExperience.slug == slug).first()
    if existing:
        slug = f"{slug}-1"

    stay = StayExperience(
        title=data.title,
        slug=slug,
        location=data.location,
        category=data.category,
        price_per_night=data.price_per_night,
        price_unit=data.price_unit,
        rating=data.rating,
        review_count=data.review_count,
        whatsapp_number=data.whatsapp_number,
        cover_image=data.cover_image,
        gallery_images=data.gallery_images or "",
        amenities=data.amenities,
        description=data.description,
        highlights=data.highlights,
        is_featured=data.is_featured,
        is_active=data.is_active
    )
    db.add(stay)
    db.commit()
    db.refresh(stay)
    return stay

@router.put("/{stay_id}", response_model=StayExperienceOut)
def update_stay(stay_id: int, data: StayExperienceUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    stay = db.query(StayExperience).filter(StayExperience.id == stay_id).first()
    if not stay:
        raise HTTPException(status_code=404, detail="Stay not found")
    
    update_data = data.model_dump(exclude_unset=True)
    for field, val in update_data.items():
        setattr(stay, field, val)
        
    db.commit()
    db.refresh(stay)
    return stay

@router.delete("/{stay_id}")
def delete_stay(stay_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    stay = db.query(StayExperience).filter(StayExperience.id == stay_id).first()
    if not stay:
        raise HTTPException(status_code=404, detail="Stay not found")
    
    db.delete(stay)
    db.commit()
    return {"message": "Stay deleted successfully", "id": stay_id}
