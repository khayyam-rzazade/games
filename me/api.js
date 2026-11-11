/* My Logicers: the adapter (Chat B, 7 Nov 2026).
   The one file where this page meets the other chats' scripts. They are classic scripts that the page loads with plain <script> tags
   (me/index.html) and that put themselves on window:
     LogicersMeStats (A, assets/js/me-stats.js)   stats(record, period, { name })
     LogicersMe      (A, assets/js/me.js)         collect, draw, keep, restore, adopt, remove, code
     MePasskey       (A2, assets/js/me-passkey.js) supported, canLogin, platform, prepare, register, prepareLogin, login, autofill, stopAutofill, forget
     MeDoors         (A3, assets/js/me-doors.js)  which, openWithPassword, openWithQuestions, setPassword, setQuestions, removeDoor, normalizeAnswer
     MeYear / LogicersYear (C)                    cardOpen(stats)   (optional: the page shows the line only when one of them is there)
   Every call here resolves and never throws. A failure is { ok: false, reason } with one of
     'net' | 'brake' | 'wrong' (with left) | 'none' | 'short' | 'common' | 'empty' | 'exists' | 'cancel' | 'full' | 'fail'
   so the page has one small set of words to show. A script that is not on the page leaves its door out and breaks nothing else. */
import { T, has } from './words.js';

const Me = () => window.LogicersMe || null;
const Stats = () => window.LogicersMeStats || null;
const Key = () => window.MePasskey || null;
const Doors = () => window.MeDoors || null;

export const ready = () => !!(Me() && Stats());

/* A3's answers say `why`, A2's say `state` and `reason`, A's say `error`: all of them become one `reason` */
const WHY = { net: 'net', network: 'net', offline: 'net', busy: 'brake', many: 'brake', 'too many': 'brake', wrong: 'wrong', short: 'short', common: 'common',
  empty: 'empty', questions: 'empty', none: 'none', number: 'none', code: 'none', unknown: 'none', exists: 'exists', full: 'full', cancelled: 'cancel', expired: 'fail' };
function reasonOf(r) {
  if (!r || typeof r !== 'object') return 'fail';
  if (r.exists) return 'exists';
  if (r.state === 'cancelled') return 'cancel';
  const w = r.why || r.reason || r.error || r.state;
  return WHY[w] || 'fail';
}
function bad(r) {
  const out = { ok: false, reason: reasonOf(r) };
  if (r && typeof r.left === 'number') out.left = r.left;
  return out;
}
async function safe(f, fallback) { try { return await f(); } catch (e) { return fallback || { ok: false, reason: 'fail' }; } }

/* ---------- the phone, with or without a code ---------- */
export function getCode() { try { const m = Me(); return m ? m.code() : null; } catch (e) { return null; } }

/* the stats from this phone's own storage: synchronous, no server, no code needed. The game names come from the site's own
   dictionary words (me/lang/*.json carries them), so a tile says "Stessa energia" in Italian. Throws only when A's scripts are missing. */
export function stats(period) {
  const m = Me(), s = Stats();
  if (!m || !s) throw new Error('modules');
  return s.stats(m.collect(), period || {}, { name: (id) => (has('game.' + id + '.name') ? T('game.' + id + '.name') : '') });
}

/* pull what the other phones did: A's sync writes the merged record into this phone's own copy, so stats() reads it afterwards.
   { ok: true } or { ok: false, reason }; never throws */
export async function sync() {
  const m = Me(); if (!m || typeof m.sync !== 'function') return { ok: false, reason: 'fail' };
  try { if (!m.code()) return { ok: false, reason: 'none' }; } catch (e) { return { ok: false, reason: 'none' }; }
  const r = await safe(() => m.sync(), null);
  return r && r.ok ? { ok: true } : { ok: false, reason: 'net' };
}

/* Exit (7 Nov 2026): A's leave() sends what this phone holds, then takes the code and the games off this phone */
export async function leave() {
  const m = Me(); if (!m || typeof m.leave !== 'function') return { ok: false, reason: 'fail' };
  const r = await safe(() => m.leave());
  return r && r.ok ? { ok: true } : bad(r);
}
/* one made game or room off My Logicers, on every phone (the game itself stays where it is) */
export function forget(kind, code) { const m = Me(); try { return !!(m && typeof m.forget === 'function' && m.forget(kind, code)); } catch (e) { return false; } }

