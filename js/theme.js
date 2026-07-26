/* =============================================================
   AissaGames — theme.js
   Dark/light theme management.
   - Detects system preference (prefers-color-scheme).
   - Remembers a manual choice in localStorage.
   - Exposes a toggle bound to [data-theme-toggle].
   Runs early to avoid a flash of the wrong theme.
   ============================================================= */
(function () {
  "use strict";

  var STORAGE_KEY = "aissagames-theme";
  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: light)");

  // Flag that JavaScript is available. CSS gates scroll-reveal hiding on this
  // class so that, without JS, all content is visible by default (no blank
  // sections). Set here because theme.js loads synchronously in <head>.
  root.classList.add("js");

  /**
   * Resolve the theme to apply.
   * Priority: explicit stored choice > system preference > dark default.
   * @returns {"dark"|"light"}
   */
  function resolveTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* storage unavailable (private mode) — fall back to system */
    }
    if (stored === "dark" || stored === "light") {
      return stored;
    }
    return media.matches ? "light" : "dark";
  }

  /**
   * Apply a theme to the document and update the meta theme-color.
   * @param {"dark"|"light"} theme
   */
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "light" ? "#f3f6f9" : "#04060f");
    }
    var toggles = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].setAttribute("aria-pressed", String(theme === "light"));
      toggles[i].setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
      );
    }
  }

  // Apply immediately (script is loaded in <head> for no-flash).
  applyTheme(resolveTheme());

  /**
   * Persist and apply a manual theme choice.
   * @param {"dark"|"light"} theme
   */
  function setTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* ignore persistence failure */
    }
    applyTheme(theme);
  }

  // React to system changes only when the user has not chosen manually.
  media.addEventListener("change", function () {
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (e) {}
    if (stored !== "dark" && stored !== "light") {
      applyTheme(media.matches ? "light" : "dark");
    }
  });

  // Wire up toggle buttons once the DOM is ready.
  function bindToggles() {
    var toggles = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener("click", function () {
        var current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
        setTheme(current === "light" ? "dark" : "light");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindToggles);
  } else {
    bindToggles();
  }

  // Expose for other modules / debugging.
  window.AissaTheme = { set: setTheme, resolve: resolveTheme };
})();
