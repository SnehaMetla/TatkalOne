import { demo } from './mock-data.js';

const storageKey = 'tatkal_clarity_demo_state';

/* =========================================================
   STATE
   ========================================================= */

function getState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {
      scenario: 'confirmed',
      step: 'welcome'
    };
  } catch {
    return {
      scenario: 'confirmed',
      step: 'welcome'
    };
  }
}

function setState(update) {
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      ...getState(),
      ...update
    })
  );
}

function getScenario() {
  const state = getState();

  return (
    demo.scenarios[state.scenario] ||
    demo.scenarios.confirmed
  );
}


/* Returns the next internal mock outcome for a new demo booking. */
function getNextScenario() {

  const scenarioKeys =
    Object.keys(demo.scenarios);

  const state =
    getState();

  const nextIndex =
    ((state.scenarioIndex ?? -1) + 1) %
    scenarioKeys.length;

  return {
    key: scenarioKeys[nextIndex],
    index: nextIndex
  };
}


/* =========================================================
   USER BOOKING DATA
   ========================================================= */

function getUserBooking() {
  const state = getState();

  return state.booking || {};
}


function getCurrentBooking() {
  const userBooking = getUserBooking();

  return {
    ...demo.booking,
    ...userBooking
  };
}


function formatJourneyDate(dateValue) {
  if (!dateValue) {
    return '';
  }

  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function addDaysToDate(dateValue, days) {
  if (!dateValue) {
    return '';
  }

  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  date.setDate(date.getDate() + days);

  return date.toISOString().slice(0, 10);
}


/* =========================================================
   HELPERS
   ========================================================= */

function statusClass(key) {
  if (key === 'confirmed') {
    return 'success';
  }

  if (key === 'rac') {
    return 'rac';
  }

  if (key === 'wait' || key === 'wait_rac') {
    return 'wait';
  }

  return 'error';
}

function bookingSummary() {
  return `
    <section class="booking-summary">

      <div class="summary-row">
        <span>Train</span>
        <strong>${getCurrentBooking().train}</strong>
      </div>

      <div class="summary-row">
        <span>From</span>
        <strong>${getCurrentBooking().from}</strong>
      </div>

      <div class="summary-row">
        <span>To</span>
        <strong>${getCurrentBooking().to}</strong>
      </div>

      <div class="summary-row">
        <span>Date</span>
        <strong>${getCurrentBooking().date}</strong>
      </div>

      <div class="summary-row">
        <span>Class</span>
        <strong>${getCurrentBooking().class}</strong>
      </div>

    </section>
  `;
}


/* =========================================================
   SCREEN 1 — WELCOME / LANGUAGE
   ========================================================= */

function renderWelcome() {
  return `
    <div class="welcome-page">

      <div class="welcome-background">

        <div class="fake-irctc-header">

          <div class="fake-header-brand">
            <div class="brand-emblem" aria-hidden="true">
              TO
            </div>

            <div>
              <strong>TatkalOne Booking</strong>
              <small>Independent booking prototype</small>
            </div>
          </div>

          <nav class="fake-header-nav">
            <span>LOGIN</span>
            <span>REGISTER</span>
            <span>HELP</span>
            <span>CONTACT</span>
          </nav>

        </div>


        <div class="fake-booking-area">

          <div class="fake-booking-tabs">
            <div class="fake-tab">BOOK TICKET</div>
            <div class="fake-tab">PNR STATUS</div>
            <div class="fake-tab">CHARTS / VACANCY</div>
          </div>


          <section class="fake-search-panel">

            <label class="fake-field">
              <strong>From</strong>
              <span>Station</span>
            </label>

            <label class="fake-field">
              <strong>To</strong>
              <span>Station</span>
            </label>

            <label class="fake-field">
              <strong>Date</strong>
              <span>Select journey date</span>
            </label>

            <button type="button">
              SEARCH
            </button>

          </section>


          <div class="fake-content-row">

            <article class="fake-content-card">
              <h2>Popular Services</h2>
              <p>Train booking and passenger services</p>
            </article>

            <article class="fake-content-card">
              <h2>Information</h2>
              <p>Journey and reservation information</p>
            </article>

          </div>

        </div>

      </div>


      <div class="welcome-overlay">

        <section
          class="welcome-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-title">

          <header class="welcome-modal-header">
            <strong>Select Language</strong>

            <button
              type="button"
              class="icon-button"
              aria-label="Close">
              ×
            </button>
          </header>


          <div class="welcome-modal-body">

            <div class="welcome-symbol">
              <div
                class="welcome-symbol-inner"
                aria-hidden="true">
                ✓
              </div>
            </div>


            <h1 id="welcome-title">
              Welcome
            </h1>

            <h2>
              Choose your language
            </h2>


            <div class="welcome-language-text">

              <p>
                Please select your preferred language
                to continue.
              </p>

              <strong>
                अपनी पसंदीदा भाषा चुनें
              </strong>

            </div>


            <div class="welcome-divider"></div>


            <div class="language-actions">

              <button
                type="button"
                class="button button-primary language-button"
                data-action="select-language">
                English
              </button>

              <button
                type="button"
                class="button button-secondary language-button"
                data-action="select-language">
                हिन्दी
              </button>

            </div>

          </div>

        </section>

      </div>

    </div>
  `;
}


/* =========================================================
   SCREEN 2 — IRCTC HOME
   ========================================================= */

function renderHome() {
  return `
    <div class="irctc-page home-screen">

      <div class="booking-container home-screen">


        <!-- BETA / INFORMATION BANNER -->

        <section class="beta-banner">

          <div class="beta-badge">
            NEW
          </div>

          <div class="beta-message">
            Experience the new railway ticket
            booking interface.
          </div>

          <div class="beta-actions">

            <button
              type="button"
              class="button"
              data-action="dismiss-banner">
              Continue
            </button>

            <button
              type="button"
              class="beta-close"
              aria-label="Close">
              ×
            </button>

          </div>

        </section>


        <!-- MAIN CONTENT -->

        <div class="home-content-grid">


          <!-- LEFT COLUMN -->

          <main class="home-booking-column">


            <!-- QUICK ACTIONS -->

            <div class="quick-actions-grid">

              <button
                type="button"
                class="quick-action">

                <span
                  class="quick-action-icon"
                  aria-hidden="true">
                  P
                </span>

                <strong>
                  PNR STATUS
                </strong>

              </button>


              <button
                type="button"
                class="quick-action">

                <span
                  class="quick-action-icon"
                  aria-hidden="true">
                  C
                </span>

                <strong>
                  CHARTS / VACANCY
                </strong>

              </button>


              <button
                type="button"
                class="quick-action">

                <span
                  class="quick-action-icon"
                  aria-hidden="true">
                  R
                </span>

                <strong>
                  REFUND STATUS
                </strong>

              </button>


              <button
                type="button"
                class="quick-action">

                <span
                  class="quick-action-icon"
                  aria-hidden="true">
                  ★
                </span>

                <strong>
                  RE-BOOK FAVOURITE JOURNEY
                </strong>

              </button>

            </div>


            <!-- BOOK TICKET -->

            <section class="home-booking-panel">

              <h1 class="home-booking-title">
                BOOK TICKET
              </h1>


              <div class="home-search-grid">


                <label class="home-field">

                  <span>
                    From
                  </span>

                  <input
                    type="text"
                    id="from-station"
                    aria-label="From station"
                    placeholder="Enter departure station"
                    value="${getUserBooking().from || ''}"
                    autocomplete="off">

                </label>


                <button
                  type="button"
                  class="home-swap"
                  aria-label="Swap stations"
                  data-action="swap-stations">

                  ⇄

                </button>


                <label class="home-field">

                  <span>
                    To
                  </span>

                  <input
                    type="text"
                    id="to-station"
                    aria-label="To station"
                    placeholder="Enter arrival station"
                    value="${getUserBooking().to || ''}"
                    autocomplete="off">

                </label>


                <label class="home-field">

                  <span>
                    Date
                  </span>

                  <input
                    type="date"
                    id="journey-date"
                    aria-label="Journey date"
                    value="${getUserBooking().dateISO || ''}">

                </label>


                <label class="home-field">

                  <span>
                    Class
                  </span>

                  <select
                    id="journey-class"
                    aria-label="Journey class">

                    <option value="SL"
                      ${getUserBooking().classCode === 'SL' ? 'selected' : ''}>
                      Sleeper (SL)
                    </option>

                    <option value="3A"
                      ${getUserBooking().classCode === '3A' ? 'selected' : ''}>
                      AC 3 Tier (3A)
                    </option>

                    <option value="2A"
                      ${getUserBooking().classCode === '2A' ? 'selected' : ''}>
                      AC 2 Tier (2A)
                    </option>

                    <option value="1A"
                      ${getUserBooking().classCode === '1A' ? 'selected' : ''}>
                      AC First Class (1A)
                    </option>

                    <option value="CC"
                      ${getUserBooking().classCode === 'CC' ? 'selected' : ''}>
                      AC Chair Car (CC)
                    </option>

                  </select>

                </label>


              </div>


              <div class="home-booking-options">

                <label class="checkbox-option">

                  <input
                    type="checkbox">

                  <span>
                    Person with Disability
                  </span>

                </label>


                <label class="checkbox-option">

                  <input
                    type="checkbox">

                  <span>
                    Flexible with Date
                  </span>

                </label>


                <label class="checkbox-option">

                  <input
                    type="checkbox">

                  <span>
                    Train with Available Berth
                  </span>

                </label>


                <label class="checkbox-option">

                  <input
                    type="checkbox">

                  <span>
                    Railway Pass Concession
                  </span>

                </label>

              </div>


              <div class="home-search-actions">

                <button
                  type="button"
                  class="button"
                  data-action="search">

                  Search

                </button>

              </div>

            </section>

          </main>


          <!-- RIGHT COLUMN -->

          <aside class="home-side-column">


            <!-- LAST TRANSACTION -->

            <section class="home-info-card">

              <header class="home-info-header">

                <h2>
                  Last Transaction Detail
                </h2>

                <button
                  type="button"
                  class="home-link-button">
                  View All
                </button>

              </header>


              <div class="home-table">

                <div class="home-table-row home-table-head">

                  <span>
                    Transaction
                  </span>

                  <span>
                    From
                  </span>

                  <span>
                    To
                  </span>

                  <span>
                    Status
                  </span>

                </div>


                <div class="home-table-row">

                  <strong>
                    ${getCurrentBooking().train}
                  </strong>

                  <span>
                    ${getCurrentBooking().from}
                  </span>

                  <span>
                    ${getCurrentBooking().to}
                  </span>

                  <strong class="booking-success">
                    Successful
                  </strong>

                </div>

              </div>

            </section>


            <!-- UPCOMING JOURNEY -->

            <section class="home-info-card">

              <header class="home-info-header">

                <h2>
                  Upcoming Journey
                </h2>

                <button
                  type="button"
                  class="home-link-button">
                  View All
                </button>

              </header>


              <div class="home-table">

                <div class="home-table-row home-table-head">

                  <span>
                    Train
                  </span>

                  <span>
                    From
                  </span>

                  <span>
                    To
                  </span>

                  <span>
                    Date
                  </span>

                </div>


                <div class="home-table-row">

                  <strong>
                    ${getCurrentBooking().train}
                  </strong>

                  <span>
                    ${getCurrentBooking().from}
                  </span>

                  <span>
                    ${getCurrentBooking().to}
                  </span>

                  <strong>
                    ${getCurrentBooking().date}
                  </strong>

                </div>

              </div>

            </section>


          </aside>

        </div>


        <p class="prototype-disclosure">
          Prototype interface — no real railway
          account or booking data is used.
        </p>

      </div>

    </div>
  `;
}


/* =========================================================
   SCREEN 3 — IRCTC TRAIN RESULTS
   ========================================================= */

function renderSearch() {

  const booking = getCurrentBooking();

  const fare =
    String(booking.fare || '1,245')
      .replace('₹', '')
      .trim();

  const from =
    booking.from ||
    'SECUNDERABAD JN';

  const to =
    booking.to ||
    'VIJAYAWADA JN';

  const date =
    booking.date ||
    'Thu, 27 Aug 2026';

  return `
    <div class="train-results-page">


      <!-- =================================================
           RESULTS SUMMARY
           ================================================= -->

      <section class="train-results-summary">

        <div class="results-summary-text">

          <span class="results-count">
            29 Results for
          </span>

          <strong>
            ${from}
          </strong>

          <span class="results-arrow">
            ➜
          </span>

          <strong>
            ${to}
          </strong>

          <span class="results-separator">
            |
          </span>

          <strong>
            ${date}
          </strong>

          <span>
            For Quota
          </span>

          <strong>
            | Tatkal
          </strong>

        </div>


        <div class="results-day-controls">

          <button
            type="button"
            class="results-day-button">

            ‹ Previous Day

          </button>


          <button
            type="button"
            class="results-day-button">

            Next Day ›

          </button>

        </div>

      </section>


      <!-- =================================================
           RESULTS CONTENT
           ================================================= -->

      <div class="train-results-layout">


        <!-- =================================================
             LEFT FILTERS
             ================================================= -->

        <aside class="train-filter-panel">


          <div class="filter-panel-heading">

            <strong>
              Refine Results
            </strong>

            <button
              type="button"
              class="remove-filter-button">

              Remove Filter

            </button>

          </div>


          <!-- JOURNEY CLASS -->

          <section class="results-filter-section">

            <div class="results-filter-heading">

              <strong>
                JOURNEY CLASS
              </strong>

              <button
                type="button"
                class="filter-select-all">

                Select All

              </button>

              <span aria-hidden="true">
                ⌃
              </span>

            </div>


            <div class="results-checkbox-grid">

              <label>
                <input type="checkbox" checked>
                <span>AC First Class</span>
              </label>


              <label>
                <input type="checkbox" checked>
                <span>AC 2 Tier (2A)</span>
              </label>


              <label>
                <input type="checkbox" checked>
                <span>Second Sitting</span>
              </label>


              <label>
                <input type="checkbox" checked>
                <span>AC 3 Tier (3A)</span>
              </label>


              <label>
                <input type="checkbox" checked>
                <span>AC 3 Economy</span>
              </label>


              <label>
                <input type="checkbox" checked>
                <span>AC Chair car (CC)</span>
              </label>


              <label>
                <input type="checkbox" checked>
                <span>Exec. Chair Car (EC)</span>
              </label>


              <label>
                <input type="checkbox" checked>
                <span>Sleeper (SL)</span>
              </label>

            </div>

          </section>


          <!-- TRAIN TYPE -->

          <section class="results-filter-section">

            <div class="results-filter-heading">

              <strong>
                TRAIN TYPE
              </strong>

              <button
                type="button"
                class="filter-select-all">

                Select All

              </button>

              <span aria-hidden="true">
                ⌃
              </span>

            </div>


            <div class="results-checkbox-list">

              <label>
                <input type="checkbox" checked>
                <span class="train-type-square"></span>
                <strong>OTHER</strong>
              </label>


              <label>
                <input type="checkbox" checked>
                <span class="train-type-blue"></span>
                <strong>SHATABDI</strong>
              </label>

            </div>

          </section>


          <!-- DEPARTURE TIME -->

          <section class="results-filter-section">

            <div class="results-filter-heading">

              <strong>
                DEPARTURE TIME
              </strong>

              <button
                type="button"
                class="filter-select-all">

                Select All

              </button>

              <span aria-hidden="true">
                ⌃
              </span>

            </div>


            <div class="departure-time-grid">

              <button type="button">
                <strong>00:00 - 06:00</strong>
                <span>Early Morning</span>
              </button>


              <button type="button">
                <strong>06:00 - 12:00</strong>
                <span>Morning</span>
              </button>


              <button type="button">
                <strong>12:00 - 18:00</strong>
                <span>Mid Day</span>
              </button>


              <button type="button">
                <strong>18:00 - 24:00</strong>
                <span>Night</span>
              </button>

            </div>

          </section>


        </aside>


        <!-- =================================================
             RIGHT RESULTS
             ================================================= -->

        <main class="train-results-list">


          <div class="results-sort-row">

            <button
              type="button"
              class="results-sort-button">

              Sort By | Departure

            </button>

          </div>


          <!-- =================================================
               TRAIN RESULT CARDS
               ================================================= -->

          ${renderTrainResultCards({ from, to, date, booking })}



        </main>

      </div>

      ${
        getCurrentBooking().showDateConfirmation
          ? renderBookingDateConfirmation()
          : ''
      }

    </div>
  `;
}


/* =========================================================
   SCREEN 4 — SELECTED TRAIN
   ========================================================= */


function renderTrainResultCards({ from, to, date, booking }) {
  const searchedDateISO =
    booking.dateISO || '';

  const searchedDate =
    formatJourneyDate(searchedDateISO) || date;

  const nextDate =
    formatJourneyDate(
      addDaysToDate(searchedDateISO, 1)
    ) || 'Fri, 28 Aug 2026';

  /*
    Three demo trains are shown for every search.

    Train 1:
    Exact match — same places and same date.
    Clicking Book Now goes directly to the next step.

    Train 2:
    The train passes through the searched stations, but the
    demo booking segment starts from a different station.
    Clicking Book Now therefore shows the confirmation popup.

    Train 3:
    The train passes through the searched stations, but the
    demo booking date is the next day.
    Clicking Book Now therefore shows the confirmation popup.
  */

  const trains = [
    {
      name: 'KONARK EXPRESS',
      number: '11019',
      departure: '03:20',
      arrival: '09:10',
      duration: '05:50',
      routeBefore: '',
      routeAfter: '',
      selectedFrom: from,
      selectedTo: to,
      selectedDate: searchedDate,
      classes: [
        'Sleeper (SL)',
        'AC 3 Tier (3A)',
        'AC 2 Tier (2A)'
      ],
      availability: [
        ['__SEARCHED__', 'WL14'],
        ['__NEXT__', 'WL4']
      ],
      fare: '₹ 390',
      updated: '9 Minutes and 33 Seconds ago',
      runs: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    },

    {
      name: 'GODAVARI EXPRESS',
      number: '12727',
      departure: '06:15',
      arrival: '11:55',
      duration: '05:40',
      routeBefore: 'SECUNDERABAD JN',
      routeAfter: 'CHENNAI',
      selectedFrom: 'SECUNDERABAD JN',
      selectedTo: to,
      selectedDate: searchedDate,
      classes: [
        'Sleeper (SL)',
        'AC 3 Tier (3A)',
        'AC 2 Tier (2A)'
      ],
      availability: [
        ['__SEARCHED__', 'WL9'],
        ['__NEXT__', 'WL2']
      ],
      fare: '₹ 385',
      updated: '11 Minutes and 08 Seconds ago',
      runs: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    },

    {
      name: 'GARIB RATH EXPRESS',
      number: '12739',
      departure: '10:40',
      arrival: '16:20',
      duration: '05:40',
      routeBefore: 'DELHI',
      routeAfter: 'VIJAYAWADA JN',
      selectedFrom: from,
      selectedTo: 'VIJAYAWADA JN',
      selectedDate: nextDate,
      classes: [
        'AC 3 Tier (3A)',
        'Sleeper (SL)'
      ],
      availability: [
        ['__SEARCHED__', 'WL18'],
        ['__NEXT__', 'WL7']
      ],
      fare: '₹ 420',
      updated: '14 Minutes and 21 Seconds ago',
      runs: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    }
  ];

  return trains.map((train, index) => {
    const routeStart =
      train.routeBefore || train.selectedFrom;

    const routeEnd =
      train.routeAfter || train.selectedTo;

    const routeDescription =
      train.routeBefore || train.routeAfter
        ? `${routeStart} → ${from} → ${to} → ${routeEnd}`
        : `${from} → ${to}`;

    return `
      <article class="irctc-result-card">

        <header class="result-train-header">
          <strong>
            ${train.name} (${train.number})
          </strong>

          <span class="train-runs-on">
            Runs On:
            ${train.runs
              .map(day => `<b>${day}</b>`)
              .join('')}
          </span>

          <button
            type="button"
            class="train-schedule-button">
            Train Schedule
          </button>
        </header>


        <div class="result-journey">

          <div class="result-station departure">
            <strong>
              ${train.departure}
            </strong>

            <span>|</span>

            <span>
              ${train.selectedFrom}
            </span>

            <span>
              | ${train.selectedDate}
            </span>
          </div>


          <div class="result-duration">
            <span>────</span>

            <strong>
              ${train.duration}
            </strong>

            <span>────</span>
          </div>


          <div class="result-station arrival">
            <strong>
              ${train.arrival}
            </strong>

            <span>|</span>

            <span>
              ${train.selectedTo}
            </span>

            <span>
              | ${train.selectedDate}
            </span>
          </div>

        </div>


        <div class="result-class-tabs">

          ${train.classes
            .map((className, classIndex) => `
              <button
                type="button"
                class="result-class-tab ${
                  classIndex === 0
                    ? 'active'
                    : ''
                }">
                ${className}
              </button>
            `)
            .join('')}

          <button
            type="button"
            class="result-close-button"
            aria-label="Close">
            ×
          </button>

        </div>


        <div class="result-availability">

          ${train.availability
            .map((item, availabilityIndex) => {

              const itemDate =
                item[0] === '__SEARCHED__'
                  ? searchedDate
                  : nextDate;

              return `
                <button
                  type="button"
                  class="availability-card ${
                    availabilityIndex === 1
                      ? 'selected'
                      : ''
                  }"
                  data-availability-date="${itemDate}">

                  <strong>
                    ${itemDate}
                  </strong>

                  <span>
                    ${item[1]}
                  </span>

                </button>
              `;
            })
            .join('')}

        </div>


        <p class="ntes-notice">
          Please check NTES website or NTES app
          for actual time before boarding
        </p>


        <footer class="result-card-footer">

          <button
            type="button"
            class="result-book-button"
            data-action="select-train"
            data-train-name="${train.name} (${train.number})"
            data-selected-date="${train.selectedDate}"
            data-selected-from="${train.selectedFrom}"
            data-selected-to="${train.selectedTo}"
            data-selected-class="${train.classes[0]}"
            data-selected-departure="${train.departure}"
            data-selected-arrival="${train.arrival}"
            data-duration="${train.duration}"
            data-fare="${train.fare}">

            Book Now

          </button>


          <button
            type="button"
            class="cnf-probability-button">

            CNF Probability

          </button>


          <span class="result-fare">
            ${train.fare}
          </span>


          <span
            class="result-info-icon"
            aria-hidden="true">

            i

          </span>


          <span class="result-updated">

            Updated ${train.updated}

            <span aria-hidden="true">
              ⟳
            </span>

          </span>

        </footer>

      </article>
    `;
  }).join('');
}

