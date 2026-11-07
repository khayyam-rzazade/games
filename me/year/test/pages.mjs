/* Cards tests: the page in a browser (me/year/test/pages.mjs).
   node me/year/test/pages.mjs   (needs Playwright; serves the site tree two folders up; writes pictures to $YC_SHOTS or /tmp/yc-shots) */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { FULL, ONE, NOSPOT, LONGNAME, DIST, DIST_SMALL, sourceScript, player } from './fixtures.mjs';
const require = createRequire(import.meta.url);
const { chromium } = (() => { try { return require(process.env.PLAYWRIGHT_PATH || 'playwright'); } catch (e) { return require('/opt/npm-tools/node_modules/playwright'); } })();

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../..');                       // the site tree: me/year/test -> site
const SHOTS = process.env.YC_SHOTS || '/tmp/yc-shots';
fs.mkdirSync(SHOTS, { recursive: true });
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end('no'); return; }
  res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' }); res.end(fs.readFileSync(f));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const BASE = 'http://127.0.0.1:' + server.address().port;

let pass = 0, fail = 0; const notes = [];
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } };
const eq = (a, b, m) => ok(JSON.stringify(a) === JSON.stringify(b), m + ' (got ' + JSON.stringify(a) + ', want ' + JSON.stringify(b) + ')');
const LANGS = process.env.YC_QUICK ? ['en', 'tr'] : ['en', 'it', 'es', 'pt', 'fr', 'tr'];     // YC_QUICK=1: two languages, for a fast look
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch();

