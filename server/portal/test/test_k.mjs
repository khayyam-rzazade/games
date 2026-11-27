/* Chat K, 20 Nov 2026 (plan section 6, prompt K): the four fixes of Play Logicers after batch 3.
     1. the name goes to Play's home page ("/") from every page, and stays there on the home page; "by Logicers" goes to Logicers
     2. the language button opens the list of the open languages (a sheet); it no longer goes to the wall
     3. a page never lives in a browser without asking again; the edge key carries the deploy's version; what the edge
        serves keeps the Worker's own Cache-Control, whatever Cloudflare's "Browser Cache TTL" wrote over it
     4. Cloudflare Web Analytics is let in by the CSP of the public pages only
   Each test fails on the code before chat K. */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { _test, env, get, call, one, importGames, seedGames, SITE } from "./lib.mjs";
import { word } from "../src/words.js";

const re = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const brandOf = (t) => /<(h1|p) class="brand"><a class="brand-a" href="([^"]*)"( aria-current="page")?>/.exec(t);
/* a claimed game, the short way: a maker and its game */
async function claimed(e, slug) {
  const g = await one(e, "SELECT id FROM games WHERE slug = ?", slug);
  await e.DB.prepare("INSERT INTO makers (id, slug, name, key_hash, made) VALUES ('mk1', 'the-maker', 'The Maker', 'x', 1)").run();
  await e.DB.prepare("UPDATE games SET maker_id = 'mk1', claimed_at = 1 WHERE id = ?").bind(g.id).run();
  return g.id;
}

