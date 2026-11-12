/* Logicers Live: how long a saved game ("kit") is kept, with a clock that can be moved (12 Nov 2026: a year after
   the last use, no longer two months). Runs the real Kit class in plain Node, no server, no wrangler:
     cd server/live && node --import ./test/register-cf.mjs test/test_kitkeep.mjs
   Time is the test's own: Date.now() is replaced, and each object's storage and alarm are a small stand-in
   that keeps what a Durable Object keeps between wake-ups (and nothing in memory: wake() drops the object,
   as Cloudflare does with an idle one, and the next call builds it again from its storage).
   The days are counted here in plain numbers, never with the Worker's own constants, so the rule itself is
   checked. Games "saved under the two-month rule" are written by hand in the shape the old code left (its
   delete date 60 days after the last use, an alarm at that date, a family's record with only "until"). */
import { Kit } from "../src/kit.js";
import { sha, randomKey } from "../src/keys.js";
import { ok, eq, report } from "./lib.mjs";

const DAY = 86400e3, HOUR = 3600e3;
const T0 = Date.UTC(2026, 10, 12, 9, 0, 0);
let NOW = T0;
Date.now = () => NOW;
const at = (days) => { NOW = T0 + days * DAY; };

/* ---- a Durable Object's storage, and the little world around the Kit ---- */
const clone = (v) => (v === undefined ? undefined : structuredClone(v));
class Storage {
  constructor() { this.map = new Map(); this.alarm = null; }
  async get(k) { return clone(this.map.get(k)); }
  async put(k, v) { if (typeof k === "object") for (const [a, b] of Object.entries(k)) this.map.set(a, clone(b)); else this.map.set(k, clone(v)); }
  async delete(k) { if (Array.isArray(k)) { let n = 0; for (const x of k) if (this.map.delete(x)) n++; return n; } return this.map.delete(k); }
  async list(o) { const p = (o && o.prefix) || "", out = new Map(); for (const k of [...this.map.keys()].sort()) if (k.startsWith(p)) out.set(k, clone(this.map.get(k))); return out; }
  async deleteAll() { this.map.clear(); this.alarm = null; }       // since 24 Feb 2026 deleteAll() deletes the alarm too
  async setAlarm(t) { this.alarm = Number(t); }
  async getAlarm() { return this.alarm; }
  async deleteAlarm() { this.alarm = null; }
}
const storages = new Map(), live = new Map();
const store = (name) => { if (!storages.has(name)) storages.set(name, new Storage()); return storages.get(name); };
async function kitOf(name) {
  if (!live.has(name)) {
    let ready;
    const ctx = { storage: store(name), blockConcurrencyWhile: (f) => (ready = f()) };
    const k = new Kit(ctx, env);
    await ready;
    live.set(name, k);
  }
  return live.get(name);
}
const wake = (name) => live.delete(name);                         // an idle object goes; its storage stays
const stub = (name) => new Proxy({}, { get: (_, m) => (...a) => kitOf(name).then((k) => k[m](...a)) });
const env = {
  TOTALS: { idFromName: () => ({ name: "all" }), get: () => ({ spend: async () => true, spendPlays: async () => true }) },
  KIT: { idFromName: (name) => ({ name }), get: (id) => stub(id.name) },
  WAY: { idFromName: (name) => ({ name }), get: () => ({ add: async () => true, remove: async () => true }) },
  MAIL: { idFromName: (name) => ({ name }), get: () => ({ remove: async () => true }) },
};
/* what Cloudflare does: every alarm that is due rings, once, on a fresh object */
async function ring() {
  for (const [name, st] of storages) {
    if (st.alarm !== null && st.alarm <= NOW) { st.alarm = null; wake(name); await (await kitOf(name)).alarm(); }
  }
}
const Q = () => ({ id: "qnum01", type: "num", t: "How many member states?", a: 27, lo: 0, hi: 50, step: 1, u: "states", f: "", s: "" });
const kitBody = () => ({ v: 1, title: "A quiz", line: "", lang: "en", colour: "teal", qs: [Q()] });
let n = 0;
const code = () => { const a = "BCDFGHJKLMNPQRSTVWXZ"; let s = ""; for (let i = 0, x = ++n * 7919; i < 7; i++, x = Math.floor(x / 3) + 17 * (i + n)) s += a[(x + i * 3) % a.length]; return s; };
async function make(extra) {
  const edit = randomKey(16), c = code();
  const r = await (await kitOf(c)).create(Object.assign({ code: c, editHash: await sha(edit), kit: kitBody() }, extra || {}));
  if (!r.ok) throw new Error("create: " + JSON.stringify(r));
  return { code: c, edit, r };
}
const there = async (c) => !!(await (await kitOf(c)).adminView());
const metaOf = async (c) => (await (await kitOf(c)).adminView()).meta;
const bare = (c) => storages.get(c).map.size === 0;
/* a game as the two-month code left it: its delete date and its alarm 60 days after the last use */
function asOld(c) {
  const st = storages.get(c), m = st.map.get("meta");
  m.until = m.used + 60 * DAY;
  st.alarm = m.until;
  wake(c);
}

/* ================================================================ 1. a new game: a year after the last use */
{
  const g = await make();
  eq(g.r.until, T0 + 365 * DAY, "a new game is kept 365 days");
  eq(storages.get(g.code).alarm, T0 + 365 * DAY, "its alarm is the same day");
  eq((await metaOf(g.code)).until, T0 + 365 * DAY, "and so is the date the page is told");
}

