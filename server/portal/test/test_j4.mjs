/* Chat J, 20 Nov 2026, stage 4: To tell (plan 2.20, section 11). Each test failed on the code before it.
   Notifications are not built: once a week, by hand, Claude writes one short email from logicers.world@gmail.com to the
   senders of newly listed games. The queue's To tell (admin key only; the review key never sees emails) lists the games
   listed in the last 7 days whose sender gave an email, not claimed and not yet told; each card carries the email, a
   single-use claim link (its keyed hash kept when the list is shown), the ready English text and a Gmail address that
   writes it from logicers.world@gmail.com; Sent marks it (told_at). */
import test from "node:test";
import assert from "node:assert/strict";
import { env, get, call, importGames, seedGames, admin, A, R, one, rows, resetBrakes, setNow, WEB, _test } from "./lib.mjs";
import { D1 } from "./d1shim.mjs";
import { keyHash } from "../src/util.js";
import { word, fill, num } from "../src/words.js";

const THU = Date.UTC(2026, 10, 19, 9, 0), DAY = 864e5;
const act = (e, key, game, action, more) => admin(e, "act", Object.assign({ key, game, action }, more || {}));
const tell = (e, key) => admin(e, "queue", { key: key || A, filter: "tell" });
let n = 0;
/* a game sent through the add sheet (with or without an email) and listed from the queue -> its id */
async function sent(e, email, name) {
  const url = `https://sent${++n}.example.org/`;
  await call(e, "POST", "/api/add", { url, lang: "es", kind: "words", name: name || "", email: email || "", hp: "" });
  const g = await one(e, "SELECT id FROM games WHERE url = ?", url);
  const r = await act(e, A, g.id, "list", { fields: { name: "Juego " + n, line: "Adivina la palabra del día" } });
  assert.equal(r.json.ok, true, r.text);
  return g.id;
}
async function fresh() {
  const e = env();
  resetBrakes();
  setNow(THU);
  await importGames(e, seedGames("es", 6));
  return e;
}

test("To tell: the admin key only; the games listed in the last 7 days whose sender gave an email, not claimed, not told", async () => {
  const e = await fresh();
  setNow(THU - 8 * DAY);
  const old = await sent(e, "old@example.com");
  setNow(THU);
  const a = await sent(e, "ana@example.com", "Ana");
  const none = await sent(e, "");
  setNow(THU + 60000);                                              // a minute later
  const b = await sent(e, "bo@example.com");
  assert.equal((await tell(e, R)).status, 403, "the review key never sees emails");
  assert.equal((await tell(e, R)).json.e, "admin_only");
  assert.equal((await admin(e, "queue", { key: R })).json.open.tell, undefined, "nor their count");
  const q = await tell(e);
  assert.deepEqual(q.json.cards.map((c) => c.id), [a, b], "oldest first; not the one without an email, not the one listed 8 days ago");
  assert.equal(q.json.open.tell, 2);
  assert.ok(![old, none].some((id) => q.json.cards.some((c) => c.id === id)));
  /* Sent: told_at, gone from the list; the admin key only */
  assert.equal((await act(e, R, a, "told")).status, 403);
  const r = await act(e, A, a, "told");
  assert.equal(r.json.ok, true);
  assert.ok((await one(e, "SELECT told_at FROM games WHERE id = ?", a)).told_at > 0);
  const q2 = await tell(e);
  assert.deepEqual(q2.json.cards.map((c) => c.id), [b]);
  assert.equal(q2.json.open.tell, 1);
  /* a claimed game is not told */
  const tk = q2.json.cards[0].tell.link.match(/\/claim\/([a-z2-7]{24})\/$/)[1];
  assert.equal((await call(e, "POST", "/api/claim/token", { token: tk })).json.ok, true);
  assert.equal((await tell(e)).json.cards.length, 0);
});

