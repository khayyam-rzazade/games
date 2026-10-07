"""Twin or Trap: checks every word pair and writes the stock the game reads.

    python3 build.py            (from any folder)

Reads words.py (the pairs) and evidence.txt (what each dictionary page said). Writes, only where something changed:
  data/twin-or-trap.js   the pairs as the game reads them (meanings, sentences, the two dictionaries of every word)
  words.csv              next to this file: one row per pair, with its dictionaries and sentences
It stops and writes nothing if a rule is broken:
  - at least MIN_PAIRS pairs, each with its own id; between 40 and 60 percent twins
  - the two words of a pair look alike (the same letters apart from capitals and accents; for Russian, the Latin
    transliteration at most two letters apart) and are in two different languages of LANGS; when one is English, it is the
    second word
  - every word: a meaning and two different dictionaries from DICTS, each address on that dictionary's website;
    English only from Merriam-Webster, Oxford Learner's and the Britannica Dictionary; never two Wiktionaries
  - every address stands in evidence.txt, in a block about that pair (its id in the block's header), on a line of
    its own source that is not marked FAILED, NOT READ or Tried, with a quote after it
  - a twin: the same meaning on both sides, and no mix-up line; a trap: two different meanings, and a mix-up line
    (the sentence as it would sound to a speaker of the other language) that belongs to exactly one sentence
  - sentences: one in the language that is not English, or one in each language of a pair without English, the
    first in the first word's language; each with the word once in [brackets], as it is spelled in that language;
    an English translation; Russian also in Latin letters
  - words: no straight double quote, no double space, at most the lengths below (what fits a phone of 320 x 568),
    British spellings in English, no word from WATCH (rude words, drink and drugs, religion, ethnicity, politics)
Running it twice changes nothing.
"""
import csv, io, json, os, re, sys, unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, '..', '..'))
sys.path.insert(0, HERE)
from words import LANGS, PAIRS  # noqa: E402

MADE = '2026-10-06'          # the day the pairs were checked
MIN_PAIRS = 60
TWINS_MIN, TWINS_MAX = 0.40, 0.60
WORD_MAX, MEANING_MAX, SENTENCE_MAX, ENGLISH_MAX = 12, 50, 46, 46

DICTS = {   # the name shown to players: its website
    'Merriam-Webster': 'merriam-webster.com', "Oxford Learner's": 'oxfordlearnersdictionaries.com',
    'Britannica Dictionary': 'britannica.com',
    'DWDS': 'dwds.de', 'WAHRIG (on DWDS)': 'dwds.de', 'WDG (on DWDS)': 'dwds.de', 'Wiktionary': 'en.wiktionary.org',
    'woorden.org': 'woorden.org', 'Van Dale 1950 (on Ensie)': 'ensie.nl', 'Ensie (Muiswerk)': 'ensie.nl',
    'Larousse': 'larousse.fr', 'Larousse Collège': 'larousse.fr', 'Larousse French-English': 'larousse.fr',
    'Wiktionnaire': 'fr.wiktionary.org', 'Académie française': 'dictionnaire-academie.fr',
    'RAE': 'dle.rae.es', 'SpanishDict': 'spanishdict.com',
    'Treccani': 'treccani.it', 'De Mauro': 'dizionario.internazionale.it',
    'Priberam': 'dicionario.priberam.org', 'Infopédia': 'infopedia.pt',
    'synonymer.se': 'synonymer.se', 'Woxikon': 'ordbok.woxikon.se',
    'Ushakov': 'dic.academic.ru', 'Gramota.ru': 'gramota.ru',
    'Tureng': 'tureng.com', 'Zargan': 'zargan.com', 'Sesli Sözlük': 'seslisozluk.net',
}
ENGLISH_DICTS = {'Merriam-Webster', "Oxford Learner's", 'Britannica Dictionary'}
WIKIS = {'Wiktionary', 'Wiktionnaire'}
WATCH = r'\b(god|gods|church\w*|mosque\w*|temple\w*|holy|sacred|relig\w*|islam\w*|christ\w*|muslim\w*|hindu\w*|' \
        r'buddh\w*|jews?|jewish|bible|pray\w*|priest\w*|ethnic\w*|tribe\w*|tribal|race|racial|president\w*|' \
        r'minister\w*|king|kings|queen\w*|election\w*|party|parties|politic\w*|government\w*|war|wars|army|' \
        r'military|weapon\w*|gun|guns|kill\w*|dead|death|die|drug\w*|beer|wine|vodka|alcohol\w*|drunk|sex\w*|' \
        r'naked|stupid|idiot\w*|damn\w*|hell|bloody|fart\w*|poo|pee|bum|bums|butt|toilet\w*)\b'
