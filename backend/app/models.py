import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Float
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(100), default="NJ (@travel_with.nj)")
    is_admin = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class Announcement(Base):
    __tablename__ = "announcements"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String(255), nullable=False)
    badge_text = Column(String(50), default="NEW TRIP")
    link_text = Column(String(50), default="Book Slot")
    link_url = Column(String(255), default="/stays")
    bg_gradient = Column(String(100), default="from-amber-600 to-rose-600")
    is_active = Column(Boolean, default=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    excerpt = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    cover_image = Column(String(500), nullable=False)
    category = Column(String(100), default="Travel Guide")
    tags = Column(String(255), default="Hubli,Dandeli,Waterfalls,Weekend")
    read_time = Column(String(50), default="5 min read")
    views = Column(Integer, default=1240)
    is_published = Column(Boolean, default=True)
    
    # SEO Specific fields
    seo_title = Column(String(255), nullable=True)
    seo_description = Column(String(500), nullable=True)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


class StayExperience(Base):
    __tablename__ = "stay_experiences"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    location = Column(String(100), nullable=False) # e.g. "Dandeli", "Sirsi", "Gokarna", "Hubli-Dharwad"
    category = Column(String(50), default="Resort") # "Resort", "Homestay", "Riverside Camping", "Heritage Stay", "Weekend Trek"
    price_per_night = Column(Integer, nullable=False) # In INR e.g. 1999
    price_unit = Column(String(50), default="per person / night with food")
    rating = Column(Float, default=4.9)
    review_count = Column(Integer, default=85)
    whatsapp_number = Column(String(20), default="+919876543210")
    cover_image = Column(String(500), nullable=False)
    gallery_images = Column(Text, default="") # Comma-separated or JSON string
    amenities = Column(String(500), default="Kayaking, River Rafting, Campfire, Jungle Safari, Buffet Meals")
    description = Column(Text, nullable=False)
    highlights = Column(Text, default="NJ Verified Property, Direct Booking Discount, Best River View")
    is_featured = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


class LeadInquiry(Base):
    __tablename__ = "lead_inquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(100), nullable=True)
    destination_or_stay = Column(String(200), nullable=False)
    travel_dates = Column(String(100), nullable=True)
    number_of_guests = Column(Integer, default=2)
    message = Column(Text, nullable=True)
    status = Column(String(50), default="New") # "New", "Contacted", "Confirmed", "Closed"
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class Reel(Base):
    __tablename__ = "reels"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    location = Column(String(255), default="Hubli-Dharwad & Western Ghats")
    views_count = Column(String(50), default="100K")
    likes_count = Column(String(50), default="10K")
    thumbnail_url = Column(String(500), nullable=False)
    fallback_thumbnail_url = Column(String(500), nullable=True)
    video_url = Column(String(500), nullable=True) # Optional MP4
    instagram_url = Column(String(500), nullable=False) # e.g. https://www.instagram.com/reel/CODE/
    is_active = Column(Boolean, default=True)
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

