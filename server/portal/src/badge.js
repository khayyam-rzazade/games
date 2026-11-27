/* Play Logicers: the optional badge (chat X, 23 Nov 2026; Khayyam: "an optional badge for makers who claimed: offered on
   their form, never asked"; plan 2.17 item 6). A maker who claimed a game finds it on the maker's form, under each of its
   listed games: a small picture and the HTML to copy. Nothing about it in the email or on the claim page.

   GET /b/<id>.svg (and ?d=1 for dark pages): our own SVG in the gallery look: a hairline frame, the game's coin (its ring
   colour and its kind's icon), "Play Español" (Polish "Graj po polsku") and "by Logicers" small, in the game's language.
   No script, no cookie, no outside font or picture, nothing counted; kept a day; 404 for a game that is not listed (and for
   Logicers' own games, which have no page here). While SHOW_NUMBERS is "0" it carries no number; with "1" the coin shows
   the game's players in all, as a coin on the pages shows a number.

   A picture on someone else's page loads no font, so "Play", the language's name and the coin's digits are drawn as
   outlines of Geologica (src/glyphs.js, made by scripts/glyphs.py). A name Geologica does not cover (日本語, 한국어, עברית,
   العربية, فارسی, ไทย, 简体中文, 繁體中文 ...) and the small "by Logicers" line are text in the visitor's own system font, as
   the pages show them; their width is estimated a little wide (est), so nothing is cut.

   The HTML is one link to the game's page on Play Logicers around the picture, with its width, height and alt. Right to
   left (he ar fa): the coin goes to the right and the words read from the right; R checks it in the browsers. */
import { GLYPHS, PLAY, NAMES, FIG } from "./glyphs.js";
import { LANG, nameParts, pageName, htmlLang, numTag } from "./langs.js";
import { word } from "./words.js";
import { ring, showNums, getLook } from "./util.js";
import { gameById } from "./db.js";

export const BADGE_H = 52;
const S1 = 17, S2 = 11, Y1 = 25, Y2 = 40, X0 = 56, END = 16, SPACE = 220;
const COIN = { x: 9, y: 9, s: 34, r: 10 };
/* "Play" as the key word (chat Inside, 27 Nov 2026; util.js LOOKS, pages.js): the colours of portal.css (--w0 and the ring words,
   light and dark), the triangle's width and the room it takes before "Play" */
const WARM = { light: "#C2462C", dark: "#FF5A36" };
const RING_W = { light: ["#C2462C", "#2C65F1", "#0E7E5B", "#C9327C", "#8550DB", "#A75D1A"], dark: ["#FF5A36", "#6F95FF", "#10B981", "#FF3D9A", "#A877FF", "#FF8A1F"] };
const TRI = 8, TRI_W = 13;
const SIMPLE = /^[\p{Script=Latin}\p{Script=Cyrillic}\p{Script=Greek}]{1,12}$/u;
const SYS = "system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans', 'Helvetica Neue', Arial, sans-serif";
/* the gallery's palette (portal.css :root, light and dark) and the twelve ring colours (--c0 … --c11) */
const LOOK = {
  light: { bg: "#FFFFFF", line: "#E3E6EB", ink: "#0B0C10", soft: "#5F6672", card: "#F6F7F9" },
  dark: { bg: "#0E1014", line: "#262B35", ink: "#F2F4F7", soft: "#9AA3B2", card: "#161920" },
};
const RINGS = ["#FF5A36", "#2E6BFF", "#10B981", "#E0A800", "#9B5CFF", "#FF3D9A", "#11B8D4", "#FF8A1F", "#8A94A6", "#E5243B", "#7FB800", "#2C8FB0"];
/* the eight kinds' icons, as in portal/a/icons.svg (a 24 grid, stroked): a Worker reads no files, so they are written here
   too, and test/test_x.mjs checks they are the same as the sprite's */
export const KIND_ICONS = {
  words: '<path d="M4 7h16M4 12h10M4 17h13"/>',
  numbers: '<path d="M9 3L7 21M17 3l-2 18M4 9h17M3 15h17"/>',
  maps: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  knowledge: '<path d="M9.5 17v-1c0-1-.5-1.8-1.3-2.4A6 6 0 1 1 15.8 13.6c-.8.6-1.3 1.4-1.3 2.4v1z"/><path d="M9.5 19.4h5M10.6 21.6h2.8"/>',
  music: '<path d="M9 18V6l10-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/>',
  screen: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8"/>',
  sport: '<path d="M7 3.5h10V9a5 5 0 0 1-10 0z"/><path d="M7 5.5H4.2v1.3a3.7 3.7 0 0 0 3.7 3.7M17 5.5h2.8v1.3a3.7 3.7 0 0 1-3.7 3.7M12 14v3.5M8.5 20.5h7M9.5 20.5c0-1.7 1.1-3 2.5-3s2.5 1.3 2.5 3"/>',
  other: '<circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/>',
};

