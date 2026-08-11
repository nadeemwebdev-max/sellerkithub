# TravelWithNJ 🌿 — North Karnataka Travel Discovery & Stays Lead-Gen Platform

The official full-stack creator platform for **[@travel_with.nj](https://www.instagram.com/travel_with.nj)** (25,000+ Instagram community).

---

## 🌐 Live Production Architecture

- **Frontend (Vercel)**: [https://travelwithnj.kalebuddelogistics.in](https://travelwithnj.kalebuddelogistics.in)
- **Backend API (Render)**: [https://travelwithnj.onrender.com](https://travelwithnj.onrender.com)
- **Interactive API Docs**: [https://travelwithnj.onrender.com/docs](https://travelwithnj.onrender.com/docs)
- **Dynamic XML Sitemap**: [https://travelwithnj.onrender.com/api/seo/sitemap.xml](https://travelwithnj.onrender.com/api/seo/sitemap.xml)
- **GitHub Repository**: [https://github.com/nadeemwebdev-max/travelwithnj](https://github.com/nadeemwebdev-max/travelwithnj)

---

## 🌟 Key Capabilities & Features

1. **Creator-Grade Frontend (React 18 + Tailwind CSS)**:
   - **Hero Section**: Creator identity, live stats pills (25k+ Community, 50+ Hidden Spots, 100% Verified Deals).
   - **Top Live Announcement Banner**: Creator-managed top bar for upcoming weekend treks & discount announcements.
   - **Curated Stays & Experiences Directory (`/stays`)**: Dandeli resorts, Sirsi heritage homestays, Gokarna beach camps, and Yellapur cabins with filters by region & category.
   - **NJ Weekend Group Trips Tab**: Dedicated batches with Hubli-Dharwad pickup & drop, drone reels by NJ, and all-inclusive logistics.
   - **Instant WhatsApp Booking & Lead Modal**: Captures leads in PostgreSQL CRM and auto-redirects travelers to WhatsApp with pre-filled booking details.
   - **Travel Stories & Guides (`/blog`)**: Detailed itineraries for Sathodi/Magod waterfalls, Badami heritage, and Hubli-Dharwad street food.
   - **Brand Collabs & Media Kit (`/collab`)**: Transparent collaboration packages for local cafes, resorts, and tour operators.
   - **Dynamic Google SEO & Schema**: Real-time `sitemap.xml`, `robots.txt`, and Google JSON-LD structured data (`Article`, `LodgingBusiness`, `TravelAgency`).

2. **FastAPI Backend & Database (PostgreSQL / SQLite)**:
   - **JWT Authentication** with native bcrypt encryption.
   - **PostgreSQL Connection Pooling** (`pool_pre_ping=True`, auto-reconnect).
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

## 🔑 Creator Admin Credentials

- **Admin Login URL**: `https://travelwithnj.kalebuddelogistics.in/admin/login`
- **Username**: `travel_with.nj`
- **Email**: `travelwithnj@gmail.com`
- **Password**: `TravelNJ@2026`

---

## 💾 PostgreSQL Database Configuration

Set the `DATABASE_URL` environment variable in your Render dashboard:

```bash
DATABASE_URL=postgresql://username:password@dpg-xxxx.singapore-postgres.render.com/travelwithnj
```

---

## 💰 Monetization Roadmap with @travel_with.nj

1. **Lead Generation & Host Commission**: Charge Dandeli/Sirsi resorts 10%–15% on confirmed bookings sent via the platform.
2. **Weekend Group Treks**: Host 20-person curated weekend trips (e.g. Dandeli Rafting or Sirsi Waterfalls) with tickets sold on the platform.
3. **Featured Stay Subscriptions**: Charge homestays ₹1,500 – ₹3,000/mo for a verified badge and top placement.
4. **Local Business "Reel + Website" Bundles**: Offer Hubli cafes/resorts a bundle of 1 Instagram Reel + custom landing page built by you for ₹15,000 – ₹30,000.
