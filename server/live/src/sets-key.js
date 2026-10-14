/* Logicers Live: reading the encrypted question sets (14 Oct 2026). The sets travel encrypted in
   sets.js (the repository is the published site); the key is the secret SETS_KEY, set once in
   Cloudflare's dashboard. Decrypted once per running copy and kept in memory. */
import { SETS } from "./sets.js";

let cache = null;          // { key, sets: { id: set } }

function bytes(b64) {
  const s = atob(String(b64).trim());
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

/* The sets, by id: { years: { id, title, line, practice, qs: [...] }, space: ... }.
   Throws when the key is missing or wrong: the Worker then says plainly that the sets cannot be read. */
export async function loadSets(env) {
  const k = env && env.SETS_KEY;
  if (!k) throw new Error("SETS_KEY is not set");
  if (cache && cache.key === k) return cache.sets;
  const key = await crypto.subtle.importKey("raw", bytes(k), "AES-GCM", false, ["decrypt"]);
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: bytes(SETS.iv), additionalData: new TextEncoder().encode("logicers-live-sets") },
    key, bytes(SETS.data));
  const all = JSON.parse(new TextDecoder().decode(plain));
  const sets = {};
  for (const s of all.sets) sets[s.id] = s;
  cache = { key: k, sets };
  return sets;
}
