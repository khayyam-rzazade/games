/* My Logicers: tests of the two shared edits (Chat B, 7 Nov 2026).
   node me/tests/shared.test.mjs
   1. The Logicer number on the six home pages is a link to me/ (../me/ from a language folder), only while the box shows the player's own number.
   2. The end-of-day card's line "Keep your streaks on any phone →": absent on the first day played, there from the second, gone with a code,
      in the six languages, linking to me/.
   The pages are the site's own (index.html, it/index.html, ... and the game pages), with the world server faked through the site's own test hook
   (window.LOGICERS_WORLD_API). */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const { start } = await import('./server.mjs');
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const SHOTS = process.env.ME_SHOTS || '/home/claude/work/me-shots';
const LANGS = ['en', 'it', 'es', 'pt', 'fr', 'tr'];
const WORDS = Object.fromEntries(LANGS.map((l) => [l, JSON.parse(fs.readFileSync(path.join(HERE, '../lang/' + l + '.json'), 'utf8'))]));
const HOME = { en: '/', it: '/it/', es: '/es/', pt: '/pt/', fr: '/fr/', tr: '/tr/' };
const LOCALE = { en: 'en-GB', it: 'it-IT', es: 'es-ES', pt: 'pt-BR', fr: 'fr-FR', tr: 'tr-TR' };
let pass = 0; const fails = [];
function check(name, ok, detail) { if (ok) pass++; else { fails.push(name + (detail !== undefined ? ' — ' + JSON.stringify(detail) : '')); console.log('  FAIL', name, detail !== undefined ? JSON.stringify(detail) : ''); } }

const srv = await start(4193);
const browser = await chromium.launch({ executablePath: process.env.ME_CHROME || '/usr/bin/google-chrome' });

/* o.days: how many days (counting back from today) the player finished 100 of Us / Your Call; o.number: a Logicer number; o.code: a code kept here */
async function phone(o) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, locale: LOCALE[o.lang || 'en'] });
  await ctx.addInitScript((c) => {
    window.LOGICERS_WORLD_API = '/__world';
    if (localStorage.getItem('lg.test.seeded')) return; localStorage.setItem('lg.test.seeded', '1');
    localStorage.setItem('lg.findout.lang', c.lang);
    const day = (iso) => Math.round(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / 864e5);
    const t = new Date(); const today = Math.round(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / 864e5);
    const n = (s) => today - day(s) + 1;
    const calls = {}; for (let i = 0; i < c.days; i++) calls[n('2026-10-03') - i] = { c: 1, r: 1, id: 1 };
    const st = { games: c.days ? { 'your-call': { results: calls } } : {} };
    if (c.number) st.world = { logicer: { n: c.number, d: '20261003' } };
    localStorage.setItem('turnsout:v1', JSON.stringify(st));
    if (c.code) localStorage.setItem('lg.me.v1', JSON.stringify({ v: 1, code: c.code }));
  }, { lang: o.lang || 'en', days: o.days || 0, number: o.number || 0, code: o.code || '' });
  const page = await ctx.newPage(); const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.route('**/__world/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ n: 5000 }) }));
  return { ctx, page, errors, close: () => ctx.close() };
}

