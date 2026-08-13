import React, { useState, useMemo } from 'react';
import { Grid, Copy, Check, Download, Sparkles, FileSpreadsheet } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { exportToCSV } from '../utils/calculations';
import FAQSection from '../components/FAQSection';
import SEOGuide from '../components/SEOGuide';
import AdPlaceholder from '../components/AdPlaceholder';

export default function MarginMatrix() {
  const { activeCurrency, format } = useCurrency();
  const [cost, setCost] = useState(12.00);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const tiers = [10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 100];

  const matrix = useMemo(() => {
    const baseCost = Number(cost) || 0;

    return tiers.map((pct) => {
      // If pct is target MARGIN: SellingPrice = Cost / (1 - Margin%/100)
      const marginSellingPrice = pct < 100 ? baseCost / (1 - (pct / 100)) : baseCost * 2;
      const marginProfit = marginSellingPrice - baseCost;

      // If pct is target MARKUP: SellingPrice = Cost * (1 + Markup%/100)
      const markupSellingPrice = baseCost * (1 + (pct / 100));
      const markupProfit = markupSellingPrice - baseCost;
      const effectiveMargin = markupSellingPrice > 0 ? (markupProfit / markupSellingPrice) * 100 : 0;

      return {
        percentage: pct,
        marginSellingPrice,
        marginProfit,
        markupSellingPrice,
        markupProfit,
        effectiveMargin
      };
    });
  }, [cost]);

  const generateCSVContent = () => {
    let csv = `Target Rate,Selling Price (Target Margin) (${activeCurrency.code}),Net Profit at Margin (${activeCurrency.code}),Selling Price (Target Markup) (${activeCurrency.code}),Markup Profit (${activeCurrency.code}),Effective Margin %\n`;
    matrix.forEach(row => {
      csv += `"${row.percentage}%","${row.marginSellingPrice.toFixed(2)}","${row.marginProfit.toFixed(2)}","${row.markupSellingPrice.toFixed(2)}","${row.markupProfit.toFixed(2)}","${row.effectiveMargin.toFixed(1)}%"\n`;
    });
    return csv;
  };

  const handleDownloadExcel = () => {
    const csvData = generateCSVContent();
    exportToCSV(`margin-markup-matrix-cost-${cost}`, csvData);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const copyCSV = () => {
    const csvData = generateCSVContent();
    navigator.clipboard.writeText(csvData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What is the difference between Markup and Margin?",
      answer: "Markup is the percentage added to your product cost to get the selling price (Profit / Cost). Margin is the percentage of the selling price that is pure profit (Profit / Selling Price). For example, a 50% Markup equals a 33.3% Margin."
    },
    {
      question: "Why can Profit Margin never exceed 100%?",
      answer: "Because margin is profit divided by revenue. Since profit can never be greater than total revenue, margin cannot exceed 100%. Markup, on the other hand, can be 200%, 500%, or 1000%."
    },
    {
      question: "What is a standard retail markup formula?",
      answer: "Traditional retail often uses 'Keystone Pricing', which is a 100% markup (doubling the wholesale cost), resulting in a 50% gross profit margin."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tiered Wholesale & Retail Pricing Table</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Profit Margin & <span className="text-brand-600 dark:text-brand-400">Markup Matrix</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Enter your base item cost to instantly generate comprehensive price points across all retail margin and markup percentages.
        </p>
      </div>

      {/* Cost Input Header Card */}
      <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 shadow-xl mb-10">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Enter Item Base Unit Cost ({activeCurrency.symbol})
        </label>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base">
              {activeCurrency.symbol}
            </span>
            <input
              type="number"
              step="any"
              value={cost || ''}
              onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
              className="w-full pl-9 pr-3.5 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-lg font-bold focus:outline-none focus:border-brand-500"
              placeholder="10.00"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleDownloadExcel}
              className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
              title="Download Excel spreadsheet"
            >
              {downloaded ? <Check className="w-4 h-4 text-emerald-200" /> : <FileSpreadsheet className="w-4 h-4" />}
              <span>{downloaded ? 'Downloaded!' : 'Download Excel'}</span>
            </button>

            <button
              onClick={copyCSV}
              className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Table'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 uppercase font-mono tracking-wider text-[11px] border-b border-slate-200 dark:border-white/10">
              <tr>
                <th className="py-4 px-6">Target Rate</th>
                <th className="py-4 px-6 text-brand-600 dark:text-brand-400 font-bold">Selling Price (Target Margin)</th>
                <th className="py-4 px-6 text-emerald-700 dark:text-emerald-400">Net Profit / Unit</th>
                <th className="py-4 px-6 text-amber-700 dark:text-amber-400 font-bold">Selling Price (Target Markup)</th>
                <th className="py-4 px-6 text-emerald-700 dark:text-emerald-400">Markup Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-800 dark:text-slate-200 font-mono">
              {matrix.map((row) => (
                <tr key={row.percentage} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition">
                  <td className="py-3.5 px-6 font-bold text-slate-900 dark:text-white">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/10">
                      {row.percentage}%
                    </span>
                  </td>
                  <td className="py-3.5 px-6 font-bold text-brand-700 dark:text-brand-300">
                    {format(row.marginSellingPrice)}
                  </td>
                  <td className="py-3.5 px-6 text-emerald-700 dark:text-emerald-400 font-semibold">
                    +{format(row.marginProfit)}
                  </td>
                  <td className="py-3.5 px-6 font-bold text-amber-700 dark:text-amber-300">
                    {format(row.markupSellingPrice)}
                  </td>
                  <td className="py-3.5 px-6 text-emerald-700 dark:text-emerald-400 font-semibold">
                    +{format(row.markupProfit)} ({row.effectiveMargin.toFixed(1)}% margin)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdPlaceholder slot="horizontal" />

      <SEOGuide
        title="Margin vs. Markup: The Definitive E-Commerce Pricing Strategy"
        subtitle="Avoid the #1 pricing mistake that destroys new seller profit margins."
        formula="Margin % = (Profit / Selling Price) × 100   |   Markup % = (Profit / Product Cost) × 100"
        steps={[
          {
            title: "1. The Sizing Trap",
            description: "If you buy an item for $10 and apply a 50% markup, you sell for $15. Your profit is $5, but your actual margin is 33.3%, not 50%."
          },
          {
            title: "2. Margin Pricing for Marketplaces",
            description: "Because marketplaces charge fees as a percentage of the total Selling Price, always price your products based on target Margin, not Markup."
          }
        ]}
        tips={[
          "Aim for a minimum 40% gross margin on retail items to comfortably cover 15% marketplace fees, 3% payment gateway, and advertising.",
          "Download or copy the CSV matrix to quickly build bulk price sheets for wholesale clients."
        ]}
      />

      <FAQSection title="Margin & Markup FAQs" faqs={faqs} />

    </div>
  );
}
