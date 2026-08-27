import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Upload, 
  Download, 
  FileSpreadsheet, 
  Check, 
  Copy, 
  RefreshCw, 
  Sparkles,
  PieChart,
  BookOpen,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { exportToCSV } from '../utils/calculations';
import { trackEvent, TRACKED_EVENTS } from '../utils/analytics';
import RelatedTools from '../components/RelatedTools';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';

const DEFAULT_SKUS = [
  { id: '1', name: 'Premium Leather Wallet', quantity: 150, price: 45.00, cost: 12.00, platformFeePct: 15, shipping: 4.50 },
  { id: '2', name: 'Minimalist Card Holder', quantity: 300, price: 22.00, cost: 5.50, platformFeePct: 15, shipping: 3.50 },
  { id: '3', name: 'Travel Passport Cover', quantity: 200, price: 29.00, cost: 7.00, platformFeePct: 15, shipping: 3.80 },
  { id: '4', name: 'Key Organizer Clip', quantity: 400, price: 14.99, cost: 2.80, platformFeePct: 15, shipping: 3.00 },
];

export default function BatchCalculator() {
  const { activeCurrency, format } = useCurrency();
  const [skus, setSkus] = useState(DEFAULT_SKUS);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const addSkuRow = () => {
    const newId = (skus.length + 1).toString();
    setSkus([
      ...skus,
      { id: newId, name: `New SKU Item #${newId}`, quantity: 100, price: 25.00, cost: 6.00, platformFeePct: 15, shipping: 4.00 }
    ]);
  };

  const removeSkuRow = (id) => {
    if (skus.length <= 1) return;
    setSkus(skus.filter(s => s.id !== id));
  };

  const updateSku = (id, field, value) => {
    setSkus(skus.map(s => {
      if (s.id === id) {
        return { ...s, [field]: value };
      }
      return s;
    }));
  };

  // Aggregated Portfolio Metrics
  const summary = useMemo(() => {
    let totalUnits = 0;
    let totalRevenue = 0;
    let totalCogs = 0;
    let totalPlatformFees = 0;
    let totalShipping = 0;

    const rowDetails = skus.map(item => {
      const qty = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      const cost = Number(item.cost) || 0;
      const feePct = Number(item.platformFeePct) || 0;
      const ship = Number(item.shipping) || 0;

      const rev = qty * price;
      const cogs = qty * cost;
      const fees = rev * (feePct / 100);
      const shipping = qty * ship;
      const totalCost = cogs + fees + shipping;
      const netProfit = rev - totalCost;
      const margin = rev > 0 ? (netProfit / rev) * 100 : 0;

      totalUnits += qty;
      totalRevenue += rev;
      totalCogs += cogs;
      totalPlatformFees += fees;
      totalShipping += shipping;

      return {
        ...item,
        rev,
        cogs,
        fees,
        shipping,
        totalCost,
        netProfit,
        margin
      };
    });

    const grandTotalExpenses = totalCogs + totalPlatformFees + totalShipping;
    const grandNetProfit = totalRevenue - grandTotalExpenses;
    const grandNetMargin = totalRevenue > 0 ? (grandNetProfit / totalRevenue) * 100 : 0;
    const grandRoi = grandTotalExpenses > 0 ? (grandNetProfit / grandTotalExpenses) * 100 : 0;

    return {
      totalUnits,
      totalRevenue,
      totalCogs,
      totalPlatformFees,
      totalShipping,
      grandTotalExpenses,
      grandNetProfit,
      grandNetMargin,
      grandRoi,
      rowDetails
    };
  }, [skus]);

  const handleDownloadExcel = () => {
    let csv = `SKU Name,Quantity,Unit Price (${activeCurrency.code}),Unit Cost,Fee %,Total Revenue,Total COGS,Platform Fees,Total Shipping,Net Profit (${activeCurrency.code}),Margin %\n`;
    summary.rowDetails.forEach(r => {
      csv += `"${r.name}","${r.quantity}","${r.price}","${r.cost}","${r.platformFeePct}%","${r.rev.toFixed(2)}","${r.cogs.toFixed(2)}","${r.fees.toFixed(2)}","${r.shipping.toFixed(2)}","${r.netProfit.toFixed(2)}","${r.margin.toFixed(1)}%"\n`;
    });
    csv += `"\nTOTAL CATALOG","${summary.totalUnits}","--","--","--","${summary.totalRevenue.toFixed(2)}","${summary.totalCogs.toFixed(2)}","${summary.totalPlatformFees.toFixed(2)}","${summary.totalShipping.toFixed(2)}","${summary.grandNetProfit.toFixed(2)}","${summary.grandNetMargin.toFixed(1)}%"\n`;

    exportToCSV(`multi-sku-catalog-portfolio`, csv);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const copySummary = () => {
    let text = `Catalog Portfolio Summary:\nTotal Units: ${summary.totalUnits} | Total Revenue: ${format(summary.totalRevenue)}\nTotal COGS: ${format(summary.totalCogs)} | Platform Fees: ${format(summary.totalPlatformFees)}\n--------------------------------\nNET CATALOG PROFIT: ${format(summary.grandNetProfit)}\nNET CATALOG MARGIN: ${summary.grandNetMargin.toFixed(2)}%\nCalculated with SellerKitHub.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What is a multi-SKU batch profit calculator used for in e-commerce business planning?",
      answer: "A multi-SKU batch profit calculator allows e-commerce sellers, brand owners, and wholesalers to model financial profitability across their entire catalog or inventory shipment rather than analyzing single items in isolation. It aggregates total revenue, COGS, platform commission cuts, and postage costs across multiple SKUs to provide complete financial clarity on overall cash flow."
    },
    {
      question: "How do I calculate total catalog net profit across different product lines?",
      answer: "Total catalog net profit is calculated by summing the total revenue generated by all SKUs and subtracting total inventory manufacturing costs (COGS), total platform commission fees, and total shipping/postage expenses across all units in your catalog batch."
    },
    {
      question: "Why is portfolio margin analysis superior to single-item calculation?",
      answer: "Portfolio analysis prevents sellers from making catalog decisions based on isolated item margins. Often, high-volume lower-margin SKUs generate the majority of shop cash flow, while high-margin low-volume SKUs carry high holding costs. Evaluating your full catalog reveals true business cash contribution and working capital efficiency."
    },
    {
      question: "How does inventory turnover rate impact overall catalog cash flow?",
      answer: "Inventory turnover rate measures how quickly stock is sold and replaced over a period. Fast-turning inventory frees up capital to reinvest in winning SKUs, whereas slow-moving stock ties up cash and incurs storage surcharges in Amazon FBA or commercial 3PL warehouses."
    },
    {
      question: "How do I allocate shared shipping or container freight costs across multiple SKUs?",
      answer: "Shared freight costs should be allocated to individual SKUs based on either unit weight or cubic volume proportion. Dividing container freight proportionally ensures each SKU reflects its true landed cost per unit rather than artificially distorting unit margins."
    },
    {
      question: "What format should my CSV file be for bulk SKU import or export?",
      answer: "You can download our standardized CSV spreadsheet by clicking 'Download CSV'. The CSV includes standard columns for SKU Name, Unit Quantity, Unit Selling Price, Unit Sourcing Cost, Platform Fee %, and Shipping Expense per unit."
    },
    {
      question: "How can I identify unprofitable SKUs in my catalog before reordering?",
      answer: "Use our interactive batch table above to review individual row net margin percentages. Any SKU generating a net margin below your target (e.g. under 15%) or operating at a net loss should be flagged for price increases, supplier renegotiation, or liquidation."
    },
    {
      question: "How does batch profit modeling assist with supplier volume discounts?",
      answer: "Increasing purchase order quantities often lowers unit manufacturing cost. Batch profit modeling allows you to simulate how a 10% or 20% supplier discount impacts overall catalog net margin and ROI across your entire inventory order."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Multi-SKU Portfolio & Catalog Financial Engine</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Multi-SKU <span className="text-brand-600 dark:text-brand-400">Batch Profit</span> & Inventory Calculator
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Calculate multi-item catalog profits, working capital requirements, total revenue, marketplace cuts, and cash flow across your entire product line.
        </p>
      </div>

      {/* Aggregated KPI Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Total Catalog Revenue</span>
          <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white block mt-1">
            {format(summary.totalRevenue)}
          </span>
          <span className="text-[11px] text-slate-500">{summary.totalUnits} Units Total</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Total Sourcing COGS</span>
          <span className="font-mono text-xl sm:text-2xl font-extrabold text-rose-600 dark:text-rose-400 block mt-1">
            {format(summary.totalCogs)}
          </span>
          <span className="text-[11px] text-slate-500">Capital Invested</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Marketplace & Shipping</span>
          <span className="font-mono text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-amber-400 block mt-1">
            {format(summary.totalPlatformFees + summary.totalShipping)}
          </span>
          <span className="text-[11px] text-slate-500">Total Fees & Postage</span>
        </div>

        <div className="p-4 rounded-xl border border-brand-200 dark:border-brand-500/30 bg-brand-50/50 dark:bg-brand-500/10 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 block">Net Catalog Profit</span>
          <span className={`font-mono text-xl sm:text-2xl font-extrabold block mt-1 ${
            summary.grandNetProfit > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
          }`}>
            {format(summary.grandNetProfit)}
          </span>
          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
            {summary.grandNetMargin.toFixed(1)}% Net Margin
          </span>
        </div>
      </div>

      {/* Main Interactive Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-6 shadow-xl dark:shadow-2xl mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Catalog Product SKUs Breakdown
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Edit quantities, pricing, and cost parameters directly in the table below.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={addSkuRow}
              className="px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add SKU Row</span>
            </button>

            <button
              onClick={handleDownloadExcel}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              {downloaded ? <Check className="w-4 h-4 text-emerald-200" /> : <FileSpreadsheet className="w-4 h-4" />}
              <span>{downloaded ? 'Downloaded!' : 'Download CSV'}</span>
            </button>

            <button
              onClick={copySummary}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>Copy</span>
            </button>
          </div>
        </div>

        {/* Dynamic Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">SKU Name / Description</th>
                <th className="p-3">Units Qty</th>
                <th className="p-3">Selling Price</th>
                <th className="p-3">Unit Cost</th>
                <th className="p-3">Fee %</th>
                <th className="p-3">Postage/Unit</th>
                <th className="p-3">Total Revenue</th>
                <th className="p-3">Net Profit</th>
                <th className="p-3">Margin</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              {summary.rowDetails.map(sku => (
                <tr key={sku.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                  <td className="p-2">
                    <input
                      type="text"
                      value={sku.name}
                      onChange={(e) => updateSku(sku.id, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-brand-500"
                    />
                  </td>
                  <td className="p-2 w-20">
                    <input
                      type="number"
                      value={sku.quantity}
                      onChange={(e) => updateSku(sku.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-center focus:outline-none focus:border-brand-500"
                    />
                  </td>
                  <td className="p-2 w-24">
                    <input
                      type="number"
                      value={sku.price}
                      onChange={(e) => updateSku(sku.id, 'price', parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-right focus:outline-none focus:border-brand-500"
                    />
                  </td>
                  <td className="p-2 w-24">
                    <input
                      type="number"
                      value={sku.cost}
                      onChange={(e) => updateSku(sku.id, 'cost', parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-right focus:outline-none focus:border-brand-500"
                    />
                  </td>
                  <td className="p-2 w-20">
                    <input
                      type="number"
                      value={sku.platformFeePct}
                      onChange={(e) => updateSku(sku.id, 'platformFeePct', parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-center focus:outline-none focus:border-brand-500"
                    />
                  </td>
                  <td className="p-2 w-24">
                    <input
                      type="number"
                      value={sku.shipping}
                      onChange={(e) => updateSku(sku.id, 'shipping', parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-right focus:outline-none focus:border-brand-500"
                    />
                  </td>
                  <td className="p-3 font-mono font-semibold text-slate-900 dark:text-white">
                    {format(sku.rev)}
                  </td>
                  <td className={`p-3 font-mono font-bold ${
                    sku.netProfit > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                  }`}>
                    {format(sku.netProfit)}
                  </td>
                  <td className="p-3 font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {sku.margin.toFixed(1)}%
                  </td>
                  <td className="p-2 text-center w-12">
                    <button
                      onClick={() => removeSkuRow(sku.id)}
                      disabled={skus.length <= 1}
                      className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-400 hover:text-rose-600 disabled:opacity-30 transition"
                      title="Delete SKU row"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Author Bio & E-E-A-T Component */}
      <AuthorBio 
        authorName="SellerKit Catalog Financial Modeling Team"
        authorRole="Inventory Portfolio & Working Capital Analysts"
        lastUpdated="2026 Batch Calculation Standard Verified"
        category="Catalog Portfolio Management"
      />

      {/* Recommended Seller Tools Affiliate Component */}
      <AffiliateCTA 
        platform="general" 
        title="Recommended Inventory & Catalog Management Tools" 
        description="Sync catalog inventory across Amazon, Etsy, eBay, and Shopify to prevent stockouts."
      />

      {/* Catalog Portfolio Breakdown Table */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Catalog Portfolio Tier & Margin Allocation Matrix
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          Standard e-commerce catalog segmentation model balancing high-volume hero SKUs with high-margin niche accessories.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">Catalog Tier</th>
                <th className="p-3">Volume Share %</th>
                <th className="p-3">Target Gross Margin</th>
                <th className="p-3">Turnover Velocity</th>
                <th className="p-3">Working Capital Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Hero Core SKUs</td>
                <td className="p-3 font-mono text-brand-600 dark:text-brand-400">40% - 50%</td>
                <td className="p-3 font-mono">35% - 50%</td>
                <td className="p-3 font-bold text-emerald-600">Fast (&lt; 30 Days)</td>
                <td className="p-3">Drives baseline revenue and store ranking.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">High-Margin Accessories</td>
                <td className="p-3 font-mono text-brand-600 dark:text-brand-400">30% - 40%</td>
                <td className="p-3 font-mono text-emerald-600">60% - 80%</td>
                <td className="p-3">Moderate (30-60 Days)</td>
                <td className="p-3">Maximizes average order value (AOV) and basket profit.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Seasonal / Clearance SKUs</td>
                <td className="p-3 font-mono text-brand-600 dark:text-brand-400">10% - 20%</td>
                <td className="p-3 font-mono text-amber-600">15% - 25%</td>
                <td className="p-3 text-rose-600">Slow (&gt; 90 Days)</td>
                <td className="p-3">Liquidates capital to reinvest into winning hero products.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Step-by-Step Worked Calculation Examples */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm space-y-8">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Worked Catalog Portfolio Calculation Examples
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Example 1: 5-SKU Apparel Batch
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>Total Units Order:</strong> 1,000 Units</p>
              <p><strong>Total Revenue:</strong> $35,000</p>
              <p><strong>Total COGS:</strong> $10,500</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>Platform Fees (15%): -$5,250</p>
              <p>Total Shipping: -$4,000</p>
              <p><strong>Total Expenses: -$19,750</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              Net Profit: $15,250 (43.6% Margin)
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Example 2: 10-SKU Electronics Batch
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>Total Units Order:</strong> 2,500 Units</p>
              <p><strong>Total Revenue:</strong> $62,500</p>
              <p><strong>Total COGS:</strong> $22,000</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>Platform Fees (8%): -$5,000</p>
              <p>Total Shipping: -$8,750</p>
              <p><strong>Total Expenses: -$35,750</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              Net Profit: $26,750 (42.8% Margin)
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Example 3: Retail Clearance Batch
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>Total Units Order:</strong> 500 Units</p>
              <p><strong>Total Revenue:</strong> $7,500</p>
              <p><strong>Total Liquidation Cost:</strong> $4,000</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>Platform Fees (13.25%): -$993.75</p>
              <p>Total Shipping: -$1,250</p>
              <p><strong>Total Expenses: -$6,243.75</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              Net Profit: $1,256.25 (16.7% Margin)
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Example 4: 20-SKU Wholesale Import
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>Total Units Order:</strong> 5,000 Units</p>
              <p><strong>Total Revenue:</strong> $125,000</p>
              <p><strong>Total Container Freight:</strong> $45,000</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>Platform Fees (15%): -$18,750</p>
              <p>Total Postage: -$15,000</p>
              <p><strong>Total Expenses: -$78,750</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              Net Profit: $46,250 (37.0% Margin)
            </div>
          </div>

        </div>
      </section>

      {/* Master Catalog Strategy Article */}
      <article className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-800 dark:text-slate-200 space-y-6 shadow-sm">
        <div className="border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Lightbulb className="w-4 h-4" />
            <span>Master Catalog Management Guide</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Managing Catalog Working Capital & Avoiding the Slow-SKU Cash Trap
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            How to structure multi-item inventory investments, monitor portfolio margins, and optimize capital turnover.
          </p>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            1. Applying the 80/20 Rule to E-Commerce Catalogs
          </h3>
          <p>
            In almost every e-commerce catalog, 80% of net profit is generated by 20% of the active product SKUs. Sellers often make the mistake of reordering equal quantities across all SKUs, which ties up valuable working capital in slow-moving items while starving top-performing "Hero" SKUs of inventory. Utilizing a batch profit model helps identify your top-tier profit generators so capital can be allocated efficiently.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            2. Shared Shipping & Container Overhead Allocation
          </h3>
          <p>
            When importing a container or receiving a bulk shipment with multiple product types, freight charges must be accurately distributed across each unit. Allocating freight purely by unit count distorts unit economics—lightweight items end up over-burdened while heavy items appear artificially profitable. Distribute shared shipping costs based on cubic volume or unit weight to ensure true unit profitability.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            3. Preventing Inventory Cash Traps Through Batch Auditing
          </h3>
          <p>
            Products with low sales velocity and thin gross margins act as cash traps, incurring ongoing storage fees that gradually erase any initial profit. Conducting monthly batch audits using our CSV spreadsheet exporter allows you to spot margin compression early, initiate targeted promotional discounts, or liquidate lagging stock before aged storage fees take effect.
          </p>
        </div>
      </article>

      {/* Cross-Tool Navigation Component */}
      <RelatedTools currentPath="/tools/batch-calculator" />

      {/* Structured FAQ Section */}
      <FAQSection title="Multi-SKU Batch Profit FAQs" faqs={faqs} />
    </div>
  );
}
