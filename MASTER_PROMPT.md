# Build the Product Prototype (GitHub Pages edition)

Act as a **Senior Product Designer + UX Engineer + Frontend Engineer**.

Your task is to turn the research, product thinking, user flow, low-fidelity
wireframes, and design-system guidance in this repository into a **polished,
functional, high-fidelity prototype that is directly deployable on GitHub Pages
with no build step**.

This is not a screenshot-to-code task.

First understand the problem and user journey. Then understand the wireframes.
Then establish the visual system. Then build and validate the prototype. Then
verify it runs on GitHub Pages exactly as it runs locally.

---

## 1. Source of Truth

The working repository is structured as:

```text
/
├── Brief/
│   └── brief.txt
│
├── Wireframes/
│   ├── screen_1.jpg
│   ├── screen_2.jpg
│   ├── screen_3.jpg
│   └── screen_n.jpg
│
├── DesignSystem/
│   ├── designsystem.txt
│   ├── instructions.txt
│   └── rules.txt
│
├── MASTER_PROMPT.md         (this file — internal, not deployed)
│
└── Code/                    ← ONLY this folder is uploaded to GitHub
    ├── .nojekyll            (disables Jekyll processing on GitHub Pages)
    ├── index.html           (app entry point — becomes the site root)
    ├── 404.html             (fallback for unresolvable URLs)
    ├── README.md            (quick start)
    ├── DEPLOY.md            (deployment walkthrough)
    ├── css/
    ├── js/
    └── components/
```

Only the contents of `Code/` ship to GitHub. When pushed, `Code/`
disappears and its contents become the GitHub Pages site root. Everything
else — `Brief/`, `DesignSystem/`, `Wireframes/`, this master prompt — is
internal project material and stays out of the deployed repository.

Use these sources in this order:

### `Brief/brief.txt`

This is the source of truth for the **product problem and user context**.

Understand:

* Research
* User problems
* Business problems
* Personas
* Problem statement
* User journey
* User flow
* Product requirements
* Constraints
* Opportunities
* Success criteria

Do not build something that looks good but fails to address the problem
described here.

---

### `/Wireframes`

These are the source of truth for the **screen structure and intended UX**.

Inspect every wireframe carefully.

Understand:

* Information hierarchy
* Content
* Screen purpose
* Primary CTA
* Secondary actions
* Navigation
* Inputs
* Components
* Relationships between screens
* Intended interaction
* Overall journey

Translate the low-fidelity intent into a polished interface.

Do not unnecessarily redesign the product or change its core flow.

You may improve hierarchy, usability, accessibility, interaction clarity, and
visual quality while preserving the underlying product intent.

---

### `DesignSystem/instructions.txt`

Read this file **before making design or implementation decisions**.

It contains additional instructions for how the design system and prototype
should be approached.

**Do not duplicate its contents in this prompt.** Follow the file directly.

---

### `DesignSystem/rules.txt`

Read this file **before writing code**.

It contains the technical, UX, accessibility, prototype, performance,
architecture, and implementation constraints that must be followed.

**Do not reproduce those rules in this prompt.** Treat that file as an
authoritative specification.

If this prompt and either DesignSystem instruction/rule file appear to
conflict, follow the more specific/current instruction in the DesignSystem
files.

---

### `DesignSystem/designsystem.txt`

This is the living design-system document.

If it is empty, establish the design system based on:

1. The brief
2. Wireframes
3. `instructions.txt`
4. `rules.txt`
5. Consistent visual decisions made during implementation

Keep it concise, structured, and useful.

Document the **actual system being implemented**, not unnecessary theoretical
design principles.

---

## 2. Before Coding

Do not write application code immediately.

First inspect:

1. `Brief/brief.txt`
2. Every file in `/Wireframes`
3. `DesignSystem/instructions.txt`
4. `DesignSystem/rules.txt`
5. `DesignSystem/designsystem.txt`

Then form a clear understanding of:

### Product

* What is being built?
* Why does it exist?
* What user problem does it solve?
* What business problem does it solve?

### User

* Who is the primary user?
* What is their context?
* What are they trying to accomplish?
* Where are they likely to struggle?

### Journey

Identify the complete journey:

```text
Entry
↓
Action
↓
Processing / Waiting
↓
Outcome
↓
Recovery where required
```

### Screens

