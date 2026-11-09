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
        done                   a queue row (id), or every open row of the game (and its reports), or a maker's own rows (maker)
        remove_image           a picture taken away (image: its id or URL): players never see it again, the maker's editor
                               says "Logicers removed this picture" (9 Nov 2026; "show_image" is gone: pictures show at once)
     POST /admin/img   { key, image }   a picture's bytes, for the queue page (F, 8 Nov 2026)
     POST /admin/game  { key, game } or { key, maker }   one card: a whole game, or a maker (9 Nov 2026)
     POST /admin/ai    { key }          the picture check asked about a small test picture, on Cloudflare (9 Nov 2026)
   9 Nov 2026: /admin/queue also answers `cards`: one per game (or maker) with something new, newest first, each the whole
   game as /admin/game gives it; `next` pages them (before: the last card's `last`). */
import { json, bad, clock, sha, same, brake, spent, imgUrl, IMAGE_ID, linksIn } from "./util.js";
import { one, all, run, st, findGame, makerBySlug, deleteGame, status, removeImage } from "./db.js";
import { itemLinks } from "./items.js";
import { aiProbe } from "./images.js";

export const ACTIONS = ["list", "unlist", "hide", "unhide", "delete", "block_maker", "unblock_maker", "done", "remove_image"];
export const CARDS_A_PAGE = 15;
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
  /* the cards: every game (or maker without a game) with a row, open ones only unless all; newest activity first */
  const groups = await all(env, `SELECT game, maker, MAX(id) AS last FROM queue WHERE kind <> 'act' ${b.all === true ? "" : "AND done = 0"}
     GROUP BY COALESCE(game, 'm:' || maker) HAVING MAX(id) < ? ORDER BY last DESC LIMIT ?`, before, CARDS_A_PAGE + 1);
  const cards = [];
  for (const gr of groups.slice(0, CARDS_A_PAGE)) {
    const c = gr.game ? await gameCard(env, gr.game) : await makerCard(env, gr.maker);
    if (c) { c.last = gr.last; cards.push(c); }
  }
  const og = await one(env, "SELECT COUNT(DISTINCT COALESCE(game, 'm:' || maker)) AS n FROM queue WHERE done = 0 AND kind <> 'act'");
  return json({ ok: true, queue, next: rows.length === 100 ? rows[rows.length - 1].id : null, open: open ? open.n : 0, reports: [...byGame.values()],
    cards, cards_next: groups.length > CARDS_A_PAGE ? groups[CARDS_A_PAGE - 1].last : null, open_cards: og ? og.n : 0 });
}

const siteOf = (env) => String(env.SITE || "https://by.logicers.com").replace(/\/+$/, "");
const hiddenWhy = (g) => (g.hidden === 2 ? "reports" : g.hidden ? "logicers" : null);
const CHECK = { safe: "safe", passed: "safe", flag: "flag", none: "not checked" };
/* a whole game for Khayyam's card: everything a player or the maker could see, and what is new since his last look
   (its open queue rows), its reports, every link, every picture with what the check said, the maker and their other games */
