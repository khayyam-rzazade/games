/* Logicers Studio — makers (Chat A, 8 Nov 2026).
   A maker is a name chosen once (shown as typed, 2-40 characters), a slug made from it for the addresses, and a maker
   key drawn here. The name may change later (/maker/edit); the slug never does, so no address breaks. */
import { json, bad, clock, newKey, keyHash, hashReady, cleanText, slugify, slugOk, LANGS, brake, imgUrl } from "./util.js";
import { one, all, run, st, makerByKey, makerBySlug, queueRow, capOk, deleteGame, status, isListed } from "./db.js";

export const RESERVED = new Set(["new", "edit", "terms", "admin", "api", "c", "g", "m", "list", "oembed", "img", "static",
  "assets", "about", "embed", "by", "studio", "maker", "game", "play", "report", "help", "www", "index", "favicon",
  "robots", "templates", "health", "logicers", "official", "support", "me", "live", "sitemap", "words", "login", "settings", "code", "tests", "bridge", "embed.js"]);
export const MAKERS_A_DAY = 300;
const KIT_CODE = /^[BCDFGHJKLMNPQRSTVWXZ]{7}$/;          // the saved quizzes' codes (server/live/src/names.js)

/* a maker's name: 2-40 characters as typed, one line; never one that claims to be Logicers */
export function cleanName(x) {
  const s = cleanText(x, 2, 40);
  if (s === null || !/[\p{L}\p{N}]/u.test(s)) return null;
  if (/logicers/i.test(s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z]/gi, ""))) return null;
  return s;
}
export function termsOk(v) { return typeof v === "string" && /^[0-9a-z][0-9a-z.\-]{0,19}$/i.test(v); }

/* a free slug for a new maker: the name's, else "maker"; -2, -3 ... when taken or reserved */
async function freeSlug(env, name) {
  let base = slugify(name, 36);
  if (!base || base.length < 2) base = "maker";
  for (let i = 1; i < 200; i++) {
    const s = i === 1 ? base : base + "-" + i;
    if (!slugOk(s) || RESERVED.has(s)) continue;
    if (!(await makerBySlug(env, s))) return s;
  }
  return null;
}

export async function makerNew(env, req, b) {
  if (!hashReady(env)) return bad("not_ready", 503);
  const name = cleanName(b.name);
  if (!name) return bad("name");
  const lang = LANGS.includes(b.lang) ? b.lang : null;
  if (!lang) return bad("lang");
  if (!termsOk(b.terms_version)) return bad("terms");
  if (!brake("maker_new", req, 5)) return bad("later", 429);
  if (!(await capOk(env, "m", MAKERS_A_DAY))) return bad("later", 429);
  const key = newKey(), now = clock();
  for (let tries = 0; tries < 3; tries++) {
    const slug = await freeSlug(env, name);
    if (!slug) return bad("name");
    try {
      await env.DB.batch([
        st(env, "INSERT INTO makers (slug, name, lang, key_hash, made, saved, terms_version) VALUES (?, ?, ?, ?, ?, ?, ?)",
          slug, name, lang, await keyHash(env, "maker", key), now, now, b.terms_version),
        queueRow(env, "maker", { maker: slug, text: name }),
      ]);
      return json({ ok: true, slug, key, name });
    } catch (x) { /* two makers took the same slug at once: try the next one */ }
  }
  return bad("busy", 503);
}

export async function makerEdit(env, req, b) {
  const m = await makerByKey(env, b.key);
  if (!m) return wrongKey(req);
  if (m.blocked) return bad("blocked", 403);
  const sets = [], args = [], q = [];
  if (b.name !== undefined) {
    const name = cleanName(b.name);
    if (!name) return bad("name");
    if (name !== m.name) { sets.push("name = ?"); args.push(name); q.push(queueRow(env, "maker", { maker: m.slug, text: "name: " + m.name + " -> " + name })); }
  }
  if (b.lang !== undefined) {
    if (!LANGS.includes(b.lang)) return bad("lang");
    sets.push("lang = ?"); args.push(b.lang);
  }
  if (b.kits !== undefined) {
    if (!Array.isArray(b.kits) || b.kits.length > 20) return bad("kits");
    const kits = [...new Set(b.kits.map((k) => String(k || "").trim().toUpperCase()))];
    if (!kits.every((k) => KIT_CODE.test(k))) return bad("kits");
    sets.push("kits = ?"); args.push(JSON.stringify(kits));
    const before = JSON.parse(m.kits || "[]");
    const added = kits.filter((k) => !before.includes(k));
    if (added.length) q.push(queueRow(env, "maker", { maker: m.slug, text: "quizzes on the maker page: " + added.join(", ") }));
  }
  if (!sets.length) return json({ ok: true, maker: makerOut(m) });
  sets.push("saved = ?"); args.push(clock());
  await env.DB.batch([st(env, "UPDATE makers SET " + sets.join(", ") + " WHERE slug = ?", ...args, m.slug), ...q]);
  return json({ ok: true, maker: makerOut(await makerBySlug(env, m.slug)) });
}

