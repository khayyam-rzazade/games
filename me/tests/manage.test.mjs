/* My Logicers, 7 Nov 2026: Your games as a manager (numbers from each game's own server, Results + CSV, Share, Remove, Delete),
   Exit and "Use another code", the instant sync on a game page, the Me chip in the header, the strip's arrows and the wide screen.
   node me/tests/manage.test.mjs      (ME_REAL=<folder with the real me-stats.js, me.js, me-passkey.js>, default assets/js of this site)
   The made games, check-in groups, How Sure games and find-outs rooms live on three other Workers; here one stand-in answers for
   all three, the way their real routes do (server/live kitCall + peek, server/checkin host routes, server/findout-room GET). */
import { createRequire } from 'node:module';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
process.env.ME_REAL = process.env.ME_REAL || path.resolve(HERE, '../../assets/js');
const { start } = await import('./server.mjs');
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const SHOTS = process.env.ME_SHOTS || '/home/claude/work/me-shots';
fs.mkdirSync(SHOTS, { recursive: true });
let pass = 0; const fails = [];
function check(name, ok, detail) { if (ok) { pass++; console.log('  ok  ', name); } else { fails.push(name + (detail !== undefined ? ' — ' + JSON.stringify(detail) : '')); console.log('  FAIL', name, detail !== undefined ? JSON.stringify(detail).slice(0, 300) : ''); } }

