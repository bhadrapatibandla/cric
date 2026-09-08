/* ============================================================
   BHADRA PATIBANDLA — CRICKET PORTFOLIO  |  script.js
   ============================================================ */

// ── DATA ─────────────────────────────────────────────────────────────────────

const CAREER = {
  matches: 176, runs: 2223, wickets: 13, catches: 48,
  avg: 24.43, sr: 65.69, hs: 90, fifties: 8, twentyFives: 21, ducks: 15,
  fours: 180, sixes: 1, overs: '109.1', econ: 5.96, bowlAvg: 50.08,
  tournaments: 20,
  innings: 155, notOuts: 64, bowlInnings: 49, wides: 143
};

const PROFILE = [
  { label: 'Player Name',    value: 'Bhadra Patibandla' },
  { label: 'CricClubs ID',   value: '2772381' },
  { label: 'Current Team',   value: 'SanAntonio Road Runners U11' },
  { label: 'Playing Role',   value: 'Wicket Keeper' },
  { label: 'Jersey Number',  value: '#29' },
  { label: 'Batting Style',  value: 'Right Hand Batter (Top Order)' },
  { label: 'Bowling Style',  value: 'Right Arm Leg Spin' },
  { label: 'Tournament Span','value': '2024 – 2026' },
];

// Tournament summary — one row per tournament (source: Tournament Summary sheet)
const TOURNAMENTS = [
  { name: 'Dallas Youth Cricket League (DYCL Official)', matches:12,  runs:197,  avg:21.89, sr:59.34, hs:87, wkts:0, econ:9.00, catches:10, fifties:1, format:'YOUTH/1DAY' },
  { name: 'Cricket of San Antonio',                      matches:48,  runs:391,  avg:13.96, sr:48.94, hs:50, wkts:6, econ:6.75, catches:8,  fifties:1, format:'1DAY/T20'   },
  { name: 'Houston Taped Ball Cricket',                  matches:2,   runs:8,    avg:null,  sr:42.11, hs:8,  wkts:0, econ:null, catches:0,  fifties:0, format:'T20'         },
  { name: 'National Youth Cricket Tournament',           matches:7,   runs:192,  avg:48.00, sr:81.36, hs:59, wkts:0, econ:null, catches:0,  fifties:2, format:'1DAY'        },
  { name: 'American Cricket League',                     matches:10,  runs:66,   avg:16.50, sr:45.83, hs:21, wkts:0, econ:10.0, catches:1,  fifties:0, format:'T20/1DAY'   },
  { name: 'Austin Youth League',                         matches:4,   runs:50,   avg:50.00, sr:79.37, hs:48, wkts:0, econ:null, catches:0,  fifties:0, format:'YOUTH'       },
  { name: 'Frisco Youth Cricket League',                 matches:3,   runs:33,   avg:16.50, sr:53.23, hs:19, wkts:0, econ:null, catches:0,  fifties:0, format:'1DAY'        },
  { name: 'The Matches',                                 matches:1,   runs:10,   avg:10.00, sr:28.57, hs:10, wkts:0, econ:null, catches:0,  fifties:0, format:'1DAY'        },
  { name: 'NTCAYouth',                                   matches:4,   runs:0,    avg:null,  sr:null,  hs:0,  wkts:0, econ:12.0, catches:0,  fifties:0, format:'1DAY'        },
  { name: 'MLK JR Texas Cup',                            matches:8,   runs:147,  avg:29.40, sr:73.13, hs:67, wkts:0, econ:3.00, catches:3,  fifties:1, format:'1DAY/T20'   },
  { name: 'USA Cricket Junior Pathway',                  matches:31,  runs:497,  avg:38.23, sr:84.38, hs:90, wkts:4, econ:2.20, catches:12, fifties:1, format:'T20/1DAY'   },
  { name: 'ACL Test Series',                             matches:1,   runs:3,    avg:3.00,  sr:13.64, hs:2,  wkts:1, econ:3.00, catches:0,  fifties:0, format:'TEST'        },
  { name: 'Lonestar Premier Cricket League (LPCL)',      matches:3,   runs:5,    avg:1.67,  sr:20.83, hs:5,  wkts:1, econ:6.50, catches:0,  fifties:0, format:'1DAY'        },
  { name: 'TexasYouthPremierLeague',                     matches:0,   runs:0,    avg:null,  sr:null,  hs:0,  wkts:0, econ:null, catches:0,  fifties:0, format:'ZERO'        },
  { name: 'AMLCA - Elite Jr Championship',               matches:8,   runs:46,   avg:6.57,  sr:46.00, hs:13, wkts:0, econ:null, catches:2,  fifties:0, format:'1DAY'        },
  { name: 'Presidents Cup',                              matches:8,   runs:86,   avg:17.20, sr:100.0, hs:8,  wkts:1, econ:6.17, catches:1,  fifties:0, format:'T20'         },
  { name: '22Yards League',                              matches:0,   runs:0,    avg:null,  sr:null,  hs:0,  wkts:0, econ:null, catches:0,  fifties:0, format:'ZERO'        },
  { name: 'Austin Elite Youth Cricket League',           matches:9,   runs:224,  avg:74.67, sr:77.78, hs:50, wkts:0, econ:7.20, catches:2,  fifties:2, format:'T20'         },
  { name: 'Austin Youth Cricket Consortium',             matches:13,  runs:209,  avg:69.67, sr:69.90, hs:44, wkts:0, econ:5.00, catches:7,  fifties:0, format:'YOUTH/1DAY/TEST' },
  { name: 'Houston Invitational Tournament (HIT)',       matches:4,   runs:59,   avg:29.50, sr:69.41, hs:20, wkts:0, econ:1.50, catches:2,  fifties:0, format:'T20'         },
];

