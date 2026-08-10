from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import re
from ..database import get_db
from ..models import BlogPost, User
from ..schemas import BlogPostOut, BlogPostCreate, BlogPostUpdate
from ..auth import get_current_user

router = APIRouter(prefix="/api/posts", tags=["Blog Posts"])

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    text = re.sub(r'^-+|-+$', '', text)
    return text

@router.get("/", response_model=List[BlogPostOut])
def get_published_posts(
    category: Optional[str] = None,
    tag: Optional[str] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    query = db.query(BlogPost).filter(BlogPost.is_published == True)
    if category and category.lower() != "all":
        query = query.filter(BlogPost.category.ilike(f"%{category}%"))
    if tag:
        query = query.filter(BlogPost.tags.ilike(f"%{tag}%"))
    if search:
        query = query.filter(
            (BlogPost.title.ilike(f"%{search}%")) | 
            (BlogPost.excerpt.ilike(f"%{search}%")) |
            (BlogPost.content.ilike(f"%{search}%"))
        )
    return query.order_by(BlogPost.created_at.desc()).offset(skip).limit(limit).all()

@router.get("/admin/all", response_model=List[BlogPostOut])
def get_all_posts_admin(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(BlogPost).order_by(BlogPost.created_at.desc()).all()

@router.get("/{slug}", response_model=BlogPostOut)
def get_post_by_slug(slug: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Travel story / post not found")
    
    # Increment view count
    post.views += 1
    db.commit()
    db.refresh(post)
    return post

@router.post("/", response_model=BlogPostOut)
def create_post(data: BlogPostCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    slug = data.slug or slugify(data.title)
    # Check if slug exists
    existing = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if existing:
        slug = f"{slug}-{int(BlogPost.id or 1)}"
        
    post = BlogPost(
        title=data.title,
        slug=slug,
        excerpt=data.excerpt,
        content=data.content,
        cover_image=data.cover_image,
        category=data.category,
        tags=data.tags,
        read_time=data.read_time,
        is_published=data.is_published,
        seo_title=data.seo_title or data.title,
        seo_description=data.seo_description or data.excerpt[:160]
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

@router.put("/{post_id}", response_model=BlogPostOut)
def update_post(post_id: int, data: BlogPostUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    update_data = data.model_dump(exclude_unset=True)
    for field, val in update_data.items():
        setattr(post, field, val)
        
    db.commit()
    db.refresh(post)
    return post

@router.delete("/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    db.delete(post)
    db.commit()
    return {"message": "Blog post deleted successfully", "id": post_id}
