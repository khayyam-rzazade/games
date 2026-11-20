/* The static files of portal/ (chat B, 19 Nov 2026): the stamps in ASSET are those of the files (npm run stamp), every file
   a page asks for exists, the fonts and their licence are there, and nothing in the CSS or the scripts breaks the CSP
   (no inline style written by a script, no eval, no outside address). */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { ASSET } from "../src/pages.js";
import { FILES, stampOf } from "../scripts/stamp.mjs";

const PORTAL = fileURLToPath(new URL("../../../portal/", import.meta.url));
const read = (p) => fs.readFileSync(PORTAL + p, "utf8");

test("ASSET names every static file with the stamp of its content", () => {
  for (const [k, f] of Object.entries(FILES)) assert.equal(ASSET[k], `/a/${f}?v=${stampOf(f)}`, `${f}: run npm run stamp`);
});

test("the fonts the CSS asks for exist, with the OFL licence beside them", () => {
  const css = read("a/portal.css");
  const fonts = [...css.matchAll(/url\("?fonts\/([^")]+)"?\)/g)].map((m) => m[1]);
  assert.ok(fonts.length >= 5, "Geologica in its subsets");
  for (const f of fonts) assert.ok(fs.existsSync(PORTAL + "a/fonts/" + f), f);
  assert.match(read("a/fonts/OFL.txt"), /SIL OPEN FONT LICENSE Version 1\.1/);
  assert.match(read("a/fonts/OFL.txt"), /Geologica Project Authors/);
});

test("every icon a page uses is drawn in icons.svg", async () => {
  const svg = read("a/icons.svg");
  const src = fs.readFileSync(new URL("../src/pages.js", import.meta.url), "utf8") + read("a/portal.js") + read("a/admin.js");
  const ids = new Set([...src.matchAll(/["'(]((?:k|i)-[a-z]+)["')]/g)].map((m) => m[1]).filter((x) => /^(k|i)-/.test(x)));
  for (const k of ["words", "numbers", "maps", "knowledge", "music", "screen", "sport", "other"]) ids.add("k-" + k);
  for (const id of ids) assert.match(svg, new RegExp(`<symbol id="${id}" `), id);
});

test("the CSS is logical (no left or right) and keeps the ring colours as classes", () => {
  const css = read("a/portal.css").replace(/\/\*[\s\S]*?\*\//g, "");
  assert.doesNotMatch(css, /(margin|padding|border)-(left|right)\b|(^|[;{\s])(left|right)\s*:|text-align:\s*(left|right)|float:\s*(left|right)/m);
  for (let i = 0; i < 12; i++) assert.match(css, new RegExp(`\\.t${i}\\s*\\{`), "t" + i);
  assert.match(css, /prefers-color-scheme:\s*dark/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test("the scripts keep to the CSP: no eval, no inline style or HTML strings, no outside address", () => {
  for (const f of ["a/portal.js", "a/admin.js"]) {
    const js = read(f);
    assert.doesNotMatch(js, /\beval\(|new Function\(|setTimeout\(\s*["'`]/, f);
    assert.doesNotMatch(js, /\.innerHTML\s*=|insertAdjacentHTML|outerHTML\s*=|document\.write/, f);
    assert.doesNotMatch(js, /\.style\.|setAttribute\(\s*["']style/, f);
    assert.doesNotMatch(js, /https?:\/\/(?!play\.logicers\.com|www\.w3\.org\/2000\/svg)[a-z0-9-]+\./i, f);
  }
  assert.match(read("a/admin.js"), /createPolicy\("portal-admin"/);
});

test("nothing in portal/ is a page a search engine would index on logicers.com", () => {
  const walk = (d) => fs.readdirSync(PORTAL + d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(d + e.name + "/") : [d + e.name]));
  const pages = walk("").filter((f) => /\.html?$/.test(f));
  for (const p of pages) assert.match(read(p), /<meta name="robots" content="noindex/, p);
  const ignore = read(".assetsignore");
  assert.match(ignore, /tests/);
  assert.doesNotMatch(ignore, /_headers/);
});
