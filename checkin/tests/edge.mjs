/* Check-in test: the edges of the solo page: no server, a half-finished check-in, a second check-in, reduced motion, forgetting. */
import { boot, open, VIEWS, shot, sleep, overflowX, post, get, W, consentYes, LANG } from './lib.mjs';

const B = await boot();
let fails = 0;
const ok = (c, msg) => { if (!c) { fails++; console.log('  FAIL', msg); } };
const URL_ = 'http://127.0.0.1:4180/checkin/';

async function tap(page, n) {                                  /* answers n screens quickly, always the best option in the middle of the list */
  let last = '';
  for (let k = 0; k < n; k++) {
    await page.waitForFunction((l) => { const m = document.querySelector('.ck-itemtop .meta'); return !m || m.textContent !== l; }, last, { timeout: 8000 });
    const meta = await page.$('.ck-itemtop .meta'); if (!meta) return false;
    last = await meta.textContent(); await sleep(50);
    if (await page.$('.ck-thermo.live')) { const box = await page.locator('.ck-thermo-body').boundingBox(); await page.mouse.click(box.x + box.width * 0.3, box.y + box.height / 2); await page.click('.ck-actions .btn.solid'); }
    else if (await page.$('.ck-ladder')) { await page.click('.ck-rung >> nth=2'); await page.click('.ck-actions .btn.solid'); }
    else if (await page.$('.ck-seg')) await page.click('.ck-seg button >> nth=3');
    else { const bs = page.locator('.ck-choices .btn'); await bs.nth(0).click(); }
  }
  return true;
}

console.log('no server');
{
  const { ctx, page, errors } = await open(B.browser, VIEWS[0], 'light');
  await page.addInitScript(() => { window.CHECKIN_API = 'http://127.0.0.1:1'; });
  await page.goto(URL_); await page.waitForSelector('.ck-front');
  ok((await page.textContent('.ck-count')) === '', 'no counter without a server');
  await page.click('.ck-start'); await tap(page, 20);
  await page.waitForSelector('.ck-result'); await sleep(1500);
  ok(!(await page.$('.ck-skel')), 'compare skeleton gone');
  ok(!!(await page.$('.ck-hero')) && !!(await page.$('.ck-consent')), 'result and consent still there');
  await consentYes(page, null, 'skip'); await sleep(1500);
  ok((await page.textContent('.ck-consent-acts .btn.solid')) === W('site.try_again'), 'yes can be tried again');
  ok((await page.textContent('.ck-consent')).includes(W('consent.failed')), 'the card says it could not send');
  await shot(page, 'edge-noserver-consent');
  await page.reload(); await page.waitForSelector('.ck-consent');
  await page.locator('.ck-consent-acts .btn.ghost').click();
  ok(await page.waitForSelector('.ck-consent.done', { timeout: 8000 }).then(() => true, () => false), 'a no resolves even without a server');
  ok((await page.textContent('.ck-consent.done')).includes(W('consent.changed')), 'after a no: changed your mind?');
  const o = await overflowX(page); ok(!o.length, 'no-server overflow ' + JSON.stringify(o));
  await ctx.close();
}