test("a card: the email, a claim link that works (the same link until one is used), the ready text and Gmail from logicers.world", async () => {
  const e = await fresh();
  const id = await sent(e, "ana@example.com", "Ana");
  let c = (await tell(e)).json.cards[0];
  const t = c.tell;
  assert.equal(t.email, "ana@example.com");
  assert.equal(t.from, "logicers.world@gmail.com");
  assert.match(t.link, /^https:\/\/play\.logicers\.com\/claim\/[a-z2-7]{24}\/$/);
  assert.equal(t.page, `https://play.logicers.com/es/g/juego-${n}/`);
  /* in the game's language (chat N, 22 Nov 2026: the words mail.* of words/es.json) */
  assert.equal(t.subject, fill("es", "mail.subject", { game: `Juego ${n}`, play: "Play Español" }));
  assert.equal(t.text, [fill("es", "mail.hi", { name: "Ana" }), "", fill("es", "mail.on", { game: `Juego ${n} (sent${n}.example.org)`, play: "Play Español", page: t.page }),
    fill("es", "mail.claim", { link: t.link }), word("es", "mail.reply"), "", "Logicers"].join("\n"));
  assert.ok(!t.text.includes(word("es", "mail.n").split("{n}")[0].trim()), "no players line before the first player");
  const u = new URL(t.gmail);
  assert.equal(u.origin + u.pathname, "https://mail.google.com/mail/");
  assert.deepEqual([u.searchParams.get("authuser"), u.searchParams.get("view"), u.searchParams.get("to"), u.searchParams.get("su"), u.searchParams.get("body")],
    ["logicers.world@gmail.com", "cm", "ana@example.com", t.subject, t.text]);
  assert.doesNotMatch(JSON.stringify(c), /rza\.khay/, "never Khayyam's own address");
  /* the link's keyed hash is kept once; the same link when the list is opened again */
  const token = t.link.match(/\/claim\/([a-z2-7]{24})\/$/)[1];
  assert.ok(await one(e, "SELECT h FROM tokens WHERE h = ? AND game = ?", await keyHash(e, "tell", token), id));
  c = (await tell(e)).json.cards[0];
  assert.equal(c.tell.link, t.link);
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM tokens WHERE game = ?", id)).n, 1);
  assert.match((await get(e, `/claim/${token}/`)).text, /id="claim-token"/, "the link opens the claim");
  /* players: from 1, written as the language writes numbers */
  await e.DB.prepare("UPDATE games SET hits = 1 WHERE id = ?").bind(id).run();
  assert.ok((await tell(e)).json.cards[0].tell.text.includes("\n" + fill("es", "mail.n", { n: "1" }) + "\n"));
  await e.DB.prepare("UPDATE games SET hits = 12345 WHERE id = ?").bind(id).run();
  assert.ok((await tell(e)).json.cards[0].tell.text.includes("\n" + fill("es", "mail.n", { n: num("es", 12345) }) + "\n"));
  /* no name: the greeting without one */
  const id2 = await sent(e, "x@example.com");
  assert.ok((await tell(e)).json.cards.find((x) => x.id === id2).tell.text.startsWith(word("es", "mail.hi0") + "\n\n"));
});

test("a claim by the line on the page ends the game's links; the night deletes links older than 90 days", async () => {
  const e = await fresh();
  const id = await sent(e, "ana@example.com");
  const link = (await tell(e)).json.cards[0].tell.link, token = link.match(/\/claim\/([a-z2-7]{24})\/$/)[1];
  const g = await one(e, "SELECT * FROM games WHERE id = ?", id);
  const c = await call(e, "POST", "/api/claim/code", { game: id });
  WEB.set(g.url, { body: `<!doctype html><html><head>${c.json.line}</head><body></body></html>` });
  assert.equal((await call(e, "POST", "/api/claim/check", { game: id, s: c.json.s })).json.ok, true);
  assert.equal((await one(e, "SELECT COUNT(*) AS n FROM tokens WHERE game = ?", id)).n, 0);
  assert.equal((await one(e, "SELECT tell_n FROM games WHERE id = ?", id)).tell_n, 1);
  assert.equal((await call(e, "POST", "/api/claim/token", { token })).json.e, "token", "the emailed link no longer works");
  await e.DB.prepare("INSERT INTO tokens (h, game, made) VALUES ('old', ?, ?), ('new', ?, ?)").bind(id, THU - 91 * DAY, id, THU - DAY).run();
  await _test.nightly(e, { checks: 0 });
  assert.deepEqual((await rows(e, "SELECT h FROM tokens ORDER BY h")).map((r) => r.h), ["new"]);
});

test("the queue page has To tell for the admin key; a database without told_at gets it", async () => {
  const page = (await get(env(), "/admin/")).text;
  const e = env({ DB: new D1() });
  assert.match(page, /<button class="admin-filter" type="button" data-filter="tell" aria-pressed="false" hidden>To tell<span class="admin-filter-n"><\/span><\/button>/);
  await e.DB.prepare(`CREATE TABLE games (
     id TEXT PRIMARY KEY, slug TEXT, lang TEXT NOT NULL, family TEXT, name TEXT NOT NULL DEFAULT '', url TEXT NOT NULL,
     norm TEXT NOT NULL, host TEXT NOT NULL, kind TEXT, line TEXT NOT NULL DEFAULT '', maker TEXT NOT NULL DEFAULT '',
     status TEXT NOT NULL, source TEXT NOT NULL, made INTEGER NOT NULL, listed_at INTEGER, new_until INTEGER, slot INTEGER,
     last_check INTEGER, check_state TEXT, fails INTEGER NOT NULL DEFAULT 0, claim_hash TEXT, notes TEXT NOT NULL DEFAULT '',
     hits INTEGER NOT NULL DEFAULT 0, block TEXT, off_at INTEGER, maker_id TEXT, claimed_at INTEGER, line_by TEXT,
     tell_n INTEGER NOT NULL DEFAULT 0, pic TEXT)`).run();
  const e2 = env({ DB: e.DB });
  assert.equal((await get(e2, "/")).status, 200);
  assert.ok((await rows(e2, "SELECT name FROM pragma_table_info('games')")).some((r) => r.name === "told_at"));
});
