/* Logicers Live: the checks on names and codes (14 Oct 2026). No server needed:
     node test/test_names.mjs
   Real names pass (the ones a review found refused, and more like them), rude ones are refused, the
   characters that could break a page or hide a name are kept out, and the names picked by Logicers and
   the game codes always pass their own rules. Characters that are hard to see are built from their code
   points, never typed. */
import { ok, report } from "./lib.mjs";
import { readFileSync } from "node:fs";
import * as N from "../src/names.js";
const { cleanName, nameOk, rude, pickName, foldName, MAXNAME, codeOk, newCode, CODE_LETTERS } = N;

const ch = (...cps) => String.fromCodePoint(...cps);
const hex = (s) => [...s].map((c) => "U+" + c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")).join(" ");
const BS = String.fromCharCode(92);                       // a backslash
let bad = 0;                                              // failures in the current part
const check = (cond, what) => { ok(cond, what); if (!cond) bad++; };
const part = (title) => { console.log((bad ? "FAIL " : "ok   ") + title); bad = 0; };

/* ---------------------------------------------------------------- real names pass */
{
  const REVIEW = ["Amina", "Aminata", "Samina", "Ivana Nikolic", "Diana Nikolova", "Ana Nielsen", "Hana Nilsson", "Kanani",
    "Pornchai", "Porntip", "Troiano", "Puttanna", "Wankhede", "Slutsky", "Scunthorpe", "Stamina", "The Therapists",
    "We Got This", "Cum Laude", "O.C.", "Tom & Jerry", "Isis", "Dickens", "Hitchcock", "Grape", "Montenegro", "Pici",
    "Essex", "Nazir", "Ahmet Y" + ch(0x131) + "lmaz", ch(0x15E) + ch(0xFC) + "kr" + ch(0xFC), ch(0xC7) + "a" + ch(0x11F) + "la",
    ch(0x130) + "pek", ch(0xD6) + "l" + ch(0xE7) + ch(0xFC)];
  for (const n of REVIEW) check(nameOk(n), "a name from the review passes: " + n);
  check(REVIEW.length === 34, "all 34 names from the review are here");
  part("the " + REVIEW.length + " names a review found refused now pass");
}
{
  const MORE = [
    // "shit" counts only as a word of its own: inside a word it is a piece of many names
    "Yamashita", "Kinoshita", "Yoshito", "Ishita", "Shital", "Kshitij", "Harshit Rana", "Rishit", "Akshit", "Dikshit",
    "Danny Shittu", "Shitov",
    // pieces of names set aside before the check inside words
    "Cazzola", "Merdan", "Niggli", "Niggemann",
    // words refused only on their own, here inside longer words or names
    "Penistone", "Sussex", "Sexton", "Cockburn", "Peacock", "Dickinson", "Cumming", "Sikora", "Sikander", "Pussycats",
    "Naz" + ch(0x131) + "m Hikmet", "Shiitake",
    // a word of a two-word entry, on its own or next to another word
    "Porco Rosso", "Dio", "Cane", "Madonna",
    // initials, punctuation, other scripts, and letters that need folding by hand
    "J.R.R. Tolkien", "A.J. Styles", "Jean-Luc", "D'Angelo", "O'Brien", "Chan Fuk Wing", "Ph" + ch(0xFA) + "c",
    "M" + ch(0x259) + "rdan", ch(0x141) + "ukasz", "S" + ch(0xF8) + "ren", ch(0x674E, 0x5A1C), ch(0x410, 0x43D, 0x43D, 0x430),
    ch(0x623, 0x645, 0x64A, 0x646, 0x629), "Ana " + ch(0x1F98A), "007", "Ana!", "B&B"];
  for (const n of MORE) check(nameOk(n), "a real name passes: " + n);
  // Sukru Caglayan typed with its five accents as separate marks: composed first, so 14 characters, not 19
  const nfd = "S" + ch(0x327) + "u" + ch(0x308) + "kru" + ch(0x308) + " C" + ch(0x327) + "ag" + ch(0x306) + "layan";
  check([...nfd].length === 19 && [...cleanName(nfd)].length === MAXNAME && nameOk(nfd), "a 14-letter name typed with separate accents passes");
  part("more real names pass (" + (MORE.length + 1) + ": Yamashita, Harshit, Shittu, Cazzola, Merdan, Peacock, initials, other scripts)");
}

/* ---------------------------------------------------------------- rude names are refused */
{
  const ASKED = ["Fuck", "f u c k", "sh1t", "Cazzo", "vaffa", "Orospu", "Sik", "Siki" + ch(0x15F), "Nazi", "Hitler", "Big Dick"];
  for (const n of ASKED) check(!nameOk(n) && rude(n), "refused as rude: " + n);
  const dotless = "Sik" + ch(0x131, 0x15F), caps = "S" + ch(0x130) + "K" + ch(0x130) + ch(0x15E);
  check(!nameOk(dotless) && !nameOk(caps), "refused as rude: " + dotless + " (dotless i) and " + caps + " (capitals) too");
  part("the rude names asked for are refused (" + ASKED.length + ")");
}
{
  const MORE = ["f.u.c.k", "F-U-C-K", "F*ck", "Fuckface", "Sh!t", "$hit", "Shits", "Bullshit", "Shithead", "Holy Shit",
    "Cazzone", "Testadicazzo", "Vaffanculo", "Porco Dio", "Dio Cane", "Merdaccia", "Puttana", "Troia",
    "Siktir", "Amk", "Pi" + ch(0xE7), "Yarrak", "Orospu" + ch(0xE7) + "ocu" + ch(0x11F) + "u", "Kahpe",
    "Nazis", "N4zi", "Nazi1", "Nazi!", "H1tler", "Sieg Heil", "Big D.I.C.K.", "Dick!", "K K K", "Cocksucker", "Wanker",
    "Pornhub", "Nigga",
    ch(0x1D405, 0x1D42E, 0x1D41C, 0x1D424),              // mathematical bold letters
    ch(0xFF26, 0xFF35, 0xFF23, 0xFF2B),                  // fullwidth letters
    ch(0x24BB, 0x24E4, 0x24D2, 0x24DA)];                 // circled letters
  for (const n of MORE) check(!nameOk(n) && rude(n), "refused as rude: " + n);
  part("more rude names are refused (" + MORE.length + ": spaced out, look-alikes, plurals, two-word entries, fancy letters)");
}

/* ---------------------------------------------------------------- characters */
{
  check(!nameOk("<b>"), "refused: <b>");
  check(!nameOk("   ") && !nameOk("") && !nameOk(null) && !nameOk(undefined), "refused: spaces only, or nothing");
  check(!nameOk("Abcdefghijklmno") && nameOk("Abcdefghijklmn"), "15 characters are refused, 14 pass");
  check(!nameOk(ch(0x3164, 0x3164, 0x3164)), "refused: three Hangul fillers (U+3164)");
  check(!nameOk("Ana" + ch(0x2060)), "refused: Ana and a word joiner (U+2060)");
  check(!nameOk(ch(0xFEFF)), "refused: a byte order mark alone (U+FEFF)");
  check(nameOk("Tom & Jerry") && nameOk("B&B") && nameOk("&Co"), "& is allowed");
  for (const c of ["<", ">", "=", "#", "?", "/", BS, '"', "`", "|", "{", "}", "[", "]", "^", "~"]) check(!nameOk("An" + c + "a"), "refused: " + c);
  // control characters: refused; tab, new line and the like count as white space, which cleanName makes a plain space
  for (let k = 0; k <= 0x9F; k = k === 0x1F ? 0x7F : k + 1) {
    const c = ch(k), n = "An" + c + "a";
    check(/\s/.test(c) ? cleanName(n) === "An a" : !nameOk(n), "control character " + hex(c) + " never reaches a name");
  }
  // invisible and filler characters: refused; the three of them that count as white space are made a plain space
  const INVISIBLE = [0x115F, 0x1160, 0x3164, 0xFFA0, 0x2800, 0x180E, 0x00AD, 0x034F, 0xFEFF];
  for (let k = 0x200B; k <= 0x200F; k++) INVISIBLE.push(k);
  for (let k = 0x2028; k <= 0x202E; k++) INVISIBLE.push(k);
  for (let k = 0x2060; k <= 0x206F; k++) INVISIBLE.push(k);
  for (const k of INVISIBLE) {
    const c = ch(k);
    check(/\s/.test(c) ? cleanName("An" + c + "a") === "An a" : !nameOk("An" + c + "a"), "invisible " + hex(c) + " never reaches a name");
    check(!nameOk(c) && !nameOk(c + c + c), "a name of nothing but " + hex(c) + " is refused");
  }
  check(INVISIBLE.length === 9 + 5 + 7 + 16, "every invisible character asked for is checked (" + INVISIBLE.length + ")");
  check(!nameOk(ch(0x301)) && !nameOk("!!!") && !nameOk("...") && !nameOk(ch(0x1F98A, 0x1F98A)), "a name needs a letter or a digit");
  part("characters: & allowed; < > = # ? / " + BS + " \" ` | { } [ ] ^ ~, control and invisible characters kept out");
}

/* ---------------------------------------------------------------- names picked by Logicers */
{
  const fresh = Array.from({ length: 300 }, () => pickName(new Set()));
  const odd = fresh.find((n) => !/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(n) || [...n].length > MAXNAME || !nameOk(n));
  check(!odd, "a picked name is two words like Calm Otter, at most 14 characters, and passes nameOk" + (odd ? " (not: " + odd + ")" : ""));
  // one game that keeps picking: the pairs run out, then names get a number
  const taken = new Set();
  let fault = null, numbered = 0;
  for (let i = 0; i < 1500; i++) {
    const n = pickName(taken);
    if (!(typeof n === "string" && [...n].length <= MAXNAME && nameOk(n) && !taken.has(foldName(n)))) fault = fault || String(n);
    if (/\d/.test(n)) numbered++;
    taken.add(foldName(n));
  }
  check(!fault, "1500 names picked in one game: each at most 14 characters, passing nameOk, not taken yet" + (fault ? " (not: " + fault + ")" : ""));
  check(taken.size === 1500, "all 1500 different");
  check(numbered > 0, "when the pairs run out, a name gets a number (" + numbered + " did)");
  part("names picked by Logicers (1800)");
}

/* ---------------------------------------------------------------- codes */
{
  const src = readFileSync(new URL("../src/names.js", import.meta.url), "utf8");
  const m = /CODE_RUDE\s*=\s*\[([^\]]*)\]/.exec(src);
  const groups = m ? [...m[1].matchAll(/"([A-Z]+)"/g)].map((x) => x[1]) : [];
  check(groups.length >= 10, "the refused letter groups, read from names.js (" + groups.length + ")");
  const codes = Array.from({ length: 20000 }, () => newCode());
  const notOk = codes.find((c) => !codeOk(c));
  check(!notOk, "every new code passes codeOk" + (notOk ? " (not: " + notOk + ")" : ""));
  const rudeCode = codes.find((c) => groups.some((g) => c.includes(g)));
  check(!rudeCode, "no new code holds a refused letter group" + (rudeCode ? " (" + rudeCode + ")" : ""));
  check(codes.every((c) => [...c].every((l) => CODE_LETTERS.includes(l))), "codes use only the twenty consonants");
  const spread = new Set(codes).size;
  check(spread > 19500, "codes are spread out (" + spread + " different in 20000)");
  check(codeOk("BCDFG") && !codeOk("AEIOU") && !codeOk("bcdfg") && !codeOk("BCDF") && !codeOk("BCDFGH") && !codeOk(12345) && !codeOk(null),
    "codeOk: five capital consonants, nothing else");
  part("game codes (20000)");
}

