/* Check-in test: the player against the server's own refusals (chat B's Worker): a round revealed or replaced while the phone is
   still answering, a split taken off meanwhile, joining again after a reveal, the research upload's room tag. Phone size, light. */
import { boot, open, VIEWS, shot, sleep, noHoles, post, get, W } from './lib.mjs';

const B = await boot();
let fails = 0;
const ok = (c, msg) => { if (!c) { fails++; console.log('  FAIL', msg); } };
/* the words the page shows: lib.mjs's W, in the language the tests run with (CK_LANG) */
const host = (code, key, action, extra) => post(`/room/${code}/host`, Object.assign({ host_key: key, action }, extra || {}));
const URL_ = (c) => 'http://127.0.0.1:4180/checkin/room/#' + c;

async function answer(page, n, from = 0) {                       /* answers n screens, starting at the one the page is on */
  let last = '';
  for (let k = 0; k < n; k++) {
    await page.waitForFunction((l) => { const m = document.querySelector('.ck-itemtop .meta'); return !m || m.textContent !== l; }, last, { timeout: 8000 });
    const meta = await page.$('.ck-itemtop .meta'); if (!meta) return false;
    last = await meta.textContent(); await sleep(50);
    if (await page.$('.ck-thermo.live')) { const box = await page.locator('.ck-thermo-body').boundingBox(); await page.mouse.click(box.x + box.width * 0.4, box.y + box.height / 2); await page.click('.ck-actions .btn.solid'); }
    else if (await page.$('.ck-ladder')) { await page.click('.ck-rung >> nth=3'); await page.click('.ck-actions .btn.solid'); }
    else if (await page.$('.ck-seg')) await page.click('.ck-seg button >> nth=1');
    else { const bs = page.locator('.ck-choices .btn'); const c = await bs.count(); await bs.nth(Math.min(c - 1, 1)).click(); }
  }
  if (n < 20) await sleep(600);                                    /* the last tap's screen is still on its way out */
  return true;
}
const stored = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('lg.checkin.v1')));
async function newRoom(page) { const r = await post('/room/new', { lang: 'en' }); await page.goto(URL_(r.code)); await page.waitForSelector('.ck-room'); return r; }

