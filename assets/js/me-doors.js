/* Logicers — My Logicers: the password door and the questions door, the phone's side (Chat A3, 7 Nov 2026;
   claude/me-plan.md 3c, 3e). The page (me/, Chat B) calls these and shows its own words; nothing here draws anything.

   window.MeDoors = {
     normalizeAnswer(s)                     the answer as it is compared (plan 3e)
     parseLogicer(x)                        "48,213" / "#48213" / 48213 → 48213, or null
     which(logicer)                         → { ok: true, pw: bool, rq: [2, 5, 7] | null }   (the page then shows "Password"
                                              or "Your 3 questions" and the three questions)
     openWithPassword(logicer, password)    → { ok: true, code, record }; the page then calls apply(record, code) from assets/js/me.js
     openWithQuestions(logicer, answers)    answers: [{ id, answer }] (or { 2: "…", 5: "…", 7: "…" }) → the same
     setPassword(code, password)            → { ok: true, pw, rq }
     setQuestions(code, [{ id, answer }×3]) → { ok: true, pw, rq }
     removeDoor(code, "pw" | "rq")          → { ok: true, pw, rq }
     MIN_LENGTH, QUESTION_IDS
   }
   Every call resolves, never throws. A failure is { ok: false, why } with why one of:
     "wrong"   not right (an open): the page says "Not right." and shows left, the tries left this hour
     "busy"    no tries left this hour (left: 0)
     "short"   a password under 8 characters          "common"  a password on the common list ("Too common.")
     "empty"   an answer with nothing left once normalized
     "questions" not three different questions from the eight
     "none"    this number has no such door            "code"    the code is not known to the server
     "net"     no answer from the server               "number"  not a Logicer number

   How a door works (plan 3c). The secret is the password (Unicode NFC, spaces at both ends dropped) or the three normalized
   answers joined by "|" in question-number order. With a fresh 16-byte salt, on the phone:
     key1 = PBKDF2-HMAC-SHA256(secret, salt ‖ "1", 200,000) → 32 bytes, proof = base64(key1)
     key2 = PBKDF2-HMAC-SHA256(secret, salt ‖ "2", 200,000) → an AES-GCM-256 key that never leaves the phone
     cbox = base64(iv ‖ AES-GCM(key2, iv, code, additional data "lg-me-door:pw" or ":rq")), iv 12 random bytes
   The server keeps salt, SHA-256(proof) and cbox. To open, the phone gets the salt from which(), works out key1 and key2
   again from what was typed, sends the proof, and opens the cbox of the record it gets back. When a password is set the
   server also gets its length, for the 8-character rule, and nothing else of it: the common-password list is read by
   the phone itself (me/common-passwords.txt beside the page, 10,000 lowercased lines; joint check, 7 Nov 2026), so not
   even a fingerprint of a password leaves the phone. The server never sees the password, an answer, or key2. */
