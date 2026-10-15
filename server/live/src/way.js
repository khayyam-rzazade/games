/* Logicers Live: the way back to a lost edit link (15 Oct 2026). One Durable Object per fingerprint.

   A maker may leave an email as a way back (kit.js, setWay). The maker's browser turns it into a fingerprint
   before anything is sent (live/wayprint.js: SHA-256 of the address, lower case, as one text with a label of
   its own), and the server keeps only HMAC(SETS_KEY, "way:" + that fingerprint), with the game. Nobody can
   read an address back from it; the server can only answer "is this the same address?" when someone types
   one again: Logicers' desk (live/admin/), when a maker writes from that address after losing the link.

   This object is named by that HMAC and keeps the codes of the games that carry it, and nothing else, so the
   desk can find a maker's games from the address alone (a maker who lost the link rarely knows the code).
   What it keeps: "fp" (its own name, to check its games) and "codes" ({ CODE: when it was added }).
   It never decides anything: a code here is only a place to look. Every answer the desk gets is checked
   against the game itself (kit.js, wayInfo), so a code that is stale here (its game deleted, or its email
   changed) shows nothing. Once a month the alarm asks each game whether it still carries this fingerprint
   and drops the ones that do not; with no codes left, the object deletes everything of itself. */
import { DurableObject } from "cloudflare:workers";
import { kitCodeOk } from "./names.js";

const MAX = 200;                    // games one address can be the way back of (more are not listed here)
const CHECK = 30 * 86400e3;         // the codes are checked against their games once a month
const BATCH = 40;                   // games asked per alarm (a free plan allows 50 calls to other objects)

export class Way extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    /* the checks run the server with TEST_TIMES=fast to see stale codes go in seconds; never on Cloudflare */
    const fast = env && env.TEST_TIMES === "fast";
    this.check = fast ? 3000 : CHECK;
    this.max = fast ? 12 : MAX;         // the checks fill a list in fast time with a dozen games, not two hundred
    this.queue = Promise.resolve();
  }
  serial(fn) {
    const run = this.queue.then(fn);
    this.queue = run.then(() => {}, () => {});
    return run;
  }
  async codes() { return (await this.ctx.storage.get("codes")) || {}; }

  /* one more game with this fingerprint: { fp, code } -> false when it cannot be listed (not counted) */
  add(o) { return this.serial(() => this.addNow(o)); }
  async addNow(o) {
    if (!o || typeof o.fp !== "string" || !o.fp || o.fp.length > 64 || typeof o.code !== "string" || !kitCodeOk(o.code)) return false;
    const c = await this.codes();
    if (!Object.prototype.hasOwnProperty.call(c, o.code) && Object.keys(c).length >= this.max) return false;
    c[o.code] = Date.now();
    await this.ctx.storage.put({ fp: o.fp, codes: c });
    if (!(await this.ctx.storage.getAlarm())) await this.ctx.storage.setAlarm(Date.now() + this.check);
    return true;
  }

  /* a game no longer carries it (deleted, or its maker changed or removed the email) */
  remove(code) { return this.serial(() => this.removeNow(code)); }
  async removeNow(code) {
    if (typeof code !== "string") return false;
    const c = await this.codes();
    if (!Object.prototype.hasOwnProperty.call(c, code)) return true;
    delete c[code];
    if (!Object.keys(c).length) { await this.ctx.storage.deleteAlarm(); await this.ctx.storage.deleteAll(); return true; }
    await this.ctx.storage.put("codes", c);
    return true;
  }

  /* the codes, the newest first (the desk checks each against its game) */
  async list() {
    const c = await this.codes();
    return Object.keys(c).sort((a, b) => c[b] - c[a]);
  }

  /* once a month: each game is asked whether it still carries this fingerprint, BATCH at a time (the next
     ones a minute later), and the ones that do not are dropped */
  alarm() { return this.serial(() => this.alarmNow()); }
  async alarmNow() {
    const fp = await this.ctx.storage.get("fp"), c = await this.codes(), all = Object.keys(c).sort();
    if (!fp || !all.length) { await this.ctx.storage.deleteAll(); return; }
    const from = (await this.ctx.storage.get("at")) || "";
    const part = all.filter((k) => k > from).slice(0, BATCH);
    for (const code of part) {
      let still = true;
      try { still = await this.env.KIT.get(this.env.KIT.idFromName(code)).wayIs(fp); } catch (e) { still = true; }   // no answer: kept, asked next time
      if (!still) delete c[code];
    }
    const done = part.length < BATCH || part[part.length - 1] === all[all.length - 1];
    if (!Object.keys(c).length) { await this.ctx.storage.deleteAll(); return; }
    await this.ctx.storage.put({ codes: c, at: done ? "" : part[part.length - 1] });
    await this.ctx.storage.setAlarm(Date.now() + (done ? this.check : Math.min(60e3, this.check)));
  }
}
