import React, { useState, useRef, useEffect } from 'react';
import Link from './Link';
import Logo from './Logo';
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
  BookOpen,
  Target,
  Building2,
  Globe
} from 'lucide-react';
import { useCurrency, CURRENCIES, LANG_DEFAULT_CURRENCY } from '../context/CurrencyContext';
import { LANGUAGES, DEFAULT_LANG } from '../i18n/ui';
import FlagIcon from './FlagIcon';
import { getLangFromUrl, useTranslations, getLocalizedPath, getCleanPath } from '../i18n/utils';

export default function Navbar({ currentPath = '', currentLang = DEFAULT_LANG }) {
  const [calcDropdownOpen, setCalcDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currency, setCurrency, activeCurrency, theme, toggleTheme } = useCurrency();

  const [activePath, setActivePath] = useState(currentPath);
  const [activeLang, setActiveLang] = useState(currentLang);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      setActivePath(path);
      setActiveLang(getLangFromUrl(path));
    }
  }, [currentPath, currentLang]);

  const calcDropdownRef = useRef(null);
  const currencyDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (calcDropdownRef.current && !calcDropdownRef.current.contains(event.target)) {
        setCalcDropdownOpen(false);
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target)) {
        setCurrencyDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const t = useTranslations(activeLang);
  const effectivePath = activePath || currentPath;
  const currentLangObj = LANGUAGES[activeLang] || LANGUAGES.en;

  const getUrl = (path) => getLocalizedPath(path, activeLang);

  // Localized Calculator Tools
  const calculatorTools = [
    {
      name: t('tool.amazon'),
      desc: t('tool.amazonDesc'),
      path: '/tools/amazon-fba-calculator',
      icon: TrendingUp,
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      name: t('tool.etsy'),
      desc: t('tool.etsyDesc'),
      path: '/tools/etsy-fee-calculator',
      icon: ShoppingBag,
      color: 'text-orange-500 bg-orange-500/10',
    },
    {
      name: t('tool.walmart'),
      desc: t('tool.walmartDesc'),
      path: '/tools/walmart-fee-calculator',
      icon: ShoppingBag,
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      name: t('tool.margin'),
      desc: t('tool.marginDesc'),
      path: '/tools/profit-margin-calculator',
      icon: Grid,
      color: 'text-purple-500 bg-purple-500/10',
    },
    {
      name: t('tool.roas'),
      desc: t('tool.roasDesc'),
      path: '/tools/roas-calculator',
      icon: Target,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      name: t('tool.gst'),
      desc: t('tool.gstDesc'),
      path: '/tools/gst-calculator',
      icon: Building2,
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      name: t('tool.comparison'),
      desc: t('tool.comparisonDesc'),
      path: '/tools/marketplace-comparison',
      icon: GitCompare,
      color: 'text-indigo-500 bg-indigo-500/10',
    },
    {
      name: t('tool.batch'),
      desc: t('tool.batchDesc'),
      path: '/tools/batch-calculator',
      icon: Package,
      color: 'text-cyan-500 bg-cyan-500/10',
    },
    {
      name: t('nav.universalCalc'),
      desc: t('nav.universalDesc'),
      path: '/',
      icon: Calculator,
      color: 'text-slate-500 bg-slate-500/10',
    },
  ];

  const directNavLinks = [
    { name: t('nav.imagePadder'), path: '/tools/product-image-resizer', icon: ImageIcon },
    { name: t('nav.barcode'), path: '/tools/barcode-generator', icon: Barcode },
    { name: t('nav.blog'), path: '/blog', icon: BookOpen },
    { name: t('nav.feeHub'), path: '/fee-updates', icon: Calendar },
  ];

  const cleanCurrentPath = getCleanPath(effectivePath);
  const isCalcActive = calculatorTools.some(tool => tool.path === cleanCurrentPath);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-[#090d16]/90 border-b border-slate-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to={getUrl('/')} className="shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
            
            {/* Calculators Dropdown Button */}
            <div className="relative" ref={calcDropdownRef}>
              <button
                type="button"
                aria-expanded={calcDropdownOpen}
                aria-haspopup="true"
                aria-label={t('nav.calculators')}
                onClick={() => setCalcDropdownOpen(!calcDropdownOpen)}
                className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  isCalcActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Calculator className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <span className="whitespace-nowrap">{t('nav.calculators')}</span>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${calcDropdownOpen ? 'rotate-180 text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {calcDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-[520px] rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 grid grid-cols-2 gap-2"
                >
                  {calculatorTools.map((tool) => {
                    const Icon = tool.icon;
                    const active = cleanCurrentPath === tool.path;
                    return (
                      <Link
                        key={tool.path}
                        to={getUrl(tool.path)}
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
              const active = cleanCurrentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={getUrl(link.path)}
                  className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                    active
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                  <span className="whitespace-nowrap">{link.name}</span>
                </Link>
              );
            })}

          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 xl:gap-2 shrink-0">
            
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                aria-expanded={langDropdownOpen}
                aria-haspopup="true"
                aria-label={t('nav.selectLang')}
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 transition"
                title={t('nav.selectLang')}
              >
                <FlagIcon code={currentLangObj.code} className="w-4 h-3" />
                <span className="font-sans uppercase font-bold text-[11px]">{currentLangObj.code}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 shadow-2xl p-1.5 z-50 animate-in fade-in duration-100"
                >
                  <div className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    {t('nav.selectLang')}
                  </div>
                  {Object.values(LANGUAGES).map((l) => (
                    <a
                      key={l.code}
                      href={getLocalizedPath(effectivePath, l.code)}
                      onClick={() => {
                        setLangDropdownOpen(false);
                        try {
                          localStorage.removeItem('sellerkit_manual_currency');
                          const newCurr = LANG_DEFAULT_CURRENCY[l.code] || 'USD';
                          localStorage.setItem('sellerkit_currency', newCurr);
                          window.dispatchEvent(new CustomEvent('sellerkit:currency', { detail: newCurr }));
                        } catch (e) {}
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition ${
                        activeLang === l.code
                          ? 'bg-brand-600 text-white font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <FlagIcon code={l.code} className="w-4 h-3" />
                        <span>{l.name}</span>
                      </span>
                      <span className="text-[10px] font-mono opacity-70 uppercase">{l.code}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector Pill */}
            <div className="relative" ref={currencyDropdownRef}>
              <button
                type="button"
                aria-expanded={currencyDropdownOpen}
                aria-haspopup="true"
                aria-label={t('nav.selectCurrency')}
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 transition"
                title="Change Currency"
              >
                <span className="w-4 h-4 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-400 font-bold flex items-center justify-center text-[10px]">
                  {activeCurrency.symbol}
                </span>
                <span className="font-mono text-[11px]">{currency}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {currencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 max-h-80 overflow-y-auto rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 shadow-2xl p-1.5 z-50 animate-in fade-in duration-100"
                >
                  <div className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider sticky top-0 bg-white dark:bg-[#0f172a]">
                    {t('nav.selectCurrency')}
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
                        <span className="font-mono font-bold w-4 text-center">{c.symbol}</span>
                        <span>{c.code}</span>
                      </span>
                      <span className="text-[10px] opacity-70 truncate max-w-[100px]">{c.name}</span>
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
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Accordion Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 dark:border-white/10 space-y-3">
            
            {/* Language Switcher in Mobile Drawer */}
            <div className="px-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                {t('nav.selectLang')}
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {Object.values(LANGUAGES).map((l) => (
                  <a
                    key={l.code}
                    href={getLocalizedPath(effectivePath, l.code)}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      try {
                        localStorage.removeItem('sellerkit_manual_currency');
                        const newCurr = LANG_DEFAULT_CURRENCY[l.code] || 'USD';
                        localStorage.setItem('sellerkit_currency', newCurr);
                        window.dispatchEvent(new CustomEvent('sellerkit:currency', { detail: newCurr }));
                      } catch (e) {}
                    }}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
                      activeLang === l.code
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <FlagIcon code={l.code} className="w-3.5 h-2.5" />
                    <span className="uppercase text-[10px]">{l.code}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Currency Switcher in Mobile Drawer */}
            <div className="px-2 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                {t('nav.selectCurrency')}
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {Object.values(CURRENCIES).map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrency(c.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-xs font-semibold transition ${
                      currency === c.code
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <span className="font-mono text-[10px]">{c.symbol}</span>
                    <span className="uppercase text-[10px]">{c.code}</span>
                  </button>
                ))}
              </div>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block pt-2">
              {t('nav.calculators')}
            </span>
            <div className="grid grid-cols-1 gap-1">
              {calculatorTools.map((tool) => {
                const Icon = tool.icon;
                const active = cleanCurrentPath === tool.path;
                return (
                  <Link
                    key={tool.path}
                    to={getUrl(tool.path)}
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
                const active = cleanCurrentPath === link.path;
                return (
                  <Link
                    key={link.path}
                    to={getUrl(link.path)}
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
