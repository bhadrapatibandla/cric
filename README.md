# Complete Cricket Player Portfolio

This repository publishes the **complete contents of the supplied merged Excel workbook**:

`Cricket_Player_Master_FINAL_MERGED_BATCH1_BATCH2_BATCH3.xlsx`

## All workbook sheets included

- `README`
- `Player Profile`
- `Tournament Coverage`
- `Batting`
- `Raw Batting Series`
- `Bowling`
- `Raw Bowling Series`
- `Wicketkeeping`
- `Tournament Summary`
- `Career Summary`
- `Metrics & Averages`
- `Verification & Missing Data`
- `Match Log`

Every worksheet is exported into `data.json`, and the website exposes every row and field through the **Every sheet, every field** section.

### Included on the site

- Career snapshot
- Full player profile
- All 20 tournament coverage records
- Tournament Summary
- Batting aggregates
- Raw Batting Series
- Bowling aggregates
- Raw Bowling Series
- Wicketkeeping
- Career Summary
- Metrics & Averages / definitions
- Verification & Missing Data
- Match Log
- Search across every workbook sheet
- Responsive GitHub Pages design

## Data integrity

The site publishes the workbook values rather than replacing them with invented values. Explicit zero/missing/verification entries remain visible.

## Run locally

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## GitHub Pages

1. Create a public GitHub repository.
2. Upload all files in this folder.
3. Go to **Settings → Pages**.
4. Select **Deploy from a branch → main → / (root)**.
5. Save.

## Public-data review

Because this is intended for a public profile, review the **Player Profile** and **Match Log** sections before publishing. Remove any identifier or personal information you do not want publicly exposed.


## Offline support

The JavaScript bundle embeds the complete workbook data, so `index.html` can be opened directly from your Downloads folder using `file://` without requiring a local web server. `data.json` is also included as a standalone machine-readable export.
