/* The story game in a real browser, through whole fake weeks.
     node story/test/run_browser.mjs               every scenario (about 4 minutes)
     node story/test/run_browser.mjs weeks join    only the named ones
   Scenarios: weeks (four whole weeks, every version of every chapter, every ending), join (Wednesday, Sunday), midnight,
   counts (read and voted numbers, Sunday, small choices made offline, the launch date), clock (a wrong phone clock, before the launch), offline, device (one vote per device, resuming), lastweek, look (phone,
   dark), safe (chapter text cannot run code), card (end card, ? chip, keyboard), home (the tile on the home page, every state),
   real (the real week files in story/weeks/, word for word, all endings).
   Needs: Node 22+ and Playwright with Chrome (CHROME=/path/to/chrome if it is not at /usr/bin/google-chrome).
   Run from anywhere: the site root is two folders up from here (the games folder) unless SITE=/path says otherwise.
   Optional: OVERRIDE=/path to a folder laid out like the site, whose shared files (assets/js/turnsout.js ...) are used instead
   of SITE's; REAL=/path to the real week files (default: story/weeks/); HOME_PAGE=/path to the home page, if it is not
   SITE/index.html. Pictures of some screens go to test/shots/ (not needed in git).
   No internet is used: the story server is the real worker.js on SQLite (worker/test/d1shim.mjs), answering the page's requests
   from inside the browser, with a clock the test moves by hand. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadPlaywright, startServer, World, Device, Checks, at, DAY, LAUNCH, WRANGLER_FILE } from "./harness.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = process.env.SITE || path.resolve(HERE, "..", "..");
const CHROME = process.env.CHROME || "/usr/bin/google-chrome";
/* OVERRIDE: a folder laid out like the site (assets/js/turnsout.js ...) whose shared files are used instead of SITE's, to test against the live ones.
   REAL: a folder with the real week files (wN.json), used by the "real" scenario; weeks that are not there fall back to the fixture. */
const OVERRIDE = process.env.OVERRIDE || "";
const REAL = process.env.REAL || path.join(HERE, "..", "weeks");
const realFile = (n) => path.join(REAL, "w" + n + ".json");
const FIXTURE = path.join(HERE, "fixtures", "w0.json");
const fx = JSON.parse(fs.readFileSync(FIXTURE, "utf8"));
const C = new Checks();

const DAYNAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
/* the label of a vote option on day d (the same in every version of the fixture's chapters) */
function label(d, c) {
  const v = fx.days[d - 1].versions;
  const ch = v[Object.keys(v)[0]];
  return ch.vote[c].label;
}
const pct = (a, b, c) => (a + b ? Math.round(100 * (c === "A" ? a : b) / (a + b)) : 0);
/* which chapter the world's path puts on screen on day d */
function worldKeyOf(P, d) { return d === 1 ? "" : d <= 6 ? P[d - 2] : P[0] + P[3]; }
function tagOf(d, key) { return d === 1 ? "The island has 212 people" : d <= 6 ? "[D" + d + key + "]" : "[END-" + key + "]"; }
const TAGRE = /\[(D\d[AB]|END-[AB]{2})\]|The island has 212 people/g;
function tagsIn(texts) {
  const out = [];
  for (const t of texts) for (const m of t.matchAll(TAGRE)) { const x = m[0]; if (out[out.length - 1] !== x) out.push(x); }
  return out;
}

let env;                                         // { browser, base }
async function fresh(ms, o, prep) {
  const world = new World(ms);
  if (prep) await prep(world);                    // the world's earlier days, before this player's phone is switched on
  const dev = await new Device(world, env.browser, env.base, o || { name: "me", country: "DE" }).init();
  return { world, dev };
}

/* ======================================================================================================
   weeks: four whole weeks, every version of every chapter, in the order a real player meets them
   ====================================================================================================== */
const WEEKS = {
  /* the world's result per day, what this player does per day (null = does not play), and the other voters per day */
  1: { P: "AAAAAA", me: ["B", "B", "B", "B", "B", "B"], note: "lost every vote" },
  2: { P: "BBBBBB", me: ["B", "B", "B", "B", "B", "B"], note: "with the world every time" },
  3: { P: "ABABAB", me: ["A", "A", "B", "A", "A", "A"], note: "a mix" },
  4: { P: "BAAABB", me: ["A", null, null, "B", "B", "A"], note: "skips days; a day with no votes; a tie" }
};
/* the other voters of a day: [A, B]; the target result must hold with this player's vote added */
function others(w, d) {
  const cfg = WEEKS[w], target = cfg.P[d - 1];
  if (w === 4 && d === 3) return [0, 0];                         // nobody votes: the result is A
  if (w === 4 && d === 4) return [2, 1];                         // with this player's B it is 2 to 2: a tie, which is A
  return target === "A" ? [5, 1] : [1, 5];
}

