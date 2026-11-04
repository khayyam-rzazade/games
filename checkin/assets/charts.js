/* Check-in: every picture on the three pages, as small functions that return a DOM node (chat C, 4 Nov 2026).
   No library. Colours come from checkin.css (--b0…--b3 bands, --lift, --weigh, --sideA, --sideB); motion is CSS and stops
   under prefers-reduced-motion. Every picture has a text twin for screen readers (aria-label or visible numbers). */
import { el, h, esc, T, fmt, clamp, reducedMotion, BY_ID, ST, BAR_IDS, signed, barSigned, verdict, MIN_GROUP } from './core.js';

/* ------------------------------------------------------------------ a number that counts up ------ */
export function countUp(node, to, ms, decimals) {
  const d = decimals || 0;
  if (reducedMotion() || !isFinite(to)) { node.textContent = to.toFixed(d); return; }
  const t0 = performance.now(), dur = ms || 900;
  const tick = (t) => { const k = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - k, 3); node.textContent = (to * e).toFixed(d); if (k < 1 && node.isConnected) requestAnimationFrame(tick); else node.textContent = to.toFixed(d); };
  node.textContent = (0).toFixed(d); requestAnimationFrame(tick);
}

/* ------------------------------------------------------------------ the dial (wellbeing 0-100) ------ */
const GAUGE_BANDS = [[0, 28.5], [28.5, 50.5], [50.5, 72.5], [72.5, 100]];
export function gauge(score, band) {
  const cx = 120, cy = 122, r = 102;
  const pt = (v) => { const a = Math.PI * (1 + v / 100); return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
  const arc = (v0, v1) => { const [x0, y0] = pt(v0), [x1, y1] = pt(v1); return `M${x0.toFixed(2)} ${y0.toFixed(2)}A${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`; };
  const segs = GAUGE_BANDS.map(([a, b], i) => `<path class="ck-gseg b${i}${i === band ? ' on' : ''}" d="${arc(a + 0.7, b - 0.7)}" fill="none" stroke-width="20"/>`).join('');
  const rot = 180 * clamp(score, 0, 100) / 100;
  const w = h(`<div class="ck-gauge" role="img" aria-label="${esc(T('res.score_aria', { n: score }))}">
    <svg viewBox="0 0 240 146" aria-hidden="true">${segs}<g class="ck-gneedle" style="--rot:${rot}deg"><circle cx="${cx - r}" cy="${cy}" r="14" class="ck-gdot b${band}"/></g></svg>
    <div class="ck-gnum"><b>0</b></div></div>`);
  countUp(w.querySelector('.ck-gnum b'), score, 1100);
  return w;
}

/* the same dial without a number, idle, for the front page */
export function dialArt() {
  const cx = 120, cy = 122, r = 102;
  const pt = (v) => { const a = Math.PI * (1 + v / 100); return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
  const arc = (v0, v1) => { const [x0, y0] = pt(v0), [x1, y1] = pt(v1); return `M${x0.toFixed(2)} ${y0.toFixed(2)}A${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`; };
  const segs = GAUGE_BANDS.map(([a, b], i) => `<path class="ck-gseg b${i} on" d="${arc(a + 0.7, b - 0.7)}" fill="none" stroke-width="20"/>`).join('');
  return h(`<div class="ck-gauge ck-dial" aria-hidden="true"><svg viewBox="0 0 240 146">${segs}<g class="ck-gneedle idle" style="--rot:118deg"><circle cx="${cx - r}" cy="${cy}" r="14" class="ck-gdot b2"/></g></svg></div>`);
}

/* ------------------------------------------------------------------ the thermometer (stress, the ends are ST.min … ST.max) ------ */
const fracOf = (v) => clamp((v - ST.min) / (ST.max - ST.min), 0, 1);
function hueOf(v) { return Math.round(192 - 184 * fracOf(v)); }   /* cool teal at the low end, hot coral at the high end */
export function thermo(opts) {
  const o = opts || {};
  const w = el('div', 'ck-thermo' + (o.interactive ? ' live' : ' view') + (o.compact ? ' compact' : ''));
  const read = el('div', 'ck-thermo-read'); const num = el('b', '', o.value === null || o.value === undefined ? '–' : String(o.value)); read.appendChild(num); if (!o.compact) w.appendChild(read);
  const body = el('div', 'ck-thermo-body');
  const bulb = el('span', 'ck-bulb'); const tube = el('div', 'ck-tube'); const mercury = el('i', 'ck-mercury'); tube.appendChild(mercury);
  body.appendChild(bulb); body.appendChild(tube); w.appendChild(body);
  if (!o.compact) { const ticks = el('div', 'ck-thermo-ticks'); for (let i = ST.min; i <= ST.max; i++) { const t = el('span', '', i); t.style.left = (100 * (i - ST.min) / (ST.max - ST.min)) + '%'; ticks.appendChild(t); } w.appendChild(ticks); }
  if (o.ends !== false && !o.compact) { const ends = el('div', 'ck-thermo-ends'); ends.appendChild(el('span', '', T('st.low'))); ends.appendChild(el('span', '', T('st.high'))); w.appendChild(ends); }
  const say = (v) => T('res.stress_of', { n: v, max: ST.max });
  const paint = (v) => {
    const set = v !== null && v !== undefined;
    w.classList.toggle('set', set);
    num.textContent = set ? String(v) : '–';
    mercury.style.setProperty('--fill', set ? (100 - 100 * fracOf(v)) + '%' : '100%');
    w.style.setProperty('--hue', hueOf(set ? v : ST.min));
    w.setAttribute('aria-valuenow', set ? String(v) : '');
    w.setAttribute('aria-valuetext', set ? say(v) : T('flow.pick_first'));
  };
  w.paint = paint; paint(o.value === undefined ? null : o.value);
  if (o.interactive) {
    w.tabIndex = 0; w.setAttribute('role', 'slider'); w.setAttribute('aria-valuemin', String(ST.min)); w.setAttribute('aria-valuemax', String(ST.max)); w.setAttribute('aria-label', o.label || '');
    let cur = o.value === undefined ? null : o.value, active = false;
    const at = (x) => { const r = tube.getBoundingClientRect(), b = bulb.getBoundingClientRect(); const left = b.left + b.width / 2, right = r.right; return ST.min + Math.round(clamp((x - left) / (right - left), 0, 1) * (ST.max - ST.min)); };
    const set = (v, done) => { if (v !== cur) { cur = v; paint(v); if (o.onInput) o.onInput(v); } if (done && o.onSet) o.onSet(v); };
    body.addEventListener('pointerdown', (e) => { active = true; w.classList.add('drag'); body.setPointerCapture(e.pointerId); set(at(e.clientX), false); });
    body.addEventListener('pointermove', (e) => { if (active) set(at(e.clientX), false); });
    const up = (e) => { if (!active) return; active = false; w.classList.remove('drag'); set(at(e.clientX), true); };
    body.addEventListener('pointerup', up); body.addEventListener('pointercancel', up);
    w.addEventListener('keydown', (e) => {
      let v = cur === null ? ST.min : cur;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') v = cur === null ? ST.min : v + 1; else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') v = cur === null ? ST.min : v - 1; else if (e.key === 'Home') v = ST.min; else if (e.key === 'End') v = ST.max; else return;
      e.preventDefault(); set(clamp(v, ST.min, ST.max), true);
    });
  }
  return w;
}

/* ------------------------------------------------------------------ the ladder (MacArthur, 10 steps) ------ */
export function ladderPicker(value, onPick) {
  const w = el('div', 'ck-ladder'); w.setAttribute('role', 'group');
  const side = el('div', 'ck-ladder-side'); side.appendChild(el('span', '', '▲ ' + T('ladder.top'))); side.appendChild(el('span', '', '▼ ' + T('ladder.bottom'))); w.appendChild(side);
  const rails = el('div', 'ck-ladder-rails'); w.appendChild(rails);
  for (let v = 10; v >= 1; v--) {
    const b = el('button', 'ck-rung' + (value === v ? ' on' : '')); b.type = 'button'; b.dataset.value = String(v);
    b.setAttribute('aria-label', T('ladder.step', { n: v }));
    b.appendChild(el('span', 'n', v));
    b.addEventListener('click', () => { w.querySelectorAll('.ck-rung').forEach((x) => x.classList.remove('on')); b.classList.add('on'); onPick(v); });
    rails.appendChild(b);
  }
  return w;
}
/* the group's ladder: ten bars, best off at the top */
export function ladderBars(counts, mine) {
  const total = counts.reduce((a, b) => a + b, 0) || 1, max = Math.max(1, ...counts);
  const w = el('div', 'ck-lbars'); w.setAttribute('role', 'img'); w.setAttribute('aria-label', T('host.ladder_h'));
  for (let step = 10; step >= 1; step--) {
    const c = counts[step - 1] || 0;
    const row = el('div', 'ck-lrow' + (mine === step ? ' mine' : ''));
    row.appendChild(el('span', 'n', step));
    const rail = el('span', 'rail'); const fill = el('i'); fill.style.setProperty('--w', (100 * c / max) + '%'); fill.style.setProperty('--i', String(10 - step)); rail.appendChild(fill); row.appendChild(rail);
    row.appendChild(el('span', 'c', fmt(c)));
    w.appendChild(row);
  }
  const ends = el('div', 'ck-lends'); ends.appendChild(el('span', '', T('ladder.top'))); ends.appendChild(el('span', '', T('ladder.bottom'))); w.insertBefore(ends, w.firstChild);
  return w;
}

/* ------------------------------------------------------------------ bars that lift and weigh ------ */
/* rows: [{ id, label, s }] with s = -1…+1 (null = skipped). The bar grows from the middle: to the right it lifts, to the left it weighs. */
export function divBars(rows, opts) {
  const o = opts || {};
  const w = el('div', 'ck-dbars' + (o.big ? ' big' : ''));
  if (o.legend !== false) { const leg = el('div', 'ck-dleg'); leg.appendChild(el('span', 'weigh', '← ' + T('res.weighs'))); leg.appendChild(el('span', 'lift', T('res.lifts') + ' →')); w.appendChild(leg); }
  rows.forEach((r, i) => {
    const v = verdict(r.s);
    const row = el('div', 'ck-drow ' + v); row.dataset.id = r.id; if (o.mark && o.mark === r.id) row.classList.add('mark');
    const top = el('div', 'ck-dtop'); top.appendChild(el('b', '', r.label));
    top.appendChild(el('small', '', v === 'lift' ? T('res.lifts') : v === 'weigh' ? T('res.weighs') : v === 'mid' ? T('res.middle') : T('flow.skipped')));
    row.appendChild(top);
    const track = el('div', 'ck-dtrack'); track.appendChild(el('i', 'ck-dmid'));
    if (r.s !== null && r.s !== undefined) {
      const fill = el('i', 'ck-dfill ' + (r.s >= 0 ? 'r' : 'l'));
      fill.style.setProperty('--w', Math.max(2, Math.abs(r.s) * 50) + '%'); fill.style.setProperty('--i', String(i));
      track.appendChild(fill);
    }
    row.appendChild(track);
    row.setAttribute('role', 'img'); row.setAttribute('aria-label', `${r.label}: ${v === 'lift' ? T('res.lifts') : v === 'weigh' ? T('res.weighs') : v === 'mid' ? T('res.middle') : T('flow.skipped')}`);
    w.appendChild(row);
  });
  return w;
}
/* the bars of a group as the server sends them: 0-100 with the direction already applied (100 lifts, 0 weighs) */
export function groupBarRows(bars) {
  return BAR_IDS.filter((id) => bars && typeof bars[id] === 'number').map((id) => ({ id, label: T('bar.' + id), s: barSigned(bars[id]) }));
}

/* ------------------------------------------------------------------ you against the others ------ */
/* one scale with pins: you (filled), country (ring), world (dashed ring). rows: { label, lo, hi, unit, you, country, world, zones } */
export function pinScale(r) {
  const w = el('div', 'ck-pins');
  const head = el('div', 'ck-pins-h'); head.appendChild(el('b', '', r.label));
  const vals = el('span', 'vals');
  const parts = [['you', T('res.you'), r.you], ['country', r.countryName || T('res.country'), r.country], ['world', T('res.world'), r.world]].filter((p) => typeof p[2] === 'number');
  const dec = r.hi - r.lo > 20 ? 1 : 10;                    /* whole numbers on 0-100, one decimal on the 1-5 stress scale */
  parts.forEach(([k, name, v], i) => { const s = el('span', 'v p-' + k); s.appendChild(el('i')); s.appendChild(document.createTextNode(`${name} ${fmt(Math.round(v * dec) / dec)}`)); vals.appendChild(s); });
  head.appendChild(vals); w.appendChild(head);
  const track = el('div', 'ck-pins-track' + (r.zones ? ' zones' : ''));
  const pos = (v) => (100 * clamp((v - r.lo) / (r.hi - r.lo), 0, 1)) + '%';
  for (const [k, , v] of parts.slice().reverse()) { const p = el('i', 'ck-pin p-' + k); p.style.left = pos(v); p.style.setProperty('--d', k === 'you' ? '0ms' : '220ms'); track.appendChild(p); }
  w.appendChild(track);
  const ax = el('div', 'ck-pins-ax'); ax.appendChild(el('span', '', r.lo)); ax.appendChild(el('span', '', r.hi)); w.appendChild(ax);
  return w;
}

/* ------------------------------------------------------------------ a curve of the group ------ */
function smoothPath(counts, W, H, pad, closed, top) {
  const k = counts.length > 9 ? [1, 2, 3, 2, 1] : [1, 2, 1], half = (k.length - 1) / 2, ks = k.reduce((x, y) => x + y, 0);
  const total = counts.reduce((a, b) => a + b, 0) || 1;
  const sm = counts.map((_, i, arr) => k.reduce((acc, wgt, j) => acc + wgt * (arr[i + j - half] || 0), 0) / ks / total);
  const t = top || Math.max(1e-9, ...sm);
  const pts = sm.map((c, i) => [pad + (i / Math.max(1, sm.length - 1)) * (W - 2 * pad), H - 4 - (c / t) * (H - 14)]);
  let d = `M${pts[0][0].toFixed(1)},${H - 4} L${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)} `;
  for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; const cx = ((x0 + x1) / 2).toFixed(1); d += `C${cx},${y0.toFixed(1)} ${cx},${y1.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)} `; }
  if (closed) d += `L${pts[pts.length - 1][0].toFixed(1)},${H - 4} Z`;
  return { d, t };
}
/* series: [{ bins, cls }] (cls 'a' | 'b' | 'g'); markers: [{ v, label, cls }]; axis lo…hi; zones draws the four WHO bands behind */
export function curve(series, o) {
  const W = 300, H = 96, pad = 6;
  const w = el('div', 'ck-curve' + (o.big ? ' big' : ''));
  const stage = el('div', 'ck-stage'); stage.style.setProperty('--rows', String((o.markers || []).filter((m) => typeof m.v === 'number').length)); w.appendChild(stage);
  if (o.zones) { const z = el('div', 'ck-zones'); [28.5, 22, 22, 27.5].forEach((p, i) => { const s = el('i', 'b' + i); s.style.width = p + '%'; z.appendChild(s); }); stage.appendChild(z); }
  const tops = series.map((s) => smoothPath(s.bins, W, H, pad, true).t);
  const common = Math.max(...tops);                         /* every curve on one height scale, so two sides can be compared */
  const paths = series.map((s) => `<path class="ck-cv ${s.cls || 'g'}" d="${smoothPath(s.bins, W, H, pad, true, common).d}"/>`).join('');
  stage.appendChild(h(`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">${paths}</svg>`));
  let row = 0;
  (o.markers || []).forEach((m) => {
    if (typeof m.v !== 'number') return;
    const frac = clamp((m.v - o.lo) / (o.hi - o.lo), 0, 1);
    const p = el('div', 'ck-mk ' + (m.cls ? 'm-' + m.cls : '') + (frac < 0.16 ? ' lft' : frac > 0.84 ? ' rgt' : ''));
    p.style.left = (100 * frac) + '%'; p.style.setProperty('--row', String(row++));
    p.appendChild(el('span', 'ck-mk-l', m.label));
    stage.appendChild(p);
  });
  const ax = el('div', 'ck-curve-ax');
  [o.lo, (o.lo + o.hi) / 2, o.hi].forEach((v) => ax.appendChild(el('span', '', v)));
  w.appendChild(ax);
  if (o.aria) { w.setAttribute('role', 'img'); w.setAttribute('aria-label', o.aria); }
  return w;
}

