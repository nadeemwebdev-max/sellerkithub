import React from 'react';

export default function AdPlaceholder({ slot = 'horizontal', className = '' }) {
  const isLeaderboard = slot === 'horizontal';

  return (
    <div className={`my-8 flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`w-full rounded-xl border border-dashed border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-white/[0.02] flex flex-col items-center justify-center p-4 transition text-center overflow-hidden ${
          isLeaderboard ? 'min-h-[100px] max-w-4xl' : 'min-h-[250px] max-w-sm'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
            Advertisement Space
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
          {isLeaderboard 
            ? 'Responsive 728x90 / Auto Ad Slot – Ready for Google AdSense integration' 
            : 'Responsive 300x250 Medium Rectangle Ad Slot'}
        </p>
      </div>
    </div>
  );
}
