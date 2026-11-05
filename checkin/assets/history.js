/* Check-in: the host history page (chat C, 4 Nov 2026).
   Every round of one room, newest first: the group score by round, and for each round the same pictures as the reveal
   (only from 10 people), the sides, and the lever the host chose. Group totals only; the server keeps nothing per person.
   Motion (5 Nov 2026): the page enters, the rounds' columns rise, the rounds enter one after another, 40 ms apart. */
import { el, T, fmt, api, gone, wrongKey, hostKeyOf, initStrings, langChip, howSheet, smallPrint, wireDialogs, ROOT, locale } from './core.js';
import { trend } from './charts.js';
import { groupNode } from './group.js';
import { screenIn, show } from './motion.js';

const root = document.getElementById('ck');
const keyFromHash = () => hostKeyOf(location.hash.slice(1));
const hostUrl = (k) => new URL('host/#' + k, ROOT).href;

function mount(node) { root.textContent = ''; root.appendChild(node); wireDialogs(node); window.scrollTo({ top: 0, behavior: 'instant' }); screenIn(node); }
function msg(text, k) {
  const w = el('section', 'ck-screen'); w.appendChild(el('h1', 'ck-title', T('history.title'))); const p = el('p', 'ck-lede', text); p.setAttribute('role', 'status'); w.appendChild(p);
  if (k) { const b = el('button', 'btn solid', T('site.try_again')); b.type = 'button'; b.style.marginTop = '14px'; b.addEventListener('click', () => load(k)); w.appendChild(b); }
  mount(w);
}
const dateText = (d) => { try { return new Date(d + 'T12:00:00').toLocaleDateString(locale(), { day: 'numeric', month: 'long' }); } catch (e) { return d; } };

async function load(k) {
  msg(T('site.loading'));
  const r = await api('/host/' + k);
  if (!r.ok) return gone(r) || wrongKey(r) ? msg(T('host.not_found')) : msg(T('host.error'), k);
  const list = (r.rounds || []).slice().sort((a, b) => a.n - b.n);
  const w = el('section', 'ck-screen ck-hostscreen');
  const back = el('a', 'ck-link ck-toplink', '‹ ' + T('history.back')); back.href = hostUrl(k); w.appendChild(back);
  w.appendChild(el('h1', 'ck-title', T('history.title')));
  if (!list.length) { w.appendChild(el('p', 'ck-lede', T('history.empty'))); mount(w); return; }
  const c0 = el('section', 'ck-card');
  c0.appendChild(el('h2', '', T('history.trend_h')));
  c0.appendChild(trend(list));
  w.appendChild(c0);
  const newest = list[list.length - 1].n;
  let nth = 0;
  for (const rd of list.slice().reverse()) {
    const d = el('details', 'ck-card ck-hround'); if (rd.n === newest) d.open = true;
    show(d, 'enter', 40 * ++nth);
    const s = el('summary'); s.appendChild(el('b', '', T('history.round', { n: rd.n })));
    s.appendChild(el('span', '', [dateText(rd.date), rd.mode === 'live' ? T('history.live') : rd.mode === 'open' ? T('history.open') : '', T('history.people', { n: fmt(rd.people || 0) })].filter(Boolean).join(' · ')));
    d.appendChild(s);
    const body = el('div', 'ck-hround-body');
    if (rd.tried) { const t = el('span', 'ck-tag', T('history.tried', { lever: T('lever.short.' + rd.tried) })); body.appendChild(t); }
    const hasPics = typeof rd.who_mean === 'number' || (rd.bars && Object.keys(rd.bars).length);
    if (!hasPics || (rd.people || 0) < 10) { body.appendChild(el('p', 'ck-quiet', T('history.hidden', { n: fmt(rd.people || 0) }))); }
    else body.appendChild(groupNode({ n: rd.people, who: rd.who, who_mean: rd.who_mean, st: rd.st, st_mean: rd.st_mean, bars: rd.bars, mind: rd.mind, ladder: rd.ladder, split: rd.split }, { big: false }));
    d.appendChild(body); w.appendChild(d);
  }
  mount(w);
}

(async function main() {
  await initStrings();
  document.title = T('history.title') + ' | Logicers';
  document.getElementById('ck-namechip').textContent = T('app.chip');
  document.body.classList.add('ck-wide');
  langChip(); howSheet(); smallPrint(); wireDialogs(document);
  const k = keyFromHash();
  if (k) load(k); else msg(T('host.not_found'));
  window.addEventListener('hashchange', () => { const k2 = keyFromHash(); if (k2) load(k2); });
})().catch((e) => { root.textContent = ''; root.appendChild(el('p', 'ck-lede', 'Could not start. ' + (e && e.message ? e.message : ''))); });
