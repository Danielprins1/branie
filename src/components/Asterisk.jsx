import { asteriskRed } from '../lib/assets.js';

export default function Asterisk({ className = '' }) {
  return (
    <img
      className={`asterisk ${className}`}
      src={asteriskRed}
      alt=""
      aria-hidden="true"
      draggable="false"
    />
  );
}
