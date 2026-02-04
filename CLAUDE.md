# SPprofile — ML Engineer Resume SPA

## What this is
A single-page application (SPA) serving as an online resume / personal portfolio
for an ML engineer. Designed to market the owner as a candidate.
Deployed on **GitHub Pages** (static, no backend, no build step).

## Tech stack
| Layer        | Choice        | Why                                                                 |
|--------------|---------------|---------------------------------------------------------------------|
| Interactivity| **Alpine.js** | Lightweight reactive JS (~15KB). Declarative state in HTML.        |
| Styling      | **Tailwind CSS** | Utility-first. Full visual control. Dark mode built-in.          |
| Custom CSS   | `styles.css`  | Animations, transitions, glassmorphism, view-switch effects.       |
| App logic    | `app.js`      | Alpine component state, view switching, theme toggle.               |

All dependencies loaded via CDN — no bundler, no build step, no package.json.

## File structure
```
SPprofile/
├── index.html      ← single entry point; imports CDNs, defines layout and Alpine markup
├── styles.css      ← custom CSS (animations, effects, overrides)
├── app.js          ← Alpine x-data component(s): state, view logic, theme
└── CLAUDE.md       ← this file
```

## View modes (reader-facing)
The reader can switch between these views via buttons in the UI:

| View key     | Description                                                     |
|--------------|-----------------------------------------------------------------|
| `synthesis`  | Condensed overview — key facts, headline summary                |
| `detailed`   | Full resume — all sections expanded                             |
| `skills`     | Reorganized around skill areas / tech stack                     |
| `projects`   | Reorganized around projects / portfolio / achievements          |

## Theme modes
- **Dark mode** / **Light mode** — toggled by the reader. Persisted in `localStorage`.

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

## Status
- [x] Project context documented
- [ ] HTML skeleton with CDN imports
- [ ] Base styles (Tailwind + custom CSS)
- [ ] Alpine state / view-switching logic
- [ ] Content populated (pending — owner will provide)
- [ ] Visual polish and transitions
- [ ] Tested across browsers
- [ ] Deployed to GitHub Pages
