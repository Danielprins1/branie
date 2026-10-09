import { cover } from '../config/site.js';
import { coverImage } from '../lib/assets.js';

/**
 * De magazinecover als fysiek object. Wordt op drie plekken gebruikt
 * (op de muur, tijdens de val en in de magazinesectie) en ziet er overal
 * exact hetzelfde uit, zodat de overgang naadloos is.
 * Alle maten zijn relatief aan de breedte van de cover (cqw).
 */
export default function MagazineCover({ priority = false }) {
  const loading = priority ? 'eager' : 'lazy';
  const fetchPriority = priority ? 'high' : 'auto';

  if (cover.image) {
    return (
      <div className="magazine">
        <img
          className="magazine__full"
          src={coverImage(cover.image)}
          alt={cover.alt}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          draggable="false"
        />
        <span className="magazine__gloss" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="magazine" role="img" aria-label={cover.alt}>
      <div className="magazine__photo">
        <img
          src={coverImage(cover.photo)}
          alt=""
          style={{ objectPosition: cover.photoPosition }}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          draggable="false"
        />
      </div>
      <div className="magazine__band" aria-hidden="true">
        <p className="magazine__meta">
          <span>{cover.issue}</span>
          <span>{cover.price}</span>
        </p>
        <p className="magazine__headline">
          {cover.headline} <span>{cover.headlineAccent}</span>
        </p>
        <ul className="magazine__lines">
          {cover.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
      <span className="magazine__gloss" aria-hidden="true" />
    </div>
  );
}
