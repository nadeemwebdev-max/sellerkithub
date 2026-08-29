import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ShoppingBag, 
  Grid, 
  Target, 
  GitCompare, 
  Package, 
  Image as ImageIcon, 
  Barcode, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { trackEvent, TRACKED_EVENTS } from '../utils/analytics';

const ALL_TOOLS = [
  {
    id: 'amazon',
    name: 'Amazon FBA Calculator',
    path: '/tools/amazon-fba-calculator',
    description: 'Calculate referral, FBA pick & pack, and storage fees.',
    icon: TrendingUp,
    color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20'
  },
  {
    id: 'etsy',
    name: 'Etsy Fee Calculator',
    path: '/tools/etsy-fee-calculator',
    description: 'Factoring listing fees, 6.5% transaction, and offsite ads.',
    icon: ShoppingBag,
    color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20'
  },
  {
    id: 'comparison',
    name: 'Marketplace Comparison',
    path: '/tools/marketplace-comparison',
    description: 'Side-by-side net profit comparison across Amazon, Etsy & eBay.',
    icon: GitCompare,
    color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20'
  },
  {
    id: 'batch',
    name: 'Multi-SKU Batch Calculator',
    path: '/tools/batch-calculator',
    description: 'Bulk profit analysis for entire catalog inventories.',
    icon: Package,
    color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20'
  },
  {
    id: 'barcode',
    name: 'Free Barcode & QR Generator',
    path: '/tools/barcode-generator',
    description: 'Generate printable UPC, EAN, Code128 and QR labels instantly.',
    icon: Barcode,
    color: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20'
  },
  {
    id: 'avery-qr',
    name: 'Avery QR Code Generator',
    path: '/tools/avery-qr-code-generator',
    description: 'Printable QR code label sheets for Avery 5160, 5163 & 5164.',
    icon: Barcode,
    color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20'
  },
  {
    id: 'fba-shipping',
    name: 'FBA Shipping & Freight',
    path: '/tools/fba-shipping-calculator',
    description: 'Model Amazon inbound freight and placement service fees.',
    icon: TrendingUp,
    color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20'
  },
  {
    id: 'walmart',
    name: 'Walmart Seller Calculator',
    path: '/tools/walmart-fee-calculator',
    description: 'Model Walmart 6%-15% referral rates, WFS fulfillment & net margins.',
    icon: ShoppingBag,
    color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20'
  },
  {
    id: 'etsy-digital',
    name: 'Etsy Digital Fee Calculator',
    path: '/tools/etsy-digital-fee-calculator',
    description: 'Calculate fees for digital downloads, printables & templates ($0 shipping).',
    icon: ShoppingBag,
    color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20'
  },
  {
    id: 'resizer',
    name: '1:1 Product Photo Resizer',
    path: '/tools/product-image-resizer',
    description: 'Pad & center listing images to perfect 1:1 square canvas.',
    icon: ImageIcon,
    color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20'
  },
  {
    id: 'margin',
    name: 'Profit Margin Matrix',
    path: '/tools/profit-margin-calculator',
    description: 'Quickly calculate target markup % and selling price targets.',
    icon: Grid,
    color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20'
  },
  {
    id: 'roas',
    name: 'ROAS & PPC Ad Calculator',
    path: '/tools/roas-calculator',
    description: 'Determine break-even ROAS and target ad spend profitability.',
    icon: Target,
    color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20'
  }
];

export default function RelatedTools({ currentPath = '', title = "Explore More Free Seller Tools" }) {
  // Filter out the current path to show relevant alternative tools
  const visibleTools = ALL_TOOLS.filter(
    (tool) => !currentPath.includes(tool.path) && tool.path !== currentPath
  ).slice(0, 4);

  return (
    <section className="mt-14 pt-10 border-t border-slate-200 dark:border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Utility Suite</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
            {title}
          </h2>
        </div>
        <Link
          to="/#all-calculators-directory"
          onClick={() => {
            trackEvent(TRACKED_EVENTS.TOOL_CLICK, { tool: 'all_tools_home' });
            const el = document.getElementById('all-calculators-directory');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition"
        >
          <span>View All Calculators</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleTools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <Link
              key={tool.id}
              to={tool.path}
              onClick={() => trackEvent(TRACKED_EVENTS.TOOL_CLICK, { target: tool.path })}
              className="group p-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-brand-500/40 dark:hover:border-brand-500/40 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-3 ${tool.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                <span>Use Tool</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
