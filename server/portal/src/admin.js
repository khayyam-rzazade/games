/* Play Logicers — the queue (Chat A, 19 Nov 2026; chat H, 20 Nov 2026). Plan 2.12. Two keys, both secrets set by Khayyam,
   compared in constant time: ADMIN_KEY (everything) and REVIEW_KEY (the weekly run: list, reject, leave, show, edit, done;
   never hide, delete or import, and never the address of a game that has been on the list: a page the run opens could ask
   it to point a listed game elsewhere). A wrong key: e "key" (and a brake: 10 wrong keys in ten minutes from one address,
   then "busy").
     POST /admin/queue  { key, filter?, before? }  -> { role, cards, next, open: { todo, left, reports, dead } }
          filter: todo (new games waiting: cards with no flags first, then oldest first, so a flood sinks below real
                  games) | left (left for Khayyam, and the "numbers jump" cards) | reports (the third browser on top)
                  | dead (dead, moved, blocked, "check by hand") | edits (a maker's changes, live already: a look, then
                  Done, or a fix with Save changes; chat J) | tell (admin key only: games listed in the last 7 days whose
                  sender gave an email, not claimed and not yet told, oldest first; each card carries "tell": the email,
                  a claim link, the ready English email and a Gmail address that writes it from logicers.world@gmail.com;
                  the claim links' keyed hashes are kept when the list is shown; chat J, stage 4) | all (every game but
                  Logicers', newest first); 20 cards
                  a page, before: the "next" of the last answer
     POST /admin/game   { key, game }              -> { role, card }
     POST /admin/act    { key, game, action, fields?, reason? }
          list    on the list (needs kind, name, line and lang, here or in fields); the language opens at once if it
                  reaches 5; a New place and the ribbon for 7 days
          reject  reason: notdaily | notgame | broken | unsafe | copy | other
          leave   left for Khayyam: a waiting game gets status "left"; a listed game's open rows get the mark
          show    back on the list (hidden, dead, rejected, left)
          edit    fields only: kind, name, maker, line (at most 60 characters), lang, url
          done    the game's open rows closed (a report seen, nothing to change)
          hide    off the list (admin key)          delete   the game and everything of it (admin key)
          nocrown the game of the week's crown taken off (admin key; chat J, 20 Nov 2026, plan 2.20): this week's crown of the
                  game goes, and its "gotw" card closes
          pic_ok  the waiting logo shown (both keys; chat J, stage 3)    pic_no  the waiting logo refused and deleted (both keys)
          told    the weekly email to the sender is sent (admin key; To tell): told_at
          pic_off the logo shown taken off and deleted (both keys). "done" and the others leave a waiting logo's card open:
                  a logo is decided with pic_ok or pic_no.
          Logicers' own games: only "done" (they change in src/logicers.js).
     POST /admin/pic    { key, game }              -> { data }: the waiting logo as a data: address, for the card (both keys)
     POST /admin/import { key, games: [{ name, url, lang, kind, line, maker?, checked? }] }   (admin key; at most 500 a call)
          -> { added, updated, skipped: [{ i, e }], opened }. Idempotent on language + address: a seed already there is
          updated (its name, kind, line, maker), anything else there is skipped ("here"); a claimed seed too ("claimed").
   A card: the game, what was sent (every sender's name, and their email for the admin key only), what the add check saw (check), the flags first
   (hp: the hidden robot field was filled), the last link check, the reports (browsers, reasons), the open rows, its page.
   A game that leaves the list (reject, hide) gets off_at; its senders' names and emails go 90 days later (cron.js). */
import { json, bad, clock, sha, same, brake, spent, cleanText, slugify, newId, keyHash, DAY } from "./util.js";
import { one, all, run, st, rowsOf, KINDS, NEW_DAYS, openLangs, crownWeek, picUrl } from "./db.js";
import { bytesOf, extOf, picFile } from "./pics.js";
import { isLang, pageName } from "./langs.js";
import { tokenFor } from "./claim.js";
import { linkOk, norm } from "./check.js";

