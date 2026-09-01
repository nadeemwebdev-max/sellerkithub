import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLangFromUrl } from '../i18n/utils';

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1, defaultPrice: 29.99, defaultCost: 8.50, defaultShip: 4.50, decimals: 2 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92, defaultPrice: 27.99, defaultCost: 8.00, defaultShip: 4.00, decimals: 2 },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen (円)', rate: 155.0, defaultPrice: 4500, defaultCost: 1300, defaultShip: 600, decimals: 0 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79, defaultPrice: 24.99, defaultCost: 7.00, defaultShip: 3.50, decimals: 2 },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.36, defaultPrice: 39.99, defaultCost: 11.50, defaultShip: 6.00, decimals: 2 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.52, defaultPrice: 44.99, defaultCost: 13.00, defaultShip: 7.00, decimals: 2 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.5, defaultPrice: 1499, defaultCost: 450, defaultShip: 120, decimals: 2 },
  BRL: { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rate: 5.40, defaultPrice: 149.90, defaultCost: 45.00, defaultShip: 22.00, decimals: 2 },
  KRW: { code: 'KRW', symbol: '₩', name: 'South Korean Won (원)', rate: 1380.0, defaultPrice: 39000, defaultCost: 11000, defaultShip: 5000, decimals: 0 },
  MXN: { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso', rate: 18.20, defaultPrice: 499.00, defaultCost: 150.00, defaultShip: 80.00, decimals: 2 },
};

export const LANG_DEFAULT_CURRENCY = {
  en: 'USD',
  es: 'EUR',
  ja: 'JPY',
  fr: 'EUR',
  de: 'EUR',
  pt: 'BRL',
  ko: 'KRW',
  it: 'EUR'
};

function getStoredCurrency() {
  if (typeof window === 'undefined') return 'USD';
  try {
    const path = window.location.pathname;
    const lang = getLangFromUrl(path);
    const isManual = localStorage.getItem('sellerkit_manual_currency') === 'true';
    const saved = localStorage.getItem('sellerkit_currency');

    if (isManual && saved && CURRENCIES[saved]) {
      return saved;
    }

    return LANG_DEFAULT_CURRENCY[lang] || 'USD';
  } catch {
    return 'USD';
  }
}

function getStoredTheme() {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem('sellerkit_theme');
    if (saved) return saved;
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  } catch {
    return 'dark';
  }
}

export function useCurrency() {
  const [currency, setCurrencyState] = useState(getStoredCurrency);
  const [theme, setThemeState] = useState(getStoredTheme);

  useEffect(() => {
    // Sync initial state on client mount
    setCurrencyState(getStoredCurrency());
    setThemeState(getStoredTheme());

    function handleCurrencyChange(e) {
      if (e.detail && CURRENCIES[e.detail]) {
        setCurrencyState(e.detail);
      }
    }

    function handleThemeChange(e) {
      if (e.detail) {
        setThemeState(e.detail);
      }
    }

    function handleStorage(e) {
      if (e.key === 'sellerkit_currency' && e.newValue && CURRENCIES[e.newValue]) {
        setCurrencyState(e.newValue);
      }
      if (e.key === 'sellerkit_theme' && e.newValue) {
        setThemeState(e.newValue);
      }
    }

    window.addEventListener('sellerkit:currency', handleCurrencyChange);
    window.addEventListener('sellerkit:theme', handleThemeChange);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('sellerkit:currency', handleCurrencyChange);
      window.removeEventListener('sellerkit:theme', handleThemeChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const setCurrency = (code) => {
    if (CURRENCIES[code]) {
      setCurrencyState(code);
      try {
        localStorage.setItem('sellerkit_currency', code);
        localStorage.setItem('sellerkit_manual_currency', 'true');
      } catch {}
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('sellerkit:currency', { detail: code }));
      }
    }
  };

  const toggleTheme = () => {
    const current = getStoredTheme();
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    setThemeState(nextTheme);
    try {
      localStorage.setItem('sellerkit_theme', nextTheme);
    } catch {}
    if (typeof document !== 'undefined') {
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sellerkit:theme', { detail: nextTheme }));
    }
  };

  const activeCurrency = CURRENCIES[currency] || CURRENCIES.USD;

  const format = (amount) => {
    const val = Number(amount) || 0;
    const decimals = typeof activeCurrency.decimals === 'number' ? activeCurrency.decimals : 2;
    return `${activeCurrency.symbol}${val.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })}`;
  };

  return {
    currency,
    setCurrency,
    activeCurrency,
    format,
    theme,
    toggleTheme
  };
}

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const currencyUtils = useCurrency();
  return (
    <CurrencyContext.Provider value={currencyUtils}>
      {children}
    </CurrencyContext.Provider>
  );
}
