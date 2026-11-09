/* Logicers Studio — games: make, save, delete, the editor's view, the answers for the CSV, and the public reads
   (one game, the directory, a code) (Chat A, 8 Nov 2026). */
import { json, bad, clock, newKey, keyHash, hashReady, cleanText, linksIn, slugify, slugOk, LANGS, dayOk, utcDay, dayNum,
  playerDay, newCode, codeOk, brake, imgUrl, randomB32 } from "./util.js";
import { one, all, run, st, makerByKey, makerBySlug, gameById, gameByCode, gameForEditor, publicState, status, isListed,
  queueRow, capOk, deleteGame, removedImages, shownCover } from "./db.js";
import { TEMPLATES, cleanItem, itemText, itemLinks } from "./items.js";
import { wrongKey, termsOk, makerOut, gameNumbers } from "./makers.js";

export const LIMITS = { gamesPerMaker: 20, itemsPerGame: 500, gamesADay: 300, aboutMax: 2000, aboutLinks: 20, queuePerSave: 60 };
export const MODES = ["daily", "open"];
const site = (env) => String(env.SITE || "https://by.logicers.com").replace(/\/+$/, "");
export const gameUrl = (env, g) => site(env) + "/" + g.maker + "/" + g.slug + "/";

function cleanTitle(x) { const s = cleanText(x, 2, 60); return s !== null && /[\p{L}\p{N}]/u.test(s) ? s : null; }
function cleanAbout(x) {
  const s = cleanText(x, 0, LIMITS.aboutMax, true);
  if (s === null) return null;
  const l = linksIn(s);
  return l.bad || l.links.length > LIMITS.aboutLinks ? null : { text: s, links: l.links };
}

async function freeGameSlug(env, maker, title) {
  let base = slugify(title, 36);
  if (!base || base.length < 2) base = "game";
  for (let i = 1; i < 100; i++) {
    const s = i === 1 ? base : base + "-" + i;
    if (slugOk(s) && !(await gameById(env, maker + "/" + s))) return s;
  }
  return null;
}