AMERICAN = r'\b(\w*center\w*|(?:kilo|centi|milli)?meters?|\w*color\w*|favor\w*|liters?|gray|neighbor\w*|traveled|' \
           r'traveling|defense|mom|candy|apartment|vacation|cookie\w*|garbage|trash|\w*(?:recogniz|organiz|' \
           r'realiz|specializ|memoriz|summariz|categoriz|criticiz)\w*)\b'
ID = r'^[a-z]{2}(?:-[a-z]{2})?-[a-z]+$'

bad = []
def say(m): bad.append(m)


# ---------- evidence.txt ----------
EV_LINES = open(os.path.join(HERE, 'evidence.txt'), encoding='utf-8').read().split('\n')

def is_header(ln):
    return ln.startswith('=== PAIR ') or ln.startswith('--- ') or ln.startswith('#### ')

def is_source_line(ln):
    return bool(re.search(r'\|\s*https?://', ln))

def header_of(i):
    for j in range(i, -1, -1):
        if is_header(EV_LINES[j]):
            return EV_LINES[j]
    return ''

def block_after(i):
    """The lines of one source: from its line to the next source, header, side heading or verdict."""
    out = [EV_LINES[i]]
    for ln in EV_LINES[i + 1:]:
        if is_source_line(ln) or is_header(ln) or (ln and not ln.startswith(' ')) or \
                re.match(r'^\s*(Shares a sense|\(Tried|FAILED|NOT READ)', ln):
            break
        out.append(ln)
    return out

def in_evidence(pid, url):
    """True if the address stands on a source line of a block about this pair, with a quote after it."""
    for i, ln in enumerate(EV_LINES):
        if url not in ln or not is_source_line(ln):
            continue
        if re.match(r'^\s*(FAILED|NOT READ|\(?Tried)', ln) or 'FAILED' in ln.split('|')[0]:
            continue
        if not re.search(r'(?<![\w-])' + re.escape(pid) + r'(?![\w-])', header_of(i)):
            continue
        text = ' '.join(block_after(i))
        after = text.split(url, 1)[1]
        if re.search(r'["“][^"”]{3,}["”]', after, flags=re.S):
            return True
    return False

def site_ok(name, url):
    host = url.split('/')[2].lower()
    want = DICTS[name]
    return host == want or host.endswith('.' + want)

def tidy(u):
    """The address as players get it: without a mark that only scrolls the page, and without the query of
    Merriam-Webster's sound files (the same entry)."""
    u = u.split('#', 1)[0]
    if 'merriam-webster.com' in u and '?pronunciation' in u:
        u = u.split('?', 1)[0]
    return u


# ---------- words ----------
def plain(w):
    w = unicodedata.normalize('NFKD', w.casefold())
    return ''.join(c for c in w if not unicodedata.combining(c))

def distance(a, b):
    """How many letters must be changed, added or taken away to turn one word into the other."""
    row = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        prev, row[0] = row[0], i
        for j, cb in enumerate(b, 1):
            prev, row[j] = row[j], min(row[j] + 1, row[j - 1] + 1, prev + (ca != cb))
    return row[-1]

def look_alike(a, b, latin):
    """The same letters apart from capitals and accents; through Latin letters (Russian), at most two apart."""
    a, b = plain(a), plain(b)
    return a == b or (latin and distance(a, b) <= 2)

def check_text(where, text, limit, english):
    if not text or text != text.strip() or '  ' in text:
        say(f'{where}: empty, a double space or a space at an end')
    if '"' in text:
        say(f'{where}: a straight double quote')
    if len(text) > limit:
        say(f'{where}: {len(text)} characters (at most {limit})')
    for w in re.findall(WATCH, text, flags=re.I):
        say(f'{where}: the word "{w}" is not for this game')
    if english:
        for w in re.findall(AMERICAN, text, flags=re.I):
            say(f'{where}: American spelling "{w}"')

def bracketed(where, text):
    parts = re.findall(r'\[([^\]]*)\]', text)
    if len(parts) != 1 or text.count('[') != 1 or text.count(']') != 1:
        say(f'{where}: the word must stand once in [brackets]')
        return None
    return parts[0]

def ends_well(t):
    return bool(re.search(r'[.!?]["»’]?$', t))

def words_of(t):
    return re.findall(r"[a-z']+", t.lower())


