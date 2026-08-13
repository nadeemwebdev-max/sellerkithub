import React, { useState, useMemo } from 'react';
import { 
  GitCompare, 
  Trophy, 
  TrendingUp, 
  DollarSign, 
  Check, 
  Copy, 
  FileSpreadsheet, 
  RefreshCw, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { calculateMasterProfit, exportToCSV } from '../utils/calculations';
import FAQSection from '../components/FAQSection';
import SEOGuide from '../components/SEOGuide';
import AdPlaceholder from '../components/AdPlaceholder';

export default function MarketplaceComparison() {
  const { activeCurrency, format } = useCurrency();

  // Unified Input State
  const [sellingPrice, setSellingPrice] = useState(activeCurrency.defaultPrice || 35.00);
  const [productCost, setProductCost] = useState(activeCurrency.defaultCost || 9.50);
  const [shippingCost, setShippingCost] = useState(activeCurrency.defaultShip || 4.50);
  const [marketingSpend, setMarketingSpend] = useState(2.00);
  const [returnRate, setReturnRate] = useState(3);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Compute all 5 platforms simultaneously
  const comparisons = useMemo(() => {
    const platforms = [
      { id: 'amazon-fba', name: 'Amazon FBA', platform: 'amazon', fulfillmentType: 'fba', referralRate: 15, fbaFee: 3.86, color: '#f59e0b' },
      { id: 'amazon-fbm', name: 'Amazon FBM', platform: 'amazon', fulfillmentType: 'fbm', referralRate: 15, fbaFee: 0, color: '#d97706' },
      { id: 'etsy', name: 'Etsy Store', platform: 'etsy', fulfillmentType: 'fbm', referralRate: 6.5, fbaFee: 0, color: '#ea580c' },
      { id: 'ebay', name: 'eBay Marketplace', platform: 'ebay', fulfillmentType: 'fbm', referralRate: 13.25, fbaFee: 0, color: '#2563eb' },
      { id: 'shopify', name: 'Shopify Store', platform: 'shopify', fulfillmentType: 'fbm', referralRate: 0, fbaFee: 0, color: '#10b981' },
      { id: 'meesho', name: 'Meesho Reseller', platform: 'meesho', fulfillmentType: 'fbm', referralRate: 0, fbaFee: 0, color: '#ec4899' },
    ];

    const results = platforms.map(p => {
      const res = calculateMasterProfit({
        sellingPrice,
        productCost,
        shippingCost,
        platform: p.platform,
        fulfillmentType: p.fulfillmentType,
        referralRate: p.referralRate,
        fbaFee: p.fbaFee,
        marketingSpend,
        returnRate,
        miscellaneousCost: 0.5,
        offsiteAdsActive: false,
        currencyRate: activeCurrency.rate
      });

      return {
        ...p,
        netProfit: res.netProfit,
        netMarginPercent: res.netMarginPercent,
        totalExpenses: res.totalExpenses,
        platformFee: res.platformFee,
        fulfillmentFee: res.fulfillmentFee,
        roiPercent: res.roiPercent
      };
    });

    // Sort by highest profit
    return results.sort((a, b) => b.netProfit - a.netProfit);
  }, [sellingPrice, productCost, shippingCost, marketingSpend, returnRate, activeCurrency]);

  const bestPlatform = comparisons[0];

  const handleDownloadExcel = () => {
    let csv = `Rank,Platform,Selling Price (${activeCurrency.code}),Sourcing Cost,Platform Fees,Fulfillment/Shipping,Total Expenses,Net Profit (${activeCurrency.code}),Margin %,ROI %\n`;
    comparisons.forEach((item, idx) => {
      csv += `"#${idx + 1}","${item.name}","${sellingPrice}","${productCost}","${item.platformFee.toFixed(2)}","${item.fulfillmentFee.toFixed(2)}","${item.totalExpenses.toFixed(2)}","${item.netProfit.toFixed(2)}","${item.netMarginPercent.toFixed(1)}%","${item.roiPercent.toFixed(1)}%"\n`;
    });
    exportToCSV(`marketplace-side-by-side-comparison`, csv);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const copySummary = () => {
    let text = `SellerKit Marketplace Profit Comparison:\nSelling Price: ${format(sellingPrice)} | Cost: ${format(productCost)}\n--------------------------------\n`;
    comparisons.forEach((item, idx) => {
      text += `#${idx + 1} ${item.name}: Net Profit ${format(item.netProfit)} (${item.netMarginPercent.toFixed(1)}% margin)\n`;
    });
    text += `--------------------------------\nWinner: ${bestPlatform.name} yields highest take-home profit!\nCalculated with SellerKit.tools`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "Which marketplace offers the highest seller profit margin?",
      answer: "Independent stores on Shopify typically yield the highest profit margins (often 40%–55%) because they don't charge 15% marketplace referral commissions. However, marketplaces like Amazon provide immediate organic search traffic without requiring paid ad acquisition."
    },
    {
      question: "Should I sell on Amazon FBA or Shopify first?",
      answer: "Amazon FBA is ideal for fast sales volume and immediate customer trust through Prime shipping. Shopify is best for long-term brand building, repeat customer retention, and maximum margin control."
    },
    {
      question: "How are payment gateway fees compared across platforms?",
      answer: "Etsy charges 3% + $0.25, eBay charges 13.25% all-inclusive, Amazon includes payment processing in its referral fee, and Shopify charges standard 2.9% + $0.30 via Shopify Payments."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
          <GitCompare className="w-3.5 h-3.5" />
          <span>Cross-Platform Profit Arbitrage Tool</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Side-by-Side <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-500 dark:from-brand-400 dark:to-emerald-400">Marketplace Comparison</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
          Enter your product numbers once to instantly see where you earn the highest take-home profit across Amazon, Etsy, eBay, Shopify, and Meesho.
        </p>
      </div>

      {/* Input Parameters Bar */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 shadow-xl mb-8">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Shared Product Pricing & Costs ({activeCurrency.code})
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleDownloadExcel}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              {downloaded ? <Check className="w-3.5 h-3.5" /> : <FileSpreadsheet className="w-3.5 h-3.5" />}
              <span>{downloaded ? 'Downloaded!' : 'Export Excel'}</span>
            </button>
            <button
              onClick={copySummary}
              className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Price ({activeCurrency.symbol})
            </label>
            <input
              type="number"
              value={sellingPrice || ''}
              onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm font-bold focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Unit Sourcing Cost ({activeCurrency.symbol})
            </label>
            <input
              type="number"
              value={productCost || ''}
              onChange={(e) => setProductCost(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm font-bold focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Postage / Carrier ({activeCurrency.symbol})
            </label>
            <input
              type="number"
              value={shippingCost || ''}
              onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm font-bold focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              PPC / Marketing ({activeCurrency.symbol})
            </label>
            <input
              type="number"
              value={marketingSpend || ''}
              onChange={(e) => setMarketingSpend(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm font-bold focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
      </div>

      {/* Winner Spotlight Banner */}
      {bestPlatform && (
        <div className="p-4 sm:p-5 rounded-2xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                Highest Profit Winner
              </span>
              <h3 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">
                {bestPlatform.name} delivers <span className="text-emerald-700 dark:text-emerald-400">{format(bestPlatform.netProfit)}</span> net profit ({bestPlatform.netMarginPercent.toFixed(1)}% margin)
              </h3>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs text-slate-600 dark:text-slate-400 block">Total Unit Expenses:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">{format(bestPlatform.totalExpenses)}</span>
          </div>
        </div>
      )}

      {/* Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {comparisons.map((item, idx) => {
          const isWinner = idx === 0;
          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-6 space-y-4 transition shadow-lg ${
                isWinner 
                  ? 'border-emerald-400 bg-white dark:bg-gradient-to-b dark:from-[#0f1f1d] dark:to-[#0a1413] shadow-emerald-500/10 ring-2 ring-emerald-500/20' 
                  : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322]'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 font-mono font-bold text-xs flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {item.name}
                  </h4>
                </div>
                {isWinner && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] uppercase">
                    Highest Margin
                  </span>
                )}
              </div>

              {/* Profit Metric */}
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Net Take-Home Profit</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className={`font-mono text-3xl font-extrabold ${
                    item.netProfit > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                  }`}>
                    {format(item.netProfit)}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    ({item.netMarginPercent.toFixed(1)}%)
                  </span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-white/5 pt-3">
                <div className="flex justify-between">
                  <span>Platform Fee Cut:</span>
                  <span className="font-mono text-rose-600 dark:text-rose-400">-{format(item.platformFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fulfillment / Shipping:</span>
                  <span className="font-mono text-rose-600 dark:text-rose-400">-{format(item.fulfillmentFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Expenses:</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">{format(item.totalExpenses)}</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 border-t border-slate-100 dark:border-white/5 pt-1.5">
                  <span>ROI on Cost:</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400">{item.roiPercent.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AdPlaceholder slot="horizontal" />

      <SEOGuide
        title="Multi-Channel E-Commerce Profit Arbitrage Strategy"
        subtitle="How top sellers maximize revenue by cross-listing products across multiple marketplaces."
        formula="Arbitrage Margin = Platform Net Revenue - Sourcing Cost - Channel-Specific Acquisition Cost"
        steps={[
          {
            title: "1. Leverage Marketplace Trust for High Ticket Items",
            description: "Use Amazon FBA for fast Prime delivery on higher-margin items where customers demand next-day delivery."
          },
          {
            title: "2. Build Shopify for Repeat Subscribers",
            description: "Sell replenishable or custom items on Shopify to eliminate platform referral commissions and capture direct email lists."
          },
          {
            title: "3. Craft & Vintage on Etsy",
            description: "Etsy buyers expect handmade quality and are willing to pay higher retail price points with lower price sensitivity."
          }
        ]}
        tips={[
          "Export the side-by-side comparison spreadsheet to model multi-channel pricing strategies before launching new inventory.",
          "Check category-specific referral rates since apparel, electronics, and jewelry carry different percentages on Amazon and eBay."
        ]}
      />

      <FAQSection title="Marketplace Comparison FAQs" faqs={faqs} />

    </div>
  );
}
