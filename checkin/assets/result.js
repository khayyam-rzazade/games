/* Check-in: the result (section 3 of the plan), the research consent card (section 6) and the end card.
   The player's result is built on the phone from the player's own answers; the server is asked only for the comparison
   (POST /solo, no ID) and, once, for a pending upload with the anonymous ID that the consent card then keeps or deletes. */
import { el, h, esc, T, fmt, load, save, browserId, api, turnstile, lang, hex, ITEMS, BAR_IDS, AGE_BANDS, AGE_WIRE, ST, MIN_COUNTRY, ITEM_VERSION, ROOT, CONSENT_VERSION, HELP_URL,
         whoScore, whoBand, signed, weighsMost, countryList, countryName, inCountry, knownCountry, flag, relTime, dayMonth, howSheet, trQ, locale, researchersUrl } from './core.js';
import { gauge, thermo, divBars, pinScale } from './charts.js';
const lowerFirst = (w) => (w ? w.charAt(0).toLocaleLowerCase(locale()) + w.slice(1) : w);

export function pageUrl(path) { return new URL(path, ROOT).href; }

/* ------------------------------------------------------------------ the entry kept on the phone ------ */
export function payload(a) { const o = {}; for (const it of ITEMS) o[it.id] = it.id in a && a[it.id] !== undefined ? a[it.id] : null; return o; }
export function makeEntry(a, extra) {
  const pl = payload(a);
  /* `first`: the very first check-in on this phone, so the server can count people as well as check-ins */
  return Object.assign({ at: Date.now(), a: pl, who: whoScore(pl), st: pl.st, role: pl.role, lang: lang(), consent: null, first: load().history.length === 0 }, extra || {});
}
export function addEntry(entry) { const st = load(); st.history.push(entry); if (st.history.length > 30) st.history.splice(0, st.history.length - 30); save(); return entry; }
export function previousOf(entry) { const hs = load().history; const i = hs.indexOf(entry); for (let k = (i < 0 ? hs.length : i) - 1; k >= 0; k--) if (typeof hs[k].who === 'number') return hs[k]; return null; }

/* the comparison with the country and the world: once per finished check-in, no ID */
export function fetchComparison(entry) {
  const body = { a: entry.a, lang: entry.lang, role: entry.role }; if (entry.first) body.first = true;
  return api('/solo', body).then((r) => {
    if (r && r.ok && r.world) { entry.cmp = { world: r.world, country: r.country || null }; save(); return entry.cmp; }
    return null;
  });
}
/* the pending upload with the anonymous ID; the consent card turns it into kept or deleted */
export function startUpload(entry) {
  if (entry.upload && entry.upload.code) return Promise.resolve(entry.upload);
  return (async () => {
    const token = await turnstile();
    const body = { id: browserId(), a: entry.a, lang: entry.lang, role: entry.role, item_version: ITEM_VERSION, token };
    /* a room check-in is tagged with the room's public tag (never the code, which is the way in); one the room did not take is not tagged */
    if (entry.room && !(entry.send && entry.send.error)) { body.room = entry.tag || entry.room; body.round = entry.round; }
    const r = await api('/upload', body, 15000);
    if (r && r.ok && r.code) { entry.upload = { code: r.code, at: Date.now(), id: body.id, country: r.country || null }; save(); return entry.upload; }
    return null;
  })();
}

