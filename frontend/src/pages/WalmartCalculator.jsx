import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Copy, 
  Check, 
  RefreshCw, 
  Layers, 
  ShieldCheck, 
  FileSpreadsheet, 
  BookOpen, 
  BarChart3, 
  Lightbulb, 
  Store, 
  Truck,
  PackageCheck
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { exportToCSV } from '../utils/calculations';
import { trackEvent, TRACKED_EVENTS } from '../utils/analytics';
import RelatedTools from '../components/RelatedTools';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';

export const WALMART_CATEGORIES = [
  { id: 'apparel', name: 'Apparel & Accessories (15%)', rate: 15 },
  { id: 'automotive', name: 'Automotive & Powersports (12%)', rate: 12 },
  { id: 'baby', name: 'Baby & Toddler (8% <= $10, 15% > $10)', rate: 15, lowRate: 8, threshold: 10 },
  { id: 'beauty', name: 'Beauty & Personal Care (8% <= $10, 15% > $10)', rate: 15, lowRate: 8, threshold: 10 },
  { id: 'books', name: 'Books & Media (15%)', rate: 15 },
  { id: 'electronics', name: 'Consumer Electronics (8%)', rate: 8 },
  { id: 'elec_acc', name: 'Electronic Accessories (15% <= $100, 8% above)', rate: 15, tiered: true },
  { id: 'grocery', name: 'Grocery & Gourmet Food (8% <= $15, 15% > $15)', rate: 15, lowRate: 8, threshold: 15 },
  { id: 'home', name: 'Home & Kitchen (15%)', rate: 15 },
  { id: 'lawn', name: 'Lawn & Garden (15%)', rate: 15 },
  { id: 'office', name: 'Office Products (15%)', rate: 15 },
  { id: 'pet', name: 'Pet Supplies (15%)', rate: 15 },
  { id: 'sports', name: 'Sports & Outdoors (15%)', rate: 15 },
  { id: 'toys', name: 'Toys & Games (15%)', rate: 15 },
  { id: 'other', name: 'Everything Else (15%)', rate: 15 },
];

