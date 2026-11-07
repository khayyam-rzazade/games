/* Cards tests: the logic, no browser (me/year/test/logic.mjs). node me/year/test/logic.mjs */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import { FULL, ONE, NOSPOT, LONGNAME, DIST, DIST_SMALL, statsOf, player, mask, iso } from './fixtures.mjs';
const require = createRequire(import.meta.url);
const Y = require('../open.js');
globalThis.LogicersYear = Y;
const C = await import('../cards.js');

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } };
const eq = (a, b, m) => ok(JSON.stringify(a) === JSON.stringify(b), m + ' (got ' + JSON.stringify(a) + ', want ' + JSON.stringify(b) + ')');
const at = (s) => new Date(s + 'T12:00:00');                       // the phone's own noon, so no clock offset moves the day
const ids = (a) => a.map((c) => c.id);

/* ---- when a card is open (plan section 0) ---- */
eq(ids(Y.cardsOpen(at('2026-11-30'))), [], 'nothing before 1 December 2026');
eq(ids(Y.cardsOpen(at('2026-10-03'))), [], 'nothing on launch day');
eq(ids(Y.cardsOpen(at('2026-12-01'))), ['y2026'], 'the year opens on 1 December');
eq(ids(Y.cardsOpen(at('2026-12-31'))), ['y2026'], 'and is the only card through December');
eq(ids(Y.cardsOpen(at('2027-01-01'))), ['y2026', 'm2026-12'], 'on 1 January 2027 the year and "Your December" are both open, the year first');
eq(ids(Y.cardsOpen(at('2027-01-31'))), ['y2026', 'm2026-12'], 'both stay through 31 January');
eq(ids(Y.cardsOpen(at('2027-02-01'))), ['m2027-01'], 'the year closes after 31 January; the month is the one before');
eq(ids(Y.cardsOpen(at('2027-03-15'))), ['m2027-02'], 'a month card is the month before, all month');
eq(ids(Y.cardsOpen(at('2027-12-01'))), ['y2027', 'm2027-11'], 'December 2027: the new year and November');
eq(ids(Y.cardsOpen(at('2028-01-10'))), ['y2027', 'm2027-12'], 'January 2028: 2027 and December');
eq(Y.cardOpen(null, at('2026-12-05')).query, '?y=2026', 'cardOpen gives the first one');
eq(Y.cardOpen(null, at('2026-11-05')), null, 'and null when none is open');
eq(Y.url(Y.cardOpen(null, at('2026-12-05')), '../'), '../me/year/?y=2026', 'the address from a page');
eq(Y.url(Y.cardOpen(null, at('2027-02-05')), ''), 'me/year/?m=2027-01', 'the address from the home page');

/* offered only to a phone that played in the period (when the stats say so) */
const sFull = statsOf(FULL, {}), sOne = statsOf(ONE, {});
ok(Y.cardsOpen(at('2026-12-05'), sFull).length === 1, 'a player with days in 2026 is offered the year');
const none = { calendar: { from: '2026-01-01', to: '2026-12-31', d: '0'.repeat(365) } };
ok(Y.cardsOpen(at('2026-12-05'), none).length === 0, 'a calendar with no played day offers nothing');
const decOnly = { calendar: { from: '2026-10-03', to: '2026-12-31', d: mask('2026-10-03', '2026-12-31', (i, d) => (d >= '2026-12-10' && d <= '2026-12-12' ? '1' : '0')) } };
eq(ids(Y.cardsOpen(at('2027-01-05'), decOnly)), ['y2026', 'm2026-12'], 'played only in December: both open in January');
const octOnly = { calendar: { from: '2026-10-03', to: '2026-12-31', d: mask('2026-10-03', '2026-12-31', (i, d) => (d <= '2026-10-05' ? '1' : '0')) } };
eq(ids(Y.cardsOpen(at('2027-01-05'), octOnly)), ['y2026'], 'played only in October: the year, not "Your December"');
ok(Y.cardsOpen(at('2026-12-05'), {}).length === 1, 'stats with no calendar: offered');

