import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { gift } from '../config/gift.js';
import { brand } from '../config/site.js';
import { giftImage } from '../lib/assets.js';
import { navigateTo } from '../lib/navigate.js';
import { track } from '../lib/consent.js';
import BrandLogo from '../components/BrandLogo.jsx';
import Asterisk from '../components/Asterisk.jsx';

/**
 * Bedankpagina na het kopen van een cadeaubon (/cadeau/bedankt). Stripe stuurt
 * de koper hierheen na het betalen. Teksten: src/config/gift.js → thanks.
 */
export default function GiftThanksPage() {
  const rootRef = useRef(null);
  const t = gift.thanks;

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${t.title} · ${brand.name}`;
    // Deze pagina hoort niet in zoekmachines.
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    window.scrollTo(0, 0);
    track('cadeaubon_bedankt');
    return () => {
      document.title = prevTitle;
      meta.remove();
    };
  }, [t.title]);

  // De bon valt op tafel en de stempel 'Besteld' komt erop.
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from('.thanks__cover', { y: -80, rotation: -12, opacity: 0, duration: 0.9, ease: 'power3.out' })
        .from('.thanks__stamp', { scale: 1.8, opacity: 0, duration: 0.4, ease: 'back.out(2)' }, '-=0.2')
        .from('.thanks__text > *', { y: 20, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out' }, 0.3);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const go = (path, hash) => (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    navigateTo(path);
    if (hash) {
      setTimeout(() => {
        const top = document.getElementById(hash)?.getBoundingClientRect().top ?? 0;
        window.scrollTo(0, top + window.scrollY);
      }, 60);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <main className="thanks thanks--gift" ref={rootRef}>
      <a className="thanks__logo" href="/" onClick={go('/')} aria-label={`${brand.name}: naar de homepage`}>
        <BrandLogo as="span" />
      </a>

      <div className="thanks__inner">
        <div className="thanks__visual" aria-hidden="true">
          <div className="thanks__cover">
            <img className="thanks__bon" src={giftImage(gift.image)} alt="" width="1800" height="945" />
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
            {t.contactText} <a href={`mailto:${gift.email}`}>{gift.email}</a>
          </p>

          <a className="paper-btn thanks__btn" href="/" onClick={go('/')}>
            {t.button}
          </a>
          <p className="thanks__more">
            <a href="/#magazine" onClick={go('/', 'magazine')}>
              {t.more} <span aria-hidden="true">→</span>
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
