/* Logicers Live: the server of the live games (14 Oct 2026; games that hosts make and save, 15 Oct 2026).
   A Cloudflare Worker named logicers-live, with one Durable Object per live game (game.js), one per saved
   game (kit.js), one for the reports (desk.js), one for the totals without names (totals.js), one per email
   of a way back (way.js), one for the list of feedback emails (mail.js), and since 16 Oct 2026 one per date
   for the world's counts of the daily games (tally.js), which have nothing to do with live games but ride
   on this Worker because it deploys by itself from the repository.
   It is separate from Rooms (server/rooms), and deploys by itself: Workers Builds watches
   server/live/ in the repository, so a push that touches this folder deploys it and any other push
   does not. A deploy disconnects every live game for a moment (the phones come back by themselves),
   so it is best not pushed on a quiz evening.

   What a call can be:
     POST /new              a live game: { v, settings } with one of Logicers' sets, or { v, kit, edit, settings }
                            with a saved game -> { code, key, pass }. The key is the host's secret: the page keeps
                            it in its own storage, never in the address.
     GET  /game/CODE        is there a live game with this code? -> { title, np, ph, closed, teams, picked, ... }
     GET  /ws/CODE          a WebSocket into the game (host or player)
     POST /kit              save a new game -> { code, edit, copy, until }
     POST /kit/CODE         save changes { v, edit, kit }
     POST /kit/CODE/open    { edit } -> the whole game, for its maker
     POST /kit/CODE/copy    { copy } -> the game, for someone starting their own copy
     POST /kit/CODE/delete  { edit }
     GET  /kit/CODE         what a player's page may know from a saved game's code (never an answer)
     GET  /kit/CODE/play    the questions without their answers, to play it alone
     POST /kit/CODE/play    { v, key, name, ans } all the answers of a play alone, at its end -> the score
     POST /kit/CODE/me      { key } a player coming back: their line of the scoreboard
     POST /kit/CODE/results { edit } the maker's results: every play, the typed answers to check
     POST /kit/CODE/grade   { edit, id, ok } the typed answers the maker ticks for one question
     POST /kit/CODE/way     { edit, mp, mail } the maker's way back: mp is the browser's fingerprint of an email
                            (64 hex characters), or null to remove it (kit.js, way.js); mail, only when the maker
                            ticks "Email me for feedback", is that very address, checked against mp (mail.js)
     POST /kit/CODE/mail    { edit } "Stop": the maker's address off the list of feedback emails at once (from
                            a game it was ticked in; the answer is the same either way)
     POST /report           a report about a game (the EU's Digital Services Act, Art. 16)
     POST /admin            Logicers' own desk: reports, games, stop and start, and a lost edit link: the
                            games whose way back is an email (by its fingerprint), and a new edit key for one
                            of them; the list of feedback emails, and an address taken off it (the secret
                            ADMIN_KEY)
     POST /totals           the totals without names (ADMIN_KEY)
     POST /stats/send       the world's counts (16 Oct 2026): a phone's finished daily games of its date, added
     POST /stats/view       to its country's row (tally.js, one object per date), and one game's counts, or the
     POST /stats/world      world table of a day or a month (the section "the world's counts" below)
     POST /push/join        the daily reminder (18 Oct 2026, push.js): a phone says yes, or that it is still here
     POST /push/leave       { v, ep } the phone says no: its row is deleted at once
     POST /push/msg         { v, ep } the words of today's push, asked by the phone's service worker (sw.js)
     POST /push/admin       { key, op: "stats" | "ann", text, days } the numbers, and Khayyam's announcement (ADMIN_KEY)
   The code stands in the path, never a key; Workers Logs are switched off (wrangler.jsonc), so no call
   is written down anywhere. The full contract: r/live-workshop/step2-spec.md.

   Only logicers.com may call it from a browser (and, for the checks, the addresses in the variable
   EXTRA_ORIGINS), and only with the page's own kinds of call (fetch and WebSocket): an <img> or a link
   on another site is refused, and counts for nothing.
   The brake on guessing codes counts, per address and per 10 minutes, the DIFFERENT codes that do not
   exist, live or saved; at 100 the answer is "later". An address is an IPv4 address, or an IPv6 /64 (one
   home or phone is given a whole /64, and could otherwise change address at every try). Typos never trigger
   it, and a phone that has joined a game carries a pass for it (game.js), so it always comes back, even when
   someone's sweep has braked the whole campus; a maker with the edit key, or a copy link, gets through too.
   One address may also make 30 live games and save 20 new games (5 MB of them) per 10 minutes, set a way
   back 30 times, send 10 reports, and try 10 wrong admin keys. And per day: 4 MB of new disk for saved games (a tenth of the whole
   site's daily budget, totals.js, so one address can never close saving for everyone), 4,000 plays alone
   kept (after that its plays are still scored, and kept nowhere; a play that is not kept, practice or a refused
   name, costs nothing of the day), and 20 addresses ticked onto the list of feedback emails (one game's own tick
   again costs nothing; past 20 the way back is still set, without the tick). The counts live in this running copy's
   memory: the address is read, never stored. Every body is read with a cap, so nobody can make the server
   swallow a huge upload. */
import { Game, PROTO, passFor, cleanSettings } from "./game.js";
import { Totals } from "./totals.js";
import { Kit, cleanText } from "./kit.js";
import { Desk, WHYS } from "./desk.js";
import { Way } from "./way.js";
import { Mail } from "./mail.js";
import { Tally } from "./tally.js";
import { Push, SHARDS, endpointOk, dateOk, lineOk } from "./push.js";
import "./wayprint.js";               // the browser's own file (live/wayprint.js), byte for byte: globalThis.LogicersWay
import "./points.js";                 // the pages' own file (assets/js/points.js), byte for byte: globalThis.LogicersPoints
import { loadSets } from "./sets-key.js";
import { codeOk, newCode, kitCodeOk, newKitCode } from "./names.js";
import { mac, sha, same, randomKey, keyOk } from "./keys.js";

export { Game, Totals, Kit, Desk, Way, Mail, Tally, Push };

const ORIGINS = ["https://logicers.com", "https://www.logicers.com"];
const MODES = ["cors", "websocket", "same-origin"];   // Sec-Fetch-Mode of the page's own fetches and WebSockets
const WINDOW = 600e3;               // every brake counts over 10 minutes
const MISSES = 100;                 // different wrong codes from one address in 10 minutes
const MADE = 30;                    // live games made from one address in 10 minutes (a campus has many hosts)
const SAVES = 20;                   // new saved games from one address in 10 minutes
const SAVE_BYTES = 5e6;             // ...and the bytes of new and changed saved games
const PLAYS = 300;                  // plays alone sent from one address in 10 minutes (a whole school can sit behind one)
const DAY_WINDOW = 86400e3;         // the daily counts below
const GROW_DAY = 4e6;               // new disk for saved games from one address in a day (the site's budget is 40 MB)
const PLAYS_DAY = 4000;             // plays alone KEPT from one address in a day; more are scored, and kept nowhere
/* the checks run the server with TEST_TIMES=fast: a "day" of 20 seconds, 300 KB and 30 plays (never on Cloudflare) */
const fastOf = (env) => !!(env && env.TEST_TIMES === "fast");
const dayWin = (env) => (fastOf(env) ? 20000 : DAY_WINDOW);
const growDay = (env) => (fastOf(env) ? 300e3 : GROW_DAY);
const playsDay = (env) => (fastOf(env) ? 30 : PLAYS_DAY);
const REPORTS = 10;                 // reports from one address in 10 minutes
const WAYS = 30;                    // ways back set, changed or removed from one address in 10 minutes
const TICKS_DAY = 20;               // feedback emails ticked from one address in a day (new ones on the list for a game)
const WRONG_ADMIN = 10;             // wrong admin keys from one address in 10 minutes
const REMEMBER = 20000;             // addresses kept in memory at most; beyond, the oldest are forgotten
const FORGET = 2000;                // ...this many at a time, so a sweep across addresses never wipes them all
const SMALL = 8000;                 // the largest body of an ordinary call
const KIT_BODY = 600000;            // the largest saved game a page may send: 100 long questions in any script

