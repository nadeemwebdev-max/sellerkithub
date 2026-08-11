import React, { useState, useEffect } from 'react';
import { Play, Instagram, Heart, Eye, Sparkles, ExternalLink, Volume2, VolumeX, X, MapPin, Film } from 'lucide-react';
import { getPublicReels } from '../api/client';

// Helper to extract Instagram Shortcode from various reel link formats
function getInstagramShortcode(url) {
  if (!url) return null;
  const match = url.match(/(?:reel|p|reels)\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

const DEFAULT_REELS = [
  {
    id: 1,
    title: "Top 3 Hidden Gems near Hubli-Dharwad You Must Visit!",
    location: "Hubballi & Dharwad",
    views_count: "280K",
    likes_count: "26.4K",
    thumbnail_url: "/images/reels/hubli_dharwad_top3_cover.jpg",
    fallback_thumbnail_url: "/images/reels/hubli_dharwad_top3_cover.jpg",
    video_url: "/videos/hubli_dharwad_top3_hidden_gems.mp4",
    instagram_url: "https://www.instagram.com/reel/DMc-4yxTWnD/?igsh=a3kzcWdlY2E2YzNh"
  },
  {
    id: 2,
    title: "Monsoon Paradise Found Just 100km from Hubballi! 🌿",
    location: "Western Ghats (100km from Hubli)",
    views_count: "340K",
    likes_count: "35.1K",
    thumbnail_url: "/images/reels/just_100km_cover.jpg",
    fallback_thumbnail_url: "/images/reels/just_100km_cover.jpg",
    video_url: "/videos/just_100km.mp4",
    instagram_url: "https://www.instagram.com/travel_with.nj"
  },
  {
    id: 3,
    title: "Belagavi Road Trip: Secret Nature Spots Just 121km from Hubli",
    location: "Belagavi (121km from Hubli)",
    views_count: "195K",
    likes_count: "18.9K",
    thumbnail_url: "/images/reels/belgavi_121km_cover.jpg",
    fallback_thumbnail_url: "/images/reels/belgavi_121km_cover.jpg",
    video_url: "/videos/belgavi_121km.mp4",
    instagram_url: "https://www.instagram.com/travel_with.nj"
  },
  {
    id: 4,
    title: "Unseen Waterfall & Rainforest Trek • 125km from Hubballi",
    location: "Uttara Kannada (125km from Hubli)",
    views_count: "410K",
    likes_count: "42.8K",
    thumbnail_url: "/images/reels/hero_section_cover.jpg",
    fallback_thumbnail_url: "/images/reels/hero_section_cover.jpg",
    video_url: "/videos/hero_section_video.mp4",
    instagram_url: "https://www.instagram.com/travel_with.nj"
  }
];


export default function VideoReelsShowcase() {
  const [selectedReel, setSelectedReel] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [reels, setReels] = useState(DEFAULT_REELS);

  useEffect(() => {
    async function fetchReels() {
      try {
        const data = await getPublicReels();
        if (data && data.length > 0) {
          setReels(data);
        }
      } catch (err) {
        console.warn('Failed to load reels from API, using curated defaults', err);
      }
    }
    fetchReels();
  }, []);

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-pink-500/08 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-pink-500/10 text-pink-600 dark:text-pink-300 border border-pink-500/30 mb-3 shadow-sm">
              <Instagram className="w-3.5 h-3.5 text-pink-500 dark:text-pink-400" /> 25,000+ Strong Community on Instagram
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display">
              Trending Reels & <span className="text-gradient-sunset">Viral Travel Stories</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-xl font-normal">
              Watch raw, authentic clips exploring hidden waterfalls, secret homestays, and Western Ghats road trips across North Karnataka.
            </p>
          </div>


          <a
            href="https://www.instagram.com/travel_with.nj"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-white font-extrabold text-xs shadow-lg shadow-pink-500/25 transition-all hover:scale-105 shrink-0 self-start md:self-auto"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @travel_with.nj</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {reels.map((reel) => {
            const igUrl = reel.instagram_url || reel.instagramUrl;
            const thumb = reel.thumbnail_url || reel.thumbnail;
            const fallbackThumb = reel.fallback_thumbnail_url || reel.fallbackThumbnail || thumb;
            const views = reel.views_count || reel.views || '100K';
            const likes = reel.likes_count || reel.likes || '10K';

            return (
              <div
                key={reel.id}
                onClick={() => setSelectedReel(reel)}
                className="group relative aspect-[9/16] rounded-3xl overflow-hidden glass-panel border border-white/[0.08] cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.04] hover:border-pink-500/60 hover:shadow-2xl hover:shadow-pink-500/20 bg-slate-950"
              >
                {/* Thumbnail Image with automatic fallback */}
                <img
                  src={thumb}
                  alt={reel.title}
                  onError={(e) => {
                    if (e.target.src !== fallbackThumb) {
                      e.target.src = fallbackThumb;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-black/30 to-black/20 opacity-90 group-hover:opacity-60 transition-opacity" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-13 h-13 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-2xl group-hover:scale-125 group-hover:bg-gradient-to-tr group-hover:from-pink-500 group-hover:to-amber-400 group-hover:text-white transition-all duration-300 p-3">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Top View Stats */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-bold text-white z-10">
                  <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10 shadow-sm">
                    <Eye className="w-3.5 h-3.5 text-emerald-400" /> {views}
                  </span>
                  <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10 text-pink-300 shadow-sm">
                    <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" /> {likes}
                  </span>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-4 left-3.5 right-3.5 space-y-1.5 z-10">
                  <span className="text-[10px] text-emerald-300 font-extrabold uppercase tracking-wider block bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full w-fit">
                    📍 {reel.location}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 drop-shadow-md group-hover:text-pink-200 transition-colors">
                    {reel.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Video / Reel Modal Preview */}
      {selectedReel && (() => {
        const igUrl = selectedReel.instagram_url || selectedReel.instagramUrl;
        const videoSrc = selectedReel.video_url || selectedReel.videoUrl;
        const thumb = selectedReel.thumbnail_url || selectedReel.thumbnail;
        const shortcode = getInstagramShortcode(igUrl);
        const hasVideo = !!videoSrc;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-sm sm:max-w-md bg-slate-950 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col justify-between p-4 max-h-[92vh]">
              
              {/* Header / Close & Sound Buttons */}
              <div className="flex items-center justify-between mb-3 z-30">
                <div className="flex items-center gap-2">
                  <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <Instagram className="w-3 h-3" /> @travel_with.nj
                  </span>
                  <span className="text-xs text-slate-300 font-medium truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400 shrink-0" /> {selectedReel.location}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedReel(null)}
                  className="p-1.5 rounded-full bg-slate-800/80 text-white hover:bg-rose-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Container: Prioritizes direct video player for unrestricted, instant in-page playback */}
              <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center">
                {hasVideo ? (
                  <>
                    <video
                      src={videoSrc}
                      autoPlay
                      loop
                      controls
                      playsInline
                      poster={thumb}
                      className="w-full h-full object-cover"
                    />
                  </>
                ) : shortcode ? (
                  <iframe
                    src={`https://www.instagram.com/reel/${shortcode}/embed/`}
                    className="w-full h-full border-0 rounded-2xl bg-black"
                    allowTransparency="true"
                    allow="encrypted-media; picture-in-picture"
                    scrolling="no"
                    title={selectedReel.title}
                  />
                ) : (
                  <div className="text-center p-6 text-slate-400">
                    <Film className="w-12 h-12 mx-auto mb-2 text-pink-400" />
                    <p className="text-sm font-medium">Reel ready on Instagram</p>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="space-y-3 pt-3">
                <h4 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2">
                  {selectedReel.title}
                </h4>
                <a
                  href={igUrl || "https://www.instagram.com/travel_with.nj"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Open Full Reel on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </div>

            </div>
          </div>
        );
      })()}



    </section>
  );
}
