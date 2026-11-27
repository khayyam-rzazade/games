/* Play Logicers — addresses and the automatic checks (Chat A, 19 Nov 2026). Plan 2.11, 2.12, 2.16.
     linkOk(s)        a link a person may send: https://, a real host (no IP literal, no localhost, .local, .internal ...),
                      no user or password, no port of its own, at most 500 characters -> URL | null
     norm(url)        the address as the duplicate rule compares it: host in lower case without "www.", no tracking
                      parameters, no trailing slash, no #fragment, no scheme  ("example.com/es/juego?n=1")
     site(host)       the registrable domain ("juegos.example.co.uk" -> "example.co.uk"; "anna.github.io" stays whole)
     addCheck(...)    the look at a sent game, run after the answer (ctx.waitUntil): GET, 8 s for the whole walk, at most
                      5 redirects followed by hand (each hop must pass linkOk); what it saw goes on the game's card
     linkCheck(url, lang, opts)  the nightly look at a listed game: status, whether it ended on another site, its blocklist
                      words (in the game's language, F1); opts.gate paces it by host (F2)
     hostKey(host)    the host as the nightly look paces it: lower case, no "www." (as games.host keeps it)
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

/* ---- what the page is: words that mark gambling, adult pages and loans (flags only: they never refuse) ----
   The blocklist knows the language (chat F1, 27 Nov 2026). Three things changed, none of them widens the list:
   1. A word that is a different everyday word in the game's language is not a hit there: Swedish "sex" is six, and the
      Swedish pages of Ordlig and Dagens ord say "sex försök" (six tries). The exceptions are all in EVERYDAY below, one
      place, per language, each with what the word means there and the dictionary it comes from. Only an exact word
      (or, for Romanian, one verb's forms) is let through: "sexy", "betting", "bet365", "casino", "porno", "xxx" still hit
      in every language, and the English words still hit on an English page. No language given: no exception.
   2. The words that mean the thing itself are never let through in any language (Dutch "wetten" is laws, but German
      "wetten" is to bet and stays a hit on a German page; Polish "zakłady", French "roulette", Turkish "bahis" and the
      like carry the gambling sense in their own language, so they stay too).
   3. A word is whole by Unicode, not by ASCII: JS "\b" knows only a-z, so "bet" hit inside Portuguese "betão" (concrete)
      and Spanish "betún", and Russian "ставк" hit inside "доставка" (delivery), "выставка" (exhibition) and "порно"
      inside "опорно-двигательный". A letter, mark or digit of any script next to a word now keeps it from being one. The
      scripts written with no spaces (Japanese, Chinese, Korean) and the Cyrillic stems with their endings are as before. */
const LET = "\\p{L}\\p{M}\\p{N}_";
const BLOCK_WORDS = new RegExp("(?<![" + LET + "])(?:casinos?|kasino|kasyno|casino[" + LET + "]*|bet(?:s|ting|way|365)?|bahis[" + LET + "]*|iddaa|apuestas?|apostas?|scommesse|paris sportifs|wetten|zakłady|poker|slots?|jackpot|roulette|blackjack|porn[" + LET + "]*|xxx|adult|sex|sexy|nsfw|escort[" + LET + "]*|hentai|onlyfans|loans?|payday|crypto ?casino|viagra|cialis)(?![" + LET + "])"
  + "|casinò|(?<![" + LET + "])(?:казино|ставк|порно|кредит)|カジノ|ギャンブル|アダルト|賭博|카지노|도박|성인|토토|博彩|赌|色情", "iu");
const BLOCK_HOST = /(^|[.-])(casino\w*|kasino\w*|bet\d*|betting\w*|bahis\w*|iddaa\w*|poker\w*|slots?\w*|porn\w*|xxx\w*|sex\w*|adult\w*|escort\w*|loans?\w*|payday\w*|1xbet|1win|toto\w*)([.-]|$)/i;

/* The everyday exceptions, by the game's language (the codes of src/langs.js). Each entry: words (exact, lower case) or
   re (a pattern for one verb's forms), what it means there, the dictionary page it was read on (27 Nov 2026). A hit is
   dropped only when the whole word (a host: the whole label) is one of these. Never a word that is that language's own
   word for the gambling or adult thing; a word the same as English's ("adult" in Catalan and Romanian, "casino" in
   Italian) is not a different word, so it is not here. Checked against every word of BLOCK_WORDS and BLOCK_HOST in the
   51 languages. Looked at and left as hits, because the word still carries the gambling or adult sense there or is the
   same word as English's: Polish "zakłady" (also factories, but "zakłady bukmacherskie" is betting), French "roulette"
   (also castor wheels) and "escorte" (convoy; in Quebec also the adult word), Turkish "bahis" (also a subject, but
   mostly a bet), Italian "casino" (also a mess; the gambling sites write "casino" too), German "Kasino", Catalan and
   Romanian "adult", Korean "성인" (adult; also saint) and "토토" (also in Totoro), Chinese "赌" (also in 赌气). */
