# SPprofile — ML Engineer Resume SPA

## What this is
A single-page application (SPA) serving as an online resume / personal portfolio
for an ML engineer. Designed to market the owner as a candidate.
Deployed on **GitHub Pages** via automated build pipeline (GitHub Actions).

## Tech stack
| Layer        | Choice        | Why                                                                 |
|--------------|---------------|---------------------------------------------------------------------|
| Interactivity| **Alpine.js** | Lightweight reactive JS (~15KB). Declarative state in HTML.        |
| Styling      | **Tailwind CSS** | Utility-first. Layout, spacing, typography sizing (CDN only).   |
| Custom CSS   | `styles.css`  | All theming (dark/light via CSS vars), glassmorphism, transitions. |
| App logic    | `app.js`      | Alpine component state, view switching, theme toggle.               |
| Build tool   | **Vite**      | Dev server with hot reload, production bundler for optimization.    |

Dependencies: Alpine.js and Tailwind loaded via CDN. Vite used for dev + build.

## File structure
```
SPprofile/
├── src/                     ← source files (you edit these)
│   ├── index.html           ← shell with partial includes (EJS syntax)
│   ├── partials/            ← view sections split for maintainability
│   │   ├── hero-full.html   ← full hero (Profile/Contact views)
│   │   ├── hero-bar.html    ← compact hero bar (other views)
│   │   ├── profile.html     ← Profile view section
│   │   ├── focus.html       ← Focus view section
│   │   ├── resume.html      ← Resume view section
│   │   ├── skills.html      ← Skills view section
│   │   ├── portfolio.html   ← Portfolio view section
│   │   └── contact.html     ← Contact view section
│   ├── public/              ← files copied as-is to dist/ (no processing)
│   │   └── app.js           ← Alpine logic (must be in public/ to deploy)
│   ├── styles.css           ← theming (CSS vars), glassmorphism, transitions
│   └── resources/           ← static assets (photos, gifs)
│       ├── FaceWilRed.png   ← hero profile photo
│       ├── BI_wepapp.gif    ← Bayesian Inference App demo
│       └── BallisticQT.gif  ← UQ App desktop GUI demo
├── dist/                    ← built output (git-ignored, auto-deployed)
│   ├── index.html           ← single compiled file with all partials inlined
│   ├── app.js               ← copied from src/public/app.js (unprocessed)
│   └── assets/              ← bundled/minified CSS and optimized images
│       ├── main-*.css       ← minified styles.css with hash
│       ├── FaceWilRed-*.png ← optimized images with hash
│       ├── BI_wepapp-*.gif
│       └── BallisticQT-*.gif
├── .github/
│   └── workflows/
│       └── deploy.yml       ← GitHub Actions: auto-build and deploy on push
├── .nojekyll                ← tells GitHub Pages: don't use Jekyll, use our build
├── node_modules/            ← npm dependencies (git-ignored)
├── package.json             ← build scripts and dev dependencies
├── vite.config.js           ← Vite config: HTML partial injection, public folder
├── .gitignore               ← ignore node_modules, dist, OS files
├── README.md                ← short public description
└── CLAUDE.md                ← this file
```

## How Vite bundling works

### Build process (`npm run build`):
1. **Reads** `src/index.html`
2. **Injects** all partials inline via `<%- include('filename.html') %>` syntax
3. **Copies** `src/public/*` files to `dist/` as-is (no processing)
   - `src/public/app.js` → `dist/app.js` (preserves Alpine global function)
4. **Bundles & minifies** `src/styles.css` → `dist/assets/main-[hash].css`
5. **Optimizes & fingerprints** images from `src/resources/` → `dist/assets/[name]-[hash].[ext]`
6. **Updates** all asset paths in HTML to point to hashed filenames
7. **Outputs** single `dist/index.html` with all content inlined + optimized assets

### Why app.js is in `public/`:
- Alpine.js expects `resumeApp()` as a **global function**
- Using `<script type="module">` breaks Alpine (puts function in module scope)
- Using `<script src="./app.js">` (no module) requires Vite to copy the file as-is
- Vite's `public/` folder = files copied without bundling
- Result: `dist/app.js` exists and Alpine can call `resumeApp()`

