import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Sparkles, Menu, X, Instagram, User, LogOut, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Stays & Trips', path: '/stays' },
    { name: 'Travel Guides', path: '/blog' },
    { name: 'Collaborate', path: '/collab' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-[#050811]/85 border-b border-slate-200/80 dark:border-white/[0.06] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Clean Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-400 p-[1.5px] shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white dark:bg-[#050811] rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-emerald-500 dark:text-emerald-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white font-display">
              Travel with <span className="text-gradient">NJ</span>
            </span>
          </Link>

          {/* Clean Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-white/[0.03] p-1 rounded-full border border-slate-200/80 dark:border-white/[0.06] backdrop-blur-md">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    active
                      ? 'text-slate-950 dark:text-white bg-white dark:bg-white/[0.1] shadow-sm font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/[0.05]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Day / Night Mode Switcher Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-300 bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200/80 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 transition-all duration-300 shadow-sm"
              title={isDark ? "Switch to Day (Light) Mode" : "Switch to Night (Dark) Mode"}
              aria-label="Toggle Day and Night Mode"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <a
              href="https://www.instagram.com/travel_with.nj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-all"
              title="25k+ Followers on Instagram"
            >
              <Instagram className="w-4 h-4 text-pink-500 dark:text-pink-400" />
              <span>@travel_with.nj</span>
            </a>

            <Link
              to="/stays"
              className="btn-shimmer flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Stays</span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-1 ml-1 pl-2 border-l border-slate-200 dark:border-white/10">
                <Link
                  to="/admin"
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" /> Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 font-medium px-2 py-1 transition-colors"
                title="Creator Login"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10"
              title="Toggle Day/Night Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <Link
              to="/stays"
              className="text-xs font-bold bg-emerald-400 text-slate-950 px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm"
            >
              Book Stays
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#070c18]/95 backdrop-blur-2xl border-t border-slate-200 dark:border-white/[0.08] px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  isActive(link.path)
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                }`}
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-white/[0.06] flex flex-col gap-2">
            <a
              href="https://www.instagram.com/travel_with.nj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-300 text-xs font-bold"
            >
              <Instagram className="w-4 h-4" /> Follow @travel_with.nj (25k)
            </a>

            {isAuthenticated ? (
              <div className="flex items-center gap-2 pt-1">
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold"
                >
                  Creator Dashboard
                </Link>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 dark:text-rose-400"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="text-center py-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
              >
                Creator Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}