/* ---------- Your games: the numbers, from each game's own server (7 Nov 2026, for teachers and teams) ----------
   Each made game and room lives on its own Worker; the page asks it with the key this phone holds for it (the edit key, the
   host key), exactly as the editor and the host pages do. Opening a made game or a check-in group this way counts as using it,
   so whatever is on My Logicers is kept while its maker keeps coming back. On localhost only, the checks may point each one
   at a stand-in. Every call here resolves: { ok, ... } or { ok: false, gone } (the server no longer knows it) or { ok: false }. */
const LOCALHOST = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
function bases(name, real) { const v = window[name]; return LOCALHOST ? (typeof v === 'string' && v ? [v] : []) : real; }
const SERVERS = {
  live: () => bases('LIVE_SERVER', ['https://live.logicers.com', 'https://logicers-live.rza-khay.workers.dev']),
  checkin: () => bases('CHECKIN_API', ['https://checkin.logicers.com', 'https://logicers-checkin.rza-khay.workers.dev']),   // checkin.logicers.com since 11 Nov 2026
  foroom: () => bases('FINDOUT_ROOM_API', ['https://findout-room.logicers.com', 'https://logicers-findout-room.rza-khay.workers.dev']),
  findout: () => bases('FINDOUT_API', ['https://findout.logicers.com', 'https://logicers-findout.rza-khay.workers.dev']),
  studio: () => bases('STUDIO_API', ['https://by.logicers.com', 'https://logicers-studio.rza-khay.workers.dev'])
};
async function ask(server, path, body) {
  const list = SERVERS[server]();
  for (const b of list) {
    let res;
    try {
      const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 8000);
      try {
        res = await fetch(b + path, body === undefined ? { signal: ctl.signal, credentials: 'omit', cache: 'no-store' }
          : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctl.signal, credentials: 'omit', cache: 'no-store' });
      } finally { clearTimeout(t); }
    } catch (e) { continue; }                                   // no answer at all: the other address
    let j = null; try { j = await res.json(); } catch (e) { j = null; }
    return { status: res.status, b: j || {} };
  }
  return { status: 0, b: {} };
}
const goneOf = (r) => r.status === 404;
/* a made game: its plays, the day it would be deleted, how it is played (alone or only live), its title as now saved */
async function madeInfo(it) {
  const r = await ask('live', '/kit/' + it.code + '/open', { edit: it.key });
  if (goneOf(r)) return { ok: false, gone: true };
  if (r.status !== 200) return { ok: false, stopped: r.b && r.b.e === 'stopped' };
  if (r.b.stopped) return { ok: false, stopped: true };
  const kit = r.b.kit || {};
  return { ok: true, plays: Number(r.b.plays) || 0, until: r.b.until || null, alone: kit.mode === 'alone', title: typeof kit.title === 'string' ? kit.title : '',
    qs: Array.isArray(kit.qs) ? kit.qs.length : null };
}
/* a check-in group: its rounds, the people of the last one, everyone who ever answered, its join link, the day it would go */
async function checkinInfo(it) {
  const r = await ask('checkin', '/host/' + it.key);
  if (goneOf(r)) return { ok: false, gone: true };
  if (r.status !== 200 || !r.b.ok) return { ok: false };
  const rounds = Array.isArray(r.b.rounds) ? r.b.rounds : [];
  const last = rounds.length ? rounds[rounds.length - 1] : null;
  const cur = r.b.current && typeof r.b.current === 'object' ? r.b.current : null;
  const total = rounds.reduce((a, x) => a + (Number(x.people) || 0), 0) + (cur ? Number(cur.people) || 0 : 0);
  return { ok: true, rounds: rounds.length + (cur ? 1 : 0), last: cur ? Number(cur.people) || 0 : last ? Number(last.people) || 0 : 0, total,
    live: !!cur, join: typeof r.b.join === 'string' ? r.b.join : null, until: r.b.until || null };
}
/* a How Sure game or a find-outs room lives for hours: older than that, it has ended, and nobody is asked */
async function howsureInfo(it) {
  if (!(it.at > Date.now() - 13 * 36e5)) return { ok: true, live: false };
  const r = await ask('live', '/game/' + it.code);
  if (r.status === 404) return { ok: true, live: false };
  if (r.status !== 200) return { ok: false };
  return { ok: true, live: true, players: Number(r.b.np) || 0 };            // an ended game answers 404
}
async function foroomInfo(it) {
  if (!(it.at > Date.now() - 36 * 36e5)) return { ok: true, live: false };
  const r = await ask('foroom', '/room/' + it.code);
  if (r.status === 404) return { ok: true, live: false };
  if (r.status !== 200 || !r.b.ok) return { ok: false };
  const st = r.b.state || {};
  return { ok: true, live: st.step !== 'ended', players: Number(st.joined) || 0 };
}
export async function mineInfo(it) {
  if (!it || !it.code) return { ok: false };
  if ((it.kind === 'made' || it.kind === 'checkin') && !it.key) return { ok: false, nokey: true };
  return safe(() => (it.kind === 'made' ? madeInfo(it) : it.kind === 'checkin' ? checkinInfo(it) : it.kind === 'howsure' ? howsureInfo(it) : foroomInfo(it)), { ok: false });
}
/* a made game's plays alone, for the results sheet and the CSV: [name, points, time, right, of] */
export async function madeResults(it) {
  if (!it || it.kind !== 'made' || !it.key) return { ok: false };
  const r = await safe(() => ask('live', '/kit/' + it.code + '/results', { edit: it.key }), { status: 0, b: {} });
  if (r.status === 404) return { ok: false, gone: true };
  if (r.status !== 200) return { ok: false };
  return { ok: true, plays: Array.isArray(r.b.plays) ? r.b.plays : [] };
}
/* delete for good, on the game's own server: a made game (its edit key) or a check-in group (its host key); then off My Logicers */
export async function destroy(it) {
  if (!it || !it.key) return { ok: false, reason: 'fail' };
  let r;
  if (it.kind === 'made') r = await safe(() => ask('live', '/kit/' + it.code + '/delete', { edit: it.key }), { status: 0, b: {} });
  else if (it.kind === 'checkin') r = await safe(() => ask('checkin', '/room/' + it.code + '/host', { host_key: it.key, action: 'delete' }), { status: 0, b: {} });
  else return { ok: false, reason: 'fail' };
  if (r.status === 200 || r.status === 404) { forget(it.kind, it.code); return { ok: true }; }
  return { ok: false, reason: r.status === 0 ? 'net' : r.status === 429 ? 'brake' : 'fail' };
}
/* ---------- Logicer Studio (8 Nov 2026, claude/studio-plan.md): the games this player made on by.logicers.com ----------
   Each game has its edit key and its maker a maker key (they ride in the record like the kits' keys: assets/js/me.js, kind "studio"). The page asks
   the Studio's Worker with them, exactly as the editor does (POST with a JSON body, no key in a URL). What the page expects back (one place to change
   if the Worker says it differently):
     /maker/get  { key }       -> { ok, maker: { slug, name }, games: [{ slug, title, plays, items, status: listed|waiting|private|hidden, keep_answers }] }
                                  (chat A's Worker says "status"; the older listed / listed_by_khayyam / hidden fields are read too)
     /game/mine  { edit_key }  -> { ok, game: { title, plays, items, listed, listed_by_khayyam, hidden, keep_answers } }  (404: the game is gone; also without the "game" wrapper)
     /game/answers { edit_key, after } -> { ok, rows: [[item, name, answer, time] | { item, name, answer, time }], next? }   (the Worker's own: chat A, 8 Nov)
     /game/delete { edit_key } -> { ok } (404 is as good: it is gone)    /maker/edit { key, name } -> { ok }
   A game is "listed" only when its maker asked for it and the site let it through; hidden wins over both. */
