/* Logicers Live: the totals, without names (14 Oct 2026). One Durable Object for the whole site.

   What it keeps, and nothing else: how many games were made and how many started each day, how many
   rounds were played and by how many players, and for each of Logicers' questions how often small,
   medium and big nets caught the answer. No name, no code, no address: these are the numbers that tune
   the sets. Days older than a year are dropped.
   It counts and never refuses: a cap on the games made in a day would be a switch anyone could trip
   with a script, closing Live for everyone until midnight. The Worker brakes each address instead.

   One exception, since 15 Oct 2026: the bytes of saved games (kit.js). Disk is the one thing a stranger
   could fill on purpose, and a full disk would stop every game, live ones included. So new saved games, and
   saved games that grow, are counted here in bytes per day, and above the day's budget saving waits until
   midnight (UTC) while everything else goes on. Saved games are deleted a year after their last use (until
   12 Nov 2026, two months), so the budget below bounds the disk at a year of the budget spent in full, every day:
   about 25.5 GB, which on Workers Paid costs about $4 a month at its worst (see the note at the budgets). */
import { DurableObject } from "cloudflare:workers";

function day(t) { return new Date(t || Date.now()).toISOString().slice(0, 10).replace(/-/g, ""); }
function blank() { return { made: 0, started: 0, rounds: 0, players: 0, kits: 0, kbytes: 0, pbytes: 0 }; }
/* Bytes a day (kbytes: saved games, pbytes: plays alone kept with them), counted as the content's own bytes
   (the disk is a little more).
   12 Nov 2026, a year instead of two months, and the account is on Workers Paid (no 5 GB wall, but storage is
   billed: the first 5 GB-month are included, then $0.20 per GB-month, Cloudflare's price list for SQLite-backed
   Durable Objects): the two budgets together are 70 MB a day, so a year of them spent in full, every single day,
   with nothing deleted, is 365 × 70 MB = 25.55 GB. Billed as it grows (the first months fall inside the 5 GB),
   that is about $20 over the first year and about $4.10 a month at its end. That is the worst case: nobody
   spends the budget every day, most games are a few kilobytes, and any game nobody uses for a year goes. The
   one way past it is a game used again before its year is up, which keeps it for another year (and a stranger
   can do that to his own games); then the disk grows by 25.55 GB a year while he keeps doing it, about $5 a
   month more for each year, which the day's budget keeps slow. The budgets therefore stay as they were. To change
   the bill, change them here: 1 MB a day less is 0.36 GB less after a year (about 7 cents a month). */
const KIT_DAY_BYTES = 40e6;
const PLAY_DAY_BYTES = 30e6;

export class Totals extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    /* the checks run the server with TEST_TIMES=fast: a "day" of 20 seconds and budgets of a few hundred
       kilobytes, so a check can spend a day's budget and see it come back; never on Cloudflare */
    this.fast = !!(env && env.TEST_TIMES === "fast");
    this.kitDay = this.fast ? 400e3 : KIT_DAY_BYTES;
    this.playDay = this.fast ? 12e3 : PLAY_DAY_BYTES;
  }
  today() { return this.fast ? "f" + Math.floor(Date.now() / 20000) : day(); }

  /* one more game made today */
  async made() {
    const k = "d:" + this.today();
    const d = Object.assign(blank(), await this.ctx.storage.get(k));
    d.made++;
    await this.ctx.storage.put(k, d);
    if (d.made === 1) await this.tidy();
    return true;
  }

  /* one more game started today: its host pressed Start (made but never started is a script, or a try) */
  async started() {
    const k = "d:" + this.today();
    const d = Object.assign(blank(), await this.ctx.storage.get(k));
    d.started++;
    await this.ctx.storage.put(k, d);
    return true;
  }

  /* bytes for saved games (kit.js): true and counted when the day's budget has room, false when it is spent */
  async spend(bytes, isNew) {
    const k = "d:" + this.today();
    const d = Object.assign(blank(), await this.ctx.storage.get(k));
    if (d.kbytes + bytes > this.kitDay) return false;
    d.kbytes += bytes;
    if (isNew) d.kits++;
    await this.ctx.storage.put(k, d);
    return true;
  }

  /* bytes for plays alone kept with saved games: the same, with a budget of its own, so a flood of plays never
     stops anyone saving a game (and the other way round) */
  async spendPlays(bytes) {
    const k = "d:" + this.today();
    const d = Object.assign(blank(), await this.ctx.storage.get(k));
    bytes = Math.max(0, bytes | 0);
    if (d.pbytes + bytes > this.playDay) return false;
    d.pbytes += bytes;
    d.alone = (d.alone || 0) + 1;
    await this.ctx.storage.put(k, d);
    return true;
  }

  /* a round finished: { set, by: [{ id, t: { s: [caught, tried], m: [...], b: [...] } }], players } */
  async round(o) {
    if (!o || typeof o.set !== "string" || !Array.isArray(o.by) || o.by.length > 20) return false;
    const k = "d:" + this.today();
    const d = Object.assign(blank(), await this.ctx.storage.get(k));
    d.rounds++;
    d.players += Math.max(0, Math.min(5000, o.players | 0));
    const puts = { [k]: d };
    for (const x of o.by) {
      if (!x || typeof x.id !== "string" || !x.t) continue;
      const qk = "q:" + o.set + ":" + x.id;
      const t = (await this.ctx.storage.get(qk)) || { s: [0, 0], m: [0, 0], b: [0, 0] };
      for (const n of ["s", "m", "b"]) {
        const v = x.t[n];
        if (Array.isArray(v) && v.length === 2) { t[n][0] += Math.max(0, v[0] | 0); t[n][1] += Math.max(0, v[1] | 0); }
      }
      puts[qk] = t;
    }
    await this.ctx.storage.put(puts);
    return true;
  }

  /* Logicers, counted (20 Oct 2026): one more browser has finished its first game and is given the next number.
     Only the running total is kept: not who got which number, no address, nothing else (the key "logicers" is
     neither a day nor a question, so read() below leaves it out). */
  async joined() {
    const n = ((await this.ctx.storage.get("logicers")) || 0) + 1;
    await this.ctx.storage.put("logicers", n);
    return n;
  }
  async logicers() { return (await this.ctx.storage.get("logicers")) || 0; }

  /* everything, for Khayyam's eyes only (the Worker checks the admin key first) */
  async read() {
    const out = { days: {}, questions: {} };
    for (const [k, v] of await this.ctx.storage.list()) {
      if (k.startsWith("d:")) out.days[k.slice(2)] = v;
      else if (k.startsWith("q:")) out.questions[k.slice(2)] = v;
    }
    return out;
  }

  async tidy() {
    const cut = "d:" + day(Date.now() - 366 * 86400e3);
    const old = await this.ctx.storage.list({ prefix: "d:", end: cut });
    if (old.size) await this.ctx.storage.delete([...old.keys()]);
  }
}
