/* Logicers: the world's counts (16 Oct 2026). One Durable Object per calendar date (its name is "d:" and the
   date, YYYYMMDD, as the player's own phone counts it), holding how that date's daily games went, country by
   country. The Worker (worker.js, the /stats/ calls) reads the country from the connection, as Cloudflare
   gives it, and this object adds one result to that country's row.

   What it keeps, and nothing else: for each game and each country, how many results, the sum of their points
   (points.js), how many fell in each tenth of the points, the sum of the guesses where a game has one number
   for a guess, and for Your Call how many made each of the three choices. One row per game and country, so at
   most 9 x 250 rows a date. Never a single result, never an address, never anything about a player.

   The brake (simple guards, said plainly, because without accounts nobody can stop a determined cheat): one
   address may add at most 100 results to one game of one date and 900 to the whole date (a school, or a mobile
   network that puts many phones behind one address, stays inside it). The address arrives here only as a keyed
   hash made with the date (worker.js), and is held in this object's memory, never stored: when the object
   sleeps it is forgotten.

   A guess is shared only where at least two were made (gn >= 2), so that no single player's guess ever leaves
   the counts. The table is made by the first result; a date that is only read is never stored.

   A date's counts are deleted 75 days after it (an alarm set by its first result), which keeps this month's
   and last month's tables and nothing older.

   Reactions (19 Oct 2026, Khayyam: "reactions on the site"): after a game a player may tap one of three feelings
   (0 surprised, 1 knew it, 2 made me think). The same date's object keeps, in a second table x, how many taps each
   game got from each country: counts only, like the table above, and under the same brake (one address may add at
   most PER_GAME taps to one game of one date, held in memory only). Deleted with the date.

   Records (19 Oct 2026, "the lifetime record"): one more object of this class, named "rec", not tied to a date, keeps
   for each country the most games it ever played in one day and the date, and the world's own biggest day, so a
   team page can say "our record: 212 games". It holds numbers and dates, nothing else, and is never deleted.

   Word games (29 Oct 2026, Khayyam: "we do have more than 1 and we will have many"): the word games (Altitude,
   Lookalike, Passport and those to come, one id per language each) get a world table of their own, beside the
   nine daily games' table, never mixed into it. A word game is any id points.js knows that is not one of the nine,
   so a new word game joins the word table the day its ids are in points.js, with nothing to change here. Each id
   (one game in one language) is made fair against its own world average, exactly as the nine daily games are
   against theirs, so a hard Turkish word never sinks Turkey: a player is measured against the others who played
   that same word. The summary, the team view and the records each take a kind ("daily" or "words").

   All-time totals (29 Oct 2026, "30343 today's word games of 4385934854 total"): the "rec" object also keeps, for
   each kind, the games of every date that can no longer change, added up once per date (fold); the Worker adds the
   days still open to it when asked. Numbers only. */
import { DurableObject } from "cloudflare:workers";
import "./points.js";

const P = globalThis.LogicersPoints;
const KEEP_DAYS = 75;               // a date's counts are deleted this many days after it
const PER_GAME = 100;               // results one address may add to one game of one date (a class, a mobile network)
const PER_DAY = 900;                // ...and to all the games of one date
const REMEMBER = 50000;             // addresses held in memory at most; beyond, the oldest are forgotten
const MIN_GAME = 3;                 // a country takes a place in one game's order from this many results
const PULL_GAME = 5;                // ...and is pulled toward the world's average as if it had this many more at it
const SUMMARY_MS = 30e3;            // the summary for the world table is worked out at most once in this time
/* The nine daily games, taken from points.js itself, so this list can never drift from it. Ids outside it
   (Altitude, the word climb, 28 Oct 2026: altitude-en and its five sisters) are kept and shown game by game
   like any other, but they never reach the world table, the team page or a country's record: they are not
   one of the nine, so no daily-game count may change because of them. */
const DAILY = new Set(P.SCORED.concat(["call"]));
/* the kind of a game id: "daily" for the nine, "words" for every other id points.js knows (29 Oct 2026) */
function kindOf(g) { return DAILY.has(g) ? "daily" : P.LIMITS.hasOwnProperty(g) ? "words" : null; }
function kindIn(k) { return k === "words" ? "words" : "daily"; }
/* the totals start here: the first date the world's counts had (the 16 Oct 2026 push; a day early, for a phone far
   east of it). Every date from this one on is folded in once, in order, never skipped. */
