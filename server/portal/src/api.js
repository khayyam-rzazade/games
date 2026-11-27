/* Play Logicers — the public API (Chat A, 19 Nov 2026). Plan 2.8, 2.11, section 3. Answers { ok: true, ... } or
   { ok: false, e: <key> }.
     GET  /api/langs                         the open languages: code, name ("Play Español"), endonym, dir, games, today
     GET  /api/<lang>/games?kind=&from=&n=&ids=   listed games in row order (ids=a,b,c: those games, for the Yours row)
     GET  /api/<lang>/dice                   { games: [[id, address], ...] }  every game of the language (Logicers' own where it has it), for the dice; cached 5 min
     GET  /api/counts?lang=                  { games: { id: { t, a } }, page: t }  t today (UTC day), a in all; cached 60 s
     POST /api/hit   { game, id }            a tap on Play (or a Logicers tile): one count per device, game and UTC day
     POST /api/view  { lang, id }            a language's page opened: one count per device, language and UTC day
     POST /api/add   { url, lang, kind, name?, email?, hp }   -> {} or e: link | here (with game: { id, name } for a listed game
                     that is not Logicers' and not claimed: the sheet offers Claim, chat N) | busy | bad; the look at the page
                                             runs after the answer (ctx.waitUntil) and lands on the queue card
     POST /api/report { game, reason, browser }   -> {} or e: bad | nogame | busy
     POST /api/vote  { game, id }            the game of the week (plan 2.20): one vote a device, language and UTC week, final
                                             once cast, only for a game this device was counted playing this week
                                             -> {} or e: bad | nogame | notplayed | voted (with same: true when it was this
                                             game) | busy
   A count needs: a POST with the portal's own Origin (index.js), a device id of the right shape (util.js deviceOk), the
   brake of its address, a browser's user agent (no known robot), PORTAL_KEY set (else nothing is counted), and room in the
   caps of its address for the UTC day (chat H, 20 Nov 2026, plan 2.8: 50 counts a game, 300 in all, 50 views a language;
   db.js NET). What is kept: the keyed hash of (UTC day, device id, game or "view:<lang>") and of (UTC day, address, what)
   with its count, until the night, and the counts by game, day and country (from Cloudflare's request data; "XX" when it
   has none). Never the id itself, never an address. */
import { json, bad, clock, utcDay, dayAdd, weekOf, brake, mac, hashReady, deviceOk, isRobot, cleanText, emailOk, newId, ring, where, showNums, netHash } from "./util.js";
import { one, all, run, st, rowsOf, capOk, queueRow, KINDS, rowOrder, openSet, NET, netStmt, changed, crownStmt, crownSet, picUrl, lgLogo, DICE_WHERE, insideOf } from "./db.js";
import { LANG, isLang, pageName, nameParts } from "./langs.js";
import { linkOk, norm, addCheck } from "./check.js";
import { lookNow } from "./cron.js";
import { REASONS } from "./pages.js";
import { lgRowLang } from "./logicers.js";

export const CAP = { add: 500, report: 2000 };

const country = (req) => { const c = req.cf && typeof req.cf.country === "string" ? req.cf.country.toUpperCase() : ""; return /^[A-Z]{2}$/.test(c) && c !== "T1" ? c : "XX"; };
const h32 = async (env, s) => (await mac(env, s)).slice(0, 32);
/* the keyed hash of (UTC week, device id, game) kept with a counted play, for the vote (plan 2.20) */
const playHash = (env, week, id, game) => h32(env, "w|" + week + "|" + id + "|" + game);