/* one page at phone size: the source stub, the overflow map, the console watched */
async function open(name, { P = FULL, q = '?y=2026', lang, dist = DIST, hasCode = false, today = '2026-12-20', reduced = false, noSource = false, noDist = false, init = '', ls = null, locale = 'en-GB', desktop = false } = {}) {
  const ctx = await browser.newContext(desktop
    ? { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, locale, reducedMotion: reduced ? 'reduce' : 'no-preference' }
    : { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  const log = { errors: [], warns: [], requests: [], failed: [] };
  page.on('console', (m) => { if (m.type() === 'error') log.errors.push(m.text()); if (m.type() === 'warning') log.warns.push(m.text()); });
  page.on('pageerror', (e) => log.errors.push('pageerror: ' + e.message));
  page.on('request', (r) => log.requests.push(r.url()));
  page.on('requestfailed', (r) => log.failed.push(r.url()));
  await page.clock.setFixedTime(new Date(today + 'T12:00:00'));
  await page.addInitScript('window.__YC_OVERFLOW = new Map();');
  if (ls) await page.addInitScript((kv) => { for (const k in kv) localStorage.setItem(k, kv[k]); }, ls);
  if (!noSource) await page.addInitScript(sourceScript(P, { dist, hasCode, noDist }));
  if (init) await page.addInitScript(init);
  const url = BASE + '/me/year/' + q + (lang ? (q.includes('?') ? '&' : '?') + 'lang=' + lang : '');
  await page.goto(url);
  await page.waitForFunction(() => document.body.dataset.ready, null, { timeout: 15000 });
  return { ctx, page, log, name };
}
const count = (page, sel) => page.locator(sel).count();
const hashOf = (page, i) => page.evaluate((i) => { const cv = document.querySelectorAll('.yc-slide')[i].querySelector('canvas'); if (!cv) return null; const s = cv.toDataURL(); let h = 0; for (let k = 0; k < s.length; k += 7) h = (h * 31 + s.charCodeAt(k)) | 0; return h; }, i);
const scrollTo = (page, i) => page.evaluate((i) => { const d = document.getElementById('yc-deck'), s = document.querySelectorAll('.yc-slide'); d.scrollTo({ left: s[i].offsetLeft - s[0].offsetLeft, behavior: 'auto' }); }, i);
/* a canvas that has something on it: more than a few distinct colours across a grid of samples */
const inkOf = (page, i) => page.evaluate((i) => {
  const cv = document.querySelectorAll('.yc-slide')[i].querySelector('canvas'); if (!cv || !cv.width) return 0;
  const c = cv.getContext('2d'), seen = new Set();
  for (let x = 0; x < 24; x++) for (let y = 0; y < 30; y++) { const d = c.getImageData(Math.floor((x + .5) * cv.width / 24), Math.floor((y + .5) * cv.height / 30), 1, 1).data; seen.add((d[0] >> 4) + ',' + (d[1] >> 4) + ',' + (d[2] >> 4)); }
  return seen.size;
}, i);
const overflow = (page) => page.evaluate(() => [...window.__YC_OVERFLOW.values()]);
const noise = (log) => log.errors.filter((e) => !/favicon|manifest|apple-touch|404/.test(e));

/* ================= A: a player with everything, six languages, 390 px ================= */
const EXPECT_FULL = ['cover', 'days', 'spot', 'words', 'story', 'percent', 'closing'];
for (const lang of LANGS) {
  const { ctx, page, log } = await open('full-' + lang, { lang });
  const nSlides = await count(page, '.yc-slide');
  eq(nSlides, EXPECT_FULL.length + 1, lang + ': seven screens and the code screen');
  eq(await count(page, '.yc-dot'), EXPECT_FULL.length + 1, lang + ': a dot each');
  eq(await page.evaluate(() => document.documentElement.lang), lang, lang + ': <html lang>');
  const title = await page.title(); ok(/2026/.test(title) && /Logicers/.test(title), lang + ': title ' + title);
  const sr = await page.$$eval('.yc-sr', (n) => n.map((e) => e.textContent.trim()));
  ok(sr.length === EXPECT_FULL.length && sr.every((t) => t.length > 8), lang + ': a spoken description for each picture');
  const words = JSON.parse(fs.readFileSync(path.join(HERE, '../lang/' + lang + '.json'), 'utf8'));
  ok(sr[2].includes(words.game_apart), lang + ': the best game is named in the language (' + words.game_apart + '): ' + sr[2]);
  ok(sr.every((t) => !/\{\w+\}|undefined|NaN|null/.test(t)), lang + ': no raw placeholders in the descriptions: ' + sr.filter((t) => /\{\w+\}|undefined|NaN|null/.test(t)).join(' | '));
  /* the page itself does not scroll sideways, and every control is big enough to tap */
  const wide = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth); ok(wide <= 0, lang + ': no sideways scroll (' + wide + ')');
  const small = await page.evaluate(() => [...document.querySelectorAll('#yc-share,.yc-dot,.yc-code a')].filter((e) => e.offsetParent !== null).map((e) => { const r = e.getBoundingClientRect(); return { id: e.id || e.className, w: Math.round(r.width), h: Math.round(r.height) }; }).filter((r) => r.h < 40 || (r.w < 24)));
  ok(small.length === 0, lang + ': tap targets ≥ 40 tall and ≥ 24 wide: ' + JSON.stringify(small));
  /* every screen in turn: it draws, it settles within 1.3 s, and the dot follows */
  for (let i = 0; i < nSlides; i++) {
    await scrollTo(page, i); await sleep(i === 0 ? 150 : 250);
    if (i < EXPECT_FULL.length) {
      ok((await inkOf(page, i)) > 6, lang + ' screen ' + EXPECT_FULL[i] + ': something is drawn');
      await sleep(1250); const h1 = await hashOf(page, i); await sleep(350); const h2 = await hashOf(page, i);
      ok(h1 === h2, lang + ' screen ' + EXPECT_FULL[i] + ': finished moving by 1.3 s');
    }
    const cur = await page.evaluate(() => [...document.querySelectorAll('.yc-dot')].findIndex((d) => d.hasAttribute('aria-current')));
    eq(cur, i, lang + ': dot follows screen ' + i);
  }
  eq(await page.evaluate(() => document.getElementById('yc-share').disabled), true, lang + ': Share is off on the code screen');
  const of = await overflow(page); ok(of.length === 0, lang + ': no text too wide: ' + JSON.stringify(of));
  ok(noise(log).length === 0, lang + ': no console errors ' + JSON.stringify(noise(log)));
  ok(log.warns.filter((w) => /Cards:/.test(w)).length === 0, lang + ': no missing words ' + JSON.stringify(log.warns));
  ok(log.requests.every((u) => u.startsWith(BASE)), lang + ': nothing asked of another server: ' + log.requests.filter((u) => !u.startsWith(BASE)).join(' '));
  /* look at every screen the way a phone shows it, and take the share picture of each */
  for (let i = 0; i < EXPECT_FULL.length; i++) {
    await scrollTo(page, i); await sleep(1500);
    await page.screenshot({ path: path.join(SHOTS, 'phone-' + lang + '-' + (i + 1) + '-' + EXPECT_FULL[i] + '.png') });
    await page.click('#yc-share'); await page.waitForSelector('#yc-save[open]');
    const info = await page.evaluate(async () => { const a = document.getElementById('yc-save-a'), img = document.getElementById('yc-save-img'); const r = await fetch(a.href), b = await r.blob(); const buf = new Uint8Array(await b.arrayBuffer()); let s = ''; for (let k = 0; k < buf.length; k += 8192) s += String.fromCharCode(...buf.subarray(k, k + 8192)); return { b64: btoa(s), type: b.type, name: a.getAttribute('download'), alt: img.alt, w: img.naturalWidth, h: img.naturalHeight }; });
    fs.writeFileSync(path.join(SHOTS, 'share-' + lang + '-' + (i + 1) + '-' + EXPECT_FULL[i] + '.png'), Buffer.from(info.b64, 'base64'));
    ok(info.type === 'image/png' && info.w === 1080 && info.h === 1350, lang + ' share ' + EXPECT_FULL[i] + ': a 1080 x 1350 png (' + info.w + 'x' + info.h + ')');
    ok(/^my-logicers-y2026-\d\.png$/.test(info.name) && info.alt.length > 8, lang + ' share ' + EXPECT_FULL[i] + ': a named file with a description');
    await page.click('#yc-save-x'); await page.waitForFunction(() => !document.getElementById('yc-save').open);
  }
  await page.screenshot({ path: path.join(SHOTS, 'phone-' + lang + '-8-code.png') }).catch(() => {});
  await ctx.close();
}

/* the code screen, looked at */
{
  const { ctx, page } = await open('code', { lang: 'fr' });
  await scrollTo(page, 7); await sleep(500);
  await page.screenshot({ path: path.join(SHOTS, 'phone-fr-8-code.png') });
  eq(await page.getAttribute('.yc-code a', 'href'), '../', 'the code screen links to me/');
  await ctx.close();
}

/* ================= B: one game only ================= */
{
  const { ctx, page, log } = await open('one', { P: ONE, lang: 'en' });
  eq(await count(page, '.yc-slide'), 5, 'one game: cover, days, spot, closing, and the code screen');
  const sr = await page.$$eval('.yc-sr', (n) => n.map((e) => e.textContent));
  ok(!sr.some((t) => /climb|chapter|more days/i.test(t)), 'one game: nothing about words, story or other Logicers: ' + sr.join(' / '));
  for (let i = 0; i < 4; i++) { await scrollTo(page, i); await sleep(1500); ok((await inkOf(page, i)) > 6, 'one game screen ' + i + ' is drawn'); }
  await page.screenshot({ path: path.join(SHOTS, 'phone-one-4.png') });
  ok((await overflow(page)).length === 0, 'one game: nothing too wide ' + JSON.stringify(await overflow(page)));
  ok(noise(log).length === 0, 'one game: no console errors ' + JSON.stringify(noise(log)));
  await ctx.close();
}
/* a player with a code: no code screen */
{
  const { ctx, page } = await open('code-yes', { hasCode: true, lang: 'en' });
  eq(await count(page, '.yc-slide'), 7, 'a phone with a code: seven screens and no code screen');
  eq(await count(page, '.yc-dot'), 7, 'and seven dots');
  eq(await page.evaluate(() => document.getElementById('yc-share').disabled), false, 'Share is on at the first screen');
  await ctx.close();
}
/* no /dist, or too few Logicers: no percentile screen */
for (const [label, d] of [['no /dist', null], ['12 Logicers', DIST_SMALL]]) {
  const { ctx, page } = await open('nodist', { dist: d, hasCode: true, lang: 'en' });
  eq(await count(page, '.yc-slide'), 6, label + ': six screens');
  const sr = await page.$$eval('.yc-sr', (n) => n.map((e) => e.textContent).join(' '));
  ok(!/more days than/i.test(sr), label + ': no "more days than" line');
  await ctx.close();
}
/* with /dist the percentile is the right one (70 days; the 90th percentile is 41) */
{
  const { ctx, page } = await open('dist', { hasCode: true, lang: 'en' });
  const sr = await page.$$eval('.yc-sr', (n) => n.map((e) => e.textContent));
  ok(sr.some((t) => /90/.test(t) && /days/i.test(t)), 'the percentile screen says 90: ' + sr.join(' / '));
  await ctx.close();
}
/* never spot on: base camp */
{
  const { ctx, page, log } = await open('nospot', { P: NOSPOT, lang: 'es', hasCode: true });
  const sr = await page.$$eval('.yc-sr', (n) => n.map((e) => e.textContent));
  eq(sr.length, 5, 'never spot on (Spanish): cover, days, words, percent, closing');
  for (let i = 0; i < 5; i++) { await scrollTo(page, i); await sleep(1500); ok((await inkOf(page, i)) > 6, 'never spot on screen ' + i + ' is drawn'); }
  await scrollTo(page, 2); await sleep(1400); await page.screenshot({ path: path.join(SHOTS, 'phone-nospot-words.png') });
  ok(noise(log).length === 0, 'never spot on: no console errors');
  await ctx.close();
}
/* the longest name and number there can be */
for (const lang of ['en', 'it']) {
  const { ctx, page } = await open('long', { P: LONGNAME, lang, hasCode: true });
  for (let i = 0; i < 7; i++) { await scrollTo(page, i); await sleep(350); }
  const of = await overflow(page); ok(of.length === 0, 'a very long game name and number (' + lang + '): nothing too wide ' + JSON.stringify(of));
  for (const i of [0, 2]) { await scrollTo(page, i); await sleep(1500); await page.screenshot({ path: path.join(SHOTS, 'phone-long-' + lang + '-' + (i + 1) + '.png') }); }
  await ctx.close();
}

/* ================= C: month cards ================= */
const MONTH6 = ['cover', 'days', 'spot', 'words', 'story', 'closing'], MONTH7 = ['cover', 'days', 'spot', 'words', 'story', 'percent', 'closing'];
for (const [lang, q, expect, today] of [['pt', '?m=2026-12', MONTH7, '2027-01-05'], ['fr', '?m=2026-11', MONTH6, '2026-12-05'], ['tr', '?m=2026-12', null, '2026-12-20'], ['it', '?m=2026-12', null, '2027-01-05']]) {
  const { ctx, page, log } = await open('month', { lang, q, today, hasCode: true });
  const sr = await page.$$eval('.yc-sr', (n) => n.map((e) => e.textContent));
  if (expect) eq(sr.length, expect.length, lang + ' ' + q + ': screens for a month (the percentile only when /dist is about that month)');
  const title = await page.title(); ok(!/\b2026\b\s*\|/.test(title) || /2026/.test(title), lang + ': month title ' + title);
  ok(!sr.some((t) => /\{|undefined|NaN/.test(t)), lang + ' month: clean descriptions');
  for (let i = 0; i < sr.length; i++) { await scrollTo(page, i); await sleep(250); if (i === 0 || i === 1) { await sleep(1300); await page.screenshot({ path: path.join(SHOTS, 'phone-month-' + lang + '-' + (i + 1) + '.png') }); } }
  ok((await overflow(page)).length === 0, lang + ' month: nothing too wide ' + JSON.stringify(await overflow(page)));
  ok(noise(log).length === 0, lang + ' month: no console errors');
  await ctx.close();
}
/* a month card for a month in which the player played nothing: the empty state */
{
  const { ctx, page } = await open('quiet', { P: ONE, q: '?m=2026-10', today: '2026-12-20', lang: 'en' });
  eq(await page.evaluate(() => document.body.dataset.ready), 'empty', 'a month with no days: the empty state');
  ok(await page.isVisible('#yc-empty'), 'the empty text shows'); ok(!(await page.isVisible('#yc-deck')), 'and no deck');
  ok(/\/$|\.\.\/$/.test((await page.getAttribute('#yc-empty a', 'href')) || ''), 'with a way to play');
  await ctx.close();
}

/* ================= D: no server, no modules, no source: the empty state ================= */
{
  const { ctx, page, log } = await open('nosource', { noSource: true, lang: 'it' });
  eq(await page.evaluate(() => document.body.dataset.ready), 'empty', 'no numbers at all: the empty state, not an error');
  ok(await page.isVisible('#yc-empty'), 'with its words'); ok(noise(log).length === 0, 'no console errors with no source');
  await page.screenshot({ path: path.join(SHOTS, 'phone-empty-it.png') });
  await ctx.close();
}
/* the Worker is down: the card is there without the percentile, no error */
{
  const stub = 'window.LOGICERS_ME_SOURCE = undefined;';
  const { ctx, page, log } = await open('down', { init: '', lang: 'en', dist: null, hasCode: true });
  eq(await count(page, '.yc-slide'), 6, 'the server is down: six screens'); ok(noise(log).length === 0, 'and no console errors');
  await ctx.close();
}
/* source.js's own /dist request (the stub has no dist of its own; on localhost the address is the one LOGICERS_ME_API names, as me.js does):
   the right address, a GET, no cookies, no referrer; a bad answer gives no percentile screen */
{
  const API = "window.LOGICERS_ME_API = 'https://me.logicers.com';";
  const stats = sourceScript(FULL, { hasCode: true, noDist: true });
  for (const [label, reply, want] of [['a good /dist', { status: 200, body: JSON.stringify(DIST) }, 7], ['a 500', { status: 500, body: 'x' }, 6], ['not JSON', { status: 200, body: 'nope' }, 6], ['ok false', { status: 200, body: JSON.stringify({ ...DIST, ok: false }) }, 6], ['too few records', { status: 200, body: JSON.stringify(DIST_SMALL) }, 6]]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    const page = await ctx.newPage(); const seen = [];
    await page.route('https://me.logicers.com/dist', (r) => { seen.push({ method: r.request().method(), headers: r.request().headers() }); r.fulfill({ status: reply.status, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: reply.body }); });
    await page.clock.setFixedTime(new Date('2026-12-20T12:00:00'));
    await page.addInitScript(API); await page.addInitScript(stats);
    await page.goto(BASE + '/me/year/?y=2026&lang=en'); await page.waitForFunction(() => document.body.dataset.ready);
    eq(await count(page, '.yc-slide'), want, 'source.js with ' + label + ': ' + want + ' screens');
    eq(seen.length, 1, label + ': exactly one /dist request'); if (seen[0]) { eq(seen[0].method, 'GET', label + ': a GET'); ok(!seen[0].headers.cookie && !seen[0].headers.referer, label + ': no cookies, no referrer'); }
    await ctx.close();
  }
  /* on localhost with no address named, nothing is asked of any server (me.js does the same) */
  { const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }); const page = await ctx.newPage(); let asked = 0;
    await page.route(/logicers\.com|workers\.dev/, (r) => { asked++; r.abort(); });
    await page.clock.setFixedTime(new Date('2026-12-20T12:00:00')); await page.addInitScript(stats);
    await page.goto(BASE + '/me/year/?y=2026&lang=en'); await page.waitForFunction(() => document.body.dataset.ready); await sleep(300);
    eq(asked, 0, 'localhost with no LOGICERS_ME_API: no request to any server'); eq(await count(page, '.yc-slide'), 6, 'and no percentile screen'); await ctx.close(); }
  /* the first address does not answer at all: the second one is tried; an error answer is not retried elsewhere */
  { const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }); const page = await ctx.newPage(); let second = 0;
    await page.route('https://me.logicers.com/dist', (r) => r.abort());
    await page.route('https://logicers-me.rza-khay.workers.dev/dist', (r) => { second++; r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(DIST) }); });
    await page.clock.setFixedTime(new Date('2026-12-20T12:00:00')); await page.addInitScript(stats);
    await page.goto(BASE + '/me/year/?y=2026&lang=en'); await page.waitForFunction(() => document.body.dataset.ready);
    eq(second, 0, 'localhost without LOGICERS_ME_API never reaches the fallback address'); await ctx.close(); }
  /* a month card asks once too, and gets its own percentile when /dist is about that month (December) */
  { const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }); const page = await ctx.newPage(); let asked = 0;
    await page.route('https://me.logicers.com/**', (r) => { asked++; r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(DIST) }); });
    await page.clock.setFixedTime(new Date('2026-12-20T12:00:00')); await page.addInitScript(API); await page.addInitScript(stats);
    await page.goto(BASE + '/me/year/?m=2026-12&lang=en'); await page.waitForFunction(() => document.body.dataset.ready); await sleep(300);
    eq(asked, 1, 'a month card asks /dist once'); eq(await count(page, '.yc-slide'), 7, 'and with /dist about December it has the percentile screen'); await ctx.close(); }
}

