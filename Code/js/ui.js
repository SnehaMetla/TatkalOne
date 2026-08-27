/** Fetches a reusable HTML component and inserts it into a target element. */
export async function loadComponent(target, path) {
  const element = document.querySelector(target);
  if (!element) return;
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Could not load ${path}`);
  element.innerHTML = await response.text();
  element.querySelector('[data-dismiss-demo]')?.addEventListener('click', () => { element.hidden = true; });
}

/** Announces a short message without using a disruptive browser alert. */
export function showToast(message) {
  const region = document.querySelector('#toast-region');
  if (!region) return;
  region.textContent = message;
  region.classList.add('is-visible');
  window.setTimeout(() => region.classList.remove('is-visible'), 2800);
}
