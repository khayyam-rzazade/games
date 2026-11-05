/* Check-in test: the motion (claude/motion-spec.md 6, 5 Nov 2026). Not a pass/fail suite for the words: it records a video of
   each flow at 360 x 740 and 1280 x 800, counts long frames per screen (a PerformanceObserver for longtask and a
   requestAnimationFrame gap counter), saves a screenshot mid-slide and at the end of the result's timeline, and checks the
   motion's own promises: a tap during a slide or a timeline is taken, Back slides the other way, the bar glides, reduced motion
   lands still, the hand-made slide (no View Transitions) behaves like the real one.
   Run: node tests/motion.mjs  (CK_NO_VT=1 runs every flow on the hand-made slide). Output: CK_OUT/motion/…, and a table. */
import fs from 'node:fs';
import path from 'node:path';
import { boot, open, VIEWS, sleep, post, OUT } from './lib.mjs';

const DIR = path.join(OUT, 'motion'); fs.mkdirSync(DIR, { recursive: true });
const NO_VT = !!process.env.CK_NO_VT;
const VIDEO = process.env.CK_VIDEO !== '0';
const ONLY = process.env.CK_ONLY || '';               /* solo | room | reduced: one part only */            /* CK_VIDEO=0: frames only (recording a video costs frames on a small runner) */
const B = await boot();
let fails = 0;
const ok = (c, msg) => { if (!c) { fails++; console.log('  FAIL', msg); } };
const rows = [];

/* in the page: a rAF loop that keeps, per labelled stretch, the longest gap between two frames and the gaps over 50 ms, both
   for every frame and for the frames while something moves (a CSS animation or transition, a view transition, or a number that
   counted in that frame); and the long tasks (PerformanceObserver) */
const PROBE = () => {
  const fresh = (label) => ({ label, max: 0, over50: 0, over34: 0, frames: 0, mFrames: 0, mMax: 0, mOver50: 0, mOver34: 0, long: 0, longMax: 0 });
  let seg = fresh('load');
  const done = [];
  let textMoved = false;
  try { new MutationObserver(() => { textMoved = true; }).observe(document, { subtree: true, characterData: true, childList: true }); } catch (e) { /* none */ }
  window.__ck = { mark(label) { done.push(seg); seg = fresh(label); }, read() { return done.concat([seg]); } };
  let last = 0, wasMoving = false;
  const tick = (t) => {
    if (last) {
      const g = t - last; seg.frames++; if (g > seg.max) seg.max = g; if (g > 50) seg.over50++; if (g > 34) seg.over34++;
      if (wasMoving) { seg.mFrames++; if (g > seg.mMax) seg.mMax = g; if (g > 50) seg.mOver50++; if (g > 34) seg.mOver34++; }
    }
    last = t;
    let moving = textMoved; textMoved = false;
    if (!moving) { try { moving = document.getAnimations().some((a) => a.playState === 'running' && !(a.effect && a.effect.getComputedTiming && a.effect.getComputedTiming().iterations === Infinity)); } catch (e) { moving = false; } }
    wasMoving = moving;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) { seg.long++; if (e.duration > seg.longMax) seg.longMax = e.duration; } }).observe({ type: 'longtask', buffered: false }); } catch (e) { /* no longtask here */ }
};
const mark = (page, label) => page.evaluate((l) => window.__ck && window.__ck.mark(l), label);
async function collect(page, tag) {
  const segs = await page.evaluate(() => (window.__ck ? window.__ck.read() : []));
  for (const s of segs) if (s.label !== 'load' && s.frames) rows.push(Object.assign({ tag }, s));
}

