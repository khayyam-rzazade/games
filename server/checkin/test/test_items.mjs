// The item table, the answer check, the release rule and the charts. Run: node --test test/test_items.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { ITEMS, IDS, BAR_IDS, TRIED_IDS, FLOOR, ITEM_VERSION, check, fromCompact, whoSum, band, release, chartsOf, splitOf, lift } from "../src/items.js";
import { answers } from "./lib.mjs";

const rec = (o, s) => ({ a: check(answers(o)).compact, s: s === undefined ? null : s });
const many = (n, o, s) => Array.from({ length: n }, () => rec(o, s));

test("the table: twenty items in the plan's order, the bars and the levers", () => {
  assert.deepEqual(IDS, ["role", "w1", "w2", "w3", "w4", "w5", "st", "y_load", "y_control", "y_support", "y_recog", "y_meaning", "y_future", "sleep", "mind", "p_say", "p_deserve", "p_better", "p_leftout", "ladder"]);
  assert.equal(ITEMS.length, 20); assert.equal(FLOOR, 10); assert.equal(ITEM_VERSION, 60);
  assert.deepEqual(BAR_IDS, ["y_load", "y_control", "y_support", "y_recog", "y_meaning", "y_future", "sleep", "p_say", "p_deserve", "p_better", "p_leftout"], "eleven bars: sleep is one");
  assert.deepEqual(TRIED_IDS, ["y_load", "y_control", "y_support", "y_recog", "y_meaning", "y_future"]);
  assert.deepEqual(ITEMS.filter((it) => it.need).map((it) => it.id), ["role", "w1", "w2", "w3", "w4", "w5", "st"], "skip is allowed on 7-19, never on 0-6");
});

test("check: values in range, skips only where allowed, nothing unknown", () => {
  const c = check(answers());
  assert.equal(c.error, undefined); assert.equal(c.compact.length, 20);
  assert.deepEqual(fromCompact(c.compact), answers(), "the compact form gives the answers back");
  for (const id of ["w1", "st", "role"]) { const a = answers(); delete a[id]; assert.equal(check(a).error, id, id + " cannot be skipped"); }
  for (const id of ["w3", "st", "role"]) assert.equal(check(answers({ [id]: null })).error, id);
  const skipped = check(answers({ y_load: null, mind: null, ladder: null, p_leftout: undefined }));
  assert.equal(skipped.error, undefined); assert.equal(skipped.answers.y_load, null); assert.equal(skipped.answers.mind, null);
  const a = answers(); for (const id of IDS.slice(7)) delete a[id];
  assert.equal(check(a).error, undefined, "every item from 7 on may be left out");
  for (const [id, v] of [["w1", 6], ["w1", -1], ["w1", 2.5], ["w1", "3"], ["st", 0], ["st", 6], ["y_load", 0], ["y_load", 6], ["y_future", 6], ["p_say", 0], ["p_better", 6], ["p_leftout", 0], ["p_leftout", 4], ["ladder", 0], ["ladder", 11], ["sleep", 0], ["sleep", 6], ["mind", "love"], ["mind", "work"], ["role", "teacher"], ["mind", 0]]) {
    assert.equal(check(answers({ [id]: v })).error, id, `${id} = ${JSON.stringify(v)} is refused`);
  }
  assert.equal(check(Object.assign(answers(), { extra: 1 })).error, "a.extra");
  assert.equal(check(null).error, "a"); assert.equal(check([1, 2]).error, "a"); assert.equal(check("x").error, "a");
  /* role beside the answers */
  const r = answers(); delete r.role;
  assert.equal(check(r, "working").answers.role, "working");
  assert.equal(check(answers({ role: "student" }), "working").error, "role", "two different roles");
  assert.equal(check(answers({ role: "student" }), "student").error, undefined);
});

