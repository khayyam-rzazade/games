/* Logicers Studio — the pages (Chat A, 8 Nov 2026). Every page is one shell, studio/index.html (chat B), which reads
   its path and calls the API. For a maker's page and a game's page the Worker writes the title, a one-line description,
   the picture and the oEmbed link into the shell's head, so a shared link shows "History a day, by Anna Rossi" in
   WhatsApp, on Facebook, in Moodle. Whatever <title>, description, og:, twitter:, canonical, robots and oEmbed tags the
   shell carries are replaced; everything else of it is served as it is.
     /                               the directory (the shell untouched)
     /new/  /edit/                   the editor (never in a frame, never indexed)
     /terms/  /admin/                their own page when the folder has one (studio/terms/, studio/admin/), else the shell
     /<maker>/                       a maker's page                    /c/<CODE>   -> 302 to its game
     /<maker>/<game>/  .../about/    a game, its About page
     /<maker>/<game>/embed/          the slim layout for other sites' frames (any site may frame it)
     /<maker>/<game>/edit/           that game's editor (never framed, never indexed; the key stays in the #fragment)
   An unknown maker or game: the shell with 404; a hidden one: the shell with 410 (the page says "not available"). */
import { gameById, gameByCode, makerBySlug, publicState, isListed, one, shownCover } from "./db.js";
import { slugOk, codeOk, imgUrl, brake } from "./util.js";
import { RESERVED } from "./makers.js";

/* the words of the head, by the game's (or the maker's) language: shown only in link previews. Chat E: please check them. */
export const HEAD_WORDS = {
  en: { by: (t, m) => t + ", by " + m, daily: (m) => "A daily game by " + m, open: (m) => "A game by " + m, maker: (m) => "Games by " + m },
  es: { by: (t, m) => t + ", de " + m, daily: (m) => "Un juego diario de " + m, open: (m) => "Un juego de " + m, maker: (m) => "Juegos de " + m },
  fr: { by: (t, m) => t + ", par " + m, daily: (m) => "Un jeu quotidien de " + m, open: (m) => "Un jeu de " + m, maker: (m) => "Les jeux de " + m },
  it: { by: (t, m) => t + ", di " + m, daily: (m) => "Un gioco quotidiano di " + m, open: (m) => "Un gioco di " + m, maker: (m) => "I giochi di " + m },
  pt: { by: (t, m) => t + ", de " + m, daily: (m) => "Um jogo diário de " + m, open: (m) => "Um jogo de " + m, maker: (m) => "Jogos de " + m },
  tr: { by: (t, m) => t + ", " + m + " tarafından", daily: (m) => m + " tarafından hazırlanan günlük oyun", open: (m) => m + " tarafından hazırlanan bir oyun", maker: (m) => m + " tarafından hazırlanan oyunlar" },
};
const W = (lang) => HEAD_WORDS[lang] || HEAD_WORDS.en;
export const titleBy = (lang, title, maker) => W(lang).by(title, maker);
const OG_IMAGE = "https://logicers.com/assets/img/og.png";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export const FALLBACK_SHELL = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<title>Logicers</title>\n</head>\n<body>\n<script src="/studio.js" defer></script>\n</body>\n</html>\n';

/* the head written into the shell: old tags of the same kinds out, ours in just before </head> */
export function writeHead(html, h) {
  let s = html
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>\s*/gi, "")
    .replace(/<meta\b[^>]*\b(?:property|name)\s*=\s*["'](?:og:[^"']*|twitter:[^"']*|description|robots)["'][^>]*>\s*/gi, "")
    .replace(/<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*>\s*/gi, "")
    .replace(/<link\b[^>]*application\/json\+oembed[^>]*>\s*/gi, "");
  const tags = ["<title>" + esc(h.title) + "</title>"];
  if (h.desc) tags.push('<meta name="description" content="' + esc(h.desc) + '">');
  if (h.noindex) tags.push('<meta name="robots" content="noindex">');
  tags.push('<meta property="og:type" content="website">', '<meta property="og:site_name" content="Logicers">',
    '<meta property="og:title" content="' + esc(h.title) + '">');
  if (h.desc) tags.push('<meta property="og:description" content="' + esc(h.desc) + '">');
  if (h.url) tags.push('<meta property="og:url" content="' + esc(h.url) + '">', '<link rel="canonical" href="' + esc(h.url) + '">');
  tags.push('<meta property="og:image" content="' + esc(h.image || OG_IMAGE) + '">');
  if (!h.image) tags.push('<meta property="og:image:width" content="1200">', '<meta property="og:image:height" content="630">');
  tags.push('<meta name="twitter:card" content="summary_large_image">');
  if (h.oembed) tags.push('<link rel="alternate" type="application/json+oembed" href="' + esc(h.oembed) + '" title="' + esc(h.title) + '">');
  const block = tags.join("\n") + "\n";
  if (/<\/head>/i.test(s)) return s.replace(/<\/head>/i, () => block + "</head>");   // a function: "$&" in a title stays text (F)
  if (/<html\b[^>]*>/i.test(s)) return s.replace(/<html\b[^>]*>/i, (m) => m + "\n<head>\n" + block + "</head>");
  return "<head>\n" + block + "</head>\n" + s;
}

