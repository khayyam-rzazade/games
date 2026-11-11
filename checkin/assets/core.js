/* Check-in: the shared core of the three pages (solo, room, host). Chat C, 4 Nov 2026.
   What is here: the item list (ids, order, scales), the phone's own store, the words (strings.<lang>.json), the one API
   call helper (the contract is section 7 of claude/checkin-plan.md), the scoring that stays on the phone, the language
   chip, the sheets, Turnstile. No page logic. Nothing here touches the Find outs' store except one read of its anonymous
   ID (see browserId). The sheets rise and sink with assets/motion.js (closeSheet). */
import { closeSheet, wireSheet } from './motion.js';

/* ------------------------------------------------------------------ settings ------ */
export const ITEM_VERSION = 60;                 /* section 6: English item version */
export const KEY = 'lg.checkin.v1';             /* this section's own store on the phone */
export const FINDOUT_KEY = 'lg.findout.v1';     /* read once, for the anonymous ID only */
export const LANG_KEY = 'lg.findout.lang';      /* the site's one language pick */
export const AVAILABLE = ['en', 'it', 'es', 'pt', 'fr', 'tr'];   /* a code here only when strings.<code>.json exists */
export const MIN_GROUP = 10;                    /* a chart shows from 10 phones */
export const MIN_COUNTRY = 30;                  /* the country line shows from 30 contributors */
export const ROOT = new URL('../', import.meta.url);        /* the checkin/ folder, whatever page we are on */
export const LOCALES = { en: 'en-GB', it: 'it-IT', tr: 'tr-TR', es: 'es-ES', pt: 'pt-BR', fr: 'fr-FR' };
export const LANGS = [['en', 'English', '\u{1F1EC}\u{1F1E7}'], ['it', 'Italiano', '\u{1F1EE}\u{1F1F9}'], ['tr', 'Türkçe', '\u{1F1F9}\u{1F1F7}'],
                      ['es', 'Español', '\u{1F1EA}\u{1F1F8}'], ['pt', 'Português', '\u{1F1E7}\u{1F1F7}'], ['fr', 'Français', '\u{1F1EB}\u{1F1F7}']];

/* My Logicers (7 Nov 2026, Khayyam: "whenever an action is taken it has to sync immediately"): a phone that keeps a code loads the
   two scripts that send its record here too, as the game pages do (assets/js/turnsout.js), so a check-in or a new group reaches
   the other phones at once. Any other phone loads nothing. */
try {
  if (localStorage.getItem('lg.me.v1') && !window.LogicersMe) ['me-stats', 'me'].forEach((f) => {
    const s = document.createElement('script'); s.src = new URL('../../assets/js/' + f + '.js', import.meta.url).href; s.async = false; document.head.appendChild(s);
  });
} catch (e) { /* My Logicers is optional */ }

/* the Worker (server/checkin, chat B). 11 Nov 2026: it has a name of its own on logicers.com (a custom domain set in Cloudflare's
   dashboard, not in wrangler.jsonc), because some networks block workers.dev; that is `use`, and the workers.dev address is `alt`,
   tried only when the first gives no answer at all and has never answered on this page (reach). A test page sets window.CHECKIN_API;
   nothing is probed on load. */
const API_ADDR = window.CHECKIN_API
  ? { use: window.CHECKIN_API, alt: '', heard: true }
  : { use: 'https://checkin.logicers.com', alt: 'https://logicers-checkin.rza-khay.workers.dev', heard: false };
const TURNSTILE_SITE_KEY = window.CHECKIN_TURNSTILE ?? '0x4AAAAAAFj_-QKSbSfJrYJ1';   /* the Find outs' widget until the Worker has its own */

/* ------------------------------------------------------------------ the items ------
   The values are the ones the server takes (server/checkin/src/items.js, chat B; the item sheet claude/checkin-items.md, chat A1), whole
   numbers except `role` and `mind` (their ids). WHO-5 0-5 (5 = all of the time, the published codes); stress 1-5 (Elo et al. 2003: 1 = not
   at all, 5 = very much); the six why items 1-5 as the position of the answer as shown (1 = the first option: "Always" for the three on the
   frequency scale, "To a very large extent" for the three on the extent scale); sleep 1-5 (1 = under 5 h … 5 = over 8 h);
   agree 1-5 (1 = agree strongly, the ISSP codes); left out 1-3 (3 = often); ladder 1-10 (10 = best off).
   `rev`: more is worse (so a why item whose first option lifts is `rev`). Options are shown in the published order. */
