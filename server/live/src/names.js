/* Logicers Live: names, codes and the words kept out of them (14 Oct 2026).

   A player's name: up to 14 characters, typed, or picked by Logicers ("Calm Otter"). The host can choose
   "Names chosen by Logicers" for a lecture: then nobody types, so no rude name stands in front of a hall.
   A typed name may hold letters of any language, digits, spaces and everyday punctuation, "&" included
   (names are always shown escaped). It needs at least one letter or digit, and it is refused if it holds
   < > = # ? / \ " ` | { } [ ] ^ ~, a control character, an invisible character (so it can never look
   blank), or a word from a short list of rude words in English, Italian and Turkish. A list never catches
   everything, which is why the host can remove a player with one tap; so where a rude word is also a
   piece of real names, the list lets the real names through.

   A game's code: five letters from twenty consonants (3.2 million codes), with no vowel, so a code can
   hardly spell a word; a few letter groups that still read as rude are refused all the same.
   A saved game's code (15 Oct 2026): seven letters from the same twenty (1.28 billion codes), so the one
   Join box tells it from a live game's, and a sweep finds nothing.
   A saved game's title is checked against a shorter list than a name (titleRude, below): a title is the
   maker's own text, and history, biology and geography need words a name never does. */

export const MAXNAME = 14;
/* Never in a name: the control characters (C0, DEL, C1); < > = # ? / \ " ` | { } [ ] ^ ~, which mean
   something in HTML, URLs or code; and the invisible and filler characters that could make a name look
   blank or turn the text around it: the soft hyphen U+00AD, the combining grapheme joiner U+034F, the
   Hangul fillers U+115F, U+1160, U+3164 and U+FFA0, the Mongolian vowel separator U+180E, the zero-width
   spaces, joiners and direction marks U+200B to U+200F, the line and paragraph separators, embeddings and
   overrides U+2028 to U+202E, the word joiner, invisible operators and isolates U+2060 to U+206F, the
   blank Braille pattern U+2800 and the byte order mark U+FEFF. (U+2028, U+2029 and U+FEFF count as white
   space, so cleanName has already turned them into a plain space.) All of them written as \u escapes,
   never as the characters themselves: a raw U+2028 inside a regular expression literal ends the line
   there and breaks the file. */
