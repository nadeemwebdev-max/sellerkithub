from pydantic import BaseModel, EmailStr
from typing import Optional, List
import datetime

# ---- User & Auth ----
class UserLogin(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    username: str
    full_name: str

class UserProfile(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    is_admin: bool

    class Config:
        from_attributes = True


# ---- Announcement ----
class AnnouncementBase(BaseModel):
    message: str
    badge_text: str = "NEW TRIP"
    link_text: str = "Book Slot"
    link_url: str = "/stays"
    bg_gradient: str = "from-amber-600 to-rose-600"
    is_active: bool = True

class AnnouncementCreate(AnnouncementBase):
    pass

class AnnouncementUpdate(BaseModel):
    message: Optional[str] = None
    badge_text: Optional[str] = None
    link_text: Optional[str] = None
    link_url: Optional[str] = None
    bg_gradient: Optional[str] = None
    is_active: Optional[bool] = None

class AnnouncementOut(AnnouncementBase):
    id: int
    updated_at: Optional[datetime.datetime] = None

    class Config:
        from_attributes = True


# ---- Blog Post ----
class BlogPostBase(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    cover_image: str
    category: str = "Travel Guide"
    tags: str = "Hubli,Dandeli,Waterfalls"
    read_time: str = "5 min read"
    is_published: bool = True
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[str] = None
    read_time: Optional[str] = None
    is_published: Optional[bool] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class BlogPostOut(BlogPostBase):
    id: int
    views: int
    created_at: datetime.datetime
    updated_at: Optional[datetime.datetime] = None

    class Config:
        from_attributes = True


# ---- Stay Experience ----
class StayExperienceBase(BaseModel):
    title: str
    slug: str
    location: str
    category: str = "Resort"
    price_per_night: int
    price_unit: str = "per person / night with food"
    rating: float = 4.9
    review_count: int = 80
    whatsapp_number: str = "+919876543210"
    cover_image: str
    gallery_images: Optional[str] = ""
    amenities: str = "Kayaking, Rafting, Campfire, Meals"
    description: str
    highlights: str = "NJ Verified, Direct Deal"
    is_featured: bool = True
    is_active: bool = True

class StayExperienceCreate(StayExperienceBase):
    pass

class StayExperienceUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    location: Optional[str] = None
    category: Optional[str] = None
    price_per_night: Optional[int] = None
    price_unit: Optional[str] = None
    rating: Optional[float] = None
    review_count: Optional[int] = None
    whatsapp_number: Optional[str] = None
    cover_image: Optional[str] = None
    gallery_images: Optional[str] = None
    amenities: Optional[str] = None
    description: Optional[str] = None
    highlights: Optional[str] = None
    is_featured: Optional[bool] = None
    is_active: Optional[bool] = None

class StayExperienceOut(StayExperienceBase):
    id: int
    created_at: datetime.datetime
    updated_at: Optional[datetime.datetime] = None

    class Config:
        from_attributes = True


# ---- Lead Inquiry ----
class LeadInquiryCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    destination_or_stay: str
    travel_dates: Optional[str] = None
    number_of_guests: int = 2
    message: Optional[str] = None

class LeadInquiryUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class LeadInquiryOut(LeadInquiryCreate):
    id: int
    status: str
    notes: Optional[str] = None
    created_at: datetime.datetime

    class Config:
        from_attributes = True


# ---- Reels ----
class ReelBase(BaseModel):
    title: str
    location: str = "Hubli-Dharwad & Western Ghats"
    views_count: str = "100K"
    likes_count: str = "10K"
    thumbnail_url: str
    fallback_thumbnail_url: Optional[str] = None
    video_url: Optional[str] = None
    instagram_url: str
    is_active: bool = True
    order_index: int = 0

class ReelCreate(ReelBase):
    pass

class ReelUpdate(BaseModel):
    title: Optional[str] = None
    location: Optional[str] = None
    views_count: Optional[str] = None
    likes_count: Optional[str] = None
    thumbnail_url: Optional[str] = None
    fallback_thumbnail_url: Optional[str] = None
    video_url: Optional[str] = None
    instagram_url: Optional[str] = None
    is_active: Optional[bool] = None
    order_index: Optional[int] = None

class ReelOut(ReelBase):
    id: int
    created_at: datetime.datetime
    updated_at: Optional[datetime.datetime] = None

    class Config:
        from_attributes = True


# ---- Dashboard Stats ----
class DashboardStats(BaseModel):
    total_posts: int
    total_stays: int
    total_leads: int
    new_leads: int
    total_reels: int = 0
    announcement_active: bool

