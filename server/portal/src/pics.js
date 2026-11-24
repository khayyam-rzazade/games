/* Play Logicers — a claimed game's logo (chat J, 20 Nov 2026, plan 2.20 stage 3). A maker sends one picture for a game from
   the maker's form; it waits for a look in the queue (kind "pic", filter Edits) and is shown once a key says yes.
     POST /api/maker/pic { key, game, data }   data: the picture as base64 (a data: address is fine). PNG, JPEG or WebP,
                                               at most 150 KB, each side 256 px at least and 4096 px at most, still (no
                                               animated PNG or WebP); the type and the size are read from the bytes (the
                                               file's name and the browser's word are never trusted). -> { state: "wait" }
                                               e: key | nogame | pic (with why: type | big | small | huge | animated | bad) | busy
     GET  /p/<game id>/<h>.<ext>               the picture shown (state "ok"): its own fixed type, nosniff, kept a year by
                                               a browser (the address changes with the bytes) and five minutes at the edge, so
                                               after Delete, Hide or "Take the logo off" the address stops answering within
                                               five minutes, as the game's page does (chat Q, 23 Nov 2026), never a page
   Stored in D1 (pics), not in a new store: a logo is small, there are few, and the Worker serves it from its own origin. */
import { json, bad, clock, brake } from "./util.js";
import { one, st, queueRow } from "./db.js";

export const PIC = { max: 150 * 1024, min: 256, huge: 4096 };
export const PIC_BODY = Math.ceil(PIC.max * 4 / 3) + 4096;            // the base64 and the rest of the JSON
const TYPES = { png: "image/png", jpg: "image/jpeg", webp: "image/webp" };

const u16be = (b, i) => (b[i] << 8) | b[i + 1];
const u32be = (b, i) => ((b[i] << 24) >>> 0) + (b[i + 1] << 16) + (b[i + 2] << 8) + b[i + 3];
const u16le = (b, i) => b[i] | (b[i + 1] << 8);
const u24le = (b, i) => b[i] | (b[i + 1] << 8) | (b[i + 2] << 16);
const ascii = (b, i, n) => String.fromCharCode(...b.subarray(i, i + n));

/* what the bytes are: { ext, type, w, h } or { e } */
export function picInfo(b) {
  if (!(b instanceof Uint8Array) || b.length < 32) return { e: "bad" };
  /* PNG: the signature, then IHDR (width, height); an acTL chunk before the image data is an animation */
  if (b[0] === 0x89 && ascii(b, 1, 3) === "PNG" && b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a) {
    if (ascii(b, 12, 4) !== "IHDR") return { e: "bad" };
    for (let i = 8; i + 8 <= b.length;) {
      const len = u32be(b, i), type = ascii(b, i + 4, 4);
      if (type === "acTL") return { e: "animated" };
      if (type === "IDAT" || type === "IEND") break;
      i += 12 + len;
    }
    return { ext: "png", type: TYPES.png, w: u32be(b, 16), h: u32be(b, 20) };
  }
  /* JPEG: walk the segments to the frame header (SOFn: height, then width) */
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) {
    for (let i = 2; i + 9 < b.length;) {
      if (b[i] !== 0xff) return { e: "bad" };
      const m = b[i + 1];
      if (m === 0xff) { i++; continue; }
      if (m === 0xd8 || m === 0x01 || (m >= 0xd0 && m <= 0xd7)) { i += 2; continue; }
      if (m === 0xda || m === 0xd9) return { e: "bad" };
      if ((m >= 0xc0 && m <= 0xc3) || (m >= 0xc5 && m <= 0xc7) || (m >= 0xc9 && m <= 0xcb) || (m >= 0xcd && m <= 0xcf)) {
        return { ext: "jpg", type: TYPES.jpg, w: u16be(b, i + 7), h: u16be(b, i + 5) };
      }
      i += 2 + u16be(b, i + 2);
    }
    return { e: "bad" };
  }
  /* WebP: RIFF....WEBP, then the first chunk: VP8 (lossy), VP8L (lossless) or VP8X (extended: the animation flag) */
  if (ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 4) === "WEBP") {
    const c = ascii(b, 12, 4);
    if (c === "VP8 " && b[23] === 0x9d && b[24] === 0x01 && b[25] === 0x2a) return { ext: "webp", type: TYPES.webp, w: u16le(b, 26) & 0x3fff, h: u16le(b, 28) & 0x3fff };
    if (c === "VP8L" && b[20] === 0x2f) {
      return { ext: "webp", type: TYPES.webp, w: 1 + (((b[22] & 0x3f) << 8) | b[21]), h: 1 + (((b[24] & 0x0f) << 10) | (b[23] << 2) | ((b[22] & 0xc0) >> 6)) };
    }
    if (c === "VP8X") {
      if (b[20] & 0x02) return { e: "animated" };
      return { ext: "webp", type: TYPES.webp, w: 1 + u24le(b, 24), h: 1 + u24le(b, 27) };
    }
    return { e: "bad" };
  }
  return { e: "type" };                                                // SVG, GIF and the rest: never
}

