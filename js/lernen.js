// Add to Brain – Lernmodule mit Vorlesefunktion (Web Speech API, läuft im Browser)
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const stimme = window.speechSynthesis || null;
  let aktuellesModul = null;
  let saetze = [];        // alle <span class="satz"> des offenen Moduls
  let satzIndex = 0;
  let liest = false;

  function el(tag, text, klasse) {
    const e = document.createElement(tag);
    if (text != null) e.textContent = text;
    if (klasse) e.className = klasse;
    return e;
  }
  function fortschritt() {
    const d = window.ATB.daten;
    if (!d.module) d.module = {};
    return d.module;
  }

  // Ein Modul ist offen, wenn es Inhalt hat und das vorige bestanden ist
  function istOffen(i) {
    const m = window.MODULE[i];
    if (!m.bloecke.length) return false;
    if (i === 0) return true;
    const vorher = window.MODULE[i - 1];
    return !!(fortschritt()[vorher.id] && fortschritt()[vorher.id].bestanden);
  }

  // ---------- Übersicht ----------
  function zeigeListe() {
    stoppeVorlesen();
    aktuellesModul = null;
    $('ln-liste').hidden = false;
    $('ln-modul').hidden = true;
    const box = $('ln-module');
    box.textContent = '';
    window.MODULE.forEach((m, i) => {
      const f = fortschritt()[m.id] || {};
      const offen = istOffen(i);
      const karte = el('div', null, 'card modulkarte' + (offen ? '' : ' gesperrt'));
      const body = el('div', null, 'card-body');
      const titel = el('h4', (i + 1) + '. ' + m.titel, 'card-title');
      if (f.bestanden) titel.appendChild(el('span', 'bestanden', 'badge success marke'));
      body.appendChild(titel);
      body.appendChild(el('p', m.kurz, 'lesbar'));
      const info = !m.bloecke.length ? 'Kommt bald' : !offen ? 'Wird freigeschaltet, wenn Modul ' + i + ' bestanden ist' : 'ca. ' + m.minuten + ' Minuten Lesezeit · 3 Quizfragen';
      body.appendChild(el('p', info, 'modulinfo'));
      if (offen) {
        const k = el('button', f.bestanden ? 'Nochmal lesen' : 'Starten', f.bestanden ? 'btn-small' : 'btn-primary'); k.type = 'button';
        k.addEventListener('click', () => oeffneModul(i));
        body.appendChild(k);
      }
      karte.appendChild(body);
      box.appendChild(karte);
    });
    box.appendChild(kompass());
  }

  // ---------- Kompass: die Themenbereiche der Umschulung und wo sie hier vorkommen ----------
  const THEMENBEREICHE = [
    ['Onlinesortimente gestalten und die Beschaffung unterstützen', [2, 11], 'Rechnen: Lager und Kosten'],
    ['Verträge im Onlinevertrieb anbahnen und bearbeiten', [3, 12], 'Praxis: Eine Hotelkette fragt an'],
    ['Wertströme erfassen, auswerten und beurteilen', [9, 13], 'Rechnen: Kalkulation'],
    ['Rückabwicklungsprozesse und Leistungsstörungen bearbeiten', [4, 7, 12], 'Praxis: Das Café zahlt nicht'],
    ['Servicekommunikation kundenorientiert gestalten', [8], 'Gespräch üben'],
    ['Online-Marketing-Maßnahmen umsetzen und bewerten', [5], 'Rechnen: Online-Werbung'],
    ['Onlinevertriebskanäle auswählen', [1, 14], 'Praxis: Shop oder Marktplatz?'],
    ['Kennzahlengestützte Optimierung des Onlinevertriebs', [6, 10], 'Rechnen: Shop-Kennzahlen'],
    ['Berufsbezogene Projektarbeit', [15], 'Praxis: Das Adventskalender-Projekt']
  ];
  function kompass() {
    const karte = el('div', null, 'card modulkarte kompass');
    const body = el('div', null, 'card-body');
    body.appendChild(el('h4', 'Kompass: deine Umschulung', 'card-title'));
    body.appendChild(el('p', 'Die neun Themenbereiche der Umschulung und wo du sie hier übst.', 'lesbar leise'));
    const ul = el('ul', null, 'kompass-liste');
    THEMENBEREICHE.forEach(([thema, nummern, extra]) => {
      const li = el('li');
      const fertig = nummern.every((n) => { const m = window.MODULE[n - 1]; return m && fortschritt()[m.id] && fortschritt()[m.id].bestanden; });
      li.appendChild(el('strong', thema));
      if (fertig) li.appendChild(el('span', '✓', 'kompass-haken'));
      li.appendChild(el('span', 'Modul ' + nummern.join(', ') + ' · ' + extra, 'kompass-wo'));
      ul.appendChild(li);
    });
    body.appendChild(ul);
    karte.appendChild(body);
    return karte;
  }

  // ---------- Modul lesen ----------
  // **fett** in <strong> umwandeln und den Text in Sätze teilen
  function satzSpans(text, ziel) {
    // Nur an Satzzeichen mit folgendem Leerzeichen trennen – so bleiben Zahlen wie 10.000 ganz
    const teile = text.split(/(?<=[.!?]["“”]?)\s+/).map((t, i, alle) => (i < alle.length - 1 ? t + ' ' : t));
    teile.forEach((satz) => {
      const span = el('span', null, 'satz');
      satz.split(/(\*\*[^*]+\*\*)/).forEach((stueck) => {
        if (!stueck) return;
        if (stueck.startsWith('**')) span.appendChild(el('strong', stueck.slice(2, -2)));
        else span.appendChild(document.createTextNode(stueck));
      });
      ziel.appendChild(span);
    });
  }

  function oeffneModul(i) {
    stoppeVorlesen();
    const m = window.MODULE[i];
    aktuellesModul = i;
    $('ln-liste').hidden = true;
    $('ln-modul').hidden = false;
    $('ln-titel').textContent = (i + 1) + '. ' + m.titel;
    const text = $('ln-text');
    text.textContent = '';
    m.bloecke.forEach((b) => {
      if (b.h) { const h = el('h3'); satzSpans(b.h, h); text.appendChild(h); }
      if (b.p) { const p = el('p'); satzSpans(b.p, p); text.appendChild(p); }
      if (b.liste) {
        const ol = el('ol');
        b.liste.forEach((punkt) => { const li = el('li'); satzSpans(punkt, li); ol.appendChild(li); });
        text.appendChild(ol);
      }
    });
    saetze = Array.from(text.querySelectorAll('.satz'));
    satzIndex = 0;
    $('ln-quiz').hidden = true;
    $('ln-zum-quiz').hidden = false;
    $('ln-vorlesen-hinweis').hidden = !!stimme;
    $('ln-steuerung').hidden = !stimme;
    if (window.SPUR) window.SPUR.anfang(); else window.scrollTo(0, 0);
  }

  // ---------- Vorlesen ----------
  function deutscheStimme() {
    if (!stimme) return null;
    const alle = stimme.getVoices().filter((v) => v.lang && v.lang.toLowerCase().startsWith('de'));
    // natürlich klingende Stimmen bevorzugen (Edge: "Online (Natural)", Google, Apple "Anna")
    return alle.find((v) => /natural|online/i.test(v.name)) || alle.find((v) => /google/i.test(v.name)) || alle[0] || null;
  }
  if (stimme) { stimme.getVoices(); stimme.onvoiceschanged = () => stimme.getVoices(); }

  // Merken, wann man selbst geblättert hat (Mausrad, Wischen, Pfeiltasten, Zurück/Weiter)
  let selbstGeblaettert = 0;
  const merkeBlaettern = () => { selbstGeblaettert = Date.now(); };
  ['wheel', 'touchmove', 'keydown'].forEach((e) => document.addEventListener(e, merkeBlaettern, { passive: true }));
  ['pfeil-links', 'pfeil-rechts'].forEach((id) => { const b = document.getElementById(id); if (b) b.addEventListener('click', merkeBlaettern); });

  function markiere(i) {
    saetze.forEach((s) => s.classList.remove('liest'));
    if (saetze[i]) {
      saetze[i].classList.add('liest');
      const r = saetze[i].getBoundingClientRect();
      // Mitführen nur nach vorne und nur, wenn man nicht gerade selbst blättert – sonst springt die Seite zurück
      const voraus = r.left > window.innerWidth || r.top > window.innerHeight - 70;
      if (voraus && Date.now() - selbstGeblaettert > 6000) saetze[i].scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
    }
  }

  function liesSatz() {
    if (!liest || satzIndex >= saetze.length) { stoppeVorlesen(satzIndex >= saetze.length); return; }
    const u = new SpeechSynthesisUtterance(saetze[satzIndex].textContent);
    u.lang = 'de-DE';
    const v = deutscheStimme();
    if (v) u.voice = v;
    u.rate = parseFloat($('ln-tempo').value) || 1;
    u.onstart = () => markiere(satzIndex);
    u.onend = () => { if (liest) { satzIndex++; liesSatz(); } };
    u.onerror = () => { if (liest) { satzIndex++; liesSatz(); } };
    stimme.speak(u);
  }

  function schwebe(sichtbar, pausiert) {
    $('ln-schwebe').hidden = !sichtbar;
    $('ln-s-pause').textContent = pausiert ? 'Weiterlesen' : 'Pause';
  }

  function starteVorlesen() {
    if (!stimme) return;
    stimme.cancel();
    liest = true;
    schwebe(true, false);
    if (satzIndex >= saetze.length) satzIndex = 0;
    $('ln-play').hidden = true;
    $('ln-pause').hidden = false;
    liesSatz();
  }
  function pausiereVorlesen() {
    liest = false;
    if (stimme) stimme.cancel();
    schwebe(true, true);
    $('ln-play').textContent = 'Weiterlesen';
    $('ln-play').hidden = false;
    $('ln-pause').hidden = true;
  }
  function stoppeVorlesen(fertig) {
    liest = false;
    if (stimme) stimme.cancel();
    if ($('ln-schwebe')) schwebe(false, false);
    saetze.forEach((s) => s.classList.remove('liest'));
    if (fertig !== false) satzIndex = 0;
    if ($('ln-play')) { $('ln-play').textContent = 'Vorlesen'; $('ln-play').hidden = false; $('ln-pause').hidden = true; }
  }

  // Auf einen Satz klicken = ab dort vorlesen
  document.addEventListener('click', (ev) => {
    const s = ev.target.closest && ev.target.closest('#ln-text .satz');
    if (!s || !stimme) return;
    satzIndex = saetze.indexOf(s);
    starteVorlesen();
  });

  $('ln-play').addEventListener('click', starteVorlesen);
  $('ln-pause').addEventListener('click', pausiereVorlesen);
  $('ln-stopp').addEventListener('click', () => stoppeVorlesen(true));
  $('ln-s-pause').addEventListener('click', () => { if (liest) pausiereVorlesen(); else starteVorlesen(); });
  $('ln-s-stopp').addEventListener('click', () => stoppeVorlesen(true));
  $('ln-tempo').addEventListener('change', () => { if (liest) { stimme.cancel(); liesSatz(); } });
  $('ln-zurueck').addEventListener('click', zeigeListe);
  window.addEventListener('hashchange', () => stoppeVorlesen(true));

  // ---------- Mini-Quiz ----------
  // Antworten in zufälliger Reihenfolge zeigen, damit die richtige nicht immer an derselben Stelle steht
  const mischen = (liste) => { const a = liste.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  $('ln-zum-quiz').addEventListener('click', () => {
    stoppeVorlesen(true);
    const m = window.MODULE[aktuellesModul];
    const box = $('ln-fragen');
    box.textContent = '';
    let beantwortet = 0, richtige = 0;
    m.quiz.forEach((q, qi) => {
      const fs = el('div', null, 'ln-frage');
      fs.appendChild(el('p', (qi + 1) + '. ' + q.frage, 'qz-frage lesbar'));
      const antworten = el('div', null, 'qz-antworten');
      const rueck = el('p', '', 'lesbar');
      mischen(q.antworten.map((a, ai) => [a, ai])).forEach(([a, ai]) => {
        const b = el('button', a); b.type = 'button';
        if (ai === q.richtig) b.dataset.richtig = '1';
        b.addEventListener('click', () => {
          antworten.querySelectorAll('button').forEach((x) => { if (x !== b) x.disabled = true; });
          b.style.pointerEvents = 'none';
          const ok = ai === q.richtig;
          b.classList.add(ok ? 'btn-success' : 'btn-danger');
          if (!ok) antworten.querySelector('[data-richtig]').classList.add('btn-success');
          rueck.textContent = (ok ? 'Richtig! ' : 'Leider falsch. ') + q.erklaerung;
          beantwortet++; if (ok) richtige++;
          if (beantwortet === m.quiz.length) quizFertig(m, richtige);
        });
        antworten.appendChild(b);
      });
      fs.appendChild(antworten);
      fs.appendChild(rueck);
      box.appendChild(fs);
    });
    $('ln-ergebnis').textContent = '';
    $('ln-ergebnis-knoepfe').textContent = '';
    $('ln-zum-quiz').hidden = true;
    $('ln-quiz').hidden = false;
    $('ln-quiz').scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  });

  function quizFertig(m, richtige) {
    const bestanden = richtige >= 2;
    const f = fortschritt();
    const alt = f[m.id] || {};
    f[m.id] = { bestanden: alt.bestanden || bestanden, bestes: Math.max(alt.bestes || 0, richtige), datum: new Date().toISOString().slice(0, 10) };
    window.ATB.speichern();
    $('ln-ergebnis').textContent = richtige + ' von ' + m.quiz.length + ' richtig. ' + (bestanden
      ? (aktuellesModul === window.MODULE.length - 1 ? 'Bestanden! Du hast alle Module geschafft – richtig stark!' : 'Bestanden! Das nächste Modul ist jetzt freigeschaltet.')
      : 'Noch nicht bestanden. Lies den Text noch einmal oder lass ihn dir vorlesen und versuch es dann wieder.');
    const kn = $('ln-ergebnis-knoepfe');
    kn.textContent = '';
    const z = el('button', 'Zur Übersicht', 'btn-primary'); z.type = 'button';
    z.addEventListener('click', zeigeListe);
    kn.appendChild(z);
    if (!bestanden) {
      const n = el('button', 'Text nochmal lesen'); n.type = 'button';
      n.addEventListener('click', () => oeffneModul(aktuellesModul));
      kn.appendChild(n);
    }
  }

  window.LERNEN = { zeige: zeigeListe, stopp: () => stoppeVorlesen(true) };
})();
