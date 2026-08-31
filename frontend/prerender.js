import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import { ROUTES_SEO, SITE_URL } from './src/routes-seo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function prerender() {
  console.log('🚀 Starting SellerKitHub Static HTML Prerendering...');
  const startTime = Date.now();

  const distDir = path.resolve(__dirname, 'dist');
  const ssrOutDir = path.resolve(__dirname, '.ssr-dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html not found! Ensure `vite build` completed first.');
    process.exit(1);
  }

  const rawTemplate = fs.readFileSync(templatePath, 'utf-8');

  // 1. Build SSR bundle
  console.log('📦 Building temporary SSR bundle...');
  await build({
    build: {
      ssr: path.resolve(__dirname, 'src/entry-server.jsx'),
      outDir: ssrOutDir,
      emptyOutDir: true,
      minify: false,
      rollupOptions: {
        output: {
          format: 'esm',
          entryFileNames: 'entry-server.js'
        }
      }
    },
    configFile: false
  });

  // 2. Load SSR render function
  const serverEntryPath = path.resolve(ssrOutDir, 'entry-server.js');
  const { render } = await import(`file://${serverEntryPath.replace(/\\/g, '/')}?t=${Date.now()}`);

  const routes = Object.keys(ROUTES_SEO);
  console.log(`⚡ Prerendering ${routes.length} routes into static HTML...`);

  // Extract compiled CSS from dist/assets to inline directly into static HTML head (eliminates render-blocking CSS network roundtrip)
  let inlinedCss = '';
  let localCssTag = '';
  const allCssLinks = rawTemplate.matchAll(/<link\s+[^>]*href=["']([^"']+\.css)["'][^>]*>/gi);
  for (const match of allCssLinks) {
    const href = match[1];
    if (!href.startsWith('http') && !href.startsWith('//')) {
      const cssHref = href.replace(/^\//, '');
      const cssPath = path.join(distDir, cssHref);
      if (fs.existsSync(cssPath)) {
        inlinedCss = fs.readFileSync(cssPath, 'utf-8');
        localCssTag = match[0];
        console.log(`  ⚡ Inlining critical CSS "${cssHref}" (${(Buffer.byteLength(inlinedCss, 'utf-8') / 1024).toFixed(1)} KB) directly into HTML head for instant FCP/LCP...`);
        break;
      }
    }
  }

  for (const route of routes) {
    const meta = ROUTES_SEO[route] || {};
    const title = meta.title || 'SellerKit – Free E-Commerce Fee & Profit Calculators';
    const description = meta.description || 'Free multi-marketplace profit and fee calculators for Amazon, Etsy, eBay, Shopify, and Meesho.';
    const keywords = meta.keywords || 'amazon fee calculator, etsy fee calculator, ebay profit calculator';
    const canonical = meta.canonical || `${SITE_URL}${route === '/' ? '' : route}`;
    const ogTitle = meta.ogTitle || title;
    const ogDesc = meta.ogDescription || description;
    const ogImage = `${SITE_URL}/favicon-512x512.png`;

    // Render component tree to static HTML string
    let appHtml = '';
    try {
      appHtml = render(route);
    } catch (renderErr) {
      console.error(`⚠️ Error rendering route "${route}":`, renderErr);
      appHtml = '';
    }

    // Build custom HEAD elements
    const customHeadTags = `
    <!-- Prerendered Route SEO Metadata -->
    <title>${escapeHtml(title)}</title>
    <meta name="title" content="${escapeAttr(title)}" />
    <meta name="description" content="${escapeAttr(description)}" />
    <meta name="keywords" content="${escapeAttr(keywords)}" />
    <meta name="Impact-Site-Verification" value="bc0e9e90-4e97-4b17-b654-5fcae3038c01" content="bc0e9e90-4e97-4b17-b654-5fcae3038c01" />
    <link rel="canonical" href="${escapeAttr(canonical)}" />
    
    <!-- Open Graph / Social Sharing -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeAttr(canonical)}" />
    <meta property="og:title" content="${escapeAttr(ogTitle)}" />
    <meta property="og:description" content="${escapeAttr(ogDesc)}" />
    <meta property="og:image" content="${escapeAttr(ogImage)}" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="${escapeAttr(ogTitle)}" />
    <meta property="twitter:description" content="${escapeAttr(ogDesc)}" />
    <meta property="twitter:image" content="${escapeAttr(ogImage)}" />
    
    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
      ${JSON.stringify(meta.schema || {}, null, 2)}
    </script>`;

    // Inject into template
    let html = rawTemplate;

    // Replace external stylesheet link with inlined <style> for 0ms CSS blocking time
    if (inlinedCss && localCssTag) {
      html = html.replace(localCssTag, `<style id="sellerkit-critical-css">${inlinedCss}</style>`);
    }

    // Deduplicate <link rel="preconnect"> and <link rel="dns-prefetch"> tags
    // (prevents the duplicate preconnect warnings in Lighthouse Network dependency tree)
    const seenLinks = new Set();
    html = html.replace(/<link\s+rel=["'](preconnect|dns-prefetch)["'][^>]*>/gi, (match) => {
      const key = match.toLowerCase().replace(/\s+/g, ' ').trim();
      if (seenLinks.has(key)) return ''; // remove duplicate
      seenLinks.add(key);
      return match;
    });

    // Replace <title>...</title> if present
    html = html.replace(/<title>[\s\S]*?<\/title>/i, '');
    // Remove existing meta tags that we are replacing
    html = html.replace(/<meta\s+(?:name|property)=["'](?:title|description|keywords|og:title|og:description|og:url|og:image|twitter:card|twitter:title|twitter:description|twitter:image)["'][^>]*>/gi, '');
    // Remove existing canonical link
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '');
    // Remove existing top JSON-LD script to avoid duplicate top scripts
    html = html.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, '');

    // Inject custom head tags before </head>
    html = html.replace('</head>', `${customHeadTags}\n  </head>`);

    // Inject appHtml into root
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    // Save destination file
    let filePath;
    if (route === '/') {
      filePath = path.join(distDir, 'index.html');
    } else {
      const routeDir = path.join(distDir, route.replace(/^\//, ''));
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      filePath = path.join(routeDir, 'index.html');
    }

    // Ensure html element has lang="en" for accessibility and Lighthouse
    html = html.replace(/^(<html[^>]*)(?!\s+lang=)/i, '$1 lang="en"');
    if (!html.includes('lang="en"')) {
      html = html.replace(/^<html/i, '<html lang="en"');
    }

    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`  ✓ ${route} -> ${path.relative(distDir, filePath)} (${(Buffer.byteLength(html, 'utf-8') / 1024).toFixed(1)} KB)`);
  }

  // 3. Generate dynamic sitemap.xml in dist/ containing only canonical 200 OK URLs
  const today = new Date().toISOString().split('T')[0];
  const canonicalRoutes = routes.filter(r => {
    const meta = ROUTES_SEO[r] || {};
    const expectedCanonical = r === '/' ? `${SITE_URL}/` : `${SITE_URL}${r}`;
    // Exclude error pages
    if (['/404', '/500', '/400'].includes(r)) return false;
    // Exclude aliases that canonicalize to another path
    if (meta.canonical && meta.canonical !== expectedCanonical) return false;
    return true;
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${canonicalRoutes.map(r => {
  const loc = `${SITE_URL}${r === '/' ? '/' : r}`;
  let priority = '0.80';
  let changefreq = 'weekly';
  if (r === '/') {
    priority = '1.0';
  } else if (r.includes('calculator') || r.includes('comparison') || r.includes('resizer') || r.includes('barcode') || r.includes('matrix') || r.includes('generator') || r.includes('avery')) {
    priority = '0.95';
  } else if (r.includes('blog/')) {
    priority = '0.85';
    changefreq = 'monthly';
  } else if (r.includes('fee-updates')) {
    priority = '0.90';
  } else {
    priority = '0.50';
    changefreq = 'monthly';
  }
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`  ✓ dist/sitemap.xml generated with ${canonicalRoutes.length} canonical URLs`);

  // 4. Cleanup temporary SSR build directory
  try {
    fs.rmSync(ssrOutDir, { recursive: true, force: true });
  } catch (err) {}

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`✨ Prerendering successfully completed in ${duration}s!`);
}

function escapeHtml(str = '') {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(str = '') {
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

prerender().catch((err) => {
  console.error('❌ Prerender failed:', err);
  process.exit(1);
});