// Yearly progression — source: Raw Batting/Bowling Series sheets, aggregated by year
// Only rows with explicit year tags are counted (no null-year aggregates)
const YEARLY_STATS = [
  {
    year: 2024, matches: 22, innings: 18,
    notOuts: 7,  runs: 207,  balls: 356,
    avg: 18.82,  sr: 58.15, hs: 57,
    fifties: 1,  twentyFives: 2, ducks: 3,
    fours: 8,    sixes: 0,
    wickets: 0,  catches: 1,
    overs: '9.0', runsConc: 80, econ: 8.89,
    tournaments: 5,
    tournamentNames: ['DYCL','NYCT','ACL','Austin Youth','USAC'],
  },
  {
    year: 2025, matches: 33, innings: 30,
    notOuts: 11, runs: 385,  balls: 501,
    avg: 20.26,  sr: 76.85, hs: 59,
    fifties: 1,  twentyFives: 1, ducks: 4,
    fours: 28,   sixes: 0,
    wickets: 0,  catches: 8,
    overs: '2.7', runsConc: 7, econ: 2.63,
    tournaments: 10,
    tournamentNames: ['DYCL','NYCT','ACL','Frisco YCL','The Matches','MLK Cup','AMLCA','Presidents Cup','Austin Consortium','HIT'],
  },
  {
    year: 2026, matches: 54, innings: 46,
    notOuts: 20, runs: 1054, balls: 1088,
    avg: 40.54,  sr: 96.88, hs: 90,
    fifties: 3,  twentyFives: 15, ducks: 4,
    fours: 103,  sixes: 1,
    wickets: 0,  catches: 7,
    overs: '1.0', runsConc: 17, econ: 17.00,
    tournaments: 5,
    tournamentNames: ['DYCL','MLK Cup','USAC','Presidents Cup','Austin Consortium'],
  },
];
// Columns: [Tournament, Format, M, Inn, NO, Runs, Balls, Avg, SR, HS, 50s]
const BATTING_ROWS = [
  ['Dallas Youth Cricket League', 'YOUTH', 8,  8,  2, 188, 278, '31.33', '67.63', 87, 1],
  ['Dallas Youth Cricket League', '1 DAY', 4,  3,  0,   9,  54,  '3.00', '16.67',  4, 0],
  ['Cricket of San Antonio',      '1 DAY', 25, 25, 9, 235, 436, '14.69', '53.90', 50, 1],
  ['Cricket of San Antonio',      'T20',   23, 21, 9, 156, 363, '13.00', '42.98', 38, 0],
  ['Houston Taped Ball Cricket',  'T20',    2,  1, 1,   8,  19,     '—', '42.11',  8, 0],
  ['Natl Youth Cricket Tournament','1 DAY', 7,  7, 3, 192, 236, '48.00', '81.36', 59, 2],
  ['American Cricket League',     'T20',    9,  7, 3,  59, 123, '14.75', '47.97', 21, 0],
  ['American Cricket League',     '1 DAY',  1,  1, 1,   7,  21,     '—', '33.33',  7, 0],
  ['Austin Youth League',         'YOUTH',  4,  3, 2,  50,  63, '50.00', '79.37', 48, 0],
  ['Frisco Youth Cricket League', '1 DAY',  3,  3, 1,  33,  62, '16.50', '53.23', 19, 0],
  ['The Matches',                 '1 DAY',  1,  1, 0,  10,  35, '10.00', '28.57', 10, 0],
  ['NTCAYouth',                   '1 DAY',  4,  0, 0,   0,   0,     '—',     '—',  0, 0],
  ['MLK JR Texas Cup',            '1 DAY',  4,  3, 0, 113, 128, '37.67', '88.28', 67, 1],
  ['MLK JR Texas Cup',            'T20',    4,  3, 1,  34,  73, '17.00', '46.58', 18, 0],
  ['USA Cricket Junior Pathway',  'T20',   24, 19, 8, 461, 516, '41.91', '89.34', 90, 1],
  ['USA Cricket Junior Pathway',  '1 DAY',  6,  4, 3,  36,  72, '36.00', '50.00', 18, 0],
  ['USA Cricket Junior Pathway',  'YOUTH',  1,  1, 0,   0,   1,  '0.00',  '0.00',  0, 0],
  ['ACL Test Series',             'TEST',   1,  2, 1,   3,  22,  '3.00', '13.64',  2, 0],
  ['LPCL',                        '1 DAY',  3,  3, 0,   5,  24,  '1.67', '20.83',  5, 0],
  ['AMLCA - Elite Jr Championship','1 DAY', 8,  8, 1,  46, 100,  '6.57', '46.00', 13, 0],
  ['Presidents Cup',              'T20',    8,  6, 1,  86,  86, '17.20','100.00',  8, 0],
  ['Austin Elite Youth C.L.',     'T20',    9,  9, 6, 224, 288, '74.67', '77.78', 50, 2],
  ['Austin Youth Cricket Consort.','YOUTH', 4,  4, 3,  87,  88, '87.00', '98.86', 44, 0],
  ['Austin Youth Cricket Consort.','1 DAY', 7,  7, 6,  74, 143, '74.00', '51.75', 16, 0],
  ['Austin Youth Cricket Consort.','TEST',  2,  2, 1,  48,  68, '48.00', '70.59', 29, 0],
  ['Houston Invitational (HIT)',  'T20',    4,  4, 2,  59,  85, '20.50', '69.49', 20, 0],
];

