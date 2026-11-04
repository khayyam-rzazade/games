/* Check-in: the host screen (chat C, 4 Nov 2026).
   Make a room, show the code and QR, start a live or an open round, split the group in two (optional), watch the count, reveal,
   read the lever, tap "We'll try this", start the next round. The host sees the group only: pictures from 10 phones, a split side
   from 10 each. The page is built to be put on a projector (wide layout from 960 px) and used on a phone.
   The private host link is the key in the address after #; it is kept on this device so the room can be found again. */
import { el, T, raw, fmt, load, save, api, gone, wrongKey, hostKeyOf, initStrings, langChip, howSheet, smallPrint, wireDialogs, sheet, copyText, qrSvg, lang, barSigned, BAR_IDS, relTime, dayMonth, researchersUrl } from './core.js';
import { countRing } from './charts.js';
import { groupNode, lowestOf, byIds, norm } from './group.js';
import { pageUrl } from './result.js';

const root = document.getElementById('ck');
document.body.classList.add('ck-wide');
const POLL = 2500;
let key = null, code = null, join = null, state = null, data = null, timer = null, shown = '', parts = {}, failures = 0, polling = false, working = false, splitOpen = false;
const triedNow = {};                                        /* round -> id, as soon as the host taps it (the server copy arrives with the next GET /host) */
const isNum = (v) => typeof v === 'number' && isFinite(v);
const keyFromHash = () => hostKeyOf(location.hash.slice(1));
const sidesOf = (s) => (s && Array.isArray(s.sides) && s.sides.length === 2 && s.sides.every((x) => typeof x === 'string' && x) ? s.sides : null);
const hostLink = () => pageUrl('host/') + '#' + key;
const historyLink = () => pageUrl('host/history/') + '#' + key;
function mount(node) { root.textContent = ''; root.appendChild(node); wireDialogs(node); window.scrollTo({ top: 0, behavior: 'instant' }); }
function stop() { clearTimeout(timer); timer = null; }

/* ------------------------------------------------------------------ the front: make a room ------ */
function front(msg) {
  stop(); shown = 'front'; key = null; code = null;
  const w = el('section', 'ck-screen ck-hostscreen');
  w.appendChild(el('h1', 'ck-title', T('host.title')));
  w.appendChild(el('p', 'ck-lede', T('host.lede')));
  if (msg) { const p = el('p', 'ck-status', msg); p.setAttribute('role', 'alert'); w.appendChild(p); }
  const low = el('div', 'ck-bottom');
  const mk = el('button', 'btn solid ck-start', T('host.make')); mk.type = 'button'; mk.id = 'ck-make';
  mk.addEventListener('click', async () => {
    mk.disabled = true; mk.textContent = T('host.making');
    const r = await api('/room/new', { lang: lang() });
    if (!r.ok || !r.code || !r.host_key) { mk.disabled = false; mk.textContent = T('host.make'); return front(T('site.error')); }
    remember(r.host_key, r.code);
    try { history.replaceState(null, '', location.pathname + '#' + r.host_key); } catch (e) { location.hash = r.host_key; }
    openRoom(r.host_key, r);
  });
  low.appendChild(mk);
  low.appendChild(el('p', 'ck-small', T('host.make_sub')));
  const mine = (load().hosts || []).slice().reverse().slice(0, 6);
  if (mine.length) {
    const c = el('section', 'ck-card');
    const list = el('div', 'ck-modes');
    for (const hh of mine) {
      const b = el('a', 'ck-mode'); b.href = '#' + hh.key;
      b.appendChild(el('b', '', hh.code)); b.appendChild(el('span', '', relTime(hh.at)));
      b.addEventListener('click', (e) => { e.preventDefault(); history.replaceState(null, '', location.pathname + '#' + hh.key); openRoom(hh.key); });
      list.appendChild(b);
    }
    c.appendChild(list); low.appendChild(c);
  }
  w.appendChild(low);
  mount(w);
}
function remember(k, c) {
  const st = load(); st.hosts = st.hosts || [];
  const i = st.hosts.findIndex((x) => x.key === k);
  if (i >= 0) { st.hosts[i].at = Date.now(); st.hosts[i].code = c || st.hosts[i].code; } else st.hosts.push({ key: k, code: c, at: Date.now() });
  if (st.hosts.length > 12) st.hosts.splice(0, st.hosts.length - 12);
  save();
}

