/* My Logicers — the passkey door on the phone (Chat A2, 7 Nov 2026). "Keep with Face ID" / "Keep with fingerprint".

   Chat B's page calls these and shows the words; this file has none. Everything is on window.MePasskey:

     supported()      → Promise<boolean>   this phone can keep one (a platform authenticator with Face ID, Touch ID,
                                           fingerprint, Windows Hello). Show the "Keep with…" button only when true.
     canLogin()       → boolean            the browser knows passkeys at all (a computer can also use a phone's passkey
                                           by QR code, so the "open with Face ID" way can show where supported() is false).
     platform()       → "face" | "finger"  "face" on iPhone and iPad, "finger" elsewhere: which button words to use.
     kept()           → boolean            this browser has kept one or opened with one (stats.doors.passkey can read it).
     prepare(code)    → Promise            optional: fetch the "keep" question ahead, when the "If you lose the code"
                                           part comes into view, so the tap opens the sheet at once (see Safari below).
     register(code)   → Promise<{ ok, state }>
                        state: "done"           kept now
                               "registered"     this phone already keeps one for this code (show "Kept")
                               "cancelled"      the player closed the sheet (show nothing, or treat as failed)
                               "failed"         anything else; reason: "code" | "too many" | "full" | "offline" | "server"
                               "not supported"
     prepareLogin()   → Promise            optional: the same, ahead of the "open" tap.
     login()          → Promise<{ ok: true, code, record } | { ok: false, state, reason }>
                        then the page calls Chat A's apply(record, code), exactly as after a code.
     autofill(input?) → Promise<{ ok: true, code, record } | null>
                        optional: on the "Have a code?" box (give it autocomplete="username webauthn"), the phone's
                        keyboard offers the kept passkey; picking it resolves this. Resolves null when the browser
                        cannot, or when login() or stopAutofill() takes over.
     stopAutofill()
     forget()         → on "Delete everything", after the server delete: asks the phone's password manager to drop the
                        passkey too, where it can (Chrome's signal API), and forgets the local mark.

   Safari opens the Face ID sheet only close to a tap. register() and login() call the phone at once when prepare()
   or prepareLogin() has already fetched the question (it keeps four minutes); otherwise they fetch first, which works
   everywhere else and on Safari when the network is quick. So: call prepare(code) when the buttons show, and call
   register(code) / login() first thing in the tap's handler.

   The server: Chat A's Worker logicers-me, on two addresses like the other servers (the logicers.com one first; the
   workers.dev one only if the first never answered). A test page sets window.ME_API. Nothing here stores the code:
   the page gets it back from login() and hands it to Chat A's code. */
