import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, ShieldCheck, Sparkles, Check, Phone, ArrowLeft, MessageCircle, Share2, Compass, Heart } from 'lucide-react';
import InquiryModal from '../components/InquiryModal';
import SeoHead from '../components/SeoHead';
import { getStayBySlug } from '../api/client';

export default function StayDetailPage() {
  const { slug } = useParams();
  const [stay, setStay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getStayBySlug(slug).then(data => {
      if (isMounted) {
        setStay(data);
        setLoading(false);
      }
    }).catch(err => {
      console.error(err);
      if (isMounted) setLoading(false);
    });
    return () => { isMounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!stay) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-white mb-2">Stay Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">The property you are looking for does not exist or has been removed.</p>
        <Link to="/stays" className="px-5 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs">
          Back to All Stays
        </Link>
      </div>
    );
  }

  const amenitiesList = stay.amenities ? stay.amenities.split(',') : [];
  const highlightsList = stay.highlights ? stay.highlights.split(',') : [];
  const gallery = stay.gallery_images ? stay.gallery_images.split(',').filter(Boolean) : [];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": stay.title,
    "image": stay.cover_image,
    "description": stay.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": stay.location,
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "priceRange": `₹${stay.price_per_night}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": stay.rating || 4.9,
      "reviewCount": stay.review_count || 85
    }
  };

  return (
    <div className="py-8 sm:py-12">
      <SeoHead
        title={`${stay.title} - ${stay.location} Verified Stay`}
        description={stay.description.slice(0, 160)}
        image={stay.cover_image}
        slug={`stays/${stay.slug}`}
        schema={jsonLdSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/stays"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Stays
          </Link>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share Stay'}</span>
          </button>
        </div>

        {/* Title & Location Header */}
        <div className="mb-8 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> NJ Verified Property
            </span>
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold px-3 py-1 rounded-full border border-slate-200 dark:border-transparent">
              {stay.category}
            </span>
            <span className="text-amber-500 dark:text-amber-400 text-xs font-bold flex items-center gap-1 px-2">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> {stay.rating} ({stay.review_count}+ traveler reviews)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            {stay.title}
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> {stay.location}, North Karnataka, India
          </p>
        </div>

        {/* Media Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
          <div className="lg:col-span-2 aspect-[16/10] rounded-3xl overflow-hidden glass-panel border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-lg">
            <img
              src={stay.cover_image}
              alt={stay.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {gallery.length > 0 ? (
              gallery.slice(0, 2).map((img, idx) => (
                <div key={idx} className="aspect-[16/10] rounded-2xl overflow-hidden glass-panel border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-md">
                  <img src={img} alt={`${stay.title} photo ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))
            ) : (
              <div className="aspect-[16/10] rounded-2xl overflow-hidden glass-panel border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 text-xs">
                Verified On-Site Inspection by NJ
              </div>
            )}
          </div>
        </div>

        {/* Content & Sticky Booking Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Description & Amenities */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Highlights */}
            {highlightsList.length > 0 && (
              <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/05 space-y-3 shadow-md">
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Why Travel with NJ Recommends This:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {highlightsList.map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        ✓
                      </div>
                      <span>{hl.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">About the Property</h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {stay.description}
              </p>
            </div>

            {/* Included Amenities & Activities */}
            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">Included Amenities & Activities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {amenitiesList.map((amenity, idx) => (
                  <div key={idx} className="glass-panel p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200 shadow-sm bg-white/90 dark:bg-slate-900/60">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{amenity.trim()}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sticky Booking / Direct Inquiry Box */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xl bg-white dark:bg-[#0c1322] space-y-6">
              
              <div className="space-y-1 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
                  Community Discount Price
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white font-display">
                    ₹{stay.price_per_night?.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {stay.price_unit}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Direct Host Rates (No Middleman Fee)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Free Itinerary & Route Guidance from NJ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Instant WhatsApp Confirmation</span>
                </div>
              </div>

              <button
                onClick={() => setShowInquiryModal(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Check Dates & Inquire Now</span>
              </button>

              <div className="text-center">
                <p className="text-[11px] text-slate-500">
                  🔒 Zero payment required on the website. Lock in your dates directly with host.
                </p>
              </div>

            </div>
          </div>


        </div>

      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <InquiryModal
          stay={stay}
          onClose={() => setShowInquiryModal(false)}
        />
      )}
    </div>
  );
}
