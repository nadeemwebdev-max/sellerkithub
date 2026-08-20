import React, { useEffect } from 'react';

export default function AdPlaceholder({ slot = 'horizontal', slotId = '', className = '' }) {
  const isLeaderboard = slot === 'horizontal';
  const adClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID; // e.g. "ca-pub-1234567890123456"
  const isDev = import.meta.env.DEV || import.meta.env.VITE_SHOW_AD_PLACEHOLDERS === 'true';

  useEffect(() => {
    if (adClientId && typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        // Suppress AdSense push errors if adblocker is active
      }
    }
  }, [adClientId]);

  // Case 1: Real Google AdSense Client ID is set -> Render live Google AdSense unit
  if (adClientId) {
    return (
      <div className={`my-8 flex justify-center overflow-hidden ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={adClientId}
          data-ad-slot={slotId || (isLeaderboard ? '1234567890' : '0987654321')}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Case 2: Development Mode or Explicit Flag -> Render Dev Placeholder Box
  if (isDev) {
    return (
      <div className={`my-8 flex flex-col items-center justify-center ${className}`}>
        <div 
          className={`w-full rounded-xl border border-dashed border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-white/[0.02] flex flex-col items-center justify-center p-4 transition text-center overflow-hidden ${
            isLeaderboard ? 'min-h-[90px] max-w-4xl' : 'min-h-[250px] max-w-sm'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
              Ad Space (Dev Preview)
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            {isLeaderboard 
              ? 'Responsive 728x90 Leaderboard Ad Slot – Hidden on production until VITE_ADSENSE_CLIENT_ID is set' 
              : 'Responsive 300x250 Medium Rectangle Ad Slot – Hidden on production until VITE_ADSENSE_CLIENT_ID is set'}
          </p>
        </div>
      </div>
    );
  }

  // Case 3: Live Production build without AdSense Client ID -> Hide cleanly from public visitors
  return null;
}
