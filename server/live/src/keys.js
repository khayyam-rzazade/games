/* Logicers Live: secrets and the keys made from them (15 Oct 2026).

   One HMAC-SHA256, keyed with the server's secret SETS_KEY, with a different label for each use, so a value
   made for one use never serves another:
     "pass:" + CODE     a live game's pass (game.js): a phone in the game gets back in through the brake
     "copy:" + CODE     a saved game's copy token: whoever has it may start their own copy, and nothing more
     "way:" + PRINT     a maker's email, as the browser's fingerprint of it (kit.js setWay, way.js)
   The first two are never stored: they are worked out again whenever they are checked. The third is stored, with
   its game and as the name of its Way object, because it has to be found again from an address typed later.
   So a new SETS_KEY would make new passes (live games last hours), new copy links (the old ones would stop
   working), and would end every way back at once: no stored email would match its address any more, and each
   maker would have to set it again from the game's own edit link; nor could the desk take an address off the
   list of feedback emails (mail.js, keyed the same way) on its owner's request. It is set once and kept.
   The edit key of a saved game is not made here: it is 16 random bytes, and the server keeps only its SHA-256. */

let macKey = null;                 // { k, key }: imported once per running copy

function b64url(bytes) {
  let b = "";
  for (const x of bytes) b += String.fromCharCode(x);
  return btoa(b).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/* the first 22 characters (132 bits) of HMAC(SETS_KEY, label), or "" when the secret is missing */
export async function mac(env, label) {
  const k = env && env.SETS_KEY;
  if (!k || typeof label !== "string") return "";
  if (!macKey || macKey.k !== k) {
    const s = atob(String(k).trim()), raw = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) raw[i] = s.charCodeAt(i);
    macKey = { k, key: await crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]) };
  }
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", macKey.key, new TextEncoder().encode(label)));
  return b64url(sig).slice(0, 22);
}

/* random bytes as text: 16 bytes make an edit key of 22 characters */
export function randomKey(n) {
  const b = new Uint8Array(n || 24);
  crypto.getRandomValues(b);
  return b64url(b);
}

export async function sha(s) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(s)));
  return [...new Uint8Array(d)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

/* compared in constant time: how long a refusal takes says nothing about the secret */
export function same(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

export function keyOk(k) { return typeof k === "string" && /^[A-Za-z0-9_-]{20,64}$/.test(k); }