For each wireframe, identify:

* Purpose
* User goal
* Key content
* Primary action
* Secondary actions
* Inputs
* States
* Navigation
* Next step

Build a mental map of the complete experience before implementation.

---

## 3. Do Not Over-Interpret the Wireframes

The wireframes are low fidelity.

They define **UX intent**, not necessarily final visual styling.

Preserve:

* Information architecture
* Important content
* Screen purpose
* Core interactions
* User flow
* Relative hierarchy

Improve:

* Typography
* Spacing
* Visual hierarchy
* Accessibility
* Component consistency
* Interaction feedback
* Responsive behaviour
* States
* Overall polish

Do not introduce unrelated product functionality simply because it would make
the prototype look more sophisticated.

---

## 4. Design Before You Implement

Before creating individual screens, identify the reusable visual language.

Establish a coherent system for:

* Typography
* Colour
* Spacing
* Grid
* Containers
* Borders
* Radius
* Elevation
* Buttons
* Inputs
* Cards
* Navigation
* Status indicators
* Feedback states
* Overlays
* Progress indicators
* Other repeated components

Use the existing DesignSystem files as the primary guidance.

Do not invent a separate design language for each screen.

The entire prototype should feel like **one product designed by one team**.

---

## 5. Build a Real Prototype

The final result must be a **working prototype**, not a collection of static
screens.

A reviewer should be able to enter the product and complete the intended
journey without needing an explanation.

Make meaningful interactions functional. Navigation works, buttons perform
their intended action, forms accept input, selections update, modals open and
close, bottom sheets behave correctly, progress updates, success states follow
successful actions, error states provide a recovery path, and user progress
behaves consistently throughout the journey.

Use mock behaviour where real backend functionality is outside the scope of
the prototype.

Follow `DesignSystem/rules.txt` for how mock data, state, loading, errors,
sessions, and prototype behaviour must be handled.

---

## 6. Prototype-Specific Requirements

The prototype must directly demonstrate the core problem identified in the brief:
uncertainty after Tatkal payment.

The primary experience must clearly answer:

1. Was my payment successful?
2. Was my booking processed?
3. Was my ticket issued?
4. What is my ticket status?
5. What happened to my seat?
6. What happened to my money?
7. Should I wait or retry?
8. What should I do next?

The four-stage timeline remains the primary solution:

Payment → Booking Status → Ticket Status → Seat Allotment

The prototype must demonstrate all six booking scenarios defined in the brief.

For each scenario, clearly distinguish:
- Completed
- Current
- Pending
- Failed

For scenarios involving payment deduction without ticket confirmation,
show clear refund/payment guidance and an expected timeline where the
mock scenario provides one.

Do not make the user navigate to another screen simply to understand
whether they should wait, retry, or take another action.

The status screen must provide a clear "What should I do now?" section.

The prototype/demo scenario selector must be clearly identified as
prototype functionality and must never appear to be real IRCTC functionality.

Before completion, verify every scenario has:
- Clear status
- Clear current stage
- Clear next action
- Clear payment outcome
- Clear ticket outcome
- Recovery guidance where required.

## 7. Design for the Real User

Do not design only for an ideal desktop user.

Consider:

* Mobile usage
* Slow networks
* Low-end devices
* Different screen sizes
* Limited digital literacy
* Accessibility
* Interrupted journeys
* User mistakes
* Loading
* Failure
* Recovery
* Returning to an unfinished journey

A successful prototype is not one where nothing fails — it is one where the
user knows **what happened and what to do next**.

---

## 8. States Are Part of the Product

Do not design only the happy path.

Where relevant, implement:

```text
Default → Interaction → Loading / Processing → Success
Default → Interaction → Error → Recovery
```

Also consider empty, disabled, validation, partial completion, interrupted
sessions, timeout, retry, confirmation, and pending states. Use the rules in
`DesignSystem/rules.txt` for the exact requirements around these states.

---

## 9. Use Realistic Content

Avoid meaningless placeholder content.

Do not fill the interface with:

```text
Lorem ipsum
Test User
ABC
123
Sample text
```

unless the wireframe or brief explicitly requires placeholders.

Use realistic content that makes the prototype believable.

Where the product involves Indian users or services, follow the data
conventions and privacy requirements defined in the DesignSystem files.

Never introduce real sensitive personal information.

---

