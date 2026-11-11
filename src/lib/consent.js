import { analytics } from '../config/site.js';

/**
 * Cookietoestemming + Google Analytics 4.
 * Google Analytics wordt pas ingeladen na 'ja'. Bij 'nee' wordt er niets
 * geladen en niets opgeslagen behalve de keuze zelf (functioneel, mag).
 */
const KEY = 'branie-cookies';
let loaded = false;

export function getConsent() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!saved) return null;
    if (Date.now() - saved.t > analytics.rememberDays * 86400000) return null;
    return saved.analytics ? 'granted' : 'denied';
  } catch {
    return null;
  }
}

export function setConsent(granted) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ analytics: granted, t: Date.now() }));
  } catch {
    // geen opslag: keuze geldt alleen voor dit bezoek
  }
  if (granted) loadAnalytics();
  else removeAnalyticsCookies();
  window.dispatchEvent(new Event('branie:consent'));
}

export function loadAnalytics() {
  const id = analytics.measurementId;
  if (loaded || !id || getConsent() !== 'granted') return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
  };
  window.gtag('js', new Date());
  // Paginawissels zonder herladen (pushState) meet GA4 zelf via 'enhanced measurement'.
  window.gtag('config', id);
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

/** Een gebeurtenis meten (alleen als er toestemming is en GA geladen is). */
export function track(event, params = {}) {
  if (!loaded) loadAnalytics(); // bijv. direct na terugkomst van Stripe
  if (loaded && window.gtag) window.gtag('event', event, params);
}

/** Cookies van Google Analytics (_ga, _ga_*) wissen na 'nee'. */
function removeAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (!/^_ga/.test(name)) return;
    domains.forEach((d) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ''}`;
    });
  });
}
