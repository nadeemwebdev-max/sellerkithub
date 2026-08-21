import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Clock, ShieldCheck, HelpCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthorBio from '../components/AuthorBio';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback / Feature Request');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-700 dark:text-slate-300 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20">
          <Mail className="w-3.5 h-3.5" />
          <span>Community Feedback & Support Channel</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Contact Us & <span className="text-brand-600 dark:text-brand-400">Editorial Support</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Have a question about calculation models, noticed a marketplace fee change, or want to suggest a new tool? We respond to every inquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info (5 Cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4 shadow-sm">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Direct Support & Inquiries
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Our data analytics team monitors official fee announcements for Amazon FBA, Etsy, eBay, Shopify, and Indian channels.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase font-semibold">Email Channel</span>
                  <a href="mailto:support@sellerkithub.com" className="font-mono text-brand-600 dark:text-brand-400 hover:underline">
                    support@sellerkithub.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase font-semibold">Response SLA</span>
                  <span>Within 24–48 Hours</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase font-semibold">Data Privacy</span>
                  <span>Zero Server Data Logging</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-xs space-y-2">
            <span className="font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-brand-500" />
              <span>Looking for calculation help?</span>
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Check our extensive FAQ guides on the{' '}
              <Link to="/amazon-fee-calculator" className="text-brand-600 dark:text-brand-400 underline">Amazon FBA Calculator</Link>{' '}
              or{' '}
              <Link to="/etsy-fee-calculator" className="text-brand-600 dark:text-brand-400 underline">Etsy Calculator</Link>.
            </p>
          </div>
        </div>

        {/* Contact Form (7 Cols) */}
        <div className="md:col-span-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Message Received!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                Thank you for reaching out. A member of the SellerKit team will review your inquiry and respond within 24-48 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs text-slate-900 dark:text-white font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-3">
                Send a Direct Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Topic / Inquiry Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none"
                >
                  <option value="Feedback / Feature Request" className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">Feedback / Feature Request</option>
                  <option value="Fee Rate Correction" className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">Marketplace Fee Update Alert</option>
                  <option value="Bug Report" className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">Tool Bug Report</option>
                  <option value="Partnership / Sponsorship" className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">Advertising & Sponsorship Inquiry</option>
                  <option value="Other" className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                  placeholder="Details of your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-brand-600/20"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Author & Methodology Box */}
      <AuthorBio 
        authorName="SellerKit Support & Communications Team"
        authorRole="Community Engagement & Data Operations"
        lastUpdated="Active Support SLA"
        category="Contact Governance"
      />

    </div>
  );
}
