/**
 * inject-env-seed.js
 * ══════════════════
 * LOCAL USE ONLY. Never commit your .env.local — it's in .gitignore.
 *
 * Reads .env.local, injects the Firebase config into seed-firestore.html
 * as window.__ENV__, writes the result to seed-firestore.local.html, then
 * starts a tiny server so you can open it in your browser.
 *
 * Usage:
 *   node inject-env-seed.js
 *   then open http://localhost:4321/seed-firestore.local.html
 */

const fs   = require('fs');
const http = require('http');
const path = require('path');

// ── 1. Parse .env.local ──────────────────────────────────────────────────────
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('\n❌  .env.local not found.\n');
  console.error('Create it with:\n');
  console.error('  FIREBASE_API_KEY=AIzaSy...');
  console.error('  FIREBASE_AUTH_DOMAIN=bhadra-cricket.firebaseapp.com');
  console.error('  FIREBASE_DATABASE_URL=https://bhadra-cricket-default-rtdb.firebaseio.com');
  console.error('  FIREBASE_PROJECT_ID=bhadra-cricket');
  console.error('  FIREBASE_STORAGE_BUCKET=bhadra-cricket.appspot.com');
  console.error('  FIREBASE_MESSAGING_SENDER_ID=123456789012');
  console.error('  FIREBASE_APP_ID=1:123:web:abc123');
  console.error('  FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX\n');
  process.exit(1);
}

const env = {};
fs.readFileSync(envPath, 'utf8')
  .split('\n')
  .filter(l => l.trim() && !l.startsWith('#'))
  .forEach(line => {
    const [key, ...rest] = line.split('=');
    env[key.trim()] = rest.join('=').trim();
  });

const required = [
  'FIREBASE_API_KEY', 'FIREBASE_AUTH_DOMAIN', 'FIREBASE_DATABASE_URL',
  'FIREBASE_PROJECT_ID', 'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID', 'FIREBASE_APP_ID', 'FIREBASE_MEASUREMENT_ID',
];
const missing = required.filter(k => !env[k]);
if (missing.length) {
  console.error('❌  Missing keys in .env.local:', missing.join(', '));
  process.exit(1);
}

// ── 2. Inject into seed-firestore.html ───────────────────────────────────────
const envScript = `<script>window.__ENV__ = ${JSON.stringify(env)};</script>`;
let html = fs.readFileSync(path.join(__dirname, 'seed-firestore.html'), 'utf8');
html = html.replace('</head>', envScript + '\n</head>');

const outFile = path.join(__dirname, 'seed-firestore.local.html');
fs.writeFileSync(outFile, html);
console.log('✅  Written to seed-firestore.local.html');

// ── 3. Serve it so Firebase Auth popup works (file:// won't work) ─────────────
const PORT = 4321;
const server = http.createServer((req, res) => {
  const safePath = path.join(__dirname, req.url === '/' ? '/seed-firestore.local.html' : req.url);
  if (!safePath.startsWith(__dirname)) { res.writeHead(403); res.end(); return; }
  try {
    const data = fs.readFileSync(safePath);
    const ext  = path.extname(safePath);
    const mime = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css' };
    res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
    res.end(data);
  } catch {
    res.writeHead(404); res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`\n🌐  Open in your browser → http://localhost:${PORT}/seed-firestore.local.html`);
  console.log('    Press Ctrl+C when done seeding.\n');
});
