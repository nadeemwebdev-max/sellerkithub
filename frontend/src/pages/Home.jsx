import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  HelpCircle, 
  Copy, 
  Check, 
  RefreshCw, 
  Sparkles,
  ShoppingBag,
  FileSpreadsheet
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { calculateMasterProfit, exportToCSV, MARKETPLACE_PRESETS } from '../utils/calculations';
import FAQSection from '../components/FAQSection';
import SEOGuide from '../components/SEOGuide';
import AdPlaceholder from '../components/AdPlaceholder';

export default function Home() {
  const { activeCurrency, format } = useCurrency();
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Form State
  const [platform, setPlatform] = useState('amazon');
  const [sellingPrice, setSellingPrice] = useState(activeCurrency.defaultPrice || 29.99);
  const [productCost, setProductCost] = useState(activeCurrency.defaultCost || 8.50);
  const [shippingCost, setShippingCost] = useState(activeCurrency.defaultShip || 4.50);
  const [referralRate, setReferralRate] = useState(15);
  const [fulfillmentType, setFulfillmentType] = useState('fba');
  const [fbaFee, setFbaFee] = useState(3.86);
  const [marketingSpend, setMarketingSpend] = useState(2.00);
  const [returnRate, setReturnRate] = useState(3);
  const [miscCost, setMiscCost] = useState(0.50);
  const [offsiteAdsActive, setOffsiteAdsActive] = useState(false);

  // Synchronize defaults when platform changes
  const handlePlatformChange = (newPlatform) => {
    setPlatform(newPlatform);
    if (newPlatform === 'amazon') setReferralRate(15);
    if (newPlatform === 'etsy') setReferralRate(6.5);
    if (newPlatform === 'ebay') setReferralRate(13.25);
    if (newPlatform === 'shopify') setReferralRate(0);
    if (newPlatform === 'meesho') setReferralRate(0);
  };

  // Perform Calculation
  const result = useMemo(() => {
    return calculateMasterProfit({
      sellingPrice,
      productCost,
      shippingCost,
      platform,
      fulfillmentType,
      referralRate,
      fbaFee,
      marketingSpend,
      returnRate,
      miscellaneousCost: miscCost,
      offsiteAdsActive,
      currencyRate: activeCurrency.rate
    });
  }, [
    sellingPrice,
    productCost,
    shippingCost,
    platform,
    fulfillmentType,
    referralRate,
    fbaFee,
    marketingSpend,
    returnRate,
    miscCost,
    offsiteAdsActive,
    activeCurrency
  ]);

  const handleDownloadExcel = () => {
    let csv = `Metric,Amount (${activeCurrency.code})\n`;
    csv += `"Platform","${platform.toUpperCase()}"\n`;
    csv += `"Selling Price","${result.grossRevenue.toFixed(2)}"\n`;
    csv += `"Product Sourcing Cost","${result.productCost.toFixed(2)}"\n`;
    csv += `"Platform & Payment Fees","${result.platformFee.toFixed(2)}"\n`;
    csv += `"Fulfillment & Shipping","${result.fulfillmentFee.toFixed(2)}"\n`;
    csv += `"Marketing / Ad Spend","${result.marketingSpend.toFixed(2)}"\n`;
    csv += `"Returns & Misc Buffer","${result.returnBuffer.toFixed(2)}"\n`;
    csv += `"Total Expenses","${result.totalExpenses.toFixed(2)}"\n`;
    csv += `"NET PROFIT","${result.netProfit.toFixed(2)}"\n`;
    csv += `"PROFIT MARGIN %","${result.netMarginPercent.toFixed(2)}%"\n`;
    csv += `"ROI %","${result.roiPercent.toFixed(2)}%"\n`;
    
    exportToCSV(`${platform}-profit-breakdown`, csv);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const copySummary = () => {
    const text = `SellerKit Profit Breakdown (${platform.toUpperCase()}):
Selling Price: ${format(result.grossRevenue)}
Product Cost: ${format(result.productCost)}
Platform & Processing Fees: ${format(result.platformFee)}
Fulfillment/Shipping: ${format(result.fulfillmentFee)}
Marketing & Ad Spend: ${format(result.marketingSpend)}
Total Expenses: ${format(result.totalExpenses)}
--------------------------------
NET PROFIT: ${format(result.netProfit)}
PROFIT MARGIN: ${result.netMarginPercent.toFixed(2)}%
ROI: ${result.roiPercent.toFixed(2)}%
Calculated via SellerKit.tools`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isProfitable = result.netProfit > 0;

  const faqs = [
    {
      question: "How are marketplace seller fees calculated?",
      answer: "Marketplace fees usually consist of three primary components: 1) Referral Commission (a percentage of the item sale price, typically 6.5% to 15%), 2) Payment Processing Fees (usually 2.9% to 3.5% + fixed 25¢–30¢ transaction charge), and 3) Fulfillment/Shipping charges (such as Amazon FBA pick-and-pack or direct carrier postage)."
    },
    {
      question: "What is a healthy net profit margin for e-commerce sellers?",
      answer: "A healthy net profit margin for e-commerce products is typically between 20% and 35%. Margins below 15% leave very little buffer for unexpected returns, advertising cost spikes (PPC), or price competition."
    },
    {
      question: "How does return rate affect my bottom line?",
      answer: "Every customer return incurs two costs: the lost fulfillment/shipping fee and potential product damage or restocking overhead. Factoring in a 3% to 7% return buffer ensures you don't over-estimate your net monthly profits."
    },
    {
      question: "Is this calculator updated for 2026 marketplace rates?",
      answer: "Yes, all fee algorithms reflect the latest fee schedules for Amazon Seller Central, Etsy, eBay, Shopify, and Indian marketplaces like Meesho."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Universal Multi-Marketplace Calculator</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Know Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-500 to-emerald-600 dark:from-brand-400 dark:via-indigo-300 dark:to-emerald-400">Real Profit</span> Before You Sell
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
          Instantly calculate platform referral fees, shipping costs, payment processing, and exact net profit margins across Amazon, Etsy, eBay, Shopify, and Meesho.
        </p>
      </div>

      {/* Marketplace Selector Tabs */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
        {[
          { id: 'amazon', name: 'Amazon (FBA/FBM)' },
          { id: 'etsy', name: 'Etsy Shop' },
          { id: 'ebay', name: 'eBay' },
          { id: 'shopify', name: 'Shopify Store' },
          { id: 'meesho', name: 'Meesho (India)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handlePlatformChange(tab.id)}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs whitespace-nowrap transition-all border ${
              platform === tab.id
                ? 'bg-brand-600 text-white border-brand-600 dark:border-brand-500 shadow-md font-semibold'
                : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs Panel (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-6 shadow-xl dark:shadow-2xl">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Product & Cost Inputs
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Values in {activeCurrency.code} ({activeCurrency.symbol})
              </p>
            </div>
            <button
              onClick={() => {
                setSellingPrice(activeCurrency.defaultPrice);
                setProductCost(activeCurrency.defaultCost);
                setShippingCost(activeCurrency.defaultShip);
                setMarketingSpend(2.00);
              }}
              className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition"
              title="Reset values"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Pricing Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Selling Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Target Selling Price ({activeCurrency.symbol})
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                  {activeCurrency.symbol}
                </span>
                <input
                  type="number"
                  step="any"
                  value={sellingPrice || ''}
                  onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono font-semibold focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Product Unit Cost */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Item Manufacturing / Sourcing Cost ({activeCurrency.symbol})
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                  {activeCurrency.symbol}
                </span>
                <input
                  type="number"
                  step="any"
                  value={productCost || ''}
                  onChange={(e) => setProductCost(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono font-semibold focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>

          </div>

          {/* Platform Specific Settings */}
          {platform === 'amazon' && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                  Amazon FBA / FBM Configuration
                </span>
                <div className="flex rounded-lg bg-slate-200 dark:bg-black/40 p-0.5 border border-slate-300 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setFulfillmentType('fba')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                      fulfillmentType === 'fba' ? 'bg-amber-500 text-black shadow-sm' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    FBA (Amazon Ships)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillmentType('fbm')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                      fulfillmentType === 'fbm' ? 'bg-amber-500 text-black shadow-sm' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    FBM (You Ship)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-700 dark:text-slate-300 mb-1">
                    Category Referral Fee ({referralRate}%)
                  </label>
                  <select
                    value={referralRate}
                    onChange={(e) => setReferralRate(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#090d16] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none"
                  >
                    {MARKETPLACE_PRESETS.amazon.categories.map((c, i) => (
                      <option key={i} value={c.rate}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {fulfillmentType === 'fba' ? (
                  <div>
                    <label className="block text-[11px] text-slate-700 dark:text-slate-300 mb-1">
                      FBA Size Tier Pick & Pack ({activeCurrency.symbol})
                    </label>
                    <select
                      value={fbaFee}
                      onChange={(e) => setFbaFee(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#090d16] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none"
                    >
                      {MARKETPLACE_PRESETS.amazon.fbaTiers.map((tier, i) => (
                        <option key={i} value={tier.fee}>
                          {tier.name} - {format(tier.fee * activeCurrency.rate)}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] text-slate-700 dark:text-slate-300 mb-1">
                      Merchant Shipping Cost to Customer ({activeCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={shippingCost || ''}
                      onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#090d16] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {platform === 'etsy' && (
            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-500/5 border border-orange-200 dark:border-orange-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-800 dark:text-orange-400 uppercase tracking-wider">
                  Etsy Standard Fees (6.5% + $0.20 + 3% payment)
                </span>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={offsiteAdsActive}
                    onChange={(e) => setOffsiteAdsActive(e.target.checked)}
                    className="rounded text-brand-600"
                  />
                  <span>Include Offsite Ads (15%)</span>
                </label>
              </div>
              <div>
                <label className="block text-[11px] text-slate-700 dark:text-slate-300 mb-1">
                  Shipping Cost Paid by Seller ({activeCurrency.symbol})
                </label>
                <input
                  type="number"
                  value={shippingCost || ''}
                  onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#090d16] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Shipping & Marketing Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {platform !== 'amazon' && platform !== 'etsy' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Shipping / Carrier Cost ({activeCurrency.symbol})
                </label>
                <input
                  type="number"
                  value={shippingCost || ''}
                  onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Marketing / PPC Ad Spend per Sale ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={marketingSpend || ''}
                onChange={(e) => setMarketingSpend(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Estimated Return Rate: {returnRate}%
              </label>
              <input
                type="range"
                min="0"
                max="25"
                step="0.5"
                value={returnRate}
                onChange={(e) => setReturnRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Packaging & Misc Cost ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={miscCost || ''}
                onChange={(e) => setMiscCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none"
              />
            </div>
          </div>

        </div>

        {/* Right Output Results Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className={`rounded-2xl border p-6 sm:p-8 space-y-6 shadow-2xl transition-all ${
            isProfitable
              ? 'bg-emerald-50/50 border-emerald-300 dark:bg-gradient-to-b dark:from-[#0c182a] dark:to-[#09121f] dark:border-emerald-500/30'
              : 'bg-rose-50/50 border-rose-300 dark:bg-gradient-to-b dark:from-[#1f0f15] dark:to-[#140a0e] dark:border-rose-500/30'
          }`}>
            
            {/* Header Result */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Estimated Net Profit (Per Unit)
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`font-mono text-4xl sm:text-5xl font-extrabold tracking-tight ${
                  isProfitable ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                }`}>
                  {format(result.netProfit)}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  isProfitable ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300'
                }`}>
                  {result.netMarginPercent.toFixed(1)}% Margin
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">ROI (Return on Cost)</span>
                <p className="font-mono text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {result.roiPercent.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Break-Even Price</span>
                <p className="font-mono text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {format(result.breakEvenPrice)}
                </p>
              </div>
            </div>

            {/* Visual Cost Distribution Bar */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1.5">
                <span>Revenue Allocation Breakdown</span>
                <span className="font-mono text-slate-900 dark:text-white font-semibold">{format(result.grossRevenue)}</span>
              </div>
              
              <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden flex">
                {result.breakdown.map((item, i) => {
                  const pct = result.grossRevenue > 0 ? (item.amount / result.grossRevenue) * 100 : 0;
                  if (pct <= 0) return null;
                  return (
                    <div
                      key={i}
                      style={{ width: `${Math.min(100, pct)}%`, backgroundColor: item.color }}
                      title={`${item.label}: ${format(item.amount)} (${pct.toFixed(1)}%)`}
                      className="h-full transition-all"
                    />
                  );
                })}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-[11px]">
                {result.breakdown.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="truncate">{item.label}</span>
                    </span>
                    <span className="font-mono font-medium ml-1 shrink-0">{format(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Copy & Excel Download Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleDownloadExcel}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-emerald-600/20"
                title="Download spreadsheet for Microsoft Excel / Google Sheets"
              >
                {downloaded ? <Check className="w-4 h-4 text-emerald-200" /> : <FileSpreadsheet className="w-4 h-4" />}
                <span>{downloaded ? 'Downloaded!' : 'Download Excel'}</span>
              </button>

              <button
                onClick={copySummary}
                className="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-brand-600/20"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>
            </div>

          </div>

          <AdPlaceholder slot="vertical" />

        </div>

      </div>

      {/* Horizontal Ad Space */}
      <AdPlaceholder slot="horizontal" />

      {/* SEO Guide & Formula Article */}
      <SEOGuide
        title="How to Calculate Marketplace Profit & Prevent Hidden Fee Traps"
        subtitle="Master the economics of selling on Amazon, Etsy, eBay, Shopify, and Meesho with zero surprises."
        formula="Net Profit = Selling Price - (Product Sourcing Cost + Platform Referral Fees + Payment Gateway Fees + Shipping/Fulfillment + Marketing/PPC + Return Buffers)"
        steps={[
          {
            title: "1. Lock Down Real Unit Cost",
            description: "Include not just the base factory price, but customs import duties, domestic freight, and unit packaging."
          },
          {
            title: "2. Input Platform Referral Rate",
            description: "Different categories carry different rates. For instance, Amazon electronics are 8%, while apparel is 17%."
          },
          {
            title: "3. Account for Payment Gateway Surcharges",
            description: "Nearly all platforms charge 2.9% to 3.5% + a fixed 25¢-30¢ per transaction fee to process credit cards."
          },
          {
            title: "4. Allocate Return Rate Buffer",
            description: "High-return categories like clothing often see 10-15% return rates. Allocate $1-$2 buffer per sale."
          }
        ]}
        tips={[
          "Always price with at least a 25% net profit margin buffer to absorb promotional discounts and sponsored PPC ad costs.",
          "Check whether the marketplace calculates referral commission on the item price only, or on Item Price + Shipping charged to customer.",
          "Use our 1:1 Product Image Padder to ensure your photos meet Amazon & Etsy square resolution guidelines without distortion."
        ]}
      />

      {/* FAQ Section with JSON-LD Schema */}
      <FAQSection title="Marketplace Profit & Fee FAQs" faqs={faqs} />

    </div>
  );
}
