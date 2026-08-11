const rawApiUrl = import.meta.env.VITE_API_URL || '';
const API_BASE = rawApiUrl ? (rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`) : '/api';

export const DEFAULT_STAYS = [
  {
    id: 1,
    title: "River Whispers Eco-Resort & Kali Rafting Camp",
    slug: "river-whispers-eco-resort-dandeli",
    location: "Dandeli",
    category: "Riverfront Resort",
    price_per_night: 2199,
    price_unit: "per person / night (Includes All 3 Meals & 3 Water Activities)",
    rating: 4.9,
    review_count: 142,
    whatsapp_number: "+919876543210",
    cover_image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1000&q=80",
    gallery_images: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80,https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    amenities: "Kali River Direct View, Kayaking & Boating Included, Jungle Campfire, Buffet Lunch/Dinner/Breakfast, Rain Dance, Safari Assistance",
    description: "Located right on the banks of the mighty Kali River in Dandeli, River Whispers offers premium Swiss cottage tents and wooden AC chalets. Wake up to the sounds of hornbills and river rapids. Curated and inspected by @travel_with.nj with direct owner pricing.",
    highlights: "NJ Verified Stay, 15% Exclusive Discount for NJ Community, Free Kayaking Session, Safe for Families & Couples",
    is_featured: true,
    is_active: true
  },
  {
    id: 2,
    title: "Hornbill Canopy Treehouse & Jungle Safari Resort",
    slug: "hornbill-canopy-treehouse-jungle-safari-dandeli",
    location: "Dandeli",
    category: "Treehouse Resort",
    price_per_night: 2850,
    price_unit: "per person / night (Full Board Included)",
    rating: 4.95,
    review_count: 118,
    whatsapp_number: "+919876543210",
    cover_image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
    gallery_images: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80",
    amenities: "Elevated Wooden Treehouses, River Canopy Balcony, Kali River Jacuzzi Bath, Malabar Pied Hornbill Spotting, Buffet Feasts",
    description: "Perched 35 feet high in the dense deciduous canopy overlooking the Kali River. Experience living inside the jungle with modern luxury amenities, forest acoustic nights, and natural river jacuzzi baths.",
    highlights: "Signature Treehouse Experience, Best Bird Photography Location, Couples Favorite",
    is_featured: true,
    is_active: true
  },
  {
    id: 3,
    title: "Panther Wildlife Riverside Swiss Tents",
    slug: "panther-wildlife-riverside-swiss-tents-dandeli",
    location: "Dandeli",
    category: "Riverside Camping",
    price_per_night: 1599,
    price_unit: "per person / night (Tents + Meals + Campfire)",
    rating: 4.8,
    review_count: 89,
    whatsapp_number: "+919876543210",
    cover_image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80",
    gallery_images: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80",
    amenities: "Weather-Proof Swiss Tents, River Crossing, Archery, Campfire with Music, Unlimited Buffet Meals",
    description: "Budget-friendly adventure base camp ideal for college groups and backpackers. Enjoy thrilling zipline, Burma bridge, and swimming with life jackets in the Kali river.",
    highlights: "Best Budget Adventure Stay, Student Group Discounts, River Sports Included",
    is_featured: false,
    is_active: true
  },
  {
    id: 4,
    title: "Sirsi Arecanut Plantation & 120-Yr Heritage Homestay",
    slug: "sirsi-arecanut-plantation-heritage-homestay",
    location: "Sirsi",
    category: "Heritage Homestay",
    price_per_night: 1850,
    price_unit: "per person / night (With Homemade Malnad & UK Meals)",
    rating: 4.95,
    review_count: 98,
    whatsapp_number: "+919876543210",
    cover_image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1000&q=80",
    gallery_images: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
    amenities: "Organic Plantation Walk, Stream Bath, Traditional Courtyard Architecture, Pure Malnad Vegetarian & Non-Veg Feasts, Stargazing",
    description: "A 120-year-old heritage estate tucked deep inside dense arecanut and spice plantations in Sirsi. Experience authentic Havyaka & Uttara Karnataka hospitality, secret private waterfalls, and pure silence far from city noise.",
    highlights: "NJ Recommended Hidden Gem, Private Stream Access, Pet Friendly, Pure Farm-to-Table Dining",
    is_featured: true,
    is_active: true
  },
  {
    id: 5,
    title: "Yellapur Mist Forest Retreat & Waterfall Cabin",
    slug: "yellapur-mist-forest-retreat-waterfall-cabin",
    location: "Yellapur",
    category: "Jungle Retreat",
    price_per_night: 2350,
    price_unit: "per person / night (Full Board Included)",
    rating: 4.9,
    review_count: 76,
    whatsapp_number: "+919876543210",
    cover_image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80",
    gallery_images: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
    amenities: "Private Waterfall Trek Guide, Deep Forest Deck, Night Safari, Campfire & Barbecue, Local Siddi Tribal Culture Tour",
    description: "Deep in the Western Ghats jungle near Yellapur. Perfect base camp for exploring Sathodi and Magod falls. Cozy wooden cottages surrounded by dense mist every morning.",
    highlights: "Guided Trek to Secret Waterfall, Siddi Food Experience, NJ Signature Partner",
    is_featured: false,
    is_active: true
  },
  {
    id: 6,
    title: "Sonda Valley River Stream Eco-Farmstay",
    slug: "sonda-valley-river-stream-eco-farmstay-sirsi",
    location: "Sirsi",
    category: "Eco-Homestay",
    price_per_night: 1750,
    price_unit: "per person / night (Includes Traditional Vegetarian Meals)",
    rating: 4.9,
    review_count: 64,
    whatsapp_number: "+919876543210",
    cover_image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
    gallery_images: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
    amenities: "Natural Stream Swimming Pool, Spice Garden Tour, Authentic Wood-Fired Kitchen, Ancient Jain Mutt & Temple Proximity",
    description: "Surrounded by emerald spice hills near the sacred Sonda valley. Crystal clear private stream flowing through the property where guests can swim safely. Experience traditional Uttara Karnataka sattvic feasts.",
    highlights: "Natural River Bathing, 100% Organic Meals, Extremely Quiet & Meditative",
    is_featured: false,
    is_active: true
  },
  {
    id: 7,
    title: "Gokarna Cliffside Sunset Glamping Pods",
    slug: "gokarna-cliffside-sunset-glamping-pods",
    location: "Gokarna",
    category: "Beach Glamping",
    price_per_night: 1699,
    price_unit: "per night / 2 persons (Breakfast Included)",
    rating: 4.85,
    review_count: 180,
    whatsapp_number: "+919876543210",
    cover_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    gallery_images: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
    amenities: "Unobstructed Arabian Sea View, Private Cliff Trail to Kudle Beach, Beach Bonfire, Acoustic Music Nights, High-Speed WiFi for Workations",
    description: "Perched atop the cliffs overlooking the Arabian Sea between Gokarna Main Beach and Kudle Beach. Premium geodesic glamping pods equipped with AC, comfortable queen beds, and outdoor hammock decks.",
    highlights: "Best Sunset View in Gokarna, Direct Beach Trail Access, 10% Community Discount",
    is_featured: true,
    is_active: true
  },
  {
    id: 8,
    title: "Honnavar Mangrove Backwaters Island Camp & Kayaking",
    slug: "honnavar-mangrove-backwaters-island-camp",
    location: "Honnavar",
    category: "Backwater Camping",
    price_per_night: 1899,
    price_unit: "per person / night (Boating + Kayaking + Coastal Meals)",
    rating: 4.92,
    review_count: 110,
    whatsapp_number: "+919876543210",
    cover_image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80",
    gallery_images: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    amenities: "Sharavathi River Island Tents, Sunrise Mangrove Kayaking, Private Boat Transfer, Coastal Seafood / Veg Buffet, Stargazing Deck",
    description: "Camp on a secluded river island nestled between dense mangrove channels of the Sharavathi backwaters in Honnavar. Glide through lush green water tunnels in kayaks at golden hour.",
    highlights: "Instagram-Famous Mangrove Kayaking Included, Sunset Boat Cruise, Authentic Coastal Fish/Veg Thali",
    is_featured: true,
    is_active: true
  },
  {
    id: 9,
    title: "Badami Chalukya Heritage Rock-Cut Boutique Villa",
    slug: "badami-chalukya-heritage-rock-cut-villa",
    location: "Badami",
    category: "Heritage Villa",
    price_per_night: 2800,
    price_unit: "per night / 2 persons (Breakfast Included)",
    rating: 4.9,
    review_count: 92,
    whatsapp_number: "+919876543210",
    cover_image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80",
    gallery_images: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    amenities: "Red Sandstone Architecture, Agastya Lake Panorama, AC Heritage Deluxe Rooms, Local Guide on Request, Rooftop Sunset Dining",
    description: "Experience the grandeur of 6th-century Chalukyan history. Built using local red sandstone blocks, this boutique heritage retreat offers sweeping views of the Bhootnath temple and rocky sandstone cliffs.",
    highlights: "10 Mins to Badami Rock Caves, Authentic Jolada Rotti Feast, Photography Guided Assistance",
    is_featured: false,
    is_active: true
  },
  {
    id: 10,
    title: "Hampi Bouldering & Sanapur Lake Sunset Huts",
    slug: "hampi-bouldering-sanapur-lake-sunset-huts",
    location: "Hampi",
    category: "Riverside Huts",
    price_per_night: 1450,
    price_unit: "per night / 2 persons (With Sanapur Lake Coracle Ride)",
    rating: 4.88,
    review_count: 165,
    whatsapp_number: "+919876543210",
    cover_image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=1000&q=80",
    gallery_images: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
    amenities: "Coracle Boat Ride on Sanapur Lake, Boulder Climbing Pad, Chilled Cafe Vibe, Bicycle Rentals, Live Music Nights",
    description: "Laidback bamboo cottages situated on the Anegundi / Sanapur side of Hampi. Ideal for cliff jumpers, climbers, backpackers, and creative minds seeking peaceful boulder sunsets.",
    highlights: "Sanapur Lake Coracle Included, Cliff Jumping Guide, Sunset Point Proximity",
    is_featured: false,
    is_active: true
  },
  {
    id: 11,
    title: "Monsoon Dandeli Kali Rafting & Camping Weekend (Batch #1)",
    slug: "monsoon-dandeli-kali-rafting-camping-group-trip",
    location: "Dandeli",
    category: "Weekend Group Trip",
    price_per_night: 2699,
    price_unit: "all-inclusive per person (Hubli-to-Hubli Transport + Stay + Meals + Rafting)",
    rating: 5.0,
    review_count: 35,
    whatsapp_number: "+919876543210",
    cover_image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1000&q=80",
    gallery_images: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    amenities: "Travel from Hubli in Private Tempo Traveler, Kali Long Run Rafting (9km), Swiss Cottage Tents, Jungle Campfire, Drone Video Reel of the Group by NJ",
    description: "Join NJ for an epic 2-day monsoon group adventure in Dandeli! Limited to 20 travelers from Hubli-Dharwad and Belagavi. White water rafting, kayaking, campfire games, and candid reels shot by @travel_with.nj for all members.",
    highlights: "Led by NJ Personally, Drone Video Reel Included for Every Attendee, Solo Travelers Welcome, Zero Planning Stress",
    is_featured: true,
    is_active: true
  },
  {
    id: 12,
    title: "Sirsi & Yellapur 5-Secret-Waterfalls Monsoon Expedition (Batch #2)",
    slug: "sirsi-yellapur-5-secret-waterfalls-monsoon-expedition",
    location: "Sirsi",
    category: "Weekend Group Trip",
    price_per_night: 2499,
    price_unit: "all-inclusive per person (2D/1N Transport + 120-Yr Heritage Homestay + 5 Falls)",
    rating: 5.0,
    review_count: 28,
    whatsapp_number: "+919876543210",
    cover_image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80",
    gallery_images: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
    amenities: "Hubli Pickup & Drop, Sathodi + Magod + Shivaganga + Vibhooti + Benne Hole Falls, Unlimited Malnad Feast, Forest Dept Permits Handled",
    description: "An exclusive monsoon waterfall hopping tour. Experience raw untamed water cascades, walk through ancient arecanut groves, swim in safe private crystal pools, and stay at our partner 120-year-old traditional estate.",
    highlights: "5 Waterfalls in 48 Hours, Forest Permits Handled, Guided by NJ, Authentic Farm-to-Table Meals",
    is_featured: true,
    is_active: true
  }
];

export const DEFAULT_POSTS = [
  {
    id: 1,
    title: "Top 7 Secret Waterfalls near Hubli-Dharwad You Must Visit This Monsoon (With GPS Routes)",
    slug: "top-7-secret-waterfalls-near-hubli-dharwad-monsoon-guide",
    excerpt: "Tired of crowded picnic spots? Explore Sathodi, Magod, Shivaganga, and Vibhooti falls with exact driving directions, best time to visit, and local tips.",
    cover_image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80",
    category: "Monsoon Treks",
    tags: "Hubli,Waterfalls,Yellapur,Sirsi,Monsoon,Weekend Trips",
    read_time: "6 min read",
    views: 3420,
    is_published: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "The Complete Dandeli Jungle & River Rafting Guide: Best Stays, Costs & Activities",
    slug: "complete-dandeli-jungle-river-rafting-guide-resorts-budget",
    excerpt: "Everything you need to plan a high-adrenaline weekend in Dandeli: White water rafting levels, jungle safaris, Kali river kayaking, and verified budget homestays.",
    cover_image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1200&q=80",
    category: "Adventure",
    tags: "Dandeli,Rafting,Camping,Jungle Safari,Weekend Getaway",
    read_time: "8 min read",
    views: 5180,
    is_published: true,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "Badami, Aihole & Pattadakal: A 2-Day Epic Heritage Roadtrip Route from Hubballi",
    slug: "badami-aihole-pattadakal-2-day-heritage-roadtrip-from-hubballi",
    excerpt: "Step back in time to the 6th century Chalukya empire. Detailed 48-hour itinerary, photography spot recommendations, and the best local Khanavalis in Badami.",
    cover_image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    category: "Heritage & Culture",
    tags: "Badami,Aihole,Pattadakal,Heritage,Architecture,Roadtrip",
    read_time: "5 min read",
    views: 2890,
    is_published: true,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    title: "Hubli-Dharwad Street Food Trail: 9 Iconic Spots Every Foodie Must Visit",
    slug: "hubli-dharwad-street-food-trail-iconic-khanavalis-and-snacks",
    excerpt: "From crispy Dharwad Mishra Peda and evening Girmit-Mirchi to authentic Lingayat Jolada Rotti meals, here is the ultimate culinary map of the twin cities.",
    cover_image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80",
    category: "Food Trails",
    tags: "Hubli,Dharwad,Street Food,Girmit,Dharwad Peda,Khanavali",
    read_time: "4 min read",
    views: 4620,
    is_published: true,
    created_at: new Date().toISOString()
  }
];

function getAuthHeaders() {
  const token = localStorage.getItem('nj_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

// Announcements
export async function getActiveAnnouncement() {
  try {
    const res = await fetch(`${API_BASE}/announcements/active`);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return data || {
      id: 1,
      message: "🌿 Dandeli & Yellapur Waterfalls Weekend Batch Open! 18 Slots Only • Flat 15% Early Bird Off",
      badge_text: "BATCH OPEN",
      link_text: "Book Your Slot",
      link_url: "/stays",
      bg_gradient: "from-emerald-600 to-teal-700",
      is_active: true
    };
  } catch (err) {
    return {
      id: 1,
      message: "🌿 Dandeli & Yellapur Waterfalls Weekend Batch Open! 18 Slots Only • Flat 15% Early Bird Off",
      badge_text: "BATCH OPEN",
      link_text: "Book Your Slot",
      link_url: "/stays",
      bg_gradient: "from-emerald-600 to-teal-700",
      is_active: true
    };
  }
}

export async function getAdminAnnouncement() {
  const res = await fetch(`${API_BASE}/announcements/`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch announcement');
  return await res.json();
}

export async function updateAnnouncement(data) {
  const res = await fetch(`${API_BASE}/announcements/`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update announcement');
  return await res.json();
}

// Blog Posts
export async function getPosts(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.tag) query.append('tag', params.tag);

    const res = await fetch(`${API_BASE}/posts/?${query.toString()}`);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data;
    return DEFAULT_POSTS;
  } catch (err) {
    return DEFAULT_POSTS;
  }
}

export async function getPostBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/posts/${slug}`);
    if (!res.ok) throw new Error('Post not found');
    return await res.json();
  } catch (err) {
    const match = DEFAULT_POSTS.find(p => p.slug === slug);
    if (match) return match;
    throw new Error('Post not found');
  }
}

