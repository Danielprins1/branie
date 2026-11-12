import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { about, everyone } from '../config/about.js';
import { brand } from '../config/site.js';
import { teamImage } from '../lib/assets.js';
import { navigateTo } from '../lib/navigate.js';
import BrandLogo from '../components/BrandLogo.jsx';
import Asterisk from '../components/Asterisk.jsx';
import MagazineCover from '../components/MagazineCover.jsx';
import PreOrderButton from '../components/PreOrderButton.jsx';
import Footer from '../components/Footer.jsx';

gsap.registerPlugin(ScrollTrigger);

/** Vaste 'willekeur' per polaroid, zodat de stapel er elke keer hetzelfde uitziet. */
const rand = (i, salt) => {
  const x = Math.sin((i + 1) * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x); // 0..1
};
const spreadOf = (i, salt, range) => (rand(i, salt) - 0.5) * 2 * range;

const POLAROID_RATIO = 1.5; // hoogte / breedte

/** Verdeelt n polaroids over een vlak van w × h: zo groot mogelijk. */
function layout(n, w, h) {
  let best = { size: 0, cols: 1, rows: n };
  for (let cols = 3; cols <= 13; cols += 1) {
    const rows = Math.ceil(n / cols);
    const size = Math.min((w / cols) * 0.86, ((h / rows) * 0.9) / POLAROID_RATIO);
    if (size > best.size) best = { size, cols, rows };
  }
  return best;
}

function Polaroid({ member, className = '', ...rest }) {
  return (
    <figure className={`polaroid ${className}`} {...rest}>
      <img src={teamImage(member.photo)} alt={member.name} width="520" height="780" draggable="false" />
      {member.caption && <figcaption className="polaroid__caption">{member.caption}</figcaption>}
    </figure>
  );
}

function internalLink(path) {
  return (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    navigateTo(path);
    window.scrollTo(0, 0);
  };
}

/**
 * Over ons (/over-ons). Bovenaan ligt een stapel polaroids die uitwaaiert
 * als je scrolt; daaronder over BRANIE, de teams en het magazine.
 * Teksten en teamindeling: src/config/about.js.
 */
