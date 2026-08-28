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
import { exportToCSV } from '../utils/calculations';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';

export default function MarginMatrix() {
  const { activeCurrency, format } = useCurrency();
  const [cost, setCost] = useState(12.00);
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

  const faqs = [
    {
      question: "What is the exact mathematical difference between gross margin and markup?",
      answer: "Gross margin measures profit as a percentage of the total retail selling price (Margin % = Net Profit / Selling Price). Markup measures profit as a percentage of the item sourcing cost (Markup % = Net Profit / Sourcing Cost). Because selling price is always larger than cost, markup percentage is always higher than margin percentage for the same dollar profit."
    },
    {
      question: "How do I calculate selling price when I know my product cost and target margin?",
      answer: "Use the formula: Selling Price = Sourcing Cost / (1 - Target Margin %). For example, if your product sourcing cost is $15 and your target gross margin is 40% (0.40), calculate $15 / (1 - 0.40) = $15 / 0.60 = $25.00 selling price."
    },
    {
      question: "What is keystone pricing in retail e-commerce?",
      answer: "Keystone pricing is a traditional retail pricing strategy where an item's selling price is set to exactly double the wholesale sourcing cost (a 100% markup). This achieves exactly a 50% gross profit margin. For example, an item bought at wholesale for $20 is sold at retail for $40."
    },
    {
      question: "Why does a 50% markup NOT equal a 50% profit margin?",
      answer: "If an item costs $10 and you add a 50% markup ($5), your selling price is $15. Your profit is $5. Calculating profit margin on the $15 selling price gives $5 / $15 = 33.3% gross margin, NOT 50%. To get a 50% gross margin on a $10 cost, you must double the price to $20 (a 100% markup)."
    },
    {
      question: "What is considered a good gross profit margin for online physical products?",
      answer: "For direct-to-consumer (DTC) e-commerce brands, a healthy gross profit margin before marketplace fees and advertising is 60% to 80%. For retail goods sold on Amazon FBA or Etsy, aim for a minimum gross margin of 40% to 50% to ensure take-home net margin remains above 20% after platform fees."
    },
    {
      question: "How do I price products for wholesale distributors vs direct retail customers?",
      answer: "Use a two-tier keystone pricing ladder. Start with your manufacturing cost (e.g. $10). Sell to wholesale distributors at a 50% margin ($20 wholesale price). Recommend a retail MSRP set at another keystone 50% reseller margin ($40 retail price). This ensures both wholesale distributors and retailers achieve their margin targets."
    },
    {
      question: "How do payment processing fees and shipping overhead affect target gross margin?",
      answer: "Gross margin only accounts for product sourcing cost (COGS). Net profit margin accounts for additional variable operational costs including credit card processing (2.9% + 30¢), marketplace referral cuts (6.5% - 15%), and outbound postage. Your initial gross margin must be high enough to absorb these operational expenses."
    },
    {
      question: "How can I export the margin and markup matrix to Excel?",
      answer: "Click the green 'Download CSV' button above inside the tool header. This generates a complete spreadsheet containing target percentage ladders from 10% to 90%, comparing target margin selling prices, dollar profit contributions, markup multipliers, and effective margin percentages."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
          <Grid className="w-3.5 h-3.5" />
          <span>Wholesale & Retail Financial Pricing Engine</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Wholesale Profit <span className="text-brand-600 dark:text-brand-400">Margin & Markup</span> Matrix
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Calculate retail selling prices, wholesale costs, keystone pricing, and target gross profit margins from 10% to 90% in one interactive price ladder.
        </p>
      </div>

      {/* Main Interactive Controls & Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-6 shadow-xl dark:shadow-2xl mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Product Sourcing Cost Input
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Enter your item manufacturing cost to generate the full margin & markup price ladder.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCost(12.00)}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset ($12.00)</span>
            </button>

            <button
              onClick={handleDownloadExcel}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              {downloaded ? <Check className="w-4 h-4 text-emerald-200" /> : <FileSpreadsheet className="w-4 h-4" />}
              <span>{downloaded ? 'Downloaded!' : 'Download CSV'}</span>
            </button>

            <button
              onClick={copyCSV}
              className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>Copy CSV</span>
            </button>
          </div>
        </div>

        <div className="max-w-md">
          <label htmlFor="matrix-cost" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
            Product Sourcing / Unit Manufacturing Cost ({activeCurrency.symbol})
          </label>
          <input
            id="matrix-cost"
            aria-label={`Product Sourcing Cost in ${activeCurrency.symbol}`}
            type="number"
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
      <AuthorBio 
        authorName="SellerKit Retail Pricing & Margin Engineering Team"
        authorRole="Financial Pricing Strategy Specialists"
        lastUpdated="2026 Wholesale & Retail Matrix Verified"
        category="Pricing & Gross Margin Strategy"
      />

      {/* Recommended Seller Tools Affiliate Component */}
      <AffiliateCTA 
        platform="general" 
        title="Recommended Pricing & Margin Software" 
        description="Automate dynamic repricing, model competitor price elasticity, and track catalog margins."
      />

      {/* Target Margin vs Markup Conversion Reference Table */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Gross Profit Margin vs Markup Multiplier Conversion Table
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          Quick reference conversion table matching target gross margins to required cost markup multipliers.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">Target Gross Margin %</th>
                <th className="p-3">Required Markup Multiplier</th>
                <th className="p-3">Required Markup %</th>
                <th className="p-3">Retail Price Formula</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-mono font-bold">10% Margin</td>
                <td className="p-3 font-mono text-brand-600">1.11x Multiplier</td>
                <td className="p-3 font-mono">11.1% Markup</td>
                <td className="p-3 font-mono">Cost / 0.90</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold">20% Margin</td>
                <td className="p-3 font-mono text-brand-600">1.25x Multiplier</td>
                <td className="p-3 font-mono">25.0% Markup</td>
                <td className="p-3 font-mono">Cost / 0.80</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold">33.3% Margin</td>
                <td className="p-3 font-mono text-brand-600">1.50x Multiplier</td>
                <td className="p-3 font-mono">50.0% Markup</td>
                <td className="p-3 font-mono">Cost / 0.667</td>
              </tr>
              <tr className="bg-amber-50/50 dark:bg-amber-500/10 font-bold">
                <td className="p-3 font-mono text-amber-700 dark:text-amber-300">50.0% Keystone Margin</td>
                <td className="p-3 font-mono text-emerald-600">2.00x Multiplier</td>
                <td className="p-3 font-mono">100.0% Markup</td>
                <td className="p-3 font-mono">Cost / 0.50 (Cost x 2)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold">60.0% Margin</td>
                <td className="p-3 font-mono text-brand-600">2.50x Multiplier</td>
                <td className="p-3 font-mono">150.0% Markup</td>
                <td className="p-3 font-mono">Cost / 0.40</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold">75.0% Margin</td>
                <td className="p-3 font-mono text-brand-600">4.00x Multiplier</td>
                <td className="p-3 font-mono">300.0% Markup</td>
                <td className="p-3 font-mono">Cost / 0.25</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold">80.0% Margin</td>
                <td className="p-3 font-mono text-brand-600">5.00x Multiplier</td>
                <td className="p-3 font-mono">400.0% Markup</td>
                <td className="p-3 font-mono">Cost / 0.20</td>
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
            Worked Step-by-Step Pricing & Keystone Examples
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Example 1: Keystone 50% Margin Pricing
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Sourcing Cost:</strong> $12.00.<br />
              <strong>Target Margin:</strong> 50% Keystone.<br />
              <strong>Formula:</strong> Price = $12.00 / (1 - 0.50) = $24.00.<br />
              <strong>Takeaway:</strong> Adding a 50% markup ($18 price) only yields a 33.3% margin. Double the price to $24 for true 50% margin.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Example 2: Wholesale & Retail Ladder
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Manufacturing Cost:</strong> $15.00.<br />
              <strong>Wholesale Tier (40% Margin):</strong> $25.00 Price.<br />
              <strong>MSRP Retail Keystone Tier (50% Margin):</strong> $50.00 Retail Price.<br />
              <strong>Takeaway:</strong> Allows both brand owner and retail partner to make profit.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Example 3: Direct Skincare Brand (80% Margin)
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Formulation COGS:</strong> $4.50.<br />
              <strong>Target Margin:</strong> 80%.<br />
              <strong>Formula:</strong> Price = $4.50 / (1 - 0.80) = $22.50.<br />
              <strong>Takeaway:</strong> High 80% gross margin absorbs $12.00 Meta ad acquisition cost while retaining $6.00 net profit.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Example 4: High-Volume Apparel Manufacturing
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Fabric & Cut COGS:</strong> $6.00.<br />
              <strong>Target Margin:</strong> 75%.<br />
              <strong>Formula:</strong> Price = $6.00 / (1 - 0.75) = $24.00.<br />
              <strong>Takeaway:</strong> Provides ample margin headroom for Black Friday 30% promotional sales discounts.
            </p>
          </div>

        </div>
      </section>

      {/* Master Pricing Strategy Article */}
      <article className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-800 dark:text-slate-200 space-y-6 shadow-sm">
        <div className="border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Lightbulb className="w-4 h-4" />
            <span>Master Pricing Strategy Guide</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Margin vs. Markup: Avoiding the Costly Pricing Trap in E-Commerce
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Understanding mathematical formulas, keystone pricing rules, and discount protection.
          </p>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            1. The Fatal Flaw: Confusing Markup Percentage with Margin Percentage
          </h3>
          <p>
            Confusing margin and markup is one of the leading causes of early e-commerce failure. If a product costs $20 to manufacture and you add a 30% markup ($6), your selling price is $26. When you sell this product on Amazon (which charges a 15% referral fee on the $26 price = $3.90) and spend $3.00 on PPC ads, your total fees ($6.90) exceed your entire $6.00 markup! Understanding that a 30% markup only yields a 23.1% gross margin protects your bottom line.
          </p>
        </div>
      </article>

      {/* Structured FAQ Section */}
      <FAQSection title="Wholesale Margin & Markup FAQs" faqs={faqs} />
    </div>
  );
}