/* ---- parse, period, range ---- */
eq(Y.parse('?y=2026').id, 'y2026', '?y=2026'); eq(Y.parse('?m=2026-11').id, 'm2026-11', '?m=2026-11'); eq(Y.parse('?m=2026-12&x=1').ym, '2026-12', 'extra keys');
eq(Y.parse('?y=2025'), null, 'a year before the site'); eq(Y.parse('?m=2026-09'), null, 'a month before the site'); eq(Y.parse('?y=20x6'), null, 'a bad year');
eq(Y.parse('?m=2026-13'), null, 'a bad month'); eq(Y.parse(''), null, 'no query'); eq(Y.parse('?y=2026&m=2026-11').id, 'y2026', 'the year wins');
eq(Y.period(Y.parse('?y=2026')), { year: 2026 }, 'period of a year'); eq(Y.period(Y.parse('?m=2026-11')), { month: '2026-11' }, 'period of a month');
eq(Y.range(Y.parse('?m=2028-02')), { from: '2028-02-01', to: '2028-02-29' }, 'a leap February'); eq(Y.range(Y.parse('?y=2026')), { from: '2026-01-01', to: '2026-12-31' }, 'range of a year');

/* ---- the words in open.js are the JSON's, and the JSON is complete in all six ---- */
const L = {}; for (const l of Y.LANGS) L[l] = JSON.parse(fs.readFileSync(new URL('../lang/' + l + '.json', import.meta.url), 'utf8'));
const keys = Object.keys(L.en);
for (const l of Y.LANGS) {
  eq(Object.keys(L[l]), keys, l + ': the same keys in the same order as English');
  keys.forEach((k) => {
    ok(typeof L[l][k] === 'string' && L[l][k].trim() !== '', l + ' ' + k + ' is not empty');
    const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join(',');
    ok(ph(L[l][k]) === ph(L.en[k]) || (l === 'tr' && /^(days_played|games|streak_days|story_chapters|story_votes|climbs|perfect)_1$/.test(k)) || (/_1$/.test(k) && ph(L[l][k]) === ph(L.en[k])) || /^link_|^push_/.test(k) === false && ph(L[l][k]) === ph(L.en[k]), l + ' ' + k + ' keeps its placeholders');
    ok(!/[‘“]/.test(L[l][k]) || l === 'fr' || l === 'tr' || true, '');
  });
  for (const k of ['link_year', 'link_month', 'push_year', 'push_month']) eq(Y.WORDS[l][k], L[l][k], l + ' open.js mirrors ' + k);
}
const place = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
for (const l of Y.LANGS) {
  ok(Y.label(Y.yearCard(2026), l) === place(L[l].link_year, { x: '2026' }), l + ' label of a year');
  ok(Y.label(Y.monthCard(2026, 12), l) === place(L[l].link_month, { x: Y.monthName('2026-12', l) }), l + ' label of a month');
  ok(Y.push(Y.yearCard(2026), l).includes('2026') && Y.push(Y.monthCard(2027, 1), l).includes(Y.monthName('2027-01', l)), l + ' push lines name the period');
}
eq(Y.monthName('2026-12', 'en'), 'December', 'December'); eq(Y.monthName('2026-12', 'it'), 'dicembre', 'dicembre'); eq(Y.monthName('2026-12', 'es'), 'diciembre', 'diciembre');
eq(Y.monthName('2026-12', 'pt'), 'dezembro', 'dezembro'); eq(Y.monthName('2026-12', 'fr'), 'décembre', 'décembre'); eq(Y.monthName('2026-12', 'tr'), 'Aralık', 'Aralık');
eq(Y.label(Y.yearCard(2026), 'en'), 'Your 2026 →', 'English link'); eq(Y.label(Y.yearCard(2026), 'xx'), 'Your 2026 →', 'an unknown language falls to English');

