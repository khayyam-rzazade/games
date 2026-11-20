/* The settings, the languages, the words, schema.sql and the address rules. */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import { _test } from "./lib.mjs";
import { LANGS, LAUNCH, nameParts, pageName, htmlLang } from "../src/langs.js";
import { WORDS, KEYS, withN } from "../src/words.js";
import { linkOk, norm, site, readHead, langOfTag, hostOk } from "../src/check.js";
import { deviceOk, ring } from "../src/util.js";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, "..");

/* the Studio's lesson (9 Nov 2026): a path a "!" pattern of run_worker_first matches never reaches the Worker */
test("wrangler.jsonc: every dynamic path reaches the Worker; only /a/* is static", () => {
  const raw = fs.readFileSync(path.join(ROOT, "wrangler.jsonc"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const cfg = JSON.parse(raw);
  const pats = cfg.assets.run_worker_first;
  const glob = (p) => new RegExp("^" + p.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$");
  const toWorker = (p) => pats.some((x) => !x.startsWith("!") && glob(x).test(p)) && !pats.some((x) => x.startsWith("!") && glob(x.slice(1)).test(p));
  for (const p of ["/", "/es/", "/es/words/", "/es/g/contexto/", "/pl/g/x.y/", "/about/", "/admin/", "/api/hit", "/api/counts", "/api/es/games",
    "/admin/queue", "/sitemap.xml", "/sitemap-root.xml", "/es/sitemap.xml", "/robots.txt", "/health", "/favicon.ico", "/es/g/game.jpg/", "/zh-hans/"]) {
    assert.ok(toWorker(p), p + " must reach the Worker");
  }
  for (const p of ["/a/portal.css", "/a/portal.3f2a9c1b.js", "/a/icons.svg", "/a/fonts/geologica.woff2"]) assert.ok(!toWorker(p), p + " is a static file");
  assert.deepEqual(pats.filter((x) => x.startsWith("!")), ["!/a/*"]);
  assert.equal(cfg.assets.directory, "../../portal");
  assert.deepEqual(cfg.triggers.crons, ["10 2 * * *"]);
  assert.ok(cfg.limits.cpu_ms >= 30000 && cfg.limits.cpu_ms <= 300000);
  assert.equal(cfg.observability.enabled, false);
  assert.equal(cfg.d1_databases[0].database_name, "logicers-portal");
  assert.equal(cfg.routes[0].pattern, "play.logicers.com");
});

test("schema.sql says what the code makes", () => {
  const strip = (s) => s.replace(/--.*$/gm, "").replace(/\s+/g, " ").replace(/;\s*/g, ";").trim();
  assert.equal(strip(fs.readFileSync(path.join(ROOT, "schema.sql"), "utf8")), strip(_test.SCHEMA.join(";") + ";"));
  const db = new DatabaseSync(":memory:");
  db.exec(fs.readFileSync(path.join(ROOT, "schema.sql"), "utf8"));
});

test("the languages of 2.13: 51 rows (Chinese as two), launch 12, Polish Graj, right to left, endonyms as names", () => {
  assert.equal(LANGS.length, 51);
  assert.equal(new Set(LANGS.map((l) => l.code)).size, 51);
  assert.equal(new Set(LANGS.map((l) => l.endonym)).size, 51);
  assert.deepEqual(LAUNCH, ["en", "es", "pt", "fr", "de", "it", "tr", "ru", "pl", "nl", "ja", "ko"]);
  assert.equal(LANGS.filter((l) => l.group === "phase2").length, 19);
  assert.equal(LANGS.filter((l) => l.group === "later").length, 20);
  assert.deepEqual(LANGS.filter((l) => l.play_word !== "Play").map((l) => l.code), ["pl"]);
  assert.deepEqual(nameParts("pl"), ["Graj", "po polsku"]);   /* chat C, 19 Nov 2026: name_lang "po polsku" */
  assert.equal(pageName("es"), "Play Español"); assert.equal(pageName("ja"), "Play 日本語"); assert.equal(pageName("ko"), "Play 한국어");
  assert.deepEqual(LANGS.filter((l) => l.dir === "rtl").map((l) => l.code).sort(), ["ar", "fa", "he", "ur"]);
  assert.equal(htmlLang("zh-hant"), "zh-Hant");
  for (const l of LANGS) {
    assert.match(l.code, /^[a-z]{2,3}(-[a-z]{4})?$/);
    assert.equal(l.endonym, l.endonym.trim()); assert.ok(l.endonym.length >= 2);
    const first = l.endonym[0];
    assert.ok(first === first.toLocaleUpperCase(l.code.slice(0, 2)) || first === first.toLowerCase(), l.code + ": capitalised as a name (where the script has capitals)");
    assert.doesNotThrow(() => new Intl.NumberFormat(htmlLang(l.code)));
  }
});

test("the words: every launch file has every English key with its {n} and {lang}; every file in words/ is imported", () => {
  const files = fs.readdirSync(path.join(ROOT, "words")).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5)).sort();
  assert.deepEqual(files, [...LAUNCH].sort());
  assert.deepEqual(Object.keys(WORDS).sort(), files, "src/words.js imports every file of words/");
  const en = WORDS.en;
  for (const k of ["play_word", "by", "from_logicers", "play", "new", "mine", "more", "today_n", "total_n", "players_today", "cat.words", "cat.numbers",
    "cat.maps", "cat.knowledge", "cat.music", "cat.screen", "cat.sport", "cat.other", "wanted", "add", "f.link", "f.lang", "f.kind", "f.name", "f.email",
    "f.optional", "f.send", "f.thanks", "f.e_link", "f.e_here", "f.e_busy", "report", "r.broken", "r.notdaily", "r.lang", "r.unsafe", "r.other",
    "r.thanks", "yours_q", "seo.daily", "seo.desc", "en_chip", "about_en", "nf"]) assert.ok(k in en, "en.json has " + k + " (2.4)");
  const marks = (s) => (s.match(/\{[a-z]+\}/g) || []).sort().join();
  for (const [code, w] of Object.entries(WORDS)) {
    for (const k of Object.keys(w)) assert.ok(KEYS.includes(k) || /\.(zero|one|two|few|many)$/.test(k), code + ": unknown key " + k);
    for (const k of KEYS) {
      if (/\.(zero|one|two|few|many)$/.test(k)) continue;
      assert.equal(typeof w[k], "string", code + " " + k);
      assert.ok(w[k].trim().length > 0, code + " " + k + " is empty");
      assert.equal(marks(w[k]), marks(en[k]), code + " " + k + ": keep {n} and {lang}");
    }
    for (const k of Object.keys(w).filter((x) => /\.(zero|one|two|few|many)$/.test(x))) assert.equal(marks(w[k]), "{n}", code + " " + k);
  }
  assert.equal(withN("en", "players_today", 1), "1 player today");
  assert.equal(withN("en", "players_today", 1234), "1,234 players today");
});

test("the address rules: what may be sent, the duplicate form, the registrable domain", () => {
  for (const u of ["https://contexto.me/", "https://www.example.co.uk/a?b=1", "https://xn--80ak6aa92e.com/", "https://a.b.c.example.com/x/y/"]) assert.ok(linkOk(u), u);
  for (const u of ["http://x.com/", "https://x/", "https://1.2.3.4/", "https://0x7f.1/", "https://[2001:db8::1]/", "https://a.local/", "https://a.internal/",
    "https://localhost:3000/", "https://u@x.com/", "https://x.com:444/", "javascript:alert(1)", "https://x.com-/", "https://-x.com/"]) assert.equal(linkOk(u), null, u);
  assert.equal(norm(new URL("https://WWW.Example.com/Es/Juego/?utm_source=a&n=2&gclid=z#top")), "example.com/Es/Juego?n=2");
  assert.equal(norm(new URL("https://example.com/")), "example.com");
  assert.equal(norm(new URL("https://example.com")), "example.com");
  assert.equal(site("juegos.example.co.uk"), "example.co.uk");
  assert.equal(site("www.example.com.br"), "example.com.br");
  assert.equal(site("anna.github.io"), "anna.github.io");
  assert.equal(site("x.anna.github.io"), "anna.github.io");
  assert.equal(site("app.example.pages.dev"), "example.pages.dev");
  assert.equal(site("a.b.example.com"), "example.com");
  assert.equal(site("example.it"), "example.it");
  assert.ok(hostOk("contexto.me")); assert.ok(!hostOk("contexto"));
  assert.deepEqual(readHead('<!DOCTYPE html><html class="x" lang="pt-BR"><head><title> Termo &amp; co </title><meta content="Adivinhe a palavra" name="description">'),
    { title: "Termo & co", lang: "pt-BR", desc: "Adivinhe a palavra" });
  assert.equal(langOfTag("pt-BR"), "pt"); assert.equal(langOfTag("zh-TW"), "zh-hant"); assert.equal(langOfTag("zh"), "zh-hans"); assert.equal(langOfTag("nb-NO"), "no");
});

test("the device id's shape and the tile colours", () => {
  const b = new Uint8Array(16);
  for (let i = 0; i < 200; i++) {
    crypto.getRandomValues(b);
    const id = Buffer.from(b).toString("base64url");
    assert.ok(deviceOk(id), id);
  }
  assert.ok(!deviceOk("AAAAAAAAAAAAAAAAAAAAAB"));
  assert.equal(ring("abc"), ring("abc"));
  const seen = new Set(Array.from({ length: 500 }, (_, i) => ring("g" + i)));
  assert.equal(seen.size, 12);
});

test("a plural form never falls back to English", async () => {
  const { pluralKey } = await import("../src/words.js");
  const saved = WORDS.es["players_today.one"];
  delete WORDS.es["players_today.one"];
  try { assert.equal(pluralKey("es", "players_today", 1), "players_today"); }
  finally { if (saved !== undefined) WORDS.es["players_today.one"] = saved; }
  assert.equal(pluralKey("en", "players_today", 1), "players_today.one");
  assert.equal(pluralKey("en", "players_today", 2), "players_today");
});

test("the Origin rule: the portal only; localhost and wrangler dev's http://play.logicers.com only in a local run", () => {
  const prod = { SITE: "https://play.logicers.com", ALLOW_ORIGINS: "" }, local = { SITE: "https://play.logicers.com", ALLOW_ORIGINS: "localhost" };
  assert.ok(_test.originOk(prod, "https://play.logicers.com"));
  for (const o of [null, "", "http://play.logicers.com", "http://localhost:8787", "https://logicers.com", "https://play.logicers.com.evil.com"]) assert.ok(!_test.originOk(prod, o), String(o));
  for (const o of ["http://localhost:8787", "http://127.0.0.1:8787", "http://play.logicers.com"]) assert.ok(_test.originOk(local, o), o);
  assert.ok(!_test.originOk(local, "https://evil.example.com"));
});