export const STUDIO_SITE = 'https://by.logicers.com/';
/* a game's id in the record ("<maker>/<game>", and "~<made>" behind it for a game made on this phone) -> its two address parts */
export function studioParts(code) { const m = /^([^/]+)\/([^/~]+)/.exec(String(code || '')); return m ? { maker: m[1], slug: m[2] } : null; }
export function studioLink(code) { const p = studioParts(code); return p ? STUDIO_SITE + encodeURIComponent(p.maker) + '/' + encodeURIComponent(p.slug) + '/' : ''; }
export function studioMakerLink(slug) { return slug ? STUDIO_SITE + encodeURIComponent(slug) + '/' : ''; }
const n0 = (v) => { const n = Number(v); return Number.isFinite(n) && n >= 0 ? Math.round(n) : 0; };
function gameView(g) {
  g = g && typeof g === 'object' ? g : {};
  let plays = g.plays !== undefined ? g.plays : g.n_plays !== undefined ? g.n_plays : g.total;
  if (plays === undefined && Array.isArray(g.items)) plays = g.items.reduce((a, x) => a + n0(x && (x.plays !== undefined ? x.plays : x.n)), 0);
  const items = Array.isArray(g.items) ? g.items.length : g.items_n !== undefined ? g.items_n : g.n_items !== undefined ? g.n_items : g.items;
  const status = typeof g.status === 'string' ? g.status : '';
  const hidden = !!g.hidden || status === 'hidden';
  const listed = !hidden && (status ? status === 'listed' : !!g.listed && (g.listed_by_khayyam === undefined ? true : !!g.listed_by_khayyam));
  return { title: typeof g.title === 'string' ? g.title : '', plays: n0(plays), items: Array.isArray(items) ? 0 : n0(items), listed, hidden, keep: !!(g.keep_answers !== undefined ? g.keep_answers : g.keep) };
}
/* the numbers of the games this player made: one /maker/get for the games of the maker whose key this phone holds, /game/mine for each of the others
   (and for one /maker/get does not list: that is how a deleted game is found out). Map code -> { ok, title, plays, items, listed, hidden, keep } | { ok: false, gone } | { ok: false } */
