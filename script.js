/* ============================================================
   AxonRiedge — script.js
   Nav, particles, typing, reveals, magnetic CTA, count-up,
   timeline draw, accordions, form validation, mobile menu.
   All motion respects prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---- Nav: glass on scroll + scroll progress -------------- */
  const nav = $("#nav");
  const progress = $("#progress");
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 50);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = "scaleX(" + (h > 0 ? y / h : 0) + ")";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Active section link --------------------------------- */
  const linkMap = {};
  $$(".nav-links a").forEach(a => { linkMap[a.getAttribute("href").slice(1)] = a; });
  const secObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const link = linkMap[e.target.id];
      if (!link) return;
      if (e.isIntersecting) {
        $$(".nav-links a").forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["edge-llm", "voice", "process", "services", "hardware", "logs"].forEach(id => {
    const el = document.getElementById(id); if (el) secObserver.observe(el);
  });

  /* ---- Mobile menu ----------------------------------------- */
  const burger = $("#burger");
  const menu = $("#mobileMenu");
  function toggleMenu(open) {
    const isOpen = open ?? !document.body.classList.contains("menu-open");
    document.body.classList.toggle("menu-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
  }
  burger.addEventListener("click", () => toggleMenu());
  $$("#mobileMenu a").forEach(a => a.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") toggleMenu(false); });

  /* ---- Scroll reveals -------------------------------------- */
  const revObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); revObserver.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  $$(".reveal").forEach(el => revObserver.observe(el));

  /* ---- Hero typewriter ------------------------------------- */
  const typed = $("#typed");
  const cursor = $("#cursor");
  if (typed) {
    const words = ["Air-gapped.", "Offline.", "Sovereign.", "Yours."];
    if (reduce) {
      typed.textContent = "Yours.";
    } else {
      let wi = 0, ci = 0, deleting = false;
      function tick() {
        const w = words[wi];
        typed.textContent = w.slice(0, ci);
        if (!deleting && ci < w.length) { ci++; setTimeout(tick, 55); }
        else if (!deleting && ci === w.length) { deleting = true; setTimeout(tick, wi === words.length - 1 ? 4000 : 1400); }
        else if (deleting && ci > 0) { ci--; setTimeout(tick, 28); }
        else { deleting = false; wi = (wi + 1) % words.length; setTimeout(tick, 220); }
      }
      setTimeout(tick, 700);
    }
  }

  /* ---- Edge unit token counter (ambient) ------------------- */
  const tok = $("#tok");
  if (tok && !reduce) {
    let base = 38;
    setInterval(() => {
      const v = base + Math.round(Math.sin(Date.now() / 600) * 6 + Math.random() * 4);
      tok.textContent = v;
    }, 700);
  } else if (tok) { tok.textContent = "42"; }

  /* ---- Count-up stats -------------------------------------- */
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const to = parseFloat(el.dataset.to);
      const dec = parseInt(el.dataset.dec || "0", 10);
      countObserver.unobserve(el);
      if (reduce) { el.textContent = to.toFixed(dec); return; }
      const dur = 1600, t0 = performance.now();
      function step(now) {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (to * eased).toFixed(dec);
        if (p < 1) requestAnimationFrame(step); else el.textContent = to.toFixed(dec);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  $$(".count").forEach(el => countObserver.observe(el));

  /* ---- Timeline self-draw ---------------------------------- */
  const tlDraw = $("#tlDraw");
  if (tlDraw) {
    const tlObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        tlObs.unobserve(e.target);
        if (reduce) { tlDraw.style.strokeDashoffset = "0"; return; }
        tlDraw.style.transition = "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)";
        requestAnimationFrame(() => { tlDraw.style.strokeDashoffset = "0"; });
      });
    }, { threshold: 0.4 });
    tlObs.observe($(".timeline"));
  }

  /* ---- Factory terminal stagger ---------------------------- */
  const factory = $("#factory");
  if (factory) {
    const lines = $$(".ln", factory);
    lines.forEach((l, i) => l.style.animationDelay = (0.15 + i * 0.28) + "s");
    const fObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { factory.classList.add("run"); fObs.unobserve(e.target); } });
    }, { threshold: 0.4 });
    fObs.observe(factory);
  }

  /* ---- Voice stage: waveform bars + multilingual captions -- */
  const vsWave = $("#vsWave");
  if (vsWave) {
    const N = 28;
    for (let i = 0; i < N; i++) {
      const b = document.createElement("i");
      const d = Math.abs(i - (N - 1) / 2) / N;
      b.style.animationDelay = (-d * 1.1 - Math.random() * 0.2).toFixed(2) + "s";
      b.style.animationDuration = (0.85 + Math.random() * 0.5).toFixed(2) + "s";
      if (reduce) b.style.height = (22 + Math.round(Math.random() * 58)) + "%";
      vsWave.appendChild(b);
    }
  }
  const voiceLang = $("#voiceLang");
  const voiceText = $("#voiceText");
  if (voiceLang && voiceText && !reduce) {
    const lines = [
      { lang: "\u0939\u093f\u0928\u094d\u0926\u0940 \u00b7 HINDI",   text: "\u0928\u092e\u0938\u094d\u0924\u0947! \u092e\u0948\u0902 \u0906\u092a\u0915\u0940 \u0915\u0948\u0938\u0947 \u092e\u0926\u0926 \u0915\u0930 \u0938\u0915\u0924\u093e \u0939\u0942\u0901?" },
      { lang: "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd \u00b7 TAMIL",   text: "\u0bb5\u0ba3\u0b95\u0bcd\u0b95\u0bae\u0bcd! \u0ba8\u0bbe\u0ba9\u0bcd \u0b8e\u0baa\u0bcd\u0baa\u0b9f\u0bbf \u0b89\u0ba4\u0bb5 \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bc1\u0bae\u0bcd?" },
      { lang: "\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41 \u00b7 TELUGU",   text: "\u0c28\u0c2e\u0c38\u0c4d\u0c15\u0c3e\u0c30\u0c02! \u0c28\u0c47\u0c28\u0c41 \u0c2e\u0c40\u0c15\u0c41 \u0c0e\u0c32\u0c3e \u0c38\u0c39\u0c3e\u0c2f\u0c02 \u0c1a\u0c47\u0c2f\u0c17\u0c32\u0c28\u0c41?" },
      { lang: "\u09ac\u09be\u0982\u09b2\u09be \u00b7 BENGALI",   text: "\u09a8\u09ae\u09b8\u09cd\u0995\u09be\u09b0! \u0986\u09ae\u09bf \u0995\u09c0\u09ad\u09be\u09ac\u09c7 \u09b8\u09be\u09b9\u09be\u09af\u09cd\u09af \u0995\u09b0\u09a4\u09c7 \u09aa\u09be\u09b0\u09bf?" },
      { lang: "\u092e\u0930\u093e\u0920\u0940 \u00b7 MARATHI",   text: "\u0928\u092e\u0938\u094d\u0915\u093e\u0930! \u092e\u0940 \u0924\u0941\u092e\u091a\u0940 \u0915\u0936\u0940 \u092e\u0926\u0924 \u0915\u0930\u0942?" },
      { lang: "ENGLISH \u00b7 HINGLISH",   text: "Sure \u2014 main aapke documents offline summarize kar sakta hoon." }
    ];
    let vidx = 0;
    setInterval(() => {
      vidx = (vidx + 1) % lines.length;
      voiceText.classList.add("swap");
      setTimeout(() => {
        voiceLang.textContent = lines[vidx].lang;
        voiceText.textContent = lines[vidx].text;
        voiceText.classList.remove("swap");
      }, 400);
    }, 3000);
  }

  /* ---- Accordions (services + FAQ) ------------------------- */
  function wireAccordion(itemSel, btnSel, single) {
    const items = $$(itemSel);
    items.forEach(item => {
      const btn = $(btnSel, item);
      if (!btn) return;
      btn.addEventListener("click", () => {
        const willOpen = !item.classList.contains("open");
        if (single) items.forEach(i => { i.classList.remove("open"); const b = $(btnSel, i); if (b) b.setAttribute("aria-expanded", "false"); });
        item.classList.toggle("open", willOpen);
        btn.setAttribute("aria-expanded", String(willOpen));
      });
    });
  }
  wireAccordion(".svc-item", ".svc-q", false);
  wireAccordion(".faq-item", ".faq-q", true);

  /* ---- Magnetic buttons ------------------------------------ */
  function magnetize(el) {
    if (!el || reduce || window.matchMedia("(max-width: 760px)").matches) return;
    let raf, tx = 0, ty = 0, cx = 0, cy = 0;
    function move(e) {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < r.width * 0.9) { tx = dx * 0.3; ty = dy * 0.4; } else { tx = 0; ty = 0; }
      if (!raf) raf = requestAnimationFrame(loop);
    }
    function loop() {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      el.style.transform = "translate(" + cx.toFixed(2) + "px," + cy.toFixed(2) + "px)";
      if (Math.abs(cx - tx) > 0.1 || Math.abs(cy - ty) > 0.1) raf = requestAnimationFrame(loop);
      else raf = null;
    }
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); });
  }
  magnetize($("#magnetic"));
  magnetize($("#magnetic2"));

  /* ---- Contact form validation ----------------------------- */
  const form = $("#contactForm");
  if (form) {
    const showErr = (name, msg) => {
      const field = form.querySelector("#" + name);
      const err = form.querySelector('[data-for="' + name + '"]');
      if (field) field.classList.toggle("invalid", !!msg);
      if (err) err.textContent = msg || "";
    };
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      const name = $("#name").value.trim();
      const email = $("#email").value.trim();
      const msg = $("#message").value.trim();
      if (!name) { showErr("name", "Please enter your name"); ok = false; } else showErr("name", "");
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { showErr("email", "Enter a valid email"); ok = false; } else showErr("email", "");
      if (!msg) { showErr("message", "Tell us a little about your project"); ok = false; } else showErr("message", "");
      if (!ok) return;
      form.classList.add("hide");
      $("#formSuccess").classList.add("show");
    });
    ["name", "email", "message"].forEach(n => {
      const f = $("#" + n);
      if (f) f.addEventListener("input", () => { if (f.classList.contains("invalid")) showErr(n, ""); });
    });
  }

  /* ---- Particle field (ambient data motion) ---------------- */
  const canvas = $("#particles");
  if (canvas && !reduce) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr, parts = [];
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const COUNT = mobile ? 14 : 30;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = innerWidth * dpr;
      h = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
    }
    function spawn() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.6 + 0.8) * dpr,
        vy: -(Math.random() * 0.25 + 0.08) * dpr,
        vx: (Math.random() - 0.5) * 0.1 * dpr,
        a: Math.random() * 0.18 + 0.05
      };
    }
    function init() { resize(); parts = Array.from({ length: COUNT }, spawn); }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y += p.vy; p.x += p.vx;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(70,120,255," + p.a + ")";
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    window.addEventListener("resize", () => { resize(); }, { passive: true });
    init();
    frame();
  }

  /* ---- Hero neural constellation (replaces blueprint grid) -- */
  const heroNet = $("#heroNet");
  const heroSection = $(".hero");
  if (heroNet && heroSection) {
    const nctx = heroNet.getContext("2d");
    let nw, nh, ndpr, nodes = [];
    const mobileN = window.matchMedia("(max-width: 760px)").matches;
    const N = mobileN ? 18 : 34;
    const LINK = mobileN ? 116 : 150;
    function nsize() {
      const r = heroSection.getBoundingClientRect();
      ndpr = Math.min(window.devicePixelRatio || 1, 2);
      nw = heroNet.width = Math.max(1, r.width) * ndpr;
      nh = heroNet.height = Math.max(1, r.height) * ndpr;
      heroNet.style.width = r.width + "px";
      heroNet.style.height = r.height + "px";
    }
    function nmake() {
      nodes = Array.from({ length: N }, () => ({
        x: Math.random() * nw, y: Math.random() * nh,
        vx: (Math.random() - 0.5) * 0.16 * ndpr,
        vy: (Math.random() - 0.5) * 0.16 * ndpr,
        r: (Math.random() * 1.5 + 1.4) * ndpr
      }));
    }
    function ndraw() {
      nctx.clearRect(0, 0, nw, nh);
      const L = LINK * ndpr;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < L) {
            const o = (1 - d / L) * 0.26;
            nctx.strokeStyle = "rgba(45,80,150," + o.toFixed(3) + ")";
            nctx.lineWidth = 1 * ndpr;
            nctx.beginPath(); nctx.moveTo(a.x, a.y); nctx.lineTo(b.x, b.y); nctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        nctx.beginPath(); nctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        nctx.fillStyle = "rgba(61,123,255,0.7)"; nctx.fill();
      }
    }
    function nstep() {
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > nw) n.vx *= -1;
        if (n.y < 0 || n.y > nh) n.vy *= -1;
      }
      ndraw();
      requestAnimationFrame(nstep);
    }
    nsize(); nmake();
    if (reduce) ndraw(); else nstep();
    window.addEventListener("resize", () => { nsize(); nmake(); if (reduce) ndraw(); }, { passive: true });
  }
})();
