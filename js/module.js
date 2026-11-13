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
  },
  {
    id: 'm10',
    titel: 'Shop gestalten und Nutzerverhalten auswerten',
    kurz: 'Shopsystem, Bedienbarkeit, Webanalyse und wie man mit Kennzahlen einen Shop Schritt für Schritt verbessert.',
    minuten: 11,
    bloecke: [
      { h: 'Der Shop als Verkaufsraum' },
      { p: 'Ein Onlineshop ist wie ein Laden, nur ohne Verkäuferin, die den Weg zeigt. Alles muss sich von selbst erklären. Kauffrauen und Kaufleute im E-Commerce programmieren den Shop meistens nicht selbst, aber sie **pflegen** ihn, planen neue Seiten und sagen der Technik, was verbessert werden soll.' },
      { p: 'Grundlage ist ein **Shopsystem**, zum Beispiel Shopware, Shopify, WooCommerce oder JTL. Das **Frontend** ist alles, was Kundinnen und Kunden sehen. Im **Backend** arbeitet das Team: Artikel anlegen, Preise ändern, Bestellungen bearbeiten, Gutscheine einrichten.' },

      { h: 'Was einen guten Shop ausmacht' },
      { liste: [
        '**Klare Navigation:** Kategorien mit verständlichen Namen, höchstens drei Ebenen tief.',
        '**Gute Suche und Filter:** Wer weiß, was er will, tippt es ein. Filter nach Größe, Farbe oder Preis sparen Zeit.',
        '**Mobile zuerst:** Die meisten Besuche kommen vom Handy. Knöpfe müssen groß genug sein, Texte gut lesbar.',
        '**Schnelle Ladezeit:** Jede Sekunde Wartezeit kostet Käufe. Große Bilder werden deshalb verkleinert.',
        '**Vertrauen:** Echte Bewertungen, Gütesiegel, klare Versandkosten und ein gut erreichbarer Kundenservice.',
        '**Barrierefreiheit:** Der Shop soll auch mit Screenreader, Tastatur oder großer Schrift bedienbar sein. Seit Juni 2025 ist das für viele Onlineshops in Deutschland gesetzlich vorgeschrieben, sehr kleine Unternehmen sind ausgenommen.'
      ] },

      { h: 'Webanalyse: Was machen die Besucher?' },
      { p: 'Mit einem **Webanalyse-Programm** sieht man, wie Menschen den Shop nutzen. Wichtig: Bevor solche Daten gesammelt werden, muss die Person über das **Cookie-Banner** zustimmen. Typische Werte sind:' },
      { liste: [
        '**Sitzungen:** Wie oft der Shop besucht wurde.',
        '**Traffic-Quellen:** Woher die Besucher kommen, zum Beispiel aus der Suchmaschine, aus Anzeigen, aus Social Media oder aus dem Newsletter.',
        '**Absprungrate:** Wie viele die Seite verlassen, ohne etwas anzuklicken.',
        '**Verweildauer:** Wie lange jemand bleibt.',
        '**Funnel**, auf Deutsch Trichter: Wie viele von der Produktseite in den Warenkorb, zur Kasse und bis zur fertigen Bestellung kommen. An der Stelle, an der besonders viele aussteigen, lohnt sich die Suche nach dem Grund.'
      ] },
      { p: 'Weitere Werkzeuge sind die **Heatmap**, die farbig zeigt, wohin am meisten geklickt wird, und die **Customer Journey**. Das ist der ganze Weg einer Kundin: von der ersten Anzeige über den Vergleich bis zum Kauf und zur Bewertung danach.' },

      { h: 'Mit Kennzahlen steuern' },
      { p: 'Kennzahlen sind kein Selbstzweck. Sie helfen, gezielt zu verbessern. Bewährt hat sich ein Kreislauf in vier Schritten:' },
      { liste: [
        '**Beobachten:** Eine Kennzahl fällt auf, zum Beispiel brechen viele Kunden an der Kasse ab.',
        '**Vermuten:** Woran könnte es liegen? Vielleicht fehlt die beliebte Zahlart oder die Versandkosten erscheinen zu spät.',
        '**Testen:** Mit einem **A/B-Test** sehen die Hälfte der Besucher die alte Kasse und die andere Hälfte die neue.',
        '**Auswerten:** Hat sich die Conversion Rate verbessert, wird die neue Version für alle übernommen. Dann beginnt der Kreislauf von vorne.'
      ] },
      { p: 'Wichtig ist, immer nur eine Sache auf einmal zu ändern. Sonst weiß man hinterher nicht, was gewirkt hat.' }
    ],
    quiz: [
      { frage: 'Was zeigt ein Funnel in der Webanalyse?', antworten: ['Wie viele Artikel im Lager liegen', 'Wie viele Besucher an jedem Schritt bis zur Bestellung übrig bleiben', 'Wie hoch die Werbekosten sind', 'Welche Farbe der Shop hat'], richtig: 1, erklaerung: 'Der Funnel, also Trichter, zeigt den Weg von der Produktseite bis zur Bestellung. So sieht man, wo besonders viele aussteigen.' },
      { frage: 'Was braucht ein Shop, bevor er Besucher mit einem Analyse-Programm auswerten darf?', antworten: ['Nichts, das ist immer erlaubt', 'Die Einwilligung der Besucher, meist über das Cookie-Banner', 'Eine Genehmigung vom Finanzamt', 'Einen Eintrag im Impressum'], richtig: 1, erklaerung: 'Für Analyse-Cookies und Tracking muss die Person vorher zustimmen. Das passiert in der Regel über das Cookie-Banner.' },
      { frage: 'Warum ändert man bei einem A/B-Test nur eine Sache?', antworten: ['Weil mehr technisch nicht geht', 'Damit man weiß, welche Änderung gewirkt hat', 'Weil es billiger ist', 'Das ist egal, man kann alles gleichzeitig ändern'], richtig: 1, erklaerung: 'Ändert man mehrere Dinge gleichzeitig, weiß man nicht, welche davon das Ergebnis verbessert oder verschlechtert hat.' }
    ]
  },
  {
    id: 'm11',
    titel: 'Beschaffung und Lager',
    kurz: 'Lieferanten finden, Angebote vergleichen, den richtigen Bestellzeitpunkt wählen und Ware richtig annehmen.',
    minuten: 10,
    bloecke: [
      { h: 'Ohne Ware kein Verkauf' },
      { p: 'Bevor ein Produkt im Shop stehen kann, muss es eingekauft werden. Diese Aufgabe heißt **Beschaffung**. In der Umschulung lernst du, die Beschaffung zu unterstützen: Bedarf erkennen, Lieferanten finden, Angebote vergleichen und bestellen.' },

      { h: 'Lieferanten finden' },
      { p: 'Mögliche **Bezugsquellen** sind Hersteller, Großhändler, Fachmessen, Branchenverzeichnisse und B2B-Plattformen im Internet. Viele Händler pflegen eine eigene **Lieferantendatei** mit Ansprechpartnern, Preisen, Lieferzeiten und Erfahrungen aus früheren Bestellungen.' },

      { h: 'Angebote vergleichen' },
      { p: 'Das günstigste Angebot ist nicht immer das beste. Man vergleicht deshalb auf zwei Arten:' },
      { liste: [
        '**In Zahlen:** Was kostet die Ware am Ende wirklich? Vom Listenpreis werden Rabatt und Skonto abgezogen, dazu kommen Bezugskosten wie Fracht. Das Ergebnis ist der **Bezugspreis**. Nur Bezugspreise sind vergleichbar.',
        '**Ohne Zahlen:** Wie gut ist die Qualität? Wie schnell und zuverlässig liefert der Lieferant? Gibt es Mindestmengen? Wie ist der Service? Achtet er auf Umwelt und faire Arbeitsbedingungen?'
      ] },
      { p: 'Viele Betriebe nutzen dafür eine **Entscheidungsbewertungstabelle**: Jedes Kriterium bekommt eine Gewichtung und jeder Lieferant Punkte. Wer am Ende die meisten gewichteten Punkte hat, gewinnt.' },

      { h: 'Wann bestellen?' },
      { p: 'Bestellt man zu spät, ist der Artikel ausverkauft und Kunden gehen zur Konkurrenz. Bestellt man zu früh oder zu viel, liegt Geld im Lager fest. Hilfreich ist der **Meldebestand**. Erreicht der Lagerbestand diese Menge, wird nachbestellt.' },
      { p: 'Die Formel lautet: **Meldebestand = Tagesverbrauch mal Lieferzeit in Tagen plus Mindestbestand.** Der **Mindestbestand**, auch eiserner Bestand genannt, ist eine Reserve für Überraschungen wie eine verspätete Lieferung.' },
      { p: 'Beispiel: Täglich werden 20 Kaffeebecher verkauft, die Lieferzeit beträgt 5 Tage und der Mindestbestand 50 Stück. 20 mal 5 ergibt 100, plus 50 ergibt einen Meldebestand von 150 Stück.' },

      { h: 'Ware annehmen' },
      { p: 'Kommt die Lieferung an, wird sie sofort kontrolliert: Stimmt die Anzahl der Pakete mit dem **Lieferschein** überein? Ist die Verpackung beschädigt? Sichtbare Schäden lässt man sich vom Fahrer bestätigen. Danach wird der Inhalt geprüft und die Ware im Warenwirtschaftssystem eingebucht. Zwischen Firmen gilt: Mängel müssen **unverzüglich** gemeldet werden, sonst können Rechte verloren gehen.' },

      { h: 'Dropshipping und Lagerkennzahlen' },
      { p: 'Beim **Dropshipping** hat der Händler gar kein eigenes Lager. Der Lieferant schickt die Ware direkt an den Kunden. Das spart Lagerkosten, aber man hat weniger Kontrolle über Lieferzeit und Verpackung.' },
      { p: 'Für das eigene Lager wichtig ist die **Lagerumschlagshäufigkeit**. Sie zeigt, wie oft der durchschnittliche Lagerbestand in einem Jahr verkauft und ersetzt wird. Je höher, desto kürzer liegt die Ware herum und desto weniger Geld ist gebunden.' }
    ],
    quiz: [
      { frage: 'Ein Artikel wird täglich 10-mal verkauft, die Lieferzeit beträgt 4 Tage, der Mindestbestand 30 Stück. Wie hoch ist der Meldebestand?', antworten: ['44 Stück', '70 Stück', '120 Stück', '40 Stück'], richtig: 1, erklaerung: '10 mal 4 ergibt 40. Dazu kommt der Mindestbestand von 30. Der Meldebestand beträgt 70 Stück.' },
      { frage: 'Warum vergleicht man Lieferanten anhand des Bezugspreises und nicht des Listenpreises?', antworten: ['Weil der Bezugspreis immer niedriger ist', 'Weil erst im Bezugspreis Rabatt, Skonto und Fracht berücksichtigt sind', 'Weil der Listenpreis geheim ist', 'Das macht keinen Unterschied'], richtig: 1, erklaerung: 'Ein hoher Rabatt oder teure Fracht können die Reihenfolge der Angebote komplett verändern. Vergleichbar ist nur, was die Ware am Ende wirklich kostet.' },
      { frage: 'Was ist Dropshipping?', antworten: ['Ware wird per Drohne geliefert', 'Der Lieferant schickt die Ware direkt an den Kunden, der Händler hat kein eigenes Lager', 'Ein besonders schneller Versand', 'Der Verkauf von Restposten'], richtig: 1, erklaerung: 'Beim Dropshipping verkauft der Händler, aber lagert und versendet nicht selbst. Das spart Kosten, kostet aber Kontrolle.' }
    ]
  },
  {
    id: 'm12',
    titel: 'Verträge und Leistungsstörungen',
    kurz: 'Vom Angebot bis zur Auftragsbestätigung, und was passiert, wenn etwas schiefgeht: Lieferverzug, Mängel, Zahlungsverzug und Mahnwesen.',
    minuten: 12,
    bloecke: [
      { h: 'Verträge im Onlinevertrieb' },
      { p: 'Im Modul zu Bestellungen hast du gelernt, wie ein Kaufvertrag im Shop entsteht. Im Geschäft mit anderen Firmen, also im **B2B-Bereich**, läuft es oft ausführlicher ab:' },
      { liste: [
        '**Anfrage:** Der Kunde möchte wissen, zu welchen Bedingungen er etwas bekommt. Eine Anfrage ist immer unverbindlich.',
        '**Angebot:** Der Verkäufer nennt Preis, Menge, Lieferzeit und Zahlungsbedingungen. Ein Angebot ist verbindlich, es sei denn, es enthält eine Klausel wie „freibleibend“ oder „solange der Vorrat reicht“.',
        '**Bestellung:** Bestellt der Kunde genau zu den Bedingungen des Angebots, ist der Vertrag geschlossen.',
        '**Auftragsbestätigung:** Weicht die Bestellung vom Angebot ab oder gab es vorher kein Angebot, kommt der Vertrag erst mit der Auftragsbestätigung zustande.'
      ] },
      { p: 'Aus dem Kaufvertrag entstehen Pflichten auf beiden Seiten. Der Verkäufer muss die Ware **rechtzeitig und ohne Mängel** liefern. Der Käufer muss die Ware **annehmen und pünktlich bezahlen**. Wird eine dieser Pflichten verletzt, spricht man von einer **Leistungsstörung**.' },

      { h: 'Lieferverzug' },
      { p: 'Der Verkäufer liefert nicht rechtzeitig. Ist ein fester Liefertermin vereinbart, gerät er mit Ablauf dieses Tages in Verzug. Sonst muss der Käufer ihn zuerst **mahnen**. Der Käufer kann weiter auf der Lieferung bestehen und den Schaden durch die Verspätung ersetzt verlangen. Nach einer angemessenen **Nachfrist** darf er vom Vertrag zurücktreten und unter Umständen Schadensersatz verlangen.' },

      { h: 'Mangelhafte Lieferung' },
      { p: 'Die Ware ist kaputt, falsch oder es fehlt etwas. Dann hat der Käufer zuerst ein Recht auf **Nacherfüllung**: Reparatur oder neue Ware. Klappt das nicht, kann er den Preis **mindern**, vom Vertrag **zurücktreten** oder **Schadensersatz** verlangen. Zwischen zwei Firmen gilt zusätzlich: Die Ware muss sofort geprüft und Mängel müssen unverzüglich gemeldet werden.' },

      { h: 'Annahmeverzug' },
      { p: 'Der Käufer nimmt die richtig gelieferte Ware nicht an. Der Verkäufer muss die Ware dann nur noch sorgfältig aufbewahren und darf die Kosten dafür verlangen. Im Onlinehandel passiert das zum Beispiel, wenn ein Paket nicht abgeholt wird und zurückkommt.' },

      { h: 'Zahlungsverzug und Mahnwesen' },
      { p: 'Der Kunde zahlt nicht. Spätestens **30 Tage** nach Fälligkeit und Erhalt der Rechnung ist er in Verzug. Bei Privatkunden gilt das nur, wenn auf der Rechnung ausdrücklich darauf hingewiesen wurde. Ab dann darf der Händler **Verzugszinsen** verlangen.' },
      { p: 'Im Alltag läuft das **Mahnwesen** meist in Stufen ab:' },
      { liste: [
        '**Zahlungserinnerung:** freundlich, vielleicht hat der Kunde die Rechnung nur übersehen.',
        '**Erste Mahnung:** deutlicher, mit neuer Zahlungsfrist.',
        '**Letzte Mahnung:** mit Hinweis auf die nächsten Schritte.',
        '**Gerichtliches Mahnverfahren:** Beim Amtsgericht wird ein **Mahnbescheid** beantragt. Widerspricht der Kunde nicht, folgt der Vollstreckungsbescheid.'
      ] },
      { p: 'Offene Forderungen **verjähren** in der Regel nach drei Jahren, gerechnet ab dem Ende des Jahres, in dem sie entstanden sind. Wer zu lange wartet, bekommt sein Geld unter Umständen nie.' },
      { p: 'Rechtliche Einzelheiten wie Fristen und Zinssätze lernst du ausführlich in der Umschulung. Im Zweifel fragt man im Betrieb oder bei einer Rechtsberatung nach.' }
    ],
    quiz: [
      { frage: 'Ein Lieferant schreibt in sein Angebot „freibleibend“. Was bedeutet das?', antworten: ['Die Lieferung ist kostenlos', 'Das Angebot ist für ihn nicht verbindlich', 'Der Kunde muss nicht bezahlen', 'Die Ware hat keine Gewährleistung'], richtig: 1, erklaerung: 'Mit „freibleibend“ schließt der Verkäufer die Bindung an sein Angebot aus. Er muss nicht zu diesen Bedingungen liefern.' },
      { frage: 'Ein Kunde erhält kaputte Ware. Was kann er zuerst verlangen?', antworten: ['Sofort das Geld zurück', 'Nacherfüllung, also Reparatur oder neue Ware', 'Einen Gutschein', 'Gar nichts'], richtig: 1, erklaerung: 'Bei einem Mangel steht zuerst die Nacherfüllung. Erst wenn sie scheitert, kommen Minderung, Rücktritt oder Schadensersatz in Frage.' },
      { frage: 'Welche Reihenfolge ist im Mahnwesen üblich?', antworten: ['Mahnbescheid, Erinnerung, Mahnung', 'Zahlungserinnerung, Mahnung, letzte Mahnung, gerichtliches Mahnverfahren', 'Sofort Inkasso', 'Letzte Mahnung, dann Zahlungserinnerung'], richtig: 1, erklaerung: 'Man beginnt freundlich und wird dann Schritt für Schritt deutlicher. Das gerichtliche Mahnverfahren steht am Ende.' }
    ]
  },
  {
    id: 'm13',
    titel: 'Wertströme und Rechnungswesen',
    kurz: 'Geld- und Warenströme erfassen: Belege, Inventur, Bilanz, Gewinn und Verlust, Kosten und Deckungsbeitrag.',
    minuten: 12,
    bloecke: [
      { h: 'Wo Werte fließen' },
      { p: 'In jedem Unternehmen fließen ständig **Werte**: Ware kommt ins Lager, Geld geht an den Lieferanten, Kunden bezahlen, Miete und Löhne werden überwiesen. Diese Wertströme zu erfassen und auszuwerten ist die Aufgabe des **Rechnungswesens**. Es zeigt, ob das Geschäft sich lohnt und ob immer genug Geld da ist.' },

      { h: 'Keine Buchung ohne Beleg' },
      { p: 'Jeder Geschäftsvorfall wird in der **Buchführung** festgehalten. Grundlage ist immer ein **Beleg**: eine Eingangsrechnung, eine Ausgangsrechnung, ein Kontoauszug oder eine Quittung. Belege müssen geordnet und mehrere Jahre lang aufbewahrt werden, damit das Finanzamt sie prüfen kann.' },
      { p: 'In der doppelten Buchführung wird jeder Vorgang auf zwei Konten gebucht, einmal im **Soll** und einmal im **Haben**. Kauft der Shop zum Beispiel Ware gegen Banküberweisung, nimmt der Warenbestand zu und das Bankguthaben ab.' },

      { h: 'Inventur, Inventar und Bilanz' },
      { p: 'Mindestens einmal im Jahr wird alles gezählt, gemessen und gewogen. Das ist die **Inventur**. Das Ergebnis, ein genaues Verzeichnis aller Vermögensteile und Schulden, heißt **Inventar**.' },
      { p: 'Daraus entsteht die **Bilanz**. Sie ist wie eine Waage mit zwei Seiten:' },
      { liste: [
        '**Aktiva**, also das Vermögen: zum Beispiel Lagerregale und Computer als Anlagevermögen sowie Ware, Forderungen und Bankguthaben als Umlaufvermögen.',
        '**Passiva**, also das Kapital: Wo kommt das Geld her? Aus dem **Eigenkapital** der Inhaber oder aus **Fremdkapital** wie Krediten und offenen Lieferantenrechnungen.',
        'Beide Seiten sind immer gleich groß.'
      ] },

      { h: 'Gewinn oder Verlust?' },
      { p: 'Die **Gewinn- und Verlustrechnung** stellt alle **Aufwendungen** eines Jahres, zum Beispiel Wareneinsatz, Löhne, Miete und Werbung, allen **Erträgen** gegenüber, vor allem den Umsatzerlösen. Sind die Erträge höher, bleibt ein Gewinn. Sonst entsteht ein Verlust.' },

      { h: 'Kosten und Deckungsbeitrag' },
      { p: 'Kosten lassen sich in zwei Gruppen teilen. **Fixe Kosten** fallen immer an, egal wie viel verkauft wird, zum Beispiel Miete, Gehälter und die Gebühr für das Shopsystem. **Variable Kosten** steigen mit jedem verkauften Stück, zum Beispiel Wareneinsatz, Verpackung und Versand.' },
      { p: 'Der **Deckungsbeitrag** ist der Nettoverkaufspreis minus die variablen Kosten pro Stück. Er zeigt, wie viel jedes verkaufte Stück zur Deckung der fixen Kosten beiträgt. Sind alle fixen Kosten gedeckt, beginnt der Gewinn. Diesen Punkt nennt man **Gewinnschwelle** oder Break-even.' },
      { p: 'Beispiel: Ein Rucksack wird für 40 Euro netto verkauft. Einkauf, Verpackung und Versand kosten zusammen 25 Euro. Der Deckungsbeitrag beträgt 15 Euro. Bei 3.000 Euro fixen Kosten im Monat müssen 200 Rucksäcke verkauft werden, um die Gewinnschwelle zu erreichen.' },

      { h: 'Liquidität' },
      { p: 'Ein Shop kann Gewinn machen und trotzdem in Not geraten, wenn das Geld zum falschen Zeitpunkt fehlt. **Liquidität** heißt, jederzeit seine Rechnungen bezahlen zu können. Viel Ware im Lager, lange Zahlungsziele für Kunden und kurze für Lieferanten machen es eng. Deshalb planen Händler ihre Zahlungen voraus.' }
    ],
    quiz: [
      { frage: 'Was steht auf der Aktivseite der Bilanz?', antworten: ['Das Eigenkapital', 'Das Vermögen, zum Beispiel Ware, Computer und Bankguthaben', 'Die Kredite', 'Die Umsätze des Jahres'], richtig: 1, erklaerung: 'Die Aktiva zeigen, was im Unternehmen steckt. Die Passiva zeigen, woher das Geld dafür kommt.' },
      { frage: 'Ein Artikel kostet netto 30 Euro, die variablen Kosten betragen 18 Euro. Wie hoch ist der Deckungsbeitrag pro Stück?', antworten: ['48 Euro', '12 Euro', '18 Euro', '30 Euro'], richtig: 1, erklaerung: '30 Euro minus 18 Euro ergibt einen Deckungsbeitrag von 12 Euro pro verkauftem Stück.' },
      { frage: 'Welche Kosten sind fix?', antworten: ['Versandkosten pro Paket', 'Die monatliche Miete für das Lager', 'Der Einkaufspreis jedes Artikels', 'Die Verpackung jeder Bestellung'], richtig: 1, erklaerung: 'Die Miete fällt jeden Monat gleich an, egal wie viel verkauft wird. Versand, Einkauf und Verpackung steigen mit jedem Stück.' }
    ]
  },
  {
    id: 'm14',
    titel: 'Vertriebskanäle und Angebotsregeln',
    kurz: 'Eigener Shop, Marktplatz oder Social Commerce? Und wie man Preise, Versandkosten, Gutscheine und Zahlarten festlegt.',
    minuten: 11,
    bloecke: [
      { h: 'Wo wird verkauft?' },
      { p: 'Ein Händler muss entscheiden, über welche **Vertriebskanäle** er verkauft. Jeder Kanal hat Vor- und Nachteile:' },
      { liste: [
        '**Eigener Onlineshop:** volle Kontrolle über Gestaltung, Preise und Kundendaten. Aber die Besucher muss man selbst gewinnen, zum Beispiel durch Werbung.',
        '**Marktplatz** wie Amazon, eBay, Kaufland oder Otto: riesige Reichweite und Vertrauen der Kunden. Dafür fallen **Verkaufsprovisionen** und Gebühren an, die Konkurrenz ist direkt daneben und man ist von den Regeln der Plattform abhängig.',
        '**Social Commerce:** Verkauf direkt in sozialen Netzwerken wie Instagram oder TikTok. Gut für junge Zielgruppen und spontane Käufe, aber stark abhängig von den Plattformen.',
        '**Preisvergleichsportale:** bringen Besucher, die gezielt nach dem günstigsten Angebot suchen.'
      ] },
      { p: 'Wer mehrere Kanäle nebeneinander nutzt, betreibt **Multichannel**. Sind die Kanäle eng verbunden, zum Beispiel online bestellen und im Laden abholen, spricht man von **Omnichannel**.' },

      { h: 'Den richtigen Kanal auswählen' },
      { p: 'Bei der Auswahl helfen Fragen wie: Wo ist meine Zielgruppe unterwegs? Wie hoch sind die Gebühren im Verhältnis zu meiner Marge? Passt der Kanal zu meinem Sortiment? Wie viel Arbeit macht die Pflege der Produktdaten? Oft rechnet man den **Deckungsbeitrag pro Kanal** aus, denn eine Marktplatzprovision von 15 Prozent kann einen kleinen Gewinn schnell auffressen.' },

      { h: 'Angebotsregeln festlegen' },
      { p: 'Neben dem Kanal legt der Händler fest, zu welchen Bedingungen er verkauft. Diese **Angebotsregeln** sind ein wichtiger Teil des Berufs:' },
      { liste: [
        '**Preisstrategie:** Hochpreis für Qualität und Marke, Niedrigpreis für Masse, Schwellenpreise wie 19,99 Euro oder **dynamische Preise**, die sich nach Nachfrage und Konkurrenz ändern.',
        '**Versandkostenregeln:** zum Beispiel kostenloser Versand ab 50 Euro. Das erhöht oft den durchschnittlichen Warenkorbwert.',
        '**Mindestbestellwert:** lohnt sich bei günstigen Artikeln, damit sich Verpackung und Versand rechnen.',
        '**Gutscheine und Aktionen:** Neukundenrabatt, Gutscheincodes oder Bundles, also Pakete aus mehreren Produkten zum Sonderpreis.',
        '**Zahlarten:** Welche Bezahlsysteme werden angeboten? Jede Zahlart hat eigene Gebühren und ein eigenes Ausfallrisiko. Zu wenige Zahlarten führen aber zu Kaufabbrüchen.'
      ] },

      { h: 'Vorsicht bei Rabatten' },
      { p: 'Wer mit einem reduzierten Preis wirbt, muss in Deutschland als Vergleich den **niedrigsten Preis der letzten 30 Tage** angeben. So soll verhindert werden, dass Preise kurz vorher künstlich erhöht werden. Außerdem gilt: Rabatte kosten Marge. Vor jeder Aktion rechnet man deshalb aus, wie viel mehr verkauft werden muss, damit es sich lohnt.' }
    ],
    quiz: [
      { frage: 'Was ist ein typischer Nachteil eines Marktplatzes wie Amazon?', antworten: ['Er hat zu wenige Besucher', 'Verkaufsprovisionen und Abhängigkeit von den Regeln der Plattform', 'Man darf dort keine Bilder zeigen', 'Kunden vertrauen Marktplätzen nicht'], richtig: 1, erklaerung: 'Marktplätze bringen viel Reichweite, aber sie kosten Provision und der Händler muss sich an ihre Regeln halten.' },
      { frage: 'Warum bieten viele Shops „kostenloser Versand ab 50 Euro“ an?', antworten: ['Weil es gesetzlich vorgeschrieben ist', 'Damit Kunden mehr in den Warenkorb legen und der Warenkorbwert steigt', 'Weil Versand nichts kostet', 'Damit weniger Kunden bestellen'], richtig: 1, erklaerung: 'Viele Kunden legen noch etwas dazu, um die Grenze zu erreichen. Der durchschnittliche Warenkorbwert steigt.' },
      { frage: 'Was muss ein Shop angeben, wenn er mit einer Preisermäßigung wirbt?', antworten: ['Den Einkaufspreis', 'Den niedrigsten Preis der letzten 30 Tage', 'Den Preis der Konkurrenz', 'Nichts'], richtig: 1, erklaerung: 'Bei Preisermäßigungen muss der niedrigste Preis der letzten 30 Tage als Vergleich genannt werden.' }
    ]
  },
  {
    id: 'm15',
    titel: 'Projektarbeit im E-Commerce',
    kurz: 'Projekte planen, steuern und abschließen: Ziele, Phasen, Meilensteine, Kanban und der Projektbericht.',
    minuten: 10,
    bloecke: [
      { h: 'Was ist ein Projekt?' },
      { p: 'Ein neuer Shop, eine Weihnachtskampagne, der Start auf einem Marktplatz: Vieles im E-Commerce läuft als **Projekt**. Ein Projekt ist **einmalig**, hat ein klares **Ziel**, einen festen **Anfang und ein Ende** und begrenzte Mittel wie Geld, Zeit und Personal. Die tägliche Bearbeitung von Bestellungen ist dagegen kein Projekt, sondern Routine.' },
      { p: 'In der Umschulung gehört die **berufsbezogene Projektarbeit** fest dazu. Auch in der Abschlussprüfung stellst du ein Projekt aus deinem Praktikumsbetrieb vor. Die genauen Regeln dafür erklärt dir dein Bildungsträger.' },

      { h: 'Gute Ziele formulieren' },
      { p: 'Ein Ziel wie „mehr verkaufen“ ist zu ungenau. Besser sind **SMARTe Ziele**:' },
      { liste: [
        '**Spezifisch:** Was genau soll erreicht werden?',
        '**Messbar:** Woran erkennt man, dass es geschafft ist?',
        '**Attraktiv:** Lohnt sich der Aufwand für alle Beteiligten?',
        '**Realistisch:** Ist das mit den vorhandenen Mitteln machbar?',
        '**Terminiert:** Bis wann?'
      ] },
      { p: 'Beispiel: „Bis zum 31. März steigt die Conversion Rate in der Kategorie Kaffee von 1,5 auf 2 Prozent.“' },

      { h: 'Die Phasen eines Projekts' },
      { liste: [
        '**Start:** Auftrag klären, Ziel festlegen, Beteiligte benennen.',
        '**Planung:** Aufgaben sammeln und in einem **Projektstrukturplan** ordnen, Zeiten und Kosten schätzen, Verantwortliche festlegen. Wichtige Zwischenziele heißen **Meilensteine**. Ein **Gantt-Diagramm** zeigt als Balken, welche Aufgabe wann läuft.',
        '**Durchführung:** Arbeiten erledigen und regelmäßig prüfen, ob Zeitplan und Budget eingehalten werden.',
        '**Abschluss:** Ergebnis übergeben, Ziel überprüfen, Erfahrungen festhalten. Diese **Lessons Learned** helfen beim nächsten Projekt.'
      ] },

      { h: 'Den Überblick behalten' },
      { p: 'Viele Teams arbeiten mit einem **Kanban-Board**. Das ist eine Tafel mit drei Spalten: „Zu erledigen“, „In Arbeit“ und „Erledigt“. Jede Aufgabe ist eine Karte, die von links nach rechts wandert. So sieht jeder sofort, wo das Projekt steht. In der Softwareentwicklung arbeiten Teams oft **agil**, also in kurzen Abschnitten mit regelmäßiger Abstimmung.' },

      { h: 'Der Projektbericht' },
      { p: 'Am Ende wird das Projekt dokumentiert. Ein guter **Projektbericht** beschreibt die Ausgangslage, das Ziel, die geplanten und tatsächlich durchgeführten Schritte, das Ergebnis mit Zahlen und eine ehrliche Bewertung: Was lief gut, was würde ich nächstes Mal anders machen? Genau diese Fragen übst du auch im Tagebuch von Add to Brain.' }
    ],
    quiz: [
      { frage: 'Welche Aufgabe ist ein Projekt?', antworten: ['Täglich Bestellungen verpacken', 'Den Shop bis zum Herbst auf ein neues Shopsystem umziehen', 'Jeden Morgen E-Mails beantworten', 'Retouren einbuchen'], richtig: 1, erklaerung: 'Der Umzug auf ein neues Shopsystem ist einmalig, hat ein Ziel und ein Ende. Die anderen Aufgaben sind Routine.' },
      { frage: 'Wofür steht das M in SMART?', antworten: ['Modern', 'Messbar', 'Mutig', 'Monatlich'], richtig: 1, erklaerung: 'Ein Ziel muss messbar sein, damit man am Ende prüfen kann, ob es erreicht wurde.' },
      { frage: 'Was zeigt ein Kanban-Board?', antworten: ['Die Umsätze des Monats', 'Welche Aufgaben zu erledigen, in Arbeit und erledigt sind', 'Die Lieferantenpreise', 'Den Lagerbestand'], richtig: 1, erklaerung: 'Auf einem Kanban-Board wandern Aufgaben als Karten von „Zu erledigen“ über „In Arbeit“ nach „Erledigt“.' }
    ]
  }
];
