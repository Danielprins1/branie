/** Naar een ander pad binnen de site, zonder de pagina te herladen. */
export function navigateTo(path) {
  window.history.pushState(null, '', path);
  window.dispatchEvent(new Event('branie:navigate'));
}
