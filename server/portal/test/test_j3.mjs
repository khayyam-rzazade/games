/* Chat J, 20 Nov 2026, stage 3: logos, a claimed game's numbers, the maker's page (plan 2.20). Each test failed on the code
   before it. A maker sends a logo (PNG, JPEG or WebP, at most 150 KB, 256 px at least, read from the bytes); it waits for a
   look in the queue and is served from our own origin with a fixed type once a key says yes. A claimed game's page shows its
   players by day (90 days, bars drawn on the server) and by country (named in the page's language), never a 0; with the
   maker's own line and a logo it may be indexed and joins its language's sitemap. A maker has a page with its games as
   coins. Logicers' own coins carry their games' drawings. */
import test from "node:test";
import assert from "node:assert/strict";
import { env, get, call, importGames, seedGames, admin, A, R, one, rows, resetBrakes, freshIp, setNow, _test } from "./lib.mjs";
import { D1 } from "./d1shim.mjs";
import { keyHash, utcDay, dayAdd } from "../src/util.js";
const { picInfo, picCheck } = await import("../src/pics.js").catch(() => ({}));       // absent before stage 3: its tests fail, the rest run

const THU = Date.UTC(2026, 10, 19, 9, 0);
const post = (e, p, b, o) => call(e, "POST", p, b, o);
const act = (e, key, game, action) => admin(e, "act", { key, game, action });
const b64 = (u8) => Buffer.from(u8).toString("base64");

/* picture headers, with filler after them (the server reads only the header) */
function png(w, h, more) {
  const b = new Uint8Array(more || 600);
  b.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 13, 0x49, 0x48, 0x44, 0x52]);
  new DataView(b.buffer).setUint32(16, w); new DataView(b.buffer).setUint32(20, h);
  b.set([0, 0, 0, 0, 0x49, 0x44, 0x41, 0x54], 33);             // IDAT after IHDR's 13 bytes and its CRC
  for (let i = 41; i < b.length; i++) b[i] = (i * 7) & 255;
  return b;
}
function apng(w, h) {
  const b = png(w, h, 700);
  b.set([0, 0, 0, 8, 0x61, 0x63, 0x54, 0x4c], 33);             // acTL before the image data
  return b;
}
function jpeg(w, h) {
  const b = new Uint8Array(500);
  b.set([0xff, 0xd8, 0xff, 0xe0, 0, 16, 0x4a, 0x46, 0x49, 0x46, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0]);   // APP0 (JFIF), 16 bytes
  b.set([0xff, 0xc0, 0, 17, 8, h >> 8, h & 255, w >> 8, w & 255, 3], 20);                     // SOF0
  return b;
}
function webp(kind, w, h, anim) {
  const b = new Uint8Array(400), t = (s, i) => b.set([...s].map((c) => c.charCodeAt(0)), i);
  t("RIFF", 0); t("WEBP", 8); t(kind, 12);
  if (kind === "VP8 ") { b.set([0x9d, 0x01, 0x2a], 23); b[26] = w & 255; b[27] = w >> 8; b[28] = h & 255; b[29] = h >> 8; }
  if (kind === "VP8L") { const W = w - 1, H = h - 1; b[20] = 0x2f; b[21] = W & 255; b[22] = ((W >> 8) & 0x3f) | ((H & 3) << 6); b[23] = (H >> 2) & 255; b[24] = (H >> 10) & 0x0f; }
  if (kind === "VP8X") { b[20] = anim ? 0x02 : 0; const W = w - 1, H = h - 1; b.set([W & 255, (W >> 8) & 255, W >> 16, H & 255, (H >> 8) & 255, H >> 16], 24); }
  return b;
}

async function fresh() {
  const e = env();
  resetBrakes();
  setNow(THU);
  await importGames(e, seedGames("es", 6).concat(seedGames("fr", 6)));
  return e;
}
const seeds = async (e, lang) => rows(e, "SELECT * FROM games WHERE source = 'seed' AND lang = ? ORDER BY slug", lang || "es");
/* a claim through the link of the weekly email (as stage 4 makes it) -> the answer */
let tn = 0;
async function claim(e, g, key) {
  const token = ("tok" + (++tn) + "abcdefghijklmnopqrstuvwxyz").replace(/[^a-z2-7]/g, "a").slice(0, 24);
  await e.DB.prepare("INSERT INTO tokens (h, game, made) VALUES (?, ?, ?)").bind(await keyHash(e, "tell", token), g.id, THU).run();
  const r = await post(e, "/api/claim/token", { token, key });
  assert.equal(r.json.ok, true, r.text);
  return r.json;
}
const send = (e, key, game, bytes, o) => post(e, "/api/maker/pic", { key, game, data: "data:image/png;base64," + b64(bytes) }, o);

