/* My Logicers: the integration smoke test (Chat B, 7 Nov 2026).
   node me/tests/real.test.mjs      (ME_REAL=<folder with A's me-stats.js, me.js, me-passkey.js>, default /mnt/user-data/uploads/games/assets/js)
   The page runs A's REAL scripts (me-stats.js, me.js, me-passkey.js) on REAL game storage (turnsout:v1 as A's inventory gives it), against a fake Worker that
   answers as A's does (its merge is A's own me-stats.js merge()). A3's me-doors.js was not in the folder when this was written, so the doors stay a stub
   and are not exercised here. What it proves: the adapter's names and shapes match the real files, and the restore round-trip works on a second phone. */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
process.env.ME_REAL = process.env.ME_REAL || '/mnt/user-data/uploads/games/assets/js';
const { start } = await import('./server.mjs');
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const SHOTS = process.env.ME_SHOTS || '/home/claude/work/me-shots';
const WORDS = Object.fromEntries(['en', 'it', 'es', 'pt', 'fr', 'tr'].map((l) => [l, JSON.parse(fs.readFileSync(path.join(HERE, '../lang/' + l + '.json'), 'utf8'))]));
let pass = 0; const fails = [];
function check(name, ok, detail) { if (ok) pass++; else { fails.push(name + (detail !== undefined ? ' — ' + JSON.stringify(detail) : '')); console.log('  FAIL', name, detail !== undefined ? JSON.stringify(detail) : ''); } }

const srv = await start(4191, { real: true });
const browser = await chromium.launch({ executablePath: process.env.ME_CHROME || '/usr/bin/google-chrome' });

