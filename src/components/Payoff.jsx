import { brand } from '../config/site.js';

/**
 * De pay-off in handschrift. Voorlopig tekst in een scriptlettertype,
 * onthuld met een zachte "schrijf"-masker (CSS-variabele --reveal).
 *
 * Later een echte SVG-schrijfanimatie? Vervang de inhoud door een inline
 * <svg> met <path>-elementen en animeer in IntroAnimation.jsx de
 * `stroke-dashoffset` van die paden in plaats van `--reveal`.
 * Houd de className "payoff" aan.
 */
export default function Payoff() {
  return <p className="payoff">{brand.payoff}</p>;
}
