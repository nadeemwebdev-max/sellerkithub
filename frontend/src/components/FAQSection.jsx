import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection({ title = "Frequently Asked Questions", faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // Structured JSON-LD Schema for Google FAQPage Rich Results
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="my-12">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
          <HelpCircle className="w-5 h-5" />
        </div>
        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h3>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] overflow-hidden transition-colors shadow-sm dark:shadow-none"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-brand-600 dark:text-brand-400' : ''
                  }`}
                />
              </button>
              <div
                className={`px-5 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3 ${
                  isOpen ? 'block' : 'hidden'
                }`}
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
