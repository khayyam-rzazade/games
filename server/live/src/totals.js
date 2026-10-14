/* Logicers Live: the totals, without names (14 Oct 2026). One Durable Object for the whole site.

   What it keeps, and nothing else: how many games were made and how many started each day, how many
   rounds were played and by how many players, and for each of Logicers' questions how often small,
   medium and big nets caught the answer. No name, no code, no address: these are the numbers that tune
   the sets. Days older than a year are dropped.
   It counts and never refuses: a cap on the games made in a day would be a switch anyone could trip
   with a script, closing Live for everyone until midnight. The Worker brakes each address instead. */
import { DurableObject } from "cloudflare:workers";

function day(t) { return new Date(t || Date.now()).toISOString().slice(0, 10).replace(/-/g, ""); }
function blank() { return { made: 0, started: 0, rounds: 0, players: 0 }; }

export class Totals extends DurableObject {
  /* one more game made today */
  async made() {
    const k = "d:" + day();
    const d = Object.assign(blank(), await this.ctx.storage.get(k));
    d.made++;
    await this.ctx.storage.put(k, d);
    if (d.made === 1) await this.tidy();
    return true;
  }

  /* one more game started today: its host pressed Start (made but never started is a script, or a try) */
  async started() {
    const k = "d:" + day();
    const d = Object.assign(blank(), await this.ctx.storage.get(k));
    d.started++;
    await this.ctx.storage.put(k, d);
    return true;
  }

  /* a round finished: { set, by: [{ id, t: { s: [caught, tried], m: [...], b: [...] } }], players } */
  async round(o) {
    if (!o || typeof o.set !== "string" || !Array.isArray(o.by) || o.by.length > 20) return false;
    const k = "d:" + day();
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
