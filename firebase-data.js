/**
 * firebase-data.js
 * Loads all cricket stats from Firestore and fires a `firestoreReady` custom
 * event on document. script.js listens for this event before rendering.
 *
 * ── SETUP ────────────────────────────────────────────────────────────────────
 * 1. Create a Firebase project at console.firebase.google.com
 * 2. Enable Firestore Database (production mode)
 * 3. Replace the placeholder values in firebaseConfig below
 * 4. Set Firestore security rules (see local/plan/admin-page-security.md)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { initializeApp }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, collection, getDocs, doc, getDoc }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// ── PASTE YOUR FIREBASE CONFIG HERE ──────────────────────────────────────────
// Get this from: Firebase Console → Project Settings → Your apps → Web app
const firebaseConfig = {
  apiKey:            "__FIREBASE_API_KEY__",
  authDomain:        "__FIREBASE_AUTH_DOMAIN__",
  databaseURL:       "__FIREBASE_DATABASE_URL__",
  projectId:         "__FIREBASE_PROJECT_ID__",
  storageBucket:     "__FIREBASE_STORAGE_BUCKET__",
  messagingSenderId: "__FIREBASE_MESSAGING_SENDER_ID__",
  appId:             "__FIREBASE_APP_ID__",
  measurementId:     "__FIREBASE_MEASUREMENT_ID__"
};
// ─────────────────────────────────────────────────────────────────────────────

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

async function loadFirestoreData() {
  // Parallel fetch: career summary + all tournaments + all yearly docs
  const [careerSnap, tournamentsSnap, yearlySnap] = await Promise.all([
    getDoc(doc(db, 'meta', 'career')),
    getDocs(collection(db, 'tournaments')),
    getDocs(collection(db, 'yearly')),
  ]);

  const career = careerSnap.exists() ? careerSnap.data() : null;

  const tournaments = tournamentsSnap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  const yearly = yearlySnap.docs
    .map(d => d.data())
    .sort((a, b) => a.year - b.year);

  document.dispatchEvent(new CustomEvent('firestoreReady', {
    detail: { career, tournaments, yearly, ok: true }
  }));
}

loadFirestoreData().catch(err => {
  console.warn('[firebase-data] Firestore load failed — falling back to static data', err);
  // Signal script.js to use its built-in static fallback
  document.dispatchEvent(new CustomEvent('firestoreReady', {
    detail: { ok: false }
  }));
});
