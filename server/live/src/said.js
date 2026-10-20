/* Logicers Live: what players said (19 Oct 2026). One Durable Object for the whole site, named "all".

   When the last of the day's nine games is done, the finish card asks one question, "What surprised you
   today?", with room for one line (up to 140 characters). Khayyam reads every line on his desk (live/admin/)
   and lets it through or not; nothing shows anywhere before he has. The lines he let through show on the
   finish card of the same day, and the next day on the home page as "Yesterday, players said…", each with
   the flag of the country it came from. There are no names, no replies and no accounts: a line, a country, a date.

   What a line keeps, and nothing else: the words, the country and continent of the connection (as the world's
   counts read them), the player's own date, the time it came, and whether it was let through. For the brake
   (three lines from one address a day, and the same line not twice) the address and the date are keyed with
   the server's secret into a name that can't be turned back (worker.js, like the world's counts). A line let
   through is kept a year (Khayyam reads them for his research; the privacy line says so); one turned down
   goes after 7 days, one never looked at after 30. An alarm looks once a day while any line is kept.

   Safety: the words are plain text to every page (the pages build them with textContent, never as HTML); a
   line with a link, a web address, an email or an @handle is refused before it is kept; the control characters
   and the direction overrides are refused too (cleanText, kit.js). */
import { DurableObject } from "cloudflare:workers";

const DAY = 86400e3;
const KEEP_OK = 365 * DAY;               // a line let through
const KEEP_NO = 7 * DAY;                 // a line turned down
const KEEP_NEW = 30 * DAY;               // a line never looked at
const MAX = 20000;                       // lines kept at most; beyond, nothing new is taken until the alarm has tidied
const PER_DAY = 3;                       // lines from one address (its keyed name) on one date
const BATCH = 128;
export const SAID_MAX = 140;             // characters of a line
export const SAID_MIN = 3;
export const SAID_SHOWN = 12;            // lines a page gets for a date at most
export const NAME_MAX = 40;              // characters of the optional name (20 Oct 2026: a full name is allowed, the player types it)
export const ROLE_MAX = 60;              // characters of the optional "I am a…" (a school or a workplace may be in it)

function rid() {
  const a = "abcdefghjkmnpqrstuvwxyz23456789", b = new Uint8Array(6);
  crypto.getRandomValues(b);
  let s = "";
  for (const x of b) s += a[x % a.length];
  return s;
}
/* line keys sort by time: "l:" + the time in base 36, nine characters */
function keyOf(t) { return "l:" + t.toString(36).padStart(9, "0") + "-" + rid(); }
const ID = /^[0-9a-z]{9}-[a-z0-9]{6}$/;
const DATE = /^\d{8}$/;
/* the same line twice (spaces and case aside) counts once */
/* what a page may see of a line let through: the country and the words, and the name and the "I am a…" when the player gave them */
function pub(v) {
  const o = { c: v.c, text: v.text };
  if (v.name) o.name = v.name;
  if (v.role) o.role = v.role;
  return o;
}
function fold(s) { return s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim(); }

