import { useState, useEffect } from 'react';
import { UI_TRANSLATIONS, DEFAULT_LANG, LOCALES, LANGUAGES } from './ui';
import { SITE_URL } from '../routes-seo';

export function getLangFromUrl(url) {
  if (!url) return DEFAULT_LANG;
  const pathname = typeof url === 'string' ? url : url.pathname || '';
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && LOCALES.includes(segments[0])) {
    return segments[0];
  }
  return DEFAULT_LANG;
}

export function useTranslations(lang = DEFAULT_LANG) {
  const effectiveLang = UI_TRANSLATIONS[lang] ? lang : DEFAULT_LANG;
  return function t(key, fallback) {
    return UI_TRANSLATIONS[effectiveLang]?.[key] || UI_TRANSLATIONS[DEFAULT_LANG]?.[key] || fallback || key;
  };
}

export function useI18n(propLang) {
  const [lang, setLang] = useState(() => {
    if (propLang && LOCALES.includes(propLang)) return propLang;
    if (typeof window !== 'undefined') return getLangFromUrl(window.location.pathname);
    return DEFAULT_LANG;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlLang = getLangFromUrl(window.location.pathname);
      if (urlLang !== lang) {
        setLang(urlLang);
      }
    }
  }, [propLang]);

  const effectiveLang = UI_TRANSLATIONS[lang] ? lang : DEFAULT_LANG;
  const t = (key, fallback) => {
    return UI_TRANSLATIONS[effectiveLang]?.[key] || UI_TRANSLATIONS[DEFAULT_LANG]?.[key] || fallback || key;
  };

  return { lang, t };
}

export function getCleanPath(pathname) {
  if (!pathname) return '/';
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && LOCALES.includes(segments[0])) {
    const remaining = segments.slice(1).join('/');
    return remaining ? `/${remaining}` : '/';
  }
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function getLocalizedPath(pathname, lang = DEFAULT_LANG) {
  const clean = getCleanPath(pathname);
  if (lang === DEFAULT_LANG) {
    return clean;
  }
  return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
}

export function getAlternateHreflangs(pathname) {
  const clean = getCleanPath(pathname);
  const alternates = [];

  // Default / English
  alternates.push({
    lang: 'en',
    href: `${SITE_URL}${clean}`
  });

  // Other locales
  for (const loc of LOCALES) {
    if (loc !== 'en') {
      const locPath = clean === '/' ? `/${loc}` : `/${loc}${clean}`;
      alternates.push({
        lang: loc,
        href: `${SITE_URL}${locPath}`
      });
    }
  }

  // x-default fallback (points to default English URL)
  alternates.push({
    lang: 'x-default',
    href: `${SITE_URL}${clean}`
  });

  return alternates;
}
