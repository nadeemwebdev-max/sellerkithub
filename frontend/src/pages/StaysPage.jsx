import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Compass, Filter, MapPin, Search, ShieldCheck, Sparkles, SlidersHorizontal, Users, Calendar, ArrowRight, Heart, CheckCircle2 } from 'lucide-react';
import StayCard from '../components/StayCard';
import InquiryModal from '../components/InquiryModal';
import SeoHead from '../components/SeoHead';
import { getStays } from '../api/client';

export default function StaysPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const locationParam = searchParams.get('location') || 'All';
  const categoryParam = searchParams.get('category') || 'All';
  const typeParam = searchParams.get('type') || 'all'; // 'all', 'stays', 'trips'

  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(locationParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [activeTab, setActiveTab] = useState(typeParam);
  const [selectedStayForInquiry, setSelectedStayForInquiry] = useState(null);

  const locations = ['All', 'Dandeli', 'Sirsi', 'Yellapur', 'Gokarna', 'Honnavar', 'Badami', 'Hampi'];
  const categories = [
    'All',
    'Riverfront Resort',
    'Heritage Homestay',
    'Beach Glamping',
    'Treehouse Resort',
    'Riverside Camping',
    'Weekend Group Trip'
  ];

  useEffect(() => {
    setSelectedLocation(searchParams.get('location') || 'All');
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const isGroupTripTab = activeTab === 'trips';
    const isStaysTab = activeTab === 'stays';

    let targetCategory = selectedCategory !== 'All' ? selectedCategory : undefined;
    if (isGroupTripTab && selectedCategory === 'All') {
      targetCategory = 'Weekend Group Trip';
    }

    getStays({
      location: selectedLocation !== 'All' ? selectedLocation : undefined,
      category: targetCategory,
      search: searchTerm.trim() || undefined
    }).then(data => {
      if (isMounted) {
        let filtered = data;
        if (isStaysTab) {
          filtered = data.filter(item => item.category !== 'Weekend Group Trip');
        } else if (isGroupTripTab) {
          filtered = data.filter(item => item.category === 'Weekend Group Trip');
        }
        setStays(filtered);
        setLoading(false);
      }
    }).catch(err => {
      console.error(err);
      if (isMounted) setLoading(false);
    });
    return () => { isMounted = false; };
  }, [selectedLocation, selectedCategory, searchTerm, activeTab]);

  const handleLocationChange = (loc) => {
    setSelectedLocation(loc);
    if (loc === 'All') {
      searchParams.delete('location');
    } else {
      searchParams.set('location', loc);
    }
    setSearchParams(searchParams);
  };

  const groupTripsCount = stays.filter(s => s.category === 'Weekend Group Trip').length;

  return (
    <div className="py-10 sm:py-16">
      <SeoHead
        title="Curated Stays, Homestays & Weekend Group Trips in North Karnataka"
        description="Book verified resorts, river rafting camps in Dandeli, 120-yr heritage homestays in Sirsi, beach glamping in Gokarna, and join NJ's weekend group batches."
        slug="stays"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
<<<<<<< HEAD
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" /> 100% Inspected & Direct Community Discounts
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Curated Stays & <span className="text-gradient">Weekend Group Trips</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Dandeli white-water rafting resorts, 120-year-old traditional Sirsi estates, cliffside glamping pods in Gokarna, and organized weekend group batches led by <strong className="text-white">NJ</strong>.
=======
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" /> 100% Inspected & Direct Host Deals
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Curated Stays & <span className="text-gradient">Weekend Retreats</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Handpicked riverfront camps in Dandeli, 100-year-old areca plantations in Sirsi, cliffside glamping in Gokarna, and forest chalets in Yellapur.
>>>>>>> origin/main
          </p>
        </div>

        {/* Top Type Selector Tabs */}
        <div className="flex justify-center">
          <div className="glass-panel p-1.5 rounded-2xl border border-slate-800 flex items-center gap-2 max-w-md w-full">
            <button
              onClick={() => { setActiveTab('all'); setSelectedCategory('All'); }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                activeTab === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              All Listings ({stays.length})
            </button>
            <button
              onClick={() => { setActiveTab('stays'); setSelectedCategory('All'); }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                activeTab === 'stays'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Verified Stays 🏡
            </button>
            <button
              onClick={() => { setActiveTab('trips'); setSelectedCategory('Weekend Group Trip'); }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                activeTab === 'trips'
                  ? 'bg-gradient-to-r from-pink-500 to-amber-500 text-white shadow-md'
                  : 'text-pink-400 hover:bg-pink-500/10'
              }`}
            >
              NJ Group Trips 🔥
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
<<<<<<< HEAD
        <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4">
=======
        <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 mb-10 shadow-lg">
>>>>>>> origin/main
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search by resort name, activity (rafting, stream bath, bouldering), or town..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Region Tabs */}
          <div>
<<<<<<< HEAD
            <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Filter by Region / Hub:
=======
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> Filter by Location:
>>>>>>> origin/main
            </div>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocationChange(loc)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedLocation === loc
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-105'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Chips */}
          {activeTab !== 'trips' && (
            <div>
              <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-teal-400" /> Experience Type:
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Stays & Trips Grid */}
        {loading ? (
          <div className="min-h-[350px] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : stays.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {stays.map((stay) => (
              <StayCard
                key={stay.id}
                stay={stay}
                onInquire={(s) => setSelectedStayForInquiry(s)}
              />
            ))}
          </div>
        ) : (
<<<<<<< HEAD
          <div className="text-center py-16 glass-panel rounded-3xl border border-slate-800 space-y-4">
            <Compass className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Stays Found Matching Filters</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try changing the region, category, or search keywords.
=======
          <div className="text-center py-16 glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <Compass className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Stays Found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              We couldn't find any stays matching your filter. Try changing the location or search term.
>>>>>>> origin/main
            </p>
            <button
              onClick={() => { setSelectedLocation('All'); setSelectedCategory('All'); setSearchTerm(''); setActiveTab('all'); }}
              className="px-4 py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        )}


      </div>

      {/* Inquiry Modal */}
      {selectedStayForInquiry && (
        <InquiryModal
          stay={selectedStayForInquiry.id ? selectedStayForInquiry : null}
          onClose={() => setSelectedStayForInquiry(null)}
        />
      )}
    </div>
  );
}
