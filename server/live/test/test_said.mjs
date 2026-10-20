/* Logicers: what players said (19 Oct 2026), the server's checks, against `wrangler dev` started with
   TEST_TIMES=fast (a kept line is forgotten in seconds), TEST_GEO=1 and ADMIN_KEY in .dev.vars:
     printf 'ADMIN_KEY=%s\n' "test-admin-key-test-admin-key-12345" > .dev.vars
     npx wrangler dev --port 8787 --var EXTRA_ORIGINS:http://127.0.0.1:8795 --var TEST_GEO:1 --var TEST_TIMES:fast --persist-to /tmp/wr-said
     LIVE_URL=http://127.0.0.1:8787 node test/test_said.mjs */
import { BASE, ORIGIN, ok, eq, report, someIp, sleep } from "./lib.mjs";

const ADMIN = "test-admin-key-test-admin-key-12345";
const DAY = 86400e3;
const ymd = (t) => new Date(t).toISOString().slice(0, 10).replace(/-/g, "");
const today = ymd(Date.now()), yesterday = ymd(Date.now() - DAY);

async function post(path, body, opts = {}) {
  const h = { "Content-Type": "application/json", Origin: opts.origin || ORIGIN, "CF-Connecting-IP": opts.ip || someIp(), "X-Test-Geo": opts.geo || "IT,EU", "Sec-Fetch-Mode": "cors" };
  const res = await fetch(BASE + path, { method: "POST", headers: h, body: typeof body === "string" ? body : JSON.stringify(body) });
  let j = null; try { j = await res.json(); } catch (e) { /* none */ }
  return { status: res.status, ...(j || {}) };
}
const add = (text, o = {}) => post("/said/add", { v: 1, d: o.d || today, text }, o);
const view = (d, back) => post("/said/view", { v: 1, d, back: !!back });
const admin = (b) => post("/said/admin", Object.assign({ key: ADMIN }, b));

/* ---------- a line in, nothing shown before Khayyam's word ---------- */
{
  const ip = someIp();
  const r = await add("I thought cola had way more energy than an egg", { ip });
  eq(r.status, 200, "a line is taken");
  eq(r.left, 2, "two more today from this address");
  const v = await view(today);
  eq(v.lines.filter((x) => x.text.indexOf("cola") >= 0).length, 0, "not shown before it is read");
  const l = await admin({ onlyNew: true });
  eq(l.status, 200, "the desk lists");
  const mine = l.lines.find((x) => x.text.indexOf("cola") >= 0);
  ok(!!mine && mine.state === "new" && mine.c === "IT" && mine.d === today, "the desk sees it as new, with the country and the date");
  ok(!("who" in (mine || {})) && !("ip" in (mine || {})), "nothing of the address is kept on the line");
  const dec = await admin({ op: "decide", id: mine.id, ok: true });
  eq(dec.status, 200, "let through");
  const v2 = await view(today);
  const shown = v2.lines.find((x) => x.text.indexOf("cola") >= 0);
  ok(!!shown && shown.c === "IT", "shown with its flag's country once let through");
  ok(Object.keys(shown).sort().join(",") === "c,text", "a page gets the country and the words only");
}

/* ---------- the brake: three a day from one address, the same line not twice ---------- */
{
  const ip = someIp();
  eq((await add("first line of mine", { ip })).status, 200, "one");
  eq((await add("First line of mine!", { ip })).e, "same", "the same line again (case and signs aside) is refused");
  eq((await add("second line of mine", { ip })).status, 200, "two");
  const r3 = await add("third line of mine", { ip });
  eq(r3.status, 200, "three");
  eq(r3.left, 0, "none left");
  eq((await add("fourth line of mine", { ip })).e, "enough", "the fourth is refused");
  eq((await add("a line tomorrow", { ip, d: ymd(Date.now() + DAY) })).status, 200, "another date is another day");
}

