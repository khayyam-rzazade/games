/* Logicers, the cards: the page (me/year/year.js, 7 Nov 2026).
   "Your 2026" (?y=2026) and "Your {month}" (?m=2026-12): five to seven screens to swipe, each one a picture drawn on the phone
   (draw.js). The same picture is what Share sends. Nothing leaves the phone except one GET /dist (percentiles over all
   Logicers, nothing about this player), and that only for a year card.
   Works with no code and no server: the numbers come from the phone's own storage (source.js); with no /dist the
   "fewer days than you" screen is simply not there; with no code the last screen offers one (a link to me/).
   Language: the site's one pick (lg.findout.lang), ?lang=xx for a test, the phone's language if nothing was picked, else English.
   Words are in lang/<code>.json; open.js (loaded first by the page) holds the period rules. */
import { draw, plain, W, H, LAST } from './draw.js';
import { buildScreens } from './cards.js';
import { load } from './source.js';

const Y = globalThis.LogicersYear;
const LANG_KEY = 'lg.findout.lang';
const $ = (id) => document.getElementById(id);
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt !== undefined) e.textContent = txt; return e; };
const still = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
const computer = () => { try { return window.matchMedia('(hover: hover) and (pointer: fine)').matches; } catch (e) { return false; } };

/* ------------------------------------------------------------------ the words ------ */
let DICT = {}, EN = {}, LANG = 'en', LOCALE = 'en-GB';
function pickLang() {
  const q = new URLSearchParams(location.search).get('lang');
  if (Y.LANGS.includes(q)) return q;
  try { const v = localStorage.getItem(LANG_KEY); if (Y.LANGS.includes(v)) return v; } catch (e) { /* no storage */ }
  const nav = String((navigator.languages && navigator.languages[0]) || navigator.language || 'en').slice(0, 2).toLowerCase();
  return Y.LANGS.includes(nav) ? nav : 'en';
}
async function strings(code) {
  const r = await fetch(new URL('./lang/' + code + '.json', import.meta.url), { cache: 'no-cache' });
  if (!r.ok) throw new Error('lang ' + code + ' ' + r.status);
  return r.json();
}
/* one after a number: exactly 1 everywhere, also 0 in French, and above 0 up to 2 in Portuguese (the site's own rule, assets/js/lang.js) */
function one(n) { n = Math.abs(Number(n)); if (n === 1) return true; if (LANG === 'fr') return n < 2; if (LANG === 'pt') return n > 0 && n < 2; return false; }
function T(key, vars) {
  let s = typeof DICT[key] === 'string' ? DICT[key] : EN[key];
  if (typeof s !== 'string') { if (window.console) console.warn('Cards: no words for ' + key); return ''; }
  if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
  /* Italian: "il 8" is "l'8", as the rest of the site writes it */
  if (LANG === 'it') s = s.replace(/\b([Ii])l (8|11|8\d)(?!\d)/g, (m, i, n) => (i === 'I' ? 'L' : 'l') + "'" + n);
  return s;
}
const Tn = (n, key, vars) => T(one(n) && typeof (DICT[key + '_1'] ?? EN[key + '_1']) === 'string' ? key + '_1' : key + '_n', vars);
const fmt = (n) => { try { return Number(n).toLocaleString(LOCALE); } catch (e) { return String(n); } };
const upperFirst = (s) => { try { return s.charAt(0).toLocaleUpperCase(LOCALE) + s.slice(1); } catch (e) { return s; } };
function pct(n) {                                      // 50% / %50 / 50 % / 50 % (Turkish, Spanish, French: the language's own way)
  const s = String(n);
  return LANG === 'tr' ? '%' + s : s + (LANG === 'es' ? ' %' : LANG === 'fr' ? ' %' : '%');
}
function date(iso, withYear) {
  try { return new Date(iso + 'T00:00:00Z').toLocaleDateString(LOCALE, { day: 'numeric', month: 'short', year: withYear ? 'numeric' : undefined, timeZone: 'UTC' }); }
  catch (e) { return iso; }
}
const todayISO = () => { const d = new Date(); return Y.iso(d.getFullYear(), d.getMonth() + 1, d.getDate()); };

