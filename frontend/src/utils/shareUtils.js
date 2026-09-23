/**
 * Shareable Calculation Utilities for SellerKit Hub
 * Handles URL parameter extraction, share link generation, and social sharing.
 */

import { SITE_URL } from '../routes-seo';

/**
 * Safely extracts URL search params in browser environments.
 */
export const getSearchParams = () => {
  if (typeof window === 'undefined') return new URLSearchParams();
  return new URLSearchParams(window.location.search);
};

/**
 * Gets a number param from URL or returns fallback.
 */
export const getParamNumber = (name, fallback) => {
  if (typeof window === 'undefined') return fallback;
  const params = new URLSearchParams(window.location.search);
  const val = params.get(name);
  if (val === null || val === '') return fallback;
  const num = parseFloat(val);
  return isNaN(num) ? fallback : num;
};

/**
 * Gets a string param from URL or returns fallback.
 */
export const getParamString = (name, fallback) => {
  if (typeof window === 'undefined') return fallback;
  const params = new URLSearchParams(window.location.search);
  const val = params.get(name);
  return (val !== null && val !== '') ? val : fallback;
};

/**
 * Gets a boolean param from URL or returns fallback.
 */
export const getParamBoolean = (name, fallback) => {
  if (typeof window === 'undefined') return fallback;
  const params = new URLSearchParams(window.location.search);
  const val = params.get(name);
  if (val === null || val === '') return fallback;
  return val === 'true' || val === '1' || val === 'yes';
};

/**
 * Builds a clean, canonical share URL with query parameters.
 */
export const buildShareUrl = (path, params = {}) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      searchParams.set(key, String(val));
    }
  });

  const queryString = searchParams.toString();
  const domain = (typeof window !== 'undefined' && window.location.origin) 
    ? window.location.origin 
    : (SITE_URL || 'https://sellerkithub.com');

  return `${domain}${cleanPath}${queryString ? `?${queryString}` : ''}`;
};

/**
 * Generates social sharing endpoints.
 */
export const getSocialShareLinks = (shareUrl, text, title = 'E-Commerce Profit Calculation') => {
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${text}\n\n👉 Inspect or modify this calculation: `);
  const encodedTitle = encodeURIComponent(title);

  return {
    reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(text)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}${encodedUrl}`,
  };
};
