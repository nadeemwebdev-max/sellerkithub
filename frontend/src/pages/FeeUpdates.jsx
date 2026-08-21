import React from 'react';
import { Calendar, TrendingUp, AlertCircle, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';

export default function FeeUpdates() {
  const updates = [
    {
      platform: "Amazon Seller Central",
      date: "Updated for 2026 Fee Schedules",
      badge: "FBA & Inbound",
      color: "amber",
      changes: [
        "Inbound Placement Service Fees: Introduction of minimal shipment split options with updated tier fees ($0.21 - $0.68/unit).",
        "Low-Inventory-Level Fees: Applied exclusively to standard-sized products with historical days of supply consistently below 28 days.",
        "Apparel Referral Fee Reductions: Maintained low 5% referral fee for apparel items priced under $15, and 10% for items between $15–$20.",
        "Monthly Storage Rates: Peak holiday storage (Oct-Dec) adjusted to $2.40/cu ft for standard items, and $0.78/cu ft off-peak (Jan-Sep)."
      ],
      calculatorLink: "/amazon-fee-calculator",
      linkText: "Calculate Amazon FBA Fees"
    },
    {
      platform: "Etsy Marketplace",
      date: "Updated for 2026 Policy Standards",
      badge: "Transaction & Ads",
      color: "orange",
      changes: [
        "Standard Transaction Fee: 6.5% of total order value (including item price, shipping charged, and gift wrap).",
        "Listing Renewal Fee: Flat $0.20 per item listing for 4 months or until sold.",
        "Payment Processing Rate: 3% + $0.25 per transaction for US-based sellers via Etsy Payments.",
        "Offsite Ads Policy: 15% optional fee for shops with under $10k annual sales; 12% mandatory for shops exceeding $10k/year."
      ],
      calculatorLink: "/etsy-fee-calculator",
      linkText: "Calculate Etsy Take-Home Profit"
    },
    {
      platform: "eBay Marketplace",
      date: "Updated for 2026 Standard Final Value",
      badge: "Final Value & Payments",
      color: "blue",
      changes: [
        "Basic Final Value Fee: 13.25% on total sale amount up to $7,500 (2.35% on portions above $7,500) across most categories.",
        "Insertion Fees: 250 zero insertion fee listings per month for all sellers; $0.35 per listing beyond the allowance.",
        "Regulatory Operating Fees: Approx 0.35% for UK and EU sellers to cover regional digital services compliance.",
        "Promoted Listings Standard: Cost-per-sale dynamic bidding model (typically 2%–10% ad rate chosen by seller)."
      ],
      calculatorLink: "/",
      linkText: "Calculate eBay Net Margin"
    },
    {
      platform: "Shopify & Independent Stores",
      date: "Updated for 2026 Plan Schedules",
      badge: "Gateway & Subscriptions",
      color: "emerald",
      changes: [
        "Shopify Payments Rate: 2.9% + 30¢ for Basic plan, 2.7% + 30¢ for Shopify plan, and 2.5% + 30¢ for Advanced plan.",
        "Third-Party Gateway Surcharge: 2.0% (Basic), 1.0% (Shopify), 0.5% (Advanced) if using external merchant processors instead of Shopify Payments.",
        "Zero Marketplace Referral Commission: 100% of profit retained minus payment gateway and hosting."
      ],
      calculatorLink: "/marketplace-comparison",
      linkText: "Compare Shopify vs Marketplaces"
    }
  ];

  const faqs = [
    {
      question: "How frequently does SellerKit update its marketplace fee calculators?",
      answer: "Our calculation algorithms are reviewed monthly and immediately updated whenever Amazon, Etsy, eBay, or Shopify publish revised fee schedules in their respective seller news portals."
    },
    {
      question: "What is Amazon's Low-Inventory-Level fee introduced recently?",
      answer: "Amazon charges a low-inventory surcharge on standard-size products if your inventory levels relative to historical sales fall below 28 days of supply. Maintaining healthy stock prevents this fee."
    },
    {
      question: "Can I dispute incorrect marketplace fee charges?",
      answer: "Yes. For Amazon FBA, you can request dimension/weight remeasures in Seller Central. For Etsy, you can review payment account CSVs to verify billing accuracy."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>Verified 2026 Marketplace Rate Hub</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          2026 E-Commerce <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-500 dark:from-brand-400 dark:to-indigo-300">Fee Changes & Rates</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
          Comprehensive, verified fee schedules for Amazon Seller Central, Etsy, eBay, and Shopify to keep your pricing profitable.
        </p>
      </div>

      {/* Fee Updates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {updates.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-5 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                <div>
                  <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    {item.platform}
                  </h2>
                  <span className="text-xs text-slate-500">{item.date}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {item.badge}
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {item.changes.map((change, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to={item.calculatorLink}
              className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-bold text-slate-900 dark:text-white transition"
            >
              <span>{item.linkText}</span>
              <ArrowRight className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            </Link>
          </div>
        ))}
      </div>

      {/* Author Bio & E-E-A-T Component */}
      <AuthorBio 
        authorName="SellerKit Market Policy & Rate Intelligence Team"
        authorRole="E-Commerce Regulatory & Policy Analysts"
        lastUpdated="2026 Marketplace Rate Audit Complete"
        category="E-Commerce Marketplace Policy Updates"
      />

      {/* Recommended Seller Tools Affiliate Component */}
      <AffiliateCTA 
        platform="general" 
        title="Recommended Seller Automation Software" 
        description="Stay ahead of marketplace rate changes with top-rated seller analytics."
      />

      <AdPlaceholder slot="horizontal" />

      <FAQSection title="2026 Marketplace Policy & Fee FAQs" faqs={faqs} />

    </div>
  );
}