const misses = new Map();           // address -> { from, codes: Set }
const counts = { made: new Map(), saves: new Map(), bytes: new Map(), plays: new Map(), reports: new Map(), admin: new Map(),
                 grown: new Map(), kept: new Map(), ways: new Map(), ticks: new Map() };
const PLAY_BODY = 40000;            // a play alone: up to 100 answers

/* The address a call counts against: IPv4 as it is; IPv6 cut to its first four groups (the /64). */
function where(req) {
  let ip = String(req.headers.get("CF-Connecting-IP") || "?").trim().toLowerCase().slice(0, 64);
  if (ip.indexOf(":") < 0) return ip;
  const v4 = /(\d{1,3}(?:\.\d{1,3}){3})$/.exec(ip);
  if (v4 && /^::(ffff:)?[\d.]+$/.test(ip)) return v4[1];       // an IPv4 address written as IPv6
  ip = ip.replace(/%.*$/, "");
  const parts = ip.split("::");
  const head = parts[0] ? parts[0].split(":") : [];
  const tail = parts.length > 1 && parts[1] ? parts[1].split(":") : [];
  const all = parts.length > 1 ? head.concat(new Array(Math.max(0, 8 - head.length - tail.length)).fill("0"), tail) : head;
  return all.slice(0, 4).map((g) => g.replace(/^0+(?=.)/, "")).join(":") + "::/64";
}
/* a Map keeps the order its keys were put in: the first ones are the oldest */
function trim(map) {
  if (map.size <= REMEMBER) return;
  let n = FORGET;
  for (const k of map.keys()) { map.delete(k); if (--n <= 0) break; }
}
function braked(req) {
  const m = misses.get(where(req));
  return !!m && Date.now() - m.from <= WINDOW && m.codes.size >= MISSES;
}
function miss(req, code) {
  const p = where(req), t = Date.now();
  let m = misses.get(p);
  if (!m || t - m.from > WINDOW) {
    misses.delete(p);                 // put back at the end, as the newest
    m = { from: t, codes: new Set() };
    misses.set(p, m);
    trim(misses);
  }
  if (m.codes.size < MISSES + 5) m.codes.add(code);
}
/* one more of something from this address in the window: true while it is within max */
function allowed(map, req, max, by, win) {
  const p = where(req), t = Date.now();
  let m = map.get(p);
  if (!m || t - m.from > (win || WINDOW)) {
    map.delete(p);
    m = { from: t, n: 0 };
    map.set(p, m);
    trim(map);
  }
  if (m.n + (by || 1) > max) return false;
  m.n += by || 1;
  return true;
}
/* a call that turned out wrong gives back what it was counted for (a game that is not right is not a save) */
function giveBack(map, req, by) {
  const m = map.get(where(req));
  if (m) m.n = Math.max(0, m.n - (by || 1));
}
function spentOut(map, req, max, win) {
  const m = map.get(where(req));
  return !!m && Date.now() - m.from <= (win || WINDOW) && m.n >= max;
}
/* counted after the fact (the bytes a save really added): may pass max, so the next call is refused */
function count(map, req, by, win) {
  const p = where(req), t = Date.now();
  let m = map.get(p);
  if (!m || t - m.from > win) {
    map.delete(p);
    m = { from: t, n: 0 };
    map.set(p, m);
    trim(map);
  }
  m.n += Math.max(0, by || 0);
}

/* The pass a reconnecting page offers among its WebSocket sub-protocols: "lv1, p.<pass>". */
async function passed(req, env, code) {
  const offer = String(req.headers.get("Sec-WebSocket-Protocol") || "").split(",").map((s) => s.trim());
  const p = offer.find((s) => s.startsWith("p."));
  if (!p || p.length !== 24) return false;
  let right = "";
  try { right = await passFor(env, code); } catch (e) { return false; }
  return !!right && same(p.slice(2), right);
}

function originOf(req, env) {
  const o = req.headers.get("Origin");
  if (!o) return { ok: true, allow: null };                       // not a browser: nothing to protect
  const extra = String((env && env.EXTRA_ORIGINS) || "").split(/\s+/).filter(Boolean);
  const ok = ORIGINS.includes(o) || extra.includes(o);
  return { ok, allow: ok ? o : null };
}
function answer(status, body, o) {
  const h = { "Content-Type": "application/json", "Cache-Control": "no-store" };
  if (o && o.allow) { h["Access-Control-Allow-Origin"] = o.allow; h["Vary"] = "Origin"; }
  return new Response(JSON.stringify(body), { status, headers: h });
}

/* A body read with a cap: the declared length first, then the bytes as they come (a chunked upload has no
   declared length), stopping as soon as there are too many. -> { body, n (its bytes) } or { e: "big" | "bad" } */
async function readJson(req, max) {
  if (+(req.headers.get("Content-Length") || 0) > max) return { e: "big" };
  if (!req.body) return { e: "bad" };
  const reader = req.body.getReader(), parts = [];
  let n = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    n += value.byteLength;
    if (n > max) { try { await reader.cancel(); } catch (e) { /* gone */ } return { e: "big" }; }
    parts.push(value);
  }
  const all = new Uint8Array(n);
  let off = 0;
  for (const p of parts) { all.set(p, off); off += p.byteLength; }
  try {
    const body = JSON.parse(new TextDecoder().decode(all));
    return body && typeof body === "object" && !Array.isArray(body) ? { body, n } : { e: "bad" };
  } catch (e) { return { e: "bad" }; }
}
function refused(r, o) { return answer(r.e === "big" ? 413 : 400, { e: r.e }, o); }

const gameOf = (env, code) => env.GAME.get(env.GAME.idFromName(code));
const kitOf = (env, code) => env.KIT.get(env.KIT.idFromName(code));
const totalsOf = (env) => env.TOTALS.get(env.TOTALS.idFromName("all"));
const deskOf = (env) => env.DESK.get(env.DESK.idFromName("desk"));
const wayOf = (env, fp) => env.WAY.get(env.WAY.idFromName(fp));
/* the browser's fingerprint of an email (live/wayprint.js): 64 hex characters; the server keeps an HMAC of it */
const MP = /^[0-9a-f]{64}$/;
const wayFp = (env, mp) => mac(env, "way:" + mp);
const mailOf = (env) => env.MAIL.get(env.MAIL.idFromName("list"));
const WAYPRINT = globalThis.LogicersWay;
/* "Email me for feedback": the address itself, which must be the very address of the fingerprint sent with it
   (folded and hashed here by the browser's own file), tidied as it will be kept -> the address, or "" */
