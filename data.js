/**
 * data.js — Bhadra Patibandla Cricket Portfolio
 * ══════════════════════════════════════════════
 * Single source of truth built from master.csv (CricClubs verified data).
 * Exports: PLAYER, RAW_SERIES, TOURNAMENTS, YEARLY, CAREER
 *
 * All aggregates are AUTO-CALCULATED — never manually entered.
 * "League" format tournaments (TexasYouthPremierLeague, 22Yards League)
 * are included in the data but excluded from career totals.
 *
 * Ave = "--" means all innings were not-out (infinite average). Displayed as "—".
 */

// ─────────────────────────────────────────────────────────────────────────────
// PLAYER PROFILE
// ─────────────────────────────────────────────────────────────────────────────
export const PLAYER = {
  name:         'Bhadra Patibandla',
  cricclubsId:  '2772381',
  team:         'SanAntonio Road Runners',
  role:         'Wicket Keeper',
  jersey:       '29',
  battingStyle: 'Right Hand Batter (Top Order)',
  bowlingStyle: 'Right Arm Leg Spin',
  cricclubsUrl: 'https://cricclubs.com/DallasYouthCricketLeagueDYCLOfficial/viewPlayer.do?playerId=2772381&clubId=1001692',
};

// ─────────────────────────────────────────────────────────────────────────────
// RAW SERIES DATA  (direct from master.csv — series_type rows only for totals,
// series rows for drilldown)
//
// BATTING fields: mat, inns, no, runs, balls, ave, sr, hs, x100, x50, x25, x0, fours, sixes
// BOWLING fields: mat, inns, overs, bowlRuns, wkts, bbf, mdns, bowlAve, econ, bowlSR, x4w, x5w, wides, catches
// ─────────────────────────────────────────────────────────────────────────────
export const RAW_SERIES = [

  // ══ 1. DALLAS YOUTH CRICKET LEAGUE (DYCL OFFICIAL) ══════════════════════
  { tournament:'Dallas Youth Cricket League (DYCL Official)', format:'YOUTH', level:'series_type', seriesName:'', year:null,
    batting:{ mat:8,  inns:8,  no:2, runs:188, balls:278, ave:'31.33', sr:'67.63', hs:87, x100:0, x50:1, x25:2, x0:2, fours:20, sixes:0 },
    bowling:{ mat:8,  inns:1,  overs:'1.0',  bowlRuns:17, wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:17.00, bowlSR:'—', x4w:0, x5w:0, wides:3, catches:10 } },
  { tournament:'Dallas Youth Cricket League (DYCL Official)', format:'YOUTH', level:'series', seriesName:'2026 DYCL Independence Cup - U11', year:2026,
    batting:{ mat:4,  inns:4,  no:0, runs:170, balls:221, ave:'42.50', sr:'76.92', hs:87, x100:0, x50:1, x25:2, x0:0, fours:20, sixes:0 },
    bowling:{ mat:4,  inns:1,  overs:'1.0',  bowlRuns:17, wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:17.00, bowlSR:'—', x4w:0, x5w:0, wides:3, catches:4 } },
  { tournament:'Dallas Youth Cricket League (DYCL Official)', format:'YOUTH', level:'series', seriesName:'2025 DYCL Independence Cup - U11', year:2025,
    batting:{ mat:4,  inns:4,  no:2, runs:18,  balls:57,  ave:'9.00',  sr:'31.58', hs:15, x100:0, x50:0, x25:0, x0:2, fours:0,  sixes:0 },
    bowling:{ mat:4,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:6 } },
  { tournament:'Dallas Youth Cricket League (DYCL Official)', format:'1 DAY', level:'series_type', seriesName:'', year:null,
    batting:{ mat:4,  inns:3,  no:0, runs:9,   balls:54,  ave:'3.00',  sr:'16.67', hs:4,  x100:0, x50:0, x25:0, x0:0, fours:0,  sixes:0 },
    bowling:{ mat:4,  inns:1,  overs:'2.0',  bowlRuns:10, wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:5.00,  bowlSR:'—', x4w:0, x5w:0, wides:4, catches:0 } },
  { tournament:'Dallas Youth Cricket League (DYCL Official)', format:'1 DAY', level:'series', seriesName:'DYCL Independence Cup 2024 U11', year:2024,
    batting:{ mat:4,  inns:3,  no:0, runs:9,   balls:54,  ave:'3.00',  sr:'16.67', hs:4,  x100:0, x50:0, x25:0, x0:0, fours:0,  sixes:0 },
    bowling:{ mat:4,  inns:1,  overs:'2.0',  bowlRuns:10, wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:5.00,  bowlSR:'—', x4w:0, x5w:0, wides:4, catches:0 } },

  // ══ 2. CRICKET OF SAN ANTONIO ════════════════════════════════════════════
  { tournament:'Cricket of San Antonio', format:'1 DAY', level:'series_type', seriesName:'', year:null,
    batting:{ mat:26, inns:26, no:10, runs:245, balls:459, ave:'15.31', sr:'53.38', hs:50, x100:0, x50:1, x25:0, x0:1, fours:9,  sixes:0 },
    bowling:{ mat:26, inns:13, overs:'30.0', bowlRuns:225, wkts:5, bbf:'5/1', mdns:0, bowlAve:'45.00', econ:7.50, bowlSR:'36.0', x4w:0, x5w:0, wides:63, catches:6 } },
  { tournament:'Cricket of San Antonio', format:'1 DAY', level:'series', seriesName:'TBD', year:null,
    batting:{ mat:26, inns:26, no:10, runs:245, balls:459, ave:'15.31', sr:'53.38', hs:50, x100:0, x50:1, x25:0, x0:1, fours:9,  sixes:0 },
    bowling:{ mat:26, inns:13, overs:'30.0', bowlRuns:225, wkts:5, bbf:'5/1', mdns:0, bowlAve:'45.00', econ:7.50, bowlSR:'36.0', x4w:0, x5w:0, wides:63, catches:6 } },
  { tournament:'Cricket of San Antonio', format:'T20', level:'series_type', seriesName:'', year:null,
    batting:{ mat:23, inns:21, no:9,  runs:156, balls:363, ave:'13.00', sr:'42.98', hs:38, x100:0, x50:0, x25:1, x0:1, fours:10, sixes:0 },
    bowling:{ mat:23, inns:8,  overs:'23.0', bowlRuns:133, wkts:1, bbf:'13/1', mdns:0, bowlAve:'133.00', econ:5.78, bowlSR:'138.0', x4w:0, x5w:0, wides:25, catches:2 } },
  { tournament:'Cricket of San Antonio', format:'T20', level:'series', seriesName:'TBD', year:null,
    batting:{ mat:23, inns:21, no:9,  runs:156, balls:363, ave:'13.00', sr:'42.98', hs:38, x100:0, x50:0, x25:1, x0:1, fours:10, sixes:0 },
    bowling:{ mat:23, inns:8,  overs:'23.0', bowlRuns:133, wkts:1, bbf:'13/1', mdns:0, bowlAve:'133.00', econ:5.78, bowlSR:'138.0', x4w:0, x5w:0, wides:25, catches:2 } },

  // ══ 3. TRIGGERS COLTS CRICKET LEAGUE ═════════════════════════════════════
  { tournament:'Triggers Colts Cricket League', format:'T20', level:'series_type', seriesName:'', year:null,
    batting:{ mat:1,  inns:1,  no:0, runs:25,  balls:43,  ave:'25.00', sr:'58.14', hs:25, x100:0, x50:0, x25:1, x0:0, fours:3,  sixes:0 },
    bowling:{ mat:1,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },
  { tournament:'Triggers Colts Cricket League', format:'T20', level:'series', seriesName:'F26-Juniors (U13) - U13 Div-1 2026', year:2026,
    batting:{ mat:1,  inns:1,  no:0, runs:25,  balls:43,  ave:'25.00', sr:'58.14', hs:25, x100:0, x50:0, x25:1, x0:0, fours:3,  sixes:0 },
    bowling:{ mat:1,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },

  // ══ 4. HOUSTON TAPED BALL CRICKET ════════════════════════════════════════
  { tournament:'Houston Taped Ball Cricket', format:'T20', level:'series_type', seriesName:'', year:null,
    batting:{ mat:2,  inns:1,  no:1, runs:8,   balls:19,  ave:'—',     sr:'42.11', hs:8,  x100:0, x50:0, x25:0, x0:0, fours:0,  sixes:0 },
    bowling:{ mat:2,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },
  { tournament:'Houston Taped Ball Cricket', format:'T20', level:'series', seriesName:'Houston Taped Ball Cricket 2024', year:2024,
    batting:{ mat:2,  inns:1,  no:1, runs:8,   balls:19,  ave:'—',     sr:'42.11', hs:8,  x100:0, x50:0, x25:0, x0:0, fours:0,  sixes:0 },
    bowling:{ mat:2,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },

  // ══ 5. NATIONAL YOUTH CRICKET TOURNAMENT ══════════════════════════════════
  { tournament:'National Youth Cricket Tournament', format:'1 DAY', level:'series_type', seriesName:'', year:null,
    batting:{ mat:7,  inns:7,  no:3, runs:192, balls:236, ave:'48.00', sr:'81.36', hs:59, x100:0, x50:2, x25:2, x0:0, fours:24, sixes:0 },
    bowling:{ mat:7,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },
  { tournament:'National Youth Cricket Tournament', format:'1 DAY', level:'series', seriesName:'NYCT 2025 - U11', year:2025,
    batting:{ mat:3,  inns:3,  no:1, runs:103, balls:121, ave:'51.50', sr:'85.12', hs:59, x100:0, x50:1, x25:1, x0:0, fours:13, sixes:0 },
    bowling:{ mat:3,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },
  { tournament:'National Youth Cricket Tournament', format:'1 DAY', level:'series', seriesName:'NYCT 2024 - U10', year:2024,
    batting:{ mat:4,  inns:4,  no:2, runs:89,  balls:115, ave:'44.50', sr:'77.39', hs:57, x100:0, x50:1, x25:1, x0:0, fours:11, sixes:0 },
    bowling:{ mat:4,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },

  // ══ 6. AMERICAN CRICKET LEAGUE ════════════════════════════════════════════
  { tournament:'American Cricket League', format:'T20', level:'series_type', seriesName:'', year:null,
    batting:{ mat:9,  inns:7,  no:3, runs:59,  balls:123, ave:'14.75', sr:'47.97', hs:21, x100:0, x50:0, x25:0, x0:1, fours:1,  sixes:0 },
    bowling:{ mat:9,  inns:3,  overs:'7.0',  bowlRuns:70, wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:10.00, bowlSR:'—', x4w:0, x5w:0, wides:11, catches:1 } },
  { tournament:'American Cricket League', format:'T20', level:'series', seriesName:'S10 Fall Pro 2024', year:2024,
    batting:{ mat:9,  inns:7,  no:3, runs:59,  balls:123, ave:'14.75', sr:'47.97', hs:21, x100:0, x50:0, x25:0, x0:1, fours:1,  sixes:0 },
    bowling:{ mat:9,  inns:3,  overs:'7.0',  bowlRuns:70, wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:10.00, bowlSR:'—', x4w:0, x5w:0, wides:11, catches:1 } },
  { tournament:'American Cricket League', format:'1 DAY', level:'series_type', seriesName:'', year:null,
    batting:{ mat:1,  inns:1,  no:1, runs:7,   balls:21,  ave:'—',     sr:'33.33', hs:7,  x100:0, x50:0, x25:0, x0:0, fours:0,  sixes:0 },
    bowling:{ mat:1,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },
  { tournament:'American Cricket League', format:'1 DAY', level:'series', seriesName:'S11 Spring Pro 2025', year:2025,
    batting:{ mat:1,  inns:1,  no:1, runs:7,   balls:21,  ave:'—',     sr:'33.33', hs:7,  x100:0, x50:0, x25:0, x0:0, fours:0,  sixes:0 },
    bowling:{ mat:1,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },

  // ══ 7. AUSTIN YOUTH LEAGUE ════════════════════════════════════════════════
  { tournament:'Austin Youth League', format:'YOUTH', level:'series_type', seriesName:'', year:null,
    batting:{ mat:4,  inns:3,  no:2, runs:50,  balls:63,  ave:'50.00', sr:'79.37', hs:48, x100:0, x50:0, x25:1, x0:1, fours:6,  sixes:0 },
    bowling:{ mat:4,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },
  { tournament:'Austin Youth League', format:'YOUTH', level:'series', seriesName:'Bilateral - San Antonio - U11 2025', year:2025,
    batting:{ mat:1,  inns:1,  no:1, runs:48,  balls:48,  ave:'—',     sr:'100.00',hs:48, x100:0, x50:0, x25:1, x0:0, fours:6,  sixes:0 },
    bowling:{ mat:1,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },
  { tournament:'Austin Youth League', format:'YOUTH', level:'series', seriesName:'ASC 2024 U11/U13/U18 - U11 2024', year:2024,
    batting:{ mat:3,  inns:2,  no:1, runs:2,   balls:15,  ave:'2.00',  sr:'13.33', hs:2,  x100:0, x50:0, x25:0, x0:1, fours:0,  sixes:0 },
    bowling:{ mat:3,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },

  // ══ 8. FRISCO YOUTH CRICKET LEAGUE ════════════════════════════════════════
  { tournament:'Frisco Youth Cricket League', format:'1 DAY', level:'series_type', seriesName:'', year:null,
    batting:{ mat:3,  inns:3,  no:1, runs:33,  balls:62,  ave:'16.50', sr:'53.23', hs:19, x100:0, x50:0, x25:0, x0:0, fours:4,  sixes:0 },
    bowling:{ mat:3,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },
  { tournament:'Frisco Youth Cricket League', format:'1 DAY', level:'series', seriesName:'DALLAS Memorial Day -2025 - U11', year:2025,
    batting:{ mat:3,  inns:3,  no:1, runs:33,  balls:62,  ave:'16.50', sr:'53.23', hs:19, x100:0, x50:0, x25:0, x0:0, fours:4,  sixes:0 },
    bowling:{ mat:3,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },

  // ══ 9. THE MATCHES ════════════════════════════════════════════════════════
  { tournament:'The Matches', format:'1 DAY', level:'series_type', seriesName:'', year:null,
    batting:{ mat:1,  inns:1,  no:0, runs:10,  balls:35,  ave:'10.00', sr:'28.57', hs:10, x100:0, x50:0, x25:0, x0:0, fours:1,  sixes:0 },
    bowling:{ mat:1,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:1 } },
  { tournament:'The Matches', format:'1 DAY', level:'series', seriesName:'The Matches Invitational 2025', year:2025,
    batting:{ mat:1,  inns:1,  no:0, runs:10,  balls:35,  ave:'10.00', sr:'28.57', hs:10, x100:0, x50:0, x25:0, x0:0, fours:1,  sixes:0 },
    bowling:{ mat:1,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:1 } },

  // ══ 10. NTCAYOUTH ══════════════════════════════════════════════════════════
  { tournament:'NTCAYouth', format:'1 DAY', level:'series_type', seriesName:'', year:null,
    batting:{ mat:4,  inns:4,  no:0, runs:16,  balls:42,  ave:'4.00',  sr:'38.10', hs:8,  x100:0, x50:0, x25:0, x0:1, fours:2,  sixes:0 },
    bowling:{ mat:4,  inns:1,  overs:'0.3',  bowlRuns:6,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:12.00, bowlSR:'—', x4w:0, x5w:0, wides:2, catches:0 } },
  { tournament:'NTCAYouth', format:'1 DAY', level:'series', seriesName:'TBD', year:null,
    batting:{ mat:4,  inns:4,  no:0, runs:16,  balls:42,  ave:'4.00',  sr:'38.10', hs:8,  x100:0, x50:0, x25:0, x0:1, fours:2,  sixes:0 },
    bowling:{ mat:4,  inns:1,  overs:'0.3',  bowlRuns:6,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:12.00, bowlSR:'—', x4w:0, x5w:0, wides:2, catches:0 } },

  // ══ 11. MLK JR TEXAS CUP ══════════════════════════════════════════════════
  { tournament:'MLK JR Texas Cup', format:'1 DAY', level:'series_type', seriesName:'', year:null,
    batting:{ mat:4,  inns:3,  no:0, runs:113, balls:128, ave:'37.67', sr:'88.28', hs:67, x100:0, x50:1, x25:1, x0:0, fours:14, sixes:0 },
    bowling:{ mat:4,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:3 } },
  { tournament:'MLK JR Texas Cup', format:'1 DAY', level:'series', seriesName:'2026 Capitals MLK JR Texas Cup - U11', year:2026,
    batting:{ mat:4,  inns:3,  no:0, runs:113, balls:128, ave:'37.67', sr:'88.28', hs:67, x100:0, x50:1, x25:1, x0:0, fours:14, sixes:0 },
    bowling:{ mat:4,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:3 } },
  { tournament:'MLK JR Texas Cup', format:'T20', level:'series_type', seriesName:'', year:null,
    batting:{ mat:4,  inns:3,  no:1, runs:34,  balls:73,  ave:'17.00', sr:'46.58', hs:18, x100:0, x50:0, x25:0, x0:0, fours:2,  sixes:0 },
    bowling:{ mat:4,  inns:1,  overs:'2.0',  bowlRuns:6,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:3.00,  bowlSR:'—', x4w:0, x5w:0, wides:1, catches:0 } },
  { tournament:'MLK JR Texas Cup', format:'T20', level:'series', seriesName:'2025 MLK JR Texas Cup - U12', year:2025,
    batting:{ mat:4,  inns:3,  no:1, runs:34,  balls:73,  ave:'17.00', sr:'46.58', hs:18, x100:0, x50:0, x25:0, x0:0, fours:2,  sixes:0 },
    bowling:{ mat:4,  inns:1,  overs:'2.0',  bowlRuns:6,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:3.00,  bowlSR:'—', x4w:0, x5w:0, wides:1, catches:0 } },

  // ══ 12. USA CRICKET JUNIOR PATHWAY ════════════════════════════════════════
  { tournament:'USA Cricket Junior Pathway', format:'T20', level:'series_type', seriesName:'', year:null,
    batting:{ mat:24, inns:19, no:8,  runs:461, balls:516, ave:'41.91', sr:'89.34', hs:90, x100:0, x50:1, x25:9, x0:3, fours:54, sixes:0 },
    bowling:{ mat:24, inns:4,  overs:'8.0',  bowlRuns:41, wkts:1, bbf:'10/1', mdns:1, bowlAve:'41.00', econ:5.12, bowlSR:'48.0', x4w:0, x5w:0, wides:10, catches:10 } },
  { tournament:'USA Cricket Junior Pathway', format:'T20', level:'series', seriesName:'USAC 2026 Midwest sub conference U11', year:2026,
    batting:{ mat:4,  inns:3,  no:1, runs:32,  balls:50,  ave:'16.00', sr:'64.00', hs:30, x100:0, x50:0, x25:1, x0:1, fours:2,  sixes:0 },
    bowling:{ mat:4,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:2 } },
  { tournament:'USA Cricket Junior Pathway', format:'T20', level:'series', seriesName:'USAC 2026 - Austin - U11', year:2026,
    batting:{ mat:8,  inns:7,  no:2, runs:235, balls:231, ave:'47.00', sr:'101.73',hs:90, x100:0, x50:1, x25:3, x0:1, fours:30, sixes:0 },
    bowling:{ mat:8,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:2 } },
  { tournament:'USA Cricket Junior Pathway', format:'T20', level:'series', seriesName:'USAC 2025 West Subconference(Dallas) U11', year:2025,
    batting:{ mat:5,  inns:3,  no:1, runs:15,  balls:24,  ave:'7.50',  sr:'62.50', hs:14, x100:0, x50:0, x25:0, x0:1, fours:2,  sixes:0 },
    bowling:{ mat:5,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:1 } },
  { tournament:'USA Cricket Junior Pathway', format:'T20', level:'series', seriesName:'USAC 2025 Austin Regional Practice', year:2025,
    batting:{ mat:1,  inns:1,  no:1, runs:42,  balls:37,  ave:'—',     sr:'113.51',hs:42, x100:0, x50:0, x25:1, x0:0, fours:7,  sixes:0 },
    bowling:{ mat:1,  inns:1,  overs:'2.0',  bowlRuns:6,  wkts:0, bbf:'6/0', mdns:1, bowlAve:'—', econ:3.00,  bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },
  { tournament:'USA Cricket Junior Pathway', format:'T20', level:'series', seriesName:'2025 USAC Austin HUB U11', year:2025,
    batting:{ mat:6,  inns:5,  no:3, runs:137, balls:174, ave:'68.50', sr:'78.74', hs:36, x100:0, x50:0, x25:4, x0:0, fours:13, sixes:0 },
    bowling:{ mat:6,  inns:3,  overs:'6.0',  bowlRuns:35, wkts:1, bbf:'10/1', mdns:0, bowlAve:'35.00', econ:5.83, bowlSR:'36.0', x4w:0, x5w:0, wides:10, catches:5 } },
  { tournament:'USA Cricket Junior Pathway', format:'1 DAY', level:'series_type', seriesName:'', year:null,
    batting:{ mat:6,  inns:4,  no:3, runs:36,  balls:72,  ave:'36.00', sr:'50.00', hs:18, x100:0, x50:0, x25:0, x0:1, fours:3,  sixes:0 },
    bowling:{ mat:6,  inns:4,  overs:'7.0',  bowlRuns:29, wkts:3, bbf:'10/2', mdns:0, bowlAve:'9.67',  econ:4.14, bowlSR:'14.0', x4w:0, x5w:0, wides:2, catches:2 } },
  { tournament:'USA Cricket Junior Pathway', format:'1 DAY', level:'series', seriesName:'USAC 2026 - Austin - U13', year:2026,
    batting:{ mat:5,  inns:3,  no:2, runs:19,  balls:42,  ave:'19.00', sr:'45.24', hs:18, x100:0, x50:0, x25:0, x0:1, fours:1,  sixes:0 },
    bowling:{ mat:5,  inns:4,  overs:'7.0',  bowlRuns:29, wkts:3, bbf:'10/2', mdns:0, bowlAve:'9.67',  econ:4.14, bowlSR:'14.0', x4w:0, x5w:0, wides:2, catches:2 } },
  { tournament:'USA Cricket Junior Pathway', format:'1 DAY', level:'series', seriesName:'USAC 2025 Austin Hub Selection Trails U11', year:2025,
    batting:{ mat:1,  inns:1,  no:1, runs:17,  balls:30,  ave:'—',     sr:'56.67', hs:17, x100:0, x50:0, x25:0, x0:0, fours:2,  sixes:0 },
    bowling:{ mat:1,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },
  { tournament:'USA Cricket Junior Pathway', format:'YOUTH', level:'series_type', seriesName:'', year:null,
    batting:{ mat:1,  inns:1,  no:0, runs:0,   balls:1,   ave:'0.00',  sr:'0.00',  hs:0,  x100:0, x50:0, x25:0, x0:1, fours:0,  sixes:0 },
    bowling:{ mat:1,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },
  { tournament:'USA Cricket Junior Pathway', format:'YOUTH', level:'series', seriesName:'USAC Youth 2024 - Austin Hub - U11', year:2024,
    batting:{ mat:1,  inns:1,  no:0, runs:0,   balls:1,   ave:'0.00',  sr:'0.00',  hs:0,  x100:0, x50:0, x25:0, x0:1, fours:0,  sixes:0 },
    bowling:{ mat:1,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },

  // ══ 13. ACL TEST SERIES ═══════════════════════════════════════════════════
  { tournament:'ACL Test Series', format:'TEST', level:'series_type', seriesName:'', year:null,
    batting:{ mat:1,  inns:2,  no:1, runs:3,   balls:22,  ave:'3.00',  sr:'13.64', hs:2,  x100:0, x50:0, x25:0, x0:0, fours:0,  sixes:0 },
    bowling:{ mat:1,  inns:2,  overs:'7.0',  bowlRuns:21, wkts:1, bbf:'15/1', mdns:0, bowlAve:'21.00', econ:3.00, bowlSR:'42.0', x4w:0, x5w:0, wides:4, catches:0 } },
  { tournament:'ACL Test Series', format:'TEST', level:'series', seriesName:'S2 Border-Gavaskar - Junior 2024', year:2024,
    batting:{ mat:1,  inns:2,  no:1, runs:3,   balls:22,  ave:'3.00',  sr:'13.64', hs:2,  x100:0, x50:0, x25:0, x0:0, fours:0,  sixes:0 },
    bowling:{ mat:1,  inns:2,  overs:'7.0',  bowlRuns:21, wkts:1, bbf:'15/1', mdns:0, bowlAve:'21.00', econ:3.00, bowlSR:'42.0', x4w:0, x5w:0, wides:4, catches:0 } },

  // ══ 14. LONESTAR PREMIER CRICKET LEAGUE (LPCL) ════════════════════════════
  { tournament:'Lonestar Premier Cricket League (LPCL)', format:'1 DAY', level:'series_type', seriesName:'', year:null,
    batting:{ mat:3,  inns:3,  no:0, runs:5,   balls:24,  ave:'1.67',  sr:'20.83', hs:5,  x100:0, x50:0, x25:0, x0:2, fours:0,  sixes:0 },
    bowling:{ mat:3,  inns:2,  overs:'4.0',  bowlRuns:26, wkts:1, bbf:'16/1', mdns:0, bowlAve:'26.00', econ:6.50, bowlSR:'24.0', x4w:0, x5w:0, wides:6, catches:0 } },
  { tournament:'Lonestar Premier Cricket League (LPCL)', format:'1 DAY', level:'series', seriesName:'2024- LaborDay -Youth - 2024-LaborDay-U11', year:2024,
    batting:{ mat:3,  inns:3,  no:0, runs:5,   balls:24,  ave:'1.67',  sr:'20.83', hs:5,  x100:0, x50:0, x25:0, x0:2, fours:0,  sixes:0 },
    bowling:{ mat:3,  inns:2,  overs:'4.0',  bowlRuns:26, wkts:1, bbf:'16/1', mdns:0, bowlAve:'26.00', econ:6.50, bowlSR:'24.0', x4w:0, x5w:0, wides:6, catches:0 } },

  // ══ 15. TEXASYOUTHPREMIERLEAGUE (ZERO ACTIVITY) ═══════════════════════════
  { tournament:'TexasYouthPremierLeague', format:'League', level:'series_type', seriesName:'', year:null,
    batting:{ mat:0, inns:0, no:0, runs:0, balls:0, ave:'—', sr:'—', hs:0, x100:0, x50:0, x25:0, x0:0, fours:0, sixes:0 },
    bowling:{ mat:0, inns:0, overs:'0.0', bowlRuns:0, wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0, bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },

  // ══ 16. AMLCA - ELITE JR CHAMPIONSHIP ════════════════════════════════════
  { tournament:'AMLCA - Elite Jr Championship', format:'1 DAY', level:'series_type', seriesName:'', year:null,
    batting:{ mat:12, inns:11, no:3, runs:149, balls:211, ave:'18.62', sr:'70.62', hs:70, x100:0, x50:1, x25:1, x0:2, fours:18, sixes:0 },
    bowling:{ mat:12, inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:5 } },
  { tournament:'AMLCA - Elite Jr Championship', format:'1 DAY', level:'series', seriesName:'2026 Labor Day Tournament - U13 Div B', year:2026,
    batting:{ mat:4,  inns:3,  no:2, runs:103, balls:111, ave:'103.00',sr:'92.79', hs:70, x100:0, x50:1, x25:1, x0:0, fours:13, sixes:0 },
    bowling:{ mat:4,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:3 } },
  { tournament:'AMLCA - Elite Jr Championship', format:'1 DAY', level:'series', seriesName:'2025 Div C Labor Day Nationals - U13', year:2025,
    batting:{ mat:4,  inns:4,  no:0, runs:33,  balls:78,  ave:'8.25',  sr:'42.31', hs:13, x100:0, x50:0, x25:0, x0:1, fours:3,  sixes:0 },
    bowling:{ mat:4,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },
  { tournament:'AMLCA - Elite Jr Championship', format:'1 DAY', level:'series', seriesName:'2025 Div B Summer Derby - U13', year:2025,
    batting:{ mat:4,  inns:4,  no:1, runs:13,  balls:22,  ave:'4.33',  sr:'59.09', hs:10, x100:0, x50:0, x25:0, x0:1, fours:2,  sixes:0 },
    bowling:{ mat:4,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:2 } },

  // ══ 17. PRESIDENTS CUP ════════════════════════════════════════════════════
  { tournament:'Presidents Cup', format:'T20', level:'series_type', seriesName:'', year:null,
    batting:{ mat:8,  inns:6,  no:1, runs:17,  balls:86,  ave:'3.40',  sr:'19.77', hs:8,  x100:0, x50:0, x25:0, x0:2, fours:0,  sixes:0 },
    bowling:{ mat:8,  inns:4,  overs:'6.0',  bowlRuns:37, wkts:1, bbf:'6/1', mdns:0, bowlAve:'37.00', econ:6.17, bowlSR:'36.0', x4w:0, x5w:0, wides:2, catches:1 } },
  { tournament:'Presidents Cup', format:'T20', level:'series', seriesName:'2026 Presidents Cup - U13', year:2026,
    batting:{ mat:4,  inns:4,  no:0, runs:14,  balls:58,  ave:'3.50',  sr:'24.14', hs:8,  x100:0, x50:0, x25:0, x0:1, fours:0,  sixes:0 },
    bowling:{ mat:4,  inns:3,  overs:'4.0',  bowlRuns:31, wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:7.75,  bowlSR:'—', x4w:0, x5w:0, wides:2, catches:1 } },
  { tournament:'Presidents Cup', format:'T20', level:'series', seriesName:'2025 President Cup - U12', year:2025,
    batting:{ mat:4,  inns:2,  no:1, runs:3,   balls:28,  ave:'3.00',  sr:'10.71', hs:3,  x100:0, x50:0, x25:0, x0:1, fours:0,  sixes:0 },
    bowling:{ mat:4,  inns:1,  overs:'2.0',  bowlRuns:6,  wkts:1, bbf:'6/1', mdns:0, bowlAve:'6.00',  econ:3.00, bowlSR:'12.0', x4w:0, x5w:0, wides:0, catches:0 } },

  // ══ 18. 22YARDS LEAGUE (ZERO ACTIVITY) ═══════════════════════════════════
  { tournament:'22Yards League', format:'League', level:'series_type', seriesName:'', year:null,
    batting:{ mat:0, inns:0, no:0, runs:0, balls:0, ave:'—', sr:'—', hs:0, x100:0, x50:0, x25:0, x0:0, fours:0, sixes:0 },
    bowling:{ mat:0, inns:0, overs:'0.0', bowlRuns:0, wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0, bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },

  // ══ 19. AUSTIN ELITE YOUTH CRICKET LEAGUE ════════════════════════════════
  { tournament:'Austin Elite Youth Cricket League', format:'T20', level:'series_type', seriesName:'', year:null,
    batting:{ mat:9,  inns:9,  no:6, runs:224, balls:288, ave:'74.67', sr:'77.78', hs:50, x100:0, x50:2, x25:2, x0:0, fours:22, sixes:0 },
    bowling:{ mat:9,  inns:2,  overs:'5.0',  bowlRuns:36, wkts:0, bbf:'0/0', mdns:1, bowlAve:'—', econ:7.20,  bowlSR:'—', x4w:0, x5w:0, wides:5, catches:2 } },
  { tournament:'Austin Elite Youth Cricket League', format:'T20', level:'series', seriesName:'CSA/AE Bilateral Series 2025', year:2025,
    batting:{ mat:4,  inns:4,  no:3, runs:107, balls:126, ave:'107.00',sr:'84.92', hs:50, x100:0, x50:1, x25:1, x0:0, fours:11, sixes:0 },
    bowling:{ mat:4,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:1 } },
  { tournament:'Austin Elite Youth Cricket League', format:'T20', level:'series', seriesName:'Central Texas U11 Series 2025', year:2025,
    batting:{ mat:5,  inns:5,  no:3, runs:117, balls:162, ave:'58.50', sr:'72.22', hs:50, x100:0, x50:1, x25:1, x0:0, fours:11, sixes:0 },
    bowling:{ mat:5,  inns:2,  overs:'5.0',  bowlRuns:36, wkts:0, bbf:'0/0', mdns:1, bowlAve:'—', econ:7.20,  bowlSR:'—', x4w:0, x5w:0, wides:5, catches:1 } },

  // ══ 20. AUSTIN YOUTH CRICKET CONSORTIUM ══════════════════════════════════
  { tournament:'Austin Youth Cricket Consortium', format:'YOUTH', level:'series_type', seriesName:'', year:null,
    batting:{ mat:4,  inns:4,  no:3, runs:87,  balls:88,  ave:'87.00', sr:'98.86', hs:44, x100:0, x50:0, x25:2, x0:0, fours:6,  sixes:1 },
    bowling:{ mat:4,  inns:1,  overs:'5.0',  bowlRuns:28, wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:5.60,  bowlSR:'—', x4w:0, x5w:0, wides:3, catches:1 } },
  { tournament:'Austin Youth Cricket Consortium', format:'YOUTH', level:'series', seriesName:'AYCC Unity League 2026 - U13', year:2026,
    batting:{ mat:2,  inns:2,  no:2, runs:33,  balls:48,  ave:'—',     sr:'68.75', hs:27, x100:0, x50:0, x25:1, x0:0, fours:1,  sixes:0 },
    bowling:{ mat:2,  inns:1,  overs:'5.0',  bowlRuns:28, wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:5.60,  bowlSR:'—', x4w:0, x5w:0, wides:3, catches:0 } },
  { tournament:'Austin Youth Cricket Consortium', format:'YOUTH', level:'series', seriesName:'AYCC Unity League 2026 - U11', year:2026,
    batting:{ mat:2,  inns:2,  no:1, runs:54,  balls:40,  ave:'54.00', sr:'135.00',hs:44, x100:0, x50:0, x25:1, x0:0, fours:5,  sixes:1 },
    bowling:{ mat:2,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:1 } },
  { tournament:'Austin Youth Cricket Consortium', format:'1 DAY', level:'series_type', seriesName:'', year:null,
    batting:{ mat:7,  inns:7,  no:6, runs:74,  balls:143, ave:'74.00', sr:'51.75', hs:16, x100:0, x50:0, x25:0, x0:0, fours:5,  sixes:0 },
    bowling:{ mat:7,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:3 } },
  { tournament:'Austin Youth Cricket Consortium', format:'1 DAY', level:'series', seriesName:'AYCC Unity League 2025', year:2025,
    batting:{ mat:6,  inns:6,  no:5, runs:66,  balls:123, ave:'66.00', sr:'53.66', hs:16, x100:0, x50:0, x25:0, x0:0, fours:5,  sixes:0 },
    bowling:{ mat:6,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:3 } },
  { tournament:'Austin Youth Cricket Consortium', format:'1 DAY', level:'series', seriesName:'AYCC U13 Winter 2025 Series - U13', year:2025,
    batting:{ mat:1,  inns:1,  no:1, runs:8,   balls:20,  ave:'—',     sr:'40.00', hs:8,  x100:0, x50:0, x25:0, x0:0, fours:0,  sixes:0 },
    bowling:{ mat:1,  inns:0,  overs:'0.0',  bowlRuns:0,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:0,     bowlSR:'—', x4w:0, x5w:0, wides:0, catches:0 } },
  { tournament:'Austin Youth Cricket Consortium', format:'TEST', level:'series_type', seriesName:'', year:null,
    batting:{ mat:2,  inns:2,  no:1, runs:48,  balls:68,  ave:'48.00', sr:'70.59', hs:29, x100:0, x50:0, x25:1, x0:0, fours:3,  sixes:0 },
    bowling:{ mat:2,  inns:1,  overs:'1.0',  bowlRuns:2,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:2.00,  bowlSR:'—', x4w:0, x5w:0, wides:1, catches:3 } },
  { tournament:'Austin Youth Cricket Consortium', format:'TEST', level:'series', seriesName:'AYCC Test T20 Tournament - U11 2026', year:2026,
    batting:{ mat:2,  inns:2,  no:1, runs:48,  balls:68,  ave:'48.00', sr:'70.59', hs:29, x100:0, x50:0, x25:1, x0:0, fours:3,  sixes:0 },
    bowling:{ mat:2,  inns:1,  overs:'1.0',  bowlRuns:2,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:2.00,  bowlSR:'—', x4w:0, x5w:0, wides:1, catches:3 } },

  // ══ 21. HOUSTON INVITATIONAL TOURNAMENT (HIT) ═════════════════════════════
  { tournament:'Houston Invitational Tournament (HIT)', format:'T20', level:'series_type', seriesName:'', year:null,
    batting:{ mat:4,  inns:4,  no:2, runs:41,  balls:59,  ave:'20.50', sr:'69.49', hs:20, x100:0, x50:0, x25:0, x0:0, fours:2,  sixes:0 },
    bowling:{ mat:4,  inns:1,  overs:'0.4',  bowlRuns:1,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:1.50,  bowlSR:'—', x4w:0, x5w:0, wides:1, catches:2 } },
  { tournament:'Houston Invitational Tournament (HIT)', format:'T20', level:'series', seriesName:'HIT 2025 - Columbus', year:2025,
    batting:{ mat:4,  inns:4,  no:2, runs:41,  balls:59,  ave:'20.50', sr:'69.49', hs:20, x100:0, x50:0, x25:0, x0:0, fours:2,  sixes:0 },
    bowling:{ mat:4,  inns:1,  overs:'0.4',  bowlRuns:1,  wkts:0, bbf:'0/0', mdns:0, bowlAve:'—', econ:1.50,  bowlSR:'—', x4w:0, x5w:0, wides:1, catches:2 } },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Parse overs string (e.g. "12.3") → decimal balls for arithmetic */
function oversToDecimal(o) {
  if (!o || o === '0.0' || o === '0') return 0;
  const parts = String(o).split('.');
  const full  = parseInt(parts[0], 10) || 0;
  const extra = parseInt(parts[1] || '0', 10) || 0;
  return full + extra / 6;
}

/** Convert decimal overs back to cricket notation ("12.3") */
function decimalToOvers(d) {
  const full  = Math.floor(d);
  const balls = Math.round((d - full) * 6);
  return balls === 0 ? `${full}.0` : `${full}.${balls}`;
}

/** Format ave/sr — if string already (from CricClubs) keep it, else round to 2dp */
function fmt2(v) {
  if (v === null || v === undefined || v === '—' || v === '--') return '—';
  const n = parseFloat(v);
  return isNaN(n) ? '—' : n.toFixed(2);
}

// Tournaments to EXCLUDE from career totals (zero-activity, League format)
const EXCLUDE_FROM_CAREER = new Set(['TexasYouthPremierLeague', '22Yards League']);

// ─────────────────────────────────────────────────────────────────────────────
// TOURNAMENTS  (one object per tournament, aggregated from series_type rows)
// Sorted alphabetically as requested.
// ─────────────────────────────────────────────────────────────────────────────

function buildTournaments() {
  // Collect unique tournament names
  const names = [...new Set(RAW_SERIES.map(r => r.tournament))].sort();

  return names.map(name => {
    // All series_type rows for this tournament
    const stRows = RAW_SERIES.filter(r => r.tournament === name && r.level === 'series_type');
    const seriesRows = RAW_SERIES.filter(r => r.tournament === name && r.level === 'series');

    // Formats present
    const formats = [...new Set(stRows.map(r => r.format))];

    // Aggregate batting across all formats
    let mat=0, inns=0, no=0, runs=0, balls=0, hs=0;
    let x100=0, x50=0, x25=0, x0=0, fours=0, sixes=0;
    stRows.forEach(r => {
      const b = r.batting;
      mat   += b.mat;
      inns  += b.inns;
      no    += b.no;
      runs  += b.runs;
      balls += b.balls;
      if (b.hs > hs) hs = b.hs;
      x100 += b.x100; x50 += b.x50; x25 += b.x25; x0 += b.x0;
      fours += b.fours; sixes += b.sixes;
    });
    const denom = inns - no;
    const avg = denom > 0 ? +(runs / denom).toFixed(2) : null;
    const sr  = balls > 0 ? +(runs / balls * 100).toFixed(2) : null;

    // Aggregate bowling across all formats
    let bMat=0, bInns=0, bOversD=0, bRuns=0, wkts=0, wides=0, mdns=0, catches=0;
    let bestWkts=0, bestRuns=999, bbf='0/0';
    stRows.forEach(r => {
      const b = r.bowling;
      bMat    += b.mat;
      bInns   += b.inns;
      bOversD += oversToDecimal(b.overs);
      bRuns   += b.bowlRuns;
      wkts    += b.wkts;
      wides   += b.wides;
      mdns    += b.mdns;
      catches += b.catches;
      // Track best bowling figures
      if (b.bbf && b.bbf !== '0/0') {
        const [w, rr] = b.bbf.split('/').map(Number);
        if (w > bestWkts || (w === bestWkts && rr < bestRuns)) {
          bestWkts = w; bestRuns = rr; bbf = b.bbf;
        }
      }
    });
    const bOvers = decimalToOvers(bOversD);
    const econ   = bOversD > 0 ? +(bRuns / bOversD).toFixed(2) : null;
    const bowlAvg= wkts   > 0 ? +(bRuns / wkts).toFixed(2)   : null;

    // Series for drilldown — only series rows (not series_type), skip TBD ones from the display
    const series = seriesRows
      .filter(r => r.seriesName && r.seriesName !== 'TBD')
      .sort((a, b) => (b.year || 0) - (a.year || 0)); // newest first

    return {
      name,
      formats,
      formatLabel: formats.join(' / '),
      // Batting
      mat, inns, no, runs, balls, avg, sr, hs, x100, x50, x25, x0, fours, sixes,
      // Bowling
      bMat, bInns, bOvers, bRuns, wkts, econ, bowlAvg, bbf, wides, mdns, catches,
      // Meta
      isZero: mat === 0,
      series,
      // All series_type rows for stats table
      formatRows: stRows,
    };
  });
}

export const TOURNAMENTS = buildTournaments();

// ─────────────────────────────────────────────────────────────────────────────
// YEARLY  (auto-calculated from series rows grouped by year)
// ─────────────────────────────────────────────────────────────────────────────

function buildYearly() {
  // Gather all series rows that have a valid numeric year, excluding zero-activity leagues
  const eligible = RAW_SERIES.filter(r =>
    r.level === 'series' &&
    typeof r.year === 'number' &&
    !EXCLUDE_FROM_CAREER.has(r.tournament)
  );

  const years = [...new Set(eligible.map(r => r.year))].sort();

  return years.map(yr => {
    const rows = eligible.filter(r => r.year === yr);
    let mat=0, inns=0, no=0, runs=0, balls=0, hs=0;
    let x100=0, x50=0, x25=0, x0=0, fours=0, sixes=0;
    let bOversD=0, bRuns=0, wkts=0, catches=0, wides=0;
    const tSet = new Set();

    rows.forEach(r => {
      const bt = r.batting, bw = r.bowling;
      mat   += bt.mat;
      inns  += bt.inns; no += bt.no; runs += bt.runs; balls += bt.balls;
      if (bt.hs > hs) hs = bt.hs;
      x100+=bt.x100; x50+=bt.x50; x25+=bt.x25; x0+=bt.x0;
      fours+=bt.fours; sixes+=bt.sixes;
      bOversD += oversToDecimal(bw.overs);
      bRuns   += bw.bowlRuns; wkts += bw.wkts;
      catches += bw.catches; wides += bw.wides;
      tSet.add(r.tournament);
    });

    const denom = inns - no;
    const avg   = denom > 0 ? +(runs  / denom).toFixed(2)   : null;
    const sr    = balls > 0 ? +(runs  / balls * 100).toFixed(2) : null;
    const econ  = bOversD > 0 ? +(bRuns / bOversD).toFixed(2) : null;

    return {
      year: yr,
      mat, inns, no, runs, balls,
      avg, sr, hs, x100, x50, x25, x0, fours, sixes,
      overs: decimalToOvers(bOversD), bRuns, wkts, econ, catches, wides,
      tournaments: tSet.size,
      tournamentNames: [...tSet].sort(),
    };
  });
}

export const YEARLY = buildYearly();

// ─────────────────────────────────────────────────────────────────────────────
// CAREER  (auto-calculated from series_type rows, excluding League format)
// ─────────────────────────────────────────────────────────────────────────────

function buildCareer() {
  const eligible = RAW_SERIES.filter(r =>
    r.level === 'series_type' &&
    !EXCLUDE_FROM_CAREER.has(r.tournament) &&
    r.format !== 'League'
  );

  let mat=0, inns=0, no=0, runs=0, balls=0, hs=0;
  let x100=0, x50=0, x25=0, x0=0, fours=0, sixes=0;
  let bOversD=0, bRuns=0, wkts=0, catches=0, wides=0, mdns=0;
  const tSet = new Set();

  eligible.forEach(r => {
    const bt = r.batting, bw = r.bowling;
    mat   += bt.mat;
    inns  += bt.inns; no += bt.no; runs += bt.runs; balls += bt.balls;
    if (bt.hs > hs) hs = bt.hs;
    x100+=bt.x100; x50+=bt.x50; x25+=bt.x25; x0+=bt.x0;
    fours+=bt.fours; sixes+=bt.sixes;
    bOversD += oversToDecimal(bw.overs);
    bRuns   += bw.bowlRuns; wkts += bw.wkts;
    catches += bw.catches; wides += bw.wides; mdns += bw.mdns;
    tSet.add(r.tournament);
  });

  const denom   = inns - no;
  const avg     = denom   > 0 ? +(runs  / denom).toFixed(2)       : 0;
  const sr      = balls   > 0 ? +(runs  / balls * 100).toFixed(2) : 0;
  const bowlAvg = wkts    > 0 ? +(bRuns / wkts).toFixed(2)        : 0;
  const econ    = bOversD > 0 ? +(bRuns / bOversD).toFixed(2)     : 0;

  return {
    matches: mat,
    innings: inns,
    notOuts: no,
    runs,
    balls,
    avg,
    sr,
    hs,
    x100, x50, x25,
    ducks: x0,
    fours,
    sixes,
    overs:    decimalToOvers(bOversD),
    bowlRuns: bRuns,
    wickets:  wkts,
    econ,
    bowlAvg,
    catches,
    wides,
    mdns,
    tournaments: tSet.size,
  };
}

export const CAREER = buildCareer();
