/* Find out about yourself: the one script of the section (B1, 21 Oct 2026).
   Pages: find-out/ (the section's home), find-out/<game>/ (one page per game) and find-out/portrait/.
   Every word a player reads comes from data.js, which is generated from the copy doc and the item sheet;
   the scoring comes from scoring.js (rules version 1). Answers stay in this browser until the player says
   yes on the consent card; only then does anything with an ID leave the phone (POST /upload). Before that
   the page asks the server three harmless things: where the phone is (GET /hello, no ID, nothing stored),
   the world's curve (GET /curve, public) and the funnel counters (POST /counter, no ID). */
import { scoreGame, RULES_VERSION } from './scoring.js?v=fe71806751';
/* the language: the page says it (<html lang>); its data module carries every word (built from that language's copy doc and
   item sheet), the English one is data.js. One store, one portrait per phone whatever the language; each play records the
   language it was played in (item_version 1 = English, 10 = Italian, 20 = Turkish, 30 = Spanish, 40 = Portuguese, 50 = French). The ?v= stamps are
   written by build_pages. */
const LANG = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
const DATA_V = { en: 'c650fe836a', it: 'aaaefa3b46', tr: '15c84b7654', es: '614dddce9c', pt: '7e3bd3d29d', fr: 'de1c3cdb45' };
const DATA = await import(`./data${LANG === 'en' ? '' : '.' + LANG}.js?v=${DATA_V[LANG] || ''}`);
const { ITEMS, COPY, COUNTRIES, PORTRAIT, UI } = DATA;
const L = DATA.LANG || { code: 'en', item_version: 1, locale: 'en-GB', num_locale: 'en-US', base: '' };
const U = UI;
const SITE = 'https://logicers.com/find-out/' + L.base;          /* the section's address in this language, for links and QR codes */
const UP = L.base ? '../' : '';                                  /* language pages sit one folder deeper: the root is one step further up */
function tpl(t, vars) { return String(t).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m)); }
const COLON = LANG === 'fr' ? '\u00a0: ' : ': ';                  /* French puts a no-break space before a colon (28 Oct 2026) */
function ofN(a, b) { return tpl(U.of, { a, b }); }

/* Each server answers on two addresses (27 Oct 2026): its logicers.com one first, because some campus Wi-Fi blocks workers.dev;
   the workers.dev one only when the first gives no answer at all (not even an error) before anything has been heard from it,
   and then for the rest of the page. A test address set by the checks stands alone. Nothing is probed on load. */
const API_ADDR = window.FINDOUT_API ? { use: window.FINDOUT_API, alt: '', heard: true } : { use: 'https://findout.logicers.com', alt: 'https://logicers-findout.rza-khay.workers.dev', heard: false };
const TURNSTILE_SITE_KEY = window.FINDOUT_TURNSTILE ?? '0x4AAAAAAFj_-QKSbSfJrYJ1';   /* the live widget; empty would send without a Turnstile token */
/* the room (stage 2): its own small server, the same bins as the world's curves, nothing shown under ten phones */
const ROOM_ADDR = window.FINDOUT_ROOM_API ? { use: window.FINDOUT_ROOM_API, alt: '', heard: true } : { use: 'https://findout-room.logicers.com', alt: 'https://logicers-findout-room.rza-khay.workers.dev', heard: false };
const ROOM_BINS = { 1: [1, 5, 0.5], 2: [1, 5, 0.25], 3: [0, 24, 1], 4: [0, 4, 1], 5: [0, 10, 0.5], 6: [0, 4, 1], 7: [0, 10, 0.5], 8: [1, 5, 0.25] };
const ROOM_MIN = 10;
/* The trial is over (31 Oct 2026, Khayyam: "use all data as data"): nothing is flagged as a trial any more. A test page can still set window.FINDOUT_TRIAL = true. The old answers were unflagged in the database on the same day (server/findout/README.md). */
const TRIAL = window.FINDOUT_TRIAL !== undefined ? !!window.FINDOUT_TRIAL : false;
const STORE_KEY = 'lg.findout.v1';
const SLUG = { 1: 'type', 2: 'shots', 3: 'sunny', 4: 'kid', 5: 'story', 6: 'twice', 7: 'believe', 8: 'home', 9: 'quick' };
const ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const SECONDS = { 1: 40, 2: 25, 3: 30, 4: 15, 5: 25, 6: 45, 7: 30, 8: 25, 9: 30 };
const NEEDS_COUNTRY = { 2: true, 7: true, 8: true, 9: true };
const ITEM_VERSION = L.item_version;   /* 1 English, 10 Italian, 20 Turkish, 30 Spanish (D22): recorded with every play */
const RETAKE_DAYS = 90;
const G = Object.fromEntries(ITEMS.map((g) => [g.number, g]));
const C = COPY;

/* ------------------------------------------------------------------ storage ------ */
function hex(n) { const a = new Uint8Array(n); crypto.getRandomValues(a); return [...a].map((x) => x.toString(16).padStart(2, '0')).join(''); }
/* the Anonymous Check-in (checkin/, 4 Nov 2026) may have drawn this phone's random code first: keep that one, so the two studies join for people who say yes in both */
function sharedId() { try { const c = JSON.parse(localStorage.getItem('lg.checkin.v1')); if (c && typeof c.id === 'string' && /^[0-9a-f]{32}$/.test(c.id)) return c.id; } catch (e) { /* none */ } return hex(16); }
function fresh(id) { return { v: 1, id: id || sharedId(), created: new Date().toISOString(), header_country: null, country: null, country_asked: false, games: {}, consent: { status: null, version: null, at: null }, uploaded: {}, code: null, demographics: null, funnel: {}, done_order: [] }; }
let S = null;
function load() {
  if (S) return S;
  try { const raw = localStorage.getItem(STORE_KEY); S = raw ? JSON.parse(raw) : null; } catch (e) { S = null; }
  if (!S || S.v !== 1 || !S.id) S = fresh();
  return S;
}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* a full or blocked store: the game still plays */ } }
function wipe() { S = fresh(hex(16)); try { localStorage.removeItem(STORE_KEY); } catch (e) {} }

/* ------------------------------------------------------------------ helpers ------ */
function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined && text !== null) e.textContent = String(text); return e; }
function h(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function fmt(n) { try { return Number(n).toLocaleString(L.num_locale); } catch (e) { return String(n); } }
function lower(s) { try { return String(s).toLocaleLowerCase(L.locale); } catch (e) { return String(s).toLowerCase(); } }
function pctWord(t, pct) { return t.replace('{pct}', String(pct)); }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const reduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

/* ------------------------------------------------------------------ motion ------
   The Logicers motion spec (claude/motion-spec.md, 5 Nov 2026), the same as the Anonymous Check-in's: three durations and three
   curves (the tokens at the top of find-out.css, read from there so the two never drift) and one vocabulary: enter, slide,
   press, select, glide, grow, count, draw, rise, pop, pulse, crossfade. A result's order is one list given to sequence(). Nothing
   blocks a tap: a tap, a key or a scroll during a timeline lands the rest at once, and with reduced motion everything stands at
   its final value from the start. */
const M = { fast: 180, base: 340, slow: 600, step: 100 };   /* the CSS tokens' values (--m-fast, --m-base, --m-slow, --m-step) */
function readTokens() {
  try {
    const cs = getComputedStyle(document.documentElement);
    for (const k of Object.keys(M)) { const v = parseFloat(cs.getPropertyValue('--m-' + k)); if (v > 0) M[k] = v; }
    const m = String(cs.getPropertyValue('--e-out')).match(/cubic-bezier\(([^)]+)\)/); const p = m ? m[1].split(',').map(Number) : [];
    if (p.length === 4 && p.every(isFinite)) easeOut = bezier(...p);
  } catch (e) { /* the spec's numbers below stand */ }
}
const SELECT_WAIT = 220;                     /* after a choice lands, before the next screen comes, so the choice is seen to land (150 until 5 Nov, a touch quick) */
const FLOW = 0.7;                            /* a timeline's next step starts when the one before is 70% done, so they flow */
function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const X = (s) => ((ax * s + bx) * s + cx) * s, Y = (s) => ((ay * s + by) * s + cy) * s, dX = (s) => (3 * ax * s + 2 * bx) * s + cx;
  return (t) => { if (t <= 0) return 0; if (t >= 1) return 1; let s = t; for (let i = 0; i < 8; i++) { const e = X(s) - t, d = dX(s); if (Math.abs(e) < 1e-5 || !d) break; s = Math.min(1, Math.max(0, s - e / d)); } return Y(s); };
}
let easeOut = bezier(0.3, 0.55, 0.35, 1);    /* --e-out, for the numbers counted here (readTokens takes it from the CSS) */
const QR_POP = 100;                          /* the QR pops this long after the code card (motion spec 4, as the check-in) */
/* count: from `from` to `to` over --m-slow on --e-out; paint(v, k) draws each frame (the digits, and a needle or arc with them) */
function count(from, to, paint, ctl) {
  if (reduced() || (ctl && ctl.done) || from === to) { paint(to, 1); return 0; }
  const t0 = performance.now();
  const frame = (now) => { const k = ctl && ctl.done ? 1 : easeOut(Math.min(1, (now - t0) / M.slow)); paint(from + (to - from) * k, k); if (k < 1) requestAnimationFrame(frame); };
  paint(from, 0); requestAnimationFrame(frame);
  return M.slow;
}
/* a number inside a sentence of the copy ("{n} already did"): the words stay as they are, only the number ticks */
function countIn(node, template, key, value, from, ctl) {
  const [a, b] = template.split('{' + key + '}');
  if (b === undefined) { node.textContent = template; return 0; }
  node.textContent = ''; node.appendChild(document.createTextNode(a)); const num = el('span', 'fo-num'); node.appendChild(num); node.appendChild(document.createTextNode(b));
  return count(from, value, (v) => { num.textContent = fmt(Math.round(v)); }, ctl);
}
/* the timeline of a result: steps run one after another; a step is a pause in ms, or a function (ctl) that starts its motion and
   returns how long it takes (the next step starts when it is 70% done) or a promise to wait for. ctl.done = land everything now. alive() false stops it (the screen left). */
function sequence(steps, alive, opts) {
  const ctl = { done: reduced() || !!(opts && opts.now) };
  let wake = null;
  ctl.finish = () => { if (ctl.done) return; ctl.done = true; if (wake) wake(); };
  const evs = ['pointerdown', 'keydown', 'wheel', 'touchmove'];
  const stop = () => ctl.finish();
  const listen = !ctl.done && !(opts && opts.keepOnScroll);
  if (listen) evs.forEach((e) => addEventListener(e, stop, { capture: true, passive: true }));
  const nap = (p) => new Promise((r) => { wake = r; Promise.resolve(p).then(r, r); });
  ctl.run = (async () => {
    for (const s of steps) {
      if (!s) continue;
      if (alive && !alive()) break;
      let wait = 0;
      try { wait = typeof s === 'number' ? (ctl.done ? 0 : s) : s(ctl); } catch (e) { wait = 0; }
      if (typeof s === 'function' && typeof wait === 'number' && wait > 0) wait = Math.max(M.step, Math.round(wait * FLOW));   /* the next comes while this one settles */
      if (ctl.done || !wait) continue;
      await nap(typeof wait === 'number' ? sleep(wait) : wait);
    }
    ctl.done = true;
    if (listen) evs.forEach((e) => removeEventListener(e, stop, { capture: true }));
  })();
  return ctl;
}
/* the steps every timeline is built from */
function held(e, cls) { if (e) e.classList.add('fo-hold'); if (e && cls) e.classList.add(cls); return e; }
function landed(e) { if (e) e.classList.remove('fo-hold'); return e; }
function stepIn(els, o) {   /* enter: opacity and 8 px up (far: 16 px), one after another */
  return (ctl) => {
    const list = [].concat(els).filter(Boolean); const gap = o && o.gap !== undefined ? o.gap : M.step;
    list.forEach((e, i) => { landed(e); if (ctl.done) return; e.style.setProperty('--d', (i * gap) + 'ms'); e.classList.add(o && o.pop ? 'fo-popped' : o && o.fade ? 'fo-faded' : 'fo-in'); if (o && o.far) e.classList.add('far'); });
    return list.length ? M.base + (list.length - 1) * gap : 0;
  };
}
function stepPop(els, gap) { return stepIn(els, { pop: true, gap: gap === undefined ? M.step : gap }); }
/* grow: bar fills to --w, one after another; each bar's row and words fade in with it */
function stepGrow(rows, gap) {
  return (ctl) => {
    const list = rows.filter(Boolean); const g = gap === undefined ? M.step : gap;
    list.forEach((row, i) => {
      landed(row); const f = row.querySelector('.fill');
      if (ctl.done) { if (f) { f.style.transition = 'none'; f.style.setProperty('--w', f.dataset.w); requestAnimationFrame(() => { f.style.transition = ''; }); } return; }
      row.style.setProperty('--d', (i * g) + 'ms'); row.classList.add('fo-faded');
      if (f) { f.style.transitionDelay = (i * g) + 'ms'; f.style.setProperty('--w', f.dataset.w); }
    });
    return list.length ? M.slow + (list.length - 1) * g : 0;
  };
}
/* draw: lines that carry .fo-drawing draw themselves */
function stepDraw(root, dur) { return (ctl) => { const ps = root ? [...root.querySelectorAll('.fo-drawing')] : []; ps.forEach((p) => { if (dur) p.style.setProperty('--dur', dur + 'ms'); if (ctl.done) p.style.transition = 'none'; p.classList.add('go'); }); return ps.length ? (dur || M.slow) : 0; }; }
/* a dot on a strip goes to p (0..1); its colour with it */
function setP(dot, p) { dot.p = p; dot.style.setProperty('--p', String(p)); }
/* pop, once, on something that just changed (the room opening the next game) */
function popOnce(e) { if (!e || reduced()) return; e.classList.remove('fo-popped'); void e.offsetWidth; e.style.setProperty('--d', '0ms'); e.classList.add('fo-popped'); }

/* slide forward / back between the steps of a game; any other change of screen: the new one enters. Taps work all through:
   with the View Transitions API the pseudo-elements let taps through to the new screen; by hand, the old screen lies over the
   new one, inert, and goes. The game's name, the count and the progress stay still between two questions. Focus moves to the
   new screen's heading. */
let screenSeq = 0, slideNow = null;
const SLIDE_BY_HAND = /[?&]slide=hand\b/.test(location.search);   /* ?slide=hand: the hand-made slide even where the browser has View Transitions, to compare the two on a phone */
/* A tap during a View Transition slide: the moving part is only a picture of the screen, so the browser gives the tap to what
   lies around it (the stage), never to a button. The slide keeps running; when it lands, the tap goes on to the control under
   the finger. No tap is lost and nothing snaps (motion spec, rule 4; the same in the Anonymous Check-in). */
const PASS_TO = 'button, a, input, select, textarea, label, [tabindex]:not([tabindex="-1"])';
document.addEventListener('click', (e) => {
  const t = slideNow;
  if (!t || !e.isTrusted || (e.target.closest && e.target.closest(PASS_TO))) return;
  const x = e.clientX, y = e.clientY;
  e.stopPropagation(); e.preventDefault();
  t.finished.finally(() => requestAnimationFrame(() => {
    const at = document.elementFromPoint(x, y), c = at && at.closest(PASS_TO);
    if (c && !c.disabled) { if (c.matches('input, select, textarea')) c.focus(); else c.click(); }
  }));
}, true);
function swapScreen(root, node, how, after) {
  const old = root.firstElementChild && !root.firstElementChild.classList.contains('fo-leaving') ? root.firstElementChild : null;
  const seq = ++screenSeq;
  const keep = !!(old && old.classList.contains('fo-itemscreen') && node.classList.contains('fo-itemscreen'));
  const focusHead = () => { const hd = node.querySelector('h1'); if (hd) { hd.tabIndex = -1; try { hd.focus({ preventScroll: true }); } catch (e) { /* not focusable */ } } };
  const put = () => { root.textContent = ''; root.classList.remove('fo-sliding'); root.appendChild(node); if (after) after(); focusHead(); };
  if (!old || (how !== 'fwd' && how !== 'back')) { put(); return seq; }
  const de = document.documentElement;
  /* a screen with the guess strip slides by hand: its drag starts on the pointer going down, which a View Transition would keep from it */
  if (document.startViewTransition && !SLIDE_BY_HAND && !node.querySelector('.fo-strip')) {
    /* a screen still leaving from a slide by hand goes now: two screens with one transition name would stop the slide (5 Nov) */
    root.querySelectorAll(':scope > .fo-leaving').forEach((c) => c.remove()); root.classList.remove('fo-sliding');
    de.dataset.foSlide = how; if (keep) de.dataset.foKeep = ''; else delete de.dataset.foKeep;
    node.classList.add('fo-still');                                 /* pictured by the transition: it does not also enter */
    try {
      const t = document.startViewTransition(put); slideNow = t;
      for (const p of [t.ready, t.updateCallbackDone]) if (p && p.catch) p.catch(() => {});   /* a slide the browser skips is no error: the screen is in place */
      t.finished.finally(() => { if (slideNow === t) slideNow = null; if (seq === screenSeq) { delete de.dataset.foSlide; delete de.dataset.foKeep; } });
      return seq;
    } catch (e) { delete de.dataset.foSlide; delete de.dataset.foKeep; node.classList.remove('fo-still'); put(); return seq; }
  }
  /* by hand: the same two screens overlapping for --m-base */
  const rr = root.getBoundingClientRect(), r = old.getBoundingClientRect();
  [...root.children].forEach((c) => { if (c !== old) c.remove(); });
  root.classList.add('fo-sliding');
  old.style.left = (r.left - rr.left) + 'px'; old.style.top = (r.top - rr.top) + 'px'; old.style.width = r.width + 'px';
  old.classList.add('fo-leaving', how === 'fwd' ? 'fo-slide-out-l' : 'fo-slide-out-r'); if (keep) old.classList.add('fo-keepframe');
  old.inert = true; old.setAttribute('aria-hidden', 'true');
  node.classList.add(how === 'fwd' ? 'fo-slide-in-r' : 'fo-slide-in-l'); if (keep) node.classList.add('fo-keepframe');
  root.insertBefore(node, old);
  if (after) after(); focusHead();
  setTimeout(() => { old.remove(); if (!root.querySelector('.fo-leaving')) root.classList.remove('fo-sliding'); }, M.base + 40);
  return seq;
}
/* rise: a sheet comes up. On the way out the dialog closes at once, so the page under it takes taps straight away, and a still
   picture of it sinks while the dim fades; both let every tap through (the same as the Anonymous Check-in) */
function openSheet(d) { if (!d || !d.showModal) return; if (!d.open) d.showModal(); }
function closeSheet(d) {
  if (!d || !d.open) return;
  if (reduced() || !d.isConnected) { d.close(); return; }
  const r = d.getBoundingClientRect(), cs = getComputedStyle(d), top = d.scrollTop;
  const ghost = document.createElement('div');
  ghost.className = 'fo-ghost'; ghost.setAttribute('aria-hidden', 'true'); ghost.inert = true;
  ghost.innerHTML = d.innerHTML;
  ghost.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
  Object.assign(ghost.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px',
    borderRadius: cs.borderRadius, background: cs.backgroundColor, color: cs.color, boxShadow: cs.boxShadow, padding: cs.padding, fontSize: cs.fontSize });
  const scrim = document.createElement('div'); scrim.className = 'fo-ghost-scrim'; scrim.setAttribute('aria-hidden', 'true');
  d.close();
  document.body.appendChild(scrim); document.body.appendChild(ghost); ghost.scrollTop = top;   /* the picture shows what was on screen, scrolled or not */
  setTimeout(() => { ghost.remove(); scrim.remove(); }, M.base + 40);
}
document.addEventListener('cancel', (e) => { const d = e.target; if (d && d.tagName === 'DIALOG' && d.open && document.body.dataset.g === 'findout') { e.preventDefault(); closeSheet(d); } }, true);
/* a tap on the dim area around a sheet closes it, as on the rest of the site; the "?" in the header opens its sheet */
document.addEventListener('click', (e) => {
  const d = e.target;
  if (d && d.tagName === 'DIALOG' && d.open && document.body.dataset.g === 'findout' && !d.hasAttribute('data-stay')) {
    const r = d.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeSheet(d);
    return;
  }
  const b = e.target && e.target.closest ? e.target.closest('header [data-open]') : null;
  if (b && document.body.dataset.g === 'findout') { const s = document.getElementById(b.dataset.open); if (s) openSheet(s); }
});

/* one call to a server with two addresses (see API_ADDR): the first address's failure to answer at all, before it has ever
   answered, moves the page to the second; any answer, even an error, settles it */
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
async function api(path, body, opts) {
  const o = Object.assign({ method: body ? 'POST' : 'GET', headers: {} }, opts || {});
  if (body) { o.headers['Content-Type'] = 'application/json'; o.body = JSON.stringify(body); }
  const r = await reach(API_ADDR, path, o, o.timeout || 8000);
  if (!r.ok) throw new Error('http ' + r.status);
  return await r.json();
}
function counter(event) {
  const st = load();
  if (st.funnel[event]) return;
  st.funnel[event] = 1; save();
  api('/counter', { event, trial: TRIAL }).catch(() => {});
}

