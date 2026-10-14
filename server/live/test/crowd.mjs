/* Logicers Live: a crowd for the page's checks (14 Oct 2026). N players join a game and answer every
   question as it opens, with a guess somewhere on the slider and a net of each size in turn.
     node test/crowd.mjs CODE N SECONDS            (against wrangler dev on 8787) */
import { key, Client } from "./lib.mjs";
import "../src/rules.js";
const R = globalThis.HSRules;
const [code, n, secs] = [process.argv[2], +(process.argv[3] || 10), +(process.argv[4] || 60)];
const people = [];
for (let i = 0; i < n; i++) {
  const c = new Client(code);
  if (!(await c.ready)) continue;
  c.send({ t: "hello", v: 1, role: "player", key: key() });
  await c.waitT("state", () => true, 8000);
  c.send({ t: "join", name: "Crowd " + (i + 1) });
  await c.wait((m) => m.t === "state" && !!m.you, 8000);
  people.push(c);
}
console.log("joined", people.length);
const answered = new Set();
const end = Date.now() + secs * 1000;
while (Date.now() < end) {
  for (const [i, c] of people.entries()) {
    const s = c.state;
    if (s && s.ph === "question" && s.q && !answered.has(i + "/" + s.q.k)) {
      answered.add(i + "/" + s.q.k);
      const q = s.q;
      const g = R.round(q, R.val(q, ((i * 37) % 100) / 100));
      c.send({ t: "ans", k: q.k, g, n: ["s", "m", "b"][i % 3] });
    }
  }
  await new Promise((r) => setTimeout(r, 200));
}
for (const c of people) c.close();
process.exit(0);
