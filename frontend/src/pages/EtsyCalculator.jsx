import React, { useState, useMemo } from 'react';
import { TrendingUp, Copy, Check, RefreshCw, Layers, ShieldCheck, DollarSign, FileSpreadsheet, BookOpen, BarChart3, Lightbulb } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { calculateMasterProfit, exportToCSV } from '../utils/calculations';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';

export default function EtsyCalculator() {
  const { activeCurrency, format } = useCurrency();

  // Input States
  const [sellingPrice, setSellingPrice] = useState(45.00);
  const [shippingCharged, setShippingCharged] = useState(0.00);
  const [itemCost, setItemCost] = useState(12.00);
  const [actualShippingCost, setActualShippingCost] = useState(4.50);
  const [offsiteAdsTier, setOffsiteAdsTier] = useState(0); // 0 = None, 15 = Optional 15%, 12 = Mandatory 12%
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Etsy Calculations
  const calculations = useMemo(() => {
    const res = calculateMasterProfit({
      sellingPrice,
      shippingCharged,
      productCost: itemCost,
      shippingCost: actualShippingCost,
      platform: 'etsy',
      fulfillmentType: 'fbm',
      referralRate: 6.5,
      marketingSpend: 0,
      returnRate: 2,
      miscellaneousCost: 0.20, // $0.20 listing fee
      offsiteAdsActive: offsiteAdsTier > 0,
      currencyRate: activeCurrency.rate
    });

    const price = Number(sellingPrice) || 0;
    const shipCharged = Number(shippingCharged) || 0;
    const totalBuyerPaid = price + shipCharged;

    const listingFee = 0.20 * activeCurrency.rate;
    const transactionFee = totalBuyerPaid * 0.065;
    const processingFee = (totalBuyerPaid * 0.03) + (0.25 * activeCurrency.rate);
    const offsiteAdsFee = totalBuyerPaid * (offsiteAdsTier / 100);

    const totalEtsyFees = listingFee + transactionFee + processingFee + offsiteAdsFee;

    return {
      ...res,
      listingFee,
      transactionFee,
      processingFee,
      offsiteAdsFee,
      totalEtsyFees
    };
  }, [sellingPrice, shippingCharged, itemCost, actualShippingCost, offsiteAdsTier, activeCurrency]);

  const handleDownloadExcel = () => {
    let csv = `Metric,Value (${activeCurrency.code})\n`;
    csv += `"Item Selling Price","${sellingPrice}"\n`;
    csv += `"Shipping Charged to Buyer","${shippingCharged}"\n`;
    csv += `"Crafting Sourcing Cost","${itemCost}"\n`;
    csv += `"Actual Shipping Postage","${actualShippingCost}"\n`;
    csv += `"Etsy Listing Fee","-${calculations.listingFee.toFixed(2)}"\n`;
    csv += `"Etsy Transaction Fee (6.5%)","-${calculations.transactionFee.toFixed(2)}"\n`;
    csv += `"Payment Processing (3% + $0.25)","-${calculations.processingFee.toFixed(2)}"\n`;
    csv += `"Offsite Ads Fee (${offsiteAdsTier}%)","-${calculations.offsiteAdsFee.toFixed(2)}"\n`;
    csv += `"Total Etsy Fees","-${calculations.totalEtsyFees.toFixed(2)}"\n`;
    csv += `"NET PROFIT","${calculations.netProfit.toFixed(2)}"\n`;
    csv += `"PROFIT MARGIN %","${calculations.netMarginPercent.toFixed(2)}%"\n`;

    exportToCSV(`etsy-fee-breakdown-analysis`, csv);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const copySummary = () => {
    const text = `Etsy Listing Profit Summary:
Selling Price: ${format(sellingPrice)} | Item Cost: ${format(itemCost)}
Total Etsy Fees: ${format(calculations.totalEtsyFees)}
NET PROFIT: ${format(calculations.netProfit)} (${calculations.netMarginPercent.toFixed(2)}% Margin)
Calculated with SellerKitHub.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What are the exact Etsy seller fees in 2026?",
      answer: "Etsy charges three core mandatory fees on every transaction: a $0.20 USD listing fee (renews every 4 months or upon sale), a 6.5% transaction fee on the total order amount (including item price, shipping charged to buyer, and gift wrapping), and a payment processing fee (in the US: 3.0% + $0.25 USD). Optional Offsite Ads add a 12% or 15% fee on sales generated directly from Etsy's web ads."
    },
    {
      question: "How does Etsy Offsite Ads pricing work, and can I opt out?",
      answer: "Etsy advertises your items on Google, Facebook, Instagram, and Pinterest. If your shop made less than $10,000 USD in total sales in the past 365 days, Offsite Ads are optional, and you pay a 15% fee only when an ad leads directly to a sale. If your shop surpassed $10,000 USD in revenue, participation is mandatory for life, but the ad fee drops to 12% per ad-driven sale."
    },
    {
      question: "Does Etsy charge transaction fees on shipping costs charged to buyers?",
      answer: "Yes. Etsy applies the 6.5% transaction fee to the combined total of the item price plus the shipping fee you charge the buyer. For example, if an item is sold for $30 with a $5 shipping fee, the 6.5% transaction fee is calculated on $35 ($2.28)."
    },
    {
      question: "What is the listing fee renewal rule on Etsy?",
      answer: "Each listing costs $0.20 USD to create. If an item sells, Etsy automatically renews the listing for another $0.20 USD for the next unit in stock. If an item does not sell, the listing expires after 4 months and costs $0.20 to renew manually or automatically."
    },
    {
      question: "What is considered a good profit margin for Etsy sellers?",
      answer: "A healthy net profit margin for Etsy handmade sellers and vintage curators is between 35% and 55% after deducting materials, labor, shipping postage, platform fees, and packaging. Direct print-on-demand (POD) sellers should aim for a minimum 25% net margin."
    },
    {
      question: "How do international currency conversion fees work on Etsy?",
      answer: "If your payment account currency differs from the currency of your listing price, Etsy charges a 2.5% currency conversion fee on the total transaction value before depositing funds into your local bank account."
    },
    {
      question: "How do I calculate my break-even selling price on Etsy?",
      answer: "Formula: Break-Even Price = (Material COGS + Actual Postage + $0.45 Fixed Fees) / (1 - 0.095 Fee Ratio). Dividing by 0.905 accounts for Etsy's combined ~9.5% variable percentage fee."
    },
    {
      question: "How can I export my Etsy profit calculation to Excel?",
      answer: "Click the green 'Download CSV' button in our calculator toolbar above. This instantly exports a detailed spreadsheet line-item breakdown of your listing price, sourcing expenses, individual Etsy fee cuts, net profit, and ROI."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-xs font-semibold border border-orange-200 dark:border-orange-500/20 mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Updated for 2026 Official Etsy Seller Fee Schedule</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Etsy Seller <span className="text-orange-600 dark:text-orange-400">Fee & Profit</span> Calculator
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Calculate listing fees, 6.5% transaction cuts, payment processing rates, Offsite Ads tiers, net profit margins, and ROI in real-time.
        </p>
      </div>

      {/* Main Interactive Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Form Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-5 shadow-xl dark:shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Listing & Production Inputs
            </h2>
            <button
              onClick={() => {
                setSellingPrice(45.00);
                setShippingCharged(0.00);
                setItemCost(12.00);
                setActualShippingCost(4.50);
                setOffsiteAdsTier(0);
              }}
              className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Item Selling Price ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={sellingPrice || ''}
                onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Shipping Charged to Buyer ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={shippingCharged || ''}
                onChange={(e) => setShippingCharged(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Crafting / Material Cost ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={itemCost || ''}
                onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Actual Shipping Postage Cost ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={actualShippingCost || ''}
                onChange={(e) => setActualShippingCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Etsy Offsite Ads Rate
            </label>
            <select
              value={offsiteAdsTier}
              onChange={(e) => setOffsiteAdsTier(parseFloat(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-orange-500"
            >
              <option value={0}>No Offsite Ads Sale (0%)</option>
              <option value={15}>Optional Offsite Ads (15% - Shops under $10k/yr)</option>
              <option value={12}>Mandatory Offsite Ads (12% - High volume shops over $10k/yr)</option>
            </select>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-orange-200 dark:border-orange-500/30 bg-orange-50/50 dark:bg-gradient-to-b dark:from-[#1c140c] dark:to-[#0c0906] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-slate-200 dark:border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Estimated Net Take-Home Profit</span>
              <span className={`font-mono text-3xl sm:text-4xl font-extrabold ${calculations.netProfit > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                {format(calculations.netProfit)}
              </span>
              <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-semibold text-xs mt-1">
                {calculations.netMarginPercent.toFixed(1)}% Net Margin
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Etsy Listing Fee</span>
                <span className="font-mono text-slate-900 dark:text-slate-200">-{format(calculations.listingFee)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Etsy Transaction Fee (6.5%)</span>
                <span className="font-mono text-slate-900 dark:text-slate-200">-{format(calculations.transactionFee)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Payment Processing (3.0% + $0.25)</span>
                <span className="font-mono text-slate-900 dark:text-slate-200">-{format(calculations.processingFee)}</span>
              </div>
              {offsiteAdsTier > 0 && (
                <div className="flex justify-between text-orange-700 dark:text-orange-400 font-semibold">
                  <span>Offsite Ads Cut ({offsiteAdsTier}%)</span>
                  <span className="font-mono">-{format(calculations.offsiteAdsFee)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 border-t border-slate-200 dark:border-white/10 pt-2">
                <span>Total Etsy Platform Cuts</span>
                <span className="font-mono text-orange-600 dark:text-orange-400">-{format(calculations.totalEtsyFees)}</span>
              </div>
            </div>

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
                className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-orange-600/20"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>
            </div>
          </div>

          <AdPlaceholder slot="vertical" />
        </div>

      </div>

      {/* Image 1: Interactive Breakdown Diagram */}
      <img
        src="/images/etsy-fee-breakdown-calculator.svg"
        alt="Etsy Fee Calculator 2026 Breakdown Chart showing listing fee, transaction cut, and net profit margin"
        className="w-full h-auto rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg my-8"
        loading="lazy"
        decoding="async"
      />

      <AdPlaceholder slot="horizontal" />

      {/* 2026 Etsy Fee Schedule Reference Table */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            2026 Official Etsy Seller Fee Schedule Matrix
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          Comprehensive breakdown of mandatory and optional fees assessed by Etsy on seller transactions in 2026.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">Fee Type</th>
                <th className="p-3">Calculation Basis</th>
                <th className="p-3">Rate (USD / Regional)</th>
                <th className="p-3">Requirement</th>
                <th className="p-3">Notes & Exclusions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Listing Fee</td>
                <td className="p-3">Per unique item listing</td>
                <td className="p-3 font-mono text-orange-600 dark:text-orange-400">$0.20 USD</td>
                <td className="p-3 font-bold text-emerald-600">Mandatory</td>
                <td className="p-3">Renews automatically every 4 months or upon sale.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Transaction Fee</td>
                <td className="p-3">Item price + Shipping charged + Gift wrap</td>
                <td className="p-3 font-mono text-orange-600 dark:text-orange-400">6.50%</td>
                <td className="p-3 font-bold text-emerald-600">Mandatory</td>
                <td className="p-3">Applied to total order amount before local sales tax.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Etsy Payments Processing</td>
                <td className="p-3">Total order revenue</td>
                <td className="p-3 font-mono text-orange-600 dark:text-orange-400">3.00% + $0.25 USD</td>
                <td className="p-3 font-bold text-emerald-600">Mandatory</td>
                <td className="p-3">Varies by seller country (e.g. UK: 4% + £0.20, CA: 3% + $0.25 CAD).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Offsite Ads (&lt;$10k/yr)</td>
                <td className="p-3">Ad-driven sales revenue</td>
                <td className="p-3 font-mono text-amber-600">15.00%</td>
                <td className="p-3 text-slate-500">Optional</td>
                <td className="p-3">Can be disabled inside Etsy Shop Settings.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Offsite Ads (&gt;$10k/yr)</td>
                <td className="p-3">Ad-driven sales revenue</td>
                <td className="p-3 font-mono text-rose-600">12.00%</td>
                <td className="p-3 text-rose-600 font-bold">Mandatory for Life</td>
                <td className="p-3">Applies automatically after hitting $10,000 trailing 365-day sales.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Image 2: Offsite Ads Comparison Diagram */}
      <img
        src="/images/etsy-offsite-ads-profit-model.svg"
        alt="Etsy Offsite Ads Fee Impact Diagram comparing optional 15 percent versus mandatory 12 percent ad cuts"
        className="w-full h-auto rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg my-8"
        loading="lazy"
        decoding="async"
      />

      {/* Step-by-Step Worked Math Examples */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm space-y-8">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Worked Step-by-Step Etsy Calculation Examples
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Example 1: Handmade Ceramic Mug
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>Selling Price:</strong> $35.00</p>
              <p><strong>Shipping Charged:</strong> $5.00 ($40 Total)</p>
              <p><strong>Crafting COGS:</strong> $8.00</p>
              <p><strong>Actual Postage:</strong> $4.50</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>Listing Fee: -$0.20</p>
              <p>Transaction Fee (6.5% of $40): -$2.60</p>
              <p>Payment Processing (3% + $0.25): -$1.45</p>
              <p><strong>Total Etsy Cuts: -$4.25</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              Net Profit: $23.25 (58.1% Margin)
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Example 2: Print-on-Demand T-Shirt
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>Selling Price:</strong> $28.00</p>
              <p><strong>Free Shipping Offered:</strong> $0.00</p>
              <p><strong>Printify Base Cost:</strong> $13.50</p>
              <p><strong>POD Shipping Fee:</strong> $4.50</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>Listing Fee: -$0.20</p>
              <p>Transaction Fee (6.5% of $28): -$1.82</p>
              <p>Payment Processing (3% + $0.25): -$1.09</p>
              <p><strong>Total Etsy Cuts: -$3.11</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              Net Profit: $6.89 (24.6% Margin)
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Example 3: Jewelry with 15% Offsite Ads
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>Selling Price:</strong> $65.00</p>
              <p><strong>Free Shipping:</strong> $0.00</p>
              <p><strong>Silver Materials COGS:</strong> $14.00</p>
              <p><strong>Actual Postage:</strong> $3.80</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>Standard Etsy Fees (9.5%): -$6.43</p>
              <p>Offsite Ads Fee (15%): -$9.75</p>
              <p><strong>Total Etsy Cuts: -$16.18</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              Net Profit: $31.02 (47.7% Margin)
            </div>
          </div>

        </div>
      </section>

      {/* Master Etsy Strategy Guide */}
      <article className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-800 dark:text-slate-200 space-y-6 shadow-sm">
        <div className="border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Lightbulb className="w-4 h-4" />
            <span>Master Seller Strategy Guide</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Etsy Profit Optimization: How to Protect Your Margins in 2026
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Proven strategies for pricing handmade items, managing shipping costs, and evaluating Offsite Ads profitability.
          </p>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            1. The "Free Shipping Guarantee" Trap
          </h3>
          <p>
            Etsy strongly encourages sellers to offer "Free Shipping" on orders over $35 by granting priority search placement in US search results. However, shipping is never truly free. When offering free shipping, sellers must incorporate the average postage cost directly into the item retail price. Failing to bake postage into your base price erodes your net profit margin by 10% to 20% per sale.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            2. Managing Offsite Ads Profitability
          </h3>
          <p>
            Offsite Ads can bring valuable incremental sales, but a 15% ad fee on top of standard 9.5% fees means Etsy takes roughly 24.5% of your total revenue. For low-margin items (like print-on-demand), this can swallow your entire profit. Calculate your net margin with Offsite Ads enabled to ensure your business remains profitable on ad-driven sales.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            3. Accounting for Labor & Material Waste
          </h3>
          <p>
            Handmade sellers frequently underprice their craft by failing to include labor hours in their Cost of Goods Sold (COGS). Always calculate an hourly labor rate into your product sourcing cost alongside raw materials and packaging.
          </p>
        </div>
      </article>

      {/* Structured FAQ Section */}
      <FAQSection title="Etsy Fee & Profit FAQs" faqs={faqs} />
    </div>
  );
}
