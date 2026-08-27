import { demo } from '../mock-data.js';
import { getState, setState } from '../state.js';
import { showToast } from '../ui.js';

const validRoutes = ['home', 'payment', 'processing', 'status', 'error', 'recovery'];

/** Escapes mock copy before placing it in a generated template. */
function safe(value) { return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]); }

/** Creates the journey context card shared across the flow. */
function journeyCard() {
  const b = demo.booking;
  return `<aside class="card journey-card"><p class="card-kicker">Journey details (DEMO)</p><h2>${safe(b.train)}</h2><p class="route">${safe(b.from)} <span aria-hidden="true">→</span> ${safe(b.to)}</p><dl class="details-list"><div><dt>Travel</dt><dd>${safe(b.date)} · ${safe(b.class)}</dd></div><div><dt>Passenger</dt><dd>${safe(b.passenger)}</dd></div><div><dt>Fare</dt><dd>${safe(b.fare)}</dd></div><div><dt>Reference</dt><dd>${safe(b.id)}</dd></div></dl></aside>`;
}

/** Returns an accessible marker for a timeline state. */
function marker(state) { return { completed: '✓', current: '•', rac: 'R', wait: 'W', failed: '×', pending: '○' }[state] || '○'; }

/** Renders the core four-stage timeline from one selected scenario. */
function timeline(s) {
  const stages = [['payment', 'Payment', s.payment], ['booking', 'Booking status', s.booking], ['ticket', 'Ticket status', s.ticket], ['seat', 'Seat allotment', s.seat]];
  return `<section class="timeline-wrap" aria-label="Four-stage booking status"><p class="timeline-title">Your booking journey</p><ol class="status-timeline">${stages.map(([key, label, value]) => `<li class="timeline-step ${s.timeline[key]}"><span class="timeline-dot" aria-hidden="true">${marker(s.timeline[key])}</span><span class="timeline-content"><strong>${label}</strong><span>${safe(value)}</span><em class="sr-only">${safe(s.timeline[key])}</em></span></li>`).join('')}</ol></section>`;
}

/** Renders refund details only when the mock scenario needs money guidance. */
function moneyCard(s) {
  if (!s.refund?.applicable) return '';
  return `<section class="money-card"><div class="section-heading"><div><p class="card-kicker">Money update (DEMO)</p><h2>What happened to my money?</h2></div><span class="status-chip warning">${safe(s.refund.status)}</span></div><dl class="details-list"><div><dt>Amount</dt><dd>${safe(demo.booking.fare)}</dd></div><div><dt>Expected update</dt><dd>${safe(s.refund.expected)}</dd></div><div><dt>Reference</dt><dd>${safe(s.refund.reference)}</dd></div></dl><p>${safe(s.refund.note)}</p></section>`;
}

/** Renders the booking status outcome and its next decision. */
function statusScreen() {
  const s = demo.scenarios[getState().scenario];
  return `<div class="page-grid"><section><p class="eyebrow">Booking status (DEMO)</p><h1>${safe(s.heading)}</h1><p class="lead">${safe(s.message)}</p><section class="card status-card">${timeline(s)}<section class="action-card ${safe(s.tone)}"><span class="action-icon" aria-hidden="true">${safe(s.actionIcon)}</span><div><h2>What should I do now?</h2><p><strong>${safe(s.nextAction)}</strong></p><p>${safe(s.actionDescription)}</p></div></section><h2 class="section-title">Detailed status</h2><dl class="details-grid"><div><dt>Payment</dt><dd>${safe(s.payment)}</dd></div><div><dt>Booking</dt><dd>${safe(s.booking)}</dd></div><div><dt>Ticket</dt><dd>${safe(s.ticket)}</dd></div><div><dt>Seat</dt><dd>${safe(s.seat)}</dd></div></dl>${moneyCard(s)}<div class="flow-actions"><a class="button button-primary" href="#/recovery">${safe(s.cta)}</a><a class="button button-secondary" href="#/home">Try another outcome</a></div></section></section>${journeyCard()}</div>`;
}

/** Renders the clearly-labelled demo entry and scenario selector. */
function homeScreen() {
  const selected = getState().scenario;
  return `<div class="page-grid"><section><p class="eyebrow">Tatkal booking clarity</p><h1>Know exactly what happened to your booking.</h1><p class="lead">Payment, booking, ticket and seat updates in one clear timeline—so you never have to guess whether to wait, retry or seek help.</p><section class="card scenario-panel"><div class="section-heading"><div><p class="card-kicker">Prototype scenario selector</p><h2>Choose a simulated booking outcome</h2></div><span class="demo-tag">DEMO ONLY</span></div><p>These six outcomes demonstrate how the status timeline removes uncertainty. No booking, payment or personal data is processed.</p><div class="scenario-grid">${Object.values(demo.scenarios).map(s => `<button class="scenario-choice ${s.key === selected ? 'is-selected' : ''}" type="button" data-scenario="${safe(s.key)}"><span class="scenario-number">${safe(s.number)}</span><span><strong>${safe(s.shortTitle)}</strong><small>${safe(s.selectorText)}</small></span></button>`).join('')}</div><p class="choice-help">Select an outcome to continue to a mock payment confirmation.</p></section></section>${journeyCard()}</div>`;
}

