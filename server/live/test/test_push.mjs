/* Logicers: the daily reminder (18 Oct 2026), the server's checks, against `wrangler dev` started with
   TEST_PUSH=1 (so the checks may name the time of an hourly run and use a push service of their own on this
   machine), VAPID_PRIVATE and ADMIN_KEY in .dev.vars:
     printf 'VAPID_PRIVATE=%s\nADMIN_KEY=%s\n' "$(cat ../../push-keys/vapid-private.json)" "test-admin-key-test-admin-key-12345" > .dev.vars
     npx wrangler dev --port 8787 --var EXTRA_ORIGINS:http://127.0.0.1:8795 --var TEST_PUSH:1 --var TEST_GEO:1 --var PUSH_RUN_MAX:5 --persist-to /tmp/wr-push
     LIVE_URL=http://127.0.0.1:8787 PUSH_PUB=<the public key> node test/test_push.mjs
   The "push service" here is a tiny web server that records each push and answers what a check tells it to. */
import http from "node:http";
import { webcrypto } from "node:crypto";
import { BASE, ORIGIN, ok, eq, report, someIp, sleep } from "./lib.mjs";

const ADMIN = "test-admin-key-test-admin-key-12345";
const PUB = process.env.PUSH_PUB;
const DAY = 86400e3, HOUR = 3600e3;

/* ---------- the pretend push service ---------- */
const got = [];                      // every push received: { path, headers }
const drops = new Set();             // paths whose answer is lost
const answers = {};                  // path -> status to answer (default 201)
const svc = http.createServer((req, res) => {
  got.push({ path: req.url, headers: req.headers, method: req.method });
  if (drops.has(req.url)) { req.socket.destroy(); return; }        // the answer is lost on the way
  res.statusCode = answers[req.url] || 201; res.end();
});
await new Promise((r) => svc.listen(0, "127.0.0.1", r));
const PORT = svc.address().port;
const ep = (name) => `http://127.0.0.1:${PORT}/p/${name}`;
const pushedTo = (name) => got.filter((g) => g.path === "/p/" + name).length;

async function post(path, body, opts = {}) {
  const res = await fetch(BASE + path, { method: "POST", headers: { "Content-Type": "application/json", Origin: opts.origin || ORIGIN, "CF-Connecting-IP": opts.ip || someIp(), "X-Test-Geo": opts.geo || "AZ,AS", "Sec-Fetch-Mode": "cors" }, body: typeof body === "string" ? body : JSON.stringify(body) });
  let j = null; try { j = await res.json(); } catch (e) { /* none */ }
  return { status: res.status, ...(j || {}) };
}
const ymd = (t) => new Date(t).toISOString().slice(0, 10).replace(/-/g, "");
const phone = (name, o = {}) => ({ v: 1, ep: ep(name), h: 9, z: 0, st: 0, pl: "", ...o });
const join = (name, o, opts) => post("/push/join", phone(name, o), opts);
const run = (now) => post("/push/_run", { now });
const words = async (name) => (await post("/push/msg", { v: 1, ep: ep(name) }));
const stats = () => post("/push/admin", { key: ADMIN, op: "stats" });

/* the real date now, and the next days at their hours (UTC) */
const real = new Date(); const D0 = Date.UTC(real.getUTCFullYear(), real.getUTCMonth(), real.getUTCDate());
const at = (days, hour, min = 20) => D0 + days * DAY + hour * HOUR + min * 60e3;
const tag = Math.random().toString(36).slice(2, 7);       // this run's phones, so runs on one state never meet
const nm = (s) => `${tag}-${s}`;

