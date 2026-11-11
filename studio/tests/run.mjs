/* Logicers Studio: the front end's checks (chat B, 8 Nov 2026). Run: node studio/tests/run.mjs (needs playwright and sharp)
   Two local servers stand in for by.logicers.com (studio/ and a stub of the API, stub.mjs) and for logicers.com (the whole
   games folder: bridge.html, the fonts, logicers.css). Screenshots go to $SHOTS (default /tmp/studio-shots). */
import fs from "node:fs";
import path from "node:path";
import { servers, browser, context, page, check, report, noOverflow, wait, SHOTS, todayIn, need } from "./lib.mjs";
import { startReal, ADMIN_KEY } from "./real.mjs";
import { run as editorWide } from "./editor-wide.mjs";
const sharp = need("sharp");

const S = await servers();
const B = await browser();
const db = S.st.db;
const G = (slug) => S.base + "/anna-rossi/" + slug + "/";
const SIZES = [
  { name: "phone-320", viewport: { width: 320, height: 640 }, mobile: true },
  { name: "phone-360", viewport: { width: 360, height: 740 }, mobile: true },
  { name: "phone-390", viewport: { width: 390, height: 844 }, mobile: true },
  { name: "phone-412", viewport: { width: 412, height: 915 }, mobile: true },
  { name: "desktop", viewport: { width: 1280, height: 800 }, mobile: false, dpr: 1 }
];
const shot = (p, name) => p.screenshot({ path: path.join(SHOTS, name + ".png"), fullPage: true });

/* ---------- play one question of each template, the way a thumb would ---------- */
async function playIt(p, tpl) {
  if (tpl === "number" || tpl === "line" || tpl === "picnum") {
    const tr = p.locator(".st-track");
    const box = await tr.boundingBox();
    await p.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2);
    await p.mouse.down();
    await p.mouse.move(box.x + box.width * 0.6, box.y + box.height / 2, { steps: 6 });
    await p.mouse.up();
    await p.click(".st-step[aria-label='More']");
  } else if (tpl === "rank") {
    const rows = p.locator(".st-thing");
    const first = await rows.nth(0).boundingBox(), third = await rows.nth(2).boundingBox();
    await p.mouse.move(first.x + first.width / 2, first.y + first.height / 2);
    await p.mouse.down();
    await p.mouse.move(first.x + first.width / 2, third.y + third.height / 2 + 4, { steps: 10 });
    await p.mouse.up();
    await p.click(".st-thing:nth-child(1) .st-arrow:nth-child(2)");
  } else {
    await p.click(".st-choice >> nth=1");
  }
  await p.click("text=Lock in");
}

/* ---------- 1. every page at every size, light and dark ---------- */
console.log("1. pages at four phone sizes and a desktop, light and dark");
for (const size of SIZES) {
  for (const dark of [false, true]) {
    const ctx = await context(B, S, { ...size, dark });
    const p = await page(ctx);
    for (const [url, name] of [["/", "dir"], ["/anna-rossi/", "maker"], ["/anna-rossi/history-a-day/", "pick"], ["/anna-rossi/how-many-a-day/", "number"],
      ["/anna-rossi/when-was-it/", "line"], ["/anna-rossi/oldest-first/", "rank"], ["/anna-rossi/what-is-this/", "picture"], ["/anna-rossi/read-and-answer/", "read"],
      ["/anna-rossi/class-quiz/", "open"], ["/anna-rossi/how-many-a-day/about/", "about"], ["/new/", "new"], ["/terms/", "terms"]]) {
      await p.goto(S.base + url);
      await p.waitForSelector(".st-main:not(:has(.st-wait))", { timeout: 8000 }).catch(() => {});
      await wait(250);
      check(await noOverflow(p), `${size.name}${dark ? " dark" : ""} ${name}: no sideways scroll`);
      if (["pick", "number", "line", "rank", "picture", "read", "open", "about"].includes(name)) {
        check(await p.locator(".st-notice").count() === 1 && /Made by Anna Rossi\. Logicers hosts this game\. Its maker is responsible for it\./.test(await p.textContent(".st-notice")), `${size.name} ${name}: the notice line`);
        check(/by Anna Rossi/.test(await p.textContent("#app")), `${size.name} ${name}: the maker's name`);
      }
      if (name === "number" || name === "line") {           /* review, 11 Nov 2026: − and + on one row, at the two ends */
        const st = await p.locator(".st-step").evaluateAll((bs) => bs.map((b) => { const r = b.getBoundingClientRect(); return [r.left, r.top, r.right]; }));
        const box = await p.locator(".st-steps").evaluate((x) => { const r = x.getBoundingClientRect(); return [r.left, r.right]; });
        check(st.length === 2 && Math.abs(st[0][1] - st[1][1]) < 2 && st[0][2] < st[1][0] && st[0][0] - box[0] < 2 && box[1] - st[1][2] < 2, `${size.name}${dark ? " dark" : ""} ${name}: − and + side by side at the two ends (${JSON.stringify(st)})`);
      }
      if (size.name === "phone-360" || size.name === "desktop" || (size.name === "phone-320" && !dark)) await shot(p, `${size.name}${dark ? "-dark" : ""}-${name}`);
    }
    check(p.__errors.length === 0, `${size.name}${dark ? " dark" : ""}: no errors (${p.__errors.join(" | ")})`);
    await ctx.close();
  }
}
const dirText = await (async () => { const ctx = await context(B, S); const p = await page(ctx); await p.goto(S.base + "/"); await p.waitForSelector(".st-card"); const t = await p.textContent("#app"); await ctx.close(); return t; })();
check(/These games are made by Logicers players, who are responsible for them\./.test(dirText), "directory: the notice at the top");
check(!/approved|checked it/i.test(dirText), "directory: never 'approved'");
check(!/img-src-x/.test(dirText) && !/Gone one/.test(dirText), "directory: unlisted and hidden games are not on it");