/* ------------------------------------------------------------------ opening a room, polling ------ */
async function openRoom(k, made) {
  key = k; state = null; data = null; shown = ''; failures = 0; stop();
  const w = el('section', 'ck-screen ck-wait'); w.appendChild(el('p', 'ck-lede', T('host.making'))); mount(w);
  const r = await api('/host/' + key);
  if (!r.ok) {
    if (gone(r) || wrongKey(r)) return front(T('host.not_found'));
    const w2 = el('section', 'ck-screen ck-wait'); const p = el('p', 'ck-lede', T('host.error')); p.setAttribute('role', 'status'); w2.appendChild(p); mount(w2);
    return void setTimeout(() => openRoom(k, made), 3000);
  }
  data = r; code = r.code; join = r.join || (made && made.join) || pageUrl('room/') + '#' + code;     /* the server hands out the join link; this is only the fallback */
  remember(key, code);
  const s = await api('/room/' + code);
  state = s.ok ? s.state : { code, round: r.round || 0, step: r.step || 'lobby', mode: r.mode || null, joined: 0, done: 0 };
  render(); schedule();
}
function schedule() { stop(); timer = setTimeout(poll, document.hidden ? 10000 : failures ? Math.min(12000, POLL * (1 + failures)) : POLL); }
async function poll() {
  if (polling || working) { schedule(); return; }
  polling = true;
  const r = await api('/room/' + code);
  polling = false;
  if (r.ok && r.state) {
    failures = 0; banner(false);
    const before = state;
    state = r.state;
    if (!before || before.round !== state.round || before.step !== state.step) await refreshData();
    render();
  } else if (gone(r)) return front(T('host.not_found'));
  else { failures++; if (failures >= 2) banner(true); }
  if (state && state.step === 'closed') return;
  schedule();
}
async function refreshData() { const r = await api('/host/' + key); if (r.ok) data = r; }
document.addEventListener('visibilitychange', () => { if (!document.hidden && key && timer) { stop(); poll(); } });
window.addEventListener('hashchange', () => { const k = keyFromHash(); if (k && k !== key) openRoom(k); else if (!k) front(); });
function banner(on) {
  let b = document.getElementById('ck-net');
  if (!on) { if (b) b.remove(); return; }
  if (b) return;
  b = el('p', 'ck-status', T('host.error')); b.id = 'ck-net'; b.setAttribute('role', 'status'); b.style.textAlign = 'center'; root.insertBefore(b, root.firstChild);
}

/* an action on the room; the reply carries the new state */
async function act(action, extra) {
  working = true;
  const r = await api(`/room/${code}/host`, Object.assign({ host_key: key, action }, extra || {}), 12000);
  working = false;
  if (r.ok && r.state) { state = r.state; if (action !== 'split') await refreshData(); render(); return true; }
  if (r.error === 'step' || r.error === 'closed') { const g = await api('/room/' + code); if (g.ok && g.state) { state = g.state; await refreshData(); shown = ''; render(); } return false; }     /* the room is somewhere else (another device, a late tap): show where it is */
  banner(!r.ok && r.error === 'network');
  return false;
}

/* ------------------------------------------------------------------ what to show ------ */
const rounds = () => (data && data.rounds) || [];
const roundRec = (n) => rounds().find((r) => r.n === n) || null;
const triedOf = (n) => triedNow[n] || (roundRec(n) && roundRec(n).tried) || null;
function keyOf() {
  const sd = sidesOf(state);
  return [state.step, state.round, state.mode || '', sd ? sd.join('|') : '', state.charts ? 'c' + (state.charts.n || 0) : '', triedOf(state.round) || '', rounds().length].join('~');
}
function render() {
  if (!state) return;
  const k = keyOf();
  if (k === shown) { patch(); return; }
  shown = k; draw();
}
function patch() {
  if (parts.ring) parts.ring.update(state.done || 0, state.joined || 0);
  if (parts.here) parts.here.textContent = T('host.here', { n: fmt(state.joined || 0) });
  if (parts.reveal) { const d = state.done || 0, few = d < 10; parts.revealNote.hidden = !few; parts.revealNote.textContent = T('host.reveal_few', { n: fmt(d) }); }
  if (parts.all) parts.all.hidden = !((state.joined || 0) > 0 && (state.done || 0) >= (state.joined || 0));
}

