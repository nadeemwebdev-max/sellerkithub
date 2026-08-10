from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import BlogPost, StayExperience
from ..config import settings
import datetime

router = APIRouter(prefix="/api/seo", tags=["SEO & Feeds"])

@router.get("/sitemap.xml")
def generate_sitemap(db: Session = Depends(get_db)):
    base_url = settings.SITE_URL.rstrip("/")
    now = datetime.datetime.utcnow().strftime("%Y-%m-%d")
    
    # Static pages
    static_pages = [
        {"loc": f"{base_url}/", "priority": "1.0", "changefreq": "daily"},
        {"loc": f"{base_url}/stays", "priority": "0.9", "changefreq": "daily"},
        {"loc": f"{base_url}/blog", "priority": "0.9", "changefreq": "daily"},
        {"loc": f"{base_url}/collab", "priority": "0.7", "changefreq": "monthly"},
    ]
    
    # Dynamic blog posts
    posts = db.query(BlogPost).filter(BlogPost.is_published == True).all()
    # Dynamic stays
    stays = db.query(StayExperience).filter(StayExperience.is_active == True).all()
    
    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]
    
    for page in static_pages:
        xml_lines.append(f"""  <url>
    <loc>{page['loc']}</loc>
    <lastmod>{now}</lastmod>
    <changefreq>{page['changefreq']}</changefreq>
    <priority>{page['priority']}</priority>
  </url>""")

    for post in posts:
        mod_date = (post.updated_at or post.created_at).strftime("%Y-%m-%d")
        xml_lines.append(f"""  <url>
    <loc>{base_url}/blog/{post.slug}</loc>
    <lastmod>{mod_date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>""")

    for stay in stays:
        mod_date = (stay.updated_at or stay.created_at).strftime("%Y-%m-%d")
        xml_lines.append(f"""  <url>
    <loc>{base_url}/stays/{stay.slug}</loc>
    <lastmod>{mod_date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>""")

    xml_lines.append('</urlset>')
    xml_content = "\n".join(xml_lines)
    
    return Response(content=xml_content, media_type="application/xml")

@router.get("/robots.txt")
def generate_robots():
    base_url = settings.SITE_URL.rstrip("/")
    content = f"""User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/auth/
Disallow: /api/admin/

Sitemap: {base_url}/api/seo/sitemap.xml
"""
    return Response(content=content, media_type="text/plain")
