/* Check-in: the solo page and the section's front (chat C, 4 Nov 2026).
   Front -> 20 taps -> result (+ the one-tap room, the research consent card, the end card). Everything personal stays on the phone. */
import { el, h, T, fmt, load, save, cleanCode, CODE_LEN, initStrings, langChip, howSheet, smallPrint, wireDialogs, stats, dayMonth } from './core.js';
import { runFlow } from './flow.js';
import { dialArt } from './charts.js';
import { makeEntry, addEntry, fetchComparison, startUpload, resultNode, pageUrl } from './result.js';

const root = document.getElementById('ck');

function lastEntry() { const hs = load().history; for (let i = hs.length - 1; i >= 0; i--) if (typeof hs[i].who === 'number') return hs[i]; return null; }

function front() {
  const st = load();
  const w = el('section', 'ck-screen ck-front');
  w.appendChild(el('h1', 'ck-title', T('front.title')));
  w.appendChild(el('p', 'ck-lede', T('front.lede')));
  w.appendChild(dialArt());
  const counter = el('p', 'ck-count', ''); w.appendChild(counter);
  const world = el('p', 'ck-small ck-worldline', ''); w.appendChild(world);
  stats().then((s) => {
    if (s && typeof s.checked_in === 'number' && s.checked_in >= 1) counter.textContent = T('front.counter', { n: fmt(s.checked_in) });
    if (s && typeof s.today === 'number' && s.today >= 1 && typeof s.countries === 'number') world.textContent = T('front.world', { n: fmt(s.today), c: fmt(s.countries) });
  });

  const low = el('div', 'ck-bottom');
  const last = lastEntry();
  const draft = st.draft && Object.keys(st.draft.a || {}).length ? st.draft : null;
  const start = el('button', 'btn solid ck-start', draft ? T('front.carry_on') : T('front.start')); start.type = 'button';
  start.addEventListener('click', () => startFlow(false));
  low.appendChild(start);
  if (draft) { const again = el('button', 'ck-link', T('front.start_over')); again.type = 'button'; again.addEventListener('click', () => startFlow(true)); low.appendChild(again); }
  if (last) {
    const l = el('button', 'ck-last'); l.type = 'button';
    l.appendChild(el('span', '', T('front.last', { score: Math.round(last.who), date: dayMonth(last.at) })));
    l.appendChild(el('b', '', '→'));
    l.addEventListener('click', () => showResult(last, false));
    low.appendChild(l);
  }
  low.appendChild(el('p', 'ck-small', T('front.small')));

  const team = el('div', 'ck-team');
  const tb = el('a', 'ck-link', T('front.team')); tb.href = pageUrl('host/'); team.appendChild(tb);
  low.appendChild(team);

  const join = el('form', 'ck-card ck-codecard');
  join.appendChild(el('h2', '', T('front.code_h')));
  const row = el('div', 'ck-codeform');
  const inp = el('input', 'ck-input'); inp.placeholder = T('front.code_ph'); inp.maxLength = CODE_LEN; inp.autocapitalize = 'characters'; inp.autocomplete = 'off'; inp.setAttribute('aria-label', T('front.code_ph'));
  const go = el('button', 'btn solid', T('front.join')); go.type = 'submit';
  row.appendChild(inp); row.appendChild(go); join.appendChild(row);
  join.addEventListener('submit', (e) => { e.preventDefault(); const c = cleanCode(inp.value); if (c) location.href = pageUrl('room/') + '#' + c; });
  low.appendChild(join);
  w.appendChild(low);
  root.textContent = ''; root.appendChild(w); wireDialogs(w);
  if (location.hash === '#result') history.replaceState(null, '', location.pathname + location.search);
}

function startFlow(fresh) {
  const st = load();
  if (fresh || !st.draft) st.draft = { a: {}, i: 0 };
  save();
  runFlow(root, {
    a: st.draft.a, i: st.draft.i,
    onChange(a, i) { st.draft = { a, i }; save(); },
    onDone(a) { finish(a); }
  });
}

function finish(a) {
  const st = load();
  const entry = addEntry(makeEntry(a));
  st.draft = null; save();
  const cmp = fetchComparison(entry);
  const upload = startUpload(entry);
  showResult(entry, true, { cmp, upload });
}

function showResult(entry, fresh, p) {
  const w = el('section', 'ck-screen ck-resultpage');
  w.appendChild(resultNode(entry, { cmp: p && p.cmp, upload: p && p.upload, cta: true }));
  root.textContent = ''; root.appendChild(w); wireDialogs(w);
  window.scrollTo({ top: 0, behavior: 'instant' });
  try { history.replaceState(null, '', location.pathname + location.search + '#result'); } catch (e) { /* no history API */ }
  const back = el('button', 'ck-link ck-toplink', '‹ ' + T('app.chip')); back.type = 'button'; back.addEventListener('click', front);
  w.insertBefore(back, w.firstChild);
}

(async function main() {
  await initStrings();
  document.title = T('app.name') + ' | Logicers';
  document.getElementById('ck-namechip').textContent = T('app.chip');
  langChip(); howSheet(); smallPrint(); wireDialogs(document);
  const last = lastEntry();
  if (location.hash === '#result' && last) showResult(last, false); else front();
})().catch((e) => { root.textContent = ''; root.appendChild(el('p', 'ck-lede', 'Could not start. ' + (e && e.message ? e.message : ''))); });
