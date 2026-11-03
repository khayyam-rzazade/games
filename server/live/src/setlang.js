/* Logicers Live: Logicers' own sets in the languages they are written in (3 Nov 2026). Its own file, with nothing
   of the Worker in it, so the checks (test/test_setlangs.mjs) can load it in node. */

/* the languages Logicers' own sets are written in: the host picks one, and every screen of the game speaks it */
export const SET_LANGS = ["en", "it", "tr", "es", "pt", "fr"];

/* One of Logicers' own sets in a language (3 Nov 2026). The set holds its words in every language it is written in,
   langs: { it: { title, line, qs: { "<id>": { t, u, at, f } } }, ... }, the practice under the id "P". Only words
   change: the answer, the slider, the kind and the sources are the English set's own, so no figure can differ from one
   language to another. A word a translation lacks stays English; English, or a language the set lacks, is the set. */
export function setIn(S, lang) {
  const T = S && lang && lang !== "en" && S.langs && Object.hasOwn(S.langs, lang) ? S.langs[lang] : null;
  if (!T) return S;
  const qs = T.qs && typeof T.qs === "object" ? T.qs : {};
  const word = (x, k, q) => (x && typeof x[k] === "string" && (x[k] || k === "u") ? x[k] : q[k]);
  const one = (q) => {
    const x = q && Object.hasOwn(qs, q.id) ? qs[q.id] : null;
    return x ? Object.assign({}, q, { t: word(x, "t", q), u: word(x, "u", q), at: word(x, "at", q), f: word(x, "f", q) }) : q;
  };
  return Object.assign({}, S, {
    title: typeof T.title === "string" && T.title ? T.title : S.title,
    line: typeof T.line === "string" && T.line ? T.line : S.line,
    practice: S.practice ? one(S.practice) : S.practice,         // the practice's id is "P"
    qs: S.qs.map(one)
  });
}
