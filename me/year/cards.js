/* Logicers, the cards: what a card says (me/year/cards.js, 7 Nov 2026).
   Pure functions, no page, no canvas: they take the stats object of plan section 3d (and /dist) and say which screens a card
   has and what is on each. draw.js paints them, year.js runs the page; a test can call these in Node.
   It needs window.LogicersYear (open.js) for the day arithmetic: load open.js first (a script tag on the page, a require in a test).

   Rules kept here, so one place holds them:
   - Never a check-in score on a share picture: nothing of the check-in is read at all. The portrait's bands are not read either;
     the find-outs appear only as "9 of 9 done" in the closing line.
   - "More days than 83% of Logicers" only for a year card, only when /dist answers with at least MIN_N records, and only from
     the 50th percentile up (a player under the middle gets no line about it; nobody is ranked as low).
   - The closing line is the rarest true one of a small list (CLOSERS, rarest first), and "Thanks" when none is true. */

export const MIN_N = 30;                       // fewer records than this and /dist says nothing (a percentile of 3 people is not one)
export const PERCENT_FROM = 50;                // the lowest percentile a card will state

const Y = () => globalThis.LogicersYear;

/* the colour each game has on a card: the site's night colours (assets/css/logicers.css), the same on every phone */
const GAME = {
  '100-of-us': '#7FA5FF', 'your-call': '#B99DFF', 'long-lost-cousin': '#FF8468', 'the-club': '#FF86BF', 'years-apart': '#D9A983',
  'who-gets-what': '#35C95F', 'every-beat': '#FF6687', 'out-of-24': '#12B2C6', 'same-energy': '#E08600',
  altitude: '#A9C6DA', lookalike: '#4FD0EE', passport: '#D79AF0',
  hundred: '#7FA5FF', call: '#B99DFF', cousin: '#FF8468', club: '#FF86BF', apart: '#D9A983', gets: '#35C95F', every: '#FF6687', o24: '#12B2C6', energy: '#E08600'
};
const SPARE = ['#7FA5FF', '#3FE0C6', '#FFCB57', '#FF86BF', '#B99DFF', '#FF8468'];
export function colourOf(id) {
  const k = String(id || '').toLowerCase();
  if (GAME[k]) return GAME[k];
  const base = k.replace(/-(en|it|es|pt|fr|tr)$/, '');           // altitude-it -> altitude
  if (GAME[base]) return GAME[base];
  let h = 0; for (let i = 0; i < k.length; i++) h = (h * 31 + k.charCodeAt(i)) >>> 0;
  return SPARE[h % SPARE.length];
}

/* the screens' colours: an accent and a very dark tint of it for the top of the picture */
export const LOOK = {
  cover:   { accent: '#7FA5FF', tint: '#131A33' },
  days:    { accent: '#3FE0C6', tint: '#0C2028' },
  spot:    { accent: '#FFCB57', tint: '#231D17' },
  words:   { accent: '#4FD0EE', tint: '#071C24' },
  story:   { accent: '#B99DFF', tint: '#1A1733' },
  percent: { accent: '#FF8468', tint: '#24151C' },
  closing: { accent: '#FF86BF', tint: '#24152A' }
};

const num = (v) => (typeof v === 'number' && isFinite(v) ? v : 0);
const whole = (v) => Math.max(0, Math.round(num(v)));