/* ------------------------------------------------------------------ country ------ */
function countryOf(iso) { return COUNTRIES.find((c) => c.iso === iso) || null; }
function parliamentName(c) {
  if (!c) return 'the national parliament';
  let p = c.parliament.replace(/\s*\(.*\)\s*$/, '');
  if (p === 'Parliament' || p === 'Congress') return p;
  return /^the /i.test(p) ? p : 'the ' + p;
}
/* the forms a country takes inside the items, per language (the English sheet's [Parliament], [Country], [Nationals], [Nationality];
   the Italian sheet's articles, prepositions and genders; the Turkish sheet's case endings; the Spanish sheet's articles and "de" forms;
   the Portuguese and French sheets' forms, which their countries files carry as columns). Without a country: the language's "your country" */
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const FORMS = {
  en: (c) => ({ '[Parliament]': parliamentName(c), '[Country]': c ? c.name : 'your country', '[Nationals]': c ? c.nationals.replace(/^the /i, '') : 'people from your country', '[Nationality]': c ? c.nationality : 'from your country' }),
  it: (c) => ({ '[Il Parlamento]': c ? c.parliament : 'Il Parlamento del tuo Paese', '[nel Parlamento]': c ? c.parliament_in : 'nel Parlamento del tuo Paese', '[il Paese]': c ? c.art : 'il tuo Paese', '[in Paese]': c ? c.in : 'nel tuo Paese', '[del Paese]': c ? c.di : 'del tuo Paese',
                '[cittadino m / f]': c ? c.cittadino : 'un cittadino / una cittadina del tuo Paese', '[ai Nazionali m / f]': c ? c.ai : 'alle persone del tuo Paese', '[nazionalità m/f]': c ? c.nazionalita : 'del tuo Paese' }),
  tr: (c) => ({ '[Parliament]': c ? c.parliament : 'ülkenizin meclisi', '[Parliament-deki]': c ? c.parliament_deki : 'ülkenizin meclisindeki', '[Country]': c ? c.name : 'ülkeniz', '[Country-de]': c ? c.de : 'ülkenizde', '[Country-deki]': c ? c.deki : 'ülkenizdeki',
                '[Country-ye]': c ? c.ye : 'ülkenize', '[Country-den]': c ? c.den : 'ülkenizden', '[Nationals]': c ? c.nationals : 'ülkenizin insanları', '[Nationality]': c ? c.nationality : 'ülkenizden biri' }),
  es: (c) => ({ '[El Parlamento]': c ? c.parliament : 'El parlamento de tu país', '[El País]': c ? c.el : 'tu país', '[de País]': c ? c.de : 'de tu país', '[en País]': c ? c.en : 'en tu país',
                '[los Nacionales]': c ? c.los : 'las personas de tu país', '[nacionalidad m/f]': c ? c.nacionalidad : 'de tu país' }),
  pt: (c) => ({ '[O Parlamento]': c ? c.parliament : 'O Parlamento do seu país', '[o País]': c ? c.name_def : 'o seu país', '[O País]': c ? cap(c.name_def) : 'O seu país', '[do País]': c ? c.de : 'do seu país', '[no País]': c ? c.in : 'no seu país',
                '[os Nacionais]': c ? c.nationals : 'as pessoas do seu país', '[nacionalidade f]': c ? c.nac_f : 'do seu país', '[nacionalidade m/f]': c ? c.nac_mf : 'do seu país' }),
  fr: (c) => ({ '[le Parlement]': c ? cap(c.parliament) : 'Le Parlement de ton pays', '[au Parlement]': c ? c.parliament_au : 'au Parlement de ton pays', '[le Pays]': c ? c.name_def : 'ton pays', '[en Pays]': c ? c.in : 'dans ton pays', '[En Pays]': c ? cap(c.in) : 'Dans ton pays',
                '[du Pays]': c ? c.de : 'de ton pays', '[les Nationaux]': c ? c.nationals : 'les gens de ton pays', '[aux Nationaux]': c ? c.aux : 'aux gens de ton pays', '[nationalité m/f]': c ? c.nat_mf : 'de ton pays' }),
};
function playerCountry() {
  const st = load();
  const iso = st.country && st.country !== 'not said' ? st.country : st.header_country;
  return countryOf(iso);
}
function fill(text) {
  const c = playerCountry();
  const forms = (FORMS[LANG] || FORMS.en)(c);
  let out = String(text).replace(/\[[^\]]+\]/g, (m) => (m in forms ? forms[m] : m));
  /* Spanish contracts "de el" and "a el" ("ha hecho de el Reino Unido" → "del Reino Unido"); a capital El (El Salvador) never contracts */
  if (LANG === 'es') out = out.replace(/\bde el /g, 'del ').replace(/\ba el /g, 'al ');
  /* French: a plural country name (les Pays-Bas, les États-Unis) takes the plural verb in Q3d and Q3f (the sheet's rule) */
  if (LANG === 'fr' && c && c.plural) out = out.replace(' est un pays meilleur', ' sont un pays meilleur').replace(' réussit bien dans', ' réussissent bien dans');
  return out;
}
/* the country's own word in a pool name: English "people from Italy", Italian "persone dall'Italia", Turkish "İtalya halkı", Spanish "personas de Italia",
   Portuguese "pessoas da Itália", French "les gens d'Italie" */
function countryWord(c) { if (!c) return null; return (LANG === 'it' || LANG === 'es' || LANG === 'pt' || LANG === 'fr') ? c.from : c.name; }
async function hello() {
  const st = load();
  if (st.header_country !== null || st.hello_failed) return;
  try { const r = await api('/hello'); st.header_country = (r && typeof r.country === 'string' && countryOf(r.country)) ? r.country : ''; }
  catch (e) { st.hello_failed = true; }
  save();
}

/* ------------------------------------------------------------------ dialogs ------ */
function wireDialogs(root) {
  root.querySelectorAll('[data-open]').forEach((b) => b.addEventListener('click', () => openSheet(document.getElementById(b.dataset.open))));
  root.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => closeSheet(b.closest('dialog'))));
}
function sheet(id, title, bodyHtml) {
  let d = document.getElementById(id);
  if (!d) { d = h(`<dialog id="${id}" aria-labelledby="${id}-t"><div class="sheet"><button class="chip round close" type="button" data-close aria-label="${esc(U.close)}">×</button><h2 id="${id}-t"></h2><div class="sheet-body"></div></div></dialog>`); document.body.appendChild(d); wireDialogs(d); }
  d.querySelector('h2').textContent = title;
  d.querySelector('.sheet-body').innerHTML = bodyHtml;
  return d;
}

/* the "?" sheet of the section: the consent card's lines, and the one place where "Delete my answers" lives
   (Khayyam, 22 Oct: out of sight, never on the portrait) */
function howSheet() {
  const d = sheet('dlg-how', U.how_it_works, C.consent.help.map((l) => `<p>${esc(l)}</p>`).join(''));
  const st = load();
  if (st.consent.status === 'yes' || Object.keys(st.games).length) d.querySelector('.sheet-body').appendChild(deleteLink());
  return d;
}
function deleteLink() {
  const P = C.portrait; const b = el('button', 'fo-help-btn fo-delete', P.delete); b.type = 'button';
  b.addEventListener('click', () => {
    const d = sheet('dlg-del', P.delete, `<p>${esc(P.delete_sure)}</p><div class="actions"><button class="btn solid" id="del-yes" type="button">${esc(P.delete_yes)}</button><button class="btn ghost" type="button" data-close>${esc(P.delete_no)}</button></div>`);
    wireDialogs(d);
    d.querySelector('#del-yes').addEventListener('click', async () => {
      const st = load(); const id = st.id, sent = !!st.uploaded.at;
      try { if (sent) await api('/delete', { id }); } catch (e) { /* the server did not answer: the local copy still goes */ }
      wipe(); closeSheet(d); closeSheet(document.getElementById('dlg-how'));
      const root = document.getElementById('fo'); root.textContent = ''; root.appendChild(el('p', 'fo-lede', P.deleted));
    });
    openSheet(d);
  });
  return b;
}

/* ------------------------------------------------------------------ progress ------ */
function doneGames() { const st = load(); return ORDER.filter((n) => st.games[n] && st.games[n].result && st.games[n].result.scored !== false); }
function isDone(n) { const g = load().games[n]; return !!(g && g.result && g.result.scored !== false); }
function nextGame(after) {
  const start = after ? ORDER.indexOf(after) + 1 : 0;
  for (let i = 0; i < ORDER.length; i++) { const n = ORDER[(start + i) % ORDER.length]; if (!isDone(n)) return n; }
  return null;
}
function minutesLeft() { const s = ORDER.filter((n) => !isDone(n)).reduce((a, n) => a + SECONDS[n], 0); return Math.max(1, Math.round(s / 60)); }
function circles(current, base) {
  const w = el('div', 'fo-circles'); w.dataset.cur = current === null || current === undefined ? '' : String(current); w.dataset.base = base === undefined ? '../' : base;
  for (const n of ORDER) {
    const a = el(roomAllows(n) ? 'a' : 'span', (isDone(n) ? 'done' : (n === current ? 'now' : '')) + (roomAllows(n) ? '' : ' shut'), n);
    if (isDone(n) && n !== 1 && n !== 9) { const r = load().games[n].result; const col = bandColour(n, mainScore(n, r)); a.style.background = col; a.style.borderColor = col; }
    if (roomAllows(n)) a.href = `${base === undefined ? '../' : base}${SLUG[n]}/`; else a.title = C.room.not_yet;
    a.setAttribute('aria-label', `${tpl(U.game_aria, { n, name: C.games[n].name })}${isDone(n) ? ', ' + U.done_word : ''}${roomAllows(n) ? '' : ', ' + C.room.not_yet}`);
    w.appendChild(a);
  }
  return w;
}

/* ------------------------------------------------------------------ the guess strip ------ */
function strip(opts) {
  /* a rail with a dot; opts.ends = [left, right] or three band names; opts.p = 0..1 position; opts.drag = callback(p) */
  const w = el('div', 'fo-strip');
  const rail = el('div', 'fo-strip-rail' + (opts.bands ? ' bands' : ''));
  const dot = el('div', 'fo-strip-dot' + (opts.ring ? ' ring' : '') + (opts.still ? ' still' : ''));
  setP(dot, opts.p);
  w.appendChild(rail);
  if (opts.guess !== undefined && opts.guess !== null) { const ring = el('div', 'fo-strip-dot ring still'); setP(ring, opts.guess); ring.setAttribute('aria-hidden', 'true'); w.appendChild(ring); }
  w.appendChild(dot);
  if (opts.drag) {
    let active = false;
    const set = (clientX, done) => {
      const r = w.getBoundingClientRect(); let p = (clientX - r.left) / r.width; p = Math.min(1, Math.max(0, p));
      if (opts.snap) p = Math.round(p * opts.snap) / opts.snap;
      setP(dot, p); opts.drag(p, done);
    };
    /* a tap sends the marker gliding there (--m-base, --e-spring); once the finger moves, the marker follows it directly */
    let x0 = 0;
    w.addEventListener('pointerdown', (e) => { active = true; x0 = e.clientX; w.setPointerCapture(e.pointerId); set(e.clientX, false); });
    w.addEventListener('pointermove', (e) => { if (!active) return; if (!dot.classList.contains('drag') && Math.abs(e.clientX - x0) > 3) dot.classList.add('drag'); if (dot.classList.contains('drag')) set(e.clientX, false); });
    const up = (e) => { if (!active) return; active = false; dot.classList.remove('drag'); set(e.clientX, true); };
    w.addEventListener('pointerup', up); w.addEventListener('pointercancel', up);
    dot.tabIndex = 0; dot.setAttribute('role', 'slider'); dot.setAttribute('aria-valuemin', '0'); dot.setAttribute('aria-valuemax', '100');
    dot.addEventListener('keydown', (e) => {
      let p = dot.p; const step = opts.snap ? 1 / opts.snap : 0.05;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') p -= step; else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') p += step; else return;
      e.preventDefault(); p = Math.min(1, Math.max(0, p)); setP(dot, p); opts.drag(p, true);   /* the marker moves on --m-base --e-spring */
    });
  }
  w.dot = dot;
  return w;
}
function ends(names) {
  const e = el('div', 'fo-ends' + (names.length === 3 ? ' three' : ''));
  names.forEach((n) => e.appendChild(el('span', '', n)));
  return e;
}

/* scale of each game's main score, for placing dots and turning a slider position into a guess */
const SCALE = { 1: [1, 5], 2: [1, 5], 3: [0, 24], 4: [0, 4], 5: [0, 10], 6: [0, 4], 7: [0, 10], 8: [1, 5] };
function toScale(n, p) { const [a, b] = SCALE[n]; return a + p * (b - a); }
function toP(n, v) { const [a, b] = SCALE[n]; return Math.min(1, Math.max(0, (v - a) / (b - a))); }
/* the band of a value, by the same edges as scoring.js (display only; the record is the raw mean) */
function bandIndex(n, v) {
  if (n === 2 || n === 8) return v < 8 / 3 ? 0 : v < 11 / 3 ? 1 : 2;
  if (n === 3) return v < 12 ? 0 : v < 18 ? 1 : 2;
  if (n === 4 || n === 6) { const r = Math.round(v); return r <= 1 ? 0 : r === 2 ? 1 : 2; }
  if (n === 5 || n === 7) return v < 4 ? 0 : v < 6.5 ? 1 : 2;
  return null;
}
function bandName(n, v) { const i = bandIndex(n, v); return i === null ? null : C.games[n].bands[i].name; }
/* a game's main score for the strips (game 6: riddles right, 0-4; the guess counts riddles that catch, so it is turned round) */
function mainScore(n, res) {
  if (!res || !res.scored) return null;
  if (n === 1) return res.traits && res.traits.E !== null ? res.traits.E : null;
  return res.score;
}

