import { forwardRef } from 'react';
import { pillars, pillarsPage } from '../../config/pillars.js';
import { anyImage } from '../../lib/assets.js';
import ArticleRail from './ArticleRail.jsx';

/** De inhoud achter het papier: introductie, verhalen, volgende pijler. */
const PillarDetail = forwardRef(function PillarDetail({ pillar, index, onBack, onOpenArticle, onGoTo, inert }, ref) {
  const next = pillars[(index + 1) % pillars.length];

  return (
    <div className="pillar" ref={ref} inert={inert || undefined}>
      <div className="pillar__bar">
        <button type="button" className="pillar__back" onClick={onBack} aria-label="Terug naar de vijf pijlers">
          <span aria-hidden="true">←</span> {pillarsPage.backLabel}
        </button>
        <span className="pillar__count" aria-hidden="true">
          {String(index + 1).padStart(2, '0')} / {String(pillars.length).padStart(2, '0')}
        </span>
      </div>

      <article className="pillar__intro" aria-labelledby="pillar-title">
        <div className="pillar__text">
          <p className="pillar__eyebrow">Pijler {String(index + 1).padStart(2, '0')}</p>
          <h1 className="pillar__title" id="pillar-title" tabIndex={-1}>
            {pillar.title}
          </h1>
          <p className="pillar__subtitle">{pillar.subtitle}</p>
          <span className="brush-line" aria-hidden="true" />
          {pillar.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="pillar__lede">
              {paragraph}
            </p>
          ))}
        </div>
        <figure className="pillar__figure">
          <span className="tape pillar__tape" aria-hidden="true" />
          <img src={anyImage(pillar.introImage ?? pillar.image)} alt="" decoding="async" />
        </figure>
      </article>

      <ArticleRail pillar={pillar} heading={pillarsPage.articlesHeading} onOpenArticle={onOpenArticle} />

      <nav className="pillar__next" aria-label="Volgende pijler">
        <a
          href={`/pijlers/${next.slug}`}
          onClick={(event) => {
            event.preventDefault();
            onGoTo(next.slug);
          }}
        >
          <span className="pillar__next-label">Volgende pijler</span>
          <span className="pillar__next-title">
            {next.title} <span aria-hidden="true">→</span>
          </span>
        </a>
      </nav>
    </div>
  );
});

export default PillarDetail;