async function mailFor(mail, mp) {
  if (typeof mail !== "string" || mail.length > 320 || typeof mp !== "string" || !MP.test(mp)) return "";
  const t = WAYPRINT.tidy(mail);
  if (!t || t.length > 254 || !WAYPRINT.ok(t)) return "";
  return (await WAYPRINT.print(t)) === mp ? t : "";
}
/* whether feedback emails are on for a game: true, false, or null when the list did not answer (the editor then
   keeps its Stop at hand) */
const tri = (v) => (v === true ? true : v === false ? false : null);

/* ------------------------------------------------------------ live games */

async function make(req, env, o) {
  if (!allowed(counts.made, req, MADE)) return answer(429, { e: "later" }, o);
  const r = await readJson(req, SMALL);
  if (r.e) return refused(r, o);
  const body = r.body;
  if (body.v !== PROTO) return answer(409, { e: "old", v: PROTO }, o);
  let settings, kit = null;
  if (body.kit !== undefined) {
    /* a saved game: its maker's edit key opens it, and the live game gets a copy of its questions */
    const kc = typeof body.kit === "string" ? body.kit.toUpperCase() : "";
    const later = () => answer(429, { e: "later" }, o);
    if (!kitCodeOk(kc) || !keyOk(body.edit)) { miss(req, kc || "?"); return braked(req) ? later() : answer(404, { e: "nogame" }, o); }
    const s = await kitOf(env, kc).snap({ edit: body.edit });
    if (!s.ok) {
      /* a braked address learns nothing: a wrong key and a missing game both say "later" */
      if (s.why === "nogame") { miss(req, kc); return braked(req) ? later() : answer(404, { e: "nogame" }, o); }
      if (s.why === "edit") return braked(req) ? later() : answer(403, { e: "edit" }, o);
      return answer(409, { e: "stopped" }, o);
    }
    kit = Object.assign({ code: kc }, s.kit);
    settings = body.settings && typeof body.settings === "object" ? body.settings : s.st;
  } else {
    let sets;
    try { sets = await loadSets(env); } catch (e) { return answer(503, { e: "sets" }, o); }
    if (!cleanSettings(body.settings, sets)) return answer(400, { e: "set" }, o);
    settings = body.settings;
  }
  const key = randomKey(24), hostHash = await sha(key);
  for (let i = 0; i < 8; i++) {
    const code = newCode();
    const r2 = await gameOf(env, code).create({ code, hostHash, settings, kit });
    if (r2 && r2.ok) {
      /* counted for the totals, never refused there: a daily cap is a switch anyone could trip */
      try { await totalsOf(env).made(); } catch (e) { /* the totals are never worth a game */ }
      if (kit) { try { await kitOf(env, kit.code).hosted(code); } catch (e) { /* only Logicers' stop needs it */ } }
      /* the game's pass comes with it: a host on a campus someone has braked still gets into their own game */
      let pass = "";
      try { pass = await passFor(env, code); } catch (e) { /* the host's screen gets it with its first state */ }
      return answer(200, { code, key, pass }, o);
    }
    if (r2 && r2.why !== "taken") return answer(r2.why === "sets" ? 503 : 400, { e: r2.why }, o);
  }
  return answer(503, { e: "busy" }, o);
}

/* a peek carries no pass: it is how a code is guessed, so it is always braked */
async function peek(req, env, code, o) {
  if (braked(req)) return answer(429, { e: "later" }, o);
  if (!codeOk(code)) { miss(req, code); return answer(404, { e: "nogame" }, o); }
  const info = await gameOf(env, code).peek();
  if (!info) { miss(req, code); return answer(404, { e: "nogame" }, o); }
  return answer(200, info, o);
}

async function connect(req, env, code, o) {
  if (req.headers.get("Upgrade") !== "websocket") return answer(426, { e: "websocket" }, o);
  const pass = codeOk(code) && (await passed(req, env, code));
  if (!pass && braked(req)) return answer(429, { e: "later" }, o);
  if (!codeOk(code)) { miss(req, code); return answer(404, { e: "nogame" }, o); }
  const res = await gameOf(env, code).fetch(req);
  if (res.status === 404 && !pass) miss(req, code);
  return res;
}

/* ------------------------------------------------------------ saved games */

/* a new saved game, maybe begun as a copy of another (from: { code, copy }) */
async function kitNew(req, env, o) {
  if (spentOut(counts.saves, req, SAVES) || spentOut(counts.grown, req, growDay(env), dayWin(env))) return answer(429, { e: "later" }, o);
  const r = await readJson(req, KIT_BODY);
  if (r.e) return refused(r, o);
  const body = r.body;
  if (body.v !== PROTO) return answer(409, { e: "old", v: PROTO }, o);
  if (!body.kit || typeof body.kit !== "object" || Array.isArray(body.kit)) return answer(400, { e: "kit", why: "v" }, o);
  /* the game itself is checked by its own object (kit.js create), where a call may take the work it needs;
     the address is counted here by the bytes it sent, and given back if the game is not right */
  const size = r.n;
  if (!allowed(counts.saves, req, SAVES)) return answer(429, { e: "later" }, o);
  if (!allowed(counts.bytes, req, SAVE_BYTES, size)) { giveBack(counts.saves, req, 1); return answer(429, { e: "later" }, o); }
  let from = "", root = "";
  const f = body.from;
  if (f && typeof f === "object" && typeof f.code === "string" && typeof f.copy === "string") {
    const fc = f.code.toUpperCase();
    if (kitCodeOk(fc) && same(f.copy, await mac(env, "copy:" + fc))) {
      const fam = await kitOf(env, fc).family();
      if (fam && fam.stopped) return answer(409, { e: "stopped" }, o);
      if (fam) { from = fc; root = fam.root; }
    }
  }
  const edit = randomKey(16), editHash = await sha(edit);
  for (let i = 0; i < 8; i++) {
    const code = newKitCode();
    const made = await kitOf(env, code).create({ code, editHash, kit: body.kit, from, root: root || code });
    if (made && made.why === "bad") {
      giveBack(counts.saves, req, 1);
      giveBack(counts.bytes, req, size);
      return answer(400, made.bad === "title" ? { e: "title" } : { e: "kit", why: made.bad }, o);
    }
    if (made && made.ok) {
      count(counts.grown, req, made.size, dayWin(env));
      if (root && root !== code) { try { await kitOf(env, root).addCopy(code); } catch (e) { /* the family is for Logicers' stop only */ } }
      return answer(200, { code, edit, copy: await mac(env, "copy:" + code), until: made.until }, o);
    }
    if (made && made.why === "budget") return answer(503, { e: "budget" }, o);
    if (made && made.why !== "taken") return answer(503, { e: "busy" }, o);
  }
  return answer(503, { e: "busy" }, o);
}

