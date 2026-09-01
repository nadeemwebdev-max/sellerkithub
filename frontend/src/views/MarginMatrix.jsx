import React, { useState, useMemo } from 'react';
import { 
  Grid, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  FileSpreadsheet, 
  RefreshCw,
  BookOpen,
  BarChart3,
  Lightbulb,
  ShieldCheck
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useI18n } from '../i18n/utils';
import { TOOLS_TRANSLATIONS } from '../i18n/tools';
import { getFaqsForLang } from '../i18n/faqs';
import { exportToCSV } from '../utils/calculations';
import RelatedTools from '../components/RelatedTools';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';

export default function MarginMatrix({ lang: propLang }) {
  const { activeCurrency, format } = useCurrency();
  const { lang, t } = useI18n(propLang);
  const mt = (TOOLS_TRANSLATIONS[lang] || TOOLS_TRANSLATIONS.en).margin;

  const [cost, setCost] = useState(activeCurrency.defaultCost || 12.00);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const tiers = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 90];

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

  const faqs = getFaqsForLang('margin', lang);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
          <Grid className="w-3.5 h-3.5" />
          <span>{mt.badge}</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {mt.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          {mt.subtitle}
        </p>
      </div>

      {/* Main Interactive Controls & Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-6 shadow-xl dark:shadow-2xl mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {mt.inputCost}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Values in {activeCurrency.code} ({activeCurrency.symbol})</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCost(activeCurrency.defaultCost || 12.00)}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('btn.reset')}</span>
            </button>

            <button
              onClick={handleDownloadExcel}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              {downloaded ? <Check className="w-4 h-4 text-emerald-200" /> : <FileSpreadsheet className="w-4 h-4" />}
              <span>{downloaded ? t('btn.copied') : t('btn.downloadExcel')}</span>
            </button>

            <button
              onClick={copyCSV}
              className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t('btn.copied') : t('btn.copySummary')}</span>
            </button>
          </div>
        </div>

        {/* Big Sourcing Cost Input Field */}
        <div>
          <label htmlFor="margin-cost-input" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
            {mt.inputCost} ({activeCurrency.symbol})
          </label>
          <input
            id="margin-cost-input"
            aria-label="Unit Product Sourcing Cost"
            type="number"
            inputMode="decimal"
            value={cost || ''}
            onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-lg font-bold focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">Target Rate %</th>
                <th className="p-3">Retail Price (Target Margin)</th>
                <th className="p-3">Dollar Profit (at Margin)</th>
                <th className="p-3">Retail Price (Target Markup)</th>
                <th className="p-3">Dollar Profit (at Markup)</th>
                <th className="p-3">Effective Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              {matrix.map((row) => (
                <tr 
                  key={row.percentage}
                  className={`hover:bg-slate-50/50 dark:hover:bg-white/[0.02] ${
                    row.percentage === 50 ? 'bg-amber-50/40 dark:bg-amber-500/10 font-bold' : ''
                  }`}
                >
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">
                    {row.percentage}% {row.percentage === 50 && <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 ml-1">Keystone</span>}
                  </td>
                  <td className="p-3 font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    {format(row.marginSellingPrice)}
                  </td>
                  <td className="p-3 font-mono text-slate-800 dark:text-slate-200">
                    {format(row.marginProfit)}
                  </td>
                  <td className="p-3 font-mono text-brand-600 dark:text-brand-400">
                    {format(row.markupSellingPrice)}
                  </td>
                  <td className="p-3 font-mono text-slate-800 dark:text-slate-200">
                    {format(row.markupProfit)}
                  </td>
                  <td className="p-3 font-mono text-slate-600 dark:text-slate-400">
                    {row.effectiveMargin.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Author Bio & E-E-A-T Component */}
      <AuthorBio lang={lang} />

      {/* Recommended Seller Tools Affiliate Component */}
      <AffiliateCTA platform="general" lang={lang} />

      {/* Related Tools */}
      <RelatedTools currentPath="/tools/profit-margin-calculator" lang={lang} />

      {/* Structured FAQ Section */}
      <FAQSection lang={lang} faqs={faqs} />
    </div>
  );
}
