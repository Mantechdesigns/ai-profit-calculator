import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

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
      <App />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
