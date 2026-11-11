/* A stand-in for Cloudflare D1, over Node's own SQLite (node:sqlite), so the tests run with no internet and no installs
   (copied from server/me/test/d1shim.mjs): prepare().bind() with .run(), .all() and .first(), and db.batch([...]),
   which runs its statements inside one transaction, as D1 does. .run() reports meta.changes.
   Review, 11 Nov 2026: a batch returns each SELECT's rows as D1 does ({ results }), and the stand-in counts what the Worker
   asks of it (calls: one per .run/.all/.first and one per batch, as Cloudflare counts queries per request; rows: rows
   handed back; sqls: what was asked), so the tests can hold the Worker to the free plan's 50 calls a request. */
import { DatabaseSync } from "node:sqlite";

class Stmt {
  constructor(owner, sql, args) { this.owner = owner; this.db = owner.db; this.sql = sql; this.args = args || []; }
  bind(...args) { return new Stmt(this.owner, this.sql, args); }
  _p() { return this.db.prepare(this.sql); }
  _run() {
    const r = this._p().run(...this.args);
    return { success: true, meta: { changes: Number(r.changes) } };
  }
  _rows() { return this._p().all(...this.args).map((r) => Object.assign({}, r)); }
  /* in a batch: a SELECT gives its rows back, anything else its changes */
  _exec() {
    if (!/^\s*(SELECT|WITH)\b/i.test(this.sql)) return this._run();
    const rows = this._rows();
    this.owner.rows += rows.length;
    return { success: true, results: rows, meta: {} };
  }
  async run() { this.owner._ask(this); return this._run(); }
  async all() {
    this.owner._ask(this);
    const rows = this._rows();
    this.owner.rows += rows.length;
    return { success: true, results: rows, meta: {} };
  }
  async first() {
    this.owner._ask(this);
    const r = this._p().get(...this.args);
    if (r !== undefined) this.owner.rows += 1;
    return r === undefined ? null : Object.assign({}, r);
  }
}

export class D1 {
  constructor() { this.db = new DatabaseSync(":memory:"); this.reset(); }
  reset() { this.calls = 0; this.rows = 0; this.sqls = []; }
  _ask(s) { this.calls += 1; this.sqls.push(s.sql); }
  prepare(sql) { return new Stmt(this, sql); }
  async batch(stmts) {
    this.calls += 1;
    for (const s of stmts) this.sqls.push(s.sql);
    /* one transaction, run without yielding, so two batches in flight cannot interleave —
       which is also how D1 behaves: a batch is atomic and the database serialises writers */
    this.db.exec("BEGIN");
    const out = [];
    try {
      for (const s of stmts) out.push(s._exec());
      this.db.exec("COMMIT");
    } catch (e) {
      this.db.exec("ROLLBACK");
      throw e;
    }
    return out;
  }
}
