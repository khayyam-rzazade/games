/* Play Logicers — the claim and the maker's form (chat J, 20 Nov 2026, plan 2.20 stage 2). Everything here is optional for
   makers: a listing never depends on a claim, nothing is asked of anyone, there is no sign-in.
     POST /api/claim/code  { game }               -> { code, s, line }: a line to put in the <head> of the game's own page,
                                                    <meta name="logicers-portal" content="<code>">. The code is made from a
                                                    secret s that only this device gets (so seeing the line on the page is
                                                    not enough to claim it); the keyed hash of (game, s) is kept in
                                                    games.claim_hash (one pending code a game: a new one replaces it)
     POST /api/claim/check { game, s, key? }      the Worker opens the game's own address with the fetch rules of 2.11 and
                                                    looks for the line -> the claim (below), or e: nocode | nometa | noopen |
                                                    moved | busy | nogame
     POST /api/claim/token { token, key? }        the single-use link of the weekly email (/claim/<token>) -> the claim, or
                                                    e: token | busy
     POST /api/maker       { key }                -> { maker: { name, slug }, games: [...] }, or e: key
     POST /api/maker/edit  { key, name }          the maker's name (1-60 characters)
                           { key, game, line?, kind? }   a game's line (1-60 characters, in the game's language) and kind
                                                    -> live at once when the words pass the blocklist and the length, with an
                                                    "edit" card in the queue (filter Edits) for a look; e: key | nogame |
                                                    field (with field) | blocked (with field) | busy. The address, the
                                                    language and the status are never the maker's to change.
   The claim of game G: a device that holds a valid maker key adds G to that maker; else a new maker is made, with a new key.
   If G already has a maker, the proof rotates that maker's key (the recovery, with no account); a device that holds that
   maker's key already changes nothing. A key: 24 random base32 characters, kept only as HMAC with PORTAL_KEY, shown once,
   kept on the device (portal.maker). */
import { json, bad, clock, brake, spent, keyOk, newKey, newId, keyHash, mac, hashReady, cleanText, slugify, randomB32 } from "./util.js";
import { one, all, run, st, rowsOf, KINDS, queueRow, picUrl } from "./db.js";
import { makerPic } from "./pics.js";
import { claimLook, blockText } from "./check.js";

export const TOKEN_DAYS = 90;
const DAY = 864e5;
const SITE = (env) => String(env.SITE || "https://play.logicers.com").replace(/\/+$/, "");
const B32 = /^[a-z2-7]+$/;

/* the public code of a secret s for a game: 20 base32 characters of a keyed hash, so only the Worker can make it */
async function codeOf(env, game, s) {
  const h = await mac(env, "code:" + game + ":" + s), A = "abcdefghijklmnopqrstuvwxyz234567";
  let out = "";
  for (let i = 0; i < 20; i++) out += A[parseInt(h.substr(i * 2, 2), 16) & 31];
  return "lp-" + out;
}
const claimHash = (env, game, s) => mac(env, "claim:" + game + ":" + s);
export const metaLine = (code) => `<meta name="logicers-portal" content="${code}">`;

/* a game a maker may claim: listed, not Logicers' own */
async function claimable(env, id) {
  const g = typeof id === "string" && id.length <= 40 ? await one(env, "SELECT * FROM games WHERE id = ?", id) : null;
  return g && g.status === "listed" && g.source !== "logicers" ? g : null;
}
/* the maker of a key, or null */
export async function makerOf(env, key) {
  if (!keyOk(key) || !hashReady(env)) return null;
  return one(env, "SELECT * FROM makers WHERE key_hash = ?", await keyHash(env, "maker", key));
}
async function freeMakerSlug(env, name, id) {
  const base = (slugify(name, 40) || "maker").replace(/-+$/, "");
  const taken = new Set((await all(env, "SELECT slug FROM makers WHERE (slug = ? OR slug LIKE ?) AND id <> ?", base, base + "-%", id || "")).map((r) => r.slug));
  if (!taken.has(base)) return base;
  for (let i = 2; ; i++) if (!taken.has(base + "-" + i)) return base + "-" + i;
}

export async function claimCode(env, req, b) {
  if (!brake("claimcode", req)) return bad("busy", 429);
  const g = await claimable(env, b.game);
  if (!g) return bad("nogame", 404);
  if (!hashReady(env)) return bad("busy", 503);
  const s = randomB32(24), code = await codeOf(env, g.id, s);
  await run(env, "UPDATE games SET claim_hash = ? WHERE id = ?", await claimHash(env, g.id, s), g.id);
  return json({ ok: true, code, s, line: metaLine(code) });
}

