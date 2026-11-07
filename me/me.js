/* My Logicers: the page (Chat B, 7 Nov 2026). claude/me-plan.md section 4 is the list of screens; the words are me/lang/<lang>.json (claude/me-copy.md);
   the motion is claude/motion-spec.md (tokens and vocabulary in me.css); the other chats' modules are reached only through api.js.
   One screen at a time in #me, a hash for each: "" (My Logicers), #get, #have (or #have=<code> from a QR), #number, #pw, #rq.
   A screen change slides (a still copy of the old screen leaves while the new one arrives; taps always reach the new one). Nothing
   here writes to a game's keys: restoring is A's apply(); the page only asks. The page never shows a score of the check-in anywhere
   but here, on the phone that holds it. */
import { T, initWords, setLang, LANGS, LANG, fmtN, fmtDay, monthName } from './words.js';
import * as api from './api.js';

const $ = (s, r) => (r || document).querySelector(s);
function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined && text !== null) e.textContent = String(text); return e; }
const reduced = () => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
function announce(text) { const l = $('#me-live'); if (l) { l.textContent = ''; setTimeout(() => { l.textContent = text; }, 30); } }

/* what the page knows about the games it links to: the stats give the record's id, which is also the colour key of the site;
   the folder of each game is the only thing added here */
const PAGE = { energy: 'same-energy', hundred: '100-of-us', call: 'your-call', cousin: 'long-lost-cousin', club: 'the-club', apart: 'years-apart',
  gets: 'who-gets-what', every: 'every-beat', o24: 'out-of-24', altitude: 'altitude', lookalike: 'lookalike', passport: 'passport' };
const WORDS = ['altitude', 'lookalike', 'passport'];
const QIDS = [1, 2, 3, 4, 5, 6, 7, 8];
const CODE_RE = /^[a-z]+-[a-z]+-[a-z]+-\d{2}$/;

const S = { stats: null, code: null, kind: null, openKind: null, flash: '', counted: false, doorsNow: null };

