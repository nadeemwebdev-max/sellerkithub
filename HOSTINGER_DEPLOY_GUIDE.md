# Hostinger Deployment Guide - SellerKit Hub 🚀

SellerKit Hub is a 100% client-side React + Vite Single-Page Application (SPA). It requires no backend server, database, or Node.js runtime on Hostinger.

---

## ⚡ Method 1: Hostinger File Manager / FTP (Quickest - 2 Minutes)

### Step 1: Build the Production Files
In your local terminal or VS Code:
```bash
cd frontend
npm install
npm run build
```
This produces a `frontend/dist` directory containing:
- `index.html`
- `.htaccess` (Pre-configured for React Router SPA routing, GZIP compression, and asset caching)
- `favicon.svg`
- `manifest.json`
- `robots.txt`
- `sitemap.xml`
- `assets/` (Compiled JS and CSS bundles)
- `images/` & `videos/`

### Step 2: Upload to Hostinger
1. Log in to your **Hostinger hPanel** (`hpanel.hostinger.com`).
2. Navigate to **Websites** > Click **Manage** on your domain.
3. Open **File Manager** (`public_html`).
4. (Optional) If there is a default `default.php` or placeholder file, delete it.
5. Upload all the files and folders from **inside** `frontend/dist/` directly into `public_html/`.
   - Ensure `.htaccess` and `index.html` are located directly in `public_html/`.
   > **Pro Tip**: You can compress the contents of `frontend/dist/` into a `.zip` file, upload the zip into `public_html`, and use Hostinger File Manager's **Extract** button!

---

## 🔄 Method 2: Hostinger Git Auto-Deployment

If you want your website to automatically update every time you push code to GitHub:

1. In **Hostinger hPanel**, go to **Advanced** > **GIT**.
2. Select **Repository**: `https://github.com/nadeemwebdev-max/sellerkithub.git`
3. Select **Branch**: `main`
4. Set **Install Path**: `/` (or `public_html`)
5. Click **Create**.
6. Set up a Webhook in your GitHub repository Settings > Webhooks using the URL provided by Hostinger to trigger automatic deployments on `git push`.

---

## ⚙️ Why .htaccess is Pre-Configured
The included `.htaccess` file inside `frontend/public/.htaccess` (and copied to `dist/.htaccess`) ensures:
1. **SPA Routing**: Directly navigating to or refreshing pages like `/amazon-fee-calculator`, `/etsy-fee-calculator`, or `/barcode-generator` will cleanly load without 404 errors.
2. **High-Speed Caching**: Static JS and CSS files are cached for 1 year with immutable cache headers, while `index.html` is revalidated to ensure visitors always receive fresh updates immediately.
3. **MIME Types & GZIP**: Full support for `.svg`, `.webp`, `.json`, and gzip text compression for 95+ Google PageSpeed scores.

---

## 🌐 Custom Domain & SSL
1. In Hostinger hPanel, go to **Security** > **SSL**.
2. Ensure **Lifetime Free SSL** is active on your domain.
3. Enable **Force HTTPS** in Hostinger to ensure secure encrypted traffic.