async function context(view, scheme, o = {}) {
  const r = await open(B.browser, view, scheme, { reduced: o.reduced });
  await r.ctx.close();                                   /* lib.open makes a context without video: make our own with the same settings */
  const ctx = await B.browser.newContext({
    viewport: { width: view.w, height: view.h }, colorScheme: scheme, deviceScaleFactor: 1, isMobile: !!view.mobile, hasTouch: !!view.mobile,
    reducedMotion: o.reduced ? 'reduce' : 'no-preference', locale: 'en-GB',
    recordVideo: o.video ? { dir: DIR, size: { width: view.w, height: view.h } } : undefined
  });
  await ctx.addInitScript(([api, noVt]) => { window.CHECKIN_API = api; window.__noTurnstile = true; if (noVt) window.CHECKIN_NO_VT = true; }, ['http://127.0.0.1:4181', NO_VT]);
  await ctx.addInitScript(PROBE);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/ERR_|Failed to load resource/.test(m.text())) errors.push('console: ' + m.text()); });
  return { ctx, page, errors };
}
const meta = (page) => page.evaluate(() => document.querySelector('.ck-itemtop .meta')?.textContent || '');
async function nextMeta(page, last) { await page.waitForFunction((l) => { const m = document.querySelector('.ck-itemtop .meta'); return !m || m.textContent !== l; }, last, { timeout: 8000 }); }
/* the question on screen: without View Transitions the one on its way out stays in the page (inert) for --m-base */
const Q = '.ck-qbody:not(.ck-going) ';
async function tapOne(page, n) {
  if (await page.$(Q + '.ck-ladder')) { await page.click(Q + '.ck-rung >> nth=3'); await sleep(300); await page.click(Q + '.ck-actions .btn.solid'); }
  else if (await page.$(Q + '.ck-seg')) await page.click(Q + '.ck-seg button >> nth=2');
  else { const bs = page.locator(Q + '.ck-choices .btn'); const c = await bs.count(); await bs.nth(Math.min(c - 1, n % 2 ? 1 : 2)).click(); }
}

/* ------------------------------------------------------------------ solo, front to consent ------ */
for (const view of (!ONLY || ONLY === 'solo') ? VIEWS : []) {
  const tag = `solo-${view.id}${NO_VT ? '-novt' : ''}`;
  console.log(tag);
  await post('/__reset'); await post('/__seed', { n: 36, country: 'IT', seed: 5 });
  const { ctx, page, errors } = await context(view, 'light', { video: VIDEO });
  await page.goto('http://127.0.0.1:4180/checkin/'); await page.waitForSelector('.ck-front');
  await mark(page, 'front'); await sleep(900);
  await page.click('.ck-start'); await page.waitForSelector('.ck-item');
  await mark(page, 'questions'); await sleep(400);
  let last = await meta(page);
  /* the bar glides: its clip moves over --m-base, so a frame just after a tap shows it between two steps */
  for (let n = 0; n < 20; n++) {
    if (process.env.CK_PERQ) await mark(page, 'q' + (n + 1));
    if (n === 3) {                                         /* mid-slide: 120 ms sweep + 150 ms wait + half of the 220 ms slide */
      await tapOne(page, n); await sleep(120 + 150 + 95); await page.screenshot({ path: path.join(DIR, `${tag}-midslide.png`) });
      const clip = await page.evaluate(() => getComputedStyle(document.querySelector('.ck-progress .on')).clipPath);
      ok(/inset/.test(clip), `${tag}: the bar is a clip: ${clip}`);
    } else if (n === 6) {                                   /* Back during the wait after a choice: it goes back at once, the choice is kept */
      await tapOne(page, n); await sleep(60);
      await page.click(Q + '.ck-nav .chip');
      await nextMeta(page, last); const m = await meta(page);
      ok(m.includes('6 of 20'), `${tag}: Back during the wait goes back: ${m}`);
      last = m; await sleep(300);
      await page.click(Q + '.ck-choices .btn >> nth=1');        /* and forward again */
      await nextMeta(page, last); last = await meta(page); await sleep(300);
      await tapOne(page, n);
    } else if (n === 9) {                                   /* a tap during the slide lands on the new question */
      await tapOne(page, n);
      await nextMeta(page, last); last = await meta(page);
      await sleep(60);                                      /* the slide is still running */
      const sliding = await page.evaluate(() => !!document.documentElement.dataset.ckSlide || !!document.querySelector('.ck-qbody.ck-going, .ck-qbody.ck-in-r'));
      await page.locator(Q + '.ck-choices .btn, ' + Q + '.ck-seg button').nth(1).click({ timeout: 2000 });
      await nextMeta(page, last); const m = await meta(page);
      ok(m.includes('12 of 20'), `${tag}: a tap during the slide (${sliding ? 'it was sliding' : 'already landed'}) was taken: ${m}`);
      last = m; n++; await sleep(500); continue;
    } else await tapOne(page, n);
    if (n < 19) { await nextMeta(page, last); last = await meta(page); await sleep(430); }
  }
  await page.waitForSelector('.ck-result');
  await mark(page, 'result: count, pop, bars'); await sleep(1600);
  await page.screenshot({ path: path.join(DIR, `${tag}-result-top.png`) });
  /* a person reading down the page: the cards below enter as they are reached */
  await mark(page, 'result: scrolling down');
  for (let k = 0; k < 14; k++) { await page.mouse.wheel(0, view.h * 0.35); await sleep(260); }
  await sleep(900);
  await page.screenshot({ path: path.join(DIR, `${tag}-result-end.png`) });
  const hidden = await page.evaluate(() => document.querySelectorAll('.ck-result .ck-pre').length);
  ok(hidden === 0, `${tag}: after scrolling to the end nothing is still waiting (${hidden})`);
  await page.screenshot({ path: path.join(DIR, `${tag}-result-full.png`), fullPage: true });
  await mark(page, 'consent: yes, age, country');
  await page.locator('.ck-consent-acts .btn.solid').click();
  await page.waitForSelector('.ck-consent .chip[data-age]'); await sleep(90);
  await page.screenshot({ path: path.join(DIR, `${tag}-consent-midslide.png`) });
  await page.locator('.ck-consent .chip[data-age]').nth(2).click();
  await page.waitForSelector('.ck-consent .ck-chips .chip:not([data-age])'); await sleep(300);
  await page.locator('.ck-consent .ck-chips .chip:not([data-age])').first().click();
  await page.waitForSelector('.ck-consent.done'); await sleep(600);
  await mark(page, 'sheet: ? opens and closes');
  await page.click('.bar .chip.round'); await page.waitForSelector('#dlg-how[open]'); await sleep(110);
  await page.screenshot({ path: path.join(DIR, `${tag}-sheet-rising.png`) }); await sleep(400);
  await page.click('#dlg-how [data-close]'); await sleep(60);
  /* the page under a closing sheet takes a tap at once */
  const under = await page.evaluate(() => { const r = document.querySelector('.ck-toplink').getBoundingClientRect(); const e = document.elementFromPoint(r.left + 5, r.top + 5); return e && e.className; });
  ok(/ck-toplink/.test(under || ''), `${tag}: while the sheet sinks, the page under it takes taps (${under})`);
  await sleep(500);
  await mark(page, 'back to the front');
  await page.click('.ck-toplink'); await page.waitForSelector('.ck-front'); await sleep(700);
  await collect(page, tag);
  if (errors.length) { fails++; console.log('  errors:', errors); }
  const video = page.video(); await ctx.close();
  if (video) fs.renameSync(await video.path(), path.join(DIR, `${tag}.webm`));
}

