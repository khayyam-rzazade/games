// Logicers Studio: the pages (the shell with the head written in), oEmbed for both hosts, the nightly job, schema.sql.
// Run: node --test test/
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { env, call, one, rows, maker, game, save, pick, form, FIX, setNow, resetBrakes, HERE, Assets, _test } from "./lib.mjs";
import { OUR_GAMES } from "../src/ourgames.js";

const T0 = Date.UTC(2026, 10, 8, 9, 0, 0);
const head = (html) => html.slice(0, html.indexOf("</head>"));

test("a game's page: its title, maker, picture and oEmbed link in the head; the rest of the shell as it is", async () => {
  setNow(T0);
  resetBrakes();
  const e = env();
  const a = await maker(e);
  const g = await game(e, a, { title: "History a day" });
  await save(e, g, { items: [pick()], about: "A question a day about **history**, for my class. See [notes](https://school.example/n)." });
  let r = await call(e, "GET", "/anna-rossi/history-a-day/", undefined, { origin: null });
  assert.equal(r.status, 200);
  assert.match(r.headers.get("Content-Type"), /text\/html/);
  const h = head(r.text);
  assert.equal((h.match(/<title>/g) || []).length, 1, "one title");
  assert.match(h, /<title>History a day, by Anna Rossi<\/title>/);
  assert.match(h, /<meta property="og:title" content="History a day, by Anna Rossi">/);
  assert.match(h, /<meta name="description" content="A question a day about history, for my class. See notes.">/);
  assert.match(h, /<link rel="canonical" href="https:\/\/by.logicers.com\/anna-rossi\/history-a-day\/">/);
  assert.match(h, /<link rel="alternate" type="application\/json\+oembed" href="https:\/\/by.logicers.com\/oembed\?url=https%3A%2F%2Fby.logicers.com%2Fanna-rossi%2Fhistory-a-day%2F&amp;format=json"/);
  assert.match(h, /og:image" content="https:\/\/logicers.com\/assets\/img\/og.png"/);
  assert.ok(!/content="shell"/.test(h), "the shell's own description and og:title are replaced");
  assert.match(r.text, /<link rel="stylesheet" href="\/studio.css">/, "everything else stays");
  assert.match(r.text, /<main id="app"><\/main>/);
  assert.match(h, /<meta name="robots" content="noindex">/, "not listed: not indexed");
  assert.equal(r.headers.get("X-Robots-Tag"), "noindex");
  assert.match(r.headers.get("Content-Security-Policy"), /frame-ancestors 'self' https:\/\/logicers.com/);
  await call(e, "POST", "/admin/act", { key: e.ADMIN_KEY, game: g.id, action: "list" });
  r = await call(e, "GET", "/anna-rossi/history-a-day/", undefined, { origin: null });
  assert.ok(!/noindex/.test(head(r.text)), "listed: indexed");
  r = await call(e, "GET", "/anna-rossi/history-a-day/about/", undefined, { origin: null });
  assert.match(head(r.text), /canonical" href="https:\/\/by.logicers.com\/anna-rossi\/history-a-day\/about\/"/);
  r = await call(e, "GET", "/anna-rossi/history-a-day/embed/", undefined, { origin: null });
  assert.equal(r.headers.get("Content-Security-Policy"), "frame-ancestors *", "any site may frame the embed");
  assert.equal(r.headers.get("X-Robots-Tag"), "noindex");
  r = await call(e, "GET", "/anna-rossi/history-a-day", undefined, { origin: null });
  assert.equal(r.status, 301);
  assert.equal(r.headers.get("Location"), "https://by.logicers.com/anna-rossi/history-a-day/");
  r = await call(e, "GET", "/c/" + g.code, undefined, { origin: null });
  assert.equal(r.status, 302);
  assert.equal(r.headers.get("Location"), "https://by.logicers.com/anna-rossi/history-a-day/");
  r = await call(e, "GET", "/anna-rossi/", undefined, { origin: null });
  assert.match(head(r.text), /<title>Games by Anna Rossi<\/title>/);
  /* other languages */
  const it = await game(e, a, { title: "Storia", lang: "it", mode: "open" });
  r = await call(e, "GET", "/" + it.id + "/", undefined, { origin: null });
  assert.match(head(r.text), /<title>Storia, di Anna Rossi<\/title>/);
  assert.match(head(r.text), /<meta name="description" content="Un gioco di Anna Rossi">/);
});

test("planted fault: a title and a name that try to break out of the head", async () => {
  setNow(T0);
  resetBrakes();
  const e = env();
  const a = await maker(e, 'Eve "<script>');
  const g = await game(e, a, { title: "</title><script>alert(1)</script>" });
  const r = await call(e, "GET", "/" + g.id + "/", undefined, { origin: null });
  assert.equal(r.status, 200);
  const h = head(r.text);
  assert.ok(!/<script>alert/.test(h) && !/"<script>/.test(h), "escaped");
  assert.match(h, /<title>&lt;\/title&gt;&lt;script&gt;alert\(1\)&lt;\/script&gt;, by Eve &quot;&lt;script&gt;<\/title>/);
});

test("pages: unknown 404, hidden 410, the editor never framed, terms and admin from their own folder, the directory untouched", async () => {
  setNow(T0);
  resetBrakes();
  const e = env({ ASSETS: new Assets({ "/terms/index.html": "<html><head><title>Terms</title></head><body>terms</body></html>" }) });
  const a = await maker(e);
  const g = await game(e, a);
  let r = await call(e, "GET", "/nobody/", undefined, { origin: null });
  assert.equal(r.status, 404);
  assert.match(r.text, /<main id="app">/, "the shell, so the page can say it");
  assert.equal((await call(e, "GET", "/anna-rossi/nothing/", undefined, { origin: null })).status, 404);
  assert.equal((await call(e, "GET", "/anna-rossi/history-a-day/other/", undefined, { origin: null })).status, 404);
  assert.equal((await call(e, "GET", "/c/BBBBBB", undefined, { origin: null })).status, 404);
  await call(e, "POST", "/admin/act", { key: e.ADMIN_KEY, game: g.id, action: "hide" });
  r = await call(e, "GET", "/" + g.id + "/", undefined, { origin: null });
  assert.equal(r.status, 410);
  assert.ok(!/History a day/.test(r.text), "a hidden game's title is not in its page");
  assert.equal((await call(e, "GET", "/c/" + g.code, undefined, { origin: null })).status, 404);
  for (const p of ["/new/", "/edit/"]) {
    r = await call(e, "GET", p, undefined, { origin: null });
    assert.equal(r.status, 200);
    assert.equal(r.headers.get("Content-Security-Policy"), "frame-ancestors 'none'", p);
    assert.equal(r.headers.get("Cache-Control"), "no-store");
  }
  r = await call(e, "GET", "/" + g.id + "/edit/", undefined, { origin: null });
  assert.equal(r.status, 200, "a game's own editor opens even while it is hidden");
  assert.equal(r.headers.get("Content-Security-Policy"), "frame-ancestors 'none'");
  assert.equal(r.headers.get("X-Robots-Tag"), "noindex");
  assert.equal((await call(e, "GET", "/anna-rossi/nothing/edit/", undefined, { origin: null })).status, 404);
  r = await call(e, "GET", "/admin/", undefined, { origin: null });
  assert.equal(r.headers.get("Content-Security-Policy"), "frame-ancestors 'none'");
  assert.match(r.text, /<main id="app">/, "no studio/admin/ yet: the shell");
  r = await call(e, "GET", "/terms/", undefined, { origin: null });
  assert.match(r.text, /terms<\/body>/, "studio/terms/index.html when it is there");
  r = await call(e, "GET", "/", undefined, { origin: null });
  assert.match(r.text, /<title>Logicers Studio<\/title>/, "the directory: the shell's own head");
  r = await call(env({ ASSETS: undefined }), "GET", "/", undefined, { origin: null });
  assert.match(r.text, /<script src="\/studio.js"/, "no folder yet: a bare shell");
});

test("planted fault: oEmbed for both hosts", async () => {
  setNow(T0);
  resetBrakes();
  const e = env();
  const a = await maker(e);
  const g = await game(e, a);
  const oe = (u, q) => call(e, "GET", "/oembed?url=" + encodeURIComponent(u) + "&format=json" + (q || ""), undefined, { origin: null });
  let r = await oe("https://by.logicers.com/anna-rossi/history-a-day/");
  assert.equal(r.status, 200, r.text);
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), "*");
  assert.equal(r.json.type, "rich");
  assert.equal(r.json.version, "1.0");
  assert.equal(r.json.title, "History a day, by Anna Rossi");
  assert.equal(r.json.author_name, "Anna Rossi");
  assert.equal(r.json.author_url, "https://by.logicers.com/anna-rossi/");
  assert.equal(r.json.provider_name, "Logicers");
  assert.equal(r.json.html, '<iframe src="https://by.logicers.com/anna-rossi/history-a-day/embed/" width="100%" height="600" style="border:0;max-width:100%" loading="lazy" allow="clipboard-write" title="History a day, by Anna Rossi"></iframe>');
  assert.equal(r.json.height, 600);
  assert.equal(r.json.src, undefined);
  assert.equal((await oe("https://by.logicers.com/anna-rossi/history-a-day/embed/")).status, 200);
  assert.equal((await oe("https://by.logicers.com/anna-rossi/history-a-day/", "&maxheight=400")).json.height, 400);
  r = await oe("https://logicers.com/100-of-us/");
  assert.equal(r.json.title, "100 of Us");
  assert.match(r.json.html, /src="https:\/\/logicers.com\/100-of-us\/\?embed=1"/);
  r = await oe("https://logicers.com/es/100-of-us/");
  assert.equal(r.json.title, "El mundo en 100");
  assert.match(r.json.html, /src="https:\/\/logicers.com\/es\/100-of-us\/\?embed=1"/);
  r = await oe("https://www.logicers.com/tr/years-apart/?x=1");
  assert.equal(r.json.title, "Kaç Yıl Arayla");
  assert.equal((await oe("https://logicers.com/altitude/")).json.title, "Altitude");
  for (const u of ["https://logicers.com/es/altitude/", "https://logicers.com/me/", "https://logicers.com/", "https://evil.example/100-of-us/",
    "https://by.logicers.com/anna-rossi/", "https://by.logicers.com/anna-rossi/nothing/", "javascript:alert(1)", "not a url"]) {
    assert.equal((await oe(u)).status, 404, u);
  }
  assert.equal((await call(e, "GET", "/oembed?url=" + encodeURIComponent("https://logicers.com/100-of-us/") + "&format=xml", undefined, { origin: null })).status, 501);
  await call(e, "POST", "/admin/act", { key: e.ADMIN_KEY, game: g.id, action: "hide" });
  assert.equal((await oe("https://by.logicers.com/anna-rossi/history-a-day/")).status, 404, "a hidden game is not embedded");
});

test("the nightly job: 12 months unopened, orphan images, old queue rows", async () => {
  setNow(T0);
  resetBrakes();
  const e = env();
  const a = await maker(e);
  const old = await game(e, a, { title: "Old one" });
  const keep = await game(e, a, { title: "Kept one" });
  const up = async (g) => (await call(e, "POST", "/img/put", form({ edit_key: g.edit_key }, FIX("photo.jpg")))).json.id;
  const oldImg = await up(old), used = await up(keep), orphan = await up(keep), fresh = await up(keep);
  await save(e, keep, { items: [{ q: "q", choices: ["a", "b"], answer: 0, image: used }] });
  await e.DB.prepare("UPDATE images SET made = ? WHERE id <> ?").bind(T0 - 2 * 864e5, fresh).run();
  await e.DB.prepare("UPDATE games SET last_open = ? WHERE id = ?").bind(T0 - 366 * 864e5, old.id).run();
  await call(e, "POST", "/admin/act", { key: e.ADMIN_KEY, game: keep.id, action: "done" });
  await e.DB.prepare("UPDATE queue SET done_at = ? WHERE done = 1").bind(T0 - 91 * 864e5).run();
  const res = await _test.nightly(e);
  assert.deepEqual(res, { games: 1, images: 1, rechecked: 0 });
  assert.equal(await one(e, "SELECT id FROM games WHERE id = ?", old.id), null, "unopened for a year: gone");
  assert.ok(await one(e, "SELECT id FROM games WHERE id = ?", keep.id));
  const left = (await rows(e, "SELECT id FROM images")).map((x) => x.id).sort();
  assert.deepEqual(left, [used, fresh].sort(), "the orphan goes; the one an item uses and the one sent today stay");
  assert.deepEqual([...e.IMG.objects.keys()].map((k) => k.split("/").pop()).sort(), [used, fresh].sort(), "R2 too");
  assert.ok(!(await rows(e, "SELECT * FROM queue WHERE done = 1 AND game = ?", keep.id)).length, "done rows older than 90 days: gone");
  assert.ok(oldImg);
  /* the scheduled entry point */
  let ran = null;
  const { default: worker } = await import("../src/worker.js");
  await worker.scheduled({}, e, { waitUntil(p) { ran = p; } });
  await ran;
});

test("schema.sql is the Worker's own schema; the daily games' titles are all there", async () => {
  const sql = fs.readFileSync(path.join(HERE, "..", "schema.sql"), "utf8").replace(/^--.*$/gm, "");
  const norm = (s) => s.replace(/\s+/g, " ").trim();
  assert.equal(norm(sql), norm(_test.SCHEMA.map((s) => s + ";").join(" ")));
  for (const g of ["same-energy", "100-of-us", "your-call", "long-lost-cousin", "the-club", "years-apart", "who-gets-what", "every-beat", "out-of-24"]) {
    assert.deepEqual(Object.keys(OUR_GAMES[g]).sort(), ["en", "es", "fr", "it", "pt", "tr"], g);
    for (const l of Object.values(OUR_GAMES[g])) assert.ok(l.title && !/\./.test(l.title), g + " " + l.title);
  }
});
