/* Play Logicers — addresses and the automatic checks (Chat A, 19 Nov 2026). Plan 2.11, 2.12, 2.16.
     linkOk(s)        a link a person may send: https://, a real host (no IP literal, no localhost, .local, .internal ...),
                      no user or password, no port of its own, at most 500 characters -> URL | null
     norm(url)        the address as the duplicate rule compares it: host in lower case without "www.", no tracking
                      parameters, no trailing slash, no #fragment, no scheme  ("example.com/es/juego?n=1")
     site(host)       the registrable domain ("juegos.example.co.uk" -> "example.co.uk"; "anna.github.io" stays whole)
     addCheck(...)    the look at a sent game, run after the answer (ctx.waitUntil): GET, 8 s for the whole walk, at most
                      5 redirects followed by hand (each hop must pass linkOk); what it saw goes on the game's card
     linkCheck(url)   the nightly look at a listed game: status, whether it ended on another site, its blocklist words
   The registrable domain uses a short list of public suffixes (below), not the whole Public Suffix List: two-level country
   suffixes by rule (co.uk, com.br, com.tr, ne.jp ...) and the hosting platforms where each user has a site of their own. */

export const TIMEOUT = 8000, HOPS = 5, READ = 512 * 1024;
const READ_ALL = READ;

const TRACKING = /^(utm_[a-z0-9_]*|fbclid|gclid|dclid|gbraid|wbraid|msclkid|yclid|twclid|ttclid|li_fat_id|mc_cid|mc_eid|igshid|igsh|si|_ga|_gl|_hsenc|_hsmi|hsctatracking|mkt_tok|oly_anon_id|oly_enc_id|vero_id|s_cid|spm|ref|ref_src|ref_url|referrer|source|share|shared|from)$/i;

