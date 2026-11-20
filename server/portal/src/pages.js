/* Play Logicers — the pages' HTML (Chat A, 19 Nov 2026; markup for direction B, Gallery, by chat B, 19 Nov 2026). Every
   template is here, in one file. Clean semantic HTML with class names only: no inline style, no inline script (the CSP
   forbids both: plan 2.16). Two blocks of data ride in each page and are never run: <script type="application/ld+json">
   (search engines) and <script type="application/json" id="pl-data"> (portal.js reads the page's language, its words and
   ids). Words come from words/<lang>.json (words.js); the language names from langs.js; nothing here reads the database.
   The look is portal/a/portal.css (the canvas's bottom row, Theme light and dark); portal.js and admin.js do the rest.

   THE CLASSES (portal.css styles these; change the markup freely, keep this list true)
     page         <body class="pl pl-wall | pl-lang | pl-kind | pl-game | pl-about | pl-nf | pl-admin">
     header       .top  .top-wall (the wall)  .top-lang (a language page)  .top-sub (kind, game, About, 404: back + small name)
                  .brand-box  .brand-sm  .brand (h1 on the wall and a language page, else p)  .brand-a  .brand-play
                  ("Play", "Graj")  .brand-lang (the endonym, or "Logicers")  .brand-by ("by Logicers")  .brand-sub (the
                  wall's English line)  .back (the round back button)  .chip-lang .chip-lang-t .chip-g .chip-d
     today        .today (hidden while it would say 0)  .today-w (the words around the number)  .today-n (the number;
                  data-count="page" | "all")
     main         .main .main-wall .main-lang .main-kind .main-game .main-about .main-nf
     wall         .langs (ul)  .lang (li; data-lang, lang, dir; .lang-best: the device's language, set by portal.js)
                  .lang-a  .lang-name  .lang-n (its number of games)  .lang-g (the word "games")
     rows         .row  .row-mine (Yours: filled by portal.js; hidden until then)  .row-lg (From Logicers; .row-lg-en: the English
                  games where Logicers lacks the language, one line at every width)  .row-kind
                  .row-wanted  .row-same (a game page's "same kind")  .row-top  .row-h  .row-t  .row-more  .row-more-sep
                  .row-more-n  .tiles (ul)
     tiles        .tile (li; data-game, data-kind)  .t0 … .t11 (the ring colour, from the game's id)  .tile-new (New for 7 days)
                  .tile-one (place 1: the filled ring)  .tile-sold (a paid place 1, phase 3)  .tile-lg (a Logicers game: a
                  coin filled with ink)  .is-0 (li: nobody today; the coin shows its kind's icon large, never a 0)
                  .tile-a (the coin: a link to the game's own site, new tab, counted: one tap to play)  .tile-badge (the
                  word New)  .tile-chip (EN)  .tile-kind (the kind's icon, small)  .tile-zero (the kind's icon, large, at 0)
                  .tile-n (today; .n5 .n6 .n7: a long number, smaller)  .tile-name (under the coin: a link to the game's page;
                  on a Logicers tile the same link as the coin, out of the tab order)  .tile-star (button, aria-pressed)
                  .tile-tick (li: played today, set by portal.js, with .tile-tick-i)  .is-star (li: saved on this device)
                  .tile-mine (a Yours tile)
     wanted       .wanted (ul)  .wanted-k (button; data-kind)  .wanted-t
     kind page    .kind-h  .kind-ico  .kind-n  .tiles-all (the ul: Logicers' games of the kind first, then the kind's games,
                  KIND_MAX of them)  .btn-more (the rest, by portal.js: data-more, data-from)
     game page    .game (article; data-game)  .game-tile (the big coin: plays, as Play does)  .game-ico  .game-body  .game-head
                  .game-name  .game-meta  .game-kind-a  .game-dot  .game-maker  .game-line  .game-nums  .num .num-today
                  .num-all (each hidden while 0)  .num-w  .num-n (data-count="today" | "all")  .game-acts  .btn-play
                  .game-star  .row-lg-game (two Logicers tiles)  .game-foot  .btn-report  .yours-q  .mail (the address, plain
                  text)
     not found    .nf
     about        .about  .about-local (the one line in the page's language)  .about-h  .about-p  .mail
     footer       .foot  .btn-add  .foot-links  .foot-about  .foot-lg
     buttons      .btn  .btn-add  .btn-play  .btn-report  .btn-send  .btn-done  .btn-more  .ico (any icon)  .ico-flip (turns
                  round in a right-to-left page)
     sheets       dialog.sheet  .sheet-add  .sheet-report  .sheet-form (.is-sent once sent)  .sheet-grab  .sheet-h  .sheet-x
                  (close)  .fld  .fld-l  .fld-opt  .fld-link .fld-lang .fld-kind .fld-name .fld-email  .fld-two  .kinds (the
                  eight kind buttons)  .kind-opt  .kind-opt-t  .reasons  .reason-opt  .hp (the robots' field: out of sight and
                  out of reach)  .sheet-err (data-e="link" | "here" | "busy"; hidden until needed)  .sheet-ok (thanks; hidden)
     templates    template#tpl-tile (one tile, for the Yours row and the kind page's More)
     helpers      .vh (visually hidden, read by screen readers)
     admin        .admin .admin-top .admin-h .admin-key .admin-bar .admin-role .admin-remember .admin-lock .admin-filters
                  .admin-filter (data-filter) .admin-filter-n .admin-cards .admin-more .admin-msg  (the cards: admin.js)
   Icons: <svg><use href="/a/icons.svg?v=…#ID"> with the ids k-words k-numbers k-maps k-knowledge (a light bulb) k-music
   k-screen k-sport (a trophy) k-other (the kinds) and i-star (Save: a bookmark) i-plus i-globe i-close i-play i-flag i-more
   i-check i-down i-back.
   data- attributes portal.js reads: data-game, data-kind, data-count, data-count-label, data-hit (a link whose click sends
   /api/hit), data-open="sheet-add" | "sheet-report" (opens that dialog; with data-kind it sets the kind), data-close,
   data-star, data-lang, data-e, data-more, data-from, data-filter. */