async function scenarioWeeks() {
  C.at("weeks: four whole weeks");
  const { world, dev } = await fresh(at(0, 9));
  const seenKeys = new Set();
  const intro = { done: false };
  for (let w = 1; w <= 4; w++) {
    const cfg = WEEKS[w], P = cfg.P, me = cfg.me;
    const base = 7 * (w - 1);
    const country = {};                                           // per day: what this player did
    const ownKey = (d) => (me[d - 1] === null ? P[d - 1] : me[d - 1]);          // the version they follow
    C.at("week " + w + " (" + cfg.note + ")");
    let lastShown = 0;                                           // the latest voted day whose result this player has been shown
    for (let d = 1; d <= 7; d++) {
      const plays = d === 7 || me[d - 1] !== null;               // a player who skips a day never opens the page that day
      await world.setTime(at(base + d - 1, 9));
      if (plays) {
        await dev.open();
        if (w === 1 && d === 1) {
          C.eq("first visit shows the intro", await dev.view(), "intro");
          const t = await dev.text();
          C.has("intro says about 2 minutes", t, "About 2 minutes");
          C.not("intro never says under a minute", t.toLowerCase(), "under a minute");
          C.has("intro says what is counted, and that there are no names", t, "Reads, votes and choices are counted by country. No names.");
          C.has("intro shows the closing time in the player's own clock (Baku, UTC+4)", t, "04:00");
          await dev.start();
        }
        let y = 0;                                               // the result they are shown first: their latest voted day before today
        for (let k = 1; k < d && k <= 6; k++) if (me[k - 1] !== null) y = k;
        if (y > lastShown) {
          lastShown = y;
          C.eq("w" + w + " d" + d + ": the result of the latest vote comes first", await dev.view(), "result");
          const [oa, ob] = others(w, y);
          const a = oa + (me[y - 1] === "A" ? 1 : 0), b = ob + (me[y - 1] === "B" ? 1 : 0);
          const win = P[y - 1];
          C.eq("w" + w + " d" + y + ": the world's winner on screen", await dev.text(".st-win"), label(y, win));
          for (const c of ["A", "B"]) C.has("w" + w + " d" + y + ": legend " + c + " percent", await dev.text(".st-li." + c.toLowerCase()), label(y, c) + " " + pct(a, b, c) + "%");
          C.has("w" + w + " d" + y + ": read, voted and countries", await dev.text(".st-vc"), (a + b) + " read · " + (a + b) + " voted · 1 country");
          C.hasi("w" + w + " d" + y + ": your side is tagged", await dev.text(".st-li." + me[y - 1].toLowerCase()), "You");
          C.eq("w" + w + " d" + y + ": the country row shows next to the world's (5+ voters from here)", await dev.page.locator(".st-brow").count(), a + b >= 3 ? 2 : 1);
          const st = await world.state(w);
          const row = st.days.find((x) => x.day === y);
          C.eq("w" + w + " d" + y + ": the server's majority is what the plan wanted", row.result, win);
          C.eq("w" + w + " d" + y + ": the server's counts", [row.a, row.b], [a, b]);
          if (me[y - 1] !== win) {
            C.has("w" + w + " d" + y + ": the glimpse is shown to a player who lost", await dev.text(".st-glimpse"), y === 1 ? (me[0] === "A" ? "You slide a knife" : "You put the envelope in your coat") : "GLIMPSE-D" + y + "-" + me[y - 1]);
            C.hasi("w" + w + " d" + y + ": glimpse title", await dev.text(".st-glimpse"), "If the world had gone your way:");
          } else C.ok("w" + w + " d" + y + ": no glimpse for a player who won", !(await dev.has(".st-glimpse")));
          C.has("w" + w + " d" + y + ": the science line", await dev.text(".st-science"), y === 1 ? "Most people open it" : "SCIENCE-D" + y);
          C.has("w" + w + " d" + y + ": the next chapter is ready", await dev.text(".st-ready"), "Chapter " + d + " is ready");
          if (me[y - 1] !== win && w === 1 && y === 3) await dev.shot("result-lost");
          await dev.click(".st-ready");
        } else {
          C.eq("w" + w + " d" + d + ": the week is the first screen when there is no result to see", await dev.view(), "hub");
          if (d <= 6) C.has("w" + w + " d" + d + ": the week counts down", await dev.text(), "The world is deciding");
          await dev.click(".st-next .btn.solid");
        }
      }

      if (d <= 6 && me[d - 1] !== null) {
        const key = worldKeyOf(P, d);
        const res = await dev.readThrough((n) => (n + d) % 2);
        C.has("w" + w + " d" + d + ": the chapter is the world's version (" + tagOf(d, key) + ")", res.texts.join(" | "), tagOf(d, key));
        const others_ = tagsIn(res.texts);
        C.eq("w" + w + " d" + d + ": only that version was shown", others_, [tagOf(d, key)]);
        C.eq("w" + w + " d" + d + ": ended on the vote", res.stop, "vote");
        C.eq("w" + w + " d" + d + ": two small choices were made", res.lines.length, 2);
        const q = await dev.text(".st-vq");
        C.has("w" + w + " d" + d + ": the question", q, d === 1 ? "Tonight the island decides" : "The vote of day " + d);
        C.ok("w" + w + " d" + d + ": Vote is disabled until a side is picked", await dev.page.locator(".st-go").isDisabled());
        C.has("w" + w + " d" + d + ": the vote screen says when it ends in the player's clock", await dev.text(".st-lock"), "04:00");
        await dev.vote(me[d - 1]);
        C.has("w" + w + " d" + d + ": your vote is in", await dev.text(), "Your vote is in.");
        C.has("w" + w + " d" + d + ": and says what was voted", await dev.text(".st-done .st-p"), label(d, me[d - 1]));
        C.ok("w" + w + " d" + d + ": the end card opens", await dev.has("#fin .fin-sheet"));
        const card = await dev.text("#fin");
        C.has("w" + w + " d" + d + ": the end card says the vote is in", card, "Your vote is in");
        C.has("w" + w + " d" + d + ": and when the next chapter opens", card, "Chapter " + (d + 1) + " opens at 04:00");
        C.ok("w" + w + " d" + d + ": and points to a next game", await dev.has("#fin a.fin-next"));
        if (w === 1 && d === 1) await dev.shot("end-card");
        await dev.closeCard();
        await dev.click(".st-done .btn.ghost:last-child");                   // Back
        await dev.waitView("hub");
        C.has("w" + w + " d" + d + ": the week now says you voted", await dev.text(".st-next"), "You voted.");
        /* the other voters of the day, still before midnight */
        const [oa, ob] = others(w, d);
        if (oa + ob) { await world.bulk(w, d, oa, ob, "DE"); }
        if (w === 1 && d === 1) {
          /* the numbers on the week page: made fresh every minute while it is open (6 others + this player) */
          const live = await dev.waitHas(".st-counts", "1 read · 1 voted", 3000);
          C.has("w1 d1: just after voting the week page says 1 read, 1 voted, 1 country", live, "1 read · 1 voted · 1 country");
          world.ms += 61000;
          await dev.page.clock.runFor(61000); dev.current += 61000;
          const later = await dev.waitHas(".st-counts", "7 read", 3000);
          C.has("w1 d1: a minute later the others are counted too (7 read, 7 voted)", later, "7 read · 7 voted · 1 country");
        }
        /* a second look the same evening, as a different time of the day */
        await world.setTime(at(base + d - 1, 21, 30));
        C.has("w" + w + " d" + d + ": the hub counts down to the result", await dev.text(".st-next"), "Result at 04:00");
        C.has("w" + w + " d" + d + ": 2 h 30 min left at 21:30 UTC", await dev.text(".st-next"), "2 h 30 min left");
      } else if (d <= 6) {
        /* skipped: the other voters still vote, and the page is simply not open */
        const [oa, ob] = others(w, d);
        if (oa + ob) await world.bulk(w, d, oa, ob, "DE");
      }

      if (d === 7) {
        /* Sunday: the ending, then the week as chosen, then the week card */
        const key = worldKeyOf(P, 7);
        const res = await dev.readThrough();
        C.has("w" + w + " d7: the ending of the world's path (" + tagOf(7, key) + ")", res.texts.join(" | "), tagOf(7, key));
        C.eq("w" + w + " d7: only that ending was shown", tagsIn(res.texts), [tagOf(7, key)]);
        const end = await dev.text();
        C.has("w" + w + " d7: the end", end, "The end.");
        C.ok("w" + w + " d7: no vote on Sunday", !(await dev.has(".st-vopt")));
        const own = {};
        for (let k = 1; k <= 6; k++) own[k] = ownKey(k);
        const myChainKeys = ["", ...[2, 3, 4, 5, 6].map((k) => own[k - 1]), own[1] + own[4]];
        const worldKeys = [0, 1, 2, 3, 4, 5, 6].map((k) => worldKeyOf(P, k + 1));
        const differs = myChainKeys.some((k, i) => k !== worldKeys[i]) && me.some((x) => x !== null);
        C.eq("w" + w + " d7: 'Read the week as you chose it' only when it differs", await dev.has(".st-chainbtn"), differs);
        if (differs) {
          await dev.click(".st-chainbtn");
          const chain = await dev.readThrough();
          const want = [1, 2, 3, 4, 5, 6, 7].map((k) => tagOf(k, myChainKeys[k - 1]));
          C.eq("w" + w + " chain: the player's own versions, day after day, in order", tagsIn(chain.texts), want);
          const lc = (t) => t.toLowerCase().split("\n").filter(Boolean).join(" | ");
          const heads = chain.texts.filter((t) => /^chapter \d\n/i.test(t)).map((t) => lc(t).replace(" | ", " "));
          C.eq("w" + w + " chain: a heading for each day", heads, DAYNAMES.map((n, i) => ("Chapter " + (i + 1) + " " + n).toLowerCase()));
          const chose = chain.texts.filter((t) => /^(you|the world) chose/i.test(t)).map(lc);
          const wantChose = [1, 2, 3, 4, 5, 6].map((k) => ((me[k - 1] === null ? "The world chose" : "You chose") + " | " + label(k, own[k])).toLowerCase());
          C.eq("w" + w + " chain: what you chose (or the world, on days you did not vote)", chose, wantChose);
          C.has("w" + w + " chain: its end", await dev.text(), "That was your week.");
          if (w === 1) await dev.shot("chain-end");
          await dev.click(".st-actions .btn.solid");
        } else {
          await dev.click(".st-weekbtn");
        }
        await dev.waitView("weekcard");
        const wc = await dev.text();
        let voted = 0, same = 0;
        for (let k = 1; k <= 6; k++) {
          const row = await dev.text(".st-row[data-day='" + k + "']");
          const [oa, ob] = others(w, k);
          const a = oa + (me[k - 1] === "A" ? 1 : 0), b = ob + (me[k - 1] === "B" ? 1 : 0);
          C.has("w" + w + " card d" + k + ": your vote", row, "You: " + (me[k - 1] === null ? "–" : label(k, me[k - 1])));
          C.has("w" + w + " card d" + k + ": the world's", row, "World: " + label(k, P[k - 1]) + (a + b ? " · " + pct(a, b, P[k - 1]) + "%" : ""));
          if (me[k - 1] !== null) { voted++; if (me[k - 1] === P[k - 1]) same++; }
          const mark = await dev.page.locator(".st-row[data-day='" + k + "'] .st-rm").getAttribute("class");
          C.has("w" + w + " card d" + k + ": the mark", mark, me[k - 1] === null ? "none" : me[k - 1] === P[k - 1] ? "same" : "diff");
        }
        C.has("w" + w + " card: the sum", wc, voted ? "You voted with the world " + same + " of " + voted + " times." : "You did not vote this week.");
        C.eq("w" + w + " card: the chain button follows the same rule", await dev.has(".st-weekcard .btn.solid"), differs);
        C.ok("w" + w + " card: the end card pops up once", await dev.has("#fin"));
        C.has("w" + w + " card: and says that was the week", await dev.text("#fin"), "That was the week");
        C.has("w" + w + " card: and what comes next", await dev.text("#fin"), w < 4 ? "A new story starts on Monday" : "More stories soon");
        if (w === 1) await dev.shot("week-card");
        await dev.closeCard();
        /* opening the card again does not pop the end card again */
        await dev.click(".st-weekcard .btn.ghost:last-child");
        await dev.waitView("hub");
        await dev.click(".st-next .btn.solid:last-child");
        await dev.waitView("weekcard");
        C.ok("w" + w + " card: no second end card", !(await dev.has("#fin")));
        await dev.click(".st-weekcard .btn.ghost:last-child");
        await dev.waitView("hub");
        if (w < 4) {
          // the cron closes Saturday and Sunday at midnight
        }
      }

      /* midnight: the cron runs on some nights and not on others (the next /state closes the day itself) */
      if (d <= 6) {
        if (plays) await dev.sleep();
        await world.setTime(at(base + d, 0, 0));
        if ((w + d) % 2 === 0) await world.cron();
      }
    }
  }
  /* after the last week */
  await world.setTime(at(28, 10));
  await dev.open();
  C.eq("after the last week: the hub", await dev.view(), "hub");
  C.has("after the last week: it says so", await dev.text(), "That was the last story for now.");
  C.ok("no page errors", dev.errors.length === 0, dev.errors);
  C.eq("the browser kept 4 weeks of choices", Object.keys((await dev.store()).weeks).length, 4);
  const taps = (await dev.store()).taps;
  C.ok("hidden portrait: every small choice and vote kept with axis and side", taps.length > 0 && taps.every((t) => t.axis && (t.side === "left" || t.side === "right") && ["s", "v"].includes(t.k)), taps.slice(0, 3));
  C.eq("hidden portrait: 2 small choices + 1 vote on each played day (6+6+6+3 votes)", [taps.filter((t) => t.k === "v").length, taps.filter((t) => t.k === "s").length], [6 + 6 + 6 + 4, 2 * (6 + 6 + 6 + 4)]);
  const me = await dev.store();
  const smalls = taps.filter((t) => t.k === "s");
  C.ok("hidden portrait: every small choice is marked as sent", smalls.length > 0 && smalls.every((t) => t.sent === true));
  const srv = await world.rows("SELECT week, day, n, pick, axis, side, ver, country FROM smalls WHERE dev = ? ORDER BY week, day, n", me.id);
  C.eq("hidden portrait: the server has every small choice (2 on each of the 22 voted days)", srv.length, smalls.length);
  C.ok("hidden portrait: and the same picks, axes and sides as the browser", smalls.every((t) => srv.some((r) => r.week === t.w && r.day === t.d && r.n === t.n && r.pick === t.pick && r.axis === t.axis && r.side === t.side && r.country === "DE")));
  C.ok("hidden portrait: with the version of the chapter that was read", smalls.every((t) => srv.some((r) => r.week === t.w && r.day === t.d && r.n === t.n && r.ver === t.ver)));
  C.eq("small choices were each sent once", world.log.filter((l) => l[0] === "POST" && l[1] === "/small" && l[2] === 200 && l[3] === "me").length, smalls.length);
  const rd = await world.rows("SELECT week, day FROM reads WHERE dev = ?", me.id);
  C.eq("the server counted this player as a reader on every chapter they finished: 22 voting days + 4 Sundays", rd.length, 22 + 4);
  C.ok("the browser marks every read as sent", Object.values(me.weeks).every((wk) => Object.entries(wk.days).every(([k, x]) => !(x.vote || (+k === 7 && x.read)) || x.readSent === true)));
  await dev.close();
}