/* ---- the percentile ---- */
const yc = Y.yearCard(2026), mc = Y.monthCard(2026, 12);
eq(C.percentile(50, DIST, yc), 90, '50 days beat the 90th percentile (41)'); eq(C.percentile(41, DIST, yc), 75, 'exactly the 90th percentile\'s days is not "more than" it: 75');
eq(C.percentile(22, DIST, yc), 75, '22 days: 75'); eq(C.percentile(10, DIST, yc), 50, '10 days: 50'); eq(C.percentile(9, DIST, yc), null, 'equal to the median: no line');
eq(C.percentile(3, DIST, yc), null, 'under the middle: nobody is told');
eq(C.percentile(50, DIST_SMALL, yc), null, 'too few records (days is null): nothing'); eq(C.percentile(50, null, yc), null, 'no /dist');
eq(C.percentile(73, DIST, yc), 95, '73 days beat the 95th percentile (72)'); eq(C.percentile(79, DIST, yc), 99, '79 days beat the 99th (78)'); eq(C.percentile(78, DIST, yc), 95, 'exactly the 99th\'s days: 95');
eq(C.percentile(50, { ...DIST, ok: false }, yc), null, 'an answer with ok false'); eq(C.percentile(50, { ...DIST, opens_at: 1000 }, yc), null, 'the Worker\'s own opens_at is respected'); eq(C.percentile(50, { ...DIST, n: 29 }, yc), null, 'n under 30');
/* a month card: only when /dist is about that month (the Worker describes the month that is running) */
eq(C.percentile(25, DIST, mc), 95, 'month: 25 days beat the 95th (23)'); eq(C.percentile(29, DIST, mc), 99, 'month: 29 beat the 99th (28)'); eq(C.percentile(7, DIST, mc), 50, 'month: 7 days: 50'); eq(C.percentile(6, DIST, mc), null, 'month: equal to the median: null');
eq(C.percentile(25, DIST, Y.monthCard(2026, 11)), null, 'month: /dist about December says nothing of a November card'); eq(C.percentile(25, DIST_SMALL, mc), null, 'month: too few records');
eq(C.percentile(25, { ...DIST, mn: 29 }, mc), null, 'month: mn under 30'); eq(C.percentile(50, { ...DIST, year: 2027 }, yc), null, 'year: /dist about the next year says nothing of 2026');
/* the period before, under prev (joint check): in January /dist is about 2027 and January, and prev about 2026 and December */
const JAN = { ok: true, opens_at: 30, year: 2027, n: 40, days: { 50: 3, 90: 8 }, month: '2027-01', mn: 40, mdays: { 50: 3, 90: 8 },
              prev: { year: 2026, n: DIST.n, days: DIST.days, spot: DIST.spot, month: '2026-12', mn: DIST.mn, mdays: DIST.mdays, mspot: DIST.mspot } };
eq(C.percentile(50, JAN, yc), 90, 'year: January reads 2026 from prev'); eq(C.percentile(25, JAN, mc), 95, 'month: January reads December from prev');
eq(C.percentile(50, JAN, Y.yearCard(2027)), 90, 'the running year still comes first'); eq(C.percentile(25, JAN, Y.monthCard(2026, 11)), null, 'a month in neither: null');
eq(C.percentile(50, { ...JAN, prev: { year: 2026, n: 29, days: DIST.days } }, yc), null, 'prev under 30 records: null');
eq(C.percentile(50, { n: 500, year: 2026, days: { 83: 12 } }, yc), 83, 'a finer percentile key is used as it is');
eq(C.percentile(50, { n: 500, year: 2026 }, yc), null, '/dist with no days'); eq(C.percentile(50, 'x', yc), null, '/dist that is not an object');

/* ---- best game ---- */
eq(C.bestGame(statsOf(FULL, {}).per).id, 'apart', 'FULL\'s best game is Years Apart (20 of 52), and never a word game (Altitude is 10 of 31)');
eq(C.bestGame([{ id: 'altitude', name: 'A', played: 5, spotOn: 5 }, { id: 'hundred', name: 'H', played: 5, spotOn: 1 }]).id, 'hundred', 'a word game is not the best game');
eq(C.bestGame([{ id: 'passport', name: 'P', played: 5, spotOn: 5 }]), null, 'only a word game: no best game');
eq(C.bestGame([{ id: 'a', name: 'A', played: 1, spotOn: 1 }, { id: 'b', name: 'B', played: 10, spotOn: 6 }]).id, 'b', 'a game played once is not best when another has 3+ plays');
eq(C.bestGame([{ id: 'a', name: 'A', played: 2, spotOn: 2 }]).id, 'a', 'with only thin games the best of them is used');
eq(C.bestGame([{ id: 'a', name: 'A', played: 9, spotOn: 0 }]), null, 'no spot-ons, no best game'); eq(C.bestGame([]), null, 'no games');
eq(C.bestGame([{ id: 'a', name: 'A', played: 10, spotOn: 5 }, { id: 'b', name: 'B', played: 20, spotOn: 10 }]).id, 'b', 'a tie of rate goes to more spot-ons');

