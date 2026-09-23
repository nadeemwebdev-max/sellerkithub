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
  ShieldCheck,
  Share2
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useI18n } from '../i18n/utils';
import { TOOLS_TRANSLATIONS } from '../i18n/tools';
import { getFaqsForLang } from '../i18n/faqs';
import { exportToCSV } from '../utils/calculations';
import { getParamNumber, buildShareUrl } from '../utils/shareUtils';
import RelatedTools from '../components/RelatedTools';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';
import ShareModal from '../components/ShareModal';

export default function MarginMatrix({ lang: propLang }) {
  const { activeCurrency, format } = useCurrency();
  const { lang, t } = useI18n(propLang);
  const mt = (TOOLS_TRANSLATIONS[lang] || TOOLS_TRANSLATIONS.en).margin;

  const [cost, setCost] = useState(() => getParamNumber('cost', activeCurrency.defaultCost || 12.00));
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 dark:bg-white/10 dark:hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t('btn.copied') : t('btn.copySummary')}</span>
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Link</span>
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

      {/* Master Profit Margin & Markup Guide */}
      <article className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-800 dark:text-slate-200 space-y-6 shadow-sm">
        <div className="border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Lightbulb className="w-4 h-4" />
            <span>Pricing Strategy Guide</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Margin vs. Markup: The Mathematical Difference & Pricing Rules
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Understanding why confusing gross margin and cost markup leads to pricing errors and profit losses.
          </p>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            1. The Mathematical Difference Between Gross Margin & Cost Markup
          </h3>
          <p>
            Gross Profit Margin measures dollar profit as a percentage of <strong>total selling price (revenue)</strong>, whereas Cost Markup measures dollar profit as a percentage of <strong>cost of goods sold (COGS)</strong>. A common pricing mistake is adding a 50% markup to a $100 product (selling at $150), and assuming you have a 50% profit margin. In reality, $50 profit on a $150 retail price yields a 33.3% gross margin.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            2. The Keystone Pricing Rule (100% Markup = 50% Gross Margin)
          </h3>
          <p>
            In retail and e-commerce, Keystone Pricing refers to setting the retail selling price to double the sourcing cost (100% cost markup). A 100% markup yields exactly a 50% gross profit margin. This 50% margin buffer is essential for multi-channel sellers to absorb marketplace commissions (15%), shipping overhead (10%), and advertising spend (10-15%) while remaining net profitable.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            3. Wholesale Discount Ladders & Retailer Margins
          </h3>
          <p>
            When selling products wholesale to boutique stores or retail chains, retailers expect a 40% to 50% margin off the MSRP (Manufacturer's Suggested Retail Price). Establishing a structured wholesale pricing ladder ensures your brand maintains a healthy 30%+ gross margin even after granting standard wholesale volume discounts.
          </p>
        </div>
      </article>

      {/* Author Bio & E-E-A-T Component */}
      <AuthorBio lang={lang} />

      {/* Recommended Seller Tools Affiliate Component */}
      <AffiliateCTA platform="general" lang={lang} />

      {/* Related Tools */}
      <RelatedTools currentPath="/tools/profit-margin-calculator" lang={lang} />

      {/* Structured FAQ Section */}
      <FAQSection lang={lang} faqs={faqs} />

      {/* Share Calculation Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        toolName="E-Commerce Profit Margin & Wholesale Matrix"
        shareUrl={buildShareUrl('/tools/profit-margin-calculator', { cost })}
        summaryText={`Profit Margin & Pricing Matrix (${activeCurrency.code}):\nUnit Sourcing Cost: ${format(cost)}\nKeystone Price (50% Margin): ${format(cost * 2)} | 40% Margin Price: ${format(cost / 0.6)}\nCalculated via SellerKitHub.com`}
      />
    </div>
  );
}