export default function AboutPage() {
  const rootRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    const prev = document.title;
    document.title = `Over ons · ${brand.name}`;
    window.scrollTo(0, 0);
    return () => {
      document.title = prev;
    };
  }, []);

  useLayoutEffect(() => {
    const table = tableRef.current;
    const cards = gsap.utils.toArray('.about__pile .polaroid', table);
    const n = cards.length;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let slots = [];
    let pile = [];

    // Waar ligt elke polaroid: op de stapel (pile) en uitgespreid (slots).
    const measure = () => {
      const w = table.clientWidth;
      const h = table.clientHeight;
      const { size, cols, rows } = layout(n, w, h);
      const cellW = w / cols;
      const cellH = h / rows;
      const pileScale = Math.min((h * 0.72) / (size * POLAROID_RATIO), (w * 0.62) / size, 3.2);
      table.style.setProperty('--polaroid-w', `${size}px`);
      slots = cards.map((_, i) => {
        const row = Math.floor(i / cols);
        const inRow = row === rows - 1 ? n - cols * (rows - 1) : cols;
        const offset = ((cols - inRow) * cellW) / 2; // laatste rij in het midden
        return {
          x: offset + (i % cols) * cellW + cellW / 2 - w / 2 + spreadOf(i, 1, cellW * 0.05),
          y: row * cellH + cellH / 2 - h / 2 + spreadOf(i, 2, cellH * 0.04),
          rotation: spreadOf(i, 3, 7),
        };
      });
      pile = cards.map((_, i) => ({
        x: spreadOf(i, 4, size * pileScale * 0.1),
        y: spreadOf(i, 5, size * pileScale * 0.07),
        rotation: spreadOf(i, 6, 15),
        scale: pileScale,
      }));
    };

    const ctx = gsap.context(() => {
      measure();
      if (reduce) {
        // Geen beweging: meteen uitgespreid.
        cards.forEach((card, i) => gsap.set(card, { xPercent: -50, yPercent: -50, ...slots[i], scale: 1 }));
        return;
      }
      ScrollTrigger.addEventListener('refreshInit', measure);
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: '.about__stage',
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      cards.forEach((card, i) => {
        // De bovenste van de stapel (laatste in de DOM) gaat als eerste.
        const order = n - 1 - i;
        tl.fromTo(
          card,
          {
            xPercent: -50,
            yPercent: -50,
            x: () => pile[i].x,
            y: () => pile[i].y,
            rotation: () => pile[i].rotation,
            scale: () => pile[i].scale,
          },
          { x: () => slots[i].x, y: () => slots[i].y, rotation: () => slots[i].rotation, scale: 1, duration: 1 },
          order * 0.045,
        );
      });
      tl.to('.about__hint', { autoAlpha: 0, duration: 0.3 }, 0);
      // even stil blijven liggen voordat de pagina verder scrolt
      tl.to({}, { duration: 0.35 });

      // De stapel 'ontwikkelt' na de flits, zoals een echte polaroid.
      gsap.fromTo(
        '.about__pile',
        { filter: 'brightness(2.4) saturate(0.2)' },
        { filter: 'brightness(1) saturate(1)', duration: 1.4, ease: 'power2.out', clearProps: 'filter' },
      );

      // Teksten en teams schuiven rustig in beeld.
      gsap.utils.toArray('.about__reveal').forEach((el) => {
        gsap.from(el, {
          y: 36,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        });
      });
      gsap.utils.toArray('.about__team').forEach((team) => {
        gsap.from(team.querySelectorAll('.polaroid'), {
          y: 60,
          rotation: (i) => spreadOf(i, 9, 18),
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: team, start: 'top 78%', once: true },
        });
      });
    }, rootRef);

    const onResize = () => {
      if (reduce) {
        measure();
        cards.forEach((card, i) => gsap.set(card, { ...slots[i] }));
      }
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      ScrollTrigger.removeEventListener('refreshInit', measure);
      ctx.revert();
    };
  }, []);

  const { who, magazine } = about;

  return (
    <main className="about" ref={rootRef}>
      <a className="about__logo" href="/" onClick={internalLink('/')} aria-label={`${brand.name}: naar de homepage`}>
        <BrandLogo as="span" />
      </a>

      <section className="about__stage" aria-labelledby="about-title">
        <h1 className="about__title" id="about-title">
          <span className="about__title-small">{about.title}</span>
          <BrandLogo as="span" className="about__title-logo" />
        </h1>
        {/* De stapel is decoratie: de namen staan verderop bij de teams. */}
        <div className="about__table" ref={tableRef} aria-hidden="true">
          <div className="about__pile">
            {everyone.map((member, i) => (
              <Polaroid key={member.photo} member={member} style={{ zIndex: i + 1 }} />
            ))}
          </div>
        </div>
        <p className="about__hint" aria-hidden="true">
          {about.scrollHint}
        </p>
      </section>

      <section className="about__block about__reveal">
        <p className="about__script">{who.script}</p>
        <h2 className="about__heading">
          {who.heading}
          <Asterisk className="about__asterisk" />
        </h2>
        {who.body.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </section>

      <section className="about__teams" aria-label={about.teamsHeading}>
        {about.teams.map((team) => (
          <div className={`about__team about__team--${team.tone}`} key={team.name}>
            <h2 className="about__team-name">{team.name}</h2>
            <ul className="about__members">
              {team.members.map((member, i) => (
                <li key={member.photo} style={{ '--tilt': `${spreadOf(i, team.name.length, 4)}deg` }}>
                  <Polaroid member={member} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <dl className="about__facts about__reveal">
        {about.facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <section className="about__magazine">
        <div className="about__magazine-cover about__reveal">
          <div className="cover-frame">
            <MagazineCover />
          </div>
        </div>
        <div className="about__magazine-text about__reveal">
          <p className="about__script">{magazine.script}</p>
          <h2 className="about__heading">{magazine.heading}</h2>
          <p className="about__lead">{magazine.lead}</p>
          {magazine.body.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <div className="about__cta">
            <PreOrderButton />
          </div>
          <a className="about__link" href="/pijlers" onClick={internalLink('/pijlers')}>
            {magazine.pillarsLink} <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