/* ------------------------------------------------------------------ the page ------ */
let card, screens = [], env, stateOf = [], current = 0, deck, slides = [], thumb, shareBtn, nCards = 0;

function defaultCard() { const open = Y.cardOpen(null); return open || Y.yearCard(Math.max(Y.FIRST_YEAR, new Date().getFullYear())); }

function siteRoot() { return '../../' + (LANG === 'en' ? '' : LANG + '/'); }

function shell() {
  document.documentElement.lang = LANG;
  const name = card.kind === 'year' ? T('cover_year', { y: card.y }) : T('cover_month', { month: env.month(card.ym) });
  document.title = name + ' | Logicers';
  const back = $('yc-back'); back.setAttribute('aria-label', T('back')); back.title = T('back');
  $('yc-home').href = siteRoot();
  $('yc-prev').setAttribute('aria-label', T('prev')); $('yc-next').setAttribute('aria-label', T('next'));
  shareBtn.textContent = T('share');
  deck.setAttribute('aria-label', name);
}

function sampleText(extra) { return Object.values(EN).join('') + Object.values(DICT).join('') + '0123456789%№°ºªáéíóúñçãõâêôàèìòùüöşğıİÇŞĞÖÜ' + extra; }
async function fontsReady(extra) {
  if (!document.fonts || !document.fonts.load) return;
  const s = sampleText(extra);
  try {
    await Promise.all([document.fonts.load('800 64px "Bricolage Grotesque"', s), document.fonts.load('700 64px "Bricolage Grotesque"', s),
      document.fonts.load('700 36px "Figtree"', s), document.fonts.load('800 36px "Figtree"', s)]);
  } catch (e) { /* the system font stands in */ }
}

/* the canvas of slide i, sized for this screen (up to 2 device pixels per css pixel), drawn at moment t */
function paint(i, t) {
  const s = screens[i]; if (!s) return;
  const cv = slides[i].querySelector('canvas'), w = slides[i].clientWidth || 340;
  const scale = Math.min(2, window.devicePixelRatio || 1) * w / W, pw = Math.round(W * scale), ph = Math.round(H * scale);
  if (cv.width !== pw || cv.height !== ph) { cv.width = pw; cv.height = ph; }
  const c = cv.getContext('2d'); c.setTransform(scale, 0, 0, scale, 0, 0);
  draw(c, s, env, t);
  stateOf[i].t = t;
}
function play(i) {
  const st = stateOf[i];
  if (st.played) return;
  st.played = true;
  if (still()) { paint(i, Infinity); return; }
  const t0 = performance.now();
  const tick = (now) => {
    const t = now - t0;
    if (t >= LAST) { paint(i, Infinity); return; }
    paint(i, t); st.raf = requestAnimationFrame(tick);
  };
  st.raf = requestAnimationFrame(tick);
}

function describe(s) { return plain(s, env).join('. '); }

function buildSlides(hasCode) {
  screens.forEach((s, i) => {
    const sec = el('section', 'yc-slide');
    sec.setAttribute('role', 'group'); sec.setAttribute('aria-roledescription', 'page');
    sec.setAttribute('aria-label', T('dot', { n: i + 1, of: nCards }));
    sec.dataset.i = String(i);
    const cv = el('canvas', 'yc-canvas'); cv.setAttribute('aria-hidden', 'true'); cv.width = 8; cv.height = 10;
    sec.appendChild(cv); sec.appendChild(el('p', 'yc-sr', describe(s)));
    deck.appendChild(sec); slides.push(sec); stateOf.push({ t: -1, played: false, raf: 0 });
  });
  if (!hasCode) {
    const sec = el('section', 'yc-slide yc-code');
    sec.setAttribute('role', 'group'); sec.setAttribute('aria-roledescription', 'page'); sec.setAttribute('aria-label', T('dot', { n: nCards, of: nCards }));
    sec.dataset.i = String(screens.length);
    const trio = el('div', 'yc-trio'); ['#2D4FC4', '#D5492F', '#0D7D73'].forEach((col) => { const d = el('i'); d.style.background = col; trio.appendChild(d); });
    const a = el('a', 'btn solid', T('code_btn')); a.href = '../';
    sec.appendChild(trio); sec.appendChild(el('h2', 'yc-code-h', T('code_title'))); sec.appendChild(a);
    deck.appendChild(sec); slides.push(sec);
  }
}

