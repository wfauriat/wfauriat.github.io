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
│   ├── index.html           ← shell with partial includes
│   ├── partials/            ← view sections split for maintainability
│   │   ├── hero-full.html   ← full hero (Profile/Contact views)
│   │   ├── hero-bar.html    ← compact hero bar (other views)
│   │   ├── profile.html     ← Profile view section
│   │   ├── focus.html       ← Focus view section
│   │   ├── resume.html      ← Resume view section
│   │   ├── skills.html      ← Skills view section
│   │   ├── portfolio.html   ← Portfolio view section
│   │   └── contact.html     ← Contact view section
│   ├── styles.css           ← theming (CSS vars), glassmorphism, transitions
│   ├── app.js               ← Alpine component state, view logic, theme toggle
│   └── resources/           ← static assets (photos, gifs)
│       ├── FaceWilRed.png   ← hero profile photo
│       ├── BI_wepapp.gif    ← Bayesian Inference App demo
│       └── BallisticQT.gif  ← UQ App desktop GUI demo
├── dist/                    ← built output (git-ignored, auto-deployed)
│   └── index.html           ← single compiled file with all partials inlined
│       assets/...           ← bundled/minified JS and CSS
├── .github/
│   └── workflows/
│       └── deploy.yml       ← GitHub Actions: auto-build and deploy on push
├── node_modules/            ← npm dependencies (git-ignored)
├── package.json             ← build scripts and dev dependencies
├── vite.config.js           ← Vite config: HTML partial injection
├── .gitignore               ← ignore node_modules, dist, OS files
├── README.md                ← short public description
└── CLAUDE.md                ← this file
```

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
- Edit `src/partials/*.html` to modify view sections
- Edit `src/styles.css` for styling changes
- Edit `src/app.js` for Alpine logic changes
- Hot reload works for all file types (HTML, CSS, JS)

### Build for production
```bash
npm run build                # Outputs optimized files to dist/
```
- Inlines all partials into single `dist/index.html`
- Bundles and minifies JS and CSS
- Optimizes images
- Output is ready for deployment

### Preview production build locally
```bash
npm run preview              # Serve dist/ folder locally to test build
```

## Deployment

**Automatic via GitHub Actions:**
- Push to `main` branch triggers `.github/workflows/deploy.yml`
- GitHub Actions runs `npm ci && npm run build`
- Deploys `dist/` folder to GitHub Pages automatically
- Site updates within 1-2 minutes of push

**Manual deployment (if needed):**
```bash
npm run build                # Build locally
# Commit dist/ folder (or configure GH Pages to serve from /dist)
git add dist/
git commit -m "Build for production"
git push
```

**GitHub Pages settings:**
- Repository: `wfauriat/wfauriat.github.io`
- Source: GitHub Actions (automatic deployment)
- URL: `https://wfauriat.github.io/`

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
- [x] HTML restructured into maintainable partials
- [x] Vite build pipeline with hot reload
- [x] GitHub Actions auto-deployment
- [ ] Content refined (owner iteration in progress)
- [ ] Visual polish and transitions
- [ ] Tested across browsers
- [ ] Deployed to GitHub Pages