(function () {
  "use strict";
  const root = typeof window !== "undefined" ? window : globalThis;
  /* the server's two addresses, as the Find outs: the logicers.com one first, workers.dev only when the first gives no
     answer at all before it has ever answered. A test page sets window.ME_API, which then stands alone. */
  const ADDR = root.ME_API ? { use: root.ME_API, alt: "", heard: true } : { use: "https://me.logicers.com", alt: "https://logicers-me.rza-khay.workers.dev", heard: false };
  const ITERATIONS = 200000;
  const MIN_LENGTH = 8;
  const QUESTION_IDS = [1, 2, 3, 4, 5, 6, 7, 8];
  const te = new TextEncoder(), td = new TextDecoder();
  const known = new Map();                     // logicer → what which() said, with the salts, for the opens that follow

  /* ---- answers and passwords as they are compared ---- */
  const LETTERS = { "ı": "i", "ß": "ss", "ø": "o", "æ": "ae", "œ": "oe", "ł": "l", "đ": "d", "ð": "d", "þ": "th", "ħ": "h", "ŀ": "l" };
  /* lowercase, accents gone (ö→o, ş→s, ç→c, é→e, İ/ı→i), apostrophes gone (D'Annunzio → dannunzio), every other mark
     between words a single space (Saint-Denis → saint denis, "Via Roma, 5" → via roma 5), digits kept, no spaces at
     the ends. Identical when a door is set and when it is opened. */
  function normalizeAnswer(s) {
    let t = String(s == null ? "" : s).toLowerCase().normalize("NFKD").toLowerCase().replace(/\p{M}+/gu, "");
    t = t.replace(/[ıßøæœłđðþħŀ]/g, (c) => LETTERS[c]);
    t = t.replace(/['’‘`´ʼʹ]/g, "");
    /* every mark and every space goes (joint check, 7 Nov 2026, from Chat D's reading): "L'Aquila", "L Aquila" and "l aquila"
       must be one answer, and so must "Saint-Étienne" and "saintetienne". An answer is only ever compared with the same
       person's own answer, so nothing can collide. */
    return t.replace(/[^\p{L}\p{Nd}]+/gu, "");
  }
  function cleanPassword(p) { return String(p == null ? "" : p).normalize("NFC").trim(); }
  function parseLogicer(x) {
    const s = String(x == null ? "" : x).replace(/[\s.,'’#№]/g, "");
    if (!/^\d{1,9}$/.test(s)) return null;
    const n = Number(s);
    return n >= 1 ? n : null;
  }

  /* ---- bytes ---- */
  function b64(u8) { let s = ""; for (let i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]); return btoa(s); }
  function unb64(s) { const bin = atob(String(s)); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u; }
  function join(a, b) { const u = new Uint8Array(a.length + b.length); u.set(a, 0); u.set(b, a.length); return u; }
  function random(n) { return crypto.getRandomValues(new Uint8Array(n)); }
  /* the common-password list, read once from the site (me/common-passwords.txt) when a password is set; a test page
     sets window.ME_COMMON_URL. The file's lines are lowercased; the typed password is lowercased for the look-up. */
  const COMMON_URL = root.ME_COMMON_URL || (function () {
    try {
      const me = document.currentScript && document.currentScript.src;
      if (me && /\/assets\/js\/me-doors\.js(\?.*)?$/.test(me)) return me.replace(/\/assets\/js\/me-doors\.js(\?.*)?$/, "/me/common-passwords.txt");
    } catch (e) { /* no document: below */ }
    return "../me/common-passwords.txt";
  })();
  let commonList = null;
  async function common() {
    if (commonList) return commonList;
    const r = await fetch(COMMON_URL, { method: "GET", credentials: "omit", referrerPolicy: "no-referrer" });
    if (!r.ok) throw new Error("list");
    const set = new Set();
    for (const line of (await r.text()).split("\n")) { const w = line.trim().toLowerCase(); if (w) set.add(w); }
    if (set.size < 1000) throw new Error("list");
    commonList = set;
    return set;
  }

  /* ---- the two keys from a secret (both worked out at once) ---- */
  async function keys(secret, salt) {
    const base = await crypto.subtle.importKey("raw", te.encode(secret), "PBKDF2", false, ["deriveBits", "deriveKey"]);
    const p = (tag) => ({ name: "PBKDF2", hash: "SHA-256", salt: join(salt, te.encode(tag)), iterations: ITERATIONS });
    const [bits, key2] = await Promise.all([
      crypto.subtle.deriveBits(p("1"), base, 256),
      crypto.subtle.deriveKey(p("2"), base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]),
    ]);
    return { proof: b64(new Uint8Array(bits)), key2 };
  }
  async function lock(code, key2, kind) {
    const iv = random(12);
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv, additionalData: te.encode("lg-me-door:" + kind) }, key2, te.encode(code)));
    return b64(join(iv, ct));
  }
  async function unlock(cbox, key2, kind) {
    const u = unb64(cbox);
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: u.slice(0, 12), additionalData: te.encode("lg-me-door:" + kind) }, key2, u.slice(12));
    return td.decode(pt);
  }

  /* ---- the server ---- */
  async function reach(path, body) {
    for (;;) {
      const base = ADDR.use, ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 10000);
      try {
        const r = await fetch(base + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: ctl.signal });
        clearTimeout(t);
        if (base !== ADDR.alt) ADDR.heard = true;
        let j = null; try { j = await r.json(); } catch (e) { j = null; }
        return { status: r.status, j: j || {} };
      } catch (e) {
        clearTimeout(t);
        if (ADDR.heard || !ADDR.alt || base === ADDR.alt) return { status: 0, j: {} };
        ADDR.use = ADDR.alt;
      }
    }
  }
  function failed(r) {
    if (r.status === 0) return { ok: false, why: "net" };
    if (r.status === 429) return { ok: false, why: "busy", left: 0 };
    if (r.status === 404) return { ok: false, why: "code" };
    if (r.j.short) return { ok: false, why: "short" };
    if (r.j.common) return { ok: false, why: "common" };
    return { ok: false, why: "net" };
  }
  const doorsOf = (j) => ({ ok: true, pw: !!j.pw, rq: Array.isArray(j.rq) ? j.rq : null });

  /* ---- setting, changing and removing (the phone holds the code) ---- */
  async function put(code, kind, door) {
    const r = await reach("/door/set", { code: String(code || "").trim().toLowerCase(), [kind]: door });
    return r.status === 200 && r.j.ok ? doorsOf(r.j) : failed(r);
  }
  async function make(code, secret, kind) {
    const salt = random(16);
    const k = await keys(secret, salt);
    const c = String(code || "").trim().toLowerCase();
    const cbox = await lock(c, k.key2, kind);
    if ((await unlock(cbox, k.key2, kind)) !== c) throw new Error("lock");   // never sent unless it opens again here
    return { salt: b64(salt), proof: k.proof, cbox };
  }
  async function setPassword(code, password) {
    try {
      const p = cleanPassword(password);
      const len = [...p].length;
      if (len < MIN_LENGTH) return { ok: false, why: "short" };
      if ((await common()).has(p.toLowerCase())) return { ok: false, why: "common" };
      const door = await make(code, p, "pw");
      door.len = len;
      return await put(code, "pw", door);
    } catch (e) { return { ok: false, why: "net" }; }
  }
  /* the three questions' secret: answers normalized, in question-number order, joined by "|" */
  function questionSecret(ids, byId) {
    const parts = [];
    for (const id of ids) {
      const a = normalizeAnswer(byId[id]);
      if (!a || a.length < 2) return null;                 // one character is no answer (joint check)
      parts.push(a);
    }
    return parts.join("|");
  }
  function answersById(answers) {
    const out = {};
    if (Array.isArray(answers)) { for (const x of answers) if (x && typeof x === "object") out[Number(x.id)] = x.answer; }
    else if (answers && typeof answers === "object") { for (const k of Object.keys(answers)) out[Number(k)] = answers[k]; }
    return out;
  }
  async function setQuestions(code, items) {
    try {
      if (!Array.isArray(items) || items.length !== 3) return { ok: false, why: "questions" };
      const ids = items.map((x) => Number(x && x.id)).sort((a, b) => a - b);
      if (!ids.every((id, i) => QUESTION_IDS.includes(id) && (i === 0 || id !== ids[i - 1]))) return { ok: false, why: "questions" };
      const secret = questionSecret(ids, answersById(items));
      if (secret === null) return { ok: false, why: "empty" };
      const door = await make(code, secret, "rq");
      door.q = ids;
      return await put(code, "rq", door);
    } catch (e) { return { ok: false, why: "net" }; }
  }
  async function removeDoor(code, kind) {
    if (kind !== "pw" && kind !== "rq") return { ok: false, why: "none" };
    try { return await put(code, kind, null); } catch (e) { return { ok: false, why: "net" }; }
  }

  /* ---- opening on a phone without the code ---- */
  async function which(logicer) {
    const n = parseLogicer(logicer);
    if (!n) return { ok: false, why: "number" };
    const r = await reach("/door/which", { logicer: n });
    if (!(r.status === 200 && r.j.ok)) return failed(r);
    const info = { pw: !!r.j.pw, rq: Array.isArray(r.j.rq) ? r.j.rq : null, salt: r.j.salt || {} };
    known.set(n, info);
    return { ok: true, pw: info.pw, rq: info.rq };
  }
  async function open(logicer, kind, secretOf) {
    try {
      const n = parseLogicer(logicer);
      if (!n) return { ok: false, why: "number" };
      if (!known.has(n)) { const w = await which(n); if (!w.ok) return w; }
      const info = known.get(n);
      if (kind === "pw" ? !info.pw : !info.rq) return { ok: false, why: "none" };
      const secret = secretOf(info);
      if (secret === null) return { ok: false, why: "empty" };
      const k = await keys(secret, unb64(info.salt[kind]));
      const r = await reach(kind === "pw" ? "/door/password" : "/door/questions", { logicer: n, proof: k.proof });
      if (r.status === 403) return { ok: false, why: "wrong", left: Number(r.j.left) || 0 };
      if (!(r.status === 200 && r.j.ok && r.j.record)) return failed(r);
      const d = r.j.record.doors && r.j.record.doors[kind];
      const code = await unlock(d.cbox, k.key2, kind);
      return { ok: true, code, record: r.j.record };
    } catch (e) { return { ok: false, why: "net" }; }
  }
  function openWithPassword(logicer, password) {
    return open(logicer, "pw", () => cleanPassword(password) || null);
  }
  function openWithQuestions(logicer, answers) {
    return open(logicer, "rq", (info) => questionSecret(info.rq, answersById(answers)));
  }

  root.MeDoors = { normalizeAnswer, parseLogicer, which, openWithPassword, openWithQuestions, setPassword, setQuestions, removeDoor, MIN_LENGTH, QUESTION_IDS };
})();
