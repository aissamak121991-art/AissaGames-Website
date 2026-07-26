/* =============================================================
   AissaGames — navigation.js
   - Sticky navbar scrolled state.
   - Accessible mobile menu (focus trap, ESC, outside click).
   - Active-link highlighting for the current page.
   ============================================================= */
(function () {
  "use strict";

  var nav = document.querySelector("[data-nav]");
  if (!nav) return;

  var toggle = nav.querySelector("[data-nav-toggle]");
  var menu = nav.querySelector("[data-nav-menu]");

  /* ---- Scrolled state ---- */
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        nav.classList.toggle("is-scrolled", window.scrollY > 8);
        ticking = false;
      });
      ticking = true;
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  function openMenu() {
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("click", onOutsideClick, true);
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", onKeydown);
    document.removeEventListener("click", onOutsideClick, true);
  }

  function isOpen() {
    return menu.classList.contains("is-open");
  }

  function onKeydown(e) {
    if (e.key === "Escape" && isOpen()) {
      closeMenu();
      toggle.focus();
    }
  }

  function onOutsideClick(e) {
    if (isOpen() && !nav.contains(e.target)) {
      closeMenu();
    }
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      if (isOpen()) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close after choosing a destination on mobile.
    var links = menu.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function () {
        if (isOpen()) closeMenu();
      });
    }

    // Reset menu state when leaving the mobile breakpoint.
    var desktop = window.matchMedia("(min-width: 901px)");
    desktop.addEventListener("change", function (e) {
      if (e.matches) closeMenu();
    });
  }

  /* ---- Active link highlighting ---- */
  var here = document.body.getAttribute("data-page");
  if (here && menu) {
    var navLinks = menu.querySelectorAll("[data-page-link]");
    for (var j = 0; j < navLinks.length; j++) {
      if (navLinks[j].getAttribute("data-page-link") === here) {
        navLinks[j].setAttribute("aria-current", "page");
      }
    }
  }
})();
