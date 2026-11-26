/* Play Logicers' check (chat M, 26 Nov 2026): logicers.com on this computer, for the bridge to My Logicers. It is My Logicers' own
   test server (me/tests/server.mjs) with the real me-stats.js and me.js: the site's files, and a stand-in of the My Logicers Worker
   at /__me (the real record's rules: me-stats.js clean and merge). check.py starts it (section 18) and a local Worker points its
   bridge at it: npx wrangler dev ... --var BRIDGE:http://127.0.0.1:4197/portal/bridge.html
     node portal/tests/me-site.mjs [port]     (default 4197; stops with Ctrl+C) */
import path from "node:path";
import { fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url));
process.env.ME_REAL = process.env.ME_REAL || path.resolve(HERE, "../../assets/js");
const { start } = await import("../../me/tests/server.mjs");
const port = +(process.argv[2] || process.env.ME_SITE_PORT || 4197);
const s = await start(port, { real: true });
console.log("logicers.com stand-in on " + s.url);