/* ================= D2: the real modules (assets/js/me-stats.js and me.js, Chat A's, copied into the test tree), no stub ================= */
{
  const phone = (extra) => `(() => { const put = (k, v) => localStorage.setItem(k, JSON.stringify(v));
    const res = {}; for (let n = 1; n <= 79; n++) if (n % 5 !== 0) res[n] = { g: n % 2 ? 54 : 50, a: 50, id: 'x' + n };       // 100 of Us: spot on on even days
    const call = {}; for (let n = 1; n <= 30; n++) call[n] = { c: 1, r: 1, id: 'c' + n };                                  // Your Call: always the leader's call
    put('turnsout:v1', { v: 1, games: { '100-of-us': { results: res }, 'your-call': { results: call } }, world: { logicer: { n: 4821, d: '20261003' } } });
    const main = {}, runs = { es: {} }; for (let n = 1; n <= 20; n++) { main[n] = 'es'; runs.es[n] = { d: 1, done: true, h: n <= 3 ? 8 : 5 }; }
    put('altitude:v1', { runs, main, best: 8, sent: {} });
    localStorage.setItem('lg.findout.lang', 'es'); ${extra || ''} })();`;
  // the days the real stats() must find: 100 of Us from 3 Oct (n % 5 != 0), Your Call n 1..30 from 3 Oct, Altitude n 1..20 from 28 Oct
  const dates = new Set(); const addDay = (start, n) => { const d = new Date(Date.UTC(2026, 9, 3 + n - 1 + start)); dates.add(d.toISOString().slice(0, 10)); };
  for (let n = 1; n <= 79; n++) if (n % 5 !== 0) addDay(0, n); for (let n = 1; n <= 30; n++) addDay(0, n); for (let n = 1; n <= 20; n++) addDay(25, n);
  for (const [label, extra, hasCode] of [['no code', '', false], ['with a code', "localStorage.setItem('lg.me.v1', JSON.stringify({ v: 1, code: 'amber-brook-cedar-42' }));", true]]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const page = await ctx.newPage(); const errors = [];
    page.on('console', (m) => { if (m.type() === 'error' && !/favicon|manifest|apple-touch|404/.test(m.text())) errors.push(m.text()); }); page.on('pageerror', (e) => errors.push('pageerror ' + e.message));
    await page.clock.setFixedTime(new Date('2026-12-20T12:00:00')); await page.addInitScript('window.__YC_OVERFLOW = new Map();'); await page.addInitScript(phone(extra));
    await page.goto(BASE + '/me/year/?y=2026'); await page.waitForFunction(() => document.body.dataset.ready, null, { timeout: 15000 });
    ok(await page.evaluate(() => !!window.LogicersMeStats && !!window.LogicersMe), 'real modules (' + label + '): me-stats.js and me.js are loaded as classic scripts');
    eq(await page.evaluate(() => document.documentElement.lang), 'es', 'real modules (' + label + '): the site\'s own language pick (lg.findout.lang) is used');
    const sr = await page.$$eval('.yc-sr', (n) => n.map((e) => e.textContent));
    eq(sr.length, 5, 'real modules (' + label + '): cover, days, spot, words and closing (no story played; no /dist on localhost)');
    eq(await count(page, '.yc-slide'), 5 + (hasCode ? 0 : 1), 'real modules (' + label + '): the code screen only without a code');
    ok(sr[1].startsWith(dates.size + ' '), 'real modules (' + label + '): the days played are the days of the three games together (' + dates.size + '): ' + sr[1]);
    ok(/4\.?821/.test(sr[0]) && /3 oct/.test(sr[0]), 'real modules (' + label + '): the Logicer number and the first day come from the record: ' + sr[0]);
    ok(sr[2].includes('Tú decides'), 'real modules (' + label + '): the best game is named in Spanish through opts.name (30 of 30 of Your Call): ' + sr[2]);
    ok(/8/.test(sr[3]) && /20 /.test(sr[3]), 'real modules (' + label + '): Altitude\'s best height 8 and its 20 climbs: ' + sr[3]);
    for (let i = 0; i < 5; i++) { await scrollTo(page, i); await sleep(1500); ok((await inkOf(page, i)) > 6, 'real modules (' + label + '): screen ' + i + ' is drawn'); }
    await scrollTo(page, 1); await sleep(300); await page.screenshot({ path: path.join(SHOTS, 'phone-real-' + (hasCode ? 'code' : 'nocode') + '-2.png') });
    await sleep(3500);                                                  // me.js may start its own sync after 3 s: it must not break the page
    ok(errors.length === 0, 'real modules (' + label + '): no console errors ' + JSON.stringify(errors));
    ok((await page.evaluate(() => [...window.__YC_OVERFLOW.values()])).length === 0, 'real modules (' + label + '): nothing too wide');
    await ctx.close();
  }
}