### Dev server (`npm run dev`):
- Serves `src/` directory directly
- Hot reload for HTML, CSS, JS changes
- Partials are injected on-the-fly
- No build step needed during development

## View modes (reader-facing)
The reader can switch between these views via buttons in the UI:

| View key     | Description                                                     |
|--------------|-----------------------------------------------------------------|
| `profile`    | Condensed overview — who you are, top skills, key highlights    |
| `focus`      | Forward-looking: priorities, directions, what you're after      |
| `resume`     | Full resume — experience timeline + education                   |
| `skills`     | Reorganized around skill areas / tech stack                     |
| `portfolio`  | Curated projects and achievements with tech-stack tags          |
| `contact`    | Hypertext links — GitHub, LinkedIn, Google Scholar (SVG icons) |

## Navigation UX

### Tri-state buttons (Resume, Skills, Portfolio)
Sections with accordion content use tri-state navigation buttons with three visual states:

1. **Inactive** (gray) — Not on this section
   - Click → Navigate to section with all accordions collapsed
2. **Active-collapsed** (border highlight, bold text) — On section, accordions closed
   - Click → Expand all accordions
3. **Active-expanded** (fully colored, bold text) — On section, accordions open
   - Click → Collapse all accordions

**Tooltip behavior:**
- Discrete tooltips appear on hover
- Dynamic text based on current state:
  - Inactive: "View [Section]"
  - Active-collapsed: "Click again to expand all"
  - Active-expanded: "Click again to collapse all"
- Implementation: Alpine's `navTooltip()` method + CSS tooltip styling

**Navigation vs cross-links:**
- Direct navigation (nav buttons) → collapses all accordions (fresh view)
- Cross-links (internal links between sections) → expands target accordion (contextual)

### Simple buttons (Profile, Focus, Contact)
Sections without accordions use standard two-state buttons:
- Inactive (gray) → Active (colored)

## Theme modes
- **Dark mode** / **Light mode** — toggled by the reader via a button in the nav.
- Default theme is detected from the browser / OS setting (`prefers-color-scheme`).
- Explicit choice is persisted in `localStorage` and takes priority on next visit.
- Implementation: Alpine sets/removes a `dark` class on `<html>`. All colors are
  defined as CSS custom properties in `:root` (light) and `html.dark` (dark).
  Tailwind's `dark:` utility prefix is **not used** — the CDN defaults to
  media-query-based dark mode which doesn't respond to a class toggle.

## Design principles
- Desktop-first, responsive down to mobile.
- Modern / cutting-edge look (not generic Bootstrap). Glassmorphism, smooth transitions.
- Content is static (hardcoded). No database, no API calls.
- All interactivity is client-side via Alpine.js reactive state.

## Owner background / constraints
- Familiar with vanilla JS and React.
- Alpine.js is new — code should stay readable; patterns annotated where non-obvious.
- Tailwind is guided as we go.

## Development workflow

### First-time setup
```bash
npm install                  # Install dependencies (one-time)
```

### Development (live editing with hot reload)
```bash
npm run dev                  # Start Vite dev server at http://localhost:5173
                             # Edit src/ files → browser updates instantly
```
**What to edit:**
- `src/partials/*.html` — modify view sections
- `src/styles.css` — styling changes
- `src/public/app.js` — Alpine logic changes
- `src/resources/` — add/replace images

**Hot reload behavior:**
- HTML/CSS: Updates without page refresh
- JS: Browser auto-refreshes
- Changes appear in < 50ms

### Build for production
```bash
npm run build                # Outputs optimized files to dist/
```
**What happens:**
- Inlines all partials into single `dist/index.html`
- Copies `src/public/app.js` → `dist/app.js` (unprocessed)
- Bundles and minifies CSS → `dist/assets/main-[hash].css`
- Optimizes images → `dist/assets/[name]-[hash].[ext]`
- Updates all asset paths in HTML to hashed versions
- Output: **26.4 KB HTML (5.5 KB gzipped)** + assets

