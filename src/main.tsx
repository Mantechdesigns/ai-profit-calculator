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

function Root() {
  useEffect(() => {
    let lastHeight = 0;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new ResizeObserver(() => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const height = document.getElementById('root')?.scrollHeight;
        if (height && Math.abs(height - lastHeight) > 5) {
          lastHeight = height;
          window.parent.postMessage({ type: 'profit-leak-resize', height }, '*');
        }
      }, 150);
    });

    const rootEl = document.getElementById('root');
    if (rootEl) {
      observer.observe(rootEl);
    }

    return () => {
      observer.disconnect();
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, []);

  return (
    <StrictMode>
      {getRouteComponent()}
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