export const ACTIONS = ["list", "reject", "leave", "show", "edit", "done", "hide", "delete", "nocrown", "pic_ok", "pic_no", "pic_off", "told"];
export const ADMIN_ONLY = ["hide", "delete", "nocrown", "told"];
export const TELL_DAYS = 7;
export const MAILER = "logicers.world@gmail.com";          // the only address Logicers writes from (never Khayyam's own)
/* queue rows only the admin key closes: Khayyam's own cards */
export const KHAYYAMS = ["jump", "gotw"];
export const REJECT = ["notdaily", "notgame", "broken", "unsafe", "copy", "other"];
export const PAGE = 20;
export const IMPORT_MAX = 500;

/* -> "admin" | "review" | a Response (wrong key, or too many wrong keys) */
async function role(env, req, b) {
  if (spent("admin", req)) return bad("busy", 429);
  const k = typeof b.key === "string" ? b.key : "";
  const hk = await sha(k);
  if (k && env.ADMIN_KEY && same(hk, await sha(env.ADMIN_KEY))) return "admin";
  if (k && env.REVIEW_KEY && same(hk, await sha(env.REVIEW_KEY))) return "review";
  brake("admin", req);
  return bad("key", 403);
}

const FLAG_ORDER = ["blocklist_host", "blocklist_words", "other_site", "hp", "lang_differs", "noopen"];
const parse = (s) => { try { return s ? JSON.parse(s) : null; } catch (x) { return null; } };

/* the cards of some games, in four database reads whatever their number */
async function cards(env, games, who) {
  if (!games.length) return [];
  const ids = games.map((g) => g.id), q = ids.map(() => "?").join(",");
  const mids = [...new Set(games.map((g) => g.maker_id).filter(Boolean))];
  const [adds, rows, reps, crowns, makers, waits] = (await env.DB.batch([
    st(env, `SELECT game, name, email, made, check_json FROM adds WHERE game IN (${q}) ORDER BY id`, ...ids),
    st(env, `SELECT id, kind, game, text, made, done, "by" FROM queue WHERE game IN (${q}) AND done = 0 AND kind <> 'act' ORDER BY id`, ...ids),
    st(env, `SELECT game, reason, day, browser_hash FROM reports WHERE game IN (${q}) AND done = 0 ORDER BY id`, ...ids),
    st(env, `SELECT game FROM gotw WHERE week = ? AND off = 0 AND game IN (${q})`, crownWeek(), ...ids),
    st(env, `SELECT id, name, slug FROM makers WHERE id IN (${mids.length ? mids.map(() => "?").join(",") : "''"})`, ...mids),
    st(env, `SELECT game, h, type, w, ht, size, made FROM pics WHERE state = 'wait' AND game IN (${q})`, ...ids),
  ])).map(rowsOf);
  const site = String(env.SITE || "https://play.logicers.com");
  return games.map((g) => {
    const a = adds.filter((x) => x.game === g.id);
    const check = a.length ? parse(a[a.length - 1].check_json) : null;
    const r = reps.filter((x) => x.game === g.id);
    const reasons = {};
    for (const x of r) reasons[x.reason] = (reasons[x.reason] || 0) + 1;
    const flags = check ? FLAG_ORDER.filter((f) => (check.flags || []).includes(f)) : [];
    const open = rows.filter((x) => x.game === g.id);
    return {
      flags,
      id: g.id, name: g.name, url: g.url, host: g.host, lang: g.lang, kind: g.kind, line: g.line, maker: g.maker,
      status: g.status, source: g.source, slug: g.slug, family: g.family, made: g.made, listed_at: g.listed_at,
      page: g.slug && g.status === "listed" ? site + "/" + g.lang + "/g/" + g.slug + "/" : null,
      left: g.status === "left" || open.some((x) => x.by === "left"),
      sent: a.map((x) => (who === "admin" ? { name: x.name, email: x.email, made: x.made } : { name: x.name, made: x.made })),   // emails: Khayyam only
      check,
      link: { state: g.check_state, last: g.last_check, fails: g.fails },
      reports: { n: r.length, browsers: new Set(r.map((x) => x.browser_hash)).size, reasons, last: r.length ? r[r.length - 1].day : null },
      rows: open.map((x) => ({ id: x.id, kind: x.kind, text: x.text, made: x.made, left: x.by === "left" })),
      notes: g.notes, hits: g.hits,
      crown: crowns.some((x) => x.game === g.id),                                      // wears this week's crown (plan 2.20)
      maker_of: g.maker_id ? (makers.find((m) => m.id === g.maker_id) || null) : null,   // claimed: the maker (chat J)
      claimed_at: g.claimed_at || null, line_by: g.line_by || null,
      pic: picUrl(g),                                                                   // the logo shown (chat J)
      pic_wait: (({ w, ht, type, size, made } = {}) => (type ? { w, h: ht, type, size, made } : null))(waits.find((x) => x.game === g.id)),
    };
  });
}