import { LANGS, LANG, htmlLang, nameParts, pageName, byEndonym } from "./langs.js";
import { WORDS, wordsOf, word, num, aroundN, withN } from "./words.js";
import { KINDS } from "./db.js";
import { ring } from "./util.js";
import { lgEn } from "./logicers.js";

/* the static files under /a/, with the start of their SHA-256 as a stamp (npm run stamp writes this line; a test checks it) */
export const ASSET = { css: "/a/portal.css?v=ca425ef4b1", js: "/a/portal.js?v=797f659fdb", admin: "/a/admin.js?v=b82865c160", icons: "/a/icons.svg?v=dd720646ea", icon: "/a/icon.svg?v=adb3f8129b" };
/* how many tiles a row shows before More (the rest is on the kind page) */
export const ROW_MAX = 12;
/* how many tiles a kind page shows before its More button (portal.js asks /api/<lang>/games for the rest): full lines at
   every width (2, 3, 4, 5 and 6 to a line) */
export const KIND_MAX = 60;
export const CONTACT = "logicers.world@gmail.com";
/* the pages' security headers (2.16); the admin page adds Trusted Types (its policy is named "portal-admin") */
export const CSP = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'";
export const CSP_ADMIN = CSP + "; require-trusted-types-for 'script'; trusted-types portal-admin";

/* ---- text into HTML ---- */
export const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
/* data in a <script> block: nothing in it can close the block */
export const jsonIn = (o) => JSON.stringify(o).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
const icon = (id, cls) => `<svg class="ico${cls ? " " + cls : ""}" aria-hidden="true" focusable="false"><use href="${ASSET.icons}#${id}"></use></svg>`;
const T = (lang, key) => esc(word(lang, key));
/* a number's size class on a tile: the more digits, the smaller (portal.css; portal.js sets the same when it counts) */
export const numCls = (s) => { const n = String(s).replace(/\D/g, "").length; return n >= 7 ? " n7" : n === 6 ? " n6" : n === 5 ? " n5" : ""; };

/* ---- the document ---- */
function doc(o) {
  const lang = o.lang || "en", l = LANG.get(lang);
  const head = [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
    `<title>${esc(o.title)}</title>`,
    o.desc ? `<meta name="description" content="${esc(o.desc)}">` : "",
    o.canonical ? `<link rel="canonical" href="${esc(o.canonical)}">` : "",
    o.noindex ? `<meta name="robots" content="${o.noindex === true ? "noindex" : esc(o.noindex)}">` : "",
    '<meta name="color-scheme" content="light dark">',
    '<meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)">',
    '<meta name="theme-color" content="#0E1014" media="(prefers-color-scheme: dark)">',
    '<meta property="og:site_name" content="Play Logicers">',
    '<meta property="og:type" content="website">',
    `<meta property="og:title" content="${esc(o.title)}">`,
    o.desc ? `<meta property="og:description" content="${esc(o.desc)}">` : "",
    o.canonical ? `<meta property="og:url" content="${esc(o.canonical)}">` : "",
    '<meta name="twitter:card" content="summary">',
    `<link rel="icon" href="${ASSET.icon}" type="image/svg+xml">`,
    `<link rel="preload" href="/a/fonts/geologica-latin.v1.woff2" as="font" type="font/woff2" crossorigin>`,
    `<link rel="stylesheet" href="${ASSET.css}">`,
    `<script src="${o.script || ASSET.js}" defer></script>`,
    o.jsonld ? `<script type="application/ld+json">${jsonIn(o.jsonld)}</script>` : "",
  ].filter(Boolean).join("\n");
  return `<!doctype html>
<html lang="${esc(htmlLang(lang))}" dir="${l ? l.dir : "ltr"}">
<head>
${head}
</head>
<body class="pl ${esc(o.cls)}">
${o.body}
<script type="application/json" id="pl-data">${jsonIn(o.data || {})}</script>
</body>
</html>
`;
}
/* the words a page carries: the language's own over English, but a plural form ("players_today.one") only from the
   language's own file, never from English (words.js pluralKey does the same on the server) */
