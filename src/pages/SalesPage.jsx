import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sales } from '../config/sales.js';
import { pillars } from '../config/pillars.js';
import { brand } from '../config/site.js';
import { salesImage } from '../lib/assets.js';
import { navigateTo } from '../lib/navigate.js';
import BrandLogo from '../components/BrandLogo.jsx';
import Asterisk from '../components/Asterisk.jsx';
import PreOrderButton from '../components/PreOrderButton.jsx';
import TornEdge from '../components/sales/TornEdge.jsx';
import PageSizeIcon from '../components/sales/PageSizeIcon.jsx';

gsap.registerPlugin(ScrollTrigger);

const C = {
  red: 'var(--color-red)',
  bordeaux: 'var(--color-bordeaux)',
  olive: 'var(--color-olive)',
  ochre: 'var(--color-ochre)',
  blue: 'var(--color-blue)',
  cream: 'var(--color-cream)',
};

const euro = (n) => `€${n}`;

/** **vet** in een tekst omzetten naar <strong>. */
function Rich({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => (part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part));
}

const NAV = [
  ['over', 'Over BRANIE'],
  ['adverteren', 'Adverteren'],
  ['pakketten', 'Pakketten'],
  ['prijs', 'Prijs'],
  ['contact', 'Contact'],
];

function internalLink(path) {
  return (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    navigateTo(path);
    window.scrollTo(0, 0);
  };
}

function Swatch({ swatch }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(swatch.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button
      type="button"
      className="swatch"
      style={{ background: swatch.hex, color: swatch.text }}
      onClick={copy}
      aria-label={`${swatch.name}, ${swatch.hex}. Klik om de kleurcode te kopiëren.`}
    >
      <span className="swatch__name">{swatch.name}</span>
      <span className="swatch__hex">{copied ? 'gekopieerd!' : swatch.hex}</span>
    </button>
  );
}

function DaysLeft({ date }) {
  const days = useMemo(() => {
    const [y, m, d] = date.split('-').map(Number);
    const now = new Date();
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((Date.UTC(y, m - 1, d) - today) / 86400000);
  }, [date]);
  if (Number.isNaN(days)) return null;
  if (days < 0) return <span className="delivery__left">De deadline is verstreken.</span>;
  if (days === 0) return <span className="delivery__left">vandaag!</span>;
  return <span className="delivery__left">nog {days} {days === 1 ? 'dag' : 'dagen'}</span>;
}

/**
 * De salespagina: alle informatie uit de saleskit, in BRANIE-stijl.
 * Inhoud: src/config/sales.js.
 */
