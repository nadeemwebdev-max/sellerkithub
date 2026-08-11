import React, { useState, useEffect } from 'react';
import {
  Sparkles, Megaphone, BookOpen, Compass, Users, Plus, Edit2, Trash2,
  CheckCircle, MessageSquare, Phone, Eye, Save, X, ExternalLink, RefreshCw,
  LayoutDashboard, ShieldCheck, ArrowUpRight, Film, Instagram, Play, Heart, Upload
} from 'lucide-react';
import {
  getAdminStats, getAdminAnnouncement, updateAnnouncement,
  getAdminAllPosts, createPost, updatePost, deletePost,
  getAdminAllStays, createStay, updateStay, deleteStay,
  getAdminLeads, updateLeadStatus, deleteLead,
  getAdminAllReels, createReel, updateReel, deleteReel, uploadReelMedia
} from '../api/client';

import AnnouncementBanner from '../components/AnnouncementBanner';
import SeoHead from '../components/SeoHead';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('announcement');
  const [stats, setStats] = useState({ total_posts: 0, total_stays: 0, total_leads: 0, new_leads: 0, total_reels: 0 });
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  // Announcement State
  const [bannerForm, setBannerForm] = useState({
    message: '',
    badge_text: 'BATCH OPEN',
    link_text: 'Book Slot',
    link_url: '/stays',
    bg_gradient: 'from-emerald-600 to-teal-700',
    is_active: true
  });

  // Blog Posts State
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postFormData, setPostFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    category: 'Travel Guide',
    tags: 'Hubli,Dandeli,Waterfalls',
    read_time: '5 min read',
    is_published: true,
    seo_title: '',
    seo_description: ''
  });

  // Stays State
  const [stays, setStays] = useState([]);
  const [editingStay, setEditingStay] = useState(null);
  const [showStayModal, setShowStayModal] = useState(false);
  const [stayFormData, setStayFormData] = useState({
    title: '',
    slug: '',
    location: 'Dandeli',
    category: 'Resort',
    price_per_night: 1999,
    price_unit: 'per person / night with food',
    rating: 4.9,
    review_count: 85,
    whatsapp_number: '+919876543210',
    cover_image: '',
    amenities: 'Kayaking, Rafting, Campfire, Meals',
    description: '',
    highlights: 'NJ Verified Stay, Direct Booking Discount',
    is_featured: true,
    is_active: true
  });

  // Reels & Video Stories State
  const [reels, setReels] = useState([]);
  const [editingReel, setEditingReel] = useState(null);
  const [showReelModal, setShowReelModal] = useState(false);
  const [reelFormData, setReelFormData] = useState({
    title: '',
    location: 'Hubli-Dharwad & Western Ghats',
    views_count: '100K',
    likes_count: '10K',
    thumbnail_url: '',
    fallback_thumbnail_url: '',
    video_url: '',
    instagram_url: '',
    is_active: true,
    order_index: 0
  });

  // Leads CRM State
  const [leads, setLeads] = useState([]);
  const [leadStatusFilter, setLeadStatusFilter] = useState('All');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [statsData, bannerData, postsData, staysData, leadsData, reelsData] = await Promise.all([
        getAdminStats().catch(() => ({ total_posts: 0, total_stays: 0, total_leads: 0, new_leads: 0, total_reels: 0 })),
        getAdminAnnouncement().catch(() => null),
        getAdminAllPosts().catch(() => []),
        getAdminAllStays().catch(() => []),
        getAdminLeads('All').catch(() => []),
        getAdminAllReels().catch(() => [])
      ]);

      if (statsData) setStats(statsData);
      if (bannerData) setBannerForm(bannerData);
      setPosts(postsData);
      setStays(staysData);
      setLeads(leadsData);
      setReels(reelsData);
    } catch (err) {
      console.error('Error loading dashboard data', err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadAllData();
  }, []);

  // Handlers: Announcement
  const handleSaveAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await updateAnnouncement(bannerForm);
      showToast('Announcement banner updated successfully!');
      loadAllData();
    } catch (err) {
      alert('Failed to update banner: ' + err.message);
    }
  };

  // Handlers: Posts
  const handleOpenPostModal = (post = null) => {
    if (post) {
      setEditingPost(post);
      setPostFormData({ ...post });
    } else {
      setEditingPost(null);
      setPostFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        cover_image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
        category: 'Monsoon Treks',
        tags: 'Hubli,Dandeli,Waterfalls,Sirsi',
        read_time: '5 min read',
        is_published: true,
        seo_title: '',
        seo_description: ''
      });
    }
    setShowPostModal(true);
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await updatePost(editingPost.id, postFormData);
        showToast('Blog guide updated!');
      } else {
        await createPost(postFormData);
        showToast('New travel story published!');
      }
      setShowPostModal(false);
      loadAllData();
    } catch (err) {
      alert('Failed to save post: ' + err.message);
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this travel story?')) return;
    try {
      await deletePost(id);
      showToast('Post deleted.');
      loadAllData();
    } catch (err) {
      alert('Error deleting post: ' + err.message);
    }
  };

  // Handlers: Stays
  const handleOpenStayModal = (stay = null) => {
    if (stay) {
      setEditingStay(stay);
      setStayFormData({ ...stay });
    } else {
      setEditingStay(null);
      setStayFormData({
        title: '',
        slug: '',
        location: 'Dandeli',
        category: 'Resort',
        price_per_night: 2199,
        price_unit: 'per person / night with food',
        rating: 4.9,
        review_count: 85,
        whatsapp_number: '+919876543210',
        cover_image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
        amenities: 'Kayaking, River Rafting, Campfire, Buffet Meals',
        description: '',
        highlights: 'NJ Verified, 15% Exclusive Discount for Community',
        is_featured: true,
        is_active: true
      });
    }
    setShowStayModal(true);
  };

  const handleSaveStay = async (e) => {
    e.preventDefault();
    try {
      if (editingStay) {
        await updateStay(editingStay.id, stayFormData);
        showToast('Stay details updated!');
      } else {
        await createStay(stayFormData);
        showToast('New verified stay added!');
      }
      setShowStayModal(false);
      loadAllData();
    } catch (err) {
      alert('Failed to save stay: ' + err.message);
    }
  };

  const handleDeleteStay = async (id) => {
    if (!window.confirm('Delete this stay listing?')) return;
    try {
      await deleteStay(id);
      showToast('Stay removed.');
      loadAllData();
    } catch (err) {
      alert('Error deleting stay: ' + err.message);
    }
  };

  // Handlers: Leads
  const handleUpdateLeadStatus = async (leadId, newStatus) => {
    try {
      await updateLeadStatus(leadId, { status: newStatus });
      showToast(`Lead status marked as ${newStatus}`);
      loadAllData();
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await deleteLead(id);
      showToast('Lead deleted.');
      loadAllData();
    } catch (err) {
      alert('Error deleting lead: ' + err.message);
    }
  };

  // Handlers: Reels & Video Stories
  const handleOpenReelModal = (reel = null) => {
    if (reel) {
      setEditingReel(reel);
      setReelFormData({
        title: reel.title || '',
        location: reel.location || 'Hubli-Dharwad & Western Ghats',
        views_count: reel.views_count || '100K',
        likes_count: reel.likes_count || '10K',
        thumbnail_url: reel.thumbnail_url || '',
        fallback_thumbnail_url: reel.fallback_thumbnail_url || reel.thumbnail_url || '',
        video_url: reel.video_url || '',
        instagram_url: reel.instagram_url || '',
        is_active: reel.is_active !== undefined ? reel.is_active : true,
        order_index: reel.order_index || 0
      });
    } else {
      setEditingReel(null);
      setReelFormData({
        title: '',
        location: 'Hubli-Dharwad & Western Ghats',
        views_count: '120K',
        likes_count: '12.5K',
        thumbnail_url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
        fallback_thumbnail_url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
        video_url: '',
        instagram_url: 'https://www.instagram.com/travel_with.nj',
        is_active: true,
        order_index: (reels.length + 1)
      });
    }
    setShowReelModal(true);
  };

  const handleSaveReel = async (e) => {
    e.preventDefault();
    try {
      if (editingReel) {
        await updateReel(editingReel.id, reelFormData);
        showToast('Instagram Reel updated successfully!');
      } else {
        await createReel(reelFormData);
        showToast('New Reel added to showcase!');
      }
      setShowReelModal(false);
      loadAllData();
    } catch (err) {
      alert('Failed to save reel: ' + err.message);
    }
  };

  const [uploadingVideo, setUploadingVideo] = useState(false);

  const handleUploadVideoFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingVideo(true);
    try {
      const res = await uploadReelMedia(file);
      if (res && res.url) {
        setReelFormData(prev => ({ ...prev, video_url: res.url }));
        showToast('Video file uploaded! It will now play directly on your website.');
      }
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleDeleteReel = async (id) => {
    if (!window.confirm('Delete this reel from showcase?')) return;
    try {
      await deleteReel(id);
      showToast('Reel deleted.');
      loadAllData();
    } catch (err) {
      alert('Error deleting reel: ' + err.message);
    }
  };



  const openWhatsAppLeadChat = (lead) => {
    const text = `Hi ${lead.name}! This is NJ from TravelWithNJ.com regarding your inquiry for ${lead.destination_or_stay} (${lead.travel_dates || 'your dates'}).`;
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const filteredLeads = leadStatusFilter === 'All'
    ? leads
    : leads.filter(l => l.status === leadStatusFilter);

  return (
    <div className="py-8 sm:py-12 min-h-screen bg-[#080d1a]">
      <SeoHead title="Creator Dashboard | Travel with NJ" description="Creator administration panel." />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl shadow-emerald-500/30 flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        {/* Header & Quick Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#0c1322] shadow-lg">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" /> Creator Control Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
              Welcome back, NJ! 👋
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Manage your live announcements, travel blogs, curated stays, and incoming traveler leads.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              className="p-2.5 rounded-xl glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <a
              href="https://www.instagram.com/travel_with.nj"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-600 dark:text-pink-300 text-xs font-bold flex items-center gap-1.5"
            >
              <span>@travel_with.nj (25k)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1 bg-white/90 dark:bg-slate-900/60 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
              <span>Total Travel Guides</span>
              <BookOpen className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">{stats.total_posts}</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1 bg-white/90 dark:bg-slate-900/60 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
              <span>Active Stays Listed</span>
              <Compass className="w-4 h-4 text-teal-500 dark:text-teal-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">{stats.total_stays}</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1 bg-white/90 dark:bg-slate-900/60 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
              <span>Total Inquiries</span>
              <Users className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">{stats.total_leads}</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/10 space-y-1 shadow-sm">
            <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <span>New Actionable Leads</span>
              <MessageSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">{stats.new_leads}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('announcement')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'announcement'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Megaphone className="w-4 h-4" /> Live Announcement Banner
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'posts'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Blog & Guides ({posts.length})
          </button>

          <button
            onClick={() => setActiveTab('stays')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'stays'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" /> Curated Stays ({stays.length})
          </button>

          <button
            onClick={() => setActiveTab('reels')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'reels'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20'
                : 'glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Film className="w-4 h-4 text-pink-500 dark:text-pink-400" /> Reels Showcase ({reels.length})
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'leads'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> Direct Leads ({leads.length})
            {stats.new_leads > 0 && (
              <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {stats.new_leads} New
              </span>
            )}
          </button>
        </div>


        {/* Tab 1: Live Announcement Banner Editor */}
        {activeTab === 'announcement' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0c1322] space-y-6 shadow-lg">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">Manage Live Top Announcement Banner</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                This banner sits on top of all pages. Use it for upcoming weekend trek slots, discounts, or new video alerts.
              </p>
            </div>

            {/* Live Preview Box */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Live Website Preview:</span>
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
                <AnnouncementBanner overrideData={bannerForm} />
              </div>
            </div>

            <form onSubmit={handleSaveAnnouncement} className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Announcement Message *</label>
                  <input
                    type="text"
                    required
                    value={bannerForm.message}
                    onChange={(e) => setBannerForm({ ...bannerForm, message: e.target.value })}
                    placeholder="e.g. 🌿 Monsoon Dandeli & Yellapur Batch Open! Limited 18 slots left"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={bannerForm.badge_text}
                    onChange={(e) => setBannerForm({ ...bannerForm, badge_text: e.target.value })}
                    placeholder="e.g. BATCH OPEN, NEW REEL, 15% OFF"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Button Link Text</label>
                  <input
                    type="text"
                    value={bannerForm.link_text}
                    onChange={(e) => setBannerForm({ ...bannerForm, link_text: e.target.value })}
                    placeholder="Book Slot"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target URL</label>
                  <input
                    type="text"
                    value={bannerForm.link_url}
                    onChange={(e) => setBannerForm({ ...bannerForm, link_url: e.target.value })}
                    placeholder="/stays or https://wa.me/..."
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Gradient Theme</label>
                  <select
                    value={bannerForm.bg_gradient}
                    onChange={(e) => setBannerForm({ ...bannerForm, bg_gradient: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="from-emerald-600 to-teal-700">Emerald Forest (Green)</option>
                    <option value="from-amber-600 to-rose-600">Sunset Glow (Orange/Red)</option>
                    <option value="from-purple-600 to-pink-600">Viral Creator (Pink/Purple)</option>
                    <option value="from-blue-600 to-cyan-600">Kali Rapids (Ocean Blue)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bannerForm.is_active}
                    onChange={(e) => setBannerForm({ ...bannerForm, is_active: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Banner Active (Visible on Live Website)
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save & Update Live Banner
              </button>
            </form>
          </div>
        )}


        {/* Tab 2: Blog Posts Manager */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">Travel Stories & Itineraries</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Manage all articles, SEO tags, and view statistics.</p>
              </div>
              <button
                onClick={() => handleOpenPostModal()}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Write New Guide
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-900"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-md">
                          {post.category}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {(post.views || 0).toLocaleString()} views
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate mt-1">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-lg">
                        /blog/{post.slug}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700"
                      title="Preview on site"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleOpenPostModal(post)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-transparent"
                      title="Edit Story"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/30 text-rose-600 dark:text-rose-400"
                      title="Delete Story"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Stays Manager */}
        {activeTab === 'stays' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">Curated Stays & Homestays</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Add or edit verified properties for Dandeli, Sirsi, and Gokarna.</p>
              </div>
              <button
                onClick={() => handleOpenStayModal()}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Verified Property
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stays.map((stay) => (
                <div
                  key={stay.id}
                  className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 flex flex-col justify-between space-y-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={stay.cover_image}
                      alt={stay.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-900"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-md">
                          {stay.location}
                        </span>
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-transparent">
                          {stay.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate mt-1">
                        {stay.title}
                      </h3>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                        ₹{stay.price_per_night} {stay.price_unit}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> WhatsApp: {stay.whatsapp_number}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <a
                      href={`/stays/${stay.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 font-medium"
                    >
                      <span>View Live Page</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenStayModal(stay)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-transparent"
                        title="Edit Stay"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteStay(stay.id)}
                        className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 text-rose-600 dark:text-rose-400"
                        title="Delete Stay"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Tab 4: Leads CRM */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">Booking Leads & CRM</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Direct booking inquiries submitted by visitors from the website.</p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                {['All', 'New', 'Contacted', 'Confirmed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setLeadStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      leadStatusFilter === st
                        ? 'bg-emerald-500 text-slate-950'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          lead.status === 'New'
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 animate-pulse'
                            : lead.status === 'Contacted'
                            ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300'
                            : 'bg-blue-500/20 text-blue-600 dark:text-blue-300'
                        }`}>
                          {lead.status}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {lead.name}
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">• {lead.phone}</span>
                      </div>

                      <div className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
                        Property: {lead.destination_or_stay}
                      </div>

                      <div className="text-xs text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-3">
                        <span>📅 Dates: {lead.travel_dates || 'Flexible'}</span>
                        <span>👥 Guests: {lead.number_of_guests}</span>
                        {lead.message && <span>💬 Note: "{lead.message}"</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-800">
                      <button
                        onClick={() => openWhatsAppLeadChat(lead)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat WhatsApp</span>
                      </button>

                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                        className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 rounded-xl px-2.5 py-2 focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Closed">Closed</option>
                      </select>

                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs">
                  No inquiries found under status "{leadStatusFilter}".
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: Reels Showcase Manager */}
        {activeTab === 'reels' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">Instagram Reels & Viral Stories</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Manage real video reels displayed on the homepage showcase.</p>
              </div>
              <button
                onClick={() => handleOpenReelModal()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-pink-500/20"
              >
                <Plus className="w-4 h-4" /> Add New Reel
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reels.map((reel) => {
                const thumb = reel.thumbnail_url || reel.thumbnail;
                const views = reel.views_count || reel.views || '100K';
                const likes = reel.likes_count || reel.likes || '10K';
                const igUrl = reel.instagram_url || reel.instagramUrl;

                return (
                  <div
                    key={reel.id}
                    className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-pink-500/40 transition-all bg-white dark:bg-slate-950/80 shadow-md"
                  >
                    <div className="relative aspect-[9/16] overflow-hidden bg-black">
                      <img
                        src={thumb}
                        alt={reel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          if (reel.fallback_thumbnail_url && e.target.src !== reel.fallback_thumbnail_url) {
                            e.target.src = reel.fallback_thumbnail_url;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-bold">
                        <span className="bg-black/70 backdrop-blur-md text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10">
                          <Eye className="w-3 h-3 text-emerald-400" /> {views}
                        </span>
                        <span className="bg-black/70 backdrop-blur-md text-pink-300 px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10">
                          <Heart className="w-3 h-3 text-pink-400 fill-pink-400" /> {likes}
                        </span>
                      </div>

                      {/* Active Status Badge */}
                      <div className="absolute bottom-3 left-3 right-3 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            reel.is_active ? 'bg-emerald-500/80 text-slate-950' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {reel.is_active ? 'Active on Home' : 'Hidden'}
                          </span>
                          <span className="text-[10px] text-slate-200 font-semibold truncate">
                            📍 {reel.location}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white line-clamp-2 drop-shadow-md">
                          {reel.title}
                        </h4>
                      </div>
                    </div>

                    <div className="p-4 space-y-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">

                      <a
                        href={igUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1.5 truncate"
                      >
                        <Instagram className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{igUrl}</span>
                        <ExternalLink className="w-3 h-3 shrink-0 ml-auto" />
                      </a>

                      <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                        <button
                          onClick={() => handleOpenReelModal(reel)}
                          className="flex-1 py-1.5 rounded-xl glass-panel text-slate-200 hover:text-white hover:bg-slate-800 text-xs font-bold flex items-center justify-center gap-1"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReel(reel.id)}
                          className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold"
                          title="Delete Reel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>


      {/* Modal: Write / Edit Blog Post */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl p-6 sm:p-8 bg-white dark:bg-[#0c121e] my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPostModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mb-4">
              {editingPost ? 'Edit Travel Guide' : 'Create New Travel Guide'}
            </h3>

            <form onSubmit={handleSavePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={postFormData.title}
                  onChange={(e) => setPostFormData({ ...postFormData, title: e.target.value })}
                  placeholder="e.g. 5 Hidden Waterfalls in Sirsi You Must Visit"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={postFormData.category}
                    onChange={(e) => setPostFormData({ ...postFormData, category: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>Monsoon Treks</option>
                    <option>Adventure</option>
                    <option>Heritage & Culture</option>
                    <option>Food Trails</option>
                    <option>Weekend Itineraries</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={postFormData.read_time}
                    onChange={(e) => setPostFormData({ ...postFormData, read_time: e.target.value })}
                    placeholder="e.g. 6 min read"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={postFormData.cover_image}
                  onChange={(e) => setPostFormData({ ...postFormData, cover_image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Excerpt / Short Description *</label>
                <textarea
                  rows="2"
                  required
                  value={postFormData.excerpt}
                  onChange={(e) => setPostFormData({ ...postFormData, excerpt: e.target.value })}
                  placeholder="Catchy 2-sentence summary of the story..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Guide Content (Markdown supported) *</label>
                <textarea
                  rows="8"
                  required
                  value={postFormData.content}
                  onChange={(e) => setPostFormData({ ...postFormData, content: e.target.value })}
                  placeholder="# Section Heading&#10;&#10;Write your guide text, tips, and road trip breakdown here..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* SEO Tags */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">SEO Settings (Google Search Optimization)</div>
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">SEO Title Tag</label>
                  <input
                    type="text"
                    value={postFormData.seo_title || ''}
                    onChange={(e) => setPostFormData({ ...postFormData, seo_title: e.target.value })}
                    placeholder="Custom Google title (leave blank to auto-use post title)"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">SEO Meta Description</label>
                  <input
                    type="text"
                    value={postFormData.seo_description || ''}
                    onChange={(e) => setPostFormData({ ...postFormData, seo_description: e.target.value })}
                    placeholder="Target 150-160 characters for search snippet"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-md"
              >
                Save & Publish Guide
              </button>
            </form>
          </div>
        </div>
      )}


      {/* Modal: Add / Edit Stay */}
      {showStayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl p-6 sm:p-8 bg-white dark:bg-[#0c121e] my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowStayModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mb-4">
              {editingStay ? 'Edit Stay Listing' : 'Add New Verified Stay'}
            </h3>

            <form onSubmit={handleSaveStay} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Property Name *</label>
                <input
                  type="text"
                  required
                  value={stayFormData.title}
                  onChange={(e) => setStayFormData({ ...stayFormData, title: e.target.value })}
                  placeholder="e.g. River Whispers Eco-Resort"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={stayFormData.location}
                    onChange={(e) => setStayFormData({ ...stayFormData, location: e.target.value })}
                    placeholder="e.g. Dandeli, Sirsi, Gokarna"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={stayFormData.category}
                    onChange={(e) => setStayFormData({ ...stayFormData, category: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>Riverfront Resort</option>
                    <option>Heritage Homestay</option>
                    <option>Beach Camp</option>
                    <option>Jungle Retreat</option>
                    <option>Boutique Villa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={stayFormData.price_per_night}
                    onChange={(e) => setStayFormData({ ...stayFormData, price_per_night: parseInt(e.target.value) || 0 })}
                    placeholder="1999"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">WhatsApp Lead CTA Number</label>
                  <input
                    type="text"
                    value={stayFormData.whatsapp_number}
                    onChange={(e) => setStayFormData({ ...stayFormData, whatsapp_number: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Pricing Unit / Inclusions</label>
                  <input
                    type="text"
                    value={stayFormData.price_unit}
                    onChange={(e) => setStayFormData({ ...stayFormData, price_unit: e.target.value })}
                    placeholder="per person / night with food"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={stayFormData.cover_image}
                  onChange={(e) => setStayFormData({ ...stayFormData, cover_image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Amenities (Comma separated)</label>
                <input
                  type="text"
                  value={stayFormData.amenities}
                  onChange={(e) => setStayFormData({ ...stayFormData, amenities: e.target.value })}
                  placeholder="Kayaking, Rafting, Campfire, Buffet Meals, Rain Dance"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Property Description</label>
                <textarea
                  rows="3"
                  value={stayFormData.description}
                  onChange={(e) => setStayFormData({ ...stayFormData, description: e.target.value })}
                  placeholder="Tell travelers why this property is awesome..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-md"
              >
                Save & Update Stay
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add / Edit Reel */}
      {showReelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl p-6 sm:p-8 bg-white dark:bg-[#0c121e] my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowReelModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-pink-500/20 text-pink-500 dark:text-pink-400 border border-pink-500/30">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  {editingReel ? 'Edit Instagram Reel' : 'Add New Reel to Showcase'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Add authentic reels from @travel_with.nj</p>
              </div>
            </div>

            <form onSubmit={handleSaveReel} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Reel Title / Hook *</label>
                <input
                  type="text"
                  required
                  value={reelFormData.title}
                  onChange={(e) => setReelFormData({ ...reelFormData, title: e.target.value })}
                  placeholder="e.g. Secret Waterfalls near Hubli You Didn't Know Existed!"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Instagram Reel Link *</label>
                <div className="relative">
                  <Instagram className="absolute left-3.5 top-3 w-4 h-4 text-pink-500 dark:text-pink-400 pointer-events-none" />
                  <input
                    type="url"
                    required
                    value={reelFormData.instagram_url}
                    onChange={(e) => setReelFormData({ ...reelFormData, instagram_url: e.target.value })}
                    placeholder="https://www.instagram.com/reel/Cxxxxxx/"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                  Paste any Instagram reel URL (e.g. <code>https://www.instagram.com/reel/CODE/</code>).
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Location Tag *</label>
                  <input
                    type="text"
                    required
                    value={reelFormData.location}
                    onChange={(e) => setReelFormData({ ...reelFormData, location: e.target.value })}
                    placeholder="e.g. Yellapur & Sathodi Falls"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Display Order Priority</label>
                  <input
                    type="number"
                    value={reelFormData.order_index}
                    onChange={(e) => setReelFormData({ ...reelFormData, order_index: parseInt(e.target.value) || 0 })}
                    placeholder="1"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Views Count Label</label>
                  <input
                    type="text"
                    value={reelFormData.views_count}
                    onChange={(e) => setReelFormData({ ...reelFormData, views_count: e.target.value })}
                    placeholder="148K"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Likes Count Label</label>
                  <input
                    type="text"
                    value={reelFormData.likes_count}
                    onChange={(e) => setReelFormData({ ...reelFormData, likes_count: e.target.value })}
                    placeholder="14.2K"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Cover Thumbnail Image URL *</label>
                <input
                  type="url"
                  required
                  value={reelFormData.thumbnail_url}
                  onChange={(e) => setReelFormData({ ...reelFormData, thumbnail_url: e.target.value })}
                  placeholder="https://images.unsplash.com/... or Instagram image CDN"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Direct Video File (MP4) — For seamless in-page playback
                  </label>
                  {reelFormData.video_url && (
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Ready to play
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    value={reelFormData.video_url || ''}
                    onChange={(e) => setReelFormData({ ...reelFormData, video_url: e.target.value })}
                    placeholder="https://... or upload MP4 file below"
                    className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-pink-500"
                  />
                  <label className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer border border-slate-300 dark:border-slate-600 transition-colors shrink-0">
                    <Upload className="w-3.5 h-3.5 text-pink-500 dark:text-pink-400" />
                    <span>{uploadingVideo ? 'Uploading...' : 'Upload Video File'}</span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      onChange={handleUploadVideoFile}
                      disabled={uploadingVideo}
                      className="hidden"
                    />
                  </label>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                  💡 Tip: Uploading the reel's video file (.mp4) allows travelers to watch and hear it directly on the page without Meta's "Watch on Instagram" screen.
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="reel_active"
                  checked={reelFormData.is_active}
                  onChange={(e) => setReelFormData({ ...reelFormData, is_active: e.target.checked })}
                  className="w-4 h-4 rounded text-pink-500 bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                />
                <label htmlFor="reel_active" className="text-xs font-semibold text-slate-800 dark:text-white">
                  Publish & make visible in Homepage Video Showcase
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-white font-black text-sm shadow-lg shadow-pink-500/25 transition-all mt-4"
              >
                {editingReel ? 'Update Reel' : 'Publish Reel to Showcase'}
              </button>
            </form>
          </div>
        </div>
      )}


    </div>
  );
}

