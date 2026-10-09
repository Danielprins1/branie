import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagazineCover from './MagazineCover.jsx';

gsap.registerPlugin(ScrollTrigger);

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const travelEase = gsap.parseEase('sine.inOut');

/** Deel van de scroll waarin de cover loskomt, vóór hij gaat vallen. */
const LIFT_END = 0.28;

/**
 * De cover valt van de muur.
 *
 * Werking (FLIP-achtig, maar live):
 *  - Er is één "vliegende" cover (position: fixed) die alleen zichtbaar is
 *    tijdens de overgang.
 *  - Op elk frame worden de startplek (het gat op de muur) en de eindplek
 *    (in de magazinesectie) opnieuw gemeten. De vliegende cover wordt
 *    daartussen geïnterpoleerd. Daardoor klopt de begin- en eindpositie
 *    altijd, op elk schermformaat en ook bij resizen.
 *  - Bij progress 0 en 1 wordt de vliegende cover verborgen en is de
 *    "echte" cover op de muur resp. in de sectie zichtbaar. Die zien er
 *    pixel-identiek uit, dus de wissel is onzichtbaar.
 *  - De scroll bestuurt alles (scrub), dus achteruit scrollen werkt vanzelf.
 *
 * Status staat op <html data-cover="wall|flying|landed|static">.
 */
export default function MagazineTransition({ stageRef, sectionRef, sourceRef, targetRef }) {
  const flyerRef = useRef(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        if (ctx.conditions.reduce) {
          root.dataset.cover = 'static';
          return () => delete root.dataset.cover;
        }

        const flyer = flyerRef.current;
        const state = { p: 0 };
        let mode = '';

        const setMode = (next) => {
          if (next === mode) return;
          mode = next;
          root.dataset.cover = next;
        };

        const render = () => {
          const p = state.p;
          if (p <= 0.0005) return setMode('wall');
          if (p >= 0.9995) return setMode('landed');

          const src = sourceRef.current;
          const tgt = targetRef.current;
          if (!src || !tgt) return;

          const s = src.getBoundingClientRect();
          const t = tgt.getBoundingClientRect();
          const srcRot = Number(src.dataset.rotation) || 0;
          const tgtRot = Number(tgt.dataset.rotation) || 0;

          // a = loskomen (0→1), b = vallen/landen (0→1)
          const a = clamp01(p / LIFT_END);
          const bRaw = clamp01((p - LIFT_END) / (1 - LIFT_END));
          const b = travelEase(bRaw);
          const air = Math.sin(Math.PI * bRaw); // 0 → 1 → 0 tijdens de val
          const lifted = a * (1 - b);

          const vw = window.innerWidth;
          const vh = window.innerHeight;

          const cx = lerp(s.left + s.width / 2, t.left + t.width / 2, b) + air * vw * 0.035;
          const cy = lerp(s.top + s.height / 2, t.top + t.height / 2, b) - lifted * vh * 0.025;

          const scale = lerp(s.width / t.width, 1, b) * (1 + 0.09 * lifted + 0.04 * air);
          const rot = lerp(srcRot, tgtRot, b) - 2.5 * lifted + 7 * air;
          const rotX = 7 * lifted + 9 * air;
          const rotY = -5 * air;
          const lift = Math.min(1, a) * (1 - bRaw * bRaw * bRaw);

          flyer.style.width = `${t.width}px`;
          flyer.style.height = `${t.height}px`;
          flyer.style.transform =
            `translate3d(${cx - t.width / 2}px, ${cy - t.height / 2}px, 0) ` +
            `perspective(1600px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotate(${rot}deg) scale(${scale})`;
          flyer.style.setProperty('--lift', lift.toFixed(3));
          setMode('flying');
        };

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stageRef.current,
            start: 'top top',
            endTrigger: sectionRef.current,
            end: 'top top',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        tl.to(state, { p: 1, duration: 1, onUpdate: render }, 0)
          .to('.scroll-hint__inner', { opacity: 0, duration: 0.06 }, 0)
          .to('.hero__shade', { opacity: 1, duration: LIFT_END }, 0)
          .fromTo(
            '[data-reveal]',
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.14, stagger: 0.025, ease: 'power2.out' },
            0.74,
          );

        render();
        window.addEventListener('resize', render);

        return () => {
          window.removeEventListener('resize', render);
          delete root.dataset.cover;
        };
      },
    );

    return () => mm.revert();
  }, [stageRef, sectionRef, sourceRef, targetRef]);

  return (
    <div className="cover-flyer" ref={flyerRef} aria-hidden="true">
      <div className="cover-frame">
        <MagazineCover priority />
      </div>
    </div>
  );
}