/* ------------------------------------------------------------------ the host's reveal and a player in the room ------ */
for (const view of (!ONLY || ONLY === 'room') ? VIEWS : []) {
  const tag = `room-${view.id}${NO_VT ? '-novt' : ''}`;
  console.log(tag);
  await post('/__reset');
  const host = await context(view, 'dark', { video: VIDEO });
  await host.page.goto('http://127.0.0.1:4180/checkin/host/'); await host.page.waitForSelector('#ck-make');
  await mark(host.page, 'host: make a room');
  await host.page.click('#ck-make'); await host.page.waitForSelector('.ck-joincard'); await sleep(800);
  const code = await host.page.$$eval('.ck-codeshow i', (n) => n.map((x) => x.textContent).join(''));
  const player = await context(view, 'light', { video: VIDEO });
  await player.page.goto('http://127.0.0.1:4180/checkin/room/#' + code); await player.page.waitForSelector('.ck-room');
  await mark(player.page, 'player: lobby');
  ok(await player.page.evaluate(() => !!document.querySelector('.ck-roomhead .ck-badge.ck-pulse')), `${tag}: the lobby's count pulses while it waits`);
  await post(`/room/${code}/join`, { key: 'a1b2c3d4e5f60718293a4b5c6d7e8f90' });
  await sleep(3200);
  await mark(host.page, 'host: live, the ring');
  await host.page.click('#ck-live'); await host.page.waitForSelector('#ck-reveal');
  await player.page.waitForSelector('#ck-go', { timeout: 8000 });
  await mark(player.page, 'player: started, the questions');
  await player.page.click('#ck-go');
  let last = '';
  for (let n = 0; n < 20; n++) { await nextMeta(player.page, last); last = await meta(player.page); await sleep(60); await tapOne(player.page, n); }
  await player.page.waitForSelector('.ck-ring'); await mark(player.page, 'player: waiting, own result'); await sleep(1400);
  await post('/__fill', { code, n: 23, sides: false, lean: 1, weigh: 'y_load' });
  await sleep(3000);
  await mark(host.page, 'host: reveal');
  await host.page.click('#ck-reveal'); await host.page.waitForSelector('.ck-group .ck-curve', { timeout: 8000 });
  await sleep(1200); await host.page.screenshot({ path: path.join(DIR, `${tag}-host-reveal-top.png`) });
  for (let k = 0; k < 10; k++) { await host.page.mouse.wheel(0, view.h * 0.4); await sleep(260); }
  await sleep(800); await host.page.screenshot({ path: path.join(DIR, `${tag}-host-reveal-end.png`) });
  ok(await host.page.evaluate(() => document.querySelectorAll('.ck-pre').length) === 0, `${tag}: the host's reveal has played to the end`);
  await player.page.waitForSelector('.ck-group', { timeout: 8000 }); await mark(player.page, 'player: reveal'); await sleep(1500);
  for (let k = 0; k < 10; k++) { await player.page.mouse.wheel(0, view.h * 0.4); await sleep(260); }
  await sleep(600); await player.page.screenshot({ path: path.join(DIR, `${tag}-player-reveal.png`) });
  await mark(host.page, 'host: try, then the sure-sheet');
  await host.page.click('#ck-try'); await host.page.waitForSelector('.ck-lever .ck-status.ok'); await sleep(500);
  await host.page.click('#ck-next'); await host.page.waitForSelector('#next-yes'); await sleep(400);
  await host.page.click('#next-yes'); await host.page.waitForSelector('#ck-open'); await sleep(800);
  await collect(host.page, tag + ' host'); await collect(player.page, tag + ' player');
  for (const x of [host, player]) { if (x.errors.length) { fails++; console.log('  errors:', x.errors); } }
  for (const [x, who] of [[host, 'host'], [player, 'player']]) { const v = x.page.video(); await x.ctx.close(); if (v) fs.renameSync(await v.path(), path.join(DIR, `${tag}-${who}.webm`)); }
}