/* POST /kit/CODE[/open|/copy|/delete|/play|/me|/results|/grade|/way|/mail], GET /kit/CODE and GET /kit/CODE/play */
async function kitCall(req, env, code, sub, o) {
  if (req.method === "GET" && (!sub || sub === "play")) {
    if (braked(req)) return answer(429, { e: "later" }, o);
    if (!kitCodeOk(code)) { miss(req, code); return answer(404, { e: "nogame" }, o); }
    const info = sub ? await kitOf(env, code).playInfo() : await kitOf(env, code).info();
    if (!info) { miss(req, code); return answer(404, { e: "nogame" }, o); }
    return answer(200, info, o);
  }
  if (req.method !== "POST") return answer(404, { e: "nothing" }, o);
  if (sub === "play" || sub === "me") return await playCall(req, env, code, sub, o);
  const r = await readJson(req, !sub ? KIT_BODY : sub === "grade" ? 20000 : SMALL);
  if (r.e) return refused(r, o);
  const body = r.body;
  /* A braked address still gets through with a right edit key or copy link, but learns nothing else:
     without one it is told "later", whether the code exists or not. */
  const hasKey = sub === "copy" ? typeof body.copy === "string" : keyOk(body.edit);
  if (!kitCodeOk(code)) { if (!braked(req)) miss(req, code); return answer(braked(req) ? 429 : 404, { e: braked(req) ? "later" : "nogame" }, o); }
  if (!hasKey && braked(req)) return answer(429, { e: "later" }, o);
  const stub = kitOf(env, code);
  /* the result of a call that needed a key: a code that does not exist counts as a wrong guess */
  const out = (x, ok) => {
    if (x && x.why === "nogame") { miss(req, code); return answer(braked(req) ? 429 : 404, { e: braked(req) ? "later" : "nogame" }, o); }
    if (x && x.why === "edit") {
      if (braked(req)) return answer(429, { e: "later" }, o);
      /* a key Logicers replaced (a maker's lost link, kit.js rekey): its holder learns when, nothing more */
      return answer(403, x.replaced ? { e: "edit", replaced: x.replaced } : { e: "edit" }, o);
    }
    if (x && x.why === "stopped") return answer(409, x.stop ? { e: "stopped", why: x.stop.why } : { e: "stopped" }, o);
    if (x && x.why === "budget") return answer(503, { e: "budget" }, o);
    if (!x || !x.ok) return answer(503, { e: "busy" }, o);
    return answer(200, ok(x), o);
  };
  if (!sub) {
    if (body.v !== PROTO) return answer(409, { e: "old", v: PROTO }, o);
    if (!keyOk(body.edit)) return answer(403, { e: "edit" }, o);
    if (!body.kit || typeof body.kit !== "object" || Array.isArray(body.kit)) return answer(400, { e: "kit", why: "v" }, o);
    if (spentOut(counts.grown, req, growDay(env), dayWin(env)) || !allowed(counts.bytes, req, SAVE_BYTES, r.n)) return answer(429, { e: "later" }, o);
    const x = await stub.update({ edit: body.edit, kit: body.kit });
    if (x && x.why === "bad") { giveBack(counts.bytes, req, r.n); return answer(400, x.bad === "title" ? { e: "title" } : { e: "kit", why: x.bad }, o); }
    if (x && x.ok) count(counts.grown, req, x.grew, dayWin(env));
    return out(x, (y) => ({ ok: true, until: y.until }));
  }
  if (sub === "open") {
    if (!keyOk(body.edit)) return answer(403, { e: "edit" }, o);
    const x = await stub.open({ edit: body.edit });
    const copy = x && x.ok && !x.stopped ? await mac(env, "copy:" + code) : "";
    return out(x, (y) => y.stopped ? { code: y.code, stopped: y.stopped, mail: tri(y.mail) }
      : { code: y.code, kit: y.kit, copy, until: y.until, made: y.made, saved: y.saved, plays: y.plays, stopped: null, way: !!y.way, wayAt: y.wayAt || 0, mail: tri(y.mail) });
  }
  if (sub === "delete") {
    if (!keyOk(body.edit)) return answer(403, { e: "edit" }, o);
    return out(await stub.remove({ edit: body.edit }), () => ({ ok: true }));
  }
  if (sub === "results") {
    if (!keyOk(body.edit)) return answer(403, { e: "edit" }, o);
    return out(await stub.results({ edit: body.edit }), (x) => ({ plays: x.plays, typed: x.typed }));
  }
  if (sub === "grade") {
    if (!keyOk(body.edit)) return answer(403, { e: "edit" }, o);
    const g = await stub.grade({ edit: body.edit, id: body.id, ok: body.ok });
    if (g && g.why === "grade") return answer(400, { e: "grade" }, o);
    return out(g, () => ({ ok: true }));
  }
  if (sub === "way") {
    if (!keyOk(body.edit)) return answer(403, { e: "edit" }, o);
    if (body.mp !== null && (typeof body.mp !== "string" || !MP.test(body.mp))) return answer(400, { e: "way" }, o);
    /* the feedback tick: the address itself, only with a fingerprint, and only the address of that fingerprint */
    let mail = "";
    if (body.mail !== undefined && body.mail !== null) {
      mail = await mailFor(body.mail, body.mp);
      if (!mail) return answer(400, { e: "mail" }, o);
    }
    if (!allowed(counts.ways, req, WAYS)) return answer(429, { e: "later" }, o);
    const fp = body.mp ? await wayFp(env, body.mp) : null;
    if (body.mp && !fp) { giveBack(counts.ways, req, 1); return answer(503, { e: "busy" }, o); }      // the secret is missing: nothing to keep
    /* anyone can type any address: one network address puts 20 new ones a day on the list; past them the way back
       is still set, and the answer says the tick was not taken (mail: false) */
    const tick = !!mail && allowed(counts.ticks, req, TICKS_DAY, 1, dayWin(env));
    const x = await stub.setWay({ edit: body.edit, fp, mail: tick ? { email: mail } : null });
    /* only a way back really set counts for the address: a wrong key or code never spends a school's ten minutes;
       and only an address this tick put on the list for this game counts as a tick (a game ticked again is free) */
    if (!x || !x.ok) giveBack(counts.ways, req, 1);
    if (tick && !(x && x.ok && x.fresh)) giveBack(counts.ticks, req, 1);
    return out(x, (y) => ({ ok: true, way: y.way, wayAt: y.wayAt || 0, mail: tri(y.mail) }));
  }
  if (sub === "mail") {
    if (!keyOk(body.edit)) return answer(403, { e: "edit" }, o);
    if (!allowed(counts.ways, req, WAYS)) return answer(429, { e: "later" }, o);
    const x = await stub.mailStop({ edit: body.edit });
    if (!x || !x.ok) giveBack(counts.ways, req, 1);
    return out(x, () => ({ ok: true, mail: false }));
  }
  if (sub === "copy") {
    if (typeof body.copy !== "string" || !same(body.copy, await mac(env, "copy:" + code))) {
      if (braked(req)) return answer(429, { e: "later" }, o);
      miss(req, code);                                  // a wrong copy token is a guess like a wrong code
      return answer(403, { e: "copy" }, o);
    }
    return out(await stub.copyOut(), (x) => ({ kit: x.kit }));
  }
  return answer(404, { e: "nothing" }, o);
}

