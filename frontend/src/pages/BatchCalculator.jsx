import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Trash2, 
  Download, 
  FileSpreadsheet, 
  Copy, 
  Check, 
  TrendingUp, 
  Sparkles, 
  Package, 
  DollarSign, 
  Calculator,
  RefreshCw
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { calculateMasterProfit, exportToCSV } from '../utils/calculations';
import FAQSection from '../components/FAQSection';
import SEOGuide from '../components/SEOGuide';
import AdPlaceholder from '../components/AdPlaceholder';

export default function BatchCalculator() {
  const { activeCurrency, format } = useCurrency();
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Initial Sample Product Rows
  const [products, setProducts] = useState([
    { id: '1', sku: 'TSHIRT-01', name: 'Cotton Graphic Tee', platform: 'amazon', price: 29.99, cost: 7.50, ship: 4.50, units: 100 },
    { id: '2', sku: 'HOODIE-02', name: 'Fleece Pullover Hoodie', platform: 'shopify', price: 54.99, cost: 18.00, ship: 6.50, units: 50 },
    { id: '3', sku: 'MUG-03', name: 'Ceramic Artisan Mug', platform: 'etsy', price: 22.00, cost: 4.00, ship: 4.00, units: 150 },
    { id: '4', sku: 'CAP-04', name: 'Embroidered Vintage Cap', platform: 'ebay', price: 24.50, cost: 5.50, ship: 3.50, units: 80 },
  ]);

  const addProduct = () => {
    const newId = (products.length + 1).toString();
    setProducts([
      ...products,
      {
        id: newId,
        sku: `SKU-0${newId}`,
        name: `Product ${newId}`,
        platform: 'amazon',
        price: activeCurrency.defaultPrice || 30.00,
        cost: activeCurrency.defaultCost || 8.00,
        ship: activeCurrency.defaultShip || 4.00,
        units: 50
      }
    ]);
  };

  const removeProduct = (id) => {
    if (products.length <= 1) return;
    setProducts(products.filter(p => p.id !== id));
  };

  const updateProduct = (id, field, value) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    }));
  };

  // Perform Calculations across all rows
  const calculatedRows = useMemo(() => {
    return products.map(item => {
      const price = Number(item.price) || 0;
      const cost = Number(item.cost) || 0;
      const ship = Number(item.ship) || 0;
      const units = Number(item.units) || 1;

      const singleResult = calculateMasterProfit({
        sellingPrice: price,
        productCost: cost,
        shippingCost: ship,
        platform: item.platform,
        fulfillmentType: item.platform === 'amazon' ? 'fba' : 'fbm',
        referralRate: item.platform === 'amazon' ? 15 : item.platform === 'etsy' ? 6.5 : item.platform === 'ebay' ? 13.25 : 0,
        fbaFee: 3.86,
        marketingSpend: 1.50,
        returnRate: 3,
        currencyRate: activeCurrency.rate
      });

      const totalRevenue = price * units;
      const totalSourcingCost = cost * units;
      const totalNetProfit = singleResult.netProfit * units;

      return {
        ...item,
        unitNetProfit: singleResult.netProfit,
        unitMargin: singleResult.netMarginPercent,
        totalRevenue,
        totalSourcingCost,
        totalNetProfit
      };
    });
  }, [products, activeCurrency]);

  // Aggregate Portfolio Totals
  const portfolioSummary = useMemo(() => {
    let totalUnits = 0;
    let totalRevenue = 0;
    let totalCost = 0;
    let totalProfit = 0;

    calculatedRows.forEach(row => {
      totalUnits += Number(row.units) || 0;
      totalRevenue += row.totalRevenue;
      totalCost += row.totalSourcingCost;
      totalProfit += row.totalNetProfit;
    });

    const averageMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
    const portfolioRoi = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;

    return {
      totalUnits,
      totalRevenue,
      totalCost,
      totalProfit,
      averageMargin,
      portfolioRoi
    };
  }, [calculatedRows]);

  const handleDownloadExcel = () => {
    let csv = `SKU,Product Name,Platform,Price (${activeCurrency.code}),Unit Cost,Postage,Batch Units,Unit Net Profit,Unit Margin %,Batch Revenue,Batch Profit (${activeCurrency.code})\n`;
    calculatedRows.forEach(row => {
      csv += `"${row.sku}","${row.name}","${row.platform.toUpperCase()}","${row.price}","${row.cost}","${row.ship}","${row.units}","${row.unitNetProfit.toFixed(2)}","${row.unitMargin.toFixed(1)}%","${row.totalRevenue.toFixed(2)}","${row.totalNetProfit.toFixed(2)}"\n`;
    });
    csv += `\n"PORTFOLIO TOTALS","","","","","","${portfolioSummary.totalUnits}","","${portfolioSummary.averageMargin.toFixed(1)}%","${portfolioSummary.totalRevenue.toFixed(2)}","${portfolioSummary.totalProfit.toFixed(2)}"\n`;

    exportToCSV(`multi-sku-batch-profit-analysis`, csv);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const copySummary = () => {
    let text = `SellerKit Batch Inventory Profit Summary:\nTotal SKUs: ${products.length} | Total Units: ${portfolioSummary.totalUnits}\n`;
    text += `Total Sourcing Cost: ${format(portfolioSummary.totalCost)}\n`;
    text += `Total Projected Revenue: ${format(portfolioSummary.totalRevenue)}\n`;
    text += `TOTAL PROJECTED NET PROFIT: ${format(portfolioSummary.totalProfit)} (${portfolioSummary.averageMargin.toFixed(1)}% weighted margin)\n`;
    text += `PORTFOLIO ROI: ${portfolioSummary.portfolioRoi.toFixed(1)}%\nCalculated with SellerKit.tools`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "Why should sellers calculate profits in batches rather than per single unit?",
      answer: "Batch calculations reveal your weighted portfolio margin, cash flow requirements for inventory purchases, and the total projected profit across multiple variations and product lines."
    },
    {
      question: "Can I export the batch calculations into Microsoft Excel or Google Sheets?",
      answer: "Yes! Click the 'Export Batch Excel' button to download a formatted CSV spreadsheet containing all SKU rows, cost itemization, and portfolio total formulas."
    },
    {
      question: "How is the portfolio weighted margin calculated?",
      answer: "Weighted margin is calculated by dividing your total projected net profit across all units by your total gross revenue (Total Profit / Total Revenue × 100)."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
          <Package className="w-3.5 h-3.5" />
          <span>Multi-SKU Inventory Sourcing & Cash Flow Tool</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Multi-Product <span className="text-brand-600 dark:text-brand-400">Batch Profit Calculator</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
          Calculate projected revenue, sourcing capital required, and total net profits across multiple products and product catalogs simultaneously.
        </p>
      </div>

      {/* Aggregate Portfolio KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Sourcing Investment</span>
          <p className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {format(portfolioSummary.totalCost)}
          </p>
          <span className="text-[11px] text-slate-500 mt-0.5 block">{portfolioSummary.totalUnits} Total Units</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Gross Projected Revenue</span>
          <p className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {format(portfolioSummary.totalRevenue)}
          </p>
          <span className="text-[11px] text-slate-500 mt-0.5 block">{products.length} Active SKUs</span>
        </div>

        <div className="p-5 rounded-2xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-gradient-to-b dark:from-[#0d1c18] dark:to-[#08120f] shadow-sm">
          <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 uppercase">Total Net Profit</span>
          <p className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">
            {format(portfolioSummary.totalProfit)}
          </p>
          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5 block">
            {portfolioSummary.averageMargin.toFixed(1)}% Weighted Margin
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Portfolio Sourcing ROI</span>
          <p className="font-mono text-2xl sm:text-3xl font-extrabold text-brand-600 dark:text-brand-400 mt-1">
            {portfolioSummary.portfolioRoi.toFixed(1)}%
          </p>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Return on Capital</span>
        </div>
      </div>

      {/* Interactive Products Batch Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] overflow-hidden shadow-xl mb-8">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Inventory Batch Items ({products.length})
            </h2>
            <button
              onClick={addProduct}
              className="px-3 py-1.5 rounded-lg bg-brand-50 dark:bg-brand-500/20 text-brand-700 dark:text-brand-400 text-xs font-semibold hover:bg-brand-100 flex items-center gap-1 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add SKU</span>
            </button>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleDownloadExcel}
              className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
            >
              {downloaded ? <Check className="w-3.5 h-3.5" /> : <FileSpreadsheet className="w-3.5 h-3.5" />}
              <span>{downloaded ? 'Exported!' : 'Export Batch Excel'}</span>
            </button>

            <button
              onClick={copySummary}
              className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 uppercase font-mono tracking-wider text-[11px] border-b border-slate-200 dark:border-white/10">
              <tr>
                <th className="py-3 px-4">SKU & Title</th>
                <th className="py-3 px-3">Platform</th>
                <th className="py-3 px-3">Price ({activeCurrency.symbol})</th>
                <th className="py-3 px-3">Unit Cost ({activeCurrency.symbol})</th>
                <th className="py-3 px-3">Ship ({activeCurrency.symbol})</th>
                <th className="py-3 px-3">Units</th>
                <th className="py-3 px-3 text-emerald-700 dark:text-emerald-400">Unit Profit</th>
                <th className="py-3 px-3 text-emerald-700 dark:text-emerald-400">Batch Profit</th>
                <th className="py-3 px-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono">
              {calculatedRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition">
                  {/* SKU & Title */}
                  <td className="py-2.5 px-4">
                    <input
                      type="text"
                      value={row.sku}
                      onChange={(e) => updateProduct(row.id, 'sku', e.target.value)}
                      className="w-24 px-2 py-1 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold text-xs mb-1 block"
                      placeholder="SKU"
                    />
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => updateProduct(row.id, 'name', e.target.value)}
                      className="w-36 px-2 py-1 rounded bg-transparent text-slate-600 dark:text-slate-400 text-[11px] font-sans"
                      placeholder="Product Name"
                    />
                  </td>

                  {/* Platform */}
                  <td className="py-2.5 px-3">
                    <select
                      value={row.platform}
                      onChange={(e) => updateProduct(row.id, 'platform', e.target.value)}
                      className="px-2 py-1 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs font-sans"
                    >
                      <option value="amazon">Amazon</option>
                      <option value="etsy">Etsy</option>
                      <option value="shopify">Shopify</option>
                      <option value="ebay">eBay</option>
                      <option value="meesho">Meesho</option>
                    </select>
                  </td>

                  {/* Selling Price */}
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      value={row.price}
                      onChange={(e) => updateProduct(row.id, 'price', parseFloat(e.target.value) || 0)}
                      className="w-20 px-2 py-1 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold text-xs"
                    />
                  </td>

                  {/* Sourcing Cost */}
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      value={row.cost}
                      onChange={(e) => updateProduct(row.id, 'cost', parseFloat(e.target.value) || 0)}
                      className="w-18 px-2 py-1 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                    />
                  </td>

                  {/* Shipping */}
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      value={row.ship}
                      onChange={(e) => updateProduct(row.id, 'ship', parseFloat(e.target.value) || 0)}
                      className="w-16 px-2 py-1 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                    />
                  </td>

                  {/* Units */}
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      value={row.units}
                      onChange={(e) => updateProduct(row.id, 'units', parseInt(e.target.value, 10) || 0)}
                      className="w-16 px-2 py-1 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                    />
                  </td>

                  {/* Unit Profit */}
                  <td className="py-2.5 px-3 font-semibold text-emerald-700 dark:text-emerald-400">
                    +{format(row.unitNetProfit)}
                    <span className="block text-[10px] text-slate-500 font-normal">({row.unitMargin.toFixed(1)}%)</span>
                  </td>

                  {/* Batch Profit */}
                  <td className="py-2.5 px-3 font-bold text-emerald-700 dark:text-emerald-400">
                    +{format(row.totalNetProfit)}
                  </td>

                  {/* Delete */}
                  <td className="py-2.5 px-2 text-center">
                    <button
                      onClick={() => removeProduct(row.id)}
                      disabled={products.length <= 1}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition disabled:opacity-30"
                      title="Remove row"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdPlaceholder slot="horizontal" />

      <SEOGuide
        title="Multi-SKU Portfolio Economics & Inventory Cash Flow Management"
        subtitle="How professional e-commerce brands budget capital and forecast monthly net profit margins."
        formula="Portfolio Net Profit = Σ (Unit Net Profit × Units Sold)   |   Weighted Margin = (Total Profit / Total Gross Revenue) × 100"
        steps={[
          {
            title: "1. Balance High-Margin and High-Volume SKUs",
            description: "Some items (like accessories) yield 60% margins with lower sales volume, while flagship items yield 25% margins with high sales turnover."
          },
          {
            title: "2. Calculate Capital Requirements",
            description: "Review the 'Total Sourcing Investment' metric to know exactly how much cash you need for supplier production runs."
          },
          {
            title: "3. Export to Excel for Supply Chain Tracking",
            description: "Export the consolidated CSV spreadsheet to share with manufacturing partners and accountants."
          }
        ]}
        tips={[
          "Re-evaluate batch margins quarterly to account for seasonal carrier shipping surcharges and raw material price increases.",
          "Add barcode labels to each SKU using our Barcode Generator before shipping boxes to fulfillment centers."
        ]}
      />

      <FAQSection title="Batch Profit & Portfolio FAQs" faqs={faqs} />

    </div>
  );
}
