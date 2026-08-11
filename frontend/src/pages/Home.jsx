import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, MapPin, ArrowRight, ShieldCheck, Instagram, Star, MessageSquare, Check, Phone } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import VideoReelsShowcase from '../components/VideoReelsShowcase';
import StayCard from '../components/StayCard';
import BlogCard from '../components/BlogCard';
import InquiryModal from '../components/InquiryModal';
import SeoHead from '../components/SeoHead';
import { getStays, getPosts } from '../api/client';

export default function Home() {
  const [featuredStays, setFeaturedStays] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [selectedStayForInquiry, setSelectedStayForInquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      getStays({ featured_only: true }),
      getPosts({ limit: 3 })
    ]).then(([staysData, postsData]) => {
      if (isMounted) {
        setFeaturedStays(staysData.slice(0, 3));
        setLatestPosts(postsData.slice(0, 3));
        setLoading(false);
      }
    }).catch(err => {
      console.error(err);
      if (isMounted) setLoading(false);
    });
    return () => { isMounted = false; };
  }, []);

  const destinations = [
    {
      name: "Dandeli",
      tagline: "White Water Rafting & Kali Jungle Tents",
      image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80",
      fallback: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      distance: "75 km from Hubli",
      filter: "Dandeli"
    },
    {
      name: "Sirsi & Yellapur",
      tagline: "Hidden Waterfalls & Ancient Areca Homestays",
      image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
      fallback: "https://images.unsplash.com/photo-1546587348-d12660c30c50?auto=format&fit=crop&w=800&q=80",
      distance: "90 km from Hubli",
      filter: "Sirsi"
    },
    {
      name: "Gokarna",
      tagline: "Cliffside Sunset Pods & Beach Bonfires",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      fallback: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      distance: "145 km from Hubli",
      filter: "Gokarna"
    },
    {
      name: "Badami & Aihole",
      tagline: "6th Century Rock-Cut Caves & Heritage Stays",
      image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
      fallback: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
      distance: "105 km from Hubli",
      filter: "Badami"
    }
  ];


  return (
    <div>
      <SeoHead
        title="Travel with NJ | Discover Hubli-Dharwad & Unseen North Karnataka"
        description="Official platform for @travel_with.nj (25k+ followers). Book verified homestays in Dandeli, Sirsi & Gokarna, read weekend guides, and explore secret waterfalls."
        type="website"
      />

      {/* Hero Section */}
      <HeroSection onOpenInquiry={(stay) => setSelectedStayForInquiry(stay || {})} />

      {/* Popular Destination Hubs */}
      <section className="py-16 sm:py-20 relative border-y border-slate-200/80 dark:border-white/[0.06] bg-slate-100/80 dark:bg-[#070c18]/90 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 mb-2">
                <Compass className="w-3.5 h-3.5" /> Explore by Destination
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                Top Weekend Getaways <span className="text-gradient">from Hubli-Dharwad</span>
              </h2>
            </div>
            <Link
              to="/stays"
              className="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center gap-1.5 shrink-0 group"
            >
              <span>View All Stays</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {destinations.map((dest) => (
              <Link
                key={dest.name}
                to={`/stays?location=${dest.filter}`}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden glass-panel border border-slate-200 dark:border-white/[0.08] transition-all duration-500 hover:scale-[1.03] hover:border-emerald-500/60 shadow-xl hover:shadow-emerald-500/15"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  onError={(e) => {
                    if (dest.fallback && e.target.src !== dest.fallback) {
                      e.target.src = dest.fallback;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-black/35 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
                
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-black/70 backdrop-blur-md text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full border border-white/15 shadow-sm">
                    {dest.distance}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-1.5 z-10">
                  <h3 className="text-xl font-black text-white font-display flex items-center justify-between">
                    <span>{dest.name}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 font-normal">
                    {dest.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Stays Lead-Gen Showcase */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/08 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 mb-3 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Inspected & Recommended
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                Curated Homestays & <span className="text-gradient">Adventure Camps</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-xl font-normal">
                Avoid middleman booking commissions. Book verified properties with honest pricing and direct WhatsApp booking with NJ.
              </p>
            </div>

            <Link
              to="/stays"
              className="btn-shimmer inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold text-xs shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 shrink-0 self-start md:self-auto"
            >
              <Compass className="w-4 h-4" />
              <span>Browse All Properties</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featuredStays.map((stay) => (
              <StayCard
                key={stay.id}
                stay={stay}
                onInquire={(s) => setSelectedStayForInquiry(s)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Video Reels Showcase */}
      <VideoReelsShowcase />

      {/* Travel Guides / Blog Section */}
      <section className="py-16 sm:py-24 relative border-t border-slate-200/80 dark:border-white/[0.06] bg-slate-100/80 dark:bg-[#070c18]/90 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-2">
                Insider Road Trips & Guides
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                Latest Travel Stories & <span className="text-gradient-gold">GPS Itineraries</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-xl font-normal">
                Exact driving routes, waterfall safety tips, food trail recommendations, and budget calculators.
              </p>
            </div>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass-panel hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs border border-slate-200 dark:border-white/10 transition-all hover:scale-105 shrink-0 self-start md:self-auto shadow-md"
            >
              <span>Explore All Guides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* B2B Collab Banner Section */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl border border-emerald-500/40 p-8 sm:p-14 overflow-hidden bg-gradient-to-br from-[#060d19] via-[#091524] to-[#061412] text-white shadow-2xl">

            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> For Homestays, Resorts & Local Brands
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight leading-tight">
                Want to Feature Your Property on <span className="text-gradient">@travel_with.nj</span> & Get Direct Bookings?
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                Connect your business with over 25,000+ passionate local travelers. Get an Instagram reel review, permanent verified listing on travelwithnj.com, and direct WhatsApp lead routing.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/collab"
                  className="btn-shimmer w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-xs shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 text-center flex items-center justify-center"
                >
                  View Creator Media Kit & Packages
                </Link>
                <a
                  href="https://wa.me/919876543210?text=Hi%20NJ!%20I%20own%20a%20resort/homestay%20and%20want%20to%20collaborate."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] text-white font-bold text-xs border border-white/20 transition-all flex items-center justify-center gap-2 shadow-md hover:scale-105 backdrop-blur-md text-center"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Business Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Inquiry Modal */}
      {selectedStayForInquiry && (
        <InquiryModal
          stay={selectedStayForInquiry.id ? selectedStayForInquiry : null}
          onClose={() => setSelectedStayForInquiry(null)}
        />
      )}

    </div>
  );
}
