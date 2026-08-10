# TravelWithNJ.com 🌿 — North Karnataka Travel Discovery & Stays Lead-Gen Platform

The official full-stack creator platform for **[@travel_with.nj](https://www.instagram.com/travel_with.nj)** (25,000+ Instagram community).

---

## 🌟 Key Capabilities & Features

1. **Creator-Grade Frontend (React + Tailwind CSS)**:
   - **Hero Section**: Creator identity, live stats pills (25k+ Community, 50+ Hidden Spots, 100% Verified Deals).
   - **Top Live Announcement Banner**: Creator-managed top bar for upcoming weekend treks & discount announcements.
   - **Curated Stays & Experiences Directory (`/stays`)**: Dandeli resorts, Sirsi heritage homestays, Gokarna beach camps, and Yellapur cabins with filters by location & category.
   - **Instant WhatsApp Booking & Lead Modal**: Captures lead in database CRM and auto-redirects traveler to WhatsApp with pre-filled booking details.
   - **Travel Stories & Guides (`/blog`)**: Detailed itineraries for Sathodi/Magod waterfalls, Badami heritage, and Hubli-Dharwad street food.
   - **Brand Collabs & Media Kit (`/collab`)**: Transparent collaboration packages for local cafes, resorts, and tour operators.
   - **Dynamic Google SEO & Schema**: Real-time `sitemap.xml`, `robots.txt`, and Google JSON-LD structured data (`Article`, `LodgingBusiness`, `TravelAgency`).

2. **FastAPI Backend & Database (PostgreSQL / SQLite)**:
   - **JWT Authentication** for admin login.
   - **Live Announcement Banner API** (`/api/announcements`).
   - **Blog CRUD Engine** (`/api/posts`).
   - **Stays CRUD Engine** (`/api/stays`).
   - **Lead Management & CRM** (`/api/leads`).
   - **Dynamic SEO Feeds** (`/api/seo/sitemap.xml`, `/api/seo/robots.txt`).

3. **Creator Admin Dashboard (`/admin`)**:
   - Live Announcement Banner editor with real-time visual preview.
   - Blog guide publisher with Markdown support and SEO meta customizer.
   - Curated stay listing manager (pricing, WhatsApp CTA, amenities).
   - Booking Inquiries CRM with 1-click WhatsApp customer chat.

---

## 🚀 Quick Start Guide

### 1. Start the Backend API (FastAPI)

```bash
# In the project root:
cd backend
python -m backend.app.main
# Or run with uvicorn:
uvicorn backend.app.main:app --reload --port 8000
```
- API Docs: `http://localhost:8000/docs`
- XML Sitemap: `http://localhost:8000/api/seo/sitemap.xml`

### 2. Start the Frontend (React + Vite)

```bash
# In another terminal:
cd frontend
npm run dev
```
- Open in browser: `http://localhost:3000`

---

## 🔑 Creator Admin Credentials

- **Admin Login URL**: `http://localhost:3000/admin/login`
- **Username**: `travel_with.nj`
- **Password**: `TravelNJ@2026`
- **Email**: `travelwithnj@gmail.com`

---

## 💾 PostgreSQL Database Configuration (Optional)

By default, the backend automatically initializes a zero-setup SQLite database (`travelwithnj.db`). To connect to a live PostgreSQL database, set the `DATABASE_URL` environment variable:

```bash
# In .env or system environment:
DATABASE_URL=postgresql://username:password@localhost:5432/travelwithnj
```

---

## 💰 Monetization Roadmap with @travel_with.nj

1. **Lead Generation & Host Commission**: Charge Dandeli/Sirsi resorts 10%–15% on confirmed bookings sent via the platform.
2. **Weekend Group Treks**: Host 20-person curated weekend trips (e.g. Dandeli Rafting or Sirsi Waterfalls) with tickets sold on the platform.
3. **Featured Stay Subscriptions**: Charge homestays ₹1,500 – ₹3,000/mo for a verified badge and top placement.
4. **Local Business "Reel + Website" Bundles**: Offer Hubli cafes/resorts a bundle of 1 Instagram Reel + custom landing page built by you for ₹15,000 – ₹30,000.
