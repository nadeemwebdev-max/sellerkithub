import React, { useState, useMemo } from 'react';
import { TrendingUp, Copy, Check, RefreshCw, Layers, ShieldCheck, DollarSign, FileSpreadsheet } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { MARKETPLACE_PRESETS, exportToCSV } from '../utils/calculations';
import FAQSection from '../components/FAQSection';
import SEOGuide from '../components/SEOGuide';
import AdPlaceholder from '../components/AdPlaceholder';

export default function AmazonCalculator() {
  const { activeCurrency, format } = useCurrency();
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Form Inputs
  const [sellingPrice, setSellingPrice] = useState(34.99);
  const [itemCost, setItemCost] = useState(9.00);
  const [shippingToAmazon, setShippingToAmazon] = useState(1.50); // freight to FBA warehouse
  const [merchantShippingCost, setMerchantShippingCost] = useState(6.00); // if FBM
  const [referralRate, setReferralRate] = useState(15);
  const [fbaFee, setFbaFee] = useState(3.86);
  const [monthlyStorage, setMonthlyStorage] = useState(0.35);
  const [ppcSpend, setPpcSpend] = useState(3.00);
  const [returnRate, setReturnRate] = useState(4); // 4% returns

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

    // Referral Fee
    const referralFee = price * (refPercent / 100);

    // --- FBA Scenario ---
    const fbaTotalFees = referralFee + (fbaPickPack * activeCurrency.rate) + (storage * activeCurrency.rate);
    const fbaReturnBuffer = (cost + fbaPickPack) * (retRate / 100);
    const fbaTotalCost = cost + prepShip + fbaTotalFees + ppc + fbaReturnBuffer;
    const fbaNetProfit = price - fbaTotalCost;
    const fbaMargin = price > 0 ? (fbaNetProfit / price) * 100 : 0;
    const fbaRoi = fbaTotalCost > 0 ? (fbaNetProfit / fbaTotalCost) * 100 : 0;

    // --- FBM Scenario ---
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
    const text = `Amazon FBA vs FBM Profit Analysis:
Selling Price: ${format(sellingPrice)} | Sourcing Cost: ${format(itemCost)}
Referral Fee (${referralRate}%): ${format(calculations.referralFee)}
--------------------------------
AMAZON FBA (Prime Fulfillment):
- Net Profit: ${format(calculations.fba.netProfit)}
- Margin: ${calculations.fba.margin.toFixed(2)}% | ROI: ${calculations.fba.roi.toFixed(1)}%

AMAZON FBM (Merchant Fulfilled):
- Net Profit: ${format(calculations.fbm.netProfit)}
- Margin: ${calculations.fbm.margin.toFixed(2)}% | ROI: ${calculations.fbm.roi.toFixed(1)}%
Calculated via SellerKit.tools`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What is the difference between Amazon FBA and FBM?",
      answer: "FBA (Fulfillment by Amazon) means Amazon stores, picks, packs, ships your product, and provides Prime badge delivery. FBM (Fulfillment by Merchant) means you store and ship orders directly to customers from your own facility."
    },
    {
      question: "How much does Amazon FBA take per sale?",
      answer: "Amazon typically takes: 1) A referral fee (usually 15% across most categories), 2) An FBA fulfillment fee ($3.40 to $6.10+ depending on size and weight), and 3) Monthly inventory storage fees ($0.78 to $2.40 per cubic foot)."
    },
    {
      question: "What is Amazon's Referral Fee for my category?",
      answer: "Referral fees vary by category: Consumer Electronics are 8%, Apparel is 17%, Jewelry is 20%, Books are 15%, and most other categories are 15%."
    },
    {
      question: "How does Q4 holiday storage affect Amazon profit?",
      answer: "From October to December, Amazon increases monthly storage fees by over 3x (from approx $0.87/cu ft to $2.40/cu ft). Slow-moving inventory can quickly drain Q4 margins."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold border border-amber-200 dark:border-amber-500/20 mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Amazon FBA vs FBM Side-by-Side Comparison</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Free <span className="text-amber-600 dark:text-amber-400">Amazon FBA</span> & Profit Calculator
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Accurately calculate category referral commissions, FBA weight-tier fulfillment costs, and compare FBA vs. FBM profit margins.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Inputs (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-5 shadow-xl dark:shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Product & Logistics Settings
            </h2>
            <button
              onClick={() => {
                setSellingPrice(34.99);
                setItemCost(9.00);
                setShippingToAmazon(1.50);
                setPpcSpend(3.00);
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
                Amazon Buy Box Price ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={sellingPrice || ''}
                onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Unit Manufacturing / Sourcing Cost ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={itemCost || ''}
                onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Amazon Product Category
              </label>
              <select
                value={referralRate}
                onChange={(e) => setReferralRate(parseFloat(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#090d16] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              >
                {MARKETPLACE_PRESETS.amazon.categories.map((c, i) => (
                  <option key={i} value={c.rate}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                FBA Item Sizing Tier (Pick & Pack Fee)
              </label>
              <select
                value={fbaFee}
                onChange={(e) => setFbaFee(parseFloat(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#090d16] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              >
                {MARKETPLACE_PRESETS.amazon.fbaTiers.map((tier, i) => (
                  <option key={i} value={tier.fee}>
                    {tier.name} ({format(tier.fee * activeCurrency.rate)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Inbound Shipping to FBA Warehouse ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={shippingToAmazon || ''}
                onChange={(e) => setShippingToAmazon(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                FBM Merchant Shipping to Customer ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={merchantShippingCost || ''}
                onChange={(e) => setMerchantShippingCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                PPC Ad Spend Per Sale ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={ppcSpend || ''}
                onChange={(e) => setPpcSpend(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Monthly Storage / Unit ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={monthlyStorage || ''}
                onChange={(e) => setMonthlyStorage(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Side by Side Comparison Results (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* FBA Card */}
          <div className="rounded-2xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/50 dark:bg-gradient-to-b dark:from-[#1c160e] dark:to-[#0c0a07] p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                Amazon FBA (Prime)
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                {calculations.fba.margin.toFixed(1)}% Margin
              </span>
            </div>
            
            <div className="flex items-baseline justify-between border-b border-amber-200 dark:border-white/10 pb-3">
              <span className="text-xs text-slate-600 dark:text-slate-400">Net Profit / Unit</span>
              <span className="font-mono text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">
                {format(calculations.fba.netProfit)}
              </span>
            </div>

            <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Referral Fee ({referralRate}%)</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-{format(calculations.referralFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>FBA Pick & Pack Fee</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-{format(fbaFee * activeCurrency.rate)}</span>
              </div>
              <div className="flex justify-between font-medium text-slate-900 dark:text-slate-200">
                <span>Total Unit Cost & Expenses</span>
                <span className="font-mono">{format(calculations.fba.totalCost)}</span>
              </div>
            </div>
          </div>

          {/* FBM Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300">
                Amazon FBM (Merchant Ships)
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300">
                {calculations.fbm.margin.toFixed(1)}% Margin
              </span>
            </div>
            
            <div className="flex items-baseline justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <span className="text-xs text-slate-600 dark:text-slate-400">Net Profit / Unit</span>
              <span className="font-mono text-2xl font-bold text-slate-900 dark:text-white">
                {format(calculations.fbm.netProfit)}
              </span>
            </div>

            <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Merchant Shipping</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-{format(merchantShippingCost)}</span>
              </div>
              <div className="flex justify-between font-medium text-slate-900 dark:text-slate-200">
                <span>Total Unit Expenses</span>
                <span className="font-mono">{format(calculations.fbm.totalCost)}</span>
              </div>
            </div>
          </div>

          {/* Copy & Excel Download Actions */}
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
              className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-amber-500/20"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>
          </div>

          <AdPlaceholder slot="vertical" />

        </div>

      </div>

      <AdPlaceholder slot="horizontal" />

      <SEOGuide
        title="Complete Guide to Amazon FBA Fees, Size Tiers & Profit Optimization"
        subtitle="How to price products profitably on Amazon Seller Central and protect against storage fees."
        formula="Amazon FBA Net Profit = Selling Price - (Sourcing Cost + Inbound Freight + Category Referral Fee + FBA Pick & Pack Fee + Monthly Storage + PPC Advertising + Return Buffer)"
        steps={[
          {
            title: "1. Optimize Packaging Dimensions",
            description: "Reducing a package by just 0.5 inches can drop your product from 'Large Standard' to 'Small Standard', saving $2.00+ per unit in FBA fees."
          },
          {
            title: "2. Monitor Storage Limits",
            description: "Do not send more than 60–90 days of inventory to avoid aged inventory surcharges."
          },
          {
            title: "3. Target 3x Sourcing Rule",
            description: "If an item costs $10 to manufacture, aim to sell it on Amazon for at least $30 to cover all FBA fees, advertising, and net 25% profit."
          }
        ]}
        tips={[
          "Compare FBA vs FBM for bulky/heavy items—oversized products are often much cheaper to ship via merchant carriers like UPS/FedEx ground than Amazon FBA.",
          "Use high quality 1000x1000px pure white background images generated with our Product Image Padder to comply with Amazon listing standards."
        ]}
      />

      <FAQSection title="Amazon Seller & FBA FAQs" faqs={faqs} />

    </div>
  );
}