/* ======================================================================================================
   join: a player who comes on Wednesday; earlier days are readable but not votable
   ====================================================================================================== */
async function scenarioJoin() {
  C.at("join on a Wednesday");
  const { world, dev } = await fresh(at(0, 9));
  await world.bulk(1, 1, 4, 1, "DE");
  await world.setTime(at(1, 0, 0)); await world.cron();
  await world.setTime(at(1, 12));
  await world.bulk(1, 2, 1, 4, "DE");
  await world.setTime(at(2, 10));                                   // Wednesday morning; Tuesday's day is closed by the next /state, not by the cron
  await dev.open();
  C.eq("a new player meets the intro first", await dev.view(), "intro");
  await dev.start();
  C.eq("then the week", await dev.view(), "hub");
  const pill = (d) => dev.page.locator(".st-pill[data-day='" + d + "']");
  const cls = async (d) => (await pill(d).getAttribute("class")) + (await pill(d).isDisabled() ? " disabled" : "");
  C.has("Monday is closed but can be read", await cls(1), "st-closed");
  C.not("Monday is not disabled", await cls(1), "disabled");
  C.has("Tuesday is closed", await cls(2), "st-closed");
  C.has("Wednesday is today", await cls(3), "st-today");
  for (const d of [4, 5, 6, 7]) C.has("day " + d + " is not open yet", await cls(d), "disabled");
  C.has("the week says it is chapter 3", await dev.text(".st-next"), "Chapter 3 · Wednesday");
  /* read Monday as the world's story: no small choices, no vote */
  await pill(1).click();
  const m = await dev.readThrough();
  C.has("Monday is read from the start", m.texts[0], "The island has 212 people");
  C.eq("Monday has all its screens", m.texts.length, 9);
  C.eq("no small choices when reading an old day", m.lines.length, 0);
  C.ok("no vote when reading an old day", !(await dev.has(".st-vopt")));
  C.has("it ends with the way to the result", await dev.text(), "That is the end of chapter 1.");
  await dev.clickText("See the result");
  C.eq("Monday's result", await dev.view(), "result");
  C.eq("the world chose A", await dev.text(".st-win"), "Open it.");
  C.has("80%", await dev.text(".st-li.a"), "Open it. 80%");
  C.not("a player who did not vote has no 'You' tag", (await dev.text(".st-leg")).toLowerCase(), "you");
  C.ok("and no glimpse", !(await dev.has(".st-glimpse")));
  C.has("chapter 3 is the way on", await dev.text(".st-ready"), "Chapter 3 is ready");
  await dev.clickText("The week");
  /* Tuesday: the world's version (Monday's result A) */
  await pill(2).click();
  const t = await dev.readThrough();
  C.eq("Tuesday is the version Monday's world chose", tagsIn(t.texts), ["[D2A]"]);
  await dev.clickText("See the result");
  C.eq("Tuesday's world chose B (4 to 1)", await dev.text(".st-win"), label(2, "B"));
  await dev.clickText("The week");
  /* the server refuses a vote for a day that is over */
  const late = await world.request("POST", "/vote", { week: 1, day: 2, choice: "A", dev: "ab".repeat(16) }, { country: "DE" });
  C.eq("the server refuses a vote for yesterday", [late.status, late.json.error], [409, "closed"]);
  /* today's chapter is the version Tuesday's result chose: B */
  await dev.click(".st-next .btn.solid");
  const w = await dev.readThrough();
  C.eq("Wednesday is the world's version", tagsIn(w.texts), ["[D3B]"]);
  C.eq("and ends on the vote", w.stop, "vote");
  await dev.vote("A");
  await dev.closeCard();
  const st = await dev.store();
  C.eq("only Wednesday's vote is kept", Object.keys(st.weeks[1].days).filter((d) => st.weeks[1].days[d].vote), ["3"]);
  C.eq("the world's path is kept for reading offline", st.weeks[1].cache.path, ["A", "B"]);
  /* the next morning: Wednesday's result, then Thursday */
  await dev.sleep();
  await world.setTime(at(3, 9));
  await dev.open();
  C.eq("next morning: the result of Wednesday's vote", await dev.view(), "result");
  C.hasi("its title", await dev.text(), "Wednesday");
  C.ok("no page errors", dev.errors.length === 0, dev.errors);
  await dev.close();

  C.at("join on Sunday");
  const s2 = await fresh(at(6, 12));
  await s2.dev.open(); await s2.dev.start();
  C.eq("the week on Sunday", await s2.dev.view(), "hub");
  C.has("it says the ending", await s2.dev.text(".st-next"), "The ending");
  // the world's path is empty (nobody voted at all): all results are A, and the ending is AA
  await s2.dev.click(".st-next .btn.solid");
  const e = await s2.dev.readThrough();
  C.eq("the ending of a week nobody voted in is AA", tagsIn(e.texts), ["[END-AA]"]);
  C.ok("no 'as you chose it' for a player who never voted", !(await s2.dev.has(".st-chainbtn")));
  await s2.dev.click(".st-weekbtn");
  C.eq("the week card", await s2.dev.view(), "weekcard");
  C.has("says no votes", await s2.dev.text(".st-sum"), "You did not vote this week.");
  C.has("the world's results are there even so", await s2.dev.text(".st-row[data-day='3']"), "World: " + label(3, "A"));
  await s2.dev.close();
}

/* ======================================================================================================
   midnight: with the page open on the vote, and with the page open after voting
   ====================================================================================================== */
