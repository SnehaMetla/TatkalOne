# Publishing Tatkal Booking website on GitHub Pages

The prototype ships as static files inside this folder. No build step, no
server, no dependencies. Push the contents of this folder to a repository,
flip a switch, done.

**Only the contents of `Code/` are uploaded to GitHub.** In the deployed
site, `Code/` disappears — everything in this folder becomes the site root.

---

## 1. Prerequisites

- A GitHub account.
- Git installed locally.

---

## 2. Push the contents of this folder to GitHub

Create a new repository on GitHub (empty, no README, no `.gitignore`).
Then, from **inside this `Code/` folder**:

```bash
cd "/path/to/project/Code"
git init
git add .
git commit -m "Initial commit — ProjectName prototype"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

Replace `<user>` and `<repo>` with your GitHub username and repository
name.

> Only push from inside `Code/`. Do not push the parent `project/` folder —
> `Brief/`, `DesignSystem/`, `Wireframes/`, and the master prompt are
> internal project material, not part of the deployed prototype.

---

## 3. Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings** (top nav) → **Pages** (left sidebar).
3. Under **Build and deployment**:
   - **Source:** *Deploy from a branch*
   - **Branch:** `main` (or whatever your default branch is called)
   - **Folder:** `/ (root)`
4. Click **Save**.
5. Wait ~30–90 seconds for the first deployment. Refresh the Pages
   settings page — it shows the live URL when the site is ready.

---

## 4. Open the prototype

The prototype is reachable at:

```
https://<user>.github.io/<repo>/
```

Every screen has a stable, shareable URL, for example:

```
https://<user>.github.io/<repo>/#/tracker
https://<user>.github.io/<repo>/#/confirmation
```

The app uses hash routing, so every route is bookmarkable and survives a
hard refresh.

---

## 5. What each file does

| File               | Purpose                                                       |
| ------------------ | ------------------------------------------------------------- |
| `index.html`       | App entry point. Loads CSS, JS module, and mounts the router. |
| `404.html`         | Fallback for any URL that GitHub Pages cannot resolve. Sends the visitor back into the app. |
| `.nojekyll`        | Empty file that tells GitHub Pages to skip Jekyll processing. Without it, files under `js/`, `css/`, or paths starting with `_` can be dropped or rewritten. |
| `css/`             | All styles. Split by concern (base, layout, components, states, responsive). |
| `js/`              | Application logic — router, views, mock data, state, UI helpers. |
| `components/`      | Reusable HTML snippets loaded on demand via `fetch()`.         |
| `README.md`        | Quick start.                                                   |                                                     |

---

## 6. Update the deployed site

Any commit to the default branch triggers a new deployment automatically.

```bash
git add .
git commit -m "Update prototype"
git push
```

Refresh the live URL after ~30–60 seconds.

---

## 7. Test locally first

Opening `index.html` by double-clicking will **not** work. The app uses
ES modules and `fetch()`, both of which require HTTP.

Serve this folder over HTTP:

```bash
cd "/path/to/project/Code"
python3 -m http.server 8080
```

Then visit `http://localhost:8080/`. Walk every hash route and refresh a
couple of them — behaviour on GitHub Pages will match exactly.

---

## 8. Custom domain (optional)

1. In **Settings → Pages**, add your domain under **Custom domain** and
   save. GitHub creates a `CNAME` file at the repo root.
2. At your DNS provider, add either:
   - A `CNAME` record pointing to `<user>.github.io.`, or
   - Four `A` records pointing to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
     `185.199.111.153`.
3. Enable **Enforce HTTPS** once the certificate provisions
   (usually within 15 minutes).

---

## 9. Troubleshooting

- **Blank page at the site root.** `index.html` is missing or was
  uploaded from the wrong folder. Push from inside `Code/`, not from
  `EPFO/`.
- **CSS or JS 404s.** Something references an absolute path (starts with
  `/`). Change it to a relative path (`css/base.css`, not `/css/base.css`).
- **Deep-link route returns 404.** The app uses hash routing (`#/route`)
  for exactly this reason. If someone switched to `history.pushState()`,
  revert it.
- **File loads locally but not on GitHub Pages.** Filename case does not
  match — GitHub Pages is case-sensitive, macOS/Windows are not. Rename
  to match exactly.
- **First deployment never appears.** Check **Settings → Pages** for the
  build status and the **Actions** tab for the *pages build and
  deployment* workflow log.

---

## 10. Take it down

**Settings → Pages → Unpublish site**. The URL becomes inactive; the
repository stays intact.
