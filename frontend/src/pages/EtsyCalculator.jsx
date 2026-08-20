import React, { useState, useMemo } from 'react';
import { ShoppingBag, Copy, Check, RefreshCw, HelpCircle, Sparkles, AlertCircle, FileSpreadsheet, PieChart as PieChartIcon, ArrowRight, ShieldCheck, BookOpen, BarChart3, Lightbulb } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { exportToCSV } from '../utils/calculations';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';

// SVG Revenue Donut Chart Component
function RevenueDonutChart({ data, totalRevenue, currencySymbol }) {
  const total = data.reduce((acc, item) => acc + Math.max(0, item.value), 0);
  if (total <= 0) return null;

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
      <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-slate-200 dark:stroke-white/10"
            strokeWidth="14"
            fill="transparent"
          />
          {data.map((slice, i) => {
            if (slice.value <= 0) return null;
            const percent = slice.value / total;
            const strokeDasharray = `${percent * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedPercent * circumference;
            accumulatedPercent += percent;

            return (
              <circle
                key={i}
                cx="50"
                cy="50"
                r={radius}
                stroke={slice.color}
                strokeWidth="14"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                fill="transparent"
                className="transition-all duration-500 hover:opacity-90"
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Margin</span>
          <span className="font-mono text-xs font-extrabold text-slate-900 dark:text-white">
            {totalRevenue > 0 ? `${((data[0].value / totalRevenue) * 100).toFixed(0)}%` : '0%'}
          </span>
        </div>
      </div>

      <div className="flex-1 w-full space-y-1.5 text-xs">
        <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
          % Revenue Breakdown
        </div>
        {data.map((item, idx) => {
          const pct = totalRevenue > 0 ? (item.value / totalRevenue) * 100 : 0;
          return (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-700 dark:text-slate-300 truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-slate-900 dark:text-white font-semibold">
                  {currencySymbol}{item.value.toFixed(2)}
                </span>
                <span className="text-slate-500 text-[11px] w-10 text-right">
                  ({pct.toFixed(1)}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function EtsyCalculator() {
  const { activeCurrency, format } = useCurrency();
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Form States
  const [itemPrice, setItemPrice] = useState(100.00);
  const [shippingCharged, setShippingCharged] = useState(0.00);
  const [itemCost, setItemCost] = useState(56.00);
  const [shippingCost, setShippingCost] = useState(0.00);
  const [offsiteAds, setOffsiteAds] = useState('none');
  const [regulatoryFee, setRegulatoryFee] = useState(false);

  const result = useMemo(() => {
    const price = Number(itemPrice) || 0;
    const shipCharged = Number(shippingCharged) || 0;
    const cost = Number(itemCost) || 0;
    const shipPaid = Number(shippingCost) || 0;

    const totalRevenue = price + shipCharged;

    // 1. Listing Fee ($0.20 flat)
    const listingFee = 0.20 * activeCurrency.rate;

    // 2. Transaction Fee (6.5% of total revenue including shipping charged)
    const transactionFee = totalRevenue * 0.065;

    // 3. Payment Processing Fee (3% + $0.25 flat in US)
    const paymentFee = (totalRevenue * 0.03) + (0.25 * activeCurrency.rate);

    // 4. Offsite Ads Fee
    let adsFee = 0;
    if (offsiteAds === '15') adsFee = totalRevenue * 0.15;
    if (offsiteAds === '12') adsFee = totalRevenue * 0.12;

    // 5. Regulatory Operating Fee (approx 0.4%)
    const regFee = regulatoryFee ? totalRevenue * 0.004 : 0;

    const totalEtsyFees = listingFee + transactionFee + paymentFee + adsFee + regFee;
    const totalExpenses = cost + shipPaid + totalEtsyFees;
    const netProfit = totalRevenue - totalExpenses;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    const roi = totalExpenses > 0 ? (netProfit / totalExpenses) * 100 : 0;

    const chartData = [
      { label: 'Net Profit', value: Math.max(0, netProfit), color: '#10b981' },
      { label: 'Etsy Fees', value: totalEtsyFees, color: '#f97316' },
      { label: 'Product Cost', value: cost, color: '#6366f1' },
      ...(shipPaid > 0 ? [{ label: 'Postage Paid', value: shipPaid, color: '#06b6d4' }] : [])
    ];

    return {
      totalRevenue,
      listingFee,
      transactionFee,
      paymentFee,
      adsFee,
      regFee,
      totalEtsyFees,
      totalExpenses,
      netProfit,
      profitMargin,
      roi,
      feePercentage: totalRevenue > 0 ? (totalEtsyFees / totalRevenue) * 100 : 0,
      chartData
    };
  }, [itemPrice, shippingCharged, itemCost, shippingCost, offsiteAds, regulatoryFee, activeCurrency]);

  const handleDownloadExcel = () => {
    let csv = `Etsy Fee Metric,Amount (${activeCurrency.code})\n`;
    csv += `"Item Listing Price","${itemPrice}"\n`;
    csv += `"Shipping Charged to Buyer","${shippingCharged}"\n`;
    csv += `"Total Revenue","${result.totalRevenue.toFixed(2)}"\n`;
    csv += `"Item Production Cost","${itemCost}"\n`;
    csv += `"Actual Postage Paid","${shippingCost}"\n`;
    csv += `"Etsy Listing Fee","-${result.listingFee.toFixed(2)}"\n`;
    csv += `"Etsy Transaction Fee (6.5%)","-${result.transactionFee.toFixed(2)}"\n`;
    csv += `"Payment Processing (3% + 25¢)","-${result.paymentFee.toFixed(2)}"\n`;
    if (result.adsFee > 0) csv += `"Etsy Offsite Ads Fee","-${result.adsFee.toFixed(2)}"\n`;
    csv += `"Total Etsy Fees Cut","-${result.totalEtsyFees.toFixed(2)}"\n`;
    csv += `"NET PROFIT","${result.netProfit.toFixed(2)}"\n`;
    csv += `"NET PROFIT MARGIN %","${result.profitMargin.toFixed(2)}%"\n`;

    exportToCSV(`etsy-fee-breakdown`, csv);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const copySummary = () => {
    const text = `Etsy Fee & Profit Calculation:
Item Price: ${format(itemPrice)} | Shipping Charged: ${format(shippingCharged)}
Total Revenue: ${format(result.totalRevenue)}
--------------------------------
Etsy Listing Fee: ${format(result.listingFee)}
Etsy Transaction Fee (6.5%): ${format(result.transactionFee)}
Payment Processing (3% + 25¢): ${format(result.paymentFee)}
Offsite Ads Fee: ${format(result.adsFee)}
TOTAL ETSY CUT: ${format(result.totalEtsyFees)} (${result.feePercentage.toFixed(1)}%)
--------------------------------
NET PROFIT: ${format(result.netProfit)}
NET MARGIN: ${result.profitMargin.toFixed(2)}%
Calculated with SellerKitHub.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What is Etsy's complete fee structure in 2026?",
      answer: "In 2026, Etsy charges a flat $0.20 listing fee per item published or renewed (valid for 4 months or until sold), a 6.5% transaction fee applied to the total order value (item price plus shipping charged and gift wrapping), and a payment processing fee (3.0% + $0.25 for standard US Etsy Payments, varying slightly in UK, CA, and EU). Additionally, optional or mandatory Offsite Ads incur a 15% or 12% surcharge when a sale originates from external search or social channels."
    },
    {
      question: "Are Etsy transaction fees charged on shipping prices?",
      answer: "Yes. Etsy explicitly assesses its 6.5% transaction fee on both the item selling price and any shipping fee you charge the customer. If you list a product for $30 and charge $10 shipping, Etsy calculates the 6.5% fee on $40, which equals $2.60."
    },
    {
      question: "How does the Etsy Offsite Ads program work and can I opt out?",
      answer: "Etsy advertises shop listings across Google, Facebook, Instagram, Pinterest, and Bing. If a buyer clicks an offsite ad and makes a purchase within 30 days, Etsy charges an advertising fee. Shops earning less than $10,000 in trailing 12-month sales pay a 15% fee per ad-driven order and can opt out anytime in shop settings. Shops exceeding $10,000 pay a discounted 12% fee but are permanently mandated into the program."
    },
    {
      question: "How often does Etsy charge listing renewal fees for multi-quantity items?",
      answer: "Etsy charges the $0.20 listing fee when an item is initially listed. If you offer multiple quantities of the same item in one listing, Etsy automatically re-charges $0.20 every time an individual unit sells. If a listing remains unsold for 4 months, it auto-renews for another $0.20 unless auto-renew is disabled."
    },
    {
      question: "What is the Regulatory Operating Fee and which countries pay it?",
      answer: "The Regulatory Operating Fee is a small percentage surcharge added to total order costs for sellers located in specific countries (such as the UK ~0.32%, France ~0.40%, Italy ~0.25%, Spain ~0.40%, and Canada ~0.27%). It covers platform compliance costs resulting from digital service tax regulations in those jurisdictions."
    },
    {
      question: "How do Etsy Payments processing fees differ internationally?",
      answer: "Etsy Payments processing fees vary by seller location. In the US, the standard rate is 3% + $0.25. In the UK, it is 4% + £0.20. In Canada, it is 3% + $0.25 CAD. In Australia, it is 3% + $0.25 AUD, and in Eurozone countries, it averages 4% + €0.30. Fees are assessed on total order value including taxes collected."
    },
    {
      question: "How do I calculate my exact break-even selling price on Etsy?",
      answer: "To calculate your break-even price, add your item production cost, actual postage paid, and fixed fee offsets ($0.20 listing fee + $0.25 processing fee). Divide this total numerator by (1 - combined variable fee percentage). For standard US sellers without offsite ads, combined variable fees are 6.5% transaction + 3% payment processing = 9.5% (0.095). Formula: Break-Even Price = (Item Cost + Postage + $0.45) / 0.905."
    },
    {
      question: "How can I export my Etsy fee calculations to Excel for accounting?",
      answer: "Click the green 'Download Excel' button above inside the calculator result card. This generates a standardized .CSV file containing a complete line-item breakdown of your item listing price, postage fees, crafting costs, Etsy listing cuts, transaction cuts, payment processing rates, offsite ad deductions, and net margins, ready for Microsoft Excel or Google Sheets."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-xs font-semibold border border-orange-200 dark:border-orange-500/20 mb-3">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Updated for 2026 Etsy Fee Schedules</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Free <span className="text-orange-600 dark:text-orange-400">Etsy Fee</span> & Profit Calculator
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Calculate exact take-home profit, listing renewals, 6.5% transaction cuts, payment processing, and offsite advertising charges for your Etsy handmade & vintage shop.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Form Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-5 shadow-xl dark:shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Etsy Listing Pricing & Cost Parameters
            </h2>
            <button
              onClick={() => {
                setItemPrice(100.00);
                setShippingCharged(0.00);
                setItemCost(56.00);
                setShippingCost(0.00);
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
                Item Listing Price ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={itemPrice || ''}
                onChange={(e) => setItemPrice(parseFloat(e.target.value) || 0)}
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
                placeholder="0.00 for Free Shipping"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Item Production / Crafting Cost ({activeCurrency.symbol})
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
                Actual Postage Cost Paid by Seller ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={shippingCost || ''}
                onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-orange-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-500/5 border border-orange-200 dark:border-orange-500/20 space-y-3">
            <h3 className="text-xs font-bold text-orange-800 dark:text-orange-400 uppercase tracking-wider">
              Etsy Optional Programs & Country Surcharges
            </h3>

            <div>
              <label className="block text-[11px] text-slate-700 dark:text-slate-300 mb-1.5">
                Etsy Offsite Ads Fee Tier:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'none', label: 'No Ads (0%)' },
                  { id: '15', label: 'Optional (15%)' },
                  { id: '12', label: 'Mandatory (12%)' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setOffsiteAds(opt.id)}
                    className={`py-2 px-2 text-center rounded-lg text-xs font-medium border transition ${
                      offsiteAds === opt.id
                        ? 'bg-orange-500 text-black font-bold border-orange-400'
                        : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={regulatoryFee}
                  onChange={(e) => setRegulatoryFee(e.target.checked)}
                  className="rounded text-orange-600"
                />
                <span>Include Regulatory Operating Fee (UK/EU/CA sellers ~0.4%)</span>
              </label>
            </div>
          </div>

        </div>

        {/* Results Calculation Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-orange-200 dark:border-orange-500/30 bg-orange-50/50 dark:bg-gradient-to-b dark:from-[#19100d] dark:to-[#0c0908] p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Estimated Etsy Take-Home Profit
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`font-mono text-4xl sm:text-5xl font-extrabold ${
                  result.netProfit > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                }`}>
                  {format(result.netProfit)}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  {result.profitMargin.toFixed(1)}% Margin
                </span>
              </div>
            </div>

            <RevenueDonutChart 
              data={result.chartData} 
              totalRevenue={result.totalRevenue} 
              currencySymbol={activeCurrency.symbol}
            />

            <div className="space-y-2 text-xs border-t border-slate-200 dark:border-white/10 pt-4">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Total Customer Payment</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{format(result.totalRevenue)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Product / Crafting Cost</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">-{format(itemCost)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Etsy Listing Fee</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-{format(result.listingFee)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Etsy Transaction Fee (6.5%)</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-{format(result.transactionFee)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Payment Processing (3% + 25¢)</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-{format(result.paymentFee)}</span>
              </div>
              {result.adsFee > 0 && (
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Offsite Ads ({offsiteAds}%)</span>
                  <span className="font-mono text-rose-600 dark:text-rose-400">-{format(result.adsFee)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 border-t border-slate-200 dark:border-white/10 pt-2">
                <span>Total Etsy Fees Cut</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-{format(result.totalEtsyFees)} ({result.feePercentage.toFixed(1)}%)</span>
              </div>
            </div>

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

      <AdPlaceholder slot="horizontal" />

      {/* 2026 Etsy Fee Schedule Reference Table */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            2026 Etsy Seller Fee Schedule & Rates Reference
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          Understanding Etsy's mandatory and optional fee structure is essential for setting competitive retail pricing while protecting shop net profit margins.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">Fee Type</th>
                <th className="p-3">Rate / Amount</th>
                <th className="p-3">Calculation Base</th>
                <th className="p-3">Billing Trigger</th>
                <th className="p-3">Exemptions & Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Listing Fee</td>
                <td className="p-3 font-mono text-orange-600 dark:text-orange-400">$0.20 USD</td>
                <td className="p-3">Flat per published listing</td>
                <td className="p-3">Creation & auto-renewal (4 months)</td>
                <td className="p-3">Re-charged automatically upon each quantity sold.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Transaction Fee</td>
                <td className="p-3 font-mono text-orange-600 dark:text-orange-400">6.50%</td>
                <td className="p-3">Item Price + Shipping + Gift Wrap</td>
                <td className="p-3">Assessed per completed sale</td>
                <td className="p-3">Applies to the entire total buyer payment including postage.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Etsy Payments Processing</td>
                <td className="p-3 font-mono text-orange-600 dark:text-orange-400">3.00% + $0.25</td>
                <td className="p-3">Total buyer charge (inc. sales tax)</td>
                <td className="p-3">Payment clearance trigger</td>
                <td className="p-3">Varies internationally (e.g. UK: 4% + £0.20, CA: 3% + $0.25).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Offsite Ads (Standard)</td>
                <td className="p-3 font-mono text-orange-600 dark:text-orange-400">15.00%</td>
                <td className="p-3">Total order revenue</td>
                <td className="p-3">Sale within 30 days of ad click</td>
                <td className="p-3">Optional for shops earning &lt; $10,000 USD / year.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Offsite Ads (High Volume)</td>
                <td className="p-3 font-mono text-orange-600 dark:text-orange-400">12.00%</td>
                <td className="p-3">Total order revenue</td>
                <td className="p-3">Sale within 30 days of ad click</td>
                <td className="p-3">Mandatory once shop sales exceed $10,000 USD / year.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Regulatory Operating Fee</td>
                <td className="p-3 font-mono text-orange-600 dark:text-orange-400">0.25% - 0.40%</td>
                <td className="p-3">Total order revenue</td>
                <td className="p-3">Order completion trigger</td>
                <td className="p-3">Assessed on UK, EU, and CA sellers due to Digital Services Taxes.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Step-by-Step Worked Mathematical Examples */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm space-y-8">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Worked Step-by-Step Etsy Calculation Examples
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          {/* Example 1 */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Example 1: Handmade Ceramic Mug
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>Item Price:</strong> $35.00</p>
              <p><strong>Shipping Charged:</strong> $5.00</p>
              <p><strong>Total Revenue:</strong> $40.00</p>
              <p><strong>Crafting Cost:</strong> $8.00</p>
              <p><strong>Actual Postage:</strong> $4.00</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>Listing Fee: -$0.20</p>
              <p>Transaction Fee (6.5% of $40): -$2.60</p>
              <p>Payment Processing (3% + 25¢): -$1.45</p>
              <p><strong>Total Etsy Cut: -$4.25 (10.6%)</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              Net Profit: $23.75 (59.4% Margin)
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Example 2: Leather Tote (Offsite Ads)
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>Item Price:</strong> $150.00</p>
              <p><strong>Shipping Charged:</strong> $12.00</p>
              <p><strong>Total Revenue:</strong> $162.00</p>
              <p><strong>Material Cost:</strong> $45.00</p>
              <p><strong>Actual Postage:</strong> $9.00</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>Listing Fee: -$0.20</p>
              <p>Transaction Fee (6.5% of $162): -$10.53</p>
              <p>Payment Processing (3% + 25¢): -$5.11</p>
              <p>12% Mandatory Offsite Ad: -$19.44</p>
              <p><strong>Total Etsy Cut: -$35.28 (21.8%)</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              Net Profit: $72.72 (44.9% Margin)
            </div>
          </div>

          {/* Example 3 */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Example 3: Digital Download Printable
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>Item Price:</strong> $4.00</p>
              <p><strong>Shipping Charged:</strong> $0.00</p>
              <p><strong>Total Revenue:</strong> $4.00</p>
              <p><strong>Licensing Cost:</strong> $0.50</p>
              <p><strong>Actual Postage:</strong> $0.00</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>Listing Fee: -$0.20</p>
              <p>Transaction Fee (6.5% of $4): -$0.26</p>
              <p>Payment Processing (3% + 25¢): -$0.37</p>
              <p><strong>Total Etsy Cut: -$0.83 (20.8%)</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              Net Profit: $2.67 (66.8% Margin)
            </div>
          </div>

        </div>
      </section>

      {/* Master Etsy Strategy Article */}
      <article className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-800 dark:text-slate-200 space-y-6 shadow-sm">
        <div className="border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Lightbulb className="w-4 h-4" />
            <span>Master Strategy & Profit Optimization Guide</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Deconstructing Etsy Seller Fees & Optimizing Handmade Profitability
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            A comprehensive guide to navigating listing renewals, shipping cuts, offsite ads, and pricing formulas.
          </p>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            1. The Hidden Trap of Transaction Fees on Shipping Charges
          </h3>
          <p>
            Many new Etsy sellers make the critical mistake of assuming Etsy's 6.5% transaction fee only applies to the physical retail price of their item. In reality, Etsy calculates transaction fees on the <em>total amount collected from the buyer</em>, which explicitly includes shipping fees charged and gift-wrap charges. If you list a handcrafted candle for $20 and charge $8 for priority shipping, Etsy's 6.5% fee applies to $28 ($1.82). If your actual postage cost to buy a label is $8, you end up losing $0.52 out of pocket on shipping alone unless you factor this cut into your baseline pricing.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            2. Free Shipping Guarantee vs. Direct Shipping Pricing
          </h3>
          <p>
            Etsy strongly pushes its "Free Shipping Guarantee" for US orders over $35, granting preferred search placement to listings that offer zero shipping fees. To maintain profitability under free shipping, you must bake your actual average postage cost plus the 6.5% transaction cut directly into the item's listing price. For example, if a item costs $5 to ship and $10 to craft, instead of charging $20 + $5 shipping, pricing the item at $25 with free shipping results in the exact same $1.63 transaction fee while benefiting from elevated search algorithm indexing.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            3. Navigating Etsy Offsite Ads: Managing 15% and 12% Surcharges
          </h3>
          <p>
            Etsy's Offsite Ads program places your product listings across Google Search, Facebook, Instagram, Pinterest, and Bing. When a customer clicks an offsite ad and buys from your shop within 30 days, Etsy deducts an advertising fee. For shops making under $10,000 annually, the fee is 15% (and optional). Once your shop reaches $10,000 in gross sales, you are permanently enrolled at a discounted 12% rate. If your products operate on thin profit margins below 25%, an offsite ad sale can swallow over half of your net earnings. Craft sellers must audit their gross margins regularly to ensure their pricing structure can absorb offsite ad deductions.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            4. The Mathematical Break-Even Formula for Etsy Products
          </h3>
          <p>
            To determine the absolute minimum price you can charge without losing money, use the formula below:
          </p>
          <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 font-mono text-xs font-semibold text-orange-900 dark:text-orange-300">
            Break-Even Selling Price = (Item Cost + Actual Postage + $0.45 Fixed Fees) / (1 - 0.095)
          </div>
          <p>
            Here, $0.45 accounts for the $0.20 listing fee and $0.25 payment processing flat fee, while 0.095 represents the combined 6.5% transaction and 3% payment variable percentages.
          </p>
        </div>
      </article>

      {/* Structured FAQ Section */}
      <FAQSection title="Etsy Seller Fee & Profit FAQs" faqs={faqs} />
    </div>
  );
}