/* ------------------------------------------------------------------ the result ------ */
const isNum = (v) => typeof v === 'number' && isFinite(v);
/* the country the person is in, as the server saw it on this check-in (or what the Find outs already know) */
function countryOfEntry(entry) {
  const c = entry.cmp && entry.cmp.country; if (c && (c.code || c.iso)) return Promise.resolve(c.code || c.iso);
  if (entry.upload && entry.upload.country) return Promise.resolve(entry.upload.country);
  return knownCountry();
}
function heroCard(entry) {
  const band = whoBand(entry.who);
  const w = el('section', 'ck-card ck-hero');
  w.appendChild(el('h1', 'ck-title-s', T('res.title')));
  if (band !== null) {
    w.appendChild(gauge(entry.who, band));
    w.appendChild(el('p', 'ck-scale', T('res.scale')));
    w.appendChild(el('p', 'ck-band b' + band, T('res.band.' + band)));
    if (band > 0) w.appendChild(el('p', 'ck-bandline', T('res.bandline.' + band)));
    else w.appendChild(helpBlock(entry));
  }
  if (typeof entry.st === 'number') {
    const row = el('div', 'ck-stressrow');
    const head = el('div', 'ck-stressrow-h'); head.appendChild(el('b', '', T('res.stress'))); head.appendChild(el('span', '', T('res.stress_of', { n: entry.st, max: ST.max }))); row.appendChild(head);
    row.appendChild(thermo({ value: entry.st, compact: true, ends: false }));
    w.appendChild(row);
  }
  return w;
}
/* band 0-28: the kind line and where to find help, first, on this phone only (no host ever learns of it) */
function helpBlock(entry) {
  const c = el('div', 'ck-helpbox');
  c.appendChild(h(`<span class="ck-ico">${HEART}</span>`));
  c.appendChild(el('p', 'ck-kind', T('res.kind')));
  c.appendChild(el('p', '', T(entry.role === 'student' ? 'res.talk_student' : 'res.talk')));
  const line = el('p', 'ck-helpline');
  const lead = el('span', '', T('res.help_any') + ' ');
  const a = el('a', 'ck-helplink', T('res.help_link')); a.href = HELP_URL; a.target = '_blank'; a.rel = 'noopener';
  line.appendChild(lead); line.appendChild(a); c.appendChild(line);
  countryOfEntry(entry).then((iso) => {
    if (!iso || !/^[A-Z]{2}$/.test(iso)) return;
    lead.textContent = T('res.help_in', { in_country: inCountry(iso), country: countryName(iso) }) + ' ';
    a.href = HELP_URL + '/countries/' + iso.toLowerCase();
  }, () => null);
  c.appendChild(el('p', 'ck-small', T('res.danger')));
  return c;
}
function behindCard(entry) {
  const rows = BAR_IDS.filter((id) => typeof entry.a[id] === 'number').map((id) => ({ id, label: T('bar.' + id), s: signed(id, entry.a[id]) }));
  const notes = [];
  if (isNum(entry.a.sleep)) notes.push(T('res.sleep_read', { h: T('sleep.read.' + entry.a.sleep) }));
  if (typeof entry.a.mind === 'string' && entry.a.mind) notes.push(T('res.mind_read', { m: lowerFirst(T('mind.' + entry.a.mind)) }));
  if (isNum(entry.a.ladder)) notes.push(T('res.ladder_read', { n: entry.a.ladder }));
  if (!rows.length && !notes.length) return null;
  const w = el('section', 'ck-card ck-behind');
  w.appendChild(el('h2', '', T('res.behind')));
  if (rows.length) w.appendChild(divBars(rows, { mark: weighsMost(entry.a) }));
  if (notes.length) w.appendChild(el('p', 'ck-small ck-reads', notes.join(' · ')));
  return w;
}
const BULB = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>';
const HEART = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.5c2 0 3.5 1.1 5.4 3.2 1.9-2.1 3.4-3.2 5.4-3.2 3.7 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21z"/></svg>';
/* one line for the bar that weighs most (claude/checkin-advice-approved.md); in the low band it stays, smaller, below the help */
function adviceCard(entry) {
  const w = weighsMost(entry.a);
  const c = el('section', 'ck-card ck-advice' + (whoBand(entry.who) === 0 ? ' quiet' : ''));
  c.appendChild(h(`<span class="ck-ico">${BULB}</span>`));
  c.appendChild(el('h2', '', T('res.advice_h')));
  if (w) c.appendChild(el('span', 'ck-tag', T('bar.' + w)));
  c.appendChild(el('p', 'ck-advice-line', w ? T('advice.' + w) : T('advice.none')));
  const why = el('a', 'ck-link', T('res.why')); why.href = researchersUrl('#advice'); c.appendChild(why);
  return c;
}
/* you, your country, the world: fills in when the server has answered; if it never does, the card quietly goes */
function compareCard(entry) {
  const w = el('section', 'ck-card ck-compare ck-skel');
  const title = el('h2', '', T('res.compare_h_world')); w.appendChild(title);
  const body = el('div', 'ck-compare-body'); w.appendChild(body);
  w.fill = (cmp) => {
    if (!cmp || !cmp.world || !isNum(cmp.world.n)) { w.remove(); return; }
    w.classList.remove('ck-skel'); body.textContent = '';
    const cc = cmp.country && (cmp.country.code || cmp.country.iso) ? cmp.country : null;
    const iso = cc ? (cc.code || cc.iso) : null;
    const open = cc && isNum(cc.n) && cc.n >= MIN_COUNTRY && isNum(cc.who_mean) ? cc : null;
    const cname = iso ? countryName(iso) : null;
    if (open) title.textContent = T('res.compare_h', { country: cname });
    const worldOpen = isNum(cmp.world.who_mean);
    const cLabel = iso ? `${flag(iso)} ${cname}` : null;
    if (worldOpen || open) {
      body.appendChild(pinScale({ label: T('res.compare_who'), lo: 0, hi: 100, zones: true, you: entry.who, country: open ? open.who_mean : undefined, countryName: cLabel, world: worldOpen ? cmp.world.who_mean : undefined }));
      if (typeof entry.st === 'number') body.appendChild(pinScale({ label: T('res.compare_st'), lo: ST.min, hi: ST.max, you: entry.st, country: open ? open.st_mean : undefined, countryName: cLabel, world: worldOpen ? cmp.world.st_mean : undefined }));
    }
    if (cc && !open && isNum(cc.n)) body.appendChild(el('p', 'ck-small', T('res.not_open', { name: cname, n: fmt(cc.n), at: fmt(cc.opens_at || MIN_COUNTRY) })));
    if (!worldOpen) body.appendChild(el('p', 'ck-small', T('res.not_open', { name: T('res.world'), n: fmt(cmp.world.n), at: fmt(cmp.world.opens_at || MIN_COUNTRY) })));
    if (isNum(cmp.world.n_today) && isNum(cmp.world.countries) && cmp.world.n_today > 0) body.appendChild(el('p', 'ck-small ck-worldline', T('res.world_line', { n: fmt(cmp.world.n_today), c: fmt(cmp.world.countries) })));
  };
  return w;
}
/* since last time, from this phone's storage only; the first time, a date two weeks on and a calendar file for it */
function sinceCard(entry, prev) {
  const w = el('section', 'ck-card ck-since');
  if (prev) {
    const d = Math.round(entry.who) - Math.round(prev.who);
    const p = el('p', 'ck-delta ' + (d > 0 ? 'up' : d < 0 ? 'down' : 'same'));
    p.appendChild(el('span', 'arrow', d > 0 ? '▲' : d < 0 ? '▼' : '＝'));
    p.appendChild(document.createTextNode(T('res.since', { from: Math.round(prev.who), to: Math.round(entry.who), date: dayMonth(prev.at) })));
    w.appendChild(p);
    return w;
  }
  const next = entry.at + 14 * 864e5;
  w.appendChild(el('p', 'ck-advice-line', T('res.come_back')));
  w.appendChild(el('p', 'ck-quiet', T('res.your_date', { date: dayMonth(next) })));
  const cal = el('a', 'ck-link', T('res.calendar')); cal.download = 'check-in.ics'; cal.href = icsHref(next); w.appendChild(cal);
  return w;
}
function icsHref(ms) {
  const d = new Date(ms), ymd = (x) => x.getFullYear() + String(x.getMonth() + 1).padStart(2, '0') + String(x.getDate()).padStart(2, '0');
  const end = new Date(ms + 864e5), url = pageUrl('');
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Logicers//Check-in//EN', 'BEGIN:VEVENT', 'UID:' + hex(8) + '@logicers.com',
    'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, ''), 'DTSTART;VALUE=DATE:' + ymd(d), 'DTEND;VALUE=DATE:' + ymd(end),
    'SUMMARY:' + T('app.name').replace(/[,;\\]/g, ' '), 'URL:' + url, 'DESCRIPTION:' + url, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
}
/* "See how your class or team is doing →": a room in one tap */
function roomCta() {
  const w = el('section', 'ck-card ck-cta');
  const b = el('button', 'btn solid', T('res.room')); b.type = 'button';
  const status = el('p', 'ck-status', '');
  b.addEventListener('click', async () => {
    b.disabled = true; status.textContent = T('res.room_making');
    const token = await turnstile();
    const r = await api('/room/new', { lang: lang(), token });
    if (!r || !r.ok || !r.code || !r.host_key) { status.textContent = T('site.error'); b.disabled = false; return; }
    const st = load(); st.hosts = (st.hosts || []).filter((x) => x.key !== r.host_key); st.hosts.push({ key: r.host_key, code: r.code, at: Date.now() }); if (st.hosts.length > 12) st.hosts.splice(0, st.hosts.length - 12); save();
    location.href = pageUrl('host/') + '#' + r.host_key;
  });
  w.appendChild(b); w.appendChild(status);
  return w;
}

