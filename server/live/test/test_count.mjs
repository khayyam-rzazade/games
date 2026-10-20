/* Logicer numbers (20 Oct 2026), the server's checks, against `wrangler dev` (see test_said.mjs for how to start it):
     LIVE_URL=http://127.0.0.1:8787 node test/test_count.mjs */
import { BASE, ORIGIN, ok, eq, report, someIp } from "./lib.mjs";

async function post(path, body, opts = {}) {
  const h = { "Content-Type": "application/json", Origin: opts.origin || ORIGIN, "CF-Connecting-IP": opts.ip || someIp(), "X-Test-Geo": "IT,EU", "Sec-Fetch-Mode": "cors" };
  const res = await fetch(BASE + path, { method: "POST", headers: h, body: typeof body === "string" ? body : JSON.stringify(body) });
  let j = null; try { j = await res.json(); } catch (e) { /* none */ }
  return { status: res.status, ...(j || {}) };
}

const v0 = await post("/count/view", { v: 1 });
eq(v0.status, 200, "the total can be read");
ok(Number.isInteger(v0.n) && v0.n >= 0, "it is a whole number");
const a = await post("/count/join", { v: 1 });
eq(a.status, 200, "a number is given");
const b = await post("/count/join", { v: 1 });
eq(b.n, a.n + 1, "the next one is the next number");
eq(a.n, v0.n + 1, "numbers go on from the total");
const v1 = await post("/count/view", { v: 1 });
ok(v1.n >= b.n - 0 && v1.n <= b.n, "the total is the last number given (a copy may keep it 30 seconds, but a join refreshes it)");
ok(Object.keys(a).sort().join(",") === "n,status", "nothing but the number comes back");
eq((await post("/count/join", { v: 2 })).e, "old", "another version of the call");
eq((await post("/count/join", { v: 1 }, { origin: "https://evil.example" })).status, 403, "another site's page is refused");
/* the brake: one address gets 60 numbers in ten minutes, then waits */
const ip = someIp();
let last = 0;
for (let i = 0; i < 62; i++) last = (await post("/count/join", { v: 1 }, { ip })).status;
eq(last, 429, "one address is stopped after a good many");
eq((await post("/count/view", { v: 1 }, { ip })).status, 200, "reading the total is not stopped by it");
/* the world's counts and the desk's totals are untouched */
const w = await post("/stats/world", { v: 1, d: new Date().toISOString().slice(0, 10).replace(/-/g, ""), span: "day" });
eq(w.status, 200, "the world's counts still answer");
process.exit(report("count"));