/* A play alone (all its answers, at its end) or a player coming back for their line of the scoreboard. The
   browser proves nothing but its own random key: its first play is the one on the scoreboard. */
async function playCall(req, env, code, sub, o) {
  if (braked(req)) return answer(429, { e: "later" }, o);
  if (!kitCodeOk(code)) { miss(req, code); return answer(404, { e: "nogame" }, o); }
  const r = await readJson(req, sub === "play" ? PLAY_BODY : SMALL);
  if (r.e) return refused(r, o);
  const b = r.body;
  if (!keyOk(b.key)) return answer(400, { e: "key" }, o);
  const kh = await sha(b.key), stub = kitOf(env, code);
  if (sub === "me") {
    const me = await stub.me({ kh });
    return me ? answer(200, me, o) : answer(404, { e: "noplay" }, o);
  }
  if (b.v !== PROTO) return answer(409, { e: "old", v: PROTO }, o);
  if (!allowed(counts.plays, req, PLAYS)) return answer(429, { e: "later" }, o);
  const keep = allowed(counts.kept, req, playsDay(env), 1, dayWin(env));
  const x = await stub.play({ kh, name: b.name, pick: b.pick === true, ans: b.ans, keep });
  if (keep && !(x && x.ok && x.kept)) giveBack(counts.kept, req, 1);     // only a kept play counts for the day
  if (!x || !x.ok) {
    const why = x ? x.why : "busy";
    if (why === "nogame") { miss(req, code); return answer(404, { e: "nogame" }, o); }
    return answer(why === "stopped" || why === "live" ? 409 : why === "name" || why === "ans" ? 400 : 503, { e: why }, o);
  }
  delete x.ok;
  return answer(200, x, o);
}

/* ------------------------------------------------------------ reports and Logicers' desk */

async function report(req, env, o) {
  if (braked(req)) return answer(429, { e: "later" }, o);
  const r = await readJson(req, SMALL);
  if (r.e) return refused(r, o);
  const b = r.body;
  if (b.v !== PROTO) return answer(409, { e: "old", v: PROTO }, o);
  const code = typeof b.code === "string" ? b.code.trim().toUpperCase() : "";
  if (!WHYS.includes(b.why)) return answer(400, { e: "report", why: "why" }, o);
  const text = cleanText(b.text, 10, 1000);
  if (text === null) return answer(400, { e: "report", why: "text" }, o);
  const name = cleanText(b.name, 0, 80);
  if (name === null) return answer(400, { e: "report", why: "name" }, o);
  const email = cleanText(b.email, 0, 120);
  if (email === null || (email && !/^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/.test(email))) return answer(400, { e: "report", why: "email" }, o);
  if (b.good !== true) return answer(400, { e: "report", why: "good" }, o);
  let found = null;
  if (codeOk(code)) {
    const i = await gameOf(env, code).reportInfo();
    if (i) found = { code, kit: i.kit, title: i.title };
  } else if (kitCodeOk(code)) {
    const i = await kitOf(env, code).reportInfo();
    if (i) found = { code, kit: code, title: i.title };
  }
  if (!found) { miss(req, code); return answer(404, { e: "nogame" }, o); }
  if (!allowed(counts.reports, req, REPORTS)) return answer(429, { e: "later" }, o);
  const lang = ["en", "it", "tr"].includes(b.lang) ? b.lang : "";          // the form's language, to answer in it
  const saved = await deskOf(env).add(Object.assign(found, { why: b.why, text, name, email, lang }));
  if (!saved || !saved.ok) return answer(503, { e: "busy" }, o);
  return answer(200, { ok: true }, o);
}

async function admin(req, env, o) {
  if (spentOut(counts.admin, req, WRONG_ADMIN)) return answer(429, { e: "later" }, o);
  const r = await readJson(req, SMALL);
  if (r.e) return refused(r, o);
  const b = r.body;
  if (!env.ADMIN_KEY || typeof b.key !== "string" || !same(await sha(b.key), await sha(env.ADMIN_KEY))) {
    allowed(counts.admin, req, WRONG_ADMIN);
    return answer(404, { e: "nothing" }, o);
  }
  const code = typeof b.code === "string" ? b.code.trim().toUpperCase() : "";
  switch (b.do) {
    case "reports":
      return answer(200, { reports: await deskOf(env).list(typeof b.before === "string" ? b.before : "") }, o);
    case "totals":
      return answer(200, await totalsOf(env).read(), o);
    case "close":
      return answer(200, await deskOf(env).close({ id: b.id, decision: b.decision, note: b.note }), o);
    case "game": {
      if (codeOk(code)) {
        const g = await gameOf(env, code).adminView();
        return g ? answer(200, { live: g }, o) : answer(404, { e: "nogame" }, o);
      }
      if (!kitCodeOk(code)) return answer(404, { e: "nogame" }, o);
      const v = await kitOf(env, code).adminView();
      return v ? answer(200, v, o) : answer(404, { e: "nogame" }, o);
    }
    case "stop":
    case "start": {
      /* one saved game, or (family) its first game and every copy, forty at a time: a free plan allows
         fifty calls to other objects in one request, so the page asks again while `more` is true */
      if (!kitCodeOk(code)) return answer(404, { e: "nogame" }, o);
      const fam = await kitOf(env, code).family();
      if (!fam) return answer(404, { e: "nogame" }, o);
      let all = [code];
      if (b.family === true) {
        const root = await kitOf(env, fam.root).family();
        all = [...new Set([fam.root].concat(root ? root.copies : [], fam.copies, [code]))];
      }
      const from = Number.isInteger(b.from) && b.from > 0 ? b.from : 0, part = all.slice(from, from + 40), done = [];
      for (const c of part) {
        try {
          const ok = b.do === "stop" ? await kitOf(env, c).stop(typeof b.why === "string" ? b.why : "") : await kitOf(env, c).start();
          if (ok) done.push(c);
        } catch (e) { /* that one is gone already */ }
      }
      return answer(200, { [b.do === "stop" ? "stopped" : "started"]: done, more: from + 40 < all.length, next: from + 40, of: all.length }, o);
    }
    case "way": {
      /* A maker who lost the edit link wrote from an address; the desk's browser sends its fingerprint (mp),
         never the address. With a code: does that game carry it? Without: the games that do, forty at a
         time (a free plan allows fifty calls to other objects in one request; the page asks for the next). */
      if (typeof b.mp !== "string" || !MP.test(b.mp)) return answer(400, { e: "way" }, o);
      const fp = await wayFp(env, b.mp);
      if (!fp) return answer(503, { e: "busy" }, o);
      if (code) {
        if (!kitCodeOk(code)) return answer(404, { e: "nogame" }, o);
        const v = await kitOf(env, code).wayInfo(fp);
        if (!v) return answer(404, { e: "nogame" }, o);
        return answer(200, { games: v.match ? [v.info] : [], has: v.has, more: false, of: v.match ? 1 : 0 }, o);
      }
      const list = await wayOf(env, fp).list();
      const from = Number.isInteger(b.from) && b.from > 0 ? b.from : 0, part = list.slice(from, from + 40), games = [];
      for (const c of part) {
        try { const v = await kitOf(env, c).wayInfo(fp); if (v && v.match) games.push(v.info); } catch (e) { /* that one is gone */ }
      }
      return answer(200, { games, more: from + 40 < list.length, next: from + 40, of: list.length }, o);
    }
    case "mails": {
      /* the list of feedback emails, the newest first, all of it in one answer: the readable addresses their
         owners gave for this (mail.js), with the language and the date; never a code, a key or a hash */
      return answer(200, await mailOf(env).page(Number.isInteger(b.from) ? b.from : 0), o);
    }
    case "mailrm": {
      /* an address taken off that list on its owner's request, and kept off (a tick with it is refused from then
         on, so nobody can put it back): the desk sends its fingerprint, as for a lost link */
      if (typeof b.mp !== "string" || !MP.test(b.mp)) return answer(400, { e: "way" }, o);
      const fp = await wayFp(env, b.mp);
      if (!fp) return answer(503, { e: "busy" }, o);
      return answer(200, { ok: true, removed: !!(await mailOf(env).drop(fp, true)) }, o);
    }
    case "rekey": {
      /* a new edit key for a game, only when the address typed is the one the game carries */
      if (typeof b.mp !== "string" || !MP.test(b.mp) || !kitCodeOk(code)) return answer(400, { e: "way" }, o);
      const fp = await wayFp(env, b.mp);
      if (!fp) return answer(503, { e: "busy" }, o);
      const x = await kitOf(env, code).rekey(fp);
      if (x && x.ok) return answer(200, { code, edit: x.edit, until: x.until }, o);
      if (x && x.why === "nogame") return answer(404, { e: "nogame" }, o);
      if (x && x.why === "nomatch") return answer(409, { e: "nomatch" }, o);
      if (x && x.why === "many") return answer(429, { e: "many" }, o);
      return answer(503, { e: "busy" }, o);
    }
  }
  return answer(400, { e: "do" }, o);
}

