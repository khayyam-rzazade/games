/* Logicers Live: the desk's words (15 Oct 2026), in the three languages a made game can speak: English,
   Italian, Turkish. A game's screens send people here in the game's own language ("Report" is "Segnala" on
   an Italian game), so the report form speaks it too; Khayyam checks every word.

   Three parts, each read by its own page:
   - the report form (live/report/report.js): every label, line and message;
   - "stop": the reason a stopped game's maker reads on its edit link, in the game's language (Logicers'
     own desk page writes it; that page itself is English only);
   - "mail": the two emails Logicers sends to whoever reported a game and gave an email address: the
     receipt (DSA Art. 16(4)) and the decision with the ways to challenge it (Art. 16(5)); and (15 Oct 2026)
     the new edit link for a maker who lost theirs and wrote from the email they left as a way back. Logicers'
     desk page opens them ready in Khayyam's mail app; nothing here sends anything by itself.

   Rules (step2-spec.md section 7): a word is a whole sentence with %s or %d places, never pieces glued in
   English word order; a missing word falls back to English; Italian says "tu", Turkish "sen"; Italian
   avoids gendered forms where a neutral one reads naturally; the shared words (Report, Send, Your name)
   are exactly the glossary's. No age anywhere. Plain text only: every page puts these words in with
   textContent, so none of them may hold HTML. */
