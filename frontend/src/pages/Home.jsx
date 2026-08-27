import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
  FileSpreadsheet,
  Grid,
  Target,
  Building2,
  GitCompare,
  Package,
  Image as ImageIcon,
  Barcode,
  ArrowRight,
  Zap
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { calculateMasterProfit, exportToCSV, MARKETPLACE_PRESETS } from '../utils/calculations';
import { trackEvent, TRACKED_EVENTS } from '../utils/analytics';
import RelatedTools from '../components/RelatedTools';
import FAQSection from '../components/FAQSection';
import SEOGuide from '../components/SEOGuide';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';

const SAMPLE_PRESETS = [
  {
    emoji: '👕',
    label: '$30 Amazon FBA Apparel',
    platform: 'amazon',
    price: 29.99,
    cost: 8.50,
    shipping: 0,
    referral: 15,
    fbaFee: 4.75,
    marketing: 2.50
  },
  {
    emoji: '🎨',
    label: '$20 Etsy Handmade Gift',
    platform: 'etsy',
    price: 20.00,
    cost: 4.00,
    shipping: 3.50,
    referral: 6.5,
    fbaFee: 0,
    marketing: 1.00
  },
  {
    emoji: '📱',
    label: '$250 eBay Electronics',
    platform: 'ebay',
    price: 250.00,
    cost: 140.00,
    shipping: 12.00,
    referral: 13.25,
    fbaFee: 0,
    marketing: 10.00
  },
  {
    emoji: '👗',
    label: '₹1,200 Meesho Fashion',
    platform: 'meesho',
    price: 1200,
    cost: 450,
    shipping: 80,
    referral: 0,
    fbaFee: 0,
    marketing: 100
  }
];

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

    trackEvent(TRACKED_EVENTS.PLATFORM_CHANGE, { platform: newPlatform });
  };

  const applyPreset = (preset) => {
    setPlatform(preset.platform);
    setSellingPrice(preset.price);
    setProductCost(preset.cost);
    setShippingCost(preset.shipping);
    setReferralRate(preset.referral);
    setFbaFee(preset.fbaFee);
    setMarketingSpend(preset.marketing);

    trackEvent(TRACKED_EVENTS.PRESET_CLICK, { preset: preset.label, platform: preset.platform });
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

    trackEvent(TRACKED_EVENTS.EXPORT_CSV, { platform: platform, netProfit: result.netProfit });
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
Calculated via SellerKitHub.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    trackEvent(TRACKED_EVENTS.COPY_SUMMARY, { platform: platform, netProfit: result.netProfit });
  };

  const isProfitable = result.netProfit > 0;

  const discreteTools = [
    { name: 'Amazon FBA Calculator', path: '/tools/amazon-fba-calculator', icon: TrendingUp, color: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10' },
    { name: 'Etsy Fee Calculator', path: '/tools/etsy-fee-calculator', icon: ShoppingBag, color: 'text-orange-600 bg-orange-50 dark:bg-orange-500/10' },
    { name: 'Profit Margin Calculator', path: '/tools/profit-margin-calculator', icon: Grid, color: 'text-purple-600 bg-purple-50 dark:bg-purple-500/10' },
    { name: 'ROAS & Ad Calculator', path: '/tools/roas-calculator', icon: Target, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' },
    { name: 'GST & Sales Tax Calculator', path: '/tools/gst-calculator', icon: Building2, color: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10' },
    { name: 'Marketplace Comparison', path: '/tools/marketplace-comparison', icon: GitCompare, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10' },
    { name: 'Multi-SKU Batch Calculator', path: '/tools/batch-calculator', icon: Package, color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-500/10' },
    { name: '1:1 Product Image Padder', path: '/tools/product-image-resizer', icon: ImageIcon, color: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10' },
    { name: 'Barcode & QR Maker', path: '/tools/barcode-generator', icon: Barcode, color: 'text-violet-600 bg-violet-50 dark:bg-violet-500/10' },
  ];

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-20 lg:pb-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
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

      {/* 1-Click Quick Sample Presets */}
      <div className="max-w-4xl mx-auto mb-8 p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>1-Click Sample Presets:</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
            Click to populate instant calculations
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SAMPLE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => applyPreset(preset)}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-brand-50 dark:hover:bg-brand-500/20 text-slate-800 dark:text-slate-200 text-xs font-medium border border-slate-200/80 dark:border-white/10 hover:border-brand-400 dark:hover:border-brand-500/40 transition-all text-left flex flex-col justify-between group shadow-2xs"
            >
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
                <span>{preset.emoji}</span>
                <span className="truncate">{preset.label}</span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                {preset.platform.toUpperCase()} • Live Demo
              </span>
            </button>
          ))}
        </div>
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
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
                  step="0.01"
                  value={sellingPrice || ''}
                  onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Product Sourcing Cost */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Product Sourcing Cost (COGS) ({activeCurrency.symbol})
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                  {activeCurrency.symbol}
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={productCost || ''}
                  onChange={(e) => setProductCost(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

          </div>

          {/* Logistics & Platform Rates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Outbound Shipping Cost */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Outbound Shipping / Postage ({activeCurrency.symbol})
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                  {activeCurrency.symbol}
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={shippingCost || ''}
                  onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Platform Referral Rate */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Marketplace Referral Fee %
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={referralRate || ''}
                  onChange={(e) => setReferralRate(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-8 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                  %
                </span>
              </div>
            </div>

          </div>

          {/* Marketing & Return Overhead */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Estimated Ad Spend / PPC per Unit ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                step="0.1"
                value={marketingSpend || ''}
                onChange={(e) => setMarketingSpend(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Return Rate Buffer (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={returnRate || ''}
                onChange={(e) => setReturnRate(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

        </div>

        {/* Right Output Results Panel (5 Cols) */}
        <div id="profit-breakdown-card" className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-6 sm:p-8 space-y-6 shadow-sm">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Estimated Net Take-Home
            </h2>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              isProfitable 
                ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                : 'bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400'
            }`}>
              {isProfitable ? 'Profitable Sale' : 'Operating at Loss'}
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Net Profit per Unit</span>
              <p className={`font-mono text-3xl font-extrabold ${
                isProfitable ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
              }`}>
                {format(result.netProfit)}
              </p>
              <p className="text-xs text-slate-500">
                Profit Margin: <span className="font-bold text-slate-900 dark:text-white font-mono">{result.netMarginPercent.toFixed(2)}%</span>
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
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

            {/* Copy & Excel Download Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleDownloadExcel}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-emerald-600/20"
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

        </div>

      </div>

      {/* Sticky Mobile Floating Profit Summary Banner */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-white/10 px-4 py-3 shadow-2xl flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
            Calculated Net Profit ({platform.toUpperCase()})
          </span>
          <div className="flex items-baseline gap-2">
            <span className={`text-lg font-extrabold font-mono ${isProfitable ? 'text-emerald-400' : 'text-rose-400'}`}>
              {format(result.netProfit)}
            </span>
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isProfitable ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
              {result.netMarginPercent.toFixed(1)}% margin
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            document.getElementById('profit-breakdown-card')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg transition"
        >
          View Details ↓
        </button>
      </div>

      {/* Programmatic SEO Discrete Tool Cards Suite Directory */}
      <section id="all-calculators-directory" className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-xl scroll-mt-24">
        <div className="border-b border-slate-200 dark:border-white/10 pb-4 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Dedicated Search-Engine-Indexable Tools Suite
          </span>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Browse All Discrete E-Commerce Utility Calculators
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Access specialized calculators for Amazon FBA, Etsy, ROAS paid traffic, GST sales tax, wholesale margin matrices, and product image resizers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {discreteTools.map(tool => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.path}
                to={tool.path}
                onClick={() => trackEvent(TRACKED_EVENTS.TOOL_CLICK, { target: tool.path })}
                className="p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:border-brand-500/50 bg-slate-50/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/5 transition flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${tool.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
                    {tool.name}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Author Bio & E-E-A-T Component */}
      <AuthorBio 
        authorName="SellerKit E-Commerce Analytics Team"
        authorRole="Multi-Marketplace Financial Modeling Experts"
        lastUpdated="2026 Rate Schedules Verified"
        category="Multi-Channel E-Commerce Modeling"
      />

      {/* Recommended Seller Tools Affiliate Component */}
      <AffiliateCTA 
        platform={platform} 
        title="Recommended Seller Automation Software" 
        description="Streamline store inventory, automate keyword rank tracking, and reduce cross-border transfer fees."
      />

      <AdPlaceholder slot="horizontal" />

      {/* Cross-Tool Navigation Component */}
      <RelatedTools currentPath="/" />

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
