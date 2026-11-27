import { createSign } from 'node:crypto';

/**
 * Nieuwsbrief-aanmelding: zet het e-mailadres als nieuwe rij in een
 * Google Sheet. Geen Make, geen extra pakketten.
 *
 * Drie instellingen in Vercel (Settings, Environment Variables):
 *   GOOGLE_SERVICE_EMAIL   het e-mailadres van de servicekoppeling
 *   GOOGLE_PRIVATE_KEY     de private sleutel uit het JSON-bestand
 *   GOOGLE_SHEET_ID        het lange id uit de URL van het Sheet
 * Deel het Sheet met GOOGLE_SERVICE_EMAIL als Bewerker.
 * Het tabblad moet "Aanmeldingen" heten (kolommen: datum, e-mail,
 * pagina, toestemming).
 */

const b64 = (value) => Buffer.from(value).toString('base64url');

async function accessToken(email, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64(
    JSON.stringify({
      iss: email,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }),
  )}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(privateKey, 'base64url');
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!response.ok) throw new Error(`token ${response.status}`);
  return (await response.json()).access_token;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'alleen-post' });
  }

  const email = process.env.GOOGLE_SERVICE_EMAIL;
  const key = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  const sheet = process.env.GOOGLE_SHEET_ID;
  if (!email || !key || !sheet) return res.status(500).json({ error: 'niet-ingesteld' });

  let body = {};
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  } catch {
    return res.status(400).json({ error: 'ongeldig' });
  }
  const address = String(body.email ?? '').trim().toLowerCase();
  if (body.website) return res.status(200).json({ ok: true }); // honeypot: doe alsof het gelukt is
  if (!/^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/.test(address) || address.length > 254 || body.consent !== true) {
    return res.status(400).json({ error: 'ongeldig' });
  }
  const page = String(body.page ?? '').slice(0, 100);
  // voorkomt dat een cel als formule wordt gelezen
  const cell = (text) => (/^[=+\-@]/.test(text) ? `'${text}` : text);

  try {
    const token = await accessToken(email, key);
    const range = encodeURIComponent('Aanmeldingen!A:D');
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheet}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [[new Date().toISOString(), cell(address), cell(page), 'ja']] }),
      },
    );
    if (!response.ok) throw new Error(`sheets ${response.status}`);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Nieuwsbrief:', error.message); // nooit de sleutel loggen
    return res.status(502).json({ error: 'opslaan' });
  }
}
