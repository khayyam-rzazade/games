/* My Logicers, 11 Nov 2026: the "When" column of Results, in Node (no browser).
   node me/tests/when.test.mjs
   1. The helpers in me/words.js (whenDate, whenIso, fmtWhen) take the shapes a time can come in and give an empty cell, never "Invalid Date".
   2. The shapes the two Workers really send:
        - the Studio's: its REAL Worker (server/studio/src, over Node's SQLite, as its own tests run it) keeps answers with "keep answers" on and
          answers /game/answers; the rows go through the REAL me/api.js studioResults and then through the helpers.
        - the live Worker's (a made quiz): it runs on Durable Objects, so it cannot run here; the test reads its source for the row it sends
          ([name, points, time, right, of], the time a Date.now() written when the play came in) and checks that the helpers read that row.
   The browser side (the sheet, the CSV file, 320 px in six languages) is in manage.test.mjs (made quizzes) and studio.test.mjs (Studio games). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
process.env.TZ = 'Asia/Baku';                                       // the same clock on any machine
let pass = 0; const fails = [];
function check(name, ok, detail) { if (ok) { pass++; console.log('  ok  ', name); } else { fails.push(name + (detail !== undefined ? ' — ' + JSON.stringify(detail) : '')); console.log('  FAIL', name, detail !== undefined ? JSON.stringify(detail).slice(0, 300) : ''); } }

const { whenDate, whenIso, fmtWhen } = await import('../words.js');
const T0 = Date.UTC(2026, 10, 7, 9, 30, 4);                       // 7 Nov 2026, 09:30:04 UTC

console.log('the helpers');
check('milliseconds (what both Workers send)', whenIso(T0) === '2026-11-07T09:30:04Z');
check('seconds (an older shape)', whenIso(T0 / 1000) === '2026-11-07T09:30:04Z');
check('digits in a string', whenIso(String(T0)) === '2026-11-07T09:30:04Z' && whenIso(' ' + String(T0 / 1000) + ' ') === '2026-11-07T09:30:04Z');
check('ISO text: with Z, with an offset, without a zone (UTC), with a space (Safari)', whenIso('2026-11-07T09:30:04Z') === '2026-11-07T09:30:04Z' && whenIso('2026-11-07T11:30:04+02:00') === '2026-11-07T09:30:04Z'
  && whenIso('2026-11-07T09:30:04') === '2026-11-07T09:30:04Z' && whenIso('2026-11-07 09:30') === '2026-11-07T09:30:00Z' && whenIso('2026-11-07T09:30:04.123Z') === '2026-11-07T09:30:04Z');
check('no time, zero, negative, junk, too big, wrong type: an empty cell', [null, undefined, '', '  ', 0, -5, 'last week', 'NaN', NaN, Infinity, 1e18, {}, [], true].every((x) => whenIso(x) === '' && whenDate(x) === null));
check('the CSV time has no milliseconds and no spaces: 20 characters', whenIso(T0 + 999).length === 20 && !/\s/.test(whenIso(T0)));
const LOCALES = { en: 'en-GB', it: 'it-IT', tr: 'tr-TR', es: 'es-ES', pt: 'pt-BR', fr: 'fr-FR' };
for (const [l, loc] of Object.entries(LOCALES)) {
  const f = fmtWhen(new Date(T0), loc), g = fmtWhen(new Date(Date.UTC(2020, 0, 5, 23, 5)), loc);
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  check(`[${l}] a short date and a short time (24-hour), the full moment for hover`, f && /\b7\b/.test(f.d) && /^\d\d:\d\d$/.test(f.t) && f.full.length > f.d.length + 6 && !/2026/.test(f.d) === (new Date(T0).getFullYear() === new Date().getFullYear()), { f, tz });
  check(`[${l}] the year appears when it is not this year`, g && /2020/.test(g.d), g);
}
check('no date, no cell', fmtWhen(null) === null && fmtWhen(new Date('x')) === null && fmtWhen('2026') === null);

console.log('the Studio Worker, for real, through me/api.js');
const L = await import('../../server/studio/test/lib.mjs');
const e = L.env(), STUDIO = 'http://studio.test';
globalThis.location = { hostname: 'localhost', search: '' };
globalThis.window = { STUDIO_API: STUDIO, LIVE_SERVER: '', CHECKIN_API: '', FINDOUT_ROOM_API: '', FINDOUT_API: '' };
const asked = [];
globalThis.fetch = async (url, init) => {                          // the page's fetch, answered by the real Worker
  const p = String(url).replace(STUDIO, ''); const body = init && init.body ? JSON.parse(init.body) : undefined;
  asked.push(p);
  const r = await L.call(e, init && init.method ? init.method : 'GET', p, body);
  return new Response(r.text, { status: r.status, headers: { 'Content-Type': 'application/json' } });
};
const api = await import('../api.js');
const mk = await L.maker(e), g = await L.game(e, mk, { keep_answers: true, mode: 'open' });
const s = await L.save(e, g, { items: [L.pick('One'), L.pick('Two')] });
const [i1, i2] = s.json.items.map((x) => x.id);
const keep = (b) => L.call(e, 'POST', '/play/keep', Object.assign({ game: g.id }, b));
L.setNow(Date.UTC(2026, 10, 8, 9, 0, 0)); await keep({ item: i1, pid: 'pid-aaaa-0001', name: 'Leyla', answer: 1 });
L.setNow(Date.UTC(2026, 10, 8, 9, 5, 30)); await keep({ item: i2, pid: 'pid-aaaa-0001', name: 'Leyla', answer: 0 });
L.setNow(Date.UTC(2026, 10, 9, 20, 15, 0)); await keep({ item: i1, pid: 'pid-bbbb-0002', answer: 0 });
const raw = await L.call(e, 'POST', '/game/answers', { edit_key: g.edit_key });
check('the Worker sends rows as objects { item, n, pid, name, answer, time }, the time an integer in milliseconds', raw.json.rows.length === 3 && raw.json.rows.every((r) => Number.isInteger(r.time) && r.time > 1e12 && 'name' in r && 'answer' in r && 'n' in r), raw.json.rows);
const got = await api.studioResults({ code: mk.slug + '/' + g.slug, key: g.edit_key });
check('me/api.js hands the page the three rows with that time untouched', got.ok && got.rows.length === 3 && got.rows.every((r, i) => r.time === raw.json.rows[i].time), got);
check('the helpers give the exact moment each answer was kept (ISO, UTC)', got.rows.map((r) => whenIso(r.time)).join('|') === '2026-11-08T09:00:00Z|2026-11-08T09:05:30Z|2026-11-09T20:15:00Z', got.rows.map((r) => whenIso(r.time)));
check('and every row has a short date and time to show', got.rows.every((r) => { const f = fmtWhen(whenDate(r.time), 'en-GB'); return f && /^\d\d:\d\d$/.test(f.t); }));
const old = await api.studioResults({ code: mk.slug + '/' + g.slug, key: 'nokey-nokey-nokey-nokey-nokey' });
check('a key the Worker does not know is "gone", not an empty sheet', old.ok === false, old);

console.log('the live Worker (a made quiz), read from its source');
const kitFile = path.join(HERE, '../../server/live/src/kit.js');
if (fs.existsSync(kitFile)) {
  const src = fs.readFileSync(kitFile, 'utf8');
  check('a play is written with t = Date.now() when it comes in, and kept as the board row [id, name, pts, t, right, of, kh]', /const t = Date\.now\(\);[\s\S]{0,1500}this\.board\.push\(\[row\.id, name, sc\.pts, t, sc\.ok\[0\], sc\.ok\[1\], kh16\]\)/.test(src));
  check('/results sends each play as [name, pts, t, right, of] (the time third)', /plays: this\.board\.slice\(\)[^;]*\.map\(\(b\) => \[b\[1\], b\[2\], b\[3\], b\[4\], b\[5\]\]\)/.test(src));
  const play = ['Ana', 900, T0 + 1000, 3, 3];                      // such a row
  check('the helpers read such a row: its third value is the time', whenIso(play[2]) === '2026-11-07T09:30:05Z');
} else console.log('  (server/live/src/kit.js is not here: the live Worker\'s row is not read)');

console.log(`\n${pass} checks passed, ${fails.length} failed`);
if (fails.length) { console.log(fails.map((f) => ' - ' + f).join('\n')); process.exit(1); }