async function scenarioMidnight() {
  C.at("midnight with the page open on the vote");
  const { world, dev } = await fresh(at(0, 23, 59) + 30000);
  await world.bulk(1, 1, 3, 1, "DE");
  await dev.open(); await dev.start();
  await dev.click(".st-next .btn.solid");
  await dev.readThrough();
  await dev.click(".st-vopt[data-choice='B']");
  C.has("30 seconds before midnight: 1 min left", await dev.text(".st-lock"), "1 min left");
  await world.setTime(at(1, 0, 0) + 5000);
  C.has("the vote step closes by itself", await dev.text(), "Voting for this chapter has closed.");
  C.ok("there is no Vote button any more", !(await dev.has(".st-go")));
  await dev.clickText("See the result");
  C.eq("then the result (the day was closed by the first look, no cron ran)", await dev.view(), "result");
  C.eq("A won, 3 to 1", await dev.text(".st-win"), label(1, "A"));
  C.has("nobody said they voted", (await dev.text(".st-leg")).toLowerCase().includes("you") ? "tagged" : "clean", "clean");
  C.has("chapter 2 is ready", await dev.text(".st-ready"), "Chapter 2 is ready");
  await dev.close();

  C.at("the vote is refused when the page does not know it is midnight yet");
  const b = await fresh(at(0, 23, 59) + 30000);
  await b.dev.open(); await b.dev.start();
  await b.dev.click(".st-next .btn.solid");
  await b.dev.readThrough();
  await b.dev.click(".st-vopt[data-choice='A']");
  b.world.ms = at(1, 0, 0) + 2000;                                  // the server's clock moves, the page's does not tick
  await b.dev.click(".st-go");
  await b.dev.page.waitForFunction(() => /has closed/.test(document.getElementById("stage").innerText), null, { timeout: 5000 });
  C.has("the server's 'closed' is shown as 'Voting for this chapter has closed.'", await b.dev.text(), "Voting for this chapter has closed.");
  C.eq("and no vote was counted", (await b.world.state(1)).days[0].a + (await b.world.state(1)).days[0].b, 0);
  await b.dev.close();

  C.at("midnight after voting, page open on the week (lazy close)");
  const c = await fresh(at(0, 23, 59) + 20000, { name: "me", country: "DE" });
  await c.world.bulk(1, 1, 1, 3, "DE");
  await c.dev.open(); await c.dev.start();
  await c.dev.click(".st-next .btn.solid");
  await c.dev.readThrough();
  await c.dev.vote("A");
  await c.dev.closeCard();
  await c.dev.click(".st-done .btn.ghost:last-child");
  C.has("the week says you voted", await c.dev.text(".st-next"), "You voted.");
  await c.world.setTime(at(1, 0, 0) + 3000);
  await c.dev.waitView("result");
  C.eq("the result is on the screen by itself", await c.dev.text(".st-win"), label(1, "B"));
  C.has("2 of 5 chose A: 40%", await c.dev.text(".st-li.a"), "Open it. 40%");
  C.has("you voted A and lost: the glimpse", await c.dev.text(".st-glimpse"), "You slide a knife");
  C.ok("after the result the week shows chapter 2 as ready", (await c.dev.text(".st-ready")).includes("Chapter 2"));
  await c.dev.close();

  C.at("midnight after voting, page open on the week (the cron ran first)");
  const d = await fresh(at(0, 23, 59) + 20000, { name: "me", country: "DE" });
  await d.world.bulk(1, 1, 1, 3, "DE");
  await d.dev.open(); await d.dev.start();
  await d.dev.click(".st-next .btn.solid");
  await d.dev.readThrough();
  await d.dev.vote("B");
  await d.dev.closeCard();
  d.world.ms = at(1, 0, 0) + 1000;                                   // midnight comes; the cron runs before the page's clock ticks
  await d.world.cron();
  await d.world.catchUp();
  await d.dev.waitView("result");
  C.eq("B won with this player's vote (4 to 1)", await d.dev.text(".st-win"), label(1, "B"));
  C.has("80%", await d.dev.text(".st-li.b"), "Don't open it. 80%");
  C.ok("a player who won sees no glimpse", !(await d.dev.has(".st-glimpse")));
  const row = (await d.world.state(1)).days[0];
  C.eq("the cron's counts are exact (1+0 A, 3+1 B)", [row.a, row.b], [1, 4]);
  await d.dev.close();

  C.at("midnight: the week page at the end of Monday for a player who did not vote");
  const e = await fresh(at(0, 23, 59) + 40000);
  await e.dev.open(); await e.dev.start();
  await e.world.setTime(at(1, 0, 0) + 2000);
  await e.dev.page.waitForFunction(() => /Chapter 2/.test(document.getElementById("stage").innerText), null, { timeout: 5000 });
  C.has("the hub moves on to chapter 2 by itself", await e.dev.text(".st-next"), "Chapter 2 · Tuesday");
  C.has("and Monday can now be read as the world's story", await e.dev.page.locator(".st-pill[data-day='1']").getAttribute("class"), "st-closed");
  await e.dev.close();
}

/* ======================================================================================================
   clock: a phone whose clock is wrong; before the launch; the launch while the page is open
   ====================================================================================================== */
async function scenarioClock() {
  C.at("a phone whose clock is wrong");
  for (const [off, name] of [[10 * 3600e3, "10 h ahead"], [-30 * 3600e3, "30 h behind"], [8 * DAY, "8 days ahead"], [-3 * DAY, "3 days behind, before the launch by its clock"]]) {
    const { world, dev } = await fresh(at(0, 15), { name: "me", country: "DE", offset: off });
    await dev.open(); await dev.start();
    C.eq("[" + name + "] still the true week", await dev.view(), "hub");
    const t = await dev.text();
    C.has("[" + name + "] week 1, chapter 1", t, "Chapter 1 · Monday");
    C.has("[" + name + "] 9 h left, by the server's clock", t, "9 h left");
    await dev.click(".st-next .btn.solid");
    await dev.readThrough();
    await dev.vote("A");
    const st = await world.state(1);
    C.eq("[" + name + "] the vote counted for the true day", [st.days.length, st.today.a], [0, 1]);
    await dev.close();
  }

  C.at("before the launch");
  const { world, dev } = await fresh(at(-3, 12), { name: "me", country: "DE" });
  await dev.open();
  C.eq("the countdown page", await dev.view(), "before");
  const t = await dev.text();
  C.has("title", t, "The first story starts on Monday.");
  C.has("the start in the player's own clock (Monday, 04:00 in Baku)", t, "04:00");
  C.has("how long", t, "In 2 days 12 h");
  C.not("it does not push the player into the story", t, "Start");
  await world.setTime(at(0, 0, 0) + 3000);
  await dev.waitView("intro");
  C.eq("at the launch the page opens by itself, on the first screen", await dev.view(), "intro");
  await dev.start();
  C.has("then Monday", await dev.text(), "Chapter 1 · Monday");
  C.ok("no page errors", dev.errors.length === 0, dev.errors);
  await dev.close();
}

/* ======================================================================================================
   offline: no network at all, the main address down, the server back again
   ====================================================================================================== */
async function scenarioOffline() {
  C.at("no network, Monday");
  const a = await fresh(at(0, 10), { name: "me", country: "DE" });
  a.dev.down["*"] = true;
  await a.dev.open(); await a.dev.start();
  C.eq("Monday needs nothing from the server: the week shows", await a.dev.view(), "hub");
  await a.dev.click(".st-next .btn.solid");
  await a.dev.readThrough();
  await a.dev.click(".st-vopt[data-choice='A']");
  await a.dev.click(".st-go");
  await a.dev.page.waitForFunction(() => /Could not send your vote/.test(document.getElementById("stage").innerText), null, { timeout: 8000 });
  C.has("the vote says it could not be sent", await a.dev.text(), "Could not send your vote. Try again.");
  C.ok("and can be tried again", await a.dev.page.locator(".st-go").isEnabled());
  C.eq("nothing is kept as voted", Object.values((await a.dev.store()).weeks[1].days).filter((x) => x.vote).length, 0);
  a.dev.down = {};
  await a.dev.click(".st-go");
  await a.dev.waitView("voted");
  C.has("the second try works", await a.dev.text(), "Your vote is in.");
  C.eq("the server has the vote", (await a.world.state(1)).today.a, 1);
  await a.dev.close();

  C.at("no network, Wednesday, nothing kept");
  const b = await fresh(at(0, 10), { name: "me", country: "DE" }, async (w) => {
    await w.bulk(1, 1, 2, 0, "DE");
    await w.setTime(at(1, 10)); await w.bulk(1, 2, 2, 0, "DE");
    await w.setTime(at(2, 10));
  });
  b.dev.down["*"] = true;
  await b.dev.open(); await b.dev.start();
  C.has("the problem screen", await b.dev.text(), "Can’t reach the world right now.");
  b.dev.down = {};
  await b.dev.clickText("Try again");
  await b.dev.waitView("hub");
  C.eq("then the week", await b.dev.view(), "hub");
  C.has("Wednesday", await b.dev.text(".st-next"), "Chapter 3 · Wednesday");

  C.at("no network, Wednesday, after one visit: the kept results are enough to read");
  await b.dev.sleep();
  b.dev.down["*"] = true;
  await b.dev.open();
  C.eq("the week shows from what the browser kept", await b.dev.view(), "hub");
  await b.dev.page.locator(".st-pill[data-day='2']").click();
  const t = await b.dev.readThrough();
  C.eq("Tuesday is the version the kept result gives", tagsIn(t.texts), ["[D2A]"]);
  await b.dev.clickText("See the result");
  C.eq("and its result comes from what was kept", await b.dev.view(), "result");
  C.eq("A", await b.dev.text(".st-win"), label(2, "A"));
  await b.dev.close();

  C.at("the main address does not answer: the old address does");
  const c = await fresh(at(0, 10), { name: "me", country: "DE" });
  c.dev.down["story.logicers.com"] = true;
  await c.dev.open(); await c.dev.start();
  C.eq("the page works", await c.dev.view(), "hub");
  await c.dev.click(".st-next .btn.solid");
  await c.dev.readThrough();
  await c.dev.vote("B");
  C.ok("the requests went to the workers.dev address", c.world.log.some((l) => /workers\.dev$/.test(l[4] || "") && l[0] === "POST" && l[2] === 200));
  C.eq("the vote is in the server", (await c.world.state(1)).today.b, 1);
  await c.dev.close();
}

