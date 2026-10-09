import { brand } from '../config/site.js';
import Asterisk from './Asterisk.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__quote">
        “Amsterdam verandert. De branie blijft.”
        <Asterisk className="footer__asterisk" />
      </p>
      <p className="footer__meta">
        {brand.name} · {brand.slogan} · © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
