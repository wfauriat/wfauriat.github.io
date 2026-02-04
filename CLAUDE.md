# SPprofile — ML Engineer Resume SPA

## What this is
A single-page application (SPA) serving as an online resume / personal portfolio
for an ML engineer. Designed to market the owner as a candidate.
Deployed on **GitHub Pages** (static, no backend, no build step).

## Tech stack
| Layer        | Choice        | Why                                                                 |
|--------------|---------------|---------------------------------------------------------------------|
| Interactivity| **Alpine.js** | Lightweight reactive JS (~15KB). Declarative state in HTML.        |
| Styling      | **Tailwind CSS** | Utility-first. Layout, spacing, typography sizing (CDN only).   |
| Custom CSS   | `styles.css`  | All theming (dark/light via CSS vars), glassmorphism, transitions. |
| App logic    | `app.js`      | Alpine component state, view switching, theme toggle.               |

All dependencies loaded via CDN — no bundler, no build step, no package.json.

## File structure
```
SPprofile/
├── index.html        ← single entry point; imports CDNs, defines layout and Alpine markup
├── styles.css        ← theming (CSS vars for dark/light), glassmorphism, transitions
├── app.js            ← Alpine x-data component(s): state, view logic, theme toggle
├── ressource/        ← static assets (photos, gifs)
│   ├── FaceWilRed.png      ← hero profile photo
│   ├── BI_wepapp.gif       ← Bayesian Inference App demo
│   └── BallisticQT.gif     ← UQ App desktop GUI demo
├── README.md         ← short public description of the project
└── CLAUDE.md         ← this file
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

## Deployment
GitHub Pages. Serve `index.html` from repo root (or `/docs` folder if preferred).
All links are HTTPS. No build step required.

## TODO — before pushing / after cloning
- [ ] Set your real git identity (currently placeholder values):
  ```
  git config user.email "your.email@example.com"
  git config user.name  "Your Name"
  ```
- [x] SEO / social-sharing meta tags added (`<title>`, description, Open Graph, Twitter card)
  - NOTE: `og:url` and `og:image` use `https://wfauriat.github.io/` as base (root user site).
## Status
- [x] Project context documented
- [x] HTML skeleton with CDN imports
- [x] Base styles (Tailwind + custom CSS, full dark/light theming via CSS variables)
- [x] Alpine state / view-switching logic
- [x] Content populated (first pass — education, experience, skills, projects)
- [x] Contact links wired (GitHub, LinkedIn, Google Scholar) — both Contact view and floating card
- [x] Portfolio cards: accordion fold/unfold, gif demos, concept + tech tag rows
- [x] Resume experience entries: accordion with cross-links to Portfolio
- [x] Hero: profile photo with circular crop and vertical offset tuning
- [ ] Content refined (owner iteration in progress)
- [ ] Visual polish and transitions
- [ ] Tested across browsers
- [ ] Deployed to GitHub Pages
