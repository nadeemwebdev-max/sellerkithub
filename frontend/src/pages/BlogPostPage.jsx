import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Eye, Calendar, ArrowLeft, Share2, Tag, ShieldCheck, Instagram, Sparkles, MessageCircle, Compass } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import { getPostBySlug } from '../api/client';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getPostBySlug(slug).then(data => {
      if (isMounted) {
        setPost(data);
        setLoading(false);
      }
    }).catch(err => {
      console.error(err);
      if (isMounted) setLoading(false);
    });
    return () => { isMounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-white mb-2">Guide Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">The travel story you're looking for doesn't exist.</p>
        <Link to="/blog" className="px-5 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs">
          Back to All Guides
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(post.created_at || Date.now()).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const jsonLdArticleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [post.cover_image],
    "datePublished": post.created_at,
    "dateModified": post.updated_at || post.created_at,
    "author": {
      "@type": "Person",
      "name": "NJ",
      "url": "https://www.instagram.com/travel_with.nj"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Travel with NJ",
      "logo": {
        "@type": "ImageObject",
        "url": "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=300&q=80"
      }
    },
    "description": post.excerpt
  };

  return (
    <article className="py-8 sm:py-12">
      <SeoHead
        title={post.seo_title || post.title}
        description={post.seo_description || post.excerpt}
        image={post.cover_image}
        slug={`blog/${post.slug}`}
        type="article"
        schema={jsonLdArticleSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Share */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Guides
          </Link>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel text-xs text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share Story'}</span>
          </button>
        </div>

        {/* Category & Meta */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-500/90 text-slate-950 font-bold text-xs px-3 py-1 rounded-full shadow-md">
              {post.category || 'Travel Guide'}
            </span>
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> {post.read_time || '5 min read'}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-400" /> {(post.views || 1200).toLocaleString()} Views
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> {formattedDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
            {post.excerpt}
          </p>

          {/* Author Card */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 p-[2px]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="NJ Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1">
                  Written by NJ <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-400">
                  Creator at @travel_with.nj (25k+ community)
                </p>
              </div>
            </div>

            <a
              href="https://www.instagram.com/travel_with.nj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1"
            >
              <Instagram className="w-4 h-4" /> Follow
            </a>
          </div>
        </div>

        {/* Hero Cover Photo */}
        <div className="aspect-[16/9] rounded-3xl overflow-hidden glass-panel border border-slate-800 mb-10 bg-slate-900 shadow-2xl">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Post Content */}
        <div className="prose prose-invert max-w-none space-y-6 text-slate-200 text-base sm:text-lg leading-relaxed font-light">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('# ')) {
              return <h1 key={idx} className="text-2xl sm:text-3xl font-bold text-white font-display pt-6">{paragraph.replace('# ', '')}</h1>;
            }
            if (paragraph.startsWith('## ')) {
              return <h2 key={idx} className="text-xl sm:text-2xl font-bold text-emerald-400 font-display pt-4">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={idx} className="text-lg sm:text-xl font-semibold text-white pt-2">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('---')) {
              return <hr key={idx} className="border-slate-800 my-6" />;
            }
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={idx} className="space-y-1.5 list-disc list-inside text-sm sm:text-base text-slate-300">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i}>{item.replace(/^- /, '')}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="text-slate-300 whitespace-pre-line text-sm sm:text-base leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-14 glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 to-teal-950/20 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Planning this trip? Book verified stays nearby!
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Get exclusive NJ community discounts on Dandeli camps, Sirsi plantations, and Gokarna pods.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/stays"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              Explore Verified Stays
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}
