import React, { useState, useMemo, useEffect } from 'react';
import { TrendingUp, Copy, Check, RefreshCw, Layers, ShieldCheck, FileSpreadsheet, BookOpen, BarChart3, Lightbulb, DownloadCloud, Sparkles, Package } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useI18n } from '../i18n/utils';
import { getFaqsForLang } from '../i18n/faqs';
import { getSectionTranslations } from '../i18n/sections';
import { calculateMasterProfit, exportToCSV } from '../utils/calculations';
import { trackEvent, TRACKED_EVENTS } from '../utils/analytics';
import RelatedTools from '../components/RelatedTools';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';

export default function EtsyCalculator({ isDigitalRoute: initialDigitalRoute = false, lang: propLang }) {
  const { activeCurrency, format } = useCurrency();
  const { lang, t } = useI18n(propLang);
  const sec = getSectionTranslations(lang);
  const isDigitalRoute = initialDigitalRoute || (typeof window !== 'undefined' && window.location.pathname.includes('digital'));

  // Input States
  const [productType, setProductType] = useState(isDigitalRoute ? 'digital' : 'physical');
  const [sellingPrice, setSellingPrice] = useState(isDigitalRoute ? 12.00 : 45.00);
  const [shippingCharged, setShippingCharged] = useState(0.00);
  const [itemCost, setItemCost] = useState(isDigitalRoute ? 0.50 : 12.00);
  const [actualShippingCost, setActualShippingCost] = useState(isDigitalRoute ? 0.00 : 4.50);
  const [offsiteAdsTier, setOffsiteAdsTier] = useState(0); // 0 = None, 15 = Optional 15%, 12 = Mandatory 12%
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (isDigitalRoute) {
      setProductType('digital');
      setShippingCharged(0);
      setActualShippingCost(0);
    }
  }, [isDigitalRoute]);

  const handleProductTypeChange = (type) => {
    setProductType(type);
    if (type === 'digital') {
      setShippingCharged(0);
      setActualShippingCost(0);
      if (sellingPrice === 45.00) setSellingPrice(12.00);
      if (itemCost === 12.00) setItemCost(0.50);
    } else {
      if (actualShippingCost === 0) setActualShippingCost(4.50);
      if (sellingPrice === 12.00) setSellingPrice(45.00);
      if (itemCost === 0.50) setItemCost(12.00);
    }
  };

  // Etsy Calculations
  const calculations = useMemo(() => {
    const effectiveShippingCharged = productType === 'digital' ? 0 : shippingCharged;
    const effectiveShippingCost = productType === 'digital' ? 0 : actualShippingCost;

    const res = calculateMasterProfit({
      sellingPrice,
      shippingCharged: effectiveShippingCharged,
      productCost: itemCost,
      shippingCost: effectiveShippingCost,
      platform: 'etsy',
      fulfillmentType: 'fbm',
      referralRate: 6.5,
      marketingSpend: 0,
      returnRate: productType === 'digital' ? 0.5 : 2,
      miscellaneousCost: 0.20, // $0.20 listing fee
      offsiteAdsActive: offsiteAdsTier > 0,
      currencyRate: activeCurrency.rate
    });

    const price = Number(sellingPrice) || 0;
    const shipCharged = Number(effectiveShippingCharged) || 0;
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
  }, [sellingPrice, shippingCharged, itemCost, actualShippingCost, offsiteAdsTier, productType, activeCurrency]);

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

  const faqs = getFaqsForLang('etsy', lang);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-xs font-semibold border border-orange-200 dark:border-orange-500/20 mb-3">
          {productType === 'digital' ? <DownloadCloud className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
          <span>
            {productType === 'digital'
              ? 'Etsy Digital Downloads & Printables Fee Calculator (2026)'
              : t('etsy.badge')}
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {productType === 'digital' ? (
            <>Etsy <span className="text-orange-600 dark:text-orange-400">Digital Product</span> Fee & Profit Calculator</>
          ) : (
            t('etsy.title')
          )}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          {productType === 'digital'
            ? 'Model Etsy fees for digital art, Canva templates, planners, SVGs, and printables with zero shipping overhead.'
            : t('etsy.subtitle')}
        </p>

        {/* Product Format Selector Toggle */}
        <div className="flex justify-center mt-6">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 inline-flex gap-1">
            <button
              onClick={() => handleProductTypeChange('physical')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                productType === 'physical'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>{t('input.physical')}</span>
            </button>
            <button
              onClick={() => handleProductTypeChange('digital')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                productType === 'digital'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <DownloadCloud className="w-3.5 h-3.5" />
              <span>{t('input.digital')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Calculation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-5 shadow-xl dark:shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {t('home.inputHeading1')}
            </h2>
            <button
              onClick={() => {
                setSellingPrice(productType === 'digital' ? 12.00 : 45.00);
                setItemCost(productType === 'digital' ? 0.50 : 12.00);
                setShippingCharged(0.00);
                setActualShippingCost(productType === 'digital' ? 0.00 : 4.50);
                setOffsiteAdsTier(0);
              }}
              className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{t('btn.reset')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="etsy-selling-price" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Item Selling Price ({activeCurrency.symbol})
              </label>
              <input
                id="etsy-selling-price"
                aria-label={`Item Selling Price in ${activeCurrency.symbol}`}
                type="number"
                inputMode="decimal"
                value={sellingPrice || ''}
                onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            {productType === 'physical' ? (
              <div>
                <label htmlFor="etsy-shipping-charged" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                  Shipping Charged to Buyer ({activeCurrency.symbol})
                </label>
                <input
                  id="etsy-shipping-charged"
                  aria-label={`Shipping Charged to Buyer in ${activeCurrency.symbol}`}
                  type="number"
                  inputMode="decimal"
                  value={shippingCharged || ''}
                  onChange={(e) => setShippingCharged(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                  Fulfillment Type
                </label>
                <div className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-mono text-xs flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Instant Digital Delivery ($0 Shipping)</span>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="etsy-item-cost" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                {productType === 'digital' ? `Asset / Software Cost (${activeCurrency.symbol})` : `Crafting / Material Cost (${activeCurrency.symbol})`}
              </label>
              <input
                id="etsy-item-cost"
                aria-label={`Production Cost in ${activeCurrency.symbol}`}
                type="number"
                inputMode="decimal"
                value={itemCost || ''}
                onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            {productType === 'physical' && (
              <div>
                <label htmlFor="etsy-postage-cost" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                  Actual Shipping Postage Cost ({activeCurrency.symbol})
                </label>
                <input
                  id="etsy-postage-cost"
                  aria-label={`Actual Shipping Cost in ${activeCurrency.symbol}`}
                  type="number"
                  inputMode="decimal"
                  value={actualShippingCost || ''}
                  onChange={(e) => setActualShippingCost(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="etsy-offsite-ads" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Etsy Offsite Ads Rate
            </label>
            <select
              id="etsy-offsite-ads"
              aria-label="Etsy Offsite Ads Rate"
              value={offsiteAdsTier}
              onChange={(e) => setOffsiteAdsTier(parseFloat(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-orange-500"
            >
              <option value={0} className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">No Offsite Ads Sale (0%)</option>
              <option value={15} className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">Optional Offsite Ads (15% - Shops under $10k/yr)</option>
              <option value={12} className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">Mandatory Offsite Ads (12% - High volume shops over $10k/yr)</option>
            </select>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-orange-200 dark:border-orange-500/30 bg-orange-50/50 dark:bg-gradient-to-b dark:from-[#1c1208] dark:to-[#0c0a06] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">{t('metric.netProfit')}</span>
                <span className={`font-mono text-3xl font-extrabold ${calculations.netProfit > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                  {format(calculations.netProfit)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">{t('metric.profitMargin')}</span>
                <span className={`font-mono text-xl font-bold ${(calculations.netMarginPercent || 0) > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                  {(calculations.netMarginPercent || 0).toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>{t('etsy.listingFee')}</span>
                <span className="font-mono text-slate-900 dark:text-slate-200">-{format(calculations.listingFee)}</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>{t('etsy.transFee')}</span>
                <span className="font-mono text-slate-900 dark:text-slate-200">-{format(calculations.transactionFee)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>{t('etsy.paymentProc')}</span>
                <span className="font-mono text-slate-900 dark:text-slate-200">-{format(calculations.processingFee)}</span>
              </div>
              {offsiteAdsTier > 0 && (
                <div className="flex justify-between text-orange-700 dark:text-orange-400 font-semibold">
                  <span>{t('etsy.offsiteFee')} ({offsiteAdsTier}%)</span>
                  <span className="font-mono">-{format(calculations.offsiteAdsFee)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 border-t border-slate-200 dark:border-white/10 pt-2">
                <span>{t('metric.totalFees')}</span>
                <span className="font-mono text-orange-600 dark:text-orange-400">-{format(calculations.totalEtsyFees)}</span>
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
                className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-orange-600/20"
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
        platform="etsy" 
        lang={lang}
      />

      {/* 2026 Etsy Fee Schedule Reference Table */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {sec.etsyTableTitle}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          {sec.etsyTableDesc}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">{sec.colFeeType}</th>
                <th className="p-3">{sec.colCalcBasis}</th>
                <th className="p-3">{sec.colRateUsd}</th>
                <th className="p-3">{sec.colRequirement}</th>
                <th className="p-3">{sec.colNotes}</th>
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

      {/* Step-by-Step Worked Math Examples */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm space-y-8">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {sec.etsyExamplesTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              {sec.ex1EtsyTitle}
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>{sec.lblSellingPrice}:</strong> $35.00</p>
              <p><strong>{sec.lblShippingCharged}:</strong> $5.00 ($40 Total)</p>
              <p><strong>{sec.lblSourcingCost}:</strong> $8.00</p>
              <p><strong>{sec.lblPostageCost}:</strong> $4.50</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>{t('etsy.listingFee')}: -$0.20</p>
              <p>{sec.lblTransFee}: -$2.60</p>
              <p>{sec.lblPaymentProc}: -$1.45</p>
              <p><strong>{t('metric.totalFees')}: -$4.25</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              {sec.lblEtsyNetProfit}: $23.25 (58.1% {sec.lblMargin})
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              {sec.ex2EtsyTitle}
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>{sec.lblSellingPrice}:</strong> $28.00</p>
              <p><strong>{sec.lblShippingCharged}:</strong> $0.00</p>
              <p><strong>{sec.lblSourcingCost}:</strong> $13.50</p>
              <p><strong>{sec.lblPostageCost}:</strong> $4.50</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>{t('etsy.listingFee')}: -$0.20</p>
              <p>{sec.lblTransFee}: -$1.82</p>
              <p>{sec.lblPaymentProc}: -$1.09</p>
              <p><strong>{t('metric.totalFees')}: -$3.11</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              {sec.lblEtsyNetProfit}: $6.89 (24.6% {sec.lblMargin})
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              {sec.ex3EtsyTitle}
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>{sec.lblSellingPrice}:</strong> $65.00</p>
              <p><strong>{sec.lblShippingCharged}:</strong> $0.00</p>
              <p><strong>{sec.lblSourcingCost}:</strong> $14.00</p>
              <p><strong>{sec.lblPostageCost}:</strong> $3.80</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 text-rose-600 dark:text-rose-400 font-mono">
              <p>{t('etsy.transFee')}: -$6.43</p>
              <p>{sec.lblOffsiteAds} (15%): -$9.75</p>
              <p><strong>{t('metric.totalFees')}: -$16.18</strong></p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              {sec.lblEtsyNetProfit}: $31.02 (47.7% {sec.lblMargin})
            </div>
          </div>

        </div>
      </section>

      {/* Master Etsy Strategy Guide */}
      <article className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-800 dark:text-slate-200 space-y-6 shadow-sm">
        <div className="border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider mb-1">
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

      {/* Cross-Tool Navigation Component */}
      <RelatedTools currentPath="/tools/etsy-fee-calculator" lang={lang} />

      {/* Structured FAQ Section */}
      <FAQSection lang={lang} faqs={faqs} />
    </div>
  );
}
