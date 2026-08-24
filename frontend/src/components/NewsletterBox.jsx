import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Send } from 'lucide-react';

export default function NewsletterBox({ 
  title = "Join 15,000+ E-Commerce Sellers", 
  subtitle = "Get weekly Amazon FBA fee updates, Etsy growth tactics, and margin calculation benchmarks delivered to your inbox." 
}) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-brand-600 via-indigo-600 to-brand-800 text-white shadow-xl relative overflow-hidden">
      {/* Background Decorative Glow Circles */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Weekly Seller Intelligence</span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-brand-100 leading-relaxed">
          {subtitle}
        </p>

        {submitted ? (
          <div className="p-4 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white flex items-center justify-center gap-2 text-sm font-semibold animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <span>Success! You are subscribed to SellerKit Weekly. Zero spam, unsubscribe anytime.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <div className="relative w-full flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your business email..." 
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/90 dark:bg-[#0c1322]/90 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-inner"
              />
            </div>
            <button 
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shrink-0"
            >
              <span>Subscribe Free</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[10px] text-brand-200">
          🔒 100% Privacy Guaranteed. We respect your inbox and never sell your data.
        </p>
      </div>
    </div>
  );
}
