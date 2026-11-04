/* The Check-in: the twenty items, how an answer must look, and what a group may be shown (chat B, 4 Nov 2026).
   One table for the whole server. The values are those of the item sheet (claude/checkin-items.md, chat A1) and
   the codebook (claude/checkin-codebook.md, chat A2): when either changes, this table is the only place on the
   server that changes (and ITEM_VERSION, if the pages say so).

   Values (whole numbers, except role and mind):
     role        "student" | "working" | "neither"                          never skipped
     w1..w5      WHO-5, the published codes: 0 "At no time" .. 5 "All of the time"     never skipped
     st          stress (Elo et al. 2003): 1 "Not at all" .. 5 "Very much"; more is worse     never skipped
     y_load .. y_future   COPSOQ III, the position of the answer as shown: 1 = the first option ("Always" for
                 7-9, "To a very large extent" for 10-12) .. 5 = the last. y_load and y_future weigh when
                 high in the COPSOQ sense (code 1); the other four lift when high (code 1).
     sleep       1 "less than 5 hours" .. 5 "more than 8 hours"; its bar: 0, 25, 50, 100, 100 (codebook)
     mind        "money" | "work_or_studies" | "health" | "people" | "future" | "country" | "nothing"
     p_say, p_deserve, p_better   the ISSP agree scale: 1 "Agree strongly" .. 5 "Disagree strongly"; agreeing lifts
     p_leftout   UCLA (Hughes et al. 2004): 1 "Hardly ever", 2 "Some of the time", 3 "Often"; more is worse
     ladder      1 (bottom) .. 10 (top)
   Items 7-19 may be skipped: the value null (or the key left out) is missing and shows no bar.
   Bars are 0-100 with 100 lifting, the codebook's formulas: (5 - x) x 25 for the four lifting why-items and
   the agree items, (x - 1) x 25 for y_load and y_future, (3 - x) x 50 for p_leftout, the table for sleep.

   What a group may be shown (plan sections 4 and 5), the release rule, applied once, when a round is revealed,
   so that only what may be shown is ever kept: a round's charts from FLOOR phones; an item's counts only from
   FLOOR answers to it (a skip is not an answer); a split only when each side has FLOOR phones and the phones that
   tapped no side are none or FLOOR as well, and an item per side only when the same holds for that item's
   answers. So no number shown can be taken from another to give fewer than FLOOR people. */
"use strict";

export const ITEM_VERSION = 60;          // plan section 6: "item_version (60)"
export const FLOOR = 10;                 // charts from 10 phones, split sides from 10 each

const FIVE = { type: "int", min: 1, max: 5 };
export const ITEMS = [
  { id: "role", type: "pick", opts: ["student", "working", "neither"], need: true },
  { id: "w1", type: "int", min: 0, max: 5, need: true },
  { id: "w2", type: "int", min: 0, max: 5, need: true },
  { id: "w3", type: "int", min: 0, max: 5, need: true },
  { id: "w4", type: "int", min: 0, max: 5, need: true },
  { id: "w5", type: "int", min: 0, max: 5, need: true },
  { id: "st", type: "int", min: 1, max: 5, need: true },
  Object.assign({ id: "y_load", good: "high", bar: true }, FIVE),       // 1 "Always" behind: weighs
  Object.assign({ id: "y_control", good: "low", bar: true }, FIVE),     // 1 "Always" an influence: lifts
  Object.assign({ id: "y_support", good: "low", bar: true }, FIVE),
  Object.assign({ id: "y_recog", good: "low", bar: true }, FIVE),
  Object.assign({ id: "y_meaning", good: "low", bar: true }, FIVE),
  Object.assign({ id: "y_future", good: "high", bar: true }, FIVE),     // 1 worried "to a very large extent": weighs
  Object.assign({ id: "sleep", bar: true, lifts: [0, 25, 50, 100, 100] }, FIVE),
  { id: "mind", type: "pick", opts: ["money", "work_or_studies", "health", "people", "future", "country", "nothing"] },
  Object.assign({ id: "p_say", good: "low", bar: true }, FIVE),         // 1 "Agree strongly": lifts
  Object.assign({ id: "p_deserve", good: "low", bar: true }, FIVE),
  Object.assign({ id: "p_better", good: "low", bar: true }, FIVE),
  { id: "p_leftout", type: "int", min: 1, max: 3, good: "low", bar: true },
  { id: "ladder", type: "int", min: 1, max: 10 },
];
export const IDS = ITEMS.map((it) => it.id);
const BY_ID = new Map(ITEMS.map((it, i) => [it.id, Object.assign({ i }, it)]));
export const BAR_IDS = ITEMS.filter((it) => it.bar).map((it) => it.id);
export const TRIED_IDS = BAR_IDS.filter((id) => id.startsWith("y_"));   // the six levers of the host advice (sleep is a bar, never a lever)
export const W_IDS = ["w1", "w2", "w3", "w4", "w5"];
export const AGES = ["Under 18", "18–24", "25–34", "35–44", "45–54", "55–64", "65+"];   // as the find-outs' chips
const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