/* a picture's checks, in order: what it is, how heavy, how large */
export function picCheck(b) {
  if (b.length > PIC.max) return { e: "big" };
  const i = picInfo(b);
  if (i.e) return i;
  if (!i.w || !i.h) return { e: "bad" };
  if (Math.min(i.w, i.h) < PIC.min) return { e: "small" };
  if (Math.max(i.w, i.h) > PIC.huge) return { e: "huge" };
  return i;
}
function fromB64(s) {
  if (typeof s !== "string") return null;
  s = s.replace(/^data:[a-z/+.-]*;base64,/i, "").replace(/\s+/g, "");
  if (!s || s.length > PIC_BODY || !/^[A-Za-z0-9+/]+=*$/.test(s)) return null;
  try { const t = atob(s), b = new Uint8Array(t.length); for (let i = 0; i < t.length; i++) b[i] = t.charCodeAt(i); return b; } catch (e) { return null; }
}
export const bytesOf = (x) => (x instanceof Uint8Array ? x : x instanceof ArrayBuffer ? new Uint8Array(x) : Array.isArray(x) ? Uint8Array.from(x) : new Uint8Array(0));
export const picFile = (h, ext) => h + "." + ext;
export const extOf = (type) => Object.keys(TYPES).find((k) => TYPES[k] === type) || null;

/* POST /api/maker/pic: the maker (makerOf in claim.js, passed in so this file needs no claim.js) */
export async function makerPic(env, req, b, makerOr) {
  const m = await makerOr(env, req, b);
  if (m instanceof Response) return m;
  if (!brake("makerpic", req)) return bad("busy", 429);
  const g = typeof b.game === "string" && b.game.length <= 40 ? await one(env, "SELECT id, pic, source FROM games WHERE id = ? AND maker_id = ?", b.game, m.id) : null;
  if (!g || g.source === "logicers") return bad("nogame", 404);
  const bytes = fromB64(b.data);
  if (!bytes) return bad("pic", 400, { why: "bad" });
  const i = picCheck(bytes);
  if (i.e) return bad("pic", 400, { why: i.e });
  const h = [...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))].slice(0, 8).map((x) => x.toString(16).padStart(2, "0")).join("");
  if (g.pic === picFile(h, i.ext)) return json({ ok: true, state: "ok" });
  const now = clock();
  await env.DB.batch([
    st(env, "DELETE FROM pics WHERE game = ? AND state = 'wait'", g.id),
    st(env, "INSERT INTO pics (game, h, type, w, ht, size, data, state, made) VALUES (?, ?, ?, ?, ?, ?, ?, 'wait', ?) ON CONFLICT (game, h) DO UPDATE SET state = 'wait', made = excluded.made",
      g.id, h, i.type, i.w, i.h, bytes.length, bytes, now),
    st(env, "UPDATE queue SET done = ?, \"by\" = 'maker' WHERE game = ? AND kind = 'pic' AND done = 0", now, g.id),
    queueRow(env, "pic", g.id, `logo: ${i.w}×${i.h} ${i.ext.toUpperCase()}, ${Math.ceil(bytes.length / 1024)} KB`),
  ]);
  return json({ ok: true, state: "wait" });
}

/* GET /p/<id>/<h>.<ext>: only a picture that is shown */
export async function servePic(env, id, file) {
  const m = /^([0-9a-f]{16})\.(png|jpg|webp)$/.exec(file || "");
  if (!m || !/^[a-z0-9-]{1,40}$/.test(id || "")) return null;
  const p = await one(env, "SELECT p.type, p.data FROM pics p JOIN games g ON g.id = p.game AND g.pic = ? WHERE p.game = ? AND p.h = ? AND p.state = 'ok'", file, id, m[1]);
  if (!p || p.type !== TYPES[m[2]]) return null;
  return new Response(bytesOf(p.data), { headers: {
    "Content-Type": p.type, "X-Content-Type-Options": "nosniff", "Cache-Control": "public, max-age=31536000, immutable, s-maxage=300",
    "Content-Security-Policy": "default-src 'none'; sandbox", "Content-Disposition": "inline", "Cross-Origin-Resource-Policy": "same-site" } });
}
