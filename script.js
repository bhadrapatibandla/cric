/**
 * script.js — Bhadra Patibandla Cricket Portfolio v2
 * ════════════════════════════════════════════════════
 * ES module. Imports data from data.js (local) which is replaced
 * by live Firestore data via firebase-data.js when deployed.
 *
 * Boot order:
 *   1. DOMContentLoaded fires → initNonData() (canvas, nav, footer)
 *   2. 'dataReady' event fires → inject live data → initData()
 *   3. If 'dataReady' never fires within 3s → initData() with local fallback
 */

import { PLAYER, CAREER, TOURNAMENTS, YEARLY } from './data.js';

// ── CHART.JS GLOBAL DEFAULTS ──────────────────────────────────────────────
Chart.defaults.color = '#8ba3c7';
Chart.defaults.font.family = "'Inter', system-ui, sans-serif";

// ── SHARED CHART TOOLTIP STYLE ────────────────────────────────────────────
const TOOLTIP = {
  backgroundColor: '#0b1428',
  titleColor: '#f0f5ff',
  bodyColor: '#8ba3c7',
  borderColor: 'rgba(255,255,255,0.1)',
  borderWidth: 1,
  padding: 12,
  cornerRadius: 10,
};

const GRID = { color: 'rgba(255,255,255,0.05)' };
const TICK = { color: '#4d6480', font: { size: 11 } };

// ── LIVE DATA (starts as local, overwritten by Firestore if available) ────
let DATA = { career: CAREER, tournaments: TOURNAMENTS, yearly: YEARLY };

// ─────────────────────────────────────────────────────────────────────────
// BOOT
// ─────────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNonData();   // canvas, nav, footer — don't need data

  // Listen for Firestore data from firebase-data.js
  document.addEventListener('firestoreReady', (e) => {
    if (e.detail?.ok) {
      if (e.detail.career)      DATA.career      = e.detail.career;
      if (e.detail.tournaments) DATA.tournaments  = e.detail.tournaments;
      if (e.detail.yearly)      DATA.yearly       = e.detail.yearly;
    }
    initData();
  }, { once: true });

  // Fallback: if firebase-data.js never fires, boot with local data after 2.5s
  setTimeout(() => {
    if (!document.body.dataset.dataBooted) initData();
  }, 2500);
});

function initNonData() {
  initCanvas();
  initNav();
  initFooter();
  initTheme();
}

function initData() {
  document.body.dataset.dataBooted = '1';
  renderHero();
  renderParallax();
  renderOverview();
  initYearly();
  initCharts();
  renderTournaments();       // render cards first
  initTournamentFilters();   // then wire filters
  initStats();
  renderProfile();
  setTimeout(initFadeUp, 150);
}

// ─────────────────────────────────────────────────────────────────────────
// HERO CANVAS — particle field
// ─────────────────────────────────────────────────────────────────────────
function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    w = canvas.width  = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * w;
      this.y  = Math.random() * h;
      this.vx = (Math.random() - .5) * .35;
      this.vy = (Math.random() - .5) * .35;
      this.r  = Math.random() * 1.5 + .4;
      this.a  = Math.random() * .4 + .1;
      // Alternate teal / gold particles
      this.color = Math.random() > .6
        ? `rgba(0,212,170,${this.a})`
        : `rgba(245,200,66,${this.a * .6})`;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++)
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 90) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,170,${.08*(1-d/90)})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(frame);
  }

  resize();
  particles = Array.from({ length: 100 }, () => new Particle());
  frame();
  window.addEventListener('resize', () => { resize(); particles = Array.from({ length: 100 }, () => new Particle()); });
}

// ─────────────────────────────────────────────────────────────────────────
// THEME TOGGLE
// ─────────────────────────────────────────────────────────────────────────
function initTheme() {
  const saved       = localStorage.getItem('bp_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme       = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);

  const btn = document.getElementById('themeToggle');
  btn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next    = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('bp_theme', next);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('bp_theme')) applyTheme(e.matches ? 'dark' : 'light');
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

// ─────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────
function initNav() {
  const nav    = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  links?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    })
  );
}

// ─────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────
function initFooter() {
  const y = document.getElementById('footerYear');
  if (y) y.textContent = new Date().getFullYear();
}

// ─────────────────────────────────────────────────────────────────────────
// HERO COUNTERS — animated count-up
// ─────────────────────────────────────────────────────────────────────────
function countUp(el, target, duration = 1600) {
  if (!el) return;
  const isFloat = !Number.isInteger(target);
  const start = performance.now();
  function step(now) {
    const t    = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const val  = ease * target;
    el.textContent = isFloat ? val.toFixed(2) : Math.floor(val).toLocaleString();
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = isFloat ? target.toFixed(2) : target.toLocaleString();
  }
  requestAnimationFrame(step);
}

