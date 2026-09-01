import React from 'react';
import Link from '../components/Link';
import { 
  AlertOctagon, 
  RefreshCw, 
  Home, 
  Mail, 
  TrendingUp, 
  ShoppingBag, 
  Grid, 
  Target 
} from 'lucide-react';

export default function ServerError() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
      
      {/* 500 Header Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold border border-amber-200 dark:border-amber-500/20 mb-6">
        <AlertOctagon className="w-4 h-4" />
        <span>Error 500 – Internal Server Error</span>
      </div>

      <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
        Something Went <span className="text-amber-600 dark:text-amber-400">Wrong</span>
      </h1>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
        Our system encountered an unexpected technical issue. Don't worry, your data remains safe. Please try refreshing the page or navigating back to our home tools.
      </p>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <button
          onClick={handleReload}
          className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-amber-600/20"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Page</span>
        </button>

        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-2 transition border border-slate-200 dark:border-white/10"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>

        <Link
          to="/contact"
          className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-2 transition border border-slate-200 dark:border-white/10"
        >
          <Mail className="w-4 h-4" />
          <span>Report Technical Issue</span>
        </Link>
      </div>

      {/* Quick Nav Tools */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 text-left shadow-lg">
        <h2 className="font-display text-sm font-bold text-slate-900 dark:text-white mb-3">
          Quick Access Core Calculators
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <Link to="/tools/amazon-fba-calculator" className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-semibold text-slate-800 dark:text-slate-200 hover:border-brand-500">
            Amazon FBA Calculator
          </Link>
          <Link to="/tools/etsy-fee-calculator" className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-semibold text-slate-800 dark:text-slate-200 hover:border-brand-500">
            Etsy Fee Calculator
          </Link>
          <Link to="/tools/profit-margin-calculator" className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-semibold text-slate-800 dark:text-slate-200 hover:border-brand-500">
            Profit Margin Matrix
          </Link>
          <Link to="/tools/roas-calculator" className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-semibold text-slate-800 dark:text-slate-200 hover:border-brand-500">
            ROAS Ad Calculator
          </Link>
        </div>
      </div>

    </div>
  );
}
