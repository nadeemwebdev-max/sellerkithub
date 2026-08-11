from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, BlogPost, StayExperience, LeadInquiry, Announcement, Reel
from ..schemas import UserLogin, TokenResponse, UserProfile, DashboardStats
from ..auth import verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/login", response_model=TokenResponse)
def login_json(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        (User.username == user_data.username) | (User.email == user_data.username)
    ).first()
    
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.username, "id": user.id})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "username": user.username,
        "full_name": user.full_name
    }

@router.post("/token", response_model=TokenResponse)
def login_form(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(
        (User.username == form_data.username) | (User.email == form_data.username)
    ).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.username, "id": user.id})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "username": user.username,
        "full_name": user.full_name
    }

@router.get("/me", response_model=UserProfile)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/stats", response_model=DashboardStats)
def get_admin_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    total_posts = db.query(BlogPost).count()
    total_stays = db.query(StayExperience).filter(StayExperience.is_active == True).count()
    total_leads = db.query(LeadInquiry).count()
    new_leads = db.query(LeadInquiry).filter(LeadInquiry.status == "New").count()
    total_reels = db.query(Reel).count()
    active_banner = db.query(Announcement).filter(Announcement.is_active == True).first() is not None

    return {
        "total_posts": total_posts,
        "total_stays": total_stays,
        "total_leads": total_leads,
        "new_leads": new_leads,
        "total_reels": total_reels,
        "announcement_active": active_banner
    }

