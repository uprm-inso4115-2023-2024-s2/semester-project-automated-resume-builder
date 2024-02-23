import React from 'react';
import { createRoot } from 'react-dom/client'; 
import './CSS/index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

reportWebVitals();