/* ---------- small tools ---------- */
function safeHref(h) {
  const s = String(h || '');
  return /^(https:\/\/|http:\/\/(localhost|127\.0\.0\.1)(:|\/)|\/|\.\.?\/|\?|#)/i.test(s) ? s : '';
}
function countTo(node, to, render) {
  if (reduced() || !(to > 0)) { render(to); return; }
  const t0 = performance.now(), dur = 600;     // --m-slow
  (function frame(now) {
    const x = Math.min(1, (now - t0) / dur);
    render(Math.round(to * (1 - Math.pow(1 - x, 3))));
    if (x < 1) requestAnimationFrame(frame);
  })(t0);
}
function bandOf(score) { return score <= 28 ? 0 : score <= 50 ? 1 : score <= 72 ? 2 : 3; }   // the same cut points as checkin/assets/core.js whoBand()
function button(cls, text, onClick) { const b = el('button', 'btn ' + cls, text); b.type = 'button'; if (onClick) b.addEventListener('click', onClick); return b; }
function link(text, onClick, cls) { const b = el('button', 'me-link' + (cls ? ' ' + cls : ''), text); b.type = 'button'; b.addEventListener('click', onClick); return b; }
function msgLine() { const m = el('p', 'me-msg'); m.setAttribute('role', 'status'); return m; }
function setMsg(m, text, kind) { m.textContent = text || ''; m.className = 'me-msg' + (kind ? ' ' + kind : ''); }
const REASON = { net: 'err.net', brake: 'err.brake' };
function failText(r) { return T(REASON[r && r.reason] || 'err.generic'); }
/* the two doors' new state, as the server answered after a set, a change or a remove: kept across screens and language changes
   (the stats' own doors come from the last record this phone synced, which does not know yet) */
function doorsAre(r) { S.doorsNow = { pw: !!r.pw, rq: !!r.rq }; S.stats.doors = Object.assign({}, S.stats.doors, S.doorsNow); }

/* ---------- the strip of tiles, the cards ---------- */
function tile(p) {
  const word = WORDS.includes(p.id);
  const a = el('a', 'me-tile' + (p.played ? '' : ' idle')); a.href = '../' + (PAGE[p.id] || p.id) + '/'; a.dataset.g = p.id;
  a.appendChild(el('span', 'nm', p.name));
  const big = el('span', 'big');
  if (!p.played) { big.textContent = '–'; a.appendChild(big); a.appendChild(el('span', 'lab', T('act.play'))); return a; }
  if (p.current > 0) big.appendChild(el('i', 'me-flame'));
  big.appendChild(document.createTextNode(fmtN(p.current || 0)));
  a.appendChild(big); a.appendChild(el('span', 'lab', T('tile.streak')));
  const sub = el('span', 'sub');
  if (word && p.id === 'altitude') sub.append(T('tile.height') + ' ', el('b', null, fmtN(p.best || 0)));
  else sub.append(T(word ? 'tile.right' : 'tile.spot') + ' ', el('b', null, fmtN(p.spotOn || 0)));
  a.appendChild(sub);
  return a;
}
function strip(list) { const s = el('div', 'me-strip'); s.setAttribute('role', 'list'); list.forEach((p) => { const t = tile(p); t.setAttribute('role', 'listitem'); s.appendChild(t); }); return s; }
function section(title) { const s = el('section', 'me-sec'); if (title) s.appendChild(el('h2', 'me-h', title)); return s; }

function storyCard(st) {
  const s = section(T('home.story')), c = el('div', 'me-card'), n = el('div', 'me-nums');
  [[st.chapters, 'story.chapters'], [st.votes, 'story.votes'], [st.withWorld, 'story.with']].forEach(([v, k]) => { const d = el('div', 'me-num'); d.appendChild(el('b', null, fmtN(v || 0))); d.appendChild(el('span', null, T(k))); n.appendChild(d); });
  c.appendChild(n); s.appendChild(c); return s;
}
function findoutCard(fo) {
  const s = section(T('home.findout')), a = el('a', 'me-card me-cardlink'); a.href = fo.portrait ? '../find-out/portrait/' : '../find-out/home/';
  const done = Math.max(0, Math.min(9, fo.done || 0));
  a.appendChild(el('span', 'me-band', T('fo.of', { n: fmtN(done) })));
  const dots = el('div', 'me-dots'); dots.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 9; i++) { const d = el('i', i < done ? 'on' : ''); d.style.setProperty('--k', i); dots.appendChild(d); }
  a.appendChild(dots);
  if (fo.portrait) a.appendChild(el('span', 'me-go', T('fo.portrait')));
  s.appendChild(a); return s;
}
function checkinCard(ci) {
  const s = section(T('home.checkin')), a = el('a', 'me-card me-cardlink'); a.href = '../checkin/';
  const last = ci.last && typeof ci.last === 'object' && typeof ci.last.score === 'number' ? ci.last : null;
  const prev = ci.prev && typeof ci.prev === 'object' && typeof ci.prev.score === 'number' ? ci.prev : null;
  if (last) {
    const top = el('div', 'me-top'); top.appendChild(el('b', null, fmtN(last.score)));
    top.appendChild(el('span', 'me-band', T('ci.band.' + bandOf(last.score)))); a.appendChild(top);
    a.appendChild(prev ? delta(T('ci.since', { from: '<b>' + fmtN(prev.score) + '</b>', to: '<b>' + fmtN(last.score) + '</b>', date: fmtDay(prev.date) }))
                       : delta(T('ci.last', { date: fmtDay(last.date) })));
  } else {
    /* the scores live in the locked box: a phone that has not opened it yet knows only how many times */
    const top = el('div', 'me-top'); top.appendChild(el('b', null, fmtN(ci.times || 0))); top.appendChild(el('span', null, T('ci.times'))); a.appendChild(top);
  }
  s.appendChild(a); return s;
}
/* the sentence has two numbers made bold: only those two bits of markup are ever let through */
function delta(sentence) {
  const d = el('p', 'me-delta'); const parts = String(sentence).split(/(<b>[^<]*<\/b>)/);
  parts.forEach((p) => { const m = /^<b>([^<]*)<\/b>$/.exec(p); if (m) d.appendChild(el('b', null, m[1])); else if (p) d.appendChild(document.createTextNode(p)); });
  return d;
}
function mineCard(list) {
  const s = section(T('mine.h')), c = el('div', 'me-card'), ul = el('ul', 'me-rows'); let missing = false;
  list.forEach((g) => {
    const li = el('li', 'me-row'), w = el('div', 'what');
    w.appendChild(el('div', 'ti', g.title || ''));
    const m = el('div', 'meta'); m.appendChild(el('span', 'kind', T('mine.kind.' + g.kind))); const cd = el('span', 'cd', g.code || ''); m.appendChild(cd);
    if (g.made) m.appendChild(document.createTextNode(' · ' + fmtDay(g.made)));
    w.appendChild(m); li.appendChild(w);
    const href = safeHref(g.link);
    if (href) { const a = el('a', 'btn tint small', T(g.kind === 'made' ? 'mine.edit' : 'mine.host')); a.href = href; li.appendChild(a); } else missing = true;
    ul.appendChild(li);
  });
  c.appendChild(ul); s.appendChild(c);
  if (missing) s.appendChild(el('p', 'me-note', T('mine.note')));
  return s;
}

