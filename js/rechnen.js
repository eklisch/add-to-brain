// Add to Brain – Rechen-Trainer: typische Rechnungen aus dem E-Commerce mit Rechenweg
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const zufall = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const wahl = (liste) => liste[Math.floor(Math.random() * liste.length)];
  const rund = (x) => Math.round(x * 100) / 100;
  const eur = (x) => x.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  const zahl = (x, st) => x.toLocaleString('de-DE', { minimumFractionDigits: st || 0, maximumFractionDigits: st == null ? 2 : st });
  const proz = (x) => zahl(x) + ' %';
  const preis = (min, max) => zufall(min, max) + wahl([0, 0.5, 0.9, 0.99, 0.49]);
  const produkte = ['ein T-Shirt', 'einen Rucksack', 'eine Lampe', 'einen Kaffeebecher', 'Kopfhörer', 'einen Pflanzentopf', 'eine Jacke', 'ein Brettspiel', 'eine Handyhülle', 'ein Notizbuch'];

  // Jede Aufgabe: text, loesung, einheit ('€' oder '%' oder ''), weg (Rechenweg), toleranz
  const THEMEN = {
    mwst: {
      titel: 'Mehrwertsteuer',
      formeln: ['Brutto = Netto × 1,19 (bei 7 %: × 1,07)', 'Netto = Brutto ÷ 1,19 (bei 7 %: ÷ 1,07)', 'Steuerbetrag = Brutto − Netto', 'Steuer aus dem Nettopreis = Netto × 19 ÷ 100'],
      aufgaben: [
        () => { const n = preis(10, 200), s = wahl([19, 19, 7]), b = rund(n * (1 + s / 100));
          return { text: 'Ein Artikel kostet netto ' + eur(n) + '. Wie hoch ist der Bruttopreis bei ' + s + ' % Mehrwertsteuer?', loesung: b, einheit: '€',
            weg: [eur(n) + ' × ' + zahl(1 + s / 100, 2) + ' = ' + eur(b), s === 7 ? '7 % gelten zum Beispiel für Bücher und viele Lebensmittel.' : '19 % sind der normale Steuersatz.'] }; },
        () => { const b = preis(10, 250), s = wahl([19, 19, 7]), n = rund(b / (1 + s / 100));
          return { text: 'Im Shop steht der Bruttopreis ' + eur(b) + ' (' + s + ' % Mehrwertsteuer). Wie hoch ist der Nettopreis?', loesung: n, einheit: '€',
            weg: [eur(b) + ' ÷ ' + zahl(1 + s / 100, 2) + ' = ' + eur(n), 'Nicht einfach ' + s + ' % abziehen – das ergibt einen falschen Wert.'] }; },
        () => { const b = preis(20, 300), n = rund(b / 1.19), st = rund(b - n);
          return { text: 'Ein Kunde zahlt ' + eur(b) + ' inklusive 19 % Mehrwertsteuer. Wie viel davon ist Steuer?', loesung: st, einheit: '€',
            weg: ['Netto: ' + eur(b) + ' ÷ 1,19 = ' + eur(n), 'Steuer: ' + eur(b) + ' − ' + eur(n) + ' = ' + eur(st)] }; },
        () => { const n = zufall(5, 120) * 5, st = rund(n * 0.19);
          return { text: 'Eine Rechnung lautet über ' + eur(n) + ' netto. Wie viel Mehrwertsteuer (19 %) kommt dazu?', loesung: st, einheit: '€',
            weg: [eur(n) + ' × 19 ÷ 100 = ' + eur(st), 'Rechnungsbetrag brutto: ' + eur(n) + ' + ' + eur(st) + ' = ' + eur(rund(n + st))] }; },
        () => { const st = zufall(2, 6), n = preis(8, 60), b = rund(rund(st * n) * 1.19);
          return { text: 'Eine Kundin bestellt ' + st + ' Stück zu je ' + eur(n) + ' netto. Wie hoch ist der Rechnungsbetrag inklusive 19 % Mehrwertsteuer?', loesung: b, einheit: '€',
            weg: ['Netto gesamt: ' + st + ' × ' + eur(n) + ' = ' + eur(rund(st * n)), 'Brutto: ' + eur(rund(st * n)) + ' × 1,19 = ' + eur(b)] }; }
      ]
    },
    rabatt: {
      titel: 'Rabatt und Skonto',
      formeln: ['Rabatt in € = Preis × Rabatt-% ÷ 100', 'Neuer Preis = Preis × (100 − Rabatt-%) ÷ 100', 'Skonto: Abzug bei schneller Zahlung, gerechnet vom Rechnungsbetrag', 'Rabatt und Skonto zusammen: erst den Rabatt abziehen, dann Skonto vom neuen Betrag'],
      aufgaben: [
        () => { const p = preis(20, 150), r = wahl([10, 15, 20, 25, 30, 40, 50]), np = rund(p * (100 - r) / 100);
          return { text: 'Im Sale gibt es ' + r + ' % Rabatt. Du kaufst ' + wahl(produkte) + ' für ursprünglich ' + eur(p) + '. Was zahlst du jetzt?', loesung: np, einheit: '€',
            weg: [eur(p) + ' × ' + (100 - r) + ' ÷ 100 = ' + eur(np), 'Oder: Rabatt ' + eur(rund(p * r / 100)) + ' abziehen.'] }; },
        () => { const alt = zufall(4, 30) * 5, r = wahl([10, 20, 25, 30, 40]), neu = rund(alt * (100 - r) / 100);
          return { text: 'Ein Artikel kostete ' + eur(alt) + ' und kostet jetzt ' + eur(neu) + '. Wie viel Prozent Rabatt sind das?', loesung: r, einheit: '%',
            weg: ['Ersparnis: ' + eur(alt) + ' − ' + eur(neu) + ' = ' + eur(rund(alt - neu)), eur(rund(alt - neu)) + ' ÷ ' + eur(alt) + ' × 100 = ' + proz(r)] }; },
        () => { const re = zufall(20, 120) * 10, s = wahl([2, 3]), z = rund(re * (100 - s) / 100);
          return { text: 'Eine Lieferantenrechnung über ' + eur(re) + ' erlaubt ' + s + ' % Skonto bei Zahlung innerhalb von 10 Tagen. Wie viel überweist du?', loesung: z, einheit: '€',
            weg: ['Skonto: ' + eur(re) + ' × ' + s + ' ÷ 100 = ' + eur(rund(re * s / 100)), eur(re) + ' − ' + eur(rund(re * s / 100)) + ' = ' + eur(z)] }; },
        () => { const p = preis(20, 200), r = wahl([10, 15, 20, 25, 30]), e = rund(p * r / 100);
          return { text: 'Auf ' + wahl(produkte) + ' für ' + eur(p) + ' gibt es ' + r + ' % Rabatt. Wie viel Euro sparst du?', loesung: e, einheit: '€',
            weg: [eur(p) + ' × ' + r + ' ÷ 100 = ' + eur(e)] }; },
        () => { const lp = zufall(10, 80) * 10, r = wahl([5, 10, 15, 20]), s = wahl([2, 3]), nachR = rund(lp * (100 - r) / 100), z = rund(nachR * (100 - s) / 100);
          return { text: 'Euer Lieferant gewährt auf ' + eur(lp) + ' zuerst ' + r + ' % Rabatt und bei schneller Zahlung zusätzlich ' + s + ' % Skonto. Wie viel überweist ihr?', loesung: z, einheit: '€',
            weg: ['Nach Rabatt: ' + eur(lp) + ' × ' + (100 - r) + ' ÷ 100 = ' + eur(nachR), 'Nach Skonto: ' + eur(nachR) + ' × ' + (100 - s) + ' ÷ 100 = ' + eur(z), 'Skonto wird vom Betrag nach Rabatt gerechnet, nicht vom Listenpreis.'] }; }
      ]
    },
    kalkulation: {
      titel: 'Kalkulation',
      formeln: ['Verkaufspreis = Einkaufspreis × (100 + Zuschlag-%) ÷ 100', 'Kalkulationszuschlag = (VK − EK) ÷ EK × 100', 'Handelsspanne = (VK − EK) ÷ VK × 100', 'Rohgewinn pro Stück = VK − EK (beides netto)', 'Bruttoverkaufspreis = Nettoverkaufspreis × 1,19'],
      aufgaben: [
        () => { const ek = zufall(5, 60), z = wahl([40, 50, 60, 80, 100]), vk = rund(ek * (100 + z) / 100);
          return { text: 'Ihr kauft ' + wahl(produkte) + ' für ' + eur(ek) + ' netto ein und rechnet ' + z + ' % Kalkulationszuschlag. Wie hoch ist der Nettoverkaufspreis?', loesung: vk, einheit: '€',
            weg: [eur(ek) + ' × ' + (100 + z) + ' ÷ 100 = ' + eur(vk)] }; },
        () => { const ek = zufall(4, 40) * 5, z = wahl([25, 40, 50, 60, 100]), vk = rund(ek * (100 + z) / 100);
          return { text: 'Einkaufspreis ' + eur(ek) + ', Verkaufspreis ' + eur(vk) + ' (beides netto). Wie hoch ist der Kalkulationszuschlag?', loesung: z, einheit: '%',
            weg: ['Unterschied: ' + eur(vk) + ' − ' + eur(ek) + ' = ' + eur(rund(vk - ek)), eur(rund(vk - ek)) + ' ÷ ' + eur(ek) + ' × 100 = ' + proz(z), 'Beim Zuschlag teilst du durch den Einkaufspreis.'] }; },
        () => { const vk = zufall(4, 40) * 5, sp = wahl([20, 25, 40, 50]), ek = rund(vk * (100 - sp) / 100);
          return { text: 'Einkaufspreis ' + eur(ek) + ', Verkaufspreis ' + eur(vk) + ' (beides netto). Wie hoch ist die Handelsspanne?', loesung: sp, einheit: '%',
            weg: ['Unterschied: ' + eur(vk) + ' − ' + eur(ek) + ' = ' + eur(rund(vk - ek)), eur(rund(vk - ek)) + ' ÷ ' + eur(vk) + ' × 100 = ' + proz(sp), 'Bei der Handelsspanne teilst du durch den Verkaufspreis.'] }; },
        () => { const ek = preis(5, 40), vk = rund(ek + zufall(3, 30) + wahl([0, 0.5, 0.99])), g = rund(vk - ek);
          return { text: 'Ihr verkauft ' + wahl(produkte) + ' für ' + eur(vk) + ' netto. Im Einkauf kostet es ' + eur(ek) + ' netto. Wie hoch ist der Rohgewinn pro Stück?', loesung: g, einheit: '€',
            weg: [eur(vk) + ' − ' + eur(ek) + ' = ' + eur(g), 'Vom Rohgewinn müssen noch Kosten wie Versand, Miete und Personal bezahlt werden.'] }; },
        () => { const ek = zufall(4, 50), z = wahl([50, 60, 80, 100]), vkn = rund(ek * (100 + z) / 100), vkb = rund(vkn * 1.19);
          return { text: 'Einkaufspreis ' + eur(ek) + ' netto, Kalkulationszuschlag ' + z + ' %. Welcher Preis steht für Privatkunden im Shop (inklusive 19 % Mehrwertsteuer)?', loesung: vkb, einheit: '€',
            weg: ['Netto-VK: ' + eur(ek) + ' × ' + (100 + z) + ' ÷ 100 = ' + eur(vkn), 'Brutto-VK: ' + eur(vkn) + ' × 1,19 = ' + eur(vkb), 'Privatkunden sehen im Shop immer den Bruttopreis.'] }; }
      ]
    },
    kennzahlen: {
      titel: 'Shop-Kennzahlen',
      formeln: ['Conversion Rate = Bestellungen ÷ Besuche × 100', 'Durchschnittlicher Warenkorb = Umsatz ÷ Bestellungen', 'Retourenquote = Rücksendungen ÷ Bestellungen × 100', 'Umsatz = Bestellungen × durchschnittlicher Warenkorb', 'Bestellungen = Besuche × Conversion Rate ÷ 100'],
      aufgaben: [
        () => { const bes = zufall(20, 80) * 100, cr = wahl([1, 1.5, 2, 2.5, 3, 4]), b = Math.round(bes * cr / 100);
          return { text: 'Euer Shop hatte ' + zahl(bes) + ' Besuche und ' + zahl(b) + ' Bestellungen. Wie hoch ist die Conversion Rate?', loesung: rund(b / bes * 100), einheit: '%',
            weg: [zahl(b) + ' ÷ ' + zahl(bes) + ' × 100 = ' + proz(rund(b / bes * 100)), 'Im Onlinehandel sind 1 bis 3 % üblich.'] }; },
        () => { const b = zufall(40, 300), wk = zufall(25, 90), u = b * wk;
          return { text: 'Im Oktober gab es ' + zahl(b) + ' Bestellungen mit zusammen ' + eur(u) + ' Umsatz. Wie hoch ist der durchschnittliche Warenkorbwert?', loesung: wk, einheit: '€',
            weg: [eur(u) + ' ÷ ' + zahl(b) + ' = ' + eur(wk)] }; },
        () => { const b = zufall(10, 60) * 10, q = wahl([5, 10, 12, 15, 20, 25, 30]), r = Math.round(b * q / 100);
          return { text: 'Von ' + zahl(b) + ' Bestellungen wurden ' + zahl(r) + ' zurückgeschickt. Wie hoch ist die Retourenquote?', loesung: rund(r / b * 100), einheit: '%',
            weg: [zahl(r) + ' ÷ ' + zahl(b) + ' × 100 = ' + proz(rund(r / b * 100)), 'Bei Mode sind Quoten über 40 % keine Seltenheit.'] }; },
        () => { const b = zufall(50, 400), wk = zufall(20, 95), u = b * wk;
          return { text: 'Im November rechnet ihr mit ' + zahl(b) + ' Bestellungen und einem durchschnittlichen Warenkorb von ' + eur(wk) + '. Wie viel Umsatz ist das?', loesung: u, einheit: '€',
            weg: [zahl(b) + ' × ' + eur(wk) + ' = ' + eur(u)] }; },
        () => { const bes = zufall(5, 45) * 200, cr = wahl([1, 2, 2.5, 3, 4, 5]), b = rund(bes * cr / 100);
          return { text: 'Euer Shop hat ' + zahl(bes) + ' Besuche bei einer Conversion Rate von ' + proz(cr) + '. Wie viele Bestellungen sind das?', loesung: b, einheit: '',
            weg: [zahl(bes) + ' × ' + zahl(cr) + ' ÷ 100 = ' + zahl(b)] }; }
      ]
    },
    werbung: {
      titel: 'Online-Werbung',
      formeln: ['Klickrate (CTR) = Klicks ÷ Einblendungen × 100', 'ROAS = Umsatz durch Werbung ÷ Werbekosten', 'Kosten pro Bestellung = Werbekosten ÷ Bestellungen', 'Kosten pro Klick (CPC) = Werbekosten ÷ Klicks', 'Nötiger Umsatz = Werbekosten × Ziel-ROAS'],
      aufgaben: [
        () => { const e = zufall(10, 90) * 1000, ctr = wahl([0.5, 1, 1.5, 2, 2.5, 3]), k = Math.round(e * ctr / 100);
          return { text: 'Eine Anzeige wurde ' + zahl(e) + '-mal eingeblendet und ' + zahl(k) + '-mal angeklickt. Wie hoch ist die Klickrate?', loesung: rund(k / e * 100), einheit: '%',
            weg: [zahl(k) + ' ÷ ' + zahl(e) + ' × 100 = ' + proz(rund(k / e * 100))] }; },
        () => { const kost = zufall(2, 20) * 50, roas = wahl([2, 3, 4, 5, 6, 8]), u = kost * roas;
          return { text: 'Ihr habt ' + eur(kost) + ' für Werbung ausgegeben und damit ' + eur(u) + ' Umsatz gemacht. Wie hoch ist der ROAS? (Nur die Zahl eingeben)', loesung: roas, einheit: '',
            weg: [eur(u) + ' ÷ ' + eur(kost) + ' = ' + roas, 'Das heißt: Jeder Werbe-Euro brachte ' + eur(roas) + ' Umsatz.'] }; },
        () => { const b = zufall(10, 80), cpo = zufall(3, 25), kost = b * cpo;
          return { text: 'Eine Kampagne hat ' + eur(kost) + ' gekostet und ' + zahl(b) + ' Bestellungen gebracht. Was hat eine Bestellung im Schnitt an Werbung gekostet?', loesung: cpo, einheit: '€',
            weg: [eur(kost) + ' ÷ ' + zahl(b) + ' = ' + eur(cpo)] }; },
        () => { const k = zufall(20, 400), cpc = wahl([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8, 1.2]), kost = rund(k * cpc);
          return { text: 'Eine Anzeige hat ' + eur(kost) + ' gekostet und wurde ' + zahl(k) + '-mal angeklickt. Wie viel kostet ein Klick (CPC)?', loesung: cpc, einheit: '€',
            weg: [eur(kost) + ' ÷ ' + zahl(k) + ' = ' + eur(cpc)] }; },
        () => { const kost = zufall(2, 30) * 50, ziel = wahl([3, 4, 5, 6]), u = kost * ziel;
          return { text: 'Ihr plant ' + eur(kost) + ' Werbekosten und wollt einen ROAS von ' + ziel + ' erreichen. Wie viel Umsatz muss die Werbung bringen?', loesung: u, einheit: '€',
            weg: [eur(kost) + ' × ' + ziel + ' = ' + eur(u), 'ROAS ' + ziel + ' heißt: Jeder Werbe-Euro soll ' + eur(ziel) + ' Umsatz bringen.'] }; }
      ]
    },
    lager: {
      titel: 'Lager und Kosten',
      formeln: ['Meldebestand = Tagesverbrauch × Lieferzeit in Tagen + Mindestbestand', 'Durchschnittlicher Lagerbestand = (Anfangsbestand + Endbestand) ÷ 2', 'Lagerumschlagshäufigkeit = Wareneinsatz ÷ durchschnittlicher Lagerbestand', 'Deckungsbeitrag pro Stück = Nettoverkaufspreis − variable Kosten pro Stück', 'Gewinnschwelle (Stück) = fixe Kosten ÷ Deckungsbeitrag pro Stück'],
      aufgaben: [
        () => { const tv = zufall(4, 40), lz = zufall(2, 10), mb = zufall(2, 12) * 10, m = tv * lz + mb;
          return { text: 'Von einem Artikel werden täglich ' + tv + ' Stück verkauft. Die Lieferzeit beträgt ' + lz + ' Tage, der Mindestbestand ' + mb + ' Stück. Wie hoch ist der Meldebestand?', loesung: m, einheit: '',
            weg: [tv + ' × ' + lz + ' = ' + (tv * lz), (tv * lz) + ' + ' + mb + ' = ' + m + ' Stück', 'Sobald nur noch ' + m + ' Stück im Lager sind, wird nachbestellt.'] }; },
        () => { const a = zufall(10, 80) * 100, e = zufall(10, 80) * 100, d = (a + e) / 2;
          return { text: 'Zu Jahresbeginn lag Ware im Wert von ' + eur(a) + ' im Lager, am Jahresende im Wert von ' + eur(e) + '. Wie hoch ist der durchschnittliche Lagerbestand?', loesung: d, einheit: '€',
            weg: ['(' + eur(a) + ' + ' + eur(e) + ') ÷ 2 = ' + eur(d)] }; },
        () => { const d = zufall(4, 30) * 1000, u = wahl([4, 5, 6, 8, 10, 12]), w = d * u;
          return { text: 'Der Wareneinsatz eines Jahres beträgt ' + eur(w) + ', der durchschnittliche Lagerbestand ' + eur(d) + '. Wie oft wurde das Lager umgeschlagen?', loesung: u, einheit: '',
            weg: [eur(w) + ' ÷ ' + eur(d) + ' = ' + u, 'Die Ware wurde also ' + u + '-mal im Jahr komplett verkauft und ersetzt. Im Schnitt lag sie ' + zahl(rund(360 / u), 0) + ' Tage im Lager.'] }; },
        () => { const vk = preis(15, 90), ek = rund(vk * wahl([0.4, 0.5, 0.55, 0.6])), vers = wahl([3.5, 4.2, 4.9, 5.5]), db = rund(vk - ek - vers);
          return { text: 'Ihr verkauft ' + wahl(produkte) + ' für ' + eur(vk) + ' netto. Einkauf: ' + eur(ek) + ', Verpackung und Versand: ' + eur(vers) + '. Wie hoch ist der Deckungsbeitrag pro Stück?', loesung: db, einheit: '€',
            weg: [eur(vk) + ' − ' + eur(ek) + ' − ' + eur(vers) + ' = ' + eur(db), 'Mit diesem Betrag trägt jedes Stück zur Deckung der fixen Kosten bei.'] }; },
        () => { const db = zufall(3, 25), st = zufall(5, 60) * 10, fix = db * st;
          return { text: 'Euer Shop hat im Monat ' + eur(fix) + ' fixe Kosten. Jedes verkaufte Stück bringt einen Deckungsbeitrag von ' + eur(db) + '. Wie viele Stück müsst ihr verkaufen, um die Gewinnschwelle zu erreichen?', loesung: st, einheit: '',
            weg: [eur(fix) + ' ÷ ' + eur(db) + ' = ' + zahl(st) + ' Stück', 'Ab dem nächsten Stück macht ihr Gewinn.'] }; }
      ]
    }
  };

  const RUNDE = 5; // Aufgaben pro Runde
  let thema = 'gemischt';
  let aktuell = null;
  let geprueft = false;
  let runde = { nr: 0, richtig: 0 };
  let letzte = '';   // zuletzt gestellte Aufgabenart – nicht zweimal hintereinander

  function stand() {
    const d = window.ATB.daten;
    if (!d.rechnen) d.rechnen = {};
    return d.rechnen;
  }

  function neueAufgabe() {
    if (runde.nr >= RUNDE) runde = { nr: 0, richtig: 0 };
    let key, nr;
    do {
      key = thema === 'gemischt' ? wahl(Object.keys(THEMEN)) : thema;
      nr = Math.floor(Math.random() * THEMEN[key].aufgaben.length);
    } while (key + nr === letzte);
    letzte = key + nr;
    aktuell = Object.assign({ thema: key }, THEMEN[key].aufgaben[nr]());
    geprueft = false;
    runde.nr++;
    $('rc-titel').textContent = THEMEN[key].titel + ' · Aufgabe ' + runde.nr + ' von ' + RUNDE;
    $('rc-naechste').textContent = 'Nächste Aufgabe';
    $('rc-aufgabe').textContent = aktuell.text;
    $('rc-einheit').textContent = aktuell.einheit;
    $('rc-eingabe').value = '';
    $('rc-eingabe').disabled = false;
    $('rc-pruefen').hidden = false;
    $('rc-rueck').textContent = '';
    $('rc-rueck').className = 'lesbar meldung';
    $('rc-weg').hidden = true;
    $('rc-naechste').hidden = true;
    zeigeFormeln(key);
  }

  function zeigeFormeln(key) {
    const ul = $('rc-formeln');
    ul.textContent = '';
    THEMEN[key].formeln.forEach((f) => { const li = document.createElement('li'); li.textContent = f; ul.appendChild(li); });
    $('rc-formeln-titel').textContent = 'Formeln: ' + THEMEN[key].titel;
  }

  function lies(text) {
    const t = String(text).replace(/[€%\s]/g, '').replace(/\.(?=\d{3}(\D|$))/g, '');
    const n = parseFloat(t.replace(',', '.'));
    return isNaN(n) ? null : n;
  }

  function pruefen(ev) {
    if (ev) ev.preventDefault();
    if (geprueft || !aktuell) return;
    const n = lies($('rc-eingabe').value);
    if (n == null) { $('rc-rueck').textContent = 'Bitte gib eine Zahl ein, zum Beispiel 12,50.'; return; }
    geprueft = true;
    const ok = Math.abs(n - aktuell.loesung) <= 0.011 + Math.abs(aktuell.loesung) * 0.0005;
    const s = stand();
    const e = s[aktuell.thema] || { richtig: 0, versuche: 0 };
    e.versuche++; if (ok) { e.richtig++; runde.richtig++; }
    e.geaendert = Date.now();
    s[aktuell.thema] = e;
    window.ATB.speichern();
    const loesung = aktuell.einheit === '€' ? eur(aktuell.loesung) : aktuell.einheit === '%' ? proz(aktuell.loesung) : zahl(aktuell.loesung);
    $('rc-rueck').textContent = ok ? 'Richtig! ' + loesung : 'Noch nicht ganz. Richtig ist ' + loesung + '.';
    $('rc-rueck').className = 'lesbar meldung ' + (ok ? 'richtig' : 'fehler');
    if (runde.nr >= RUNDE) {
      $('rc-rueck').textContent += ' Runde geschafft: ' + runde.richtig + ' von ' + RUNDE + ' richtig.';
      $('rc-naechste').textContent = 'Neue Runde';
    }
    const ol = $('rc-weg-liste');
    ol.textContent = '';
    aktuell.weg.forEach((w) => { const li = document.createElement('li'); li.textContent = w; ol.appendChild(li); });
    $('rc-weg').hidden = false;
    $('rc-eingabe').disabled = true;
    $('rc-pruefen').hidden = true;
    $('rc-naechste').hidden = false;
    $('rc-naechste').focus({ preventScroll: true });
    // Falls der Rechenweg in die nächste Spalte rutscht: dorthin scrollen
    const r = $('rc-naechste').getBoundingClientRect();
    if (r.right > window.innerWidth || r.bottom > window.innerHeight - 64) $('rc-naechste').scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    zeigeStand();
  }

  function zeigeStand() {
    const s = stand();
    const ul = $('rc-stand');
    ul.textContent = '';
    Object.entries(THEMEN).forEach(([key, t]) => {
      const e = s[key] || { richtig: 0, versuche: 0 };
      const li = document.createElement('li');
      li.textContent = t.titel + ': ' + (e.versuche ? e.richtig + ' von ' + e.versuche + ' richtig' : 'noch nicht geübt');
      ul.appendChild(li);
    });
  }

  function waehleThema(key) {
    thema = key;
    runde = { nr: 0, richtig: 0 };
    document.querySelectorAll('[data-rc-thema]').forEach((b) => b.classList.toggle('aktiv', b.dataset.rcThema === key));
    neueAufgabe();
  }

  // Themen-Knöpfe aufbauen
  const box = $('rc-themen');
  [['gemischt', 'Gemischt']].concat(Object.entries(THEMEN).map(([k, t]) => [k, t.titel])).forEach(([k, titel]) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'btn-small'; b.textContent = titel; b.dataset.rcThema = k;
    b.addEventListener('click', () => waehleThema(k));
    box.appendChild(b);
  });
  $('rc-form').addEventListener('submit', pruefen);
  $('rc-naechste').addEventListener('click', () => {
    neueAufgabe();
    $('rc-eingabe').focus({ preventScroll: true });
    if (window.SPUR) window.SPUR.zeige($('rc-aufgabe-karte'));
  });

  window.RECHNEN = {
    zeige() { if (!aktuell) waehleThema(thema); zeigeStand(); },
    THEMEN
  };
})();