export async function getAdminAllPosts() {
  const res = await fetch(`${API_BASE}/posts/admin/all`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return await res.json();
}

export async function createPost(postData) {
  const res = await fetch(`${API_BASE}/posts/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(postData)
  });
  if (!res.ok) throw new Error('Failed to create post');
  return await res.json();
}

export async function updatePost(postId, postData) {
  const res = await fetch(`${API_BASE}/posts/${postId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(postData)
  });
  if (!res.ok) throw new Error('Failed to update post');
  return await res.json();
}

export async function deletePost(postId) {
  const res = await fetch(`${API_BASE}/posts/${postId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete post');
  return await res.json();
}

// Stays & Experiences
export async function getStays(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.location) query.append('location', params.location);
    if (params.category) query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.featured_only) query.append('featured_only', 'true');

    const res = await fetch(`${API_BASE}/stays/?${query.toString()}`);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data;
    return filterDefaultStays(params);
  } catch (err) {
    return filterDefaultStays(params);
  }
}

function filterDefaultStays(params = {}) {
  let result = [...DEFAULT_STAYS];
  if (params.location && params.location !== 'All') {
    result = result.filter(s => s.location.toLowerCase().includes(params.location.toLowerCase()));
  }
  if (params.category && params.category !== 'All') {
    result = result.filter(s => s.category.toLowerCase().includes(params.category.toLowerCase()));
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    result = result.filter(s => 
      s.title.toLowerCase().includes(q) ||
      s.location.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.amenities.toLowerCase().includes(q)
    );
  }
  if (params.featured_only) {
    result = result.filter(s => s.is_featured);
  }
  return result;
}

export async function getStayBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/stays/${slug}`);
    if (!res.ok) throw new Error('Stay not found');
    return await res.json();
  } catch (err) {
    const match = DEFAULT_STAYS.find(s => s.slug === slug);
    if (match) return match;
    throw new Error('Stay not found');
  }
}