/* ================================================================ 2. last used 11 months ago: there; 13 months ago: gone */
{
  at(0);
  const x = await make(), y = await make(), edge = await make();
  at(335);                                              // 11 months after the last use
  await ring();
  ok(await there(x.code) && await there(y.code), "11 months (335 days) after its last use a game is still there");
  eq(storages.get(x.code).alarm, T0 + 365 * DAY, "its alarm still waits for the year");
  at(364); await ring();
  ok(await there(edge.code), "364 days after its last use: there");
  at(366); await ring();
  ok(bare(edge.code), "366 days after its last use: gone, nothing left on its disk");
  at(395);                                              // 13 months
  await ring();
  ok(bare(x.code) && bare(y.code), "13 months (395 days) after its last use a game is gone, nothing left on its disk");
  ok(!(await there(x.code)), "and it answers as a game that does not exist");
}

/* ================================================================ 3. a use starts the year again */
{
  at(0);
  const g = await make();
  at(300);
  const o = await (await kitOf(g.code)).open({ edit: g.edit });
  ok(o.ok === true, "opened with its edit key at day 300");
  eq(o.until, T0 + (300 + 365) * DAY, "the page is told a year from that use");
  eq(storages.get(g.code).alarm, T0 + (300 + 365) * DAY, "and the alarm moved with it");
  at(364); await ring();
  ok(await there(g.code), "day 364, 364 days after the game was made: there, it was used at day 300");
  at(664); await ring();
  ok(await there(g.code), "day 664 (364 days after the use): there");
  at(666); await ring();
  ok(bare(g.code), "day 666: gone");
}

/* ================================================================ 4. a game saved under the two-month rule */
{
  at(0);
  const g = await make();
  asOld(g.code);
  eq(storages.get(g.code).alarm, T0 + 60 * DAY, "(the game is written as the old code left it: alarm at day 60)");
  eq(storages.get(g.code).map.get("meta").until, T0 + 60 * DAY, "(and the delete date stored with it is day 60)");
  at(30);
  ok(await there(g.code), "day 30: there");
  eq((await metaOf(g.code)).until, T0 + 365 * DAY, "the page is already told a year (the date is read from the last use, not from what was stored)");
  at(60); NOW += HOUR;
  await ring();                                         // the old alarm rings, past the old date
  ok(await there(g.code), "past its old date the game is NOT deleted");
  eq(storages.get(g.code).alarm, T0 + 365 * DAY, "its alarm is now a year after the last use");
  eq((await metaOf(g.code)).until, T0 + 365 * DAY, "and its date too");
  at(364); await ring();
  ok(await there(g.code), "day 364: there");
  at(366); await ring();
  ok(bare(g.code), "day 366: gone");
}
{
  /* the old alarm rings on a game that was used meanwhile: it lives a year from that use, not from the first */
  at(0);
  const g = await make();
  asOld(g.code);
  at(40);
  await (await kitOf(g.code)).open({ edit: g.edit });  // an hour-old object would write the use; this one is fresh: a write
  eq(storages.get(g.code).alarm, T0 + (40 + 365) * DAY, "used on day 40 under the new code: alarm at day 405");
  at(61); await ring();
  ok(await there(g.code), "its old alarm (day 60) found it alive");
  at(404); await ring();
  ok(await there(g.code), "day 404: there");
  at(406); await ring();
  ok(bare(g.code), "day 406: gone");
}

/* ================================================================ 5. a family: the first game's record, new and old */
{
  at(0);
  const first = await make();
  const copy = await make({ from: first.code, root: first.code });
  await (await kitOf(first.code)).addCopy(copy.code);
  /* the first game is deleted by its maker: only the record stays, a year after that day */
  at(10);
  eq((await (await kitOf(first.code)).remove({ edit: first.edit })).ok, true, "the maker deletes the first game");
  const f = storages.get(first.code);
  eq(f.alarm, T0 + (10 + 365) * DAY, "the family's record lives a year from that day (alarm)");
  ok(!!f.map.get("fam") && !f.map.get("meta"), "only the record is left");
  /* a copy in use tells the record: its year starts again */
  at(200);
  await (await kitOf(copy.code)).open({ edit: copy.edit });
  eq(f.alarm, T0 + (200 + 365) * DAY, "a copy used on day 200: the record's alarm is day 565");
  at(370); await ring();
  ok(!!f.map.get("fam"), "day 370: the record is still there (a copy was used at day 200)");
  at(564); await ring();
  ok(!!f.map.get("fam"), "day 564: there");
  at(566); await ring();
  ok(f.map.size === 0, "day 566: the record is gone");
}
{
  /* a record written under the old rule: only "until", 60 days after the last use of any copy */
  at(0);
  const first = await make();
  const copy = await make({ from: first.code, root: first.code });
  await (await kitOf(first.code)).addCopy(copy.code);
  at(5);
  await (await kitOf(first.code)).remove({ edit: first.edit });
  const f = storages.get(first.code), fam = f.map.get("fam");
  delete fam.last; fam.until = T0 + (5 + 60) * DAY; f.alarm = fam.until;       // as the old code left it
  wake(first.code);
  at(65); NOW += HOUR;
  await ring();
  ok(!!f.map.get("fam"), "an old family record is not deleted at its old date (day 65)");
  eq(f.alarm, T0 + (5 + 365) * DAY, "its alarm is a year after its last use (day 5)");
  eq((await (await kitOf(first.code)).adminView()).meta.until, T0 + (5 + 365) * DAY, "the desk is told the same");
  at(369); await ring();
  ok(!!f.map.get("fam"), "day 369: there");
  at(371); await ring();
  ok(f.map.size === 0, "day 371: gone");
}

process.exit(report("test_kitkeep") ? 1 : 0);
