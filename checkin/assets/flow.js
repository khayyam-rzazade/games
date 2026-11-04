/* Check-in: the 20 taps (chat C, 4 Nov 2026). One screen per item, everything that is tapped sits low near the thumb,
   Skip stays up and away from it, the name of the game is on every screen (the Find outs' rule of 22 Oct).
   runFlow() is used by the solo page and by the room page; it knows nothing about either. */
import { el, ITEMS, T, has, itemText, helpText, optionsOf, reducedMotion, knownCountry, inCountry, kicker, sheet, wireDialogs, esc, countStart } from './core.js';
import { ladderPicker } from './charts.js';

/* ctx: { a, i, onChange(a, i), onDone(a), onLeave() }  ->  { show(i) } */
export function runFlow(root, ctx) {
  const a = ctx.a || {};
  let i = Math.min(ctx.i || 0, ITEMS.length - 1);
  let locked = false;
  const total = ITEMS.length;
  let countryText = inCountry(null);
  knownCountry().then((iso) => { if (iso) countryText = inCountry(iso); });            /* ready long before the ladder (item 20) */
  let started = false;

  function show(node) { root.textContent = ''; root.appendChild(node); window.scrollTo({ top: 0, behavior: 'instant' }); const h1 = node.querySelector('.ck-q'); if (h1) { h1.tabIndex = -1; h1.focus({ preventScroll: true }); } }
  function progress(k) { const p = el('div', 'ck-progress'); p.setAttribute('aria-hidden', 'true'); for (let n = 0; n < total; n++) p.appendChild(el('i', n < k ? 'on' : n === k ? 'now' : '')); return p; }
  const delay = () => (reducedMotion() ? 80 : 360);

  function go(next) {
    if (next >= total) { ctx.onDone(finalAnswers()); return; }
    i = Math.max(0, next); if (ctx.onChange) ctx.onChange(a, i); render();
  }
  function finalAnswers() { const out = {}; for (const it of ITEMS) out[it.id] = it.id in a ? a[it.id] : null; return out; }
  function answer(item, value) {
    if (locked) return;
    a[item.id] = value; if (ctx.onChange) ctx.onChange(a, i);
    if (!started && i === 0 && !ctx.noCount) { started = true; countStart(); }        /* the funnel's start, at the first tap */
    locked = true;
    setTimeout(() => { locked = false; go(i + 1); }, value === null ? 0 : delay());
  }

  function render() {
    const item = ITEMS[i];
    const w = el('section', 'ck-screen ck-item');
    const top = el('div', 'ck-itemtop');
    const meta = el('p', 'meta'); meta.appendChild(el('b', '', T('app.chip'))); meta.appendChild(document.createTextNode(T('flow.of', { a: i + 1, b: total }))); top.appendChild(meta);
    const right = el('div', 'ck-itemtop-r');
    const help = helpText(item);
    if (help) { const q = el('button', 'chip round ck-help', '?'); q.type = 'button'; q.setAttribute('aria-label', T('flow.help')); q.addEventListener('click', () => { const d = sheet('dlg-help', T('flow.help_title'), `<p>${esc(help)}</p>`); wireDialogs(d); d.showModal(); }); right.appendChild(q); }
    if (item.skip) { const skip = el('button', 'chip ck-skip', T('flow.skip')); skip.type = 'button'; skip.addEventListener('click', () => answer(item, null)); right.appendChild(skip); }
    top.appendChild(right);
    w.appendChild(top); w.appendChild(progress(i));
    const mid = el('div', 'ck-mid');
    const kick = kicker(item);
    if (kick) mid.appendChild(el('p', 'ck-kicker', kick));
    const stem = item.stem ? T(item.stem) : '';
    if (stem) mid.appendChild(el('p', 'ck-stem', stem));
    /* a published item with a lead sentence (the stress item): the lead in smaller type, the question below it; both are the item */
    if (has('item.' + item.id + '.lead')) mid.appendChild(el('p', 'ck-lead', T('item.' + item.id + '.lead')));
    const text = itemText(item, a.role, { in_country: countryText });
    mid.appendChild(el('h1', 'ck-q' + (text.length > 590 ? ' xlong xxlong' : text.length > 220 ? ' xlong' : text.length > 90 ? ' long' : ''), text));
    w.appendChild(mid);
    const low = el('div', 'ck-bottom ck-controls');
    low.appendChild(controls(item, text));
    const nav = el('div', 'ck-nav');
    const back = el('button', 'chip', '‹ ' + T('flow.back')); back.type = 'button'; back.disabled = i === 0; back.addEventListener('click', () => go(i - 1));
    nav.appendChild(back);
    if (ctx.onLeave && i === 0) { /* the first screen has nowhere to go back to */ }
    low.appendChild(nav);
    w.appendChild(low);
    show(w);
  }

  function choiceList(item, cls) {
    const prev = a[item.id];
    const row = el('div', 'ck-choices' + (cls ? ' ' + cls : ''));
    for (const o of optionsOf(item)) {
      const b = el('button', 'btn ghost' + (prev === o.value ? ' on' : ''), o.label); b.type = 'button'; b.dataset.value = String(o.value);
      b.addEventListener('click', () => { if (locked) return; row.querySelectorAll('.btn').forEach((x) => x.classList.remove('on')); b.classList.add('on'); answer(item, o.value); });
      row.appendChild(b);
    }
    return row;
  }

  function controls(item, text) {
    const wrap = el('div', 'ck-ctl');
    switch (item.kind) {
      case 'role': case 'stress': case 'freq': case 'extent': case 'agree': case 'left': wrap.appendChild(choiceList(item, item.kind === 'role' || item.kind === 'left' || item.kind === 'stress' ? 'roomy' : '')); break;
      case 'who': wrap.appendChild(choiceList(item, 'tight')); break;
      case 'mind': wrap.appendChild(choiceList(item, 'two')); break;
      case 'sleep': {
        const prev = a.sleep;
        const row = el('div', 'ck-seg'); row.setAttribute('role', 'group');
        for (const o of optionsOf(item)) {
          const b = el('button', prev === o.value ? 'on' : '', o.label); b.type = 'button'; b.dataset.value = String(o.value);
          b.addEventListener('click', () => { if (locked) return; row.querySelectorAll('button').forEach((x) => x.classList.remove('on')); b.classList.add('on'); answer(item, o.value); });
          row.appendChild(b);
        }
        wrap.appendChild(row); wrap.appendChild(el('p', 'ck-seg-unit', T('sleep.unit')));
        break;
      }
      case 'ladder': {
        let cur = typeof a.ladder === 'number' ? a.ladder : null;
        const done = el('button', 'btn solid', T('flow.see')); done.type = 'button'; done.disabled = cur === null;
        wrap.appendChild(ladderPicker(cur, (v) => { cur = v; a.ladder = v; done.disabled = false; if (ctx.onChange) ctx.onChange(a, i); }));
        wrap.appendChild(el('p', 'ck-seg-unit', T('ladder.tap')));
        done.addEventListener('click', () => { if (cur !== null) answer(item, cur); });
        const acts = el('div', 'ck-actions'); acts.appendChild(done); wrap.appendChild(acts);
        break;
      }
      default: break;
    }
    return wrap;
  }

  render();
  return { show: (k) => { i = k; render(); }, answers: a };
}