export const EVERYDAY = {
  sv: [
    { words: ["sex"], text: true, means: "six (the numeral: \"sex försök\" = six tries). The same spelling is also Swedish for sex, so it is let through in page text only, never as a host name, and only the bare word; \"sexy\", \"sexfilm\" and the rest still hit",
      src: "Folkets lexikon (KTH), https://folkets-lexikon.csc.kth.se/folkets/service?lang=sv&interface=en&word=sex" },
    { words: ["bet"], means: "bit (past tense of bita, to bite)", src: "Folkets lexikon, https://folkets-lexikon.csc.kth.se/folkets/service?lang=sv&interface=en&word=bet" },
    { words: ["bets"], means: "stain (a dye for wood)", src: "Folkets lexikon, https://folkets-lexikon.csc.kth.se/folkets/service?lang=sv&interface=en&word=bets" },
    { words: ["slott", "slottet"], means: "castle, palace; the castle (a host label \"slott\" or \"slottet\" begins with \"slot\")", src: "Folkets lexikon, https://folkets-lexikon.csc.kth.se/folkets/service?lang=sv&interface=en&word=slott" },
  ],
  da: [
    { words: ["slot", "slotte", "slottet"], means: "castle, palace (slot; plural slotte; definite slottet)",
      src: "Lex (Danmarks Nationalleksikon), https://lex.dk/slot; Wiktionary, Danish \"slot\"" },
  ],
  nl: [
    { words: ["wetten"], means: "laws (plural of wet); the Dutch for a bet is \"weddenschap\"", src: "Van Dale via woorden.org, https://www.woorden.org/woord/wet" },
    { words: ["slot"], means: "lock; castle; end", src: "woorden.org, https://www.woorden.org/woord/slot" },
  ],
  lv: [
    { words: ["bet"], means: "but (the conjunction)", src: "Tēzaurs.lv, https://tezaurs.lv/bet" },
  ],
  lt: [
    { words: ["bet"], means: "but, however (the conjunction)", src: "Lietuvių kalbos žodynas, https://www.lietuviuzodynas.lt/zodynas/bet" },
  ],
  ro: [
    { re: /^porn[ie]/, means: "porni, to start or set off, in every form (pornește, pornesc, pornit, pornire, pornind, pornea ...); porno and pornografie are not these forms",
      src: "DEX online, https://dexonline.ro/definitie/porni" },
  ],
};
const EVERYDAY_INDEX = {};
for (const [l, list] of Object.entries(EVERYDAY)) {
  const both = list.filter((x) => !x.text), textOnly = list.filter((x) => x.text);
  EVERYDAY_INDEX[l] = {
    words: new Set(both.flatMap((x) => x.words || [])), res: both.flatMap((x) => (x.re ? [x.re] : [])),
    textWords: new Set(textOnly.flatMap((x) => x.words || [])),
  };
}
/* is this exact word (lower case) an everyday exception in this language? host: it is a host label (an entry marked
   text: true is for page text only) */
export function everyday(lang, word, host) {
  const e = EVERYDAY_INDEX[lang];
  if (!e) return false;
  return e.words.has(word) || e.res.some((r) => r.test(word)) || (!host && e.textWords.has(word));
}

const allOf = (re) => new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
const BLOCK_WORDS_G = allOf(BLOCK_WORDS), BLOCK_HOST_G = allOf(BLOCK_HOST);
/* the blocklist words in a text, or in the hosts, lower case, once each, after the language's exceptions */
function textHits(text, lang) {
  const out = new Set();
  for (const m of String(text || "").matchAll(BLOCK_WORDS_G)) { const w = m[0].toLowerCase().trim(); if (w && !everyday(lang, w)) out.add(w); }
  return out;
}
function hostHits(hosts, lang) {
  const out = new Set();
  for (const h of [].concat(hosts)) for (const m of String(h || "").matchAll(BLOCK_HOST_G)) { const w = m[2].toLowerCase(); if (!everyday(lang, w, true)) out.add(w); }
  return out;
}
export function blockFlags(hosts, title, desc, lang) {
  const out = [];
  if (hostHits(hosts, lang).size) out.push("blocklist_host");
  if (textHits(String(title || "") + " " + String(desc || ""), lang).size) out.push("blocklist_words");
  return out;
}
/* a maker's own words (a name, a line) against the same blocklist, in the game's language: true when they hit it (chat J, 20
   Nov 2026; the language, chat F1). A maker's name goes on every game of the maker, so lang may be a list of languages:
   it hits when it hits in any of them. */