export async function hit(env, req, b) {
  if (!brake("hit", req)) return bad("busy", 429);
  const game = typeof b.game === "string" ? b.game : "";
  if (!game || game.length > 40 || !deviceOk(b.id)) return bad("bad");
  if (isRobot(req) || !hashReady(env)) return json({ ok: true, counted: false });
  const day = utcDay();
  const h = await h32(env, day + "|" + b.id + "|" + game);
  const r = await run(env, `INSERT INTO seen (day, h) SELECT ?, ? WHERE EXISTS (SELECT 1 FROM games WHERE id = ? AND status = 'listed')
     ON CONFLICT(day, h) DO NOTHING`, day, h, game);
  if (!changed(r)) return json({ ok: true, counted: false });
  /* a new device for this game today: within the caps of its address (50 for this game, 300 in all), it counts; both
     caps are read first and both counted only with the count, so a refused tap spends neither */
  const hg = await netHash(env, req, day, game), ha = await netHash(env, req, day, "all");
  const had = Object.fromEntries((await all(env, "SELECT h, n FROM nets WHERE day = ? AND h IN (?, ?)", day, hg, ha)).map((x) => [x.h, x.n]));
  if ((had[hg] || 0) >= NET.game || (had[ha] || 0) >= NET.all) return json({ ok: true, counted: false });
  await env.DB.batch([
    netStmt(env, hg, NET.game), netStmt(env, ha, NET.all),
    st(env, "INSERT INTO counts (game, day, country, n) VALUES (?, ?, ?, 1) ON CONFLICT(game, day, country) DO UPDATE SET n = n + 1", game, day, country(req)),
    st(env, "UPDATE games SET hits = hits + 1 WHERE id = ?", game),
    st(env, "INSERT INTO wseen (week, h) VALUES (?, ?) ON CONFLICT(week, h) DO NOTHING", weekOf(), await playHash(env, weekOf(), b.id, game)),
  ]);
  return json({ ok: true, counted: true });
}

/* the game of the week (plan 2.20): one vote a device, language and UTC week (Monday 00:00), for any listed game of that
   language but Logicers' own, final once cast. It counts only from a device that was counted playing that game this
   week (wseen), and at most VOTE.perNet votes a language and week come from one address (IPv4 whole, IPv6 /64). Kept for
   the week only, as keyed hashes: d (week, device, language) and net (week, address). The pages never write a tally. */
export const VOTE = { perNet: 20 };
export async function vote(env, req, b) {
  if (!brake("vote", req)) return bad("busy", 429);
  const game = typeof b.game === "string" && b.game.length <= 40 ? b.game : "";
  if (!game || !deviceOk(b.id)) return bad("bad");
  const g = await one(env, "SELECT id, lang, status, source FROM games WHERE id = ?", game);
  if (!g || g.status !== "listed" || g.source === "logicers") return bad("nogame", 404);
  if (isRobot(req) || !hashReady(env)) return bad("notplayed");
  const week = weekOf();
  if (!(await one(env, "SELECT 1 AS k FROM wseen WHERE week = ? AND h = ?", week, await playHash(env, week, b.id, game)))) return bad("notplayed");
  const d = await h32(env, "v|" + week + "|" + b.id + "|" + g.lang), net = await netHash(env, req, week, "vote");
  const had = await one(env, "SELECT game FROM votes WHERE week = ? AND lang = ? AND d = ?", week, g.lang, d);
  if (had) return bad("voted", 400, { same: had.game === game });
  const n = await one(env, "SELECT COUNT(*) AS n FROM votes WHERE week = ? AND lang = ? AND net = ?", week, g.lang, net);
  if (n && n.n >= VOTE.perNet) return bad("busy", 429);
  const r = await run(env, "INSERT INTO votes (week, lang, d, game, net, made) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT DO NOTHING", week, g.lang, d, game, net, clock());
  if (!changed(r)) return bad("voted", 400, { same: false });
  return json({ ok: true, week });
}

export async function view(env, req, b) {
  if (!brake("view", req)) return bad("busy", 429);
  if (!isLang(b.lang) || !deviceOk(b.id)) return bad("bad");
  if (isRobot(req) || !hashReady(env)) return json({ ok: true, counted: false });
  const day = utcDay();
  const h = await h32(env, day + "|" + b.id + "|view:" + b.lang);
  const r = await run(env, `INSERT INTO seen (day, h) SELECT ?, ? WHERE EXISTS (SELECT 1 FROM langs WHERE code = ? AND open = 1)
     ON CONFLICT(day, h) DO NOTHING`, day, h, b.lang);
  if (!changed(r)) return json({ ok: true, counted: false });
  if (!changed(await netStmt(env, await netHash(env, req, day, "view:" + b.lang), NET.view).run())) return json({ ok: true, counted: false });
  await run(env, "INSERT INTO views (lang, day, n) VALUES (?, ?, 1) ON CONFLICT(lang, day) DO UPDATE SET n = n + 1", b.lang, day);
  return json({ ok: true, counted: true });
}

