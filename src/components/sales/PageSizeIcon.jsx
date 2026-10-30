/** Klein schema van het advertentieformaat (hele/halve/kwart pagina, spread). */
export default function PageSizeIcon({ size }) {
  if (size === 'spread') {
    return (
      <span className="page-icon page-icon--spread" aria-hidden="true">
        <span className="page-icon__page page-icon__page--fill" />
        <span className="page-icon__page page-icon__page--fill" />
      </span>
    );
  }
  return (
    <span className={`page-icon page-icon--${size}`} aria-hidden="true">
      <span className="page-icon__page">
        <span className="page-icon__ad" />
      </span>
    </span>
  );
}
