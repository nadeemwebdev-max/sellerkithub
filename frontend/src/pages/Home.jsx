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
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
      distance: "75 km from Hubli",
      filter: "Dandeli"
    },
    {
      name: "Sirsi & Yellapur",
      tagline: "Hidden Waterfalls & Ancient Areca Homestays",
      image: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=600&q=80",
      distance: "90 km from Hubli",
      filter: "Sirsi"
    },
    {
      name: "Gokarna",
      tagline: "Cliffside Sunset Pods & Beach Bonfires",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      distance: "145 km from Hubli",
      filter: "Gokarna"
    },
    {
      name: "Badami & Aihole",
      tagline: "6th Century Rock-Cut Caves & Heritage Stays",
      image: "https://images.unsplash.com/photo-1600100397608-f010f443b794?auto=format&fit=crop&w=600&q=80",
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
      <section className="py-12 sm:py-16 bg-[#070b14] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Explore by Destination
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">
                Top Weekend Getaways from Hubli-Dharwad
              </h2>
            </div>
            <Link
              to="/stays"
              className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0"
            >
              <span>View All 20+ Stays</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {destinations.map((dest) => (
              <Link
                key={dest.name}
                to={`/stays?location=${dest.filter}`}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden glass-panel border border-slate-800 transition-all duration-300 hover:scale-[1.03] hover:border-emerald-500/50 shadow-lg"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                
                <div className="absolute top-3 right-3">
                  <span className="bg-black/60 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10">
                    {dest.distance}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <h3 className="text-xl font-bold text-white font-display flex items-center justify-between">
                    <span>{dest.name}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {dest.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Stays Lead-Gen Showcase */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Inspected & Recommended
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                Curated Homestays & <span className="text-gradient">Adventure Camps</span>
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Avoid middleman booking scams. Book verified properties with honest pricing and direct WhatsApp confirmation with NJ.
              </p>
            </div>

            <Link
              to="/stays"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 shrink-0 self-start md:self-auto"
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
      <section className="py-16 sm:py-24 bg-[#070b14] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Insider Road Trips & Guides
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-display">
                Latest Travel Stories & <span className="text-gradient">GPS Itineraries</span>
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Exact driving routes, waterfall safety tips, food trail recommendations, and budget calculators.
              </p>
            </div>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass-panel hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-all hover:scale-105 shrink-0 self-start md:self-auto"
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
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl glass-panel border border-emerald-500/30 p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-[#0d1828] via-[#091522] to-[#0d1f1c]">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" /> For Homestays, Resorts & Local Brands
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                Want to Feature Your Property on @travel_with.nj & Get Direct Bookings?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect your business with over 25,000+ passionate local travelers. Get an Instagram reel review, permanent verified listing on travelwithnj.com, and direct WhatsApp lead routing.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/collab"
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                >
                  View Creator Media Kit & Packages
                </Link>
                <a
                  href="https://wa.me/919876543210?text=Hi%20NJ!%20I%20own%20a%20resort/homestay%20and%20want%20to%20collaborate."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl glass-panel hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-2"
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