export function makerOut(m) {
  return { slug: m.slug, name: m.name, lang: m.lang, made: m.made, blocked: !!m.blocked, kits: JSON.parse(m.kits || "[]"), terms_version: m.terms_version };
}
export function gameNumbers(env, g, m, answers) {
  return {
    id: g.id, slug: g.slug, title: g.title, template: g.template, lang: g.lang, mode: g.mode, start_day: g.start_day,
    code: g.code, status: status(g, m), hidden_by: g.hidden === 2 ? "reports" : g.hidden ? "logicers" : null,
    keep_answers: !!g.keep_answers, want_listed: !!g.listed, plays: g.plays, items: g.n_items,
    answers: answers || 0, made: g.made, saved: g.saved, last_open: g.last_open, cover: g.cover || null, cover_url: imgUrl(env, g.id, g.cover),
  };
}

/* the maker and their games with their numbers: for the editor and for My Logicers */
export async function makerGet(env, req, b) {
  const m = await makerByKey(env, b.key);
  if (!m) return wrongKey(req);
  const games = await all(env, "SELECT * FROM games WHERE maker = ? ORDER BY made, rowid", m.slug);
  const ans = await all(env, "SELECT game, COUNT(DISTINCT pid) AS n FROM answers WHERE game IN (SELECT id FROM games WHERE maker = ?) GROUP BY game", m.slug);
  const byGame = new Map(ans.map((r) => [r.game, r.n]));
  return json({ ok: true, maker: makerOut(m), games: games.map((g) => gameNumbers(env, g, m, byGame.get(g.id))) });
}

/* the maker and everything of theirs, at once */
export async function makerDelete(env, req, b) {
  const m = await makerByKey(env, b.key);
  if (!m) return wrongKey(req);
  if (m.blocked) return bad("blocked", 403);   // F: a blocked maker keeps the address taken (Khayyam deletes from the queue)
  const games = await all(env, "SELECT * FROM games WHERE maker = ?", m.slug);
  for (const g of games) await deleteGame(env, g);
  const imgs = await all(env, "SELECT key FROM images WHERE maker = ?", m.slug);
  await env.DB.batch([
    st(env, "DELETE FROM images WHERE maker = ?", m.slug),
    st(env, "DELETE FROM queue WHERE maker = ?", m.slug),
    st(env, "DELETE FROM makers WHERE slug = ?", m.slug),
  ]);
  if (env.IMG && imgs.length) { try { await env.IMG.delete(imgs.map((x) => x.key)); } catch (x) { /* nightly */ } }
  return json({ ok: true });
}

/* GET /m/<slug>: the public maker page: the name, the games that are listed, the quizzes the maker put there */
export async function makerPublic(env, req, slug) {
  const m = await makerBySlug(env, slug);
  if (!m) { if (!brake("miss", req, 200, 6e5)) return bad("later", 429); return bad("nomaker", 404); }
  if (m.blocked) return bad("gone", 410);
  const games = (await all(env, "SELECT * FROM games WHERE maker = ? AND listed = 1 AND listed_by_khayyam = 1 AND hidden = 0 ORDER BY plays DESC, made, rowid", m.slug))
    .filter((g) => isListed(g, m))
    .map((g) => ({ slug: g.slug, title: g.title, template: g.template, lang: g.lang, mode: g.mode, start_day: g.start_day, plays: g.plays, items: g.n_items, code: g.code, cover_url: imgUrl(env, g.id, g.cover) }));
  return json({ ok: true, maker: { slug: m.slug, name: m.name, lang: m.lang }, games, kits: JSON.parse(m.kits || "[]") }, 200,
    { "Cache-Control": "public, max-age=60" });
}

/* a wrong key: counted (30 an hour per address), then "later" for every key route */
export function wrongKey(req) {
  return brake("wrong_key", req, 30) ? bad("key", 403) : bad("later", 429);
}
