# SellerKit – E-Commerce Seller Utility Hub 🚀

A high-performance, 100% client-side multi-tool web application built for e-commerce and marketplace sellers (Amazon, Etsy, eBay, Shopify, Meesho).

## 🌟 Included Tools
1. **Multi-Marketplace Profit & Fee Calculator (`/`)** – Instant calculations, cost distribution chart, ROI %, and 1-click summary copy.
2. **Dedicated Etsy Fee Calculator (`/etsy-fee-calculator`)** – Listing fees, 6.5% transaction cut, payment processing, and offsite ads.
3. **Dedicated Amazon FBA & FBM Calculator (`/amazon-fee-calculator`)** – Category referral tiers, FBA size tier pick-and-pack, and side-by-side FBA vs. FBM comparison.
4. **1:1 Product Image Square Padder & Resizer (`/product-image-resizer`)** – 100% client-side HTML5 Canvas tool to turn rectangular product photos into 1000x1000 or 2000x2000 square marketplace images with pure white padding.
5. **Free Barcode & Printable Sticker Sheet Maker (`/barcode-generator`)** – Code 128 / SKU barcodes with printable A4 sticker sheet layouts.
6. **Wholesale Margin & Markup Matrix (`/margin-matrix`)** – Tiered margin and markup pricing tables.

---

## 🛠️ Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (with Dark/Light mode design tokens)
- **Icons**: Lucide React
- **Hosting / Deployment**: Cloudflare Pages / Vercel / Netlify ($0/month hosting)
- **SEO**: Structured JSON-LD Schema on all tool pages, `sitemap.xml`, `robots.txt`

---

## 💻 Running Locally

1. Navigate to frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Open `http://localhost:5173` in your browser.

---

## 🚀 One-Click Deployment (Free)

### Deploying to Vercel:
1. Push this repository to GitHub.
2. Go to [Vercel.com](https://vercel.com) -> "Add New Project" -> Import your GitHub repo.
3. Set **Root Directory** to `frontend`.
4. Click **Deploy**.

### Connecting Custom Domain for Google AdSense:
1. Buy a cheap domain (~₹800/yr) on Namecheap, Hostinger, or Porkbun (e.g. `sellercalc.com` or `ecomfees.com`).
2. Add your domain in Vercel settings under **Domains**.
3. Submit `https://yourdomain.com/sitemap.xml` in **Google Search Console**.
4. Once indexed, submit to **Google AdSense** for monetization!
