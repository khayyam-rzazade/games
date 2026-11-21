/* The portrait's check (chat K, 20 Nov 2026): a full portrait for the device. All nine games are scored with scoreGame
   (../scoring.js) and kept in the shape of find-out.js fresh(). Four phones:
     hi         every strip's dot at its right end (the case that broke Safari: a band name placed at 94-100% of its row)
     lo         every dot at the left end
     mid        every dot in the middle (the only case the first test data had, which is why nothing showed)
     noconsent  as hi, before the yes: the consent card, no doors, no comparisons
   portrait-serve.py runs this once (node portrait-seed.mjs <repo> <out.json>) and puts a seed in the page's localStorage. */
import { pathToFileURL } from 'node:url';
import { writeFileSync } from 'node:fs';
const repo = process.argv[2], out = process.argv[3] || 'portrait-seeds.json';
const { scoreGame, SPEC } = await import(pathToFileURL(repo + '/find-out/scoring.js').href);
const SCALE = { 1: [1, 5], 2: [1, 5], 3: [0, 24], 4: [0, 4], 5: [0, 10], 6: [0, 4], 7: [0, 10], 8: [1, 5] };
function answers(n, kind) {              // kind: hi (every strip at its right end), lo (left end), mid
  const s = SPEC[n], a = {};
  const pick = (lo, hi) => kind === 'hi' ? hi : kind === 'lo' ? lo : Math.round((lo + hi) / 2);
  if (n === 1) for (const k of s.keys) { const x = pick(1, 5); a[k] = s.reversed.includes(k) ? 6 - x : x; }
  if (n === 2 || n === 5) for (const k of s.keys) a[k] = pick(...s.scale);
  if (n === 3) for (const k of s.keys) { const x = pick(0, 4); a[k] = k === s.attention ? 3 : s.reversed.includes(k) ? 4 - x : x; }
  if (n === 4) for (const k of s.keys) { const p = s.pairs[k]; const auth = p.authoritarian, other = p.options.find((o) => o !== auth); a[k] = !auth ? p.options[0] : kind === 'hi' ? auth : kind === 'lo' ? other : (Number(k) % 2 ? auth : other); }
  if (n === 6) { for (const k of s.keys) { const q = s.riddles[k]; a[k] = kind === 'hi' ? q.correct : kind === 'lo' ? q.lure : (Number(k) % 2 ? q.correct : q.lure); } a.seen_before = false; }
  if (n === 7) for (const k of s.keys) a[k] = pick(...s.scale);
  if (n === 8) for (const k of s.keys) a[k] = 6 - pick(1, 5);         // reversed in the index
  if (n === 9) for (const k of s.keys) a[k] = pick(...s.scales[k]);
  return a;
}
function store(kind, consent) {
  const t0 = Date.parse('2026-11-01T10:00:00Z');
  const st = { v: 1, id: '0123456789abcdef0123456789abcdef', created: new Date(t0).toISOString(), header_country: 'IT', country: 'IT', country_asked: true, games: {},
    consent: consent ? { status: 'yes', version: 1, at: new Date(t0 + 9e5).toISOString() } : { status: null, version: null, at: null },
    uploaded: consent ? { at: new Date(t0 + 9e5).toISOString(), games: [1, 2, 3, 4, 5, 6, 7, 8, 9] } : {}, code: consent ? 'MK4-7PQX' : null,
    demographics: consent ? { age: '35–44', gender: 'Man', education: 'After university', settlement: 'Big city' } : null, funnel: { portrait: 1, first_game: 1, all_nine: 1 }, done_order: [], portrait_seen: true, cards_shown: true };
  for (let n = 1; n <= 9; n++) {
    const a = answers(n, kind), result = scoreGame(n, a);
    const sc = SCALE[n]; let guess = null;
    if (sc) { const p = kind === 'hi' ? 0.1 : kind === 'lo' ? 0.9 : 0.5; guess = { p, value: n === 6 ? Math.round(p * 4) : sc[0] + p * (sc[1] - sc[0]) }; }
    st.games[n] = { started: t0 + n * 6e4, finished: t0 + n * 6e4 + 3e4, duration_ms: 20000 + n * 1000, answers: a, times: {}, positions: {}, order: Object.keys(a).filter((k) => k !== 'seen_before'), guess, lang: 'en', v: 1, result, rules_version: '1' };
    if (result.scored !== false) st.done_order.push(n);
  }
  return st;
}
writeFileSync(out, JSON.stringify({ hi: store('hi', true), lo: store('lo', true), mid: store('mid', true), noconsent: store('hi', false) }));
