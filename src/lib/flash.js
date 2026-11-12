import gsap from 'gsap';

/**
 * Cameraflits: het beeld slaat wit uit, op het felste moment wisselt de
 * pagina en daarna trekt het licht weer weg.
 *
 * @param {Function} navigate  wisselt naar de nieuwe pagina
 */
export function cameraFlash(navigate) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    navigate();
    return;
  }
  const flash = document.createElement('div');
  flash.className = 'camera-flash';
  flash.setAttribute('aria-hidden', 'true');
  document.body.appendChild(flash);
  gsap
    .timeline({ onComplete: () => flash.remove() })
    .fromTo(flash, { opacity: 0 }, { opacity: 1, duration: 0.09, ease: 'power4.in' })
    .add(navigate)
    .to(flash, { opacity: 0.85, duration: 0.12 })
    .to(flash, { opacity: 0, duration: 0.75, ease: 'power2.out' });
}
