import { tracking } from '../config/site.js';

const KEY = 'branie-herkomst';
const FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

const clean = (v) => String(v).toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

/** Leest utm_-parameters uit de URL en onthoudt ze (laatste klik telt). */
export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found = {};
    for (const f of FIELDS) if (params.get(f)) found[f] = clean(params.get(f));
    if (Object.keys(found).length) {
      localStorage.setItem(KEY, JSON.stringify({ ...found, t: Date.now() }));
    }
  } catch {
    // geen opslag beschikbaar (privévenster): dan alleen deze pagina
  }
}

/** De onthouden herkomst, of null. */
export function getAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('utm_source')) {
      return Object.fromEntries(FIELDS.filter((f) => params.get(f)).map((f) => [f, clean(params.get(f))]));
    }
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!saved) return null;
    if (Date.now() - saved.t > tracking.rememberDays * 86400000) {
      localStorage.removeItem(KEY);
      return null;
    }
    return saved;
  } catch {
    return null;
  }
}

export const isClassmate = (a = getAttribution()) => a?.utm_campaign === tracking.classCampaign;

/** Plakt de herkomst aan een Stripe-betaallink. */
export function withAttribution(url, a = getAttribution()) {
  if (!url || !a) return url;
  try {
    const u = new URL(url);
    for (const f of FIELDS) if (a[f]) u.searchParams.set(f, a[f]);
    const ref = isClassmate(a) ? `${tracking.classCampaign}-${a.utm_source}` : a.utm_source;
    if (ref) u.searchParams.set('client_reference_id', clean(ref));
    return u.toString();
  } catch {
    return url;
  }
}