/* ---------- the code: show it, copy it, QR ---------- */
function qrNode(text) {
  const Q = window.qrcodegen; if (!Q) return null;
  try {
    const q = Q.QrCode.encodeText(text, Q.QrCode.Ecc.MEDIUM); let d = ''; const n = q.size;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (q.getModule(x, y)) d += 'M' + (x + 2) + ' ' + (y + 2) + 'h1v1h-1z';
    const NS = 'http://www.w3.org/2000/svg'; const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + (n + 4) + ' ' + (n + 4)); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', T('code.qr_aria'));
    const r = document.createElementNS(NS, 'rect'); r.setAttribute('width', '100%'); r.setAttribute('height', '100%'); r.setAttribute('fill', '#fff'); svg.appendChild(r);
    const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); p.setAttribute('fill', '#15172B'); svg.appendChild(p);
    return svg;
  } catch (e) { return null; }
}
function codeText(code, big) {
  const c = el('p', 'me-code' + (big ? ' big' : '')); c.setAttribute('data-code', code);
  code.split('-').forEach((w, i, a) => { c.appendChild(document.createTextNode(w + (i < a.length - 1 ? '-' : ''))); if (i < a.length - 1) c.appendChild(document.createElement('wbr')); });
  return c;
}
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch (e) { /* fall back below */ }
  try { const t = el('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0;top:0'; document.body.appendChild(t); t.select(); const ok = document.execCommand('copy'); t.remove(); return ok; } catch (e) { return false; }
}
function codeTools(code) {
  const w = el('div'); const row = el('div', 'me-btns'); const qrBox = el('div'); qrBox.setAttribute('aria-live', 'polite');
  const copy = button('tint', T('act.copy'), async () => {
    if (await copyText(code)) { copy.textContent = T('act.copied'); announce(T('act.copied')); setTimeout(() => { copy.textContent = T('act.copy'); }, 1600); }
  });
  copy.style.minWidth = '7.5rem'; row.appendChild(copy);
  const url = location.origin + location.pathname + '#have=' + code;
  const probe = !!window.qrcodegen;
  if (probe) {
    const qr = button('tint', T('code.qr'), () => {
      if (qrBox.firstChild) { qrBox.replaceChildren(); qr.setAttribute('aria-expanded', 'false'); return; }
      const svg = qrNode(url); if (!svg) return;
      const d = el('div', 'me-qr'); d.appendChild(svg); d.appendChild(el('p', null, T('code.qr_note'))); qrBox.appendChild(d); qr.setAttribute('aria-expanded', 'true');
    });
    qr.setAttribute('aria-expanded', 'false'); row.appendChild(qr);
  }
  w.appendChild(row); w.appendChild(qrBox); w.appendChild(el('p', 'me-note', T('code.notes')));
  return w;
}
function codeCard(code) {
  const s = section(T('code.h')), c = el('div', 'me-card'); c.appendChild(codeText(code)); c.appendChild(codeTools(code)); s.appendChild(c); return s;
}
function getCard() {
  const s = section(T('code.h')), c = el('div', 'me-card'); c.appendChild(el('p', null, T('code.line')));
  const row = el('div', 'me-btns'); row.appendChild(button('solid', T('code.get'), () => nav('get'))); c.appendChild(row); s.appendChild(c); return s;
}

/* ---------- If you lose the code ---------- */
function loseCard() {
  const s = section(T('lose.h')), c = el('div', 'me-card'); const d = (S.stats && S.stats.doors) || {};
  const msg = msgLine(); msg.style.minHeight = '0';
  const redo = () => { const n = loseCard(); s.replaceWith(n); };
  if (S.kind) {
    const row = el('div', 'me-door' + (d.passkey ? ' kept' : ''));
    if (d.passkey) row.appendChild(el('span', 'st', T('lose.kept')));
    else {
      const b = button('tint small block', T(S.kind === 'face' ? 'lose.face' : 'lose.finger'), async () => {
        b.disabled = true; setMsg(msg, '');
        const r = await api.passkeyRegister(S.code);
        if (r.ok) { S.stats.doors = Object.assign({}, S.stats.doors, { passkey: true }); announce(T('lose.kept')); const n = loseCard(); s.replaceWith(n); return; }
        b.disabled = false; if (r.reason !== 'cancel') setMsg(msg, failText(r), 'bad');
      });
      row.appendChild(b); api.passkeyPrepare(S.code);
    }
    c.appendChild(row);
  }
  [['pw', 'lose.pw_on', 'pw.h', 'pw'], ['rq', 'lose.rq_on', 'rq.h', 'rq']].forEach(([k, on, set, route]) => {
    const row = el('div', 'me-door');
    if (d[k]) {
      row.appendChild(el('span', 'st', T(on)));
      const acts = el('div', 'acts');
      acts.appendChild(link(T('act.change'), () => nav(route), 'strong'));
      acts.appendChild(link(T('act.remove'), async () => {
        const r = await api.removeDoor(S.code, k);
        if (!r.ok) { setMsg(msg, failText(r), 'bad'); return; }
        doorsAre(r); redo();
      }));
      row.appendChild(acts);
    } else row.appendChild(button('tint small block', T(set), () => nav(route)));
    c.appendChild(row);
  });
  c.appendChild(msg); s.appendChild(c); s.appendChild(el('p', 'me-note', T('lose.warn')));
  return s;
}

