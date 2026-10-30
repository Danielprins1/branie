import { useMemo } from 'react';
import { between, fiberWidths, shift, straight, tearLine } from '../../lib/tornEdge.js';

/**
 * Gescheurde papierrand onderaan een sectie: de volgende sectie (kleur
 * `to`) lijkt eroverheen geplakt, met een witte vezelrand.
 */
export default function TornEdge({ to, seed = 1, flip = false }) {
  const { fill, fiber } = useMemo(() => {
    const line = tearLine(seed * 97 + 13, { points: 120, amp: 9, jag: 2.6 });
    const widths = fiberWidths(seed * 31 + 7, 121, 2, 8);
    const bottom = straight(121, 0);
    return {
      fill: between(line, '50%', bottom, '100%'),
      fiber: between(shift(line, widths, -1), '50%', bottom, '100%'),
    };
  }, [seed]);
  return (
    <div className={`torn-edge${flip ? ' torn-edge--flip' : ''}`} aria-hidden="true">
      <span className="torn-edge__fiber" style={{ clipPath: fiber }} />
      <span className="torn-edge__fill" style={{ clipPath: fill, background: to }} />
    </div>
  );
}
