/* =====================================================================
   Wells Gallery — interactions
   - sticky header state
   - mobile navigation
   - scroll reveal
   - graceful image placeholders (until real photos are added)
   - gallery lightbox with keyboard + swipe navigation
   ===================================================================== */
(function () {
  "use strict";

  /* ---- sticky header shadow ---------------------------------------- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile nav -------------------------------------------------- */
  var toggle = document.querySelector(".nav__toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("nav-open");
      var open = document.body.classList.contains("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("nav-open"); });
    });
  }

  /* ---- scroll reveal ----------------------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- placeholder for any image that hasn't been added yet --------
     Builds a bronze-toned SVG label from the image's alt text, so the
     layout reads as finished. Drop the real file in /assets/images and
     it simply appears — no markup changes required.                    */
  var PALETTE = ["#1f1810", "#2a2118", "#241b12"];
  function placeholder(label, w, h) {
    var bg = PALETTE[(label.length) % PALETTE.length];
    var safe = (label || "Wells Gallery").replace(/&/g, "&amp;").replace(/</g, "&lt;");
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid slice">' +
      '<rect width="100%" height="100%" fill="' + bg + '"/>' +
      '<rect x="14" y="14" width="' + (w - 28) + '" height="' + (h - 28) + '" fill="none" stroke="#b07a42" stroke-opacity="0.5"/>' +
      '<text x="50%" y="46%" fill="#d8b675" font-family="Cinzel, serif" font-size="' + Math.round(w / 22) +
        '" letter-spacing="3" text-anchor="middle">WELLS GALLERY</text>' +
      '<text x="50%" y="56%" fill="#b6a78d" font-family="Spectral, serif" font-style="italic" font-size="' +
        Math.round(w / 30) + '" text-anchor="middle">' + safe + '</text>' +
      '<text x="50%" y="64%" fill="#7c6e58" font-family="Spectral, serif" font-size="' +
        Math.round(w / 42) + '" text-anchor="middle">photograph to be added</text>' +
      '</svg>';
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    img.addEventListener("error", function handle() {
      img.removeEventListener("error", handle);
      var w = parseInt(img.getAttribute("width"), 10) || 800;
      var h = parseInt(img.getAttribute("height"), 10) || 1000;
      img.src = placeholder(img.getAttribute("alt") || img.getAttribute("data-fallback"), w, h);
    });
    // Kick the loader for browsers that cached a prior 404 differently
    if (img.complete && img.naturalWidth === 0) img.dispatchEvent(new Event("error"));
  });

  /* ---- lightbox ---------------------------------------------------- */
  var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  if (triggers.length) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML =
      '<button class="lightbox__close" aria-label="Close">&times;</button>' +
      '<button class="lightbox__nav prev" aria-label="Previous">&#8249;</button>' +
      '<button class="lightbox__nav next" aria-label="Next">&#8250;</button>' +
      '<div><img class="lightbox__img" alt=""><div class="lightbox__cap"></div></div>';
    document.body.appendChild(box);

    var imgEl = box.querySelector(".lightbox__img");
    var capEl = box.querySelector(".lightbox__cap");
    var idx = 0;

    function show(i) {
      idx = (i + triggers.length) % triggers.length;
      var t = triggers[idx];
      var src = t.getAttribute("data-lightbox");
      var title = t.getAttribute("data-title") || "";
      var meta = t.getAttribute("data-meta") || "";
      var inner = t.querySelector("img");
      imgEl.onerror = function () {
        imgEl.onerror = null;
        imgEl.src = placeholder(title || "Wells Gallery", 1200, 900);
      };
      imgEl.src = src;
      capEl.innerHTML = (title ? "<b>" + title + "</b>" : "") + meta;
      imgEl.alt = inner ? inner.alt : title;
    }
    function open(i) { show(i); box.classList.add("open"); document.body.style.overflow = "hidden"; }
    function close() { box.classList.remove("open"); document.body.style.overflow = ""; }

    triggers.forEach(function (t, i) {
      t.addEventListener("click", function (e) { e.preventDefault(); open(i); });
    });
    box.querySelector(".lightbox__close").addEventListener("click", close);
    box.querySelector(".prev").addEventListener("click", function () { show(idx - 1); });
    box.querySelector(".next").addEventListener("click", function () { show(idx + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(idx + 1);
      if (e.key === "ArrowLeft") show(idx - 1);
    });

    // basic swipe
    var x0 = null;
    box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* ---- footer year ------------------------------------------------- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
