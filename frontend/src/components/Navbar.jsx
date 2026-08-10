import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Sparkles, Menu, X, Instagram, ShieldCheck, MapPin, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Curated Stays & Trips', path: '/stays', badge: 'Hot' },
    { name: 'Travel Guides & Blog', path: '/blog' },
    { name: 'Brand Collabs & Media Kit', path: '/collab' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-400 p-[2px] shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#090e1a] rounded-[14px] flex items-center justify-center">
                <Compass className="w-6 h-6 text-emerald-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white font-display">
                  Travel with <span className="text-gradient">NJ</span>
                </span>
                <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" /> 25k+
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" /> Hubli-Dharwad & Beyond
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-white bg-slate-800/80 shadow-inner border border-slate-700/60'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {link.name}
                {link.badge && (
                  <span className="ml-1.5 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Action CTAs & Social / Admin */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://www.instagram.com/travel_with.nj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 border border-pink-500/20 text-pink-300 transition-all hover:scale-105"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>@travel_with.nj</span>
            </a>

            <Link
              to="/stays"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold rounded-xl group bg-gradient-to-br from-emerald-400 to-teal-600 group-hover:from-emerald-400 group-hover:to-teal-600 hover:text-white text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
            >
              <span className="relative px-4 py-2.5 transition-all ease-in duration-75 bg-[#090e1a] rounded-[10px] group-hover:bg-opacity-0 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
                Book Verified Stay
              </span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 ml-1 pl-2 border-l border-slate-800">
                <Link
                  to="/admin"
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 transition-colors flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" /> Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="text-xs text-slate-500 hover:text-slate-300 font-medium px-2 py-1 transition-colors"
                title="Creator Login"
              >
                Creator Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/stays"
              className="text-xs font-bold bg-emerald-500 text-slate-950 px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              Stays
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-800/80 text-slate-200 hover:text-white border border-slate-700/60"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  isActive(link.path)
                    ? 'text-white bg-slate-800 border border-slate-700'
                    : 'text-slate-300 hover:bg-slate-800/40'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href="https://www.instagram.com/travel_with.nj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 text-sm font-semibold"
            >
              <Instagram className="w-4 h-4" /> Follow @travel_with.nj (25k)
            </a>

            {isAuthenticated ? (
              <div className="flex items-center gap-2 pt-2">
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-sm font-bold"
                >
                  Creator Dashboard
                </Link>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="text-center py-2 text-xs text-slate-400 hover:text-white"
              >
                Admin / Creator Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