/* ------------------------------------------------------------------ the game page ------ */
function gamePage(n) {
  const root = document.getElementById('fo');
  const st = load();
  const cg = C.games[n], ig = G[n];
  hello();
  counter('start');
  let play = st.games[n] && !st.games[n].result ? st.games[n] : null;   /* a game left half-way resumes */

  /* how: 'fwd' / 'back' between the steps of the game (slide); nothing: the screen enters (the card, a result) */
  function show(node, how) { return swapScreen(root, node, how, () => { wireDialogs(node); root.classList.toggle('fo-wide', node.classList.contains('fo-reveal')); window.scrollTo({ top: 0, behavior: 'instant' }); }); }
  /* the progress glides from where the last question left it (5 Nov 2026) */
  let lastP = null;
  function nav(count, i) {
    const p = el('div', 'fo-progress'); for (let k = 0; k < count; k++) p.appendChild(el('i', k < i ? 'on' : ''));
    const fill = el('span', 'fill'); fill.setAttribute('aria-hidden', 'true'); for (let k = 0; k < count; k++) fill.appendChild(el('b')); p.appendChild(fill);
    const to = i / count, from = lastP === null ? to : lastP; lastP = to;
    p.style.setProperty('--p', String(from));
    if (from !== to) requestAnimationFrame(() => requestAnimationFrame(() => p.style.setProperty('--p', String(to))));
    return p;
  }
  /* select: the answer's colour sweeps in (CSS), then a short wait, then the next screen; a second tap meanwhile replaces the first,
     and Back meanwhile wins */
  function after(choice, go) { const mine = screenSeq; clearTimeout(after.t); after.t = setTimeout(() => { if (mine === screenSeq) go(); }, choice ? (reduced() ? SELECT_WAIT : M.fast + SELECT_WAIT) : 0); }

  /* ---- 1. the game card ---- */
  function card() {
    const done = isDone(n);
    const w = el('section', 'fo-screen');
    w.appendChild(circles(n));
    w.appendChild(el('h1', 'fo-title', cg.name));
    w.appendChild(el('p', 'fo-lede', cg.start_line));
    w.appendChild(el('p', 'fo-quiet', cg.instruction));
    w.appendChild(el('p', 'fo-promise', tpl(C.shared.card_line_tpl, { n })));
    if (!done) w.appendChild(el('p', 'fo-once', C.shared.once_line));
    const acts = el('div', 'fo-actions fo-bottom');
    const b = el('button', 'btn solid', done ? U.see_result : (play ? U.carry_on : U.start)); b.type = 'button';
    b.addEventListener('click', () => done ? reveal(st.games[n], true) : begin('fwd'));
    acts.appendChild(b); w.appendChild(acts);
    helpSheet();
    return w;
  }
  function againCard() {
    const R = C.room;
    const w = el('section', 'fo-screen');
    w.appendChild(circles(n));
    w.appendChild(el('h1', 'fo-title', cg.name));
    w.appendChild(el('p', 'fo-lede', cg.start_line));
    w.appendChild(el('p', 'fo-quiet', R.play_again_note));
    const acts = el('div', 'fo-actions fo-bottom');
    const b = el('button', 'btn solid', R.play_again); b.type = 'button';
    b.addEventListener('click', () => { archivePlay(n); play = null; begin('fwd'); });
    const see = el('button', 'fo-help-btn', U.see_result); see.type = 'button'; see.addEventListener('click', () => reveal(st.games[n], true));
    acts.appendChild(b); acts.appendChild(see); w.appendChild(acts);
    helpSheet();
    return w;
  }
  function helpSheet() {
    const lines = [esc(cg.help)];
    const pub = ig.published_instruction || (ig.sheet_notes && ig.sheet_notes['Published lead-in']);
    if (pub) lines.push('<span class="quiet">' + esc(pub.replace(/^"|"$/g, '')) + '</span>');
    lines.push('<span class="quiet" data-privacy="findout">' + esc(U.privacy_line) + '</span>');
    sheet('dlg-help', cg.name, lines.map((l) => `<p>${l}</p>`).join(''));
  }

  function begin(how) {
    if (NEEDS_COUNTRY[n] && !st.country_asked) return countryTap(how);
    if (!play) { play = { started: Date.now(), answers: {}, times: {}, positions: {}, order: shuffledKeys(), guess: null, lang: LANG, v: ITEM_VERSION }; st.games[n] = play; save(); }
    if (cg.guess && play.guess === null) return guess(how);
    items(0, how);
  }
  function keyOf(it) { if (n === 7 && it.filler) return 'grandmother'; return String(it.id !== undefined ? it.id : (it.position !== undefined ? it.position : it.n)); }
  function shuffledKeys() {
    const keys = ig.items.map(keyOf);
    if (n === 7) { const eu = !!(playerCountry() && playerCountry().eu); return keys.filter((k) => k !== 'B11' || eu); }
    if (n === 9) return ['1', '2', '4', '5', '6', '7', '8', '9', '3'];     /* the long society ladder last (K, 22 Oct) */
    return (n === 2 || n === 5) ? shuffle(keys) : keys;
  }

  /* ---- the country tap, before the first game that needs a country ---- */
  function countryTap(how) {
    const ct = C.games[2].country_tap;
    const hc = countryOf(st.header_country);
    const w = el('section', 'fo-screen');
    const finish = (iso) => { st.country = iso; st.country_asked = true; save(); begin('fwd'); };
    const pick = (b, go) => { b.parentNode.querySelectorAll('.on').forEach((x) => x.classList.remove('on')); b.classList.add('on'); after(true, go); };
    if (hc) {
      w.appendChild(el('h1', 'fo-title', U.are_you_form === 'are_you' ? hc.are_you : tpl(U.are_you, { x: U.are_you_form === 'from' ? hc.from : hc.nationality })));
      const acts = el('div', 'fo-choices two');
      const yes = el('button', 'btn ghost', ct.yes); yes.type = 'button'; yes.addEventListener('click', () => pick(yes, () => finish(hc.iso)));
      const no = el('button', 'btn ghost', ct.no); no.type = 'button'; no.addEventListener('click', () => pick(no, () => show(whereFrom(), 'fwd')));
      acts.appendChild(yes); acts.appendChild(no); w.appendChild(acts);
      show(w, how);
    } else show(whereFrom(), how);
    function whereFrom() {
      const v = el('section', 'fo-screen');
      v.appendChild(el('h1', 'fo-title', ct.where));
      v.appendChild(el('p', 'fo-quiet', ct.optional));
      const skip = el('button', 'chip', ct.skip); skip.type = 'button'; skip.style.marginTop = '10px';
      skip.addEventListener('click', () => after(false, () => finish('not said')));
      v.appendChild(skip);
      const box = el('input', 'fo-search'); box.type = 'search'; box.placeholder = U.type_first_letters; box.setAttribute('aria-label', U.find_country); box.autocomplete = 'off';
      v.appendChild(box);
      const list = el('ul', 'fo-countries');
      box.addEventListener('input', () => { const q = lower(box.value.trim()); list.querySelectorAll('li').forEach((li) => { li.hidden = !!q && !li.dataset.name.includes(q); }); });
      const sorted = COUNTRIES.slice().sort((a, b) => a.name.localeCompare(b.name, L.locale));
      const top = hc ? [hc] : [];
      for (const c of top.concat(sorted.filter((c) => !hc || c.iso !== hc.iso))) {
        const li = el('li'); li.dataset.name = lower(c.name + ' ' + c.nationals + ' ' + c.nationality + ' ' + (c.search || '')); const b = el('button', top.includes(c) ? 'top' : ''); b.type = 'button';
        b.appendChild(el('span', 'flag', c.flag)); b.appendChild(el('span', '', c.name));
        b.addEventListener('click', () => { list.querySelectorAll('button.on').forEach((x) => x.classList.remove('on')); b.classList.add('on'); after(true, () => finish(c.iso)); }); li.appendChild(b); list.appendChild(li);
      }
      v.appendChild(list);
      return v;
    }
  }

  /* ---- 2. the guess ---- */
  function guess(how) {
    const w = el('section', 'fo-screen');
    const q = cg.guess.question || C.shared.guess_q;
    w.appendChild(el('p', 'meta', cg.name));
    if (cg.guess_line) w.appendChild(el('p', 'fo-lede', cg.guess_line));
    const low = el('div', 'fo-bottom');
    low.appendChild(el('h1', 'fo-title fo-title-s', q));
    low.appendChild(el('p', 'fo-quiet', C.shared.guess_hint));
    let p = 0.5; let moved = false;
    const read = el('p', 'fo-guess-read', '');
    const names = cg.bands && n !== 6 ? cg.bands.map((b) => b.name) : cg.guess.ends;
    const s = strip({ p, bands: !!(cg.bands && n !== 6), snap: n === 6 ? 4 : 0, drag: (np, done) => { p = np; moved = true; read.textContent = guessWord(np); go.disabled = false; } });
    low.appendChild(s); low.appendChild(ends(names)); low.appendChild(read);
    w.appendChild(low);
    const acts = el('div', 'fo-actions');
    const go = el('button', 'btn solid', U.my_guess); go.type = 'button'; go.disabled = true;
    go.addEventListener('click', () => { play.guess = { p, value: n === 6 ? Math.round(p * 4) : toScale(n, p) }; save(); items(0, 'fwd'); });
    acts.appendChild(go); low.appendChild(acts);
    show(w, how);
    function guessWord(p) {
      if (n === 6) { const k = Math.round(p * 4); return k === 0 ? cg.guess.ends[0] : k === 4 ? cg.guess.ends[1] : ofN(k, 4); }
      if (n === 1) return ofN(Math.round(toScale(1, p)), 5);
      return bandName(n, toScale(n, p));
    }
  }

  /* ---- 3. one item per screen ---- */
  function itemByKey(k) { return ig.items.find((it) => keyOf(it) === k); }
  function items(i, how) {
    const keys = play.order;
    if (i >= keys.length) return afterItems();
    const k = keys[i]; const it = itemByKey(k);
    const w = el('section', 'fo-screen fo-itemscreen');
    const top = el('div', 'fo-itemtop');
    const meta = el('p', 'meta', ''); meta.appendChild(el('b', '', cg.name)); meta.appendChild(document.createTextNode(ofN(i + 1, keys.length))); top.appendChild(meta);
    const skip = el('button', 'chip fo-skip', C.shared.skip); skip.type = 'button'; top.appendChild(skip);
    w.appendChild(top);
    w.appendChild(nav(keys.length, i));
    const instr = cg.instruction || ig.instruction_ours;   /* the copy doc's line, in the page's language */
    const mid = el('div', 'fo-mid');
    if (n !== 4) mid.appendChild(el('p', 'fo-quiet', instr));
    if (ig.stem) mid.appendChild(el('p', 'fo-stem', ig.stem));
    const text = n === 4 ? instr : itemText(it);
    const tt = el('h1', 'fo-item' + (text.length > 120 ? ' long' : ''), text);
    mid.appendChild(tt);
    w.appendChild(mid);
    const shown = Date.now();
    play.positions[k] = i;
    const answer = (value) => { play.answers[k] = value; play.times[k] = Date.now() - shown; save(); after(value !== null, () => items(i + 1, 'fwd')); };
    skip.addEventListener('click', () => answer(null));
    const low = el('div', 'fo-bottom fo-controls');
    low.appendChild(control(it, k, answer));
    const bar = el('div', 'fo-nav');
    const back = el('button', 'chip', '‹ ' + C.shared.back); back.type = 'button'; back.disabled = i === 0; back.addEventListener('click', () => { clearTimeout(after.t); items(i - 1, 'back'); });
    bar.appendChild(back); low.appendChild(bar);
    w.appendChild(low);
    show(w, how);
  }
  function itemText(it) { return fill(it.text || ''); }
  function control(it, k, answer) {
    const prev = play.answers[k];
    const read = el('p', 'fo-read', prev === null && k in play.answers ? C.shared.skipped : '');
    const wrap = el('div');
    const dots = (points, labelled, outOf, readFn) => {
      const row = el('div', 'fo-dots' + (points.length > 5 ? ' many' : ''));
      for (const pt of points) {
        const b = el('button', prev === pt.value ? 'on' : ''); b.type = 'button';
        b.setAttribute('aria-label', pt.label ? `${pt.label}` : ofN(pt.value, outOf));
        b.appendChild(el('i'));
        if (labelled && pt.label) b.appendChild(el('small', '', pt.label));
        if (!labelled && pt.num !== undefined) b.appendChild(el('small', 'num', pt.num));
        b.addEventListener('click', () => { row.querySelectorAll('button').forEach((x) => x.classList.remove('on')); b.classList.add('on'); read.textContent = readFn(pt); answer(pt.value); });
        row.appendChild(b);
      }
      wrap.appendChild(row);
      if (!labelled) { const e = el('div', 'fo-scale-ends'); e.appendChild(el('span', '', points[0].label || '')); e.appendChild(el('span', '', points[points.length - 1].label || '')); wrap.appendChild(e); }
      wrap.appendChild(read);
      return wrap;
    };
    const choices = (opts, cls) => {
      const row = el('div', 'fo-choices' + (cls ? ' ' + cls : ''));
      for (const o of opts) {
        const b = el('button', 'btn ghost' + (prev === o.value ? ' on' : ''), o.label); b.type = 'button'; b.dataset.value = o.value;
        b.addEventListener('click', () => { row.querySelectorAll('.btn').forEach((x) => x.classList.remove('on')); b.classList.add('on'); answer(o.value); });
        row.appendChild(b);
      }
      wrap.appendChild(row); wrap.appendChild(read); return wrap;
    };
    if (n === 1) return dots(ig.response_points, true, 5, (pt) => `${pt.label} · ${ofN(pt.value, 5)}`);
    if (n === 2) { const pts = ig.response_points.map((p, i) => ({ value: p.value, label: p.label || cg.scale_words[i - 1] })); return dots(pts, true, 5, (pt) => `${pt.label} · ${ofN(pt.value, 5)}`); }
    if (n === 3) return dots(ig.response_points, true, 4, (pt) => pt.label);
    if (n === 8) return dots(ig.response_points_ISSP_codes.map((p) => ({ value: p.code, label: p.label })), true, 5, (pt) => pt.label);
    if (n === 5) return dots(ig.response_points.map((p) => Object.assign({ num: tpl(U.pct_fmt, { n: p.percent }) }, p)), false, 10, (pt) => `${tpl(U.pct_fmt, { n: pt.percent })} · ${pt.label}`);
    if (n === 7) { const pts = []; for (let v = 0; v <= 10; v++) pts.push({ value: v, label: v === 0 ? ig.response_points[0].label : v === 10 ? ig.response_points[1].label : null, num: v }); return dots(pts, false, 10, (pt) => ofN(pt.value, 10)); }
    /* games 4 and 6 store the English option (the scoring and the data are one for every language) and show the language's word */
    const word = (o) => (it.labels && it.labels[o]) || o;
    if (n === 4) return choices(it.options.map((o) => ({ value: o, label: word(o) })), 'two');
    if (n === 6) {
      if (!play.option_order) play.option_order = {};
      if (!play.option_order[k]) { play.option_order[k] = shuffle([it.correct, it.lure, ...it.other_wrong]); save(); }
      return choices(play.option_order[k].map((o) => ({ value: o, label: word(o) })));
    }
    if (n === 9) {
      const sc = it.scale;
      if (String(it.n) === '5') return choices(sc.split(' · ').map((l, i) => ({ value: i + 1, label: l })));
      if (String(it.n) === '9') return choices(sc.split(' · ').map((l, i) => ({ value: i + 1, label: l })));
      if (String(it.n) === '2' || String(it.n) === '3') {
        const lo = String(it.n) === '3' ? 1 : 0;
        const lad = el('div', 'fo-ladder');
        for (let v = 10; v >= lo; v--) {
          const b = el('button', prev === v ? 'on' : '', ''); b.type = 'button';
          b.appendChild(el('b', '', v)); b.appendChild(el('span', '', v === 10 ? (String(it.n) === '2' ? U.best_life : U.best_off) : v === lo ? (String(it.n) === '2' ? U.worst_life : U.worst_off) : ''));
          b.addEventListener('click', () => { lad.querySelectorAll('button').forEach((x) => x.classList.remove('on')); b.classList.add('on'); read.textContent = tpl(U.step, { v }); answer(v); });
          lad.appendChild(b);
        }
        wrap.appendChild(lad); wrap.appendChild(read); return wrap;
      }
      const m = sc.match(/^0 "(.+?)" – 10 "(.+?)"$/);
      const pts = []; for (let v = 0; v <= 10; v++) pts.push({ value: v, label: v === 0 ? (m ? m[1] : '0') : v === 10 ? (m ? m[2] : '10') : null, num: v });
      return dots(pts, false, 10, (pt) => ofN(pt.value, 10));
    }
    return wrap;
  }

  /* ---- after the last item: the riddles' extra tap, then the score ---- */
  function afterItems() {
    if (n === 6 && play.seen_before === undefined) {
      const w = el('section', 'fo-screen');
      w.appendChild(el('h1', 'fo-title', cg.seen_before.question));
      const row = el('div', 'fo-choices two');
      cg.seen_before.options.forEach((o, i) => { const b = el('button', 'btn ghost', o); b.type = 'button'; b.addEventListener('click', () => { row.querySelectorAll('.on').forEach((x) => x.classList.remove('on')); b.classList.add('on'); play.seen_before = i === 0; save(); after(true, () => afterItems()); }); row.appendChild(b); });
      const skip = el('button', 'chip', C.shared.skip); skip.type = 'button'; skip.style.marginTop = '12px'; skip.addEventListener('click', () => { play.seen_before = null; save(); after(false, () => afterItems()); });
      w.appendChild(row); w.appendChild(skip); show(w, 'fwd'); return;
    }
    finish();
  }
  function finish() {
    const answers = {};
    for (const k of play.order) answers[k] = k in play.answers ? play.answers[k] : null;
    if (n === 6) answers.seen_before = play.seen_before === undefined ? null : play.seen_before;
    let result;
    try { result = scoreGame(n, answers); } catch (e) { result = { scored: false, error: String(e && e.message) }; }
    play.finished = Date.now(); play.duration_ms = play.finished - play.started; play.result = result; play.rules_version = RULES_VERSION;
    if (result.scored !== false && !st.done_order.includes(n)) st.done_order.push(n);
    save();
    if (result.scored !== false) {
      counter('game_' + n);
      counter('first_game');   /* the find-outs' own count on the home page; counter() sends each event once per phone */
      if (doneGames().length === 9) counter('all_nine');
    }
    if (st.consent.status === 'yes') uploadLater();
    reveal(play);
  }

  /* ---- 4. the reveal: one timeline (5 Nov 2026). The screen enters; the picture plays (the dot travels from the guess to the
     score and the band name pops; or the bars grow one after another); the lines and the comparison enter; "Did you know"
     and the rest after the picture; the onward card last. Every element is in its place from the start, so nothing jumps. ---- */
  function reveal(g, again) {
    const res = g.result;
    const w = el('section', 'fo-screen fo-reveal');
    const circ = circles(n); const mine = circ.querySelectorAll('a')[n - 1]; if (mine && mine.classList.contains('done') && !again) mine.classList.add('fresh');   /* pops once, when the game is finished */
    w.appendChild(circ);
    w.appendChild(el('p', 'meta', cg.name));
    if (again && g.finished) { const d = new Date(g.finished), d2 = new Date(g.finished); d2.setMonth(d2.getMonth() + 3); w.appendChild(el('p', 'fo-played-on', C.shared.played_on.replace('{date}', shortDate(d)).replace('{date2}', shortDate(d2)))); }
    const main = el('div', 'fo-result'); const facts = el('div', 'fo-facts');
    if (!res || res.scored === false) {
      w.appendChild(el('h1', 'fo-title', C.shared.not_scored));
      const acts = el('div', 'fo-actions');
      const again = el('button', 'btn solid', U.play_again); again.type = 'button';
      again.addEventListener('click', () => { delete st.games[n]; play = null; save(); begin('fwd'); });
      acts.appendChild(again); w.appendChild(acts);
      w.appendChild(onward()); show(w); return;
    }
    const score = mainScore(n, res);
    const steps = [M.base];            /* the screen lands first */
    const curves = [];                 /* the world's curves: the picture waits for their numbers (at most --m-slow × 2) so nothing moves under it */
    const settle = () => (curves.length ? Promise.race([Promise.all(curves.map((b) => b.ready)), sleep(2 * M.slow)]) : 0);
    if (n === 9 || n === 1) {
      main.appendChild(el('h1', 'fo-title', n === 9 ? U.nine_answers : U.five_bars));
      const list = el('div', 'fo-bars'); const rows = [];
      const bar = (name, v, p, small, curve) => {
        const row = held(el('div', 'fo-bar' + (v === null ? ' skip' : '')));
        row.appendChild(el('b', '', name));
        const rail = el('div', 'rail'); const fillEl = el('div', 'fill'); fillEl.dataset.w = (p * 100) + '%'; rail.appendChild(fillEl); row.appendChild(rail);
        row.appendChild(el('small', '', small));
        list.appendChild(row); rows.push(row);
        if (curve) curves.push(held(curveLine(main, curve[0], v, curve[1], row, curve[2])));
        return rail;
      };
      if (n === 9) {
        for (const it of G[9].items) {
          const k = String(it.n); const v = res.items[k];
          const [lo, hi] = k === '3' ? [1, 10] : k === '5' ? [1, 4] : k === '9' ? [1, 2] : [0, 10];
          const p = v === null ? 0 : (k === '5' ? (4 - v) / 3 : k === '9' ? (v === 1 ? 1 : 0) : (v - lo) / (hi - lo));
          bar(dialName(k), v, p, v === null ? C.shared.skipped : dialWord(k, v), v !== null ? [`g9.${k}`, cg.comparison[k], k !== '1'] : null);
        }
      } else {
        cg.bars.forEach((b, bi) => {
          const key = TRAITS[bi]; const v = key === 'calm' ? res.calm : res.traits[key];
          const rail = bar(b.name, v, v === null ? 0 : toP(1, v), v === null ? C.shared.skipped : (v >= 3 ? b.high : b.low), v !== null ? [`g1.${key}`, cg.comparison[bi], bi !== 0] : null);
          if (bi === 0 && g.guess) { const ring = el('div', 'ring'); ring.style.left = (toP(1, g.guess.value) * 100) + '%'; rail.appendChild(ring); }
        });
      }
      main.appendChild(list);
      let gl = null;
      if (n === 1 && g.guess && res.traits.E !== null) gl = main.appendChild(held(h(`<p class="fo-guessline">${esc(U.g1_prefix || C.shared.you_guessed)} <b>${esc(ofN(Math.round(g.guess.value), 5))}</b> · ${esc(C.shared.you_landed)} <b>${esc(ofN(Math.round(res.traits.E), 5))}</b></p>`)));
      steps.push(settle, stepGrow(rows), stepIn(curves), stepIn(gl));
    } else {
      const bi = bandIndex(n, score); const band = cg.bands[bi];
      const names = cg.bands.map((b) => b.name);
      const gp = g.guess ? (n === 6 ? 1 - g.guess.value / 4 : g.guess.p) : null;
      const s = strip({ p: gp === null ? toP(n, score) : gp, bands: true, guess: gp });
      main.appendChild(s); main.appendChild(ends(names));
      const bn = held(el('h1', 'fo-bandname', band.name)); bn.style.color = bandColour(n, score); main.appendChild(bn);
      const lines = held(el('div', 'fo-lines')); band.lines.forEach((l) => lines.appendChild(el('p', '', l))); main.appendChild(lines);
      let gl = null;
      if (g.guess) {
        if (n === 6) gl = main.appendChild(held(h(`<p class="fo-guessline">${esc(U.g6_prefix || C.shared.you_guessed)} <b>${esc(tpl(U.g6_guess, { g: g.guess.value }))}</b> · <b>${esc(tpl(U.g6_did, { d: 4 - res.score }))}</b></p>`)));
        else gl = main.appendChild(held(h(`<p class="fo-guessline">${esc(C.shared.you_guessed)} <b>${esc(bandName(n, g.guess.value))}</b> · ${esc(C.shared.you_landed)} <b>${esc(band.name)}</b></p>`)));
      }
      let expl = [];
      if (n === 6) {
        const ul = el('ul', 'fo-expl');
        G[6].items.forEach((it, i) => { const li = held(el('li')); const code = res.codes[String(it.n)]; li.appendChild(el('span', 'mark' + (code === 'correct' ? ' ok' : ''), code === 'correct' ? '✓' : code === 'skipped' ? '–' : '✗')); li.appendChild(el('span', '', cg.explanations[i])); ul.appendChild(li); expl.push(li); });
        main.appendChild(ul);
      }
      const metric = n === 6 ? 'g6' : `g${n}`;
      const box = held(curveLine(main, metric, n === 6 ? res.score : score, cg.comparison)); curves.push(box);
      /* the signature: the dot travels from your guess to where you are, in the band's colour, on the count's curve; then the name pops */
      steps.push((ctl) => { if (!ctl.done) s.dot.classList.add('glide'); else s.dot.classList.add('still'); setP(s.dot, toP(n, score)); s.dot.style.background = bandColour(n, score); return gp === null ? M.base : M.slow; },
        stepPop(bn), stepIn([lines, gl]), stepIn(expl), settle, stepIn(box), stepDraw(box));
    }
    let locked = null;
    if (st.consent.status !== 'yes') locked = main.appendChild(held(el('p', 'fo-locked', C.shared.locked)));
    facts.appendChild(h(`<div class="fo-fact quiet"><b>${esc(C.shared.looked_at)}</b>${esc(cg.looked_at)}</div>`));
    facts.appendChild(h(`<div class="fo-fact"><b>${esc(C.shared.teaching)}</b>${esc(cg.dyk)}</div>`));
    facts.appendChild(h(`<div class="fo-fact"><b>${esc(C.shared.myth)}</b>${esc(cg.myth)}</div>`));
    facts.appendChild(h(`<p class="fo-fact quiet"><a href="../researchers/#game-${n}">${esc(C.shared.read_study)}</a></p>`));   /* the language's own researcher page, one folder up */
    [...facts.children].forEach((f) => held(f));
    w.appendChild(main); w.appendChild(facts);
    const on = held(onward(!!again)); w.appendChild(on);
    const roomBox = roomOf() ? held(roomReveal(main, on, g)) : null;
    if (n === 1 || n === 9) steps.push(stepDraw(main));
    steps.push(stepIn([locked, roomBox, ...facts.children]), (ctl) => { const t = stepIn(on)(ctl); return Math.max(t, on.play ? on.play(ctl) : 0); });
    show(w);
    sequence(steps, () => w.isConnected);
  }
  /* in a room (stage 2): one bin to the room when the game scores, the room's line under the result once the host
     has revealed, and the next game only when the host opens it */
  function roomReveal(main, on, g) {
    const rm = roomOf(); const R = C.room;
    const box = el('div', 'fo-card fo-roombox'); const line = el('p', 'fo-roomline', R.waiting_host); box.appendChild(line); main.appendChild(box);
    const next = on.querySelector('.onward-next'); const kicker = next && next.querySelector('.onward-kicker'), name = next && next.querySelector('.onward-name'), pitch = next && next.querySelector('.onward-pitch');
    const orig = next ? { href: next.getAttribute('href'), kicker: kicker.textContent, name: name.textContent, pitch: pitch.textContent } : null;
    const restore = () => { if (!next) return; next.classList.remove('held'); if (orig.href) next.href = orig.href; kicker.textContent = orig.kicker; name.textContent = orig.name; pitch.textContent = orig.pitch; };
    const hold = (text) => { if (!next) return; next.classList.add('held'); next.removeAttribute('href'); kicker.textContent = R.game_of.replace('{n}', String(n)); name.textContent = text; pitch.textContent = ''; };
    const release = (m) => { if (!next) return; if (next.classList.contains('held')) popOnce(next); next.classList.remove('held'); next.href = `../${SLUG[m]}/`; kicker.textContent = R.game_of.replace('{n}', String(m)); name.textContent = R.next_in_room.replace('{n}', String(m)).replace(' ▶', ''); pitch.textContent = C.games[m].start_line; };
    hold(R.waiting_host);   /* held from the first moment, before the room has even answered: nobody goes on without the host */
    const stop = roomWatch(rm.code, async (s) => {
      if (!s || s.step === 'ended') { line.textContent = R.player_ended; roomLeave(); restore(); stop(); return; }
      if (s.step === 'play' && s.game === n) await roomDone(n, g.result);
      line.textContent = roomPlayerLine(n, s);
      if (s.game === n && s.step === 'play') hold(R.waiting_host);
      else if (s.game && s.game !== n) release(s.game);   /* played already or not: the room's game is the next thing to open */
      else if (s.game === n && s.step === 'reveal') hold(R.waiting_next);
    });
    return box;
  }
  function dialName(k) { return U.dials[k]; }
  function dialWord(k, v) {
    const it = G[9].items.find((x) => String(x.n) === k);
    if (k === '5' || k === '9') return it.scale.split(' · ')[v - 1];
    if (k === '2' || k === '3') return tpl(U.step, { v });
    return ofN(v, 10);
  }
  function onward(again) {
    const done = doneGames().length; const nx = nextGame(n);
    const card = el('section', 'onward fo-onward');
    const top = el('div', 'onward-top'); top.appendChild(el('h2', '', nx ? tpl(U.n_done, { done }) : U.all_done));
    top.appendChild(h(`<span class="onward-count"><b>${9 - done}</b> ${esc(U.left)}</span>`)); card.appendChild(top);
    const pips = el('div', 'pips'); pips.setAttribute('aria-hidden', 'true'); for (const k of ORDER) pips.appendChild(el('i', isDone(k) ? 'on' : '')); card.appendChild(pips);
    const a = el('a', 'onward-next'); a.href = nx ? `../${SLUG[nx]}/` : '../portrait/';
    a.appendChild(h(`<span class="onward-text"><span class="onward-kicker">${esc(nx ? tpl(U.game_of_9, { n: nx }) : U.portrait_ready)}</span><span class="onward-name">${esc((nx ? C.shared.next_game : C.shared.see_portrait).replace(' ▶', ''))}</span><span class="onward-pitch">${esc(nx ? C.games[nx].start_line : C.home.start_lede.split('. ').slice(1).join('. '))}</span></span>`));
    a.appendChild(h('<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.6v12.8c0 .9 1 1.5 1.8 1L19 13c.8-.5.8-1.6 0-2.1L9.8 4.6c-.8-.5-1.8.1-1.8 1z" fill="currentColor"/></svg>'));
    card.appendChild(a);
    const all = el('a', 'onward-all'); all.href = '../';
    all.appendChild(h('<svg class="onward-dots" viewBox="0 0 34 12" aria-hidden="true"><circle cx="6" cy="6" r="5" fill="#2D4FC4"/><circle cx="17" cy="6" r="5" fill="#D5492F"/><circle cx="28" cy="6" r="5" fill="#0D7D73"/></svg>'));
    all.appendChild(el('span', 'onward-all-name', U.all_games));
    all.appendChild(h('<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7.5 4.5L13 10l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'));
    card.appendChild(all);
    /* a game just finished: its pip pops and the "left" number counts down by one as the card arrives */
    card.play = (ctl) => {
      if (again === undefined || again || !isDone(n)) return 0;
      const pip = pips.children[ORDER.indexOf(n)]; if (pip && !ctl.done) { pip.style.setProperty('--d', M.fast + 'ms'); pip.classList.add('fresh'); }
      const num = top.querySelector('.onward-count b');
      return count(9 - done + 1, 9 - done, (v) => { num.textContent = String(Math.round(v)); }, ctl);
    };
    return card;
  }

  /* the world's curve under a result: public, no ID; the country's after the yes */
  /* returns the box at once (the reveal's timeline holds it in place); box.ready settles when the world's numbers are in. A curve
     that arrives after its turn in the timeline draws on arrival; the pool lines that come later enter as they come */
  function curveLine(w, metric, value, template, anchor, quietWait) {
    const box = el('div', 'fo-curve' + (anchor ? ' inline' : ''));
    const svgWrap = el('div'); box.appendChild(svgWrap);
    const line = el('p', 'fo-curve-line', ''); box.appendChild(line);
    if (anchor) anchor.after(box); else w.appendChild(box);
    let ready; box.ready = new Promise((r) => { ready = r; });
    const late = () => !box.classList.contains('fo-hold');
    const extra = (e) => { if (late()) e.classList.add('fo-in'); box.appendChild(e); };
    (async () => {
    try {
      const r = await api('/curve?m=' + encodeURIComponent(metric));
      if (!r || !r.n || r.n < r.opens_at) { line.className = 'fo-curve-line fo-curve-wait'; line.textContent = quietWait ? '' : soFar(r ? r.n : 0, r ? r.opens_at : 30); }
      else { svgWrap.appendChild(curveSvg(r, value)); line.textContent = pctWord(template, pctOf(metric, r, value)); if (late()) requestAnimationFrame(() => box.querySelectorAll('.fo-drawing').forEach((p) => p.classList.add('go'))); }
      ready();
      if (pendingUpload) await pendingUpload;
      if (st.consent.status === 'yes' && st.uploaded.at) {
        const pools = [];
        if (st.country && st.country !== 'not said') pools.push({ pool: { country: st.country }, kind: 'country' });
        if (st.demographics && st.demographics.age) pools.push({ pool: { age: st.demographics.age }, kind: 'age' });
        for (const pl of pools) {
          try {
            const c = await api('/pool', { id: st.id, m: metric, pool: pl.pool });
            if (c && c.n >= c.opens_at) extra(el('p', 'fo-curve-line', forPool(pctWord(template, pctOf(metric, c, value)), pl.kind)));
            else if (c) extra(el('p', 'fo-curve-wait', `${poolName(pl.kind)}${COLON}${soFar(c.n, c.opens_at)}`));
          } catch (e) { /* the pools are extra; the world's line already stands */ }
        }
      }
    } catch (e) { line.className = 'fo-curve-line fo-curve-wait'; line.textContent = C.shared.curve_waiting; ready(); }
    })();
    return box;
  }
  function pctOf(metric, r, v) {
    if (metric === 'g9.7' || metric === 'g9.8' || metric === 'g9.5') return percentAbove(r, v);   /* a higher number, or a less interested code */
    if (metric === 'g9.9') return Math.round(100 * (r.bins[0] || 0) / r.n);                     /* said: the right direction */
    return percentBelow(r, v);
  }
  function percentBelow(r, v) { let below = 0, equal = 0; r.bins.forEach((c, i) => { const x = r.lo + i * r.step; if (x < v - r.step / 2) below += c; else if (Math.abs(x - v) <= r.step / 2) equal += c; }); return Math.round(100 * (below + equal / 2) / r.n); }
  function percentAbove(r, v) { let above = 0, equal = 0; r.bins.forEach((c, i) => { const x = r.lo + i * r.step; if (x > v + r.step / 2) above += c; else if (Math.abs(x - v) <= r.step / 2) equal += c; }); return Math.round(100 * (above + equal / 2) / r.n); }
  function curveSvg(r, v) {
    const W = 300, H = 72, pad = 8;
    const k = r.bins.length > 9 ? [1, 2, 3, 2, 1] : [1, 2, 1]; const half = (k.length - 1) / 2; const ks = k.reduce((x, y) => x + y, 0);
    const sm = r.bins.map((_, i, a) => k.reduce((acc, wgt, j) => acc + wgt * (a[i + j - half] || 0), 0) / ks);
    const top = Math.max(1e-9, ...sm);
    const pts = sm.map((c, i) => [pad + (i / (sm.length - 1)) * (W - 2 * pad), H - 6 - (c / top) * (H - 18)]);
    let d = `M${pts[0][0]},${H - 6} L${pts[0][0]},${pts[0][1].toFixed(1)} `;
    for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; const cx = ((x0 + x1) / 2).toFixed(1); d += `C${cx},${y0.toFixed(1)} ${cx},${y1.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)} `; }
    d += `L${pts[pts.length - 1][0]},${H - 6} Z`;
    const x = pad + ((v - r.lo) / ((r.bins.length - 1) * r.step)) * (W - 2 * pad);
    return h(`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${esc(tpl(U.where_you_stand, { n: fmt(r.n) }))}"><path class="fo-drawing" pathLength="100" d="${d}" fill="var(--tint)" stroke="var(--c)" stroke-width="2" stroke-linejoin="round"/><line x1="${x.toFixed(1)}" y1="4" x2="${x.toFixed(1)}" y2="${H - 4}" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/><circle cx="${x.toFixed(1)}" cy="8" r="5" fill="var(--c)"/></svg>`);
  }

  /* a finished game opens on its result (Khayyam, 23 Oct: no empty screen with a small button); a game not started, or left half-way, on its card.
     In a room, a game played before the room reached it can be played once more (#again, or the room card's button) */
  const rm = roomOf();
  if (rm && isDone(n) && !roomPlayed(n) && rm.state && rm.state.game === n && rm.state.step === 'play' && location.hash === '#again') { history.replaceState(null, '', location.pathname); show(againCard()); }
  else if (isDone(n)) reveal(st.games[n], true); else show(card());
}