export function blockText(s, lang) {
  const t = String(s || "");
  const ls = Array.isArray(lang) ? (lang.length ? lang : [undefined]) : [lang];
  return ls.some((l) => textHits(t, l).size > 0);
}

/* the claim (chat J, 20 Nov 2026, plan 2.20): the contents of every <meta name="logicers-portal" content="..."> in a page,
   whatever the order of the attributes and the quotes */
export function claimMetas(html) {
  const out = [];
  for (const m of String(html || "").match(/<meta\b[^>]*>/gi) || []) {
    if (!/\bname\s*=\s*["']?logicers-portal["'\s/>]/i.test(m)) continue;
    const c = pick(/\bcontent\s*=\s*"([^"]*)"/i, m) ?? pick(/\bcontent\s*=\s*'([^']*)'/i, m) ?? pick(/\bcontent\s*=\s*([^\s"'>]+)/i, m);
    if (c) out.push(c.trim());
  }
  return out;
}
/* the look at a game's own page for its claim line, with the fetch rules of 2.11 (https, a real host at every hop, 8 s, at
   most 5 redirects, the first 512 KB) -> { state: ok | moved | noopen, metas, status } */
export async function claimLook(url) {
  const at = linkOk(url);
  if (!at) return { state: "noopen", metas: [], status: 0 };
  const w = await walk(at);
  let other = false;
  try { other = site(new URL(w.final).hostname) !== site(at.hostname); } catch (x) { other = true; }
  if (other) { try { w.res && w.res.body && w.res.body.cancel(); } catch (x) { /* gone */ } return { state: "moved", metas: [], status: w.status, final: w.final }; }
  if (!w.res || w.status < 200 || w.status >= 300) { try { w.res && w.res.body && w.res.body.cancel(); } catch (x) { /* gone */ } return { state: "noopen", metas: [], status: w.status }; }
  return { state: "ok", metas: claimMetas(await firstText(w.res, w.signal)), status: w.status };
}

/* the blocklist words themselves, lower case, sorted, once each (chat H, 20 Nov 2026): what the nightly look compares
   with the last look (games.block), so only a NEW word hides a listed game, and a word a person has seen and let stand
   (an innocent "bet" in a title) does not hide it again. In the game's language (chat F1, 27 Nov 2026): a word that is an
   everyday word there is not a hit. */
export function blockHits(hosts, title, desc, lang) {
  const out = new Set([...hostHits(hosts, lang), ...textHits(String(title || "") + " " + String(desc || ""), lang)]);
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

/* the host as the nightly look keeps its pace per host and games.host stores it: lower case, no "www." */
export const hostKey = (h) => String(h || "").toLowerCase().replace(/^www\./, "");

/* GET with redirects followed by hand: every hop must be an https address with a real host (no IP literal, no localhost),
   all within one 8 s budget. -> { status, final, hops, res?, error?, timeout?, dns? }
   opts.gate (the nightly look, chat F2, 27 Nov 2026): { enter(host) -> release(status) | null }. Every request waits for its
   host's turn first (one request at a time to one host, a pause after each; cron.js Gate), and the 8 s do not run while it
   waits. null = the host is stopped for the night: { held: true }, nothing fetched. With a response the answer carries
   release(): the caller calls it when it is done with the body (it gives the host its turn back and says what the host
   answered). Without a gate: as before (one 8 s signal for the whole walk). */
export async function walk(url, opts) {
  opts = opts || {};
  const gate = opts.gate || null;
  let left = opts.timeout || TIMEOUT, started = 0, timer = null;
  let signal, arm = () => {}, pause = () => {};
  if (gate) {
    const ctl = new AbortController();
    signal = ctl.signal;
    arm = () => {
      started = Date.now();
      timer = setTimeout(() => ctl.abort(new DOMException("The operation timed out", "TimeoutError")), Math.max(1, left));
      if (timer && timer.unref) timer.unref();
    };
    pause = () => { if (timer) { clearTimeout(timer); timer = null; left -= Date.now() - started; } };
  } else signal = AbortSignal.timeout(left);
  let rel = null;
  const done = (status) => { pause(); if (rel) { const r = rel; rel = null; r(status); } };
  let at = url instanceof URL ? url : linkOk(String(url));
  if (!at) return { status: 0, final: String(url), hops: 0, error: "link" };
  for (let hop = 0; ; hop++) {
    if (gate) {
      rel = await gate.enter(hostKey(at.hostname));
      if (!rel) return { status: 0, final: at.href, hops: hop, error: "held", held: true };
      arm();
    }
    let res;
    try {
      res = await fetch(at.href, { method: "GET", redirect: "manual", signal,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; PlayLogicers/1.0; +https://play.logicers.com/about/)",
          "Accept": "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5", "Accept-Language": opts.lang || "en" } });
    } catch (e) {
      done(0);
      const msg = String(e && (e.name + " " + e.message + " " + (e.cause && e.cause.code)) || e);
      const timeout = /timeout|abort/i.test(msg);
      return { status: 0, final: at.href, hops: hop, error: timeout ? "timeout" : "fetch", timeout,
        dns: !timeout && /dns|resolve|ENOTFOUND|EAI_AGAIN|getaddrinfo|name.?not.?resolved|no such host/i.test(msg) };
    }
    if (res.status >= 300 && res.status < 400 && res.headers.get("Location")) {
      try { res.body && res.body.cancel(); } catch (x) { /* gone */ }
      done(res.status);
      if (hop >= (opts.hops ?? HOPS)) return { status: res.status, final: at.href, hops: hop, error: "redirects" };
      let next;
      try { next = new URL(res.headers.get("Location"), at.href); } catch (x) { return { status: res.status, final: at.href, hops: hop, error: "location" }; }
      const ok = linkOk(next.href);
      if (!ok) return { status: res.status, final: next.href, hops: hop + 1, error: "unsafe_redirect" };
      at = ok;
      continue;
    }
    return { status: res.status, final: at.href, hops: hop, res, signal, release: gate ? () => done(res.status) : undefined };
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
  for (const f of blockFlags([at.hostname, finalHost], out.title, out.desc, lang)) out.flags.push(f);
  out.block_words = blockHits([at.hostname, finalHost], out.title, out.desc, lang);
  return out;
}

/* the nightly look at a listed game (2.12) -> { state, final?, status, words? }
     ok     it opened on its own site; words: the blocklist words in its title, description and host (chat H, 20 Nov
            2026: the look reads the page's head, the first 128 KB, and cron.js hides a game whose words are new)
     moved  it ended on another site (hidden at once and queued)
     gone   404, 410 or the name does not resolve (dead after three nights in a row)
     check  403, 429, 5xx, a timeout or anything else (queued "check by hand", never hidden) */
export const HEAD_READ = 128 * 1024;
/* lang: the game's language (F1). opts.gate: see walk. A look the gate held back (its host stopped for the night) is { state: "held" }: nothing was asked. */
export async function linkCheck(url, lang, opts) {
  const at = linkOk(url);
  if (!at) return { state: "gone", status: 0, final: url };
  const w = await walk(at, opts);
  if (w.held) return { state: "held", status: 0, final: w.final };
  try {
    let other = false;
    try { other = site(new URL(w.final).hostname) !== site(at.hostname); } catch (e) { other = true; }
    const ok = !other && w.res && w.status >= 200 && w.status < 300;
    let words = [];
    if (ok && /html|xml|text\/plain/i.test(w.res.headers.get("Content-Type") || "text/html")) {
      const h = readHead(await firstText(w.res, w.signal, HEAD_READ));
      words = blockHits([at.hostname, new URL(w.final).hostname], h.title, h.desc, lang);
    } else if (w.res) { try { w.res.body && w.res.body.cancel(); } catch (x) { /* gone */ } }
    if (other) return { state: "moved", status: w.status, final: w.final };       // another site, an IP literal, localhost
    if (w.dns || w.status === 404 || w.status === 410 || w.status === 530) return { state: "gone", status: w.status, final: w.final };
    if (ok) return { state: "ok", status: w.status, final: w.final, words };
    return { state: "check", status: w.status, final: w.final, error: w.error || null };
  } finally { if (w.release) w.release(); }
}