function dots() {
  const box = $('yc-dots'); box.textContent = ''; box.style.setProperty('--n', String(nCards));
  box.setAttribute('aria-label', T('dots_label'));
  for (let i = 0; i < nCards; i++) {
    const b = el('button', 'yc-dot'); b.type = 'button'; b.setAttribute('aria-label', T('dot', { n: i + 1, of: nCards }));
    b.addEventListener('click', () => go(i));
    box.appendChild(b);
  }
  thumb = el('span', 'yc-thumb'); thumb.setAttribute('aria-hidden', 'true'); box.appendChild(thumb);
}
function pitch() { return slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : (slides[0] ? slides[0].offsetWidth : 1); }
function go(i) {
  i = Math.max(0, Math.min(nCards - 1, i));
  deck.scrollTo({ left: i * pitch(), behavior: still() ? 'auto' : 'smooth' });
}
function setCurrent(i) {
  if (i === current && thumb.dataset.set) return;
  current = i; thumb.dataset.set = '1';
  thumb.style.setProperty('--i', String(i));
  $('yc-prev').disabled = i === 0; $('yc-next').disabled = i === nCards - 1;
  shareBtn.disabled = !screens[i];                       // the "keep it on any phone" screen is not a picture to share
  $('yc-dots').querySelectorAll('.yc-dot').forEach((d, k) => d.toggleAttribute('aria-current', k === i));
}
function onScroll() {
  const i = Math.round(deck.scrollLeft / pitch());
  if (i >= 0 && i < nCards) setCurrent(i);
}

/* ------------------------------------------------------------------ share ------ */
function pictureBlob(i) {
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  draw(cv.getContext('2d'), screens[i], env, Infinity);
  return new Promise((resolve) => { try { cv.toBlob((b) => resolve(b || null), 'image/png'); } catch (e) { resolve(null); } });
}
let saveUrl = null;
function saveSheet(blob, name) {
  let dlg = $('yc-save');
  if (!dlg) {
    dlg = el('dialog', 'to-save'); dlg.id = 'yc-save'; dlg.setAttribute('aria-label', T('share'));
    dlg.innerHTML = '<div class="sheet"><button class="chip round close" type="button" id="yc-save-x"></button><img class="shot" id="yc-save-img" alt=""><div class="actions to-save-acts"><a class="btn solid" id="yc-save-a"></a></div></div>';
    document.body.appendChild(dlg);
    $('yc-save-x').addEventListener('click', () => dlg.close());
    dlg.addEventListener('close', () => { if (saveUrl) { URL.revokeObjectURL(saveUrl); saveUrl = null; } });
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  }
  if (saveUrl) URL.revokeObjectURL(saveUrl);
  saveUrl = URL.createObjectURL(blob);
  $('yc-save-x').textContent = '×'; $('yc-save-x').setAttribute('aria-label', T('close'));
  const img = $('yc-save-img'); img.src = saveUrl; img.alt = describe(screens[current]);
  const a = $('yc-save-a'); a.href = saveUrl; a.setAttribute('download', name); a.textContent = T('save_picture');
  dlg.showModal();
}
function shareText() {
  return card.kind === 'year' ? T('share_text_year', { y: card.y }) : T('share_text_month', { month: env.month(card.ym) });
}
async function share() {
  const i = current; if (!screens[i] || shareBtn.getAttribute('aria-busy') === 'true') return;
  shareBtn.setAttribute('aria-busy', 'true');
  try {
    const blob = await pictureBlob(i), note = $('yc-note');
    if (!blob) { note.textContent = T('share_failed'); return; }
    note.textContent = '';
    const name = 'my-logicers-' + card.id + '-' + (i + 1) + '.png';
    let file = null; try { file = new File([blob], name, { type: 'image/png' }); } catch (e) { file = null; }
    if (file && !computer() && navigator.canShare && navigator.share) {
      let ok = false; try { ok = navigator.canShare({ files: [file] }); } catch (e) { ok = false; }
      if (ok) {
        try { await navigator.share({ files: [file], text: shareText() }); return; }
        catch (e) { if (e && e.name === 'AbortError') return; /* anything else: the sheet below */ }
      }
    }
    saveSheet(blob, name);
  } finally { shareBtn.removeAttribute('aria-busy'); }
}