const TRAITS = ['E', 'A', 'C', 'calm', 'O'];   /* the five bars of game 1, in the copy doc's order */
function poolName(kind) { const c = playerCountry(); return C.pools.names[kind].replace(/\[[^\]]+\]/, countryWord(c) || (LANG === 'it' ? 'dal tuo Paese' : LANG === 'tr' ? 'ülken' : LANG === 'es' ? 'de tu país' : LANG === 'pt' ? 'do seu país' : LANG === 'fr' ? 'de ton pays' : 'your country')); }
/* a comparison line for a pool: the world's word gives way to the pool's (English "the world" → "people from Italy"; Italian "del mondo" →
   "di chi viene dall'Italia"; Turkish "Dünya" → "Türkiye halkı") */
function poolSentence(kind) { const nm = C.pools.names_in ? C.pools.names_in[kind] : C.pools.names[kind]; const c = playerCountry(); return nm.replace(/\[[^\]]+\]/, countryWord(c) || ''); }
function forPool(line, kind) { return kind === 'world' ? line : line.replace(U.world_token, poolSentence(kind)); }
function soFar(n, m) { return tpl(U.so_far, { n: fmt(n), m }); }
function reminderDate() {
  const st = load(); const t = st.games[9] && st.games[9].finished ? st.games[9].finished : Date.now();
  const d = new Date(t); d.setMonth(d.getMonth() + 3); return d;
}
function shortDate(d) { return d.toLocaleDateString(L.locale, { day: 'numeric', month: 'long' }); }
function longDate(d) { return d.toLocaleDateString(L.locale, { day: 'numeric', month: 'long', year: 'numeric' }); }
function icsFor(d) {
  const z = (n) => String(n).padStart(2, '0'); const day = `${d.getFullYear()}${z(d.getMonth() + 1)}${z(d.getDate())}`;
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Logicers//Find out//EN', 'BEGIN:VEVENT', `UID:findout-${day}@logicers.com`, `DTSTAMP:${day}T090000Z`, `DTSTART;VALUE=DATE:${day}`, 'SUMMARY:' + U.ics_summary, 'URL:' + SITE, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
}
/* the friend link carries band indices and rounded bars only: nothing personal, nothing to look up */
function friendCode() {
  const st = load(); const bands = [2, 3, 4, 5, 6, 7, 8].map((n) => { const r = st.games[n] && st.games[n].result; const v = r && r.scored ? mainScore(n, r) : null; return v === null ? 'x' : String(bandIndex(n, v)); }).join('');
  const r1 = st.games[1] && st.games[1].result && st.games[1].result.scored ? st.games[1].result : null;
  const bars = r1 ? ['E', 'A', 'C', 'N', 'O'].map((t) => (r1.traits[t] === null ? 'x' : Math.round(r1.traits[t] * 10))).join(',') : '';
  return `b=${bands}&p=${bars}`;
}
function parseFriend(hash) {
  const q = new URLSearchParams(hash.replace(/^#/, '')); const b = q.get('b') || ''; const p = (q.get('p') || '').split(',');
  if (!/^[012x]{7}$/.test(b)) return null;
  const bands = {}; [2, 3, 4, 5, 6, 7, 8].forEach((n, i) => { bands[n] = b[i] === 'x' ? null : Number(b[i]); });
  const bars = {}; ['E', 'A', 'C', 'N', 'O'].forEach((t, i) => { const v = Number(p[i]); bars[t] = p[i] === undefined || p[i] === 'x' || !isFinite(v) ? null : Math.min(5, Math.max(1, v / 10)); });
  return { bands, bars };
}

/* ------------------------------------------------------------------ upload ------ */
function batch() {
  const st = load();
  const games = [];
  for (const n of ORDER) {
    const plays = ((st.plays && st.plays[n]) || []).concat(st.games[n] && st.games[n].result ? [st.games[n]] : []);   /* the first play and any room replays, each under its wave */
    for (const g of plays) {
    if (!g || !g.result) continue;
    const answers = [];
    for (const k of g.order) answers.push({ item: `${n}:${k}`, v: g.v || ITEM_VERSION, value: k in g.answers ? g.answers[k] : null, skipped: !(k in g.answers) || g.answers[k] === null, ms: g.times[k] ?? null, pos: g.positions[k] ?? null, opts: g.option_order && g.option_order[k] ? g.option_order[k] : null });
    games.push({ game: n, wave: waveOf(n, g), answers, guess: g.guess, started: g.started, finished: g.finished, duration_ms: g.duration_ms, order_index: st.done_order.indexOf(n), result: g.result, rules_version: g.rules_version, seen_before: g.seen_before === undefined ? null : g.seen_before });
    }
  }
  return {
    id: st.id, trial: TRIAL, consent: st.consent, room: st.room && st.room.tag ? st.room.tag : undefined,   /* the room tag, when this phone played in a room (stage 2) */
    player: { created: st.created, country: st.country || 'not said', header_country: st.header_country || null, lang: navigator.language || null, referral: referral(), device: /Mobi|Android/i.test(navigator.userAgent) ? 'phone' : 'computer' },
    games,
  };
}
function referral() {
  try { const r = document.referrer; if (!r) return 'direct'; const hst = new URL(r).hostname; if (/logicers\.com$/.test(hst) || hst === location.hostname) return 'site'; if (/reddit/.test(hst)) return 'reddit'; if (/google|bing|duckduckgo|yahoo|ecosia/.test(hst)) return 'search'; return 'other'; } catch (e) { return 'direct'; }
}
let turnstileToken = null;
async function turnstile() {
  if (!TURNSTILE_SITE_KEY) return null;
  if (turnstileToken) return turnstileToken;
  await new Promise((res, rej) => { if (window.turnstile) return res(); const s = document.createElement('script'); s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  return new Promise((res) => {
    const holder = document.createElement('div'); holder.style.position = 'fixed'; holder.style.left = '-9999px'; document.body.appendChild(holder);
    window.turnstile.render(holder, { sitekey: TURNSTILE_SITE_KEY, size: 'invisible', callback: (t) => { turnstileToken = t; res(t); }, 'error-callback': () => res(null) });
    setTimeout(() => res(null), 12000);
  });
}
async function upload() {
  const st = load();
  const token = await turnstile();
  const b = batch(); b.token = token;
  const r = await api('/upload', b, { timeout: 15000 });
  turnstileToken = null;
  st.uploaded = { at: new Date().toISOString(), games: b.games.map((g) => g.game) };
  if (r && r.code) st.code = r.code;
  save();
  return r;
}
let pendingUpload = null;
function uploadLater() { pendingUpload = upload().catch(() => {}).then(() => { pendingUpload = null; }); return pendingUpload; }

/* ------------------------------------------------------------------ the section's home ------ */
function homePage() {
  const root = document.getElementById('fo'); const st = load();
  hello();
  const w = el('section', 'fo-screen');
  const done = doneGames().length;
  w.appendChild(el('h1', 'fo-title', C.home.start_title));
  if (roomOf()) { const rc = roomJoinCard(); w.appendChild(rc); roomWatch(roomOf().code, (s) => rc.update(s)); }
  w.appendChild(el('p', 'fo-lede', C.home.start_lede));
  if (done === 0) w.appendChild(el('p', 'fo-once', C.shared.once_line));
  w.appendChild(circles(null, ''));
  const seenBefore = seenMarks();
  if (done > 0 && done < 9) { const pl = w.appendChild(el('p', 'fo-count', progressLine(done))); const was = seenBefore.filter((k) => isDone(k)).length; if (was < done) { const m = minutesLeft(); countIn(pl, (m === 1 ? U.progress_line_1 : U.progress_line).replace('{m}', String(m)), 'done', done, was); } }   /* "3 of 9" ticks up from the last visit's number */
  const found = el('p', 'fo-count fo-found', ''); w.appendChild(found);
  /* the counter counts up from 0 the first time it shows (its line keeps its height before the number arrives) */
  api('/counter').then((r) => { if (r && r.played >= 1) { found.classList.add('fo-faded'); countIn(found, C.home.found_out, 'n', r.played, 0); } }).catch(() => {});
  const acts = el('div', 'fo-actions');
  const nx = nextGame(null);
  const start = el('a', 'btn solid', done === 0 ? C.home['Start button'] : nx ? C.home['Returning player, nothing done yet'] : C.shared.see_portrait);
  start.href = nx ? `${SLUG[nx]}/` : 'portrait/';
  acts.appendChild(start); w.appendChild(acts);
  let consent = null;
  if (done >= 2 && st.consent.status === null) consent = w.appendChild(held(consentCard(() => { homePage(); }, { imgBase: UP + '../' })));
  w.appendChild(el('h2', 'fo-card-h', C.home['Pick-any-game list heading'])).style.cssText = 'margin-top:22px;font-family:var(--display);font-weight:800;font-size:1.2rem;letter-spacing:-0.02em';
  const ul = el('ul', 'fo-list');
  for (const n of ORDER) {
    const g = st.games[n]; const res = g && g.result && g.result.scored !== false ? g.result : null;
    const a = el(roomAllows(n) ? 'a' : 'span', roomAllows(n) ? '' : 'shut'); if (roomAllows(n)) a.href = `${SLUG[n]}/`;
    a.appendChild(el('span', 'n' + (res ? ' done' : ''), res ? '✓' : n));
    const t = el('span', 't'); t.appendChild(el('b', '', C.games[n].name)); t.appendChild(el('span', '', C.games[n].start_line)); a.appendChild(t);
    if (res) a.appendChild(el('span', 'band', n === 1 ? U.five_bars : n === 9 ? U.done : bandName(n, mainScore(n, res))));
    else if (!roomAllows(n)) a.appendChild(el('span', 'band', C.room.not_yet));
    ul.appendChild(el('li')).appendChild(a);
  }
  w.appendChild(ul);
  /* the room (stage 2): a card for hosts, teachers, a group with a big screen */
  if (!roomOf()) { const rc = el('a', 'fo-card fo-roomcard'); rc.href = 'room/'; rc.appendChild(el('b', '', C.room.tile_title)); rc.appendChild(el('p', 'fo-quiet', C.room.tile_line)); rc.appendChild(el('span', 'chip', C.room.host)); w.appendChild(rc); }
  if (st.consent.status !== 'yes') w.appendChild(codeEntry());
  const foot = el('p', 'fo-foot');
  foot.appendChild(h(`<span>${esc(C.small_print[0].text)} <a href="researchers/">${esc(C.small_print[0].link)}</a></span>`));
  foot.appendChild(document.createElement('br'));
  foot.appendChild(h(`<span>${esc(C.small_print[1].text)} <a href="#" data-open="dlg-how">${esc(C.small_print[1].link)}</a></span>`));
  w.appendChild(foot);
  howSheet();
  root.textContent = ''; root.appendChild(w); wireDialogs(w);
  /* a game finished since the last visit: its marks pop, once; the consent card comes up last */
  const fresh = ORDER.filter((k) => isDone(k) && !seenBefore.includes(k));
  if (fresh.length && !reduced()) fresh.forEach((k, i) => { const d = (M.base + i * M.step) + 'ms'; const c = w.querySelector(`.fo-circles > :nth-child(${ORDER.indexOf(k) + 1})`), m = ul.children[ORDER.indexOf(k)] && ul.children[ORDER.indexOf(k)].querySelector('.n'); for (const x of [c, m]) if (x) { x.style.setProperty('--d', d); x.classList.add('fresh'); } });
  seenMarks(ORDER.filter((k) => isDone(k)));
  sequence([M.base, stepIn(consent, { far: true })], () => w.isConnected, { keepOnScroll: true });
}
/* which finished games the home has already shown (so a mark pops only once); not part of the research store */
function seenMarks(list) {
  const KEY = 'lg.findout.marks';
  try { if (list) { localStorage.setItem(KEY, JSON.stringify(list)); return list; } const v = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(v) ? v : []; } catch (e) { return list || ORDER; }
}

/* ------------------------------------------------------------------ consent ------ */
function consentCard(a, b) {
  const onDone = typeof a === 'function' ? a : b; const opts = typeof a === 'function' ? b : a;
  const st = load(); const cc = C.consent;
  const w = el('section', 'fo-consent');
  const top = el('div', 'fo-consent-top');
  const img = el('img'); img.src = (opts && opts.imgBase ? opts.imgBase : '../') + 'assets/img/khayyam.jpg'; img.alt = U.khayyam; top.appendChild(img);
  top.appendChild(el('p', '', cc.text)); w.appendChild(top);
  const acts = el('div', 'fo-actions');
  const yes = el('button', 'btn solid', cc.yes); yes.type = 'button';
  const no = el('button', 'btn ghost', cc.no); no.type = 'button';
  acts.appendChild(no); acts.appendChild(yes); w.appendChild(acts);        /* yes on the right, under the thumb (K, 22 Oct) */
  const status = el('p', 'fo-status', ''); w.appendChild(status);
  const cnt = el('p', 'fo-consent-counter', ''); w.appendChild(cnt);
  api('/counter').then((r) => { if (r && r.yes >= 10) cnt.textContent = cc.counter.replace('{n}', fmt(r.yes)).replace('{c}', fmt(r.countries)); }).catch(() => {});
  const helpB = el('button', 'fo-help-btn fo-consent-help', U.what_kept); helpB.type = 'button'; helpB.dataset.open = 'dlg-consent'; w.appendChild(helpB);
  sheet('dlg-consent', U.what_yes_means, cc.help.map((l) => `<p>${esc(l)}</p>`).join(''));
  yes.addEventListener('click', async () => {
    yes.disabled = true; no.disabled = true; status.textContent = U.sending;
    st.consent = { status: 'yes', version: cc.version, at: new Date().toISOString() }; save();
    try { await upload(); counter('yes'); status.className = 'fo-status ok'; status.textContent = C.portrait.sent; onDone('yes'); }
    catch (e) {
      st.consent = { status: null, version: null, at: null }; save();
      status.textContent = C.portrait.send_failed; yes.disabled = false; no.disabled = false; yes.textContent = C.portrait.try_again;
    }
  });
  no.addEventListener('click', () => { st.consent = { status: 'no', version: cc.version, at: new Date().toISOString() }; save(); counter('no'); onDone('no'); });
  wireDialogs(w);
  return w;
}

/* ------------------------------------------------------------------ demographics: four doors ------ */
function demographics(onDone) {
  const st = load(); const d = C.demographics; const P = C.portrait;
  const w = el('section', 'fo-screen fo-demo fo-doors');
  w.appendChild(el('h2', '', d.heading));
  const picked = Object.assign({}, st.demographics || {});
  const count = el('p', 'fo-unlocked', '');
  const unlocksOf = { age: C.pools.names.age, gender: C.pools.names.gender, education: C.pools.names.education, settlement: C.pools.names.settlement };
  const doors = [];
  const refresh = () => { const k = d.fields.filter((f) => picked[f.key] !== undefined).length; count.textContent = P.unlocked.replace('{k}', String(k)); go.textContent = k === 0 ? C.shared.skip : U.done; };   /* a way past the doors even when none is opened */
  for (const f of d.fields) {
    const door = el('div', 'fo-door' + (picked[f.key] !== undefined ? ' open done' : ''));
    const front = el('button', 'fo-door-front'); front.type = 'button';
    front.appendChild(el('b', '', f.label)); front.appendChild(el('span', 'fo-door-unlock', '→ ' + unlocksOf[f.key]));
    front.appendChild(el('span', 'fo-door-open', P.open));
    door.appendChild(front);
    const inside = el('div', 'fo-door-inside');
    inside.appendChild(el('p', 'why', f.why));
    const row = el('div', 'fo-chips');
    f.options.concat([null]).forEach((o, i) => {
      const shown = o === null ? C.shared.skip : (f.labels && f.labels[i]) || o;
      const b = el('button', 'chip' + (picked[f.key] === o ? ' on' : ''), shown); b.type = 'button';
      b.addEventListener('click', () => { row.querySelectorAll('.chip').forEach((x) => x.classList.remove('on')); b.classList.add('on'); picked[f.key] = o; door.classList.add('done'); front.querySelector('.fo-door-open').textContent = o === null ? '–' : '✓'; refresh(); });
      row.appendChild(b);
    });
    inside.appendChild(row); door.appendChild(inside);
    front.addEventListener('click', () => { doors.forEach((x) => { if (x !== door) x.classList.remove('open'); }); door.classList.toggle('open'); });
    doors.push(door); w.appendChild(door);
  }
  w.appendChild(count);
  const acts = el('div', 'fo-actions');
  const go = el('button', 'btn solid', C.shared.skip); go.type = 'button';
  const status = el('p', 'fo-status', '');
  go.addEventListener('click', async () => {
    st.demographics = picked; save(); go.disabled = true;
    try { await api('/demographics', { id: st.id, demographics: picked }); status.className = 'fo-status ok'; status.textContent = d.done; setTimeout(() => onDone(), 700); }
    catch (e) { status.textContent = C.portrait.send_failed; go.disabled = false; go.textContent = C.portrait.try_again; }
  });
  acts.appendChild(go); w.appendChild(acts); w.appendChild(status);
  refresh();
  return w;
}

/* ------------------------------------------------------------------ the portrait ------ */
const TRAIT_HIGH = 4, TRAIT_LOW = 2;      /* on the 1-5 bars, until the world's thirds replace them (B2) */
function portraitLines() {
  const st = load(); const g = (n) => st.games[n] && st.games[n].result && st.games[n].result.scored !== false ? st.games[n].result : null;
  const band = (n) => { const r = g(n); return r ? bandIndex(n, mainScore(n, r)) : null; };   /* 0, 1, 2: the same in every language */
  const t = g(1) ? g(1).traits : null; const calm = g(1) ? g(1).calm : null;
  const dial = (k) => g(9) ? g(9).items[k] : null;
  const edu = st.demographics && st.demographics.education;   /* the English value, whatever the language shown */
  const cond = {
    P1: () => t && t.C !== null && t.C >= TRAIT_HIGH,
    P2: () => t && t.C !== null && t.C >= TRAIT_HIGH && edu === 'Still studying',
    P3: () => t && ((t.O !== null && t.O >= TRAIT_HIGH) || (t.E !== null && t.E >= TRAIT_HIGH)),
    P4: () => calm !== null && calm >= TRAIT_HIGH,
    P5: () => (t && t.A !== null && t.A >= TRAIT_HIGH) || (dial('4') !== null && dial('4') >= 7),
    P6: () => t && t.E !== null && t.E <= TRAIT_LOW,
    P7: () => band(3) === 2, P8: () => band(3) === 2, P9: () => band(3) === 0,
    P10: () => band(6) === 2, P11: () => band(6) === 2, P12: () => band(6) === 0,
    P13: () => band(5) === 0, P14: () => band(5) === 2, P15: () => band(5) === 2,
    P16: () => band(2) === 2, P17: () => band(2) === 2 && band(5) === 2,
    P18: () => band(2) === 0,
    P19: () => band(4) === 2, P20: () => band(4) === 0,
    P21: () => dial('1') !== null && dial('1') >= 7, P22: () => dial('1') !== null && dial('1') <= 3,
    P23: () => band(8) === 2, P24: () => band(8) === 0,
    P25: () => band(7) === 2,
    P26: () => true,
  };
  const gameOf = { P1: 1, P2: 1, P3: 1, P4: 1, P5: 1, P6: 1, P7: 3, P8: 3, P9: 3, P10: 6, P11: 6, P12: 6, P13: 5, P14: 5, P15: 5, P16: 2, P17: 2, P18: 2, P19: 4, P20: 4, P21: 9, P22: 9, P23: 8, P24: 8, P25: 7, P26: 0 };
  const out = []; const usedSource = new Set(); const usedGame = new Set();
  const rules = PORTRAIT.rules.slice();
  /* the ones about the player's answers first, the general one (P26) last; a stable shuffle inside, so two players with the same pattern see different picks */
  const seed = parseInt(st.id.slice(0, 8), 16); const ordered = rules.map((r, i) => ({ r, k: (seed * 9301 + i * 49297) % 233280 })).sort((a, b) => a.k - b.k).map((x) => x.r).sort((a, b) => (a.id === 'P26') - (b.id === 'P26'));
  for (const r of ordered) {
    if (out.length >= 6) break;
    const f = cond[r.id]; if (!f) continue;
    let ok = false; try { ok = !!f(); } catch (e) { ok = false; }
    if (!ok) continue;
    const src = r.sources.join('|'); const gm = gameOf[r.id];
    if (usedSource.has(src) || (gm && usedGame.has(gm))) continue;
    usedSource.add(src); if (gm) usedGame.add(gm); out.push(r);
  }
  return out.slice(0, Math.max(4, Math.min(6, out.length)));
}
function ownLines() {
  const st = load(); const lines = [];
  let right = 0, total = 0;
  for (const n of [1, 2, 3, 4, 5, 6, 7, 8]) {
    const g = st.games[n]; if (!g || !g.result || g.result.scored === false || !g.guess) continue;
    const res = g.result; total++;
    if (n === 1) { if (res.traits.E !== null && Math.abs(res.traits.E - g.guess.value) <= 0.5) right++; }
    else if (n === 6) { if (g.guess.value === 4 - res.score) right++; }
    else if (bandName(n, g.guess.value) === bandName(n, mainScore(n, res))) right++;
  }
  if (total >= 4) lines.push(right >= total - 1 ? tpl(U.guess_well, { right, total }) : right <= total / 2 ? tpl(U.guess_surprised, { n: total - right, total }) : tpl(U.guess_right, { right, total }));
  let fastest = null;
  for (const n of ORDER) { const g = st.games[n]; if (g && g.result && g.result.scored !== false && g.duration_ms) { const s = Math.round(g.duration_ms / 1000); if (!fastest || s < fastest.s) fastest = { n, s }; } }
  if (fastest) lines.push(tpl(U.fastest, { name: C.games[fastest.n].name, s: fastest.s }));
  const g9 = st.games[9] && st.games[9].result ? st.games[9].result.items : null; const g3 = st.games[3] && st.games[3].result && st.games[3].result.scored ? st.games[3].result : null;
  if (g9 && ((g9['2'] !== null && g9['2'] >= 7 && g9['9'] === 2) || (g3 && bandIndex(3, g3.score) === 2 && g9['6'] !== null && g9['6'] <= 4))) lines.push(U.sunny);
  const g7 = st.games[7] && st.games[7].result && st.games[7].result.scored ? st.games[7].result : null;
  if (g9 && g7 && g9['4'] !== null) {
    if (g9['4'] >= 7 && bandIndex(7, g7.score) === 0) lines.push(U.trust_people);
    if (g9['4'] <= 3 && bandIndex(7, g7.score) === 2) lines.push(U.trust_institutions);
  }
  return lines;
}
/* ---- band colours: three hues of equal weight, left to right; games 1 and 9 use the section's green ---- */
const BAND_COLOURS = ['var(--band0)', 'var(--band1)', 'var(--band2)'];
function bandColour(n, v) { const i = bandIndex(n, v); return i === null ? 'var(--c)' : BAND_COLOURS[i]; }

/* ---- the figure: one abstract face built from the five bars, the five band dots around it ---- */
function figureSvg(r1, bandsOf, opts) {
  const t = r1 ? r1.traits : { E: null, A: null, C: null, N: null, O: null };
  const v = (k, d) => (t[k] === null || t[k] === undefined ? d : (t[k] - 1) / 4);     /* 0..1 */
  const E = v('E', .5), A = v('A', .5), Cc = v('C', .5), N = r1 && r1.calm !== null ? (r1.calm - 1) / 4 : .5, O = v('O', .5);
  const size = 120, cx = 150, cy = 150;
  const rx = 60 + E * 30, ry = 70 + (1 - Cc) * 10 + 10;                  /* outgoing: wider; organised: neater (rounder) */
  const rays = Math.round(4 + O * 10);                                      /* curious: more rays */
  const mouth = 8 + A * 26;                                                 /* warm: bigger smile */
  const tilt = (0.5 - N) * 14;                                              /* calm: steady; otherwise a tilt */
  let rayPaths = '';
  for (let i = 0; i < rays; i++) { const a = (i / rays) * Math.PI * 2 - Math.PI / 2; const r0 = Math.max(rx, ry) + 10, r1b = r0 + 16 + O * 10; rayPaths += `<line x1="${(cx + Math.cos(a) * r0).toFixed(1)}" y1="${(cy + Math.sin(a) * r0).toFixed(1)}" x2="${(cx + Math.cos(a) * r1b).toFixed(1)}" y2="${(cy + Math.sin(a) * r1b).toFixed(1)}" stroke="var(--c)" stroke-width="6" stroke-linecap="round" opacity=".7"/>`; }
  const eyeY = cy - 14, eyeDx = 22 + E * 8;
  let dots = '';
  const order = [2, 5, 7, 4, 8];
  order.forEach((n, i) => { const b = bandsOf(n); if (b === null) return; const a = -Math.PI / 2 + (i / order.length) * Math.PI * 2; const R = 135; const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R; dots += `<circle class="fo-fig-dot" style="--k:${i}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11" fill="${BAND_COLOURS[b]}" stroke="var(--card)" stroke-width="3"><title>${esc(C.games[n].name)}${COLON}${esc(C.games[n].bands[b].name)}</title></circle>`; });
  return h(`<svg class="fo-figure${opts && opts.animate ? ' draw' : ''}" viewBox="0 0 300 300" role="img" aria-label="${esc(U.figure_aria)}">
    <g class="rays">${rayPaths}</g>
    <g transform="rotate(${tilt.toFixed(1)} ${cx} ${cy})">
      <ellipse cx="${cx}" cy="${cy}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="var(--c)"/>
      <circle cx="${(cx - eyeDx).toFixed(1)}" cy="${eyeY}" r="7" fill="var(--card)"/><circle cx="${(cx + eyeDx).toFixed(1)}" cy="${eyeY}" r="7" fill="var(--card)"/>
      <path d="M${(cx - mouth).toFixed(1)} ${cy + 22} Q${cx} ${cy + 22 + mouth * 0.9} ${(cx + mouth).toFixed(1)} ${cy + 22}" fill="none" stroke="var(--card)" stroke-width="6" stroke-linecap="round"/>
    </g>
    <g class="dots">${dots}</g>
  </svg>`);
}

/* ---- the one sentence under the figure: the world first, then every group the player unlocked, in turn ---- */
async function rewritingLine(where) {
  const st = load();
  let n = null, v = null;
  for (const k of [3, 2, 5, 7, 8, 4, 6]) { const r = st.games[k] && st.games[k].result; if (r && r.scored) { n = k; v = k === 6 ? r.score : mainScore(k, r); break; } }
  if (n === null) return;
  const line = el('p', 'fo-rewrite', ''); where.appendChild(line);
  const metric = 'g' + n; const tpl = C.games[n].comparison;   /* shadows the template helper on purpose: a plain string here */
  const pct = (c) => { let below = 0, equal = 0; c.bins.forEach((cnt, i) => { const x = c.lo + i * c.step; if (x < v - c.step / 2) below += cnt; else if (Math.abs(x - v) <= c.step / 2) equal += cnt; }); return Math.round(100 * (below + equal / 2) / c.n); };
  const lines = [];
  try { const w = await api('/curve?m=' + metric); if (w && w.n >= w.opens_at) lines.push(pctWord(tpl, pct(w))); } catch (e) {}
  if (st.consent.status === 'yes' && st.uploaded.at) {
    const pools = [];
    if (st.country && st.country !== 'not said') pools.push([{ country: st.country }, 'country']);
    for (const k of ['age', 'gender', 'education', 'settlement']) if (st.demographics && st.demographics[k]) pools.push([{ [k]: st.demographics[k] }, k]);
    for (const [pool, kind] of pools) { try { const c = await api('/pool', { id: st.id, m: metric, pool }); if (c && c.n >= c.opens_at) lines.push(forPool(pctWord(tpl, pct(c)), kind)); } catch (e) {} }
  }
  if (!lines.length) { line.remove(); return; }
  let i = 0;
  const show = () => { line.classList.remove('in'); void line.offsetWidth; line.textContent = lines[i % lines.length]; line.classList.add('in'); i++; };
  show();
  if (lines.length > 1 && !reduced()) setInterval(show, 3200);
}

/* ---- the cards: one word in front, the line behind ---- */
const CARD_WORD = U.card_word;   /* one word per card front, in the language */
const CARD_ICON = { P1: 'star', P2: 'star', P3: 'bulb', P4: 'leaf', P5: 'heart', P6: 'heart', P7: 'people', P8: 'arrows', P9: 'leaf', P10: 'bulb', P11: 'coin', P12: 'people', P13: 'arrows', P14: 'shield', P15: 'people', P16: 'arrows', P17: 'bulb', P18: 'shield', P19: 'people', P20: 'arrows', P21: 'star', P22: 'people', P23: 'flag', P24: 'people', P25: 'heart', P26: 'heart' };
const ICONS = {
  star: '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/>',
  bulb: '<path d="M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2zM9 20h6v1.5H9z"/>',
  leaf: '<path d="M20 4c-9 0-15 5-15 13 0 1 .1 2 .4 3C9 14 13 11 20 4zM5.4 20C9 17 13 13 20 4c0 9-5 15-13 15-.6 0-1.1 0-1.6-.1z"/>',
  heart: '<path d="M12 21s-7.5-4.6-9.5-9.3C1.2 8.4 3.3 5 6.7 5c2 0 3.5 1 4.3 2.4C12 6 13.5 5 15.5 5c3.4 0 5.5 3.4 4.2 6.7C19.5 16.4 12 21 12 21z"/>',
  people: '<circle cx="8" cy="8" r="3.5"/><circle cx="16.5" cy="9" r="3"/><path d="M2.5 19c0-3.5 2.5-5.5 5.5-5.5s5.5 2 5.5 5.5zM13 19c.2-2.5 1.5-4.2 3.5-4.5 2.5 0 4.5 1.8 4.5 4.5z"/>',
  arrows: '<path d="M4 8h11l-3-3 1.5-1.5L19 9l-5.5 5.5L12 13l3-3H4zM20 16H9l3 3-1.5 1.5L5 15l5.5-5.5L12 11l-3 3h11z"/>',
  coin: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5" fill="var(--card)"/>',
  shield: '<path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/>',
  flag: '<path d="M5 2h2v20H5zM7 3h11l-3 4 3 4H7z"/>',
};
function iconSvg(name) { return h(`<svg class="fo-card-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${ICONS[name] || ICONS.star}</svg>`); }
const TURN_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.5"/><path d="M20 4v4.5h-4.5"/><path d="M20 12a8 8 0 0 1-13.7 5.7L4 15.5"/><path d="M4 20v-4.5h4.5"/></svg>';
function cardHint(text) { const sp = el('span', 'fo-card-hint'); sp.appendChild(h(TURN_ICON)); sp.appendChild(document.createTextNode(text)); return sp; }
function flipCard(front, backLine, backSource, extraClass) {
  /* a card that turns over: the word in front with "Tap to open", the line and its source behind with "Tap to close" (Khayyam, 22 Oct: it must be obvious that the cards open) */
  const P = C.portrait;
  const card = el('button', 'fo-flip' + (extraClass ? ' ' + extraClass : '')); card.type = 'button'; card.setAttribute('aria-expanded', 'false');
  const inner = el('div', 'fo-flip-inner');
  const f = el('div', 'fo-flip-front'); f.appendChild(front);
  if (extraClass !== 'secret') front.appendChild(cardHint(P.tap_open));
  const b = el('div', 'fo-flip-back'); b.appendChild(el('p', '', backLine)); if (backSource) b.appendChild(el('small', '', backSource)); b.appendChild(cardHint(P.tap_close));
  inner.appendChild(f); inner.appendChild(b); card.appendChild(inner);
  card.addEventListener('click', () => { card.classList.remove('peek'); const on = card.classList.toggle('on'); card.setAttribute('aria-expanded', on ? 'true' : 'false'); });
  return card;
}
/* the first card shows how: it turns over by itself for a moment, then back, once per phone */
function peekCard(card) {
  if (!card || reduced()) return;
  const st = load(); if (st.cards_shown) return; st.cards_shown = true; save();
  setTimeout(() => { if (card.classList.contains('on')) return; card.classList.add('peek'); setTimeout(() => card.classList.remove('peek'), 1800); }, 1400);
}

/* ---- the dial: how well the player guessed themself ---- */
function guessDial() {
  const st = load(); let right = 0, total = 0;
  for (const n of [1, 2, 3, 4, 5, 6, 7, 8]) {
    const g = st.games[n]; if (!g || !g.result || g.result.scored === false || !g.guess) continue; const res = g.result; total++;
    if (n === 1) { if (res.traits.E !== null && Math.abs(res.traits.E - g.guess.value) <= 0.5) right++; }
    else if (n === 6) { if (g.guess.value === 4 - res.score) right++; }
    else if (bandName(n, g.guess.value) === bandName(n, mainScore(n, res))) right++;
  }
  if (!total) return null;
  const p = right / total; const a = Math.PI * (1 - p);
  const x = (100 + Math.cos(a) * 80).toFixed(1), y = (100 - Math.sin(a) * 80).toFixed(1);
  const w = el('div', 'fo-dial');
  w.appendChild(h(`<svg viewBox="0 0 200 110" role="img" aria-label="${esc(C.portrait.dial)}${COLON}${esc(ofN(right, total))}"><path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="var(--tint)" stroke-width="16" stroke-linecap="round"/><path class="fo-dial-arc" d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="var(--c)" stroke-width="16" stroke-linecap="round" pathLength="100" stroke-dasharray="${(p * 100).toFixed(1)} 100"/><line class="fo-dial-needle" x1="100" y1="100" x2="${x}" y2="${y}" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="100" r="7" fill="var(--ink)"/><text x="100" y="92" text-anchor="middle" font-size="26" font-weight="800" fill="var(--ink)" font-family="Bricolage Grotesque, system-ui">${esc(ofN(right, total))}</text></svg>`));
  w.appendChild(el('p', 'fo-quiet', C.portrait.dial));
  /* count: the number ticks from 0 while the arc draws and the needle swings to it, one curve (5 Nov 2026) */
  const svg = w.querySelector('svg'), arc = svg.querySelector('.fo-dial-arc'), needle = svg.querySelector('.fo-dial-needle'), txt = svg.querySelector('text');
  const paint = (k) => { arc.style.setProperty('--off', String(p * 100 * (1 - k))); needle.style.setProperty('--turn', (-180 * p * (1 - k)) + 'deg'); txt.textContent = ofN(Math.round(right * k), total); };
  w.play = (ctl) => count(0, 1, (k) => paint(k), ctl);   /* until it plays it stands at its final value (and out of sight) */
  return w;
}

/* a long page that draws itself part by part: each part's timeline starts when the part comes into view, one after another; a
   part that was scrolled past before its turn lands at once, and a part still playing out of sight finishes when a new one comes
   into view, so scrolling never waits */
function playParts(parts, alive) {
  let running = null; const seen = new Set();
  const pump = () => {
    if (running || (alive && !alive())) return;
    const next = parts.find((x) => x.state === 'wait' && seen.has(x.sec));
    if (!next) return;
    for (const x of parts) { if (x === next) break; if (x.state === 'wait') { x.state = 'done'; sequence(x.steps, null, { now: true }); } }
    next.state = 'run'; running = sequence(next.steps, alive, { keepOnScroll: true }); running.part = next;
    running.run.then(() => { next.state = 'done'; running = null; pump(); });
  };
  if (reduced() || !('IntersectionObserver' in window)) { parts.forEach((x) => { x.state = 'done'; sequence(x.steps, null, { now: reduced() }); }); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) { if (e.isIntersecting) seen.add(e.target); else seen.delete(e.target); }
    if (running && !seen.has(running.part.sec) && parts.some((x) => x.state === 'wait' && seen.has(x.sec))) running.finish();
    pump();
    if (parts.every((x) => x.state !== 'wait')) io.disconnect();
  }, { rootMargin: '0px 0px -10% 0px' });
  parts.forEach((x) => io.observe(x.sec));
}

/* ------------------------------------------------------------------ the portrait ------ */
function portraitPage() {
  const root = document.getElementById('fo'); const st = load(); const P = C.portrait;
  const done = doneGames();
  howSheet();
  if (done.length < 9) {
    const w = el('section', 'fo-screen fo-portrait');
    w.appendChild(el('h1', 'fo-title', P.title));
    w.appendChild(el('p', 'fo-lede', `${progressLine(done.length)}. ${U.portrait_opens}`));
    w.appendChild(circles(null));
    const acts = el('div', 'fo-actions'); const nx = nextGame(null); const a = el('a', 'btn solid', C.shared.next_game); a.href = `../${SLUG[nx]}/`; acts.appendChild(a); w.appendChild(acts);
    root.textContent = ''; root.appendChild(w); wireDialogs(w); return;
  }
  counter('portrait');
  const r1 = st.games[1].result; const bandsOf = (n) => { const r = st.games[n] && st.games[n].result; return r && r.scored ? bandIndex(n, mainScore(n, r)) : null; };
  const w = el('div', 'fo-stories');
  const story = (cls) => { const s = el('section', 'fo-story' + (cls ? ' ' + cls : '')); w.appendChild(s); return s; };

  /* 1. the figure */
  const s1 = story('fo-story-figure');
  s1.appendChild(el('h1', 'fo-title', P.title));
  const fig = s1.appendChild(figureSvg(r1, bandsOf, { animate: true }));
  const legend = held(el('div', 'fo-figlegend'));
  [2, 5, 7, 4, 8].forEach((n) => { const b = bandsOf(n); if (b === null) return; const sp = el('span', ''); sp.appendChild(h(`<i style="background:${BAND_COLOURS[b]}"></i>`)); sp.appendChild(document.createTextNode(C.games[n].bands[b].name)); legend.appendChild(sp); });
  s1.appendChild(legend);
  rewritingLine(s1);
  /* the portrait draws itself part by part (5 Nov 2026): the figure's rays grow out and its five dots pop, then each part below
     plays its own short timeline when it comes into view */
  const parts = [];
  const part = (sec, steps) => { parts.push({ sec, steps, state: 'wait' }); };
  part(s1, [(ctl) => { if (ctl.done) { fig.classList.remove('draw'); return 0; } fig.classList.replace('draw', 'drawn'); return 2 * M.base + 4 * M.step; }, stepIn(legend)]);

  /* 2. the bars */
  const s2 = story(); const h2a = s2.appendChild(held(el('h2', '', P.sections.personality)));
  const bars = el('div', 'fo-bars'); const barRows = [];
  C.games[1].bars.forEach((bar, bi) => { const key = TRAITS[bi]; const v = key === 'calm' ? r1.calm : r1.traits[key]; const row = held(el('div', 'fo-bar' + (v === null ? ' skip' : ''))); row.appendChild(el('b', '', bar.name)); const rail = el('div', 'rail'); const f = el('div', 'fill'); f.dataset.w = (v === null ? 0 : toP(1, v) * 100) + '%'; rail.appendChild(f); row.appendChild(rail); row.appendChild(el('small', '', v === null ? '' : (v >= 3 ? bar.high : bar.low))); bars.appendChild(row); barRows.push(row); });
  s2.appendChild(bars);
  part(s2, [stepIn(h2a), stepGrow(barRows)]);

  /* 3. the five dots, in their colours */
  const s3 = story(); const h2b = s3.appendChild(held(el('h2', '', P.sections.world)));
  const dv = el('div', 'fo-dots-view'); const dotRows = [];
  for (const n of [2, 5, 7, 4, 8]) { const res = st.games[n].result; const v = mainScore(n, res); const row = held(el('div', 'fo-dot-row')); const nm = el('div', 'nm'); nm.appendChild(el('span', '', C.games[n].name)); const bn = el('b', '', bandName(n, v)); bn.style.color = bandColour(n, v); nm.appendChild(bn); row.appendChild(nm); const sp = strip({ p: 0, bands: true, still: false }); sp.dot.style.background = bandColour(n, v); sp.dot.dataset.p = String(toP(n, v)); row.appendChild(sp); dv.appendChild(row); dotRows.push(row); }
  s3.appendChild(dv);
  /* the five dots glide from the left end to where each answer put you, one after another */
  part(s3, [stepIn(h2b), (ctl) => { dotRows.forEach((row, i) => { landed(row); const d = row.querySelector('.fo-strip-dot'); if (ctl.done) { d.classList.add('still'); setP(d, +d.dataset.p); return; } row.style.setProperty('--d', (i * M.step) + 'ms'); row.classList.add('fo-faded'); d.classList.add('glide'); d.style.transitionDelay = (i * M.step) + 'ms'; setP(d, +d.dataset.p); }); return M.slow + (dotRows.length - 1) * M.step; }]);

  /* 4. people like you: the cards, and One more */
  const picks = portraitLines();
  if (picks.length) {
    const s4 = story(); const h2c = s4.appendChild(held(el('h2', '', P.sections.people))); const intro = s4.appendChild(held(el('p', 'fo-quiet', P.sections.people_intro)));
    const grid = el('div', 'fo-cards');
    const main = picks.slice(0, -1), last = picks[picks.length - 1];
    for (const r of main) { const front = el('div', 'fo-card-face'); const top = el('div'); top.appendChild(iconSvg(CARD_ICON[r.id])); front.appendChild(top); const word = el('div'); word.appendChild(el('b', '', CARD_WORD[r.id] || '')); front.appendChild(word); grid.appendChild(flipCard(front, r.line, r.sources.join('; '))); }
    const front = el('div', 'fo-card-face fo-card-secret'); front.appendChild(el('b', '', P.one_more)); const tapMe = el('span', 'fo-tap'); tapMe.appendChild(h(TURN_ICON)); tapMe.appendChild(document.createTextNode(P.tap_me)); front.appendChild(tapMe);
    grid.appendChild(flipCard(front, last.line, last.sources.join('; '), 'secret'));
    s4.appendChild(grid);
    const cards = [...grid.children]; cards.forEach((c) => held(c)); const secret = cards.pop();
    /* the cards come in one after another, and the One more card pops last */
    part(s4, [stepIn([h2c, intro]), stepIn(cards), stepPop(secret)]);
  }

  /* 5. the dial and the own-answer lines */
  const s5 = story(); const h2d = s5.appendChild(held(el('h2', '', P.sections.own)));
  const dial = guessDial(); if (dial) s5.appendChild(held(dial));
  const own = ownLines().filter((l) => !/guess/.test(l)); let ownBox = null;
  if (own.length) { const d = held(el('div', 'fo-own')); own.forEach((l) => d.appendChild(el('p', '', l))); s5.appendChild(d); ownBox = d; }
  const worldBox = el('div'); s5.appendChild(worldBox);
  api('/guessed').then((r) => { if (!r || !r.lines || !r.lines.length) return; worldBox.classList.add('fo-in'); worldBox.appendChild(el('h2', '', P.sections.guessed)); const d = el('div', 'fo-own'); r.lines.forEach((l) => d.appendChild(el('p', '', l))); worldBox.appendChild(d); }).catch(() => {});
  /* the dial counts how many guesses landed while its needle swings; the lines after it */
  part(s5, [stepIn(h2d), dial ? (ctl) => { stepIn(dial)(ctl); return dial.play(ctl); } : 0, stepIn(ownBox)]);

  /* 6. the twin and the rarest thing, once the world has a hundred players; the doors; the consent; the rest */
  const s6 = story('fo-story-tail');
  const special = el('div', 'fo-special'); s6.appendChild(special);
  const tail = el('div'); s6.appendChild(tail);
  function specials() {
    special.textContent = '';
    if (st.consent.status !== 'yes' || !st.uploaded.at) return;
    const scored = [2, 3, 4, 5, 6, 7, 8].filter((n) => bandsOf(n) !== null).length;   /* the twin needs all seven, the rarest pair any two */
    if (scored === 7) api('/twin', { id: st.id }).then((r) => {
      if (!r || !r.twin) return;
      const box = el('div', 'fo-card fo-twin fo-in'); box.appendChild(el('b', '', P.twin_label)); box.appendChild(el('p', 'fo-lede', P.twin));
      const two = el('div', 'fo-twin-two');
      const mine = el('div'); mine.appendChild(figureSvg(r1, bandsOf, {})); mine.appendChild(el('small', '', P.compare_you)); two.appendChild(mine);
      const tw = r.twin; const twR1 = tw.bars ? { traits: { E: tw.bars.E, A: tw.bars.A, C: tw.bars.C, N: tw.bars.N, O: tw.bars.O }, calm: tw.bars.N === null ? null : 6 - tw.bars.N } : null;
      const theirs = el('div'); theirs.appendChild(figureSvg(twR1, (n) => (tw.bands && tw.bands[n] !== undefined ? tw.bands[n] : null), {})); const cn = tw.country ? countryOf(tw.country) : null; theirs.appendChild(el('small', '', (cn ? cn.flag + ' ' : '') + P.twin_label)); two.appendChild(theirs);
      box.appendChild(two); special.appendChild(box);
    }).catch(() => {});
    if (scored >= 2) api('/rare', { id: st.id }).then((r) => {
      if (!r || !r.pair) return;
      const [a, b] = r.pair.games; const [i, j] = r.pair.bands;
      special.appendChild(h(`<div class="fo-card fo-rare fo-in"><p class="fo-lede">${esc(P.rare.replace('{n}', String(r.pair.share)).replace('{a}', C.games[a].bands[i].name).replace('{b}', C.games[b].bands[j].name))}</p></div>`));
    }).catch(() => {});
  }
  function extras() {
    const box = el('div', 'fo-card fo-extras');
    const sh = el('button', 'btn solid', P.share); sh.type = 'button'; sh.addEventListener('click', () => sharePicture());
    const acts = el('div', 'fo-actions'); acts.appendChild(sh); box.appendChild(acts);
    const cmp = el('div', 'fo-extra'); cmp.appendChild(el('b', '', P.compare_btn || P.compare_friend)); cmp.appendChild(el('p', 'fo-quiet', P.compare_send));
    const link = `${SITE}compare/#${friendCode()}`;
    const cb = el('button', 'chip', P.copy_link); cb.type = 'button'; cb.dataset.link = link; cb.addEventListener('click', async () => { try { await navigator.clipboard.writeText(link); cb.textContent = P.link_copied; } catch (e) { const i = el('input'); i.value = link; cmp.appendChild(i); i.select(); } });
    cmp.appendChild(cb); box.appendChild(cmp);
    const rem = el('div', 'fo-extra'); rem.appendChild(el('b', '', P.reminder)); const d = reminderDate();
    rem.appendChild(el('p', 'fo-quiet', P.reminder_date.replace('{date}', longDate(d))));
    rem.appendChild(el('p', 'fo-quiet', P.january.replace('{month}', d.toLocaleDateString(L.locale, { month: 'long' }))));
    const cal = el('a', 'chip', P.add_calendar); cal.href = icsFor(d); cal.download = 'logicers-find-out.ics'; rem.appendChild(cal); box.appendChild(rem);
    return box;
  }
  function exploreBox() {
    /* a box people see and want to open (Khayyam, 22 Oct): two overlapping curves drawn small, the words, one button */
    const a = el('a', 'fo-explore-box'); a.href = '../explore/';
    a.appendChild(el('b', '', P.explore_box)); a.appendChild(el('p', '', P.explore_box_line));
    a.appendChild(h('<svg viewBox="0 0 300 56" aria-hidden="true"><path d="M4 50 C 60 50, 90 8, 130 8 S 200 50, 296 50" fill="rgba(255,212,94,.35)" stroke="#FFD45E" stroke-width="3" stroke-linejoin="round"/><path d="M4 50 C 90 50, 130 14, 180 14 S 250 50, 296 50" fill="rgba(255,255,255,.22)" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg>'));
    a.appendChild(el('span', 'chip', P.explore_open));
    return a;
  }
  function codeBox() {
    const box = el('div', 'fo-card fo-codebox');
    box.appendChild(h(`<p class="fo-lede">${esc(C.code.your_code)} <b class="fo-code">${esc(st.code || '')}</b></p>`));
    box.appendChild(el('p', 'fo-quiet', C.code.save_it));
    const cb = el('button', 'chip', C.code.copy_code); cb.type = 'button'; cb.addEventListener('click', async () => { try { await navigator.clipboard.writeText(st.code); cb.textContent = C.code.code_copied; } catch (e) {} });
    box.appendChild(cb);
    return box;
  }
  function tailFor() {
    tail.textContent = '';
    if (st.consent.status === null) tail.appendChild(consentCard({ imgBase: UP + '../../' }, (ans) => { if (ans === 'yes') { tail.textContent = ''; tail.appendChild(demographics(() => { tailFor(); specials(); })); } else tailFor(); }));
    else if (st.consent.status === 'no') {
      const box = el('div', 'fo-card'); box.appendChild(el('p', 'fo-lede', P.changed_mind));
      const acts = el('div', 'fo-actions'); const b = el('button', 'btn solid', P.changed_mind_btn); b.type = 'button';
      b.addEventListener('click', () => { st.consent = { status: null, version: null, at: null }; save(); tailFor(); });
      acts.appendChild(b); box.appendChild(acts); tail.appendChild(box);
    } else {
      if (!st.demographics) { tail.appendChild(demographics(() => { tailFor(); specials(); })); return; }
      compared(tail);
      if (st.code) tail.appendChild(codeBox());
    }
    if (st.consent.status === 'yes' && st.demographics) tail.appendChild(exploreBox());
    tail.appendChild(extras());
    /* "Delete my answers" is not on the portrait any more (Khayyam, 22 Oct): it lives under the consent card's "?" and on the code page */
  }
  tailFor(); specials();
  /* the consent card (or what stands in its place) comes up last, from further down */
  const tailFirst = [...tail.children]; tailFirst.forEach((c) => held(c));
  part(s6, [stepIn(tailFirst, { far: true })]);

  /* the curtain, once: the nine circles gather into the middle (5 Nov 2026: about a second in all, on the tokens) */
  root.textContent = ''; root.appendChild(w); wireDialogs(w); root.classList.add('fo-wide');
  const animateIn = () => { playParts(parts, () => w.isConnected); peekCard(w.querySelector('.fo-cards .fo-flip')); };
  if (!st.portrait_seen && !reduced()) {
    const cur = el('div', 'fo-curtain'); cur.appendChild(el('p', 'fo-curtain-text', P.curtain));
    const ring = el('div', 'fo-curtain-ring'); ORDER.forEach((n, i) => { const c = el('i'); c.style.setProperty('--i', String(i)); const b = n === 1 || n === 9 ? null : bandsOf(n); c.style.background = b === null ? 'var(--c)' : BAND_COLOURS[b]; ring.appendChild(c); }); cur.appendChild(ring);
    document.body.appendChild(cur);
    setTimeout(() => { cur.classList.add('gather'); }, M.fast);
    setTimeout(() => { cur.classList.add('out'); st.portrait_seen = true; save(); animateIn(); setTimeout(() => cur.remove(), 2000); }, M.fast + 2 * M.slow);   /* gone from the page later: it is clear and lets taps through as soon as it fades */
  } else { st.portrait_seen = true; save(); animateIn(); }

  function compared(where) {
    /* a picture, not only words (Khayyam, 22 Oct): three figures, You · people from your country · Everyone, then one strip
       per game with three dots (yours in its band colour, the country's and the world's averages), the percent lines under them */
    const box = el('div'); box.appendChild(el('h2', '', P.sections.compared));
    const cn = st.country && st.country !== 'not said' ? countryOf(st.country) : null;
    const countryName = cn ? poolName('country') : null;
    const figs = el('div', 'fo-cmp-figs'); box.appendChild(figs);
    const mine = el('div'); mine.appendChild(figureSvg(r1, bandsOf, {})); mine.appendChild(el('small', '', P.compare_you)); figs.appendChild(mine);
    const legend = el('div', 'fo-cmp-legend');
    legend.appendChild(h(`<span><i></i>${esc(P.compare_you)}</span>`));
    if (cn) legend.appendChild(h(`<span><i class="grp-country"></i>${esc(countryName)}</span>`));
    legend.appendChild(h(`<span><i class="grp-world"></i>${esc(lower(P.everyone))}</span>`));
    box.appendChild(legend);
    const rows = el('div'); box.appendChild(rows); where.appendChild(box);
    const meanOf = (c) => { let sum = 0; c.bins.forEach((cnt, i) => { sum += cnt * (c.lo + i * c.step); }); return c.n ? sum / c.n : null; };
    const pctOf = (c, v) => { let below = 0, equal = 0; c.bins.forEach((cnt, i) => { const x = c.lo + i * c.step; if (x < v - c.step / 2) below += cnt; else if (Math.abs(x - v) <= c.step / 2) equal += cnt; }); return Math.round(100 * (below + equal / 2) / c.n); };
    const open = (c) => c && c.n >= c.opens_at;
    const groupMeans = { world: {}, country: {} };
    const fetchGroup = (kind, m) => kind === 'world' ? api('/curve?m=' + m) : api('/pool', { id: st.id, m, pool: { country: st.country } });
    const groupFigure = (kind, label) => {
      const g = groupMeans[kind]; if (![2, 5, 7, 4, 8].some((n) => g['g' + n] !== undefined && g['g' + n] !== null)) return;
      const traits = {}; for (const t of ['E', 'A', 'C', 'N', 'O']) traits[t] = g['g1.' + t] === undefined ? null : g['g1.' + t];
      const r = { traits, calm: traits.N === null ? null : 6 - traits.N };
      const d = el('div', 'fo-in'); d.appendChild(figureSvg(r, (n) => (g['g' + n] === undefined || g['g' + n] === null ? null : bandIndex(n, g['g' + n])), {})); d.appendChild(el('small', '', label));
      if (kind === 'country') figs.insertBefore(d, figs.children[1] || null); else figs.appendChild(d);
    };
    /* the strips first, all seven in place at once (5 Nov 2026: nothing below them jumps as they fill); the group dots pop on and
       the lines enter as the answers come */
    const strips = [];
    for (const n of [2, 3, 4, 5, 6, 7, 8]) {
      const res = st.games[n].result; if (!res || !res.scored) continue; const v = n === 6 ? res.score : mainScore(n, res);
      const row = el('div', 'fo-cmp-row fo-dot-row'); const nm = el('div', 'nm'); nm.appendChild(el('span', '', C.games[n].name)); const bn = el('b', '', bandName(n, v)); bn.style.color = bandColour(n, v); nm.appendChild(bn); row.appendChild(nm);
      const sp = strip({ p: toP(n, v), bands: true, still: true }); sp.dot.classList.add('grp-you'); sp.dot.style.background = bandColour(n, v); row.appendChild(sp);
      const lines = el('div'); row.appendChild(lines); rows.appendChild(row);
      strips.push({ n, v, sp, lines });
    }
    const line = (where, cls, text) => where.appendChild(el('p', cls + ' fo-in', text));
    (async () => {
      for (const { n, v, sp, lines } of strips) {
        const addDot = (cls, p, title) => { const d = el('div', 'fo-strip-dot still ' + cls); setP(d, p); d.title = title; d.setAttribute('aria-hidden', 'true'); sp.insertBefore(d, sp.dot); popOnce(d); };
        try { const w = await fetchGroup('world', 'g' + n); if (open(w)) { const m = meanOf(w); groupMeans.world['g' + n] = m; addDot('grp-world', toP(n, m), P.everyone); line(lines, 'fo-quiet', pctWord(C.games[n].comparison, pctOf(w, v))); } } catch (e) {}
        if (cn) { try { const c = await fetchGroup('country', 'g' + n); if (open(c)) { const m = meanOf(c); groupMeans.country['g' + n] = m; addDot('grp-country', toP(n, m), countryName); line(lines, 'fo-quiet', forPool(pctWord(C.games[n].comparison, pctOf(c, v)), 'country')); } else if (c) line(lines, 'fo-quiet', `${countryName}${COLON}${soFar(c.n, c.opens_at)}`); } catch (e) {} }
      }
      /* then the two group figures: their faces from the five bars' averages, their dots from the five games' averages */
      for (const kind of cn ? ['world', 'country'] : ['world']) {
        for (const t of ['E', 'A', 'C', 'N', 'O']) { try { const c = await fetchGroup(kind, 'g1.' + t); if (open(c)) groupMeans[kind]['g1.' + t] = meanOf(c); } catch (e) {} }
        groupFigure(kind, kind === 'world' ? P.everyone : (cn.flag + ' ' + countryName));
      }
    })();
  }
}

/* ------------------------------------------------------------------ the share picture ------ */
function sharePicture() {
  const st = load(); const P = C.portrait;
  const W = 1080, H = 1500; const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const x = cv.getContext('2d');
  const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const bg = dark ? '#0F1F0A' : '#E3F2DA', ink = dark ? '#F3F4FF' : '#15172B', green = dark ? '#9EDB6A' : '#3F7A2A', soft = dark ? '#A3A9CB' : '#5D6279', card = dark ? '#12152A' : '#FFFFFF';
  x.fillStyle = bg; x.fillRect(0, 0, W, H);
  x.fillStyle = ink; x.font = '800 64px "Bricolage Grotesque", system-ui, sans-serif'; x.fillText(P.title, 72, 130);
  const c = playerCountry(); if (c) { x.font = '64px system-ui, sans-serif'; x.fillText(c.flag, W - 72 - 70, 130); }
  let y = 230;
  const r1 = st.games[1] && st.games[1].result && st.games[1].result.scored ? st.games[1].result : null;
  if (r1) {
    x.font = '800 36px "Bricolage Grotesque", system-ui, sans-serif'; x.fillStyle = soft; x.fillText(P.sections.personality, 72, y); y += 40;
    C.games[1].bars.forEach((bar, bi) => {
      const key = TRAITS[bi]; const v = key === 'calm' ? r1.calm : r1.traits[key];
      x.fillStyle = ink; x.font = '800 32px "Bricolage Grotesque", system-ui, sans-serif'; x.fillText(bar.name, 72, y + 32);
      x.fillStyle = dark ? 'rgba(158,219,106,.2)' : 'rgba(63,122,42,.18)'; roundRect(x, 300, y + 8, W - 372, 30, 15); x.fill();
      if (v !== null) { x.fillStyle = green; roundRect(x, 300, y + 8, (W - 372) * toP(1, v), 30, 15); x.fill(); }
      y += 66;
    });
    y += 30;
  }
  x.font = '800 36px "Bricolage Grotesque", system-ui, sans-serif'; x.fillStyle = soft; x.fillText(P.sections.world, 72, y);
  x.textAlign = 'right'; x.fillText(P.your_turn, W - 72, y); x.textAlign = 'left'; y += 50;
  const BC = dark ? ['#8FCCFA', '#9EDB6A', '#FFCB57'] : ['#3E7CB1', '#3F7A2A', '#C2781A'];
  for (const n of [2, 5, 7, 4, 8]) {
    const r = st.games[n] && st.games[n].result && st.games[n].result.scored ? st.games[n].result : null; if (!r) continue;
    const v = mainScore(n, r); const bi = bandIndex(n, v);
    x.fillStyle = card; roundRect(x, 72, y, W - 144, 118, 26); x.fill();
    x.fillStyle = soft; x.font = '700 28px system-ui, sans-serif'; x.fillText(C.games[n].name, 100, y + 44);
    x.fillStyle = BC[bi]; x.font = '800 38px "Bricolage Grotesque", system-ui, sans-serif'; x.fillText(bandName(n, v), 100, y + 94);
    /* mine: a filled dot on a short rail; the friend's: an empty ring, waiting */
    x.fillStyle = dark ? 'rgba(255,255,255,.12)' : 'rgba(21,23,43,.1)'; roundRect(x, 700, y + 54, 150, 12, 6); x.fill();
    x.fillStyle = BC[bi]; x.beginPath(); x.arc(700 + 150 * toP(n, v), y + 60, 16, 0, Math.PI * 2); x.fill();
    x.strokeStyle = soft; x.lineWidth = 4; x.setLineDash([6, 6]); x.beginPath(); x.arc(930, y + 60, 16, 0, Math.PI * 2); x.stroke(); x.setLineDash([]);
    y += 134;
  }
  x.fillStyle = ink; x.font = '700 34px system-ui, sans-serif'; x.fillText(P.share_line, 72, H - 72);
  const d = sheet('dlg-share', P.share, `<p class="quiet"></p><img class="shot" alt="${esc(U.share_alt)}"><div class="actions"><a class="btn solid" id="share-save" download="my-portrait.png">${esc(P.save_picture)}</a><button class="btn ghost" id="share-copy" type="button">${esc(P.copy_link)}</button></div><p class="copied" id="share-copied" role="status"></p>`);
  const url = cv.toDataURL('image/png'); d.querySelector('img').src = url; d.querySelector('#share-save').href = url;
  d.querySelector('#share-copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText(SITE); d.querySelector('#share-copied').textContent = P.link_copied; } catch (e) {} });
  openSheet(d);
}
function roundRect(x, X, Y, W, H, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + W, Y, X + W, Y + H, r); x.arcTo(X + W, Y + H, X, Y + H, r); x.arcTo(X, Y + H, X, Y, r); x.arcTo(X, Y, X + W, Y, r); x.closePath(); }

/* ------------------------------------------------------------------ compare with a friend ------ */
function comparePage() {
  const root = document.getElementById('fo'); const st = load(); const P = C.portrait;
  const w = el('section', 'fo-screen fo-portrait');
  howSheet();
  const f = parseFriend(location.hash);
  w.appendChild(el('h1', 'fo-title', P.compare_btn || P.compare_friend));
  if (!f) { w.appendChild(el('p', 'fo-lede', U.no_portrait_link)); const a = el('a', 'btn solid', C.home['Start button']); a.href = '../'; w.appendChild(a); root.textContent = ''; root.appendChild(w); return; }
  const mine = doneGames().length === 9;
  if (!mine) w.appendChild(el('p', 'fo-lede', P.compare_play));
  const grid = el('div', 'fo-cmp');
  grid.appendChild(el('span', 'fo-cmp-h', '')); grid.appendChild(el('span', 'fo-cmp-h', P.compare_you)); grid.appendChild(el('span', 'fo-cmp-h', P.compare_friend));
  for (const n of [2, 5, 7, 4, 8, 3, 6]) {
    const r = st.games[n] && st.games[n].result && st.games[n].result.scored ? st.games[n].result : null;
    const myB = r ? bandIndex(n, mainScore(n, r)) : null; const frB = f.bands[n];
    grid.appendChild(el('span', 'fo-cmp-n', C.games[n].name));
    grid.appendChild(el('span', 'fo-cmp-b' + (myB === null ? ' none' : ''), myB === null ? '—' : C.games[n].bands[myB].name));
    grid.appendChild(el('span', 'fo-cmp-b' + (frB === null ? ' none' : '') + (myB !== null && frB !== null ? (myB === frB ? ' same' : '') : ''), frB === null ? '—' : C.games[n].bands[frB].name));
  }
  w.appendChild(grid);
  const r1 = st.games[1] && st.games[1].result && st.games[1].result.scored ? st.games[1].result : null;
  const bars = el('div', 'fo-bars');
  w.appendChild(el('h2', '', P.sections.personality));
  C.games[1].bars.forEach((bar, bi) => {
    const t = TRAITS[bi] === 'calm' ? 'N' : TRAITS[bi]; const fv = bi === 3 ? (f.bars.N === null ? null : 6 - f.bars.N) : f.bars[t]; const mv = r1 ? (bi === 3 ? r1.calm : r1.traits[t]) : null;
    const row = el('div', 'fo-bar'); row.appendChild(el('b', '', bar.name));
    const rail = el('div', 'rail'); const f1 = el('div', 'fill'); f1.style.setProperty('--w', (mv === null ? 0 : toP(1, mv) * 100) + '%'); rail.appendChild(f1);
    if (fv !== null) { const ring = el('div', 'ring'); ring.style.left = (toP(1, fv) * 100) + '%'; ring.title = P.compare_friend; rail.appendChild(ring); }
    row.appendChild(rail); row.appendChild(el('small', '', `${P.compare_you}${COLON}${U.bar} · ${P.compare_friend}${COLON}${U.ring}`)); bars.appendChild(row);
  });
  w.appendChild(bars);
  const acts = el('div', 'fo-actions'); const a = el('a', 'btn solid', mine ? U.my_portrait : C.home['Start button']); a.href = mine ? '../portrait/' : '../'; acts.appendChild(a); w.appendChild(acts);
  root.textContent = ''; root.appendChild(w); wireDialogs(w);
}

/* ------------------------------------------------------------------ explore: any two groups ------ */
function explorePage() {
  const root = document.getElementById('fo'); const st = load(); const PL = C.pools;
  const w = el('section', 'fo-screen fo-portrait');
  howSheet();
  w.appendChild(el('h1', 'fo-title', PL.explore_heading));
  w.appendChild(el('p', 'fo-quiet', PL.explore_line));
  if (st.consent.status !== 'yes' || !st.uploaded.at) { w.appendChild(el('p', 'fo-lede', PL.opens_after_yes)); const a = el('a', 'btn solid', doneGames().length === 9 ? C.shared.see_portrait : C.home['Start button']); a.href = doneGames().length === 9 ? '../portrait/' : '../'; w.appendChild(a); root.textContent = ''; root.appendChild(w); return; }
  const sel = (label, opts) => { const l = el('label', 'fo-pick'); l.appendChild(el('span', '', label)); const s = el('select'); opts.forEach(([v, t]) => { const o = el('option', '', t); o.value = v; s.appendChild(o); }); l.appendChild(s); return [l, s]; };
  const [gl, gs] = sel(PL.pickers.game, [2, 3, 4, 5, 6, 7, 8].map((n) => [String(n), C.games[n].name]));
  const kinds = [['world', PL.pickers.world]]; const cn = playerCountry(); if (cn && st.country !== 'not said') kinds.push(['country', PL.pickers.country]);
  for (const f of C.demographics.fields) kinds.push([f.key, f.label]);
  if (cn && st.country !== 'not said') for (const f of C.demographics.fields) kinds.push(['country+' + f.key, PL.pickers.country_and + ' ' + lower(f.label)]);
  if (st.room && st.room.tag) kinds.push(['room', PL.pickers.room]);   /* a phone that played in a room (stage 2) */
  const group = (label, start) => {
    const box = el('div', 'fo-pickbox'); const [kl, ks] = sel(label, kinds); ks.value = start; box.appendChild(kl);
    const [vl, vs] = sel('', []); vl.hidden = true; box.appendChild(vl);
    const fill = () => { const k = ks.value.replace('country+', ''); const f = C.demographics.fields.find((x) => x.key === k); vs.textContent = ''; if (!f) { vl.hidden = true; return; } vl.hidden = false; f.options.forEach((o, i) => { const op = el('option', '', (f.labels && f.labels[i]) || o); op.value = o; vs.appendChild(op); }); const mine = st.demographics && st.demographics[k]; if (mine && f.options.includes(mine)) vs.value = mine; };
    ks.addEventListener('change', () => { fill(); draw(); }); vs.addEventListener('change', draw); fill();
    box.pool = () => { const k = ks.value; if (k === 'world') return { key: 'world', name: PL.names.world }; if (k === 'room') return { key: { room: st.room.tag }, name: PL.pickers.room }; const withC = k.startsWith('country+'); const kk = k.replace('country+', ''); const p = {}; if (kk === 'country' || withC) p.country = st.country; if (kk !== 'country') p[kk] = vs.value; const shown = vs.selectedOptions && vs.selectedOptions[0] ? vs.selectedOptions[0].textContent : vs.value; const nm = kk === 'country' ? poolName('country') : (withC ? poolName('country') + ', ' + shown : shown); return { key: p, name: nm }; };
    return box;
  };
  const A = group(PL.pickers.a, 'world'), B = group(PL.pickers.b, kinds[1] ? kinds[1][0] : 'world');
  const picks = el('div', 'fo-picks'); picks.appendChild(gl); picks.appendChild(A); picks.appendChild(B); w.appendChild(picks);
  const out = el('div', 'fo-curve fo-explore-out'); w.appendChild(out);
  async function one(p, m) { if (p.key === 'world') return api('/curve?m=' + m); return api('/pool', { id: st.id, m, pool: p.key }); }
  async function draw() {
    const n = Number(gs.value); const m = 'g' + n; out.textContent = ''; out.appendChild(el('p', 'fo-curve-wait', '…'));
    const pa = A.pool(), pb = B.pool();
    try {
      const [ca, cb] = await Promise.all([one(pa, m), one(pb, m)]);
      out.textContent = '';
      const ok = (c) => c && c.n >= c.opens_at;
      if (ok(ca) || ok(cb)) out.appendChild(twoCurves(ok(ca) ? ca : null, ok(cb) ? cb : null, n));
      const leg = el('div', 'fo-legend');
      for (const [c, p, cls] of [[ca, pa, 'a'], [cb, pb, 'b']]) leg.appendChild(el('span', 'fo-leg ' + cls, ok(c) ? `${p.name} · ${fmt(c.n)}` : `${p.name}${COLON}${soFar(c ? c.n : 0, c ? c.opens_at : 30)}`));
      out.appendChild(leg);
      const names = el('div', 'fo-ends three'); C.games[n].bands.forEach((b) => names.appendChild(el('span', '', b.name))); out.appendChild(names);
    } catch (e) { out.textContent = ''; out.appendChild(el('p', 'fo-curve-wait', C.shared.curve_waiting)); }
  }
  gs.addEventListener('change', draw);
  root.textContent = ''; root.appendChild(w); wireDialogs(w); draw();
}
function twoCurves(a, b, n) {
  const W = 300, H = 90, pad = 8;
  const path = (r) => { if (!r) return ''; const k = r.bins.length > 9 ? [1, 2, 3, 2, 1] : [1, 2, 1]; const half = (k.length - 1) / 2; const ks = k.reduce((x, y) => x + y, 0); const sm = r.bins.map((_, i, arr) => k.reduce((acc, wgt, j) => acc + wgt * (arr[i + j - half] || 0), 0) / ks / r.n); const top = Math.max(1e-9, ...sm); const pts = sm.map((c, i) => [pad + (i / (sm.length - 1)) * (W - 2 * pad), H - 6 - (c / top) * (H - 18)]); let d = `M${pts[0][0]},${H - 6} L${pts[0][0]},${pts[0][1].toFixed(1)} `; for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; const cx = ((x0 + x1) / 2).toFixed(1); d += `C${cx},${y0.toFixed(1)} ${cx},${y1.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)} `; } return d + `L${pts[pts.length - 1][0]},${H - 6} Z`; };
  return h(`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${esc(tpl(U.two_groups_aria, { game: C.games[n].name }))}">${a ? `<path d="${path(a)}" fill="var(--c)" fill-opacity=".25" stroke="var(--c)" stroke-width="2"/>` : ''}${b ? `<path d="${path(b)}" fill="var(--ink)" fill-opacity=".12" stroke="var(--ink)" stroke-width="2" stroke-dasharray="5 4"/>` : ''}</svg>`);
}

/* ------------------------------------------------------------------ the language ------
   A chip in the header shows the language and opens a sheet with the six (flag and word); the sheet opens by itself the
   first time a phone reaches any find-out page (Khayyam, 23 Oct). The pick is remembered (lg.findout.lang) and every
   find-out page then opens in that language: one store, one portrait per phone whatever the language. */
const LANGS = [['en', 'English', '\u{1F1EC}\u{1F1E7}'], ['it', 'Italiano', '\u{1F1EE}\u{1F1F9}'], ['tr', 'Türkçe', '\u{1F1F9}\u{1F1F7}'], ['es', 'Español', '\u{1F1EA}\u{1F1F8}'],
               ['pt', 'Português', '\u{1F1E7}\u{1F1F7}'], ['fr', 'Français', '\u{1F1EB}\u{1F1F7}']];
const LANG_KEY = 'lg.findout.lang';
/* a saved code the find-outs do not have (one the rest of the site may add later) counts as a pick: English here, no sheet.
   Spanish is one of them since 26 Oct 2026, Portuguese (Brazil) and French since 28 Oct 2026 */
function savedLang() { try { const v = localStorage.getItem(LANG_KEY); return !v ? null : LANGS.some((l) => l[0] === v) ? v : 'en'; } catch (e) { return null; } }
function rememberLang(code) { try { localStorage.setItem(LANG_KEY, code); } catch (e) {} }
/* the same page in another language: find-out/<page> ↔ find-out/it/<page> ↔ … ↔ find-out/fr/<page>, the hash kept (a room code, a friend's portrait) */
function samePageIn(code) {
  const m = location.pathname.match(/^(.*\/find-out\/)(?:(it|tr|es|pt|fr)\/)?(.*)$/);
  if (!m) return null;
  return m[1] + (code === 'en' ? '' : code + '/') + m[3] + location.search + location.hash;
}
function langSheet(open) {
  let d = document.getElementById('dlg-lang');
  if (!d) {
    d = h(`<dialog id="dlg-lang" aria-labelledby="dlg-lang-t"><div class="sheet fo-langsheet"><button class="chip round close" type="button" data-close aria-label="${esc(U.close)}">×</button><h2 id="dlg-lang-t">Language · Lingua · Dil · Idioma · Língua · Langue</h2><div class="fo-langlist"></div></div></dialog>`);
    const list = d.querySelector('.fo-langlist');
    for (const [code, name, flag] of LANGS) {
      const a = el('a', 'fo-langpick' + (code === LANG ? ' on' : '')); a.lang = code; a.hreflang = code;
      a.appendChild(el('span', 'flag', flag)); a.appendChild(el('b', '', name));
      const to = samePageIn(code); a.href = to || '#';
      a.addEventListener('click', (e) => { rememberLang(code); if (code === LANG) { e.preventDefault(); closeSheet(d); } });
      list.appendChild(a);
    }
    document.body.appendChild(d); wireDialogs(d);
  }
  if (open) openSheet(d);
  return d;
}
function langChip() {
  const chip = document.getElementById('fo-langchip'); if (!chip) return;
  const me = LANGS.find((l) => l[0] === LANG) || LANGS[0];
  chip.textContent = ''; chip.appendChild(el('span', 'flag', me[2])); chip.appendChild(document.createTextNode(' ' + LANG.toUpperCase()));
  chip.setAttribute('aria-label', U.switch_label + COLON + me[1]); chip.hidden = false;
  chip.addEventListener('click', () => langSheet(true));
}
function progressLine(done) { const m = minutesLeft(); return tpl(m === 1 ? U.progress_line_1 : U.progress_line, { done, m }); }

/* ------------------------------------------------------------------ a code on the section's home ------ */
function codeEntry() {
  const st = load(); const K = C.code;
  const box = el('div', 'fo-card fo-codeentry');
  const b = el('button', 'fo-help-btn', `${K.have_code} ${K.enter_it}`); b.type = 'button'; box.appendChild(b);
  const form = el('form', 'fo-codeform'); form.hidden = true;
  const inp = el('input', 'fo-search'); inp.placeholder = K.type_code; inp.maxLength = 8; inp.autocapitalize = 'characters'; inp.setAttribute('aria-label', K.type_code); form.appendChild(inp);
  const go = el('button', 'btn solid', K.enter_it); go.type = 'submit'; form.appendChild(go);
  const status = el('p', 'fo-status', ''); form.appendChild(status);
  b.addEventListener('click', () => { form.hidden = false; b.hidden = true; inp.focus(); });
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); go.disabled = true; status.textContent = '…';
    try {
      const r = await api('/claim', { code: inp.value });
      if (!r || !r.ok) throw new Error('no');
      adopt(r); status.className = 'fo-status ok'; status.textContent = K.adopted; setTimeout(() => { location.href = 'portrait/'; }, 700);
    } catch (err) { status.textContent = K.not_found; go.disabled = false; }
  });
  box.appendChild(form);
  return box;
}
function adopt(r) {
  const st = fresh(); st.id = r.id; st.code = r.code; st.created = r.player.created || st.created;
  st.country = r.player.country; st.header_country = r.player.header_country || ''; st.country_asked = true;
  st.consent = { status: 'yes', version: r.player.consent_version, at: r.player.consent_at }; st.uploaded = { at: new Date().toISOString(), games: [] };
  for (const g of r.games) { if (g.wave !== 1) continue; st.games[g.game] = { started: g.started, finished: g.finished, duration_ms: g.duration_ms, answers: {}, times: {}, positions: {}, order: [], guess: g.guess === null ? null : { p: g.guess_p, value: g.guess }, result: g.sub, rules_version: g.sub.rules_version, adopted: true }; if (g.sub.scored !== false) st.done_order.push(g.game); }
  st.done_order.sort((x, y) => ((r.games.find((g) => g.game === x) || {}).order_index || 0) - ((r.games.find((g) => g.game === y) || {}).order_index || 0));
  if (r.demographics) st.demographics = r.demographics;
  if (r.player && r.player.room) st.room = { code: null, tag: r.player.room, key: null, joined: null, ended: true, done: {} };   /* "My room" follows the player to a new phone (the room itself is over) */
  S = st; save();
}

