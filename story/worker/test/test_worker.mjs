/* The server's own tests: worker.js whole, on an ordinary SQLite database (d1shim.mjs), with no internet and
   nothing installed: `node test/test_worker.mjs` from story/worker/. The clock is passed in, so a whole week runs in a moment. */
import { D1 } from "./d1shim.mjs";
import * as W from "../worker.js";

let passed = 0, failed = 0;
function ok(name, cond) { if (cond) passed++; else { failed++; console.log("FAIL  " + name); } }

const DAY = 86400000;
const LAUNCH = "2026-11-09";                       // a Monday (the real launch)
const L = Date.parse(LAUNCH + "T00:00:00Z");
const at = (n, h = 12, m = 0) => L + n * DAY + h * 3600e3 + m * 60e3;     // day n since launch, at h:m UTC
const dev = (i) => String(i).padStart(4, "0").repeat(8);                 // 32 hex characters
function envOf() { return { DB: new D1(), LAUNCH, WEEKS: "4", ALLOW_ORIGINS: "https://logicers.com localhost" }; }
function req(method, path, body, o) {
  o = o || {};
  const h = { "Content-Type": "application/json" };
  if (o.origin) h["Origin"] = o.origin;
  if (o.ip) h["CF-Connecting-IP"] = o.ip;
  const r = new Request("https://story.example" + path, { method, headers: h, body: body ? JSON.stringify(body) : undefined });
  Object.defineProperty(r, "cf", { value: { country: o.country || "IT" } });
  return r;
}
async function hit(env, ms, method, path, body, o) {
  const r = await W.handle(req(method, path, body, o), env, ms);
  return { status: r.status, body: r.status === 204 ? null : await r.json(), headers: r.headers };
}
const vote = (env, ms, i, week, day, choice, o, extra) => hit(env, ms, "POST", "/vote", Object.assign({ week, day, choice, dev: dev(i) }, extra || {}), o);

