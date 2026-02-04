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

    // 'isDark' — drives the 'dark' class on <html>, which Tailwind uses for dark: utilities.
    isDark: true,   // default to dark mode

    // ── Lifecycle hook ─────────────────────────────────────────
    // Alpine calls init() automatically once the component is ready (like React's useEffect on mount).
    init() {
      const saved = localStorage.getItem('spprofile-theme');

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
      localStorage.setItem('spprofile-theme', this.isDark ? 'dark' : 'light');
    },

    // Return the CSS class string for a nav button based on whether it's the active view.
    // Used in index.html via :class="activeBtn('profile')"
    activeBtn(viewKey) {
      return this.view === viewKey ? 'btn-active' : 'btn-inactive';
    }
  };
}
