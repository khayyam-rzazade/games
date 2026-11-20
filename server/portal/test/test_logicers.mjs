/* Logicers' own games (plan 2.10, src/logicers.js): 12 games in each of the six languages, with the names the homes show.
   Every address is a page in the repository (when the tests run inside ~/games). With LIVE=1 each is also fetched and
   must answer 200 on logicers.com:   LIVE=1 node --test test/test_logicers.mjs */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LOGICERS, LG_LANGS, LG_GAMES, lgRow, lgRowLang } from "../src/logicers.js";
import { KINDS } from "../src/db.js";
import { realFetch } from "./lib.mjs";

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const inRepo = fs.existsSync(path.join(REPO, "index.html")) && fs.existsSync(path.join(REPO, "same-energy"));

test("12 games in each of the six languages; ids, families, kinds; the row a language shows", () => {
  assert.deepEqual(LG_LANGS, ["en", "it", "tr", "es", "pt", "fr"]);
  assert.equal(LG_GAMES.length, 12);
  assert.equal(LOGICERS.length, 72);
  assert.equal(new Set(LOGICERS.map((g) => g.id)).size, 72);
  assert.equal(new Set(LOGICERS.map((g) => g.lang + " " + g.url)).size, 72);
  for (const g of LOGICERS) {
    assert.ok(KINDS.includes(g.kind)); assert.ok(g.name && g.name.trim() === g.name);
    assert.match(g.url, /^https:\/\/logicers\.com\//);
    assert.equal(g.id, g.family + "-" + g.lang);
  }
  assert.equal(lgRowLang("de"), "en"); assert.equal(lgRowLang("es"), "es");
  assert.deepEqual(lgRow("ja").map((g) => g.lang), Array(12).fill("en"));
  assert.equal(LOGICERS.find((g) => g.id === "lg-energy-it").url, "https://logicers.com/it/same-energy/");
  assert.equal(LOGICERS.find((g) => g.id === "lg-energy-en").url, "https://logicers.com/same-energy/");
  assert.equal(LOGICERS.find((g) => g.id === "lg-altitude-tr").url, "https://logicers.com/altitude/?lang=tr");
});

test("every address is a page of the repository, and the homes still list these games under these names", { skip: !inRepo && "not inside ~/games" }, () => {
  for (const g of LOGICERS) {
    const p = new URL(g.url).pathname.replace(/^\//, "");
    assert.ok(fs.existsSync(path.join(REPO, p, "index.html")), g.id + ": " + p + "index.html");
  }
  for (const lang of LG_LANGS) {
    const home = fs.readFileSync(path.join(REPO, lang === "en" ? "" : lang, "index.html"), "utf8");
    for (const g of LOGICERS.filter((x) => x.lang === lang)) assert.ok(home.includes(">" + g.name + "</h3>"), lang + " home names " + g.name);
  }
});

test("LIVE=1: every address answers 200 on logicers.com", { skip: !process.env.LIVE && "set LIVE=1 to fetch the 72 addresses" }, async () => {
  const bad = [];
  for (let i = 0; i < LOGICERS.length; i += 6) {
    await Promise.all(LOGICERS.slice(i, i + 6).map(async (g) => {
      try {
        const r = await realFetch(g.url, { redirect: "follow", signal: AbortSignal.timeout(15000) });
        if (r.status !== 200 || !new URL(r.url).hostname.endsWith("logicers.com")) bad.push(g.url + " " + r.status + " " + r.url);
        try { await r.body.cancel(); } catch (x) { /* done */ }
      } catch (e) { bad.push(g.url + " " + e.message); }
    }));
  }
  assert.deepEqual(bad, []);
});
