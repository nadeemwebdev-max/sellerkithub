import React from 'react';
import { Shield, Lock } from 'lucide-react';
import { useI18n } from '../i18n/utils';

export default function PrivacyPolicy({ lang: propLang }) {
  const { lang, t } = useI18n(propLang);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-700 dark:text-slate-300 space-y-8">
      
      <div className="border-b border-slate-200 dark:border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold mb-3 border border-brand-200 dark:border-brand-500/20">
          <Shield className="w-3.5 h-3.5" />
          <span>Legal & Privacy Compliance</span>
        </div>
        <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 mt-2">
          Last Updated: August 13, 2026
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-xs sm:text-sm space-y-6 leading-relaxed">
        
        <p>
          At <strong>SellerKit</strong> (accessible from <a href="https://sellerkithub.com" className="text-brand-600 dark:text-brand-400 underline">https://sellerkithub.com</a>), the privacy of our visitors is of paramount importance to us. This Privacy Policy document outlines the types of personal and technical information collected and recorded by SellerKit and how we use it.
        </p>

        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-300">
          <div className="flex items-center gap-2 font-bold text-xs uppercase mb-1 text-emerald-700 dark:text-emerald-400">
            <Lock className="w-4 h-4" />
            <span>100% Client-Side Privacy Guarantee</span>
          </div>
          <p className="text-xs">
            All financial figures entered into our fee calculators and all product photos uploaded to our 1:1 Image Padder are processed entirely inside your local browser via HTML5 Canvas and JavaScript. We do <strong>not</strong> store, upload, or transmit your calculation data or images to any remote server.
          </p>
        </div>

        <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mt-6">
          1. Information We Collect
        </h2>
        <p>
          Like most website operators, SellerKit may collect non-personally-identifying information that web browsers and servers typically make available, such as browser type, language preference, referring site, and the date and time of each visitor request.
        </p>

        <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mt-6">
          2. Google AdSense & DoubleClick DART Cookies
        </h2>
        <p>
          Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to SellerKit and other sites on the internet.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
          <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
          <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.</li>
          <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 underline">Google Ads Settings</a>.</li>
        </ul>

        <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mt-6">
          3. Log Files & Web Analytics
        </h2>
        <p>
          SellerKit follows standard log file procedures. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks. These are not linked to any personally identifiable information.
        </p>

        <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mt-6">
          4. CCPA Privacy Rights (Do Not Sell My Personal Information)
        </h2>
        <p>
          Under the California Consumer Privacy Act (CCPA), California consumers have the right to request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data collected, or request deletion of their data.
        </p>

        <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mt-6">
          5. GDPR Data Protection Rights
        </h2>
        <p>
          We would like to ensure you are fully aware of all of your data protection rights under the General Data Protection Regulation (GDPR). Every user is entitled to the right to access, rectification, erasure, restrict processing, and data portability.
        </p>

        <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mt-6">
          6. Contact Us
        </h2>
        <p>
          If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a href="mailto:support@sellerkithub.com" className="text-brand-600 dark:text-brand-400 underline">support@sellerkithub.com</a> or via our Contact Page.
        </p>

      </div>
    </div>
  );
}
