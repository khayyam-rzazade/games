/* Logicers Studio — images (Chat A, 8 Nov 2026).
   The page resizes a picture before it sends it (longest side 1600 px, JPEG or WebP, at most 500 KB). Here it is
   checked again: the bytes say JPEG or WebP (not the name or the type the page claims), the size, the sides read from
   the file itself; then whatever could carry private data is cut out (a phone photo's EXIF holds where it was taken:
   JPEG APP1/APP3-13/APP15 and comments, WebP EXIF and XMP chunks). Then the AI check: a vision model of Workers AI
   labels it SAFE, FLAG (fine for a lesson but worth a look: art nudity, violence, a hate symbol in a history picture)
   or SEXUAL. Only SEXUAL is refused; everything else is stored, shown at once, and put in Khayyam's queue with its
   label. When the model cannot answer (the day's free allowance spent, an error), the picture is stored and shown too and
   the queue says "not checked". Khayyam's Remove in the queue takes a picture away (db.js removeImage). Cloudflare's CSAM Scanning Tool, turned on for the zone (README), scans what is served.
   Stored in R2 under "<maker>/<game>/<id>", served by this Worker at /i/<maker>/<game>/<id> (imgGet). */
import { BRAKE, json, bad, clock, randomB32, brake, imgUrl, IMAGE_ID, shown } from "./util.js";
import { one, all, run, st, gameForEditor, queueRow, capOk } from "./db.js";
import { wrongKey } from "./makers.js";

export const IMG = { maxBytes: 500 * 1024, maxSide: 1600, perGame: 30, perMaker: 200, aDay: 20000 };
export const DEFAULT_MODEL = "@cf/meta/llama-4-scout-17b-16e-instruct @cf/mistralai/mistral-small-3.1-24b-instruct";

/* ---- what the bytes are ---- */
export function sniff(b) {
  if (b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpg";
  if (b.length > 12 && ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 4) === "WEBP") return "webp";
  return null;
}
function ascii(b, at, n) { let s = ""; for (let i = 0; i < n; i++) s += String.fromCharCode(b[at + i]); return s; }
const u16be = (b, i) => (b[i] << 8) | b[i + 1];
const u16le = (b, i) => b[i] | (b[i + 1] << 8);
const u24le = (b, i) => b[i] | (b[i + 1] << 8) | (b[i + 2] << 16);
const u32le = (b, i) => (b[i] | (b[i + 1] << 8) | (b[i + 2] << 16) | (b[i + 3] << 24)) >>> 0;

/* a JPEG without its metadata, and its sides -> { bytes, w, h } or null when it cannot be read */
export function cleanJpeg(b) {
  const keep = [b.subarray(0, 2)];
  let i = 2, w = 0, h = 0;
  while (i < b.length) {
    if (b[i] !== 0xff) return null;
    while (b[i] === 0xff && i < b.length) i++;            // fill bytes
    const mk = b[i]; i++;
    if (mk === 0xd8 || mk === 0x01 || (mk >= 0xd0 && mk <= 0xd7)) { keep.push(Uint8Array.of(0xff, mk)); continue; }
    if (mk === 0xd9) { keep.push(Uint8Array.of(0xff, 0xd9)); break; }
    if (i + 2 > b.length) return null;
    const len = u16be(b, i);
    if (len < 2 || i + len > b.length) return null;
    const seg = b.subarray(i - 2, i + len);
    if ((mk >= 0xc0 && mk <= 0xcf) && mk !== 0xc4 && mk !== 0xc8 && mk !== 0xcc) { h = u16be(b, i + 3); w = u16be(b, i + 5); }
    const app = mk >= 0xe0 && mk <= 0xef;
    const drop = mk === 0xfe || (app && mk !== 0xe0 && mk !== 0xe2 && mk !== 0xee);   // keep JFIF, ICC profile, Adobe
    if (!drop) keep.push(seg);
    i += len;
    if (mk === 0xda) {                                      // the picture itself, up to its end marker (F: nothing after it is kept)
      let j = i;
      for (;;) {
        while (j + 1 < b.length && !(b[j] === 0xff && b[j + 1] !== 0x00 && !(b[j + 1] >= 0xd0 && b[j + 1] <= 0xd7))) j++;
        if (j + 1 >= b.length) return null;                 // no end marker: not a whole picture
        if (b[j + 1] === 0xd9) { keep.push(b.subarray(i, j + 2)); i = b.length; break; }
        if (b[j + 1] === 0xff) { j++; continue; }            // fill bytes before a marker
        keep.push(b.subarray(i, j)); i = j; break;            // another segment (a progressive picture's next scan): read on
      }
      if (i >= b.length) break;
      continue;
    }
  }
  if (!w || !h) return null;
  const out = new Uint8Array(keep.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of keep) { out.set(p, o); o += p.length; }
  return { bytes: out, w, h };
}