const BADCH = /[\u0000-\u001F\u007F-\u009F<>=#?\/\\"`|{}\[\]^~\u00AD\u034F\u115F\u1160\u180E\u200B-\u200F\u2028-\u202E\u2060-\u206F\u2800\u3164\uFEFF\uFFA0]/;

export function cleanName(s) {
  return String(s === undefined || s === null ? "" : s).normalize("NFC").replace(/\s+/g, " ").trim();
}

/* The rude words, written folded (see fold below). A name is checked one word at a time, never across two
   words: it is cut at spaces and at every character that is not a letter, a digit, a look-alike (! $ @)
   or *, which stands for a hidden letter; so . - _ ' & , ( ) and the like cut it too.
   ANYWHERE: refused even inside a longer word ("Fuckface", "Cazzone", "Orospucocugu"). Only long,
     unmistakable fragments belong here; a word that is also an ordinary piece of names goes in WHOLE.
   WHOLE: refused only as a word of its own, or with a plural s ("Nazis"), so "Dickens", "Hitchcock",
     "Scunthorpe", "Pornchai", "Slutsky", "Wankhede", "Troiano", "Grape", "The Therapists",
     "Montenegro", "Pici", "Essex" and "Nazir" pass. "shit" is here too, because inside a word it is a
     piece of many names (Yamashita, Kinoshita, Yoshito, Ishita, Shital, Kshitij, Harshit, Rishit,
     Akshit, Dikshit, Shittu, Shitov); its usual one-word compounds are in ANYWHERE. An entry of two words
     is refused when the two stand in a row ("Porco Dio"), and only then.
   NAMEPARTS: pieces of real names that hold a fragment of ANYWHERE. They are set aside before that check,
     so Cazzola, Merdan, Niggli and Niggemann pass, while "Cazzone" and "Merdaccia" are refused.
   A run of single letters is also read as one word, so "f u c k" and "f.u.c.k" are refused, while "O.C."
   reads "oc", which is on no list, and passes.
   Left out on purpose, because they are names or ordinary words: isis, got (göt), cum, oc, amina and
   anani (amına, ananı), fuk (the Cantonese name Fuk); and inside longer words, porn, slut, wank, cunt,
   troia, puttan, rapist and shit. */
const ANYWHERE = [
  "fuck", "bitch", "whore", "nigg", "faggot", "hitler", "bastard", "asshole", "arsehole", "dildo", "jizz", "retard",
  "pedophil", "paedophil", "bullshit", "shithead", "shitty", "dipshit", "cocksuck", "dickhead", "blowjob", "pornhub",
  "cazzo", "merda", "stronz", "vaffanculo", "fanculo", "coglion", "minchia", "frocio", "ricchion", "zoccola",
  "mignotta", "porcodio", "dioporco", "diocane", "pompino", "segaiol",
  "orospu", "yarrak", "sikis", "siktir", "sikerim", "sikeyim", "pezevenk", "serefsiz", "gotveren"
];
const WHOLE = [
  "dick", "cock", "cunt", "pussy", "slut", "wank", "wanker", "twat", "shit", "shite", "porn", "porno", "rape",
  "rapist", "nazi", "sieg heil", "penis", "vagina", "boobs", "tits", "kkk", "pedo", "paedo", "sex", "nigga",
  "fag", "fck",
  "figa", "fica", "culo", "negro", "vaffa", "cazz", "troia", "puttana",
  "porco dio", "dio porco", "dio cane", "porca madonna",
  "amk", "pic", "sik", "yarak", "ibne", "gavat", "kancik", "kahpe", "amcik", "yavsak", "kaltak"
];
const NAMEPARTS = ["cazzol", "merdan", "niggl", "niggem"];

/* Folded: fullwidth and "fancy" letters read as plain ones (NFKD), lower case, accents off, the Turkish
   ı ş ç ğ ö ü read as i s c g o u (ş ç ğ ö ü lose their marks with the other accents; ı, like ə ø ł đ ß
   æ œ, has none to lose and is mapped by hand), the look-alikes read as letters (0 as o, 1 and ! as i,
   3 as e, 4 as a, 5 and $ as s, 7 as t, @ as a), and anything else that is not a to z dropped. */
const LOOK = { "\u0131": "i", "\u0259": "e", "\u00F8": "o", "\u0142": "l", "\u0111": "d", "\u00DF": "ss", "\u00E6": "ae",
               "\u0153": "oe", "0": "o", "1": "i", "!": "i", "3": "e", "4": "a", "5": "s", "$": "s", "7": "t", "@": "a" };
function fold(w) {
  return w.normalize("NFKD").toLowerCase()
    .replace(/[\u0131\u0259\u00F8\u0142\u0111\u00DF\u00E6\u0153013457!$@]/g, (c) => LOOK[c])
    .replace(/[^a-z]/g, "");
}
/* A name's words, folded, read two ways: with the look-alikes as letters ("Sh1t"), and without the digits
   and signs at the two ends of each word ("Nazi1", "Dick!"). In both, a run of single letters becomes
   one word. */
function readings(s) {
  const parts = cleanName(s).normalize("NFKD").split(/[^\p{L}\p{M}\p{N}!$@*]+/u);
  return [parts.map(fold), parts.map((p) => fold(p.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, "")))].map((ws) => {
    const out = [];
    let run = "";
    for (const w of ws.filter(Boolean).concat("")) {
      if (w.length === 1) { run += w; continue; }
      if (run) out.push(run);
      if (w) out.push(w);
      run = "";
    }
    return out;
  });
}
function hit(ws) {
  const line = " " + ws.join(" ") + " ";
  if (WHOLE.some((r) => line.includes(" " + r + " ") || line.includes(" " + r + "s "))) return true;
  return ws.some((w) => {
    for (const p of NAMEPARTS) w = w.split(p).join(" ");
    return ANYWHERE.some((r) => w.includes(r));
  });
}
export function rude(s) {
  return readings(s).some(hit);
}

export function nameOk(s) {
  s = cleanName(s);
  return !!s && [...s].length <= MAXNAME && !BADCH.test(s) && /[\p{L}\p{N}]/u.test(s) && !rude(s);
}

/* Names picked by Logicers: a friendly word and an animal or a thing of the sky, never longer than 14. */
const FIRST = ["Bold", "Brave", "Calm", "Clever", "Cosy", "Eager", "Gentle", "Happy", "Keen", "Lucky", "Merry", "Nimble",
               "Quick", "Quiet", "Sunny", "Swift", "Witty", "Jolly", "Brisk", "Lively", "Proud", "Smart", "Steady", "Wise"];
