import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#060a12] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-emerald-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-white dark:bg-[#090d16] rounded-[6px] flex items-center justify-center p-1">
                  <svg className="w-full h-full" viewBox="0 0 48 48" fill="none">
                    <path d="M24 8L38 16V32L24 40L10 32V16L24 8Z" stroke="currentColor" className="text-brand-600 dark:text-brand-400" strokeWidth="3" strokeLinejoin="round" />
                    <circle cx="24" cy="24" r="5" className="fill-emerald-500 dark:fill-emerald-400" />
                  </svg>
                </div>
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                Seller<span className="text-brand-600 dark:text-brand-400">Kit</span><span className="text-emerald-600 dark:text-emerald-400 text-xs font-black ml-0.5 uppercase">Hub</span>
              </span>
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
                <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Multi-Marketplace Profit Calculator
                </Link>
              </li>
              <li>
                <Link to="/marketplace-comparison" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Side-by-Side Marketplace Comparison
                </Link>
              </li>
              <li>
                <Link to="/batch-calculator" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Multi-SKU Batch Profit Calculator
                </Link>
              </li>
              <li>
                <Link to="/etsy-fee-calculator" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Etsy Fee & Profit Calculator
                </Link>
              </li>
              <li>
                <Link to="/amazon-fee-calculator" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Amazon FBA / FBM Fee Calculator
                </Link>
              </li>
              <li>
                <Link to="/product-image-resizer" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  1:1 Square Product Image Padder
                </Link>
              </li>
              <li>
                <Link to="/barcode-generator" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Free Barcode & Label Sheet Maker
                </Link>
              </li>
              <li>
                <Link to="/margin-matrix" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
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
                <Link to="/fee-updates" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>2026 Marketplace Fee Hub</span>
                </Link>
              </li>
              <li className="text-slate-600 dark:text-slate-400">
                Amazon Seller Central (US, UK, IN, CA)
              </li>
              <li className="text-slate-600 dark:text-slate-400">
                Etsy Handmade & Vintage Stores
              </li>
              <li className="text-slate-600 dark:text-slate-400">
                eBay Marketplace Standard & Promoted
              </li>
              <li className="text-slate-600 dark:text-slate-400">
                Shopify Independent Stores
              </li>
              <li className="text-slate-600 dark:text-slate-400">
                Meesho & Flipkart Resellers
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Support (AdSense Required) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  About SellerKit
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Privacy Policy & Cookies
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Terms of Service & Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Contact Us & Feedback
                </Link>
              </li>
            </ul>

            <button
              onClick={scrollToTop}
              className="mt-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-slate-800 dark:text-slate-300 text-xs transition"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} SellerKitHub.com. All rights reserved. Calculations are estimates based on standard marketplace fee schedules.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:underline">Privacy</Link>
            <Link to="/terms" className="hover:underline">Terms</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
