import React, { useState } from 'react';
import Link from '../components/Link';
import { 
  FileQuestion, 
  Home, 
  Search, 
  ArrowRight, 
  TrendingUp, 
  ShoppingBag, 
  Grid, 
  Target, 
  Building2, 
  GitCompare, 
  Package
} from 'lucide-react';
import { useI18n } from '../i18n/utils';

export default function NotFound({ lang: propLang }) {
  const { lang, t } = useI18n(propLang);
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/?search=${encodeURIComponent(query.trim())}`;
    }
  };

  const popularTools = [
    { name: 'Amazon FBA Calculator', path: '/tools/amazon-fba-calculator', icon: TrendingUp, color: 'text-amber-500 bg-amber-500/10' },
    { name: 'Etsy Fee Calculator', path: '/tools/etsy-fee-calculator', icon: ShoppingBag, color: 'text-orange-500 bg-orange-500/10' },
    { name: 'Profit Margin Calculator', path: '/tools/profit-margin-calculator', icon: Grid, color: 'text-purple-500 bg-purple-500/10' },
    { name: 'ROAS & Ad Calculator', path: '/tools/roas-calculator', icon: Target, color: 'text-emerald-500 bg-emerald-500/10' },
    { name: 'GST & Sales Tax Calculator', path: '/tools/gst-calculator', icon: Building2, color: 'text-blue-500 bg-blue-500/10' },
    { name: 'Multi-SKU Batch Calculator', path: '/tools/batch-calculator', icon: Package, color: 'text-cyan-500 bg-cyan-500/10' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
      
      {/* 404 Header Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 text-xs font-semibold border border-rose-200 dark:border-rose-500/20 mb-6">
        <FileQuestion className="w-4 h-4" />
        <span>Error 404 – Page Not Found</span>
      </div>

      <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
        Oops! Page <span className="text-brand-600 dark:text-brand-400">Not Found</span>
      </h1>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
        The URL you accessed doesn't exist, has been moved, or is temporarily unavailable. Use the search bar below or explore our discrete e-commerce utility suite.
      </p>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto mb-10">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Amazon FBA, Etsy, ROAS, Margin calculators..."
            className="w-full pl-4 pr-12 py-3 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-500 shadow-md"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white transition"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <Link
          to="/"
          lang={lang}
          className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-brand-600/20"
        >
          <Home className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
        <Link
          to="/blog"
          lang={lang}
          className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-2 transition border border-slate-200 dark:border-white/10"
        >
          <span>Read Seller Blog</span>
        </Link>
      </div>

      {/* Popular Tools Directory */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 text-left shadow-lg">
        <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-4">
          Popular E-Commerce Calculators & Utilities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {popularTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.path}
                to={tool.path}
                lang={lang}
                className="p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-brand-500/50 bg-slate-50/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/5 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-7 h-7 rounded-lg ${tool.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-900 dark:text-white truncate group-hover:text-brand-600 dark:group-hover:text-brand-400">
                    {tool.name}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}