function bar() {
  const top = el('div', 'ck-hostbar');
  const meta = el('p', 'meta'); meta.appendChild(el('b', '', T('app.chip'))); meta.appendChild(document.createTextNode(T('host.round', { n: state.step === 'lobby' ? state.round + 1 : state.round })));       /* in the lobby: the round about to start */ top.appendChild(meta);
  const right = el('div', 'ck-hostbar-r'); right.style.cssText = 'display:flex;gap:8px;align-items:center';
  if (state.mode) right.appendChild(el('span', 'ck-badge', state.mode === 'live' ? T('host.mode_live') : T('host.mode_open')));
  const here = el('span', 'ck-badge', T('host.here', { n: fmt(state.joined || 0) })); parts.here = here; right.appendChild(here);
  top.appendChild(right);
  return top;
}
function codeShow(c, small) { const d = el('div', 'ck-codeshow' + (small ? ' small' : '')); d.setAttribute('aria-label', c); for (const ch of c) d.appendChild(el('i', '', ch)); return d; }
function linkRow(url, label) {
  const r = el('div', 'ck-linkrow'); r.appendChild(el('code', '', url));
  const b = el('button', 'chip', T(label)); b.type = 'button';
  b.addEventListener('click', async () => { const ok = await copyText(url); if (ok) { b.textContent = T('host.copied'); setTimeout(() => { b.textContent = T(label); }, 1600); } });
  r.appendChild(b); return r;
}
/* "logicers.com/checkin": where the people type the code */
function siteLine() { try { const u = new URL(pageUrl('')); return (u.host + u.pathname).replace(/\/$/, ''); } catch (e) { return 'logicers.com/checkin'; } }
function joinCard(full) {
  const c = el('section', 'ck-card ck-joincard');
  const line = () => el('p', 'ck-quiet', T('host.code_line', { site: siteLine() }));
  if (full) {
    const two = el('div', 'ck-host-two');
    const left = el('div'); const qr = qrSvg(join, T('host.qr_label', { code })); if (qr) left.appendChild(qr);
    const right = el('div'); right.appendChild(line()); right.appendChild(codeShow(code)); right.appendChild(linkRow(join, 'host.copy_join'));
    two.appendChild(left); two.appendChild(right); c.appendChild(two);
  } else {
    c.appendChild(line()); c.appendChild(codeShow(code, true)); c.appendChild(linkRow(join, 'host.copy_join'));
  }
  c.appendChild(el('p', 'ck-small ck-hostlink-h', T('host.host_link'))); c.appendChild(linkRow(hostLink(), 'host.copy_host'));
  c.appendChild(el('p', 'ck-small', T('host.links_live')));
  if (full) c.appendChild(el('p', 'ck-small', T('host.check_too')));
  return c;
}

function draw() {
  parts = {};
  const w = el('section', 'ck-screen ck-hostscreen');
  w.appendChild(bar());
  const body = el('div', 'ck-roombody'); w.appendChild(body);
  if (state.step === 'lobby') drawLobby(body);
  else if (state.step === 'play') drawPlay(body);
  else drawAfter(body);
  mount(w);
}