export default function SalesPage() {
  const rootRef = useRef(null);
  const { introduction: intro, mission, preview, look, where, ads, advertorial, packages, price, delivery, contact } = sales;

  useEffect(() => {
    const prev = document.title;
    document.title = `${sales.title} · ${brand.name}`;
    return () => {
      document.title = prev;
    };
  }, []);

  // Plak-animatie: elementen worden 'opgeplakt' als ze in beeld komen.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.sales-hero__print', {
          y: -40,
          opacity: 0,
          rotation: (i) => [-6, 5, -3, 7, -5, 4][i % 6],
          duration: 0.7,
          ease: 'back.out(1.4)',
          stagger: 0.07,
        });
        gsap.from('.launch-sticker', { scale: 0, rotation: -40, duration: 0.6, delay: 0.55, ease: 'back.out(2)' });
        gsap.utils.toArray('[data-stick]').forEach((el) => {
          gsap.from(el, {
            y: 34,
            opacity: 0,
            rotation: gsap.utils.random(-2.5, 2.5),
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });
      }, rootRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <div className="sales" ref={rootRef}>
      <a className="skip-link" href="#over">
        Ga naar de inhoud
      </a>

      <header className="sales-nav">
        <a className="sales-nav__home" href="/" onClick={internalLink('/')} aria-label={`${brand.name}: naar de homepage`}>
          <BrandLogo as="span" className="sales-nav__logo" />
        </a>
        <nav className="sales-nav__links" aria-label="Saleskit">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <a className="paper-btn sales-nav__pdf" href={sales.pdf} download>
          Saleskit (pdf)
        </a>
      </header>

      <main>
        {/* ---------- Hero ---------- */}
        <section className="sales-hero" aria-labelledby="sales-title">
          <div className="sales-hero__prints" aria-hidden="true">
            {sales.heroPhotos.map((name, i) => (
              <figure key={name} className="sales-hero__print" style={{ '--i': i }}>
                <img src={salesImage(name)} alt="" decoding="async" fetchPriority={i < 3 ? 'high' : 'auto'} />
                {i % 2 === 0 && <span className="tape sales-hero__tape" />}
              </figure>
            ))}
          </div>
          <div className="sales-hero__body">
            <p className="launch-sticker" aria-label={`Lancering ${sales.launch.date} ${sales.launch.year}`}>
              <span className="launch-sticker__label">{sales.launch.label}</span>
              <span className="launch-sticker__date">{sales.launch.date}</span>
              <span className="launch-sticker__date">{sales.launch.year}</span>
            </p>
            <BrandLogo as="p" className="sales-hero__logo" />
            <h1 className="sales-hero__title" id="sales-title">
              {sales.title}
            </h1>
            <p className="sales-hero__payoff">{brand.payoff}</p>
            <p className="sales-hero__intro">{sales.intro}</p>
            <div className="sales-hero__ctas">
              <a className="paper-btn sales-btn" href="#adverteren">
                Adverteren <span aria-hidden="true">↓</span>
              </a>
              <a className="sales-hero__dl" href={sales.pdf} download>
                Download de saleskit als pdf
              </a>
            </div>
            <Asterisk className="sales-hero__asterisk" />
          </div>
          <TornEdge to={C.cream} seed={1} />
        </section>

        {/* ---------- Introductie ---------- */}
        <section className="sales-intro" id="over" aria-labelledby="intro-title">
          <aside className="sales-intro__aside">
            <p className="sales-intro__claim" data-stick>
              {intro.aside}
            </p>
            <Asterisk className="sales-intro__asterisk" />
            <figure className="sales-intro__photo" data-stick>
              <img src={salesImage(intro.asidePhoto)} alt="Mensen lopen in beweging over de Dam voor het Paleis." loading="lazy" />
            </figure>
          </aside>
          <div className="sales-intro__main">
            <h2 className="sales-h2" id="intro-title" data-stick>
              Introductie
            </h2>
            <p className="sales-intro__lead">{intro.lead}</p>
            {intro.body.map((t) => (
              <p key={t.slice(0, 20)} className="sales-text">
                {t}
              </p>
            ))}
            <dl className="facts" data-stick>
              {intro.facts.map(([k, v]) => (
                <div key={k} className="facts__row">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------- Missie & visie ---------- */}
        <section className="sales-mission" aria-labelledby="mission-title">
          <div className="sales-mission__photos" aria-hidden="true">
            {mission.photos.map((name) => (
              <img key={name} src={salesImage(name)} alt="" loading="lazy" />
            ))}
          </div>
          <div className="sales-wrap">
            <h2 className="sales-mission__heading" id="mission-title" data-stick>
              {mission.heading}
            </h2>
            <div className="sales-mission__cols">
              <div data-stick>
                <h3 className="outline-title">Missie</h3>
                {mission.missie.map((t) => (
                  <p key={t.slice(0, 20)} className="sales-text">
                    <Rich text={t} />
                  </p>
                ))}
              </div>
              <div data-stick>
                <h3 className="outline-title">Visie</h3>
                {mission.visie.map((t) => (
                  <p key={t.slice(0, 20)} className="sales-text">
                    <Rich text={t} />
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="sales-statement">
            <p data-stick>{mission.statement}</p>
            <Asterisk className="sales-statement__asterisk" />
            <TornEdge to={C.red} seed={3} />
          </div>
        </section>

        {/* ---------- Pijlers ---------- */}
        <section className="sales-pillars" aria-labelledby="pillars-title">
          <h2 className="sales-h2 sales-h2--light" id="pillars-title" data-stick>
            {sales.pillarsHeading}
          </h2>
          <ol className="pillar-bars">
            {pillars.map((p, i) => (
              <li key={p.slug} data-stick>
                <a href={`/pijlers/${p.slug}`} onClick={internalLink(`/pijlers/${p.slug}`)} className="pillar-bar">
                  <span className="pillar-bar__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="pillar-bar__title">{p.title}</span>
                  <span className="pillar-bar__sub">{p.subtitle}</span>
                </a>
              </li>
            ))}
          </ol>
          <TornEdge to={C.cream} seed={4} />
        </section>

        {/* ---------- Kijkje in het blad ---------- */}
        <section className="sales-preview" aria-labelledby="preview-title">
          <h2 className="sales-h2" id="preview-title" data-stick>
            {preview.heading}
          </h2>
          <div className="spreads">
            {preview.spreads.map((s, i) => (
              <figure key={s.image} className="spread" style={{ '--r': `${i ? 1.4 : -1.2}deg` }} data-stick>
                <img src={salesImage(s.image)} alt={s.alt} loading="lazy" />
                <span className="spread__fold" aria-hidden="true" />
              </figure>
            ))}
          </div>
          <p className="sales-preview__caption">{preview.caption}</p>
        </section>

        {/* ---------- Huisstijl ---------- */}
        <section className="sales-look" aria-labelledby="look-title">
          <div className="swatches">
            {look.swatches.map((s) => (
              <Swatch key={s.hex} swatch={s} />
            ))}
          </div>
          <div className="sales-look__card" data-stick>
            <h2 className="sales-h2" id="look-title">
              {look.heading}
            </h2>
            <p className="sales-text">{look.text}</p>
            <div className="sales-look__mark">
              <Asterisk className="sales-look__asterisk" />
              <p className="sales-text">{look.asterisk}</p>
            </div>
            <p className="sales-look__hint">klik op een kleur om de code te kopiëren</p>
          </div>
        </section>

        {/* ---------- Waar je BRANIE vindt ---------- */}
        <section className="sales-where" aria-labelledby="where-title">
          <div className="sales-wrap">
            <h2 className="sales-h2" id="where-title" data-stick>
              {where.heading}
            </h2>
            <p className="sales-text">{where.text}</p>
          </div>
          <ol className="channels">
            {where.channels.map((c, i) => (
              <li key={c.title} className={`channel channel--${c.tone}`}>
                <span className="channel__num" aria-hidden="true">
                  {i + 1}
                </span>
                <div className="channel__body" data-stick>
                  <h3 className="channel__title">{c.title}</h3>
                  <p className="channel__text">{c.text}</p>
                </div>
                <img className="channel__photo" src={salesImage(c.photo)} alt="" loading="lazy" />
              </li>
            ))}
          </ol>
          <div className="sales-wrap sales-where__socials">
            <p className="sales-text">{where.socialsText}</p>
            <p className="sales-handle">{contact.socials}</p>
          </div>
        </section>

        {/* ---------- Adverteren ---------- */}
        <section className="sales-rates" id="adverteren" aria-label="Adverteren en advertorials">
          <div className="rate-card rate-card--bordeaux" data-stick>
            <h2 className="rate-card__title">{ads.heading}</h2>
            <p className="rate-card__tagline">{ads.tagline}</p>
            <h3 className="rate-card__group">In het magazine</h3>
            <ul className="rates rates--print">
              {ads.print.map((r) => (
                <li key={r.label}>
                  <PageSizeIcon size={r.size} />
                  <span className="rates__label">{r.label}</span>
                  <span className="rates__dots" aria-hidden="true" />
                  <span className="rates__price">{euro(r.price)}</span>
                </li>
              ))}
            </ul>
            <h3 className="rate-card__group">Op social media</h3>
            <ul className="rates rates--social">
              {ads.social.map((r) => (
                <li key={r.label}>
                  <span className="rates__label">{r.label}</span>
                  <span className="rates__dots" aria-hidden="true" />
                  <span className="rates__price">{euro(r.price)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rate-card rate-card--red" data-stick>
            <h2 className="rate-card__title">{advertorial.heading}</h2>
            <p className="rate-card__tagline">{advertorial.tagline}</p>
            <h3 className="rate-card__group">In het magazine</h3>
            <ul className="rates rates--print">
              {advertorial.print.map((r) => (
                <li key={r.label}>
                  <PageSizeIcon size={r.size} />
                  <span className="rates__label">{r.label}</span>
                  <span className="rates__dots" aria-hidden="true" />
                  <span className="rates__price">{euro(r.price)}</span>
                </li>
              ))}
            </ul>
            <p className="rate-card__text">{advertorial.text}</p>
          </div>
        </section>

        {/* ---------- Pakketten ---------- */}
        <section className="sales-packages" id="pakketten" aria-labelledby="packages-title">
          <div className="sales-wrap">
            <h2 className="sales-h2" id="packages-title" data-stick>
              {packages.heading}
            </h2>
            <p className="sales-text">
              <Rich text={packages.text} />
            </p>
          </div>
          <div className="packages">
            {packages.items.map((p) => {
              const discount = ((1 - p.price / p.separate) * 100).toFixed(1).replace('.', ',');
              const subject = encodeURIComponent(`Interesse in ${p.name} (${p.focus})`);
              return (
                <article key={p.name} className={`package package--${p.tone}`} aria-labelledby={`pkg-${p.name}`}>
                  <p className="package__price" data-stick>
                    <span className="package__for">voor maar</span>
                    <span className="package__amount">{euro(p.price)}</span>
                  </p>
                  <h3 className="package__name" id={`pkg-${p.name}`}>
                    {p.name}
                  </h3>
                  <p className="package__focus">{p.focus}</p>
                  <ul className="package__items">
                    {p.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                  <p className="package__saving">
                    Los zou dit {euro(p.separate)} kosten.
                    <strong> {discount}% korting!</strong>
                  </p>
                  <a className="paper-btn package__btn" href={`mailto:${contact.email}?subject=${subject}`}>
                    Kies {p.name.toLowerCase()}
                  </a>
                  <Asterisk className="package__asterisk" />
                </article>
              );
            })}
          </div>
        </section>

        {/* ---------- Prijs ---------- */}
        <section className="sales-price" id="prijs" aria-labelledby="price-title">
          <div className="sales-price__top">
            <h2 className="sales-h2" id="price-title" data-stick>
              {price.heading}
            </h2>
            <div className="price-stickers">
              <p className="price-sticker price-sticker--red" data-stick>
                <span className="price-sticker__label">{price.shop.label}</span>
                <span className="price-sticker__amount">{price.shop.price}</span>
              </p>
              <p className="price-sticker price-sticker--ochre" data-stick>
                <span className="price-sticker__label">{price.presale.label}</span>
                <span className="price-sticker__amount">{price.presale.price}</span>
              </p>
            </div>
            <div className="sales-price__cta">
              <PreOrderButton />
            </div>
          </div>

          <div className="sales-wrap sales-delivery" aria-labelledby="delivery-title">
            <h2 className="sales-h2" id="delivery-title" data-stick>
              {delivery.heading}
            </h2>
            <p className="sales-text">{delivery.text}</p>
            <dl className="delivery">
              <div className="delivery__row">
                <dt>Deadline</dt>
                <dd>
                  <span className="delivery__script">{delivery.deadlineLabel}</span>
                  <DaysLeft date={delivery.deadline} />
                </dd>
              </div>
              <div className="delivery__row">
                <dt>Aanleveren</dt>
                <dd>
                  {delivery.deliverText}{' '}
                  <a className="delivery__script" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <TornEdge to={C.red} seed={9} />
        </section>

        {/* ---------- Contact ---------- */}
        <section className="sales-contact" id="contact" aria-labelledby="contact-title">
          <h2 className="sales-contact__title" id="contact-title" data-stick>
            {contact.heading}
          </h2>
          <dl className="contact-list" data-stick>
            <div>
              <dt>E-mail</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
            <div>
              <dt>Website</dt>
              <dd>{contact.websiteUrl ? <a href={contact.websiteUrl}>{contact.website}</a> : contact.website}</dd>
            </div>
            <div>
              <dt>Socials</dt>
              <dd>
                <span className="contact-list__handle">{contact.socials}</span>
                <span className="contact-list__socials">
                  {contact.socialLinks.map((s) => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  ))}
                </span>
              </dd>
            </div>
          </dl>
          <div className="contact-photos" aria-hidden="true">
            {contact.photos.map((name, i) => (
              <img key={name} src={salesImage(name)} alt="" loading="lazy" style={{ '--s': [1, 0.78, 1.08][i % 3] }} />
            ))}
          </div>
          <p className="sales-contact__payoff">{brand.payoff}</p>
          <BrandLogo as="p" className="sales-contact__logo" />
        </section>
      </main>
    </div>
  );
}
