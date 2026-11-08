/* Logicers Studio — the six templates: what an item may hold, and how a player's answer is counted (Chat A, 8 Nov 2026).

   An item is one JSON object. The fields below are the ones the server reads; everything else a page sends is kept as
   it is when it is small and flat (a string up to 300 characters, a number, true/false, or a list of up to 10 of those;
   at most 8 such extra fields), so the front end can carry a hint or a source without a change here.

   Every template:   id      the item's own id (8 letters, given by the server when missing; counts follow it, not the order)
                     image   an image id of this game (from /img/put), optional (required for picture)
                     explain up to 300 characters, at most one link, optional
   number   q (1-200), max (> 0, up to 1e9), answer (0..max), unit (up to 20), optional
   line     q, min, max (min < max, both within ±1e9), answer (min..max), unit, kind ("number" | "year" | "date"), optional
            (a date is a number too: the page decides; "date" means days since 1970-01-01)
   pick     q, choices (2-4 texts of 1-100), answer (the index of the right one)
   rank     q, things (3-5 texts of 1-80, in the right order), values (a number per thing, optional), unit
   picture  image (required), q, and either choices + answer (Pick) or max + answer (Number; with min: Line)
   read     text (1-600, paragraphs), q, choices, answer

   How a play is counted (counts: one row per game, item and bucket; nothing per person):
   number, line   the answer must be within min..max (min is 0 for number). When max - min <= 100 the bucket is the
                  answer rounded ("37"); when wider, it is "p" and the place along the line in whole percent ("p42")
   pick, read     the index chosen ("2")
   rank           the order given, as the indexes of `things` ("2013": things[2] put first)
   picture        as pick when the item has choices, else as number (line with min) */
import { cleanText, linksIn } from "./util.js";

export const TEMPLATES = ["number", "line", "pick", "rank", "picture", "read"];
export const MAX_ITEM = 4096;                  // one item's JSON
const ITEM_ID = /^[a-z0-9]{4,12}$/;
const RESERVED_EXTRA = new Set(["json", "image_url", "img_url", "img_id", "right", "url", "src", "html"]);
const KNOWN = new Set(["id", "image", "explain", "q", "max", "min", "answer", "unit", "kind", "choices", "things", "values", "text", "form"]);

const num = (x) => typeof x === "number" && isFinite(x) && Math.abs(x) <= 1e9;
function fail(field) { return { e: field }; }

function texts(list, n1, n2, min, max) {
  if (!Array.isArray(list) || list.length < n1 || list.length > n2) return null;
  const out = [];
  for (const t of list) { const c = cleanText(t, min, max); if (c === null) return null; out.push(c); }
  return out;
}