test("WHO-5: sum x 4, the published bands", () => {
  assert.equal(whoSum(answers()), 15);
  assert.deepEqual([0, 28, 29, 50, 51, 72, 73, 100].map(band), [0, 0, 1, 1, 2, 2, 3, 3]);
});

test("release: nothing below 10 phones, an item only from 10 answers", () => {
  assert.deepEqual(release(many(9), null), { people: 9, who: null, counts: null, split: null });
  const r = release(many(9).concat([rec({ w1: 5, w2: 5, w3: 5, w4: 5, w5: 5, ladder: null })]), null);
  assert.equal(r.people, 10); assert.equal(r.who.reduce((s, x) => s + x, 0), 10);
  assert.equal(r.who[15], 9); assert.equal(r.who[25], 1);
  assert.equal(r.counts.ladder, undefined, "9 answers to the ladder: not shown");
  assert.deepEqual(r.counts.st, [0, 0, 10, 0, 0], "stress has five answers");
  assert.deepEqual(r.counts.mind, [10, 0, 0, 0, 0, 0, 0]);
  assert.deepEqual(r.counts.p_leftout, [0, 10, 0]);
  /* 11 phones, 10 answered the ladder: shown */
  const r2 = release(many(10).concat([rec({ ladder: null })]), null);
  assert.deepEqual(r2.counts.ladder, [0, 0, 0, 0, 10, 0, 0, 0, 0, 0]);
});

test("release: a split shows only when no number can be taken from another to give fewer than 10", () => {
  const sides = ["Morning", "Evening"];
  /* 10 and 10, nobody without a side: both sides */
  let r = release(many(10, {}, 0).concat(many(10, { st: 5 }, 1)), sides);
  assert.deepEqual(r.split.n, [10, 10]); assert.equal(r.split.none, 0);
  assert.deepEqual(r.split.per_side[0].counts.st[2], 10); assert.deepEqual(r.split.per_side[1].counts.st[4], 10);
  /* 10 and 9: neither side (the whole group minus one side would give the other) */
  r = release(many(10, {}, 0).concat(many(9, {}, 1)), sides);
  assert.deepEqual(r.split.per_side, [null, null]); assert.ok(r.counts, "the whole group still shows");
  /* 10, 10 and 3 without a side: neither (the whole minus both sides would give the three) */
  r = release(many(10, {}, 0).concat(many(10, {}, 1), many(3, {}, null)), sides);
  assert.deepEqual(r.split.per_side, [null, null]); assert.equal(r.split.none, 3);
  /* 10, 10 and 10 without a side: both */
  r = release(many(10, {}, 0).concat(many(10, {}, 1), many(10, {}, null)), sides);
  assert.ok(r.split.per_side[0] && r.split.per_side[1]);
  /* an item per side: 10 and 10 phones, but only 9 of side B answered the ladder: no ladder on either side */
  r = release(many(10, {}, 0).concat(many(9, {}, 1), [rec({ ladder: null }, 1)]), sides);
  assert.ok(r.split.per_side[0].counts.st && r.split.per_side[1].counts.st);
  assert.equal(r.split.per_side[0].counts.ladder, undefined); assert.equal(r.split.per_side[1].counts.ladder, undefined);
  assert.ok(r.counts.ladder, "the whole group has 19 answers to it");
});