function renderBookingDateConfirmation() {
  const booking = getCurrentBooking();

  const searchedFrom =
    booking.from || '';

  const searchedTo =
    booking.to || '';

  const searchedDate =
    booking.date || '';

  const selectedFrom =
    booking.selectedFrom ||
    searchedFrom;

  const selectedTo =
    booking.selectedTo ||
    searchedTo;

  const selectedDate =
    booking.selectedDate ||
    searchedDate;

  const dateChanged =
    searchedDate.trim() !==
    selectedDate.trim();

  const placeChanged =
    searchedFrom.trim().toLowerCase() !==
      selectedFrom.trim().toLowerCase() ||
    searchedTo.trim().toLowerCase() !==
      selectedTo.trim().toLowerCase();

  let message = '';

  if (placeChanged && dateChanged) {
    message = `
      You searched trains for
      <strong>${searchedFrom} → ${searchedTo}</strong>
      on <strong>${searchedDate}</strong>,
      but this train is for
      <strong>${selectedFrom} → ${selectedTo}</strong>
      on <strong>${selectedDate}</strong>.
      Do you want to continue with the same?
    `;
  } else if (placeChanged) {
    message = `
      You searched trains for
      <strong>${searchedFrom} → ${searchedTo}</strong>,
      but this train is for
      <strong>${selectedFrom} → ${selectedTo}</strong>.
      Do you want to continue with the same?
    `;
  } else if (dateChanged) {
    message = `
      You searched trains for date
      <strong>${searchedDate}</strong>
      but booking for
      <strong>${selectedDate}</strong>.
      Do you want to continue with the same?
    `;
  } else {
    message = `
      Do you want to continue with the selected train?
    `;
  }

  return `
    <div class="booking-date-modal-overlay">

      <section
        class="booking-date-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-date-modal-title">

        <header class="booking-date-modal-header">

          <strong id="booking-date-modal-title">
            Confirmation
          </strong>

          <button
            type="button"
            class="booking-date-modal-close"
            data-action="cancel-date-confirmation"
            aria-label="Close">

            ×

          </button>

        </header>


        <div class="booking-date-modal-body">

          <p>
            ${message}
          </p>

        </div>


        <footer class="booking-date-modal-actions">

          <button
            type="button"
            class="modal-confirm-yes"
            data-action="confirm-date-selection">

            ✓&nbsp;&nbsp; Yes

          </button>


          <button
            type="button"
            class="modal-confirm-no"
            data-action="cancel-date-confirmation">

            ×&nbsp;&nbsp; No

          </button>

        </footer>

      </section>

    </div>
  `;
}