## 10. Component Architecture

Build reusable components rather than duplicating the same UI across screens.

Identify patterns that appear more than once and make them reusable
(header, navigation, button, input, card, status, progress, modal, bottom
sheet, error, success, timeline, demo banner, etc.).

The exact architecture should follow the technical requirements in
`DesignSystem/rules.txt`.

Keep files small and understandable. If a file becomes unnecessarily large or
difficult to understand, refactor it.

---

## 11. Keep Code and Design System in Sync

As implementation progresses, update `DesignSystem/designsystem.txt`.

Only record decisions that are actually being used. Do not create an
unnecessarily long design-system document. The purpose is to make the next
iteration easier.

---

## 12. Prototype Scope

Do not overengineer.

Prioritise:

**UX quality + functional interaction + visual fidelity + believable
behaviour** over **production backend infrastructure**.

Do not introduce unnecessary:

* Backend systems
* Databases
* Authentication infrastructure
* Production APIs
* Complex state-management systems
* Deployment infrastructure

unless explicitly required by the brief or DesignSystem files.

Simulate functionality where appropriate.

---

## 13. GitHub Pages Deployment (Non-negotiable)

Only the contents of `Code/` are pushed to GitHub. On deployment, `Code/`
disappears and its contents become the GitHub Pages site root. The
prototype must run **as-is** at `https://<user>.github.io/<repo>/` with no
build step, no server, and no post-processing.

### Hard constraints

* **No build step.** No bundlers, no compilers, no server-side rendering.
  Ship the files the browser executes.
* **Static and self-contained.** Every asset the prototype references
  lives inside `Code/`.
* **Vanilla technologies only** unless the DesignSystem files say
  otherwise: HTML, CSS, and ES-module JavaScript loaded with
  `<script type="module" src="js/main.js"></script>`.
* **All paths are relative** (`css/base.css`, `components/foo.html`,
  `./views.js`). Never use absolute paths that start with `/` — those
  break on project-site deployments served under `/<repo>/`.
* **File names are case-correct and free of spaces.** GitHub Pages runs
  on a case-sensitive filesystem; local macOS/Windows will hide the bug.
* **`.nojekyll` at the top of `Code/`** so Jekyll does not skip files
  under `js/`, `css/`, or dot-files.
* **Hash routing (`#/route`).** No `history.pushState()` — GitHub Pages
  cannot rewrite unknown paths to `index.html`, so anything other than a
  hash router will 404 on hard refresh.
* **`Code/index.html`** is the site entry point.
* **`Code/404.html`** is the fallback for any URL GitHub Pages cannot
  resolve; it returns the visitor to `index.html`.
* **`fetch()` is fine.** Every `fetch()` must target a relative path
  inside the app (`components/support-sheet.html`, not `/components/...`).
* **Persistence is `localStorage` only.** No IndexedDB migrations, no
  service workers unless the DesignSystem files require them.
* **Never open the prototype from `file://`.** ES modules and `fetch()`
  need HTTP. Document the local-run command in `Code/README.md`
  (for example, `python3 -m http.server 8080`).

### GitHub Pages setup the deliverable assumes

1. From inside `Code/`, initialise a repo and push to GitHub.
2. **Settings → Pages** → *Deploy from a branch* → branch = default,
   folder = `/ (root)`.
3. First deployment publishes at `https://<user>.github.io/<repo>/`.

Document this in `Code/DEPLOY.md` (walkthrough) and `Code/README.md`
(quick start).

### Things that will silently break on GitHub Pages

* An `<img src="/logo.svg">` — works locally under a server rooted at
  `/`, 404s on a project site served under `/<repo>/`.
* A file named `File.png` referenced as `file.png`.
* A folder or filename that starts with `_` — Jekyll skips it (mitigated
  by `.nojekyll`, but still worth avoiding).
* `history.pushState('/checkout')` — reloading the URL 404s.
* A script tag without `type="module"` when the code uses `import`.
* Fetching cross-origin fonts or images without the correct CORS headers.
* Pushing the whole `EPFO/` folder instead of the contents of `Code/` —
  the site root becomes `Code/` in the URL and nothing at
  `<repo>/` works.

---

## 14. Validate Against the Original Problem

After implementing the prototype, go back to `Brief/brief.txt`.

Ask:

> Does this prototype actually solve the problem described in the research?

