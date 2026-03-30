import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AppYT from './AppYT';
import NextStepsYT from './components/NextStepsYT';
import './index.css';

function getRouteComponent() {
  const path = window.location.pathname;

  if (path === '/profitaudit-yt' || path === '/profitaudit-yt/') {
    return <AppYT />;
  }

  if (path === '/next-steps-yt' || path === '/next-steps-yt/') {
    return <NextStepsYT />;
  }

  if (path === '/audit-calendar-yt' || path === '/audit-calendar-yt/') {
    // Redirect to next-steps-yt (booking confirmation)
    window.location.replace('/next-steps-yt');
    return <div className="min-h-screen flex items-center justify-center text-white">Redirecting...</div>;
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
