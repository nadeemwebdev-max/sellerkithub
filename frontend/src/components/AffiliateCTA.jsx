import React from 'react';
import { ExternalLink, Sparkles, Award } from 'lucide-react';

export default function AffiliateCTA({
  platform = "amazon",
  title = "Recommended E-Commerce Growth Tools",
  description = "Boost your net margins and scale store revenue with top-rated seller automation software."
}) {
  const recommendations = {
    amazon: [
      {
        name: "Helium 10",
        badge: "Top FBA Tool",
        desc: "Product research, Amazon keyword tracker, and automated FBA inventory forecasting.",
        tag: "Save 20% Off",
        url: "https://i.helium10.com/c/7672631/3054775/37271",
        color: "from-blue-600 to-indigo-600"
      },
      {
        name: "Jungle Scout",
        badge: "Supplier DB",
        desc: "Find verified factory suppliers, track competitor sales volume, and audit PPC campaigns.",
        tag: "Exclusive Discount",
        url: "https://www.junglescout.com/",
        color: "from-amber-500 to-orange-600"
      }
    ],
    etsy: [
      {
        name: "eRank",
        badge: "Etsy SEO",
        desc: "Analyze Etsy search trends, audit listing tag compliance, and track competitor views.",
        tag: "Free Trial",
        url: "https://erank.com/",
        color: "from-purple-600 to-pink-600"
      },
      {
        name: "Printify",
        badge: "Print-on-Demand",
        desc: "Create custom apparel and home goods with automated sync to Etsy & Shopify.",
        tag: "Start Free",
        url: "https://printify.com/",
        color: "from-emerald-600 to-teal-600"
      }
    ],
    general: [
      {
        name: "Shopify Store",
        badge: "D2C Leader",
        desc: "Launch your independent online store with 0% platform referral fees.",
        tag: "$1/Month Promo",
        url: "https://www.shopify.com/",
        color: "from-emerald-600 to-green-700"
      },
      {
        name: "Payoneer",
        badge: "Cross-Border",
        desc: "Receive global marketplace payouts in USD, EUR, GBP & INR with lower fx fees.",
        tag: "$50 Bonus",
        url: "https://www.payoneer.com/",
        color: "from-rose-600 to-orange-600"
      }
    ]
  };

  const activeRecs = recommendations[platform] || recommendations.general;

  return (
    <section className="my-8 p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            <Award className="w-4 h-4 text-brand-500" />
            <span>{title}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{description}</p>
        </div>
        <span className="text-[10px] text-slate-600 dark:text-slate-400 italic">
          *Partner Recommendations
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activeRecs.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer font-sans"
            className="group relative p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-brand-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
                  {item.name}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-500/10 text-brand-700 dark:text-brand-400 border border-brand-500/20">
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {item.desc}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 dark:border-white/10 pt-2.5 text-xs">
              <span className="font-semibold text-brand-600 dark:text-brand-400 text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {item.tag}
              </span>
              <span className="text-slate-400 group-hover:text-brand-500 transition flex items-center gap-0.5 text-[11px] font-medium">
                Visit Partner <ExternalLink className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </a>
        ))}
      </div>

      <p className="text-[10px] text-slate-600 dark:text-slate-400 text-center pt-2">
        <strong>FTC Disclosure:</strong> SellerKitHub maintains editorial independence. When you sign up for services via our partner links, we may receive an affiliate referral commission at zero extra cost to you.
      </p>
    </section>
  );
}
