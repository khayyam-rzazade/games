/* Logicers Live: the list of makers who asked for feedback emails (15 Oct 2026, evening). One Durable Object,
   named "list".

   Khayyam, 15 Oct 2026, asked whether makers could be written to for feedback: "yes, i do, very important".
   The way back keeps only a one-way fingerprint of a maker's email (way.js), which can be checked and never
   read, so it cannot be written to. A maker who ticks "Email me for feedback" next to that email sends the
   address itself once; the Worker checks that it is the very address of the way back (wayprint.js, the same
   file as the browser's) and this object keeps it, readable, for Logicers' desk to write to by hand. It is
   never ticked for anyone, and never shared.

   What it keeps, per address ("m:" + the server's HMAC of its fingerprint, so one inbox is one entry):
     email   the address as the maker wrote it (tidied: nothing invisible, no spaces at the ends)
     lang    the language of the game it was last ticked from (the desk writes in it)
     at      when it was last ticked
     v       which wording of the tick it was given under (1: the words of 15 Oct 2026)
     codes   { CODE: when }, the games it was ticked from (the last 40), which keep it on the list
   and "n", the number of addresses; and "x:" + the same HMAC for an address Logicers' desk took off on its
   owner's request, which keeps it off (a tick with it is refused from then on: someone else cannot put it back).

   The tick is the person's, not a game's: "Stop" in a game it was ticked from takes the address off the list
   at once, and so does Logicers' desk on their request. A game is told the address is on only if it was
   ticked there, so setting an email as a way back never tells whether someone else put it on the list.
   Otherwise it stays while one of the games it was ticked from lives, and goes with the last of them: a game
   deleted by its maker or two months after its last use, or one whose email is changed or removed (kit.js
   tells this object each time). Once a month the alarm asks each of those games whether it still carries the
   email (kit.js, wayIs), so a call that went missing is put right.
   Anyone can type any address, so a tick is a request, not a proof: the Worker takes 20 new ones a day from
   one network address, every email Logicers writes from the list says how to stop, and an address the desk
   took off on its owner's request stays off. */
import { DurableObject } from "cloudflare:workers";
import { kitCodeOk } from "./names.js";

const MAX = 20000;                  // addresses on the list (more are not taken: the editor says so)
const MAX_CODES = 40;               // games remembered per address (one more takes the place of the oldest)
const CHECK = 30 * 86400e3;         // the codes are checked against their games once a month
const BATCH = 40;                   // games asked per alarm (a free plan allows 50 calls to other objects)
const PAGE = MAX;                   // the desk gets the whole list in one call: one read of it, not one per page
export const MAIL_V = 1;            // the wording of the tick, kept with each address

