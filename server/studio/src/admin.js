/* Logicers Studio — Khayyam's queue (Chat A, 8 Nov 2026). Behind the secret ADMIN_KEY, as live/admin/.
   Everything new or edited lands in the queue with the maker's name: a maker, a name change, a game, an item, an image
   (with its AI label), an About text, a link, a report. The words "approved" and "checked" are never used: a game is
   listed or not listed, hidden or not.
     POST /admin/queue { key, before?, all? }   the newest 100 rows (open ones only unless all: true), and the reports by game
     POST /admin/act   { key, game, action, id?, maker? }
        list | unlist          Khayyam's List (the directory shows a game when its maker wants it AND Khayyam listed it)
        hide | unhide          hide: the link stops working, the maker sees "hidden"; unhide also closes its reports
        delete                 the game and everything of it
        block_maker | unblock_maker   every game of the maker hidden, nothing new from them (game or maker)
        done                   a queue row (id), or every open row of the game
        show_image             a picture the check held ("flag" or not checked): players see it from now (image: its id or URL)
     POST /admin/img   { key, image }   a picture's bytes, held or not, for the queue page (F, 8 Nov 2026) */
import { json, bad, clock, sha, same, brake, spent, imgUrl, IMAGE_ID } from "./util.js";
import { one, all, run, st, findGame, makerBySlug, deleteGame, status } from "./db.js";

export const ACTIONS = ["list", "unlist", "hide", "unhide", "delete", "block_maker", "unblock_maker", "done", "show_image"];
/* an image named by its id or by its URL (the queue rows carry the URL) */
const imageIdOf = (x) => { const id = typeof x === "string" ? x.split("/").pop() : ""; return IMAGE_ID.test(id) ? id : null; };
const WRONG = 10;

async function keyRight(env, req, b) {
  if (spent("admin", req, WRONG)) return bad("later", 429);
  if (!env.ADMIN_KEY || typeof b.key !== "string" || !same(await sha(b.key), await sha(env.ADMIN_KEY))) {
    brake("admin", req, WRONG, 6e5);
    return bad("nothing", 404);
  }
  return null;
}

export async function adminQueue(env, req, b) {
  const no = await keyRight(env, req, b);
  if (no) return no;
  const before = Number.isInteger(b.before) && b.before > 0 ? b.before : 2 ** 53;
  const rows = await all(env, `SELECT q.*, m.name AS maker_name, m.blocked AS maker_blocked, g.title, g.slug AS game_slug, g.listed, g.listed_by_khayyam,
       g.hidden, g.code FROM queue q LEFT JOIN makers m ON m.slug = q.maker LEFT JOIN games g ON g.id = q.game
     WHERE q.id < ? ${b.all === true ? "" : "AND q.done = 0"} ORDER BY q.id DESC LIMIT 100`, before);
  const site = String(env.SITE || "https://by.logicers.com").replace(/\/+$/, "");
  const queue = rows.map((r) => ({
    id: r.id, kind: r.kind, made: r.made, done: !!r.done, text: r.text, image: r.image, item: r.item,
    maker: r.maker ? { slug: r.maker, name: r.maker_name, blocked: !!r.maker_blocked, url: site + "/" + r.maker + "/" } : null,
    game: r.game ? (r.title === null ? { id: r.game, gone: true } : {
      id: r.game, title: r.title, code: r.code, url: site + "/" + r.game + "/", want_listed: !!r.listed, listed: !!r.listed_by_khayyam,
      hidden: r.hidden === 2 ? "reports" : r.hidden ? "logicers" : null,
    }) : null,
  }));
  const reps = await all(env, `SELECT r.game, r.reason, r.text, r.day, g.title, g.maker, g.hidden FROM reports r LEFT JOIN games g ON g.id = r.game
     WHERE r.done = 0 ORDER BY r.id DESC LIMIT 500`);
  const byGame = new Map();
  for (const r of reps) {
    let x = byGame.get(r.game);
    if (!x) { x = { game: { id: r.game, title: r.title, url: site + "/" + r.game + "/", hidden: r.hidden === 2 ? "reports" : r.hidden ? "logicers" : null }, n: 0, reasons: {}, texts: [], last: r.day }; byGame.set(r.game, x); }
    x.n++; x.reasons[r.reason] = (x.reasons[r.reason] || 0) + 1;
    if (r.text && x.texts.length < 10) x.texts.push(r.text);
  }
  const open = await one(env, "SELECT COUNT(*) AS n FROM queue WHERE done = 0");
  return json({ ok: true, queue, next: rows.length === 100 ? rows[rows.length - 1].id : null, open: open ? open.n : 0, reports: [...byGame.values()] });
}

