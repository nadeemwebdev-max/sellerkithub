import React, { useState, useEffect } from 'react';
import {
  Sparkles, Megaphone, BookOpen, Compass, Users, Plus, Edit2, Trash2,
  CheckCircle, MessageSquare, Phone, Eye, Save, X, ExternalLink, RefreshCw,
  LayoutDashboard, ShieldCheck, ArrowUpRight
} from 'lucide-react';
import {
  getAdminStats, getAdminAnnouncement, updateAnnouncement,
  getAdminAllPosts, createPost, updatePost, deletePost,
  getAdminAllStays, createStay, updateStay, deleteStay,
  getAdminLeads, updateLeadStatus, deleteLead
} from '../api/client';
import AnnouncementBanner from '../components/AnnouncementBanner';
import SeoHead from '../components/SeoHead';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('announcement');
  const [stats, setStats] = useState({ total_posts: 0, total_stays: 0, total_leads: 0, new_leads: 0 });
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
      const [statsData, bannerData, postsData, staysData, leadsData] = await Promise.all([
        getAdminStats().catch(() => ({ total_posts: 0, total_stays: 0, total_leads: 0, new_leads: 0 })),
        getAdminAnnouncement().catch(() => null),
        getAdminAllPosts().catch(() => []),
        getAdminAllStays().catch(() => []),
        getAdminLeads('All').catch(() => [])
      ]);

      if (statsData) setStats(statsData);
      if (bannerData) setBannerForm(bannerData);
      setPosts(postsData);
      setStays(staysData);
      setLeads(leadsData);
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" /> Creator Control Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Welcome back, NJ! 👋
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage your live announcements, travel blogs, curated stays, and incoming traveler leads.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <a
              href="https://www.instagram.com/travel_with.nj"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-bold flex items-center gap-1.5"
            >
              <span>@travel_with.nj (25k)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Total Travel Guides</span>
              <BookOpen className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">{stats.total_posts}</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Active Stays Listed</span>
              <Compass className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">{stats.total_stays}</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Total Inquiries</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">{stats.total_leads}</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 space-y-1">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>New Actionable Leads</span>
              <MessageSquare className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">{stats.new_leads}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('announcement')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'announcement'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'glass-panel text-slate-300 hover:text-white'
            }`}
          >
            <Megaphone className="w-4 h-4" /> Live Announcement Banner
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'posts'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'glass-panel text-slate-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Blog & Guides ({posts.length})
          </button>

          <button
            onClick={() => setActiveTab('stays')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'stays'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'glass-panel text-slate-300 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" /> Curated Stays ({stays.length})
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'leads'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'glass-panel text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> Booking Leads CRM ({leads.length})
            {stats.new_leads > 0 && (
              <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {stats.new_leads} New
              </span>
            )}
          </button>
        </div>

        {/* Tab 1: Live Announcement Banner Editor */}
        {activeTab === 'announcement' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white font-display">Manage Live Top Announcement Banner</h2>
              <p className="text-xs text-slate-400 mt-1">
                This banner sits on top of all pages. Use it for upcoming weekend trek slots, discounts, or new video alerts.
              </p>
            </div>

            {/* Live Preview Box */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400">Live Website Preview:</span>
              <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-md">
                <AnnouncementBanner overrideData={bannerForm} />
              </div>
            </div>

            <form onSubmit={handleSaveAnnouncement} className="space-y-4 pt-4 border-t border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Announcement Message *</label>
                  <input
                    type="text"
                    required
                    value={bannerForm.message}
                    onChange={(e) => setBannerForm({ ...bannerForm, message: e.target.value })}
                    placeholder="e.g. 🌿 Monsoon Dandeli & Yellapur Batch Open! Limited 18 slots left"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={bannerForm.badge_text}
                    onChange={(e) => setBannerForm({ ...bannerForm, badge_text: e.target.value })}
                    placeholder="e.g. BATCH OPEN, NEW REEL, 15% OFF"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Button Link Text</label>
                  <input
                    type="text"
                    value={bannerForm.link_text}
                    onChange={(e) => setBannerForm({ ...bannerForm, link_text: e.target.value })}
                    placeholder="Book Slot"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target URL</label>
                  <input
                    type="text"
                    value={bannerForm.link_url}
                    onChange={(e) => setBannerForm({ ...bannerForm, link_url: e.target.value })}
                    placeholder="/stays or https://wa.me/..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Gradient Theme</label>
                  <select
                    value={bannerForm.bg_gradient}
                    onChange={(e) => setBannerForm({ ...bannerForm, bg_gradient: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
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
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-900 border-slate-700"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
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
                <h2 className="text-xl font-bold text-white font-display">Travel Stories & Itineraries</h2>
                <p className="text-xs text-slate-400">Manage all articles, SEO tags, and view statistics.</p>
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
                  className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-900"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-emerald-500/15 text-emerald-400 font-bold px-2 py-0.5 rounded-md">
                          {post.category}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {(post.views || 0).toLocaleString()} views
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white truncate mt-1">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-400 truncate max-w-lg">
                        /blog/{post.slug}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl glass-panel text-slate-300 hover:text-white border border-slate-700"
                      title="Preview on site"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleOpenPostModal(post)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200"
                      title="Edit Story"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/30 text-rose-400"
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
                <h2 className="text-xl font-bold text-white font-display">Curated Stays & Homestays</h2>
                <p className="text-xs text-slate-400">Add or edit verified properties for Dandeli, Sirsi, and Gokarna.</p>
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
                  className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={stay.cover_image}
                      alt={stay.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-900"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-md">
                          {stay.location}
                        </span>
                        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                          {stay.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white truncate mt-1">
                        {stay.title}
                      </h3>
                      <div className="text-xs text-emerald-400 font-bold mt-1">
                        ₹{stay.price_per_night} {stay.price_unit}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-emerald-400" /> WhatsApp: {stay.whatsapp_number}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <a
                      href={`/stays/${stay.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1"
                    >
                      <span>View Live Page</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenStayModal(stay)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                        title="Edit Stay"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteStay(stay.id)}
                        className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 text-rose-400"
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
                <h2 className="text-xl font-bold text-white font-display">Booking Leads & CRM</h2>
                <p className="text-xs text-slate-400">Direct booking inquiries submitted by visitors from the website.</p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {['All', 'New', 'Contacted', 'Confirmed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setLeadStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      leadStatusFilter === st
                        ? 'bg-emerald-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
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
                    className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          lead.status === 'New'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse'
                            : lead.status === 'Contacted'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {lead.status}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-white">
                          {lead.name}
                        </h4>
                        <span className="text-xs text-slate-400">• {lead.phone}</span>
                      </div>

                      <div className="text-xs text-emerald-300 font-semibold">
                        Property: {lead.destination_or_stay}
                      </div>

                      <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                        <span>📅 Dates: {lead.travel_dates || 'Flexible'}</span>
                        <span>👥 Guests: {lead.number_of_guests}</span>
                        {lead.message && <span>💬 Note: "{lead.message}"</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
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
                        className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-2.5 py-2 focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Closed">Closed</option>
                      </select>

                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800 text-slate-400 text-xs">
                  No inquiries found under status "{leadStatusFilter}".
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Modal: Write / Edit Blog Post */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-8 bg-[#0c121e] my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPostModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white font-display mb-4">
              {editingPost ? 'Edit Travel Guide' : 'Create New Travel Guide'}
            </h3>

            <form onSubmit={handleSavePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={postFormData.title}
                  onChange={(e) => setPostFormData({ ...postFormData, title: e.target.value })}
                  placeholder="e.g. 5 Hidden Waterfalls in Sirsi You Must Visit"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={postFormData.category}
                    onChange={(e) => setPostFormData({ ...postFormData, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  >
                    <option>Monsoon Treks</option>
                    <option>Adventure</option>
                    <option>Heritage & Culture</option>
                    <option>Food Trails</option>
                    <option>Weekend Itineraries</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={postFormData.read_time}
                    onChange={(e) => setPostFormData({ ...postFormData, read_time: e.target.value })}
                    placeholder="e.g. 6 min read"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={postFormData.cover_image}
                  onChange={(e) => setPostFormData({ ...postFormData, cover_image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Excerpt / Short Description *</label>
                <textarea
                  rows="2"
                  required
                  value={postFormData.excerpt}
                  onChange={(e) => setPostFormData({ ...postFormData, excerpt: e.target.value })}
                  placeholder="Catchy 2-sentence summary of the story..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Guide Content (Markdown supported) *</label>
                <textarea
                  rows="8"
                  required
                  value={postFormData.content}
                  onChange={(e) => setPostFormData({ ...postFormData, content: e.target.value })}
                  placeholder="# Section Heading&#10;&#10;Write your guide text, tips, and road trip breakdown here..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono text-xs"
                />
              </div>

              {/* SEO Tags */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-emerald-400">SEO Settings (Google Search Optimization)</div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">SEO Title Tag</label>
                  <input
                    type="text"
                    value={postFormData.seo_title || ''}
                    onChange={(e) => setPostFormData({ ...postFormData, seo_title: e.target.value })}
                    placeholder="Custom Google title (leave blank to auto-use post title)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">SEO Meta Description</label>
                  <input
                    type="text"
                    value={postFormData.seo_description || ''}
                    onChange={(e) => setPostFormData({ ...postFormData, seo_description: e.target.value })}
                    placeholder="Target 150-160 characters for search snippet"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
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
          <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-8 bg-[#0c121e] my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowStayModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white font-display mb-4">
              {editingStay ? 'Edit Stay Listing' : 'Add New Verified Stay'}
            </h3>

            <form onSubmit={handleSaveStay} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Property Name *</label>
                <input
                  type="text"
                  required
                  value={stayFormData.title}
                  onChange={(e) => setStayFormData({ ...stayFormData, title: e.target.value })}
                  placeholder="e.g. River Whispers Eco-Resort"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={stayFormData.location}
                    onChange={(e) => setStayFormData({ ...stayFormData, location: e.target.value })}
                    placeholder="e.g. Dandeli, Sirsi, Gokarna"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={stayFormData.category}
                    onChange={(e) => setStayFormData({ ...stayFormData, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  >
                    <option>Riverfront Resort</option>
                    <option>Heritage Homestay</option>
                    <option>Beach Camp</option>
                    <option>Jungle Retreat</option>
                    <option>Boutique Villa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={stayFormData.price_per_night}
                    onChange={(e) => setStayFormData({ ...stayFormData, price_per_night: parseInt(e.target.value) || 0 })}
                    placeholder="1999"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Lead CTA Number</label>
                  <input
                    type="text"
                    value={stayFormData.whatsapp_number}
                    onChange={(e) => setStayFormData({ ...stayFormData, whatsapp_number: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Pricing Unit / Inclusions</label>
                  <input
                    type="text"
                    value={stayFormData.price_unit}
                    onChange={(e) => setStayFormData({ ...stayFormData, price_unit: e.target.value })}
                    placeholder="per person / night with food"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={stayFormData.cover_image}
                  onChange={(e) => setStayFormData({ ...stayFormData, cover_image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Amenities (Comma separated)</label>
                <input
                  type="text"
                  value={stayFormData.amenities}
                  onChange={(e) => setStayFormData({ ...stayFormData, amenities: e.target.value })}
                  placeholder="Kayaking, Rafting, Campfire, Buffet Meals, Rain Dance"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Property Description</label>
                <textarea
                  rows="3"
                  value={stayFormData.description}
                  onChange={(e) => setStayFormData({ ...stayFormData, description: e.target.value })}
                  placeholder="Tell travelers why this property is awesome..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
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

    </div>
  );
}
