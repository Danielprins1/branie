import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { navigateTo } from '../lib/navigate.js';
import { tearAway } from '../lib/tearAway.js';

/**
 * Navigatie in de vorm van een liggend Amsterdammertje: bordeaux, met de
 * bolle kop en de drie andreaskruisen. Bovenaan de pagina is hij er niet;
 * hij komt omhoog uit de 'stoep' zodra de magazinesectie (pre-order) in
 * beeld komt, en zakt weer weg als je terug naar de fotomuur scrollt.
 */
export default function BollardNav({ sectionRef }) {
  const [visible, setVisible] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    // Zichtbaar zodra de magazinesectie voor een groot deel in beeld is. Op
    // smalle schermen pas als de pre-orderknop boven het paaltje uitkomt,
    // zodat het paaltje de knop niet bedekt.
    const update = () => {
      const top = section.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const cta = section.querySelector('.magazine-section__cta');
      const narrow = window.innerWidth < 700;
      let show = top < vh * 0.55;
      if (narrow && cta) {
        const c = cta.getBoundingClientRect();
        show = show && c.bottom < vh - 110;
      }
      setVisible(show);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [sectionRef]);

  // Startpositie: onder de rand van het scherm, in de 'stoep'.
  useLayoutEffect(() => {
    gsap.set(navRef.current, { yPercent: 160, autoAlpha: 1 });
  }, []);

  // Omhoogkomen als een paaltje uit de grond: korte overshoot, licht wiebelen.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(nav, { yPercent: visible ? 0 : 160 });
      return undefined;
    }
    const tween = visible
      ? gsap
          .timeline()
          .to(nav, { yPercent: -8, duration: 0.45, ease: 'power3.out' })
          .to(nav, { yPercent: 0, duration: 0.35, ease: 'power2.inOut' })
          .fromTo(nav, { rotation: -1.2 }, { rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' }, 0.25)
      : gsap.to(nav, { yPercent: 160, duration: 0.35, ease: 'power2.in' });
    return () => tween.kill();
  }, [visible]);

  const go = (path, event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    if (path === '/pijlers') {
      tearAway({ y: event.clientY || window.innerHeight / 2, navigate: () => navigateTo(path) });
      return;
    }
    navigateTo(path);
    window.scrollTo(0, 0);
  };

  const toPreorder = (event) => {
    event.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = document.querySelector('.magazine-section__cta');
    target?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    target?.querySelector('button, a')?.focus({ preventScroll: true });
  };

  return (
    <div className="bollard-dock" aria-hidden={!visible || undefined}>
      <nav className="bollard" ref={navRef} aria-label="Hoofdmenu" inert={!visible || undefined}>
        <span className="bollard__cap" aria-hidden="true" />
        <span className="bollard__crosses" aria-hidden="true">
          <span>✕</span>
          <span>✕</span>
          <span>✕</span>
        </span>
        <ul className="bollard__links">
          <li>
            <a href="#magazine" onClick={toPreorder}>
              Magazine
            </a>
          </li>
          <li>
            <a href="/pijlers" onClick={(e) => go('/pijlers', e)}>
              Pijlers
            </a>
          </li>
          <li>
            <a href="/sales" onClick={(e) => go('/sales', e)}>
              Adverteren
            </a>
          </li>
          <li>
            <a className="bollard__preorder" href="#magazine" onClick={toPreorder}>
              Pre-order
            </a>
          </li>
        </ul>
        <span className="bollard__foot" aria-hidden="true" />
      </nav>
    </div>
  );
}
