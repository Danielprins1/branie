import { forwardRef } from 'react';
import { cover, magazine } from '../config/site.js';
import MagazineCover from './MagazineCover.jsx';
import PreOrderButton from './PreOrderButton.jsx';
import Asterisk from './Asterisk.jsx';

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
          <p className="magazine-section__eyebrow" data-reveal>
            {magazine.eyebrow}
          </p>
          <h2 id="magazine-title" className="magazine-section__title" data-reveal>
            {magazine.heading}
            <Asterisk className="magazine-section__asterisk" />
          </h2>
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
        </div>
      </div>
    </section>
  );
});

export default MagazineSection;