/* ------------------------------------------------------------------ start ------ */
export function start() {
  const root = document.getElementById('fo'); if (!root) return;
  readTokens();
  /* the language first: a remembered pick opens this page in that language; no pick yet, the sheet asks (and the page shows under it) */
  const want = savedLang();
  if (want && want !== LANG) { const to = samePageIn(want); if (to) { location.replace(to); return; } }
  const page = root.dataset.page; const n = Number(root.dataset.game);
  langChip();
  if (!want && page !== 'researchers') langSheet(true);      /* the researchers' sheet (30 Oct 2026) only gets the chip and the remembered language: nobody who comes from a paper is met by a window */
  if (page === 'home') homePage(); else if (page === 'room') roomPage(); else if (page === 'portrait') portraitPage(); else if (page === 'compare') comparePage(); else if (page === 'explore') explorePage(); else if (n >= 1 && n <= 9) gamePage(n);
}
export const _test = { load, save, wipe, batch, bandName, mainScore, portraitLines, ownLines, fill, parliamentName, STORE_KEY, LANG, poolSentence, forPool };
start();

/* ------------------------------------------------------------------ the room (stage 2, 23 Oct 2026) ------
   A host runs all nine games, one by one, with up to 100 phones. The room server (server/findout-room, its own
   Worker) keeps counts and one bin per phone key; the phones keep everything else. The contract is in
   claude/find-outs-s2-handoff.md. Nothing here names anyone. */
