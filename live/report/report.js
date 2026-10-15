/* Logicers Live: the report form (15 Oct 2026). Anyone can tell Logicers that a game someone made holds
   something wrong: the EU's Digital Services Act asks a host of other people's text for exactly this
   (Art. 16), with the reason, where it is, a name and an email when the sender wants to give them, and a
   statement of good faith. A person reads every report on Logicers' own admin page.

   The page speaks the game's language: a made game's screens link here as #KDNVFRT or as
   #lang=it&code=KDNVFRT, and the switch at the top changes it (English, Italiano, Türkçe). Without a
   language in the address it takes the browser's, when it is one of the three, else English.

   It sends with fetch, as JSON, to the live server's POST /report: the site's security line lets a form go
   only to the site itself, and none of the fields has a name, so nothing typed here can ever end up in an
   address (and in a server's logs) even if this script failed. Everything is checked here the way the
   server checks it, so a person learns what to fix before anything is sent; the server's answers are put
   into the person's own language, never shown raw. What is typed stays in the form after any error. */
(function () {
  "use strict";
  var WORDS = window.DESK_WORDS, TO = window.TurnsOut;
  if (!WORDS || !WORDS.en) return;

  var PROTO = 1;
  var LANGS = ["en", "it", "tr"];
  var LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);
  /* the checks may point the page at another local server; on the site, never (an element with that id could
     otherwise stand in for it: a string set by a script on this computer only) */
  var SERVER = (LOCAL && typeof window.LIVE_SERVER === "string" && window.LIVE_SERVER) || (LOCAL ? "http://127.0.0.1:8787" : "https://logicers-live.rza-khay.workers.dev");
  var WHYS = ["illegal", "hate", "sexual", "violence", "personal", "copyright", "spam", "wrong", "other"];
  /* the same tests as the server's (server/live/src: names.js for codes, worker.js for the email, kit.js's
     cleanText for every text): a code is 5 letters (a live game) or 7 (a saved game) of these twenty */
  var CODE_OK = /^(?:[BCDFGHJKLMNPQRSTVWXZ]{5}|[BCDFGHJKLMNPQRSTVWXZ]{7})$/;
  var EMAIL_OK = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/;
  var BAD_TEXT = /[\u0000-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/;
  var TEXT_MIN = 10, TEXT_MAX = 1000, NAME_MAX = 80, EMAIL_MAX = 120;
  var FIELD = { code: "f-code", why: "f-why", text: "f-text", name: "f-name", email: "f-email", good: "f-good" };
  /* the server's 400 { e: "report", why } names the field; its words here */
  var REFUSED = { why: "errWhy", text: "errText", name: "errName", email: "errEmail", good: "errGood" };

  function $(id) { return document.getElementById(id); }
  var form = $("form"), codeIn = $("f-code"), textIn = $("f-text"), nameIn = $("f-name"), emailIn = $("f-email"), goodIn = $("f-good"), sendBtn = $("f-send");
  var lang = "en", why = "", sending = false, sent = { code: "", email: "" };
  var errs = {}, formErr = "";

  /* ---- words: the language's, else English; a word with places is filled in one pass ---- */
  function pick(o, key) {
    return key.split(".").reduce(function (x, k) { return x && typeof x === "object" && Object.prototype.hasOwnProperty.call(x, k) ? x[k] : undefined; }, o);
  }
  function W(key) {
    var v = pick(WORDS[lang], key);
    if (typeof v !== "string") v = pick(WORDS.en, key);
    return typeof v === "string" ? v : "";
  }
  function fill(s, args) {
    var i = 0;
    return String(s).replace(/%[sd]/g, function () { var a = args[i++]; return a === undefined || a === null ? "" : String(a); });
  }
  function num(n) {
    try { return Number(n).toLocaleString(W("locale") || "en-US"); } catch (e) { return String(n); }
  }
  /* a link of the site's own, as the frame writes it (opened from a folder, it names the file) */
  function here(href) { return TO && TO.here ? TO.here(href) : href; }
  /* what the server will keep: NFC, the zero-width space and byte order mark gone, every run of white space
     one space, trimmed (kit.js, cleanText) */
  function clean(s) {
    var t = String(s || "");
    try { t = t.normalize("NFC"); } catch (e) { /* an old browser: the server normalizes anyway */ }
    return t.replace(/[\u200B\uFEFF]/g, "").replace(/\s+/g, " ").trim();
  }

  /* ---- the address: #KDNVFRT or #lang=it&code=KDNVFRT ---- */
  function fromHash() {
    var h = String(window.location.hash || "").replace(/^#/, ""), out = { lang: "", code: "" };
    if (/^(?:[A-Za-z]{5}|[A-Za-z]{7})$/.test(h)) { out.code = h.toUpperCase(); return out; }
    h.split("&").forEach(function (part) {
      var i = part.indexOf("=");
      if (i < 0) return;
      var k = part.slice(0, i), v = part.slice(i + 1);
      try { v = decodeURIComponent(v); } catch (e) { v = ""; }
      if (k === "lang" && LANGS.indexOf(v) >= 0) out.lang = v;
      if (k === "code" && /^(?:[A-Za-z]{5}|[A-Za-z]{7})$/.test(v)) out.code = v.toUpperCase();
    });
    return out;
  }
  function browserLang() {
    var list = window.navigator.languages && window.navigator.languages.length ? window.navigator.languages : [window.navigator.language || ""];
    for (var i = 0; i < list.length; i++) {
      var l = String(list[i] || "").slice(0, 2).toLowerCase();
      if (LANGS.indexOf(l) >= 0) return l;
    }
    return "en";
  }
  /* the address keeps the language (and the code, which is no secret: it is on every player's screen), so a
     reload stays in the language; it never holds anything the person typed beyond the code */
  function keepInAddress() {
    var code = codeIn.value;
    var h = "#lang=" + lang + (CODE_OK.test(code) ? "&code=" + code : "");
    try { if (window.location.hash !== h) window.history.replaceState(null, "", h); } catch (e) { /* the page works without it */ }
  }

  /* ---- the page in a language ---- */
  function words() {
    document.documentElement.lang = lang;
    document.title = W("docTitle");
    Array.prototype.forEach.call(document.querySelectorAll("[data-w]"), function (e) {
      if (e === sendBtn && sending) return;
      e.textContent = W(e.getAttribute("data-w"));
    });
    if (sending) sendBtn.textContent = W("sending");
    Array.prototype.forEach.call($("langs").querySelectorAll("button"), function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    $("termslink").href = here("../terms/#" + lang);
    count();
    Object.keys(errs).forEach(function (f) { setErr(f, errs[f]); });
    setFormErr(formErr);
    if (!$("v-done").hidden) doneWords();
  }
  Array.prototype.forEach.call($("langs").querySelectorAll("button"), function (b) {
    b.addEventListener("click", function () {
      lang = b.getAttribute("data-lang");
      words();
      keepInAddress();
    });
  });

  /* ---- the fields ---- */
  codeIn.addEventListener("input", function () {
    var v = codeIn.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 7);
    if (v !== codeIn.value) codeIn.value = v;
    if (errs.code) setErr("code", "");
  });
  codeIn.addEventListener("change", keepInAddress);
  var whyBtns = Array.prototype.slice.call($("f-why").querySelectorAll(".dk-why"));
  function setWhy(w) {
    why = WHYS.indexOf(w) >= 0 ? w : "";
    whyBtns.forEach(function (b) { b.setAttribute("aria-checked", String(b.getAttribute("data-why") === why)); });
  }
  whyBtns.forEach(function (b, i) {
    b.addEventListener("click", function () {
      setWhy(b.getAttribute("data-why"));
      if (errs.why) setErr("why", "");
    });
    /* a radio group answers the arrow keys, as a person who uses the keyboard expects */
    b.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var n = whyBtns[(i + d + whyBtns.length) % whyBtns.length];
      n.focus();
      n.click();
    });
  });
  function count() {
    var n = textIn.value.length;
    $("f-text-count").textContent = fill(W("textCount"), [num(n), num(TEXT_MAX)]);
  }
  textIn.addEventListener("input", function () { count(); if (errs.text) setErr("text", ""); });
  nameIn.addEventListener("input", function () { if (errs.name) setErr("name", ""); });
  emailIn.addEventListener("input", function () { if (errs.email) setErr("email", ""); });
  goodIn.addEventListener("change", function () { if (errs.good) setErr("good", ""); });

  /* ---- what is wrong, said next to its field and kept as a word, so a change of language says it again ---- */
  function setErr(f, key) {
    if (key) errs[f] = key; else delete errs[f];
    var box = $("f-" + f + "-err"), input = $(FIELD[f]);
    box.textContent = key ? W(key) : "";
    box.hidden = !key;
    if (key) input.setAttribute("aria-invalid", "true"); else input.removeAttribute("aria-invalid");
  }
  function setFormErr(key) {
    formErr = key || "";
    var e = $("f-err");
    e.textContent = key ? W(key) : "";
    e.hidden = !key;
  }
  function focusField(f) {
    var e = f === "why" ? (whyBtns.filter(function (b) { return b.getAttribute("aria-checked") === "true"; })[0] || whyBtns[0]) : $(FIELD[f]);
    try { e.focus({ preventScroll: false }); } catch (x) { e.focus(); }
    if (e.scrollIntoView) e.scrollIntoView({ block: "center" });
  }

  function check() {
    var code = codeIn.value.toUpperCase().replace(/[^A-Z]/g, "");
    var text = clean(textIn.value), name = clean(nameIn.value), email = clean(emailIn.value);
    var bad = [];
    function mark(f, key) { setErr(f, key); if (key) bad.push(f); }
    mark("code", code.length !== 5 && code.length !== 7 ? "errCode" : !CODE_OK.test(code) ? "errNoGame" : "");
    mark("why", WHYS.indexOf(why) < 0 ? "errWhy" : "");
    mark("text", BAD_TEXT.test(text) ? "errChars" : text.length < TEXT_MIN ? "errText" : text.length > TEXT_MAX ? "errTextLong" : "");
    mark("name", BAD_TEXT.test(name) ? "errChars" : name.length > NAME_MAX ? "errName" : "");
    mark("email", email && (BAD_TEXT.test(email) || email.length > EMAIL_MAX || !EMAIL_OK.test(email)) ? "errEmail" : "");
    mark("good", goodIn.checked ? "" : "errGood");
    /* lang: the language the person wrote in, so that Logicers can answer in it (the server keeps it only
       once it knows the field; until then it drops it, like any unknown field) */
    return { bad: bad, body: { v: PROTO, code: code, why: why, text: text, name: name, email: email, good: true, lang: lang } };
  }

  /* ---- sending ---- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (sending) return;
    setFormErr("");
    var c = check();
    if (c.bad.length) { setFormErr("errCheck"); focusField(c.bad[0]); return; }
    send(c.body);
  });

  function busy(on) {
    sending = on;
    sendBtn.disabled = on;
    sendBtn.textContent = W(on ? "sending" : "send");
  }
  function send(body) {
    busy(true);
    window.fetch(SERVER + "/report", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer"
    }).then(function (res) {
      return res.json().then(function (b) { return { status: res.status, b: b && typeof b === "object" ? b : {} }; },
                             function () { return { status: res.status, b: {} }; });
    }).then(function (r) {
      busy(false);
      if (r.status === 200 && r.b.ok) { thanks(body); return; }
      if (r.status === 400 && r.b.e === "report" && Object.prototype.hasOwnProperty.call(REFUSED, r.b.why)) {
        setErr(r.b.why, REFUSED[r.b.why]);
        setFormErr("errCheck");
        focusField(r.b.why);
        return;
      }
      if (r.status === 404) { setErr("code", "errNoGame"); setFormErr("errNoGame"); return; }
      if (r.status === 429) { setFormErr("errLater"); return; }
      if (r.status === 409 && r.b.e === "old") { setFormErr("errOld"); return; }
      setFormErr("errServer");
    }, function () {
      busy(false);
      setFormErr("errNet");
    });
  }

  /* ---- after sending: thanks, what happens next, and the form emptied (a shared computer keeps nothing) ---- */
  function thanks(body) {
    sent = { code: body.code, email: body.email };
    codeIn.value = sent.code;
    textIn.value = "";
    nameIn.value = "";
    emailIn.value = "";
    goodIn.checked = false;
    setWhy("");
    count();
    $("v-form").hidden = true;
    $("v-done").hidden = false;
    doneWords();
    window.scrollTo(0, 0);
    try { $("v-done").focus({ preventScroll: true }); } catch (e) { /* an old browser */ }
  }
  function doneWords() {
    var m = $("d-mail");
    m.textContent = "";
    if (sent.email) {
      /* the address the person typed, in bold, inside the sentence of their language: the sentence's two
         halves around its place, and the address as text, never as markup */
      var parts = W("willWrite").split("%s");
      m.appendChild(document.createTextNode(parts[0] || ""));
      var b = document.createElement("b");
      b.className = "dk-mail";
      b.dir = "auto";
      b.textContent = sent.email;
      m.appendChild(b);
      m.appendChild(document.createTextNode(parts.slice(1).join("")));
    }
    m.hidden = !sent.email;
    var back = $("d-back");
    back.hidden = !sent.code;
    if (sent.code) back.href = here("../#" + sent.code);
    $("d-again").className = "btn " + (sent.code ? "ghost" : "solid");
  }
  $("d-again").addEventListener("click", function () {
    sent = { code: "", email: "" };
    codeIn.value = "";
    Object.keys(errs).forEach(function (f) { setErr(f, ""); });
    setFormErr("");
    $("v-done").hidden = true;
    $("v-form").hidden = false;
    keepInAddress();
    window.scrollTo(0, 0);
    codeIn.focus();
  });

  /* ---- start ---- */
  function fromAddress(first) {
    var h = fromHash();
    if (h.lang) lang = h.lang;
    else if (first) lang = browserLang();
    if (h.code) codeIn.value = h.code;
    words();
  }
  window.addEventListener("hashchange", function () { fromAddress(false); });
  /* the line about counting visits shows only where visits are counted (the live site; never on this
     computer). This page counts them as small pictures, with no script from outside (turnsout.js, pixel) */
  $("counted").hidden = !(TO && TO.counting && TO.counting());
  if (TO && TO.fixLocalLinks) TO.fixLocalLinks();
  fromAddress(true);
})();