Then review every wireframe again.

Ask:

> Did the implementation preserve the intended UX?

Then review `DesignSystem/instructions.txt` and `DesignSystem/rules.txt`.

Ask:

> Did I violate anything?

Fix issues before considering the prototype complete.

---

## 15. Perform a Full Journey Test

Use the prototype **through a real HTTP server** (not `file://`) as if you
were the target user.

Start from the beginning. Complete the entire journey. Do not skip screens.

Test primary path, important alternate paths, error states, recovery,
refresh/reload of every hash route, returning to an incomplete journey,
form interactions, navigation, loading states, and success states.

Look for dead ends, broken navigation, incorrect states, lost user data,
inconsistent UI, unclear actions, layout issues, console errors, broken
assets, overflow, and accessibility issues. Fix what you find.

### GitHub Pages parity check

After the local pass, do at least one of the following:

* Deploy to a temporary GitHub Pages site (a throwaway repo is fine) and
  walk the entire journey there.
* Or, at minimum, run a static server from the repo root (not from `Code/`)
  to emulate the deployed URL shape, then verify:
  * The root URL redirects into the app.
  * Every hash route works on hard refresh.
  * `fetch()`ed components load.
  * The console is clean.
  * Nothing depends on `/`-anchored URLs.

---

## 16. Visual QA

Review every implemented screen against its wireframe. Check hierarchy,
layout, typography, components, CTA prominence, states, and responsiveness.
Do not settle for "technically working" — refine until it feels deliberate.

---

## 17. Avoid AI-Generated UI Patterns

Do not add visual decoration simply to make the prototype look impressive.

Avoid unnecessary gradients, glassmorphism, excessive rounded cards,
excessive shadows, decorative illustrations, random animations, unnecessary
badges, generic SaaS layouts, random icon styles, visual noise, redundant
cards, and arbitrary colours.

Every visual element should support **understanding, trust, navigation,
action, or feedback.**

---

## 18. Final Quality Bar

Evaluate the prototype from four perspectives.

* **Product Designer** — Does it solve the right problem?
* **UX Designer** — Can the user complete the journey without assistance?
* **Frontend Engineer** — Is the implementation clean and maintainable, and
  does it deploy on GitHub Pages without special handling?
* **Reviewer / Judge** — Does the prototype convincingly demonstrate the
  product idea when opened at the live URL?

The most important question is:

> **Does this actually make the user's life easier?**

Not:

> Does this look impressive?

---

## 19. Final Deliverable

Put the complete working prototype inside `Code/`. That folder is what gets
pushed to GitHub — its contents become the deployed site root, so it must
contain everything the app needs at runtime (`index.html`, `404.html`,
`.nojekyll`, `css/`, `js/`, `components/`, and the deploy docs).

Do not put generated application code anywhere else in the repository. Do
not create unnecessary files. Do not duplicate functionality. Do not
create alternative implementations "just in case".

Prefer the simplest clean implementation that satisfies the brief and the
DesignSystem specifications.

---

## 20. Final Response

When the prototype is complete, provide a concise summary containing:

### Built

What screens and core functionality were implemented.

### Interactions

What parts of the journey are actually interactive.

### Design System

What was established or updated in `DesignSystem/designsystem.txt`.

### Validation

Whether the prototype was tested end-to-end on a real HTTP server that
emulates the GitHub Pages URL shape, and whether any known limitations
remain.

### Deployment

The exact steps to enable GitHub Pages for this repository, and the URL the
prototype will be reachable at.

Be honest about what is mocked versus what is actually implemented. Do not
claim functionality that does not exist.

---

# Execution Principle

Follow this sequence:

```text
READ
↓
UNDERSTAND
↓
MAP THE JOURNEY
↓
INSPECT WIREFRAMES
↓
CHECK DESIGN SYSTEM
↓
PLAN COMPONENTS
↓
BUILD (GitHub-Pages-safe from the first commit)
↓
CONNECT INTERACTIONS
↓
TEST OVER HTTP
↓
DEPLOY OR SIMULATE DEPLOYMENT
↓
REFINE
↓
DOCUMENT
```

**Do not skip directly from wireframes to code.** The objective is to produce
a **clean, believable, functional prototype that solves the researched user
problem and opens correctly at a live GitHub Pages URL**, not merely a
visually polished implementation of the wireframes.