// Bowling detailed rows — source: Bowling sheet in data.json
// Columns: [Tournament, Format, M, Inn, Overs, Runs, Wkts, Best, Mdns, Econ]
const BOWLING_ROWS = [
  ['Dallas Youth Cricket League', 'YOUTH',  8,  1, '1.0',  17, 0, '0/0', 0, 17.00],
  ['Dallas Youth Cricket League', '1 DAY',  4,  1, '2.0',  10, 0, '0/0', 0,  5.00],
  ['Cricket of San Antonio',      '1 DAY', 25, 13, '30.0', 225, 5, '5/1', 0,  7.50],
  ['Cricket of San Antonio',      'T20',   23,  8, '23.0', 133, 1,'13/1', 0,  5.78],
  ['American Cricket League',     'T20',    9,  3, '7.0',   70, 0, '0/0', 0, 10.00],
  ['NTCAYouth',                   '1 DAY',  4,  1, '0.3',    6, 0, '0/0', 0, 12.00],
  ['MLK JR Texas Cup',            'T20',    4,  1, '2.0',    6, 0, '0/0', 0,  3.00],
  ['USA Cricket Junior Pathway',  'T20',   24,  4, '8.0',    4, 1,'10/1', 1,  0.50],
  ['USA Cricket Junior Pathway',  '1 DAY',  6,  4, '7.0',   29, 3,'10/2', 0,  4.14],
  ['ACL Test Series',             'TEST',   1,  2, '7.0',   21, 1,'15/1', 0,  3.00],
  ['LPCL',                        '1 DAY',  3,  2, '4.0',   26, 1,'16/1', 0,  6.50],
  ['Presidents Cup',              'T20',    8,  4, '6.0',   37, 1, '6/1', 0,  6.17],
  ['Austin Elite Youth C.L.',     'T20',    9,  2, '5.0',   36, 0, '0/0', 1,  7.20],
  ['Austin Youth Cricket Consort.','YOUTH', 4,  1, '5.0',   28, 0, '0/0', 0,  5.60],
  ['Austin Youth Cricket Consort.','1 DAY', 7,  0, '0.0',    0, 0, '0/0', 0,  0.00],
  ['Austin Youth Cricket Consort.','TEST',  2,  1, '1.0',    2, 0, '0/0', 0,  2.00],
  ['Houston Invitational (HIT)',  'T20',    4,  1, '0.4',    1, 0, '0/0', 0,  1.50],
];

// Wicketkeeping rows — source: Wicketkeeping sheet in data.json
// Columns: [Tournament, Format, Matches, Catches]
const KEEPING_ROWS = [
  ['Dallas Youth Cricket League',    'All', 12, 10],
  ['Cricket of San Antonio',         'All', 48,  8],
  ['National Youth Cricket Tourn.',  'All',  7,  0],
  ['American Cricket League',        'All', 10,  1],
  ['MLK JR Texas Cup',               'All',  8,  3],
  ['USA Cricket Junior Pathway',     'All', 31, 12],
  ['AMLCA - Elite Jr Championship',  'All',  8,  2],
  ['Presidents Cup',                 'All',  8,  1],
  ['Austin Elite Youth C.L.',        'All',  9,  2],
  ['Austin Youth Cricket Consort.',  'All', 13,  7],
  ['Houston Invitational (HIT)',     'All',  4,  2],
];

// ── CANVAS PARTICLE BACKGROUND ───────────────────────────────────────────────

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
      this.vx = (Math.random() - .5) * .4;
      this.vy = (Math.random() - .5) * .4;
      this.r  = Math.random() * 1.6 + .4;
      this.a  = Math.random() * .5 + .1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100,180,255,${this.a})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = Array.from({ length: 120 }, () => new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(100,180,255,${.12 * (1 - d / 100)})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
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
  initParticles();
  frame();
  window.addEventListener('resize', () => { resize(); initParticles(); });
}