/* the games of a filter, in its order */
async function pick(env, filter, from) {
  const lim = PAGE + 1;
  if (filter === "tell") return all(env, `SELECT g.* FROM games g WHERE g.status = 'listed' AND g.source <> 'logicers' AND g.maker_id IS NULL
     AND g.told_at IS NULL AND g.listed_at >= ? AND EXISTS (SELECT 1 FROM adds a WHERE a.game = g.id AND a.email <> '')
     ORDER BY g.listed_at, g.id LIMIT ? OFFSET ?`, clock() - TELL_DAYS * DAY, lim, from);
  if (filter === "all") return all(env, "SELECT * FROM games WHERE source <> 'logicers' ORDER BY made DESC, id LIMIT ? OFFSET ?", lim, from);
  if (filter === "left") return all(env, `SELECT g.* FROM games g WHERE g.status = 'left' OR EXISTS (SELECT 1 FROM queue q WHERE q.game = g.id AND q.done = 0 AND q."by" = 'left')
     ORDER BY g.made, g.id LIMIT ? OFFSET ?`, lim, from);
  if (filter === "reports") return all(env, `SELECT g.*, COUNT(DISTINCT r.browser_hash) AS nb, MIN(r.id) AS first FROM games g JOIN reports r ON r.game = g.id AND r.done = 0
     WHERE EXISTS (SELECT 1 FROM queue q WHERE q.game = g.id AND q.kind = 'report' AND q.done = 0 AND (q."by" IS NULL OR q."by" <> 'left'))
     GROUP BY g.id ORDER BY (COUNT(DISTINCT r.browser_hash) >= 3) DESC, first LIMIT ? OFFSET ?`, lim, from);
  if (filter === "edits") return all(env, `SELECT g.*, MIN(q.id) AS first FROM games g JOIN queue q ON q.game = g.id AND q.done = 0 AND q.kind IN ('edit', 'pic')
     AND (q."by" IS NULL OR q."by" <> 'left') GROUP BY g.id ORDER BY first LIMIT ? OFFSET ?`, lim, from);
  if (filter === "dead") return all(env, `SELECT g.*, MIN(q.id) AS first FROM games g JOIN queue q ON q.game = g.id AND q.done = 0 AND q.kind IN ('dead', 'moved', 'blocked', 'check')
     AND (q."by" IS NULL OR q."by" <> 'left') GROUP BY g.id ORDER BY first LIMIT ? OFFSET ?`, lim, from);
  /* To do: cards with no flags first, then the oldest (a card whose look has not run yet has no flags) */
  return all(env, `SELECT g.*, MIN(q.id) AS first, (SELECT COUNT(*) FROM adds a WHERE a.game = g.id AND json_valid(a.check_json)
       AND json_array_length(json_extract(a.check_json, '$.flags')) > 0) > 0 AS flagged
     FROM games g JOIN queue q ON q.game = g.id AND q.done = 0 AND q.kind = 'add'
     AND (q."by" IS NULL OR q."by" <> 'left') WHERE g.status = 'waiting' GROUP BY g.id ORDER BY flagged, first LIMIT ? OFFSET ?`, lim, from);
}
export const FILTERS = ["todo", "left", "reports", "dead", "edits", "tell", "all"];