/* the claim itself, once proven: -> the answer */
async function claimed(env, g, key, how) {
  const now = clock(), mine = await makerOf(env, key);
  const stmts = [st(env, "UPDATE games SET claim_hash = NULL WHERE id = ?", g.id)];
  if (how === "meta") stmts.push(st(env, "DELETE FROM tokens WHERE game = ?", g.id), st(env, "UPDATE games SET tell_n = tell_n + 1 WHERE id = ?", g.id));
  let maker, out;
  if (g.maker_id) {
    maker = await one(env, "SELECT * FROM makers WHERE id = ?", g.maker_id);
    if (mine && maker && mine.id === maker.id) out = { how: "same" };
    else if (maker) {                                                  // the recovery: a proven claim rotates the maker's key
      const k = newKey();
      stmts.push(st(env, "UPDATE makers SET key_hash = ? WHERE id = ?", await keyHash(env, "maker", k), maker.id));
      out = { how: "rotated", key: k };
    }
  }
  if (!out && mine) {
    maker = mine;
    stmts.push(st(env, "UPDATE games SET maker_id = ?, claimed_at = ?, maker = ? WHERE id = ?", mine.id, now, mine.name, g.id));
    out = { how: "joined" };
  }
  if (!out) {
    const k = newKey(), id = newId();
    const name = cleanText(g.maker, 1, 60) || String(g.host || "").replace(/^www\./, "").slice(0, 60) || g.name.slice(0, 60);
    maker = { id, name, slug: await freeMakerSlug(env, name) };
    stmts.push(st(env, "INSERT INTO makers (id, slug, name, key_hash, made) VALUES (?, ?, ?, ?, ?)", id, maker.slug, name, await keyHash(env, "maker", k), now));
    stmts.push(st(env, "UPDATE games SET maker_id = ?, claimed_at = ?, maker = ? WHERE id = ?", id, now, name, g.id));
    out = { how: "new", key: k };
  }
  stmts.push(st(env, `INSERT INTO queue (kind, game, text, made, done, "by") VALUES ('act', ?, ?, ?, ?, 'maker')`, g.id,
    "claimed (" + how + ", " + out.how + ") by maker " + maker.slug, now, now));
  await env.DB.batch(stmts);
  return json(Object.assign({ ok: true, game: g.id, lang: g.lang, maker: { name: maker.name, slug: maker.slug } }, out));
}

export async function claimCheck(env, req, b) {
  if (spent("claim", req)) return bad("busy", 429);
  const g = await claimable(env, b.game);
  if (!g) return bad("nogame", 404);
  if (typeof b.s !== "string" || !B32.test(b.s) || b.s.length !== 24 || !g.claim_hash || g.claim_hash !== await claimHash(env, g.id, b.s)) return bad("nocode");
  brake("claim", req);                                                  // a look at an outside page: at most 10 an hour per address
  const code = await codeOf(env, g.id, b.s);
  let r;
  try { r = await claimLook(g.url); } catch (e) { r = { state: "noopen", metas: [] }; }
  if (r.state !== "ok") return bad(r.state);
  if (!r.metas.includes(code)) return bad("nometa");
  return claimed(env, g, b.key, "meta");
}

/* the claim link of the weekly email: a token made from the game and how many of its links were used, so opening the To tell
   list again shows the same link, and a used link never works again (admin.js, stage 4, keeps its keyed hash in tokens) */
export async function tokenFor(env, g) {
  const h = await mac(env, "tell:" + g.id + ":" + (g.tell_n || 0)), A = "abcdefghijklmnopqrstuvwxyz234567";
  let t = "";
  for (let i = 0; i < 24; i++) t += A[parseInt(h.substr(i * 2, 2), 16) & 31];
  return t;
}
export async function tokenGame(env, token) {
  if (!keyOk(token)) return null;
  const t = await one(env, "SELECT game, made FROM tokens WHERE h = ?", await keyHash(env, "tell", token));
  if (!t || t.made < clock() - TOKEN_DAYS * DAY) return null;
  return claimable(env, t.game);
}
export async function claimToken(env, req, b) {
  if (spent("claim", req)) return bad("busy", 429);
  const g = await tokenGame(env, b.token);
  if (!g) { brake("claim", req); return bad("token"); }
  await env.DB.batch([st(env, "DELETE FROM tokens WHERE game = ?", g.id), st(env, "UPDATE games SET tell_n = tell_n + 1 WHERE id = ?", g.id)]);
  return claimed(env, g, b.key, "link");
}

