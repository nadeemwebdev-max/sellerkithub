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

  const isExternal = announcement.link_url?.startsWith('http') || announcement.link_url?.startsWith('https://wa.me');

  const content = (
    <div className="flex items-center gap-2 flex-1 min-w-0 justify-start">
      <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] shrink-0 border border-white/30">
        <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
        {announcement.badge_text || 'ANNOUNCEMENT'}
      </span>
      <p className="font-semibold text-xs sm:text-sm truncate">
        {announcement.message}
      </p>
      {announcement.link_url && (
        <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-black bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full border border-white/20 ml-1.5 shrink-0 transition-all">
          <span>{announcement.link_text || 'Book Now'}</span>
          <ArrowRight className="w-3 h-3" />
        </span>
      )}
    </div>
  );

  return (
    <div className={`relative z-50 bg-gradient-to-r ${announcement.bg_gradient || 'from-emerald-600 to-teal-700'} text-white px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg transition-all duration-300`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-xs sm:text-sm">
        
        {/* Clickable Banner Body */}
        {announcement.link_url ? (
          isExternal ? (
            <a
              href={announcement.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center flex-1 min-w-0 hover:opacity-95 transition-opacity cursor-pointer py-0.5"
            >
              {content}
            </a>
          ) : (
            <Link
              to={announcement.link_url}
              className="flex items-center flex-1 min-w-0 hover:opacity-95 transition-opacity cursor-pointer py-0.5"
            >
              {content}
            </Link>
          )
        ) : (
          content
        )}

        {/* Dismiss Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDismissed(true);
          }}
          className="p-1.5 rounded-full hover:bg-black/20 text-white/80 hover:text-white transition-colors shrink-0 z-10"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

