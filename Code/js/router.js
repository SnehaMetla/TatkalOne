import { renderRoute } from './flows/booking-flow.js';

/** Renders the initial hash and every later hash change. */
export function initRouter() {
  window.addEventListener('hashchange', () => renderRoute((window.location.hash || '#/home').replace(/^#\//, '')));
  renderRoute((window.location.hash || '#/home').replace(/^#\//, ''));
}
