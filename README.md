# Bhadra Patibandla — Cricket Portfolio

A fully animated, data-driven cricket portfolio for **Bhadra Patibandla** — Wicket Keeper, Right Hand Batter (Top Order), Right Arm Leg Spin. Jersey #29, SanAntonio Road Runners.

Live at: **https://bhadrapatibandla.github.io/cric/**

---

## Features

### Portfolio (public)
- **Animated hero** — particle canvas, word-by-word text reveal, scroll progress bar, cursor glow
- **6 career counters** — Matches, Runs, HS, Catches, Wickets, Tournaments (animated count-up)
- **8 overview cards** — batting avg, strike rate, HS, fours, wickets, catches, seasons
- **Year-by-year growth** — line chart with 6 metric tabs (Runs, Average, SR, Matches, Fours, Catches)
- **6 analytics charts** — Runs, Average, Strike Rate, Bowling Economy, Boundaries (stacked bar), All-Round Radar
- **21 tournament cards** — alphabetical, format badges (T20/1Day/Youth/Test), series drilldown per tournament
- **Detailed stats tables** — Batting (15 columns), Bowling (13 columns), Keeping, Career Summary
- **Highlight videos** — two batting highlight reels
- **Photo gallery** — 5 images with hover captions
- **Player profile** — full CricClubs-linked profile card
- **Dark / Light mode** toggle in the navbar
- **GSAP animations** — 3D card tilt, magnetic buttons, staggered entry, hero parallax, marquee

### Admin (protected)
- **Google Sign-in** authentication — only allowed emails can write
- **Add Tournament** — name, format, series name, year, full batting + bowling fields
- **Edit Tournament** — manage formats, add/edit/delete series within each format
- **Edit Series** — all 14 batting + 12 bowling fields
- **Career Totals** — manual edit or ⚡ auto-calculate from series data
- **Yearly Stats** — 2024/2025/2026 + add new years, or ⚡ auto-calculate
- **Player Profile** — update name, team, roles, CricClubs URL
- **Export / Import JSON** — full data portability
- **Local mode** — works from localStorage without Firebase during development

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Hosting | GitHub Pages (free) |
| Database | Firebase Firestore (free Spark plan) |
| Auth | Firebase Authentication — Google Sign-in |
| Frontend | Vanilla HTML / CSS / JavaScript (no framework) |
| Charts | Chart.js 4.4 |
| Animations | GSAP 3.12 + ScrollTrigger |
| CI/CD | GitHub Actions — secrets injection + deploy |
| Data source | CricClubs (manually verified) |

---

## Data Architecture

All data lives in `data.js` (local fallback) and is mirrored to Firebase Firestore (live):

```
Firestore:
├── meta/career          ← career totals (matches, runs, avg, catches, etc.)
├── tournaments/{id}     ← one doc per tournament (21 total)
│   └── aggregated batting + bowling per format
├── yearly/{year}        ← 2024, 2025, 2026 progression data
└── series/{id}          ← individual series with year + full stats
```

The portfolio reads **publicly** from Firestore. The admin page **writes** to Firestore with Google Auth + server-side security rules.

---

## Security

The admin page (`admin.html`) is protected by two layers:

1. **Google Sign-in** — only whitelisted emails can access the admin UI
2. **Firestore Security Rules** — server-side enforcement; writes rejected for any non-whitelisted account even if JS is bypassed

The Firebase `apiKey` in the source code is intentionally public (by Firebase design). It identifies the project but does not grant write access. Security is enforced by Firestore rules on Google's servers.

---

## Run Locally

```bash
# Navigate to the project folder
cd repo/cric

# Start local server (Node.js required)
npx serve . -p 5555
```

Then open:
- Portfolio: `http://localhost:5555`
- Admin: `http://localhost:5555/admin.html`

On first visit the admin page auto-seeds from `data.js` into localStorage. No Firebase setup needed for local testing.

---

## Deploy to GitHub

### One-time setup

1. **Create Firebase project** at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firestore** (production mode) and **Google Authentication**
3. Add `<your-username>.github.io` to Firebase Auth authorized domains
4. Set **Firestore Security Rules** (replace emails):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read: if true;
         allow write: if request.auth != null
                      && request.auth.token.email in ["player@gmail.com","parent@gmail.com"];
       }
     }
   }
   ```
5. Add **9 GitHub repository secrets** (`Settings → Secrets → Actions`):
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_DATABASE_URL`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_STORAGE_BUCKET`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`
   - `FIREBASE_MEASUREMENT_ID`
   - `FIREBASE_ALLOWED_EMAILS` — value format: `"email1@gmail.com","email2@gmail.com"`
6. Go to **Settings → Pages → Source → GitHub Actions**

### Deploy

```bash
git add -A
git commit -m "Deploy"
git push
```

GitHub Actions automatically injects secrets, builds `_site/`, and deploys to GitHub Pages. Watch progress at `github.com/<username>/cric/actions`.

---

## Updating Scores (after each tournament)

1. Open `https://<username>.github.io/cric/admin.html`
2. Sign in with Google (authorised account)
3. Find the tournament → Edit → select the series or add a new one
4. Fill in the stats → Save
5. Go to Career Totals → ⚡ Auto-calculate → Save
6. Portfolio updates instantly

---

## Project Structure

```
repo/cric/
├── index.html          ← Public portfolio
├── admin.html          ← Protected admin page (Firebase Auth)
├── script.js           ← All portfolio rendering (Chart.js, GSAP triggers)
├── styles.css          ← Dark/light theme, all component styles
├── data.js             ← Local data (ES module, fallback + admin seed)
├── firebase-data.js    ← Fetches Firestore, fires 'firestoreReady' event
├── animations.js       ← GSAP animations (scroll, tilt, magnetic, etc.)
├── static/             ← Images and videos
│   ├── 1.jpg … 5.avif
│   ├── tophy.jpeg
│   ├── batting-video1.mp4
│   └── batting-video2.mp4
└── .github/workflows/
    └── main.yml        ← CI/CD: secret injection + GitHub Pages deploy
```

---

## Stats Summary (as of September 2026)

| Metric | Value |
|--------|-------|
| Matches | 182 |
| Career Runs | 2,290 |
| Batting Average | 23.61 |
| Strike Rate | 64.02 |
| Highest Score | 90 |
| Half-Centuries | 9 |
| Wickets | 13 |
| Catches | 52 |
| Tournaments | 19 (active) |
| Seasons | 2024 – 2026 |

*Data sourced from CricClubs — verified manually.*
