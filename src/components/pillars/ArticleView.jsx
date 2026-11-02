import { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { pillarsPage } from '../../config/pillars.js';
import { lockedText } from '../../config/articles-locked.js';
import { anyImage } from '../../lib/assets.js';
import { between, straight, tearLine } from '../../lib/tornEdge.js';
import PreOrderButton from '../PreOrderButton.jsx';
import Asterisk from '../Asterisk.jsx';

/**
 * Het artikel, als een vel papier dat over de pijler schuift.
 * Zichtbaar: titel, introductie en foto. De rest staat versleuteld en
 * wazig achter de pre-orderknop (voorlopig alleen visueel).
 */
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

  // Alleen het begin van de versleutelde tekst tonen: genoeg voor de vorm.
  const locked = (lockedText[article.slug] ?? []).slice(0, 7);

  return (
    <div className="article-view" role="dialog" aria-modal="true" aria-labelledby="article-title">
      <div className="article-view__backdrop" onClick={onClose} />
      <div className="article-view__sheet" ref={sheetRef} style={{ clipPath: topEdge }}>
        <div className="article-view__inner">
          <button type="button" className="paper-btn pillar__back article-view__back" onClick={onClose}>
            <span aria-hidden="true">←</span> {pillar.title}
          </button>
          <p className="article-view__category">{article.category}</p>
          <h1 className="article-view__title" id="article-title" tabIndex={-1}>
            {article.title}
          </h1>
          {article.subtitle && <p className="article-view__subtitle">{article.subtitle}</p>}
          <p className="article-view__meta">
            {article.author && <span>Door {article.author}</span>}
            <span>{article.minutes} minuten lezen</span>
          </p>

          <div className="article-view__intro">
            {article.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className={/^[“"‘']/.test(paragraph) ? 'is-quote' : undefined}>
                {paragraph}
              </p>
            ))}
          </div>

          {article.image && (
            <figure className="article-view__figure">
              <img
                src={anyImage(article.image)}
                alt=""
                decoding="async"
                onLoad={(event) => {
                  // Kleine foto's niet oprekken tot de volle breedte.
                  const img = event.currentTarget;
                  if (img.naturalWidth < 700) img.style.maxWidth = `${Math.round(img.naturalWidth * 1.6)}px`;
                }}
              />
            </figure>
          )}

          <section className="locked" aria-labelledby="locked-title">
            <div className="locked__text" aria-hidden="true">
              {locked.map(([kind, text], i) =>
                kind === 'h' ? (
                  <p key={i} className="locked__h">
                    {text}
                  </p>
                ) : (
                  <p key={i}>{text}</p>
                ),
              )}
            </div>
            <div className="locked__card">
              <Asterisk className="locked__asterisk" />
              <h2 className="locked__title" id="locked-title">
                {pillarsPage.lockedHeading}
              </h2>
              <p className="locked__text-intro">{pillarsPage.lockedText}</p>
              <PreOrderButton />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
