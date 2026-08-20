import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calculator, 
  Image as ImageIcon, 
  Barcode, 
  Grid, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  TrendingUp, 
  ShoppingBag, 
  ChevronDown, 
  GitCompare, 
  Package, 
  Calendar,
  BookOpen 
} from 'lucide-react';
import { useCurrency, CURRENCIES } from '../context/CurrencyContext';

export default function Navbar() {
  const [calcDropdownOpen, setCalcDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currency, setCurrency, activeCurrency, theme, toggleTheme } = useCurrency();

  const location = useLocation();
  const currentPath = location.pathname;

  const calcDropdownRef = useRef(null);
  const currencyDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (calcDropdownRef.current && !calcDropdownRef.current.contains(event.target)) {
        setCalcDropdownOpen(false);
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target)) {
        setCurrencyDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Organized Calculator Suite Dropdown
  const calculatorTools = [
    {
      name: 'Multi-Marketplace Calculator',
      desc: 'All-in-one profit & fee breakdown for all platforms',
      path: '/',
      icon: Calculator,
      color: 'text-indigo-500 bg-indigo-500/10',
    },
    {
      name: 'Side-by-Side Comparison',
      desc: 'Compare net profit across Amazon, Etsy & Shopify',
      path: '/marketplace-comparison',
      icon: GitCompare,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      name: 'Batch SKU Calculator',
      desc: 'Portfolio cash flow & inventory profit modeling',
      path: '/batch-calculator',
      icon: Package,
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      name: 'Etsy Fee & Profit',
      desc: 'Listing renewals, 6.5% cut & offsite ads math',
      path: '/etsy-fee-calculator',
      icon: ShoppingBag,
      color: 'text-orange-500 bg-orange-500/10',
    },
    {
      name: 'Amazon FBA vs FBM',
      desc: 'Referral tiers, weight size fees & storage rates',
      path: '/amazon-fee-calculator',
      icon: TrendingUp,
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      name: 'Margin & Markup Matrix',
      desc: 'Tiered wholesale price points & CSV export',
      path: '/margin-matrix',
      icon: Grid,
      color: 'text-purple-500 bg-purple-500/10',
    },
  ];

  const directNavLinks = [
    { name: '1:1 Image Padder', path: '/product-image-resizer', icon: ImageIcon },
    { name: 'Barcode & QR Maker', path: '/barcode-generator', icon: Barcode },
    { name: 'Blog Guides', path: '/blog', icon: BookOpen },
    { name: '2026 Fee Hub', path: '/fee-updates', icon: Calendar },
  ];

  const isCalcActive = calculatorTools.some(tool => tool.path === currentPath);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-[#090d16]/90 border-b border-slate-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-emerald-400 p-0.5 shadow-glow-brand transition-transform group-hover:scale-105 flex items-center justify-center">
              <div className="w-full h-full bg-white dark:bg-[#090d16] rounded-[10px] flex items-center justify-center p-1.5">
                <svg className="w-full h-full" viewBox="0 0 48 48" fill="none">
                  <path d="M24 8L38 16V32L24 40L10 32V16L24 8Z" stroke="currentColor" className="text-brand-600 dark:text-brand-400" strokeWidth="3" strokeLinejoin="round" />
                  <path d="M24 8V24M24 24L38 32M24 24L10 32" stroke="currentColor" className="text-brand-600 dark:text-brand-400" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                  <circle cx="24" cy="24" r="5" className="fill-emerald-500 dark:fill-emerald-400" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                Seller<span className="text-brand-600 dark:text-brand-400">Kit</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 uppercase tracking-wide">
                HUB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            
            {/* Calculators Dropdown Button */}
            <div className="relative" ref={calcDropdownRef}>
              <button
                type="button"
                onClick={() => setCalcDropdownOpen(!calcDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  isCalcActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Calculator className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Calculators & Profit</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${calcDropdownOpen ? 'rotate-180 text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {calcDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-[440px] rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 grid grid-cols-2 gap-1.5"
                >
                  {calculatorTools.map((tool) => {
                    const Icon = tool.icon;
                    const active = currentPath === tool.path;
                    return (
                      <Link
                        key={tool.path}
                        to={tool.path}
                        onClick={() => setCalcDropdownOpen(false)}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl transition ${
                          active 
                            ? 'bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20' 
                            : 'hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg ${tool.color} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className={`block text-xs font-bold truncate ${active ? 'text-brand-700 dark:text-brand-400' : 'text-slate-900 dark:text-white'}`}>
                            {tool.name}
                          </span>
                          <span className="block text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-snug mt-0.5">
                            {tool.desc}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Direct Tool Links */}
            {directNavLinks.map((link) => {
              const Icon = link.icon;
              const active = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    active
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            
            {/* Currency Selector Pill */}
            <div className="relative" ref={currencyDropdownRef}>
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 transition"
                title="Change Currency"
              >
                <span className="w-4 h-4 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-400 font-bold flex items-center justify-center text-[10px]">
                  {activeCurrency.symbol}
                </span>
                <span className="font-mono">{currency}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {currencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 shadow-2xl p-1.5 z-50"
                >
                  <div className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    Select Currency
                  </div>
                  {Object.values(CURRENCIES).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCurrency(c.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition ${
                        currency === c.code
                          ? 'bg-brand-600 text-white font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-mono font-bold">{c.symbol}</span>
                        <span>{c.code}</span>
                      </span>
                      <span className="text-[10px] opacity-70">{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 transition"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Accordion Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-white/10 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block">
              Calculators & Profits
            </span>
            <div className="grid grid-cols-1 gap-1">
              {calculatorTools.map((tool) => {
                const Icon = tool.icon;
                const active = currentPath === tool.path;
                return (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      active
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    <span>{tool.name}</span>
                  </Link>
                );
              })}
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 pt-2 block">
              Utilities & Guides
            </span>
            <div className="grid grid-cols-1 gap-1">
              {directNavLinks.map((link) => {
                const Icon = link.icon;
                const active = currentPath === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      active
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