export class Mail extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    const fast = env && env.TEST_TIMES === "fast";
    this.check = fast ? 3000 : CHECK;   // the checks see stale codes go in seconds; never on Cloudflare
    this.max = fast ? 12 : MAX;
    this.queue = Promise.resolve();
  }
  serial(fn) {
    const run = this.queue.then(fn);
    this.queue = run.then(() => {}, () => {});
    return run;
  }
  key(fp) { return "m:" + fp; }

  /* a game's maker ticked it: { fp, email, lang, code } -> "new" (this game had not ticked it), "again" (it had),
     or "" when it is not taken: the desk keeps it off, or the list is full. A full list takes a tick only from a
     game that already ticked it, so what a game is told never depends on another game's tick. */
  add(o) { return this.serial(() => this.addNow(o)); }
  async addNow(o) {
    if (!o || typeof o.fp !== "string" || !o.fp || o.fp.length > 64 || typeof o.code !== "string" || !kitCodeOk(o.code)) return "";
    if (typeof o.email !== "string" || !o.email || o.email.length > 254) return "";
    const k = this.key(o.fp);
    if (await this.ctx.storage.get("x:" + o.fp)) return "";
    const e = await this.ctx.storage.get(k);
    const n = (await this.ctx.storage.get("n")) || 0;
    const again = !!e && Object.prototype.hasOwnProperty.call(e.codes, o.code);
    if (!again && n >= this.max) return "";
    const codes = (e && e.codes) || {};
    const t = Date.now();
    if (!again && Object.keys(codes).length >= MAX_CODES) {
      const oldest = Object.keys(codes).sort((a, b) => codes[a] - codes[b])[0];
      delete codes[oldest];
    }
    codes[o.code] = t;
    const entry = { email: o.email, lang: typeof o.lang === "string" ? o.lang.slice(0, 8) : "en", at: t, v: MAIL_V, codes };
    await this.ctx.storage.put(e ? { [k]: entry } : { [k]: entry, n: n + 1 });
    if (!(await this.ctx.storage.getAlarm())) await this.ctx.storage.setAlarm(t + this.check);
    return again ? "again" : "new";
  }

  /* a game no longer keeps it there (deleted, or its email changed or removed): { fp, code } */
  remove(o) { return this.serial(() => this.removeNow(o)); }
  async removeNow(o) {
    if (!o || typeof o.fp !== "string" || typeof o.code !== "string") return false;
    const k = this.key(o.fp);
    const e = await this.ctx.storage.get(k);
    if (!e || !Object.prototype.hasOwnProperty.call(e.codes, o.code)) return true;
    delete e.codes[o.code];
    if (Object.keys(e.codes).length) await this.ctx.storage.put(k, e);
    else await this.dropKey(k);
    return true;
  }
  async dropKey(k) {
    const n = (await this.ctx.storage.get("n")) || 0;
    await this.ctx.storage.delete(k);
    if (n > 1) { await this.ctx.storage.put("n", n - 1); return; }
    await this.empty();
  }
  /* no address left: the count, the cursor and the alarm go, and everything else unless the desk keeps
     some address off. The count is trusted only this far: if addresses are still there (a count gone wrong),
     nothing is deleted and the count is put right (Fable's review, 15 Oct 2026). */
  async empty() {
    const left = (await this.ctx.storage.list({ prefix: "m:" })).size;
    if (left) { await this.ctx.storage.put("n", left); return; }
    await this.ctx.storage.deleteAlarm();
    if ((await this.ctx.storage.list({ prefix: "x:", limit: 1 })).size) await this.ctx.storage.delete(["n", "at"]);
    else await this.ctx.storage.deleteAll();
  }

  /* was it ticked in this game, and is it on the list (the editor's saved sheet says so, with Stop) */
  async has(fp, code) {
    if (typeof fp !== "string" || !fp || typeof code !== "string") return false;
    const e = await this.ctx.storage.get(this.key(fp));
    return !!e && Object.prototype.hasOwnProperty.call(e.codes, code);
  }

  /* "Stop" in the editor: off the list at once, from every game, but only from a game it was ticked in (a game
     that merely carries the address as its way back cannot take someone else's tick away) -> whether it went */
  stop(fp, code) {
    return this.serial(async () => {
      if (typeof fp !== "string" || !fp || typeof code !== "string") return false;
      const k = this.key(fp), e = await this.ctx.storage.get(k);
      if (!e || !Object.prototype.hasOwnProperty.call(e.codes, code)) return false;
      await this.dropKey(k);
      return true;
    });
  }

  /* off the list at once: Logicers' desk, on the owner's request, which also keeps it off (keepOff) -> whether
     it was there */
  drop(fp, keepOff) { return this.serial(() => this.dropNow(fp, keepOff)); }
  async dropNow(fp, keepOff) {
    if (typeof fp !== "string" || !fp) return false;
    const k = this.key(fp);
    const was = !!(await this.ctx.storage.get(k));
    if (keepOff) await this.ctx.storage.put("x:" + fp, Date.now());
    if (was) await this.dropKey(k);
    return was;
  }

  /* the desk's view: { mails: [{ email, lang, at, n }], more, next, of }, PAGE at a time, the newest first;
     never a code, a key or a hash */
  async page(from) {
    const all = [...(await this.ctx.storage.list({ prefix: "m:" })).values()];
    all.sort((a, b) => b.at - a.at || (a.email < b.email ? -1 : a.email > b.email ? 1 : 0));
    const f = Number.isInteger(from) && from > 0 ? from : 0;
    const part = all.slice(f, f + PAGE).map((e) => ({ email: e.email, lang: e.lang, at: e.at, n: Object.keys(e.codes).length }));
    return { mails: part, more: f + PAGE < all.length, next: f + PAGE, of: all.length };
  }

  /* once a month: each game is asked whether it still carries the address's fingerprint, about BATCH at a
     time (the next ones a minute later); a game that does not is dropped, an address left with none goes */
  alarm() { return this.serial(() => this.alarmNow()); }
  async alarmNow() {
    if (!(await this.ctx.storage.get("n"))) { await this.empty(); return; }
    const from = (await this.ctx.storage.get("at")) || "";
    const opts = { prefix: "m:", limit: BATCH };
    if (from) opts.startAfter = from;
    const list = await this.ctx.storage.list(opts);
    let asked = 0, last = from, cut = false;
    for (const [k, e] of list) {
      const codes = Object.keys(e.codes);
      if (asked > 0 && asked + codes.length > BATCH) { cut = true; break; }
      const fp = k.slice(2);
      for (const code of codes) {
        let still = true;
        try { still = await this.env.KIT.get(this.env.KIT.idFromName(code)).wayIs(fp); } catch (x) { still = true; }   // no answer: kept, asked next time
        if (!still) delete e.codes[code];
        asked++;
      }
      if (Object.keys(e.codes).length) await this.ctx.storage.put(k, e);
      else {
        await this.dropKey(k);
        if (!(await this.ctx.storage.get("n"))) return;            // the list is empty: everything of it is gone
      }
      last = k;
    }
    const done = !cut && list.size < BATCH;
    await this.ctx.storage.put("at", done ? "" : last);
    await this.ctx.storage.setAlarm(Date.now() + (done ? this.check : Math.min(60e3, this.check)));
  }
}
