// Marketplace Fee Algorithms & Business Formulas

export const MARKETPLACE_PRESETS = {
  amazon: {
    name: 'Amazon FBA / FBM',
    defaultReferralPercent: 15,
    categories: [
      { name: 'Standard / Most Products (15%)', rate: 15 },
      { name: 'Electronics & Computers (8%)', rate: 8 },
      { name: 'Apparel & Accessories (17%)', rate: 17 },
      { name: 'Beauty & Health (8% - 15%)', rate: 15 },
      { name: 'Jewelry (20%)', rate: 20 },
      { name: 'Books & Media (15% + closing)', rate: 15 },
      { name: 'Grocery & Gourmet (8% - 15%)', rate: 12 },
    ],
    defaultFbaFee: 3.86,
    fbaTiers: [
      { name: 'Small Standard (< 16 oz)', fee: 3.40 },
      { name: 'Large Standard (1 to 2 lbs)', fee: 5.40 },
      { name: 'Large Standard (2 to 3 lbs)', fee: 6.10 },
      { name: 'Small Oversize (< 70 lbs)', fee: 10.20 },
      { name: 'Medium Oversize (< 150 lbs)', fee: 18.50 },
    ],
    closingFee: 0,
    storageCostPerUnit: 0.25,
  },
  etsy: {
    name: 'Etsy',
    listingFee: 0.20,
    transactionFeePercent: 6.5,
    paymentProcessingPercent: 3.0,
    paymentProcessingFlat: 0.25,
    regulatoryOperatingPercent: 0.5,
    offsiteAdsPercent: 15, // 12% or 15%
  },
  ebay: {
    name: 'eBay',
    defaultFinalValuePercent: 13.25,
    insertionFee: 0.35,
    perOrderFee: 0.30,
    categories: [
      { name: 'Most Categories (13.25% + 30¢)', rate: 13.25 },
      { name: 'Guitars & Basses (6.35% + 30¢)', rate: 6.35 },
      { name: 'Books, Movies & Music (14.95% + 30¢)', rate: 14.95 },
      { name: 'Watches & Jewelry (15% + 30¢)', rate: 15.0 },
      { name: 'Heavy Equipment (3% max $100)', rate: 3.0 },
    ]
  },
  shopify: {
    name: 'Shopify / Custom Store',
    paymentProcessingPercent: 2.9,
    paymentProcessingFlat: 0.30,
    storePlanAllocationPerOrder: 0.50, // allocated monthly Shopify plan cost
  },
  meesho: {
    name: 'Meesho (India)',
    commissionPercent: 0,
    paymentFeePercent: 0,
    gstPercent: 18,
    returnRateDamageBufferPercent: 5,
  }
};

/**
 * Calculates master multi-marketplace net profit and margins
 */
export function calculateMasterProfit({
  sellingPrice = 0,
  productCost = 0,
  shippingCost = 0,
  platform = 'amazon',
  fulfillmentType = 'fba', // 'fba' or 'fbm'
  referralRate = 15,
  fbaFee = 3.86,
  marketingSpend = 0,
  returnRate = 3,
  miscellaneousCost = 0,
  offsiteAdsActive = false,
  offsiteAdsRate = 15,
  currencyRate = 1
}) {
  const price = Number(sellingPrice) || 0;
  const cost = Number(productCost) || 0;
  const ship = Number(shippingCost) || 0;
  const mkt = Number(marketingSpend) || 0;
  const retRate = Number(returnRate) || 0;
  const misc = Number(miscellaneousCost) || 0;

  let platformFee = 0;
  let paymentFee = 0;
  let fulfillmentFee = 0;
  let listingFee = 0;
  let adsFee = 0;

  if (platform === 'amazon') {
    platformFee = (price * (Number(referralRate) / 100));
    if (fulfillmentType === 'fba') {
      fulfillmentFee = Number(fbaFee) || 0;
    } else {
      fulfillmentFee = ship; // merchant pays shipping
    }
  } else if (platform === 'etsy') {
    listingFee = 0.20 * currencyRate;
    platformFee = price * (6.5 / 100);
    paymentFee = (price * (3.0 / 100)) + (0.25 * currencyRate);
    if (offsiteAdsActive) {
      adsFee = price * (Number(offsiteAdsRate) / 100);
    }
    fulfillmentFee = ship;
  } else if (platform === 'ebay') {
    platformFee = price * (Number(referralRate || 13.25) / 100);
    paymentFee = 0.30 * currencyRate;
    fulfillmentFee = ship;
  } else if (platform === 'shopify') {
    paymentFee = (price * (2.9 / 100)) + (0.30 * currencyRate);
    fulfillmentFee = ship;
  } else if (platform === 'meesho') {
    platformFee = 0; // 0% commission on Meesho
    fulfillmentFee = ship;
  } else {
    platformFee = price * (Number(referralRate) / 100);
    fulfillmentFee = ship;
  }

  // Return Loss Buffer (Cost of returns allocated per sale)
  const returnBuffer = (cost + fulfillmentFee) * (retRate / 100);

  const totalFees = platformFee + paymentFee + listingFee + adsFee;
  const totalCost = cost + totalFees + fulfillmentFee + mkt + misc + returnBuffer;
  const netProfit = price - totalCost;
  const netMarginPercent = price > 0 ? (netProfit / price) * 100 : 0;
  const roiPercent = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
  const breakEvenPrice = totalCost;

  return {
    grossRevenue: price,
    productCost: cost,
    platformFee: totalFees,
    fulfillmentFee,
    marketingSpend: mkt,
    returnBuffer,
    miscellaneousCost: misc,
    totalExpenses: totalCost,
    netProfit,
    netMarginPercent,
    roiPercent,
    breakEvenPrice,
    breakdown: [
      { label: 'Product Cost', amount: cost, color: '#3b82f6' },
      { label: 'Platform & Processing Fees', amount: totalFees, color: '#f43f5e' },
      { label: 'Fulfillment / Shipping', amount: fulfillmentFee, color: '#f59e0b' },
      { label: 'Marketing & Ad Spend', amount: mkt, color: '#8b5cf6' },
      { label: 'Returns & Misc Buffer', amount: returnBuffer + misc, color: '#64748b' },
      { label: 'Net Profit', amount: Math.max(0, netProfit), color: '#10b981' }
    ]
  };
}

/**
 * Currency Formatting with customizable symbol and decimals
 */
export function formatCurrency(amount, currency = 'USD', symbol = '$') {
  const num = Number(amount) || 0;
  return `${symbol}${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Client-side Direct Excel / CSV File Download (with UTF-8 BOM for Excel support)
 */
export function exportToCSV(filename, csvContent) {
  // \uFEFF is the UTF-8 Byte Order Mark (BOM) so Excel renders ₹, $, €, £ correctly
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