export function size(it) { return it.type === "pick" ? it.opts.length : it.max - it.min + 1; }
/* a value's place among its item's options: 0 for the first */
function slot(it, v) { return it.type === "pick" ? it.opts.indexOf(v) : v - it.min; }

/* check one phone's answers. a: { id: value | null }; role may also come beside it (top-level "role").
   Returns { answers: every id with its value or null, compact: the same as an array of slots } or { error } */
export function check(a, role) {
  if (!a || typeof a !== "object" || Array.isArray(a)) return { error: "a" };
  for (const k of Object.keys(a)) if (!BY_ID.has(k)) return { error: "a." + String(k).slice(0, 24) };
  if (role !== undefined && role !== null) {
    if (has(a, "role") && a.role !== null && a.role !== role) return { error: "role" };
    a = Object.assign({}, a, { role });
  }
  const answers = {}, compact = [];
  for (const it of ITEMS) {
    const v = has(a, it.id) ? a[it.id] : null;
    if (v === null || v === undefined) {
      if (it.need) return { error: it.id };
      answers[it.id] = null; compact.push(null); continue;
    }
    const ok = it.type === "pick" ? typeof v === "string" && it.opts.includes(v) : Number.isInteger(v) && v >= it.min && v <= it.max;
    if (!ok) return { error: it.id };
    answers[it.id] = v; compact.push(slot(it, v));
  }
  return { answers, compact };
}
export function fromCompact(c) {
  const a = {};
  ITEMS.forEach((it, i) => { const s = c[i]; a[it.id] = s === null || s === undefined ? null : it.type === "pick" ? it.opts[s] : s + it.min; });
  return a;
}
/* WHO-5: the raw sum 0..25, the score 0..100 (sum x 4), and the published band 0..3 */
export function whoSum(answers) { return W_IDS.reduce((s, id) => s + answers[id], 0); }
export function band(score) { return score <= 28 ? 0 : score <= 50 ? 1 : score <= 72 ? 2 : 3; }

/* ---- the release rule: what a revealed round keeps ---- */
const wSlots = W_IDS.map((id) => BY_ID.get(id).i);
function whoDist(recs) { const d = new Array(26).fill(0); for (const r of recs) d[wSlots.reduce((s, i) => s + r.a[i], 0)] += 1; return d; }
function answered(recs, i) { let n = 0; for (const r of recs) if (r.a[i] !== null) n += 1; return n; }
function dist(recs, it) { const d = new Array(size(it)).fill(0); for (const r of recs) { const s = r.a[it.i]; if (s !== null) d[s] += 1; } return d; }
const partOk = (n, f) => n === 0 || n >= f;