/* one item, cleaned -> { item, links } or { e: field }. `images` is the set of this game's image ids. */
export function cleanItem(template, raw, images) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return fail("item");
  const it = {};
  if (raw.id !== undefined && raw.id !== null && raw.id !== "") {
    if (typeof raw.id !== "string" || !ITEM_ID.test(raw.id)) return fail("id");
    it.id = raw.id;
  }
  if (raw.image !== undefined && raw.image !== null && raw.image !== "") {
    if (typeof raw.image !== "string" || !images.has(raw.image)) return fail("image");
    it.image = raw.image;
  }
  const links = [];
  if (raw.explain !== undefined && raw.explain !== null && raw.explain !== "") {
    const e = cleanText(raw.explain, 0, 300, true);
    if (e === null) return fail("explain");
    const l = linksIn(e);
    if (l.bad || l.links.length > 1) return fail("explain");
    if (e) it.explain = e;
    links.push(...l.links);
  }
  const q = cleanText(raw.q, 1, 200);
  if (q === null) return fail("q");
  it.q = q;
  if (raw.unit !== undefined && raw.unit !== null && raw.unit !== "") {
    const u = cleanText(raw.unit, 0, 20);
    if (u === null) return fail("unit");
    if (u) it.unit = u;
  }

  let form = template;
  if (template === "picture") {
    if (!it.image) return fail("image");
    /* the page's own "form" decides when it sends one (an editor may leave an empty choices list on a Number picture) */
    form = raw.form === "pick" ? "pick" : raw.form === "number" ? (num(raw.min) ? "line" : "number")
      : Array.isArray(raw.choices) ? "pick" : num(raw.min) ? "line" : "number";
    it.form = form;
  }
  if (template === "read") {
    const t = cleanText(raw.text, 1, 600, true);
    if (t === null) return fail("text");
    const l = linksIn(t);
    if (l.bad || l.links.length > 3) return fail("text");
    it.text = t;
    links.push(...l.links);
    form = "pick";
  }
  if (form === "number") {
    if (!num(raw.max) || raw.max <= 0) return fail("max");
    if (!num(raw.answer) || raw.answer < 0 || raw.answer > raw.max) return fail("answer");
    it.max = raw.max; it.answer = raw.answer;
  } else if (form === "line") {
    if (!num(raw.min)) return fail("min");
    if (!num(raw.max) || raw.max <= raw.min) return fail("max");
    if (!num(raw.answer) || raw.answer < raw.min || raw.answer > raw.max) return fail("answer");
    it.min = raw.min; it.max = raw.max; it.answer = raw.answer;
    if (raw.kind !== undefined && raw.kind !== null) {
      if (!["number", "year", "date"].includes(raw.kind)) return fail("kind");
      it.kind = raw.kind;
    }
  } else if (form === "pick") {
    const c = texts(raw.choices, 2, 4, 1, 100);
    if (!c) return fail("choices");
    if (!Number.isInteger(raw.answer) || raw.answer < 0 || raw.answer >= c.length) return fail("answer");
    it.choices = c; it.answer = raw.answer;
  } else if (form === "rank") {
    const t = texts(raw.things, 3, 5, 1, 80);
    if (!t) return fail("things");
    it.things = t;
    if (raw.values !== undefined && raw.values !== null) {
      if (!Array.isArray(raw.values) || raw.values.length !== t.length || !raw.values.every(num)) return fail("values");
      it.values = raw.values;
    }
  }

  /* the page's own extra fields: small and flat */
  let extra = 0;
  for (const [k, v] of Object.entries(raw)) {
    if (KNOWN.has(k)) continue;
    if (RESERVED_EXTRA.has(k)) return fail("extra");   // F: never a stand-in for the item itself, or a picture that skipped the check
    if (!/^[a-z][a-z0-9_]{0,19}$/i.test(k) || ++extra > 8) return fail("extra");
    const flat = (x) => (typeof x === "string" ? cleanText(x, 0, 300) : num(x) || typeof x === "boolean" ? x : null);
    if (Array.isArray(v)) {
      if (v.length > 10) return fail(k);
      const out = v.map(flat);
      if (out.some((x) => x === null)) return fail(k);
      it[k] = out;
    } else {
      const c = flat(v);
      if (c === null) return fail(k);
      it[k] = c;
    }
    for (const s of [].concat(it[k])) if (typeof s === "string") { const l = linksIn(s); if (l.bad) return fail(k); links.push(...l.links); }
  }
  if (JSON.stringify(it).length > MAX_ITEM) return fail("size");
  return { item: it, links };
}

/* the bucket a player's answer counts in, or null when it is not an answer to this item */
export function bucketOf(template, item, answer) {
  let form = template;
  if (template === "picture") form = item.form || (Array.isArray(item.choices) ? "pick" : num(item.min) ? "line" : "number");
  if (template === "read") form = "pick";
  if (form === "number" || form === "line") {
    const min = form === "line" ? item.min : 0, max = item.max;
    if (!num(answer) || !num(min) || !num(max) || answer < min || answer > max) return null;
    const span = max - min;
    return span <= 100 ? String(Math.round(answer)) : "p" + Math.round(((answer - min) / span) * 100);
  }
  if (form === "pick") {
    const n = Array.isArray(item.choices) ? item.choices.length : 0;
    return Number.isInteger(answer) && answer >= 0 && answer < n ? String(answer) : null;
  }
  if (form === "rank") {
    const k = Array.isArray(item.things) ? item.things.length : 0;
    if (!Array.isArray(answer) || answer.length !== k || !answer.every((x) => Number.isInteger(x) && x >= 0 && x < k)) return null;
    if (new Set(answer).size !== k) return null;
    return answer.join("");
  }
  return null;
}

/* a line or two for Khayyam's queue: what the item says */
export function itemText(item) {
  const parts = [item.text, item.q];
  if (item.choices) parts.push(item.choices.map((c, i) => (i === item.answer ? "[" + c + "]" : c)).join(" / "));
  if (item.things) parts.push(item.things.join(" > "));
  if (item.answer !== undefined && !item.choices) parts.push("= " + item.answer + (item.unit ? " " + item.unit : ""));
  if (item.explain) parts.push(item.explain);
  for (const [k, v] of Object.entries(item)) if (!KNOWN.has(k)) parts.push(k + ": " + [].concat(v).join(", "));
  return parts.filter((x) => x !== undefined && x !== "").join("\n").slice(0, 1500);
}

/* every link in any text of an item (for the queue: each new one is shown to Khayyam) */
export function itemLinks(item) {
  const out = new Set();
  const walk = (v) => { if (typeof v === "string") for (const l of linksIn(v).links) out.add(l); else if (Array.isArray(v)) v.forEach(walk); };
  for (const [k, v] of Object.entries(item)) if (k !== "id" && k !== "image") walk(v);
  return [...out];
}