# ---------- the pairs ----------
out, rows = [], []
ids = [p['id'] for p in PAIRS]
if len(PAIRS) < MIN_PAIRS: say(f'{len(PAIRS)} pairs, at least {MIN_PAIRS} are needed')
if len(set(ids)) != len(ids): say('two pairs have the same id')
twins = sum(1 for p in PAIRS if p['v'] == 'twin')
if PAIRS and not (TWINS_MIN <= twins / len(PAIRS) <= TWINS_MAX):
    say(f'{twins} twins of {len(PAIRS)} pairs: not between {TWINS_MIN:.0%} and {TWINS_MAX:.0%}')
seen_words = {}
for p in PAIRS:
    pid = p['id']
    if not re.match(ID, pid): say(f'{pid}: not a good id')
    if p['v'] not in ('twin', 'trap'):
        say(f'{pid}: "{p["v"]}" is neither twin nor trap'); continue
    sides = {}
    for key in ('a', 'b'):
        s = p[key]
        lang, word, meaning, srcs = s[0], s[1], s[2], s[3]
        tr = s[4] if len(s) > 4 else ''
        where = f'{pid} {key}'
        if lang not in LANGS:
            say(f'{where}: unknown language {lang}'); continue
        if lang == 'ru' and not re.match(r'^[a-z]+$', tr or ''):
            say(f'{where}: a Russian word needs its Latin letters')
        check_text(where + ' word', word, WORD_MAX, False)
        check_text(where + ' meaning', meaning, MEANING_MAX, True)
        if meaning.endswith('.'): say(f'{where}: a meaning without a full stop, please')
        shown = []
        if len(srcs) != 2:
            say(f'{where}: {len(srcs)} dictionaries, not 2')
        names = [n for n, _ in srcs]
        if len(set(names)) != len(names): say(f'{where}: the same dictionary twice')
        if sum(1 for n in names if n in WIKIS) > 1: say(f'{where}: two Wiktionaries')
        for name, url in srcs:
            if name not in DICTS:
                say(f'{where}: {name} is not one of the dictionaries (DICTS)'); continue
            if lang == 'en' and name not in ENGLISH_DICTS:
                say(f'{where}: an English word from {name}')
            if not url.startswith('https://'):
                say(f'{where}: {url} is not an https address')
            elif not site_ok(name, url):
                say(f'{where}: {url} is not on the website of {name}')
            if not in_evidence(pid, url):
                say(f'{where}: the address {url} does not stand with a quote in a block about {pid} in evidence.txt')
            shown.append([name, tidy(url)])
        side = {'l': lang, 'w': word, 'm': meaning, 's': shown}
        if tr: side['tr'] = tr
        sides[key] = side
        k = (lang, plain(word))
        if k in seen_words: say(f'{where}: {LANGS[lang]} "{word}" is in {seen_words[k]} already')
        seen_words[k] = pid
    if len(sides) != 2:
        continue
    a, b = sides['a'], sides['b']
    if a['l'] == b['l']: say(f'{pid}: both words in {LANGS[a["l"]]}')
    if a['l'] == 'en': say(f'{pid}: English must be the second word')
    if not look_alike(a.get('tr') or a['w'], b.get('tr') or b['w'], bool(a.get('tr') or b.get('tr'))):
        say(f'{pid}: "{a["w"]}" and "{b["w"]}" do not look alike')
    # meanings
    mix = p.get('mix', '')
    if p['v'] == 'twin':
        if a['m'] != b['m']: say(f'{pid}: a twin with two different meanings')
        if mix: say(f'{pid}: a twin with a mix-up line')
    else:
        if a['m'] == b['m']: say(f'{pid}: a trap with the same meaning on both sides')
        if not mix: say(f'{pid}: a trap without its mix-up line')
    # sentences
    sents = p['say']
    english = 'en' in (a['l'], b['l'])
    want = [a['l']] if english else [a['l'], b['l']]
    got = [x[0] for x in sents]
    if got != want:
        say(f'{pid}: sentences in {got}, not {want}')
    xs = []
    for n, x in enumerate(sents):
        where = f'{pid} sentence {n + 1}'
        lang, text, english_text = x[0], x[1], x[2]
        side = a if lang == a['l'] else b
        check_text(where, text, SENTENCE_MAX, False)
        check_text(where + ' (English)', english_text, ENGLISH_MAX, True)
        if not ends_well(text) or not ends_well(english_text):
            say(f'{where}: a sentence ends with . ! or ?')
        inner = bracketed(where, text)
        if inner is not None and plain(inner) != plain(side['w']):
            say(f'{where}: [{inner}] is not the word "{side["w"]}"')
        item = {'l': lang, 't': text, 'e': english_text}
        if lang == 'ru':
            if len(x) < 4:
                say(f'{where}: a Russian sentence needs its Latin letters')
            else:
                inner = bracketed(where + ' (Latin letters)', x[3])
                if inner is not None and plain(inner) != plain(side.get('tr', '')):
                    say(f'{where}: [{inner}] in Latin letters is not "{side.get("tr")}"')
                check_text(where + ' (Latin letters)', x[3], SENTENCE_MAX, False)
                item['tr'] = x[3]
        xs.append(item)
    pair = {'id': pid, 'v': p['v'], 'a': a, 'b': b, 'x': xs}
    if mix and xs:
        check_text(f'{pid} mix-up line', mix, ENGLISH_MAX, True)
        if not ends_well(mix): say(f'{pid}: the mix-up line ends with . ! or ?')
        scores = []
        for x in xs:
            w1, w2 = words_of(x['e']), words_of(mix)
            scores.append(sum(1 for w in w2 if w in w1))
        best = max(scores)
        if len(xs) > 1 and (scores.count(best) != 1 or best < 2):
            say(f'{pid}: the mix-up line does not belong to exactly one sentence ({scores})')
        else:
            mx = scores.index(best)
            if mix == xs[mx]['e']: say(f'{pid}: the mix-up line repeats the translation')
            pair['mix'] = mix
            pair['mx'] = mx
            pair['ear'] = b['l'] if xs[mx]['l'] == a['l'] else a['l']
    out.append(pair)
    rows.append([pid, p['v'],
                 LANGS[a['l']], a['w'], a.get('tr', ''), a['m']] + sum(([n, u] for n, u in a['s']), []) +
                [LANGS[b['l']], b['w'], b['m']] + sum(([n, u] for n, u in b['s']), []) +
                sum(([LANGS[x['l']], x['t'] + (' (' + x['tr'] + ')' if x.get('tr') else ''), x['e']] for x in xs), []) +
                [''] * (3 * (2 - len(xs))) + [mix])

