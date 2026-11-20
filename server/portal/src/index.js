/* Play Logicers — the Worker (logicers-portal: a Cloudflare Worker with a D1 database), which serves every page of
   play.logicers.com from the server, the API, the queue and the nightly job. Chat A, 19 Nov 2026. The plan and the
   contract: the project doc claude/play-logicers-plan.md, sections 2 and 3. README.md lists every route and error key.

   Pages (HTML, rendered here, cached at the edge 5 minutes; the numbers come live from /api/counts):
     /                      the wall, Play Logicers
     /<lang>/               a language's page (Play Español); a language that is not open: 302 to /
     /<lang>/<kind>/        one kind in that language (a kind with no game: 404)
     /<lang>/g/<slug>/      one game (a hidden, dead or rejected one: 410)
     /about/                About (English; ?l=<code> adds one line in that language)
     /admin/                the queue (English, never indexed, never cached)
     /sitemap.xml  /sitemap-root.xml  /<lang>/sitemap.xml  /robots.txt  /health
     anything else: 404 in the page's language
   Static files under /a/ (chat B) never reach this Worker (wrangler.jsonc run_worker_first: "!/a/*"). Every other path
   does; a path with a file extension that is not ours is passed to the static files (a favicon, say).
   POST (JSON):  /api/hit /api/view /api/add /api/report (api.js)    /admin/queue /admin/game /admin/act /admin/import (admin.js)
   GET (JSON):   /api/langs  /api/<lang>/games  /api/counts
   Kept: see api.js and db.js. Never kept: an IP address, a user agent, the device id itself. Workers Logs stay off. */
import { json, bad, readJson, brake, isLocal } from "./util.js";
import { ensure, one, all, openSet, langData, wallData, gameBySlug, gameData, KINDS } from "./db.js";
import { LANG, isLang, CODES } from "./langs.js";
import { lgRowLang, lgShown, lgOfKind, lgForGame, lgEn, EN_LINE, LG_HOME } from "./logicers.js";
import { pageWall, pageLang, pageKind, pageGame, pageAbout, pageNotFound, pageAdmin, CSP, CSP_ADMIN } from "./pages.js";
import { hit, view, add, report, langsApi, gamesApi, countsApi } from "./api.js";
import { adminQueue, adminGame, adminAct, adminImport } from "./admin.js";
import { nightly } from "./cron.js";

const SMALL = 8 * 1024, IMPORT = 1024 * 1024;
const API_POSTS = { "/api/hit": hit, "/api/view": view, "/api/add": add, "/api/report": report };
const ADMIN_POSTS = { "/admin/queue": adminQueue, "/admin/game": adminGame, "/admin/act": adminAct, "/admin/import": adminImport };
const siteOf = (env) => String(env.SITE || "https://play.logicers.com").replace(/\/+$/, "");

/* which browser pages may call: the portal itself; ALLOW_ORIGINS adds more ("localhost" lets http://localhost:* in, for
   tests and wrangler dev, and http://play.logicers.com, the Origin wrangler dev passes on). logicers.com may send /api/hit in phase 2 (plan section 3): add it then. */
export function originOk(env, origin) {
  if (!origin) return false;
  if (origin === siteOf(env)) return true;
  const extra = String(env.ALLOW_ORIGINS || "").split(/[,\s]+/).filter(Boolean);
  if (extra.includes(origin)) return true;
  /* wrangler dev rewrites a browser's Origin http://localhost:8787 to the route's host over http (seen on 19 Nov 2026) */
  return extra.includes("localhost") && (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) || origin === siteOf(env).replace(/^https:/, "http:"));
}
function cors(r, origin, env) {
  if (!origin || !originOk(env, origin)) return r;
  const o = new Response(r.body, r);
  o.headers.set("Access-Control-Allow-Origin", origin);
  o.headers.set("Vary", "Origin");
  return o;
}

