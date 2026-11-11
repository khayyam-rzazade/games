/* Logicers Studio: does any word overflow its box in any language? (chat E, 8 Nov 2026)
   Run: node studio/tests/lang-check.mjs [en it tr es pt fr]   (needs playwright; uses the same two local servers as run.mjs)
   Every page and state a phone reaches (directory, maker, each template before and after the answer, the Embed and Report
   sheets with their errors, the editor with its errors, the keep-your-link sheet, the terms) is opened at 320, 360 and 390 px,
   and every box is measured: sideways scroll, text outside its box, text cut off. English is the baseline: a box that is
   also over in English is the layout's own and is listed apart. */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { servers, browser, context, page, wait, HERE } from "./lib.mjs";

const ALL = ["en", "it", "tr", "es", "pt", "fr"];
const LANGS = process.argv.slice(2).length ? process.argv.slice(2) : ALL;
const WIDTHS = [320, 360, 390];
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(HERE, "../words.js"), "utf8"), sandbox);
const W = sandbox.window.STUDIO_WORDS;

const S = await servers();
const B = await browser();
const db = S.st.db;
const SLUGS = [["history-a-day", "pick"], ["how-many-a-day", "number"], ["when-was-it", "line"], ["oldest-first", "rank"], ["what-is-this", "picture"], ["read-and-answer", "read"], ["class-quiz", "open"]];

async function measure() {
  return page_measure.p.evaluate(() => {
    const out = [], vw = window.innerWidth;
    const sel = (e) => { let s = e.tagName.toLowerCase(); if (e.id) s += "#" + e.id; if (typeof e.className === "string" && e.className.trim()) s += "." + e.className.trim().split(/\s+/).slice(0, 2).join("."); return s; };
    if (document.documentElement.scrollWidth > vw + 1) out.push({ kind: "page-scrolls-sideways", el: "html", text: document.documentElement.scrollWidth + " > " + vw });
    for (const e of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(e);
      if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") continue;
      if (e.closest("[hidden],[aria-hidden='true'],canvas,svg")) continue;
      const r = e.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const own = [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(" ").trim();
      const text = own || (e.matches("input,textarea,select") ? (e.value || e.placeholder || "") : "");
      if (!text) continue;
      const t = text.slice(0, 60);
      if (r.right > vw + 1 || r.left < -1) out.push({ kind: "outside-screen", el: sel(e), text: t });
      if (cs.display !== "inline" && !/auto|scroll/.test(cs.overflowX) && e.scrollWidth > e.clientWidth + 1) out.push({ kind: "text-bursts-box", el: sel(e), text: t });
      if (cs.display !== "inline" && /hidden|clip/.test(cs.overflowY) && e.scrollHeight > e.clientHeight + 1 && !e.matches("input,textarea,select")) out.push({ kind: "text-cut-off", el: sel(e), text: t });
    }
    return out;
  });
}
const page_measure = { p: null };
const found = new Map();       // key -> {lang, widths:Set, ...}
const notRun = [];

async function look(L, width, state) {
  const issues = await measure();
  for (const i of issues) {
    const key = [L, state, i.kind, i.el, i.text].join("|");
    if (!found.has(key)) found.set(key, { L, state, ...i, widths: new Set() });
    found.get(key).widths.add(width);
  }
}
async function step(L, width, state, fn) {
  try { await fn(); await wait(150); await look(L, width, state); if (process.env.V) console.log("ok", L, width, state); }
  catch (e) { notRun.push(`${L} ${width} ${state}: ${String(e.message).split("\n")[0]}`); if (process.env.V) console.log("NOT RUN", L, width, state, String(e.message).split("\n")[0]); }
}
const btnText = (p, text, scope = "") => p.locator(`${scope} button:text-is(${JSON.stringify(text)})`).first();

async function playIt(p, tpl, L) {
  if (tpl === "number" || tpl === "line" || tpl === "picnum") {
    const box = await p.locator(".st-track").boundingBox();
    await p.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2);
    await p.mouse.down(); await p.mouse.move(box.x + box.width * 0.6, box.y + box.height / 2, { steps: 6 }); await p.mouse.up();
    await p.click(".st-step >> nth=1");
  } else if (tpl === "rank") {
    const rows = p.locator(".st-thing");
    const a = await rows.nth(0).boundingBox(), c = await rows.nth(2).boundingBox();
    await p.mouse.move(a.x + a.width / 2, a.y + a.height / 2); await p.mouse.down();
    await p.mouse.move(a.x + a.width / 2, c.y + c.height / 2 + 4, { steps: 10 }); await p.mouse.up();
  } else { await p.click(".st-choice >> nth=1"); }
  await p.click(".st-main .btn.solid");
  await p.waitForSelector(".st-after:not([hidden])", { timeout: 6000 });
  await wait(900);
}

