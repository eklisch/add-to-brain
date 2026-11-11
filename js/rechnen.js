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
      formeln: ['Brutto = Netto × 1,19 (bei 7 %: × 1,07)', 'Netto = Brutto ÷ 1,19 (bei 7 %: ÷ 1,07)', 'Steuerbetrag = Brutto − Netto'],
      aufgaben: [
        () => { const n = preis(10, 200), s = wahl([19, 19, 7]), b = rund(n * (1 + s / 100));
          return { text: 'Ein Artikel kostet netto ' + eur(n) + '. Wie hoch ist der Bruttopreis bei ' + s + ' % Mehrwertsteuer?', loesung: b, einheit: '€',
            weg: [eur(n) + ' × ' + zahl(1 + s / 100, 2) + ' = ' + eur(b), s === 7 ? '7 % gelten zum Beispiel für Bücher und viele Lebensmittel.' : '19 % sind der normale Steuersatz.'] }; },
        () => { const b = preis(10, 250), s = wahl([19, 19, 7]), n = rund(b / (1 + s / 100));
          return { text: 'Im Shop steht der Bruttopreis ' + eur(b) + ' (' + s + ' % Mehrwertsteuer). Wie hoch ist der Nettopreis?', loesung: n, einheit: '€',
            weg: [eur(b) + ' ÷ ' + zahl(1 + s / 100, 2) + ' = ' + eur(n), 'Nicht einfach ' + s + ' % abziehen – das ergibt einen falschen Wert.'] }; },
        () => { const b = preis(20, 300), n = rund(b / 1.19), st = rund(b - n);
          return { text: 'Ein Kunde zahlt ' + eur(b) + ' inklusive 19 % Mehrwertsteuer. Wie viel davon ist Steuer?', loesung: st, einheit: '€',
            weg: ['Netto: ' + eur(b) + ' ÷ 1,19 = ' + eur(n), 'Steuer: ' + eur(b) + ' − ' + eur(n) + ' = ' + eur(st)] }; }
      ]
    },
    rabatt: {
      titel: 'Rabatt und Skonto',
      formeln: ['Rabatt in € = Preis × Rabatt-% ÷ 100', 'Neuer Preis = Preis × (100 − Rabatt-%) ÷ 100', 'Skonto: Abzug bei schneller Zahlung, gerechnet vom Rechnungsbetrag'],
      aufgaben: [
        () => { const p = preis(20, 150), r = wahl([10, 15, 20, 25, 30, 40, 50]), np = rund(p * (100 - r) / 100);
          return { text: 'Im Sale gibt es ' + r + ' % Rabatt. Du kaufst ' + wahl(produkte) + ' für ursprünglich ' + eur(p) + '. Was zahlst du jetzt?', loesung: np, einheit: '€',
            weg: [eur(p) + ' × ' + (100 - r) + ' ÷ 100 = ' + eur(np), 'Oder: Rabatt ' + eur(rund(p * r / 100)) + ' abziehen.'] }; },
        () => { const alt = zufall(4, 30) * 5, r = wahl([10, 20, 25, 30, 40]), neu = rund(alt * (100 - r) / 100);
          return { text: 'Ein Artikel kostete ' + eur(alt) + ' und kostet jetzt ' + eur(neu) + '. Wie viel Prozent Rabatt sind das?', loesung: r, einheit: '%',
            weg: ['Ersparnis: ' + eur(alt) + ' − ' + eur(neu) + ' = ' + eur(rund(alt - neu)), eur(rund(alt - neu)) + ' ÷ ' + eur(alt) + ' × 100 = ' + proz(r)] }; },
        () => { const re = zufall(20, 120) * 10, s = wahl([2, 3]), z = rund(re * (100 - s) / 100);
          return { text: 'Eine Lieferantenrechnung über ' + eur(re) + ' erlaubt ' + s + ' % Skonto bei Zahlung innerhalb von 10 Tagen. Wie viel überweist du?', loesung: z, einheit: '€',
            weg: ['Skonto: ' + eur(re) + ' × ' + s + ' ÷ 100 = ' + eur(rund(re * s / 100)), eur(re) + ' − ' + eur(rund(re * s / 100)) + ' = ' + eur(z)] }; }
      ]
    },
    kalkulation: {
      titel: 'Kalkulation',
      formeln: ['Verkaufspreis = Einkaufspreis × (100 + Zuschlag-%) ÷ 100', 'Kalkulationszuschlag = (VK − EK) ÷ EK × 100', 'Handelsspanne = (VK − EK) ÷ VK × 100'],
      aufgaben: [
        () => { const ek = zufall(5, 60), z = wahl([40, 50, 60, 80, 100]), vk = rund(ek * (100 + z) / 100);
          return { text: 'Ihr kauft ' + wahl(produkte) + ' für ' + eur(ek) + ' netto ein und rechnet ' + z + ' % Kalkulationszuschlag. Wie hoch ist der Nettoverkaufspreis?', loesung: vk, einheit: '€',
            weg: [eur(ek) + ' × ' + (100 + z) + ' ÷ 100 = ' + eur(vk)] }; },
        () => { const ek = zufall(4, 40) * 5, z = wahl([25, 40, 50, 60, 100]), vk = rund(ek * (100 + z) / 100);
          return { text: 'Einkaufspreis ' + eur(ek) + ', Verkaufspreis ' + eur(vk) + ' (beides netto). Wie hoch ist der Kalkulationszuschlag?', loesung: z, einheit: '%',
            weg: ['Unterschied: ' + eur(vk) + ' − ' + eur(ek) + ' = ' + eur(rund(vk - ek)), eur(rund(vk - ek)) + ' ÷ ' + eur(ek) + ' × 100 = ' + proz(z), 'Beim Zuschlag teilst du durch den Einkaufspreis.'] }; },
        () => { const vk = zufall(4, 40) * 5, sp = wahl([20, 25, 40, 50]), ek = rund(vk * (100 - sp) / 100);
          return { text: 'Einkaufspreis ' + eur(ek) + ', Verkaufspreis ' + eur(vk) + ' (beides netto). Wie hoch ist die Handelsspanne?', loesung: sp, einheit: '%',
            weg: ['Unterschied: ' + eur(vk) + ' − ' + eur(ek) + ' = ' + eur(rund(vk - ek)), eur(rund(vk - ek)) + ' ÷ ' + eur(vk) + ' × 100 = ' + proz(sp), 'Bei der Handelsspanne teilst du durch den Verkaufspreis.'] }; }
      ]
    },
    kennzahlen: {
      titel: 'Shop-Kennzahlen',
      formeln: ['Conversion Rate = Bestellungen ÷ Besuche × 100', 'Durchschnittlicher Warenkorb = Umsatz ÷ Bestellungen', 'Retourenquote = Rücksendungen ÷ Bestellungen × 100'],
      aufgaben: [
        () => { const bes = zufall(20, 80) * 100, cr = wahl([1, 1.5, 2, 2.5, 3, 4]), b = Math.round(bes * cr / 100);
          return { text: 'Euer Shop hatte ' + zahl(bes) + ' Besuche und ' + zahl(b) + ' Bestellungen. Wie hoch ist die Conversion Rate?', loesung: rund(b / bes * 100), einheit: '%',
            weg: [zahl(b) + ' ÷ ' + zahl(bes) + ' × 100 = ' + proz(rund(b / bes * 100)), 'Im Onlinehandel sind 1 bis 3 % üblich.'] }; },
        () => { const b = zufall(40, 300), wk = zufall(25, 90), u = b * wk;
          return { text: 'Im Oktober gab es ' + zahl(b) + ' Bestellungen mit zusammen ' + eur(u) + ' Umsatz. Wie hoch ist der durchschnittliche Warenkorbwert?', loesung: wk, einheit: '€',
            weg: [eur(u) + ' ÷ ' + zahl(b) + ' = ' + eur(wk)] }; },
        () => { const b = zufall(10, 60) * 10, q = wahl([5, 10, 12, 15, 20, 25, 30]), r = Math.round(b * q / 100);
          return { text: 'Von ' + zahl(b) + ' Bestellungen wurden ' + zahl(r) + ' zurückgeschickt. Wie hoch ist die Retourenquote?', loesung: rund(r / b * 100), einheit: '%',
            weg: [zahl(r) + ' ÷ ' + zahl(b) + ' × 100 = ' + proz(rund(r / b * 100)), 'Bei Mode sind Quoten über 40 % keine Seltenheit.'] }; }
      ]
    },
    werbung: {
      titel: 'Online-Werbung',
      formeln: ['Klickrate (CTR) = Klicks ÷ Einblendungen × 100', 'ROAS = Umsatz durch Werbung ÷ Werbekosten', 'Kosten pro Bestellung = Werbekosten ÷ Bestellungen'],
      aufgaben: [
        () => { const e = zufall(10, 90) * 1000, ctr = wahl([0.5, 1, 1.5, 2, 2.5, 3]), k = Math.round(e * ctr / 100);
          return { text: 'Eine Anzeige wurde ' + zahl(e) + '-mal eingeblendet und ' + zahl(k) + '-mal angeklickt. Wie hoch ist die Klickrate?', loesung: rund(k / e * 100), einheit: '%',
            weg: [zahl(k) + ' ÷ ' + zahl(e) + ' × 100 = ' + proz(rund(k / e * 100))] }; },
        () => { const kost = zufall(2, 20) * 50, roas = wahl([2, 3, 4, 5, 6, 8]), u = kost * roas;
          return { text: 'Ihr habt ' + eur(kost) + ' für Werbung ausgegeben und damit ' + eur(u) + ' Umsatz gemacht. Wie hoch ist der ROAS? (Nur die Zahl eingeben)', loesung: roas, einheit: '',
            weg: [eur(u) + ' ÷ ' + eur(kost) + ' = ' + roas, 'Das heißt: Jeder Werbe-Euro brachte ' + eur(roas) + ' Umsatz.'] }; },
        () => { const b = zufall(10, 80), cpo = zufall(3, 25), kost = b * cpo;
          return { text: 'Eine Kampagne hat ' + eur(kost) + ' gekostet und ' + zahl(b) + ' Bestellungen gebracht. Was hat eine Bestellung im Schnitt an Werbung gekostet?', loesung: cpo, einheit: '€',
            weg: [eur(kost) + ' ÷ ' + zahl(b) + ' = ' + eur(cpo)] }; }
      ]
    }
  };

  let thema = 'gemischt';
  let aktuell = null;
  let geprueft = false;

  function stand() {
    const d = window.ATB.daten;
    if (!d.rechnen) d.rechnen = {};
    return d.rechnen;
  }

  function neueAufgabe() {
    const key = thema === 'gemischt' ? wahl(Object.keys(THEMEN)) : thema;
    aktuell = Object.assign({ thema: key }, wahl(THEMEN[key].aufgaben)());
    geprueft = false;
    $('rc-titel').textContent = THEMEN[key].titel;
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
    e.versuche++; if (ok) e.richtig++;
    e.geaendert = Date.now();
    s[aktuell.thema] = e;
    window.ATB.speichern();
    const loesung = aktuell.einheit === '€' ? eur(aktuell.loesung) : aktuell.einheit === '%' ? proz(aktuell.loesung) : zahl(aktuell.loesung);
    $('rc-rueck').textContent = ok ? 'Richtig! ' + loesung : 'Noch nicht ganz. Richtig ist ' + loesung + '.';
    $('rc-rueck').className = 'lesbar meldung ' + (ok ? 'richtig' : 'fehler');
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
  $('rc-naechste').addEventListener('click', () => { neueAufgabe(); $('rc-eingabe').focus({ preventScroll: true }); });

  window.RECHNEN = {
    zeige() { if (!aktuell) waehleThema(thema); zeigeStand(); },
    THEMEN
  };
})();