// ── COUNT-UP ANIMATION ────────────────────────────────────────────────────────

function countUp(el, target, duration = 1800) {
  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

function initCountUps() {
  const pairs = [
    ['c1', 176], ['c2', 2223], ['c3', 48], ['c4', 20]
  ];
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        pairs.forEach(([id, val]) => {
          const el = document.getElementById(id);
          if (el) countUp(el, val);
        });
        io.disconnect();
      }
    });
  }, { threshold: .3 });
  const hero = document.querySelector('.hero-stats');
  if (hero) io.observe(hero);
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────

function initNav() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
  const toggle = document.getElementById('navToggle');
  const links  = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => links?.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => links?.classList.remove('open'));
  });
}

// ── FADE-IN ON SCROLL ─────────────────────────────────────────────────────────

function initFadeUp() {
  const els = document.querySelectorAll('.ov-card, .t-card, .pd-item, .chart-container');
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold: .1 });
  els.forEach(el => { el.classList.add('fade-up'); io.observe(el); });
}

// ── OVERVIEW CARDS ────────────────────────────────────────────────────────────

function renderOverview() {
  const cards = [
    { icon:'🏏', value: CAREER.matches,             label:'Matches Played',    sub:'Across 20 tournaments',          color:'c-blue'   },
    { icon:'📊', value: CAREER.runs.toLocaleString(),label:'Career Runs',       sub:'Right hand top-order batter',    color:'c-teal'   },
    { icon:'⚡', value: CAREER.avg,                  label:'Batting Average',   sub:'Career batting average',         color:'c-gold'   },
    { icon:'💥', value: CAREER.sr,                   label:'Strike Rate',       sub:'Runs per 100 balls faced',       color:'c-purple' },
    { icon:'🎯', value: CAREER.hs,                   label:'Highest Score',     sub:'vs USA Cricket Junior Pathway',  color:'c-blue'   },
    { icon:'🏆', value: CAREER.fifties,              label:'Half Centuries',    sub:'50+ scores in career',           color:'c-green'  },
    { icon:'🎳', value: CAREER.wickets,              label:'Wickets Taken',     sub:'Right arm leg spin',             color:'c-orange' },
    { icon:'🧤', value: CAREER.catches,              label:'Catches',           sub:'Wicket-keeper dismissals',       color:'c-pink'   },
  ];
  document.getElementById('overviewGrid').innerHTML = cards.map(c => `
    <div class="ov-card ${c.color}">
      <span class="ov-icon">${c.icon}</span>
      <div class="ov-value">${c.value}</div>
      <div class="ov-label">${c.label}</div>
      <div class="ov-sub">${c.sub}</div>
    </div>
  `).join('');
}

// ── CHARTS ───────────────────────────────────────────────────────────────────

let mainChart = null;

const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: true,
  animation: { duration: 700, easing: 'easeOutQuart' },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0d1b2e',
      titleColor: '#e8edf4',
      bodyColor: '#7a9bb8',
      borderColor: 'rgba(255,255,255,.1)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 10,
    }
  },
  scales: {
    x: {
      ticks: { color: '#7a9bb8', font: { size: 10 }, maxRotation: 35 },
      grid: { color: 'rgba(255,255,255,.05)' },
    },
    y: {
      ticks: { color: '#7a9bb8', font: { size: 11 } },
      grid: { color: 'rgba(255,255,255,.05)' },
    }
  }
};

const INSIGHTS = {
  runs:    `<strong>Runs by Tournament:</strong> USA Cricket Junior Pathway leads with <strong>497 runs</strong> across 31 matches, followed by Cricket of San Antonio (391), Austin Elite Youth Cricket League (224), and Austin Youth Cricket Consortium (209). Bhadra has contributed runs in every active tournament.`,
  avg:     `<strong>Batting Average:</strong> Austin Elite Youth Cricket League shows the highest average at <strong>74.67</strong>, followed by Austin Youth Cricket Consortium (69.67) and Austin Youth League (50.00). His NYCT average is an outstanding <strong>48.00</strong>, and across USA Cricket Junior Pathway — his most-played tournament — he averages <strong>38.23</strong>.`,
  sr:      `<strong>Strike Rate:</strong> Presidents Cup features a blistering <strong>100.0 SR</strong>. Austin Youth Cricket Consortium (YOUTH) reaches 98.86, and USA Cricket Junior Pathway T20s hit 89.34. His MLK JR Texas Cup 1DAY SR of 88.28 shows he scores quickly under pressure too.`,
  bowling: `<strong>Bowling Economy:</strong> USA Cricket Junior Pathway T20 is his most economical — <strong>0.50 RPO</strong> from 8 overs, including 1 wicket and 1 maiden. ACL Test Series (3.00) and MLK JR Texas Cup T20 (3.00) also show tight control. His best figures are <strong>5/1</strong> for Cricket of San Antonio (1DAY) and <strong>3 wickets</strong> for USA Junior Pathway 1DAY.`,
  radar:   `<strong>All-Round Profile:</strong> Radar shows Bhadra's strengths across 5 key dimensions benchmarked against U11 peer standards. Batting average (24.43 vs 15 benchmark), wicket-keeping (48 catches), highest score (90), run volume (2,223), and wickets (13) all contribute to a well-rounded junior profile.`,
};

