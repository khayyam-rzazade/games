/* Chat M, 26 Nov 2026 (claude/play-next-24nov.md, part M): Yours in My Logicers. Each test fails on the code before it (there was
   no bridge, no frame in any CSP, no mark, no "me" in a page's data, no merge).
     1. The bridge: a language's page, a kind page and a game page let in one frame, the bridge on logicers.com, and nothing else;
        every other page lets in none. A local run may point it at a page on this computer, nothing else. The bridge's own page
        (portal/bridge.html): noindex, its own CSP, its script stamped; the Worker does not upload it.
     2. The mark: Logicers' three dots beside the flame in the Yours row, a link to My Logicers in the page's language where
        Logicers has it, else English; the page's data says where the bridge is and how a Logicer number is written. No new
        word of Play. About has its line.
     3. The merge (pmMerge, the same text in portal/a/portal.js and assets/js/me.js): a saved game is never lost, a streak is
        never lowered, a game unsaved on one device stays unsaved on the others (keep when, not only what), the later day of a
        play wins; what goes is cleaned. */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { env, get, importGames, seedGames, one, resetBrakes, setNow } from "./lib.mjs";
import { WORDS } from "../src/words.js";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.join(ROOT, "..", "..");
const read = (p) => fs.readFileSync(path.join(REPO, p), "utf8");
const THU = Date.UTC(2026, 10, 19, 9, 0);
const BRIDGE = "https://logicers.com/portal/bridge.html";
const data = (html) => JSON.parse(html.match(/<script type="application\/json" id="pl-data">([\s\S]*?)<\/script>/)[1]);
const csp = (r) => r.headers.get("Content-Security-Policy");
async function fresh(extra) {
  const e = env(extra);
  resetBrakes();
  setNow(THU);
  await importGames(e, seedGames("es", 3).concat(seedGames("hi", 2), seedGames("ja", 2)));
  return e;
}

test("1. the bridge: one frame on a language's page, a kind page and a game page; none anywhere else", async () => {
  const e = await fresh();
  const slug = (await one(e, "SELECT slug FROM games WHERE lang = 'es' AND source = 'seed' ORDER BY slug LIMIT 1")).slug;
  for (const p of ["/es/", "/es/words/", "/es/g/" + slug + "/", "/hi/", "/ja/words/"]) {
    const r = await get(e, p), c = csp(r);
    assert.equal(r.status, 200, p);
    assert.ok(c.endsWith("; frame-src " + BRIDGE), p + ": the bridge's frame, " + c);
    assert.equal((c.match(/frame-src/g) || []).length, 1, p + ": one frame-src");
    assert.match(c, /default-src 'self'/, p);
    assert.match(c, /frame-ancestors 'none'/, p + ": no one frames Play");
  }
  for (const p of ["/", "/about/", "/nothing-here/", "/es/nothing-here/", "/maker/", "/admin/"]) {
    const c = csp(await get(e, p));
    assert.ok(!/frame-src/.test(c), p + ": no frame: " + c);
  }
  /* a local run points it at this computer; nothing else is taken, and production never takes a local address */
  const local = await fresh({ ALLOW_ORIGINS: "localhost", BRIDGE: "http://127.0.0.1:4197/portal/bridge.html" });
  assert.ok(csp(await get(local, "/es/")).endsWith("; frame-src http://127.0.0.1:4197/portal/bridge.html"));
  assert.equal(data((await get(local, "/es/")).text).me.bridge, "http://127.0.0.1:4197/portal/bridge.html");
  for (const bad of ["http://127.0.0.1:4197/portal/bridge.html", "https://evil.example/bridge.html", "https://logicers.com/portal/bridge.html x", "javascript:alert(1)"]) {
    const prod = await fresh({ BRIDGE: bad });
    assert.ok(csp(await get(prod, "/es/")).endsWith("; frame-src " + BRIDGE), "not taken: " + bad);
    assert.equal(data((await get(prod, "/es/")).text).me.bridge, BRIDGE);
  }
});