/* ---------- 2. the six templates, played, motion on and off ---------- */
console.log("2. the six templates played, motion on (390 light) and off (360 dark)");
for (const opt of [{ viewport: { width: 390, height: 844 }, mobile: true }, { viewport: { width: 360, height: 740 }, mobile: true, dark: true, reduced: true }]) {
  const tag = opt.reduced ? "reduced" : "motion";
  const ctx = await context(B, S, opt);
  await ctx.addInitScript(() => {
    navigator.share = (o) => { window.__shared = o; return Promise.resolve(); };
    navigator.canShare = () => true;
  });
  const p = await page(ctx);
  for (const [slug, tpl] of [["history-a-day", "pick"], ["how-many-a-day", "number"], ["when-was-it", "line"], ["oldest-first", "rank"], ["what-is-this", "pick"], ["picture-number", "picnum"]]) {
    const before = db.plays.length;
    const requests = [], bodies = [];
    p.on("request", (r) => { if (/\/g\//.test(r.url())) requests.push(r.url()); });
    p.on("response", async (r) => { if (/\/g\//.test(r.url())) { try { bodies.push(await r.text()); } catch (e) { /* gone */ } } });
    await p.goto(G(slug));
    await p.waitForSelector(".st-play");
    if (tpl !== "rank") check(await p.locator("text=Lock in").isDisabled(), `${tag} ${slug}: Lock in waits for an answer`);
    const plays0 = db.games["anna-rossi/" + slug].plays;
    let maxGap = 0;
    await p.evaluate(() => { window.__gap = 0; let last = performance.now(); const f = (t) => { window.__gap = Math.max(window.__gap, t - last); last = t; if (!window.__stop) requestAnimationFrame(f); }; requestAnimationFrame(f); });
    await playIt(p, tpl);
    await p.waitForSelector(".st-after:not([hidden])");
    await p.waitForFunction(() => document.querySelector(".st-dist:not([hidden]), .st-pct"), null, { timeout: 4000 }).catch(() => {});
    await wait(opt.reduced ? 200 : 900);
    maxGap = await p.evaluate(() => { window.__stop = true; return Math.round(window.__gap); });
    check(db.plays.length === before + 1, `${tag} ${slug}: one /play`);
    const last = db.plays[db.plays.length - 1];
    check(last && last.game === "anna-rossi/" + slug && last.item === db.games["anna-rossi/" + slug].items[2].id, `${tag} ${slug}: /play gets "<maker>/<game>" and the item's id (${JSON.stringify(last)})`);
    if (tpl === "rank") check(Array.isArray(last.answer) && last.answer.length === 4, `${tag}: a rank answer is the order, as a list`);
    check(requests.some((u) => u.includes("day=" + todayIn("Europe/Rome"))), `${tag} ${slug}: asks for the player's local day`);
    check(await p.locator(".panel.revealed, .st-choices.shown, .st-rank.shown").count() >= 1, `${tag} ${slug}: revealed`);
    const head = await p.textContent(".st-verdict .turnsout");
    check(!!head && head.length > 2, `${tag} ${slug}: a verdict (${head})`);
    check(await p.locator(".st-dist:not([hidden]), .st-pct").count() >= 1, `${tag} ${slug}: how everyone answered`);
    check(await p.locator(".st-fin .st-dots i").count() === 3, `${tag} ${slug}: the dots`);
    /* 11 Nov 2026 (Khayyam): the page gets the question without its answer; /play gives it back */
    check(bodies.length > 0 && bodies.every((t) => !/"(answer|explain|values)"\s*:/.test(t)), `${tag} ${slug}: no answer reached the page before the guess`);
    if (tpl === "pick" && slug === "history-a-day") check(/Right!/.test(head) && /Michelangelo/.test(await p.textContent(".st-choice.is-right")), `${tag}: the right choice, from /play`);
    if (tpl === "rank") check(JSON.stringify(await p.locator(".st-thing .st-txt").allTextContents()) === JSON.stringify(["Pyramids of Giza", "Colosseum", "Leaning Tower of Pisa", "Eiffel Tower"]), `${tag}: the right order, from /play (${await p.locator(".st-thing .st-txt").allTextContents()})`);
    if (tpl === "number") check(/71/.test(await p.textContent(".st-play")), `${tag}: the right number, from /play`);
    if (slug === "history-a-day") {
      check(await p.locator("#app[aria-live]").count() === 0 && /Right!/.test(await p.locator("[aria-live]").last().textContent()), `${tag}: a screen reader hears the result only`);
      check(/Michelangelo, from 1508/.test(await p.textContent(".st-after .sentence")), `${tag}: the explanation`);
      check(/Streak 1/.test(await p.textContent(".st-fin")), `${tag}: the streak`);
      check(new RegExp("Plays: " + (plays0 + 1).toLocaleString("en")).test(await p.textContent(".st-fin")), `${tag}: the counter counts this play (${await p.textContent(".st-fin")})`);
      await p.click(".st-after button:has-text('Share')");
      await p.waitForFunction(() => window.__shared, null, { timeout: 8000 }).catch(() => {});
      const shared = await p.evaluate(() => ({ text: window.__shared && window.__shared.text, size: window.__shared && window.__shared.files && window.__shared.files[0] && window.__shared.files[0].size }));
      check(/History a day, by Anna Rossi · Day 3/.test(shared.text || "") && /anna-rossi\/history-a-day\//.test(shared.text || ""), `${tag}: the share text (${shared.text})`);
      check(shared.size > 10000, `${tag}: the share picture (${shared.size} bytes)`);
      if (!opt.reduced) {
        const pic = await p.evaluate(async () => { const f = window.__shared.files[0]; const b = new Uint8Array(await f.arrayBuffer()); let s = ""; for (let i = 0; i < b.length; i += 8192) s += String.fromCharCode.apply(null, b.subarray(i, i + 8192)); return btoa(s); });
        fs.writeFileSync(path.join(SHOTS, "share-card.png"), Buffer.from(pic, "base64"));
      }
      await p.click(".st-after >> text=Embed");
      const code = await p.inputValue(".st-snippet");
      check(/<iframe src="http:\/\/127\.0\.0\.1:\d+\/anna-rossi\/history-a-day\/embed\/"/.test(code) && /height="720"/.test(code) && /loading="lazy"/.test(code) && /allow="clipboard-write"/.test(code), `${tag}: the embed code`);
      const es = await p.textContent("dialog");
      check(/Put this game on your own page, like a video\./.test(es) && await p.locator("dialog .st-howto > li").count() === 3, `${tag}: the embed sheet says what it is, then three steps`);
      check(/In Moodle or any site, switch to code view and paste\./.test(es) && /In WordPress, just paste the game’s link\./.test(es), `${tag}: Moodle and WordPress, in plain words`);
      await p.click("dialog .st-copycode");
      await wait(200);
      check((await p.evaluate(() => navigator.clipboard.readText())).startsWith("<iframe"), `${tag}: the code is copied`);
      await p.click("dialog >> text=Copy the link");
      await wait(200);
      check(/\/anna-rossi\/history-a-day\/$/.test(await p.evaluate(() => navigator.clipboard.readText())), `${tag}: the link is copied, for WordPress`);
      await shot(p, `${tag}-embed-sheet`);
      await p.keyboard.press("Escape");
      /* the report: needs a reason and the tick */
      await p.click(".st-notice button");   // F: Report lives in the notice line only
      await p.click("dialog button.btn.solid");
      check(/Choose what is wrong/.test(await p.textContent("dialog")), `${tag}: the report asks for a reason`);
      await p.click("dialog >> text=A wrong fact");
      await p.click("dialog button.btn.solid");
      check(/Tick the box/.test(await p.textContent("dialog")), `${tag}: the report asks for the tick`);
      check(!/112/.test(await p.textContent("dialog")), `${tag}: no emergency number`);
      await p.fill("#rep-text", "Question 3 is wrong");
      await p.check("dialog input[type=checkbox]");
      await p.click("dialog button.btn.solid");
      await p.waitForSelector("dialog >> text=Thank you");
      const rp = db.reports[db.reports.length - 1];
      check(rp && rp.game === "anna-rossi/history-a-day" && rp.reason === "wrong" && rp.text === "Question 3 is wrong", `${tag}: the report is sent (${JSON.stringify(rp)})`);
      await shot(p, `${tag}-report`);
      await p.click("dialog >> text=Close");
      /* a revisit shows the answer, and plays nothing again */
      const n = db.plays.length;
      await p.reload();
      await p.waitForSelector(".st-after:not([hidden])");
      check(db.plays.length === n && !(await p.locator("text=Lock in").isVisible()), `${tag}: a revisit shows today's answer`);
      check(/Streak 1/.test(await p.textContent(".st-bar")), `${tag}: the streak chip in the bar`);
    }
    if (!opt.reduced || slug === "oldest-first") await shot(p, `${tag}-played-${slug}`);
    if (!opt.reduced) console.log(`   ${slug}: longest frame gap during the reveal ${maxGap} ms`);
    p.removeAllListeners("request");
  }
  /* Read with "keep answers": the first screen, a name, then the play and its answer row */
  const keeps = db.keeps.length;
  await p.goto(G("read-and-answer"));
  await p.waitForSelector(".st-keep");
  check(/Your answers go to Anna Rossi/.test(await p.textContent(".st-keep")), `${tag} read: says where the answers go`);
  await shot(p, `${tag}-keep-first`);
  await p.fill("#keep-name", "Luca B.");
  await p.click("text=Start");
  await p.waitForSelector(".st-read");
  await playIt(p, "read");
  await p.waitForSelector(".st-after:not([hidden])");
  await wait(400);
  const k = db.keeps[db.keeps.length - 1];
  check(db.keeps.length === keeps + 1 && k.name === "Luca B." && k.answer === 1 && /^[a-z2-9]{16}$/.test(k.pid), `${tag} read: the answer row with the name (${JSON.stringify(k)})`);
  await shot(p, `${tag}-played-read`);
  /* open mode: all at once */
  await p.goto(G("class-quiz"));
  await p.waitForSelector(".st-items");
  await p.click(".st-items button >> nth=0");
  await playIt(p, "pick");
  await p.waitForSelector(".st-after:not([hidden])");
  check(await p.locator(".st-after >> text=Next").count() === 1, `${tag} open: Next`);
  await p.click(".st-after >> text=Next");
  await p.waitForSelector(".st-head >> text=2 of 3");   // F: question 2 of 3 (a position), not "done"
  await playIt(p, "pick");
  await p.waitForSelector(".st-after:not([hidden])");
  await p.click("text=All questions");
  await p.waitForSelector(".st-items");
  check(await p.locator(".st-items button.done").count() === 2, `${tag} open: two done`);
  check(/2 of 3 done/.test(await p.textContent(".st-head")), `${tag} open: the count`);
  await shot(p, `${tag}-open-list`);
  /* no connection when Lock in is tapped: the page says so and Lock in comes back; nothing is shown before /play answers */
  await p.click(".st-items button >> nth=2");
  await p.waitForSelector(".st-play");
  await p.route("**/play", (rt) => rt.abort());
  await playIt(p, "pick");
  await p.waitForSelector(".st-play-err:not([hidden])");
  check(/No connection/.test(await p.textContent(".st-play-err")) && !(await p.locator("text=Lock in").isDisabled()) && await p.locator(".st-after:not([hidden])").count() === 0, `${tag}: offline, it says so and Lock in comes back`);
  await p.unroute("**/play");
  await p.click("text=Lock in");
  await p.waitForSelector(".st-after:not([hidden])");
  check(await p.locator(".st-play-err:not([hidden])").count() === 0, `${tag}: then it plays`);
  check(p.__errors.length === 0 || p.__errors.every((x) => /net::ERR_FAILED|Failed to fetch|ERR_FAILED/.test(x)), `${tag}: no errors (${p.__errors.join(" | ")})`);
  await ctx.close();
}

/* ---------- 3. the plain pages: not started, ran out, hidden, unknown, a game in Italian, words that try to be HTML ---------- */
console.log("3. the plain states");
{
  const ctx = await context(B, S);
  const p = await page(ctx);
  await p.goto(S.base + "/"); await p.waitForSelector(".st-codebox input");
  await p.fill(".st-codebox input", db.games["anna-rossi/history-a-day"].code.toLowerCase());
  await p.click(".st-codebox button");
  await p.waitForURL(/\/anna-rossi\/history-a-day\/$/, { timeout: 5000 }).catch(() => {});
  check(/\/anna-rossi\/history-a-day\/$/.test(p.url()), "the code box opens the game " + p.url());
  await p.goto(S.base + "/"); await p.waitForSelector(".st-codebox input");
  await p.fill(".st-codebox input", "ZZZZZZ"); await p.click(".st-codebox button");
  await p.waitForFunction(() => /No game with this code/.test(document.querySelector(".st-codemsg").textContent), null, { timeout: 4000 }).catch(() => {});
  check(/No game with this code/.test(await p.textContent(".st-codemsg")), "an unknown code");
  await p.goto(G("not-yet")); await p.waitForSelector(".st-out");
  check(/Starts on/.test(await p.textContent(".st-out")), "not started yet");
  await p.goto(G("ran-out")); await p.waitForSelector(".st-out");
  check(/No new one today\. Come back when Anna Rossi adds more\./.test(await p.textContent(".st-out")), "stock out");
  await p.goto(G("gone-one")); await p.waitForSelector("h1");
  check(/This game is not available\./.test(await p.textContent("h1")), "a hidden game");
  await p.goto(S.base + "/nobody-here/"); await p.waitForSelector("h1");
  check(/Nothing here/.test(await p.textContent("h1")), "an unknown maker");
  await p.goto(G("in-italiano")); await p.waitForSelector(".st-play");
  check(await p.evaluate(() => document.documentElement.lang) === "it", "a game in Italian speaks Italian");
  await p.goto(G("img-src-x-onerror-alert-1")); await p.waitForSelector(".st-play");
  await playIt(p, "pick"); await p.waitForSelector(".st-after:not([hidden])");
  check(await p.locator(".st-main img[src='x'], .st-main script, .st-main b:text-is('a')").count() === 0, "words that look like HTML stay words");
  check((await p.textContent(".st-gname")) === "<img src=x onerror=alert(1)>", "the title shows as typed");
  await p.goto(G("img-src-x-onerror-alert-1") + "about/"); await p.waitForSelector(".st-about");
  check(await p.locator(".st-about a").count() === 0 && await p.locator(".st-about b").count() === 1, "About: no javascript: link, **bold** works");
  await p.goto(G("how-many-a-day") + "about/"); await p.waitForSelector(".st-about");
  const links = await p.$$eval(".st-about a", (as) => as.map((a) => ({ href: a.href, rel: a.rel, target: a.target, text: a.textContent })));
  check(links.length === 2 && links.every((a) => /nofollow/.test(a.rel) && /noopener/.test(a.rel) && a.target === "_blank" && /outside Logicers/.test(a.text)), "About: links open outside, nofollow, marked " + JSON.stringify(links));
  check(links[0].href === "https://example.org/numbers", "About: a link's last full stop is not part of it");
  check(p.__errors.length === 0, "plain pages: no errors " + p.__errors.join(" | "));
  await ctx.close();
}
/* the "?" of a game says what will happen, in short lines, then the maker's About (9 Nov 2026) */
{
  const ctx = await context(B, S);
  const p = await page(ctx);
  await p.goto(G("history-a-day")); await p.waitForSelector(".st-play");
  await p.click(".st-bar .st-help");
  await p.waitForSelector("dialog .st-how");
  const how = await p.textContent("dialog");
  check(/How it works/.test(how) && /Tap the answer you think is right\./.test(how) && /Then see how everyone else answered\./.test(how) && /A new question every day\./.test(how), "?: what will happen " + how);
  check(await p.locator("dialog .st-how-about").count() === 0, "?: no About when the maker wrote none");
  await p.keyboard.press("Escape");
  await p.goto(G("class-quiz")); await p.waitForSelector(".st-items");
  await p.click(".st-bar .st-help");
  check(/All the questions, in any order\./.test(await p.textContent("dialog")), "?: all at once");
  await p.keyboard.press("Escape");
  await p.goto(G("how-many-a-day")); await p.waitForSelector(".st-play");
  await p.click(".st-bar .st-help");
  await p.waitForSelector("dialog .st-how-about");
  check(/A daily guess about/.test(await p.textContent("dialog .st-how-about")) && await p.locator("dialog .st-how-about b").count() === 1, "?: the maker's About, with its bold");
  await shot(p, "how-sheet");
  await p.keyboard.press("Escape");
  await playIt(p, "number"); await p.waitForSelector(".st-after:not([hidden])");
  check(await p.locator(".st-links >> text=About").count() === 1, "About: the chip when there is one");
  await p.goto(G("history-a-day")); await p.waitForSelector(".st-play");
  await playIt(p, "pick"); await p.waitForSelector(".st-after:not([hidden])");
  check(await p.locator(".st-links >> text=About").count() === 0, "About: no chip to an empty page");
  /* a picture Logicers removed: players get the question without it; the maker is told in words */
  await p.goto(G("lost-picture")); await p.waitForSelector(".st-play");
  check(await p.locator(".st-play img").count() === 0, "a removed picture: not shown to players");
  await p.goto(G("lost-picture") + "edit/#" + db.games["anna-rossi/lost-picture"].edit_key);
  await p.waitForSelector(".ed-gone");
  check(/Logicers removed a picture\. Add another one\./.test(await p.textContent(".ed-gone")), "a removed picture: the editor says so");
  check(/Logicers removed this picture\./.test(await p.textContent(".ed-item .ed-ibody")), "a removed picture: on its own question, open");
  await shot(p, "editor-removed-picture");
  check(p.__errors.length === 0, "? and removed picture: no errors " + p.__errors.join(" | "));
  await ctx.close();
}
/* a clock east of UTC: the local day goes to the Worker */
{
  const ctx = await context(B, S, { tz: "Pacific/Kiritimati" });
  const p = await page(ctx);
  let asked = "";
  p.on("request", (r) => { if (/\/g\//.test(r.url())) asked = r.url(); });
  await p.goto(G("history-a-day")); await p.waitForSelector(".st-main:not(:has(.st-wait))");
  check(asked.includes("day=" + todayIn("Pacific/Kiritimati")), "UTC+14: the player's own day goes to the Worker (" + asked + ")");
  await ctx.close();
}

/* ---------- 4. the editor, end to end, for each template, with My Logicers on ---------- */
console.log("4. the editor end to end");
const big = await sharp({ create: { width: 3200, height: 2400, channels: 3, noise: { type: "gaussian", mean: 128, sigma: 60 } } }).png().toBuffer();
fs.writeFileSync("/tmp/studio-big.png", big);
const FILL = {
  number: async (p) => { await p.fill("[id$='-q']", "How many regions has Italy?"); await p.fill("[id$='-max']", "50"); await p.fill("[id$='-answer']", "20"); },
  line: async (p) => { await p.fill("[id$='-q']", "When did Rome fall?"); await p.fill("[id$='-min']", "-753"); await p.fill("[id$='-max']", "1500"); await p.fill("[id$='-answer']", "476"); },
  pick: async (p) => { await p.fill("[id$='-q']", "Capital of Italy?"); const i = p.locator(".ed-ibody .ed-opt input[type=text]"); await i.nth(0).fill("Milan"); await i.nth(1).fill("Rome"); await p.click(".ed-ibody >> text=+ Add a choice"); await i.nth(2).fill("Turin"); await p.check(".ed-ibody .ed-opt input[type=radio] >> nth=1"); },
  rank: async (p) => { await p.fill("[id$='-q']", "Biggest first"); const i = p.locator(".ed-ibody .ed-opt input[type=text]"); await i.nth(0).fill("Sicily"); await i.nth(1).fill("Sardinia"); await i.nth(2).fill("Elba"); },
  picture: async (p) => { await p.fill("[id$='-q']", "Which city?"); const i = p.locator(".ed-ibody .ed-opt input[type=text]"); await i.nth(0).fill("Rome"); await i.nth(1).fill("Naples"); await p.check(".ed-ibody .ed-opt input[type=radio] >> nth=0"); },
  read: async (p) => { await p.fill("[id$='-text']", "Venice has 118 islands.\n\nIt has about 400 bridges."); await p.fill("[id$='-q']", "How many bridges?"); const i = p.locator(".ed-ibody .ed-opt input[type=text]"); await i.nth(0).fill("About 40"); await i.nth(1).fill("About 400"); await p.check(".ed-ibody .ed-opt input[type=radio] >> nth=1"); }
};
{
  const ctx = await context(B, S, { viewport: { width: 390, height: 844 }, mobile: true });
  /* this phone keeps a My Logicers code on logicers.com */
  const site = await ctx.newPage();
  await site.goto(S.siteBase + "/studio/tests/host.html");
  await site.evaluate(() => localStorage.setItem("lg.me.v1", JSON.stringify({ v: 1, code: "river-bluer-camel-42" })));
  const p = await page(ctx);
  let first = true;
  for (const tpl of ["pick", "number", "line", "rank", "picture", "read"]) {
    await p.goto(S.base + "/new/");
    await p.waitForSelector(".ed-tpls");
    if (first) {
      await p.click("text=Make it");
      const errs = await p.$$eval(".ed-err", (e) => e.map((x) => x.textContent).filter(Boolean));
      check(errs.includes("2 to 40 characters.") && errs.includes("Give it a name.") && errs.includes("Tick the box first.") && errs.includes("Choose a template"), "new: asks for the template, the title, the name, the tick " + JSON.stringify(errs));
      check(await p.locator(".ed-seg, .ed-switch, #f-start").count() === 0, "new: no language, mode, day or switches: they wait in the editor");
      await p.fill("#f-name", "Prof. Bianchi");
      check((await p.textContent(".ed-addr")).endsWith("/prof-bianchi/"), "new: shows the address");
      await shot(p, "editor-new");
    } else {
      check(/You make games as Prof\. Bianchi/.test(await p.textContent(".ed")), tpl + ": the maker is known");
    }
    await p.click(`.ed-tpl[data-v=${tpl}]`);
    await p.fill("#f-title", "Bianchi " + tpl);
    await p.check("#f-terms");
    await p.click("text=Make it");
    await p.waitForSelector(".kp");
    await p.waitForSelector(".kp-tile.done", { timeout: 5000 }).catch(() => {});
    check(await p.locator(".kp-tile.done:has-text('My Logicers')").count() === 1, tpl + ": the edit link is kept in My Logicers");
    if (first) await shot(p, "editor-keep-sheet");
    check(/Kept on this browser\./.test(await p.textContent(".kp")), tpl + ": kept on this browser, said in the sheet");
    await p.click(".kp >> text=Done");
    await p.waitForSelector(".ed-dock");
    if (tpl === "number") await p.click(".ed-seg >> text=All at once");
    if (tpl === "read") await p.click(".ed-switch >> text=Keep answers");
    const url = p.url();
    check(/\/prof-bianchi\/bianchi-[a-z]+\/edit\/#[A-Z2-7]{24}$/.test(url), tpl + ": the edit link " + url);
    const g = db.games["prof-bianchi/bianchi-" + tpl];
    check(!!g && g.terms_version === "2026-11-11" && db.makers["prof-bianchi"].terms_version === "2026-11-11", tpl + ": made, with the terms' version");
    /* the first question is there, open (9 Nov 2026) */
    check(await p.locator(".ed-item").count() === 1 && await p.locator(".ed-ibody:not([hidden])").count() === 1, tpl + ": a new game opens on its first question");
    await FILL[tpl](p);
    if (tpl === "picture" || tpl === "pick") {
      await p.setInputFiles(".ed-ibody .ed-file", "/tmp/studio-big.png");
      await p.waitForSelector(".ed-ibody .ed-img img", { timeout: 15000 });
      const im = Object.values(db.images).filter((x) => x.game === "bianchi-" + tpl)[0];
      const meta = im ? await sharp(im.buf).metadata() : {};
      check(im && im.size <= 500 * 1024 && Math.max(meta.width, meta.height) <= 1600 && /webp|jpeg/.test(im.type), `${tpl}: the picture made smaller before it is sent (${im && im.size} bytes, ${meta.width}x${meta.height}, ${im && im.type})`);
    }
    await p.fill("[id^='x-']", "See https://it.wikipedia.org and https://example.com");
    await p.click(".ed-dock .btn");
    await wait(200);
    check(/One link at most/.test(await p.textContent(".ed-ibody")), tpl + ": one link at most in the explanation");
    await p.fill("[id^='x-']", "See https://it.wikipedia.org");
    /* a second, empty question: Save shows what to fix */
    await p.click("text=+ Add a question");
    await p.click(".ed-dock .btn");
    await wait(200);
    check(/Question 2: /.test(await p.textContent(".ed")) && await p.locator(".ed-item.bad").count() === 1, tpl + ": an empty question is marked, and the message says which");
    await p.click(".ed-item:nth-child(2) >> text=Delete");
    if (tpl === "rank") {
      /* 9 Nov 2026: two the same, the question closed: Save opens it, says what, marks the box and shows it */
      await p.click(".ed-item:first-child .ed-isum");
      const i = p.locator(".ed-item:first-child .ed-opt input[type=text]");
      await i.nth(2).fill("sicily");
      await p.click(".ed-item:first-child .ed-isum");
      await p.click(".ed-dock .btn");
      await wait(700);
      check(/Question 1: “sicily” is there twice\./.test(await p.textContent(".ed")), "rank: two the same, said plainly");
      check(await i.nth(2).getAttribute("aria-invalid") === "true" && await i.nth(0).getAttribute("aria-invalid") === null, "rank: the second one is marked");
      check(await i.nth(2).evaluate((el) => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; }), "rank: and on the screen");
      await p.screenshot({ path: path.join(SHOTS, "editor-rank-same.png") });
      await i.nth(2).fill("Elba");
      check(await i.nth(2).getAttribute("aria-invalid") === null, "rank: the mark goes as soon as it is fixed");
    }
    if (tpl === "pick") {
      /* two more, then order them by dragging the grip */
      for (const q of ["Second?", "Third?"]) {
        await p.click("text=+ Add a question");
        await FILL.pick(p);
        await p.fill(".ed-item:last-child [id$='-q']", q);
      }
      await p.click(".ed-item:last-child .ed-isum");
      await p.evaluate(() => document.querySelector(".ed-list").scrollIntoView({ block: "center" }));
      await wait(300);
      const grips = p.locator(".ed-item .st-grip");
      const a = await grips.nth(2).boundingBox(), b = await grips.nth(0).boundingBox();
      await p.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
      await p.mouse.down();
      await p.mouse.move(b.x + b.width / 2, b.y - 10, { steps: 14 });
      await p.mouse.up();
      await wait(400);
      check((await p.textContent(".ed-item:nth-child(1) .ed-isum b")) === "Third?", "pick: dragged to the top");
      await p.click(".ed-item:nth-child(2) .ed-isum");
      await p.click(".ed-item:nth-child(2) .ed-ifoot [aria-label='Move down']");
      check((await p.textContent(".ed-item:nth-child(3) .ed-isum b")) === "Capital of Italy?", "pick: Move down");
      check(/Sun|Mon|Tue|Wed|Thu|Fri|Sat/.test(await p.textContent(".ed-item:nth-child(1) .ed-isum small")), "pick: each question shows its day");
      await p.fill("#e-about", "For my **class**. Info: https://school.example");
    }
    await p.click(".ed-dock .btn");
    await p.waitForFunction(() => /Saved/.test(document.querySelector(".ed-state").textContent), null, { timeout: 5000 }).catch(() => {});
    check(/Saved/.test(await p.textContent(".ed-state")), tpl + ": saved");
    await wait(300);
    const items = g.items;
    check(items.length === (tpl === "pick" ? 3 : 1) && items.filter((x) => x.explain === "See https://it.wikipedia.org").length === 1, tpl + ": the items as saved " + JSON.stringify(items));
    if (tpl === "line") check(items[0].min === -753 && items[0].max === 1500 && items[0].answer === 476, "line: min, max, answer");
    if (tpl === "number") check(items[0].max === 50 && items[0].answer === 20, "number: max, answer");
    if (tpl === "read") check(items[0].answer === 1 && items[0].choices.length === 2 && /\n\n/.test(items[0].text), "read: text, choices, answer");
    if (tpl === "picture") check(items[0].form === "pick" && items[0].answer === 0 && typeof items[0].image === "string" && items[0].max === undefined, "picture: pick form, the picture's id " + JSON.stringify(items[0]));
    if (tpl === "rank") check(items[0].things.join() === "Sicily,Sardinia,Elba", "rank: the things in order");
    if (tpl === "pick") {
      check(items.map((x) => x.q).join("|") === "Third?|Second?|Capital of Italy?", "pick: the order is saved " + items.map((x) => x.q).join("|"));
      check(items[2].answer === 1 && items[2].choices.join() === "Milan,Rome,Turin" && typeof items[2].image === "string" && !("img_url" in items[2]), "pick: choices, the right one, the picture's id");
      /* the ids the Worker gave come back with the next save */
      const ids = items.map((x) => x.id).join();
      await p.fill(".ed-item:nth-child(1) [id$='-q']", "Third? ").catch(async () => { await p.click(".ed-item:nth-child(1) .ed-isum"); await p.fill(".ed-item:nth-child(1) [id$='-q']", "Third? "); });
      await p.click(".ed-dock .btn");
      await p.waitForFunction(() => /Saved/.test(document.querySelector(".ed-state").textContent), null, { timeout: 5000 }).catch(() => {});
      check(g.items.map((x) => x.id).join() === ids, "pick: the Worker's item ids are sent back " + ids + " / " + g.items.map((x) => x.id).join());
      check(g.about === "For my **class**. Info: https://school.example", "pick: the About text");
      check(/Not listed yet/.test(await p.textContent(".ed-status")), "pick: Not listed yet");
      await shot(p, "editor-pick");
      /* the picture swapped: the old one is deleted after the save */
      const firstId = g.items[2].image;
      if ((await p.getAttribute(".ed-item:nth-child(3) .ed-isum", "aria-expanded")) !== "true") await p.click(".ed-item:nth-child(3) .ed-isum");
      await p.click(".ed-ibody >> text=Remove");
      await p.click(".ed-dock .btn");
      await wait(500);
      check(!db.images[firstId], "pick: a removed picture is deleted after the save");
      /* Share: link, code, QR */
      await p.click(".ed-acts >> text=Share");
      await p.waitForSelector(".st-qr svg");
      check(await p.locator(".st-codeboxes i").count() === 6, "pick: the game's code in the share sheet");
      await shot(p, "editor-share");
      await p.keyboard.press("Escape");
      /* reload from the link: everything comes back */
      await p.goto(url); await p.reload();
      await p.waitForSelector(".ed-list .ed-item");
      check(await p.locator(".ed-item").count() === 3, "pick: the edit link opens it again");
    }
    if (tpl === "number") check(g.mode === "open", "number: All at once is saved");
    if (tpl === "read") check(g.keep_answers === true, "read: Keep answers is saved");
    /* play what was made */
    if (tpl !== "number") {
      const pp = await page(ctx);
      await pp.goto(S.base + "/prof-bianchi/bianchi-" + tpl + "/");
      if (tpl === "read") { await pp.waitForSelector(".st-keep"); await pp.click("text=Skip"); }
      await pp.waitForSelector(".st-play");
      await playIt(pp, tpl === "picture" ? "pick" : tpl);
      await pp.waitForSelector(".st-after:not([hidden])");
      check(await pp.locator(".st-verdict .turnsout").count() === 1, tpl + ": the made game plays");
      if (tpl !== "pick") check(/it\.wikipedia\.org/.test(await pp.getAttribute(".st-after .sentence a", "href")), tpl + ": its explanation's link");
      check(pp.__errors.length === 0, tpl + ": the made game plays without errors " + pp.__errors.join(" | "));
      await shot(pp, "made-" + tpl);
      await pp.close();
    }
    first = false;
  }
  /* My Logicers on logicers.com holds the maker and every edit link; and the plays */
  /* in My Logicers' own keys (chat D) */
  const onSite = await site.evaluate(() => ({ maker: JSON.parse(localStorage.getItem("logicers-studio:maker") || "null"), games: JSON.parse(localStorage.getItem("logicers-studio:games") || "null"), played: JSON.parse(localStorage.getItem("logicers-studio:played") || "null") }));
  check(onSite.maker && onSite.maker.slug === "prof-bianchi" && onSite.maker.name === "Prof. Bianchi" && /^[A-Z2-7]{24}$/.test(onSite.maker.key), "My Logicers: the maker key on logicers.com " + JSON.stringify(onSite.maker));
  check(Array.isArray(onSite.games) && onSite.games.length === 6 && onSite.games.every((x) => /^[A-Z2-7]{24}$/.test(x.edit) && x.maker === "prof-bianchi" && typeof x.t === "number"), "My Logicers: six edit links on logicers.com");
  const pl = onSite.played && onSite.played["prof-bianchi/bianchi-pick"];
  check(pl && pl.days.length === 1 && pl.days[0] === todayIn("Europe/Rome") && pl.title === "Bianchi pick" && pl.by === "Prof. Bianchi", "My Logicers: the plays on logicers.com " + JSON.stringify(pl));
  /* delete a game */
  await p.goto(S.base + "/prof-bianchi/bianchi-line/edit/");
  await p.waitForSelector(".ed-dock");
  check(true, "line: opens from My Logicers' key with no # in the address");
  await p.click("text=Delete this game");
  await p.click("dialog button.btn.solid");
  await p.waitForSelector(".ed-tpls");
  check(!db.games["prof-bianchi/bianchi-line"], "delete: gone on the Worker");
  await site.waitForFunction(() => JSON.parse(localStorage.getItem("logicers-studio:games")).length === 5, null, { timeout: 4000 }).catch(() => {});
  const after = await site.evaluate(() => JSON.parse(localStorage.getItem("logicers-studio:games")).length);
  check(after === 5, "delete: gone from My Logicers");
  check(p.__errors.length === 0, "editor: no errors " + p.__errors.join(" | "));
  await ctx.close();
}
/* without a My Logicers code: this browser keeps every game it made, and /new/ lists them (9 Nov 2026: Khayyam closed the
   sheet and could not get back in); a game whose edit link this browser never had opens with the maker key */
{
  const ctx = await context(B, S, { viewport: { width: 360, height: 740 }, mobile: true, dark: true });
  const p = await page(ctx);
  await p.goto(S.base + "/new/");
  await p.waitForSelector(".ed-tpls");
  await p.click(".ed-tpl[data-v=rank]");
  await p.fill("#f-title", "Sıraya koy");
  await p.fill("#f-name", "Zeynep");
  await p.check("#f-terms");
  await p.click("text=Make it");
  await p.waitForSelector(".kp");
  check(await p.locator(".kp-tile:has-text('My Logicers')").count() === 0, "no code: no My Logicers tile");
  check(await p.locator(".kp-tile:has-text('This browser')").count() === 0 && /Kept on this browser\./.test(await p.textContent(".kp")), "keep sheet: this browser keeps it without a tap");
  await p.click(".kp >> text=Copy it");
  await wait(300);
  check((await p.evaluate(() => navigator.clipboard.readText())).includes("/zeynep/siraya-koy/edit/#"), "keep sheet: Copy it copies the edit link");
  await shot(p, "editor-keep-dark");
  await p.keyboard.press("Escape");
  await p.waitForSelector(".kp", { state: "detached", timeout: 3000 }).catch(() => {});
  check(await p.locator(".kp").count() === 0, "keep sheet: it closes like any sheet");
  let mine = await p.evaluate(() => JSON.parse(localStorage.getItem("lg.studio.mine")));
  check(mine.maker.slug === "zeynep" && mine.games.length === 1 && mine.games[0].slug === "siraya-koy" && /^[A-Z2-7]{24}$/.test(mine.games[0].edit), "no code: kept in this browser at once " + JSON.stringify(mine.games));
  /* the language is set in the editor now */
  await p.click(".ed-seg button[lang=tr]");
  await p.fill(".ed-ibody [id$='-q']", "Büyükten küçüğe");
  const ins = p.locator(".ed-ibody .ed-opt input[type=text]");
  await ins.nth(0).fill("Ankara"); await ins.nth(1).fill("Bursa"); await ins.nth(2).fill("Rize");
  await p.click(".ed-dock .btn");
  await p.waitForFunction(() => /Saved/.test(document.querySelector(".ed-state").textContent), null, { timeout: 5000 }).catch(() => {});
  check(db.games["zeynep/siraya-koy"].lang === "tr", "the game's language, set in the editor");
  /* /new/ lists it; Edit opens it */
  await p.goto(S.base + "/new/");
  await p.waitForSelector(".ed-mine-row");
  check(/Sıraya koy/.test(await p.textContent(".ed-mine")) && /Your games/.test(await p.textContent(".ed")), "/new/: your games first");
  await shot(p, "new-your-games-dark");
  await p.click(".ed-mine-row:has-text('Sıraya koy')");
  await p.waitForSelector(".ed-dock");
  check(await p.locator(".ed-item").count() === 1, "Your games: Edit opens it");
  /* a game this browser has no edit link for (made before this round, or the list was cleared): the maker key opens it */
  await p.evaluate(() => { const m = JSON.parse(localStorage.getItem("lg.studio.mine")); m.games = []; localStorage.setItem("lg.studio.mine", JSON.stringify(m)); });
  await p.goto(S.base + "/new/");
  await p.waitForSelector(".ed-mine-row");
  check(/Sıraya koy/.test(await p.textContent(".ed-mine")), "/new/: the Worker's list, from the maker key, when this browser's list is empty");
  const href = await p.getAttribute(".ed-mine-row", "href");
  check(href === "/zeynep/siraya-koy/edit/", "/new/: no edit link here, so the row opens the editor without one (" + href + ")");
  db.auth = [];
  await p.click(".ed-mine-row");
  await p.waitForSelector(".ed-dock");
  check(db.auth.includes("/game/mine maker"), "the editor opens with the maker key " + JSON.stringify(db.auth));
  await p.click(".ed-item .ed-isum");
  await p.fill(".ed-ibody [id$='-q']", "En büyükten en küçüğe");
  await p.click(".ed-dock .btn");
  await p.waitForFunction(() => /Saved/.test(document.querySelector(".ed-state").textContent), null, { timeout: 5000 }).catch(() => {});
  check(db.auth.includes("/game/save maker") && db.games["zeynep/siraya-koy"].items[0].q === "En büyükten en küçüğe", "and saves with it");
  mine = await p.evaluate(() => JSON.parse(localStorage.getItem("lg.studio.mine")));
  check(mine.games.length === 1 && mine.games[0].slug === "siraya-koy", "found again: this browser keeps it again " + JSON.stringify(mine.games));
  /* another maker's game: no way in without its link */
  await p.goto(S.base + "/anna-rossi/history-a-day/edit/");
  await p.waitForSelector(".st-card-box");
  check(/Open it on the browser you made it on, or with its edit link\./.test(await p.textContent(".st-card-box")), "someone else's game: says how to get in");
  /* the directory's chip says where your games are */
  await p.goto(S.base + "/"); await p.waitForSelector(".st-make");
  check((await p.textContent(".st-make")) === "Your games", "the directory: Your games, for a maker");
  check(p.__errors.length === 0, "no code: no errors " + p.__errors.join(" | "));
  await ctx.close();
}

/* 11 Nov 2026 (Khayyam): unsaved changes come back after the tab closes; new questions on days gone are named, with a fix;
   a picture the Worker refuses is named as a picture */
{
  const ctx = await context(B, S, { viewport: { width: 390, height: 844 }, mobile: true });
  const p = await page(ctx);
  p.on("dialog", (d) => d.accept());
  const ro = db.games["anna-rossi/ran-out"];
  const startWas = ro.start_day;
  await p.goto(G("ran-out") + "edit/#" + ro.edit_key);
  await p.waitForSelector(".ed-list");
  check(await p.locator(".ed-past:not([hidden])").count() === 0, "days gone: nothing to say before a new question");
  await p.click("text=+ Add a question");
  await FILL.pick(p);
  await p.waitForSelector(".ed-past:not([hidden])");
  check(/Players won.t see them/.test(await p.textContent(".ed-past")), "days gone: a new question on a day already gone is named");
  await shot(p, "editor-days-gone");
  await p.click(".ed-past >> text=Start them today");
  const moved = await p.locator("#e-start").getAttribute("data-value");      // 11 Nov 2026: our own date picker, a button that holds the day
  check(await p.locator(".ed-past:not([hidden])").count() === 0 && moved !== startWas && /Today|·/.test(await p.textContent(".ed-item:nth-child(4) .ed-isum small")), "days gone: Start them today moves the first day (" + startWas + " → " + moved + ")");
  /* the tab closes before Save: the changes come back */
  await p.reload();
  await p.waitForSelector(".ed-draft");
  check(/You have changes you didn.t save\./.test(await p.textContent(".ed-draft")) && await p.locator(".ed-item").count() === 3, "draft: offered back after the tab closed");
  await shot(p, "editor-draft");
  await p.click(".ed-draft >> text=Bring them back");
  await p.waitForSelector(".ed-item:nth-child(4)");
  check((await p.locator("#e-start").getAttribute("data-value")) === moved && /Not saved/.test(await p.textContent(".ed-state")), "draft: the question and the new first day are back, not saved yet");
  /* a picture the Worker refuses is named as a picture */
  await p.route("**/game/save", (rt) => rt.fulfill({ status: 400, contentType: "application/json", body: JSON.stringify({ ok: false, e: "item", i: 0, field: "image" }) }));
  await p.click(".ed-dock button.btn.solid");
  await p.waitForFunction(() => /Add the picture\./.test((document.querySelector(".ed-item.bad") || {}).textContent || ""), null, { timeout: 4000 }).catch(() => {});
  check(/Add the picture\./.test(await p.textContent(".ed-item.bad")) && !/Too long/.test(await p.textContent(".ed-item.bad")), "a refused picture: 'Add the picture.', not 'Too long.'");
  await p.unroute("**/game/save");
  await p.click(".ed-dock button.btn.solid");
  await p.waitForFunction(() => /Saved/.test(document.querySelector(".ed-state").textContent), null, { timeout: 5000 }).catch(() => {});
  const kept = await p.evaluate(() => JSON.parse(localStorage.getItem("lg.studio.drafts") || "{}"));
  check(/Saved/.test(await p.textContent(".ed-state")) && !kept["anna-rossi/ran-out"] && ro.items.length === 4 && ro.start_day === moved, "draft: saved, then gone from the phone");
  await p.reload(); await p.waitForSelector(".ed-list");
  check(await p.locator(".ed-draft").count() === 0, "draft: nothing offered once saved");
  /* the other way: Throw them away */
  await p.fill("#e-title", "Ran out, renamed");
  await p.reload(); await p.waitForSelector(".ed-draft");
  await p.click(".ed-draft >> text=Throw them away");
  check(await p.locator(".ed-draft").count() === 0 && (await p.inputValue("#e-title")) === "Ran out", "draft: thrown away");
  await p.reload(); await p.waitForSelector(".ed-list");
  check(await p.locator(".ed-draft").count() === 0, "draft: and not offered again");
  check(p.__errors.length === 0 || p.__errors.every((x) => /status of 400/.test(x)), "draft and days gone: no errors " + p.__errors.join(" | "));
  await ctx.close();
}

/* ---------- 4b and 4c (11 Nov 2026): the editor in columns, and our own date picker: editor-wide.mjs ---------- */
await editorWide(S, B);

/* ---------- 5. the embed, in someone else's page ---------- */
console.log("5. the embed in an iframe");
for (const size of [SIZES[1], SIZES[4]]) {
  const ctx = await context(B, S, size);
  const p = await page(ctx);
  const code = `<iframe src="${S.base}/anna-rossi/history-a-day/embed/" title="t" width="100%" height="600" style="border:0;max-width:640px" loading="lazy" allow="clipboard-write"></iframe>\n<script src="${S.base}/embed.js" async></script>`;
  await p.goto(S.siteBase + "/studio/tests/host.html?code=" + encodeURIComponent(code));
  const fr = p.frameLocator("iframe");
  await fr.locator(".st-play").waitFor();
  check(await fr.locator(".st-bar").count() === 0, size.name + " embed: no header");
  check(await fr.locator(".st-notice").count() === 1, size.name + " embed: the notice line");
  const pw = fr.locator(".st-powered");
  check(await pw.count() === 1 && /\/anna-rossi\/history-a-day\/$/.test(await pw.getAttribute("href")) && (await pw.getAttribute("target")) === "_blank", size.name + " embed: powered by Logicers, to the full page");
  await wait(800);
  const h1 = await p.evaluate(() => document.querySelector("iframe").getBoundingClientRect().height);
  check(h1 !== 600 && h1 > 300, size.name + " embed: the frame fits its game (" + h1 + ")");
  await fr.locator(".st-choice >> nth=1").click();
  await fr.locator("text=Lock in").click();
  await fr.locator(".st-after:not([hidden])").waitFor();
  await wait(900);
  const h2 = await p.evaluate(() => document.querySelector("iframe").getBoundingClientRect().height);
  check(h2 > h1, size.name + " embed: the frame grows after the answer (" + h1 + " → " + h2 + ")");
  const inner = p.frames().find((f) => /\/embed\/$/.test(f.url()));
  check(inner && await inner.evaluate(() => document.querySelectorAll("iframe").length) === 0, size.name + " embed: no bridge inside an embed");
  await shot(p, size.name + "-embed-host");
  check(p.__errors.length === 0, size.name + " embed: no errors " + p.__errors.join(" | "));
  await ctx.close();
}

/* ---------- 6. Khayyam's queue, one card per game, against the real Worker (9 Nov 2026) ---------- */
console.log("6. the queue, one card per game");
{
  const R = await startReal();
  const day = todayIn("UTC");
  const anna = (await R.call("/maker/new", { name: "Anna Rossi", lang: "en", terms_version: "2026-11-08" })).json;
  const g = (await R.call("/game/new", { maker_key: anna.key, template: "pick", title: "History a day", lang: "en", mode: "daily", start_day: day, want_listed: true })).json;
  const fd = new FormData(); fd.append("edit_key", g.edit_key); fd.append("file", new Blob([fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), "seed.jpg"))], { type: "image/jpeg" }), "p.jpg");
  R.env.AI.next = "FLAG";
  const pic = (await R.call("/img/put", null, fd)).json;
  check(pic && pic.id && pic.held === false, "queue: a flagged picture is stored and shown at once " + JSON.stringify(pic));
  await R.call("/game/save", { edit_key: g.edit_key, about: "For my **class**. More at https://school.example/history", items: [
    { q: "Who painted the Sistine Chapel ceiling?", choices: ["Raphael", "Michelangelo", "Leonardo"], answer: 1, image: pic.id, explain: "From 1508 to 1512. https://en.wikipedia.org/wiki/Sistine_Chapel_ceiling" },
    { q: "Which came first?", choices: ["The wheel", "Writing"], answer: 1 }] });
  check((await fetch(R.base + "/i/" + g.id + "/" + pic.id)).status === 200, "queue: players see it before Khayyam looks");
  await R.call("/report", { game: g.id, reason: "wrong", text: "Question 2 is wrong", browser: "browserAAAA1" });
  const g2 = (await R.call("/game/new", { maker_key: anna.key, template: "number", title: "How many a day", lang: "it", mode: "open", start_day: day, want_listed: false })).json;
  await R.call("/maker/new", { name: "Bob Bianchi", lang: "en", terms_version: "2026-11-08" });
  for (const v of [{ w: 390, dark: false }, { w: 390, dark: true }, { w: 1280, dark: false }, { w: 1280, dark: true }]) {
    const ctx = await context(B, S, { viewport: { width: v.w, height: 900 }, mobile: v.w < 600, dark: v.dark, bridge: false, dpr: v.w < 600 ? 2 : 1 });
    const p = await page(ctx);
    await p.goto(R.base + "/admin/");
    await p.fill("#key", ADMIN_KEY); await p.click("#open");
    await p.waitForSelector(".qa-gcard"); await wait(500);
    check(await noOverflow(p), `queue ${v.w}${v.dark ? " dark" : ""}: no sideways scroll`);
    await shot(p, `queue-${v.w}${v.dark ? "-dark" : ""}`);
    if (v.w !== 390 || v.dark) { check(p.__errors.length === 0, "queue: no errors " + p.__errors.join(" | ")); await ctx.close(); continue; }
    const cards = await p.$$eval(".qa-gcard", (cs) => cs.map((c) => c.getAttribute("data-card")));
    check(cards.join() === "m:bob-bianchi,g:anna-rossi/how-many-a-day,g:anna-rossi/history-a-day,m:anna-rossi", "queue: one card per game or new maker, newest first " + cards.join());
    const H = '[data-card="g:anna-rossi/history-a-day"]';
    const text = await p.textContent(H);
    check(/History a day/.test(text) && /by Anna Rossi/.test(text) && new RegExp(g.code).test(text) && /Wants listing/.test(text), "queue card: title, maker, code, state");
    check(await p.locator(H + " .qa-qlist > li").count() === 2 && (await p.textContent(H + " .qa-qlist > li:first-child .qa-right")) === "Michelangelo", "queue card: the questions with the right answer");
    check(/Flagged/.test(await p.textContent(H + " .qa-fig")) && /Q1/.test(await p.textContent(H + " .qa-fig")), "queue card: the picture, what the check said, where it is used");
    check(/For my \*\*class\*\*/.test(await p.textContent(H + " .qa-text")) && await p.locator(H + " .qa-links li").count() === 2, "queue card: the About text and every link");
    check(/Question 2 is wrong/.test(text) && /Questions 1, 2 new or changed/.test(text), "queue card: the report and what is new");
    check(await p.locator(H + " .qa-act:text-is('Put on the list')").count() === 1 && await p.locator(H + " .qa-act:text-is('Hide')").count() === 1 && await p.locator(H + " .qa-act:text-is('Seen')").count() === 1, "queue card: one set of buttons");
    check(/Seen.*players notice nothing.*Put on the list/.test(await p.textContent(".qa-legend")), "queue: one line says what Seen and the list are");
    /* Remove a picture: two taps */
    await p.click(H + " .qa-fig .qa-act");
    check(/Sure\? Remove/.test(await p.textContent(H + " .qa-fig .qa-act")), "queue: Remove asks for a second tap");
    await p.click(H + " .qa-fig .qa-act");
    await p.waitForFunction((h) => !document.querySelector(h + " .qa-fig") && /Picture removed\./.test(document.querySelector(h + " .qa-qlist").textContent), H, { timeout: 5000 }).catch(() => {});
    check(await p.locator(H + " .qa-fig").count() === 0 && /Picture removed\./.test(await p.textContent(H + " .qa-qlist")), "queue: the picture is gone from the card");
    check((await fetch(R.base + "/i/" + g.id + "/" + pic.id)).status === 404, "queue: and from players");
    const mine = (await R.call("/game/mine", { edit_key: g.edit_key })).json;
    check(mine.items[0].image_removed === true, "queue: the maker's editor is told");
    /* Put on the list */
    await p.click(H + " .qa-act:text-is('Put on the list')");
    await p.waitForFunction((h) => /On the list/.test(document.querySelector(h + " .qa-ghead").textContent), H, { timeout: 5000 }).catch(() => {});
    check(/On the list/.test(await p.textContent(H + " .qa-ghead")) && await p.locator(H + " .qa-act:text-is('Take off the list')").count() === 1, "queue: Put on the list, then Take off the list is offered");
    check((await (await fetch(R.base + "/list")).json()).games.some((x) => x.id === g.id), "queue: and players find it in the list");
    /* a maker's other games: one tap */
    await p.click(H + " .qa-others summary");
    await p.click(H + " .qa-other");
    await p.waitForTimeout(400);
    check(await p.locator('[data-card="g:anna-rossi/how-many-a-day"]').count() === 1, "queue: the maker's other game is one tap away");
    /* Seen: off To do; a new edit opens it again with only what is new */
    await p.click(H + " .qa-act:text-is('Seen')");
    await p.waitForFunction((h) => !document.querySelector(h), H, { timeout: 5000 }).catch(() => {});
    check(await p.locator(H).count() === 0, "queue: Seen takes the card off To do");
    await R.call("/game/save", { edit_key: g.edit_key, items: [mine.items[0], Object.assign({}, mine.items[1], { q: "Which came first, really?" })].map((it) => { const o = Object.assign({}, it); delete o.image_removed; delete o.image_url; return o; }) });
    await p.click("#refresh");
    await p.waitForSelector(H);
    const back = await p.textContent(H + " .qa-fresh");
    check(/Questions 1, 2 new or changed/.test(back) && /off the list until you put it there again/.test(back) && !/Report|About/.test(back), "queue: a new edit opens the card again, with only what is new (" + back + ")");
    await shot(p, "queue-after");
    /* More: Delete game (two taps), Block maker */
    const G2 = '[data-card="g:anna-rossi/how-many-a-day"]';
    await p.click(G2 + " .qa-more-zone summary");
    await p.click(G2 + " .qa-act:text-is('Delete game')");
    await p.click(G2 + " .qa-act:text-is('Sure? Delete game')");
    await p.waitForFunction((h) => !document.querySelector(h), G2, { timeout: 5000 }).catch(() => {});
    check(await p.locator(G2).count() === 0 && (await R.call("/game/mine", { edit_key: g2.edit_key })).status === 403, "queue: Delete game, two taps");
    /* 11 Nov 2026: Delete maker (two taps): the name and every game of theirs, and every card of theirs leaves */
    const bob = '[data-card="m:bob-bianchi"]';
    await p.click(bob + " .qa-more-zone summary");
    await p.click(bob + " .qa-act:text-is('Delete maker and all their games')");
    check(await p.locator(bob + " .qa-act:text-is('Sure? Delete maker and all their games')").count() === 1, "queue: Delete maker asks for a second tap");
    await p.click(bob + " .qa-act:text-is('Sure? Delete maker and all their games')");
    await p.waitForFunction((h) => !document.querySelector(h), bob, { timeout: 5000 }).catch(() => {});
    check(await p.locator(bob).count() === 0 && (await fetch(R.base + "/m/bob-bianchi")).status === 404, "queue: Delete maker, the name is gone");
    /* the picture check, tried from the page */
    R.env.AI.next = "SAFE";
    await p.click("#aitest");
    await p.waitForFunction(() => /picture check works/.test(document.querySelector("#status").textContent), null, { timeout: 5000 }).catch(() => {});
    check(/The picture check works\. llama-4-scout-17b-16e-instruct: said SAFE/.test(await p.textContent("#status")), "queue: Picture check says it works " + await p.textContent("#status"));
    R.env.AI.next = new Error("5016: input not accepted");
    await p.click("#aitest");
    await p.waitForFunction(() => /not answering/.test(document.querySelector("#status").textContent), null, { timeout: 5000 }).catch(() => {});
    check(/not answering.*5016/.test(await p.textContent("#status")), "queue: and says so when it does not, with the error");
    R.env.AI.next = "SAFE";
    await p.click("#forget");
    await p.fill("#key", "wrong"); await p.click("#open");
    await p.waitForSelector("#lock-err:not([hidden])");
    check(/That key did not work/.test(await p.textContent("#lock-err")), "queue: a wrong key");
    check(p.__errors.length === 0, "queue: no errors " + p.__errors.join(" | "));
    await ctx.close();
  }
  R.close();
}

await B.close();
S.close();
process.exit(report() ? 1 : 0);