const PLURAL = /\.(zero|one|two|few|many)$/;
function pageWords(lang) {
  const own = WORDS[lang] || {}, w = wordsOf(lang), out = {};
  for (const k of Object.keys(w)) if (!PLURAL.test(k) || own[k] !== undefined) out[k] = w[k];
  return out;
}
/* what portal.js gets on every page */
function pageData(d, more) {
  return Object.assign({ lang: d.lang, site: d.site, page: d.page, words: pageWords(d.lang), contact: CONTACT, tag: htmlLang(d.lang) }, more || {});
}

/* ---- pieces ---- */
function brand(d, tag) {
  const [play, rest] = d.wall ? ["Play", "Logicers"] : nameParts(d.lang);
  const href = d.wall ? "/" : "/" + d.lang + "/";
  return `<${tag} class="brand"><a class="brand-a" href="${href}"><span class="brand-play">${esc(play)}</span> <span class="brand-lang">${esc(rest)}</span></a></${tag}>`;
}
/* "{n} players today": shown from 1, never as 0 (plan 2.8); portal.js shows it when the first player comes */
function todayLine(lang, n, which) {
  const [a, b] = aroundN(lang, "players_today", n);
  return `<p class="today"${n ? "" : " hidden"}><span class="today-w">${esc(a.trim())}</span><b class="today-n" data-count="${which}">${n ? esc(num(lang, n)) : ""}</b><span class="today-w">${esc(b.trim())}</span></p>`;
}
/* the wall: the name large, its one English line, today's players in every language */
function headerWall(d) {
  return `<header class="top top-wall">
<div class="brand-box">
${brand(d, "h1")}
<p class="brand-sub">Daily games of the world, by language</p>
</div>
${todayLine("en", d.today, "all")}
</header>`;
}
/* a language page: the name large, "by Logicers" small, today's players, the chip back to the wall */
function headerLang(d) {
  const l = LANG.get(d.lang);
  return `<header class="top top-lang">
<div class="brand-box">
${brand(d, "h1")}
<p class="brand-by">${T(d.lang, "by")}</p>
</div>
${todayLine(d.lang, d.page_today, "page")}
<a class="chip-lang" href="/">${icon("i-globe", "chip-g")}<span class="chip-lang-t">${esc(l.endonym)}</span>${icon("i-down", "chip-d")}</a>
</header>`;
}
/* a page below: the round back button, the name small at the end */
function headerSub(d) {
  const home = d.wall ? "/" : "/" + d.lang + "/", name = d.wall ? "Play Logicers" : pageName(d.lang);
  return `<header class="top top-sub">
<a class="back" href="${home}" aria-label="${esc(name)}">${icon("i-back", "ico-flip")}</a>
<div class="brand-box brand-sm">
${brand(d, "p")}
${d.wall ? "" : `<p class="brand-by">${T(d.lang, "by")}</p>`}
</div>
</header>`;
}
function about(d) { return d.wall || d.lang === "en" ? "/about/" : "/about/?l=" + d.lang; }
function footer(d) {
  const L = d.wall ? "en" : d.lang;
  const lg = d.wall ? `<a class="foot-lg" href="https://logicers.com/">${T("en", "by")}</a>` : `<a class="foot-lg" href="${esc(d.lgHome || "https://logicers.com/")}">logicers.com</a>`;
  return `<footer class="foot">
<button class="btn btn-add" type="button" data-open="sheet-add">${T(L, "add")}</button>
<nav class="foot-links"><a class="foot-about" href="${about(d)}">${T(L, "about")}</a>${lg}</nav>
</footer>`;
}

/* one tile. g: { id, name, kind, slug?, url, today, isNew, place, sold }, o: { lg, en }.
   The coin plays (chat H, 20 Nov 2026, plan 2.6): a link to the game's own site in a new tab, counted as Play is
   (data-hit); the name under it is its own link (44 px high) to the game's page. A Logicers game has no page here: its
   name is the same link as its coin, out of the tab order. With nobody today the coin shows its kind's icon large in its
   ring colour (.is-0), never a 0. */