export async function studioInfo(list, maker) {
  const out = new Map(), games = (list || []).filter((it) => it && it.code && it.key);
  const m = maker && maker.key && maker.slug ? maker : null;
  let bySlug = null;
  if (m && games.some((it) => { const p = studioParts(it.code); return p && p.maker === m.slug; })) {
    const r = await safe(() => ask('studio', '/maker/get', { key: m.key }), { status: 0, b: {} });
    if (r.status === 200 && r.b && r.b.ok !== false && Array.isArray(r.b.games)) { bySlug = new Map(); r.b.games.forEach((g) => { if (g && typeof g.slug === 'string') bySlug.set(g.slug, g); }); }
  }
  await Promise.all(games.map(async (it) => {
    const p = studioParts(it.code), g = bySlug && m && p && p.maker === m.slug ? bySlug.get(p.slug) : null;
    if (g) { out.set(it.code, Object.assign({ ok: true }, gameView(g))); return; }
    const r = await safe(() => ask('studio', '/game/mine', { edit_key: it.key }), { status: 0, b: {} });
    if (r.status === 404 || keyGone(r)) out.set(it.code, { ok: false, gone: true });
    else if (r.status === 200 && r.b && r.b.ok !== false) out.set(it.code, Object.assign({ ok: true }, gameView(r.b.game || r.b)));
    else out.set(it.code, { ok: false });
  }));
  return out;
}
/* the answers kept for the maker ("keep answers" on): [{ item, name, answer, time }], for the results sheet and the CSV.
   The Worker's route is /game/answers { edit_key, after } (rows; a "next" to ask again with when there are more); a Worker that does not know the route
   is asked /game/mine, which may carry the answers itself. A row is [item, name, answer, time] or an object with those names; a time in seconds is made ms. */
const MAX_ASK = 20;
/* the Studio answers an edit key it no longer knows (the game was deleted: by its maker, by Logicers, or after a year unopened)
   with 403 "key": for My Logicers that game is gone (F, 8 Nov 2026) */