/* `kick`: the small line on top of the screen (claude/checkin-copy.md B: "How you are · 1 of 5"), `k` its count inside the part;
   `stem`: the grey frame line above the question, only where the copy has one (the published questions have none of their own) */
export const ITEMS = [
  { id: 'role', kind: 'role', kick: 'kick.role', stem: 'flow.role_frame' },
  { id: 'w1', kind: 'who', min: 0, max: 5, kick: 'kick.who', k: 1, stem: 'flow.w_stem' },
  { id: 'w2', kind: 'who', min: 0, max: 5, kick: 'kick.who', k: 2, stem: 'flow.w_stem' },
  { id: 'w3', kind: 'who', min: 0, max: 5, kick: 'kick.who', k: 3, stem: 'flow.w_stem' },
  { id: 'w4', kind: 'who', min: 0, max: 5, kick: 'kick.who', k: 4, stem: 'flow.w_stem' },
  { id: 'w5', kind: 'who', min: 0, max: 5, kick: 'kick.who', k: 5, stem: 'flow.w_stem' },
  { id: 'st', kind: 'stress', min: 1, max: 5, rev: true, kick: 'kick.st' },
  { id: 'y_load', kind: 'freq', min: 1, max: 5, skip: true, kick: 'kick.why', k: 1 },                 /* 1 "Always" behind: weighs */
  { id: 'y_control', kind: 'freq', min: 1, max: 5, rev: true, skip: true, kick: 'kick.why', k: 2 },   /* 1 "Always" an influence: lifts */
  { id: 'y_support', kind: 'freq', min: 1, max: 5, rev: true, skip: true, kick: 'kick.why', k: 3 },
  { id: 'y_recog', kind: 'extent', min: 1, max: 5, rev: true, skip: true, kick: 'kick.why', k: 4 },
  { id: 'y_meaning', kind: 'extent', min: 1, max: 5, rev: true, skip: true, kick: 'kick.why', k: 5 },
  { id: 'y_future', kind: 'extent', min: 1, max: 5, skip: true, kick: 'kick.why', k: 6 },             /* 1 worried "to a very large extent": weighs */
  { id: 'sleep', kind: 'sleep', min: 1, max: 5, skip: true, kick: 'kick.more' },
  { id: 'mind', kind: 'mind', skip: true, kick: 'kick.more', stem: 'flow.mind_frame' },
  { id: 'p_say', kind: 'agree', min: 1, max: 5, rev: true, skip: true, kick: 'kick.more', stem: 'flow.p_stem' },      /* 1 "Agree strongly": lifts */
  { id: 'p_deserve', kind: 'agree', min: 1, max: 5, rev: true, skip: true, kick: 'kick.more', stem: 'flow.p_stem' },
  { id: 'p_better', kind: 'agree', min: 1, max: 5, rev: true, skip: true, kick: 'kick.more', stem: 'flow.p_stem' },
  { id: 'p_leftout', kind: 'left', min: 1, max: 3, rev: true, skip: true, kick: 'kick.more' },
  { id: 'ladder', kind: 'ladder', min: 1, max: 10, skip: true, kick: 'kick.last' }
];
export const BY_ID = Object.fromEntries(ITEMS.map((it) => [it.id, it]));
export const ST = BY_ID.st;                                   /* the stress scale: its ends are read from here everywhere */
export const ROLES = ['student', 'working', 'neither'];
export const MINDS = ['money', 'work_or_studies', 'health', 'people', 'future', 'country', 'nothing'];   /* the server's ids */
export const WHO_IDS = ['w1', 'w2', 'w3', 'w4', 'w5'];
export const WHY_IDS = ['y_load', 'y_control', 'y_support', 'y_recog', 'y_meaning', 'y_future'];
/* a bar per why item, sleep (a display only, never a host lever), the three adapted items and left out, in the order of the taps:
   the order the bars are drawn in and the order that settles a tie when the player's advice line is picked (claude/checkin-advice.md 1) */
