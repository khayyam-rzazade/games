/* My Logicers, 26 Nov 2026: Play Logicers' Yours in My Logicers (claude/play-next-24nov.md, chat M).
   node me/tests/play.test.mjs      (ME_REAL=<folder with the real me-stats.js, me.js, me-passkey.js>, default assets/js of this site)
   What it proves, with the real me.js and the real bridge (portal/bridge.html) in a frame of a stand-in of Play's page on another
   address of this computer (127.0.0.1 on another port: another origin, the same site, as play.logicers.com is to logicers.com):
     - the bridge answers its parent only, and no page of another site; it says whether the phone keeps a code and the Logicer number;
       without a code it writes nothing; with a code it merges what Play sends into "logicers-play:mine" and My Logicers syncs it;
     - Play's Yours travels in the locked box only: not one saved game, name or day in the open record; the record stays under its cap
       with 200 saved games;
     - a second phone gets it with the code; the bridge gives it to Play there; an unsave made there wins on the first phone;
       the streak of two phones is one streak; Exit takes it off the phone;
     - My Logicers shows the part "Play Logicers": the streak, the saved games (each to its page on Play, a game of Logicers' own to
       the game), the one new line, in six languages, at 320 px, light and dark, with no sideways scroll. */
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
const M = require(path.join(process.env.ME_REAL, 'me-stats.js'));
const SHOTS = process.env.ME_SHOTS || '/tmp/me-shots';
fs.mkdirSync(SHOTS, { recursive: true });
let pass = 0; const fails = [];
function check(name, ok, detail) { if (ok) { pass++; console.log('  ok  ', name); } else { fails.push(name + (detail !== undefined ? ' — ' + JSON.stringify(detail) : '')); console.log('  FAIL', name, detail !== undefined ? JSON.stringify(detail).slice(0, 400) : ''); } }

/* ---------------------------------------------------------------- the words */
console.log('the words');
const LANGS = ['en', 'es', 'fr', 'it', 'pt', 'tr'], WORDS = Object.fromEntries(LANGS.map((l) => [l, JSON.parse(fs.readFileSync(path.resolve(HERE, '../lang/' + l + '.json'), 'utf8'))]));
check('play.note is in all six languages, one line, no placeholder', LANGS.every((l) => typeof WORDS[l]['play.note'] === 'string' && WORDS[l]['play.note'].length > 20 && WORDS[l]['play.note'].length < 120 && !/[{}\n]/.test(WORDS[l]['play.note'])));
check('the six files have the same keys, in the same order', LANGS.every((l) => Object.keys(WORDS[l]).join() === Object.keys(WORDS.en).join()));
check('the only new word is play.note', LANGS.every((l) => Object.keys(WORDS[l]).filter((k) => /^play\./.test(k)).join() === 'play.note'));

/* ---------------------------------------------------------------- the servers: the site with the fake My Logicers Worker, and Play's stand-in */
const srv = await start(4195, { real: true });
const SITE = srv.url;                                   // http://127.0.0.1:4195: "logicers.com"
const BRIDGE = SITE + '/portal/bridge.html';
const PLAY_PAGE = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Play stand-in</title></head><body><p>Play</p>
<script>
  window.answers = [];
  window.ask = (op, data) => new Promise((resolve) => {
    const id = 'q' + Math.random().toString(36).slice(2, 10);
    const on = (e) => { if (e.data && e.data.lg === 'play' && e.data.id === id) { window.removeEventListener('message', on); resolve(e.data); } };
    window.addEventListener('message', on);
    setTimeout(() => resolve(null), 9000);
    document.getElementById('br').contentWindow.postMessage({ lg: 'play', op, id, data: data || null }, '*');
  });
  window.ready = new Promise((r) => window.addEventListener('message', (e) => { if (e.data && e.data.lg === 'play' && e.data.op === 'ready') r(e.origin); }));