const keyGone = (r) => !!(r && r.status === 403 && r.b && r.b.e === 'key');
const rowOf = (a) => {
  const x = Array.isArray(a) ? { item: a[0], name: a[1], answer: a[2], time: a[3] } : a && typeof a === 'object' ? a : null;
  if (!x) return null;
  const t = Number(x.time);
  return { item: x.n != null ? x.n : x.item, name: x.name, answer: x.answer, time: Number.isFinite(t) && t > 0 && t < 1e11 ? t * 1000 : x.time };
};
export async function studioResults(it) {
  if (!it || !it.key) return { ok: false };
  let after = 0, rows = [];
  for (let i = 0; i < MAX_ASK; i++) {
    const r = await safe(() => ask('studio', '/game/answers', { edit_key: it.key, after }), { status: 0, b: {} });
    const b = r.b && typeof r.b === 'object' ? r.b : {};
    if (r.status === 404 && b.e === undefined && i === 0) return studioResultsOld(it);
    if (r.status === 404 || keyGone(r)) return { ok: false, gone: true };
    if (r.status !== 200 || b.ok === false) return { ok: false };
    const got = Array.isArray(b.rows) ? b.rows : Array.isArray(b.answers) ? b.answers : [];
    rows = rows.concat(got.map(rowOf).filter(Boolean));
    if (b.next === undefined || b.next === null || b.next === false || b.next === after || !got.length) break;
    after = b.next;
  }
  return { ok: true, rows };
}
async function studioResultsOld(it) {
  const r = await safe(() => ask('studio', '/game/mine', { edit_key: it.key }), { status: 0, b: {} });
  if (r.status === 404) return { ok: false, gone: true };
  if (r.status !== 200 || (r.b && r.b.ok === false)) return { ok: false };
  const g = (r.b && r.b.game) || r.b || {};
  const raw = Array.isArray(r.b.answers) ? r.b.answers : Array.isArray(g.answers) ? g.answers : [];
  return { ok: true, rows: raw.map(rowOf).filter(Boolean) };
}
/* delete for good on the Studio's Worker (the game's pictures and answers go with it), then off My Logicers */
export async function studioDestroy(it) {
  if (!it || !it.key) return { ok: false, reason: 'fail' };
  const r = await safe(() => ask('studio', '/game/delete', { edit_key: it.key }), { status: 0, b: {} });
  if (r.status === 200 || r.status === 404 || keyGone(r)) { forget('studio', it.code); return { ok: true }; }
  return { ok: false, reason: r.status === 0 ? 'net' : r.status === 429 ? 'brake' : 'fail' };
}
/* 11 Nov 2026 (Khayyam): the maker's name and every game of theirs, deleted for good on the Studio's Worker (a key it no longer
   knows: already gone, fine), then off this phone: each game goes on My Logicers' gone list (so the other phones drop it too)
   and the maker key leaves this phone. games: the record's Studio items of this maker. */
export async function studioDeleteMaker(maker, games) {
  if (!maker || !maker.key) return { ok: false, reason: 'fail' };
  const r = await safe(() => ask('studio', '/maker/delete', { key: maker.key }), { status: 0, b: {} });
  if (!(r.status === 200 || keyGone(r))) return { ok: false, reason: r.status === 0 ? 'net' : r.status === 429 ? 'brake' : r.status === 403 ? 'blocked' : 'fail' };
  (games || []).forEach((it) => { if (it && it.code) forget('studio', it.code); });
  try { localStorage.removeItem('logicers-studio:maker'); } catch (e) { /* the record keeps it until the next sync */ }
  return { ok: true };
}
/* the maker's name, on the Worker, then on this phone (the Studio pages read it from here too); the address does not change */
export async function studioRename(maker, name) {
  if (!maker || !maker.key) return { ok: false, reason: 'fail' };
  const r = await safe(() => ask('studio', '/maker/edit', { key: maker.key, name }), { status: 0, b: {} });
  if (r.status !== 200 || (r.b && r.b.ok === false)) return { ok: false, reason: r.status === 0 ? 'net' : r.status === 429 ? 'brake' : 'fail' };
  try {
    const m = JSON.parse(localStorage.getItem('logicers-studio:maker') || 'null');
    if (m && typeof m === 'object') { m.name = name; localStorage.setItem('logicers-studio:maker', JSON.stringify(m)); }
  } catch (e) { /* the Worker has it; the next restore brings it here */ }
  return { ok: true };
}

/* ---------- for a newcomer (7 Nov 2026, Khayyam: the empty page must be "very tempting for the new comers, informative and full
   of hooks"): the counts the home page shows, from the same servers. { next, findouts, checkins }, each a number or null:
   the Logicer number this phone would get (the running total + 1: server/live totals.js, nothing kept about anyone), how many
   phones finished a find-out, how many checked in. Asked once per visit. */
let COUNTS = null;
export function counts() {
  if (COUNTS) return COUNTS;
  const num = (v) => (Number.isInteger(v) && v >= 0 ? v : null);
  COUNTS = Promise.all([
    safe(() => ask('live', '/count/view', { v: 1 }), { status: 0, b: {} }),             // the version of the stats calls (server/live STATS)
    safe(() => ask('findout', '/counter'), { status: 0, b: {} }),
    safe(() => ask('checkin', '/stats'), { status: 0, b: {} })
  ]).then(([a, b, c]) => ({
    next: a.status === 200 && num(a.b.n) !== null ? a.b.n + 1 : null,
    findouts: b.status === 200 ? num(b.b.played) : null,
    checkins: c.status === 200 ? num(c.b.checked_in) : null
  }));
  return COUNTS;
}
/* the games' own pictures, as the home page draws them: taken from the home page itself (one file the browser has most
   likely kept already), so a new picture there is a new picture here too. Map id -> <svg>, empty when it cannot be read. */
