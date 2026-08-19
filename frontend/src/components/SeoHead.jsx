import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES_SEO, SITE_URL, DEFAULT_OG_IMAGE } from '../routes-seo.js';

export default function SeoHead({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  schema
}) {
  const location = useLocation();
  const routeMeta = ROUTES_SEO[location.pathname] || {};

  const finalTitle = title || routeMeta.title || 'SellerKit – Free E-Commerce Fee & Profit Calculators';
  const finalDesc = description || routeMeta.description || 'Free multi-marketplace profit and fee calculators for Amazon, Etsy, eBay, Shopify, and Meesho.';
  const finalKeywords = keywords || routeMeta.keywords || 'amazon fee calculator, etsy fee calculator, ebay profit calculator, shopify profit margin';
  const finalCanonical = canonical || routeMeta.canonical || `${SITE_URL}${location.pathname}`;
  const finalOgTitle = ogTitle || routeMeta.ogTitle || finalTitle;
  const finalOgDesc = ogDescription || routeMeta.ogDescription || finalDesc;
  const finalSchema = schema || routeMeta.schema;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Update Title
    document.title = finalTitle;

    // 2. Helper to set or create meta tag
    const setMeta = (selector, attr, val, content) => {
      let elem = document.querySelector(selector);
      if (!elem) {
        elem = document.createElement('meta');
        elem.setAttribute(attr, val);
        document.head.appendChild(elem);
      }
      elem.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', finalDesc);
    setMeta('meta[name="keywords"]', 'name', 'keywords', finalKeywords);
    setMeta('meta[property="og:title"]', 'property', 'og:title', finalOgTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', finalOgDesc);
    setMeta('meta[property="og:url"]', 'property', 'og:url', finalCanonical);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);

    // 3. Update Canonical link
    let linkElem = document.querySelector('link[rel="canonical"]');
    if (!linkElem) {
      linkElem = document.createElement('link');
      linkElem.setAttribute('rel', 'canonical');
      document.head.appendChild(linkElem);
    }
    linkElem.setAttribute('href', finalCanonical);

    // 4. Update JSON-LD structured data
    if (finalSchema) {
      const scriptId = 'page-json-ld-schema';
      let scriptElem = document.getElementById(scriptId);
      if (!scriptElem) {
        scriptElem = document.createElement('script');
        scriptElem.id = scriptId;
        scriptElem.type = 'application/ld+json';
        document.head.appendChild(scriptElem);
      }
      scriptElem.textContent = JSON.stringify(finalSchema);
    }
  }, [finalTitle, finalDesc, finalKeywords, finalCanonical, finalOgTitle, finalOgDesc, ogImage, finalSchema]);

  return null;
}
