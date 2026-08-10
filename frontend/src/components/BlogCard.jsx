import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, ArrowRight, Tag } from 'lucide-react';

const FALLBACK_BLOG_IMG = "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80";

export default function BlogCard({ post }) {
  const formattedDate = new Date(post.created_at || Date.now()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col group border border-slate-800/90 transition-all duration-300">
      
      {/* Cover Image */}
      <Link to={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden bg-slate-900 block">
        <img
          src={post.cover_image}
          alt={post.title}
          onError={(e) => {
            if (e.target.src !== FALLBACK_BLOG_IMG) {
              e.target.src = FALLBACK_BLOG_IMG;
            }
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] via-transparent to-black/20" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-emerald-500/90 backdrop-blur-md text-slate-950 font-bold text-xs px-3 py-1 rounded-full shadow-md">
            {post.category || 'Travel Guide'}
          </span>
        </div>
      </Link>

      {/* Body Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              {post.read_time || '5 min read'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              {(post.views || 1200).toLocaleString()} views
            </span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>

          {/* Title */}
          <Link to={`/blog/${post.slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors font-display line-clamp-2 leading-snug">
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Read More Link */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 truncate max-w-[200px]">
            <Tag className="w-3 h-3 text-emerald-400" />
            <span className="truncate">{post.tags?.split(',')[0] || 'North Karnataka'}</span>
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group/btn"
          >
            <span>Read Guide</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

    </article>
  );
}