/* ---- HTML answers ---- */
function html(body, status, o) {
  o = o || {};
  const h = {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": o.cache || "public, max-age=60, s-maxage=300",
    "Content-Security-Policy": o.csp || CSP,
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  };
  if (o.noindex) h["X-Robots-Tag"] = o.noindex === true ? "noindex" : o.noindex;
  return new Response(body, { status: status || 200, headers: h });
}
function text(body, type, cache) {
  return new Response(body, { headers: { "Content-Type": type, "Cache-Control": cache || "public, max-age=300, s-maxage=3600", "X-Content-Type-Options": "nosniff" } });
}
const redirect = (to, status) => new Response(null, { status: status || 302, headers: { Location: to, "Cache-Control": status === 301 ? "public, max-age=3600" : "no-store" } });

/* the edge cache (Cloudflare's Cache API; absent in the tests): GET pages 5 minutes, /api/counts 60 s.
   The key is the path and the parameters a page reads, and nothing else (chat H, 20 Nov 2026, plan 2.15), so "?x=1" on any
   page cannot skip the cache and make the database work: /about/ keeps "l" (a language code), /api/counts keeps "lang" (a
   code; any other value answers "bad" and is never kept). */
const KEEP = { "/about/": "l", "/api/counts": "lang", "/api/counts/": "lang" };
export function cacheKey(u) {
  const k = KEEP[u.pathname], v = k ? u.searchParams.get(k) : null;
  const q = v === null ? "" : "?" + k + "=" + (isLang(v) ? v : "_");
  return u.origin + u.pathname + q;
}
async function cached(req, env, ctx, make) {
  const cache = typeof caches !== "undefined" && caches.default ? caches.default : null;
  if (!cache || req.method !== "GET" || isLocal(env)) return make();            // a local run (wrangler dev, check.py): never kept
  const key = new Request(cacheKey(new URL(req.url)), { method: "GET" });
  const hitR = await cache.match(key);
  if (hitR) return hitR;
  const res = await make();
  if (res.status === 200 && /s-maxage|max-age/.test(res.headers.get("Cache-Control") || "") && !/no-store|private/.test(res.headers.get("Cache-Control") || "")) {
    const p = cache.put(key, res.clone());
    if (ctx && ctx.waitUntil) ctx.waitUntil(p); else await p;
  }
  return res;
}

async function langPageData(env, lang) {
  const lgLang = lgRowLang(lang);
  const d = await langData(env, lang, lgLang);
  const all = lgShown(lang, d.lg);
  return { lang, lgLang, lgRow: lgEn(lang) ? all.slice(0, EN_LINE) : all, lgInfo: d.lg, byKind: d.byKind, page_today: d.page, lgHome: LG_HOME(lang) };
}

async function notFound(env, site, lang, open) {
  if (lang && open.has(lang)) {
    const d = await langPageData(env, lang);
    return html(pageNotFound(Object.assign({ site }, d)), 404, { noindex: true, cache: "public, max-age=60" });
  }
  const w = await wallData(env);
  return html(pageNotFound({ site, langs: w.langs }), 404, { noindex: true, cache: "public, max-age=60" });
}

/* ---- sitemaps ---- */
const xmlEsc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const urlset = (urls) => '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + urls.map((u) => "<url><loc>" + xmlEsc(u.loc) + "</loc>" + (u.lastmod ? "<lastmod>" + u.lastmod + "</lastmod>" : "") + "</url>").join("\n") + "\n</urlset>\n";
async function sitemapIndex(env, site) {
  const open = [...(await openSet(env))].filter((c) => LANG.has(c)).sort();
  const maps = [site + "/sitemap-root.xml"].concat(open.map((c) => site + "/" + c + "/sitemap.xml"));
  return '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + maps.map((m) => "<sitemap><loc>" + xmlEsc(m) + "</loc></sitemap>").join("\n") + "\n</sitemapindex>\n";
}
/* a language's sitemap: its page and its kind pages. Game pages are left out (and carry noindex, follow) until claimed
   games give them a picture and words of their own (plan 2.15, 20 Nov 2026): thin pages by the thousand can pull a whole
   site down in search; the language and kind pages are what should rank. */
