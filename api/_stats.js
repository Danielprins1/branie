/**
 * Telt de verkoop per vouchercode, rechtstreeks uit Stripe.
 * Geeft alleen aantallen terug, nooit namen, adressen of mailadressen
 * van kopers. Gebruikt door api/verkoop.js (een bestand dat met een
 * underscore begint is voor Vercel geen eigen adres).
 */

/** Het magazine zelf (niet de verzendkosten). */
export const MAGAZINE_PRODUCT = 'prod_VbmH53Cgl8SDcL';
/** De oplage. */
export const EDITION = 750;

const MAX_PAGES = 30; // 3000 bestellingen, ruim genoeg

/** Een kleine Stripe-lezer (alleen GET) met de alleen-lezen sleutel. */
export function stripeClient(key, fetchImpl = fetch) {
  return async function get(path, params = {}) {
    const query = new URLSearchParams();
    for (const [name, value] of Object.entries(params)) {
      if (Array.isArray(value)) value.forEach((v) => query.append(`${name}[]`, v));
      else query.append(name, String(value));
    }
    const response = await fetchImpl(`https://api.stripe.com${path}?${query}`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!response.ok) throw new Error(`Stripe antwoordde met ${response.status}`);
    return response.json();
  };
}

async function listAll(get, path, params) {
  const items = [];
  let after;
  for (let i = 0; i < MAX_PAGES; i += 1) {
    const page = await get(path, { limit: 100, ...params, ...(after ? { starting_after: after } : {}) });
    items.push(...page.data);
    if (!page.has_more || !page.data.length) break;
    after = page.data[page.data.length - 1].id;
  }
  return items;
}

const idOf = (value) => (typeof value === 'string' ? value : value?.id);

/** @param {(path: string, params?: object) => Promise<any>} get */
export async function collectStats(get) {
  const [codes, sessions] = await Promise.all([
    listAll(get, '/v1/promotion_codes', {}),
    listAll(get, '/v1/checkout/sessions', {
      status: 'complete',
      expand: ['data.line_items', 'data.payment_intent.latest_charge'],
    }),
  ]);

  const byCode = new Map(codes.map((c) => [c.id, { name: c.metadata?.student || c.code, code: c.code, orders: 0, copies: 0 }]));
  const noCode = { orders: 0, copies: 0 };
  const total = { orders: 0, copies: 0, refunded: 0 };

  for (const session of sessions) {
    if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') continue;

    // Volledig terugbetaald (bijvoorbeeld een test): telt niet mee.
    const charge = session.payment_intent?.latest_charge;
    if (charge && typeof charge === 'object' && charge.refunded === true) {
      total.refunded += 1;
      continue;
    }

    const copies = (session.line_items?.data ?? [])
      .filter((item) => idOf(item.price?.product) === MAGAZINE_PRODUCT)
      .reduce((sum, item) => sum + (item.quantity ?? 0), 0);

    const promoId = idOf(session.discounts?.[0]?.promotion_code);
    let target = noCode;
    if (promoId) {
      if (!byCode.has(promoId)) byCode.set(promoId, { name: 'Andere code', code: '', orders: 0, copies: 0 });
      target = byCode.get(promoId);
    }
    target.orders += 1;
    target.copies += copies;
    total.orders += 1;
    total.copies += copies;
  }

  const people = [...byCode.values()].sort((a, b) => b.copies - a.copies || b.orders - a.orders || a.name.localeCompare(b.name, 'nl'));
  return { updatedAt: new Date().toISOString(), edition: EDITION, total, noCode, people };
}