test("1. the bridge's own page: on logicers.com, noindex, its own CSP, its script stamped; not uploaded with the Worker", () => {
  const html = read("portal/bridge.html"), js = read("portal/bridge.js");
  assert.match(html, /<meta name="robots" content="noindex">/);
  assert.match(html, /<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; connect-src 'self' https:\/\/me\.logicers\.com https:\/\/logicers-me\.rza-khay\.workers\.dev; base-uri 'none'; form-action 'none'">/);
  const stamp = crypto.createHash("sha256").update(fs.readFileSync(path.join(REPO, "portal/bridge.js"))).digest("hex").slice(0, 10);
  assert.match(html, new RegExp('<script src="bridge\\.js\\?v=' + stamp + '"></script>'), "the script's stamp is its content's (" + stamp + ")");
  assert.ok(!/<script>|\son[a-z]+=|\sstyle=/.test(html), "no inline script or style");
  /* it answers Play only, and only its parent */
  assert.match(js, /var ALLOW = \["https:\/\/play\.logicers\.com"\];/);
  assert.match(js, /e\.source !== window\.parent/);
  assert.match(js, /if \(!out\.code \|\| !obj\(data\.play\)\) return Promise\.resolve\(out\);/, "put: nothing without a code");
  const ignore = read("portal/.assetsignore").split("\n").map((s) => s.trim());
  assert.ok(ignore.includes("bridge.html") && ignore.includes("bridge.js"), "the Worker does not upload the bridge");
});

test("2. the mark beside the flame: My Logicers in the page's language where Logicers has it, else English; the page's data", async () => {
  const e = await fresh();
  const es = await get(e, "/es/"), hi = await get(e, "/hi/"), ja = await get(e, "/ja/words/");
  const head = (html) => html.match(/<section class="row row-mine"[\s\S]*?<\/section>/)[0];
  const h = head(es.text);
  assert.match(h, /<span class="streak" id="streak"[^>]*>[\s\S]*?<\/span><a class="me-mark" id="me-mark" href="https:\/\/logicers\.com\/me\/\?lang=es" aria-label="Mi Logicers" title="Mi Logicers"><svg class="me-mark-i" viewBox="0 0 64 64" aria-hidden="true" focusable="false">(<circle [^>]+\/>){3}<\/svg><span class="me-mark-n" hidden><\/span><\/a><a class="run"/, "after the flame, before the run");
  assert.match(head(hi.text), /<a class="me-mark" id="me-mark" href="https:\/\/logicers\.com\/me\/\?lang=en" lang="en" aria-label="My Logicers"/, "Hindi: My Logicers in English");
  assert.match(head(ja.text), /<a class="me-mark" id="me-mark" href="https:\/\/logicers\.com\/me\/\?lang=en" lang="en"/, "a kind page too");
  assert.ok(!/style=/.test(h), "no inline style (the CSP forbids it)");
  const fill = h.match(/fill="#[0-9A-F]{6}"/g);
  assert.deepEqual(fill, ['fill="#3558DC"', 'fill="#E0512F"', 'fill="#11998B"'], "Logicers' three dots, as the favicon draws them");
  const d = data(es.text);
  assert.deepEqual(d.me, { bridge: BRIDGE, href: "https://logicers.com/me/?lang=es", name: "Mi Logicers", nf: "n.º {n}", lang: "es" });
  for (const [l, name, nf] of [["en", "My Logicers", "№{n}"], ["it", "Il mio Logicers", "№{n}"], ["tr", "Logicers’ım", "№{n}"], ["pt", "Meu Logicers", "nº {n}"], ["fr", "Mon Logicers", "n° {n}"]]) {
    const me = JSON.parse(read("me/lang/" + l + ".json"));
    assert.equal(me["app.name"], name, l + ": My Logicers' own name");
    assert.equal(me["home.number"], "Logicer " + nf, l + ": how Logicers writes the number");
  }
  assert.equal(data(hi.text).me.nf, "№{n}");
  const slug = (await one(e, "SELECT slug FROM games WHERE lang = 'es' AND source = 'seed' LIMIT 1")).slug;
  assert.equal(data((await get(e, "/es/g/" + slug + "/")).text).me.href, "https://logicers.com/me/?lang=es", "a game page carries it (for the bridge)");
  for (const p of ["/", "/about/", "/nothing-here/", "/es/nothing-here/"]) assert.equal(data((await get(e, p)).text).me, undefined, p + ": no bridge");
  /* no new word of Play: the words files hold nothing of My Logicers */
  for (const l of Object.keys(WORDS)) assert.ok(!Object.keys(WORDS[l]).some((k) => /^me[._]|logicer_n|mark/.test(k)), l);
  assert.match((await get(e, "/about/")).text, /The games you save and your streak stay on your device\. If you keep a My Logicers code on logicers\.com, they also go with it to your other devices, locked so that only your code opens them\./);
});

/* the merge, from portal.js, run as the page runs it */
const block = (src) => { const m = src.match(/\/\* play-merge: from here \*\/[\s\S]*?\/\* play-merge: to here \*\//); assert.ok(m, "the block"); return m[0]; };
function merger(now) {
  const box = { Date: class extends Date { constructor(...a) { if (a.length) super(...a); else super(now); } static now() { return now; } static UTC(...a) { return Date.UTC(...a); } } };
  vm.createContext(box);
  vm.runInContext(block(read("portal/a/portal.js")) + "\n;this.pmMerge = pmMerge; this.pmClean = pmClean;", box);
  const J = (x) => JSON.parse(JSON.stringify(x));                     // out of the page's realm, so deepEqual compares values
  return { pmMerge: (a, b) => J(box.pmMerge(a, b)), pmClean: (x) => J(box.pmClean(x)) };
}
const T0 = Date.UTC(2026, 10, 26, 12, 0), DAY = 864e5;
const ymd = (t) => new Date(t).toISOString().slice(0, 10);

test("3. the merge is one text, in Play's page script and in My Logicers' script", () => {
  assert.equal(block(read("portal/a/portal.js")), block(read("assets/js/me.js")));
});

test("3. the merge: never lose a saved game; an unsave made later wins; a save made later wins; a save with no time loses only to a timed unsave", () => {
  const { pmMerge } = merger(T0);
  const g = (n) => ["es", "game-es-" + n, "Game es " + n, ""];
  /* A saved x and y; B knows nothing of them: both stay */
  let m = pmMerge({ star: ["x", "y"], t: { x: T0 - 5000, y: T0 - 9000 }, g: { x: g(1), y: g(2) } }, { star: [] });
  assert.deepEqual(m.star, ["x", "y"]);
  assert.deepEqual(m.g, { x: g(1), y: g(2) });
  /* B unsaved x after A saved it: unsaved on both, and remembered as unsaved */
  m = pmMerge({ star: ["x", "y"], t: { x: T0 - 5000, y: T0 - 9000 }, g: { x: g(1), y: g(2) } }, { star: ["y"], t: { x: T0 - 1000, y: T0 - 9000 } });
  assert.deepEqual(m.star, ["y"]);
  assert.equal(m.t.x, T0 - 1000, "x is remembered unsaved, with when");
  assert.equal(m.g.x, undefined, "nothing of x is kept to show");
  /* the other order gives the same */
  assert.deepEqual(pmMerge({ star: ["y"], t: { x: T0 - 1000, y: T0 - 9000 } }, { star: ["x", "y"], t: { x: T0 - 5000, y: T0 - 9000 } }).star, ["y"]);
  /* saved again later on A: saved */
  assert.deepEqual(pmMerge({ star: ["x"], t: { x: T0 - 100 } }, { star: [], t: { x: T0 - 1000 } }).star, ["x"]);
  /* kept before 26 Nov (no time): kept, unless an unsave with a time says otherwise */
  assert.deepEqual(pmMerge({ star: ["old"] }, { star: ["new"], t: { new: T0 } }).star, ["new", "old"], "the newest first, the old ones after");
  assert.deepEqual(pmMerge({ star: ["old"] }, { star: [], t: { old: T0 - 3 * DAY } }).star, [], "a timed unsave beats a save with no time");
  /* the same time on both sides, two states: saved (a saved game is never lost) */
  assert.deepEqual(pmMerge({ star: ["x"], t: { x: T0 } }, { star: [], t: { x: T0 } }).star, ["x"]);
  /* commutative in what is saved, idempotent */
  const a = { star: ["p", "q", "r"], t: { p: T0 - 10, q: T0 - 20, s: T0 - 5 } }, b = { star: ["s", "q"], t: { s: T0 - 50, q: T0 - 30, r: T0 - 1 } };
  assert.deepEqual(pmMerge(a, b).star.slice().sort(), pmMerge(b, a).star.slice().sort());
  assert.deepEqual(pmMerge(a, b).star.slice().sort(), ["p", "q"], "r unsaved later on b; s unsaved later on a");
  const ab = pmMerge(a, b);
  assert.deepEqual(pmMerge(ab, ab), ab);
  assert.deepEqual(pmMerge(ab, null), ab);
});

test("3. the merge: a streak is never lowered; streaks that touch are one; the later day of a play wins; old things go", () => {
  const { pmMerge } = merger(T0);
  const D = (k) => ymd(T0 - k * DAY);
  const s = (a, b) => pmMerge({ streak: a }, { streak: b }).streak;
  assert.deepEqual(s({ n: 5, last: D(1) }, { n: 1, last: D(0) }), { n: 6, last: D(0) }, "yesterday's 5 on one device and today on another: 6");
  assert.deepEqual(s({ n: 1, last: D(0) }, { n: 5, last: D(1) }), { n: 6, last: D(0) });
  assert.deepEqual(s({ n: 5, last: D(0) }, { n: 2, last: D(0) }), { n: 5, last: D(0) }, "the same days: the longer");
  assert.deepEqual(s({ n: 3, last: D(0) }, { n: 4, last: D(2) }), { n: 6, last: D(0) }, "overlapping: one run");
  assert.deepEqual(s({ n: 5, last: D(3) }, { n: 1, last: D(0) }), { n: 1, last: D(0) }, "a gap: the newer run (the older one had ended)");
  assert.deepEqual(s({ n: 5, last: D(1) }, { n: 0, last: "" }), { n: 5, last: D(1) }, "nothing on the other side: as it was");
  assert.deepEqual(s({ n: 0, last: "" }, { n: 0, last: "" }), { n: 0, last: "" });
  for (const [a, b] of [[{ n: 7, last: D(0) }, { n: 1, last: D(0) }], [{ n: 2, last: D(1) }, { n: 9, last: D(1) }], [{ n: 4, last: D(1) }, { n: 4, last: D(0) }]])
    assert.ok(s(a, b).n >= Math.max(a.n, b.n), "never lower: " + JSON.stringify([a, b]));
  const p = pmMerge({ played: { x: D(0), y: D(3), old: D(9) } }, { played: { x: D(2), y: D(1), z: D(8) } }).played;
  assert.deepEqual(p, { x: D(0), y: D(1), z: D(8) }, "the later day; older than 8 days goes");
  /* unsaved games are remembered 400 days and 100 at most */
  const t = {}; for (let i = 0; i < 130; i++) t["u" + i] = T0 - i * 3 * DAY;
  const m = pmMerge({ star: [], t }, null);
  assert.equal(Object.keys(m.t).length, 100);
  assert.ok(m.t.u0 && !m.t.u129, "the newest are kept");
});

test("3. what goes to My Logicers is cleaned: ids, days, names, addresses; the words of the side that merges win", () => {
  const { pmMerge, pmClean } = merger(T0);
  const c = pmClean({ star: ["ok-1", "BAD", "x".repeat(41), 5, "ok-1", "ok-2"], t: { "ok-1": T0, bad: "1", "ok-2": -4 },
    g: { "ok-1": ["es", "game-es-1", "Game\u0000 one", ""], "ok-2": ["es", "", "Logicers game", "https://logicers.com/es/the-club/"], x: ["es", "", "No link", ""],
      y: ["xx-YY", "s", "n", ""], z: ["es", "../evil", "n", ""], w: ["es", "", "n", "javascript:alert(1)"] },
    played: { "ok-1": "2026-11-26", bad: "yesterday" }, streak: { n: 2.5, last: "2026-11-26" }, lang: "<script>", extra: { x: 1 } });
  assert.deepEqual(c.star, ["ok-1", "ok-2"]);
  assert.deepEqual(c.t, { "ok-1": T0 });
  assert.deepEqual(c.g, { "ok-1": ["es", "game-es-1", "Game  one", ""], "ok-2": ["es", "", "Logicers game", "https://logicers.com/es/the-club/"] });
  assert.deepEqual(c.played, { "ok-1": "2026-11-26" });
  assert.deepEqual(c.streak, { n: 0, last: "" });
  assert.equal(c.lang, undefined);
  assert.equal(c.extra, undefined);
  const m = pmMerge({ star: ["a"], t: { a: 1 }, g: { a: ["es", "game-a", "Old name", ""] }, lang: "es" }, { star: ["a"], t: { a: 1 }, g: { a: ["es", "game-a", "New name", ""] }, lang: "fr" });
  assert.equal(m.g.a[2], "New name");
  assert.equal(m.lang, "fr");
  assert.equal(pmMerge({ lang: "es" }, {}).lang, "es");
});