test("a picture is what its bytes say: PNG, JPEG, WebP read to their size; GIF, SVG, animations and odd sizes refused", () => {
  assert.deepEqual(picInfo(png(512, 300)), { ext: "png", type: "image/png", w: 512, h: 300 });
  assert.deepEqual(picInfo(jpeg(640, 480)), { ext: "jpg", type: "image/jpeg", w: 640, h: 480 });
  assert.deepEqual(picInfo(webp("VP8 ", 400, 260)), { ext: "webp", type: "image/webp", w: 400, h: 260 });
  assert.deepEqual(picInfo(webp("VP8L", 1000, 777)), { ext: "webp", type: "image/webp", w: 1000, h: 777 });
  assert.deepEqual(picInfo(webp("VP8X", 300, 3000)), { ext: "webp", type: "image/webp", w: 300, h: 3000 });
  assert.equal(picInfo(webp("VP8X", 300, 300, true)).e, "animated");
  assert.equal(picInfo(apng(300, 300)).e, "animated");
  const gif = new Uint8Array(100); gif.set([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]);
  assert.equal(picInfo(gif).e, "type");
  assert.equal(picInfo(new TextEncoder().encode('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><script>1</script></svg>')).e, "type");
  assert.equal(picCheck(png(255, 400)).e, "small");
  assert.equal(picCheck(png(5000, 400)).e, "huge");
  assert.equal(picCheck(png(300, 300, 150 * 1024 + 1)).e, "big");
  assert.ok(!picCheck(png(256, 256, 150 * 1024)).e, "150 KB and 256 px are fine");
});

test("the maker sends a logo; it waits for a look, is served from our origin with a fixed type, and shows on the coins", async () => {
  const e = await fresh();
  const [g, h] = await seeds(e);
  const { key } = await claim(e, g);
  const bytes = png(400, 400, 3000);
  let r = await send(e, key, g.id, bytes);
  assert.deepEqual(r.json, { ok: true, state: "wait" });
  const p = await one(e, "SELECT * FROM pics WHERE game = ?", g.id);
  assert.deepEqual([p.state, p.type, p.w, p.ht, p.size], ["wait", "image/png", 400, 400, 3000]);
  assert.equal((await one(e, "SELECT pic FROM games WHERE id = ?", g.id)).pic, null, "not shown before a look");
  assert.equal((await get(e, `/p/${g.id}/${p.h}.png`)).status, 404);
  assert.doesNotMatch((await get(e, "/es/")).text, new RegExp(`/p/${g.id}/`));

  const q = await admin(e, "queue", { key: R, filter: "edits" });
  const card = q.json.cards.find((c) => c.id === g.id);
  assert.deepEqual(card.pic_wait && [card.pic_wait.w, card.pic_wait.h, card.pic_wait.type], [400, 400, "image/png"]);
  assert.ok(card.rows.some((x) => x.kind === "pic" && /400×400 PNG/.test(x.text)));
  const pv = await admin(e, "pic", { key: R, game: g.id });
  assert.equal(pv.json.data, "data:image/png;base64," + b64(bytes), "the queue sees the waiting logo");
  assert.equal((await act(e, R, g.id, "done")).json.ok, true);
  assert.ok((await admin(e, "queue", { key: R, filter: "edits" })).json.cards.some((c) => c.id === g.id), "Done leaves a logo to decide");

  assert.equal((await act(e, R, g.id, "pic_ok")).json.ok, true, "the review key may show it");
  const file = `${p.h}.png`;
  assert.equal((await one(e, "SELECT pic FROM games WHERE id = ?", g.id)).pic, file);
  const img = await call(e, "GET", `/p/${g.id}/${file}`, undefined, { origin: null });
  assert.equal(img.status, 200);
  assert.equal(img.headers.get("Content-Type"), "image/png");
  assert.equal(img.headers.get("X-Content-Type-Options"), "nosniff");
  assert.match(img.headers.get("Cache-Control"), /max-age=31536000, immutable/);
  assert.match(img.headers.get("Content-Security-Policy"), /default-src 'none'/);
  assert.equal((await get(e, `/p/${g.id}/${p.h}.jpg`)).status, 404, "the type is fixed");
  assert.equal((await get(e, `/p/${h.id}/${file}`)).status, 404);

  const es = (await get(e, "/es/")).text;
  assert.match(es, new RegExp(`<li class="tile [^"]*" data-game="${g.id}"[^>]*><a class="tile-a"[^>]*>(?:(?!</a>).)*<img class="tile-logo" src="/p/${g.id}/${file}" alt="" width="64" height="64" loading="lazy" decoding="async">`));
  assert.doesNotMatch(es.match(new RegExp(`<li class="tile [^"]*" data-game="${g.id}"[\\s\\S]*?</li>`))[0], /tile-zero|tile-kind/, "the logo takes the kind icon's place");
  const api = (await get(e, "/api/es/games?ids=" + g.id)).json.games[0];
  assert.equal(api.pic, `/p/${g.id}/${file}`);
  const page = (await get(e, "/es/g/" + g.slug + "/")).text;
  assert.match(page, new RegExp(`<a class="game-tile has-pic"[^>]*><img class="game-logo" src="/p/${g.id}/${file}"`));
  assert.match(page, new RegExp(`<meta property="og:image" content="https://play.logicers.com/p/${g.id}/${file}">`));

  /* a new one waits while the old one stays; refused, it is gone; taken off, nothing is shown */
  r = await send(e, key, g.id, png(300, 300, 2000));
  assert.equal(r.json.state, "wait");
  assert.equal((await get(e, `/p/${g.id}/${file}`)).status, 200, "the old logo stays meanwhile");
  assert.equal((await act(e, R, g.id, "pic_no")).json.ok, true);
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM pics WHERE game = ?", g.id)).n, 1);
  assert.equal((await send(e, key, g.id, bytes)).json.state, "ok", "the same bytes again: nothing to look at");
  assert.equal((await act(e, A, g.id, "pic_off")).json.ok, true);
  assert.equal((await one(e, "SELECT pic FROM games WHERE id = ?", g.id)).pic, null);
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM pics WHERE game = ?", g.id)).n, 0);
  assert.equal((await act(e, A, g.id, "pic_ok")).json.e, "nopic");
});

