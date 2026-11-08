/* Logicers Studio: a local stand-in for the Studio Worker (claude/studio-plan.md section 3 and chat A's report in
   section 5, as studio/api.js reads them),
   for the front end's checks only. It serves studio/ as the Worker's static assets do (the shell for every page path),
   answers the API from memory, and seeds one maker with a game per template.
   Not the real Worker (server/studio, chat A): no brakes, no AI check, no D1. */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".ico": "image/x-icon", ".webp": "image/webp", ".jpg": "image/jpeg", ".txt": "text/plain" };

function rid(n = 24) { const a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"; let s = ""; for (const b of crypto.randomBytes(n)) s += a[b % 32]; return s; }
function slugify(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60); }
function dayIndex(s) { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ""); return m ? Math.round(Date.UTC(+m[1], +m[2] - 1, +m[3]) / 86400000) : null; }
function dayFrom(i) { const d = new Date(i * 86400000); return d.toISOString().slice(0, 10); }

export function makeDB(today) {
  const db = { makers: {}, games: {}, images: {}, reports: [], keeps: [], plays: [], log: [] };
  const t0 = dayIndex(today);
  function maker(name) { const slug = slugify(name); const key = rid(); db.makers[slug] = { slug, name, key, games: [], kits: [] }; return db.makers[slug]; }
  function game(mk, o) {
    const slug = slugify(o.title);
    const g = { maker: mk.slug, slug, title: o.title, template: o.template, lang: o.lang || "en", mode: o.mode || "daily", start_day: o.start_day || dayFrom(t0 - 2),
      about: o.about || "", keep_answers: !!o.keep, want_listed: true, listed: o.listed !== false, hidden: false, plays: o.plays || 0, code: o.code || rid(6).replace(/[0-9]/g, "K"),
      edit_key: rid(), items: (o.items || []).map((it) => ({ id: "i" + rid(6).toLowerCase(), ...it })), counts: {} };
    db.games[mk.slug + "/" + slug] = g; mk.games.push(slug); return g;
  }
  const anna = maker("Anna Rossi");
  anna.kits.push({ code: "KDNVFRT", title: "Rome quiz" });
  const img = "seedimg";
  const three = (a) => [a, a, a];
  game(anna, { title: "How many a day", template: "number", plays: 41, about: "A daily guess about **numbers**.\n\nMore at https://example.org/numbers. Or [the source](https://example.com/src).",
    items: three({ q: "Of 100 people in Italy, how many live in a city?", max: 100, answer: 71, unit: "", explain: "About 71 of 100 live in cities. Source: https://data.worldbank.org" }) });
  game(anna, { title: "When was it", template: "line", plays: 7, items: three({ q: "When was the Colosseum finished?", min: -500, max: 2026, min_label: "Rome is young", max_label: "Today", answer: 80, explain: "In 80 AD, under Titus." }) });
  game(anna, { title: "History a day", template: "pick", plays: 1234, items: three({ q: "Who painted the Sistine Chapel ceiling?", choices: ["Raphael", "Michelangelo", "Leonardo", "Caravaggio"], answer: 1, explain: "Michelangelo, from 1508 to 1512.", image: img }) });
  game(anna, { title: "Oldest first", template: "rank", plays: 3, items: three({ q: "Oldest first", things: ["Pyramids of Giza", "Colosseum", "Leaning Tower of Pisa", "Eiffel Tower"], explain: "" }) });
  game(anna, { title: "What is this", template: "picture", plays: 0, items: three({ form: "pick", q: "Which city is this?", choices: ["Rome", "Paris"], answer: 0, image: img, explain: "" }) });
  game(anna, { title: "Read and answer", template: "read", plays: 12, keep: true, items: three({ text: "The Tiber runs through Rome.\n\nIt is the third-longest river in Italy, after the Po and the Adige.", q: "Which river is longer than the Tiber?", choices: ["The Arno", "The Po"], answer: 1 }) });
  game(anna, { title: "Class quiz", template: "pick", mode: "open", plays: 5, items: [
    { q: "2 + 2?", choices: ["3", "4"], answer: 1 }, { q: "Capital of Italy?", choices: ["Rome", "Milan", "Turin"], answer: 0 }, { q: "Biggest planet?", choices: ["Mars", "Jupiter"], answer: 1 }] });
  game(anna, { title: "Picture number", template: "picture", plays: 2, items: three({ form: "number", q: "How old is this building, in years?", max: 3000, answer: 1946, image: img }) });
  game(anna, { title: "<img src=x onerror=alert(1)>", template: "pick", plays: 1, listed: false, about: "[click](javascript:alert(1)) <b>not bold</b> **bold**",
    items: three({ q: "<script>alert(1)</script>?", choices: ["<b>a</b>", "b"], answer: 0, explain: "two links http://a.example and http://b.example" }) });
  const hid = game(anna, { title: "Gone one", template: "pick", items: three({ q: "x", choices: ["a", "b"], answer: 0 }) }); hid.hidden = true;
  game(anna, { title: "Not yet", template: "pick", start_day: dayFrom(t0 + 3), items: three({ q: "x", choices: ["a", "b"], answer: 0 }) });
  game(anna, { title: "Ran out", template: "pick", start_day: dayFrom(t0 - 10), items: three({ q: "x", choices: ["a", "b"], answer: 0 }) });
  game(anna, { title: "In Italiano", template: "pick", lang: "it", items: three({ q: "Chi?", choices: ["a", "b"], answer: 0 }) });
  db.seedImg = img;
  return db;
}