for (const L of LANGS) {
  for (const g of Object.values(db.games)) g.lang = L;
  for (const m of Object.values(db.makers)) m.lang = L;
  for (const width of WIDTHS) {
    const ctx = await context(B, S, { viewport: { width, height: 740 }, mobile: true, locale: L === "en" ? "en-GB" : L });
    const p = await page(ctx); page_measure.p = p; p.setDefaultTimeout(4000);
    const ui = (u) => S.base + u + "?lang=" + L;
    const ready = () => p.waitForSelector(".st-main:not(:has(.st-wait))", { timeout: 8000 }).catch(() => {});

    for (const [url, name] of [["/", "directory"], ["/anna-rossi/", "maker page"], ["/anna-rossi/how-many-a-day/about/", "about"], ["/terms/", "terms"], ["/nobody-here/", "unknown maker"]])
      await step(L, width, name, async () => { await p.goto(ui(url)); await ready(); });

    await step(L, width, "directory: unknown code", async () => { await p.goto(ui("/")); await ready(); await p.fill("input", "ZZZZZZ"); await p.keyboard.press("Enter"); await wait(500); });

    for (const [slug, tpl] of SLUGS) {
      if (tpl === "open") {
        await step(L, width, "game open: list of questions", async () => { await p.goto(S.base + "/anna-rossi/" + slug + "/?lang=" + L); await p.waitForSelector(".st-items", { timeout: 8000 }); });
        await step(L, width, "game open: after the answer (Next)", async () => { await p.click(".st-items button >> nth=0"); await playIt(p, "pick", L); });
        await step(L, width, "game open: list with one done", async () => { await p.click(`.st-after >> text=${W[L]["play.next"]}`); await playIt(p, "pick", L); await p.click(`text=${W[L]["play.list"]}`); await p.waitForSelector(".st-items"); });
        continue;
      }
      await step(L, width, `game ${tpl}: question`, async () => { await p.goto(S.base + "/anna-rossi/" + slug + "/?lang=" + L); await p.waitForSelector(".st-play, .st-keep", { timeout: 8000 }); });
      if (slug === "history-a-day" || slug === "how-many-a-day") {   // 9 Nov 2026: the "?" sheet, without and with the maker's About
        await step(L, width, `"?" sheet ${tpl}`, async () => { await p.click(".st-bar .st-help"); await p.waitForSelector("dialog .st-how"); });
        await p.keyboard.press("Escape").catch(() => {});
        await wait(150);
      }
      if (tpl === "read") {
        await step(L, width, "game read: keep-answers screen", async () => { await p.waitForSelector(".st-keep", { timeout: 4000 }); });
        await step(L, width, "game read: question after skip", async () => { await btnText(p, W[L]["keep.skip"]).click(); await p.waitForSelector(".st-play"); });
      }
      await step(L, width, `game ${tpl}: after the answer`, async () => { await playIt(p, tpl, L); });
      if (slug === "history-a-day") {
        await step(L, width, "embed sheet", async () => { await p.locator(".st-after button.st-ichip", { hasText: W[L]["play.embed"] }).first().click(); await p.waitForSelector("dialog"); await p.click("dialog .st-copycode"); await wait(200); });
        await p.keyboard.press("Escape").catch(() => {});
        await step(L, width, "report sheet: asks for a reason", async () => { await p.locator(".st-notice button").first().click(); /* F: Report lives in the notice line */ await p.click("dialog button.btn.solid"); });
        await step(L, width, "report sheet: asks for the tick", async () => { await p.click(`dialog >> text=${W[L]["rep.why_wrong"]}`); await p.click("dialog button.btn.solid"); });
        await step(L, width, "report sheet: filled in", async () => { await p.fill("#rep-text", "x"); await p.check("dialog input[type=checkbox]"); });
        await p.keyboard.press("Escape").catch(() => {});
      }
    }
    for (const [slug, name] of [["ran-out", "stock out"], ["not-yet", "not started"], ["gone-one", "hidden game"]])
      await step(L, width, name, async () => { await p.goto(S.base + "/anna-rossi/" + slug + "/?lang=" + L); await p.waitForSelector("h1, .st-out", { timeout: 6000 }); });

    /* the editor: errors first, then each template, the keep sheet, an item with its errors, the settings, the delete sheet */
    if (width !== 360) {
      await step(L, width, "new: first look", async () => { await p.goto(ui("/new/")); await p.waitForSelector(".ed-tpls"); });
      await step(L, width, "new: every error", async () => { await p.click(".ed .btn.solid.st-gap"); });
      /* a phone with no My Logicers code (pick), then one that keeps a code (the other five) */
      const ctx2 = await context(B, S, { viewport: { width, height: 740 }, mobile: true, locale: L === "en" ? "en-GB" : L });
      const site = await ctx2.newPage();
      await site.goto(S.siteBase + "/studio/tests/host.html");
      await site.evaluate(() => localStorage.setItem("lg.me.v1", JSON.stringify({ v: 1, code: "river-bluer-camel-42" })));
      const p2 = await page(ctx2); p2.setDefaultTimeout(4000);
      let first2 = true;
      for (const tpl of ["pick", "number", "line", "rank", "picture", "read"]) {
        const seeded = tpl !== "pick";
        page_measure.p = seeded ? p2 : p;
        const q = page_measure.p;
        await step(L, width, `editor ${tpl}: new game form, keep and list on`, async () => {
          await q.goto(ui("/new/")); await q.waitForSelector(".ed-tpls");
          if (await q.locator("#f-name").count()) await q.fill("#f-name", "Prof " + L + width + (seeded ? "b" : "a"));
          await q.click(`.ed-tpl[data-v=${tpl}]`); await q.fill("#f-title", "Bianchi " + tpl);
          await q.check("#f-terms");
        });
        await step(L, width, `editor ${tpl}: keep-your-link sheet`, async () => {
          await q.click(".ed .btn.solid.st-gap"); await q.waitForSelector(".kp");
          if (seeded) await q.waitForSelector(".kp-tile.done", { timeout: 6000 });
        });
        if (!seeded) {
          await step(L, width, "keep sheet: after copying", async () => { await q.locator(".kp-tile").first().click(); await wait(400); });
        }
        await step(L, width, `editor ${tpl}: editor page`, async () => { await btnText(q, W[L]["kp.done"], ".kp").click(); await q.waitForSelector(".ed-dock"); });
        await step(L, width, `editor ${tpl}: new question form`, async () => { await q.click(".ed-add"); await q.waitForSelector(".ed-item:last-child .ed-ibody:not([hidden])"); });
        await step(L, width, `editor ${tpl}: question errors`, async () => { await q.click(".ed-dock .btn"); });
        await step(L, width, `editor ${tpl}: settings, status and delete`, async () => { await q.locator(".ed-del").scrollIntoViewIfNeeded(); });
        if (tpl === "pick") await step(L, width, "editor: delete sheet", async () => { await q.click(".ed-del"); await q.waitForSelector("dialog"); });
        await q.keyboard.press("Escape").catch(() => {});
      }
      /* 9 Nov 2026: /new/ with the maker's games first; a question whose picture Logicers removed */
      page_measure.p = p2;
      await step(L, width, "new: your games first", async () => { await p2.goto(ui("/new/")); await p2.waitForSelector(".ed-mine-row"); });
      page_measure.p = p;
      await step(L, width, "editor: a picture Logicers removed", async () => { await p.goto(S.base + "/anna-rossi/lost-picture/edit/?lang=" + L + "#" + db.games["anna-rossi/lost-picture"].edit_key); await p.waitForSelector(".ed-gone"); });
      /* 11 Nov 2026: new questions on days gone, then the unsaved changes offered back */
      await step(L, width, "editor: new questions on days gone", async () => {
        p.removeAllListeners("dialog"); p.on("dialog", (d) => d.accept().catch(() => {}));
        await p.goto(S.base + "/anna-rossi/ran-out/edit/?lang=" + L + "#" + db.games["anna-rossi/ran-out"].edit_key); await p.waitForSelector(".ed-list");
        await p.click(".ed-add"); await p.fill(".ed-item:last-child [id$='-q']", "x"); await p.waitForSelector(".ed-past:not([hidden])");
      });
      await step(L, width, "editor: unsaved changes offered back", async () => { await p.reload(); await p.waitForSelector(".ed-draft"); });
      await p.evaluate(() => localStorage.removeItem("lg.studio.drafts")).catch(() => {});
      await ctx2.close();
    }
    await ctx.close();
  }
}

/* ---- report ---- */
const en = new Set([...found.values()].filter((f) => f.L === "en").map((f) => [f.state, f.kind, f.el].join("|")));
const rows = [...found.values()].filter((f) => f.L !== "en" || true);
const mine = rows.filter((f) => f.L === "en" || !en.has([f.state, f.kind, f.el].join("|")));
console.log("\nBoxes over in English too (the layout's own): " + [...found.values()].filter((f) => f.L === "en").length);
for (const f of [...found.values()].filter((f) => f.L === "en")) console.log(`  en | ${f.state} | ${f.kind} | ${f.el} | "${f.text}" | ${[...f.widths].join(",")}px`);
console.log("\nOver only in a translation: " + mine.filter((f) => f.L !== "en").length);
for (const f of mine.filter((f) => f.L !== "en")) console.log(`  ${f.L} | ${f.state} | ${f.kind} | ${f.el} | "${f.text}" | ${[...f.widths].join(",")}px`);
console.log("\nStates that did not run: " + notRun.length);
for (const n of notRun) console.log("  " + n);
await B.close(); S.close();
process.exit(0);
