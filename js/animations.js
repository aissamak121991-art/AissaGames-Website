/* =============================================================
   AissaGames — animations.js
   - Scroll reveal via IntersectionObserver.
   - Button ripple effect.
   All effects respect prefers-reduced-motion.
   ============================================================= */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Scroll reveal ---- */
  var revealTargets = document.querySelectorAll(
    "[data-reveal], [data-reveal-stagger]"
  );

  if (reduce || !("IntersectionObserver" in window)) {
    // Show everything immediately.
    for (var r = 0; r < revealTargets.length; r++) {
      revealTargets[r].classList.add("is-visible");
    }
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    for (var i = 0; i < revealTargets.length; i++) {
      io.observe(revealTargets[i]);
    }
  }

  /* ---- Button ripple ---- */
  if (!reduce) {
    var rippleButtons = document.querySelectorAll(".btn");
    for (var b = 0; b < rippleButtons.length; b++) {
      rippleButtons[b].addEventListener("click", function (e) {
        var btn = e.currentTarget;
        var rect = btn.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height);
        var ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = e.clientX - rect.left - size / 2 + "px";
        ripple.style.top = e.clientY - rect.top - size / 2 + "px";
        btn.appendChild(ripple);
        window.setTimeout(function () {
          ripple.remove();
        }, 600);
      });
    }
  }
})();
