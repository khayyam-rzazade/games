/* Chat J, 20 Nov 2026, stage 2: the claim (plan 2.20). Each test failed on the code before it.
   A maker claims a listed game that is not Logicers' own with a line on the game's own page (a code made from a secret only
   the claiming device gets) or with the single-use link of the weekly email. The first claim makes a maker and a key (24
   base32, kept only as a keyed hash, shown once); a device holding a key adds the game to its maker; a proven claim of a
   game that has a maker already gives that maker a new key (the recovery). The maker's form changes the maker's name and a
   game's line and kind (live at once when the words pass, with an "edit" card in the queue), never the address, the
   language or the status. Everything works on a database made before it. */
import test from "node:test";
import assert from "node:assert/strict";
import { env, get, call, importGames, seedGames, admin, A, R, one, rows, resetBrakes, freshIp, setNow, WEB, page, _test } from "./lib.mjs";
import { D1 } from "./d1shim.mjs";
import { keyHash, mac } from "../src/util.js";
import { word } from "../src/words.js";

const THU = Date.UTC(2026, 10, 19, 9, 0);
const post = (e, p, b, o) => call(e, "POST", p, b, o);
const code = (e, game, o) => post(e, "/api/claim/code", { game }, o);
const check = (e, game, s, key, o) => post(e, "/api/claim/check", { game, s, key }, o);
const maker = (e, key, o) => post(e, "/api/maker", { key }, o);
const edit = (e, b, o) => post(e, "/api/maker/edit", b, o);
const B32_24 = /^[a-z2-7]{24}$/;
async function fresh(lang) {
  const e = env();
  resetBrakes();
  setNow(THU);
  await importGames(e, seedGames(lang || "es", 6).concat(seedGames("fr", 6)));
  return e;
}
const seeds = async (e, lang) => rows(e, "SELECT * FROM games WHERE source = 'seed' AND lang = ? ORDER BY slug", lang || "es");
/* the game's own page, with whatever head we give it */
const site = (g, head) => WEB.set(g.url, { body: `<!doctype html><html lang="${g.lang}"><head><title>${g.name}</title>${head || ""}</head><body>Play</body></html>` });
/* a whole claim with the line: -> the answer */
async function claimWithLine(e, g, key, o) {
  const c = await code(e, g.id, o);
  assert.equal(c.status, 200, c.text);
  site(g, c.json.line);
  return check(e, g.id, c.json.s, key, o);
}

test("the claim with a line: the code works only with the secret of the device that asked for it, once", async () => {
  const e = await fresh();
  const [g, h] = await seeds(e);
  const c = await code(e, g.id);
  assert.equal(c.status, 200);
  assert.ok(B32_24.test(c.json.s), "a secret only this device gets");
  assert.match(c.json.code, /^lp-[a-z2-7]{20}$/);
  assert.equal(c.json.line, `<meta name="logicers-portal" content="${c.json.code}">`);
  const row = await one(e, "SELECT claim_hash FROM games WHERE id = ?", g.id);
  assert.ok(row.claim_hash && !row.claim_hash.includes(c.json.s) && !row.claim_hash.includes(c.json.code.slice(3)), "kept as a keyed hash only");

  site(g, "");
  assert.equal((await check(e, g.id, c.json.s)).json.e, "nometa", "no line on the page");
  site(g, `<meta content='${c.json.code}' name=logicers-portal>`);
  assert.equal((await check(e, g.id, "a".repeat(24))).json.e, "nocode", "the line on the page is not enough without the secret");
  assert.equal((await check(e, h.id, c.json.s)).json.e, "nocode", "a secret is for one game");
  const ok = await check(e, g.id, c.json.s);
  assert.equal(ok.status, 200, ok.text);
  assert.equal(ok.json.how, "new");
  assert.ok(B32_24.test(ok.json.key), "a new maker key, shown once");
  assert.equal(ok.json.game, g.id);
  const m = await one(e, "SELECT * FROM makers");
  assert.equal(m.key_hash, await keyHash(e, "maker", ok.json.key), "the key kept as a keyed hash");
  assert.ok(!JSON.stringify(await rows(e, "SELECT * FROM makers")).includes(ok.json.key), "never the key itself");
  const after = await one(e, "SELECT maker_id, claimed_at, claim_hash, status FROM games WHERE id = ?", g.id);
  assert.equal(after.maker_id, m.id);
  assert.ok(after.claimed_at);
  assert.equal(after.claim_hash, null, "the code is spent");
  assert.equal(after.status, "listed", "a listing never depends on a claim");
  assert.equal((await check(e, g.id, c.json.s)).json.e, "nocode", "once");
  const a = await one(e, "SELECT * FROM queue WHERE game = ? AND kind = 'act'", g.id);
  assert.match(a.text, /claimed \(meta, new\)/);

  /* a newer line replaces the older one */
  const c1 = await code(e, h.id), c2 = await code(e, h.id);
  site(h, c1.json.line);
  assert.equal((await check(e, h.id, c1.json.s)).json.e, "nocode");
  site(h, c2.json.line);
  assert.equal((await check(e, h.id, c2.json.s)).json.ok, true);
});