/* ---------------------------------------------------------------- the module itself */
{
  const keys = Object.keys(N).sort();
  check(keys.join(" ") === "CODE_LETTERS MAXNAME cleanName codeOk foldName kitCodeOk nameOk newCode newKitCode pickName rude titleRude", "the exports: " + keys.join(" "));
  /* saved games' codes (15 Oct 2026): seven of the same twenty letters, told apart from a live game's five */
  const kc = N.newKitCode();
  check(N.kitCodeOk(kc) && !N.codeOk(kc) && !N.kitCodeOk(N.newCode()) && !N.kitCodeOk("BCDFGHJ".toLowerCase()) && !N.kitCodeOk("BCDFGHA"), "a saved game's code: seven consonants, never a live game's");
  /* a title's own list: slurs and obscenities, never the words a lesson needs */
  const fine = ["Economics 101: warm-up", "La guerra di Troia", "Hitler and the Weimar Republic", "Biology: sex chromosomes", "Moby Dick", "Rapeseed oil", "Retardation in physics", "Negro in Italian art", "Merdan Bey", "Cazzola family", "Nazi Germany 1933-45", "The penis and the vagina: anatomy", "Shitake mushrooms", "Scunthorpe United", "Pornography laws in the EU", "Il cazzotto", "Sikh history"];
  const bad = ["Fuck this quiz", "f u c k", "Ｆｕｃｋ", "Porco Dio", "Orospu", "Bitches", "Il Cazzo", "Siktir git", "Sikiş", "Nigga please", "c.u.n.t", "Faggots", "Vaffanculo a tutti"];
  const fp = fine.filter((x) => N.titleRude(x)), fn = bad.filter((x) => !N.titleRude(x));
  check(!fp.length && !fn.length, "titleRude: " + JSON.stringify({ refused: fp, passed: fn }));
  check(MAXNAME === 14 && CODE_LETTERS === "BCDFGHJKLMNPQRSTVWXZ", "MAXNAME is 14 and CODE_LETTERS the twenty consonants");
  check(cleanName("  Ana " + ch(9) + "  Lee ") === "Ana Lee" && foldName(" Marta  Rossi ") === "martarossi", "cleanName and foldName tidy as before");
  check(rude("Fuck") === true && rude("Ana") === false, "rude answers true or false");
  const src = readFileSync(new URL("../src/names.js", import.meta.url), "utf8");
  const raw = [...src].filter((c) => c.codePointAt(0) >= 0x2000 && c.codePointAt(0) <= 0x206F);
  check(raw.length === 0, "names.js holds no raw character from U+2000 to U+206F" + (raw.length ? " (" + hex(raw.join("")) + ")" : ""));
  part("names.js: the same exports, and no raw invisible character in its source");
}

process.exit(report("name checks") ? 1 : 0);
