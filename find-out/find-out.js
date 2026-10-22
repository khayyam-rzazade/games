/* Find out about yourself: the one script of the section (B1, 21 Oct 2026).
   Pages: find-out/ (the section's home), find-out/<game>/ (one page per game) and find-out/portrait/.
   Every word a player reads comes from data.js, which is generated from the copy doc and the item sheet;
   the scoring comes from scoring.js (rules version 1). Answers stay in this browser until the player says
   yes on the consent card; only then does anything with an ID leave the phone (POST /upload). Before that
   the page asks the server three harmless things: where the phone is (GET /hello, no ID, nothing stored),
   the world's curve (GET /curve, public) and the funnel counters (POST /counter, no ID). */
import { ITEMS, COPY, COUNTRIES, PORTRAIT } from './data.js?v=d6d30fb434';
import { scoreGame, RULES_VERSION } from './scoring.js?v=fe71806751';

const API = window.FINDOUT_API || 'https://logicers-findout.rza-khay.workers.dev';
const TURNSTILE_SITE_KEY = window.FINDOUT_TURNSTILE || '';   /* empty: sent without a Turnstile token (the trial) */
const TRIAL = window.FINDOUT_TRIAL !== undefined ? !!window.FINDOUT_TRIAL : true;
const STORE_KEY = 'lg.findout.v1';
const SLUG = { 1: 'type', 2: 'shots', 3: 'sunny', 4: 'kid', 5: 'story', 6: 'twice', 7: 'believe', 8: 'home', 9: 'quick' };
const ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const SECONDS = { 1: 40, 2: 25, 3: 30, 4: 15, 5: 25, 6: 45, 7: 30, 8: 25, 9: 30 };
const NEEDS_COUNTRY = { 2: true, 7: true, 8: true, 9: true };
const ITEM_VERSION = 1;              /* English, wave 1; translations get their own version (D22) */
const RETAKE_DAYS = 90;
const G = Object.fromEntries(ITEMS.map((g) => [g.number, g]));
const C = COPY;

/* ------------------------------------------------------------------ storage ------ */
function hex(n) { const a = new Uint8Array(n); crypto.getRandomValues(a); return [...a].map((x) => x.toString(16).padStart(2, '0')).join(''); }
function fresh() { return { v: 1, id: hex(16), created: new Date().toISOString(), header_country: null, country: null, country_asked: false, games: {}, consent: { status: null, version: null, at: null }, uploaded: {}, code: null, demographics: null, funnel: {}, done_order: [] }; }
let S = null;
function load() {
  if (S) return S;
  try { const raw = localStorage.getItem(STORE_KEY); S = raw ? JSON.parse(raw) : null; } catch (e) { S = null; }
  if (!S || S.v !== 1 || !S.id) S = fresh();
  return S;
}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* a full or blocked store: the game still plays */ } }
function wipe() { S = fresh(); try { localStorage.removeItem(STORE_KEY); } catch (e) {} }

/* ------------------------------------------------------------------ helpers ------ */
function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined && text !== null) e.textContent = String(text); return e; }
function h(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function fmt(n) { try { return Number(n).toLocaleString('en-US'); } catch (e) { return String(n); } }
function pctWord(t, pct) { return t.replace('{pct}', String(pct)); }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const reduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

async function api(path, body, opts) {
  const o = Object.assign({ method: body ? 'POST' : 'GET', headers: {} }, opts || {});
  if (body) { o.headers['Content-Type'] = 'application/json'; o.body = JSON.stringify(body); }
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), o.timeout || 8000); o.signal = ctl.signal;
  try {
    const r = await fetch(API + path, o);
    clearTimeout(t);
    if (!r.ok) throw new Error('http ' + r.status);
    return await r.json();
  } catch (e) { clearTimeout(t); throw e; }
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
function playerCountry() {
  const st = load();
  const iso = st.country && st.country !== 'not said' ? st.country : st.header_country;
  return countryOf(iso);
}
function fill(text) {
  const c = playerCountry();
  return text
    .replace(/\[Parliament\]/g, parliamentName(c))
    .replace(/\[Country\]/g, c ? c.name : 'your country')
    .replace(/\[Nationals\]/g, c ? c.nationals.replace(/^the /i, '') : 'people from your country')
    .replace(/\[Nationality\]/g, c ? c.nationality : 'from your country');
}
async function hello() {
  const st = load();
  if (st.header_country !== null || st.hello_failed) return;
  try { const r = await api('/hello'); st.header_country = (r && typeof r.country === 'string' && countryOf(r.country)) ? r.country : ''; }
  catch (e) { st.hello_failed = true; }
  save();
}