/* ---------- sheets (rise) ---------- */
function sheet(title, build) {
  const d = el('dialog', 'me-sheet'), box = el('div', 'sheet'); const id = 'sh' + Math.random().toString(36).slice(2, 7);
  const x = el('button', 'chip round close', '×'); x.type = 'button'; x.setAttribute('aria-label', T('nav.close'));
  const h = el('h2', null, title); h.id = id; d.setAttribute('aria-labelledby', id);
  box.append(x, h); build(box, close); d.appendChild(box); document.body.appendChild(d);
  function close() {
    if (!d.isConnected) return;
    /* the dialog closes at once; a still copy of it sinks and a copy of the backdrop fades, both letting taps through (motion spec, rise) */
    const r = box.getBoundingClientRect();
    const g = el('div', 'me-sheetghost'); g.style.cssText = 'left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px';
    const copy = box.cloneNode(true); copy.querySelectorAll('*').forEach((n) => { n.removeAttribute('id'); n.style.animation = 'none'; }); copy.setAttribute('aria-hidden', 'true'); g.appendChild(copy);
    const dim = el('div', 'me-sheetdim'); document.body.append(dim, g);
    setTimeout(() => { g.remove(); dim.remove(); }, 450);
    d.close(); d.remove();
  }
  x.addEventListener('click', close);
  d.addEventListener('click', (e) => { if (e.target === d) close(); });
  d.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
  d.showModal();
  return d;
}
function openLang() {
  sheet(T('lang.title'), (box, close) => {
    const ul = el('ul', 'me-langs');
    LANGS.forEach(([c, name, flag]) => {
      const li = el('li'), b = el('button'); b.type = 'button'; b.lang = c; if (c === LANG) b.setAttribute('aria-current', 'true');
      b.append(el('span', 'fl', flag), el('span', null, name));
      b.addEventListener('click', async () => { close(); if (c !== LANG) await switchLang(c); });
      li.appendChild(b); ul.appendChild(li);
    });
    box.appendChild(ul);
  });
}
async function switchLang(c) {
  await setLang(c); chrome(); await refresh(); render(false, true);
}
function openDelete() {
  sheet(T('del.link'), (box, close) => {
    box.appendChild(el('p', null, T('del.sure')));
    const msg = msgLine(); const row = el('div', 'me-btns');
    const yes = button('danger', T('del.yes'), async () => {
      yes.disabled = true; const r = await api.remove();
      if (!r.ok) { yes.disabled = false; setMsg(msg, failText(r), 'bad'); return; }
      close(); S.doorsNow = null; S.flash = T('del.done'); S.counted = true; await refresh(); nav('');
    });
    row.append(button('ghost', T('del.no'), close), yes); box.appendChild(row); box.appendChild(msg);
  });
}

/* ---------- the screens ---------- */
function screen(sub) { return el('section', 'me-screen' + (sub ? ' me-sub' : '')); }
function act(...kids) { const d = el('div', 'me-act'); kids.forEach((k) => k && d.appendChild(k)); return d; }
function failScreen() {
  const r = screen(); r.appendChild(el('h1', 'me-title', T('app.name'))); const m = el('p', 'me-msg bad', T('err.generic')); m.style.marginTop = '12px'; r.appendChild(m);
  const row = el('div', 'me-btns'); const a = el('a', 'btn solid', T('nav.back')); a.href = '../'; row.appendChild(a); r.appendChild(row); return r;
}
function homeScreen() {
  const s = S.stats; if (!s) return failScreen();
  const root = screen(); let n = 0;
  const add = (node) => { node.classList.add('me-rise'); node.style.setProperty('--i', Math.min(n++, 7)); root.appendChild(node); return node; };
  const head = el('div', 'me-head');
  if (s.logicer) {
    const h1 = el('h1', 'me-number'); h1.tabIndex = -1; const full = T('home.number', { n: fmtN(s.logicer) }); h1.setAttribute('aria-label', full);
    const first = !S.counted; S.counted = true;
    if (first) { h1.textContent = T('home.number', { n: fmtN(0) }); countTo(h1, s.logicer, (v) => { h1.textContent = T('home.number', { n: fmtN(v) }); }); } else h1.textContent = full;
    head.appendChild(h1);
    if (s.since) head.appendChild(el('p', 'meta', T('home.since', { date: fmtDay(s.since) })));
  } else {
    const h1 = el('h1', 'me-title', T('app.name')); h1.tabIndex = -1; head.appendChild(h1);
    head.appendChild(el('p', 'me-lede', T('home.none')));
    const row = el('div', 'me-btns'); const a = el('a', 'btn solid', T('act.play')); a.href = '../'; row.appendChild(a); head.appendChild(row);
  }
  if (S.flash) { const f = el('p', 'me-flash', S.flash); f.setAttribute('role', 'status'); head.appendChild(f); announce(S.flash); S.flash = ''; }
  add(head);

  const card = api.cardOpen(s);
  if (card) {
    /* C's card: { kind: 'year'|'month', y, ym: '2026-12'|null, query: '?y=2026'|'?m=2026-12' } (me/year/open.js); older shapes ({ y } / { month }) still read */
    const month = card.kind === 'year' ? '' : (card.ym || card.month || card.m || ''), y = card.y || card.year || 2026;
    const query = typeof card.query === 'string' && /^\?(y=\d{4}|m=\d{4}-\d{2})$/.test(card.query) ? card.query : (month ? '?m=' + month : '?y=' + y);
    const label = typeof card.label === 'string' && card.label ? card.label : month ? T('year.m', { month: monthName(month) }) : T('year.y', { y });
    const href = safeHref(card.href) || ('year/' + query);
    const a = el('a', 'btn solid block', label); a.href = href; a.id = 'me-year'; const w = el('div', 'me-sec'); w.appendChild(a); add(w);
  }

  const per = Array.isArray(s.per) ? s.per : [];
  const daily = per.filter((p) => !WORDS.includes(p.id)), words = per.filter((p) => WORDS.includes(p.id));
  if (daily.length) { const sec = section(T('home.daily')); sec.appendChild(strip(daily)); add(sec); }
  if (words.length) { const sec = section(T('home.words')); sec.appendChild(strip(words)); add(sec); }
  if (s.story && (s.story.chapters > 0 || s.story.votes > 0)) add(storyCard(s.story));
  if (s.findouts && s.findouts.done > 0) add(findoutCard(s.findouts));
  if (s.checkin && (s.checkin.times > 0 || s.checkin.last)) add(checkinCard(s.checkin));
  if (Array.isArray(s.mine) && s.mine.length) add(mineCard(s.mine));

  if (S.code) { add(codeCard(S.code)); add(loseCard()); }
  else if (s.logicer) add(getCard());
  if (!S.code) {
    const low = el('div', 'me-sec');
    const row = el('div', 'me-btns'); row.style.marginTop = '0'; row.appendChild(button('tint block', T('have.h'), () => nav('have')));
    low.appendChild(row);
    const u = el('div'); u.appendChild(link(T('have.number'), () => nav('number'))); low.appendChild(u);
    add(low);
  }
  if (S.code) { const low = el('div', 'me-low'); low.appendChild(link(T('del.link'), openDelete, 'danger')); add(low); }
  return root;
}