export const TOTALS_FROM = "20261015";
export function nextKey(d) {
  const t = dayStart(d);
  if (!isFinite(t)) return "";
  return new Date(t + 86400e3).toISOString().slice(0, 10).replace(/-/g, "");
}

const HB = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const HCOLS = HB.map((i) => "h" + i).join(", ");
const XCOLS = ["r0", "r1", "r2"];
const CC = /^[A-Z]{2}$/;
const CT = /^(AF|AN|AS|EU|NA|OC|SA)$/;

function dayStart(d) {
  const m = /^(\d{4})(\d{2})(\d{2})$/.exec(String(d));
  return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : NaN;
}
/* one row as the pages read it: n results, p their points, h the tenths, gs/gn the guesses, k the choices */
function blankAgg() { return { n: 0, p: 0, h: HB.map(() => 0), gs: 0, gn: 0, k: [0, 0, 0] }; }
function addTo(a, r) {
  a.n += r.n; a.p += r.p; a.gs += r.gs; a.gn += r.gn;
  HB.forEach((i) => { a.h[i] += r["h" + i]; });
  a.k[0] += r.k0; a.k[1] += r.k1; a.k[2] += r.k2;
  return a;
}
function tidyAgg(a) {
  a.gs = Math.round(a.gs * 1000) / 1000;
  if (a.gn < 2) { a.gs = 0; a.gn = 0; }     // one guess alone is one player's: never shared
  return a;
}
const TABLE = `CREATE TABLE IF NOT EXISTS r (
      g TEXT NOT NULL, c TEXT NOT NULL, ct TEXT NOT NULL,
      n INTEGER NOT NULL DEFAULT 0, p INTEGER NOT NULL DEFAULT 0,
      ${HB.map((i) => "h" + i + " INTEGER NOT NULL DEFAULT 0").join(", ")},
      gs REAL NOT NULL DEFAULT 0, gn INTEGER NOT NULL DEFAULT 0,
      k0 INTEGER NOT NULL DEFAULT 0, k1 INTEGER NOT NULL DEFAULT 0, k2 INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (g, c))`;

/* Altitude's order of finish (30 Oct 2026): one row per (height, guesses, seconds) of a date and the number of climbs
   that ended exactly so. Numbers only; nobody is named, and a climb whose page sent no time is not in it. */
const ATABLE = `CREATE TABLE IF NOT EXISTS a (
      g TEXT NOT NULL, h INTEGER NOT NULL, u INTEGER NOT NULL, s INTEGER NOT NULL,
      n INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (g, h, u, s))`;

const XTABLE = `CREATE TABLE IF NOT EXISTS x (
      g TEXT NOT NULL, c TEXT NOT NULL,
      r0 INTEGER NOT NULL DEFAULT 0, r1 INTEGER NOT NULL DEFAULT 0, r2 INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (g, c))`;

