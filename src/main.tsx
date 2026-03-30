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
    const observer = new ResizeObserver(() => {
      const height = document.getElementById('root')?.scrollHeight;
      if (height) {
        window.parent.postMessage({ type: 'profit-leak-resize', height }, '*');
      }
    });

    const rootEl = document.getElementById('root');
    if (rootEl) {
      observer.observe(rootEl);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <StrictMode>
      {getRouteComponent()}
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