/* ---------- the stand-in of the live, check-in and find-outs-room Workers ---------- */
const calls = [];
const KITS = { BCDFGHJ: { edit: 'ek1', title: 'Exam 3', mode: 'alone', plays: 12, until: '2027-01-06' }, KLMNPQR: { edit: 'ek2', title: 'Live only', mode: 'live', plays: 0, until: '2027-01-02' } };
const PLAYS = [['Ana', 900, Date.UTC(2026, 10, 7, 9, 30), 3, 3], ['Bo, "the" best', 700, Date.UTC(2026, 10, 7, 10), 2, 3], ['Cem', 900, Date.UTC(2026, 10, 7, 11), 3, 3]];
const stand = http.createServer((req, res) => {
  let body = '';
  req.on('data', (c) => { body += c; });
  req.on('end', () => {
    const p = new URL(req.url, 'http://x').pathname; let b = {}; try { b = JSON.parse(body || '{}'); } catch (e) { b = {}; }
    const send = (st, o) => { res.writeHead(st, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' }); res.end(JSON.stringify(o)); };
    if (req.method === 'OPTIONS') return send(204, {});
    calls.push({ m: req.method, p, b });
    let m;
    if ((m = /^\/kit\/([A-Z]{7})\/(open|results|delete)$/.exec(p))) {
      const k = KITS[m[1]]; if (!k) return send(404, { ok: false, e: 'gone' });
      if (b.edit !== k.edit) return send(403, { ok: false, e: 'key' });
      if (m[2] === 'open') return send(200, { ok: true, kit: { title: k.title, mode: k.mode, qs: [1, 2, 3] }, plays: k.plays, until: k.until, saved: 1, made: 1 });
      if (m[2] === 'results') return send(200, { ok: true, plays: PLAYS, typed: [] });
      delete KITS[m[1]]; return send(200, { ok: true });
    }
    if ((m = /^\/host\/(BCDFGH[0-9a-f]{32})$/.exec(p))) return send(200, { ok: true, code: 'BCDFGH', rounds: [{ people: 5 }, { people: 7 }], current: null, join: 'https://logicers.com/checkin/room/#BCDFGH', until: '2027-01-09' });
    if (p === '/room/BCDFGH/host') return send(200, { ok: true });
    if (p === '/game/HSURE1') return send(200, { np: 18, ph: 'q' });
    if (p === '/room/FOUT99') return send(200, { ok: true, state: { step: 'lobby', joined: 9 } });
    if (p === '/count/view') return b.v === 1 ? send(200, { n: 3412 }) : send(409, { e: 'old', v: 1 });
    if (p === '/counter') return send(200, { played: 422, portraits: 100 });
    if (p === '/stats') return send(200, { checked_in: 26 });
    send(404, { ok: false });
  });
});
await new Promise((r) => stand.listen(4196, r));
const STAND = 'http://127.0.0.1:4196';

const srv = await start(4195, { real: true });
const browser = await chromium.launch({ executablePath: process.env.ME_CHROME || '/usr/bin/google-chrome' });
const HOSTKEY = 'BCDFGH' + '0123456789abcdef0123456789abcdef';

async function phone(seed, viewport = { width: 390, height: 780 }) {
  const ctx = await browser.newContext({ viewport, isMobile: viewport.width < 600, hasTouch: viewport.width < 600, locale: 'en-GB', acceptDownloads: true });
  await ctx.addInitScript((c) => {
    window.LOGICERS_ME_API = '/__me'; window.ME_API = '/__me';
    window.LIVE_SERVER = c.stand; window.CHECKIN_API = c.stand; window.FINDOUT_ROOM_API = c.stand; window.FINDOUT_API = c.stand;
    if (localStorage.getItem('lg.test.seeded')) return; localStorage.setItem('lg.test.seeded', '1');
    if (!c.seed) return;
    const day = (iso) => Math.round(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / 864e5);
    const t = new Date(); const today = Math.round(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / 864e5);
    const games = {};
    const add = (pg, start, shape, n) => { games[pg] = { results: {} }; for (let i = 0; i < n; i++) games[pg].results[String(today - day(start) + 1 - i)] = Object.assign({}, shape); };
    add('100-of-us', '2026-10-03', { g: 50, a: 50, id: 1 }, 5); add('same-energy', '2026-10-10', { g: 30, y: 0, t: 'x', id: 1, l: 'it' }, 4);
    add('your-call', '2026-10-03', { c: 1, r: 1, id: 'c' }, 3); add('the-club', '2026-10-04', { c: 1, r: 1, id: 'c' }, 2); add('long-lost-cousin', '2026-10-03', { c: 1, r: 1, id: 'c' }, 2);
    localStorage.setItem('turnsout:v1', JSON.stringify({ games, world: { logicer: { n: 2195, d: '20261003' } }, rooms: { tok: 'tok-1', list: [{ code: 'abcdefghjk', label: 'Family' }] } }));
    const now = Date.now();
    localStorage.setItem('logicers-make:games', JSON.stringify([
      { code: 'BCDFGHJ', edit: 'ek1', title: 'Exam 3', t: now - 3 * 864e5 }, { code: 'KLMNPQR', edit: 'ek2', title: 'Live only', t: now - 2 * 864e5 },
      { code: 'GZNXGZN', edit: 'ek3', title: 'Old quiz', t: now - 90 * 864e5 }]));
    localStorage.setItem('lg.checkin.v1', JSON.stringify({ entries: [], hosts: [{ key: c.hostkey, code: 'BCDFGH', at: now - 5 * 864e5 }] }));
    localStorage.setItem('logicers-live:host:HSURE1', JSON.stringify({ key: 'hk', t: now - 36e5 }));
    localStorage.setItem('lg.findout.room.host', JSON.stringify({ code: 'FOUT99', host_key: 'fk', made: now - 36e5 }));
  }, { seed: !!seed, stand: STAND, hostkey: HOSTKEY });
  const page = await ctx.newPage(); const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push('console ' + m.text()); });
  return { ctx, page, errors };
}
async function open(p, hash = '') { await p.page.goto(srv.url + '/me/' + (hash ? '#' + hash : '')); await p.page.waitForFunction(() => document.documentElement.dataset.ready); await p.page.waitForTimeout(900); }
const item = (p, k) => p.page.locator('.me-item[data-k="' + k + '"]');
const line = (p, k) => item(p, k).locator('.me-inum').innerText();
const recOf = (c) => srv.worker.db.get(c) && srv.worker.db.get(c).record;
const shot = (p, n) => p.page.screenshot({ path: path.join(SHOTS, 'manage-' + n + '.png'), fullPage: true });