async function sitemapLang(env, site, lang) {
  const rows = await all(env, "SELECT kind, MAX(listed_at) AS t FROM games WHERE lang = ? AND status = 'listed' AND source <> 'logicers' GROUP BY kind", lang);
  const day = (t) => (t ? new Date(t).toISOString().slice(0, 10) : null);
  const last = rows.reduce((m, r) => Math.max(m, r.t || 0), 0);
  return urlset([{ loc: site + "/" + lang + "/", lastmod: day(last) }].concat(KINDS.filter((k) => rows.some((r) => r.kind === k))
    .map((k) => ({ loc: site + "/" + lang + "/" + k + "/", lastmod: day(rows.find((r) => r.kind === k).t) }))));
}

async function page(req, env, ctx, url) {
  const site = siteOf(env);
  let path = url.pathname;
  if (/[A-Z]/.test(path) && !/\.[a-z0-9]{1,8}$/i.test(path)) return redirect(site + path.toLowerCase() + url.search, 301);
  if (!path.endsWith("/") && !/\.[a-z0-9]{1,8}$/i.test(path)) return redirect(site + path + "/" + url.search, 301);
  const segs = path.split("/").filter(Boolean);

  if (path === "/robots.txt") return text(`User-agent: *\nDisallow: /admin/\nDisallow: /api/\nSitemap: ${site}/sitemap.xml\n`, "text/plain; charset=utf-8");
  if (path === "/sitemap.xml") return text(await sitemapIndex(env, site), "application/xml; charset=utf-8", "public, max-age=3600");
  if (path === "/sitemap-root.xml") return text(urlset([{ loc: site + "/" }, { loc: site + "/about/" }]), "application/xml; charset=utf-8", "public, max-age=3600");
  if (segs[0] === "admin" && segs.length === 1) return html(pageAdmin({ site }), 200, { noindex: true, cache: "no-store", csp: CSP_ADMIN });
  if (/\.[a-z0-9]{1,8}$/i.test(path) && !(segs.length === 2 && segs[1] === "sitemap.xml")) {
    if (env.ASSETS) { try { const r = await env.ASSETS.fetch(req); if (r.status !== 404) return r; } catch (x) { /* none */ } }
    return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" } });
  }

  return cached(req, env, ctx, async () => {
    const open = await openSet(env);
    if (segs.length === 0) {
      const w = await wallData(env);
      w.langs.sort((a, b) => b.games - a.games || CODES.indexOf(a.code) - CODES.indexOf(b.code));
      return html(pageWall({ site, langs: w.langs.filter((l) => LANG.has(l.code)), today: w.today, lgHome: "https://logicers.com/" }));
    }
    if (segs[0] === "about" && segs.length === 1) {
      const l = url.searchParams.get("l");
      return html(pageAbout({ site, local: isLang(l) && open.has(l) ? l : null, lgHome: "https://logicers.com/" }));
    }
    const lang = segs[0];
    if (!isLang(lang)) return notFound(env, site, null, open);
    if (!open.has(lang)) return redirect(site + "/", 302);
    if (segs.length === 2 && segs[1] === "sitemap.xml") return text(await sitemapLang(env, site, lang), "application/xml; charset=utf-8", "public, max-age=3600");
    if (segs.length === 1) return html(pageLang(Object.assign({ site }, await langPageData(env, lang))));
    if (segs.length === 2 && KINDS.includes(segs[1])) {
      const d = await langPageData(env, lang);
      if (!d.byKind[segs[1]].length) return notFound(env, site, lang, open);
      return html(pageKind(Object.assign({ site, kind: segs[1], lgKind: lgOfKind(lang, d.lgInfo, segs[1]) }, d)));
    }
    if (segs.length === 3 && segs[1] === "g") {
      const g = await gameBySlug(env, lang, segs[2]);
      if (g && g.status === "listed" && g.source !== "logicers") {
        const lgLang = lgRowLang(lang);
        const gd = await gameData(env, g, lgLang);
        return html(pageGame(Object.assign({ site, lang, lgLang, game: g, lgHome: LG_HOME(lang), lgGame: lgForGame(lang, gd.lg, g.kind) }, gd)),
          200, { noindex: "noindex, follow" });
      }
      if (g && g.source !== "logicers") {                                   // hidden, dead, rejected, left: gone, not indexed
        const d = await langPageData(env, lang);
        return html(pageNotFound(Object.assign({ site }, d)), 410, { noindex: true, cache: "public, max-age=60" });
      }
    }
    return notFound(env, site, lang, open);
  });
}