/* About as one plain line for a preview: no markdown, no links, at most 200 characters */
function plain(about) {
  const s = String(about || "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\*\*|__|[*_`#>]/g, "").replace(/https?:\/\/\S+/g, "").replace(/\s+/g, " ").trim();
  return s.length > 200 ? s.slice(0, 197).replace(/\s+\S*$/, "") + "…" : s;
}

async function shellHtml(env, url) {
  try {
    if (env.ASSETS) {
      let r = await env.ASSETS.fetch(new Request(new URL("/", url).href));
      if (r.status >= 300 && r.status < 400 && r.headers.get("Location")) r = await env.ASSETS.fetch(new Request(new URL(r.headers.get("Location"), url).href));
      if (r.ok) return await r.text();
    }
  } catch (x) { /* the fallback below */ }
  return FALLBACK_SHELL;
}
/* a file of the folder at this path (studio/terms/index.html ...), or null */
async function asset(env, url) {
  if (!env.ASSETS) return null;
  try {
    const r = await env.ASSETS.fetch(new Request(url.href));
    return r.ok ? r : null;
  } catch (x) { return null; }
}

function page(html, status, o) {
  const h = {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": o.cache || "public, max-age=60",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Security-Policy": "frame-ancestors " + (o.frame || "'self' https://logicers.com"),
  };
  if (o.noindex) h["X-Robots-Tag"] = "noindex";
  return new Response(html, { status, headers: h });
}
function withHeaders(r, o) {
  const out = new Response(r.body, r);
  out.headers.set("Content-Security-Policy", "frame-ancestors " + (o.frame || "'self' https://logicers.com"));
  out.headers.set("X-Content-Type-Options", "nosniff");
  if (o.noindex) out.headers.set("X-Robots-Tag", "noindex");
  if (o.cache) out.headers.set("Cache-Control", o.cache);
  return out;
}

export async function servePage(env, req, url) {
  const site = String(env.SITE || "https://by.logicers.com").replace(/\/+$/, "");
  const path = url.pathname;
  const segs = path.split("/").filter(Boolean);
  if (segs.length === 2 && segs[0] === "c") {
    const g = await gameByCode(env, segs[1].toUpperCase());
    const m = g ? await makerBySlug(env, g.maker) : null;
    if (g && publicState(g, m) === "ok") return Response.redirect(site + "/" + g.id + "/", 302);
    if (!brake("miss", req, 200, 6e5)) return new Response("later", { status: 429 });
    return page(writeHead(await shellHtml(env, url), { title: "Logicers", noindex: true }), 404, { noindex: true });
  }
  if (!path.endsWith("/") && !/\.[a-z0-9]{1,8}$/i.test(path)) return Response.redirect(url.origin + path + "/" + url.search, 301);
  if (segs.length === 0) return withHeaders(new Response(await shellHtml(env, url), { headers: { "Content-Type": "text/html; charset=utf-8" } }), { cache: "public, max-age=60" });
  const head = segs[0].toLowerCase();
  if (segs.length === 1 && ["new", "edit", "admin", "terms"].includes(head)) {
    const own = ["admin", "terms"].includes(head) ? await asset(env, url) : null;
    const o = head === "terms" ? { cache: "public, max-age=300" } : { frame: "'none'", noindex: true, cache: "no-store" };
    if (own) return withHeaders(own, o);
    return page(await shellHtml(env, url), 200, o);
  }
  const notFound = async () => page(writeHead(await shellHtml(env, url), { title: "Logicers", noindex: true }), 404, { noindex: true });
  if (!slugOk(head) || RESERVED.has(head) || segs.length > 3) return notFound();
  const m = await makerBySlug(env, head);
  if (!m) { if (!brake("miss", req, 200, 6e5)) return new Response("later", { status: 429 }); return notFound(); }
  const lang = m.lang;
  if (segs.length === 1) {
    if (m.blocked) return page(writeHead(await shellHtml(env, url), { title: "Logicers", noindex: true }), 410, { noindex: true });
    const listed = await one(env, "SELECT COUNT(*) AS n FROM games WHERE maker = ? AND listed = 1 AND listed_by_khayyam = 1 AND hidden = 0 AND n_items > 0", m.slug);
    const w = W(lang);
    return page(writeHead(await shellHtml(env, url), { title: w.maker(m.name), desc: w.maker(m.name), url: site + "/" + m.slug + "/", noindex: !(listed && listed.n) }), 200, {});
  }
  const sub = segs[2] ? segs[2].toLowerCase() : "";
  if (sub && sub !== "about" && sub !== "embed" && sub !== "edit") return notFound();
  const g = await gameById(env, m.slug + "/" + segs[1].toLowerCase());
  if (!g) { if (!brake("miss", req, 200, 6e5)) return new Response("later", { status: 429 }); return notFound(); }
  /* the editor of one game (its key in the #fragment, never sent here): the shell as it is, even for a hidden game */
  if (sub === "edit") return page(await shellHtml(env, url), 200, { frame: "'none'", noindex: true, cache: "no-store" });
  const embed = sub === "embed";
  if (publicState(g, m) !== "ok") return page(writeHead(await shellHtml(env, url), { title: "Logicers", noindex: true }), 410, { noindex: true, frame: embed ? "*" : undefined });
  const w = W(g.lang), gurl = site + "/" + g.id + "/";
  const h = {
    title: w.by(g.title, m.name),
    desc: plain(g.about) || (g.mode === "open" ? w.open(m.name) : w.daily(m.name)),
    url: sub === "about" ? gurl + "about/" : gurl,
    image: await shownCover(env, g),
    oembed: site + "/oembed?url=" + encodeURIComponent(gurl) + "&format=json",
    noindex: embed || !isListed(g, m),
  };
  return page(writeHead(await shellHtml(env, url), h), 200, { frame: embed ? "*" : undefined, noindex: h.noindex });
}
