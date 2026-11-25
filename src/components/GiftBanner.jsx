import { useState } from 'react';
import { gift } from '../config/gift.js';
import { navigateTo } from '../lib/navigate.js';
import Asterisk from './Asterisk.jsx';

const KEY = 'branie-cadeau-banner';

const dismissed = () => {
  try {
    return sessionStorage.getItem(KEY) === 'weg';
  } catch {
    return false;
  }
};

/**
 * Tijdelijke banner bovenaan de homepage: "Nog een cadeau nodig? Geef BRANIE."
 * Uitzetten: `gift.banner.enabled` in src/config/gift.js.
 * Wie hem wegklikt, ziet hem niet meer tot het volgende bezoek.
 */
export default function GiftBanner() {
  const [hidden, setHidden] = useState(dismissed);
  if (!gift.banner.enabled || hidden) return null;

  const close = () => {
    try {
      sessionStorage.setItem(KEY, 'weg');
    } catch {
      // geen opslag: dan verdwijnt hij alleen nu
    }
    setHidden(true);
  };

  return (
    <aside className="gift-banner" aria-label="Cadeaubon">
      <a
        className="gift-banner__link"
        href="/cadeau"
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
          event.preventDefault();
          navigateTo('/cadeau');
          window.scrollTo(0, 0);
        }}
      >
        <Asterisk className="gift-banner__star" />
        <span>{gift.banner.text}</span>
        <span className="gift-banner__arrow" aria-hidden="true">
          →
        </span>
      </a>
      <button type="button" className="gift-banner__close" onClick={close} aria-label="Banner sluiten">
        <span aria-hidden="true">×</span>
      </button>
    </aside>
  );
}