/* ------------------------------------------------------------------ the consent card ------ */
/* The card asks first; after the yes, on the same card, two optional taps (age, where the person lives), then the yes is sent with
   them. If the page is left during those two taps, the yes goes with what is known (a keepalive call), so a yes is never lost. */
export function consentCard(entry, uploadP, cmpP) {
  if (entry.consent) return consentDone(entry, entry.consent);
  const w = el('section', 'ck-consent');
  const top = el('div', 'ck-consent-top');
  const img = el('img'); img.src = pageUrl('../assets/img/khayyam.jpg'); img.alt = 'Khayyam'; img.width = 64; img.height = 64; top.appendChild(img);
  top.appendChild(el('p', '', T('consent.text'))); w.appendChild(top);
  const acts = el('div', 'ck-actions ck-consent-acts');
  const yes = el('button', 'btn solid', T('consent.yes')); yes.type = 'button';
  const no = el('button', 'btn ghost', T('consent.no')); no.type = 'button';
  acts.appendChild(no); acts.appendChild(yes); w.appendChild(acts);          /* yes on the right, under the thumb (K, 22 Oct) */
  const status = el('p', 'ck-status', ''); status.setAttribute('aria-live', 'polite'); w.appendChild(status);

  let seen = (entry.upload && entry.upload.country) || null;               /* the country the server saw: a suggestion only */
  const suggest = (iso) => { if (!seen && iso && /^[A-Z]{2}$/.test(iso)) seen = iso; };
  if (uploadP) uploadP.then((u) => suggest(u && u.country), () => null);
  if (cmpP) cmpP.then((cmp) => suggest(cmp && cmp.country && (cmp.country.code || cmp.country.iso)), () => null);

  const pick = { age: undefined, country: undefined };                      /* undefined: not asked yet; null: skipped */
  let sent = false;
  async function send(yesIt, keepalive) {
    const id = browserId();
    let up = entry.upload && entry.upload.code ? entry.upload : await uploadP;
    if (!up) up = await startUpload(entry);
    if (!up) return { ok: false, error: 'network' };
    const body = { id, code: up.code, yes: yesIt, consent_version: CONSENT_VERSION };
    if (yesIt) { if (pick.age) body.age = AGE_WIRE[pick.age]; if (pick.country) body.country = pick.country; }          /* no country: the server files it as "not said" */
    let r = await api('/consent', body, 12000, keepalive);
    if (r && !r.ok && (r.error === 'unknown' || r.error === 'deleted')) {          /* the pending upload is older than a day, or a no deleted it: send it again */
      entry.upload = null; save(); up = await startUpload(entry);
      if (up) { body.code = up.code; r = await api('/consent', body, 12000, keepalive); }
    }
    return r;
  }
  const leave = () => { if (document.visibilityState === 'hidden' && !sent) { sent = true; send(true, true).then((r) => { if (r && r.ok) { entry.consent = 'yes'; save(); } else sent = false; }, () => { sent = false; }); } };
  async function finishYes() {
    document.removeEventListener('visibilitychange', leave);
    if (sent && entry.consent === 'yes') { w.replaceWith(consentDone(entry, 'yes')); return; }
    sent = true;
    const body = el('div', 'ck-consent-step'); body.appendChild(el('p', 'ck-status', T('consent.sending'))); step(body);
    const r = await send(true);
    if (r && r.ok) { entry.consent = 'yes'; save(); w.replaceWith(consentDone(entry, 'yes')); return; }
    sent = false;
    const again = el('div', 'ck-consent-step');
    again.appendChild(el('p', 'ck-status', T('consent.failed')));
    const a2 = el('div', 'ck-actions ck-consent-acts'); const t = el('button', 'btn solid', T('site.try_again')); t.type = 'button'; t.addEventListener('click', finishYes); a2.appendChild(t); again.appendChild(a2);
    step(again);
  }
  function step(node) { w.querySelectorAll('.ck-consent-step, .ck-consent-acts, .ck-status').forEach((x) => { if (!node.contains(x)) x.remove(); }); w.appendChild(node); }
  function skipBtn(onSkip) { const b = el('button', 'ck-link ck-skiplink', T('consent.skip')); b.type = 'button'; b.addEventListener('click', onSkip); return b; }
  function askAge() {
    const s = el('div', 'ck-consent-step');
    s.appendChild(el('p', 'ck-opt-h', T('consent.two_more')));
    s.appendChild(el('p', 'ck-ask', T('consent.age_q')));
    const chips = el('div', 'ck-chips');
    for (const id of AGE_BANDS) {
      const c = el('button', 'chip', T('consent.age.' + id)); c.type = 'button'; c.dataset.age = id;
      c.addEventListener('click', () => { pick.age = id; askCountry(); });
      chips.appendChild(c);
    }
    s.appendChild(chips); s.appendChild(skipBtn(() => { pick.age = null; askCountry(); }));
    step(s);
  }
  function askCountry() {
    if (!seen) return askList();
    const s = el('div', 'ck-consent-step');
    s.appendChild(el('p', 'ck-ask', T('consent.live_q', { in_country: inCountry(seen), country: countryName(seen), mi: trQ(countryName(seen)) })));
    const row = el('div', 'ck-chips');
    const y = el('button', 'chip', T('consent.live_yes')); y.type = 'button'; y.addEventListener('click', () => { pick.country = seen; finishYes(); });
    const n = el('button', 'chip', T('consent.live_no')); n.type = 'button'; n.addEventListener('click', askList);
    row.appendChild(y); row.appendChild(n); s.appendChild(row);
    s.appendChild(skipBtn(() => { pick.country = null; finishYes(); }));
    step(s);
  }
  function askList() {
    const s = el('div', 'ck-consent-step');
    s.appendChild(el('p', 'ck-ask', T('consent.where_q')));
    const sel = el('select', 'ck-select'); sel.setAttribute('aria-label', T('consent.where_q'));
    sel.appendChild(new Option(T('consent.country_pick'), ''));
    const list = countryList();
    if (seen) { const me = list.find((c) => c.code === seen); if (me) sel.appendChild(new Option(`${flag(me.code)} ${me.name}`, me.code)); }
    for (const c of list) if (c.code !== seen) sel.appendChild(new Option(`${flag(c.code)} ${c.name}`, c.code));
    sel.addEventListener('change', () => { if (sel.value) { pick.country = sel.value; finishYes(); } });
    s.appendChild(sel); s.appendChild(skipBtn(() => { pick.country = null; finishYes(); }));
    step(s);
  }
  yes.addEventListener('click', () => { document.addEventListener('visibilitychange', leave); askAge(); });
  no.addEventListener('click', async () => {
    yes.disabled = no.disabled = true;
    await send(false).catch(() => null);                               /* best effort: the server also deletes it after a day */
    entry.consent = 'no'; save(); w.replaceWith(consentDone(entry, 'no'));
  });
  return w;
}
function consentDone(entry, kind) {
  const w = el('section', 'ck-consent done');
  const p = el('p', 'ck-status ok', kind === 'yes' ? T('consent.thanks') : T('consent.declined')); p.setAttribute('role', 'status');
  w.appendChild(p);
  if (kind === 'no' && Date.now() - entry.at < 24 * 3600e3) {          /* for 24 hours: a change of mind */
    const again = el('p', 'ck-small'); again.appendChild(document.createTextNode(T('consent.changed') + ' '));
    const b = el('button', 'ck-link', T('consent.yes')); b.type = 'button';
    b.addEventListener('click', () => { entry.consent = null; save(); const card = consentCard(entry, null, null); w.replaceWith(card); const y = card.querySelector('.ck-consent-acts .btn.solid'); if (y) y.click(); });
    again.appendChild(b); w.appendChild(again);
  }
  return w;
}

