import React, { useState } from 'react';
import { Instagram, Sparkles, ShieldCheck, CheckCircle2, TrendingUp, Users, MapPin, Phone, Mail, Send, Award } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import { submitLeadInquiry } from '../api/client';

export default function CollabPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    business_name: '',
    package_interested: 'Reel + Website Bundle',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const stats = [
    { label: "Instagram Followers", value: "25,000+", icon: Instagram, color: "text-pink-400" },
    { label: "Avg Reel Views", value: "85,000+", icon: TrendingUp, color: "text-emerald-400" },
    { label: "Core Demographics", value: "Hubli-Dharwad / UK", icon: MapPin, color: "text-amber-400" },
    { label: "Engagement Rate", value: "8.6%", icon: Users, color: "text-teal-400" }
  ];

  const packages = [
    {
      name: "Reel & Story Spotlight",
      tagline: "For Cafes, Food Spots & Short-Term Events",
      price: "₹8,000 – ₹15,000",
      features: [
        "1 Dedicated High-Energy Reel on @travel_with.nj",
        "2 Instagram Stories with Direct Link Sticker",
        "Collaborator Tag & Pinned Post for 7 Days",
        "Raw HD Video Footage provided for your ads"
      ],
      popular: false
    },
    {
      name: "Verified Stay Listing & Lead Engine",
      tagline: "For Dandeli, Sirsi, Gokarna Resorts & Homestays",
      price: "₹12,000 / season or Commission",
      features: [
        "Permanent 'NJ Verified' listing on travelwithnj.com",
        "Direct WhatsApp lead routing straight to your phone",
        "1 In-depth Property Showcase Reel & Photo Shoot",
        "Featured in Travel with NJ Blog & Weekend Itineraries",
        "Zero middleman commission or monthly listing model"
      ],
      popular: true
    },
    {
      name: "Creator Promo + Modern Website Bundle",
      tagline: "Complete Digital Upgrade for Local Businesses",
      price: "₹25,000 – ₹35,000",
      features: [
        "Everything in Reel Spotlight Package",
        "Custom Fast Mobile-Friendly Website built for your brand",
        "Google Maps Profile & Local SEO Setup",
        "Digital QR Menu / Instant Booking Engine",
        "Domain & Hosting Configuration included"
      ],
      popular: false
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitLeadInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        destination_or_stay: `B2B Partnership: ${formData.business_name} (${formData.package_interested})`,
        travel_dates: 'Immediate Collaboration',
        number_of_guests: 1,
        message: formData.message
      });

      setSubmitted(true);

      const msg = `*Brand Collaboration Request via TravelWithNJ.com*\n\n` +
        `👤 *Name:* ${formData.name}\n` +
        `🏢 *Business:* ${formData.business_name}\n` +
        `📱 *Phone:* ${formData.phone}\n` +
        `📦 *Package:* ${formData.package_interested}\n` +
        `💬 *Message:* ${formData.message}`;

      setTimeout(() => {
        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
      }, 1000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-20">
      <SeoHead
        title="Partner with Travel with NJ | Creator Media Kit & Business Collabs"
        description="Collaborate with @travel_with.nj (25k+ community) for resort promotions, homestay verified listings, cafe features, and digital website bundles in Hubli-Dharwad."
        slug="collab"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/30">
            <Sparkles className="w-4 h-4" /> Media Kit & Brand Partnerships
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Grow Your Travel Business with <span className="text-gradient">@travel_with.nj</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            We help homestays, adventure resorts, cafes, and travel brands turn social media attention into verified, direct bookings and long-term digital presence.
          </p>
        </div>

        {/* Media Kit Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-2 text-center bg-white/90 dark:bg-slate-900/60 shadow-lg">
                <Icon className={`w-6 h-6 ${stat.color} mx-auto`} />
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Collaboration Packages */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
              Collaboration Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Transparent, high-ROI partnership options designed for local hospitality & food brands.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  pkg.popular
                    ? 'glass-panel border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-105 bg-emerald-50/30 dark:bg-[#0e1726]'
                    : 'glass-panel border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#090e1a] shadow-lg'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg">
                    Most Popular for Resorts
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {pkg.tagline}
                    </p>
                  </div>

                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-display">
                    {pkg.price}
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-2.5">
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <a
                    href="#contact-form"
                    onClick={() => setFormData({ ...formData, package_interested: pkg.name })}
                    className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      pkg.popular
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-transparent'
                    }`}
                  >
                    Select Package
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Contact / Inquire Form */}
        <div id="contact-form" className="max-w-2xl mx-auto glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xl bg-white dark:bg-[#0c121e]">
          <div className="text-center space-y-2 mb-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
              Request Collaboration
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Tell us about your property or brand. NJ will review and connect with you on WhatsApp within 24 hours.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Hegde"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Property / Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kali River Resort, Dandeli"
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98450 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Interested Package</label>
                  <select
                    value={formData.package_interested}
                    onChange={(e) => setFormData({ ...formData, package_interested: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>Reel & Story Spotlight</option>
                    <option>Verified Stay Listing & Lead Engine</option>
                    <option>Creator Promo + Modern Website Bundle</option>
                    <option>Custom Weekend Trip Sponsorship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tell us about your requirements</label>
                <textarea
                  rows="3"
                  placeholder="Share details about your location, property highlights, or dates you want us to visit..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Collab Inquiry & Chat with NJ</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">Proposal Sent!</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Opening WhatsApp to connect directly with NJ. We'll also reach out to your phone.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}