/* a WebP without EXIF and XMP, and its sides -> { bytes, w, h } or null (an animation is refused: null) */
export function cleanWebp(b) {
  if (b.length < 20) return null;
  const chunks = [];
  let i = 12, w = 0, h = 0, vp8x = -1;
  while (i + 8 <= b.length) {
    const id = ascii(b, i, 4), size = u32le(b, i + 4), end = i + 8 + size + (size & 1);
    if (i + 8 + size > b.length) return null;
    const d = b.subarray(i + 8, i + 8 + size);
    if (id === "VP8X") {
      if (size < 10 || (d[0] & 0x02)) return null;                    // animated
      w = u24le(d, 4) + 1; h = u24le(d, 7) + 1; vp8x = chunks.length;
    } else if (id === "VP8 " && !w) {
      if (size < 10 || d[3] !== 0x9d || d[4] !== 0x01 || d[5] !== 0x2a) return null;
      w = u16le(d, 6) & 0x3fff; h = u16le(d, 8) & 0x3fff;
    } else if (id === "VP8L" && !w) {
      if (size < 5 || d[0] !== 0x2f) return null;
      const bits = u32le(d, 1); w = (bits & 0x3fff) + 1; h = ((bits >>> 14) & 0x3fff) + 1;
    } else if (id === "ANIM" || id === "ANMF") return null;
    if (id !== "EXIF" && id !== "XMP ") chunks.push(b.slice(i, Math.min(end, b.length)));
    i = end;
  }
  if (!w || !h) return null;
  if (vp8x >= 0) chunks[vp8x][8] &= ~0x0c;                            // the EXIF and XMP flags off
  const body = chunks.reduce((n, c) => n + c.length, 0);
  const out = new Uint8Array(12 + body);
  out.set(b.subarray(0, 12), 0);
  const riff = 4 + body;
  out[4] = riff & 255; out[5] = (riff >>> 8) & 255; out[6] = (riff >>> 16) & 255; out[7] = (riff >>> 24) & 255;
  let o = 12;
  for (const c of chunks) { out.set(c, o); o += c.length; }
  return { bytes: out, w, h };
}

/* ---- the AI check ---- */
const PROMPT = "You check pictures that teachers and other people upload to a family-friendly quiz website. " +
  "Answer with exactly one word. SEXUAL: pornographic or sexually explicit, or a photograph of a naked person. " +
  "FLAG: anything a teacher might think twice about: nudity in a painting or sculpture, blood, injury, violence, weapons in use, " +
  "a hate symbol, drugs. SAFE: everything else. Answer SAFE, FLAG or SEXUAL.";
function b64(bytes) {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s);
}
/* what a model said, as one of the three words: the reply's text wherever the model put it (response as text or as an
   object, OpenAI-style choices); then its first word, or the one word of the three in a reply of at most three words, so
   "**SAFE**", "Safe." or "Label: SAFE" count, and "I think this is SEXUAL content" does not: only a clear word refuses a
   picture (9 Nov 2026: before, only a reply that began with the word counted). -> "safe" | "flag" | "sexual" | null */
export function replyText(r) {
  if (r == null) return "";
  if (typeof r === "string") return r;
  const c = r.choices && r.choices[0];
  const v = r.response !== undefined ? r.response : c && c.message ? c.message.content : c && c.text !== undefined ? c.text : r.result ? replyText(r.result) : r.output_text;
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.map((x) => (typeof x === "string" ? x : x && (x.text || x.content) || "")).join(" ");
  return v == null ? "" : JSON.stringify(v);
}
export function verdictOf(text) {
  const words = String(text || "").slice(0, 200).match(/[A-Za-z]+/g) || [];
  const isOne = (w) => /^(sexual|flag|safe)$/i.test(w);
  if (words.length && isOne(words[0])) return words[0].toLowerCase();
  const hits = words.filter(isOne).map((w) => w.toLowerCase());
  return words.length <= 3 && hits.length === 1 ? hits[0] : null;
}
function modelsOf(env) { return String(env.IMAGE_CHECK_MODEL || DEFAULT_MODEL).split(/[\s,]+/).filter(Boolean).slice(0, 2); }
/* one model asked about one picture. The instructions ride in the user's text next to the picture (some vision models of
   Workers AI do not take a system message together with an image); Llama 3.2 Vision takes the picture as `image`. */
async function askModel(env, model, uri) {
  const ask = PROMPT + " Label this picture.";
  const input = /llama-3\.2-11b-vision/.test(model)
    ? { messages: [{ role: "user", content: ask }], image: uri, max_tokens: 10, temperature: 0 }
    : { messages: [{ role: "user", content: [{ type: "text", text: ask }, { type: "image_url", image_url: { url: uri } }] }], max_tokens: 10, temperature: 0 };
  return env.AI.run(model, input);
}
/* -> "safe" | "flag" | "sexual" | "none" (not checked). IMAGE_CHECK_MODEL may name two models, the second asked only when
   the first gives no clear word (a model that cannot read the picture, or is busy). */