/* add a game (2.11): the answer comes from what can be seen without fetching; the fetch runs after it.
   The hidden robot field (hp): a game sent with it filled is still kept, waiting, flagged "hp" on its card, so a real maker
   whose browser filled it is never lost (chat H, 20 Nov 2026); the queue shows cards with no flags first. */
export async function add(env, req, b, ctx) {
  const hp = typeof b.hp === "string" && !!b.hp.trim();
  const url = linkOk(b.url);
  if (!url) return bad("link");
  if (!isLang(b.lang) || !KINDS.includes(b.kind)) return bad("bad");
  const name = cleanText(b.name, 0, 60), email = cleanText(b.email, 0, 120);
  if (name === null || email === null || (email && !emailOk(email))) return bad("bad");
  if (!brake("add", req)) return bad("busy", 429);
  const n = norm(url);
  const was = await one(env, "SELECT id, name, status, source, maker_id FROM games WHERE lang = ? AND norm = ?", b.lang, n);
  /* already here: a listed game that is not Logicers' and not claimed is named, so the sheet can offer Claim (chat N, 22 Nov
     2026); a waiting, rejected or hidden one says nothing more */
  if (was) return bad("here", 400, was.status === "listed" && was.source !== "logicers" && !was.maker_id ? { game: { id: was.id, name: was.name } } : null);
  /* at most 10 a day from one address (a keyed hash in nets, never the address; only with the secret set) */
  if (hashReady(env) && !changed(await netStmt(env, await netHash(env, req, utcDay(), "add"), NET.add).run())) return bad("busy", 429);
  if (!(await capOk(env, "add", CAP.add))) return bad("busy", 429);
  const id = newId(), now = clock();
  try {
    await env.DB.batch([
      st(env, `INSERT INTO games (id, slug, lang, name, url, norm, host, kind, status, source, made)
         VALUES (?, NULL, ?, '', ?, ?, ?, ?, 'waiting', 'add', ?)`, id, b.lang, url.href, n, url.hostname.replace(/^www\./, ""), b.kind, now),
      st(env, "INSERT INTO adds (game, name, email, made, check_json) VALUES (?, ?, ?, ?, ?)", id, name, email, now, hp ? JSON.stringify({ flags: ["hp"] }) : null),
      queueRow(env, "add", id, "sent for " + b.lang + " (" + b.kind + ")" + (hp ? ", hidden field filled" : "")),
    ]);
  } catch (e) {
    if (/UNIQUE/i.test(String(e && e.message))) return bad("here");                     // two people at the same moment
    throw e;
  }
  const look = (async () => {
    try {
      const c = await addCheck(url.href, b.lang);
      c.at = clock();
      if (hp) c.flags.unshift("hp");
      await env.DB.batch([
        st(env, "UPDATE adds SET check_json = ? WHERE game = ?", JSON.stringify(c), id),
        st(env, "UPDATE games SET last_check = ?, check_state = ?, block = ?, frame = ?, frame_at = ? WHERE id = ?", c.at, c.flags.includes("noopen") ? "noopen" : c.same_site ? "ok" : "moved",
          (c.block_words || []).join(","), c.frame === 0 || c.frame === 1 ? c.frame : null, c.frame === null || c.frame === undefined ? null : c.frame_at || null, id),
      ]);
    } catch (e) { if (env.PORTAL_DEBUG) console.error("add check", e && e.stack || e); }
  })();
  if (ctx && ctx.waitUntil) ctx.waitUntil(look); else await look;
  return json({ ok: true });
}

/* a report (2.12): never hides anything; one per browser and game while its card is open; the third browser raises the card.
   A "Not safe" report starts the nightly look at that game at once (once per game per UTC day, after the answer): the
   look, not the report, may hide it (a new blocklist word, or a move to another site; chat H, 20 Nov 2026). */
