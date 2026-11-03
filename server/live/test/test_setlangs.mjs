/* Logicers Live: Logicers' own sets in six languages (3 Nov 2026). Run against a wrangler dev, like the other checks:
     node test/test_setlangs.mjs ../../r/live-workshop/sets-key.txt
   The host picks the game's language; the peek, every state and every question, unit, fact and title then speak it,
   while the answer, the slider and the sources stay the English set's own. English says no language at all (a page
   from before this change reads it as it always did), and a language the sets are not written in is English. */
import { BASE, ORIGIN, ok, eq, report, sets, newGame, at, player, host, someIp } from "./lib.mjs";
import { setIn } from "../src/setlang.js";

const KEYFILE = process.argv[2] || "../../r/live-workshop/sets-key.txt";
const S = await sets(KEYFILE);
const LANGS = ["it", "tr", "es", "pt", "fr"];
const peek = (code) => fetch(BASE + "/game/" + code, { headers: { Origin: ORIGIN, "CF-Connecting-IP": someIp() } }).then((r) => r.json());

/* ---------------------------------------------------------------- the sets themselves */
for (const id of Object.keys(S)) {
  const E = S[id];
  ok(E.langs && LANGS.every((l) => E.langs[l]), `${id}: written in all five languages`);
  for (const l of LANGS) {
    const T = setIn(E, l);
    ok(T.title && T.title !== E.title, `${id}/${l}: its own title (${T.title})`);
    const all = [[E.practice, T.practice]].concat(E.qs.map((q, i) => [q, T.qs[i]]));
    let same = 0, words = 0;
    for (const [q, t] of all) {
      if (["id", "a", "lo", "hi", "log", "step", "k"].every((k) => q[k] === t[k]) && JSON.stringify(q.s) === JSON.stringify(t.s)) same++;
      if (t.t !== q.t && t.f !== q.f && (q.u === "" ? t.u === "" : !!t.u)) words++;
    }
    eq(same, all.length, `${id}/${l}: every answer, slider, kind and source is the English one`);
    eq(words, all.length, `${id}/${l}: every question and fact is in the language`);
  }
  eq(setIn(E, "en"), E, `${id}: English is the set itself`);
  eq(setIn(E, "de"), E, `${id}: a language it is not written in is the set itself`);
}

/* ---------------------------------------------------------------- a game in each language */
for (const lang of ["en"].concat(LANGS)) {
  const T = setIn(S.space, lang);
  const g = await newGame({ set: "space", lang, n: 5, practice: true });
  eq(g.status, 200, `${lang}: a game is made`);
  if (g.status !== 200) continue;
  const pk = await peek(g.code);
  eq(pk.title, T.title, `${lang}: the peek says the set's title in the language`);
  eq(pk.lang, lang === "en" ? undefined : lang, `${lang}: the peek says the language (English says none)`);
  const H = await host(g.code, g.key);
  eq(H.state.g.lang, lang === "en" ? undefined : lang, `${lang}: the host's state says it`);
  eq(H.state.g.title, T.title, `${lang}: and the title`);
  const P = await player(g.code, "Ada");
  ok(P.state && P.state.you, `${lang}: a player joins`);
  eq(P.state.g.lang, lang === "en" ? undefined : lang, `${lang}: the player's state says the language too`);
  H.send({ t: "start", at: "lobby|" });
  const q0 = await P.waitState("question");
  ok(!!q0, `${lang}: the practice question opens`);
  if (!q0) continue;
  eq(q0.q.t, T.practice.t, `${lang}: the practice question in the language`);
  eq(q0.q.u, T.practice.u, `${lang}: its unit`);
  eq([q0.q.lo, q0.q.hi, q0.q.log, q0.q.step], [S.space.practice.lo, S.space.practice.hi, S.space.practice.log, S.space.practice.step], `${lang}: the English slider`);
  P.send({ t: "ans", k: q0.q.k, g: S.space.practice.a, n: "s" });
  await H.waitT("cnt", (m) => m.in === 1, 3000);
  H.send({ t: "reveal", at: at(q0) });
  const r0 = await P.waitState("reveal");
  eq(r0 && r0.rv.a, S.space.practice.a, `${lang}: the English answer`);
  eq(r0 && r0.rv.f, T.practice.f, `${lang}: the fact in the language`);
  eq(r0 && r0.rv.at, T.practice.at, `${lang}: the answer as said in the language`);
  eq(r0 && r0.rv.s, S.space.practice.s, `${lang}: the two sources, as they are`);
  eq(r0 && r0.you.res.hit, true, `${lang}: a small net on the answer catches it`);
  H.send({ t: "next", at: at(r0) });
  const q1 = await P.waitState("question");
  eq(q1 && q1.q.t, T.qs[0].t, `${lang}: question 1 in the language`);
  /* the end, then Play again with another set: the game keeps its language */
  H.send({ t: "end", at: at(q1) });
  await P.waitState("end");
  H.send({ t: "again", set: "years", at: "end|" });
  const y = await P.waitState("question");
  const TY = setIn(S.years, lang);
  eq(y && y.g.title, TY.title, `${lang}: Play again with another set keeps the language (title)`);
  eq(y && y.q.t, TY.qs[0].t, `${lang}: and its first question`);
  eq(y && y.g.lang, lang === "en" ? undefined : lang, `${lang}: and says so`);
  H.send({ t: "end", at: at(y) }); await P.waitState("end");
  H.send({ t: "finish", at: "end|" }); await P.waitT("over");
  H.close(); P.close();
}

/* ---------------------------------------------------------------- what is not a language */
for (const bad of ["de", "EN", "", 7, null, "__proto__", ["it"]]) {
  const g = await newGame({ set: "body", lang: bad });
  eq(g.status, 200, `lang ${JSON.stringify(bad)}: the game is still made`);
  if (g.status !== 200) continue;
  const pk = await peek(g.code);
  eq([pk.lang, pk.title], [undefined, S.body.title], `lang ${JSON.stringify(bad)}: in English`);
}
{
  const g = await newGame({ set: "body" });
  const pk = await peek(g.code);
  eq(pk, { title: S.body.title, np: 0, ph: "lobby", closed: false, teams: false, picked: false }, "a page that sends no language: English, and the peek exactly as before");
}

process.exit(report("test_setlangs") ? 1 : 0);
