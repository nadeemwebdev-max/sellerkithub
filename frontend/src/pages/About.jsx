import React from 'react';
import { Sparkles, ShieldCheck, Zap, Target, BookOpen, UserCheck, Award, Mail, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthorBio from '../components/AuthorBio';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-700 dark:text-slate-300 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story, Mission & E-E-A-T Editorial Commitment</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Empowering Online Sellers with <span className="text-brand-600 dark:text-brand-400">100% Private, Accurate Tools</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          SellerKitHub was founded by e-commerce data analysts and former multi-channel merchants to eliminate financial guesswork for sellers across Amazon FBA, Etsy, eBay, Shopify, and Meesho.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-2 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Real-Time Client Computation</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            All calculations run instantly inside your browser memory. Dragging sliders or changing categories updates profit numbers in under 5 milliseconds.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-2 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">100% Private & Zero Uploads</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Your proprietary product sourcing costs, margins, and photos never leave your device. We store zero financial numbers on external databases.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-2 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Free & Accessible</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            No mandatory signups, credit cards, or paywalled features. Designed for independent handmade artisans, FBA brand owners, and D2C startups.
          </p>
        </div>
      </div>

      {/* Verified Author Bio Component */}
      <AuthorBio 
        authorName="SellerKit Editorial & Data Team"
        authorRole="E-Commerce Financial Modelers & Analytics Experts"
        lastUpdated="2026 Rate Schedule Verified"
        category="Company Profile & Methodology"
      />

      {/* Editorial Methodology Section */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Our Data Verification & Calculation Methodology
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          E-commerce fee schedules undergo constant revisions. Amazon updates referral tiers and storage rates annually, Etsy adjusts transaction cuts, and carriers raise dimensional postage fees every peak season.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Our editorial team audits official documentation—including the <em>Amazon Seller Central Fee Schedule (2026)</em>, <em>Etsy Seller Handbook Guidelines</em>, <em>eBay Seller Center Fee Structures</em>, and <em>Shopify Payment Gateway Standards</em>—on a monthly basis to update all calculation algorithms in our tool engines.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">Official Primary Sources</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We extract fee algorithms directly from official developer documentation and fee rate tables published by Amazon, Etsy, and eBay.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">Peer-Reviewed Models</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our formulas undergo verification against actual Amazon settlement reports and 3PL invoices to ensure real-world mathematical accuracy.
            </p>
          </div>
        </div>
      </div>

      {/* Entity & Governance Info */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] space-y-4 text-xs">
        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Building className="w-4 h-4 text-brand-500" />
          <span>Entity & Editorial Office Details</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-600 dark:text-slate-300">
          <div>
            <span className="font-semibold text-slate-900 dark:text-slate-200 block">Platform Name</span>
            <span>SellerKitHub (sellerkithub.com)</span>
          </div>
          <div>
            <span className="font-semibold text-slate-900 dark:text-slate-200 block">Editorial Contact</span>
            <a href="mailto:support@sellerkithub.com" className="text-brand-600 dark:text-brand-400 hover:underline font-mono">support@sellerkithub.com</a>
          </div>
          <div>
            <span className="font-semibold text-slate-900 dark:text-slate-200 block">Domain Architecture</span>
            <span>Client-Side Static Application (Next.js / Vite Static Export)</span>
          </div>
          <div>
            <span className="font-semibold text-slate-900 dark:text-slate-200 block">Legal Governance</span>
            <Link to="/privacy-policy" className="text-brand-600 dark:text-brand-400 hover:underline">Privacy Policy</Link> & <Link to="/terms" className="text-brand-600 dark:text-brand-400 hover:underline">Terms of Service</Link>
          </div>
        </div>
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
