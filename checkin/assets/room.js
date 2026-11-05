/* Check-in: the player in a room (chat C, 4 Nov 2026).
   One page for every state of a round: lobby, answering, waiting, reveal, new round, closed. The page asks the room every 2.5 s
   (GET /room/:code) and only redraws when the round, the step or the person's own situation changed; counts update in place.
   The player's room key is its own random string per room, never the research ID.
   Motion (5 Nov 2026, claude/motion-spec.md 4): a new screen enters; a redraw of the same screen stays still and keeps its
   place; "{n} here" counts to each new number and pulses softly while the room waits for the host; "Your host has started"
   and "Round 3 is open" pop once; the waiting ring turns with its count; the reveal enters card after card (group.js). */
import { el, T, fmt, load, save, hex, api, gone, cleanCode, CODE_LEN, initStrings, langChip, howSheet, smallPrint, wireDialogs, copyText, dayMonth } from './core.js';
import { runFlow } from './flow.js';
import { makeEntry, addEntry, fetchComparison, startUpload, resultNode, pageUrl } from './result.js';
import { groupNode, fewCard, groupTimeline } from './group.js';
import { countRing, countTo } from './charts.js';
import { screenIn, show, pulse } from './motion.js';

const root = document.getElementById('ck');
const POLL = 2500;
let code = null, rs = null, state = null, timer = null, inFlow = false, shown = '', parts = {}, failures = 0, polling = false, rejoining = false;
let lastScreen = '';                                         /* the screen last drawn: a redraw of the same one does not enter again */
const once = new Set();                                      /* what has popped or played once on this page: banners, "started", reveals */

const sidesOf = (s) => (s && Array.isArray(s.sides) && s.sides.length === 2 && s.sides.every((x) => typeof x === 'string' && x) ? s.sides : null);
function entryFor(round) { const hs = load().history; for (let i = hs.length - 1; i >= 0; i--) if (hs[i].room === code && hs[i].round === round) return hs[i]; return null; }
/* the phone is counted as "here" from the moment it joins until the next reveal empties the room's list; so it joins again after each reveal.
   epochOf: the number of the last revealed round the join belongs to */
const epochOf = (s) => (s.step === 'play' ? s.round - 1 : s.round);
/* the round a tap belongs to: in the lobby the one about to start (the room's `round` is still the last one played) */
const rno = () => (state.step === 'lobby' ? state.round + 1 : state.round);

/* ------------------------------------------------------------------ the code form ------ */
function codeScreen(msg) {
  inFlow = false; stopPoll(); shown = 'code';
  const w = el('section', 'ck-screen');
  w.appendChild(el('h1', 'ck-title', T('room.title')));
  w.appendChild(el('p', 'ck-lede', T('room.code_h')));
  if (msg) { const p = el('p', 'ck-status', msg); p.setAttribute('role', 'alert'); w.appendChild(p); }
  const form = el('form', 'ck-codeform'); form.style.marginTop = '14px';
  const inp = el('input', 'ck-input'); inp.placeholder = T('room.code_ph'); inp.maxLength = CODE_LEN; inp.autocapitalize = 'characters'; inp.autocomplete = 'off'; inp.setAttribute('aria-label', T('room.code_ph'));
  const go = el('button', 'btn solid', T('room.join')); go.type = 'submit';
  form.appendChild(inp); form.appendChild(go); w.appendChild(form);
  form.addEventListener('submit', (e) => { e.preventDefault(); const c = cleanCode(inp.value); if (!c) return; if (location.hash === '#' + c) enter(c); else location.hash = c; });
  mount(w, 'code'); setTimeout(() => inp.focus({ preventScroll: true }), 50);
}
/* screen: what this screen is; the same screen drawn again (fresher numbers, a late comparison) keeps the scroll and stays still */
function mount(node, screen) {
  const same = !!screen && screen === lastScreen, y = window.scrollY;
  lastScreen = screen || '';
  root.textContent = ''; root.appendChild(node); wireDialogs(node);
  if (same) window.scrollTo({ top: y, behavior: 'instant' }); else { window.scrollTo({ top: 0, behavior: 'instant' }); screenIn(node); }
}

