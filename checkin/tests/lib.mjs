/* Check-in tests: the shared start-up (chat C, 4 Nov 2026).
   Static server on 4180 serving the test copy of the site (checkin/ + the real shared assets), chat B's real Worker on 4181. */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { realApi, staticServer } from './servers.mjs';
const require = createRequire(import.meta.url);
export const { chromium } = require('playwright');

export const SITE_ROOT = process.env.CK_SITE || '/home/claude/work/site';
export const OUT = process.env.CK_OUT || '/home/claude/work/shots';
export const SITE = 'http://127.0.0.1:4180';
/* the words the pages show, from the strings file the tests run with (CK_LANG: en by default), so a check reads the page's own words */
export const LANG = process.env.CK_LANG || 'en';
export const WORDS = Object.assign({}, JSON.parse(fs.readFileSync(new URL('../strings.en.json', import.meta.url))),
  LANG === 'en' ? {} : JSON.parse(fs.readFileSync(new URL('../strings.' + LANG + '.json', import.meta.url))));
export const W = (k, vars) => String(WORDS[k] || '').replace(/\{(\w+)\}/g, (m, v) => (vars && v in vars ? String(vars[v]) : m));
/* the consent card: Yes, then the two optional taps (age by its place in the list, or null to skip; country 'yes' | 'skip' | a code) */
export async function consentYes(page, age, country) {
  await page.locator('.ck-consent-acts .btn.solid').click();
  await page.waitForSelector('.ck-consent .ck-chips .chip[data-age]');
  if (age === null || age === undefined) await page.click('.ck-consent .ck-skiplink'); else await page.locator('.ck-consent .ck-chips .chip[data-age]').nth(age).click();
  await page.waitForSelector('.ck-consent .ck-ask');
  const live = await page.$('.ck-consent .ck-chips .chip:not([data-age])');
  if (country === 'yes' && live) await page.locator('.ck-consent .ck-chips .chip:not([data-age])').first().click();
  else if (country && country !== 'skip' && country !== 'yes') { if (live) await page.locator('.ck-consent .ck-chips .chip:not([data-age])').nth(1).click(); await page.selectOption('.ck-consent .ck-select', country); }
  else await page.click('.ck-consent .ck-skiplink');
}
export const API = 'http://127.0.0.1:4181';
fs.mkdirSync(OUT, { recursive: true });

export async function boot() {
  const site = await staticServer(4180, SITE_ROOT);
  const api = await realApi(4181, { siteBase: SITE });
  const browser = await chromium.launch();
  return { site, api, browser, close: async () => { await browser.close(); await site.close(); await api.close(); } };
}

export const VIEWS = [
  { id: 'm', w: 360, h: 740, mobile: true },
  { id: 'd', w: 1280, h: 800, mobile: false }
];

/* a page with the mock API wired in, errors collected */
export async function open(browser, view, scheme, opts = {}) {
  const ctx = await browser.newContext({
    viewport: { width: view.w, height: view.h }, colorScheme: scheme, deviceScaleFactor: 1,
    isMobile: !!view.mobile, hasTouch: !!view.mobile, reducedMotion: opts.reduced ? 'reduce' : 'no-preference',
    locale: opts.locale || 'en-GB', permissions: ['clipboard-read', 'clipboard-write'], storageState: opts.storageState
  });
  await ctx.addInitScript(([api, lang]) => { window.CHECKIN_API = api; window.__noTurnstile = true; try { if (lang !== 'en') localStorage.setItem('lg.findout.lang', lang); } catch (e) { /* none */ } }, [API, LANG]);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/ERR_TUNNEL_CONNECTION_FAILED|ERR_NAME_NOT_RESOLVED|Failed to load resource: the server responded/.test(m.text())) errors.push('console: ' + m.text()); });
  page.on('response', (r) => { const u = r.url(); if (u.startsWith('http://127.0.0.1:4180') && r.status() >= 400 && !/favicon/.test(u)) errors.push('http ' + r.status() + ' ' + u); });
  page.on('requestfailed', (r) => { const u = r.url(); if (!/favicon|turnstile|cloudflare/.test(u)) errors.push('requestfailed: ' + u + ' ' + (r.failure() && r.failure().errorText)); });
  return { ctx, page, errors };
}

/* a full-page shot first reads down the page like a person: the cards below the screen enter as they are reached (5 Nov 2026,
   the motion), so the picture shows the whole page; then it goes back to where it was */
export const shot = async (page, name, o = {}) => {
  await new Promise((r) => setTimeout(r, o.wait ?? 420));
  if (o.full) {
    const y = await page.evaluate(() => window.scrollY);
    for (let k = 0; k < 40; k++) { const end = await page.evaluate(() => { window.scrollBy(0, Math.round(innerHeight * 0.6)); return innerHeight + scrollY >= document.documentElement.scrollHeight - 2; }); await new Promise((r) => setTimeout(r, 90)); if (end) break; }
    await new Promise((r) => setTimeout(r, 700));
    await page.evaluate((v) => window.scrollTo(0, v), y); await new Promise((r) => setTimeout(r, 120));
  }
  const f = path.join(OUT, name + '.png'); await page.screenshot({ path: f, fullPage: !!o.full }); return f;
};
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const post = async (p, body) => (await fetch(API + p, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body || {}) })).json();
export const get = async (p) => (await fetch(API + p)).json();

/* does anything stick out sideways? returns the offenders */
export async function overflowX(page) {
  return page.evaluate(() => {
    const W = document.documentElement.clientWidth, bad = [];
    if (document.documentElement.scrollWidth > W + 1) bad.push('page scrollWidth ' + document.documentElement.scrollWidth + ' > ' + W);
    for (const e of document.querySelectorAll('main *')) { const r = e.getBoundingClientRect(); if (r.width > 0 && (r.right > W + 1 || r.left < -1) && !e.closest('.ck-stage,svg,dialog')) bad.push(e.tagName + '.' + (e.className && e.className.baseVal === undefined ? e.className : '') + ' ' + Math.round(r.left) + '..' + Math.round(r.right)); }
    return bad.slice(0, 8);
  });
}

/* a word with a hole in it ("4 of {max}") is a bug the eye finds late: look for it on every screen the tests reach */
export async function noHoles(page) { return page.evaluate(() => { const m = (document.body.innerText || '').match(/\{\w+\}/g); return m ? [...new Set(m)] : []; }); }
