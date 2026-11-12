import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faq } from '../config/faq.js';
import { brand } from '../config/site.js';
import { navigateTo } from '../lib/navigate.js';
import { shutterMarkup } from '../lib/shutter.js';
import BrandLogo from '../components/BrandLogo.jsx';
import Asterisk from '../components/Asterisk.jsx';
import PreOrderButton from '../components/PreOrderButton.jsx';
import Footer from '../components/Footer.jsx';

gsap.registerPlugin(ScrollTrigger);

function internalLink(path) {
  return (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    navigateTo(path);
    if (path.startsWith('/#')) {
      // naar een plek op de homepage (bijvoorbeeld de pre-order)
      setTimeout(() => {
        const el = document.getElementById(path.slice(2));
        window.scrollTo(0, (el?.getBoundingClientRect().top ?? 0) + window.scrollY);
      }, 60);
    } else {
      window.scrollTo(0, 0);
    }
  };
}

/** [tekst](adres) in een antwoord omzetten naar een link. */
function Answer({ text }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;
    const [, label, url] = match;
    if (url.startsWith('/')) {
      return (
        <a key={i} href={url} onClick={internalLink(url)}>
          {label}
        </a>
      );
    }
    const external = url.startsWith('http');
    return (
      <a key={i} href={url} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
        {label}
      </a>
    );
  });
}

/**
 * FAQ (/faq). Bovenaan hangt een rolluik met graffiti; als je scrolt
 * rolt het omhoog en kijk je naar binnen. Daaronder de vragen per groep,
 * elk als uitklapper. Inhoud: src/config/faq.js.
 */
export default function FaqPage() {
  const rootRef = useRef(null);
  const gateRef = useRef(null);
  const shutterHtml = useMemo(() => ({ __html: shutterMarkup() }), []);

  useEffect(() => {
    const prev = document.title;
    document.title = `${faq.title} · ${brand.name}`;
    window.scrollTo(0, 0);
    return () => {
      document.title = prev;
    };
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      // Het rolluik rolt op terwijl je door de 'poort' scrolt.
      gsap
        .timeline({
          scrollTrigger: { trigger: gateRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.5 },
        })
        .to('.faq__shutter', { yPercent: -101, ease: 'none', duration: 1 })
        .fromTo('.faq__hero-inner', { scale: 0.94, y: 30 }, { scale: 1, y: 0, ease: 'power1.out', duration: 1 }, 0);
      gsap.utils.toArray('.faq__group').forEach((group) => {
        gsap.from(group, {
          y: 40,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: group, start: 'top 88%', once: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Klikken op het rolluik opent het ook.
  const open = () => {
    const gate = gateRef.current;
    window.scrollTo({ top: gate.offsetTop + gate.offsetHeight - window.innerHeight, behavior: 'smooth' });
  };

  return (
    <main className="faq" ref={rootRef}>
      <a className="faq__logo" href="/" onClick={internalLink('/')} aria-label={`${brand.name}: naar de homepage`}>
        <BrandLogo as="span" />
      </a>

      <div className="faq__gate" ref={gateRef}>
        <div className="faq__window">
          <header className="faq__hero">
            <div className="faq__hero-inner">
              <p className="faq__script">{faq.script}</p>
              <h1 className="faq__title">
                {faq.title}
                <Asterisk className="faq__asterisk" />
              </h1>
              <p className="faq__intro">{faq.intro}</p>
              <ul className="faq__jump">
                {faq.groups.map((group, i) => (
                  <li key={group.title}>
                    <a className={`faq__chip faq__chip--${group.tone}`} href={`#faq-${i + 1}`}>
                      {group.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </header>
          <div
            className="shutter faq__shutter"
            aria-hidden="true"
            onClick={open}
            dangerouslySetInnerHTML={shutterHtml}
          />
        </div>
      </div>

      <div className="faq__groups">
        {faq.groups.map((group, i) => (
          <section className={`faq__group faq__group--${group.tone}`} id={`faq-${i + 1}`} key={group.title}>
            <h2 className="faq__group-title">{group.title}</h2>
            {group.items.map(([question, answer]) => (
              <details className="faq__item" key={question}>
                <summary>
                  <span>{question}</span>
                  <span className="faq__plus" aria-hidden="true" />
                </summary>
                <p>
                  <Answer text={answer} />
                </p>
              </details>
            ))}
          </section>
        ))}
      </div>

      <section className="faq__outro">
        <h2 className="faq__outro-title">{faq.outro.heading}</h2>
        <p>
          {faq.outro.text} <a href={`mailto:${faq.outro.email}`}>{faq.outro.email}</a>
        </p>
        <div className="faq__cta">
          <PreOrderButton />
        </div>
      </section>

      <Footer />
    </main>
  );
}