/* ---------------------------------------------------------------- a newcomer: nothing played, nothing kept */
console.log('a newcomer sees a full page, not an empty one');
const N = await phone(false); await open(N); await N.page.waitForTimeout(1500);
const hero = N.page.locator('.me-hero');
check('the hero: the number this phone would get, counted up', (await hero.locator('.me-hero-n').innerText()) === 'Logicer №3,413', await hero.locator('.me-hero-n').innerText());
check('the hero leads to the first daily game', (await hero.getAttribute('href')) === '../same-energy/' && (await hero.innerText()).includes('Play your first game'));
check('the steps: 0 of 5, five steps, the code locked until a first game', (await N.page.locator('.me-ring b').innerText()) === '0/5' && (await N.page.locator('.me-step').count()) === 5 && (await N.page.locator('.me-step.off[data-k="code"]').count()) === 1);
check('the find-out and check-in steps show how many already did', (await N.page.locator('.me-step[data-k="findout"] .sub').innerText()) === '422 already did' && (await N.page.locator('.me-step[data-k="checkin"] .sub').innerText()) === '26 already did');
check('an example of a full page, marked as one', (await N.page.locator('.me-preview .pv-tag').innerText()).toLowerCase() === 'example' && (await N.page.locator('.me-preview .pv-tile').count()) === 3);
check('every game tile has its own picture from the home page and "1 min"', (await N.page.locator('.me-tile.fresh .me-art.in > svg').count()) === 12 && (await N.page.locator('.me-tile.fresh .me-tgo').first().innerText()).includes('1 min'));
check('no "–" skeleton left', !(await N.page.locator('#me').innerText()).includes('–'));
check('no sideways scroll on the phone', await N.page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
await shot(N, 'newcomer');
check('newcomer: no script errors', N.errors.length === 0, N.errors);
await N.ctx.close();

/* ---------------------------------------------------------------- phone A keeps a code */
console.log('phone A: games made, a check-in group, a How Sure game, a find-outs room, a friends\' room; keeps a code');
const A = await phone(true); await open(A);
await A.page.getByRole('button', { name: 'Get your code' }).click(); await A.page.waitForTimeout(600);
await A.page.getByRole('button', { name: 'Keep', exact: true }).click(); await A.page.waitForTimeout(1500);
const code = await A.page.evaluate(() => JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null);
check('A keeps a code', /^[a-z]+-[a-z]+-[a-z]+-[1-9]\d$/.test(code || ''), code);
await open(A); await A.page.waitForTimeout(1200);

console.log('Your games: the numbers from each server');
check('made game: plays and the day it is kept until', /12 plays · Kept until 6 Jan/.test(await line(A, 'made:BCDFGHJ')), await line(A, 'made:BCDFGHJ'));
check('check-in group: rounds, every check-in, kept until', /2 rounds · 12 check-ins · Kept until 9 Jan/.test(await line(A, 'checkin:BCDFGH')), await line(A, 'checkin:BCDFGH'));
check('How Sure: live now with its players, and Open', /Live now · 18 players/.test(await line(A, 'howsure:HSURE1')) && (await item(A, 'howsure:HSURE1').locator('a', { hasText: 'Open' }).count()) === 1);
check('find-outs room: live now with who joined', /Live now · 9 players/.test(await line(A, 'findout:FOUT99')), await line(A, 'findout:FOUT99'));
check('a made game its server no longer knows: said so, with Remove', /Not there any more/.test(await line(A, 'made:GZNXGZN')) && (await item(A, 'made:GZNXGZN').getByRole('button', { name: 'Remove' }).count()) === 1);
check('a live-only made game: Edit and Results, no Share', (await item(A, 'made:KLMNPQR').getByRole('button', { name: 'Share' }).count()) === 0 && (await item(A, 'made:KLMNPQR').getByRole('button', { name: 'Results' }).count()) === 1);
check('Edit opens the editor with its key', (await item(A, 'made:BCDFGHJ').locator('a', { hasText: 'Edit' }).getAttribute('href')).endsWith('live/build/#edit=BCDFGHJ.ek1'));
check('the check-in group opens its host page', (await item(A, 'checkin:BCDFGH').locator('a', { hasText: 'Open' }).getAttribute('href')).endsWith('checkin/host/#' + HOSTKEY));
const tot = await A.page.locator('.me-tot').innerText();
check('totals on top: 4 games and groups, 12 plays, 12 check-ins', /4\s*Games and groups/.test(tot) && /12\s*Plays/.test(tot) && /12\s*Check-ins/.test(tot), tot);
check('the friends\' room is listed with Open', (await A.page.locator('.me-mine a[href$="room/#r=abcdefghjk"]').count()) === 1 && (await A.page.locator('.me-mine').innerText()).includes('Family'));
check('asking a made game counts as using it (open, with its edit key)', calls.some((c) => c.p === '/kit/BCDFGHJ/open' && c.b.edit === 'ek1'));
await shot(A, 'phone');

console.log('the steps on a page that is filling up');
check('A: steps card with what is done (daily, code) and what is not (check-in)', (await A.page.locator('.me-step.done[data-k="daily"]').count()) === 1 && (await A.page.locator('.me-step.done[data-k="code"]').count()) === 1 && (await A.page.locator('.me-step:not(.done)[data-k="checkin"]').count()) === 1);
check('A: no hero, no example (the page has its own numbers)', (await A.page.locator('.me-hero').count()) === 0 && (await A.page.locator('.me-preview').count()) === 0);

console.log('Results and the CSV');
await item(A, 'made:BCDFGHJ').getByRole('button', { name: 'Results' }).click(); await A.page.waitForTimeout(800);
const rows = await A.page.locator('.me-table tbody tr').allInnerTexts();
check('the table: best first, ties share a place', rows.length === 3 && /^1\s+Ana/.test(rows[0]) && /^1\s+Cem/.test(rows[1]) && /^3\s+Bo/.test(rows[2]), rows);
const [dl] = await Promise.all([A.page.waitForEvent('download'), A.page.getByRole('button', { name: 'Download CSV' }).click()]);
const csv = fs.readFileSync(await dl.path(), 'utf8');
check('the CSV: its name, a header, every play, quotes kept', dl.suggestedFilename() === 'logicers-BCDFGHJ.csv' && csv.startsWith('﻿Name,Points,Right,Questions,When') && csv.includes('"Bo, ""the"" best",700,2,3,2026-11-07 10:00') && csv.trim().split('\r\n').length === 4, csv);
await shot(A, 'results');
await A.page.keyboard.press('Escape'); await A.page.waitForTimeout(400);

console.log('Share');
await item(A, 'checkin:BCDFGH').getByRole('button', { name: 'Share' }).click(); await A.page.waitForTimeout(500);
check('the group\'s join link and its QR', (await A.page.locator('.me-linkline').innerText()) === 'logicers.com/checkin/room/#BCDFGH' && (await A.page.locator('.me-sheet .me-qr svg, .me-qr svg').count()) >= 1);
await A.page.keyboard.press('Escape'); await A.page.waitForTimeout(400);

console.log('Remove: off this list, on every phone');
await item(A, 'made:GZNXGZN').getByRole('button', { name: 'Remove' }).click(); await A.page.waitForTimeout(2500);
check('gone from the page', (await item(A, 'made:GZNXGZN').count()) === 0);
check('gone from the editor\'s own list on this phone', !(await A.page.evaluate(() => localStorage.getItem('logicers-make:games'))).includes('GZNXGZN'));
check('the record on the server keeps it off', (recOf(code).gone || []).includes('made:GZNXGZN') && !recOf(code).mine.some((x) => x.code === 'GZNXGZN'), recOf(code).gone);

console.log('Delete for good');
await item(A, 'made:KLMNPQR').getByRole('button', { name: 'More' }).click(); await A.page.waitForTimeout(400);
await A.page.getByRole('button', { name: 'Delete for good' }).click(); await A.page.waitForTimeout(300);
check('Delete asks once more, in plain words', (await A.page.locator('.me-sheet, [role=dialog]').last().innerText()).includes("This deletes the game and its results for everyone"));
await A.page.getByRole('button', { name: 'Delete', exact: true }).click(); await A.page.waitForTimeout(2500);
check('the live server was asked to delete it, with its key', calls.some((c) => c.p === '/kit/KLMNPQR/delete' && c.b.edit === 'ek2'));
check('and it left the page', (await item(A, 'made:KLMNPQR').count()) === 0 && (await A.page.locator('.me-flash').innerText()).includes('Deleted'));

/* ---------------------------------------------------------------- phone B: the same code, with an old copy of the removed game */
console.log('phone B still holds the removed game in its own list: it never comes back');
const B = await phone(false); await B.page.goto(srv.url + '/me/');
await B.page.evaluate(() => localStorage.setItem('logicers-make:games', JSON.stringify([{ code: 'GZNXGZN', edit: 'ek3', title: 'Old quiz', t: Date.now() - 90 * 864e5 }])));
await open(B, 'have'); await B.page.fill('input', code); await B.page.keyboard.press('Enter'); await B.page.waitForTimeout(2500);
await open(B); await B.page.waitForTimeout(1000);
check('B: the removed game is not on the page', (await item(B, 'made:GZNXGZN').count()) === 0);
check('B: and the server still keeps it off after B\'s sync', !recOf(code).mine.some((x) => x.code === 'GZNXGZN'));

console.log('instant sync: an action on a game page reaches the server about a second later');
await A.page.goto(srv.url + '/100-of-us/'); await A.page.waitForTimeout(1800);
const n0 = srv.worker.log.filter((x) => x.p === '/sync').length;
await A.page.evaluate(() => {
  const day = (iso) => Math.round(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / 864e5);
  const t = new Date(); const today = Math.round(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / 864e5);
  const s = JSON.parse(localStorage.getItem('turnsout:v1')); s.games['every-beat'] = { results: {} };
  s.games['every-beat'].results[String(today - day('2026-10-09') + 1)] = { g: 72, y: 12, t: 'x', id: 'v1', l: 'en' };
  localStorage.setItem('turnsout:v1', JSON.stringify(s));
});
await A.page.waitForTimeout(2200);
check('the result is on the server within ~2 s, no finish call needed', !!recOf(code).g.every, Object.keys(recOf(code).g));
const n1 = srv.worker.log.filter((x) => x.p === '/sync').length;
await A.page.evaluate(() => { const s = JSON.parse(localStorage.getItem('turnsout:v1')); localStorage.setItem('turnsout:v1', JSON.stringify(s)); });
await A.page.waitForTimeout(1800);
check('a write that changes nothing sends nothing', srv.worker.log.filter((x) => x.p === '/sync').length === n1, [n0, n1, srv.worker.log.filter((x) => x.p === '/sync').length]);

console.log('a check-in page syncs too (checkin/assets/core.js loads the two scripts)');
await A.page.goto(srv.url + '/checkin/'); await A.page.waitForTimeout(1500);
check('the check-in page has My Logicers loaded', await A.page.evaluate(() => !!(window.LogicersMe && window.LogicersMe.sync)));
await A.page.evaluate(() => { const c = JSON.parse(localStorage.getItem('lg.checkin.v1')); c.hosts.push({ key: 'KMRTBN' + 'f'.repeat(32), code: 'KMRTBN', at: Date.now() }); localStorage.setItem('lg.checkin.v1', JSON.stringify(c)); });
await A.page.waitForTimeout(2200);
check('a new check-in group is on the server within ~2 s', recOf(code).mine.some((x) => x.kind === 'checkin' && x.code === 'KMRTBN'), recOf(code).mine.map((x) => x.code));

console.log('the Me chip in the header');
await A.page.goto(srv.url + '/100-of-us/'); await A.page.waitForTimeout(1200);
const chip = A.page.locator('#me-chip');
check('the chip sits right after the streak chip', await A.page.evaluate(() => { const c = document.getElementById('me-chip'); const prev = c && c.previousElementSibling; return !!(prev && (prev.id === 'streak-chip' || prev.classList.contains('streak'))); }));
check('it opens My Logicers and is filled (a code is kept here)', (await chip.getAttribute('href')).endsWith('/me/') && (await chip.getAttribute('class')).includes('on') && (await chip.getAttribute('aria-label')) === 'My Logicers');
for (const w of [320, 360, 390]) {
  await A.page.setViewportSize({ width: w, height: 700 }); await A.page.waitForTimeout(250);
  const over = await A.page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  const box = await chip.boundingBox();
  check(`game page at ${w} px: no sideways scroll, the chip inside the screen`, over <= 0 && box && box.x + box.width <= w, [over, box]);
}
await A.page.setViewportSize({ width: 390, height: 780 });
await A.page.goto(srv.url + '/'); await A.page.waitForTimeout(1200);
check('the home page has it too', (await A.page.locator('#me-chip').count()) === 1);
for (const l of ['', 'it/', 'es/', 'pt/', 'fr/', 'tr/']) {
  await A.page.goto(srv.url + '/' + l); await A.page.waitForTimeout(700);
  for (const w of [320, 360]) {
    await A.page.setViewportSize({ width: w, height: 700 }); await A.page.waitForTimeout(200);
    const over = await A.page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const box = await A.page.locator('#me-chip').boundingBox();
    check(`home ${l || 'en/'} at ${w} px fits with the chip`, over <= 0 && box && box.x + box.width <= w, [over, box && Math.round(box.x + box.width)]);
    if (w === 360) await A.page.screenshot({ path: path.join(SHOTS, `manage-header-${(l || 'en').replace('/', '')}-${w}.png`), clip: { x: 0, y: 0, width: w, height: 80 } });
  }
  await A.page.setViewportSize({ width: 390, height: 780 });
}
const fresh = await phone(false); await fresh.page.goto(srv.url + '/100-of-us/'); await fresh.page.waitForTimeout(900);
check('a phone without a code: the chip is there, not filled', (await fresh.page.locator('#me-chip').count()) === 1 && !(await fresh.page.locator('#me-chip').getAttribute('class')).includes(' on'));
await fresh.ctx.close();

console.log('the strip\'s arrows on a phone');
await open(A); await A.page.waitForTimeout(600);
const box = A.page.locator('.me-stripbox').first();
check('more on the right: the next arrow shows, no previous one', await box.locator('.me-arrow.next').isVisible() && !(await box.locator('.me-arrow.prev').isVisible()));
await box.locator('.me-arrow.next').click(); await A.page.waitForTimeout(800);
check('a tap moves the strip and the previous arrow appears', (await box.locator('.me-strip').evaluate((s) => s.scrollLeft)) > 100 && await box.locator('.me-arrow.prev').isVisible());

console.log('a wide screen');
const W = await phone(false, { width: 1366, height: 900 }); await W.page.goto(srv.url + '/me/');
await open(W, 'have'); await W.page.fill('input', code); await W.page.keyboard.press('Enter'); await W.page.waitForTimeout(2500);
await open(W); await W.page.waitForTimeout(1200);
const g = await W.page.evaluate(() => {
  const home = document.querySelector('.me-home'), main = document.querySelector('.me-main'), strip = document.querySelector('.me-strip');
  return { grid: getComputedStyle(home).display, cols: getComputedStyle(home).gridTemplateColumns.split(' ').length, main: main.getBoundingClientRect().width,
    stripFits: strip.scrollWidth <= strip.clientWidth + 1, arrows: [...document.querySelectorAll('.me-arrow')].filter((a) => a.offsetParent).length,
    items: getComputedStyle(document.querySelector('.me-items')).gridTemplateColumns.split(' ').length };
});
check('the page spreads: a grid of columns over most of the width', g.grid === 'grid' && g.cols >= 3 && g.main > 1100, g);
check('every tile shows, no arrows', g.stripFits && g.arrows === 0, g);
check('Your games side by side', g.items >= 3, g);
await W.page.screenshot({ path: path.join(SHOTS, 'manage-wide.png'), fullPage: true });
await W.page.getByRole('button', { name: 'Exit', exact: true }).click(); await W.page.waitForTimeout(400);
check('on a computer the Exit sheet says "this computer"', (await W.page.locator('dialog.me-sheet').last().innerText()).includes('Everything here leaves this computer.'));
await W.page.keyboard.press('Escape'); await W.page.waitForTimeout(300);
await W.page.getByRole('button', { name: 'Delete everything' }).click(); await W.page.waitForTimeout(400);
check('and Delete says "this computer" too', (await W.page.locator('dialog.me-sheet').last().innerText()).includes("What's on this computer stays."));
await W.page.keyboard.press('Escape'); await W.page.waitForTimeout(300);
await W.page.goto(srv.url + '/me/?device=tablet'); await W.page.waitForFunction(() => document.documentElement.dataset.ready); await W.page.waitForTimeout(600);
await W.page.getByRole('button', { name: 'Exit', exact: true }).click(); await W.page.waitForTimeout(400);
check('a tablet gets "this tablet"', (await W.page.locator('dialog.me-sheet').last().innerText()).includes('Everything here leaves this tablet.'));
await W.page.keyboard.press('Escape'); await W.page.waitForTimeout(300);
await open(W, 'pw'); const narrow = await W.page.evaluate(() => document.querySelector('.me-main').getBoundingClientRect().width);
check('a form screen stays one narrow column', narrow < 700, narrow);

console.log('Exit and "Use another code"');
await open(B);
await B.page.getByRole('button', { name: 'Use another code' }).click(); await B.page.waitForTimeout(400);
check('the sheet says what happens', (await B.page.locator('dialog.me-sheet').last().innerText()).includes('Everything here leaves this phone. Your code brings it back.'));
await B.page.locator('dialog.me-sheet').last().getByRole('button', { name: 'Exit' }).click(); await B.page.waitForTimeout(2500);
check('B: lands on the box for another code', /#have/.test(B.page.url()) && (await B.page.locator('input').count()) >= 1, B.page.url());
check('B: the code and the games left this phone', await B.page.evaluate(() => !localStorage.getItem('lg.me.v1') && !localStorage.getItem('turnsout:v1') && !localStorage.getItem('logicers-make:games')));
const before = JSON.stringify(recOf(code).g);
await open(A);
await A.page.getByRole('button', { name: 'Exit', exact: true }).click(); await A.page.waitForTimeout(400);
await A.page.locator('dialog.me-sheet').last().getByRole('button', { name: 'Exit' }).click(); await A.page.waitForTimeout(2500);
check('A: home without a code, "Done."', (await A.page.locator('#me').innerText()).includes('Done.') && (await A.page.locator('#me').innerText()).includes('Have a code?'));
check('A: nothing of the games left on this phone', await A.page.evaluate(() => !localStorage.getItem('lg.me.v1') && !localStorage.getItem('turnsout:v1') && !localStorage.getItem('lg.checkin.v1')));
check('the server still holds everything', JSON.stringify(recOf(code).g) === before && Object.keys(recOf(code).g).length >= 5, (() => { const a = JSON.parse(before), b = recOf(code).g; return Object.keys(Object.assign({}, a, b)).filter((k) => JSON.stringify(a[k]) !== JSON.stringify(b[k])).map((k) => [k, a[k], b[k]]); })());
await open(A, 'have'); await A.page.fill('input', code); await A.page.keyboard.press('Enter'); await A.page.waitForTimeout(2500);
await open(A); await A.page.waitForTimeout(1200);
check('the code brings it all back, Your games included', (await item(A, 'made:BCDFGHJ').count()) === 1 && (await item(A, 'checkin:BCDFGH').count()) === 1 && (await A.page.locator('.me-tile').count()) >= 6);
await A.page.goto(srv.url + '/me/#have'); await A.page.waitForTimeout(800);
check('with a code kept, #have goes home (two people\'s games never mix)', (await A.page.locator('.me-number').count()) === 1);

check('no script errors', [A, B, W].every((x) => x.errors.length === 0), [A.errors, B.errors, W.errors]);
await browser.close(); await srv.close(); stand.close();
console.log(`\n${pass} checks passed, ${fails.length} failed`);
if (fails.length) { console.log(fails.map((f) => ' - ' + f).join('\n')); process.exit(1); }
