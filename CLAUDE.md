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
│   ├── partials/            ← view sections split for maintainability (bilingual)
│   │   ├── en/              ← English partials
│   │   │   ├── hero-full.html   ← full hero (Profile/Contact views)
│   │   │   ├── hero-bar.html    ← compact hero bar (other views)
│   │   │   ├── profile.html     ← Profile view section
│   │   │   ├── focus.html       ← Focus view section
│   │   │   ├── resume.html      ← Resume view section
│   │   │   ├── skills.html      ← Skills view section
│   │   │   ├── portfolio.html   ← Portfolio view section
│   │   │   ├── publications.html ← Publications view section
│   │   │   └── contact.html     ← Contact view section
│   │   └── fr/              ← French partials (same structure as en/)
│   │       ├── hero-full.html
│   │       ├── hero-bar.html
│   │       ├── profile.html
│   │       ├── focus.html
│   │       ├── resume.html
│   │       ├── skills.html
│   │       ├── portfolio.html
│   │       ├── publications.html
│   │       └── contact.html
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

## Language toggle (Bilingual: English / French)
- **English** / **French** — toggled by the reader via a flag button (🇬🇧/🇫🇷) in the nav.
- Default language is English
- Language choice is persisted in `localStorage` and restored on next visit.
- **Implementation:**
  - Alpine state: `lang: 'en'` or `'fr'`
  - Method: `toggleLang()` switches between languages and saves to localStorage
  - HTML structure: Two conditional divs with `x-show="lang === 'en'"` and `x-show="lang === 'fr'"`
  - Partials organized in `src/partials/en/` and `src/partials/fr/` subdirectories
  - Vite includes both language versions in build (content duplication acceptable for static site)
  - Alpine's `x-transition` provides smooth fade between languages

## Theme modes
- **Dark mode** / **Light mode** — toggled by the reader via a button in the nav.
- Default theme is detected from the browser / OS setting (`prefers-color-scheme`).
- Explicit choice is persisted in `localStorage` and takes priority on next visit.
- Implementation: Alpine sets/removes a `dark` class on `<html>`. All colors are
  defined as CSS custom properties in `:root` (light) and `html.dark` (dark).
  Tailwind's `dark:` utility prefix is **not used** — the CDN defaults to
  media-query-based dark mode which doesn't respond to a class toggle.

## Content structure

### Accordion pattern (Resume & Portfolio)
Experience, Education, and Portfolio entries use a **synthetic + detailed** accordion pattern:

**Synthetic content** (always visible):
- Title, company/institution, date range
- One-line summary of role/project

**Detailed content** (expandable via accordion):
- Sub-card appearance with `.expanded-detail` class
- Styled with subtle background, left border accent, and padding for visual hierarchy
- Structured sections:
  - **Experience**: Context, Key Achievements, Technologies, Cross-links to Portfolio
  - **Education**: Dissertation, Research Focus, Outcomes, Cross-links
  - **Portfolio**: Full description, features list, screenshots/demos, concept tags, tech stack tags, cross-links to Skills

**Visual treatment:**
- Expanded content appears as a nested "sub-card" within the entry
- Date ranges sized at `text-sm` (increased from `text-xs` for readability)
- Company/institution names use `font-medium` subtitle styling
- Larger padding and distinct background differentiate from synthetic summary

### Cross-linking system
Internal navigation links between sections that auto-expand target content:
- Resume (Experience) → Portfolio projects
- Portfolio projects → Skills sections
- Education → Portfolio/research work

## Color coding system

Visual categorization through a 3-color pill taxonomy:

### **Tech Stack (Orange)** 🟠
Languages, frameworks, libraries, tools
- **Light mode:** `rgba(251, 146, 60, 0.12)` bg + `#ea580c` text (orange-600)
- **Dark mode:** `rgba(251, 146, 60, 0.18)` bg + `#fdba74` text (orange-300)
- **CSS class:** `.tech-tag`
- **Examples:** Python, React, Flask, Docker, NumPy, Git

### **CS Concepts (Teal)** 🟦
Software engineering, algorithms, architecture
- **Light mode:** `rgba(20, 184, 166, 0.12)` bg + `#0d9488` text (teal-600)
- **Dark mode:** `rgba(20, 184, 166, 0.18)` bg + `#5eead4` text (teal-300)
- **CSS class:** `.concept-cs`
- **Examples:** Full-Stack Development, Software Engineering, API Design, System Architecture

### **Data Science Concepts (Purple)** 🟣
Mathematics, statistics, domain expertise
- **Light mode:** `rgba(147, 51, 234, 0.10)` bg + `#7c3aed` text (purple-600)
- **Dark mode:** `rgba(147, 51, 234, 0.18)` bg + `#c4b5fd` text (purple-300)
- **CSS class:** `.concept-ds`
- **Examples:** Bayesian Inference, MCMC, Uncertainty Quantification, Statistical Decision Theory

### **UI Structure (Indigo)**
Titles, subtitles, accents remain indigo (neutral brand color, separate from content categorization)

**Design rationale:**
- Strong visual contrast between categories (warm orange vs cool teal/purple)
- Semantic grouping: Theory (purple) vs Application (teal) vs Tools (orange)
- Quick cognitive scanning for recruiters and readers
- Works beautifully in both light and dark themes

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
- [x] Experience/Education templates: synthetic+detailed accordion pattern with structured sections
- [x] Sub-card styling (.expanded-detail) for visually distinct expanded accordion content
- [x] Portfolio cards: accordion fold/unfold, gif demos, concept + tech tag rows, tech stack tags
- [x] Resume experience entries: accordion with cross-links to Portfolio
- [x] Cross-linking system between Resume, Portfolio, and Skills sections
- [x] Hero: profile photo with circular crop and vertical offset tuning
- [x] Skills section: proficiency visualization with chevron bars, three-pillar structure
- [x] Tri-state navigation for accordion-heavy sections (Resume, Portfolio)
  - Visual states: inactive (gray) → active-collapsed (border highlight) → active-expanded (colored)
  - Discrete tooltips on hover explaining behavior
- [x] HTML restructured into maintainable partials
- [x] Vite build pipeline with hot reload
- [x] GitHub Actions auto-deployment configured and tested
- [x] **Deployed to GitHub Pages** — `https://wfauriat.github.io/` ✅
- [x] Bilingual implementation (English/French toggle)
  - Partials organized in en/ and fr/ subdirectories
  - Language toggle button with localStorage persistence
  - Sample French translations in hero, profile, and focus sections
- [ ] Content population in progress (English baseline, French translation pending)
- [ ] Visual polish and transitions
- [ ] Tested across browsers (Chrome/Firefox/Safari)
