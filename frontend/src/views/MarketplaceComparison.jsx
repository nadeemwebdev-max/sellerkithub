import React, { useState, useMemo } from 'react';
import { 
  GitCompare, 
  Trophy, 
  TrendingUp, 
  Check, 
  Copy, 
  FileSpreadsheet, 
  RefreshCw, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useI18n } from '../i18n/utils';
import { TOOLS_TRANSLATIONS } from '../i18n/tools';
import { getFaqsForLang } from '../i18n/faqs';
import { calculateMasterProfit, exportToCSV } from '../utils/calculations';
import RelatedTools from '../components/RelatedTools';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';

export default function MarketplaceComparison({ lang: propLang }) {
  const { activeCurrency, format } = useCurrency();
  const { lang, t } = useI18n(propLang);
  const ct = (TOOLS_TRANSLATIONS[lang] || TOOLS_TRANSLATIONS.en).comparison;

  // Unified Input State
  const [sellingPrice, setSellingPrice] = useState(activeCurrency.defaultPrice || 35.00);
  const [productCost, setProductCost] = useState(activeCurrency.defaultCost || 9.50);
  const [shippingCost, setShippingCost] = useState(activeCurrency.defaultShip || 4.50);
  const [marketingSpend, setMarketingSpend] = useState(2.00);
  const [returnRate, setReturnRate] = useState(3);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Compute all 5 platforms simultaneously
  const comparisons = useMemo(() => {
    const platforms = [
      { id: 'amazon-fba', name: 'Amazon FBA', platform: 'amazon', fulfillmentType: 'fba', referralRate: 15, fbaFee: 3.86, color: '#f59e0b' },
      { id: 'amazon-fbm', name: 'Amazon FBM', platform: 'amazon', fulfillmentType: 'fbm', referralRate: 15, fbaFee: 0, color: '#d97706' },
      { id: 'etsy', name: 'Etsy Store', platform: 'etsy', fulfillmentType: 'fbm', referralRate: 6.5, fbaFee: 0, color: '#ea580c' },
      { id: 'ebay', name: 'eBay Marketplace', platform: 'ebay', fulfillmentType: 'fbm', referralRate: 13.25, fbaFee: 0, color: '#2563eb' },
      { id: 'shopify', name: 'Shopify Store', platform: 'shopify', fulfillmentType: 'fbm', referralRate: 0, fbaFee: 0, color: '#10b981' },
      { id: 'meesho', name: 'Meesho Reseller', platform: 'meesho', fulfillmentType: 'fbm', referralRate: 0, fbaFee: 0, color: '#ec4899' },
    ];

    const results = platforms.map(p => {
      const res = calculateMasterProfit({
        sellingPrice,
        productCost,
        shippingCost,
        platform: p.platform,
        fulfillmentType: p.fulfillmentType,
        referralRate: p.referralRate,
        fbaFee: p.fbaFee,
        marketingSpend,
        returnRate,
        miscellaneousCost: 0.5,
        offsiteAdsActive: false,
        currencyRate: activeCurrency.rate
      });

      return {
        ...p,
        netProfit: res.netProfit,
        netMarginPercent: res.netMarginPercent,
        totalExpenses: res.totalExpenses,
        platformFee: res.platformFee,
        fulfillmentFee: res.fulfillmentFee,
        roiPercent: res.roiPercent
      };
    });

    return results.sort((a, b) => b.netProfit - a.netProfit);
  }, [sellingPrice, productCost, shippingCost, marketingSpend, returnRate, activeCurrency]);

  const bestPlatform = comparisons[0];

  const handleDownloadExcel = () => {
    let csv = `Rank,Platform,Selling Price (${activeCurrency.code}),Sourcing Cost,Platform Fees,Fulfillment/Shipping,Total Expenses,Net Profit (${activeCurrency.code}),Margin %,ROI %\n`;
    comparisons.forEach((item, idx) => {
      csv += `"#${idx + 1}","${item.name}","${sellingPrice}","${productCost}","${item.platformFee.toFixed(2)}","${item.fulfillmentFee.toFixed(2)}","${item.totalExpenses.toFixed(2)}","${item.netProfit.toFixed(2)}","${item.netMarginPercent.toFixed(1)}%","${item.roiPercent.toFixed(1)}%"\n`;
    });

    exportToCSV(`marketplace-side-by-side-comparison`, csv);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const copySummary = () => {
    let text = `Side-by-Side E-Commerce Marketplace Profit Comparison:\nPrice: ${format(sellingPrice)} | Cost: ${format(productCost)}\n--------------------------------\n`;
    comparisons.forEach((c, i) => {
      text += `#${i + 1} ${c.name}: Net Profit ${format(c.netProfit)} (${c.netMarginPercent.toFixed(1)}% Margin)\n`;
    });
    text += `--------------------------------\nCalculated with SellerKitHub.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "Which e-commerce marketplace yields the highest profit margin?",
      answer: "Direct-to-consumer platforms like Shopify yield the highest gross margin per sale (often 60%-75%) because there are zero marketplace commission cuts—only payment processing (2.9% + 30¢). However, direct stores require you to generate your own traffic through paid ads or SEO. Among built-in marketplaces, Etsy and eBay often yield higher net margins than Amazon FBA due to lower fulfillment and storage overhead."
    },
    {
      question: "Is Shopify cheaper than Amazon FBA for new sellers?",
      answer: "Shopify has lower variable transaction costs (approx 2.9% + 30¢ per transaction vs Amazon's 15% referral + $3.86+ FBA fee). However, Shopify charges a fixed monthly subscription ($39/mo) and requires customer acquisition advertising spend (PPC or Meta ads). Amazon provides built-in organic search traffic, making it easier for new sellers without an existing audience to make initial sales."
    },
    {
      question: "How do Etsy seller fees compare to eBay seller fees in 2026?",
      answer: "Etsy charges a $0.20 listing fee, 6.5% transaction fee (on item + shipping), and 3% + $0.25 payment processing fee (~9.5% + 45¢ total). eBay charges zero listing fees for your first 250 monthly listings and a category Most Category final value fee of 13.25% + $0.30 (which includes payment processing). Etsy is slightly cheaper for lower-ticket handmade items, while eBay is more straightforward for general retail and resale."
    },
    {
      question: "Why does Meesho have 0% commission and how do resellers profit?",
      answer: "Meesho operates a zero-commission model for suppliers in India to attract catalog volume. Suppliers price items at wholesale rates, and resellers list them on social platforms (WhatsApp, Instagram) with their own markup. Meesho makes revenue through logistics fulfillment services, seller promotion tools, and return shipping management."
    },
    {
      question: "Which platform is best for selling high-ticket ($100+) goods?",
      answer: "eBay and Shopify are excellent for high-ticket goods. eBay caps final value fees in select categories and offers buyer authentication programs for luxury items, watches, and sneakers. Shopify allows brand owners to retain 97% of high-ticket sales revenue without percentage commission penalties."
    },
    {
      question: "How do customer acquisition costs (CAC) differ between direct sites and marketplaces?",
      answer: "Marketplaces (Amazon, Etsy, eBay) charge a higher commission fee (6.5% to 15%) in exchange for instant access to hundreds of millions of active shoppers. Direct websites (Shopify) charge low transaction fees (2.9%) but require you to spend $10 to $30+ in customer acquisition costs (CAC) per buyer via Meta, Google, or influencer ads."
    },
    {
      question: "Should I sell on multiple marketplaces simultaneously?",
      answer: "Yes! Multi-channel selling diversifies your revenue streams, reduces platform dependency risk, and maximizes brand reach. Using centralized inventory management software (such as Sellbrite or Linnworks) allows you to sync stock levels seamlessly across Amazon, Etsy, eBay, and Shopify."
    },
    {
      question: "How do customer return policies and costs vary across platforms?",
      answer: "Amazon FBA has a generous customer-first return policy where Amazon handles returns automatically, often charging sellers return processing fees. eBay allows sellers to set customized return policies (30-day, 60-day, or No Returns). Etsy leaves return policies to individual shop policies, though buyers can open cases under Etsy's Purchase Protection Program."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
          <GitCompare className="w-3.5 h-3.5" />
          <span>{ct.badge}</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {ct.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          {ct.subtitle}
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Inputs */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-5 shadow-xl dark:shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Product Cost & Selling Inputs
            </h2>
            <button
              onClick={() => {
                setSellingPrice(35.00);
                setProductCost(9.50);
                setShippingCost(4.50);
                setMarketingSpend(2.00);
                setReturnRate(3);
              }}
              className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="cmp-selling-price" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Target Selling Price ({activeCurrency.symbol})
              </label>
              <input
                id="cmp-selling-price"
                aria-label={`Target Selling Price in ${activeCurrency.symbol}`}
                type="number"
                inputMode="decimal"
                value={sellingPrice || ''}
                onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label htmlFor="cmp-product-cost" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Product Sourcing / Manufacturing Cost ({activeCurrency.symbol})
              </label>
              <input
                id="cmp-product-cost"
                aria-label={`Product Sourcing Cost in ${activeCurrency.symbol}`}
                type="number"
                inputMode="decimal"
                value={productCost || ''}
                onChange={(e) => setProductCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label htmlFor="cmp-shipping-cost" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Shipping Postage Paid by Seller ({activeCurrency.symbol})
              </label>
              <input
                id="cmp-shipping-cost"
                aria-label={`Shipping Postage in ${activeCurrency.symbol}`}
                type="number"
                inputMode="decimal"
                value={shippingCost || ''}
                onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label htmlFor="cmp-marketing-spend" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Marketing Spend / Ad Budget per Unit ({activeCurrency.symbol})
              </label>
              <input
                id="cmp-marketing-spend"
                aria-label={`Marketing Spend per unit in ${activeCurrency.symbol}`}
                type="number"
                inputMode="decimal"
                value={marketingSpend || ''}
                onChange={(e) => setMarketingSpend(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label htmlFor="cmp-return-rate" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Estimated Customer Return Rate (%)
              </label>
              <input
                id="cmp-return-rate"
                aria-label="Estimated Customer Return Rate percentage"
                type="number"
                inputMode="decimal"
                step="0.5"
                value={returnRate || ''}
                onChange={(e) => setReturnRate(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={handleDownloadExcel}
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-emerald-600/20"
            >
              {downloaded ? <Check className="w-4 h-4 text-emerald-200" /> : <FileSpreadsheet className="w-4 h-4" />}
              <span>{downloaded ? 'Downloaded!' : 'Download CSV'}</span>
            </button>

            <button
              onClick={copySummary}
              className="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-brand-600/20"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Ranking'}</span>
            </button>
          </div>
        </div>

        {/* Simultaneous Platform Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-bold text-xs text-emerald-900 dark:text-emerald-300">
                Most Profitable Channel: <span className="underline">{bestPlatform.name}</span>
              </span>
            </div>
            <span className="font-mono font-extrabold text-sm text-emerald-700 dark:text-emerald-400">
              {format(bestPlatform.netProfit)} ({bestPlatform.netMarginPercent.toFixed(1)}%)
            </span>
          </div>

          <div className="space-y-3">
            {comparisons.map((item, idx) => (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  idx === 0
                    ? 'border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-500/5 shadow-md'
                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center font-mono">
                      #{idx + 1}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {item.name}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className={`font-mono text-lg font-extrabold block ${
                      item.netProfit > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                    }`}>
                      {format(item.netProfit)}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {item.netMarginPercent.toFixed(1)}% Margin
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-white/5 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Platform Cut</span>
                    <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">-{format(item.platformFee)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Fulfillment / Shipping</span>
                    <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">-{format(item.fulfillmentFee)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">ROI</span>
                    <span className="font-mono font-semibold text-slate-900 dark:text-white">{item.roiPercent.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <AdPlaceholder slot="vertical" />
        </div>

      </div>

      {/* Author Bio & E-E-A-T Component */}
      <AuthorBio 
        authorName="SellerKit Channel Analytics Team"
        authorRole="Multi-Channel Platform Strategy Specialists"
        lastUpdated="2026 Multi-Platform Schedule Verified"
        category="E-Commerce Channel Profitability"
      />

      {/* Recommended Seller Tools Affiliate Component */}
      <AffiliateCTA 
        platform="general" 
        title="Recommended Multi-Channel Growth Tools" 
        description="Sync multi-channel catalog stock, lower cross-border payment cuts, and build independent storefronts."
      />

      {/* Multi-Channel Comparison Table */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            2026 E-Commerce Multi-Channel Platform Matrix
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          Comprehensive feature, fee, audience reach, and seller control comparison across top e-commerce platforms.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">Platform</th>
                <th className="p-3">Avg Commission Cut</th>
                <th className="p-3">Payment Processing</th>
                <th className="p-3">Monthly Subscription</th>
                <th className="p-3">Organic Traffic</th>
                <th className="p-3">Customer Data Ownership</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Amazon FBA</td>
                <td className="p-3 font-mono text-rose-600 dark:text-rose-400">15.00% + FBA Pick/Pack</td>
                <td className="p-3">Included in Referral</td>
                <td className="p-3 font-mono">$39.99 / mo</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">Extremely High</td>
                <td className="p-3 text-rose-600 dark:text-rose-400">None (Amazon Customer)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Etsy Store</td>
                <td className="p-3 font-mono text-orange-600 dark:text-orange-400">6.50% + $0.20 Listing</td>
                <td className="p-3 font-mono">3.00% + $0.25</td>
                <td className="p-3 font-mono">$0.00 / mo</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">High (Handmade Niche)</td>
                <td className="p-3 text-amber-600 dark:text-amber-400">Limited</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">eBay Marketplace</td>
                <td className="p-3 font-mono text-blue-600 dark:text-blue-400">13.25% Final Value</td>
                <td className="p-3">Included in Managed Payments</td>
                <td className="p-3 font-mono">$0 - $24.95 / mo</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">High (Resale/Used)</td>
                <td className="p-3 text-amber-600 dark:text-amber-400">Limited</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Shopify Store</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">0.00% Commission</td>
                <td className="p-3 font-mono">2.90% + $0.30</td>
                <td className="p-3 font-mono">$39.00 / mo</td>
                <td className="p-3 text-rose-600 dark:text-rose-400">None (Self-Driven PPC/SEO)</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">100% Full Ownership</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Meesho Reseller</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">0.00% Commission</td>
                <td className="p-3 font-mono">0.00% Payment Cut</td>
                <td className="p-3 font-mono">$0.00 / mo</td>
                <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">High (Social Commerce)</td>
                <td className="p-3 text-amber-600 dark:text-amber-400">Social Contact Based</td>
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
            Worked Side-by-Side Channel Profit Scenarios
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          
          {/* Scenario 1 */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Scenario 1: $50 Tech Gadget
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>Item Price:</strong> $50.00</p>
              <p><strong>Sourcing Cost:</strong> $12.00</p>
              <p><strong>Shipping Postage:</strong> $5.00</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 font-mono text-[11px]">
              <p className="text-amber-600">Amazon FBA: $21.14 Net (42.3%)</p>
              <p className="text-orange-600">Etsy Store: $27.30 Net (54.6%)</p>
              <p className="text-blue-600">eBay Store: $26.07 Net (52.1%)</p>
              <p className="text-emerald-600">Shopify: $31.25 Net (62.5%)</p>
            </div>
          </div>

          {/* Scenario 2 */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Scenario 2: $15 Low-Ticket Fashion
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>Item Price:</strong> $15.00</p>
              <p><strong>Sourcing Cost:</strong> $3.00</p>
              <p><strong>Shipping Postage:</strong> $4.00</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 font-mono text-[11px]">
              <p className="text-amber-600">Amazon FBA: $2.64 Net (17.6%)</p>
              <p className="text-orange-600">Etsy Store: $6.12 Net (40.8%)</p>
              <p className="text-blue-600">eBay Store: $5.71 Net (38.1%)</p>
              <p className="text-emerald-600">Shopify: $7.26 Net (48.4%)</p>
            </div>
          </div>

          {/* Scenario 3 */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Scenario 3: $250 Premium Decor
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>Item Price:</strong> $250.00</p>
              <p><strong>Sourcing Cost:</strong> $80.00</p>
              <p><strong>Shipping Postage:</strong> $22.00</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 font-mono text-[11px]">
              <p className="text-amber-600">Amazon FBA: $100.50 Net (40.2%)</p>
              <p className="text-orange-600">Etsy Store: $124.00 Net (49.6%)</p>
              <p className="text-blue-600">eBay Store: $114.87 Net (45.9%)</p>
              <p className="text-emerald-600">Shopify: $140.45 Net (56.2%)</p>
            </div>
          </div>

          {/* Scenario 4 */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Scenario 4: $500 Luxury Timepiece
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>Item Price:</strong> $500.00</p>
              <p><strong>Sourcing Cost:</strong> $180.00</p>
              <p><strong>Shipping Postage:</strong> $30.00</p>
            </div>
            <div className="border-t border-slate-200 dark:border-white/10 pt-2 space-y-1 font-mono text-[11px]">
              <p className="text-amber-600">Amazon FBA: $205.00 Net (41.0%)</p>
              <p className="text-orange-600">Etsy Store: $242.00 Net (48.4%)</p>
              <p className="text-blue-600">eBay Capped: $238.00 Net (47.6%)</p>
              <p className="text-emerald-600">Shopify: $275.20 Net (55.0%)</p>
            </div>
          </div>

        </div>
      </section>

      {/* Master Channel Strategy Guide */}
      <article className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-800 dark:text-slate-200 space-y-6 shadow-sm">
        <div className="border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Lightbulb className="w-4 h-4" />
            <span>Multi-Channel Strategy Guide</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            The Multi-Channel E-Commerce Matrix: Balancing Traffic vs. Take-Home Margin
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            How to select the right sales channels for your products and build a resilient multi-channel business.
          </p>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            1. Organic Marketplace Traffic vs. Direct Customer Ownership
          </h3>
          <p>
            The fundamental trade-off in e-commerce is between commission-based marketplaces (Amazon, Etsy, eBay) and self-hosted stores (Shopify, WooCommerce). Marketplaces charge high variable fees (8% to 15%+) in exchange for built-in buyer intent and massive search traffic. Conversely, self-hosted stores offer high net margins per unit (paying only 2.9% + 30¢ payment processing), but require you to invest in advertising (Meta, Google PPC, TikTok) to acquire customers.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            2. Category-Specific Channel Optimization
          </h3>
          <p>
            Different product types thrive on different platforms. Unique handmade crafts, personalized gifts, and vintage goods perform best on Etsy. General retail products, private label commodities, and fast-moving consumer goods scale fastest on Amazon FBA. Collectibles, refurbished electronics, and pre-owned inventory dominate eBay. Premium branded products with high repeat purchase rates belong on Shopify.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            3. Protecting Business Valuation via Channel Diversification
          </h3>
          <p>
            Relying 100% on a single sales channel exposes your business to catastrophic risk from sudden algorithm changes, account suspensions, or fee rate hikes. Spreading product inventory across Amazon, Etsy, eBay, and a direct Shopify storefront ensures continuous cash flow and significantly increases your e-commerce brand valuation when selling to aggregators or private equity.
          </p>
        </div>
      </article>

      {/* Related Tools */}
      <RelatedTools currentPath="/tools/marketplace-comparison" lang={lang} />

      {/* Structured FAQ Section */}
      <FAQSection lang={lang} faqs={faqs} />
    </div>
  );
}
