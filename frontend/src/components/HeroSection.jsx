import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Compass, ShieldCheck, Instagram, ArrowRight, Play, Users, Award, Trees, Volume2, VolumeX, Flame } from 'lucide-react';

export default function HeroSection({ onOpenInquiry }) {
  const [isMuted, setIsMuted] = useState(true);

  const quickSpots = [
    { name: "Dandeli Rafting", filter: "Dandeli", icon: "🚣" },
    { name: "Yellapur Waterfalls", filter: "Yellapur", icon: "🌊" },
    { name: "Sirsi Homestays", filter: "Sirsi", icon: "🌿" },
    { name: "Gokarna Coast", filter: "Gokarna", icon: "🏖️" },
  ];

  return (
    <section className="relative pt-8 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
      
      {/* Background Multi-layer Aurora Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] pointer-events-none overflow-hidden">
        <div className="absolute -top-10 left-1/4 w-[500px] h-[500px] bg-emerald-500/12 rounded-full blur-[140px] animate-aurora" />
        <div className="absolute top-20 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-rose-500/08 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Verified Creator Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs font-bold shadow-lg shadow-emerald-500/10 mx-auto lg:mx-0 backdrop-blur-xl">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Instagram className="w-3.5 h-3.5 text-pink-500 dark:text-pink-400" />
              <span>@travel_with.nj Official Platform</span>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <span className="text-slate-900 dark:text-white font-extrabold flex items-center gap-1">
                <Users className="w-3 h-3 text-emerald-500 dark:text-emerald-400" /> 25k+ Travelers
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08] font-display">
              Discover the <span className="text-gradient">Unseen Magic</span> of North Karnataka.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Explore secret waterfalls, verified <strong className="text-slate-900 dark:text-white font-semibold">Dandeli & Sirsi homestays</strong>, Gokarna weekend treks, and authentic Hubli food trails curated by <strong className="text-emerald-600 dark:text-emerald-400 font-bold">NJ</strong> with direct WhatsApp discounts.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/stays"
                className="btn-shimmer w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2.5 hover:scale-105"
              >
                <Compass className="w-5 h-5" />
                <span>Explore Curated Stays & Trips</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/blog"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl glass-panel hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-800 dark:text-white font-bold text-sm border border-slate-200 dark:border-white/10 transition-all flex items-center justify-center gap-2 hover:scale-105 shadow-md"
              >
                <span>Read Travel Guides</span>
              </Link>
            </div>

            {/* Quick Explore Destination Chips */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" /> Popular:
              </span>
              {quickSpots.map((spot) => (
                <Link
                  key={spot.name}
                  to={`/stays?location=${spot.filter}`}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-900/60 hover:bg-emerald-500/15 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-300 border border-slate-200 dark:border-white/[0.06] hover:border-emerald-500/40 transition-all duration-200 flex items-center gap-1.5 shadow-sm"
                >
                  <span>{spot.icon}</span>
                  <span>{spot.name}</span>
                </Link>
              ))}
            </div>

            {/* Trust Stats Bar in Glass Cards */}
            <div className="pt-4 grid grid-cols-3 gap-3.5 max-w-lg mx-auto lg:mx-0">
              <div className="glass-panel p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/[0.06] text-center">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
                  25K+
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Followers
                </div>
              </div>

              <div className="glass-panel p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/[0.06] text-center">
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">
                  50+
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Hidden Spots
                </div>
              </div>

              <div className="glass-panel p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/[0.06] text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-500 dark:text-amber-400 font-display">
                  100%
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Verified Stays
                </div>
              </div>
            </div>


          </div>

          {/* Right Visual / Creator Video Reel Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Vibrant Ambient Glow Backdrop */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/40 via-teal-500/40 to-amber-500/40 rounded-[36px] blur-2xl opacity-60 group-hover:opacity-100 transition duration-1000 animate-pulse-glow"></div>

              {/* Main Video Frame Card */}
              <div className="relative rounded-[30px] overflow-hidden border border-white/20 shadow-2xl bg-[#090f1d]">
                
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-950">
                  {/* Hero Video Player */}
                  <video
                    src="/videos/hero_section_video.mp4"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-black/10 to-transparent pointer-events-none" />
                  
                  {/* Floating Top Pills & Sound Button */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                    <span className="bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 border border-white/20 shadow-lg">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Just 125km from Hubballi
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2.5 rounded-full bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/20 shadow-lg transition-transform hover:scale-110"
                        title={isMuted ? "Unmute Video Sound" : "Mute Video"}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-slate-300" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                      </button>
                      <span className="bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                        Live Reel
                      </span>
                    </div>
                  </div>

                  {/* Floating Creator Bio Tag (Always high contrast dark glass on video) */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl border border-white/20 space-y-2.5 bg-[#050914]/92 backdrop-blur-xl z-20 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-[2px] shrink-0 shadow-md">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                          alt="NJ Creator Avatar"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-extrabold text-white flex items-center gap-1.5">
                          NJ • Travel Creator <ShieldCheck className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                        </div>
                        <p className="text-[11px] text-slate-300 truncate">
                          Hubli | Dharwad | Western Ghats Explorer
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">Next Group Trip:</span>
                      <span className="text-emerald-400 font-bold bg-emerald-500/15 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                        Dandeli Rafting Camp
                      </span>
                    </div>
                  </div>

                </div>

              </div>


            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

