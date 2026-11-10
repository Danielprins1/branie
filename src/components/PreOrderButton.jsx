import { useId, useState } from 'react';
import { preorder } from '../config/site.js';

/**
 * Pre-orderknop. De link staat in src/config/site.js (preorder.url).
 * Zolang er geen URL is, is de knop duidelijk gemarkeerd als "binnenkort"
 * en kan er niets besteld worden.
 */
// Op de live site alleen de echte link; elders mag de Stripe-testlink.
const isProduction = __VERCEL_ENV__ === 'production';
const testMode = !isProduction && !preorder.url && Boolean(preorder.testUrl);
const href = preorder.url || (testMode ? preorder.testUrl : '');

export default function PreOrderButton() {
  const noteId = useId();
  const [nudge, setNudge] = useState(0);

  if (href) {
    const external = preorder.openInNewTab;
    return (
      <div className="preorder-wrap">
        <a
          className="paper-btn preorder"
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          <span>{preorder.label}</span>
          <span className="preorder__arrow" aria-hidden="true">→</span>
          {testMode && <span className="preorder__badge">Test</span>}
        </a>
        {testMode && <p className="preorder-note">{preorder.testNote}</p>}
      </div>
    );
  }

  return (
    <div className="preorder-wrap">
      <button
        type="button"
        className="paper-btn preorder preorder--soon"
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
