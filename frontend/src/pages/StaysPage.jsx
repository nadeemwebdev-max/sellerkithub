import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, Filter, MapPin, Search, ShieldCheck, Sparkles, SlidersHorizontal } from 'lucide-react';
import StayCard from '../components/StayCard';
import InquiryModal from '../components/InquiryModal';
import SeoHead from '../components/SeoHead';
import { getStays } from '../api/client';

export default function StaysPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const locationParam = searchParams.get('location') || 'All';
  const categoryParam = searchParams.get('category') || 'All';

  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(locationParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedStayForInquiry, setSelectedStayForInquiry] = useState(null);

  const locations = ['All', 'Dandeli', 'Sirsi', 'Gokarna', 'Yellapur', 'Badami', 'Hubli-Dharwad'];
  const categories = ['All', 'Resort', 'Homestay', 'Camping', 'Jungle Retreat'];

  useEffect(() => {
    setSelectedLocation(searchParams.get('location') || 'All');
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getStays({
      location: selectedLocation !== 'All' ? selectedLocation : undefined,
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      search: searchTerm.trim() || undefined
    }).then(data => {
      if (isMounted) {
        setStays(data);
        setLoading(false);
      }
    }).catch(err => {
      console.error(err);
      if (isMounted) setLoading(false);
    });
    return () => { isMounted = false; };
  }, [selectedLocation, selectedCategory, searchTerm]);

  const handleLocationChange = (loc) => {
    setSelectedLocation(loc);
    if (loc === 'All') {
      searchParams.delete('location');
    } else {
      searchParams.set('location', loc);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="py-10 sm:py-16">
      <SeoHead
        title="Curated Stays & Weekend Getaways in Dandeli, Sirsi & Gokarna"
        description="Book verified resorts, river camps, and heritage homestays across North Karnataka. Inspected by @travel_with.nj with direct WhatsApp booking discounts."
        slug="stays"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" /> 100% Inspected & Direct Host Deals
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Curated Stays & <span className="text-gradient">Weekend Retreats</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Handpicked riverfront camps in Dandeli, 100-year-old areca plantations in Sirsi, cliffside glamping in Gokarna, and forest chalets in Yellapur.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 mb-10 shadow-lg">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search by resort name, activity (rafting, campfire), or town..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Location Tabs */}
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> Filter by Location:
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

        </div>

        {/* Stays Grid */}
        {loading ? (
          <div className="min-h-[300px] flex items-center justify-center">
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
          <div className="text-center py-16 glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <Compass className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Stays Found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              We couldn't find any stays matching your filter. Try changing the location or search term.
            </p>
            <button
              onClick={() => { setSelectedLocation('All'); setSelectedCategory('All'); setSearchTerm(''); }}
              className="px-4 py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl"
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
