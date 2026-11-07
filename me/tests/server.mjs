/* My Logicers tests: a static server for the site folder plus a fake of the Worker `logicers-me` under /__me/ (in memory, one store for every "phone").
   The four scripts of the other chats (me-stats.js, me.js, me-passkey.js, me-doors.js: classic scripts that the page loads with <script> tags) are served
   from ./stubs/ in place of whatever is in assets/js, so the page is tested against the contract and not against the state of the other chats' files.
   ME_REAL=<dir> serves the real me-stats.js, me.js and me-passkey.js from that folder instead (the integration smoke test; the doors stay a stub until
   A3's file is in the folder). */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const SITE_ROOT = process.env.ME_SITE || path.resolve(HERE, '../..');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };
const STUBS = { '/assets/js/me-stats.js': 'stats.js', '/assets/js/me.js': 'me.js', '/assets/js/me-passkey.js': 'passkey.js', '/assets/js/me-doors.js': 'doors.js' };
const REAL = process.env.ME_REAL || '';

/* the integration mode (ME_REAL): the records are A's real ones (plan 3a), /new /restore /sync /delete answer as A's Worker does (the merge is A's own
   me-stats.js merge()), the doors are not kept (A3's file is a stub). */
function realMode() {
  const M = createRequire(import.meta.url)(path.join(REAL, 'me-stats.js'));
  const db = new Map(), log = [], tries = new Map();
  const shown = (r) => Object.assign({}, r.record, { doors: { pw: !!r.pw, rq: !!r.rq }, pk: r.passkey ? 1 : 0 });
  function handle(p, b) {
    log.push({ p, b });
    if (p === '/new') {
      if (db.has(b.code)) return [200, { ok: false, taken: true }];
      const rec = M.clean(b.record); if (!rec) return [400, { ok: false, error: 'record' }];
      if (rec.logicer && [...db.values()].some((r) => r.record.logicer === rec.logicer)) return [200, { ok: false, exists: true }];
      db.set(b.code, { code: b.code, record: rec }); return [200, { ok: true, record: shown(db.get(b.code)) }];
    }
    if (p === '/restore') { const r = db.get(b.code); return r ? [200, { ok: true, record: shown(r) }] : [404, { ok: false, error: 'unknown' }]; }
    if (p === '/sync') {
      const r = db.get(b.code); if (!r) return [404, { ok: false, error: 'unknown' }];
      const inc = M.clean(b.record); if (!inc) return [400, { ok: false, error: 'record' }];
      const box = inc.box || r.record.box; r.record = Object.assign(M.merge(r.record, inc), box ? { box } : {}); return [200, { ok: true, record: shown(r) }];
    }
    if (p === '/delete') { db.delete(b.code); return [200, { ok: true }]; }
    if (p.startsWith('/passkey/')) return [200, { ok: false, error: 'server' }];      // A2's routes are not faked here (its own tests cover them)
    return [404, { ok: false }];
  }
  return { db, log, handle, tries };
}

