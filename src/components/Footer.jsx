import { brand } from '../config/site.js';
import Asterisk from './Asterisk.jsx';
import { navigateTo } from '../lib/navigate.js';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__quote">
        “Amsterdam verandert. De branie blijft.”
        <Asterisk className="footer__asterisk" />
      </p>
      <a
        className="footer__sales"
        href="/sales"
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
          event.preventDefault();
          navigateTo('/sales');
          window.scrollTo(0, 0);
        }}
      >
        Adverteren in BRANIE? Bekijk de saleskit <span aria-hidden="true">→</span>
      </a>
      <p className="footer__meta">
        {brand.name} · {brand.slogan} · © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
