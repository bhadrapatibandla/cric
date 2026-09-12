/**
 * animations.js — Bhadra Patibandla Cricket Portfolio
 * ═════════════════════════════════════════════════════
 * All GSAP-powered animations. Loaded after GSAP + ScrollTrigger CDN.
 * Runs after DOM is ready. Safe to call multiple times (idempotent).
 *
 * Animations:
 *   1. Cricket ball scroll path  — ball rolls along SVG path between sections
 *   2. Word-by-word text reveal  — section headings split and slide up
 *   3. 3D card tilt on hover     — tournament / overview cards tilt with mouse
 *   4. Elastic number counters   — hero stats + overview values bounce in
 *   5. Magnetic buttons          — CTAs follow cursor subtly
 *   6. Staggered section entry   — every section element slides in with delay
 */

(function () {
  'use strict';

  // Guard — don't run if GSAP didn't load
  if (typeof gsap === 'undefined') {
    console.warn('[animations.js] GSAP not loaded — skipping animations');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ─────────────────────────────────────────────────────────────────────────
  // UTILITY
  // ─────────────────────────────────────────────────────────────────────────
  const qs  = (s, ctx = document) => ctx.querySelector(s);
  const qsa = (s, ctx = document) => [...ctx.querySelectorAll(s)];

  // Reduced-motion check — skip all animations if user prefers it
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // ─────────────────────────────────────────────────────────────────────────
  // 2. WORD-BY-WORD TEXT REVEAL
  // ─────────────────────────────────────────────────────────────────────────
  function splitAndReveal() {
    // Split each .section-title into word spans
    qsa('.section-title').forEach(title => {
      if (title.dataset.split) return;
      title.dataset.split = '1';

      const children = [...title.childNodes];
      title.innerHTML = '';

      children.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const words = node.textContent.split(/(\s+)/);
          words.forEach(w => {
            if (w.trim() === '') {
              title.appendChild(document.createTextNode(w));
            } else {
              const wrap = document.createElement('span');
              wrap.className = 'word-wrap';
              const inner = document.createElement('span');
              inner.className = 'word-inner';
              inner.textContent = w;
              wrap.appendChild(inner);
              title.appendChild(wrap);
            }
          });
        } else {
          // Element node (e.g. <span> with gold gradient) — wrap but preserve the styles
          // by cloning the original element and making it the word-inner
          const wrap = document.createElement('span');
          wrap.className = 'word-wrap';
          // Clone the original element (preserves class, style, etc.)
          const clone = node.cloneNode(true);
          clone.classList.add('word-inner');
          wrap.appendChild(clone);
          title.appendChild(wrap);
        }
      });

      // Animate word-inners on scroll
      const inners = qsa('.word-inner', title);
      gsap.set(inners, { y: '110%', opacity: 0 });

      ScrollTrigger.create({
        trigger: title,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(inners, {
            y: '0%',
            opacity: 1,
            duration: .7,
            stagger: .08,
            ease: 'power3.out',
          });
        },
      });
    });

    // Also animate .section-label with a simple slide-up
    qsa('.section-label').forEach(label => {
      gsap.set(label, { opacity: 0, y: 16 });
      ScrollTrigger.create({
        trigger: label,
        start: 'top 90%',
        once: true,
        onEnter: () => gsap.to(label, { opacity: 1, y: 0, duration: .5, ease: 'power2.out' }),
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3. 3D CARD TILT ON HOVER
  // ─────────────────────────────────────────────────────────────────────────
  function initCardTilt() {
    const CARDS = '.ov-card, .t-card, .yc-card, .highlight-card';
    const MAX_TILT = 12; // degrees

    qsa(CARDS).forEach(card => {
      card.addEventListener('mousemove', e => {
        const r    = card.getBoundingClientRect();
        const x    = e.clientX - r.left;
        const y    = e.clientY - r.top;
        const cx   = r.width  / 2;
        const cy   = r.height / 2;
        const rotX = ((y - cy) / cy) * -MAX_TILT;
        const rotY = ((x - cx) / cx) *  MAX_TILT;

        gsap.to(card, {
          rotateX: rotX,
          rotateY: rotY,
          transformPerspective: 900,
          transformOrigin: 'center center',
          duration: .3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: .6,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    });
  }

  // Re-init card tilt when new cards are rendered (e.g. filter changes)
  window._reinitCardTilt = initCardTilt;

  // ─────────────────────────────────────────────────────────────────────────
  // 4. ELASTIC NUMBER COUNTERS
  // ─────────────────────────────────────────────────────────────────────────
  function initElasticCounters() {
    // Hero counters — triggered by IntersectionObserver already in script.js
    // We enhance them with a scale bounce when they reach their final value
    const hcItems = qsa('.hc-item');
    if (hcItems.length) {
      ScrollTrigger.create({
        trigger: '.hero-counters',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.from(hcItems, {
            scale: .6,
            opacity: 0,
            duration: .6,
            stagger: .08,
            ease: 'back.out(2)',
          });
        },
      });
    }

    // Overview value numbers — elastic scale-in
    ScrollTrigger.create({
      trigger: '#overviewGrid',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const vals = qsa('.ov-value');
        gsap.from(vals, {
          scale: .5,
          opacity: 0,
          duration: .55,
          stagger: .06,
          ease: 'back.out(2.5)',
        });
      },
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 5. MAGNETIC BUTTONS
  // ─────────────────────────────────────────────────────────────────────────
  function initMagneticButtons() {
    const STRENGTH = 0.35; // fraction of offset to apply

    qsa('.btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r  = btn.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = (e.clientX - cx) * STRENGTH;
        const dy = (e.clientY - cy) * STRENGTH;

        gsap.to(btn, {
          x: dx,
          y: dy,
          duration: .3,
          ease: 'power2.out',
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: .7,
          ease: 'elastic.out(1, 0.4)',
        });
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 6. STAGGERED SECTION ENTRY
  // ─────────────────────────────────────────────────────────────────────────
  function initSectionEntry() {
    // Each section's children stagger in from below
    const STAGGER_TARGETS = [
      { section: '#overview',    targets: '.ov-card' },
      { section: '#growth',      targets: '.yc-card, .gc-item' },
      { section: '#charts',      targets: '.chart-tabs .ctab' },
      { section: '#tournaments', targets: '.t-card' },
      { section: '#stats',       targets: '.snav' },
      { section: '#highlights',  targets: '.highlight-card' },
      { section: '#gallery',     targets: '.gallery-item' },
      { section: '#profile',     targets: '.pd-item' },
    ];

    STAGGER_TARGETS.forEach(({ section, targets }) => {
      const el = qs(section);
      if (!el) return;
      const items = qsa(targets, el);
      if (!items.length) return;

      gsap.set(items, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: .55,
            stagger: .06,
            ease: 'power3.out',
          });
        },
      });
    });

    // Yearly chart wrap — scale in from below
    const chartWraps = qsa('.yearly-chart-wrap, .chart-container');
    chartWraps.forEach(wrap => {
      gsap.set(wrap, { opacity: 0, y: 30, scale: .97 });
      ScrollTrigger.create({
        trigger: wrap,
        start: 'top 85%',
        once: true,
        onEnter: () => gsap.to(wrap, { opacity: 1, y: 0, scale: 1, duration: .7, ease: 'power3.out' }),
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 7. BONUS — PARALLAX DEPTH ON HERO SILHOUETTE
  // ─────────────────────────────────────────────────────────────────────────
  function initHeroParallax() {
    const sil = qs('.hero-silhouette');
    if (!sil) return;

    gsap.to(sil, {
      y: '-15%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 8. BONUS — HORIZONTAL STAT COUNTER STRIP MARQUEE
  // ─────────────────────────────────────────────────────────────────────────
  function initParallaxText() {
    const strip = qs('.parallax-text');
    if (!strip) return;

    // Duplicate content for seamless loop
    const orig = strip.innerHTML;
    strip.innerHTML = orig + orig;

    gsap.to(strip, {
      x: '-50%',
      ease: 'none',
      duration: 18,
      repeat: -1,
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 9. SCROLL PROGRESS BAR
  // ─────────────────────────────────────────────────────────────────────────
  function initScrollProgress() {
    const bar = qs('#scroll-progress');
    if (!bar) return;

    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 10. CURSOR GLOW
  // ─────────────────────────────────────────────────────────────────────────
  function initCursorGlow() {
    const glow = qs('#cursor-glow');
    if (!glow) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    window.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    });

    gsap.ticker.add(() => {
      gsap.set(glow, { x: mx, y: my });
    });

    // Scale up on interactive elements
    const hoverEls = qsa('a, button, .t-card, .ov-card, .gallery-item');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(glow, { scale: 2.5, opacity: .6, duration: .3 }));
      el.addEventListener('mouseleave', () => gsap.to(glow, { scale: 1,   opacity: .35, duration: .3 }));
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // BOOT — run all animations after a short delay to ensure DOM is painted
  // ─────────────────────────────────────────────────────────────────────────
  function boot() {
    initScrollProgress();
    initCursorGlow();
    initHeroParallax();
    splitAndReveal();
    initElasticCounters();
    initSectionEntry();
    initCardTilt();
    initMagneticButtons();
    initParallaxText();

    setTimeout(() => ScrollTrigger.refresh(), 300);
  }

  // Run after script.js has finished rendering everything
  // script.js fires 'dataReady' equivalent via firestoreReady / fallback
  // We simply wait for the next frame after DOMContentLoaded + 500ms
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(boot, 500));
  } else {
    setTimeout(boot, 500);
  }

})();