/* ------------------------------------------------------------------ joining and polling ------ */
async function enter(c) {
  code = cleanCode(c); if (!code) return codeScreen();
  const st = load(); st.rooms = st.rooms || {};
  rs = st.rooms[code] || (st.rooms[code] = { key: hex(16), sides: {} }); rs.sides = rs.sides || {}; rs.seen = Date.now(); save();
  state = null; shown = ''; inFlow = false; failures = 0;
  const w = el('section', 'ck-screen ck-wait'); w.appendChild(el('p', 'ck-lede', T('room.joining'))); mount(w, 'joining');
  await joinLoop();
}
async function joinLoop() {
  const r = await api(`/room/${code}/join`, { key: rs.key });
  if (r.ok) { state = r.state; rs.ep = epochOf(state); save(); render(); schedule(); return; }
  if (gone(r)) return codeScreen(T('room.not_found'));
  if (r.error === 'full') return codeScreen(T('room.full'));
  if (r.error === 'closed') {
    const g = await api(`/room/${code}`);
    state = g.ok ? g.state : { code, step: 'closed', round: 1 }; state.step = 'closed'; render(); return;
  }
  if (r.error === 'key') { rs.key = hex(16); save(); }
  const w = el('section', 'ck-screen ck-wait'); const p = el('p', 'ck-lede', T('room.err')); p.setAttribute('role', 'status'); w.appendChild(p); mount(w, 'err');
  setTimeout(joinLoop, 3000);
}
function stopPoll() { clearTimeout(timer); timer = null; }
function schedule() { stopPoll(); const wait = document.hidden ? 12000 : failures ? Math.min(12000, POLL * (1 + failures)) : POLL; timer = setTimeout(poll, wait); }
async function poll() {
  if (polling) return; polling = true;
  const r = await api(`/room/${code}`);
  polling = false;
  if (r.ok && r.state) {
    failures = 0; state = r.state; setBanner(false);
    if (state.step !== 'closed' && state.step !== 'reveal' && rs.ep !== epochOf(state)) await rejoin();            /* after a reveal the room's list is empty: the phone says again that it is here */
    render();
  }
  else if (gone(r)) { return codeScreen(T('room.not_found')); }
  else { failures++; if (failures >= 2) setBanner(true); }
  if (state && state.step === 'closed') return;           /* nothing more will change */
  schedule();
}
document.addEventListener('visibilitychange', () => { if (!document.hidden && code && timer) { stopPoll(); poll(); } });
window.addEventListener('hashchange', () => { const c = cleanCode(location.hash.slice(1)); if (c && c !== code) enter(c); else if (!c) codeScreen(); });

async function rejoin() {
  if (rejoining) return false;
  rejoining = true;
  const r = await api(`/room/${code}/join`, { key: rs.key });
  rejoining = false;
  if (r.ok) { if (r.state) state = r.state; rs.ep = epochOf(state); save(); return true; }
  return false;
}
function setBanner(on) {
  let b = document.getElementById('ck-net');
  if (!on) { if (b) b.remove(); return; }
  if (b) return;
  b = el('p', 'ck-status', T('room.err')); b.id = 'ck-net'; b.setAttribute('role', 'status'); b.style.textAlign = 'center';
  root.insertBefore(b, root.firstChild);
}

/* ------------------------------------------------------------------ what to show ------ */
function phaseOf() {
  const s = state; if (!s) return 'loading';
  const mine = entryFor(s.round);
  if (s.step === 'closed') return 'closed';
  if (s.step === 'reveal') return mine ? 'reveal' : 'reveal-late';
  if (s.step === 'play') return mine ? 'waiting' : 'intro';
  return 'lobby';
}
function render() {
  if (!state) return;
  const ph = phaseOf();
  if (inFlow) return;                                      /* never pull the phone out of the 20 taps */
  const key = keyOf(ph);
  if (key === shown) { patchCounts(); return; }
  shown = key; draw(ph, sidesOf(state));
}
function keyOf(ph) {
  const sd = sidesOf(state), mySide = rs.sides[rno()];
  return [ph || phaseOf(), state.round, sd ? sd.join('|') : '', mySide === undefined ? '' : mySide, state.charts ? 'c' + (state.charts.n || 0) : '', state.mode || ''].join('~');
}
function patchCounts() {
  if (parts.ring) parts.ring.update(state.done || 0, state.joined || 0);
  if (parts.here) hereTo(parts.here, state.joined || 0);
}
/* "{n} here" counts from the number it shows to the new one */
function hereTo(node, n) {
  const say = (v) => T('room.here', { n: fmt(Math.round(v)) });
  if (node.ckN === undefined || node.ckN === n) node.textContent = say(n); else countTo(node, n, { from: node.ckN, say });
  node.ckN = n;
}

function head(ph) {
  const top = el('div', 'ck-roomhead');
  const meta = el('p', 'meta'); meta.appendChild(el('b', '', T('app.chip'))); meta.appendChild(document.createTextNode(T('room.round', { n: rno() })));
  top.appendChild(meta);
  const here = el('span', 'ck-badge', ''); hereTo(here, state.joined || 0); parts.here = here; top.appendChild(here);
  pulse(here, ph === 'lobby');                               /* waiting for the host: a soft pulse until the round starts */
  return top;
}

