import React from 'react';
import Link from './Link';
import Logo from './Logo';
import { ShieldCheck, ArrowUp } from 'lucide-react';
import { getLocalizedPath } from '../i18n/utils';
import { DEFAULT_LANG, LANGUAGES } from '../i18n/ui';

export default function Footer({ currentLang = DEFAULT_LANG }) {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getUrl = (path) => getLocalizedPath(path, currentLang);

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#060a12] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link to={getUrl('/')}>
              <Logo />
            </Link>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Empowering online e-commerce sellers with 100% free, private, client-side financial calculators, product image visualizers, and inventory utilities.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Private Client-Side Tools</span>
            </div>
          </div>

          {/* Col 2: Free Seller Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Calculators & Utilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to={getUrl('/')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Multi-Marketplace Profit Calculator
                </Link>
              </li>
              <li>
                <Link to={getUrl('/tools/marketplace-comparison')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Side-by-Side Marketplace Comparison
                </Link>
              </li>
              <li>
                <Link to={getUrl('/tools/batch-calculator')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Multi-SKU Batch Profit Calculator
                </Link>
              </li>
              <li>
                <Link to={getUrl('/tools/etsy-fee-calculator')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Etsy Fee & Profit Calculator
                </Link>
              </li>
              <li>
                <Link to={getUrl('/tools/amazon-fba-calculator')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Amazon FBA / FBM Fee Calculator
                </Link>
              </li>
              <li>
                <Link to={getUrl('/tools/product-image-resizer')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  1:1 Square Product Image Padder
                </Link>
              </li>
              <li>
                <Link to={getUrl('/tools/barcode-generator')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Free Barcode & Label Sheet Maker
                </Link>
              </li>
              <li>
                <Link to={getUrl('/tools/profit-margin-calculator')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Wholesale Margin & Markup Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Guides */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Guides & Rates
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to={getUrl('/blog')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                  <span>E-Commerce Seller Blog</span>
                </Link>
              </li>
              <li>
                <Link to={getUrl('/blog/amazon-fba-fee-changes-2026')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  2026 Amazon Inbound Placement Guide
                </Link>
              </li>
              <li>
                <Link to={getUrl('/blog/etsy-seller-fee-breakdown-guide')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Etsy Fee Schedule Breakdown (2026)
                </Link>
              </li>
              <li>
                <Link to={getUrl('/fee-updates')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Marketplace Policy & Fee Update Hub
                </Link>
              </li>
              <li>
                <Link to={getUrl('/tools/roas-calculator')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Target ROAS & Advertising ROI Math
                </Link>
              </li>
              <li>
                <Link to={getUrl('/tools/gst-calculator')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  GST & Sales Tax Accounting
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Supported Languages & Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              International Editions
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              {Object.values(LANGUAGES).map((l) => (
                <a
                  key={l.code}
                  href={getLocalizedPath('/', l.code)}
                  className={`flex items-center gap-1.5 py-1 px-1.5 rounded transition ${
                    currentLang === l.code
                      ? 'text-brand-600 dark:text-brand-400 font-bold bg-brand-50 dark:bg-brand-500/10'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.name}</span>
                </a>
              ))}
            </div>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 pt-2">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to={getUrl('/about')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  About SellerKitHub
                </Link>
              </li>
              <li>
                <Link to={getUrl('/contact')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Contact Support & Feedback
                </Link>
              </li>
              <li>
                <Link to={getUrl('/privacy-policy')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Privacy Policy & Data Security
                </Link>
              </li>
              <li>
                <Link to={getUrl('/terms')} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Terms of Service & Disclaimers
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} SellerKitHub. All rights reserved. Amazon, Etsy, eBay, Walmart, Shopify, and Meesho are trademarks of their respective owners.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