export async function aiCheck(env, bytes, type) {
  if (!env.AI) return "none";
  const uri = "data:" + (type === "webp" ? "image/webp" : "image/jpeg") + ";base64," + b64(bytes);
  for (const model of modelsOf(env)) {
    let r;
    try { r = await askModel(env, model, uri); } catch (x) { continue; }
    const v = verdictOf(replyText(r));
    if (v) return v;
  }
  return "none";
}
/* Khayyam's test of the check on Cloudflare (POST /admin/ai, 9 Nov 2026): each model asked about a small plain picture,
   with what it said or the error, and how long it took. Nothing is stored. */
export const PROBE_JPEG = "/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABgAGADASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMFBgT/xAAoEAABBAADBwUBAAAAAAAAAAAAAQIDBBESQQUGIVFhcYETIjEy8dH/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQUGAgQH/8QAIhEAAgIBAwQDAAAAAAAAAAAAAAECEQMEBSESFDGhUcHR/9oADAMBAAIRAxEAPwDXAAuCnAAAABDatQ067rFh+SNmGZ2CrhiuGnchtJWyUm3SJgQ1bUNyu2xXfnjfjldgqY4Lhr2JgmmrQaadMAAkgAAAAAAAENqwypWfPJ9WJj36ENpK2dRi5SUY+WLFqCpH6k8iMb11M5tzbsN3Z01WCGRc+X3Lw+HIvx4K25cmvWFmmdiq/CaNTkhAUGo3Cc7jDhGy0mw4oRUsruXpfpc7D27DS2dDVnhkTJm9ycflyr8eTR17UFuP1IJEe3pp3MGT07k1Gwk0LsObdHJyUafcJwqM+UNXsOKcXLE6l6f4bsENWwy3WZPH9Xpj26Exfppq0Y2UXGTjLygACTkAAAFFvRKra0EKLwe5VXx+l6UW9ESurQTInBjlRfP4eTW328qLPaenvcfV8/Tr2ZoAGXPogAABpd15VdWmiVeDHIqefwvSi3XiVtaaZU4PciJ4/S9NRor7eNnzvdunvcnT8/Sv2AAesrAAAAQ2q7LdZ8En1emHbqTAhpNUzqMnGSlHyjC3Kc1GwsMzeztHJzQ5zeWKsFuP0540e3roVEu68DnYxWHsTk5ub+FDm23InePlGy0m/YZRSz8P0Zo6KdOa9YSGFvd2jU5qXsW68DXYzWHvTk1Mv9LevVgqR+nBGjG9Ne4w7bkbvJwhq9+wxi1g5foVa7KlZkEf1YmHfqTAF8kkqRjZScpOUvLAAJOTGAAyJwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/9k=";   // 96x96: an apple on grass under a sky
export async function aiProbe(env) {
  const models = modelsOf(env);
  if (!env.AI) return { ai: false, models: models.map((model) => ({ model, ok: false, error: "no AI binding" })) };
  const uri = "data:image/jpeg;base64," + PROBE_JPEG, out = [];
  for (const model of models) {
    const t0 = Date.now();
    try {
      const r = await askModel(env, model, uri);
      const text = replyText(r).replace(/\s+/g, " ").trim().slice(0, 120);
      const v = verdictOf(text);
      out.push({ model, ok: !!v, word: v, said: text, ms: Date.now() - t0 });
    } catch (x) {
      out.push({ model, ok: false, error: String(x && x.message || x).slice(0, 200), ms: Date.now() - t0 });
    }
  }
  return { ai: true, works: out.some((x) => x.ok), models: out };
}

