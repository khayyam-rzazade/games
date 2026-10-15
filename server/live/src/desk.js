/* Logicers Live: the reports desk (15 Oct 2026). One Durable Object for the whole site, named "desk".

   Anyone can report a game ("Report", on every screen of a game a host made): the EU's Digital Services Act
   asks a host of other people's text for a way to do it (Art. 16), and Logicers reads every report by hand
   on its admin page (live/admin/), where it can stop a game and its copies (kit.js) and write down what it
   decided (the log of reports and decisions).

   What a report keeps, and nothing else: the game's code (and its saved game's code when a live game came
   from one), its title, the time, the reason chosen, the words written, and the name and email address only
   if the sender gave them, and the form's language (to write back in it); then the decision and a note. Nothing about the sender's connection. Reports are
   deleted 180 days after they came: an alarm looks once a day while any report is kept, so a quiet desk
   forgets on time too (not only when the next report comes). */
import { DurableObject } from "cloudflare:workers";

const KEEP = 180 * 86400e3;
const DAY = 86400e3;
const MAX = 50000;                       // reports kept at most; beyond, the oldest closed ones go first
const BATCH = 128;                       // old reports deleted at a time (never all of them read at once)
export const WHYS = ["illegal", "hate", "sexual", "violence", "personal", "copyright", "spam", "wrong", "other"];
export const DECISIONS = ["stopped", "kept", "other"];

function rid() {
  const a = "abcdefghjkmnpqrstuvwxyz23456789", b = new Uint8Array(6);
  crypto.getRandomValues(b);
  let s = "";
  for (const x of b) s += a[x % a.length];
  return s;
}
/* report keys sort by time: "r:" + the time in base 36, nine characters (enough until the year 5188) */
function keyOf(t) { return "r:" + t.toString(36).padStart(9, "0") + "-" + rid(); }

export class Desk extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    /* the checks run the server with TEST_TIMES=fast to see a report forgotten in seconds; never on Cloudflare */
    const fast = env && env.TEST_TIMES === "fast";
    this.keep = fast ? 6000 : KEEP;
    this.every = fast ? 2000 : DAY;
    this.often = fast ? 0 : 3600e3;
  }

  async add(r) {
    const t = Date.now();
    await this.tidy(t);
    const n = (await this.ctx.storage.get("n")) || 0;
    if (n >= MAX && !(await this.makeRoom())) return { ok: false, why: "full" };
    const id = keyOf(t);
    const rec = { id: id.slice(2), at: t, code: r.code, kit: r.kit || "", title: r.title || "", why: r.why, text: r.text,
                  name: r.name || "", email: r.email || "", lang: r.lang || "", state: "new", decision: "", note: "", done: 0 };
    await this.ctx.storage.put({ [id]: rec, n: n + 1 });
    if (!(await this.ctx.storage.getAlarm())) await this.ctx.storage.setAlarm(t + this.every);
    return { ok: true, id: rec.id };
  }

  /* once a day while any report is kept: the old ones go */
  async alarm() {
    const t = Date.now();
    await this.tidy(t, true);
    const left = await this.ctx.storage.list({ prefix: "r:", limit: 1 });
    if (left.size) await this.ctx.storage.setAlarm(t + this.every);
  }

  /* the reports, newest first, 200 at a time (before: the id of the last one seen, for the next 200) */
  async list(before) {
    const o = { prefix: "r:", reverse: true, limit: 200 };
    if (typeof before === "string" && /^[0-9a-z]{9}-[a-z0-9]{6}$/.test(before)) o.end = "r:" + before;
    const out = [];
    for (const v of (await this.ctx.storage.list(o)).values()) out.push(v);
    return out;
  }

  async close(o) {
    if (!o || typeof o.id !== "string" || !/^[0-9a-z]{9}-[a-z0-9]{6}$/.test(o.id)) return { ok: false };
    const k = "r:" + o.id, rec = await this.ctx.storage.get(k);
    if (!rec) return { ok: false };
    rec.state = "done";
    rec.decision = DECISIONS.includes(o.decision) ? o.decision : "other";
    rec.note = typeof o.note === "string" ? o.note.slice(0, 1000) : "";
    rec.done = Date.now();
    await this.ctx.storage.put(k, rec);
    return { ok: true };
  }

  /* reports older than 180 days go (on a new report at most once an hour; at the daily alarm always),
     BATCH at a time, so the desk never reads thousands of reports into memory at once */
  async tidy(t, always) {
    const last = (await this.ctx.storage.get("tidied")) || 0;
    if (!always && t - last < this.often) return;
    const end = "r:" + (t - this.keep).toString(36).padStart(9, "0");
    let gone = 0;
    for (let round = 0; round < 1000; round++) {
      const keys = [...(await this.ctx.storage.list({ prefix: "r:", end, limit: BATCH })).keys()];
      if (!keys.length) break;
      await this.ctx.storage.delete(keys);
      gone += keys.length;
      if (keys.length < BATCH) break;
    }
    const n = (await this.ctx.storage.get("n")) || 0;
    await this.ctx.storage.put({ tidied: t, n: Math.max(0, n - gone) });
  }

  /* full: the oldest closed reports make room, a hundred at a time; open ones are never dropped */
  async makeRoom() {
    const gone = [];
    for (const [k, v] of await this.ctx.storage.list({ prefix: "r:", limit: 2000 })) {
      if (v.state === "done") gone.push(k);
      if (gone.length >= 100) break;
    }
    if (!gone.length) return false;
    await this.ctx.storage.delete(gone);
    const n = (await this.ctx.storage.get("n")) || 0;
    await this.ctx.storage.put("n", Math.max(0, n - gone.length));
    return true;
  }
}