export async function getAdminAllStays() {
  const res = await fetch(`${API_BASE}/stays/admin/all`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch stays');
  return await res.json();
}

export async function createStay(stayData) {
  const res = await fetch(`${API_BASE}/stays/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(stayData)
  });
  if (!res.ok) throw new Error('Failed to create stay');
  return await res.json();
}

export async function updateStay(stayId, stayData) {
  const res = await fetch(`${API_BASE}/stays/${stayId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(stayData)
  });
  if (!res.ok) throw new Error('Failed to update stay');
  return await res.json();
}

export async function deleteStay(stayId) {
  const res = await fetch(`${API_BASE}/stays/${stayId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete stay');
  return await res.json();
}

// Leads & Inquiries
export async function submitLeadInquiry(leadData) {
  try {
    const res = await fetch(`${API_BASE}/leads/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });
    if (!res.ok) throw new Error('Failed to submit inquiry to server');
    return await res.json();
  } catch (err) {
    return { success: true, message: "Inquiry registered. Redirecting to WhatsApp..." };
  }
}

export async function getAdminLeads(status = 'All') {
  const query = status !== 'All' ? `?status=${status}` : '';
  const res = await fetch(`${API_BASE}/leads/${query}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch leads');
  return await res.json();
}

export async function updateLeadStatus(leadId, data) {
  const res = await fetch(`${API_BASE}/leads/${leadId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update lead');
  return await res.json();
}

export async function deleteLead(leadId) {
  const res = await fetch(`${API_BASE}/leads/${leadId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete lead');
  return await res.json();
}

// Reels & Video Stories
export async function getPublicReels() {
  try {
    const res = await fetch(`${API_BASE}/reels/`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [];
  }
}

export async function getAdminAllReels() {
  const res = await fetch(`${API_BASE}/reels/admin/all`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch reels');
  return await res.json();
}

export async function createReel(reelData) {
  const res = await fetch(`${API_BASE}/reels/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(reelData)
  });
  if (!res.ok) throw new Error('Failed to create reel');
  return await res.json();
}

export async function updateReel(reelId, reelData) {
  const res = await fetch(`${API_BASE}/reels/${reelId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(reelData)
  });
  if (!res.ok) throw new Error('Failed to update reel');
  return await res.json();
}

export async function uploadReelMedia(file) {
  const token = localStorage.getItem('nj_admin_token');
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/reels/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData
  });
  if (!res.ok) throw new Error('Failed to upload video media');
  return await res.json();
}

export async function deleteReel(reelId) {
  const res = await fetch(`${API_BASE}/reels/${reelId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete reel');
  return await res.json();
}

// Auth & Dashboard Stats
export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || 'Login failed. Please check credentials.');
  }
  return await res.json();
}

export async function getAdminStats() {
  const res = await fetch(`${API_BASE}/auth/stats`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return await res.json();
}