function status(g) { return g.hidden ? "hidden" : !g.want_listed ? "private" : g.listed ? "listed" : "waiting"; }
function imgOut(it) { return it.image ? { ...it, image_url: "/i/" + (it.image === "seedimg" ? "anna-rossi/seed/one" : it.image) } : { ...it }; }   // F: pictures come from the Worker's /i/
function metaOf(db, g, withAbout) {
  const mk = db.makers[g.maker];
  const out = { id: g.maker + "/" + g.slug, maker: { slug: g.maker, name: mk.name }, slug: g.slug, title: g.title, template: g.template, lang: g.lang, mode: g.mode, start_day: g.start_day,
    keep_answers: g.keep_answers, want_listed: g.want_listed, status: status(g), plays: g.plays, items: g.items.length, code: g.code };
  if (withAbout) out.about = g.about;
  return out;
}

async function body(req) { const chunks = []; for await (const c of req) chunks.push(c); return Buffer.concat(chunks); }
function send(res, status, obj) { res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" }); res.end(JSON.stringify(obj)); }

export function startStudio({ root, port = 0, today }) {
  const db = makeDB(today);
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://x");
    const p = url.pathname;
    db.log.push(req.method + " " + p);
    try {
      /* ---- the API ---- */
      if (req.method === "GET" && p === "/list") {
        const games = Object.values(db.games).filter((g) => g.listed && g.want_listed && !g.hidden).map((g) => {
          const m = metaOf(db, g); const d = dayIndex(url.searchParams.get("day") || today) - dayIndex(g.start_day) + 1; m.today = g.mode === "daily" ? d >= 1 && d <= g.items.length : null; return m;
        });
        return send(res, 200, { ok: true, games });
      }
      let m;
      if (req.method === "GET" && (m = /^\/m\/([a-z0-9-]+)$/.exec(p))) {
        const mk = db.makers[m[1]]; if (!mk) return send(res, 404, { e: "not_found" });
        return send(res, 200, { ok: true, maker: { slug: mk.slug, name: mk.name }, games: mk.games.map((s) => db.games[mk.slug + "/" + s]).filter((g) => g && g.listed && g.want_listed && !g.hidden).map((g) => metaOf(db, g)), kits: mk.kits });
      }
      if (req.method === "GET" && (m = /^\/g\/([a-z0-9-]+)\/([a-z0-9-]+)$/.exec(p))) {
        const g = db.games[m[1] + "/" + m[2]]; if (!g) return send(res, 404, { e: "not_found" });
        if (g.hidden) return send(res, 410, { ok: false, e: "hidden" });
        const day = url.searchParams.get("day") || today;
        const out = { ok: true, game: metaOf(db, g, true) };
        if (g.mode === "open") { out.items = g.items.map(imgOut); out.state = "open"; }
        else {
          const n = dayIndex(day) - dayIndex(g.start_day) + 1;
          out.number = n;
          if (n < 1) out.state = "soon"; else if (n > g.items.length) { out.state = "out"; out.item = null; } else { out.state = "today"; out.item = imgOut(g.items[n - 1]); out.left = g.items.length - n; }
        }
        return send(res, 200, out);
      }
      if (req.method === "GET" && (m = /^\/code\/([A-Z0-9]+)$/.exec(p))) {
        const g = Object.values(db.games).find((x) => x.code === m[1]);
        return g ? send(res, 200, { ok: true, game: metaOf(db, g) }) : send(res, 404, { ok: false, e: "not_found" });
      }
      if (req.method === "GET" && (m = /^\/(?:__img|i)\/(.+)$/.exec(p))) {
        const im = m[1] === "anna-rossi/seed/one" ? { type: "image/jpeg", buf: fs.readFileSync(new URL("./seed.jpg", import.meta.url)) } : db.images[m[1]];
        if (!im) { res.writeHead(404); return res.end(); }
        res.writeHead(200, { "Content-Type": im.type }); return res.end(im.buf);
      }
      if (req.method === "POST") {
        if (p === "/img/put") {
          const raw = await body(req);
          const fd = await new Request("http://x/", { method: "POST", headers: { "content-type": req.headers["content-type"] }, body: raw }).formData();
          const key = fd.get("edit_key"), slug = fd.get("game"), file = fd.get("file");
          const g = Object.values(db.games).find((x) => x.edit_key === key && x.slug === slug);
          if (!g) return send(res, 403, { e: "bad_key" });
          if (!file || !/^image\/(jpeg|webp|png)$/.test(file.type)) return send(res, 400, { e: "bad_type" });
          const buf = Buffer.from(await file.arrayBuffer());
          if (buf.length > 500 * 1024) return send(res, 413, { e: "too_big" });
          const id = rid(10).toLowerCase();
          db.images[id] = { buf, type: file.type, game: g.slug, size: buf.length };
          return send(res, 200, { ok: true, id, url: "/i/" + id });
        }
        const b = JSON.parse((await body(req)).toString() || "{}");
        db.log.push("  " + JSON.stringify(b).slice(0, 400));
        if (p === "/maker/new") {
          const name = String(b.name || "").trim();
          if (name.length < 2 || name.length > 40) return send(res, 400, { e: "name" });
          let slug = slugify(name), k = 2; while (db.makers[slug]) slug = slugify(name) + "-" + k++;
          const key = rid(); db.makers[slug] = { slug, name, key, games: [], kits: [], terms_version: b.terms_version };
          return send(res, 200, { ok: true, slug, key, name });
        }
        if (p === "/maker/get") {
          const mk = Object.values(db.makers).find((x) => x.key === b.key); if (!mk) return send(res, 403, { e: "bad_key" });
          return send(res, 200, { ok: true, maker: { slug: mk.slug, name: mk.name }, games: mk.games.map((s) => metaOf(db, db.games[mk.slug + "/" + s])) });
        }
        if (p === "/game/new") {
          const mk = Object.values(db.makers).find((x) => x.key === b.maker_key); if (!mk) return send(res, 403, { e: "bad_key" });
          if (mk.blocked) return send(res, 403, { e: "blocked" });
          if (!String(b.title || "").trim()) return send(res, 400, { e: "title" });
          let slug = slugify(b.title), k = 2; while (db.games[mk.slug + "/" + slug]) slug = slugify(b.title) + "-" + k++;
          const g = { maker: mk.slug, slug, title: b.title, template: b.template, lang: b.lang, mode: b.mode, start_day: b.start_day, about: "", keep_answers: !!b.keep_answers,
            want_listed: !!b.want_listed, listed: false, hidden: false, plays: 0, code: rid(6).replace(/[0-9]/g, "Q"), edit_key: rid(), items: [], counts: {}, terms_version: b.terms_version };
          db.games[mk.slug + "/" + slug] = g; mk.games.push(slug);
          return send(res, 200, { ok: true, slug, edit_key: g.edit_key, code: g.code, id: mk.slug + "/" + slug });
        }
        const g = b.edit_key ? Object.values(db.games).find((x) => x.edit_key === b.edit_key) : null;
        if (p === "/game/mine") { if (!g) return send(res, 403, { ok: false, e: "bad_key" }); return send(res, 200, { ok: true, game: metaOf(db, g, true), items: g.items.map(imgOut) }); }
        if (p === "/game/save") {
          if (!g) return send(res, 403, { e: "bad_key" });
          if (!Array.isArray(b.items) || b.items.length > 500) return send(res, 400, { e: "items_cap" });
          Object.assign(g, { title: b.title, about: b.about, mode: b.mode, start_day: b.start_day, keep_answers: b.keep_answers, want_listed: b.want_listed });
          for (let i = 0; i < b.items.length; i++) {
            const it = b.items[i];
            if (!it || typeof it !== "object" || "json" in it || "right" in it || "img_url" in it) return send(res, 400, { ok: false, e: "item", i, field: "shape" });
            if (it.id && !g.items.some((x) => x.id === it.id)) return send(res, 400, { ok: false, e: "item", i, field: "id" });
            if (it.explain && it.explain.length > 300) return send(res, 400, { ok: false, e: "item", i, field: "explain" });
          }
          g.items = b.items.map((it) => ({ ...it, id: it.id || "i" + rid(6).toLowerCase() }));
          db.saves = (db.saves || 0) + 1;
          return send(res, 200, { ok: true, game: metaOf(db, g) });
        }
        if (p === "/game/delete") { if (!g) return send(res, 404, { e: "not_found" }); delete db.games[g.maker + "/" + g.slug]; return send(res, 200, { ok: true }); }
        if (p === "/img/del") { if (!g) return send(res, 403, { e: "bad_key" }); delete db.images[b.id]; db.log.push("deleted image " + b.id); return send(res, 200, { ok: true }); }
        if (p === "/play") {
          const [mk, gs] = String(b.game).split("/"); const gg = db.games[mk + "/" + gs]; if (!gg) return send(res, 404, { e: "not_found" });
          const it = gg.items.find((x) => x.id === b.item);
          if (!it) return send(res, 400, { ok: false, e: "item" });
          const lo = gg.template === "line" ? it.min : 0, hi = gg.template === "line" ? it.max : it.max;
          const bucket = Array.isArray(b.answer) ? b.answer.join("") : typeof b.answer === "number" && hi != null && !Array.isArray(it.choices) ? (hi - lo <= 100 ? String(b.answer) : "p" + Math.round((b.answer - lo) / (hi - lo) * 100)) : String(b.answer);
          gg.counts[b.item] = gg.counts[b.item] || {};
          if (!Object.keys(gg.counts[b.item]).length) {   /* a few other players before this one */
            if (gg.template === "pick" || gg.template === "read" || (gg.template === "picture" && it.form !== "number")) { gg.counts[b.item] = { 0: 3, 1: 9 }; }
            else if (gg.template === "rank") gg.counts[b.item] = { "0123": 2, "1023": 3 };
            else if (hi - lo <= 100) gg.counts[b.item] = { [Math.round(hi * 0.5)]: 4, [Math.round(hi * 0.7)]: 6, [Math.round(hi * 0.2)]: 1 };
            else gg.counts[b.item] = { p30: 3, p50: 4, ["p" + Math.round((it.answer - lo) / (hi - lo) * 100)]: 2 };
          }
          gg.counts[b.item][bucket] = (gg.counts[b.item][bucket] || 0) + 1;
          gg.plays++;
          db.plays.push(b);
          const n = Object.values(gg.counts[b.item]).reduce((x, y) => x + y, 0);
          return send(res, 200, { ok: true, bucket, counts: { n, b: gg.counts[b.item] } });
        }
        if (p === "/play/keep") { db.keeps.push(b); return send(res, 200, { ok: true }); }
        if (p === "/report") { if (!/^[a-z2-9]{16}$/.test(String(b.browser))) return send(res, 400, { ok: false, e: "browser" }); db.reports.push(b); return send(res, 200, { ok: true }); }
        return send(res, 404, { e: "not_found" });
      }
      /* ---- the static files, then the shell for every page path ---- */
      let file = path.join(root, decodeURIComponent(p));
      if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
      if (p.endsWith("/") && fs.existsSync(path.join(file, "index.html"))) file = path.join(file, "index.html");
      if (!(fs.existsSync(file) && fs.statSync(file).isFile() && !p.startsWith("/tests/"))) file = path.join(root, "index.html");
      if (file.endsWith(".html")) {   /* the tests' bridge runs on this computer: let the shell frame it */
        res.writeHead(200, { "Content-Type": MIME[".html"] });
        return res.end(fs.readFileSync(file, "utf8").replace("frame-src https://logicers.com", "frame-src https://logicers.com http://127.0.0.1:*"));
      }
      res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
      return fs.createReadStream(file).pipe(res);
    } catch (e) {
      console.error(e);
      return send(res, 500, { e: "server" });
    }
  });
  return new Promise((resolve) => server.listen(port, "127.0.0.1", () => resolve({ server, db, port: server.address().port })));
}

/* the other origin: logicers.com's stand-in, the whole games folder as GitHub Pages serves it */
export function startSite({ root, port = 0 }) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://x");
    let file = path.join(root, decodeURIComponent(url.pathname));
    if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    if (url.pathname.endsWith("/")) file = path.join(file, "index.html");
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream", "Access-Control-Allow-Origin": "*" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, "127.0.0.1", () => resolve({ server, port: server.address().port })));
}