console.log('the home pages: the number opens My Logicers');
for (const l of LANGS) {
  const href = l === 'en' ? 'me/' : '../me/';
  let p = await phone({ lang: l, days: 3, number: 2418 });
  await p.page.goto(srv.url + HOME[l]); await p.page.waitForFunction(() => { const b = document.getElementById('logicer'); return b && !b.hidden; }, null, { timeout: 8000 }).catch(() => {});
  const own = await p.page.locator('#logicer').evaluate((n) => ({ tag: n.tagName, hidden: n.hidden, href: n.getAttribute('href'), text: n.textContent, resolved: n.href }));
  check(`[${l}] the player's own number is a link to ${href}`, own.tag === 'A' && !own.hidden && own.href === href && /2\D{0,2}418/.test(own.text), own);
  check(`[${l}] the link lands on /me/`, new URL(own.resolved).pathname === '/me/', own.resolved);
  await p.page.screenshot({ path: path.join(SHOTS, `home-${l}-number-link.png`) });
  await p.page.locator('#logicer').click(); await p.page.waitForURL('**/me/**', { timeout: 6000 }).catch(() => {});
  check(`[${l}] a tap opens My Logicers`, new URL(p.page.url()).pathname === '/me/', p.page.url());
  p.errors.length && check(`[${l}] no page errors`, false, p.errors);
  await p.close();
}
{
  /* no number yet: the invitation box ("Finish a game to be Logicer №5,001") is not a link */
  const p = await phone({ lang: 'en', days: 0, number: 0 });
  await p.page.goto(srv.url + '/'); await p.page.waitForFunction(() => { const b = document.getElementById('logicer'); return b && !b.hidden; }, null, { timeout: 8000 }).catch(() => {});
  const inv = await p.page.locator('#logicer').evaluate((n) => ({ hidden: n.hidden, href: n.getAttribute('href'), text: n.textContent }));
  check('no number yet: the invitation box shows and is not a link', !inv.hidden && inv.href === null && /5,001/.test(inv.text), inv);
  await p.close();
}

console.log('the end-of-day card: "Keep your streaks on any phone →"');
const PAGE = '/your-call/';
async function line(o) {
  const p = await phone(o);
  await p.page.goto(srv.url + PAGE); await p.page.waitForTimeout(2200);
  const r = { eod: await p.page.locator('.eod').count(), me: await p.page.locator('.eod-me').count(), p };
  if (r.me) r.text = await p.page.locator('.eod-me').first().innerText(), r.href = await p.page.locator('.eod-me').first().getAttribute('href');
  return r;
}
let r = await line({ lang: 'en', days: 1, number: 2418 });
check('first day played: the card is there and has no such line', r.eod > 0 && r.me === 0, r); await r.p.close();
r = await line({ lang: 'en', days: 2, number: 2418 });
check('second day played, no code: the line is there', r.eod > 0 && r.me === 1 && r.text === WORDS.en['eod.keep'], [r.text, r.me]);
check('the line opens My Logicers', r.href && new URL(r.href, srv.url + PAGE).pathname === '/me/', r.href);
await r.p.page.screenshot({ path: path.join(SHOTS, 'eod-line-en.png'), fullPage: true });
await r.p.page.locator('.eod-me').first().click(); await r.p.page.waitForURL('**/me/**', { timeout: 6000 }).catch(() => {});
check('a tap on it opens /me/', new URL(r.p.page.url()).pathname === '/me/', r.p.page.url());
r.p.errors.length && check('no page errors on the game page', false, r.p.errors); await r.p.close();
r = await line({ lang: 'en', days: 5, number: 2418, code: 'river-blue-cat-42' });
check('a phone that keeps a code: no line', r.eod > 0 && r.me === 0, r); await r.p.close();
for (const l of LANGS) {
  const x = await line({ lang: l, days: 3, number: 2418 });
  check(`[${l}] the line in the language of the page (the same six words as me/lang/${l}.json)`, x.me === 1 && x.text === WORDS[l]['eod.keep'], [x.text, WORDS[l]['eod.keep']]);
  if (l !== 'en') await x.p.page.screenshot({ path: path.join(SHOTS, `eod-line-${l}.png`), fullPage: true });
  await x.p.close();
}
r = await line({ lang: 'it', days: 3, number: 2418 });
check('a language folder\'s game page: the line still reaches /me/ (absolute from the site root)', r.href && new URL(r.href, srv.url + '/it' + PAGE).pathname === '/me/', r.href); await r.p.close();

await browser.close(); await srv.close();
console.log(`\n${pass} checks passed, ${fails.length} failed`);
if (fails.length) { console.log(fails.map((f) => ' - ' + f).join('\n')); process.exit(1); }
