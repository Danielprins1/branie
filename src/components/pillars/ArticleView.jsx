import { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { pillarsPage } from '../../config/pillars.js';
import { anyImage } from '../../lib/assets.js';
import { between, straight, tearLine } from '../../lib/tornEdge.js';

const PLACEHOLDER_BODY = ['De tekst van dit artikel volgt.'];

/** Het volledige artikel, als een vel papier dat over de pijler schuift. */
export default function ArticleView({ article, pillar, onClose }) {
  const sheetRef = useRef(null);
  const topEdge = useMemo(() => {
    const top = tearLine(4049 + article.slug.length, { points: 120, amp: 7 }).map(([x, y]) => [x, y + 14]);
    return between(top, '0px', straight(121, 0), '100%');
  }, [article.slug]);

  useLayoutEffect(() => {
    const sheet = sheetRef.current;
    sheet.scrollTop = 0;
    sheet.querySelector('h1')?.focus({ preventScroll: true });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const tween = gsap.fromTo(
      sheet,
      { yPercent: 100, rotation: 1.5 },
      { yPercent: 0, rotation: 0, duration: 0.75, ease: 'power3.out' },
    );
    return () => tween.kill();
  }, [article.slug]);

  const body = article.body?.length ? article.body : PLACEHOLDER_BODY;

  return (
    <div className="article-view" role="dialog" aria-modal="true" aria-labelledby="article-title">
      <div className="article-view__backdrop" onClick={onClose} />
      <div className="article-view__sheet" ref={sheetRef} style={{ clipPath: topEdge }}>
        <div className="article-view__inner">
          <button type="button" className="pillar__back article-view__back" onClick={onClose}>
            <span aria-hidden="true">←</span> {pillar.title}
          </button>
          <p className="article-view__category">{article.category}</p>
          <h1 className="article-view__title" id="article-title" tabIndex={-1}>
            {article.title}
          </h1>
          {article.excerpt && <p className="article-view__excerpt">{article.excerpt}</p>}
          {article.placeholder && <p className="article-view__note">{pillarsPage.placeholderNote}</p>}
          {article.image && (
            <figure className="article-view__figure">
              <img src={anyImage(article.image)} alt="" decoding="async" />
            </figure>
          )}
          <div className="article-view__body">
            {body.map((paragraph, i) =>
              paragraph.startsWith('“') ? (
                <blockquote key={i}>{paragraph}</blockquote>
              ) : (
                <p key={i}>{paragraph}</p>
              ),
            )}
          </div>
          {article.gallery?.length > 0 && (
            <div className="article-view__gallery">
              {article.gallery.map((name, i) => (
                <figure key={name} className="article-view__print" style={{ '--r': `${[-1.4, 1.1, -0.6, 1.6, -1][i % 5]}deg` }}>
                  <img src={anyImage(name)} alt="" loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