function renderHero() {
  const C = DATA.career;
  const counters = [
    ['hc-matches',    C.matches],
    ['hc-runs',       C.runs],
    ['hc-hs',         C.hs],
    ['hc-catches',    C.catches],
    ['hc-wickets',    C.wickets],
    ['hc-tournaments',C.tournaments],
  ];

  // Trigger on first intersection with hero
  const hero = document.querySelector('.hero-counters');
  if (!hero) return;

  const io = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    counters.forEach(([id, val]) => countUp(document.getElementById(id), val));
    io.disconnect();
  }, { threshold: .3 });
  io.observe(hero);

  // Update footer stats
  const fs = document.getElementById('footerStats');
  if (fs) fs.textContent = `${C.matches} matches · ${C.tournaments} tournaments`;
}

// ─────────────────────────────────────────────────────────────────────────
// PARALLAX DIVIDER
// ─────────────────────────────────────────────────────────────────────────
function renderParallax() {
  const el = document.getElementById('parallaxText');
  if (!el) return;
  const C = DATA.career;
  el.innerHTML = [
    `${C.matches} Matches`,
    `${C.runs.toLocaleString()} Runs`,
    `${C.tournaments} Tournaments`,
    `${C.catches} Catches`,
    `${C.wickets} Wickets`,
  ].map((t, i) =>
    `${i > 0 ? '<span class="dot" aria-hidden="true">·</span>' : ''}${t}`
  ).join('');
}

// ─────────────────────────────────────────────────────────────────────────
// OVERVIEW CARDS
// ─────────────────────────────────────────────────────────────────────────
function renderOverview() {
  const grid = document.getElementById('overviewGrid');
  if (!grid) return;
  const C = DATA.career;

  const cards = [
    { icon:'🏏', val: C.matches,       label:'Matches',         sub:`${C.tournaments} tournaments played`,           color:'c-teal'   },
    { icon:'📊', val: C.runs.toLocaleString(), label:'Career Runs', sub:'Right hand top-order batter',                color:'c-gold'   },
    { icon:'⚡', val: C.avg,            label:'Batting Average', sub:`Strike rate ${C.sr}`,                          color:'c-blue'   },
    { icon:'🎯', val: C.hs,             label:'Highest Score',   sub:`${C.x50} half-centuries, ${C.x25} 25s`,        color:'c-purple' },
    { icon:'🔶', val: C.fours,          label:'Fours Hit',       sub:`${C.sixes} sixes · Boundary power`,            color:'c-orange' },
    { icon:'🎳', val: C.wickets,        label:'Wickets Taken',   sub:`Best: ${bestBBF()} · Econ ${C.econ}`,          color:'c-teal'   },
    { icon:'🧤', val: C.catches,        label:'Catches',         sub:'Wicket keeper & fielding dismissals',          color:'c-gold'   },
    { icon:'📅', val: DATA.yearly.length, label:'Seasons Active', sub:`${DATA.yearly[0]?.year} – ${DATA.yearly[DATA.yearly.length-1]?.year}`, color:'c-blue' },
  ];

  grid.innerHTML = cards.map(c => `
    <div class="ov-card ${c.color} fade-up" role="listitem">
      <span class="ov-icon" aria-hidden="true">${c.icon}</span>
      <div class="ov-value">${c.val}</div>
      <div class="ov-label">${c.label}</div>
      <div class="ov-sub">${c.sub}</div>
    </div>
  `).join('');
}

function bestBBF() {
  let best = '0/0';
  let bestW = 0, bestR = 999;
  DATA.tournaments.forEach(t => {
    const b = t.bbf;
    if (!b || b === '0/0') return;
    const [w, r] = b.split('/').map(Number);
    if (w > bestW || (w === bestW && r < bestR)) {
      bestW = w; bestR = r; best = b;
    }
  });
  return best;
}

// ─────────────────────────────────────────────────────────────────────────
// YEAR BY YEAR GROWTH
// ─────────────────────────────────────────────────────────────────────────
const YEARLY_METRICS = {
  runs:    { label: 'Runs',         key: 'runs',    color: '#3b82f6' },
  avg:     { label: 'Batting Avg',  key: 'avg',     color: '#00d4aa' },
  sr:      { label: 'Strike Rate',  key: 'sr',      color: '#f5c842' },
  mat:     { label: 'Matches',      key: 'mat',     color: '#8b5cf6' },
  fours:   { label: 'Fours',        key: 'fours',   color: '#f97316' },
  catches: { label: 'Catches',      key: 'catches', color: '#ef4444' },
};

let yearlyChart = null;

