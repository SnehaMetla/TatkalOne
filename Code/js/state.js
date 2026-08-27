const storageKey = 'tatkal-booking-clarity-demo';
const fallbackState = { scenario: 'confirmed', route: 'home', paymentMethod: 'upi' };

/** Returns the saved demo session, with safe defaults for a new visitor. */
export function getState() {
  try { return { ...fallbackState, ...JSON.parse(localStorage.getItem(storageKey) || '{}') }; } catch { return fallbackState; }
}

/** Merges an update into the saved demo session and returns its new value. */
export function setState(update) {
  const nextState = { ...getState(), ...update };
  localStorage.setItem(storageKey, JSON.stringify(nextState));
  return nextState;
}
