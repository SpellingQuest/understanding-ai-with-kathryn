// Understanding AI with Kathryn — shared site behavior
// Preview build: no network calls, no data storage, no analytics. All forms are demo-only.
(function () {
  "use strict";

  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector("nav.primary-nav");
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close menu" : "Menu";
    });
    // Close the mobile menu after a nav link is activated (keyboard or pointer).
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && window.matchMedia("(max-width: 720px)").matches) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
      }
    });
  }

  // Demo form handler: attach to any <form data-demo-form> on the page.
  // Prevents the browser's real submission, does basic accessible validation,
  // and shows a status message that is explicit about this being a preview.
  function initDemoForms() {
    var forms = document.querySelectorAll("form[data-demo-form]");
    forms.forEach(function (form) {
      var status = form.querySelector(".form-status");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        if (status) {
          status.textContent =
            "Preview only — nothing was sent or saved. In the live site this step would hand your answers to Kathryn for review, not process a booking or payment.";
          status.classList.add("show");
          status.setAttribute("role", "alert");
          status.tabIndex = -1;
          status.focus();
        }
        form.reset();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initDemoForms();
  });
})();