function renderTrain() {
  return `
    <div class="irctc-page">

      <div class="booking-container">

        <p class="eyebrow">
          Train selected
        </p>

        <h1>
          Review your train
        </h1>


        <section class="booking-panel">

          <h2>
            ${getCurrentBooking().train}
          </h2>


          <div class="data-row">
            <strong>From</strong>
            <span>${getCurrentBooking().from}</span>
          </div>


          <div class="data-row">
            <strong>To</strong>
            <span>${getCurrentBooking().to}</span>
          </div>


          <div class="data-row">
            <strong>Date</strong>
            <span>${getCurrentBooking().date}</span>
          </div>


          <div class="data-row">
            <strong>Class</strong>
            <span>${getCurrentBooking().class}</span>
          </div>


          <div class="flow-actions">

            <button
              type="button"
              class="button button-primary"
              data-action="continue-passenger">

              Continue

            </button>

            <a
              class="button button-plain"
              href="#/search">

              Back

            </a>

          </div>

        </section>

      </div>

    </div>
  `;
}


/* =========================================================
   SCREEN 5 — JOURNEY CONFIRMATION
   ========================================================= */

function renderConfirmation() {
  return `
    <div class="irctc-page">

      <div class="booking-container">

        <p class="eyebrow">
          Passenger Details
        </p>

        <h1>
          Confirm your journey
        </h1>


        <section class="confirmation-panel">

          ${bookingSummary()}

          <p class="confirmation-text">
            Please verify your journey details
            before entering passenger information.
          </p>


          <div class="flow-actions">

            <button
              type="button"
              class="button button-primary"
              data-action="confirm-journey">

              Continue

            </button>

            <a
              class="button button-plain"
              href="#/train">

              Back

            </a>

          </div>

        </section>

      </div>

    </div>
  `;
}


/* =========================================================
   SCREEN 6 — PASSENGER DETAILS
   ========================================================= */

function renderPassenger() {
  const booking = getCurrentBooking();

  const departure =
    booking.selectedDeparture ||
    booking.departure ||
    '03:20';

  const arrival =
    booking.selectedArrival ||
    booking.arrival ||
    '09:10';

  const duration =
    booking.duration ||
    '05:50';

  const fare =
    String(booking.fare || '₹ 410')
      .replace('₹', '')
      .trim();

  const fareValue =
    fare.includes('.')
      ? fare
      : `${fare}.00`;

  const bookingDate =
    booking.date ||
    booking.selectedDate ||
    '';

  const bookingDateISO =
    booking.dateISO ||
    '';

  const displayDate =
    bookingDate ||
    formatJourneyDate(bookingDateISO);

  const boardingStation =
    booking.selectedFrom ||
    booking.from ||
    '';

  const destinationStation =
    booking.selectedTo ||
    booking.to ||
    '';

  const trainName =
    booking.train ||
    'KONARK EXPRESS (11019)';

  const selectedClass =
    booking.class ||
    'Sleeper (SL)';

  return `
    <div class="passenger-page">

      <div class="passenger-progress">

        <div class="passenger-progress-line"></div>

        <div class="progress-step active">
          <div class="progress-number">1</div>
          <strong>Passenger Details</strong>
        </div>

        <div class="progress-step">
          <div class="progress-number">2</div>
          <strong>Payment</strong>
        </div>

        <div class="progress-step">
          <div class="progress-number">3</div>
          <strong>Ticket Status</strong>
        </div>

      </div>


      <div class="passenger-content-grid">

        <main class="passenger-main">


          <div class="passenger-warning">

            <span class="warning-icon">!</span>

            <span>
              Senior Citizen concession not allowed for this
              Train/Quota/Class. Person With Disability/
              Journalist may check after entering details.
            </span>

          </div>


          <section class="passenger-train-card">


            <header class="passenger-train-heading">

              <strong>
                ${trainName}
              </strong>

              <span
                class="passenger-location-icon"
                aria-hidden="true">
                ●
              </span>

            </header>


            <div class="passenger-journey-row">


              <div class="passenger-station">

                <strong>
                  ${departure} | ${boardingStation}
                </strong>

                <span>
                  ${displayDate}
                </span>

              </div>


              <div class="passenger-duration">

                <span>—</span>

                <strong>
                  ${duration}
                </strong>

                <span>—</span>

              </div>


              <div class="passenger-station destination">

                <strong>
                  ${arrival} | ${destinationStation}
                </strong>

                <span>
                  ${displayDate}
                </span>

              </div>

            </div>


            <div class="passenger-class-badge">

              ${selectedClass}
              | Tatkal

            </div>


            <div class="passenger-change-section">

              <strong>
                CHANGE
              </strong>

              <button
                type="button"
                class="passenger-boarding-select">

                <span>
                  Boarding Station |
                  <strong>${boardingStation}</strong>
                  | Arrival: ${formatBoardingArrival(departure)}
                  | Departure: ${departure}
                  | Day: 1
                  | Boarding Date:
                  <strong>${displayDate}</strong>
                </span>

                <span class="boarding-chevron">
                  ⌄
                </span>

              </button>


              <p class="passenger-ntes-note">

                Please check
                <strong>NTES website</strong>
                or
                <strong>NTES app</strong>
                for actual time before boarding

              </p>

            </div>

          </section>


          <section class="loyalty-card">

            <div class="loyalty-title">
              TatkalOne Co-branded Card Benefits
            </div>


            <div class="loyalty-options">

              <label>
                <input
                  type="radio"
                  name="loyalty"
                  value="earn">

                <span>
                  Earn Loyalty Points
                </span>
              </label>


              <label>
                <input
                  type="radio"
                  name="loyalty"
                  value="pay">

                <span>
                  Pay with Loyalty Points
                </span>
              </label>


              <label>
                <input
                  type="radio"
                  name="loyalty"
                  value="skip"
                  checked>

                <span>
                  Skip
                </span>
              </label>

            </div>


            <p>
              ( Pay Less, Earn More:
              1% PG Waiver + upto 10% Reward Points )
            </p>

          </section>


          <section class="passenger-notes">

            <strong>
              Notes:
            </strong>

            <ol>

              <li>
                The ID card will be required during journey
              </li>

              <li>
                Please fill your current citizenship status
                while booking the ticket. Incorrect information
                may attract action under the Foreigners Act, 1946.
              </li>

            </ol>

          </section>


          <div class="passenger-form-section">

            <h2>
              Passenger Details
            </h2>


            <div class="passenger-form-grid">

              <label>
                Passenger Name
                <input
                  type="text"
                  value="${booking.passenger || ''}"
                  data-passenger-field="name">
              </label>


              <label>
                Age
                <input
                  type="number"
                  min="1"
                  max="120"
                  value="${booking.passengerAge || ''}"
                  data-passenger-field="age">
              </label>


              <label>
                Gender
                <select data-passenger-field="gender">
                  <option value="" ${
                    booking.passengerGender
                      ? ''
                      : 'selected'
                  }>
                    Select gender
                  </option>
                  <option value="Male" ${
                    booking.passengerGender === 'Male'
                      ? 'selected'
                      : ''
                  }>
                    Male
                  </option>
                  <option value="Female" ${
                    booking.passengerGender === 'Female'
                      ? 'selected'
                      : ''
                  }>
                    Female
                  </option>
                  <option value="Other" ${
                    booking.passengerGender === 'Other'
                      ? 'selected'
                      : ''
                  }>
                    Other
                  </option>
                </select>
              </label>


              <label>
                Berth Preference
                <select data-passenger-field="berth">
                  <option value="" ${
                    booking.berthPreference
                      ? ''
                      : 'selected'
                  }>
                    Select berth preference
                  </option>
                  <option value="No Preference" ${
                    booking.berthPreference === 'No Preference'
                      ? 'selected'
                      : ''
                  }>
                    No Preference
                  </option>
                  <option value="Lower" ${
                    booking.berthPreference === 'Lower'
                      ? 'selected'
                      : ''
                  }>
                    Lower
                  </option>
                  <option value="Middle" ${
                    booking.berthPreference === 'Middle'
                      ? 'selected'
                      : ''
                  }>
                    Middle
                  </option>
                  <option value="Upper" ${
                    booking.berthPreference === 'Upper'
                      ? 'selected'
                      : ''
                  }>
                    Upper
                  </option>
                  <option value="Side Lower" ${
                    booking.berthPreference === 'Side Lower'
                      ? 'selected'
                      : ''
                  }>
                    Side Lower
                  </option>
                  <option value="Side Upper" ${
                    booking.berthPreference === 'Side Upper'
                      ? 'selected'
                      : ''
                  }>
                    Side Upper
                  </option>
                </select>
              </label>

            </div>


            <div class="flow-actions">

              <button
                type="button"
                class="button button-primary"
                data-action="payment-from-passenger">

                Continue

              </button>

              <a
                class="button button-plain"
                href="#/train">

                Back

              </a>

            </div>

          </div>

        </main>


        <aside class="passenger-fare-summary">

          <h2>
            Fare Summary
          </h2>


          <div class="fare-summary-row">

            <span>
              Ticket Fare
            </span>

            <strong>
              ₹ ${fareValue}
            </strong>

          </div>


          <div class="fare-summary-total">

            <span>
              Total Fare
            </span>

            <strong>
              ₹ ${fareValue}
            </strong>

          </div>

        </aside>

      </div>

    </div>
  `;
}


