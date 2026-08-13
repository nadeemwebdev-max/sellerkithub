import React from 'react';
import { BookOpen, CheckCircle, Lightbulb, BarChart3 } from 'lucide-react';

export default function SEOGuide({
  title,
  subtitle,
  formula,
  steps = [],
  tips = [],
  children
}) {
  return (
    <article className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-800 dark:text-slate-200 space-y-6 shadow-sm dark:shadow-none">
      
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-white/10 pb-4">
        <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Comprehensive Guide & Strategy</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* Formula Box */}
      {formula && (
        <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-900 dark:text-brand-300">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1.5 text-brand-600 dark:text-brand-400">
            <BarChart3 className="w-4 h-4" />
            <span>The Mathematical Formula</span>
          </div>
          <code className="font-mono text-xs sm:text-sm font-semibold block bg-white dark:bg-[#090d16]/60 p-3 rounded-lg border border-brand-200 dark:border-brand-500/20 overflow-x-auto text-emerald-700 dark:text-emerald-400">
            {formula}
          </code>
        </div>
      )}

      {/* Custom Body / Injected Children */}
      {children}

      {/* Step by Step Guide */}
      {steps.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
            Step-by-Step Instructions:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100 mb-0.5">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pro Tips */}
      {tips.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-900 dark:text-amber-300 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <Lightbulb className="w-4 h-4" />
            <span>Seller Pro Tips & Best Practices</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </article>
  );
}
