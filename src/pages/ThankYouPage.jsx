import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { brand, preorder } from '../config/site.js';
import { navigateTo } from '../lib/navigate.js';
import BrandLogo from '../components/BrandLogo.jsx';
import MagazineCover from '../components/MagazineCover.jsx';
import Asterisk from '../components/Asterisk.jsx';

/**
 * Bedankpagina na een pre-order (/bedankt). Stripe stuurt de koper hierheen
 * na het betalen. Teksten: src/config/site.js → preorder.thankYou.
 */
export default function ThankYouPage() {
  const rootRef = useRef(null);
  const t = preorder.thankYou;

  useEffect(() => {
    const prev = document.title;
    document.title = `${t.heading} · ${brand.name}`;
    window.scrollTo(0, 0);
    return () => {
      document.title = prev;
    };
  }, [t.heading]);

  // Het magazine valt op tafel en de stempel 'Besteld' komt erop.
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from('.thanks__cover', { y: -80, rotation: -14, opacity: 0, duration: 0.9, ease: 'power3.out' })
        .from('.thanks__stamp', { scale: 1.8, opacity: 0, duration: 0.4, ease: 'back.out(2)' }, '-=0.2')
        .from('.thanks__text > *', { y: 20, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out' }, 0.3);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const home = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    navigateTo('/');
  };

  return (
    <main className="thanks" ref={rootRef}>
      <a className="thanks__logo" href="/" onClick={home} aria-label={`${brand.name}: naar de homepage`}>
        <BrandLogo as="span" />
      </a>

      <div className="thanks__inner">
        <div className="thanks__visual" aria-hidden="true">
          <div className="thanks__cover">
            <div className="cover-frame">
              <MagazineCover priority />
            </div>
          </div>
          <p className="thanks__stamp">Besteld</p>
        </div>

        <div className="thanks__text">
          <h1 className="thanks__title">
            {t.heading}
            <Asterisk className="thanks__asterisk" />
          </h1>
          <p className="thanks__lead">{t.lead}</p>

          <ol className="thanks__steps">
            {t.steps.map(([title, text], i) => (
              <li key={title}>
                <span className="thanks__num" aria-hidden="true">
                  {i + 1}
                </span>
                <span>
                  <strong>{title}</strong>
                  {text}
                </span>
              </li>
            ))}
          </ol>

          <p className="thanks__contact">
            {t.contactText} <a href={`mailto:${t.contactEmail}`}>{t.contactEmail}</a>
          </p>

          <a className="paper-btn thanks__btn" href="/" onClick={home}>
            Terug naar BRANIE
          </a>
          <p className="thanks__payoff">{brand.payoff}</p>
        </div>
      </div>
    </main>
  );
}
