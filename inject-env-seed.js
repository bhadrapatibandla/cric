#!/usr/bin/env node
/**
 * inject-env-seed.js  ← Firestore seed script (replaces old browser-based version)
 * ═══════════════════════════════════════════════════════════════════════════════
 * Reads .env.local + data.js, then writes the complete accurate dataset
 * to Firebase Firestore using the Firebase Admin SDK (server-side, no browser).
 *
 * ── WHAT IT WRITES ───────────────────────────────────────────────────────────
 *   Firestore collection  │  Source in data.js   │  Docs written
 *   ─────────────────────────────────────────────────────────────────────────
 *   tournaments/{id}      │  TOURNAMENTS array   │  21 docs (one per tournament)
 *   meta/career           │  CAREER object       │  1 doc (career totals)
 *   meta/profile          │  PLAYER object       │  1 doc (player profile)
 *   yearly/{year}         │  YEARLY array        │  3 docs (2024, 2025, 2026)
 *   series/{id}           │  RAW_SERIES array    │  70 docs (all individual series)
 *
 * ── PREREQUISITES ────────────────────────────────────────────────────────────
 *   1. Node.js 18+ installed  (check: node --version)
 *   2. .env.local file in this folder with your Firebase config
 *   3. Service account JSON (for admin write access)
 *
 * ── SETUP (one time) ─────────────────────────────────────────────────────────
 *   a) Create .env.local:
 *        FIREBASE_PROJECT_ID=bhadra-cricket
 *        (other keys optional for this script — only project ID is needed)
 *
 *   b) Get a service account key:
 *        Firebase Console → ⚙ Project Settings → Service Accounts
 *        → Generate new private key → save as  sa-key.json  in this folder
 *      (sa-key.json is in .gitignore — never committed)
 *
 *   c) Install dependencies (one time):
 *        npm install firebase-admin
 *
 * ── RUN ──────────────────────────────────────────────────────────────────────
 *   node inject-env-seed.js
 *
 * ── FLAGS ────────────────────────────────────────────────────────────────────
 *   --dry-run    Show what would be written without touching Firestore
 *   --force      Overwrite existing documents (default: merge)
 *   --only=X     Seed only one collection: tournaments | career | profile | yearly | series
 *
 * ── RESTORE FROM BACKUP ──────────────────────────────────────────────────────
 *   If you have a backup JSON from the GitHub Actions backup job:
 *     node inject-env-seed.js --from-backup=firestore-backup-2026-09-12.json
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ── PARSE CLI FLAGS ───────────────────────────────────────────────────────────
const args     = process.argv.slice(2);
const DRY_RUN  = args.includes('--dry-run');
const FORCE    = args.includes('--force');          // replace vs merge
const ONLY     = (args.find(a => a.startsWith('--only=')) || '').replace('--only=', '');
const BACKUP   = (args.find(a => a.startsWith('--from-backup=')) || '').replace('--from-backup=', '');

const BASE = __dirname;

// ── COLOUR HELPERS ────────────────────────────────────────────────────────────
const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  green:  '\x1b[32m',
  teal:   '\x1b[36m',
  yellow: '\x1b[33m',
  red:    '\x1b[31m',
  dim:    '\x1b[2m',
};
const ok   = msg => console.log(`${c.green}✅${c.reset} ${msg}`);
const info = msg => console.log(`${c.teal}ℹ${c.reset}  ${msg}`);
const warn = msg => console.log(`${c.yellow}⚠${c.reset}  ${msg}`);
const err  = msg => console.error(`${c.red}❌${c.reset} ${msg}`);
const dim  = msg => console.log(`${c.dim}   ${msg}${c.reset}`);
const hr   = () => console.log(`${c.dim}${'─'.repeat(60)}${c.reset}`);

// ── BANNER ────────────────────────────────────────────────────────────────────
console.log();
console.log(`${c.bold}${c.teal}🏏 Bhadra Cricket — Firestore Seed Script${c.reset}`);
if (DRY_RUN) console.log(`${c.yellow}   DRY RUN MODE — nothing will be written to Firestore${c.reset}`);
if (FORCE)   console.log(`${c.yellow}   FORCE MODE — documents will be replaced (not merged)${c.reset}`);
if (ONLY)    console.log(`${c.yellow}   ONLY seeding collection: ${ONLY}${c.reset}`);
if (BACKUP)  console.log(`${c.yellow}   RESTORING from backup: ${BACKUP}${c.reset}`);
console.log();

// ── 1. LOAD .env.local ────────────────────────────────────────────────────────
const envPath = path.join(BASE, '.env.local');
if (!fs.existsSync(envPath)) {
  err('.env.local not found.');
  console.log(`
  Create it at: ${envPath}
  Minimum required content:

    FIREBASE_PROJECT_ID=bhadra-cricket

  Optional (for reference — not used by this script):
    FIREBASE_API_KEY=...
    FIREBASE_AUTH_DOMAIN=...
`);
  process.exit(1);
}

const env = {};
fs.readFileSync(envPath, 'utf8')
  .split('\n')
  .filter(l => l.trim() && !l.startsWith('#'))
  .forEach(line => {
    const [key, ...rest] = line.split('=');
    if (key) env[key.trim()] = rest.join('=').trim();
  });

const projectId = env.FIREBASE_PROJECT_ID;
if (!projectId) {
  err('FIREBASE_PROJECT_ID missing from .env.local');
  process.exit(1);
}
ok(`.env.local loaded — project: ${c.bold}${projectId}${c.reset}`);

// ── 2. LOAD SERVICE ACCOUNT KEY ───────────────────────────────────────────────
const saPath = path.join(BASE, 'sa-key.json');
if (!fs.existsSync(saPath)) {
  err('sa-key.json not found.');
  console.log(`
  Download it from Firebase Console:
    1. Go to https://console.firebase.google.com
    2. Open project "${projectId}"
    3. ⚙ Project Settings → Service Accounts tab
    4. Click "Generate new private key" → save as  sa-key.json  in:
       ${BASE}

  Note: sa-key.json is in .gitignore and will never be committed.
`);
  process.exit(1);
}
ok('sa-key.json found');

// ── 3. INIT FIREBASE ADMIN ────────────────────────────────────────────────────
let db;
try {
  // firebase-admin v11+ uses modular subpath imports
  const { initializeApp, cert } = require('firebase-admin/app');
  const { getFirestore }        = require('firebase-admin/firestore');
  initializeApp({ credential: cert(require(saPath)), projectId });
  db = getFirestore();
} catch (e) {
  if (e.code === 'MODULE_NOT_FOUND') {
    err('firebase-admin not installed. Run:  npm install firebase-admin');
    process.exit(1);
  }
  // Allow credential errors to surface (bad key format) only when not dry-run
  if (!DRY_RUN) { err('Firebase init failed: ' + e.message); process.exit(1); }
  // In dry-run mode we mock db so the rest of the script can show what it would do
  warn('Firebase init skipped in dry-run (credential not validated)');
  db = {
    doc:        () => ({ set: async () => {} }),
    batch:      () => ({ set: () => {}, commit: async () => {} }),
    collection: () => ({ get: async () => ({ docs: [] }) }),
  };
}
ok(`Firebase Admin initialised → project: ${c.bold}${projectId}${c.reset}`);
hr();

// ── 4. LOAD DATA ──────────────────────────────────────────────────────────────
let RAW_SERIES, TOURNAMENTS, YEARLY, CAREER, PLAYER;

if (BACKUP) {
  // Restore mode — load from a backup JSON file
  if (!fs.existsSync(BACKUP)) { err(`Backup file not found: ${BACKUP}`); process.exit(1); }
  const bk = JSON.parse(fs.readFileSync(BACKUP, 'utf8'));
  info(`Restoring from backup: ${BACKUP}`);
  dim(`Exported: ${bk.exported || 'unknown'}`);

  // Backup format produced by the GitHub Actions backup job
  RAW_SERIES  = bk.raw_series || [];
  CAREER      = bk.career     || {};
  PLAYER      = bk.profile    || {};
  YEARLY      = Array.isArray(bk.yearly) ? bk.yearly : Object.values(bk.yearly || {});
  TOURNAMENTS = RAW_SERIES; // in restore mode, raw_series IS the tournaments array
  console.log();
} else {
  // Normal mode — load from data.js (the authoritative local source)
  // data.js uses ES module exports so we use a dynamic workaround
  info('Loading data from data.js (ES module)...');

  // Write a tiny CJS wrapper that imports data.js and serialises the exports
  const tmpFile = path.join(BASE, '_seed_tmp.mjs');
  fs.writeFileSync(tmpFile, `
import { RAW_SERIES, TOURNAMENTS, YEARLY, CAREER, PLAYER } from './data.js';
import { writeFileSync } from 'fs';
writeFileSync('_seed_data.json', JSON.stringify({ RAW_SERIES, TOURNAMENTS, YEARLY, CAREER, PLAYER }));
`);

  const { execSync } = require('child_process');
  try {
    execSync('node _seed_tmp.mjs', { cwd: BASE, stdio: 'inherit' });
  } catch (e) {
    err('Failed to load data.js'); fs.unlinkSync(tmpFile); process.exit(1);
  }
  fs.unlinkSync(tmpFile);

  const dataFile = path.join(BASE, '_seed_data.json');
  const loaded   = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  fs.unlinkSync(dataFile);

  RAW_SERIES  = loaded.RAW_SERIES  || [];
  TOURNAMENTS = loaded.TOURNAMENTS || [];
  YEARLY      = loaded.YEARLY      || [];
  CAREER      = loaded.CAREER      || {};
  PLAYER      = loaded.PLAYER      || {};

  ok(`data.js loaded:`);
  dim(`RAW_SERIES:  ${RAW_SERIES.length} rows`);
  dim(`TOURNAMENTS: ${TOURNAMENTS.length} docs`);
  dim(`YEARLY:      ${YEARLY.length} docs`);
  dim(`CAREER:      ${Object.keys(CAREER).length} fields`);
  dim(`PLAYER:      ${PLAYER.name}`);
  console.log();
}

// ── 5. HELPER — write a Firestore document ────────────────────────────────────
let totalWritten = 0;
let totalSkipped = 0;

async function writeDoc(ref, data, label) {
  // Strip undefined, null stays, empty strings stay
  const clean = JSON.parse(JSON.stringify(data));

  if (DRY_RUN) {
    dim(`[DRY] ${label}`);
    totalSkipped++;
    return;
  }

  const op = FORCE ? ref.set(clean) : ref.set(clean, { merge: true });
  await op;
  dim(`✓ ${label}`);
  totalWritten++;
}

// ── 6. SEED FUNCTIONS ─────────────────────────────────────────────────────────

async function seedCareer() {
  hr();
  info(`Seeding meta/career...`);
  await writeDoc(db.doc('meta/career'), CAREER, 'meta/career');
  ok('Career totals done');
}

async function seedProfile() {
  hr();
  info('Seeding meta/profile...');
  await writeDoc(db.doc('meta/profile'), PLAYER, 'meta/profile');
  ok('Player profile done');
}

async function seedYearly() {
  hr();
  info(`Seeding yearly/ (${YEARLY.length} docs)...`);
  const batch = db.batch();
  let count = 0;

  for (const y of YEARLY) {
    if (!y.year) { warn(`Skipping yearly entry with no year field`); continue; }
    const ref  = db.doc(`yearly/${y.year}`);
    const data = { ...y };
    delete data.id; // don't store id field in Firestore

    if (DRY_RUN) { dim(`[DRY] yearly/${y.year}`); totalSkipped++; continue; }
    batch.set(ref, data, { merge: !FORCE });
    dim(`→ yearly/${y.year}  (${y.mat} mat, ${y.runs} runs)`);
    count++;
  }

  if (!DRY_RUN) { await batch.commit(); totalWritten += count; }
  ok(`Yearly stats done (${count} docs)`);
}

async function seedTournaments() {
  hr();
  info(`Seeding tournaments/ (${TOURNAMENTS.length} docs)...`);

  // Batch writes — Firestore limit is 500 per batch
  const BATCH_SIZE = 400;
  let count = 0;

  for (let i = 0; i < TOURNAMENTS.length; i += BATCH_SIZE) {
    const chunk = TOURNAMENTS.slice(i, i + BATCH_SIZE);
    const batch = db.batch();

    for (const t of chunk) {
      // Use tournament name slug as doc ID for readability
      const id  = t.id || slugify(t.name || `tournament-${i}`);
      const ref = db.doc(`tournaments/${id}`);
      const data = { ...t };
      delete data.id;
      // Remove computed fields that will be recalculated from series data
      delete data.series;
      delete data.formatRows;

      if (DRY_RUN) { dim(`[DRY] tournaments/${id}`); totalSkipped++; continue; }
      batch.set(ref, data, { merge: !FORCE });
      dim(`→ tournaments/${id}  (${t.mat} mat, ${t.runs} runs)`);
      count++;
    }

    if (!DRY_RUN) await batch.commit();
  }

  totalWritten += count;
  ok(`Tournaments done (${count} docs)`);
}

async function seedSeries() {
  hr();
  const seriesRows = RAW_SERIES.filter(r => r.level === 'series');
  const aggRows    = RAW_SERIES.filter(r => r.level === 'series_type');

  info(`Seeding series/ (${seriesRows.length} individual series + ${aggRows.length} aggregates)...`);

  const allRows = RAW_SERIES; // write both levels
  const BATCH_SIZE = 400;
  let count = 0;

  for (let i = 0; i < allRows.length; i += BATCH_SIZE) {
    const chunk = allRows.slice(i, i + BATCH_SIZE);
    const batch = db.batch();

    for (const s of chunk) {
      // Build a stable document ID:
      // series_type rows: "{tournament-slug}--{format}--aggregate"
      // series rows:      "{tournament-slug}--{format}--{year}--{series-slug}"
      const tSlug = slugify(s.tournament);
      const fSlug = s.format.replace(/\s+/g, '_');
      const id    = s.id ||
        (s.level === 'series_type'
          ? `${tSlug}--${fSlug}--aggregate`
          : `${tSlug}--${fSlug}--${s.year || 'noyear'}--${slugify(s.seriesName || 'series')}`);

      const ref  = db.doc(`series/${id}`);
      const data = {
        ...s,
        firestoreId: id,
        updatedAt:   new Date().toISOString(),
      };
      delete data.id; // don't store original id in the Firestore doc

      if (DRY_RUN) {
        dim(`[DRY] series/${id} (${s.level})`);
        totalSkipped++;
        continue;
      }
      batch.set(ref, data, { merge: !FORCE });
      dim(`→ series/${id}`);
      count++;
    }

    if (!DRY_RUN) await batch.commit();
  }

  totalWritten += count;
  ok(`Series done (${count} docs)`);
}

// ── 7. SLUG HELPER ────────────────────────────────────────────────────────────
function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 100);
}

// ── 8. MAIN ───────────────────────────────────────────────────────────────────
async function main() {
  const startTime = Date.now();

  // Decide which collections to seed
  const shouldRun = name => !ONLY || ONLY === name;

  if (shouldRun('career'))      await seedCareer();
  if (shouldRun('profile'))     await seedProfile();
  if (shouldRun('yearly'))      await seedYearly();
  if (shouldRun('tournaments')) await seedTournaments();
  if (shouldRun('series'))      await seedSeries();

  hr();
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  if (DRY_RUN) {
    console.log(`\n${c.yellow}${c.bold}DRY RUN complete — ${totalSkipped} operations would run${c.reset}`);
    console.log(`Remove --dry-run to write to Firestore.\n`);
  } else {
    console.log(`\n${c.green}${c.bold}✅ Seed complete — ${totalWritten} docs written in ${elapsed}s${c.reset}`);
    console.log(`${c.dim}   Project: ${projectId}${c.reset}`);
    console.log(`${c.dim}   Mode:    ${FORCE ? 'replace (force)' : 'merge'}${c.reset}\n`);
  }

  // Remove sa-key.json reminder
  if (!DRY_RUN) {
    console.log(`${c.dim}Tip: You can now delete sa-key.json if you don't need it anymore.${c.reset}`);
    console.log(`${c.dim}     It's in .gitignore but there's no reason to keep it locally.${c.reset}\n`);
  }

  process.exit(0);
}

main().catch(e => {
  err('Seed failed: ' + e.message);
  console.error(e);
  process.exit(1);
});
