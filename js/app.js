// Add to Brain – Logik
// Alle Daten liegen nur im Browser (localStorage) unter dem Schlüssel 'addtobrain-v1'.
(function () {
  'use strict';

  const SCHLUESSEL = 'addtobrain-v1';
  const FACH_TAGE = [0, 0, 1, 3, 7, 14]; // Index = Fach 1–5
  const TAG_MS = 24 * 60 * 60 * 1000;

  // ---------- Speicher ----------
  function leer() { return { tagebuch: [], eigeneBegriffe: [], kartei: {}, module: {} }; }
  function laden() {
    try {
      const d = JSON.parse(localStorage.getItem(SCHLUESSEL));
      if (d && typeof d === 'object') return Object.assign(leer(), d);
    } catch (e) { /* ignorieren */ }
    return leer();
  }
  let daten = laden();
  function speichern() {
    try { localStorage.setItem(SCHLUESSEL, JSON.stringify(daten)); }
    catch (e) { /* Speichern nicht möglich (z. B. privater Modus) */ }
  }

  // ---------- Hilfen ----------
  const $ = (id) => document.getElementById(id);
  function el(tag, text, klasse) {
    const e = document.createElement(tag);
    if (text != null) e.textContent = text;
    if (klasse) e.className = klasse;
    return e;
  }
  function datumDE(iso) {
    if (!iso) return '';
    const [j, m, t] = iso.split('-');
    return t + '.' + m + '.' + j;
  }
  function heuteISO() {
    const d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }
  function mischen(a) {
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  // ISO-Woche (z. B. "2026-W50") eines Datums
  function isoWoche(iso) {
    const d = new Date(iso + 'T12:00:00');
    const tag = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - tag + 3);
    const ersterDo = new Date(d.getFullYear(), 0, 4);
    const nr = 1 + Math.round(((d - ersterDo) / TAG_MS - 3 + ((ersterDo.getDay() + 6) % 7)) / 7);
    return d.getFullYear() + '-W' + String(nr).padStart(2, '0');
  }

  function alleBegriffe() {
    return window.BEGRIFFE.concat(daten.eigeneBegriffe.filter((b) => b.erklaerung));
  }

  // ---------- Navigation ----------
  const SEITEN = ['start', 'lernen', 'tagebuch', 'glossar', 'quiz', 'sichern'];
  function zeigeSeite() {
    const ziel = SEITEN.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'start';
    SEITEN.forEach((s) => { $(s).hidden = s !== ziel; });
    document.querySelectorAll('.menue a').forEach((a) => a.classList.toggle('aktiv', a.getAttribute('href') === '#' + ziel));
    if (ziel === 'start') zeigeFortschritt();
    if (ziel === 'lernen' && window.LERNEN) window.LERNEN.zeige();
    if (ziel === 'tagebuch') zeigeTagebuch();
    if (ziel === 'glossar') zeigeGlossar();
    if (ziel === 'quiz') quizInfo();
    if (window.SPUR) window.SPUR.anfang(); else window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', zeigeSeite);

  // ---------- Tagebuch ----------
  let bearbeiteId = null;
  $('tb-datum').value = heuteISO();

  $('tb-form').addEventListener('submit', (ev) => {
    ev.preventDefault();
    const eintrag = {
      id: bearbeiteId || String(Date.now()),
      datum: $('tb-datum').value,
      von: $('tb-von').value,
      bis: $('tb-bis').value,
      taetigkeiten: $('tb-taetigkeiten').value.trim(),
      gelernt: $('tb-gelernt').value.trim(),
      fragen: $('tb-fragen').value.trim()
    };
    daten.tagebuch = daten.tagebuch.filter((e) => e.id !== eintrag.id).concat(eintrag);
    speichern();
    formularLeeren();
    zeigeTagebuch();
  });
  $('tb-abbrechen').addEventListener('click', formularLeeren);

  function formularLeeren() {
    bearbeiteId = null;
    $('tb-form').reset();
    $('tb-datum').value = heuteISO();
    $('tb-abbrechen').hidden = true;
  }

  function zeigeTagebuch() {
    const liste = $('tb-liste');
    liste.textContent = '';
    const eintraege = daten.tagebuch.slice().sort((a, b) => b.datum.localeCompare(a.datum));
    if (!eintraege.length) { liste.appendChild(el('p', 'Noch keine Einträge.', 'lesbar')); return; }
    eintraege.forEach((e) => {
      const box = el('div', null, 'eintrag lesbar');
      const zeit = e.von || e.bis ? ' · ' + (e.von || '?') + '–' + (e.bis || '?') + ' Uhr' : '';
      box.appendChild(el('h3', datumDE(e.datum) + zeit));
      const dl = el('dl');
      [['Tätigkeiten', e.taetigkeiten], ['Gelerntes', e.gelernt], ['Offene Fragen', e.fragen]].forEach(([t, w]) => {
        if (!w) return;
        dl.appendChild(el('dt', t)); dl.appendChild(el('dd', w));
      });
      box.appendChild(dl);
      const kn = el('div', null, 'knoepfe');
      const b1 = el('button', 'Bearbeiten', 'btn-small'); b1.type = 'button';
      b1.addEventListener('click', () => {
        bearbeiteId = e.id;
        $('tb-datum').value = e.datum; $('tb-von').value = e.von; $('tb-bis').value = e.bis;
        $('tb-taetigkeiten').value = e.taetigkeiten; $('tb-gelernt').value = e.gelernt; $('tb-fragen').value = e.fragen;
        $('tb-abbrechen').hidden = false;
        $('tb-form').scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      });
      const b2 = el('button', 'Löschen', 'btn-small btn-danger'); b2.type = 'button';
      b2.addEventListener('click', () => {
        if (b2.dataset.sicher) {
          daten.tagebuch = daten.tagebuch.filter((x) => x.id !== e.id); speichern(); zeigeTagebuch();
        } else { b2.dataset.sicher = '1'; b2.textContent = 'Wirklich löschen?'; }
      });
      kn.appendChild(b1); kn.appendChild(b2); box.appendChild(kn);
      liste.appendChild(box);
    });
  }

  // Wochenbericht nach der Projektstruktur
  $('wb-woche').value = isoWoche(heuteISO());
  $('wb-erstellen').addEventListener('click', () => {
    const woche = $('wb-woche').value;
    const eintraege = daten.tagebuch.filter((e) => isoWoche(e.datum) === woche).sort((a, b) => a.datum.localeCompare(b.datum));
    const zeilen = (feld) => eintraege.filter((e) => e[feld]).map((e) => '- ' + datumDE(e.datum) + ': ' + e[feld].replace(/\n+/g, '; ')).join('\n') || '- (keine Angaben)';
    const nr = woche.split('-W')[1];
    const text = eintraege.length ?
      'Wochenbericht KW ' + nr + '\n\n' +
      'Überblick der Woche\n- ' + eintraege.length + ' Arbeitstag(e): ' + eintraege.map((e) => datumDE(e.datum)).join(', ') + '\n\n' +
      'Wichtigste Aufgaben\n' + zeilen('taetigkeiten') + '\n\n' +
      'Lernerfolge\n' + zeilen('gelernt') + '\n\n' +
      'Schwierigkeiten / offene Fragen\n' + zeilen('fragen') + '\n\n' +
      'Ziele für nächste Woche\n- '
      : 'Für KW ' + nr + ' gibt es noch keine Einträge.';
    $('wb-text').value = text;
    $('wb-text').hidden = false;
    $('wb-kopieren').hidden = !eintraege.length;
  });
  $('wb-kopieren').addEventListener('click', () => kopieren($('wb-text'), $('wb-kopieren')));

  function kopieren(feld, knopf) {
    const alt = knopf.textContent;
    const fertig = (ok) => { knopf.textContent = ok ? 'Kopiert!' : 'Markiert – jetzt kopieren'; setTimeout(() => { knopf.textContent = alt; }, 2500); };
    if (navigator.clipboard) navigator.clipboard.writeText(feld.value).then(() => fertig(true), () => { feld.select(); fertig(false); });
    else { feld.select(); fertig(document.execCommand && document.execCommand('copy')); }
  }

  // ---------- Glossar + Add to Brain ----------
  $('ab-form').addEventListener('submit', (ev) => {
    ev.preventDefault();
    const begriff = $('ab-begriff').value.trim();
    if (!begriff) return;
    daten.eigeneBegriffe.push({ id: 'eigen-' + Date.now(), begriff, erklaerung: $('ab-erklaerung').value.trim(), stufe: 1, eigen: true });
    speichern();
    $('ab-form').reset();
    zeigeGlossar();
  });
  $('gl-suche').addEventListener('input', zeigeGlossar);

  function zeigeGlossar() {
    const q = $('gl-suche').value.trim().toLowerCase();
    const liste = $('gl-liste');
    liste.textContent = '';
    const alle = window.BEGRIFFE.concat(daten.eigeneBegriffe)
      .filter((b) => !q || (b.begriff + ' ' + b.erklaerung).toLowerCase().includes(q))
      .sort((a, b) => a.begriff.localeCompare(b.begriff, 'de'));
    if (!alle.length) { liste.appendChild(el('p', 'Nichts gefunden.')); return; }
    alle.forEach((b) => {
      const dt = el('dt', b.begriff);
      if (b.eigen) dt.appendChild(el('span', 'eigen', 'badge warning marke'));
      liste.appendChild(dt);
      const dd = el('dd', b.erklaerung || 'Erklärung fehlt noch – nachschlagen und ergänzen.');
      if (b.eigen) {
        const k = el('button', b.erklaerung ? 'Ändern' : 'Erklärung ergänzen', 'btn-small'); k.type = 'button';
        k.style.marginLeft = '8px';
        k.addEventListener('click', () => {
          const neu = prompt('Erklärung für „' + b.begriff + '“:', b.erklaerung || '');
          if (neu !== null) { b.erklaerung = neu.trim(); speichern(); zeigeGlossar(); }
        });
        dd.appendChild(k);
      }
      liste.appendChild(dd);
    });
  }

  // ---------- Quiz mit Lernkartei ----------
  function karte(id) { return daten.kartei[id] || { fach: 1, faellig: 0 }; }
  function freigeschalteteStufe() {
    let stufe = 1;
    for (const s of [1, 2]) {
      const begriffe = alleBegriffe().filter((b) => b.stufe === s);
      const sitzen = begriffe.filter((b) => karte(b.id).fach >= 3).length;
      if (begriffe.length && sitzen / begriffe.length >= 0.8) stufe = s + 1; else break;
    }
    return stufe;
  }
  function faelligeBegriffe() {
    const max = freigeschalteteStufe();
    const jetzt = Date.now();
    return alleBegriffe().filter((b) => b.stufe <= max && karte(b.id).faellig <= jetzt);
  }

  function quizInfo() {
    const n = faelligeBegriffe().length;
    const s = freigeschalteteStufe();
    $('qz-info').textContent = n
      ? 'Heute fällig: ' + n + ' Begriff(e). Freigeschaltet bis Stufe ' + s + ' von 3.'
      : 'Für heute ist alles gelernt. Komm morgen wieder! (Freigeschaltet bis Stufe ' + s + ' von 3.)';
    $('qz-start').hidden = !n;
    $('qz-karte').hidden = true;
  }

  let aktuell = null;
  // Runde: zählt, was beim ersten Versuch richtig war
  let runde = null;
  function neueRunde() { runde = { gefragt: {}, ersterVersuchRichtig: 0, fehler: {} }; }

  $('qz-start').addEventListener('click', () => { neueRunde(); $('qz-ergebnis').hidden = true; naechsteFrage(); });
  $('qz-weiter').addEventListener('click', naechsteFrage);
  $('qz-beenden').addEventListener('click', zeigeErgebnis);
  $('qz-erg-ok').addEventListener('click', () => { $('qz-ergebnis').hidden = true; quizInfo(); if (window.SPUR) window.SPUR.anfang(); });

  function zeigeErgebnis() {
    quizInfo();
    if (!runde) return;
    const anzahl = Object.keys(runde.gefragt).length;
    if (!anzahl) return;
    const richtig = runde.ersterVersuchRichtig;
    const prozent = Math.round(richtig / anzahl * 100);
    let titel, text;
    if (prozent >= 90) { titel = 'Super gemacht!'; text = 'Fast alles saß schon beim ersten Versuch. Diese Begriffe hast du richtig gut drauf.'; }
    else if (prozent >= 70) { titel = 'Gut gemacht!'; text = 'Der Großteil sitzt. Die Begriffe unten kommen bald noch einmal, dann klappt es auch mit denen.'; }
    else if (prozent >= 50) { titel = 'Ordentlich – da geht noch was.'; text = 'Gut die Hälfte sitzt schon. Schau dir die Begriffe unten noch einmal im Glossar oder im Lerntext an.'; }
    else { titel = 'Da musst du nochmal ran.'; text = 'Kein Problem, genau dafür ist die Lernkartei da: Die Begriffe unten kommen wieder, bis sie sitzen. Lies vorher am besten noch einmal den Lerntext.'; }
    $('qz-erg-titel').textContent = titel;
    $('qz-erg-zahl').textContent = richtig + ' von ' + anzahl + ' beim ersten Versuch richtig (' + prozent + ' %)';
    $('qz-erg-text').textContent = text;
    const liste = $('qz-erg-liste');
    liste.textContent = '';
    const fehler = Object.values(runde.fehler);
    if (fehler.length) {
      liste.appendChild(el('p', 'Noch üben:', 'qz-frage'));
      const ul = el('ul');
      fehler.forEach((b) => { const li = el('li'); li.appendChild(el('strong', b.begriff)); li.appendChild(document.createTextNode(' – ' + b.erklaerung)); ul.appendChild(li); });
      liste.appendChild(ul);
    }
    runde = null;
    $('qz-ergebnis').hidden = false;
    $('qz-ergebnis').scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }

  function naechsteFrage() {
    const faellig = faelligeBegriffe();
    if (!faellig.length) { zeigeErgebnis(); return; }
    // niedrige Fächer zuerst
    faellig.sort((a, b) => karte(a.id).fach - karte(b.id).fach || Math.random() - 0.5);
    aktuell = faellig[0];
    const stufe = freigeschalteteStufe();
    const pool = mischen(alleBegriffe().filter((b) => b.id !== aktuell.id && b.stufe <= stufe)).slice(0, 3);
    const optionen = mischen([aktuell].concat(pool));
    const umgekehrt = Math.random() < 0.5; // mal Begriff → Erklärung, mal Erklärung → Begriff

    $('qz-start').hidden = true;
    $('qz-karte').hidden = false;
    $('qz-stufe').textContent = 'Stufe ' + aktuell.stufe + ' · Fach ' + karte(aktuell.id).fach + ' von 5 · noch ' + faellig.length + ' fällig';
    $('qz-frage').textContent = umgekehrt ? 'Was bedeutet „' + aktuell.begriff + '“?' : 'Welcher Begriff passt? ' + aktuell.erklaerung;
    $('qz-rueckmeldung').textContent = '';
    $('qz-weiter').hidden = true;
    const box = $('qz-antworten');
    box.textContent = '';
    optionen.forEach((o) => {
      const b = el('button', umgekehrt ? o.erklaerung : o.begriff); b.type = 'button';
      b.addEventListener('click', () => antworten(o, b));
      box.appendChild(b);
    });
  }

  function antworten(gewaehlt, knopf) {
    const richtig = gewaehlt.id === aktuell.id;
    if (runde && !runde.gefragt[aktuell.id]) {
      runde.gefragt[aktuell.id] = true;
      if (richtig) runde.ersterVersuchRichtig++;
    }
    if (runde && !richtig) runde.fehler[aktuell.id] = aktuell;
    const k = karte(aktuell.id);
    const fach = richtig ? Math.min(k.fach + 1, 5) : 1;
    daten.kartei[aktuell.id] = { fach, faellig: Date.now() + FACH_TAGE[fach] * TAG_MS };
    speichern();
    document.querySelectorAll('#qz-antworten button').forEach((b) => { if (b !== knopf) b.disabled = true; });
    knopf.classList.add(richtig ? 'btn-success' : 'btn-danger');
    knopf.style.pointerEvents = 'none';
    $('qz-rueckmeldung').textContent = richtig
      ? 'Richtig! „' + aktuell.begriff + '“ rutscht in Fach ' + fach + '.'
      : 'Leider falsch. Richtig ist: ' + aktuell.begriff + ' – ' + aktuell.erklaerung + ' Der Begriff kommt gleich noch einmal.';
    $('qz-weiter').hidden = false;
    $('qz-weiter').focus();
  }

  // ---------- Begriff des Tages (jeden Tag ein anderer) ----------
  function begriffDesTages() {
    const liste = window.BEGRIFFE;
    const tag = Math.floor(Date.now() / TAG_MS);
    const b = liste[tag % liste.length];
    $('bdt-wort').textContent = b.begriff;
    $('bdt-erkl').textContent = b.erklaerung;
  }

  // ---------- Fortschritt ----------
  function zeigeFortschritt() {
    begriffDesTages();
    const box = $('fortschritt');
    box.textContent = '';
    const max = freigeschalteteStufe();
    [1, 2, 3].forEach((s) => {
      const begriffe = alleBegriffe().filter((b) => b.stufe === s);
      const sitzen = begriffe.filter((b) => karte(b.id).fach >= 3).length;
      const prozent = begriffe.length ? Math.round(sitzen / begriffe.length * 100) : 0;
      const zeile = el('div', null, 'balken-zeile');
      zeile.appendChild(el('p', 'Stufe ' + s + (s > max ? ' (gesperrt)' : '') + ': ' + sitzen + ' von ' + begriffe.length + ' sitzen'));
      const p = el('div', null, 'progress');
      const bar = el('div', null, 'bar ' + (s > max ? 'muted' : prozent >= 80 ? 'success' : 'secondary'));
      bar.style.width = Math.max(prozent, 2) + '%';
      p.appendChild(bar);
      zeile.appendChild(p);
      box.appendChild(zeile);
    });
    const fertig = window.MODULE ? window.MODULE.filter((m) => daten.module[m.id] && daten.module[m.id].bestanden).length : 0;
    box.appendChild(el('p', 'Lernmodule bestanden: ' + fertig + ' von ' + (window.MODULE ? window.MODULE.length : 0), 'lesbar'));
    box.appendChild(el('p', 'Tagebucheinträge: ' + daten.tagebuch.length + ' · Eigene Begriffe: ' + daten.eigeneBegriffe.length, 'lesbar'));
  }

  // ---------- Sichern ----------
  $('si-export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(daten, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'add-to-brain-sicherung-' + heuteISO() + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    $('si-meldung').textContent = 'Sicherung wurde heruntergeladen.';
  });
  $('si-import').addEventListener('change', (ev) => {
    const datei = ev.target.files[0];
    if (!datei) return;
    datei.text().then((t) => {
      const neu = JSON.parse(t);
      if (!neu || !Array.isArray(neu.tagebuch)) throw new Error('falsches Format');
      daten = Object.assign(leer(), neu);
      speichern();
      $('si-meldung').textContent = 'Sicherung eingelesen: ' + daten.tagebuch.length + ' Tagebucheinträge, ' + daten.eigeneBegriffe.length + ' eigene Begriffe.';
    }).catch(() => { $('si-meldung').textContent = 'Diese Datei ist keine gültige Add-to-Brain-Sicherung.'; });
    ev.target.value = '';
  });

  // Zugriff für andere Skripte (z. B. lernen.js)
  window.ATB = { get daten() { return daten; }, speichern };

  zeigeSeite();
})();