function buildYearlyChart(metric) {
  const cfg  = YEARLY_METRICS[metric];
  const Y    = DATA.yearly;
  const vals = Y.map(y => y[cfg.key] ?? 0);
  const labs = Y.map(y => String(y.year));
  const ctx  = document.getElementById('yearlyChart')?.getContext('2d');
  if (!ctx) return;

  if (yearlyChart) { yearlyChart.destroy(); yearlyChart = null; }

  const grad = ctx.createLinearGradient(0, 0, 0, 280);
  grad.addColorStop(0, cfg.color + 'bb');
  grad.addColorStop(1, cfg.color + '08');

  yearlyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labs,
      datasets: [{
        label: cfg.label,
        data: vals,
        fill: true,
        backgroundColor: grad,
        borderColor: cfg.color,
        borderWidth: 3,
        pointBackgroundColor: '#fff',
        pointBorderColor: cfg.color,
        pointBorderWidth: 3,
        pointRadius: 7,
        pointHoverRadius: 10,
        tension: .35,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 600, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          ...TOOLTIP,
          callbacks: {
            title: items => DATA.yearly[items[0].dataIndex].year + ' Season',
            label: item  => ` ${cfg.label}: ${item.raw}`,
            afterLabel: item => {
              const y = DATA.yearly[item.dataIndex];
              return ` Matches: ${y.mat}  HS: ${y.hs}  50s: ${y.x50}`;
            },
          },
        },
      },
      scales: {
        x: { ticks: { color: '#8ba3c7', font:{ size:13, weight:'700' } }, grid: GRID },
        y: { ticks: TICK, grid: GRID, beginAtZero: true },
      },
    },
  });
}

