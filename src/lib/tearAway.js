import gsap from 'gsap';
import { between, fiberWidths, shift, straight, tearLine } from './tornEdge.js';

const POINTS = 140;

/**
 * Scheurt de huidige pagina weg en toont daaronder de volgende.
 *
 * Werking: er wordt een kopie gemaakt van wat nu in beeld is (twee keer:
 * een bovenste en een onderste helft, elk met een gescheurde rand op
 * hoogte `y`). Daarna wordt `navigate()` aangeroepen, zodat de nieuwe
 * pagina eronder verschijnt, en trekken de helften uit elkaar.
 *
 * @param {object}   opts
 * @param {number}   opts.y         hoogte van de scheur (px vanaf boven in beeld)
 * @param {Function} opts.navigate  wisselt naar de nieuwe pagina
 */
export function tearAway({ y, navigate }) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const source = document.getElementById('root');
  if (reduce || !source) {
    navigate();
    window.scrollTo(0, 0);
    return;
  }

  const vh = window.innerHeight;
  const tearY = Math.round(Math.min(vh * 0.7, Math.max(vh * 0.3, y)));
  const scrollY = window.scrollY;
  const base = `${tearY}px`;

  const tear = tearLine(9001 + (Date.now() % 997), { points: POINTS, amp: 14, jag: 3 });
  const top = straight(POINTS + 1, 0);
  const bottom = straight(POINTS + 1, 0);
  const fiberA = fiberWidths(311, POINTS + 1, 3, 12);
  const fiberB = fiberWidths(733, POINTS + 1, 2, 9);

  const overlay = document.createElement('div');
  overlay.className = 'tear-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.inert = true;

  const makeHalf = (part) => {
    const half = document.createElement('div');
    half.className = `tear-half tear-half--${part}`;

    // schaduw van de gescheurde rand op de pagina eronder
    const shadow = document.createElement('div');
    shadow.className = 'tear-half__shadow';
    shadow.style.top = part === 'top' ? `${tearY - 6}px` : `${tearY - 40}px`;

    const view = document.createElement('div');
    view.className = 'tear-half__view';
    view.style.clipPath = part === 'top' ? between(top, '0px', tear, base) : between(tear, base, bottom, '100%');
    // Statische kopie van wat nu in beeld is, op dezelfde plek.
    const inner = document.createElement('div');
    inner.className = 'tear-half__page';
    inner.style.transform = `translate3d(0, ${-scrollY}px, 0)`;
    inner.appendChild(snapshot.cloneNode(true));
    view.appendChild(inner);

    const fiber = document.createElement('div');
    fiber.className = 'tear-half__fiber';
    fiber.style.clipPath =
      part === 'top' ? between(tear, base, shift(tear, fiberA, 1), base) : between(shift(tear, fiberB, -1), base, tear, base);

    half.append(shadow, view, fiber);
    overlay.appendChild(half);
    return { half, view };
  };

  // Een losse kopie maken vóórdat React de nieuwe pagina rendert. Vaste
  // elementen (de vallende cover) en canvas-inhoud worden zo bevroren.
  const snapshot = source.cloneNode(true);
  snapshot.removeAttribute('id');
  snapshot.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
  snapshot.querySelectorAll('a, button, input').forEach((el) => el.setAttribute('tabindex', '-1'));

  const upper = makeHalf('top');
  const lower = makeHalf('bottom');
  document.body.appendChild(overlay);

  navigate();
  window.scrollTo(0, 0);

  gsap.set(upper.half, { transformOrigin: '50% 100%' });
  gsap.set(lower.half, { transformOrigin: '50% 0%' });
  gsap
    .timeline({ onComplete: () => overlay.remove() })
    // de ruk: het papier geeft mee
    .to(upper.half, { y: -16, rotation: -0.5, duration: 0.28, ease: 'power2.out' }, 0)
    .to(lower.half, { y: 16, rotation: 0.4, duration: 0.28, ease: 'power2.out' }, 0)
    // en dan scheurt het weg
    .to(upper.half, { y: -(tearY + 160), rotation: -2.4, duration: 0.95, ease: 'power3.in' }, 0.24)
    .to(lower.half, { y: vh - tearY + 160, rotation: 2, duration: 0.95, ease: 'power3.in' }, 0.24);
}
