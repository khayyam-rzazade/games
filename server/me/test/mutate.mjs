/* Breaks the merge on purpose, one way at a time, and shows that the tests catch every break.
   Run: node test/mutate.mjs   (each broken copy lives in the system's temporary directory; nothing here changes) */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.join(here, "..");
const SRC = fs.readFileSync(path.join(ROOT, "me-stats.js"), "utf8");
const BREAKS = [
  ["a day is played only if both say so (union -> intersection)", "if (p) { on = true;", "if (p && parts.length > 1 && x === parts[0]) { on = true;"],
  ["the worse grade wins", "return rank(b) > rank(a) ? b : a;", "return rank(b) < rank(a) && rank(b) > 0 ? b : a;"],
  ["the later f wins (alignment lost)", "lo = Math.min(lo, s);", "lo = Math.max(lo, s);"],
  ["n, s, b: the smaller", "if (typeof v === \"number\" && isFinite(v) && v > m) m = v;", "if (typeof v === \"number\" && isFinite(v) && (m === 0 || v < m)) m = v;"],
  ["logicer: the higher number", "Math.min(la, lb)", "Math.max(la, lb)"],
  ["first: the later", "(a <= b ? a : b)", "(a >= b ? a : b)"],
  ["langs: only the stored ones", "(a.langs || []).concat(b.langs || [])", "(a.langs || [])"],
  ["mine: only the arriving ones", "(a.mine || []).concat(b.mine || [])", "(b.mine || [])"],
  ["box: the older wins", "boxB && (!boxA || ub > ua)", "boxB && (!boxA || ub < ua)"],
  ["doors: the arriving ones", "out.doors = a.doors || null;", "out.doors = b.doors || null;"],
  ["votes: the stored ones only", "out.story.votes = maxN(a.story && a.story.votes, b.story && b.story.votes);", "out.story.votes = (a.story && a.story.votes) || 0;"],
  ["the stamps: only the stored ones", "[a && a.k, b && b.k].forEach", "[a && a.k].forEach"],
  ["a missed day breaks the streak", "if (!on[n] && on[n - 1]) n--;", ""],
];
let caught = 0;
for (const [name, from, to] of BREAKS) {
  if (!SRC.includes(from)) { console.log("NOT FOUND, the break cannot be made: " + name); process.exitCode = 1; continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "logicers-me-mut-"));
  for (const f of fs.readdirSync(ROOT)) if (f.endsWith(".js") || f.endsWith(".txt")) fs.copyFileSync(path.join(ROOT, f), path.join(dir, f));
  for (const f of ["passkey.js", "doors.js"]) if (!fs.existsSync(path.join(dir, f))) fs.copyFileSync(path.join(here, "stand-ins", f), path.join(dir, f));
  fs.writeFileSync(path.join(dir, "me-stats.js"), SRC.replace(from, to));
  const r = spawnSync(process.execPath, ["--test", "--test-name-pattern=sync merges|two phones|stats:|streak|clean|merge on its own", path.join(here, "test_worker.mjs")],
    { env: Object.assign({}, process.env, { ME_TEST_DIR: dir }), encoding: "utf8" });
  const failed = r.status !== 0;
  console.log((failed ? "caught    " : "MISSED    ") + name);
  if (failed) caught++; else process.exitCode = 1;
}
console.log(caught + " of " + BREAKS.length + " breaks caught");
