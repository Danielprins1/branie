import { useEffect, useRef, useState } from 'react';
import { gift } from '../config/gift.js';
import { brand } from '../config/site.js';
import { giftImage } from '../lib/assets.js';
import { navigateTo } from '../lib/navigate.js';
import { track } from '../lib/consent.js';
import BrandLogo from '../components/BrandLogo.jsx';
import Asterisk from '../components/Asterisk.jsx';
import Footer from '../components/Footer.jsx';
import TornEdge from '../components/sales/TornEdge.jsx';

const FIELDS = ['code', 'naam', 'straat', 'postcode', 'plaats', 'email'];
const EMPTY = Object.fromEntries(FIELDS.map((f) => [f, '']));
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Naar het formulier om een bon te verzilveren, en daar meteen in het codeveld. */
function toRedeem(event) {
  event.preventDefault();
  document.getElementById('verzilveren')?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
  setTimeout(() => document.getElementById('gift-code')?.focus({ preventScroll: true }), reduceMotion() ? 0 : 700);
}

/** De paginatitel en omschrijving voor wie via de site navigeert (de statische versie staat in cadeau.html). */
function useSeo() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = gift.seo.title;
    let meta = document.querySelector('meta[name="description"]');
    const created = !meta;
    if (created) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    const prevDescription = meta.getAttribute('content');
    meta.setAttribute('content', gift.seo.description);
    return () => {
      document.title = prevTitle;
      if (created) meta.remove();
      else meta.setAttribute('content', prevDescription ?? '');
    };
  }, []);
}

