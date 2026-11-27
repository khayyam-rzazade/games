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
                  wall's English line)  .back (the round back button)  .chip-lang (a button: opens the languages) .chip-lang-t
                  .chip-g .chip-d
     today        .today (hidden while it would say 0)  .today-w (the words around the number)  .today-n (the number;
                  data-count="page" | "all")
     main         .main .main-wall .main-lang .main-kind .main-game .main-about .main-nf
     wall         .langs (ul)  .lang (li; data-lang, lang, dir; .lang-best: the device's language, set by portal.js)
                  .lang-a  .lang-name  .lang-n (its number of games)  .lang-g (the word "games")
     rows         .row  .row-mine (Yours: filled by portal.js; hidden until then)  .row-lg (From Logicers; .row-lg-en: the English
                  games where Logicers lacks the language, one line at every width)  .row-kind
                  .row-wanted  .row-same (a game page's "same kind")  .row-top  .row-h  .row-t  .row-hl .row-ta (a kind row's name: a
                  link to its kind page, chat X)  .row-more  .row-more-sep
                  .row-more-n  .tiles (ul)
     tiles        .tile (li; data-game, data-kind)  .t0 … .t11 (the ring colour, from the game's id)  .tile-new (New for 7 days)
                  .tile-one (place 1: the filled ring)  .tile-sold (a paid place 1, phase 3)  .tile-lg (a Logicers game: a
                  coin filled with ink)  .is-0 (li: nobody today; the coin shows its kind's icon large, never a 0)
                  .tile-a (the coin: a link to the game's page, in this tab, counting nothing (chat N, 22 Nov 2026); on a
                  Logicers tile the game itself, new tab, counted)  .tile-badge (the
                  word New)  .tile-chip (EN)  .tile-kind (the kind's icon, small)  .tile-zero (the kind's icon, large, at 0)
                  .tile-n (today; .n5 .n6 .n7: a long number, smaller)  .tile-name (under the coin: the same link as the
                  coin, out of the tab order)  .tile-vn .tile-vp .tile-vt (the coin's name for a screen reader: "Play"
                  only on a Logicers coin, then the game's name)  .tile-star (button, aria-pressed)
                  .tile-tick (li: played today, set by portal.js, with .tile-tick-i)  .is-star (li: saved on this device)
                  .tile-mine (a Yours tile)  .tile-crown (li: last week's game of the week, plan 2.20) .tile-crown-i (its crown,
                  top start of the coin, after New; a mark only, never a place)
     wanted       .wanted (ul)  .wanted-k (button; data-kind)  .wanted-t
     kind page    .kind-h  .kind-ico  .kind-n  .tiles-all (the ul: Logicers' games of the kind first, then the kind's games,
                  KIND_MAX of them)  .btn-more (the rest, by portal.js: data-more, data-from)
     game page    .game (article; data-game; .is-crown: the game of the week)  .game-tile (the big coin: plays, as Play does)  .game-crown
                  (its crown)  .game-gotw (the words "Game of the week", above the name)  .btn-vote (data-vote: the vote, shown by
                  portal.js once this device played the game this UTC week; aria-pressed once voted) .vote-i .vote-ok .vote-t
                  .game-ico  .game-body  .game-head
                  .game-name  .game-meta  .game-kind-a  .game-dot  .game-maker  .game-line  .game-nums  .num .num-today
                  .num-all (each hidden while 0)  .num-w  .num-n (data-count="today" | "all")  .game-acts  .btn-play
                  .game-star  .row-lg-game (two Logicers tiles)  .game-foot  .btn-report  .yours-q  .mail (the address, plain
                  text)
     not found    .nf
     about        .about  .about-local (the one line in the page's language)  .about-h  .about-p  .mail
     claim        (chat J, 20 Nov 2026, plan 2.20; in the game's language since chat N) .pl-claim .main-claim .claim (article; data-game, data-token)
                  .claim-h .claim-name .claim-p .claim-steps .claim-step .claim-step-h .claim-url .claim-code (the line, copyable)
                  .claim-line .btn-copy (data-copy: the id of what it copies) .claim-err (data-e) .claim-ok .claim-keybox .claim-key
                  .claim-other   the game page's foot: .yours-q-t (its "Your game?") .btn-claim (to /claim/?g=)
     maker form   (?l= or the browser's language) .pl-maker .main-maker .maker .maker-nokey .maker-keyform .maker-main .maker-namef .maker-games
                  .maker-card .maker-card-h .maker-msg .maker-forget (the cards: maker.js) .maker-pagelink
                  .maker-logo .maker-logo-h .maker-logo-row .maker-logo-view .maker-logo-img .maker-logo-side .maker-logo-state
                  .maker-logo-pick .maker-logo-file .maker-logo-send (stage 3: the logo)
                  .maker-badge .maker-badge-p .maker-badge-picks .maker-badge-pick (aria-pressed; .is-light .is-dark)
                  .maker-badge-copy .maker-badge-code (the optional badge under a listed game: chat X, 23 Nov 2026)
     maker page   (chat J) .pl-mk .main-mk .mk-head .mk-name .btn-edit (data-maker-slug | data-maker-game; shown by portal.js)
     numbers      (a claimed game's page) .nums .nums-days .nums-total .nums-svg .nums-bar .nums-axis .nums-where .nums-c
                  .nums-ci .nums-cn .nums-cv .nums-cb   the coins' logo: .tile-logo (img) .tile-logo-lg (svg) .game-logo
     footer       .foot  .btn-add  .foot-links  .foot-about  .foot-lg
     top bar      .top-acts (the buttons at the end of a language page's head)  .add-top (Add a game, filled, in every head; the words
                  show from 700 px)  .dice (a link to a random game, #dice; JS gives it its address; .dice-off: it gives way where
                  the head has search and four buttons would push the name onto another line, chat S)  .find-b (#find-b: the
                  magnifier, on a language page and its kind pages once the language has SEARCH_MIN games; .has-find on the head)
     Yours        .streak (#streak: a flame and the days in a row, from 1)  .run (#run: the next game of the run)  .run-done (#run-done)
                  .me-mark (#me-mark: Logicers' mark beside the flame, a link to My Logicers; chat M, 26 Nov 2026) .me-mark-i (the three
                  dots) .me-mark-n (the Logicer number, set by portal.js when the device has one) .me-mark-tight (the number left out
                  where it would take a line more) .me-mark-off (the mark gives way where even its dots would push Yours onto another line)   iframe.me-frame (the hidden bridge to My Logicers, made by portal.js)
     buttons      .btn  .btn-add  .btn-play  .btn-report  .btn-send  .btn-done  .btn-more  .ico (any icon)  .ico-flip (turns
                  round in a right-to-left page)
     sheets       dialog.sheet  .sheet-add  .sheet-report  .sheet-langs (the open languages: .sheet-box .lang-opts .lang-opt
                  .lang-opt-t; the page's own has aria-current="page")  .sheet-form (.is-sent once sent)  .sheet-grab  .sheet-h  .sheet-x
                  (close)  .fld  .fld-l  .fld-opt  .fld-link .fld-lang .fld-kind .fld-name .fld-email  .fld-two  .kinds (the
                  eight kind buttons)  .kind-opt  .kind-opt-t  .reasons  .reason-opt  .hp (the robots' field: out of sight and
                  out of reach)  .sheet-err (data-e="link" | "here" | "busy"; hidden until needed)  .sheet-here (the "here" one:
                  .sheet-here-t its words, .sheet-claim Claim for a listed game no maker has claimed; chat N)  .sheet-ok (thanks; hidden)
                  .sheet-find (search, chat S: .find-form .find-top .find-fld .find-i .find-q (the field) .find-tiles (the results,
                  built by portal.js from #tpl-tile) .find-nf .find-nf-t (nothing found, with Add a game))
     templates    template#tpl-tile (one tile, for the Yours row and the kind page's More)
     helpers      .vh (visually hidden, read by screen readers)
     admin        .admin .admin-top .admin-h .admin-key .admin-bar .admin-role .admin-remember .admin-lock .admin-filters
                  .admin-filter (data-filter) .admin-filter-n .admin-cards .admin-more .admin-msg  (the cards: admin.js)
   Icons: <svg><use href="/a/icons.svg?v=…#ID"> with the ids k-words k-numbers k-maps k-knowledge (a light bulb) k-music
   k-screen k-sport (a trophy) k-other (the kinds) and i-star (Save: a bookmark) i-plus i-globe i-close i-play i-flag i-more
   i-check i-down i-back i-dice (the random game) i-flame (the streak) i-crown (the game of the week) i-search (search).
   data- attributes portal.js reads: data-game, data-kind, data-count, data-count-label, data-hit (a link whose click sends
   /api/hit), data-open="sheet-add" | "sheet-report" | "sheet-langs" | "sheet-find" (opens that dialog; with data-kind it sets the kind), data-close,
   data-star, data-lang, data-e, data-more, data-from, data-filter, data-vote. */
import { LANGS, LANG, htmlLang, numTag, nameParts, pageName, byEndonym } from "./langs.js";
import { WORDS, wordsOf, word, num, aroundN, withN, fill, OWN_WORDS } from "./words.js";
import { KINDS, picUrl, lgLogo, NUM_DAYS, indexable, SEARCH_MIN, insideOf } from "./db.js";
import { ring, dayAdd, LOOKS, LOOK_DEFAULT, setLook, getLook } from "./util.js";
import { lgEn } from "./logicers.js";

/* the static files under /a/, with the start of their SHA-256 as a stamp (npm run stamp writes this line; a test checks it) */
export const ASSET = { css: "/a/portal.css?v=d0aeed6dc4", js: "/a/portal.js?v=631913293c", admin: "/a/admin.js?v=7f220fe019", icons: "/a/icons.svg?v=c337aa1e5b", icon: "/a/icon.svg?v=adb3f8129b", maker: "/a/maker.js?v=7691685761" };
/* how many tiles a row shows before More (the rest is on the kind page) */
export const ROW_MAX = 12;
/* how many tiles a kind page shows before its More button (portal.js asks /api/<lang>/games for the rest): full lines at
   every width (2, 3, 4, 5 and 6 to a line) */
export const KIND_MAX = 60;
export const CONTACT = "logicers.world@gmail.com";
/* the pages' security headers (2.16); the admin page adds Trusted Types (its policy is named "portal-admin") */
export const CSP = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'";
export const CSP_ADMIN = CSP + "; require-trusted-types-for 'script'; trusted-types portal-admin";
/* the public pages (the wall, a language, a kind, a game, a maker's page, About, the 404s) also let Cloudflare Web Analytics in
   (chat K, 20 Nov 2026): it is on for the zone, Cloudflare writes its beacon's <script> into every page on the way out, and
   the plain CSP blocked it. Its script comes from static.cloudflareinsights.com and reports to cloudflareinsights.com; no
   cookie. The queue, the claim pages and the maker's form keep the plain CSP above, so the beacon stays blocked there. */
export const CSP_PUBLIC = CSP.replace("script-src 'self'", "script-src 'self' https://static.cloudflareinsights.com").replace("connect-src 'self'", "connect-src 'self' https://cloudflareinsights.com");
/* My Logicers (chat M, 26 Nov 2026): a language's page, a kind page and a game page open the bridge to My Logicers on logicers.com
   in a hidden frame (portal.js; the bridge is portal/bridge.html, which GitHub Pages publishes there). Their CSP lets in that one
   frame and nothing else; every other page keeps CSP_PUBLIC, where no frame may load. A local run points BRIDGE elsewhere
   (wrangler dev --var BRIDGE:http://127.0.0.1:4197/portal/bridge.html; index.js bridgeOf). */
export const BRIDGE = "https://logicers.com/portal/bridge.html";
export const cspPlay = (bridge) => CSP_PUBLIC + "; frame-src " + (bridge || BRIDGE);
/* "Play" as the key word of every name (chat Inside, 27 Nov 2026; claude/play-here-27nov.md): three looks, one class each on <body>
   (play-warm, play-tri, play-rings), drawn in portal.css and in the badge (badge.js); util.js LOOKS says which is shown, by the word
   PLAY_LOOK in wrangler.jsonc.
     warm   "Play" heavier, in one warm ring colour (the coral of ring 0)
     tri    "Play" with a small filled play-triangle before it, in the same colour
     rings  "Play" in the ring colours, one letter each (a name in a script that joins or stacks its letters, Arabic, Hebrew,
            Thai, Devanagari, Bengali, Tamil, Georgian, Korean, Chinese and Japanese, takes the one warm colour whole: a letter's
            colour never splits a word's joins) */
export { LOOKS, LOOK_DEFAULT, setLook, getLook };
/* the letters of a word that may be coloured one by one: Latin, Cyrillic and Greek, whole characters (no mark of its own) */
const SIMPLE_WORD = /^[\p{Script=Latin}\p{Script=Cyrillic}\p{Script=Greek}]{1,12}$/u;
export const ringLetters = (word) => {
  const w = String(word || "").normalize("NFC");
  return SIMPLE_WORD.test(w) ? [...w].map((c, i) => `<span class="pc pc${i % 6}">${esc(c)}</span>`).join("") : esc(w);
};

/* The inside page (chat Inside, 27 Nov 2026; /<lang>/g/<slug>/play/) shows one game in a frame: its CSP lets in that game's origin
   and nothing else (a game that moved on its own site: the origin the look ended on too, db.js games.frame_at). The page loads
   no bridge frame. */
export const cspInside = (origins) => CSP_PUBLIC + "; frame-src " + origins.join(" ");
/* the sandbox of the frame: scripts and the game's own origin (its saved progress), forms, popups (they leave the sandbox, as a game's
   share or help page would), modals (alert, confirm). Never allow-top-navigation: a game cannot take the player off the page. */
export const SANDBOX = "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals";
export const FRAME_ALLOW = "fullscreen; autoplay; clipboard-write";
/* My Logicers' name and how Logicers writes a Logicer number, in the six languages Logicers has (me/lang/*.json: app.name and
   home.number without its "Logicer "); elsewhere My Logicers opens in English. Names of Logicers' own, not words of Play. */
const ME_NAME = { en: "My Logicers", it: "Il mio Logicers", tr: "Logicers’ım", es: "Mi Logicers", pt: "Meu Logicers", fr: "Mon Logicers" };
const ME_NUM = { en: "№{n}", it: "№{n}", tr: "№{n}", es: "n.º {n}", pt: "nº {n}", fr: "n° {n}" };
export function meOf(d) {
  const l = ME_NAME[d.lang] ? d.lang : "en";
  return { bridge: d.bridge || BRIDGE, href: "https://logicers.com/me/?lang=" + l, name: ME_NAME[l], nf: ME_NUM[l], lang: l };
}
/* Logicers' mark: its three dots, as assets/img/favicon.svg draws them (fill is an attribute, not a style: the CSP allows it) */
const MARK = '<svg class="me-mark-i" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><circle cx="32" cy="16.5" r="11.5" fill="#3558DC"/><circle cx="14.5" cy="47" r="11.5" fill="#E0512F"/><circle cx="49.5" cy="47" r="11.5" fill="#11998B"/></svg>';

/* ---- text into HTML ---- */
export const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
/* data in a <script> block: nothing in it can close the block */
export const jsonIn = (o) => JSON.stringify(o).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
const icon = (id, cls) => `<svg class="ico${cls ? " " + cls : ""}" aria-hidden="true" focusable="false"><use href="${ASSET.icons}#${id}"></use></svg>`;
const T = (lang, key) => esc(word(lang, key));
/* a word with marks filled by markup (each value given here is markup already; the word itself is escaped first) */
const TM = (lang, key, marks) => esc(word(lang, key)).replace(/\{([a-z]+)\}/g, (m, k) => (marks && Object.prototype.hasOwnProperty.call(marks, k) ? marks[k] : m));
/* a number's size class on a tile: the longer it is written, the smaller (portal.css; portal.js sets the same when it counts).
   Chat R: every character counts, its separators too ("1,234" and "١٬٢٣٤" are five), since a separator takes room and \D took
   Arabic and Persian digits for no digit at all; a 4-digit number was cut on a phone by 2 px. */
export const numCls = (s) => { const n = [...String(s)].length; return n >= 7 ? " n7" : n === 6 ? " n6" : n === 5 ? " n5" : ""; };

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
    o.image ? `<meta property="og:image" content="${esc(o.image)}">` : "",
    '<meta name="twitter:card" content="summary">',
    `<link rel="icon" href="${ASSET.icon}" type="image/svg+xml">`,
    `<link rel="preload" href="/a/fonts/geologica-latin.v1.woff2" as="font" type="font/woff2" crossorigin>`,
    `<link rel="stylesheet" href="${ASSET.css}">`,
    `<script src="${o.script || ASSET.js}" defer></script>`,
    o.script2 ? `<script src="${o.script2}" defer></script>` : "",
    o.jsonld ? `<script type="application/ld+json">${jsonIn(o.jsonld)}</script>` : "",
  ].filter(Boolean).join("\n");
  return `<!doctype html>
<html lang="${esc(htmlLang(lang))}" dir="${l ? l.dir : "ltr"}">
<head>
${head}
</head>
<body class="pl ${esc(o.cls)}${" play-" + getLook()}">
${o.body}
<script type="application/json" id="pl-data">${jsonIn(o.data || {})}</script>
</body>
</html>
`;
}
/* the words a page carries: the language's own over English, but a plural form ("players_today.one") only from the
   language's own file, never from English (words.js pluralKey does the same on the server) */
const PLURAL = /\.(zero|one|two|few|many)$/;
/* the words of the claim pages, the form and the email (claim., maker., mail.; chat N) only where a page asks for them (own) */
function pageWords(lang, own) {
  const mine = WORDS[lang] || {}, w = wordsOf(lang), out = {};
  for (const k of Object.keys(w)) if ((!PLURAL.test(k) || mine[k] !== undefined) && (!OWN_WORDS.test(k) || (own && own.test(k)))) out[k] = w[k];
  return out;
}
/* what portal.js gets on every page (and maker.js on the claim pages and the form: own names their words) */
function pageData(d, more, own) {
  return Object.assign({ lang: d.lang, site: d.site, page: d.page, words: pageWords(d.lang, own), contact: CONTACT, tag: htmlLang(d.lang), nt: numTag(d.lang), nums: d.nums === false ? 0 : 1 }, more || {});
}
/* The numbers are counted and, for now, not shown (Khayyam, 21 Nov 2026; util.js showNums; plan 2.8). A page whose data says
   nums: false is drawn as on a day with nobody: every "today", "in all" and "players today" it was given is 0, so each coin
   shows its picture, no line of players is written, and nothing on the page or in its source says how few came. A claimed
   game's own days and countries (d.numbers) stay, hidden, for the maker's device only (numbersBlock). The page's data tells
   portal.js (nums: 0), which then asks for no counts and turns no coin into a number after a tap. */
const QUIET = new Set(["today", "all", "page_today", "week"]);
/* top: only the page's own d.numbers (a claimed game's days and countries) is kept as it is. Chat X, 23 Nov 2026: a key named
   "numbers" was kept at every depth, and byKind.numbers (the kind Numbers) is one, so the Numbers row's coins kept their
   players while the numbers were hidden. */
function hush(x, top) {
  if (Array.isArray(x)) return x.map((y) => hush(y));
  if (!x || typeof x !== "object" || (Object.getPrototypeOf(x) !== Object.prototype && Object.getPrototypeOf(x) !== null)) return x;
  const o = {};
  for (const k of Object.keys(x)) o[k] = top && k === "numbers" ? x[k] : QUIET.has(k) && typeof x[k] === "number" ? 0 : hush(x[k]);
  return o;
}
const quiet = (d) => (d && d.nums === false ? hush(d, true) : d);

/* ---- pieces ---- */
/* the name is a link to Play's home page, "/", from every page (Khayyam, 20 Nov 2026, evening: "the Play Logicers title must always
   lead to Play's home page, never to logicers.com"); on the home page itself it stays there. Up one level is the round back
   button's work; "by Logicers" under the name goes to Logicers' home in that language. */
function brand(d, tag) {
  const [play, rest] = d.wall ? ["Play", "Logicers"] : nameParts(d.lang);
  return `<${tag} class="brand"><a class="brand-a" href="/"${d.page === "wall" ? ' aria-current="page"' : ""}><span class="brand-play">${getLook() === "rings" ? ringLetters(play) : esc(play)}</span> <span class="brand-lang">${esc(rest)}</span></a></${tag}>`;
}
/* "{n} players today": shown from 1, never as 0 (plan 2.8); portal.js shows it when the first player comes */
function todayLine(lang, n, which) {
  const [a, b] = aroundN(lang, "players_today", n);
  return `<p class="today"${n ? "" : " hidden"}><span class="today-w">${esc(a.trim())}</span><b class="today-n" data-count="${which}">${n ? esc(num(lang, n)) : ""}</b><span class="today-w">${esc(b.trim())}</span></p>`;
}
/* Add a game at the top of every page (20 Nov 2026): a filled round "+" on a phone, the words from 700 px; the one in the foot stays */
function addTop(L) {
  return `<button class="add-top" type="button" data-open="sheet-add" aria-label="${T(L, "add")}" title="${T(L, "add")}">${icon("i-plus")}<span class="add-top-t">${T(L, "add")}</span></button>`;
}
/* search (chat S, 24 Nov 2026; plan 2.17 item 5): a round magnifier, its icon only, named by the word "search"; drawn only where
   the language has SEARCH_MIN games or more, counted as the dice counts them (db.js DICE_WHERE: d.dice); below that nothing is
   drawn and no room is kept. It opens the sheet sheetFind; on a computer "/" opens it too (portal.js). */
const hasFind = (d) => (d.dice || 0) >= SEARCH_MIN;
function findTop(L) {
  return `<button class="find-b" id="find-b" type="button" data-open="sheet-find" aria-haspopup="dialog" aria-label="${T(L, "search")}" title="${T(L, "search")}">${icon("i-search")}</button>`;
}
/* the wall: the name large, its one English line, today's players in every language */
function headerWall(d) {
  /* the number of games on the wall (chat Inside, 27 Nov 2026): the sum of the wall's tiles, in English, from 1 (a 0 is never
     written); not the number of players */
  const total = (d.langs || []).reduce((n, l) => n + (l.games || 0), 0);
  return `<header class="top top-wall">
<div class="brand-box">
${total > 0 ? `<p class="brand-n"><b class="brand-n-n" data-games>${esc(num("en", total))}</b> <span class="brand-n-w" lang="en">games</span></p>\n` : ""}${brand(d, "h1")}
<p class="brand-sub">Daily games of the world, by language</p>
</div>
${addTop("en")}
${todayLine("en", d.today, "all")}
</header>`;
}
/* "by Logicers" under the name: a link to Logicers' home in the language */
const brandBy = (d) => `<p class="brand-by"><a class="brand-by-a" href="${esc(d.lgHome || "https://logicers.com/")}">${T(d.lang, "by")}</a></p>`;
/* a language page: the name large, "by Logicers" small, today's players, and the language button, which opens the list of the
   open languages (sheetLangs; chat K, 20 Nov 2026: it no longer goes to the wall). Its name for a screen reader is the word
   "Language" and the language's own name; on a phone it shows as a globe. */
function headerLang(d) {
  const l = LANG.get(d.lang);
  return `<header class="top top-lang${d.nums === false ? " top-quiet" : ""}${hasFind(d) ? " has-find" : ""}">
<div class="brand-box">
${brand(d, "h1")}
${brandBy(d)}
</div>
${todayLine(d.lang, d.page_today, "page")}
<div class="top-acts">
${addTop(d.lang)}
${hasFind(d) ? findTop(d.lang) : ""}<a class="dice" id="dice" target="_blank" rel="noopener" data-hit data-game="" aria-label="${T(d.lang, "dice")}" title="${T(d.lang, "dice")}" hidden>${icon("i-dice")}<span class="dice-t" aria-hidden="true">${T(d.lang, "dice")}</span></a>
<button class="chip-lang" type="button" data-open="sheet-langs" aria-haspopup="dialog" aria-label="${T(d.lang, "f.lang")}: ${esc(l.endonym)}" title="${T(d.lang, "f.lang")}">${icon("i-globe", "chip-g")}<span class="chip-lang-t">${esc(l.endonym)}</span>${icon("i-down", "chip-d")}</button>
</div>
</header>`;
}
/* a page below: the round back button, the name small at the end */
function headerSub(d) {
  const home = d.back || (d.wall ? "/" : "/" + d.lang + "/"), name = d.backName || (d.wall ? "Play Logicers" : pageName(d.lang));
  const find = d.page === "kind" && hasFind(d);             // search: a kind page too (not a game page)
  return `<header class="top top-sub${find ? " has-find" : ""}">
<a class="back" href="${home}" aria-label="${esc(name)}">${icon("i-back", "ico-flip")}</a>
<div class="brand-box brand-sm">
${brand(d, "p")}
${d.wall ? "" : brandBy(d)}
</div>
${find ? findTop(d.lang) + "\n" : ""}${addTop(d.wall ? "en" : d.lang)}
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

/* one tile. g: { id, name, kind, slug?, lang?, url, today, isNew, place, sold }, o: { lg, en }.
   The coin opens the game's page (Khayyam, 22 Nov 2026: "it should open the game page as it does with clicking the game's
   name"; it played from 20 Nov): the coin and the name under it are one link to /<lang>/g/<slug>/, in the same tab, one
   tab stop (the name is the same link, out of the tab order); it counts nothing. A play is counted from Play and the big
   coin on the game's page, the dice and My run. A Logicers game has no page here: its coin opens the game in a new tab and
   counts (data-hit), and its name is the same link. With nobody today the coin shows its kind's icon large in its ring
   colour (.is-0), never a 0. */
export function tile(d, g, o) {
  o = o || {};
  const cls = ["tile", ring(g.id)];
  if (o.lg) cls.push("tile-lg");
  else {
    if (g.isNew) cls.push("tile-new");
    if (g.place === 1) cls.push("tile-one");
    if (g.sold) cls.push("tile-sold");
    if (g.crown) cls.push("tile-crown");
  }
  const today = g.today || 0, n = num(d.lang, today);
  if (!today) cls.push("is-0");
  const logo = tileLogo(g, o);
  const en = o.en ? ' lang="en"' : "";
  const link = o.lg ? `href="${esc(g.url)}" target="_blank" rel="noopener" data-hit` : `href="/${esc(g.lang || d.lang)}/g/${esc(g.slug)}/"`;
  return `<li class="${cls.join(" ")}" data-game="${esc(g.id)}" data-kind="${esc(g.kind)}"><a class="tile-a" ${link}>`
    + (!o.lg && g.isNew ? `<span class="tile-badge">${T(d.lang, "new")}</span>` : "")
    + (o.en ? `<span class="tile-chip" lang="en">${T(d.lang, "en_chip")}</span>` : "")
    + (!o.lg && g.crown ? icon("i-crown", "tile-crown-i") : "")
    + (logo || icon("k-" + g.kind, "tile-kind") + icon("k-" + g.kind, "tile-zero"))
    + `<span class="tile-n${today ? numCls(n) : ""}" data-count="today" aria-hidden="true">${today ? esc(n) : ""}</span>`
    + `<span class="vh"><span class="tile-vn">${o.lg ? T(d.lang, "play") + " " : ""}<span${en}>${esc(g.name)}</span></span>${!o.lg && g.crown ? `<span class="tile-gotw">, ${T(d.lang, "gotw")}</span>` : ""}<span data-count-label="today">${today ? ", " + esc(withN(d.lang, "today_n", today)) : ""}</span></span>`
    + `</a>`
    + `<a class="tile-name" ${link} tabindex="-1" aria-hidden="true" dir="auto"${en}>${esc(g.name)}</a>`
    + `<button class="tile-star" type="button" aria-pressed="false" aria-label="${T(d.lang, "star")}" data-star="${esc(g.id)}">${icon("i-star")}</button></li>`;
}
/* a coin's logo (chat J, plan 2.20): a maker's picture once a key said yes, or the drawing of one of Logicers' own games. With
   nobody today it is large and round where the kind's icon would be; from the first player the number is the hero and the
   logo is small, in the corner (portal.css .tile-pic). */
function tileLogo(g, o) {
  const k = o.lg ? lgLogo(g) : null, u = o.lg ? null : picUrl(g);
  if (k) return `<svg class="tile-logo tile-logo-lg" aria-hidden="true" focusable="false"><use href="${ASSET.icons}#lg-${k}"></use></svg>`;
  if (u) return `<img class="tile-logo" src="${esc(u)}" alt="" width="64" height="64" loading="lazy" decoding="async">`;
  return "";
}
/* the template portal.js fills (Yours, More): the coin goes to the game's page; for a Logicers game portal.js makes it play */
function tplTile(d) {
  return `<template id="tpl-tile"><li class="tile" data-game="" data-kind=""><a class="tile-a" href=""><span class="tile-badge" hidden>${T(d.lang, "new")}</span><span class="tile-chip" lang="en" hidden>${T(d.lang, "en_chip")}</span>${icon("i-crown", "tile-crown-i")}${icon("k-other", "tile-kind")}${icon("k-other", "tile-zero")}<img class="tile-logo" alt="" width="64" height="64" decoding="async" hidden><svg class="tile-logo tile-logo-lg" aria-hidden="true" focusable="false" hidden><use href=""></use></svg><span class="tile-n" data-count="today" aria-hidden="true"></span><span class="vh"><span class="tile-vn"><span class="tile-vp" hidden>${T(d.lang, "play")} </span><span class="tile-vt"></span></span><span class="tile-gotw" hidden>, ${T(d.lang, "gotw")}</span><span data-count-label="today"></span></span></a><a class="tile-name" href="" tabindex="-1" aria-hidden="true" dir="auto"></a><button class="tile-star" type="button" aria-pressed="false" aria-label="${T(d.lang, "star")}" data-star="">${icon("i-star")}</button></li></template>`;
}
/* a row's head: its name, and More at the end. href: the name is a link to that page (a kind's row: its kind page, chat X,
   23 Nov 2026), so every kind page is reached from its language's page even when the row is short and has no More, and a
   search engine finds it without the sitemap; it looks as before and adds no height (portal.css .row-ta) */
function rowTop(id, title, more, href) {
  const t = href ? `<a class="row-t row-ta" href="${esc(href)}">${title}</a>` : `<span class="row-t">${title}</span>`;
  return `<div class="row-top"><h2 class="row-h${href ? " row-hl" : ""}" id="${id}">${t}</h2>${more || ""}</div>`;
}
function moreLink(d, href, n) {
  return `<a class="row-more" href="${esc(href)}">${T(d.lang, "more")}${n ? `<span class="row-more-sep" aria-hidden="true">·</span><span class="row-more-n">${esc(num(d.lang, n))}</span>` : ""}${icon("i-more", "ico-flip")}</a>`;
}
/* the Yours row's head: its name, the streak (a flame and the days in a row; JS shows it from 1) and, on a language's page, the
   run (a link to the next game of the run, or its tick when all are played; JS sets the address) */
function mineTop(d) {
  const run = d.page === "lang"
    ? `<a class="run" id="run" target="_blank" rel="noopener" data-hit data-game="" hidden>${icon("i-play")}<span class="run-t"></span></a><span class="run-done" id="run-done" role="img" hidden>${icon("i-check")}<span class="run-t"></span></span>` : "";
  const me = meOf(d), other = me.lang !== d.lang ? ` lang="${me.lang}"` : "";   // its name is My Logicers' own (English where Logicers lacks the language)
  /* Logicers' mark (chat M): a quiet way to My Logicers beside the flame; portal.js adds the Logicer number when the device has one */
  const mark = `<a class="me-mark" id="me-mark" href="${esc(me.href)}"${other} aria-label="${esc(me.name)}" title="${esc(me.name)}">${MARK}<span class="me-mark-n" hidden></span></a>`;
  return `<span class="streak" id="streak" role="img" hidden>${icon("i-flame")}<b class="streak-n"></b></span>${mark}${run}`;
}
function rowMine(d) {
  return `<section class="row row-mine" id="row-mine" aria-labelledby="h-mine" hidden>
${rowTop("h-mine", T(d.lang, "mine"), mineTop(d))}
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
${rowTop("h-" + kind, T(d.lang, "cat." + kind), more, `/${d.lang}/${kind}/`)}
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
<label class="fld fld-link"><span class="fld-l">${T(L, "f.link")}</span><input name="url" type="url" inputmode="url" required maxlength="500" autocomplete="url" spellcheck="false" placeholder="https://" dir="ltr"></label>
${langField}
<fieldset class="fld fld-kind"><legend class="fld-l">${T(L, "f.kind")}</legend><div class="kinds">
${KINDS.map((k) => `<label class="kind-opt"><input type="radio" name="kind" value="${k}" required>${icon("k-" + k)}<span class="kind-opt-t">${T(L, "cat." + k)}</span></label>`).join("\n")}
</div></fieldset>
<div class="fld-two">
<label class="fld fld-name"><span class="fld-l">${T(L, "f.name")} <span class="fld-opt">· ${T(L, "f.optional")}</span></span><input name="name" maxlength="60" autocomplete="name"></label>
<label class="fld fld-email"><span class="fld-l">${T(L, "f.email")} <span class="fld-opt">· ${T(L, "f.optional")}</span></span><input name="email" type="email" maxlength="120" autocomplete="email" spellcheck="false" dir="ltr"></label>
</div>
<label class="hp" aria-hidden="true">Leave empty <input name="pl_x9" tabindex="-1" autocomplete="off" data-lpignore="true" data-1p-ignore data-bwignore></label>
<p class="sheet-err" data-e="link" role="alert" hidden>${T(L, "f.e_link")}</p>
<p class="sheet-err sheet-here" data-e="here" role="alert" hidden><span class="sheet-here-t">${T(L, "f.e_here")}</span><a class="btn btn-claim sheet-claim" href="/claim/" hidden>${T(L, "claim")}</a></p>
<p class="sheet-err" data-e="busy" role="alert" hidden>${T(L, "f.e_busy")}</p>
<button class="btn btn-send" type="submit">${T(L, "f.send")}</button>
<p class="sheet-ok" role="status" hidden>${icon("i-check")}<span>${T(L, "f.thanks")}</span></p>
<button class="btn btn-done" type="button" data-close hidden>${T(L, "close")}</button>
</form>
</dialog>`;
}
/* the languages (chat K, 20 Nov 2026): the open languages by their own names, in the add sheet's order, the page's own marked;
   each a real link to that language's page. No new word: its title is "Language" (f.lang), its × is "Close". */
function sheetLangs(d) {
  const L = d.lang, open = new Set(d.open || []);
  open.add(L);
  const list = byEndonym().filter((l) => open.has(l.code));
  return `<dialog class="sheet sheet-langs" id="sheet-langs" aria-labelledby="sheet-langs-h">
<div class="sheet-form sheet-box">
${sheetTop(L, "sheet-langs-h", T(L, "f.lang"))}
<ul class="lang-opts" role="list">
${list.map((l) => `<li><a class="lang-opt" href="/${l.code}/" lang="${esc(htmlLang(l.code))}" dir="${l.dir}"${l.code === L ? ' aria-current="page"' : ""}><span class="lang-opt-t">${esc(l.endonym)}</span>${l.code === L ? icon("i-check") : ""}</a></li>`).join("\n")}
</ul>
</div>
</dialog>`;
}
/* search's sheet (chat S): like the languages' one. A field (its label and its placeholder the word "search"), and the rows'
   own tiles under it, built by portal.js; nothing found: "Nothing here." (nf) and Add a game, which opens the add sheet with
   the language set. Escape, the ×, the shade close it, and the focus goes back to the magnifier. */
function sheetFind(d) {
  if (!hasFind(d)) return "";
  const L = d.lang;
  return `<dialog class="sheet sheet-find" id="sheet-find" aria-labelledby="find-l">
<form class="sheet-form find-form" role="search" novalidate>
<span class="sheet-grab" aria-hidden="true"></span>
<div class="find-top">
<label class="find-fld">${icon("i-search", "find-i")}<span class="vh" id="find-l">${T(L, "search")}</span><input class="find-q" name="q" type="search" enterkeyhint="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" maxlength="100" placeholder="${T(L, "search")}" dir="auto"></label>
<button class="sheet-x" type="button" data-close aria-label="${T(L, "close")}">${icon("i-close")}</button>
</div>
<ul class="tiles find-tiles" role="list"></ul>
<div class="find-nf" hidden><p class="find-nf-t" role="status">${T(L, "nf")}</p><button class="btn btn-add" type="button" data-open="sheet-add">${T(L, "add")}</button></div>
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
const langTile = (l) => `<li class="lang" data-lang="${l.code}" lang="${esc(htmlLang(l.code))}"><a class="lang-a" href="/${l.code}/"><span class="lang-name" dir="${l.dir}">${esc(l.endonym)}</span><span class="lang-n">${esc(num("en", l.games))}</span><span class="lang-g" lang="en">games</span></a></li>`;

/* ==== the pages. d: { site, lang, page, ... } as index.js gathers it ==== */

/* the wall "/" (English words; portal.js puts the device's language first) */
export function pageWall(d) {
  d = quiet(d);
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
  d = quiet(d);
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
${sheetLangs(d)}
${sheetFind(d)}
${tplTile(d)}`;
  const lists = [itemList(word(d.lang, "from_logicers"), d.lgRow.map((g) => ({ url: g.url, name: g.name })))]
    .concat(kinds.map((k) => itemList(word(d.lang, "cat." + k), d.byKind[k].slice(0, ROW_MAX).map((g) => ({ url: gameUrl(d, g), name: g.name })))));
  return doc({ lang: d.lang, cls: "pl-lang", title: name + " · " + word(d.lang, "seo.daily"), canonical: d.site + "/" + d.lang + "/",
    desc: word(d.lang, "seo.desc").replace("{lang}", endonym), jsonld: graph(lists), body,
    data: pageData(d, { lgLang: d.lgLang, me: meOf(d) }) });
}

/* one kind in a language "/<lang>/<kind>/": KIND_MAX tiles, then More (portal.js asks for the rest) */
export function pageKind(d) {
  d = quiet(d);
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
${sheetFind(d)}
${tplTile(d)}`;
  const cat = word(d.lang, "cat." + d.kind), name = pageName(d.lang);
  /* the Words page is titled for what people search (Khayyam, 23 Nov 2026: "games like Wordle in Spanish"): its title, its
     description and its list's name come from seo.words_t and seo.words_d, each naming its own language in its own words
     (no {lang} mark); "Wordle" only describes, it is never our name. What the page shows does not change. */
  const sw = d.kind === "words", head = sw ? word(d.lang, "seo.words_t") : cat;
  return doc({ lang: d.lang, cls: "pl-kind", title: sw ? head + " · " + name : cat + " · " + word(d.lang, "seo.daily") + " · " + name,
    canonical: `${d.site}/${d.lang}/${d.kind}/`, desc: sw ? word(d.lang, "seo.words_d") : word(d.lang, "seo.desc").replace("{lang}", LANG.get(d.lang).endonym),
    jsonld: graph([itemList(head, shown.map((g) => ({ url: gameUrl(d, g), name: g.name })))]), body,
    data: pageData(d, { kind: d.kind, lgLang: d.lgLang, me: meOf(d) }) });
}

/* one game "/<lang>/g/<slug>/" */
function numBlock(L, key, n, which) {
  const [a, b] = aroundN(L, key, n);
  return `<span class="num num-${which}"${n ? "" : " hidden"}><span class="num-w">${esc(a.trim())}</span><b class="num-n" data-count="${which}">${n ? esc(num(L, n)) : ""}</b><span class="num-w">${esc(b.trim())}</span></span>`;
}
/* "Your game?": the question of yours_q, up to its question mark (every language's yours_q asks it first): ? ？, the Arabic
   and Persian ؟, and the Greek one, written ; (U+037E, which NFC turns into ;) (chat Q, 23 Nov 2026) */
export const QMARK = /^[^?？؟;\u037E]*[?？؟;\u037E]/;
export const yoursQ = (L) => { const s = word(L, "yours_q"), m = QMARK.exec(s); return (m ? m[0] : s).trim(); };
export function pageGame(d) {
  d = quiet(d);
  d = Object.assign({}, d, { page: "game" });
  const g = d.game, L = d.lang, pic = picUrl(g), mk = g.maker_id && d.maker ? d.maker : null;
  /* where its site allows a frame and nobody turned it off, Play and the big coin open the game inside this page (same tab); the
     small arrow beside Play always opens the game's own site in a new tab (chat Inside, 27 Nov 2026) */
  const inside = insideOf(g), out = inside ? "" : ' target="_blank" rel="noopener"';
  const body = `${headerSub(d)}
<main class="main main-game">
<article class="game ${ring(g.id)}${d.crown ? " is-crown" : ""}" data-game="${esc(g.id)}" data-kind="${esc(g.kind)}">
<a class="game-tile${pic ? " has-pic" : ""}" href="${esc(inside || g.url)}"${out} data-hit tabindex="-1" aria-hidden="true">${d.crown ? icon("i-crown", "game-crown") : ""}${pic ? `<img class="game-logo" src="${esc(pic)}" alt="" width="240" height="240" decoding="async">` : icon("k-" + g.kind, "game-ico")}</a>
<div class="game-body">
<div class="game-head">
<h1 class="game-name" dir="auto">${esc(g.name)}</h1>
${d.crown ? `<p class="game-gotw">${icon("i-crown")}<span>${T(L, "gotw")}</span></p>` : ""}
<p class="game-meta"><a class="game-kind-a" href="/${L}/${esc(g.kind)}/">${T(L, "cat." + g.kind)}</a>${mk ? `<span class="game-dot" aria-hidden="true">·</span><a class="game-maker game-maker-a" href="/m/${esc(mk.slug)}/?l=${L}" dir="auto">${esc(mk.name)}</a>`
    : g.maker ? `<span class="game-dot" aria-hidden="true">·</span><span class="game-maker" dir="auto">${esc(g.maker)}</span>` : ""}</p>
</div>
${g.line ? `<p class="game-line">${esc(g.line)}</p>` : ""}
<p class="game-nums"${d.today || d.all ? "" : " hidden"}>${numBlock(L, "today_n", d.today, "today")} ${numBlock(L, "total_n", d.all, "all")}</p>
<div class="game-acts">
<a class="btn btn-play" href="${esc(inside || g.url)}"${out} data-hit>${icon("i-play")}<span>${T(L, "play")}</span></a>
${inside ? `<a class="btn-site" href="${esc(g.url)}" target="_blank" rel="noopener" data-hit aria-label="${T(L, "open_site")}" title="${T(L, "open_site")}">${icon("i-out")}</a>` : ""}
<button class="btn btn-vote" type="button" data-vote="${esc(g.id)}" aria-pressed="false" hidden>${icon("i-crown", "vote-i")}${icon("i-check", "vote-ok")}<span class="vote-t">${T(L, "vote")}</span></button>
<button class="tile-star game-star" type="button" aria-pressed="false" aria-label="${T(L, "star")}" data-star="${esc(g.id)}">${icon("i-star")}</button>
</div>
</div>
</article>
<aside class="game-foot">
${g.maker_id || g.source === "logicers" ? `<p class="yours-q">${T(L, "yours_q")} <span class="mail" dir="ltr">${esc(CONTACT)}</span></p>`
    : `<p class="yours-q yours-q-claim"><span class="yours-q-t">${esc(yoursQ(L))}</span> <a class="btn btn-claim" href="/claim/?g=${esc(g.id)}">${T(L, "claim")}</a></p>`}
${g.maker_id ? editLink(L, "game", g.id) : ""}<button class="btn btn-report" type="button" data-open="sheet-report">${icon("i-flag")}<span>${T(L, "report")}</span></button>
</aside>
${numbersBlock(d)}
${rowLg(d, d.lgGame || [], "h-lg-game", "row-lg-game")}
${d.same.length ? `<section class="row row-same" aria-labelledby="h-same">
${rowTop("h-same", T(L, "cat." + g.kind), d.more ? moreLink(d, `/${L}/${g.kind}/`) : "")}
<ul class="tiles" role="list">
${d.same.map((x) => tile(d, x)).join("\n")}
</ul>
</section>` : ""}
</main>
${footer(d)}
${sheetAdd(d)}
${sheetReport(d, g)}
${tplTile(d)}`;
  const vg = { "@context": "https://schema.org", "@type": "VideoGame", name: g.name, url: g.url, inLanguage: htmlLang(L),
    genre: word(L, "cat." + g.kind), gamePlatform: "Web browser", mainEntityOfPage: gameUrl(d, g) };
  if (g.line) vg.description = g.line;
  if (g.maker) vg.author = { "@type": "Organization", name: g.maker };
  if (mk) vg.author = { "@type": "Organization", name: mk.name, url: `${d.site}/m/${mk.slug}/` };
  if (pic) vg.image = d.site + pic;
  return doc({ lang: L, cls: "pl-game", title: g.name + " · " + pageName(L), canonical: gameUrl(d, g), noindex: indexable(g) ? null : "noindex, follow",
    image: pic ? d.site + pic : null,
    desc: g.line || word(L, "seo.desc").replace("{lang}", LANG.get(L).endonym), jsonld: vg, body,
    data: pageData(d, { game: g.id, url: g.url, lgLang: d.lgLang, me: meOf(d) }) });
}

/* The inside page (chat Inside, 27 Nov 2026; claude/play-here-27nov.md): one game under one slim bar. The bar holds, in this
   order: back to the game's page (round, named by the game), the small coin and the game's name, the arrow that opens the game's own
   site in a new tab (named by the word open_site) and, in a run (/play/#run), Next game (the word run; portal.js gives it the
   next game of today's run from portal.run). Not indexed; the frame is the game's address as listed; nothing is counted here
   (the tap on Play counted it), except a tap on Next game, as the run's link counts on the language's page. */
export function pageInside(d) {
  d = Object.assign({}, d, { page: "inside", nums: false });
  const g = d.game, L = d.lang, pic = picUrl(g), back = `/${L}/g/${g.slug}/`;
  const coin = pic ? `<span class="in-coin has-pic ${ring(g.id)}"><img class="in-logo" src="${esc(pic)}" alt="" width="28" height="28" decoding="async"></span>`
    : `<span class="in-coin ${ring(g.id)}">${icon("k-" + (KINDS.includes(g.kind) ? g.kind : "other"), "in-ico")}</span>`;
  const body = `<div class="in">
<header class="in-bar">
<a class="back" href="${esc(back)}" aria-label="${esc(g.name)}">${icon("i-back", "ico-flip")}</a>
<h1 class="in-name" dir="auto">${coin}<span class="in-name-t">${esc(g.name)}</span></h1>
<a class="in-open" href="${esc(g.url)}" target="_blank" rel="noopener" aria-label="${T(L, "open_site")}" title="${T(L, "open_site")}">${icon("i-out")}</a>
<a class="run in-run" id="run" data-hit data-game="" hidden>${icon("i-play")}<span class="run-t"></span></a>
</header>
<iframe class="in-frame" src="${esc(g.url)}" title="${esc(g.name)}" sandbox="${SANDBOX}" allow="${FRAME_ALLOW}" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
</div>`;
  return doc({ lang: L, cls: "pl-inside", title: g.name + " · " + pageName(L), noindex: true, body,
    data: pageData(d, { game: g.id }) });
}

/* Edit, for the maker only: hidden, shown by portal.js on the device that holds this maker's key (portal.makerof) */
function editLink(L, what, id) {
  return `<a class="btn btn-edit" href="/maker/?l=${L}" data-maker-${what}="${esc(id)}" hidden>${icon("i-edit")}<span>${T(L, "edit")}</span></a>`;
}
/* a claimed game's numbers (chat J, plan 2.20): players sent by UTC day for the last 90 days, as bars drawn here (no
   script), and the countries they came from, named in the page's language. Nothing is written for a day or a country with
   nobody, and the whole block waits for the first player. */
export function numbersBlock(d) {
  const N = d.numbers, L = d.lang;
  if (!N) return "";
  const days = Array.from({ length: NUM_DAYS }, (_, i) => { const day = dayAdd(N.from, i); return [day, N.days[day] || 0]; });
  const total = days.reduce((a, [, n]) => a + n, 0);
  if (!total) return "";
  const max = Math.max(...days.map(([, n]) => n)), tag = htmlLang(L), rtl = !!(LANG.get(L) && LANG.get(L).dir === "rtl");
  const fmt = new Intl.DateTimeFormat(numTag(L), { day: "numeric", month: "short", timeZone: "UTC" });
  const date = (day) => fmt.format(new Date(day + "T00:00:00Z"));
  const bars = days.map(([day, n], i) => {
    if (!n) return "";
    const h = Math.max(2, Math.round(n / max * 100 * 10) / 10);
    return `<rect class="nums-bar" x="${rtl ? 890.75 - i * 10 : i * 10 + 0.75}" y="${(100 - h).toFixed(1)}" width="8.5" height="${h}"><title>${esc(date(day))}: ${esc(num(L, n))}</title></rect>`;
  }).join("");
  let names = null;
  try { names = new Intl.DisplayNames([tag], { type: "region" }); } catch (e) { names = null; }
  const cs = (N.countries || []).filter((c) => c.n > 0 && /^[A-Z]{2}$/.test(c.country || "") && !["XX", "T1", "ZZ", "EU", "AP"].includes(c.country))
    .map((c) => { let nm = null; try { nm = names && names.of(c.country); } catch (e) { nm = null; } return nm && nm !== c.country ? { nm, n: c.n } : null; })
    .filter(Boolean).slice(0, 5);
  const top = cs.length ? cs[0].n : 1;
  return `<section class="nums ${ring(d.game.id)}" aria-labelledby="h-nums"${d.nums === false ? ` hidden data-own-nums="${esc(d.game.id)}"` : ""}>
<div class="nums-days">
<div class="row-top"><h2 class="row-h" id="h-nums"><span class="row-t">${T(L, "days90")}</span></h2><span class="nums-total">${esc(num(L, total))}</span></div>
<svg class="nums-svg" viewBox="0 0 900 100" preserveAspectRatio="none" role="img" aria-label="${T(L, "days90")}: ${esc(withN(L, "total_n", total))}">${bars}</svg>
<p class="nums-axis" aria-hidden="true"><span>${esc(date(N.from))}</span><span>${esc(date(N.to))}</span></p>
</div>
${cs.length ? `<div class="nums-where">
<div class="row-top"><h2 class="row-h" id="h-where"><span class="row-t">${T(L, "countries")}</span></h2></div>
<ol class="nums-c" aria-labelledby="h-where">
${cs.map((c) => `<li class="nums-ci"><span class="nums-cn">${esc(c.nm)}</span><span class="nums-cv">${esc(num(L, c.n))}</span><svg class="nums-cb" viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden="true" focusable="false">${((w) => `<rect${rtl ? ` x="${100 - w}"` : ""} width="${w}" height="4" rx="2"></rect>`)(Math.max(2, Math.round(c.n / top * 100)))}</svg></li>`).join("\n")}
</ol>
</div>` : ""}
</section>`;
}

/* a maker's page "/m/<slug>/" (chat J, plan 2.20): the maker's name and its listed games as coins, in every language they
   have; its words in one language (?l=, else the language most of its games are in); noindex for now */
export function pageMakerPublic(d) {
  d = quiet(d);
  d = Object.assign({}, d, { page: "mk", wall: false });
  const L = d.lang, m = d.maker;
  const body = `${headerSub(Object.assign({}, d, { back: "/" + L + "/" }))}
<main class="main main-mk">
<header class="mk-head">
<h1 class="mk-name" dir="auto">${esc(m.name)}</h1>
${editLink(L, "slug", m.slug)}
</header>
<section class="row row-mk" aria-labelledby="h-mk">
<h2 class="vh" id="h-mk">${esc(m.name)}</h2>
<ul class="tiles tiles-all" role="list">
${d.games.map((g) => tile(d, g)).join("\n")}
</ul>
</section>
</main>
${footer(d)}
${sheetAdd(d)}
${tplTile(d)}`;
  return doc({ lang: L, cls: "pl-mk", title: m.name + " · Play Logicers", canonical: `${d.site}/m/${m.slug}/`, noindex: "noindex, follow",
    desc: d.games.map((g) => g.name).join(", ").slice(0, 150), body,
    data: pageData(d, { maker: m.slug }) });
}

/* About "/about/" (English; with ?l=<code> one line on top in that language) */
export function pageAbout(d) {
  d = quiet(d);
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
${p((d.nums === false ? "We count how many people go to play each game from Play Logicers and how many people open each page. The numbers are not shown yet; the maker of a game can see its own." : "Each game shows how many people went to play it from Play Logicers today and in all, and each page shows how many people opened it today.") + " A day is the world's day, from midnight to midnight UTC. Each device counts once a day for each game and each page.")}
${h("What we keep")}
${p("Nothing about you. No cookies, no accounts. Your device makes one random number and keeps it; it is sent with a count only so the same device is counted once a day. We keep a scrambled form of it for that day only, and delete it every night. We never keep your IP address: for one day we keep a scrambled form of it, only to stop fake counts, and delete it every night. We keep the counts by game, day and country. When a search here finds nothing, we keep only its words, for 90 days, to see which games are missing. Cloudflare, which serves these pages, also counts visits for us, without cookies.")}
${p("The games you save and your streak stay on your device. If you keep a My Logicers code on logicers.com, they also go with it to your other devices, locked so that only your code opens them.")}
${p("A game shown inside Play Logicers keeps its own saved progress apart from the same game on its own site.")}
${p("When you add a game, we keep its link, and your name and email if you give them; only Khayyam sees your email. We keep them while the game is on the list, so we can tell its maker the numbers, and delete them 90 days after a game is turned down or taken off. A report keeps its reason and the day.")}
${h("Your game")}
${p(`To have a game changed or taken off, write to <span class="mail" dir="ltr">${esc(CONTACT)}</span>. It goes within days. Makers never need to do anything to be listed, and nothing is asked of them.`)}
${p("If you like, you can claim your game: open its page here and choose Claim, then put one line in your page's code for a moment, or use the link in our email. You get a maker key: it stays on your device, and we keep only a scrambled form of it. With it you can write your game's line, choose its kind and send its logo, and you see its players by day and by country. Your words show at once and we look at every change; a logo shows once we have looked at it. There is no account and no password. Your games get a page of their own here.")}
${p("If you like, you can also put a small Play Logicers badge on your page: a picture with a link to your game here, with no script and no cookie; it counts nothing, and we never ask for it.")}
</article>
</main>
${footer(d)}
${sheetAdd(d)}`;
  return doc({ lang: "en", cls: "pl-about", title: "About · Play Logicers", canonical: d.site + "/about/",
    desc: "What Play Logicers is, how games get on it, what the numbers count and what it keeps.", body, data: pageData(d) });
}

/* ---- the claim (chat J, 20 Nov 2026, plan 2.20). Since chat N (22 Nov 2026) in the game's language, every word from the
   words files (claim.*): a maker who reads no English can claim (Khayyam: "a maker who doesn't speak English, how do they
   proceed?"). The page is the game's language page's own: its name, its head and foot. ---- */
const claimErrs = (L, keys) => keys.map((k) => `<p class="claim-err" data-e="${k}" role="alert" hidden>${T(L, "claim.e_" + k)}</p>`).join("\n");
const claimOk = (L) => `<section class="claim-ok" id="claim-ok" aria-labelledby="claim-ok-h" hidden>
<h2 class="claim-step-h" id="claim-ok-h">${T(L, "claim.ok")}</h2>
<p class="claim-p claim-joined" hidden>${T(L, "claim.joined")}</p>
<div class="claim-keybox" hidden>
<p class="claim-p">${T(L, "claim.key")}</p>
<div class="claim-code"><code class="claim-key" id="claim-key" dir="ltr"></code><button class="btn btn-copy" type="button" data-copy="claim-key">${T(L, "claim.copy")}</button></div>
</div>
<a class="btn btn-send claim-edit" href="/maker/?l=${esc(L)}">${T(L, "claim.edit")}</a>
</section>`;
const claimOther = (L) => `<p class="claim-other">${TM(L, "claim.other", { mail: `<span class="mail" dir="ltr">${esc(CONTACT)}</span>` })}</p>`;
function claimHead(L, g) {
  return `<h1 class="claim-h">${TM(L, "claim.h", { game: `<span class="claim-name" dir="auto">${esc(g.name)}</span>` })}</h1>
<p class="claim-p">${T(L, "claim.intro")}</p>`;
}
/* the claim pages' and the form's page: the language page's head (its name, "by Logicers", Add a game) and foot */
const OWN_CLAIM = /^claim\./, OWN_MAKER = /^(claim|maker)\./;
function claimDoc(d, title, body, page, more, own) {
  return doc({ lang: d.lang, cls: page === "maker" ? "pl-maker" : "pl-claim", title: title + " · Play Logicers", noindex: true, script2: ASSET.maker, body,
    data: pageData(d, Object.assign({ page }, more), own) });
}
/* /claim/?g=<id>: the line for the page's head, then the check */
export function pageClaim(d) {
  const g = d.game, L = g.lang;
  d = Object.assign({}, d, { lang: L, wall: false, page: "claim", back: `/${L}/g/${g.slug}/`, backName: g.name });
  const body = `${headerSub(d)}
<main class="main main-claim">
<article class="claim" data-game="${esc(g.id)}">
${claimHead(L, g)}
<ol class="claim-steps">
<li class="claim-step">
<h2 class="claim-step-h">${T(L, "claim.s1")}</h2>
<p class="claim-p">${TM(L, "claim.s1_p", { head: '<code dir="ltr">&lt;head&gt;</code>', url: `<span class="claim-url" dir="ltr">${esc(g.url)}</span>` })}</p>
<div class="claim-code" hidden><code class="claim-line" id="claim-line" dir="ltr"></code><button class="btn btn-copy" type="button" data-copy="claim-line">${T(L, "claim.copy")}</button></div>
<button class="btn btn-send claim-get" id="claim-get" type="button">${T(L, "claim.get")}</button>
</li>
<li class="claim-step">
<h2 class="claim-step-h">${T(L, "claim.s2")}</h2>
<p class="claim-p">${T(L, "claim.s2_p")}</p>
<button class="btn btn-send claim-check" id="claim-check" type="button" disabled>${T(L, "claim.check")}</button>
</li>
</ol>
${claimErrs(L, ["nocode", "nometa", "noopen", "moved", "busy", "nogame", "server"])}
${claimOk(L)}
${claimOther(L)}
</article>
</main>
${footer(d)}
${sheetAdd(d)}`;
  return claimDoc(d, fill(L, "claim.h", { game: g.name }), body, "claim", { game: g.id }, OWN_CLAIM);
}
/* /claim/<token>/: the single-use link of the weekly email; nothing is used until the button is pressed (a mail program
   that opens links to look at them claims nothing). A link that works no more: in the browser's language (d.lang). */
export function pageClaimLink(d) {
  const g = d.game, L = g ? g.lang : d.lang || "en";
  d = Object.assign({}, d, { lang: L, wall: false, page: "claim", back: g ? `/${L}/g/${g.slug}/` : null, backName: g ? g.name : null });
  const body = `${headerSub(d)}
<main class="main main-claim">
<article class="claim"${g ? ` data-game="${esc(g.id)}" data-token="${esc(d.token)}"` : ""}>
${g ? `${claimHead(L, g)}
<button class="btn btn-send claim-token" id="claim-token" type="button">${T(L, "claim.it")}</button>
${claimErrs(L, ["token", "busy", "server"])}
${claimOk(L)}` : `<h1 class="claim-h">${T(L, "claim.used_h")}</h1>
<p class="claim-p">${TM(L, "claim.used_p", { claim: T(L, "claim") })}</p>
<a class="btn btn-send" href="/">Play Logicers</a>`}
</article>
</main>
${footer(d)}
${sheetAdd(d)}`;
  return claimDoc(d, g ? fill(L, "claim.h", { game: g.name }) : word(L, "claim"), body, "claimlink", { game: g ? g.id : null }, OWN_CLAIM);
}
/* /maker/: the maker's form (maker.js builds it from the key on the device), in d.lang: ?l=, else the browser's language */
export function pageMaker(d) {
  const L = d.lang || "en";
  d = Object.assign({}, d, { lang: L, wall: false, page: "maker" });
  const body = `${headerSub(d)}
<main class="main main-maker">
<div class="maker" id="maker">
<h1 class="claim-h">${T(L, "maker.h")}</h1>
<section class="maker-nokey" id="maker-nokey" hidden>
<p class="claim-p">${TM(L, "maker.nokey", { claim: T(L, "claim") })}</p>
<form class="maker-keyform" id="maker-keyform" autocomplete="off">
<label class="fld"><span class="fld-l">${T(L, "maker.key")}</span><input name="key" autocomplete="off" spellcheck="false" maxlength="40" required dir="ltr"></label>
<button class="btn btn-send" type="submit">${T(L, "maker.open")}</button>
<p class="claim-err" data-e="key" role="alert" hidden>${T(L, "maker.e_key")}</p>
<p class="claim-err" data-e="busy" role="alert" hidden>${T(L, "maker.e_busy")}</p>
<p class="claim-err" data-e="server" role="alert" hidden>${T(L, "claim.e_server")}</p>
</form>
</section>
<section class="maker-main" id="maker-main" hidden>
<form class="maker-namef" id="maker-namef">
<label class="fld"><span class="fld-l">${T(L, "maker.name")}</span><input name="name" maxlength="60" required></label>
<button class="btn btn-send" type="submit">${T(L, "maker.save")}</button>
<p class="maker-msg" role="status" hidden></p>
</form>
<a class="btn maker-pagelink" id="maker-page" href="/" hidden>${T(L, "maker.page")}</a>
<div class="maker-games" id="maker-games"></div>
<p class="claim-other">${TM(L, "maker.note", { mail: `<span class="mail" dir="ltr">${esc(CONTACT)}</span>` })}</p>
<button class="btn maker-forget" id="maker-forget" type="button">${T(L, "maker.forget")}</button>
</section>
</div>
</main>
${footer(d)}
${sheetAdd(d)}`;
  return claimDoc(d, word(L, "maker.h"), body, "maker", { kinds: KINDS, kindNames: Object.fromEntries(KINDS.map((k) => [k, word(L, "cat." + k)])),
    langNames: Object.fromEntries(LANGS.map((l) => [l.code, l.endonym])) }, OWN_MAKER);
}

/* nothing here (404): in a language, with its rows under the line; else the wall's languages */
export function pageNotFound(d) {
  d = quiet(d);
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
${[["todo", "To do"], ["left", "Left for Khayyam"], ["reports", "Reports"], ["dead", "Dead links"], ["edits", "Edits"], ["tell", "To tell"], ["all", "All"], ["numbers", "Numbers"], ["searches", "Searches"]].map(([f, t]) => `<button class="admin-filter" type="button" data-filter="${f}" aria-pressed="false"${f === "tell" || f === "searches" ? " hidden" : ""}>${t}<span class="admin-filter-n"></span></button>`).join("\n")}
</nav>
<section class="admin-cards" id="admin-cards" aria-live="polite"></section>
<button class="btn admin-more" type="button" hidden>More</button>
</main>`;
  return doc({ lang: "en", cls: "pl-admin", title: "Queue · Play Logicers", noindex: true, script: ASSET.admin, body,
    data: { lang: "en", site: d.site, page: "admin", kinds: KINDS, langs: LANGS.map((l) => ({ code: l.code, endonym: l.endonym })),
      reasons: ["notdaily", "notgame", "broken", "unsafe", "copy", "other"] } });
}
