import { useId, useState } from 'react';
import { preorder } from '../config/site.js';
import { getAttribution, withAttribution } from '../lib/tracking.js';
import { track } from '../lib/consent.js';

/**
 * Pre-orderknop. De link staat in src/config/site.js (preorder.url).
 * Zolang er geen URL is, is de knop duidelijk gemarkeerd als "binnenkort"
 * en kan er niets besteld worden.
 */
// Op de live site alleen de echte links; elders mogen de Stripe-testlinks.
const isProduction = __VERCEL_ENV__ === 'production';

export default function PreOrderButton() {
  const noteId = useId();
  const [nudge, setNudge] = useState(0);

  const attribution = getAttribution();
  const liveUrl = preorder.url;
  const testMode = !isProduction && !liveUrl && Boolean(preorder.testUrl);
  const href = withAttribution(liveUrl || (testMode ? preorder.testUrl : ''), attribution);

  if (href) {
    const external = preorder.openInNewTab;
    return (
      <div className="preorder-wrap">
        <a
          className="paper-btn preorder"
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          onClick={() => track('begin_checkout', { currency: 'EUR', value: 21.79, item_name: 'BRANIE (pre-sale)' })}
        >
          <span>{preorder.label}</span>
          <span className="preorder__arrow" aria-hidden="true">→</span>
          {testMode && <span className="preorder__badge">Test</span>}
        </a>
        <p className="preorder-note">{testMode ? preorder.testNote : preorder.liveNote}</p>
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
