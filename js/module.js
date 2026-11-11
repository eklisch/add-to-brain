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
  { id: 'm2', titel: 'Sortiment und Produktdaten', kurz: 'Gute Produktbeschreibungen, Bilder, Varianten und Pflege großer Sortimente.', minuten: 0, bloecke: [], quiz: [] },
  { id: 'm3', titel: 'Bestellung und Zahlarten', kurz: 'Der Bestellprozess im Detail und die Vor- und Nachteile der Zahlarten.', minuten: 0, bloecke: [], quiz: [] },
  { id: 'm4', titel: 'Versand und Retouren', kurz: 'Versanddienstleister, Verpackung, Retourenabwicklung und wie man Retouren vermeidet.', minuten: 0, bloecke: [], quiz: [] },
  { id: 'm5', titel: 'Online-Marketing', kurz: 'SEO, SEA, Social Media und Newsletter genauer erklärt.', minuten: 0, bloecke: [], quiz: [] },
  { id: 'm6', titel: 'Kennzahlen rechnen', kurz: 'Conversion Rate, Warenkorbwert, Retourenquote und Umsatz mit Übungsaufgaben.', minuten: 0, bloecke: [], quiz: [] },
  { id: 'm7', titel: 'Recht im Online-Handel', kurz: 'Widerrufsrecht, AGB, Impressum, Datenschutz und Preisangaben.', minuten: 0, bloecke: [], quiz: [] },
  { id: 'm8', titel: 'Kundenservice und Kommunikation', kurz: 'Kundenanfragen beantworten, Reklamationen lösen, schwierige Gespräche führen.', minuten: 0, bloecke: [], quiz: [] },
  { id: 'm9', titel: 'Kaufmännische Grundlagen', kurz: 'Kaufvertrag, Rechnung, Kalkulation und Rabatte.', minuten: 0, bloecke: [], quiz: [] }
];