/* ------------------------------------------------------------------ dialogs ------ */
function wireDialogs(root) {
  root.querySelectorAll('[data-open]').forEach((b) => b.addEventListener('click', () => { const d = document.getElementById(b.dataset.open); if (d && d.showModal) d.showModal(); }));
  root.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => b.closest('dialog').close()));
}
function sheet(id, title, bodyHtml) {
  let d = document.getElementById(id);
  if (!d) { d = h(`<dialog id="${id}" aria-labelledby="${id}-t"><div class="sheet"><button class="chip round close" type="button" data-close aria-label="Close">×</button><h2 id="${id}-t"></h2><div class="sheet-body"></div></div></dialog>`); document.body.appendChild(d); wireDialogs(d); }
  d.querySelector('h2').textContent = title;
  d.querySelector('.sheet-body').innerHTML = bodyHtml;
  return d;
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
  const w = el('div', 'fo-circles');
  for (const n of ORDER) {
    const a = el('a', isDone(n) ? 'done' : (n === current ? 'now' : ''), n);
    a.href = `${base === undefined ? '../' : base}${SLUG[n]}/`; a.setAttribute('aria-label', `Game ${n}: ${C.games[n].name}${isDone(n) ? ', done' : ''}`);
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
  dot.style.left = (opts.p * 100) + '%';
  w.appendChild(rail);
  if (opts.guess !== undefined && opts.guess !== null) { const ring = el('div', 'fo-strip-dot ring still'); ring.style.left = (opts.guess * 100) + '%'; ring.setAttribute('aria-hidden', 'true'); w.appendChild(ring); }
  w.appendChild(dot);
  if (opts.drag) {
    let active = false;
    const set = (clientX, done) => {
      const r = w.getBoundingClientRect(); let p = (clientX - r.left) / r.width; p = Math.min(1, Math.max(0, p));
      if (opts.snap) p = Math.round(p * opts.snap) / opts.snap;
      dot.style.left = (p * 100) + '%'; opts.drag(p, done);
    };
    w.addEventListener('pointerdown', (e) => { active = true; dot.classList.add('drag'); w.setPointerCapture(e.pointerId); set(e.clientX, false); });
    w.addEventListener('pointermove', (e) => { if (active) set(e.clientX, false); });
    const up = (e) => { if (!active) return; active = false; dot.classList.remove('drag'); set(e.clientX, true); };
    w.addEventListener('pointerup', up); w.addEventListener('pointercancel', up);
    dot.tabIndex = 0; dot.setAttribute('role', 'slider'); dot.setAttribute('aria-valuemin', '0'); dot.setAttribute('aria-valuemax', '100');
    dot.addEventListener('keydown', (e) => {
      let p = parseFloat(dot.style.left) / 100; const step = opts.snap ? 1 / opts.snap : 0.05;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') p -= step; else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') p += step; else return;
      e.preventDefault(); p = Math.min(1, Math.max(0, p)); dot.style.left = (p * 100) + '%'; opts.drag(p, true);
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

  function show(node) { root.textContent = ''; root.appendChild(node); wireDialogs(node); window.scrollTo({ top: 0, behavior: 'instant' }); }
  function nav(count, i) { const p = el('div', 'fo-progress'); for (let k = 0; k < count; k++) p.appendChild(el('i', k < i ? 'on' : '')); return p; }

  /* ---- 1. the game card ---- */
  function card() {
    const done = isDone(n);
    const w = el('section', 'fo-screen');
    w.appendChild(circles(n));
    w.appendChild(el('h1', 'fo-title', cg.name));
    w.appendChild(el('p', 'fo-lede', cg.start_line));
    w.appendChild(el('p', 'fo-quiet', cg.instruction));
    w.appendChild(el('p', 'fo-promise', C.shared.card_line.replace('Game 3 of 9', `Game ${n} of 9`)));
    const acts = el('div', 'fo-actions fo-bottom');
    const b = el('button', 'btn solid', done ? 'See my result' : (play ? 'Carry on' : 'Start')); b.type = 'button';
    b.addEventListener('click', () => done ? reveal(st.games[n]) : begin());
    acts.appendChild(b); w.appendChild(acts);
    helpSheet();
    return w;
  }
  function helpSheet() {
    const lines = [esc(cg.help)];
    const pub = ig.published_instruction || (ig.sheet_notes && ig.sheet_notes['Published lead-in']);
    if (pub) lines.push('<span class="quiet">' + esc(pub.replace(/^"|"$/g, '')) + '</span>');
    lines.push('<span class="quiet" data-privacy="findout">Your answers stay on this phone until you say so at the end. Nothing is sent before that.</span>');
    sheet('dlg-help', cg.name, lines.map((l) => `<p>${l}</p>`).join(''));
  }

  function begin() {
    if (NEEDS_COUNTRY[n] && !st.country_asked) return countryTap();
    if (!play) { play = { started: Date.now(), answers: {}, times: {}, positions: {}, order: shuffledKeys(), guess: null }; st.games[n] = play; save(); }
    if (cg.guess && play.guess === null) return guess();
    items(0);
  }
  function keyOf(it) { if (n === 7 && it.filler) return 'grandmother'; return String(it.id !== undefined ? it.id : (it.position !== undefined ? it.position : it.n)); }
  function shuffledKeys() {
    const keys = ig.items.map(keyOf);
    if (n === 7) { const eu = !!(playerCountry() && playerCountry().eu); return keys.filter((k) => k !== 'B11' || eu); }
    if (n === 9) return ['1', '2', '4', '5', '6', '7', '8', '9', '3'];     /* the long society ladder last (K, 22 Oct) */
    return (n === 2 || n === 5) ? shuffle(keys) : keys;
  }

  /* ---- the country tap, before the first game that needs a country ---- */
  function countryTap() {
    const ct = C.games[2].country_tap;
    const hc = countryOf(st.header_country);
    const w = el('section', 'fo-screen');
    const finish = (iso) => { st.country = iso; st.country_asked = true; save(); begin(); };
    if (hc) {
      w.appendChild(el('h1', 'fo-title', `Are you ${hc.nationality}?`));
      const acts = el('div', 'fo-choices two');
      const yes = el('button', 'btn ghost', ct.yes); yes.type = 'button'; yes.addEventListener('click', () => finish(hc.iso));
      const no = el('button', 'btn ghost', ct.no); no.type = 'button'; no.addEventListener('click', () => show(whereFrom()));
      acts.appendChild(yes); acts.appendChild(no); w.appendChild(acts);
      show(w);
    } else show(whereFrom());
    function whereFrom() {
      const v = el('section', 'fo-screen');
      v.appendChild(el('h1', 'fo-title', ct.where));
      v.appendChild(el('p', 'fo-quiet', ct.optional));
      const skip = el('button', 'chip', ct.skip); skip.type = 'button'; skip.style.marginTop = '10px';
      skip.addEventListener('click', () => finish('not said'));
      v.appendChild(skip);
      const box = el('input', 'fo-search'); box.type = 'search'; box.placeholder = 'Type the first letters'; box.setAttribute('aria-label', 'Find your country'); box.autocomplete = 'off';
      v.appendChild(box);
      const list = el('ul', 'fo-countries');
      box.addEventListener('input', () => { const q = box.value.trim().toLowerCase(); list.querySelectorAll('li').forEach((li) => { li.hidden = !!q && !li.dataset.name.includes(q); }); });
      const sorted = COUNTRIES.slice().sort((a, b) => a.name.localeCompare(b.name));
      const top = hc ? [hc] : [];
      for (const c of top.concat(sorted.filter((c) => !hc || c.iso !== hc.iso))) {
        const li = el('li'); li.dataset.name = (c.name + ' ' + c.nationals + ' ' + c.nationality).toLowerCase(); const b = el('button', top.includes(c) ? 'top' : ''); b.type = 'button';
        b.appendChild(el('span', 'flag', c.flag)); b.appendChild(el('span', '', c.name));
        b.addEventListener('click', () => finish(c.iso)); li.appendChild(b); list.appendChild(li);
      }
      v.appendChild(list);
      return v;
    }
  }

  /* ---- 2. the guess ---- */
  function guess() {
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
    const s = strip({ p, bands: !!(cg.bands && n !== 6), snap: n === 6 ? 4 : 0, drag: (np, done) => { p = np; moved = true; s.dot.classList.remove('bob'); read.textContent = guessWord(np); go.disabled = false; } });
    s.dot.classList.add('bob');
    low.appendChild(s); low.appendChild(ends(names)); low.appendChild(read);
    w.appendChild(low);
    const acts = el('div', 'fo-actions');
    const go = el('button', 'btn solid', 'That is my guess'); go.type = 'button'; go.disabled = true;
    go.addEventListener('click', () => { play.guess = { p, value: n === 6 ? Math.round(p * 4) : toScale(n, p) }; save(); items(0); });
    acts.appendChild(go); low.appendChild(acts);
    show(w);
    function guessWord(p) {
      if (n === 6) { const k = Math.round(p * 4); return k === 0 ? cg.guess.ends[0] : k === 4 ? cg.guess.ends[1] : `${k} of 4`; }
      if (n === 1) return `${Math.round(toScale(1, p))} of 5`;
      return bandName(n, toScale(n, p));
    }
  }

  /* ---- 3. one item per screen ---- */
  function itemByKey(k) { return ig.items.find((it) => keyOf(it) === k); }
  function items(i) {
    const keys = play.order;
    if (i >= keys.length) return afterItems();
    const k = keys[i]; const it = itemByKey(k);
    const w = el('section', 'fo-screen fo-itemscreen');
    const top = el('div', 'fo-itemtop');
    const meta = el('p', 'meta', ''); meta.appendChild(el('b', '', cg.name)); meta.appendChild(document.createTextNode(`${i + 1} of ${keys.length}`)); top.appendChild(meta);
    const skip = el('button', 'chip fo-skip', C.shared.skip); skip.type = 'button'; top.appendChild(skip);
    w.appendChild(top);
    w.appendChild(nav(keys.length, i));
    const instr = ig.instruction_ours || cg.instruction;
    const mid = el('div', 'fo-mid');
    if (n !== 4) mid.appendChild(el('p', 'fo-quiet', instr));
    if (ig.stem) mid.appendChild(el('p', 'fo-stem', ig.stem));
    const text = n === 4 ? instr : itemText(it);
    const tt = el('h1', 'fo-item' + (text.length > 120 ? ' long' : ''), text);
    mid.appendChild(tt);
    w.appendChild(mid);
    const shown = Date.now();
    play.positions[k] = i;
    const answer = (value) => { play.answers[k] = value; play.times[k] = Date.now() - shown; save(); setTimeout(() => items(i + 1), value === null ? 0 : (reduced() ? 120 : 420)); };
    skip.addEventListener('click', () => answer(null));
    const low = el('div', 'fo-bottom fo-controls');
    low.appendChild(control(it, k, answer));
    const bar = el('div', 'fo-nav');
    const back = el('button', 'chip', '‹ ' + C.shared.back); back.type = 'button'; back.disabled = i === 0; back.addEventListener('click', () => items(i - 1));
    bar.appendChild(back); low.appendChild(bar);
    w.appendChild(low);
    show(w);
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
        b.setAttribute('aria-label', pt.label ? `${pt.label}` : `${pt.value} of ${outOf}`);
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
        const b = el('button', 'btn ghost' + (prev === o.value ? ' on' : ''), o.label); b.type = 'button';
        b.addEventListener('click', () => { row.querySelectorAll('.btn').forEach((x) => x.classList.remove('on')); b.classList.add('on'); answer(o.value); });
        row.appendChild(b);
      }
      wrap.appendChild(row); wrap.appendChild(read); return wrap;
    };
    if (n === 1) return dots(ig.response_points, true, 5, (pt) => `${pt.label} · ${pt.value} of 5`);
    if (n === 2) { const pts = ig.response_points.map((p, i) => ({ value: p.value, label: p.label || cg.scale_words[i - 1] })); return dots(pts, true, 5, (pt) => `${pt.label} · ${pt.value} of 5`); }
    if (n === 3) return dots(ig.response_points, true, 4, (pt) => pt.label);
    if (n === 8) return dots(ig.response_points_ISSP_codes.map((p) => ({ value: p.code, label: p.label })), true, 5, (pt) => pt.label);
    if (n === 5) return dots(ig.response_points.map((p) => Object.assign({ num: p.percent + '%' }, p)), false, 10, (pt) => `${pt.percent}% · ${pt.label}`);
    if (n === 7) { const pts = []; for (let v = 0; v <= 10; v++) pts.push({ value: v, label: v === 0 ? ig.response_points[0].label : v === 10 ? ig.response_points[1].label : null, num: v }); return dots(pts, false, 10, (pt) => `${pt.value} of 10`); }
    if (n === 4) return choices(it.options.map((o) => ({ value: o, label: o })), 'two');
    if (n === 6) {
      if (!play.option_order) play.option_order = {};
      if (!play.option_order[k]) { play.option_order[k] = shuffle([it.correct, it.lure, ...it.other_wrong]); save(); }
      return choices(play.option_order[k].map((o) => ({ value: o, label: o })));
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
          b.appendChild(el('b', '', v)); b.appendChild(el('span', '', v === 10 ? (String(it.n) === '2' ? 'the best possible life' : 'the best off') : v === lo ? (String(it.n) === '2' ? 'the worst possible life' : 'the worst off') : ''));
          b.addEventListener('click', () => { lad.querySelectorAll('button').forEach((x) => x.classList.remove('on')); b.classList.add('on'); read.textContent = `step ${v}`; answer(v); });
          lad.appendChild(b);
        }
        wrap.appendChild(lad); wrap.appendChild(read); return wrap;
      }
      const m = sc.match(/^0 "(.+?)" – 10 "(.+?)"$/);
      const pts = []; for (let v = 0; v <= 10; v++) pts.push({ value: v, label: v === 0 ? (m ? m[1] : '0') : v === 10 ? (m ? m[2] : '10') : null, num: v });
      return dots(pts, false, 10, (pt) => `${pt.value} of 10`);
    }
    return wrap;
  }

  /* ---- after the last item: the riddles' extra tap, then the score ---- */
  function afterItems() {
    if (n === 6 && play.seen_before === undefined) {
      const w = el('section', 'fo-screen');
      w.appendChild(el('h1', 'fo-title', cg.seen_before.question));
      const row = el('div', 'fo-choices two');
      cg.seen_before.options.forEach((o) => { const b = el('button', 'btn ghost', o); b.type = 'button'; b.addEventListener('click', () => { play.seen_before = o === 'Yes'; save(); afterItems(); }); row.appendChild(b); });
      const skip = el('button', 'chip', C.shared.skip); skip.type = 'button'; skip.style.marginTop = '12px'; skip.addEventListener('click', () => { play.seen_before = null; save(); afterItems(); });
      w.appendChild(row); w.appendChild(skip); show(w); return;
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
    if (result.scored !== false) { counter('game_' + n); if (doneGames().length === 9) counter('all_nine'); }
    if (st.consent.status === 'yes') uploadLater();
    reveal(play);
  }

  /* ---- 4. the reveal ---- */
  function reveal(g) {
    const res = g.result;
    const w = el('section', 'fo-screen fo-reveal');
    const circ = circles(n); const mine = circ.querySelectorAll('a')[n - 1]; if (mine && mine.classList.contains('done')) mine.classList.add('fresh');
    w.appendChild(circ);
    w.appendChild(el('p', 'meta', cg.name));
    if (!res || res.scored === false) {
      w.appendChild(el('h1', 'fo-title', C.shared.not_scored));
      const acts = el('div', 'fo-actions');
      const again = el('button', 'btn solid', 'Play it again'); again.type = 'button';
      again.addEventListener('click', () => { delete st.games[n]; play = null; save(); begin(); });
      acts.appendChild(again); w.appendChild(acts);
      w.appendChild(onward()); show(w); return;
    }
    const score = mainScore(n, res);
    if (n === 9) {
      w.appendChild(el('h1', 'fo-title', 'Your nine answers'));
      const list = el('div', 'fo-bars');
      for (const it of G[9].items) {
        const k = String(it.n); const v = res.items[k];
        const row = el('div', 'fo-bar' + (v === null ? ' skip' : ''));
        row.appendChild(el('b', '', dialName(k)));
        const rail = el('div', 'rail'); const fillEl = el('div', 'fill'); rail.appendChild(fillEl); row.appendChild(rail);
        const [lo, hi] = k === '3' ? [1, 10] : k === '5' ? [1, 4] : k === '9' ? [1, 2] : [0, 10];
        const p = v === null ? 0 : (k === '5' ? (4 - v) / 3 : k === '9' ? (v === 1 ? 1 : 0) : (v - lo) / (hi - lo));
        requestAnimationFrame(() => setTimeout(() => { fillEl.style.width = (p * 100) + '%'; }, 60));
        row.appendChild(el('small', '', v === null ? C.shared.skipped : dialWord(k, v)));
        list.appendChild(row);
        if (v !== null) curveLine(w, `g9.${k}`, v, cg.comparison[k], row, k !== '1');
      }
      w.appendChild(list);
    } else if (n === 1) {
      w.appendChild(el('h1', 'fo-title', 'Your five bars'));
      const bars = el('div', 'fo-bars');
      const traitOf = { Outgoing: 'E', Warm: 'A', Organised: 'C', Calm: 'calm', Curious: 'O' };
      for (const bar of cg.bars) {
        const key = traitOf[bar.name]; const v = key === 'calm' ? res.calm : res.traits[key];
        const row = el('div', 'fo-bar' + (v === null ? ' skip' : ''));
        row.appendChild(el('b', '', bar.name));
        const rail = el('div', 'rail'); const fillEl = el('div', 'fill'); rail.appendChild(fillEl);
        if (bar.name === 'Outgoing' && g.guess) { const ring = el('div', 'ring'); ring.style.left = (toP(1, g.guess.value) * 100) + '%'; rail.appendChild(ring); }
        row.appendChild(rail);
        row.appendChild(el('small', '', v === null ? C.shared.skipped : (v >= 3 ? bar.high : bar.low)));
        bars.appendChild(row);
        requestAnimationFrame(() => setTimeout(() => { fillEl.style.width = (v === null ? 0 : toP(1, v) * 100) + '%'; }, 60));
        if (v !== null) curveLine(w, `g1.${key}`, v, cg.comparison[bar.name], row, bar.name !== 'Outgoing');
      }
      w.appendChild(bars);
      if (g.guess && res.traits.E !== null) w.appendChild(h(`<p class="fo-guessline">${esc(C.shared.you_guessed)} <b>${Math.round(g.guess.value)} of 5</b> · ${esc(C.shared.you_landed)} <b>${Math.round(res.traits.E)} of 5</b></p>`));
    } else {
      const bi = bandIndex(n, score); const band = cg.bands[bi];
      const names = cg.bands.map((b) => b.name);
      const gp = g.guess ? (n === 6 ? 1 - g.guess.value / 4 : g.guess.p) : null;
      const s = strip({ p: gp === null ? toP(n, score) : gp, bands: true, guess: gp });
      w.appendChild(s); w.appendChild(ends(names));
      requestAnimationFrame(() => setTimeout(() => { s.dot.style.left = (toP(n, score) * 100) + '%'; }, 80));
      w.appendChild(el('h1', 'fo-bandname pop', band.name));
      const lines = el('div', 'fo-lines'); band.lines.forEach((l) => lines.appendChild(el('p', '', l))); w.appendChild(lines);
      if (g.guess) {
        if (n === 6) w.appendChild(h(`<p class="fo-guessline">${esc(C.shared.you_guessed)} <b>${g.guess.value} would catch you</b> · <b>${4 - res.score} did</b></p>`));
        else w.appendChild(h(`<p class="fo-guessline">${esc(C.shared.you_guessed)} <b>${esc(bandName(n, g.guess.value))}</b> · ${esc(C.shared.you_landed)} <b>${esc(band.name)}</b></p>`));
      }
      if (n === 6) {
        const ul = el('ul', 'fo-expl');
        G[6].items.forEach((it, i) => { const li = el('li'); const code = res.codes[String(it.n)]; li.appendChild(el('span', 'mark' + (code === 'correct' ? ' ok' : ''), code === 'correct' ? '✓' : code === 'skipped' ? '–' : '✗')); li.appendChild(el('span', '', cg.explanations[i])); ul.appendChild(li); });
        w.appendChild(ul);
      }
      const metric = n === 6 ? 'g6' : `g${n}`;
      curveLine(w, metric, n === 6 ? res.score : score, cg.comparison);
    }
    if (st.consent.status !== 'yes') w.appendChild(el('p', 'fo-locked', C.shared.locked));
    w.appendChild(h(`<div class="fo-fact quiet"><b>${esc(C.shared.looked_at)}</b>${esc(cg.looked_at)}</div>`));
    w.appendChild(h(`<div class="fo-fact"><b>${esc(C.shared.teaching)}</b>${esc(cg.dyk)}</div>`));
    w.appendChild(h(`<div class="fo-fact"><b>${esc(C.shared.myth)}</b>${esc(cg.myth)}</div>`));
    w.appendChild(h(`<p class="fo-fact quiet"><a href="../researchers/#game-${n}">${esc(C.shared.read_study)}</a></p>`));
    w.appendChild(onward());
    show(w);
  }
  function dialName(k) { return { 1: 'Risk', 2: 'Your life', 3: 'Your place', 4: 'Trust in people', 5: 'Politics', 6: 'Democracy', 7: 'Newcomers', 8: 'Left–right', 9: 'Direction' }[k]; }
  function dialWord(k, v) {
    const it = G[9].items.find((x) => String(x.n) === k);
    if (k === '5' || k === '9') return it.scale.split(' · ')[v - 1];
    if (k === '2' || k === '3') return `step ${v}`;
    return `${v} of 10`;
  }
  function onward() {
    const acts = el('div', 'fo-actions');
    const nx = nextGame(n);
    const a = el('a', 'btn solid', nx ? C.shared.next_game : C.shared.see_portrait);
    a.href = nx ? `../${SLUG[nx]}/` : '../portrait/';
    acts.appendChild(a);
    const all = el('a', 'btn ghost', 'All games'); all.href = '../'; acts.appendChild(all);
    return acts;
  }

  /* the world's curve under a result: public, no ID; the country's after the yes */
  async function curveLine(w, metric, value, template, anchor, quietWait) {
    const box = el('div', 'fo-curve' + (anchor ? ' inline' : ''));
    const svgWrap = el('div'); box.appendChild(svgWrap);
    const line = el('p', 'fo-curve-line', ''); box.appendChild(line);
    if (anchor) anchor.after(box); else w.appendChild(box);
    try {
      const r = await api('/curve?m=' + encodeURIComponent(metric));
      if (!r || !r.n || r.n < r.opens_at) { line.className = 'fo-curve-line fo-curve-wait'; line.textContent = quietWait ? '' : `${fmt(r ? r.n : 0)} so far · opens at ${r ? r.opens_at : 30}`; }
      else { svgWrap.appendChild(curveSvg(r, value)); line.textContent = pctWord(template, pctOf(metric, r, value)); }
      if (pendingUpload) await pendingUpload;
      if (st.consent.status === 'yes' && st.uploaded.at && st.country && st.country !== 'not said') {
        try {
          const c = await api('/pool', { id: st.id, m: metric, pool: { country: st.country } });
          const cn = countryOf(st.country);
          if (c && c.n >= c.opens_at) { const cp = pctOf(metric, c, value); box.appendChild(el('p', 'fo-curve-line', pctWord(template, cp).replace('the world', `people from ${cn.name}`))); }
          else if (c) box.appendChild(el('p', 'fo-curve-wait', `${cn.name}: ${fmt(c.n)} so far · opens at ${c.opens_at}`));
        } catch (e) { /* the pools are extra; the world's line already stands */ }
      }
    } catch (e) { line.className = 'fo-curve-line fo-curve-wait'; line.textContent = C.shared.curve_waiting; }
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
    return h(`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Where you stand among ${fmt(r.n)} people"><path class="draw" d="${d}" fill="var(--tint)" stroke="var(--c)" stroke-width="2" stroke-linejoin="round"/><line x1="${x.toFixed(1)}" y1="4" x2="${x.toFixed(1)}" y2="${H - 4}" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/><circle cx="${x.toFixed(1)}" cy="8" r="5" fill="var(--c)"/></svg>`);
  }

  show(card());
}