async function roomApi(path, body) {
  try {
    const r = await reach(ROOM_ADDR, path, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : { cache: 'no-store' }, 9000);
    const j = await r.json().catch(() => null);
    if (r.status === 404) return { ok: false, error: 'not_found' };
    return j || { ok: false, error: 'bad' };
  } catch (e) { return { ok: false, error: 'network' }; }
}
/* the bin of a scored game, the same bins as the world's curves; null for game 9 and for anything unscored */
function roomBin(n, res) {
  if (!res || !res.scored || !ROOM_BINS[n]) return null;
  const v = n === 1 ? (res.traits ? res.traits.E : null) : res.score;
  if (v === null || v === undefined) return null;
  const [lo, hi, step] = ROOM_BINS[n];
  return Math.min(Math.round((hi - lo) / step), Math.max(0, Math.round((v - lo) / step)));
}
/* a chart's counts by band (games 2-8), and the band most of the room landed in */
function roomBandCounts(n, chart) {
  const out = [0, 0, 0]; if (!chart || !chart.bins || !ROOM_BINS[n] || n === 1) return out;
  const [lo, , step] = ROOM_BINS[n];
  chart.bins.forEach((c, i) => { const b = bandIndex(n, lo + i * step); if (b !== null) out[b] += c; });
  return out;
}
function roomTop(n, chart) { const c = roomBandCounts(n, chart); const total = c[0] + c[1] + c[2]; if (!total) return null; let b = 0; for (let i = 1; i < 3; i++) if (c[i] > c[b]) b = i; return { band: b, k: c[b], n: total, pct: Math.round(100 * c[b] / total) }; }
function roomOf() { const st = load(); return st.room && !st.room.ended ? st.room : null; }
/* was this game played inside the open room (a replay or a first play after joining)? */
function roomPlayed(n) { const rm = roomOf(); const g = load().games[n]; return !!(rm && g && g.started && g.started >= rm.joined); }
/* a replay in a room (Khayyam, 23 Oct): the earlier play is kept for the upload under its own wave (1 for the first
   play, 3, 4, … for room replays; 2 is the three-month retake), and the new play takes its place on the phone */