/* ---- the maker's form ---- */
export const makerPicApi = (env, req, b) => makerPic(env, req, b, makerOr);
export async function makerOr(env, req, b) {
  if (spent("makerkey", req)) return bad("busy", 429);
  const m = await makerOf(env, b.key);
  if (!m) { brake("makerkey", req); return bad("key", 403); }
  return m;
}
const gameOut = (env, g) => ({ id: g.id, name: g.name, lang: g.lang, kind: g.kind, line: g.line, url: g.url, status: g.status,
  line_by: g.line_by || null, page: g.status === "listed" && g.slug ? SITE(env) + "/" + g.lang + "/g/" + g.slug + "/" : null,
  pic: picUrl(g), pic_wait: !!g.pic_wait });
export async function makerGet(env, req, b) {
  const m = await makerOr(env, req, b);
  if (m instanceof Response) return m;
  const games = await all(env, `SELECT g.*, EXISTS (SELECT 1 FROM pics p WHERE p.game = g.id AND p.state = 'wait') AS pic_wait
     FROM games g WHERE g.maker_id = ? AND g.source <> 'logicers' ORDER BY g.claimed_at, g.id`, m.id);
  return json({ ok: true, maker: { name: m.name, slug: m.slug, page: SITE(env) + "/m/" + m.slug + "/" }, games: games.map((g) => gameOut(env, g)) });
}

export async function makerEdit(env, req, b) {
  const m = await makerOr(env, req, b);
  if (m instanceof Response) return m;
  if (!brake("makeredit", req)) return bad("busy", 429);
  const now = clock();
  if (b.game === undefined) {                                           // the maker's name, on every game of the maker
    const name = cleanText(b.name, 1, 60);
    if (name === null) return bad("field", 400, { field: "name" });
    if (blockText(name)) return bad("blocked", 400, { field: "name" });
    if (name === m.name) return json({ ok: true, maker: { name: m.name, slug: m.slug } });
    const slug = await freeMakerSlug(env, name, m.id);
    const first = await one(env, "SELECT id FROM games WHERE maker_id = ? AND source <> 'logicers' ORDER BY claimed_at, id LIMIT 1", m.id);
    await env.DB.batch([
      st(env, "UPDATE makers SET name = ?, slug = ?, edited = ? WHERE id = ?", name, slug, now, m.id),
      st(env, "UPDATE games SET maker = ? WHERE maker_id = ?", name, m.id),
    ].concat(first ? [queueRow(env, "edit", first.id, "maker name: " + m.name + " -> " + name)] : []));
    return json({ ok: true, maker: { name, slug } });
  }
  const g = typeof b.game === "string" && b.game.length <= 40 ? await one(env, "SELECT * FROM games WHERE id = ? AND maker_id = ?", b.game, m.id) : null;
  if (!g || g.source === "logicers") return bad("nogame", 404);
  for (const f of ["url", "lang", "status", "name", "slug", "maker"]) if (b[f] !== undefined) return bad("field", 400, { field: f });
  const set = {};
  if (b.line !== undefined) {
    const line = cleanText(b.line, 1, 60);
    if (line === null) return bad("field", 400, { field: "line" });
    if (blockText(line)) return bad("blocked", 400, { field: "line" });
    if (line !== g.line) set.line = line;
  }
  if (b.kind !== undefined) {
    if (!KINDS.includes(b.kind)) return bad("field", 400, { field: "kind" });
    if (b.kind !== g.kind) set.kind = b.kind;
  }
  if (!Object.keys(set).length) return json({ ok: true, game: gameOut(env, g) });
  const next = Object.assign({}, g, set, set.line ? { line_by: "maker" } : {});
  await env.DB.batch([
    st(env, "UPDATE games SET line = ?, kind = ?, line_by = ? WHERE id = ?", next.line, next.kind, next.line_by || null, g.id),
    queueRow(env, "edit", g.id, "maker edit: " + Object.entries(set).map(([k, v]) => k + " " + JSON.stringify(v) + " (was " + JSON.stringify(g[k]) + ")").join(", ")),
  ]);
  return json({ ok: true, game: gameOut(env, next) });
}
