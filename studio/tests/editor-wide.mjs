/* Logicers Studio: the editor in columns, and our own date picker for "First day" (11 Nov 2026).
   Called by run.mjs (section 4b); `node studio/tests/editor-wide.mjs` runs only these. Needs playwright; uses the same two local
   servers as run.mjs.
   Job 1: from 1000 px the questions are a column of their own (a list that scrolls inside it, "Add a question" always in view),
          the open question is the middle column, the settings the right one (from 1248 px) or under the question; a phone keeps
          its one column and its way of opening a question under its row.
   Job 2: the date is a button that opens our own calendar: the date written out by Intl, the week as the language's region
          starts it, today marked, past days open as the Worker allows, the keys of a date picker, names for a screen reader,
          fine at 320 px, anchored under the field from 700 px, light and dark, reduced motion. */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { servers, browser, context, page, check, report, noOverflow, wait, SHOTS } from "./lib.mjs";
import { dayOk } from "../../server/studio/src/util.js";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const rect = (p, sel) => p.locator(sel).first().evaluate((e) => { const r = e.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom, w: r.width, h: r.height }; });
const dayAdd = (s, n) => { const d = new Date(Date.parse(s + "T00:00:00Z") + n * 864e5); return d.toISOString().slice(0, 10); };

/* a game of many questions, to scroll the list; taken out again at the end (other sections count the maker's games) */
function manyGame(db, n, today) {
  const src = db.games["anna-rossi/history-a-day"];
  const slug = "many-questions";
  db.games["anna-rossi/" + slug] = { ...src, slug, title: "Many questions", edit_key: "MANYQUESTIONSKEYAAAAAAAA", code: "KMANYQ", plays: 0, want_listed: false, listed: false, start_day: dayAdd(today, -2),
    items: Array.from({ length: n }, (_, i) => ({ id: "m" + String(i).padStart(5, "0"), q: "Question number " + (i + 1) + ": which of these is the right one to pick today?", choices: ["Alpha", "Beta", "Gamma"], answer: i % 3, explain: "" })) };
  db.makers["anna-rossi"].games.push(slug);
  return db.games["anna-rossi/" + slug];
}
function dropGame(db) {
  delete db.games["anna-rossi/many-questions"];
  db.makers["anna-rossi"].games = db.makers["anna-rossi"].games.filter((s) => s !== "many-questions");
}
const lum = (c) => { const v = c.map((x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const rgb = (s) => (String(s).match(/[\d.]+/g) || []).slice(0, 3).map(Number);
/* what a day button, a title, a weekday look like, as colours: the page's own, not a guess */
const colours = (p) => p.evaluate(() => {
  const c = (sel, prop = "color") => { const e = document.querySelector(sel); return e ? getComputedStyle(e)[prop] : ""; };
  return { card: c("dialog.dp-dlg", "backgroundColor"), day: c(".dp-day:not(.is-out):not(.is-sel):not(.is-today)"), sel: c(".dp-day.is-sel"), selBg: c(".dp-day.is-sel", "backgroundColor"),
    today: c(".dp-day.is-today"), th: c(".dp-grid th"), tdBg: c(".dp-today", "backgroundColor"), tdText: c(".dp-today") };
});

export async function run(S, B) {
  const db = S.st.db;
  const today = await (async () => { const ctx = await context(B, S); const p = await ctx.newPage(); await p.goto(S.base + "/terms/"); const t = await p.evaluate(() => window.Studio.today()); await ctx.close(); return t; })();
  const many = manyGame(db, 30, today);
  const EDIT = (g, q = "") => S.base + "/" + g.maker + "/" + g.slug + "/edit/" + q + "#" + g.edit_key;
  const hist = db.games["anna-rossi/history-a-day"], ranOut = db.games["anna-rossi/ran-out"];
  const keep = { hist: hist.start_day, ran: ranOut.start_day };      // the sections before this one may have moved them; the checks want them as seeded
  hist.start_day = dayAdd(today, -2); ranOut.start_day = dayAdd(today, -10);

  /* ================= job 1: the editor in columns ================= */
  console.log("4b. the editor in columns");
  {
    const ctx = await context(B, S, { viewport: { width: 1280, height: 800 }, dpr: 1 });
    const p = await page(ctx);
    p.on("dialog", (d) => d.accept());
    await p.goto(EDIT(many));
    await p.waitForSelector(".ed-item");
    await wait(300);
    const rail = await rect(p, ".ed-head"), panel = await rect(p, ".ed-panel"), sets = await rect(p, ".ed-settings");
    check(rail.l < panel.l && panel.l < sets.l, `1280: three columns, left to right (${Math.round(rail.l)}, ${Math.round(panel.l)}, ${Math.round(sets.l)})`);
    check(Math.abs(panel.t - sets.t) < 2 && Math.abs(panel.t - rail.t) < 2, `1280: the three start on the same line (${Math.round(rail.t)}, ${Math.round(panel.t)}, ${Math.round(sets.t)})`);
    check(await noOverflow(p), "1280: no sideways scroll");
    const bar = await rect(p, ".st-bar"), main = await rect(p, ".st-main.ed");
    check(Math.abs(bar.l - main.l) < 2 && Math.abs(bar.r - main.r) < 2, `1280: the bar lines up with the columns (${Math.round(bar.l)}-${Math.round(bar.r)} and ${Math.round(main.l)}-${Math.round(main.r)})`);

    /* one question is always open: the first; its fields are in the middle column */
    check(await p.locator(".ed-slot .ed-ibody:not([hidden])").count() === 1 && await p.locator(".ed-item .ed-ibody:not([hidden])").count() === 0, "wide: the open question's fields are in the middle column, none under a row");
    check(await p.locator(".ed-item:nth-child(1) .ed-isum[aria-current='true']").count() === 1 && await p.locator(".ed-isum[aria-expanded]").count() === 0, "wide: the open row says so with aria-current (and not aria-expanded)");
    const lab = await p.locator(".ed-panel").getAttribute("aria-labelledby");
    check(lab === (await p.locator(".ed-item:nth-child(1) .ed-isum b").getAttribute("id")) && (await p.locator(".ed-panel").getAttribute("role")) === "region", "wide: the middle column is a region named by the question");
    check((await p.textContent(".ed-phead .ed-n")) === "1" && /Mon|Tue|Wed|Thu|Fri|Sat|Sun/.test(await p.textContent(".ed-phead .ed-pt")), "wide: its heading carries the number and the day");
    check((await p.inputValue("[id$='-q']")) === "Question number 1: which of these is the right one to pick today?", "wide: question 1 is the one open");

    /* another row: it changes; only one is ever open; the row keeps its summary in step with the typing */
    await p.click(".ed-item:nth-child(4) .ed-isum");
    check((await p.inputValue("[id$='-q']")).startsWith("Question number 4:") && (await p.textContent(".ed-phead .ed-n")) === "4", "wide: another row opens its question in the same place");
    check(await p.locator(".ed-slot .ed-ibody").count() === 1 && await p.locator(".ed-item:nth-child(4) .ed-isum[aria-current='true']").count() === 1 && await p.locator(".ed-isum[aria-current='true']").count() === 1, "wide: one open at a time; the mark moved");
    await p.fill("[id$='-q']", "Which one is it?");
    check((await p.textContent(".ed-item:nth-child(4) .ed-isum b")) === "Which one is it?", "wide: typing shows in the row at once");
    await p.click(".ed-item:nth-child(4) .ed-isum");
    check(await p.locator(".ed-slot .ed-ibody:not([hidden])").count() === 1 && (await p.inputValue("[id$='-q']")) === "Which one is it?", "wide: tapping the open row changes nothing (it does not close)");

    /* the keys: up and down move along the list without opening; Enter opens */
    await p.focus(".ed-item:nth-child(4) .ed-isum");
    await p.keyboard.press("ArrowDown");
    const f5 = await p.evaluate(() => document.activeElement === document.querySelector(".ed-item:nth-child(5) .ed-isum"));
    check(f5 && (await p.textContent(".ed-phead .ed-n")) === "4", "keys: ArrowDown moves to the next row and leaves the open question alone");
    await p.keyboard.press("End");
    check(await p.evaluate(() => document.activeElement === document.querySelector(".ed-item:last-child .ed-isum")), "keys: End goes to the last row");
    const listBox = await rect(p, ".ed-list"), lastBox = await rect(p, ".ed-item:last-child");
    check(lastBox.b <= listBox.b + 1 && lastBox.t >= listBox.t - 1, "keys: the list scrolled to keep the focused row in view");
    await p.keyboard.press("Enter");
    check((await p.textContent(".ed-phead .ed-n")) === "30" && (await p.inputValue("[id$='-q']")).startsWith("Question number 30:"), "keys: Enter opens it in the middle column");
    check(await p.evaluate(() => /-q$/.test(document.activeElement.id) && !!document.activeElement.closest(".ed-panel")), "keys: and the cursor goes into the question, so Tab does not have to pass every other row");
    await p.keyboard.press("Escape");
    check(await p.evaluate(() => document.activeElement === document.querySelector(".ed-isum[aria-current='true']")), "keys: Escape in the question goes back to its row");
    await p.click(".ed-item:nth-child(4) .ed-isum");
    check(await p.evaluate(() => document.activeElement === document.querySelector(".ed-item:nth-child(4) .ed-isum")), "mouse: a click on a row leaves the cursor on the row (no keyboard pops up on a tablet)");
    await p.keyboard.press("Home");
    check(await p.evaluate(() => document.activeElement === document.querySelector(".ed-item:first-child .ed-isum")), "keys: Home goes back to the first row");

    /* thirty questions: the list scrolls inside its column, Add is always in view, the column stays in view */
    const ls = await p.locator(".ed-list").evaluate((e) => ({ sh: e.scrollHeight, ch: e.clientHeight, oy: getComputedStyle(e).overflowY }));
    check(ls.oy === "auto" && ls.sh > ls.ch + 100, `30 questions: the list scrolls inside its column (${ls.sh} in ${ls.ch})`);
    const dock = await rect(p, ".ed-dock"), add0 = await rect(p, ".ed-add");
    check(add0.b <= dock.t + 1 && add0.t >= 0, `30 questions: "Add a question" is in view above the Save bar at the top of the page (${Math.round(add0.b)} <= ${Math.round(dock.t)})`);
    await p.evaluate(() => window.scrollTo(0, 900)); await wait(300);
    const rail2 = await rect(p, ".ed-rail"), add1 = await rect(p, ".ed-add");
    check(rail2.t <= 1 && add1.b <= dock.t + 1 && add1.t >= 0, `30 questions: scrolled down, the column stays in view and so does Add (rail top ${Math.round(rail2.t)}, add bottom ${Math.round(add1.b)})`);
    await p.evaluate(() => window.scrollTo(0, 0)); await wait(200);

    /* add, move, delete */
    await p.click(".ed-add");
    await wait(150);
    check((await p.textContent(".ed-qs .st-h2")).endsWith("31") && (await p.textContent(".ed-phead .ed-n")) === "31", "add: question 31 is there and open in the middle column");
    check(await p.evaluate(() => /-q$/.test(document.activeElement.id) && !!document.activeElement.closest(".ed-panel")), "add: the cursor is in its question field");
    await p.click(".ed-slot .ed-ifoot .st-danger-chip");
    await wait(150);
    check((await p.textContent(".ed-qs .st-h2")).endsWith("30") && (await p.textContent(".ed-phead .ed-n")) === "30", "delete the last: the one before it opens");
    await p.click(".ed-item:nth-child(2) .ed-isum");
    await p.click(".ed-slot .ed-ifoot .chip.round >> nth=1");                 // ↓
    const order = await p.locator(".ed-isum b").evaluateAll((bs) => bs.slice(0, 4).map((b) => b.textContent.slice(0, 18)));
    check(order[1].startsWith("Question number 3") && order[2].startsWith("Question number 2"), "move: ↓ swaps the rows (" + order.join(" | ") + ")");
    check((await p.textContent(".ed-phead .ed-n")) === "3" && (await p.inputValue("[id$='-q']")).startsWith("Question number 2:"), "move: the moved question stays open (now number 3)");
    check(await p.evaluate(() => document.activeElement && document.activeElement.getAttribute("aria-label") === "Move down"), "move: the keys stay on the button");
    await p.click(".ed-slot .ed-ifoot .st-danger-chip");
    await wait(150);
    check((await p.textContent(".ed-qs .st-h2")).endsWith("29") && await p.locator(".ed-slot .ed-ibody:not([hidden])").count() === 1 && (await p.inputValue("[id$='-q']")) === "Which one is it?", "delete: the next question opens in its place");
    check(await p.evaluate(() => document.activeElement === document.querySelector(".ed-isum[aria-current='true']")), "delete: the keys go to the open row");

    /* Save with a question left empty: that question opens in the middle column, with its error */
    await p.click(".ed-item:nth-child(7) .ed-isum");
    await p.fill("[id$='-q']", "");
    await p.click(".ed-item:nth-child(1) .ed-isum");
    await p.click(".ed-dock button.btn.solid");
    await p.waitForSelector(".ed-item.bad", { timeout: 4000 }).catch(() => {});
    check(await p.locator(".ed-item:nth-child(7).bad").count() === 1 && (await p.textContent(".ed-phead .ed-n")) === "7" && await p.locator(".ed-panel .ed-err:not(:empty)").count() >= 1, "save: the first question with a mistake opens in the middle column and says what");
    await p.fill("[id$='-q']", "Fixed it");
    await p.click(".ed-dock button.btn.solid");
    await p.waitForFunction(() => /Saved/.test((document.querySelector(".ed-state") || {}).textContent || ""), null, { timeout: 5000 }).catch(() => {});
    check(many.items.length === 29 && many.items[6].q === "Fixed it" && many.items.some((it) => it.q.startsWith("Which one is it?")), "save: what was typed in the middle column is what is saved");

    /* the window narrows to a phone and widens again: the open question goes under its row and comes back */
    await p.setViewportSize({ width: 390, height: 844 }); await wait(300);
    check(await p.locator(".ed-item .ed-ibody:not([hidden])").count() === 1 && await p.locator(".ed-slot .ed-ibody").count() === 0 && await p.locator(".ed-item.is-open > .ed-ibody:not([hidden])").count() === 1, "resize to a phone: the open question moves under its row");
    check(await p.locator(".ed-item.is-open .ed-isum[aria-expanded='true']").count() === 1 && await p.locator(".ed-isum[aria-current]").count() === 0 && await p.locator(".ed-panel").isHidden(), "resize to a phone: aria-expanded, no middle column");
    check(await noOverflow(p), "resize to a phone: no sideways scroll");
    await p.setViewportSize({ width: 1280, height: 800 }); await wait(300);
    check(await p.locator(".ed-slot .ed-ibody:not([hidden])").count() === 1 && (await p.textContent(".ed-phead .ed-n")) === "7", "resize to wide again: the same question is open in the middle column");
    check(p.__errors.length === 0, "columns 1280: no errors " + p.__errors.join(" | "));
    await ctx.close();
  }

  /* drag by the grip on a wide screen: the open question stays the open question, the list scrolls itself near its edge */
  {
    const ctx = await context(B, S, { viewport: { width: 1280, height: 800 }, dpr: 1 });
    const p = await page(ctx);
    await p.goto(EDIT(many)); await p.waitForSelector(".ed-item"); await wait(300);
    await p.click(".ed-item:nth-child(2) .ed-isum");
    const txt = () => p.locator(".ed-isum b").evaluateAll((bs) => bs.map((b) => b.textContent.slice(0, 22)));
    const before = await txt(), openQ = await p.inputValue("[id$='-q']");
    const g1 = await rect(p, ".ed-item:nth-child(1) .st-grip"), r3 = await rect(p, ".ed-item:nth-child(3)");
    await p.mouse.move(g1.l + g1.w / 2, g1.t + g1.h / 2); await p.mouse.down();
    await p.mouse.move(g1.l + g1.w / 2, r3.t + r3.h - 4, { steps: 14 }); await p.mouse.up(); await wait(300);
    const after = await txt();
    check(after[0] === before[1] && after[1] === before[2] && after[2] === before[0], "drag: row 1 goes below row 3 by its grip (" + after.slice(0, 3).join(" | ") + ")");
    const dn = [await p.textContent(".ed-phead .ed-n"), await p.textContent(".ed-item.is-open .ed-n"), await p.inputValue("[id$='-q']")];
    check(dn[0] === "1" && dn[1] === "1" && dn[2] === openQ, "drag: the question that was open is still the open one, now first (" + dn[2].slice(0, 20) + ")");
    const g2 = await rect(p, ".ed-item:nth-child(1) .st-grip"), box = await rect(p, ".ed-list");
    await p.mouse.move(g2.l + g2.w / 2, g2.t + g2.h / 2); await p.mouse.down();
    await p.mouse.move(g2.l + g2.w / 2, box.b - 6, { steps: 8 });
    for (let i = 0; i < 40; i++) { await p.mouse.move(g2.l + g2.w / 2, box.b - 4 + (i % 2)); await wait(16); }
    await p.mouse.up(); await wait(200);
    const sc = await p.locator(".ed-list").evaluate((e) => e.scrollTop);
    check(sc > 40, "drag: held near the bottom of the list, the list scrolls by itself (" + Math.round(sc) + ")");
    check(await noOverflow(p) && p.__errors.length === 0, "drag on a wide screen: no errors " + p.__errors.join(" | "));
    await ctx.close();
  }

  /* the lines between: 999 is one column, 1000 two, 1247 two, 1248 three */
  {
    const ctx = await context(B, S, { viewport: { width: 999, height: 800 }, dpr: 1 });
    const p = await page(ctx);
    await p.goto(EDIT(hist)); await p.waitForSelector(".ed-item"); await wait(250);
    const cols = async () => { const r = await rect(p, ".ed-rail"), pn = await p.locator(".ed-panel").isVisible() ? await rect(p, ".ed-panel") : null, s = await rect(p, ".ed-settings"); return { r, pn, s }; };
    let c = await cols();
    check(!c.pn && Math.abs(c.s.l - (await rect(p, ".ed-head")).l) < 2 && await p.locator(".ed-item .ed-ibody:not([hidden])").count() === 0, "999: one column, nothing open, no middle column");
    check(await noOverflow(p), "999: no sideways scroll");
    await p.setViewportSize({ width: 1000, height: 800 }); await wait(300);
    c = await cols();
    check(c.pn && c.r.l < c.pn.l && Math.abs(c.pn.l - c.s.l) < 2 && c.s.t >= c.pn.b - 1, `1000: two columns, the settings under the question (${Math.round(c.r.l)}, ${Math.round(c.pn && c.pn.l)}; settings top ${Math.round(c.s.t)} >= ${Math.round(c.pn && c.pn.b)})`);
    check(await noOverflow(p), "1000: no sideways scroll");
    await p.setViewportSize({ width: 1247, height: 800 }); await wait(300);
    c = await cols();
    check(c.pn && Math.abs(c.pn.l - c.s.l) < 2 && c.s.t >= c.pn.b - 1, "1247: still two columns");
    await p.setViewportSize({ width: 1248, height: 800 }); await wait(300);
    c = await cols();
    check(c.pn && c.s.l > c.pn.r && Math.abs(c.s.t - c.pn.t) < 2, "1248: three columns");
    await p.setViewportSize({ width: 1600, height: 900 }); await wait(300);
    const m = await rect(p, ".st-main.ed"), b = await rect(p, ".st-bar");
    check(m.w <= 1281 && Math.abs(m.l - b.l) < 2, `1600: the columns stay together in the middle (${Math.round(m.w)} wide) and the bar with them`);
    check(p.__errors.length === 0, "columns 999-1600: no errors " + p.__errors.join(" | "));
    await ctx.close();
  }

  /* a draft offered back, and a new question on days gone: they sit across / in the left column on a wide screen */
  {
    const ro = db.games["anna-rossi/ran-out"];
    const ctx = await context(B, S, { viewport: { width: 1100, height: 800 }, dpr: 1 });
    const p = await page(ctx);
    await p.goto(EDIT(ro)); await p.waitForSelector(".ed-item"); await wait(250);
    await p.click(".ed-add");
    await p.fill("[id$='-q']", "One more");
    await p.waitForSelector(".ed-past:not([hidden])");
    const past = await rect(p, ".ed-past"), rail = await rect(p, ".ed-rail"), dock = await rect(p, ".ed-dock");
    check(past.l >= rail.l - 1 && past.r <= rail.r + 1 && past.b <= dock.t + 1, "days gone, wide: the note is in the left column and in view");
    await p.reload(); await p.waitForSelector(".ed-draft"); await wait(200);
    const dr = await rect(p, ".ed-draft"), mn = await rect(p, ".st-main.ed"), pn = await rect(p, ".ed-panel");
    check(dr.w > mn.w - 40 && dr.b <= pn.t + 1, "draft, wide: the offer runs across the top, over the columns");
    await p.evaluate(() => localStorage.removeItem("lg.studio.drafts"));
    check(p.__errors.length === 0, "draft, wide: no errors " + p.__errors.join(" | "));
    await ctx.close();
  }

  /* a phone is as it was: nothing open, one at a time, tap again to close */
  {
    const ctx = await context(B, S, { viewport: { width: 390, height: 844 }, mobile: true });
    const p = await page(ctx);
    await p.goto(EDIT(hist)); await p.waitForSelector(".ed-item"); await wait(250);
    check(await p.locator(".ed-ibody:not([hidden])").count() === 0 && await p.locator(".ed-panel").isHidden() && await p.locator(".ed-isum[aria-expanded='false']").count() === 3, "phone: nothing open, the rows say so");
    await p.tap(".ed-item:nth-child(2) .ed-isum");
    check(await p.locator(".ed-item:nth-child(2) > .ed-ibody:not([hidden])").count() === 1 && await p.locator(".ed-isum[aria-expanded='true']").count() === 1, "phone: a tap opens the question under its row");
    await p.tap(".ed-item:nth-child(3) .ed-isum");
    check(await p.locator(".ed-ibody:not([hidden])").count() === 1 && await p.locator(".ed-item:nth-child(3) > .ed-ibody:not([hidden])").count() === 1, "phone: another row opens, the first closes");
    await p.tap(".ed-item:nth-child(3) .ed-isum");
    check(await p.locator(".ed-ibody:not([hidden])").count() === 0 && await p.locator(".ed-isum[aria-expanded='true']").count() === 0, "phone: a tap on the open row closes it");
    const ys = [];
    for (const s of [".ed-head", ".ed-qs", ".ed-settings", ".ed-del"]) ys.push(Math.round((await rect(p, s)).t));
    const xs = [];
    for (const s of [".ed-head", ".ed-qs", ".ed-settings"]) xs.push(Math.round((await rect(p, s)).l));
    check(ys[0] < ys[1] && ys[1] < ys[2] && ys[2] < ys[3] && xs.every((x) => x === xs[0]), "phone: one column: the game, the questions, the settings, Delete (" + ys.join(", ") + ")");
    check(await noOverflow(p) && p.__errors.length === 0, "phone: no sideways scroll, no errors " + p.__errors.join(" | "));
    await ctx.close();
  }

  /* the wide editor, light and dark, motion on and off: screenshots and no errors */
  for (const [w, h] of [[1000, 760], [1280, 800]]) for (const dark of [false, true]) for (const reduced of [false, true]) {
    if (reduced && !(w === 1280 && !dark)) continue;
    const ctx = await context(B, S, { viewport: { width: w, height: h }, dpr: 1, dark, reduced });
    const p = await page(ctx);
    await p.goto(EDIT(many)); await p.waitForSelector(".ed-item"); await wait(350);
    await p.click(".ed-item:nth-child(3) .ed-isum"); await wait(250);
    await p.screenshot({ path: path.join(SHOTS, `editor-wide-${w}${dark ? "-dark" : ""}${reduced ? "-reduced" : ""}.png`) });
    check(await noOverflow(p) && p.__errors.length === 0, `wide ${w}${dark ? " dark" : ""}${reduced ? " reduced" : ""}: no sideways scroll, no errors ${p.__errors.join(" | ")}`);
    await ctx.close();
  }

  /* ================= job 2: the date picker ================= */
  console.log("4c. the date picker");
  const MONTHS = { en: "November", it: "novembre", tr: "Kasım", es: "noviembre", pt: "novembro", fr: "novembre" };
  const FIRST = { en: "Mon", it: "lun", tr: "Pzt", es: "lun", pt: "dom", fr: "lun" };
  {
    /* the field: a button, never the browser's date box; the date written out in each language, by Intl */
    const g = db.games["anna-rossi/history-a-day"];
    for (const L of ["en", "it", "tr", "es", "pt", "fr"]) {
      const ctx = await context(B, S, { viewport: { width: 390, height: 844 }, mobile: true, locale: L === "en" ? "en-GB" : L });
      const p = await page(ctx);
      await p.goto(S.base + "/anna-rossi/history-a-day/edit/?lang=" + L + "#" + g.edit_key);
      await p.waitForSelector("#e-start");
      const tag = await p.locator("#e-start").evaluate((e) => e.tagName.toLowerCase() + (e.type ? ":" + e.type : ""));
      check(tag === "button:button" && await p.locator("input[type=date]").count() === 0, `${L}: the first day is a button, not the browser's date box (${tag})`);
      const shown = (await p.textContent("#e-start .dp-t b")).trim(), want = await p.evaluate(([l, d]) => new Intl.DateTimeFormat(l, { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" }).format(new Date(d + "T00:00:00Z")), [L, g.start_day]);
      check(shown === want && shown.includes(MONTHS[L]) && !/\d{1,2}[\/.]\d{1,2}[\/.]\d{2,4}/.test(shown), `${L}: the date written out in the language: "${shown}"`);
      await p.click("#e-start"); await p.waitForSelector("dialog.dp-dlg");
      const ths = await p.locator(".dp-grid th").evaluateAll((a) => a.map((x) => x.textContent));
      check(ths.length === 7 && ths[0].toLowerCase().startsWith(FIRST[L].toLowerCase().slice(0, 2)), `${L}: the week starts on ${FIRST[L]} (${ths.join(" ")})`);
      const title = (await p.textContent(".dp-month")).toLowerCase();
      check(title.includes(MONTHS[L].toLowerCase()) && /2026/.test(title), `${L}: the month's name is the language's (${title})`);
      const day9 = await p.locator(".dp-day.is-sel").getAttribute("aria-label");
      check(day9.toLowerCase().includes(MONTHS[L].toLowerCase()) && /\b9\b/.test(day9), `${L}: every day says its full date (${day9})`);
      await p.keyboard.press("Escape");
      check(p.__errors.length === 0, `${L}: no errors ${p.__errors.join(" | ")}`);
      await ctx.close();
    }
    /* where the week starts follows the region of the reader's browser: Britain Monday, the US and Canada Sunday */
    for (const [loc, L, first] of [["en-US", "en", "Sun"], ["en-GB", "en", "Mon"], ["fr-CA", "fr", "dim"], ["fr-FR", "fr", "lun"], ["pt-BR", "pt", "dom"], ["tr-TR", "tr", "Pzt"], ["it-IT", "it", "lun"]]) {
      const ctx = await context(B, S, { viewport: { width: 390, height: 844 }, mobile: true, locale: loc });
      const p = await page(ctx);
      await p.goto(S.base + "/anna-rossi/history-a-day/edit/?lang=" + L + "#" + g.edit_key);
      await p.click("#e-start"); await p.waitForSelector("dialog.dp-dlg");
      const th = (await p.locator(".dp-grid th").first().textContent()).toLowerCase();
      check(th.startsWith(first.toLowerCase().slice(0, 2)), `week start: ${L} in ${loc} begins the week on ${first} (${th})`);
      await ctx.close();
    }
    const ctx0 = await context(B, S);
    const p0 = await page(ctx0);
    await p0.goto(S.base + "/anna-rossi/history-a-day/edit/#" + g.edit_key); await p0.waitForSelector("#e-start");
    const ws = await p0.evaluate(() => ["it", "tr", "es", "fr", "en", "pt"].map((l) => l + window.StudioDate.weekStart(l)).join(" "));
    check(ws === "it1 tr1 es1 fr1 en1 pt0", "week start with a British browser: Monday for it tr es fr en, Sunday for pt (" + ws + ")");
    const lim = await p0.evaluate(() => [window.StudioDate.MIN, window.StudioDate.MAX]);
    check(dayOk(lim[0]) && !dayOk(dayAdd(lim[0], -1)) && dayOk(lim[1]) && !dayOk(dayAdd(lim[1], 1)), `the limits are the Worker's own: ${lim[0]} to ${lim[1]}, one day outside each is refused by dayOk`);
    await ctx0.close();
  }

  {
    /* keys, names, today, past days: 1280 px, a game that starts on Monday 9 November, "today" 11 November */
    const ctx = await context(B, S, { viewport: { width: 1280, height: 1100 }, dpr: 1 });
    const p = await page(ctx);
    const g = db.games["anna-rossi/history-a-day"];
    await p.goto(S.base + "/anna-rossi/history-a-day/edit/#" + g.edit_key);
    await p.waitForSelector("#e-start");
    const startWas = g.start_day;
    const btnTxt = (await p.locator("#e-start").innerText()).replace(/\s+/g, " ");
    check(/November 9, 2026/.test(btnTxt) && /Monday/.test(btnTxt) && !/Today/.test(btnTxt), "field: the day and its weekday (" + btnTxt + ")");
    check(await p.getByRole("button", { name: /First day.*November 9, 2026/ }).count() === 1, "screen reader: the field's name is its label and the date");
    check((await p.locator("#e-start").getAttribute("aria-haspopup")) === "dialog" && (await p.locator("#e-start").getAttribute("aria-expanded")) === "false", "screen reader: the field says it opens a dialog");
    await p.click("label[for=e-start]");
    await p.waitForSelector("dialog.dp-dlg");
    check(true, "the label opens the calendar too");
    await p.keyboard.press("Escape");
    await p.waitForFunction(() => !document.querySelector("dialog.dp-dlg"));
    check(await p.evaluate(() => document.activeElement === document.getElementById("e-start")), "Escape: closes it and the focus goes back to the field");
    await p.focus("#e-start"); await p.keyboard.press("Enter");
    await p.waitForSelector("dialog.dp-dlg");
    check((await p.locator("#e-start").getAttribute("aria-expanded")) === "true" && (await p.locator("dialog.dp-dlg").getAttribute("aria-label")) === "First day", "open: aria-expanded true; the dialog is named by the field");
    check(await p.locator(".dp-grid").getAttribute("role") === "grid" && (await p.locator(".dp-grid").getAttribute("aria-labelledby")) === (await p.locator(".dp-month").getAttribute("id")) && (await p.locator(".dp-month").getAttribute("aria-live")) === "polite", "screen reader: a grid named by the month, the month announced when it changes");
    check(await p.locator(".dp-day").count() === 42 && await p.locator(".dp-day[tabindex='0']").count() === 1 && await p.locator("td[aria-selected='true']").count() === 1, "screen reader: 42 days, one tab stop, one selected");
    check(await p.evaluate(() => document.activeElement && document.activeElement.classList.contains("dp-day") && /November 9, 2026/.test(document.activeElement.getAttribute("aria-label"))), "open: the focus is on the chosen day");
    const lab = (await p.locator(".dp-day.is-today").getAttribute("aria-label"));
    check(await p.locator(".dp-day.is-today").count() === 1 && /Wednesday, November 11, 2026/.test(lab) && (await p.locator(".dp-day.is-today").getAttribute("aria-current")) === "date", "today: marked once, named in full, aria-current=date (" + lab + ")");
    check((await p.locator(".dp-step").first().getAttribute("aria-label")) === "October 2026" && (await p.locator(".dp-step").nth(1).getAttribute("aria-label")) === "December 2026", "screen reader: the arrows are named by the months they go to");
    check(await p.locator(".dp-day:disabled").count() === 0, "past days: every day of the month is open (the Worker takes them)");
    const key = async (k) => { await p.keyboard.press(k); await wait(60); return p.evaluate(() => (document.activeElement.getAttribute("aria-label") || "").replace(/^\S+, /, "")); };
    check(await key("ArrowRight") === "November 10, 2026" && await key("ArrowDown") === "November 17, 2026" && await key("ArrowLeft") === "November 16, 2026" && await key("ArrowUp") === "November 9, 2026", "keys: arrows move by a day and by a week");
    check(await key("Home") === "November 9, 2026" && await key("End") === "November 15, 2026", "keys: Home and End go to the week's first and last day (Monday to Sunday)");
    check(await key("PageDown") === "December 15, 2026" && /December 2026/.test(await p.textContent(".dp-month")), "keys: Page Down goes to the next month, the same day");
    check(await key("PageUp") === "November 15, 2026", "keys: Page Up goes back a month");
    const clamped = await key("Shift+PageUp");
    check(/January 1, 2026/.test(clamped) && /January 2026/.test(await p.textContent(".dp-month")), "keys: a year back from November 2026 stops at the first open day (" + clamped + ")");
    check(await p.locator(".dp-step").first().isDisabled() && await p.locator(".dp-day:disabled").count() === 3, "limits: no month before January 2026; December 2025's days are shut");
    check(await p.locator(".dp-day[tabindex='0']").count() === 1, "keys: still one tab stop");
    for (let i = 0; i < 25; i++) await p.keyboard.press("PageDown");
    await wait(150);
    const far = await p.evaluate(() => document.activeElement.getAttribute("aria-label"));
    check(/February 1, 2028/.test(far) && await p.locator(".dp-day:not(.is-out)").count() === 29, "calendar: February 2028 has 29 days (" + far + ")");
    /* Enter picks: a past day, 3 November */
    await p.keyboard.press("Shift+PageUp"); await p.keyboard.press("Shift+PageUp");
    check(/February 1, 2026/.test(await p.evaluate(() => document.activeElement.getAttribute("aria-label"))), "keys: Shift + Page Up goes back a year");
    for (let i = 0; i < 9; i++) await p.keyboard.press("PageDown");
    await wait(100);
    await p.keyboard.press("ArrowLeft"); await p.keyboard.press("ArrowLeft"); await p.keyboard.press("ArrowLeft"); await p.keyboard.press("ArrowLeft"); await p.keyboard.press("ArrowLeft");
    const now = await p.evaluate(() => document.activeElement.getAttribute("aria-label"));
    check(/October 27, 2026/.test(now), "keys: five days back from 1 November (" + now + ")");
    await p.keyboard.press("PageDown"); await p.keyboard.press("ArrowLeft");
    await p.keyboard.press("Enter");
    await p.waitForFunction(() => !document.querySelector("dialog.dp-dlg"));
    const picked = await p.locator("#e-start").getAttribute("data-value");
    check(picked === "2026-11-26", "Enter: picks the day and closes (" + picked + ")");
    check(await p.evaluate(() => document.activeElement === document.getElementById("e-start")), "Enter: the focus goes back to the field");
    /* click a past day (3 November) */
    await p.click("#e-start"); await p.waitForSelector("dialog.dp-dlg");
    await p.click(".dp-day[aria-label*='November 3, 2026']");
    await p.waitForFunction(() => !document.querySelector("dialog.dp-dlg"));
    check((await p.locator("#e-start").getAttribute("data-value")) === "2026-11-03" && /November 3, 2026/.test(await p.textContent("#e-start .dp-t b")) && /Tuesday/.test(await p.textContent("#e-start .dp-t small")), "past day: a click on 3 November sets it");
    check(/Not saved/.test(await p.textContent(".ed-state")), "past day: the editor knows it changed");
    const days = await p.locator(".ed-item:nth-child(1) .ed-isum small").textContent();
    check(/Nov 3/.test(days), "past day: the questions' days follow (" + days + ")");
    await p.click(".ed-dock button.btn.solid");
    await p.waitForFunction(() => /Saved/.test((document.querySelector(".ed-state") || {}).textContent || ""), null, { timeout: 5000 }).catch(() => {});
    check(g.start_day === "2026-11-03", "Save: the first day sent is the one chosen (" + g.start_day + ")");
    /* Today: one tap */
    await p.click("#e-start"); await p.waitForSelector("dialog.dp-dlg");
    await p.click(".dp-today");
    await p.waitForFunction(() => !document.querySelector("dialog.dp-dlg"));
    check((await p.locator("#e-start").getAttribute("data-value")) === today && /Wednesday · Today/.test(await p.textContent("#e-start .dp-t small")), "Today: one tap picks today and the field says so");
    /* the backdrop closes it without a change */
    await p.click("#e-start"); await p.waitForSelector("dialog.dp-dlg");
    await p.mouse.click(8, 8);
    await p.waitForFunction(() => !document.querySelector("dialog.dp-dlg"));
    check((await p.locator("#e-start").getAttribute("data-value")) === today && await p.evaluate(() => document.activeElement === document.getElementById("e-start")), "outside: a click outside closes it, nothing changes, the focus is back");
    /* the Close button and Tab stay inside */
    await p.click("#e-start"); await p.waitForSelector("dialog.dp-dlg");
    const tabs = [];
    for (let i = 0; i < 12; i++) { await p.keyboard.press("Tab"); tabs.push(await p.evaluate(() => document.activeElement === document.body || !!document.activeElement.closest("dialog.dp-dlg"))); }
    check(tabs.every(Boolean), "Tab: the focus never reaches the page behind the calendar (it cycles through the card)");
    await p.click("dialog.dp-dlg .close");
    await p.waitForFunction(() => !document.querySelector("dialog.dp-dlg"));
    check(await p.evaluate(() => document.activeElement === document.getElementById("e-start")), "the × closes it and the focus goes back to the field");
    g.start_day = startWas;
    check(p.__errors.length === 0, "picker 1280: no errors " + p.__errors.join(" | "));
    await ctx.close();
  }

  {
    /* a game starting today: the field says "Today"; the month arrows by click */
    const ctx = await context(B, S, { viewport: { width: 1280, height: 1100 }, dpr: 1 });
    const p = await page(ctx);
    const g = db.games["anna-rossi/not-yet"], was = g.start_day;
    g.start_day = today;
    await p.goto(S.base + "/anna-rossi/not-yet/edit/#" + g.edit_key); await p.waitForSelector("#e-start");
    check(/Wednesday · Today/.test(await p.textContent("#e-start .dp-t small")), "field: today is named when the game starts today");
    await p.click("#e-start"); await p.waitForSelector("dialog.dp-dlg");
    check(await p.locator(".dp-day.is-sel.is-today").count() === 1, "today and chosen at once: both marks");
    await p.click(".dp-step >> nth=1");
    check(/December 2026/.test(await p.textContent(".dp-month")) && await p.locator(".dp-day[tabindex='0']").count() === 1, "the next-month arrow: December 2026");
    await p.click(".dp-step >> nth=0"); await p.click(".dp-step >> nth=0");
    check(/October 2026/.test(await p.textContent(".dp-month")), "the previous-month arrow: October 2026");
    await p.keyboard.press("Escape");
    g.start_day = was;
    await ctx.close();
  }

  {
    /* open mode has no first day: the field is hidden */
    const ctx = await context(B, S, { viewport: { width: 1280, height: 900 }, dpr: 1 });
    const p = await page(ctx);
    const g = db.games["anna-rossi/class-quiz"];
    await p.goto(S.base + "/anna-rossi/class-quiz/edit/#" + g.edit_key); await p.waitForSelector(".ed-settings");
    check(await p.locator("#e-start").isHidden(), "all at once: no first day to pick");
    await p.click(".ed-seg button:has-text('One a day')");
    check(await p.locator("#e-start").isVisible(), "one a day: the first day shows again");
    await ctx.close();
  }

  /* fits: 320, 360, 390 (a sheet from the bottom) and 700, 1000, 1280 (a card under the field) */
  for (const [w, h, mob] of [[320, 568, true], [360, 740, true], [390, 844, true], [699, 900, true], [700, 900, false], [1000, 760, false], [1280, 800, false], [1280, 1100, false]]) {
    for (const dark of [false, true]) {
      const ctx = await context(B, S, { viewport: { width: w, height: h }, mobile: mob, dark, dpr: mob ? 2 : 1 });
      const p = await page(ctx);
      const g = db.games["anna-rossi/history-a-day"];
      await p.goto(S.base + "/anna-rossi/history-a-day/edit/#" + g.edit_key); await p.waitForSelector("#e-start");
      await p.locator("#e-start").scrollIntoViewIfNeeded();
      if (mob) await p.tap("#e-start"); else await p.click("#e-start");
      await p.waitForSelector("dialog.dp-dlg"); await wait(500);
      const tag = `${w}x${h}${dark ? " dark" : ""}`;
      const d = await rect(p, "dialog.dp-dlg"), f = await rect(p, "#e-start");
      check(d.l >= -0.5 && d.r <= w + 0.5 && d.t >= -0.5 && d.b <= h + 0.5, `picker ${tag}: the card is inside the screen (${Math.round(d.l)},${Math.round(d.t)} to ${Math.round(d.r)},${Math.round(d.b)})`);
      check(await noOverflow(p), `picker ${tag}: no sideways scroll`);
      const dayBox = await p.locator(".dp-day").evaluateAll((a) => a.map((x) => { const r = x.getBoundingClientRect(); return [r.width, r.height]; }));
      const minW = Math.min(...dayBox.map((x) => x[0])), minH = Math.min(...dayBox.map((x) => x[1]));
      check(minW >= 38 && minH >= 38, `picker ${tag}: every day is a target of at least 38 px (${minW.toFixed(1)} x ${minH.toFixed(1)})`);
      const inCard = await p.evaluate(() => { const d = document.querySelector("dialog.dp-dlg").getBoundingClientRect(); return [...document.querySelectorAll(".dp-grid th, .dp-day, .dp-step, .dp-today, .dp-month, .close")].every((e) => { const r = e.getBoundingClientRect(); return r.left >= d.left - 0.5 && r.right <= d.right + 0.5 && r.bottom <= d.bottom + 0.5; }); });
      check(inCard, `picker ${tag}: everything is inside the card`);
      const cs = await p.locator("dialog.dp-dlg").evaluate((e) => ({ sh: e.scrollHeight, ch: e.clientHeight }));
      check(cs.sh <= cs.ch + 1 || h < 640, `picker ${tag}: no scrolling inside the card (${cs.sh} in ${cs.ch})`);
      if (w >= 700) {
        const clear = d.b <= f.t + 1 || d.t >= f.b - 1 || d.r <= f.l + 1 || d.l >= f.r - 1;
        check(clear, `picker ${tag}: the card never covers the field`);
        if (h >= 1100) check(Math.abs(d.t - (f.b + 6)) < 3 && Math.abs(d.l - Math.min(f.l, w - d.w - 8)) < 3, `picker ${tag}: under the field, its left edge on the field's (${Math.round(d.t)} vs ${Math.round(f.b)})`);
        /* under the field, it follows the page when it scrolls */
        const t0 = (await rect(p, "dialog.dp-dlg")).t, fb0 = (await rect(p, "#e-start")), f0 = fb0.t;
        if (Math.abs(t0 - (fb0.b + 6)) < 3) {
          await p.evaluate(() => window.scrollBy(0, -30)); await wait(200);
          const f1 = (await rect(p, "#e-start")).t, t1 = (await rect(p, "dialog.dp-dlg")).t;
          if (Math.abs(f1 - f0) > 5) check(Math.abs((t1 - t0) - (f1 - f0)) < 4, `picker ${tag}: it follows the field when the page scrolls (${Math.round(t1 - t0)} for ${Math.round(f1 - f0)})`);
        }
      } else {
        check(Math.abs(d.b - h) < 2 && Math.abs((d.l + d.r) / 2 - w / 2) < 2, `picker ${tag}: a sheet from the bottom, centred`);
      }
      if (["320x568", "390x844", "700x900", "1000x760", "1280x800", "1280x1100"].includes(w + "x" + h)) await p.screenshot({ path: path.join(SHOTS, `picker-${w}x${h}${dark ? "-dark" : ""}.png`) });
      /* colours: readable, light and dark */
      const c = await colours(p);
      const bg = rgb(c.card);
      check(contrast(rgb(c.day), bg) >= 7 && contrast(rgb(c.sel), rgb(c.selBg)) >= 4.5 && contrast(rgb(c.th), bg) >= 4.5 && contrast(rgb(c.today), bg) >= 3, `picker ${tag}: colours read (day ${contrast(rgb(c.day), bg).toFixed(1)}, chosen ${contrast(rgb(c.sel), rgb(c.selBg)).toFixed(1)}, weekday ${contrast(rgb(c.th), bg).toFixed(1)}, today ${contrast(rgb(c.today), bg).toFixed(1)})`);
      check(p.__errors.length === 0, `picker ${tag}: no errors ${p.__errors.join(" | ")}`);
      await ctx.close();
    }
  }
  {
    /* the 3-column page puts the field near the right edge: the card stays inside; and a short window puts it beside the field */
    const ctx = await context(B, S, { viewport: { width: 1280, height: 640 }, dpr: 1 });
    const p = await page(ctx);
    const g = db.games["anna-rossi/history-a-day"];
    await p.goto(S.base + "/anna-rossi/history-a-day/edit/#" + g.edit_key); await p.waitForSelector("#e-start");
    await p.click("#e-start"); await p.waitForSelector("dialog.dp-dlg"); await wait(400);
    const d = await rect(p, "dialog.dp-dlg"), f = await rect(p, "#e-start");
    check(d.t >= 0 && d.b <= 640 && d.r <= 1280 && (d.r <= f.l + 1 || d.b <= f.t + 1 || d.t >= f.b - 1), `picker 1280x640: it fits and goes beside the field (${Math.round(d.l)}-${Math.round(d.r)} x ${Math.round(d.t)}-${Math.round(d.b)}; field ${Math.round(f.l)}-${Math.round(f.r)})`);
    await ctx.close();
  }
  {
    /* reduced motion: the card does not slide, the months do not move */
    const ctx = await context(B, S, { viewport: { width: 1280, height: 900 }, dpr: 1, reduced: true });
    const p = await page(ctx);
    const g = db.games["anna-rossi/history-a-day"];
    await p.goto(S.base + "/anna-rossi/history-a-day/edit/#" + g.edit_key); await p.waitForSelector("#e-start");
    await p.click("#e-start"); await p.waitForSelector("dialog.dp-dlg");
    const an = await p.locator("dialog.dp-dlg").evaluate((e) => getComputedStyle(e).animationName);
    check(an === "st-fade", "reduced motion: the card only fades (" + an + ")");
    await p.click(".dp-step >> nth=1");
    const bx = await p.locator(".dp-box").evaluate((e) => ({ cls: e.className, an: getComputedStyle(e).animationName }));
    check(!/go-next|go-prev/.test(bx.cls) && bx.an === "none", "reduced motion: the months change without sliding (" + bx.cls + ", " + bx.an + ")");
    check(p.__errors.length === 0, "reduced motion: no errors " + p.__errors.join(" | "));
    await ctx.close();
    const ctx2 = await context(B, S, { viewport: { width: 1280, height: 900 }, dpr: 1 });
    const q = await page(ctx2);
    await q.goto(S.base + "/anna-rossi/history-a-day/edit/#" + g.edit_key); await q.waitForSelector("#e-start");
    await q.click("#e-start"); await q.waitForSelector("dialog.dp-dlg");
    await q.click(".dp-step >> nth=1");
    check(/go-next/.test(await q.locator(".dp-box").getAttribute("class")), "motion on: the months slide");
    await ctx2.close();
  }
  hist.start_day = keep.hist; ranOut.start_day = keep.ran;
  dropGame(db);
}

/* run alone */
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const S = await servers();
  const B = await browser();
  await run(S, B);
  await B.close(); S.close();
  process.exit(report() ? 1 : 0);
}
