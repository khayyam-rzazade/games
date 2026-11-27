#!/usr/bin/env node
/* How many listed games on Play Logicers may be shown inside another site (27 Nov 2026, for "Play here").

   It reads the live list (play.logicers.com/api/langs, then /api/<lang>/dice for each open language), opens each game's
   address once, as a browser would, and reads what the site tells browsers about frames:
     Content-Security-Policy frame-ancestors (it wins when present), else X-Frame-Options.
   yes      nothing forbids it
   no       the site forbids it (DENY, SAMEORIGIN, or frame-ancestors without play.logicers.com)
   unknown  the page did not open (an error, 403, 429, a timeout): asked again on a later run
   Also noted: "bust" when the page's own script seems to leave a frame by itself (Play's frame can stop that).
   Logicers' own games are left out. Nothing is written to the site; one look per address, one at a time per site,
   1 s apart, 8 sites at a time, 12 s each.

   Run, on the Mac:   cd ~/games/server/portal && node scripts/frames.mjs
   It prints the numbers and keeps the details in notes/frames-<day>.json for the build chat. */
import fs from "node:fs";
import { pathToFileURL } from "node:url";

const BASE = process.env.PLAY_BASE || "https://play.logicers.com";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15";
const PARALLEL = 8, GAP_MS = 1000, TIMEOUT_MS = 12000, READ_BYTES = 300000;
const OURS = /(^|\.)logicers\.com$/i;

const getJson = async (path) => (await fetch(BASE + path, { headers: { "User-Agent": UA } })).json();
const host = (u) => { try { return new URL(u).hostname.toLowerCase(); } catch { return ""; } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* the rule browsers follow: frame-ancestors (if the page sends one) decides, else X-Frame-Options */
export function verdict(headers) {
  const csp = String(headers.get("content-security-policy") || "");
  const fa = csp.split(/[;,]/).map((d) => d.trim()).filter((d) => /^frame-ancestors\b/i.test(d));
  if (fa.length) {
    const ok = fa.every((d) => {                                 // every policy must allow us
      const src = d.split(/\s+/).slice(1).map((s) => s.toLowerCase());
      return src.some((s) => s === "*" || s === "https:" || /^(https:\/\/)?(\*\.)?logicers\.com$/.test(s) || /^(https:\/\/)?play\.logicers\.com$/.test(s));
    });
    return ok ? { result: "yes", reason: "frame-ancestors allows" } : { result: "no", reason: "frame-ancestors" };
  }
  const xfo = String(headers.get("x-frame-options") || "").toLowerCase();
  if (/deny|sameorigin|allow-from/.test(xfo)) return { result: "no", reason: "x-frame-options " + xfo.trim() };
  return { result: "yes", reason: "" };
}

const BUST = /top\.location\s*(?:=|\.href\s*=|\.replace)|window\.top\s*!==?\s*window\.self|self\s*!==?\s*top|top\s*!==?\s*self|parent\.frames\.length\s*>\s*0/;

async function look(url) {
  try {
    const r = await fetch(url, { redirect: "follow", headers: { "User-Agent": UA, "Accept": "text/html,*/*" }, signal: AbortSignal.timeout(TIMEOUT_MS) });
    const final = r.url || url;
    if (!r.ok) return { result: "unknown", status: r.status, final, reason: "status " + r.status };
    const v = verdict(r.headers);
    let bust = false;
    try {
      const reader = r.body.getReader(); let got = 0, text = "";
      while (got < READ_BYTES) { const { done, value } = await reader.read(); if (done) break; got += value.length; text += Buffer.from(value).toString("utf8"); }
      reader.cancel().catch(() => {});
      bust = BUST.test(text);
    } catch { /* the headers are what counts */ }
    return { ...v, status: r.status, final, moved: host(final) !== host(url), bust };
  } catch (e) {
    return { result: "unknown", status: 0, final: url, reason: e.name === "TimeoutError" ? "timeout" : "no answer" };
  }
}

async function main() {
  const langs = (await getJson("/api/langs")).langs.map((l) => l.code);
  const entries = [];                                          // one per listed game, per language
  for (const lang of langs) {
    const d = await getJson(`/api/${lang}/dice`);
    for (const [id, url] of d.games || []) if (!OURS.test(host(url))) entries.push({ lang, id, url });
  }
  const urls = [...new Set(entries.map((e) => e.url))];
  const byHost = new Map();
  for (const u of urls) { const h = host(u); if (!byHost.has(h)) byHost.set(h, []); byHost.get(h).push(u); }
  const queue = [...byHost.entries()].sort((a, b) => b[1].length - a[1].length);   // the biggest sites start first
  const seen = new Map(); let done = 0;
  const t0 = Date.now();
  process.stdout.write(`${entries.length} listed games (${urls.length} addresses on ${byHost.size} sites) in ${langs.length} languages. Looking`);
  const worker = async () => {
    while (queue.length) {
      const [, list] = queue.shift();
      for (const u of list) {
        seen.set(u, await look(u));
        if (++done % 50 === 0) process.stdout.write(".");
        if (list.length > 1) await sleep(GAP_MS);                // one site, one request at a time, 1 s apart
      }
    }
  };
  await Promise.all(Array.from({ length: PARALLEL }, worker));
  console.log(` done in ${Math.round((Date.now() - t0) / 1000)} s.\n`);

  const rows = entries.map((e) => ({ ...e, ...seen.get(e.url) }));
  const count = (rs) => ({ all: rs.length, yes: rs.filter((r) => r.result === "yes").length, no: rs.filter((r) => r.result === "no").length,
    unknown: rs.filter((r) => r.result === "unknown").length, bust: rs.filter((r) => r.result === "yes" && r.bust).length });
  const total = count(rows), pct = (n, d) => (d ? Math.round((100 * n) / d) : 0) + "%";
  console.log(`Can play here: ${total.yes} of ${total.all} (${pct(total.yes, total.all)}). Forbidden: ${total.no} (${pct(total.no, total.all)}). Did not open: ${total.unknown}.`);
  console.log(`Of the ${total.yes}, ${total.bust} have a script that may try to leave a frame (Play's frame can stop it).\n`);
  console.log("By language (can / all):");
  const per = langs.map((l) => [l, count(rows.filter((r) => r.lang === l))]);
  console.log(per.map(([l, c]) => `${l} ${c.yes}/${c.all}`).join("  ") + "\n");
  const tally = (rs) => { const m = new Map(); for (const r of rs) { const h = host(r.url); m.set(h, (m.get(h) || 0) + 1); } return [...m.entries()].sort((a, b) => b[1] - a[1]); };
  console.log("Sites that forbid it, most games first:");
  console.log(tally(rows.filter((r) => r.result === "no")).slice(0, 20).map(([h, n]) => `  ${h} ${n}`).join("\n") || "  none");
  console.log("Sites that did not open:");
  console.log(tally(rows.filter((r) => r.result === "unknown")).slice(0, 10).map(([h, n]) => `  ${h} ${n}`).join("\n") || "  none");
  const out = new URL(`../notes/frames-${new Date().toISOString().slice(0, 10)}.json`, import.meta.url);
  fs.writeFileSync(out, JSON.stringify({ when: new Date().toISOString(), base: BASE, total, byLang: Object.fromEntries(per), games: rows }, null, 1));
  console.log(`\nDetails: ${out.pathname}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main().catch((e) => { console.error("Stopped:", e.message); process.exit(1); });