export const BAR_IDS = [...WHY_IDS, 'sleep', 'p_say', 'p_deserve', 'p_better', 'p_leftout'];
export const AGE_BANDS = ['u18', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'];   /* under 18 is its own category in the data */
/* what the server takes for each band (the Find outs' chips, with the en dash) */
export const AGE_WIRE = { 'u18': 'Under 18', '18-24': '18\u201324', '25-34': '25\u201334', '35-44': '35\u201344', '45-54': '45\u201354', '55-64': '55\u201364', '65+': '65+' };
export const CODE_LEN = 6;                                       /* a room code: six consonants (server/checkin/src/room.js) */
export const CONSENT_VERSION = 'checkin-consent-1 (4 Nov 2026)';  /* the consent card's text, as the server lists it (CONSENT_VERSIONS in src/worker.js) */
export const HELP_URL = 'https://findahelpline.com';             /* Find A Helpline: free, checked helplines by country (/countries/<cc>, lowercase) */
const SLEEP_GOOD = { 1: 0, 2: 0.25, 3: 0.5, 4: 1, 5: 1 };      /* the codebook's sleep bar (0, 25, 50, 100, 100): under 7 h weighs; a display, never a lever */

/* the role tap picks the wording of the why items: student -> study, working -> work, neither -> other */
export function roleKey(role) { return role === 'student' ? 'study' : role === 'working' ? 'work' : 'other'; }

/* ------------------------------------------------------------------ DOM helpers ------ */
export function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined && text !== null) e.textContent = String(text); return e; }
export function h(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
export function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
export function hex(n) { const a = new Uint8Array(n); crypto.getRandomValues(a); return [...a].map((x) => x.toString(16).padStart(2, '0')).join(''); }
export function reducedMotion() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
export function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

/* ------------------------------------------------------------------ words ------ */
let DICT = {}, FALLBACK = {}, OWN = {}, LANG = 'en';
export function lang() { return LANG; }
export function locale() { return LOCALES[LANG] || 'en-GB'; }
export function fmt(n) { try { return Number(n).toLocaleString(locale()); } catch (e) { return String(n); } }
function savedLang() { try { const v = localStorage.getItem(LANG_KEY); return AVAILABLE.includes(v) ? v : null; } catch (e) { return null; } }
export function rememberLang(code) { try { localStorage.setItem(LANG_KEY, code); } catch (e) { /* no storage */ } }
async function fetchStrings(code) {
  const url = new URL('../strings.' + code + '.json', import.meta.url);
  const r = await fetch(url, { cache: 'no-cache' });
  if (!r.ok) throw new Error('strings ' + r.status);
  return await r.json();
}
export async function initStrings() {
  const pageLang = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
  const want = pageLang !== 'en' && AVAILABLE.includes(pageLang) ? pageLang : (savedLang() || 'en');
  FALLBACK = await fetchStrings('en');
  DICT = OWN = FALLBACK; LANG = 'en';
  if (want !== 'en') { try { OWN = await fetchStrings(want); DICT = Object.assign({}, FALLBACK, OWN); LANG = want; } catch (e) { OWN = FALLBACK; /* English stays */ } }
  document.documentElement.lang = LANG;
  return LANG;
}
/* A count of 1 can need other words ("1 check-in", "1 turno"): when n, c, r, done or joined is 1, the key with that
   ending (key.n1, key.r1, key.n1.r1 …) is used if the language has it. */
const ONE_VARS = ['n', 'c', 'r', 'done', 'joined'];
function pick(key, vars) {
  const words = (k) => (typeof OWN[k] === 'string' ? OWN[k] : undefined);      /* only the language's own: never an English "1 round" */
  if (vars) {
    const ones = ONE_VARS.filter((v) => v in vars && String(vars[v]) === '1');
    if (ones.length) for (const k of [key + ones.map((v) => '.' + v + '1').join(''), ...ones.map((v) => key + '.' + v + '1')]) { const w = words(k); if (w !== undefined) return w; }
  }
  return typeof DICT[key] === 'string' ? DICT[key] : FALLBACK[key];
}
/* Italian: "il 8 ottobre" is "l'8 ottobre" (and dall', all', dell', nell'); the date is filled in after the words */
const IT_ELIDE = { il: "l'", dal: "dall'", al: "all'", del: "dell'", nel: "nell'" };
export function T(key, vars) {
  let s = pick(key, vars);
  if (typeof s !== 'string') { if (window.console) console.warn('Check-in: no words for ' + key); return ''; }
  if (!vars) return s;
  s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
  if (LANG === 'it') s = s.replace(/\b(il|dal|al|del|nel) (8|11)(?=\D|$)/g, (m, a, d) => IT_ELIDE[a] + d);
  return s;
}
/* Turkish asks with mı/mi/mu/mü after a name, by the name's last vowel: "Türkiye mi?", "Almanya mı?", "Peru mu?" */
export function trQ(word) {
  const v = String(word || '').toLocaleLowerCase('tr-TR').replace(/[^aeıioöuü]/g, '').slice(-1);
  return { a: 'mı', 'ı': 'mı', e: 'mi', i: 'mi', o: 'mu', u: 'mu', 'ö': 'mü', 'ü': 'mü' }[v] || 'mi';
}
export function has(key) { return typeof DICT[key] === 'string' || typeof FALLBACK[key] === 'string'; }
export function raw(key) { return DICT[key] !== undefined ? DICT[key] : FALLBACK[key]; }

/* the words of one item for this role: item.<id>.<study|work|other>, then .all, then item.<id> */
export function itemText(item, role, vars) {
  const rk = roleKey(role);
  for (const k of ['item.' + item.id + '.' + rk, 'item.' + item.id + '.all', 'item.' + item.id]) if (has(k)) return T(k, vars);
  return item.id;
}
/* the sheet under the "?" of an item: item.<id>.help, else help.<kind> (the WHO-5 instruction is one for all five); '' when there is none */
export function helpText(item) { for (const k of ['item.' + item.id + '.help', 'help.' + item.kind]) if (has(k)) return T(k); return ''; }
/* the options of one item, in the order they are shown: [{ value, label }] */
export function optionsOf(item) {
  const out = [];
  /* the words are keyed by the value itself (who.opt.5 = "All of the time", freq.1 = "Always", st.1 = "Not at all"), shown in the published order */
  const range = (from, to, key) => { const step = from <= to ? 1 : -1; for (let v = from; v !== to + step; v += step) out.push({ value: v, label: T(key + v) }); };
  switch (item.kind) {
    case 'role': for (const r of ROLES) out.push({ value: r, label: T('role.' + (r === 'working' ? 'work' : r === 'neither' ? 'other' : 'student')) }); break;
    case 'who': range(item.max, item.min, 'who.opt.'); break;
    case 'stress': range(item.min, item.max, 'st.'); break;
    case 'freq': range(item.min, item.max, 'freq.'); break;
    case 'extent': range(item.min, item.max, 'extent.'); break;
    case 'agree': range(item.min, item.max, 'agree.'); break;
    case 'left': range(item.min, item.max, 'left.'); break;
    case 'sleep': range(item.min, item.max, 'sleep.'); break;
    case 'mind': for (const m of MINDS) out.push({ value: m, label: T('mind.' + m) }); break;
    default: break;
  }
  return out;
}

/* ------------------------------------------------------------------ scoring (on the phone) ------ */
export function whoScore(a) {
  let sum = 0;
  for (const id of WHO_IDS) { const v = a && a[id]; if (typeof v !== 'number') return null; sum += v; }
  return sum * 4;                                     /* 0-100, as published */
}
export function whoBand(score) { return score === null || score === undefined ? null : score <= 28 ? 0 : score <= 50 ? 1 : score <= 72 ? 2 : 3; }
/* how good a value is, 0 (worst) to 1 (best); null when there is no value */
export function good(item, v) {
  if (typeof item === 'string') item = BY_ID[item];
  if (!item || typeof v !== 'number' || !isFinite(v)) return null;
  if (item.id === 'sleep') return SLEEP_GOOD[Math.round(v)] ?? null;
  const g = clamp((v - item.min) / (item.max - item.min), 0, 1);
  return item.rev ? 1 - g : g;
}
/* -1 (weighs most) … +1 (lifts most); 0 is a bar of exactly 50 */
export function signed(item, v) { const g = good(item, v); return g === null ? null : (g - 0.5) * 2; }
const EPS = 1e-9;
/* the copy's three words: above the middle it lifts, below it weighs, exactly in the middle "in between" (claude/checkin-copy.md C) */
export function verdict(s) { return s === null || s === undefined ? 'skip' : s > EPS ? 'lift' : s < -EPS ? 'weigh' : 'mid'; }
/* the picking rule (claude/checkin-advice.md 1): the lowest bar under 50 picks the line, a tie goes to the earlier tap, a skipped tap
   cannot pick; null when no bar is under 50 (the "nothing weighs" line) */
export function weighsMost(a) {
  let best = null, bestS = -EPS;
  for (const id of BAR_IDS) { const s = signed(id, a[id]); if (s !== null && s < bestS) { best = id; bestS = s; } }
  return best;
}
/* a group's bar as the server sends it (0-100, the direction already applied: 100 lifts, 0 weighs) on the same -1 … +1 line */
export function barSigned(b) { return typeof b === 'number' && isFinite(b) ? clamp((b - 50) / 50, -1, 1) : null; }
/* the group's lowest of the six why bars under 50 (sleep and the life-worded bars never pick a host lever); null when none is under 50 */
export function lowestBar(bars) {
  let best = null, bestS = -EPS;
  for (const id of WHY_IDS) { const s = barSigned(bars && bars[id]); if (s !== null && s < bestS) { best = id; bestS = s; } }
  return best;
}
/* a mean from a list of bins that spans lo…hi evenly (or, with `integers`, one bin per whole value) */
export function meanFromBins(bins, lo, hi, integers) {
  if (!Array.isArray(bins)) return null;
  let n = 0, sum = 0;
  bins.forEach((c, i) => { const centre = integers ? lo + i : lo + (i + 0.5) * (hi - lo) / bins.length; n += c; sum += c * centre; });
  return n ? sum / n : null;
}

/* ------------------------------------------------------------------ the phone's store ------ */
function emptyStore() { return { v: 1, id: null, draft: null, history: [], consent: {}, hosts: [], rooms: {}, counted: false }; }
let S = null;
export function load() {
  if (S) return S;
  try { const j = JSON.parse(localStorage.getItem(KEY)); S = j && j.v === 1 ? Object.assign(emptyStore(), j) : emptyStore(); } catch (e) { S = emptyStore(); }
  return S;
}
export function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* a full or blocked store: the page still works */ } }
export function wipe() { S = emptyStore(); try { localStorage.removeItem(KEY); } catch (e) { /* nothing to remove */ } S.id = hex(16); save(); }   /* a fresh code too: the forgotten one is not reused, even if the Find outs' store still has it */
/* The one thing shared with the Find outs: the anonymous browser ID. If their store already has one, this section uses it
   (read only); otherwise a new one is made and kept here. Nothing else is read from or written to their store. */
