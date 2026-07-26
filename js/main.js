/* =============================================================
   AissaGames — main.js
   General site behaviour:
   - Current year in footer.
   - Smooth active-section highlighting in legal TOCs.
   - Accessible, frontend-only contact form validation.
   ============================================================= */
(function () {
  "use strict";

  /* ---- Dynamic copyright year ---- */
  var yearEls = document.querySelectorAll("[data-year]");
  var year = String(new Date().getFullYear());
  for (var y = 0; y < yearEls.length; y++) {
    yearEls[y].textContent = year;
  }

  /* ---- Legal document TOC scroll-spy ---- */
  var toc = document.querySelector("[data-toc]");
  if (toc && "IntersectionObserver" in window) {
    var tocLinks = Array.prototype.slice.call(toc.querySelectorAll("a"));
    var headings = tocLinks
      .map(function (link) {
        var id = link.getAttribute("href").slice(1);
        return document.getElementById(id);
      })
      .filter(Boolean);

    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            tocLinks.forEach(function (link) {
              link.classList.toggle(
                "is-active",
                link.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    headings.forEach(function (h) {
      spy.observe(h);
    });
  }

  /* ---- Contact form (frontend-only validation + feedback) ---- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var status = form.querySelector("[data-form-status]");

    function setError(field, message) {
      var wrap = field.closest(".form-field");
      if (!wrap) return;
      wrap.classList.toggle("has-error", Boolean(message));
      var slot = wrap.querySelector(".error-msg");
      if (slot) slot.textContent = message || "";
      field.setAttribute("aria-invalid", message ? "true" : "false");
    }

    function validateField(field) {
      var value = field.value.trim();
      if (field.hasAttribute("required") && value === "") {
        setError(field, "This field is required.");
        return false;
      }
      if (field.type === "email" && value !== "") {
        var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!ok) {
          setError(field, "Please enter a valid email address.");
          return false;
        }
      }
      if (field.hasAttribute("minlength") && value !== "") {
        var min = parseInt(field.getAttribute("minlength"), 10);
        if (value.length < min) {
          setError(field, "Please enter at least " + min + " characters.");
          return false;
        }
      }
      setError(field, "");
      return true;
    }

    var fields = Array.prototype.slice.call(
      form.querySelectorAll("input, textarea, select")
    );

    fields.forEach(function (field) {
      field.addEventListener("blur", function () {
        validateField(field);
      });
      field.addEventListener("input", function () {
        if (field.closest(".form-field").classList.contains("has-error")) {
          validateField(field);
        }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      var firstInvalid = null;
      fields.forEach(function (field) {
        if (!validateField(field)) {
          valid = false;
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (!valid) {
        if (status) {
          status.hidden = true;
        }
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Frontend-only: no backend. Compose a mailto so the message
      // is never lost, and confirm to the user.
      var name = encodeURIComponent(form.name ? form.name.value.trim() : "");
      var subject = encodeURIComponent(
        (form.subject ? form.subject.value.trim() : "") ||
          "Website enquiry from " + decodeURIComponent(name)
      );
      var body = encodeURIComponent(
        (form.message ? form.message.value.trim() : "") +
          "\n\n— " +
          decodeURIComponent(name) +
          (form.email ? " (" + form.email.value.trim() + ")" : "")
      );

      if (status) {
        status.hidden = false;
        status.classList.add("is-success");
        status.textContent =
          "Thank you — your message is ready to send. Your email app will open now; if it does not, please write to aissamak121991@gmail.com.";
      }

      window.setTimeout(function () {
        window.location.href =
          "mailto:aissamak121991@gmail.com?subject=" + subject + "&body=" + body;
      }, 400);

      form.reset();
      fields.forEach(function (field) {
        setError(field, "");
      });
    });
  }
})();
