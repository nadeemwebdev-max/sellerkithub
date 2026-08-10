import React, { useState, useRef } from 'react';
import { Play, Instagram, Heart, Eye, Sparkles, ExternalLink, Volume2, VolumeX, X, MapPin } from 'lucide-react';

export default function VideoReelsShowcase() {
  const [selectedReel, setSelectedReel] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  // Curated reels with 100% reliable CDNs & high-res travel photography
  const reels = [
    {
      id: 1,
      title: "Secret Waterfalls near Hubli You Didn't Know Existed!",
      location: "Yellapur & Sathodi Falls",
      views: "148K",
      likes: "14.2K",
      thumbnail: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
      fallbackThumbnail: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      instagramUrl: "https://www.instagram.com/travel_with.nj"
    },
    {
      id: 2,
      title: "Dandeli Rafting Rapido Level 3 Rapids Madness 🚣‍♂️",
      location: "Kali River, Dandeli",
      views: "220K",
      likes: "21.8K",
      thumbnail: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80",
      fallbackThumbnail: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      instagramUrl: "https://www.instagram.com/travel_with.nj"
    },
    {
      id: 3,
      title: "Golden Hour Sunset at Badami Cave Temples ✨",
      location: "Agastya Lake, Badami",
      views: "98K",
      likes: "9.6K",
      thumbnail: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
      fallbackThumbnail: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      instagramUrl: "https://www.instagram.com/travel_with.nj"
    },
    {
      id: 4,
      title: "Hubli Street Food: Unlimited Girmit & Mirchi Bajji Trail 🔥",
      location: "Station Road, Hubballi",
      views: "310K",
      likes: "32.4K",
      thumbnail: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
      fallbackThumbnail: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      instagramUrl: "https://www.instagram.com/travel_with.nj"
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-pink-500/10 text-pink-400 border border-pink-500/30 mb-3">
              <Instagram className="w-3.5 h-3.5" /> 25,000+ Strong Community on Instagram
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Trending Reels & <span className="text-gradient">Viral Travel Stories</span>
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Watch raw, authentic clips exploring hidden gems, local street delicacies, and Western Ghats adventures across Hubli-Dharwad.
            </p>
          </div>

          <a
            href="https://www.instagram.com/travel_with.nj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-500 hover:to-amber-400 text-white font-bold text-xs shadow-lg shadow-pink-500/20 transition-all hover:scale-105 shrink-0 self-start md:self-auto"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @travel_with.nj</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {reels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setSelectedReel(reel)}
              className="group relative aspect-[9/16] rounded-3xl overflow-hidden glass-panel border border-slate-800 cursor-pointer shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-pink-500/50 hover:shadow-pink-500/20 bg-slate-950"
            >
              {/* Thumbnail Image with automatic fallback */}
              <img
                src={reel.thumbnail}
                alt={reel.title}
                onError={(e) => {
                  if (e.target.src !== reel.fallbackThumbnail) {
                    e.target.src = reel.fallbackThumbnail;
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl group-hover:scale-120 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Top View Stats */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-bold text-white">
                <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10 shadow-sm">
                  <Eye className="w-3 h-3 text-emerald-400" /> {reel.views}
                </span>
                <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10 text-pink-300 shadow-sm">
                  <Heart className="w-3 h-3 text-pink-400 fill-pink-400" /> {reel.likes}
                </span>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-3 left-3 right-3 space-y-1">
                <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider block">
                  📍 {reel.location}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 drop-shadow-md">
                  {reel.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Preview */}
      {selectedReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm aspect-[9/16] bg-slate-950 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col justify-between p-4">
            
            {/* Close & Sound Buttons */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setSelectedReel(null)}
                className="p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <video
              src={selectedReel.videoUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              poster={selectedReel.thumbnail}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />

            {/* Video Meta Info */}
            <div className="relative z-10 text-white text-xs flex items-center gap-2 pt-2">
              <span className="bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                @travel_with.nj
              </span>
              <span className="text-slate-200 font-medium truncate flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" /> {selectedReel.location}
              </span>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 space-y-3 pb-2">
              <h4 className="text-sm font-bold text-white leading-snug drop-shadow-md">
                {selectedReel.title}
              </h4>
              <a
                href={selectedReel.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <Instagram className="w-4 h-4" />
                <span>Open Full Reel on Instagram</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
