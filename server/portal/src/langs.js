/* Play Logicers — the languages (Chat A, 19 Nov 2026). Fixed in code, never translated; the database keeps only which are
   open (table langs). Plan section 2.13: 12 at launch, 18 in phase 2, 20 later.
   Each row: code (in addresses only, never shown), endonym (the language's own name, as its speakers write it and
   capitalised as a name), play_word (the first word of the page's name: "Play" everywhere, Polish "Graj": Play is a
   big mobile carrier in Poland, play.pl), dir (ltr | rtl), group (launch | phase2 | later).
   The page's name is play_word + name_lang, where name_lang is the endonym unless a row sets its own: chat C may make
   the Polish page "Graj po polsku" (name_lang "po polsku") instead of "Graj Polski"; the endonym on the wall stays "Polski".
   Chinese is already split in two (zh-hans, zh-hant; plan 2.1 says it splits when Chinese opens): a game sent today for
   Chinese then needs no move later. So 51 rows for the plan's 50 languages.
   A new language: its words file (words/<code>.json + one import line in src/words.js), its row here (and the one-time
   check of 2.2 for a local "Play" brand), its starting games.
   Chat X, 23 Nov 2026, checked the 19 rows of waves 1 and 2 (uk cs ro hu sv no da fi el ca az id vi, then he ar fa th
   zh-hans zh-hant): each endonym as its speakers write it in a language list (Wikipedia's and the big sites' pickers),
   capitalised as a name; Hebrew, Arabic and Persian right to left; "Play" for all of them until the words chats' check of
   2.2. Norwegian is Bokmål: the page says lang="nb" (tag), as no.wikipedia.org does; the code in addresses stays "no".
   Azerbaijani "Azərbaycanca" (Wikipedia's own name for it; "Play Azərbaycanca" reads "play in Azerbaijani") is for
   Khayyam to confirm.
   Chat R, 24 Nov 2026 (wave 2): nu, where a row has it, is the language's own digits (Unicode's numbering systems): Arabic
   writes ٠١٢٣ (arab), Persian ۰۱۲۳ (arabext). Without it a browser picks by its own data, and they differ: newer ones write
   Arabic with 0123, older ones (and the Worker, by its own version) with ٠١٢٣. So every number the server or a device
   writes is formatted with numTag(code), "ar-u-nu-arab", and both write the same digits. Hebrew, Thai and Chinese write
   0123 (no nu).
   Chat S, 24 Nov 2026 (wave 3, the 20 "later" rows checked): each endonym as its speakers write it in a language list
   (Wikipedia's and the big sites' pickers), capitalised as a name where the script has capitals. Serbian is written in
   Cyrillic ("sr" is Cyrillic in CLDR, Wikipedia's default, Google and Android; Serbian games in either script go on its one
   page) and Kazakh in Cyrillic ("Қазақша", as its Wikipedia and big sites write it today). Urdu runs right to left.
   Digits as the big native sites write them: Bengali in its own (Prothom Alo: ২২,০০০, ১০ নভেম্বর), so nu "beng"; Urdu in
   0123 (Jang: 24؍ نومبر 2026ء), set as nu "latn" so no browser picks Urdu's other digits; Hindi (Aaj Tak), Tamil (Dinamalar)
   and the others 0123 (no nu). Georgian, Devanagari, Bengali, Tamil and Urdu are drawn by the visitor's own fonts, as Thai
   and Chinese are; Geologica holds every letter of the Latin and Cyrillic names (src/glyphs.js). */

