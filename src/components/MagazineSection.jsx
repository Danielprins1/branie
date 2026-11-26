import { forwardRef } from 'react';
import { cover, magazine } from '../config/site.js';
import MagazineCover from './MagazineCover.jsx';
import PreOrderButton from './PreOrderButton.jsx';
import BrandLogo from './BrandLogo.jsx';
import { tearAway } from '../lib/tearAway.js';
import { navigateTo } from '../lib/navigate.js';

/**
 * De magazinepresentatie. `targetRef` is de plek waar de vallende cover
 * landt (MagazineTransition meet deze plek live).
 */
const MagazineSection = forwardRef(function MagazineSection({ targetRef }, ref) {
  return (
    <section id="magazine" className="magazine-section" ref={ref} aria-labelledby="magazine-title" tabIndex={-1}>
      <div className="magazine-section__inner">
        <div className="magazine-section__visual">
          <div className="cover-target" ref={targetRef} data-rotation={cover.restingRotation}>
            <div className="cover-resting" style={{ rotate: `${cover.restingRotation}deg` }}>
              <div className="cover-frame">
                <MagazineCover />
              </div>
            </div>
          </div>
        </div>

        <div className="magazine-section__text">
          {magazine.eyebrow && (
            <p className="magazine-section__eyebrow" data-reveal>
              {magazine.eyebrow}
            </p>
          )}
          <div data-reveal>
            <BrandLogo as="h2" id="magazine-title" className="magazine-section__title" />
          </div>
          <p className="magazine-section__slogan" data-reveal>
            {magazine.slogan}
          </p>
          <span className="brush-line" aria-hidden="true" data-reveal />
          <p className="magazine-section__intro" data-reveal>
            {magazine.intro}
          </p>
          <p className="magazine-section__closing" data-reveal>
            {magazine.closing}
          </p>
          <div className="magazine-section__cta" data-reveal>
            <PreOrderButton />
          </div>
          <nav className="mag-more" aria-label="Meer van BRANIE">
            <a
              className="mag-tile mag-tile--gift"
              href="/cadeau"
              data-reveal
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
                event.preventDefault();
                navigateTo('/cadeau');
                window.scrollTo(0, 0);
              }}
            >
              <span className="mag-tile__eyebrow">Cadeaubon</span>
              <span className="mag-tile__title">Geef BRANIE cadeau</span>
              <span className="mag-tile__sub">Digitale bon, direct in je mail.</span>
              <span className="mag-tile__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a
              className="mag-tile mag-tile--pillars"
              href="/pijlers"
              data-reveal
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
                event.preventDefault();
                const rect = event.currentTarget.getBoundingClientRect();
                const y = event.clientY || rect.top + rect.height / 2;
                tearAway({ y, navigate: () => navigateTo('/pijlers') });
              }}
            >
              <span className="mag-tile__eyebrow">De pijlers</span>
              <span className="mag-tile__title">Scheur de stad open</span>
              <span className="mag-tile__sub">Ontdek de vijf pijlers van BRANIE.</span>
              <span className="mag-tile__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
});

export default MagazineSection;
