import { brand } from '../config/site.js';
import { brandAsset } from '../lib/assets.js';
import Asterisk from './Asterisk.jsx';

/**
 * Het BRANIE-logo. Het SVG-bestand (brand.logo in de config) wordt als
 * masker gebruikt, zodat de kleur per plek met CSS te kiezen is
 * (`color` op .brand-logo). Zonder logobestand wordt het gewone tekst.
 * De animatie (IntroAnimation) werkt op .brand-logo.
 */
export default function BrandLogo({ as: Tag = 'h1', className = '', id }) {
  const logoUrl = brandAsset(brand.logo);

  return (
    <Tag className={`brand-logo ${className}`.trim()} id={id}>
      {logoUrl ? (
        <>
          <span
            className="brand-logo__mark"
            style={{ '--logo-url': `url("${logoUrl}")`, aspectRatio: brand.logoAspect }}
            aria-hidden="true"
          />
          <span className="visually-hidden">{brand.name}</span>
        </>
      ) : (
        <span className="brand-logo__word">{brand.name}</span>
      )}
      {brand.showAsterisk && <Asterisk className="brand-logo__asterisk" />}
    </Tag>
  );
}
