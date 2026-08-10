import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { getActiveAnnouncement } from '../api/client';

export default function AnnouncementBanner({ overrideData = null }) {
  const [announcement, setAnnouncement] = useState(overrideData);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (overrideData) {
      setAnnouncement(overrideData);
      return;
    }
    let isMounted = true;
    getActiveAnnouncement().then(data => {
      if (isMounted && data && data.is_active) {
        setAnnouncement(data);
      }
    });
    return () => { isMounted = false; };
  }, [overrideData]);

  if (dismissed || !announcement || !announcement.is_active) {
    return null;
  }

  return (
    <div className={`relative z-50 bg-gradient-to-r ${announcement.bg_gradient || 'from-emerald-600 to-teal-700'} text-white px-4 py-2.5 shadow-lg transition-all duration-300`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] shrink-0 border border-white/30">
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
            {announcement.badge_text || 'ANNOUNCEMENT'}
          </span>
          <p className="font-medium truncate">
            {announcement.message}
          </p>
          {announcement.link_url && (
            <Link
              to={announcement.link_url}
              className="hidden sm:inline-flex items-center gap-1 font-bold underline underline-offset-4 hover:text-amber-200 transition-colors ml-2 shrink-0"
            >
              {announcement.link_text || 'Learn More'}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-full hover:bg-black/20 text-white/80 hover:text-white transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