function formatBoardingArrival(departure) {
  if (!departure || !departure.includes(':')) {
    return '03:10';
  }

  const [hours, minutes] =
    departure.split(':').map(Number);

  let totalMinutes =
    hours * 60 +
    minutes -
    10;

  if (totalMinutes < 0) {
    totalMinutes += 24 * 60;
  }

  const formattedHours =
    String(Math.floor(totalMinutes / 60))
      .padStart(2, '0');

  const formattedMinutes =
    String(totalMinutes % 60)
      .padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}


/* =========================================================
/* =========================================================
   SCREEN 7 — PAYMENT
   ========================================================= */

/* =========================================================
   SCREEN — PAYMENT METHODS
   Drop-in replacement for the existing renderPayment()
   Works with the existing hash-router and state functions.
   ========================================================= */

function escapePaymentText(value) {
  const text = value == null ? '' : String(value);

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


function getPaymentBooking() {
  let booking = {};

  try {
    if (typeof getCurrentBooking === 'function') {
      booking = getCurrentBooking() || {};
    }
  } catch (error) {
    booking = {};
  }

  return booking;
}


function getPaymentState() {
  try {
    if (typeof getState === 'function') {
      return getState() || {};
    }
  } catch (error) {
    return {};
  }

  return {};
}


function getPassengerForPayment() {
  const state = getPaymentState();
  const booking = getPaymentBooking();

  if (
    Array.isArray(state.passengers) &&
    state.passengers.length > 0
  ) {
    return state.passengers[0];
  }

  if (
    state.passenger &&
    typeof state.passenger === 'object'
  ) {
    return state.passenger;
  }

  /*
   * Passenger Details is stored inside the booking object.
   * This is the source used when Passenger Details -> Payment
   * is completed.
   */
  if (
    booking.passengerDetails &&
    typeof booking.passengerDetails === 'object'
  ) {
    return booking.passengerDetails;
  }

  if (
    booking.passenger ||
    booking.passengerAge ||
    booking.passengerGender ||
    booking.berthPreference
  ) {
    return {
      name: booking.passenger || '',
      age: booking.passengerAge || '',
      gender: booking.passengerGender || '',
      berth:
        booking.berthPreference ||
        ''
    };
  }

  return null;
}


function getPaymentContact() {
  const state = getPaymentState();

  if (state.contact && typeof state.contact === 'object') {
    return state.contact;
  }

  return {};
}


function formatPaymentDate(value) {
  if (!value) {
    return 'Not selected';
  }

  if (typeof value === 'string' && value.includes('T')) {
    return value.split('T')[0];
  }

  return String(value);
}


function paymentStepIndicator() {
  return `
    <div class="payment-progress" aria-label="Booking progress">

      <div class="payment-progress-line"></div>

      <div class="payment-progress-step completed">
        <div class="payment-progress-number">
          1
        </div>

        <span>
          Passenger Details
        </span>
      </div>


      <div class="payment-progress-step active">
        <div class="payment-progress-number">
          2
        </div>

        <span>
          Payment
        </span>
      </div>


      <div class="payment-progress-step">
        <div class="payment-progress-number">
          3
        </div>

        <span>
          Ticket Status
        </span>
      </div>

    </div>
  `;
}


function paymentJourneySummary() {
  const booking = getPaymentBooking();
  const passenger = getPassengerForPayment();
  const contact = getPaymentContact();

  const train =
    booking.train ||
    'Selected train';

  const trainNumber =
    booking.trainNumber ||
    '';

  const from =
    booking.from ||
    'Not selected';

  const to =
    booking.to ||
    'Not selected';

  const date =
    booking.date ||
    formatPaymentDate(booking.dateISO);

  const className =
    booking.class ||
    'Sleeper (SL)';

  const quota =
    booking.quota ||
    'Tatkal';

  const departure =
    booking.departure ||
    booking.departureTime ||
    '--:--';

  const arrival =
    booking.arrival ||
    booking.arrivalTime ||
    '--:--';

  const fare =
    booking.fare != null
      ? booking.fare
      : '0.00';

  const passengerName =
    passenger?.name ||
    passenger?.fullName ||
    'Not entered';

  const passengerAge =
    passenger?.age ||
    '—';

  const passengerGender =
    passenger?.gender ||
    'Not entered';

  const email =
    contact?.email ||
    stateValue('email') ||
    'Not entered';

  const mobile =
    contact?.mobile ||
    contact?.phone ||
    stateValue('mobile') ||
    'Not entered';

  return `
    <aside class="payment-summary-card">

      <div class="payment-summary-header">
        JOURNEY SUMMARY
      </div>


      <div class="payment-summary-body">

        <div class="payment-summary-train">
          <strong>
            ${escapePaymentText(train)}
          </strong>

          ${
            trainNumber
              ? `<span>(${escapePaymentText(trainNumber)})</span>`
              : ''
          }
        </div>


        <div class="payment-summary-date">
          ${escapePaymentText(date)}
        </div>


        <div class="payment-summary-stations">
          <strong>
            ${escapePaymentText(from)}
          </strong>

          <span class="payment-summary-arrow">
            →
          </span>

          <strong>
            ${escapePaymentText(to)}
          </strong>
        </div>


        <div class="payment-summary-times">
          <span>
            ${escapePaymentText(
              booking.fromCode
                ? `${booking.fromCode} (${departure})`
                : `(${departure})`
            )}
          </span>

          <span>
            ${escapePaymentText(
              booking.toCode
                ? `${booking.toCode} (${arrival})`
                : `(${arrival})`
            )}
          </span>
        </div>


        <div class="payment-summary-booking">
          1 Adult |
          ${escapePaymentText(className)} |
          ${escapePaymentText(quota)} |
          ${escapePaymentText(from)} |
          Boarding Date:
          ${escapePaymentText(date)}
          ${departure !== '--:--'
            ? ` ${escapePaymentText(departure)}`
            : ''}
        </div>


        <section class="payment-summary-section">

          <h3>
            Passenger Details
          </h3>

          <p>
            <strong>1.</strong>
            ${escapePaymentText(passengerName)}
            |
            ${escapePaymentText(passengerAge)}
            yrs
            |
            ${escapePaymentText(passengerGender)}
          </p>

        </section>


        <section class="payment-summary-section">

          <h3>
            Contact Details
          </h3>

          <p>
            Email:
            ${escapePaymentText(email)}
          </p>

          <p>
            Mobile:
            ${escapePaymentText(mobile)}
          </p>

        </section>


        <section class="payment-fare-summary">

          <h2>
            Fare Summary
          </h2>

          <div class="payment-fare-row">
            <span>
              Ticket Fare
            </span>

            <strong>
              ₹ ${escapePaymentText(fare)}
            </strong>
          </div>


          <div class="payment-fare-row">
            <span>
              Convenience Fee (Incl. of GST)
            </span>

            <strong>
              ₹ 17.70
            </strong>
          </div>


          <div class="payment-fare-total">
            <span>
              Total Fare
            </span>

            <strong>
              ₹ ${escapePaymentText(
                calculatePaymentTotal(fare)
              )}
            </strong>
          </div>

        </section>

      </div>

    </aside>
  `;
}


function stateValue(key) {
  const state = getPaymentState();

  if (state[key] != null) {
    return state[key];
  }

  if (
    state.booking &&
    state.booking[key] != null
  ) {
    return state.booking[key];
  }

  return '';
}


function calculatePaymentTotal(fare) {
  const numericFare =
    Number(
      String(fare)
        .replace(/[₹,\s]/g, '')
    );

  if (!Number.isFinite(numericFare)) {
    return '17.70';
  }

  return (numericFare + 17.70).toFixed(2);
}


/* =========================================================
   SCREEN — PAYMENT
   ========================================================= */

function renderPayment() {
  const booking = getPaymentBooking();

  const fare =
    booking.fare != null
      ? booking.fare
      : '0.00';

  return `
    <div class="payment-page">

      ${paymentStepIndicator()}


      <div class="payment-page-heading">

        <h1>
          Payment Methods
        </h1>

        <div class="payment-secure">
          <span
            class="payment-secure-icon"
            aria-hidden="true">
            ✓
          </span>

          Safe &amp; Secure Payments
        </div>

      </div>


      <div class="payment-content-grid">

        <main class="payment-main">

          <section class="payment-methods-card">

            <div class="payment-method-layout">

              <nav
                class="payment-method-list"
                aria-label="Payment methods">

                <button
                  type="button"
                  class="payment-method-item active"
                  data-payment-method="ipay">

                  <span
                    class="payment-method-icon"
                    aria-hidden="true">
                    ↻
                  </span>

                  <span>
                    TatkalOne Pay
                    <br>
                    <strong>
                      (Credit Card/Debit Card/UPI)
                    </strong>
                  </span>

                </button>


                <button
                  type="button"
                  class="payment-method-item"
                  data-payment-method="ewallet">

                  <span
                    class="payment-method-icon teal"
                    aria-hidden="true">
                    ◉
                  </span>

                  <span>
                    E-Wallet
                    <strong class="instant-text">
                      (Instant Payment)
                    </strong>

                    <small>
                      Balance: ₹2,495.71
                    </small>
                  </span>

                </button>


                <button
                  type="button"
                  class="payment-method-item"
                  data-payment-method="multiple">

                  <span
                    class="payment-method-icon"
                    aria-hidden="true">
                    ♢
                  </span>

                  <span>
                    Multiple Payment Service
                  </span>

                </button>


                <button
                  type="button"
                  class="payment-method-item"
                  data-payment-method="netbanking">

                  <span
                    class="payment-method-icon"
                    aria-hidden="true">
                    ▱
                  </span>

                  <span>
                    Netbanking
                  </span>

                </button>


                <button
                  type="button"
                  class="payment-method-item"
                  data-payment-method="card">

                  <span
                    class="payment-method-icon"
                    aria-hidden="true">
                    ▭
                  </span>

                  <span>
                    Payment Gateway / Credit
                    <br>
                    Card / Debit Card
                  </span>

                </button>


                <button
                  type="button"
                  class="payment-method-item"
                  data-payment-method="wallet">

                  <span
                    class="payment-method-icon"
                    aria-hidden="true">
                    ▣
                  </span>

                  <span>
                    Wallets / Cash Card
                  </span>

                </button>


                <button
                  type="button"
                  class="payment-method-item"
                  data-payment-method="emi">

                  <span
                    class="payment-method-icon muted"
                    aria-hidden="true">
                    ◌
                  </span>

                  <span>
                    EMI
                  </span>

                </button>


                <button
                  type="button"
                  class="payment-method-item"
                  data-payment-method="loyalty">

                  <span
                    class="payment-method-icon loyalty"
                    aria-hidden="true">
                    ◉
                  </span>

                  <span>
                    Loyalty Redemption
                    <br>
                    Booking
                  </span>

                </button>

              </nav>


              <section
                class="payment-method-details"
                aria-live="polite">

                <div class="payment-ipay-panel">

                  <div class="payment-ipay-header">

                    <span
                      class="payment-method-icon"
                      aria-hidden="true">
                      ↻
                    </span>

                    <div>
                      <strong>
                        TatkalOne Pay
                      </strong>

                      <p>
                        PG Charges (Upto):- UPI &amp;
                        Rupay(DC):Nil | DC:0.4%&lt;=₹2000
                        &amp; 0.9%&gt;₹2000 | CC:1.8% |
                        NB: ₹10 | Autopay:1.8%
                        (Including UPI) |
                        UPI-CC &amp; UPI-CL: 1% |
                        + GST@18%
                      </p>
                    </div>

                    <span
                      class="payment-selected-check"
                      aria-label="Selected">
                      ✓
                    </span>

                  </div>


                  <div class="payment-details-space">
                    <p>
                      Select your preferred payment option
                      to continue.
                    </p>

                    <label class="payment-radio-row">
                      <input
                        type="radio"
                        name="payment-mode"
                        value="upi"
                        checked>

                      <span>
                        UPI
                      </span>
                    </label>


                    <label class="payment-radio-row">
                      <input
                        type="radio"
                        name="payment-mode"
                        value="card">

                      <span>
                        Credit / Debit Card
                      </span>
                    </label>

                  </div>

                </div>


                <div class="payment-action-row">

                  <button
                    type="button"
                    class="payment-back-button"
                    data-action="payment-back">

                    Back
                  </button>


                  <button
                    type="button"
                    class="payment-pay-button"
                    data-action="pay">

                    Pay &amp; Book
                  </button>

                </div>

              </section>

            </div>

          </section>

        </main>


        <aside class="payment-summary-column">
          ${paymentJourneySummary()}
        </aside>

      </div>


      <p class="payment-disclosure">
        Prototype interface — payment is simulated.
      </p>

    </div>
  `;
}


/* =========================================================
   PAYMENT SCREEN EVENTS
   ========================================================= */

function bindPaymentScreenEvents() {
  const methodButtons =
    document.querySelectorAll(
      '.payment-method-item'
    );

  methodButtons.forEach((button) => {
    button.addEventListener('click', () => {

      methodButtons.forEach((item) => {
        item.classList.remove('active');
      });

      button.classList.add('active');
    });
  });


  const backButton =
    document.querySelector(
      '[data-action="payment-back"]'
    );

  if (backButton) {
    backButton.addEventListener('click', () => {
      window.location.hash = '#/passenger';
    });
  }
}


/* =========================================================
   IMPORTANT
   =========================================================

   If your existing application already calls a common
   bindEvents() function after rendering, call:

       bindPaymentScreenEvents();

   when the current route is #/payment.

   The existing data-action="pay" handler can remain
   unchanged. It already moves the app to #/processing.
   ========================================================= */



/* =========================================================
   SCREEN 7A — FAKE UPI PAYMENT
   ========================================================= */

function renderUPIPayment() {

  const booking =
    typeof getCurrentBooking === 'function'
      ? getCurrentBooking()
      : getState().booking || {};

  const fareText =
    String(
      booking.fare ||
      '410.00'
    )
      .replace(/₹/g, '')
      .replace(/,/g, '')
      .trim();

  const fare =
    Number(fareText) || 410;

  const convenienceFee =
    Number(
      booking.convenienceFee || 0
    );

  const total =
    fare + convenienceFee;

  const amount =
    total.toFixed(2);

  /*
   * Fake order ID for the prototype.
   * It is intentionally not a real transaction ID.
   */
  const orderId =
    '100006609820573';


  /*
   * Create a fake QR-like SVG.
   *
   * This is only visual demo data.
   * It does not contain a real payment request.
   */
  function fakeQR() {

    const size = 29;
    const cells = [];

    function hashCell(row, col) {

      const value =
        (
          row * 928371 +
          col * 364479 +
          row * col * 17
        ) % 11;

      return value < 5;
    }


    function finder(
      startRow,
      startCol
    ) {

      for (
        let row = 0;
        row < 7;
        row++
      ) {

        for (
          let col = 0;
          col < 7;
          col++
        ) {

          const outer =
            row === 0 ||
            row === 6 ||
            col === 0 ||
            col === 6;

          const inner =
            row >= 2 &&
            row <= 4 &&
            col >= 2 &&
            col <= 4;

          if (
            outer ||
            inner
          ) {

            cells.push(
              `<rect
                x="${startCol + col}"
                y="${startRow + row}"
                width="1"
                height="1"/>`
            );

          }

        }

      }

    }


    finder(0, 0);
    finder(0, 22);
    finder(22, 0);


    for (
      let row = 0;
      row < size;
      row++
    ) {

      for (
        let col = 0;
        col < size;
        col++
      ) {

        const inTopLeft =
          row < 8 &&
          col < 8;

        const inTopRight =
          row < 8 &&
          col > 20;

        const inBottomLeft =
          row > 20 &&
          col < 8;

        if (
          inTopLeft ||
          inTopRight ||
          inBottomLeft
        ) {
          continue;
        }


        if (
          hashCell(row, col)
        ) {

          cells.push(
            `<rect
              x="${col}"
              y="${row}"
              width="1"
              height="1"/>`
          );

        }

      }

    }


    return `
      <svg
        class="fake-upi-qr"
        viewBox="0 0 ${size} ${size}"
        role="img"
        aria-label="Demo UPI QR code">

        <rect
          width="${size}"
          height="${size}"
          fill="#ffffff"/>

        <g
          fill="#111111">

          ${cells.join('')}

        </g>

      </svg>
    `;
  }


  return `

    <div class="fake-upi-page">

      <button
        type="button"
        class="fake-upi-back"
        data-action="upi-payment-back">

        <span aria-hidden="true">
          ‹
        </span>

        Back

      </button>


      <div class="fake-upi-layout">


        <!-- =========================================
             LEFT PAYMENT METHOD COLUMN
             ========================================= -->

        <aside class="fake-upi-methods">

          <button
            type="button"
            class="fake-upi-method active">

            <span class="fake-upi-method-logo">
              ▲
            </span>

            <strong>
              UPI
            </strong>

          </button>


          <button
            type="button"
            class="fake-upi-method">

            <span class="fake-upi-voice-icon">
              ♟
            </span>

            <span>

              <strong>
                UPI
              </strong>

              <small>
                Over Voice
              </small>

            </span>

          </button>

        </aside>


        <!-- =========================================
             CENTER QR PANEL
             ========================================= -->

        <section class="fake-upi-qr-panel">

          <div class="fake-upi-tab">
            UPI
          </div>


          <div class="fake-upi-qr-wrapper">

            ${fakeQR()}

          </div>


          <p class="fake-upi-qr-text">
            Click here to pay through QR
          </p>


          <div class="fake-upi-apps">

            <span class="upi-app phonepe">
              φ
            </span>

            <span class="upi-app gpay">
              ◈
            </span>

            <span class="upi-app paytm">
              paytm
            </span>

            <span class="upi-app upi-other">
              ▶
            </span>

            <strong>
              &amp;
              <br>
              More
            </strong>

          </div>

        </section>


        <!-- =========================================
             RIGHT INFORMATION COLUMN
             ========================================= -->

        <section class="fake-upi-right">


          <!-- SESSION / PAYMENT REQUEST -->

          <div class="fake-upi-request-card">

            <div class="fake-upi-session">

              Session Valid For:
              <strong>
                <span id="upi-session-timer">
                  06:57
                </span>
              </strong>

            </div>


            <div class="fake-upi-request-content">

              <div class="fake-upi-irctc-logo">
                <strong>
                  TatkalOne
                </strong>
              </div>


              <div class="fake-upi-request-text">

                <span>
                  Payment Request from
                  <br>
                  TatkalOne
                </span>

                <strong>
                  ₹ ${amount}
                </strong>

              </div>

            </div>

          </div>


          <!-- PAYMENT DETAILS -->

          <div class="fake-upi-details-card">

            <h2>
              Payment Details
            </h2>


            <div class="fake-upi-detail-row">

              <span>
                Order ID
              </span>

              <strong>
                ${orderId}
              </strong>

            </div>


            <div class="fake-upi-detail-row">

              <span>
                Amount
              </span>

              <strong>
                INR ${amount}
              </strong>

            </div>


            <div class="fake-upi-detail-row">

              <span>
                Transaction Charges
              </span>

              <strong>
                ₹ 0.00
              </strong>

            </div>


            <div class="fake-upi-detail-divider"></div>


            <div
              class="fake-upi-detail-row fake-upi-total">

              <span>
                Total Payment
              </span>

              <strong>
                ₹ ${amount}
              </strong>

            </div>

          </div>

        </section>

      </div>


      <!-- =========================================
           DEMO NOTICE + ACTIONS
           ========================================= -->

      <div class="fake-upi-bottom-bar">

        <div class="fake-upi-demo-notice">

          <span
            class="fake-upi-shield"
            aria-hidden="true">

            ♢

          </span>

          <span>
            This is a demo payment.
            Please do not use any real payment apps.
          </span>

        </div>


        <div class="fake-upi-actions">

          <button
            type="button"
            class="fake-upi-cancel"
            data-action="upi-payment-back">

            Cancel

          </button>


          <button
            type="button"
            class="fake-upi-complete"
            data-action="upi-payment-complete">

            I've Completed Payment

          </button>

        </div>

      </div>

    </div>

  `;
}


/* =========================================================
   SCREEN 8 — PROCESSING
   ========================================================= */

function renderProcessing() {
  return `
    <div class="irctc-page">

      <div class="booking-container center">

        <p class="eyebrow">
          Payment processing
        </p>

        <h1>
          Checking your booking status…
        </h1>

        <p class="flow-description">
          Please wait while the simulated payment
          response is processed.
        </p>


        <section class="booking-panel processing-card">

          <div
            class="spinner"
            aria-hidden="true">
          </div>


          <p
            id="processing-message"
            aria-live="polite">

            Connecting to the booking system…

          </p>

        </section>

      </div>

    </div>
  `;
}


/* =========================================================
   STATUS TIMELINE
   ========================================================= */

function renderTimeline(scenario) {

  const steps = [

    {
      label: 'Payment',
      value: scenario.payment,
      type:
        scenario.payment === 'Unsuccessful'
          ? 'error'
          : 'success'
    },

    {
      label: 'Booking Status',
      value: scenario.booking,
      type:
        scenario.booking === 'Unsuccessful'
          ? 'error'
          : 'success'
    },

    {
      label: 'Ticket Status',
      value: scenario.ticket,
      type:
        scenario.ticket.includes('Waiting')
          ? 'wait'
          : scenario.ticket === 'Pending'
          ? 'error'
          : 'success'
    },

    {
      label: 'Seat Allotment',
      value: scenario.seat,
      type:
        scenario.seat.includes('RAC')
          ? 'rac'
          : scenario.seat.includes('failed')
          ? 'error'
          : 'success'
    }

  ];


  return `
    <div
      class="status-timeline"
      aria-label="Booking status timeline">

      ${steps.map((step) => {

        let icon = '✓';

        if (step.type === 'error') {
          icon = '×';
        }

        if (step.type === 'rac') {
          icon = 'R';
        }

        if (step.type === 'wait') {
          icon = 'W';
        }

        return `
          <div
            class="timeline-step ${step.type}">

            <div
              class="timeline-dot"
              aria-hidden="true">

              ${icon}

            </div>

            <div class="timeline-label">
              ${step.label}
            </div>

            <div class="timeline-value">
              ${step.value}
            </div>

          </div>
        `;

      }).join('')}

    </div>
  `;
}


/* Renders the ticket, class, coach and berth details for a status outcome. */
function renderTicketDetails(scenario) {

  const waitlistDetail =
    scenario.waitlistNumber
      ? `
        <div>
          <span>Waiting list</span>
          <strong>${scenario.waitlistNumber}</strong>
        </div>
      `
      : '';


  return `
    <div class="ticket-detail-grid">

      <div>
        <span>PNR (DEMO)</span>
        <strong>${scenario.pnr}</strong>
      </div>

      <div>
        <span>Class</span>
        <strong>${scenario.ticketClass}</strong>
      </div>

      <div>
        <span>Coach</span>
        <strong>${scenario.coach}</strong>
      </div>

      <div>
        <span>Berth / seat</span>
        <strong>${scenario.berth}</strong>
      </div>

      ${waitlistDetail}

    </div>
  `;
}


/* =========================================================
   STATUS SCREEN
   ========================================================= */

function renderConfirmedStatus(s) {

  const booking =
    getCurrentBooking();


  return `
    <div class="irctc-page confirmed-status-page">

      <div class="booking-container">

        <div class="page-heading confirmed-heading">

          <p class="eyebrow">
            Tatkal booking status (DEMO)
          </p>

          <div class="confirmed-title-row">
            <span
              class="confirmed-check"
              aria-hidden="true">
              ✓
            </span>

            <div>
              <h1>
                Booking confirmed
              </h1>

              <p class="lead">
                Your payment was received, the booking was processed,
                and your ticket with seat allocation is ready.
              </p>
            </div>
          </div>

        </div>


        <section
          class="booking-panel confirmed-status-card"
          aria-label="Confirmed booking details">

          ${renderTimeline(s)}


          <section class="confirmed-journey-card">

            <div class="confirmed-route">

              <div>
                <span>From</span>
                <strong>${booking.from}</strong>
              </div>

              <span
                class="route-arrow"
                aria-hidden="true">
                →
              </span>

              <div>
                <span>To</span>
                <strong>${booking.to}</strong>
              </div>

            </div>


            <dl class="confirmed-details">
              <div>
                <dt>Train</dt>
                <dd>${booking.train}</dd>
              </div>

              <div>
                <dt>Journey date</dt>
                <dd>${booking.date}</dd>
              </div>

              <div>
                <dt>PNR (DEMO)</dt>
                <dd>${s.pnr}</dd>
              </div>

              <div>
                <dt>Class</dt>
                <dd>${s.ticketClass}</dd>
              </div>

              <div>
                <dt>Coach · Berth</dt>
                <dd>${s.coach} · ${s.berth}</dd>
              </div>
            </dl>

          </section>


          <div class="flow-actions">
            <button
              type="button"
              class="button button-plain"
              data-action="go-back">
              ← Back
            </button>

            <a
              class="button button-primary"
              href="#/receipt">
              View ticket
            </a>

            <a
              class="button button-plain"
              href="#/home">
              Back to booking
            </a>
          </div>

        </section>

      </div>

    </div>
  `;
}

function renderStatus() {

  const s = getScenario();

  const stateClass = statusClass(s.key);

  const isFailure =
    s.key === 'payment_error';


  if (s.key === 'confirmed') {
    return renderConfirmedStatus(s);
  }


  return `
    <div class="irctc-page">

      <div class="booking-container">

        <div class="page-heading">

          <p class="eyebrow">
            Booking status
          </p>

          <h1>
            ${s.heading}
          </h1>

          <p class="lead">
            ${s.message}
          </p>

        </div>


        <section
          class="booking-panel status-card">

          ${renderTimeline(s)}


          ${renderTicketDetails(s)}


          <div class="status-context">

            <strong>
              Journey
            </strong>

            <span>
              ${getCurrentBooking().train}
              ·
              ${getCurrentBooking().from}
              →
              ${getCurrentBooking().to}
            </span>

          </div>


          ${
            isFailure
              ? `
                <p class="refund-guidance">
                  If the money got debited from your bank, the fare
                  will be refunded to you in 48–56 hours.
                </p>
              `
              : ''
          }


          <div class="flow-actions">

            <button
              type="button"
              class="button button-plain"
              data-action="go-back">

              ← Back

            </button>

            ${
              isFailure

                ? `

                  <a
                    class="button button-primary"
                    href="#/recovery">

                    Customer service

                  </a>

                `

                : `

                  <a
                    class="button button-primary"
                    href="#/receipt">

                    View ticket

                  </a>

                `
            }


            <a
              class="button button-plain"
              href="#/home">

              Back to booking

            </a>

          </div>


        </section>

      </div>

    </div>
  `;
}


/* =========================================================
   TICKET / RECEIPT
   ========================================================= */

function renderReceipt() {

  const s = getScenario();

  const booking = getCurrentBooking();

  const fare =
    String(booking.fare || '1,245')
      .replace('₹', '')
      .trim();


  return `
    <div class="irctc-page">

      <div class="booking-container">


        <div class="ticket-topbar">

          <a href="#/status">
            ← Back to booking status
          </a>

          <span class="demo-chip">
            SIMULATED TICKET
          </span>

        </div>


        <section class="ticket-card">


          <div class="ticket-header">

            <div>

              <p class="eyebrow">
                E-ticket summary (DEMO)
              </p>

              <h1>
                Your journey ticket
              </h1>

              <p>
                Passenger, train, journey and seat details for this simulated booking.
              </p>

            </div>


            <div
              class="ticket-status-pill ${statusClass(s.key)}">

              ${s.ticket}

            </div>

          </div>


          <div class="ticket-journey">


            <div>

              <span>
                Train
              </span>

              <strong>
                ${booking.train}
              </strong>

            </div>


            <div>

              <span>
                From
              </span>

              <strong>
                ${booking.from}
              </strong>

              <small>
                Departure: ${booking.departure || '06:10'} · ${booking.date}
              </small>

            </div>


            <div
              class="journey-arrow"
              aria-hidden="true">

              →

            </div>


            <div>

              <span>
                To
              </span>

              <strong>
                ${booking.to}
              </strong>

              <small>
                Arrival: ${booking.arrival || '12:20'}
              </small>

            </div>


          </div>


          <div class="ticket-body">


            <div class="ticket-details">

              <h2>
                Passenger details
              </h2>


              <div class="data-row">

                <strong>
                  Passenger
                </strong>

                <span>
                  ${booking.passenger}
                </span>

              </div>


              <div class="data-row">

                <strong>
                  Class
                </strong>

                <span>
                  ${s.ticketClass}
                </span>

              </div>


              <div class="data-row">

                <strong>
                  PNR (DEMO)
                </strong>

                <span>
                  ${s.pnr}
                </span>

              </div>


              <div class="data-row">

                <strong>
                  Coach · berth
                </strong>

                <span>
                  ${s.coach} · ${s.berth}
                </span>

              </div>


              <div class="data-row">

                <strong>
                  Passenger details
                </strong>

                <span>
                  ${booking.passengerAge || '28'} years · ${booking.passengerGender || 'Female'}
                </span>

              </div>


              <div class="data-row">

                <strong>
                  Fare paid (DEMO)
                </strong>

                <span>
                  ₹${fare}
                </span>

              </div>


            </div>


            <div class="fake-qr-panel">

              <div
                class="fake-qr"
                aria-label="Fake QR code">

                ${generateFakeQR()}

              </div>

              <strong>
                Prototype QR
              </strong>

              <small>
                Synthetic QR only. It cannot be used for travel.
              </small>

              <div class="ticket-payment-summary">
                <strong>Payment details (DEMO)</strong>
                <span>UPI · Successful</span>
                <span>Reference: PAY-DEMO-482731</span>
              </div>

            </div>


          </div>


          <div class="ticket-actions">

            <button
              class="button button-primary"
              type="button"
              data-action="print">

              Print ticket

            </button>


            <a
              class="button button-plain"
              href="#/home">

              Return to booking

            </a>

          </div>


          <div class="ticket-disclaimer">

            <strong>
              Prototype only
            </strong>

            <span>
              All passenger, PNR, payment and QR data is synthetic.
              This screen is not a valid railway ticket.
            </span>

          </div>


        </section>

      </div>

    </div>
  `;
}
/* =========================================================
   FAKE QR GENERATOR
   ========================================================= */

function generateFakeQR() {

  const pattern = [
    '111111100101101111111',
    '100000101110101000001',
    '101110100101101011101',
    '101110101011001011101',
    '101110100110101011101',
    '100000101010101000001',
    '111111101010101111111',
    '000000001101100000000',
    '110101111001011011101',
    '101011001110100101010',
    '011101110101011100111',
    '100110001011100010101',
    '111001111010111101100',
    '000000001101010000000',
    '111111101011101111111',
    '100000100110101000001',
    '101110101101101011101',
    '101110100010001011101',
    '101110101111101011101',
    '100000101001101000001',
    '111111101110101111111'
  ];

  return `
    <div class="fake-qr-grid">

      ${pattern
        .join('')
        .split('')
        .map((cell) => {

          return `
            <span
              class="qr-cell ${cell === '1' ? 'filled' : ''}">
            </span>
          `;

        })
        .join('')}

    </div>
  `;
}


/* =========================================================
   RECOVERY SCREEN
   ========================================================= */

function renderRecovery() {

  const s = getScenario();

  return `
    <div class="irctc-page">

      <div class="booking-container">

        <p class="eyebrow">
          Payment recovery
        </p>

        <h1>
          What would you like to do?
        </h1>


        <section class="booking-panel">


          <div class="recovery-warning">

            <strong>
              Your payment status needs attention.
            </strong>

            <span>
              Do not make another payment until
              you confirm whether the first attempt
              was successful.
            </span>

          </div>


          <div class="recovery-options">


            <article class="recovery-option">

              <div class="recovery-option-number">
                1
              </div>

              <div>

                <h2>
                  Check booking status
                </h2>

                <p>
                  Check again before attempting
                  another payment.
                </p>

                <a
                  href="#/status"
                  class="button button-primary">

                  Check status

                </a>

              </div>

            </article>


            <article class="recovery-option">

              <div class="recovery-option-number">
                2
              </div>

              <div>

                <h2>
                  Return to booking
                </h2>

                <p>
                  Return to the booking screen
                  without making another payment.
                </p>

                <a
                  href="#/home"
                  class="button button-secondary">

                  Back to booking

                </a>

              </div>

            </article>


            <article class="recovery-option">

              <div class="recovery-option-number">
                3
              </div>

              <div>

                <h2>
                  Chat with bot
                </h2>

                <p>
                  Ask the demo support bot about your payment,
                  refund or booking reference.
                </p>

                <button
                  type="button"
                  class="button button-primary"
                  data-action="open-support-chat">

                  Chat with bot

                </button>

              </div>

            </article>


            <article class="recovery-option">

              <div class="recovery-option-number">
                4
              </div>

              <div>

                <h2>
                  Customer helpline
                </h2>

                <p>
                  Customer helpline (DEMO): 1800 000 1234
                </p>

                <p class="recovery-help-text">
                  Keep your PNR or payment reference ready before calling.
                </p>

                <button
                  type="button"
                  class="button button-primary"
                  data-action="show-helpline">

                  Customer helpline

                </button>

                <p
                  class="helpline-message"
                  id="helpline-message"
                  hidden>
                  Call 1800 000 1234 (DEMO). This is a simulated helpline only.
                </p>

              </div>

            </article>


          </div>


          <section
            class="support-chat-panel"
            id="support-chat-panel"
            hidden
            aria-live="polite">

            <div class="support-chat-heading">
              <div>
                <p class="eyebrow">Support bot (DEMO)</p>
                <h2>How can I help?</h2>
              </div>

              <button
                type="button"
                class="icon-button"
                data-action="close-support-chat"
                aria-label="Close chat">
                ×
              </button>
            </div>

            <p class="bot-message" id="bot-message">
              I can help you understand your booking status or refund timeline.
            </p>

            <label class="support-chat-field">
              Your question (DEMO)
              <input
                type="text"
                id="support-chat-input"
                placeholder="For example: When will my refund arrive?">
            </label>

            <button
              type="button"
              class="button button-primary"
              data-action="send-support-message">
              Send message
            </button>

          </section>


          <p class="prototype-disclosure">
            This is a simulated recovery flow.
            No real payment is processed.
          </p>


        </section>

      </div>

    </div>
  `;
}


/* =========================================================
   ERROR / FAILED PAYMENT SCREEN
   ========================================================= */

function renderError() {

  const s = getScenario();

  return `
    <div class="irctc-page">

      <div class="booking-container">


        <section class="error-panel">


          <div class="error-icon">
            ×
          </div>


          <p class="eyebrow">
            Payment status
          </p>


          <h1>
            Payment could not be confirmed
          </h1>


          <p class="lead">
            ${s.message}
          </p>


          <div class="error-details">

            <div class="data-row">

              <strong>
                Payment
              </strong>

              <span>
                ${s.payment}
              </span>

            </div>


            <div class="data-row">

              <strong>
                Booking
              </strong>

              <span>
                ${s.booking}
              </span>

            </div>


            <div class="data-row">

              <strong>
                Ticket
              </strong>

              <span>
                ${s.ticket}
              </span>

            </div>

          </div>


          <div class="flow-actions">

            <a
              class="button button-primary"
              href="#/recovery">

              View recovery options

            </a>


            <a
              class="button button-plain"
              href="#/home">

              Return home

            </a>

          </div>


        </section>

      </div>

    </div>
  `;
}


/* =========================================================
   ROUTING
   ========================================================= */

function getRoute() {

  const hash =
    window.location.hash.replace(/^#\/?/, '');

  return hash || 'welcome';
}


function renderRoute() {

  const app =
  document.querySelector('#main-content');

  if (!app) {
    return;
  }


  const route = getRoute();


  /*
   * The normal IRCTC-style header should NOT
   * appear on the language/welcome screen.
   */

  const header =
    document.querySelector('#site-header');


  if (header) {

    header.hidden =
      route === 'welcome';

  }


  switch (route) {

    case 'welcome':

      app.innerHTML =
        renderWelcome();

      break;


    case 'home':

      app.innerHTML =
        renderHome();

      break;


    case 'search':

      app.innerHTML =
        renderSearch();

      break;


    case 'date-confirmation':

      app.innerHTML =
        renderBookingDateConfirmation();

      break;


    case 'train':

      app.innerHTML =
        renderTrain();

      break;


    case 'confirmation':

      app.innerHTML =
        renderConfirmation();

      break;


    case 'passenger':

      app.innerHTML =
        renderPassenger();

      break;


    case 'payment':

      app.innerHTML =
        renderPayment();

      break;


    case 'upi-payment':

      app.innerHTML =
        renderUPIPayment();

      break;


    case 'processing':

      app.innerHTML =
        renderProcessing();

      startProcessing();

      break;


    case 'status':

      app.innerHTML =
        renderStatus();

      break;


    case 'receipt':

      app.innerHTML =
        renderReceipt();

      break;


    case 'recovery':

      app.innerHTML =
        renderRecovery();

      break;


    case 'error':

      app.innerHTML =
        renderError();

      break;


    default:

      window.location.hash =
        '#/welcome';

      return;

  }


  bindEvents();

  window.scrollTo({
    top: 0,
    behavior: 'instant'
  });

}


/* =========================================================
   PROCESSING
   ========================================================= */

function startProcessing() {

  const message =
    document.querySelector(
      '#processing-message'
    );


  const messages = [

    'Connecting to the booking system…',

    'Confirming payment…',

    'Checking booking status…',

    'Preparing your booking status…'

  ];


  let index = 0;


  const interval =
    window.setInterval(() => {

      index += 1;


      if (message) {

        message.textContent =
          messages[
            Math.min(
              index,
              messages.length - 1
            )
          ];

      }


      if (index >= messages.length - 1) {

        window.clearInterval(interval);

        window.setTimeout(() => {

          window.location.hash =
            '#/status';

        }, 700);

      }

    }, 800);

}


/* =========================================================
   EVENT HANDLING
   ========================================================= */

function bindEvents() {

  /*
   * Bind every rendered action directly after each render.
   * Screen 3 is re-created with innerHTML, so the Book Now
   * buttons must be bound again every time the results render.
   */
  document
    .querySelectorAll('[data-action]')
    .forEach((element) => {

      if (element.dataset.actionBound === 'true') {
        return;
      }

      element.dataset.actionBound = 'true';

      element.addEventListener(
        'click',
        handleAction
      );

    });


  /*
   * Existing welcome close behaviour.
   */
  document
    .querySelectorAll('.welcome-modal .icon-button')
    .forEach((button) => {

      if (button.dataset.bound === 'true') {
        return;
      }

      button.dataset.bound = 'true';

      button.addEventListener(
        'click',
        () => {
          window.location.hash = '#/home';
        }
      );

    });


  /*
   * Existing beta-banner close behaviour.
   */
  document
    .querySelectorAll('.beta-close')
    .forEach((button) => {

      if (button.dataset.bound === 'true') {
        return;
      }

      button.dataset.bound = 'true';

      button.addEventListener(
        'click',
        () => {

          const banner =
            button.closest('.beta-banner');

          if (banner) {
            banner.remove();
          }

        }
      );

    });

}


/* =========================================================
   ACTION HANDLER
   ========================================================= */

function handleAction(event) {

  const action =
    event.currentTarget.dataset.action;


  switch (action) {

    case 'go-back':

      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.hash = '#/home';
      }

      break;


    case 'open-support-chat': {

      const chatPanel =
        document.querySelector(
          '#support-chat-panel'
        );


      if (chatPanel) {
        chatPanel.hidden = false;
        chatPanel.querySelector('input')?.focus();
      }

      break;
    }


    case 'close-support-chat': {

      const chatPanel =
        document.querySelector(
          '#support-chat-panel'
        );


      if (chatPanel) {
        chatPanel.hidden = true;
      }

      break;
    }


    case 'send-support-message': {

      const botMessage =
        document.querySelector(
          '#bot-message'
        );


      const chatInput =
        document.querySelector(
          '#support-chat-input'
        );


      if (botMessage) {
        botMessage.textContent =
          'Your payment has not been confirmed yet. If the fare was debited, the mock refund timeline is 48–56 hours.';
      }


      if (chatInput) {
        chatInput.value = '';
      }

      break;
    }


    case 'show-helpline': {

      const helplineMessage =
        document.querySelector(
          '#helpline-message'
        );


      if (helplineMessage) {
        helplineMessage.hidden = false;
      }

      break;
    }


    case 'select-language':

      setState({
        step: 'home'
      });

      window.location.hash =
        '#/home';

      break;


    case 'dismiss-banner':

      const banner =
        event.currentTarget.closest(
          '.beta-banner'
        );

      if (banner) {
        banner.remove();
      }

      break;


    case 'swap-stations': {

      const fromInput =
        document.querySelector('#from-station');

      const toInput =
        document.querySelector('#to-station');


      if (fromInput && toInput) {

        const currentFrom =
          fromInput.value;

        fromInput.value =
          toInput.value;

        toInput.value =
          currentFrom;

      }

      break;

    }


    case 'search': {

      const fromInput =
        document.querySelector('#from-station');

      const toInput =
        document.querySelector('#to-station');

      const dateInput =
        document.querySelector('#journey-date');

      const classInput =
        document.querySelector('#journey-class');


      const from =
        fromInput?.value.trim();

      const to =
        toInput?.value.trim();

      const dateISO =
        dateInput?.value;

      const journeyClass =
        classInput?.value || 'SL';


      if (!from || !to || !dateISO) {

        window.alert(
          'Please enter From, To and Date before searching.'
        );

        return;

      }


      const classNames = {
        SL: 'Sleeper (SL)',
        '3A': 'AC 3 Tier (3A)',
        '2A': 'AC 2 Tier (2A)',
        '1A': 'AC First Class (1A)',
        CC: 'AC Chair Car (CC)'
      };


      setState({

        step: 'search',

        booking: {
          ...getCurrentBooking(),

          from,

          to,

          dateISO,

          date: formatJourneyDate(dateISO),

          classCode: journeyClass,

          class:
            classNames[journeyClass] ||
            'Sleeper (SL)'
        }

      });


      window.location.hash =
        '#/search';

      break;

    }


    case 'select-train': {

      const button =
        event.currentTarget;

      const booking =
        getCurrentBooking();


      /*
       * Save the train selected from Screen 3.
       * Book Now now goes directly to the
       * Passenger Details screen shown in
       * the reference image.
       */
      const selectedTrain =
        button.dataset.trainName ||
        'Selected train';

      const selectedDate =
        button.dataset.selectedDate ||
        booking.date;

      const selectedFrom =
        button.dataset.selectedFrom ||
        booking.from;

      const selectedTo =
        button.dataset.selectedTo ||
        booking.to;

      const selectedClass =
        button.dataset.selectedClass ||
        booking.class ||
        'Sleeper (SL)';

      const fare =
        button.dataset.fare ||
        booking.fare ||
        '410';

      const selectedDeparture =
        button.dataset.selectedDeparture ||
        booking.selectedDeparture ||
        button.dataset.departure ||
        booking.departure ||
        '03:20';

      const selectedArrival =
        button.dataset.selectedArrival ||
        booking.selectedArrival ||
        button.dataset.arrival ||
        booking.arrival ||
        '09:10';

      const duration =
        button.dataset.duration ||
        booking.duration ||
        '05:50';


      setState({

        step: 'passenger',

        booking: {

          ...booking,

          train:
            selectedTrain,

          from:
            selectedFrom,

          to:
            selectedTo,

          date:
            selectedDate,

          selectedDate:
            selectedDate,

          selectedFrom:
            selectedFrom,

          selectedTo:
            selectedTo,

          class:
            selectedClass,

          fare:
            fare,

          selectedDeparture:
            selectedDeparture,

          selectedArrival:
            selectedArrival,

          departure:
            selectedDeparture,

          arrival:
            selectedArrival,

          duration:
            duration,

          showDateConfirmation:
            false

        }

      });


      window.location.hash =
        '#/passenger';

      break;
    }


    case 'confirm-date-selection': {

      const booking = getCurrentBooking();

      setState({
        step: 'train',
        booking: {
          ...booking,
          from: booking.selectedFrom || booking.from,
          to: booking.selectedTo || booking.to,
          date: booking.selectedDate || booking.date,
          showDateConfirmation: false
        }
      });

      window.location.hash =
        '#/train';

      break;
    }


    case 'cancel-date-confirmation': {
      const booking = getCurrentBooking();

      setState({
        step: 'search',
        booking: {
          ...booking,
          showDateConfirmation: false
        }
      });

      window.location.hash = '#/search';
      break;
    }

    case 'continue-passenger':

      setState({
        step: 'confirmation'
      });

      window.location.hash =
        '#/confirmation';

      break;


    case 'confirm-journey':

      setState({
        step: 'passenger'
      });

      window.location.hash =
        '#/passenger';

      break;


    case 'payment-from-passenger': {
      const nameInput =
        document.querySelector(
          '[data-passenger-field="name"]'
        );

      const ageInput =
        document.querySelector(
          '[data-passenger-field="age"]'
        );

      const genderInput =
        document.querySelector(
          '[data-passenger-field="gender"]'
        );

      const berthInput =
        document.querySelector(
          '[data-passenger-field="berth"]'
        );


      const passengerName =
        nameInput
          ? nameInput.value.trim()
          : '';

      const passengerAge =
        ageInput
          ? ageInput.value.trim()
          : '';

      const passengerGender =
        genderInput
          ? genderInput.value
          : '';

      const berthPreference =
        berthInput
          ? berthInput.value
          : '';


      if (
        !passengerName ||
        !passengerAge ||
        !passengerGender ||
        !berthPreference
      ) {
        window.alert(
          'Please enter/select all passenger details before continuing.'
        );

        return;
      }


      const currentBooking =
        getCurrentBooking();


      const passengerDetails = {
        name: passengerName,
        age: passengerAge,
        gender: passengerGender,
        berth: berthPreference
      };


      setState({
        step: 'payment',

        passenger: passengerDetails,

        passengers: [
          passengerDetails
        ],

        booking: {
          ...currentBooking,

          passenger:
            passengerName,

          passengerAge:
            passengerAge,

          passengerGender:
            passengerGender,

          berthPreference:
            berthPreference,

          passengerDetails:
            passengerDetails
        }
      });


      window.location.hash =
        '#/payment';

      break;
    }


    case 'payment':

      setState({
        step: 'payment'
      });

      window.location.hash =
        '#/payment';

      break;


    case 'pay':

      setState({
        step: 'upi-payment'
      });

      window.location.hash =
        '#/upi-payment';

      break;


    case 'upi-payment-back':

      setState({
        step: 'payment'
      });

      window.location.hash =
        '#/payment';

      break;


    case 'upi-payment-complete':

      const nextScenario =
        getNextScenario();

      setState({
        step: 'processing',
        paymentCompleted: true,
        scenario: nextScenario.key,
        scenarioIndex: nextScenario.index
      });

      window.location.hash =
        '#/processing';

      break;


    case 'print':

      window.print();

      break;


    default:

      break;

  }

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

async function loadHeader() {

  const header =
    document.querySelector(
      '#site-header'
    );


  if (!header) {
    return;
  }


  try {

    const response =
      await fetch(
        'components/header.html'
      );


    if (!response.ok) {
      throw new Error(
        'Header could not be loaded'
      );
    }


    header.innerHTML =
      await response.text();


  } catch (error) {

    /*
     * Header loading failure should not
     * prevent the prototype from working.
     */

    header.innerHTML = '';

  }

}


/* =========================================================
   DEMO DISCLOSURE
   ========================================================= */

async function loadDemoBanner() {

  const banner =
    document.querySelector(
      '#demo-banner'
    );


  if (!banner) {
    return;
  }


  try {

    const response =
      await fetch(
        'components/demo-banner.html'
      );


    if (!response.ok) {
      throw new Error(
        'Demo banner could not be loaded'
      );
    }


    banner.innerHTML =
      await response.text();


    banner
      .querySelector('[data-dismiss-demo]')
      ?.addEventListener(
        'click',
        () => {
          banner.hidden = true;
        }
      );

  } catch (error) {

    banner.innerHTML = '';

  }

}


async function init() {

  /*
   * Ensure there is a saved demo state.
   */

  const currentState =
    getState();


  if (!currentState.scenario) {

    setState({
      scenario: 'confirmed'
    });

  }


  await Promise.all([
    loadHeader(),
    loadDemoBanner()
  ]);


  /*
   * Render the current route.
   */

  renderRoute();


  /*
   * Re-render whenever the hash changes.
   */

  window.addEventListener(
    'hashchange',
    renderRoute
  );

}




/* =========================================================
   START
   ========================================================= */

init();
