import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnnouncementBanner from './components/AnnouncementBanner';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import StaysPage from './pages/StaysPage';
import StayDetailPage from './pages/StayDetailPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CollabPage from './pages/CollabPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#060a12] text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
          
          {/* Live Dynamic Top Banner */}
          <AnnouncementBanner />
          
          {/* Main Navigation Header */}
          <Navbar />

          {/* Page Routing */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stays" element={<StaysPage />} />
              <Route path="/stays/:slug" element={<StayDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/collab" element={<CollabPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Creator Admin Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