const ACTIVE_TOURS = TOURNAMENTS.filter(t => t.matches > 0);

function buildChart(type) {
  const ctx = document.getElementById('mainChart').getContext('2d');
  if (mainChart) { mainChart.destroy(); mainChart = null; }

  document.getElementById('chartInsight').innerHTML = INSIGHTS[type] || '';

  const labels = ACTIVE_TOURS.map(t => {
    const w = t.name.split(' ');
    return w.length > 4 ? w.slice(0,3).join(' ') + '…' : t.name;
  });

  if (type === 'radar') {
    // Benchmarks: realistic U11/youth competitive player reference points
    // batting avg benchmark 30, SR benchmark 75, runs benchmark 400,
    // catches benchmark 20, wickets benchmark 10
    const data = {
      labels: ['Batting Avg', 'Strike Rate', 'Run Volume', 'Catches', 'Wickets'],
      datasets: [{
        label: 'Bhadra',
        data: [
          Math.min((CAREER.avg  / 30)  * 100, 100),   // avg 24.43 / 30 = 81%
          Math.min((CAREER.sr   / 75)  * 100, 100),   // sr  65.69 / 75 = 88%
          Math.min((CAREER.runs / 400) * 100, 100),   // runs 2223 / 400 = 100% (cap)
          Math.min((CAREER.catches / 20) * 100, 100), // catches 48 / 20 = 100% (cap)
          Math.min((CAREER.wickets / 10) * 100, 100), // wickets 13 / 10 = 100% (cap)
        ],
        fill: true,
        backgroundColor: 'rgba(0,201,167,.15)',
        borderColor: '#00c9a7',
        pointBackgroundColor: '#00c9a7',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#00c9a7',
        borderWidth: 2,
        pointRadius: 5,
      }]
    };
    mainChart = new Chart(ctx, {
      type: 'radar',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: { duration: 700 },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0d1b2e',
            titleColor: '#e8edf4',
            bodyColor: '#7a9bb8',
            borderColor: 'rgba(255,255,255,.1)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 10,
          }
        },
        scales: {
          r: {
            min: 0, max: 100,
            ticks: { stepSize: 25, color: '#7a9bb8', backdropColor: 'transparent', font:{size:10} },
            grid:  { color: 'rgba(255,255,255,.1)' },
            pointLabels: { color: '#e8edf4', font: { size: 13, weight: '600' } },
            angleLines: { color: 'rgba(255,255,255,.1)' },
          }
        }
      }
    });
    return;
  }

  const gradFn = (color) => {
    const g = ctx.createLinearGradient(0, 0, 0, 380);
    g.addColorStop(0, color + '99');
    g.addColorStop(1, color + '11');
    return g;
  };

  const configs = {
    runs: {
      data: ACTIVE_TOURS.map(t => t.runs),
      color: '#1a6fff',
      label: 'Runs',
    },
    avg: {
      data: ACTIVE_TOURS.map(t => t.avg ?? 0),
      color: '#00c9a7',
      label: 'Batting Average',
    },
    sr: {
      data: ACTIVE_TOURS.map(t => t.sr ?? 0),
      color: '#f5a623',
      label: 'Strike Rate',
    },
    bowling: {
      data: ACTIVE_TOURS.map(t => t.econ ?? 0),
      color: '#8b5cf6',
      label: 'Economy Rate',
    },
  };

  const cfg = configs[type];

  mainChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: cfg.label,
        data: cfg.data,
        backgroundColor: gradFn(cfg.color),
        borderColor: cfg.color,
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: cfg.color + 'cc',
      }]
    },
    options: {
      ...CHART_DEFAULTS,
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            title: (items) => ACTIVE_TOURS[items[0].dataIndex]?.name ?? '',
            label: (item) => ` ${cfg.label}: ${item.raw}`
          }
        }
      }
    }
  });
}

function initCharts() {
  buildChart('runs');
  document.querySelectorAll('.ctab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ctab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildChart(btn.dataset.chart);
    });
  });
}

// ── TOURNAMENT CARDS ──────────────────────────────────────────────────────────

function fmtClass(fmt) {
  const f = fmt.toUpperCase();
  if (f.includes('T20'))  return 'fmt-t20';
  if (f.includes('1DAY') || f.includes('1 DAY')) return 'fmt-1day';
  if (f.includes('YOUTH')) return 'fmt-youth';
  if (f.includes('TEST'))  return 'fmt-test';
  if (f === 'ZERO')        return 'fmt-zero';
  return 'fmt-mix';
}

