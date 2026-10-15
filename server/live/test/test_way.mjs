/* Logicers Live: the checks on the way back to a lost edit link (15 Oct 2026), over HTTP.
   Run against a wrangler dev started by lsrv.sh (normal times), ADMIN_KEY=test-admin-key-123:
     LIVE_URL=http://127.0.0.1:8781 node test/test_way.mjs
   With STATE_DIR (that server's --persist-to folder) the checks also look at the objects' own disk: neither an
   address nor the browser's fingerprint of it is ever written there, only the server's HMAC; an address itself
   only on the list of feedback emails, when its owner ticked "Email me for feedback", and gone when it goes.
   What must hold (kit.js setWay, rekey, gate; way.js; worker.js /kit/CODE/way and the desk's "way" and "rekey"):
   - only the edit key sets, changes or removes a game's way back; the body carries a fingerprint (64 hex), never
     an address, and anything else is refused;
   - the desk finds a maker's games from the fingerprint alone, each checked against the game itself, and shows
     no key; a game with another email, or none, is not listed and says which;
   - a new edit key only for the fingerprint the game carries; the old key stops at once and says when it was
     replaced; five new keys a day at most; nothing of this without the admin key;
   - changing or removing the email, or deleting the game, takes it off the old fingerprint's list;
   - the brakes: 30 ways set per address per 10 minutes;
   - feedback emails (section 8): the address itself only with the tick, only with its fingerprint and only that
     fingerprint's own address; on the desk's list readable, with its language, never with a code, key or hash;
     "Stop" in any game takes it off at once; it goes with the last game it was ticked from (deleted, its email
     changed); the desk removes it on request; nothing of it without the admin key. */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import { webcrypto } from "node:crypto";
import vm from "node:vm";
import { BASE, ORIGIN, ok, eq, report, someIp } from "./lib.mjs";

const ADMIN = "test-admin-key-123";
const STATE = process.env.STATE_DIR || "";

function post(path, body, ip = someIp()) {
  return fetch(BASE + path, { method: "POST", headers: { "Content-Type": "application/json", Origin: ORIGIN, "CF-Connecting-IP": ip }, body: JSON.stringify(body) })
    .then(async (r) => ({ status: r.status, ...(await r.json().catch(() => ({}))) }));
}
const admin = (body) => post("/admin", Object.assign({ key: ADMIN }, body));
const Q = () => [{ id: "qnum01", type: "num", t: "How many member states?", a: 27, lo: 0, hi: 50, step: 1, u: "" }];
const kitOf = (title, lang = "en") => ({ v: 1, title, line: "", lang, colour: "teal", qs: Q() });
const create = (title, lang) => post("/kit", { v: 1, kit: kitOf(title, lang) });

/* the browser's own file, run here as a page would: the same fingerprint the editor and the desk send */
const W = (() => {
  const win = { crypto: webcrypto, TextEncoder };
  vm.runInNewContext(readFileSync(process.env.WAYPRINT || new URL("../../../live/wayprint.js", import.meta.url), "utf8"), { window: win, String, Promise, Uint8Array, URL });
  return win.LogicersWay;
})();
const fp = (email) => W.print(email);

/* how many of the objects' storage files (STATE_DIR) hold any of these texts, read through SQLite as the
   objects keep them */
const onDisk = (needles) => new Promise((res) => execFile("python3", ["-c", `import sqlite3, sys, os
d, needles = sys.argv[1], [x.encode() for x in sys.argv[2:]]
hits = set()
for r, _, fs in os.walk(d):
    for f in fs:
        if not f.endswith(".sqlite"): continue
        p = os.path.join(r, f)
        try:
            c = sqlite3.connect(p)
            if not c.execute("select name from sqlite_master where name = '_cf_KV'").fetchone(): continue
            for k, v in c.execute("select key, value from _cf_KV"):
                b = bytes(v) if v is not None else b""
                for n in needles:
                    if n in b or n in str(k).encode(): hits.add(p)
        except Exception: pass
print(len(hits))`, STATE, ...needles], (e, out) => res(String(out).trim())));