/* Get your code */
function getScreen() {
  const root = screen(true); const h1 = el('h1', 'me-title', T('code.get')); h1.tabIndex = -1; root.appendChild(h1);
  root.appendChild(el('p', 'me-lede', T('get.lede')));
  const box = el('div', 'me-sec me-grow'); root.appendChild(box);
  const msg = msgLine(); let code = null; let busy = false;
  const codeEl = el('p', 'me-code big'); codeEl.setAttribute('aria-live', 'polite'); codeEl.style.minHeight = '2.4em'; box.appendChild(codeEl);
  const row = el('div', 'me-btns'); const bar = act(msg, row); box.appendChild(bar);
  async function drawOne() {
    try { code = await api.draw(LANG); } catch (e) { code = null; setMsg(msg, T('err.generic'), 'bad'); return false; }
    const t = codeText(code, true); codeEl.replaceChildren(...t.childNodes); codeEl.dataset.code = code;
    codeEl.classList.remove('fresh'); void codeEl.offsetWidth; if (!reduced()) codeEl.classList.add('fresh');
    return true;
  }
  const another = button('ghost', T('get.another'), async () => { if (busy) return; setMsg(msg, ''); await drawOne(); });
  const keep = button('solid', T('act.keep'), async () => {
    if (busy || !code) return; busy = true; keep.disabled = another.disabled = true; setMsg(msg, '');
    const r = await api.keep(code, LANG);
    busy = false;
    if (r.ok) {
      if (r.code && r.code !== code) { code = r.code; const t = codeText(code, true); codeEl.replaceChildren(...t.childNodes); codeEl.dataset.code = code; }   // a taken one was drawn again: the page shows the one kept
      kept(); return;
    }
    keep.disabled = another.disabled = false;
    if (r.reason === 'exists') { existing(); return; }
    setMsg(msg, failText(r), 'bad');
  });
  row.append(another, keep);
  function kept() {
    S.code = code; S.counted = true; announce(T('act.kept'));
    h1.textContent = T('code.h'); root.querySelector('.me-lede').textContent = T('code.line');
    bar.remove(); codeEl.classList.remove('fresh');
    const flash = el('p', 'me-flash', T('act.kept')); flash.setAttribute('role', 'status'); box.insertBefore(flash, codeEl); flash.style.marginBottom = '12px';
    box.appendChild(codeTools(code));
    const back = el('div', 'me-act'); back.appendChild(button('solid block', T('nav.back'), () => { refresh().then(() => nav('')); })); box.appendChild(back);
  }
  function existing() {
    setMsg(msg, T('get.exists'), 'bad'); row.replaceChildren(button('solid', T('have.h'), () => nav('have')), button('ghost', T('num.h'), () => nav('number')));
  }
  drawOne();
  return root;
}

/* after any door opened the page: the games' keys are filled by A's apply(), the code is kept here too */
async function welcome() { S.doorsNow = null; S.flash = T('have.ok'); S.counted = false; await refresh(); nav(''); return true; }
async function enter(record, code, msg) {
  const r = await api.adopt(code, record);
  if (!r.ok) { if (msg) setMsg(msg, failText(r), 'bad'); return false; }
  return welcome();
}

