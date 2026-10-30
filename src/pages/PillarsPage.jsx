import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { pillars, pillarsPage } from '../config/pillars.js';
import { brand } from '../config/site.js';
import PaperStrips, { OVERLAP } from '../components/pillars/PaperStrips.jsx';
import PillarDetail from '../components/pillars/PillarDetail.jsx';
import ArticleView from '../components/pillars/ArticleView.jsx';
import BrandLogo from '../components/BrandLogo.jsx';

/** /pijlers, /pijlers/<pijler>, /pijlers/<pijler>/<artikel> */
function parse(pathname) {
  const [, , pillarSlug, articleSlug] = pathname.replace(/\/+$/, '').split('/');
  const index = pillars.findIndex((p) => p.slug === pillarSlug);
  if (index < 0) return { index: -1, article: null, valid: !pillarSlug };
  const pillar = pillars[index];
  const article = articleSlug ? pillar.articles.find((a) => a.slug === articleSlug) ?? null : null;
  return { index, article, valid: !articleSlug || Boolean(article) };
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ?debug in de URL: de scheuranimatie is te inspecteren via window.__pillarsTimeline.
const DEBUG = new URLSearchParams(window.location.search).has('debug');

/**
 * De pijlerpagina: vijf gescheurde papierstroken. Klik = de collage
 * scheurt open ter hoogte van die strook en onthult de pijler erachter.
 */
export default function PillarsPage() {
  const [route, setRoute] = useState(() => parse(window.location.pathname));
  const [openIndex, setOpenIndex] = useState(null); // welke pijler staat achter het papier
  const [phase, setPhase] = useState('closed'); // closed | opening | open | closing
  const [activeStrip, setActiveStrip] = useState(null);

  const stageRef = useRef(null);
  const detailRef = useRef(null);
  const stripRefs = useRef({ strips: [], tops: [], bottoms: [], links: [] });
  const tlRef = useRef(null);
  const tornRef = useRef(null);
  const firstRun = useRef(true);
  const lastOpened = useRef(null);

  const navigate = useCallback((path, { replace = false } = {}) => {
    if (replace) window.history.replaceState(null, '', path);
    else window.history.pushState(null, '', path);
    setRoute(parse(path));
  }, []);

  useEffect(() => {
    const onPop = () => setRoute(parse(window.location.pathname));
    window.addEventListener('popstate', onPop);
    document.documentElement.classList.add('is-pillars');
    return () => {
      window.removeEventListener('popstate', onPop);
      document.documentElement.classList.remove('is-pillars');
    };
  }, []);

  // Onbekende URL → terug naar /pijlers.
  useEffect(() => {
    if (!route.valid) navigate(route.index >= 0 ? `/pijlers/${pillars[route.index].slug}` : '/pijlers', { replace: true });
  }, [route, navigate]);

  /* ---------------- de scheuranimatie ---------------- */

  const buildTimeline = useCallback((s) => {
    const { strips, tops, bottoms } = stripRefs.current;
    const stageH = stageRef.current.clientHeight;
    const band = stageH / pillars.length;
    const tearY = (s + 0.5) * band;
    const up = [...strips.slice(0, s), tops[s]];
    const down = [bottoms[s], ...strips.slice(s + 1)];
    const upDist = tearY + OVERLAP * 2 + 80;
    const downDist = stageH - tearY + OVERLAP * 2 + 80;

    strips[s].classList.add('is-torn');
    tornRef.current = s;
    gsap.set(up, { transformOrigin: '50% 100%' });
    gsap.set(down, { transformOrigin: '50% 0%' });

    const tl = gsap.timeline({ paused: true });
    // 1. de scheur: korte ruk, de lagen wijken een stukje
    tl.to(up, { y: -18, rotation: -0.35, duration: 0.32, ease: 'power2.out' }, 0)
      .to(down, { y: 18, rotation: 0.3, duration: 0.32, ease: 'power2.out' }, 0)
      // 2. de lagen trekken weg; dichtstbijzijnde laag eerst
      .to(up, { y: -upDist, rotation: -1.4, duration: 0.95, ease: 'power3.inOut', stagger: { each: 0.03, from: 'end' } }, 0.26)
      .to(down, { y: downDist, rotation: 1.2, duration: 0.95, ease: 'power3.inOut', stagger: { each: 0.03, from: 'start' } }, 0.26)
      .fromTo(detailRef.current, { scale: 0.965 }, { scale: 1, duration: 1.15, ease: 'power2.out' }, 0.12);
    return tl;
  }, []);

  const resetStrips = useCallback(() => {
    const { strips, tops, bottoms } = stripRefs.current;
    gsap.set([...strips, ...tops, ...bottoms], { clearProps: 'transform,transformOrigin' });
    strips.forEach((el) => el?.classList.remove('is-torn'));
    tornRef.current = null;
  }, []);

  const target = route.valid ? route.index : -1;

  useLayoutEffect(() => {
    const instant = firstRun.current || reducedMotion();
    firstRun.current = false;

    if (target >= 0 && openIndex === null) {
      setOpenIndex(target);
      return;
    }
    if (target >= 0 && openIndex !== target) {
      // van pijler naar pijler: papier blijft weg, inhoud wisselt
      tlRef.current?.kill();
      resetStrips();
      setOpenIndex(target);
      return;
    }
    if (target < 0 && openIndex !== null && (phase === 'open' || phase === 'opening')) {
      const tl = tlRef.current;
      const finish = () => {
        resetStrips();
        tlRef.current = null;
        setPhase('closed');
        setOpenIndex(null);
        lastOpened.current = openIndex;
      };
      if (!tl || instant) {
        tl?.kill();
        finish();
        return;
      }
      setPhase('closing');
      tl.eventCallback('onReverseComplete', finish);
      tl.timeScale(1.15).reverse();
    }
  }, [target, openIndex, phase, resetStrips]);

  // Zodra de inhoud van een pijler gerenderd is: scheur open.
  useLayoutEffect(() => {
    if (openIndex === null || tornRef.current === openIndex) return;
    const instant = phase === 'closed' && (reducedMotion() || document.visibilityState !== 'visible' || !stageRef.current.dataset.ready);
    const tl = buildTimeline(openIndex);
    tlRef.current = tl;
    if (DEBUG) window.__pillarsTimeline = tl;
    detailRef.current.scrollTop = 0;
    const done = () => setPhase('open');
    if (instant || phase === 'open') {
      tl.progress(1);
      done();
    } else {
      setPhase('opening');
      tl.eventCallback('onComplete', done);
      tl.timeScale(1).play(0);
    }
  }, [openIndex, phase, buildTimeline]);

  // Focus: na openen naar de titel van de pijler, na sluiten terug naar de strook.
  useEffect(() => {
    if (phase === 'open' && !route.article) {
      detailRef.current?.querySelector('#pillar-title')?.focus({ preventScroll: true });
    } else if (phase === 'closed' && lastOpened.current !== null) {
      stripRefs.current.links[lastOpened.current]?.focus({ preventScroll: true });
      lastOpened.current = null;
    }
  }, [phase, route.article, openIndex]);

  // Na het laden mag er geanimeerd worden (een directe link opent meteen).
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (stageRef.current) stageRef.current.dataset.ready = 'true';
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Bij resizen terwijl hij open is: papier opnieuw buiten beeld zetten.
  useEffect(() => {
    const onResize = () => {
      if (phase !== 'open' || openIndex === null) return;
      tlRef.current?.kill();
      resetStrips();
      const tl = buildTimeline(openIndex);
      tlRef.current = tl;
      tl.progress(1);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [phase, openIndex, buildTimeline, resetStrips]);

  /* ---------------- navigatie ---------------- */

  const openPillar = (i) => {
    if (phase === 'opening' || phase === 'closing') return;
    navigate(`/pijlers/${pillars[i].slug}`);
  };
  const close = useCallback(() => navigate('/pijlers'), [navigate]);
  const pillar = openIndex !== null ? pillars[openIndex] : null;
  const article = pillar && route.index === openIndex ? route.article : null;

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      if (article) navigate(`/pijlers/${pillar.slug}`);
      else if (pillar && phase === 'open') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [article, pillar, phase, close, navigate]);

  useEffect(() => {
    const parts = [article?.title, pillar?.title, pillarsPage.title, brand.name].filter(Boolean);
    document.title = parts.join(' · ');
  }, [article, pillar]);

  const isOpen = openIndex !== null;

  return (
    <main className={`pillars-page phase-${phase}`}>
      <h1 className="visually-hidden">
        {brand.name}: {pillarsPage.title}
      </h1>

      {pillar && (
        <PillarDetail
          ref={detailRef}
          pillar={pillar}
          index={openIndex}
          inert={phase !== 'open' || Boolean(article)}
          onBack={close}
          onGoTo={(slug) => navigate(`/pijlers/${slug}`)}
          onOpenArticle={(slug) => navigate(`/pijlers/${pillar.slug}/${slug}`)}
        />
      )}

      <div className="pillars-stage" ref={stageRef}>
        <div className="pillars-stage__top" inert={isOpen || undefined}>
          <a className="pillars-stage__home" href="/" aria-label={`${brand.name}: naar de homepage`}>
            <BrandLogo as="span" className="pillars-stage__logo" />
          </a>
          <p className="pillars-stage__tagline" aria-hidden="true">
            {pillarsPage.tagline}
          </p>
        </div>
        <PaperStrips
          refs={stripRefs}
          activeIndex={isOpen ? null : activeStrip}
          onActivate={setActiveStrip}
          onOpen={openPillar}
          inert={isOpen}
        />
      </div>

      {article && pillar && (
        <ArticleView article={article} pillar={pillar} onClose={() => navigate(`/pijlers/${pillar.slug}`)} />
      )}
    </main>
  );
}
