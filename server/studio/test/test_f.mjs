// Logicers Studio: the joint check's fixes (F, 8 Nov 2026): pictures through the Worker, reports, the listed game that
// changes, a stale save, a blocked maker, extras, the head with a "$", a deleted game's queue rows. Run: node --test test/
import { test } from "node:test";
import assert from "node:assert/strict";
import { env, call, one, rows, maker, game, save, form, FIX, pick, setNow, resetBrakes } from "./lib.mjs";
import { cleanJpeg } from "../src/images.js";
import { _test } from "../src/worker.js";

const T0 = Date.UTC(2026, 10, 8, 9, 0, 0);
const ADMIN = "khayyam-admin-key-0123456789abcdef";
async function upload(e, g, verdict) {
  e.AI.next = verdict; const r = await call(e, "POST", "/img/put", form({ edit_key: g.edit_key }, FIX("photo.jpg")));
  assert.equal(r.status, 200, r.text); return r.json;
}

test("pictures: served by the Worker only while shown; held until Khayyam shows them; gone with a hidden game", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e); const g = await game(e, a, { template: "picture", mode: "open" });
  const safe = await upload(e, g, "SAFE"), flag = await upload(e, g, "FLAG"), none = await upload(e, g, new Error("allowance spent"));
  assert.equal(safe.url, "https://by.logicers.com/i/anna-rossi/history-a-day/" + safe.id);
  assert.deepEqual([safe.held, flag.held, none.held], [false, true, true]);
  let r = await call(e, "GET", "/i/anna-rossi/history-a-day/" + safe.id);
  assert.equal(r.status, 200); assert.equal(r.headers.get("content-type"), "image/jpeg"); assert.equal(r.headers.get("cache-control"), "public, max-age=3600");
  assert.equal((await call(e, "GET", "/i/anna-rossi/history-a-day/" + flag.id)).status, 404, "a flagged picture waits");
  assert.equal((await call(e, "GET", "/i/anna-rossi/history-a-day/" + none.id)).status, 404, "a picture not checked waits");
  assert.equal((await call(e, "GET", "/i/anna-rossi/history-a-day/../x")).status, 404);
  // the public game leaves a held picture out; the editor keeps it
  r = await save(e, g, { items: [{ form: "pick", image: safe.id, q: "What is it?", choices: ["A", "B"], answer: 0 }, { form: "pick", image: flag.id, q: "And this?", choices: ["A", "B"], answer: 1 }], cover: flag.id });
  assert.equal(r.status, 200, r.text);
  r = await call(e, "GET", "/g/anna-rossi/history-a-day?day=2026-11-08");
  assert.ok(r.json.items[0].image_url && !r.json.items[1].image_url && !r.json.items[1].image, "held picture left out");
  assert.equal(r.json.game.cover_url, null, "a held cover is not shown");
  r = await call(e, "GET", "/anna-rossi/history-a-day/");
  assert.ok(!r.text.includes(flag.id), "nor in the preview");
  // Khayyam sees held pictures in his queue and shows one
  r = await call(e, "POST", "/admin/img", { key: ADMIN, image: "https://by.logicers.com/i/anna-rossi/history-a-day/" + flag.id });
  assert.equal(r.status, 200); assert.equal(r.headers.get("x-verdict"), "flag");
  assert.equal((await call(e, "POST", "/admin/img", { key: "wrong", image: flag.id })).status, 404);
  r = await call(e, "POST", "/admin/act", { key: ADMIN, action: "show_image", image: flag.id });
  assert.equal(r.status, 200, r.text);
  assert.equal((await call(e, "GET", "/i/anna-rossi/history-a-day/" + flag.id)).status, 200, "shown now");
  // hidden: every picture of the game stops at once
  await call(e, "POST", "/admin/act", { key: ADMIN, game: "anna-rossi/history-a-day", action: "hide" });
  assert.equal((await call(e, "GET", "/i/anna-rossi/history-a-day/" + safe.id)).status, 410);
});

test("the nightly job asks again about pictures not checked", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e); const g = await game(e, a, { template: "picture" });
  const none = await upload(e, g, new Error("busy")), none2 = await upload(e, g, new Error("busy"));
  setNow(T0 + 2 * 36e5);
  e.AI.next = "SAFE";
  let res = await _test.nightly(e);
  assert.equal(res.rechecked, 2);
  assert.equal((await one(e, "SELECT verdict FROM images WHERE id = ?", none.id)).verdict, "safe");
  const g2 = await game(e, a, { template: "picture", title: "Second" });
  const bad = await upload(e, g2, new Error("busy"));
  setNow(T0 + 4 * 36e5); e.AI.next = "SEXUAL";
  res = await _test.nightly(e);
  assert.equal(await one(e, "SELECT id FROM images WHERE id = ?", bad.id), null, "a sexual one is deleted");
  assert.ok(none2);
});