/* ---------- what is refused ---------- */
{
  eq((await add("hi")).e, "text", "too short");
  eq((await add("x".repeat(141))).e, "text", "too long");
  eq((await add("see https://example.com now")).e, "text", "a link");
  eq((await add("write me at a@b.co")).e, "text", "an email");
  eq((await add("follow @someone please")).e, "text", "an @handle");
  eq((await add("go to logicers.com")).e, "text", "a web address");
  eq((await add("!!! ... ???")).e, "text", "only signs");
  eq((await add("a‮b line here")).e, "text", "a direction override");
  eq((await add("ok line", { d: "20200101" })).e, "day", "a date no clock shows");
  eq((await post("/said/add", { v: 2, d: today, text: "ok line here" })).e, "old", "another version");
  const r = await add("  many   spaces   here  ");
  eq(r.status, 200, "spaces are tidied");
  const l = await admin({ onlyNew: true });
  ok(l.lines.some((x) => x.text === "many spaces here"), "kept as one space each");
  eq((await post("/said/admin", { key: "wrong", op: "list" })).e, "nothing", "a wrong key sees nothing");
  eq((await admin({ op: "decide", id: "nonsense", ok: true })).status, 404, "a made-up id");
}

/* ---------- the home page's "yesterday": a date with no lines falls back to the latest date that has some ----------
   (a date is written to only while some clock shows it, so "yesterday" here is whatever date the clocks have left:
   the line goes in for today, and a view of tomorrow, with back, comes back with today's) */
{
  const r = await add("yesterday I learned a lot");
  eq(r.status, 200, "a line for the day");
  const l = await admin({ onlyNew: true });
  const mine = l.lines.find((x) => x.text === "yesterday I learned a lot");
  await admin({ op: "decide", id: mine.id, ok: true });
  const v = await view(today);
  ok(v.lines.some((x) => x.text === "yesterday I learned a lot") && v.d === today, "the line shows for its date");
  const tomorrow = ymd(Date.now() + DAY);
  const v2 = await view(tomorrow, true);
  if (v2.status === 200) ok(v2.d === today && v2.lines.some((x) => x.text === "yesterday I learned a lot"), "tomorrow has none: back to today's");
  else eq(v2.e, "day", "tomorrow has not begun anywhere yet");
  eq((await view(tomorrow)).lines ? (await view(tomorrow)).lines.length : 0, 0, "without back: none");
  eq((await add("too old a date", { d: ymd(Date.now() - 3 * DAY) })).e, "day", "a date no clock shows any more is not written to");
  const no = await admin({ op: "decide", id: mine.id, ok: false });
  eq(no.state, "no", "turned down after all");
  const v3 = await view(today);
  ok(!v3.lines.some((x) => x.text === "yesterday I learned a lot"), "gone from the page at once");
}

/* ---------- the window on the home page: the latest 12 lines let through, any date, the newest on top ---------- */
{
  const rv = (b) => post("/said/view", Object.assign({ v: 1 }, b));
  const ids = [];
  for (let i = 1; i <= 13; i++) {
    const r = await add("window line number " + i + " of thirteen", { ip: someIp() });
    eq(r.status, 200, "window line " + i + " taken");
  }
  const l = await admin({ onlyNew: true });
  for (let i = 1; i <= 13; i++) {
    const mine = l.lines.find((x) => x.text === "window line number " + i + " of thirteen");
    ok(!!mine, "line " + i + " on the desk");
    eq((await admin({ op: "decide", id: mine.id, ok: true })).status, 200, "line " + i + " let through");
    await sleep(15);
  }
  const v = await rv({ recent: true });
  eq(v.status, 200, "recent answers");
  eq(v.lines.length, 12, "at most 12 lines");
  eq(v.lines[0].text, "window line number 13 of thirteen", "the newest is on top");
  ok(!v.lines.some((x) => x.text === "window line number 1 of thirteen"), "the 13th pushed the first out");
  ok(Object.keys(v.lines[0]).sort().join(",") === "c,text", "a page gets the country and the words only");
  const n2 = (await admin({ onlyNew: true })).lines.find((x) => x.text === "window line number 1 of thirteen");
  eq(n2, undefined, "(line 1 is no longer new)");
  const back = await admin({});
  const one = back.lines.find((x) => x.text === "window line number 13 of thirteen");
  await admin({ op: "decide", id: one.id, ok: false });
  const v2 = await rv({ recent: true });
  ok(!v2.lines.some((x) => x.text === "window line number 13 of thirteen"), "turned down: gone from the window at once");
  eq(v2.lines.length, 12, "and the first one comes back to make 12 again");
}

/* ---------- forgotten on time (fast: turned down 4 s, never read 8 s, let through 12 s) ---------- */
{
  const r = await add("a line that will be forgotten");
  eq(r.status, 200, "taken");
  await sleep(9500);
  await add("a nudge so the desk tidies");
  await sleep(3000);
  const l = await admin({});
  ok(!l.lines.some((x) => x.text === "a line that will be forgotten"), "a line never read is gone after its time");
}

process.exit(report("said"));
