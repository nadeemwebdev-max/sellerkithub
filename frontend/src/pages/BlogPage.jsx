import React, { useState, useEffect } from 'react';
import { Search, Compass, BookOpen, Sparkles, Filter } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import SeoHead from '../components/SeoHead';
import { getPosts } from '../api/client';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Monsoon Treks', 'Adventure', 'Heritage & Culture', 'Food Trails'];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getPosts({
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      search: searchTerm.trim() || undefined
    }).then(data => {
      if (isMounted) {
        setPosts(data);
        setLoading(false);
      }
    }).catch(err => {
      console.error(err);
      if (isMounted) setLoading(false);
    });
    return () => { isMounted = false; };
  }, [selectedCategory, searchTerm]);

  return (
    <div className="py-10 sm:py-16">
      <SeoHead
        title="North Karnataka Travel Guides, Hidden Waterfalls & Food Trails"
        description="Detailed road trip itineraries, secret waterfall GPS routes, Dandeli river rafting guides, and Hubli food maps written by @travel_with.nj."
        slug="blog"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <BookOpen className="w-4 h-4" /> Travel Guides & Roadtrip Itineraries
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Stories from the <span className="text-gradient">Western Ghats</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Unfiltered travel advice, hidden waterfall coordinates, budget calculations, and local secrets for exploring North Karnataka.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-slate-800 space-y-4 mb-10">
          
          <div className="relative">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search guides (e.g. Sathodi, Badami, Girmit, Dandeli)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-105'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-panel rounded-3xl border border-slate-800 space-y-4">
            <Compass className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Guides Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any travel stories matching your filter. Try a different search query.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
              className="px-4 py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