window.DESK_WORDS = {
  en: {
    name: "English",
    locale: "en-US",
    docTitle: "Report a game | Logicers",
    title: "Report a game",
    danger: "If someone's life or safety is in danger, call 112 first.",
    codeLabel: "The game's code",
    codeHint: "5 or 7 letters, on the game's screens.",
    whyLabel: "What is wrong?",
    whys: {
      illegal: "Illegal content",
      hate: "Hate, harassment or threats",
      sexual: "Sexual content",
      violence: "Violence",
      personal: "Someone's personal data",
      copyright: "Copyright",
      spam: "Spam or a scam",
      wrong: "A wrong fact",
      other: "Something else"
    },
    textLabel: "Tell us what is wrong and where (which question)",
    textCount: "%s / %s",
    nameLabel: "Your name (optional)",
    emailLabel: "Your email (optional)",
    contactLine: "Giving them helps Logicers write back to you with its decision. Reporting the sexual abuse of a child? Then you never need to give them.",
    good: "I believe what I report is accurate and complete.",
    send: "Send",
    sending: "Sending…",
    privacy: "Privacy: a report keeps what you write, the game's code, and your name and email if you give them, for six months (the server's backups clear 30 days later). Nothing else.",
    counted: "Visits are counted with GoatCounter, without identifying anyone.",
    terms: "Terms for games people make",
    errCode: "A code has 5 or 7 letters.",
    errNoGame: "No game with this code. Check the letters, or write to logicers.world@gmail.com.",
    errWhy: "Choose what is wrong.",
    errText: "Write at least 10 characters.",
    errTextLong: "Write at most 1,000 characters.",
    errChars: "This has a character that can't be sent. Retype it without it.",
    errName: "Use at most 80 characters for your name.",
    errEmail: "This email address doesn't look right.",
    errGood: "Tick the box to confirm.",
    errCheck: "Check the marked parts.",
    errLater: "Too many reports from here just now. Try again in a few minutes.",
    errOld: "Logicers has just been updated. Reload this page.",
    errNet: "Can't reach Logicers. Check the signal and try again: your words are still here.",
    errServer: "Something went wrong on Logicers' side. Try again in a minute, or write to logicers.world@gmail.com.",
    thanksTitle: "Thank you",
    thanks: "Logicers reads every report by hand.",
    willWrite: "We'll write to %s with the decision.",
    next: "If the game breaks the rules or the law, Logicers stops it, with its copies, and its maker sees why.",
    back: "Back to the game",
    again: "Report another game",
    stop: {
      byReport: "Logicers stopped this game after a report. The reason: %s.%s It can no longer be played, hosted or copied. A person decided this, not a machine. If you think it is a mistake, write to logicers.world@gmail.com; you can also go to court. Terms: logicers.com/live/terms/",
      byCheck: "Logicers stopped this game after checking it. The reason: %s.%s It can no longer be played, hosted or copied. A person decided this, not a machine. If you think it is a mistake, write to logicers.world@gmail.com; you can also go to court. Terms: logicers.com/live/terms/",
      reasons: {
        illegal: "it holds illegal content",
        hate: "it holds hate, harassment or threats",
        sexual: "it holds sexual content",
        violence: "it praises or encourages violence",
        personal: "it holds someone's personal data",
        copyright: "it copies someone else's work without permission",
        spam: "it is spam or a scam",
        other: "it breaks the terms for games people make"
      }
    },
    mail: {
      hi: "Hello,",
      hiName: "Hello %s,",
      newLinkSubject: "Logicers: a new edit link for your game %s",
      newLinkBody: "%s\n\nhere is a new edit link for your game “%s” (code %s):\n\n%s\n\nThe old link no longer works. Keep this one safe: anyone who has it can change your game.\n\nLogicers\nlogicers.world@gmail.com",
      receiptSubject: "Logicers: we received your report about the game %s",
      receiptBody: "%s\n\nThank you for your report about the game %s on Logicers (%s). A person will read it and decide what to do, and we will write to you again with the decision.\n\nLogicers\nlogicers.world@gmail.com",
      decisionSubject: "Logicers: our decision on your report about the game %s",
      decisionBody: "%s\n\nThank you for your report about the game %s on Logicers (%s).\n\nOur decision: %s%s\n\nA person decided this, not a machine. If you disagree, reply to this email and we will look at it again. You can also go to court, or complain to the Digital Services Coordinator of the EU country where you live (in Italy: AGCOM, agcom.it).\n\nLogicers\nlogicers.world@gmail.com",
      decisions: {
        stopped: "we have stopped the game and its copies. They can no longer be played, hosted or copied.",
        kept: "we looked at the game and kept it: we found nothing against the law or our terms.",
        other: "see below."
      },
      note: "\n\n%s"
    }
  },

  it: {
    name: "Italiano",
    locale: "it-IT",
    docTitle: "Segnala un gioco | Logicers",
    title: "Segnala un gioco",
    danger: "Se la vita o la sicurezza di qualcuno è in pericolo, chiama subito il 112.",
    codeLabel: "Il codice del gioco",
    codeHint: "5 o 7 lettere: lo trovi nelle schermate del gioco.",
    whyLabel: "Qual è il problema?",
    whys: {
      illegal: "Contenuto illegale",
      hate: "Odio, molestie o minacce",
      sexual: "Contenuto sessuale",
      violence: "Violenza",
      personal: "Dati personali di qualcuno",
      copyright: "Violazione del diritto d'autore",
      spam: "Spam o truffa",
      wrong: "Un'informazione sbagliata",
      other: "Altro"
    },
    textLabel: "Spiegaci cosa non va e dove (in quale domanda)",
    textCount: "%s / %s",
    nameLabel: "Il tuo nome (facoltativo)",
    emailLabel: "La tua email (facoltativa)",
    contactLine: "Se li lasci, Logicers potrà comunicarti la sua decisione. Per segnalare abusi sessuali su minori non è mai necessario lasciarli.",
    good: "Credo in buona fede che ciò che segnalo sia esatto e completo.",
    send: "Invia",
    sending: "Invio…",
    privacy: "Privacy: quando invii una segnalazione, Logicers conserva per sei mesi ciò che scrivi, il codice del gioco e, se li lasci, il tuo nome e la tua email (i backup del server si cancellano 30 giorni dopo). Nient'altro.",
    counted: "Le visite vengono contate con GoatCounter, senza identificare nessuno.",
    terms: "Le regole per i giochi creati dagli utenti",
    errCode: "Un codice ha 5 o 7 lettere.",
    errNoGame: "Nessun gioco con questo codice. Controlla le lettere, oppure scrivi a logicers.world@gmail.com.",
    errWhy: "Scegli qual è il problema.",
    errText: "Scrivi almeno 10 caratteri.",
    errTextLong: "Scrivi al massimo 1.000 caratteri.",
    errChars: "Contiene un carattere che non si può inviare. Riscrivilo senza quel carattere.",
    errName: "Usa al massimo 80 caratteri per il nome.",
    errEmail: "Questo indirizzo email non sembra corretto.",
    errGood: "Spunta la casella per confermare.",
    errCheck: "Controlla le parti evidenziate.",
    errLater: "Troppe segnalazioni da qui in questo momento. Riprova tra qualche minuto.",
    errOld: "Logicers è appena stato aggiornato. Ricarica questa pagina.",
    errNet: "Impossibile raggiungere Logicers. Controlla la connessione e riprova: ciò che hai scritto è ancora qui.",
    errServer: "C'è stato un problema sul server di Logicers. Riprova tra un minuto, oppure scrivi a logicers.world@gmail.com.",
    thanksTitle: "Grazie",
    thanks: "Ogni segnalazione la legge una persona di Logicers.",
    willWrite: "Ti scriveremo a %s per comunicarti la decisione.",
    next: "Se il gioco viola le regole o la legge, Logicers lo ferma insieme alle sue copie e mostra il motivo a chi l'ha creato.",
    back: "Torna al gioco",
    again: "Segnala un altro gioco",
    stop: {
      byReport: "Logicers ha fermato questo gioco dopo una segnalazione. Il motivo: %s.%s Non è più possibile giocarci, condurlo né copiarlo. Lo ha deciso una persona, non una macchina. Se pensi che sia un errore, scrivi a logicers.world@gmail.com; puoi anche rivolgerti a un tribunale. Regole: logicers.com/live/terms/#it",
      byCheck: "Logicers ha fermato questo gioco dopo averlo controllato. Il motivo: %s.%s Non è più possibile giocarci, condurlo né copiarlo. Lo ha deciso una persona, non una macchina. Se pensi che sia un errore, scrivi a logicers.world@gmail.com; puoi anche rivolgerti a un tribunale. Regole: logicers.com/live/terms/#it",
      reasons: {
        illegal: "include contenuti illegali",
        hate: "contiene odio, molestie o minacce",
        sexual: "include contenuti sessuali",
        violence: "esalta o incoraggia la violenza",
        personal: "contiene dati personali di qualcuno",
        copyright: "copia l'opera di qualcun altro senza permesso",
        spam: "è spam o una truffa",
        other: "viola le regole per i giochi creati dagli utenti"
      }
    },
    mail: {
      hi: "Ciao,",
      hiName: "Ciao %s,",
      newLinkSubject: "Logicers: un nuovo link di modifica per il tuo gioco %s",
      newLinkBody: "%s\n\necco un nuovo link di modifica per il tuo gioco «%s» (codice %s):\n\n%s\n\nIl vecchio link non funziona più. Metti al sicuro quello nuovo: chiunque lo abbia può modificare il tuo gioco.\n\nLogicers\nlogicers.world@gmail.com",
      receiptSubject: "Logicers: abbiamo ricevuto la tua segnalazione sul gioco %s",
      receiptBody: "%s\n\ngrazie per aver segnalato il gioco %s su Logicers (%s). Una persona leggerà la tua segnalazione e deciderà cosa fare; poi ti scriveremo di nuovo per comunicarti la decisione.\n\nLogicers\nlogicers.world@gmail.com",
      decisionSubject: "Logicers: la nostra decisione sulla tua segnalazione del gioco %s",
      decisionBody: "%s\n\ngrazie per aver segnalato il gioco %s su Logicers (%s).\n\nLa nostra decisione: %s%s\n\nLo ha deciso una persona, non una macchina. Se non sei d'accordo, rispondi a questa email e riesamineremo la decisione. Puoi anche rivolgerti a un tribunale oppure presentare un reclamo al Coordinatore dei servizi digitali del Paese dell'UE in cui vivi (in Italia: AGCOM, agcom.it).\n\nLogicers\nlogicers.world@gmail.com",
      decisions: {
        stopped: "abbiamo fermato il gioco e le sue copie. Non è più possibile giocarci, condurli né copiarli.",
        kept: "abbiamo esaminato il gioco e deciso di non fermarlo, perché non abbiamo trovato nulla che violi la legge o le nostre regole.",
        other: "vedi qui sotto."
      },
      note: "\n\n%s"
    }
  },

  tr: {
    name: "Türkçe",
    locale: "tr-TR",
    docTitle: "Bir oyunu bildir | Logicers",
    title: "Bir oyunu bildir",
    danger: "Birinin hayatı ya da güvenliği tehlikedeyse önce 112'yi ara.",
    codeLabel: "Oyunun kodu",
    codeHint: "Oyunun ekranlarında görünen 5 ya da 7 harf.",
    whyLabel: "Sorun ne?",
    whys: {
      illegal: "Yasa dışı içerik",
      hate: "Nefret, taciz ya da tehdit",
      sexual: "Cinsel içerik",
      violence: "Şiddet",
      personal: "Birinin kişisel bilgileri",
      copyright: "Telif hakkı",
      spam: "Spam ya da dolandırıcılık",
      wrong: "Yanlış bir bilgi",
      other: "Başka bir şey"
    },
    textLabel: "Neyin yanlış olduğunu ve nerede olduğunu (hangi soruda) yaz",
    textCount: "%s / %s",
    nameLabel: "Adın (isteğe bağlı)",
    emailLabel: "E-posta adresin (isteğe bağlı)",
    contactLine: "Bunları verirsen Logicers kararını sana iletebilir. Bir çocuğun cinsel istismarını mı bildiriyorsun? O zaman bunları vermene hiç gerek yok.",
    good: "Bildirdiklerimin doğru ve eksiksiz olduğuna iyi niyetle inanıyorum.",
    send: "Gönder",
    sending: "Gönderiliyor…",
    privacy: "Gizlilik: Bildirim gönderdiğinde yazdıkların, oyunun kodu ve verirsen adın ile e-posta adresin altı ay boyunca saklanır (bundan 30 gün sonra yedeklerden de silinir). Başka hiçbir şey saklanmaz.",
    counted: "Ziyaretler GoatCounter ile, kimsenin kimliği belirlenmeden sayılır.",
    terms: "Kullanıcıların hazırladığı oyunlar için kurallar",
    errCode: "Kod 5 ya da 7 harften oluşur.",
    errNoGame: "Bu kodla bir oyun bulunamadı. Harfleri kontrol et ya da logicers.world@gmail.com adresine yaz.",
    errWhy: "Sorunun ne olduğunu seç.",
    errText: "En az 10 karakter yaz.",
    errTextLong: "En fazla 1.000 karakter yaz.",
    errChars: "Gönderilemeyen bir karakter var. O karakteri kullanmadan yeniden yaz.",
    errName: "Adın için en fazla 80 karakter kullan.",
    errEmail: "Bu e-posta adresi doğru görünmüyor.",
    errGood: "Onaylamak için kutuyu işaretle.",
    errCheck: "İşaretli yerleri kontrol et.",
    errLater: "Az önce buradan çok fazla bildirim gönderildi. Birkaç dakika sonra tekrar dene.",
    errOld: "Logicers az önce güncellendi. Bu sayfayı yenile.",
    errNet: "Logicers'a ulaşılamıyor. Bağlantını kontrol edip tekrar dene. Yazdıkların hâlâ burada.",
    errServer: "Logicers tarafında bir sorun oldu. Bir dakika sonra tekrar dene ya da logicers.world@gmail.com adresine yaz.",
    thanksTitle: "Teşekkürler",
    thanks: "Logicers'ta her bildirimi bir insan okur.",
    willWrite: "Kararı %s adresine göndereceğiz.",
    next: "Oyun kuralları ya da yasayı çiğniyorsa Logicers onu kopyalarıyla birlikte durdurur; oyunu hazırlayan kişi de nedenini görür.",
    back: "Oyuna dön",
    again: "Başka bir oyunu bildir",
    stop: {
      byReport: "Logicers bu oyunu bir bildirim üzerine durdurdu. Neden: %s.%s Artık oynanamaz, sunulamaz ve kopyalanamaz. Bu kararı bir makine değil, bir insan verdi. Bunun bir hata olduğunu düşünüyorsan logicers.world@gmail.com adresine yaz; mahkemeye de başvurabilirsin. Kurallar: logicers.com/live/terms/#tr",
      byCheck: "Logicers bu oyunu inceledikten sonra durdurdu. Neden: %s.%s Artık oynanamaz, sunulamaz ve kopyalanamaz. Bu kararı bir makine değil, bir insan verdi. Bunun bir hata olduğunu düşünüyorsan logicers.world@gmail.com adresine yaz; mahkemeye de başvurabilirsin. Kurallar: logicers.com/live/terms/#tr",
      reasons: {
        illegal: "yasa dışı içerik barındırıyor",
        hate: "nefret, taciz ya da tehdit içeriyor",
        sexual: "cinsel içerik barındırıyor",
        violence: "şiddeti övüyor ya da teşvik ediyor",
        personal: "birinin kişisel bilgilerini içeriyor",
        copyright: "başkasının eserini izinsiz kopyalıyor",
        spam: "spam ya da dolandırıcılık",
        other: "kullanıcıların hazırladığı oyunlar için kuralları çiğniyor"
      }
    },
    mail: {
      hi: "Merhaba,",
      hiName: "Merhaba %s,",
      newLinkSubject: "Logicers: %s kodlu oyunun için yeni düzenleme bağlantısı",
      newLinkBody: "%s\n\n«%s» adlı oyununun (kod: %s) yeni düzenleme bağlantısı aşağıda:\n\n%s\n\nEski bağlantı artık çalışmıyor. Yenisini güvenli bir yerde sakla, çünkü bağlantıya sahip olan herkes oyununu düzenleyebilir.\n\nLogicers\nlogicers.world@gmail.com",
      receiptSubject: "Logicers: %s kodlu oyunla ilgili bildirimini aldık",
      receiptBody: "%s\n\nLogicers'taki %s kodlu oyunla ilgili %s tarihli bildirimin için teşekkürler. Bildirimini bir insan okuyup ne yapılacağına karar verecek; kararı da sana e-postayla ileteceğiz.\n\nLogicers\nlogicers.world@gmail.com",
      decisionSubject: "Logicers: %s kodlu oyunla ilgili bildirimini karara bağladık",
      decisionBody: "%s\n\nLogicers'taki %s kodlu oyunla ilgili %s tarihli bildirimin için teşekkürler.\n\nKararımız: %s%s\n\nBu kararı bir makine değil, bir insan verdi. Katılmıyorsan bu e-postayı yanıtla, konuya yeniden bakacağız. Mahkemeye de başvurabilir ya da bir AB ülkesinde yaşıyorsan o ülkenin Dijital Hizmetler Koordinatörü'ne şikâyette bulunabilirsin (İtalya'da: AGCOM, agcom.it).\n\nLogicers\nlogicers.world@gmail.com",
      decisions: {
        stopped: "oyunu ve kopyalarını durdurduk. Artık oynanamaz, sunulamaz ve kopyalanamaz.",
        kept: "oyunu inceledik ve yayında bıraktık: yasaya ya da kurallarımıza aykırı bir şey bulmadık.",
        other: "aşağıda açıklıyoruz."
      },
      note: "\n\n%s"
    }
  }
};
