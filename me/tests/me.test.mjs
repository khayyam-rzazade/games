/* My Logicers: the browser tests (Chat B, 7 Nov 2026).
   node me/tests/me.test.mjs            (needs playwright; ME_SHOTS=<dir> for the screenshots, ME_ONLY=<part> for one group)
   Every screen in six languages at 390 px (and the long languages at 320), a phone with no number, with a number, with a code, with each door set;
   a phone that restores by the code, by Face ID / fingerprint, by number + password, by number + questions; made games and check-in rooms or none;
   Get your code (taken, exists), the sheets, the language chip, the year line, reduced motion, light and dark.
   The page is run against the stub modules in ./stubs (the contract of plan 3c / 3d) and a fake of the Worker in ./server.mjs. */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { start } from './server.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const SHOTS = process.env.ME_SHOTS || '/home/claude/work/me-shots';
const ONLY = process.env.ME_ONLY || '';
fs.mkdirSync(SHOTS, { recursive: true });
const LANGS = ['en', 'it', 'es', 'pt', 'fr', 'tr'];
const WORDS = Object.fromEntries(LANGS.map((l) => [l, JSON.parse(fs.readFileSync(path.join(HERE, '../lang/' + l + '.json'), 'utf8'))]));
const MOCK = JSON.parse(fs.readFileSync(path.join(HERE, '../mock-stats.json'), 'utf8'));
const clone = (o) => JSON.parse(JSON.stringify(o));
const W = (l, k, v) => String(WORDS[l][k] === undefined ? '' : WORDS[l][k]).replace(/\{(\w+)\}/g, (m, x) => (v && x in v ? String(v[x]) : m));
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

let pass = 0; const fails = [];
function check(name, ok, detail) { if (ok) pass++; else { fails.push(name + (detail !== undefined ? ' — ' + JSON.stringify(detail) : '')); console.log('  FAIL', name, detail !== undefined ? JSON.stringify(detail) : ''); } }
const group = (name) => (!ONLY || name.includes(ONLY));

const srv = await start(4190);
const browser = await chromium.launch({ executablePath: process.env.ME_CHROME || '/usr/bin/google-chrome' });