function fmtLabel(fmt) {
  if (fmt === 'ZERO') return 'No Activity';
  return fmt.replace(/\//g,' / ');
}

function renderTournamentCards(search = '', formatFilter = '') {
  const grid = document.getElementById('tournamentGrid');
  const filtered = TOURNAMENTS.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchFmt = !formatFilter || t.format.toUpperCase().includes(formatFilter.toUpperCase());
    return matchSearch && matchFmt;
  });

  if (!filtered.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--ink2);font-size:14px;">No tournaments match your filters.</div>`;
    return;
  }

  grid.innerHTML = filtered.map((t, i) => {
    const isZero = t.format === 'ZERO';
    const expand = !isZero ? `
      <div class="t-expand">
        <table class="t-detail-table">
          <thead>
            <tr><th>Metric</th><th>Batting</th><th>Bowling</th><th>Keeping</th></tr>
          </thead>
          <tbody>
            <tr><td>Matches</td><td colspan="3">${t.matches}</td></tr>
            <tr>
              <td>Runs / Average</td>
              <td>${t.runs} / ${t.avg != null ? t.avg : '—'}</td>
              <td>Wkts: ${t.wkts}</td>
              <td>Catches: ${t.catches}</td>
            </tr>
            <tr>
              <td>Strike Rate</td>
              <td>${t.sr != null ? t.sr : '—'}</td>
              <td>Economy: ${t.econ != null ? t.econ : '—'}</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Highest Score</td>
              <td>${t.hs > 0 ? t.hs : '—'}</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Half Centuries</td>
              <td>${t.fifties}</td>
              <td>—</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="t-card-footer">
        <span>Click to expand details</span>
        <span class="t-chevron">▼</span>
      </div>
    ` : '<div class="zero-badge">No recorded activity</div>';

    return `
      <div class="t-card" onclick="toggleCard(this)">
        <div class="t-card-header">
          <div class="t-name">${t.name}</div>
          <span class="t-format ${fmtClass(t.format)}">${fmtLabel(t.format)}</span>
        </div>
        ${!isZero ? `
        <div class="t-mini-stats">
          <div class="t-stat"><strong>${t.matches}</strong><span>Matches</span></div>
          <div class="t-stat"><strong>${t.runs}</strong><span>Runs</span></div>
          <div class="t-stat"><strong>${t.avg ?? '—'}</strong><span>Avg</span></div>
          <div class="t-stat"><strong>${t.hs}</strong><span>HS</span></div>
          <div class="t-stat"><strong>${t.catches}</strong><span>Catches</span></div>
        </div>
        ` : ''}
        ${expand}
      </div>
    `;
  }).join('');

  // Re-run fade-up on newly rendered cards
  initFadeUp();
}

function toggleCard(card) {
  card.classList.toggle('expanded');
  // update footer text
  const footer = card.querySelector('.t-card-footer span:first-child');
  if (footer) {
    footer.textContent = card.classList.contains('expanded')
      ? 'Click to collapse'
      : 'Click to expand details';
  }
}

function initTournaments() {
  renderTournamentCards();
  const search = document.getElementById('tourneySearch');
  const fmt    = document.getElementById('formatFilter');
  search.addEventListener('input',  () => renderTournamentCards(search.value, fmt.value));
  fmt.addEventListener('change',    () => renderTournamentCards(search.value, fmt.value));
}

// ── YEAR BY YEAR ──────────────────────────────────────────────────────────────

let yearlyChart = null;

const YEARLY_METRICS = {
  runs:    { label: 'Runs',         color: '#1a6fff', key: 'runs'    },
  avg:     { label: 'Batting Avg',  color: '#00c9a7', key: 'avg'     },
  sr:      { label: 'Strike Rate',  color: '#f5a623', key: 'sr'      },
  matches: { label: 'Matches',      color: '#8b5cf6', key: 'matches' },
};

function buildYearlyChart(metric) {
  const ctx = document.getElementById('yearlyChart').getContext('2d');
  if (yearlyChart) { yearlyChart.destroy(); yearlyChart = null; }

  const cfg  = YEARLY_METRICS[metric];
  const vals = YEARLY_STATS.map(y => y[cfg.key]);
  const labels = YEARLY_STATS.map(y => String(y.year));

  // Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 280);
  grad.addColorStop(0, cfg.color + 'cc');
  grad.addColorStop(1, cfg.color + '11');

  yearlyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
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
        pointRadius: 8,
        pointHoverRadius: 11,
        tension: 0.35,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 700, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0d1b2e',
          titleColor: '#e8edf4',
          bodyColor: '#7a9bb8',
          borderColor: 'rgba(255,255,255,.1)',
          borderWidth: 1,
          padding: 14,
          cornerRadius: 10,
          callbacks: {
            title: items => YEARLY_STATS[items[0].dataIndex].year + ' Season',
            label: item  => ` ${cfg.label}: ${item.raw}`,
            afterLabel: item => {
              const y = YEARLY_STATS[item.dataIndex];
              return ` Matches: ${y.matches}  |  HS: ${y.hs}  |  50s: ${y.fifties}`;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#7a9bb8', font: { size: 13, weight: '700' } },
          grid:  { color: 'rgba(255,255,255,.05)' },
        },
        y: {
          ticks: { color: '#7a9bb8', font: { size: 11 } },
          grid:  { color: 'rgba(255,255,255,.05)' },
          beginAtZero: true,
        }
      }
    }
  });
}

