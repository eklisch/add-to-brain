// Add to Brain – Praxis: Missionen aus dem Arbeitsalltag ausgedachter Onlineshops
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  function el(tag, text, klasse) {
    const e = document.createElement(tag);
    if (text != null) e.textContent = text;
    if (klasse) e.className = klasse;
    return e;
  }

  // Die Shops – weitere Shops einfach hier ergänzen und bei den Missionen mit shop: '…' zuordnen
  const SHOPS = [
    { id: 'retro', name: 'Retro-Shop', text: 'Ein kleiner Onlineshop für Plattenspieler, Kameras, Spielkonsolen und Vintage-Mode.' },
    { id: 'kaffee', name: 'Kaffeerösterei Morgenrot', text: 'Eine kleine Rösterei mit Onlineshop. Sie wächst gerade und braucht dich im Einkauf, in der Buchhaltung und bei neuen Projekten.' }
  ];

  // Jede Mission: kurze Geschichte und vier Entscheidungen mit Erklärung
  const MISSIONEN = [
    {
      id: 'r1', shop: 'retro', titel: 'Ein neuer Plattenspieler', thema: 'Artikel anlegen',
      geschichte: 'Lena bringt einen gebrauchten Plattenspieler aus den 70ern ins Lager. Er funktioniert, hat aber einen Kratzer am Deckel. Du sollst ihn im Shop einstellen.',
      schritte: [
        { frage: 'Welcher Produkttitel ist am besten?', antworten: ['Super Teil!!!', 'Plattenspieler von Dual, 70er Jahre, gebraucht, funktionsfähig', 'Plattenspieler'], richtig: 1,
          erklaerung: 'Ein guter Titel nennt Marke, Modell und die wichtigsten Merkmale. So finden Kundinnen und Kunden den Artikel über die Suche.' },
        { frage: 'Was machst du mit dem Kratzer am Deckel?', antworten: ['Nicht erwähnen, sonst kauft ihn keiner', 'In der Beschreibung nennen und auf einem Foto zeigen', 'Den Preis senken und nichts sagen'], richtig: 1,
          erklaerung: 'Mängel gehören ehrlich in die Beschreibung. Das schafft Vertrauen und verhindert Rücksendungen und schlechte Bewertungen.' },
        { frage: 'Wie viele Fotos sind sinnvoll?', antworten: ['Eins reicht', 'Mehrere: von vorne, von der Seite, Details und der Kratzer', 'Keins, die Beschreibung reicht'], richtig: 1,
          erklaerung: 'Im Onlinehandel können Kunden die Ware nicht anfassen. Mehrere gute Fotos ersetzen den Blick im Laden.' },
        { frage: 'Wie zeigst du den Preis im Shop an?', antworten: ['Netto, die Steuer kommt an der Kasse dazu', 'Brutto inklusive Mehrwertsteuer, mit Hinweis auf die Versandkosten', 'Nur auf Anfrage'], richtig: 1,
          erklaerung: 'Gegenüber Privatkunden müssen Endpreise inklusive Mehrwertsteuer angezeigt werden, dazu ein Hinweis auf die Versandkosten.' }
      ]
    },
    {
      id: 'r2', shop: 'retro', titel: 'Die erste Bestellung des Tages', thema: 'Bestellablauf',
      geschichte: 'Um 9 Uhr kommt eine Bestellung rein: eine Polaroid-Kamera und zwei Filme. Der Kunde hat per Vorkasse bestellt.',
      schritte: [
        { frage: 'Was prüfst du zuerst?', antworten: ['Ob das Geld schon eingegangen ist', 'Ob der Kunde nett klingt', 'Nichts, sofort verschicken'], richtig: 0,
          erklaerung: 'Bei Vorkasse wird erst verschickt, wenn die Zahlung da ist. Bei PayPal oder Kreditkarte geht das meist sofort.' },
        { frage: 'Das Geld ist da. Wie heißt das Zusammensuchen der Artikel im Lager?', antworten: ['Inventur', 'Kommissionierung', 'Retoure'], richtig: 1,
          erklaerung: 'Kommissionierung heißt: Die bestellten Artikel werden im Lager zusammengestellt, oft mit einer Pickliste.' },
        { frage: 'Die Kamera ist empfindlich. Wie verpackst du sie?', antworten: ['Im passenden Karton mit Polstermaterial', 'In einer Plastiktüte', 'Im größten Karton, den wir haben'], richtig: 0,
          erklaerung: 'Passend und gut gepolstert schützt die Ware und spart Versandkosten. Zu große Kartons kosten mehr und lassen die Ware verrutschen.' },
        { frage: 'Das Paket ist beim Versanddienstleister. Was bekommt der Kunde jetzt?', antworten: ['Eine Rechnung über die Versandkosten', 'Eine Versandbestätigung mit Sendungsnummer', 'Nichts, er wartet einfach'], richtig: 1,
          erklaerung: 'Mit der Sendungsnummer kann der Kunde sein Paket verfolgen. Das spart viele Nachfragen beim Kundenservice.' }
      ]
    },
    {
      id: 'r3', shop: 'retro', titel: 'Wo ist mein Paket?', thema: 'Kundenservice',
      geschichte: 'Frau Yilmaz schreibt verärgert: Ihr Gameboy sollte vor drei Tagen ankommen, aber er ist nicht da.',
      schritte: [
        { frage: 'Wie beginnst du deine Antwort?', antworten: ['Das ist nicht unsere Schuld.', 'Sehr geehrte Frau Yilmaz, vielen Dank für Ihre Nachricht. Es tut mir leid, dass Ihr Paket noch nicht angekommen ist.', 'Hallo, keine Panik!'], richtig: 1,
          erklaerung: 'Höflich, mit Namen und Verständnis. Wer sich ernst genommen fühlt, beruhigt sich schneller.' },
        { frage: 'Was machst du als Nächstes?', antworten: ['Die Sendungsnummer im System des Versanddienstleisters prüfen', 'Sofort einen neuen Gameboy schicken', 'Sie bitten, noch zwei Wochen zu warten'], richtig: 0,
          erklaerung: 'Erst nachsehen, wo das Paket ist. Oft liegt es in einer Filiale oder beim Nachbarn.' },
        { frage: 'Laut Sendungsverfolgung ist das Paket verloren gegangen. Wer trägt das Risiko?', antworten: ['Frau Yilmaz, sie hat ja bestellt', 'Der Shop: Bei Privatkunden trägt der Händler das Versandrisiko', 'Niemand, Pech gehabt'], richtig: 1,
          erklaerung: 'Bei Verbrauchern trägt der Händler das Risiko, bis die Ware bei der Kundin ankommt. Der Shop klärt den Schaden mit dem Versanddienstleister.' },
        { frage: 'Was bietest du Frau Yilmaz an?', antworten: ['Ersatz oder Erstattung, ganz wie sie möchte', 'Einen Gutschein über 5 Euro', 'Nichts, sie soll sich an die Post wenden'], richtig: 0,
          erklaerung: 'Eine schnelle, faire Lösung macht aus einer verärgerten Kundin oft eine treue Kundin.' }
      ]
    },
    {
      id: 'r4', shop: 'retro', titel: 'Die Lederjacke kommt zurück', thema: 'Retoure und Widerruf',
      geschichte: 'Ein Kunde schickt eine Vintage-Lederjacke zurück. Er schreibt: Sie passt nicht. Gekauft hat er sie vor zehn Tagen.',
      schritte: [
        { frage: 'Darf er die Jacke einfach zurückgeben?', antworten: ['Nein, gekauft ist gekauft', 'Ja, Verbraucher haben 14 Tage Widerrufsrecht ab Erhalt der Ware', 'Nur, wenn sie kaputt ist'], richtig: 1,
          erklaerung: 'Beim Onlinekauf können Verbraucher innerhalb von 14 Tagen ohne Angabe von Gründen widerrufen.' },
        { frage: 'Die Jacke kommt an. Was machst du zuerst?', antworten: ['Sofort wieder in den Shop stellen', 'Die Jacke prüfen: Ist alles da, ist sie in Ordnung?', 'Wegwerfen'], richtig: 1,
          erklaerung: 'Rücksendungen werden geprüft und erfasst. Erst dann kommt die Ware wieder in den Bestand.' },
        { frage: 'Was muss der Shop erstatten?', antworten: ['Nur den halben Preis', 'Den Kaufpreis und die Versandkosten für den Hinversand', 'Gar nichts'], richtig: 1,
          erklaerung: 'Erstattet werden der Kaufpreis und die Standard-Versandkosten der Hinsendung. Die Rücksendekosten trägt der Kunde, wenn er vorher darüber informiert wurde.' },
        { frage: 'Bis wann muss das Geld zurück sein?', antworten: ['Innerhalb von 14 Tagen nach dem Widerruf', 'Irgendwann im nächsten Jahr', 'Sofort am selben Tag'], richtig: 0,
          erklaerung: 'Die Frist sind 14 Tage ab Widerruf. Der Händler darf aber warten, bis die Ware zurück ist.' }
      ]
    },
    {
      id: 'r5', shop: 'retro', titel: 'Retro-Woche im Newsletter', thema: 'Marketing',
      geschichte: 'Der Shop plant eine Retro-Woche mit Rabatten. Du sollst dich um den Newsletter und die Preise kümmern.',
      schritte: [
        { frage: 'Wem darfst du den Newsletter schicken?', antworten: ['Allen, deren E-Mail-Adresse wir haben', 'Nur Personen, die sich angemeldet und die Anmeldung per Link bestätigt haben', 'Jedem, der mal etwas gekauft hat, ohne Ausnahme'], richtig: 1,
          erklaerung: 'Werbe-Mails brauchen eine Einwilligung. Üblich ist das Double-Opt-In: anmelden und per Link in einer E-Mail bestätigen.' },
        { frage: 'Welche Betreffzeile ist am besten?', antworten: ['Newsletter Nummer 47', 'Retro-Woche: 20 % auf Kameras und Plattenspieler', 'WICHTIG!!! JETZT ÖFFNEN!!!'], richtig: 1,
          erklaerung: 'Ein guter Betreff sagt klar, was drin ist. Übertriebene Großbuchstaben landen oft im Spam.' },
        { frage: 'Du willst einen Streichpreis zeigen. Welcher alte Preis darf durchgestrichen werden?', antworten: ['Ein ausgedachter, hoher Preis', 'Der niedrigste Preis der letzten 30 Tage', 'Der Preis vom letzten Jahr'], richtig: 1,
          erklaerung: 'Bei Preissenkungen muss als Vergleich der niedrigste Preis der letzten 30 Tage angegeben werden. So werden Fake-Rabatte verhindert.' },
        { frage: 'Woran siehst du nach der Aktion, ob der Newsletter gut ankam?', antworten: ['An der Öffnungsrate und den Klicks', 'An der Farbe des Logos', 'Gar nicht'], richtig: 0,
          erklaerung: 'Öffnungsrate, Klickrate und Bestellungen aus dem Newsletter zeigen, ob die Aktion funktioniert hat.' }
      ]
    },
    {
      id: 'r6', shop: 'retro', titel: 'Ein Stern und ein Wutausbruch', thema: 'Bewertungen',
      geschichte: 'Unter der Walkman-Seite steht eine Bewertung mit einem Stern: Kam kaputt an, totaler Schrott, nie wieder!',
      schritte: [
        { frage: 'Was machst du mit der Bewertung?', antworten: ['Löschen lassen, sie schadet dem Shop', 'Öffentlich sachlich antworten', 'Mit einer gefälschten Fünf-Sterne-Bewertung ausgleichen'], richtig: 1,
          erklaerung: 'Eine sachliche Antwort zeigt allen anderen Kunden, dass sich der Shop kümmert. Gefälschte Bewertungen sind verboten.' },
        { frage: 'Welche Antwort passt?', antworten: ['Das kann nicht sein, wir prüfen alles.', 'Das tut uns leid. Bitte melden Sie sich bei uns, dann finden wir eine Lösung.', 'Dann kaufen Sie eben woanders.'], richtig: 1,
          erklaerung: 'Bedauern zeigen und eine Lösung anbieten. Die Einzelheiten klärt man danach per E-Mail, nicht öffentlich.' },
        { frage: 'Der Walkman war beim Versand wirklich defekt. Was hat der Kunde?', antworten: ['Einen Anspruch auf Nacherfüllung, also Reparatur oder Ersatz', 'Keine Rechte, weil der Walkman gebraucht ist', 'Nur das Recht auf eine Entschuldigung'], richtig: 0,
          erklaerung: 'Auch bei Gebrauchtware gilt die Gewährleistung. Sie kann bei gebrauchten Sachen auf ein Jahr verkürzt werden, wenn das vorher vereinbart wurde.' },
        { frage: 'Was lernt der Shop daraus?', antworten: ['Nichts', 'Geräte vor dem Versand testen und besser polstern', 'Keine Walkmans mehr verkaufen'], richtig: 1,
          erklaerung: 'Beschwerden sind wertvolle Hinweise. Wer die Ursache behebt, bekommt weniger Rücksendungen.' }
      ]
    },
    {
      id: 'r7', shop: 'retro', titel: 'Alles muss gezählt werden', thema: 'Lager',
      geschichte: 'Es ist Ende Dezember. Im Lager stehen Kisten mit Kassetten, Spielkonsolen und Kameras. Die Chefin sagt: Wir müssen Inventur machen.',
      schritte: [
        { frage: 'Was ist eine Inventur?', antworten: ['Das Zählen aller Waren im Lager zu einem Stichtag', 'Eine Werbeaktion', 'Das Verpacken von Paketen'], richtig: 0,
          erklaerung: 'Bei der Inventur wird der tatsächliche Bestand gezählt und mit dem Bestand im System verglichen. Händler müssen das regelmäßig machen.' },
        { frage: 'Im System stehen 12 Kassetten, im Regal liegen 10. Was machst du?', antworten: ['Den Unterschied ignorieren', 'Den Unterschied melden und den Bestand im System korrigieren', 'Zwei Kassetten nachkaufen und nichts sagen'], richtig: 1,
          erklaerung: 'Unterschiede werden dokumentiert und korrigiert. Sonst verkauft der Shop Ware, die gar nicht mehr da ist.' },
        { frage: 'Von einer beliebten Konsole sind nur noch 2 Stück da. Was hilft?', antworten: ['Ein Mindestbestand, bei dem automatisch nachbestellt wird', 'Abwarten, bis alles weg ist', 'Den Artikel aus dem Shop löschen'], richtig: 0,
          erklaerung: 'Mit einem Mindestbestand wird rechtzeitig nachbestellt, bevor ein Artikel ausverkauft ist.' },
        { frage: 'Ein Artikel liegt seit zwei Jahren im Lager. Wie nennt man so etwas?', antworten: ['Bestseller', 'Ladenhüter', 'Neuheit'], richtig: 1,
          erklaerung: 'Ladenhüter binden Geld und Platz. Oft hilft eine Rabattaktion oder ein besseres Foto und eine neue Beschreibung.' }
      ]
    },
    {
      id: 'r8', shop: 'retro', titel: 'Gefunden werden', thema: 'Suchmaschinen',
      geschichte: 'Der Shop verkauft schöne Retro-Telefone, aber kaum jemand findet sie über Suchmaschinen. Du sollst die Produktseite verbessern.',
      schritte: [
        { frage: 'Was bedeutet SEO?', antworten: ['Suchmaschinenoptimierung', 'Sicherer E-Mail-Ordner', 'Sonderangebot ohne Ende'], richtig: 0,
          erklaerung: 'SEO heißt Search Engine Optimization: Die Seite wird so gestaltet, dass sie in den Suchergebnissen weiter oben erscheint.' },
        { frage: 'Welche Beschreibung hilft am meisten?', antworten: ['Schönes Telefon.', 'Retro-Telefon mit Wählscheibe in Rot, 60er Jahre, funktioniert am normalen Telefonanschluss', 'Telefon Telefon Telefon Telefon Telefon'], richtig: 1,
          erklaerung: 'Natürliche Sätze mit den Wörtern, nach denen Menschen suchen. Wörter einfach zu wiederholen schadet eher.' },
        { frage: 'Wofür ist der Alternativtext bei Bildern gut?', antworten: ['Für nichts', 'Er beschreibt das Bild für Suchmaschinen und für Menschen, die nicht sehen können', 'Er macht das Bild bunter'], richtig: 1,
          erklaerung: 'Der Alternativtext hilft bei der Barrierefreiheit und bei der Bildersuche.' },
        { frage: 'Woran merkst du, ob die Änderungen wirken?', antworten: ['An mehr Besuchen über Suchmaschinen in den nächsten Wochen', 'Am nächsten Morgen ist alles anders', 'Gar nicht'], richtig: 0,
          erklaerung: 'SEO braucht Zeit. In der Webanalyse sieht man nach einigen Wochen, ob mehr Besucher über die Suche kommen.' }
      ]
    },
    {
      id: 'k1', shop: 'kaffee', titel: 'Neue Bohnen für den Winter', thema: 'Beschaffung',
      geschichte: 'Die Rösterei will eine neue Wintersorte anbieten. Chefin Selin bittet dich, einen Lieferanten für Rohkaffee zu finden und die erste Bestellung vorzubereiten.',
      schritte: [
        { frage: 'Zwei Lieferanten haben geantwortet. A: 8,00 Euro pro Kilo, 10 Prozent Rabatt, Fracht frei. B: 7,50 Euro pro Kilo, kein Rabatt, Fracht 0,40 Euro pro Kilo. Wer ist günstiger?', antworten: ['B, weil der Listenpreis niedriger ist', 'A, denn nach Rabatt kostet das Kilo 7,20 Euro, bei B mit Fracht 7,90 Euro', 'Beide sind gleich teuer'], richtig: 1,
          erklaerung: 'Vergleichen muss man die Bezugspreise: Listenpreis minus Rabatt plus Bezugskosten. Der niedrigere Listenpreis allein sagt wenig.' },
        { frage: 'Lieferant A ist günstiger, liefert aber laut Bewertungen oft verspätet. Was tust du?', antworten: ['Egal, Hauptsache billig', 'Auch Qualität und Zuverlässigkeit bewerten, zum Beispiel mit einer Entscheidungsbewertungstabelle', 'Einfach beide nehmen, ohne nachzudenken'], richtig: 1,
          erklaerung: 'Neben dem Preis zählen Lieferzeit, Zuverlässigkeit, Qualität und Service. Eine gewichtete Tabelle macht die Entscheidung nachvollziehbar.' },
        { frage: 'Pro Tag werden 6 Kilo der Sorte geröstet, die Lieferzeit beträgt 10 Tage, als Reserve sollen 20 Kilo bleiben. Wann bestellst du nach?', antworten: ['Bei 60 Kilo', 'Bei 80 Kilo', 'Erst wenn das Lager leer ist'], richtig: 1,
          erklaerung: 'Meldebestand: 6 mal 10 ergibt 60, plus 20 Kilo Mindestbestand ergibt 80 Kilo.' },
        { frage: 'Die Lieferung kommt. Ein Sack ist aufgerissen. Was machst du zuerst?', antworten: ['Den Sack einfach wegwerfen', 'Den Schaden vom Fahrer bestätigen lassen, fotografieren und dem Lieferanten sofort melden', 'Nichts sagen, das fällt schon nicht auf'], richtig: 1,
          erklaerung: 'Sichtbare Schäden werden direkt bei der Annahme dokumentiert. Zwischen Firmen müssen Mängel unverzüglich gemeldet werden.' }
      ]
    },
    {
      id: 'k2', shop: 'kaffee', titel: 'Die Bohnen kommen nicht', thema: 'Lieferverzug',
      geschichte: 'Mit dem Lieferanten war fest vereinbart: Lieferung am 1. Oktober. Heute ist der 8. Oktober, und die Bohnen sind immer noch nicht da. Die ersten Kunden haben die Wintersorte schon vorbestellt.',
      schritte: [
        { frage: 'Ist der Lieferant schon in Verzug, obwohl du ihn nicht gemahnt hast?', antworten: ['Nein, ohne Mahnung nie', 'Ja, bei einem fest vereinbarten Liefertermin ist keine Mahnung nötig', 'Nur, wenn er es selbst zugibt'], richtig: 1,
          erklaerung: 'Ist der Liefertermin nach dem Kalender genau bestimmt, kommt der Lieferant mit Ablauf dieses Tages in Verzug.' },
        { frage: 'Was schreibst du dem Lieferanten?', antworten: ['Eine wütende Nachricht ohne konkrete Angaben', 'Eine sachliche E-Mail mit Bestellnummer, vereinbartem Termin und einer Nachfrist', 'Gar nichts, irgendwann kommt es schon'], richtig: 1,
          erklaerung: 'Sachlich, konkret und mit Frist. Die Nachfrist ist wichtig, falls du später vom Vertrag zurücktreten möchtest.' },
        { frage: 'Wie informierst du die Kunden, die vorbestellt haben?', antworten: ['Gar nicht, sonst stornieren sie', 'Ehrlich per E-Mail: Verzögerung, neuer voraussichtlicher Termin und die Möglichkeit zu stornieren', 'Ihnen einfach eine andere Sorte schicken'], richtig: 1,
          erklaerung: 'Offene Kommunikation erhält das Vertrauen. Eine andere Ware ohne Absprache zu schicken wäre eine Falschlieferung.' },
        { frage: 'Auch nach der Nachfrist liefert der Lieferant nicht. Was ist jetzt möglich?', antworten: ['Nichts, man muss weiter warten', 'Vom Vertrag zurücktreten und bei einem anderen Lieferanten kaufen', 'Dem Lieferanten eine Mahnung über die eigene Rechnung schicken'], richtig: 1,
          erklaerung: 'Nach Ablauf einer angemessenen Nachfrist darf der Käufer zurücktreten. Unter Umständen kann er auch Schadensersatz verlangen. Im Zweifel fragt man im Betrieb oder bei einer Rechtsberatung nach.' }
      ]
    },
    {
      id: 'k3', shop: 'kaffee', titel: 'Das Café zahlt nicht', thema: 'Zahlungsverzug und Mahnwesen',
      geschichte: 'Ein Café aus Köln bezieht jeden Monat Kaffee auf Rechnung. Die Rechnung über 640 Euro vom August ist seit sechs Wochen überfällig.',
      schritte: [
        { frage: 'Womit fängst du an?', antworten: ['Sofort einen Mahnbescheid beim Gericht beantragen', 'Eine freundliche Zahlungserinnerung mit Rechnungsnummer und neuer Frist', 'Die Lieferungen ohne Nachricht einstellen'], richtig: 1,
          erklaerung: 'Oft wurde eine Rechnung einfach übersehen. Eine freundliche Erinnerung erhält die Kundenbeziehung.' },
        { frage: 'Auch nach der Erinnerung kommt kein Geld. Was folgt als Nächstes?', antworten: ['Eine Mahnung mit klarer Zahlungsfrist', 'Eine öffentliche Beschwerde in den sozialen Medien', 'Die Forderung vergessen'], richtig: 0,
          erklaerung: 'Das Mahnwesen wird Schritt für Schritt deutlicher: Erinnerung, Mahnung, letzte Mahnung. Öffentliche Bloßstellung ist unprofessionell und kann rechtlich Ärger bringen.' },
        { frage: 'Der Inhaber ruft an: Das Café hat gerade Geldprobleme, er möchte in zwei Raten zahlen. Was tust du?', antworten: ['Sofort ablehnen', 'Mit der Chefin sprechen und eine Ratenzahlung mit festen Terminen schriftlich vereinbaren', 'Am Telefon zusagen und nichts aufschreiben'], richtig: 1,
          erklaerung: 'Eine Ratenzahlung kann sinnvoll sein, damit das Geld überhaupt kommt. Wichtig ist eine schriftliche Vereinbarung und die Freigabe durch die Chefin.' },
        { frage: 'Warum sollte man offene Rechnungen nicht jahrelang liegen lassen?', antworten: ['Weil Forderungen verjähren, in der Regel nach drei Jahren ab Jahresende', 'Weil das Finanzamt es verbietet', 'Das ist egal, Geld verfällt nie'], richtig: 0,
          erklaerung: 'Nach Ablauf der Verjährung kann die Forderung nicht mehr durchgesetzt werden, wenn der Kunde sich darauf beruft.' }
      ]
    },
    {
      id: 'k4', shop: 'kaffee', titel: 'Eine Hotelkette fragt an', thema: 'Verträge im B2B',
      geschichte: 'Eine kleine Hotelkette möchte für ihre fünf Häuser Kaffee kaufen. Sie fragt per E-Mail, zu welchen Bedingungen ihr 50 Kilo im Monat liefern könnt.',
      schritte: [
        { frage: 'Ist die Hotelkette durch ihre Anfrage schon zum Kauf verpflichtet?', antworten: ['Ja, Anfrage ist Anfrage', 'Nein, eine Anfrage ist immer unverbindlich', 'Nur, wenn sie per Post kommt'], richtig: 1,
          erklaerung: 'Mit einer Anfrage erkundigt sich jemand nur nach den Bedingungen. Verpflichtet ist dadurch niemand.' },
        { frage: 'Was gehört in dein Angebot?', antworten: ['Nur der Preis', 'Preis, Menge, Lieferzeit, Lieferbedingungen, Zahlungsbedingungen und wie lange das Angebot gilt', 'Ein schönes Foto, sonst nichts'], richtig: 1,
          erklaerung: 'Ein gutes Angebot ist vollständig. Unklarheiten führen später zu Streit.' },
        { frage: 'Die Kaffeepreise schwanken stark. Wie schützt du die Rösterei?', antworten: ['Gar nicht', 'Das Angebot befristen, zum Beispiel „gültig bis 30. November“', 'Den Preis im Angebot weglassen'], richtig: 1,
          erklaerung: 'Ein Angebot bindet den Verkäufer. Mit einer Befristung oder einer Klausel wie „freibleibend“ begrenzt man das Risiko.' },
        { frage: 'Das Hotel bestellt, möchte aber 3 Prozent Skonto statt der angebotenen 2 Prozent. Ist der Vertrag damit geschlossen?', antworten: ['Ja, die Bestellung zählt immer', 'Nein, die Bestellung weicht ab und gilt als neues Angebot. Erst eure Auftragsbestätigung schließt den Vertrag', 'Ja, aber nur zu den alten Bedingungen'], richtig: 1,
          erklaerung: 'Eine Bestellung mit geänderten Bedingungen ist ein neues Angebot. Der Vertrag kommt erst zustande, wenn ihr es annehmt, zum Beispiel mit einer Auftragsbestätigung.' }
      ]
    },
    {
      id: 'k5', shop: 'kaffee', titel: 'Shop oder Marktplatz?', thema: 'Vertriebskanäle',
      geschichte: 'Bisher verkauft die Rösterei nur im eigenen Shop. Selin überlegt, zusätzlich auf einem großen Marktplatz zu verkaufen. Du sollst die Entscheidung vorbereiten.',
      schritte: [
        { frage: 'Was spricht für den Marktplatz?', antworten: ['Er kostet nichts', 'Große Reichweite und viele Kunden, die dort ohnehin suchen', 'Man bekommt alle Kundendaten für den Newsletter'], richtig: 1,
          erklaerung: 'Marktplätze bringen Reichweite und Vertrauen. Dafür fallen Gebühren an und Kundendaten bleiben weitgehend bei der Plattform.' },
        { frage: 'Ein Kilo Kaffee kostet 28 Euro netto, die variablen Kosten liegen bei 19 Euro. Der Marktplatz nimmt 15 Prozent Provision vom Verkaufspreis. Wie viel bleibt pro Kilo als Deckungsbeitrag?', antworten: ['9 Euro', '4,80 Euro', '13,20 Euro'], richtig: 1,
          erklaerung: '15 Prozent von 28 Euro sind 4,20 Euro. 28 minus 19 minus 4,20 ergibt 4,80 Euro. Im eigenen Shop wären es 9 Euro.' },
        { frage: 'Welche Sorten würdest du zuerst auf den Marktplatz stellen?', antworten: ['Alle Sorten gleichzeitig', 'Ein paar beliebte Sorten mit gutem Deckungsbeitrag, um den Kanal zu testen', 'Nur die Sorten, die sonst keiner kauft'], richtig: 1,
          erklaerung: 'Klein anfangen und messen ist klüger. Ladenhüter verkaufen sich auf dem Marktplatz meist auch nicht.' },
        { frage: 'Ein Influencer bietet an, euren Kaffee in seinem Instagram-Shop zu verkaufen. Wie heißt dieser Kanal?', antworten: ['Social Commerce', 'Dropshipping', 'Affiliate-Rechnung'], richtig: 0,
          erklaerung: 'Verkauf direkt in sozialen Netzwerken heißt Social Commerce. Gut für junge Zielgruppen, aber abhängig von der Plattform.' }
      ]
    },
    {
      id: 'k6', shop: 'kaffee', titel: 'Warum kauft keiner die Probierbox?', thema: 'Nutzerverhalten auswerten',
      geschichte: 'Die neue Probierbox hat viele Besucher, aber kaum Bestellungen. Selin gibt dir Zugang zur Webanalyse und fragt: Woran liegt es?',
      schritte: [
        { frage: 'Der Funnel zeigt: 1.000 Besucher auf der Produktseite, 300 legen die Box in den Warenkorb, 40 bestellen. Wo steigen die meisten aus?', antworten: ['Vor der Produktseite', 'Zwischen Warenkorb und fertiger Bestellung', 'Nach der Bestellung'], richtig: 1,
          erklaerung: 'Von 300 im Warenkorb bestellen nur 40. Der größte Verlust passiert also im Kassenbereich.' },
        { frage: 'Was könnte im Kassenbereich abschrecken?', antworten: ['Die Farbe des Logos', 'Überraschend hohe Versandkosten oder eine fehlende Lieblings-Zahlart', 'Zu viele Produktfotos'], richtig: 1,
          erklaerung: 'Typische Gründe für Abbrüche an der Kasse sind unerwartete Kosten, fehlende Zahlarten und ein Zwang zum Kundenkonto.' },
        { frage: 'Du willst prüfen, ob der Hinweis „Versandkostenfrei“ direkt auf der Produktseite hilft. Wie gehst du vor?', antworten: ['Einfach einbauen und hoffen', 'Einen A/B-Test machen: Die Hälfte sieht den Hinweis, die andere nicht', 'Gleichzeitig Preis, Bilder und Text ändern'], richtig: 1,
          erklaerung: 'Beim A/B-Test wird nur eine Sache verändert. So sieht man klar, ob genau diese Änderung wirkt.' },
        { frage: 'Nach zwei Wochen bestellen mit dem Hinweis 7 Prozent der Warenkorb-Besucher, ohne nur 4 Prozent. Und jetzt?', antworten: ['Den Hinweis für alle übernehmen und die nächste Schwachstelle suchen', 'Den Test löschen und alles beim Alten lassen', 'Den Hinweis wieder entfernen'], richtig: 0,
          erklaerung: 'Die Kennzahl hat sich deutlich verbessert. Die neue Version wird übernommen, und der Verbesserungskreislauf beginnt von vorne.' }
      ]
    },
    {
      id: 'k7', shop: 'kaffee', titel: 'Lohnt sich die Espresso-Sorte?', thema: 'Kosten und Deckungsbeitrag',
      geschichte: 'Selin möchte wissen, ob sich eine neue Espresso-Sorte lohnt. Sie gibt dir die Zahlen und bittet um eine kurze Einschätzung.',
      schritte: [
        { frage: 'Welche dieser Kosten sind fix?', antworten: ['Rohkaffee pro Kilo', 'Die Leasingrate für die Röstmaschine', 'Die Verpackung jeder Tüte'], richtig: 1,
          erklaerung: 'Die Leasingrate fällt jeden Monat gleich an. Rohkaffee und Verpackung steigen mit jeder verkauften Tüte.' },
        { frage: 'Eine Tüte kostet netto 12 Euro. Rohkaffee, Tüte und Versand kosten zusammen 7 Euro. Wie hoch ist der Deckungsbeitrag?', antworten: ['19 Euro', '5 Euro', '7 Euro'], richtig: 1,
          erklaerung: '12 Euro minus 7 Euro variable Kosten ergibt 5 Euro Deckungsbeitrag pro Tüte.' },
        { frage: 'Für die Sorte fallen zusätzlich 1.500 Euro fixe Kosten im Monat an, vor allem Werbung. Wie viele Tüten müssen verkauft werden, um die Gewinnschwelle zu erreichen?', antworten: ['150 Tüten', '300 Tüten', '1.500 Tüten'], richtig: 1,
          erklaerung: '1.500 Euro geteilt durch 5 Euro Deckungsbeitrag ergibt 300 Tüten. Erst ab der 301. Tüte entsteht Gewinn.' },
        { frage: 'Die Sorte verkauft sich gut, aber das Konto ist am Monatsende trotzdem fast leer. Woran kann das liegen?', antworten: ['Gewinn und Liquidität sind dasselbe, also an nichts', 'Viel Geld steckt im Lager oder in offenen Kundenrechnungen und fehlt deshalb gerade auf dem Konto', 'An der Mehrwertsteuer auf Espresso'], richtig: 1,
          erklaerung: 'Ein Unternehmen kann Gewinn machen und trotzdem knapp bei Kasse sein. Deshalb plant man die Liquidität voraus.' }
      ]
    },
    {
      id: 'k8', shop: 'kaffee', titel: 'Das Adventskalender-Projekt', thema: 'Projektarbeit',
      geschichte: 'Die Rösterei will zum ersten Mal einen Kaffee-Adventskalender verkaufen. Selin macht dich zur Projektleiterin. Bis zum 15. November muss alles fertig sein.',
      schritte: [
        { frage: 'Welches Projektziel ist am besten formuliert?', antworten: ['Ein schöner Adventskalender', 'Bis zum 15. November ist der Kalender im Shop, bis Weihnachten werden 400 Stück verkauft', 'Mehr Umsatz im Winter'], richtig: 1,
          erklaerung: 'Ein SMARTes Ziel ist konkret, messbar und hat einen Termin. Nur so kann man am Ende prüfen, ob es erreicht wurde.' },
        { frage: 'Wie behältst du den Überblick über die vielen Aufgaben im Team?', antworten: ['Alles im Kopf behalten', 'Ein Kanban-Board mit den Spalten „Zu erledigen“, „In Arbeit“ und „Erledigt“', 'Jeden Tag alle per Anruf fragen'], richtig: 1,
          erklaerung: 'Auf dem Kanban-Board sieht jeder sofort, wer woran arbeitet und was noch fehlt.' },
        { frage: 'Welcher Termin eignet sich als Meilenstein?', antworten: ['Jeden Morgen um 9 Uhr', '„Alle 24 Sorten sind festgelegt und beim Lieferanten bestellt“ bis zum 1. Oktober', 'Irgendwann im Herbst'], richtig: 1,
          erklaerung: 'Ein Meilenstein ist ein wichtiges, überprüfbares Zwischenziel mit festem Datum.' },
        { frage: 'Nach Weihnachten ist das Projekt vorbei. Was gehört noch dazu?', antworten: ['Nichts, Hauptsache verkauft', 'Ein Projektbericht mit Ergebnis, Zahlen und Lessons Learned für das nächste Jahr', 'Alle Unterlagen löschen'], richtig: 1,
          erklaerung: 'Zum Abschluss gehört eine ehrliche Auswertung. Was gut lief und was schiefging, macht das nächste Projekt besser.' }
      ]
    }
  ];

  // Antworten in zufälliger Reihenfolge zeigen, damit die richtige nicht immer an derselben Stelle steht
  const mischen = (liste) => { const a = liste.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  let aktuell = null;   // Index der Mission
  let schritt = 0;
  let richtigBeimErsten = 0;

  function stand() {
    const d = window.ATB.daten;
    if (!d.missionen) d.missionen = {};
    return d.missionen;
  }
  const sterne = (n) => '★'.repeat(n) + '☆'.repeat(4 - n);

  // ---------- Übersicht: erst Shop wählen, dann öffnen sich die Missionen rechts daneben ----------
  let gewaehlt = null; // id des geöffneten Shops

  function zeigeListe() {
    aktuell = null;
    $('rs-liste').hidden = false;
    $('rs-mission').hidden = true;
    const s = stand();
    const shops = $('rs-shops');
    shops.textContent = '';
    SHOPS.forEach((shop) => {
      const liste = MISSIONEN.filter((m) => m.shop === shop.id);
      const fertig = liste.filter((m) => s[m.id] && s[m.id].geschafft).length;
      const karte = el('div', null, 'card modulkarte rs-shopkarte' + (gewaehlt === shop.id ? ' aktiv' : ''));
      const body = el('div', null, 'card-body');
      body.appendChild(el('h4', shop.name, 'card-title'));
      body.appendChild(el('p', shop.text, 'lesbar leise'));
      body.appendChild(el('p', liste.length + ' Missionen · ' + fertig + ' geschafft', 'modulinfo'));
      const offen = gewaehlt === shop.id;
      const k = el('button', offen ? 'Shop schließen' : 'Shop öffnen', offen ? 'btn-small' : 'btn-primary');
      k.type = 'button';
      k.setAttribute('aria-expanded', String(offen));
      k.addEventListener('click', () => {
        gewaehlt = offen ? null : shop.id;
        zeigeListe();
        if (gewaehlt) oeffneMissionen(); else if (window.SPUR) window.SPUR.anfang();
      });
      body.appendChild(k);
      karte.appendChild(body);
      shops.appendChild(karte);
    });

    const box = $('rs-missionen');
    box.textContent = '';
    box.hidden = !gewaehlt;
    if (gewaehlt) {
      const shop = SHOPS.find((x) => x.id === gewaehlt);
      const kopf = el('div', null, 'rs-shop');
      kopf.appendChild(el('h3', shop.name + ': Missionen'));
      box.appendChild(kopf);
      let nr = 0;
      MISSIONEN.forEach((m, i) => { if (m.shop === gewaehlt) karteFuer(m, i, ++nr); });
    }
    function karteFuer(m, i, nr) {
      const e = s[m.id];
      const karte = el('div', null, 'card modulkarte');
      const body = el('div', null, 'card-body');
      const titel = el('h4', nr + '. ' + m.titel, 'card-title');
      body.appendChild(titel);
      body.appendChild(el('p', m.thema, 'modulinfo'));
      if (e && e.geschafft) body.appendChild(el('p', sterne(e.sterne) + '  bestes Ergebnis', 'rs-sterne'));
      const k = el('button', e && e.geschafft ? 'Nochmal spielen' : 'Mission starten', e && e.geschafft ? 'btn-small' : 'btn-primary');
      k.type = 'button';
      k.addEventListener('click', () => starte(i));
      body.appendChild(k);
      karte.appendChild(body);
      box.appendChild(karte);
    }
    const fertig = MISSIONEN.filter((m) => s[m.id] && s[m.id].geschafft).length;
    $('rs-stand').textContent = fertig + ' von ' + MISSIONEN.length + ' Missionen geschafft';
  }

  // Die Missionen ins Bild holen, falls sie rechts außerhalb liegen (auf dem Handy immer)
  function oeffneMissionen() {
    const ziel = $('rs-missionen').firstElementChild;
    if (!ziel) return;
    requestAnimationFrame(() => {
      const r = ziel.getBoundingClientRect();
      if (r.right > window.innerWidth - 16 || r.left < 0) ziel.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    });
  }

  // ---------- Mission ----------
  function starte(i) {
    aktuell = i; schritt = 0; richtigBeimErsten = 0;
    const m = MISSIONEN[i];
    $('rs-liste').hidden = true;
    $('rs-mission').hidden = false;
    $('rs-titel').textContent = m.titel;
    $('rs-thema').textContent = ((SHOPS.find((x) => x.id === m.shop) || {}).name || 'Praxis') + ' · Mission ' + (MISSIONEN.filter((x) => x.shop === m.shop).indexOf(m) + 1) + ' · ' + m.thema;
    $('rs-geschichte').textContent = m.geschichte;
    $('rs-ende').hidden = true;
    $('rs-aufgabe').hidden = false;
    zeigeSchritt();
    if (window.SPUR) window.SPUR.anfang(); else window.scrollTo(0, 0);
  }

  function zeigeSchritt() {
    const m = MISSIONEN[aktuell];
    const st = m.schritte[schritt];
    $('rs-schritt').textContent = 'Schritt ' + (schritt + 1) + ' von ' + m.schritte.length;
    $('rs-frage').textContent = st.frage;
    $('rs-rueck').textContent = '';
    $('rs-rueck').className = 'lesbar';
    $('rs-weiter').hidden = true;
    const box = $('rs-antworten');
    box.textContent = '';
    mischen(st.antworten.map((a, ai) => [a, ai])).forEach(([a, ai]) => {
      const b = el('button', a); b.type = 'button';
      if (ai === st.richtig) b.dataset.richtig = '1';
      b.addEventListener('click', () => {
        box.querySelectorAll('button').forEach((x) => { x.disabled = true; });
        const ok = ai === st.richtig;
        b.classList.add(ok ? 'btn-success' : 'btn-danger');
        if (!ok) box.querySelector('[data-richtig]').classList.add('btn-success');
        if (ok) richtigBeimErsten++;
        $('rs-rueck').textContent = (ok ? 'Richtig! ' : 'Nicht ganz. ') + st.erklaerung;
        $('rs-weiter').textContent = schritt < m.schritte.length - 1 ? 'Weiter' : 'Mission abschließen';
        $('rs-weiter').hidden = false;
        const r = $('rs-weiter').getBoundingClientRect();
        if (r.right > window.innerWidth || r.bottom > window.innerHeight - 64) $('rs-weiter').scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      });
      box.appendChild(b);
    });
  }

  function weiter() {
    const m = MISSIONEN[aktuell];
    if (schritt < m.schritte.length - 1) { schritt++; zeigeSchritt(); if (window.SPUR) window.SPUR.zeige($('rs-aufgabe')); return; }
    // Mission geschafft
    const s = stand();
    const alt = s[m.id] || {};
    s[m.id] = { geschafft: true, sterne: Math.max(alt.sterne || 0, richtigBeimErsten), geaendert: Date.now() };
    window.ATB.speichern();
    $('rs-aufgabe').hidden = true;
    $('rs-ende').hidden = false;
    $('rs-ende-sterne').textContent = sterne(richtigBeimErsten);
    $('rs-ende-text').textContent = richtigBeimErsten === 4 ? 'Alles richtig – der Shop läuft mit dir!'
      : richtigBeimErsten >= 2 ? richtigBeimErsten + ' von 4 auf Anhieb richtig. Gute Arbeit!'
      : 'Mission geschafft! Lies dir die Erklärungen noch einmal durch und spiel sie später nochmal.';
    $('rs-naechste').hidden = aktuell >= MISSIONEN.length - 1;
  }

  $('rs-weiter').addEventListener('click', weiter);
  $('rs-zurueck').addEventListener('click', zeigeListe);
  $('rs-zur-liste').addEventListener('click', zeigeListe);
  $('rs-naechste').addEventListener('click', () => starte(aktuell + 1));

  window.MISSIONEN = { zeige: zeigeListe, LISTE: MISSIONEN, SHOPS };
})();
