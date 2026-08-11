import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

const FALLBACK_STAY_IMG = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80";

export default function StayCard({ stay, onInquire }) {
  const amenitiesList = stay.amenities ? stay.amenities.split(',').slice(0, 3) : [];

  return (
    <div className="glass-panel glass-card-hover rounded-3xl overflow-hidden flex flex-col group border border-slate-200/80 dark:border-white/[0.08] transition-all duration-300 bg-white/90 dark:bg-[#091122]/80 shadow-lg dark:shadow-2xl">
      
      {/* Image Banner */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={stay.cover_image}
          alt={stay.title}
          onError={(e) => {
            if (e.target.src !== FALLBACK_STAY_IMG) {
              e.target.src = FALLBACK_STAY_IMG;
            }
          }}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="bg-emerald-400 text-slate-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" /> NJ Verified
          </span>
          <span className="bg-slate-950/80 backdrop-blur-md text-slate-200 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10 shadow-md">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{stay.rating || 4.9}</span>
            <span className="text-slate-400 text-[10px]">({stay.review_count || 50}+)</span>
          </span>
        </div>

        {/* Location & Category Bottom Pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
          <span className="bg-slate-950/80 backdrop-blur-md text-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-500/30">
            <MapPin className="w-3 h-3 text-emerald-400" /> {stay.location}
          </span>
          <span className="bg-slate-900/80 backdrop-blur-md text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-white/10">
            {stay.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link to={`/stays/${stay.slug}`}>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-display line-clamp-1">
              {stay.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1.5 leading-relaxed font-normal">
            {stay.description}
          </p>

          {/* Amenities Chips */}
          {amenitiesList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {amenitiesList.map((item, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-slate-100 dark:bg-slate-900/80 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-lg border border-emerald-500/20 font-medium"
                >
                  ✓ {item.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-bold">
              Special NJ Rate
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-display">
                ₹{stay.price_per_night?.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[110px] sm:max-w-[130px]">
                {stay.price_unit || '/ person'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/stays/${stay.slug}`}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors shadow-sm"
              title="View Details"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => onInquire(stay)}
              className="btn-shimmer px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5 hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Inquire</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}


