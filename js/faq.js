/* =============================================================
   AissaGames — faq.js
   Accessible accordion + live search + category filtering.
   Shared by faq.html and support.html.
   ============================================================= */
(function () {
  "use strict";

  var root = document.querySelector("[data-faq]");
  if (!root) return;

  var items = Array.prototype.slice.call(root.querySelectorAll(".faq-item"));
  var searchInput = document.querySelector("[data-faq-search]");
  var filterButtons = Array.prototype.slice.call(
    document.querySelectorAll("[data-faq-filter]")
  );
  var emptyState = document.querySelector("[data-faq-empty]");
  var activeFilter = "all";

  /* ---- Accordion ---- */
  function closeItem(item) {
    var btn = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    item.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    panel.style.maxHeight = null;
  }

  function openItem(item) {
    var btn = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    item.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    panel.style.maxHeight = panel.scrollHeight + "px";
  }

  items.forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });

  // Keep an open panel sized correctly on resize.
  window.addEventListener("resize", function () {
    items.forEach(function (item) {
      if (item.classList.contains("is-open")) {
        var panel = item.querySelector(".faq-a");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---- Filtering + search ---- */
  function normalize(str) {
    return (str || "").toLowerCase().trim();
  }

  function applyFilters() {
    var query = searchInput ? normalize(searchInput.value) : "";
    var visibleCount = 0;

    items.forEach(function (item) {
      var cat = item.getAttribute("data-cat") || "";
      var text = normalize(item.textContent);
      var matchesCat = activeFilter === "all" || cat === activeFilter;
      var matchesQuery = query === "" || text.indexOf(query) !== -1;
      var show = matchesCat && matchesQuery;

      item.hidden = !show;
      if (!show && item.classList.contains("is-open")) {
        closeItem(item);
      }
      if (show) visibleCount++;
    });

    // Hide category headings that have no visible items.
    var groups = root.querySelectorAll("[data-faq-group]");
    for (var g = 0; g < groups.length; g++) {
      var grp = groups[g];
      var groupItems = grp.querySelectorAll(".faq-item");
      var anyVisible = false;
      for (var n = 0; n < groupItems.length; n++) {
        if (!groupItems[n].hidden) {
          anyVisible = true;
          break;
        }
      }
      grp.hidden = !anyVisible;
    }

    if (emptyState) emptyState.hidden = visibleCount !== 0;
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeFilter = btn.getAttribute("data-faq-filter");
      filterButtons.forEach(function (b) {
        var isActive = b === btn;
        b.classList.toggle("is-active", isActive);
        b.setAttribute("aria-pressed", String(isActive));
      });
      applyFilters();
    });
  });

  // Open an item if the URL targets it (deep-linking).
  if (window.location.hash) {
    var target = document.getElementById(window.location.hash.slice(1));
    if (target && target.classList.contains("faq-item")) {
      openItem(target);
    }
  }
})();
