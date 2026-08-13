import React from 'react';
import { Sparkles, ShieldCheck, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-700 dark:text-slate-300 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Building the Fastest, Free Utilities for <span className="text-brand-600 dark:text-brand-400">Online Sellers</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          SellerKit was created to eliminate the guesswork from selling on Amazon, Etsy, eBay, Shopify, and Indian marketplaces with 100% private, client-side tools.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-2 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Instant Real-Time Math</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Calculations update immediately as you drag sliders or type numbers, with zero loading delays or page refreshes.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-2 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">100% Private by Design</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            All images and financial inputs remain on your device. We never upload your sensitive commercial data to any cloud database.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-2 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Always 100% Free</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            No mandatory signups, paywalls, or gated features. Built by indie makers for independent sellers worldwide.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4 shadow-sm">
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          Why We Built SellerKit
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Selling online has become increasingly complex. Between platform referral percentages, payment processing surcharges, return deductions, advertising ACoS, and fulfillment weight tiers, many sellers calculate high gross revenue only to realize they lost money at the end of the month.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Most existing fee calculators on the internet were built over a decade ago, are loaded with intrusive pop-up ads, or hide behind expensive subscriptions. We built SellerKit to provide a modern, lightning-fast suite of utility tools that work smoothly on both desktop and mobile devices.
        </p>
      </div>

      {/* Action CTA */}
      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition shadow-lg shadow-brand-600/20"
        >
          <span>Explore All Free Calculators & Tools</span>
        </Link>
      </div>

    </div>
  );
}
