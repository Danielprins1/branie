import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import BrandLogo from './BrandLogo.jsx';
import Payoff from './Payoff.jsx';

/**
 * Intro (± 3 seconden):
 *  0   – 1   s  de fotomuur verschijnt
 *  0,5 – 1,5 s  "BRANIE" fade-in
 *  1,5 – 3   s  pay-off wordt "geschreven"
 * Daarna verschijnt een kleine scrollhint. Bij "minder beweging"
 * (prefers-reduced-motion) staat alles meteen goed.
 */
export default function IntroAnimation() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });

      tl.fromTo('.wall', { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0)
        .fromTo(
          '.wall-item__body',
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.55, stagger: { amount: 0.45, from: 'random' } },
          0.05,
        )
        .fromTo(
          '.brand-logo',
          { opacity: 0, y: 26, scale: 0.97, filter: 'blur(8px)' },
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
          0.5,
        )
        .fromTo(
          '.brand-logo__asterisk',
          { scale: 0, rotate: -120 },
          { scale: 1, rotate: 0, duration: 0.55, ease: 'back.out(1.8)' },
          1.1,
        )
        .fromTo(
          '.payoff',
          { '--reveal': '-15%' },
          { '--reveal': '115%', duration: 1.5, ease: 'power1.inOut' },
          1.5,
        )
        .fromTo('.scroll-hint', { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.6 }, 2.9);

      // Wacht (kort) op de lettertypes, zodat het logo niet verspringt.
      let cancelled = false;
      const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
      Promise.race([fontsReady, new Promise((r) => setTimeout(r, 700))]).then(() => {
        if (!cancelled) tl.play();
      });

      return () => {
        cancelled = true;
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="hero__brand" ref={rootRef}>
      <BrandLogo />
      <Payoff />
    </div>
  );
}