/* a day's position in the period: the first day the card may show and the last (never before the player's first day, never after today) */
export function span(stats, card, today) {
  const r = Y().range(card), t = today || Y().iso(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
  let from = r.from;
  if (stats && typeof stats.since === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(stats.since) && stats.since > from) from = stats.since;
  const to = r.to < t ? r.to : t;
  const n = to >= from ? Y().diff(from, to) + 1 : 0;
  return { from, to, n };
}

/* the heat strip: one cell per day of the span, laid out in weeks (columns) of seven days (rows, Monday first).
   A day's value is 0 (not played) or 1 (played); a calendar written with 2–9 (how much was played) gives a stronger cell. */
export function heat(stats, card, today) {
  const cal = stats && stats.calendar, sp = span(stats, card, today);
  if (!cal || typeof cal.d !== 'string' || typeof cal.from !== 'string' || sp.n < 1) return null;
  const first = new Date(sp.from + 'T00:00:00Z').getUTCDay();         // 0 = Sunday
  const lead = (first + 6) % 7;                                       // Monday = 0
  const cells = [];
  let max = 1;
  for (let i = 0; i < sp.n; i++) {
    const day = Y().plus(sp.from, i), k = Y().diff(cal.from, day);
    const ch = k >= 0 && k < cal.d.length ? cal.d.charAt(k) : '0';
    const v = /[1-9]/.test(ch) ? Number(ch) : 0;
    if (v > max) max = v;
    const slot = lead + i;
    cells.push({ col: Math.floor(slot / 7), row: slot % 7, v, day, i });
  }
  return { cols: Math.ceil((lead + sp.n) / 7), rows: 7, cells, max, from: sp.from, to: sp.to, n: sp.n };
}

/* the best game is one of the nine daily games, as the spot-on rate beside it is (the word games' own "top grade" is another measure) */
const WORDGAME = /^(altitude|lookalike|passport)/;
export function bestGame(per) {
  const rows = (per || []).filter((p) => p && !WORDGAME.test(String(p.id)) && num(p.played) > 0 && num(p.spotOn) > 0);
  if (!rows.length) return null;
  const solid = rows.filter((p) => p.played >= 3);               // a game played once is not "best"
  const pool = solid.length ? solid : rows;
  return pool.slice().sort((a, b) => (b.spotOn / b.played - a.spotOn / a.played) || (b.spotOn - a.spotOn) || (b.played - a.played))[0];
}

/* the highest percentile of /dist (the Worker's own: 10, 25, 50, 75, 90, 95, 99) whose days the player has more than.
   /dist describes the year and the month that are running (year/n/days, month/mn/mdays) and the ones before (prev), so a card
   gets a number when /dist is about its period; null when /dist cannot say (too few records: days is null; another period; a bad answer) */
export function percentile(days, dist, card) {
  if (!dist || typeof dist !== 'object' || dist.ok === false) return null;
  /* /dist carries the running period and, under prev, the one before it (joint check, 7 Nov 2026): a card of the year or
     month that has just ended reads prev, so "Your 2026" keeps its number through January and "Your December" has one */
  const pick = (d) => (!d || typeof d !== 'object' ? null : card.kind === 'year'
    ? (Number(d.year) === card.y ? { n: d.n, table: d.days } : null)
    : (d.month === card.ym ? { n: d.mn, table: d.mdays } : null));
  const found = pick(dist) || pick(dist.prev);
  const mine = found ? { ok: true, n: found.n, table: found.table } : { ok: false };
  const need = num(dist.opens_at) > 0 ? dist.opens_at : MIN_N;
  if (!mine.ok || !(num(mine.n) >= need) || !mine.table || typeof mine.table !== 'object') return null;
  let best = null;
  Object.keys(mine.table).forEach((k) => {
    const p = Number(k), v = Number(mine.table[k]);
    if (isFinite(p) && isFinite(v) && p > 0 && p < 100 && days > v && (best === null || p > best)) best = p;
  });
  return best !== null && best >= PERCENT_FROM ? best : null;
}

const inPeriod = (iso, card) => { if (typeof iso !== 'string') return true; const r = Y().range(card); return iso >= r.from && iso <= r.to; };

/* the closing line: each rule says whether it is true for this player and with what numbers; the list is rarest first.
   Rarity here is the base chat's estimate of how few players each fact fits; when /dist can count them the order is one array to change. */
export const CLOSERS = [
  { id: 'streak', test: (s) => (s.longest >= 40 ? { n: whole(s.longest) } : null) },
  { id: 'made', test: (s, c) => { const n = (s.mine || []).filter((m) => m && (m.kind === 'made' || m.kind === 'studio') && inPeriod(m.made, c.card)).length; return n >= 3 ? { n } : null; } },
  { id: 'findouts', test: (s) => (s.findouts && s.findouts.done >= 9 ? { n: 9, of: 9 } : null) },
  { id: 'perfect', test: (s) => { const g = (s.per || []).find((p) => p && p.played >= 5 && p.spotOn >= p.played); return g ? { game: g.name } : null; } },
  { id: 'langs', test: (s) => (Array.isArray(s.langs) && s.langs.length >= 3 ? { n: s.langs.length } : null) },
  { id: 'everyday', test: (s, c) => { const sp = span(s, c.card, c.today); return sp.n >= 7 && s.days >= sp.n ? { n: whole(s.days) } : null; } },
  { id: 'summit', test: (s) => (s.words && s.words.highest >= 8 ? {} : null) },
  { id: 'allnine', test: (s) => { const daily = (s.per || []).filter((p) => p && !WORDGAME.test(String(p.id))); return daily.length >= 9 && daily.every((p) => p.played > 0) ? { n: 9 } : null; } },
  { id: 'firstweek', test: (s) => (typeof s.since === 'string' && s.since >= '2026-10-03' && s.since <= '2026-10-09' ? {} : null) },
  { id: 'games', test: (s) => (s.games >= 100 ? { n: whole(s.games) } : null) }
];
export function closingLine(stats, ctx) {
  for (const r of CLOSERS) { const vars = r.test(stats, ctx); if (vars) return { id: r.id, key: 'end_' + r.id, vars }; }
  return { id: 'thanks', key: 'end_thanks', vars: { n: whole(stats.days) } };
}

/* the screens, in swipe order. A screen is plain data; draw.js knows how to paint each id. */
export function buildScreens(stats, ctx) {
  const card = ctx.card, today = ctx.today, S = [];
  const days = whole(stats.days), games = whole(stats.games), spotOn = whole(stats.spotOn);
  S.push(Object.assign({ id: 'cover', logicer: stats.logicer, since: stats.since }, LOOK.cover));
  S.push(Object.assign({ id: 'days', days, games, longest: whole(stats.longest), heat: heat(stats, card, today) }, LOOK.days));
  if (spotOn > 0 && games > 0) {
    const pct = isFinite(stats.pct) && stats.pct >= 0 && stats.pct <= 100 ? Math.round(stats.pct) : Math.round((100 * spotOn) / games);
    const b = bestGame(stats.per);
    S.push(Object.assign({ id: 'spot', pct, spotOn, games, best: b ? { id: b.id, name: b.name, spotOn: whole(b.spotOn), played: whole(b.played), colour: colourOf(b.id) } : null }, LOOK.spot));
  }
  const w = stats.words;
  if (w && num(w.climbs) > 0) S.push(Object.assign({ id: 'words', climbs: whole(w.climbs), highest: Math.min(8, whole(w.highest)), perfect: whole(w.perfect) }, LOOK.words));
  const st = stats.story;
  if (st && num(st.chapters) > 0) {
    const votes = whole(st.votes), withWorld = Math.min(votes, whole(st.withWorld));
    S.push(Object.assign({ id: 'story', chapters: whole(st.chapters), votes, withWorld, pct: votes ? Math.round((100 * withWorld) / votes) : null }, LOOK.story));
  }
  const p = percentile(days, ctx.dist, card);
  if (p !== null) S.push(Object.assign({ id: 'percent', pct: p }, LOOK.percent));
  const line = closingLine(stats, ctx);
  S.push(Object.assign({ id: 'closing', line }, LOOK.closing));
  return S;
}