</script><iframe id="br" src="${BRIDGE}" hidden></iframe></body></html>`;
const play = http.createServer((req, res) => { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(PLAY_PAGE); });
await new Promise((r) => play.listen(4194, '127.0.0.1', r));
const other = http.createServer((req, res) => { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(PLAY_PAGE); });
let OTHER = null;
try { await new Promise((r, j) => { other.once('error', j); other.listen(4194, '127.0.0.2', r); }); OTHER = 'http://127.0.0.2:4194/'; } catch (e) { console.log('  (127.0.0.2 not available: the other-site check is skipped)'); }
const browser = await chromium.launch({ executablePath: process.env.ME_CHROME || '/usr/bin/google-chrome' });

const two = (n) => (n < 10 ? '0' : '') + n;
const ymd = (back) => { const d = new Date(Date.now() - back * 864e5); return d.getFullYear() + '-' + two(d.getMonth() + 1) + '-' + two(d.getDate()); };
async function phone(o = {}) {
  const viewport = o.viewport || { width: 390, height: 780 };
  const ctx = await browser.newContext({ viewport, isMobile: viewport.width < 600, hasTouch: viewport.width < 600, locale: 'en-GB', timezoneId: 'Europe/Rome', colorScheme: o.dark ? 'dark' : 'light' });
  await ctx.addInitScript((c) => {
    window.LOGICERS_ME_API = '/__me';
    if (location.port !== '4195' || localStorage.getItem('lg.test.seeded')) return;
    localStorage.setItem('lg.test.seeded', '1');
    if (c.lang && c.lang !== 'en') localStorage.setItem('lg.findout.lang', c.lang);
    if (c.logicer) localStorage.setItem('turnsout:v1', JSON.stringify({ games: {}, world: { logicer: { n: c.logicer, d: '20261003' } } }));
    if (c.play) localStorage.setItem('logicers-play:mine', JSON.stringify(c.play));
    if (c.code) localStorage.setItem('lg.me.v1', JSON.stringify({ v: 1, code: c.code, lang: 'en', at: Date.now(), last: 0 }));
  }, { lang: o.lang, logicer: o.logicer, play: o.play, code: o.code });
  const page = await ctx.newPage(); const errors = [], warns = [];
  page.on('pageerror', (e) => errors.push('pageerror ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push('console ' + m.text()); if (m.type() === 'warning' && /no words for/.test(m.text())) warns.push(m.text()); });
  return { ctx, page, errors, warns };
}
async function openMe(p, hash = '') { await p.page.goto(SITE + '/me/' + (hash ? '#' + hash : '')); await p.page.waitForFunction(() => document.documentElement.dataset.ready); await p.page.waitForTimeout(1200); }
async function openPlay(p, where) { await p.page.goto(where || 'http://127.0.0.1:4194/'); return p.page.evaluate(() => Promise.race([window.ready, new Promise((r) => setTimeout(() => r(null), 6000))])); }
const ask = (p, op, data) => p.page.evaluate(([o, d]) => window.ask(o, d), [op, data]);
const siteKey = async (p, k) => { const f = p.page.frames().find((x) => x.url().startsWith(BRIDGE)); return f ? f.evaluate((key) => JSON.parse(localStorage.getItem(key) || 'null'), k) : 'no frame'; };
const recOf = (c) => srv.worker.db.get(c) && srv.worker.db.get(c).record;
const shot = (p, n) => p.page.screenshot({ path: path.join(SHOTS, 'play-' + n + '.png'), fullPage: true });
const T = Date.now();
const G = (n, lang = 'es') => [lang, 'game-' + lang + '-' + n, 'Game ' + lang + ' ' + n, ''];

/* ---------------------------------------------------------------- the bridge without a code */
console.log('the bridge: a phone with no code');
const A = await phone({ logicer: 2195 });
check('the bridge says it is ready, to its parent', (await openPlay(A)) === SITE);
let r = await ask(A, 'hello');
check('hello: no code, the Logicer number of the phone, nothing of Play', r && r.ok && r.code === false && r.n === 2195 && r.play === undefined, r);
r = await ask(A, 'put', { play: { star: ['x'], t: { x: T }, g: { x: G(1) } } });
check('put without a code: nothing is written', r && r.ok && r.kept === false && (await siteKey(A, 'logicers-play:mine')) === null, r);
check('My Logicers\' scripts were not even loaded', await A.page.frames().find((x) => x.url().startsWith(BRIDGE)).evaluate(() => !window.LogicersMe));
r = await ask(A, 'drop', {});
check('an unknown ask: ok false, nothing done', r && r.ok === false, r);
if (OTHER) {
  const X = await phone({ code: 'river-blue-cats-42', play: { star: ['secret-game'] } });
  await openPlay(X, OTHER);
  const rx = await ask(X, 'hello');
  check('a page of another site gets no answer (its frame keeps nothing of logicers.com anyway)', rx === null, rx);
  await X.ctx.close();
}
const top = await phone();
await top.page.goto(BRIDGE); await top.page.waitForTimeout(500);
check('the bridge opened on its own does nothing', await top.page.evaluate(() => !window.LogicersMe && document.body.textContent.trim() === ''));
await top.ctx.close();

/* ---------------------------------------------------------------- A keeps a code; Play sends its Yours */
console.log('A keeps a code; Play\'s Yours goes to My Logicers');
await openMe(A);
await A.page.getByRole('button', { name: 'Get your code' }).click(); await A.page.waitForTimeout(600);
await A.page.getByRole('button', { name: 'Keep', exact: true }).click(); await A.page.waitForTimeout(1800);
const code = await A.page.evaluate(() => JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null);
check('A keeps a code', /^[a-z]+-[a-z]+-[a-z]+-[1-9]\d$/.test(code || ''), code);
check('My Logicers shows no Play part yet', (await A.page.locator('.me-play').count()) === 0);
await openPlay(A);
r = await ask(A, 'hello');
check('hello: a code, the number, no Yours kept yet', r && r.code === true && r.n === 2195 && r.play === null, r);
const yoursA = { v: 1, star: ['es1', 'lg1', 'ja1'], t: { es1: T - 3000, lg1: T - 2000, ja1: T - 1000, gone1: T - 5000 },
  g: { es1: G(1), lg1: ['es', '', 'The Club', 'https://logicers.com/es/the-club/'], ja1: G(1, 'ja') }, played: { es1: ymd(0), ja1: ymd(2) },
  streak: { n: 3, last: ymd(0) }, lang: 'es', week: { w: '2026-11-23', ids: ['es1'] } };
r = await ask(A, 'put', { play: yoursA });
check('put with a code: kept, merged, the week of the vote left out', r && r.kept === true && r.play.star.join() === 'ja1,lg1,es1' && !r.play.week && r.play.streak.n === 3, r && r.play);
await A.page.waitForTimeout(2500);                      // the storage watcher syncs about a second later
const rec = recOf(code), recText = JSON.stringify(rec);
check('the server has a box', !!(rec && rec.box && rec.box.data));
check('not one saved game, name or day of Play in the open record', !/es1|lg1|ja1|Game es|The Club|logicers-play|"play"/.test(recText.replace(/"box":\{[^}]*\}/, '')), recText.slice(0, 300));
check('nothing of Play in the box as plain text either', !/es1|Game es/.test(JSON.stringify(rec.box)));

/* ---------------------------------------------------------------- B: the code brings it; Play there gets it */
console.log('phone B: the code brings Play\'s Yours');
const B = await phone({ logicer: null, play: { v: 1, star: ['b-only'], t: { 'b-only': T - 100 }, g: { 'b-only': G(7) }, streak: { n: 4, last: ymd(1) } } });
await openMe(B, 'have');
await B.page.fill('input', code); await B.page.keyboard.press('Enter'); await B.page.waitForTimeout(2500);
await openMe(B); await B.page.waitForTimeout(1500);
const kb = await B.page.evaluate(() => JSON.parse(localStorage.getItem('logicers-play:mine') || 'null'));
check('B: its own saved game and A\'s, merged; nothing lost', kb && ['b-only', 'ja1', 'lg1', 'es1'].every((x) => kb.star.includes(x)) && kb.t.gone1 === T - 5000, kb && kb.star);
check('B: the streaks of the two phones are one (B: 4 days to yesterday; A: 3 days to today; together 5 days in a row)', kb && kb.streak.last === ymd(0) && kb.streak.n === 5, kb && kb.streak);
const sec = B.page.locator('.me-play');
check('My Logicers on B: the part "Play Logicers"', (await sec.count()) === 1 && (await sec.locator('h2').innerText()) === 'Play Logicers');
check('the streak: a flame and 5, to Play in the last language', (await sec.locator('.me-pstreak b').innerText()) === '5' && (await sec.locator('.me-pstreak .me-flame').count()) === 1 && (await sec.locator('.me-pstreak').getAttribute('href')) === 'https://play.logicers.com/es/');
const tiles = sec.locator('.me-ptile');
check('four saved games, the newest first', (await tiles.count()) === 4 && (await tiles.first().locator('.nm').innerText()) === 'Game es 7', await tiles.allInnerTexts());
check('a game opens its page on Play; one of Logicers\' own opens the game', (await sec.locator('.me-ptile', { hasText: 'Game ja 1' }).getAttribute('href')) === 'https://play.logicers.com/ja/g/game-ja-1/' && (await sec.locator('.me-ptile', { hasText: 'The Club' }).getAttribute('href')) === 'https://logicers.com/es/the-club/');
check('the second line: the language in the page\'s language, Logicers for its own', (await sec.locator('.me-ptile', { hasText: 'Game ja 1' }).locator('.sub').innerText()) === 'Japanese' && (await sec.locator('.me-ptile', { hasText: 'The Club' }).locator('.sub').innerText()) === 'Logicers');
check('the one new line under them', (await sec.locator('.me-pnote').innerText()) === WORDS.en['play.note']);
check('B: no script errors, no missing words', B.errors.length === 0 && B.warns.length === 0, [B.errors, B.warns]);
await shot(B, 'me-b-390');
await openPlay(B);
r = await ask(B, 'hello');
check('Play on B: hello gives the merged Yours, and the Logicer number of the code (B has none of its own)', r && r.code === true && r.play && r.play.star.length === 4 && r.n === 2195, r);

console.log('an unsave on B wins on A');
const yoursB = JSON.parse(JSON.stringify(r.play));
yoursB.star = yoursB.star.filter((x) => x !== 'es1'); yoursB.t.es1 = Date.now();
r = await ask(B, 'put', { play: yoursB });
check('B: es1 unsaved and kept so', r && r.kept && !r.play.star.includes('es1') && r.play.t.es1 > T, r && r.play);
await B.page.waitForTimeout(2500);
await openMe(A); await A.page.waitForTimeout(2500);
const ka = await A.page.evaluate(() => JSON.parse(localStorage.getItem('logicers-play:mine') || 'null'));
check('A: es1 is unsaved there too; b-only came', ka && !ka.star.includes('es1') && ka.star.includes('b-only') && ka.streak.n === 5, ka && ka.star);
check('A\'s My Logicers: three saved games', (await A.page.locator('.me-play .me-ptile').count()) === 3);
await openPlay(A);
r = await ask(A, 'put', { play: yoursA });             // an old copy of Play on A still holds es1 saved at T-3000: the later unsave wins
check('an old copy from Play cannot bring an unsaved game back', r && r.kept && !r.play.star.includes('es1'), r && r.play && r.play.star);
console.log('My Logicers, open in another tab, draws again when Play writes');
const meTab = await A.ctx.newPage(); await meTab.goto(SITE + '/me/'); await meTab.waitForFunction(() => document.documentElement.dataset.ready); await meTab.waitForTimeout(2500);
const nBefore = await meTab.locator('.me-play .me-ptile').count();
r = await ask(A, 'put', { play: { star: ['new1'], t: { new1: Date.now() }, g: { new1: G(9) } } });
await meTab.waitForTimeout(1500);
check('a game saved on Play shows on the open My Logicers page, newest first, without a reload', r && r.kept && (await meTab.locator('.me-play .me-ptile').count()) === nBefore + 1 && (await meTab.locator('.me-play .me-ptile').first().locator('.nm').innerText()) === 'Game es 9', [nBefore, await meTab.locator('.me-play .me-ptile').count()]);
await meTab.close();

/* ---------------------------------------------------------------- the size: 200 saved games with long names */
console.log('the cap');
const big = { v: 1, star: [], t: {}, g: {}, played: {}, streak: { n: 999, last: ymd(0) } };
for (let i = 0; i < 230; i++) { const id = 'g' + String(i).padStart(9, '0'); big.star.push(id); big.t[id] = T - i; big.g[id] = ['zh-hant', 'slug-' + 'x'.repeat(50) + i, '名'.repeat(80), '']; if (i < 60) big.played[id] = ymd(1); }
for (let i = 0; i < 150; i++) big.t['u' + String(i).padStart(9, '0')] = T - 1e6 - i;
r = await ask(A, 'put', { play: big });
check('200 saved games at most, 100 unsaved ones remembered', r && r.play.star.length === 200 && Object.keys(r.play.t).length === 300, r && [r.play.star.length, Object.keys(r.play.t).length]);
await A.page.waitForTimeout(3000);
const recBig = recOf(code);
check('the record with all of it stays under My Logicers\' cap', M.size(recBig) <= M.LIMIT && !!recBig.box, M.size(recBig));

/* ---------------------------------------------------------------- Exit */
console.log('Exit takes it off the phone');
await openMe(B);
await B.page.getByRole('button', { name: 'Exit', exact: true }).click(); await B.page.waitForTimeout(400);
await B.page.locator('dialog.me-sheet').last().getByRole('button', { name: 'Exit' }).click(); await B.page.waitForTimeout(2500);
check('no Play key left on B', await B.page.evaluate(() => !localStorage.getItem('logicers-play:mine')));
await openPlay(B);
r = await ask(B, 'hello');
check('Play on B after Exit: no code, nothing of Play', r && r.code === false && r.play === undefined, r);

/* ---------------------------------------------------------------- the look: six languages, 320 px, light and dark; a wide screen */
console.log('the look');
const seeded = { v: 1, star: ['a1', 'a2', 'a3', 'a4'], t: { a1: T, a2: T - 1, a3: T - 2, a4: T - 3 },
  g: { a1: ['ar', 'game-ar-1', 'لعبة الكلمات اليومية الطويلة جداً', ''], a2: ['zh-hant', 'game-zh-1', '每日猜詞遊戲', ''], a3: ['es', 'game-es-3', 'Un juego con un nombre muy, muy largo de verdad', ''], a4: ['es', '', 'Same Energy', 'https://logicers.com/es/same-energy/'] },
  streak: { n: 12, last: ymd(1) }, lang: 'es' };
for (const l of LANGS) {
  for (const dark of [false, true]) {
    const P = await phone({ lang: l, dark, viewport: { width: 320, height: 760 }, play: seeded });
    await openMe(P);
    const m = await P.page.evaluate(() => {
      const s = document.querySelector('.me-play'); if (!s) return null;
      const R = (e) => e.getBoundingClientRect(), h = s.querySelector('.me-phead'), st = s.querySelector('.me-pstreak');
      return { fits: document.documentElement.scrollWidth <= innerWidth + 0.5, tiles: s.querySelectorAll('.me-ptile').length, note: s.querySelector('.me-pnote').textContent,
        headOne: R(h).height <= 48, streak: st && st.textContent, tap: st && R(st).height >= 44, out: [...s.querySelectorAll('.me-ptile .nm, .me-ptile .sub')].some((e) => R(e).right > R(e.closest('.me-ptile')).right + 1) };
    });
    check(`[${l}${dark ? ', dark' : ''}] 320: the part, four games, the streak (44 px to tap), one row of head, nothing outside its box, no sideways scroll`,
      m && m.fits && m.tiles === 4 && m.note === WORDS[l]['play.note'] && m.headOne && m.tap && !m.out && /12/.test(m.streak || ''), m);
    check(`[${l}${dark ? ', dark' : ''}] no script errors, no missing words`, P.errors.length === 0 && P.warns.length === 0, [P.errors, P.warns]);
    if (l === 'ar' || (!dark && (l === 'en' || l === 'tr')) || (dark && l === 'es')) await shot(P, 'me-' + l + (dark ? '-dark' : '') + '-320');
    await P.ctx.close();
  }
}
const W = await phone({ viewport: { width: 1280, height: 900 }, play: seeded });
await openMe(W);
check('a computer: the part fits, every tile in view', await W.page.evaluate(() => { const s = document.querySelector('.me-play .me-strip'); return !!s && s.scrollWidth <= s.clientWidth + 1 && document.documentElement.scrollWidth <= innerWidth; }));
await shot(W, 'me-1280');
await W.ctx.close();
const N = await phone({ play: { v: 1, star: [], t: { x: T } } });
await openMe(N);
check('no saved game and no streak: no part', (await N.page.locator('.me-play').count()) === 0);
await N.ctx.close();

await A.ctx.close(); await B.ctx.close();
await browser.close(); await srv.close(); play.close(); if (OTHER) other.close();
console.log(`\n${pass} passed, ${fails.length} failed`);
if (fails.length) { console.log(fails.join('\n')); process.exit(1); }
