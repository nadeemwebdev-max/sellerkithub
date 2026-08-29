import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { trackPageView } from './utils/analytics';

// Homepage statically imported for instant FCP/LCP
import Home from './pages/Home';

// Lazy-loaded Tool Pages (separates heavy barcode/image/calculator modules into small chunks)
const EtsyCalculator = lazy(() => import('./pages/EtsyCalculator'));
const AmazonCalculator = lazy(() => import('./pages/AmazonCalculator'));
const MarketplaceComparison = lazy(() => import('./pages/MarketplaceComparison'));
const BatchCalculator = lazy(() => import('./pages/BatchCalculator'));
const ImagePadder = lazy(() => import('./pages/ImagePadder'));
const BarcodeGenerator = lazy(() => import('./pages/BarcodeGenerator'));
const MarginMatrix = lazy(() => import('./pages/MarginMatrix'));
const FeeUpdates = lazy(() => import('./pages/FeeUpdates'));
const RoasCalculator = lazy(() => import('./pages/RoasCalculator'));
const GstCalculator = lazy(() => import('./pages/GstCalculator'));

// Blog Pages
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

// Legal & Company Pages
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// Error Pages
import ServerError from './pages/ServerError';
const NotFound = lazy(() => import('./pages/NotFound'));
const BadRequest = lazy(() => import('./pages/BadRequest'));

function NavigationTracker() {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      trackPageView(pathname + search + hash, document.title);
      return;
    }
    window.scrollTo(0, 0);
    trackPageView(pathname + search, document.title);
  }, [pathname, search, hash]);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col selection:bg-brand-500 selection:text-white">
        <NavigationTracker />
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={
            <div className="min-h-[40vh] flex items-center justify-center">
              <div className="w-7 h-7 border-3 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <Routes>
              {/* Main Home Universal Tool */}
              <Route path="/" element={<Home />} />

              {/* Programmatic Discrete SEO Routes under /tools/ */}
              <Route path="/tools/amazon-fba-calculator" element={<AmazonCalculator />} />
              <Route path="/tools/fba-shipping-calculator" element={<AmazonCalculator />} />
              <Route path="/tools/etsy-fee-calculator" element={<EtsyCalculator />} />
              <Route path="/tools/profit-margin-calculator" element={<MarginMatrix />} />
              <Route path="/tools/roas-calculator" element={<RoasCalculator />} />
              <Route path="/tools/gst-calculator" element={<GstCalculator />} />
              <Route path="/tools/marketplace-comparison" element={<MarketplaceComparison />} />
              <Route path="/tools/batch-calculator" element={<BatchCalculator />} />
              <Route path="/tools/product-image-resizer" element={<ImagePadder />} />
              <Route path="/tools/barcode-generator" element={<BarcodeGenerator />} />
              <Route path="/tools/avery-qr-code-generator" element={<BarcodeGenerator />} />
              <Route path="/tools/avery-5160-barcode-generator" element={<BarcodeGenerator />} />

              {/* Canonical Short Aliases */}
              <Route path="/amazon-fee-calculator" element={<AmazonCalculator />} />
              <Route path="/fba-shipping-calculator" element={<AmazonCalculator />} />
              <Route path="/etsy-fee-calculator" element={<EtsyCalculator />} />
              <Route path="/margin-matrix" element={<MarginMatrix />} />
              <Route path="/roas-calculator" element={<RoasCalculator />} />
              <Route path="/gst-calculator" element={<GstCalculator />} />
              <Route path="/marketplace-comparison" element={<MarketplaceComparison />} />
              <Route path="/batch-calculator" element={<BatchCalculator />} />
              <Route path="/product-image-resizer" element={<ImagePadder />} />
              <Route path="/barcode-generator" element={<BarcodeGenerator />} />
              <Route path="/avery-qr-code-generator" element={<BarcodeGenerator />} />
              <Route path="/avery-5160-barcode-generator" element={<BarcodeGenerator />} />
              <Route path="/fee-updates" element={<FeeUpdates />} />

              {/* Blog & SEO Content Pages */}
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              {/* Legal / AdSense Required Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Error Pages */}
              <Route path="/400" element={<BadRequest />} />
              <Route path="/500" element={<ServerError />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
