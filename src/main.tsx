import { StrictMode } from 'react';
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
  return (
    <StrictMode>
      {getRouteComponent()}
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