export async function report(env, req, b, ctx) {
  if (!REASONS.includes(b.reason)) return bad("bad");
  const g = typeof b.game === "string" && b.game.length <= 40 ? await one(env, "SELECT id, status FROM games WHERE id = ?", b.game) : null;
  if (!g || g.status !== "listed") return bad("nogame", 404);
  if (!brake("report", req)) return bad("busy", 429);
  const browser = deviceOk(b.browser) ? await h32(env, "report|" + b.browser) : "none";
  const day = utcDay();
  const r = await run(env, "INSERT INTO reports (game, reason, day, browser_hash) VALUES (?, ?, ?, ?) ON CONFLICT DO NOTHING", g.id, b.reason, day, browser);
  if (!r.meta || r.meta.changes !== 1) return json({ ok: true });                       // this browser already reported it: once is enough
  if (!(await capOk(env, "report", CAP.report))) return json({ ok: true });
  await queueRow(env, "report", g.id, b.reason).run();
  if (b.reason === "unsafe" && changed(await run(env, "INSERT INTO caps (day, kind, n) VALUES (?, ?, 1) ON CONFLICT(day, kind) DO NOTHING", day, "look:" + g.id))) {
    const look = lookNow(env, g.id).catch((e) => { if (env.PORTAL_DEBUG) console.error("report look", e && e.stack || e); });
    if (ctx && ctx.waitUntil) ctx.waitUntil(look); else await look;
  }
  return json({ ok: true });
}

/* ---- reads ---- */
export async function langsApi(env) {
  const day = utcDay(), show = showNums(env);                               // not shown: every number here is 0 (util.js showNums)
  const rows = await all(env, `SELECT l.code, (SELECT COUNT(*) FROM games g WHERE g.lang = l.code AND g.status = 'listed') AS games,
     COALESCE((SELECT v.n FROM views v WHERE v.lang = l.code AND v.day = ?), 0) AS today FROM langs l WHERE l.open = 1`, day);
  return json({ ok: true, day, langs: rows.filter((r) => LANG.has(r.code)).map((r) => {
    const l = LANG.get(r.code);
    return { code: r.code, name: pageName(r.code), play_word: nameParts(r.code)[0], endonym: l.endonym, dir: l.dir, games: r.games, today: show ? r.today : 0 };
  }), today: show ? rows.reduce((s, r) => s + r.today, 0) : 0 }, 200, { "Cache-Control": "public, max-age=60" });
}

const shape = (env, lang, g, t, crown) => ({
  id: g.id, slug: g.slug, name: g.name, kind: g.kind, line: g.line, maker: g.maker, url: g.url,
  page: g.source === "logicers" ? null : String(env.SITE || "https://play.logicers.com") + "/" + lang + "/g/" + g.slug + "/",
  ring: ring(g.id), new: !!(g.new_until && g.new_until > clock()) && g.source !== "logicers",
  slot: g.place === 1 && g.source !== "logicers" ? 1 : null, sold: !!g.sold, logicers: g.source === "logicers",
  en: g.source === "logicers" && g.lang !== lang, today: showNums(env) ? t[g.id] || 0 : 0, all: showNums(env) ? g.hits || 0 : 0,
  crown: !!(crown && crown.has(g.id)),
  pic: g.source === "logicers" ? null : picUrl(g), logo: g.source === "logicers" ? lgLogo(g) : null,     // the logo (chat J)
  inside: insideOf(g),                                                  // where it plays inside Play Logicers (chat Inside), else null
});
export async function gamesApi(env, req, url, lang) {
  if (!isLang(lang) || !(await openSet(env)).has(lang)) return bad("nolang", 404);
  const day = utcDay();
  const ids = String(url.searchParams.get("ids") || "").split(",").map((s) => s.trim()).filter((s) => /^[a-z0-9-]{1,40}$/.test(s)).slice(0, 60);
  let list;
  if (ids.length) {
    list = await all(env, `SELECT * FROM games WHERE status = 'listed' AND id IN (${ids.map(() => "?").join(",")})
       AND (lang = ? OR (source = 'logicers' AND lang = ?))`, ...ids, lang, lgRowLang(lang));
    list.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  } else {
    const kind = url.searchParams.get("kind");
    if (kind && !KINDS.includes(kind)) return bad("bad");
    const rows = await all(env, `SELECT * FROM games WHERE status = 'listed' AND source <> 'logicers' AND lang = ?${kind ? " AND kind = ?" : ""}`, ...(kind ? [lang, kind] : [lang]));
    const week = Object.fromEntries((await all(env, `SELECT c.game, SUM(c.n) AS n FROM counts c JOIN games g ON g.id = c.game
       WHERE c.day >= ? AND g.lang = ? AND g.status = 'listed' GROUP BY c.game`, dayAdd(day, -6), lang)).map((r) => [r.game, r.n]));
    list = [];
    for (const k of kind ? [kind] : KINDS) list = list.concat(rowOrder(rows.filter((g) => g.kind === k), week));
  }
  const from = Math.max(0, parseInt(url.searchParams.get("from"), 10) || 0);
  const n = Math.min(100, Math.max(1, parseInt(url.searchParams.get("n"), 10) || 48));
  const page = list.slice(from, from + n);
  /* today's numbers, 90 games a query (D1 binds at most 100 parameters a query: n=100 and the day were 101; chat B, 19 Nov 2026) */
  const t = {};
  for (let i = 0; i < page.length; i += 90) {
    const part = page.slice(i, i + 90);
    for (const r of await all(env, `SELECT game, SUM(n) AS n FROM counts WHERE day = ? AND game IN (${part.map(() => "?").join(",")}) GROUP BY game`, day, ...part.map((g) => g.id))) t[r.game] = r.n;
  }
  const crown = crownSet(rowsOf(await crownStmt(env, lang).all()));
  return json({ ok: true, lang, games: page.map((g) => shape(env, lang, g, t, crown)), next: from + n < list.length ? from + n : null },
    200, { "Cache-Control": "public, max-age=60" });
}
/* the dice's list (20 Nov 2026): every listed game a player of this language can be sent to, as [id, address] pairs and nothing
   else, so the page can pick one at random on the device (a tap opens it at once, in a new tab, counted as any Play is).
   Logicers' own games are in it only where Logicers has the language (an English row with the EN chip is not "a game of
   this language"). The most it holds is DICE_MAX, in id order. Kept by the edge 5 minutes (index.js). */