/** Renders a payment review without collecting financial credentials. */
function paymentScreen() {
  const s = demo.scenarios[getState().scenario];
  return `<div class="page-grid"><section><p class="eyebrow">Step 1 of 2 · Payment (DEMO)</p><h1>Review before you simulate payment.</h1><p class="lead">No bank, UPI, card or personal payment details are collected in this independent prototype.</p><form class="card payment-card" id="payment-form"><fieldset><legend>Choose a demo payment method</legend>${demo.paymentMethods.map((m, index) => `<label class="payment-option"><input type="radio" name="payment-method" value="${safe(m.key)}" ${index === 0 ? 'checked' : ''}><span><strong>${safe(m.label)} (DEMO)</strong><small>${safe(m.description)}</small></span></label>`).join('')}</fieldset><dl class="details-list"><div><dt>Total fare</dt><dd>${safe(demo.booking.fare)}</dd></div><div><dt>Selected outcome</dt><dd>${safe(s.shortTitle)}</dd></div></dl><div class="flow-actions"><button class="button button-primary" type="submit">Simulate payment</button><a class="button button-secondary" href="#/home">Change outcome</a></div></form></section>${journeyCard()}</div>`;
}

/** Renders explicit waiting feedback while mock processing runs. */
function processingScreen() {
  return `<section class="processing-page"><p class="eyebrow">Step 2 of 2 · Processing</p><h1>Checking payment and booking status</h1><p class="lead">We are matching your mock payment response with the booking. Your progress is saved on this device.</p><section class="card processing-card"><span class="spinner" aria-hidden="true"></span><p id="processing-message" aria-live="polite">Connecting to the booking system…</p><p class="reference">Saved reference (DEMO): ${safe(demo.booking.id)}</p><p id="slow-message" hidden>Taking longer than usual? Your booking details are saved. You can check recovery options now.</p><a class="button button-secondary" href="#/recovery">Need help while you wait?</a></section></section>`;
}

/** Renders a recovery screen that preserves and surfaces progress. */
function recoveryScreen() {
  const s = demo.scenarios[getState().scenario];
  const returnRoute = s.key === 'payment_error' ? 'error' : 'status';
  return `<div class="page-grid"><section><p class="eyebrow">Recovery centre (DEMO)</p><h1>Your journey details are still saved.</h1><p class="lead">You do not need to start again while the payment or seat status is being resolved.</p><section class="card"><h2>What should you do now?</h2><ol class="info-list"><li>Check the saved booking status before making another payment.</li><li>If money was debited, keep your bank transaction reference as evidence.</li><li>Wait for the outcome shown below before retrying.</li></ol><div class="recovery-warning"><strong>Do not make another payment yet.</strong><span>${safe(s.actionDescription)}</span></div><p class="reference">Saved booking reference (DEMO): ${safe(demo.booking.id)}</p><div class="flow-actions"><a class="button button-primary" href="#/${returnRoute}">Check saved status</a><button class="button button-secondary" type="button" data-copy-reference>Copy reference</button></div></section><section class="card support-card"><h2>Support information</h2><p>${safe(demo.support)}</p><a href="#/home">Back to prototype home</a></section></section>${journeyCard()}</div>`;
}

/** Renders the payment-specific error with ownership, evidence and timing. */
function errorScreen() {
  const s = demo.scenarios.payment_error;
  const e = demo.error;
  return `<div class="page-grid"><section><p class="eyebrow">Booking status · Needs attention (DEMO)</p><h1>${safe(e.title)}</h1><section class="card error-panel">${timeline(s)}<h2>What happened?</h2><dl class="details-list"><div><dt>What failed</dt><dd>${safe(e.failure)}</dd></div><div><dt>Who is resolving it</dt><dd>${safe(e.owner)}</dd></div><div><dt>Evidence to keep</dt><dd>${safe(e.evidence)}</dd></div><div><dt>What to do next</dt><dd>${safe(e.next)}</dd></div><div><dt>Expected time</dt><dd>${safe(e.time)}</dd></div></dl>${moneyCard(s)}<div class="flow-actions"><a class="button button-primary" href="#/recovery">See recovery options</a><a class="button button-secondary" href="#/home">Try another outcome</a></div></section></section>${journeyCard()}</div>`;
}

/** Adds the interactions used by a just-rendered screen. */
function bindEvents(route) {
  document.querySelectorAll('[data-scenario]').forEach(button => button.addEventListener('click', () => { setState({ scenario: button.dataset.scenario }); window.location.hash = '#/payment'; }));
  document.querySelector('#payment-form')?.addEventListener('submit', event => { event.preventDefault(); setState({ paymentMethod: new FormData(event.currentTarget).get('payment-method') }); window.location.hash = '#/processing'; });
  document.querySelector('[data-copy-reference]')?.addEventListener('click', copyReference);
  if (route === 'processing') simulateProcessing();
}

/** Copies the synthetic reference or exposes it in a toast as a fallback. */
async function copyReference() { try { await navigator.clipboard.writeText(demo.booking.id); showToast('Demo reference copied.'); } catch { showToast(`Demo reference: ${demo.booking.id}`); } }

/** Advances the pending screen to its selected mock outcome. */
function simulateProcessing() {
  window.setTimeout(() => { const message = document.querySelector('#processing-message'); if (message) message.textContent = 'Payment response received. Preparing your booking status…'; }, 1500);
  window.setTimeout(() => { const slow = document.querySelector('#slow-message'); if (slow) slow.hidden = false; }, 8000);
  window.setTimeout(() => { window.location.hash = getState().scenario === 'payment_error' ? '#/error' : '#/status'; }, 3200);
}

/** Mounts a valid hash screen and makes its landmark ready for keyboard users. */
export function renderRoute(requestedRoute) {
  const route = validRoutes.includes(requestedRoute) ? requestedRoute : 'home';
  const screens = { home: homeScreen, payment: paymentScreen, processing: processingScreen, status: statusScreen, error: errorScreen, recovery: recoveryScreen };
  const main = document.querySelector('#main-content');
  main.innerHTML = `<div class="page-shell">${screens[route]()}</div>`;
  setState({ route });
  bindEvents(route);
  main.focus();
}