const SECOND = ["Otter", "Comet", "Panda", "Falcon", "Maple", "Pebble", "Tiger", "Koala", "Lynx", "Puffin", "Heron", "Badger",
                "Robin", "Orca", "Bison", "Gecko", "Moose", "Lemur", "Ibis", "Yak", "Owl", "Fox", "Wren", "Seal"];
function rnd(n) {
  const b = new Uint32Array(1);
  crypto.getRandomValues(b);
  return b[0] % n;
}
/* a name nobody in this game has yet (taken: a Set of folded names) */
export function pickName(taken) {
  for (let i = 0; i < 60; i++) {
    const s = FIRST[rnd(FIRST.length)] + " " + SECOND[rnd(SECOND.length)];
    if (s.length <= MAXNAME && !taken.has(foldName(s))) return s;
  }
  for (let k = 2; ; k++) {
    const s = SECOND[rnd(SECOND.length)] + " " + k;
    if (!taken.has(foldName(s))) return s;
  }
}
/* two names are the same name if they differ only in case and spaces */
export function foldName(s) { return cleanName(s).toLowerCase().replace(/\s+/g, ""); }

/* ---- codes ---- */
export const CODE_LETTERS = "BCDFGHJKLMNPQRSTVWXZ";
const CODE_RUDE = ["FCK", "FK", "SHT", "CNT", "DCK", "CCK", "KKK", "WTF", "STFU", "PNS", "XXX", "NGR", "NGG", "FGT",
                   "PRN", "TWT", "WNK", "BTCH", "PSS", "JZZ", "CZZ", "MRD", "VFC", "SK", "MK", "MQ", "PC", "GT", "SS",
                   "HH", "SX", "NZ", "PDF", "PD", "DLD"];
export function codeOk(s) { return typeof s === "string" && /^[BCDFGHJKLMNPQRSTVWXZ]{5}$/.test(s); }
export function newCode() { return letters(5); }
export function kitCodeOk(s) { return typeof s === "string" && /^[BCDFGHJKLMNPQRSTVWXZ]{7}$/.test(s); }
export function newKitCode() { return letters(7); }
/* n letters, each of the twenty equally likely (a byte of 240 or more is drawn again), never a rude group */
function letters(n) {
  for (;;) {
    let s = "";
    while (s.length < n) {
      const b = new Uint8Array(n);
      crypto.getRandomValues(b);
      for (let i = 0; i < n && s.length < n; i++) if (b[i] < 240) s += CODE_LETTERS[b[i] % 20];
    }
    if (!CODE_RUDE.some((r) => s.indexOf(r) >= 0)) return s;
  }
}

/* ---- the title of a saved game ----
   Refused only for slurs and obscenities that have no use in a quiz. Left out on purpose, because a lesson
   needs them: hitler and nazi (history), sex, penis, vagina, rape (biology; rape is also a plant), dick
   (Moby Dick), cock (a rooster), troia (Troy, in Italian), negro (Spanish and Italian for black), retard
   (retardation, in physics), porn and shit (vulgar, never hateful). The same readings as a name: fullwidth,
   look-alike digits, spaced-out letters ("f u c k"). */
const T_ANYWHERE = [
  "fuck", "nigg", "faggot", "cocksuck", "blowjob", "pornhub", "jizz",
  "vaffanculo", "fanculo", "porcodio", "dioporco", "diocane", "pompino",
  "orospu", "yarrak", "sikis", "siktir", "sikerim", "sikeyim", "gotveren"
];
const T_WHOLE = [
  "cunt", "twat", "wanker", "whore", "bitch", "nigga", "fag", "kkk",
  "cazzo", "merda", "stronzo", "stronza", "coglione", "minchia", "frocio", "ricchione", "puttana", "mignotta", "zoccola",
  "porco dio", "dio porco", "dio cane",
  "amk", "amcik", "ibne", "yavsak", "kahpe", "kaltak", "pezevenk", "serefsiz"
];
export function titleRude(s) {
  return readings(s).some((ws) => {
    const line = " " + ws.join(" ") + " ";
    if (T_WHOLE.some((r) => line.includes(" " + r + " ") || line.includes(" " + r + "s ") || line.includes(" " + r + "es "))) return true;
    return ws.some((w) => {
      for (const p of NAMEPARTS) w = w.split(p).join(" ");
      return T_ANYWHERE.some((r) => w.includes(r));
    });
  });
}