test("reports: a listed game is never hidden by them; bare calls count as one browser", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e);
  const g = await game(e, a); await save(e, g, { items: [pick()] });
  for (let i = 0; i < 4; i++) await call(e, "POST", "/report", { game: "anna-rossi/history-a-day", reason: "spam" }, { origin: null });
  assert.equal((await one(e, "SELECT hidden FROM games WHERE id = 'anna-rossi/history-a-day'")).hidden, 0, "bare calls from four addresses: one browser");
  await call(e, "POST", "/admin/act", { key: ADMIN, game: "anna-rossi/history-a-day", action: "list" });
  for (const b of ["browserAAAA1", "browserBBBB2", "browserCCCC3"]) await call(e, "POST", "/report", { game: "anna-rossi/history-a-day", reason: "spam", browser: b });
  assert.equal((await one(e, "SELECT hidden FROM games WHERE id = 'anna-rossi/history-a-day'")).hidden, 0, "listed: stays up");
  assert.ok((await rows(e, "SELECT text FROM queue WHERE text LIKE '%reports on a listed game%'")).length === 1, "Khayyam is told");
  const g2 = await game(e, a, { title: "Private one", want_listed: false }); await save(e, g2, { items: [pick()] });
  for (const b of ["browserAAAA1", "browserBBBB2", "browserCCCC3"]) await call(e, "POST", "/report", { game: "anna-rossi/private-one", reason: "spam", browser: b });
  assert.equal((await one(e, "SELECT hidden FROM games WHERE id = 'anna-rossi/private-one'")).hidden, 2, "not listed: three browsers hide it");
});

test("a listed game that changes leaves the list; a stale save is refused", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e);
  const g = await game(e, a); let r = await save(e, g, { items: [pick()] });
  await call(e, "POST", "/admin/act", { key: ADMIN, game: "anna-rossi/history-a-day", action: "list" });
  const base = (await one(e, "SELECT saved FROM games WHERE id = 'anna-rossi/history-a-day'")).saved;
  r = await save(e, g, { start_day: "2026-11-09", base });
  assert.equal(r.status, 200, r.text);
  assert.equal((await one(e, "SELECT listed_by_khayyam AS l FROM games WHERE id = 'anna-rossi/history-a-day'")).l, 1, "a date is not content");
  setNow(T0 + 1000);
  r = await save(e, g, { title: "History a day!" });
  assert.equal((await one(e, "SELECT listed_by_khayyam AS l FROM games WHERE id = 'anna-rossi/history-a-day'")).l, 0, "new words: off the list");
  r = await save(e, g, { title: "Old tab", base });
  assert.equal(r.status, 409); assert.equal(r.json.e, "stale");
});

test("a blocked maker cannot delete and come back; extras that stand in for the item are refused; '$' in a title", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e); const g = await game(e, a, { title: "Quiz $` and $&" });
  let r = await save(e, g, { items: [Object.assign(pick(), { json: '{"q":"x"}' })] });
  assert.equal(r.status, 400); assert.equal(r.json.field, "extra");
  r = await call(e, "GET", "/" + g.id + "/");
  const titles = r.text.match(/<title>/g) || [];
  assert.equal(titles.length, 1, "the head is written once"); assert.ok(r.text.includes("Quiz $` and $&amp;"));
  await call(e, "POST", "/admin/act", { key: ADMIN, maker: "anna-rossi", action: "block_maker" });
  r = await call(e, "POST", "/maker/delete", { key: a.key });
  assert.equal(r.status, 403);
  assert.ok(await one(e, "SELECT slug FROM makers WHERE slug = 'anna-rossi'"));
});

test("a deleted game takes its queue rows with it; an extra JPEG after its end is cut", async () => {
  setNow(T0); resetBrakes();
  const e = env(); const a = await maker(e); const g = await game(e, a); await save(e, g, { items: [pick()], about: "Hello https://example.org/x" });
  assert.ok((await rows(e, "SELECT id FROM queue WHERE game = ?", g.id || "anna-rossi/history-a-day")).length > 0);
  await call(e, "POST", "/game/delete", { edit_key: g.edit_key });
  assert.equal((await rows(e, "SELECT id FROM queue WHERE game = 'anna-rossi/history-a-day'")).length, 0);
  const j = FIX("photo.jpg"), tail = new TextEncoder().encode("GPS-SECRET-APPENDED");
  const both = new Uint8Array(j.length + tail.length); both.set(j); both.set(tail, j.length);
  const c = cleanJpeg(both);
  assert.ok(c && !Buffer.from(c.bytes).includes(Buffer.from("GPS-SECRET")));
  assert.deepEqual([...c.bytes.subarray(c.bytes.length - 2)], [0xff, 0xd9]);
});