/* ---------- health, origin, validation ---------- */
const h = await (await fetch(BASE + "/health", { headers: { Origin: ORIGIN } })).json();
ok(h.push === true, "health says the reminder is on when the key is set");
eq((await post("/push/join", phone(nm("a")), { origin: "https://evil.example" })).status, 403, "another site is refused");
eq((await post("/push/join", { ...phone(nm("a")), v: 2 })).status, 409, "an old version is told so");
eq((await post("/push/join", "not json")).status, 400, "not JSON is refused");
eq((await post("/push/join", { ...phone(nm("a")), ep: "https://evil.example/push/abcdefghijklmnop" })).e, "ep", "an address that is not a browser's push service is refused");
eq((await post("/push/join", { ...phone(nm("a")), ep: "https://fcm.googleapis.com.evil.example/fcm/send/abcdefghij" })).e, "ep", "a look-alike host is refused");
eq((await post("/push/join", { ...phone(nm("a")), ep: "http://fcm.googleapis.com/fcm/send/abcdefghijk" })).e, "ep", "plain http is refused");
eq((await post("/push/join", { ...phone(nm("a")), ep: "https://user:pw@fcm.googleapis.com/fcm/send/abcdefghijk" })).e, "ep", "a login in the address is refused");
eq((await post("/push/join", { ...phone(nm("a")), ep: "http://127.0.0.1:1/../../x" })).e, "ep", "a path with dots going up is refused");
for (const [k, v] of [["h", 24], ["h", -1], ["h", 9.5], ["z", 900], ["z", "0"], ["st", -1], ["st", 100000]]) {
  eq((await post("/push/join", { ...phone(nm("a")), [k]: v })).e, "fields", `${k} = ${JSON.stringify(v)} is refused`);
}
eq((await post("/push/join", { ...phone(nm("a")), pl: "20261340" })).e, "pl", "a date that does not exist is refused");
eq((await post("/push/join", { ...phone(nm("a")), pl: 5 })).e, "pl", "a date that is not text is refused");
eq((await post("/push/join", { ...phone(nm("a")), tip: "Visit https://x.example now" })).ok, true, "a line with a link is not kept, and the phone still joins");
eq((await post("/push/join", { ...phone(nm("a")), tip: "x".repeat(111) })).e, "tip", "a line over 110 characters is refused");
eq((await post("/push/join", { ...phone(nm("a")), tip: "write to me@x.example" })).ok, true, "a line with an address is not kept either, and the phone still joins");
for (const bad of ["https://FCM.googleapis.com/fcm/send/abcdefghijk", "https://fcm.googleapis.com:443/fcm/send/abcdefghijk", "https://fcm.googleapis.com/fcm/send/abcdefghijk?x=1", "https://fcm%2egoogleapis.com/fcm/send/abcdefghijk", "https://fcm.googleapis.com./fcm/send/abcdefghijk"]) {
  eq((await post("/push/join", { ...phone(nm("a")), ep: bad })).e, "ep", "one spelling only, " + bad + " is refused");
}
eq((await post("/push/join", phone(nm("a")))).ok, true, "a good join is taken");
eq((await post("/push/join", phone(nm("a")))).ok, true, "and so is the same phone again (it only refreshes)");

/* ---------- one a day, in the window, never on the day of joining ---------- */
await join(nm("cap"));                                       // 09:00 UTC, joined today
let s0 = got.length;
await run(at(0, 9)); await run(at(0, 10));
eq(pushedTo(nm("cap")), 0, "a phone that joined today is not sent to today, in its hour or after");
await run(at(1, 8, 59));
eq(pushedTo(nm("cap")), 0, "the next day, before its hour: nothing");
await run(at(1, 9, 5));
eq(pushedTo(nm("cap")), 1, "the next day, in its hour: one push");
const first = got.find((g) => g.path === "/p/" + nm("cap"));
ok(first && first.method === "POST", "the push is a POST");
ok(first && /^vapid t=[\w-]+\.[\w-]+\.[\w-]+, k=/.test(first.headers.authorization || ""), "it carries a VAPID token and the public key");
ok(first && (first.headers.authorization || "").endsWith("k=" + PUB), "with the very public key the page carries");
eq(first && first.headers.ttl, "43200", "kept for 12 hours at most");
eq(first && String(first.headers["content-length"] || "0"), "0", "with no body (the words are fetched by the service worker)");
await run(at(1, 9, 40)); await run(at(1, 10, 5)); await run(at(1, 11, 5)); await run(at(1, 9, 5));
eq(pushedTo(nm("cap")), 1, "however often the run is called that day, no second push (the cap)");
await run(at(2, 11, 59));
eq(pushedTo(nm("cap")), 2, "the day after, at the end of the window (hour + 2): one more");
await run(at(3, 12, 5));
eq(pushedTo(nm("cap")), 2, "past the window (hour + 3): none, and the day is missed rather than made late");

