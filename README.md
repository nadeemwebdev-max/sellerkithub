# SellerKit Hub (SellerKitHub.com) 🚀

A high-performance, 100% client-side multi-tool web application built for online e-commerce sellers across Amazon, Etsy, eBay, Shopify, and Meesho.

---

## 🌟 Included Tools & Micro-Utilities

1. **Multi-Marketplace Profit Calculator (`/`)** – Live break-even sliders, cost distribution bar, and ROI % breakdown.
2. **Side-by-Side Marketplace Comparison (`/marketplace-comparison`)** – Ranks take-home net profit across Amazon FBA, Amazon FBM, Etsy, eBay, Shopify, and Meesho.
3. **Multi-SKU Batch Profit Calculator (`/batch-calculator`)** – Multi-row product portfolio cash flow and margin modeling.
4. **Dedicated Etsy Fee Calculator (`/etsy-fee-calculator`)** – 6.5% transaction fee, $0.20 listing renewals, payment gateway cuts, offsite ads, and interactive SVG Revenue Donut Chart.
5. **Amazon FBA vs. FBM Calculator (`/amazon-fee-calculator`)** – Sizing tiers, storage rates, and dual fulfillment comparison.
6. **1:1 Square Product Image Padder (`/product-image-resizer`)** – 100% client-side HTML5 Canvas padder (1000px/2000px) with pure white background for Amazon/Etsy compliance.
7. **Free Barcode & Printable Sticker Sheet Maker (`/barcode-generator`)** – Code 128, EAN-13, UPC-A, ITF-14, and ISO QR codes with printable A4 sticker sheet layouts.
8. **Wholesale Margin & Markup Matrix (`/margin-matrix`)** – Tiered wholesale price points with 1-click Excel spreadsheet export.
9. **2026 Marketplace Fee Update Center (`/fee-updates`)** – Fresh policy hub with structured JSON-LD FAQ schema.

---

## 🛠️ Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (with seamless Dark/Light mode preloader)
- **Icons**: Lucide React
- **Hosting**: Hostinger (Apache/LiteSpeed `.htaccess` included) / Vercel / Cloudflare Pages
- **SEO & Schemas**: Schema.org `SoftwareApplication`, `WebSite`, and `FAQPage` rich snippets, `sitemap.xml`, `robots.txt`

---

## 💻 Running Locally

```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🚀 Building for Production

```bash
cd frontend
npm run build
```
The production bundle will be generated in `frontend/dist` with `.htaccess`, ready to upload to Hostinger's `public_html` folder or deploy to Vercel/Netlify.
