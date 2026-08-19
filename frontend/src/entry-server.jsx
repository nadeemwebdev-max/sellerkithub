import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { CurrencyProvider } from './context/CurrencyContext.jsx';
import App from './App.jsx';

export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </StaticRouter>
    </React.StrictMode>
  );
}
