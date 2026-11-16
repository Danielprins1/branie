import { createHash, timingSafeEqual } from 'node:crypto';
import { collectStats, stripeClient } from './_stats.js';

/**
 * Het verkoopdashboard: geeft per vouchercode het aantal bestellingen en
 * exemplaren terug. Vraagt om een wachtwoord (POST, nooit in de URL).
 *
 * Twee instellingen in Vercel (Settings, Environment Variables):
 *   STRIPE_READ_KEY      een alleen-lezen sleutel uit Stripe (rk_live_...)
 *   DASHBOARD_PASSWORD   het wachtwoord voor de pagina
 */

const digest = (text) => createHash('sha256').update(String(text)).digest();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'alleen-post' });
  }

  const key = process.env.STRIPE_READ_KEY;
  const password = process.env.DASHBOARD_PASSWORD;
  if (!key || !password) return res.status(500).json({ error: 'niet-ingesteld' });

  let given = '';
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    given = String(body?.password ?? '');
  } catch {
    given = '';
  }
  if (!timingSafeEqual(digest(given), digest(password))) {
    await sleep(700); // remt het raden van wachtwoorden
    return res.status(401).json({ error: 'wachtwoord' });
  }

  try {
    return res.status(200).json(await collectStats(stripeClient(key)));
  } catch (error) {
    console.error('Verkoopdashboard:', error.message); // nooit de sleutel loggen
    return res.status(502).json({ error: 'stripe' });
  }
}
