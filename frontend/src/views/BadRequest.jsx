import React from 'react';
import Link from '../components/Link';
import { 
  AlertTriangle, 
  RotateCcw, 
  Home, 
  Search, 
  HelpCircle 
} from 'lucide-react';

export default function BadRequest() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
      
      {/* 400 Header Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold border border-amber-200 dark:border-amber-500/20 mb-6">
        <AlertTriangle className="w-4 h-4" />
        <span>Error 400 – Bad Request</span>
      </div>

      <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
        Invalid <span className="text-amber-600 dark:text-amber-400">Request Parameters</span>
      </h1>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
        The request could not be processed due to invalid parameters or malformed input values. Please reset your calculator inputs or return to our homepage.
      </p>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-brand-600/20"
        >
          <Home className="w-4 h-4" />
          <span>Reset & Go to Home</span>
        </Link>

        <Link
          to="/contact"
          className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-2 transition border border-slate-200 dark:border-white/10"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Help & Support</span>
        </Link>
      </div>

    </div>
  );
}