function archivePlay(n) {
  const st = load(); const g = st.games[n]; if (!g || !g.result) return;
  st.plays = st.plays || {}; st.plays[n] = st.plays[n] || []; st.plays[n].push(g);
  delete st.games[n]; st.done_order = st.done_order.filter((k) => k !== n); save();
}
function waveOf(n, g) { const st = load(); const earlier = (st.plays && st.plays[n]) || []; const i = earlier.indexOf(g); if (i === 0 || (i < 0 && !earlier.length)) return 1; return 2 + (i < 0 ? earlier.length : i); }
function roomLeave() { const st = load(); if (st.room) { st.room.ended = true; save(); } }
/* one poll loop per page, only while the page is visible */
function roomRemember(s) {
  const st = load(); if (!st.room || st.room.code !== (s && s.code)) return;
  const was = st.room.state && st.room.state.game; st.room.state = { game: s.game, step: s.step }; save();
  if (was !== s.game) document.querySelectorAll('.fo-circles').forEach((c) => c.replaceWith(circles(c.dataset.cur === '' ? null : Number(c.dataset.cur), c.dataset.base)));   /* the shut games follow the room */
}
/* the games the room has not reached yet are closed on this phone while the room is open (no playing ahead) */
function roomAllows(n) { const rm = roomOf(); if (!rm || !rm.state || !rm.state.game) return true; return n <= rm.state.game; }
function roomWatch(code, onState, every) {
  let stop = false, timer = null;
  const tick = async () => {
    if (stop) return;
    if (document.visibilityState !== 'hidden') {
      const r = await roomApi('/room/' + encodeURIComponent(code));
      if (stop) return;
      if (r && r.ok && r.state) { roomRemember(r.state); onState(r.state); } else if (r && r.error === 'not_found') onState(null);
    }
    timer = setTimeout(tick, every || 2500);
  };
  tick();
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && !stop) { clearTimeout(timer); tick(); } });
  return () => { stop = true; clearTimeout(timer); };
}
/* the phone tells the room it is done with a game (one bin, replaced on a redo); quiet when the room is not on that game */
async function roomDone(n, res) {
  const st = load(); const rm = roomOf(); if (!rm) return;
  if (rm.done && rm.done[n] === (roomBin(n, res) ?? 'x')) return;
  const r = await roomApi('/room/' + encodeURIComponent(rm.code) + '/done', { key: rm.key, game: n, bin: roomBin(n, res) });
  if (r && r.ok) { rm.done = rm.done || {}; rm.done[n] = roomBin(n, res) ?? 'x'; save(); }
}
function roomJoinCard(onState) {
  /* the card on the section's home and under a reveal: where the room is, what to do next */
  const R = C.room; const rm = roomOf(); if (!rm) return null;
  const box = el('div', 'fo-card fo-roombox');
  const head = el('b', '', R.joined); box.appendChild(head);
  const line = el('p', 'fo-quiet', R.keep_open); box.appendChild(line);
  const act = el('div', 'fo-actions'); box.appendChild(act);
  const leave = el('button', 'fo-help-btn', R.leave); leave.type = 'button'; leave.addEventListener('click', () => { roomLeave(); location.href = location.pathname; }); box.appendChild(leave);
  let shown = 0, lastGame = null;
  box.update = (s) => {
    act.textContent = '';
    if (!s || s.step === 'ended') { head.classList.remove('fo-waiting'); head.textContent = ''; line.textContent = R.player_ended; roomLeave(); return; }
    /* the count of phones counts up on each change and pulses while the room waits for its host */
    countIn(head, `${R.joined} · ${R.here}`, 'n', s.joined, shown); shown = s.joined;
    head.classList.toggle('fo-waiting', s.step === 'lobby');
    if (s.step === 'lobby') { line.textContent = R.keep_open; return; }
    if (s.game) {
      /* a phone that played this game before the room reached it still counts: its bin goes up by itself, and the
         button opens its result with the room's line (Khayyam, 23 Oct: his own phone, all nine done, never counted) */
      const g = load().games[s.game];
      if (s.step === 'play' && isDone(s.game) && g && g.result) roomDone(s.game, g.result);
      line.textContent = s.step === 'reveal' ? (roomPlayerLine(s.game, s) || R.waiting_next) : '';
      const again = s.step === 'play' && isDone(s.game) && !roomPlayed(s.game);
      const a = el('a', 'btn solid fo-pop', (again ? R.open_again : R.open_game).replace('{n}', String(s.game))); a.href = (document.getElementById('fo').dataset.page === 'home' ? '' : '../') + SLUG[s.game] + '/' + (again ? '#again' : ''); act.appendChild(a);
      if (s.game !== lastGame) popOnce(a);   /* the host has opened a game: its button pops once */
      lastGame = s.game;
    } else line.textContent = R.keep_open;
    if (onState) onState(s);
  };
  return box;
}
function roomPlayerLine(n, s) {
  /* under a reveal in a room: waiting for the host, or the room's line */
  const R = C.room;
  if (!s || s.step === 'ended') return R.player_ended;
  const ch = s.charts && s.charts[String(n)];
  if (!ch) return s.game === n ? R.waiting_host : (s.opened && s.opened.includes(n) ? '' : R.waiting_host);
  if (!ch.bins || ch.n < ROOM_MIN) return R.room_few.replace('{n}', fmt(ch.n));
  if (n === 1 || n === 9) return s.game === n && s.step === 'reveal' ? R.waiting_next : '';   /* no bands on these two: the host's screen has the picture */
  const t = roomTop(n, ch); if (!t) return '';
  return R.room_line.replace('{k}', fmt(t.k)).replace('{n}', fmt(t.n)).replace('{band}', C.games[n].bands[t.band].name);
}
function roomCurveSvg(room, world, n) {
  /* the room's curve, filled, over the world's thin line; both smoothed as in Explore */
  const W = 300, H = 90, pad = 8;
  const path = (r, closed) => { if (!r || !r.bins) return ''; const k = r.bins.length > 9 ? [1, 2, 3, 2, 1] : [1, 2, 1]; const half = (k.length - 1) / 2; const ks = k.reduce((x, y) => x + y, 0); const sm = r.bins.map((_, i, arr) => k.reduce((acc, wgt, j) => acc + wgt * (arr[i + j - half] || 0), 0) / ks / r.n); const top = Math.max(1e-9, ...sm); const pts = sm.map((c, i) => [pad + (i / (sm.length - 1)) * (W - 2 * pad), H - 6 - (c / top) * (H - 18)]); let d = `M${pts[0][0]},${H - 6} L${pts[0][0]},${pts[0][1].toFixed(1)}`; for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; const cx = ((x0 + x1) / 2).toFixed(1); d += `C${cx},${y0.toFixed(1)} ${cx},${y1.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`; } return closed ? d + `L${pts[pts.length - 1][0]},${H - 6} Z` : d; };
  return h(`<svg class="fo-roomcurve" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${esc(C.room.the_room)} · ${esc(C.games[n].name)}">${world ? `<path d="${path(world, false)}" fill="none" stroke="var(--ink)" stroke-opacity=".45" stroke-width="1.5" stroke-dasharray="4 3"/>` : ''}${room ? `<path class="fo-drawing" pathLength="100" d="${path(room, true)}" fill="var(--c)" fill-opacity=".3" stroke="var(--c)" stroke-width="2.5"/>` : ''}</svg>`);
}
function roomBandBar(n, chart) {
  const c = roomBandCounts(n, chart); const total = c[0] + c[1] + c[2]; const bar = el('div', 'fo-bandbar');
  if (!total) return bar;
  c.forEach((k, i) => { const seg = el('span', ''); seg.style.width = (100 * k / total) + '%'; seg.style.background = BAND_COLOURS[i]; seg.title = `${C.games[n].bands[i].name} ${Math.round(100 * k / total)}%`; if (k / total >= 0.12) seg.textContent = Math.round(100 * k / total) + '%'; bar.appendChild(seg); });
  return bar;
}
function qrSvg(text, label) {
  const Q = window.qrcodegen; if (!Q) return null;
  try {
    const q = Q.QrCode.encodeText(text, Q.QrCode.Ecc.MEDIUM); let d = ''; const n = q.size;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (q.getModule(x, y)) d += `M${x + 2} ${y + 2}h1v1h-1z`;
    return h(`<svg class="fo-qr" viewBox="0 0 ${n + 4} ${n + 4}" role="img" aria-label="${esc(label)}"><rect width="100%" height="100%" fill="#fff"/><path d="${d}" fill="#15172B"/></svg>`);
  } catch (e) { return null; }
}