let ART = null;
export function art() {
  if (ART) return ART;
  ART = fetch(new URL('../', location.href), { credentials: 'omit' }).then((r) => (r.ok ? r.text() : '')).then((html) => {
    const out = new Map(); if (!html) return out;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('.tile[data-g] .art > svg').forEach((svg) => {
      const g = svg.closest('.tile').getAttribute('data-g');
      if (g && !out.has(g)) { svg.querySelectorAll('script, foreignObject').forEach((x) => x.remove()); out.set(g, svg); }
    });
    return out;
  }).catch(() => new Map());
  return ART;
}

/* the friends' rooms this phone is in (assets/js/rooms.js keeps them in turnsout:v1): the room page leaves or deletes them */
export function friendRooms() {
  try {
    const all = JSON.parse(localStorage.getItem('turnsout:v1') || '{}') || {};
    const list = all.rooms && Array.isArray(all.rooms.list) ? all.rooms.list : [];
    return list.filter((x) => x && typeof x.code === 'string' && /^[23456789abcdefghjkmnpqrstvwxyz]{10,20}$/.test(x.code))
      .map((x) => ({ code: x.code, label: typeof x.label === 'string' ? x.label.slice(0, 40) : '' }));
  } catch (e) { return []; }
}

/* the year / month card: the line is shown only when C's hook is on the page and says a card is open now */
export function cardOpen(st) {
  const y = window.MeYear || window.LogicersYear;
  if (!y || typeof y.cardOpen !== 'function') return null;
  try { const r = y.cardOpen(st); return r || null; } catch (e) { return null; }
}

/* ---------- the code ---------- */
export async function draw(lang) { const m = Me(); if (!m) throw new Error('modules'); return m.draw(lang); }
/* a freshly drawn code is kept: the phone remembers it and the server gets the record. A taken code is drawn again by A itself,
   so the code that comes back may differ from the one asked for: the page shows the one that comes back. */
export async function keep(code, lang) {
  const m = Me(); if (!m) return { ok: false, reason: 'fail' };
  const r = await safe(() => m.keep(code, lang));
  return r && r.ok ? { ok: true, code: r.code || code } : bad(r);
}
/* a code typed on a new phone: A reads it from the server, writes it into the games' keys and keeps it on the phone */
export async function restore(code) {
  const m = Me(); if (!m) return { ok: false, reason: 'fail' };
  const r = await safe(() => m.restore(code));
  return r && r.ok ? { ok: true, record: r.record } : bad(r);
}
/* a door (Face ID, number + password, number + questions) hands the page a code and a record */
export async function adopt(code, record) {
  const m = Me(); if (!m) return { ok: false, reason: 'fail' };
  const r = await safe(() => m.adopt(code, record));
  return r && r.ok ? { ok: true } : bad(r);
}
/* Delete everything: the copy on the server and the code on this phone; what the games keep on this phone stays */
export async function remove() {
  const m = Me(); if (!m) return { ok: false, reason: 'fail' };
  const r = await safe(() => m.remove({}));
  if (r && r.ok) { const k = Key(); if (k && typeof k.forget === 'function') { try { await k.forget(); } catch (e) { /* the phone's own list stays */ } } return { ok: true }; }
  return bad(r);
}

