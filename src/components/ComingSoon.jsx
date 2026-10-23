import { brand, comingSoon, wallItems } from '../config/site.js';
import PhotoWall from './PhotoWall.jsx';
import BrandLogo from './BrandLogo.jsx';

/**
 * 'In opbouw'-pagina: een grote, opgeplakte poster op de fotomuur.
 * Wanneer deze pagina getoond wordt, staat in src/config/site.js → launch.
 */
export default function ComingSoon() {
  // Hergebruik de muurobjecten, met de posities uit comingSoon.wall.
  const items = comingSoon.wall
    .map(({ id, ...positions }) => {
      const item = wallItems.find((i) => i.id === id);
      return item && item.type !== 'cover' ? { ...item, desktop: undefined, mobile: undefined, ...positions } : null;
    })
    .filter(Boolean);

  return (
    <main className="soon">
      <div className="soon__wall">
        <PhotoWall items={items} />
      </div>

      <article className="soon-poster">
        <span className="tape soon-poster__tape soon-poster__tape--l" aria-hidden="true" />
        <span className="tape soon-poster__tape soon-poster__tape--r" aria-hidden="true" />

        {comingSoon.eyebrow && <p className="soon-poster__eyebrow">{comingSoon.eyebrow}</p>}
        <BrandLogo as="h1" className="soon-poster__logo" />
        <p className="soon-poster__payoff">{brand.payoff}</p>
        <span className="brush-line soon-poster__line" aria-hidden="true" />
        {comingSoon.heading && <h2 className="soon-poster__heading">{comingSoon.heading}</h2>}
        {comingSoon.text && <p className="soon-poster__text">{comingSoon.text}</p>}

        <p className="soon-poster__stamp">
          {comingSoon.stampSmall && <span className="soon-poster__stamp-small">{comingSoon.stampSmall}</span>}
          {comingSoon.stamp}
        </p>
      </article>

      <p className="soon__footer">
        {brand.name}: {brand.slogan}
      </p>
    </main>
  );
}
