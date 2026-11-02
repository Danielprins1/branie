import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { navigateTo } from '../lib/navigate.js';
import { tearAway } from '../lib/tearAway.js';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isNarrow = () => window.innerWidth < 700;

/**
 * Navigatie als een rechtopstaand Amsterdammertje, linksonder in beeld.
 * - Op de homepage komt hij pas omhoog bij de magazinesectie (pre-order);
 *   op /pijlers en /sales staat hij er meteen.
 * - De bolle kop is een knop: het paaltje zakt in de stoep (alleen de kop
 *   blijft zichtbaar) en komt met nog een klik weer omhoog.
 */
export default function BollardNav({ path }) {
  const isHome = path === '/' || path === '';
  const [inView, setInView] = useState(!isHome);
  const [open, setOpen] = useState(() => !isNarrow());
  const postRef = useRef(null);
  const menuId = useId();

  // Op de homepage: zichtbaar zodra de magazinesectie grotendeels in beeld is.
  useEffect(() => {
    if (!isHome) {
      setInView(true);
      return undefined;
    }
    const update = () => {
      const section = document.getElementById('magazine');
      if (!section) return;
      setInView(section.getBoundingClientRect().top < window.innerHeight * 0.55);
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

  // Hoe ver het paaltje omhoog staat: weg (onder de stoep), ingeklapt
  // (alleen de kop) of helemaal uitgeschoven.
  useLayoutEffect(() => {
    const post = postRef.current;
    if (!post) return undefined;
    const h = post.offsetHeight;
    const capH = parseFloat(getComputedStyle(post.parentElement).getPropertyValue('--cap-h')) || 70;
    const y = !inView ? h + 40 : open ? 0 : h - capH;
    if (reduceMotion()) {
      gsap.set(post, { y, rotation: 0 });
      return undefined;
    }
    const tl = gsap.timeline();
    if (inView && y < (gsap.getProperty(post, 'y') || 0)) {
      // omhoog uit de stoep: even doorschieten en wiebelen
      tl.to(post, { y: y - 10, duration: 0.42, ease: 'power3.out' })
        .to(post, { y, duration: 0.3, ease: 'power2.inOut' })
        .fromTo(post, { rotation: -1.6 }, { rotation: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' }, 0.2);
    } else {
      tl.to(post, { y, rotation: 0, duration: 0.38, ease: 'power2.in' });
    }
    return () => tl.kill();
  }, [inView, open]);

  const scrollToPreorder = () => {
    const target = document.querySelector('.magazine-section__cta');
    target?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'center' });
    target?.querySelector('button, a')?.focus({ preventScroll: true });
  };

  const go = (to, event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    if (isNarrow()) setOpen(false);
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
    navigateTo(to);
    window.scrollTo(0, 0);
  };

  const current = (p) => (path.startsWith(p) ? 'page' : undefined);

  return (
    <nav className={`bollard${open ? ' is-open' : ''}`} aria-label="Hoofdmenu" inert={!inView || undefined}>
      <div className="bollard__post" ref={postRef}>
        <button
          type="button"
          className="bollard__cap"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="visually-hidden">{open ? 'Menu inklappen' : 'Menu openen'}</span>
          <span className="bollard__cap-hint" aria-hidden="true">
            {open ? '' : 'menu'}
          </span>
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
