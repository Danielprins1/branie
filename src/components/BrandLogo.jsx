import { brand } from '../config/site.js';
import Asterisk from './Asterisk.jsx';

/**
 * Het BRANIE-logo. Voorlopig gewone HTML-tekst.
 *
 * Officieel logo gebruiken? Zet het bestand in src/assets/brand/ en vervang
 * de <span className="brand-logo__word"> door:
 *   <img className="brand-logo__image" src={logoUrl} alt="BRANIE" />
 * De animatie (IntroAnimation) werkt op .brand-logo en blijft dus werken.
 */
export default function BrandLogo({ as: Tag = 'h1' }) {
  return (
    <Tag className="brand-logo">
      <span className="brand-logo__word">{brand.name}</span>
      {brand.showAsterisk && <Asterisk className="brand-logo__asterisk" />}
    </Tag>
  );
}
