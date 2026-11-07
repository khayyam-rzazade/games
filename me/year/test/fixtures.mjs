/* Cards tests: the players (me/year/test/fixtures.mjs). Stats objects in the shape of plan section 3d, built from a day mask so the
   numbers of a month card agree with the year's. Chat B's me/mock-stats.json is the same shape for the page; these are for the cards,
   and include the edge players a card has to survive (one game only, no spot-ons, base camp, a very long game name). */
const two = (n) => (n < 10 ? '0' : '') + n;
export const iso = (y, m, d) => y + '-' + two(m) + '-' + two(d);
const plus = (a, n) => { const p = a.split('-'), t = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]) + n * 86400000); return iso(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate()); };
const diff = (a, b) => { const p = a.split('-'), q = b.split('-'); return Math.round((Date.UTC(+q[0], +q[1] - 1, +q[2]) - Date.UTC(+p[0], +p[1] - 1, +p[2])) / 86400000); };

/* My Logicers' record ids (assets/js/me-stats.js DAILY and WORDS), in the order stats().per has them: always all twelve */
export const DAILY = ['energy', 'hundred', 'call', 'cousin', 'club', 'apart', 'gets', 'every', 'o24'];
export const ALL = DAILY.concat(['altitude', 'lookalike', 'passport']);
export const NAMES = { energy: 'Same Energy', hundred: '100 of Us', call: 'Your Call', cousin: 'Long Lost Cousin', club: 'The Club', apart: 'Years Apart', gets: 'Who Gets What',
  every: 'Every Beat', o24: 'Out of 24', altitude: 'Altitude', lookalike: 'Lookalike', passport: 'Passport' };

/* a day mask over [from, to]: rule(i, date) -> '0' | '1' (| '2'..'9') */
export function mask(from, to, rule) { let s = ''; for (let i = 0; i <= diff(from, to); i++) s += rule(i, plus(from, i)); return s; }
function streaks(d) { let best = 0, run = 0; for (const ch of d) { if (ch !== '0') { run++; best = Math.max(best, run); } else run = 0; } let cur = 0; for (let i = d.length - 1; i >= 0 && d[i] !== '0'; i--) cur++; return { best, cur }; }

/* the whole record's calendar: 1 Jan to 31 Dec of 2026 (zeros before the player came), so the cards must trim it */
export function player(o) {
  const cal = { from: '2026-01-01', to: '2026-12-31', d: mask('2026-01-01', '2026-12-31', (i, day) => (day >= o.since && day <= o.today && o.rule(day, diff(o.since, day)) ? '1' : '0')) };
  return { o, cal };
}
const inRange = (day, a, b) => day >= a && day <= b;

export function statsOf(P, period, opts) {
  const o = P.o, today = (opts && opts.today) || o.today, nm = (opts && opts.name) || ((id) => NAMES[id] || id);
  const whole = !period || (!period.year && !period.month);                        // {} = all time
  const lo = whole ? P.cal.from : period.year ? period.year + '-01-01' : period.month + '-01';
  const hi0 = whole ? P.cal.to : period.year ? period.year + '-12-31' : plus(period.month + '-01', new Date(Date.UTC(+period.month.slice(0, 4), +period.month.slice(5), 0)).getUTCDate() - 1);
  const to = hi0 < today ? hi0 : today;                                             // never after today, as the real stats()
  const dm = mask(lo, to, (i, day) => { const k = diff(P.cal.from, day); return k >= 0 && k < P.cal.d.length ? P.cal.d[k] : '0'; });
  const days = [...dm].filter((c) => c !== '0').length, st = streaks(dm);
  const all = [...P.cal.d].filter((c) => c !== '0').length || 1, f = days / all;
  const games = Math.round(o.games * f), spotOn = Math.min(games, Math.round(o.spotOn * f));
  const rows = {}; o.per.forEach((p) => { rows[p.id] = p; });
  return {
    logicer: o.logicer, since: o.since, langs: o.langs.slice(),
    days, games, spotOn, pct: games ? Math.round((100 * spotOn) / games) : 0, current: st.cur, longest: st.best,
    per: ['energy', 'hundred', 'call', 'cousin', 'club', 'apart', 'gets', 'every', 'o24', 'altitude', 'lookalike', 'passport'].map((id) => {
      const p = rows[id] || { played: 0, spotOn: 0, current: 0, longest: 0, best: 0, last: null };
      return { id, name: nm(id), played: Math.round(p.played * f), current: p.current || 0, longest: p.longest || 0, spotOn: Math.round(p.spotOn * f), best: p.best || 0, last: p.played ? p.last : null };
    }),
    words: o.words ? { climbs: Math.round(o.words.climbs * f), highest: o.words.highest, perfect: Math.round(o.words.perfect * f) } : { climbs: 0, highest: 0, perfect: 0 },
    story: o.story ? { chapters: Math.round(o.story.chapters * f), votes: Math.round(o.story.votes * f), withWorld: Math.round(o.story.withWorld * f) } : { chapters: 0, votes: 0, withWorld: 0 },
    findouts: { done: o.findouts, portrait: o.findouts === 9 },
    checkin: { times: 3, last: { date: '2026-12-01', score: 64, st: 3 }, prev: null, history: [{ date: '2026-12-01', score: 64 }] },      // present, never to be drawn
    mine: o.mine.map((m) => ({ kind: m.kind, title: m.title, code: m.code, made: m.made, link: null })), doors: { passkey: false, pw: false, rq: false },
    calendar: { from: lo <= to ? lo : null, to, d: dm }
  };
}