export async function adminQueue(env, req, b) {
  const who = await role(env, req, b);
  if (who instanceof Response) return who;
  const filter = b.filter === undefined ? "todo" : b.filter;
  if (!FILTERS.includes(filter)) return bad("filter");
  if (filter === "tell" && who !== "admin") return bad("admin_only", 403);          // emails: Khayyam only
  const from = Number.isInteger(b.before) && b.before > 0 ? b.before : 0;
  const games = await pick(env, filter, from);
  const [todo, left, reports, dead, edits] = (await env.DB.batch([
    st(env, "SELECT COUNT(DISTINCT q.game) AS n FROM queue q JOIN games g ON g.id = q.game WHERE q.done = 0 AND q.kind = 'add' AND (q.\"by\" IS NULL OR q.\"by\" <> 'left') AND g.status = 'waiting'"),
    st(env, "SELECT COUNT(*) AS n FROM games g WHERE g.status = 'left' OR EXISTS (SELECT 1 FROM queue q WHERE q.game = g.id AND q.done = 0 AND q.\"by\" = 'left')"),
    st(env, "SELECT COUNT(DISTINCT game) AS n FROM queue WHERE done = 0 AND kind = 'report' AND (\"by\" IS NULL OR \"by\" <> 'left')"),
    st(env, "SELECT COUNT(DISTINCT game) AS n FROM queue WHERE done = 0 AND kind IN ('dead', 'moved', 'blocked', 'check') AND (\"by\" IS NULL OR \"by\" <> 'left')"),
    st(env, "SELECT COUNT(DISTINCT game) AS n FROM queue WHERE done = 0 AND kind IN ('edit', 'pic') AND (\"by\" IS NULL OR \"by\" <> 'left')"),
  ])).map((r) => (rowsOf(r)[0] || { n: 0 }).n);
  const open = { todo, left, reports, dead, edits };
  if (who === "admin") open.tell = (await one(env, `SELECT COUNT(*) AS n FROM games g WHERE g.status = 'listed' AND g.source <> 'logicers' AND g.maker_id IS NULL
     AND g.told_at IS NULL AND g.listed_at >= ? AND EXISTS (SELECT 1 FROM adds a WHERE a.game = g.id AND a.email <> '')`, clock() - TELL_DAYS * DAY)).n;
  const shown = games.slice(0, PAGE), list = await cards(env, shown, who);
  if (filter === "tell") await tellCards(env, shown, list);
  return json({ ok: true, role: who, filter, cards: list, next: games.length > PAGE ? from + PAGE : null, open });
}

export async function adminGame(env, req, b) {
  const who = await role(env, req, b);
  if (who instanceof Response) return who;
  const g = typeof b.game === "string" && b.game.length <= 40 ? await one(env, "SELECT * FROM games WHERE id = ?", b.game) : null;
  if (!g) return bad("nogame", 404);
  return json({ ok: true, role: who, card: (await cards(env, [g], who))[0] });
}