test("only a listed game that is not Logicers' own; the page must open on its own site; a brake per address", async () => {
  const e = await fresh();
  const [g, h, k] = await seeds(e);
  const lg = await one(e, "SELECT id FROM games WHERE source = 'logicers' LIMIT 1");
  assert.ok(lg);
  assert.equal((await code(e, lg.id)).json.e, "nogame");
  await e.DB.prepare("UPDATE games SET status = 'hidden' WHERE id = ?").bind(k.id).run();
  assert.equal((await code(e, k.id)).json.e, "nogame");
  assert.equal((await code(e, "nope")).status, 404);

  const c = await code(e, g.id);
  WEB.set(g.url, { status: 301, headers: { Location: "https://elsewhere.example.net/" } });
  assert.equal((await check(e, g.id, c.json.s)).json.e, "moved");
  WEB.set(g.url, { status: 500, body: "x" });
  assert.equal((await check(e, g.id, c.json.s)).json.e, "noopen");

  const ip = freshIp(), c2 = await code(e, h.id, { ip });
  site(h, "");
  for (let i = 0; i < 10; i++) assert.equal((await check(e, h.id, c2.json.s, undefined, { ip })).json.e, "nometa");
  const r = await check(e, h.id, c2.json.s, undefined, { ip });
  assert.equal(r.status, 429, "at most 10 looks at a page an hour from one address");
  site(h, c2.json.line);
  assert.equal((await check(e, h.id, c2.json.s, undefined, { ip: freshIp() })).json.ok, true);
});

test("a device with a key adds the game to its maker; a proven claim of a claimed game gives its maker a new key", async () => {
  const e = await fresh();
  const [g, h, k] = await seeds(e);
  const first = await claimWithLine(e, g);
  const key1 = first.json.key;
  const second = await claimWithLine(e, h, key1);
  assert.equal(second.json.how, "joined");
  assert.equal(second.json.key, undefined, "no new key");
  assert.equal((await rows(e, "SELECT id FROM makers")).length, 1);
  assert.equal((await one(e, "SELECT maker_id FROM games WHERE id = ?", h.id)).maker_id, (await one(e, "SELECT maker_id FROM games WHERE id = ?", g.id)).maker_id);
  assert.equal((await claimWithLine(e, g, key1)).json.how, "same", "the maker's own key: nothing changes");

  /* the recovery: the key is lost, the line is put on the page again */
  const again = await claimWithLine(e, g);
  assert.equal(again.json.how, "rotated");
  assert.ok(B32_24.test(again.json.key) && again.json.key !== key1);
  assert.equal((await maker(e, key1)).json.e, "key", "the old key opens nothing");
  const m = await maker(e, again.json.key);
  assert.equal(m.json.ok, true);
  assert.deepEqual(m.json.games.map((x) => x.id).sort(), [g.id, h.id].sort());
  assert.equal((await rows(e, "SELECT id FROM makers")).length, 1, "still one maker");
  /* a game of another maker with this key: it stays with its own maker */
  const other = await claimWithLine(e, k);
  assert.equal(other.json.how, "new");
  assert.equal((await rows(e, "SELECT id FROM makers")).length, 2);
});