/* ================================================================ 0. the fingerprint, in the browser */
{
  eq(W.clean("  Teacher.Name+quiz@GoogleMail.com "), "teachername@gmail.com", "Gmail: dots and +tags left out, googlemail is gmail, lower case, trimmed");
  eq(W.clean("Maria.Rossi@Scuola.IT"), "maria.rossi@scuola.it", "another address: only lower case (its dots count)");
  eq(W.clean("a+b@example.org"), "a+b@example.org", "a + at an ordinary domain is kept");
  eq(W.clean("Ana.Rossi+quiz@Outlook.com"), "ana.rossi@outlook.com", "Outlook delivers name+tag to name: the +tag left out, the dots kept");
  eq(W.clean("\u0130LKER@GMAIL.COM"), "ilker@gmail.com", "the Turkish dotted capital I is i (not i with a combining dot)");
  eq(W.clean("il\u200Dker\u00AD@gm\u200Bail.com"), "ilker@gmail.com", "invisible characters (zero-width joiner, soft hyphen, zero-width space) are left out");
  eq(W.clean("\uFF41\uFF42@\uFF45\uFF58.\uFF43\uFF4F\uFF4D"), "ab@ex.com", "full-width letters are the letters themselves (NFKC)");
  eq(W.clean("Max@M\u00FCnchen.DE"), "max@xn--mnchen-3ya.de", "a domain in another script: its punycode form, as mail systems read it");
  eq(W.clean("max@xn--mnchen-3ya.de"), "max@xn--mnchen-3ya.de", "the same domain written in punycode: the same");
  for (const bad of ["", "a@b", "a b@c.de", "@x.yz", "x@.yz", "x@y..z", "x@y.z.", "<a@b.cd>", "a@b,c.de", "x".repeat(65) + "@b.cd", "+@gmail.com", 42, null])
    ok(W.clean(bad) === "", "not an address: " + JSON.stringify(bad));
  for (const bad of ["victim@gmail.com?cc=evil%40example.org", "a@b.com/x", "a@b.com#n", "a@b.com:25", "a@b.com\\x", "a@b.com&bcc=c@d.com"])
    ok(W.clean(bad) === "", "text after the domain is not an address either: " + JSON.stringify(bad));
  for (const odd of ["e\u200D\u0301@example.org", "ab@e\u200D\u0301x.com", "  \uFF41\u200B@b.com "]) {
    const t = W.tidy(odd);
    ok(t === W.tidy(t) && (await fp(odd)) === (await fp(t)), "tidy is a fixed point, and the address as typed and as tidied give one fingerprint (a joiner between a letter and its accent): " + JSON.stringify(odd));
  }
  const a = await fp("Teacher.Name@gmail.com"), b = await fp("teachername+x@googlemail.com");
  ok(/^[0-9a-f]{64}$/.test(a || ""), "the fingerprint is 64 hex characters");
  eq(a, b, "the same Gmail inbox, written two ways: the same fingerprint");
  const want = Buffer.from(await webcrypto.subtle.digest("SHA-256", new TextEncoder().encode("logicers-way-v1:teachername@gmail.com"))).toString("hex");
  eq(a, want, "it is SHA-256 of a label and the address as compared");
  eq(await fp("not an address"), null, "no fingerprint for a non-address");
}

/* ================================================================ 1. setting it: only with the edit key, only a fingerprint */
const MAIL = "teacher" + Date.now() + "@example.org", MP = await fp(MAIL);
const A = await create("Way A");
const B = await create("Way B", "it");
const C = await create("Way C (no way back)");
ok(A.status === 200 && B.status === 200 && C.status === 200, "three games saved");
{
  const path = "/kit/" + A.code + "/way";
  eq((await post(path, { edit: A.edit, mp: MAIL })).status, 400, "an address itself is refused: only a fingerprint");
  eq((await post(path, { edit: A.edit, mp: MP.toUpperCase() })).status, 400, "a fingerprint in capitals is refused (64 lower-case hex)");
  eq((await post(path, { edit: A.edit, mp: MP.slice(1) })).status, 400, "63 characters are refused");
  eq((await post(path, { edit: A.edit })).status, 400, "no mp at all is refused (null removes; missing is a mistake)");
  eq((await post(path, { edit: A.edit, mp: 5 })).status, 400, "a number is refused");
  eq((await post(path, { edit: B.edit, mp: MP })).status, 403, "another game's edit key is refused");
  eq((await post(path, { mp: MP })).status, 403, "no edit key is refused");
  eq((await post("/kit/BCDFGHJ/way", { edit: A.edit, mp: MP })).status, 404, "a code that does not exist");
  const r = await post(path, { edit: A.edit, mp: MP });
  ok(r.status === 200 && r.ok === true && r.way === true && typeof r.wayAt === "number" && Math.abs(r.wayAt - Date.now()) < 120e3,
     "the edit key sets it: { ok, way: true, wayAt: now }");
  const again = await post(path, { edit: A.edit, mp: MP });
  ok(again.status === 200 && again.way === true, "setting the same one again is fine");
  const o = await post("/kit/" + A.code + "/open", { edit: A.edit });
  ok(o.status === 200 && o.way === true && o.wayAt === again.wayAt, "opening the game says it has a way back, and since when");
  const oc = await post("/kit/" + C.code + "/open", { edit: C.edit });
  ok(oc.status === 200 && oc.way === false && oc.wayAt === 0, "a game without one says so (and no date)");
  ok((await post("/kit/" + B.code + "/way", { edit: B.edit, mp: MP })).way === true, "a second game, the same email");
  const pub = await fetch(BASE + "/kit/" + A.code, { headers: { Origin: ORIGIN } }).then((x) => x.json());
  ok(!("way" in pub) && !JSON.stringify(pub).includes(MP), "a player's page learns nothing of it");
}