/* ---- the routes ---- */
/* POST /img/put, multipart: edit_key (or maker_key and game), file -> { id, url } */
export async function imgPut(env, req) {
  const len = req.headers.get("Content-Length");
  if (!len) return bad("length", 411);                                  // a browser always sends it with a form
  if (+len > IMG.maxBytes + 64 * 1024) return bad("image_big", 413);
  let form;
  try { form = await req.formData(); } catch (x) { return bad("body"); }
  const field = (k) => { const v = form.get(k); return typeof v === "string" ? v : undefined; };
  const x = await gameForEditor(env, { edit_key: field("edit_key"), maker_key: field("maker_key"), game: field("game") });
  if (!x) return wrongKey(req);
  const g = x.game, m = x.maker;
  if (!m || m.blocked) return bad("blocked", 403);
  const file = form.get("file");
  if (!file || typeof file === "string" || typeof file.arrayBuffer !== "function") return bad("image_type");
  if (file.size > IMG.maxBytes) return bad("image_big", 413);
  const raw = new Uint8Array(await file.arrayBuffer());
  if (raw.length > IMG.maxBytes) return bad("image_big", 413);
  const type = sniff(raw);
  if (!type) return bad("image_type", 415);
  const c = type === "jpg" ? cleanJpeg(raw) : cleanWebp(raw);
  if (!c) return bad("image_type", 415);
  if (c.w > IMG.maxSide || c.h > IMG.maxSide) return bad("image_size", 413);
  const ng = await one(env, "SELECT COUNT(*) AS n FROM images WHERE game = ?", g.id);
  if (ng && ng.n >= IMG.perGame) return bad("image_full", 409, { per: "game" });
  const nm = await one(env, "SELECT COUNT(*) AS n FROM images WHERE maker = ?", m.slug);
  if (nm && nm.n >= IMG.perMaker) return bad("image_full", 409, { per: "maker" });
  if (!brake("img_put", req, BRAKE.imgPut)) return bad("later", 429);
  if (!(await capOk(env, "i", IMG.aDay))) return bad("later", 429);
  const verdict = await aiCheck(env, c.bytes, type);
  if (verdict === "sexual") return bad("image_refused", 422);
  const id = randomB32(12) + "." + type, key = g.id + "/" + id, url = imgUrl(env, g.id, id);
  await env.DB.batch([
    st(env, "INSERT INTO images (id, maker, game, key, bytes, made, verdict) VALUES (?, ?, ?, ?, ?, ?, ?)", id, m.slug, g.id, key, c.bytes.length, clock(), verdict),
    queueRow(env, "image", { maker: m.slug, game: g.id, image: url, text: "check: " + (verdict === "none" ? "not checked" : verdict) }),
  ]);
  try {
    await env.IMG.put(key, c.bytes, { httpMetadata: { contentType: type === "webp" ? "image/webp" : "image/jpeg", cacheControl: "public, max-age=3600" } });
  } catch (e) {
    await run(env, "DELETE FROM images WHERE id = ?", id);
    return bad("busy", 503);
  }
  return json({ ok: true, id, url, w: c.w, h: c.h, bytes: c.bytes.length, held: false });   // held: old editors read it; never true now
}

/* GET /i/<maker>/<game>/<id> (F, 8 Nov 2026): a picture, only while its game is public. A hidden, blocked or deleted game's
   pictures answer 410 at once; a removed one 404. An hour in a browser's cache, no longer. */
export async function imgGet(env, req, gameId, id) {
  if (!brake("img_get", req, BRAKE.imgGet, 6e5)) return bad("later", 429);
  if (!IMAGE_ID.test(id)) return bad("not_found", 404);
  const g = await one(env, "SELECT * FROM games WHERE id = ?", gameId);
  const m = g ? await one(env, "SELECT * FROM makers WHERE slug = ?", g.maker) : null;
  if (!g || g.hidden || !m || m.blocked) return bad("gone", 410);
  const im = await one(env, "SELECT key, verdict FROM images WHERE id = ? AND game = ?", id, g.id);
  if (!im || !shown(im.verdict) || !env.IMG) return bad("not_found", 404);
  const obj = await env.IMG.get(im.key);
  if (!obj) return bad("not_found", 404);
  const h = new Headers({ "Content-Type": id.endsWith(".webp") ? "image/webp" : "image/jpeg", "Cache-Control": "public, max-age=3600",
    "X-Content-Type-Options": "nosniff", "Cross-Origin-Resource-Policy": "cross-origin", "Content-Security-Policy": "default-src 'none'; sandbox",
    "Access-Control-Allow-Origin": "*" });   // a share card on either site may draw it into a canvas
  if (obj.httpEtag) h.set("ETag", obj.httpEtag);
  return new Response(req.method === "HEAD" ? null : obj.body, { status: 200, headers: h });
}

/* POST /img/del { edit_key (or maker_key and game), id }: an image no item and no cover uses */
export async function imgDel(env, req, b) {
  const x = await gameForEditor(env, b);
  if (!x) return wrongKey(req);
  if (typeof b.id !== "string" || !IMAGE_ID.test(b.id)) return bad("image");
  const im = await one(env, "SELECT * FROM images WHERE id = ? AND game = ?", b.id, x.game.id);
  if (!im) return bad("image", 404);
  const used = await one(env, "SELECT 1 AS k FROM items WHERE game = ? AND image = ?", x.game.id, b.id);
  if (used || x.game.cover === b.id) return bad("image_used", 409);
  await run(env, "DELETE FROM images WHERE id = ?", b.id);
  try { await env.IMG.delete(im.key); } catch (e) { /* the row is gone; the object will not be served by any page */ }
  return json({ ok: true });
}
