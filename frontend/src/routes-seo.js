export const SITE_URL = 'https://sellerkithub.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon.svg`;

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
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          'url': `${SITE_URL}/`,
          'name': 'SellerKit Hub',
          'description': 'Free E-Commerce Seller Utilities & Fee Calculators',
          'potentialAction': {
            '@type': 'SearchAction',
            'target': `${SITE_URL}/?s={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@type': 'WebApplication',
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

  '/etsy-fee-calculator': {
    title: 'Etsy Fee & Profit Calculator (2026) – Real Net Margin Breakdown | SellerKit',
    description: 'Accurate Etsy fee & profit calculator updated for 2026. Calculate $0.20 listing fees, 6.5% transaction cut, payment processing (3% + $0.25), and 15% offsite ads.',
    keywords: 'etsy fee calculator, etsy profit calculator, etsy pricing calculator, etsy listing fee, etsy transaction fee, etsy offsite ads fee, sell on etsy profit',
    canonical: `${SITE_URL}/etsy-fee-calculator`,
    ogTitle: 'Etsy Fee Calculator & Real Net Profit Estimator (2026)',
    ogDescription: 'Calculate listing renewals, 6.5% transaction charges, payment processing fees, and offsite ads impact on your handmade & vintage Etsy shop.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Etsy Seller Fee & Profit Calculator',
      'url': `${SITE_URL}/etsy-fee-calculator`,
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'All',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'description': 'Accurate Etsy seller profit calculator calculating listing fees, transaction fees, payment processing, offsite ads, and material costs with instant Excel export.'
    }
  },

  '/amazon-fee-calculator': {
    title: 'Amazon FBA vs FBM Fee & Profit Margin Calculator (2026) | SellerKit',
    description: 'Compare Amazon FBA vs FBM profitability side-by-side. Includes 8-15% referral fee tiers, weight handling rates, inbound placement, and monthly storage.',
    keywords: 'amazon fba calculator, amazon fee calculator, fba vs fbm profit, amazon seller fees, amazon referral fee calculator, amazon margin calculator',
    canonical: `${SITE_URL}/amazon-fee-calculator`,
    ogTitle: 'Amazon FBA vs FBM Fee & Profit Margin Calculator (2026)',
    ogDescription: 'Model Amazon referral tiers, FBA pick & pack fees, shipping overhead, return allowances, and PPC marketing spend.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Amazon FBA vs FBM Profit Calculator',
      'url': `${SITE_URL}/amazon-fee-calculator`,
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'All',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'description': 'Comprehensive Amazon FBA and FBM seller fee and net margin calculator with category referral rates and storage costs.'
    }
  },

  '/marketplace-comparison': {
    title: 'Marketplace Comparison Tool – Amazon vs Etsy vs eBay vs Shopify | SellerKit',
    description: 'Compare net profit margins across Amazon, Etsy, eBay, Shopify, and Meesho on a single screen. Find the most profitable sales channel for your products.',
    keywords: 'marketplace fee comparison, amazon vs etsy profit, shopify vs amazon fees, ebay vs etsy calculator, ecommerce platform comparison',
    canonical: `${SITE_URL}/marketplace-comparison`,
    ogTitle: 'Side-by-Side Marketplace Fee & Profit Comparison',
    ogDescription: 'Side-by-side net profit comparison across 5 major e-commerce platforms. See exactly where your products make the highest return.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Multi-Marketplace Comparison Tool',
      'url': `${SITE_URL}/marketplace-comparison`,
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'All',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'description': 'Compare net profit margin and fee structure between Amazon, Etsy, eBay, Shopify, and Meesho simultaneously.'
    }
  },

  '/batch-calculator': {
    title: 'Multi-SKU Batch Profit Calculator & Inventory Portfolio Tool | SellerKit',
    description: 'Calculate multi-item inventory profit, cash flow, total revenue, and marketplace cuts across your entire catalog. Export portfolio summaries to CSV.',
    keywords: 'batch profit calculator, sku margin calculator, bulk ecommerce calculator, inventory profit model, multi sku calculator',
    canonical: `${SITE_URL}/batch-calculator`,
    ogTitle: 'Multi-SKU Batch Profit & Inventory Portfolio Calculator',
    ogDescription: 'Simulate full product catalog profitability, gross margins, and inventory capital requirements in one bulk tool.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Multi-SKU Batch Profit Calculator',
      'url': `${SITE_URL}/batch-calculator`,
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'All',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'description': 'Bulk product SKU profit calculator and cash flow forecaster with CSV export capabilities.'
    }
  },

  '/product-image-resizer': {
    title: '1:1 Square Product Image Padder & Canvas Resizer | SellerKit',
    description: 'Convert rectangle product photos into clean 1:1 square images for Amazon, Etsy, and Meesho without cropping or distortion. 100% private in-browser tool.',
    keywords: 'product image resizer, square photo padder, amazon 1000x1000 resizer, etsy photo padder, square image maker without cropping',
    canonical: `${SITE_URL}/product-image-resizer`,
    ogTitle: '1:1 Square Product Image Padder – Free Online Resizer',
    ogDescription: 'Pad non-square product photos into high-resolution 1:1 squares with white, black, custom, or blurred backgrounds. Zero upload to servers.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': '1:1 Square Product Image Padder',
      'url': `${SITE_URL}/product-image-resizer`,
      'applicationCategory': 'MultimediaApplication',
      'operatingSystem': 'All',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'description': 'In-browser product photo resizer and padding utility creating 1:1 square canvas without cropping or server uploads.'
    }
  },

  '/barcode-generator': {
    title: 'Free Barcode & QR Code Generator – Printable 30-Up Label Sheets | SellerKit',
    description: 'Generate Code 128, EAN-13, UPC-A, Code 39, and QR code barcode labels. Export single high-res PNG/SVG or print standard 30-per-sheet (Avery 5160) labels.',
    keywords: 'barcode generator, free upc barcode maker, code 128 generator, 30 up label generator, fba barcode maker, ean 13 generator',
    canonical: `${SITE_URL}/barcode-generator`,
    ogTitle: 'Free Barcode Generator & Printable 30-Up Label Maker',
    ogDescription: 'Generate barcode labels for Amazon FNSKU, UPC, EAN, and SKU tracking with instant 30-up Avery label sheet PDF printing.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Free E-Commerce Barcode & Label Sheet Generator',
      'url': `${SITE_URL}/barcode-generator`,
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'All',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'description': 'Generate industrial barcodes and printable 30-up label sheets for Amazon FBA, retail inventory, and shipping packages.'
    }
  },

  '/margin-matrix': {
    title: 'Wholesale Profit Margin & Markup Pricing Matrix | SellerKit',
    description: 'Calculate tiered retail selling prices, wholesale costs, keystone pricing, and target gross margins from 10% to 90%. Includes instant CSV export.',
    keywords: 'margin markup matrix, wholesale pricing matrix, gross margin calculator, retail markup table, keystone pricing formula',
    canonical: `${SITE_URL}/margin-matrix`,
    ogTitle: 'Wholesale Profit Margin & Markup Pricing Matrix',
    ogDescription: 'View the complete price ladder from wholesale cost to retail price across every target gross margin tier.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Wholesale Margin & Markup Matrix',
      'url': `${SITE_URL}/margin-matrix`,
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'All',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'description': 'Interactive profit margin and markup table showing exact pricing tiers from 10% to 90% margin.'
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
      '@type': 'Article',
      'headline': '2026 E-Commerce Marketplace Fee Updates & Policy Guide',
      'url': `${SITE_URL}/fee-updates`,
      'description': 'Up-to-date breakdown of Amazon, Etsy, eBay, Shopify, and Meesho seller fee adjustments in 2026.',
      'author': {
        '@type': 'Organization',
        'name': 'SellerKit'
      }
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
      '@type': 'AboutPage',
      'name': 'About SellerKitHub',
      'url': `${SITE_URL}/about`,
      'description': 'Mission, background, and privacy commitment of SellerKitHub.'
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
      '@type': 'ContactPage',
      'name': 'Contact SellerKitHub',
      'url': `${SITE_URL}/contact`
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
      '@type': 'WebPage',
      'name': 'SellerKitHub Privacy Policy',
      'url': `${SITE_URL}/privacy-policy`
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
      '@type': 'WebPage',
      'name': 'SellerKitHub Terms of Service',
      'url': `${SITE_URL}/terms`
    }
  }
};