/* ---- the room page: the host's screen, or a phone joining with #CODE ---- */
function roomPage() {
  const root = document.getElementById('fo'); const R = C.room; const st = load();
  howSheet();
  const codeIn = (location.hash || '').replace(/^#/, '').trim().toUpperCase();
  if (codeIn) return roomJoinPage(codeIn);
  let hostKeys = null; try { hostKeys = JSON.parse(localStorage.getItem('lg.findout.room.host')); } catch (e) {}
  if (hostKeys && hostKeys.code && hostKeys.host_key) return roomHostPage(hostKeys);

  /* the front: run a room, or join one with a code */
  const w = el('section', 'fo-screen');
  w.appendChild(el('h1', 'fo-title', R.title));
  w.appendChild(el('p', 'fo-lede', R.lede));
  const acts = el('div', 'fo-actions'); const run = el('button', 'btn solid', R.run); run.type = 'button'; acts.appendChild(run); w.appendChild(acts);
  const status = el('p', 'fo-status', ''); w.appendChild(status);
  run.addEventListener('click', async () => {
    run.disabled = true; status.textContent = '…';
    const r = await roomApi('/room/new', {});
    if (!r || !r.ok) { status.textContent = C.portrait.send_failed; run.disabled = false; return; }
    const keys = { code: r.code, host_key: r.host_key, tag: r.tag, made: Date.now() };
    try { localStorage.setItem('lg.findout.room.host', JSON.stringify(keys)); } catch (e) {}
    roomHostPage(keys);
  });
  const join = el('div', 'fo-card fo-roomjoin'); join.appendChild(el('b', '', R.join_title));
  const form = el('form', 'fo-codeform'); const inp = el('input', 'fo-search'); inp.placeholder = R.type_code; inp.maxLength = 5; inp.autocapitalize = 'characters'; inp.setAttribute('aria-label', R.type_code); form.appendChild(inp);
  const go = el('button', 'btn solid', R.join); go.type = 'submit'; form.appendChild(go); join.appendChild(form); w.appendChild(join);
  form.addEventListener('submit', (e) => { e.preventDefault(); const c = inp.value.trim().toUpperCase(); if (c) { location.hash = c; roomJoinPage(c); } });
  root.textContent = ''; root.appendChild(w); wireDialogs(w);
}
function roomJoinPage(code) {
  const root = document.getElementById('fo'); const R = C.room; const st = load();
  const w = el('section', 'fo-screen');
  w.appendChild(el('h1', 'fo-title', R.join_title));
  const status = el('p', 'fo-lede', '…'); w.appendChild(status);
  const body = el('div'); w.appendChild(body);
  root.textContent = ''; root.appendChild(w); wireDialogs(w);
  (async () => {
    if (!st.room || st.room.code !== code || st.room.ended) {
      const key = hex(16);
      const r = await roomApi('/room/' + encodeURIComponent(code) + '/join', { key });
      if (!r || !r.ok) { status.textContent = r && r.error === 'full' ? R.full : R.not_found; const a = el('a', 'btn ghost', R.title); a.href = './'; a.addEventListener('click', () => { location.hash = ''; }); body.appendChild(a); return; }
      st.room = { code, tag: r.tag, key, joined: Date.now(), ended: false, done: {} }; save();
    }
    status.textContent = ''; const show = el('div', 'fo-codeshow small'); code.split('').forEach((c) => show.appendChild(el('i', '', c))); status.appendChild(show);
    body.appendChild(el('p', 'fo-quiet fo-roomnotice', R.notice));
    const card = roomJoinCard(); body.appendChild(card);
    body.appendChild(circles(null, '../'));
    body.appendChild(el('p', 'fo-lede', C.home.start_lede));
    roomWatch(code, (s) => { card.update(s); if (s && s.step === 'play' && s.game && !isDone(s.game) && !card.dataset.sent) { card.dataset.sent = '1'; } });
  })();
}
function roomHostPage(keys) {
  const root = document.getElementById('fo'); const R = C.room; root.classList.add('fo-wide');
  const w = el('section', 'fo-screen fo-host');
  root.textContent = ''; root.appendChild(w); wireDialogs(w);
  const link = `${SITE}room/#${keys.code}`;
  let state = null, stop = null, worldCache = {};
  let lastKey = null, lastJoined = 0, lastDone = 0;   /* a new step plays its timeline once; a count changing in it only counts */
  const host = async (action) => { const r = await roomApi('/room/' + encodeURIComponent(keys.code) + '/host', { host_key: keys.host_key, action }); if (r && r.ok && r.state) { state = r.state; draw(); } return r; };
  const world = async (n) => { if (worldCache[n] !== undefined) return worldCache[n]; try { const c = await api('/curve?m=' + (n === 1 ? 'g1.E' : 'g' + n)); worldCache[n] = c && c.n >= c.opens_at ? c : null; } catch (e) { worldCache[n] = null; } return worldCache[n]; };
  const forget = () => { try { localStorage.removeItem('lg.findout.room.host'); } catch (e) {} };
  function header() {
    const top = el('div', 'fo-host-top');
    top.appendChild(el('p', 'meta', R.title));
    const code = el('div', 'fo-codeshow'); keys.code.split('').forEach((c) => code.appendChild(el('i', '', c))); top.appendChild(code);
    top.appendChild(el('p', 'fo-joinline', R.join_line.replace('{code}', keys.code)));
    return top;
  }
  function draw() {
    w.textContent = '';
    if (!state) { w.appendChild(header()); w.appendChild(el('p', 'fo-quiet', '…')); return; }
    const s = state;
    const key = s.step + ':' + (s.game || 0); const fresh = key !== lastKey; lastKey = key;
    const hold = (e) => (fresh ? held(e) : e);
    const joinedFrom = lastJoined, doneFrom = fresh ? 0 : lastDone; lastJoined = s.joined || 0; lastDone = s.done || 0;
    if (s.step === 'lobby') {
      w.appendChild(header());
      const two = el('div', 'fo-host-two'); const qr = qrSvg(link, R.join_line.replace('{code}', keys.code)); if (qr) two.appendChild(hold(qr));
      const side = el('div'); const cnt = side.appendChild(el('p', 'fo-host-count fo-waiting', ''));
      if (s.joined) countIn(cnt, R.here, 'n', s.joined, joinedFrom); else cnt.textContent = R.nobody;   /* counts on each change, pulses while people join */
      if (fresh) sequence([QR_POP, stepPop(qr)], () => w.isConnected, { keepOnScroll: true });   /* the code card is in; the QR pops 100 ms after */
      side.appendChild(el('p', 'fo-quiet', R.play_too));
      const acts = el('div', 'fo-actions'); const start = el('button', 'btn solid', R.start); start.type = 'button'; start.disabled = !s.joined; start.addEventListener('click', () => host('start')); acts.appendChild(start); side.appendChild(acts);
      two.appendChild(side); w.appendChild(two);
      return;
    }
    if (s.step === 'ended') {
      w.appendChild(el('h1', 'fo-title', R.your_room));
      w.appendChild(el('p', 'fo-lede', R.ended));
      const bars = el('div', 'fo-roombars'); const grown = [];
      for (const n of [2, 5, 7, 4, 8]) { const ch = s.charts && s.charts[String(n)]; const row = el('div', 'fo-roombar'); row.appendChild(el('b', '', C.games[n].name)); if (ch && ch.bins) { const b = row.appendChild(roomBandBar(n, ch)); if (fresh) { b.classList.add('fo-unclip'); grown.push(b); } } else row.appendChild(el('span', 'fo-quiet', R.opens_at.replace('{n}', fmt(ch ? ch.n : 0)))); bars.appendChild(row); }
      w.appendChild(bars);
      /* the room's five bars grow one after another */
      if (grown.length) sequence([M.base, (ctl) => { grown.forEach((b, i) => { if (ctl.done) { b.classList.remove('fo-unclip'); return; } b.style.transitionDelay = (i * M.step) + 'ms'; b.classList.add('go'); }); return M.slow + (grown.length - 1) * M.step; }], () => w.isConnected, { keepOnScroll: true });
      const acts = el('div', 'fo-actions'); const again = el('a', 'btn solid', R.another); again.href = './'; again.addEventListener('click', () => forget()); acts.appendChild(again); w.appendChild(acts);
      if (stop) { stop(); stop = null; }
      return;
    }
    /* play or reveal */
    const n = s.game;
    w.appendChild(el('p', 'meta', `${R.title} · ${R.game_of.replace('{n}', String(n))}`));
    w.appendChild(el('h1', 'fo-title', C.games[n].name));
    w.appendChild(circles(n, '../'));
    const count = el('p', 'fo-host-count', ''); w.appendChild(count);
    countIn(count, R.done_of.replace('{joined}', fmt(s.joined)), 'done', s.done, doneFrom);
    count.classList.toggle('fo-waiting', s.step === 'play' && !(s.joined > 0 && s.done >= s.joined));
    if (s.step === 'play') {
      const acts = el('div', 'fo-actions');
      const rev = el('button', 'btn solid', n === 9 ? R.next : R.reveal); rev.type = 'button'; acts.appendChild(rev); w.appendChild(acts);
      const wait = el('p', 'fo-quiet', ''); w.appendChild(wait);
      const tickLock = () => { const left = Math.ceil(((s.reveal_at || 0) - Date.now()) / 1000); const all = s.joined > 0 && s.done >= s.joined; rev.disabled = left > 0 && !all; wait.textContent = all ? R.all_done : (left > 0 ? R.reveal_in.replace('{s}', String(left)) : ''); };
      tickLock(); const lockTimer = setInterval(() => { if (!w.contains(rev)) { clearInterval(lockTimer); return; } tickLock(); }, 1000);
      rev.addEventListener('click', () => host(n === 9 ? 'reveal' : 'reveal'));
    } else {
      const ch = s.charts && s.charts[String(n)];
      const pic = el('div', 'fo-card fo-roompic'); w.appendChild(pic);
      /* the reveal: the room's curve draws, the names and the legend enter, the band bar grows, the line under it enters, then the buttons */
      const steps = [M.base]; let acts = null;
      if (n === 9) pic.appendChild(el('p', 'fo-lede', R.done_of.replace('{done}', fmt(s.done)).replace('{joined}', fmt(s.joined))));
      else if (!ch || !ch.bins) pic.appendChild(el('p', 'fo-lede', R.opens_at.replace('{n}', fmt(ch ? ch.n : 0))));
      else {
        const holder = el('div', 'fo-curve'); pic.appendChild(holder);
        const curve = world(n).then((wc) => { holder.appendChild(roomCurveSvg({ bins: ch.bins, n: ch.n }, wc, n)); if (!fresh || holder.dataset.late) stepDraw(holder)({ done: true }); });
        const names = hold(el('div', 'fo-ends three')); if (n !== 1) C.games[n].bands.forEach((b) => names.appendChild(el('span', '', b.name))); else { names.className = 'fo-ends' + (fresh ? ' fo-hold' : ''); C.games[1].guess.ends.forEach((e) => names.appendChild(el('span', '', e))); } pic.appendChild(names);
        const leg = hold(el('div', 'fo-legend')); leg.appendChild(el('span', 'fo-leg a', `${R.the_room} · ${R.in_picture.replace('{n}', fmt(ch.n))}`)); leg.appendChild(el('span', 'fo-leg b', R.the_world)); pic.appendChild(leg);
        let bar = null, top = null;
        if (n !== 1) { bar = pic.appendChild(roomBandBar(n, ch)); if (fresh) bar.classList.add('fo-unclip'); const t = roomTop(n, ch); if (t) top = pic.appendChild(hold(el('p', 'fo-roomline', R.most.replace('{band}', C.games[n].bands[t.band].name).replace('{pct}', String(t.pct))))); }
        steps.push(() => Promise.race([curve, sleep(2 * M.slow)]), (ctl) => { if (!holder.querySelector('svg')) { holder.dataset.late = '1'; return 0; } return stepDraw(holder, 2 * M.slow)(ctl); },
          stepIn([names, leg]), bar ? (ctl) => { if (ctl.done) bar.classList.remove('fo-unclip'); else bar.classList.add('go'); return M.slow; } : 0, stepIn(top));
      }
      acts = hold(el('div', 'fo-actions'));
      if (n < 9) { const nx = el('button', 'btn solid', R.next_game); nx.type = 'button'; nx.addEventListener('click', () => host('next')); acts.appendChild(nx); }
      const end = el('button', n < 9 ? 'btn ghost' : 'btn solid', R.end); end.type = 'button';
      end.addEventListener('click', () => { if (n === 9) { host('end'); return; } const d = sheet('dlg-end', R.end, `<p>${esc(R.end_sure)}</p><div class="actions"><button class="btn solid" id="end-yes" type="button">${esc(R.end_yes)}</button><button class="btn ghost" type="button" data-close>${esc(R.end_no)}</button></div>`); wireDialogs(d); d.querySelector('#end-yes').addEventListener('click', () => { closeSheet(d); host('end'); }); openSheet(d); });
      acts.appendChild(end); w.appendChild(acts);
      if (fresh) sequence(steps.concat([stepIn(acts)]), () => w.isConnected, { keepOnScroll: true });
    }
  }
  draw();
  stop = roomWatch(keys.code, (s) => { if (!s) { forget(); state = { step: 'ended', charts: {} }; draw(); return; } const changed = JSON.stringify(s) !== JSON.stringify(state); state = s; if (changed) draw(); }, 2000);
}
