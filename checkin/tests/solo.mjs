/* Check-in test: the solo page, front to end card, 360 px and desktop, light and dark. */
import { boot, open, VIEWS, shot, sleep, overflowX, noHoles, get, post, W, WORDS } from './lib.mjs';

const B = await boot();
/* the country the test server says the phone is in (Italy), in the page's own words */
const IT_NAME = WORDS['country.name'].IT, LADDER_IN = WORDS['country.in'].IT, LIVE_Q = W('consent.live_q', { in_country: LADDER_IN, country: IT_NAME, mi: 'mı' });   /* Turkish asks with the bare name: "İtalya mı?" */
let fails = 0;
const ok = (c, msg) => { if (!c) { fails++; console.log('  FAIL', msg); } };

/* picks one answer per item type; returns after the result shows */
async function runThrough(page, tag, view, scheme, snap) {
  await page.goto('http://127.0.0.1:4180/checkin/');
  await page.waitForSelector('.ck-front');
  if (snap) await shot(page, `${tag}-front`);
  ok(!(await overflowX(page)).length, `${tag} front overflow ${JSON.stringify(await overflowX(page))}`);
  await page.click('.ck-start');
  let n = 0;
  for (; n < 30; n++) {
    await page.waitForSelector('.ck-item, .ck-result', { timeout: 4000 });
    if (await page.$('.ck-result')) break;
    const idx = await page.evaluate(() => document.querySelector('.ck-itemtop .meta')?.textContent);
    if (snap && [0, 1, 5, 10, 11, 12, 16, 17, 18, 19].includes(n)) { await shot(page, `${tag}-q${String(n).padStart(2, '0')}`); const o = await overflowX(page); ok(!o.length, `${tag} q${n} overflow ${JSON.stringify(o)}`); }
    if (n === 0 || n === 1) {                                       /* the "?" sheets: the role note and the WHO-5 instruction */
      ok(!!(await page.$('.ck-help')), `${tag} q${n} has a ? button`);
      if (snap) { await page.click('.ck-help'); await page.waitForSelector('#dlg-help[open]'); if (n === 1) await shot(page, `${tag}-help`); ok(((await page.textContent('#dlg-help .sheet-body')) || '').length > 30, `${tag} help text`); await page.click('#dlg-help [data-close]'); await sleep(150); }
    }
    if (n === 19) { const text = await page.textContent('.ck-q'); ok(text.includes(LADDER_IN) && !/\{\w+\}/.test(text), `${tag} ladder names the country: ${text.slice(0, 90)}`); const extra = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight); if (view.w < 500) ok(extra < 160, `${tag} ladder screen scrolls ${extra}px`); }
    if (await page.$('.ck-thermo.live')) { const box = await page.locator('.ck-thermo-body').boundingBox(); await page.mouse.click(box.x + box.width * 0.62, box.y + box.height / 2); await page.click('.ck-actions .btn.solid'); }
    else if (await page.$('.ck-ladder')) { await page.click('.ck-rung >> nth=4'); if (snap) await shot(page, `${tag}-ladder-picked`); await page.click('.ck-actions .btn.solid'); }
    else if (await page.$('.ck-seg')) await page.click('.ck-seg button >> nth=2');
    else { const bs = page.locator('.ck-choices .btn'); const c = await bs.count(); await bs.nth(Math.min(c - 1, n % 2 ? 1 : 2)).click(); }
    await sleep(snap ? 420 : 140);
  }
  ok(n === 19 || n === 20, `${tag} screens before result: ${n}`);
  await page.waitForSelector('.ck-result');
  await sleep(1700);
}

for (const view of VIEWS) for (const scheme of ['light', 'dark']) {
  const tag = `solo-${view.id}-${scheme}`;
  console.log(tag);
  await fetch('http://127.0.0.1:4181/__reset', { method: 'POST', body: '{}' });
  await post('/__seed', { n: 36, country: 'IT', seed: 5 }); await post('/__seed', { n: 4, country: 'DE', seed: 9 });   /* the world's numbers show from 30 */
  const { ctx, page, errors } = await open(B.browser, view, scheme);
  await runThrough(page, tag, view, scheme, true);
  await shot(page, `${tag}-result`, { full: true });
  { const holes = await noHoles(page); ok(!holes.length, `${tag} words with holes: ${holes}`); }
  const o = await overflowX(page); ok(!o.length, `${tag} result overflow ${JSON.stringify(o)}`);
  ok((await page.$$('.ck-compare .ck-pin')).length >= 3, `${tag} you, country and world pins: ${(await page.$$('.ck-compare .ck-pin')).length}`);
  ok((await page.textContent('.ck-compare')).includes(IT_NAME), `${tag} country named`);
  const hasConsent = await page.$('.ck-consent'); ok(!!hasConsent, `${tag} consent card present`);
  /* consent: yes */
  if (hasConsent) {
    await page.locator('.ck-consent').scrollIntoViewIfNeeded();
    await shot(page, `${tag}-consent`);
    await page.locator('.ck-consent-acts .btn.solid').click();
    await page.waitForSelector('.ck-consent .chip[data-age]');
    await shot(page, `${tag}-consent-age`);
    await page.locator('.ck-consent .chip[data-age]').nth(1).click();
    await page.waitForSelector('.ck-consent .ck-ask');
    ok((await page.textContent('.ck-consent .ck-ask')).includes(LIVE_Q), `${tag} the card asks about the country the server saw: ${await page.textContent('.ck-consent .ck-ask')}`);
    await shot(page, `${tag}-consent-country`);
    await page.locator('.ck-consent .ck-chips .chip').first().click();
    await page.waitForSelector('.ck-consent.done'); await sleep(300);
    const ups = await get('/__uploads');
    ok(ups.pending.length === 1 && ups.pending[0].status === 'yes', `${tag} one upload, now yes: ${JSON.stringify(ups.pending.map((x) => x.status))}`);
    ok(ups.kept.length === 1, `${tag} one row kept, got ${ups.kept.length}`);
    const k = ups.kept[0] || {};
    ok(k.age === '18\u201324' && k.country === 'IT' && k.item_version === 60 && /^[0-9a-f]{32}$/.test(k.id || ''), `${tag} kept row: age ${k.age}, country ${k.country}, v ${k.item_version}, id ${(k.id || '').length}`);
    ok(k.room === null && k.round === null, `${tag} a check-in alone has no room`);
    ok(ups.counters.checkin === 41 && ups.counters.first === 1 && ups.counters.yes === 1, `${tag} counters ${JSON.stringify(ups.counters)}`);
    await shot(page, `${tag}-consent-done`);
  }
  const log = (await get('/__log')).log.map((x) => x.method + ' ' + x.path);
  ok(log.includes('POST /solo'), `${tag} posted /solo`); ok(log.includes('POST /upload'), `${tag} posted /upload`);
  const solo = (await get('/__log')).log.find((x) => x.path === '/solo');
  ok(solo && !JSON.stringify(solo.body).match(/key|id"/), `${tag} /solo carries no id: ${solo && JSON.stringify(solo.body).slice(0, 120)}`);
  if (errors.length) { fails++; console.log('  errors:', errors); }
  await ctx.close();
}
await B.close();
console.log(fails ? `\n${fails} problem(s)` : '\nsolo: all good');
process.exit(fails ? 1 : 0);