function renderYearlyCards() {
  const container = document.getElementById('yearlyCards');
  if (!container) return;
  const Y = DATA.yearly;

  container.innerHTML = Y.map((y, i) => {
    const prev       = Y[i - 1];
    const runsGrowth = prev ? Math.round(((y.runs - prev.runs) / Math.max(prev.runs, 1)) * 100) : null;
    const badge      = runsGrowth === null
      ? `<span class="yc-badge base">Baseline</span>`
      : runsGrowth >= 0
        ? `<span class="yc-badge up">▲ ${runsGrowth}% runs</span>`
        : `<span class="yc-badge down">▼ ${Math.abs(runsGrowth)}% runs</span>`;

    return `
      <div class="yc-card fade-up" role="listitem">
        <div class="yc-year-row">
          <span class="yc-year">${y.year}</span>
          ${badge}
        </div>
        <div class="yc-stats">
          <div class="yc-stat"><span class="yc-val">${y.runs}</span><span class="yc-lbl">Runs</span></div>
          <div class="yc-stat"><span class="yc-val">${y.avg ?? '—'}</span><span class="yc-lbl">Avg</span></div>
          <div class="yc-stat"><span class="yc-val">${y.sr  ?? '—'}</span><span class="yc-lbl">SR</span></div>
          <div class="yc-stat"><span class="yc-val">${y.mat}</span><span class="yc-lbl">Mat</span></div>
          <div class="yc-stat"><span class="yc-val">${y.hs}</span><span class="yc-lbl">HS</span></div>
          <div class="yc-stat"><span class="yc-val">${y.x50}</span><span class="yc-lbl">50s</span></div>
          <div class="yc-stat"><span class="yc-val">${y.fours}</span><span class="yc-lbl">4s</span></div>
          <div class="yc-stat"><span class="yc-val">${y.catches}</span><span class="yc-lbl">Ctch</span></div>
        </div>
        <div class="yc-tours" aria-label="Tournaments this season">
          ${y.tournamentNames.map(n => `<span class="yc-tour-badge">${n}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderGrowthCallout() {
  const el = document.getElementById('growthCallout');
  if (!el || DATA.yearly.length < 2) return;
  const first = DATA.yearly[0];
  const last  = DATA.yearly[DATA.yearly.length - 1];
  const runsGrowth = Math.round(((last.runs - first.runs) / Math.max(first.runs, 1)) * 100);
  const avgGrowth  = ((last.avg || 0) - (first.avg || 0)).toFixed(2);
  const srGrowth   = ((last.sr  || 0) - (first.sr  || 0)).toFixed(2);
  const matGrowth  = last.mat - first.mat;

  el.innerHTML = `
    <div class="gc-title">📈 Career Growth — ${first.year} → ${last.year}</div>
    <div class="gc-grid">
      <div class="gc-item">
        <span class="gc-num ${runsGrowth >= 0 ? 'pos' : 'neg'}">${runsGrowth >= 0 ? '+' : ''}${runsGrowth}%</span>
        <div class="gc-desc">Run Volume</div>
        <div class="gc-sub">${first.runs} → ${last.runs}</div>
      </div>
      <div class="gc-item">
        <span class="gc-num ${parseFloat(avgGrowth) >= 0 ? 'pos' : 'neg'}">${parseFloat(avgGrowth) >= 0 ? '+' : ''}${avgGrowth}</span>
        <div class="gc-desc">Batting Average</div>
        <div class="gc-sub">${first.avg} → ${last.avg}</div>
      </div>
      <div class="gc-item">
        <span class="gc-num ${parseFloat(srGrowth) >= 0 ? 'pos' : 'neg'}">${parseFloat(srGrowth) >= 0 ? '+' : ''}${srGrowth}</span>
        <div class="gc-desc">Strike Rate</div>
        <div class="gc-sub">${first.sr} → ${last.sr}</div>
      </div>
      <div class="gc-item">
        <span class="gc-num ${matGrowth >= 0 ? 'pos' : 'neg'}">${matGrowth >= 0 ? '+' : ''}${matGrowth}</span>
        <div class="gc-desc">More Matches</div>
        <div class="gc-sub">${first.mat} → ${last.mat}</div>
      </div>
    </div>
  `;
}

function initYearly() {
  buildYearlyChart('runs');
  renderYearlyCards();
  renderGrowthCallout();

  document.querySelectorAll('.ytab').forEach(btn =>
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ytab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected','true');
      buildYearlyChart(btn.dataset.metric);
    })
  );
}

// ─────────────────────────────────────────────────────────────────────────
// ANALYTICS CHARTS
// ─────────────────────────────────────────────────────────────────────────
const CHART_INSIGHTS = {
  runs:      () => {
    const top = [...DATA.tournaments].filter(t=>t.runs>0).sort((a,b)=>b.runs-a.runs).slice(0,3);
    return `<strong>Runs by Tournament:</strong> Top scorer in <strong>${top[0]?.name}</strong> with ${top[0]?.runs} runs, followed by ${top[1]?.name} (${top[1]?.runs}) and ${top[2]?.name} (${top[2]?.runs}).`;
  },
  avg:       () => {
    const top = [...DATA.tournaments].filter(t=>t.avg>0&&t.mat>1).sort((a,b)=>b.avg-a.avg).slice(0,3);
    return `<strong>Batting Average:</strong> Highest average in <strong>${top[0]?.name}</strong> at ${top[0]?.avg}, showcasing consistency over multiple matches.`;
  },
  sr:        () => {
    const top = [...DATA.tournaments].filter(t=>t.sr>0&&t.mat>1).sort((a,b)=>b.sr-a.sr).slice(0,3);
    return `<strong>Strike Rate:</strong> Best strike rate in <strong>${top[0]?.name}</strong> at ${top[0]?.sr}, demonstrating explosive batting when needed.`;
  },
  bowling:   () => {
    const active = DATA.tournaments.filter(t=>t.econ>0);
    const best   = [...active].sort((a,b)=>a.econ-b.econ)[0];
    return `<strong>Bowling Economy:</strong> Most economical in <strong>${best?.name}</strong> at ${best?.econ} RPO. Career economy: ${DATA.career.econ}.`;
  },
  boundaries: () => {
    const top = [...DATA.tournaments].filter(t=>t.fours>0).sort((a,b)=>b.fours-a.fours).slice(0,3);
    return `<strong>Boundaries:</strong> Hit most fours (${top[0]?.fours}) in <strong>${top[0]?.name}</strong>. Career: ${DATA.career.fours} fours, ${DATA.career.sixes} sixes.`;
  },
  radar: () => `<strong>All-Round Radar:</strong> Five-dimension performance profile benchmarked against U13 peer standards. Batting average, run volume, catches, wickets, and strike rate.`,
};

let mainChart = null;

function buildChart(type) {
  const ctx = document.getElementById('mainChart')?.getContext('2d');
  if (!ctx) return;
  if (mainChart) { mainChart.destroy(); mainChart = null; }

  const insight = document.getElementById('chartInsight');
  if (insight) insight.innerHTML = CHART_INSIGHTS[type]?.() ?? '';

  const T   = DATA.tournaments.filter(t => t.mat > 0 && t.formats[0] !== 'League');
  const labs = T.map(t => {
    const words = t.name.split(' ');
    return words.length > 3 ? words.slice(0,3).join(' ') + '…' : t.name;
  });

  // ── RADAR ──
  if (type === 'radar') {
    const C = DATA.career;
    // Benchmarks: U13 competitive peer
    const pct = (v, bench) => Math.min(+(v / bench * 100).toFixed(1), 100);
    mainChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Batting Avg', 'Strike Rate', 'Run Volume', 'Catches', 'Wickets'],
        datasets: [{
          label: 'Bhadra',
          data: [
            pct(C.avg,    35),
            pct(C.sr,     80),
            pct(C.runs,   500),
            pct(C.catches,30),
            pct(C.wickets,15),
          ],
          fill: true,
          backgroundColor: 'rgba(0,212,170,.15)',
          borderColor: '#00d4aa',
          pointBackgroundColor: '#00d4aa',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          pointRadius: 5,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        animation: { duration: 700 },
        plugins: { legend: { display: false }, tooltip: TOOLTIP },
        scales: {
          r: {
            min: 0, max: 100,
            ticks: { stepSize: 25, color: '#4d6480', backdropColor: 'transparent', font:{ size:10 } },
            grid: { color: 'rgba(255,255,255,.08)' },
            pointLabels: { color: '#f0f5ff', font:{ size:12, weight:'600' } },
            angleLines: { color: 'rgba(255,255,255,.08)' },
          },
        },
      },
    });
    return;
  }

  // ── BAR CHARTS ──
  const cfgs = {
    runs: {
      data: T.map(t => t.runs),
      color: '#3b82f6',
      label: 'Runs',
    },
    avg: {
      data: T.map(t => t.avg ?? 0),
      color: '#00d4aa',
      label: 'Batting Average',
    },
    sr: {
      data: T.map(t => t.sr ?? 0),
      color: '#f5c842',
      label: 'Strike Rate',
    },
    bowling: {
      data: T.map(t => t.econ ?? 0),
      color: '#8b5cf6',
      label: 'Economy Rate',
    },
    boundaries: {
      // Stacked bar: fours + sixes
      data: null,
      color: '#f97316',
      label: 'Boundaries',
    },
  };

  if (type === 'boundaries') {
    mainChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labs,
        datasets: [
          {
            label: 'Fours',
            data: T.map(t => t.fours ?? 0),
            backgroundColor: 'rgba(249,115,22,.7)',
            borderColor: '#f97316',
            borderWidth: 1,
            borderRadius: { topLeft:0, topRight:0, bottomLeft:6, bottomRight:6 },
          },
          {
            label: 'Sixes',
            data: T.map(t => t.sixes ?? 0),
            backgroundColor: 'rgba(245,200,66,.7)',
            borderColor: '#f5c842',
            borderWidth: 1,
            borderRadius: { topLeft:6, topRight:6, bottomLeft:0, bottomRight:0 },
          },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        animation: { duration: 600 },
        plugins: {
          legend: { display: true, position: 'top', labels: { color: '#8ba3c7', boxWidth: 12, padding: 16 } },
          tooltip: { ...TOOLTIP, callbacks: { title: items => T[items[0].dataIndex]?.name } },
        },
        scales: {
          x: { stacked: true, ticks: { color: '#4d6480', font:{ size:10 }, maxRotation:50, minRotation:50 }, grid: GRID },
          y: { stacked: true, ticks: TICK, grid: GRID },
        },
      },
    });
    return;
  }

  const cfg = cfgs[type];

  const gradFn = (color) => {
    const g = ctx.createLinearGradient(0, 0, 0, 340);
    g.addColorStop(0, color + 'bb');
    g.addColorStop(1, color + '11');
    return g;
  };

  mainChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labs,
      datasets: [{
        label: cfg.label,
        data: cfg.data,
        backgroundColor: gradFn(cfg.color),
        borderColor: cfg.color,
        borderWidth: 2,
        borderRadius: 7,
        borderSkipped: false,
        hoverBackgroundColor: cfg.color + 'cc',
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      animation: { duration: 600, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: { ...TOOLTIP, callbacks: {
          title: items => T[items[0].dataIndex]?.name ?? '',
          label: item  => ` ${cfg.label}: ${item.raw}`,
        }},
      },
      scales: {
        x: { ticks: { color: '#4d6480', font:{ size:10 }, maxRotation: 50, minRotation: 50 }, grid: GRID },
        y: { ticks: TICK, grid: GRID },
      },
    },
  });
}