/** Het formulier om een bon te verzilveren. Het controleren van de code doet Make. */
function RedeemForm() {
  const [values, setValues] = useState(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    return { ...EMPTY, code: code ? code.trim() : '' };
  });
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [error, setError] = useState(null); // 'al_verzilverd' | 'ongeldig' | 'anders'
  const doneRef = useRef(null);

  // Na het verzilveren de bevestiging in beeld brengen, ook op een kleine telefoon.
  useEffect(() => {
    if (status === 'done') doneRef.current?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'center' });
  }, [status]);

  const onChange = (event) => setValues((v) => ({ ...v, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setError(null);
    try {
      // Als formulier-data (geen JSON), zodat er geen CORS-preflight nodig is.
      const body = new URLSearchParams(Object.fromEntries(FIELDS.map((f) => [f, values[f].trim()])));
      const response = await fetch(gift.redeemUrl, { method: 'POST', body });
      const data = await response.json().catch(() => null);
      if (response.ok && data?.ok === true) {
        setStatus('done');
        track('cadeaubon_verzilverd');
        return;
      }
      if (response.status === 400 && (data?.reden === 'al_verzilverd' || data?.reden === 'ongeldig')) {
        setError(data.reden);
      } else {
        setError('anders');
      }
    } catch {
      setError('anders');
    }
    setStatus('idle');
  };

  if (status === 'done') {
    return (
      <div className="gift-done" role="status" ref={doneRef}>
        <p className="gift-done__stamp" aria-hidden="true">
          Verzilverd
        </p>
        <p className="gift-done__text">{gift.redeem.success}</p>
      </div>
    );
  }

  const sending = status === 'sending';
  const field = (name, label, { hint, ...props } = {}) => (
    <div className={`gift-field gift-field--${name}`}>
      <label htmlFor={`gift-${name}`}>{label}</label>
      <input
        id={`gift-${name}`}
        name={name}
        value={values[name]}
        onChange={onChange}
        required
        disabled={sending}
        aria-describedby={hint ? `gift-${name}-hint` : undefined}
        {...props}
      />
      {hint && (
        <p className="gift-field__hint" id={`gift-${name}-hint`}>
          {hint}
        </p>
      )}
    </div>
  );

  return (
    <form className="gift-form" onSubmit={submit}>
      {field('code', 'Code op je bon', {
        placeholder: 'BRANIE-XXXX-XXXX',
        hint: gift.redeem.codeHint,
        autoComplete: 'off',
        autoCapitalize: 'characters',
        spellCheck: false,
      })}
      {field('naam', 'Je volledige naam', { autoComplete: 'name' })}
      {field('straat', 'Straat en huisnummer', { autoComplete: 'address-line1' })}
      <div className="gift-form__row">
        {field('postcode', 'Postcode', { autoComplete: 'postal-code' })}
        {field('plaats', 'Plaats', { autoComplete: 'address-level2' })}
      </div>
      {field('email', 'E-mailadres', { type: 'email', autoComplete: 'email', inputMode: 'email' })}
      <p className="gift-form__hint">We gebruiken je e-mailadres alleen voor als er iets misgaat met de bezorging.</p>

      <div aria-live="polite">
        {error && (
          <p className="gift-form__error" role="alert">
            {gift.redeem.errors[error]}
            {error === 'anders' && (
              <>
                {' '}
                <a href={`mailto:${gift.email}`}>{gift.email}</a>.
              </>
            )}
          </p>
        )}
      </div>

      <button type="submit" className="paper-btn gift-form__submit" disabled={sending} aria-busy={sending}>
        {sending ? gift.redeem.sending : gift.redeem.button}
      </button>
    </form>
  );
}

/**
 * Cadeaubon (/cadeau): blok A om een bon te kopen (via Stripe), blok B om er
 * een te verzilveren (via Make). Teksten en koppelingen: src/config/gift.js.
 * Met ?code=... in de url wordt het codeveld ingevuld en scrolt de pagina naar blok B.
 */
export default function GiftPage() {
  useSeo();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!new URLSearchParams(window.location.search).get('code')) return undefined;
    // Een bon met QR-code: meteen naar het formulier.
    const timer = setTimeout(() => {
      document.getElementById('verzilveren')?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const home = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    navigateTo('/');
    window.scrollTo(0, 0);
  };

  return (
    <main className="gift">
      <a className="gift__logo" href="/" onClick={home} aria-label={`${brand.name}: naar de homepage`}>
        <BrandLogo as="span" />
      </a>

      <header className="gift__hero">
        <p className="gift__script">{gift.hero.script}</p>
        <h1 className="gift__title">
          {gift.hero.title}
          <Asterisk className="gift__asterisk" />
        </h1>
        <a className="gift__received" href="#verzilveren" onClick={toRedeem}>
          <strong>{gift.hero.receivedLabel}</strong>
          <span>{gift.hero.receivedText}</span>
          <span className="gift__received-arrow" aria-hidden="true">
            ↓
          </span>
        </a>
      </header>

      <section className="gift__buy" aria-labelledby="gift-buy-title">
        <div className="gift__buy-inner">
          <figure className="gift__bon">
            <img src={giftImage(gift.image)} alt={gift.imageAlt} width="1800" height="945" decoding="async" />
            <span className="tape gift__tape" aria-hidden="true" />
          </figure>
          <div className="gift__buy-text">
            <h2 className="gift__h2" id="gift-buy-title">
              {gift.buy.heading}
            </h2>
            {gift.buy.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="gift__price">
              <strong>{gift.price}</strong>
              <span>{gift.priceNote}</span>
            </p>
            <p className="gift__note">
              <strong>{gift.buy.emailNoteLabel}</strong> {gift.buy.emailNote}
            </p>
            <a
              className="paper-btn gift__btn"
              href={gift.stripeUrl}
              onClick={() => track('begin_checkout', { currency: 'EUR', value: 24.95, item_name: 'BRANIE cadeaubon' })}
            >
              {gift.buy.button} <span aria-hidden="true">→</span>
            </a>
            <p className="gift__have">
              {gift.buy.haveOne}{' '}
              <a href="#verzilveren" onClick={toRedeem}>
                {gift.buy.haveOneLink}
              </a>
            </p>
          </div>
        </div>
        <TornEdge to="var(--color-blue)" seed={7} />
      </section>

      <section className="gift__redeem" id="verzilveren" aria-labelledby="gift-redeem-title">
        <div className="gift__redeem-inner">
          <div className="gift__redeem-text">
            <h2 className="gift__h2" id="gift-redeem-title">
              {gift.redeem.heading}
            </h2>
            <p>{gift.redeem.text}</p>
            <ol className="gift__steps">
              {gift.redeem.steps.map((step, i) => (
                <li key={step}>
                  <span className="gift__step-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="gift__card">
            <RedeemForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