/* ======================================================================================================
   one vote per device; reading again; resuming; the small choices stay
   ====================================================================================================== */
async function scenarioDevice() {
  C.at("one vote per device");
  const { world, dev } = await fresh(at(0, 10));
  await dev.open(); await dev.start();
  await dev.click(".st-next .btn.solid");
  await dev.readThrough();
  await dev.vote("A");
  await dev.closeCard();
  const id = (await dev.store()).id;
  /* the same browser ID on a second browser, which has not voted: it votes B */
  const dev2 = await new Device(world, env.browser, env.base, { name: "second", country: "DE", ip: "3.3.3.3" }).init();
  await dev2.open();
  await dev2.page.evaluate((i) => localStorage.setItem("story:v1", JSON.stringify({ v: 1, id: i, intro: true, weeks: {}, taps: [] })), id);
  await dev2.open();
  await dev2.click(".st-next .btn.solid");
  await dev2.readThrough();
  await dev2.vote("B");
  C.has("the second try is told what the first vote was", await dev2.text(".st-done .st-p"), label(1, "A"));
  C.eq("and the browser keeps the first vote", (await dev2.store()).weeks[1].days[1].vote, "A");
  const st = await world.state(1);
  C.eq("one vote counted", [st.today.a, st.today.b, st.today.voters], [1, 0, 1]);
  await dev2.close();

  C.at("reading again after the vote");
  await dev.click(".st-done .btn.ghost:first-child");                 // Read again
  const r = await dev.readThrough();
  C.eq("the whole chapter is there", r.texts.length, 9);
  C.eq("no small choices and no vote the second time", [r.lines.length, await dev.has(".st-vopt")], [0, false]);
  C.has("it ends with the vote already in", await dev.text(), "You have voted. The result comes at 04:00");

  C.at("closing the page in the middle of a chapter");
  const f = await fresh(at(0, 10), { name: "me", country: "DE" });
  await f.dev.open(); await f.dev.start();
  await f.dev.click(".st-next .btn.solid");
  const first = await f.dev.text(".st-text");
  C.has("starts at the first screen", first, "The island has 212 people");
  await f.dev.click(".st-cont");                                      // screen 2
  await f.dev.click(".st-cont");                                      // the first small choice
  C.ok("a small choice needs a tap before the story goes on", !(await f.dev.has(".st-cont")));
  await f.dev.click(".st-opt[data-pick='1']");
  C.has("its line shows after the tap", await f.dev.text(".st-line"), "He runs again");
  await f.dev.click(".st-cont");                                      // screen 3
  await f.dev.sleep();
  await f.dev.open();
  C.has("the week offers to continue", await f.dev.text(".st-next"), "Continue chapter 1");
  await f.dev.click(".st-next .btn.solid");
  C.has("and puts the player back where they were", await f.dev.text(".st-text"), "Aurel’s house is at the end of the harbour".replace("’", "'"));
  const prog = await f.dev.page.locator(".st-prog i").getAttribute("style");
  C.ok("the progress bar is not at the start", !/width:\s*0%/.test(prog), prog);
  await f.dev.click(".st-back");
  C.eq("Back shows the small choice", await f.dev.has(".st-opts:not(.vote)"), true);
  C.has("the choice that was made is kept and shown", await f.dev.text(".st-line"), "He runs again");
  C.eq("the other option is greyed out", await f.dev.page.locator(".st-opt.off").count(), 1);
  C.eq("the made choice is marked", await f.dev.page.locator(".st-opt.on").getAttribute("data-pick"), "1");
  C.ok("no errors", f.dev.errors.length === 0, f.dev.errors);
  await f.dev.close();
}

/* ======================================================================================================
   last week's story, from the week after
   ====================================================================================================== */
async function scenarioLastWeek() {
  C.at("last week's story");
  const { world, dev } = await fresh(at(0, 9));
  for (let d = 1; d <= 6; d++) {
    await world.setTime(at(d - 1, 12));
    await world.bulk(1, d, d % 2 ? 4 : 1, d % 2 ? 1 : 4, "DE");
  }
  await world.setTime(at(7, 10));                                     // week 2, Monday
  await dev.open(); await dev.start();
  C.hasi("week 2", await dev.text(), "Week 2");
  await dev.clickText("Last week’s story");
  await dev.waitView("hub");
  const t = await dev.text();
  C.hasi("week 1 again", t, "Week 1");
  C.has("it says that week is over", t, "That week is over.");
  C.ok("every day can be read", (await dev.page.locator(".st-pill:not([disabled])").count()) === 7);
  await dev.page.locator(".st-pill[data-day='6']").click();
  const r = await dev.readThrough();
  // the path: d1 A, d2 B, d3 A, d4 B, d5 A -> Saturday is the version day 5's result gives (A)
  C.eq("Saturday of last week is the world's version", tagsIn(r.texts), ["[D6A]"]);
  await dev.clickText("See the result");
  C.eq("Saturday's result", await dev.text(".st-win"), label(6, "B"));
  C.ok("no 'chapter is ready' for last week", !(await dev.has(".st-ready")));
  await dev.clickText("Back");
  await dev.waitView("hub");
  await dev.click(".st-next .btn.solid");                             // My week
  await dev.waitView("weekcard");
  C.has("the week card", await dev.text(), "You did not vote this week.");
  C.ok("no page errors", dev.errors.length === 0, dev.errors);
  await dev.close();
}

/* ======================================================================================================
   what the page shows on a phone, in the dark, and nothing the chapter files could do to the page
   ====================================================================================================== */
async function scenarioLook() {
  C.at("a phone in the dark");
  const { world, dev } = await fresh(at(0, 12), { name: "me", country: "DE", viewport: { width: 390, height: 844 }, dark: true }, async (w) => {
    await w.bulk(1, 1, 2, 1, "DE");
    await w.setTime(at(1, 9));
  });
  const noOverflow = async (what) => C.ok(what + ": no sideways scrolling", await dev.page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
  await dev.open(); await noOverflow("intro");
  await dev.shot("dark-intro");
  await dev.start(); await noOverflow("hub");
  await dev.shot("dark-hub");
  await dev.click(".st-next .btn.solid");
  const body = await dev.page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  C.ok("dark mode paints a dark page", /^rgb\((\d+), (\d+), (\d+)\)$/.test(body) && body.match(/\d+/g).slice(0, 3).every((n) => Number(n) < 80), body);
  await noOverflow("reading");
  await dev.shot("dark-read");
  await dev.readThrough();
  await noOverflow("vote");
  await dev.click(".st-vopt[data-choice='B']");
  await dev.shot("dark-vote");
  await dev.click(".st-go"); await dev.waitView("voted");
  await noOverflow("voted"); await dev.shot("dark-voted");
  await dev.closeCard();
  await dev.close();
  C.ok("no page errors", dev.errors.length === 0, dev.errors);
}

async function scenarioSafe() {
  C.at("chapter text cannot run code");
  const bad = JSON.parse(JSON.stringify(fx));
  const evil = 'Hello <img src=x onerror="window.__xss=1"> <script>window.__xss=2</script> *fine* **bold** <b>tag</b><br>next line';
  bad.days[0].versions[""].screens[0] = evil;
  bad.days[0].versions[""].small[0].options[0].text = evil;
  bad.days[0].versions[""].vote.A.label = evil;
  const tmp = path.join(HERE, "fixtures", "_evil.json");
  fs.writeFileSync(tmp, JSON.stringify(bad));
  const pw = loadPlaywright();
  const srv = await startServer(SITE, tmp, env.extra);
  const world = new World(at(0, 9));
  const dev = await new Device(world, env.browser, "http://127.0.0.1:" + srv.port, { name: "me", country: "DE" }).init();
  try {
    await dev.open(); await dev.start();
    await dev.click(".st-next .btn.solid");
    C.has("the text shows as text", await dev.text(".st-text"), "<img src=x");
    C.has("italic and bold still work", await dev.page.locator(".st-text").innerHTML(), "<em>fine</em>");
    C.eq("nothing ran", await dev.page.evaluate(() => window.__xss === undefined), true);
    C.eq("no injected image or script in the page", await dev.page.locator(".st-text img, .st-text script, .st-text b").count(), 0);
  } finally { await dev.close(); srv.server.close(); fs.unlinkSync(tmp); }
}


/* ======================================================================================================
   real: the real week files (Chat B's): every version, whole text, small lines, vote words, all four endings
   ====================================================================================================== */
const plain = (t) => String(t).replace(/<br\s*\/?>/gi, "\n").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/\s+/g, " ").trim();
const norm = (t) => String(t).replace(/\s+/g, " ").trim();

