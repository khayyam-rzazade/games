/* Play Logicers — Logicers' own games, the first row of every language page ("From Logicers", plan 2.10). Chat A, 19 Nov 2026.
   Read from the six homes in ~/games (index.html, it/ tr/ es/ pt/ fr/index.html) on 19 Nov 2026: the 9 daily games of
   "Today's daily games" and the 3 of "Today's word games", in the homes' order and with the names the homes show.
   Not here: This week's story (weekly), Same Street (on no home), the pass-the-phone games, rooms, live.
   Where Logicers has the language (en it tr es pt fr) the row shows these in that language; elsewhere the English ones
   with the EN chip. They are synced into the games table (source "logicers", id "lg-<key>-<lang>") on the first request
   after a deploy, so they are counted like any game; they never get a New ribbon, a paid place or a kind row, and the
   queue never edits them (change them here).
   The word games live at one address for every language and take the language from the site's chip; "?lang=<code>" is
   read today only inside an embed (altitude.js pickLang): chat B makes the three word games read it outside an embed too.
   test/test_logicers.mjs checks that every address is a page in the repository; LIVE=1 also fetches each (200). */

export const LG_LANGS = ["en", "it", "tr", "es", "pt", "fr"];
export const SITE = "https://logicers.com";

/* key, path under the language tree (daily) or at the top (word), kind (plan 2.7) */
export const LG_GAMES = [
  { key: "energy", path: "same-energy/", kind: "knowledge", type: "daily" },
  { key: "hundred", path: "100-of-us/", kind: "knowledge", type: "daily" },
  { key: "call", path: "your-call/", kind: "knowledge", type: "daily" },
  { key: "cousin", path: "long-lost-cousin/", kind: "knowledge", type: "daily" },
  { key: "club", path: "the-club/", kind: "numbers", type: "daily" },
  { key: "apart", path: "years-apart/", kind: "knowledge", type: "daily" },
  { key: "gets", path: "who-gets-what/", kind: "knowledge", type: "daily" },
  { key: "every", path: "every-beat/", kind: "knowledge", type: "daily" },
  { key: "o24", path: "out-of-24/", kind: "knowledge", type: "daily" },
  { key: "altitude", path: "altitude/", kind: "words", type: "word" },
  { key: "lookalike", path: "lookalike/", kind: "words", type: "word" },
  { key: "passport", path: "passport/", kind: "words", type: "word" },
];

/* the names each home shows (its h3) */
export const LG_NAMES = {
  en: { energy: "Same Energy", hundred: "100 of Us", call: "Your Call", cousin: "Long Lost Cousin", club: "The Club", apart: "Years Apart", gets: "Who Gets What", every: "Every Beat", o24: "Out of 24" },
  it: { energy: "Stessa energia", hundred: "100 di noi", call: "A te la scelta", cousin: "Cugino lontano", club: "Il Club", apart: "Anni di distanza", gets: "Chi prende cosa", every: "Ogni battito", o24: "Su 24 ore" },
  tr: { energy: "Aynı Enerji", hundred: "100 Kişi", call: "Karar Senin", cousin: "Kayıp Kuzen", club: "Kulüp", apart: "Kaç Yıl Arayla", gets: "Kim Ne Alıyor", every: "Kalp Atışı", o24: "24 Saatte" },
  es: { energy: "La misma energía", hundred: "El mundo en 100", call: "Tú decides", cousin: "El primo perdido", club: "El club", apart: "Entre dos fechas", gets: "Quién recibe qué", every: "Cada latido", o24: "Las 24 horas" },
  pt: { energy: "Mesma energia", hundred: "O mundo em 100", call: "Sua decisão", cousin: "O primo distante", club: "O clube", apart: "Anos de distância", gets: "Quem fica com o quê", every: "Cada batida", o24: "Em 24 horas" },
  fr: { energy: "Même énergie", hundred: "Le monde en 100", call: "À toi de choisir", cousin: "Le cousin perdu de vue", club: "Le Club", apart: "Entre deux dates", gets: "Qui touche quoi", every: "Chaque battement", o24: "Heures sur 24" },
};
const WORD_NAMES = { altitude: "Altitude", lookalike: "Lookalike", passport: "Passport" };

export function lgUrl(g, lang) {
  if (g.type === "word") return SITE + "/" + g.path + (lang === "en" ? "" : "?lang=" + lang);
  return SITE + "/" + (lang === "en" ? "" : lang + "/") + g.path;
}

/* every row: { id, family, key, lang, name, url, kind, order } — 12 games × 6 languages */
export const LOGICERS = LG_LANGS.flatMap((lang) => LG_GAMES.map((g, i) => ({
  id: "lg-" + g.key + "-" + lang, family: "lg-" + g.key, key: g.key, lang, order: i,
  name: g.type === "word" ? WORD_NAMES[g.key] : LG_NAMES[lang][g.key],
  url: lgUrl(g, lang), kind: g.kind,
})));

/* the row a language page shows: its own language where Logicers has it, else English (with the EN chip) */
export function lgRowLang(lang) { return LG_LANGS.includes(lang) ? lang : "en"; }
export function lgRow(lang) { const l = lgRowLang(lang); return LOGICERS.filter((g) => g.lang === l); }

/* the From Logicers row as a page shows it (chat H, 20 Nov 2026, plan 2.10). info: { id: { today, week, status } } from
   the database (a game hidden there is left out). Where Logicers has the language: every game, in the homes' order.
   Elsewhere (English tiles with the EN chip): one line at every width, so a local page is never buried under English
   tiles: The Club first, then by players sent in the last 7 days (ties: the homes' order), EN_LINE at most (the CSS shows
   as many as the line holds: 4, 5 or 6; the rest is behind More, logicers.com). */
export const EN_LINE = 6, EN_KIND = 2, GAME_LG = 2;
export const lgEn = (lang) => lgRowLang(lang) !== lang;
export function lgShown(lang, info) {
  info = info || {};
  const rows = lgRow(lang).filter((g) => !info[g.id] || info[g.id].status === "listed")
    .map((g) => Object.assign({}, g, { today: info[g.id] ? info[g.id].today : 0, week: info[g.id] ? info[g.id].week : 0 }));
  if (!lgEn(lang)) return rows;
  return rows.sort((a, b) => (b.key === "club") - (a.key === "club") || b.week - a.week || a.order - b.order);
}
/* Logicers' games of one kind, for a kind page (all of them in a Logicers language; EN_KIND where they are English) */
export function lgOfKind(lang, info, kind) {
  const r = lgShown(lang, info).filter((g) => g.kind === kind);
  return lgEn(lang) ? r.slice(0, EN_KIND) : r;
}
/* two Logicers tiles for a game page, its kind first */
export function lgForGame(lang, info, kind) {
  const r = lgShown(lang, info);
  return r.filter((g) => g.kind === kind).concat(r.filter((g) => g.kind !== kind)).slice(0, GAME_LG);
}
export const LG_HOME = (lang) => SITE + "/" + (LG_LANGS.includes(lang) && lang !== "en" ? lang + "/" : "");