export function tile(d, g, o) {
  o = o || {};
  const cls = ["tile", ring(g.id)];
  if (o.lg) cls.push("tile-lg");
  else {
    if (g.isNew) cls.push("tile-new");
    if (g.place === 1) cls.push("tile-one");
    if (g.sold) cls.push("tile-sold");
  }
  const today = g.today || 0, n = num(d.lang, today);
  if (!today) cls.push("is-0");
  const en = o.en ? ' lang="en"' : "";
  const play = `href="${esc(g.url)}" target="_blank" rel="noopener" data-hit`;
  return `<li class="${cls.join(" ")}" data-game="${esc(g.id)}" data-kind="${esc(g.kind)}"><a class="tile-a" ${play}>`
    + (!o.lg && g.isNew ? `<span class="tile-badge">${T(d.lang, "new")}</span>` : "")
    + (o.en ? `<span class="tile-chip" lang="en">${T(d.lang, "en_chip")}</span>` : "")
    + icon("k-" + g.kind, "tile-kind") + icon("k-" + g.kind, "tile-zero")
    + `<span class="tile-n${today ? numCls(n) : ""}" data-count="today" aria-hidden="true">${today ? esc(n) : ""}</span>`
    + `<span class="vh"><span class="tile-vn">${T(d.lang, "play")} <span${en}>${esc(g.name)}</span></span><span data-count-label="today">${today ? ", " + esc(withN(d.lang, "today_n", today)) : ""}</span></span>`
    + `</a>`
    + (o.lg ? `<a class="tile-name" ${play} tabindex="-1" aria-hidden="true"${en}>${esc(g.name)}</a>`
      : `<a class="tile-name" href="/${d.lang}/g/${esc(g.slug)}/"${en}>${esc(g.name)}</a>`)
    + `<button class="tile-star" type="button" aria-pressed="false" aria-label="${T(d.lang, "star")}" data-star="${esc(g.id)}">${icon("i-star")}</button></li>`;
}
function tplTile(d) {
  return `<template id="tpl-tile"><li class="tile" data-game="" data-kind=""><a class="tile-a" href="" target="_blank" rel="noopener" data-hit><span class="tile-badge" hidden>${T(d.lang, "new")}</span><span class="tile-chip" lang="en" hidden>${T(d.lang, "en_chip")}</span>${icon("k-other", "tile-kind")}${icon("k-other", "tile-zero")}<span class="tile-n" data-count="today" aria-hidden="true"></span><span class="vh"><span class="tile-vn">${T(d.lang, "play")} <span></span></span><span data-count-label="today"></span></span></a><a class="tile-name" href=""></a><button class="tile-star" type="button" aria-pressed="false" aria-label="${T(d.lang, "star")}" data-star="">${icon("i-star")}</button></li></template>`;
}
/* a row's head: its name, and More at the end */
function rowTop(id, title, more) {
  return `<div class="row-top"><h2 class="row-h" id="${id}"><span class="row-t">${title}</span></h2>${more || ""}</div>`;
}
function moreLink(d, href, n) {
  return `<a class="row-more" href="${esc(href)}">${T(d.lang, "more")}${n ? `<span class="row-more-sep" aria-hidden="true">·</span><span class="row-more-n">${esc(num(d.lang, n))}</span>` : ""}${icon("i-more", "ico-flip")}</a>`;
}
function rowMine(d) {
  return `<section class="row row-mine" id="row-mine" aria-labelledby="h-mine" hidden>
${rowTop("h-mine", T(d.lang, "mine"))}
<ul class="tiles" role="list"></ul>
</section>`;
}
function rowLg(d, games, id, cls) {
  const en = lgEn(d.lang);
  games = games || d.lgRow;
  if (!games.length) return "";
  id = id || "h-lg";
  return `<section class="row row-lg${en ? " row-lg-en" : ""}${cls ? " " + cls : ""}" aria-labelledby="${id}">
${rowTop(id, T(d.lang, "from_logicers"), moreLink(d, d.lgHome || "https://logicers.com/"))}
<ul class="tiles" role="list">
${games.map((g) => tile(d, g, { lg: true, en })).join("\n")}
</ul>
</section>`;
}
function rowKind(d, kind, games, max) {
  const shown = max ? games.slice(0, max) : games;
  const more = max && games.length > max ? moreLink(d, `/${d.lang}/${kind}/`, games.length) : "";
  return `<section class="row row-kind" id="k-${kind}" data-kind="${kind}" aria-labelledby="h-${kind}">
${rowTop("h-" + kind, T(d.lang, "cat." + kind), more)}
<ul class="tiles" role="list">
${shown.map((g) => tile(d, g)).join("\n")}
</ul>
</section>`;
}
function rowWanted(d, kinds) {
  if (!kinds.length) return "";
  return `<section class="row row-wanted" aria-labelledby="h-wanted">
${rowTop("h-wanted", T(d.lang, "wanted"))}
<ul class="wanted" role="list">
${kinds.map((k) => `<li><button class="wanted-k" type="button" data-open="sheet-add" data-kind="${k}">${icon("k-" + k)}<span class="wanted-t">${T(d.lang, "cat." + k)}</span></button></li>`).join("\n")}
</ul>
</section>`;
}
/* the kinds that have games, by how many they hold (ties in the fixed order of 2.7) */
export function kindOrder(byKind) {
  return KINDS.filter((k) => byKind[k].length).sort((a, b) => byKind[b].length - byKind[a].length || KINDS.indexOf(a) - KINDS.indexOf(b));
}

