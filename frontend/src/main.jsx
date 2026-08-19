import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext.jsx';
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <BrowserRouter>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