/* --- lobby: the code, the two ways to start, the split --- */
function drawLobby(body) {
  const grid = el('div', 'ck-grid');
  const left = el('div'), right = el('div');
  left.appendChild(joinCard(true));
  const t = triedOf(state.round);
  if (state.round >= 1 && t) { const c = el('section', 'ck-card ck-lever'); c.appendChild(el('p', 'ck-advice-line', T('host.tried_wait', { lever: T('lever.short.' + t) }))); left.appendChild(c); }
  right.appendChild(el('h1', 'ck-title-s', T('host.lobby_h')));
  const modes = el('div', 'ck-modes');
  const live = el('button', 'ck-mode primary'); live.type = 'button'; live.id = 'ck-live'; live.appendChild(el('b', '', T('host.start_live'))); live.appendChild(el('span', '', T('host.start_live_sub')));
  const open = el('button', 'ck-mode'); open.type = 'button'; open.id = 'ck-open'; open.appendChild(el('b', '', T('host.start_open'))); open.appendChild(el('span', '', T('host.start_open_sub')));
  for (const [b, a] of [[live, 'start'], [open, 'open']]) b.addEventListener('click', async () => { modes.querySelectorAll('button').forEach((x) => { x.disabled = true; }); const ok = await act(a); if (!ok) modes.querySelectorAll('button').forEach((x) => { x.disabled = false; }); });
  modes.appendChild(live); modes.appendChild(open); right.appendChild(modes);
  if (sidesOf(state) || splitOpen) right.appendChild(splitCard());
  else { const so = el('button', 'ck-link', T('host.split_link')); so.type = 'button'; so.id = 'ck-split-open'; so.addEventListener('click', () => { splitOpen = true; so.replaceWith(splitCard()); }); right.appendChild(so); }
  grid.appendChild(left); grid.appendChild(right);
  body.appendChild(grid);
}

/* --- the split: two names, from a list or typed --- */
function splitCard() {
  const c = el('section', 'ck-card ck-split');
  const cur = sidesOf(state);
  c.appendChild(el('h2', '', T('host.split_h'))); c.appendChild(el('p', 'ck-quiet', T('host.split_sub')));
  if (!cur) c.appendChild(el('p', 'ck-quiet', T('host.split_pick')));
  if (cur) {
    c.appendChild(el('p', 'ck-sideNow', T('host.split_now', { a: cur[0], b: cur[1] })));
    c.appendChild(el('p', 'ck-small', T('host.side_from')));
    const off = el('button', 'ck-link', T('host.split_off')); off.type = 'button'; off.id = 'ck-split-off'; off.addEventListener('click', () => { splitOpen = false; act('split', { sides: null }); }); c.appendChild(off);
    return c;
  }
  const pre = el('div', 'ck-presets');
  const list = raw('host.presets');
  for (const pair of Array.isArray(list) ? list : []) {
    const b = el('button', 'chip', pair[0] + ' · ' + pair[1]); b.type = 'button'; b.addEventListener('click', () => act('split', { sides: [pair[0], pair[1]] })); pre.appendChild(b);
  }
  c.appendChild(pre);
  const ins = el('div', 'ck-sidein');
  const a = el('input', 'ck-input'); a.maxLength = 32; a.placeholder = T('host.side_a'); a.setAttribute('aria-label', T('host.side_a'));
  const b = el('input', 'ck-input'); b.maxLength = 32; b.placeholder = T('host.side_b'); b.setAttribute('aria-label', T('host.side_b'));
  ins.appendChild(a); ins.appendChild(b); c.appendChild(ins);
  const set = el('button', 'btn ghost', T('host.split_set')); set.type = 'button'; set.style.cssText = 'margin-top:10px;width:100%'; set.disabled = true;
  const check = () => { set.disabled = !(a.value.trim() && b.value.trim() && a.value.trim().toLowerCase() !== b.value.trim().toLowerCase()); };
  a.addEventListener('input', check); b.addEventListener('input', check);
  set.addEventListener('click', () => act('split', { sides: [a.value.trim(), b.value.trim()] }));
  c.appendChild(set);
  c.appendChild(el('p', 'ck-small', T('host.side_from')));
  const none = el('button', 'ck-link', T('host.split_off')); none.type = 'button'; none.addEventListener('click', () => { splitOpen = false; shown = ''; render(); }); c.appendChild(none);
  return c;
}

