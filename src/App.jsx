import { useCallback, useRef } from 'react';
import PhotoWall from './components/PhotoWall.jsx';
import IntroAnimation from './components/IntroAnimation.jsx';
import ScrollHint from './components/ScrollHint.jsx';
import MagazineSection from './components/MagazineSection.jsx';
import MagazineTransition from './components/MagazineTransition.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const stageRef = useRef(null);
  const sectionRef = useRef(null);
  const coverSlotRef = useRef(null);
  const coverTargetRef = useRef(null);

  // Klik op de cover op de muur: scroll naar het magazine.
  const goToMagazine = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
    section.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <a className="skip-link" href="#magazine">
        Ga naar het magazine
      </a>
      <main>
        <section className="stage" ref={stageRef} aria-label="BRANIE fotomuur">
          <div className="hero">
            <PhotoWall ref={coverSlotRef} onCoverActivate={goToMagazine} />
            <div className="hero__shade" aria-hidden="true" />
            <div className="hero__scrim" aria-hidden="true" />
            <IntroAnimation />
            <ScrollHint />
          </div>
        </section>
        <MagazineSection ref={sectionRef} targetRef={coverTargetRef} />
      </main>
      <Footer />
      <MagazineTransition
        stageRef={stageRef}
        sectionRef={sectionRef}
        sourceRef={coverSlotRef}
        targetRef={coverTargetRef}
      />
    </>
  );
}