/* a world that has lived through week w up to the morning of `day`, its days decided by P (a letter per day) */
async function worldAt(w, P, day) {
  const base = 7 * (w - 1);
  const world = new World(at(base, 9));
  for (let d = 1; d < day; d++) {
    await world.setTime(at(base + d - 1, 12));
    if (d <= 6) await world.bulk(w, d, P[d - 1] === "A" ? 3 : 1, P[d - 1] === "A" ? 1 : 3, "DE");
  }
  await world.setTime(at(base + day - 1, 9));
  return world;
}

async function scenarioReal() {
  const have = [2, 3, 4].filter((n) => fs.existsSync(realFile(n)));
  if (!have.length) { console.log("no real week files found in " + REAL + ": skipped"); return; }
  for (const w of have) {
    const F = JSON.parse(fs.readFileSync(realFile(w), "utf8"));
    const kv = F.keyVotes;
    const ver = (d, key) => F.days.find((x) => x.day === d).versions[key];
    C.at("real week " + w + " \"" + F.title + "\" (key votes " + kv.join(" and ") + ")");
    const base = 7 * (w - 1);
    /* two paths between them put every Tuesday-to-Saturday version on screen; four endings are tried one by one below */
    for (const P of ["ABABAB", "BABABA"]) {
      const world = new World(at(base, 9));
      const dev = await new Device(world, env.browser, env.baseReal, { name: "me", country: "DE" }).init();
      for (let d = 1; d <= 6; d++) {
        await world.setTime(at(base + d - 1, 9));
        await dev.open();
        if ((await dev.view()) === "intro") await dev.start();
        C.eq("w" + w + " " + P + " d" + d + ": the week", await dev.view(), "hub");
        await dev.click(".st-next .btn.solid");
        const key = d === 1 ? "" : P[d - 2];
        const ch = ver(d, key);
        const res = await dev.readThrough((n) => 0);
        C.eq("w" + w + " " + P + " d" + d + ": all " + ch.screens.length + " screens of version '" + key + "', word for word", res.texts.map(norm), ch.screens.map(plain));
        C.eq("w" + w + " " + P + " d" + d + ": the small lines of the first options", res.lines.map(norm), ch.small.map((s) => plain(s.options[0].line)));
        C.eq("w" + w + " " + P + " d" + d + ": ended on the vote", res.stop, "vote");
        C.eq("w" + w + " " + P + " d" + d + ": the question", norm(await dev.text(".st-vq")), plain(ch.vote.question));
        for (const c of ["A", "B"]) {
          const t = norm(await dev.text(".st-vopt[data-choice='" + c + "']"));
          C.ok("w" + w + " " + P + " d" + d + ": option " + c + " words", t.includes(plain(ch.vote[c].label)) && t.includes(plain(ch.vote[c].reason)), t);
        }
        if (d === 3 && P === "ABABAB") await dev.shot("real-w" + w + "-vote");
        await world.bulk(w, d, P[d - 1] === "A" ? 3 : 1, P[d - 1] === "A" ? 1 : 3, "DE");
        await dev.sleep();
        await world.setTime(at(base + d, 0, 0));
      }
      await world.setTime(at(base + 6, 9));
      await dev.open();
      const end = (P[kv[0] - 1] + P[kv[1] - 1]);
      await dev.click(".st-next .btn.solid");
      const e = await dev.readThrough((n) => 0);
      const ce = ver(7, end);
      C.eq("w" + w + " " + P + " d7: the ending '" + end + "', word for word", e.texts.map(norm), ce.screens.map(plain));
      C.eq("w" + w + " " + P + " d7: the small choices on Sunday (" + (ce.small || []).length + " in the file) are asked", e.lines.length, (ce.small || []).length);
      C.has("w" + w + " " + P + " d7: the end", await dev.text(), "The end.");
      C.ok("w" + w + " " + P + ": no page errors", dev.errors.length === 0, dev.errors);
      await dev.close();
    }
    /* the other two endings, for a reader who comes on Sunday */
    for (const [a, b] of [["A", "A"], ["B", "B"]]) {
      const P = "ABABAB".split("");
      P[kv[0] - 1] = a; P[kv[1] - 1] = b;
      const world = await worldAt(w, P.join(""), 7);
      const dev = await new Device(world, env.browser, env.baseReal, { name: "me", country: "DE" }).init();
      await dev.open(); await dev.start();
      await dev.click(".st-next .btn.solid");
      const e = await dev.readThrough((n) => 1);
      const ce = ver(7, a + b);
      C.eq("w" + w + " Sunday joiner: ending '" + a + b + "', word for word", e.texts.map(norm), ce.screens.map(plain));
      C.eq("w" + w + " Sunday joiner: the Sunday small lines of the second options", e.lines.map(norm), (ce.small || []).map((s) => plain(s.options[1].line)));
      await dev.close();
    }
  }
}

/* ======================================================================================================
   home: the tile on the home page, in every state
   ====================================================================================================== */