function draw(ph, sd) {
  parts = {};
  const w = el('section', 'ck-screen ck-room');
  w.appendChild(head(ph));
  const body = el('div', 'ck-roombody'); w.appendChild(body);
  const answered = entryFor(state.round);

  if (ph === 'lobby' || ph === 'intro') {
    const first = (load().history || []).some((e) => e.room === code);
    if (first && ((ph === 'lobby' && state.round >= 1) || (ph === 'intro' && state.round >= 2 && !answered))) { const b = el('p', 'ck-banner', T('room.new_round', { n: rno() })); b.setAttribute('role', 'status'); body.appendChild(b); popOnce(b, 'banner' + rno()); }
    const c = el('section', 'ck-card ck-wait');
    const h1 = el('h1', 'ck-title-s', ph === 'lobby' ? T('room.in') : (state.mode === 'live' ? T('room.round_live') : T('room.round_open')));
    c.appendChild(h1);
    if (ph === 'intro' && state.mode === 'live') popOnce(h1, 'started' + state.round);
    if (ph === 'lobby') { c.appendChild(el('p', 'ck-quiet', T('room.waiting_start'))); c.appendChild(el('p', 'ck-small', T('room.privacy'))); }
    if (ph === 'intro' && state.mode === 'open' && typeof state.reveal_at === 'number') c.appendChild(el('p', 'ck-quiet', T('room.open_till', { date: dayMonth(state.reveal_at, true) })));
    if (sd) c.appendChild(sidePicker(sd));
    body.appendChild(c);
    if (ph === 'intro') {
      const low = el('div', 'ck-bottom');
      const go = el('button', 'btn solid ck-start', T('room.start')); go.type = 'button';
      go.disabled = !!sd && rs.sides[state.round] === undefined; go.id = 'ck-go';
      go.addEventListener('click', () => beginFlow());
      low.appendChild(go); low.appendChild(el('p', 'ck-small', T('room.privacy')));
      w.appendChild(low);
    }
  } else if (ph === 'waiting') {
    const c = el('section', 'ck-card ck-wait');
    c.appendChild(el('h1', 'ck-title-s', T('room.thanks')));
    const ring = countRing(state.done || 0, state.joined || 0); parts.ring = ring; c.appendChild(ring);
    c.appendChild(el('p', 'ck-quiet', T('room.waiting_reveal')));
    if (state.step === 'play' && state.mode === 'live') { /* live: the host reveals when the ring is full */ }
    const redo = el('button', 'ck-link', T('room.redo')); redo.type = 'button'; redo.addEventListener('click', () => beginFlow()); c.appendChild(redo);
    body.appendChild(c);
    body.appendChild(ownResult(answered));
  } else if (ph === 'reveal' || ph === 'reveal-late' || ph === 'closed') {
    if (ph === 'closed') { const c = el('section', 'ck-card'); c.appendChild(el('h1', 'ck-title-s', T('room.over'))); body.appendChild(c); }
    if (ph === 'reveal-late') { const c = el('section', 'ck-card'); c.appendChild(el('h1', 'ck-title-s', T('room.round_over'))); body.appendChild(c); }
    if (state.charts) {
      const mineE = answered || null;
      const g = groupNode(state.charts, { player: true, cmp: mineE && mineE.cmp, mine: mineE ? { who: mineE.who, a: mineE.a, ladder: mineE.a && mineE.a.ladder } : null });
      body.appendChild(g);
      if (!once.has('reveal' + state.round)) { once.add('reveal' + state.round); groupTimeline(g); }      /* the reveal enters, then the group's number counts */
      if (!state.charts.n || state.charts.n < 10) { /* groupNode already says "not enough yet" */ }
    }
    if (answered) { const h2 = el('h2', 'ck-subh', T('room.your_result')); body.appendChild(h2); body.appendChild(ownResult(answered)); }
    else if (state.step !== 'closed') { /* late: nothing more to do this round */ }
  }
  const leave = el('a', 'ck-link ck-leave', T('room.leave')); leave.href = pageUrl(''); w.appendChild(leave);
  mount(w, ph + '~' + state.round);
}
function popOnce(node, key) { if (once.has(key)) return; once.add(key); show(node, 'pop'); }

function sidePicker(sd) {
  const box = el('div', 'ck-sidebox');
  box.appendChild(el('h2', 'ck-subh', T('room.side_h')));
  const row = el('div', 'ck-sides');
  sd.forEach((name, i) => {
    const b = el('button', 'btn ghost' + (rs.sides[rno()] === i ? ' on' : ''), name); b.type = 'button'; b.dataset.side = String(i);
    b.addEventListener('click', () => { rs.sides[rno()] = i; save(); row.querySelectorAll('.btn').forEach((x) => x.classList.remove('on')); b.classList.add('on'); const go = document.getElementById('ck-go'); if (go) go.disabled = false; shown = keyOf(); });
    row.appendChild(b);
  });
  box.appendChild(row);
  return box;
}