export const LANGS = [
  /* launch (12) */
  { code: "en", endonym: "English", play_word: "Play", dir: "ltr", group: "launch" },
  { code: "es", endonym: "Español", play_word: "Play", dir: "ltr", group: "launch" },
  { code: "pt", endonym: "Português", play_word: "Play", dir: "ltr", group: "launch" },
  { code: "fr", endonym: "Français", play_word: "Play", dir: "ltr", group: "launch" },
  { code: "de", endonym: "Deutsch", play_word: "Play", dir: "ltr", group: "launch" },
  { code: "it", endonym: "Italiano", play_word: "Play", dir: "ltr", group: "launch" },
  { code: "tr", endonym: "Türkçe", play_word: "Play", dir: "ltr", group: "launch" },
  { code: "ru", endonym: "Русский", play_word: "Play", dir: "ltr", group: "launch" },
  { code: "pl", endonym: "Polski", play_word: "Graj", name_lang: "po polsku", dir: "ltr", group: "launch" },
  { code: "nl", endonym: "Nederlands", play_word: "Play", dir: "ltr", group: "launch" },
  { code: "ja", endonym: "日本語", play_word: "Play", dir: "ltr", group: "launch" },
  { code: "ko", endonym: "한국어", play_word: "Play", dir: "ltr", group: "launch" },
  /* phase 2 (18; Chinese as two rows) */
  { code: "uk", endonym: "Українська", play_word: "Play", dir: "ltr", group: "phase2" },
  { code: "sv", endonym: "Svenska", play_word: "Play", dir: "ltr", group: "phase2" },
  { code: "no", endonym: "Norsk", play_word: "Play", dir: "ltr", group: "phase2", tag: "nb" },
  { code: "da", endonym: "Dansk", play_word: "Play", dir: "ltr", group: "phase2" },
  { code: "fi", endonym: "Suomi", play_word: "Play", dir: "ltr", group: "phase2" },
  { code: "cs", endonym: "Čeština", play_word: "Play", dir: "ltr", group: "phase2" },
  { code: "hu", endonym: "Magyar", play_word: "Play", dir: "ltr", group: "phase2" },
  { code: "ro", endonym: "Română", play_word: "Play", dir: "ltr", group: "phase2" },
  { code: "el", endonym: "Ελληνικά", play_word: "Play", dir: "ltr", group: "phase2" },
  { code: "he", endonym: "עברית", play_word: "Play", dir: "rtl", group: "phase2" },
  { code: "ca", endonym: "Català", play_word: "Play", dir: "ltr", group: "phase2" },
  { code: "id", endonym: "Bahasa Indonesia", play_word: "Play", dir: "ltr", group: "phase2" },
  { code: "vi", endonym: "Tiếng Việt", play_word: "Play", dir: "ltr", group: "phase2" },
  { code: "th", endonym: "ไทย", play_word: "Play", dir: "ltr", group: "phase2" },
  { code: "ar", endonym: "العربية", play_word: "Play", dir: "rtl", group: "phase2", nu: "arab" },
  { code: "fa", endonym: "فارسی", play_word: "Play", dir: "rtl", group: "phase2", nu: "arabext" },
  { code: "zh-hans", endonym: "简体中文", play_word: "Play", dir: "ltr", group: "phase2", tag: "zh-Hans" },
  { code: "zh-hant", endonym: "繁體中文", play_word: "Play", dir: "ltr", group: "phase2", tag: "zh-Hant" },
  { code: "az", endonym: "Azərbaycanca", play_word: "Play", dir: "ltr", group: "phase2" },
  /* later (20) */
  { code: "hr", endonym: "Hrvatski", play_word: "Play", dir: "ltr", group: "later" },
  { code: "sr", endonym: "Српски", play_word: "Play", dir: "ltr", group: "later" },
  { code: "bg", endonym: "Български", play_word: "Play", dir: "ltr", group: "later" },
  { code: "sk", endonym: "Slovenčina", play_word: "Play", dir: "ltr", group: "later" },
  { code: "sl", endonym: "Slovenščina", play_word: "Play", dir: "ltr", group: "later" },
  { code: "lt", endonym: "Lietuvių", play_word: "Play", dir: "ltr", group: "later" },
  { code: "lv", endonym: "Latviešu", play_word: "Play", dir: "ltr", group: "later" },
  { code: "et", endonym: "Eesti", play_word: "Play", dir: "ltr", group: "later" },
  { code: "eu", endonym: "Euskara", play_word: "Play", dir: "ltr", group: "later" },
  { code: "gl", endonym: "Galego", play_word: "Play", dir: "ltr", group: "later" },
  { code: "cy", endonym: "Cymraeg", play_word: "Play", dir: "ltr", group: "later" },
  { code: "ms", endonym: "Bahasa Melayu", play_word: "Play", dir: "ltr", group: "later" },
  { code: "fil", endonym: "Filipino", play_word: "Play", dir: "ltr", group: "later" },
  { code: "hi", endonym: "हिन्दी", play_word: "Play", dir: "ltr", group: "later" },
  { code: "bn", endonym: "বাংলা", play_word: "Play", dir: "ltr", group: "later", nu: "beng" },
  { code: "ur", endonym: "اردو", play_word: "Play", dir: "rtl", group: "later", nu: "latn" },
  { code: "ta", endonym: "தமிழ்", play_word: "Play", dir: "ltr", group: "later" },
  { code: "sw", endonym: "Kiswahili", play_word: "Play", dir: "ltr", group: "later" },
  { code: "kk", endonym: "Қазақша", play_word: "Play", dir: "ltr", group: "later" },
  { code: "ka", endonym: "ქართული", play_word: "Play", dir: "ltr", group: "later" },
];

export const LANG = new Map(LANGS.map((l) => [l.code, l]));
export const CODES = LANGS.map((l) => l.code);
export const LAUNCH = LANGS.filter((l) => l.group === "launch").map((l) => l.code);
export const isLang = (c) => typeof c === "string" && LANG.has(c);
/* the value of <html lang> */
export const htmlLang = (c) => (LANG.get(c) && LANG.get(c).tag) || c;
/* the locale for numbers and dates: the language's tag with its own digits (chat R): "ar-u-nu-arab", "fa-u-nu-arabext", else htmlLang */
export const numTag = (c) => htmlLang(c) + (LANG.get(c) && LANG.get(c).nu ? "-u-nu-" + LANG.get(c).nu : "");
/* the page's name in two parts: ["Play", "Español"], ["Graj", "Polski"] */
export function nameParts(c) {
  const l = LANG.get(c);
  return l ? [l.play_word, l.name_lang || l.endonym] : ["Play", c];
}
export const pageName = (c) => nameParts(c).join(" ");
/* every language's endonym, sorted as the add sheet on the wall lists them */
export function byEndonym() {
  const col = new Intl.Collator("en");
  return LANGS.slice().sort((a, b) => col.compare(a.endonym, b.endonym));
}
