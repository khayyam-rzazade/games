/* My Logicers, 8 Nov 2026: Logicer Studio in My Logicers (claude/studio-plan.md, chat D).
   node me/tests/studio.test.mjs      (ME_REAL=<folder with the real me-stats.js, me.js, me-passkey.js>, default assets/js of this site)
   What it proves:
     - the record's rules for a Studio game (me-stats.js: kind "studio", its id, the gone list, the streaks of others) and that the server's copy is the same file;
     - the maker key and every edit key travel in the sealed box and never in the open record; a second phone gets them with the code;
     - "Games you made": the maker's name (rename), each game with its numbers, "Listed" / "Not listed yet" / "Hidden by Logicers", Results and the CSV only when the
       maker keeps the answers, Share, Edit, Delete for good (and a game made again at the same address is not the one that was deleted);
     - "Games by others": the player's streak in each, from the days kept on the phone, and the same days on the second phone;
     - Exit takes every Studio key off the phone; a Studio Worker that is away breaks nothing.
   The Studio's Worker is a stand-in that answers as the contract in section 3 of the plan says (the shapes the page expects are written at the top of me/api.js). */
import { createRequire } from 'node:module';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
process.env.ME_REAL = process.env.ME_REAL || path.resolve(HERE, '../../assets/js');
const { start } = await import('./server.mjs');
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const M = require(path.join(process.env.ME_REAL, 'me-stats.js'));
const SHOTS = process.env.ME_SHOTS || '/home/claude/work/me-shots';
fs.mkdirSync(SHOTS, { recursive: true });
let pass = 0; const fails = [];
function check(name, ok, detail) { if (ok) { pass++; console.log('  ok  ', name); } else { fails.push(name + (detail !== undefined ? ' — ' + JSON.stringify(detail) : '')); console.log('  FAIL', name, detail !== undefined ? JSON.stringify(detail).slice(0, 300) : ''); } }

/* ---------------------------------------------------------------- the rules, no browser */
console.log('the record\'s rules for a Studio game');
check('a Studio id is "<maker>/<game>", with "~<made>" for a game made here', M.codeOk('studio', 'anna-rossi/history-a-day') && M.codeOk('studio', 'anna-rossi/history-a-day~lq4k2x1z') && M.codeOk('studio', 'ayşe/günlük-soru'));
check('not an id: three parts, a colon, a space, a short kit code, an empty part, a "?"', ['a/b/c', 'a:b/c', 'a b/c', 'BCDFGHJ', '/b', 'a/', 'a/b?x', 'a/b#x', 'a/b%20', 'a/b~'].every((x) => !M.codeOk('studio', x)));
check('a kit code is still a kit code, and a Studio id is not one', M.codeOk('made', 'BCDFGHJ') && !M.codeOk('made', 'anna/quiz') && !M.codeOk('checkin', 'anna/quiz'));
check('the gone list takes both shapes and nothing else', M.GONE_RE.test('studio:anna/quiz~abc1') && M.GONE_RE.test('made:BCDFGHJ') && !M.GONE_RE.test('studio:BCDFGHJ') && !M.GONE_RE.test('made:anna/quiz') && !M.GONE_RE.test('other:BCDFGHJ'));
const dirty = M.clean({ v: 2, mine: [{ kind: 'studio', code: 'anna/quiz~abc', title: 'Quiz\u0001 one', made: '2026-11-08' }, { kind: 'studio', code: 'bad id', title: 'x' }, { kind: 'made', code: 'anna/quiz' }, { kind: 'studio', code: 'a/b', title: 'x'.repeat(200) }],
  sp: { 'bo/quiz': { f: '2026-11-06', d: '111', ti: 'Quiz', by: 'Bo' }, 'bo/quiz~x': { f: '2026-11-06', d: '1' }, bad: { f: '2026-11-06', d: '1' }, 'cem/x': { f: 'nope', d: '1' }, 'dan/x': { f: '2026-11-06', d: '12' } } });
