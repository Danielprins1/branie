import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import ComingSoon from './components/ComingSoon.jsx';
import PillarsPage from './pages/PillarsPage.jsx';
import SalesPage from './pages/SalesPage.jsx';
import ThankYouPage from './pages/ThankYouPage.jsx';
import BollardNav from './components/BollardNav.jsx';
import { captureAttribution } from './lib/tracking.js';
import CookieBanner from './components/CookieBanner.jsx';
import { brand, colors, cover, fonts, launch } from './config/site.js';
import './styles/fonts.css';
import './styles/global.css';
import './styles/buttons.css';
import './styles/wall.css';
import './styles/hero.css';
import './styles/magazine.css';
import './styles/coming-soon.css';
import './styles/pillars.css';
import './styles/sales.css';
import './styles/bollard.css';
import './styles/thank-you.css';
import './styles/cookies.css';

// Huisstijl uit de config als CSS-variabelen beschikbaar maken.
const rootStyle = document.documentElement.style;
for (const [name, value] of Object.entries(colors)) rootStyle.setProperty(`--color-${name}`, value);
for (const [name, value] of Object.entries(fonts)) rootStyle.setProperty(`--font-${name}`, value);
rootStyle.setProperty('--cover-aspect', String(cover.aspect));
for (const [place, color] of Object.entries(brand.logoColors ?? {}))
  rootStyle.setProperty(`--logo-color-${place}`, `var(--color-${color})`);

// Herkomst (utm_-links) onthouden voor de pre-order.
captureAttribution();

// Welke pagina? Zie `launch` in src/config/site.js.
const params = new URLSearchParams(window.location.search);
const showComingSoon =
  params.has('binnenkort') ||
  (launch.comingSoonOnProduction && __VERCEL_ENV__ === 'production' && !params.has('volledig'));

const isPillarsPath = (path) => /^\/pijlers(\/|$)/.test(path);
const isSalesPath = (path) => /^\/sales\/?$/.test(path);
const isThankYouPath = (path) => /^\/bedankt\/?$/.test(path);

/** Kiest de pagina op basis van het pad, en wisselt zonder herladen. */
function Root() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const sync = () => setPath(window.location.pathname);
    window.addEventListener('popstate', sync);
    window.addEventListener('branie:navigate', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('branie:navigate', sync);
    };
  }, []);
  let page;
  if (isThankYouPath(path)) {
    // Altijd bereikbaar: Stripe stuurt hier naartoe na het betalen.
    page = <ThankYouPage />;
  } else if (isSalesPath(path) && (!showComingSoon || (launch.salesPageOnProduction && !params.has('binnenkort')))) {
    page = <SalesPage />;
  } else if (showComingSoon) {
    return (
      <>
        <ComingSoon />
        <CookieBanner />
      </>
    );
  } else {
    page = isPillarsPath(path) ? <PillarsPage /> : <App />;
  }
  return (
    <>
      {page}
      <BollardNav path={path} />
      <CookieBanner />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
