import React, { useState, useMemo } from 'react';
import { ShoppingBag, Copy, Check, RefreshCw, HelpCircle, Sparkles, AlertCircle, FileSpreadsheet } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { exportToCSV } from '../utils/calculations';
import FAQSection from '../components/FAQSection';
import SEOGuide from '../components/SEOGuide';
import AdPlaceholder from '../components/AdPlaceholder';

export default function EtsyCalculator() {
  const { activeCurrency, format } = useCurrency();
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Form States
  const [itemPrice, setItemPrice] = useState(35.00);
  const [shippingCharged, setShippingCharged] = useState(5.00); // charged to buyer
  const [itemCost, setItemCost] = useState(10.00);
  const [shippingCost, setShippingCost] = useState(4.50); // paid by seller
  const [offsiteAds, setOffsiteAds] = useState('none'); // 'none', '15', '12'
  const [regulatoryFee, setRegulatoryFee] = useState(false); // UK/EU 0.32% - 0.5%

  const result = useMemo(() => {
    const price = Number(itemPrice) || 0;
    const shipCharged = Number(shippingCharged) || 0;
    const cost = Number(itemCost) || 0;
    const shipPaid = Number(shippingCost) || 0;

    const totalRevenue = price + shipCharged;

    // 1. Listing Fee ($0.20 flat)
    const listingFee = 0.20 * activeCurrency.rate;

    // 2. Transaction Fee (6.5% of total revenue including shipping charged)
    const transactionFee = totalRevenue * 0.065;

    // 3. Payment Processing Fee (3% + $0.25 flat in US, adjusted for currency)
    const paymentFee = (totalRevenue * 0.03) + (0.25 * activeCurrency.rate);

    // 4. Offsite Ads Fee
    let adsFee = 0;
    if (offsiteAds === '15') adsFee = totalRevenue * 0.15;
    if (offsiteAds === '12') adsFee = totalRevenue * 0.12;

    // 5. Regulatory Operating Fee (approx 0.4%)
    const regFee = regulatoryFee ? totalRevenue * 0.004 : 0;

    const totalEtsyFees = listingFee + transactionFee + paymentFee + adsFee + regFee;
    const totalExpenses = cost + shipPaid + totalEtsyFees;
    const netProfit = totalRevenue - totalExpenses;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    const roi = totalExpenses > 0 ? (netProfit / totalExpenses) * 100 : 0;

    return {
      totalRevenue,
      listingFee,
      transactionFee,
      paymentFee,
      adsFee,
      regFee,
      totalEtsyFees,
      totalExpenses,
      netProfit,
      profitMargin,
      roi,
      feePercentage: totalRevenue > 0 ? (totalEtsyFees / totalRevenue) * 100 : 0
    };
  }, [itemPrice, shippingCharged, itemCost, shippingCost, offsiteAds, regulatoryFee, activeCurrency]);

  const handleDownloadExcel = () => {
    let csv = `Etsy Fee Metric,Amount (${activeCurrency.code})\n`;
    csv += `"Item Listing Price","${itemPrice}"\n`;
    csv += `"Shipping Charged to Buyer","${shippingCharged}"\n`;
    csv += `"Total Revenue","${result.totalRevenue.toFixed(2)}"\n`;
    csv += `"Item Production Cost","${itemCost}"\n`;
    csv += `"Actual Postage Paid","${shippingCost}"\n`;
    csv += `"Etsy Listing Fee","-${result.listingFee.toFixed(2)}"\n`;
    csv += `"Etsy Transaction Fee (6.5%)","-${result.transactionFee.toFixed(2)}"\n`;
    csv += `"Payment Processing (3% + 25¢)","-${result.paymentFee.toFixed(2)}"\n`;
    if (result.adsFee > 0) csv += `"Etsy Offsite Ads Fee","-${result.adsFee.toFixed(2)}"\n`;
    csv += `"Total Etsy Fees Cut","-${result.totalEtsyFees.toFixed(2)}"\n`;
    csv += `"NET PROFIT","${result.netProfit.toFixed(2)}"\n`;
    csv += `"NET PROFIT MARGIN %","${result.profitMargin.toFixed(2)}%"\n`;

    exportToCSV(`etsy-fee-breakdown`, csv);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const copySummary = () => {
    const text = `Etsy Fee & Profit Calculation:
Item Price: ${format(itemPrice)} | Shipping Charged: ${format(shippingCharged)}
Total Revenue: ${format(result.totalRevenue)}
--------------------------------
Etsy Listing Fee: ${format(result.listingFee)}
Etsy Transaction Fee (6.5%): ${format(result.transactionFee)}
Payment Processing (3% + 25¢): ${format(result.paymentFee)}
Offsite Ads Fee: ${format(result.adsFee)}
TOTAL ETSY CUT: ${format(result.totalEtsyFees)} (${result.feePercentage.toFixed(1)}%)
--------------------------------
NET PROFIT: ${format(result.netProfit)}
NET MARGIN: ${result.profitMargin.toFixed(2)}%
Calculated with SellerKit.tools`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What is Etsy's fee structure in 2026?",
      answer: "Etsy charges a $0.20 listing fee per item (valid for 4 months or until sold), a 6.5% transaction fee on the total order value (including shipping and gift wrap), and a 3% + $0.25 payment processing fee for Etsy Payments."
    },
    {
      question: "Are Etsy transaction fees charged on shipping?",
      answer: "Yes. Etsy applies its 6.5% transaction fee to both the item selling price and any shipping fee you charge the customer."
    },
    {
      question: "What is the Etsy Offsite Ads fee?",
      answer: "If Etsy's ads on Google, Facebook, or Pinterest bring a buyer to your shop who purchases within 30 days, Etsy charges an advertising fee: 15% for shops earning under $10,000/year (optional) and 12% mandatory for shops earning over $10,000/year."
    },
    {
      question: "How do I calculate break-even price for an Etsy item?",
      answer: "To break even, your selling price must cover your item production cost, actual shipping postage, the $0.20 listing fee, and approx 9.5% to 10% in combined transaction and payment fees."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-xs font-semibold border border-orange-200 dark:border-orange-500/20 mb-3">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Updated for 2026 Etsy Fee Schedules</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Free <span className="text-orange-600 dark:text-orange-400">Etsy Fee</span> & Profit Calculator
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Calculate your exact Etsy take-home profit, listing renewals, transaction cuts, and offsite advertising costs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Inputs */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-5 shadow-xl dark:shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Etsy Listing Pricing & Costs
            </h2>
            <button
              onClick={() => {
                setItemPrice(35.00);
                setShippingCharged(5.00);
                setItemCost(10.00);
                setShippingCost(4.50);
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
                Item Listing Price ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={itemPrice || ''}
                onChange={(e) => setItemPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Shipping Charged to Buyer ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={shippingCharged || ''}
                onChange={(e) => setShippingCharged(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-orange-500"
                placeholder="0.00 for Free Shipping"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Item Production / Crafting Cost ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={itemCost || ''}
                onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Actual Postage Cost Paid by Seller ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={shippingCost || ''}
                onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Etsy Specific Checkboxes & Radios */}
          <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-500/5 border border-orange-200 dark:border-orange-500/20 space-y-3">
            <h3 className="text-xs font-bold text-orange-800 dark:text-orange-400 uppercase tracking-wider">
              Etsy Program Options
            </h3>

            <div>
              <label className="block text-[11px] text-slate-700 dark:text-slate-300 mb-1.5">
                Etsy Offsite Ads Fee:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'none', label: 'No Ads (0%)' },
                  { id: '15', label: 'Optional (15%)' },
                  { id: '12', label: 'Mandatory (12%)' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setOffsiteAds(opt.id)}
                    className={`py-2 px-2 text-center rounded-lg text-xs font-medium border transition ${
                      offsiteAds === opt.id
                        ? 'bg-orange-500 text-black font-bold border-orange-400'
                        : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={regulatoryFee}
                  onChange={(e) => setRegulatoryFee(e.target.checked)}
                  className="rounded text-orange-600"
                />
                <span>Include Regulatory Operating Fee (UK/EU/CA sellers ~0.4%)</span>
              </label>
            </div>
          </div>

        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-orange-200 dark:border-orange-500/30 bg-orange-50/50 dark:bg-gradient-to-b dark:from-[#19100d] dark:to-[#0c0908] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Estimated Etsy Net Profit
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`font-mono text-4xl sm:text-5xl font-extrabold ${
                  result.netProfit > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                }`}>
                  {format(result.netProfit)}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  {result.profitMargin.toFixed(1)}% Margin
                </span>
              </div>
            </div>

            {/* Detailed Fee Itemization */}
            <div className="space-y-2 text-xs border-t border-slate-200 dark:border-white/10 pt-4">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Total Customer Payment</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{format(result.totalRevenue)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Etsy Listing Fee</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-{format(result.listingFee)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Etsy Transaction Fee (6.5%)</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-{format(result.transactionFee)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Payment Processing (3% + 25¢)</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-{format(result.paymentFee)}</span>
              </div>
              {result.adsFee > 0 && (
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Offsite Ads ({offsiteAds}%)</span>
                  <span className="font-mono text-rose-600 dark:text-rose-400">-{format(result.adsFee)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 border-t border-slate-200 dark:border-white/10 pt-2">
                <span>Total Etsy Fees Cut</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-{format(result.totalEtsyFees)} ({result.feePercentage.toFixed(1)}%)</span>
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
                className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-orange-600/20"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>
            </div>
          </div>

          <AdPlaceholder slot="vertical" />
        </div>

      </div>

      <AdPlaceholder slot="horizontal" />

      <SEOGuide
        title="Complete Breakdown of Etsy Seller Fees & Hidden Charges"
        subtitle="How to price handmade and vintage products on Etsy to protect your profit margins."
        formula="Etsy Net Profit = (Item Price + Shipping Charged) - (Crafting Cost + Actual Postage + $0.20 Listing + 6.5% Transaction + 3% + $0.25 Payment Processing + Offsite Ads)"
        steps={[
          {
            title: "1. Remember the $0.20 Listing Fee",
            description: "Every item costs $0.20 to publish. If you sell multi-quantity listings, Etsy re-charges $0.20 every time an item is purchased."
          },
          {
            title: "2. 6.5% applies to Shipping Too",
            description: "If you charge $10 shipping, Etsy takes $0.65 from your shipping revenue as a transaction fee."
          },
          {
            title: "3. Evaluate Offsite Ads Impact",
            description: "If an offsite ad makes a sale, a 15% surcharge can erase your entire profit margin if your base margin is under 20%."
          }
        ]}
        tips={[
          "Offer 'Free Shipping Over $35' by baking the shipping cost into the item price—Etsy algorithms favor listings with free delivery.",
          "Keep high-resolution 1:1 square photos using our Image Padder tool to achieve better CTR in Etsy search results."
        ]}
      />

      <FAQSection title="Etsy Fee & Profit FAQs" faqs={faqs} />
    </div>
  );
}
