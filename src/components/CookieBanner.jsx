import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { analytics, cookieBanner as t } from '../config/site.js';
import { getConsent, loadAnalytics, setConsent } from '../lib/consent.js';
import Asterisk from './Asterisk.jsx';

/**
 * Cookiemelding in BRANIE-stijl: een opgeplakt briefje rechtsonder.
 * 'Prima' en 'Liever niet' zijn even groot en even makkelijk.
 * Opnieuw openen: een link 'Cookie-instellingen' in de footer, of
 * window.dispatchEvent(new Event('branie:cookies')).
 */
export default function CookieBanner() {
  const [open, setOpen] = useState(() => getConsent() === null);
  const ref = useRef(null);

  useEffect(() => {
    loadAnalytics(); // eerder 'ja' gezegd: meteen laden
    const reopen = () => setOpen(true);
    window.addEventListener('branie:cookies', reopen);
    return () => window.removeEventListener('branie:cookies', reopen);
  }, []);

  useLayoutEffect(() => {
    if (!open || !ref.current) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const tween = gsap.from(ref.current, { y: 60, rotation: 4, opacity: 0, duration: 0.6, delay: 0.8, ease: 'back.out(1.4)' });
    return () => tween.kill();
  }, [open]);

  if (!open) return null;

  const choose = (granted) => {
    setConsent(granted);
    setOpen(false);
  };

  return (
    <section className="cookies" ref={ref} role="dialog" aria-labelledby="cookies-title" aria-describedby="cookies-text">
      <span className="tape cookies__tape" aria-hidden="true" />
      <h2 className="cookies__title" id="cookies-title">
        {t.heading}
        <Asterisk className="cookies__asterisk" />
      </h2>
      <p className="cookies__text" id="cookies-text">
        {t.text}{' '}
        {analytics.privacyUrl && <a href={analytics.privacyUrl}>{t.privacyLabel}</a>}
      </p>
      <div className="cookies__actions">
        <button type="button" className="paper-btn cookies__btn" onClick={() => choose(true)}>
          {t.accept}
        </button>
        <button type="button" className="cookies__btn cookies__btn--plain" onClick={() => choose(false)}>
          {t.decline}
        </button>
      </div>
    </section>
  );
}