export function browserId() {
  const st = load();
  if (st.id) return st.id;
  let id = null;
  try { const f = JSON.parse(localStorage.getItem(FINDOUT_KEY)); if (f && typeof f.id === 'string' && /^[0-9a-f]{32}$/.test(f.id)) id = f.id; } catch (e) { /* no Find outs store */ }
  st.id = id || hex(16); save();
  return st.id;
}

/* ------------------------------------------------------------------ the server ------ */
async function reach(a, path, o, ms) {
  for (;;) {
    const base = a.use, ctl = new AbortController(), t = setTimeout(() => ctl.abort(), ms);
    try {
      const r = await fetch(base + path, Object.assign({}, o, { signal: ctl.signal }));
      clearTimeout(t);
      if (base !== a.alt) a.heard = true;
      return r;
    } catch (e) {
      clearTimeout(t);
      if (a.heard || !a.alt || base === a.alt) throw e;
      a.use = a.alt;
    }
  }
}
/* every reply is { ok: true, … } or { ok: false, error }; a network failure is { ok: false, error: 'network' } */
export async function api(path, body, ms, keepalive) {
  try {
    const o = body === undefined ? { cache: 'no-store' } : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), keepalive: !!keepalive };
    const r = await reach(API_ADDR, path, o, ms || 9000);
    const j = await r.json().catch(() => null);
    if (j && typeof j === 'object') return j.ok === undefined ? Object.assign({ ok: r.ok, status: r.status }, j) : Object.assign({ status: r.status }, j);
    return { ok: false, error: r.status === 404 ? 'unknown' : 'bad', status: r.status };
  } catch (e) { return { ok: false, error: 'network' }; }
}
/* the server's names for "that room is not there (any more)" and "wrong key" */
export const gone = (r) => !!r && !r.ok && (r.status === 404 || r.error === 'unknown');
export const wrongKey = (r) => !!r && !r.ok && (r.status === 403 || r.error === 'host');
/* what the page was handed after the # : a room code, a host key */
export function cleanCode(s) { return String(s || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, CODE_LEN); }
export function hostKeyOf(s) {
  const t = String(s || '').replace(/[^A-Za-z0-9]/g, '');
  return t.length === CODE_LEN + 32 && /^[A-Za-z]{6}[0-9A-Fa-f]{32}$/.test(t) ? t.slice(0, CODE_LEN).toUpperCase() + t.slice(CODE_LEN).toLowerCase() : null;
}
let turnstileToken = null;
export async function turnstile() {
  if (!TURNSTILE_SITE_KEY) return null;
  if (turnstileToken) { const t = turnstileToken; turnstileToken = null; return t; }
  try {
    await new Promise((res, rej) => { if (window.turnstile) return res(); const s = document.createElement('script'); s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
    return await new Promise((res) => {
      const holder = document.createElement('div'); holder.style.cssText = 'position:fixed;left:-9999px'; document.body.appendChild(holder);
      window.turnstile.render(holder, { sitekey: TURNSTILE_SITE_KEY, size: 'invisible', callback: (t) => res(t), 'error-callback': () => res(null) });
      setTimeout(() => res(null), 12000);
    });
  } catch (e) { return null; }
}
/* The person's country for the one item that names it (the society ladder): what the Find outs already know (read only), else what the
   server sees on this request (GET /hello, nothing stored), else null. Asked once. */
let countryP = null;
export function knownCountry() {
  if (countryP) return countryP;
  countryP = (async () => {
    try { const f = JSON.parse(localStorage.getItem(FINDOUT_KEY)); const iso = f && ((f.country && f.country !== 'not said') ? f.country : f.header_country); if (typeof iso === 'string' && /^[A-Z]{2}$/.test(iso)) return iso; } catch (e) { /* no Find outs store */ }
    const r = await api('/hello', undefined, 5000);
    return r && r.ok && typeof r.country === 'string' && /^[A-Z]{2}$/.test(r.country) ? r.country : null;
  })();
  return countryP;
}
let statsCache = null;
export async function stats() { if (statsCache) return statsCache; const r = await api('/stats'); statsCache = r && r.ok ? r : null; return statsCache; }

/* the funnel's start (POST /counter, no ID), once per check-in */
export function countStart() { api('/counter', { event: 'started' }, 5000); }

/* ------------------------------------------------------------------ small things ------ */
/* a date as day and month, in the page's language ("22 October"); with the weekday ("Tuesday 11 November") */
export function dayMonth(ms, weekday) {
  let s;
  try { s = new Date(ms).toLocaleDateString(locale(), weekday ? { weekday: 'long', day: 'numeric', month: 'long' } : { day: 'numeric', month: 'long' }); } catch (e) { return new Date(ms).toDateString(); }
  if (LANG === 'fr') s = s.replace(/(^|\s)1(?= )/, '$11er');                       /* le 1er novembre */
  return s;
}
export function relTime(ms) {
  const days = Math.round((Date.now() - ms) / 86400000);
  try { return new Intl.RelativeTimeFormat(locale(), { numeric: 'auto' }).format(-days, 'day'); } catch (e) { return days + ' d'; }
}
export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch (e) {
    try { const t = document.createElement('textarea'); t.value = text; t.style.cssText = 'position:fixed;left:-9999px'; document.body.appendChild(t); t.select(); const ok = document.execCommand('copy'); t.remove(); return ok; } catch (e2) { return false; }
  }
}
export function qrSvg(text, label) {
  const Q = window.qrcodegen; if (!Q) return null;
  try {
    const q = Q.QrCode.encodeText(text, Q.QrCode.Ecc.MEDIUM); let d = ''; const n = q.size;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (q.getModule(x, y)) d += `M${x + 2} ${y + 2}h1v1h-1z`;
    return h(`<svg class="ck-qr" viewBox="0 0 ${n + 4} ${n + 4}" role="img" aria-label="${esc(label)}"><rect width="100%" height="100%" fill="#fff"/><path d="${d}" fill="#15172B"/></svg>`);
  } catch (e) { return null; }
}
const COUNTRY_CODES = 'AD AE AF AG AL AM AO AR AT AU AZ BA BB BD BE BF BG BH BI BJ BN BO BR BS BT BW BY BZ CA CD CF CG CH CI CL CM CN CO CR CU CV CY CZ DE DJ DK DM DO DZ EC EE EG ER ES ET FI FJ FM FR GA GB GD GE GH GM GN GQ GR GT GW GY HN HR HT HU ID IE IL IN IQ IR IS IT JM JO JP KE KG KH KI KM KN KP KR KW KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MG MH MK ML MM MN MR MT MU MV MW MX MY MZ NA NE NG NI NL NO NP NR NZ OM PA PE PG PH PK PL PS PT PW PY QA RO RS RU RW SA SB SC SD SE SG SI SK SL SM SN SO SR SS ST SV SY SZ TD TG TH TJ TL TM TN TO TR TT TV TW TZ UA UG US UY UZ VA VC VE VN VU WS XK YE ZA ZM ZW'.split(' ');
export function flag(code) { return /^[A-Z]{2}$/.test(code || '') ? String.fromCodePoint(...[...code].map((c) => 0x1F1E6 + c.charCodeAt(0) - 65)) : ''; }
/* the countries by name in the page's language, from the browser's own list */
export function countryList() {
  const list = COUNTRY_CODES.map((c) => ({ code: c, name: countryName(c) }));       /* the Find outs' names first, then the browser's */
  try { list.sort((a, b) => a.name.localeCompare(b.name, locale())); } catch (e) { /* unsorted */ }
  return list;
}
/* A country's name and its "in" form come from the strings file first (`country.name`, `country.in`: the Find outs' country table in
   each language, so the ladder reads word for word as theirs: "in Italy", "in the United States", "in Italia", "Türkiye'deki"),
   else from the browser's list. */
export function countryName(code) {
  const m = raw('country.name'); if (code && m && typeof m === 'object' && m[code]) return m[code];
  try { return new Intl.DisplayNames([locale()], { type: 'region' }).of(code) || code; } catch (e) { return code; }
}
/* the researcher page in the player's language: researchers/ (English), researchers/<code>/ for the others */
export function researchersUrl(hash) { return new URL('researchers/' + (LANG === 'en' ? '' : LANG + '/') + (hash || ''), ROOT).href; }
export function inCountry(code) {
  const m = raw('country.in'); if (code && m && typeof m === 'object' && m[code]) return m[code];
  return code ? T('country.in_any', { country: countryName(code) }) : T('country.in_none');
}

/* ------------------------------------------------------------------ sheets (dialogs) ------ */
export function wireDialogs(root) {
  root.querySelectorAll('[data-open]').forEach((b) => { if (b.dataset.wired) return; b.dataset.wired = '1'; b.addEventListener('click', () => { const d = document.getElementById(b.dataset.open); if (d && d.showModal) { wireSheet(d); d.showModal(); } }); });
  root.querySelectorAll('[data-close]').forEach((b) => { if (b.dataset.wired) return; b.dataset.wired = '1'; b.addEventListener('click', () => closeSheet(b.closest('dialog'))); });
  if (root.tagName === 'DIALOG') wireSheet(root);
}
export { closeSheet };
export function sheet(id, title, bodyHtml) {
  let d = document.getElementById(id);
  if (!d) { d = h(`<dialog id="${id}" aria-labelledby="${id}-t"><div class="sheet"><button class="chip round close" type="button" data-close aria-label="${esc(T('site.close'))}">×</button><h2 id="${id}-t"></h2><div class="sheet-body"></div></div></dialog>`); document.body.appendChild(d); wireDialogs(d); }
  wireSheet(d);
  d.querySelector('h2').textContent = title;
  d.querySelector('.sheet-body').innerHTML = bodyHtml;
  return d;
}
/* the "?" of every page (spoken label "How it works"): what is kept, what is not, how to take it back (claude/checkin-copy.md D) */
const HOW_LINES = ['how.kept', 'how.no_name', 'how.count', 'how.wait', 'how.room', 'how.study', 'how.join'];   /* no under-18 line: everyone may say yes (Khayyam, 4 Nov) */
export function howSheet() {
  const d = sheet('dlg-how', T('how.title'), HOW_LINES.map((k) => `<p>${esc(T(k))}</p>`).join(''));
  const body = d.querySelector('.sheet-body');
  const st = load();
  if (st.history.length || st.draft || st.id) {
    const p = el('p', 'ck-forget');
    const [before, after] = T('how.delete').split('{link}');
    const b = el('button', 'ck-link', T('how.forget')); b.type = 'button';
    p.appendChild(document.createTextNode(before || '')); p.appendChild(b); p.appendChild(document.createTextNode(after || ''));
    b.addEventListener('click', () => {
      const f = sheet('dlg-forget', T('how.forget'), `<p>${esc(T('how.forget_sure'))}</p><div class="actions"><button class="btn solid" id="forget-yes" type="button">${esc(T('how.forget_yes'))}</button><button class="btn ghost" type="button" data-close>${esc(T('how.forget_no'))}</button></div>`);
      wireDialogs(f);
      f.querySelector('#forget-yes').addEventListener('click', () => { const id = load().id; if (id) api('/delete', { id }, 8000); wipe(); closeSheet(f); closeSheet(d); const root = document.getElementById('ck'); if (root) { root.textContent = ''; root.appendChild(el('p', 'ck-lede', T('how.forgotten'))); } });
      f.showModal();
    });
    body.appendChild(p);
  }
  body.appendChild(el('p', 'quiet', T('how.mail')));
  const yes = el('p', 'quiet', ''); body.appendChild(yes);
  stats().then((s) => { if (s && typeof s.yes === 'number' && s.yes > 10) yes.textContent = T('how.yes_count', { n: fmt(s.yes) }); });
  return d;
}
/* the section's small print, under every page: the researcher page and the "?" lines (claude/checkin-copy.md I) */
export function smallPrint() {
  const f = document.getElementById('ck-foot'); if (!f) return;
  f.textContent = '';
  const p1 = el('p', ''); p1.appendChild(document.createTextNode(T('foot.research') + ' '));
  const a = el('a', 'ck-link', T('foot.research_link')); a.href = researchersUrl(); p1.appendChild(a); f.appendChild(p1);
  const p2 = el('p', ''); p2.appendChild(document.createTextNode(T('foot.anon') + ' '));
  const b = el('button', 'ck-link', T('foot.how_link')); b.type = 'button'; b.dataset.open = 'dlg-how'; p2.appendChild(b); f.appendChild(p2);
  wireDialogs(f);
}
/* the small line on top of a question screen: "How you are · 2 of 5" */
export function kicker(item) { return item.kick ? T(item.kick, { k: item.k || '' }) : ''; }

/* ------------------------------------------------------------------ the language chip ------ */
export function langChip() {
  const chip = document.getElementById('ck-langchip'); if (!chip) return;
  if (AVAILABLE.length < 2 && !window.CHECKIN_SHOW_LANGCHIP) return;          /* one language so far: nothing to choose */
  const me = LANGS.find((l) => l[0] === LANG) || LANGS[0];
  chip.textContent = ''; chip.appendChild(el('span', 'flag', me[2])); chip.appendChild(document.createTextNode(' ' + LANG.toUpperCase()));
  chip.setAttribute('aria-label', T('lang.switch') + ': ' + me[1]); chip.hidden = false;
  chip.addEventListener('click', () => langSheet(true));
}
function langSheet(open) {
  let d = document.getElementById('dlg-lang');
  if (!d) {
    d = h(`<dialog id="dlg-lang" aria-labelledby="dlg-lang-t"><div class="sheet ck-langsheet"><button class="chip round close" type="button" data-close aria-label="${esc(T('site.close'))}">×</button><h2 id="dlg-lang-t">${esc(T('lang.title'))}</h2><div class="ck-langlist"></div><p class="quiet ck-langnote" hidden></p></div></dialog>`);
    const list = d.querySelector('.ck-langlist'), note = d.querySelector('.ck-langnote');
    for (const [code, name, fl] of LANGS) {
      const b = el('button', 'ck-langpick' + (code === LANG ? ' on' : '')); b.type = 'button'; b.lang = code;
      b.appendChild(el('span', 'flag', fl)); b.appendChild(el('b', '', name));
      b.addEventListener('click', () => {
        if (code === LANG) { closeSheet(d); return; }
        if (!AVAILABLE.includes(code)) { note.textContent = T('lang.english_only'); note.hidden = false; return; }
        rememberLang(code); location.reload();
      });
      list.appendChild(b);
    }
    document.body.appendChild(d); wireDialogs(d);
  }
  wireSheet(d);
  if (open && d.showModal && !d.open) d.showModal();
  return d;
}