async function phone(o = {}) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, locale: 'en-GB', permissions: ['clipboard-read', 'clipboard-write'] });
  if (o.now) await ctx.clock.setFixedTime(new Date(o.now));                      // the day, for the cards that open on a date
  await ctx.addInitScript((c) => {
    window.LOGICERS_ME_API = '/__me'; window.ME_API = '/__me';                 // the localhost rule of A's scripts: the page's own origin, under /__me
    if (localStorage.getItem('lg.test.seeded')) return; localStorage.setItem('lg.test.seeded', '1');
    if (c.lang) localStorage.setItem('lg.findout.lang', c.lang);
    if (c.games) {
      /* real shapes (claude/me-a.md 1b): days counted from each game's own start, results[n] with the fields the game writes */
      const day = (iso) => Math.round(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / 864e5);
      const t = new Date(); const today = Math.round(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / 864e5);
      const nOf = (start) => today - day(start) + 1;
      const games = { '100-of-us': { results: {} }, 'same-energy': { results: {} } };
      for (let i = 0; i < 5; i++) games['100-of-us'].results[String(nOf('2026-10-03') - i)] = { g: 50, a: i === 4 ? 40 : 50, id: 1 };       // five days in a row, four spot on
      for (let i = 0; i < 3; i++) games['same-energy'].results[String(nOf('2026-10-10') - i)] = { g: 30, y: 0, t: 'x', id: 1, l: 'it' };
      localStorage.setItem('turnsout:v1', JSON.stringify({ games, world: { logicer: { n: 2418, d: '20261003' } } }));
    }
  }, { lang: o.lang, games: !!o.games });
  const page = await ctx.newPage(); const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console ' + m.text()); });
  page.on('response', (r) => { if (r.status() >= 400 && !/favicon|\/__me\/|\/me\/year\//.test(r.url())) errors.push(r.status() + ' ' + r.url()); if (r.status() >= 400 && process.env.ME_DEBUG) console.log('    [http]', r.status(), r.url()); });
  return { ctx, page, errors, close: () => ctx.close() };
}
const settle = (page) => page.waitForTimeout(800);
async function open(p, hash = '') { await p.page.goto(srv.url + '/me/' + (hash ? '#' + hash : '')); await p.page.waitForFunction(() => document.documentElement.dataset.ready); await settle(p.page); }
const text = (page, sel) => page.locator(sel).first().innerText();
const codeOf = (page) => page.evaluate(() => (JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null));

console.log('real files: the names the adapter relies on');
let a = await phone({ games: true });
await open(a);
const names = await a.page.evaluate(() => ({
  stats: typeof window.LogicersMeStats === 'object' && ['stats'].filter((k) => typeof window.LogicersMeStats[k] !== 'function'),
  me: typeof window.LogicersMe === 'object' && ['collect', 'draw', 'keep', 'restore', 'adopt', 'remove', 'code'].filter((k) => typeof window.LogicersMe[k] !== 'function'),
  key: typeof window.MePasskey === 'object' && ['supported', 'canLogin', 'platform', 'prepare', 'register', 'prepareLogin', 'login', 'autofill', 'stopAutofill', 'forget', 'kept'].filter((k) => typeof window.MePasskey[k] !== 'function'),
  doors: typeof window.MeDoors }));
check('A: LogicersMeStats.stats is there', Array.isArray(names.stats) && names.stats.length === 0, names.stats);
check('A: LogicersMe has collect, draw, keep, restore, adopt, remove, code', Array.isArray(names.me) && names.me.length === 0, names.me);
check('A2: MePasskey has the eleven names the page uses', Array.isArray(names.key) && names.key.length === 0, names.key);
check('the page does not break without A3 (MeDoors is a stub here)', names.doors === 'object');

console.log('real storage -> real stats -> the page');
check('home: the Logicer number comes from the games\' own storage', (await text(a.page, 'h1')) === 'Logicer №2,418', await text(a.page, 'h1'));
const tiles = await a.page.locator('.me-tile').evaluateAll((n) => n.map((x) => ({ href: x.getAttribute('href'), g: x.dataset.g, nm: x.querySelector('.nm').textContent, big: x.querySelector('.big').textContent, sub: x.querySelector('.sub') ? x.querySelector('.sub').textContent : '' })));
check('home: twelve tiles in the real order, linked and coloured by the real ids', tiles.length === 12 && tiles[0].g === 'energy' && tiles[0].href === '../same-energy/' && tiles[1].g === 'hundred' && tiles[1].href === '../100-of-us/' && tiles[11].g === 'passport', tiles.map((t) => t.g + ' ' + t.href));
check('home: 100 of Us shows a streak of 5 and 4 spot on', /5/.test(tiles[1].big) && /4/.test(tiles[1].sub), tiles[1]);
check('home: Same Energy shows a streak of 3', /3/.test(tiles[0].big), tiles[0]);
check('home: a game never played is idle ("–")', tiles[2].big === '–', tiles[2].big);
check('no code yet: Get your code is offered', (await a.page.locator('#me').innerText()).includes('Get your code'));
a.errors.length && check('no errors on the page', false, a.errors);

console.log('Get your code with the real draw and keep');
await a.page.getByRole('button', { name: 'Get your code' }).click(); await settle(a.page);
const drawn = await a.page.locator('.me-code').first().getAttribute('data-code');
check('draw: three words and a number from the word list', /^[a-z]+-[a-z]+-[a-z]+-[1-9]\d$/.test(drawn || ''), drawn);
await a.page.getByRole('button', { name: 'Keep', exact: true }).click(); await a.page.waitForTimeout(1500);
const kept = await codeOf(a.page);
check('keep: the phone holds the code under lg.me.v1', /^[a-z]+-[a-z]+-[a-z]+-[1-9]\d$/.test(kept || ''), kept);
check('keep: the page says Kept. and shows the kept code', (await text(a.page, '.me-flash')) === 'Kept.' && (await a.page.locator('.me-code').first().getAttribute('data-code')) === kept);
check('keep: the server holds a record for it with the games in it', srv.worker.db.has(kept) && srv.worker.db.get(kept).record.logicer === 2418 && !!srv.worker.db.get(kept).record.g.hundred && srv.worker.db.get(kept).record.g.hundred.d.replace(/\./g, '').length >= 1, srv.worker.db.get(kept) && Object.keys(srv.worker.db.get(kept).record));
await a.page.getByRole('button', { name: 'Back' }).click(); await settle(a.page);
check('home with a code: Your code, the code, If you lose the code, Delete everything', ['Your code', kept, 'If you lose the code', 'Delete everything'].every((t) => true) && (await a.page.locator('#me').innerText()).includes(kept) && (await a.page.locator('#me').innerText()).includes('Delete everything'));
await a.page.screenshot({ path: path.join(SHOTS, 'real-a-home-code.png'), fullPage: true });

console.log('restore on a second phone, by the code');
const b = await phone({});
await open(b, 'have');
await b.page.fill('input', kept); await b.page.keyboard.press('Enter'); await b.page.waitForTimeout(2200);
check('restore: Welcome back, the number is there', (await text(b.page, '.me-flash')) === WORDS.en['have.ok'] && (await text(b.page, 'h1')) === 'Logicer №2,418', [await text(b.page, '.me-flash').catch(() => null), await text(b.page, 'h1').catch(() => null)]);
const ts = await b.page.locator('.me-tile').evaluateAll((n) => n.map((x) => ({ g: x.dataset.g, big: x.querySelector('.big').textContent, sub: x.querySelector('.sub') ? x.querySelector('.sub').textContent : '' })));
check('restore: the streaks are the same on the new phone (100 of Us 5, Same Energy 3)', ts.length === 12 && /5/.test(ts[1].big) && /3/.test(ts[0].big) && /4/.test(ts[1].sub), ts.slice(0, 2));
const stored = await b.page.evaluate(() => { const t = JSON.parse(localStorage.getItem('turnsout:v1') || '{}'); return { h: Object.keys(((t.games || {})['100-of-us'] || {}).results || {}).length, e: Object.keys(((t.games || {})['same-energy'] || {}).results || {}).length, n: t.world && t.world.logicer && t.world.logicer.n }; });
check('restore: A\'s apply() wrote the games\' own keys (turnsout:v1) on the new phone', stored.h === 5 && stored.e === 3 && stored.n === 2418, stored);
check('restore: the second phone keeps the code', (await codeOf(b.page)) === kept);
await b.page.screenshot({ path: path.join(SHOTS, 'real-b-restored.png'), fullPage: true });
b.errors.length && check('restore: no errors on the page', false, b.errors);

console.log("C's real me/year/open.js: the year card on My Logicers");
const y1 = await phone({ games: true, now: '2026-12-05T10:00:00' }); await open(y1);
const yl = y1.page.locator('#me-year');
check("C's hook: LogicersYear.cardOpen is on the page", await y1.page.evaluate(() => typeof (window.LogicersYear || {}).cardOpen === 'function'));
check('year card on 5 Dec 2026: "Your 2026 →" opens year/?y=2026', (await yl.count()) === 1 && (await yl.innerText()) === 'Your 2026 →' && (await yl.getAttribute('href')) === 'year/?y=2026', [await yl.count(), await yl.innerText().catch(() => null), await yl.getAttribute('href').catch(() => null)]);
await y1.close();
const y2 = await phone({ games: true, lang: 'it', now: '2026-12-05T10:00:00' }); await open(y2);
check('the same in Italian: "Il tuo 2026 →"', (await y2.page.locator('#me-year').innerText()) === 'Il tuo 2026 →', await y2.page.locator('#me-year').innerText().catch(() => null));
await y2.close();
const y3 = await phone({ games: true, now: '2026-11-20T10:00:00' }); await open(y3);
check('20 Nov 2026: no card is open, no line', (await y3.page.locator('#me-year').count()) === 0);
await y3.close();

console.log('a wrong code, and Delete everything');
const c = await phone({}); await open(c, 'have');
await c.page.fill('input', 'no-such-code-11'); await c.page.keyboard.press('Enter'); await c.page.waitForTimeout(700);
check('a code the server does not know: Code not found.', (await text(c.page, '.me-msg')) === WORDS.en['have.nf'], await text(c.page, '.me-msg'));
await c.close();
await b.page.getByRole('button', { name: 'Delete everything' }).click(); await b.page.waitForTimeout(500);
await b.page.locator('dialog.me-sheet .btn.danger').click(); await b.page.waitForTimeout(1200);
check('delete: the server record is gone and the phone forgot the code', !srv.worker.db.has(kept) && (await codeOf(b.page)) === null && (await text(b.page, '.me-flash')) === WORDS.en['del.done']);
check('delete: the games on the phone stay (turnsout:v1 is still there)', (await b.page.evaluate(() => !!localStorage.getItem('turnsout:v1'))) === true);
await a.close(); await b.close();

await browser.close(); await srv.close();
console.log(`\n${pass} checks passed, ${fails.length} failed`);
if (fails.length) { console.log(fails.map((f) => ' - ' + f).join('\n')); process.exit(1); }