console.log('draft, second check-in, last result, forget');
{
  await post('/__reset');
  const { ctx, page, errors } = await open(B.browser, VIEWS[0], 'light');
  await page.goto(URL_); await page.waitForSelector('.ck-front');
  await page.click('.ck-start'); await tap(page, 4); await sleep(700);
  await page.reload(); await page.waitForSelector('.ck-front');
  ok((await page.textContent('.ck-start')) === W('front.carry_on'), 'carry on after reload');
  await page.click('.ck-start');
  await page.waitForSelector('.ck-item');
  ok((await page.textContent('.ck-itemtop .meta')).includes(W('flow.of', { a: 5, b: 20 })), 'resumes at screen 5: ' + (await page.textContent('.ck-itemtop .meta')));
  await tap(page, 16); await page.waitForSelector('.ck-result'); await sleep(1500);
  const first = await page.textContent('.ck-gnum b');
  ok(!(await page.$('.ck-delta')), 'no delta on the first check-in');
  ok((await page.textContent('.ck-since')).includes(W('res.come_back')) && !!(await page.$('.ck-since a[download]')), 'the first time: come back in two weeks, and a calendar file');
  await page.click('.ck-toplink'); await page.waitForSelector('.ck-front');
  ok(!!(await page.$('.ck-last')), 'last result link on the front');
  await page.click('.ck-last'); await page.waitForSelector('.ck-result');
  ok(await page.evaluate(() => location.hash) === '#result', 'result has its own address');
  await page.click('.ck-toplink'); await page.waitForSelector('.ck-front');
  await page.click('.ck-start'); /* new check-in: starts fresh, draft was cleared */
  await page.waitForSelector('.ck-item'); ok((await page.textContent('.ck-itemtop .meta')).includes(W('flow.of', { a: 1, b: 20 })), 'a new check-in starts at 1');
  await tap(page, 20); await page.waitForSelector('.ck-result'); await sleep(1500);
  ok(!!(await page.$('.ck-delta')), 'delta shown on the second check-in');
  await shot(page, 'edge-second', { full: false });
  /* the only things sent to the server are /solo (no id), /upload (pending), never a room key */
  const log = (await get('/__log')).log;
  ok(log.filter((x) => x.path === '/solo').every((x) => !('id' in x.body) && !('key' in x.body)), '/solo never carries an id');
  /* forget */
  await page.click('.ck-toplink'); await page.waitForSelector('.ck-front');
  await page.click('.bar .chip.round'); await page.waitForSelector('#dlg-how[open]');
  await page.click('#dlg-how .ck-forget .ck-link'); await page.waitForSelector('#forget-yes');
  const before = await get('/__uploads'); ok(before.pending.length >= 2, 'two check-ins are waiting on the consent card: ' + before.pending.length);
  const oldId = await page.evaluate(() => JSON.parse(localStorage.getItem('lg.checkin.v1')).id);
  await page.click('#forget-yes'); await sleep(600);
  const left = await page.evaluate(() => JSON.parse(localStorage.getItem('lg.checkin.v1')));
  ok(left && left.history.length === 0 && !left.draft && left.hosts.length === 0, 'storage emptied by forget: ' + JSON.stringify(left));
  ok(/^[0-9a-f]{32}$/.test(left.id) && left.id !== oldId, 'a fresh code after forget: ' + left.id + ' was ' + oldId);
  const after = await get('/__uploads'); ok(after.pending.length === 0 && after.kept.length === 0, 'forget also deletes at the server: ' + after.pending.length + ' / ' + after.kept.length);
  const del = (await get('/__log')).log.filter((x) => x.path === '/delete');
  ok(del.length === 1 && /^[0-9a-f]{32}$/.test(del[0].body.id || '') && Object.keys(del[0].body).length === 1, '/delete carries only the id: ' + JSON.stringify(del[0] && del[0].body));
  ok(log.filter((x) => x.path === '/upload').length === 2 && log.filter((x) => x.path === '/upload').map((x) => !!x.body.first).join() === 'true,false', 'first:true only on the first check-in (with /upload)');
  ok(log.filter((x) => x.path === '/solo').every((x) => !('first' in x.body)), '/solo carries no first flag');
  if (errors.length) { fails++; console.log('  errors:', errors); }
  await ctx.close();
}

console.log('front links, language chip, reduced motion');
{
  const { ctx, page, errors } = await open(B.browser, VIEWS[0], 'dark', { reduced: true });
  await page.goto(URL_); await page.waitForSelector('.ck-front');
  ok(!(await page.$eval('#ck-langchip', (e) => e.hidden)), 'language chip shown (six languages)');
  { const href = await page.$eval('#ck-foot a[href*="researchers"]', (a) => a.href).catch(() => '');      /* the researcher page in the page's language */
    ok(href.endsWith(LANG === 'en' ? '/researchers/' : '/researchers/' + LANG + '/'), 'footer opens the researcher page in this language: ' + href);
    const r = href ? await fetch(href) : null; ok(r && r.ok && (await r.text()).includes('lang="' + LANG + '"'), 'that page is there, in ' + LANG); }
  ok((await page.$eval('.ck-dial .ck-gneedle', (e) => getComputedStyle(e).animationName)) === 'none', 'dial needle still under reduced motion');
  await page.fill('.ck-codeform .ck-input', 'abcdef'); await page.click('.ck-codeform .btn');
  await page.waitForURL(/room\/#ABCDEF/); ok(true, 'code form goes to the room');
  await page.goto(URL_); await page.waitForSelector('.ck-front');
  await page.click('.ck-team a'); await page.waitForURL(/host\//); ok(true, 'team link goes to the host page');
  await page.goto(URL_); await page.click('.ck-start'); await tap(page, 20); await page.waitForSelector('.ck-result');
  ok((await page.$eval('.ck-band', (e) => getComputedStyle(e).animationName)) === 'none', 'band word not animated under reduced motion');
  ok((await page.$eval('.ck-dfill', (e) => getComputedStyle(e).animationName)) === 'none', 'bars not animated under reduced motion');
  if (errors.length) { fails++; console.log('  errors:', errors); }
  await ctx.close();
}

await B.close();
console.log(fails ? `\n${fails} problem(s)` : '\nedge: all good');
process.exit(fails ? 1 : 0);