test("the link of the weekly email: opening it uses nothing, the button claims once, and an old link does not work", async () => {
  const e = await fresh();
  const [g, h] = await seeds(e);
  const token = "abcdefghijklmnopqrstuvwx", old = "bcdefghijklmnopqrstuvwxy";
  await e.DB.prepare("INSERT INTO tokens (h, game, made) VALUES (?, ?, ?)").bind(await keyHash(e, "tell", token), g.id, THU).run();
  await e.DB.prepare("INSERT INTO tokens (h, game, made) VALUES (?, ?, ?)").bind(await keyHash(e, "tell", old), h.id, THU - 91 * 864e5).run();
  for (let i = 0; i < 2; i++) {
    const p = await get(e, "/claim/" + token + "/");
    assert.equal(p.status, 200);
    assert.match(p.text, new RegExp(`<button class="btn btn-send claim-token" id="claim-token" type="button">${word("es", "claim.it")}</button>`), "in the game's language (chat N)");
    assert.match(p.text, new RegExp(`data-game="${g.id}" data-token="${token}"`));
  }
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM tokens WHERE game = ?", g.id)).n, 1, "a mail program that opens the link claims nothing");
  const r = await post(e, "/api/claim/token", { token });
  assert.equal(r.json.ok, true, r.text);
  assert.equal(r.json.how, "new");
  assert.ok(B32_24.test(r.json.key));
  assert.equal((await one(e, "SELECT tell_n FROM games WHERE id = ?", g.id)).tell_n, 1);
  assert.equal((await post(e, "/api/claim/token", { token })).json.e, "token", "once");
  assert.match((await get(e, "/claim/" + token + "/")).text, /This link no longer works/);
  assert.equal((await post(e, "/api/claim/token", { token: old })).json.e, "token", "older than 90 days");
  assert.equal((await get(e, "/claim/zz/")).status, 200);
  const ip = freshIp();
  for (let i = 0; i < 10; i++) await post(e, "/api/claim/token", { token: "c".repeat(24) }, { ip });
  assert.equal((await post(e, "/api/claim/token", { token }, { ip })).status, 429, "wrong links: a brake per address");
});

