import { useMemo } from 'react';
import { pillars, pillarsPage } from '../../config/pillars.js';
import { anyImage } from '../../lib/assets.js';
import { between, fiberWidths, shift, straight, tearLine } from '../../lib/tornEdge.js';

/** Overlap (px) tussen stroken: hierin valt de gescheurde bovenrand. */
export const OVERLAP = 28;
const POINTS = 150;

/**
 * Bouwt per strook de clip-paths. Elke strook bestaat uit twee helften
 * (boven/onder) die langs een eigen scheurlijn op elkaar aansluiten.
 * Dicht zie je die naad niet; bij het openscheuren gaan ze uit elkaar.
 */
function buildShapes(index) {
  const first = index === 0;
  const topBase = first ? '0px' : `${OVERLAP}px`;
  // midden van het zichtbare deel van de strook
  const tearBase = first ? `50% - ${OVERLAP / 2}px` : '50%';

  const top = first ? straight(POINTS + 1, -2) : tearLine(101 + index * 17, { points: POINTS, amp: 9 });
  const tear = tearLine(503 + index * 29, { points: POINTS, amp: 11, jag: 2.8 });
  const bottom = straight(POINTS + 1, 0);

  const fiberTop = fiberWidths(907 + index, POINTS + 1, 2, 9);
  const fiberTearA = fiberWidths(1301 + index, POINTS + 1, 2, 10);
  const fiberTearB = fiberWidths(1709 + index, POINTS + 1, 1, 7);

  return {
    paper: first ? null : between(shift(top, fiberTop, -1), topBase, shift(tear, fiberTop, 0), tearBase),
    photoTop: between(top, topBase, shift(tear, fiberTop.map(() => 1), 1), tearBase),
    fiberTop: between(tear, tearBase, shift(tear, fiberTearA, 1), tearBase),
    photoBottom: between(tear, tearBase, bottom, '100%'),
    fiberBottom: between(shift(tear, fiberTearB, -1), tearBase, tear, tearBase),
  };
}

function StripFace({ pillar, index, hidden = false }) {
  return (
    <div className="strip__face" aria-hidden={hidden || undefined}>
      <img
        className="strip__img"
        src={anyImage(pillar.image)}
        alt=""
        style={{ objectPosition: pillar.focus }}
        draggable="false"
        decoding="async"
        fetchPriority={index < 3 ? 'high' : 'auto'}
      />
      <span className="strip__shade" />
      <span className="strip__band">
        <span className="strip__num">{String(index + 1).padStart(2, '0')}</span>
        <span className="strip__title">{pillar.title}</span>
        <span className="strip__hint">
          {pillarsPage.hint} <span aria-hidden="true">→</span>
        </span>
      </span>
    </div>
  );
}

/**
 * De vijf gescheurde papierstroken. `refs` (van PillarsPage) krijgt de
 * DOM-elementen die de scheuranimatie beweegt.
 */
export default function PaperStrips({ refs, activeIndex, onActivate, onOpen, inert }) {
  const shapes = useMemo(() => pillars.map((_, i) => buildShapes(i)), []);

  const setMouse = (event) => {
    const strip = event.currentTarget.closest('.strip');
    const mx = (event.clientX / window.innerWidth) * 2 - 1;
    strip?.style.setProperty('--mx', mx.toFixed(3));
  };

  return (
    <div className={`strips${activeIndex !== null ? ' has-active' : ''}`} inert={inert || undefined}>
      {pillars.map((pillar, i) => {
        const s = shapes[i];
        const first = i === 0;
        return (
          <div
            key={pillar.slug}
            className={`strip${activeIndex === i ? ' is-active' : ''}`}
            ref={(el) => (refs.current.strips[i] = el)}
            style={{
              '--i': i,
              top: first ? 0 : `calc(${i * 20}% - ${OVERLAP}px)`,
              height: `calc(20% + ${first ? OVERLAP : OVERLAP * 2}px)`,
              zIndex: i + 1,
            }}
          >
            <div className="strip__half strip__half--top" ref={(el) => (refs.current.tops[i] = el)}>
              {s.paper && <div className="strip__paper" style={{ clipPath: s.paper }} />}
              <div className="strip__photo" style={{ clipPath: s.photoTop }}>
                <StripFace pillar={pillar} index={i} hidden />
              </div>
              <div className="strip__fiber" style={{ clipPath: s.fiberTop }} />
            </div>
            <div className="strip__half strip__half--bottom" ref={(el) => (refs.current.bottoms[i] = el)}>
              <div className="strip__photo" style={{ clipPath: s.photoBottom }}>
                <StripFace pillar={pillar} index={i} hidden />
              </div>
              <div className="strip__fiber" style={{ clipPath: s.fiberBottom }} />
            </div>

            <a
              className="strip__link"
              href={`/pijlers/${pillar.slug}`}
              ref={(el) => (refs.current.links[i] = el)}
              style={{ top: first ? 0 : OVERLAP, bottom: OVERLAP }}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
                event.preventDefault();
                onOpen(i);
              }}
              onPointerEnter={() => onActivate(i)}
              onPointerLeave={() => onActivate(null)}
              onPointerMove={setMouse}
              onFocus={() => onActivate(i)}
              onBlur={() => onActivate(null)}
            >
              <span className="visually-hidden">
                {pillar.title}: {pillar.subtitle} {pillarsPage.hint}.
              </span>
            </a>
          </div>
        );
      })}
    </div>
  );
}
