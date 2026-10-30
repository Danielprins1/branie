import { useEffect, useMemo, useRef, useState } from 'react';
import { anyImage } from '../../lib/assets.js';
import { between, straight, tearLine } from '../../lib/tornEdge.js';

const LAYOUTS = ['feature', 'note', 'wide', 'small', 'feature'];

function layoutFor(article, i) {
  if (article.layout) return article.layout;
  const auto = LAYOUTS[i % LAYOUTS.length];
  if (!article.image) return 'note';
  return auto === 'note' ? 'small' : auto;
}

/** Foto met een gescheurde onderrand. */
function TornPhoto({ src, seed }) {
  const clip = useMemo(() => {
    const top = straight(41, 0);
    const bottom = tearLine(seed, { points: 40, amp: 5, jag: 1.8 }).map(([x, y]) => [x, y - 9]);
    return between(top, '0px', bottom, '100%');
  }, [seed]);
  return (
    <span className="rail-item__photo" style={{ clipPath: clip }}>
      <img src={src} alt="" loading="lazy" decoding="async" draggable="false" />
    </span>
  );
}

/**
 * Horizontaal scrollbare verhalen in tijdschriftopmaak.
 * Bladeren: trackpad, muiswiel (verticaal → horizontaal), slepen met de
 * muis, de pijlknoppen of Tab door de artikelen.
 */
export default function ArticleRail({ pillar, heading, onOpenArticle }) {
  const scrollerRef = useRef(null);
  const drag = useRef({ active: false, moved: false, x: 0, left: 0 });
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;
    el.scrollLeft = 0;
    updateEdges();
    // Muiswiel omhoog/omlaag bladert horizontaal, zolang er ruimte is.
    const onWheel = (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const atStart = el.scrollLeft <= 0 && event.deltaY < 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 && event.deltaY > 0;
      if (atStart || atEnd) return;
      event.preventDefault();
      el.scrollLeft += event.deltaY;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', updateEdges);
    return () => {
      el.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', updateEdges);
    };
  }, [pillar.slug]);

  const page = (dir) => {
    const el = scrollerRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: reduce ? 'auto' : 'smooth' });
  };

  // Slepen met de muis (touch scrolt al vanzelf).
  const onPointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    drag.current = { active: true, moved: false, x: event.clientX, left: scrollerRef.current.scrollLeft };
  };
  const onPointerMove = (event) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = event.clientX - d.x;
    if (Math.abs(dx) > 5) d.moved = true;
    if (d.moved) scrollerRef.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <section className="rail" aria-labelledby={`rail-${pillar.slug}`}>
      <div className="rail__head">
        <h2 className="rail__heading" id={`rail-${pillar.slug}`}>
          {heading}
        </h2>
        <div className="rail__arrows">
          <button type="button" className="paper-btn rail__arrow" onClick={() => page(-1)} disabled={edges.start} aria-label="Vorige verhalen">
            ←
          </button>
          <button type="button" className="paper-btn rail__arrow" onClick={() => page(1)} disabled={edges.end} aria-label="Volgende verhalen">
            →
          </button>
        </div>
      </div>

      <div
        className="rail__scroller"
        ref={scrollerRef}
        onScroll={updateEdges}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <ol className="rail__list">
          {pillar.articles.map((article, i) => {
            const layout = layoutFor(article, i);
            const href = `/pijlers/${pillar.slug}/${article.slug}`;
            return (
              <li key={article.slug} className={`rail-item rail-item--${layout}`} style={{ '--n': i }}>
                <a
                  className="rail-item__link"
                  href={href}
                  draggable="false"
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
                    event.preventDefault();
                    if (drag.current.moved) return; // was slepen, geen klik
                    onOpenArticle(article.slug);
                  }}
                >
                  {layout !== 'note' && <TornPhoto src={anyImage(article.image)} seed={31 * (i + 1) + pillar.slug.length} />}
                  <span className="rail-item__meta">
                    <span className="rail-item__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="rail-item__category">{article.category}</span>
                  </span>
                  <span className="rail-item__title">{article.title}</span>
                  {layout === 'note' && <span className="rail-item__excerpt">{article.excerpt}</span>}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