/* ---- the sheets ---- */
function sheetTop(L, id, title) {
  return `<span class="sheet-grab" aria-hidden="true"></span>
<h2 class="sheet-h" id="${id}">${title}</h2>
<button class="sheet-x" type="button" data-close aria-label="${T(L, "close")}">${icon("i-close")}</button>`;
}
function sheetAdd(d) {
  const L = d.wall ? "en" : d.lang;
  const langField = d.wall
    ? `<label class="fld fld-lang"><span class="fld-l">${T(L, "f.lang")}</span><select name="lang" required><option value=""></option>${byEndonym().map((l) => `<option value="${l.code}" lang="${esc(htmlLang(l.code))}">${esc(l.endonym)}</option>`).join("")}</select></label>`
    : `<input type="hidden" name="lang" value="${esc(L)}">`;
  return `<dialog class="sheet sheet-add" id="sheet-add" aria-labelledby="sheet-add-h">
<form class="sheet-form" method="post" action="/api/add" data-api="add" novalidate>
${sheetTop(L, "sheet-add-h", T(L, "add"))}
<label class="fld fld-link"><span class="fld-l">${T(L, "f.link")}</span><input name="url" type="url" inputmode="url" required maxlength="500" autocomplete="url" spellcheck="false" placeholder="https://"></label>
${langField}
<fieldset class="fld fld-kind"><legend class="fld-l">${T(L, "f.kind")}</legend><div class="kinds">
${KINDS.map((k) => `<label class="kind-opt"><input type="radio" name="kind" value="${k}" required>${icon("k-" + k)}<span class="kind-opt-t">${T(L, "cat." + k)}</span></label>`).join("\n")}
</div></fieldset>
<div class="fld-two">
<label class="fld fld-name"><span class="fld-l">${T(L, "f.name")} <span class="fld-opt">· ${T(L, "f.optional")}</span></span><input name="name" maxlength="60" autocomplete="name"></label>
<label class="fld fld-email"><span class="fld-l">${T(L, "f.email")} <span class="fld-opt">· ${T(L, "f.optional")}</span></span><input name="email" type="email" maxlength="120" autocomplete="email" spellcheck="false"></label>
</div>
<label class="hp" aria-hidden="true">Leave empty <input name="pl_x9" tabindex="-1" autocomplete="off" data-lpignore="true" data-1p-ignore data-bwignore></label>
<p class="sheet-err" data-e="link" role="alert" hidden>${T(L, "f.e_link")}</p>
<p class="sheet-err" data-e="here" role="alert" hidden>${T(L, "f.e_here")}</p>
<p class="sheet-err" data-e="busy" role="alert" hidden>${T(L, "f.e_busy")}</p>
<button class="btn btn-send" type="submit">${T(L, "f.send")}</button>
<p class="sheet-ok" role="status" hidden>${icon("i-check")}<span>${T(L, "f.thanks")}</span></p>
<button class="btn btn-done" type="button" data-close hidden>${T(L, "close")}</button>
</form>
</dialog>`;
}
export const REASONS = ["broken", "notdaily", "lang", "unsafe", "other"];
function sheetReport(d, g) {
  const L = d.lang;
  return `<dialog class="sheet sheet-report" id="sheet-report" aria-labelledby="sheet-report-h">
<form class="sheet-form" method="post" action="/api/report" data-api="report" data-game="${esc(g.id)}" novalidate>
${sheetTop(L, "sheet-report-h", T(L, "report"))}
<fieldset class="fld reasons"><legend class="vh">${T(L, "report")}</legend>
${REASONS.map((r) => `<label class="reason-opt"><input type="radio" name="reason" value="${r}" required><span>${T(L, "r." + r)}</span></label>`).join("\n")}
</fieldset>
<p class="sheet-err" data-e="busy" role="alert" hidden>${T(L, "f.e_busy")}</p>
<button class="btn btn-send" type="submit">${T(L, "f.send")}</button>
<p class="sheet-ok" role="status" hidden>${icon("i-check")}<span>${T(L, "r.thanks")}</span></p>
<button class="btn btn-done" type="button" data-close hidden>${T(L, "close")}</button>
</form>
</dialog>`;
}

