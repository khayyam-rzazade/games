/* Logicers Studio — oEmbed (Chat A, 8 Nov 2026): a pasted link becomes the game, in WordPress and the many sites that
   read oEmbed. GET /oembed?url=...&format=json answers for
     https://by.logicers.com/<maker>/<game>/          (also .../about/ and .../embed/) -> the maker's game, slim
     https://logicers.com/[<lang>/]<daily game>/       -> our daily game, ?embed=1 (the slim layout chat C adds)
   The game pages point here with <link rel="alternate" type="application/json+oembed">. */
import { json, bad, brake, BRAKE } from "./util.js";
import { gameById, makerBySlug, publicState, shownCover } from "./db.js";
import { OUR_GAMES } from "./ourgames.js";
import { titleBy } from "./shell.js";

const TREES = ["es", "fr", "it", "pt", "tr"];
export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function frame(src, title, h) {
  return '<iframe src="' + esc(src) + '" width="100%" height="' + h + '" style="border:0;max-width:100%" loading="lazy" allow="clipboard-write" title="' + esc(title) + '"></iframe>';
}
function answer(o, maxw, maxh) {
  const h = maxh ? Math.max(200, Math.min(600, maxh)) : 600, w = maxw ? Math.max(200, Math.min(600, maxw)) : 600;
  return json(Object.assign({ version: "1.0", type: "rich", provider_name: "Logicers", provider_url: "https://logicers.com/", width: w, height: h, cache_age: 3600 },
    o, { html: frame(o.src, o.title, h) }, { src: undefined }), 200, { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=300" });
}

export async function oembed(env, req, url) {
  if (!brake("read", req, BRAKE.read, 6e5)) return bad("later", 429);
  const fmt = url.searchParams.get("format") || "json";
  if (fmt !== "json") return new Response("json only", { status: 501, headers: { "Access-Control-Allow-Origin": "*" } });
  const maxw = parseInt(url.searchParams.get("maxwidth") || "0", 10) || 0, maxh = parseInt(url.searchParams.get("maxheight") || "0", 10) || 0;
  let u;
  try { u = new URL(String(url.searchParams.get("url") || "")); } catch (x) { return none(); }
  if (u.protocol !== "https:" && u.protocol !== "http:") return none();
  const host = u.hostname.toLowerCase();
  const segs = u.pathname.split("/").filter(Boolean).map((s) => { try { return decodeURIComponent(s).toLowerCase(); } catch (x) { return ""; } });
  const site = String(env.SITE || "https://by.logicers.com").replace(/\/+$/, "");

  if (host === new URL(site).hostname) {
    if (segs.length < 2 || segs.length > 3 || (segs.length === 3 && !["about", "embed"].includes(segs[2]))) return none();
    const g = await gameById(env, segs[0] + "/" + segs[1]);
    if (!g) return none();
    const m = await makerBySlug(env, g.maker);
    if (publicState(g, m) !== "ok") return none();
    const page = site + "/" + g.id + "/";
    const cover = await shownCover(env, g);
    return answer({ title: titleBy(g.lang, g.title, m.name), author_name: m.name, author_url: site + "/" + m.slug + "/", src: page + "embed/",
      thumbnail_url: cover || "https://logicers.com/assets/img/og.png",
      thumbnail_width: cover ? undefined : 1200, thumbnail_height: cover ? undefined : 630 }, maxw, maxh);
  }
  if (host === "logicers.com" || host === "www.logicers.com") {
    let lang = "en", rest = segs;
    if (segs.length && TREES.includes(segs[0])) { lang = segs[0]; rest = segs.slice(1); }
    if (rest.length !== 1) return none();
    const names = OUR_GAMES[rest[0]], n = names && names[lang];
    if (!n) return none();
    const page = "https://logicers.com/" + (lang === "en" ? "" : lang + "/") + rest[0] + "/";
    return answer({ title: n.title, author_name: "Logicers", author_url: "https://logicers.com/", src: page + "?embed=1",
      thumbnail_url: "https://logicers.com/assets/img/og.png", thumbnail_width: 1200, thumbnail_height: 630 }, maxw, maxh);
  }
  return none();
}
function none() { return new Response(JSON.stringify({ ok: false, e: "nogame" }), { status: 404, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }); }
