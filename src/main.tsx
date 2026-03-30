import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AppYT from './AppYT';
import './index.css';

function getRouteComponent() {
  const path = window.location.pathname;

  if (path === '/profitaudit-yt' || path === '/profitaudit-yt/') {
    return <AppYT />;
  }

  // Default: existing production app
  return <App />;
}

/**
 * Measure the actual rendered content height by looking at child bounding rects
 * instead of scrollHeight (which inflates in iframe resize feedback loops).
 */
function getContentHeight(): number {
  const rootEl = document.getElementById('root');
  if (!rootEl || !rootEl.firstElementChild) return 0;

  // Get bounding rect of the actual content (not the root container)
  const rect = rootEl.firstElementChild.getBoundingClientRect();
  return Math.ceil(rect.height);
}

function Root() {
  useEffect(() => {
    // Skip if not in an iframe
    if (window.self === window.top) return;

    let lastSentHeight = 0;
    let rafId: number | null = null;

    function sendHeight() {
      const height = getContentHeight();
      // Only send if height actually changed significantly and is reasonable
      if (height > 0 && height < 3000 && Math.abs(height - lastSentHeight) > 10) {
        lastSentHeight = height;
        window.parent.postMessage({ type: 'profit-leak-resize', height }, '*');
      }
    }

    // Use MutationObserver to detect DOM changes (step transitions, etc.)
    const mutationObserver = new MutationObserver(() => {
      // Cancel any pending measurement
      if (rafId) cancelAnimationFrame(rafId);
      // Wait for next paint before measuring
      rafId = requestAnimationFrame(() => {
        setTimeout(sendHeight, 100);
      });
    });

    const rootEl = document.getElementById('root');
    if (rootEl) {
      mutationObserver.observe(rootEl, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });
    }

    // Initial measurement after mount
    setTimeout(sendHeight, 300);

    // Periodic check as safety net (every 2s, not a tight loop)
    const interval = setInterval(sendHeight, 2000);

    return () => {
      mutationObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      clearInterval(interval);
    };
  }, []);

  return (
    <StrictMode>
      {getRouteComponent()}
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