async function main() {
  /* ---- A. the calendar ---- */
  const e0 = envOf();
  ok("A1 before launch", W.clockAt(e0, L - 1).state === "before");
  ok("A2 Monday 00:00 is week 1 day 1", (() => { const c = W.clockAt(e0, L); return c.state === "on" && c.week === 1 && c.day === 1 && c.start === L && c.end === L + DAY; })());
  ok("A3 the last second of Monday is still day 1", W.clockAt(e0, L + DAY - 1).day === 1);
  ok("A4 Sunday is day 7", W.clockAt(e0, at(6)).day === 7);
  ok("A5 the next Monday is week 2 day 1", (() => { const c = W.clockAt(e0, at(7)); return c.week === 2 && c.day === 1; })());
  ok("A6 after the last week it is over", W.clockAt(e0, at(28)).state === "over" && W.clockAt(e0, at(27, 23)).week === 4);
  ok("A7 a LAUNCH that is not a Monday switches the story off", W.clockAt({ LAUNCH: "2026-11-17", WEEKS: "4" }, at(1)).state === "off");

  /* ---- B. voting ---- */
  let env = envOf();
  let r = await vote(env, at(0), 1, 1, 1, "A", { country: "IT" }, { axis: "trust-suspicion", side: "left", ver: "" });
  ok("B1 a vote is taken", r.status === 200 && r.body.ok && r.body.again === false && r.body.choice === "A" && r.body.closesAt === at(1, 0));
  r = await vote(env, at(0, 13), 1, 1, 1, "B", { country: "IT" });
  ok("B2 the same device again changes nothing and says what the first vote was", r.status === 200 && r.body.again === true && r.body.choice === "A");
  r = await vote(env, at(0, 14), 2, 1, 1, "B", { country: "DE" });
  ok("B3 another device votes", r.body.ok && r.body.again === false);
  ok("B4 the axis and side are kept with the vote", await (async () => {
    const row = await env.DB.prepare("SELECT axis, side, ver, country FROM votes WHERE dev = ?").bind(dev(1)).first();
    return row.axis === "trust-suspicion" && row.side === "left" && row.ver === "" && row.country === "IT";
  })());
  r = await vote(env, at(0), 3, 1, 2, "A");
  ok("B5 a vote for tomorrow is refused: early", r.status === 409 && r.body.error === "early");
  r = await vote(env, at(1), 3, 1, 1, "A");
  ok("B6 a vote for yesterday is refused: closed", r.status === 409 && r.body.error === "closed");
  r = await vote(env, at(0), 3, 2, 1, "A");
  ok("B7 a vote for next week is refused: early", r.status === 409 && r.body.error === "early");
  r = await vote(env, at(6), 3, 1, 7, "A");
  ok("B8 Sunday has no vote", r.status === 400);
  r = await vote(env, at(0), 3, 1, 1, "C");
  ok("B9 a choice other than A or B is refused", r.status === 400);
  r = await hit(env, at(0), "POST", "/vote", { week: 1, day: 1, choice: "A", dev: "not-an-id" });
  ok("B10 a device ID that is not 32 hex characters is refused", r.status === 400);
  r = await hit(env, at(0), "POST", "/vote", { week: "1", day: 1, choice: "A", dev: dev(9) });
  ok("B11 a week that is a string is refused", r.status === 400);
  r = await vote(env, L - 1, 3, 1, 1, "A");
  ok("B12 before launch: early", r.status === 409 && r.body.error === "early");
  r = await vote(env, at(28), 3, 4, 6, "A");
  ok("B13 after the last week: closed", r.status === 409 && r.body.error === "closed");
  r = await vote(env, at(0), 4, 1, 1, "A", {}, { axis: "nonsense", side: "up", ver: "ZZZ" });
  ok("B14 a made-up axis, side and version are dropped, the vote still counts", r.body.ok === true && await (async () => {
    const row = await env.DB.prepare("SELECT axis, side, ver FROM votes WHERE dev = ?").bind(dev(4)).first();
    return row.axis === null && row.side === null && row.ver === "";
  })());
  r = await hit(env, at(0), "POST", "/vote", null, {});
  ok("B15 no body is refused", r.status === 400);
  r = await hit(env, at(0), "GET", "/vote");
  ok("B16 GET /vote is not found", r.status === 404);

  /* ---- C. the state and the majority ---- */
  env = envOf();
  /* Monday: 3 vote A (IT, IT, DE), 2 vote B (IT, US) -> A */
  for (const [i, c, ch] of [[1, "IT", "A"], [2, "IT", "A"], [3, "DE", "A"], [4, "IT", "B"], [5, "US", "B"]]) await vote(env, at(0, 9, i), i, 1, 1, ch, { country: c });
  r = await hit(env, at(0, 15), "GET", "/state?week=1", null, { country: "IT" });
  ok("C1 today's counts while the day is open", r.body.today && r.body.today.day === 1 && r.body.today.a === 3 && r.body.today.b === 2 && r.body.today.voters === 5 && r.body.today.countries === 3);
  ok("C2 the asking country's counts", r.body.today.ca === 2 && r.body.today.cb === 1 && r.body.you.country === "IT");
  ok("C3 no path yet while Monday is open", Array.isArray(r.body.path) && r.body.path.length === 0 && r.body.days.length === 0);
  ok("C4 the server's clock and where the story is", r.body.now === at(0, 15) && r.body.cur.state === "on" && r.body.cur.week === 1 && r.body.cur.day === 1 && r.body.cur.end === at(1, 0));
  r = await hit(env, at(1, 0, 1), "GET", "/state?week=1", null, { country: "DE" });
  ok("C5 Monday is fixed once it is over (lazily, no cron needed): A", r.body.path.join("") === "A" && r.body.days[0].result === "A" && r.body.days[0].a === 3 && r.body.days[0].b === 2);
  ok("C6 world voters and countries on the closed day", r.body.days[0].voters === 5 && r.body.days[0].countries === 3);
  ok("C7 DE's own counts on the closed day", r.body.days[0].ca === 1 && r.body.days[0].cb === 0);
  ok("C8 Tuesday is open and empty", r.body.today.day === 2 && r.body.today.voters === 0 && r.body.today.countries === 0);
  /* Tuesday: tie 1-1 -> A; Wednesday: nobody -> A; Thursday: B wins 2-1 */
  await vote(env, at(1, 10), 1, 1, 2, "A"); await vote(env, at(1, 11), 2, 1, 2, "B");
  await vote(env, at(3, 10), 1, 1, 4, "B"); await vote(env, at(3, 11), 2, 1, 4, "B"); await vote(env, at(3, 12), 3, 1, 4, "A");
  r = await hit(env, at(4, 1), "GET", "/state?week=1");
  ok("C9 a tie is A, no votes is A, a majority of B is B", r.body.path.join("") === "AAAB");
  ok("C10 the days list carries the counts of the tie and of the empty day", r.body.days[1].a === 1 && r.body.days[1].b === 1 && r.body.days[2].voters === 0 && r.body.days[2].countries === 0);
  ok("C11 Friday is open", r.body.today.day === 5);
  /* the path stops at the first day not fixed: Saturday and Sunday */
  r = await hit(env, at(6, 5), "GET", "/state?week=1");
  ok("C12 Sunday: six days are fixed, Sunday itself is not a voting day", r.body.path.join("") === "AAABAA" && r.body.today && r.body.today.day === 7 && r.body.today.voters === 0 && r.body.today.readers === 0 && r.body.days.length === 6);
  r = await hit(env, at(7, 5), "GET", "/state?week=1");
  ok("C13 next week: week 1's path is unchanged and nothing is open for week 1", r.body.path.join("") === "AAABAA" && r.body.today === null && r.body.cur.week === 2 && r.body.cur.day === 1);
  r = await hit(env, at(7, 5), "GET", "/state?week=2");
  ok("C14 week 2 is open with no path", r.body.path.length === 0 && r.body.today.day === 1);
  r = await hit(env, at(0, 5), "GET", "/state?week=3");
  ok("C15 a week that has not started has no path and no today", r.body.ok && r.body.path.length === 0 && r.body.today === null);
  r = await hit(env, at(0, 5), "GET", "/state?week=9");
  ok("C16 a week that does not exist is refused", r.status === 400);
  r = await hit(env, at(0, 5), "GET", "/state?week=x");
  ok("C17 a week that is not a number is refused", r.status === 400);
  r = await hit(env, at(0, 5), "GET", "/state");
  ok("C18 /state without a week gives only the clock", r.body.ok && r.body.cur.week === 1 && r.body.path === undefined);
  r = await hit(env, at(1, 5), "GET", "/state?week=1&by=1", null, { country: "IT" });
  ok("C19 by=1 gives every country's counts", r.body.by && r.body.by["1"].IT[0] === 2 && r.body.by["1"].IT[1] === 1 && r.body.by["1"].US[1] === 1 && r.body.by["1"].DE[0] === 1);

  /* ---- D. the cron ---- */
  env = envOf();
  await vote(env, at(0, 8), 1, 1, 1, "B"); await vote(env, at(0, 9), 2, 1, 1, "B"); await vote(env, at(0, 10), 3, 1, 1, "A");
  let wait;
  await W.default.scheduled({ scheduledTime: at(1, 0, 0) }, env, { waitUntil(p) { wait = p; } }); await wait;
  const rows = (await env.DB.prepare("SELECT week, day, result, a, b, countries FROM days").all()).results;
  ok("D1 the cron fixes the day that has just ended", rows.length === 1 && rows[0].week === 1 && rows[0].day === 1 && rows[0].result === "B" && rows[0].a === 1 && rows[0].b === 2);
  await W.default.scheduled({ scheduledTime: at(1, 0, 0) }, env, { waitUntil(p) { wait = p; } }); await wait;
  ok("D2 running it again changes nothing", (await env.DB.prepare("SELECT COUNT(*) AS n FROM days").first()).n === 1);
  /* the cron after a long silence fixes every day that is over */
  env = envOf();
  await vote(env, at(0, 8), 1, 1, 1, "B"); await vote(env, at(2, 8), 1, 1, 3, "B");
  await W.default.scheduled({ scheduledTime: at(10, 0, 0) }, env, { waitUntil(p) { wait = p; } }); await wait;
  r = await hit(env, at(10, 1), "GET", "/state?week=1");
  ok("D3 after a long silence every day is fixed: Monday B, Wednesday B, the rest A", r.body.path.join("") === "BABAAA");
  ok("D4 the last day of the last week is fixed after the story is over", await (async () => {
    const e = envOf(); await vote(e, at(26, 9), 1, 4, 6, "B");
    const x = await hit(e, at(40), "GET", "/state?week=4");
    return x.body.cur.state === "over" && x.body.path.length === 6 && x.body.path[5] === "B";
  })());

  /* ---- E. the counts are exact ---- */
  env = envOf();
  for (let i = 1; i <= 40; i++) await vote(env, at(0, 6, i % 50), i, 1, 1, i % 3 === 0 ? "B" : "A", { country: ["IT", "TR", "ES", "BR"][i % 4] });
  /* damage the live counts on purpose: the fix at midnight makes them exact from the votes */
  await env.DB.prepare("UPDATE tally SET a = a + 5 WHERE country = 'IT'").run();
  r = await hit(env, at(1, 0, 5), "GET", "/state?week=1");
  const a = [...Array(41).keys()].filter((i) => i > 0 && i % 3 !== 0).length;
  ok("E1 the fixed day's world counts come from the votes", r.body.days[0].a === a && r.body.days[0].b === 40 - a && r.body.days[0].voters === 40 && r.body.days[0].countries === 4);
  const t = (await env.DB.prepare("SELECT SUM(a) AS a, SUM(b) AS b FROM tally WHERE day = 1").first());
  ok("E2 and the live tally is made exact too", t.a === a && t.b === 40 - a);

  /* ---- F. country, brakes, cors, health ---- */
  env = envOf();
  r = await vote(env, at(0), 1, 1, 1, "A", { country: "XX" });
  ok("F1 an unknown country is ZZ", (await env.DB.prepare("SELECT country FROM votes").first()).country === "ZZ");
  const plain = new Request("https://story.example/vote", { method: "POST", body: JSON.stringify({ week: 1, day: 1, choice: "A", dev: dev(2) }), headers: { "CF-IPCountry": "tr" } });
  await W.handle(plain, env, at(0));
  ok("F2 with no cf object the CF-IPCountry header is read", (await env.DB.prepare("SELECT country FROM votes WHERE dev = ?").bind(dev(2)).first()).country === "TR");
  W._test && W._test.resetBrakes();
  env = envOf();
  let refused = 0;
  for (let i = 1; i <= 405; i++) { const x = await vote(env, at(0, 10), i, 1, 1, "A", { ip: "1.2.3.4" }); if (x.status === 429) refused++; }
  ok("F3 one address may vote 400 times a day, the rest are refused", refused === 5);
  r = await vote(env, at(1, 10), 999, 1, 2, "A", { ip: "1.2.3.4" });
  ok("F4 the next day the same address may vote again", r.status === 200);
  r = await hit(env, at(0), "OPTIONS", "/vote", null, { origin: "https://logicers.com" });
  ok("F5 the preflight is answered for logicers.com", r.status === 204 && r.headers.get("Access-Control-Allow-Origin") === "https://logicers.com");
  r = await hit(env, at(0), "OPTIONS", "/vote", null, { origin: "https://evil.example" });
  ok("F6 and not for another site", r.status === 204 && !r.headers.get("Access-Control-Allow-Origin"));
  r = await hit(env, at(0), "OPTIONS", "/vote", null, { origin: "http://localhost:8123" });
  ok("F7 localhost may call", r.headers.get("Access-Control-Allow-Origin") === "http://localhost:8123");
  r = await hit(env, at(0), "GET", "/health");
  ok("F8 health", r.body.ok && r.body.db === true && r.body.cur.week === 1);
  r = await hit(env, at(0), "GET", "/nothing");
  ok("F9 anything else is not found", r.status === 404);

  /* ---- G. two phones at the same moment ---- */
  env = envOf();
  const rs = await Promise.all([...Array(30).keys()].map((i) => vote(env, at(0, 9), i + 1, 1, 1, i % 2 ? "A" : "B")));
  ok("G1 thirty votes at once are all taken", rs.every((x) => x.body.ok && x.body.again === false));
  const sameDev = await Promise.all([1, 2, 3].map(() => vote(env, at(0, 9), 777, 1, 1, "A")));
  ok("G2 one device voting three times at once counts once", sameDev.filter((x) => x.body.again === false).length === 1);
  r = await hit(env, at(0, 10), "GET", "/state?week=1");
  ok("G3 the live counts are 31 votes", r.body.today.voters === 31);

  /* ---- H. reads and small choices (the numbers on the page, and the portrait) ---- */
  env = envOf();
  const read = (ms, i, week, day, o) => hit(env, ms, "POST", "/read", { week, day, dev: dev(i) }, o);
  const small = (ms, i, week, day, n, pick, o, extra) => hit(env, ms, "POST", "/small", Object.assign({ week, day, dev: dev(i), n, pick }, extra || {}), o);
  r = await read(at(0, 9), 1, 1, 1, { country: "IT" });
  ok("H1 a read is counted", r.status === 200 && r.body.ok && r.body.again === false);
  r = await read(at(0, 10), 1, 1, 1, { country: "IT" });
  ok("H2 the same device again is not counted twice", r.status === 200 && r.body.again === true);
  await read(at(0, 11), 2, 1, 1, { country: "DE" });
  await vote(env, at(0, 12), 3, 1, 1, "B", { country: "FR" });          // a vote with no read before it
  await vote(env, at(0, 12), 1, 1, 1, "A", { country: "IT" });          // a vote from a device that had already read
  r = await hit(env, at(0, 13), "GET", "/state?week=1");
  ok("H3 today: 3 read (the voters count as readers, once each), 2 voted, 2 countries", r.body.today.readers === 3 && r.body.today.voters === 2 && r.body.today.countries === 2);
  r = await read(at(0), 4, 1, 2);
  ok("H4 a read for tomorrow is refused: early", r.status === 409 && r.body.error === "early");
  r = await read(at(1), 4, 1, 1);
  ok("H5 a read for yesterday is refused: closed", r.status === 409 && r.body.error === "closed");
  r = await hit(env, at(0), "POST", "/read", { week: 1, day: 8, dev: dev(4) });
  ok("H6 day 8 is refused", r.status === 400);
  r = await hit(env, at(0), "POST", "/read", { week: 1, day: 1, dev: "nope" });
  ok("H7 a bad device ID is refused", r.status === 400);
  r = await read(L - 1, 4, 1, 1);
  ok("H8 before launch: early", r.status === 409 && r.body.error === "early");
  r = await read(at(28), 4, 4, 7);
  ok("H9 after the last week: closed", r.status === 409 && r.body.error === "closed");
  r = await hit(env, at(1, 0, 5), "GET", "/state?week=1");
  const d1 = r.body.days.find((x) => x.day === 1);
  ok("H10 once the day is fixed its readers are kept: 3 read, 2 voted", d1 && d1.readers === 3 && d1.voters === 2);
  r = await hit(env, at(2), "GET", "/state?week=1");
  ok("H11 the closed day keeps its numbers", r.body.days.find((x) => x.day === 1).readers === 3);
  await read(at(1, 9), 5, 1, 2);                                        // a read on day 2 is not a read on day 1
  r = await hit(env, at(1, 10), "GET", "/state?week=1");
  ok("H12 the next day starts at its own count", r.body.today.day === 2 && r.body.today.readers === 1 && r.body.today.voters === 0);
  ok("H13 and day 1 did not change", r.body.days.find((x) => x.day === 1).readers === 3);

  /* Sunday: readers only */
  await read(at(6, 9), 6, 1, 7, { country: "IT" });
  await read(at(6, 10), 7, 1, 7, { country: "US" });
  r = await hit(env, at(6, 11), "GET", "/state?week=1");
  ok("H14 Sunday has readers and countries, and no votes", r.body.today && r.body.today.day === 7 && r.body.today.readers === 2 && r.body.today.countries === 2 && r.body.today.voters === 0);

  /* small choices */
  r = await small(at(2, 9), 1, 1, 3, 0, 1, { country: "IT" }, { axis: "head-heart", side: "right", ver: "AB" });
  ok("H15 a small choice is kept, with its axis, side, version and country", r.status === 200 && r.body.again === false && await (async () => {
    const row = await env.DB.prepare("SELECT pick, axis, side, ver, country FROM smalls WHERE dev = ? AND week = 1 AND day = 3 AND n = 0").bind(dev(1)).first();
    return row && row.pick === 1 && row.axis === "head-heart" && row.side === "right" && row.ver === "AB" && row.country === "IT";
  })());
  r = await small(at(2, 10), 1, 1, 3, 0, 0);
  ok("H16 choosing the same one again changes nothing", r.body.again === true && (await env.DB.prepare("SELECT pick FROM smalls WHERE dev = ? AND day = 3 AND n = 0").bind(dev(1)).first()).pick === 1);
  r = await small(at(2, 10), 1, 1, 3, 1, 0);
  ok("H17 the second choice of the chapter is its own row", r.body.again === false && (await env.DB.prepare("SELECT COUNT(*) AS c FROM smalls WHERE dev = ?").bind(dev(1)).first()).c === 2);
  r = await small(at(3, 1), 1, 1, 5, 0, 0);
  ok("H18 a choice for a day that has not begun is refused: early", r.status === 409 && r.body.error === "early");
  r = await small(at(4, 1), 8, 1, 3, 0, 1);
  ok("H19 a choice from a day that has begun but is over is still taken (the phone was offline)", r.status === 200 && r.body.again === false);
  r = await small(at(28, 1), 9, 4, 7, 0, 1);
  ok("H20 after the last week the last week's choices are still taken", r.status === 200);
  r = await small(at(28, 1), 9, 5, 1, 0, 1);
  ok("H21 a week the story does not have is refused", r.status === 400);
  for (const bad of [{ n: 2, pick: 0 }, { n: 0, pick: 2 }, { n: "0", pick: 0 }, { n: 0, pick: "1" }, { n: -1, pick: 0 }]) {
    r = await hit(env, at(2), "POST", "/small", Object.assign({ week: 1, day: 3, dev: dev(10) }, bad));
    ok("H22 a bad small choice " + JSON.stringify(bad) + " is refused", r.status === 400);
  }
  r = await small(at(2, 12), 11, 1, 3, 0, 0, {}, { axis: "nonsense", side: "up", ver: "ZZZ" });
  ok("H23 a made-up axis, side and version are dropped, the choice still counts", r.body.ok === true && await (async () => {
    const row = await env.DB.prepare("SELECT axis, side, ver FROM smalls WHERE dev = ?").bind(dev(11)).first();
    return row.axis === null && row.side === null && row.ver === "";
  })());
  r = await hit(env, at(2), "GET", "/small");
  ok("H24 GET /small is not found", r.status === 404);
  r = await hit(env, at(2), "OPTIONS", "/small", null, { origin: "https://logicers.com" });
  ok("H25 the preflight works for /small and /read", r.status === 204 && r.headers.get("Access-Control-Allow-Origin") === "https://logicers.com");
  r = await hit(env, at(2, 13), "GET", "/state?week=1");
  ok("H26 the state shows no small-choice counts (they are not shown anywhere)", !JSON.stringify(r.body).includes("small"));
  ok("H27 no address is stored in the new tables", await (async () => {
    const cols = [];
    for (const t of ["reads", "smalls"]) for (const c of (await env.DB.prepare("PRAGMA table_info(" + t + ")").all()).results) cols.push(c.name);
    return !cols.some((n) => /ip|addr/i.test(n)) && cols.includes("country");
  })());

  /* the brakes */
  env = envOf();
  refused = 0;
  for (let i = 1; i <= 1505; i++) { const x = await hit(env, at(0, 10), "POST", "/read", { week: 1, day: 1, dev: dev(i) }, { ip: "5.6.7.8" }); if (x.status === 429) refused++; }
  ok("H28 one address may send 1500 reads and small choices a day, the rest are refused", refused === 5);

  /* a day nobody read: zero, and the story still moves */
  env = envOf();
  r = await hit(env, at(1, 1), "GET", "/state?week=1");
  ok("H29 a day with no readers is fixed with 0 readers and the result A", r.body.days[0].readers === 0 && r.body.days[0].result === "A");

  /* ---- I. the home page's number: everyone who has ever read the story, each device once ---- */
  env = envOf();
  const cnt = async (ms, o) => (await hit(env, ms, "GET", "/counter", null, o));
  r = await cnt(at(0, 8));
  ok("I1 nobody yet: 0", r.status === 200 && r.body.ok === true && r.body.readers === 0);
  ok("I2 the browser may keep it for a minute", r.headers.get("Cache-Control") === "public, max-age=60");
  await hit(env, at(0, 9), "POST", "/read", { week: 1, day: 1, dev: dev(1) });
  await hit(env, at(0, 9), "POST", "/read", { week: 1, day: 1, dev: dev(1) });          // the same device again
  await vote(env, at(0, 9), 2, 1, 1, "A");                                              // a vote is a read
  await hit(env, at(0, 9), "POST", "/read", { week: 1, day: 1, dev: dev(2) });          // and its read after the vote changes nothing
  ok("I3 within the minute the answer stays the same", (await cnt(at(0, 8, 0) + 59000)).body.readers === 0);
  ok("I4 after the minute: 2 readers", (await cnt(at(0, 9, 1))).body.readers === 2);
  await hit(env, at(1, 9), "POST", "/read", { week: 1, day: 2, dev: dev(1) });          // the same device on another day
  await hit(env, at(1, 9), "POST", "/read", { week: 1, day: 2, dev: dev(3) });          // a new one
  await hit(env, at(8, 9), "POST", "/read", { week: 2, day: 2, dev: dev(4) });          // a new one, the next week
  await vote(env, at(8, 9), 1, 2, 2, "B");                                              // an old reader votes in week 2
  ok("I5 every device once, over days and weeks: 4", (await cnt(at(8, 10))).body.readers === 4);
  ok("I6 the number is the rows of ever", (await env.DB.prepare("SELECT COUNT(*) AS c FROM ever").first()).c === 4 && (await env.DB.prepare("SELECT COUNT(DISTINCT dev) AS c FROM reads").first()).c === 4);
  await hit(env, at(8, 11), "POST", "/small", { week: 2, day: 2, dev: dev(9), n: 0, pick: 1 });
  ok("I7 a small choice alone is not a read", (await cnt(at(8, 12))).body.readers === 4);
  r = await hit(env, at(8, 12), "POST", "/counter", {});
  ok("I8 POST /counter is not found", r.status === 404);
  r = await cnt(at(8, 12), { origin: "https://logicers.com" });
  ok("I9 the home page may ask", r.headers.get("Access-Control-Allow-Origin") === "https://logicers.com");
  r = await cnt(L - 5 * DAY);
  ok("I10 it answers before the launch too", r.status === 200 && typeof r.body.readers === "number");

  /* a database from before the counter (reads but no counter yet): the counter starts from the reads */
  env = envOf();
  await env.DB.batch(W._test.SCHEMA.map((q) => env.DB.prepare(q)));
  for (const [w, d, i] of [[1, 1, 1], [1, 2, 1], [1, 1, 2], [1, 3, 3], [1, 3, 2]]) {
    await env.DB.prepare("INSERT INTO reads (week, day, dev, country, at) VALUES (?, ?, ?, 'IT', ?)").bind(w, d, dev(i), at(d - 1, 9)).run();
  }
  ok("I11 an old database's readers are counted at once: 3", (await cnt(at(3, 9))).body.readers === 3);
  await hit(env, at(3, 9), "POST", "/read", { week: 1, day: 4, dev: dev(2) });
  await hit(env, at(3, 9), "POST", "/read", { week: 1, day: 4, dev: dev(5) });
  ok("I12 and it goes on from there: 4", (await cnt(at(3, 10, 5))).body.readers === 4);

  /* the brake */
  env = envOf();
  refused = 0;
  for (let i = 0; i < 3005; i++) { const x = await hit(env, at(0, 10), "GET", "/counter", null, { ip: "8.8.4.4" }); if (x.status === 429) refused++; }
  ok("I13 one address may ask 3000 times an hour", refused === 5);

  console.log(passed + " passed, " + failed + " failed");
  process.exit(failed ? 1 : 0);
}
main();
