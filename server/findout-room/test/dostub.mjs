/* A stand-in for Cloudflare's Durable Objects, so the room server's tests run with no internet and no installs.
   Each room code gets one object with its own storage (a map that copies values in and out, as the real storage
   does) and one alarm. forget() drops an object's memory but keeps its storage, the way Cloudflare evicts an idle
   object; runAlarms(now) fires every alarm that is due. */
const clone = (v) => (v === undefined ? undefined : structuredClone(v));

export class Storage {
  constructor() { this.map = new Map(); this.alarm = null; }
  async get(k) { return clone(this.map.get(k)); }
  async put(k, v) { this.map.set(k, clone(v)); }
  async delete(k) { return this.map.delete(k); }
  async deleteAll() { this.map.clear(); }
  async setAlarm(t) { this.alarm = Number(t); }
  async getAlarm() { return this.alarm; }
  async deleteAlarm() { this.alarm = null; }
  dump() { return JSON.stringify([...this.map]); }
}

export class Namespace {
  constructor(Klass, env) { this.Klass = Klass; this.env = env; this.objects = new Map(); this.storages = new Map(); }
  idFromName(name) { return { name: String(name), toString() { return this.name; } }; }
  instance(name) {
    let o = this.objects.get(name);
    if (!o) {
      let st = this.storages.get(name);
      if (!st) { st = new Storage(); this.storages.set(name, st); }
      o = new this.Klass({ storage: st, id: this.idFromName(name), blockConcurrencyWhile: (f) => f() }, this.env);
      this.objects.set(name, o);
    }
    return o;
  }
  get(id) { const o = () => this.instance(id.name); return { fetch: (url, init) => o().fetch(new Request(url, init)) }; }
  forget(name) { this.objects.delete(name); }
  async runAlarms(now) {
    for (const [name, st] of this.storages) if (st.alarm !== null && st.alarm <= now) { st.alarm = null; await this.instance(name).alarm(); }
  }
}