/* Have a code? */
function haveScreen(arg) {
  const root = screen(true); const h1 = el('h1', 'me-title', T('have.h')); h1.tabIndex = -1; root.appendChild(h1);
  const form = el('form', 'me-form me-grow'); form.noValidate = true; root.appendChild(form);
  const f = el('div', 'me-field'); const inp = el('input', 'me-input mono'); inp.type = 'text'; inp.id = 'me-code-in'; inp.placeholder = T('have.ph'); inp.setAttribute('aria-label', T('have.h'));
  inp.autocapitalize = 'none'; inp.autocomplete = 'off'; inp.spellcheck = false; inp.setAttribute('autocorrect', 'off'); inp.inputMode = 'text'; inp.enterKeyHint = 'go';
  const pre = String(arg || '').toLowerCase(); if (CODE_RE.test(pre)) inp.value = pre;        // from a QR: filled in, never entered for them
  if (pre) { try { history.replaceState(null, '', location.pathname + location.search + '#have'); } catch (e) { /* the code stays in the address */ } }   // and out of the browser's history
  f.appendChild(inp); form.appendChild(f);
  const msg = msgLine();
  const go = button('solid block', T('act.enter')); go.type = 'submit';
  async function submit(e) {
    e.preventDefault(); if (go.disabled) return;
    const code = inp.value.trim().toLowerCase().replace(/[\s_]+/g, '-');
    if (!CODE_RE.test(code)) { setMsg(msg, T('have.nf'), 'bad'); return; }
    go.disabled = true; setMsg(msg, '');
    const r = await api.restore(code);          // A's restore already writes the record into the games' keys and keeps the code
    if (!r.ok) { go.disabled = false; setMsg(msg, r.reason === 'none' ? T('have.nf') : failText(r), 'bad'); return; }
    await welcome();
  }
  form.addEventListener('submit', submit);
  const more = el('div', 'me-low'); more.style.marginTop = '6px';
  more.appendChild(link(T('have.number'), () => nav('number'), 'strong'));
  if (S.openKind) {
    const b = button('tint', T(S.openKind === 'face' ? 'have.face' : 'have.finger'), async () => {
      b.disabled = true; setMsg(msg, '');
      const r = await api.passkeyLogin();
      if (!r.ok) { b.disabled = false; if (r.reason !== 'cancel') setMsg(msg, r.reason === 'none' ? T('have.nf') : failText(r), 'bad'); return; }
      if (!(await enter(r.record, r.code, msg))) b.disabled = false;
    });
    b.style.marginTop = '6px'; more.appendChild(b);
    api.passkeyPrepareLogin();
    /* the phone's keyboard offers the kept one over the box; picking it comes back here */
    inp.autocomplete = 'username webauthn';
    api.passkeyAutofill(inp).then((r) => { if (r && root.isConnected) enter(r.record, r.code, msg); });
  }
  form.appendChild(more); form.appendChild(act(msg, go));
  root.focusAfter = inp;
  return root;
}

/* Use your Logicer number */
function numberScreen() {
  const root = screen(true); const h1 = el('h1', 'me-title', T('num.h')); h1.tabIndex = -1; root.appendChild(h1);
  const form = el('form', 'me-form me-grow'); form.noValidate = true; root.appendChild(form);
  const f = el('div', 'me-field'); const lb = el('label', null, T('num.field')); lb.htmlFor = 'me-num-in';
  const inp = el('input', 'me-input'); inp.id = 'me-num-in'; inp.type = 'text'; inp.inputMode = 'numeric'; inp.autocomplete = 'off'; inp.enterKeyHint = 'go'; inp.pattern = '[0-9]*';
  f.append(lb, inp); form.appendChild(f);
  const fields = el('div', 'me-form'); fields.style.marginTop = '0'; form.appendChild(fields);
  const msg = msgLine();
  const go = button('solid block', T('act.enter')); go.type = 'submit'; form.appendChild(act(msg, go));
  const st = { which: null, mode: 'pw', n: 0, answers: {} };
  const digits = () => String(inp.value || '').replace(/\D/g, '').slice(0, 9);
  inp.addEventListener('input', () => { if (st.which) { st.which = null; fields.replaceChildren(); setMsg(msg, ''); } });
  function build() {
    fields.replaceChildren(); const w = st.which;
    if (w.pw && w.rq) {
      const seg = el('div', 'me-seg'); const a = el('button', null, T('num.pw')), b = el('button', null, T('num.rq')); a.type = b.type = 'button';
      const paint = () => { a.setAttribute('aria-pressed', String(st.mode === 'pw')); b.setAttribute('aria-pressed', String(st.mode === 'rq')); };
      a.addEventListener('click', () => { st.mode = 'pw'; paint(); body(); }); b.addEventListener('click', () => { st.mode = 'rq'; paint(); body(); });
      paint(); seg.append(a, b); fields.appendChild(seg);
    } else st.mode = w.pw ? 'pw' : 'rq';
    const bodyBox = el('div', 'me-form'); bodyBox.style.marginTop = '0'; fields.appendChild(bodyBox);
    function body() {
      bodyBox.replaceChildren();
      if (st.mode === 'pw') {
        const d = el('div', 'me-field'); const l = el('label', null, T('num.pw')); l.htmlFor = 'me-pw-in';
        const i = el('input', 'me-input'); i.id = 'me-pw-in'; i.type = 'password'; i.autocomplete = 'current-password'; i.enterKeyHint = 'go';
        d.append(l, i); bodyBox.appendChild(d); st.pwInput = i;
      } else {
        st.qInputs = [];
        (st.which.rq || []).forEach((id) => {
          const d = el('div', 'me-field'); const l = el('label', null, T('rq.q.' + id)); const i = el('input', 'me-input'); i.type = 'text'; i.id = 'me-q-' + id;
          l.htmlFor = i.id; i.autocomplete = 'off'; i.autocapitalize = 'none'; i.setAttribute('autocorrect', 'off'); i.spellcheck = false; i.enterKeyHint = 'go'; d.append(l, i); bodyBox.appendChild(d); st.qInputs.push([id, i]);
        });
      }
    }
    body();
    const first = fields.querySelector('input'); if (first) first.focus();
  }
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); if (go.disabled) return;
    const n = digits(); if (!n) { setMsg(msg, T('num.fail'), 'bad'); return; }
    go.disabled = true; setMsg(msg, '');
    if (!st.which) {
      const r = await api.which(+n); go.disabled = false;
      if (!r.ok) { setMsg(msg, r.reason === 'none' ? T('num.none') : failText(r), 'bad'); return; }
      if (!r.pw && !r.rq) { setMsg(msg, T('num.none'), 'bad'); return; }
      st.which = r; st.n = +n; build(); return;
    }
    let r;
    if (st.mode === 'pw') { const v = st.pwInput ? st.pwInput.value : ''; if (!v) { go.disabled = false; setMsg(msg, T('num.fail'), 'bad'); return; } r = await api.openWithPassword(st.n, v); }
    else {
      const list = (st.qInputs || []).map(([id, i]) => ({ id, answer: i.value }));
      if (list.some((x) => !api.normalizeAnswer(x.answer))) { go.disabled = false; setMsg(msg, T('num.fail'), 'bad'); return; }
      r = await api.openWithQuestions(st.n, list);
    }
    if (!r.ok) {
      go.disabled = false;
      if (r.reason === 'net' || r.reason === 'brake') setMsg(msg, failText(r), 'bad');
      else setMsg(msg, T('num.fail') + (typeof r.left === 'number' ? ' ' + T('num.left', { n: fmtN(r.left) }) : ''), 'bad');
      return;
    }
    if (!(await enter(r.record, r.code, msg))) go.disabled = false;
  });
  root.focusAfter = inp;
  return root;
}