/* ------------------------------------------------------------ the world's counts (16 Oct 2026) */

/* Every finished daily game adds its points to its country's row for its date (tally.js, one object per date),
   and the reveal shows the world, the player's continent and country beside the player's own result. The
   country and the continent are read here from the connection, as Cloudflare gives them (request.cf), and
   never from the page; nothing about a player is kept, only the counts (tally.js says exactly what).
     POST /stats/send   { v, d, rs: [{ k, e, g } | { k, c }], k } a phone's finished results of its date d
                        (YYYYMMDD by its own clock), up to the nine games -> { you, took, ks, view } (ks: the games
                        counted, the brake permitting; view: the view of k)
     POST /stats/view   { v, d, k } one game of one date -> { you, view }
     POST /stats/world  { v, d, span: "day" | "week" | "month" } the world table of a date, or of its week (from
                        Monday) or month up to it (a week or month only up to a date some clock is on now)
                        -> { you, d, span, n, m, calls, games,
                        cs: [[c, ct, n, a, calls]], ts, days }
   A date is taken only while some clock on earth is on it (UTC-12 to UTC+14), and read for 70 days. */
const STATS = 1;                    // the version of these calls; a page that sends another is told "old"
const STATS_SENDS = 300;            // sends from one address in 10 minutes (a class or a mobile network can sit behind one)
const STATS_READS = 900;            // views and world tables from one address in 10 minutes
const STATS_BODY = 4000;
const tallyOf = (env, d) => env.TALLY.get(env.TALLY.idFromName("d:" + d));
const sums = new Map();             // "YYYYMMDD" -> the summary of a date that no clock is on any more (it can't change)
Object.assign(counts, { sends: new Map(), reads: new Map() });

function dayStart(d) {
  const m = /^(\d{4})(\d{2})(\d{2})$/.exec(String(d));
  if (!m) return NaN;
  const t = Date.UTC(+m[1], +m[2] - 1, +m[3]);
  const x = new Date(t);
  return x.getUTCFullYear() === +m[1] && x.getUTCMonth() === +m[2] - 1 && x.getUTCDate() === +m[3] ? t : NaN;
}
const H = 3600e3;
/* some clock on earth shows date d now: from UTC+14 to UTC-12 */
function dateOn(d, now) { const t = typeof d === "string" ? dayStart(d) : NaN; return isFinite(t) && now >= t - 14 * H && now < t + 36 * H; }
/* date d may be read: it has begun somewhere, and is at most 70 days old */
function dateRead(d, now) { const t = typeof d === "string" ? dayStart(d) : NaN; return isFinite(t) && now >= t - 14 * H && now < t + 71 * 24 * H; }
function keyOfUTC(t) { return new Date(t).toISOString().slice(0, 10).replace(/-/g, ""); }

/* the country and continent of the connection; the checks may name them (TEST_GEO, never on Cloudflare) */
function geo(req, env) {
  let c = req.cf && req.cf.country, ct = req.cf && req.cf.continent;
  if (env && env.TEST_GEO === "1" && req.headers.get("X-Test-Geo")) [c, ct] = String(req.headers.get("X-Test-Geo")).split(",");
  c = /^[A-Z]{2}$/.test(String(c || "")) && c !== "XX" && c !== "T1" ? c : "??";
  ct = /^(AF|AN|AS|EU|NA|OC|SA)$/.test(String(ct || "")) && c !== "??" ? ct : "??";
  return { c, ct };
}

async function statsSend(req, env, o) {
  if (!allowed(counts.sends, req, STATS_SENDS)) return answer(429, { e: "later" }, o);
  const r = await readJson(req, STATS_BODY);
  if (r.e) return refused(r, o);
  const b = r.body;
  if (b.v !== STATS) return answer(409, { e: "old", v: STATS }, o);
  if (!dateOn(b.d, Date.now())) return answer(400, { e: "day" }, o);
  if (!Array.isArray(b.rs) || b.rs.length > 9) return answer(400, { e: "rs" }, o);
  const P = globalThis.LogicersPoints;
  const rs = [];
  for (const x of b.rs) {
    if (!x || typeof x !== "object" || !P.valid(x)) return answer(400, { e: "rs" }, o);
    rs.push(x.c !== undefined ? { k: x.k, c: x.c } : x.g !== undefined ? { k: x.k, e: x.e, g: x.g } : { k: x.k, e: x.e });
  }
  const k = typeof b.k === "string" && P.LIMITS.hasOwnProperty(b.k) ? b.k : null;
  const you = geo(req, env);
  /* the brake's name for this address on this date: keyed with the secret, so it can't be turned back into
     the address; held in the date's memory only (tally.js) */
  const who = (await mac(env, "stats:" + where(req) + ":" + b.d)) || (await sha("stats:" + where(req) + ":" + b.d)).slice(0, 20);
  const res = await tallyOf(env, b.d).add({ d: b.d, who, c: you.c, ct: you.ct, rs, k });
  return answer(200, { you, took: res.took, ks: res.ks, view: res.view }, o);
}