/* ------------------------------------------------------------------ start ------ */
function empty() {
  deck.hidden = true; $('yc-nav').hidden = true; shareBtn.parentElement.hidden = true;
  const box = $('yc-empty'); box.hidden = false; box.textContent = '';
  box.appendChild(el('p', 'yc-empty-p', T('empty')));
  const a = el('a', 'btn solid', T('play')); a.href = siteRoot(); box.appendChild(a);
}

async function main() {
  LANG = pickLang(); LOCALE = Y.LOCALE[LANG];
  deck = $('yc-deck'); shareBtn = $('yc-share');
  try { EN = await strings('en'); DICT = LANG === 'en' ? EN : await strings(LANG); } catch (e) { DICT = EN; }
  card = Y.parse(location.search) || defaultCard();
  env = { T, Tn, fmt, pct, date, lang: LANG, card, month: (ym) => Y.monthName(ym, LANG), logicer: 0,
          tag: card.kind === 'year' ? String(card.y) : upperFirst(Y.monthName(card.ym, LANG)) + ' ' + card.y };
  shell();
  const src = await load(Y.period(card), true, { name: (id) => DICT['game_' + id] || EN['game_' + id] || '' });
  if (!src.ok || !src.stats || !(src.stats.days > 0)) { empty(); document.body.dataset.ready = 'empty'; return; }
  env.logicer = src.stats.logicer;
  screens = buildScreens(src.stats, { card, dist: src.dist, today: todayISO() });
  nCards = screens.length + (src.hasCode ? 0 : 1);
  buildSlides(src.hasCode); dots();
  /* the pictures wait for the fonts, but not for long: after 2.5 s they are drawn in the phone's own font and drawn again when the fonts arrive */
  const fontsP = fontsReady(screens.map((s) => (s.best ? s.best.name : '') + (s.line ? JSON.stringify(s.line.vars) : '')).join(''));
  const late = await Promise.race([fontsP.then(() => false), new Promise((r) => setTimeout(() => r(true), 2500))]);
  if (late) fontsP.then(() => screens.forEach((s, i) => { if (stateOf[i].t !== -1) paint(i, stateOf[i].played ? Infinity : 0); }));

  /* a screen is drawn (still empty) when it is near, and plays when it is mostly in view */
  const near = new IntersectionObserver((es) => es.forEach((e) => {
    const i = Number(e.target.dataset.i);
    if (e.isIntersecting && screens[i] && stateOf[i].t === -1) paint(i, still() ? Infinity : 0);
  }), { root: deck, rootMargin: '0px 60% 0px 60%' });
  const seen = new IntersectionObserver((es) => es.forEach((e) => {
    const i = Number(e.target.dataset.i);
    if (e.isIntersecting && e.intersectionRatio >= .6 && screens[i]) { if (stateOf[i].t === -1) paint(i, 0); play(i); }
  }), { root: deck, threshold: [.6] });
  slides.forEach((sl) => { near.observe(sl); seen.observe(sl); });

  deck.addEventListener('scroll', () => { if (!onScroll.queued) { onScroll.queued = true; requestAnimationFrame(() => { onScroll.queued = false; onScroll(); }); } }, { passive: true });
  deck.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
  });
  $('yc-prev').addEventListener('click', () => go(current - 1));
  $('yc-next').addEventListener('click', () => go(current + 1));
  shareBtn.addEventListener('click', share);
  let rz = 0;
  window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { screens.forEach((s, i) => { if (stateOf[i].t !== -1) paint(i, stateOf[i].played ? Infinity : 0); }); go(current); }, 150); });
  setCurrent(0);
  document.body.dataset.ready = '1';
}
main().catch((e) => { if (window.console) console.error(e); document.body.dataset.ready = 'error'; });
