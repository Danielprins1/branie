import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { navigateTo } from '../lib/navigate.js';
import { tearAway } from '../lib/tearAway.js';
import { cameraFlash } from '../lib/flash.js';
import { shutterDown } from '../lib/shutter.js';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isNarrow = () => window.innerWidth < 700;

/**
 * Navigatie als een rechtopstaand Amsterdammertje, linksonder in beeld.
 * - Hij is altijd zichtbaar. Ingeklapt steekt alleen de bolle kop boven de
 *   stoep uit, met het lijst-icoon erop. Op de homepage blijft hij zo
 *   staan tot de magazinesectie (pre-order) in beeld komt; dan schuift
 *   hij vanzelf uit. Op de andere pagina's staat hij meteen uitgeschoven.
 * - De bolle kop is een knop: een klik klapt hem in of uit, en die keuze
 *   blijft dan staan.
 */
export default function BollardNav({ path }) {
  const isHome = path === '/' || path === '';
  const [narrow, setNarrow] = useState(isNarrow);
  const [reached, setReached] = useState(!isHome); // magazinesectie al in beeld?
  const [manual, setManual] = useState(null); // null = vanzelf, anders de keuze van de bezoeker
  const postRef = useRef(null);
  const firstRun = useRef(true);
  const menuId = useId();

  // Uitgeschoven: de keuze van de bezoeker, anders vanzelf (niet op mobiel, niet in de eerste sectie).
  const open = manual ?? (!narrow && reached);

  useEffect(() => {
    const onResize = () => setNarrow(isNarrow());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Op de homepage: de magazinesectie 'bereikt' zodra hij grotendeels in beeld is.
  useEffect(() => {
    if (!isHome) {
      setReached(true);
      return undefined;
    }
    const update = () => {
      const section = document.getElementById('magazine');
      if (!section) return;
      setReached(section.getBoundingClientRect().top < window.innerHeight * 0.55);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [isHome]);

  // Eerste plaatsing zonder animatie: onder de stoep.
  useLayoutEffect(() => {
    const post = postRef.current;
    gsap.set(post, { y: post.offsetHeight + 40, autoAlpha: 1 });
  }, []);

  // Hoe ver het paaltje omhoog staat: ingeklapt (alleen de kop) of helemaal uitgeschoven.
  useLayoutEffect(() => {
    const post = postRef.current;
    if (!post) return undefined;
    const h = post.offsetHeight;
    const capH = parseFloat(getComputedStyle(post.parentElement).getPropertyValue('--cap-h')) || 70;
    const y = open ? 0 : h - capH;
    if (reduceMotion()) {
      gsap.set(post, { y, rotation: 0 });
      return undefined;
    }
    // Op de homepage even wachten tot de intro klaar is, dan steekt de kop omhoog.
    const delay = firstRun.current && isHome ? 2.6 : 0;
    firstRun.current = false;
    const tl = gsap.timeline({ delay });
    if (y < (gsap.getProperty(post, 'y') || 0)) {
      // omhoog: even doorschieten en wiebelen
      tl.to(post, { y: y - 10, duration: 0.42, ease: 'power3.out' })
        .to(post, { y, duration: 0.3, ease: 'power2.inOut' })
        .fromTo(post, { rotation: -1.6 }, { rotation: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' }, 0.2);
    } else {
      tl.to(post, { y, rotation: 0, duration: 0.38, ease: 'power2.in' });
    }
    return () => tl.kill();
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToPreorder = () => {
    const target = document.querySelector('.magazine-section__cta');
    target?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'center' });
    target?.querySelector('button, a')?.focus({ preventScroll: true });
  };

  const go = (to, event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    if (isNarrow()) setManual(false);
    if (to === 'preorder' || to === 'magazine') {
      if (isHome) {
        if (to === 'preorder') scrollToPreorder();
        else document.getElementById('magazine')?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth' });
      } else {
        navigateTo('/');
        // na het wisselen van pagina naar het magazine
        setTimeout(() => {
          const top = document.getElementById('magazine')?.getBoundingClientRect().top ?? 0;
          window.scrollTo(0, top + window.scrollY);
          if (to === 'preorder') setTimeout(scrollToPreorder, 50);
        }, 60);
      }
      return;
    }
    if (to === '/pijlers' && isHome) {
      tearAway({ y: event.clientY || window.innerHeight / 2, navigate: () => navigateTo(to) });
      return;
    }
    if (to === '/over-ons' && !path.startsWith(to)) {
      // er wordt een foto gemaakt: flits, en dan ligt de stapel polaroids er
      cameraFlash(() => {
        navigateTo(to);
        window.scrollTo(0, 0);
      });
      return;
    }
    if (to === '/faq' && !path.startsWith(to)) {
      // het rolluik zakt; op de FAQ-pagina scrol je het weer open
      shutterDown(() => {
        navigateTo(to);
        window.scrollTo(0, 0);
      });
      return;
    }
    navigateTo(to);
    window.scrollTo(0, 0);
  };

  const current = (p) => (path.startsWith(p) ? 'page' : undefined);

  return (
    <nav className={`bollard${open ? ' is-open' : ''}`} aria-label="Hoofdmenu">
      <div className="bollard__post" ref={postRef}>
        <button
          type="button"
          className="bollard__cap"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setManual(!open)}
        >
          <span className="visually-hidden">{open ? 'Menu inklappen' : 'Menu openen'}</span>
          {!open && (
            <span className="bollard__cap-icon" aria-hidden="true">
              {/* lijst-icoon: drie regels, met kruisjes in plaats van stipjes */}
              <svg viewBox="0 0 512 512" focusable="false">
                <g fill="none" stroke="currentColor" strokeWidth="34" strokeLinecap="round">
                  <path d="M15 75 75 135M75 75 15 135" />
                  <path d="M15 225 75 285M75 225 15 285" />
                  <path d="M15 375 75 435M75 375 15 435" />
                </g>
                <g fill="currentColor">
                  <rect x="120" y="60" width="392" height="90" rx="45" />
                  <rect x="120" y="210" width="392" height="90" rx="45" />
                  <rect x="120" y="360" width="392" height="90" rx="45" />
                </g>
              </svg>
            </span>
          )}
        </button>
        <div className="bollard__body" id={menuId} inert={!open || undefined}>
          <span className="bollard__crosses" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <ul className="bollard__links">
            <li>
              <a href="/#magazine" onClick={(e) => go('magazine', e)}>
                Magazine
              </a>
            </li>
            <li>
              <a href="/pijlers" aria-current={current('/pijlers')} onClick={(e) => go('/pijlers', e)}>
                Pijlers
              </a>
            </li>
            <li>
              <a href="/over-ons" aria-current={current('/over-ons')} onClick={(e) => go('/over-ons', e)}>
                Over ons
              </a>
            </li>
            <li>
              <a href="/faq" aria-current={current('/faq')} onClick={(e) => go('/faq', e)}>
                FAQ
              </a>
            </li>
            <li>
              <a href="/sales" aria-current={current('/sales')} onClick={(e) => go('/sales', e)}>
                Adverteren
              </a>
            </li>
            <li>
              <a className="bollard__preorder" href="/#magazine" onClick={(e) => go('preorder', e)}>
                Pre-order
              </a>
            </li>
          </ul>
        </div>
      </div>
      <span className="bollard__pavement" aria-hidden="true" />
    </nav>
  );
}
