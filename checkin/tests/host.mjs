/* Check-in test: the host screen and the host history, with fake phones in the mock room. */
import { boot, open, VIEWS, shot, sleep, overflowX, noHoles, post, get, W, WORDS } from './lib.mjs';

const B = await boot();
const WORDS_PRESET = (i) => WORDS['host.presets'][i];
let fails = 0;
const ok = (c, msg) => { if (!c) { fails++; console.log('  FAIL', msg); } };

for (const view of VIEWS) for (const scheme of ['light', 'dark']) {
  const tag = `host-${view.id}-${scheme}`;
  console.log(tag);
  await post('/__reset');
  const { ctx, page, errors } = await open(B.browser, view, scheme);

  /* front, make a room */
  await page.goto('http://127.0.0.1:4180/checkin/host/');
  await page.waitForSelector('#ck-make');
  await shot(page, `${tag}-front`);
  await page.click('#ck-make');
  await page.waitForSelector('.ck-joincard');
  const hash = await page.evaluate(() => location.hash.slice(1));
  ok(/^[BCDFGHJKMNPQRSTVWXZ]{6}[0-9a-f]{32}$/.test(hash), `${tag} host key in the address: ${hash}`);
  const code = (await page.$$eval('.ck-codeshow i', (n) => n.map((x) => x.textContent).join('')));
  ok(/^[A-Z]{6}$/.test(code), `${tag} code shown: ${code}`);
  ok(!!(await page.$('.ck-qr')), `${tag} qr drawn`);
  ok(await page.evaluate((c) => document.querySelector('.ck-linkrow code').textContent.endsWith('/room/#' + c), code), `${tag} join link text`);
  const o1 = await overflowX(page); ok(!o1.length, `${tag} lobby overflow ${JSON.stringify(o1)}`);
  await shot(page, `${tag}-lobby`, { full: true });

  /* copy buttons */
  await page.click('.ck-linkrow .chip >> nth=0'); await sleep(250);
  ok((await page.textContent('.ck-linkrow .chip >> nth=0')) === W('host.copied'), `${tag} copied label`);
  ok((await page.evaluate(() => navigator.clipboard.readText())).includes('/room/#' + code), `${tag} clipboard has join link`);

  /* split by a preset (the split sits behind its link) */
  ok(!(await page.$('.ck-presets')), `${tag} split closed until asked`);
  await page.click('#ck-split-open');
  const pair = WORDS_PRESET(1);
  await page.click('.ck-presets .chip >> nth=1');
  await page.waitForSelector('.ck-sideNow');
  ok((await page.textContent('.ck-sideNow')) === W('host.split_now', { a: pair[0], b: pair[1] }), `${tag} split set`);
  await shot(page, `${tag}-lobby-split`);

  /* a phone joins; start live; fake phones answer */
  const joinKey = 'a1b2c3d4e5f60718293a4b5c6d7e8f90';
  await post(`/room/${code}/join`, { key: joinKey });
  await page.waitForFunction((want) => (document.querySelector('.ck-badge:last-child')?.textContent || '').includes(want), W('host.here', { n: 1 }), { timeout: 8000 });
  await page.click('#ck-live');
  await page.waitForSelector('#ck-reveal');
  ok(await page.locator('.ck-ring').count() === 1, `${tag} ring in play`);
  await post('/__fill', { code, n: 6, sides: true, lean: 0 });
  await page.waitForFunction(() => document.querySelector('.ck-ring-n b')?.textContent === '6', null, { timeout: 8000 });
  ok(!(await page.locator('.ck-start + .ck-small').isHidden()), `${tag} under-10 note visible`);
  await shot(page, `${tag}-play6`);
  /* reveal below 10: count only */
  await page.click('#ck-reveal');
  await page.waitForSelector('.ck-fewbox', { timeout: 8000 });
  ok(!(await page.$('.ck-curve')), `${tag} no curve under 10`);
  await shot(page, `${tag}-reveal-few`);
  ok((await page.$$('.ck-hostacts .btn')).length >= 2, `${tag} actions after reveal`);

  /* round 2: open, 24 phones in two sides (the release rule wants 10 on each) */
  await page.click('#ck-next'); await page.waitForSelector('#next-yes'); await page.click('#next-yes');
  await page.waitForSelector('#ck-open');
  await page.click('#ck-open');
  await page.waitForSelector('#ck-reveal');
  await post('/__fill', { code, n: 24, sides: true, lean: -1, weigh: 'y_support', seed: 11 });
  await page.waitForFunction(() => document.querySelector('.ck-ring-n b')?.textContent === '24', null, { timeout: 8000 });
  await shot(page, `${tag}-play24`);
  await page.click('#ck-reveal');
  await page.waitForSelector('.ck-group .ck-curve', { timeout: 8000 });
  await sleep(1500);
  ok(await page.$('.ck-split .ck-legend'), `${tag} split legend`);
  ok((await page.$$('.ck-split .ck-cv')).length === 2, `${tag} both sides drawn (12 and 12)`);
  ok(await page.$('#ck-try'), `${tag} try button`);
  const lever = await page.textContent('.ck-lever .ck-lowest');
  ok(lever === W('host.lever_lowest', { bar: W('bar.y_support') }), `${tag} lowest bar is support: ${lever}`);
  ok((await page.textContent('.ck-lever')).includes(W('host.lever.y_support')) && (await page.textContent('.ck-lever')).includes(W('host.ask_first')), `${tag} the lever line and "ask your group first"`);
  const o2 = await overflowX(page); ok(!o2.length, `${tag} reveal overflow ${JSON.stringify(o2)}`);
  await shot(page, `${tag}-reveal`, { full: true });
  { const holes = await noHoles(page); ok(!holes.length, `${tag} words with holes: ${holes}`); }
  await page.click('#ck-try');
  await page.waitForSelector('.ck-lever .ck-status.ok', { timeout: 6000 });
  const tried = (await get(`/host/${hash}`)).rounds.find((r) => r.n === 2).tried;
  ok(tried === 'y_support', `${tag} tried saved on server: ${tried}`);

  /* round 3: same bar again, expect the moved line */
  await page.click('#ck-next'); await page.waitForSelector('#next-yes'); await page.click('#next-yes');
  await page.waitForSelector('#ck-live');
  await page.click('#ck-live');
  await page.waitForSelector('#ck-reveal');
  await post('/__fill', { code, n: 12, lean: 2, seed: 5 });
  await page.waitForFunction(() => document.querySelector('.ck-ring-n b')?.textContent === '12', null, { timeout: 8000 });
  await page.click('#ck-reveal');
  await page.waitForSelector('.ck-moved', { timeout: 8000 });
  const mv = await page.textContent('.ck-moved');
  ok(mv.includes(W('lever.short.y_support')) && mv.includes(W('bar.y_support')) && !!(await page.$('.ck-moved.up')), `${tag} moved line: ${mv}`);
  await shot(page, `${tag}-moved`);

  /* history page */
  await page.click('.ck-hostacts a.btn');
  await page.waitForSelector('.ck-hround');
  await sleep(900);
  ok((await page.$$('.ck-hround')).length === 3, `${tag} 3 rounds in history`);
  ok(await page.$('.ck-trend .ck-tcol'), `${tag} trend`);
  const o3 = await overflowX(page); ok(!o3.length, `${tag} history overflow ${JSON.stringify(o3)}`);
  await shot(page, `${tag}-history`, { full: true });
  { const holes = await noHoles(page); ok(!holes.length, `${tag} words with holes: ${holes}`); }
  await page.click('.ck-toplink');
  await page.waitForSelector('.ck-hostscreen');

  /* the host link survives a reload and the room can be found again from the front */
  await page.reload(); await page.waitForSelector('.ck-hostscreen .ck-hostacts, .ck-hostscreen .ck-grid', { timeout: 8000 });
  await page.goto('http://127.0.0.1:4180/checkin/host/'); await page.waitForSelector('.ck-mode');
  ok((await page.textContent('.ck-mode b')) === code, `${tag} saved room listed on the front`);
  await shot(page, `${tag}-front-saved`);

  /* close, with the sure-sheet */
  await page.click('.ck-mode'); await page.waitForSelector('#ck-close');
  await page.click('#ck-close'); await page.waitForSelector('#close-yes');
  await shot(page, `${tag}-close-sheet`);
  await page.click('#close-yes');
  await page.waitForFunction((t) => document.body.innerText.includes(t), W('host.closed'), { timeout: 8000 });
  ok(!(await page.$('#ck-next')), `${tag} no next round when closed`);
  await shot(page, `${tag}-closed`);

  /* an unknown host link */
  await page.goto('http://127.0.0.1:4180/checkin/host/#' + 'BBBBBB' + '0'.repeat(32));
  await page.waitForSelector('#ck-make');
  ok((await page.textContent('.ck-status')) === W('host.not_found'), `${tag} unknown host link message`);
  if (errors.length) { fails++; console.log('  errors:', errors); }
  await ctx.close();
}
await B.close();
console.log(fails ? `\n${fails} problem(s)` : '\nhost: all good');
process.exit(fails ? 1 : 0);
