/**
 * Utility functions for Google Analytics 4 (GA4) tracking
 * Safe for client-side and pre-rendered SSR environments.
 */

export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }
};

export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...params,
      timestamp: new Date().toISOString()
    });
  }
};

export const TRACKED_EVENTS = {
  PRESET_CLICK: 'select_preset',
  PLATFORM_CHANGE: 'select_platform',
  COPY_SUMMARY: 'copy_summary',
  EXPORT_CSV: 'export_csv',
  BARCODE_GENERATE: 'generate_barcode',
  IMAGE_RESIZE: 'resize_image',
  TOOL_CLICK: 'click_related_tool',
};
