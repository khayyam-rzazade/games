/* Play Logicers — the words of the pages (plan 2.4), one flat JSON file per language in words/<code>.json ({"key": "text"}).
   en.json by chat A; the eleven other launch files start as English copies for chat C to replace. A language with no file
   (or a key missing from its file) falls back to English. One import line per file below: a new language's file needs its
   line (test/test_words.mjs fails while a file in words/ has none).
   Plural forms (beyond 2.4, optional): "players_today.one", ".few", ".many", ".two", ".zero" are used when
   Intl.PluralRules of the language picks that form; else the plain key. English has "players_today.one". */
import en from "../words/en.json" with { type: "json" };
import es from "../words/es.json" with { type: "json" };
import pt from "../words/pt.json" with { type: "json" };
import fr from "../words/fr.json" with { type: "json" };
import de from "../words/de.json" with { type: "json" };
import it from "../words/it.json" with { type: "json" };
import tr from "../words/tr.json" with { type: "json" };
import ru from "../words/ru.json" with { type: "json" };
import pl from "../words/pl.json" with { type: "json" };
import nl from "../words/nl.json" with { type: "json" };
import ja from "../words/ja.json" with { type: "json" };
import ko from "../words/ko.json" with { type: "json" };
import { htmlLang } from "./langs.js";

export const WORDS = { en, es, pt, fr, de, it, tr, ru, pl, nl, ja, ko };
export const KEYS = Object.keys(en);

/* a language's words: its own file over English */
const cache = new Map();
export function wordsOf(lang) {
  let w = cache.get(lang);
  if (!w) { w = Object.assign({}, en, WORDS[lang] || {}); cache.set(lang, w); }
  return w;
}
/* one word */
export const word = (lang, key) => wordsOf(lang)[key] ?? en[key] ?? key;

/* a number as the language writes it (1,234 / 1.234 / 1 234) */
export function num(lang, n) {
  try { return new Intl.NumberFormat(htmlLang(lang)).format(n); } catch (x) { return String(n); }
}
/* the key for n: "players_today.one" when the language says "one" for n and the file has that form */
export function pluralKey(lang, key, n) {
  let cat = "other";
  try { cat = new Intl.PluralRules(htmlLang(lang)).select(n); } catch (x) { /* other */ }
  const own = WORDS[lang] || en;                    // a plural form comes only from the language's own file, never from English
  return cat !== "other" && own[key + "." + cat] !== undefined ? key + "." + cat : key;
}
/* "{n} players today" split around the number: [before, after] (the number may sit anywhere in a language's sentence) */
export function aroundN(lang, key, n) {
  const s = word(lang, pluralKey(lang, key, n));
  const i = s.indexOf("{n}");
  return i < 0 ? [s + " ", ""] : [s.slice(0, i), s.slice(i + 3)];
}
export const withN = (lang, key, n) => word(lang, pluralKey(lang, key, n)).replace("{n}", num(lang, n));

/* the words of the claim pages (claim.), the maker's form (maker.) and the To tell email (mail.) (chat N, 22 Nov 2026): only
   those pages carry them in their data, so the other pages stay small */
export const OWN_WORDS = /^(claim|maker|mail)\./;
/* a word with its marks filled: fill("es", "mail.on", { game, play, page }); a mark it is not given stays as it is */
export const fill = (lang, key, marks) => word(lang, key).replace(/\{([a-z]+)\}/g, (m, k) => (marks && Object.prototype.hasOwnProperty.call(marks, k) ? String(marks[k]) : m));
/* the language of a page that has none of its own (the maker's form, a claim link that works no more): the first of the
   browser's languages (Accept-Language, by its q order) that has a words file, else English */
export function bestLang(header) {
  const tags = String(header || "").split(",").map((p, i) => {
    const [t, ...rest] = p.trim().split(";");
    const q = rest.map((x) => x.trim()).find((x) => x.startsWith("q="));
    return { t: t.trim().toLowerCase(), q: q ? parseFloat(q.slice(2)) : 1, i };
  }).filter((x) => x.t && x.t !== "*" && x.q > 0).sort((a, b) => b.q - a.q || a.i - b.i);
  for (const { t } of tags) {
    const base = t.split("-")[0];
    const c = base === "zh" ? (/-(tw|hk|mo|hant)\b/.test(t) ? "zh-hant" : "zh-hans") : base === "nb" || base === "nn" ? "no" : base === "tl" ? "fil" : base;
    if (WORDS[t]) return t;
    if (WORDS[c]) return c;
  }
  return "en";
}
