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

import './styles.css'
import Alpine from 'alpinejs'

// Register the component BEFORE starting Alpine
Alpine.data('resumeApp', resumeApp)

window.Alpine = Alpine
Alpine.start()

function resumeApp() {
  return {
    // ── State ──────────────────────────────────────────────────
    // 'view'  — which content section is visible. Matches the x-show conditions in HTML.
    view: sessionStorage.getItem('view') || 'profile',

    // 'isDark' — drives the 'dark' class on <html>.
    // Default value here is just a placeholder; init() immediately overwrites it
    // based on localStorage or system preference. We default to false (light) to
    // avoid a flash-of-dark if the user prefers light mode.
    isDark: false,

    // 'highlight' — data-id of a card that should pulse when it appears.
    // Set by switchTo(), auto-cleared after 1.8s. null = no highlight.
    highlight: null,

    // 'mobileMenuOpen' — controls mobile hamburger menu visibility
    mobileMenuOpen: false,

    // 'lang' — current language (en or fr)
    lang: localStorage.getItem('default-lang') || 'en',

    // Accordion state — Resume (experience), Portfolio, and Publications cards.
    // Keys match the first argument passed to toggleEntry() in the HTML.
    expanded: {
      CEA:        false,
      postdoc:    false,
      fullst_deg: false,
      phd_edu:    false,  // PhD education entry
      bayesian:   false,
      uq:         false,
      imgAPI:     false,
      aksys:      false,  // AK-SYS publication
      voi:        false,   // Value of Information publication
      roadinf:    false
    },

    // ── Accordion section config ───────────────────────────────
    // Sections that support expand-all / collapse-all behavior
    accordionSections: ['resume', 'portfolio', 'publications'],

    // Keys grouped by section for expand/collapse all
    // Skills has no accordions currently, but included for future-proofing
    sectionAccordions: {
      resume: ['CEA', 'postdoc', 'fullst_deg' ,'phd_edu'],
      skills: [],
      portfolio: ['bayesian', 'uq', 'imgAPI'],
      publications: ['aksys', 'voi', 'roadinf']
    },

    // ── Lifecycle hook ─────────────────────────────────────────
    // Alpine calls init() automatically once the component is ready (like React's useEffect on mount).
    init() {
      const saved = localStorage.getItem('default-theme');
      if (saved !== null) {
        // User has an explicit preference stored — honour it.
        this.isDark = saved === 'dark';
      } else {
        // No stored preference: detect the browser / OS setting.
        // prefers-color-scheme is a media query the browser exposes based on the
        // user's system theme (Settings → Appearance on most OS).
        this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      window.scrollTo(0, 0);

      this.$watch('view', (v) => {
        sessionStorage.setItem('view', v);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

    },

    // ── Methods ────────────────────────────────────────────────

    // Toggle dark/light mode and persist the choice.
    toggleTheme() {
      this.isDark = !this.isDark;
      localStorage.setItem('default-theme', this.isDark ? 'dark' : 'light');
    },

    // Toggle language between English and French
    toggleLang() {
      this.lang = this.lang === 'en' ? 'fr' : 'en';
      localStorage.setItem('default-lang', this.lang);
    },

    // Toggle mobile menu open/closed
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },

    // Close mobile menu (called when a nav button is clicked)
    closeMobileMenu() {
      this.mobileMenuOpen = false;
    },

    // Return the CSS class string for a nav button based on whether it's the active view.
    // Used for simple views (Profile, Focus, Contact) that don't have accordions.
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
    },

    // ── Tri-state nav button methods ───────────────────────────
    // For sections with accordions: inactive → active/collapsed → active/expanded

    // Check if all accordions in a section are expanded
    isAllExpanded(section) {
      const keys = this.sectionAccordions[section];
      if (!keys || keys.length === 0) return false;
      return keys.every(key => this.expanded[key]);
    },

    // Check if any accordion in a section is expanded
    isAnyExpanded(section) {
      const keys = this.sectionAccordions[section];
      if (!keys || keys.length === 0) return false;
      return keys.some(key => this.expanded[key]);
    },

    // Toggle all accordions in a section to a given state
    toggleAllInSection(section, state) {
      const keys = this.sectionAccordions[section];
      if (!keys) return;
      keys.forEach(key => {
        this.expanded[key] = state;
      });
    },

    // Handle nav button click with tri-state logic
    // 1. If not on this section → navigate and collapse all
    // 2. If on section but not all expanded → expand all
    // 3. If on section and all expanded → collapse all
    handleNavClick(section) {
      if (this.view !== section) {
        // State 1 → 2: Navigate to section and collapse all accordions
        this.view = section;
        this.toggleAllInSection(section, false);
      } else if (!this.isAllExpanded(section)) {
        // State 2 → 3: Expand all
        this.toggleAllInSection(section, true);
      } else {
        // State 3 → 2: Collapse all
        this.toggleAllInSection(section, false);
      }
      this.closeMobileMenu();  // Close mobile menu after navigation
    },

    // Return button class for tri-state sections
    // Three visual states: inactive (gray) → active-collapsed (border) → active-expanded (colored)
    navBtnState(section) {
      const isActive = this.view === section;
      const hasAccordions = this.accordionSections.includes(section);
      const allExpanded = hasAccordions && this.isAllExpanded(section);

      let classes = 'btn-inactive';
      if (isActive) {
        if (allExpanded) {
          classes = 'btn-active-expanded';
        } else {
          classes = 'btn-active-collapsed';
        }
      }

      return {
        classes: classes,
        indicator: ''  // No text indicators - visual states only
      };
    },

    // Return tooltip text for tri-state nav buttons
    // Explains the current state and what the next click will do
    navTooltip(section) {
      const isActive = this.view === section;
      const hasAccordions = this.accordionSections.includes(section);

      if (!hasAccordions) {
        // Simple button - no accordion behavior
        return `View ${section.charAt(0).toUpperCase() + section.slice(1)}`;
      }

      if (!isActive) {
        // State 1: Not on this section yet
        return `View ${section.charAt(0).toUpperCase() + section.slice(1)}`;
      } else if (!this.isAllExpanded(section)) {
        // State 2: On section but collapsed - clicking will expand all
        return 'Click again to expand all';
      } else {
        // State 3: On section and expanded - clicking will collapse all
        return 'Click again to collapse all';
      }
    }
  };
}
