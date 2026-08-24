import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy-loaded Pages (Code Splitting for Optimal PageSpeed)
const Home = lazy(() => import('./pages/Home'));
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

// Legal & Company Pages (AdSense Compliance)
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin"></div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-500 selection:text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Main Home Universal Tool */}
            <Route path="/" element={<Home />} />

            {/* Programmatic Discrete SEO Routes under /tools/ */}
            <Route path="/tools/amazon-fba-calculator" element={<AmazonCalculator />} />
            <Route path="/tools/etsy-fee-calculator" element={<EtsyCalculator />} />
            <Route path="/tools/profit-margin-calculator" element={<MarginMatrix />} />
            <Route path="/tools/roas-calculator" element={<RoasCalculator />} />
            <Route path="/tools/gst-calculator" element={<GstCalculator />} />
            <Route path="/tools/marketplace-comparison" element={<MarketplaceComparison />} />
            <Route path="/tools/batch-calculator" element={<BatchCalculator />} />
            <Route path="/tools/product-image-resizer" element={<ImagePadder />} />
            <Route path="/tools/barcode-generator" element={<BarcodeGenerator />} />

            {/* Canonical Short Aliases */}
            <Route path="/amazon-fee-calculator" element={<AmazonCalculator />} />
            <Route path="/etsy-fee-calculator" element={<EtsyCalculator />} />
            <Route path="/margin-matrix" element={<MarginMatrix />} />
            <Route path="/roas-calculator" element={<RoasCalculator />} />
            <Route path="/gst-calculator" element={<GstCalculator />} />
            <Route path="/marketplace-comparison" element={<MarketplaceComparison />} />
            <Route path="/batch-calculator" element={<BatchCalculator />} />
            <Route path="/product-image-resizer" element={<ImagePadder />} />
            <Route path="/barcode-generator" element={<BarcodeGenerator />} />
            <Route path="/fee-updates" element={<FeeUpdates />} />

            {/* Blog & SEO Content Pages */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* Legal / AdSense Required Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