test("a logo is refused for a wrong key, another maker's game, the wrong kind of file or size, and too many at once", async () => {
  const e = await fresh();
  const [g, h] = await seeds(e);
  const { key } = await claim(e, g);
  await claim(e, h);
  const why = async (bytes, game, k) => { const r = await send(e, k || key, game || g.id, bytes); return r.json.why || r.json.e; };
  const gif = new Uint8Array(400); gif.set([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]);
  assert.equal(await why(gif), "type");
  assert.equal(await why(new TextEncoder().encode("<svg xmlns='http://www.w3.org/2000/svg' width='999' height='999'></svg>".padEnd(300, " "))), "type");
  assert.equal(await why(png(200, 200)), "small");
  assert.equal(await why(webp("VP8X", 400, 400, true)), "animated");
  assert.equal(await why(png(300, 300), h.id), "nogame");
  assert.equal(await why(png(300, 300), g.id, "c".repeat(24)), "key");
  const big = await call(e, "POST", "/api/maker/pic", { key, game: g.id, data: b64(png(300, 300, 160 * 1024)) });
  assert.ok(big.json.e === "big" || big.json.why === "big", big.text);
  assert.equal((await post(e, "/api/maker/pic", { key, game: g.id, data: "not base64!" })).json.why, "bad");
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM pics")).n, 0);
  const ip = freshIp();
  for (let i = 0; i < 20; i++) await send(e, key, g.id, png(300 + i, 300), { ip });
  assert.equal((await send(e, key, g.id, png(400, 300), { ip })).status, 429);
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM pics WHERE game = ?", g.id)).n, 1, "one waiting a game");
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM queue WHERE game = ? AND kind = 'pic' AND done = 0", g.id)).n, 1, "one card");
});