export class Tally extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.made = null;               // whether the table exists (null: not looked yet)
    this.madeX = null;              // the same for the reactions' table x
    this.madeA = null;              // ...and for Altitude's order of finish, table a
    this.seen = new Map();          // address hash -> { all, games: { k: n } }: memory only
    this.summed = {};               // kind -> { at, data }
    this.dated = false;
  }

  /* the date's alarm, once: everything of this date goes KEEP_DAYS days after it */
  async date(d) {
    if (this.dated) return;
    const t = dayStart(d);
    if (!isFinite(t)) return;
    const until = t + KEEP_DAYS * 86400e3;
    const now = await this.ctx.storage.getAlarm();
    if (now !== until) await this.ctx.storage.setAlarm(until);
    this.dated = true;
  }

  async alarm() {
    this.sql.exec("DROP TABLE IF EXISTS r");
    this.sql.exec("DROP TABLE IF EXISTS x");
    this.sql.exec("DROP TABLE IF EXISTS a");
    await this.ctx.storage.deleteAll();
    this.summed = {};
    this.made = false;
    this.madeX = false;
    this.madeA = false;
    this.dated = false;
  }

  /* the table: made by the first result only, so a date that is only read stores nothing */
  has() {
    if (this.made === null) this.made = this.sql.exec("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'r'").toArray().length > 0;
    return this.made;
  }
  make() {
    if (this.has()) return;
    this.sql.exec(TABLE);
    this.made = true;
  }
  rows(q, ...a) { return this.has() ? this.sql.exec(q, ...a).toArray() : []; }

  /* this address's memory for the brake (made when first seen; the oldest tenth is forgotten beyond REMEMBER) */
  entry(who) {
    let s = this.seen.get(who);
    if (!s) {
      s = { all: 0, games: {}, rx: {} };
      this.seen.set(who, s);
      if (this.seen.size > REMEMBER) {
        let n = Math.ceil(REMEMBER / 10);
        for (const key of this.seen.keys()) { if (key === who) continue; this.seen.delete(key); if (--n <= 0) break; }
      }
    }
    return s;
  }

  /* how many more results this address may add to game k now (and counts one in, when take is true) */
  room(who, k, take) {
    const s = this.entry(who);
    const ok = s.all < PER_DAY && (s.games[k] || 0) < PER_GAME;
    if (ok && take) { s.all++; s.games[k] = (s.games[k] || 0) + 1; }
    return ok;
  }

  /* the same brake for the taps of the reactions: PER_GAME to one game of the date, PER_DAY to all of them */
  roomX(who, k) {
    const s = this.entry(who);
    s.rx = s.rx || {};
    s.rxAll = s.rxAll || 0;
    if (s.rxAll >= PER_DAY || (s.rx[k] || 0) >= PER_GAME) return false;
    s.rxAll++;
    s.rx[k] = (s.rx[k] || 0) + 1;
    return true;
  }

  /* results in: { d, who, c, ct, rs: [{ k, e, g } | { k, c }], k } -> { took, view } (the view of game k) */
  async add(o) {
    const c = CC.test(o.c) ? o.c : "??", ct = CT.test(o.ct) ? o.ct : "??";
    /* a date closes 36 hours after it begins in UTC (UTC-12 is the last clock on it), and its totals are folded
       after that (worker.js): the Worker refuses later results, and so does the date itself, by its own clock,
       for one that reached it late (29 Oct 2026) */
    const start = dayStart(o.d);
    if (isFinite(start) && Date.now() >= start + 36 * 3600e3) return { took: 0, ks: [], view: typeof o.k === "string" ? this.view({ k: o.k, c, ct }) : null };
    let took = 0, me = null;
    const ks = [];
    const seenK = {};
    for (const x of Array.isArray(o.rs) ? o.rs.slice(0, 9) : []) {
      if (!P.valid(x) || seenK[x.k]) continue;
      seenK[x.k] = true;
      if (!this.room(o.who, x.k, true)) continue;
      if (!took) { this.make(); await this.date(o.d); }
      const pts = P.points(x.k, x.e);
      const p = pts === null ? 0 : pts;
      const hcol = pts === null ? null : "h" + P.tenth(pts);
      let gs = 0, gn = 0;
      if (P.GUESS[x.k]) { gs = P.GUESS[x.k] === "log" ? Math.log(x.g) : x.g; gn = 1; }
      const kcol = x.c !== undefined ? "k" + x.c : null;
      const cols = ["g", "c", "ct", "n", "p", "gs", "gn"], vals = [x.k, c, ct, 1, p, gs, gn];
      const sets = ["n = n + 1", "p = p + excluded.p", "gs = gs + excluded.gs", "gn = gn + excluded.gn"];
      if (hcol) { cols.push(hcol); vals.push(1); sets.push(hcol + " = " + hcol + " + 1"); }
      if (kcol) { cols.push(kcol); vals.push(1); sets.push(kcol + " = " + kcol + " + 1"); }
      this.sql.exec(`INSERT INTO r (${cols.join(", ")}) VALUES (${cols.map(() => "?").join(", ")})
        ON CONFLICT (g, c) DO UPDATE SET ${sets.join(", ")}`, ...vals);
      const od = P.order(x);                            // Altitude: where this climb stands in the order of finish
      if (od) {
        this.makeA();
        this.sql.exec(`INSERT INTO a (g, h, u, s, n) VALUES (?, ?, ?, ?, 1) ON CONFLICT (g, h, u, s) DO UPDATE SET n = n + 1`, x.k, od[0], od[1], od[2]);
        if (o.k === x.k) me = od;                       // the view that comes back says where this very climb stands
      }
      took++;
      ks.push(x.k);
    }
    if (took) this.summed = {};
    return { took, ks, view: typeof o.k === "string" ? this.view({ k: o.k, c, ct, me }) : null };
  }

  hasA() {
    if (this.madeA === null) this.madeA = this.sql.exec("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'a'").toArray().length > 0;
    return this.madeA;
  }
  makeA() {
    if (this.hasA()) return;
    this.sql.exec(ATABLE);
    this.madeA = true;
  }
  /* Where a climb [height, guesses, seconds] stands in game k's order of finish: n the climbs that came with a time,
     b how many of them finished below it (lower, or the same height with more guesses, or the same with more seconds),
     e how many ended exactly so (it, when it has been counted, and its equals). null when there is nothing to say. */
  place(k, me) {
    if (!/^altitude-/.test(k) || !this.hasA() || !Array.isArray(me) || me.length !== 3) return null;
    const [h, u, s] = me;
    const w = (v, max) => Number.isInteger(v) && v >= 0 && v <= max;
    if (!w(h, 8) || !w(u, 27) || !w(s, 3599)) return null;
    const r = this.sql.exec(`SELECT COALESCE(SUM(n), 0) AS n,
        COALESCE(SUM(CASE WHEN h < ? OR (h = ? AND u > ?) OR (h = ? AND u = ? AND s > ?) THEN n ELSE 0 END), 0) AS b,
        COALESCE(SUM(CASE WHEN h = ? AND u = ? AND s = ? THEN n ELSE 0 END), 0) AS e
      FROM a WHERE g = ?`, h, h, u, h, u, s, h, u, s, k).toArray()[0];
    return r && r.n > 0 ? { n: r.n, b: r.b, e: r.e } : null;
  }

  /* one game of this date, as a player from country c (continent ct) sees it at the reveal:
     w the world, t the continent, h the country (each { n, p, h, gs, gn, k }), the country's place among the
     countries with at least MIN_GAME results (pulled toward the world's average, so three lucky players never
     top a game), the three best countries, and how many countries have played it */
  view(o) {
    const k = String(o.k || "");
    if (!P.LIMITS.hasOwnProperty(k)) return null;
    const c = CC.test(o.c) ? o.c : "??", ct = CT.test(o.ct) ? o.ct : "??";
    const rows = this.rows(`SELECT c, ct, n, p, ${HCOLS}, gs, gn, k0, k1, k2 FROM r WHERE g = ?`, k);
    const w = blankAgg(), t = blankAgg();
    let h = null, countries = 0;
    for (const r of rows) {
      addTo(w, r);
      if (ct !== "??" && r.ct === ct) addTo(t, r);
      if (r.c === c && c !== "??") h = addTo(blankAgg(), r);
      if (r.c !== "??") countries++;
    }
    let rank = null, top = [];
    if (k !== "call" && w.n) {
      const W = w.p / w.n;
      const list = rows.filter((r) => r.c !== "??" && r.n >= MIN_GAME)
        .map((r) => ({ c: r.c, n: r.n, s: (r.p + PULL_GAME * W) / (r.n + PULL_GAME) }))
        .sort((a, b) => b.s - a.s || b.n - a.n || (a.c < b.c ? -1 : 1));
      const at = list.findIndex((x) => x.c === c);
      rank = { at: at >= 0 ? at + 1 : 0, of: list.length, min: MIN_GAME };
      top = list.slice(0, 3).map((x) => [x.c, Math.round(x.s)]);
    }
    const out = { k, w: tidyAgg(w), t: ct !== "??" ? tidyAgg(t) : null, h: h ? tidyAgg(h) : null, rank, top, countries };
    const place = o.me ? this.place(k, o.me) : null;
    if (place) out.place = place;                       // Altitude only: where the asker's own climb stands (30 Oct 2026)
    return out;
  }

  /* ---------------- reactions ---------------- */
  hasX() {
    if (this.madeX === null) this.madeX = this.sql.exec("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'x'").toArray().length > 0;
    return this.madeX;
  }
  makeX() {
    if (this.hasX()) return;
    this.sql.exec(XTABLE);
    this.madeX = true;
  }
  xrows(q, ...a) { return this.hasX() ? this.sql.exec(q, ...a).toArray() : []; }

  /* one tap (r: 0, 1 or 2) on game k from country c; -> { took, view }. With r null it only reads. */
  async react(o) {
    const c = CC.test(o.c) ? o.c : "??", k = String(o.k || "");
    if (!P.LIMITS.hasOwnProperty(k)) return { took: 0, view: null };
    let took = 0;
    if (Number.isInteger(o.r) && o.r >= 0 && o.r <= 2 && this.roomX(o.who, k)) {
      this.makeX();
      await this.date(o.d);
      const col = XCOLS[o.r];
      this.sql.exec(`INSERT INTO x (g, c, ${col}) VALUES (?, ?, 1) ON CONFLICT (g, c) DO UPDATE SET ${col} = ${col} + 1`, k, c);
      took = 1;
    }
    return { took, view: this.reactView(k, c) };
  }

  /* game k's taps: w the world's three counts, h the country's (null where it has none) */
  reactView(k, c) {
    const w = [0, 0, 0];
    let h = null;
    for (const r of this.xrows("SELECT c, r0, r1, r2 FROM x WHERE g = ?", k)) {
      w[0] += r.r0; w[1] += r.r1; w[2] += r.r2;
      if (r.c === c && c !== "??") h = [r.r0, r.r1, r.r2];
    }
    return { k, w, h };
  }

  /* for the team page: each country in cs (one or two), and the world, as the date's games of one kind went
     ("daily", the nine, or "words", 29 Oct 2026): g { game: [results, points] } (Your Call has no points, its
     results are counted), x { game: [r0, r1, r2] } */
  team(cs, kind) {
    const K = kindIn(kind);
    const want = (Array.isArray(cs) ? cs : []).filter((c) => CC.test(c)).slice(0, 2);
    const out = { world: { g: {}, x: {} } };
    for (const c of want) out[c] = { g: {}, x: {} };
    for (const r of this.rows("SELECT g, c, n, p FROM r")) {
      if (kindOf(r.g) !== K) continue;
      const w = out.world.g[r.g] || (out.world.g[r.g] = [0, 0]);
      w[0] += r.n; w[1] += r.p;
      if (out[r.c] && r.c !== "world") {
        const t = out[r.c].g[r.g] || (out[r.c].g[r.g] = [0, 0]);
        t[0] += r.n; t[1] += r.p;
      }
    }
    for (const r of this.xrows("SELECT g, c, r0, r1, r2 FROM x")) {
      if (kindOf(r.g) !== K) continue;
      const w = out.world.x[r.g] || (out.world.x[r.g] = [0, 0, 0]);
      w[0] += r.r0; w[1] += r.r1; w[2] += r.r2;
      if (out[r.c] && r.c !== "world") out[r.c].x[r.g] = [r.r0, r.r1, r.r2];
    }
    return out;
  }

  /* ---------------- records (the object named "rec") ---------------- */
  /* list: [[country or "**" for the world, games played that date, date]]; keeps the biggest day of each (the
     earlier date wins a tie); returns how many records changed. The word games' records (kind "words", 29 Oct
     2026) are kept beside the daily games', under "w:" and the country ("w:**" the world's), and read back under
     the plain names, so a team page reads both kinds alike. */
  async note(list, kind) {
    const pre = kindIn(kind) === "words" ? "w:" : "";
    const rec = (await this.ctx.storage.get("rec")) || {};
    let changed = 0;
    for (const x of Array.isArray(list) ? list.slice(0, 1500) : []) {
      const c = x[0], n = x[1], d = x[2];
      if (!(c === "**" || CC.test(c)) || !Number.isInteger(n) || n < 1 || !/^\d{8}$/.test(String(d))) continue;
      const cur = rec[pre + c];
      if (!cur || n > cur[0]) { rec[pre + c] = [n, d]; changed++; }
    }
    if (changed) await this.ctx.storage.put("rec", rec);
    return changed;
  }
  async records(cs, kind) {
    const pre = kindIn(kind) === "words" ? "w:" : "";
    const rec = (await this.ctx.storage.get("rec")) || {};
    const out = { "**": rec[pre + "**"] || null };
    for (const c of Array.isArray(cs) ? cs : []) if (CC.test(c)) out[c] = rec[pre + c] || null;
    return out;
  }

  /* ---------------- all-time totals (the object named "rec", 29 Oct 2026) ----------------
     Kept under the key "all": { through: the last date folded in, or "", daily: games, words: games }.
     fold(days): days [[date, daily games, word games]], dates that can no longer change, in order. Each is added
     only if it is exactly the date after the last one folded (the first is TOTALS_FROM), so a date is never added
     twice and never skipped: a gap stops the fold, and the next run starts again from the gap. -> the new "all" */
  async fold(days) {
    const all = Object.assign({ through: "", daily: 0, words: 0 }, (await this.ctx.storage.get("all")) || {});
    let moved = 0;
    for (const x of Array.isArray(days) ? days.slice(0, 120) : []) {
      const d = String(x && x[0]), a = x && x[1], b = x && x[2];
      const want = all.through ? nextKey(all.through) : TOTALS_FROM;
      if (d !== want || !Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < 0) break;
      all.daily += a;
      all.words += b;
      all.through = d;
      moved++;
    }
    if (moved) await this.ctx.storage.put("all", all);
    return all;
  }
  async alltime() {
    return Object.assign({ through: "", daily: 0, words: 0 }, (await this.ctx.storage.get("all")) || {});
  }

  /* the whole date for the world table: per country and continent, how many scored results and the sum of
     their points, each made fair across games: a result counts as its points minus its game's world average,
     plus the date's average over all games (so a country is not ahead for having played the easier games);
     and per country how many played Your Call, which counts in the games played but has no points.
     -> { n, m, calls, games: { k: n }, cs: [[c, ct, n, a, calls]], ts: [[ct, n, a]] }
     kind "daily" (the default) is the nine daily games' table; "words" the word games' own (29 Oct 2026), made
     the same way, each language's id against its own average; it has no Your Call, so its calls are 0. */
  summary(kind) {
    const K = kindIn(kind);
    const now = Date.now(), had = this.summed[K];
    if (had && now - had.at < SUMMARY_MS) return had.data;
    const all = this.rows("SELECT g, c, ct, n, p FROM r");
    for (const k2 of ["daily", "words"]) if (k2 !== K) this.summed[k2] = { at: now, data: this.sumOf(all.filter((r) => kindOf(r.g) === k2)) };
    const data = this.sumOf(all.filter((r) => kindOf(r.g) === K));
    this.summed[K] = { at: now, data };
    return data;
  }
  /* both kinds at once, for the World page's two halves: one call, one scan (29 Oct 2026) */
  pair() { return { daily: this.summary("daily"), words: this.summary("words") }; }
  sumOf(rows) {
    const games = {}, gp = {};
    let N = 0, S = 0, calls = 0;
    for (const r of rows) {
      if (r.g === "call") { calls += r.n; continue; }
      games[r.g] = (games[r.g] || 0) + r.n;
      gp[r.g] = (gp[r.g] || 0) + r.p;
      N += r.n; S += r.p;
    }
    const M = N ? S / N : 0;
    const cs = {}, ts = {};
    for (const r of rows) {
      if (r.g === "call") {
        if (r.c !== "??") { const x = cs[r.c] || (cs[r.c] = { ct: r.ct, n: 0, a: 0, k: 0 }); x.k += r.n; }
        continue;
      }
      if (!games[r.g]) continue;
      const a = r.p - r.n * (gp[r.g] / games[r.g]) + r.n * M;
      if (r.c !== "??") {
        const x = cs[r.c] || (cs[r.c] = { ct: r.ct, n: 0, a: 0, k: 0 });
        x.n += r.n; x.a += a;
      }
      if (r.ct !== "??") {
        const y = ts[r.ct] || (ts[r.ct] = { n: 0, a: 0 });
        y.n += r.n; y.a += a;
      }
    }
    const r1 = (v) => Math.round(v * 10) / 10;
    const data = {
      n: N, m: r1(M), calls, games,
      cs: Object.keys(cs).sort().map((c) => [c, cs[c].ct, cs[c].n, r1(cs[c].a), cs[c].k]),
      ts: Object.keys(ts).sort().map((ct) => [ct, ts[ct].n, r1(ts[ct].a)])
    };
    return data;
  }
}