/* ---- JSON-LD ---- */
const gameUrl = (d, g) => `${d.site}/${d.lang}/g/${g.slug}/`;
function itemList(name, items) {
  return { "@type": "ItemList", name, numberOfItems: items.length,
    itemListElement: items.map((x, i) => ({ "@type": "ListItem", position: i + 1, url: x.url, name: x.name })) };
}
const graph = (lists) => ({ "@context": "https://schema.org", "@graph": lists });
const langTile = (l) => `<li class="lang" data-lang="${l.code}" lang="${esc(htmlLang(l.code))}" dir="${l.dir}"><a class="lang-a" href="/${l.code}/"><span class="lang-name">${esc(l.endonym)}</span><span class="lang-n">${esc(num("en", l.games))}</span><span class="lang-g" lang="en">games</span></a></li>`;

/* ==== the pages. d: { site, lang, page, ... } as index.js gathers it ==== */

/* the wall "/" (English words; portal.js puts the device's language first) */
export function pageWall(d) {
  d = Object.assign({}, d, { lang: "en", wall: true, page: "wall" });
  const langs = d.langs.map((x) => Object.assign({}, x, LANG.get(x.code)));
  const body = `${headerWall(d)}
<main class="main main-wall">
<ul class="langs" role="list">
${langs.map(langTile).join("\n")}
</ul>
</main>
${footer(d)}
${sheetAdd(d)}`;
  return doc({ lang: "en", cls: "pl-wall", title: "Play Logicers", canonical: d.site + "/",
    desc: "The world's daily games, one page for each language: words, numbers, maps and more.",
    jsonld: graph([itemList("Play Logicers", langs.map((l) => ({ url: d.site + "/" + l.code + "/", name: pageName(l.code) })))]),
    body, data: pageData(d, { langs: langs.map((l) => l.code) }) });
}

/* a language's page "/<lang>/" */
export function pageLang(d) {
  d = Object.assign({}, d, { page: "lang" });
  const kinds = kindOrder(d.byKind);
  const wanted = KINDS.filter((k) => !d.byKind[k].length);
  const name = pageName(d.lang), endonym = LANG.get(d.lang).endonym;
  const body = `${headerLang(d)}
<main class="main main-lang">
${rowMine(d)}
${rowLg(d)}
${kinds.map((k) => rowKind(d, k, d.byKind[k], ROW_MAX)).join("\n")}
${rowWanted(d, wanted)}
</main>
${footer(d)}
${sheetAdd(d)}
${tplTile(d)}`;
  const lists = [itemList(word(d.lang, "from_logicers"), d.lgRow.map((g) => ({ url: g.url, name: g.name })))]
    .concat(kinds.map((k) => itemList(word(d.lang, "cat." + k), d.byKind[k].slice(0, ROW_MAX).map((g) => ({ url: gameUrl(d, g), name: g.name })))));
  return doc({ lang: d.lang, cls: "pl-lang", title: name + " · " + word(d.lang, "seo.daily"), canonical: d.site + "/" + d.lang + "/",
    desc: word(d.lang, "seo.desc").replace("{lang}", endonym), jsonld: graph(lists), body,
    data: pageData(d, { lgLang: d.lgLang }) });
}

/* one kind in a language "/<lang>/<kind>/": KIND_MAX tiles, then More (portal.js asks for the rest) */
export function pageKind(d) {
  d = Object.assign({}, d, { page: "kind" });
  const games = d.byKind[d.kind], shown = games.slice(0, KIND_MAX);
  const body = `${headerSub(d)}
<main class="main main-kind">
<h1 class="kind-h">${icon("k-" + d.kind, "kind-ico")}<span>${T(d.lang, "cat." + d.kind)}</span><span class="kind-n">${esc(num(d.lang, games.length + (lgEn(d.lang) ? 0 : (d.lgKind || []).length)))}</span></h1>
${rowMine(d)}
<ul class="tiles tiles-all" role="list" data-kind="${esc(d.kind)}">
${(d.lgKind || []).map((g) => tile(d, g, { lg: true, en: lgEn(d.lang) })).join("\n")}
${shown.map((g) => tile(d, g)).join("\n")}
</ul>
${games.length > KIND_MAX ? `<button class="btn btn-more" type="button" data-more="${esc(d.kind)}" data-from="${KIND_MAX}" hidden>${T(d.lang, "more")}</button>` : ""}
</main>
${footer(d)}
${sheetAdd(d)}
${tplTile(d)}`;
  const cat = word(d.lang, "cat." + d.kind), name = pageName(d.lang);
  return doc({ lang: d.lang, cls: "pl-kind", title: cat + " · " + word(d.lang, "seo.daily") + " · " + name,
    canonical: `${d.site}/${d.lang}/${d.kind}/`, desc: word(d.lang, "seo.desc").replace("{lang}", LANG.get(d.lang).endonym),
    jsonld: graph([itemList(cat, shown.map((g) => ({ url: gameUrl(d, g), name: g.name })))]), body,
    data: pageData(d, { kind: d.kind, lgLang: d.lgLang }) });
}

