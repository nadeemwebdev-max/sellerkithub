import React, { useState, useMemo } from 'react';
import { 
  Percent, 
  DollarSign, 
  HelpCircle, 
  Copy, 
  Check, 
  RefreshCw, 
  Sparkles,
  BarChart3,
  BookOpen,
  Lightbulb,
  FileSpreadsheet,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { exportToCSV } from '../utils/calculations';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';

export default function GstCalculator() {
  const { activeCurrency, format } = useCurrency();
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Form Inputs
  const [calculationMode, setCalculationMode] = useState('exclusive'); // 'exclusive' (Add GST) or 'inclusive' (Extract GST)
  const [amount, setAmount] = useState(1000);
  const [gstRate, setGstRate] = useState(18); // 5, 12, 18, 28, or custom
  const [transactionType, setTransactionType] = useState('intrastate'); // 'intrastate' (CGST+SGST) or 'interstate' (IGST)

  const standardSlabs = [0, 5, 12, 18, 28];

  // Calculation Math
  const result = useMemo(() => {
    const rawAmount = Number(amount) || 0;
    const rate = Number(gstRate) || 0;

    let netBasePrice = 0;
    let gstAmount = 0;
    let grossTotalPrice = 0;

    if (calculationMode === 'exclusive') {
      // Add GST to Net Base Amount
      netBasePrice = rawAmount;
      gstAmount = rawAmount * (rate / 100);
      grossTotalPrice = rawAmount + gstAmount;
    } else {
      // Extract GST from Gross Amount
      // Base = Gross / (1 + Rate/100)
      grossTotalPrice = rawAmount;
      netBasePrice = rawAmount / (1 + (rate / 100));
      gstAmount = grossTotalPrice - netBasePrice;
    }

    // Split CGST / SGST / IGST
    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (transactionType === 'intrastate') {
      cgst = gstAmount / 2;
      sgst = gstAmount / 2;
    } else {
      igst = gstAmount;
    }

    return {
      netBasePrice,
      gstAmount,
      grossTotalPrice,
      cgst,
      sgst,
      igst,
      rate
    };
  }, [amount, gstRate, calculationMode, transactionType]);

  const handleDownloadCSV = () => {
    let csv = `Metric,Value (${activeCurrency.code})\n`;
    csv += `"Calculation Mode","${calculationMode === 'exclusive' ? 'GST Exclusive (Add GST)' : 'GST Inclusive (Remove GST)'}"\n`;
    csv += `"Input Amount","${amount}"\n`;
    csv += `"GST Tax Rate","${gstRate}%"\n`;
    csv += `"Transaction Type","${transactionType.toUpperCase()}"\n`;
    csv += `"Net Base Price (Without GST)","${result.netBasePrice.toFixed(2)}"\n`;
    csv += `"Total GST Amount","${result.gstAmount.toFixed(2)}"\n`;
    if (transactionType === 'intrastate') {
      csv += `"CGST (50%)","${result.cgst.toFixed(2)}"\n`;
      csv += `"SGST (50%)","${result.sgst.toFixed(2)}"\n`;
    } else {
      csv += `"IGST (100%)","${result.igst.toFixed(2)}"\n`;
    }
    csv += `"Gross Total Invoice Price","${result.grossTotalPrice.toFixed(2)}"\n`;

    exportToCSV(`gst-sales-tax-breakdown`, csv);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const copySummary = () => {
    let taxText = transactionType === 'intrastate' 
      ? `CGST: ${format(result.cgst)} | SGST: ${format(result.sgst)}` 
      : `IGST: ${format(result.igst)}`;

    const text = `GST / Sales Tax Invoice Breakdown (${gstRate}% Rate):\nNet Base Price: ${format(result.netBasePrice)}\nGST Tax Amount: ${format(result.gstAmount)} (${taxText})\nGross Total Price: ${format(result.grossTotalPrice)}\nCalculated via SellerKitHub.com`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What is the difference between GST Exclusive and GST Inclusive calculations?",
      answer: "GST Exclusive means the entered amount is the net base price before tax, and GST is added on top (Base + GST = Total). GST Inclusive means the entered amount is the final gross price containing tax, and GST is extracted backwards (Base = Gross / (1 + Rate/100))."
    },
    {
      question: "How are CGST, SGST, and IGST divided on e-commerce sales invoices?",
      answer: "For Intrastate sales (buyer and seller in the same state), GST is split equally between CGST (Central GST) 50% and SGST (State GST) 50%. For Interstate sales (buyer and seller in different states), the full tax amount is billed under IGST (Integrated GST) 100%."
    },
    {
      question: "What are the primary GST rate slabs for physical e-commerce goods?",
      answer: "Standard Indian & Global GST/VAT slabs include: 0% (essential foods, books), 5% (apparel under $15, basic items), 12% (processed foods, home goods), 18% (electronics, cosmetics, services, default rate), and 28% (luxury goods, motor vehicles)."
    },
    {
      question: "What is TCS (Tax Collected at Source) for e-commerce marketplace sellers?",
      answer: "Marketplaces like Amazon, Flipkart, Meesho, and Myntra are mandated to deduct 1% TCS (0.5% CGST + 0.5% SGST) from the net value of taxable supplies made through their platform before remitting payments to sellers."
    },
    {
      question: "How do I calculate net base price from a GST-inclusive invoice total?",
      answer: "Use the formula: Net Base Price = Gross Invoice Price / (1 + GST Rate / 100). For example, if a product is sold for $1,180 inclusive of 18% GST, calculate $1,180 / 1.18 = $1,000 Net Base Price, with $180 being the GST amount."
    },
    {
      question: "Is input tax credit (ITC) claimable on e-commerce seller fees?",
      answer: "Yes! Registered e-commerce sellers can claim Input Tax Credit (ITC) on the GST charged by platforms for referral fees, FBA fulfillment services, inventory storage, and advertising costs against their output GST liability."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
          <Building2 className="w-3.5 h-3.5" />
          <span>GST, VAT & Sales Tax Calculation Suite</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          GST & Sales Tax <span className="text-brand-600 dark:text-brand-400">Inclusive / Exclusive</span> Calculator
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Calculate GST Inclusive and Exclusive net prices, CGST, SGST, IGST tax splits, and export billing spreadsheets for e-commerce invoices.
        </p>
      </div>

      {/* Mode Switcher Banner */}
      <div className="flex justify-center mb-8">
        <div className="p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 inline-flex gap-1">
          <button
            onClick={() => setCalculationMode('exclusive')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              calculationMode === 'exclusive'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            GST Exclusive (Add Tax to Base)
          </button>
          <button
            onClick={() => setCalculationMode('inclusive')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              calculationMode === 'inclusive'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            GST Inclusive (Extract Tax from Total)
          </button>
        </div>
      </div>

      {/* KPI Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Net Base Price</span>
          <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white block mt-1">
            {format(result.netBasePrice)}
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400">Price Before Tax</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Total GST Tax ({gstRate}%)</span>
          <span className="font-mono text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-amber-400 block mt-1">
            {format(result.gstAmount)}
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400">Tax Payable</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Tax Breakdown</span>
          <span className="font-mono text-sm sm:text-base font-bold text-brand-600 dark:text-brand-400 block mt-1">
            {transactionType === 'intrastate' 
              ? `CGST: ${format(result.cgst)}` 
              : `IGST: ${format(result.igst)}`}
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400">
            {transactionType === 'intrastate' ? `SGST: ${format(result.sgst)}` : 'Interstate 100%'}
          </span>
        </div>

        <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-500/10 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">Gross Total Invoice Price</span>
          <span className="font-mono text-xl sm:text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 block mt-1">
            {format(result.grossTotalPrice)}
          </span>
          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">Final Billing Amount</span>
        </div>
      </div>

      {/* Main Interactive Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Invoice Amount & Rate Selection
            </h2>
            <button
              onClick={() => {
                setAmount(1000);
                setGstRate(18);
                setCalculationMode('exclusive');
                setTransactionType('intrastate');
              }}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-brand-600 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div>
            <label htmlFor="gst-amount" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Enter Amount ({activeCurrency.symbol})
            </label>
            <input
              id="gst-amount"
              aria-label={`Enter Amount in ${activeCurrency.symbol}`}
              type="number"
              value={amount || ''}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-lg font-bold focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Select GST Rate Slab
            </label>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {standardSlabs.map(slab => (
                <button
                  key={slab}
                  onClick={() => setGstRate(slab)}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold transition ${
                    gstRate === slab
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  {slab}%
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="gst-custom-rate" className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Custom Rate %:</label>
              <input
                id="gst-custom-rate"
                aria-label="Custom GST Rate percentage"
                type="number"
                value={gstRate}
                onChange={(e) => setGstRate(parseFloat(e.target.value) || 0)}
                className="w-24 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-xs text-center"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Transaction State Supply Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTransactionType('intrastate')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition ${
                  transactionType === 'intrastate'
                    ? 'border-brand-500 bg-brand-500/10 text-brand-700 dark:text-brand-400 font-bold'
                    : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                Intrastate (CGST 50% + SGST 50%)
              </button>

              <button
                type="button"
                onClick={() => setTransactionType('interstate')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition ${
                  transactionType === 'interstate'
                    ? 'border-brand-500 bg-brand-500/10 text-brand-700 dark:text-brand-400 font-bold'
                    : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                Interstate (IGST 100%)
              </button>
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
              <span>Copy Tax Invoice</span>
            </button>
          </div>
        </div>

        {/* Invoice Summary Output */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-3">
            Itemized GST Tax Invoice Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-200 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Calculation Mode</span>
              <span className="font-bold text-brand-600 dark:text-brand-400">
                {calculationMode === 'exclusive' ? 'GST Exclusive (+Tax Added)' : 'GST Inclusive (Tax Extracted)'}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-200 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Net Base Selling Price</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{format(result.netBasePrice)}</span>
            </div>

            {transactionType === 'intrastate' ? (
              <>
                <div className="flex justify-between py-2 border-b border-slate-200 dark:border-white/5">
                  <span className="text-slate-600 dark:text-slate-400">Central GST (CGST @ {(gstRate/2).toFixed(1)}%)</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400">+{format(result.cgst)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200 dark:border-white/5">
                  <span className="text-slate-600 dark:text-slate-400">State GST (SGST @ {(gstRate/2).toFixed(1)}%)</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400">+{format(result.sgst)}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between py-2 border-b border-slate-200 dark:border-white/5">
                <span className="text-slate-600 dark:text-slate-400">Integrated GST (IGST @ {gstRate}%)</span>
                <span className="font-mono text-amber-600 dark:text-amber-400">+{format(result.igst)}</span>
              </div>
            )}

            <div className="flex justify-between py-2 border-b border-slate-200 dark:border-white/5 font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Total Tax Payable</span>
              <span className="font-mono text-amber-600 dark:text-amber-400">{format(result.gstAmount)}</span>
            </div>

            <div className="flex justify-between py-3 font-bold text-sm bg-brand-50/50 dark:bg-brand-500/10 p-3 rounded-xl border border-brand-200 dark:border-brand-500/20">
              <span className="text-slate-900 dark:text-white">Gross Total Invoice Amount</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400">{format(result.grossTotalPrice)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Author Bio Component */}
      <AuthorBio 
        authorName="SellerKit E-Commerce Tax & HSN Engineering Team"
        authorRole="E-Commerce Tax Policy & GST Compliance Specialists"
        lastUpdated="2026 E-Commerce Tax Slabs Verified"
        category="GST & Tax Accounting Strategy"
      />

      {/* Recommended Seller Tools */}
      <AffiliateCTA 
        platform="general" 
        title="Recommended Tax & Invoicing Software" 
        description="Automate GST e-invoicing and sync tax filings with QuickBooks and Tally."
      />

      {/* 2026 GST Slabs Matrix */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            E-Commerce GST Rate Slabs & HSN Reference Table
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          Standard GST rate slabs applicable to physical product categories sold on Amazon, Etsy, and Shopify.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">GST Rate</th>
                <th className="p-3">Product Categories & HSN Items</th>
                <th className="p-3">Input Tax Credit (ITC)</th>
                <th className="p-3">Tax Component Breakdown</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-mono font-bold text-brand-600">0% GST</td>
                <td className="p-3">Printed books, unbranded food grains, natural handicraft items.</td>
                <td className="p-3 text-slate-500">Exempt / Zero-rated</td>
                <td className="p-3 font-mono">0% CGST + 0% SGST</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-brand-600">5% GST</td>
                <td className="p-3">Apparel priced under $15 / ₹1000, footwear, packaged foods.</td>
                <td className="p-3 font-bold text-emerald-600">Fully Eligible</td>
                <td className="p-3 font-mono">2.5% CGST + 2.5% SGST</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-brand-600">12% GST</td>
                <td className="p-3">Apparel priced over $15 / ₹1000, wooden furniture, artwork.</td>
                <td className="p-3 font-bold text-emerald-600">Fully Eligible</td>
                <td className="p-3 font-mono">6.0% CGST + 6.0% SGST</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-brand-600">18% GST</td>
                <td className="p-3">Electronics, cosmetics, leather accessories, software, seller platform fees.</td>
                <td className="p-3 font-bold text-emerald-600">Fully Eligible</td>
                <td className="p-3 font-mono">9.0% CGST + 9.0% SGST</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-brand-600">28% GST</td>
                <td className="p-3">Luxury goods, automobiles, premium electronics, gaming hardware.</td>
                <td className="p-3 font-bold text-emerald-600">Fully Eligible</td>
                <td className="p-3 font-mono">14.0% CGST + 14.0% SGST</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Structured FAQ Section */}
      <FAQSection title="GST & Sales Tax Calculation FAQs" faqs={faqs} />
    </div>
  );
}
