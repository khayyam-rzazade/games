/* Check-in: the group's pictures (chat C, 4 Nov 2026), shared by the host screen, the host history and the players' reveal.
   Input is the server's charts object (section 7: n, who bins, st bins, bars, mind, ladder, split?). Nothing here reads a person:
   below 10 phones only the count is shown, and a split side below 10 shows only its count. The client enforces this a second time.
   Motion (5 Nov 2026): groupNode() draws everything at its final value; groupTimeline() brings a reveal in, card after card. */
import { el, T, fmt, MIN_GROUP, MIN_COUNTRY, MINDS, BAR_IDS, ST, meanFromBins, lowestBar, countryName } from './core.js';
import { curve, thermo, divBars, groupBarRows, mindBars, ladderBars, countTo } from './charts.js';
import { ms, hide, show, grow, sequence } from './motion.js';

const isNum = (v) => typeof v === 'number' && isFinite(v);
const r1 = (v) => Math.round(v * 10) / 10;
const countryLabel = (c) => c.name || countryName(c.code || c.iso) || T('res.country');

/* by id, or by 1-based position when a server sends numbered keys or a list */
export function byIds(obj, ids) {
  const out = {};
  if (!obj || typeof obj !== 'object') return out;
  ids.forEach((id, i) => { const v = Array.isArray(obj) ? obj[i] : (obj[id] ?? obj[String(i + 1)] ?? obj[String(i)]); if (isNum(v)) out[id] = v; });
  return out;
}

/* one tolerant shape out of whatever the server sent */
export function norm(c) {
  const n = c && isNum(c.n) ? c.n : 0;
  const o = { n, few: n < MIN_GROUP };
  if (o.few) return o;
  const who = Array.isArray(c.who) && c.who.length > 1 ? c.who : null, st = Array.isArray(c.st) && c.st.length > 1 ? c.st : null;
  o.who = who; o.st = st;
  o.whoMean = isNum(c.who_mean) ? c.who_mean : meanFromBins(who, 0, 100);
  o.stMean = isNum(c.st_mean) ? c.st_mean : meanFromBins(st, ST.min, ST.max, true);
  o.bars = byIds(c.bars, BAR_IDS);
  o.mind = c.mind && typeof c.mind === 'object' ? c.mind : null;
  o.ladder = Array.isArray(c.ladder) && c.ladder.length === 10 ? c.ladder : null;
  const sp = c.split;
  if (sp && Array.isArray(sp.sides) && sp.sides.length === 2 && sp.per_side) {
    const per = Array.isArray(sp.per_side) ? sp.per_side : sp.sides.map((s, i) => sp.per_side[s] ?? sp.per_side[String(i)] ?? sp.per_side[i]);
    o.split = { sides: sp.sides, per: per.map((p) => {
      const pn = p && isNum(p.n) ? p.n : 0;
      if (pn < MIN_GROUP || !Array.isArray(p.who)) return { n: pn, few: true };        /* the server sends a side's curve only when the release rule allows it */
      return { n: pn, few: false, who: Array.isArray(p.who) ? p.who : null, whoMean: isNum(p.who_mean) ? p.who_mean : meanFromBins(p.who, 0, 100), stMean: isNum(p.st_mean) ? p.st_mean : null };
    }) };
  }
  return o;
}
export function lowestOf(charts) { const g = norm(charts); return g.few ? null : lowestBar(g.bars); }

function card(title, sub) {
  const c = el('section', 'ck-card');
  if (title) c.appendChild(el('h2', '', title));
  if (sub) c.appendChild(el('p', 'ck-quiet', sub));
  return c;
}
function meanBox(v, label, main) { const b = el('div', 'ck-mean' + (main ? ' main' : '')); const n = el('b', '', fmt(Math.round(v))); n.dataset.v = String(v); b.appendChild(n); b.appendChild(el('span', '', label)); return b; }

