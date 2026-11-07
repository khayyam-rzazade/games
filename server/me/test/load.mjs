/* Loads the Worker for the tests. When Chats A2 and A3 have delivered server/me/passkey.js and server/me/doors.js, the
   Worker is loaded as it is. Until then it is loaded from a copy of the folder in the system's temporary directory, with
   the two stand-ins of test/stand-ins/ beside it, so this folder itself is never changed by a test. */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { register } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

/* doors.js (Chat A3) imports common-passwords.txt as a string, as wrangler does; Node needs to be told the same, once */
register("data:text/javascript," + encodeURIComponent(`
  import { readFileSync } from "node:fs";
  import { fileURLToPath } from "node:url";
  export async function load(url, context, next) {
    if (url.startsWith("file:") && url.endsWith(".txt")) return { format: "module", shortCircuit: true, source: "export default " + JSON.stringify(readFileSync(fileURLToPath(url), "utf8")) + ";" };
    return next(url, context);
  }`));

const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.join(here, "..");
export const STANDIN = !fs.existsSync(path.join(ROOT, "passkey.js")) || !fs.existsSync(path.join(ROOT, "doors.js"));
let dir = process.env.ME_TEST_DIR || ROOT;          // test/mutate.mjs points this at a broken copy
if (!process.env.ME_TEST_DIR && STANDIN) {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), "logicers-me-"));
  for (const f of fs.readdirSync(ROOT)) if (f.endsWith(".js") || f.endsWith(".txt")) fs.copyFileSync(path.join(ROOT, f), path.join(dir, f));
  for (const f of ["passkey.js", "doors.js"]) if (!fs.existsSync(path.join(dir, f))) fs.copyFileSync(path.join(here, "stand-ins", f), path.join(dir, f));
}
export const mod = await import(pathToFileURL(path.join(dir, "worker.js")).href);
export const store = await import(pathToFileURL(path.join(dir, "store.js")).href);
export const M = globalThis.LogicersMeStats;