test("a claimed game's page: players by day for 90 days and by country, in the page's language; never a 0", async () => {
  const e = await fresh();
  const [g, h] = await seeds(e);
  const day = utcDay(THU);
  const put = (game, d, c, n) => e.DB.prepare("INSERT INTO counts (game, day, country, n) VALUES (?, ?, ?, ?)").bind(game, d, c, n).run();
  await put(g.id, day, "IT", 5); await put(g.id, day, "DE", 2); await put(g.id, dayAdd(day, -3), "IT", 4); await put(g.id, dayAdd(day, -40), "XX", 7);
  await put(g.id, dayAdd(day, -95), "FR", 50);                     // older than 90 days: not drawn
  await put(h.id, day, "IT", 3);
  assert.doesNotMatch((await get(e, "/es/g/" + g.slug + "/")).text, /class="nums[ "]/, "not claimed: no numbers");
  await claim(e, g);
  await claim(e, h);
  await e.DB.prepare("DELETE FROM counts WHERE game = ?").bind(h.id).run();
  const t = (await get(e, "/es/g/" + g.slug + "/")).text;
  const block = t.match(/<section class="nums t\d+"[\s\S]*?<\/section>/)[0];
  assert.match(block, /<span class="row-t">Últimos 90 días<\/span><\/h2><span class="nums-total">18<\/span>/);
  assert.equal((block.match(/<rect class="nums-bar"/g) || []).length, 3, "a bar a day with players");
  assert.match(block, /role="img" aria-label="Últimos 90 días: 18 en total"/);
  assert.match(block, /<span class="row-t">Países<\/span>/);
  assert.match(block, /<span class="nums-cn">Italia<\/span><span class="nums-cv">9<\/span>[\s\S]*<span class="nums-cn">Alemania<\/span><span class="nums-cv">2<\/span>/);
  assert.doesNotMatch(block, /XX|Francia|>0</, "no unknown country, nothing from before, no 0");
  assert.match(block, /<p class="nums-axis" aria-hidden="true"><span>[^<]+<\/span><span>19 nov<\/span><\/p>/);
  assert.doesNotMatch((await get(e, "/es/g/" + h.slug + "/")).text, /class="nums[ "]/, "claimed, nobody yet: nothing");
  const fr = (await get(e, "/fr/")).text;
  assert.doesNotMatch(fr, /class="nums[ "]/);
});

