/* Writes src/ourgames.js: the titles of Logicers' own daily games, in every language tree, read from the pages'
   og:title and og:description, for the oEmbed answers (Chat A, 8 Nov 2026).
   Run it again when a daily game or a language is added:   node scripts/ourgames.mjs   (from server/studio) */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(here, "..", "..", "..");
/* the daily games: the nine with a page in every language tree, and the ones with one page for all languages */
const DAILY = ["same-energy", "100-of-us", "your-call", "long-lost-cousin", "the-club", "years-apart", "who-gets-what",
  "every-beat", "out-of-24", "same-street", "altitude", "passport", "lookalike"];
const TREES = ["", "es", "fr", "it", "pt", "tr"];
const ent = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
function meta(html, prop) {
  const m = new RegExp('<meta[^>]+property="' + prop + '"[^>]*\\scontent="([^"]*)"', "i").exec(html)
    || new RegExp('<meta[^>]+\\scontent="([^"]*)"[^>]*property="' + prop + '"', "i").exec(html);
  return m ? ent(m[1]).trim() : "";
}
const out = {};
for (const g of DAILY) {
  for (const t of TREES) {
    const f = path.join(ROOT, t, g, "index.html");
    if (!fs.existsSync(f)) continue;
    const html = fs.readFileSync(f, "utf8");
    let title = meta(html, "og:title");
    if (!title) { const m = /<title[^>]*>([^<]*)<\/title>/i.exec(html); title = m ? ent(m[1]).split(/\s*[:|—]\s*/)[0].trim() : g; }
    (out[g] || (out[g] = {}))[t || "en"] = { title, desc: meta(html, "og:description") };
  }
}
const text = "/* Logicers' own daily games, as their pages name them (written by scripts/ourgames.mjs; do not edit by hand). */\n" +
  "export const OUR_GAMES = " + JSON.stringify(out, null, 1) + ";\n";
fs.writeFileSync(path.join(here, "..", "src", "ourgames.js"), text);
console.log(Object.entries(out).map(([g, l]) => g + " " + Object.keys(l).join(",")).join("\n"));