/* fields of a card, checked -> { set: {...} } | { e, field } */
function fieldsOf(f) {
  const set = {};
  if (f === undefined || f === null) return { set };
  if (typeof f !== "object" || Array.isArray(f)) return { e: "field", field: "fields" };
  if (f.kind !== undefined) { if (!KINDS.includes(f.kind)) return { e: "field", field: "kind" }; set.kind = f.kind; }
  if (f.name !== undefined) { const s = cleanText(f.name, 1, 80); if (s === null) return { e: "field", field: "name" }; set.name = s; }
  if (f.maker !== undefined) { const s = cleanText(f.maker, 0, 80); if (s === null) return { e: "field", field: "maker" }; set.maker = s; }
  if (f.line !== undefined) { const s = cleanText(f.line, 0, 60); if (s === null) return { e: "field", field: "line" }; set.line = s; }
  if (f.lang !== undefined) { if (!isLang(f.lang)) return { e: "field", field: "lang" }; set.lang = f.lang; }
  if (f.url !== undefined) { const u = linkOk(f.url); if (!u) return { e: "field", field: "url" }; set.url = u.href; set.norm = norm(u); set.host = u.hostname.replace(/^www\./, ""); }
  return { set };
}
/* a slug free in the language: from the name, else from the site's name, else from the id */
async function freeSlug(env, lang, g) {
  let base = slugify(g.name) || slugify(String(g.host || "").split(".").slice(0, -1).join(" ")) || g.id;
  base = base.slice(0, 48).replace(/-+$/, "") || g.id;
  const taken = new Set((await all(env, "SELECT slug FROM games WHERE lang = ? AND (slug = ? OR slug LIKE ?) AND id <> ?", lang, base, base + "-%", g.id)).map((r) => r.slug));
  if (!taken.has(base)) return base;
  for (let i = 2; ; i++) if (!taken.has(base + "-" + i)) return base + "-" + i;
}
const listable = (g) => (!g.kind ? "kind" : !g.name ? "name" : !g.line ? "line" : !isLang(g.lang) ? "lang" : null);

