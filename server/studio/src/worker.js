/* Logicers Studio — the server (logicers-studio: a Cloudflare Worker with a D1 database, an R2 bucket of images and
   Workers AI), which also serves the Studio's pages on by.logicers.com. Chat A, 8 Nov 2026. The plan and the contract:
   the project doc claude/studio-plan.md, sections 2 and 3.

   What it keeps, and nothing else: makers (the name, its slug, the language, a keyed hash of the maker key, the terms
   version they ticked); games (title, template, settings, About, a keyed hash of the edit key, the terms version and day,
   listed / hidden, a counter); items; images (in R2) with the AI check's label; counts per item and answer bucket (nothing
   per person); the answers of games whose maker turned "keep answers" on (the player was told, and gave a name or none,
   under the page's random id); reports (the reason, the words, the day, a keyed hash of the page's random id); Khayyam's
   queue; the day's caps. Never an email, an address, an IP or a user agent: the brakes are in memory only, and Workers
   Logs stay off (wrangler.jsonc).

   Calls (POST bodies are JSON; a key is never in a URL). Answers are { ok: true, ... } or { ok: false, e: <key> }: the
   pages turn the keys into words in six languages (README lists them).
     POST /maker/new    { name, lang, terms_version }                       -> { slug, key, name }
     POST /maker/edit   { key, name?, lang?, kits? }                        -> { maker }
     POST /maker/get    { key }                                             -> { maker, games: [numbers] }
     POST /maker/delete { key }                                             -> {}   (every game and image of the maker)
     POST /game/new     { maker_key, template, title, lang, mode, start_day, keep_answers, want_listed, terms_version? }
                                                                            -> { id, slug, code, edit_key, url, status }
     POST /game/save    { edit_key, title?, about?, mode?, start_day?, keep_answers?, want_listed?, cover?, items? }
                                                                            -> the editor's whole game (as /game/mine)
     POST /game/mine    { edit_key }                                        -> { maker, game, items, counts, images }
     POST /game/delete  { edit_key }                                        -> {}
     POST /game/answers { edit_key, after? }                                -> { rows, next } (the CSV; 2000 a page)
          (every /game/* and /img/del call also takes { maker_key, game } in place of edit_key)
     POST /img/put      multipart: edit_key (or maker_key, game), file      -> { id, url, w, h, bytes }
     POST /img/del      { edit_key, id }                                    -> {}
     POST /play         { game, item, answer }                              -> { bucket, counts: { n, b } }
     POST /play/keep    { game, item, pid, name, answer }                   -> { kept }
     POST /report       { game, reason, text?, browser? }                   -> {}
     POST /admin/queue  { key, before?, all? }    POST /admin/act { key, game, action, id?, maker? }     (ADMIN_KEY)
     GET  /g/<maker>/<game>?day=YYYY-MM-DD&counts=<item>   a game: meta; today's item (daily) or all items (open)
     GET  /m/<maker>    a maker's page        GET /list?lang=&from=&n=   the directory        GET /code/<CODE>
     GET  /oembed?url=&format=json            GET /health
     GET  any other path: the pages (shell.js)
   "game" in /play, /play/keep, /report and /admin/act is "<maker>/<game>" (or { maker, game }, or the six-letter code).
   Scheduled (nightly, 03:23 UTC): cron.js. */
import { json, bad, readJson, brake, LANGS } from "./util.js";
import { ensure, one } from "./db.js";
import { makerNew, makerEdit, makerGet, makerDelete, makerPublic } from "./makers.js";
import { gameNew, gameSave, gameMine, gameDelete, gameAnswers, gamePublic, listPublic, codePublic } from "./games.js";
import { imgPut, imgDel, imgGet, DEFAULT_MODEL } from "./images.js";
import { play, playKeep, report } from "./play.js";
import { adminQueue, adminAct, adminImg } from "./admin.js";
import { oembed } from "./oembed.js";
import { servePage } from "./shell.js";
import { nightly } from "./cron.js";

const ORIGINS = ["https://logicers.com", "https://www.logicers.com", "https://by.logicers.com"];
const SMALL = 16 * 1024, SAVE = 2600 * 1024;
const POSTS = {
  "/maker/new": makerNew, "/maker/edit": makerEdit, "/maker/get": makerGet, "/maker/delete": makerDelete,
  "/game/new": gameNew, "/game/save": gameSave, "/game/mine": gameMine, "/game/delete": gameDelete, "/game/answers": gameAnswers,
  "/img/del": imgDel, "/play": play, "/play/keep": playKeep, "/report": report,
  "/admin/queue": adminQueue, "/admin/act": adminAct, "/admin/img": adminImg,
};

