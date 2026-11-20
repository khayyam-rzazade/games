/* Play Logicers — import the starting lists (Chat A, 19 Nov 2026).
     cd ~/games/server/portal
     npm run import                       every seed/*.json to https://play.logicers.com (asks for the admin key)
     npm run import -- seed/es.json       one file
     npm run import -- --to http://localhost:8787     the local run (wrangler dev)
   Each file is an array of { name, url, lang, kind, line, maker, checked } (chats S1–S4). The games go in as listed, in
   parts of 200; running it again changes nothing that is already there except a seed's name, kind, line and maker.
   The key is read from the variable ADMIN_KEY if set, else asked for (not shown while you type). */
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
let to = "https://play.logicers.com";
const files = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--to") to = args[++i];
  else files.push(args[i]);
}
if (!files.length) {
  const dir = path.join(HERE, "..", "seed");
  if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir).sort()) if (f.endsWith(".json")) files.push(path.join(dir, f));
}
if (!files.length) { console.log("No seed files (server/portal/seed/*.json)."); process.exit(1); }

function ask(q) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = (s) => { if (s.includes(q)) rl.output.write(s); };
    rl.question(q, (a) => { rl.close(); process.stdout.write("\n"); resolve(a.trim()); });
  });
}
const key = process.env.ADMIN_KEY || await ask("Admin key: ");

let added = 0, updated = 0, skipped = 0;
for (const f of files) {
  let games;
  try { games = JSON.parse(fs.readFileSync(f, "utf8")); } catch (e) { console.log(path.basename(f) + ": not JSON (" + e.message + ")"); continue; }
  if (!Array.isArray(games)) { console.log(path.basename(f) + ": not a list"); continue; }
  for (let i = 0; i < games.length; i += 200) {
    const part = games.slice(i, i + 200);
    const res = await fetch(to.replace(/\/+$/, "") + "/admin/import", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key, games: part }) });
    const r = await res.json().catch(() => ({ ok: false, e: "answer " + res.status }));
    if (!r.ok) { console.log(path.basename(f) + ": " + r.e); process.exit(1); }
    added += r.added; updated += r.updated; skipped += r.skipped.length;
    for (const s of r.skipped) console.log("  " + path.basename(f) + " #" + (i + s.i + 1) + " skipped: " + s.e + "  " + (part[s.i] && part[s.i].url || ""));
    if (r.opened && r.opened.length) console.log("  opened: " + r.opened.join(", "));
  }
  console.log(path.basename(f) + ": done");
}
console.log(`Added ${added}, updated ${updated}, skipped ${skipped}.`);
