import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure dark mode class and theme storage are cleared
if (typeof document !== 'undefined') {
  document.documentElement.classList.remove('dark');
  try {
    localStorage.removeItem('pranav_portfolio_theme');
  } catch (e) {
    // Ignore storage errors
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
