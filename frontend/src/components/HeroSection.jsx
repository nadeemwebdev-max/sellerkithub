import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Compass, ShieldCheck, Instagram, ArrowRight, Play, Users, Award, Trees } from 'lucide-react';

export default function HeroSection({ onOpenInquiry }) {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      
      {/* Background Decorative Gradients & Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Verified Creator Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-emerald-500/30 text-emerald-300 text-xs font-bold shadow-lg shadow-emerald-500/10 mx-auto lg:mx-0">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>@travel_with.nj Official Platform</span>
              <span className="text-slate-500">•</span>
              <span className="text-white font-extrabold">25k+ Travelers Community</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-display">
              Discover the <span className="text-gradient">Unseen Magic</span> of North Karnataka.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Explore hidden waterfalls, verified Dandeli & Sirsi homestays, Gokarna weekend treks, and authentic Hubli food trails curated by <strong className="text-white">NJ</strong> with direct booking discounts.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/stays"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2.5 hover:scale-105"
              >
                <Compass className="w-5 h-5" />
                <span>Explore Curated Stays & Trips</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/blog"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl glass-panel hover:bg-slate-800/80 text-white font-bold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2 hover:scale-105"
              >
                <span>Read Travel Guides</span>
              </Link>
            </div>

            {/* Trust Stats Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-display">
                  25K+
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  Instagram Followers
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-display">
                  50+
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  Hidden Spots Explored
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-display">
                  100%
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  NJ Verified Stays
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual / Creator Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Glow border ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 rounded-[32px] blur-lg opacity-40 group-hover:opacity-100 transition duration-1000"></div>

              {/* Main Card */}
              <div className="relative rounded-[28px] overflow-hidden glass-panel border border-slate-700/80 shadow-2xl bg-[#0d1524]">
                
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80"
                    alt="Travel with NJ exploring North Karnataka Waterfalls"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] via-black/20 to-transparent" />
                  
                  {/* Floating Top Pill */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 border border-white/20">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Sathodi Falls, Yellapur
                    </span>
                    <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
                      Featured
                    </span>
                  </div>

                  {/* Floating Creator Bio Tag */}
                  <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-2xl border border-white/10 space-y-2 bg-slate-950/80 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 p-[2px]">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                          alt="NJ Creator Avatar"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-white flex items-center gap-1">
                          NJ • Travel Creator <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">
                          Hubli | Dharwad | Western Ghats Explorer
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">Next Group Trip:</span>
                      <span className="text-emerald-400 font-bold">Dandeli Rafting Camp</span>
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