/* ------------------------------------------------------------------ the end card (the shared onward look) ------ */
export function endCard() {
  const w = el('section', 'onward ck-onward');
  w.appendChild(h(`<div class="onward-top"><h2>${esc(T('res.more_h'))}</h2></div>`));
  const a = el('a', 'onward-next ck-next-findout'); a.href = pageUrl('../find-out/');
  a.appendChild(h(`<span class="onward-text"><span class="onward-kicker">${esc(T('res.more_kicker'))}</span><span class="onward-name">${esc(T('res.more_name'))}</span><span class="onward-pitch">${esc(T('res.more_pitch'))}</span></span>`));
  a.appendChild(h('<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.6v12.8c0 .9 1 1.5 1.8 1L19 13c.8-.5.8-1.6 0-2.1L9.8 4.6c-.8-.5-1.8.1-1.8 1z" fill="currentColor"/></svg>'));
  w.appendChild(a);
  const all = el('a', 'onward-all'); all.href = pageUrl('../');
  all.appendChild(h('<svg class="onward-dots" viewBox="0 0 34 12" aria-hidden="true"><circle cx="6" cy="6" r="5" fill="#2D4FC4"/><circle cx="17" cy="6" r="5" fill="#D5492F"/><circle cx="28" cy="6" r="5" fill="#0D7D73"/></svg>'));
  all.appendChild(el('span', 'onward-all-name', T('site.back_home')));
  all.appendChild(h('<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7.5 4.5L13 10l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'));
  w.appendChild(all);
  return w;
}

