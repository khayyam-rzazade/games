// The fault round: each fault is planted in a fresh copy of the server and the tests run on it; every fault must
// make them fail, and the controls (changes that alter nothing) must pass. Run: node test/faults.mjs  (about 20 s)
// The real files are never touched: each run gets its own folder under the system's temporary directory.
import { cpSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TESTS = ["test/test_items.mjs", "test/test_room.mjs", "test/test_worker.mjs"];

/* [name, file, [from, to] pairs (each "from" must be found exactly once), control?] */
const FAULTS = [
  ["the floor is 9", "src/items.js", [["export const FLOOR = 10;", "export const FLOOR = 9;"]]],
  ["an item shows from 1 answer", "src/items.js", [["if (answered(recs, it.i) >= FLOOR) out.counts", "if (answered(recs, it.i) >= 1) out.counts"]]],
  ["the phones without a side are ignored", "src/items.js", [["ns[1] >= FLOOR && partOk(ns[2], FLOOR)", "ns[1] >= FLOOR"]]],
  ["one side of 10 is enough", "src/items.js", [["if (ns[0] >= FLOOR && ns[1] >= FLOOR", "if (ns[0] >= FLOOR"]]],
  ["an item per side from one side's answers", "src/items.js", [["if (c[0] >= FLOOR && c[1] >= FLOOR && partOk(c[2], FLOOR))", "if (c[0] >= FLOOR)"]]],
  ["WHO-5 times 5", "src/items.js", [["c.who_mean = r1(meanOf(who, (s) => s * 4));", "c.who_mean = r1(meanOf(who, (s) => s * 5));"]]],
  ["band edge at 50", "src/items.js", [["score <= 50 ? 1", "score < 50 ? 1"]]],
  ["reverse items not reversed", "src/items.js", [['return it.good === "low" ? 100 - x : x;', "return x;"]]],
  ["a WHO-5 item may be skipped", "src/items.js", [["if (it.need) return { error: it.id };", ""]]],
  ["no upper bound", "src/items.js", [["Number.isInteger(v) && v >= it.min && v <= it.max", "Number.isInteger(v) && v >= it.min"]]],
  ["unknown keys taken", "src/items.js", [['for (const k of Object.keys(a)) if (!BY_ID.has(k)) return { error: "a." + String(k).slice(0, 24) };', ""]]],
  ["the bands from the bins", "src/items.js", [["c.bands = [0, 0, 0, 0]; who.forEach((x, s) => { c.bands[band(s * 4)] += x; });", "c.bands = [0, 0, 0, 0]; c.who.forEach((x, b) => { c.bands[band(b * 8)] += x; });"]]],
  ["sleep's bar made straight", "src/items.js", [["if (it.lifts) return it.lifts[k];", ""]]],
  ["stress from 0", "src/items.js", [['{ id: "st", type: "int", min: 1, max: 5, need: true }', '{ id: "st", type: "int", min: 0, max: 5, need: true }']]],
  ["the stress mean from 0", "src/items.js", [["meanOf(counts.st, (k) => k + 1)", "meanOf(counts.st, (k) => k)"]]],
  ["agreeing weighs", "src/items.js", [['Object.assign({ id: "p_say", good: "low", bar: true }, FIVE),', 'Object.assign({ id: "p_say", good: "high", bar: true }, FIVE),']]],
  ["the old mind words", "src/items.js", [['opts: ["money", "work_or_studies",', 'opts: ["money", "work",']]],
  ["charts before the reveal", "src/room.js", [['done = this.doneCount(); charts = { n: r.step === "play" ? done : 0 };', 'done = this.doneCount(); { const k = release([...this.phones.values()].filter((p) => p.a !== null), r.sides); charts = r.step === "play" ? chartsOf(done, k.who, k.counts) : { n: 0 }; }']]],
  ["answers after the reveal", "src/room.js", [['if (r.step !== "play") return no(409, "closed");\n    if (b.round !== r.round)', "if (b.round !== r.round)"], ['if (this.room !== r || r.step !== "play" || b.round !== r.round)', "if (this.room !== r || b.round !== r.round)"]]],
  ["the phones' answers kept after the reveal", "src/room.js", [["for (let i = 0; i < keys.length; i += 128) await this.storage.delete(keys.slice(i, i + 128));", ""]]],
  ["a redo adds", "src/room.js", [["const rec = { a: c.compact, s };\n    this.phones.set(h, rec);", "const rec = { a: c.compact, s };\n    this.phones.set(h + this.phones.size, rec);"]]],
  ["a live round lasts 24 hours", "src/room.js", [["export const LIVE_MS = 12 * HOUR;", "export const LIVE_MS = 24 * HOUR;"]]],
  ["an open round lasts 8 days", "src/room.js", [["export const OPEN_MS = 7 * DAY;", "export const OPEN_MS = 8 * DAY;"]]],
  ["kept 61 days", "src/room.js", [["export const KEEP_MS = 60 * DAY;", "export const KEEP_MS = 61 * DAY;"]]],
  ["a poll is a use", "src/room.js", [["if (!r) return no(404, \"unknown\");\n    return out(200, '{\"ok\":true,\"state\":'", "if (!r) return no(404, \"unknown\");\n    if (this.touch(r)) await this.save();\n    return out(200, '{\"ok\":true,\"state\":'"]]],
  ["the host page is not a use", "src/room.js", [["if (!(await this.hostOk(r, b.host_key))) return no(403, \"host\");\n    if (this.touch(r)) await this.save();", "if (!(await this.hostOk(r, b.host_key))) return no(403, \"host\");"]]],
  ["any host key", "src/room.js", [["if (!(await this.hostOk(r, b.host_key))) return no(403, \"host\");\n    const t = this.now();", "const t = this.now();"]]],
  ["tried takes any item", "src/room.js", [["if (b.id !== null && !TRIED_IDS.includes(b.id))", "if (b.id === undefined)"]]],
  ["two sides of one name", "src/room.js", [[" || sides[0].toLowerCase() === sides[1].toLowerCase()", ""]]],
  ["phone keys stored as they are", "src/room.js", [["async phoneHash(r, key) { return (await sha(r.salt + \":\" + key)).slice(0, 32); }", "async phoneHash(r, key) { return key; }"]]],
  ["the host key stored as it is", "src/room.js", [["code, tag: randomFrom(TAG_ALPHABET, 12), host: await sha(hostKey),", "code, tag: randomFrom(TAG_ALPHABET, 12), host: hostKey,"]]],
  ["next keeps the old charts", "src/room.js", [['r.step = "lobby"; r.shown = null; break;', 'r.step = "lobby"; break;']]],
  ["close does not reveal", "src/room.js", [['if (r.step === "play") { r.last = t; await this.reveal(r, t); }\n        r.step = "closed";', 'r.step = "closed";']]],
  ["joins after the close", "src/room.js", [['if (r.step === "closed") return no(409, "closed");\n    const h = await this.phoneHash(r, b.key);', "const h = await this.phoneHash(r, b.key);"], ['if (this.room !== r || r.step === "closed") return no(409, "closed");', ""]]],
  ["a no keeps the answers", "src/worker.js", [["UPDATE pending SET status = 'no', answers = NULL, kept = NULL", "UPDATE pending SET status = 'no', kept = NULL"]]],
  ["silence kept 48 hours", "src/worker.js", [["const PENDING_MS = 24 * 36e5;", "const PENDING_MS = 48 * 36e5;"]]],
  ["a change of mind keeps the row", "src/worker.js", [['if (row.status === "yes" && row.kept !== null) stmts.push(', 'if (false) stmts.push(']]],
  ["the room tag kept as it is", "src/worker.js", [['const room = rt.tag ? (await shaHex("checkin-room:" + rt.tag)).slice(0, 24) : null;', "const room = rt.tag;"]]],
  ["a country opens at 29", "src/worker.js", [["const OPENS_AT = 30;", "const OPENS_AT = 29;"]]],
  ["the window is 31 days", "src/worker.js", [["const WINDOW_DAYS = 30;", "const WINDOW_DAYS = 31;"]]],
  ["delete leaves the pending", "src/worker.js", [['env.DB.prepare("DELETE FROM pending WHERE id = ?").bind(b.id),', ""]]],
  ["any origin", "src/worker.js", [["if (list.includes(origin)) return origin;", "return origin;"]]],
  ["Turnstile never asked", "src/worker.js", [["if (!env.TURNSTILE_SECRET) return true;", "return true;"]]],
  ["any admin key", "src/worker.js", [['if (!env.ADMIN_KEY || typeof b.key !== "string" || !same(await shaHex(b.key), await shaHex(env.ADMIN_KEY)))', "if (!env.ADMIN_KEY)"]]],
  ["no sweep brake", "src/worker.js", [['if (swept(ip, code)) return withCors(bad("too many", 429));', ""]]],
  ["no brake on one phone's redos", "src/worker.js", [[' || !brake("dk:" + code + ":" + String(b.key).slice(0, 40), LIMITS.done_key)', ""]]],
  ["the world counted as a country", "src/worker.js", [["const c = await env.DB.prepare(\"SELECT COUNT(*) AS k FROM tally WHERE day = ? AND country NOT IN ('*', 'XX') AND n > 0\").bind(today).first();\n    return { ok: true,", "const c = await env.DB.prepare(\"SELECT COUNT(*) AS k FROM tally WHERE day = ? AND country != 'XX' AND n > 0\").bind(today).first();\n    return { ok: true,"]]],
  ["age and country swapped", "src/worker.js", [["status = 'pending'`).bind(age, country, cv, b.id, h)", "status = 'pending'`).bind(country, age, cv, b.id, h)"]]],
  ["kept before the yes", "src/worker.js", [["stmts.push(countStmt(env, \"upload\"));", "stmts.push(env.DB.prepare(`INSERT INTO checkins (id, item_version, day) VALUES (?, ?, ?)`).bind(b.id, v, dayOf(t))); stmts.push(countStmt(env, \"upload\"));"]]],
  ["any consent version", "src/worker.js", [['if (cv !== null && !CONSENT_VERSIONS.includes(cv)) return bad("consent_version");', ""]]],
  ["the band 0-3", "src/worker.js", [["band: band(sum * 4) + 1, st }", "band: band(sum * 4), st }"]]],
  ["first counted without the flag", "src/worker.js", [["if (b.first === true) stmts.push(countStmt(env, \"first\"));", "if (b.first) stmts.push(countStmt(env, \"first\"));"]]],
  ["five pending become all", "src/worker.js", [["const PENDING_PER_ID = 5;", "const PENDING_PER_ID = 500;"]]],
  /* controls: they change nothing and must pass */
  ["control: a comment", "src/items.js", [["export const FLOOR = 10;", "export const FLOOR = 10;   // a control"]], true],
  ["control: the same rule written another way", "src/room.js", [["export const KEEP_MS = 60 * DAY;", "export const KEEP_MS = DAY * 60;"]], true],
];

function plant(dir, file, pairs) {
  const p = join(dir, file); let s = readFileSync(p, "utf8");
  for (const [from, to] of pairs) {
    const n = s.split(from).length - 1;
    if (n !== 1) throw new Error(`"${from.slice(0, 60)}" found ${n} times in ${file}`);
    s = s.replace(from, () => to);
  }
  writeFileSync(p, s);
}
function run(dir) {
  return new Promise((resolve) => {
    const c = spawn(process.execPath, ["--test", ...TESTS], { cwd: dir, stdio: ["ignore", "pipe", "pipe"] });
    let out = ""; c.stdout.on("data", (d) => { out += d; }); c.stderr.on("data", (d) => { out += d; });
    const t = setTimeout(() => c.kill("SIGKILL"), 120e3);
    c.on("close", (code) => { clearTimeout(t); const m = /# fail (\d+)/.exec(out); resolve({ code, failed: m ? Number(m[1]) : null }); });
  });
}
async function one([name, file, pairs, control]) {
  const dir = mkdtempSync(join(tmpdir(), "checkin-fault-"));
  try {
    cpSync(join(ROOT, "src"), join(dir, "src"), { recursive: true });
    cpSync(join(ROOT, "test"), join(dir, "test"), { recursive: true });
    cpSync(join(ROOT, "package.json"), join(dir, "package.json"));
    plant(dir, file, pairs);
    const r = await run(dir);
    const ok = control ? r.code === 0 : r.code !== 0;
    return { name, control: !!control, ok, failed: r.failed };
  } catch (e) {
    return { name, control: !!control, ok: false, error: e.message };
  } finally { rmSync(dir, { recursive: true, force: true }); }
}
const results = [];
const queue = FAULTS.slice();
await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) results.push(await one(queue.shift())); }));
results.sort((a, b) => FAULTS.findIndex((f) => f[0] === a.name) - FAULTS.findIndex((f) => f[0] === b.name));
for (const r of results) console.log(`${r.ok ? "ok  " : "MISS"} ${r.control ? "control" : "fault  "} ${r.name}${r.error ? "  (" + r.error + ")" : r.control ? "" : `  (${r.failed} tests failed)`}`);
const faults = results.filter((r) => !r.control), controls = results.filter((r) => r.control);
console.log(`\n${faults.filter((r) => r.ok).length} of ${faults.length} faults caught; ${controls.filter((r) => r.ok).length} of ${controls.length} controls passed`);
process.exit(results.every((r) => r.ok) ? 0 : 1);