export async function adminAct(env, req, b) {
  const no = await keyRight(env, req, b);
  if (no) return no;
  if (!ACTIONS.includes(b.action)) return bad("action");
  const now = clock();
  if (b.action === "show_image") {
    const id = imageIdOf(b.image);
    if (!id) return bad("image");
    const r = await run(env, "UPDATE images SET verdict = 'passed' WHERE id = ?", id);
    if (!(r && r.meta && r.meta.changes)) return bad("image", 404);
    await run(env, "INSERT INTO queue (kind, text, image, made, done, done_at) VALUES ('act', 'show_image', ?, ?, 1, ?)", id, now, now);
    return json({ ok: true, image: id, shown: true });
  }
  if (b.action === "done" && Number.isInteger(b.id)) {
    await run(env, "UPDATE queue SET done = 1, done_at = ? WHERE id = ? AND done = 0", now, b.id);
    return json({ ok: true });
  }
  let g = b.game !== undefined ? await findGame(env, b) : null;
  if (b.action === "block_maker" || b.action === "unblock_maker") {
    const slug = g ? g.maker : typeof b.maker === "string" ? b.maker.trim().toLowerCase() : "";
    const m = await makerBySlug(env, slug);
    if (!m) return bad("nomaker", 404);
    await env.DB.batch([
      st(env, "UPDATE makers SET blocked = ? WHERE slug = ?", b.action === "block_maker" ? 1 : 0, m.slug),
      st(env, "INSERT INTO queue (kind, maker, text, made, done, done_at) VALUES ('act', ?, ?, ?, 1, ?)", m.slug, b.action, now, now),
    ]);
    return json({ ok: true, maker: { slug: m.slug, blocked: b.action === "block_maker" } });
  }
  if (!g) return bad("nogame", 404);
  const act = (sql, ...a) => st(env, sql, ...a);
  const log = act("INSERT INTO queue (kind, maker, game, text, made, done, done_at) VALUES ('act', ?, ?, ?, ?, 1, ?)", g.maker, g.id, b.action, now, now);
  switch (b.action) {
    case "list": await env.DB.batch([act("UPDATE games SET listed_by_khayyam = 1 WHERE id = ?", g.id), log]); break;
    case "unlist": await env.DB.batch([act("UPDATE games SET listed_by_khayyam = 0 WHERE id = ?", g.id), log]); break;
    case "hide": await env.DB.batch([act("UPDATE games SET hidden = 1 WHERE id = ?", g.id), log]); break;
    case "unhide": await env.DB.batch([
      act("UPDATE games SET hidden = 0 WHERE id = ?", g.id),
      act("UPDATE reports SET done = 1 WHERE game = ? AND done = 0", g.id), log]); break;
    case "done": await env.DB.batch([
      act("UPDATE queue SET done = 1, done_at = ? WHERE game = ? AND done = 0", now, g.id),
      act("UPDATE reports SET done = 1 WHERE game = ? AND done = 0", g.id)]); break;
    case "delete": await deleteGame(env, g); await env.DB.batch([log]); return json({ ok: true, deleted: g.id });
    default: break;
  }
  g = await findGame(env, { game: g.id });
  const m = await makerBySlug(env, g.maker);
  return json({ ok: true, game: { id: g.id, status: status(g, m), listed: !!g.listed_by_khayyam, want_listed: !!g.listed, hidden: g.hidden === 2 ? "reports" : g.hidden ? "logicers" : null } });
}

/* POST /admin/img { key, image } -> the picture's bytes (held ones too: the queue page shows Khayyam what waits for him) */
export async function adminImg(env, req, b) {
  const no = await keyRight(env, req, b);
  if (no) return no;
  const id = imageIdOf(b.image);
  if (!id || !env.IMG) return bad("image");
  const im = await one(env, "SELECT key, verdict FROM images WHERE id = ?", id);
  if (!im) return bad("image", 404);
  const obj = await env.IMG.get(im.key);
  if (!obj) return bad("image", 404);
  return new Response(obj.body, { status: 200, headers: { "Content-Type": id.endsWith(".webp") ? "image/webp" : "image/jpeg",
    "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "X-Verdict": String(im.verdict || "") } });
}