export async function adminAct(env, req, b) {
  const who = await role(env, req, b);
  if (who instanceof Response) return who;
  if (!ACTIONS.includes(b.action)) return bad("action");
  if (ADMIN_ONLY.includes(b.action) && who !== "admin") return bad("admin_only", 403);
  const g = typeof b.game === "string" && b.game.length <= 40 ? await one(env, "SELECT * FROM games WHERE id = ?", b.game) : null;
  if (!g) return bad("nogame", 404);
  if (g.source === "logicers" && b.action !== "done") return bad("logicers", 403);
  const f = fieldsOf(b.fields);
  if (f.e) return bad(f.e, 400, { field: f.field });
  /* the address of a game that has been on the list: the admin key only (plan 2.12, 20 Nov 2026) */
  if (f.set.url !== undefined && who !== "admin" && g.listed_at && f.set.url !== g.url) return bad("admin_only", 403, { field: "url" });
  const now = clock(), stmts = [];
  const next = Object.assign({}, g, f.set);
  if (f.set.norm && (f.set.norm !== g.norm || next.lang !== g.lang)) {
    if (await one(env, "SELECT id FROM games WHERE lang = ? AND norm = ? AND id <> ?", next.lang, next.norm, g.id)) return bad("here");
  }
  if (f.set.lang && f.set.lang !== g.lang && !f.set.norm) {
    if (await one(env, "SELECT id FROM games WHERE lang = ? AND norm = ? AND id <> ?", next.lang, g.norm, g.id)) return bad("here");
  }
  /* a "numbers jump" card and a suspicious game of the week are Khayyam's: only the admin key closes them */
  const close = (by) => {
    stmts.push(st(env, `UPDATE queue SET done = ?, "by" = ? WHERE game = ? AND done = 0 AND kind <> 'pic' AND (? = 'admin' OR kind NOT IN (${KHAYYAMS.map(() => "?").join(",")}))`, now, by, g.id, by, ...KHAYYAMS));
    stmts.push(st(env, "UPDATE reports SET done = 1 WHERE game = ? AND done = 0", g.id));
  };
  let status = g.status;
  if (b.action === "list" || b.action === "show") {
    const miss = listable(next);
    if (miss) return bad("field", 400, { field: miss });
    status = "listed";
    if (!next.slug || next.lang !== g.lang) next.slug = await freeSlug(env, next.lang, next);
    if (!g.listed_at) { next.listed_at = now; next.new_until = now + NEW_DAYS * DAY; }      // a game listed before keeps its date
    next.fails = 0; next.check_state = null; next.off_at = null;
    close(who);
  } else if (b.action === "reject") {
    if (!REJECT.includes(b.reason)) return bad("reason");
    if (g.status === "listed") return bad("action");                       // a listed game is hidden, not rejected
    status = "rejected";
    next.off_at = now;
    next.notes = (g.notes ? g.notes + " " : "") + "[rejected: " + b.reason + "]";
    close(who);
  } else if (b.action === "leave") {
    if (g.status === "waiting") status = "left";
    stmts.push(st(env, `UPDATE queue SET "by" = 'left' WHERE game = ? AND done = 0`, g.id));
  } else if (b.action === "done") {
    close(who);
  } else if (b.action === "nocrown") {
    stmts.push(st(env, "UPDATE gotw SET off = 1 WHERE game = ? AND week >= ?", g.id, crownWeek()));
    stmts.push(st(env, `UPDATE queue SET done = ?, "by" = ? WHERE game = ? AND done = 0 AND kind = 'gotw'`, now, who, g.id));
  } else if (b.action === "pic_ok" || b.action === "pic_no" || b.action === "pic_off") {     // the logo (chat J)
    const w = await one(env, "SELECT h, type FROM pics WHERE game = ? AND state = 'wait'", g.id);
    if (b.action !== "pic_off" && !w) return bad("nopic", 404);
    if (b.action === "pic_off" && !g.pic) return bad("nopic", 404);
    if (b.action === "pic_ok") {
      stmts.push(st(env, "DELETE FROM pics WHERE game = ? AND h <> ?", g.id, w.h));
      stmts.push(st(env, "UPDATE pics SET state = 'ok' WHERE game = ? AND h = ?", g.id, w.h));
      stmts.push(st(env, "UPDATE games SET pic = ? WHERE id = ?", picFile(w.h, extOf(w.type)), g.id));
    } else if (b.action === "pic_no") stmts.push(st(env, "DELETE FROM pics WHERE game = ? AND state = 'wait'", g.id));
    else stmts.push(st(env, "DELETE FROM pics WHERE game = ? AND state = 'ok'", g.id), st(env, "UPDATE games SET pic = NULL WHERE id = ?", g.id));
    if (b.action !== "pic_off") stmts.push(st(env, `UPDATE queue SET done = ?, "by" = ? WHERE game = ? AND done = 0 AND kind = 'pic'`, now, who, g.id));
  } else if (b.action === "told") {                                      // the weekly email is sent (To tell)
    stmts.push(st(env, "UPDATE games SET told_at = ? WHERE id = ?", now, g.id));
  } else if (b.action === "hide") {
    status = "hidden";
    next.off_at = now;
    close(who);
  } else if (b.action === "delete") {
    await env.DB.batch(["adds", "reports", "queue", "counts", "pics", "tokens"].map((t) => st(env, `DELETE FROM ${t} WHERE game = ?`, g.id))
      .concat([st(env, "DELETE FROM games WHERE id = ?", g.id),
        st(env, `INSERT INTO queue (kind, game, text, made, done, "by") VALUES ('act', NULL, ?, ?, ?, ?)`, "delete " + g.id + " " + g.lang + " " + g.norm, now, now, who)]));
    return json({ ok: true, deleted: g.id });
  }
  if (next.lang !== g.lang && g.slug && b.action === "edit" && g.status === "listed") next.slug = await freeSlug(env, next.lang, next);
  /* a claimed game's maker is the maker's own name: a fix here renames the maker on all its games (chat J) */
  if (f.set.maker !== undefined && f.set.maker !== g.maker && g.maker_id && f.set.maker) {
    stmts.push(st(env, "UPDATE makers SET name = ? WHERE id = ?", f.set.maker, g.maker_id));
    stmts.push(st(env, "UPDATE games SET maker = ? WHERE maker_id = ? AND id <> ?", f.set.maker, g.maker_id, g.id));
  }
  stmts.unshift(st(env, `UPDATE games SET status = ?, lang = ?, kind = ?, name = ?, maker = ?, line = ?, url = ?, norm = ?, host = ?, slug = ?,
      listed_at = ?, new_until = ?, fails = ?, check_state = ?, notes = ?, off_at = ? WHERE id = ?`,
    status, next.lang, next.kind, next.name, next.maker, next.line, next.url, next.norm, next.host, next.slug,
    next.listed_at ?? null, next.new_until ?? null, next.fails ?? 0, next.check_state ?? null, next.notes || "", next.off_at ?? null, g.id));
  stmts.push(st(env, `INSERT INTO queue (kind, game, text, made, done, "by") VALUES ('act', ?, ?, ?, ?, ?)`, g.id,
    b.action + (b.reason ? ": " + b.reason : "") + (Object.keys(f.set).length ? " " + JSON.stringify(f.set) : ""), now, now, who));
  try { await env.DB.batch(stmts); }
  catch (e) { if (/UNIQUE/i.test(String(e && e.message))) return bad("here"); throw e; }
  const opened = status === "listed" ? await openLangs(env) : [];
  const card = (await cards(env, [await one(env, "SELECT * FROM games WHERE id = ?", g.id)], who))[0];
  return json({ ok: true, role: who, card, opened });
}