/* the card for a group that is not big enough yet */
export function fewCard(n, player) {
  const c = card(player ? T('host.curve_h') : '');
  const b = el('div', 'ck-fewbox'); const num = el('b', '', fmt(n || 0)); num.dataset.v = String(n || 0); b.appendChild(num); b.appendChild(el('p', 'ck-quiet', T(player ? 'room.group_few' : 'host.few', { n: fmt(n || 0) }))); c.appendChild(b);
  return c;
}

/* opts: { cmp: { world, country }, mine: { who, a }, big, mark: id }  ->  a node holding the cards */
export function groupNode(charts, opts) {
  const o = opts || {}, g = norm(charts);
  const w = el('div', 'ck-group');
  if (g.few) { w.appendChild(fewCard(g.n, o.player)); return w; }
  const cmp = o.cmp || {};
  const world = cmp.world && isNum(cmp.world.who_mean) ? cmp.world.who_mean : null;
  const country = cmp.country && isNum(cmp.country.who_mean) && (!isNum(cmp.country.n) || cmp.country.n >= MIN_COUNTRY) ? cmp.country : null;
  const mine = o.mine && isNum(o.mine.who) ? o.mine.who : null;

  /* 1. the curve of scores, and where the group, the country and the world sit on it */
  const c1 = card(T('host.curve_h'), T('host.n_people', { n: fmt(g.n) }));
  if (g.who) {
    const markers = [];
    if (isNum(g.whoMean)) markers.push({ v: g.whoMean, label: `${T('host.mean')} ${Math.round(g.whoMean)}`, cls: 'grp' });
    if (country) markers.push({ v: country.who_mean, label: `${countryLabel(country)} ${Math.round(country.who_mean)}`, cls: 'country' });
    if (world !== null) markers.push({ v: world, label: `${T('host.world')} ${Math.round(world)}`, cls: 'world' });
    if (mine !== null) markers.push({ v: mine, label: `${T('room.you')} ${Math.round(mine)}`, cls: 'you' });
    c1.appendChild(curve([{ bins: g.who, cls: 'g' }], { lo: 0, hi: 100, zones: true, big: !!o.big, markers, aria: T('host.curve_h') }));
  }
  const means = el('div', 'ck-means');
  if (isNum(g.whoMean)) means.appendChild(meanBox(g.whoMean, T('host.mean'), true));
  if (country) means.appendChild(meanBox(country.who_mean, countryLabel(country)));
  if (world !== null) means.appendChild(meanBox(world, T('host.world')));
  if (means.children.length) { if (means.children.length === 1) means.style.gridTemplateColumns = '1fr'; else if (means.children.length === 2) means.style.gridTemplateColumns = '1fr 1fr'; c1.appendChild(means); }
  w.appendChild(c1);

  /* 2. the two sides, if the host split the group */
  if (g.split && g.split.per[0].n + g.split.per[1].n > 0) w.appendChild(splitCard(g.split, o));

  /* 3. stress */
  if (isNum(g.stMean)) {
    const c = card('');
    const row = el('div', 'ck-stressrow'); row.style.borderTop = '0'; row.style.marginTop = '8px'; row.style.paddingTop = '0';
    const head = el('div', 'ck-stressrow-h'); head.appendChild(el('b', '', T('host.stress_line', { n: fmt(r1(g.stMean)), max: ST.max }))); row.appendChild(head);
    row.appendChild(thermo({ value: g.stMean, compact: true, ends: false }));
    c.appendChild(row); w.appendChild(c);
  }

  /* 4. what is behind it */
  const rows = groupBarRows(g.bars);
  if (rows.length) {
    const c = card(T('host.bars_h'));
    const mark = o.mark !== undefined ? o.mark : lowestBar(g.bars);
    c.appendChild(divBars(rows, { mark, big: !!o.big }));
    if (rows.some((r) => r.id.startsWith('p_'))) c.appendChild(el('p', 'ck-small', T('host.p_note')));
    w.appendChild(c);
  }

  /* 5. what is on their minds */
  if (g.mind) { const c = card(T('host.mind_h')); c.appendChild(mindBars(g.mind, MINDS)); w.appendChild(c); }

  /* 6. where people stand on the ladder */
  if (g.ladder) { const c = card(T('host.ladder_h')); c.appendChild(ladderBars(g.ladder, o.mine && isNum(o.mine.ladder) ? o.mine.ladder : null)); w.appendChild(c); }
  return w;
}

