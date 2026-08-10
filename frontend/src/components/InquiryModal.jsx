import React, { useState } from 'react';
import { X, Send, Phone, User, Calendar, Users, MessageSquare, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { submitLeadInquiry } from '../api/client';

export default function InquiryModal({ stay, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    travel_dates: '',
    number_of_guests: 2,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const defaultDestination = stay ? `${stay.title} (${stay.location})` : 'Custom North Karnataka Trip';
  const whatsappTargetNumber = (stay?.whatsapp_number || '+919876543210').replace(/[^0-9]/g, '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please provide your name and WhatsApp phone number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Submit lead to FastAPI backend CRM
      await submitLeadInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        destination_or_stay: defaultDestination,
        travel_dates: formData.travel_dates || 'Flexible dates',
        number_of_guests: parseInt(formData.number_of_guests) || 2,
        message: formData.message || `Interested in booking ${stay?.title || 'a weekend trip'}`
      });

      setSubmitted(true);

      // 2. Prepare WhatsApp direct message
      const textMessage = `*New Stay Booking Inquiry via TravelWithNJ.com* 🌿\n\n` +
        `👤 *Name:* ${formData.name}\n` +
        `📱 *Phone:* ${formData.phone}\n` +
        `🏡 *Property/Trip:* ${defaultDestination}\n` +
        `📅 *Dates:* ${formData.travel_dates || 'Flexible'}\n` +
        `👥 *Guests:* ${formData.number_of_guests} people\n` +
        (formData.message ? `💬 *Note:* ${formData.message}\n` : '') +
        `\n_Hey NJ! Please check availability and community discount for this stay._`;

      const whatsappUrl = `https://wa.me/${whatsappTargetNumber}?text=${encodeURIComponent(textMessage)}`;

      // Open WhatsApp automatically in a new tab
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1200);

    } catch (err) {
      console.error(err);
      setError('Failed to record inquiry. You can still reach NJ directly on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-8 bg-[#0c121e]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" /> NJ Verified Booking & Discounts
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Inquire & Book <span className="text-emerald-400">{stay ? stay.title : 'Your Stay'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Fill the details below to lock in direct host pricing and get instant WhatsApp confirmation.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Joshi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98450 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={formData.number_of_guests}
                      onChange={(e) => setFormData({ ...formData, number_of_guests: e.target.value })}
                      className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Expected Travel Dates
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Next Weekend (Aug 24 - 26)"
                    value={formData.travel_dates}
                    onChange={(e) => setFormData({ ...formData, travel_dates: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Special Requests / Activities
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <textarea
                    rows="2"
                    placeholder="e.g. Need river rafting package + vegetarian food"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry & Open WhatsApp Direct</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-500">
                🔒 100% Free Service. No advance payment required on the website.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white font-display">Inquiry Sent Successfully!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              We've saved your inquiry and opening WhatsApp to connect you directly with NJ for dates confirmation and pricing.
            </p>
            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={onClose}
                className="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