const per = (rows) => rows.map(([id, played, spotOn, best]) => ({ id, name: NAMES[id] || id, played, current: 1, longest: 4, spotOn, best: best || 0, last: '2026-12-19' }));   // the games not listed are filled in with zeros by statsOf

/* everything: since the first week, 3 languages, all nine games, words, story, nine find-outs, three made games */
export const FULL = player({
  logicer: 48213, since: '2026-10-03', today: '2026-12-20', langs: ['en', 'it', 'tr'], games: 540, spotOn: 168, findouts: 9,
  rule: (day, i) => (i % 9 === 4 ? false : true),                          // one missed day in nine
  per: per([['energy', 62, 21], ['hundred', 70, 24], ['call', 66, 18], ['cousin', 61, 12], ['club', 58, 14], ['apart', 52, 20], ['gets', 44, 11],
    ['every', 40, 9], ['o24', 35, 8], ['altitude', 31, 10, 7], ['lookalike', 12, 4], ['passport', 9, 2]]),
  words: { climbs: 31, highest: 7, perfect: 4 }, story: { chapters: 12, votes: 11, withWorld: 8 },
  mine: [{ kind: 'made', title: 'Exam 3', code: 'ABCD12', made: '2026-10-14' }, { kind: 'made', title: 'Quiz night', code: 'EFGH34', made: '2026-11-02' }, { kind: 'made', title: 'Geo', code: 'JKLM56', made: '2026-11-20' }, { kind: 'checkin', title: 'Class', code: 'QRST78', made: '2026-11-21' }]
});

/* one game only: a newcomer since 18 Dec, English, three days */
export const ONE = player({
  logicer: 61207, since: '2026-12-18', today: '2026-12-20', langs: ['en'], games: 3, spotOn: 1, findouts: 0, rule: () => true,
  per: per([['hundred', 3, 1]]), words: null, story: null, mine: []
});

/* played plenty, never spot on; words at base camp; a game with a very long name */
export const NOSPOT = player({
  logicer: 7001, since: '2026-11-02', today: '2026-12-20', langs: ['es'], games: 60, spotOn: 0, findouts: 2, rule: (day, i) => i % 3 !== 0,
  per: per([['apart', 30, 0], ['club', 30, 0]]), words: { climbs: 5, highest: 1, perfect: 0 }, story: null, mine: []
});
export const LONGNAME = player({
  logicer: 99999999, since: '2026-10-05', today: '2026-12-20', langs: ['en', 'it'], games: 400, spotOn: 120, findouts: 9, rule: () => true,
  per: [{ id: 'gets', name: 'Welche Reise ist die weiteste: die Pünktlichkeit der Züge und Busse in Deutschland', played: 40, spotOn: 30, current: 1, longest: 5, best: 0, last: '2026-12-19' }],
  words: { climbs: 3, highest: 8, perfect: 3 }, story: { chapters: 40, votes: 40, withWorld: 40 }, mine: []
});

/* /dist as plan 3c gives it */
/* /dist as server/me/worker.js gives it: the running year and month, percentiles 10/25/50/75/90/95/99, days null under 30 records */
const P7 = (a) => ({ 10: a[0], 25: a[1], 50: a[2], 75: a[3], 90: a[4], 95: a[5], 99: a[6] });
export const DIST = { ok: true, opens_at: 30, year: 2026, n: 812, days: P7([2, 4, 9, 21, 41, 72, 78]), spot: P7([2, 5, 18, 27, 36, 44, 50]),
  month: '2026-12', mn: 410, mdays: P7([1, 3, 6, 12, 19, 23, 28]), mspot: P7([1, 2, 4, 8, 12, 15, 18]), at: '2026-12-20T10:00:00.000Z' };
export const DIST_SMALL = { ok: true, opens_at: 30, year: 2026, n: 12, days: null, spot: null, month: '2026-12', mn: 12, mdays: null, mspot: null, at: '2026-12-20T10:00:00.000Z' };

/* the page's stand-in for me-stats.js / me.js / the Worker: window.LOGICERS_ME_SOURCE */
export function sourceScript(P, { dist, hasCode, noDist } = {}) {
  return `(() => { const P = ${JSON.stringify({ o: P.o, cal: P.cal })}; const f = ${statsOf.toString()}; const NAMES = ${JSON.stringify(NAMES)}; const mask = ${mask.toString()}; const streaks = ${streaks.toString()}; const diff = ${diff.toString()}; const plus = ${plus.toString()}; const two = ${two.toString()}; const iso = ${iso.toString()};
    const here = () => { const d = new Date(); return iso(d.getFullYear(), d.getMonth() + 1, d.getDate()); };
    window.__NAMES_ASKED = [];
    window.LOGICERS_ME_SOURCE = { stats: (period, opts) => { window.__NAMES_ASKED.push(opts && opts.name ? opts.name('hundred') : null); return f(P, period, { today: here(), name: opts && opts.name }); },
      ${noDist ? '' : 'dist: () => Promise.resolve(' + JSON.stringify(dist || null) + '),'} hasCode: () => ${!!hasCode} }; })();`;
}
