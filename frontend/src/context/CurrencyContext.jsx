import React, { createContext, useContext, useState, useEffect } from 'react';

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1, defaultPrice: 29.99, defaultCost: 8.50, defaultShip: 4.50 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.5, defaultPrice: 1499, defaultCost: 450, defaultShip: 120 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79, defaultPrice: 24.99, defaultCost: 7.00, defaultShip: 3.50 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92, defaultPrice: 27.99, defaultCost: 8.00, defaultShip: 4.00 },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.36, defaultPrice: 39.99, defaultCost: 11.50, defaultShip: 6.00 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.52, defaultPrice: 44.99, defaultCost: 13.00, defaultShip: 7.00 },
};

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(() => {
    try {
      return localStorage.getItem('sellerkit_currency') || 'USD';
    } catch {
      return 'USD';
    }
  });

  const [theme, setThemeState] = useState(() => {
    try {
      return localStorage.getItem('sellerkit_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sellerkit_currency', currency);
    } catch {}
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem('sellerkit_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setCurrency = (code) => {
    if (CURRENCIES[code]) {
      setCurrencyState(code);
    }
  };

  const activeCurrency = CURRENCIES[currency] || CURRENCIES.USD;

  const format = (amount) => {
    const val = Number(amount) || 0;
    return `${activeCurrency.symbol}${val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      activeCurrency,
      format,
      theme,
      toggleTheme
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    return {
      currency: 'USD',
      setCurrency: () => {},
      activeCurrency: CURRENCIES.USD,
      format: (val) => `$${(Number(val) || 0).toFixed(2)}`,
      theme: 'dark',
      toggleTheme: () => {}
    };
  }
  return context;
}