function renderYearlyCards() {
  const container = document.getElementById('yearlyCards');
  container.innerHTML = YEARLY_STATS.map((y, i) => {
    const prev = YEARLY_STATS[i - 1];
    const runsGrowth = prev ? Math.round(((y.runs - prev.runs) / prev.runs) * 100) : null;
    const avgGrowth  = prev ? (y.avg - prev.avg).toFixed(1) : null;

    const growthBadge = runsGrowth !== null
      ? `<span class="yc-growth ${runsGrowth >= 0 ? 'yc-up' : 'yc-down'}">
           ${runsGrowth >= 0 ? '▲' : '▼'} ${Math.abs(runsGrowth)}% runs
         </span>`
      : '<span class="yc-growth yc-base">Baseline</span>';

    return `
      <div class="yc-card">
        <div class="yc-year-wrap">
          <span class="yc-year">${y.year}</span>
          ${growthBadge}
        </div>
        <div class="yc-primary">
          <div class="yc-stat">
            <span class="yc-val">${y.runs}</span>
            <span class="yc-lbl">Runs</span>
          </div>
          <div class="yc-stat">
            <span class="yc-val">${y.avg}</span>
            <span class="yc-lbl">Average</span>
          </div>
          <div class="yc-stat">
            <span class="yc-val">${y.sr}</span>
            <span class="yc-lbl">Strike Rate</span>
          </div>
          <div class="yc-stat">
            <span class="yc-val">${y.matches}</span>
            <span class="yc-lbl">Matches</span>
          </div>
          <div class="yc-stat">
            <span class="yc-val">${y.hs}</span>
            <span class="yc-lbl">Highest Score</span>
          </div>
          <div class="yc-stat">
            <span class="yc-val">${y.fifties}</span>
            <span class="yc-lbl">50s</span>
          </div>
          <div class="yc-stat">
            <span class="yc-val">${y.fours}</span>
            <span class="yc-lbl">Fours</span>
          </div>
          <div class="yc-stat">
            <span class="yc-val">${y.catches}</span>
            <span class="yc-lbl">Catches</span>
          </div>
        </div>
        <div class="yc-tours">
          <span class="yc-tours-label">${y.tournaments} tournament${y.tournaments > 1 ? 's' : ''}:</span>
          ${y.tournamentNames.map(t => `<span class="yc-tour-badge">${t}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderGrowthCallout() {
  const first = YEARLY_STATS[0];
  const last  = YEARLY_STATS[YEARLY_STATS.length - 1];
  const runsGrowth = Math.round(((last.runs - first.runs) / first.runs) * 100);
  const avgGrowth  = (last.avg - first.avg).toFixed(1);
  const srGrowth   = (last.sr  - first.sr ).toFixed(1);

  document.getElementById('growthCallout').innerHTML = `
    <div class="gc-inner">
      <div class="gc-title">📈 3-Year Career Growth</div>
      <div class="gc-stats">
        <div class="gc-item">
          <span class="gc-val gc-positive">+${runsGrowth}%</span>
          <span class="gc-lbl">Run Volume<br><small>${first.runs} → ${last.runs}</small></span>
        </div>
        <div class="gc-item">
          <span class="gc-val gc-positive">+${avgGrowth}</span>
          <span class="gc-lbl">Batting Average<br><small>${first.avg} → ${last.avg}</small></span>
        </div>
        <div class="gc-item">
          <span class="gc-val gc-positive">+${srGrowth}</span>
          <span class="gc-lbl">Strike Rate<br><small>${first.sr} → ${last.sr}</small></span>
        </div>
        <div class="gc-item">
          <span class="gc-val gc-positive">+${last.matches - first.matches}</span>
          <span class="gc-lbl">More Matches<br><small>${first.matches} → ${last.matches}</small></span>
        </div>
      </div>
    </div>
  `;
}

function initYearly() {
  buildYearlyChart('runs');
  renderYearlyCards();
  renderGrowthCallout();

  document.querySelectorAll('.ytab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ytab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildYearlyChart(btn.dataset.metric);
    });
  });
}

// ── STATS DEEP DIVE ───────────────────────────────────────────────────────────

function tableWrap(html) {
  return `<div class="table-wrap"><table class="data-table">${html}</table></div>`;
}

function renderBatting() {
  const headers = ['Tournament','Format','M','Inn','NO','Runs','Balls','Avg','SR','HS','50s'];
  const head = '<thead><tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr></thead>';
  const body = '<tbody>' + BATTING_ROWS.map(r => {
    const avg = parseFloat(r[7]);
    const sr  = parseFloat(r[8]);
    return `<tr>
      <td>${r[0]}</td>
      <td>${r[1]}</td>
      <td>${r[2]}</td>
      <td>${r[3]}</td>
      <td>${r[4]}</td>
      <td class="${r[5] >= 100 ? 'td-good' : r[5] >= 50 ? '' : ''}">${r[5]}</td>
      <td>${r[6]}</td>
      <td class="${avg >= 50 ? 'td-good' : avg >= 30 ? '' : avg < 10 ? 'td-dim' : ''}">${r[7]}</td>
      <td class="${sr >= 80 ? 'td-good' : sr >= 50 ? '' : sr < 25 ? 'td-dim' : ''}">${r[8]}</td>
      <td class="${r[9] >= 50 ? 'td-good' : ''}">${r[9]}</td>
      <td>${r[10]}</td>
    </tr>`;
  }).join('') + '</tbody>';
  document.getElementById('statsPanel').innerHTML = tableWrap(head + body);
}

