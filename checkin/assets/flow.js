/* Check-in: the 20 taps (chat C, 4 Nov 2026). One screen per item, everything that is tapped sits low near the thumb,
   Skip stays up and away from it, the name of the game is on every screen (the Find outs' rule of 22 Oct).
   runFlow() is used by the solo page and by the room page; it knows nothing about either.
   Motion (5 Nov 2026, claude/motion-spec.md 4): the frame (the top line and the progress bar) stays; only the question's body
   slides, forward from the right, Back from the left; the bar glides. A tap presses, the chosen option selects (its fill sweeps
   in over --m-fast), the screen waits 150 ms so the choice is seen to land, then slides. Every tap counts at every moment: another
   option during that wait takes its place, Back or Skip go at once, and the next question takes taps while it slides in. */
import { el, ITEMS, T, has, itemText, helpText, optionsOf, reducedMotion, knownCountry, inCountry, kicker, sheet, wireDialogs, esc, countStart } from './core.js';
import { ladderPicker } from './charts.js';
import { ms, slide, screenIn } from './motion.js';
const LAND = 150;                                          /* the pause after a choice, before the slide (motion spec 3, select) */

/* ctx: { a, i, onChange(a, i), onDone(a), onLeave() }  ->  { show(i) } */
export function runFlow(root, ctx) {
  const a = ctx.a || {};
  let i = Math.min(ctx.i || 0, ITEMS.length - 1);
  let pending = null;                                       /* the step after a choice, while the choice is seen to land */
  const total = ITEMS.length;
  let countryText = inCountry(null);
  knownCountry().then((iso) => { if (iso) countryText = inCountry(iso); });            /* ready long before the ladder (item 20) */
  let started = false;

  /* the frame stays from the first question to the last: the top line and the progress bar; the body inside it slides */
  const frame = el('section', 'ck-screen ck-item');
  const top = el('div', 'ck-itemtop');
  const bar = el('div', 'ck-progress'); bar.setAttribute('aria-hidden', 'true'); bar.style.setProperty('--n', String(total));
  for (const layer of ['rest', 'now', 'on']) { const row = el('div', layer); for (let n = 0; n < total; n++) row.appendChild(el('i')); bar.appendChild(row); }
  const stage = el('div', 'ck-qstage');
  frame.appendChild(top); frame.appendChild(bar); frame.appendChild(stage);

  function landed(body) { window.scrollTo({ top: 0, behavior: 'instant' }); const h1 = body.querySelector('.ck-q'); if (h1) { h1.tabIndex = -1; h1.focus({ preventScroll: true }); } }
  const delay = () => (reducedMotion() ? 80 : ms('fast') + LAND);
  function cancelPending() { if (pending) { clearTimeout(pending); pending = null; } }

  function go(next, dir) {
    cancelPending();
    if (next >= total) { ctx.onDone(finalAnswers()); return; }
    i = Math.max(0, next); if (ctx.onChange) ctx.onChange(a, i); render(dir);
  }
  function finalAnswers() { const out = {}; for (const it of ITEMS) out[it.id] = it.id in a ? a[it.id] : null; return out; }
  /* a choice (or Skip, value null): kept at once; the slide follows when the choice has landed. A second choice on the same
     screen during that wait replaces the first and the wait starts again; nothing is ever sent twice. */
  function answer(item, value) {
    if (ITEMS[i] !== item) return;                              /* a tap that belongs to a screen already gone */
    a[item.id] = value; if (ctx.onChange) ctx.onChange(a, i);
    if (!started && i === 0 && !ctx.noCount) { started = true; countStart(); }        /* the funnel's start, at the first tap */
    cancelPending();
    if (value === null) { go(i + 1, 1); return; }
    pending = setTimeout(() => { pending = null; go(i + 1, 1); }, delay());
  }

  function fillTop(item) {
    top.textContent = '';
    const meta = el('p', 'meta'); meta.appendChild(el('b', '', T('app.chip'))); meta.appendChild(document.createTextNode(T('flow.of', { a: i + 1, b: total }))); top.appendChild(meta);
    const right = el('div', 'ck-itemtop-r');
    const help = helpText(item);
    if (help) { const q = el('button', 'chip round ck-help', '?'); q.type = 'button'; q.setAttribute('aria-label', T('flow.help')); q.addEventListener('click', () => { const d = sheet('dlg-help', T('flow.help_title'), `<p>${esc(help)}</p>`); wireDialogs(d); d.showModal(); }); right.appendChild(q); }
    if (item.skip) { const skip = el('button', 'chip ck-skip', T('flow.skip')); skip.type = 'button'; skip.addEventListener('click', () => answer(item, null)); right.appendChild(skip); }
    top.appendChild(right);
  }

  function render(dir) {
    const item = ITEMS[i];
    const w = el('div', 'ck-qbody');
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
    const back = el('button', 'chip', '‹ ' + T('flow.back')); back.type = 'button'; back.disabled = i === 0; back.addEventListener('click', () => { if (ITEMS[i] === item && i > 0) go(i - 1, -1); });
    nav.appendChild(back);
    if (ctx.onLeave && i === 0) { /* the first screen has nowhere to go back to */ }
    low.appendChild(nav);
    w.appendChild(low);
    /* the frame's top line and the bar change in place (the bar glides); the body slides, or arrives with the frame */
    const first = !frame.isConnected;
    if (first) { root.textContent = ''; root.appendChild(frame); screenIn(frame); }
    const swap = () => { fillTop(item); bar.style.setProperty('--k', String(i)); };
    if (first || !dir) { swap(); slide(stage, w, 0); landed(w); return; }
    slide(stage, w, dir, () => { swap(); landed(w); });
  }

  function choiceList(item, cls) {
    const prev = a[item.id];
    const row = el('div', 'ck-choices' + (cls ? ' ' + cls : ''));
    for (const o of optionsOf(item)) {
      const b = el('button', 'btn ghost' + (prev === o.value ? ' on' : ''), o.label); b.type = 'button'; b.dataset.value = String(o.value);
      b.addEventListener('click', () => { if (ITEMS[i] !== item) return; row.querySelectorAll('.btn').forEach((x) => x.classList.remove('on')); b.classList.add('on'); answer(item, o.value); });
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
          b.addEventListener('click', () => { if (ITEMS[i] !== item) return; row.querySelectorAll('button').forEach((x) => x.classList.remove('on')); b.classList.add('on'); answer(item, o.value); });
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
        done.addEventListener('click', () => { if (cur !== null && ITEMS[i] === item) { cancelPending(); go(i + 1, 1); } });   /* "See my result": a button, not a choice: no wait */
        const acts = el('div', 'ck-actions'); acts.appendChild(done); wrap.appendChild(acts);
        break;
      }
      default: break;
    }
    return wrap;
  }

  render(0);
  return { show: (k) => { i = k; render(0); }, answers: a };
}