/* ------------------------------------------------------------------ upload ------ */
function batch() {
  const st = load();
  const games = [];
  for (const n of ORDER) {
    const g = st.games[n]; if (!g || !g.result) continue;
    const answers = [];
    for (const k of g.order) answers.push({ item: `${n}:${k}`, v: ITEM_VERSION, value: k in g.answers ? g.answers[k] : null, skipped: !(k in g.answers) || g.answers[k] === null, ms: g.times[k] ?? null, pos: g.positions[k] ?? null, opts: g.option_order && g.option_order[k] ? g.option_order[k] : null });
    games.push({ game: n, wave: 1, answers, guess: g.guess, started: g.started, finished: g.finished, duration_ms: g.duration_ms, order_index: st.done_order.indexOf(n), result: g.result, rules_version: g.rules_version, seen_before: g.seen_before === undefined ? null : g.seen_before });
  }
  return {
    id: st.id, trial: TRIAL, consent: st.consent,
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
  w.appendChild(el('p', 'fo-lede', C.home.start_lede));
  w.appendChild(circles(null, ''));
  if (done > 0 && done < 9) w.appendChild(el('p', 'fo-count', `${done} of 9 done · about ${minutesLeft()} ${minutesLeft() === 1 ? 'minute' : 'minutes'} left`));
  const acts = el('div', 'fo-actions');
  const nx = nextGame(null);
  const start = el('a', 'btn solid', done === 0 ? C.home['Start button'] : nx ? C.home['Returning player, nothing done yet'] : C.shared.see_portrait);
  start.href = nx ? `${SLUG[nx]}/` : 'portrait/';
  acts.appendChild(start); w.appendChild(acts);
  if (done >= 2 && st.consent.status === null) w.appendChild(consentCard(() => { homePage(); }, { imgBase: '../' }));
  w.appendChild(el('h2', 'fo-card-h', C.home['Pick-any-game list heading'])).style.cssText = 'margin-top:22px;font-family:var(--display);font-weight:800;font-size:1.2rem;letter-spacing:-0.02em';
  const ul = el('ul', 'fo-list');
  for (const n of ORDER) {
    const g = st.games[n]; const res = g && g.result && g.result.scored !== false ? g.result : null;
    const a = el('a'); a.href = `${SLUG[n]}/`;
    a.appendChild(el('span', 'n' + (res ? ' done' : ''), res ? '✓' : n));
    const t = el('span', 't'); t.appendChild(el('b', '', C.games[n].name)); t.appendChild(el('span', '', C.games[n].start_line)); a.appendChild(t);
    if (res) a.appendChild(el('span', 'band', n === 1 ? 'Five bars' : n === 9 ? 'Done' : bandName(n, mainScore(n, res))));
    ul.appendChild(el('li')).appendChild(a);
  }
  w.appendChild(ul);
  const foot = el('p', 'fo-foot');
  foot.appendChild(h(`<span>${esc(C.small_print[0].replace('For researchers →', ''))}<a href="researchers/">For researchers →</a></span>`));
  foot.appendChild(document.createElement('br'));
  foot.appendChild(h(`<span>${esc(C.small_print[1].replace('Read how it works →', ''))}<a href="#" data-open="dlg-how">Read how it works →</a></span>`));
  w.appendChild(foot);
  sheet('dlg-how', 'How it works', C.consent.help.map((l) => `<p>${esc(l)}</p>`).join(''));
  root.textContent = ''; root.appendChild(w); wireDialogs(w);
}

/* ------------------------------------------------------------------ consent ------ */
function consentCard(a, b) {
  const onDone = typeof a === 'function' ? a : b; const opts = typeof a === 'function' ? b : a;
  const st = load(); const cc = C.consent;
  const w = el('section', 'fo-consent');
  const top = el('div', 'fo-consent-top');
  const img = el('img'); img.src = (opts && opts.imgBase ? opts.imgBase : '../') + 'assets/img/khayyam.jpg'; img.alt = 'Khayyam'; top.appendChild(img);
  top.appendChild(el('p', '', cc.text)); w.appendChild(top);
  const acts = el('div', 'fo-actions');
  const yes = el('button', 'btn solid', cc.yes); yes.type = 'button';
  const no = el('button', 'btn ghost', cc.no); no.type = 'button';
  acts.appendChild(no); acts.appendChild(yes); w.appendChild(acts);        /* yes on the right, under the thumb (K, 22 Oct) */
  const status = el('p', 'fo-status', ''); w.appendChild(status);
  const cnt = el('p', 'fo-consent-counter', ''); w.appendChild(cnt);
  api('/counter').then((r) => { if (r && r.yes > 100) cnt.textContent = cc.counter.replace('{n}', fmt(r.yes)).replace('{c}', fmt(r.countries)); }).catch(() => {});
  const helpB = el('button', 'fo-help-btn fo-consent-help', '? What is kept'); helpB.type = 'button'; helpB.dataset.open = 'dlg-consent'; w.appendChild(helpB);
  sheet('dlg-consent', 'What a yes means', cc.help.map((l) => `<p>${esc(l)}</p>`).join(''));
  yes.addEventListener('click', async () => {
    yes.disabled = true; no.disabled = true; status.textContent = 'Sending…';
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

/* ------------------------------------------------------------------ demographics ------ */
function demographics(onDone) {
  const st = load(); const d = C.demographics;
  const w = el('section', 'fo-screen fo-demo');
  w.appendChild(el('h2', '', d.heading));
  const picked = Object.assign({}, st.demographics || {});
  for (const f of d.fields) {
    w.appendChild(el('h3', '', f.label)); w.appendChild(el('p', 'why', f.why));
    const row = el('div', 'fo-chips');
    f.options.concat([C.shared.skip]).forEach((o) => {
      const b = el('button', 'chip' + (picked[f.key] === o ? ' on' : ''), o); b.type = 'button';
      b.addEventListener('click', () => { row.querySelectorAll('.chip').forEach((x) => x.classList.remove('on')); b.classList.add('on'); picked[f.key] = o === C.shared.skip ? null : o; });
      row.appendChild(b);
    });
    w.appendChild(row);
  }
  const acts = el('div', 'fo-actions');
  const go = el('button', 'btn solid', 'Done'); go.type = 'button';
  const status = el('p', 'fo-status', '');
  go.addEventListener('click', async () => {
    st.demographics = picked; save(); go.disabled = true;
    try { await api('/demographics', { id: st.id, demographics: picked }); status.className = 'fo-status ok'; status.textContent = d.done; setTimeout(() => onDone(), 700); }
    catch (e) { status.textContent = C.portrait.send_failed; go.disabled = false; go.textContent = C.portrait.try_again; }
  });
  acts.appendChild(go); w.appendChild(acts); w.appendChild(status);
  return w;
}

/* ------------------------------------------------------------------ the portrait ------ */
const TRAIT_HIGH = 4, TRAIT_LOW = 2;      /* on the 1-5 bars, until the world's thirds replace them (B2) */
function portraitLines() {
  const st = load(); const g = (n) => st.games[n] && st.games[n].result && st.games[n].result.scored !== false ? st.games[n].result : null;
  const band = (n) => { const r = g(n); return r ? bandName(n, mainScore(n, r)) : null; };
  const t = g(1) ? g(1).traits : null; const calm = g(1) ? g(1).calm : null;
  const dial = (k) => g(9) ? g(9).items[k] : null;
  const edu = st.demographics && st.demographics.education;
  const cond = {
    P1: () => t && t.C !== null && t.C >= TRAIT_HIGH,
    P2: () => t && t.C !== null && t.C >= TRAIT_HIGH && edu === 'Still studying',
    P3: () => t && ((t.O !== null && t.O >= TRAIT_HIGH) || (t.E !== null && t.E >= TRAIT_HIGH)),
    P4: () => calm !== null && calm >= TRAIT_HIGH,
    P5: () => (t && t.A !== null && t.A >= TRAIT_HIGH) || (dial('4') !== null && dial('4') >= 7),
    P6: () => t && t.E !== null && t.E <= TRAIT_LOW,
    P7: () => band(3) === 'The optimist', P8: () => band(3) === 'The optimist', P9: () => band(3) === 'The realist',
    P10: () => band(6) === 'Careful thinker', P11: () => band(6) === 'Careful thinker', P12: () => band(6) === 'Quick answers',
    P13: () => band(5) === 'Trusts what is said', P14: () => band(5) === 'Looks for secret plans', P15: () => band(5) === 'Looks for secret plans',
    P16: () => band(2) === "With the people", P17: () => band(2) === "With the people" && band(5) === 'Looks for secret plans',
    P18: () => band(2) === "With the experts",
    P19: () => band(4) === 'Rules first', P20: () => band(4) === 'Freedom first',
    P21: () => dial('1') !== null && dial('1') >= 7, P22: () => dial('1') !== null && dial('1') <= 3,
    P23: () => band(8) === 'Country first', P24: () => band(8) === 'World citizen',
    P25: () => band(7) === 'Trusts a lot',
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
  if (total >= 4) lines.push(right >= total - 1 ? `You know yourself well: ${right} of ${total} guesses were close.` : right <= total / 2 ? `You surprised yourself in ${total - right} of ${total} games.` : `You guessed yourself right in ${right} of ${total} games.`);
  let fastest = null;
  for (const n of ORDER) { const g = st.games[n]; if (g && g.result && g.result.scored !== false && g.duration_ms) { const s = Math.round(g.duration_ms / 1000); if (!fastest || s < fastest.s) fastest = { n, s }; } }
  if (fastest) lines.push(`Your fastest game: ${C.games[fastest.n].name} — ${fastest.s} seconds.`);
  const g9 = st.games[9] && st.games[9].result ? st.games[9].result.items : null; const g3 = st.games[3] && st.games[3].result && st.games[3].result.scored ? st.games[3].result : null;
  if (g9 && ((g9['2'] !== null && g9['2'] >= 7 && g9['9'] === 2) || (g3 && bandName(3, g3.score) === 'The optimist' && g9['6'] !== null && g9['6'] <= 4))) lines.push('Sunny about your own future, cooler about the country: you are in good company.');
  const g7 = st.games[7] && st.games[7].result && st.games[7].result.scored ? st.games[7].result : null;
  if (g9 && g7 && g9['4'] !== null) {
    if (g9['4'] >= 7 && bandName(7, g7.score) === 'Careful with trust') lines.push('You trust people more than institutions.');
    if (g9['4'] <= 3 && bandName(7, g7.score) === 'Trusts a lot') lines.push('You trust institutions more than most people trust strangers.');
  }
  return lines;
}
function portraitPage() {
  const root = document.getElementById('fo'); const st = load(); const P = C.portrait;
  const done = doneGames();
  const w = el('section', 'fo-screen fo-portrait');
  function render() { root.textContent = ''; root.appendChild(w); wireDialogs(w); }
  sheet('dlg-how', 'How it works', C.consent.help.map((l) => `<p>${esc(l)}</p>`).join(''));
  if (done.length < 9) {
    w.appendChild(el('h1', 'fo-title', P.title));
    w.appendChild(el('p', 'fo-lede', `${done.length} of 9 done · about ${minutesLeft()} ${minutesLeft() === 1 ? 'minute' : 'minutes'} left. Your portrait opens after all nine.`));
    const circ = circles(null); w.appendChild(circ);
    const acts = el('div', 'fo-actions'); const nx = nextGame(null); const a = el('a', 'btn solid', C.shared.next_game); a.href = `../${SLUG[nx]}/`; acts.appendChild(a); w.appendChild(acts);
    render(); return;
  }
  counter('portrait');
  sheet('dlg-how', 'How it works', C.consent.help.map((l) => `<p>${esc(l)}</p>`).join(''));
  w.appendChild(el('h1', 'fo-title', P.title));
  /* 1 */
  w.appendChild(el('h2', '', P.sections.personality));
  const r1 = st.games[1].result; const bars = el('div', 'fo-bars'); const traitOf = { Outgoing: 'E', Warm: 'A', Organised: 'C', Calm: 'calm', Curious: 'O' };
  for (const bar of C.games[1].bars) { const key = traitOf[bar.name]; const v = key === 'calm' ? r1.calm : r1.traits[key]; const row = el('div', 'fo-bar' + (v === null ? ' skip' : '')); row.appendChild(el('b', '', bar.name)); const rail = el('div', 'rail'); const f = el('div', 'fill'); f.style.width = (v === null ? 0 : toP(1, v) * 100) + '%'; rail.appendChild(f); row.appendChild(rail); row.appendChild(el('small', '', v === null ? '' : (v >= 3 ? bar.high : bar.low))); bars.appendChild(row); }
  w.appendChild(bars);
  /* 2 */
  w.appendChild(el('h2', '', P.sections.world));
  const dv = el('div', 'fo-dots-view');
  for (const n of [2, 5, 7, 4, 8]) { const res = st.games[n].result; const v = mainScore(n, res); const row = el('div', 'fo-dot-row'); const nm = el('div', 'nm'); nm.appendChild(el('span', '', C.games[n].name)); nm.appendChild(el('b', '', bandName(n, v))); row.appendChild(nm); row.appendChild(strip({ p: toP(n, v), bands: true, still: true })); dv.appendChild(row); }
  w.appendChild(dv);
  /* 3 */
  const picks = portraitLines();
  if (picks.length) { w.appendChild(el('h2', '', P.sections.people)); w.appendChild(el('p', 'fo-quiet', P.sections.people_intro)); const ul = el('ul', 'fo-people'); picks.forEach((r) => { const li = el('li', '', r.line); li.appendChild(el('small', '', r.sources.join('; '))); ul.appendChild(li); }); w.appendChild(ul); }
  /* 4 */
  const own = ownLines();
  if (own.length) { w.appendChild(el('h2', '', P.sections.own)); const d = el('div', 'fo-own'); own.forEach((l) => d.appendChild(el('p', '', l))); w.appendChild(d); }
  /* 5: what the world guessed, once the server has 100 guesses and scores on a game */
  const worldBox = el('div'); w.appendChild(worldBox);
  api('/guessed').then((r) => { if (!r || !r.lines || !r.lines.length) return; worldBox.appendChild(el('h2', '', P.sections.guessed)); const d = el('div', 'fo-own'); r.lines.forEach((l) => d.appendChild(el('p', '', l))); worldBox.appendChild(d); }).catch(() => {});
  /* 6 and the consent */
  const tail = el('div'); w.appendChild(tail);
  function tailFor() {
    tail.textContent = '';
    if (st.consent.status === null) tail.appendChild(consentCard({ imgBase: '../../' }, (ans) => { if (ans === 'yes') { tail.textContent = ''; tail.appendChild(demographics(() => tailFor())); } else tailFor(); }));
    else if (st.consent.status === 'no') {
      const box = el('div', 'fo-card'); box.appendChild(el('p', 'fo-lede', P.changed_mind));
      const acts = el('div', 'fo-actions'); const b = el('button', 'btn solid', P.changed_mind_btn); b.type = 'button';
      b.addEventListener('click', () => { st.consent = { status: null, version: null, at: null }; save(); tailFor(); });
      acts.appendChild(b); box.appendChild(acts); tail.appendChild(box);
    } else {
      if (!st.demographics) { tail.appendChild(demographics(() => tailFor())); return; }
      compared(tail);
    }
    const del = el('div', 'fo-card'); const b = el('button', 'fo-help-btn', P.delete); b.type = 'button';
    b.addEventListener('click', () => {
      const d = sheet('dlg-del', P.delete, `<p>${esc(P.delete_sure)}</p><div class="actions"><button class="btn solid" id="del-yes" type="button">${esc(P.delete_yes)}</button><button class="btn ghost" type="button" data-close>${esc(P.delete_no)}</button></div>`);
      d.querySelector('#del-yes').addEventListener('click', async () => {
        const id = st.id, sent = !!st.uploaded.at;
        try { if (sent) await api('/delete', { id }); } catch (e) { /* the server did not answer: the local copy still goes */ }
        wipe(); d.close(); root.textContent = ''; root.appendChild(el('p', 'fo-lede', P.deleted));
      });
      d.showModal();
    });
    del.appendChild(b); tail.appendChild(del);
  }
  tailFor();
  render();
  function compared(where) {
    const box = el('div'); box.appendChild(el('h2', '', P.sections.compared));
    const cn = st.country && st.country !== 'not said' ? countryOf(st.country) : null;
    if (!cn) { box.appendChild(el('p', 'fo-quiet', 'You did not say where you are from, so there is no country line here. The world lines are on each game.')); where.appendChild(box); return; }
    const d = el('div', 'fo-own'); box.appendChild(d); where.appendChild(box);
    for (const n of [2, 3, 4, 5, 6, 7, 8]) {
      const res = st.games[n].result; const v = n === 6 ? res.score : mainScore(n, res);
      api('/pool', { id: st.id, m: `g${n}`, pool: { country: st.country } }).then((c) => {
        if (!c) return;
        if (c.n < c.opens_at) { d.appendChild(el('p', '', `${C.games[n].name}: ${cn.name} ${fmt(c.n)} so far · opens at ${c.opens_at}`)); return; }
        let below = 0, equal = 0; c.bins.forEach((cnt, i) => { const x = c.lo + i * c.step; if (x < v - c.step / 2) below += cnt; else if (Math.abs(x - v) <= c.step / 2) equal += cnt; });
        d.appendChild(el('p', '', pctWord(C.games[n].comparison, Math.round(100 * (below + equal / 2) / c.n)).replace('the world', `people from ${cn.name}`)));
      }).catch(() => {});
    }
  }
}

/* ------------------------------------------------------------------ start ------ */
export function start() {
  const root = document.getElementById('fo'); if (!root) return;
  const page = root.dataset.page; const n = Number(root.dataset.game);
  if (page === 'home') homePage(); else if (page === 'portrait') portraitPage(); else if (n >= 1 && n <= 9) gamePage(n);
}
export const _test = { load, save, wipe, batch, bandName, mainScore, portraitLines, ownLines, fill, parliamentName, STORE_KEY };
start();