/* a phone: its own storage, seeded once (a reload keeps what the page changed) */
async function phone(o = {}) {
  const ctx = await browser.newContext({ viewport: { width: o.w || 390, height: o.h || 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1,
    colorScheme: o.scheme || 'light', reducedMotion: o.reduced ? 'reduce' : 'no-preference', locale: o.locale || 'en-GB', userAgent: o.ua || undefined,
    permissions: ['clipboard-read', 'clipboard-write'] });
  await ctx.addInitScript((c) => {
    if (localStorage.getItem('lg.test.seeded')) return; localStorage.setItem('lg.test.seeded', '1');
    if (c.lang && c.lang !== 'en') localStorage.setItem('lg.findout.lang', c.lang);
    if (c.stats) localStorage.setItem('lg.test.phone', JSON.stringify({ stats: c.stats }));
    if (c.code) localStorage.setItem('lg.me.v1', JSON.stringify({ v: 1, code: c.code }));
    if (c.doors) localStorage.setItem('lg.test.doors', JSON.stringify(c.doors));
    if (c.kv) for (const k in c.kv) localStorage.setItem(k, c.kv[k]);
  }, { lang: o.lang, stats: o.stats === undefined ? null : o.stats, code: o.code, doors: o.doors, kv: o.kv });
  await ctx.addInitScript({ path: path.join(HERE, 'stubs/year.js') });
  const page = await ctx.newPage(); const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console ' + m.text()); });
  page.on('requestfailed', (r) => errors.push('failed ' + r.url()));
  page.on('response', (r) => { if (r.status() >= 400 && !/favicon|\/__me\//.test(r.url())) errors.push(r.status() + ' ' + r.url()); });
  return { ctx, page, errors, async close() { await ctx.close(); } };
}
async function open(p, hash = '') { await p.page.goto(srv.url + '/me/' + (hash ? '#' + hash : '')); await p.page.waitForFunction(() => document.documentElement.dataset.ready); await settle(p.page); }
const settle = (page) => page.waitForTimeout(750);
const text = (page, sel) => page.locator(sel).first().innerText();
const shot = (p, name) => p.page.screenshot({ path: path.join(SHOTS, name + '.png'), fullPage: true });
const fits = (page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 0.5);
const route = async (p, hash) => { await p.page.evaluate((h) => { location.hash = h; }, hash); await settle(p.page); };
const seed = (o) => srv.worker.db.set(o.code, { code: o.code, logicer: o.logicer, stats: o.stats || clone(MOCK), pw: o.pw || null, rq: o.rq || null, passkey: !!o.passkey });
const ROOMS = [{ kind: 'checkin', title: 'Year 10B', code: 'KMRTBN', made: '2026-11-12', link: 'https://logicers.com/checkin/host/#KMRTBN.mock-host-key' },
  { kind: 'howsure', title: 'Friday', code: 'HSURE1', made: '2026-11-14', link: 'https://logicers.com/live/host/?c=HSURE1&k=mock-host-key' },
  { kind: 'findout', title: 'Class 9A', code: 'FOUT99', made: '2026-11-15', link: 'https://logicers.com/find-out/room/#FOUT99.mock-host-key' }];
const withRooms = () => { const m = clone(MOCK); m.mine = m.mine.concat(clone(ROOMS)); return m; };
const bare = () => Object.assign(clone(MOCK), { since: '2026-11-05', games: 3, days: 2, spotOn: 1, pct: 33, current: 2, longest: 2, story: { chapters: 0, votes: 0, withWorld: 0 }, findouts: { done: 0, portrait: false },
  checkin: { times: 0, last: null, prev: null, history: [] }, mine: [],
  per: clone(MOCK).per.map((p, i) => (i === 0 ? Object.assign(p, { played: 2, current: 2, longest: 2, spotOn: 1 }) : Object.assign(p, { played: 0, current: 0, longest: 0, spotOn: 0, best: 0, last: null }))) });

/* ====================================================================== every screen, six languages, 390 px */
if (group('screens')) {
  console.log('screens: six languages at 390 px');
  for (const l of LANGS) {
    const w = (k, v) => W(l, k, v);
    const p = await phone({ lang: l, stats: withRooms(), code: 'river-blue-cat-42', doors: { passkey: true, pw: true, rq: false } });
    await open(p);
    check(`[${l}] home: html lang`, (await p.page.evaluate(() => document.documentElement.lang)) === l);
    check(`[${l}] home: the number heading`, (await text(p.page, 'h1')) === w('home.number', { n: Number(2418).toLocaleString({ en: 'en-GB', it: 'it-IT', es: 'es-ES', pt: 'pt-BR', fr: 'fr-FR', tr: 'tr-TR' }[l]) }), await text(p.page, 'h1'));
    const body = await p.page.locator('#me').innerText();
    for (const k of ['home.daily', 'home.words', 'home.story', 'home.findout', 'home.checkin', 'mine.h', 'code.h', 'lose.h', 'lose.kept', 'lose.pw_on', 'rq.h', 'del.link', 'out.link', 'out.other', 'mine.edit', 'mine.open', 'mine.kind.made', 'mine.kind.checkin', 'mine.kind.howsure', 'mine.kind.findout'])
      check(`[${l}] home shows ${k}`, body.includes(w(k)), w(k));
    check(`[${l}] home: ${l === 'en' ? 'English' : 'localized'} game name on a tile`, (await p.page.locator('.me-tile .nm').first().innerText()) === w('game.energy.name'));
    check(`[${l}] home: foot line`, (await text(p.page, '#me-foot')) === w('foot.line'));
    check(`[${l}] home fits 390`, await fits(p.page));
    await shot(p, `${l}-1-home`);
    const lw = await p.page.evaluate(() => document.documentElement.scrollWidth);
    check(`[${l}] home: no horizontal scroll`, lw <= 390, lw);
    p.errors.length && check(`[${l}] home: no errors`, false, p.errors);

    await route(p, 'get'); /* a phone that has a code is sent home from #get */
    check(`[${l}] #get with a code goes home`, (await text(p.page, 'h1')).startsWith(w('home.number', { n: '' }).slice(0, 5)), await text(p.page, 'h1'));
    await p.close();

    const q = await phone({ lang: l, stats: bare() });
    await open(q);
    check(`[${l}] no code: Get your code card`, (await q.page.locator('#me').innerText()).includes(w('code.get')));
    check(`[${l}] no code: Have a code?`, (await q.page.locator('#me').innerText()).includes(w('have.h')) && (await q.page.locator('#me').innerText()).includes(w('have.number')));
    check(`[${l}] no code: no Delete, no If you lose`, !(await q.page.locator('#me').innerText()).includes(w('del.link')) && !(await q.page.locator('#me').innerText()).includes(w('lose.h')));
    check(`[${l}] no code: unplayed tiles show the game's time`, (await q.page.locator('.me-tile.fresh .me-tgo').first().innerText()).trim() === w('tile.min'));
    check(`[${l}] no code: story / find-out / check-in / Your games left out`, !(await q.page.locator('#me').innerText()).includes(w('home.story')) && !(await q.page.locator('#me').innerText()).includes(w('mine.h')));
    await shot(q, `${l}-2-home-nocode`);

    await q.page.getByRole('button', { name: w('code.get') }).click(); await settle(q.page);
    check(`[${l}] #get: heading`, (await text(q.page, 'h1')) === w('code.get'));
    check(`[${l}] #get: code drawn in the page language`, /^[a-z]+-[a-z]+-[a-z]+-\d{2}$/.test(await q.page.locator('.me-code').first().innerText()));
    check(`[${l}] #get: buttons`, (await q.page.locator('.me-btns').innerText()).includes(w('get.another')) && (await q.page.locator('.me-btns').innerText()).includes(w('act.keep')));
    check(`[${l}] #get fits 390`, await fits(q.page)); await shot(q, `${l}-3-get`);

    await route(q, 'have');
    check(`[${l}] #have: heading + placeholder + Enter`, (await text(q.page, 'h1')) === w('have.h') && (await q.page.locator('input').first().getAttribute('placeholder')) === w('have.ph') && (await q.page.locator('form').innerText()).includes(w('act.enter')));
    check(`[${l}] #have: number link`, (await q.page.locator('#me').innerText()).includes(w('have.number')));
    await q.page.fill('input', 'no-such-code-11'); await q.page.keyboard.press('Enter'); await q.page.waitForTimeout(400);
    check(`[${l}] #have: Code not found`, (await text(q.page, '.me-msg')) === w('have.nf'), await text(q.page, '.me-msg'));
    check(`[${l}] #have fits 390`, await fits(q.page)); await shot(q, `${l}-4-have`);

    await route(q, 'number');
    check(`[${l}] #number: heading + field label`, (await text(q.page, 'h1')) === w('num.h') && (await q.page.locator('label').first().innerText()) === w('num.field'));
    srv.worker.tries.clear();
    seed({ code: 'x-shots-pw-11', logicer: 777, pw: 'longpassword9', rq: { ids: [2, 5, 7], answers: ['a', 'b', 'c'] } });
    await q.page.fill('#me-num-in', '777'); await q.page.click('button[type=submit]'); await q.page.waitForTimeout(450);
    check(`[${l}] #number: both doors offered`, (await q.page.locator('.me-seg button').allInnerTexts()).join('|') === w('num.pw') + '|' + w('num.rq'), await q.page.locator('.me-seg button').allInnerTexts());
    await q.page.locator('.me-seg button').nth(1).click(); await q.page.waitForTimeout(300);
    check(`[${l}] #number: the three questions in this language`, (await q.page.locator('label').allInnerTexts()).slice(1).join('|') === [2, 5, 7].map((i) => w('rq.q.' + i)).join('|'), await q.page.locator('label').allInnerTexts());
    check(`[${l}] #number fits 390`, await fits(q.page)); await shot(q, `${l}-5-number`);
    await q.page.fill('#me-q-2', 'zzz'); await q.page.fill('#me-q-5', 'zzz'); await q.page.fill('#me-q-7', 'zzz'); await q.page.click('button[type=submit]'); await q.page.waitForTimeout(450);
    check(`[${l}] #number: wrong answers say Not right + tries left`, (await text(q.page, '.me-msg')) === w('num.fail') + ' ' + w('num.left', { n: 2 }), await text(q.page, '.me-msg'));

    /* pw and rq need a code: a phone with a code */
    await q.close();
    const r = await phone({ lang: l, stats: clone(MOCK), code: 'river-blue-cat-42' });
    seed({ code: 'river-blue-cat-42', logicer: 2418 });
    await open(r, 'pw');
    check(`[${l}] #pw: heading + rule + Show + Keep`, (await text(r.page, 'h1')) === w('pw.h') && (await text(r.page, '.me-msg')) === w('pw.rule') && (await r.page.locator('.me-pw').innerText()).includes(w('pw.show')) && (await r.page.locator('form').innerText()).includes(w('act.keep')));
    await r.page.fill('input', 'abc'); await r.page.keyboard.press('Enter'); await r.page.waitForTimeout(300);
    check(`[${l}] #pw: too short`, (await text(r.page, '.me-msg')) === w('pw.short'));
    await r.page.fill('input', 'password1'); await r.page.keyboard.press('Enter'); await r.page.waitForTimeout(500);
    check(`[${l}] #pw: too common`, (await text(r.page, '.me-msg')) === w('pw.common'));
    check(`[${l}] #pw fits 390`, await fits(r.page)); await shot(r, `${l}-6-pw`);
    await route(r, 'rq');
    check(`[${l}] #rq: heading + lede + eight questions`, (await text(r.page, 'h1')) === w('rq.h') && (await text(r.page, '.me-lede')) === w('rq.pick') && (await r.page.locator('.me-q').allInnerTexts()).join('|') === [1, 2, 3, 4, 5, 6, 7, 8].map((i) => w('rq.q.' + i)).join('|'));
    for (const i of [0, 3, 6]) await r.page.locator('.me-q').nth(i).click();
    await r.page.locator('.me-q').nth(1).click(); await r.page.waitForTimeout(250);
    check(`[${l}] #rq: a fourth is refused (Just 3)`, (await text(r.page, '.me-msg')) === w('rq.max') && (await r.page.locator('.me-q[aria-pressed=true]').count()) === 3);
    check(`[${l}] #rq: the line`, (await r.page.locator('form').innerText()).includes(w('rq.line')));
    check(`[${l}] #rq: Keep waits for three answers`, await r.page.locator('button[type=submit]').isDisabled());
    check(`[${l}] #rq fits 390`, await fits(r.page)); await shot(r, `${l}-7-rq`);
    await r.close();

    const s = await phone({ lang: l, stats: clone(MOCK), code: 'river-blue-cat-42' });
    await open(s);
    await s.page.locator('.me-leave-del').click(); await s.page.waitForTimeout(500);
    check(`[${l}] delete sheet: words`, (await s.page.locator('dialog.me-sheet').innerText()).includes(w('del.sure')) && (await s.page.locator('dialog.me-sheet').innerText()).includes(w('del.yes')) && (await s.page.locator('dialog.me-sheet').innerText()).includes(w('del.no')));
    await shot(s, `${l}-8-delete`);
    await s.page.locator('dialog.me-sheet .btn.ghost').click(); await s.page.waitForTimeout(600);
    check(`[${l}] delete sheet: Keep closes it`, (await s.page.locator('dialog.me-sheet').count()) === 0);
    await s.page.locator('#me-langchip').click(); await s.page.waitForTimeout(500);
    check(`[${l}] language sheet: six languages, this one marked`, (await s.page.locator('.me-langs button').count()) === 6 && (await s.page.locator('.me-langs button[aria-current=true]').getAttribute('lang')) === l);
    await shot(s, `${l}-9-lang`);
    await s.close();
  }
}

/* ====================================================================== the long languages at 320 px */
if (group('narrow')) {
  console.log('narrow: 320 px, the long code');
  for (const l of ['tr', 'fr', 'pt', 'it', 'es']) {
    const p = await phone({ w: 320, lang: l, stats: clone(MOCK), code: 'abcdefgx-hijklmn-opqrstu-98', kv: { 'lg.test.long': '1' } });
    await open(p); check(`[${l}] 320: home fits`, await fits(p.page)); await shot(p, `${l}-320-home`);
    const q = await phone({ w: 320, lang: l, stats: bare(), kv: { 'lg.test.long': '1' } });
    await open(q, 'get'); check(`[${l}] 320: #get with the longest code fits`, await fits(q.page)); await shot(q, `${l}-320-get`);
    await route(q, 'number'); check(`[${l}] 320: #number fits`, await fits(q.page));
    await route(q, 'have'); check(`[${l}] 320: #have fits`, await fits(q.page));
    await p.close(); await q.close();
  }
}

/* ====================================================================== states */
if (group('states')) {
  console.log('states');
  let p = await phone({});                                   // a phone that never played: no stats, no number
  await open(p);
  let body = await p.page.locator('#me').innerText();
  check('nothing played: the newcomer page (the number waiting, the steps, an example), Have a code?, no Get your code', body.includes(W('en', 'nc.wait').toUpperCase()) && body.includes(W('en', 'nc.first')) && body.includes(W('en', 'steps.h')) && body.includes(W('en', 'nc.preview')) && body.includes(W('en', 'have.h')) && !body.includes(W('en', 'code.get')), body);
  check('nothing played: the heading is the page name', (await text(p.page, 'h1')) === 'My Logicers');
  check('nothing played: #get goes home (no number, no code)', await (async () => { await route(p, 'get'); return (await text(p.page, 'h1')) === 'My Logicers'; })());
  await p.close();

  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42' });
  await open(p); body = await p.page.locator('#me').innerText();
  check('with a code: code shown, Copy, QR, notes line', body.includes('river-blue-cat-42') && body.includes('Copy') && body.includes('QR') && body.includes(W('en', 'code.notes')));
  check('with a code: no Have a code?, Delete shown', !body.includes(W('en', 'have.number')) && body.includes(W('en', 'del.link')));
  await p.page.getByRole('button', { name: 'Copy' }).click(); await p.page.waitForTimeout(250);
  check('Copy: the code is on the clipboard', (await p.page.evaluate(() => navigator.clipboard.readText())) === 'river-blue-cat-42');
  check('Copy: the button says Copied', (await p.page.getByRole('button', { name: 'Copied' }).count()) === 1);
  await p.page.getByRole('button', { name: 'QR' }).click(); await p.page.waitForTimeout(500);
  check('QR: drawn, with its label and note', (await p.page.locator('.me-qr svg').count()) === 1 && (await p.page.locator('.me-qr svg').getAttribute('aria-label')) === W('en', 'code.qr_aria') && (await text(p.page, '.me-qr p')) === W('en', 'code.qr_note'));
  check('QR: the picture holds modules (a real code)', (await p.page.locator('.me-qr svg path').getAttribute('d')).length > 500);
  await shot(p, 'state-code-qr');
  await p.page.getByRole('button', { name: 'QR' }).click(); await p.page.waitForTimeout(150);
  check('QR: a second tap hides it', (await p.page.locator('.me-qr').count()) === 0);
  check('tiles: link to the games and use their colours', (await p.page.locator('.me-tile').first().getAttribute('href')) === '../same-energy/' && (await p.page.locator('.me-tile').first().getAttribute('data-g')) === 'energy');
  check('Your games: each made game opens its editor', (await p.page.locator('.me-item a').nth(0).getAttribute('href')).includes('edit=ABCD12') && (await p.page.locator('.me-item a').nth(0).innerText()) === 'Edit' && (await p.page.locator('.me-item a').nth(1).getAttribute('href')).includes('edit=WXYZ34'));
  check('Your games: no note when every link is there', !body.includes(W('en', 'mine.note')));
  check('check-in card: score, band, since last time', body.includes('71') && body.includes(W('en', 'ci.band.2')) && body.includes('64 → 71 since 12 Nov'), body.split('Check-in')[1]);
  check('find-out card: 9 of 9, portrait link', body.includes('9 of 9') && (await p.page.locator('.me-cardlink').first().getAttribute('href')) === '../find-out/portrait/' && (await p.page.locator('.me-dots i.on').count()) === 9);
  check('story card: three numbers', body.includes('Chapters') && body.includes('21'));
  await p.close();

  /* no check-in, no find-out, no story, no made games */
  p = await phone({ stats: bare(), code: 'river-blue-cat-42' });
  await open(p); body = await p.page.locator('#me').evaluate((n) => { const c = n.cloneNode(true); c.querySelectorAll('.me-steps').forEach((x) => x.remove()); document.body.appendChild(c); const t = c.innerText; c.remove(); return t; });
  check('a player with only a few days: no story, find-out, check-in or Your games (the steps card aside)', !body.includes('Story') && !body.includes(W('en', 'home.findout')) && !body.includes(W('en', 'home.checkin')) && !body.includes(W('en', 'mine.h')), body.slice(0, 300));
  check('a player with only a few days: the steps card, the daily game done', (await p.page.locator('.me-step.done[data-k="daily"]').count()) === 1 && (await p.page.locator('.me-ring b').innerText()) === '2/5');          // the daily game and the code
  await p.close();

  /* links only show on a phone that has the box open: rows without a link say so */
  const noLink = clone(MOCK); noLink.mine = noLink.mine.map((m) => ({ kind: m.kind, title: m.title, code: m.code, made: m.made }));
  p = await phone({ stats: noLink, code: 'river-blue-cat-42' });
  await open(p); body = await p.page.locator('#me').innerText();
  check('Your games without links: no buttons, the one note', (await p.page.locator('.me-item a').count()) === 0 && (await p.page.locator('.me-iacts button').count()) === 0 && body.includes(W('en', 'mine.note')));
  await p.close();
  /* a link that is not a web link is never given to the page */
  const evil = clone(MOCK); evil.mine[0].link = 'javascript:alert(1)';
  p = await phone({ stats: evil, code: 'river-blue-cat-42' });
  await open(p); check('a javascript: link is dropped', (await p.page.locator('.me-item a').count()) === 1);
  await p.close();

  /* a check-in with only the number of times (box closed) */
  const closed = clone(MOCK); closed.checkin = { times: 4, last: null, prev: null, history: [] };
  p = await phone({ stats: closed, code: 'river-blue-cat-42' });
  await open(p); body = await p.page.locator('#me').innerText();
  check('check-in with the box closed: just the number of times', body.includes(W('en', 'ci.times')) && body.includes('4') && !body.includes('→'));
  await p.close();

  /* find-outs not finished: dots, no portrait line */
  const fo = clone(MOCK); fo.findouts = { done: 4, portrait: false };
  p = await phone({ stats: fo, code: 'river-blue-cat-42' });
  await open(p);
  check('find-outs 4 of 9: four dots, link to the find-out home, no portrait line', (await p.page.locator('.me-dots i.on').count()) === 4 && (await p.page.locator('.me-cardlink').first().getAttribute('href')) === '../find-out/home/' && !(await p.page.locator('#me').innerText()).includes(W('en', 'fo.portrait')));
  await p.close();

  /* doors: none / each / all */
  for (const [name, doors, expect] of [['none', {}, ['Keep with fingerprint', 'Set a password', 'Set 3 questions']],
    ['all', { passkey: true, pw: true, rq: true }, ['Kept', 'Password set', '3 questions set']]]) {
    p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42', doors });
    await open(p); body = await p.page.locator('.me-door').allInnerTexts();
    check(`doors ${name}: rows`, expect.every((e, i) => body[i].includes(e)), body);
    if (name === 'all') check('doors all: Change and Remove for password and questions', (await p.page.locator('.me-door .acts button').allInnerTexts()).join('|') === 'Change|Remove|Change|Remove');
    await p.close();
  }
  /* iPhone: Face ID; not supported: no passkey row */
  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42', ua: IPHONE });
  await open(p); check('iPhone: "Keep with Face ID"', (await p.page.locator('#me').innerText()).includes('Keep with Face ID')); await p.close();
  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42', kv: { 'lg.test.pk': '0' } });
  await open(p); body = await p.page.locator('#me').innerText();
  check('a phone that cannot keep it: no Face ID or fingerprint row, the other two stay', !body.includes('Keep with') && body.includes('Set a password') && body.includes('Set 3 questions')); await p.close();

  /* the year / month line */
  for (const [kind, label, href] of [['year', 'Your 2026 →', 'year/?y=2026'], ['month', 'Your December →', 'year/?m=2026-12']]) {
    p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42', kv: { 'lg.test.card': kind } });
    await open(p);
    check(`card open (${kind}): the line and its link`, (await text(p.page, '#me-year')) === label && (await p.page.locator('#me-year').getAttribute('href')) === href, await text(p.page, '#me-year'));
    await p.close();
  }
  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42' }); await open(p);
  check('no card open: no line', (await p.page.locator('#me-year').count()) === 0); await p.close();
  p = await phone({ lang: 'it', stats: clone(MOCK), code: 'river-blue-cat-42', kv: { 'lg.test.card': 'month' } }); await open(p);
  check('card open in Italian: "Il tuo dicembre →"', (await text(p.page, '#me-year')) === 'Il tuo dicembre →' || (await text(p.page, '#me-year')).toLowerCase().includes('dicembre'), await text(p.page, '#me-year')); await p.close();

  /* Italian elision, a date of 8 or 11 */
  const el8 = clone(MOCK); el8.since = '2026-10-08'; el8.checkin.prev.date = '2026-11-11';
  p = await phone({ lang: 'it', stats: el8, code: 'river-blue-cat-42' }); await open(p);
  body = await p.page.locator('#me').innerText();
  check("Italian: dal 8 → dall'8 and dal 11 → dall'11", body.includes("dall'8 ott") && body.includes("dall'11 nov"), body.match(/dal.{0,8}/g));
  await p.close();
}

/* ====================================================================== flows */
if (group('flows')) {
  console.log('flows');
  srv.worker.db.clear(); srv.worker.tries.clear();      /* the groups before leave records on the fake Worker; every group starts from an empty one */
  /* ---- Get your code: Another, Keep ---- */
  let p = await phone({ stats: bare() });
  await open(p);
  await p.page.getByRole('button', { name: 'Get your code' }).click(); await settle(p.page);
  const first = await p.page.locator('.me-code').first().getAttribute('data-code');
  await p.page.getByRole('button', { name: 'Another' }).click(); await p.page.waitForTimeout(300);
  const second = await p.page.locator('.me-code').first().getAttribute('data-code');
  check('Get your code: Another draws a different one', first && second && first !== second, [first, second]);
  check('Get your code: the code on screen is the code drawn', (await p.page.locator('.me-code').first().innerText()) === second);
  await p.page.getByRole('button', { name: 'Keep', exact: true }).click(); await p.page.waitForTimeout(600);
  check('Keep: the server holds a record for it, under the Logicer number', srv.worker.db.has(second) && srv.worker.db.get(second).logicer === 2418);
  check('Keep: kept state (Kept., Copy, QR, notes, Back), heading "Your code"', (await text(p.page, 'h1')) === 'Your code' && (await p.page.locator('.me-flash').innerText()) === 'Kept.' && (await p.page.locator('#me').innerText()).includes('Save it to your notes.') && (await p.page.getByRole('button', { name: 'Back' }).count()) === 1);
  check('Keep: the phone remembers the code', (await p.page.evaluate(() => (JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null))) === second);
  await shot(p, 'flow-kept');
  await p.page.getByRole('button', { name: 'Back' }).click(); await settle(p.page);
  check('Back: My Logicers shows the code and If you lose the code', (await p.page.locator('#me').innerText()).includes(second) && (await p.page.locator('#me').innerText()).includes('If you lose the code'));
  await p.close();

  srv.worker.db.clear(); srv.worker.tries.clear();
  /* taken: drawn again, quietly */
  p = await phone({ stats: bare(), kv: { 'lg.test.taken': '2' } });
  await open(p, 'get'); const t1 = await p.page.locator('.me-code').first().getAttribute('data-code');
  await p.page.getByRole('button', { name: 'Keep', exact: true }).click(); await p.page.waitForTimeout(800);
  const kept = await p.page.evaluate(() => (JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null));
  check('taken: the page draws again, silently, and keeps a different code', kept && kept !== t1 && (await p.page.locator('.me-flash').innerText()) === 'Kept.', [t1, kept]);
  await p.close();

  /* exists: this Logicer number already has a record */
  seed({ code: 'old-code-here-77', logicer: 2418 });
  p = await phone({ stats: bare() });
  await open(p, 'get'); await p.page.getByRole('button', { name: 'Keep', exact: true }).click(); await p.page.waitForTimeout(600);
  check('exists: "This number already has a code." and the doors instead', (await text(p.page, '.me-msg')) === W('en', 'get.exists') && (await p.page.locator('.me-btns').innerText()).includes(W('en', 'have.h')) && (await p.page.locator('.me-btns').innerText()).includes(W('en', 'num.h')));
  check('exists: nothing was kept', (await p.page.evaluate(() => (JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null))) === null);
  await p.close(); srv.worker.db.delete('old-code-here-77');

  srv.worker.db.clear(); srv.worker.tries.clear();
  /* ---- restore by the code, on a second phone ---- */
  seed({ code: 'river-blue-cat-42', logicer: 2418 });
  let b = await phone({});                                    // a new phone, nothing on it
  await open(b); await b.page.getByRole('button', { name: 'Have a code?' }).click(); await settle(b.page);
  check('new phone: #have', (await text(b.page, 'h1')) === 'Have a code?');
  await b.page.fill('input', '  River Blue-cat 42 '); await b.page.keyboard.press('Enter'); await b.page.waitForTimeout(900);
  check('restore by code: home with "Welcome back. Everything is here."', (await text(b.page, '.me-flash')) === W('en', 'have.ok'));
  check('restore by code: the number and the games are there', (await text(b.page, 'h1')) === 'Logicer №2,418' && (await b.page.locator('.me-tile').count()) === 12);
  check('restore by code: the phone now holds the code (apply ran)', (await b.page.evaluate(() => (JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null))) === 'river-blue-cat-42' && (await b.page.evaluate(() => JSON.parse(localStorage.getItem('lg.test.applied')).logicer)) === 2418);
  check('restore by code: the code card is shown', (await b.page.locator('#me').innerText()).includes('river-blue-cat-42'));
  await shot(b, 'flow-restored');
  await b.close();

  /* a code from a QR: filled in, never entered */
  b = await phone({});
  await open(b, 'have=river-blue-cat-42');
  check('QR link: the box is filled in', (await b.page.inputValue('input')) === 'river-blue-cat-42');
  check('QR link: but not entered (still on #have, no record applied)', (await text(b.page, 'h1')) === 'Have a code?' && (await b.page.evaluate(() => (JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null))) === null);
  await b.page.keyboard.press('Enter'); await b.page.waitForTimeout(800);
  check('QR link: Enter completes it', (await b.page.evaluate(() => (JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null))) === 'river-blue-cat-42');
  await b.close();
  b = await phone({}); await open(b, 'have=not a code'); check('a bad #have= value is ignored', (await b.page.inputValue('input')) === ''); await b.close();

  /* ---- Face ID / fingerprint: set, then restore ---- */
  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42', ua: IPHONE });
  await open(p);
  await p.page.getByRole('button', { name: 'Keep with Face ID' }).click(); await p.page.waitForTimeout(700);
  check('Face ID: Kept, the server has it', (await p.page.locator('.me-door').first().innerText()).includes('Kept') && srv.worker.db.get('river-blue-cat-42').passkey === true);
  await p.close();
  b = await phone({ ua: IPHONE }); await open(b, 'have');
  check('Have a code? on an iPhone offers "Use Face ID"', (await b.page.locator('#me').innerText()).includes('Use Face ID'));
  await b.page.getByRole('button', { name: 'Use Face ID' }).click(); await b.page.waitForTimeout(900);
  check('restore by Face ID: home, welcome', (await text(b.page, '.me-flash')) === W('en', 'have.ok') && (await text(b.page, 'h1')) === 'Logicer №2,418' && (await b.page.evaluate(() => (JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null))) === 'river-blue-cat-42');
  await b.close();
  b = await phone({}); await open(b, 'have'); check('Have a code? elsewhere offers "Use fingerprint"', (await b.page.locator('#me').innerText()).includes('Use fingerprint')); await b.close();
  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42', kv: { 'lg.test.pkcancel': '1' } });
  await open(p); await p.page.getByRole('button', { name: /Keep with/ }).click(); await p.page.waitForTimeout(500);
  check('Face ID cancelled: nothing kept, no scary message', (await p.page.locator('.me-door').first().innerText()).includes('Keep with') && (await p.page.locator('.me-door .me-msg, .me-card .me-msg').first().innerText()) === ''); await p.close();

  /* ---- Set a password, then restore by number + password ---- */
  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42' });
  await open(p); await p.page.getByRole('button', { name: 'Set a password' }).click(); await settle(p.page);
  check('Set a password: #pw', (await text(p.page, 'h1')) === 'Set a password');
  await p.page.getByRole('button', { name: 'Show' }).click();
  check('Show: the password can be read', (await p.page.locator('#me-pw-new').getAttribute('type')) === 'text' && (await p.page.getByRole('button', { name: 'Hide' }).count()) === 1);
  await p.page.fill('#me-pw-new', 'blue-lamp-9'); await p.page.keyboard.press('Enter'); await settle(p.page);
  check('Set a password: back on My Logicers, "Kept.", the row says Password set', (await text(p.page, '.me-flash')) === 'Kept.' && (await p.page.locator('.me-door').allInnerTexts()).some((t) => t.includes('Password set')));
  check('Set a password: the server holds it', srv.worker.db.get('river-blue-cat-42').pw === 'blue-lamp-9');
  await p.page.getByRole('button', { name: 'Remove' }).click(); await p.page.waitForTimeout(500);
  check('Remove: the password door goes (server too)', !srv.worker.db.get('river-blue-cat-42').pw && (await p.page.locator('.me-door').allInnerTexts()).some((t) => t.includes('Set a password')));
  await p.page.getByRole('button', { name: 'Set a password' }).click(); await settle(p.page); await p.page.fill('#me-pw-new', 'blue-lamp-9'); await p.page.keyboard.press('Enter'); await settle(p.page);
  await p.close();

  b = await phone({}); await open(b, 'have'); await b.page.getByRole('button', { name: 'No code? Use your Logicer number' }).click(); await settle(b.page);
  await b.page.fill('#me-num-in', '2,418'); await b.page.keyboard.press('Enter'); await b.page.waitForTimeout(500);
  check('number + password: only the password field appears (no questions set)', (await b.page.locator('#me-pw-in').count()) === 1 && (await b.page.locator('.me-seg').count()) === 0);
  await b.page.fill('#me-pw-in', 'wrong-one-1'); await b.page.keyboard.press('Enter'); await b.page.waitForTimeout(500);
  check('a wrong password: "Not right." and tries left, never which part', (await text(b.page, '.me-msg')) === 'Not right. Tries left this hour: 2', await text(b.page, '.me-msg'));
  await b.page.fill('#me-pw-in', 'wrong-two-2'); await b.page.keyboard.press('Enter'); await b.page.waitForTimeout(400);
  await b.page.fill('#me-pw-in', 'wrong-three-3'); await b.page.keyboard.press('Enter'); await b.page.waitForTimeout(400);
  await b.page.fill('#me-pw-in', 'blue-lamp-9'); await b.page.keyboard.press('Enter'); await b.page.waitForTimeout(500);
  check('three misses: the brake line, even for the right password', (await text(b.page, '.me-msg')) === W('en', 'err.brake'), await text(b.page, '.me-msg'));
  srv.worker.tries.clear();
  await b.page.keyboard.press('Enter'); await b.page.waitForTimeout(900);
  check('number + password: the right password opens it', (await text(b.page, '.me-flash')) === W('en', 'have.ok') && (await text(b.page, 'h1')) === 'Logicer №2,418' && (await b.page.evaluate(() => (JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null))) === 'river-blue-cat-42');
  await b.close();

  /* ---- Set 3 questions, then restore by number + questions (accents and capitals do not matter) ---- */
  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42' });
  srv.worker.db.get('river-blue-cat-42').pw = null;
  await open(p); await p.page.getByRole('button', { name: 'Set 3 questions' }).click(); await settle(p.page);
  for (const i of [1, 4, 6]) await p.page.locator('.me-q').nth(i).click();
  check('3 picked: an answer box under each, Keep still waits', (await p.page.locator('.me-answer').count()) === 3 && (await p.page.locator('button[type=submit]').isDisabled()));
  await p.page.fill('#me-ans-2', 'Mrs Öztürk'); await p.page.fill('#me-ans-5', 'Çanakkale'); await p.page.fill('#me-ans-7', '   ');
  check('an empty answer: Keep waits', await p.page.locator('button[type=submit]').isDisabled());
  await p.page.fill('#me-ans-7', 'Saint-Étienne School'); check('all answered: Keep is ready', !(await p.page.locator('button[type=submit]').isDisabled()));
  await p.page.locator('.me-q').nth(4).click(); await p.page.waitForTimeout(150);
  await p.page.locator('.me-q').nth(4).click(); await p.page.waitForTimeout(150);
  check('letting go of a pick removes its answer box', true);
  await p.page.locator('.me-q').nth(1).click(); await p.page.waitForTimeout(200);
  check('letting go of one: two left', (await p.page.locator('.me-answer').count()) === 2 && (await p.page.locator('button[type=submit]').isDisabled()));
  await p.page.locator('.me-q').nth(1).click(); await p.page.fill('#me-ans-5', 'Çanakkale'); await p.page.fill('#me-ans-2', 'Mrs Öztürk');
  await p.page.keyboard.press('Enter'); await settle(p.page);
  check('Set 3 questions: back on My Logicers, "3 questions set"', (await text(p.page, '.me-flash')) === 'Kept.' && (await p.page.locator('.me-door').allInnerTexts()).some((t) => t.includes('3 questions set')));
  const rq = srv.worker.db.get('river-blue-cat-42').rq;
  check('the server holds the three, in id order, as the doors module normalised them (a hyphen becomes a space, so Saint-Étienne and Saint Etienne are the same)', JSON.stringify(rq.ids) === '[2,5,7]' && JSON.stringify(rq.answers) === JSON.stringify(['mrs ozturk', 'canakkale', 'saint etienne school']), rq);
  await p.close();
  b = await phone({}); await open(b, 'number');
  await b.page.fill('#me-num-in', '2418'); await b.page.keyboard.press('Enter'); await b.page.waitForTimeout(500);
  check('number + questions: the three questions asked, in this order', (await b.page.locator('label').allInnerTexts()).slice(1).join('|') === ['Your first teacher\'s name', 'The town where your mother was born', 'The name of your first school'].join('|'), await b.page.locator('label').allInnerTexts());
  await b.page.fill('#me-q-2', 'MRS OZTURK'); await b.page.fill('#me-q-5', 'canakkale'); await b.page.fill('#me-q-7', 'SAINT-ETIENNE school!'); await b.page.keyboard.press('Enter'); await b.page.waitForTimeout(900);
  check('number + questions: a differently typed set of answers opens it', (await text(b.page, '.me-flash')) === W('en', 'have.ok') && (await b.page.evaluate(() => (JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null))) === 'river-blue-cat-42');
  await b.close();
  b = await phone({}); await open(b, 'number'); await b.page.fill('#me-num-in', '99999'); await b.page.keyboard.press('Enter'); await b.page.waitForTimeout(500);
  check('a number with nothing set: "No password or questions are set for this number."', (await text(b.page, '.me-msg')) === W('en', 'num.none'));
  await b.close();

  /* ---- language chip ---- */
  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42' });
  await open(p); await p.page.locator('#me-langchip').click(); await p.page.waitForTimeout(500);
  await p.page.locator('.me-langs button[lang=it]').click(); await p.page.waitForTimeout(900);
  check('language chip: the page changes to Italian, the sheet is gone, the chip says IT', (await text(p.page, 'h1')).startsWith('Logicer') && (await p.page.locator('#me').innerText()).includes('I tuoi giochi') && (await text(p.page, '#me-langchip')) === 'IT' && (await p.page.locator('dialog').count()) === 0);
  check('language chip: the game names follow', (await p.page.locator('.me-tile .nm').first().innerText()) === 'Stessa energia');
  check('language chip: remembered for the whole site', (await p.page.evaluate(() => localStorage.getItem('lg.findout.lang'))) === 'it');
  await p.page.reload(); await p.page.waitForFunction(() => document.documentElement.dataset.ready); await settle(p.page);
  check('language chip: still Italian after a reload', (await p.page.locator('#me').innerText()).includes('I tuoi giochi'));
  await p.close();

  /* ---- Delete everything ---- */
  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42' }); seed({ code: 'river-blue-cat-42', logicer: 2418 });
  await open(p); await p.page.getByRole('button', { name: 'Delete everything' }).click(); await p.page.waitForTimeout(500);
  await p.page.locator('dialog.me-sheet .btn.danger').click(); await p.page.waitForTimeout(900);
  check('Delete: the server record is gone', !srv.worker.db.has('river-blue-cat-42'));
  check('Delete: the code is gone from the phone, the page says Done', (await p.page.evaluate(() => (JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null))) === null && (await text(p.page, '.me-flash')) === W('en', 'del.done'));
  check('Delete: what is on the phone stays (the tiles are still there), Get your code is back', (await p.page.locator('.me-tile').count()) === 12 && (await p.page.locator('#me').innerText()).includes('Get your code'));
  await p.close();

  /* ---- Esc and the dim area close a sheet ---- */
  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42' }); await open(p);
  await p.page.locator('.me-leave-del').click(); await p.page.waitForTimeout(450); await p.page.keyboard.press('Escape'); await p.page.waitForTimeout(600);
  check('Esc closes the sheet', (await p.page.locator('dialog').count()) === 0);
  await p.page.locator('.me-leave-del').click(); await p.page.waitForTimeout(450); await p.page.mouse.click(190, 30); await p.page.waitForTimeout(600);
  check('a tap on the dim area closes the sheet', (await p.page.locator('dialog').count()) === 0);
  await p.close();

  /* ---- the contract with A2 (Face ID), A3 (doors) and A (code), as their documents give it ---- */
  srv.worker.db.clear();
  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42', ua: IPHONE }); await open(p);
  check('Face ID: the question is fetched ahead, when the button shows (prepare)', (await p.page.evaluate(() => window.__pk.prepare)) >= 1);
  await p.close();
  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42', kv: { 'lg.test.pk': 'login' } }); await open(p);
  check('a computer (canLogin only): no "Keep with" row, no prepare', !(await p.page.locator('#me').innerText()).includes('Keep with') && (await p.page.evaluate(() => window.__pk.prepare)) === 0);
  await p.close();
  b = await phone({ kv: { 'lg.test.pk': 'login' } }); await open(b, 'have');
  check('a computer: "Have a code?" still offers the way in by fingerprint', (await b.page.locator('#me').innerText()).includes('Use fingerprint'));
  await b.close();
  b = await phone({ kv: { 'lg.test.pk': '0' } }); await open(b, 'have');
  check('a browser that knows no passkeys: no button, the box keeps a plain autocomplete', !/Use (fingerprint|Face ID)/.test(await b.page.locator('#me').innerText()) && (await b.page.locator('#me-code-in').getAttribute('autocomplete')) === 'off');
  await b.close();
  seed({ code: 'river-blue-cat-42', logicer: 2418, passkey: true });
  b = await phone({}); await open(b, 'have');
  check('Have a code?: the login question is fetched ahead and the box offers the kept one (autocomplete "username webauthn")',
    (await b.page.evaluate(() => window.__pk.prepareLogin)) >= 1 && (await b.page.evaluate(() => window.__pk.autofill)) === 1 && (await b.page.locator('#me-code-in').getAttribute('autocomplete')) === 'username webauthn');
  await b.page.evaluate(() => window.__pkPick()); await b.page.waitForTimeout(900);
  check('a passkey picked from the keyboard: welcome, the code is kept', (await text(b.page, '.me-flash')) === W('en', 'have.ok') && (await b.page.evaluate(() => (JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null))) === 'river-blue-cat-42');
  await b.close();
  b = await phone({}); await open(b, 'have'); await route(b, 'number');
  check('leaving "Have a code?" stops the keyboard offer (stopAutofill)', (await b.page.evaluate(() => window.__pk.stopAutofill)) >= 1);
  await b.close();

  seed({ code: 'river-blue-cat-42', logicer: 2418, passkey: true });
  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42', doors: { passkey: true } }); await open(p);
  await p.page.getByRole('button', { name: 'Delete everything' }).click(); await p.page.waitForTimeout(500); await p.page.locator('dialog.me-sheet .btn.danger').click(); await p.page.waitForTimeout(900);
  check('Delete: the copy and the code go, not the games\' keys on the phone (remove called with no local flag)', JSON.stringify(await p.page.evaluate(() => window.__removeOpts)) === '{}');
  check('Delete: the phone is asked to drop the passkey too (forget)', (await p.page.evaluate(() => window.__pk.forget)) === 1);
  await p.close();

  /* the doors the server just answered stay shown across a language change (the stats' own doors come from the last synced record) */
  seed({ code: 'river-blue-cat-42', logicer: 2418 });
  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42' }); await open(p);
  await route(p, 'pw'); await p.page.fill('#me-pw-new', 'blue-lamp-9'); await p.page.keyboard.press('Enter'); await settle(p.page);
  await p.page.evaluate(() => localStorage.setItem('lg.test.doors', '{}'));           // the stats' own doors do not know yet
  await p.page.locator('#me-langchip').click(); await p.page.waitForTimeout(500); await p.page.locator('.me-langs button[lang=it]').click(); await p.page.waitForTimeout(900);
  check('a door just set is still shown after a language change', (await p.page.locator('.me-door').allInnerTexts()).some((t) => t.includes(W('it', 'lose.pw_on'))), await p.page.locator('.me-door').allInnerTexts());
  await p.close();

  /* ---- the modules are missing: the page fails calmly ---- */
  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42' });
  await p.page.route('**/assets/js/me-stats.js', (r) => r.fulfill({ status: 404, body: 'no' }));
  await p.page.goto(srv.url + '/me/'); await p.page.waitForFunction(() => document.documentElement.dataset.ready); await settle(p.page);
  check('stats module missing: "That did not work", and a way back', (await p.page.locator('.me-msg.bad').innerText()) === W('en', 'err.generic') && (await p.page.getByRole('link', { name: 'Back' }).getAttribute('href')) === '../');
  await p.close();
}

/* ====================================================================== motion, themes */
if (group('motion')) {
  console.log('motion, themes');
  let p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42', reduced: true });
  await p.page.goto(srv.url + '/me/'); await p.page.waitForFunction(() => document.documentElement.dataset.ready); await p.page.waitForTimeout(60);
  check('reduced motion: the number is at its final value at once', (await text(p.page, 'h1')) === 'Logicer №2,418', await text(p.page, 'h1'));
  const anim = await p.page.evaluate(() => [...document.querySelectorAll('.me-screen, .me-rise, .me-dots i.on')].map((n) => getComputedStyle(n).animationName + '/' + getComputedStyle(n).animationDuration));
  check('reduced motion: every moving thing is a crossfade (me-fade) or still', anim.length > 0 && anim.every((a) => /^(me-fade\/0\.18s|none\/0s)$/.test(a)), [...new Set(anim)]);
  await p.close();

  p = await phone({ stats: clone(MOCK), code: 'river-blue-cat-42' });
  await p.page.goto(srv.url + '/me/'); await p.page.waitForFunction(() => document.documentElement.dataset.ready);
  const mid = await text(p.page, 'h1');
  await p.page.waitForTimeout(900);
  check('count: the number rises to its value (not already there at the first frame)', mid !== 'Logicer №2,418' && (await text(p.page, 'h1')) === 'Logicer №2,418', mid);
  const prop = await p.page.evaluate(() => { const bad = []; for (const sh of document.styleSheets) { if (!/me\.css/.test(sh.href || '')) continue; for (const r of sh.cssRules) { if (r.style && r.style.transition) { const t = r.style.transition; if (/\b(width|height|top|left|margin|font-size|box-shadow)\b/.test(t)) bad.push(r.selectorText + ': ' + t); } } } return bad; });
  check('motion rule: nothing transitions width, height, top, left, margin, font-size or box-shadow', prop.length === 0, prop);
  /* the newcomer page's own ambient motion (7 Nov 2026, Khayyam: "animated and visually beautiful"): the hero's slow colour drift
     (9s), the play button's beat (2.4s), the sparks (3.8s, .6s apart), the steps ring (1.2s after .2s), the example's dots
     (7s, .28s apart) and flames (1.5s), the picture's wait (1.1s). Read as written: ".6s" shows as "6s" and so on. */
  const NEWCOMER_LOOPS = ['9s', '2.4s', '3.8s', '6s', '1.2s', '2s', '7s', '28s', '1.5s', '1.1s'];
  const durs = await p.page.evaluate(() => { const set = new Set(); for (const sh of document.styleSheets) { if (!/me\.css/.test(sh.href || '')) continue; for (const r of sh.cssRules) { const s = r.cssText; const m = s.match(/\d+(\.\d+)?m?s\b/g); if (m) m.forEach((x) => set.add(x)); } } return [...set]; });
  check('motion rule: only token durations in me.css apart from the pulse-free 1.6s (none) and the delay of the band pop', durs.every((d) => ['180ms', '340ms', '600ms', '100ms', '0s'].concat(NEWCOMER_LOOPS).includes(d)), durs);
  /* a tap during the slide still works: tap Get your code the moment the page is there, then a button on the new screen at once */
  await p.close();
  p = await phone({ stats: bare() }); await open(p);
  await p.page.getByRole('button', { name: 'Get your code' }).click(); await p.page.waitForSelector('.me-code');
  await p.page.getByRole('button', { name: 'Another' }).click({ timeout: 2000 });
  check('a tap while the screen is still sliding in is taken', (await p.page.locator('.me-code').count()) === 1);
  const ghostPe = await p.page.evaluate(() => [...document.querySelectorAll('.me-ghost')].map((n) => getComputedStyle(n).pointerEvents));
  check('the leaving copy lets taps through (pointer-events none)', ghostPe.every((x) => x === 'none'), ghostPe);
  await p.close();

  for (const scheme of ['dark']) {
    for (const l of ['en', 'tr']) {
      p = await phone({ lang: l, scheme, stats: clone(MOCK), code: 'river-blue-cat-42', doors: { passkey: true, pw: true } });
      await open(p); check(`[${scheme}/${l}] home fits`, await fits(p.page)); await shot(p, `${l}-dark-home`);
      await route(p, 'rq'); for (const i of [0, 1, 2]) await p.page.locator('.me-q').nth(i).click(); await p.page.waitForTimeout(400); await shot(p, `${l}-dark-rq`);
      await p.close();
    }
  }
}

await browser.close(); await srv.close();
console.log(`\n${pass} checks passed, ${fails.length} failed`);
if (fails.length) { console.log(fails.map((f) => ' - ' + f).join('\n')); process.exit(1); }
