import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Tool Pages (Synchronous imports to ensure 100% static HTML SSR pre-rendering for Googlebot)
import Home from './pages/Home';
import EtsyCalculator from './pages/EtsyCalculator';
import AmazonCalculator from './pages/AmazonCalculator';
import MarketplaceComparison from './pages/MarketplaceComparison';
import BatchCalculator from './pages/BatchCalculator';
import ImagePadder from './pages/ImagePadder';
import BarcodeGenerator from './pages/BarcodeGenerator';
import MarginMatrix from './pages/MarginMatrix';
import FeeUpdates from './pages/FeeUpdates';
import RoasCalculator from './pages/RoasCalculator';
import GstCalculator from './pages/GstCalculator';

// Blog Pages
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';

// Legal & Company Pages (AdSense Compliance)
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import About from './pages/About';
import Contact from './pages/Contact';

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
      </main>
      <Footer />
    </div>
  );
}