const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const f2 = (n) => String(Math.round(n * 100) / 100);

/* A text's width in px in a system font, estimated a little wide (Inter, Roboto, Open Sans, Segoe-like and Noto metrics,
   measured on 23 Nov 2026; the widest of them, then 6% more). */
export function est(s, size, bold) {
  let w = 0;
  for (const ch of String(s)) {
    const c = ch.codePointAt(0);
    let k;
    if (/\s/.test(ch)) k = 0.28;
    else if ((c >= 0x1100 && c <= 0x11FF) || (c >= 0x2E80 && c <= 0x9FFF) || (c >= 0xAC00 && c <= 0xD7AF) || (c >= 0xF900 && c <= 0xFAFF) || (c >= 0xFF00 && c <= 0xFF60)) k = 1.0;
    else if ((c >= 0x0E31 && c <= 0x0E3A && c !== 0x0E32 && c !== 0x0E33) || (c >= 0x0E47 && c <= 0x0E4E) || (c >= 0x0300 && c <= 0x036F) || (c >= 0x064B && c <= 0x065F) || (c >= 0x05B0 && c <= 0x05C7)) k = 0;
    else if (c >= 0x0E00 && c <= 0x0E7F) k = 0.62;
    else if (c >= 0x0590 && c <= 0x05FF) k = 0.62;
    else if (c >= 0x0600 && c <= 0x06FF) k = 0.56;
    else if (/[A-ZÀ-ÞĀ-ſА-ЯЀ-ЏΑ-Ω]/.test(ch) && ch === ch.toUpperCase() && ch !== ch.toLowerCase()) k = /[MWМШЩЖЮΜΩ]/.test(ch) ? 0.9 : 0.72;
    else if (/[0-9]/.test(ch)) k = 0.62;
    else if (/[ilIjtfr.,:;'’!|ıі]/.test(ch)) k = 0.32;
    else if (/[mwшщжюμω]/.test(ch)) k = 0.88;
    else if (ch !== ch.toUpperCase() || /\p{L}/u.test(ch)) k = 0.6;
    else k = 0.4;
    w += k;
  }
  return w * size * (bold ? 1.05 : 1) * 1.06;
}

/* a drawn line: [[glyph, x, y?], ...] at (x, y), size px; returns the markup and the width */
function drawn(run, x, y, size, fill) {
  const s = size / 1000;
  const g = run[1].map(([id, gx, gy]) => `<path transform="translate(${gx}${gy ? " " + gy : ""})" d="${GLYPHS[id]}"/>`).join("");
  return { svg: `<g transform="translate(${f2(x)} ${f2(y)}) scale(${s})" fill="${fill}">${g}</g>`, w: run[0] * s };
}

/* the layout of a language's badge: the same for every game of that language (its width goes into the HTML) */
export function badgeLayout(lang, look) {
  look = look || getLook();
  const l = LANG.get(lang), [play, name] = nameParts(lang), by = word(lang, "by");
  const p = PLAY[play], n = NAMES[lang];
  const playW = p ? p[0] * S1 / 1000 : est(play, S1, true);
  const nameW = n ? n[0] * S1 / 1000 : est(name, S1, true);
  const sp = SPACE * S1 / 1000, tri = look === "tri" ? TRI_W : 0;
  const w1 = tri + playW + sp + nameW, w2 = est(by, S2, false);
  const W = Math.ceil(X0 + Math.max(w1, w2) + END);
  return { lang, rtl: !!(l && l.dir === "rtl"), play, name, by, p, n, playW, nameW, sp, tri, look, W, H: BADGE_H, tag: htmlLang(lang) };
}
/* "Play" in the badge, in the look of the pages: its drawn letters (Play, Graj: one outline each) or its text in the system font;
   x: where its left edge is */
function playSvg(L, x, c) {
  const col = c === LOOK.dark ? "dark" : "light", warm = WARM[col], rings = RING_W[col];
  if (L.p) {
    const s = S1 / 1000, glyphs = L.p[1];
    const path = ([id, gx, gy], fill) => `<path transform="translate(${gx}${gy ? " " + gy : ""})"${fill ? ` fill="${fill}"` : ""} d="${GLYPHS[id]}"/>`;
    if (L.look === "rings") {
      let k = -1;
      const parts = glyphs.map((gl) => { if (!gl[2]) k++; return path(gl, rings[Math.max(0, k) % rings.length]); }).join("");
      return `<g transform="translate(${f2(x)} ${Y1}) scale(${s})">${parts}</g>`;
    }
    const bold = L.look === "warm" ? 34 : 18;                         // heavier: the outlines drawn with a line of their own
    return `<g transform="translate(${f2(x)} ${Y1}) scale(${s})" fill="${warm}" stroke="${warm}" stroke-width="${bold}" stroke-linejoin="round">${glyphs.map((gl) => path(gl)).join("")}</g>`;
  }
  const weight = L.look === "warm" ? 700 : 600;
  const at = `<text x="${f2(x)}" y="${Y1}" font-family="${SYS}" font-weight="${weight}" font-size="${S1}"`;
  if (L.look === "rings" && SIMPLE.test(L.play.normalize("NFC"))) {
    return `${at} fill="${warm}">${[...L.play.normalize("NFC")].map((ch, i) => `<tspan fill="${rings[i % rings.length]}">${esc(ch)}</tspan>`).join("")}</text>`;
  }
  return `${at} fill="${warm}">${esc(L.play)}</text>`;
}

/* the coin's number (players in all), with the language's own figures; up to 9,999 whole, then short and whole (57K) */
function coinNumber(lang, n, ink) {
  const tag = numTag(lang);      // the language's own digits (langs.js; chat R): Arabic and Persian are drawn as text, Geologica has no such figures
  let s;
  try { s = n < 10000 ? new Intl.NumberFormat(tag).format(n) : new Intl.NumberFormat(tag, { notation: "compact", maximumFractionDigits: 0 }).format(n); } catch (e) { s = String(n); }
  const cx = COIN.x + COIN.s / 2, inner = COIN.s - 10;
  const chars = [...s];
  if (chars.every((c) => FIG[c])) {
    const adv = chars.reduce((a, c) => a + FIG[c][0], 0), size = Math.min(15, inner * 1000 / adv), sc = size / 1000;
    let x = 0;
    const parts = [];
    for (const c of chars) { for (const [id, gx, gy] of FIG[c][1]) parts.push(`<path transform="translate(${x + gx}${gy ? " " + gy : ""})" d="${GLYPHS[id]}"/>`); x += FIG[c][0]; }
    return { svg: `<g transform="translate(${f2(cx - adv * sc / 2)} ${f2(COIN.y + COIN.s / 2 + size * 0.35)}) scale(${sc})" fill="${ink}">${parts.join("")}</g>`, s };
  }
  const size = Math.min(14, inner / Math.max(1, est(s, 1, true)));
  return { svg: `<text x="${f2(cx)}" y="${f2(COIN.y + COIN.s / 2 + size * 0.36)}" text-anchor="middle" font-family="${SYS}" font-weight="500" font-size="${f2(size)}" fill="${ink}">${esc(s)}</text>`, s };
}

/* the picture. g: a listed game ({ id, lang, kind }); o: { dark, n (players in all, or 0 while the numbers are hidden) } */
export function badgeSvg(g, o) {
  o = o || {};
  const L = badgeLayout(g.lang), c = o.dark ? LOOK.dark : LOOK.light, r = RINGS[+ring(g.id).slice(1)];
  const { W, H, rtl } = L;
  const mx = (x, w) => (rtl ? W - x - (w || 0) : x);                 // a box at x (from the start), w wide, mirrored in rtl
  const coinX = mx(COIN.x, COIN.s);
  const icon = KIND_ICONS[g.kind] || KIND_ICONS.other;
  const num = o.n > 0 ? coinNumber(g.lang, o.n, c.ink) : null;
  /* in rtl the Words icon's lines hang from the right, as on the pages (portal.css, chat R) */
  const ic = num ? "" : `<svg x="${coinX + 7}" y="${COIN.y + 7}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${r}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${rtl && g.kind === "words" ? `<g transform="matrix(-1 0 0 1 24 0)">${icon}</g>` : icon}</svg>`;
  const numSvg = num ? (rtl ? num.svg.replace(/translate\(([\d.]+) /, (m, x) => `translate(${f2(+x + coinX - COIN.x)} `).replace(/ x="([\d.]+)"/, (m, x) => ` x="${f2(+x + coinX - COIN.x)}"`) : num.svg) : "";
  /* line 1: "Play" and the name; in rtl "Play" sits at the right and the name to its left */
  const parts = [];
  const playX = rtl ? W - X0 - L.tri - L.playW : X0 + L.tri;
  if (L.tri) {                                                      // the small play-triangle, pointing right in every direction (as the pages' Play)
    const tx = rtl ? W - X0 - TRI : X0;
    parts.push(`<path d="M${f2(tx)} ${Y1 - 11}L${f2(tx + TRI)} ${Y1 - 6}L${f2(tx)} ${Y1 - 1}z" fill="${o.dark ? WARM.dark : WARM.light}"/>`);
  }
  parts.push(playSvg(L, playX, c));
  const nameX = rtl ? W - X0 - L.tri - L.playW - L.sp - L.nameW : X0 + L.tri + L.playW + L.sp;
  parts.push(L.n ? drawn(L.n, nameX, Y1, S1, c.ink).svg
    : rtl ? `<text x="${f2(W - X0 - L.tri - L.playW - L.sp)}" y="${Y1}" direction="rtl" text-anchor="start" font-family="${SYS}" font-weight="600" font-size="${S1}" letter-spacing="-0.17" fill="${c.ink}">${esc(L.name)}</text>`
      : `<text x="${f2(nameX)}" y="${Y1}" font-family="${SYS}" font-weight="600" font-size="${S1}" letter-spacing="-0.17" fill="${c.ink}">${esc(L.name)}</text>`);
  /* line 2: "by Logicers", small, in the soft colour */
  parts.push(rtl ? `<text x="${W - X0}" y="${Y2}" direction="rtl" text-anchor="start" font-family="${SYS}" font-size="${S2}" letter-spacing="0.11" fill="${c.soft}">${esc(L.by)}</text>`
    : `<text x="${X0}" y="${Y2}" font-family="${SYS}" font-size="${S2}" letter-spacing="0.11" fill="${c.soft}">${esc(L.by)}</text>`);
  const label = pageName(g.lang) + " " + L.by;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}" lang="${esc(L.tag)}">`
    + `<title>${esc(label)}</title>`
    + `<rect x="0.75" y="0.75" width="${W - 1.5}" height="${H - 1.5}" rx="13.25" fill="${c.bg}" stroke="${c.line}" stroke-width="1.5"/>`
    + `<rect x="${coinX + 1}" y="${COIN.y + 1}" width="${COIN.s - 2}" height="${COIN.s - 2}" rx="${COIN.r}" fill="${c.card}" stroke="${r}" stroke-width="2"/>`
    + ic + numSvg + parts.join("") + `</svg>`;
}

/* what the maker's form shows and copies: its size and alt, the pictures for the form itself (pic, pic_d: from our own
   origin, as the form's CSP wants) and the HTML to copy (html, html_d: full addresses), light and dark */
export function badgeOut(site, g) {
  const L = badgeLayout(g.lang), page = `${site}/${g.lang}/g/${g.slug}/`, path = `/b/${g.id}.svg`;
  const alt = pageName(g.lang) + " " + L.by;
  const html = (s) => `<a href="${esc(page)}"><img src="${esc(site + s)}" width="${L.W}" height="${L.H}" alt="${esc(alt)}"></a>`;
  return { w: L.W, h: L.H, alt, pic: path, pic_d: path + "?d=1", html: html(path), html_d: html(path + "?d=1") };
}

/* GET /b/<id>.svg (?d=1): the picture of a listed game, kept a day by browsers and the edge (index.js cached(); the edge
   key keeps d and nothing else). Not counted, no cookie. A game that is not listed, or one of Logicers' own: 404. */
export const BADGE_CACHE = "public, max-age=86400, s-maxage=86400";
export async function badgeRoute(env, id, dark) {
  const g = /^[a-z0-9-]{1,40}$/.test(id) ? await gameById(env, id) : null;
  if (!g || g.status !== "listed" || g.source === "logicers" || !g.slug) {
    return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=300",
      "X-Robots-Tag": "noindex", "X-Content-Type-Options": "nosniff" } });
  }
  return new Response(badgeSvg(g, { dark, n: showNums(env) ? g.hits || 0 : 0 }), { headers: {
    "Content-Type": "image/svg+xml; charset=utf-8", "Cache-Control": BADGE_CACHE, "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'none'; sandbox", "Cross-Origin-Resource-Policy": "cross-origin", "X-Robots-Tag": "noindex" } });
}
