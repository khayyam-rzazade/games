/* Logicers Live: the languages a made game can speak (28 Oct 2026: Spanish, Brazilian Portuguese and French join
   English, Italian and Turkish). Run against a wrangler dev, like the other checks:
     LIVE_URL=http://127.0.0.1:8787 node test/test_langs.mjs
   A saved game keeps its language, a player's page is told it, and a language the games do not speak falls back
   to English. */
import { BASE, ORIGIN, ok, eq, report, someIp } from "./lib.mjs";

function post(path, body, ip = someIp()) {
  return fetch(BASE + path, { method: "POST", headers: { "Content-Type": "application/json", Origin: ORIGIN, "CF-Connecting-IP": ip }, body: JSON.stringify(body) })
    .then(async (r) => ({ status: r.status, ...(await r.json().catch(() => ({}))) }));
}
function get(path, ip = someIp()) {
  return fetch(BASE + path, { headers: { Origin: ORIGIN, "CF-Connecting-IP": ip } }).then(async (r) => ({ status: r.status, ...(await r.json().catch(() => ({}))) }));
}
const QS = [{ id: "qtf001", type: "tf", t: "True or false?", r: true }];
const kit = (lang) => ({ v: 1, title: "Languages", line: "", lang, colour: "teal", qs: QS });

for (const lang of ["en", "it", "tr", "es", "pt", "fr"]) {
  const ip = someIp();
  const k = await post("/kit", { v: 1, kit: kit(lang) }, ip);
  eq(k.status, 200, `a game in ${lang} is saved`);
  if (k.status !== 200) continue;
  const info = await get("/kit/" + k.code, ip);
  eq(info.lang, lang, `a player's page is told the game speaks ${lang}`);
  const open = await post("/kit/" + k.code + "/open", { edit: k.edit }, ip);
  eq(open.kit && open.kit.lang, lang, `its maker gets it back in ${lang}`);
}
{
  const ip = someIp();
  const k = await post("/kit", { v: 1, kit: kit("de") }, ip);
  if (k.status === 200) eq((await get("/kit/" + k.code, ip)).lang, "en", "a language the games do not speak becomes English");
  else ok(k.status === 400, "a language the games do not speak is refused or becomes English");
}
process.exit(report("test_langs") ? 1 : 0);
