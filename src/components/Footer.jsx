import { brand } from '../config/site.js';
import { sales } from '../config/sales.js';
import { navigateTo } from '../lib/navigate.js';
import { cameraFlash } from '../lib/flash.js';
import { shutterDown } from '../lib/shutter.js';
import Asterisk from './Asterisk.jsx';
import BrandLogo from './BrandLogo.jsx';
import PreOrderButton from './PreOrderButton.jsx';

const plainClick = (event) => event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0;
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Interne link: wisselt zonder herladen, eventueel met een eigen overgang. */
const internal = (path, transition) => (event) => {
  if (plainClick(event)) return;
  event.preventDefault();
  const run = () => {
    navigateTo(path);
    window.scrollTo(0, 0);
  };
  if (transition) transition(run);
  else run();
};

/** Naar de magazinesectie (pre-order) op de homepage. */
const toMagazine = (event) => {
  if (plainClick(event)) return;
  event.preventDefault();
  const scroll = () => document.getElementById('magazine')?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth' });
  if (window.location.pathname === '/') {
    scroll();
    return;
  }
  navigateTo('/');
  setTimeout(() => {
    const top = document.getElementById('magazine')?.getBoundingClientRect().top ?? 0;
    window.scrollTo(0, top + window.scrollY);
  }, 60);
};

const TEXT = 'Een magazine over Amsterdam van 1950 tot nu, gemaakt door studenten van de Hogeschool van Amsterdam. Verschijnt op 14 januari 2027.';

/**
 * Footer: slogan met pre-orderknop, kolommen met links, kleine regel met de
 * voorwaarden en cookie-instellingen, en onderaan een groot BRANIE-woord.
 * Links en teksten staan hieronder; contactgegevens komen uit src/config/sales.js.
 */
export default function Footer() {
  const path = window.location.pathname;
  const here = (prefix) => (path === prefix || path.startsWith(`${prefix}/`) ? 'page' : undefined);
  const { contact } = sales;

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <p className="footer__quote">
            “Amsterdam verandert. De branie blijft.”
            <Asterisk className="footer__asterisk" />
          </p>
          {/* Op de homepage staat de pre-orderknop al direct erboven. */}
          {path !== '/' && (
            <div className="footer__cta">
              <PreOrderButton />
            </div>
          )}
        </div>

        <div className="footer__crosses" aria-hidden="true" />

        <div className="footer__grid">
          <div className="footer__about">
            <span className="footer__logo">
              <BrandLogo as="span" />
            </span>
            <p className="footer__payoff">{brand.payoff}</p>
            <p className="footer__text">{TEXT}</p>
          </div>

          <nav className="footer__col" aria-labelledby="footer-ontdek">
            <h2 className="footer__head" id="footer-ontdek">
              Ontdek
            </h2>
            <ul>
              <li>
                <a href="/#magazine" onClick={toMagazine}>
                  Het magazine
                </a>
              </li>
              <li>
                <a href="/pijlers" aria-current={here('/pijlers')} onClick={internal('/pijlers')}>
                  De pijlers
                </a>
              </li>
              <li>
                <a href="/over-ons" aria-current={here('/over-ons')} onClick={internal('/over-ons', here('/over-ons') ? null : cameraFlash)}>
                  Over ons
                </a>
              </li>
              <li>
                <a href="/faq" aria-current={here('/faq')} onClick={internal('/faq', here('/faq') ? null : shutterDown)}>
                  Veelgestelde vragen
                </a>
              </li>
            </ul>
          </nav>

          <nav className="footer__col" aria-labelledby="footer-samen">
            <h2 className="footer__head" id="footer-samen">
              Samenwerken
            </h2>
            <ul>
              <li>
                <a href="/sales" aria-current={here('/sales')} onClick={internal('/sales')}>
                  Adverteren
                </a>
              </li>
              <li>
                <a href={sales.pdf} download>
                  Saleskit (pdf)
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            </ul>
          </nav>

          <nav className="footer__col" aria-labelledby="footer-volg">
            <h2 className="footer__head" id="footer-volg">
              Volg ons
            </h2>
            <ul>
              {contact.socialLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
              <li className="footer__handle">{contact.socials}</li>
            </ul>
          </nav>
        </div>

        <div className="footer__bar">
          <p>
            © {new Date().getFullYear()} {brand.name} Magazine
          </p>
          <ul>
            <li>
              <a href="/voorwaarden" aria-current={here('/voorwaarden')} onClick={internal('/voorwaarden')}>
                Algemene voorwaarden
              </a>
            </li>
            <li>
              <button type="button" onClick={() => window.dispatchEvent(new Event('branie:cookies'))}>
                Cookie-instellingen
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Groot BRANIE-woord dat uit de grond groeit (versiering) */}
      <div className="footer__word" aria-hidden="true">
        <BrandLogo as="span" />
      </div>
    </footer>
  );
}
