import React from 'react';
import { FileText, AlertTriangle } from 'lucide-react';
import { useI18n } from '../i18n/utils';

export default function Terms({ lang: propLang }) {
  const { lang, t } = useI18n(propLang);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-700 dark:text-slate-300 space-y-8">
      
      <div className="border-b border-slate-200 dark:border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold mb-3 border border-brand-200 dark:border-brand-500/20">
          <FileText className="w-3.5 h-3.5" />
          <span>Terms & Disclaimer</span>
        </div>
        <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500 mt-2">
          Effective Date: August 13, 2026
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-xs sm:text-sm space-y-6 leading-relaxed">
        
        <p>
          Welcome to <strong>SellerKit</strong>. By accessing or using our website located at <a href="https://sellerkithub.com" className="text-brand-600 dark:text-brand-400 underline">https://sellerkithub.com</a>, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.
        </p>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-900 dark:text-amber-300 space-y-1">
          <div className="flex items-center gap-2 font-bold text-xs uppercase text-amber-700 dark:text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <span>Financial & Calculation Disclaimer</span>
          </div>
          <p className="text-xs">
            SellerKit provides fee calculations, profit estimates, barcode generation, and image resizing tools strictly for informational and planning purposes. Actual marketplace fees (Amazon, Etsy, eBay, Shopify, Meesho) may vary based on exact weight, dimensions, individual seller tier, promotions, currency exchange fluctuations, and regional sales tax laws.
          </p>
        </div>

        <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mt-6">
          1. Use License
        </h2>
        <p>
          Permission is granted to freely use SellerKit's calculators, barcode generator, and image tools for personal and commercial business purposes. You may not resell, duplicate, or mirror the core website code without written consent.
        </p>

        <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mt-6">
          2. Accuracy of Materials
        </h2>
        <p>
          The tools and formulas appearing on SellerKit are updated periodically to reflect standard marketplace policies. However, SellerKit does not warrant that any of the materials on its website are 100% accurate, complete, or current in real-time, as third-party marketplaces may update their policies without notice.
        </p>

        <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mt-6">
          3. Third-Party Trademarks & Links
        </h2>
        <p>
          Amazon, Etsy, eBay, Shopify, and Meesho are registered trademarks of their respective owners. SellerKit is an independent utility website and is not affiliated, endorsed, or sponsored by any of these marketplace platforms.
        </p>

        <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mt-6">
          4. Modifications to Terms
        </h2>
        <p>
          SellerKit may revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms.
        </p>

      </div>
    </div>
  );
}