/* which browser pages may call: logicers.com (My Logicers, our games), by.logicers.com (the Studio); ALLOW_ORIGINS adds
   more ("localhost" lets http://localhost:* in, for tests and wrangler dev). A call with no Origin is not a browser. */
function originOk(env, origin) {
  if (!origin) return true;
  if (ORIGINS.includes(origin)) return true;
  const extra = String(env.ALLOW_ORIGINS || "").split(/[,\s]+/).filter(Boolean);
  if (extra.includes(origin)) return true;
  return extra.includes("localhost") && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}
function withCors(r, origin, open) {
  const o = new Response(r.body, r);
  if (open) o.headers.set("Access-Control-Allow-Origin", "*");
  else if (origin) { o.headers.set("Access-Control-Allow-Origin", origin); o.headers.set("Vary", "Origin"); }
  return o;
}

async function handle(req, env, ctx) {
  const url = new URL(req.url);
  const path = url.pathname;
  const origin = req.headers.get("Origin");
  if (req.method === "OPTIONS") {
    const ok = origin && originOk(env, origin);
    return new Response(null, { status: 204, headers: {
      "Access-Control-Allow-Origin": ok ? origin : "*", "Vary": "Origin",
      "Access-Control-Allow-Methods": ok ? "GET, POST, OPTIONS" : "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" } });
  }
  if (req.method === "POST") {
    if (!originOk(env, origin)) return bad("origin", 403);
    const route = path.replace(/\/+$/, "");
    if (route === "/img/put") { await ensure(env); return withCors(await imgPut(env, req), origin); }
    const fn = POSTS[route];
    if (!fn) return withCors(bad("not_found", 404), origin);
    const r = await readJson(req, route === "/game/save" ? SAVE : SMALL);
    if (r.e) return withCors(bad(r.e === "big" ? "big" : "body", r.e === "big" ? 413 : 400), origin);
    await ensure(env);
    return withCors(await fn(env, req, r.body), origin);
  }
  if (req.method !== "GET" && req.method !== "HEAD") return bad("not_found", 405);

  if (path === "/health") {
    if (!brake("health", req, 60)) return bad("later", 429);
    let db = false;
    try { await ensure(env); await one(env, "SELECT 1 AS k"); db = true; } catch (x) { db = false; }
    return withCors(json({ ok: true, db, key: env.STUDIO_KEY ? "secret" : "missing", admin: !!env.ADMIN_KEY, img: !!env.IMG,
      ai: !!env.AI, model: String(env.IMAGE_CHECK_MODEL || DEFAULT_MODEL), assets: !!env.ASSETS }), null, true);
  }
  let m;
  if (path === "/oembed") { await ensure(env); return await oembed(env, req, url); }
  if (path === "/list" || path === "/list/") { await ensure(env); return withCors(await listPublic(env, req, url), null, true); }
  if ((m = /^\/g\/([a-z0-9-]{1,40})\/([a-z0-9-]{1,40})\/?$/.exec(path))) { await ensure(env); return withCors(await gamePublic(env, req, url, m[1], m[2]), null, true); }
  if ((m = /^\/m\/([a-z0-9-]{1,40})\/?$/.exec(path))) { await ensure(env); return withCors(await makerPublic(env, req, m[1]), null, true); }
  if ((m = /^\/i\/([a-z0-9-]{1,40}\/[a-z0-9-]{1,40})\/([a-z0-9.]{1,20})$/.exec(path))) { await ensure(env); return await imgGet(env, req, m[1], m[2]); }   // a picture (F)
  if ((m = /^\/code\/([A-Za-z]{6})\/?$/.exec(path))) { await ensure(env); return withCors(await codePublic(env, req, m[1]), null, true); }
  if (/^\/(g|m|i|code|maker|game|img|play|report|admin\/(queue|act|img))(\/|$)/.test(path) && !/^\/admin\/?$/.test(path)) return bad("not_found", 404);
  await ensure(env);
  return servePage(env, req, url);
}

export default {
  async fetch(req, env, ctx) {
    try { return await handle(req, env, ctx); }
    catch (e) {
      if (env.STUDIO_DEBUG) console.error("logicers-studio", e && e.stack || e);   // only when the variable is set (wrangler dev, the tests)
      return bad("server", 500);
    }
  },
  async scheduled(event, env, ctx) {
    ctx.waitUntil((async () => { try { await ensure(env); await nightly(env); } catch (e) { /* the next night tries again */ } })());
  },
};
export { LANGS };

/* for the tests */
import { setClock, brakes } from "./util.js";
import { SCHEMA } from "./db.js";
export const _test = { setClock, brakes, nightly, SCHEMA, originOk };
