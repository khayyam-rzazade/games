/* Chat Q, 23 Nov 2026 (claude/play-next-23nov.md, prompt Q): the check of wave 1. Each test failed on the code before it.
     1. "Your game?" is cut at the language's own question mark: Greek writes it ";" (W1a's file had a Latin "?"), Arabic and
        Persian "؟" (for wave 2).
     2. The notes of the live claim test (23 Nov): a new maker who claims through the emailed link is named as its sender
        named themselves (plan 2.20); a claim with the line keeps the listing's maker, else the host; a logo is kept five
        minutes at the edge (a year in a browser), so after Delete or "Take the logo off" its address stops answering as the
        game's page does; a maker left with no game is deleted with its last game, so its key opens nothing. */
import test from "node:test";
import assert from "node:assert/strict";
import { env, get, call, importGames, seedGames, admin, A, one, rows, resetBrakes, setNow, WEB } from "./lib.mjs";
import { keyHash } from "../src/util.js";
import { WORDS, word } from "../src/words.js";
import * as P from "../src/pages.js";                     // P.QMARK is new (chat Q): absent before, so test 1 fails there
const { yoursQ } = P;

const THU = Date.UTC(2026, 10, 19, 9, 0);
const post = (e, p, b, o) => call(e, "POST", p, b, o);
async function fresh() {
  const e = env();
  resetBrakes();
  setNow(THU);
  await importGames(e, seedGames("es", 6).concat(seedGames("el", 6)));
  return e;
}

test("1. Your game? ends at the language's own question mark: Greek ;, Arabic and Persian ؟, and nothing after it", async () => {
  assert.match(WORDS.el.yours_q, /^Δικό σου παιχνίδι; /, "Greek asks with ; (as its own claim.other does)");
  assert.equal(yoursQ("el"), "Δικό σου παιχνίδι;");
  for (const l of Object.keys(WORDS)) {
    const q = yoursQ(l), rest = WORDS[l].yours_q.slice(WORDS[l].yours_q.indexOf(q) + q.length);
    assert.match(q, /[?？؟;;]$/, l + ": a question");
    assert.ok(!/[?？؟;;]/.test(rest), l + ": the cut is at its question mark, not before it: " + q);
  }
  /* the marks of wave 2 (R) and the Greek question mark as its own character */
  assert.equal(P.QMARK.exec("لعبتك؟ راسلنا على")[0], "لعبتك؟");
  assert.equal(P.QMARK.exec("بازی‌ات؟ بنویس به")[0], "بازی‌ات؟");
  assert.equal(P.QMARK.exec("Δικό σου παιχνίδι\u037E Γράψε στο")[0], "Δικό σου παιχνίδι\u037E");
  const e = await fresh();
  const g = await one(e, "SELECT slug FROM games WHERE lang = 'el' AND source = 'seed' ORDER BY slug LIMIT 1");
  const t = (await get(e, "/el/g/" + g.slug + "/")).text;
  assert.match(t, new RegExp(`<span class="yours-q-t">Δικό σου παιχνίδι;</span> <a class="btn btn-claim" href="/claim/\\?g=[^"]+">${word("el", "claim")}</a>`));
});

test("2. a new maker through the emailed link takes its sender's name; through the line, the listing's maker or the host", async () => {
  const e = await fresh();
  const [g, h] = await rows(e, "SELECT * FROM games WHERE source = 'seed' AND lang = 'es' ORDER BY slug LIMIT 2");
  for (const x of [g, h]) await e.DB.prepare("INSERT INTO adds (game, name, email, made, check_json) VALUES (?, 'Ana Maker', 'ana@example.org', ?, '{}')").bind(x.id, THU).run();
  /* the link of the weekly email went to Ana: she is the one who presses Claim it */
  const token = "abcdefghijklmnopqrstuvwx";
  await e.DB.prepare("INSERT INTO tokens (h, game, made) VALUES (?, ?, ?)").bind(await keyHash(e, "tell", token), g.id, THU).run();
  const r = await post(e, "/api/claim/token", { token });
  assert.equal(r.json.ok, true, r.text);
  assert.equal(r.json.how, "new");
  assert.deepEqual(r.json.maker, { name: "Ana Maker", slug: "ana-maker" }, "the name the game was sent with");
  assert.equal((await one(e, "SELECT maker FROM games WHERE id = ?", g.id)).maker, "Ana Maker");
  /* a claim with the line proves the page, not who sent the game: no sender's name is made public by it */
  const c = await post(e, "/api/claim/code", { game: h.id });
  WEB.set(h.url, { body: `<!doctype html><html lang="es"><head><title>x</title>${c.json.line}</head><body>Play</body></html>` });
  const m = await post(e, "/api/claim/check", { game: h.id, s: c.json.s });
  assert.equal(m.json.ok, true, m.text);
  assert.equal(m.json.maker.name, h.host, "the host (" + h.host + ")");
});

