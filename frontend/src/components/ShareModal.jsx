import React, { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  ExternalLink, 
  MessageSquare, 
  Send,
  Sparkles,
  Link2
} from 'lucide-react';
import { getSocialShareLinks } from '../utils/shareUtils';
import { trackEvent, TRACKED_EVENTS } from '../utils/analytics';

export default function ShareModal({ 
  isOpen, 
  onClose, 
  toolName = 'Calculation', 
  shareUrl = '', 
  summaryText = '' 
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const socialLinks = getSocialShareLinks(shareUrl, summaryText, `${toolName} on SellerKit Hub`);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    trackEvent(TRACKED_EVENTS.SHARE_LINK || 'share_link', { type: 'url', tool: toolName });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyMarkdown = () => {
    const markdown = `📊 **${toolName}**:\n${summaryText}\n\n👉 [Inspect live calculation](${shareUrl})`;
    navigator.clipboard.writeText(markdown);
    setCopiedMarkdown(true);
    trackEvent(TRACKED_EVENTS.SHARE_LINK || 'share_link', { type: 'markdown', tool: toolName });
    setTimeout(() => setCopiedMarkdown(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 p-6 sm:p-7 shadow-2xl space-y-6 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Live Calculation</span>
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              {toolName}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Anyone opening this link will see your exact inputs &amp; net profit numbers.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition"
            aria-label="Close share dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shareable Link Input */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
            Direct Shareable URL
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 min-w-0">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none select-all truncate"
                onClick={(e) => e.target.select()}
              />
            </div>
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center gap-1.5 transition shrink-0 shadow-md shadow-brand-600/20"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* 1-Click Markdown snippet for Reddit / Discord / Forums */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Copy for Reddit / Discord / Forums</span>
            </span>
            <button
              onClick={handleCopyMarkdown}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              {copiedMarkdown ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMarkdown ? 'Copied Markdown!' : 'Copy Snippet'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 font-mono bg-white dark:bg-black/20 p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 line-clamp-2">
            {summaryText}
          </p>
        </div>

        {/* Quick Social Share Buttons */}
        <div className="space-y-2">
          <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Share Directly to Communities
          </span>
          <div className="grid grid-cols-3 gap-2">
            <a
              href={socialLinks.reddit}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-orange-50 dark:bg-orange-500/10 hover:bg-orange-100 dark:hover:bg-orange-500/20 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition text-center"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Reddit</span>
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 hover:bg-sky-100 dark:hover:bg-sky-500/20 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition text-center"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Twitter / X</span>
            </a>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition text-center"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
