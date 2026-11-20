/* Play Logicers: the stamps of the static files (chat B, 19 Nov 2026). Run after any change to portal/a/portal.css,
   portal.js, admin.js, icons.svg, icon.svg or maker.js (the claim pages and the maker's form, chat J, 20 Nov 2026):
     npm run stamp
   It writes the start of each file's SHA-256 (10 characters, as stamp.py does for logicers.com) into the ASSET line of
   src/pages.js ("/a/portal.css?v=3f2a9c1b0e"), so a browser never keeps an old file beside a new page. The files keep
   their plain names; portal/_headers lets browsers keep /a/* for a year, which is safe because every new version has a
   new address. test/test_assets.mjs fails while a stamp is out of date. The fonts carry their version in their names
   (geologica-latin.v1.woff2): a new font gets a new name. */
import { createHash } from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const A = fileURLToPath(new URL("../../../portal/a/", import.meta.url));
const PAGES = fileURLToPath(new URL("../src/pages.js", import.meta.url));
export const FILES = { css: "portal.css", js: "portal.js", admin: "admin.js", icons: "icons.svg", icon: "icon.svg", maker: "maker.js" };
export const stampOf = (name) => createHash("sha256").update(fs.readFileSync(A + name)).digest("hex").slice(0, 10);
export const assetLine = () => "export const ASSET = { " + Object.entries(FILES).map(([k, f]) => `${k}: "/a/${f}?v=${stampOf(f)}"`).join(", ") + " };";
export const LINE = /^export const ASSET = \{[^\n]*\};$/m;

if (process.argv[1] && fileURLToPath(import.meta.url) === fs.realpathSync(process.argv[1])) {
  const src = fs.readFileSync(PAGES, "utf8");
  if (!LINE.test(src)) { console.error("src/pages.js: no ASSET line"); process.exit(1); }
  const next = src.replace(LINE, assetLine());
  if (next === src) console.log("the stamps were already right");
  else { fs.writeFileSync(PAGES, next); console.log("stamped: " + assetLine().replace(/^export const ASSET = /, "")); }
}