/* one game "/<lang>/g/<slug>/" */
function numBlock(L, key, n, which) {
  const [a, b] = aroundN(L, key, n);
  return `<span class="num num-${which}"${n ? "" : " hidden"}><span class="num-w">${esc(a.trim())}</span><b class="num-n" data-count="${which}">${n ? esc(num(L, n)) : ""}</b><span class="num-w">${esc(b.trim())}</span></span>`;
}
export function pageGame(d) {
  d = Object.assign({}, d, { page: "game" });
  const g = d.game, L = d.lang;
  const body = `${headerSub(d)}
<main class="main main-game">
<article class="game ${ring(g.id)}" data-game="${esc(g.id)}" data-kind="${esc(g.kind)}">
<a class="game-tile" href="${esc(g.url)}" target="_blank" rel="noopener" data-hit tabindex="-1" aria-hidden="true">${icon("k-" + g.kind, "game-ico")}</a>
<div class="game-body">
<div class="game-head">
<h1 class="game-name">${esc(g.name)}</h1>
<p class="game-meta"><a class="game-kind-a" href="/${L}/${esc(g.kind)}/">${T(L, "cat." + g.kind)}</a>${g.maker ? `<span class="game-dot" aria-hidden="true">·</span><span class="game-maker">${esc(g.maker)}</span>` : ""}</p>
</div>
${g.line ? `<p class="game-line">${esc(g.line)}</p>` : ""}
<p class="game-nums"${d.today || d.all ? "" : " hidden"}>${numBlock(L, "today_n", d.today, "today")} ${numBlock(L, "total_n", d.all, "all")}</p>
<div class="game-acts">
<a class="btn btn-play" href="${esc(g.url)}" target="_blank" rel="noopener" data-hit>${icon("i-play", "ico-flip")}<span>${T(L, "play")}</span></a>
<button class="tile-star game-star" type="button" aria-pressed="false" aria-label="${T(L, "star")}" data-star="${esc(g.id)}">${icon("i-star")}</button>
</div>
</div>
</article>
${rowLg(d, d.lgGame || [], "h-lg-game", "row-lg-game")}
${d.same.length ? `<section class="row row-same" aria-labelledby="h-same">
${rowTop("h-same", T(L, "cat." + g.kind), d.more ? moreLink(d, `/${L}/${g.kind}/`) : "")}
<ul class="tiles" role="list">
${d.same.map((x) => tile(d, x)).join("\n")}
</ul>
</section>` : ""}
<aside class="game-foot">
<p class="yours-q">${T(L, "yours_q")} <span class="mail">${esc(CONTACT)}</span></p>
<button class="btn btn-report" type="button" data-open="sheet-report">${icon("i-flag")}<span>${T(L, "report")}</span></button>
</aside>
</main>
${footer(d)}
${sheetAdd(d)}
${sheetReport(d, g)}
${tplTile(d)}`;
  const vg = { "@context": "https://schema.org", "@type": "VideoGame", name: g.name, url: g.url, inLanguage: htmlLang(L),
    genre: word(L, "cat." + g.kind), gamePlatform: "Web browser", mainEntityOfPage: gameUrl(d, g) };
  if (g.line) vg.description = g.line;
  if (g.maker) vg.author = { "@type": "Organization", name: g.maker };
  return doc({ lang: L, cls: "pl-game", title: g.name + " · " + pageName(L), canonical: gameUrl(d, g), noindex: "noindex, follow",
    desc: g.line || word(L, "seo.desc").replace("{lang}", LANG.get(L).endonym), jsonld: vg, body,
    data: pageData(d, { game: g.id, url: g.url, lgLang: d.lgLang }) });
}