### Preview production build locally
```bash
npm run preview              # Serve dist/ folder locally to test build
```

## Deployment

### Automatic via GitHub Actions (current setup)
**How it works:**
1. Push to `main` branch
2. GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers
3. Workflow runs on `ubuntu-latest` runner:
   - Checks out code
   - Sets up Node.js 20
   - Runs `npm ci` (clean install)
   - Runs `npm run build` → generates `dist/`
   - Uploads `dist/` as GitHub Pages artifact
   - Deploys artifact to GitHub Pages
4. Site updates at `https://wfauriat.github.io/` within 1-2 minutes

**Requirements:**
- GitHub Pages configured with **Source: GitHub Actions** (not "Deploy from a branch")
- `.nojekyll` file in root (prevents GitHub from running Jekyll on the repo)
- Workflow has `pages: write` and `id-token: write` permissions (already configured)

**To verify deployment:**
- Check: `https://github.com/wfauriat/wfauriat.github.io/actions`
- Look for green checkmark ✓ on "Deploy to GitHub Pages" workflow
- Both jobs must succeed: `build` and `deploy`

### Manual deployment (not recommended)
```bash
npm run build                # Build locally
git add dist/                # Commit dist folder (defeats purpose of .gitignore)
git commit -m "Build for production"
git push
```
**Note:** This is NOT needed with GitHub Actions. Don't commit `dist/`.

### GitHub Pages configuration
- **Repository:** `wfauriat/wfauriat.github.io`
- **Source:** GitHub Actions (automatic deployment)
- **URL:** `https://wfauriat.github.io/`
- **Build tool:** Custom (Vite via GitHub Actions)
- **Jekyll:** Disabled via `.nojekyll` file

### Troubleshooting deployment
If site shows README instead of app:
- ✅ Verify `.nojekyll` exists in repo root
- ✅ Verify GitHub Pages source = "GitHub Actions" (not branch)
- ✅ Check Actions tab for failed builds
- ✅ Hard refresh browser (Ctrl+Shift+R)

If views don't work on deployed site:
- ✅ Check `dist/app.js` exists (should be 7.4 KB)
- ✅ Verify `src/public/app.js` is committed
- ✅ Check browser console for 404 errors

## TODO — before pushing / after cloning
- [ ] Set your real git identity (currently placeholder values):
  ```
  git config user.email "your.email@example.com"
  git config user.name  "Your Name"
  ```
- [x] SEO / social-sharing meta tags added (`<title>`, description, Open Graph, Twitter card)
  - NOTE: `og:url` and `og:image` use `https://wfauriat.github.io/` as base (root user site).
- [x] Vite build pipeline configured
- [x] GitHub Actions workflow for auto-deployment
- [x] HTML split into maintainable partials
- [x] `.nojekyll` added to disable GitHub's default Jekyll processing

## Status
- [x] Project context documented
- [x] HTML skeleton with CDN imports
- [x] Base styles (Tailwind + custom CSS, full dark/light theming via CSS variables)
- [x] Alpine state / view-switching logic
- [x] Content populated (first pass — education, experience, skills, projects)
- [x] Contact links wired (GitHub, LinkedIn, Google Scholar)
- [x] Portfolio cards: accordion fold/unfold, gif demos, concept + tech tag rows
- [x] Resume experience entries: accordion with cross-links to Portfolio
- [x] Hero: profile photo with circular crop and vertical offset tuning
- [x] Skills section: proficiency visualization with chevron bars, three-pillar structure
- [x] Tri-state navigation for accordion-heavy sections (Resume, Portfolio)
  - Visual states: inactive (gray) → active-collapsed (border highlight) → active-expanded (colored)
  - Discrete tooltips on hover explaining behavior
- [x] HTML restructured into maintainable partials
- [x] Vite build pipeline with hot reload
- [x] GitHub Actions auto-deployment configured and tested
- [x] **Deployed to GitHub Pages** — `https://wfauriat.github.io/` ✅
- [ ] Content refined (owner iteration in progress)
- [ ] Visual polish and transitions
- [ ] Tested across browsers (Chrome/Firefox/Safari)
