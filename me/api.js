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
