import React, { useEffect } from 'react';

export default function SeoHead({
  title = "Travel with NJ | Discover Hubli-Dharwad & Unseen North Karnataka",
  description = "Curated homestays, secret waterfall routes, Dandeli rafting camps, and weekend travel guides with direct WhatsApp booking discounts.",
  image = "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80",
  type = "website",
  slug = "",
  schema = null
}) {
  const url = `https://travelwithnj.com${slug ? `/${slug}` : ''}`;

  useEffect(() => {
    // 1. Update Title
    document.title = title.includes("Travel with NJ") ? title : `${title} | Travel with NJ`;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update OG Meta
    const updateMeta = (prop, val) => {
      let elem = document.querySelector(`meta[property="${prop}"]`);
      if (!elem) {
        elem = document.createElement('meta');
        elem.setAttribute('property', prop);
        document.head.appendChild(elem);
      }
      elem.setAttribute('content', val);
    };

    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:image', image);
    updateMeta('og:url', url);
    updateMeta('og:type', type);

    // 4. Inject JSON-LD Schema
    const scriptId = 'json-ld-structured-data';
    let scriptElem = document.getElementById(scriptId);
    if (!scriptElem) {
      scriptElem = document.createElement('script');
      scriptElem.id = scriptId;
      scriptElem.type = 'application/ld+json';
      document.head.appendChild(scriptElem);
    }

    const defaultSchema = {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "Travel with NJ",
      "url": "https://travelwithnj.com",
      "logo": "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=300&q=80",
      "sameAs": [
        "https://www.instagram.com/travel_with.nj"
      ],
      "description": description,
      "areaServed": "North Karnataka, Hubli, Dharwad, Dandeli, Sirsi, Gokarna, Badami"
    };

    scriptElem.text = JSON.stringify(schema || defaultSchema);

  }, [title, description, image, url, type, schema]);

  return null;
}
