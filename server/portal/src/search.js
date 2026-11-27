/* Play Logicers — search on a language's page (chat S, 24 Nov 2026; plan 2.17 item 5; claude/play-next-24nov.md, part 1).
   A language with SEARCH_MIN listed games or more (db.js; counted as the dice list counts them) has a round magnifier in
   the head of its page and its kind pages. It opens a sheet: a field and the rows' own tiles, best match first. The
   matching is done on the device (portal/a/portal.js), with one function; the Worker only gives the list and keeps the
   searches that found nothing.

     GET  /api/<lang>/names    { ok, lang, games: [[id, where, name, maker, kind, pic], ...] }: every game the language's page
                               can show, in the page's order (its From Logicers row, then its kind rows), no numbers. "where"
                               is the game's slug (its page here), or for one of Logicers' own, which has no page here, the
                               game's own address; "pic" is a maker's logo (/p/...) or the drawing of a Logicers game (its
                               key in the sprite), else null. Kept as the dice is (5 minutes, the deploy's version in the
                               edge key); a closed language: 404 nolang.
     POST /api/miss { lang, q } a search that found nothing (sent by the page once per term and page view, at 3 characters or
                               more, when the player stops typing or closes the sheet). Kept in its matched form (fold,
                               below), at most MISS.max characters, counted per language and UTC day in `misses`; dropped
                               when it holds "@", "://" or 6 digits in a row (it might be a person's address or number). No
                               device id, no address: at most NET.miss a day from one address (a keyed hash in nets, as
                               the other caps). The nightly job deletes rows older than MISS.days days.
   Only the admin key sees the misses (the queue's Searches: per language, the last 30 days' terms, most first). Never public.

   The block between "fold: from here" and "fold: to here" is the device's own matching, letter for letter the same as in
   portal/a/portal.js (test/test_s.mjs reads both files and compares them), so a term is kept exactly as the device
   compared it. */
import { json, bad, utcDay, dayAdd, brake, hashReady, isRobot, netHash } from "./util.js";
import { all, run, netStmt, changed, NET, langData, openSet, picUrl, lgLogo } from "./db.js";
import { isLang, LANG } from "./langs.js";
import { lgRowLang, lgShown } from "./logicers.js";
import { kindOrder } from "./pages.js";

export const MISS = { min: 3, max: 40, days: 90, show: 30, top: 100 };

/* fold: from here */
  /* The search's one matching function (chat S, 24 Nov 2026). A name, a maker, a kind's word or what was typed, as the search
     compares them: case and accents go (NFKD; the marks of Latin, Greek and Cyrillic letters, Hebrew points and Arabic,
     Persian and Urdu marks are taken off, and Devanagari's nukta, as Hindi is often typed without it: ज़ is ज (chat Q3);
     the vowel signs of Indic and Thai letters stay, as they are letters there); ı, İ
     and i are one, ß is ss, Greek's final sigma is sigma; the forms of alef, yeh, kaf and heh are one; katakana is
     hiragana; full and half width are one (NFKD); every script's digits are 0-9; spaces, punctuation and symbols go. On a
     Serbian page Cyrillic reads as Latin, so a game named in either script is found from the other. */
  var FOLD_ONE = { "ı": "i", "ß": "ss", "ς": "σ", "ə": "e", "ø": "o", "æ": "ae", "œ": "oe", "đ": "d", "ł": "l", "ħ": "h", "þ": "th", "ð": "d",
    "ٱ": "ا", "ى": "ی", "ي": "ی", "ك": "ک", "ة": "ه", "ە": "ه", "ہ": "ه", "ھ": "ه" };
  var FOLD_SR = { "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "ђ": "d", "е": "e", "ж": "z", "з": "z", "и": "i", "ј": "j", "к": "k",
    "л": "l", "љ": "lj", "м": "m", "н": "n", "њ": "nj", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "ћ": "c", "у": "u", "ф": "f",
    "х": "h", "ц": "c", "ч": "c", "џ": "dz", "ш": "s" };
  var FOLD_ZERO = [0x660, 0x6F0, 0x7C0, 0x966, 0x9E6, 0xA66, 0xAE6, 0xB66, 0xBE6, 0xC66, 0xCE6, 0xD66, 0xDE6, 0xE50, 0xED0, 0xF20, 0x1040, 0x1090, 0x17E0, 0x1810, 0x1946, 0x19D0];
  function fold(s, lang) {
    s = String(s == null ? "" : s).normalize("NFKD").toLowerCase()
      .replace(/[\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F\u0591-\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u093C\uFE00-\uFE0F]/g, "")
      .replace(/[ıßςəøæœđłħþðٱىيكةەہھ]/g, function (c) { return FOLD_ONE[c]; });
    if (lang === "sr") s = s.replace(/[\u0430-\u0448\u0452\u0458-\u045B\u045F]/g, function (c) { return FOLD_SR[c] || c; });
    return s.replace(/[\u30A1-\u30F6\u30FD\u30FE]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0x60); })
      .replace(/\p{Nd}/gu, function (c) {
        var n = c.codePointAt(0), i = FOLD_ZERO.length;
        while (i--) if (n >= FOLD_ZERO[i] && n < FOLD_ZERO[i] + 10) return String(n - FOLD_ZERO[i]);
        return c;
      })
      .replace(/[\p{Z}\p{P}\p{S}\p{Cc}\p{Cf}\u0640]/gu, "")
      .normalize("NFC");
  }
  /* a game as the search compares it, folded once: its name (with where each of its words starts), its maker, its kind's word */
  function foldGame(name, maker, kindWord, lang) {
    var parts = String(name == null ? "" : name).split(/[\p{Z}\p{P}\p{S}]+/u), at = [], n = "";
    for (var i = 0; i < parts.length; i++) { var f = fold(parts[i], lang); if (f) { at.push(n.length); n += f; } }
    return { n: n, at: at, m: fold(maker, lang), k: fold(kindWord, lang) };
  }
  /* where a game goes among the results for a folded query q: 0 its name starts with q, 1 a word of its name does, 2 its
     name holds q, 3 its maker or its kind's word holds it; -1 not found. Chinese, Japanese and Thai write no spaces, so
     there it is the name's start, then anywhere in it (by substring). */
  function rankOf(g, q) {
    if (!q || !g) return -1;
    var i = g.n.indexOf(q);
    if (i === 0) return 0;
    for (var w = 1; w < g.at.length; w++) if (g.n.substr(g.at[w], q.length) === q) return 1;
    if (i > 0) return 2;
    return g.m.indexOf(q) >= 0 || g.k.indexOf(q) >= 0 ? 3 : -1;
  }