async function statsView(req, env, o) {
  if (!allowed(counts.reads, req, STATS_READS)) return answer(429, { e: "later" }, o);
  const r = await readJson(req, STATS_BODY);
  if (r.e) return refused(r, o);
  const b = r.body;
  if (b.v !== STATS) return answer(409, { e: "old", v: STATS }, o);
  if (!dateRead(b.d, Date.now())) return answer(400, { e: "day" }, o);
  const P = globalThis.LogicersPoints;
  if (typeof b.k !== "string" || !P.LIMITS.hasOwnProperty(b.k)) return answer(400, { e: "k" }, o);
  const you = geo(req, env);
  return answer(200, { you, view: await tallyOf(env, b.d).view({ k: b.k, c: you.c, ct: you.ct }) }, o);
}

/* a date's summary; a date no clock is on any more can't change, so it is kept in this copy's memory */
async function summaryOf(env, d, now) {
  if (sums.has(d)) return sums.get(d);
  const s = await tallyOf(env, d).summary();
  if (now >= dayStart(d) + 36 * H + 60e3) {
    sums.set(d, s);
    if (sums.size > 120) sums.delete(sums.keys().next().value);
  }
  return s;
}

async function statsWorld(req, env, o) {
  if (!allowed(counts.reads, req, STATS_READS)) return answer(429, { e: "later" }, o);
  const r = await readJson(req, STATS_BODY);
  if (r.e) return refused(r, o);
  const b = r.body, now = Date.now();
  if (b.v !== STATS) return answer(409, { e: "old", v: STATS }, o);
  if (!dateRead(b.d, now)) return answer(400, { e: "day" }, o);
  const span = b.span === "month" ? "month" : b.span === "week" ? "week" : "day";
  /* a week or a month is read only up to a date some clock is on now: this week's or this month's table (older
     days are kept 75 days, so an older month would come back with its first days missing) */
  if (span !== "day" && !dateOn(b.d, now)) return answer(400, { e: "day" }, o);
  const you = geo(req, env);
  if (span === "day") {
    const s = await summaryOf(env, b.d, now);
    return answer(200, Object.assign({ you, d: b.d, span, days: 1 }, s), o);
  }
  /* the week of date d (from its Monday) or its month (from its first day), up to d: each day's points made fair
     within the day (tally.js), then the days put on one level, the span's own average */
  const t1 = dayStart(b.d);
  const t0 = span === "month" ? dayStart(b.d.slice(0, 6) + "01") : t1 - ((new Date(t1).getUTCDay() + 6) % 7) * 24 * H;
  const dates = [];
  for (let t = t0; t <= t1; t += 24 * H) dates.push(keyOfUTC(t));
  const all = await Promise.all(dates.map((d) => summaryOf(env, d, now).catch(() => null)));
  let N = 0, S = 0, calls = 0, days = 0;
  const games = {};
  for (const s of all) {
    if (!s || !s.n) { if (s) calls += s.calls; continue; }
    N += s.n; S += s.n * s.m; calls += s.calls; days++;
    for (const k of Object.keys(s.games)) games[k] = (games[k] || 0) + s.games[k];
  }
  const M = N ? S / N : 0, cs = {}, ts = {};
  for (const s of all) {
    if (!s || !(s.n || s.calls)) continue;
    for (const [c, ct, n, a, k] of s.cs) { const x = cs[c] || (cs[c] = { ct, n: 0, a: 0, k: 0 }); x.n += n; x.a += a + n * (M - s.m); x.k += k || 0; }
    for (const [ct, n, a] of s.ts) { const y = ts[ct] || (ts[ct] = { n: 0, a: 0 }); y.n += n; y.a += a + n * (M - s.m); }
  }
  const r1 = (v) => Math.round(v * 10) / 10;
  return answer(200, {
    you, d: b.d, span, days, n: N, m: r1(M), calls, games,
    cs: Object.keys(cs).sort().map((c) => [c, cs[c].ct, cs[c].n, r1(cs[c].a), cs[c].k]),
    ts: Object.keys(ts).sort().map((ct) => [ct, ts[ct].n, r1(ts[ct].a)])
  }, o);
}

/* the totals without names, for the admin key only (kept for the admin page of step 1) */
async function totals(req, env, o) {
  if (spentOut(counts.admin, req, WRONG_ADMIN)) return answer(429, { e: "later" }, o);
  const r = await readJson(req, SMALL);
  if (r.e) return refused(r, o);
  const b = r.body;
  if (!env.ADMIN_KEY || typeof b.key !== "string" || !same(await sha(b.key), await sha(env.ADMIN_KEY))) {
    allowed(counts.admin, req, WRONG_ADMIN);
    return answer(404, { e: "nothing" }, o);
  }
  return answer(200, await totalsOf(env).read(), o);
}


/* ------------------------------------------------------------ the daily reminder (push.js) */

const PUSH_V = 1;
const PUSH_BODY = 4000;
const PUSH_JOINS = 40;              // joins (and refreshes) from one address in 10 minutes
const PUSH_MSGS = 120;              // asks for the words of a push from one address in 10 minutes
counts.pushes = new Map(); counts.pushmsgs = new Map();
const pushOf = (env, i) => env.PUSH.get(env.PUSH.idFromName("s" + i));
const pushId = async (ep) => (await sha("push:" + ep)).slice(0, 32);
const shardOf = (id) => parseInt(id.slice(0, 2), 16) % SHARDS;
const wholeIn = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
const PLAIN_WORDS = { t: "Logicers", b: "Today’s games are ready.", n: 9 };

async function pushJoin(req, env, o) {
  if (!allowed(counts.pushes, req, PUSH_JOINS)) return answer(429, { e: "later" }, o);
  const r = await readJson(req, PUSH_BODY);
  if (r.e) return refused(r, o);
  const b = r.body;
  if (b.v !== PUSH_V) return answer(409, { e: "old", v: PUSH_V }, o);
  if (!env.VAPID_PRIVATE || !env.VAPID_PUBLIC) return answer(503, { e: "off" }, o);
  if (!endpointOk(b.ep, env)) return answer(400, { e: "ep" }, o);
  if (!wholeIn(b.h, 0, 23) || !wholeIn(b.z, -720, 840) || !wholeIn(b.st, 0, 9999)) return answer(400, { e: "fields" }, o);
  if (!(b.pl === "" || (typeof b.pl === "string" && dateOk(b.pl)))) return answer(400, { e: "pl" }, o);
  let tip = "";
  if (b.tip !== undefined && b.tip !== "") {
    if (typeof b.tip !== "string" || b.tip.length > 110) return answer(400, { e: "tip" }, o);
    tip = lineOk(b.tip) ? b.tip : "";                 // a line with a link or an address in it is simply not kept; the phone still joins
  }
  const id = await pushId(b.ep);
  const res = await pushOf(env, shardOf(id)).join({ id, ep: b.ep, h: b.h, z: b.z, cc: geo(req, env).c, st: b.st, pl: b.pl, tip, now: Date.now() });
  return res.e ? answer(503, { e: res.e }, o) : answer(200, { ok: true }, o);
}

