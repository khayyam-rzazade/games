/* Check-in: the two small servers the tests use (chat C, 4 Nov 2026).
   - realApi(): chat B's real Worker (server/checkin/src/worker.js) run in Node over its own test stand-ins for D1 (node:sqlite) and
     Durable Objects, behind a plain http server. The pages are tested against the server's own code: its checks, its release rule,
     its error names. The folder of server/checkin comes from CK_SERVER, or ../../server/checkin when this folder sits in the repo.
     Test hooks (not part of the server): /__log /__reset /__config /__uploads /__fill /__seed.
   - staticServer(): serves the games folder (or the test copy of it) so the pages load with their real relative paths.
   Node 22 (node:sqlite), no packages. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SERVER = process.env.CK_SERVER || path.resolve(HERE, '../../server/checkin');
const MINDS = ['money', 'work_or_studies', 'health', 'people', 'future', 'country', 'nothing'];
const WHY = ['y_load', 'y_control', 'y_support', 'y_recog', 'y_meaning', 'y_future'];

function rnd(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
/* one phone's answers on the server's scales (items.js). lean -2 … +2 pushes the answers up (better, except the two reversed items);
   weigh: an item id forced to its worst end. */
export function fakeAnswers(r, o = {}) {
  const pick = (a, b) => a + Math.floor(r() * (b - a + 1));
  const lean = o.lean ?? 0;
  const bias = (lo, hi, k = 1) => Math.max(lo, Math.min(hi, pick(lo, hi) + Math.round(lean * k)));
  const a = { role: ['student', 'working', 'neither'][pick(0, 2)] };
  /* the server's codes (items.js): WHO-5 0-5 up is better; stress 1-5 up is worse; the why items 1-5 as the position shown, where 1 lifts
     except y_load and y_future (1 weighs); sleep 1-5; agree 1-5 (1 = agree strongly lifts); left out 1-3 (up is worse); ladder 1-10 */
  for (const id of ['w1', 'w2', 'w3', 'w4', 'w5']) a[id] = bias(0, 5);
  a.st = bias(1, 5, -1);
  for (const id of WHY) { const weighsLow = id === 'y_load' || id === 'y_future'; a[id] = o.weigh === id ? (weighsLow ? 1 : 5) : bias(1, 5, weighsLow ? 1 : -1); }
  a.sleep = pick(2, 5); a.mind = MINDS[pick(0, 6)];
  for (const id of ['p_say', 'p_deserve', 'p_better']) a[id] = bias(1, 5, -1);
  a.p_leftout = pick(1, 3); a.ladder = bias(1, 10);
  return a;
}
const hex32 = (r) => { let k = ''; for (let i = 0; i < 32; i++) k += '0123456789abcdef'[Math.floor(r() * 16)]; return k; };