/* ------------------------------------------------------------------ the whole result ------ */
/* o: { cmp: Promise|null, upload: Promise|null, cta: bool, top: [nodes] before the hero }  ->  a node */
export function resultNode(entry, o) {
  const opts = o || {};
  const w = el('div', 'ck-result');
  for (const n of opts.top || []) if (n) w.appendChild(n);
  w.appendChild(heroCard(entry));
  const bh = behindCard(entry); if (bh) w.appendChild(bh);
  w.appendChild(adviceCard(entry));
  const cc = compareCard(entry); w.appendChild(cc);
  const cmpP = entry.cmp ? Promise.resolve(entry.cmp) : (opts.cmp || null);
  if (cmpP) cmpP.then((c) => cc.fill(c), () => cc.fill(null)); else cc.fill(null);
  w.appendChild(sinceCard(entry, previousOf(entry)));
  if (opts.cta) w.appendChild(roomCta());
  const fresh = Date.now() - entry.at < 24 * 3600e3;
  if (!entry.consent && fresh) w.appendChild(consentCard(entry, opts.upload || startUpload(entry), cmpP));
  else if (entry.consent) w.appendChild(consentDone(entry, entry.consent));
  w.appendChild(endCard());
  howSheet();                                                    /* the "?" now has answers to delete */
  return w;
}
export { relTime };