/* About "/about/" (English; with ?l=<code> one line on top in that language) */
export function pageAbout(d) {
  d = Object.assign({}, d, { page: "about", wall: true, lang: "en" });
  const local = d.local && d.local !== "en" ? `<p class="about-local" lang="${esc(htmlLang(d.local))}" dir="${LANG.get(d.local).dir}">${T(d.local, "about_en")}</p>\n` : "";
  const p = (s) => `<p class="about-p">${s}</p>`, h = (s) => `<h2 class="about-h">${s}</h2>`;
  const body = `${headerSub(d)}
<main class="main main-about">
<article class="about">
${local}<h1 class="about-h">About Play Logicers</h1>
${p("Play Logicers is a shelf of the world's daily games, one page for each language. Each page shows the daily games that exist in that language, sorted by kind: words, numbers, maps, knowledge, music, screen, sport and other. Logicers' own games are in the first row. Play Logicers is part of Logicers.")}
${h("How games get here")}
${p("Anyone can add a game with its link. A machine looks at the page first. Every week, Claude (an AI made by Anthropic) opens the new games, plays a little and decides: on the list, not on the list, or left for Khayyam, who makes Logicers. A game must be new every day, work on a phone, be in the language of its page, need no sign-up to play, and have nothing adult, gambling, hateful or tricky in it. The words under a game are ours, never copied from its site. Part of the starting list comes from Wordles of the World, which is in the public domain (CC0).")}
${h("What the numbers count")}
${p("Each game shows how many people went to play it from Play Logicers today and in all, and each page shows how many people opened it today. A day is the world's day, from midnight to midnight UTC. Each device counts once a day for each game and each page.")}
${h("What we keep")}
${p("Nothing about you. No cookies, no accounts. Your device makes one random number and keeps it; it is sent with a count only so the same device is counted once a day. We keep a scrambled form of it for that day only, and delete it every night. We never keep your IP address: for one day we keep a scrambled form of it, only to stop fake counts, and delete it every night. We keep the counts by game, day and country.")}
${p("When you add a game, we keep its link, and your name and email if you give them; only Khayyam sees your email. We keep them while the game is on the list, so we can tell its maker the numbers, and delete them 90 days after a game is turned down or taken off. A report keeps its reason and the day.")}
${h("Your game")}
${p(`To have a game changed or taken off, write to <span class="mail">${esc(CONTACT)}</span>. It goes within days. Makers never need to do anything to be listed, and nothing is asked of them.`)}
</article>
</main>
${footer(d)}
${sheetAdd(d)}`;
  return doc({ lang: "en", cls: "pl-about", title: "About · Play Logicers", canonical: d.site + "/about/",
    desc: "What Play Logicers is, how games get on it, what the numbers count and what it keeps.", body, data: pageData(d) });
}

/* nothing here (404): in a language, with its rows under the line; else the wall's languages */
export function pageNotFound(d) {
  d = Object.assign({}, d, { page: "nf" });
  if (!d.lang || !d.byKind) {
    const w = Object.assign({}, d, { lang: "en", wall: true });
    const body = `${headerSub(w)}
<main class="main main-nf">
<p class="nf">${T("en", "nf")}</p>
<ul class="langs" role="list">
${(d.langs || []).slice().sort((a, b) => b.games - a.games).map((x) => langTile(Object.assign({}, LANG.get(x.code), { games: x.games }))).join("\n")}
</ul>
</main>
${footer(w)}
${sheetAdd(w)}`;
    return doc({ lang: "en", cls: "pl-nf", title: word("en", "nf") + " · Play Logicers", noindex: true, body, data: pageData(w) });
  }
  const kinds = kindOrder(d.byKind);
  const body = `${headerSub(d)}
<main class="main main-nf">
<p class="nf">${T(d.lang, "nf")}</p>
${rowLg(d)}
${kinds.map((k) => rowKind(d, k, d.byKind[k], ROW_MAX)).join("\n")}
</main>
${footer(d)}
${sheetAdd(d)}`;
  return doc({ lang: d.lang, cls: "pl-nf", title: word(d.lang, "nf") + " · " + pageName(d.lang), noindex: true, body, data: pageData(d, { lgLang: d.lgLang }) });
}

/* the queue "/admin/" (English; admin.js does the rest) */
export function pageAdmin(d) {
  d = Object.assign({}, d, { lang: "en", page: "admin" });
  const body = `<main class="admin" id="admin">
<header class="admin-top">
<p class="brand"><span class="brand-play">Play</span> <span class="brand-lang">Logicers</span></p>
<h1 class="admin-h">Queue</h1>
</header>
<form class="admin-key" id="admin-key" autocomplete="off">
<label class="fld"><span class="fld-l">Key</span><input name="key" type="password" autocomplete="off" spellcheck="false" required></label>
<button class="btn btn-send" type="submit">Open</button>
<p class="admin-msg" role="alert" hidden></p>
</form>
<div class="admin-bar" hidden>
<span class="admin-role"></span>
<label class="admin-remember" hidden><input name="remember" type="checkbox"> Remember on this computer</label>
<button class="btn admin-lock" type="button">Lock</button>
</div>
<nav class="admin-filters" aria-label="Filters" hidden>
${[["todo", "To do"], ["left", "Left for Khayyam"], ["reports", "Reports"], ["dead", "Dead links"], ["all", "All"]].map(([f, t]) => `<button class="admin-filter" type="button" data-filter="${f}" aria-pressed="false">${t}<span class="admin-filter-n"></span></button>`).join("\n")}
</nav>
<section class="admin-cards" id="admin-cards" aria-live="polite"></section>
<button class="btn admin-more" type="button" hidden>More</button>
</main>`;
  return doc({ lang: "en", cls: "pl-admin", title: "Queue · Play Logicers", noindex: true, script: ASSET.admin, body,
    data: { lang: "en", site: d.site, page: "admin", kinds: KINDS, langs: LANGS.map((l) => ({ code: l.code, endonym: l.endonym })),
      reasons: ["notdaily", "notgame", "broken", "unsafe", "copy", "other"] } });
}