test("the maker's form: the name everywhere, a game's line and kind live with an edit card; never the address, language or status", async () => {
  const e = await fresh();
  const [g, h, k] = await seeds(e);
  const key = (await claimWithLine(e, g)).json.key;
  await claimWithLine(e, h, key);
  const other = (await claimWithLine(e, k)).json.key;
  let m = await maker(e, key);
  assert.equal(m.json.games.length, 2);
  assert.equal(m.json.games.find((x) => x.id === g.id).page, "https://play.logicers.com/es/g/" + g.slug + "/");

  let r = await edit(e, { key, name: "Ana Plays" });
  assert.deepEqual(r.json.maker, { name: "Ana Plays", slug: "ana-plays" });
  assert.deepEqual((await rows(e, "SELECT DISTINCT maker FROM games WHERE id IN (?, ?)", g.id, h.id)).map((x) => x.maker), ["Ana Plays"]);
  assert.equal((await edit(e, { key, name: "Casino night" })).json.e, "blocked");
  assert.equal((await edit(e, { key, name: " " })).json.e, "field");
  assert.equal((await edit(e, { key: other, name: "Ana Plays" })).json.maker.slug, "ana-plays-2", "a slug once");

  r = await edit(e, { key, game: g.id, line: "Adivina la palabra del día", kind: "knowledge" });
  assert.equal(r.json.ok, true, r.text);
  const row = await one(e, "SELECT line, kind, line_by, url, lang, status FROM games WHERE id = ?", g.id);
  assert.deepEqual([row.line, row.kind, row.line_by], ["Adivina la palabra del día", "knowledge", "maker"]);
  const pg = await get(e, "/es/g/" + g.slug + "/");
  assert.match(pg.text, /Adivina la palabra del día/, "live at once");
  assert.equal((await edit(e, { key, game: g.id, line: "x".repeat(61) })).json.e, "field");
  assert.equal((await edit(e, { key, game: g.id, line: "Apuestas y casino" })).json.e, "blocked");
  assert.equal((await edit(e, { key, game: g.id, kind: "cards" })).json.e, "field");
  for (const f of ["url", "lang", "status"]) {
    const x = await edit(e, { key, game: g.id, [f]: f === "url" ? "https://evil.example.com/" : f === "lang" ? "fr" : "hidden" });
    assert.deepEqual([x.json.e, x.json.field], ["field", f]);
  }
  const still = await one(e, "SELECT url, lang, status FROM games WHERE id = ?", g.id);
  assert.deepEqual([still.url, still.lang, still.status], [row.url, row.lang, row.status]);
  assert.equal((await edit(e, { key, game: k.id, line: "Mine now" })).json.e, "nogame", "another maker's game");
  assert.equal((await edit(e, { key: "a".repeat(24), name: "Me" })).json.e, "key");

  /* the queue: Edits, for both keys; Done closes the card */
  const q = await admin(e, "queue", { key: R, filter: "edits" });
  const want = (await one(e, "SELECT COUNT(DISTINCT game) AS n FROM queue WHERE kind = 'edit' AND done = 0")).n;
  assert.ok(want >= 2 && q.json.open.edits === want, "a card for each game with a maker's change");
  const card = q.json.cards.find((c) => c.id === g.id);
  assert.ok(card.rows.some((x) => x.kind === "edit" && /line "Adivina la palabra del día" \(was "Guess the word in six tries"\)/.test(x.text)));
  assert.deepEqual(card.maker_of, { id: card.maker_of.id, name: "Ana Plays", slug: "ana-plays" });
  assert.equal((await admin(e, "act", { key: R, game: g.id, action: "done" })).json.ok, true);
  assert.equal((await admin(e, "queue", { key: R, filter: "edits" })).json.open.edits, want - 1);

  /* a fix of a claimed game's maker in the queue renames the maker on all its games */
  assert.equal((await admin(e, "act", { key: A, game: h.id, action: "edit", fields: { maker: "Ana P." } })).json.ok, true);
  assert.equal((await one(e, "SELECT name FROM makers WHERE id = (SELECT maker_id FROM games WHERE id = ?)", g.id)).name, "Ana P.");
  assert.equal((await one(e, "SELECT maker FROM games WHERE id = ?", g.id)).maker, "Ana P.");

  /* an import does not write over a claimed game's words */
  const back = seedGames("es", 1);
  const imp = await importGames(e, back);
  assert.deepEqual(imp.skipped, [{ i: 0, e: "claimed" }]);
  assert.equal((await one(e, "SELECT line FROM games WHERE id = ?", g.id)).line, "Adivina la palabra del día");

  /* wrong keys: a brake per address */
  const ip = freshIp();
  for (let i = 0; i < 20; i++) await maker(e, "b".repeat(24), { ip });
  assert.equal((await maker(e, key, { ip })).status, 429);
});

