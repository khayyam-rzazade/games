/* My Logicers: the page pulls what the other phones did (7 Nov 2026, after the Safari / Chrome report).
   node me/tests/pull.test.mjs      (ME_REAL=<folder with the real me-stats.js, me.js, me-passkey.js>, default assets/js of this site)
   The case: one code on two browsers. Browser A plays more games and syncs. Browser B opens My Logicers (or comes back to its tab)
   and must show them, with no game played on B and no sync that the test asks for. Before the fix B kept showing its old copy until a
   game finished on B or six hours passed. */
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
process.env.ME_REAL = process.env.ME_REAL || path.resolve(HERE, '../../assets/js');
const { start } = await import('./server.mjs');
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
let pass = 0; const fails = [];
function check(name, ok, detail) { if (ok) { pass++; console.log('  ok  ', name); } else { fails.push(name + (detail !== undefined ? ' — ' + JSON.stringify(detail) : '')); console.log('  FAIL', name, detail !== undefined ? JSON.stringify(detail) : ''); } }

const srv = await start(4192, { real: true });
const browser = await chromium.launch({ executablePath: process.env.ME_CHROME || '/usr/bin/google-chrome' });
const calls = () => srv.worker.log.filter((x) => x.p === '/sync').length;

async function phone(seed) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 640 }, isMobile: true, hasTouch: true, locale: 'en-GB' });
  await ctx.addInitScript((c) => {
    window.LOGICERS_ME_API = '/__me'; window.ME_API = '/__me';
    if (localStorage.getItem('lg.test.seeded')) return; localStorage.setItem('lg.test.seeded', '1');
    if (!c.games) return;
    const day = (iso) => Math.round(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / 864e5);
    const t = new Date(); const today = Math.round(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / 864e5);
    const nOf = (start) => today - day(start) + 1;
    const games = { '100-of-us': { results: {} }, 'same-energy': { results: {} } };
    for (let i = 0; i < 5; i++) games['100-of-us'].results[String(nOf('2026-10-03') - i)] = { g: 50, a: 50, id: 1 };
    for (let i = 0; i < 3; i++) games['same-energy'].results[String(nOf('2026-10-10') - i)] = { g: 30, y: 0, t: 'x', id: 1, l: 'it' };
    localStorage.setItem('turnsout:v1', JSON.stringify({ games, world: { logicer: { n: 2195, d: '20261003' } } }));
  }, { games: !!seed });
  const page = await ctx.newPage(); const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console ' + m.text()); });
  return { ctx, page, errors };
}
async function open(p, hash = '') { await p.page.goto(srv.url + '/me/' + (hash ? '#' + hash : '')); await p.page.waitForFunction(() => document.documentElement.dataset.ready); await p.page.waitForTimeout(500); }
const tile = (p, g) => p.page.locator('.me-tile[data-g="' + g + '"] .big').first().innerText();
const waitTile = async (p, g, not, ms = 6000) => { const t0 = Date.now(); let v = await tile(p, g); while (v === not && Date.now() - t0 < ms) { await p.page.waitForTimeout(200); v = await tile(p, g); } return v; };
/* what a game writes when it is finished: results for today and yesterday, then the phone syncs */
const play = (p, page, start, shape) => p.page.evaluate(async ({ page, start, shape }) => {
  const day = (iso) => Math.round(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / 864e5);
  const t = new Date(); const today = Math.round(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / 864e5);
  const s = JSON.parse(localStorage.getItem('turnsout:v1')); s.games[page] = s.games[page] || { results: {} };
  for (let i = 0; i < 2; i++) s.games[page].results[String(today - day(start) + 1 - i)] = Object.assign({}, shape);
  localStorage.setItem('turnsout:v1', JSON.stringify(s));
  return window.LogicersMe.sync();
}, { page, start, shape });

console.log('browser A (Safari in the report): plays, keeps a code');
const A = await phone(true); await open(A);
await A.page.getByRole('button', { name: 'Get your code' }).click(); await A.page.waitForTimeout(600);
await A.page.getByRole('button', { name: 'Keep', exact: true }).click(); await A.page.waitForTimeout(1500);
const code = await A.page.evaluate(() => (JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null));
check('A keeps a code', /^[a-z]+-[a-z]+-[a-z]+-[1-9]\d$/.test(code || ''), code);

console.log('browser B (Chrome in the report): types the code');
const B = await phone(false); await open(B, 'have');
await B.page.fill('input', code); await B.page.keyboard.press('Enter'); await B.page.waitForTimeout(2200);
check('B restores: Your Call has not been played yet ("–")', (await tile(B, 'call')) === '–', await tile(B, 'call'));

console.log('A plays Your Call and syncs');
const sa = await play(A, 'your-call', '2026-10-03', { c: 1, r: 1, id: 'c1' });
check('A synced (the server has Your Call)', sa && sa.ok === true && !!srv.worker.db.get(code).record.g.call, sa);

console.log('B opens My Logicers again, nothing else');
const n0 = calls();
await open(B);
const v1 = await waitTile(B, 'call', '–');
check('B shows Your Call after opening the page (the page pulled by itself)', v1 !== '–', v1);
check('B sent one sync on opening', calls() > n0, [n0, calls()]);

console.log('B stays on the page; A plays Every Beat; B comes back to the tab');
await play(A, 'every-beat', '2026-10-09', { g: 72, y: 12, t: 'x', id: 'v1', l: 'en' });
check('before coming back, B still shows the old copy', (await tile(B, 'every')) === '–', await tile(B, 'every'));
await B.page.evaluate(() => window.scrollTo(0, 120));
const y0 = await B.page.evaluate(() => window.scrollY);
await B.page.waitForTimeout(20500);                                          // the pull is not repeated within 20 s
await B.page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
const v2 = await waitTile(B, 'every', '–');
check('B shows Every Beat after coming back to the tab', v2 !== '–', v2);
check('the page did not jump: the scroll stayed where it was', Math.abs((await B.page.evaluate(() => window.scrollY)) - y0) < 4, [y0, await B.page.evaluate(() => window.scrollY)]);
check('the number at the top is still there (no flash back to zero)', /2,?195/.test(await B.page.locator('h1').first().innerText()), await B.page.locator('h1').first().innerText());

console.log('B on another screen: nothing is drawn over it');
await B.page.evaluate(() => { location.hash = '#pw'; });
await B.page.waitForTimeout(500);
await play(A, 'who-gets-what', '2026-10-08', { g: [400, 300, 300], y: 10, t: 'x', id: 'w1', l: 'en' });
await B.page.waitForTimeout(20500);
await B.page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
await B.page.waitForTimeout(1500);
check('the password screen is still the one shown', /#pw/.test(await B.page.evaluate(() => location.hash)) && (await B.page.locator('#me').innerText()).length > 0 && (await B.page.locator('.me-tile').count()) === 0);
await B.page.evaluate(() => { location.hash = ''; });
await B.page.waitForTimeout(700);
check('and back on home it shows Who Gets What', (await tile(B, 'gets')) !== '–', await tile(B, 'gets'));

check('no script errors on either page', A.errors.length === 0 && B.errors.length === 0, [A.errors, B.errors]);
await browser.close(); await srv.close();
console.log(`\n${pass} checks passed, ${fails.length} failed`);
if (fails.length) { console.log(fails.map((f) => ' - ' + f).join('\n')); process.exit(1); }
