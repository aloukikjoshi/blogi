// Import global CSS first
import './index.css';

// Then framework imports
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Rest of the code...
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);