test("1. the name goes to Play's home page from every page; on the home page it stays there; 'by Logicers' goes to Logicers", async () => {
  const e = env();
  await importGames(e, seedGames("es", 3, "words").concat(seedGames("es", 2, "maps", "Map")));
  const id = await claimed(e, "game-es-1");
  const pages = ["/es/", "/es/maps/", "/es/g/game-es-2/", "/about/", "/about/?l=es", "/nothing-here/", "/es/nothing-here/", "/m/the-maker/", "/claim/?g=" + (await one(e, "SELECT id FROM games WHERE slug = 'game-es-2'")).id, "/claim/aaaaaaaaaaaaaaaaaaaaaaaa/", "/maker/"];
  for (const p of pages) {
    const r = await get(e, p), b = brandOf(r.text);
    assert.ok(b, p + ": the name is there");
    assert.equal(b[2], "/", p + ": the name goes to Play's home page");
    assert.equal(b[3], undefined, p + " is not the home page");
  }
  const wall = await get(e, "/"), b = brandOf(wall.text);
  assert.equal(b[2], "/", "the home page's name stays on the home page (it went to logicers.com)");
  assert.equal(b[3], ' aria-current="page"', "and says it is this page");
  assert.doesNotMatch(wall.text, /class="brand-a" href="https?:/, "the name never leaves Play Logicers");
  /* "by Logicers" keeps going to Logicers: its home in the page's language where Logicers has it */
  assert.match((await get(e, "/es/")).text, /<p class="brand-by"><a class="brand-by-a" href="https:\/\/logicers\.com\/es\/">/);
  assert.match((await get(e, "/es/maps/")).text, /<p class="brand-by"><a class="brand-by-a" href="https:\/\/logicers\.com\/es\/">/);
  assert.match(wall.text, /<a class="foot-lg" href="https:\/\/logicers\.com\/">/, "the home page's foot still goes to Logicers");
  assert.ok(id);
});

test("2. the language button opens the list of the open languages: their own names, the page's own marked, each a link; no new words", async () => {
  const e = env();
  await importGames(e, seedGames("es", 2).concat(seedGames("de", 5)));   // de opens (a language opens at its first game since 25 Nov 2026); ja has none and stays closed; en it tr es pt fr are Logicers' own
  const r = await get(e, "/es/");
  assert.doesNotMatch(r.text, /<a class="chip-lang"/, "the language button is no longer a link to the wall");
  const btn = /<button class="chip-lang" type="button" data-open="sheet-langs" aria-haspopup="dialog" aria-label="([^"]*)" title="([^"]*)">[^]*?<span class="chip-lang-t">Español<\/span>[^]*?<\/button>/.exec(r.text);
  assert.ok(btn, "a button that opens the languages' sheet");
  assert.equal(btn[1], word("es", "f.lang") + ": Español", "named by the word Language and the language's own name");
  const dlg = /<dialog class="sheet sheet-langs" id="sheet-langs" aria-labelledby="sheet-langs-h">([^]*?)<\/dialog>/.exec(r.text);
  assert.ok(dlg, "the sheet is in the page");
  assert.match(dlg[1], new RegExp(`<h2 class="sheet-h" id="sheet-langs-h">${re(word("es", "f.lang"))}</h2>`), "its title is the add sheet's word for Language");
  assert.match(dlg[1], new RegExp(`<button class="sheet-x" type="button" data-close aria-label="${re(word("es", "close"))}">`), "its × is Close");
  const opts = [...dlg[1].matchAll(/<li><a class="lang-opt" href="\/([a-z-]+)\/" lang="([^"]+)" dir="(ltr|rtl)"( aria-current="page")?><span class="lang-opt-t">([^<]+)<\/span>/g)];
  assert.deepEqual(opts.map((m) => m[5]), ["Deutsch", "English", "Español", "Français", "Italiano", "Português", "Türkçe"], "the open languages only, by their own names, in the add sheet's order");
  assert.deepEqual(opts.map((m) => m[1]), ["de", "en", "es", "fr", "it", "pt", "tr"], "each a link to that language's page");
  assert.deepEqual(opts.filter((m) => m[4]).map((m) => m[1]), ["es"], "the page's own language is the one marked");
  assert.doesNotMatch(dlg[1], /日本語|\/ja\//, "a language that is not open is not offered");
  assert.equal((dlg[1].match(/<a /g) || []).length, 7, "nothing else in the list");
  /* the German page marks German; pages below a language's page have the back button, not the language button */
  const de = await get(e, "/de/");
  assert.match(de.text, /<a class="lang-opt" href="\/de\/" lang="de" dir="ltr" aria-current="page">/);
  assert.equal((de.text.match(/aria-current="page"/g) || []).length, 1);
  assert.doesNotMatch((await get(e, "/es/words/")).text, /sheet-langs|chip-lang/);
  /* no new words: the sheet uses f.lang and close, which every language already has in its own file */
  const dir = fileURLToPath(new URL("../words/", import.meta.url));
  const en = Object.keys(JSON.parse(fs.readFileSync(dir + "en.json", "utf8")));
  assert.equal(en.filter((k) => !/\.(one|few|many)$/.test(k) && !/^(claim|maker|mail)\./.test(k) && !/^seo\.words_[td]$/.test(k) && k !== "search" && k !== "open_site").length, 57, "the words are the 57 of before chat K (chat N's claim words, chat X's two search words, chat S's search and chat Inside's open_site aside)");
  for (const f of fs.readdirSync(dir)) { const w = JSON.parse(fs.readFileSync(dir + f, "utf8")); assert.ok(w["f.lang"] && w.close, f + " has both"); }
});

/* Cloudflare's edge cache as the Worker sees it, with what "Browser Cache TTL" (4 hours) does to what it serves */
class EdgeCache {
  constructor() { this.m = new Map(); this.puts = []; }
  async match(r) {
    const x = this.m.get(r.url);
    if (!x) return undefined;
    const res = x.clone(), h = new Headers(res.headers), cc = h.get("Cache-Control") || "";
    const age = /(^|[\s,])max-age=(\d+)/.exec(cc);
    if (age && +age[2] < 14400) h.set("Cache-Control", cc.replace(/(^|[\s,])max-age=\d+/, "$1max-age=14400"));
    return new Response(res.body, { status: res.status, headers: h });
  }
  async put(r, res) { this.puts.push(r.url); this.m.set(r.url, res.clone()); }
}
async function withEdge(fn) {
  const saved = globalThis.caches, edge = new EdgeCache();
  globalThis.caches = { default: edge };
  try { return await fn(edge); } finally { globalThis.caches = saved; }
}

test("3. a page never lives in a browser without asking again, at the edge five minutes; an answer from the edge keeps the Worker's own Cache-Control", async () => {
  const e = env();
  await importGames(e, seedGames("es", 2));
  const want = "public, max-age=0, must-revalidate, s-maxage=300";
  assert.equal(_test.HTML_CACHE, want);
  /* workerd refuses to start a Worker whose main module exports a plain value (it takes every export for a handler) */
  const mod = await import("../src/index.js");
  for (const [k, v] of Object.entries(mod)) assert.ok(typeof v === "function" || (v && typeof v === "object"), "src/index.js exports " + k + " as a " + typeof v);
  await withEdge(async (edge) => {
    for (const p of ["/", "/es/", "/es/words/", "/es/g/game-es-1/", "/about/"]) {
      const first = await get(e, p);
      assert.equal(first.headers.get("Cache-Control"), want, p + ": the Worker's answer");
      assert.equal(first.headers.get("PL-Cache-Control"), null, p + ": the kept copy's note never leaves the Worker");
      e.DB.reset();
      const hit = await get(e, p);
      assert.equal(e.DB.calls, 0, p + ": the second answer is the edge's");
      assert.equal(hit.headers.get("Cache-Control"), want, p + ": from the edge, still the Worker's own header (Cloudflare had written max-age=14400 over it)");
      assert.equal(hit.headers.get("PL-Cache-Control"), null);
      assert.equal(hit.text, first.text);
      assert.match(hit.headers.get("Content-Security-Policy"), /cloudflareinsights/, "and the page's other headers are kept");
    }
    /* the counts and the dice too: sixty seconds and five minutes, never four hours */
    for (const [p, cc] of [["/api/counts?lang=es", "public, max-age=60"], ["/api/es/dice", "public, max-age=300, s-maxage=300"]]) {
      assert.equal((await get(e, p)).headers.get("Cache-Control"), cc);
      e.DB.reset();
      const hit = await get(e, p);
      assert.equal(e.DB.calls, 0);
      assert.equal(hit.headers.get("Cache-Control"), cc, p + ": from the edge, the Worker's own header");
    }
    assert.ok(edge.puts.length >= 7);
    /* what the edge keeps says only how long the edge keeps it, with the Worker's own header beside it */
    const kept = (p) => [...edge.m.entries()].find(([k]) => new URL(k).pathname === p)[1].headers;
    assert.equal(kept("/es/").get("Cache-Control"), "public, max-age=300");
    assert.equal(kept("/es/").get("PL-Cache-Control"), want);
    assert.equal(kept("/api/counts").get("Cache-Control"), "public, max-age=60");
    assert.equal(kept("/api/es/dice").get("Cache-Control"), "public, max-age=300");
  });
  /* what is never kept stays so */
  for (const p of ["/admin/", "/maker/", "/claim/aaaaaaaaaaaaaaaaaaaaaaaa/"]) assert.equal((await get(e, p)).headers.get("Cache-Control"), "no-store", p);
});

test("3. the edge key carries the deploy's version: a new deploy shows its pages at once, the same deploy serves from the edge", async () => {
  const k = (u, v) => _test.cacheKey(new URL(u), v);
  assert.match(_test.versionOf({}), /^[0-9a-f]{8}$/);
  assert.equal(_test.versionOf({}), _test.versionOf({ CF_VERSION_METADATA: {} }), "no id (a local run): the files' stamps alone");
  assert.notEqual(_test.versionOf({ CF_VERSION_METADATA: { id: "8f2b6a1c-1" } }), _test.versionOf({ CF_VERSION_METADATA: { id: "8f2b6a1c-2" } }), "another deploy, another version");
  assert.notEqual(_test.versionOf({}), _test.versionOf({ CF_VERSION_METADATA: { id: "8f2b6a1c-1" } }));
  assert.equal(k("https://play.logicers.com/es/?x=1", "abcd1234"), "https://play.logicers.com/es/?v=abcd1234", "the version, and still no parameter of a stranger's");
  assert.equal(k("https://play.logicers.com/about/?l=es&x=1", "abcd1234"), "https://play.logicers.com/about/?l=es&v=abcd1234");
  assert.equal(k("https://play.logicers.com/api/counts?lang=es&v=zzz", "abcd1234"), "https://play.logicers.com/api/counts?lang=es&v=abcd1234", "a v= in the address is not the key's");
  const db = env().DB;
  const v1 = env({ DB: db, CF_VERSION_METADATA: { id: "deploy-1" } }), v2 = env({ DB: db, CF_VERSION_METADATA: { id: "deploy-2" } });
  await importGames(v1, seedGames("es", 2));
  await withEdge(async (edge) => {
    await get(v1, "/es/");
    assert.match(edge.puts[0], new RegExp("^https://play\\.logicers\\.com/es/\\?v=" + _test.versionOf(v1) + "$"), "the key is the path and the version");
    db.reset();
    await get(v1, "/es/?utm=1");
    assert.equal(db.calls, 0, "the same deploy: from the edge");
    await get(v2, "/es/");
    assert.ok(db.calls > 0, "a new deploy: its own page, made now, not the one kept by the deploy before");
    assert.equal(edge.puts.length, 2);
    db.reset();
    await get(v2, "/es/");
    assert.equal(db.calls, 0, "and kept from then on");
    await get(v1, "/api/counts?lang=es");
    db.reset();
    await get(v2, "/api/counts?lang=es");
    assert.ok(db.calls > 0, "the counts and the dice are keyed the same way");
  });
  /* wrangler.jsonc asks Cloudflare for the version's id under the name the Worker reads */
  const raw = fs.readFileSync(fileURLToPath(new URL("../wrangler.jsonc", import.meta.url)), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  assert.deepEqual(JSON.parse(raw).version_metadata, { binding: "CF_VERSION_METADATA" });
});

test("4. Cloudflare Web Analytics is let in on the public pages only: not on the queue, the claim pages or the maker's form", async () => {
  const e = env();
  await importGames(e, seedGames("es", 2));
  await claimed(e, "game-es-1");
  const g2 = (await one(e, "SELECT id FROM games WHERE slug = 'game-es-2'")).id;
  const strict = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'";
  const open = "default-src 'self'; script-src 'self' https://static.cloudflareinsights.com; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://cloudflareinsights.com; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'";
  for (const p of ["/", "/about/", "/about/?l=es", "/m/the-maker/", "/nothing-here/", "/es/nothing-here/"])
    assert.equal((await get(e, p)).headers.get("Content-Security-Policy"), open, p + ": a public page");
  /* chat M, 26 Nov 2026: a language's page, a kind page and a game page also let in the one frame of the bridge to My Logicers */
  for (const p of ["/es/", "/es/words/", "/es/g/game-es-1/", "/es/g/game-es-2/"])
    assert.equal((await get(e, p)).headers.get("Content-Security-Policy"), open + "; frame-src https://logicers.com/portal/bridge.html", p + ": a public page with the bridge");
  for (const p of ["/claim/?g=" + g2, "/claim/aaaaaaaaaaaaaaaaaaaaaaaa/", "/maker/", "/maker/?l=es"])
    assert.equal((await get(e, p)).headers.get("Content-Security-Policy"), strict, p + ": never anyone else's script");
  const ad = (await get(e, "/admin/")).headers.get("Content-Security-Policy");
  assert.equal(ad, strict + "; require-trusted-types-for 'script'; trusted-types portal-admin", "the queue");
  /* nothing else was opened: one host for scripts, one for its reports, on our own pages only */
  assert.equal((open.match(/https:/g) || []).length, 2);
  assert.match((await get(e, "/about/")).text, /Cloudflare, which serves these pages, also counts visits for us, without cookies\./, "About says so");
  /* a call from Cloudflare's hosts gets no CORS: the API stays the portal's own */
  const r = await call(e, "POST", "/api/view", { lang: "es", id: "xxxxxxxxxxxxxxxxxxxxxA" }, { origin: "https://cloudflareinsights.com" });
  assert.equal(r.status, 403);
  assert.equal(SITE, "https://play.logicers.com");
});