/* fold: to here */

export { fold, foldGame, rankOf };

/* a search that found nothing, as it is kept: its matched form cut to MISS.max characters; null when it is too short or might
   be a person's address or number ("@", "://", 6 digits in a row, in any script: the fold makes them 0-9) */
export function missTerm(raw, lang) {
  if (typeof raw !== "string" || raw.length > 400) return null;
  const s = raw.normalize("NFKC");
  if (/@|:\/\//.test(s)) return null;
  const f = [...fold(s, lang)];
  if (f.length < MISS.min || /\d{6}/.test(f.join(""))) return null;
  return f.slice(0, MISS.max).join("");
}

/* GET /api/<lang>/names */
export async function namesApi(env, req, url, lang) {
  if (!isLang(lang) || !(await openSet(env)).has(lang)) return bad("nolang", 404);
  const lgLang = lgRowLang(lang), d = await langData(env, lang, lgLang);
  const out = lgShown(lang, d.lg).map((g) => [g.id, g.url, g.name, "Logicers", g.kind, lgLogo(g)]);
  for (const k of kindOrder(d.byKind)) for (const g of d.byKind[k]) if (g.slug) out.push([g.id, g.slug, g.name, g.maker || "", g.kind, picUrl(g)]);
  return json({ ok: true, lang, games: out }, 200, { "Cache-Control": "public, max-age=300, s-maxage=300" });
}

/* POST /api/miss { lang, q } -> { ok, kept } */
export async function miss(env, req, b) {
  if (!brake("miss", req)) return bad("busy", 429);
  if (!isLang(b.lang) || typeof b.q !== "string") return bad("bad");
  if (!(await all(env, "SELECT 1 AS k FROM langs WHERE code = ? AND open = 1", b.lang)).length) return bad("nolang", 404);
  const q = missTerm(b.q, b.lang);
  if (q === null || isRobot(req) || !hashReady(env)) return json({ ok: true, kept: false });
  const day = utcDay();
  if (!changed(await netStmt(env, await netHash(env, req, day, "miss"), NET.miss).run())) return json({ ok: true, kept: false });
  await run(env, "INSERT INTO misses (day, lang, q, n) VALUES (?, ?, ?, 1) ON CONFLICT(day, lang, q) DO UPDATE SET n = n + 1", day, b.lang, q);
  return json({ ok: true, kept: true });
}

/* the queue's Searches (admin key only): per language, the last MISS.show days' terms with how many times each was searched,
   most first (MISS.top a language at most); the languages with most searches first */
export async function searchesData(env) {
  const to = utcDay(), from = dayAdd(to, -(MISS.show - 1));
  const rows = await all(env, "SELECT lang, q, SUM(n) AS n FROM misses WHERE day >= ? GROUP BY lang, q ORDER BY lang, n DESC, q", from);
  const by = new Map();
  for (const r of rows) {
    if (!LANG.has(r.lang)) continue;
    if (!by.has(r.lang)) by.set(r.lang, { code: r.lang, endonym: LANG.get(r.lang).endonym, n: 0, terms: [] });
    const l = by.get(r.lang);
    l.n += r.n;
    if (l.terms.length < MISS.top) l.terms.push([r.q, r.n]);
  }
  return { from, to, langs: [...by.values()].sort((a, b) => b.n - a.n || a.code.localeCompare(b.code)) };
}