function initCharts() {
  buildChart('runs');
  document.querySelectorAll('.ctab').forEach(btn =>
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ctab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected','true');
      buildChart(btn.dataset.chart);
    })
  );
}

// ─────────────────────────────────────────────────────────────────────────
// FORMAT BADGE helper
// ─────────────────────────────────────────────────────────────────────────
function fmtBadge(formats) {
  const map = {
    'T20':    'fmt-t20',
    '1 DAY':  'fmt-1day',
    'YOUTH':  'fmt-youth',
    'TEST':   'fmt-test',
    'League': 'fmt-league',
  };
  const labels = formats.map(f => {
    const cls = map[f] || 'fmt-mix';
    return `<span class="fmt-badge ${cls}">${f}</span>`;
  }).join('');
  return labels;
}

// ─────────────────────────────────────────────────────────────────────────
// TOURNAMENTS
// ─────────────────────────────────────────────────────────────────────────
function buildTournamentCard(t) {
  const hasSeries = t.series && t.series.length > 0;

  const seriesHtml = hasSeries
    ? `<div class="t-series-list">
        ${t.series.map(s => {
          const b = s.batting, bw = s.bowling;
          const parts = [];
          if (b.mat)   parts.push(`<span class="t-series-stat"><b>${b.mat}</b> mat</span>`);
          if (b.runs)  parts.push(`<span class="t-series-stat"><b>${b.runs}</b> runs</span>`);
          if (b.ave && b.ave !== '—') parts.push(`<span class="t-series-stat"><b>${b.ave}</b> avg</span>`);
          if (b.hs)    parts.push(`<span class="t-series-stat"><b>${b.hs}</b> HS</span>`);
          if (bw.wkts) parts.push(`<span class="t-series-stat"><b>${bw.wkts}</b> wkts</span>`);
          if (bw.catches > 0) parts.push(`<span class="t-series-stat"><b>${bw.catches}</b> ctch</span>`);
          return `
            <div class="t-series-row">
              <div class="t-series-head">
                <span class="t-series-name">${s.seriesName}</span>
                ${s.year ? `<span class="t-series-year">${s.year}</span>` : ''}
              </div>
              <div class="t-series-stats">${parts.join('')}</div>
            </div>`;
        }).join('')}
      </div>`
    : '';

  const zeroHtml = t.isZero
    ? `<p class="t-zero">No recorded activity</p>`
    : '';

  const miniStats = !t.isZero ? `
    <div class="t-mini-stats">
      <div class="t-stat"><strong>${t.mat}</strong><span>Matches</span></div>
      <div class="t-stat"><strong>${t.runs}</strong><span>Runs</span></div>
      <div class="t-stat"><strong>${t.avg ?? '—'}</strong><span>Avg</span></div>
      <div class="t-stat"><strong>${t.hs > 0 ? t.hs : '—'}</strong><span>HS</span></div>
      <div class="t-stat"><strong>${t.catches}</strong><span>Ctch</span></div>
    </div>
  ` : '';

  return `
    <div class="t-card fade-up" role="listitem" aria-label="${t.name}">
      <div class="t-card-head" onclick="toggleCard(this.closest('.t-card'))">
        <div>
          <div class="t-name">${t.name}</div>
          <div style="display:flex;gap:.4rem;margin-top:.4rem;flex-wrap:wrap">
            ${fmtBadge(t.formats)}
          </div>
        </div>
        ${!t.isZero ? `<span class="t-chevron" aria-hidden="true">▼</span>` : ''}
      </div>
      ${miniStats}
      ${zeroHtml}
      <div class="t-expand">
        ${hasSeries ? `
          <div style="padding:.25rem 1.25rem .25rem;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--ink3)">
            Series Breakdown
          </div>
          ${seriesHtml}
        ` : ''}
        ${!t.isZero && !hasSeries ? `
          <div style="padding:.5rem 1.25rem 1rem;font-size:.78rem;color:var(--ink3);font-style:italic">
            Series data not available
          </div>
        ` : ''}
        <div class="t-expand-detail" style="padding:.75rem 1.25rem 1.25rem">
          <table style="width:100%;font-size:.78rem;border-collapse:collapse">
            <tr><td style="color:var(--ink3);padding:.25rem 0">Innings</td><td style="font-weight:600">${t.inns}</td>
                <td style="color:var(--ink3);padding:.25rem 0 .25rem 1.5rem">Not Outs</td><td style="font-weight:600">${t.no}</td></tr>
            <tr><td style="color:var(--ink3);padding:.25rem 0">Balls Faced</td><td style="font-weight:600">${t.balls || '—'}</td>
                <td style="color:var(--ink3);padding:.25rem 0 .25rem 1.5rem">Strike Rate</td><td style="font-weight:600">${t.sr ?? '—'}</td></tr>
            <tr><td style="color:var(--ink3);padding:.25rem 0">Fours</td><td style="font-weight:600">${t.fours || 0}</td>
                <td style="color:var(--ink3);padding:.25rem 0 .25rem 1.5rem">Sixes</td><td style="font-weight:600">${t.sixes || 0}</td></tr>
            <tr><td style="color:var(--ink3);padding:.25rem 0">Wickets</td><td style="font-weight:600">${t.wkts}</td>
                <td style="color:var(--ink3);padding:.25rem 0 .25rem 1.5rem">Economy</td><td style="font-weight:600">${t.econ ?? '—'}</td></tr>
            ${t.bbf && t.bbf !== '0/0' ? `<tr><td style="color:var(--ink3);padding:.25rem 0">Best Bowling</td><td style="font-weight:600;color:var(--teal)" colspan="3">${t.bbf}</td></tr>` : ''}
          </table>
        </div>
      </div>
    </div>
  `;
}