check('clean keeps the good Studio games (title cut and cleaned) and drops the rest', dirty.mine.length === 2 && dirty.mine[0].title === 'Quiz  one' && dirty.mine[1].title.length === 80, dirty.mine);
check('clean keeps the good streaks only (a made-here id, a bad id, a bad date, a bad day string go)', Object.keys(dirty.sp || {}).join() === 'bo/quiz', dirty.sp);
const many = {}; for (let i = 0; i < 50; i++) many['m' + i + '/g'] = { f: '2026-11-06', d: '1', ti: 't', by: 'b' };
check('at most 30 games of others keep a streak', Object.keys(M.clean({ v: 2, sp: many }).sp).length === 30);
const mg = M.merge({ v: 2, sp: { 'bo/quiz': { f: '2026-11-06', d: '111', ti: 'Old', by: 'Bo' }, 'x/y': { f: '2026-11-01', d: '1', ti: 'Y', by: 'X' } } }, { v: 2, sp: { 'bo/quiz': { f: '2026-11-08', d: '11', ti: 'New', by: 'Bo' } } });
check('merge: the days of both, the newer words, a game only one side has stays', mg.sp['bo/quiz'].f === '2026-11-06' && mg.sp['bo/quiz'].d === '1111' && mg.sp['bo/quiz'].ti === 'New' && mg.sp['x/y'].d === '1', mg.sp);
const st = M.stats(Object.assign(M.clean({ v: 2, sp: { 'bo/quiz': { f: '2026-11-06', d: '111', ti: 'Quiz', by: 'Bo' }, 'cem/old': { f: '2026-10-01', d: '11', ti: 'Old', by: 'Cem' } } }), { _open: { maker: { slug: 'anna', name: 'Anna', key: 'KEY1' } } }), {}, { today: '2026-11-08' });
check('stats: the maker with its key, the games of others with their streaks, the newest first', st.maker.key === 'KEY1' && st.others.length === 2 && st.others[0].id === 'bo/quiz' && st.others[0].current === 3 && st.others[1].current === 0 && st.others[1].longest === 2, st.others);
check('stats: no maker without a key in the box', M.stats(M.clean({ v: 2 }), {}, { today: '2026-11-08' }).maker === null);
check('the server\'s copy of me-stats.js is the same file', fs.readFileSync(path.join(process.env.ME_REAL, 'me-stats.js'), 'utf8') === fs.readFileSync(path.resolve(HERE, '../../server/me/me-stats.js'), 'utf8'));

/* ---------------------------------------------------------------- the words */
console.log('the words');
const STUDIO_WORDS = ['made_h', 'others_h', 'n_games', 'n_plays', 'listed', 'unlisted', 'hidden', 'by', 'items', 'items1', 'answers', 'answers1', 'no_answers', 'c_item', 'c_answer', 'del', 'name_h', 'name_line', 'name_short', 'name_ph'].map((k) => 'studio.' + k);
const LANGS = ['en', 'es', 'fr', 'it', 'pt', 'tr'], WORDS = Object.fromEntries(LANGS.map((l) => [l, JSON.parse(fs.readFileSync(path.resolve(HERE, '../lang/' + l + '.json'), 'utf8'))]));
check('every Studio key is in all six languages, with the same {placeholders}', LANGS.every((l) => STUDIO_WORDS.every((k) => typeof WORDS[l][k] === 'string' && WORDS[l][k].length && (WORDS.en[k].match(/\{\w+\}/g) || []).join() === (WORDS[l][k].match(/\{\w+\}/g) || []).join())));
check('the six files have the same keys', LANGS.every((l) => Object.keys(WORDS[l]).join() === Object.keys(WORDS.en).join()));
check('the words "approved" and "checked" are in no Studio key (English)', STUDIO_WORDS.every((k) => !/approv|checked|verified|vetted/i.test(WORDS.en[k])), STUDIO_WORDS.filter((k) => /approv|checked/i.test(WORDS.en[k])));
check('a status is "Listed", "Not listed yet" or "Hidden by Logicers"', WORDS.en['studio.listed'] === 'Listed' && WORDS.en['studio.unlisted'] === 'Not listed yet' && WORDS.en['studio.hidden'] === 'Hidden by Logicers');