/* ================= E: reduced motion, keyboard, language choice, a bad query ================= */
{
  const { ctx, page } = await open('still', { reduced: true, lang: 'en', hasCode: true });
  await scrollTo(page, 1); await sleep(120); const a = await hashOf(page, 1); await sleep(1500); const b = await hashOf(page, 1);
  ok(a === b && (await inkOf(page, 1)) > 6, 'reduced motion: a screen is final at once');
  const tr = await page.evaluate(() => getComputedStyle(document.querySelector('.yc-thumb')).transitionDuration);
  ok(/^0s|0.001|0s/.test(tr), 'reduced motion: the dot does not glide (' + tr + ')');
  await ctx.close();
}
{
  const { ctx, page } = await open('keys', { lang: 'en', hasCode: true, desktop: true });
  await page.focus('#yc-deck'); await page.keyboard.press('ArrowRight'); await sleep(700); await page.keyboard.press('ArrowRight'); await sleep(700);
  eq(await page.evaluate(() => [...document.querySelectorAll('.yc-dot')].findIndex((d) => d.hasAttribute('aria-current'))), 2, 'ArrowRight twice: the third screen');
  await page.keyboard.press('ArrowLeft'); await sleep(700);
  eq(await page.evaluate(() => [...document.querySelectorAll('.yc-dot')].findIndex((d) => d.hasAttribute('aria-current'))), 1, 'ArrowLeft: back one');
  ok(await page.isVisible('#yc-next'), 'a computer shows the arrows'); await page.click('#yc-next'); await sleep(700);
  eq(await page.evaluate(() => [...document.querySelectorAll('.yc-dot')].findIndex((d) => d.hasAttribute('aria-current'))), 2, 'the next arrow works');
  await page.click('.yc-dot:nth-child(5)'); await sleep(800);
  eq(await page.evaluate(() => [...document.querySelectorAll('.yc-dot')].findIndex((d) => d.hasAttribute('aria-current'))), 4, 'a dot goes to its screen');
  /* on a computer Share opens the save sheet */
  await page.click('#yc-share'); await page.waitForSelector('#yc-save[open]'); ok(await page.isVisible('#yc-save-a'), 'a computer: the save sheet');
  await page.screenshot({ path: path.join(SHOTS, 'desktop-save-sheet.png') });
  await page.keyboard.press('Escape'); await sleep(100);
  await page.screenshot({ path: path.join(SHOTS, 'desktop-deck.png') });
  await ctx.close();
}
{
  const t = async (opts, want, label) => { const { ctx, page } = await open('lang', { hasCode: true, ...opts }); eq(await page.evaluate(() => document.documentElement.lang), want, label); await ctx.close(); };
  await t({ ls: { 'lg.findout.lang': 'fr' } }, 'fr', 'the site\'s own language pick');
  await t({ ls: { 'lg.findout.lang': 'fr' }, lang: 'tr' }, 'tr', '?lang= beats the pick');
  await t({ ls: { 'lg.findout.lang': 'zz' }, locale: 'it-IT' }, 'it', 'a bad pick falls to the phone\'s language');
  await t({ locale: 'pt-BR' }, 'pt', 'the phone\'s language');
  await t({ locale: 'de-DE' }, 'en', 'a language the site has not: English');
}
{
  const { ctx, page } = await open('badq', { q: '?y=1999', lang: 'en', hasCode: true });
  ok(/2026/.test(await page.title()), 'a bad year falls to the open card'); await ctx.close();
}
/* Share on a phone: the files go to the share sheet with the text, and cancelling opens nothing */
{
  const init = `window.__shared = []; navigator.canShare = (d) => !!(d && d.files && d.files.length); navigator.share = (d) => { window.__shared.push({ n: d.files.length, type: d.files[0].type, name: d.files[0].name, size: d.files[0].size, text: d.text }); return Promise.resolve(); };`;
  const { ctx, page } = await open('phone-share', { lang: 'en', hasCode: true, init });
  await scrollTo(page, 1); await sleep(400); await page.click('#yc-share'); await sleep(600);
  const got = await page.evaluate(() => window.__shared);
  eq(got.length, 1, 'phone: navigator.share called once'); if (got[0]) { eq([got[0].n, got[0].type], [1, 'image/png'], 'phone: one png'); ok(got[0].size > 20000 && /y2026-2/.test(got[0].name), 'phone: a real picture named for its screen (' + got[0].name + ', ' + got[0].size + ')'); ok(/2026/.test(got[0].text), 'phone: with the share text: ' + got[0].text); }
  ok(!(await page.evaluate(() => !!document.getElementById('yc-save') && document.getElementById('yc-save').open)), 'phone: no save sheet when the share sheet worked');
  await ctx.close();
}
{
  const init = `navigator.canShare = () => true; navigator.share = () => Promise.reject(new DOMException('x', 'AbortError'));`;
  const { ctx, page } = await open('phone-cancel', { lang: 'en', hasCode: true, init });
  await page.click('#yc-share'); await sleep(600);
  ok(!(await page.evaluate(() => !!document.getElementById('yc-save') && document.getElementById('yc-save').open)), 'cancelling the share sheet does not open ours');
  await ctx.close();
}
{
  const init = `navigator.canShare = () => true; navigator.share = () => Promise.reject(new DOMException('x', 'NotAllowedError'));`;
  const { ctx, page } = await open('phone-fail', { lang: 'en', hasCode: true, init });
  await page.click('#yc-share'); await sleep(600);
  ok(await page.evaluate(() => document.getElementById('yc-save').open), 'a share sheet that fails opens the save sheet');
  await ctx.close();
}

await browser.close(); server.close();
console.log((fail ? 'FAILED ' : 'ok ') + pass + ' passed, ' + fail + ' failed; pictures in ' + SHOTS);
process.exit(fail ? 1 : 0);