window.toggleCard = function(card) {
  if (!card) return;
  card.classList.toggle('open');
};

function renderTournaments(search = '', fmt = '') {
  const grid = document.getElementById('tournamentGrid');
  if (!grid) return;

  let filtered = DATA.tournaments;
  if (search)
    filtered = filtered.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
  if (fmt)
    filtered = filtered.filter(t => t.formats.some(f => f === fmt));

  // Update count label
  const countEl = document.getElementById('tourneyCount');
  if (countEl) countEl.textContent = filtered.length;

  if (!filtered.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--ink3);font-size:.875rem">No tournaments match your filters.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(buildTournamentCard).join('');
  initFadeUp();
}

function initTournamentFilters() {
  const search = document.getElementById('tourneySearch');
  const select = document.getElementById('formatFilter');
  let activeBtn = document.querySelector('.fmt-tab.active');

  const refresh = () => renderTournaments(search?.value ?? '', select?.value ?? '');

  search?.addEventListener('input', refresh);
  select?.addEventListener('change', () => {
    // Sync format pills with dropdown
    const val = select.value;
    document.querySelectorAll('.fmt-tab').forEach(b => b.classList.remove('active'));
    const match = [...document.querySelectorAll('.fmt-tab')].find(b => b.dataset.fmt === val);
    if (match) match.classList.add('active');
    refresh();
  });

  document.querySelectorAll('.fmt-tab').forEach(btn =>
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fmt-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (select) select.value = btn.dataset.fmt;
      refresh();
    })
  );
}

