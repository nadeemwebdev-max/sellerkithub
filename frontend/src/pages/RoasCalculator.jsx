import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Percent, 
  HelpCircle, 
  Copy, 
  Check, 
  RefreshCw, 
  Sparkles,
  BarChart3,
  BookOpen,
  Lightbulb,
  Target,
  FileSpreadsheet,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { exportToCSV } from '../utils/calculations';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';

export default function RoasCalculator() {
  const { activeCurrency, format } = useCurrency();
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Form Inputs
  const [monthlyAdSpend, setMonthlyAdSpend] = useState(1500);
  const [adRevenue, setAdRevenue] = useState(6000);
  const [unitCost, setUnitCost] = useState(12.00);
  const [unitSellingPrice, setUnitSellingPrice] = useState(39.99);
  const [platformFeePct, setPlatformFeePct] = useState(15); // Amazon/Marketplace Referral %
  const [shippingCost, setShippingCost] = useState(4.50);
  const [totalOrders, setTotalOrders] = useState(150);

  // Calculations
  const result = useMemo(() => {
    const spend = Number(monthlyAdSpend) || 0;
    const rev = Number(adRevenue) || 0;
    const cost = Number(unitCost) || 0;
    const price = Number(unitSellingPrice) || 0;
    const feePct = Number(platformFeePct) || 0;
    const ship = Number(shippingCost) || 0;
    const orders = Number(totalOrders) || 1;

    // Realized ROAS = Revenue / Ad Spend
    const realisedRoasRatio = spend > 0 ? rev / spend : 0;
    const realisedRoasPct = realisedRoasRatio * 100;

    // Unit Gross Margin Before Ads
    const feePerUnit = price * (feePct / 100);
    const unitTotalCostBeforeAds = cost + feePerUnit + ship;
    const unitGrossProfitBeforeAds = price - unitTotalCostBeforeAds;
    const unitGrossMarginPct = price > 0 ? (unitGrossProfitBeforeAds / price) * 100 : 0;

    // Break-Even ROAS = 1 / Gross Margin %
    const breakEvenRoasRatio = unitGrossMarginPct > 0 ? 1 / (unitGrossMarginPct / 100) : 0;

    // Total Portfolio Math
    const totalCOGS = orders * cost;
    const totalFees = orders * feePerUnit;
    const totalShipping = orders * ship;
    const totalExpenses = totalCOGS + totalFees + totalShipping + spend;
    const netAdProfit = rev - totalExpenses;
    const netMarginPct = rev > 0 ? (netAdProfit / rev) * 100 : 0;

    // Customer Acquisition Cost (CAC) & Profit On Ad Spend (POAS)
    const cac = orders > 0 ? spend / orders : 0;
    const poasRatio = spend > 0 ? netAdProfit / spend : 0;

    return {
      realisedRoasRatio,
      realisedRoasPct,
      unitGrossMarginPct,
      breakEvenRoasRatio,
      totalCOGS,
      totalFees,
      totalShipping,
      totalExpenses,
      netAdProfit,
      netMarginPct,
      cac,
      poasRatio,
      isProfitable: netAdProfit > 0
    };
  }, [monthlyAdSpend, adRevenue, unitCost, unitSellingPrice, platformFeePct, shippingCost, totalOrders]);

  const handleDownloadCSV = () => {
    let csv = `Metric,Value (${activeCurrency.code})\n`;
    csv += `"Monthly Ad Spend","${monthlyAdSpend}"\n`;
    csv += `"Attributed Ad Revenue","${adRevenue}"\n`;
    csv += `"Realized ROAS","${result.realisedRoasRatio.toFixed(2)}x (${result.realisedRoasPct.toFixed(1)}%)"\n`;
    csv += `"Break-Even ROAS Required","${result.breakEvenRoasRatio.toFixed(2)}x"\n`;
    csv += `"Unit Gross Margin %","${result.unitGrossMarginPct.toFixed(2)}%"\n`;
    csv += `"Customer Acquisition Cost (CAC)","${result.cac.toFixed(2)}"\n`;
    csv += `"Profit On Ad Spend (POAS)","${result.poasRatio.toFixed(2)}x"\n`;
    csv += `"Total Expenses (COGS+Fees+Ship+Ads)","${result.totalExpenses.toFixed(2)}"\n`;
    csv += `"NET AD PROFIT","${result.netAdProfit.toFixed(2)}"\n`;
    csv += `"NET MARGIN %","${result.netMarginPct.toFixed(2)}%"\n`;

    exportToCSV(`roas-profitability-breakdown`, csv);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const copySummary = () => {
    const text = `ROAS & Ad Profitability Breakdown:\nRealized ROAS: ${result.realisedRoasRatio.toFixed(2)}x | Break-Even ROAS Required: ${result.breakEvenRoasRatio.toFixed(2)}x\nMonthly Ad Spend: ${format(monthlyAdSpend)} | Attributed Ad Revenue: ${format(adRevenue)}\nNet Ad Profit: ${format(result.netAdProfit)} (${result.netMarginPct.toFixed(1)}% Net Margin)\nCalculated via SellerKitHub.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What is ROAS (Return On Ad Spend) and how is it calculated?",
      answer: "ROAS (Return On Ad Spend) measures the total gross revenue generated for every dollar spent on advertising. The formula is: ROAS = Attributed Ad Revenue / Total Ad Spend. For example, generating $6,000 in revenue from $1,500 ad spend produces a 4.0x ROAS (or 400%)."
    },
    {
      question: "What is Break-Even ROAS and why is it critical for e-commerce PPC?",
      answer: "Break-Even ROAS is the minimum ROAS multiplier required for your advertising campaigns to cover product sourcing (COGS), marketplace referral fees, payment processing, and shipping costs without incurring a net financial loss. It is calculated as: Break-Even ROAS = 1 / Gross Margin Percentage."
    },
    {
      question: "What is the difference between ROAS and POAS (Profit On Ad Spend)?",
      answer: "ROAS compares gross top-line revenue against ad spend, ignoring inventory manufacturing costs and fulfillment fees. POAS (Profit On Ad Spend) compares net bottom-line profit against ad spend (POAS = Net Profit / Ad Spend). POAS is a far superior metric because a campaign can have a high 3.0x ROAS but still be losing money if gross margins are under 33%."
    },
    {
      question: "How do I calculate Customer Acquisition Cost (CAC)?",
      answer: "Customer Acquisition Cost (CAC) is calculated by dividing total advertising spend by the number of orders or new customers acquired (CAC = Total Ad Spend / Total Orders). Comparing your CAC against Customer Lifetime Value (LTV) or Average Order Value (AOV) determines long-term campaign viability."
    },
    {
      question: "What is considered a good target ROAS for Meta, Google Shopping, and Amazon PPC?",
      answer: "Target ROAS depends directly on your gross profit margins. For high-margin goods (70%+ margin), a 2.0x to 2.5x ROAS is highly profitable. For lower-margin retail goods (35% margin), you require a minimum 3.0x to 4.0x ROAS to achieve positive cash flow."
    },
    {
      question: "Why can a campaign with a high 4x ROAS still operate at a financial loss?",
      answer: "If your item gross margin before advertising is 20% (due to heavy COGS and 15% marketplace referral fees), your Break-Even ROAS is 1 / 0.20 = 5.0x. Achieving a 4.0x ROAS means you lose money on every ad-driven sale despite high gross ad revenue."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
          <Target className="w-3.5 h-3.5" />
          <span>Target & Break-Even ROAS Financial Engine</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          E-Commerce <span className="text-brand-600 dark:text-brand-400">ROAS & Ad Profitability</span> Calculator
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Calculate your Break-Even ROAS, Realized ROAS, Customer Acquisition Cost (CAC), and Net Profit on Meta Ads, Google Shopping, Amazon PPC, and TikTok Ads.
        </p>
      </div>

      {/* KPI Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Realized ROAS</span>
          <span className="font-mono text-xl sm:text-2xl font-extrabold text-brand-600 dark:text-brand-400 block mt-1">
            {result.realisedRoasRatio.toFixed(2)}x
          </span>
          <span className="text-[11px] text-slate-500 font-mono">({result.realisedRoasPct.toFixed(0)}% Return)</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Break-Even ROAS</span>
          <span className="font-mono text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-amber-400 block mt-1">
            {result.breakEvenRoasRatio.toFixed(2)}x
          </span>
          <span className="text-[11px] text-slate-500">Min. Ratio Needed</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Acquisition Cost (CAC)</span>
          <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white block mt-1">
            {format(result.cac)}
          </span>
          <span className="text-[11px] text-slate-500">Per Order Acquired</span>
        </div>

        <div className={`p-4 rounded-xl border shadow-sm ${
          result.isProfitable 
            ? 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-500/10' 
            : 'border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/10'
        }`}>
          <span className={`text-[10px] font-bold uppercase tracking-wider block ${
            result.isProfitable ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'
          }`}>
            Net Ad Profit
          </span>
          <span className={`font-mono text-xl sm:text-2xl font-extrabold block mt-1 ${
            result.isProfitable ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
          }`}>
            {format(result.netAdProfit)}
          </span>
          <span className={`text-[11px] font-bold block ${
            result.isProfitable ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'
          }`}>
            {result.netMarginPct.toFixed(1)}% Net Margin
          </span>
        </div>
      </div>

      {/* Main Form & Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Form Inputs */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Ad Campaign & Product Parameters
            </h2>
            <button
              onClick={() => {
                setMonthlyAdSpend(1500);
                setAdRevenue(6000);
                setUnitCost(12.00);
                setUnitSellingPrice(39.99);
                setPlatformFeePct(15);
                setShippingCost(4.50);
                setTotalOrders(150);
              }}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-brand-600 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="roas-ad-spend" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Monthly Ad Spend ({activeCurrency.symbol})
              </label>
              <input
                id="roas-ad-spend"
                aria-label={`Monthly Ad Spend in ${activeCurrency.symbol}`}
                type="number"
                value={monthlyAdSpend}
                onChange={(e) => setMonthlyAdSpend(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label htmlFor="roas-ad-revenue" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Attributed Ad Revenue ({activeCurrency.symbol})
              </label>
              <input
                id="roas-ad-revenue"
                aria-label={`Attributed Ad Revenue in ${activeCurrency.symbol}`}
                type="number"
                value={adRevenue}
                onChange={(e) => setAdRevenue(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="roas-unit-price" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Unit Selling Price ({activeCurrency.symbol})
              </label>
              <input
                id="roas-unit-price"
                aria-label={`Unit Selling Price in ${activeCurrency.symbol}`}
                type="number"
                value={unitSellingPrice}
                onChange={(e) => setUnitSellingPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label htmlFor="roas-unit-cost" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Unit Sourcing Cost ({activeCurrency.symbol})
              </label>
              <input
                id="roas-unit-cost"
                aria-label={`Unit Sourcing Cost in ${activeCurrency.symbol}`}
                type="number"
                value={unitCost}
                onChange={(e) => setUnitCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="roas-platform-fee" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Platform Fee %
              </label>
              <input
                id="roas-platform-fee"
                aria-label="Platform Fee percentage"
                type="number"
                value={platformFeePct}
                onChange={(e) => setPlatformFeePct(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label htmlFor="roas-shipping-cost" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Postage/Unit ({activeCurrency.symbol})
              </label>
              <input
                id="roas-shipping-cost"
                aria-label={`Postage per unit in ${activeCurrency.symbol}`}
                type="number"
                value={shippingCost}
                onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Total Orders
              </label>
              <input
                type="number"
                value={totalOrders}
                onChange={(e) => setTotalOrders(parseInt(e.target.value, 10) || 1)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleDownloadCSV}
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              {downloaded ? <Check className="w-4 h-4" /> : <FileSpreadsheet className="w-4 h-4" />}
              <span>Download CSV</span>
            </button>

            <button
              onClick={copySummary}
              className="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>Copy Breakdown</span>
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-3">
            Financial Ad Profitability Health
          </h2>

          {/* ROAS Gauge Comparison */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">ROAS Status vs Break-Even Threshold</span>
              <span className="font-mono font-bold text-brand-600">{result.realisedRoasRatio.toFixed(2)}x / {result.breakEvenRoasRatio.toFixed(2)}x Target</span>
            </div>
            
            <div className="w-full h-4 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden relative">
              <div 
                className={`h-full transition-all duration-500 ${
                  result.realisedRoasRatio >= result.breakEvenRoasRatio ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, (result.realisedRoasRatio / (result.breakEvenRoasRatio * 1.5)) * 100)}%` }}
              />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              {result.realisedRoasRatio >= result.breakEvenRoasRatio ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  ✓ Highly Profitable: Your ROAS of {result.realisedRoasRatio.toFixed(2)}x exceeds the break-even threshold of {result.breakEvenRoasRatio.toFixed(2)}x.
                </span>
              ) : (
                <span className="text-rose-600 dark:text-rose-400 font-bold">
                  ⚠ Unprofitable PPC: Your ROAS of {result.realisedRoasRatio.toFixed(2)}x is below your required break-even ROAS of {result.breakEvenRoasRatio.toFixed(2)}x.
                </span>
              )}
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-200 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Gross Attributed Revenue</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{format(adRevenue)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Total Sourcing COGS ({totalOrders} units)</span>
              <span className="font-mono text-rose-600 dark:text-rose-400">-{format(result.totalCOGS)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Platform Referral Fees ({platformFeePct}%)</span>
              <span className="font-mono text-rose-600 dark:text-rose-400">-{format(result.totalFees)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Shipping & Postage</span>
              <span className="font-mono text-rose-600 dark:text-rose-400">-{format(result.totalShipping)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Ad Spend (PPC Budget)</span>
              <span className="font-mono text-rose-600 dark:text-rose-400">-{format(monthlyAdSpend)}</span>
            </div>
            <div className="flex justify-between py-2 pt-3 font-bold text-sm">
              <span className="text-slate-900 dark:text-white">Net Take-Home Ad Profit</span>
              <span className={`font-mono ${result.isProfitable ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {format(result.netAdProfit)}
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Author Bio Component */}
      <AuthorBio 
        authorName="SellerKit Ad Analytics & PPC Engineering Team"
        authorRole="Paid Traffic & ROAS Financial Modeling Specialists"
        lastUpdated="2026 Ad Platform Benchmarks Verified"
        category="Advertising & ROAS Financial Optimization"
      />

      {/* Recommended Seller Tools */}
      <AffiliateCTA 
        platform="amazon" 
        title="Recommended PPC & Keyword Automation Tools" 
        description="Automate Amazon PPC keyword bids and optimize Meta ad ROAS with AI."
      />

      {/* 2026 Ad Platform Benchmark Matrix */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            2026 E-Commerce Ad Platform Benchmark Matrix
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          Standard ROAS benchmarks, average CPC, and conversion rates across major e-commerce ad channels.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">Ad Platform</th>
                <th className="p-3">Average CPC ($)</th>
                <th className="p-3">Avg Conversion Rate %</th>
                <th className="p-3">Healthy Target ROAS</th>
                <th className="p-3">Best E-Commerce Intent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Amazon PPC (Sponsored Products)</td>
                <td className="p-3 font-mono text-brand-600">$0.85 - $1.65</td>
                <td className="p-3 font-mono font-bold text-emerald-600">9.5% - 14.0%</td>
                <td className="p-3 font-mono">3.0x - 4.5x</td>
                <td className="p-3">High Purchase Intent Search</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Google Shopping (PMax)</td>
                <td className="p-3 font-mono text-brand-600">$0.65 - $1.40</td>
                <td className="p-3 font-mono">2.5% - 4.2%</td>
                <td className="p-3 font-mono">3.5x - 5.0x</td>
                <td className="p-3">High Intent Visual Product Search</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Meta Advantage+ (FB/IG)</td>
                <td className="p-3 font-mono text-brand-600">$0.95 - $2.10</td>
                <td className="p-3 font-mono">1.8% - 3.2%</td>
                <td className="p-3 font-mono">2.2x - 3.5x</td>
                <td className="p-3">Impulse Buying & Visual Discovery</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">TikTok Shop Ads</td>
                <td className="p-3 font-mono text-brand-600">$0.45 - $1.10</td>
                <td className="p-3 font-mono">1.5% - 2.8%</td>
                <td className="p-3 font-mono">2.0x - 3.2x</td>
                <td className="p-3">Viral Video & Gen-Z Commerce</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Step-by-Step Worked Scenarios */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm space-y-8">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Worked Step-by-Step ROAS Calculation Scenarios
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Scenario 1: Amazon FBA PPC Campaign
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Ad Spend:</strong> $1,000.<br />
              <strong>Revenue:</strong> $4,000 (4.0x ROAS).<br />
              <strong>Gross Margin %:</strong> 30% (Break-Even ROAS = 3.33x).<br />
              <strong>Result:</strong> Realized ROAS (4.0x) &gt; Break-Even (3.33x) = Net Profit +$260.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Scenario 2: Shopify Meta Ads Scaling
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Ad Spend:</strong> $5,000.<br />
              <strong>Revenue:</strong> $15,000 (3.0x ROAS).<br />
              <strong>Gross Margin %:</strong> 70% (Break-Even ROAS = 1.43x).<br />
              <strong>Result:</strong> High gross margin yields $5,500 net profit after ad spend.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Scenario 3: Unprofitable High-ROAS Trap
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Ad Spend:</strong> $2,000.<br />
              <strong>Revenue:</strong> $6,000 (3.0x ROAS).<br />
              <strong>Gross Margin %:</strong> 25% (Break-Even ROAS = 4.00x).<br />
              <strong>Result:</strong> Despite 3x ROAS, campaign loses -$500 due to thin margin.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Scenario 4: High-Ticket Dropshipping
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Ad Spend:</strong> $3,000.<br />
              <strong>Revenue:</strong> $12,000 (4.0x ROAS).<br />
              <strong>CAC:</strong> $75 per order.<br />
              <strong>Result:</strong> Generates $3,600 net profit across 40 orders.
            </p>
          </div>

        </div>
      </section>

      {/* Structured FAQ Section */}
      <FAQSection title="Target & Break-Even ROAS FAQs" faqs={faqs} />
    </div>
  );
}
