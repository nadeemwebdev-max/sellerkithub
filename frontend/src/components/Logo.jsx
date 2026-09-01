import React from 'react';

export default function Logo({ className = '', size = 'md' }) {
  const isSmall = size === 'sm';
  const iconSizeClass = isSmall ? 'w-8 h-8 rounded-lg' : 'w-9 h-9 rounded-xl';
  const innerRoundClass = isSmall ? 'rounded-[7px]' : 'rounded-[10px]';
  const textSizeClass = isSmall ? 'text-base' : 'text-lg';

  return (
    <div className={`flex items-center gap-2.5 group shrink-0 ${className}`}>
      {/* Hexagon Box Icon with Gradient Outline */}
      <div className={`${iconSizeClass} bg-gradient-to-tr from-brand-600 via-indigo-500 to-emerald-400 p-0.5 shadow-glow-brand transition-transform group-hover:scale-105 flex items-center justify-center shrink-0`}>
        <div className={`w-full h-full bg-white dark:bg-[#090d16] ${innerRoundClass} flex items-center justify-center p-1.5`}>
          <svg className="w-full h-full" viewBox="0 0 48 48" fill="none">
            <path d="M24 8L38 16V32L24 40L10 32V16L24 8Z" stroke="currentColor" className="text-brand-600 dark:text-brand-400" strokeWidth="3" strokeLinejoin="round" />
            <path d="M24 8V24M24 24L38 32M24 24L10 32" stroke="currentColor" className="text-brand-600 dark:text-brand-400" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            <circle cx="24" cy="24" r="5" className="fill-emerald-500 dark:fill-emerald-400" />
          </svg>
        </div>
      </div>

      {/* Brand Name & Hub Badge */}
      <div className="flex items-center gap-1.5">
        <span className={`font-display font-extrabold ${textSizeClass} tracking-tight text-slate-900 dark:text-white`}>
          Seller<span className="text-brand-600 dark:text-brand-400">Kit</span>
        </span>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 uppercase tracking-wide">
          HUB
        </span>
      </div>
    </div>
  );
}
