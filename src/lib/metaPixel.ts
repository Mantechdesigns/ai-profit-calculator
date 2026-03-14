declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackPageView() {
  window.fbq?.('track', 'PageView');
}

export function trackQuizStart() {
  window.fbq?.('track', 'ViewContent', { content_name: 'profit_leak_audit_start' });
}

export function trackLeadCapture(estimatedLeak: number) {
  window.fbq?.('track', 'Lead', {
    content_name: 'profit_leak_audit_optin',
    value: estimatedLeak,
    currency: 'USD',
  });
}

export function trackResultsViewed() {
  window.fbq?.('track', 'CompleteRegistration');
}

export function trackTrainingClick() {
  window.fbq?.('track', 'InitiateCheckout', { content_name: 'vsl_view' });
}

export function trackPdfDownload() {
  window.fbq?.('track', 'ViewContent', { content_name: 'pdf_download' });
}
