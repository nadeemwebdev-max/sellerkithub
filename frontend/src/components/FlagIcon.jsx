import React from 'react';

export default function FlagIcon({ code = 'en', className = 'w-4 h-3' }) {
  const normalized = (code || 'en').toLowerCase();

  switch (normalized) {
    case 'en':
    case 'us':
      return (
        <svg viewBox="0 0 640 480" className={`${className} rounded-xs object-cover inline-block shrink-0 shadow-xs border border-slate-300 dark:border-white/20`}>
          <g fillRule="evenodd">
            <path fill="#bd3d44" d="M0 0h640v480H0z"/>
            <path stroke="#fff" strokeWidth="37" d="M0 55.5h640M0 129.5h640M0 203.5h640M0 277.5h640M0 351.5h640M0 425.5h640"/>
            <path fill="#192f5d" d="M0 0h260v259H0z"/>
            <g fill="#fff">
              <g id="s18">
                <g id="s6">
                  <g id="s3">
                    <circle cx="26" cy="24" r="6"/>
                    <circle cx="78" cy="24" r="6"/>
                    <circle cx="130" cy="24" r="6"/>
                  </g>
                  <circle cx="182" cy="24" r="6"/>
                  <circle cx="234" cy="24" r="6"/>
                </g>
                <g id="s4" y="24">
                  <circle cx="52" cy="48" r="6"/>
                  <circle cx="104" cy="48" r="6"/>
                  <circle cx="156" cy="48" r="6"/>
                  <circle cx="208" cy="48" r="6"/>
                </g>
              </g>
              <use href="#s18" y="48"/>
              <use href="#s18" y="96"/>
              <use href="#s18" y="144"/>
              <use href="#s6" y="192"/>
            </g>
          </g>
        </svg>
      );

    case 'es':
      return (
        <svg viewBox="0 0 640 480" className={`${className} rounded-xs object-cover inline-block shrink-0 shadow-xs border border-slate-300 dark:border-white/20`}>
          <path fill="#c60b1e" d="M0 0h640v480H0z"/>
          <path fill="#ffc400" d="M0 120h640v240H0z"/>
          <circle cx="180" cy="240" r="45" fill="#c60b1e" opacity="0.8"/>
          <circle cx="180" cy="240" r="32" fill="#ffc400"/>
        </svg>
      );

    case 'ja':
    case 'jp':
      return (
        <svg viewBox="0 0 640 480" className={`${className} rounded-xs object-cover inline-block shrink-0 shadow-xs border border-slate-300 dark:border-white/20`}>
          <path fill="#ffffff" d="M0 0h640v480H0z"/>
          <circle cx="320" cy="240" r="140" fill="#bc002d"/>
        </svg>
      );

    case 'fr':
      return (
        <svg viewBox="0 0 640 480" className={`${className} rounded-xs object-cover inline-block shrink-0 shadow-xs border border-slate-300 dark:border-white/20`}>
          <path fill="#002654" d="M0 0h213.3v480H0z"/>
          <path fill="#ffffff" d="M213.3 0h213.4v480H213.3z"/>
          <path fill="#ce1126" d="M426.7 0H640v480H426.7z"/>
        </svg>
      );

    case 'de':
      return (
        <svg viewBox="0 0 640 480" className={`${className} rounded-xs object-cover inline-block shrink-0 shadow-xs border border-slate-300 dark:border-white/20`}>
          <path fill="#000000" d="M0 0h640v160H0z"/>
          <path fill="#dd0000" d="M0 160h640v160H0z"/>
          <path fill="#ffce00" d="M0 320h640v160H0z"/>
        </svg>
      );

    case 'pt':
      return (
        <svg viewBox="0 0 640 480" className={`${className} rounded-xs object-cover inline-block shrink-0 shadow-xs border border-slate-300 dark:border-white/20`}>
          <path fill="#046a38" d="M0 0h256v480H0z"/>
          <path fill="#da291c" d="M256 0h384v480H256z"/>
          <circle cx="256" cy="240" r="75" fill="#ffc400"/>
          <circle cx="256" cy="240" r="50" fill="#ffffff"/>
          <path fill="#002654" d="M240 220h32v40h-32z"/>
        </svg>
      );

    case 'ko':
    case 'kr':
      return (
        <svg viewBox="0 0 640 480" className={`${className} rounded-xs object-cover inline-block shrink-0 shadow-xs border border-slate-300 dark:border-white/20`}>
          <path fill="#ffffff" d="M0 0h640v480H0z"/>
          <g transform="translate(320 240)">
            <circle cx="0" cy="0" r="100" fill="#cd2e3a"/>
            <path fill="#0047a0" d="M0-100a100 100 0 0 0 0 200A50 50 0 0 0 0 0a50 50 0 0 1 0-100z"/>
          </g>
          {/* Trigrams */}
          <g fill="#000000" transform="translate(320 240)">
            <rect x="-240" y="-140" width="30" height="70" rx="3" transform="rotate(33.7 -225 -105)"/>
            <rect x="210" y="70" width="30" height="70" rx="3" transform="rotate(33.7 225 105)"/>
            <rect x="210" y="-140" width="30" height="70" rx="3" transform="rotate(-33.7 225 -105)"/>
            <rect x="-240" y="70" width="30" height="70" rx="3" transform="rotate(-33.7 -225 105)"/>
          </g>
        </svg>
      );

    case 'it':
      return (
        <svg viewBox="0 0 640 480" className={`${className} rounded-xs object-cover inline-block shrink-0 shadow-xs border border-slate-300 dark:border-white/20`}>
          <path fill="#009246" d="M0 0h213.3v480H0z"/>
          <path fill="#ffffff" d="M213.3 0h213.4v480H213.3z"/>
          <path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 640 480" className={`${className} rounded-xs object-cover inline-block shrink-0 shadow-xs border border-slate-300 dark:border-white/20`}>
          <path fill="#4f46e5" d="M0 0h640v480H0z"/>
          <circle cx="320" cy="240" r="100" fill="#ffffff" opacity="0.3"/>
        </svg>
      );
  }
}
