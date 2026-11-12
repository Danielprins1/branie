import gsap from 'gsap';
import { brand } from '../config/site.js';
import { faq } from '../config/faq.js';
import { brandAsset } from './assets.js';

/**
 * De opmaak van het rolluik met de graffiti. Wordt twee keer gebruikt:
 * bovenaan de FAQ-pagina en als overgang ernaartoe (shutterDown).
 */
export function shutterMarkup() {
  // veilig in een style-attribuut zetten (het logo kan een data-adres zijn)
  const css = (url) => `--logo-url:url(&quot;${String(url).replace(/&/g, '&amp;').replace(/"/g, '%22')}&quot;)`;
  const word = brandAsset(brand.logoWord) ?? brandAsset(brand.logo);
  const star = brandAsset(brand.logoStar);
  return `
    <div class="shutter__slats"></div>
    <div class="shutter__paint">
      <span class="shutter__small">${faq.shutter.small}</span>
      <span class="shutter__logo" style="aspect-ratio:${brand.logoAspect}">
        <span class="shutter__logo-layer" style="${css(word)}"></span>
        ${star ? `<span class="shutter__logo-layer" style="${css(star)}"></span>` : ''}
        <span class="shutter__drip" style="left:13%;height:9%"></span>
        <span class="shutter__drip" style="left:71%;height:14%"></span>
        <span class="shutter__drip" style="left:88%;height:7%"></span>
      </span>
      <span class="shutter__hint">${faq.shutter.hint}<span class="shutter__arrow">↓</span></span>
    </div>
    <div class="shutter__lines"></div>
    <div class="shutter__bar"></div>
  `;
}

/**
 * Het rolluik zakt over de huidige pagina. Als het dicht is, wisselt de
 * pagina; op de FAQ-pagina hangt hetzelfde rolluik en dat neemt het over.
 *
 * @param {Function} navigate  wisselt naar de nieuwe pagina
 */
export function shutterDown(navigate) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    navigate();
    return;
  }
  const overlay = document.createElement('div');
  overlay.className = 'shutter shutter--overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = shutterMarkup();
  document.body.appendChild(overlay);
  gsap
    .timeline()
    .fromTo(overlay, { yPercent: -102 }, { yPercent: 0, duration: 0.75, ease: 'power2.in' })
    // het luik stuitert even na op de grond
    .to(overlay, { yPercent: -1.6, duration: 0.09, ease: 'power1.out' })
    .to(overlay, { yPercent: 0, duration: 0.12, ease: 'power1.in' })
    .add(navigate)
    // twee beeldjes wachten tot de nieuwe pagina (met eigen rolluik) staat
    .add(() => requestAnimationFrame(() => requestAnimationFrame(() => overlay.remove())), '+=0.05');
}