/* ================================================================ 2. the desk finds them, from the fingerprint alone */
{
  const r = await admin({ do: "way", mp: MP });
  const codes = (r.games || []).map((g) => g.code).sort();
  ok(r.status === 200 && JSON.stringify(codes) === JSON.stringify([A.code, B.code].sort()), "the desk lists the two games of this email");
  const g = (r.games || []).find((x) => x.code === B.code) || {};
  ok(g.title === "Way B" && g.lang === "it" && g.n === 1 && typeof g.made === "number" && typeof g.used === "number" && g.stopped === false, "each with its title, language, size and dates");
  const flat = JSON.stringify(r);
  ok(!flat.includes(A.edit) && !flat.includes(B.edit) && !/edit|hash|way"/i.test(flat.replace(/"games"/, "")), "no key, no hash in what the desk gets");
  const one = await admin({ do: "way", mp: MP, code: A.code });
  ok(one.status === 200 && one.games.length === 1 && one.games[0].code === A.code && one.has === true, "with a code: that game, which carries this email");
  const other = await admin({ do: "way", mp: await fp("someone.else@example.org"), code: A.code });
  ok(other.status === 200 && other.games.length === 0 && other.has === true, "another address and the code: none, and it says the game has another email");
  const none = await admin({ do: "way", mp: MP, code: C.code });
  ok(none.status === 200 && none.games.length === 0 && none.has === false, "a game with no way back: none, and it says so");
  const nobody = await admin({ do: "way", mp: await fp("nobody" + Date.now() + "@example.org") });
  ok(nobody.status === 200 && nobody.games.length === 0, "an address no game carries: nothing");
  eq((await admin({ do: "way", mp: MAIL })).status, 400, "the desk also sends only a fingerprint");
  eq((await post("/admin", { key: "wrong", do: "way", mp: MP })).status, 404, "nothing of it without the admin key");
  if (STATE) {
    eq(await onDisk([MP, MAIL, MAIL.toLowerCase()]), "0", "while two games carry it: neither the address nor the browser's fingerprint is on the objects' disk");
    ok(Number(await onDisk(["Way A"])) >= 1, "(and the same look does find a game's own title there: the disk is read)");
  }
  const view = await admin({ do: "game", code: A.code });
  ok(view.meta && view.meta.way === true && typeof view.meta.wayAt === "number" && !("old" in view.meta) && !("editHash" in view.meta) && !JSON.stringify(view).includes(MP),
     "the game's own view on the desk: a way back since a date, and neither its value nor any hash");
}

/* ================================================================ 3. a new edit key, only for that email */
{
  eq((await admin({ do: "rekey", code: A.code, mp: await fp("someone.else@example.org") })).status, 409, "another address: no new key");
  eq((await admin({ do: "rekey", code: C.code, mp: MP })).status, 409, "a game with no way back: no new key");
  eq((await admin({ do: "rekey", code: "BCDFGHJ", mp: MP })).status, 404, "no such game");
  eq((await post("/admin", { key: "wrong", do: "rekey", code: A.code, mp: MP })).status, 404, "no new key without the admin key");
  const r = await admin({ do: "rekey", code: A.code, mp: MP });
  ok(r.status === 200 && r.code === A.code && typeof r.edit === "string" && r.edit.length === 22 && r.edit !== A.edit, "the right address: a new 22-character edit key");
  const old = await post("/kit/" + A.code + "/open", { edit: A.edit });
  ok(old.status === 403 && old.e === "edit" && typeof old.replaced === "number" && Math.abs(old.replaced - Date.now()) < 120e3, "the old key stops at once, and says when it was replaced");
  const oldSave = await post("/kit/" + A.code, { v: 1, edit: A.edit, kit: kitOf("Way A, changed") });
  ok(oldSave.status === 403 && typeof oldSave.replaced === "number", "saving with the old key: refused the same way");
  const wrong = await post("/kit/" + A.code + "/open", { edit: "x".repeat(22) });
  ok(wrong.status === 403 && !("replaced" in wrong), "a key that never opened it says nothing of a replacement");
  const fresh = await post("/kit/" + A.code + "/open", { edit: r.edit });
  ok(fresh.status === 200 && fresh.kit && fresh.kit.title === "Way A" && fresh.way === true, "the new key opens the game, which keeps its email");
  A.old = A.edit;
  A.edit = r.edit;
  const r2 = await admin({ do: "rekey", code: A.code, mp: MP });
  ok(r2.status === 200, "a second new key the same day");
  const twice = await post("/kit/" + A.code + "/open", { edit: A.old });
  ok(twice.status === 403 && typeof twice.replaced === "number", "the first key still says it was replaced");
  A.edit = r2.edit;
  let last = 0;
  for (let i = 0; i < 4; i++) { const x = await admin({ do: "rekey", code: A.code, mp: MP }); last = x.status; if (x.status === 200) A.edit = x.edit; }
  ok(last === 429, "five new keys a day for one game at most (the sixth waits)");
  ok((await post("/kit/" + A.code + "/open", { edit: A.edit })).status === 200, "the last new key works");
}

/* ================================================================ 4. changing, removing, deleting: the list follows */
{
  const MP2 = await fp("Teacher.Two" + Date.now() + "@gmail.com");
  ok((await post("/kit/" + B.code + "/way", { edit: B.edit, mp: MP2 })).way === true, "game B changes its email");
  let r = await admin({ do: "way", mp: MP });
  ok(r.games.map((g) => g.code).join() === A.code && r.of === 1, "the old email lists only game A now (its own list holds one code)");
  r = await admin({ do: "way", mp: MP2 });
  ok(r.games.map((g) => g.code).join() === B.code, "the new email lists game B");
  ok((await post("/kit/" + B.code + "/way", { edit: B.edit, mp: null })).way === false, "game B removes its email (mp: null)");
  const ob = await post("/kit/" + B.code + "/open", { edit: B.edit });
  ok(ob.status === 200 && ob.way === false && ob.wayAt === 0, "and opening it says no way back, and no date");
  r = await admin({ do: "way", mp: MP2 });
  ok(r.games.length === 0 && r.of === 0, "and is listed under no email (that email's list is empty)");
  eq((await admin({ do: "rekey", code: B.code, mp: MP2 })).status, 409, "no new key for a removed email");
  ok((await post("/kit/" + A.code + "/delete", { edit: A.edit })).status === 200, "game A is deleted by its maker");
  r = await admin({ do: "way", mp: MP });
  ok(r.status === 200 && r.games.length === 0 && r.of === 0, "a deleted game is listed nowhere: its email's own list forgets it at once");
  if (STATE) eq(await onDisk([MP, MP2, MAIL, MAIL.toLowerCase()]), "0", "on the objects' disk at the end: neither an address nor the browser's fingerprint, anywhere");
}

/* ================================================================ 4b. a game Logicers stopped takes no way back */
{
  const E = await create("Way E (stopped)");
  eq((await admin({ do: "stop", code: E.code, why: "a check" })).status, 200, "Logicers stops a game");
  const r = await post("/kit/" + E.code + "/way", { edit: E.edit, mp: await fp("stopped" + Date.now() + "@example.org") });
  ok(r.status === 409 && r.e === "stopped", "its maker can no longer set a way back (409 stopped)");
}

/* ================================================================ 5. the brake: 30 ways per address per 10 minutes */
{
  const D = await create("Way D");
  const ip = someIp(), MPd = await fp("brake" + Date.now() + "@example.org");
  let first429 = 0;
  for (let i = 1; i <= 32; i++) {
    const r = await post("/kit/" + D.code + "/way", { edit: D.edit, mp: i % 2 ? MPd : null }, ip);
    if (r.status === 429 && !first429) first429 = i;
  }
  eq(first429, 31, "the 31st way set from one address in 10 minutes waits");
  const ip2 = someIp();
  let junk429 = 0;
  for (let i = 0; i < 40; i++) { const r = await post("/kit/" + D.code + "/way", { edit: "x".repeat(22), mp: MPd }, ip2); if (r.status === 429) junk429++; }
  ok(junk429 === 0 && (await post("/kit/" + D.code + "/way", { edit: D.edit, mp: MPd }, ip2)).status === 200,
     "forty tries with a wrong key from one address spend nothing of its ten minutes: its maker still sets one at once");
  ok((await post("/kit/" + D.code + "/way", { edit: D.edit, mp: MPd })).status === 200, "another address is not braked");
}

/* ================================================================ 6. many games of one email: forty at a time */
{
  const MPm = await fp("many" + Date.now() + "@example.org"), made = [];
  for (let i = 0; i < 45; i++) {
    const g = await create("Many " + i);
    if (g.status === 200 && (await post("/kit/" + g.code + "/way", { edit: g.edit, mp: MPm })).way === true) made.push(g.code);
  }
  eq(made.length, 45, "45 games carry the same email");
  const p1 = await admin({ do: "way", mp: MPm });
  ok(p1.status === 200 && p1.games.length === 40 && p1.more === true && p1.next === 40 && p1.of === 45, "the desk gets the first forty, and more is said");
  const p2 = await admin({ do: "way", mp: MPm, from: 40 });
  ok(p2.status === 200 && p2.games.length === 5 && p2.more === false, "then the last five");
  const all = new Set(p1.games.concat(p2.games).map((g) => g.code));
  ok(made.every((c) => all.has(c)) && all.size === 45, "every one of them, once");
}

/* ================================================================ 8. feedback emails: the tick, and only that address */
{
  const F = await create("Way F (feedback)", "it");
  const H = await create("Way H (feedback)");
  const ADDR = "Feed.Back" + Date.now() + "+news@GoogleMail.com", MPa = await fp(ADDR);
  const way = (g, body) => post("/kit/" + g.code + "/way", Object.assign({ edit: g.edit }, body));
  const listed = async () => ((await admin({ do: "mails" })).mails || []).filter((x) => x.email === ADDR);
  eq((await way(F, { mp: null, mail: ADDR })).status, 400, "an address with no fingerprint is refused");
  eq((await way(F, { mp: MPa, mail: "someone.else@example.org" })).status, 400, "an address that is not the fingerprint's own is refused");
  eq((await way(F, { mp: MPa, mail: 42 })).status, 400, "a number is refused");
  eq((await way(F, { mp: MPa, mail: "x".repeat(300) + "@example.org" })).status, 400, "an address of 300 characters is refused");
  eq((await way(F, { mp: MPa, mail: "not an address" })).status, 400, "words are refused");
  eq((await post("/kit/" + F.code + "/way", { edit: "x".repeat(22), mp: MPa, mail: ADDR })).status, 403, "another key is refused");
  let r = await way(F, { mp: MPa });
  ok(r.status === 200 && r.way === true && r.mail === false, "the way back alone: no feedback email");
  eq((await listed()).length, 0, "and the address is not on the list");
  r = await way(F, { mp: MPa, mail: "  " + ADDR.replace("@", "\u200B@") + " " });
  ok(r.status === 200 && r.way === true && r.mail === true, "with the tick: on the list (written with a zero-width space and spaces, as typed)");
  let mine = await listed();
  ok(mine.length === 1 && mine[0].lang === "it" && mine[0].n === 1 && Math.abs(mine[0].at - Date.now()) < 120e3,
     "the desk sees it as written (tidied: nothing invisible, no spaces at the ends), in the game's language, from one game");
  const flat = JSON.stringify(await admin({ do: "mails" }));
  ok(!flat.includes(F.code) && !flat.includes(F.edit) && !flat.includes(MPa) && !/"(codes|fp|key|hash)"/.test(flat), "never a code, a key or a hash on the desk's list");
  eq((await post("/admin", { key: "wrong", do: "mails" })).status, 404, "nothing of the list without the admin key");
  ok((await post("/kit/" + F.code + "/open", { edit: F.edit })).mail === true, "opening the game says feedback emails are on");
  ok((await way(H, { mp: MPa, mail: ADDR })).mail === true, "a second game, the same address, ticked too");
  mine = await listed();
  ok(mine.length === 1 && mine[0].n === 2 && mine[0].lang === "en", "one inbox is one entry: two games, the language of the last tick");
  ok((await way(H, { mp: MPa })).mail === true, "set again without the tick, the address stays on (the person ticked it)");
  eq((await post("/kit/" + H.code + "/mail", { edit: "x".repeat(22) })).status, 403, "Stop with another key is refused");
  r = await post("/kit/" + H.code + "/mail", { edit: H.edit });
  ok(r.status === 200 && r.ok === true && r.mail === false, "Stop: off the list");
  eq((await listed()).length, 0, "at once, from both games: the tick is the person's");
  ok((await post("/kit/" + F.code + "/open", { edit: F.edit })).mail === false && (await post("/kit/" + F.code + "/open", { edit: F.edit })).way === true,
     "the other game says so too, and keeps its way back");
  ok((await way(F, { mp: MPa, mail: ADDR })).mail === true, "ticked again");
  ok((await post("/kit/" + F.code + "/delete", { edit: F.edit })).status === 200, "its only game is deleted by its maker");
  eq((await listed()).length, 0, "and the address goes with it");
  ok((await way(H, { mp: MPa, mail: ADDR })).mail === true, "ticked from the other game");
  const ADDR2 = "other" + Date.now() + "@example.org", MPb = await fp(ADDR2);
  ok((await way(H, { mp: MPb })).way === true, "that game changes its email, without the tick");
  eq((await listed()).length, 0, "the old address goes from the list");
  ok((await way(H, { mp: MPb, mail: ADDR2 })).mail === true, "the new address, ticked");
  eq((await admin({ do: "mailrm", mp: MPb.slice(1) })).status, 400, "the desk removes by a fingerprint only (64 hex)");
  eq((await post("/admin", { key: "wrong", do: "mailrm", mp: MPb })).status, 404, "and only with the admin key");
  if (STATE) {
    eq(await onDisk([ADDR2]), "1", "on the objects' disk the readable address is in one place only, the list");
    eq(await onDisk([MPb, MPa]), "0", "the browser's fingerprints in none");
  }
  r = await admin({ do: "mailrm", mp: MPb });
  ok(r.status === 200 && r.removed === true, "the desk takes it off on its owner's request");
  ok((await admin({ do: "mailrm", mp: MPb })).removed === false, "a second time: it was not there");
  ok((await post("/kit/" + H.code + "/open", { edit: H.edit })).mail === false, "the game says feedback emails are off");
  if (STATE) eq(await onDisk([ADDR, ADDR2]), "0", "and the address is nowhere on the objects' disk");
}

/* ================================================================ 8b. anyone can type any address (the review of 15 Oct 2026)
   a tick is a request, not a proof: no text after the domain; a game is told only of its own tick; Stop only
   from a game it was ticked in; an address the desk took off stays off; 20 new ticks a day per network address;
   the last 40 games per address; a stopped game can still stop them */
{
  const way = (g, body, ip) => post("/kit/" + g.code + "/way", Object.assign({ edit: g.edit }, body), ip);
  const mails = async (addr) => ((await admin({ do: "mails" })).mails || []).filter((x) => x.email === addr);
  const opened = async (g) => (await post("/kit/" + g.code + "/open", { edit: g.edit })).mail;
  const P = await create("Way P (review)"), R = await create("Way R (review)");
  const victim = "victim" + Date.now() + "@gmail.com", MPv = await fp(victim);
  for (const tail of ["?cc=evil%40example.org", "/x", "#n", "&bcc=evil@example.org"])
    eq((await way(P, { mp: MPv, mail: victim + tail })).status, 400, "text after the domain is refused, even with the fingerprint of the address before it: " + JSON.stringify(tail));
  eq((await mails(victim)).length, 0, "and nothing of it is on the list");
  ok((await way(P, { mp: MPv, mail: victim })).mail === true, "a game ticks an address");
  let r = await way(R, { mp: MPv });
  ok(r.status === 200 && r.way === true && r.mail === false, "another game carrying the same address as its way back is told off: nothing of another game's tick");
  eq(await opened(R), false, "and so is its open");
  r = await post("/kit/" + R.code + "/mail", { edit: R.edit });
  ok(r.status === 200 && r.mail === false && (await mails(victim)).length === 1, "its Stop answers the same, and takes nothing away (the tick was not made there)");
  eq(await opened(P), true, "the game it was ticked in still says on");
  ok((await admin({ do: "mailrm", mp: MPv })).removed === true, "the desk takes it off on its owner's request");
  r = await way(P, { mp: MPv, mail: victim });
  ok(r.status === 200 && r.way === true && r.mail === false, "ticked again after that: the way back is set, the tick is not taken");
  ok((await way(R, { mp: MPv, mail: victim })).mail === false && (await mails(victim)).length === 0, "nor from another game: it stays off");
  const variant = "V.I.C.T.I.M" + victim.slice(6).replace("@", "+again@");       // the same Gmail inbox, written another way
  const vr = await way(R, { mp: await fp(variant), mail: variant });
  ok((await fp(variant)) === MPv && vr.status === 200 && vr.way === true && vr.mail === false && (await mails(variant)).length === 0,
     "kept off as an inbox, not as a spelling: the same Gmail address with dots and a +tag is refused too");
  /* two addresses on the list: Stop for one leaves the other (the count of addresses is kept right) */
  const T1 = await create("Way T1"), T2 = await create("Way T2");
  const a1 = "one" + Date.now() + "@example.org", a2 = "two" + Date.now() + "@example.org";
  ok((await way(T1, { mp: await fp(a1), mail: a1 })).mail === true && (await way(T2, { mp: await fp(a2), mail: a2 })).mail === true, "two games tick two addresses");
  ok((await post("/kit/" + T1.code + "/mail", { edit: T1.edit })).mail === false, "Stop in the first");
  ok((await mails(a1)).length === 0 && (await mails(a2)).length === 1 && (await opened(T2)) === true, "the first address is off, the second still on (and its game says so)");
  ok((await post("/kit/" + T2.code + "/mail", { edit: T2.edit })).mail === false && (await mails(a2)).length === 0, "Stop in the second: off too");
  ok((await way(T1, { mp: await fp(a1), mail: a1 })).mail === true && (await mails(a1)).length === 1, "an address stopped by its owner (not the desk) can be ticked again");
  ok((await post("/kit/" + T1.code + "/mail", { edit: T1.edit })).mail === false, "(and stopped again)");

  /* twenty new ticks a day from one network address; a game's own tick again is free */
  const tip = someIp(), games = [];
  for (let i = 0; i < 21; i++) games.push(await create("Tick " + i));
  ok(games.every((g) => g.status === 200), "21 games saved");
  const addrs = games.map((_, i) => "tick" + i + "." + Date.now() + "@example.org");
  let taken = 0;
  for (let i = 0; i < 19; i++) if ((await way(games[i], { mp: await fp(addrs[i]), mail: addrs[i] }, tip)).mail === true) taken++;
  eq(taken, 19, "nineteen addresses ticked from one network address");
  ok((await way(games[0], { mp: await fp(addrs[0]), mail: addrs[0] }, tip)).mail === true && (await way(games[0], { mp: await fp(addrs[0]), mail: addrs[0] }, tip)).mail === true,
     "one of those games ticked again, twice: still on");
  ok((await way(games[19], { mp: await fp(addrs[19]), mail: addrs[19] }, tip)).mail === true, "the twentieth address is taken (a game ticked again cost nothing)");
  r = await way(games[20], { mp: await fp(addrs[20]), mail: addrs[20] }, tip);
  ok(r.status === 200 && r.way === true && r.mail === false && (await mails(addrs[20])).length === 0, "the twenty-first: its way back is set, the tick is not taken, it is not on the list");
  ok((await way(games[0], { mp: await fp(addrs[0]), mail: addrs[0] }, tip)).mail === true, "a game already ticked still says on past the twenty");
  ok((await way(games[20], { mp: await fp(addrs[20]), mail: addrs[20] })).mail === true, "from another network address the twenty-first is taken");

  /* one address ticked in 41 games: the newest takes the place of the oldest */
  const forty = "forty" + Date.now() + "@example.org", MPf = await fp(forty), gs = [];
  for (let i = 0; i < 41; i++) gs.push(await create("Forty " + i));
  let on = 0;
  for (let i = 0; i < 41; i++) if ((await way(gs[i], { mp: MPf, mail: forty })).mail === true) on++;
  const e = await mails(forty);
  ok(on === 41 && e.length === 1 && e[0].n === 40, "ticked in 41 games, each taken: one entry, with the last forty games");
  ok((await opened(gs[0])) === false && (await opened(gs[1])) === true && (await opened(gs[40])) === true, "the oldest game's tick gave way to the newest; the others still say on");

  /* a game Logicers stopped: its maker sees feedback emails are on, and can stop them */
  const S = await create("Way S (stopped, ticked)"), sAddr = "stopped" + Date.now() + "@example.org";
  ok((await way(S, { mp: await fp(sAddr), mail: sAddr })).mail === true, "a game ticks feedback emails");
  eq((await admin({ do: "stop", code: S.code, why: "a check" })).status, 200, "then Logicers stops it");
  let so = await post("/kit/" + S.code + "/open", { edit: S.edit });
  ok(so.status === 200 && so.stopped && so.mail === true && !so.kit, "its edit link shows why, and that feedback emails are on (and nothing of the game)");
  r = await post("/kit/" + S.code + "/mail", { edit: S.edit });
  ok(r.status === 200 && r.mail === false && (await mails(sAddr)).length === 0, "its maker can still stop them");
  so = await post("/kit/" + S.code + "/open", { edit: S.edit });
  ok(so.stopped && so.mail === false, "and then it says off");
  if (STATE) eq(await onDisk([victim, MPv, sAddr]), "0", "the address taken off and kept off is on no object's disk, nor its fingerprint");
}

/* ================================================================ 7. in fast time: the way back goes with its game
   FAST_URL: a server started with TEST_TIMES=fast (a saved game lives 6 seconds after its last use), and
   FAST_STATE its --persist-to folder: when the game is deleted by its alarm, the Way object forgets its code, and
   with no code left deletes everything of itself; nothing of either is left on disk. */
const FAST = process.env.FAST_URL || "", FSTATE = process.env.FAST_STATE || "";
if (FAST && FSTATE) {
  const fpost = (path, body) => fetch(FAST + path, { method: "POST", headers: { "Content-Type": "application/json", Origin: ORIGIN, "CF-Connecting-IP": someIp() }, body: JSON.stringify(body) })
    .then(async (r) => ({ status: r.status, ...(await r.json().catch(() => ({}))) }));
  const FADDR = "fast" + Date.now() + "@example.org", MPf = await fp(FADDR);
  const g = await fpost("/kit", { v: 1, kit: kitOf("Fast way") });
  const set0 = await fpost("/kit/" + g.code + "/way", { edit: g.edit, mp: MPf, mail: FADDR });
  ok(g.status === 200 && set0.way === true && set0.mail === true, "fast: a game with a way back, and its feedback tick");
  const listed = await fetch(FAST + "/admin", { method: "POST", headers: { "Content-Type": "application/json", Origin: ORIGIN }, body: JSON.stringify({ key: ADMIN, do: "way", mp: MPf }) }).then((r) => r.json());
  ok(listed.games && listed.games.length === 1, "fast: the desk finds it");
  const holding = (code) => new Promise((res) => execFile("python3", ["-c", `import sqlite3, sys, os
d, n = sys.argv[1], sys.argv[2].encode()
c = 0
for r, _, fs in os.walk(d):
    for f in fs:
        if not f.endswith(".sqlite"): continue
        try:
            q = sqlite3.connect(os.path.join(r, f))
            if not q.execute("select name from sqlite_master where name = '_cf_KV'").fetchone(): continue
            if any(n in (bytes(v) if v is not None else b"") for (k, v) in q.execute("select key, value from _cf_KV")): c += 1
        except Exception: pass
print(c)`, FSTATE, code], (e, out) => res(Number(String(out).trim()))));
  ok((await holding(g.code)) >= 2, "fast: its code is on disk in two objects (the game, and its email's list)");
  await new Promise((r) => setTimeout(r, 4500));
  const mid = await fetch(FAST + "/admin", { method: "POST", headers: { "Content-Type": "application/json", Origin: ORIGIN }, body: JSON.stringify({ key: ADMIN, do: "mails" }) }).then((r) => r.json());
  ok((mid.mails || []).some((x) => x.email === FADDR), "fast: after the list's own check (3 s) the address of a game that lives is still on it");
  await new Promise((r) => setTimeout(r, 4500));
  eq((await fpost("/kit/" + g.code + "/open", { edit: g.edit })).status, 404, "fast: six seconds unused, the game is deleted");
  const after = await fetch(FAST + "/admin", { method: "POST", headers: { "Content-Type": "application/json", Origin: ORIGIN }, body: JSON.stringify({ key: ADMIN, do: "way", mp: MPf }) }).then((r) => r.json());
  ok(after.games && after.games.length === 0 && after.of === 0, "fast: its email lists nothing any more");
  eq(await holding(g.code), 0, "fast: nothing of the game's code is left on disk, in either object");
  eq(await holding(FADDR), 0, "fast: and its address went from the list of feedback emails with it");

  /* the list of one email is capped (200 games; 12 in fast time): past it a game still carries the email, and the
     desk still finds it by its code, but the list does not grow */
  const MPc = await fp("cap" + Date.now() + "@example.org"), codes = [];
  for (let i = 0; i < 13; i++) {
    const c = await fpost("/kit", { v: 1, kit: kitOf("Cap " + i) });
    if (c.status === 200 && (await fpost("/kit/" + c.code + "/way", { edit: c.edit, mp: MPc })).way === true) codes.push(c.code);
  }
  eq(codes.length, 13, "fast: thirteen games carry one email");
  const adm = (body) => fetch(FAST + "/admin", { method: "POST", headers: { "Content-Type": "application/json", Origin: ORIGIN }, body: JSON.stringify(Object.assign({ key: ADMIN }, body)) }).then((r) => r.json());
  const capped = await adm({ do: "way", mp: MPc });
  ok(capped.of === 12 && capped.games.length === 12 && !capped.games.some((x) => x.code === codes[12]), "fast: the email's list holds twelve, not the thirteenth");
  const byCode = await adm({ do: "way", mp: MPc, code: codes[12] });
  ok(byCode.games && byCode.games.length === 1 && byCode.games[0].code === codes[12], "fast: the thirteenth is still found by its code");

  /* the list of feedback emails is capped too (20,000 addresses; 12 in fast time): the thirteenth address keeps
     its way back, and its tick says it was not taken */
  const kits = await Promise.all(Array.from({ length: 14 }, (_, i) => fpost("/kit", { v: 1, kit: kitOf("Mail cap " + i) })));
  const stamp = Date.now(), addr = (i) => "cap" + i + "." + stamp + "@example.org";
  const tickIn = async (k, i) => fpost("/kit/" + k.code + "/way", { edit: k.edit, mp: await fp(addr(i)), mail: addr(i) });
  const ticks = [];
  for (let i = 0; i < 12; i++) ticks.push(await tickIn(kits[i], i));
  const other = await tickIn(kits[13], 0), again = await tickIn(kits[0], 0);      // at once: fast games live 6 seconds
  ticks.push(await tickIn(kits[12], 12));
  ok(ticks.slice(0, 12).every((x) => x.mail === true) && ticks[12].way === true && ticks[12].mail === false,
     "fast: twelve addresses on the list; the thirteenth keeps its way back, and is not taken");
  ok(other.way === true && other.mail === false, "fast: while the list is full, an address on it is not taken from another game either (nothing of another game's tick)");
  ok(again.mail === true, "fast: and its own game ticked again still says on");
  /* one of the twelve stops: the other eleven stay (the count is kept right, and nothing else goes with the one),
     and the thirteenth now has room */
  const stopped = await fpost("/kit/" + kits[0].code + "/mail", { edit: kits[0].edit });
  const capList = await adm({ do: "mails" });
  const still = capList.mails.filter((x) => x.email.endsWith("." + stamp + "@example.org")).length;
  ok(stopped.mail === false && still === 11 && !capList.mails.some((x) => x.email === addr(0)), "fast: Stop in one of the twelve: the other eleven stay on the list");
  ok((await tickIn(kits[12], 12)).mail === true, "fast: and the thirteenth address is taken now that there is room");
}

process.exit(report("test_way") ? 1 : 0);