/* a host that is a name on the public internet: letters, digits, hyphens, at least one dot, a top level of letters */
const LOCAL_TLD = /\.(local|localhost|internal|intranet|lan|home|corp|private|test|example|invalid|onion|arpa)$/;
export function hostOk(h) {
  if (typeof h !== "string" || !h || h.length > 253) return false;
  if (h === "localhost" || h.endsWith(".localhost") || LOCAL_TLD.test(h)) return false;
  if (/^\[|:/.test(h)) return false;                                   // an IPv6 literal
  if (/^[0-9.]+$/.test(h)) return false;                               // an IPv4 literal (the URL parser has made 0x7f.1 and 2130706433 dotted)
  const labels = h.split(".");
  if (labels.length < 2) return false;
  if (!labels.every((l) => /^(?!-)[a-z0-9-]{1,63}(?<!-)$/.test(l))) return false;
  return /^([a-z]{2,63}|xn--[a-z0-9-]{1,59})$/.test(labels[labels.length - 1]);
}
export function linkOk(s) {
  if (typeof s !== "string") return null;
  s = s.trim();
  if (s.length > 500 || !/^https:\/\//i.test(s)) return null;
  let u;
  try { u = new URL(s); } catch (x) { return null; }
  if (u.protocol !== "https:" || u.username || u.password || u.port) return null;
  if (!hostOk(u.hostname)) return null;
  u.hash = "";
  return u;
}

export function norm(url) {
  const u = url instanceof URL ? new URL(url.href) : new URL(String(url));
  const host = u.hostname.toLowerCase().replace(/^www\./, "");
  const keep = [];
  for (const [k, v] of u.searchParams) if (!TRACKING.test(k)) keep.push([k, v]);
  const q = keep.length ? "?" + new URLSearchParams(keep).toString() : "";
  const path = u.pathname.replace(/\/+$/, "");
  return host + path + q;
}

/* ---- the registrable domain ---- */
const SLD = new Set(["co", "com", "net", "org", "gov", "edu", "ac", "ne", "or", "go", "gob", "nic", "mil", "gen", "biz", "info",
  "ltd", "plc", "sch", "nom", "web", "gv", "ed", "gouv", "nhs", "police", "res", "art", "firm", "ind", "idv", "lg", "gr", "ad"]);
const PRIVATE = ["github.io", "gitlab.io", "codeberg.page", "netlify.app", "vercel.app", "pages.dev", "workers.dev", "web.app",
  "firebaseapp.com", "herokuapp.com", "onrender.com", "fly.dev", "glitch.me", "surge.sh", "neocities.org", "blogspot.com",
  "wordpress.com", "wixsite.com", "weebly.com", "squarespace.com", "carrd.co", "itch.io", "replit.app", "repl.co",
  "azurewebsites.net", "appspot.com", "cloudfront.net", "s3.amazonaws.com", "amplifyapp.com", "deno.dev", "railway.app",
  "up.railway.app", "streamlit.app", "hf.space", "gitbook.io", "notion.site", "framer.app", "webflow.io", "tilda.ws",
  "github.dev", "bitbucket.io", "sourceforge.io", "000webhostapp.com", "ngrok.io", "ngrok-free.app", "translate.goog"];
export function site(host) {
  const h = String(host || "").toLowerCase().replace(/^www\./, "").replace(/\.$/, "");
  const l = h.split(".");
  if (l.length <= 2) return h;
  for (const p of PRIVATE) {
    if (h === p) return h;
    if (h.endsWith("." + p)) { const n = p.split(".").length + 1; return l.slice(-n).join("."); }
  }
  const tld = l[l.length - 1], sld = l[l.length - 2];
  if (tld.length === 2 && SLD.has(sld)) return l.slice(-3).join(".");
  return l.slice(-2).join(".");
}

/* ---- what the page is: words that mark gambling, adult pages and loans (flags only: they never refuse) ---- */
const BLOCK_WORDS = /\b(casinos?|kasino|kasyno|casino\w*|bet(?:s|ting|way|365)?|bahis\w*|iddaa|apuestas?|apostas?|scommesse|paris sportifs|wetten|zakłady|poker|slots?|jackpot|roulette|blackjack|porn\w*|xxx|adult|sex|sexy|nsfw|escort\w*|hentai|onlyfans|loans?|payday|crypto ?casino|viagra|cialis)\b|casinò|казино|ставк|порно|кредит|カジノ|ギャンブル|アダルト|賭博|카지노|도박|성인|토토|博彩|赌|色情/i;
const BLOCK_HOST = /(^|[.-])(casino\w*|kasino\w*|bet\d*|betting\w*|bahis\w*|iddaa\w*|poker\w*|slots?\w*|porn\w*|xxx\w*|sex\w*|adult\w*|escort\w*|loans?\w*|payday\w*|1xbet|1win|toto\w*)([.-]|$)/i;
export function blockFlags(hosts, title, desc) {
  const out = [];
  if ([].concat(hosts).some((h) => BLOCK_HOST.test(String(h || "")))) out.push("blocklist_host");
  if (BLOCK_WORDS.test(String(title || "") + " " + String(desc || ""))) out.push("blocklist_words");
  return out;
}
/* the blocklist words themselves, lower case, sorted, once each (chat H, 20 Nov 2026): what the nightly look compares
   with the last look (games.block), so only a NEW word hides a listed game, and a word a person has seen and let stand
   (an innocent "bet" in a title) does not hide it again */
const allOf = (re) => new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
const BLOCK_WORDS_G = allOf(BLOCK_WORDS), BLOCK_HOST_G = allOf(BLOCK_HOST);
export function blockHits(hosts, title, desc) {
  const out = new Set();
  for (const h of [].concat(hosts)) for (const m of String(h || "").matchAll(BLOCK_HOST_G)) out.add(m[2].toLowerCase());
  for (const m of (String(title || "") + " " + String(desc || "")).matchAll(BLOCK_WORDS_G)) out.add(m[0].toLowerCase().trim());
  return [...out].filter(Boolean).sort();
}
/* words that say "a new one each day" or "N tries", in the launch languages and a few more (a hint for the review) */
const DAILY = /\b(daily|today|today's|every day|each day|tries|guesses|attempts|puzzle ?#|#\d{1,5}|diari[oa]s?|hoy|cada d[ií]a|intentos|di[aá]rio|hoje|todo dia|tentativas|du jour|quotidien(ne)?|chaque jour|aujourd'hui|essais|täglich|heute|versuche|giornalier[oa]|quotidian[oa]|oggi|ogni giorno|tentativi|günlük|bugün|her gün|deneme|tahmin|dzienn[aey]|dzisiaj|codzienn\w*|prób|dagelijks|vandaag|pogingen)\b|ежедневн|сегодня|попыт|今日|毎日|デイリー|回目|오늘|매일|데일리|번째/i;

function pick(re, s) { const m = re.exec(s); return m ? m[1] : null; }
function decodeEntities(s) {
  return String(s).replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp|#39);/gi, (m, e) => {
    const k = e.toLowerCase();
    if (k[0] === "#") { const n = k[1] === "x" ? parseInt(k.slice(2), 16) : parseInt(k.slice(1), 10); try { return String.fromCodePoint(n); } catch (x) { return m; } }
    return { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " }[k] || m;
  });
}
const tidy = (s, n) => (s == null ? null : decodeEntities(s).replace(/\s+/g, " ").trim().slice(0, n) || null);
/* what a page's head says: title, <html lang>, description */
export function readHead(html) {
  const s = String(html || "");
  const title = tidy(pick(/<title\b[^>]*>([\s\S]*?)<\/title>/i, s), 200);
  const htmlTag = pick(/(<html\b[^>]*>)/i, s) || "";
  const lang = pick(/\blang\s*=\s*["']?([A-Za-z]{2,3}(?:[-_][A-Za-z0-9]{2,8})*)/i, htmlTag);
  let desc = null;
  const metas = s.match(/<meta\b[^>]*>/gi) || [];
  for (const m of metas) {
    if (/\b(name|property)\s*=\s*["']?(description|og:description)["'\s>]/i.test(m)) {
      desc = tidy(pick(/\bcontent\s*=\s*"([^"]*)"/i, m) || pick(/\bcontent\s*=\s*'([^']*)'/i, m), 300);
      if (desc) break;
    }
  }
  return { title, lang: lang ? lang.replace("_", "-") : null, desc };
}
/* the primary language of a tag, as our codes write it: "pt-BR" -> "pt", "zh-TW" -> "zh-hant", "zh-CN" -> "zh-hans" */
export function langOfTag(tag) {
  if (!tag) return null;
  const t = tag.toLowerCase();
  if (/^zh-(hant|tw|hk|mo)/.test(t)) return "zh-hant";
  if (/^zh/.test(t)) return "zh-hans";
  if (/^(nb|nn)\b/.test(t)) return "no";
  if (t === "tl" || /^tl-/.test(t)) return "fil";
  return t.split("-")[0];
}
const sameLang = (ours, tag) => {
  const l = langOfTag(tag);
  if (!l) return true;
  if (ours.startsWith("zh")) return l.startsWith("zh");
  return l === ours;
};

/* GET with redirects followed by hand: every hop must be an https address with a real host (no IP literal, no localhost),
   all within one 8 s budget. -> { status, final, hops, res?, error?, timeout?, dns? } */
export async function walk(url, opts) {
  opts = opts || {};
  const signal = AbortSignal.timeout(opts.timeout || TIMEOUT);
  let at = url instanceof URL ? url : linkOk(String(url));
  if (!at) return { status: 0, final: String(url), hops: 0, error: "link" };
  for (let hop = 0; ; hop++) {
    let res;
    try {
      res = await fetch(at.href, { method: "GET", redirect: "manual", signal,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; PlayLogicers/1.0; +https://play.logicers.com/about/)",
          "Accept": "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5", "Accept-Language": opts.lang || "en" } });
    } catch (e) {
      const msg = String(e && (e.name + " " + e.message + " " + (e.cause && e.cause.code)) || e);
      const timeout = /timeout|abort/i.test(msg);
      return { status: 0, final: at.href, hops: hop, error: timeout ? "timeout" : "fetch", timeout,
        dns: !timeout && /dns|resolve|ENOTFOUND|EAI_AGAIN|getaddrinfo|name.?not.?resolved|no such host/i.test(msg) };
    }
    if (res.status >= 300 && res.status < 400 && res.headers.get("Location")) {
      try { res.body && res.body.cancel(); } catch (x) { /* gone */ }
      if (hop >= (opts.hops ?? HOPS)) return { status: res.status, final: at.href, hops: hop, error: "redirects" };
      let next;
      try { next = new URL(res.headers.get("Location"), at.href); } catch (x) { return { status: res.status, final: at.href, hops: hop, error: "location" }; }
      const ok = linkOk(next.href);
      if (!ok) return { status: res.status, final: next.href, hops: hop + 1, error: "unsafe_redirect" };
      at = ok;
      continue;
    }
    return { status: res.status, final: at.href, hops: hop, res, signal };
  }
}

/* the body's first bytes as text (a page's head is near its top) */
async function firstText(res, signal, max) {
  if (!res.body) return "";
  const READ = max || READ_ALL;
  const reader = res.body.getReader(), parts = [];
  let n = 0;
  try {
    while (n < READ) {
      if (signal && signal.aborted) break;
      const { done, value } = await reader.read();
      if (done) break;
      parts.push(value); n += value.byteLength;
    }
  } catch (x) { /* what came is enough */ }
  try { await reader.cancel(); } catch (x) { /* done */ }
  const all = new Uint8Array(Math.min(n, READ));
  let off = 0;
  for (const p of parts) { const take = Math.min(p.byteLength, all.length - off); if (take <= 0) break; all.set(p.subarray(0, take), off); off += take; }
  const cs = pick(/charset=([\w-]+)/i, res.headers.get("Content-Type") || "") || "utf-8";
  try { return new TextDecoder(cs).decode(all); } catch (x) { return new TextDecoder().decode(all); }
}

/* the look at a sent game (2.11). Never refuses: what it saw goes on the card, the flags lead it. */
export async function addCheck(url, lang) {
  const at = linkOk(url);
  const out = { at: null, url, final: url, status: 0, same_site: true, title: null, lang: null, desc: null, daily_hint: false, flags: [] };
  if (!at) { out.flags.push("noopen"); return out; }
  const w = await walk(at, { lang });
  out.final = w.final; out.status = w.status; out.hops = w.hops;
  if (w.error) out.error = w.error;
  try { out.same_site = site(new URL(w.final).hostname) === site(at.hostname); } catch (x) { out.same_site = false; }
  if (!out.same_site) out.flags.push("other_site");
  if (w.error || !w.res || w.status >= 400) out.flags.push("noopen");
  let html = "";
  if (w.res && w.status < 400) {
    const ct = w.res.headers.get("Content-Type") || "";
    if (/html|xml|text\/plain/i.test(ct) || !ct) html = await firstText(w.res, w.signal);
    else { try { w.res.body && w.res.body.cancel(); } catch (x) { /* gone */ } }
  } else if (w.res) { try { w.res.body && w.res.body.cancel(); } catch (x) { /* gone */ } }
  if (html) {
    const h = readHead(html);
    out.title = h.title; out.lang = h.lang; out.desc = h.desc;
    const text = html.replace(/<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").slice(0, 200000);
    out.daily_hint = DAILY.test((h.title || "") + " " + (h.desc || "") + " " + text);
    if (h.lang && !sameLang(lang, h.lang)) out.flags.push("lang_differs");
  }
  let finalHost = "";
  try { finalHost = new URL(out.final).hostname; } catch (x) { /* none */ }
  for (const f of blockFlags([at.hostname, finalHost], out.title, out.desc)) out.flags.push(f);
  out.block_words = blockHits([at.hostname, finalHost], out.title, out.desc);
  return out;
}

/* the nightly look at a listed game (2.12) -> { state, final?, status, words? }
     ok     it opened on its own site; words: the blocklist words in its title, description and host (chat H, 20 Nov
            2026: the look reads the page's head, the first 128 KB, and cron.js hides a game whose words are new)
     moved  it ended on another site (hidden at once and queued)
     gone   404, 410 or the name does not resolve (dead after three nights in a row)
     check  403, 429, 5xx, a timeout or anything else (queued "check by hand", never hidden) */
export const HEAD_READ = 128 * 1024;
export async function linkCheck(url) {
  const at = linkOk(url);
  if (!at) return { state: "gone", status: 0, final: url };
  const w = await walk(at);
  let other = false;
  try { other = site(new URL(w.final).hostname) !== site(at.hostname); } catch (x) { other = true; }
  const ok = !other && w.res && w.status >= 200 && w.status < 300;
  let words = [];
  if (ok && /html|xml|text\/plain/i.test(w.res.headers.get("Content-Type") || "text/html")) {
    const h = readHead(await firstText(w.res, w.signal, HEAD_READ));
    words = blockHits([at.hostname, new URL(w.final).hostname], h.title, h.desc);
  } else if (w.res) { try { w.res.body && w.res.body.cancel(); } catch (x) { /* gone */ } }
  if (other) return { state: "moved", status: w.status, final: w.final };       // another site, an IP literal, localhost
  if (w.dns || w.status === 404 || w.status === 410 || w.status === 530) return { state: "gone", status: w.status, final: w.final };
  if (ok) return { state: "ok", status: w.status, final: w.final, words };
  return { state: "check", status: w.status, final: w.final, error: w.error || null };
}