/* To tell (chat J, stage 4, plan section 11): each card gets the sender's email, a single-use claim link (its keyed hash is
   kept now, so the link works from today for 90 days; the same link again until one of the game's links is used) and the
   ready email in English, with a Gmail address that opens it written from logicers.world@gmail.com */
export function tellText(g, page, link, name) {
  const lang = pageName(g.lang);
  const n = g.hits || 0;
  const lines = [
    `${g.name} (${g.host}) is on ${lang}: ${page}`,
    n >= 1 ? `It has sent you ${n === 1 ? "1 player" : n.toLocaleString("en-US") + " players"} so far.` : null,
    `Claim it to see your numbers by day and country and add your logo: ${link}`,
    "Nothing else is asked; reply to remove it.",
  ].filter(Boolean);
  return { subject: `${g.name} is on ${lang}`, text: `Hi${name ? " " + name : ""},\n\n${lines.join("\n")}\n\nLogicers` };
}
async function tellCards(env, games, list) {
  if (!games.length) return;
  const site = String(env.SITE || "https://play.logicers.com").replace(/\/+$/, ""), now = clock();
  const q = games.map(() => "?").join(",");
  const adds = await all(env, `SELECT game, name, email FROM adds WHERE email <> '' AND game IN (${q}) ORDER BY id`, ...games.map((g) => g.id));
  const stmts = [];
  for (const g of games) {
    const a = adds.find((x) => x.game === g.id);
    const c = list.find((x) => x.id === g.id);
    if (!a || !c) continue;
    const token = await tokenFor(env, g), link = site + "/claim/" + token + "/";
    stmts.push(st(env, "INSERT INTO tokens (h, game, made) VALUES (?, ?, ?) ON CONFLICT (h) DO NOTHING", await keyHash(env, "tell", token), g.id, now));
    const page = site + "/" + g.lang + "/g/" + g.slug + "/", m = tellText(g, page, link, a.name);
    const gmail = "https://mail.google.com/mail/?authuser=" + encodeURIComponent(MAILER) + "&view=cm&fs=1&to=" + encodeURIComponent(a.email)
      + "&su=" + encodeURIComponent(m.subject) + "&body=" + encodeURIComponent(m.text);
    c.tell = { email: a.email, name: a.name || "", link, page, subject: m.subject, text: m.text, gmail, from: MAILER };
  }
  if (stmts.length) await env.DB.batch(stmts);
}

/* the waiting logo, for the card: a data: address (the queue's CSP allows data: pictures) */
export async function adminPic(env, req, b) {
  const who = await role(env, req, b);
  if (who instanceof Response) return who;
  const p = typeof b.game === "string" && b.game.length <= 40 ? await one(env, "SELECT type, data FROM pics WHERE game = ? AND state = 'wait'", b.game) : null;
  if (!p) return bad("nopic", 404);
  const bytes = bytesOf(p.data);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return json({ ok: true, data: "data:" + p.type + ";base64," + btoa(bin) });
}