test("indexed once claimed with the maker's line and a logo; the sitemap lists it; else noindex", async () => {
  const e = await fresh();
  const [g] = await seeds(e);
  await e.DB.prepare("UPDATE games SET maker = '' WHERE id = ?").bind(g.id).run();           // sent with no maker's name
  const { key } = await claim(e, g);
  const robots = async () => { const r = await get(e, "/es/g/" + g.slug + "/"); return [r.headers.get("X-Robots-Tag"), (/<meta name="robots" content="([^"]+)">/.exec(r.text) || [])[1] || null]; };
  assert.deepEqual(await robots(), ["noindex, follow", "noindex, follow"], "claimed alone: not yet");
  await post(e, "/api/maker/edit", { key, game: g.id, line: "Adivina la palabra del día" });
  assert.deepEqual(await robots(), ["noindex, follow", "noindex, follow"], "a line, no logo: not yet");
  await send(e, key, g.id, png(300, 300));
  await act(e, R, g.id, "pic_ok");
  assert.deepEqual(await robots(), [null, null], "the maker's line and a logo: indexed");
  const sm = (await get(e, "/es/sitemap.xml")).text;
  assert.match(sm, new RegExp(`<loc>https://play.logicers.com/es/g/${g.slug}/</loc>`));
  assert.equal((sm.match(/\/g\//g) || []).length, 1, "only that game page");
  const ld = JSON.parse((await get(e, "/es/g/" + g.slug + "/")).text.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.match(ld.image, new RegExp(`^https://play.logicers.com/p/${g.id}/[0-9a-f]{16}\\.png$`));
  assert.match(ld.author.url, /^https:\/\/play\.logicers\.com\/m\/[a-z0-9-]+\/$/);
});

test("a maker's page: the name and the games as coins in their own languages, Edit for the maker only; noindex for now", async () => {
  const e = await fresh();
  const [g, h] = await seeds(e), [f] = await seeds(e, "fr");
  const c1 = await claim(e, g);
  await claim(e, h, c1.key);
  await claim(e, f, c1.key);
  await post(e, "/api/maker/edit", { key: c1.key, name: "Ana Plays" });
  const m = await get(e, "/m/ana-plays/");
  assert.equal(m.status, 200);
  assert.equal(m.headers.get("X-Robots-Tag"), "noindex, follow");
  assert.match(m.text, /<html lang="es"/, "most of its games are Spanish");
  assert.match(m.text, /<h1 class="mk-name" dir="auto">Ana Plays<\/h1>/);
  assert.match(m.text, /<a class="btn btn-edit" href="\/maker\/\?l=es" data-maker-slug="ana-plays" hidden>/);
  assert.equal((m.text.match(/<li class="tile /g) || []).length, 3);
  assert.match(m.text, new RegExp(`<a class="tile-a" href="/fr/g/${f.slug}/">`), "a French game links to its French page");
  assert.match(m.text, new RegExp(`<a class="tile-name" href="/fr/g/${f.slug}/" tabindex="-1" aria-hidden="true" dir="auto">`), "its name too");
  assert.match((await get(e, "/m/ana-plays/?l=fr")).text, /<html lang="fr"/);
  assert.match((await get(e, "/m/ana-plays/?l=de")).text, /<html lang="es"/, "a language with none of its games: its main one");
  assert.equal((await get(e, "/m/nobody/")).status, 404);
  const gp = (await get(e, "/es/g/" + g.slug + "/")).text;
  assert.match(gp, /<a class="game-maker game-maker-a" href="\/m\/ana-plays\/\?l=es" dir="auto">Ana Plays<\/a>/);
  assert.match(gp, new RegExp(`<a class="btn btn-edit" href="/maker/\\?l=es" data-maker-game="${g.id}" hidden>`));
  const mk = await post(e, "/api/maker", { key: c1.key });
  assert.equal(mk.json.maker.page, "https://play.logicers.com/m/ana-plays/");
  /* every game hidden: no page */
  await e.DB.prepare("UPDATE games SET status = 'hidden' WHERE maker_id IS NOT NULL").run();
  assert.equal((await get(e, "/m/ana-plays/")).status, 404);
});

test("Logicers' own coins carry their games' drawings, at 0 and after", async () => {
  const e = await fresh();
  const es = (await get(e, "/es/")).text;
  for (const k of ["energy", "hundred", "call", "cousin", "club", "apart", "gets", "every", "o24"]) {
    assert.match(es, new RegExp(`data-game="lg-${k}-es"[^>]*><a class="tile-a"[^>]*><svg class="tile-logo tile-logo-lg" aria-hidden="true" focusable="false"><use href="/a/icons\\.svg\\?v=[0-9a-f]{10}#lg-${k}"></use></svg>`), k);
  }
  const api = (await get(e, "/api/es/games?ids=lg-club-es")).json.games[0];
  assert.deepEqual([api.logo, api.pic], ["club", null]);
  const fs = await import("node:fs");
  const sprite = fs.readFileSync(new URL("../../../portal/a/icons.svg", import.meta.url), "utf8");
  for (const k of ["energy", "hundred", "call", "cousin", "club", "apart", "gets", "every", "o24", "altitude", "lookalike", "passport"]) assert.match(sprite, new RegExp(`<symbol id="lg-${k}" viewBox="0 0 100 100">`));
});

test("the new words in the 12 languages; a database without pictures gets them on the first request", async () => {
  const { WORDS } = await import("../src/words.js");
  for (const [l, w] of Object.entries(WORDS)) for (const k of ["days90", "countries", "edit"]) assert.ok(w[k] && w[k].length <= 20, l + " " + k);
  const e = env({ DB: new D1() });
  await e.DB.prepare(`CREATE TABLE games (
     id TEXT PRIMARY KEY, slug TEXT, lang TEXT NOT NULL, family TEXT, name TEXT NOT NULL DEFAULT '', url TEXT NOT NULL,
     norm TEXT NOT NULL, host TEXT NOT NULL, kind TEXT, line TEXT NOT NULL DEFAULT '', maker TEXT NOT NULL DEFAULT '',
     status TEXT NOT NULL, source TEXT NOT NULL, made INTEGER NOT NULL, listed_at INTEGER, new_until INTEGER, slot INTEGER,
     last_check INTEGER, check_state TEXT, fails INTEGER NOT NULL DEFAULT 0, claim_hash TEXT, notes TEXT NOT NULL DEFAULT '',
     hits INTEGER NOT NULL DEFAULT 0, block TEXT, off_at INTEGER, maker_id TEXT, claimed_at INTEGER, line_by TEXT,
     tell_n INTEGER NOT NULL DEFAULT 0)`).run();
  assert.equal((await get(e, "/")).status, 200);
  assert.ok((await rows(e, "SELECT name FROM pragma_table_info('games')")).some((r) => r.name === "pic"));
  assert.ok(await one(e, "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'pics'"));
});

test("a deleted game takes its pictures and claim links with it", async () => {
  const e = await fresh();
  const [g] = await seeds(e);
  const { key } = await claim(e, g);
  await send(e, key, g.id, png(300, 300));
  await e.DB.prepare("INSERT INTO tokens (h, game, made) VALUES ('x', ?, ?)").bind(g.id, THU).run();
  assert.equal((await act(e, A, g.id, "delete")).json.ok, true);
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM pics")).n, 0);
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM tokens WHERE game = ?", g.id)).n, 0);
});