/* recs: [{ a: compact array, s: 0 | 1 | null (the side) }]; sides: [name, name] or null.
   Returns what may be kept and shown: { people, who: [26] | null, counts: { id: [per option] } | null,
   split: null | { sides, n: [nA, nB], none, per_side: [{ who, counts } | null, same] } } */
export function release(recs, sides) {
  const people = recs.length, out = { people, who: null, counts: null, split: null };
  if (people >= FLOOR) {
    out.who = whoDist(recs); out.counts = {};
    for (const it of BY_ID.values()) if (answered(recs, it.i) >= FLOOR) out.counts[it.id] = dist(recs, it);
  }
  if (sides) {
    const parts = [0, 1, null].map((s) => recs.filter((r) => r.s === s));
    const ns = parts.map((p) => p.length);
    const split = { sides: sides.slice(0, 2), n: [ns[0], ns[1]], none: ns[2], per_side: [null, null] };
    if (ns[0] >= FLOOR && ns[1] >= FLOOR && partOk(ns[2], FLOOR)) {
      split.per_side = [0, 1].map((k) => ({ who: whoDist(parts[k]), counts: {} }));
      for (const it of BY_ID.values()) {
        const c = parts.map((p) => answered(p, it.i));
        if (c[0] >= FLOOR && c[1] >= FLOOR && partOk(c[2], FLOOR)) for (const k of [0, 1]) split.per_side[k].counts[it.id] = dist(parts[k], it);
      }
    }
    out.split = split;
  }
  return out;
}

/* ---- the views: charts from what was kept ---- */
const r1 = (x) => Math.round(x * 10) / 10;
function meanOf(d, valueOf) { let n = 0, s = 0; d.forEach((c, k) => { n += c; s += c * valueOf(k); }); return n ? s / n : null; }
export function lift(it, k) {   // 100 lifts you, 0 weighs on you; k is the answer's place, 0 for the first
  if (it.lifts) return it.lifts[k];
  const x = (k / (size(it) - 1)) * 100;
  return it.good === "low" ? 100 - x : x;
}
function picks(it, d) { const o = {}; it.opts.forEach((name, k) => { o[name] = d[k]; }); return o; }
/* one group's charts: { n } below the floor, else the whole set */
export function chartsOf(n, who, counts) {
  if (!who || !counts) return { n };
  const c = { n };
  c.who = []; for (let b = 0; b < 13; b++) c.who.push(who[2 * b] + (who[2 * b + 1] || 0));   // 13 bins of 8 points: 0-4, 8-12 .. 96-100
  c.bands = [0, 0, 0, 0]; who.forEach((x, s) => { c.bands[band(s * 4)] += x; });
  c.who_mean = r1(meanOf(who, (s) => s * 4));
  c.st = counts.st ? counts.st.slice() : null;
  c.st_mean = counts.st ? r1(meanOf(counts.st, (k) => k + 1)) : null;   // on 1-5
  c.bars = {}; c.bars_n = {};
  for (const id of BAR_IDS) if (counts[id]) { const it = BY_ID.get(id); c.bars[id] = r1(meanOf(counts[id], (k) => lift(it, k))); c.bars_n[id] = counts[id].reduce((s, x) => s + x, 0); }
  c.mind = counts.mind ? picks(BY_ID.get("mind"), counts.mind) : {};
  c.role = counts.role ? picks(BY_ID.get("role"), counts.role) : {};
  c.ladder = counts.ladder ? counts.ladder.slice() : [];
  c.sleep = counts.sleep ? counts.sleep.slice() : [];
  return c;
}
/* a split's view: { sides, none, per_side: { name: charts } } */
export function splitOf(split) {
  if (!split) return null;
  const per_side = {};
  split.sides.forEach((name, k) => { const p = split.per_side[k]; per_side[name] = p ? chartsOf(split.n[k], p.who, p.counts) : { n: split.n[k] }; });
  return { sides: split.sides.slice(), none: split.none, per_side };
}