(function () {
  "use strict";
  var KEY = "lg.me.passkey";                      // { at, user } on this browser: kept or opened with a passkey
  var FRESH = 4 * 60 * 1000;                      // a fetched question is used for four minutes (the server keeps it five)
  var ADDR = window.ME_API ? { use: window.ME_API, alt: "", heard: true } : { use: "https://me.logicers.com", alt: "https://logicers-me.rza-khay.workers.dev", heard: false };

  /* ---- the server, two addresses ---- */
  function reach(path, body) {
    var a = ADDR;
    function go() {
      var base = a.use, ctl = typeof AbortController === "function" ? new AbortController() : null;
      var t = setTimeout(function () { if (ctl) ctl.abort(); }, 10000);
      return fetch(base + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body || {}), signal: ctl ? ctl.signal : undefined })
        .then(function (r) { clearTimeout(t); if (base !== a.alt) a.heard = true; return r; }, function (e) {
          clearTimeout(t);
          if (a.heard || !a.alt || base === a.alt) throw e;
          a.use = a.alt; return go();
        });
    }
    return go().then(function (r) {
      return r.json().catch(function () { return { ok: false, error: "server" }; }).then(function (j) { j = j || {}; j.status = r.status; return j; });
    }, function () { return { ok: false, error: "offline", status: 0 }; });
  }

  /* ---- bytes ---- */
  function toB64u(buf) {
    var u = new Uint8Array(buf), s = "";
    for (var i = 0; i < u.length; i++) s += String.fromCharCode(u[i]);
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function fromB64u(s) {
    var t = String(s).replace(/-/g, "+").replace(/_/g, "/");
    while (t.length % 4) t += "=";
    var bin = atob(t), u = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return u.buffer;
  }
  function creationOptions(o) {
    var p = Object.assign({}, o);
    p.challenge = fromB64u(o.challenge);
    p.user = Object.assign({}, o.user, { id: fromB64u(o.user.id) });
    p.excludeCredentials = (o.excludeCredentials || []).map(function (c) { return { type: c.type, id: fromB64u(c.id) }; });
    return p;
  }
  function requestOptions(o) {
    var p = Object.assign({}, o);
    p.challenge = fromB64u(o.challenge);
    p.allowCredentials = (o.allowCredentials || []).map(function (c) { return { type: c.type, id: fromB64u(c.id) }; });
    return p;
  }
  /* the answer, written out by hand: some password managers' stand-ins have no toJSON() */
  function credJSON(c) {
    var r = c.response, out = { id: c.id, rawId: toB64u(c.rawId), type: c.type, response: { clientDataJSON: toB64u(r.clientDataJSON) }, clientExtensionResults: {} };
    if (r.attestationObject) {
      out.response.attestationObject = toB64u(r.attestationObject);
      try { if (typeof r.getTransports === "function") out.response.transports = r.getTransports(); } catch (e) { /* none */ }
    }
    if (r.authenticatorData) out.response.authenticatorData = toB64u(r.authenticatorData);
    if (r.signature) out.response.signature = toB64u(r.signature);
    if (r.userHandle) out.response.userHandle = toB64u(r.userHandle);
    if (c.authenticatorAttachment) out.authenticatorAttachment = c.authenticatorAttachment;
    return out;
  }

  /* ---- the local mark ---- */
  function mark(user) {
    try { localStorage.setItem(KEY, JSON.stringify({ at: new Date().toISOString().slice(0, 10), user: user || (read() || {}).user || null })); } catch (e) { /* a blocked store */ }
  }
  function read() { try { var v = JSON.parse(localStorage.getItem(KEY)); return v && typeof v === "object" ? v : null; } catch (e) { return null; } }
  function kept() { return !!read(); }

  /* ---- what the phone can do ---- */
  function canLogin() { return !!(window.PublicKeyCredential && navigator.credentials && window.isSecureContext); }
  function supported() {
    if (!canLogin()) return Promise.resolve(false);
    var f = window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable;
    if (typeof f !== "function") return Promise.resolve(false);
    try { return f.call(window.PublicKeyCredential).then(function (v) { return !!v; }, function () { return false; }); } catch (e) { return Promise.resolve(false); }
  }
  function platform() {
    var ua = navigator.userAgent || "";
    if (/iPhone|iPad|iPod/.test(ua)) return "face";
    if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return "face";   // an iPad that says it is a Mac
    return "finger";
  }
  function failed(reason) { return { ok: false, state: "failed", reason: reason }; }
  function reasonOf(j) { return j.error === "too many" || j.error === "full" || j.error === "code" || j.error === "offline" ? j.error : "server"; }

  /* ---- keep: register ---- */
  var regAhead = null;                            // { code, at, options }
  function prepare(code) {
    if (regAhead && regAhead.code === code && Date.now() - regAhead.at < FRESH) return Promise.resolve(regAhead);
    var at = Date.now();
    return reach("/passkey/register/options", { code: code }).then(function (j) {
      if (!j.ok) { regAhead = null; return j; }
      regAhead = { code: code, at: at, options: j.options };
      return regAhead;
    });
  }
  function register(code) {
    if (!canLogin()) return Promise.resolve({ ok: false, state: "not supported" });
    var ready = regAhead && regAhead.code === code && Date.now() - regAhead.at < FRESH ? regAhead : null;
    if (ready) return create(code, ready.options);    // the sheet opens straight from the tap
    return prepare(code).then(function (r) { return r && r.options ? create(code, r.options) : failed(reasonOf(r || {})); });
  }
  function create(code, o) {
    stopAutofill();
    var p;
    try { p = navigator.credentials.create({ publicKey: creationOptions(o) }); } catch (e) { p = Promise.reject(e); }
    return p.then(function (cred) {
      if (!cred) return failed("server");
      regAhead = null;                              // the question is used up at the server either way
      return reach("/passkey/register/verify", { code: code, response: credJSON(cred) }).then(function (j) {
        if (j.ok) { mark(o.user.id); return { ok: true, state: "done" }; }
        if (j.error === "exists") { mark(o.user.id); return { ok: true, state: "registered" }; }
        return failed(reasonOf(j));
      });
    }, function (e) {
      var n = e && e.name;
      if (n === "InvalidStateError") { mark(o.user.id); return { ok: true, state: "registered" }; }   // this phone already keeps one
      if (n === "NotAllowedError" || n === "AbortError") return { ok: false, state: "cancelled" };
      if (n === "NotSupportedError" || n === "SecurityError") return { ok: false, state: "not supported" };
      return failed("server");
    });
  }

  /* ---- open: login ---- */
  var loginAhead = null;                          // { at, options }
  function prepareLogin() {
    if (loginAhead && Date.now() - loginAhead.at < FRESH) return Promise.resolve(loginAhead);
    var at = Date.now();
    return reach("/passkey/login/options", {}).then(function (j) {
      if (!j.ok) { loginAhead = null; return j; }
      loginAhead = { at: at, options: j.options };
      return loginAhead;
    });
  }
  function takeLogin() { var r = loginAhead && Date.now() - loginAhead.at < FRESH ? loginAhead : null; loginAhead = null; return r; }
  function finish(cred) {
    if (!cred) return failed("server");
    var body = credJSON(cred);
    return reach("/passkey/login/verify", { response: body }).then(function (j) {
      if (j.ok && typeof j.code === "string" && j.record) { mark(body.response.userHandle || null); return { ok: true, code: j.code, record: j.record }; }
      if (j.error === "unknown") {                // the passkey's record is gone: let the phone forget it, where it can
        try {
          if (window.PublicKeyCredential && typeof window.PublicKeyCredential.signalUnknownCredential === "function") {
            window.PublicKeyCredential.signalUnknownCredential({ rpId: lastRp, credentialId: body.id }).catch(function () {});
          }
        } catch (e) { /* none */ }
        return failed("unknown");
      }
      return failed(j.error === "expired" ? "expired" : reasonOf(j));
    });
  }
  var lastRp = location.hostname;
  function get(o, extra) {
    lastRp = o.rpId || lastRp;
    var p;
    try { p = navigator.credentials.get(Object.assign({ publicKey: requestOptions(o) }, extra || {})); } catch (e) { p = Promise.reject(e); }
    return p;
  }
  function login() {
    if (!canLogin()) return Promise.resolve({ ok: false, state: "not supported" });
    stopAutofill();
    var ready = takeLogin();
    var run = function (o) {
      return get(o).then(finish, function (e) {
        var n = e && e.name;
        if (n === "NotAllowedError" || n === "AbortError") return { ok: false, state: "cancelled" };
        if (n === "NotSupportedError" || n === "SecurityError") return { ok: false, state: "not supported" };
        return failed("server");
      });
    };
    if (ready) return run(ready.options);
    return prepareLogin().then(function (r) { loginAhead = null; return r && r.options ? run(r.options) : failed(reasonOf(r || {})); });
  }

  /* ---- the keyboard's offer on the code box (conditional mediation) ---- */
  var auto = null;                                // { ctl, done }
  function stopAutofill() { if (auto) { var a = auto; auto = null; try { a.ctl.abort(); } catch (e) { /* none */ } a.done(null); } }
  function autofill() {
    stopAutofill();
    var P = window.PublicKeyCredential;
    if (!canLogin() || typeof AbortController !== "function" || typeof P.isConditionalMediationAvailable !== "function") return Promise.resolve(null);
    return new Promise(function (resolve) {
      var me = { ctl: new AbortController(), done: resolve };
      auto = me;
      P.isConditionalMediationAvailable().then(function (yes) {
        if (!yes || auto !== me) { if (auto === me) auto = null; return resolve(null); }
        return reach("/passkey/login/options", {}).then(function (j) {
          if (auto !== me) return;
          if (!j.ok) { auto = null; return resolve(null); }
          return get(j.options, { mediation: "conditional", signal: me.ctl.signal }).then(function (cred) {
            if (auto !== me) return;
            auto = null;
            return finish(cred).then(function (r) { resolve(r); });
          }, function () { if (auto === me) { auto = null; resolve(null); } });
        });
      }, function () { if (auto === me) auto = null; resolve(null); });
    });
  }

  /* ---- delete everything ---- */
  function forget() {
    var v = read();
    try {
      var P = window.PublicKeyCredential;
      if (v && v.user && P && typeof P.signalAllAcceptedCredentials === "function") {
        P.signalAllAcceptedCredentials({ rpId: lastRp, userId: v.user, allAcceptedCredentialIds: [] }).catch(function () {});
      }
    } catch (e) { /* none */ }
    try { localStorage.removeItem(KEY); } catch (e) { /* none */ }
    regAhead = null; loginAhead = null;
  }

  window.MePasskey = {
    supported: supported, canLogin: canLogin, platform: platform, kept: kept,
    prepare: prepare, register: register, prepareLogin: prepareLogin, login: login,
    autofill: autofill, stopAutofill: stopAutofill, forget: forget, KEY: KEY,
  };
})();