function renderBowling() {
  const headers = ['Tournament','Format','M','Inn','Overs','Runs','Wkts','Best','Mdns','Econ'];
  const head = '<thead><tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr></thead>';
  const body = '<tbody>' + BOWLING_ROWS.map(r => {
    const econ    = parseFloat(r[9]);
    const econFmt = (r[4] === '0.0' || r[4] === '0') ? '—' : r[9];
    const econCls = r[4] === '0.0' ? '' : econ < 5 ? 'td-good' : econ > 8 ? 'td-dim' : '';
    return `<tr>
      <td>${r[0]}</td>
      <td>${r[1]}</td>
      <td>${r[2]}</td>
      <td>${r[3]}</td>
      <td>${r[4]}</td>
      <td>${r[4] === '0.0' ? '—' : r[5]}</td>
      <td class="${r[6] > 0 ? 'td-good' : 'td-dim'}">${r[6]}</td>
      <td class="${r[6] > 0 ? 'td-good' : ''}">${r[7]}</td>
      <td>${r[4] === '0.0' ? '—' : r[8]}</td>
      <td class="${econCls}">${econFmt}</td>
    </tr>`;
  }).join('') + '</tbody>';
  document.getElementById('statsPanel').innerHTML = tableWrap(head + body);
}

function renderKeeping() {
  const headers = ['Tournament','Format','Matches','Catches','Catches/Match'];
  const head = '<thead><tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr></thead>';
  const body = '<tbody>' + KEEPING_ROWS.map(r => {
    const cpm = r[2] > 0 ? (r[3] / r[2]).toFixed(2) : '—';
    return `<tr>
      <td>${r[0]}</td>
      <td>${r[1]}</td>
      <td>${r[2]}</td>
      <td class="${r[3] >= 5 ? 'td-good' : ''}">${r[3]}</td>
      <td class="${parseFloat(cpm) >= 0.5 ? 'td-good' : ''}">${cpm}</td>
    </tr>`;
  }).join('') + '</tbody>';
  document.getElementById('statsPanel').innerHTML = tableWrap(head + body);
}

function renderCareerSummary() {
  const rows = [
    ['Total Matches', CAREER.matches],
    ['Batting Innings', CAREER.innings],
    ['Not Outs', CAREER.notOuts],
    ['Career Runs', CAREER.runs],
    ['Batting Average', CAREER.avg],
    ['Strike Rate', CAREER.sr],
    ['Highest Score', CAREER.hs],
    ['Half Centuries (50+)', CAREER.fifties],
    ['Quarter Centuries (25+)', CAREER.twentyFives],
    ['Ducks', CAREER.ducks],
    ['Fours Hit', CAREER.fours],
    ['Sixes Hit', CAREER.sixes],
    ['Bowling Overs', CAREER.overs],
    ['Wickets Taken', CAREER.wickets],
    ['Bowling Economy', CAREER.econ],
    ['Bowling Average', CAREER.bowlAvg],
    ['Catches (Keeping/Field)', CAREER.catches],
    ['Wides Bowled', CAREER.wides],
    ['Tournaments Played', CAREER.tournaments],
  ];
  const head = '<thead><tr><th>Metric</th><th>Value</th></tr></thead>';
  const body = '<tbody>' + rows.map(([k, v]) => `
    <tr><td>${k}</td><td style="color:var(--teal);font-weight:700">${v}</td></tr>
  `).join('') + '</tbody>';
  document.getElementById('statsPanel').innerHTML = tableWrap(head + body);
}

function initStats() {
  renderBatting();
  document.querySelectorAll('.snav').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.snav').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      if (tab === 'batting')  renderBatting();
      if (tab === 'bowling')  renderBowling();
      if (tab === 'keeping')  renderKeeping();
      if (tab === 'career')   renderCareerSummary();
    });
  });
}

// ── PROFILE ───────────────────────────────────────────────────────────────────

function renderProfile() {
  document.getElementById('profileDetails').innerHTML = PROFILE.map(p => `
    <div class="pd-item">
      <div class="pd-label">${p.label}</div>
      <div class="pd-value">${p.value}</div>
    </div>
  `).join('');
}

// ── FOOTER ────────────────────────────────────────────────────────────────────

function initFooter() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

// ── BOOT ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  initNav();
  initCountUps();
  renderOverview();
  initYearly();
  initCharts();
  initTournaments();
  initStats();
  renderProfile();
  initFooter();

  // Stagger fade-up on overview cards
  setTimeout(initFadeUp, 200);
});