/* the signature, checked here with the public key */
{
  const auth = first.headers.authorization, t = /t=([^,]+),/.exec(auth)[1].split(".");
  const raw = Buffer.from(PUB, "base64url");
  const key = await webcrypto.subtle.importKey("raw", raw, { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
  const valid = await webcrypto.subtle.verify({ name: "ECDSA", hash: "SHA-256" }, key, Buffer.from(t[2], "base64url"), new TextEncoder().encode(t[0] + "." + t[1]));
  ok(valid, "the token's signature checks out against the public key");
  const head = JSON.parse(Buffer.from(t[0], "base64url")), body = JSON.parse(Buffer.from(t[1], "base64url"));
  eq(head, { typ: "JWT", alg: "ES256" }, "the token's header");
  eq(body.aud, `http://127.0.0.1:${PORT}`, "its audience is the push service's own origin");
  eq(body.sub, "mailto:logicers.world@gmail.com", "its contact is the site's address");
  ok(body.exp * 1000 > at(1, 9) && body.exp * 1000 <= at(1, 9, 5) + 24 * HOUR, "and it ends within 24 hours");
}

/* a missed hour is made up inside the window */
await join(nm("late"), { h: 20 });
await run(at(1, 22, 10));
eq(pushedTo(nm("late")), 1, "a run two hours late still sends (the window)");

/* ---------- the phone's own clock ---------- */
await join(nm("tokyo"), { h: 8, z: 540 });                   // Tokyo, UTC+9: 8:00 there is 23:00 UTC the day before
await run(at(0, 23, 10));                                    // joined today (UTC): its local date is already tomorrow
await run(at(1, 23, 10));
ok(pushedTo(nm("tokyo")) >= 1, "a phone in Tokyo is sent to at its own 8 o'clock");
const tk = pushedTo(nm("tokyo"));
await run(at(1, 23, 40)); await run(at(2, 0, 20));
eq(pushedTo(nm("tokyo")), tk, "and not again during its own day");
await join(nm("la"), { h: 7, z: -420 });                     // Los Angeles, UTC-7: 07:00 there is 14:00 UTC
const la0 = pushedTo(nm("la"));
await run(at(1, 14, 15));
eq(pushedTo(nm("la")) - la0, 1, "a phone in Los Angeles is sent to at its own 7 o'clock");
await join(nm("india"), { h: 8, z: 330 });                   // UTC+5:30: 8:00 there is 02:30 UTC
const in0 = pushedTo(nm("india"));
await run(at(1, 2, 45));
eq(pushedTo(nm("india")) - in0, 1, "a phone with a half-hour offset is sent to at its own hour");

/* ---------- already played today: nothing to remind ---------- */
await join(nm("played"), { pl: ymd(at(1, 9)) });
await run(at(1, 9, 30));
eq(pushedTo(nm("played")), 0, "a phone that has played today is not sent to");
await join(nm("played2"), { pl: ymd(at(1, 9)) });
await join(nm("played2"), { pl: ymd(at(0, 9)) });            // the phone's last play is yesterday after all
await run(at(1, 9, 31));
eq(pushedTo(nm("played2")), 1, "and one whose last play was yesterday is");

/* ---------- the words ---------- */
await join(nm("plain"), { h: 11 });
await run(at(1, 11, 5));
const wPlain = await words(nm("plain"));
eq(wPlain.t, "Logicers", "the title");
ok(/ready|puzzles|waiting|country/i.test(wPlain.b), "a plain line when there is nothing else: " + wPlain.b);
eq(wPlain.n, 9, "and how many daily games there are, for the icon");

await join(nm("streak1"), { h: 12, st: 12, pl: ymd(at(0, 12)) });
await join(nm("streak2"), { h: 12, st: 12, pl: ymd(at(-1, 12)) });
await join(nm("streak3"), { h: 12, st: 2, pl: ymd(at(0, 12)) });
await join(nm("streak4"), { h: 12, st: 12, pl: ymd(at(-4, 12)) });
await run(at(1, 12, 5));
eq((await words(nm("streak1"))).b, "Your 12-day streak is waiting. Today’s games are ready.", "a live streak of 3 or more is named");
eq((await words(nm("streak2"))).b, "Your 12-day streak is on the line. One game today keeps it.", "one saved by the missed-day rule says so");
ok(!/streak/.test((await words(nm("streak3"))).b), "a streak under 3 is not named");
ok(!/streak/.test((await words(nm("streak4"))).b), "nor one that has already ended");

await join(nm("tip"), { h: 13, st: 12, pl: ymd(at(0, 13)), tip: "Azerbaijan was 8th, just behind Brazil. Help it climb today." });
await run(at(1, 13, 5));
eq((await words(nm("tip"))).b, "Azerbaijan was 8th, just behind Brazil. Help it climb today.", "the country line comes before the streak");
await run(at(2, 13, 5));
eq((await words(nm("tip"))).b, "Your 12-day streak is on the line. One game today keeps it.", "and is used once: the next day the streak line comes");

/* an announcement: first of all, once per phone, only while it lasts */
await join(nm("ann"), { h: 14, st: 12, pl: ymd(at(1, 14)), tip: "A country line that waits." });
eq((await post("/push/admin", { key: "wrong", op: "ann", text: "x" })).status, 404, "a wrong admin key is refused");
eq((await post("/push/admin", { key: ADMIN, op: "ann", text: "Visit https://x.example" })).e, "text", "an announcement with a link is refused");
eq((await post("/push/admin", { key: ADMIN, op: "ann", text: "x".repeat(121) })).e, "text", "and one over 120 characters");
const a1 = await post("/push/admin", { key: ADMIN, op: "ann", text: "New game today: Same Energy is here.", days: 3 });
eq(a1.ok, true, "an announcement is taken");
await join(nm("ann"), { h: 14, st: 12, pl: ymd(at(1, 13)) });
await run(at(2, 14, 5));
eq((await words(nm("ann"))).b, "New game today: Same Energy is here.", "it comes before the country line and the streak");
await run(at(3, 14, 5));
ok((await words(nm("ann"))).b !== "New game today: Same Energy is here.", "and a phone is told once only");
eq((await words(nm("ann"))).b, "A country line that waits.", "the country line it pushed aside was still waiting");
const st = await stats();
eq(st.ann && st.ann.text, "New game today: Same Energy is here.", "the admin sees the announcement");
await post("/push/admin", { key: ADMIN, op: "ann", text: "" });
eq((await stats()).ann, null, "an empty text ends it");
await join(nm("ann2"), { h: 15 });
await post("/push/admin", { key: ADMIN, op: "ann", text: "Only for a day.", days: 2 });
await run(at(1, 15, 5));
eq((await words(nm("ann2"))).b, "Only for a day.", "an announcement reaches a phone within its days");
await join(nm("ann3"), { h: 15 });
await post("/push/admin", { key: ADMIN, op: "ann", text: "Too old.", days: 1 });
await run(at(3, 15, 5));
ok((await words(nm("ann3"))).b !== "Too old.", "and not after it has ended");
await post("/push/admin", { key: ADMIN, op: "ann", text: "" });

/* ---------- the words belong to a push that was sent ---------- */
const nobody = await words(nm("never-joined"));
eq(nobody.t, "Logicers", "a phone the server does not know gets the plain line, and learns nothing");
eq((await post("/push/msg", { v: 1, ep: "https://evil.example/push/abcdefghijklmnop" })).e, "ep", "an address that is not a push service is refused here too");

/* ---------- a push service that says gone, or is busy ---------- */
await join(nm("gone"), { h: 16 }); await join(nm("busy"), { h: 16 });
answers["/p/" + nm("gone")] = 410; answers["/p/" + nm("busy")] = 503;
const n0 = (await stats()).n;
await run(at(1, 16, 5));
eq((await stats()).n, n0 - 1, "a phone the push service calls gone (410) is deleted");
eq(pushedTo(nm("busy")), 1, "a busy service is tried");
await run(at(1, 16, 35));
eq(pushedTo(nm("busy")), 2, "and tried again within the window, because the day was not used");
answers["/p/" + nm("busy")] = 201;
await run(at(1, 17, 5));
eq(pushedTo(nm("busy")), 3, "until it takes it");
await run(at(1, 17, 35)); await run(at(1, 18, 5));
eq(pushedTo(nm("busy")), 3, "and then the cap holds");

/* ---------- a phone that never comes back is dropped; one that says no is deleted ---------- */
await join(nm("quiet"), { h: 10 });
let before = pushedTo(nm("quiet"));
for (let d = 1; d <= 9; d++) await run(at(d, 10, 5));
eq(pushedTo(nm("quiet")) - before, 7, "a phone gets 7 pushes without ever coming back, and no more");
await join(nm("back"), { h: 10 });
for (let d = 1; d <= 9; d++) { await run(at(d, 10, 5)); if (d % 3 === 0) await join(nm("back"), { h: 10 }); }
ok(pushedTo(nm("back")) >= 9, "a phone that comes back now and then goes on getting its push");

await join(nm("leave"), { h: 6 });
eq((await post("/push/leave", { v: 1, ep: ep(nm("leave")) })).ok, true, "a phone says no");
await run(at(1, 6, 5));
eq(pushedTo(nm("leave")), 0, "and is never sent to");
eq((await post("/push/leave", { v: 1, ep: "https://evil.example/x" })).e, "ep", "leaving with a foreign address is refused");

/* ---------- numbers, brakes, many phones ---------- */
const many = [];
for (let i = 0; i < 120; i++) many.push(join(nm("m" + i), { h: 3 }, { ip: "10.9." + (i % 250) + ".1", geo: i % 3 ? "AZ,AS" : "DE,EU" }));
await Promise.all(many);
const sm = await stats();
ok(sm.n >= 120, "many phones are held: " + sm.n);
const tops = Object.fromEntries(sm.top);
ok(tops.AZ > 50 && tops.DE > 20, "counted by country, no phone named: " + JSON.stringify(sm.top));
ok(!JSON.stringify(sm).includes("127.0.0.1"), "and the numbers carry no address");
const g0 = got.length;
await run(at(1, 3, 5)); await sleep(8000);                    // (a run serves only so many phones at once: the rest follow in an alarm)
const sent = got.slice(g0).filter((g) => g.path.startsWith("/p/" + tag + "-m")).length;
eq(sent, 120, "all of them are sent to, one each, in one run");
ok(typeof (await stats()).sentToday === "number", "the admin also sees how many were sent today (the run here is in the future, so today's count is its own)");


/* ---------- the review of 18 Oct: two runs at once, a lost answer, an address that is always refused ---------- */
{
  const rs = []; for (let i = 0; i < 60; i++) rs.push(join(nm("r" + i), { h: 9 }, { ip: "10.8." + i + ".1" }));
  await Promise.all(rs);
  const g1 = got.length;
  await Promise.all([run(at(8, 9, 5)), run(at(8, 9, 5)), run(at(8, 9, 6))]); await sleep(8000);
  const mine = got.slice(g1).filter((g) => g.path.startsWith("/p/" + tag + "-r"));
  const per = {}; for (const g of mine) per[g.path] = (per[g.path] || 0) + 1;
  eq(Object.keys(per).length, 60, "three runs at the same moment: every phone is sent to");
  ok(Object.values(per).every((n) => n === 1), "and only once each (the cap holds across overlapping runs)");
  await join(nm("lost"), { h: 18 });
  drops.add("/p/" + nm("lost"));
  await run(at(9, 18, 5)); await run(at(9, 19, 5)); await run(at(9, 20, 5));
  eq(pushedTo(nm("lost")), 1, "an answer lost on the way may have been delivered: the day is spent, no second push");
  await join(nm("refused"), { h: 21 });
  answers["/p/" + nm("refused")] = 400;
  for (let d = 10; d < 17; d++) await run(at(d, 21, 5));
  eq(pushedTo(nm("refused")), 5, "an address the service always refuses is tried once a day, five days, and then dropped");
}

const ip = someIp();
let last = 0;
for (let i = 0; i < 45; i++) last = (await join(nm("brake"), {}, { ip })).status;
eq(last, 429, "one address cannot join or refresh without end (the brake)");

console.log("");
svc.close();
process.exit(report("test_push") ? 1 : 0);