const view = VIEWS[0];
{
  console.log('a normal round: the upload carries the room tag, not the code; the phone joins again after a reveal');
  await post('/__reset');
  const { ctx, page, errors } = await open(B.browser, view, 'light');
  const { code, host_key, tag } = await newRoom(page);
  ok(/^[A-Z2-7]{12}$/.test(tag || ''), 'room/new hands out a tag: ' + tag);
  await host(code, host_key, 'start'); await page.waitForSelector('#ck-go'); await page.click('#ck-go');
  await answer(page, 20); await page.waitForSelector('.ck-ring'); await sleep(900);
  const up = (await get('/__log')).log.find((x) => x.path === '/upload');
  ok(up && up.body.room === tag && up.body.room !== code && up.body.round === 1, 'upload room is the tag: ' + (up && up.body.room));
  const pend = (await get('/__uploads')).pending[0];
  ok(pend && /^[0-9a-f]{24}$/.test(pend.room || '') && pend.round === 1, 'the server keeps only a hash of the tag: ' + (pend && pend.room));
  await host(code, host_key, 'reveal'); await page.waitForSelector('.ck-fewbox');
  await host(code, host_key, 'next'); await page.waitForSelector('.ck-banner');
  let joined = 0; for (let k = 0; k < 12 && joined !== 1; k++) { joined = (await get('/room/' + code)).state.joined; if (joined !== 1) await sleep(500); }
  ok(joined === 1, 'the phone is counted again in the next lobby: joined ' + joined);
  ok((await page.textContent('.ck-roomhead')).includes(W('room.round', { n: 2 })), 'lobby names the coming round: ' + (await page.textContent('.ck-roomhead')));
  if (errors.length) { fails++; console.log('  errors:', errors); }
  await ctx.close();
}
{
  console.log('the round is revealed while the phone is still answering');
  await post('/__reset');
  const { ctx, page, errors } = await open(B.browser, view, 'light');
  const { code, host_key } = await newRoom(page);
  await host(code, host_key, 'start'); await page.waitForSelector('#ck-go'); await page.click('#ck-go');
  await answer(page, 6);
  await host(code, host_key, 'reveal');
  await answer(page, 14);
  await page.waitForSelector('.ck-result, .ck-room .ck-card', { timeout: 8000 }); await sleep(1500);
  const e = (await stored(page)).history[0];
  ok(e && e.send && e.send.error === 'closed', 'the server said closed: ' + JSON.stringify(e && e.send));
  ok((await page.textContent('.ck-room')).includes(W('room.late')), 'the page says the answers came too late');
  await shot(page, 'late-closed', { full: true });
  { const holes = await noHoles(page); ok(!holes.length, `${'late'} words with holes: ${holes}`); }
  const up = (await get('/__log')).log.find((x) => x.path === '/upload');
  ok(up && !('room' in up.body), 'a check-in the room did not take is not tagged to it');
  if (errors.length) { fails++; console.log('  errors:', errors); }
  await ctx.close();
}
{
  console.log('the room is at another round when the phone sends');
  await post('/__reset');
  const { ctx, page, errors } = await open(B.browser, view, 'light');
  const { code, host_key } = await newRoom(page);
  await host(code, host_key, 'start'); await page.waitForSelector('#ck-go'); await page.click('#ck-go');
  await answer(page, 6);
  await host(code, host_key, 'reveal'); await host(code, host_key, 'next'); await host(code, host_key, 'open');
  await answer(page, 14);
  await page.waitForSelector('#ck-go', { timeout: 12000 });                 /* the page ends up where the room is: round 2 is open for this phone */
  const e = (await stored(page)).history[0];
  ok(e && e.send && e.send.error === 'round', 'the server said round: ' + JSON.stringify(e && e.send));
  ok((await page.textContent('.ck-roomhead')).includes(W('room.round', { n: 2 })), 'the page is on round 2');
  if (errors.length) { fails++; console.log('  errors:', errors); }
  await ctx.close();
}
{
  console.log('the host takes the split off while the phone is answering');
  await post('/__reset');
  const { ctx, page, errors } = await open(B.browser, view, 'light');
  const { code, host_key } = await newRoom(page);
  await host(code, host_key, 'split', { sides: ['Class A', 'Class B'] });
  await host(code, host_key, 'start'); await page.waitForSelector('#ck-go');
  await page.click('.ck-sides .btn >> nth=0'); await page.click('#ck-go');
  await answer(page, 6);
  /* the phone's last look at the room still shows the split (a poll that has not come yet): the stale answer is made certain here */
  await page.route(/\/room\/[A-Z]{6}$/, async (route) => { const r = await route.fetch(); const j = await r.json(); if (j.state) j.state.sides = ['Class A', 'Class B']; await route.fulfill({ response: r, body: JSON.stringify(j) }); });
  await host(code, host_key, 'split', { sides: null });
  await answer(page, 14); await page.waitForSelector('.ck-ring', { timeout: 10000 });
  const dones = (await get('/__log')).log.filter((x) => x.path.endsWith('/done'));
  ok(dones.length === 2 && dones[0].body.side === 0 && !('side' in dones[1].body), 'sent with the side, then again without: ' + JSON.stringify(dones.map((d) => d.body.side)));
  ok((await get('/room/' + code)).state.done === 1, 'the answers were taken');
  if (errors.length) { fails++; console.log('  errors:', errors); }
  await ctx.close();
}
await B.close();
console.log(fails ? `\n${fails} problem(s)` : '\nlate: all good');
process.exit(fails ? 1 : 0);
