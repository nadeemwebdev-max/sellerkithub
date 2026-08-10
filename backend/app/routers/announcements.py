from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from ..database import get_db
from ..models import Announcement, User
from ..schemas import AnnouncementOut, AnnouncementUpdate
from ..auth import get_current_user

router = APIRouter(prefix="/api/announcements", tags=["Announcements"])

@router.get("/active", response_model=Optional[AnnouncementOut])
def get_active_announcement(db: Session = Depends(get_db)):
    announcement = db.query(Announcement).filter(Announcement.is_active == True).first()
    return announcement

@router.get("/", response_model=Optional[AnnouncementOut])
def get_announcement_admin(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    announcement = db.query(Announcement).first()
    return announcement

@router.put("/", response_model=AnnouncementOut)
def update_announcement(data: AnnouncementUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    announcement = db.query(Announcement).first()
    if not announcement:
        announcement = Announcement(
            message=data.message or "Welcome to travelwithnj.com!",
            badge_text=data.badge_text or "NEW TRIP",
            link_text=data.link_text or "Book Now",
            link_url=data.link_url or "/stays",
            bg_gradient=data.bg_gradient or "from-amber-600 to-rose-600",
            is_active=data.is_active if data.is_active is not None else True
        )
        db.add(announcement)
    else:
        if data.message is not None:
            announcement.message = data.message
        if data.badge_text is not None:
            announcement.badge_text = data.badge_text
        if data.link_text is not None:
            announcement.link_text = data.link_text
        if data.link_url is not None:
            announcement.link_url = data.link_url
        if data.bg_gradient is not None:
            announcement.bg_gradient = data.bg_gradient
        if data.is_active is not None:
            announcement.is_active = data.is_active
            
    db.commit()
    db.refresh(announcement)
    return announcement