export function fakeWorker(opts = {}) {
  if (opts.real) return realMode();
  const db = new Map();               // code -> { code, logicer, stats, pw, rq: { ids, answers }, passkey }
  const tries = new Map();            // logicer -> failures this "hour"
  const log = [];                     // every call, for the tests ("the server never saw X")
  const byLogicer = (n) => [...db.values()].find((r) => r.logicer === n);
  const recordOf = (r) => ({ v: 2, logicer: r.logicer, stats: r.stats, doors: { passkey: !!r.passkey, pw: !!r.pw, rq: !!r.rq } });
  const COMMON = ['password', 'password1', '12345678', 'qwertyuiop'];
  function handle(p, b) {
    log.push({ p, b });
    if (p === '/new') {
      if (db.has(b.code)) return [200, { ok: false, taken: true }];
      if (b.record && b.record.logicer != null && byLogicer(b.record.logicer)) return [200, { ok: false, exists: true }];
      db.set(b.code, { code: b.code, logicer: b.record.logicer, stats: b.record.stats }); return [200, { ok: true }];
    }
    if (p === '/restore') { const r = db.get(b.code); return r ? [200, { ok: true, record: recordOf(r) }] : [404, { ok: false }]; }
    if (p === '/delete') { db.delete(b.code); return [200, { ok: true }]; }
    if (p === '/seed') { db.set(b.code, { code: b.code, logicer: b.logicer, stats: b.stats, pw: b.pw || null, rq: b.rq || null, passkey: !!b.passkey }); return [200, { ok: true }]; }
    if (p === '/door/set') {
      const r = db.get(b.code); if (!r) return [404, { ok: false }];
      const state = () => ({ pw: !!r.pw, rq: !!r.rq });
      if (b.remove) { r[b.kind] = null; return [200, Object.assign({ ok: true }, state())]; }
      if (b.kind === 'pw') { const v = String(b.value || ''); if (v.length < 8) return [200, { ok: false, reason: 'short' }]; if (COMMON.includes(v.toLowerCase())) return [200, { ok: false, reason: 'common' }]; r.pw = v; }
      else r.rq = { ids: b.value.map((x) => x.id), answers: b.value.map((x) => x.answer) };
      return [200, Object.assign({ ok: true }, state())];
    }
    if (p === '/door/which') { const r = byLogicer(b.logicer); return [200, { ok: true, pw: !!(r && r.pw), rq: r && r.rq ? r.rq.ids : null }]; }
    if (p === '/door/password' || p === '/door/questions') {
      const r = byLogicer(b.logicer); const used = tries.get(b.logicer) || 0;
      if (used >= 3) return [429, { ok: false }];
      const ok = r && (p === '/door/password' ? r.pw && r.pw === b.value : r.rq && JSON.stringify(r.rq.answers) === JSON.stringify(b.value.map((x) => x.answer)));
      if (!ok) { tries.set(b.logicer, used + 1); return [403, { ok: false, left: 3 - used - 1 }]; }
      return [200, { ok: true, code: r.code, record: recordOf(r) }];
    }
    if (p === '/passkey/register') { const r = db.get(b.code); if (!r) return [404, { ok: false }]; r.passkey = true; return [200, { ok: true }]; }
    if (p === '/passkey/login') { const r = [...db.values()].find((x) => x.passkey); return r ? [200, { ok: true, code: r.code, record: recordOf(r) }] : [404, { ok: false }]; }
    return [404, { ok: false }];
  }
  return { db, log, handle, tries };
}

export function start(port = 4190, opts = {}) {
  const worker = fakeWorker(opts);
  const server = http.createServer((req, res) => {
    const u = new URL(req.url, 'http://x'); let p = decodeURIComponent(u.pathname);
    if (p.startsWith('/__me/')) {
      let body = ''; req.on('data', (d) => { body += d; });
      req.on('end', () => { let b = {}; try { b = JSON.parse(body || '{}'); } catch (e) { /* empty */ } const [st, j] = worker.handle(p.slice(5), b); res.writeHead(st, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(j)); });
      return;
    }
    let f = path.join(SITE_ROOT, p);
    if (REAL && /^\/me\/words\/[a-z]{2}\.json$/.test(p)) {                                                     // A's six code word lists
      fs.readFile(path.join(REAL, '../../me/words', path.basename(p)), (err, data) => { if (err) { res.writeHead(404); return res.end('not found'); } res.writeHead(200, { 'Content-Type': MIME['.json'], 'Cache-Control': 'no-store' }); res.end(data); });
      return;
    }
    if (p === '/me/year/open.js') {                                                                              // C's file: the real one in ME_REAL mode, else nothing (the tests' stub is in charge)
      const realYear = REAL ? path.join(REAL, '../../me/year/open.js') : '';
      const body = realYear && fs.existsSync(realYear) ? fs.readFileSync(realYear) : '/* the tests use stubs/year.js */';
      res.writeHead(200, { 'Content-Type': MIME['.js'], 'Cache-Control': 'no-store' }); return res.end(body);
    }
    if (STUBS[p]) {
      const real = REAL && p !== '/assets/js/me-doors.js' ? path.join(REAL, path.basename(p)) : '';
      f = real && fs.existsSync(real) ? real : path.join(HERE, 'stubs', STUBS[p]);
      fs.readFile(f, (err, data) => { if (err) { res.writeHead(404); return res.end('not found'); } res.writeHead(200, { 'Content-Type': MIME['.js'], 'Cache-Control': 'no-store' }); res.end(data); });
      return;
    }
    if (!f.startsWith(SITE_ROOT)) { res.writeHead(403); return res.end(); }
    try { if (fs.statSync(f).isDirectory()) f = path.join(f, 'index.html'); } catch (e) { /* 404 below */ }
    fs.readFile(f, (err, data) => {
      if (err) { res.writeHead(404); return res.end('not found'); }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(data);
    });
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve({ server, worker, url: 'http://127.0.0.1:' + port, close: () => new Promise((r) => server.close(r)) })));
}