/* Set a password */
function pwScreen() {
  const root = screen(true); const h1 = el('h1', 'me-title', T('pw.h')); h1.tabIndex = -1; root.appendChild(h1);
  const form = el('form', 'me-form me-grow'); form.noValidate = true; root.appendChild(form);
  const wrap = el('div', 'me-pw'); const inp = el('input', 'me-input'); inp.type = 'password'; inp.id = 'me-pw-new'; inp.autocomplete = 'new-password'; inp.enterKeyHint = 'go'; inp.setAttribute('aria-label', T('pw.h'));
  const show = link(T('pw.show'), () => { const s = inp.type === 'password'; inp.type = s ? 'text' : 'password'; show.textContent = T(s ? 'pw.hide' : 'pw.show'); show.setAttribute('aria-pressed', String(s)); }, 'strong');
  wrap.append(inp, show); form.appendChild(wrap);
  const msg = msgLine(); msg.textContent = T('pw.rule');
  const go = button('solid block', T('act.keep')); go.type = 'submit'; form.appendChild(act(msg, go));
  inp.addEventListener('input', () => setMsg(msg, T('pw.rule')));
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); if (go.disabled) return;
    const v = inp.value; if (v.length < 8) { setMsg(msg, T('pw.short'), 'bad'); return; }
    go.disabled = true;
    const r = await api.setPassword(S.code, v);
    if (!r.ok) { go.disabled = false; setMsg(msg, r.reason === 'common' ? T('pw.common') : r.reason === 'short' ? T('pw.short') : failText(r), 'bad'); return; }
    doorsAre(r); S.flash = T('act.kept'); nav('');
  });
  root.focusAfter = inp;
  return root;
}

/* Set 3 questions */
function rqScreen() {
  const root = screen(true); const h1 = el('h1', 'me-title', T('rq.h')); h1.tabIndex = -1; root.appendChild(h1);
  root.appendChild(el('p', 'me-lede', T('rq.pick')));
  const form = el('form', 'me-form me-grow'); form.noValidate = true; root.appendChild(form);
  const list = el('div', 'me-qs'); form.appendChild(list);
  const picked = []; const inputs = {};
  const msg = msgLine(); const go = button('solid block', T('act.keep')); go.type = 'submit'; go.disabled = true;
  function ready() { go.disabled = !(picked.length === 3 && picked.every((id) => api.normalizeAnswer(inputs[id].value))); }
  QIDS.forEach((id) => {
    const item = el('div', 'me-qi'); const b = el('button', 'me-q'); b.type = 'button'; b.setAttribute('aria-pressed', 'false'); b.appendChild(el('span', null, T('rq.q.' + id)));
    let ans = null;
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') === 'true';
      if (on) { picked.splice(picked.indexOf(id), 1); b.setAttribute('aria-pressed', 'false'); if (ans) { ans.remove(); ans = null; } delete inputs[id]; setMsg(msg, ''); ready(); return; }
      if (picked.length >= 3) { setMsg(msg, T('rq.max'), 'bad'); return; }
      picked.push(id); b.setAttribute('aria-pressed', 'true'); setMsg(msg, '');
      ans = el('input', 'me-input me-answer'); ans.type = 'text'; ans.id = 'me-ans-' + id; ans.setAttribute('aria-label', T('rq.q.' + id) + ' — ' + T('rq.answer')); ans.placeholder = T('rq.answer');
      ans.autocomplete = 'off'; ans.autocapitalize = 'none'; ans.setAttribute('autocorrect', 'off'); ans.spellcheck = false; ans.enterKeyHint = 'go';
      ans.addEventListener('input', ready); inputs[id] = ans; item.appendChild(ans); ans.focus({ preventScroll: false }); ready();
    });
    item.appendChild(b); list.appendChild(item);
  });
  form.appendChild(el('p', 'me-note', T('rq.line'))); form.appendChild(act(msg, go));
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); if (go.disabled) return; go.disabled = true;
    const answers = picked.slice().sort((a, b) => a - b).map((id) => ({ id, answer: inputs[id].value }));
    const r = await api.setQuestions(S.code, answers);
    if (!r.ok) { go.disabled = false; setMsg(msg, failText(r), 'bad'); return; }
    doorsAre(r); S.flash = T('act.kept'); nav('');
  });
  return root;
}

