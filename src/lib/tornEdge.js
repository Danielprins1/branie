/**
 * Gescheurde papierranden als CSS clip-path polygonen.
 *
 * Een scheurlijn is een reeks punten over de volle breedte (x in %),
 * met een verticale afwijking in px. Daardoor blijft de scheur even
 * grillig, hoe breed of hoog het element ook is.
 */

// Kleine, voorspelbare random-generator: zelfde seed = zelfde scheur.
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Een scheurlijn: [[x%, yPx], ...] van links naar rechts.
 * amp = grootte van de golven, jag = fijne rafeltjes.
 */
export function tearLine(seed, { points = 150, amp = 9, jag = 2.4 } = {}) {
  const r = rng(seed);
  const waves = [1.1, 2.6, 5.3, 11.7].map((f, k) => ({
    f: f * (0.75 + r() * 0.5),
    p: r() * Math.PI * 2,
    a: [1, 0.55, 0.3, 0.16][k],
  }));
  const norm = waves.reduce((s, w) => s + w.a, 0);
  const line = [];
  for (let i = 0; i <= points; i += 1) {
    const x = i / points;
    const y = waves.reduce((s, w) => s + w.a * Math.sin(2 * Math.PI * w.f * x + w.p), 0) / norm;
    // af en toe een uitschieter, zoals een losse papiervezel
    const spike = r() < 0.12 ? (r() - 0.5) * jag * 3 : 0;
    line.push([x * 100, y * amp + (r() - 0.5) * 2 * jag + spike]);
  }
  return line;
}

/** Dikte van de witte vezelrand per punt (px). */
export function fiberWidths(seed, count, min = 2, max = 8) {
  const r = rng(seed);
  return Array.from({ length: count }, () => min + Math.pow(r(), 1.7) * (max - min));
}

const fmt = (n) => Math.round(n * 100) / 100;

/** Punt op een lijn: base is een CSS-lengte ('0px', '50%', '100%'). */
const pt = (x, base, offset) => `${fmt(x)}% calc(${base} + ${fmt(offset)}px)`;

/** Maak een polygoon tussen twee lijnen (boven: L→R, onder: R→L). */
export function between(topLine, topBase, bottomLine, bottomBase) {
  const top = topLine.map(([x, y]) => pt(x, topBase, y));
  const bottom = [...bottomLine].reverse().map(([x, y]) => pt(x, bottomBase, y));
  return `polygon(${[...top, ...bottom].join(', ')})`;
}

/** Een rechte lijn met hetzelfde aantal punten (voor rechte randen). */
export const straight = (count, y = 0) => Array.from({ length: count }, (_, i) => [(i / (count - 1)) * 100, y]);

/** Verschuif een lijn per punt (bijv. voor de vezelrand). */
export const shift = (line, widths, sign = -1) => line.map(([x, y], i) => [x, y + sign * widths[i]]);