/* --- while people answer: the ring, the code still in view, Reveal --- */
function drawPlay(body) {
  const grid = el('div', 'ck-grid');
  const left = el('div'), right = el('div');
  const c = el('section', 'ck-card ck-wait');
  c.appendChild(el('h1', 'ck-title-s', state.mode === 'live' ? T('host.live_now', { n: state.round }) : T('host.open_now', { n: state.round })));
  if (state.mode === 'open' && isNum(state.reveal_at)) c.appendChild(el('p', 'ck-quiet', T('host.open_till', { date: dayMonth(state.reveal_at, true) })));
  const ring = countRing(state.done || 0, state.joined || 0); parts.ring = ring; c.appendChild(ring);
  const all = el('p', 'ck-status ok', T('host.all_done')); parts.all = all; c.appendChild(all);
  const sd = sidesOf(state); if (sd) c.appendChild(el('p', 'ck-sideNow', T('host.split_now', { a: sd[0], b: sd[1] })));
  const rev = el('button', 'btn solid ck-start', state.mode === 'open' ? T('host.see_results') : T('host.reveal')); rev.type = 'button'; rev.id = 'ck-reveal'; parts.reveal = rev;
  rev.addEventListener('click', async () => { rev.disabled = true; const ok = await act('reveal'); if (!ok) rev.disabled = false; });
  const note = el('p', 'ck-small', ''); parts.revealNote = note;
  c.appendChild(rev); c.appendChild(note);
  if (state.mode === 'live') c.appendChild(el('p', 'ck-small', T('host.auto_reveal')));
  if (state.mode === 'open') c.appendChild(closeButton(T('host.close_now')));
  patch();
  left.appendChild(c); right.appendChild(joinCard(false));
  grid.appendChild(left); grid.appendChild(right); body.appendChild(grid);
}

/* --- after the reveal (and when closed): the group, the lever, what moved, the next step --- */
function drawAfter(body) {
  const closed = state.step === 'closed';
  const n = state.round, rec = roundRec(n);
  const hd = el('div', 'ck-roomhead'); hd.style.marginTop = '10px';
  hd.appendChild(el('h1', 'ck-title-s', closed ? T('host.closed') : T('host.revealed_h', { n })));
  body.appendChild(hd);
  if (rec) body.appendChild(el('p', 'ck-quiet', T('host.people_rounds', { n: fmt(rec.people || state.done || 0), r: fmt(rounds().length) })));
  if (state.charts) {
    const lowest = lowestOf(state.charts);
    body.appendChild(groupNode(state.charts, { cmp: data && data.world ? { world: data.world, country: data.country || null } : null, big: true, mark: lowest }));
    const lv = leverCard(lowest, n); if (lv) body.appendChild(lv);
    const mv = movedCard(n); if (mv) body.appendChild(mv);
  }
  const acts = el('div', 'ck-hostacts');
  if (!closed) {
    const next = el('button', 'btn solid', T('host.new_round')); next.type = 'button'; next.id = 'ck-next';
    next.addEventListener('click', () => {
      const d = sheet('dlg-next', T('host.new_round'), `<p></p><div class="actions"><button class="btn solid" id="next-yes" type="button"></button><button class="btn ghost" type="button" data-close></button></div>`);
      d.querySelector('p').textContent = T('host.next_sure'); d.querySelector('#next-yes').textContent = T('host.next_yes', { n: state.round + 1 }); d.querySelector('[data-close]').textContent = T('host.next_no');
      d.querySelector('#next-yes').addEventListener('click', async () => { d.close(); next.disabled = true; const ok = await act('next'); if (!ok) next.disabled = false; }, { once: true });
      wireDialogs(d); d.showModal();
    });
    acts.appendChild(next);
  }
  const hist = el('a', 'btn ghost', T('host.history')); hist.href = historyLink(); acts.appendChild(hist);
  if (!closed) acts.appendChild(closeButton(T('host.close')));
  body.appendChild(acts);
  body.appendChild(el('p', 'ck-small', T('host.keep')));
  if (!closed) body.appendChild(joinCard(false));
}
/* "Close the room" (and "Close now" on an open round), with the sure-sheet */
function closeButton(label) {
  const cl = el('button', 'btn ghost', label); cl.type = 'button'; cl.id = 'ck-close';
  cl.addEventListener('click', () => {
    const d = sheet('dlg-close', T('host.close'), `<p></p><div class="actions"><button class="btn solid" id="close-yes" type="button"></button><button class="btn ghost" type="button" data-close></button></div>`);
    d.querySelector('p').textContent = T('host.close_sure'); d.querySelector('#close-yes').textContent = T('host.close_yes'); d.querySelector('[data-close]').textContent = T('host.close_no');
    d.querySelector('#close-yes').addEventListener('click', async () => { d.close(); await act('close'); }, { once: true });
    wireDialogs(d); d.showModal();
  });
  return cl;
}