// ─────────────────────────────────────────────────────────────────────────
// STATS DEEP DIVE
// ─────────────────────────────────────────────────────────────────────────
function tableWrap(html) {
  return `<div class="table-wrap"><table class="data-table">${html}</table></div>`;
}

function renderBattingTable() {
  // Collect all series_type rows from DATA.tournaments (each formatRow)
  const rows = [];
  DATA.tournaments.forEach(t => {
    t.formatRows.forEach(r => {
      if (r.batting.mat === 0) return;
      rows.push({ tname: t.name, format: r.format, b: r.batting });
    });
  });

  const head = `<thead><tr>
    <th>Tournament</th><th>Format</th><th>M</th><th>Inn</th><th>NO</th>
    <th>Runs</th><th>Balls</th><th>Avg</th><th>SR</th><th>HS</th>
    <th>50s</th><th>25s</th><th>0s</th><th>4s</th><th>6s</th>
  </tr></thead>`;

  const body = '<tbody>' + rows.map(r => {
    const b   = r.b;
    const avg = parseFloat(b.ave);
    const sr  = parseFloat(b.sr);
    return `<tr>
      <td>${r.tname}</td>
      <td>${fmtBadge([r.format])}</td>
      <td>${b.mat}</td><td>${b.inns}</td><td>${b.no}</td>
      <td class="${b.runs >= 200 ? 'td-great' : b.runs >= 100 ? 'td-good' : ''}">${b.runs}</td>
      <td>${b.balls || '—'}</td>
      <td class="${avg >= 50 ? 'td-great' : avg >= 30 ? 'td-good' : avg > 0 && avg < 10 ? 'td-dim' : ''}">${b.ave}</td>
      <td class="${sr >= 90 ? 'td-great' : sr >= 60 ? 'td-good' : sr > 0 && sr < 30 ? 'td-dim' : ''}">${b.sr}</td>
      <td class="${b.hs >= 50 ? 'td-good' : ''}">${b.hs}</td>
      <td class="${b.x50 > 0 ? 'td-good' : ''}">${b.x50}</td>
      <td>${b.x25}</td>
      <td class="${b.x0 > 3 ? 'td-dim' : ''}">${b.x0}</td>
      <td>${b.fours}</td><td>${b.sixes}</td>
    </tr>`;
  }).join('') + '</tbody>';

  document.getElementById('statsPanel').innerHTML = tableWrap(head + body);
}

function renderBowlingTable() {
  const rows = [];
  DATA.tournaments.forEach(t => {
    t.formatRows.forEach(r => {
      if (r.bowling.mat === 0 && r.bowling.overs === '0.0') return;
      rows.push({ tname: t.name, format: r.format, bw: r.bowling });
    });
  });

  const head = `<thead><tr>
    <th>Tournament</th><th>Format</th><th>M</th><th>Inn</th>
    <th>Overs</th><th>Runs</th><th>Wkts</th><th>BBF</th>
    <th>Mdns</th><th>Ave</th><th>Econ</th><th>Wides</th><th>Catches</th>
  </tr></thead>`;

  const body = '<tbody>' + rows.map(r => {
    const bw  = r.bw;
    const ec  = parseFloat(bw.econ);
    const noBowl = bw.overs === '0.0' || bw.overs === '0';
    return `<tr>
      <td>${r.tname}</td>
      <td>${fmtBadge([r.format])}</td>
      <td>${bw.mat}</td><td>${bw.inns}</td>
      <td>${noBowl ? '—' : bw.overs}</td>
      <td>${noBowl ? '—' : bw.bowlRuns}</td>
      <td class="${bw.wkts > 0 ? 'td-good' : 'td-dim'}">${bw.wkts}</td>
      <td class="${bw.wkts > 0 ? 'td-good' : ''}">${bw.wkts > 0 ? bw.bbf : '—'}</td>
      <td>${noBowl ? '—' : bw.mdns}</td>
      <td>${noBowl ? '—' : bw.bowlAve}</td>
      <td class="${!noBowl && ec < 5 ? 'td-great' : !noBowl && ec < 7 ? 'td-good' : !noBowl && ec > 10 ? 'td-dim' : ''}">${noBowl ? '—' : bw.econ}</td>
      <td>${bw.wides}</td>
      <td class="${bw.catches > 0 ? 'td-good' : ''}">${bw.catches}</td>
    </tr>`;
  }).join('') + '</tbody>';

  document.getElementById('statsPanel').innerHTML = tableWrap(head + body);
}

