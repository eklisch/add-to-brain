// Add to Brain – Punkte, Ränge, Abzeichen und Lerntage (ohne Druck: nichts geht verloren)
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  function el(tag, text, klasse) {
    const e = document.createElement(tag);
    if (text != null) e.textContent = text;
    if (klasse) e.className = klasse;
    return e;
  }
  const zahl = (x) => x.toLocaleString('de-DE');

  // Kurze Nachricht oben, die nach ein paar Sekunden verschwindet
  function hinweis(text) {
    let t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = text;
    t.classList.add('sichtbar');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('sichtbar'), 4500);
  }

  // ---------- Zahlen aus den vorhandenen Daten ----------
  function werte() {
    const d = window.ATB.daten;
    const kartei = Object.values(d.kartei || {});
    const begriffe = window.BEGRIFFE || [];
    const sitzenIn = (stufe) => {
      const alle = begriffe.filter((b) => b.stufe === stufe);
      return { sitzen: alle.filter((b) => d.kartei[b.id] && d.kartei[b.id].fach >= 3).length, alle: alle.length };
    };
    const rechnen = Object.values(d.rechnen || {});
    const gespraech = Object.values(d.gespraech || {});
    const module = window.MODULE ? window.MODULE.filter((m) => d.module[m.id] && d.module[m.id].bestanden).length : 0;
    return {
      beantwortet: kartei.length,
      sitzen: kartei.filter((k) => k.fach >= 3).length,
      angefangen: kartei.filter((k) => k.fach === 2).length,
      stufe1: sitzenIn(1), stufe2: sitzenIn(2), stufe3: sitzenIn(3),
      module, moduleAlle: window.MODULE ? window.MODULE.length : 0,
      gerechnet: rechnen.reduce((s, e) => s + (e.richtig || 0), 0),
      themenGerechnet: rechnen.filter((e) => e.richtig > 0).length,
      themenAlle: window.RECHNEN ? Object.keys(window.RECHNEN.THEMEN).length : 5,
      fragenGeuebt: gespraech.filter((e) => e.geuebt > 0).length,
      fragenSitzen: gespraech.filter((e) => e.bewertung === 'gut').length,
      fragenAlle: window.TRAINING ? window.TRAINING.FRAGEN.length : 14,
      tagebuch: (d.tagebuch || []).length,
      eigene: (d.eigeneBegriffe || []).length,
      tage: Object.keys(d.tage || {}).length
    };
  }

  // ---------- Punkte ----------
  const PUNKTE = [
    ['Begriff sitzt in der Lernkartei', 10, (w) => w.sitzen],
    ['Begriff einmal richtig gewusst', 3, (w) => w.angefangen],
    ['Lernmodul bestanden', 50, (w) => w.module],
    ['Rechenaufgabe richtig', 5, (w) => w.gerechnet],
    ['Gesprächsfrage geübt', 10, (w) => w.fragenGeuebt],
    ['Tagebucheintrag', 10, (w) => w.tagebuch],
    ['Eigener Begriff', 5, (w) => w.eigene],
    ['Lerntag', 5, (w) => w.tage]
  ];
  function punkte(w) { return PUNKTE.reduce((s, [, p, f]) => s + p * f(w), 0); }

  // ---------- Ränge (wie Bewertungen im Shop) ----------
  const RAENGE = [
    [0, 'Neu im Shop'],
    [100, 'Erste Bestellung'],
    [250, 'Gut bewertet'],
    [500, 'Bestseller'],
    [900, 'Kundenliebling'],
    [1400, 'Fünf Sterne']
  ];
  function rang(p) {
    let i = 0;
    RAENGE.forEach(([ab], j) => { if (p >= ab) i = j; });
    return { name: RAENGE[i][1], stufe: i + 1, ab: RAENGE[i][0], naechster: RAENGE[i + 1] || null };
  }

  // ---------- Abzeichen ----------
  const ABZEICHEN = [
    { id: 'start', name: 'Erster Schritt', wie: 'Beantworte deine erste Quizfrage.', ok: (w) => w.beantwortet >= 1 },
    { id: 'zehn', name: 'Zehn sitzen', wie: 'Bring zehn Begriffe in der Lernkartei zum Sitzen.', ok: (w) => w.sitzen >= 10 },
    { id: 'stufe1', name: 'Stufe 1 geschafft', wie: 'Bring alle Begriffe der Stufe 1 zum Sitzen.', ok: (w) => w.stufe1.alle && w.stufe1.sitzen === w.stufe1.alle },
    { id: 'alle-begriffe', name: 'Wandelndes Glossar', wie: 'Bring alle Begriffe aller Stufen zum Sitzen.', ok: (w) => w.stufe3.alle && w.stufe1.sitzen + w.stufe2.sitzen + w.stufe3.sitzen === w.stufe1.alle + w.stufe2.alle + w.stufe3.alle },
    { id: 'modul1', name: 'Gut gelesen', wie: 'Bestehe dein erstes Lernmodul.', ok: (w) => w.module >= 1 },
    { id: 'module', name: 'Alle Module', wie: 'Bestehe alle Lernmodule.', ok: (w) => w.moduleAlle && w.module === w.moduleAlle },
    { id: 'rechnen10', name: 'Rechnet sich', wie: 'Löse zehn Rechenaufgaben richtig.', ok: (w) => w.gerechnet >= 10 },
    { id: 'rechnen-alle', name: 'Alles durchgerechnet', wie: 'Löse in jedem Rechenthema mindestens eine Aufgabe richtig.', ok: (w) => w.themenGerechnet >= w.themenAlle },
    { id: 'gespraech1', name: 'Mutig gesprochen', wie: 'Übe deine erste Frage aus dem Vorstellungsgespräch.', ok: (w) => w.fragenGeuebt >= 1 },
    { id: 'gespraech-alle', name: 'Gesprächsbereit', wie: 'Übe alle Fragen aus dem Vorstellungsgespräch.', ok: (w) => w.fragenGeuebt >= w.fragenAlle },
    { id: 'tagebuch1', name: 'Festgehalten', wie: 'Schreib deinen ersten Tagebucheintrag.', ok: (w) => w.tagebuch >= 1 },
    { id: 'tagebuch5', name: 'Eine Woche dokumentiert', wie: 'Schreib fünf Tagebucheinträge.', ok: (w) => w.tagebuch >= 5 },
    { id: 'eigenes', name: 'Eigene Worte', wie: 'Leg einen eigenen Begriff im Glossar an.', ok: (w) => w.eigene >= 1 },
    { id: 'tage3', name: 'Wiedergekommen', wie: 'Lerne an drei verschiedenen Tagen.', ok: (w) => w.tage >= 3 },
    { id: 'tage10', name: 'Drangeblieben', wie: 'Lerne an zehn verschiedenen Tagen – egal, wie lange die Pausen dazwischen sind.', ok: (w) => w.tage >= 10 }
  ];

  // Nach jedem Speichern: neue Abzeichen merken und kurz zeigen
  let zeigeNicht = true; // beim ersten Laden keine Meldungen für alte Erfolge
  function pruefen() {
    const d = window.ATB.daten;
    if (!d.erreicht) d.erreicht = {};
    const w = werte();
    const neu = ABZEICHEN.filter((a) => !d.erreicht[a.id] && a.ok(w));
    if (!neu.length) return false;
    const heute = new Date().toISOString().slice(0, 10);
    neu.forEach((a) => { d.erreicht[a.id] = heute; });
    if (!zeigeNicht) hinweis(neu.length === 1 ? 'Neues Abzeichen: ' + neu[0].name : neu.length + ' neue Abzeichen: ' + neu.map((a) => a.name).join(', '));
    return true;
  }

  function dieseWoche() {
    const tage = Object.keys(window.ATB.daten.tage || {});
    const jetzt = new Date();
    const montag = new Date(jetzt.getFullYear(), jetzt.getMonth(), jetzt.getDate() - ((jetzt.getDay() + 6) % 7));
    const ab = montag.getFullYear() + '-' + String(montag.getMonth() + 1).padStart(2, '0') + '-' + String(montag.getDate()).padStart(2, '0');
    return tage.filter((t) => t >= ab).length;
  }

  // ---------- Kurzfassung für die Startseite ----------
  function kurz(box) {
    const w = werte(), p = punkte(w), r = rang(p);
    const zeile = el('p', null, 'lesbar rang-zeile');
    zeile.appendChild(el('strong', r.name));
    zeile.appendChild(document.createTextNode(' · ' + zahl(p) + ' Punkte · ' + Object.keys(window.ATB.daten.erreicht || {}).length + ' Abzeichen'));
    box.appendChild(zeile);
    const a = el('a', 'Alle Erfolge ansehen', 'erfolge-link');
    a.href = '#erfolge';
    box.appendChild(a);
  }

  // ---------- Seite „Erfolge“ ----------
  function zeige() {
    if (pruefen()) window.ATB.speichern();
    const w = werte(), p = punkte(w), r = rang(p);
    $('er-rang').textContent = r.name;
    $('er-punkte').textContent = zahl(p) + ' Punkte · Rang ' + r.stufe + ' von ' + RAENGE.length;
    const bar = $('er-balken');
    if (r.naechster) {
      const anteil = Math.round((p - r.ab) / (r.naechster[0] - r.ab) * 100);
      bar.style.width = Math.max(anteil, 2) + '%';
      $('er-naechster').textContent = 'Noch ' + zahl(r.naechster[0] - p) + ' Punkte bis „' + r.naechster[1] + '“.';
    } else {
      bar.style.width = '100%';
      $('er-naechster').textContent = 'Höchster Rang erreicht – richtig stark!';
    }
    const ul = $('er-punkteliste');
    ul.textContent = '';
    PUNKTE.forEach(([text, wert, f]) => {
      const li = el('li', null);
      li.appendChild(el('span', text));
      li.appendChild(el('span', f(w) + ' × ' + wert, 'er-wert'));
      ul.appendChild(li);
    });
    $('er-tage').textContent = w.tage ? 'Du hast an ' + w.tage + (w.tage === 1 ? ' Tag' : ' Tagen') + ' gelernt, diese Woche an ' + dieseWoche() + '.' : 'Sobald du etwas lernst, zählt der Tag hier mit.';
    const erreicht = window.ATB.daten.erreicht || {};
    const box = $('er-abzeichen');
    box.textContent = '';
    ABZEICHEN.forEach((a) => {
      const hat = !!erreicht[a.id];
      const li = el('li', null, 'abzeichen' + (hat ? ' hat' : ''));
      li.appendChild(el('span', hat ? '★' : '☆', 'abz-stern'));
      const t = el('div');
      t.appendChild(el('strong', a.name));
      t.appendChild(el('span', hat ? 'Geschafft am ' + erreicht[a.id].split('-').reverse().join('.') : a.wie, 'abz-text'));
      li.appendChild(t);
      box.appendChild(li);
    });
    $('er-anzahl').textContent = Object.keys(erreicht).filter((id) => ABZEICHEN.some((a) => a.id === id)).length + ' von ' + ABZEICHEN.length + ' Abzeichen';
  }

  window.ERFOLGE = { pruefen, kurz, zeige, werte, punkte, rang, ABZEICHEN };
  // Alte Erfolge still nachtragen, danach neue Abzeichen melden
  if (pruefen()) window.ATB.speichern();
  zeigeNicht = false;
  // Die Seite wurde schon vor diesem Skript gezeigt: Startseite bzw. Erfolge nachziehen
  if (!$('start').hidden && $('fortschritt')) kurz($('fortschritt'));
  if (!$('erfolge').hidden) zeige();
})();
