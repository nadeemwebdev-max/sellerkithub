from sqlalchemy.orm import Session
from .database import engine, SessionLocal, Base
from .models import User, Announcement, BlogPost, StayExperience, LeadInquiry
from .auth import get_password_hash
from .config import settings

def seed_database():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # 1. Admin User (@travel_with.nj)
        admin_user = db.query(User).filter(User.username == settings.ADMIN_USERNAME).first()
        if not admin_user:
            admin_user = User(
                username=settings.ADMIN_USERNAME,
                email=settings.ADMIN_EMAIL,
                hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
                full_name="NJ (@travel_with.nj)",
                is_admin=True
            )
            db.add(admin_user)

        # 2. Announcement Banner
        announcement = db.query(Announcement).first()
        if not announcement:
            announcement = Announcement(
                message="🌿 Dandeli & Yellapur Waterfalls Weekend Batch Open! 18 Slots Only • Flat 15% Early Bird Off",
                badge_text="BATCH OPEN",
                link_text="Book Your Slot",
                link_url="/stays",
                bg_gradient="from-emerald-600 to-teal-700",
                is_active=True
            )
            db.add(announcement)

        # 3. Blog Posts (Clear & reseed with 100% reliable image URLs)
        db.query(BlogPost).delete()
        posts = [
            BlogPost(
                title="Top 7 Secret Waterfalls near Hubli-Dharwad You Must Visit This Monsoon (With GPS Routes)",
                slug="top-7-secret-waterfalls-near-hubli-dharwad-monsoon-guide",
                excerpt="Tired of crowded picnic spots? Explore Sathodi, Magod, Shivaganga, and Vibhooti falls with exact driving directions, best time to visit, and local tips.",
                cover_image="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80",
                category="Monsoon Treks",
                tags="Hubli,Waterfalls,Yellapur,Sirsi,Monsoon,Weekend Trips",
                read_time="6 min read",
                views=3420,
                is_published=True,
                seo_title="Top 7 Secret Waterfalls near Hubli-Dharwad 2026 Monsoon Guide",
                seo_description="Discover the best hidden waterfalls within 150 km of Hubli and Dharwad. Full road trip itinerary, safety tips, and route map by Travel with NJ.",
                content="""# Top 7 Secret Waterfalls near Hubli-Dharwad

When the monsoon clouds gather over North Karnataka, the Western Ghats transform into an emerald wonderland. Living in Hubballi or Dharwad gives us a unique geographical superpower: within just 1.5 to 3 hours of driving, we can reach some of the most pristine, thunderous waterfalls in South India.

Here is my handpicked list of 7 breathtaking waterfalls you should explore this season.

---

## 1. Sathodi Falls (The Niagara of Uttara Kannada)
- **Distance from Hubli:** ~85 km (via Yellapur)
- **Best Time:** July to December
- **Difficulty:** Moderate (1 km walk through forest canopy)
- **Why NJ loves it:** Formed by multiple unnamed streams joining the Kali River tributary, Sathodi drops into a massive natural rock amphitheater. The mist hits your face 100 meters away!

### NJ Pro-Tip:
Combine Sathodi with a quick stop at **Yellapur Shanbagh Hotel** for hot Mirchi Bajji and tea. The last 5 km road is mud trail, so drive slow!

---

## 2. Magod Falls (The Two-Tiered Giant)
- **Distance from Hubli:** ~90 km
- **Best Time:** Monsoon peak & Post-monsoon
- **Difficulty:** Easy (Well-paved forest viewpoints)
- **NJ Rating:** 4.9 / 5

The mighty Bedti River takes two massive leaps plunging over 650 feet into a dense, mist-clad gorge. The forest department maintains safe viewpoints that are ideal for photography and family trips.

---

## 3. Shivaganga Falls (Sirsi Border)
- **Distance from Hubli:** ~105 km
- **Vibe:** Secluded & Peaceful
- **Entry Fee:** ₹20

Unlike commercial tourist hubs, Shivaganga offers an untouched jungle trek. The Sonda river falls into a deep 74-meter drop.

---

## 4. Vibhooti Falls (Near Yana Rocks)
- **Distance from Hubli:** ~135 km
- **Specialty:** Natural crystal-clear swimming pool with limestone rock backdrop.
- **Safety:** Always wear life jackets during high monsoon currents.

---

## Ready to Plan Your Trip?
Need verified homestay contacts or local driver guides? Check our [Curated Stays page](/stays) or DM me on [@travel_with.nj](https://www.instagram.com/travel_with.nj)!"""
            ),
            BlogPost(
                title="The Complete Dandeli Jungle & River Rafting Guide: Best Stays, Costs & Activities",
                slug="complete-dandeli-jungle-river-rafting-guide-resorts-budget",
                excerpt="Everything you need to plan a high-adrenaline weekend in Dandeli: White water rafting levels, jungle safaris, Kali river kayaking, and verified budget homestays.",
                cover_image="https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1200&q=80",
                category="Adventure",
                tags="Dandeli,Rafting,Camping,Jungle Safari,Weekend Getaway",
                read_time="8 min read",
                views=5180,
                is_published=True,
                seo_title="Dandeli Travel Guide 2026: River Rafting, Resorts & Budget Itinerary",
                seo_description="Plan your Dandeli trip with Travel With NJ. White water rafting tips, top rated riverfront resorts, cost breakdown, and itinerary from Hubli.",
                content="""# The Ultimate Dandeli Adventure Guide

Located just 75 km from Hubli, **Dandeli** is the adventure capital of North Karnataka. From class 3+ white water rapids on the Kali River to dense deciduous forests teeming with hornbills and black panthers, Dandeli has it all.

---

## What to Do in Dandeli

### 1. White Water Rafting on Kali River
- **Long Run (9-11 km):** ₹1,400 – ₹1,800 per head (Best between Oct to May)
- **Short Run (1.5 km):** ₹500 – ₹700 per head
- **Rapid Classes:** Grade 2 & 3 rapids like 'The Piper', 'Robin's Eye', and 'Stanley's Corner'.

### 2. Jungle Safari in Dandeli Anshi Tiger Reserve
- **Timings:** Morning 6:00 AM & Evening 4:00 PM
- **Key sightings:** Malabar Pied Hornbills, Barking Deer, Elephants, and the elusive Black Panther.

### 3. Riverside Camping & Kayaking
Spend your evening by a warm campfire listening to the soothing river sounds while enjoying authentic North Karnataka buffet dinner (Jowar roti, spicy chicken curry, dal and fresh salads).

---

## Where to Stay?
Avoid middleman scams! Book directly through our [Verified Dandeli Stays list](/stays) for guaranteed discounts and sanitized riverfront tents."""
            ),
            BlogPost(
                title="Badami, Aihole & Pattadakal: A 2-Day Epic Heritage Roadtrip Route from Hubballi",
                slug="badami-aihole-pattadakal-2-day-heritage-roadtrip-from-hubballi",
                excerpt="Step back in time to the 6th century Chalukya empire. Detailed 48-hour itinerary, photography spot recommendations, and the best local Khanavalis in Badami.",
                cover_image="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
                category="Heritage & Culture",
                tags="Badami,Aihole,Pattadakal,Heritage,Architecture,Roadtrip",
                read_time="5 min read",
                views=2890,
                is_published=True,
                seo_title="Badami 2-Day Roadtrip Itinerary from Hubli Dharwad - Travel with NJ",
                seo_description="Discover the rock-cut cave temples of Badami, UNESCO World Heritage Pattadakal, and cradle of temple architecture Aihole in a seamless 2-day trip.",
                content="""# 48 Hours in Badami: The Chalukyan Wonderland

If you love ancient architecture, sandstone rock cliffs, and cinematic sunsets over Agastya Lake, the **Hubli -> Badami -> Pattadakal -> Aihole** circuit is an unmissable road trip.

---

## Day 1: The Red Sandstone Caves of Badami
- **8:00 AM:** Depart from Hubli via Navalgund & Ron (105 km, ~2.5 hrs).
- **11:00 AM:** Check into your heritage stay.
- **12:30 PM:** Authentic Uttara Karnataka lunch (Shenga chutney, Jolada Rotti, Ennegayi Badanekayi).
- **3:30 PM:** Explore the **4 Rock-cut Caves** (Cave 1: Nataraja, Cave 2: Vishnu Avatar, Cave 3: Maha Vishnu, Cave 4: Jain Tirthankaras).
- **5:30 PM:** Sunset at **Bhootnath Temple** on the edge of Agastya Lake. The water turns molten gold!

---

## Day 2: Pattadakal UNESCO World Heritage & Aihole
- **9:00 AM:** Drive to Pattadakal (22 km from Badami) — a masterpiece of Dravidian and Nagara architecture.
- **1:00 PM:** Aihole (Durga Temple with its unique apsidal layout).
- **5:00 PM:** Return drive back to Hubballi."""
            ),
            BlogPost(
                title="Hubli-Dharwad Street Food Trail: 9 Iconic Spots Every Foodie Must Visit",
                slug="hubli-dharwad-street-food-trail-iconic-khanavalis-and-snacks",
                excerpt="From crispy Dharwad Mishra Peda and evening Girmit-Mirchi to authentic Lingayat Jolada Rotti meals, here is the ultimate culinary map of the twin cities.",
                cover_image="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80",
                category="Food Trails",
                tags="Hubli,Dharwad,Street Food,Girmit,Dharwad Peda,Khanavali",
                read_time="4 min read",
                views=4620,
                is_published=True,
                seo_title="Hubli Dharwad Food Guide: Best Girmit, Khanavali & Dharwad Peda Spots",
                seo_description="Experience authentic North Karnataka cuisine with Travel with NJ. The top 9 must-try food spots in Hubli and Dharwad twin cities.",
                content="""# The Ultimate Hubli-Dharwad Food Trail

Food in Hubli-Dharwad is not just sustenance; it is a deep-rooted culture. Here are the 9 legendary spots you simply cannot miss!

---

## 1. The Legendary Girmit & Mirchi Bajji
- **Where:** Station Road & Durgadbail, Hubballi
- **The Experience:** Puffed rice tossed in spicy onion gravy, garnished with coriander, sev, and lemon, paired with scalding hot chilli fritters.

## 2. Authentic Line Bazaar Dharwad Peda
- **Where:** Line Bazaar, Dharwad (Babu Singh Thakur Peda)
- **The Experience:** Pure condensed milk caramelized to deep brown perfection and dusted with powdered sugar.

## 3. Basaveshwara Khanavali
- **Where:** Koppikar Road, Hubli
- **The Experience:** Unlimited piping hot Jolada Rotti served with stuffed brinjal, spicy curd, sprouted pulses, and raw cucumbers.

---

Have a favorite food spot you want us to feature next? Reach out on [Instagram @travel_with.nj](https://www.instagram.com/travel_with.nj)!"""
            )
        ]
        db.add_all(posts)

        # 4. Stay Experiences (Clear & reseed with 100% reliable image URLs)
        db.query(StayExperience).delete()
        stays = [
            StayExperience(
                title="River Whispers Eco-Resort & Kali Rafting Camp",
                slug="river-whispers-eco-resort-dandeli",
                location="Dandeli",
                category="Riverfront Resort",
                price_per_night=2199,
                price_unit="per person / night (Includes All Meals & 3 Activities)",
                rating=4.9,
                review_count=142,
                whatsapp_number="+919876543210",
                cover_image="https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1000&q=80",
                gallery_images="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80,https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
                amenities="Kali River View, Kayaking & Boating Included, Jungle Campfire, Buffet Lunch/Dinner/Breakfast, Rain Dance, Safari Assistance",
                description="Located right on the banks of the mighty Kali River in Dandeli, River Whispers offers premium Swiss cottage tents and wooden AC chalets. Wake up to the sounds of hornbills and river rapids. Curated and inspected by @travel_with.nj with direct owner pricing.",
                highlights="NJ Verified Stay, 15% Exclusive Discount for NJ Community, Free Kayaking Session, Safe for Families & Couples",
                is_featured=True,
                is_active=True
            ),
            StayExperience(
                title="Sirsi Arecanut Plantation & Heritage Homestay",
                slug="sirsi-arecanut-plantation-heritage-homestay",
                location="Sirsi",
                category="Heritage Homestay",
                price_per_night=1850,
                price_unit="per person / night (With Homemade Malnad & UK Meals)",
                rating=4.95,
                review_count=98,
                whatsapp_number="+919876543210",
                cover_image="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
                gallery_images="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
                amenities="Organic Plantation Walk, Stream Bath, Traditional Courtyard Architecture, Pure Malnad Vegetarian & Non-Veg Feasts, Stargazing",
                description="A 120-year-old heritage estate tucked deep inside dense arecanut and spice plantations in Sirsi. Experience authentic Havyaka & Uttara Karnataka hospitality, secret private waterfalls, and pure silence far from city noise.",
                highlights="NJ Recommended Hidden Gem, Private Stream Access, Pet Friendly, Pure Farm-to-Table Dining",
                is_featured=True,
                is_active=True
            ),
            StayExperience(
                title="Gokarna Cliffside Sunset Glamping Pods",
                slug="gokarna-cliffside-sunset-glamping-pods",
                location="Gokarna",
                category="Beach Camp",
                price_per_night=1699,
                price_unit="per night / 2 persons (Breakfast Included)",
                rating=4.85,
                review_count=180,
                whatsapp_number="+919876543210",
                cover_image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
                gallery_images="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
                amenities="Unobstructed Arabian Sea View, Private Cliff Trail to Kudle Beach, Beach Bonfire, Acoustic Music Nights, High-Speed WiFi for Workations",
                description="Perched atop the cliffs overlooking the Arabian Sea between Gokarna Main Beach and Kudle Beach. Premium geodesic glamping pods equipped with AC, comfortable queen beds, and outdoor hammock decks.",
                highlights="Best Sunset View in Gokarna, Direct Beach Trail Access, 10% Community Discount",
                is_featured=True,
                is_active=True
            ),
            StayExperience(
                title="Yellapur Mist Forest Retreat & Waterfall Cabin",
                slug="yellapur-mist-forest-retreat-waterfall-cabin",
                location="Yellapur",
                category="Jungle Retreat",
                price_per_night=2350,
                price_unit="per person / night (Full Board Included)",
                rating=4.9,
                review_count=76,
                whatsapp_number="+919876543210",
                cover_image="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80",
                gallery_images="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
                amenities="Private Waterfall Trek Guide, Deep Forest Deck, Night Safari, Campfire & Barbecue, Local Siddi Tribal Culture Tour",
                description="Deep in the Western Ghats jungle near Yellapur. Perfect base camp for exploring Sathodi and Magod falls. Cozy wooden cottages surrounded by dense mist every morning.",
                highlights="Guided Trek to Secret Waterfall, Siddi Food Experience, NJ Signature Partner",
                is_featured=False,
                is_active=True
            )
        ]
        db.add_all(stays)

        db.commit()
        print("Database updated with verified reliable imagery!")
    except Exception as e:
        db.rollback()
        print(f"Error updating database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
