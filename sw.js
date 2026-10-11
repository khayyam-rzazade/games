/* Logicers — the service worker of the installable app (11 Oct 2026).
   It keeps a copy of the site's own files on the phone, so the app opens at once and still opens
   with a weak signal or none. It must never make anyone play yesterday's puzzle as today's, or run
   an old script after a push, so it follows three rules:

   1. Pages and data (every page, every puzzles.js and data/*.js) come from the NETWORK first; the
      copy is used only when the network does not answer in time. A new day and a new push therefore
      arrive exactly as they do in a browser.
   2. Scripts and stylesheets carry a version in their address (stamp.py: ?v=…), so a copy of one can
      never be the wrong one: they are served from the copy, and a push changes their address.
   3. Anything from another site (the visitor counter, the Rooms server) and anything that is not a
      GET is never touched: it goes to the network as if this file did not exist.

   What it keeps is the site's own files, nothing of the player: results and streaks stay where they
   always were, in the browser's own storage. It is switched on by assets/js/turnsout.js on the live
   site only; the checks switch it on deliberately (window.LOGICERS_SW) when they test it. */
"use strict";

var VERSION = "logicers-app-1";          // a new name throws away every copy kept under the old one
var KEEP = 360;                          // at most this many files are kept (photos and silhouettes add up)
var WAIT = 3500;                         // how long a page or a data file may take before the copy is used

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) {
    return c.addAll(["./"]).catch(function () { /* offline at install: the copy fills as pages are seen */ });
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function versioned(url) { return /[?&]v=[0-9a-f]{6,}/.test(url.search); }
function fresh(url, req) {
  return req.mode === "navigate" || /\.html$|\/$/.test(url.pathname) ||
         /(^|\/)puzzles\.js$/.test(url.pathname) || /^\/?data\//.test(url.pathname.replace(/^\//, "")) ||
         /\.webmanifest$/.test(url.pathname);
}

function trim(cache) {
  return cache.keys().then(function (keys) {
    if (keys.length <= KEEP) return;
    return Promise.all(keys.slice(0, keys.length - KEEP).map(function (k) { return cache.delete(k); }));
  });
}
function keep(req, res) {
  if (!res || res.status !== 200 || res.type !== "basic") return res;
  var copy = res.clone();
  caches.open(VERSION).then(function (c) { return c.put(req, copy).then(function () { return trim(c); }); })
    .catch(function () { /* a full disk only means no copy */ });
  return res;
}

function networkFirst(req) {
  return new Promise(function (resolve) {
    var done = false;
    function fallback() {
      if (done) return;
      caches.match(req, { ignoreSearch: req.mode === "navigate" }).then(function (hit) {
        if (hit && !done) { done = true; resolve(hit); }
      });
    }
    var timer = setTimeout(fallback, WAIT);
    fetch(req).then(function (res) {
      clearTimeout(timer);
      keep(req, res);
      if (!done) { done = true; resolve(res); }
    }, function () {
      clearTimeout(timer);
      caches.match(req, { ignoreSearch: req.mode === "navigate" }).then(function (hit) {
        if (done) return;
        done = true;
        resolve(hit || (req.mode === "navigate" ? offlinePage() : Response.error()));
      });
    });
  });
}

/* A page this phone has never opened, with no signal: one plain page that says so, in the site's own
   colours, with the way home (which this phone has seen, or it would not have the app). */
function offlinePage() {
  var html = '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
    '<meta http-equiv="Content-Security-Policy" content="object-src \'none\'; base-uri \'self\'; form-action \'self\'">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1"><title>Offline | Logicers</title>' +
    '<style>html{background:#F3F4F9;color:#15172B;font:17px/1.45 system-ui,sans-serif}body{margin:0 auto;max-width:28em;padding:48px 20px}' +
    'h1{font-size:1.6rem;line-height:1.15;margin:18px 0 10px}a{display:inline-block;margin-top:18px;padding:12px 20px;border-radius:999px;' +
    'background:#2D4FC4;color:#fff;font-weight:700;text-decoration:none}@media (prefers-color-scheme:dark){html{background:#080A15;color:#F3F4FF}}</style>' +
    '</head><body><svg viewBox="0 0 34 10" width="68" height="20" aria-hidden="true"><circle cx="5" cy="5" r="4" fill="#2D4FC4"/>' +
    '<circle cx="17" cy="5" r="4" fill="#CF4327"/><circle cx="29" cy="5" r="4" fill="#0D7D73"/></svg>' +
    '<h1>No signal, and this game is not on your phone yet.</h1><p>Every game you have opened before still works without a signal. ' +
    'This one needs the internet once.</p><a href="/">Back to today\'s games</a></body></html>';
  return new Response(html, { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } });
}

function cacheFirst(req) {
  return caches.match(req).then(function (hit) {
    return hit || fetch(req).then(function (res) { return keep(req, res); });
  });
}

function staleWhileRevalidate(req) {
  return caches.match(req).then(function (hit) {
    var net = fetch(req).then(function (res) { return keep(req, res); }, function () { return hit; });
    return hit || net;
  });
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;                    // rule 3: never a POST, never a send to a room
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;     // rule 3: the counter and the Rooms server go straight out
  if (url.pathname === "/sw.js") return;
  if (fresh(url, req)) { e.respondWith(networkFirst(req)); return; }        // rule 1
  if (versioned(url)) { e.respondWith(cacheFirst(req)); return; }          // rule 2
  e.respondWith(staleWhileRevalidate(req));            // pictures, fonts, icons: the copy at once, a new one behind it
});