async function handle(req, env, ctx) {
  const url = new URL(req.url);
  const path = url.pathname;
  const origin = req.headers.get("Origin");
  if (req.method === "OPTIONS") {
    const ok = originOk(env, origin);
    return new Response(null, { status: 204, headers: ok ? { "Access-Control-Allow-Origin": origin, "Vary": "Origin",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" } : {} });
  }
  if (req.method === "POST") {
    const route = path.replace(/\/+$/, "");
    const fn = API_POSTS[route] || ADMIN_POSTS[route];
    if (!fn) return bad("not_found", 404);
    /* the API counts only from the portal's own pages; the queue also takes calls with no Origin (Terminal: the import) */
    if (API_POSTS[route] ? !originOk(env, origin) : origin && !originOk(env, origin)) return bad("origin", 403);
    const r = await readJson(req, route === "/admin/import" ? IMPORT : SMALL);
    if (r.e) return cors(bad(r.e, r.e === "big" ? 413 : 400), origin, env);
    await ensure(env);
    return cors(await fn(env, req, r.body, ctx), origin, env);
  }
  if (req.method !== "GET" && req.method !== "HEAD") return bad("not_found", 405);
  let m;
  if (path === "/health") {
    if (!brake("health", req)) return bad("busy", 429);
    let db = false;
    try { await ensure(env); await one(env, "SELECT 1 AS k"); db = true; } catch (x) { db = false; }
    return json({ ok: true, db, key: env.PORTAL_KEY ? "secret" : "missing", admin: !!env.ADMIN_KEY, review: !!env.REVIEW_KEY, assets: !!env.ASSETS });
  }
  if (path.startsWith("/api/")) {
    if (!brake("read", req)) return bad("busy", 429);
    await ensure(env);
    if (path === "/api/langs" || path === "/api/langs/") return cors(await langsApi(env), origin, env);
    if (path === "/api/counts" || path === "/api/counts/") return cors(await cached(req, env, ctx, () => countsApi(env, req, url)), origin, env);
    if ((m = /^\/api\/([a-z]{2,3}(?:-[a-z]{4})?)\/games\/?$/.exec(path))) return cors(await gamesApi(env, req, url, m[1]), origin, env);
    return bad("not_found", 404);
  }
  if (/^\/admin\/(queue|game|act|import)\/?$/.test(path)) return bad("not_found", 405);
  if (path.startsWith("/a/") && env.ASSETS) return env.ASSETS.fetch(req);   // not in production (wrangler.jsonc); in local runs only
  await ensure(env);
  const res = await page(req, env, ctx, url);
  return req.method === "HEAD" ? new Response(null, res) : res;
}

export default {
  async fetch(req, env, ctx) {
    try { return await handle(req, env, ctx); }
    catch (e) {
      if (env.PORTAL_DEBUG) console.error("logicers-portal", e && e.stack || e);
      const p = new URL(req.url).pathname;
      if (req.method === "POST" || p.startsWith("/api/")) return bad("server", 500);
      return html("<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><title>Play Logicers</title></head><body><p>Nothing here.</p></body></html>", 500, { noindex: true, cache: "no-store" });
    }
  },
  /* The run is awaited, not only handed to waitUntil: Cloudflare promises a cron its 15 minutes for the promise this
     handler returns; work left in waitUntil alone may be cut soon after the handler ends, and the link check writes
     everything in one batch at its end, so a cut night would keep nothing (general check, 19 Nov 2026). */
  async scheduled(event, env, ctx) {
    const run = (async () => { try { await ensure(env); await nightly(env); } catch (e) { /* the next night tries again */ } })();
    if (ctx && ctx.waitUntil) ctx.waitUntil(run);
    await run;
  },
};

/* for the tests */
import { setClock, brakes } from "./util.js";
import { SCHEMA } from "./db.js";
export const _test = { setClock, brakes, nightly, SCHEMA, originOk, cacheKey };
