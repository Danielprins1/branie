import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { colors, fonts } from './config/site.js';
import './styles/fonts.js';
import './styles/global.css';
import './styles/wall.css';
import './styles/hero.css';
import './styles/magazine.css';

// Huisstijl uit de config als CSS-variabelen beschikbaar maken.
const rootStyle = document.documentElement.style;
for (const [name, value] of Object.entries(colors)) rootStyle.setProperty(`--color-${name}`, value);
for (const [name, value] of Object.entries(fonts)) rootStyle.setProperty(`--font-${name}`, value);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
