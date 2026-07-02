/* William Ronchetti — site interactions. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a") && links.classList.contains("is-open")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Hero role rotator ---- */
  var role = document.getElementById("hero-role");
  if (role) {
    var roles = [
      "Senior backend & infrastructure engineer",
      "Infrastructure-as-code, end to end",
      "I move petabytes of research data",
      "LLM/RAG systems on AWS Bedrock",
      "AWS · Python · pipelines · observability"
    ];
    if (reduceMotion) {
      role.textContent = roles[0];
    } else {
      var ri = 0, ci = 0, deleting = false;
      (function tick() {
        var full = roles[ri];
        role.textContent = full.slice(0, ci);
        var delay = deleting ? 32 : 62;
        if (!deleting && ci === full.length) {
          delay = 1900; deleting = true;
        } else if (deleting && ci === 0) {
          deleting = false; ri = (ri + 1) % roles.length; delay = 350;
        } else {
          ci += deleting ? -1 : 1;
        }
        window.setTimeout(tick, delay);
      })();
    }
  }

  /* ---- Count-up gauges ---- */
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (isNaN(target) || reduceMotion) { return; }
    var start = null, dur = 1100;
    function step(ts) {
      if (start === null) { start = ts; }
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) { window.requestAnimationFrame(step); }
    }
    window.requestAnimationFrame(step);
  }

  /* ---- Scroll reveal (+ trigger gauges when about enters) ---- */
  var revealEls = document.querySelectorAll(".wrap-reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    document.querySelectorAll(".gauge__num[data-count]").forEach(countUp);
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          entry.target.querySelectorAll(".gauge__num[data-count]").forEach(countUp);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { observer.observe(el); });
  }
})();