/* ------------------------------------------------------------------ on their minds (ranked bars) ------ */
export function mindBars(counts, ids) {
  const get = (id, i) => (counts[id] ?? counts[String(i + 1)] ?? 0);
  const rows = ids.map((id, i) => ({ id, n: get(id, i) })).sort((a, b) => b.n - a.n);
  const total = rows.reduce((a, r) => a + r.n, 0) || 1, max = Math.max(1, rows[0] ? rows[0].n : 1);
  const w = el('div', 'ck-mbars');
  rows.forEach((r, i) => {
    const row = el('div', 'ck-mrow' + (i === 0 ? ' top' : ''));
    row.appendChild(el('b', '', T('mind.' + r.id)));
    const rail = el('span', 'rail'); const f = el('i'); f.style.setProperty('--w', (100 * r.n / max) + '%'); f.style.setProperty('--i', String(i)); rail.appendChild(f); row.appendChild(rail);
    row.appendChild(el('span', 'c', fmt(r.n)));
    w.appendChild(row);
  });
  return w;
}

/* ------------------------------------------------------------------ "23 of 31 done" as a ring ------ */
export function countRing(done, joined) {
  const R = 54, C = 2 * Math.PI * R;
  const w = el('div', 'ck-ring');
  w.innerHTML = `<svg viewBox="0 0 128 128" aria-hidden="true"><circle class="t" cx="64" cy="64" r="${R}"/><circle class="f" cx="64" cy="64" r="${R}" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${C.toFixed(1)}" transform="rotate(-90 64 64)"/></svg><div class="ck-ring-n"><b></b><span></span></div>`;
  const f = w.querySelector('.f'), b = w.querySelector('b'), s = w.querySelector('span');
  w.update = (d, j) => {
    b.textContent = fmt(d); s.textContent = j ? '/ ' + fmt(j) : '';
    const k = j > 0 ? clamp(d / j, 0, 1) : 0; f.style.strokeDashoffset = (C * (1 - k)).toFixed(1);
    w.setAttribute('role', 'img'); w.setAttribute('aria-label', T('host.done_of', { done: fmt(d), joined: fmt(j) }));
  };
  w.update(done, joined);
  return w;
}

/* ------------------------------------------------------------------ rounds side by side ------ */
export function trend(rounds) {
  const w = el('div', 'ck-trend'); w.setAttribute('role', 'img'); w.setAttribute('aria-label', T('history.trend_h'));
  rounds.forEach((r, i) => {
    const has = typeof r.who_mean === 'number';
    const col = el('div', 'ck-tcol' + (has ? '' : ' none'));
    col.appendChild(el('b', '', has ? Math.round(r.who_mean) : '·'));
    const slot = el('div', 'slot'); const bar = el('i');
    if (has) { bar.style.setProperty('--hgt', clamp(r.who_mean, 4, 100) + '%'); bar.style.setProperty('--i', String(i)); }
    slot.appendChild(bar); col.appendChild(slot); col.appendChild(el('span', '', 'R' + r.n));
    w.appendChild(col);
  });
  return w;
}
