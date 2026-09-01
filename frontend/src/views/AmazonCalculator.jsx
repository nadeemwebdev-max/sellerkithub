import React, { useState, useMemo } from 'react';
import { TrendingUp, Copy, Check, RefreshCw, Layers, ShieldCheck, FileSpreadsheet, BookOpen, BarChart3, Lightbulb, PackageCheck, Truck } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useI18n } from '../i18n/utils';
import { getFaqsForLang } from '../i18n/faqs';
import { getSectionTranslations } from '../i18n/sections';
import { exportToCSV } from '../utils/calculations';
import { trackEvent, TRACKED_EVENTS } from '../utils/analytics';
import RelatedTools from '../components/RelatedTools';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';

export default function AmazonCalculator({ isShippingRoute: initialShippingRoute = false, lang: propLang }) {
  const { activeCurrency, format } = useCurrency();
  const { lang, t } = useI18n(propLang);
  const sec = getSectionTranslations(lang);
  const isShippingRoute = initialShippingRoute || (typeof window !== 'undefined' && window.location.pathname.includes('shipping'));

  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Form Inputs
  const [sellingPrice, setSellingPrice] = useState(34.99);
  const [itemCost, setItemCost] = useState(9.00);
  const [shippingToAmazon, setShippingToAmazon] = useState(1.50);
  const [merchantShippingCost, setMerchantShippingCost] = useState(6.00);
  const [referralRate, setReferralRate] = useState(15);
  const [fbaFee, setFbaFee] = useState(3.86);
  const [monthlyStorage, setMonthlyStorage] = useState(0.35);
  const [ppcSpend, setPpcSpend] = useState(3.00);
  const [returnRate, setReturnRate] = useState(4);

  // FBA vs FBM Calculations
  const calculations = useMemo(() => {
    const price = Number(sellingPrice) || 0;
    const cost = Number(itemCost) || 0;
    const prepShip = Number(shippingToAmazon) || 0;
    const fbmShip = Number(merchantShippingCost) || 0;
    const refPercent = Number(referralRate) || 15;
    const fbaPickPack = Number(fbaFee) || 3.86;
    const storage = Number(monthlyStorage) || 0;
    const ppc = Number(ppcSpend) || 0;
    const retRate = Number(returnRate) || 0;

    const referralFee = price * (refPercent / 100);

    // FBA Scenario
    const fbaTotalFees = referralFee + (fbaPickPack * activeCurrency.rate) + (storage * activeCurrency.rate);
    const fbaReturnBuffer = (cost + fbaPickPack) * (retRate / 100);
    const fbaTotalCost = cost + prepShip + fbaTotalFees + ppc + fbaReturnBuffer;
    const fbaNetProfit = price - fbaTotalCost;
    const fbaMargin = price > 0 ? (fbaNetProfit / price) * 100 : 0;
    const fbaRoi = fbaTotalCost > 0 ? (fbaNetProfit / fbaTotalCost) * 100 : 0;

    // FBM Scenario
    const fbmTotalFees = referralFee;
    const fbmReturnBuffer = (cost + fbmShip) * (retRate / 100);
    const fbmTotalCost = cost + fbmShip + fbmTotalFees + ppc + fbmReturnBuffer;
    const fbmNetProfit = price - fbmTotalCost;
    const fbmMargin = price > 0 ? (fbmNetProfit / price) * 100 : 0;
    const fbmRoi = fbmTotalCost > 0 ? (fbmNetProfit / fbmTotalCost) * 100 : 0;

    return {
      referralFee,
      fba: {
        fees: fbaTotalFees,
        totalCost: fbaTotalCost,
        netProfit: fbaNetProfit,
        margin: fbaMargin,
        roi: fbaRoi
      },
      fbm: {
        fees: fbmTotalFees,
        totalCost: fbmTotalCost,
        netProfit: fbmNetProfit,
        margin: fbmMargin,
        roi: fbmRoi
      }
    };
  }, [
    sellingPrice,
    itemCost,
    shippingToAmazon,
    merchantShippingCost,
    referralRate,
    fbaFee,
    monthlyStorage,
    ppcSpend,
    returnRate,
    activeCurrency
  ]);

  const handleDownloadExcel = () => {
    let csv = `Metric,Amazon FBA (${activeCurrency.code}),Amazon FBM (${activeCurrency.code})\n`;
    csv += `"Selling Price","${sellingPrice}","${sellingPrice}"\n`;
    csv += `"Item Sourcing Cost","${itemCost}","${itemCost}"\n`;
    csv += `"Category Referral Fee","-${calculations.referralFee.toFixed(2)}","-${calculations.referralFee.toFixed(2)}"\n`;
    csv += `"Fulfillment / Shipping Fee","-${(fbaFee * activeCurrency.rate).toFixed(2)}","-${merchantShippingCost}"\n`;
    csv += `"Advertising PPC Spend","-${ppcSpend}","-${ppcSpend}"\n`;
    csv += `"Total Expenses","${calculations.fba.totalCost.toFixed(2)}","${calculations.fbm.totalCost.toFixed(2)}"\n`;
    csv += `"NET PROFIT","${calculations.fba.netProfit.toFixed(2)}","${calculations.fbm.netProfit.toFixed(2)}"\n`;
    csv += `"PROFIT MARGIN %","${calculations.fba.margin.toFixed(2)}%","${calculations.fbm.margin.toFixed(2)}%"\n`;
    csv += `"ROI %","${calculations.fba.roi.toFixed(1)}%","${calculations.fbm.roi.toFixed(1)}%"\n`;

    exportToCSV(`amazon-fba-vs-fbm-analysis`, csv);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const copySummary = () => {
    const text = `Amazon FBA vs FBM Fee Breakdown:
Selling Price: ${format(sellingPrice)} | COGS: ${format(itemCost)}
Referral Fee (${referralRate}%): ${format(calculations.referralFee)}
FBA Net Profit: ${format(calculations.fba.netProfit)} (${calculations.fba.margin.toFixed(2)}% Margin)
FBM Net Profit: ${format(calculations.fbm.netProfit)} (${calculations.fbm.margin.toFixed(2)}% Margin)
Calculated with SellerKitHub.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = getFaqsForLang('amazon', lang);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold border border-amber-200 dark:border-amber-500/20 mb-3">
          {isShippingRoute ? <Truck className="w-3.5 h-3.5" /> : <PackageCheck className="w-3.5 h-3.5" />}
          <span>
            {isShippingRoute 
              ? 'Amazon FBA Inbound Freight, Placement & Shipping Calculator (2026)' 
              : t('amz.badge')}
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isShippingRoute ? (
            <>Amazon FBA <span className="text-amber-600 dark:text-amber-400">Shipping & Placement Fee</span> Calculator</>
          ) : (
            t('amz.title')
          )}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          {isShippingRoute
            ? 'Calculate total Amazon FBA inbound freight costs, inbound placement service fee tiers, FBA pick & pack rates, and merchant shipping expenses for 2026.'
            : t('amz.subtitle')}
        </p>
      </div>

      {/* Main Interactive Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Form Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-5 shadow-xl dark:shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {t('home.inputHeading1')}
            </h2>
            <button
              onClick={() => {
                setSellingPrice(34.99);
                setItemCost(9.00);
                setShippingToAmazon(1.50);
                setMerchantShippingCost(6.00);
                setReferralRate(15);
                setFbaFee(3.86);
                setMonthlyStorage(0.35);
                setPpcSpend(3.00);
                setReturnRate(4);
              }}
              className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{t('btn.reset')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="amz-selling-price" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                {t('input.sellingPrice')} ({activeCurrency.symbol})
              </label>
              <input
                id="amz-selling-price"
                aria-label={`Target Selling Price in ${activeCurrency.symbol}`}
                type="number"
                inputMode="decimal"
                value={sellingPrice || ''}
                onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label htmlFor="amz-item-cost" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                {t('input.itemCost')} ({activeCurrency.symbol})
              </label>
              <input
                id="amz-item-cost"
                aria-label={`Item Sourcing Cost in ${activeCurrency.symbol}`}
                type="number"
                inputMode="decimal"
                value={itemCost || ''}
                onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label htmlFor="amz-inbound-freight" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                {t('input.inboundFreight')} ({activeCurrency.symbol})
              </label>
              <input
                id="amz-inbound-freight"
                aria-label={`Inbound Freight in ${activeCurrency.symbol}`}
                type="number"
                inputMode="decimal"
                value={shippingToAmazon || ''}
                onChange={(e) => setShippingToAmazon(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label htmlFor="amz-merchant-shipping" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                {t('input.merchantShipping')} ({activeCurrency.symbol})
              </label>
              <input
                id="amz-merchant-shipping"
                aria-label={`Merchant Shipping Postage in ${activeCurrency.symbol}`}
                type="number"
                inputMode="decimal"
                value={merchantShippingCost || ''}
                onChange={(e) => setMerchantShippingCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label htmlFor="amz-referral-rate" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                {t('input.referralRate')}
              </label>
              <select
                id="amz-referral-rate"
                aria-label="Category Referral Fee Rate percentage"
                value={referralRate}
                onChange={(e) => setReferralRate(parseFloat(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-amber-500"
              >
                <option value={15} className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">15% - Standard (Home, Kitchen, Toys, Sports)</option>
                <option value={8} className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">8% - Consumer Electronics & Computers</option>
                <option value={12} className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">12% - Automotive & Industrial</option>
                <option value={10} className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">10% - Apparel (Items under $20)</option>
                <option value={20} className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">20% - Jewelry & Accessories</option>
              </select>
            </div>

            <div>
              <label htmlFor="amz-fba-fee" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                {t('input.fbaFee')} ({activeCurrency.symbol})
              </label>
              <input
                id="amz-fba-fee"
                aria-label={`FBA Fulfillment Fee per Unit in ${activeCurrency.symbol}`}
                type="number"
                inputMode="decimal"
                value={fbaFee || ''}
                onChange={(e) => setFbaFee(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label htmlFor="amz-ppc-spend" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                {t('input.ppcSpend')} ({activeCurrency.symbol})
              </label>
              <input
                id="amz-ppc-spend"
                aria-label={`Amazon PPC Ad Spend in ${activeCurrency.symbol}`}
                type="number"
                inputMode="decimal"
                value={ppcSpend || ''}
                onChange={(e) => setPpcSpend(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label htmlFor="amz-return-rate" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                {t('input.returnRate')}
              </label>
              <input
                id="amz-return-rate"
                aria-label="Estimated Return Rate percentage"
                type="number"
                inputMode="decimal"
                value={returnRate || ''}
                onChange={(e) => setReturnRate(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-gradient-to-b dark:from-[#19140b] dark:to-[#0c0a06] p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="grid grid-cols-2 gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">{t('amz.fbaProfit')}</span>
                <span className={`font-mono text-2xl sm:text-3xl font-extrabold ${calculations.fba.netProfit > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                  {format(calculations.fba.netProfit)}
                </span>
                <span className="block text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mt-0.5">
                  {calculations.fba.margin.toFixed(1)}% Margin
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">{t('amz.fbmProfit')}</span>
                <span className={`font-mono text-2xl sm:text-3xl font-extrabold ${calculations.fbm.netProfit > 0 ? 'text-blue-700 dark:text-blue-400' : 'text-rose-700 dark:text-rose-400'}`}>
                  {format(calculations.fbm.netProfit)}
                </span>
                <span className="block text-[11px] font-semibold text-blue-800 dark:text-blue-300 mt-0.5">
                  {calculations.fbm.margin.toFixed(1)}% Margin
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>{t('amz.referralFee')} ({referralRate}%)</span>
                <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">-{format(calculations.referralFee)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>{t('amz.fbaPickPack')}</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-{format(fbaFee * activeCurrency.rate)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>{t('amz.storagePlacement')}</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-{format(monthlyStorage * activeCurrency.rate)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>{t('input.ppcSpend')}</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-{format(ppcSpend)}</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 border-t border-slate-200 dark:border-white/10 pt-2">
                <span>{t('metric.totalCost')}</span>
                <span className="font-mono text-slate-900 dark:text-white">{format(calculations.fba.totalCost)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleDownloadExcel}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-emerald-600/20"
              >
                {downloaded ? <Check className="w-4 h-4 text-emerald-200" /> : <FileSpreadsheet className="w-4 h-4" />}
                <span>{downloaded ? t('btn.copied') : t('btn.downloadExcel')}</span>
              </button>

              <button
                onClick={copySummary}
                className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-amber-600/20"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t('btn.copied') : t('btn.copySummary')}</span>
              </button>
            </div>
          </div>

          <AdPlaceholder slot="vertical" />
        </div>

      </div>

      {/* Author Bio & E-E-A-T Component */}
      <AuthorBio 
        lang={lang}
      />

      {/* Recommended Seller Tools Affiliate Component */}
      <AffiliateCTA 
        platform="amazon" 
        lang={lang}
      />

      {/* 2026 Amazon Fee Schedule Reference Table */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {sec.amzTableTitle}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          {sec.amzTableDesc}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">{sec.colFeeTier}</th>
                <th className="p-3">{sec.colDimensions}</th>
                <th className="p-3">{sec.colFbaFee}</th>
                <th className="p-3">{sec.colReferralRate}</th>
                <th className="p-3">{sec.colStorageRate}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Small Standard (&lt; 4 oz)</td>
                <td className="p-3 font-mono">15" x 12" x 0.75" | 4 oz</td>
                <td className="p-3 font-mono text-amber-600 dark:text-amber-400">$3.22 USD</td>
                <td className="p-3">8% - 15%</td>
                <td className="p-3 font-mono">$0.78 / $2.40 per cu. ft.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Large Standard (4-8 oz)</td>
                <td className="p-3 font-mono">18" x 14" x 8" | 8 oz</td>
                <td className="p-3 font-mono text-amber-600 dark:text-amber-400">$3.86 USD</td>
                <td className="p-3">15%</td>
                <td className="p-3 font-mono">$0.78 / $2.40 per cu. ft.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Large Standard (1-2 lbs)</td>
                <td className="p-3 font-mono">18" x 14" x 8" | 2 lbs</td>
                <td className="p-3 font-mono text-amber-600 dark:text-amber-400">$5.40 USD</td>
                <td className="p-3">15%</td>
                <td className="p-3 font-mono">$0.78 / $2.40 per cu. ft.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Small Oversize (&lt; 70 lbs)</td>
                <td className="p-3 font-mono">60" x 30" | 70 lbs</td>
                <td className="p-3 font-mono text-amber-600 dark:text-amber-400">$9.90 + $0.42/lb</td>
                <td className="p-3">15%</td>
                <td className="p-3 font-mono">$0.56 / $1.40 per cu. ft.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Inbound Placement Fee</td>
                <td className="p-3 font-mono">Per Unit Inbound</td>
                <td className="p-3 font-mono text-amber-600 dark:text-amber-400">$0.21 - $0.68 USD</td>
                <td className="p-3">N/A</td>
                <td className="p-3 font-mono">Waived for Multi-Split Shipments</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Step-by-Step Worked Math Examples */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm space-y-8">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {sec.amzExamplesTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          {/* Example 1 */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              {sec.ex1AmzTitle}
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>{sec.lblSellingPrice}:</strong> $29.99</p>
              <p><strong>{sec.lblSourcingCost}:</strong> $6.50</p>
              <p><strong>{sec.lblInboundFreight}:</strong> $1.20</p>
              <p><strong>{sec.lblCategory}:</strong> Kitchen (15%)</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>{sec.lblReferralFee} (15%): -$4.50</p>
              <p>{sec.lblFbaPickPack}: -$4.20</p>
              <p>{sec.lblMonthlyStorage}: -$0.35</p>
              <p>{sec.lblPpcSpend}: -$3.00</p>
              <p><strong>{sec.lblTotalCost}: -$19.75</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              {sec.lblFbaNetProfit}: $10.24 (34.1% {sec.lblMargin})
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              {sec.ex2AmzTitle}
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>{sec.lblSellingPrice}:</strong> $49.99</p>
              <p><strong>{sec.lblSourcingCost}:</strong> $9.00</p>
              <p><strong>{sec.lblInboundFreight}:</strong> $0.80</p>
              <p><strong>{sec.lblCategory}:</strong> Health (15%)</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>{sec.lblReferralFee} (15%): -$7.50</p>
              <p>{sec.lblFbaPickPack}: -$4.10</p>
              <p>{sec.lblStoragePlacement}: -$0.45</p>
              <p>{sec.lblPpcSpend}: -$14.00</p>
              <p><strong>{sec.lblTotalCost}: -$35.85</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              {sec.lblFbaNetProfit}: $14.14 (28.3% {sec.lblMargin})
            </div>
          </div>

          {/* Example 3 */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              {sec.ex3AmzTitle}
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>{sec.lblSellingPrice}:</strong> $39.99</p>
              <p><strong>{sec.lblSourcingCost}:</strong> $10.00</p>
              <p><strong>{sec.lblInboundFreight}:</strong> $1.10</p>
              <p><strong>{sec.lblCategory}:</strong> Apparel (15%)</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>{sec.lblReferralFee} (15%): -$6.00</p>
              <p>{sec.lblFbaPickPack}: -$4.50</p>
              <p>{sec.lblReturnAllowance} (12%): -$1.74</p>
              <p>{sec.lblPpcSpend}: -$4.50</p>
              <p><strong>{sec.lblTotalCost}: -$27.84</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              {sec.lblFbaNetProfit}: $12.15 (30.4% {sec.lblMargin})
            </div>
          </div>

        </div>
      </section>

      {/* Master Amazon Strategy Article */}
      <article className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-800 dark:text-slate-200 space-y-6 shadow-sm">
        <div className="border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Lightbulb className="w-4 h-4" />
            <span>{sec.masterclassBadge}</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {sec.masterclassTitle}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            {sec.masterclassSubtitle}
          </p>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            1. FBA vs FBM Fulfillment Economics Comparison
          </h3>
          <p>
            Choosing between Fulfillment by Amazon (FBA) and Fulfillment by Merchant (FBM) is one of the most critical financial decisions an Amazon seller makes. While FBA grants automatic Prime badge eligibility and superior organic conversion rates, its fee structure scales directly with item dimensions and weight. FBM can yield significantly higher net margins for lightweight products that ship easily via standard postal mail, or for oversized, heavy items where Amazon's oversize FBA fulfillment surcharges exceed commercial 3PL shipping rates.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            2. Navigating 2026 Inbound Placement Fees & Q4 Storage Surcharges
          </h3>
          <p>
            Amazon's 2026 Inbound Placement Service Fee rewards sellers who send split inventory shipments across multiple regional fulfillment centers. Choosing single-destination inbound shipping incurs a placement surcharge ranging from $0.21 to $0.68 per unit depending on weight. Furthermore, monthly storage rates jump by over 200% from $0.78 to $2.40 per cubic foot during Q4 peak season (October through December). Maintaining an optimized Inventory Performance Index (IPI) score is critical to avoid aged inventory surcharges.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            3. Advertising Mathematics: Balancing ACoS and TACoS
          </h3>
          <p>
            Amazon PPC sponsored ads are often necessary to launch new listings and maintain keyword ranking. However, relying solely on ACoS (Ad Spend / Ad Revenue) can obscure unprofitable ad spend. Sellers must track TACoS (Total Advertising Cost of Sales = Total Ad Spend / Total Shop Sales). A healthy TACoS target for mature products is 8% to 12%, ensuring that ad spend drives organic flywheel momentum without cannibalizing net profit.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            4. FBA Storage Overhead Mitigation & Inventory Performance Index (IPI)
          </h3>
          <p>
            To prevent aged storage surcharges (assessed on units held over 180 days in Amazon warehouses), high-volume FBA brand owners maintain a 30-day to 45-day rolling stock buffer in Amazon warehouses while storing reserve inventory in lower-cost regional 3PL fulfillment centers. Liquidating slow-moving ASINs via Amazon Outlet or removal orders before peak Q4 rate increases preserves net operating cash flow.
          </p>
        </div>
      </article>

      {/* Cross-Tool Navigation Component */}
      <RelatedTools currentPath="/tools/amazon-fba-calculator" lang={lang} />

      {/* Structured FAQ Section */}
      <FAQSection lang={lang} faqs={faqs} />
    </div>
  );
}