/* ---------- routing ---------- */
const DEPTH = { '': 0, get: 1, have: 1, number: 2, pw: 1, rq: 1 };
let current = null;
function parse() {
  const m = /^#?([a-z]*)(?:=(.*))?$/i.exec(location.hash || '');
  let arg = '';
  try { arg = m && m[2] ? decodeURIComponent(m[2]) : ''; } catch (e) { arg = ''; }   // a broken %-escape is no argument, not an error screen
  return { name: m ? m[1].toLowerCase() : '', arg };
}
function nav(name) { if (parse().name === name && (name !== 'have' || !parse().arg)) render(false, true); else location.hash = name ? '#' + name : '#'; }
function guard(name) {
  if (!(name in DEPTH)) return '';
  if (name === 'get' && (S.code || !(S.stats && S.stats.logicer))) return '';
  if ((name === 'pw' || name === 'rq') && !S.code) return '';
  return name;
}
function show(node, name, same) {
  const main = $('#me'); const old = main.firstElementChild;
  const dir = current === null || same ? '' : (DEPTH[name] >= DEPTH[current] ? 'fwd' : 'back');
  let ghost = null;
  if (old && dir && !reduced()) {
    ghost = old.cloneNode(true); ghost.className = 'me-ghost' + (dir === 'back' ? ' back' : ''); ghost.setAttribute('aria-hidden', 'true'); ghost.inert = true;
    ghost.querySelectorAll('*').forEach((n) => { n.style.animation = 'none'; n.removeAttribute('id'); });
  }
  if (dir) node.classList.add(dir);
  main.replaceChildren(node); if (ghost) { main.appendChild(ghost); setTimeout(() => ghost.remove(), 450); }
  current = name;
  const target = node.focusAfter || node.querySelector('h1');
  if (target) { if (target.tagName === 'H1') target.tabIndex = -1; try { target.focus({ preventScroll: true }); } catch (e) { /* no focus */ } }
  window.scrollTo(0, 0);
  document.title = name === 'pw' ? T('pw.h') + ' | ' + T('app.name') : name === 'rq' ? T('rq.h') + ' | ' + T('app.name') : name === 'have' ? T('have.h') + ' | ' + T('app.name')
    : name === 'number' ? T('num.h') + ' | ' + T('app.name') : name === 'get' ? T('code.get') + ' | ' + T('app.name') : T('app.title');
}
function render(first, same) {
  const { name, arg } = parse(); const n = guard(name);
  if (current === 'have') api.passkeyStopAutofill();
  const node = n === 'get' ? getScreen() : n === 'have' ? haveScreen(arg) : n === 'number' ? numberScreen() : n === 'pw' ? pwScreen() : n === 'rq' ? rqScreen() : homeScreen();
  show(node, n, !!same && current === n);
}

/* ---------- the page's frame ---------- */
function chrome() {
  const nc = $('#me-namechip'); if (nc) { nc.textContent = T('app.name'); nc.setAttribute('aria-current', 'page'); }
  const lc = $('#me-langchip'); if (lc) { lc.textContent = LANG.toUpperCase(); lc.setAttribute('aria-label', T('lang.switch')); lc.hidden = false; if (!lc.dataset.on) { lc.dataset.on = '1'; lc.addEventListener('click', openLang); } }
  const f = $('#me-foot'); if (f) f.textContent = T('foot.line');
  document.documentElement.lang = LANG;
}
async function refresh() {
  try { S.stats = api.stats({}); } catch (e) { S.stats = null; }
  S.code = api.getCode();
  if (!S.code) S.doorsNow = null;
  if (S.stats && S.doorsNow) S.stats.doors = Object.assign({}, S.stats.doors, S.doorsNow);
}

async function boot() {
  await initWords(); chrome();
  S.kind = await api.passkeyKind(); S.openKind = api.passkeyOpenKind();
  await refresh();
  window.addEventListener('hashchange', () => render(false, false));
  render(true, false);
  document.documentElement.dataset.ready = '1';
}
boot().catch((e) => { try { const m = $('#me'); if (m) m.replaceChildren(failScreen()); } catch (x) { /* nothing more to do */ } if (window.console) console.warn('My Logicers:', e); document.documentElement.dataset.ready = 'err'; });
