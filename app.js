/*
 * app.js — Alpine.js component for the resume SPA
 *
 * ── How Alpine works (React developer cheat sheet) ──
 *   React concept              Alpine equivalent
 *   ─────────────────────────  ──────────────────────────────
 *   useState('synthesis')      x-data="{ view: 'synthesis' }"   ← state lives here
 *   <div v-if={cond}>         x-show="cond"                    ← conditional display
 *   onClick={() => …}         @click="…"                       ← event handler
 *   {isDark ? 'A' : 'B'}      x-text="isDark ? 'A' : 'B'"     ← text interpolation
 *   className={dynamic}        :class="expression"              ← dynamic attributes
 *
 * Alpine scans the DOM on page load and binds everything declared with x-* / @ / :.
 * No virtual DOM, no diffing — it mutates the real DOM directly, which is fine at this scale.
 *
 * The function below is registered as a "magic" component via Alpine.data() at the bottom.
 * index.html references it with:  x-data="resumeApp()"
 */
function resumeApp() {
  return {
    // ── State ──────────────────────────────────────────────────
    // 'view'  — which content section is visible. Matches the x-show conditions in HTML.
    view: 'profile',

    // 'isDark' — drives the 'dark' class on <html>.
    // Default value here is just a placeholder; init() immediately overwrites it
    // based on localStorage or system preference. We default to false (light) to
    // avoid a flash-of-dark if the user prefers light mode.
    isDark: false,

    // 'highlight' — data-id of a card that should pulse when it appears.
    // Set by switchTo(), auto-cleared after 1.8s. null = no highlight.
    highlight: null,

    // Accordion state — Resume (experience) and Portfolio cards.
    // Keys match the first argument passed to toggleEntry() in the HTML.
    expanded: {
      research:   false,
      postdoc:    false,
      consultant: false,
      phd:        false,
      bayesian:   false,
      uq:         false
    },

    // ── Lifecycle hook ─────────────────────────────────────────
    // Alpine calls init() automatically once the component is ready (like React's useEffect on mount).
    init() {
      const saved = localStorage.getItem('wfauriat-theme');
      if (saved !== null) {
        // User has an explicit preference stored — honour it.
        this.isDark = saved === 'dark';
      } else {
        // No stored preference: detect the browser / OS setting.
        // prefers-color-scheme is a media query the browser exposes based on the
        // user's system theme (Settings → Appearance on most OS).
        this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    },

    // ── Methods ────────────────────────────────────────────────

    // Toggle dark/light mode and persist the choice.
    toggleTheme() {
      this.isDark = !this.isDark;
      localStorage.setItem('wfauriat-theme', this.isDark ? 'dark' : 'light');
    },

    // Return the CSS class string for a nav button based on whether it's the active view.
    activeBtn(viewKey) {
      return this.view === viewKey ? 'btn-active' : 'btn-inactive';
    },

    // Toggle one accordion entry open / closed.
    // key must match a key in this.expanded (e.g. 'research').
    toggleEntry(key) {
      this.expanded[key] = !this.expanded[key];
    },

    // Switch to a view and optionally highlight a target card.
    // highlightId should match a data-id attribute on the target card.
    // The highlight auto-clears after 1.8 s so the pulse animation can finish.
    switchTo(viewKey, highlightId) {
      this.view = viewKey;
      if (highlightId) {
        this.highlight = highlightId;

        // Auto-expand if it's an accordion item
        if (this.expanded.hasOwnProperty(highlightId)) {
          this.expanded[highlightId] = true;
        }

        // Scroll the target card into view after DOM updates
        this.$nextTick(() => {
          const target = document.querySelector(`[data-id="${highlightId}"]`);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });

        setTimeout(() => { this.highlight = null; }, 1800);
      }
    }
  };
}
