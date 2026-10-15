/* Logicers Live: an email's fingerprint, made in the browser (15 Oct 2026). Two pages use this one file, so
   one address always gives one fingerprint: the editor (live/build/), where a maker may leave an email as a
   way back to a lost edit link, and Logicers' desk (its admin page), where Khayyam types the address a maker
   wrote from.

   The address never leaves the browser. Only SHA-256("logicers-way-v1:" + the address, as compared) does,
   and the server keeps an HMAC of that with its own secret (server/live/src/way.js). It is one way: nothing
   turns a fingerprint back into an address; what can be done is to make the fingerprint of an address typed
   again and see whether it is the same (the desk does exactly that). The "v1" in the label is this way of
   comparing: a later change of it would need a new label, since every stored fingerprint follows this one.

   "As compared" (an independent review asked for these before the first one is stored, 15 Oct 2026):
   - NFKC (a full-width letter typed with some keyboards is the letter itself), then every invisible format
     character out (zero-width spaces and joiners, soft hyphens, the marks that turn text around), trimmed;
   - lower case, with the Turkish dotted capital I as i (JavaScript would make it i plus a combining dot);
   - the domain as the mail system reads it: its punycode form, so münchen.de and xn--mnchen-3ya.de are one;
   - for Gmail, which delivers john.doe+quiz@gmail.com to johndoe@gmail.com, the dots and anything after a
     "+" in the name are left out, and googlemail.com is gmail.com; for the providers that deliver "name+tag"
     to "name" (Outlook, iCloud, Proton, Fastmail), the "+tag" is left out. Elsewhere the name stays as it is;
   - the domain holds letters (of any script), digits, dots and hyphens only: anything a web address would
     read as its path, its query or its "#" part ("a@b.com?cc=…", "a@b.com/x") is no address (an independent
     review, the same evening: such text came through to the list of feedback emails).
   No HTML is made here (the desk's page refuses any, Trusted Types).

   The same file runs in the server (server/live/src/wayprint.js, a copy byte for byte, as hs-rules.js is of
   rules.js): when a maker also asks for feedback emails, the address itself is sent once, and the server
   checks that it is the very address of the fingerprint before keeping it (15 Oct 2026, evening). */
(function (root) {
  "use strict";
  var OK = /^[^\s@<>"',;:()[\]\\]+@[^\s@<>"',;:()[\]\\]+\.[^\s@<>"',;:()[\]\\]+$/;
  var PLUS = ["gmail.com", "outlook.com", "hotmail.com", "live.com", "msn.com", "icloud.com", "me.com", "mac.com",
              "protonmail.com", "proton.me", "pm.me", "fastmail.com"];
  var INVISIBLE, DOMAIN;
  try { DOMAIN = new RegExp("^[\\p{L}\\p{N}\\p{M}.-]+$", "u"); } catch (e) { DOMAIN = /^[^\/?#%&=!$*+^`{|}~\s]+$/; }
  try { INVISIBLE = new RegExp("\\p{Cf}", "gu"); } catch (e) { INVISIBLE = /[\u00AD\u061C\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF]/g; }
  /* the address as written, with what can never be part of one taken out (the form a feedback email goes to).
     Normalized again after the invisible characters go: a joiner between a letter and its accent kept the two
     apart, and the result would have changed on a second pass, so one address could carry two fingerprints
     (Fable's review, 15 Oct 2026). tidy(tidy(x)) is tidy(x). */
  function tidy(x) {
    var s = String(x === undefined || x === null ? "" : x);
    try { s = s.normalize("NFKC").replace(INVISIBLE, "").normalize("NFKC"); } catch (e) { s = s.replace(INVISIBLE, ""); }
    return s.trim();
  }
  function clean(x) {
    var s = tidy(x).replace(/\u0130/g, "i").toLowerCase().replace(/i\u0307/g, "i");
    if (s.length > 254 || !OK.test(s)) return "";
    var at = s.lastIndexOf("@"), name = s.slice(0, at), dom = s.slice(at + 1);
    if (!name || name.length > 64 || dom.length > 253 || /\.\.|^\.|\.$|^-/.test(dom)) return "";
    if (!DOMAIN.test(dom)) return "";
    try { dom = new URL("http://" + dom + "/").hostname; } catch (e) { return ""; }
    if (!/^[a-z0-9.-]+$/.test(dom) || dom.indexOf(".") < 0 || dom.length > 253) return "";
    if (dom === "googlemail.com") dom = "gmail.com";
    if (PLUS.indexOf(dom) >= 0) name = name.replace(/\+.*$/, "");
    if (dom === "gmail.com") name = name.replace(/\./g, "");
    if (!name) return "";
    return name + "@" + dom;
  }
  /* -> a Promise of 64 hex characters, or of null (not an address, or no crypto in this browser) */
  function print(x) {
    var s = clean(x), c = root.crypto;
    if (!s || !c || !c.subtle || typeof root.TextEncoder !== "function") return Promise.resolve(null);
    return c.subtle.digest("SHA-256", new root.TextEncoder().encode("logicers-way-v1:" + s)).then(function (d) {
      var b = new Uint8Array(d), h = "";
      for (var i = 0; i < b.length; i++) h += (b[i] < 16 ? "0" : "") + b[i].toString(16);
      return h;
    }, function () { return null; });
  }
  root.LogicersWay = {
    clean: clean,
    tidy: tidy,
    print: print,
    ok: function (x) { return !!clean(x); },
    can: !!(root.crypto && root.crypto.subtle && typeof root.TextEncoder === "function")
  };
})(typeof window !== "undefined" ? window : globalThis);