test("charts: bins, bands, means, bars that lift or weigh", () => {
  assert.deepEqual(chartsOf(7, null, null), { n: 7 });
  const recs = many(5, { w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, st: 5, y_load: 1, y_control: 5, p_leftout: 3, p_say: 5, sleep: 1, mind: "health", role: "working" })
    .concat(many(5, { w1: 5, w2: 5, w3: 5, w4: 5, w5: 5, st: 1, y_load: 5, y_control: 1, p_leftout: 1, p_say: 1, sleep: 4, mind: "nothing" }));
  const k = release(recs, null), c = chartsOf(10, k.who, k.counts);
  assert.equal(c.n, 10);
  assert.equal(c.who.length, 13); assert.equal(c.who[0], 5); assert.equal(c.who[12], 5);
  assert.deepEqual(c.bands, [5, 0, 0, 5]);
  assert.equal(c.who_mean, 50); assert.equal(c.st_mean, 3, "stress on 1-5");
  assert.equal(c.bars.y_load, 50); assert.equal(c.bars.y_control, 50); assert.equal(c.bars.p_leftout, 50); assert.equal(c.bars.p_say, 50); assert.equal(c.bars.sleep, 50);
  assert.equal(c.bars.y_support, 50, "all in the middle");
  assert.equal(c.bars_n.y_load, 10);
  assert.deepEqual(c.mind, { money: 0, work_or_studies: 0, health: 5, people: 0, future: 0, country: 0, nothing: 5 });
  assert.deepEqual(c.role, { student: 5, working: 5, neither: 0 });
  assert.equal(c.ladder.length, 10); assert.equal(c.sleep.length, 5);
  /* the direction of each bar */
  const all = ITEMS.filter((it) => it.bar);
  /* the codebook's formulas, answer by answer (x is the stored value) */
  const want = {
    y_control: (x) => (5 - x) * 25, y_support: (x) => (5 - x) * 25, y_recog: (x) => (5 - x) * 25, y_meaning: (x) => (5 - x) * 25,
    y_load: (x) => (x - 1) * 25, y_future: (x) => (x - 1) * 25,
    p_say: (x) => (5 - x) * 25, p_deserve: (x) => (5 - x) * 25, p_better: (x) => (5 - x) * 25,
    p_leftout: (x) => (3 - x) * 50, sleep: (x) => [0, 25, 50, 100, 100][x - 1],
  };
  assert.deepEqual(Object.keys(want).sort(), all.map((it) => it.id).sort());
  for (const it of all) for (let x = it.min; x <= it.max; x++) assert.equal(lift(it, x - it.min), want[it.id](x), `${it.id} = ${x}`);
  const worse = release(many(10, { y_load: 1, y_future: 1, p_leftout: 3, y_support: 5, p_say: 5, sleep: 1 }), null);
  const cw = chartsOf(10, worse.who, worse.counts);
  for (const id of ["y_load", "y_future", "p_leftout", "y_support", "p_say", "sleep"]) assert.equal(cw.bars[id], 0, id + " weighs at its worst");
  const better = release(many(10, { y_load: 5, y_recog: 1, p_better: 1, p_leftout: 1, sleep: 5 }), null);
  const cb = chartsOf(10, better.who, better.counts);
  for (const id of ["y_load", "y_recog", "p_better", "p_leftout", "sleep"]) assert.equal(cb.bars[id], 100, id + " lifts at its best");
  /* a WHO score of 48 (sum 12) is band 1, 52 is band 2: the bands come from the sums, not the bins */
  const edge = release(many(5, { w1: 4, w2: 2, w3: 2, w4: 2, w5: 2 }).concat(many(5, { w1: 5, w2: 2, w3: 2, w4: 2, w5: 2 })), null);
  assert.deepEqual(chartsOf(10, edge.who, edge.counts).bands, [0, 5, 5, 0]);
});

test("split view: by the side names, the count only for a side not shown", () => {
  const sides = ["A team", "B team"];
  const shown = release(many(10, {}, 0).concat(many(12, {}, 1)), sides);
  const v = splitOf(shown.split);
  assert.deepEqual(v.sides, sides); assert.equal(v.none, 0);
  assert.equal(v.per_side["A team"].n, 10); assert.equal(v.per_side["B team"].n, 12); assert.ok(v.per_side["B team"].who_mean);
  const hidden = splitOf(release(many(10, {}, 0).concat(many(4, {}, 1)), sides).split);
  assert.deepEqual(hidden.per_side, { "A team": { n: 10 }, "B team": { n: 4 } });
  assert.equal(splitOf(null), null);
});
