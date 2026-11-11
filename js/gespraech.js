// Add to Brain – Trainer fürs Vorstellungsgespräch
// Frage vorlesen lassen, laut antworten (mit Uhr), sich aufnehmen und anhören, Stichpunkte notieren, selbst einschätzen.
// Aufnahmen werden NICHT gespeichert – sie existieren nur, solange die Seite offen ist.
(function () {
  'use strict';

  const FRAGEN = [
    { id: 'g1', frage: 'Erzählen Sie uns etwas über sich.', dauer: 90, tipps: [
      'Fast immer die erste Frage. Gemeint ist dein beruflicher Weg, nicht dein ganzes Leben.',
      'Bewährter Aufbau: Wer bin ich heute? Was habe ich bisher gemacht? Warum sitze ich jetzt hier?',
      'Ein bis anderthalb Minuten reichen. Übe den Anfang so oft, bis die ersten zwei Sätze sitzen.'
    ] },
    { id: 'g2', frage: 'Warum möchten Sie Kauffrau beziehungsweise Kaufmann im E-Commerce werden?', dauer: 60, tipps: [
      'Zeig echtes Interesse: Was fasziniert dich am Online-Handel?',
      'Ein konkretes Erlebnis wirkt besser als allgemeine Sätze, zum Beispiel ein eigenes Shop-Projekt.',
      'Verbinde es mit deinen Stärken aus früheren Jobs, zum Beispiel Kundenkontakt.'
    ] },
    { id: 'g3', frage: 'Warum haben Sie sich gerade bei uns beworben?', dauer: 60, tipps: [
      'Hier zeigt sich, ob du dich vorbereitet hast. Schau dir vorher Shop, Sortiment und Über-uns-Seite an.',
      'Nenne zwei konkrete Gründe, zum Beispiel das Sortiment und dass sie selbst ausbilden.',
      'Vermeide Antworten wie „Sie sind in der Nähe“ als Hauptgrund.'
    ] },
    { id: 'g4', frage: 'Was wissen Sie über unser Unternehmen?', dauer: 60, tipps: [
      'Drei Fakten reichen: Was wird verkauft, an wen, über welche Kanäle?',
      'Erwähne etwas, das dir aufgefallen ist, zum Beispiel gute Bewertungen oder ein besonderes Produkt.',
      'Nicht auswendig gelernt vortragen, lieber in eigenen Worten.'
    ] },
    { id: 'g5', frage: 'Was erwarten Sie von dem Praktikum?', dauer: 60, tipps: [
      'Sag, was du lernen möchtest, zum Beispiel Produktdaten pflegen, Bestellungen bearbeiten, Kundenservice.',
      'Zeig, dass du mitarbeiten willst, nicht nur zuschauen.',
      'Erwähne kurz, dass das Praktikum dich auf deine Umschulung vorbereitet.'
    ] },
    { id: 'g6', frage: 'Wo liegen Ihre Stärken?', dauer: 60, tipps: [
      'Nenne zwei oder drei Stärken, die zum Beruf passen.',
      'Zu jeder Stärke ein kurzes Beispiel: Wo hast du sie gezeigt?',
      'Belege sind stärker als Eigenlob: „Im Callcenter habe ich gelernt, auch bei vielen Anrufen freundlich zu bleiben.“'
    ] },
    { id: 'g7', frage: 'Wo liegen Ihre Schwächen?', dauer: 60, tipps: [
      'Nenne eine echte, aber nicht entscheidende Schwäche.',
      'Wichtiger als die Schwäche ist, was du dagegen tust.',
      'Vermeide Floskeln wie „Ich bin zu perfektionistisch“ – die kennt jeder.'
    ] },
    { id: 'g8', frage: 'Wie gehen Sie mit Stress oder schwierigen Kunden um?', dauer: 75, tipps: [
      'Erzähl ein echtes Beispiel nach dem STAR-Prinzip: Situation, Aufgabe, was du getan hast, Ergebnis.',
      'Beispiele aus Verkauf, Callcenter oder Pflege passen hier sehr gut.',
      'Zeig, dass du ruhig bleibst und nach einer Lösung suchst.'
    ] },
    { id: 'g9', frage: 'Erzählen Sie von einer Situation, in der Sie ein Problem gelöst haben.', dauer: 75, tipps: [
      'Wieder das STAR-Prinzip: Situation, Aufgabe, Handlung, Ergebnis.',
      'Das Ergebnis darf konkret sein: Was war danach besser?',
      'Kleine Probleme sind völlig in Ordnung – entscheidend ist, wie du vorgegangen bist.'
    ] },
    { id: 'g10', frage: 'In Ihrem Lebenslauf gibt es Wechsel oder Lücken. Können Sie das erklären?', dauer: 60, tipps: [
      'Kurz, ehrlich und ohne Rechtfertigung antworten.',
      'Gesundheitliche Einzelheiten musst du nicht nennen. Ein Satz wie „Ich hatte eine persönliche Phase, die abgeschlossen ist“ reicht.',
      'Lenk den Blick nach vorn: Was hast du daraus gelernt, und warum passt jetzt alles?'
    ] },
    { id: 'g11', frage: 'Welche Erfahrungen haben Sie schon mit Online-Shops gemacht?', dauer: 75, tipps: [
      'Eigene Projekte sind hier Gold wert, zum Beispiel ein eigener Shop oder ein Shop-Projekt in der Weiterbildung.',
      'Nenne konkret, was du gemacht hast: Produkte angelegt, Texte geschrieben, Design, Technik.',
      'Auch Erfahrung als Kundin zählt: Was macht für dich einen guten Shop aus?'
    ] },
    { id: 'g12', frage: 'Wo sehen Sie sich in fünf Jahren?', dauer: 45, tipps: [
      'Zeig, dass du ein Ziel hast, das zum Beruf passt.',
      'Zum Beispiel: Umschulung abgeschlossen, im E-Commerce angekommen, vielleicht mit einem Schwerpunkt wie Marketing oder Produktdaten.',
      'Bleib realistisch und bodenständig.'
    ] },
    { id: 'g13', frage: 'Wann könnten Sie anfangen, und wie lange soll das Praktikum dauern?', dauer: 30, tipps: [
      'Kenne deine Daten vorher: frühester Beginn, gewünschte Dauer, mögliche Arbeitszeiten.',
      'Sag dazu, wer das Praktikum begleitet, zum Beispiel dein Bildungsträger.',
      'Kläre offene Punkte vorher mit deiner Ansprechperson, damit du sicher antworten kannst.'
    ] },
    { id: 'g14', frage: 'Haben Sie noch Fragen an uns?', dauer: 45, tipps: [
      'Immer mit Ja antworten und zwei oder drei Fragen vorbereitet haben.',
      'Gute Fragen: Wie sieht ein typischer Tag im Praktikum aus? Wer ist meine Ansprechperson? Mit welchem Shopsystem arbeiten Sie?',
      'Fragen nach Urlaub oder Pausen lieber nicht als erste Frage stellen.'
    ] }
  ];

  const $ = (id) => document.getElementById(id);
  const stimme = window.speechSynthesis || null;
  let aktuell = null;
  let uhr = null, start = 0;
  let recorder = null, stueckchen = [], audioUrl = null, stream = null;

  function el(tag, text, klasse) { const e = document.createElement(tag); if (text != null) e.textContent = text; if (klasse) e.className = klasse; return e; }
  function speicher() { const d = window.ATB.daten; if (!d.gespraech) d.gespraech = {}; return d.gespraech; }
  function eintrag(id) { return speicher()[id] || {}; }

  // Fragen mit "Nochmal üben" kommen häufiger dran, "Gut" seltener
  function zufaellig() {
    const gewichte = FRAGEN.map((f) => {
      const b = eintrag(f.id).bewertung;
      return b === 'nochmal' ? 4 : b === 'geht' ? 2 : b === 'gut' ? 1 : 3;
    });
    let r = Math.random() * gewichte.reduce((a, b) => a + b, 0);
    for (let i = 0; i < FRAGEN.length; i++) { r -= gewichte[i]; if (r <= 0 && (!aktuell || FRAGEN[i].id !== aktuell.id)) return FRAGEN[i]; }
    return FRAGEN[(FRAGEN.indexOf(aktuell) + 1) % FRAGEN.length];
  }

  function zeigeFrage(f) {
    stoppeUhr(); stoppeVorlesen(); verwerfeAufnahme();
    aktuell = f;
    $('gs-frage').textContent = f.frage;
    $('gs-nummer').textContent = 'Frage ' + (FRAGEN.indexOf(f) + 1) + ' von ' + FRAGEN.length + ' · empfohlen: etwa ' + ({ 60: 'eine Minute', 75: 'eine bis anderthalb Minuten', 90: 'anderthalb Minuten' }[f.dauer] || f.dauer + ' Sekunden');
    $('gs-zeit').textContent = '0:00';
    $('gs-zeit').classList.remove('ueber');
    $('gs-start').textContent = 'Antwort starten';
    const t = $('gs-tipps'); t.textContent = '';
    f.tipps.forEach((x) => t.appendChild(el('li', x)));
    $('gs-notiz').value = eintrag(f.id).notiz || '';
    $('gs-bewertet').textContent = '';
    zeigeListe();
  }

  // ---------- Vorlesen ----------
  function deutscheStimme() {
    const alle = stimme.getVoices().filter((v) => v.lang && v.lang.toLowerCase().startsWith('de'));
    return alle.find((v) => /natural|online/i.test(v.name)) || alle.find((v) => /google/i.test(v.name)) || alle[0] || null;
  }
  function vorlesen() {
    if (!stimme || !aktuell) return;
    stimme.cancel();
    const u = new SpeechSynthesisUtterance(aktuell.frage);
    u.lang = 'de-DE'; const v = deutscheStimme(); if (v) u.voice = v; u.rate = 0.95;
    stimme.speak(u);
  }
  function stoppeVorlesen() { if (stimme) stimme.cancel(); }

  // ---------- Uhr ----------
  function zeit(sek) { return Math.floor(sek / 60) + ':' + String(sek % 60).padStart(2, '0'); }
  function starteUhr() {
    stoppeVorlesen();
    start = Date.now();
    $('gs-start').textContent = 'Antwort beenden';
    uhr = setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000);
      $('gs-zeit').textContent = zeit(s);
      $('gs-zeit').classList.toggle('ueber', s > aktuell.dauer + 30);
    }, 250);
  }
  function stoppeUhr() {
    if (!uhr) return;
    clearInterval(uhr); uhr = null;
    const s = Math.floor((Date.now() - start) / 1000);
    $('gs-start').textContent = 'Nochmal antworten';
    $('gs-bewertet').textContent = s < 15 ? 'Das war sehr kurz. Versuch, ein Beispiel dazuzunehmen.' : s > aktuell.dauer + 30 ? 'Das war etwas lang. Versuch, dich auf das Wichtigste zu beschränken.' : 'Gute Länge!';
  }

  // ---------- Aufnahme (bleibt nur im Browser, wird nicht gespeichert) ----------
  async function aufnahme() {
    if (recorder && recorder.state === 'recording') { recorder.stop(); return; }
    if (!navigator.mediaDevices || !window.MediaRecorder) { $('gs-aufnahme-info').textContent = 'Dein Browser kann leider nicht aufnehmen.'; return; }
    try {
      verwerfeAufnahme();
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stueckchen = [];
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => { if (e.data.size) stueckchen.push(e.data); };
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        audioUrl = URL.createObjectURL(new Blob(stueckchen, { type: recorder.mimeType }));
        $('gs-audio').src = audioUrl; $('gs-audio').hidden = false;
        $('gs-rec').textContent = 'Neu aufnehmen'; $('gs-rec').classList.remove('btn-danger');
        $('gs-aufnahme-info').textContent = 'Hör dir deine Antwort an. Die Aufnahme wird nicht gespeichert.';
        if (uhr) stoppeUhr();
      };
      recorder.start();
      if (!uhr) starteUhr();
      $('gs-rec').textContent = 'Aufnahme beenden'; $('gs-rec').classList.add('btn-danger');
      $('gs-aufnahme-info').textContent = 'Aufnahme läuft …';
    } catch (e) {
      $('gs-aufnahme-info').textContent = 'Kein Zugriff auf das Mikrofon. Erlaube den Zugriff in deinem Browser, wenn du aufnehmen möchtest.';
    }
  }
  function verwerfeAufnahme() {
    if (recorder && recorder.state === 'recording') { recorder.onstop = null; recorder.stop(); }
    if (stream) stream.getTracks().forEach((t) => t.stop());
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    recorder = null; audioUrl = null; stream = null;
    if ($('gs-audio')) { $('gs-audio').hidden = true; $('gs-audio').removeAttribute('src'); }
    if ($('gs-rec')) { $('gs-rec').textContent = 'Aufnehmen'; $('gs-rec').classList.remove('btn-danger'); }
    if ($('gs-aufnahme-info')) $('gs-aufnahme-info').textContent = '';
  }

  // ---------- Notizen und Bewertung ----------
  let notizTimer = null;
  function notizSpeichern() {
    clearTimeout(notizTimer);
    notizTimer = setTimeout(() => {
      const e = Object.assign({}, eintrag(aktuell.id), { notiz: $('gs-notiz').value, geaendert: Date.now() });
      speicher()[aktuell.id] = e; window.ATB.speichern(); zeigeListe();
    }, 600);
  }
  function bewerten(wert) {
    const e = Object.assign({}, eintrag(aktuell.id), { bewertung: wert, geuebt: (eintrag(aktuell.id).geuebt || 0) + 1, geaendert: Date.now() });
    speicher()[aktuell.id] = e; window.ATB.speichern();
    $('gs-bewertet').textContent = wert === 'gut' ? 'Super! Diese Frage kommt jetzt seltener dran.' : wert === 'geht' ? 'Okay – die Frage kommt bald noch einmal.' : 'Kein Problem – diese Frage kommt jetzt öfter dran.';
    zeigeListe();
  }

  // ---------- Liste aller Fragen ----------
  function zeigeListe() {
    const ul = $('gs-liste'); if (!ul) return;
    ul.textContent = '';
    FRAGEN.forEach((f, i) => {
      const e = eintrag(f.id);
      const li = el('li', null, 'gs-zeile' + (aktuell && aktuell.id === f.id ? ' aktiv' : ''));
      const b = el('button', (i + 1) + '. ' + f.frage, 'gs-link'); b.type = 'button';
      b.addEventListener('click', () => { zeigeFrage(f); $('gs-uebung').scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' }); });
      li.appendChild(b);
      const marke = e.bewertung === 'gut' ? ['sitzt', 'success'] : e.bewertung === 'geht' ? ['geht so', 'warning'] : e.bewertung === 'nochmal' ? ['üben', 'danger'] : null;
      if (marke) li.appendChild(el('span', marke[0], 'badge ' + marke[1] + ' marke'));
      if (e.notiz) li.appendChild(el('span', 'Notiz', 'badge secondary marke'));
      ul.appendChild(li);
    });
    const geuebt = FRAGEN.filter((f) => eintrag(f.id).bewertung).length;
    $('gs-stand').textContent = geuebt + ' von ' + FRAGEN.length + ' Fragen geübt · ' + FRAGEN.filter((f) => eintrag(f.id).bewertung === 'gut').length + ' sitzen';
  }

  // ---------- Verknüpfen ----------
  $('gs-vorlesen').addEventListener('click', vorlesen);
  $('gs-start').addEventListener('click', () => (uhr ? stoppeUhr() : starteUhr()));
  $('gs-rec').addEventListener('click', aufnahme);
  $('gs-naechste').addEventListener('click', () => zeigeFrage(zufaellig()));
  $('gs-notiz').addEventListener('input', notizSpeichern);
  document.querySelectorAll('[data-bewertung]').forEach((b) => b.addEventListener('click', () => bewerten(b.dataset.bewertung)));
  if (!stimme) $('gs-vorlesen').hidden = true;
  window.addEventListener('hashchange', () => { if (location.hash !== '#training') { stoppeUhr(); stoppeVorlesen(); verwerfeAufnahme(); } });

  window.TRAINING = {
    zeige() { if (!aktuell) zeigeFrage(FRAGEN[0]); else zeigeListe(); },
    FRAGEN
  };
})();
