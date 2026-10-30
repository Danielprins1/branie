import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import ComingSoon from './components/ComingSoon.jsx';
import PillarsPage from './pages/PillarsPage.jsx';
import { brand, colors, fonts, launch } from './config/site.js';
import './styles/fonts.css';
import './styles/global.css';
import './styles/buttons.css';
import './styles/wall.css';
import './styles/hero.css';
import './styles/magazine.css';
import './styles/coming-soon.css';
import './styles/pillars.css';

// Huisstijl uit de config als CSS-variabelen beschikbaar maken.
const rootStyle = document.documentElement.style;
for (const [name, value] of Object.entries(colors)) rootStyle.setProperty(`--color-${name}`, value);
for (const [name, value] of Object.entries(fonts)) rootStyle.setProperty(`--font-${name}`, value);
for (const [place, color] of Object.entries(brand.logoColors ?? {}))
  rootStyle.setProperty(`--logo-color-${place}`, `var(--color-${color})`);

// Welke pagina? Zie `launch` in src/config/site.js.
const params = new URLSearchParams(window.location.search);
const showComingSoon =
  params.has('binnenkort') ||
  (launch.comingSoonOnProduction && __VERCEL_ENV__ === 'production' && !params.has('volledig'));

// Eenvoudige routing op pad: /pijlers/... is de pijlerpagina.
const isPillars = /^\/pijlers(\/|$)/.test(window.location.pathname);
const page = showComingSoon ? <ComingSoon /> : isPillars ? <PillarsPage /> : <App />;

createRoot(document.getElementById('root')).render(<StrictMode>{page}</StrictMode>);