export async function gameCard(env, id) {
  const g = await findGame(env, { game: id });
  if (!g) return null;
  const site = siteOf(env);
  const m = await makerBySlug(env, g.maker);
  const items = await all(env, "SELECT id, n, json FROM items WHERE game = ? ORDER BY n", g.id);
  const imgs = await all(env, "SELECT id, verdict, made FROM images WHERE game = ? AND verdict NOT IN ('removed', 'sexual') ORDER BY made", g.id);
  const fresh = await all(env, "SELECT id, kind, item, text, image, made FROM queue WHERE game = ? AND done = 0 AND kind <> 'act' ORDER BY id", g.id);
  const reps = await all(env, "SELECT reason, text, day FROM reports WHERE game = ? AND done = 0 ORDER BY id DESC LIMIT 200", g.id);
  const others = await all(env, "SELECT id, title, listed, listed_by_khayyam, hidden FROM games WHERE maker = ? AND id <> ? ORDER BY made DESC LIMIT 30", g.maker, g.id);
  const newItems = new Set(fresh.filter((r) => r.kind === "item" && r.item).map((r) => r.item));
  const newImages = new Set(fresh.filter((r) => r.kind === "image" && r.image).map((r) => String(r.image).split("/").pop()));
  const newLinks = new Set(fresh.filter((r) => r.kind === "link").map((r) => r.text));
  const nOf = new Map(items.map((r) => [r.id, r.n + 1]));
  const used = new Map();
  const itemLinksOf = [];
  const outItems = items.map((r) => {
    const it = JSON.parse(r.json);
    itemLinksOf.push(itemLinks(it));
    if (it.image) { if (!used.has(it.image)) used.set(it.image, []); used.get(it.image).push(r.n + 1); }
    const shownImg = it.image && imgs.some((x) => x.id === it.image);
    return Object.assign(it, { n: r.n + 1, image_url: shownImg ? imgUrl(env, g.id, it.image) : null, image_removed: !!it.image && !shownImg, new: newItems.has(r.id) });
  });
  const links = [];
  for (const l of linksIn(g.about || "").links) links.push({ url: l, where: "about", new: newLinks.has(l) });
  outItems.forEach((it, i) => { for (const l of itemLinksOf[i]) if (!links.some((x) => x.url === l)) links.push({ url: l, where: "q" + it.n, new: newLinks.has(l) }); });
  let reports = null;
  if (reps.length) {
    reports = { n: reps.length, reasons: {}, texts: [], last: reps[0].day };
    for (const r of reps) { reports.reasons[r.reason] = (reports.reasons[r.reason] || 0) + 1; if (r.text && reports.texts.length < 10) reports.texts.push(r.text); }
  }
  return {
    type: "game",
    game: {
      id: g.id, title: g.title, code: g.code, url: site + "/" + g.id + "/", template: g.template, mode: g.mode, lang: g.lang, start_day: g.start_day,
      plays: g.plays, made: g.made, saved: g.saved, about: g.about, keep_answers: !!g.keep_answers,
      status: status(g, m), want_listed: !!g.listed, listed: !!g.listed_by_khayyam, hidden: hiddenWhy(g),
      items: outItems,
      images: imgs.map((x) => ({ id: x.id, url: imgUrl(env, g.id, x.id), check: CHECK[x.verdict] || String(x.verdict || "not checked"), made: x.made,
        used: used.get(x.id) || [], cover: g.cover === x.id, new: newImages.has(x.id) })),
      about_new: fresh.some((r) => r.kind === "about"),
      links,
      reports,
      fresh: fresh.map((r) => ({ id: r.id, kind: r.kind, text: r.text, n: r.item ? nOf.get(r.item) || null : null, made: r.made })),
    },
    maker: m ? makerOut(env, m, others) : { slug: g.maker, name: g.maker, gone: true, games: [] },
  };
}
function makerOut(env, m, games) {
  return { slug: m.slug, name: m.name, blocked: !!m.blocked, made: m.made, url: siteOf(env) + "/" + m.slug + "/",
    games: games.map((x) => ({ id: x.id, title: x.title, status: status(x, m), hidden: hiddenWhy(x) })) };
}
/* a maker without a game in the queue (a new maker, a new name, quizzes on the maker page) */
export async function makerCard(env, slug) {
  const m = await makerBySlug(env, slug);
  if (!m) return null;
  const games = await all(env, "SELECT id, title, listed, listed_by_khayyam, hidden FROM games WHERE maker = ? ORDER BY made DESC LIMIT 30", m.slug);
  const fresh = await all(env, "SELECT id, kind, text, made FROM queue WHERE maker = ? AND game IS NULL AND done = 0 AND kind <> 'act' ORDER BY id", m.slug);
  return { type: "maker", maker: Object.assign(makerOut(env, m, games), { fresh, kits: JSON.parse(m.kits || "[]") }) };
}

/* POST /admin/game { key, game } or { key, maker } -> { card } */
export async function adminGame(env, req, b) {
  const no = await keyRight(env, req, b);
  if (no) return no;
  const c = b.game !== undefined ? await gameCard(env, typeof b.game === "string" ? b.game.trim().toLowerCase() : "")
    : await makerCard(env, typeof b.maker === "string" ? b.maker.trim().toLowerCase() : "");
  return c ? json({ ok: true, card: c }) : bad(b.game !== undefined ? "nogame" : "nomaker", 404);
}

/* POST /admin/ai { key } -> { ai, works, models: [{ model, ok, word, said | error, ms }] } */
export async function adminAi(env, req, b) {
  const no = await keyRight(env, req, b);
  if (no) return no;
  if (!brake("admin_ai", req, 30)) return bad("later", 429);
  return json(Object.assign({ ok: true }, await aiProbe(env)));
}

export async function adminAct(env, req, b) {
  const no = await keyRight(env, req, b);
  if (no) return no;
  if (!ACTIONS.includes(b.action)) return bad("action");
  const now = clock();
  if (b.action === "remove_image") {
    const id = imageIdOf(b.image);
    if (!id) return bad("image");
    const im = await removeImage(env, id, "by Khayyam");
    if (!im) return bad("image", 404);
    return json({ ok: true, image: id, removed: true, game: im.game });
  }
  if (b.action === "done" && b.game === undefined && typeof b.maker === "string" && !Number.isInteger(b.id)) {
    await run(env, "UPDATE queue SET done = 1, done_at = ? WHERE maker = ? AND game IS NULL AND done = 0", now, b.maker.trim().toLowerCase());
    return json({ ok: true });
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

/* POST /admin/img { key, image } -> the picture's bytes (a hidden game's too: the queue page shows Khayyam everything) */
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