export async function gameNew(env, req, b) {
  if (!hashReady(env)) return bad("not_ready", 503);
  const m = await makerByKey(env, b.maker_key);
  if (!m) return wrongKey(req);
  if (m.blocked) return bad("blocked", 403);
  if (!TEMPLATES.includes(b.template)) return bad("template");
  const title = cleanTitle(b.title);
  if (!title) return bad("title");
  const lang = b.lang === undefined ? m.lang : b.lang;
  if (!LANGS.includes(lang)) return bad("lang");
  const mode = b.mode === undefined ? "daily" : b.mode;
  if (!MODES.includes(mode)) return bad("mode");
  const start = b.start_day === undefined || b.start_day === null || b.start_day === "" ? utcDay() : b.start_day;
  if (!dayOk(start)) return bad("start_day");
  const terms = b.terms_version === undefined ? m.terms_version : b.terms_version;
  if (!termsOk(terms)) return bad("terms");
  if (!brake("game_new", req, 20)) return bad("later", 429);
  const n = await one(env, "SELECT COUNT(*) AS n FROM games WHERE maker = ?", m.slug);
  if (n && n.n >= LIMITS.gamesPerMaker) return bad("games_full", 409);
  if (!(await capOk(env, "g", LIMITS.gamesADay))) return bad("later", 429);
  const key = newKey(), now = clock(), want = b.want_listed === true;
  for (let tries = 0; tries < 4; tries++) {
    const slug = await freeGameSlug(env, m.slug, title);
    if (!slug) return bad("title");
    const id = m.slug + "/" + slug, code = newCode();
    try {
      await env.DB.batch([
        st(env, `INSERT INTO games (id, slug, maker, code, title, template, lang, mode, start_day, listed, keep_answers, edit_key_hash,
                 terms_version, terms_day, made, saved, last_open) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          id, slug, m.slug, code, title, b.template, lang, mode, start, want ? 1 : 0, b.keep_answers === true ? 1 : 0,
          await keyHash(env, "edit", key), terms, utcDay(now), now, now, now),
        queueRow(env, "game", { maker: m.slug, game: id, text: "new " + b.template + " game (" + mode + "): " + title + (want ? "\nwants to be listed" : "") }),
      ]);
      return json({ ok: true, id, maker: m.slug, slug, code, edit_key: key, url: site(env) + "/" + id + "/", status: want ? "waiting" : "private" });
    } catch (x) { /* the same slug or code taken at the same moment: draw again */ }
  }
  return bad("busy", 503);
}

/* the editor's whole game: everything of it, with each item's counts and the game's images. A picture Khayyam removed comes
   without its address and with image_removed: true, so the editor can say so on its question (9 Nov 2026). */
async function editorView(env, g, m) {
  const items = await all(env, "SELECT id, n, json FROM items WHERE game = ? ORDER BY n", g.id);
  const counts = await all(env, "SELECT item, bucket, n FROM counts WHERE game = ?", g.id);
  const images = await all(env, "SELECT id, bytes, made, verdict FROM images WHERE game = ? ORDER BY made", g.id);
  const removed = await removedImages(env, g.id);
  const ans = await one(env, "SELECT COUNT(DISTINCT pid) AS n FROM answers WHERE game = ?", g.id);
  return {
    ok: true,
    maker: makerOut(m),
    game: Object.assign(gameNumbers(env, g, m, ans ? ans.n : 0), { about: g.about, url: gameUrl(env, g), embed_url: gameUrl(env, g) + "embed/", terms_version: g.terms_version, terms_day: g.terms_day }),
    items: items.map((r) => { const it = JSON.parse(r.json); const gone = it.image && removed.has(it.image); withUrl(env, g, it, removed); if (gone) it.image_removed = true; return it; }),
    counts: countsOut(counts),
    images: images.filter((x) => !removed.has(x.id)).map((x) => ({ id: x.id, url: imgUrl(env, g.id, x.id), bytes: x.bytes, made: x.made })),
  };
}
function withUrl(env, g, it, removed) {
  if (!it.image) return it;
  if (removed && removed.has(it.image)) { delete it.image; return it; }      // a picture Khayyam removed is never sent
  return Object.assign(it, { image_url: imgUrl(env, g.id, it.image) });
}
/* counts as { itemId: { n: all plays, b: { bucket: plays } } } */
function countsOut(rows) {
  const out = {};
  for (const r of rows) {
    const c = out[r.item] || (out[r.item] = { n: 0, b: {} });
    c.b[r.bucket] = r.n; c.n += r.n;
  }
  return out;
}

export async function gameMine(env, req, b) {
  const x = await gameForEditor(env, b);
  if (!x) return wrongKey(req);
  return json(await editorView(env, x.game, x.maker));
}

export async function gameSave(env, req, b) {
  const x = await gameForEditor(env, b);
  if (!x) return wrongKey(req);
  const g = x.game, m = x.maker;
  if (!m || m.blocked) return bad("blocked", 403);
  if (!brake("game_save", req, 240)) return bad("later", 429);
  /* F, 8 Nov 2026: the editor sends the "saved" stamp it opened (base); a save from an older tab would delete the newer
     questions and their answers, so it is refused and the editor says to reload */
  if (b.base !== undefined && b.base !== null && b.base !== "" && Number(b.base) !== Number(g.saved)) return bad("stale", 409);
  const set = {}, queue = [], now = clock();
  const q = (kind, o) => queue.push(Object.assign({ kind, maker: m.slug, game: g.id }, o));

  if (b.title !== undefined) {
    const t = cleanTitle(b.title);
    if (!t) return bad("title");
    if (t !== g.title) { set.title = t; q("game", { text: "title: " + g.title + " -> " + t }); }
  }
  const oldAbout = cleanAbout(g.about) || { text: "", links: [] };
  let about = oldAbout;
  if (b.about !== undefined) {
    about = cleanAbout(b.about === null ? "" : b.about);
    if (!about) return bad("about");
    if (about.text !== g.about) { set.about = about.text; if (about.text) q("about", { text: about.text }); }
  }
  if (b.mode !== undefined) { if (!MODES.includes(b.mode)) return bad("mode"); if (b.mode !== g.mode) set.mode = b.mode; }
  if (b.lang !== undefined) { if (!LANGS.includes(b.lang)) return bad("lang"); if (b.lang !== g.lang) set.lang = b.lang; }   // 9 Nov 2026: the language moved to the editor
  if (b.start_day !== undefined) { if (!dayOk(b.start_day)) return bad("start_day"); if (b.start_day !== g.start_day) set.start_day = b.start_day; }
  if (b.keep_answers !== undefined) {
    if (typeof b.keep_answers !== "boolean") return bad("keep_answers");
    if ((b.keep_answers ? 1 : 0) !== g.keep_answers) { set.keep_answers = b.keep_answers ? 1 : 0; q("game", { text: "keep answers: " + (b.keep_answers ? "on" : "off") }); }
  }
  if (b.want_listed !== undefined) {
    if (typeof b.want_listed !== "boolean") return bad("want_listed");
    if ((b.want_listed ? 1 : 0) !== g.listed) { set.listed = b.want_listed ? 1 : 0; q("game", { text: b.want_listed ? "wants to be listed" : "no longer wants to be listed" }); }
  }
  const imgRows = await all(env, "SELECT id FROM images WHERE game = ? AND verdict NOT IN ('removed', 'sexual')", g.id);
  const imgSet = new Set(imgRows.map((r) => r.id));
  if (b.cover !== undefined) {
    const c = b.cover === null || b.cover === "" ? null : b.cover;
    if (c !== null && (typeof c !== "string" || !imgSet.has(c))) return bad("cover");
    if (c !== (g.cover || null)) set.cover = c;
  }

  const stmts = [];
  const old = await all(env, "SELECT id, n, json, image FROM items WHERE game = ?", g.id);
  const oldById = new Map(old.map((r) => [r.id, r]));
  const oldLinks = new Set(oldAbout.links);
  for (const r of old) for (const l of itemLinks(JSON.parse(r.json))) oldLinks.add(l);
  const newLinks = new Set(about.links);
  if (b.items !== undefined) {
    if (!Array.isArray(b.items)) return bad("items");
    if (b.items.length > LIMITS.itemsPerGame) return bad("items_full", 413);
    const seen = new Set(), clean = [];
    for (let i = 0; i < b.items.length; i++) {
      const c = cleanItem(g.template, b.items[i], imgSet);
      if (c.e) return bad("item", 400, { i, field: c.e });
      if (c.item.id && seen.has(c.item.id)) return bad("item", 400, { i, field: "id" });
      if (!c.item.id) { do { c.item.id = randomB32(8); } while (seen.has(c.item.id) || oldById.has(c.item.id)); }
      seen.add(c.item.id);
      for (const l of itemLinks(c.item)) newLinks.add(l);
      clean.push(c.item);
    }
    clean.forEach((it, n) => {
      const was = oldById.get(it.id), text = JSON.stringify(it);
      if (!was) {
        stmts.push(st(env, "INSERT INTO items (game, id, n, json, image) VALUES (?, ?, ?, ?, ?)", g.id, it.id, n, text, it.image || null));
        q("item", { item: it.id, text: itemText(it), image: imgUrl(env, g.id, it.image) });
      } else if (was.json !== text || was.n !== n) {
        stmts.push(st(env, "UPDATE items SET n = ?, json = ?, image = ? WHERE game = ? AND id = ?", n, text, it.image || null, g.id, it.id));
        if (was.json !== text) q("item", { item: it.id, text: itemText(it), image: imgUrl(env, g.id, it.image) });
      }
    });
    for (const r of old) {
      if (seen.has(r.id)) continue;
      stmts.push(st(env, "DELETE FROM items WHERE game = ? AND id = ?", g.id, r.id));
      stmts.push(st(env, "DELETE FROM counts WHERE game = ? AND item = ?", g.id, r.id));
      stmts.push(st(env, "DELETE FROM answers WHERE game = ? AND item = ?", g.id, r.id));
    }
    set.n_items = clean.length;
  } else {
    for (const l of oldLinks) newLinks.add(l);
  }
  for (const l of newLinks) if (!oldLinks.has(l)) q("link", { text: l });
  if (set.keep_answers === 0) stmts.push(st(env, "DELETE FROM answers WHERE game = ?", g.id));   // off: no row per person is left
  /* F, 8 Nov 2026: a game Khayyam listed whose words, pictures or links change leaves the list until he lists it again
     (no "list a harmless quiz, then swap it"); the maker sees "Not listed yet" */
  const contentChanged = set.title !== undefined || set.about !== undefined || set.cover !== undefined || queue.some((r) => r.kind === "item" || r.kind === "link");
  if (g.listed_by_khayyam && contentChanged) { set.listed_by_khayyam = 0; q("game", { text: "changed after it was on the list: off the list until you put it there again" }); }

  set.saved = now;
  const cols = Object.keys(set);
  stmts.unshift(st(env, "UPDATE games SET " + cols.map((c) => c + " = ?").join(", ") + " WHERE id = ?", ...cols.map((c) => set[c]), g.id));
  const rows = queue.length > LIMITS.queuePerSave
    ? queue.slice(0, LIMITS.queuePerSave - 1).concat([{ kind: "game", maker: m.slug, game: g.id, text: "and " + (queue.length - LIMITS.queuePerSave + 1) + " more changes in this save" }])
    : queue;
  for (const r of rows) stmts.push(queueRow(env, r.kind, r));
  await env.DB.batch(stmts);
  return json(await editorView(env, await gameById(env, g.id), m));
}

export async function gameDelete(env, req, b) {
  const x = await gameForEditor(env, b);
  if (!x) return wrongKey(req);
  await deleteGame(env, x.game);
  return json({ ok: true });
}

/* the answers kept for the CSV ("keep answers" on), 2000 rows a page, in the order they came */
export async function gameAnswers(env, req, b) {
  const x = await gameForEditor(env, b);
  if (!x) return wrongKey(req);
  const after = Number.isInteger(b.after) && b.after > 0 ? b.after : 0;
  const rows = await all(env, `SELECT a.rowid AS r, a.item, a.pid, a.name, a.answer, a.time, i.n AS n FROM answers a
     LEFT JOIN items i ON i.game = a.game AND i.id = a.item WHERE a.game = ? AND a.rowid > ? ORDER BY a.rowid LIMIT 2000`, x.game.id, after);
  return json({
    ok: true, keep_answers: !!x.game.keep_answers,
    rows: rows.map((r) => ({ item: r.item, n: r.n === null ? null : r.n + 1, pid: r.pid, name: r.name, answer: JSON.parse(r.answer), time: r.time })),
    next: rows.length === 2000 ? rows[rows.length - 1].r : null,
  });
}

/* ---- the public reads ---- */
export function publicGame(env, g, m) {
  return {
    id: g.id, maker: { slug: m.slug, name: m.name }, slug: g.slug, title: g.title, template: g.template, lang: g.lang,
    mode: g.mode, start_day: g.start_day, about: g.about, keep_answers: !!g.keep_answers, plays: g.plays, items: g.n_items,
    code: g.code, cover_url: imgUrl(env, g.id, g.cover), url: gameUrl(env, g), embed_url: gameUrl(env, g) + "embed/", listed: isListed(g, m),
  };
}
function miss(req) { return brake("miss", req, 200, 6e5) ? bad("nogame", 404) : bad("later", 429); }

/* GET /g/<maker>/<game>?day=YYYY-MM-DD[&counts=<item id>] */
export async function gamePublic(env, req, url, makerSlug, gameSlug) {
  if (!brake("read", req, 3000, 6e5)) return bad("later", 429);
  const g = await gameById(env, makerSlug + "/" + gameSlug);
  if (!g) return miss(req);
  const m = await makerBySlug(env, g.maker);
  if (publicState(g, m) !== "ok") return bad("gone", 410);
  const now = clock();
  if (now - g.last_open > 6 * 36e5) await run(env, "UPDATE games SET last_open = ? WHERE id = ?", now, g.id);
  const day = playerDay(req, url);
  const rows = await all(env, "SELECT id, json FROM items WHERE game = ? ORDER BY n", g.id);
  const removed = await removedImages(env, g.id);
  const out = { ok: true, game: Object.assign(publicGame(env, g, m), { cover_url: await shownCover(env, g) }), day };
  if (g.mode === "open") {
    out.state = "open";
    out.items = rows.map((r) => withUrl(env, g, JSON.parse(r.json), removed));
  } else {
    const i = dayNum(day) - dayNum(g.start_day);
    if (i < 0) out.state = "soon";
    else if (i >= rows.length) out.state = "out";
    else { out.state = "today"; out.number = i + 1; out.left = rows.length - i - 1; out.item = withUrl(env, g, JSON.parse(rows[i].json), removed); }
  }
  const want = url.searchParams.get("counts");
  if (want && rows.some((r) => r.id === want)) {
    const c = countsOut(await all(env, "SELECT item, bucket, n FROM counts WHERE game = ? AND item = ?", g.id, want));
    out.counts = c[want] || { n: 0, b: {} };
  }
  return json(out);
}

/* GET /list?lang=xx&from=0&n=60&day=YYYY-MM-DD: the directory: the games their makers want listed and Logicers listed */
export async function listPublic(env, req, url) {
  if (!brake("read", req, 3000, 6e5)) return bad("later", 429);
  const lang = url.searchParams.get("lang");
  const from = Math.max(0, Math.min(100000, parseInt(url.searchParams.get("from") || "0", 10) || 0));
  const n = Math.max(1, Math.min(100, parseInt(url.searchParams.get("n") || "60", 10) || 60));
  const where = "g.listed = 1 AND g.listed_by_khayyam = 1 AND g.hidden = 0 AND m.blocked = 0 AND g.n_items > 0" +   // a game with no question yet is not shown (9 Nov 2026)
    (LANGS.includes(lang) ? " AND g.lang = ?" : "");
  const args = LANGS.includes(lang) ? [lang] : [];
  const rows = await all(env, `SELECT g.*, m.name AS maker_name FROM games g JOIN makers m ON m.slug = g.maker WHERE ${where}
     ORDER BY g.plays DESC, g.made DESC LIMIT ? OFFSET ?`, ...args, n + 1, from);
  const today = dayNum(playerDay(req, url));          // ?day= the player's date, as for one game
  const games = rows.slice(0, n).map((g) => {
    const i = today - dayNum(g.start_day);
    return {
      id: g.id, maker: { slug: g.maker, name: g.maker_name }, slug: g.slug, title: g.title, template: g.template, lang: g.lang,
      mode: g.mode, plays: g.plays, items: g.n_items, code: g.code, cover_url: imgUrl(env, g.id, g.cover), url: gameUrl(env, g),
      today: g.mode === "open" ? g.n_items > 0 : i >= 0 && i < g.n_items,
    };
  });
  return json({ ok: true, games, next: rows.length > n ? from + n : null }, 200, { "Cache-Control": "public, max-age=60" });
}

/* GET /c/<CODE>: where a code leads */
export async function codePublic(env, req, code) {
  const c = String(code || "").toUpperCase();
  const g = codeOk(c) ? await gameByCode(env, c) : null;
  if (!g) return miss(req);
  const m = await makerBySlug(env, g.maker);
  if (publicState(g, m) !== "ok") return bad("gone", 410);
  return json({ ok: true, id: g.id, maker: g.maker, slug: g.slug, url: gameUrl(env, g) });
}