async function scenarioHome() {
  C.at("the home page tile");
  const homeFile = process.env.HOME_PAGE || path.join(SITE, "index.html");
  const hasHome = fs.existsSync(homeFile) && fs.readFileSync(homeFile, "utf8").includes('id="tile-story"');
  if (!hasHome) { C.ok("the home page has the story row", false, homeFile + " has no #tile-story"); return; }
  async function homeAt(ms, store, o) {
    const world = new World(ms);
    const dev = await new Device(world, env.browser, env.base, Object.assign({ name: "me", country: "DE" }, o || {})).init();
    await dev.page.goto(env.base + "/__blank");
    await dev.page.evaluate((s) => { localStorage.setItem("lg.findout.lang", "en"); if (s) localStorage.setItem("story:v1", JSON.stringify(s)); else localStorage.removeItem("story:v1"); }, store || null).catch(() => {});
    await dev.page.goto(env.base + "/", { waitUntil: "load" });
    await dev.page.waitForTimeout(200);
    return { world, dev };
  }
  const row = (dev) => dev.page.locator("#story-row");
  /* the home page reloads itself when the day changes on the player's own clock (Baku: 20:00 UTC); wait for that to finish */
  const calm = async (dev) => { await dev.page.waitForLoadState("load"); await dev.page.waitForTimeout(250); await dev.page.waitForLoadState("load"); };
  const shown = async (dev) => !(await row(dev).evaluate((n) => n.hidden));
  const line = (dev) => dev.page.locator("#tile-story .pitch").innerText();
  const id = "ab".repeat(16);
  const store = (days, week) => ({ v: 1, id, intro: true, taps: [], weeks: { [week || 1]: { days, cache: { path: [], days: {} } } } });

  let h = await homeAt(at(-3, 12));
  C.eq("before the launch the row is hidden", await shown(h.dev), false);
  C.ok("and takes no room", (await row(h.dev).boundingBox()) === null);
  await h.dev.close();

  h = await homeAt(at(0, 9));
  C.eq("launch day: the row shows", await shown(h.dev), true);
  C.eq("its title is the week's story", await h.dev.page.locator("#tile-story h3").innerText(), "The Ferry Comes Sunday");
  C.eq("the line", await line(h.dev), "Chapter 1 of 7 · the world is deciding · 15 h left");
  C.eq("the row's heading", await h.dev.page.locator("#story-title").innerText(), "This week's story");
  C.ok("it opens story/", /\/story\/$/.test(await h.dev.page.locator("#tile-story").evaluate((a) => a.href)));
  C.eq("a play button, not a check", [await h.dev.page.locator("#tile-story .go").isVisible(), await h.dev.page.locator("#tile-story .result").isVisible()], [true, false]);
  C.ok("it sits under the word games and above Pass the phone", await h.dev.page.evaluate(() => {
    const y = (id) => document.getElementById(id).getBoundingClientRect().top;
    return y("words-title") < y("story-title") && y("story-title") < y("group-title");
  }));
  C.eq("the story is in neither of the site's game lists (so not in the streak or the x-of-y count)", await h.dev.page.evaluate(() => [].concat(window.TurnsOut.GAMES, window.TurnsOut.WORDS).some((g) => /story/i.test(g.id + g.key + g.href))), false);
  await h.dev.shot("home-tile-light");
  /* live: the hour changes on the 30 s beat */
  await h.world.setTime(at(0, 9, 59));
  await calm(h.dev);
  C.eq("14 h at 09:59", await line(h.dev), "Chapter 1 of 7 · the world is deciding · 14 h left");
  await h.world.setTime(at(0, 10, 3));
  await calm(h.dev);
  C.eq("13 h at 10:03, by itself", await line(h.dev), "Chapter 1 of 7 · the world is deciding · 13 h left");
  await h.world.setTime(at(0, 23, 30));
  await calm(h.dev);
  C.eq("minutes in the last hour", await line(h.dev), "Chapter 1 of 7 · the world is deciding · 30 min left");
  await h.world.setTime(at(1, 0, 2));
  await calm(h.dev);
  C.eq("after midnight it is chapter 2, by itself", await line(h.dev), "Chapter 2 of 7 · the world is deciding · 23 h left");
  /* the tile is a link into the story */
  await h.dev.click("#tile-story");
  await h.dev.page.waitForURL(/\/story\/$/);
  C.ok("a tap goes to the story page", true);
  await h.dev.settle();
  C.eq("which opens on its first screen", await h.dev.view(), "intro");
  C.ok("no page errors", h.dev.errors.length === 0, h.dev.errors);
  await h.dev.close();

  h = await homeAt(at(2, 22, 30), store({ 3: { vote: "A" } }));
  C.eq("voted today: the line", await line(h.dev), "You voted · result in 1 h");
  C.eq("a check instead of the play button", [await h.dev.page.locator("#tile-story .go").isVisible(), await h.dev.page.locator("#tile-story .result").isVisible(), await h.dev.page.locator("#tile-story .again").evaluate((n) => n.hidden)], [false, true, false]);   // (the site's CSS hides "again" on a small screen)
  C.eq("the tile is marked done like the daily games", await h.dev.page.locator("#tile-story").evaluate((n) => n.classList.contains("done")), true);
  await h.dev.shot("home-tile-voted");
  await h.dev.close();

  h = await homeAt(at(3, 9), store({ 3: { vote: "A" } }));
  C.eq("the morning after a vote, the result is in", await line(h.dev), "Result is in · read chapter 4");
  C.eq("and the play button is back", await h.dev.page.locator("#tile-story .go").isVisible(), true);
  await h.dev.close();

  h = await homeAt(at(3, 9), store({ 3: { vote: "A", seen: true } }));
  C.eq("once the result has been seen, it is today's chapter again", await line(h.dev), "Chapter 4 of 7 · the world is deciding · 15 h left");
  await h.dev.close();

  h = await homeAt(at(3, 9), store({ 1: { vote: "B", seen: true }, 3: { vote: "A" } }));
  C.eq("an older vote whose result was seen does not count; a newer one does", await line(h.dev), "Result is in · read chapter 4");
  await h.dev.close();

  h = await homeAt(at(6, 9), store({ 6: { vote: "A" } }));
  C.eq("Sunday after a Saturday vote: the result first", await line(h.dev), "Result is in · read chapter 7");
  await h.dev.close();
  h = await homeAt(at(6, 9), store({ 6: { vote: "A", seen: true } }));
  C.eq("Sunday: the ending", await line(h.dev), "Chapter 7 of 7 · the ending · 15 h left");
  await h.dev.close();
  h = await homeAt(at(6, 9), store({ 6: { vote: "A", seen: true }, 7: { read: true, card: true } }));
  C.eq("Sunday, the week card seen: the week is done", await line(h.dev), "Your week is done · next story on Monday");
  C.eq("with the check", await h.dev.page.locator("#tile-story .result").isVisible(), true);
  await h.dev.close();
  h = await homeAt(at(27, 9), store({ 7: { read: true, card: true } }, 4));
  C.eq("the last Sunday, week done", await line(h.dev), "Your week is done · more stories soon");
  await h.dev.close();

  h = await homeAt(at(7, 9), store({ 6: { vote: "A" } }, 1));
  C.eq("week 2 Monday: last week's votes are not this week's", await line(h.dev), "Chapter 1 of 7 · the world is deciding · 15 h left");
  C.eq("and the title is week 2's", await h.dev.page.locator("#tile-story h3").innerText(), "Rain Until Sunday");
  await h.dev.close();

  h = await homeAt(at(28, 9));
  C.eq("after the last week the row is hidden", await shown(h.dev), false);
  await h.dev.close();

  /* a broken or foreign store does not break the home page */
  h = await homeAt(at(1, 9));
  await h.dev.page.evaluate(() => localStorage.setItem("story:v1", "{not json"));
  await h.dev.page.reload({ waitUntil: "load" });
  C.eq("a store that cannot be read: still the plain line", await line(h.dev), "Chapter 2 of 7 · the world is deciding · 15 h left");
  C.ok("no errors", h.dev.errors.length === 0, h.dev.errors);
  await h.dev.close();

  /* English only: on a home in another language the row stays hidden */
  h = await homeAt(at(0, 9));
  const stays = await h.dev.page.evaluate(async () => {
    const sec = document.getElementById("story-row"); sec.hidden = true;
    window.LG.lang = "fr";
    const src = await (await fetch("/story/tile.js")).text();
    new Function(src)();
    return sec.hidden;
  });
  C.eq("another language's home keeps the row hidden", stays, true);
  await h.dev.close();

  /* looks: a phone, light and dark, and a wide window */
  for (const [name, o] of [["phone-light", { viewport: { width: 390, height: 844 } }], ["phone-dark", { viewport: { width: 390, height: 844 }, dark: true }], ["narrow", { viewport: { width: 320, height: 700 } }], ["wide", { viewport: { width: 1200, height: 900 } }]]) {
    h = await homeAt(at(2, 9), store({ 2: { vote: "B" } }), o);
    await h.dev.page.locator("#story-row").scrollIntoViewIfNeeded();
    C.eq("[" + name + "] no sideways scrolling", await h.dev.page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
    const box = await h.dev.page.locator("#tile-story").boundingBox();
    C.ok("[" + name + "] the tile fits the screen", box && box.x >= 0 && box.x + box.width <= (o.viewport.width + 1), box);
    await h.dev.page.locator("#story-row").screenshot({ path: path.join(HERE, "shots", "home-row-" + name + ".png") });
    await h.dev.close();
  }
}

/* ======================================================================================================
   card: the end card, the "?" chip and the keyboard
   ====================================================================================================== */
async function scenarioCard() {
  C.at("the end card, with Tell Khayyam on as on the live site");
  const { world, dev } = await fresh(at(0, 10), { name: "me", country: "DE", feedback: true });
  await dev.open(); await dev.start();
  await dev.click(".st-next .btn.solid");
  await dev.readThrough();
  await dev.vote("A");
  const cells = await dev.page.locator("#fin .eod-strip .eod-cell").count();
  C.eq("one cell in the strip: Tell Khayyam, and not the World table's word side", cells, 1);
  C.eq("it is a button (Tell Khayyam), not the World table's link", await dev.page.locator("#fin .eod-strip .eod-cell").first().evaluate((n) => n.tagName), "BUTTON");
  C.ok("the next game is a link out of the story folder", /\/(altitude|[a-z-]+)\/$/.test(await dev.page.locator("#fin a.fin-next").evaluate((a) => a.pathname)), await dev.page.locator("#fin a.fin-next").evaluate((a) => a.pathname));
  C.eq("All games goes home", await dev.page.locator("#fin a.fin-all").evaluate((a) => new URL(a.href).pathname), "/");
  await dev.page.keyboard.press("Escape");
  C.eq("Escape closes the card", await dev.has("#fin"), false);
  C.ok("no errors", dev.errors.length === 0, dev.errors);
  await dev.close();

  C.at("the ? chip and the keyboard");
  const b = await fresh(at(0, 10), { name: "me", country: "DE" });
  await b.dev.open(); await b.dev.start();
  C.eq("the week", await b.dev.view(), "hub");
  await b.dev.click("#help-btn");
  C.eq("the ? chip shows the first screen again", await b.dev.view(), "intro");
  C.eq("with Back instead of Start", await b.dev.text(".st-actions .btn"), "Back");
  await b.dev.click(".st-actions .btn");
  await b.dev.waitView("hub");
  await b.dev.click(".st-next .btn.solid");
  const first = await b.dev.text(".st-text");
  await b.dev.page.keyboard.press("ArrowRight");
  C.ok("the right arrow goes on", (await b.dev.text(".st-text")) !== first);
  await b.dev.page.keyboard.press("ArrowLeft");
  C.eq("the left arrow goes back", await b.dev.text(".st-text"), first);
  await b.dev.page.keyboard.press("Enter");
  C.ok("Enter goes on", (await b.dev.text(".st-text")) !== first);
  /* tapping the page itself goes on too */
  const t2 = await b.dev.text(".st-text");
  await b.dev.page.locator(".st-page").click({ position: { x: 30, y: 30 } });
  C.ok("a tap on the page goes on", (await b.dev.text(".st-text").catch(() => "")) !== t2);
  await b.dev.close();
}

/* ======================================================================================================
   counts: "N read · M voted · K countries" on the week page, after a vote, on a result and on Sunday;
   small choices made offline wait in the phone and arrive later; the three places that hold the launch date agree
   ====================================================================================================== */
async function scenarioCounts() {
  C.at("counts: the numbers, and what the phone sends");
  const cfg = fs.readFileSync(path.join(HERE, "..", "config.js"), "utf8");
  const wr = fs.readFileSync(WRANGLER_FILE, "utf8");
  C.eq("wrangler.jsonc and config.js say the same launch day", (wr.match(/"LAUNCH":\s*"([^"]+)"/) || [])[1], LAUNCH);
  C.eq("wrangler.jsonc and config.js say the same number of weeks", (wr.match(/"WEEKS":\s*"([^"]+)"/) || [])[1], String((cfg.match(/weeks:\s*(\d+)/) || [])[1]));
  C.eq("the launch day is Monday 9 November 2026", LAUNCH, "2026-11-09");
  C.eq("and a Monday", new Date(LAUNCH + "T00:00:00Z").getUTCDay(), 1);

  /* day 1: two people who only read (IT, ES), three voters (two from DE, one from FR) */
  const dv = (i) => String(i).padStart(2, "0").repeat(16);
  const { world, dev } = await fresh(at(0, 8), { name: "me", country: "DE" }, async (wd) => {
    await wd.request("POST", "/read", { week: 1, day: 1, dev: dv(1) }, { country: "IT", ip: "7.7.7.1" });
    await wd.request("POST", "/read", { week: 1, day: 1, dev: dv(2) }, { country: "ES", ip: "7.7.7.2" });
    await wd.bulk(1, 1, 2, 0, "DE");
    await wd.bulk(1, 1, 0, 1, "FR");
  });
  await dev.open();
  C.eq("a new player meets the intro first", await dev.view(), "intro");
  await dev.start();
  C.eq("then the week", await dev.view(), "hub");
  C.has("the week page shows who has read and voted so far", await dev.waitHas(".st-counts", "5 read"), "5 read · 3 voted · 2 countries");
  await dev.click(".st-next .btn.solid");
  const before = world.log.filter((l) => l[1] === "/read").length;
  const res = await dev.readThrough((n) => n % 2);
  C.eq("the chapter was read to the vote", res.stop, "vote");
  await dev.page.waitForTimeout(150);
  C.eq("reaching the vote told the server once that this chapter was read", world.log.filter((l) => l[0] === "POST" && l[1] === "/read" && l[2] === 200).length - before, 1);
  C.eq("the server now has 6 readers for the day", (await world.rows("SELECT COUNT(*) AS c FROM reads WHERE week = 1 AND day = 1"))[0].c, 6);
  C.eq("and still 3 votes", (await world.rows("SELECT COUNT(*) AS c FROM votes WHERE week = 1 AND day = 1"))[0].c, 3);
  await dev.vote("A");
  C.has("after the vote the screen counts it: 6 read, 4 voted", await dev.waitHas(".st-done .st-counts", "6 read · 4 voted"), "6 read · 4 voted · 2 countries");
  C.eq("a vote does not make a second read", (await world.rows("SELECT COUNT(*) AS c FROM reads WHERE dev = ?", (await dev.store()).id))[0].c, 1);
  C.eq("and the read was not sent again after the vote", world.log.filter((l) => l[0] === "POST" && l[1] === "/read" && l[2] === 200).length - before, 1);
  await dev.closeCard();
  await dev.click(".st-done .btn.ghost:last-child");
  await dev.waitView("hub");
  C.has("the week page says the same", await dev.waitHas(".st-counts", "6 read · 4 voted"), "6 read · 4 voted · 2 countries");
  await dev.shot("hub-counts");

  /* the next morning: yesterday's result comes with the final numbers */
  await dev.sleep();
  await world.setTime(at(1, 9));
  await dev.open();
  C.eq("next day: the result comes first", await dev.view(), "result");
  C.has("and shows the final read, voted and country numbers", await dev.text(".st-vc"), "6 read · 4 voted · 2 countries");
  const st1 = await world.state(1);
  C.eq("the server fixed them the same", [st1.days[0].readers, st1.days[0].voters, st1.days[0].countries], [6, 4, 2]);
  await dev.click(".st-res .btn.ghost");               // The week
  await dev.waitView("hub");
  C.eq("day 2 starts from zero (nobody has read yet)", (await world.state(1)).today.readers, 0);
  C.has("and the page says so", await dev.waitHas(".st-counts", "0 read") , "0 read");
  await dev.close();

  /* Sunday: only readers */
  C.at("counts: Sunday has readers only");
  {
    const { world: w2, dev: d2 } = await fresh(at(6, 9), { name: "sun", country: "DE" }, async (wd) => {
      await wd.request("POST", "/read", { week: 1, day: 7, dev: dv(11) }, { country: "IT", ip: "7.7.7.11" });
      await wd.request("POST", "/read", { week: 1, day: 7, dev: dv(12) }, { country: "ES", ip: "7.7.7.12" });
    });
    await d2.open(); await d2.start();
    C.eq("Sunday opens on the week", await d2.view(), "hub");
    const t0 = await d2.waitHas(".st-counts", "2 read");
    C.has("Sunday shows how many have read, and from how many countries", t0, "2 read · 2 countries");
    C.not("and no votes (there is none)", t0, "voted");
    await d2.click(".st-next .btn.solid");
    const r = await d2.readThrough();
    C.ok("the ending is reached", r.stop !== "vote");
    await d2.page.waitForTimeout(150);
    C.eq("the server counted the reader of the ending", (await w2.rows("SELECT COUNT(*) AS c FROM reads WHERE week = 1 AND day = 7"))[0].c, 3);
    await d2.click(".st-weekbtn");
    await d2.waitView("weekcard");
    await d2.closeCard();
    await d2.click(".st-weekcard .btn.ghost:last-child");
    await d2.waitView("hub");
    C.has("back on the week page the reader is counted: 3 read, 3 countries", await d2.waitHas(".st-counts", "3 read"), "3 read · 3 countries");
    await d2.close();
  }

  /* small choices made while the phone cannot reach the server wait, and go when it can */
  C.at("counts: small choices made offline");
  {
    const { world: w3, dev: d3 } = await fresh(at(0, 9), { name: "off", country: "FR" });
    await d3.open(); await d3.start();
    await d3.click(".st-next .btn.solid");
    d3.down["*"] = true;
    const r = await d3.readThrough((n) => (n + 1) % 2);
    C.eq("the chapter can be read and the choices made offline", [r.stop, r.lines.length], ["vote", 2]);
    let st = await d3.store();
    C.eq("both small choices are kept in the phone and marked not sent", st.taps.filter((t) => t.k === "s").map((t) => !!t.sent), [false, false]);
    C.eq("the server has none yet", (await w3.rows("SELECT COUNT(*) AS c FROM smalls"))[0].c, 0);
    C.eq("and no read", (await w3.rows("SELECT COUNT(*) AS c FROM reads"))[0].c, 0);
    d3.down = {};
    await d3.open();                                   // the player comes back online and opens the page
    await d3.page.waitForFunction(() => JSON.parse(localStorage.getItem("story:v1")).taps.filter((t) => t.k === "s").every((t) => t.sent === true), null, { timeout: 5000 });
    st = await d3.store();
    C.eq("they arrived, once each", (await w3.rows("SELECT n, pick FROM smalls ORDER BY n")).map((r) => [r.n, r.pick]), st.taps.filter((t) => t.k === "s").map((t) => [t.n, t.pick]));
    C.eq("both are marked as sent", st.taps.filter((t) => t.k === "s").map((t) => t.sent), [true, true]);
    await d3.open();
    await d3.page.waitForTimeout(150);
    C.eq("and are not sent again on the next visit", w3.log.filter((l) => l[0] === "POST" && l[1] === "/small" && l[2] === 200).length, 2);
    await d3.close();
  }
  C.at("counts: ended");
}

const SCENARIOS = { counts: scenarioCounts, card: scenarioCard, home: scenarioHome, real: scenarioReal, weeks: scenarioWeeks, join: scenarioJoin, midnight: scenarioMidnight, clock: scenarioClock, offline: scenarioOffline, device: scenarioDevice, lastweek: scenarioLastWeek, look: scenarioLook, safe: scenarioSafe };

async function main() {
  const pw = loadPlaywright();
  const extra = {};
  if (OVERRIDE) for (const f of ["assets/js/turnsout.js", "assets/js/lang.js", "assets/lang/tell.js", "assets/lang/en.js", "assets/css/logicers.css"]) {
    if (fs.existsSync(path.join(OVERRIDE, f))) extra["/" + f] = path.join(OVERRIDE, f);
  }
  if (process.env.HOME_PAGE) extra["/"] = process.env.HOME_PAGE;           // the edited home page, when it is not yet in SITE
  const a = await startServer(SITE, FIXTURE, extra);
  const b = await startServer(SITE, (n) => (n >= 2 && fs.existsSync(realFile(n)) ? realFile(n) : FIXTURE), extra);
  const browser = await pw.chromium.launch({ executablePath: CHROME, args: ["--no-sandbox"] });
  env = { browser, base: "http://127.0.0.1:" + a.port, baseReal: "http://127.0.0.1:" + b.port, extra };
  const want = process.argv.slice(2);
  const names = want.length ? want : Object.keys(SCENARIOS);
  for (const n of names) {
    if (!SCENARIOS[n]) { console.log("no such scenario: " + n); continue; }
    try { await SCENARIOS[n](); } catch (e) { C.ok("scenario " + n + " ran to the end", false, String(e && e.stack || e).split("\n").slice(0, 4).join(" / ")); }
  }
  await browser.close();
  a.server.close(); b.server.close();
  process.exit(C.done() ? 0 : 1);
}
main();