export const DICE_MAX = 2000;
export async function diceApi(env, req, url, lang) {
  if (!isLang(lang) || !(await openSet(env)).has(lang)) return bad("nolang", 404);
  const own = lgRowLang(lang) === lang ? 1 : 0;
  const rows = await all(env, `SELECT id, url, lang, slug, status, source, frame, frame_off FROM games WHERE ${DICE_WHERE} ORDER BY id LIMIT ?`, lang, own, DICE_MAX);
  /* [id, address] and, for a game that plays inside Play Logicers, a third: its inside page (chat Inside, 27 Nov 2026) */
  return json({ ok: true, lang, games: rows.map((g) => (insideOf(g) ? [g.id, g.url, insideOf(g)] : [g.id, g.url])) }, 200, { "Cache-Control": "public, max-age=300, s-maxage=300" });
}
export async function countsApi(env, req, url) {
  if (!showNums(env)) return json({ ok: true, day: utcDay(), games: {}, page: 0, hidden: true }, 200, { "Cache-Control": "public, max-age=60" });   // counted, not shown
  const lang = url.searchParams.get("lang");
  const day = utcDay();
  if (!lang) {
    const r = await one(env, "SELECT COALESCE(SUM(n), 0) AS n FROM views WHERE day = ?", day);
    return json({ ok: true, day, games: {}, page: r.n }, 200, { "Cache-Control": "public, max-age=60" });
  }
  if (!isLang(lang)) return bad("bad");
  const [rows, t, v] = (await env.DB.batch([
    st(env, "SELECT id, hits FROM games WHERE status = 'listed' AND (lang = ? OR (source = 'logicers' AND lang = ?))", lang, lgRowLang(lang)),
    st(env, `SELECT c.game, SUM(c.n) AS n FROM counts c JOIN games g ON g.id = c.game WHERE c.day = ? AND g.status = 'listed'
       AND (g.lang = ? OR (g.source = 'logicers' AND g.lang = ?)) GROUP BY c.game`, day, lang, lgRowLang(lang)),
    st(env, "SELECT n FROM views WHERE lang = ? AND day = ?", lang, day),
  ])).map(rowsOf);
  const today = Object.fromEntries(t.map((r) => [r.game, r.n]));
  const games = {};
  for (const r of rows) games[r.id] = { t: today[r.id] || 0, a: r.hits || 0 };
  return json({ ok: true, day, games, page: v[0] ? v[0].n : 0 }, 200, { "Cache-Control": "public, max-age=60" });
}
