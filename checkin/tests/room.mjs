/* Check-in test: the player in a room, driven by a fake host through the mock API. */
import { boot, open, VIEWS, shot, sleep, overflowX, noHoles, post, get, W } from './lib.mjs';

const B = await boot();
let fails = 0;
const ok = (c, msg) => { if (!c) { fails++; console.log('  FAIL', msg); } };

async function answerAll(page) {
  let last = '';
  for (let n = 0; n < 25; n++) {
    await page.waitForFunction((l) => { const m = document.querySelector('.ck-itemtop .meta'); return !m || m.textContent !== l; }, last, { timeout: 8000 });
    const meta = await page.$('.ck-itemtop .meta'); if (!meta) break;
    last = await meta.textContent();
    await sleep(60);
    if (await page.$('.ck-thermo.live')) { const box = await page.locator('.ck-thermo-body').boundingBox(); await page.mouse.click(box.x + box.width * 0.4, box.y + box.height / 2); await page.click('.ck-actions .btn.solid'); }
    else if (await page.$('.ck-ladder')) { await page.click('.ck-rung >> nth=3'); await page.click('.ck-actions .btn.solid'); }
    else if (await page.$('.ck-seg')) await page.click('.ck-seg button >> nth=1');
    else { const bs = page.locator('.ck-choices .btn'); const c = await bs.count(); await bs.nth(Math.min(c - 1, 1)).click(); }
  }
}
const host = (code, key, action, extra) => post(`/room/${code}/host`, Object.assign({ host_key: key, action }, extra || {}));

for (const view of VIEWS) for (const scheme of ['light', 'dark']) {
  const tag = `room-${view.id}-${scheme}`;
  console.log(tag);
  await post('/__reset');
  const room = await post('/room/new', { lang: 'en' });
  const { code, host_key } = room;
  ok(/^[A-Z]{6}$/.test(code), `${tag} code ${code}`);
  const { ctx, page, errors } = await open(B.browser, view, scheme);

  /* wrong code */
  await page.goto('http://127.0.0.1:4180/checkin/room/#ZZZZZZ');
  await page.waitForSelector('.ck-codeform');
  ok((await page.textContent('.ck-status')) === W('room.not_found'), `${tag} not found message`);
  await shot(page, `${tag}-notfound`);

  /* lobby */
  await page.fill('.ck-input', code); await page.click('.ck-codeform .btn');
  await page.waitForSelector('.ck-room');
  ok((await page.textContent('.ck-room')).includes(W('room.in')) && (await page.textContent('.ck-room')).includes(W('room.privacy')), `${tag} lobby text`);
  ok((await get('/room/' + code)).state.joined === 1, `${tag} joined 1`);
  await shot(page, `${tag}-lobby`);

  /* split on, then start live */
  await host(code, host_key, 'split', { sides: ['Class A', 'Class B'] });
  await host(code, host_key, 'start');
  await page.waitForSelector('#ck-go', { timeout: 8000 });
  ok(await page.locator('#ck-go').isDisabled(), `${tag} start waits for a side`);
  await shot(page, `${tag}-intro-sides`);
  await page.click('.ck-sides .btn >> nth=1');
  ok(!(await page.locator('#ck-go').isDisabled()), `${tag} start enabled after side`);
  await page.click('#ck-go');
  await answerAll(page);
  await page.waitForSelector('.ck-ring');
  await sleep(1500);
  await shot(page, `${tag}-waiting`);
  let st = (await get('/room/' + code)).state;
  ok(st.done === 1, `${tag} done 1 (got ${st.done})`);
  const doneCall = (await get('/__log')).log.find((x) => x.path.endsWith('/done'));
  ok(doneCall && doneCall.body.side === 1 && doneCall.body.round === 1 && doneCall.body.a && Object.keys(doneCall.body.a).length === 20, `${tag} /done body ${doneCall && JSON.stringify(Object.keys(doneCall.body))}`);
  ok(doneCall && /^[0-9a-f]{32}$/.test(doneCall.body.key || ''), `${tag} room key is its own 32 hex`);
  ok(doneCall && doneCall.body.role === doneCall.body.a.role, `${tag} /done carries the role`);
  const ids = await page.evaluate(() => JSON.parse(localStorage.getItem('lg.checkin.v1')));
  ok(!ids.id || ids.id !== (doneCall && doneCall.body.key), `${tag} room key differs from the research id`);

  /* ring follows the others, then reveal. The server's release rule: a split shows only when each side has 10 phones */
  await post('/__fill', { code, n: 24, sides: true, lean: 1, weigh: 'y_load' });
  await page.waitForFunction(() => document.querySelector('.ck-ring-n b')?.textContent === '25', null, { timeout: 8000 });
  await shot(page, `${tag}-ring25`);
  await host(code, host_key, 'reveal');
  await page.waitForSelector('.ck-group', { timeout: 8000 });
  await sleep(1600);
  ok(await page.$('.ck-split'), `${tag} split card`);
  ok((await page.$$('.ck-split .ck-cv')).length === 2, `${tag} both sides drawn (12 + 13 phones): ${(await page.$$('.ck-split .ck-cv')).length}`);
  ok((await page.$$('.ck-dbars .ck-drow')).length >= 6, `${tag} bars rows`);
  ok(await page.$('.ck-drow.mark'), `${tag} lowest bar marked`);
  const o = await overflowX(page); ok(!o.length, `${tag} reveal overflow ${JSON.stringify(o)}`);
  await shot(page, `${tag}-reveal`, { full: true });
  { const holes = await noHoles(page); ok(!holes.length, `${tag} words with holes: ${holes}`); }

  /* new round: banner, start again, answer, and stay under 10 */
  await host(code, host_key, 'split', { sides: null });
  await host(code, host_key, 'next');
  await page.waitForSelector('.ck-banner', { timeout: 8000 });
  await shot(page, `${tag}-newround`);
  await host(code, host_key, 'open');
  await page.waitForSelector('#ck-go', { timeout: 8000 });
  await page.click('#ck-go');
  await answerAll(page);
  await page.waitForSelector('.ck-ring');
  await host(code, host_key, 'reveal');
  await page.waitForSelector('.ck-fewbox', { timeout: 8000 });
  ok((await page.textContent('.ck-group')).includes(W('room.group_few', { n: 1 })), `${tag} few card: ${await page.textContent('.ck-group')}`);
  await shot(page, `${tag}-few`, { full: true });

  /* closed */
  await host(code, host_key, 'close');
  await page.waitForFunction((t) => document.body.innerText.includes(t), W('room.over'), { timeout: 8000 });
  await shot(page, `${tag}-closed`);

  /* a second phone, offline blip: the page keeps going */
  const rr = await post('/room/new', { lang: 'en' });
  await page.goto('http://127.0.0.1:4180/checkin/room/#' + rr.code);
  await page.waitForSelector('.ck-room');
  await post('/__config', { failNext: 3 });
  await sleep(9000);
  await post('/__config', { failNext: 0 });
  await host(rr.code, rr.host_key, 'start');
  await page.waitForSelector('#ck-go', { timeout: 15000 });
  ok(true, 'recovered after failures');
  if (errors.length) { fails++; console.log('  errors:', errors); }
  await ctx.close();
}
await B.close();
console.log(fails ? `\n${fails} problem(s)` : '\nroom: all good');
process.exit(fails ? 1 : 0);