/* ---------- Face ID / fingerprint (A2) ---------- */
/* 'face' on an iPhone or iPad, 'finger' elsewhere; null when this phone cannot keep one (or A2's script is not on the page) */
export async function passkeyKind() {
  const k = Key(); if (!k) return null;
  try { if (!(await k.supported())) return null; return k.platform() === 'face' ? 'face' : 'finger'; } catch (e) { return null; }
}
/* the way in by Face ID can show even where "keep" cannot (a computer can use a phone's by QR): its own words by platform */
export function passkeyOpenKind() {
  const k = Key(); if (!k) return null;
  try { if (!k.canLogin()) return null; return k.platform() === 'face' ? 'face' : 'finger'; } catch (e) { return null; }
}
/* Safari opens the sheet only close to a tap: the question is fetched ahead, when the button shows */
export function passkeyPrepare(code) { const k = Key(); if (k && typeof k.prepare === 'function') { try { Promise.resolve(k.prepare(code)).catch(() => {}); } catch (e) { /* nothing */ } } }
export function passkeyPrepareLogin() { const k = Key(); if (k && typeof k.prepareLogin === 'function') { try { Promise.resolve(k.prepareLogin()).catch(() => {}); } catch (e) { /* nothing */ } } }
export function passkeyRegister(code) {
  const k = Key(); if (!k) return Promise.resolve({ ok: false, reason: 'fail' });
  return safe(() => k.register(code)).then((r) => (r && r.ok ? { ok: true, state: r.state } : bad(r)));
}
export function passkeyLogin() {
  const k = Key(); if (!k) return Promise.resolve({ ok: false, reason: 'fail' });
  return safe(() => k.login()).then((r) => (r && r.ok && r.code && r.record ? { ok: true, code: r.code, record: r.record } : bad(r)));
}
/* on the "Have a code?" box: the phone's keyboard offers the kept one; resolves { ok, code, record } or null */
export function passkeyAutofill(input) {
  const k = Key(); if (!k || typeof k.autofill !== 'function') return Promise.resolve(null);
  return safe(() => k.autofill(input), null).then((r) => (r && r.ok && r.code && r.record ? { ok: true, code: r.code, record: r.record } : null));
}
export function passkeyStopAutofill() { const k = Key(); if (k && typeof k.stopAutofill === 'function') { try { k.stopAutofill(); } catch (e) { /* nothing */ } } }

/* ---------- the password door and the questions door (A3) ---------- */
/* the same rules as plan 3e, used only when A3's script is not there: enough for "is there anything left to keep" */
function fallbackNormalize(s) {
  return String(s || '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/ı/g, 'i').replace(/ß/g, 'ss').replace(/ł/g, 'l').replace(/ø/g, 'o')
    .replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/['’`]/g, '').replace(/[^a-z0-9]+/g, '');   // spaces go too (joint check)
}
export function normalizeAnswer(s) {
  const d = Doors();
  if (d && typeof d.normalizeAnswer === 'function') { try { return String(d.normalizeAnswer(s)); } catch (e) { /* the local copy below */ } }
  return fallbackNormalize(s);
}
const doorCall = (name, ...a) => { const d = Doors(); if (!d || typeof d[name] !== 'function') return Promise.resolve({ ok: false, reason: 'fail' }); return safe(() => d[name](...a)); };
/* after a door changed on the server, the phone's own copy of the record is refreshed by a sync, so a reload of the page
   still shows "Password set" before any game is played (joint check, 7 Nov 2026) */
function refresh() { const m = Me(); if (!m || typeof m.sync !== 'function') return; try { const p = m.sync(); if (p && typeof p.catch === 'function') p.catch(() => {}); } catch (e) { /* the next sync does it */ } }
const doorDone = (r) => { if (r && r.ok) { refresh(); return { ok: true, pw: !!r.pw, rq: !!r.rq }; } return bad(r); };
/* set, change and remove answer { ok, pw, rq }: the new state of the two doors */
export async function setPassword(code, pw) { return doorDone(await doorCall('setPassword', code, pw)); }
export async function setQuestions(code, list) { return doorDone(await doorCall('setQuestions', code, list)); }
export async function removeDoor(code, kind) { return doorDone(await doorCall('removeDoor', code, kind)); }
/* the Logicer number, then which doors it has: -> { ok, pw: boolean, rq: [question ids] | null } */
export async function which(logicer) {
  const r = await doorCall('which', logicer);
  if (!r || !r.ok) return bad(r);
  const rq = Array.isArray(r.rq) && r.rq.length ? r.rq.map(Number) : null;
  return { ok: true, pw: !!r.pw, rq };
}
/* an open answers { ok, code, record }; the page adopts it */
export async function openWithPassword(logicer, pw) { const r = await doorCall('openWithPassword', logicer, pw); return r && r.ok && r.code && r.record ? { ok: true, code: r.code, record: r.record } : bad(r); }
export async function openWithQuestions(logicer, answers) { const r = await doorCall('openWithQuestions', logicer, answers); return r && r.ok && r.code && r.record ? { ok: true, code: r.code, record: r.record } : bad(r); }