/* the one thing to start with: the lowest bar and a plain line, from the job demands-resources literature and the HSE standards */
function leverCard(lowest, n) {
  const c = el('section', 'ck-card ck-lever');
  c.appendChild(el('h2', '', T('host.lever_h')));
  if (!lowest) { c.appendChild(el('p', 'ck-advice-line', T('host.nothing_weighs'))); return c; }
  c.appendChild(el('p', 'ck-lowest', T('host.lever_lowest', { bar: T('bar.' + lowest) })));
  c.appendChild(el('p', 'ck-advice-line', T('host.lever.' + lowest)));
  c.appendChild(el('p', 'ck-small', T('host.ask_first')));
  const t = triedOf(n);
  if (t === lowest) { const p = el('p', 'ck-status ok', T('host.tried', { bar: T('bar.' + lowest) })); p.setAttribute('role', 'status'); c.appendChild(p); }
  else if (state.step !== 'closed') {
    const b = el('button', 'btn solid', T('host.try')); b.type = 'button'; b.id = 'ck-try';
    b.addEventListener('click', async () => {
      b.disabled = true; const r = await api(`/host/${key}/tried`, { round: n, id: lowest });
      if (r.ok) { triedNow[n] = lowest; shown = ''; render(); } else b.disabled = false;
    });
    c.appendChild(b);
  }
  const why = el('a', 'ck-link', T('res.why')); why.href = researchersUrl('#advice-host'); c.appendChild(why);
  return c;
}
/* did the bar the host chose last time move? needs both rounds above 10 */
function movedCard(n) {
  let prev = null;
  for (const r of rounds().slice().sort((a, b) => b.n - a.n)) if (r.n < n && (r.tried || triedNow[r.n])) { prev = r; break; }
  if (!prev) return null;
  const id = triedNow[prev.n] || prev.tried;
  const before = byIds(prev.bars, BAR_IDS)[id], now = state.charts ? norm(state.charts).bars[id] : undefined;
  const c = el('section', 'ck-moved');
  if (!isNum(before) || !isNum(now)) { c.appendChild(el('span', '', T('host.moved_none'))); return c; }
  const d = barSigned(now) - barSigned(before);
  const dir = d >= 0.1 ? 'up' : d <= -0.1 ? 'down' : 'same';
  c.classList.add(dir);
  if (dir !== 'same') c.appendChild(el('span', 'arrow', dir === 'up' ? '▲' : '▼'));
  c.appendChild(el('span', '', T('host.moved', { lever: T('lever.short.' + id), bar: T('bar.' + id), from: Math.round(before), to: Math.round(now) })));
  return c;
}

/* ------------------------------------------------------------------ start ------ */
(async function main() {
  await initStrings();
  document.title = T('host.title') + ' | Logicers';
  document.getElementById('ck-namechip').textContent = T('app.chip');
  langChip(); howSheet(); smallPrint(); wireDialogs(document);
  const k = keyFromHash();
  if (k) openRoom(k); else front(location.hash.length > 1 ? T('host.not_found') : undefined);
})().catch((e) => { root.textContent = ''; root.appendChild(el('p', 'ck-lede', 'Could not start. ' + (e && e.message ? e.message : ''))); });