const uploads = new Map();                                  /* one pending upload per check-in, even if the page is drawn twice */
const uploadFor = (e) => { if (!uploads.has(e.at)) uploads.set(e.at, startUpload(e)); return uploads.get(e.at); };
const comparisons = new Map();                              /* the comparison on its way, so the result's card fills in place */
function ownResult(entry) {
  const cmp = entry.cmp ? Promise.resolve(entry.cmp) : (comparisons.get(entry.at) || null);
  const node = resultNode(entry, { cmp, upload: (!entry.consent && Date.now() - entry.at < 24 * 3600e3) ? uploadFor(entry) : null, cta: false });
  if (entry.send && entry.send.failed) node.insertBefore(sendCard(entry), node.firstChild);
  else if (entry.send && entry.send.error) { const c = el('section', 'ck-card'); c.appendChild(el('p', 'ck-quiet', T('room.late'))); node.insertBefore(c, node.firstChild); }
  return node;
}
function sendCard(entry) {
  const c = el('section', 'ck-card'); c.appendChild(el('p', 'ck-quiet', T('room.err')));
  const b = el('button', 'btn solid', T('site.try_again')); b.type = 'button'; b.style.marginTop = '10px';
  b.addEventListener('click', async () => { b.disabled = true; const ok = await sendDone(entry); if (ok) { shown = ''; render(); } else b.disabled = false; });
  c.appendChild(b); return c;
}

/* ------------------------------------------------------------------ the 20 taps, then sending ------ */
function beginFlow() {
  const round = state.round;
  inFlow = true; stopPoll(); schedule();                   /* keep listening so the counts are fresh at the end, but never redraw */
  lastScreen = 'flow';
  const a = {};
  runFlow(root, { a, i: 0, onChange() {}, onDone(final) { finish(final, round); } });
}
async function finish(a, round) {
  inFlow = false;
  const sd = sidesOf(state), side = sd ? rs.sides[round] : undefined;
  /* an earlier answer of this round (a redo) is replaced, on the phone as well as in the room; `first` is judged before it goes */
  const st = load(); const first = st.history.length === 0;
  st.history = st.history.filter((e) => !(e.room === code && e.round === round));
  const entry = addEntry(makeEntry(a, { room: code, tag: state && state.tag || null, round, side: side === undefined ? null : side, first }));
  /* the comparison fills the result's card where it stands; only a reveal (whose curve shows it too) is drawn again for it */
  const cmpP = fetchComparison(entry); comparisons.set(entry.at, cmpP);
  cmpP.then(() => { if (!inFlow && state && state.step !== 'play') { shown = ''; render(); } });
  const waiting = el('section', 'ck-screen ck-wait'); waiting.appendChild(el('p', 'ck-lede', T('room.joining'))); mount(waiting, 'sending');
  await sendDone(entry);                                   /* if the round ended meanwhile, the answers stay on the phone and the page says so */
  uploadFor(entry);
  shown = ''; render();
}
async function sendDone(entry) {
  const body = { key: rs.key, round: entry.round, a: entry.a, role: entry.role };
  if (entry.side === 0 || entry.side === 1) body.side = entry.side;
  for (let k = 0; k < 3; k++) {
    const r = await api(`/room/${code}/done`, body, 10000);
    if (r.ok) { entry.send = { ok: true }; if (r.state) state = r.state; save(); return true; }
    if (r.error === 'side' && body.side !== undefined) { delete body.side; continue; }               /* the host took the split off meanwhile */
    /* closed: the round was revealed; round: the room is at another round; unknown: the room is gone; anything else the server names: refused */
    const transient = r.error === 'network' || r.error === 'bad' || r.error === 'server' || r.error === 'busy' || r.status === 429 || r.status >= 500;
    if (!transient) { entry.send = { failed: false, error: r.error || 'refused' }; save(); api(`/room/${code}`).then((g) => { if (g.ok && g.state) { state = g.state; if (!inFlow) { shown = ''; render(); } } }); return false; }
    await new Promise((res) => setTimeout(res, 1200 * (k + 1)));
  }
  entry.send = { failed: true, error: 'network' }; save(); return false;
}

/* ------------------------------------------------------------------ start ------ */
(async function main() {
  await initStrings();
  document.title = T('room.title') + ' | Logicers';
  document.getElementById('ck-namechip').textContent = T('app.chip');
  langChip(); howSheet(); smallPrint(); wireDialogs(document);
  const c = cleanCode(location.hash.slice(1));
  if (c) enter(c); else codeScreen();
})().catch((e) => { root.textContent = ''; root.appendChild(el('p', 'ck-lede', 'Could not start. ' + (e && e.message ? e.message : ''))); });