export async function realApi(port, opts = {}) {
  const siteBase = opts.siteBase || 'http://127.0.0.1:4180';
  const load = (f) => import(pathToFileURL(path.join(SERVER, f)).href);
  let mod, Namespace, D1;
  try { mod = await load('src/worker.js'); ({ Namespace } = await load('test/dostub.mjs')); ({ D1 } = await load('test/d1shim.mjs')); }
  catch (e) { throw new Error('The Check-in server was not found at ' + SERVER + ' (set CK_SERVER to the server/checkin folder): ' + e.message); }
  const { default: worker, Room, LIMITS, _test } = mod;
  for (const k of Object.keys(LIMITS)) LIMITS[k] = 1e9;                      /* one test address makes thousands of calls */
  const S = { env: null, log: [], cfg: { country: 'IT', delayMs: 0, failNext: 0 } };
  const fresh = () => {
    const e = { ALLOW_ORIGINS: 'https://logicers.com localhost', JOIN_URL: siteBase + '/checkin/room/#{code}', HOST_URL: siteBase + '/checkin/host/#{key}', DB: new D1() };
    e.ROOM = new Namespace(Room, e); S.env = e;
  };
  fresh();
  const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS' };
  const sendJson = (res, status, body) => { res.writeHead(status, Object.assign({ 'Content-Type': 'application/json' }, CORS)); res.end(JSON.stringify(body)); };
  /* a call straight into the Worker, as a phone would make it (headers: the country the test says it is in) */
  async function call(method, p, body, country) {
    const headers = { Origin: siteBase, 'CF-Connecting-IP': '203.0.113.9' };
    const c = country === undefined ? S.cfg.country : country; if (c) headers['CF-IPCountry'] = c;
    const init = { method, headers };
    if (body !== undefined) { headers['Content-Type'] = 'application/json'; init.body = JSON.stringify(body); }
    const res = await worker.fetch(new Request('https://checkin.test' + p, init), S.env, {});
    const text = await res.text(); let json = null; try { json = JSON.parse(text); } catch (e) { /* not json */ }
    return { status: res.status, headers: res.headers, text, json };
  }
  const rows = async (sql, ...a) => (await S.env.DB.prepare(sql).bind(...a).all()).results;

  async function handle(req, res) {
    const url = new URL(req.url, 'http://x'), p = url.pathname;
    if (req.method === 'OPTIONS') { res.writeHead(204, CORS); return res.end(); }
    const chunks = []; for await (const c of req) chunks.push(c);
    const raw = Buffer.concat(chunks).toString();
    let body; if (raw) { try { body = JSON.parse(raw); } catch (e) { body = undefined; } }
    const hook = p.startsWith('/__');
    if (!hook) S.log.push({ t: Date.now(), method: req.method, path: p, body: body === undefined ? null : body });
    if (!hook && S.cfg.delayMs) await new Promise((r) => setTimeout(r, S.cfg.delayMs));
    if (!hook && S.cfg.failNext > 0) { S.cfg.failNext--; return sendJson(res, 503, { ok: false, error: 'busy' }); }

    /* ---- test hooks ---- */
    if (p === '/__log') return sendJson(res, 200, { ok: true, log: S.log });
    if (p === '/__reset') { fresh(); _test.memo.clear(); S.log.length = 0; return sendJson(res, 200, { ok: true }); }
    if (p === '/__config') { Object.assign(S.cfg, body || {}); return sendJson(res, 200, { ok: true, cfg: S.cfg }); }
    if (p === '/__uploads') {
      const pending = await rows('SELECT id, code, room, round, lang, item_version, status, answers FROM pending ORDER BY made');
      const kept = await rows('SELECT * FROM checkins ORDER BY rid');
      const counters = await rows('SELECT event, SUM(n) AS n FROM counters GROUP BY event');
      return sendJson(res, 200, { ok: true, pending, kept, counters: Object.fromEntries(counters.map((c) => [c.event, Number(c.n)])) });
    }
    if (p === '/__fill' && body) {
      /* n fake phones join this room and answer its open round; sides: half and half; a seed makes it repeatable */
      const g = await call('GET', '/room/' + body.code); if (!g.json || !g.json.ok) return sendJson(res, 404, g.json || { ok: false });
      const st = g.json.state, r = rnd(body.seed || 7); let n = 0;
      for (let i = 0; i < body.n; i++) {
        const key = hex32(r); await call('POST', `/room/${body.code}/join`, { key });
        const d = { key, round: st.round, a: fakeAnswers(r, { lean: body.lean ?? 0, weigh: body.weigh }) };
        if (body.sides) d.side = i % 2;
        const x = await call('POST', `/room/${body.code}/done`, d); if (x.json && x.json.ok) n++;
      }
      return sendJson(res, 200, { ok: true, added: n, state: (await call('GET', '/room/' + body.code)).json.state });
    }
    if (p === '/__seed' && body) {
      /* n check-ins from one country go into the world's numbers (the means show from 30) */
      const r = rnd(body.seed || 3);
      for (let i = 0; i < body.n; i++) await call('POST', '/solo', { a: fakeAnswers(r, { lean: body.lean ?? 0 }), lang: 'en' }, body.country || S.cfg.country);
      _test.memo.clear();                                                      /* the server keeps the world's means a minute: not in a test */
      return sendJson(res, 200, { ok: true });
    }

    /* ---- the server itself ---- */
    const r = await call(req.method, p + url.search, req.method === 'POST' ? (body === undefined ? {} : body) : undefined);
    res.writeHead(r.status, Object.assign({ 'Content-Type': r.headers.get('Content-Type') || 'application/json' }, CORS));
    res.end(r.text);
  }
  const server = http.createServer((req, res) => { handle(req, res).catch((e) => { try { sendJson(res, 500, { ok: false, error: String(e && e.message) }); } catch (e2) { /* gone */ } }); });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve({ server, state: S, url: `http://127.0.0.1:${port}`, close: () => new Promise((r2) => server.close(r2)) })));
}

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };
export function staticServer(port, root) {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let f = path.join(root, p);
    if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
    try { if (fs.statSync(f).isDirectory()) f = path.join(f, 'index.html'); } catch (e) { /* 404 below */ }
    fs.readFile(f, (err, data) => {
      if (err) { res.writeHead(404); return res.end('not found'); }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(data);
    });
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve({ server, url: `http://127.0.0.1:${port}`, close: () => new Promise((r) => server.close(r)) })));
}
