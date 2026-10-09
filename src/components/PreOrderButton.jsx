import { useId, useState } from 'react';
import { preorder } from '../config/site.js';

/**
 * Pre-orderknop. De link staat in src/config/site.js (preorder.url).
 * Zolang er geen URL is, is de knop duidelijk gemarkeerd als "binnenkort"
 * en kan er niets besteld worden.
 */
export default function PreOrderButton() {
  const noteId = useId();
  const [nudge, setNudge] = useState(0);

  if (preorder.url) {
    const external = preorder.openInNewTab;
    return (
      <a
        className="preorder"
        href={preorder.url}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        <span>{preorder.label}</span>
        <span className="preorder__arrow" aria-hidden="true">→</span>
      </a>
    );
  }

  return (
    <div className="preorder-wrap">
      <button
        type="button"
        className="preorder preorder--soon"
        aria-disabled="true"
        aria-describedby={noteId}
        onClick={() => setNudge((n) => n + 1)}
      >
        <span>{preorder.label}</span>
        <span className="preorder__badge">{preorder.comingSoonBadge}</span>
      </button>
      <p id={noteId} key={nudge} className={`preorder-note${nudge ? ' is-nudged' : ''}`}>
        {preorder.comingSoonNote}
      </p>
    </div>
  );
}