/* ------------------------------------------------------------------ reduced motion: every screen lands still ------ */
if (!ONLY || ONLY === 'reduced') {
  console.log('reduced motion');
  const { ctx, page, errors } = await context(VIEWS[0], 'light', { reduced: true });
  await page.goto('http://127.0.0.1:4180/checkin/'); await page.waitForSelector('.ck-front');
  await page.click('.ck-start');
  let last = '';
  for (let n = 0; n < 20; n++) { await nextMeta(page, last); last = await meta(page); await tapOne(page, n); }
  await page.waitForSelector('.ck-result'); await sleep(150);
  const r = await page.evaluate(() => ({ pre: document.querySelectorAll('.ck-pre').length, num: document.querySelector('.ck-gnum b').textContent, aria: document.querySelector('.ck-gauge').getAttribute('aria-label') }));
  ok(r.pre === 0 && r.aria.includes(r.num), `reduced: the result is all there at once, the number at its value: ${JSON.stringify(r)}`);
  if (errors.length) { fails++; console.log('  errors:', errors); }
  await ctx.close();
}

await B.close();
/* the table: per screen, the longest gap between two frames, how many were over 50 ms, long tasks */
const lines = ['| flow | screen | frames | longest gap (ms) | gaps > 50 ms | while moving: frames | longest gap | gaps > 50 ms | gaps > 34 ms | long tasks |', '|---|---|---|---|---|---|---|---|---|---|'];
for (const r of rows) lines.push(`| ${r.tag} | ${r.label} | ${r.frames} | ${r.max.toFixed(1)} | ${r.over50} | ${r.mFrames} | ${r.mMax.toFixed(1)} | ${r.mOver50} | ${r.mOver34} | ${r.long}${r.long ? ' (max ' + Math.round(r.longMax) + ')' : ''} |`);
fs.writeFileSync(path.join(DIR, `frames${NO_VT ? '-novt' : ''}${VIDEO ? '-video' : ''}.md`), lines.join('\n') + '\n');
console.log(lines.join('\n'));
console.log(fails ? `\n${fails} problem(s)` : '\nmotion: all good');
process.exit(fails ? 1 : 0);