test("the pages: Your game? and Claim on a game not claimed, the address on a claimed one; the claim pages never kept or indexed", async () => {
  const e = await fresh();
  const [g, h] = await seeds(e);
  const gp = await get(e, "/es/g/" + g.slug + "/");
  assert.match(gp.text, new RegExp(`<p class="yours-q yours-q-claim"><span class="yours-q-t">¿Es tu juego\\?</span> <a class="btn btn-claim" href="/claim/\\?g=${g.id}">Reclamar</a></p>`));
  await claimWithLine(e, h);
  assert.match((await get(e, "/es/g/" + h.slug + "/")).text, /<p class="yours-q">¿Es tu juego\? Escribe a <span class="mail" dir="ltr">logicers.world@gmail.com<\/span><\/p>/);

  const c = await get(e, "/claim/?g=" + g.id);
  assert.equal(c.status, 200);
  assert.equal(c.headers.get("Cache-Control"), "no-store");
  assert.equal(c.headers.get("X-Robots-Tag"), "noindex");
  assert.match(c.headers.get("Content-Security-Policy"), /script-src 'self'; style-src 'self'/);
  assert.match(c.text, /<html lang="es"/, "in the game's language since chat N (22 Nov 2026), with no line saying it is English");
  assert.doesNotMatch(c.text, /class="about-local"/);
  assert.match(c.text, /<script src="\/a\/maker\.js\?v=[0-9a-f]{10}" defer><\/script>/);
  assert.match(c.text, new RegExp(`<span class="claim-url" dir="ltr">${g.url.replace(/\./g, "\\.")}</span>`));
  assert.equal((await get(e, "/claim/?g=" + h.id)).status, 200, "a claimed game can be claimed again (the recovery)");
  assert.equal((await get(e, "/claim/?g=lg-energy-en")).status, 404, "never Logicers' own");
  assert.equal((await get(e, "/claim/?g=nope")).status, 404);
  const mk = await get(e, "/maker/?l=tr");
  assert.equal(mk.status, 200);
  assert.equal(mk.headers.get("Cache-Control"), "no-store");
  assert.match(mk.text, /lang="tr"/);
  assert.match(mk.text, /"kinds":\["words","numbers","maps","knowledge","music","screen","sport","other"\]/);
  const robots = (await get(e, "/robots.txt")).text;
  assert.match(robots, /Disallow: \/claim\/\nDisallow: \/maker\//);
});

test("the word Claim in every language, and the question before it", async () => {
  const { WORDS } = await import("../src/words.js");
  for (const [l, w] of Object.entries(WORDS)) {
    assert.ok(w.claim && w.claim.length <= 14, l + ": claim");
    assert.match(w.yours_q, /^[^?？؟;\u037E]+[?？؟;\u037E]/, l + ": yours_q asks first");
  }
});

test("a database made before stage 2 gets the new columns and tables on the first request, its rows untouched", async () => {
  const e = env({ DB: new D1() });
  resetBrakes();
  /* the games table as stage 1 left it, with one game */
  await e.DB.prepare(`CREATE TABLE games (
     id TEXT PRIMARY KEY, slug TEXT, lang TEXT NOT NULL, family TEXT, name TEXT NOT NULL DEFAULT '', url TEXT NOT NULL,
     norm TEXT NOT NULL, host TEXT NOT NULL, kind TEXT, line TEXT NOT NULL DEFAULT '', maker TEXT NOT NULL DEFAULT '',
     status TEXT NOT NULL, source TEXT NOT NULL, made INTEGER NOT NULL, listed_at INTEGER, new_until INTEGER, slot INTEGER,
     last_check INTEGER, check_state TEXT, fails INTEGER NOT NULL DEFAULT 0, claim_hash TEXT, notes TEXT NOT NULL DEFAULT '',
     hits INTEGER NOT NULL DEFAULT 0, block TEXT, off_at INTEGER)`).run();
  await e.DB.prepare(`INSERT INTO games (id, slug, lang, name, url, norm, host, kind, line, maker, status, source, made, listed_at)
     VALUES ('oldgame001', 'old-game', 'es', 'Old game', 'https://old.example.org/', 'old.example.org/', 'old.example.org', 'words', 'Una línea', 'Ana', 'listed', 'form', 1, 1)`).run();
  assert.equal((await get(e, "/")).status, 200);
  const cols = (await rows(e, "SELECT name FROM pragma_table_info('games')")).map((r) => r.name);
  for (const c of ["maker_id", "claimed_at", "line_by", "tell_n"]) assert.ok(cols.includes(c), c);
  assert.ok(await one(e, "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'makers'"));
  assert.ok(await one(e, "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'tokens'"));
  assert.ok(await one(e, "SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'games_maker'"));
  const g = await one(e, "SELECT * FROM games WHERE id = 'oldgame001'");
  assert.deepEqual([g.name, g.line, g.maker, g.status, g.tell_n, g.maker_id], ["Old game", "Una línea", "Ana", "listed", 0, null]);
  WEB.set(g.url, { body: "" });
  const c = await code(e, g.id);
  site(g, c.json.line);
  const r = await check(e, g.id, c.json.s);
  assert.equal(r.json.how, "new", r.text);
  assert.deepEqual(r.json.maker, { name: "Ana", slug: "ana" }, "the name the game was sent with");
});