export default function WalmartCalculator() {
  const { activeCurrency, format } = useCurrency();

  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Form Inputs
  const [sellingPrice, setSellingPrice] = useState(38.00);
  const [itemCost, setItemCost] = useState(10.50);
  const [categoryId, setCategoryId] = useState('home');
  const [fulfillmentType, setFulfillmentType] = useState('wfs'); // 'wfs' or 'mfn'
  
  // WFS fulfillment costs
  const [wfsFulfillmentFee, setWfsFulfillmentFee] = useState(3.45);
  const [inboundFreight, setInboundFreight] = useState(1.20);
  const [monthlyStorage, setMonthlyStorage] = useState(0.30);
  
  // MFN merchant costs
  const [merchantShipping, setMerchantShipping] = useState(5.50);
  
  // Marketing & Returns
  const [adSpendPerUnit, setAdSpendPerUnit] = useState(2.50);
  const [returnRate, setReturnRate] = useState(3.0);

  const selectedCategory = WALMART_CATEGORIES.find(c => c.id === categoryId) || WALMART_CATEGORIES[0];

  // Calculations
  const calculations = useMemo(() => {
    const price = Number(sellingPrice) || 0;
    const cogs = Number(itemCost) || 0;
    const ads = Number(adSpendPerUnit) || 0;
    const rRate = Number(returnRate) || 0;

    // 1. Referral Fee Calculation
    let referralFee = 0;
    if (selectedCategory.lowRate && selectedCategory.threshold) {
      referralFee = price <= selectedCategory.threshold 
        ? price * (selectedCategory.lowRate / 100) 
        : price * (selectedCategory.rate / 100);
    } else if (selectedCategory.tiered) {
      if (price <= 100) {
        referralFee = price * 0.15;
      } else {
        referralFee = (100 * 0.15) + ((price - 100) * 0.08);
      }
    } else {
      referralFee = price * (selectedCategory.rate / 100);
    }

    // Minimum referral fee is $0.00 on Walmart (no fixed minimum subscription required)
    const effectiveReferralFee = Math.max(0, referralFee);

    // 2. Fulfillment Costs
    let totalFulfillmentCost = 0;
    let fulfillmentBreakdown = {};

    if (fulfillmentType === 'wfs') {
      const wfsFee = Number(wfsFulfillmentFee) || 0;
      const inbound = Number(inboundFreight) || 0;
      const storage = Number(monthlyStorage) || 0;
      totalFulfillmentCost = wfsFee + inbound + storage;
      fulfillmentBreakdown = {
        wfsFee,
        inbound,
        storage,
        type: 'Walmart Fulfillment Services (WFS)'
      };
    } else {
      const mfnShip = Number(merchantShipping) || 0;
      totalFulfillmentCost = mfnShip;
      fulfillmentBreakdown = {
        merchantShipping: mfnShip,
        type: 'Merchant Fulfilled (MFN)'
      };
    }

    // 3. Return Allowance Reserve
    const returnReserve = (price * (rRate / 100)) * 0.20; // 20% return loss factor

    // 4. Total Cost & Profit
    const totalCost = cogs + effectiveReferralFee + totalFulfillmentCost + ads + returnReserve;
    const netProfit = price - totalCost;
    const netMarginPercent = price > 0 ? (netProfit / price) * 100 : 0;
    const roiPercent = cogs > 0 ? (netProfit / cogs) * 100 : 0;

    // 5. Break-Even Price Formula:
    // Break-Even = (COGS + Fulfillment + Ads + Fixed) / (1 - ReferralRate% - (ReturnRate% * 0.20))
    const variableRatio = (selectedCategory.rate / 100) + ((rRate / 100) * 0.20);
    const breakEvenFixed = cogs + (fulfillmentType === 'wfs' ? (Number(wfsFulfillmentFee) + Number(inboundFreight) + Number(monthlyStorage)) : Number(merchantShipping)) + ads;
    const breakEvenPrice = variableRatio < 1 ? breakEvenFixed / (1 - variableRatio) : 0;

    return {
      price,
      cogs,
      effectiveReferralFee,
      totalFulfillmentCost,
      fulfillmentBreakdown,
      ads,
      returnReserve,
      totalCost,
      netProfit,
      netMarginPercent,
      roiPercent,
      breakEvenPrice
    };
  }, [sellingPrice, itemCost, categoryId, fulfillmentType, wfsFulfillmentFee, inboundFreight, monthlyStorage, merchantShipping, adSpendPerUnit, returnRate]);

  const handleDownloadExcel = () => {
    let csv = `Metric,Value (${activeCurrency.code})\n`;
    csv += `"Selling Price","${sellingPrice}"\n`;
    csv += `"Product Sourcing Cost (COGS)","${itemCost}"\n`;
    csv += `"Walmart Category","${selectedCategory.name}"\n`;
    csv += `"Fulfillment Mode","${fulfillmentType === 'wfs' ? 'Walmart Fulfillment Services (WFS)' : 'Merchant Fulfilled'}"\n`;
    csv += `"Walmart Referral Fee","-${calculations.effectiveReferralFee.toFixed(2)}"\n`;
    csv += `"Fulfillment Shipping Cost","-${calculations.totalFulfillmentCost.toFixed(2)}"\n`;
    csv += `"Sponsored Products Ad Spend","-${calculations.ads.toFixed(2)}"\n`;
    csv += `"Return Loss Reserve","-${calculations.returnReserve.toFixed(2)}"\n`;
    csv += `"TOTAL OPERATING COST","-${calculations.totalCost.toFixed(2)}"\n`;
    csv += `"NET PROFIT","${calculations.netProfit.toFixed(2)}"\n`;
    csv += `"PROFIT MARGIN %","${calculations.netMarginPercent.toFixed(2)}%"\n`;
    csv += `"BREAK-EVEN PRICE","${calculations.breakEvenPrice.toFixed(2)}"\n`;

    exportToCSV(`walmart-seller-profit-analysis`, csv);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const copySummary = () => {
    const text = `Walmart Seller Profit Summary:
Listing Price: ${format(sellingPrice)} | Item Cost: ${format(itemCost)}
Walmart Referral Fee: ${format(calculations.effectiveReferralFee)}
Fulfillment Cost: ${format(calculations.totalFulfillmentCost)}
NET PROFIT: ${format(calculations.netProfit)} (${calculations.netMarginPercent.toFixed(2)}% Margin)
Break-Even Price: ${format(calculations.breakEvenPrice)}
Calculated with SellerKitHub.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "How are Walmart Marketplace referral fees calculated in 2026?",
      answer: "Walmart charges a category referral fee on each item sold, ranging between 6% and 15%. For example, Consumer Electronics is 8%, Apparel is 15%, Home & Kitchen is 15%, and Grocery is 8% for items under $15 (15% above $15). Unlike Amazon, Walmart has no monthly subscription fee for basic marketplace sellers."
    },
    {
      question: "What is Walmart Fulfillment Services (WFS) and how does it compare to FBA?",
      answer: "Walmart Fulfillment Services (WFS) allows third-party sellers to store inventory in Walmart fulfillment centers, offering 2-day delivery across the US. WFS fulfillment fees are typically 10% to 15% lower than Amazon FBA with simple weight-based pricing and lower storage rates."
    },
    {
      question: "Are there any monthly subscription fees to sell on Walmart Marketplace?",
      answer: "No. Walmart Marketplace does not charge monthly account maintenance or subscription fees. Sellers only pay the referral fee percentage when a customer completes an order, plus optional WFS fulfillment or Walmart Sponsored Products advertising costs."
    },
    {
      question: "How do customer returns work on Walmart Marketplace?",
      answer: "Walmart customers can return items by mail or at any physical Walmart retail store. If a return is processed, Walmart refunds the referral fee to the seller minus a small customer service handling fee. Sourcing costs and one-way shipping fees are not recoverable on damaged goods."
    },
    {
      question: "What is a good profit margin for Walmart Marketplace sellers?",
      answer: "A healthy net profit margin for Walmart sellers is between 18% and 28%. Because Walmart has zero monthly seller account fees and lower fulfillment rates through WFS, sellers often achieve higher margins on Walmart than on Amazon for identical SKUs."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-500/20 mb-3">
          <Store className="w-3.5 h-3.5" />
          <span>Updated for 2026 Walmart Marketplace & WFS Fee Rates</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Walmart Seller <span className="text-blue-600 dark:text-blue-400">Fee & Profit</span> Calculator
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Model Walmart category referral fees (6%–15%), Walmart Fulfillment Services (WFS) rates, merchant shipping, ad spend, and net margins.
        </p>
      </div>

      {/* Main Interactive Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Form Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-5 shadow-xl dark:shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Listing & Sourcing Inputs
            </h2>
            <button
              onClick={() => {
                setSellingPrice(38.00);
                setItemCost(10.50);
                setCategoryId('home');
                setFulfillmentType('wfs');
                setWfsFulfillmentFee(3.45);
                setInboundFreight(1.20);
                setMonthlyStorage(0.30);
                setMerchantShipping(5.50);
                setAdSpendPerUnit(2.50);
                setReturnRate(3.0);
              }}
              className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="wm-selling-price" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Item Selling Price ({activeCurrency.symbol})
              </label>
              <input
                id="wm-selling-price"
                aria-label={`Item Selling Price in ${activeCurrency.symbol}`}
                type="number"
                inputMode="decimal"
                value={sellingPrice || ''}
                onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="wm-item-cost" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Product Sourcing Cost ({activeCurrency.symbol})
              </label>
              <input
                id="wm-item-cost"
                aria-label={`Product Sourcing Cost in ${activeCurrency.symbol}`}
                type="number"
                inputMode="decimal"
                value={itemCost || ''}
                onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="wm-category" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Walmart Product Category
            </label>
            <select
              id="wm-category"
              aria-label="Walmart Product Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
            >
              {WALMART_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id} className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Fulfillment Model Tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Fulfillment Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFulfillmentType('wfs')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  fulfillmentType === 'wfs'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                    : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <PackageCheck className="w-4 h-4" />
                <span>Walmart WFS (2-Day)</span>
              </button>
              <button
                type="button"
                onClick={() => setFulfillmentType('mfn')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  fulfillmentType === 'mfn'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                    : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Merchant Fulfilled (MFN)</span>
              </button>
            </div>
          </div>

          {/* Dynamic Fulfillment Fields */}
          {fulfillmentType === 'wfs' ? (
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-500/5 border border-blue-200/60 dark:border-blue-500/10 space-y-3">
              <span className="text-xs font-bold text-blue-900 dark:text-blue-300 block">
                Walmart Fulfillment Services (WFS) Rates
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="wm-wfs-fee" className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    WFS Pick & Pack ({activeCurrency.symbol})
                  </label>
                  <input
                    id="wm-wfs-fee"
                    aria-label="WFS Pick & Pack Fee"
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    value={wfsFulfillmentFee || ''}
                    onChange={(e) => setWfsFulfillmentFee(parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="wm-inbound-freight" className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Inbound Freight ({activeCurrency.symbol})
                  </label>
                  <input
                    id="wm-inbound-freight"
                    aria-label="Inbound Freight"
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    value={inboundFreight || ''}
                    onChange={(e) => setInboundFreight(parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="wm-monthly-storage" className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Monthly Storage ({activeCurrency.symbol})
                  </label>
                  <input
                    id="wm-monthly-storage"
                    aria-label="Monthly Storage Fee"
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    value={monthlyStorage || ''}
                    onChange={(e) => setMonthlyStorage(parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label htmlFor="wm-mfn-shipping" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Merchant Shipping & Postage Cost ({activeCurrency.symbol})
              </label>
              <input
                id="wm-mfn-shipping"
                aria-label="Merchant Shipping Cost"
                type="number"
                inputMode="decimal"
                step="0.01"
                value={merchantShipping || ''}
                onChange={(e) => setMerchantShipping(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="wm-ad-spend" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Walmart Sponsored Ads / Unit ({activeCurrency.symbol})
              </label>
              <input
                id="wm-ad-spend"
                aria-label="Ad spend per unit"
                type="number"
                inputMode="decimal"
                value={adSpendPerUnit || ''}
                onChange={(e) => setAdSpendPerUnit(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="wm-return-rate" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Customer Return Rate (%)
              </label>
              <input
                id="wm-return-rate"
                aria-label="Customer Return Rate %"
                type="number"
                inputMode="decimal"
                value={returnRate || ''}
                onChange={(e) => setReturnRate(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Results Sidebar Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-6 shadow-xl dark:shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Estimated Net Profit</span>
                <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {format(calculations.netProfit)}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Margin</span>
                <div className="text-2xl font-extrabold font-mono text-blue-600 dark:text-blue-400 mt-0.5">
                  {calculations.netMarginPercent.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Detailed Line Item Cost Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-600 dark:text-slate-400">Gross Selling Price</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{format(calculations.price)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-600 dark:text-slate-400">Product Sourcing (COGS)</span>
                <span className="font-mono font-bold text-rose-500">-{format(calculations.cogs)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-600 dark:text-slate-400">Walmart Referral Fee ({selectedCategory.rate}%)</span>
                <span className="font-mono font-bold text-amber-500">-{format(calculations.effectiveReferralFee)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-600 dark:text-slate-400">Fulfillment Shipping ({fulfillmentType.toUpperCase()})</span>
                <span className="font-mono font-bold text-amber-500">-{format(calculations.totalFulfillmentCost)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-600 dark:text-slate-400">Sponsored Products Ad Spend</span>
                <span className="font-mono font-bold text-slate-500">-{format(calculations.ads)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-600 dark:text-slate-400">Return Loss Allowance</span>
                <span className="font-mono font-bold text-slate-500">-{format(calculations.returnReserve)}</span>
              </div>
              <div className="flex justify-between py-1 pt-2 font-bold text-sm text-slate-900 dark:text-white">
                <span>Break-Even Price Target</span>
                <span className="font-mono text-blue-600 dark:text-blue-400">{format(calculations.breakEvenPrice)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={copySummary}
                className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>
              <button
                onClick={handleDownloadExcel}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-600/20"
              >
                {downloaded ? <Check className="w-4 h-4" /> : <FileSpreadsheet className="w-4 h-4" />}
                <span>{downloaded ? 'Downloaded!' : 'Download CSV'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Author Bio & E-E-A-T Component */}
      <AuthorBio 
        authorName="SellerKit E-Commerce Financial Engineering Team"
        authorRole="Multi-Channel Marketplace & WFS Logistics Specialists"
        lastUpdated="2026 Walmart Marketplace Fee Schedule Verified"
        category="Multi-Channel E-Commerce Modeling"
      />

      {/* Recommended Seller Tools Affiliate Component */}
      <AffiliateCTA 
        platform="walmart" 
        title="Scale Your Walmart Marketplace Store" 
        description="Connect with approved inventory management and automated repricing tools."
      />

      {/* Structured FAQ Section */}
      <FAQSection title="Walmart Seller Profit Calculator FAQs" faqs={faqs} />

      {/* Cross-Tool Navigation Component */}
      <RelatedTools currentPath="/tools/walmart-fee-calculator" />
    </div>
  );
}