async function pushLeave(req, env, o) {
  if (!allowed(counts.pushes, req, PUSH_JOINS)) return answer(429, { e: "later" }, o);
  const r = await readJson(req, PUSH_BODY);
  if (r.e) return refused(r, o);
  const b = r.body;
  if (b.v !== PUSH_V || !endpointOk(b.ep, env)) return answer(400, { e: "ep" }, o);
  const id = await pushId(b.ep);
  await pushOf(env, shardOf(id)).leave(id);
  return answer(200, { ok: true }, o);
}

/* the words of the push that woke a phone; a phone that is not on the list, or has had no push, gets the plain line */
async function pushMsg(req, env, o) {
  if (!allowed(counts.pushmsgs, req, PUSH_MSGS)) return answer(429, { e: "later" }, o);
  const r = await readJson(req, PUSH_BODY);
  if (r.e) return refused(r, o);
  const b = r.body;
  if (b.v !== PUSH_V || !endpointOk(b.ep, env)) return answer(400, { e: "ep" }, o);
  const id = await pushId(b.ep);
  const w = await pushOf(env, shardOf(id)).msg(id, Date.now());
  const n = Number(env.DAILY_GAMES) || 9;
  return answer(200, w || Object.assign({}, PLAIN_WORDS, { n }), o);
}

async function pushAdmin(req, env, o) {
  if (spentOut(counts.admin, req, WRONG_ADMIN)) return answer(429, { e: "later" }, o);
  const r = await readJson(req, SMALL);
  if (r.e) return refused(r, o);
  const b = r.body, now = Date.now();
  if (!env.ADMIN_KEY || typeof b.key !== "string" || !same(await sha(b.key), await sha(env.ADMIN_KEY))) {
    allowed(counts.admin, req, WRONG_ADMIN);
    return answer(404, { e: "nothing" }, o);
  }
  const all = Array.from({ length: SHARDS }, (_, i) => i);
  if (b.op === "ann") {
    const text = typeof b.text === "string" ? b.text.replace(/[\u0000-\u001f\u007f<>\u200b-\u200f\u2028\u2029]/g, " ").replace(/\s+/g, " ").trim() : "";
    if (text.length > 120 || (text && !lineOk(text))) return answer(400, { e: "text" }, o);
    const days = wholeIn(b.days, 1, 7) ? b.days : 3;
    const a = text ? { id: String(now), text, until: now + days * 86400e3 } : null;
    await Promise.all(all.map((i) => pushOf(env, i).setAnn(a)));
    return answer(200, { ok: true, ann: a }, o);
  }
  const parts = await Promise.all(all.map((i) => pushOf(env, i).stats(now)));
  const by = {};
  let n = 0, sentToday = 0, ann = null;
  for (const p of parts) {
    n += p.n; sentToday += p.sentToday; ann = ann || p.ann;
    for (const c of Object.keys(p.by)) by[c] = (by[c] || 0) + p.by[c];
  }
  const top = Object.keys(by).sort((x, y) => by[y] - by[x]).slice(0, 12).map((c) => [c, by[c]]);
  return answer(200, { n, sentToday, top, ann, sets: !!(env.VAPID_PRIVATE && env.VAPID_PUBLIC) }, o);
}

/* the hourly trigger: every object sends to the phones whose hour it is (push.js) */
async function pushRun(env, now) {
  const parts = await Promise.all(Array.from({ length: SHARDS }, (_, i) => pushOf(env, i).run(now).catch(() => null)));
  const sum = { rows: 0, due: 0, ok: 0, gone: 0, retry: 0, dropped: 0 };
  for (const p of parts) if (p) for (const k of Object.keys(sum)) sum[k] += p[k] || 0;
  return sum;
}

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(pushRun(env, Date.now()));
  },
  async fetch(req, env) {
    const url = new URL(req.url);
    const o = originOf(req, env);
    if (req.method === "OPTIONS") {
      if (!o.ok) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": o.allow || "*", "Vary": "Origin",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" } });
    }
    if (!o.ok) return answer(403, { e: "origin" }, o);
    try {
      /* "sets": whether the secret SETS_KEY opens the question sets. The one line to look at after the
         setup: { "ok": true, "v": 1, "sets": true }. It says nothing about the key itself. */
      if (url.pathname === "/" || url.pathname === "/health") {
        let s = false;
        try { s = !!(await loadSets(env)); } catch (e) { /* the key is missing or wrong */ }
        return answer(200, { ok: true, v: PROTO, sets: s, push: !!(env.VAPID_PRIVATE && env.VAPID_PUBLIC) }, o);
      }
      /* A browser names the kind of call. The page makes only fetches ("cors") and WebSockets; an <img>
         or a link on any site ("no-cors", "navigate") carries no Origin, and could spend a campus's brake
         with nobody there typing a code: refused before anything is counted. */
      const mode = req.headers.get("Sec-Fetch-Mode");
      if (mode !== null && !MODES.includes(mode)) return answer(403, { e: "mode" }, o);
      if (url.pathname === "/new" && req.method === "POST") return await make(req, env, o);
      let m = /^\/game\/([A-Za-z]{1,8})$/.exec(url.pathname);
      if (m && req.method === "GET") return await peek(req, env, m[1].toUpperCase(), o);
      m = /^\/ws\/([A-Za-z]{1,8})$/.exec(url.pathname);
      if (m && req.method === "GET") return await connect(req, env, m[1].toUpperCase(), o);
      if (url.pathname === "/kit" && req.method === "POST") return await kitNew(req, env, o);
      m = /^\/kit\/([A-Za-z]{1,8})(?:\/(open|copy|delete|play|me|results|grade|way|mail))?$/.exec(url.pathname);
      if (m) return await kitCall(req, env, m[1].toUpperCase(), m[2] || "", o);
      if (url.pathname === "/report" && req.method === "POST") return await report(req, env, o);
      if (url.pathname === "/admin" && req.method === "POST") return await admin(req, env, o);
      if (url.pathname === "/totals" && req.method === "POST") return await totals(req, env, o);
      if (url.pathname === "/stats/send" && req.method === "POST") return await statsSend(req, env, o);
      if (url.pathname === "/stats/view" && req.method === "POST") return await statsView(req, env, o);
      if (url.pathname === "/stats/world" && req.method === "POST") return await statsWorld(req, env, o);
      if (url.pathname === "/push/join" && req.method === "POST") return await pushJoin(req, env, o);
      if (url.pathname === "/push/leave" && req.method === "POST") return await pushLeave(req, env, o);
      if (url.pathname === "/push/msg" && req.method === "POST") return await pushMsg(req, env, o);
      if (url.pathname === "/push/admin" && req.method === "POST") return await pushAdmin(req, env, o);
      /* the checks only (TEST_PUSH=1, never set on Cloudflare): run the hourly send as if it were the time they name */
      if (url.pathname === "/push/_run" && req.method === "POST" && env.TEST_PUSH === "1") {
        const r = await readJson(req, SMALL);
        return answer(200, await pushRun(env, r.body && Number.isFinite(r.body.now) ? r.body.now : Date.now()), o);
      }
      return answer(404, { e: "nothing" }, o);
    } catch (e) {
      return answer(500, { e: "server" }, o);
    }
  }
};