export class Said extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    const fast = env && env.TEST_TIMES === "fast";
    this.keepOk = fast ? 12000 : KEEP_OK;
    this.keepNo = fast ? 4000 : KEEP_NO;
    this.keepNew = fast ? 8000 : KEEP_NEW;
    this.every = fast ? 2000 : DAY;
    this.often = fast ? 0 : 3600e3;
  }

  /* a new line: { d (the player's date), c, ct, text, who } -> { ok, id } or { ok: false, why } */
  async add(r) {
    if (!r || !DATE.test(String(r.d)) || typeof r.text !== "string" || typeof r.who !== "string") return { ok: false, why: "bad" };
    const t = Date.now();
    await this.tidy(t);
    const n = (await this.ctx.storage.get("n")) || 0;
    if (n >= MAX) return { ok: false, why: "full" };
    const wk = "w:" + r.d + ":" + r.who;
    const w = (await this.ctx.storage.get(wk)) || { n: 0, f: [] };
    if (w.n >= PER_DAY) return { ok: false, why: "enough" };
    const f = fold(r.text);
    if (w.f.includes(f)) return { ok: false, why: "same" };
    const id = keyOf(t);
    const rec = { id: id.slice(2), at: t, d: r.d, c: r.c || "??", ct: r.ct || "??", text: r.text, state: "new", done: 0 };
    if (typeof r.name === "string" && r.name) rec.name = r.name;
    if (typeof r.role === "string" && r.role) rec.role = r.role;
    w.n++; w.f.push(f);
    await this.ctx.storage.put({ [id]: rec, [wk]: w, n: n + 1 });
    if (!(await this.ctx.storage.getAlarm())) await this.ctx.storage.setAlarm(t + this.every);
    return { ok: true, id: rec.id, left: PER_DAY - w.n };
  }

  /* the lines let through for the player's date d, newest first, at most SAID_SHOWN, as a page may show them:
     [{ c, text }]. A date's lines came within the hours some clock showed that date (dayStart - 14 h to + 36 h),
     so only that stretch of keys is read. */
  async shown(d, from, to) {
    if (!DATE.test(String(d))) return [];
    const out = [];
    const o = { prefix: "l:", reverse: true, limit: 2000, start: "l:" + from.toString(36).padStart(9, "0"), end: "l:" + to.toString(36).padStart(9, "0") + "~" };
    for (const v of (await this.ctx.storage.list(o)).values()) {
      if (v.d === d && v.state === "ok") out.push(pub(v));
      if (out.length >= SAID_SHOWN) break;
    }
    return out;
  }

  /* the latest lines let through, whatever their date (the home page's window, Khayyam 20 Oct 2026: "up to 12
     lines, in general; the 13th pushes out the first and stays on top"): newest let-through first, at most
     SAID_SHOWN, as a page may show them: [{ c, text }]. Looks through the newest 2000 lines kept. */
  async recent() {
    const got = [...(await this.ctx.storage.list({ prefix: "l:", reverse: true, limit: 2000 })).values()]
      .filter((v) => v.state === "ok")
      .sort((x, y) => (y.done || y.at) - (x.done || x.at))
      .slice(0, SAID_SHOWN);
    return got.map(pub);
  }

  /* for the desk: the lines newest first, 200 at a time; state "new" alone when asked */
  async list(o) {
    const q = { prefix: "l:", reverse: true, limit: 200 };
    if (o && typeof o.before === "string" && ID.test(o.before)) q.end = "l:" + o.before;
    const out = [];
    const onlyNew = !!(o && o.onlyNew);
    for (let round = 0; round < 10 && out.length < 200; round++) {
      const got = await this.ctx.storage.list(q);
      if (!got.size) break;
      let last = null;
      for (const [k, v] of got) { last = k; if (!onlyNew || v.state === "new") out.push(v); }
      if (got.size < 200 || !onlyNew) break;
      q.end = last;
    }
    const n = (await this.ctx.storage.get("n")) || 0;
    return { lines: out.slice(0, 200), n, open: await this.openCount() };
  }
  async openCount() {
    let open = 0;
    for (const v of (await this.ctx.storage.list({ prefix: "l:", reverse: true, limit: 1000 })).values()) if (v.state === "new") open++;
    return open;
  }

  /* Khayyam's word: ok (let through) or no */
  async decide(o) {
    if (!o || typeof o.id !== "string" || !ID.test(o.id)) return { ok: false };
    const k = "l:" + o.id, rec = await this.ctx.storage.get(k);
    if (!rec) return { ok: false };
    rec.state = o.ok ? "ok" : "no";
    rec.done = Date.now();
    await this.ctx.storage.put(k, rec);
    return { ok: true, state: rec.state };
  }

  async alarm() {
    const t = Date.now();
    await this.tidy(t, true);
    const left = await this.ctx.storage.list({ prefix: "l:", limit: 1 });
    if (left.size) await this.ctx.storage.setAlarm(t + this.every);
  }

  /* the old lines go: by their state, BATCH at a time, oldest first, and the brake's names with them */
  async tidy(t, always) {
    const last = (await this.ctx.storage.get("tidied")) || 0;
    if (!always && t - last < this.often) return;
    let gone = 0;
    const end = "l:" + (t - Math.min(this.keepNo, this.keepNew)).toString(36).padStart(9, "0");
    let start = "l:";
    for (let round = 0; round < 200; round++) {
      const got = await this.ctx.storage.list({ prefix: "l:", start, end, limit: BATCH });
      if (!got.size) break;
      const del = [];
      for (const [k, v] of got) {
        start = k + "~";                                            // the next stretch begins after this key
        const keep = v.state === "ok" ? this.keepOk : v.state === "no" ? this.keepNo : this.keepNew;
        if (t - v.at > keep) del.push(k);
      }
      if (del.length) { await this.ctx.storage.delete(del); gone += del.length; }
      if (got.size < BATCH) break;
    }
    /* the brake's names: those of dates older than 3 days */
    const wend = "w:" + new Date(t - 3 * DAY).toISOString().slice(0, 10).replace(/-/g, "");
    const wk = [...(await this.ctx.storage.list({ prefix: "w:", end: wend, limit: 1000 })).keys()];
    if (wk.length) await this.ctx.storage.delete(wk);
    const n = (await this.ctx.storage.get("n")) || 0;
    await this.ctx.storage.put({ tidied: t, n: Math.max(0, n - gone) });
  }
}