/* two curves on one scale, each side from 10 */
function splitCard(sp, o) {
  const c = card(T('host.sides_h'));
  c.classList.add('ck-split');
  const [a, b] = sp.per, [na, nb] = sp.sides;
  const series = [];
  if (!a.few && a.who) series.push({ bins: a.who, cls: 'a' });
  if (!b.few && b.who) series.push({ bins: b.who, cls: 'b' });
  const leg = el('div', 'ck-legend'); leg.appendChild(el('span', 'a', `${na} · ${fmt(a.n)}`)); leg.appendChild(el('span', 'b', `${nb} · ${fmt(b.n)}`)); c.appendChild(leg);
  if (series.length) {
    const markers = [];
    if (!a.few && isNum(a.whoMean)) markers.push({ v: a.whoMean, label: `${na} ${Math.round(a.whoMean)}`, cls: 'grp' });
    if (!b.few && isNum(b.whoMean)) markers.push({ v: b.whoMean, label: `${nb} ${Math.round(b.whoMean)}`, cls: 'grp' });
    c.appendChild(curve(series, { lo: 0, hi: 100, zones: true, big: !!o.big, markers, aria: T('host.sides_h') }));
  }
  const means = el('div', 'ck-means'); means.style.gridTemplateColumns = '1fr 1fr';
  for (const [s, name] of [[a, na], [b, nb]]) {
    if (s.few) { const f = el('div', 'ck-mean'); f.appendChild(el('b', '', fmt(s.n))); f.appendChild(el('span', '', T('host.side_few', { name, n: fmt(s.n) }))); means.appendChild(f); }
    else if (isNum(s.whoMean)) means.appendChild(meanBox(s.whoMean, `${name}${isNum(s.stMean) ? ' · ' + T('host.side_stress', { n: fmt(r1(s.stMean)) }) : ''}`));
  }
  c.appendChild(means);
  return c;
}

/* ------------------------------------------------------------------ the reveal, card after card ------
   The group's timeline (motion spec 4, the room and the host): each card enters when the one before has; in it the curve draws
   itself from the left while the means count, the stress thermometer fills, the bars grow one after another. `after`: cards
   outside the group that enter last (the host's lever card and the "moved" line). Scrolling or tapping never waits for it. */
export function groupTimeline(g, after) {
  const base = ms('base'), slow = ms('slow');
  const cards = [...g.children].concat(after || []);
  cards.forEach(hide);
  cards.forEach((c) => c.querySelectorAll('.ck-thermo').forEach((t) => t.ready && t.ready()));
  const steps = cards.map((c, k) => ({ at: c, run: () => {
    show(c);
    let gap = base;
    const nums = c.querySelectorAll('.ck-mean b[data-v], .ck-fewbox b[data-v]');
    nums.forEach((b) => countTo(b, Number(b.dataset.v)));
    if (nums.length) gap = Math.max(gap, slow);
    const cv = c.querySelector('.ck-curve');
    if (cv) { cv.classList.add('ck-drawing'); gap = Math.max(gap, slow); }
    c.querySelectorAll('.ck-thermo').forEach((t) => t.play && t.play());
    const bars = c.querySelector('.ck-dbars, .ck-mbars, .ck-lbars');
    if (bars) gap = Math.max(gap, grow(bars) - slow + base);
    return k === 0 ? Math.max(gap, base) : gap;
  } }));
  steps.unshift({ at: null, run: () => ms('fast') });         /* the screen is settling in */
  /* numbers that will count start at 0 while their card waits */
  cards.forEach((c) => c.querySelectorAll('.ck-mean b[data-v], .ck-fewbox b[data-v]').forEach((b) => { b.textContent = fmt(0); }));
  sequence(steps, g);
}
