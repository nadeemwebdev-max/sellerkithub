# SellerKit Hub (SellerKitHub.com) 🚀

[![Live Website](https://img.shields.io/badge/Website-sellerkithub.com-4f46e5?style=flat-square&logo=cloudflare)](https://sellerkithub.com)
[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat-square&logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Cloudflare Pages](https://img.shields.io/badge/Deployment-Cloudflare%20Pages-F38020?style=flat-square&logo=cloudflare-pages)](https://pages.cloudflare.com)

A high-performance, 100% client-side multi-tool static web application built for online e-commerce sellers across **Amazon, Etsy, eBay, Walmart, Shopify, and Meesho**.

---

## 🌍 Internationalization (i18n) & Multi-Language Support

SellerKit Hub is pre-rendered with static multi-language routes (`[lang]`) and full `hreflang` alternate tags to rank for localized e-commerce search keywords worldwide:

| Language | Locale Prefix | Sample URL | Default Currency |
| :--- | :---: | :--- | :---: |
| **English** | `/` (Default) | `https://sellerkithub.com/` | `USD ($)` |
| **Español** (Spanish) | `/es` | `https://sellerkithub.com/es/` | `EUR (€)` |
| **日本語** (Japanese) | `/ja` | `https://sellerkithub.com/ja/` | `JPY (¥)` |
| **Français** (French) | `/fr` | `https://sellerkithub.com/fr/` | `EUR (€)` |
| **Deutsch** (German) | `/de` | `https://sellerkithub.com/de/` | `EUR (€)` |
| **Português** (Portuguese) | `/pt` | `https://sellerkithub.com/pt/` | `BRL (R$)` |
| **한국어** (Korean) | `/ko` | `https://sellerkithub.com/ko/` | `KRW (₩)` |
| **Italiano** (Italian) | `/it` | `https://sellerkithub.com/it/` | `EUR (€)` |

- **International SEO**: Automatic `hreflang` tags generated for all 8 languages + `x-default` on all 203 pre-rendered static routes.
- **Multi-Currency Engine**: Intelligent default currency per language with manual session override preservation across all calculators.

---

## 🌟 Included Suite of Tools & Micro-Utilities

### 📊 Fee & Profit Calculators
1. **Multi-Marketplace Profit Calculator (`/`)** – Live profit margin slider, dynamic cost breakdowns, platform cuts, and net ROI calculations.
2. **Side-by-Side Marketplace Comparison (`/tools/marketplace-comparison`)** – Compares and ranks take-home net profit across Amazon FBA, Amazon FBM, Etsy, eBay, Walmart, and Shopify.
3. **Multi-SKU Batch Profit Calculator (`/tools/batch-calculator`)** – Multi-row product portfolio cash flow forecaster, Master Catalog Management Guide, Catalog Portfolio Tier Matrix, and CSV export.
4. **Amazon FBA Fee Calculator (`/tools/amazon-fba-calculator`)** – FBA fulfillment fees, referral fees, closing fees, and storage rate comparisons.
5. **Amazon FBA Shipping Cost Calculator (`/tools/fba-shipping-calculator`)** – Inbound shipping, dimensional weight, and freight cost breakdown.
6. **Etsy Fee & Profit Calculator (`/tools/etsy-fee-calculator`)** – 6.5% transaction fees, $0.20 listing renewals, payment processing fees, and offsite ads modeling.
7. **Etsy Digital Product Fee Calculator (`/tools/etsy-digital-fee-calculator`)** – Instant profit modeling for zero-COGS digital downloads and printables.
8. **Walmart Marketplace Fee Calculator (`/tools/walmart-fee-calculator`)** – Category-specific referral fee calculation and WFS fulfillment modeling.
9. **Target & Break-Even ROAS Calculator (`/tools/roas-calculator`)** – Paid ads profitability, target ROAS, maximum allowable CAC, and net margin after advertising spend.
10. **Universal GST / VAT / Sales Tax Calculator (`/tools/gst-calculator`)** – Inclusive/exclusive sales tax calculations, CGST/SGST/IGST splits, and invoice breakdowns.
11. **Profit Margin & Wholesale Markup Matrix (`/tools/profit-margin-calculator`)** – Tiered wholesale price points, cost-plus formulas, and margin ladders.

### 🏷️ Barcode, Label & Media Utilities
12. **Barcode & QR Code Generator (`/tools/barcode-generator`)** – Code 128, EAN-13, UPC-A, ITF-14, and ISO QR codes with high-res PNG and SVG download.
13. **Avery 5160 Barcode Label Sheet Maker (`/tools/avery-5160-barcode-generator`)** – Standard 30-up (1" x 2-5/8") printable barcode sticker sheets formatted for Avery 5160/8160.
14. **Avery QR Code Label Sheet Maker (`/tools/avery-qr-code-generator`)** – Printable grid sheets for inventory labels and packaging QR codes.
15. **1:1 Square Product Image Resizer (`/tools/product-image-resizer`)** – 100% client-side HTML5 Canvas padder (1000px/2000px) with pure white background for Amazon/Etsy compliance.

### 📚 Resources & Guides
16. **2026 Marketplace Fee Update Center (`/fee-updates`)** – Up-to-date fee schedules, policy changes, and structured FAQ schema.
17. **E-Commerce Blog & Seller Knowledge Base (`/blog`)** – Strategy guides, unit economics tutorials, and catalog optimization articles.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: [Astro 5 (Static Site Generator / SSG)](https://astro.build) + [React 18](https://reactjs.org)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com) + Dark / Light mode instant preloader
- **Icons**: [Lucide React](https://lucide.dev)
- **Hydration Strategy**: `client:idle` (ensures < 1.0s mobile FCP/LCP and 0ms TBT)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com) via [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- **SEO & Schemas**: JSON-LD Schema.org (`SoftwareApplication`, `WebSite`, `BreadcrumbList`, `FAQPage`), XML Sitemaps (`@astrojs/sitemap`), and Security Headers.

---

## 💻 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nadeemwebdev-max/sellerkithub.git
   cd sellerkithub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:4321` in your browser.

---

## 🚀 Building & Deploying

### Build Locally
To generate all 203 pre-rendered static HTML pages:
```bash
npm run build
```
Output will be generated in `frontend/dist`.

### Deploy to Cloudflare Pages
Deploy directly from your local machine to Cloudflare's global edge network:
```bash
# One-time login
npx wrangler login

# Build and deploy
npm run deploy
```

---

## 📄 License
This project is private and proprietary to **SellerKitHub**. All rights reserved.
