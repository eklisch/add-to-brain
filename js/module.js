// Add to Brain – Lernmodule
// Aufbau eines Moduls:
//   id, titel, kurz, minuten, bloecke (h = Zwischenüberschrift, p = Absatz, liste = Aufzählung), quiz (3 Fragen)
// In Texten wird **fett** als fette Schrift angezeigt.
// Hinweis zum Vorlesen: Abkürzungen mit Punkt (z. B., ca.) vermeiden, damit Sätze richtig erkannt werden.
window.MODULE = [
  {
    id: 'm1',
    titel: 'Grundbegriffe des E-Commerce',
    kurz: 'Shop, Marktplatz, Bestellung, Versand, Marketing, Kennzahlen und Recht im Überblick.',
    minuten: 12,
    bloecke: [
      { h: 'Worum es geht' },
      { p: 'Dieser Text erklärt die Begriffe, die im Praktikum, in der Umschulung und im Vorstellungsgespräch immer wieder vorkommen. Er folgt dem Weg einer Bestellung: vom Shop über den Kauf und den Versand bis zur Auswertung.' },

      { h: 'Shop und Sortiment' },
      { p: '**E-Commerce** heißt elektronischer Handel. Waren oder Dienstleistungen werden über das Internet verkauft. Verkauft ein Unternehmen an Privatleute, nennt man das **B2C**, also Business to Consumer. Verkauft es an andere Firmen, heißt es **B2B**, also Business to Business.' },
      { p: 'Der **Online-Shop** ist die eigene Verkaufsseite eines Händlers. Gebaut wird er mit einem **Shopsystem**, also einer Software für Online-Shops. Bekannte Shopsysteme sind Shopify, Shopware und WooCommerce.' },
      { p: 'Ein **Marktplatz** ist eine große Plattform, auf der viele Händler gleichzeitig verkaufen, zum Beispiel Amazon, eBay oder Kaufland. Der Händler zahlt dafür Gebühren, erreicht aber sehr viele Kunden. Wer über den eigenen Shop und Marktplätze zugleich verkauft, betreibt **Multichannel**-Vertrieb.' },
      { p: 'Das **Sortiment** sind alle Produkte, die ein Händler anbietet. Zu jedem Produkt gehören **Produktdaten**: Name, Beschreibung, Bilder, Preis, Größe, Farbe, Gewicht und Artikelnummer. Gibt es ein Produkt in mehreren Größen oder Farben, spricht man von **Varianten**. Gute Produktdaten sind wichtig, weil der Kunde die Ware nicht anfassen kann.' },
      { p: 'Bei vielen Produkten werden die Daten in einem **PIM** gepflegt, dem Produktinformationsmanagement. Von dort gehen sie automatisch in den Shop und auf die Marktplätze. Die **Warenwirtschaft**, oft auch ERP genannt, verwaltet Lagerbestand, Einkauf, Bestellungen und Rechnungen.' },

      { h: 'Von der Bestellung bis zur Lieferung' },
      { liste: [
        'Der Kunde legt Produkte in den **Warenkorb**.',
        'Im **Checkout**, also an der Kasse, gibt er Adresse und Versandart an und wählt eine Zahlart, zum Beispiel PayPal, Kreditkarte, Rechnung oder Vorkasse.',
        'Er bekommt automatisch eine Bestellbestätigung per E-Mail.',
        'Im Lager wird die Ware zusammengesucht. Das heißt **Kommissionierung**. Danach wird sie verpackt und an den Paketdienst übergeben.',
        'Der Kunde bekommt eine Sendungsnummer und kann das Paket verfolgen.'
      ] },
      { p: 'Alles, was nach dem Kauf mit der Ware passiert, heißt **Fulfillment**: Lagern, Kommissionieren, Verpacken, Versenden und Retouren bearbeiten. Schickt der Kunde Ware zurück, ist das eine **Retoure**. Retouren kosten den Händler viel Geld, vor allem in der Mode.' },

      { h: 'Kunden gewinnen' },
      { p: '**Online-Marketing** umfasst alles, was Menschen auf den Shop aufmerksam macht und zum Kauf bringt.' },
      { liste: [
        '**SEO** heißt Suchmaschinenoptimierung. Der Shop wird so gestaltet, dass er bei Google weit oben in den normalen Ergebnissen steht. Das kostet keine Klickgebühren, wirkt aber erst nach Wochen oder Monaten.',
        '**SEA** heißt Suchmaschinenwerbung. Das sind bezahlte Anzeigen bei Google. Der Händler zahlt pro Klick. SEA wirkt sofort, kostet aber laufend Geld.',
        'Beim **Newsletter** bekommen Kunden regelmäßig E-Mails, wenn sie dem ausdrücklich zugestimmt haben.',
        'Social-Media-Marketing bedeutet Werbung und Beiträge auf Instagram, TikTok oder Facebook.'
      ] },

      { h: 'Kennzahlen' },
      { p: '**Kennzahlen**, auf Englisch KPIs, zeigen in Zahlen, wie erfolgreich ein Shop ist. Der **Traffic** ist die Zahl der Besucher. Die **Conversion Rate** zeigt, wie viel Prozent der Besucher etwas kaufen. Kaufen 200 von 10.000 Besuchern, liegt sie bei 2 Prozent. Der **Warenkorbwert** ist der Betrag, den ein Kunde pro Bestellung im Schnitt ausgibt. Die **Retourenquote** zeigt, wie viel Prozent der Bestellungen zurückkommen.' },
      { p: 'Den Umsatz kann man sich als einfache Rechnung merken: Besucher mal Conversion Rate mal Warenkorbwert. Will ein Shop mehr Umsatz, kann er also mehr Besucher holen, mehr Besucher zum Kauf bringen oder den Warenkorbwert erhöhen.' },

      { h: 'Recht und Kundenservice' },
      { p: 'Beim **Widerrufsrecht** dürfen Privatkunden online gekaufte Ware in der Regel innerhalb von 14 Tagen ohne Begründung zurückgeben. Im **Impressum** steht, wer hinter dem Shop steht. Die **DSGVO**, die Datenschutz-Grundverordnung, regelt den Schutz von Kundendaten. Für einen Newsletter braucht es zum Beispiel die ausdrückliche Zustimmung des Kunden.' },
      { p: 'Der Kundenservice beantwortet Fragen per E-Mail, Telefon oder Chat, kümmert sich um Reklamationen und hilft bei Retouren. Hier helfen Erfahrungen aus dem Verkauf und dem Callcenter direkt weiter.' }
    ],
    quiz: [
      {
        frage: 'Ein Händler verkauft über seinen eigenen Shop und zusätzlich über Amazon und eBay. Wie nennt man das?',
        antworten: ['Multichannel-Vertrieb', 'Fulfillment', 'B2B-Handel', 'Kommissionierung'],
        richtig: 0,
        erklaerung: 'Multichannel bedeutet Verkauf über mehrere Kanäle gleichzeitig.'
      },
      {
        frage: 'Ein Shop hat 5.000 Besucher, 100 davon kaufen. Wie hoch ist die Conversion Rate?',
        antworten: ['5 Prozent', '2 Prozent', '50 Prozent', '0,5 Prozent'],
        richtig: 1,
        erklaerung: '100 ÷ 5.000 × 100 = 2 Prozent.'
      },
      {
        frage: 'Was ist der Unterschied zwischen SEO und SEA?',
        antworten: [
          'SEO ist bezahlte Werbung, SEA ist kostenlos',
          'SEO bringt den Shop ohne Klickgebühren in die normalen Ergebnisse, SEA sind bezahlte Anzeigen',
          'Beide bedeuten dasselbe',
          'SEO ist für Marktplätze, SEA für den eigenen Shop'
        ],
        richtig: 1,
        erklaerung: 'SEO wirkt langsam und ohne Kosten pro Klick, SEA wirkt sofort und kostet pro Klick.'
      }
    ]
  },
  {
    id: 'm2',
    titel: 'Sortiment und Produktdaten',
    kurz: 'Gute Produktbeschreibungen, Bilder, Varianten und Pflege großer Sortimente.',
    minuten: 9,
    bloecke: [
      { h: 'Warum Produktdaten so wichtig sind' },
      { p: 'Im Laden kann man ein Produkt anfassen, drehen und ausprobieren. Im Online-Shop geht das nicht. Der Kunde entscheidet nur anhand dessen, was er sieht und liest. Deshalb sind gute **Produktdaten** das Schaufenster des Online-Handels. Sind sie unvollständig oder falsch, kauft der Kunde nicht – oder er kauft und schickt die Ware zurück.' },

      { h: 'Was zu einem Produkt gehört' },
      { liste: [
        'Ein klarer **Produkttitel**, der sagt, was es ist, zum Beispiel „Gameboy Color, lila, generalüberholt“.',
        'Eine **Produktbeschreibung**, die Nutzen und Eigenschaften erklärt.',
        'Gute **Produktbilder** aus mehreren Blickwinkeln, möglichst auf ruhigem Hintergrund.',
        'Technische Angaben wie Maße, Gewicht, Material oder Farbe.',
        'Der **Preis** und gegebenenfalls der Grundpreis, also der Preis pro Kilogramm oder Liter.',
        'Eine eindeutige **Artikelnummer**, oft auch **SKU** genannt, und bei Markenware die **EAN**, die Nummer unter dem Strichcode.',
        'Angaben zu Lieferzeit und Verfügbarkeit.'
      ] },

      { h: 'Gute Produkttexte schreiben' },
      { p: 'Ein guter Produkttext beantwortet die Fragen des Kunden, bevor er sie stellt. Er beginnt mit dem wichtigsten Nutzen, nicht mit technischen Details. Danach folgen die Eigenschaften, gerne als kurze Aufzählung. Wichtig ist, dass der Text ehrlich ist. Wer übertreibt, bekommt Retouren und schlechte Bewertungen.' },
      { p: 'Für Suchmaschinen sollte der Text die Wörter enthalten, nach denen Kunden suchen. Diese Wörter heißen **Keywords**. Ein Text nur für Google, voller Wiederholungen, schreckt aber Menschen ab. Der Mensch kommt immer zuerst.' },

      { h: 'Varianten und Kategorien' },
      { p: 'Gibt es ein T-Shirt in fünf Größen und drei Farben, ist das ein **Hauptartikel** mit fünfzehn **Varianten**. Jede Variante hat eine eigene Artikelnummer und einen eigenen Lagerbestand. Der Kunde sieht aber nur eine Produktseite und wählt Größe und Farbe aus.' },
      { p: 'Damit Kunden Produkte finden, wird das Sortiment in **Kategorien** eingeteilt, zum Beispiel Herren, Damen und Kinder, darunter T-Shirts, Hosen und Jacken. Zusätzlich helfen **Filter** wie Preis, Farbe oder Marke. Eine gute Kategorienstruktur ist wie eine gute Beschilderung im Kaufhaus.' },

      { h: 'Sortiment planen' },
      { p: 'Das **Sortiment** hat eine Breite und eine Tiefe. Die **Sortimentsbreite** ist die Zahl der verschiedenen Warengruppen, zum Beispiel Spielkonsolen, Spiele und Zubehör. Die **Sortimentstiefe** ist die Auswahl innerhalb einer Gruppe, zum Beispiel zwanzig verschiedene Controller. Ein Fachhändler hat oft ein schmales, aber tiefes Sortiment.' },
      { p: 'Große Händler pflegen ihre Produktdaten in einem **PIM**, dem Produktinformationsmanagement. Von dort werden sie automatisch in den Shop und auf Marktplätze verteilt. Daten, die der Hersteller liefert, heißen **Herstellerdaten**. Sie werden oft importiert und dann ergänzt.' }
    ],
    quiz: [
      { frage: 'Ein T-Shirt gibt es in vier Größen und zwei Farben. Wie viele Varianten hat der Artikel?', antworten: ['6', '8', '2', '4'], richtig: 1, erklaerung: 'Vier Größen mal zwei Farben ergibt acht Varianten, jede mit eigener Artikelnummer und eigenem Bestand.' },
      { frage: 'Was beschreibt die Sortimentstiefe?', antworten: ['Die Zahl der verschiedenen Warengruppen', 'Die Auswahl innerhalb einer Warengruppe', 'Die Größe des Lagers', 'Die Zahl der Kategorien im Menü'], richtig: 1, erklaerung: 'Tiefe ist die Auswahl innerhalb einer Gruppe, Breite die Zahl der verschiedenen Gruppen.' },
      { frage: 'Womit sollte eine gute Produktbeschreibung beginnen?', antworten: ['Mit den technischen Daten', 'Mit möglichst vielen Keywords', 'Mit dem wichtigsten Nutzen für den Kunden', 'Mit dem Preis'], richtig: 2, erklaerung: 'Zuerst der Nutzen, dann die Eigenschaften. Keywords sind wichtig, aber der Text ist für Menschen.' }
    ]
  },
  {
    id: 'm3',
    titel: 'Bestellung und Zahlarten',
    kurz: 'Der Bestellprozess im Detail, der Kaufvertrag im Internet und die Zahlarten.',
    minuten: 9,
    bloecke: [
      { h: 'Wie im Internet ein Kaufvertrag entsteht' },
      { p: 'Ein **Kaufvertrag** entsteht durch zwei übereinstimmende Willenserklärungen: den **Antrag** und die **Annahme**. Im Online-Shop ist das Produktangebot meist noch kein Antrag, sondern nur eine Einladung an den Kunden, selbst ein Angebot zu machen. Juristen nennen das **Aufforderung zur Abgabe eines Angebots**.' },
      { p: 'Der Kunde gibt mit dem Klick auf den Bestellknopf seinen Antrag ab. Der Händler nimmt ihn an, zum Beispiel mit einer Auftragsbestätigung oder indem er die Ware verschickt. Die automatische Bestellbestätigung direkt nach dem Kauf bestätigt oft nur den Eingang der Bestellung. Wann genau der Vertrag zustande kommt, steht in den **AGB** des Shops.' },

      { h: 'Der Bestellprozess' },
      { p: 'Der Weg vom Warenkorb bis zur fertigen Bestellung heißt **Checkout**. Je einfacher er ist, desto weniger Kunden brechen ab. Bricht ein Kunde ab, obwohl schon Ware im Warenkorb liegt, spricht man von einem **Warenkorbabbruch**. Häufige Gründe sind überraschende Versandkosten, ein Zwang zum Kundenkonto oder fehlende Zahlarten.' },
      { liste: [
        'Warenkorb prüfen.',
        'Als Gast bestellen oder anmelden.',
        'Liefer- und Rechnungsadresse eingeben.',
        'Versandart und Zahlart wählen.',
        'Bestellung prüfen und auf den Bestellknopf klicken.'
      ] },
      { p: 'Der Bestellknopf muss eindeutig zeigen, dass die Bestellung etwas kostet. Erlaubt ist zum Beispiel „zahlungspflichtig bestellen“ oder „jetzt kaufen“. Ein Knopf mit „weiter“ reicht nicht. Diese Regel heißt auch **Button-Lösung**.' },

      { h: 'Die wichtigsten Zahlarten' },
      { liste: [
        '**Vorkasse:** Der Kunde überweist zuerst, dann wird versendet. Sicher für den Händler, aber langsam für den Kunden.',
        '**PayPal und andere Bezahldienste:** schnell und beliebt, der Händler zahlt eine Gebühr pro Zahlung.',
        '**Kreditkarte:** international verbreitet, ebenfalls mit Gebühren für den Händler.',
        '**Lastschrift:** Der Händler zieht den Betrag vom Konto ein. Der Kunde kann der Abbuchung aber noch widersprechen.',
        '**Kauf auf Rechnung:** Der Kunde zahlt erst nach Erhalt der Ware. Sehr beliebt, aber mit dem Risiko, dass nicht gezahlt wird. Viele Händler geben dieses Risiko an Zahlungsdienstleister ab.',
        '**Nachnahme:** Der Kunde zahlt bei der Übergabe an den Paketboten. Heute selten.'
      ] },
      { p: 'Für den Händler ist die Wahl der Zahlarten ein Abwägen zwischen Kosten, Risiko und Kundenwunsch. Fehlt die Lieblingszahlart des Kunden, kauft er woanders. Das Risiko, dass ein Kunde nicht zahlt, heißt **Zahlungsausfallrisiko**.' },
      { p: 'Wichtig zu wissen: Händler müssen mindestens eine gängige Zahlart ohne Zusatzkosten anbieten. Für SEPA-Überweisung, SEPA-Lastschrift und gängige Kreditkarten dürfen sie keine Extragebühr verlangen.' }
    ],
    quiz: [
      { frage: 'Wer gibt im Online-Shop in der Regel den Antrag auf einen Kaufvertrag ab?', antworten: ['Der Händler mit der Produktseite', 'Der Kunde mit dem Klick auf den Bestellknopf', 'Der Paketdienst bei der Lieferung', 'Die Bank bei der Zahlung'], richtig: 1, erklaerung: 'Die Produktseite ist nur eine Aufforderung zur Abgabe eines Angebots. Der Antrag kommt vom Kunden, der Händler nimmt an.' },
      { frage: 'Welche Beschriftung des Bestellknopfs ist NICHT ausreichend?', antworten: ['zahlungspflichtig bestellen', 'jetzt kaufen', 'weiter'], richtig: 2, erklaerung: 'Nach der Button-Lösung muss klar sein, dass die Bestellung etwas kostet. „Weiter“ zeigt das nicht.' },
      { frage: 'Bei welcher Zahlart trägt der Händler das größte Zahlungsausfallrisiko, wenn er es nicht abgibt?', antworten: ['Vorkasse', 'Kauf auf Rechnung', 'Nachnahme', 'Kreditkarte'], richtig: 1, erklaerung: 'Bei Rechnungskauf bekommt der Kunde die Ware, bevor er zahlt. Deshalb nutzen viele Händler dafür Zahlungsdienstleister.' }
    ]
  },
  {
    id: 'm4',
    titel: 'Versand und Retouren',
    kurz: 'Versanddienstleister, Verpackung, Retourenabwicklung und wie man Retouren vermeidet.',
    minuten: 8,
    bloecke: [
      { h: 'Vom Lager zum Kunden' },
      { p: 'Nach der Bestellung beginnt die **Logistik**. Im Lager wird die Ware zusammengesucht, das heißt **Kommissionierung**. Dann wird sie verpackt, mit einem Versandetikett beklebt und an einen **Versanddienstleister** übergeben. Bekannte Versanddienstleister in Deutschland sind DHL, Hermes, DPD, GLS und UPS.' },
      { p: 'Der Kunde bekommt eine **Sendungsnummer** und kann sein Paket verfolgen. Das nennt man **Sendungsverfolgung** oder Tracking. Wer selbst kein Lager führen will, gibt Lagerung und Versand an einen **Fulfillment-Dienstleister** ab.' },

      { h: 'Versandkosten und Lieferzeit' },
      { p: 'Versandkosten sind für Kunden ein häufiger Grund, nicht zu kaufen. Viele Shops bieten deshalb **kostenlosen Versand ab einem Mindestbestellwert** an, zum Beispiel ab 50 Euro. Das erhöht oft den Warenkorbwert, weil Kunden noch etwas dazulegen.' },
      { p: 'Die **Lieferzeit** muss im Shop klar angegeben sein. Versprochene Lieferzeiten einzuhalten ist wichtig für gute Bewertungen.' },

      { h: 'Verpackung' },
      { p: 'Die Verpackung soll die Ware schützen, aber nicht unnötig groß sein. Zu große Kartons kosten mehr Versand, mehr Material und ärgern umweltbewusste Kunden. Händler, die verpackte Ware an Privatkunden schicken, müssen sich nach dem **Verpackungsgesetz** im Register **LUCID** eintragen und für die Entsorgung ihrer Verpackungen bezahlen.' },

      { h: 'Retouren' },
      { p: 'Eine **Retoure** ist eine Rücksendung durch den Kunden. Meist nutzt der Kunde sein **Widerrufsrecht**: 14 Tage, ohne Begründung. Der Händler muss dann den Kaufpreis und die ursprünglichen Standard-Versandkosten innerhalb von 14 Tagen zurückzahlen. Die Kosten der Rücksendung darf er dem Kunden auferlegen, wenn er vorher darüber informiert hat.' },
      { liste: [
        'Die Retoure kommt im Lager an und wird erfasst.',
        'Die Ware wird geprüft: neuwertig, beschädigt oder benutzt?',
        'Einwandfreie Ware kommt zurück ins Lager und kann wieder verkauft werden.',
        'Der Kunde bekommt sein Geld zurück und eine Bestätigung.'
      ] },

      { h: 'Retouren vermeiden' },
      { p: 'Retouren kosten Geld für Versand, Prüfung und Wiedereinlagerung. Manche Ware kann gar nicht mehr verkauft werden. Händler versuchen deshalb, Retouren zu vermeiden: mit genauen Produktbeschreibungen, guten Bildern, **Größentabellen**, ehrlichen Kundenbewertungen und gut verpackter Ware. Die **Retourengründe**, die Kunden angeben, werden ausgewertet, um Probleme zu finden.' }
    ],
    quiz: [
      { frage: 'Wie nennt man das Zusammensuchen der Ware für eine Bestellung im Lager?', antworten: ['Kommissionierung', 'Retoure', 'Tracking', 'Fulfillment'], richtig: 0, erklaerung: 'Kommissionierung ist das Zusammenstellen einer Bestellung im Lager. Fulfillment umfasst den ganzen Ablauf nach dem Kauf.' },
      { frage: 'Ein Kunde widerruft seinen Kauf. Was muss der Händler zurückzahlen?', antworten: ['Nur den Kaufpreis', 'Kaufpreis und ursprüngliche Standard-Versandkosten', 'Gar nichts, wenn die Ware benutzt wurde', 'Kaufpreis plus Rücksendekosten in jedem Fall'], richtig: 1, erklaerung: 'Kaufpreis und Standard-Hinsendekosten müssen zurück. Rücksendekosten darf der Händler dem Kunden auferlegen, wenn er vorher informiert hat.' },
      { frage: 'Was hilft am meisten, Retouren in der Mode zu vermeiden?', antworten: ['Höhere Preise', 'Genaue Größentabellen und ehrliche Produktbilder', 'Längere Lieferzeiten', 'Weniger Zahlarten'], richtig: 1, erklaerung: 'Viele Retouren entstehen, weil die Größe nicht passt oder die Ware anders aussieht als erwartet.' }
    ]
  },
  {
    id: 'm5',
    titel: 'Online-Marketing',
    kurz: 'SEO, SEA, Social Media, Newsletter und Kennzahlen im Marketing genauer erklärt.',
    minuten: 9,
    bloecke: [
      { h: 'Worum es im Online-Marketing geht' },
      { p: 'Der schönste Shop nützt nichts, wenn niemand ihn findet. **Online-Marketing** sorgt dafür, dass Menschen auf den Shop aufmerksam werden, ihn besuchen und dort kaufen. Dabei unterscheidet man bezahlte und unbezahlte Wege.' },

      { h: 'Suchmaschinen: SEO und SEA' },
      { p: '**SEO**, die Suchmaschinenoptimierung, ist der unbezahlte Weg. Mit guten Texten, passenden **Keywords**, einer schnellen Seite und einer klaren Struktur soll der Shop in den normalen Google-Ergebnissen weit oben stehen. SEO wirkt langsam, oft erst nach Monaten, dafür dauerhaft.' },
      { p: '**SEA**, die Suchmaschinenwerbung, ist der bezahlte Weg. Der Händler schaltet Anzeigen bei Google, die über den normalen Ergebnissen erscheinen. Bezahlt wird meist pro Klick. Dieser Preis heißt **CPC**, Cost per Click. SEA wirkt sofort, hört aber auch sofort auf, wenn man nicht mehr zahlt.' },
      { p: 'Eine besondere Form ist **Google Shopping**. Dort erscheinen Produkte mit Bild und Preis direkt in der Suche. Dafür braucht der Shop saubere Produktdaten, die als **Produktfeed** an Google übertragen werden.' },

      { h: 'Social Media und Influencer' },
      { p: 'Auf Instagram, TikTok, Facebook oder Pinterest erreichen Händler Kunden mit Beiträgen, Videos und Werbeanzeigen. Social Media eignet sich besonders, um eine Marke bekannt zu machen und eine Gemeinschaft aufzubauen.' },
      { p: '**Influencer** sind Personen mit vielen Followern, die Produkte vorstellen. Bekommen sie dafür Geld oder Produkte, müssen sie den Beitrag deutlich als **Werbung** oder **Anzeige** kennzeichnen.' },

      { h: 'Newsletter und Affiliate' },
      { p: 'Ein **Newsletter** erreicht Kunden direkt im Postfach. Er darf nur an Personen gehen, die ausdrücklich zugestimmt haben. Dafür nutzt man das **Double-Opt-in**: Nach der Anmeldung bekommt die Person eine E-Mail und bestätigt per Klick, dass sie den Newsletter wirklich möchte.' },
      { p: 'Beim **Affiliate-Marketing** werben andere Webseiten für den Shop und bekommen eine **Provision**, wenn über ihren Link gekauft wird. Der Händler zahlt also nur für echten Erfolg.' },

      { h: 'Erfolg messen' },
      { p: 'Im Marketing wird viel gemessen. Die **Klickrate**, auf Englisch CTR, zeigt, wie viel Prozent der Menschen, die eine Anzeige sehen, darauf klicken. Formel: Klicks geteilt durch Einblendungen mal 100. Der **ROAS**, Return on Ad Spend, zeigt, wie viel Umsatz ein Euro Werbung bringt. Formel: Umsatz geteilt durch Werbekosten. Ein ROAS von 4 bedeutet: Für jeden Euro Werbung kommen 4 Euro Umsatz herein.' }
    ],
    quiz: [
      { frage: 'Eine Anzeige wird 2.000-mal eingeblendet und 40-mal angeklickt. Wie hoch ist die Klickrate?', antworten: ['0,2 Prozent', '2 Prozent', '20 Prozent', '5 Prozent'], richtig: 1, erklaerung: '40 geteilt durch 2.000 mal 100 ergibt 2 Prozent.' },
      { frage: 'Wofür steht Double-Opt-in beim Newsletter?', antworten: ['Der Newsletter wird zweimal verschickt', 'Die Person bestätigt ihre Anmeldung noch einmal per Klick in einer E-Mail', 'Man braucht zwei E-Mail-Adressen', 'Der Händler muss zweimal zustimmen'], richtig: 1, erklaerung: 'Erst die Anmeldung, dann die Bestätigung per Link. So ist sicher, dass die Person den Newsletter wirklich will.' },
      { frage: 'Für 500 Euro Werbung kommen 2.000 Euro Umsatz herein. Wie hoch ist der ROAS?', antworten: ['0,25', '4', '1.500', '25'], richtig: 1, erklaerung: '2.000 geteilt durch 500 ergibt 4. Jeder Werbe-Euro bringt 4 Euro Umsatz.' }
    ]
  },
  {
    id: 'm6',
    titel: 'Kennzahlen rechnen',
    kurz: 'Conversion Rate, Warenkorbwert, Retourenquote und Umsatz mit Beispielen zum Nachrechnen.',
    minuten: 9,
    bloecke: [
      { h: 'Warum Kennzahlen' },
      { p: 'Ob ein Shop gut läuft, sieht man nicht am Gefühl, sondern an Zahlen. **Kennzahlen**, auf Englisch **KPIs**, machen Erfolg messbar und zeigen, wo man etwas verbessern kann. Die Formeln sind einfach. Mit etwas Übung rechnet man sie im Kopf.' },

      { h: 'Conversion Rate' },
      { p: 'Die **Conversion Rate** zeigt, wie viel Prozent der Besucher etwas kaufen. Formel: Bestellungen geteilt durch Besucher mal 100.' },
      { p: 'Beispiel: Ein Shop hat an einem Tag 800 Besucher und 16 Bestellungen. 16 geteilt durch 800 ist 0,02. Mal 100 ergibt 2 Prozent. Im Online-Handel sind Werte zwischen einem und drei Prozent üblich.' },

      { h: 'Durchschnittlicher Warenkorbwert' },
      { p: 'Der **durchschnittliche Warenkorbwert** zeigt, wie viel ein Kunde pro Bestellung ausgibt. Formel: Umsatz geteilt durch Zahl der Bestellungen.' },
      { p: 'Beispiel: 16 Bestellungen bringen zusammen 960 Euro Umsatz. 960 geteilt durch 16 ergibt 60 Euro pro Bestellung.' },

      { h: 'Retourenquote' },
      { p: 'Die **Retourenquote** zeigt, wie viel Prozent der Bestellungen zurückkommen. Formel: Retouren geteilt durch Bestellungen mal 100.' },
      { p: 'Beispiel: Von 200 Bestellungen kommen 30 zurück. 30 geteilt durch 200 ist 0,15. Mal 100 ergibt 15 Prozent.' },

      { h: 'Die Umsatzformel' },
      { p: 'Umsatz lässt sich in drei Teile zerlegen: **Besucher mal Conversion Rate mal Warenkorbwert**. Mit 800 Besuchern, 2 Prozent Conversion Rate und 60 Euro Warenkorbwert ergibt sich: 800 mal 0,02 mal 60 gleich 960 Euro.' },
      { p: 'Diese Formel zeigt die drei Stellschrauben eines Shops. Er kann mehr Besucher holen, zum Beispiel mit Marketing. Er kann mehr Besucher zum Kauf bringen, zum Beispiel mit einem einfacheren Checkout. Oder er kann den Warenkorbwert erhöhen, zum Beispiel mit passenden Produktempfehlungen.' },

      { h: 'Weitere Kennzahlen' },
      { liste: [
        'Die **Absprungrate** zeigt, wie viele Besucher nach nur einer Seite wieder gehen.',
        'Die **Kundenakquisitionskosten** zeigen, was es kostet, einen neuen Kunden zu gewinnen.',
        'Die **Wiederkaufrate** zeigt, wie viele Kunden ein zweites Mal bestellen.',
        'Der **Rohertrag** ist der Umsatz minus Wareneinsatz, also was nach dem Einkauf der Ware übrig bleibt.'
      ] }
    ],
    quiz: [
      { frage: 'Ein Shop hat 1.500 Besucher und 45 Bestellungen. Wie hoch ist die Conversion Rate?', antworten: ['3 Prozent', '4,5 Prozent', '0,3 Prozent', '33 Prozent'], richtig: 0, erklaerung: '45 geteilt durch 1.500 ergibt 0,03, mal 100 sind 3 Prozent.' },
      { frage: '40 Bestellungen bringen 2.000 Euro Umsatz. Wie hoch ist der durchschnittliche Warenkorbwert?', antworten: ['40 Euro', '50 Euro', '80 Euro', '20 Euro'], richtig: 1, erklaerung: '2.000 geteilt durch 40 ergibt 50 Euro pro Bestellung.' },
      { frage: 'Von 400 Bestellungen kommen 60 zurück. Wie hoch ist die Retourenquote?', antworten: ['6 Prozent', '15 Prozent', '60 Prozent', '25 Prozent'], richtig: 1, erklaerung: '60 geteilt durch 400 ergibt 0,15, mal 100 sind 15 Prozent.' }
    ]
  },
  {
    id: 'm7',
    titel: 'Recht im Online-Handel',
    kurz: 'Widerrufsrecht, Gewährleistung, Preisangaben, Impressum, AGB und Datenschutz.',
    minuten: 10,
    bloecke: [
      { h: 'Warum es so viele Regeln gibt' },
      { p: 'Beim Online-Kauf sieht der Kunde die Ware nicht vorher und kennt den Händler oft nicht. Deshalb schützt das Gesetz Verbraucher im Internet besonders. Für Kaufleute im E-Commerce ist es wichtig, diese Regeln zu kennen. Fehler können zu **Abmahnungen** führen, also kostenpflichtigen Aufforderungen, einen Verstoß zu beenden.' },

      { h: 'Widerrufsrecht' },
      { p: 'Verbraucher dürfen online gekaufte Ware innerhalb von **14 Tagen** ohne Begründung zurückgeben. Die Frist beginnt in der Regel, wenn die Ware beim Kunden ankommt. Der Händler muss vorher in einer **Widerrufsbelehrung** darüber informieren. Fehlt die Belehrung, verlängert sich die Frist deutlich.' },
      { p: 'Es gibt Ausnahmen. Kein Widerrufsrecht besteht zum Beispiel bei Waren, die nach Kundenwunsch angefertigt wurden, bei schnell verderblichen Lebensmitteln oder bei versiegelten Hygieneartikeln, deren Siegel geöffnet wurde.' },

      { h: 'Gewährleistung' },
      { p: 'Widerruf und Gewährleistung werden oft verwechselt. Beim **Widerruf** braucht der Kunde keinen Grund. Bei der **Gewährleistung** hat die Ware einen **Mangel**, sie ist also kaputt oder anders als vereinbart. Bei neuer Ware haftet der Händler zwei Jahre lang für Mängel, die schon bei der Übergabe vorhanden waren.' },
      { p: 'Der Kunde hat zuerst Anspruch auf **Nacherfüllung**: Reparatur oder Ersatz. Klappt das nicht, kann er vom Vertrag zurücktreten oder den Preis mindern. Im ersten Jahr nach dem Kauf wird vermutet, dass der Mangel schon bei der Übergabe da war. Die **Garantie** ist dagegen ein freiwilliges Versprechen, meist vom Hersteller.' },

      { h: 'Preise richtig angeben' },
      { p: 'Nach der **Preisangabenverordnung** müssen Preise für Verbraucher immer als **Gesamtpreis inklusive Umsatzsteuer** angegeben werden. Kommen Versandkosten dazu, muss darauf deutlich hingewiesen werden. Bei Waren, die nach Gewicht oder Menge verkauft werden, gehört der **Grundpreis** dazu, zum Beispiel der Preis pro Kilogramm.' },
      { p: 'Wer mit einer Preissenkung wirbt, muss als alten Preis den niedrigsten Preis der letzten 30 Tage angeben. So sollen Kunden vor künstlich hohen Streichpreisen geschützt werden.' },

      { h: 'Impressum, AGB und Datenschutz' },
      { liste: [
        'Das **Impressum** nennt, wer hinter dem Shop steht, mit Name, Anschrift und Kontakt. Es muss leicht zu finden sein.',
        'Die **AGB**, die Allgemeinen Geschäftsbedingungen, regeln Lieferung, Zahlung und Vertragsschluss. Sie dürfen den Kunden nicht unangemessen benachteiligen.',
        'Die **Datenschutzerklärung** erklärt, welche Daten der Shop sammelt und wofür. Grundlage ist die **DSGVO**, die Datenschutz-Grundverordnung.',
        'Für Cookies, die nicht technisch notwendig sind, braucht der Shop die Einwilligung des Besuchers, meist über ein Cookie-Banner.'
      ] }
    ],
    quiz: [
      { frage: 'Ein Kunde gefällt die Farbe einer Jacke nicht. Welches Recht nutzt er, wenn er sie zurückschickt?', antworten: ['Gewährleistung', 'Widerrufsrecht', 'Garantie', 'Nacherfüllung'], richtig: 1, erklaerung: 'Die Jacke ist nicht kaputt, sie gefällt nur nicht. Dafür ist das Widerrufsrecht da, ohne Begründung innerhalb von 14 Tagen.' },
      { frage: 'Wie lange haftet ein Händler bei neuer Ware für Mängel, die bei der Übergabe schon vorhanden waren?', antworten: ['14 Tage', '6 Monate', '2 Jahre', '5 Jahre'], richtig: 2, erklaerung: 'Die gesetzliche Gewährleistung beträgt bei neuer Ware zwei Jahre.' },
      { frage: 'Wie müssen Preise für Verbraucher angegeben werden?', antworten: ['Netto ohne Umsatzsteuer', 'Als Gesamtpreis inklusive Umsatzsteuer', 'Nur auf Nachfrage', 'In Dollar und Euro'], richtig: 1, erklaerung: 'Verbraucher müssen den Endpreis sehen, also inklusive Umsatzsteuer, mit Hinweis auf zusätzliche Versandkosten.' }
    ]
  },
  {
    id: 'm8',
    titel: 'Kundenservice und Kommunikation',
    kurz: 'Kundenanfragen beantworten, Reklamationen lösen, schwierige Gespräche führen.',
    minuten: 8,
    bloecke: [
      { h: 'Warum Kundenservice so wichtig ist' },
      { p: 'Im Online-Handel gibt es keinen Verkäufer im Laden. Der **Kundenservice** ist oft der einzige persönliche Kontakt zwischen Kunde und Shop. Wie er reagiert, entscheidet, ob ein Kunde wiederkommt und welche Bewertung er schreibt. Ein zufriedener Kunde nach einem gelösten Problem ist oft treuer als ein Kunde, der nie ein Problem hatte.' },

      { h: 'Die Kanäle' },
      { p: 'Kunden melden sich per E-Mail, Telefon, Chat, über Kontaktformulare oder in sozialen Netzwerken. Viele Fragen wiederholen sich, zum Beispiel nach dem Lieferstatus oder der Rücksendung. Dafür gibt es eine **FAQ-Seite** mit häufigen Fragen und Antworten. Im Kundenservice helfen **Textbausteine**, also vorbereitete Antworten, die man an den einzelnen Fall anpasst.' },

      { h: 'Gute Antworten schreiben' },
      { liste: [
        'Schnell antworten, am besten innerhalb eines Werktags.',
        'Den Kunden mit Namen ansprechen und freundlich bleiben.',
        'Für die Nachricht danken und das Anliegen in eigenen Worten wiederholen. So merkt der Kunde, dass er verstanden wurde.',
        'Eine konkrete Lösung anbieten und sagen, was als Nächstes passiert.',
        'Kurze Sätze schreiben und Fachwörter vermeiden.',
        'Mit einem freundlichen Gruß und dem eigenen Namen abschließen.'
      ] },

      { h: 'Reklamationen' },
      { p: 'Eine **Reklamation** ist eine Beanstandung, weil die Ware einen Mangel hat oder falsch geliefert wurde. Hier greift die **Gewährleistung**. Der Kundenservice klärt, was genau defekt ist, bittet bei Bedarf um ein Foto und bietet Reparatur oder Ersatz an. Bei kleinen Beträgen schicken viele Händler direkt Ersatz, weil das günstiger ist als eine Rücksendung.' },

      { h: 'Schwierige Gespräche' },
      { p: 'Manche Kunden sind verärgert oder unfreundlich. Wichtig ist, den Ärger nicht persönlich zu nehmen. Der Kunde ist über die Situation verärgert, nicht über dich. Hilfreich ist, zuerst zuzuhören, Verständnis zu zeigen und dann sachlich nach einer Lösung zu suchen. Ein Satz wie „Ich verstehe, dass das ärgerlich ist“ entschärft viele Gespräche.' },
      { p: 'Auch auf **Kundenbewertungen** sollte der Shop reagieren, besonders auf kritische. Eine sachliche, freundliche Antwort zeigt allen anderen Lesern, dass der Shop sich kümmert.' }
    ],
    quiz: [
      { frage: 'Was ist ein guter erster Schritt bei einer verärgerten Kundin am Telefon?', antworten: ['Sofort die Rechtslage erklären', 'Zuhören und Verständnis zeigen', 'Das Gespräch an die Chefin weitergeben', 'Auf die AGB verweisen'], richtig: 1, erklaerung: 'Erst zuhören und Verständnis zeigen, dann sachlich eine Lösung suchen.' },
      { frage: 'Ein Kunde meldet, dass sein neuer Mixer nach einer Woche nicht mehr funktioniert. Worum handelt es sich?', antworten: ['Um einen Widerruf', 'Um eine Reklamation wegen eines Mangels', 'Um eine Garantieverlängerung', 'Um einen Warenkorbabbruch'], richtig: 1, erklaerung: 'Die Ware ist defekt, also ein Mangel. Das ist eine Reklamation, und es greift die Gewährleistung.' },
      { frage: 'Wofür nutzt der Kundenservice Textbausteine?', antworten: ['Um Kunden nicht antworten zu müssen', 'Als vorbereitete Antworten, die an den einzelnen Fall angepasst werden', 'Für Werbung im Newsletter', 'Für die Produktbeschreibung'], richtig: 1, erklaerung: 'Textbausteine sparen Zeit bei häufigen Fragen, werden aber immer an den Kunden angepasst.' }
    ]
  },
  {
    id: 'm9',
    titel: 'Kaufmännische Grundlagen',
    kurz: 'Rechnung, Umsatzsteuer, Rabatt, Skonto und eine einfache Preiskalkulation.',
    minuten: 10,
    bloecke: [
      { h: 'Kaufleute rechnen' },
      { p: 'Auch im E-Commerce ist man Kauffrau oder Kaufmann. Dazu gehört, Preise zu kalkulieren, Rechnungen zu verstehen und mit Rabatten umzugehen. Keine Sorge: Für den Alltag reichen die Grundrechenarten und Prozentrechnung.' },

      { h: 'Netto, Brutto und Umsatzsteuer' },
      { p: 'Der **Nettopreis** ist der Preis ohne Steuer. Auf den Nettopreis kommt die **Umsatzsteuer**, auch **Mehrwertsteuer** genannt. Der Regelsteuersatz in Deutschland beträgt **19 Prozent**. Für bestimmte Waren wie die meisten Lebensmittel und Bücher gilt der ermäßigte Satz von **7 Prozent**. Nettopreis plus Umsatzsteuer ergibt den **Bruttopreis**.' },
      { p: 'Beispiel: Ein Controller kostet netto 25 Euro. 19 Prozent davon sind 4,75 Euro. Der Bruttopreis beträgt also 29,75 Euro. Umgekehrt rechnet man vom Brutto- zum Nettopreis, indem man durch 1,19 teilt.' },

      { h: 'Die Rechnung' },
      { p: 'Eine Rechnung muss bestimmte **Pflichtangaben** enthalten. Dazu gehören Name und Anschrift von Verkäufer und Käufer, die Steuernummer oder Umsatzsteuer-Identifikationsnummer des Verkäufers, das Rechnungsdatum, eine fortlaufende **Rechnungsnummer**, Menge und Bezeichnung der Ware, das Lieferdatum sowie Nettobetrag, Steuersatz und Steuerbetrag. Für kleine Beträge bis 250 Euro gelten vereinfachte Regeln.' },

      { h: 'Rabatt und Skonto' },
      { p: 'Ein **Rabatt** ist ein Preisnachlass, zum Beispiel für große Mengen oder treue Kunden. Er wird sofort vom Preis abgezogen. **Skonto** ist ein Nachlass für schnelles Bezahlen. Typisch ist: 2 Prozent Skonto bei Zahlung innerhalb von 10 Tagen, sonst ohne Abzug innerhalb von 30 Tagen.' },
      { p: 'Beispiel: Eine Rechnung über 500 Euro wird innerhalb von 10 Tagen bezahlt. 2 Prozent Skonto sind 10 Euro. Zu zahlen sind 490 Euro.' },

      { h: 'Eine einfache Preiskalkulation' },
      { p: 'Wie kommt ein Händler auf seinen Verkaufspreis? Vereinfacht so:' },
      { liste: [
        'Er startet mit dem **Einkaufspreis**, zum Beispiel 20 Euro für ein Spiel.',
        'Dazu kommen die **Bezugskosten**, etwa Fracht. Das ergibt den **Bezugspreis**, zum Beispiel 22 Euro.',
        'Dazu kommen die **Handlungskosten** für Miete, Personal, Shop und Marketing, zum Beispiel 25 Prozent. Das ergibt den **Selbstkostenpreis** von 27,50 Euro.',
        'Darauf kommt der **Gewinn**, zum Beispiel 20 Prozent. Das ergibt den **Nettoverkaufspreis** von 33 Euro.',
        'Zuletzt kommt die Umsatzsteuer von 19 Prozent. Der **Bruttoverkaufspreis** beträgt 39,27 Euro.'
      ] },
      { p: 'Viele Händler runden den Preis anschließend auf einen Schwellenpreis wie 39,99 Euro. In der Ausbildung lernst du die vollständige Kalkulation mit Rabatten und Skonto auf beiden Seiten.' }
    ],
    quiz: [
      { frage: 'Ein Produkt kostet netto 100 Euro. Wie hoch ist der Bruttopreis bei 19 Prozent Umsatzsteuer?', antworten: ['109 Euro', '119 Euro', '81 Euro', '190 Euro'], richtig: 1, erklaerung: '19 Prozent von 100 Euro sind 19 Euro. 100 plus 19 ergibt 119 Euro.' },
      { frage: 'Was ist Skonto?', antworten: ['Ein Nachlass für große Mengen', 'Ein Nachlass für schnelles Bezahlen', 'Eine Gebühr für späte Zahlung', 'Ein anderer Name für Umsatzsteuer'], richtig: 1, erklaerung: 'Skonto gibt es für Zahlung innerhalb einer kurzen Frist, zum Beispiel 2 Prozent innerhalb von 10 Tagen.' },
      { frage: 'Eine Rechnung über 800 Euro wird mit 2 Prozent Skonto bezahlt. Wie viel wird überwiesen?', antworten: ['784 Euro', '798 Euro', '760 Euro', '816 Euro'], richtig: 0, erklaerung: '2 Prozent von 800 Euro sind 16 Euro. 800 minus 16 ergibt 784 Euro.' }
    ]
  }
];
