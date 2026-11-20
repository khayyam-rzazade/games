/* The pages (plan 2.5, 2.2, 2.15): every route, <html lang>, titles, canonical, JSON-LD, noindex, no hreflang, the names
   (Graj po polsku), 404 in the page's language, 302 for a language that is not open, 410 for a game taken off. */
import test from "node:test";
import assert from "node:assert/strict";
import { env, get, call, importGames, seedGames, admin, A, SITE, one } from "./lib.mjs";
import { word } from "../src/words.js";
const W = (lang, key) => word(lang, key).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");   /* a word as the page writes it (C's files, 19 Nov 2026) */
const re = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const title = (t) => (/<title>([^<]*)<\/title>/.exec(t) || [])[1];
const canon = (t) => (/<link rel="canonical" href="([^"]*)">/.exec(t) || [])[1];
const htmlTag = (t) => (/<html[^>]*>/.exec(t) || [])[0];
const ld = (t) => { const m = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(t); return m ? JSON.parse(m[1]) : null; };
const noindex = (r) => /<meta name="robots" content="noindex">/.test(r.text) && r.headers.get("X-Robots-Tag") === "noindex";
const unesc = (s) => s.replace(/&#39;/g, "'").replace(/&amp;/g, "&");

test("the six Logicers languages open at once; the wall lists them with their games", async () => {
  const e = env();
  const r = await get(e, "/");
  assert.equal(r.status, 200);
  assert.equal(title(r.text), "Play Logicers");
  assert.equal(canon(r.text), SITE + "/");
  assert.match(htmlTag(r.text), /lang="en"/);
  for (const c of ["en", "it", "tr", "es", "pt", "fr"]) assert.match(r.text, new RegExp(`<li class="lang" data-lang="${c}"[^>]*><a class="lang-a" href="/${c}/"><span class="lang-name">[^<]+</span><span class="lang-n">12</span>`));
  assert.doesNotMatch(r.text, /data-lang="de"/);
  assert.doesNotMatch(r.text, /hreflang/i, "no hreflang (2.15)");
  assert.equal(ld(r.text)["@graph"][0]["@type"], "ItemList");
  assert.match(r.text, /<select name="lang" required>/, "the wall's add sheet asks the language");
  const opts = [...r.text.matchAll(/<option value="([a-z-]+)"/g)].map((m) => m[1]);
  assert.equal(opts.length, 51, "every language of 2.13, opened or not (Chinese as two)");
  assert.ok(!noindex(r));
});

test("a language page: name, lang, title, canonical, rows, JSON-LD, words from its file", async () => {
  const e = env();
  await importGames(e, seedGames("es", 3, "words").concat(seedGames("es", 2, "maps", "Map")));
  const r = await get(e, "/es/");
  assert.equal(r.status, 200);
  assert.match(htmlTag(r.text), /lang="es" dir="ltr"/);
  assert.equal(title(r.text), "Play Español · " + word("es", "seo.daily"));
  assert.equal(canon(r.text), SITE + "/es/");
  assert.match(r.text, /<h1 class="brand"><a class="brand-a" href="\/es\/"><span class="brand-play">Play<\/span> <span class="brand-lang">Español<\/span><\/a><\/h1>/);
  assert.match(r.text, new RegExp(`<p class="brand-by">${re(W("es", "by"))}</p>`));
  assert.match(r.text, /<section class="row row-mine" id="row-mine"[^>]*hidden>/);
  const iLg = r.text.indexOf('class="row row-lg"'), iW = r.text.indexOf('id="k-words"'), iM = r.text.indexOf('id="k-maps"'), iWanted = r.text.indexOf('class="row row-wanted"');
  assert.ok(iLg > 0 && iLg < iW && iW < iM && iM < iWanted, "Yours, From Logicers, the kinds by their size, Wanted");
  assert.match(r.text, /href="https:\/\/logicers.com\/es\/same-energy\/" target="_blank" rel="noopener" data-hit/);
  assert.doesNotMatch(r.text.replace(/<template[\s\S]*?<\/template>/, ""), /tile-chip/, "no EN chip where Logicers has the language");
  assert.match(r.text, /data-open="sheet-add" data-kind="music"/, "Wanted: a kind with no game");
  assert.doesNotMatch(r.text, /data-kind="words"><svg[^>]*><use href="\/a\/icons.svg#k-words"><\/use><\/svg><span class="wanted-t">/);
  assert.match(r.text, /<input type="hidden" name="lang" value="es">/);
  const g = ld(r.text)["@graph"];
  assert.deepEqual(g.map((x) => x["@type"]), ["ItemList", "ItemList", "ItemList"]);
  assert.equal(g[1].itemListElement[0].url.startsWith(SITE + "/es/g/"), true);
  assert.doesNotMatch(r.text, /hreflang/i);
  assert.doesNotMatch(r.text, /\sstyle=/, "no inline style");
  assert.equal([...r.text.matchAll(/<script\b[^>]*>/g)].filter((m) => !/type="application\/(ld\+)?json"|src="\/a\//.test(m[0])).length, 0, "no inline script");
  assert.match(r.headers.get("Content-Security-Policy"), /script-src 'self'; style-src 'self'/);
  /* a word from the page's own file */
  const es = JSON.parse((await import("node:fs")).readFileSync(new URL("../words/es.json", import.meta.url), "utf8"));
  assert.ok(r.text.includes(unesc(es.from_logicers).replace(/'/g, "&#39;")) || r.text.includes(es.from_logicers));
});

test("a language without Logicers shows the English games with the EN chip", async () => {
  const e = env();
  await importGames(e, seedGames("de", 5));
  const r = await get(e, "/de/");
  assert.equal(r.status, 200);
  assert.match(r.text, /href="https:\/\/logicers.com\/same-energy\/"[^>]*data-hit><span class="tile-chip" lang="en">EN<\/span>/);
  assert.match(r.text, /<a class="tile-name" href="https:\/\/logicers.com\/same-energy\/" target="_blank" rel="noopener" data-hit tabindex="-1" aria-hidden="true" lang="en">Same Energy<\/a>/);
});

test("Graj po polsku on the Polish page (chat C's choice; the wall and the chip keep the endonym Polski)", async () => {
  const e = env();
  await importGames(e, seedGames("pl", 5));
  const r = await get(e, "/pl/");
  assert.equal(r.status, 200);
  assert.match(htmlTag(r.text), /lang="pl"/);
  assert.match(r.text, /<span class="brand-play">Graj<\/span> <span class="brand-lang">po polsku<\/span>/);
  assert.match(title(r.text), /^Graj po polsku · /);
  assert.match(r.text, /<span class="chip-lang-t">Polski<\/span>/);
  assert.doesNotMatch(r.text, /<span class="brand-play">Play<\/span>/);
  const g = await get(e, "/pl/g/game-pl-1/");
  assert.match(title(g.text), / · Graj po polsku$/);
  const l = await get(e, "/api/langs");
  assert.equal(l.json.langs.find((x) => x.code === "pl").name, "Graj po polsku");
  const w = await get(e, "/");
  assert.match(w.text, /<li class="lang" data-lang="pl"[^>]*><a class="lang-a" href="\/pl\/"><span class="lang-name">Polski<\/span>/);
});

test("Play 日本語 and a right-to-left language carry their lang and dir", async () => {
  const e = env();
  await importGames(e, seedGames("ja", 5).concat(seedGames("ar", 5)));
  const ja = await get(e, "/ja/");
  assert.match(htmlTag(ja.text), /lang="ja" dir="ltr"/);
  assert.match(ja.text, /<span class="brand-play">Play<\/span> <span class="brand-lang">日本語<\/span>/);
  const ar = await get(e, "/ar/");
  assert.match(htmlTag(ar.text), /lang="ar" dir="rtl"/);
});

test("a kind page, a game page (VideoGame), More, and a kind with no game", async () => {
  const e = env();
  await importGames(e, seedGames("es", 14, "words"));
  const lp = await get(e, "/es/");
  assert.match(lp.text, /<a class="row-more" href="\/es\/words\/">/, "a row past 12 has More");
  assert.equal((lp.text.match(/id="k-words"[\s\S]*?<\/section>/)[0].match(/<li class="tile /g) || []).length, 12);
  const k = await get(e, "/es/words/");
  assert.equal(k.status, 200);
  assert.equal(title(k.text), word("es", "cat.words") + " · " + word("es", "seo.daily") + " · Play Español");
  assert.equal(canon(k.text), SITE + "/es/words/");
  assert.equal((k.text.match(/<li class="tile (?![^"]*tile-lg)/g) || []).length, 14);
  assert.equal((k.text.match(/<li class="tile [^"]*tile-lg/g) || []).length, 3, "Logicers' three word games first (chat H)");
  assert.equal(ld(k.text)["@graph"][0].numberOfItems, 14);
  assert.equal((await get(e, "/es/music/")).status, 404);
  const g = await get(e, "/es/g/game-es-1/");
  assert.equal(g.status, 200);
  assert.equal(title(g.text), "Game es 1 · Play Español");
  assert.equal(canon(g.text), SITE + "/es/g/game-es-1/");
  const vg = ld(g.text);
  assert.equal(vg["@type"], "VideoGame");
  assert.equal(vg.inLanguage, "es");
  assert.equal(vg.url, "https://g1-es.example.org/");
  assert.ok(vg.genre);
  assert.match(g.text, /<a class="btn btn-play" href="https:\/\/g1-es.example.org\/" target="_blank" rel="noopener" data-hit>/);
  assert.doesNotMatch(g.text, /nofollow/);
  assert.match(g.text, /<span class="mail">logicers.world@gmail.com<\/span>/);
  assert.equal((g.text.match(/id="h-same"[\s\S]*?<\/section>/)[0].match(/<li class="tile /g) || []).length, 4, "same kind: four tiles");
  assert.match(g.text, /<dialog class="sheet sheet-report"/);
  assert.match(g.text, /<meta name="description" content="Guess the word in six tries">/);
});

test("404 in the page's language with its rows; an unknown path in English; 302 for a language not open; 410 for a game taken off", async () => {
  const e = env();
  await importGames(e, seedGames("es", 5));
  const nf = await get(e, "/es/nothing-here/");
  assert.equal(nf.status, 404);
  assert.match(htmlTag(nf.text), /lang="es"/);
  assert.match(nf.text, /<p class="nf">/);
  assert.match(nf.text, /class="row row-lg"/, "the language page's tiles under it");
  assert.ok(noindex(nf));
  assert.equal((await get(e, "/es/g/nope/")).status, 404);
  const top = await get(e, "/what/");
  assert.equal(top.status, 404);
  assert.match(htmlTag(top.text), /lang="en"/);
  assert.match(top.text, /<ul class="langs"/);
  for (const p of ["/de/", "/de/words/", "/de/g/x/", "/de/sitemap.xml"]) {
    const r = await get(e, p);
    assert.equal(r.status, 302, p);
    assert.equal(r.headers.get("Location"), SITE + "/");
  }
  const g = await one(e, "SELECT id FROM games WHERE slug = 'game-es-1'");
  assert.equal((await admin(e, "act", { key: A, game: g.id, action: "hide" })).json.ok, true);
  const gone = await get(e, "/es/g/game-es-1/");
  assert.equal(gone.status, 410);
  assert.ok(noindex(gone));
});

test("About, the queue page, sitemaps, robots, health, slashes, HEAD, static files", async () => {
  const e = env();
  await importGames(e, seedGames("es", 2));
  const a = await get(e, "/about/");
  assert.equal(a.status, 200);
  assert.equal(canon(a.text), SITE + "/about/");
  assert.match(a.text, /Wordles of the World/);
  assert.doesNotMatch(a.text, /about-local/);
  const al = await get(e, "/about/?l=es");
  assert.match(al.text, /<p class="about-local" lang="es" dir="ltr">/);
  assert.equal(canon(al.text), SITE + "/about/");
  const ad = await get(e, "/admin/");
  assert.equal(ad.status, 200);
  assert.ok(noindex(ad));
  assert.equal(ad.headers.get("Cache-Control"), "no-store");
  assert.match(ad.headers.get("Content-Security-Policy"), /require-trusted-types-for 'script'/);
  assert.match(ad.headers.get("Content-Security-Policy"), /frame-ancestors 'none'/);
  assert.match(ad.text, /<script src="\/a\/admin.js\?v=[0-9a-f]{10}" defer><\/script>/, "the queue page's script, stamped (npm run stamp)");
  const sm = await get(e, "/sitemap.xml");
  assert.equal(sm.status, 200);
  assert.match(sm.text, /<sitemapindex/);
  assert.match(sm.text, /\/es\/sitemap.xml/);
  assert.match(sm.text, /\/sitemap-root.xml/);
  assert.doesNotMatch(sm.text, /\/de\/sitemap.xml/);
  const se = await get(e, "/es/sitemap.xml");
  assert.match(se.text, /<loc>https:\/\/play.logicers.com\/es\/words\/<\/loc>/);
  assert.doesNotMatch(se.text, /\/g\//, "game pages stay out of the sitemaps for now (chat H, plan 2.15)");
  assert.doesNotMatch(se.text, /logicers.com\/es\/same-energy/, "Logicers' own games are on logicers.com, not in our sitemap");
  const root = await get(e, "/sitemap-root.xml");
  assert.match(root.text, /<loc>https:\/\/play.logicers.com\/about\/<\/loc>/);
  const rb = await get(e, "/robots.txt");
  assert.match(rb.text, /Sitemap: https:\/\/play.logicers.com\/sitemap.xml/);
  assert.match(rb.text, /Disallow: \/admin\//);
  const h = await get(e, "/health");
  assert.deepEqual(h.json, { ok: true, db: true, key: "secret", admin: true, review: true, assets: true });
  const s = await get(e, "/es");
  assert.equal(s.status, 301);
  assert.equal(s.headers.get("Location"), SITE + "/es/");
  assert.equal((await get(e, "/ES/")).headers.get("Location"), SITE + "/es/");
  const hd = await call(e, "HEAD", "/es/", undefined, { origin: null });
  assert.equal(hd.status, 200);
  assert.equal(hd.text, "");
  assert.equal((await get(e, "/favicon.ico")).text, "ico");
  assert.equal((await get(e, "/a/portal.css")).text, "body{}");
  assert.equal((await get(e, "/missing.png")).status, 404);
});

test("text from a sender or a seed never breaks out of the page", async () => {
  const e = env();
  await importGames(e, [{ name: "<script>alert(1)</script> \"x\"", url: "https://x.example.org/?a=1&b=<2>", lang: "es", kind: "words", line: "</script><b>hi</b>", maker: "a&b", checked: "2026-11-18" }]
    .concat(seedGames("es", 1)));
  const g = await one(e, "SELECT slug FROM games WHERE host = 'x.example.org'");
  const r = await get(e, "/es/g/" + g.slug + "/");
  assert.equal(r.status, 200);
  assert.doesNotMatch(r.text, /<script>alert/);
  assert.doesNotMatch(r.text, /<\/script><b>hi/);
  assert.match(r.text, /&lt;script&gt;alert\(1\)&lt;\/script&gt; &quot;x&quot;/);
  const data = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(r.text)[1];
  assert.doesNotMatch(data, /<\//);
  assert.equal(JSON.parse(data).description, "</script><b>hi</b>");
});