test("2. a logo is kept a year by a browser and five minutes at the edge, so Take the logo off and Delete end its address soon", async () => {
  const e = await fresh();
  const g = await one(e, "SELECT * FROM games WHERE source = 'seed' AND lang = 'es' ORDER BY slug LIMIT 1");
  const hx = "0123456789abcdef", file = hx + ".png";
  await e.DB.prepare("INSERT INTO pics (game, h, type, w, ht, size, data, state, made) VALUES (?, ?, 'image/png', 300, 300, 4, ?, 'ok', ?)").bind(g.id, hx, new Uint8Array([1, 2, 3, 4]), THU).run();
  await e.DB.prepare("UPDATE games SET pic = ? WHERE id = ?").bind(file, g.id).run();
  /* the edge, as Cloudflare's Cache API: what it keeps and for how long */
  const kept = new Map(), had = globalThis.caches;
  globalThis.caches = { default: { match: async (k) => (kept.has(k.url) ? kept.get(k.url).clone() : undefined), put: async (k, r) => { kept.set(k.url, r); } } };
  try {
    const p = await get(e, `/p/${g.id}/${file}`);
    assert.equal(p.status, 200);
    assert.equal(p.headers.get("Cache-Control"), "public, max-age=31536000, immutable, s-maxage=300", "a year in a browser (the address changes with the bytes)");
    const edge = [...kept.values()][0];
    assert.equal(edge && edge.headers.get("Cache-Control"), "public, max-age=300", "five minutes at the edge, as a page");
    assert.equal((await get(e, `/p/${g.id}/${file}`)).headers.get("Cache-Control"), "public, max-age=31536000, immutable, s-maxage=300", "from the edge, the Worker's own header");
  } finally { globalThis.caches = had; }
  assert.equal((await admin(e, "act", { key: A, game: g.id, action: "pic_off" })).json.ok, true);
  assert.equal((await get(e, `/p/${g.id}/${file}`)).status, 404, "taken off: the Worker answers 404 (the edge's copy lives five minutes)");
});

test("2. Delete takes a maker with it when that was its last game; its key opens nothing; a maker with other games stays", async () => {
  const e = await fresh();
  const [g, h, k] = await rows(e, "SELECT * FROM games WHERE source = 'seed' AND lang = 'es' ORDER BY slug LIMIT 3");
  const KEY1 = "abcdefghijklmnopqrstuvwx", KEY2 = "bcdefghijklmnopqrstuvwxy";
  await e.DB.prepare("INSERT INTO makers (id, slug, name, key_hash, made) VALUES ('m1', 'one', 'One', ?, 1), ('m2', 'two', 'Two', ?, 1)")
    .bind(await keyHash(e, "maker", KEY1), await keyHash(e, "maker", KEY2)).run();
  await e.DB.prepare("UPDATE games SET maker_id = 'm1', claimed_at = 1 WHERE id = ?").bind(g.id).run();
  await e.DB.prepare("UPDATE games SET maker_id = 'm2', claimed_at = 1 WHERE id IN (?, ?)").bind(h.id, k.id).run();
  assert.equal((await post(e, "/api/maker", { key: KEY1 })).json.ok, true);
  assert.equal((await admin(e, "act", { key: A, game: g.id, action: "delete" })).json.ok, true);
  assert.equal(await one(e, "SELECT id FROM makers WHERE id = 'm1'"), null, "the maker went with its last game");
  assert.equal((await post(e, "/api/maker", { key: KEY1 })).json.e, "key", "its key opens nothing (it opened an empty form)");
  assert.equal((await admin(e, "act", { key: A, game: h.id, action: "delete" })).json.ok, true);
  assert.ok(await one(e, "SELECT id FROM makers WHERE id = 'm2'"), "a maker with another game stays");
  assert.deepEqual((await post(e, "/api/maker", { key: KEY2 })).json.games.map((x) => x.id), [k.id]);
  /* an unclaimed game's delete touches no maker */
  const u = await one(e, "SELECT id FROM games WHERE source = 'seed' AND lang = 'es' AND maker_id IS NULL ORDER BY slug LIMIT 1");
  assert.equal((await admin(e, "act", { key: A, game: u.id, action: "delete" })).json.ok, true);
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM makers")).n, 1);
});