/* ---------------------------------------------------------------- the stand-in of the Studio's Worker */
const calls = [];
const MAKER_KEY = 'MAKERKEYAAAAAAAAAAAAAAAA';
let NAME = 'Anna Rossi';
const GAMES = {
  'history-a-day': { edit: 'EDITKEYHISTORY0000000000', title: 'History a day', plays: 42, items: 30, listed: true, listed_by_khayyam: true, hidden: false, keep_answers: true },
  'quiz-two': { edit: 'EDITKEYQUIZTWO0000000000', title: 'Quiz two', plays: 7, items: 5, listed: true, listed_by_khayyam: false, hidden: false, keep_answers: false },
  'secret': { edit: 'EDITKEYSECRET00000000000', title: 'Secret', plays: 3, items: 2, listed: false, listed_by_khayyam: false, hidden: true, keep_answers: false }
};   // "old-one" is not here: the Worker does not know it
const ANSWERS = [[1, 'Ana', 'Rome', Date.UTC(2026, 10, 7, 9, 30)], [2, 'Bo, "the" best', '1789', Date.UTC(2026, 10, 7, 10)], [1, '', 'Paris', Date.UTC(2026, 10, 7, 11)]];
let OLD_WORKER = false, MAKER_GONE = false;
const byEdit = (k) => Object.entries(GAMES).find(([, g]) => g.edit === k);
const stand = http.createServer((req, res) => {
  let body = '';
  req.on('data', (c) => { body += c; });
  req.on('end', () => {
    const p = new URL(req.url, 'http://x').pathname; let b = {}; try { b = JSON.parse(body || '{}'); } catch (e) { b = {}; }
    const send = (st, o) => { res.writeHead(st, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' }); res.end(JSON.stringify(o)); };
    if (req.method === 'OPTIONS') return send(204, {});
    calls.push({ m: req.method, p, b });
    if (p === '/maker/get') {
      if (b.key !== MAKER_KEY) return send(404, { ok: false });
      /* chat A's Worker says "status" (listed | waiting | private | hidden); one game is told the older way (listed, listed_by_khayyam, hidden) to see both read */
      const stat = (g) => g.hidden ? 'hidden' : g.listed && g.listed_by_khayyam ? 'listed' : g.listed ? 'waiting' : 'private';
      return send(200, { ok: true, maker: { slug: 'anna-rossi', name: NAME }, games: Object.entries(GAMES).map(([slug, g]) => slug === 'secret' ? Object.assign({ slug }, g) : Object.assign({ slug }, g, { status: stat(g), listed: undefined, listed_by_khayyam: undefined, hidden: undefined })) });
    }
    if (p === '/maker/edit') { if (b.key !== MAKER_KEY) return send(403, { ok: false }); if (typeof b.name !== 'string' || b.name.length < 2) return send(400, { ok: false }); NAME = b.name; return send(200, { ok: true }); }
    if (p === '/game/mine') {
      const e = byEdit(b.edit_key); if (!e) return send(404, { ok: false });
      return send(200, { ok: true, game: Object.assign({ slug: e[0] }, e[1]), answers: OLD_WORKER && e[1].keep_answers ? ANSWERS : undefined });
    }
    if (p === '/game/answers') {
      if (OLD_WORKER) return send(404, { ok: false });   /* a Worker that does not know the route (no error key) */
      const e = byEdit(b.edit_key); if (!e) return send(404, { ok: false, e: 'game' });
      if (!e[1].keep_answers) return send(200, { ok: true, rows: [] });
      const from = Number(b.after) || 0, page = ANSWERS.slice(from, from + 2);
      return send(200, { ok: true, rows: page.map((a, i) => i ? a : { item: a[0], name: a[1], answer: a[2], time: Math.round(a[3] / 1000) }), next: from + 2 < ANSWERS.length ? from + 2 : null });
    }
    if (p === '/game/delete') { const e = byEdit(b.edit_key); if (!e) return send(404, { ok: false }); delete GAMES[e[0]]; return send(200, { ok: true }); }
    if (p === '/maker/delete') { if (b.key !== MAKER_KEY) return send(403, { ok: false, e: 'key' }); MAKER_GONE = true; return send(200, { ok: true }); }   // 11 Nov 2026
    send(404, { ok: false });
  });
});
await new Promise((r) => stand.listen(4198, r));
const STAND = 'http://127.0.0.1:4198';

const srv = await start(4197, { real: true });
const browser = await chromium.launch({ executablePath: process.env.ME_CHROME || '/usr/bin/google-chrome' });

async function phone(o = {}) {
  const viewport = o.viewport || { width: 390, height: 780 };
  const ctx = await browser.newContext({ viewport, isMobile: viewport.width < 600, hasTouch: viewport.width < 600, locale: 'en-GB', acceptDownloads: true, colorScheme: o.dark ? 'dark' : 'light' });
  await ctx.addInitScript((c) => {
    window.LOGICERS_ME_API = '/__me'; window.ME_API = '/__me'; window.STUDIO_API = c.studio;
    window.LIVE_SERVER = c.studio; window.CHECKIN_API = c.studio; window.FINDOUT_ROOM_API = c.studio; window.FINDOUT_API = c.studio;
    if (localStorage.getItem('lg.test.seeded')) return; localStorage.setItem('lg.test.seeded', '1');
    if (!c.seed) return;
    const day = (iso) => Math.round(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / 864e5);
    const t = new Date(); const today = Math.round(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / 864e5);
    const ymd = (back) => { const d = new Date(Date.now() - back * 864e5); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
    const games = {}; games['100-of-us'] = { results: {} };
    for (let i = 0; i < 5; i++) games['100-of-us'].results[String(today - day('2026-10-03') + 1 - i)] = { g: 50, a: 50, id: 1 };
    localStorage.setItem('turnsout:v1', JSON.stringify({ games, world: { logicer: { n: 2195, d: '20261003' } } }));
    const now = Date.now();
    localStorage.setItem('logicers-studio:maker', JSON.stringify({ slug: 'anna-rossi', name: 'Anna Rossi', key: c.makerKey, t: now - 5 * 864e5 }));
    localStorage.setItem('logicers-studio:games', JSON.stringify([
      { maker: 'anna-rossi', slug: 'history-a-day', title: 'History a day', edit: c.edits.history, t: now - 4 * 864e5 },
      { maker: 'anna-rossi', slug: 'quiz-two', title: 'Quiz two', edit: c.edits.quiz, t: now - 2 * 864e5 },
      { maker: 'anna-rossi', slug: 'secret', title: 'Secret', edit: c.edits.secret, t: now - 1 * 864e5 },
      { maker: 'anna-rossi', slug: 'old-one', title: 'Old one', edit: 'EDITKEYOLDONE000000000000', t: now - 90 * 864e5 }]));
    localStorage.setItem('logicers-studio:played', JSON.stringify({
      'bo-lee/daily-number': { title: 'Daily number', by: 'Bo Lee', days: [ymd(2), ymd(1), ymd(0)] },
      'cem/old-quiz': { title: 'Old quiz', by: 'Cem', days: [ymd(20), ymd(19)] } }));
  }, { seed: !!o.seed, studio: o.studio || STAND, makerKey: MAKER_KEY, edits: { history: GAMES['history-a-day'].edit, quiz: GAMES['quiz-two'].edit, secret: GAMES.secret.edit } });
  const page = await ctx.newPage(); const errors = [], warns = [];
  page.on('pageerror', (e) => errors.push('pageerror ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push('console ' + m.text()); if (m.type() === 'warning' && /no words for/.test(m.text())) warns.push(m.text()); });
  return { ctx, page, errors, warns };
}
async function open(p, hash = '') { await p.page.goto(srv.url + '/me/' + (hash ? '#' + hash : '')); await p.page.waitForFunction(() => document.documentElement.dataset.ready); await p.page.waitForTimeout(1100); }
const item = (p, id) => p.page.locator('.me-studio .me-item[data-k="studio:' + id + '"]');
const itemBy = (p, slug) => p.page.locator('.me-studio .me-item[data-k*="/' + slug + '"]');   // F: the card no longer prints its address
const recOf = (c) => srv.worker.db.get(c) && srv.worker.db.get(c).record;
const shot = (p, n) => p.page.screenshot({ path: path.join(SHOTS, 'studio-' + n + '.png'), fullPage: true });
const local = (p, k) => p.page.evaluate((key) => JSON.parse(localStorage.getItem(key) || 'null'), k);

/* ---------------------------------------------------------------- phone A: a maker, four games, two games of others */
console.log('phone A: Games you made');
const A = await phone({ seed: true }); await open(A);
check('the section is there with the maker\'s name', (await A.page.locator('.me-studio h2').first().innerText()) === 'Games you made' && (await A.page.locator('.me-studio .me-maker .mk').innerText()) === 'Anna Rossi');
check('the maker\'s name leads to the maker\'s page', (await A.page.locator('.me-studio .me-maker .mk').getAttribute('href')) === 'https://by.logicers.com/anna-rossi/');
check('four games, none of them in Your games', (await A.page.locator('.me-studio .me-item').count()) === 4 && (await A.page.locator('.me-mine').count()) === 0);
const badge = async (slug) => (await itemBy(A, slug).locator('.kind').innerText());
check('status: Listed / Not listed yet / Hidden by Logicers', (await badge('history-a-day')) === 'Listed' && (await badge('quiz-two')) === 'Not listed yet' && (await badge('secret')) === 'Hidden by Logicers', [await badge('history-a-day'), await badge('quiz-two'), await badge('secret')]);
check('the numbers: plays and items', (await itemBy(A, 'history-a-day').locator('.me-inum').innerText()) === '42 plays · 30 questions' && (await itemBy(A, 'quiz-two').locator('.me-inum').innerText()) === '7 plays · 5 questions', await itemBy(A, 'history-a-day').locator('.me-inum').innerText());
check('a game the Worker does not know: said so, with Remove only', (await itemBy(A, 'old-one').locator('.me-inum').innerText()).includes('Not there any more') && (await itemBy(A, 'old-one').getByRole('button', { name: 'Remove' }).count()) === 1 && (await itemBy(A, 'old-one').locator('a').count()) === 0);
const tot = await A.page.locator('.me-studio .me-maker .tot').innerText();   // F: the totals sit in the header row
check('totals: games and plays (the games it knows)', /4\s*games/.test(tot) && /52\s*plays/.test(tot), tot);
check('the maker\'s numbers came with one /maker/get (the key in the body, never in the address)', calls.filter((c) => c.p === '/maker/get').length === 1 && calls.every((c) => !/KEY/.test(c.p)));
check('only the game /maker/get did not list was asked for on its own', calls.filter((c) => c.p === '/game/mine').map((c) => c.b.edit_key).join() === 'EDITKEYOLDONE000000000000', calls.filter((c) => c.p === '/game/mine').map((c) => c.b.edit_key));
check('Edit opens the editor of that game, with its key in the hash', (await itemBy(A, 'history-a-day').locator('a', { hasText: 'Edit' }).getAttribute('href')) === 'https://by.logicers.com/anna-rossi/history-a-day/edit/#' + GAMES['history-a-day'].edit);
check('Results only where the maker keeps the answers', (await itemBy(A, 'history-a-day').getByRole('button', { name: 'Results' }).count()) === 1 && (await itemBy(A, 'quiz-two').getByRole('button', { name: 'Results' }).count()) === 0);
check('a hidden game cannot be shared', (await itemBy(A, 'secret').getByRole('button', { name: 'Share' }).count()) === 0 && (await itemBy(A, 'quiz-two').getByRole('button', { name: 'Share' }).count()) === 1);
check('no "approved" or "checked" anywhere on the page', !/approv|checked/i.test(await A.page.locator('.me-studio').innerText()));
check('no sideways scroll on the phone', await A.page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
await shot(A, 'made-phone');

console.log('Results and the CSV');
await itemBy(A, 'history-a-day').getByRole('button', { name: 'Results' }).click(); await A.page.waitForTimeout(800);
const rows = await A.page.locator('.me-table tbody tr').allInnerTexts();
check('the table: newest answer first, three answers', rows.length === 3 && rows[0].includes('Paris') && rows[1].includes('1789') && rows[2].includes('Rome'), rows);
check('the sheet says how many answers', (await A.page.locator('.me-res-n').innerText()) === '3 answers');
const [dl] = await Promise.all([A.page.waitForEvent('download'), A.page.getByRole('button', { name: 'Download CSV' }).click()]);
const csv = fs.readFileSync(await dl.path(), 'utf8');
check('the CSV: header, a comma and quotes in a name kept, a missing name empty, the day and hour', csv.startsWith('﻿Question,Name,Answer,When\r\n') && csv.includes('2,"Bo, ""the"" best",1789,2026-11-07 10:00') && csv.includes('1,,Paris,2026-11-07 11:00') && csv.split('\r\n').length === 5, csv);
check('the file is named after the game', /^logicers-anna-rossi-history-a-day-/.test(dl.suggestedFilename()) && dl.suggestedFilename().endsWith('.csv'), dl.suggestedFilename());
check('the answers came from /game/answers in two asks (a row as an array, a row as an object with the time in seconds)', calls.filter((c) => c.p === '/game/answers').map((c) => c.b.after).join() === '0,2', calls.filter((c) => c.p === '/game/answers').map((c) => c.b.after));
await A.page.keyboard.press('Escape'); await A.page.waitForTimeout(400);
OLD_WORKER = true;
await itemBy(A, 'history-a-day').getByRole('button', { name: 'Results' }).click(); await A.page.waitForTimeout(800);
check('a Worker without /game/answers: the answers are read from /game/mine instead', (await A.page.locator('.me-table tbody tr').count()) === 3 && (await A.page.locator('.me-res-n').innerText()) === '3 answers');
OLD_WORKER = false;
await A.page.keyboard.press('Escape'); await A.page.waitForTimeout(400);

console.log('Share');
await itemBy(A, 'quiz-two').getByRole('button', { name: 'Share' }).click(); await A.page.waitForTimeout(500);
const sh = A.page.locator('dialog.me-sheet').last();
check('the link, Open, Copy and a QR', (await sh.locator('.me-linkline').innerText()) === 'by.logicers.com/anna-rossi/quiz-two/' && (await sh.locator('a', { hasText: 'Open' }).getAttribute('href')) === 'https://by.logicers.com/anna-rossi/quiz-two/' && (await sh.getByRole('button', { name: 'Copy' }).count()) === 1 && (await sh.locator('.me-qr svg').count()) === 1);
await A.page.keyboard.press('Escape'); await A.page.waitForTimeout(400);

console.log('Games by others');
check('two tiles, the one played today first', (await A.page.locator('.me-tile').filter({ hasText: 'by ' }).count()) === 2 && (await A.page.locator('.me-tile').filter({ hasText: 'by ' }).first().innerText()).includes('Daily number'));
const t1 = A.page.locator('.me-tile', { hasText: 'Daily number' }), t2 = A.page.locator('.me-tile', { hasText: 'Old quiz' });
check('a streak of 3, the maker\'s name, the game\'s address', (await t1.locator('.big').innerText()).trim() === '3' && (await t1.locator('.sub').innerText()) === 'by Bo Lee' && (await t1.getAttribute('href')) === 'https://by.logicers.com/bo-lee/daily-number/', await t1.innerText());
check('a broken streak shows 0, without a flame', (await t2.locator('.big').innerText()).trim() === '0' && (await t2.locator('.me-flame').count()) === 0 && (await t1.locator('.me-flame').count()) === 1);
check('the section is called Games by others', (await A.page.locator('h2', { hasText: 'Games by others' }).count()) === 1);

console.log('the maker\'s name');
await A.page.locator('.me-studio .me-maker').getByRole('button', { name: 'Edit' }).click(); await A.page.waitForTimeout(500);
let dlg = A.page.locator('dialog.me-sheet').last();
await dlg.locator('input').fill('A'); await dlg.getByRole('button', { name: 'Keep' }).click(); await A.page.waitForTimeout(300);
check('one letter is too short, nothing is sent', (await dlg.locator('.me-msg').innerText()) === 'At least 2 characters.' && !calls.some((c) => c.p === '/maker/edit'));
await dlg.locator('input').fill('  Anna   R.  '); await dlg.getByRole('button', { name: 'Keep' }).click(); await A.page.waitForTimeout(1200);
check('the Worker got the key and the cleaned name', calls.some((c) => c.p === '/maker/edit' && c.b.key === MAKER_KEY && c.b.name === 'Anna R.'), calls.filter((c) => c.p === '/maker/edit'));
check('the page and the phone have the new name', (await A.page.locator('.me-studio .me-maker .mk').innerText()) === 'Anna R.' && (await local(A, 'logicers-studio:maker')).name === 'Anna R.' && (await local(A, 'logicers-studio:maker')).slug === 'anna-rossi');

/* ---------------------------------------------------------------- A keeps a code: what the server sees */
console.log('A keeps a code');
await A.page.getByRole('button', { name: 'Get your code' }).click(); await A.page.waitForTimeout(600);
await A.page.getByRole('button', { name: 'Keep', exact: true }).click(); await A.page.waitForTimeout(1800);
const code = await A.page.evaluate(() => JSON.parse(localStorage.getItem('lg.me.v1') || '{}').code || null);
check('A keeps a code', /^[a-z]+-[a-z]+-[a-z]+-[1-9]\d$/.test(code || ''), code);
await open(A); await A.page.waitForTimeout(1500);
const rec = recOf(code), recText = JSON.stringify(rec);
check('the record holds the four games (title, address) and the two streaks', rec.mine.filter((x) => x.kind === 'studio').length === 4 && Object.keys(rec.sp || {}).length === 2 && rec.mine.some((x) => x.kind === 'studio' && x.title === 'History a day' && /^anna-rossi\/history-a-day~[a-z0-9]+$/.test(x.code)), rec.mine);
check('the maker key and every edit key are in the box only: not one of them in the open record', !/MAKERKEY|EDITKEY/.test(recText.replace(/"box":\{[^}]*\}/, '')) && !!rec.box && !/MAKERKEY|EDITKEY/.test(JSON.stringify(rec.box)), recText.slice(0, 300));
check('the streak days of others are in the record, with the titles', rec.sp['bo-lee/daily-number'] && rec.sp['bo-lee/daily-number'].d === '111' && rec.sp['bo-lee/daily-number'].ti === 'Daily number' && rec.sp['bo-lee/daily-number'].by === 'Bo Lee', rec.sp);
check('a game this phone made is not in the record twice or with a bad id', new Set(rec.mine.map((x) => x.kind + ':' + x.code)).size === rec.mine.length);
check('"Your games" is still not there: a Studio game is not a kit', (await A.page.locator('.me-mine').count()) === 0);

/* ---------------------------------------------------------------- phone B: the code brings the Studio keys */
console.log('phone B: the code brings it back');
const B = await phone({ seed: false }); await open(B, 'have');
await B.page.fill('input', code); await B.page.keyboard.press('Enter'); await B.page.waitForTimeout(2500);
await open(B); await B.page.waitForTimeout(1500);
const mk = await local(B, 'logicers-studio:maker'), gl = await local(B, 'logicers-studio:games'), pl = await local(B, 'logicers-studio:played');
check('B has the maker key, with the new name', mk && mk.key === MAKER_KEY && mk.slug === 'anna-rossi' && mk.name === 'Anna R.', mk);
check('B has the four games with their edit keys and titles', gl && gl.length === 4 && gl.find((g) => g.slug === 'history-a-day').edit === GAMES['history-a-day'].edit && gl.find((g) => g.slug === 'history-a-day').title === 'History a day' && gl.every((g) => g.t > 0), gl);
check('B has the days of the games of others', pl && pl['bo-lee/daily-number'] && pl['bo-lee/daily-number'].days.length === 3 && pl['bo-lee/daily-number'].title === 'Daily number' && pl['bo-lee/daily-number'].by === 'Bo Lee', pl);
check('B shows the same section: four games, the same numbers', (await B.page.locator('.me-studio .me-item').count()) === 4 && (await itemBy(B, 'history-a-day').locator('.me-inum').innerText()) === '42 plays · 30 questions' && (await B.page.locator('.me-studio .me-maker .mk').innerText()) === 'Anna R.');
check('B shows the games of others with the streak', (await B.page.locator('.me-tile', { hasText: 'Daily number' }).locator('.big').innerText()).trim() === '3');
check('B can edit: the same editor link', (await itemBy(B, 'history-a-day').locator('a', { hasText: 'Edit' }).getAttribute('href')) === 'https://by.logicers.com/anna-rossi/history-a-day/edit/#' + GAMES['history-a-day'].edit);
check('B: no script errors, no missing words', B.errors.length === 0 && B.warns.length === 0, [B.errors, B.warns]);
await shot(B, 'made-restored');

console.log('Delete for good, and a game made again at the same address');
await itemBy(B, 'quiz-two').getByRole('button', { name: 'More' }).click(); await B.page.waitForTimeout(400);
await B.page.getByRole('button', { name: 'Delete for good' }).click(); await B.page.waitForTimeout(300);
check('the sheet says what it deletes', (await B.page.locator('dialog.me-sheet').last().innerText()).includes('This deletes the game, its pictures and its answers for everyone. It can\'t be undone.'));
await B.page.locator('dialog.me-sheet').last().getByRole('button', { name: 'Delete', exact: true }).click(); await B.page.waitForTimeout(1800);
check('the Worker was told, with the game\'s own key', calls.some((c) => c.p === '/game/delete' && c.b.edit_key === 'EDITKEYQUIZTWO0000000000'), calls.filter((c) => c.p === '/game/delete'));
check('the card is gone, and so is the key on B', (await itemBy(B, 'quiz-two').count()) === 0 && !(await local(B, 'logicers-studio:games')).some((g) => g.slug === 'quiz-two'));
await B.page.waitForTimeout(1500);
const goneNow = recOf(code).gone || [];
check('the record says it is gone, by its own id', goneNow.some((k) => /^studio:anna-rossi\/quiz-two~[a-z0-9]+$/.test(k)), goneNow);
// the Studio makes a new game at the same address (a new key, a new day) and writes it as its pages do
await B.page.evaluate(() => {
  const l = JSON.parse(localStorage.getItem('logicers-studio:games') || '[]');
  l.unshift({ maker: 'anna-rossi', slug: 'quiz-two', title: 'Quiz two again', edit: 'EDITKEYQUIZNEW0000000000', t: Date.now() });
  localStorage.setItem('logicers-studio:games', JSON.stringify(l));
});
GAMES['quiz-two'] = { edit: 'EDITKEYQUIZNEW0000000000', title: 'Quiz two again', plays: 0, items: 1, listed: false, listed_by_khayyam: false, hidden: false, keep_answers: false };
await B.page.waitForTimeout(3000);
check('the new game with the old address reaches the record, and the old one stays gone', recOf(code).mine.filter((x) => x.kind === 'studio' && /^anna-rossi\/quiz-two~/.test(x.code)).length === 1 && recOf(code).mine.some((x) => x.kind === 'studio' && x.title === 'Quiz two again') && (recOf(code).gone || []).some((k) => /^studio:anna-rossi\/quiz-two~/.test(k)), [recOf(code).mine.filter((x) => x.kind === 'studio'), recOf(code).gone]);
await open(A); await A.page.waitForTimeout(1500);
check('A: the deleted game is gone and the new one is there', (await itemBy(A, 'Quiz two again').count()) + (await A.page.locator('.me-studio .me-item .ti', { hasText: 'Quiz two again' }).count()) >= 1 && (await A.page.locator('.me-studio .me-item .ti', { hasText: /^Quiz two$/ }).count()) === 0, await A.page.locator('.me-studio .me-item .ti').allInnerTexts());
check('A: the edit key of the new game is on A, the old one is not', (await local(A, 'logicers-studio:games')).some((g) => g.edit === 'EDITKEYQUIZNEW0000000000') && !(await local(A, 'logicers-studio:games')).some((g) => g.edit === 'EDITKEYQUIZTWO0000000000'));

console.log('Remove from the list, only');
await itemBy(B, 'old-one').getByRole('button', { name: 'Remove' }).click(); await B.page.waitForTimeout(1500);
check('Remove takes the game off the list without a call to delete it', (await itemBy(B, 'old-one').count()) === 0 && !calls.some((c) => c.p === '/game/delete' && c.b.edit_key === 'EDITKEYOLDONE000000000000'));

console.log('the days of games of others, on two phones');
await B.page.evaluate(() => {
  const p = JSON.parse(localStorage.getItem('logicers-studio:played') || '{}');
  const ymd = (back) => { const d = new Date(Date.now() - back * 864e5); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  p['bo-lee/daily-number'].days.push(ymd(3));
  p['dee/new-game'] = { title: 'New game', by: 'Dee', days: [ymd(0)] };
  localStorage.setItem('logicers-studio:played', JSON.stringify(p));
});
await B.page.waitForTimeout(3000);
check('the new day and the new game reach the record', recOf(code).sp['bo-lee/daily-number'].d === '1111' && !!recOf(code).sp['dee/new-game'], recOf(code).sp);
await open(A); await A.page.waitForTimeout(1500);
check('A: a streak of 4 and the new tile', (await A.page.locator('.me-tile', { hasText: 'Daily number' }).locator('.big').innerText()).trim() === '4' && (await A.page.locator('.me-tile', { hasText: 'New game' }).count()) === 1);

console.log('Exit takes every Studio key off the phone');
await open(B);
await B.page.getByRole('button', { name: 'Exit', exact: true }).click(); await B.page.waitForTimeout(400);
await B.page.locator('dialog.me-sheet').last().getByRole('button', { name: 'Exit' }).click(); await B.page.waitForTimeout(2500);
check('no maker key, no edit key, no streak of others left on B', await B.page.evaluate(() => !localStorage.getItem('logicers-studio:maker') && !localStorage.getItem('logicers-studio:games') && !localStorage.getItem('logicers-studio:played')));
check('B\'s page shows no Studio section any more', (await B.page.locator('.me-studio').count()) === 0 && (await B.page.locator('h2', { hasText: 'Games by others' }).count()) === 0);
check('the server still holds them', recOf(code).mine.some((x) => x.kind === 'studio') && !!recOf(code).sp);
await open(B, 'have'); await B.page.fill('input', code); await B.page.keyboard.press('Enter'); await B.page.waitForTimeout(2500);
await open(B); await B.page.waitForTimeout(1200);
check('the code brings them back', !!(await local(B, 'logicers-studio:maker')) && (await local(B, 'logicers-studio:games')).length >= 3 && (await B.page.locator('.me-studio .me-item').count()) >= 3);
check('B: no script errors, no missing words', B.errors.length === 0 && B.warns.length === 0, [B.errors, B.warns]);

/* ---------------------------------------------------------------- a Studio Worker that is away, and the wide screen */
console.log('the Studio Worker is away');
const C = await phone({ seed: true, studio: 'http://127.0.0.1:1' }); await open(C);
check('the cards are there without numbers, nothing breaks', (await C.page.locator('.me-studio .me-item').count()) === 4 && (await C.page.locator('.me-studio .me-inum:not([hidden])').count()) === 0 && (await C.page.locator('.me-studio .me-tot:not([hidden])').count()) === 0);
check('Edit and Share still work from what the phone holds; no Results without the numbers', (await itemBy(C, 'history-a-day').locator('a', { hasText: 'Edit' }).count()) === 1 && (await itemBy(C, 'history-a-day').getByRole('button', { name: 'Share' }).count()) === 1 && (await itemBy(C, 'history-a-day').getByRole('button', { name: 'Results' }).count()) === 0);
check('Delete for good with the Worker away says so and keeps the game', await (async () => {
  await itemBy(C, 'quiz-two').getByRole('button', { name: 'More' }).click(); await C.page.waitForTimeout(300);
  await C.page.getByRole('button', { name: 'Delete for good' }).click(); await C.page.waitForTimeout(200);
  await C.page.locator('dialog.me-sheet').last().getByRole('button', { name: 'Delete', exact: true }).click(); await C.page.waitForTimeout(1500);
  const msg = await C.page.locator('dialog.me-sheet').last().locator('.me-msg').innerText();
  await C.page.keyboard.press('Escape'); await C.page.waitForTimeout(300);
  return msg === 'No connection. Try again.' && (await local(C, 'logicers-studio:games')).some((g) => g.slug === 'quiz-two');
})());
check('C: no script errors', C.errors.length === 0, C.errors);
await C.ctx.close();

console.log('a wide screen, dark');
const W = await phone({ seed: true, viewport: { width: 1280, height: 900 }, dark: true }); await open(W);
const cols = await W.page.evaluate(() => getComputedStyle(document.querySelector('.me-studio .me-items')).gridTemplateColumns.split(' ').length);
check('the games sit side by side', cols >= 2, cols);
check('no sideways scroll on a wide screen', await W.page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
await shot(W, 'wide-dark');
check('W: no script errors, no missing words', W.errors.length === 0 && W.warns.length === 0, [W.errors, W.warns]);
await W.ctx.close();

console.log('a phone with a language of its own');
const I = await phone({ seed: true }); await I.page.goto(srv.url + '/me/?lang=it'); await I.page.waitForFunction(() => document.documentElement.dataset.ready); await I.page.waitForTimeout(1200);
check('Italian: the section is there (English words until chat E), nothing is missing', (await I.page.locator('.me-studio .me-item').count()) === 4 && I.warns.length === 0 && I.errors.length === 0, [I.warns, I.errors]);
await I.ctx.close();

/* ---------------------------------------------------------------- 11 Nov 2026: the maker's name and every game, deleted from here */
console.log('delete my name and all my games');
const D = await phone({ seed: true }); await open(D); await D.page.waitForTimeout(800);
await D.page.locator('.me-studio .me-maker').getByRole('button', { name: 'Edit' }).click(); await D.page.waitForTimeout(500);
let dd = D.page.locator('dialog.me-sheet').last();
await dd.getByRole('button', { name: 'Delete my name and all my games' }).click(); await D.page.waitForTimeout(300);
check('it says what goes, for everyone, before anything is sent', /This deletes your name, every game you made, their pictures and their answers, for everyone\. It can.t be undone\./.test(await dd.innerText()) && !calls.some((c) => c.p === '/maker/delete'));
await dd.getByRole('button', { name: 'Delete', exact: true }).click(); await D.page.waitForTimeout(1500);
check('the Worker got the maker key', calls.some((c) => c.p === '/maker/delete' && c.b.key === MAKER_KEY) && MAKER_GONE);
check('the maker key and the games leave the phone', await D.page.evaluate(() => !localStorage.getItem('logicers-studio:maker') && !(JSON.parse(localStorage.getItem('logicers-studio:games') || '[]')).some((g) => g && g.maker === 'anna-rossi')));
check('the section of games made is gone', (await D.page.locator('.me-studio').count()) === 0, await D.page.locator('.me-studio').count());
check('D: no script errors, no missing words', D.errors.length === 0 && D.warns.length === 0, [D.errors, D.warns]);
await D.ctx.close();

check('A: no script errors, no missing words', A.errors.length === 0 && A.warns.length === 0, [A.errors, A.warns]);
await browser.close(); await srv.close(); stand.close();
console.log(`\n${pass} checks passed, ${fails.length} failed`);
if (fails.length) { console.log(fails.map((f) => ' - ' + f).join('\n')); process.exit(1); }
