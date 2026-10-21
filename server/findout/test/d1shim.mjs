/* A stand-in for Cloudflare D1, over Node's own SQLite (node:sqlite), so the server's tests run
   with no internet and no installs. It gives worker.js exactly the calls it uses: prepare().bind()
   with .run(), .all() and .first(), and db.batch([...]) — batch runs its statements inside one
   transaction, as D1 does. .run() reports meta.changes, which send() reads to count what was taken. */
import { DatabaseSync } from "node:sqlite";

class Stmt {
  constructor(db, sql, args) { this.db = db; this.sql = sql; this.args = args || []; }
  bind(...args) { return new Stmt(this.db, this.sql, args); }
  _p() { return this.db.prepare(this.sql); }
  _run() {
    const r = this._p().run(...this.args);
    return { success: true, meta: { changes: Number(r.changes) } };
  }
  async run() { return this._run(); }
  async all() {
    const rows = this._p().all(...this.args).map((r) => Object.assign({}, r));
    return { success: true, results: rows, meta: {} };
  }
  async first() {
    const r = this._p().get(...this.args);
    return r === undefined ? null : Object.assign({}, r);
  }
}

export class D1 {
  constructor() { this.db = new DatabaseSync(":memory:"); }
  prepare(sql) { return new Stmt(this.db, sql); }
  async batch(stmts) {
    /* one transaction, run without yielding, so two batches in flight cannot interleave —
       which is also how D1 behaves: a batch is atomic and the database serialises writers */
    this.db.exec("BEGIN");
    const out = [];
    try {
      for (const s of stmts) out.push(s._run());
      this.db.exec("COMMIT");
    } catch (e) {
      this.db.exec("ROLLBACK");
      throw e;
    }
    return out;
  }
}
