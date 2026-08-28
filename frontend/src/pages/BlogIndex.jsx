import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ArrowRight, 
  User
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';
import NewsletterBox from '../components/NewsletterBox';

export default function BlogIndex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const set = new Set(BLOG_POSTS.map(p => p.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>E-Commerce Seller Insights & Strategy Guides</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          SellerKitHub <span className="text-brand-600 dark:text-brand-400">E-Commerce Blog</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Actionable guides on Amazon FBA fees, Etsy shop optimization, profit margin pricing strategies, multi-channel selling, and inventory management.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="max-w-4xl mx-auto mb-10 space-y-4">
        <div className="relative">
          <label htmlFor="blog-search" className="sr-only">Search articles</label>
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            id="blog-search"
            aria-label="Search articles on Amazon FBA, Etsy fees, margin vs markup"
            type="text"
            placeholder="Search articles on Amazon FBA, Etsy fees, margin vs markup..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-500 shadow-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AdPlaceholder slot="horizontal" />

      {/* Articles Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          {filteredPosts.map(post => (
            <article 
              key={post.slug}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] overflow-hidden flex flex-col hover:border-brand-500/50 transition duration-300 shadow-lg"
            >
              <Link to={`/blog/${post.slug}`} className="block overflow-hidden bg-slate-100 dark:bg-white/5">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover hover:scale-105 transition duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </Link>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 font-bold border border-brand-200 dark:border-brand-500/20">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-brand-500" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition leading-snug">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <User className="w-3.5 h-3.5 text-brand-600" />
                    <span>{post.author}</span>
                  </div>

                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 hover:gap-2 transition-all"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-500 dark:text-slate-400 space-y-3">
          <BookOpen className="w-12 h-12 mx-auto stroke-1" />
          <p className="text-sm font-semibold">No blog articles match your search query.</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            className="text-xs text-brand-600 dark:text-brand-400 font-bold underline"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Newsletter Email Capture Component */}
      <NewsletterBox />

      {/* Author Bio & E-E-A-T Component */}
      <AuthorBio 
        authorName="SellerKit Editorial & Content Team"
        authorRole="E-Commerce Strategy & Analytics Editors"
        lastUpdated="2026 Industry Analysis Complete"
        category="E-Commerce Research & Articles"
      />

      {/* Recommended Seller Tools Affiliate Component */}
      <AffiliateCTA 
        platform="general" 
        title="Recommended Seller Automation Software" 
        description="Empower your e-commerce business with industry-standard research and inventory tools."
      />

    </div>
  );
}
