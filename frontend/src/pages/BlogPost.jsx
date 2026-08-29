import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  User, 
  ArrowLeft, 
  Share2, 
  ChevronRight,
  MessageCircle,
  Twitter,
  Linkedin,
  Copy
} from 'lucide-react';
import { getBlogPostBySlug, BLOG_POSTS } from '../data/blogPosts';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';
import NewsletterBox from '../components/NewsletterBox';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 2);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://sellerkithub.com/blog/${post.slug}`;

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`${post.title}\n\n${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${post.title} via @SellerKitHub`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/blog" className="hover:text-brand-600 dark:hover:text-brand-400">Blog</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px] sm:max-w-none">
          {post.title}
        </span>
      </nav>

      {/* Back to Blog Button */}
      <Link 
        to="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Articles</span>
      </Link>

      {/* Main Article Header */}
      <header className="space-y-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 font-bold text-xs border border-brand-200 dark:border-brand-500/20">
            {post.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
            <Clock className="w-3.5 h-3.5 text-brand-500" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-slate-200 dark:border-white/10 py-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4 text-brand-600" />
              <strong className="text-slate-900 dark:text-white">{post.author}</strong>
            </span>
            <span className="flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              <span>Published: {post.date}</span>
            </span>
            {post.dateModified && (
              <span className="hidden sm:inline text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Updated: {post.dateModified}
              </span>
            )}
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={shareOnWhatsApp}
              title="Share on WhatsApp"
              className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1 transition shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
            <button
              onClick={shareOnTwitter}
              title="Share on Twitter"
              className="p-2 rounded-lg bg-slate-900 dark:bg-white/10 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1 transition"
            >
              <Twitter className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={shareOnLinkedIn}
              title="Share on LinkedIn"
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1 transition"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={copyToClipboard}
              title="Copy Article Link"
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1 transition"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Featured Header Banner Image */}
      <div className="rounded-2xl overflow-hidden mb-10 border border-slate-200 dark:border-white/10 shadow-lg bg-slate-100 dark:bg-slate-900">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-auto max-h-[420px] object-cover"
          width="840"
          height="420"
          fetchpriority="high"
          loading="eager"
          decoding="async"
        />
      </div>

      <AdPlaceholder slot="horizontal" />

      {/* HTML Article Body */}
      <article className="my-10 p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] shadow-xl blog-article-content">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      {/* Article Specific FAQs */}
      {post.faqs && post.faqs.length > 0 && (
        <section className="my-10">
          <FAQSection customFaqs={post.faqs} title={`Frequently Asked Questions: ${post.category}`} />
        </section>
      )}

      {/* Newsletter Email Capture Component */}
      <NewsletterBox />

      {/* Author Bio & E-E-A-T Component */}
      <AuthorBio 
        authorName={post.author || "SellerKit Editorial & Analytics Team"}
        authorRole="Senior E-Commerce Data Analyst & Author"
        lastUpdated={`Updated ${post.dateModified || post.date}`}
        category={post.category || "E-Commerce Strategy"}
      />

      {/* Recommended Tools Component */}
      <AffiliateCTA 
        platform={post.category?.toLowerCase().includes('amazon') ? 'amazon' : post.category?.toLowerCase().includes('etsy') ? 'etsy' : 'general'}
        title="Recommended Tools for This Guide"
        description="Accelerate your store growth with curated e-commerce software."
      />

      <AdPlaceholder slot="horizontal" />

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="my-12 space-y-6">
          <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Related Seller Strategy Guides
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map(rel => (
              <div 
                key={rel.slug}
                className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-3 shadow-sm hover:border-brand-500/50 transition"
              >
                <span className="text-[10px] uppercase font-bold text-brand-600 dark:text-brand-400">
                  {rel.category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  <Link to={`/blog/${rel.slug}`} className="hover:underline">
                    {rel.title}
                  </Link>
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">{rel.excerpt}</p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
