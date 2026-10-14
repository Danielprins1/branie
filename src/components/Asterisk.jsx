import { brand } from '../config/site.js';
import { brandAsset } from '../lib/assets.js';

export default function Asterisk({ className = '' }) {
  return (
    <img
      className={`asterisk ${className}`}
      src={brandAsset(brand.asterisk)}
      alt=""
      aria-hidden="true"
      draggable="false"
    />
  );
}
