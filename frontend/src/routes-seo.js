export const SITE_URL = 'https://sellerkithub.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon.svg`;

const ORGANIZATION_SCHEMA = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  'name': 'SellerKitHub',
  'url': SITE_URL,
  'logo': `${SITE_URL}/favicon.svg`,
  'sameAs': [
    'https://twitter.com/sellerkithub',
    'https://github.com/sellerkithub'
  ],
  'contactPoint': {
    '@type': 'ContactPoint',
    'email': 'support@sellerkithub.com',
    'contactType': 'customer support',
    'availableLanguage': 'English'
  }
};

export const ROUTES_SEO = {
  '/': {
    title: 'SellerKit – Free E-Commerce Fee & Profit Calculators & Tools',
    description: 'Calculate real net profit, marketplace fees, and margins across Amazon, Etsy, eBay, Shopify & Meesho. 100% free, private, client-side seller utilities.',
    keywords: 'amazon fee calculator, etsy fee calculator, ebay profit calculator, meesho profit calculator, shopify profit margin, ecommerce calculator, fba calculator',
    canonical: `${SITE_URL}/`,
    ogTitle: 'SellerKit – Free E-Commerce Fee & Profit Calculators & Tools',
    ogDescription: 'Instant net profit and fee breakdown for Amazon FBA, Etsy, eBay, Shopify, and Meesho sellers. 100% free client-side tools.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          'url': `${SITE_URL}/`,
          'name': 'SellerKit Hub',
          'description': 'Free E-Commerce Seller Utilities & Fee Calculators',
          'publisher': { '@id': `${SITE_URL}/#organization` }
        },
        {
          '@type': 'SoftwareApplication',
          'name': 'SellerKit Multi-Marketplace Fee & Profit Calculator',
          'url': `${SITE_URL}/`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'description': 'Real-time multi-channel e-commerce calculator supporting Amazon FBA, Etsy, eBay, Shopify, and Meesho with return rate, marketing, and fee modeling.'
        }
      ]
    }
  },

  /* Programmatic SEO Routes under /tools/ */

  '/tools/amazon-fba-calculator': {
    title: 'Amazon FBA Calculator (2026) – Real Net Margin & Fee Breakdown | SellerKit',
    description: 'Accurate Amazon FBA vs FBM seller fee & profit calculator updated for 2026. Calculate referral tiers (8-15%), pick & pack, inbound placement fees, and monthly storage.',
    keywords: 'fba fee calculator, amazon fba calculator, amazon fee calculator, fba vs fbm profit, amazon seller fees, amazon referral fee calculator',
    canonical: `${SITE_URL}/tools/amazon-fba-calculator`,
    ogTitle: 'Amazon FBA Calculator & Profit Margin Estimator (2026)',
    ogDescription: 'Model Amazon referral tiers, FBA pick & pack fees, shipping overhead, return allowances, and PPC marketing spend.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Amazon FBA Calculator',
          'url': `${SITE_URL}/tools/amazon-fba-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Amazon FBA vs FBM profit and fee calculator supporting 2026 referral fees, fulfillment rates, and storage surcharges.'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': `${SITE_URL}/tools/amazon-fba-calculator` },
            { '@type': 'ListItem', 'position': 3, 'name': 'Amazon FBA Calculator', 'item': `${SITE_URL}/tools/amazon-fba-calculator` }
          ]
        }
      ]
    }
  },

  '/tools/profit-margin-calculator': {
    title: 'E-Commerce Profit Margin Calculator & Wholesale Matrix | SellerKit',
    description: 'Calculate retail selling prices, wholesale costs, keystone pricing, and target gross profit margins from 10% to 90%. Export margin ladders to Excel CSV.',
    keywords: 'ecommerce margin calculator, profit margin calculator, gross margin calculator, wholesale pricing matrix, markup calculator',
    canonical: `${SITE_URL}/tools/profit-margin-calculator`,
    ogTitle: 'E-Commerce Profit Margin & Wholesale Pricing Matrix',
    ogDescription: 'Calculate target profit margins, cost markups, keystone prices, and dollar profit contributions.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'E-Commerce Profit Margin Calculator',
          'url': `${SITE_URL}/tools/profit-margin-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Calculate gross margin, cost markup, keystone pricing tiers, and retail selling price ladders.'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': `${SITE_URL}/tools/profit-margin-calculator` },
            { '@type': 'ListItem', 'position': 3, 'name': 'Profit Margin Calculator', 'item': `${SITE_URL}/tools/profit-margin-calculator` }
          ]
        }
      ]
    }
  },

  '/tools/roas-calculator': {
    title: 'ROAS Calculator (Target & Break-Even ROAS Formula) | SellerKit',
    description: 'Free E-Commerce ROAS & Ad Profitability Calculator. Calculate Break-Even ROAS, Realized ROAS, CAC, and Net Profit on Meta Ads, Google PPC, and Amazon Sponsored Products.',
    keywords: 'target roas calculator, break even roas calculator, roas calculator, ecommerce roas formula, ad profit calculator, cac calculator',
    canonical: `${SITE_URL}/tools/roas-calculator`,
    ogTitle: 'ROAS & Ad Profitability Calculator (Target & Break-Even)',
    ogDescription: 'Calculate break-even ROAS threshold, CAC per order, POAS, and net ad profit across paid traffic campaigns.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'E-Commerce Target & Break-Even ROAS Calculator',
          'url': `${SITE_URL}/tools/roas-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Target and Break-Even ROAS calculator modeling ad revenue, product COGS, platform fees, and CAC.'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': `${SITE_URL}/tools/roas-calculator` },
            { '@type': 'ListItem', 'position': 3, 'name': 'ROAS Calculator', 'item': `${SITE_URL}/tools/roas-calculator` }
          ]
        }
      ]
    }
  },

  '/tools/gst-calculator': {
    title: 'GST Calculator (Inclusive & Exclusive Rate Slabs) | SellerKit',
    description: 'Free GST & Sales Tax Calculator. Calculate GST Inclusive, GST Exclusive, CGST/SGST/IGST tax splits, 5%, 12%, 18%, 28% rate slabs, and invoice breakdowns for e-commerce.',
    keywords: 'gst calculation formula, gst calculator online, gst inclusive calculator, gst exclusive calculator, cgst sgst igst calculator, ecommerce tax calculator',
    canonical: `${SITE_URL}/tools/gst-calculator`,
    ogTitle: 'GST & Sales Tax Calculator (Inclusive & Exclusive Slabs)',
    ogDescription: 'Calculate GST inclusive and exclusive net prices, CGST, SGST, IGST tax splits, and HSN rate slabs for e-commerce orders.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'GST & Sales Tax Calculator',
          'url': `${SITE_URL}/tools/gst-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Calculate GST inclusive and exclusive net prices, CGST/SGST/IGST tax splits, and export itemized invoices.'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': `${SITE_URL}/tools/gst-calculator` },
            { '@type': 'ListItem', 'position': 3, 'name': 'GST Calculator', 'item': `${SITE_URL}/tools/gst-calculator` }
          ]
        }
      ]
    }
  },

  '/tools/etsy-fee-calculator': {
    title: 'Etsy Fee & Profit Calculator (2026) – Real Net Margin Breakdown | SellerKit',
    description: 'Accurate Etsy fee & profit calculator updated for 2026. Calculate $0.20 listing fees, 6.5% transaction cut, payment processing (3% + $0.25), and 15% offsite ads.',
    keywords: 'etsy fee calculator, etsy profit calculator, etsy pricing calculator, etsy listing fee, etsy transaction fee, etsy offsite ads fee',
    canonical: `${SITE_URL}/tools/etsy-fee-calculator`,
    ogTitle: 'Etsy Fee Calculator & Real Net Profit Estimator (2026)',
    ogDescription: 'Calculate listing renewals, 6.5% transaction charges, payment processing fees, and offsite ads impact on your Etsy shop.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Etsy Seller Fee & Profit Calculator',
          'url': `${SITE_URL}/tools/etsy-fee-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Accurate Etsy seller profit calculator calculating listing fees, transaction fees, payment processing, and offsite ads.'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': `${SITE_URL}/tools/etsy-fee-calculator` },
            { '@type': 'ListItem', 'position': 3, 'name': 'Etsy Fee Calculator', 'item': `${SITE_URL}/tools/etsy-fee-calculator` }
          ]
        }
      ]
    }
  },

  '/tools/marketplace-comparison': {
    title: 'Marketplace Comparison Tool – Amazon vs Etsy vs eBay vs Shopify | SellerKit',
    description: 'Compare net profit margins across Amazon, Etsy, eBay, Shopify, and Meesho on a single screen. Find the most profitable sales channel for your products.',
    keywords: 'marketplace fee comparison, amazon vs etsy profit, shopify vs amazon fees, ebay vs etsy calculator',
    canonical: `${SITE_URL}/tools/marketplace-comparison`,
    ogTitle: 'Side-by-Side Marketplace Fee & Profit Comparison',
    ogDescription: 'Side-by-side net profit comparison across 5 major e-commerce platforms.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Multi-Marketplace Comparison Tool',
          'url': `${SITE_URL}/tools/marketplace-comparison`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Compare net profit margin and fee structure between Amazon, Etsy, eBay, Shopify, and Meesho simultaneously.'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': `${SITE_URL}/tools/marketplace-comparison` },
            { '@type': 'ListItem', 'position': 3, 'name': 'Marketplace Comparison', 'item': `${SITE_URL}/tools/marketplace-comparison` }
          ]
        }
      ]
    }
  },

  '/tools/batch-calculator': {
    title: 'Multi-SKU Batch Profit Calculator & Inventory Portfolio Tool | SellerKit',
    description: 'Calculate multi-item inventory profit, cash flow, total revenue, and marketplace cuts across your entire catalog. Export portfolio summaries to CSV.',
    keywords: 'batch profit calculator, sku margin calculator, bulk ecommerce calculator',
    canonical: `${SITE_URL}/tools/batch-calculator`,
    ogTitle: 'Multi-SKU Batch Profit & Inventory Portfolio Calculator',
    ogDescription: 'Simulate full product catalog profitability, gross margins, and inventory capital requirements.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Multi-SKU Batch Profit Calculator',
          'url': `${SITE_URL}/tools/batch-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Bulk product SKU profit calculator and cash flow forecaster with CSV export.'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': `${SITE_URL}/tools/batch-calculator` },
            { '@type': 'ListItem', 'position': 3, 'name': 'Batch Calculator', 'item': `${SITE_URL}/tools/batch-calculator` }
          ]
        }
      ]
    }
  },

  '/tools/product-image-resizer': {
    title: '1:1 Square Product Image Padder & Canvas Resizer | SellerKit',
    description: 'Convert rectangle product photos into clean 1:1 square images for Amazon, Etsy, and Meesho without cropping or distortion. 100% private in-browser tool.',
    keywords: 'product image resizer, square photo padder, amazon 1000x1000 resizer',
    canonical: `${SITE_URL}/tools/product-image-resizer`,
    ogTitle: '1:1 Square Product Image Padder – Free Online Resizer',
    ogDescription: 'Pad non-square product photos into high-resolution 1:1 squares with white, black, custom, or blurred backgrounds.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': '1:1 Square Product Image Padder',
          'url': `${SITE_URL}/tools/product-image-resizer`,
          'applicationCategory': 'MultimediaApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'In-browser product photo resizer and padding utility creating 1:1 square canvas.'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': `${SITE_URL}/tools/product-image-resizer` },
            { '@type': 'ListItem', 'position': 3, 'name': 'Image Padder', 'item': `${SITE_URL}/tools/product-image-resizer` }
          ]
        }
      ]
    }
  },

  '/tools/barcode-generator': {
    title: 'Free Barcode & QR Code Generator – Printable 30-Up Label Sheets | SellerKit',
    description: 'Generate Code 128, EAN-13, UPC-A, Code 39, and QR code barcode labels. Export single high-res PNG/SVG or print standard 30-per-sheet (Avery 5160) labels.',
    keywords: 'barcode generator, free upc barcode maker, code 128 generator, avery 5160 barcode generator',
    canonical: `${SITE_URL}/tools/barcode-generator`,
    ogTitle: 'Free Barcode Generator & Printable 30-Up Label Maker',
    ogDescription: 'Generate barcode labels for Amazon FNSKU, UPC, EAN, and SKU tracking.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Free E-Commerce Barcode & Label Sheet Generator',
          'url': `${SITE_URL}/tools/barcode-generator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Generate industrial barcodes and printable 30-up label sheets.'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': `${SITE_URL}/tools/barcode-generator` },
            { '@type': 'ListItem', 'position': 3, 'name': 'Barcode Generator', 'item': `${SITE_URL}/tools/barcode-generator` }
          ]
        }
      ]
    }
  },

  '/tools/avery-qr-code-generator': {
    title: 'Free Avery QR Code Generator – Printable Label Sheets (5160, 5163, 5164) | SellerKit',
    description: 'Generate free printable QR code label sheets for Avery 5160 (30-up), Avery 5163 (10-up), and Avery 5164 (6-up). Download high-res 300 DPI PNG or print directly in-browser.',
    keywords: 'avery qr code generator, printable qr code labels, avery 5160 qr code, avery 5163 qr code generator, free qr code label maker, qr code sheet generator',
    canonical: `${SITE_URL}/tools/avery-qr-code-generator`,
    ogTitle: 'Free Avery QR Code Generator (Printable 5160 & 5163 Label Sheets)',
    ogDescription: 'Create and print sheets of QR codes formatted for Avery 5160, 5163, and 5164 label paper. 100% free and client-side.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Free Avery QR Code Generator',
          'url': `${SITE_URL}/tools/avery-qr-code-generator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Print custom QR code labels on standard Avery 5160, 5163, and 5164 sheets.'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': `${SITE_URL}/tools/avery-qr-code-generator` },
            { '@type': 'ListItem', 'position': 3, 'name': 'Avery QR Code Generator', 'item': `${SITE_URL}/tools/avery-qr-code-generator` }
          ]
        }
      ]
    }
  },

  '/tools/avery-5160-barcode-generator': {
    title: 'Avery 5160 Barcode Generator – Free Printable 30-Up Label Sheets | SellerKit',
    description: 'Generate Amazon FNSKU and UPC/EAN barcode labels formatted for standard Avery 5160, 5260, and 8160 30-per-page sheets. High-res 300 DPI PNG export.',
    keywords: 'avery 5160 barcode generator, avery 30 up barcode generator, amazon fnsku avery 5160, printable barcode sheet 5160, free avery barcode maker',
    canonical: `${SITE_URL}/tools/avery-5160-barcode-generator`,
    ogTitle: 'Avery 5160 Barcode Generator (30-Up Printable Sheets)',
    ogDescription: 'Generate 1" x 2-5/8" barcode labels formatted for Avery 5160 label sheets. Print Amazon FNSKU, Code 128, and UPC-A labels.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Avery 5160 Barcode Generator',
          'url': `${SITE_URL}/tools/avery-5160-barcode-generator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Generate printable 30-up barcode sheets for Avery 5160 and Amazon FNSKU labels.'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': `${SITE_URL}/tools/avery-5160-barcode-generator` },
            { '@type': 'ListItem', 'position': 3, 'name': 'Avery 5160 Barcode Generator', 'item': `${SITE_URL}/tools/avery-5160-barcode-generator` }
          ]
        }
      ]
    }
  },

  '/tools/fba-shipping-calculator': {
    title: 'Amazon FBA Shipping Calculator (2026) – Inbound Freight & Placement Fees | SellerKit',
    description: 'Calculate Amazon FBA inbound shipping postage, carrier partner freight costs, and 2026 Inbound Placement Service Fee splits ($0.21 - $0.68/unit) per product.',
    keywords: 'fba shipping calculator, amazon inbound placement fee calculator, amazon fba shipping cost, inbound freight calculator amazon fba, fba shipping fee estimator',
    canonical: `${SITE_URL}/tools/fba-shipping-calculator`,
    ogTitle: 'Amazon FBA Shipping & Inbound Freight Calculator (2026)',
    ogDescription: 'Calculate Amazon FBA inbound freight costs, placement fee surcharges, and total landing unit cost.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Amazon FBA Shipping & Inbound Placement Calculator',
          'url': `${SITE_URL}/tools/fba-shipping-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Calculate Amazon FBA inbound freight costs, carrier rates, and placement fees.'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': `${SITE_URL}/tools/fba-shipping-calculator` },
            { '@type': 'ListItem', 'position': 3, 'name': 'FBA Shipping Calculator', 'item': `${SITE_URL}/tools/fba-shipping-calculator` }
          ]
        }
      ]
    }
  },

  '/tools/walmart-fee-calculator': {
    title: 'Walmart Seller Fee & Profit Calculator (2026) – WFS & Referral Margins | SellerKit',
    description: 'Free Walmart Marketplace profit calculator. Model 6%-15% category referral fees, Walmart Fulfillment Services (WFS) rates, storage, ad spend, and net margins.',
    keywords: 'walmart seller profit calculator, walmart fee calculator, walmart marketplace calculator, walmart wfs fee calculator, walmart seller calculator',
    canonical: `${SITE_URL}/tools/walmart-fee-calculator`,
    ogTitle: 'Walmart Marketplace Fee & Profit Margin Calculator (2026)',
    ogDescription: 'Calculate Walmart seller referral fees, WFS fulfillment rates, storage, and net margins.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Walmart Seller Fee & Profit Calculator',
          'url': `${SITE_URL}/tools/walmart-fee-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Calculate Walmart marketplace category referral fees, WFS rates, and seller profit margins.'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': `${SITE_URL}/tools/walmart-fee-calculator` },
            { '@type': 'ListItem', 'position': 3, 'name': 'Walmart Fee Calculator', 'item': `${SITE_URL}/tools/walmart-fee-calculator` }
          ]
        }
      ]
    }
  },

  '/tools/etsy-digital-fee-calculator': {
    title: 'Etsy Digital Product Fee Calculator (2026) – Printables & Downloads | SellerKit',
    description: 'Calculate Etsy seller fees and profit margins for digital downloads, printables, Canva templates, and SVGs with $0 shipping and instant delivery modeling.',
    keywords: 'etsy fee calculator for digital products, etsy digital downloads fee calculator, etsy printable profit calculator, digital etsy seller calculator',
    canonical: `${SITE_URL}/tools/etsy-digital-fee-calculator`,
    ogTitle: 'Etsy Digital Downloads Fee & Profit Calculator (2026)',
    ogDescription: 'Calculate Etsy fees and net profit for digital art, templates, and downloadable printables.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Etsy Digital Product Fee Calculator',
          'url': `${SITE_URL}/tools/etsy-digital-fee-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Calculate Etsy seller fees and profit for instant digital downloads and printables.'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': `${SITE_URL}/tools/etsy-digital-fee-calculator` },
            { '@type': 'ListItem', 'position': 3, 'name': 'Etsy Digital Calculator', 'item': `${SITE_URL}/tools/etsy-digital-fee-calculator` }
          ]
        }
      ]
    }
  },

  /* Short Aliases for Canonical URLs */

  '/walmart-fee-calculator': {
    title: 'Walmart Seller Fee & Profit Calculator (2026) – WFS & Referral Margins | SellerKit',
    description: 'Free Walmart Marketplace profit calculator. Model 6%-15% category referral fees, Walmart Fulfillment Services (WFS) rates, storage, ad spend, and net margins.',
    keywords: 'walmart seller profit calculator, walmart fee calculator, walmart marketplace calculator',
    canonical: `${SITE_URL}/tools/walmart-fee-calculator`,
    ogTitle: 'Walmart Marketplace Fee & Profit Margin Calculator (2026)',
    ogDescription: 'Calculate Walmart seller referral fees, WFS fulfillment rates, storage, and net margins.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Walmart Seller Fee & Profit Calculator',
          'url': `${SITE_URL}/walmart-fee-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Calculate Walmart marketplace category referral fees, WFS rates, and seller profit margins.'
        }
      ]
    }
  },

  '/etsy-digital-fee-calculator': {
    title: 'Etsy Digital Product Fee Calculator (2026) – Printables & Downloads | SellerKit',
    description: 'Calculate Etsy seller fees and profit margins for digital downloads, printables, Canva templates, and SVGs with $0 shipping and instant delivery modeling.',
    keywords: 'etsy fee calculator for digital products, etsy digital downloads fee calculator',
    canonical: `${SITE_URL}/tools/etsy-digital-fee-calculator`,
    ogTitle: 'Etsy Digital Downloads Fee & Profit Calculator (2026)',
    ogDescription: 'Calculate Etsy fees and net profit for digital art, templates, and downloadable printables.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Etsy Digital Product Fee Calculator',
          'url': `${SITE_URL}/etsy-digital-fee-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Calculate Etsy seller fees and profit for instant digital downloads and printables.'
        }
      ]
    }
  },

  '/avery-qr-code-generator': {
    title: 'Free Avery QR Code Generator – Printable Label Sheets (5160, 5163, 5164) | SellerKit',
    description: 'Generate free printable QR code label sheets for Avery 5160 (30-up), Avery 5163 (10-up), and Avery 5164 (6-up). Download high-res 300 DPI PNG.',
    keywords: 'avery qr code generator, printable qr code labels, avery 5160 qr code, free qr code label maker',
    canonical: `${SITE_URL}/tools/avery-qr-code-generator`,
    ogTitle: 'Free Avery QR Code Generator (Printable 5160 & 5163 Label Sheets)',
    ogDescription: 'Create and print sheets of QR codes formatted for Avery label paper.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Free Avery QR Code Generator',
          'url': `${SITE_URL}/avery-qr-code-generator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Print custom QR code labels on standard Avery sheets.'
        }
      ]
    }
  },

  '/avery-5160-barcode-generator': {
    title: 'Avery 5160 Barcode Generator – Free Printable 30-Up Label Sheets | SellerKit',
    description: 'Generate Amazon FNSKU and UPC/EAN barcode labels formatted for standard Avery 5160 30-per-page sheets. High-res 300 DPI PNG export.',
    keywords: 'avery 5160 barcode generator, avery 30 up barcode generator, amazon fnsku avery 5160',
    canonical: `${SITE_URL}/tools/avery-5160-barcode-generator`,
    ogTitle: 'Avery 5160 Barcode Generator (30-Up Printable Sheets)',
    ogDescription: 'Generate 1" x 2-5/8" barcode labels formatted for Avery 5160 label sheets.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Avery 5160 Barcode Generator',
          'url': `${SITE_URL}/avery-5160-barcode-generator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Generate printable 30-up barcode sheets for Avery 5160 labels.'
        }
      ]
    }
  },

  '/fba-shipping-calculator': {
    title: 'Amazon FBA Shipping Calculator (2026) – Inbound Freight & Placement Fees | SellerKit',
    description: 'Calculate Amazon FBA inbound shipping postage, carrier partner freight costs, and 2026 Inbound Placement Service Fee splits ($0.21 - $0.68/unit) per product.',
    keywords: 'fba shipping calculator, amazon inbound placement fee calculator, amazon fba shipping cost',
    canonical: `${SITE_URL}/tools/fba-shipping-calculator`,
    ogTitle: 'Amazon FBA Shipping & Inbound Freight Calculator (2026)',
    ogDescription: 'Calculate Amazon FBA inbound freight costs, placement fee surcharges, and total landing unit cost.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Amazon FBA Shipping & Inbound Placement Calculator',
          'url': `${SITE_URL}/fba-shipping-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Calculate Amazon FBA inbound freight costs, carrier rates, and placement fees.'
        }
      ]
    }
  },

  '/etsy-fee-calculator': {
    title: 'Etsy Fee & Profit Calculator (2026) – Real Net Margin Breakdown | SellerKit',
    description: 'Accurate Etsy fee & profit calculator updated for 2026. Calculate $0.20 listing fees, 6.5% transaction cut, payment processing (3% + $0.25), and 15% offsite ads.',
    keywords: 'etsy fee calculator, etsy profit calculator, etsy pricing calculator',
    canonical: `${SITE_URL}/tools/etsy-fee-calculator`,
    ogTitle: 'Etsy Fee Calculator & Real Net Profit Estimator (2026)',
    ogDescription: 'Calculate listing renewals, 6.5% transaction charges, payment processing fees, and offsite ads impact.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Etsy Seller Fee & Profit Calculator',
          'url': `${SITE_URL}/etsy-fee-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Accurate Etsy seller profit calculator calculating listing fees, transaction fees, and offsite ads.'
        }
      ]
    }
  },

  '/amazon-fee-calculator': {
    title: 'Amazon FBA vs FBM Fee & Profit Margin Calculator (2026) | SellerKit',
    description: 'Compare Amazon FBA vs FBM profitability side-by-side. Includes 8-15% referral fee tiers, weight handling rates, inbound placement, and monthly storage.',
    keywords: 'amazon fba calculator, amazon fee calculator, fba vs fbm profit',
    canonical: `${SITE_URL}/tools/amazon-fba-calculator`,
    ogTitle: 'Amazon FBA vs FBM Fee & Profit Margin Calculator (2026)',
    ogDescription: 'Model Amazon referral tiers, FBA pick & pack fees, shipping overhead, return allowances, and PPC marketing spend.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Amazon FBA vs FBM Profit Calculator',
          'url': `${SITE_URL}/amazon-fee-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Comprehensive Amazon FBA and FBM seller fee and net margin calculator.'
        }
      ]
    }
  },

  '/margin-matrix': {
    title: 'Wholesale Profit Margin & Markup Pricing Matrix | SellerKit',
    description: 'Calculate tiered retail selling prices, wholesale costs, keystone pricing, and target gross margins from 10% to 90%. Includes instant CSV export.',
    keywords: 'margin markup matrix, wholesale pricing matrix, gross margin calculator',
    canonical: `${SITE_URL}/tools/profit-margin-calculator`,
    ogTitle: 'Wholesale Profit Margin & Markup Pricing Matrix',
    ogDescription: 'View the complete price ladder from wholesale cost to retail price across every target gross margin tier.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Wholesale Margin & Markup Matrix',
          'url': `${SITE_URL}/margin-matrix`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Interactive profit margin and markup table showing exact pricing tiers.'
        }
      ]
    }
  },

  '/roas-calculator': {
    title: 'ROAS Calculator (Target & Break-Even ROAS Formula) | SellerKit',
    description: 'Free E-Commerce ROAS & Ad Profitability Calculator. Calculate Break-Even ROAS, Realized ROAS, CAC, and Net Profit on Meta Ads, Google PPC, and Amazon Sponsored Products.',
    keywords: 'target roas calculator, break even roas calculator, roas calculator',
    canonical: `${SITE_URL}/tools/roas-calculator`,
    ogTitle: 'ROAS & Ad Profitability Calculator (Target & Break-Even)',
    ogDescription: 'Calculate break-even ROAS threshold, CAC per order, POAS, and net ad profit.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Target & Break-Even ROAS Calculator',
          'url': `${SITE_URL}/roas-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Target and Break-Even ROAS calculator modeling ad revenue, product COGS, and CAC.'
        }
      ]
    }
  },

  '/gst-calculator': {
    title: 'GST Calculator (Inclusive & Exclusive Rate Slabs) | SellerKit',
    description: 'Free GST & Sales Tax Calculator. Calculate GST Inclusive, GST Exclusive, CGST/SGST/IGST tax splits, 5%, 12%, 18%, 28% rate slabs, and invoice breakdowns.',
    keywords: 'gst calculation formula, gst calculator online, gst inclusive calculator',
    canonical: `${SITE_URL}/tools/gst-calculator`,
    ogTitle: 'GST & Sales Tax Calculator (Inclusive & Exclusive Slabs)',
    ogDescription: 'Calculate GST inclusive and exclusive net prices, CGST, SGST, IGST tax splits, and HSN rate slabs.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'GST & Sales Tax Calculator',
          'url': `${SITE_URL}/gst-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Calculate GST inclusive and exclusive net prices, CGST/SGST/IGST tax splits.'
        }
      ]
    }
  },

  '/marketplace-comparison': {
    title: 'Marketplace Comparison Tool – Amazon vs Etsy vs eBay vs Shopify | SellerKit',
    description: 'Compare net profit margins across Amazon, Etsy, eBay, Shopify, and Meesho on a single screen. Find the most profitable sales channel for your products.',
    keywords: 'marketplace fee comparison, amazon vs etsy profit, shopify vs amazon fees',
    canonical: `${SITE_URL}/tools/marketplace-comparison`,
    ogTitle: 'Side-by-Side Marketplace Fee & Profit Comparison',
    ogDescription: 'Side-by-side net profit comparison across 5 major e-commerce platforms.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Multi-Marketplace Comparison Tool',
          'url': `${SITE_URL}/marketplace-comparison`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Compare net profit margin and fee structure between Amazon, Etsy, eBay, Shopify, and Meesho.'
        }
      ]
    }
  },

  '/batch-calculator': {
    title: 'Multi-SKU Batch Profit Calculator & Inventory Portfolio Tool | SellerKit',
    description: 'Calculate multi-item inventory profit, cash flow, total revenue, and marketplace cuts across your entire catalog. Export portfolio summaries to CSV.',
    keywords: 'batch profit calculator, sku margin calculator, bulk ecommerce calculator',
    canonical: `${SITE_URL}/tools/batch-calculator`,
    ogTitle: 'Multi-SKU Batch Profit & Inventory Portfolio Calculator',
    ogDescription: 'Simulate full product catalog profitability, gross margins, and inventory capital requirements.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Multi-SKU Batch Profit Calculator',
          'url': `${SITE_URL}/batch-calculator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Bulk product SKU profit calculator and cash flow forecaster with CSV export.'
        }
      ]
    }
  },

  '/product-image-resizer': {
    title: '1:1 Square Product Image Padder & Canvas Resizer | SellerKit',
    description: 'Convert rectangle product photos into clean 1:1 square images for Amazon, Etsy, and Meesho without cropping or distortion. 100% private in-browser tool.',
    keywords: 'product image resizer, square photo padder, amazon 1000x1000 resizer',
    canonical: `${SITE_URL}/tools/product-image-resizer`,
    ogTitle: '1:1 Square Product Image Padder – Free Online Resizer',
    ogDescription: 'Pad non-square product photos into high-resolution 1:1 squares with white, black, custom, or blurred backgrounds.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': '1:1 Square Product Image Padder',
          'url': `${SITE_URL}/product-image-resizer`,
          'applicationCategory': 'MultimediaApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'In-browser product photo resizer and padding utility creating 1:1 square canvas.'
        }
      ]
    }
  },

  '/barcode-generator': {
    title: 'Free Barcode & QR Code Generator – Printable 30-Up Label Sheets | SellerKit',
    description: 'Generate Code 128, EAN-13, UPC-A, Code 39, and QR code barcode labels. Export single high-res PNG/SVG or print standard 30-per-sheet (Avery 5160) labels.',
    keywords: 'barcode generator, free upc barcode maker, code 128 generator',
    canonical: `${SITE_URL}/tools/barcode-generator`,
    ogTitle: 'Free Barcode Generator & Printable 30-Up Label Maker',
    ogDescription: 'Generate barcode labels for Amazon FNSKU, UPC, EAN, and SKU tracking.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'SoftwareApplication',
          'name': 'Free E-Commerce Barcode & Label Sheet Generator',
          'url': `${SITE_URL}/barcode-generator`,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': 'Generate industrial barcodes and printable 30-up label sheets.'
        }
      ]
    }
  },

  '/blog': {
    title: 'SellerKit Blog – E-Commerce Guides & Growth Analytics',
    description: 'Read in-depth guides on Amazon FBA fee changes, Etsy seller fees, profit margin vs cost markup pricing formulas, and product photo optimization.',
    keywords: 'ecommerce blog, amazon seller blog, etsy fee guide, ecommerce pricing strategies, fba fee changes 2026',
    canonical: `${SITE_URL}/blog`,
    ogTitle: 'SellerKit Blog – E-Commerce Strategy & Fee Insights',
    ogDescription: 'Actionable seller analytics and growth guides for Amazon, Etsy, eBay, and Shopify sellers.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'Blog',
          'name': 'SellerKit E-Commerce Blog',
          'url': `${SITE_URL}/blog`,
          'description': 'E-Commerce fee breakdowns, seller analytics, and profit margin strategy guides.'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': `${SITE_URL}/blog` }
          ]
        }
      ]
    }
  },

  '/blog/amazon-fba-fee-changes-2026': {
    title: 'Amazon FBA Fee Changes & Inbound Placement Guide (2026)',
    description: 'Detailed analysis of 2026 Amazon FBA referral fee adjustments, inbound placement charges, low-inventory-level fees, and storage rate updates.',
    keywords: '2026 amazon fba fee changes, amazon inbound placement fee, low inventory fee amazon 2026',
    canonical: `${SITE_URL}/blog/amazon-fba-fee-changes-2026`,
    ogTitle: 'Amazon FBA Fee Changes & Inbound Placement Fees in 2026',
    ogDescription: 'Complete seller guide analyzing 2026 Amazon FBA fee updates and inbound placement charges.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'BlogPosting',
          'headline': 'Amazon FBA Fee Changes & Inbound Placement Fees in 2026',
          'url': `${SITE_URL}/blog/amazon-fba-fee-changes-2026`,
          'datePublished': '2026-02-15',
          'author': { '@id': `${SITE_URL}/#organization` }
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': `${SITE_URL}/blog` },
            { '@type': 'ListItem', 'position': 3, 'name': 'Amazon FBA Fee Changes 2026', 'item': `${SITE_URL}/blog/amazon-fba-fee-changes-2026` }
          ]
        }
      ]
    }
  },

  '/blog/etsy-seller-fee-breakdown-guide': {
    title: 'Etsy Seller Fee Structure 2026: Listing Fees & Offsite Ads',
    description: 'Comprehensive guide breaking down Etsy listing fees, 6.5% transaction cuts, payment processing rates, and Offsite Ads commission tiers.',
    keywords: 'etsy fee breakdown 2026, etsy transaction fee 6.5, etsy offsite ads fee 15 percent',
    canonical: `${SITE_URL}/blog/etsy-seller-fee-breakdown-guide`,
    ogTitle: 'Etsy Seller Fee Structure 2026: Listing Fees & Offsite Ads',
    ogDescription: 'Calculate listing renewals, transaction cuts, payment processing, and offsite ads impact on your Etsy shop.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'BlogPosting',
          'headline': 'Etsy Seller Fee Structure 2026: Listing Fees & Offsite Ads',
          'url': `${SITE_URL}/blog/etsy-seller-fee-breakdown-guide`,
          'datePublished': '2026-02-10',
          'author': { '@id': `${SITE_URL}/#organization` }
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': `${SITE_URL}/blog` },
            { '@type': 'ListItem', 'position': 3, 'name': 'Etsy Fee Structure Guide', 'item': `${SITE_URL}/blog/etsy-seller-fee-breakdown-guide` }
          ]
        }
      ]
    }
  },

  '/blog/ecommerce-pricing-strategies-margin-vs-markup': {
    title: 'Margin vs. Markup in E-Commerce: Pricing for 50%+ Margins',
    description: 'Learn the mathematical difference between gross margin and cost markup, keystone pricing rules, and how to price products for 50%+ profit margins.',
    keywords: 'margin vs markup ecommerce, keystone pricing formula, gross profit margin calculation',
    canonical: `${SITE_URL}/blog/ecommerce-pricing-strategies-margin-vs-markup`,
    ogTitle: 'Margin vs. Markup in E-Commerce: Pricing for 50%+ Margins',
    ogDescription: 'Learn why confusing margin and markup ruins profitability, and how to use keystone pricing.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'BlogPosting',
          'headline': 'Margin vs. Markup in E-Commerce: Pricing for 50%+ Margins',
          'url': `${SITE_URL}/blog/ecommerce-pricing-strategies-margin-vs-markup`,
          'datePublished': '2026-01-28',
          'author': { '@id': `${SITE_URL}/#organization` }
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': `${SITE_URL}/blog` },
            { '@type': 'ListItem', 'position': 3, 'name': 'Margin vs Markup Guide', 'item': `${SITE_URL}/blog/ecommerce-pricing-strategies-margin-vs-markup` }
          ]
        }
      ]
    }
  },

  '/blog/how-to-optimize-product-images-for-amazon-etsy': {
    title: 'How to Optimize 1:1 Square Product Photos for Amazon & Etsy',
    description: 'Tutorial on padding rectangular photos, meeting Amazon pure white background compliance, rotating phone photos, and improving mobile click-through rates.',
    keywords: 'optimize product photos amazon, etsy square product photos, mobile grid image padding',
    canonical: `${SITE_URL}/blog/how-to-optimize-product-images-for-amazon-etsy`,
    ogTitle: 'How to Optimize 1:1 Square Product Photos for Amazon & Etsy',
    ogDescription: 'Learn how 1:1 square photo padding and upright rotation boost mobile search click-through rates.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'BlogPosting',
          'headline': 'How to Optimize 1:1 Square Product Photos for Amazon & Etsy',
          'url': `${SITE_URL}/blog/how-to-optimize-product-images-for-amazon-etsy`,
          'datePublished': '2026-01-18',
          'author': { '@id': `${SITE_URL}/#organization` }
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': `${SITE_URL}/blog` },
            { '@type': 'ListItem', 'position': 3, 'name': 'Product Photo Optimization', 'item': `${SITE_URL}/blog/how-to-optimize-product-images-for-amazon-etsy` }
          ]
        }
      ]
    }
  },

  '/fee-updates': {
    title: '2026 E-Commerce Marketplace Fee Updates & Rate Schedule | SellerKit',
    description: 'Comprehensive 2026 fee update guide for Amazon FBA, Etsy, eBay, Shopify, and Meesho. Stay ahead of referral changes, storage rate hikes, and policy updates.',
    keywords: '2026 amazon fee changes, etsy fee updates 2026, ebay fee schedule 2026, marketplace fee changes, ecommerce seller policy updates',
    canonical: `${SITE_URL}/fee-updates`,
    ogTitle: '2026 E-Commerce Marketplace Fee Schedule & Update Hub',
    ogDescription: 'Complete reference of official 2026 fee updates across Amazon, Etsy, eBay, Shopify, and Meesho.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'Article',
          'headline': '2026 E-Commerce Marketplace Fee Updates & Policy Guide',
          'url': `${SITE_URL}/fee-updates`,
          'description': 'Up-to-date breakdown of Amazon, Etsy, eBay, Shopify, and Meesho seller fee adjustments in 2026.',
          'author': { '@id': `${SITE_URL}/#organization` }
        }
      ]
    }
  },

  '/about': {
    title: 'About SellerKitHub – Mission & Client-Side Privacy Commitment | SellerKit',
    description: 'Learn how SellerKitHub provides 100% free, private, client-side tools and financial calculators to empower e-commerce sellers worldwide.',
    keywords: 'about sellerkithub, ecommerce seller tools mission, free amazon calculator creator',
    canonical: `${SITE_URL}/about`,
    ogTitle: 'About SellerKitHub – Free E-Commerce Utilities',
    ogDescription: 'Our mission is to level the playing field for e-commerce entrepreneurs with private, 100% client-side calculation utilities.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'AboutPage',
          'name': 'About SellerKitHub',
          'url': `${SITE_URL}/about`,
          'description': 'Mission, background, and privacy commitment of SellerKitHub.'
        }
      ]
    }
  },

  '/contact': {
    title: 'Contact SellerKitHub – Feedback, Feature Requests & Support | SellerKit',
    description: 'Get in touch with the SellerKitHub team. Suggest new marketplace fee calculators, report calculation bugs, or submit feature requests.',
    keywords: 'contact sellerkithub, sellerkit support, fee calculator feedback',
    canonical: `${SITE_URL}/contact`,
    ogTitle: 'Contact SellerKitHub Support & Feedback',
    ogDescription: 'Contact the SellerKit team for inquiries, bug reports, and marketplace calculator suggestions.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'ContactPage',
          'name': 'Contact SellerKitHub',
          'url': `${SITE_URL}/contact`
        }
      ]
    }
  },

  '/privacy-policy': {
    title: 'Privacy Policy & Data Protection | SellerKitHub',
    description: 'SellerKitHub is designed with strict client-side data privacy. We never store, collect, or transmit your proprietary product cost or margin data.',
    keywords: 'sellerkithub privacy policy, client side data security',
    canonical: `${SITE_URL}/privacy-policy`,
    ogTitle: 'Privacy Policy – SellerKitHub',
    ogDescription: 'Read our transparent privacy commitment. 100% client-side computations guarantee your financial numbers stay private on your device.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'WebPage',
          'name': 'SellerKitHub Privacy Policy',
          'url': `${SITE_URL}/privacy-policy`
        }
      ]
    }
  },

  '/terms': {
    title: 'Terms of Service & Calculations Disclaimer | SellerKitHub',
    description: 'Terms of service and fee calculation accuracy disclaimer for using SellerKitHub calculators and seller utilities.',
    keywords: 'sellerkithub terms of service, calculator disclaimer',
    canonical: `${SITE_URL}/terms`,
    ogTitle: 'Terms of Service – SellerKitHub',
    ogDescription: 'Read the terms of use and calculations disclaimer for SellerKitHub.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        ORGANIZATION_SCHEMA,
        {
          '@type': 'WebPage',
          'name': 'SellerKitHub Terms of Service',
          'url': `${SITE_URL}/terms`
        }
      ]
    }
  },

  /* Error Routes */

  '/404': {
    title: '404 - Page Not Found | SellerKitHub',
    description: 'The requested page could not be found. Search or browse our free e-commerce calculators for Amazon FBA, Etsy, ROAS, and GST.',
    keywords: '404 page not found, sellerkithub error',
    canonical: `${SITE_URL}/404`,
    ogTitle: '404 - Page Not Found | SellerKitHub',
    ogDescription: 'The page you requested does not exist.'
  },

  '/500': {
    title: '500 - Internal Server Error | SellerKitHub',
    description: 'An unexpected technical glitch occurred. Refresh the page or return to SellerKitHub home.',
    keywords: '500 server error, sellerkithub error',
    canonical: `${SITE_URL}/500`,
    ogTitle: '500 - Internal Server Error | SellerKitHub',
    ogDescription: 'Internal server error fallback page.'
  },

  '/400': {
    title: '400 - Bad Request | SellerKitHub',
    description: 'Invalid request parameters or malformed inputs.',
    keywords: '400 bad request, sellerkithub error',
    canonical: `${SITE_URL}/400`,
    ogTitle: '400 - Bad Request | SellerKitHub',
    ogDescription: 'Bad request fallback page.'
  }
};
