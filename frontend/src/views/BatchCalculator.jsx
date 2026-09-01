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
  BookOpen,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useI18n } from '../i18n/utils';
import { TOOLS_TRANSLATIONS } from '../i18n/tools';
import { getFaqsForLang } from '../i18n/faqs';
import { exportToCSV } from '../utils/calculations';
import { trackEvent, TRACKED_EVENTS } from '../utils/analytics';
import RelatedTools from '../components/RelatedTools';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';

export default function BatchCalculator({ lang: propLang }) {
  const { activeCurrency, format } = useCurrency();
  const { lang, t } = useI18n(propLang);
  const bt = (TOOLS_TRANSLATIONS[lang] || TOOLS_TRANSLATIONS.en).batch;

  const [skus, setSkus] = useState(bt.defaultSkus || []);
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
    let text = `${bt.badge}:\n${bt.kpiUnits}: ${summary.totalUnits} | ${bt.kpiRevenue}: ${format(summary.totalRevenue)}\n${bt.kpiCogs}: ${format(summary.totalCogs)} | ${bt.kpiFees}: ${format(summary.totalPlatformFees)}\n--------------------------------\n${bt.kpiProfit}: ${format(summary.grandNetProfit)}\n${bt.kpiMargin}: ${summary.grandNetMargin.toFixed(2)}%\nCalculated with SellerKitHub.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = getFaqsForLang('batch', lang);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>{bt.badge}</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {bt.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          {bt.subtitle}
        </p>
      </div>

      {/* Aggregated KPI Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">{bt.kpiRevenue}</span>
          <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white block mt-1">
            {format(summary.totalRevenue)}
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400">{summary.totalUnits} {bt.kpiUnits}</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">{bt.kpiCogs}</span>
          <span className="font-mono text-xl sm:text-2xl font-extrabold text-rose-600 dark:text-rose-400 block mt-1">
            {format(summary.totalCogs)}
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400">{bt.kpiCapital}</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">{bt.kpiFees}</span>
          <span className="font-mono text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-amber-400 block mt-1">
            {format(summary.totalPlatformFees + summary.totalShipping)}
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400">{bt.kpiPostage}</span>
        </div>

        <div className="p-4 rounded-xl border border-brand-200 dark:border-brand-500/30 bg-brand-50/50 dark:bg-brand-500/10 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 block">{bt.kpiProfit}</span>
          <span className={`font-mono text-xl sm:text-2xl font-extrabold block mt-1 ${
            summary.grandNetProfit > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
          }`}>
            {format(summary.grandNetProfit)}
          </span>
          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
            {summary.grandNetMargin.toFixed(1)}% {bt.kpiMargin}
          </span>
        </div>
      </div>

      {/* Main Interactive Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-6 shadow-xl dark:shadow-2xl mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {bt.tableHeading}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{bt.tableSubtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={addSkuRow}
              className="px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{bt.btnAddSku}</span>
            </button>

            <button
              onClick={handleDownloadExcel}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              {downloaded ? <Check className="w-4 h-4 text-emerald-200" /> : <FileSpreadsheet className="w-4 h-4" />}
              <span>{downloaded ? bt.btnCopied : bt.btnDownloadCsv}</span>
            </button>

            <button
              onClick={copySummary}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? bt.btnCopied : bt.btnCopySummary}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">{bt.thSkuName}</th>
                <th className="p-3">{bt.thUnits}</th>
                <th className="p-3">{bt.thPrice}</th>
                <th className="p-3">{bt.thCost}</th>
                <th className="p-3">{bt.thFee}</th>
                <th className="p-3">{bt.thShipping}</th>
                <th className="p-3">{bt.thRevenue}</th>
                <th className="p-3">{bt.thProfit}</th>
                <th className="p-3">{bt.thMargin}</th>
                <th className="p-3 text-center">{bt.thAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              {summary.rowDetails.map(sku => (
                <tr key={sku.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                  <td className="p-2">
                    <input
                      aria-label="SKU Name"
                      type="text"
                      value={sku.name}
                      onChange={(e) => updateSku(sku.id, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-brand-500"
                    />
                  </td>
                  <td className="p-2 w-20">
                    <input
                      aria-label="Quantity"
                      type="number"
                      inputMode="numeric"
                      value={sku.quantity}
                      onChange={(e) => updateSku(sku.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-center focus:outline-none focus:border-brand-500"
                    />
                  </td>
                  <td className="p-2 w-24">
                    <input
                      aria-label="Price"
                      type="number"
                      inputMode="decimal"
                      value={sku.price}
                      onChange={(e) => updateSku(sku.id, 'price', parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-right focus:outline-none focus:border-brand-500"
                    />
                  </td>
                  <td className="p-2 w-24">
                    <input
                      aria-label="Unit Cost"
                      type="number"
                      inputMode="decimal"
                      value={sku.cost}
                      onChange={(e) => updateSku(sku.id, 'cost', parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-right focus:outline-none focus:border-brand-500"
                    />
                  </td>
                  <td className="p-2 w-20">
                    <input
                      aria-label="Platform Fee percentage"
                      type="number"
                      inputMode="decimal"
                      value={sku.platformFeePct}
                      onChange={(e) => updateSku(sku.id, 'platformFeePct', parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-center focus:outline-none focus:border-brand-500"
                    />
                  </td>
                  <td className="p-2 w-24">
                    <input
                      aria-label="Shipping Postage"
                      type="number"
                      inputMode="decimal"
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
            {bt.matrixTitle}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          {bt.matrixDesc}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">{bt.matrixColTier}</th>
                <th className="p-3">{bt.matrixColShare}</th>
                <th className="p-3">{bt.matrixColMargin}</th>
                <th className="p-3">{bt.matrixColVelocity}</th>
                <th className="p-3">{bt.matrixColRole}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">{bt.tier1Name}</td>
                <td className="p-3 font-mono text-brand-600 dark:text-brand-400">40% - 50%</td>
                <td className="p-3 font-mono">35% - 50%</td>
                <td className="p-3 font-bold text-emerald-600">{bt.tier1Velocity}</td>
                <td className="p-3">{bt.tier1Role}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">{bt.tier2Name}</td>
                <td className="p-3 font-mono text-brand-600 dark:text-brand-400">30% - 40%</td>
                <td className="p-3 font-mono text-emerald-600">60% - 80%</td>
                <td className="p-3">{bt.tier2Velocity}</td>
                <td className="p-3">{bt.tier2Role}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">{bt.tier3Name}</td>
                <td className="p-3 font-mono text-brand-600 dark:text-brand-400">10% - 20%</td>
                <td className="p-3 font-mono text-amber-600">15% - 25%</td>
                <td className="p-3 text-rose-600">{bt.tier3Velocity}</td>
                <td className="p-3">{bt.tier3Role}</td>
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
            {bt.examplesTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              {bt.ex1Title}
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>{bt.lblUnitsOrder}</strong> 1,000 Units</p>
              <p><strong>{bt.lblTotalRev}</strong> $35,000</p>
              <p><strong>{bt.lblTotalCogs}</strong> $10,500</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>{bt.lblPlatformFees} (15%): -$5,250</p>
              <p>{bt.lblTotalShipping} -$4,000</p>
              <p><strong>{bt.lblTotalExpenses} -$19,750</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              {bt.lblNetProfit} $15,250 (43.6% {bt.lblMargin})
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              {bt.ex2Title}
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>{bt.lblUnitsOrder}</strong> 2,500 Units</p>
              <p><strong>{bt.lblTotalRev}</strong> $62,500</p>
              <p><strong>{bt.lblTotalCogs}</strong> $22,000</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>{bt.lblPlatformFees} (8%): -$5,000</p>
              <p>{bt.lblTotalShipping} -$8,750</p>
              <p><strong>{bt.lblTotalExpenses} -$35,750</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              {bt.lblNetProfit} $26,750 (42.8% {bt.lblMargin})
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              {bt.ex3Title}
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>{bt.lblUnitsOrder}</strong> 500 Units</p>
              <p><strong>{bt.lblTotalRev}</strong> $7,500</p>
              <p><strong>{bt.lblLiqCost}</strong> $4,000</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>{bt.lblPlatformFees} (13.25%): -$993.75</p>
              <p>{bt.lblTotalShipping} -$1,250</p>
              <p><strong>{bt.lblTotalExpenses} -$6,243.75</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              {bt.lblNetProfit} $1,256.25 (16.7% {bt.lblMargin})
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              {bt.ex4Title}
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>{bt.lblUnitsOrder}</strong> 5,000 Units</p>
              <p><strong>{bt.lblTotalRev}</strong> $125,000</p>
              <p><strong>{bt.lblContainerFreight}</strong> $45,000</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>{bt.lblPlatformFees} (15%): -$18,750</p>
              <p>{bt.lblTotalPostage} -$15,000</p>
              <p><strong>{bt.lblTotalExpenses} -$78,750</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              {bt.lblNetProfit} $46,250 (37.0% {bt.lblMargin})
            </div>
          </div>

        </div>
      </section>

      {/* Master Catalog Strategy Article */}
      <article className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-800 dark:text-slate-200 space-y-6 shadow-sm">
        <div className="border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Lightbulb className="w-4 h-4" />
            <span>{bt.guideBadge}</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {bt.guideTitle}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            {bt.guideSubtitle}
          </p>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {bt.sec1Title}
          </h3>
          <p>
            {bt.sec1Text}
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {bt.sec2Title}
          </h3>
          <p>
            {bt.sec2Text}
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {bt.sec3Title}
          </h3>
          <p>
            {bt.sec3Text}
          </p>
        </div>
      </article>

      {/* Cross-Tool Navigation Component */}
      <RelatedTools currentPath="/tools/batch-calculator" lang={lang} />

      {/* Structured FAQ Section */}
      <FAQSection lang={lang} faqs={faqs} />
    </div>
  );
}