export async function adminImport(env, req, b) {
  const who = await role(env, req, b);
  if (who instanceof Response) return who;
  if (who !== "admin") return bad("admin_only", 403);
  if (!Array.isArray(b.games) || !b.games.length) return bad("games");
  if (b.games.length > IMPORT_MAX) return bad("big", 413);
  const now = clock(), skipped = [], seen = new Set();
  const items = [];
  b.games.forEach((x, i) => {
    if (!x || typeof x !== "object") { skipped.push({ i, e: "game" }); return; }
    const u = linkOk(x.url);
    if (!u) { skipped.push({ i, e: "url" }); return; }
    if (!isLang(x.lang)) { skipped.push({ i, e: "lang" }); return; }
    if (!KINDS.includes(x.kind)) { skipped.push({ i, e: "kind" }); return; }
    const name = cleanText(x.name, 1, 80), line = cleanText(x.line, 1, 60), maker = cleanText(x.maker, 0, 80);
    if (name === null) { skipped.push({ i, e: "name" }); return; }
    if (line === null) { skipped.push({ i, e: "line" }); return; }
    if (maker === null) { skipped.push({ i, e: "maker" }); return; }
    const n = norm(u), k = x.lang + " " + n;
    if (seen.has(k)) { skipped.push({ i, e: "twice" }); return; }
    seen.add(k);
    const t = typeof x.checked === "string" && /^\d{4}-\d{2}-\d{2}/.test(x.checked) ? Date.parse(x.checked.slice(0, 10) + "T12:00:00Z") : NaN;
    items.push({ i, url: u.href, host: u.hostname.replace(/^www\./, ""), norm: n, lang: x.lang, kind: x.kind, name, line, maker,
      listed_at: Number.isFinite(t) && t <= now ? t : now });
  });
  const have = new Map();
  for (const lang of [...new Set(items.map((x) => x.lang))]) {
    for (const r of await all(env, "SELECT id, norm, source, slug, maker_id FROM games WHERE lang = ?", lang)) have.set(lang + " " + r.norm, r);
  }
  const taken = new Map();
  const slugIn = (lang, name, host, id) => {
    if (!taken.has(lang)) taken.set(lang, new Set([...have.entries()].filter(([k, r]) => k.startsWith(lang + " ") && r.slug).map(([, r]) => r.slug)));
    const t = taken.get(lang);
    const base = (slugify(name) || slugify(host.split(".").slice(0, -1).join(" ")) || id).slice(0, 48).replace(/-+$/, "") || id;
    let s = base;
    for (let j = 2; t.has(s); j++) s = base + "-" + j;
    t.add(s);
    return s;
  };
  const stmts = [];
  let added = 0, updated = 0;
  for (const x of items) {
    const h = have.get(x.lang + " " + x.norm);
    if (h) {
      if (h.source !== "seed") { skipped.push({ i: x.i, e: "here" }); continue; }
      if (h.maker_id) { skipped.push({ i: x.i, e: "claimed" }); continue; }   // its words are the maker's now (chat J)
      stmts.push(st(env, "UPDATE games SET name = ?, kind = ?, line = ?, maker = ? WHERE id = ?", x.name, x.kind, x.line, x.maker, h.id));
      updated++;
      continue;
    }
    const id = newId();
    stmts.push(st(env, `INSERT INTO games (id, slug, lang, name, url, norm, host, kind, line, maker, status, source, made, listed_at, new_until)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'listed', 'seed', ?, ?, NULL)`,
      id, slugIn(x.lang, x.name, x.host, id), x.lang, x.name, x.url, x.norm, x.host, x.kind, x.line, x.maker, now, x.listed_at));
    added++;
  }
  if (stmts.length) {
    stmts.push(st(env, `INSERT INTO queue (kind, game, text, made, done, "by") VALUES ('act', NULL, ?, ?, ?, 'admin')`, "import: " + added + " added, " + updated + " updated", now, now));
    await env.DB.batch(stmts);
  }
  const opened = await openLangs(env);
  skipped.sort((a, b) => a.i - b.i);
  return json({ ok: true, added, updated, skipped, opened });
}