if bad:
    print('Nothing written. Fix these first:')
    for m in bad: print('  -', m)
    sys.exit(1)


# ---------- write ----------
def write(path, content):
    old = open(path, encoding='utf-8').read() if os.path.exists(path) else None
    if old != content:
        open(path, 'w', encoding='utf-8').write(content)
        print('written  ', os.path.relpath(path, ROOT))
    else:
        print('unchanged', os.path.relpath(path, ROOT))

js = ('/* Twin or Trap: the word pairs (a twin means the same in both languages, a trap does not), with two '
      'dictionaries for every word. Made by r/twin-or-trap-workshop/build.py from words.py and evidence.txt. '
      'Do not edit by hand. */\n'
      'window.TURNSOUT_DATA = window.TURNSOUT_DATA || {};\n'
      'window.TURNSOUT_DATA["twin-or-trap"] = {\n'
      f'  "made": "{MADE}",\n'
      f'  "langs": {json.dumps(LANGS, ensure_ascii=False, separators=(",", ":"))},\n'
      '  "pairs": [\n' +
      ',\n'.join('    ' + json.dumps(p, ensure_ascii=False, separators=(',', ':')) for p in out) +
      '\n  ]\n};\n')
write(os.path.join(ROOT, 'data', 'twin-or-trap.js'), js)

buf = io.StringIO()
w = csv.writer(buf, lineterminator='\n')
w.writerow(['id', 'verdict', 'language1', 'word1', 'latin1', 'meaning1', 'dictionary1a', 'url1a', 'dictionary1b',
            'url1b', 'language2', 'word2', 'meaning2', 'dictionary2a', 'url2a', 'dictionary2b', 'url2b',
            'sentence1_language', 'sentence1', 'sentence1_english', 'sentence2_language', 'sentence2',
            'sentence2_english', 'mix_up'])
for r in rows:
    w.writerow(r)
write(os.path.join(HERE, 'words.csv'), buf.getvalue())

langs = {}
for p in out:
    for s in (p['a'], p['b']):
        langs[LANGS[s['l']]] = langs.get(LANGS[s['l']], 0) + 1
print(f'{len(out)} pairs: {twins} twins, {len(out) - twins} traps; '
      f'{sum(1 for p in out if "en" not in (p["a"]["l"], p["b"]["l"]))} without English; '
      f'{sum(len(p["a"]["s"]) + len(p["b"]["s"]) for p in out)} dictionary entries; words by language: ' +
      ', '.join(f'{k} {v}' for k, v in sorted(langs.items(), key=lambda kv: -kv[1])))
