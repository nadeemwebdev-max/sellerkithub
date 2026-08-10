import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Instagram, Youtube, Mail, Phone, MapPin, Heart, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Dandeli Rafting & Resorts', path: '/stays?location=Dandeli' },
    { name: 'Sirsi Hidden Homestays', path: '/stays?location=Sirsi' },
    { name: 'Gokarna Beach Camping', path: '/stays?location=Gokarna' },
    { name: 'Yellapur Waterfalls Guide', path: '/blog/top-7-secret-waterfalls-near-hubli-dharwad-monsoon-guide' },
    { name: 'Badami Heritage Circuit', path: '/blog/badami-aihole-pattadakal-2-day-heritage-roadtrip-from-hubballi' },
    { name: 'Hubli-Dharwad Food Trail', path: '/blog/hubli-dharwad-street-food-trail-iconic-khanavalis-and-snacks' },
  ];

  return (
    <footer className="bg-[#05080f] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
                <Compass className="w-5 h-5 text-slate-950" />
              </div>
              <span className="font-extrabold text-xl text-white font-display">
                Travel with <span className="text-gradient">NJ</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              North Karnataka's premier travel creator & discovery platform. Curating authentic homestays, untamed Western Ghats waterfalls, road trips, and heritage adventures.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/travel_with.nj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500/50 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@travelwithnj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/50 flex items-center justify-center text-slate-300 hover:text-red-400 hover:scale-110 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@travelwithnj.com"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:scale-110 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Hubs */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base font-display">
              Popular North Karnataka Destinations
            </h3>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Stays & Resorts */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base font-display">
              For Homestays & Resorts
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Are you a homestay, river resort, or tour operator in Dandeli, Sirsi, Gokarna, or Belagavi?
            </p>
            <div className="glass-panel p-3.5 rounded-xl border border-emerald-500/20 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> Get NJ Verified
              </div>
              <p className="text-[11px] text-slate-300">
                Get listed in front of 25,000+ targeted local travelers with direct WhatsApp inquiries.
              </p>
              <Link
                to="/collab"
                className="inline-block w-full text-center py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-sm"
              >
                Partner With Us
              </Link>
            </div>
          </div>

          {/* Contact / Newsletter / Direct WhatsApp */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base font-display">
              Direct Travel Inquiries
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Need custom itinerary planning or group booking discounts?
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hubli & Dharwad, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 98765 43210 (WhatsApp Available)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>travelwithnj@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar & SEO Sitemap Links */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} TravelWithNJ.com. Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for North Karnataka travelers.
          </p>
          <div className="flex items-center gap-4">
            <a href="/api/seo/sitemap.xml" target="_blank" className="hover:text-emerald-400 transition-colors">
              XML Sitemap
            </a>
            <a href="/api/seo/robots.txt" target="_blank" className="hover:text-emerald-400 transition-colors">
              Robots.txt
            </a>
            <Link to="/admin" className="hover:text-slate-400 transition-colors">
              Admin CMS
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