function renderKeepingTable() {
  const rows = DATA.tournaments
    .filter(t => t.catches > 0)
    .map(t => ({ name: t.name, mat: t.mat, catches: t.catches }));

  const head = `<thead><tr>
    <th>Tournament</th><th>Matches</th><th>Catches</th><th>Catches/Match</th>
  </tr></thead>`;

  const body = '<tbody>' + rows.map(r => {
    const cpm = r.mat > 0 ? (r.catches / r.mat).toFixed(2) : '—';
    return `<tr>
      <td>${r.name}</td>
      <td>${r.mat}</td>
      <td class="${r.catches >= 5 ? 'td-good' : ''}">${r.catches}</td>
      <td class="${parseFloat(cpm) >= 0.5 ? 'td-good' : ''}">${cpm}</td>
    </tr>`;
  }).join('') + '</tbody>';

  document.getElementById('statsPanel').innerHTML = tableWrap(head + body);
}

function renderCareerTable() {
  const C = DATA.career;
  const rows = [
    ['Total Matches',          C.matches],
    ['Batting Innings',        C.innings],
    ['Not Outs',               C.notOuts],
    ['Career Runs',            C.runs],
    ['Batting Average',        C.avg],
    ['Strike Rate',            C.sr],
    ['Highest Score',          C.hs],
    ['Half Centuries (50+)',   C.x50],
    ['Quarter Centuries (25+)',C.x25],
    ['Ducks (0s)',             C.ducks],
    ['Fours Hit',              C.fours],
    ['Sixes Hit',              C.sixes],
    ['Bowling Overs',          C.overs],
    ['Bowling Runs Conceded',  C.bowlRuns],
    ['Wickets Taken',          C.wickets],
    ['Bowling Economy',        C.econ],
    ['Bowling Average',        C.bowlAvg || '—'],
    ['Catches',                C.catches],
    ['Wides Bowled',           C.wides],
    ['Tournaments Played',     C.tournaments],
  ];

  const head = `<thead><tr><th>Metric</th><th>Value</th></tr></thead>`;
  const body = '<tbody>' + rows.map(([k,v]) => `
    <tr>
      <td style="color:var(--ink2)">${k}</td>
      <td style="color:var(--teal);font-weight:700;font-family:'Space Grotesk',sans-serif">${v}</td>
    </tr>
  `).join('') + '</tbody>';

  document.getElementById('statsPanel').innerHTML = tableWrap(head + body);
}

function initStats() {
  renderBattingTable();
  document.querySelectorAll('.snav').forEach(btn =>
    btn.addEventListener('click', () => {
      document.querySelectorAll('.snav').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected','true');
      const tab = btn.dataset.tab;
      if (tab === 'batting')  renderBattingTable();
      if (tab === 'bowling')  renderBowlingTable();
      if (tab === 'keeping')  renderKeepingTable();
      if (tab === 'career')   renderCareerTable();
    })
  );
}

// ─────────────────────────────────────────────────────────────────────────
// PROFILE
// ─────────────────────────────────────────────────────────────────────────
function renderProfile() {
  const el = document.getElementById('profileDetails');
  if (!el) return;
  const P = PLAYER;
  const C = DATA.career;
  const fields = [
    { label:'Player Name',      value: P.name },
    { label:'CricClubs ID',     value: P.cricclubsId },
    { label:'Current Team',     value: P.team },
    { label:'Playing Role',     value: P.role },
    { label:'Jersey Number',    value: `#${P.jersey}` },
    { label:'Batting Style',    value: P.battingStyle },
    { label:'Bowling Style',    value: P.bowlingStyle },
    { label:'Seasons Active',   value: `${DATA.yearly[0]?.year ?? '—'} – ${DATA.yearly[DATA.yearly.length-1]?.year ?? '—'}` },
    { label:'Career Runs',      value: C.runs.toLocaleString() },
    { label:'Career Average',   value: C.avg },
  ];

  el.innerHTML = fields.map(f => `
    <div class="pd-item fade-up" role="listitem">
      <div class="pd-label">${f.label}</div>
      <div class="pd-value">${f.value}</div>
    </div>
  `).join('');

  // Update team in hero
  const teamEl = document.getElementById('heroTeam');
  if (teamEl) teamEl.textContent = `${P.team} · Jersey #${P.jersey}`;

  const profileTeam = document.getElementById('profileTeam');
  if (profileTeam) profileTeam.textContent = P.team;
}

// ─────────────────────────────────────────────────────────────────────────
// FADE-UP ANIMATION
// ─────────────────────────────────────────────────────────────────────────
function initFadeUp() {
  const els = document.querySelectorAll('.fade-up:not(.visible)');
  const io  = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 50);
        io.unobserve(e.target);
      }
    });
  }, { threshold: .08 });
  els.forEach(el => io.observe(el));
}

// ─────────────────────────────────────────────────────────────────────────
// DONE — all functions defined above, wired in initData()
// ─────────────────────────────────────────────────────────────────────────