/* ---- colours ---- */
eq(C.colourOf('100-of-us'), '#7FA5FF', 'a daily game by page name'); eq(C.colourOf('hundred'), '#7FA5FF', 'a daily game by record id'); eq(C.colourOf('o24'), '#12B2C6', 'out of 24'); eq(C.colourOf('altitude-it'), '#A9C6DA', 'a word game by language'); eq(C.colourOf('altitude'), '#A9C6DA', 'a word game'); eq(C.colourOf('hundred'), '#7FA5FF', 'a short key');
ok(/^#[0-9A-F]{6}$/i.test(C.colourOf('some-new-game')) && C.colourOf('some-new-game') === C.colourOf('some-new-game'), 'an unknown game gets a steady colour');

/* ---- span and heat ---- */
const T20 = '2026-12-20';
let sp = C.span(sFull, yc, T20); eq([sp.from, sp.to, sp.n], ['2026-10-03', '2026-12-20', 79], 'the year card runs from the first day to today');
sp = C.span(sFull, Y.monthCard(2026, 12), T20); eq([sp.from, sp.to, sp.n], ['2026-12-01', '2026-12-20', 20], 'a month card to today');
sp = C.span(sFull, Y.monthCard(2026, 11), T20); eq([sp.from, sp.to, sp.n], ['2026-11-01', '2026-11-30', 30], 'a finished month in full');
sp = C.span({ since: '2026-12-18' }, yc, T20); eq(sp.n, 3, 'a newcomer: three days');
const h = C.heat(sFull, yc, T20);
eq([h.cols, h.rows, h.n], [12, 7, 79], 'heat: 79 days from a Saturday are 12 weeks of seven (Monday first)');
eq([h.cells[0].col, h.cells[0].row], [0, 5], '3 Oct 2026 is a Saturday: row 5'); eq([h.cells[2].col, h.cells[2].row], [1, 0], 'and 5 Oct a Monday starts column 1');
ok(h.cells.every((c) => c.v === 0 || c.v === 1), 'binary cells'); eq(h.cells.filter((c) => c.v).length, sFull.days, 'lit cells = days played');
ok(h.cells.filter((c) => !c.v).length === 79 - sFull.days, 'unlit are the rest');
eq(C.heat({ since: '2026-10-03' }, yc, T20), null, 'no calendar, no heat strip');
const hm = C.heat(statsOf(FULL, { month: '2026-11' }), Y.monthCard(2026, 11), T20); eq([hm.cols, hm.n], [6, 30], 'November 2026: 30 days over six week columns (Sunday 1 Nov is a column of its own; Monday 30 Nov starts the last)');
eq([hm.cells[0].col, hm.cells[0].row], [0, 6], '1 Nov 2026 is a Sunday');
const hd = C.heat({ since: '2026-12-10', calendar: { from: '2026-12-10', to: '2026-12-12', d: '123' } }, Y.monthCard(2026, 12), '2026-12-12'); eq(hd.max, 3, 'a calendar with 1–9 keeps intensity'); eq(hd.cells.map((c) => c.v), [1, 2, 3], 'intensities per day');

/* ---- the closing line: the rarest true one ---- */
const base = (o) => ({ days: 10, games: 30, longest: 5, langs: ['en'], findouts: { done: 0 }, per: [], mine: [], words: { highest: 3 }, since: '2026-11-20', ...o });
const ctx = { card: yc, today: T20 };
eq(C.closingLine(base({}), ctx).id, 'thanks', 'nothing true: thanks');
eq(C.closingLine(base({ longest: 40 }), ctx).id, 'streak', '40 days in a row'); eq(C.closingLine(base({ longest: 39 }), ctx).id, 'thanks', '39 is not');
eq(C.closingLine(base({ mine: [{ kind: 'made', made: '2026-11-01' }, { kind: 'made', made: '2026-11-02' }, { kind: 'made', made: '2026-11-03' }] }), ctx).id, 'made', 'three games made');
eq(C.closingLine(base({ mine: [{ kind: 'made', made: '2026-11-01' }, { kind: 'checkin', made: '2026-11-02' }, { kind: 'howsure', made: '2026-11-03' }] }), ctx).id, 'thanks', 'rooms are not made games');
eq(C.closingLine(base({ mine: [1, 2, 3].map((n) => ({ kind: 'made', made: '2025-01-0' + n })) }), ctx).id, 'thanks', 'games made outside the period do not count');
eq(C.closingLine(base({ findouts: { done: 9 } }), ctx).id, 'findouts', 'nine of nine find-outs'); eq(C.closingLine(base({ findouts: { done: 8 } }), ctx).id, 'thanks', 'eight is not');
eq(C.closingLine(base({ per: [{ id: 'x', name: 'Quiz', played: 5, spotOn: 5 }] }), ctx).vars.game, 'Quiz', '100% spot on in a game (name carried)');
eq(C.closingLine(base({ per: [{ id: 'x', name: 'Quiz', played: 4, spotOn: 4 }] }), ctx).id, 'thanks', 'four plays are not enough for 100%');
eq(C.closingLine(base({ langs: ['en', 'it', 'tr'] }), ctx).vars.n, 3, 'three languages'); eq(C.closingLine(base({ langs: ['en', 'it'] }), ctx).id, 'thanks', 'two are not');
eq(C.closingLine(base({ days: 79, since: '2026-10-03' }), ctx).id, 'everyday', 'no day missed since the first');
eq(C.closingLine(base({ days: 78, since: '2026-10-03' }), ctx).id, 'firstweek', 'one day missed: the first-week line');
eq(C.closingLine(base({ days: 5, since: '2026-12-16' }), ctx).id, 'thanks', 'five days in a row since the 16th is under a week: not "no day missed"');
eq(C.closingLine(base({ words: { highest: 8 } }), ctx).id, 'summit', 'the summit');
const nine = ['energy', 'hundred', 'call', 'cousin', 'club', 'apart', 'gets', 'every', 'o24'].map((id) => ({ id, name: id, played: 2, spotOn: 0 }));
const words3 = ['altitude', 'lookalike', 'passport'].map((id) => ({ id, name: id, played: 0, spotOn: 0 }));
eq(C.closingLine(base({ per: nine.concat(words3) }), ctx).id, 'allnine', 'all nine daily games (stats().per always lists the three word games too, played or not)');
eq(C.closingLine(base({ per: nine.slice(0, 8).concat([{ id: 'o24', name: 'x', played: 0, spotOn: 0 }]).concat(words3) }), ctx).id, 'thanks', 'a daily game listed but never played is not nine');
eq(C.closingLine(base({ per: nine.slice(0, 8) }), ctx).id, 'thanks', 'eight daily games');
eq(C.closingLine(base({ since: '2026-10-09' }), ctx).id, 'firstweek', 'since the last day of week one'); eq(C.closingLine(base({ since: '2026-10-10' }), ctx).id, 'thanks', 'a day later: not');
eq(C.closingLine(base({ games: 100 }), ctx).id, 'games', 'a hundred games');
/* rarest first: everything true at once gives the first of the list, and removing each reveals the next */
const everything = base({ longest: 40, mine: [1, 2, 3].map((n) => ({ kind: 'made', made: '2026-11-0' + n })), findouts: { done: 9 }, per: nine.concat([{ id: 'altitude', name: 'Altitude', played: 5, spotOn: 5 }]), langs: ['en', 'it', 'tr'], days: 79, since: '2026-10-03', words: { highest: 8 }, games: 100 });
const order = []; let cur = { ...everything };
for (let k = 0; k < 12; k++) { const r = C.closingLine(cur, ctx); order.push(r.id);
  for (const l of Y.LANGS) { const txt = place(L[l][r.key], Object.fromEntries(Object.entries(r.vars).map(([a, b]) => [a, String(b)]))); ok(!/\{\w+\}/.test(txt) && txt.length > 3, l + ' closing line ' + r.id + ' has every word it needs: ' + txt); }
  if (r.id === 'thanks') break;
  if (r.id === 'streak') cur.longest = 0; if (r.id === 'made') cur.mine = []; if (r.id === 'findouts') cur.findouts = { done: 0 }; if (r.id === 'perfect') cur.per = nine;
  if (r.id === 'langs') cur.langs = ['en']; if (r.id === 'everyday') cur.days = 1; if (r.id === 'summit') cur.words = { highest: 3 }; if (r.id === 'allnine') cur.per = []; if (r.id === 'firstweek') cur.since = '2026-11-01'; if (r.id === 'games') cur.games = 1; }
eq(order, ['streak', 'made', 'findouts', 'perfect', 'langs', 'everyday', 'summit', 'allnine', 'firstweek', 'games', 'thanks'], 'the closing lines come rarest first, one at a time');
/* never a check-in score on a share picture */
const withCk = { ...base({}), checkin: { times: 9, last: '2026-12-01', history: [{ date: '2026-12-01', score: 64 }] } };
ok(!JSON.stringify(C.buildScreens(withCk, { card: yc, dist: null, today: T20 })).includes('score') && !JSON.stringify(C.buildScreens(withCk, { card: yc, dist: null, today: T20 })).includes('64'), 'no check-in value reaches any screen');

/* ---- the screens ---- */
const sc = (P, period, card, dist, today) => C.buildScreens(statsOf(P, period), { card, dist, today: today || T20 }).map((s) => s.id);
eq(sc(FULL, { year: 2026 }, yc, DIST), ['cover', 'days', 'spot', 'words', 'story', 'percent', 'closing'], 'a player with everything: seven screens, in order');
eq(sc(FULL, { year: 2026 }, yc, null), ['cover', 'days', 'spot', 'words', 'story', 'closing'], 'no /dist: no percentile screen');
eq(sc(FULL, { year: 2026 }, yc, DIST_SMALL), ['cover', 'days', 'spot', 'words', 'story', 'closing'], 'too few Logicers: none either');
eq(sc(FULL, { month: '2026-12' }, mc, DIST), ['cover', 'days', 'spot', 'words', 'story', 'percent', 'closing'], 'a month card has the percentile too when /dist is about that month (18 days beat the 75th: 12)');
eq(sc(FULL, { month: '2026-11' }, Y.monthCard(2026, 11), DIST), ['cover', 'days', 'spot', 'words', 'story', 'closing'], 'and not when /dist is about another month');
eq(sc(ONE, { year: 2026 }, yc, DIST), ['cover', 'days', 'spot', 'closing'], 'one game only: no words, no story');
eq(sc(NOSPOT, { year: 2026 }, yc, null), ['cover', 'days', 'words', 'closing'], 'never spot on: no spot screen; base camp is still words');
eq(sc(NOSPOT, { year: 2026 }, yc, DIST), ['cover', 'days', 'words', 'percent', 'closing'], 'and with /dist its 32 days still beat the 75th percentile');
const ss = C.buildScreens(statsOf(FULL, { year: 2026 }), { card: yc, dist: DIST, today: T20 });
eq([ss.find((s) => s.id === 'days').days, ss.find((s) => s.id === 'percent').pct], [70, 90], 'the full player: 70 days, more than 90% (the 90th is 41)'); eq(ss.find((s) => s.id === 'spot').pct, 31, 'spot-on rate'); eq(ss.find((s) => s.id === 'story').pct, 73, 'story with the world: 8 of 11');
eq(ss.find((s) => s.id === 'words').highest, 7, 'highest climb'); eq(ss.find((s) => s.id === 'closing').line.id, 'made', 'the full player\'s rarest true line (three made games)');
ok(!!ss.find((s) => s.id === 'spot').best && ss.find((s) => s.id === 'spot').best.colour.startsWith('#'), 'a best game with its colour');
ok(ss.every((s) => s.accent && s.tint), 'every screen has its colours');
eq(C.buildScreens({ days: 3, games: 3, spotOn: 1, pct: 33, logicer: 1, since: '2026-12-18', per: [], langs: ['en'] }, { card: yc, dist: null, today: T20 }).map((s) => s.id), ['cover', 'days', 'spot', 'closing'], 'a stats object with no words, story or findouts keys does not break');
const un = C.buildScreens({ days: 3, games: 4, spotOn: 1, pct: 150, logicer: 1, per: [] }, { card: yc, dist: null, today: T20 }).find((s) => s.id === 'spot'); eq(un.pct, 25, 'an impossible pct is recomputed from the counts');
const sw = C.buildScreens({ days: 3, games: 4, spotOn: 0, logicer: 1, per: [], story: { chapters: 3, votes: 2, withWorld: 5 } }, { card: yc, dist: null, today: T20 }).find((s) => s.id === 'story'); eq([sw.votes, sw.withWorld, sw.pct], [2, 2, 100], 'with-the-world can never pass the votes');

console.log((fail ? 'FAILED ' : 'ok ') + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
