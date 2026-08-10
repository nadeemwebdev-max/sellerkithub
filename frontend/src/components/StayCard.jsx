import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

const FALLBACK_STAY_IMG = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80";

export default function StayCard({ stay, onInquire }) {
  const amenitiesList = stay.amenities ? stay.amenities.split(',').slice(0, 3) : [];

  return (
    <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col group border border-slate-800/90 transition-all duration-300">
      
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
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] via-transparent to-black/30" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="bg-emerald-500/90 backdrop-blur-md text-slate-950 font-extrabold text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
            <ShieldCheck className="w-3.5 h-3.5" /> NJ Verified
          </span>
          <span className="bg-slate-950/80 backdrop-blur-md text-slate-200 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-slate-700/50">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{stay.rating || 4.9}</span>
            <span className="text-slate-400 text-[10px]">({stay.review_count || 50}+)</span>
          </span>
        </div>

        {/* Location & Category Bottom Pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="bg-slate-950/80 backdrop-blur-md text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 border border-slate-700/60">
            <MapPin className="w-3 h-3" /> {stay.location}
          </span>
          <span className="bg-slate-900/80 backdrop-blur-md text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full border border-slate-800">
            {stay.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link to={`/stays/${stay.slug}`}>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors font-display line-clamp-1">
              {stay.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {stay.description}
          </p>

          {/* Amenities Chips */}
          {amenitiesList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {amenitiesList.map((item, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-slate-800/60 text-slate-300 px-2.5 py-0.5 rounded-lg border border-slate-700/40"
                >
                  ✓ {item.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Special NJ Rate
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-white font-display">
                ₹{stay.price_per_night?.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-slate-400 truncate max-w-[110px] sm:max-w-[130px]">
                {stay.price_unit || '/ person'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              to={`/stays/${stay.slug}`}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="View Details"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => onInquire(stay)}
              className="px-3.5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 hover:scale-105"
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
