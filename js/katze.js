// Add to Brain – die Katze: ein verspieltes Maskottchen mit möglichst natürlichem Katzenverhalten.
// Sie sitzt unten, läuft beim Blättern mit, springt auf Karten, putzt sich, schaut sich um,
// schläft ein, wenn man länger nichts tut, streckt sich beim Aufwachen, freut sich über richtige
// Antworten und ist ab und zu ein bisschen frech. Ein Klick auf sie – und sie springt beleidigt weg.
//
// Weitere Sprungziele: Jedes Element mit der Klasse .card oder dem Attribut data-katze
// (z. B. <div data-katze>…</div>) kann die Katze als Sitzplatz wählen, wenn es sichtbar ist.
(function () {
  'use strict';

  const S_WAHL = 'atb-katze';                    // 'schwarz' | 'weiss' | 'aus'
  const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handy = window.matchMedia('(max-width: 767px)');
  const spur = document.getElementById('spur');
  const leiste = document.querySelector('.leiste');
  if (!spur || !leiste) return;

  // ---------- Posen (viewBox 0 0 120 100, Boden bei y = 96, Blick nach rechts) ----------
  const f = (n) => n.toFixed(1);
  function kopfMitOhren(x, y, s) {
    const k = (dx, dy) => f(x + dx * s) + ' ' + f(y + dy * s);
    return `<path class="k-fell" d="M${k(-13,2)} C${k(-14,-6)} ${k(-12,-12)} ${k(-10,-15)} L${k(-11,-25)} L${k(-3,-16)} C${k(-1,-17)} ${k(1,-17)} ${k(3,-16)} L${k(11,-25)} L${k(10,-15)} C${k(12,-12)} ${k(14,-6)} ${k(13,2)} C${k(12,9)} ${k(6,13)} ${k(0,13)} C${k(-6,13)} ${k(-12,9)} ${k(-13,2)} Z"/>`;
  }
  function gesicht(x, y, s, art) {
    const k = (dx, dy) => f(x + dx * s) + ' ' + f(y + dy * s);
    const zu = `<path class="k-zu" d="M${k(-8,-2)} Q${k(-5,1)} ${k(-2,-2)} M${k(2,-2)} Q${k(5,1)} ${k(8,-2)}"/>`;
    const nase = `<path class="k-nase" d="M${k(-1.6,3.5)} L${k(1.6,3.5)} L${k(0,5.3)} Z"/>`;
    const bart = `<path class="k-bart" d="M${k(-6,5)} L${k(-19,3)} M${k(-6,7)} L${k(-19,8.5)} M${k(6,5)} L${k(19,3)} M${k(6,7)} L${k(19,8.5)}"/>`;
    if (art === 'zu') return zu + nase + bart;
    if (art === 'gaehnen') return zu + `<ellipse class="k-maul" cx="${f(x)}" cy="${f(y + 6 * s)}" rx="${f(2.6 * s)}" ry="${f(3.4 * s)}"/>` + bart;
    const augen = `<g class="k-augen"><path class="k-auge" d="M${k(-8,-2)} Q${k(-5,-6)} ${k(-2,-2)} Q${k(-5,1)} ${k(-8,-2)} Z M${k(2,-2)} Q${k(5,-6)} ${k(8,-2)} Q${k(5,1)} ${k(2,-2)} Z"/><path class="k-pupille" d="M${k(-5,-4.2)} L${k(-5,0)} M${k(5,-4.2)} L${k(5,0)}"/></g>`;
    return augen + `<g class="k-zu-blinzeln">${zu}</g>` + nase + bart;
  }
  // Wütender Kopf: Ohren flach nach hinten, schmale Augen, Maul weit offen mit Zähnchen
  function kopfWuetend(x, y, s) {
    const k = (dx, dy) => f(x + dx * s) + ' ' + f(y + dy * s);
    return `<g class="k-kopf" style="transform-origin:${x}px ${f(y + 10 * s)}px">
      <path class="k-fell" d="M${k(-13,2)} C${k(-14,-6)} ${k(-12,-11)} ${k(-9,-13)} L${k(-21,-15)} L${k(-4,-15)} C${k(-1,-16)} ${k(1,-16)} ${k(4,-15)} L${k(21,-15)} L${k(9,-13)} C${k(12,-11)} ${k(14,-6)} ${k(13,2)} C${k(12,9)} ${k(6,13)} ${k(0,13)} C${k(-6,13)} ${k(-12,9)} ${k(-13,2)} Z"/>
      <path class="k-auge" d="M${k(-9,-4)} L${k(-2,-1.5)} Q${k(-5,1)} ${k(-8,-1)} Z M${k(9,-4)} L${k(2,-1.5)} Q${k(5,1)} ${k(8,-1)} Z"/>
      <path class="k-pupille" d="M${k(-5,-2.6)} L${k(-5,0)} M${k(5,-2.6)} L${k(5,0)}"/>
      <ellipse class="k-maul" cx="${f(x)}" cy="${f(y + 6 * s)}" rx="${f(4 * s)}" ry="${f(4.4 * s)}"/>
      <path class="k-zahn" d="M${k(-2.6,2.6)} L${k(-1.4,5)} L${k(-0.4,2.6)} Z M${k(2.6,2.6)} L${k(1.4,5)} L${k(0.4,2.6)} Z"/>
      <path class="k-bart" d="M${k(-6,5)} L${k(-20,1)} M${k(-6,7)} L${k(-20,7)} M${k(6,5)} L${k(20,1)} M${k(6,7)} L${k(20,7)}"/>
    </g>`;
  }
  const kopf = (x, y, s, art) => `<g class="k-kopf" style="transform-origin:${x}px ${f(y + 10 * s)}px">${kopfMitOhren(x, y, s)}${gesicht(x, y, s, art)}</g>`;
  const SITZ_KOERPER = `<g class="k-schwanz" style="transform-origin:48px 93px"><path class="k-schwanzlinie" d="M50 94 C36 97 24 93 23 83 C22 74 31 71 33 78"/></g>
    <path class="k-fell" d="M62 42 C48 50 39 64 40 80 C41 91 46 96 54 96 L82 96 C86 96 86 91 82 89 C79 77 80 61 76 47 Z"/>`;
  const POSEN = {
    sitzen: SITZ_KOERPER + `<path class="k-bein" d="M73 70 L73 95 M78 68 L80 95"/>` + kopf(70, 33, 1, 'auf'),
    putzen: SITZ_KOERPER + `<path class="k-bein" d="M78 68 L80 95"/>` + kopf(70, 33, 1, 'zu') +
      `<g class="k-putzpfote" style="transform-origin:73px 66px"><path class="k-bein" d="M73 66 C78 58 78 50 73 46"/><circle class="k-fell" cx="72.5" cy="45.5" r="3.4"/></g>`,
    tippen: SITZ_KOERPER + `<path class="k-bein" d="M73 70 L73 95"/>` + kopf(70, 33, 1, 'auf') +
      `<g class="k-putzpfote" style="transform-origin:78px 68px"><path class="k-bein" d="M78 68 C84 66 90 66 94 70"/><circle class="k-fell" cx="94.5" cy="70.5" r="3.4"/></g>`,
    schlafen: `<path class="k-fell" d="M20 96 C14 82 26 68 48 66 C70 64 90 72 97 86 C99 92 96 96 91 96 Z"/>
      <path class="k-schwanzlinie" d="M22 93 C36 100 60 100 74 95"/>` + kopf(87, 82, 0.9, 'zu') +
      `<text class="k-zzz" x="98" y="58">z</text><text class="k-zzz k-zzz2" x="105" y="47">z</text><text class="k-zzz k-zzz3" x="112" y="36">z</text>`,
    strecken: `<g class="k-schwanz" style="transform-origin:30px 60px"><path class="k-schwanzlinie" d="M30 60 C24 46 27 34 35 35 C39 36 38 41 35 41"/></g>
      <path class="k-bein" d="M30 66 L28 95 M37 68 L36 95"/>
      <path class="k-fell" d="M24 64 C25 55 36 51 46 57 C58 64 68 74 78 82 C82 86 84 90 80 92 C70 94 56 88 44 82 C34 78 26 74 24 64 Z"/>
      <path class="k-bein" d="M74 90 L106 94 M74 86 L104 91"/>` + kopf(85, 80, 0.95, 'gaehnen'),
    laufen: `<g class="k-schwanz" style="transform-origin:30px 60px"><path class="k-schwanzlinie" d="M30 60 C20 54 18 41 25 35 C28 32 31 35 29 38"/></g>
      <g class="k-bein-a" style="transform-origin:40px 70px"><path class="k-bein" d="M40 70 L39 95"/></g>
      <g class="k-bein-b" style="transform-origin:76px 70px"><path class="k-bein" d="M76 70 L78 95"/></g>
      <path class="k-fell" d="M30 60 C36 51 62 50 76 53 C86 55 90 63 86 70 C80 76 46 76 34 72 C28 70 26 65 30 60 Z"/>
      <g class="k-bein-b" style="transform-origin:35px 70px"><path class="k-bein" d="M35 70 L34 95"/></g>
      <g class="k-bein-a" style="transform-origin:72px 72px"><path class="k-bein" d="M72 72 L71 95"/></g>` + kopf(91, 47, 0.95, 'auf'),
    buckel: `<g class="k-schwanz k-gestraeubt" style="transform-origin:36px 66px"><path class="k-schwanzlinie k-dick" d="M36 66 C26 56 25 38 31 24"/></g>
      <path class="k-bein" d="M40 70 L38 95 M47 72 L46 95 M73 72 L75 95 M80 70 L82 95"/>
      <path class="k-fell k-fell-gestraeubt" d="M32 76 C30 52 46 34 60 33 C74 32 89 50 88 76 C80 81 40 81 32 76 Z"/>` + kopfWuetend(91, 64, 0.95),
    lauern: `<g class="k-schwanz k-zucken" style="transform-origin:30px 88px"><path class="k-schwanzlinie" d="M30 88 C20 89 12 87 5 81"/></g>
      <path class="k-bein" d="M36 90 L42 95 M44 91 L50 95"/>
      <path class="k-fell" d="M27 84 C29 71 44 65 60 67 C72 68 82 73 88 79 C91 87 87 94 80 95 L36 95 C30 95 26 90 27 84 Z"/>
      <path class="k-bein" d="M80 92 L97 95 M76 90 L93 94"/>` + kopf(93, 76, 0.95, 'auf'),
    springen: `<g class="k-schwanz" style="transform-origin:28px 66px"><path class="k-schwanzlinie" d="M28 66 C18 64 10 56 8 48"/></g>
      <path class="k-bein" d="M34 70 L18 86 M40 72 L26 90"/>
      <path class="k-fell" d="M26 66 C30 56 54 48 72 46 C82 45 88 52 84 60 C78 68 50 76 36 76 C29 76 24 72 26 66 Z"/>
      <path class="k-bein" d="M76 56 L98 46 M78 60 L100 52"/>` + kopf(90, 40, 0.95, 'auf')
  };

  // ---------- Aufbau ----------
  const el = document.createElement('div');
  el.className = 'katze';
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', 'Schwarze Katze, das Maskottchen von Add to Brain');
  el.title = 'Miau';
  el.innerHTML = '<div class="katze-figur"><svg viewBox="0 0 120 100" aria-hidden="true" focusable="false"></svg></div>' +
    '<span class="k-rrr" aria-hidden="true">rrr</span><span class="k-rrr k-rrr2" aria-hidden="true">rrr</span>' +
    '<span class="k-ruf" aria-hidden="true">Pfff!</span>' +
    '<span class="k-herz" aria-hidden="true">♥</span><span class="k-herz k-herz2" aria-hidden="true">♥</span><span class="k-herz k-herz3" aria-hidden="true">♥</span>'; // außerhalb der Figur, damit die Schrift nie gespiegelt wird
  document.body.appendChild(el);
  const svg = el.querySelector('svg');

  // Schalter in der Leiste: schwarz → weiß → aus
  const schalter = document.createElement('a');
  schalter.href = '#';
  schalter.className = 'leiste-link leiste-katze';
  leiste.insertBefore(schalter, leiste.querySelector('.balken'));

  function lies() { try { return localStorage.getItem(S_WAHL) || 'schwarz'; } catch (e) { return 'schwarz'; } }
  function merke(w) { try { localStorage.setItem(S_WAHL, w); } catch (e) { /* nur bis zum Neuladen */ } }
  let wahl = lies();
  function zeigeWahl() {
    document.documentElement.classList.toggle('katze-weiss', wahl === 'weiss');
    el.hidden = wahl === 'aus';
    el.setAttribute('aria-label', (wahl === 'weiss' ? 'Weiße' : 'Schwarze') + ' Katze, das Maskottchen von Add to Brain');
    schalter.textContent = 'Katze: ' + (wahl === 'schwarz' ? 'schwarz' : wahl === 'weiss' ? 'weiß' : 'aus');
    schalter.title = 'Klicken zum Wechseln: schwarz → weiß → aus';
  }
  schalter.addEventListener('click', (ev) => {
    ev.preventDefault();
    wahl = wahl === 'schwarz' ? 'weiss' : wahl === 'weiss' ? 'aus' : 'schwarz';
    merke(wahl);
    zeigeWahl();
    if (wahl !== 'aus') { aktiv(); wecken(); }
  });
  zeigeWahl();

  // ---------- Zustand ----------
  let breite = 96, hoehe = 80;
  let pos = { x: 0, y: 0 };
  let anker = { art: 'boden', x: 0 };   // oder { art: 'ziel', el, dx }
  let aktion = null;                     // laufende Bewegung (Laufen, Springen, Hüpfen)
  let pose = '';
  let schlaeft = false;
  let letzteAktivitaet = Date.now();
  let blaettern = null;                  // Zeitgeber fürs Blättern
  let besonders = null;                  // Zeitgeber für Putzen, Freuen …
  const zufall = (a, b) => a + Math.random() * (b - a);

  function masse() {
    breite = handy.matches ? 84 : 116;
    hoehe = handy.matches ? 70 : 96;
  }
  const kopfHoehe = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header')) || 72;
  const leisteHoehe = () => leiste.getBoundingClientRect().height || 64;
  const bodenY = () => window.innerHeight - leisteHoehe() - hoehe + 4;
  const grenzeX = (x) => Math.max(8, Math.min(window.innerWidth - breite - 8, x));

  let ueberblendung = null;
  function setzePose(name, klassen) {
    if (pose !== name) {
      // alte Pose kurz ausblenden, neue einblenden – so springt die Figur nicht hart um
      const alt = pose ? `<g class="k-alt">${POSEN[pose]}</g>` : '';
      svg.innerHTML = alt + `<g class="k-neu">${POSEN[name]}</g>`;
      pose = name;
      clearTimeout(ueberblendung);
      ueberblendung = setTimeout(() => { const a = svg.querySelector('.k-alt'); if (a) a.remove(); }, 170);
    }
    el.classList.remove('freut', 'putzt', 'schaut', 'tippt', 'schlaeft', 'lauert', 'schnurrt', 'schmollt', 'faucht', 'jubelt', 'peitscht', 'schleicht', 'anlaufen');
    el.classList.toggle('laeuft', name === 'laufen');
    (klassen || []).forEach((k) => el.classList.add(k));
  }
  // Form der Figur: stauchen, strecken, drehen (für Absprung, Flug und Landung)
  function form(sx, sy, dreh) {
    svg.style.transform = (dreh ? `rotate(${dreh}deg) ` : '') + (sx !== 1 || sy !== 1 ? `scale(${sx}, ${sy})` : '');
  }
  const sanft = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;   // langsam – schnell – langsam
  const federn = (t) => 1 - Math.sin(t * Math.PI) * (1 - t) * 0.9;              // abfedernde Rückkehr
  function blick(nachRechts) { el.classList.toggle('links', !nachRechts); }
  function zeichne() { el.style.transform = `translate(${Math.round(pos.x)}px, ${Math.round(pos.y)}px)`; }

  // Darf die Katze hier sitzen, ohne Logo, Menü oder Knöpfe oben zu verdecken?
  function frei(x, y, auchText) {
    if (y < -hoehe * 0.07 || x < 4 || x + breite > window.innerWidth - 4) return false; // Ohren beginnen erst unterhalb des Bildrands
    // nur die Mitte der Figur zählt – die Ränder des Bildes sind leer
    const k = { l: x + breite * 0.18, r: x + breite * 0.82, o: y + hoehe * 0.05, u: y + hoehe };
    const kopfFrei = ![...document.querySelectorAll('.kopf a, .kopf button')].some((b) => {
      const r = b.getBoundingClientRect();
      return r.width && k.l < r.right + 6 && k.r > r.left - 6 && k.o < r.bottom + 4 && k.u > r.top - 4;
    });
    if (!kopfFrei || !auchText) return kopfFrei;
    // Verdeckt sie Text oder Bedienelemente der Seite? Dann ist der Platz nicht frei.
    const punkte = [[0.35, 0.3], [0.6, 0.3], [0.45, 0.6], [0.65, 0.6], [0.45, 0.88], [0.7, 0.88]];
    return !punkte.some(([fx, fy]) => {
      const px = x + breite * fx, py = y + hoehe * fy;
      return document.elementsFromPoint(px, py).some((e) => !e.closest('.katze') && e !== spur && !e.classList.contains('seite') && !!e.closest('#spur'));
    });
  }

  // Position des Ankers auf dem Bildschirm – null, wenn ein Sitzplatz nicht mehr passt
  function ankerPos() {
    if (anker.art === 'boden') return { x: grenzeX(anker.x), y: bodenY() };
    const r = anker.el.getBoundingClientRect();
    if (!r.width || anker.el.closest('[hidden]') || r.top > window.innerHeight - leisteHoehe() - 10) return null;
    const p = { x: r.left + Math.min(anker.dx, Math.max(0, r.width - breite)), y: r.top - hoehe + 5 };
    return frei(p.x, p.y) ? p : null;
  }

  // Mögliche Sitzplätze: sichtbare Karten (und alles mit data-katze) mit einer freien Stelle auf der Oberkante
  function sitzplaetze() {
    const unten = window.innerHeight - leisteHoehe() - 30;
    const liste = [];
    spur.querySelectorAll('.card, [data-katze]').forEach((k) => {
      if (k.closest('[hidden]')) return;
      const r = k.getBoundingClientRect();
      if (r.width < breite * 0.9 || r.top > unten || r.left < 0 || r.right > window.innerWidth) return;
      const stellen = [];
      for (let dx = 10; dx <= r.width - breite - 10; dx += 24) if (frei(r.left + dx, r.top - hoehe + 5, true)) stellen.push(dx);
      if (stellen.length) { k._katzeStellen = stellen; liste.push(k); }
    });
    return liste;
  }

  // Den Zwischenraum neben einer Karte finden: links oder rechts ein Nachbarblock, dazwischen klettert sie hoch.
  // Ergebnis: { seite: 'links'|'rechts', a, b } – a und b sind die beiden Wandkanten (a < b) auf dem Bildschirm.
  function findeSpalt(ziel, bevorzugtX) {
    const r = ziel.getBoundingClientRect();
    const oben = r.top, unten = bodenY() + hoehe;
    let links = null, rechts = null;
    spur.querySelectorAll('.card, .seite > h2, .seite > p, .seite > div:not([hidden])').forEach((k) => {
      if (k === ziel || k.contains(ziel) || ziel.contains(k) || k.closest('[hidden]')) return;
      const q = k.getBoundingClientRect();
      if (!q.width || q.bottom < oben + 20 || q.top > unten) return;            // muss in der Höhe danebenliegen
      if (q.right <= r.left + 2 && q.right >= r.left - 170) links = Math.max(links == null ? -1e9 : links, q.right);
      if (q.left >= r.right - 2 && q.left <= r.right + 170) rechts = Math.min(rechts == null ? 1e9 : rechts, q.left);
    });
    const spaltL = links != null ? { seite: 'links', a: links, b: r.left } : null;
    const spaltR = rechts != null ? { seite: 'rechts', a: r.right, b: rechts } : null;
    const nah = (sp) => Math.abs((sp.a + sp.b) / 2 - bevorzugtX);
    if (spaltL && spaltR) return nah(spaltL) <= nah(spaltR) ? spaltL : spaltR;
    if (spaltL || spaltR) return spaltL || spaltR;
    // kein Nachbar: an der Kante der Karte hochklettern (die freie Seite ist die „zweite Wand“)
    const kanteLinks = Math.abs(r.left - bevorzugtX) < Math.abs(r.right - bevorzugtX);
    return kanteLinks ? { seite: 'links', a: r.left - breite * 0.5, b: r.left, offen: true } : { seite: 'rechts', a: r.right, b: r.right + breite * 0.5, offen: true };
  }

  // ---------- Bewegungen ----------
  // Eine freie Stelle am Boden suchen (verdeckt keinen Text), in der Nähe von x
  function freierBoden(x) {
    const y = bodenY();
    for (let i = 0; i < 14; i++) {
      const versuch = grenzeX(i === 0 ? x : x + (i % 2 ? 1 : -1) * Math.ceil(i / 2) * 60);
      if (frei(versuch, y, true)) return versuch;
    }
    for (let i = 0; i < 12; i++) { const z = grenzeX(zufall(20, window.innerWidth - breite - 20)); if (frei(z, y, true)) return z; }
    return grenzeX(x);
  }

  function laufeZu(zielX, dann) {
    const start = pos.x;
    zielX = grenzeX(zielX);
    const weg = zielX - start;
    if (Math.abs(weg) < 6) { if (dann) dann(); return; }
    blick(weg > 0);
    setzePose('laufen');
    zuletztUnterwegs = performance.now();
    const tempo = handy.matches ? 110 : 150; // Pixel pro Sekunde (in der Mitte des Weges)
    const dauer = Math.abs(weg) / tempo * 1000 + 350;  // etwas Zeit fürs Anlaufen und Abbremsen
    const t0 = performance.now();
    anker = { art: 'boden', x: zielX };
    aktion = (jetzt) => {
      const t = Math.min(1, (jetzt - t0) / dauer);
      pos.x = start + weg * sanft(t);
      pos.y = bodenY();
      if (t >= 1) { aktion = null; setzePose('sitzen'); if (dann) dann(); }
    };
    wecken();
  }

  // Ein einzelner Sprung von A nach B (Ziel darf sich beim Blättern mitbewegen)
  // Ablauf wie bei einer echten Katze: ducken und Kraft sammeln → lang strecken im Flug → abfedern bei der Landung
  function sprung(start, zielFn, dauer, bogen, drehung, dann, opt) {
    opt = opt || {};
    const ducken = opt.ohneAnlauf ? 0 : 170, landen = opt.ohneLandung ? 0 : 190;
    const t0 = performance.now();
    if (ducken) setzePose('sitzen');
    aktion = (jetzt) => {
      const z = jetzt - t0;
      if (z < ducken) {                               // ducken
        const d = sanft(z / ducken);
        form(1 + 0.1 * d, 1 - 0.16 * d, 0);
        pos.x = start.x; pos.y = start.y;
        return;
      }
      if (pose !== 'springen') setzePose('springen');
      const t = Math.min(1, (z - ducken) / dauer);
      const ziel = zielFn();
      const tx = sanft(t) * 0.35 + t * 0.65;          // fast gleichmäßig, minimal weich
      pos.x = start.x + (ziel.x - start.x) * tx;
      pos.y = start.y + (ziel.y - start.y) * t - 4 * bogen * t * (1 - t);   // Wurfparabel
      const streck = Math.sin(Math.PI * Math.min(1, t * 1.6)) * (1 - t);     // am Anfang lang gestreckt
      form(1 + 0.12 * streck, 1 - 0.08 * streck, (drehung || 0) * Math.sin(Math.PI * t) + (ziel.y < start.y ? -8 : 8) * (1 - 2 * t) * 0.6);
      if (t >= 1) {
        if (!landen) { form(1, 1, 0); aktion = null; dann(); return; }
        const tl = performance.now();
        setzePose('sitzen');
        aktion = (j) => {                             // abfedern
          const u = Math.min(1, (j - tl) / landen);
          const a = zielFn(); pos.x = a.x; pos.y = a.y;
          const q = 1 - federn(u);
          form(1 + 0.14 * q, 1 - 0.2 * q, 0);
          if (u >= 1) { form(1, 1, 0); aktion = null; dann(); }
        };
      }
    };
    wecken();
  }

  // Kurz an der Wand abstoßen: Pfoten an die Kartenkante, dann weiter
  function anDerWand(wandRechts, dann) {
    blick(wandRechts);
    setzePose('springen');
    const t0 = performance.now();
    aktion = (jetzt) => {
      const u = Math.min(1, (jetzt - t0) / 150);
      form(1 - 0.12 * Math.sin(Math.PI * u), 1, -62);   // Pfoten an die Wand, kurz zusammendrücken, abstoßen
      if (u >= 1) { aktion = null; form(1, 1, 0); dann(); }
    };
    wecken();
  }

  // Springen – kleine Höhen mit einem Satz, große Höhen wie beim Parkour:
  // im Zickzack zwischen den Kanten der Karte hoch, wie eine Katze zwischen zwei Wänden.
  function springeZu(neuerAnker, dann, opt) {
    opt = opt || {};
    anker = neuerAnker;
    const zielFn = () => ankerPos() || { x: grenzeX(pos.x), y: bodenY() };
    const ziel0 = zielFn();
    const fertig = () => { setzePose('sitzen'); if (dann) dann(); };
    const hoehenUnterschied = pos.y - ziel0.y;           // positiv = nach oben
    const maxSatz = hoehe * 2.4;                          // so hoch schafft sie es mit einem Satz
    setzePose('springen');

    if (hoehenUnterschied <= maxSatz || neuerAnker.art !== 'ziel') {
      blick(ziel0.x >= pos.x);
      const bogen = hoehenUnterschied > 0 ? Math.min(60, hoehenUnterschied * 0.3) + 30 : 26;
      sprung({ x: pos.x, y: pos.y }, zielFn, opt.schreck ? 400 : (hoehenUnterschied < -hoehe ? 520 : 480), opt.schreck ? bogen + 30 : bogen, 0, fertig, { ohneAnlauf: !!opt.schreck });
      return;
    }

    // Klettern im Zwischenraum: abwechselnd an der linken und rechten Wandkante hoch, wie in einem Kamin
    const spalt = neuerAnker.spalt || findeSpalt(anker.el, pos.x + breite / 2);
    const satz = hoehe * 1.5;                                   // kurze Sätze – so klettern Katzen
    const schritte = Math.max(2, Math.ceil(hoehenUnterschied / satz));
    const startY = pos.y;
    const versatz = (spalt.b - spalt.a) < breite * 0.7 ? breite * 0.16 : breite * 0.2;
    let i = 1;
    let anRechts = Math.abs(pos.x + breite / 2 - spalt.b) < Math.abs(pos.x + breite / 2 - spalt.a);
    const naechster = () => {
      if (i >= schritte) {
        // oben angekommen: seitlich auf die Karte hüpfen
        blick(zielFn().x >= pos.x);
        sprung({ x: pos.x, y: pos.y }, zielFn, 320, 26, -14, fertig, { ohneAnlauf: true });
        return;
      }
      const r = anker.el.getBoundingClientRect();
      if (!r.width) { aktion = null; return fertig(); }
      // Wände wandern beim Blättern mit der Karte mit
      const verschiebung = (spalt.seite === 'links' ? r.left - spalt.b : r.right - spalt.a);
      const wa = spalt.a + verschiebung, wb = spalt.b + verschiebung;
      anRechts = !anRechts;
      const mitteX = anRechts ? wb - versatz : wa + versatz;     // Mitte der Katze nahe der Wand, die sie berührt
      const wandY = startY - (startY - zielFn().y - hoehe * 0.35) * (i / schritte);
      const von = { x: pos.x, y: pos.y };
      blick(anRechts);
      i++;
      sprung(von, () => ({ x: grenzeX(mitteX - breite / 2), y: wandY }), 260, 10, -30, () => anDerWand(anRechts, naechster), { ohneAnlauf: i > 2, ohneLandung: true });
    };
    naechster();
  }

  function huepfen() {
    const t0 = performance.now();
    aktion = (jetzt) => {
      const t = Math.min(1, (jetzt - t0) / 560);
      const a = ankerPos() || { x: pos.x, y: bodenY() };
      pos.x = a.x;
      if (t < 0.2) { const d = sanft(t / 0.2); form(1 + 0.08 * d, 1 - 0.14 * d, 0); pos.y = a.y; }
      else if (t < 0.8) { const u = (t - 0.2) / 0.6; pos.y = a.y - 4 * 24 * u * (1 - u); form(0.95, 1.07, 0); }
      else { const u = (t - 0.8) / 0.2; const q = 1 - federn(u); pos.y = a.y; form(1 + 0.1 * q, 1 - 0.14 * q, 0); }
      if (t >= 1) { form(1, 1, 0); aktion = null; }
    };
    wecken();
  }

  // Zu einem Sitzplatz: auf dem Boden hinlaufen, dann hochspringen
  function zuSitzplatz(ziel) {
    const r = ziel.getBoundingClientRect();
    const stellen = ziel._katzeStellen || [14];
    const dx = stellen[Math.floor(Math.random() * stellen.length)];
    const neuerAnker = { art: 'ziel', el: ziel, dx };
    const zielX = r.left + dx;
    const hoch = pos.y - (r.top - hoehe) > hoehe * 2.4;
    if (hoch) {
      // erst unter den Zwischenraum neben der Karte laufen, dort hochklettern, oben nahe der Kante sitzen
      const spalt = findeSpalt(ziel, pos.x + breite / 2);
      neuerAnker.dx = spalt.seite === 'links' ? Math.min(...stellen) : Math.max(...stellen);
      neuerAnker.spalt = spalt;
      if (anker.art === 'ziel') { runterklettern(() => zuSitzplatz(ziel)); return; }
      laufeZu((spalt.a + spalt.b) / 2 - breite / 2, () => springeZu(neuerAnker));
    } else if (anker.art === 'ziel' || Math.abs(zielX - pos.x) < 260) springeZu(neuerAnker);
    else laufeZu(zielX - (zielX > pos.x ? 70 : -70), () => springeZu(neuerAnker));
  }
  function aufDenBoden(dann) {
    springeZu({ art: 'boden', x: freierBoden(pos.x + (Math.random() < 0.5 ? -40 : 40)) }, dann);
  }

  // Kratzspuren: drei Krallenlinien an der Kante der Karte. Sie hängen an der Karte (wandern beim Blättern mit)
  // und verblassen nach ein paar Sekunden wieder.
  function kratzspur(karte, seite, oben) {
    const sp = document.createElement('span');
    sp.className = 'kratzspur ' + seite;
    sp.setAttribute('aria-hidden', 'true');
    sp.innerHTML = '<i></i><i></i><i></i>';
    sp.style.top = oben + 'px';
    sp.style.height = '0px';
    karte.appendChild(sp);
    return {
      laenge(h) { sp.style.height = Math.max(0, h) + 'px'; },
      fertig() {
        setTimeout(() => sp.classList.add('verblasst'), 5000);
        setTimeout(() => sp.remove(), 9000);
      }
    };
  }

  // Runter wie eine echte Katze: an die Kante im Zwischenraum, Krallen ins Papier und ruckelnd hinunterrutschen
  function runterklettern(dann) {
    if (anker.art !== 'ziel') return aufDenBoden(dann);
    const karte = anker.el;
    const r0 = karte.getBoundingClientRect();
    if (bodenY() - pos.y < hoehe * 2.4 || !r0.width) return aufDenBoden(dann);   // niedrig: einfach springen
    const spalt = findeSpalt(karte, pos.x + breite / 2);
    const seite = spalt.seite;                                    // an welcher Kante der Karte sie runterrutscht
    const kante = () => { const r = karte.getBoundingClientRect(); return seite === 'links' ? r.left : r.right; };
    const mitteX = () => kante() + (seite === 'links' ? -breite * 0.14 : breite * 0.14);
    const relStart = 6;                                           // Abstand zur Oberkante der Karte (Kopf der Katze)
    const relEnde = Math.min(r0.height - hoehe * 0.55, bodenY() - r0.top);
    const ziehe = (rel) => { const r = karte.getBoundingClientRect(); return { x: mitteX() - breite / 2, y: r.top + rel }; };

    // 1. von oben an die Kante hüpfen
    blick(seite === 'links');                                     // Gesicht zur Wand
    sprung({ x: pos.x, y: pos.y }, () => ziehe(relStart), 280, 16, 0, () => {
      setzePose('springen');
      blick(seite === 'links');
      // 2. rutschen: ruckelnd (festhalten – loslassen – festhalten), Kratzspuren wachsen mit
      const spur2 = kratzspur(karte, seite, relStart + hoehe * 0.55);
      const weg = Math.max(0, relEnde - relStart);
      const dauer = weg / 210 * 1000 + 300;
      const t0 = performance.now();
      aktion = (jetzt) => {
        const t = Math.min(1, (jetzt - t0) / dauer);
        const ruck = t - Math.sin(2 * Math.PI * 5 * t) / (2 * Math.PI * 5) * 0.85;   // immer nach unten, aber ruckelnd
        const rel = relStart + weg * ruck;
        const p = ziehe(rel);
        pos.x = p.x; pos.y = p.y;
        form(0.94, 1.04, (seite === 'links' ? -1 : -1) * (68 + Math.sin(jetzt / 45) * 3));
        spur2.laenge(rel - relStart);
        if (t >= 1) {
          aktion = null; form(1, 1, 0); spur2.fertig();
          // 3. das letzte Stück abspringen und landen
          const x = freierBoden(pos.x + (seite === 'links' ? -50 : 50));
          springeZu({ art: 'boden', x }, dann);
        }
      };
      wecken();
    }, { ohneLandung: true });
  }

  // ---------- Kleine Gewohnheiten ----------
  function eineWeile(name, klassen, ms) {
    clearTimeout(besonders);
    setzePose(name, klassen);
    besonders = setTimeout(() => { if (!schlaeft && !aktion) setzePose('sitzen'); }, ms);
  }
  const putzen = () => eineWeile('putzen', ['putzt'], zufall(3500, 6000));
  const umschauen = () => { eineWeile('sitzen', ['schaut'], 2500); };

  function einschlafen() {
    if (aktion || schlaeft) return;
    schlaeft = true;
    clearTimeout(besonders);
    setzePose('schlafen', ['schlaeft']);
  }
  function aufwachen() {
    if (!schlaeft) return;
    schlaeft = false;
    if (Math.random() < 0.35 && !ruhig.matches) return erschrecken();
    eineWeile('strecken', [], 1800); // erst einmal ausgiebig strecken und gähnen
  }

  // Aus dem Schlaf gerissen: ohne Ducken hochschrecken und mit einem Satz weg – vom Block direkt hinunter
  function erschrecken() {
    clearTimeout(besonders);
    const weg = Math.random() < 0.5 ? -1 : 1;
    if (anker.art === 'ziel') {
      springeZu({ art: 'boden', x: freierBoden(pos.x + weg * 140) }, () => eineWeile('sitzen', ['schaut'], 2400), { schreck: true });
    } else {
      springeZu({ art: 'boden', x: freierBoden(pos.x + weg * 90) }, () => {
        laufeZu(freierBoden(pos.x + weg * 260), () => eineWeile('sitzen', ['schaut'], 2400));
      }, { schreck: true });
    }
  }

  // Frech: sich neben einen Knopf setzen und ihn mit der Pfote antippen (ohne ihn auszulösen)
  function frech() {
    const knoepfe = sitzplaetze().filter((k) => k.querySelector('.btn-primary:not([hidden])'));
    if (!knoepfe.length) return putzen();
    zuSitzplatz(knoepfe[Math.floor(Math.random() * knoepfe.length)]);
    setTimeout(() => { if (!schlaeft && !aktion) eineWeile('tippen', ['tippt'], 4200); }, 2600);
  }

  // Was macht sie als Nächstes? Ein bisschen Zufall, wie bei echten Katzen
  function naechstes() {
    if (wahl === 'aus' || document.hidden) return plane();
    const still = Date.now() - letzteAktivitaet;
    if (still > 45000) { einschlafen(); return plane(); }
    if (schlaeft || aktion || blaettern) return plane();
    const r = Math.random();
    if (r < 0.04) frech();
    else if (r < 0.30) putzen();
    else if (r < 0.50) umschauen();
    else if (r < 0.78) {
      const plaetze = sitzplaetze().filter((k) => !(anker.art === 'ziel' && anker.el === k));
      if (plaetze.length && Math.random() < 0.7) zuSitzplatz(plaetze[Math.floor(Math.random() * plaetze.length)]);
      else if (anker.art === 'ziel') runterklettern();
      else laufeZu(freierBoden(zufall(40, window.innerWidth - breite - 40)));
    }
    plane();
  }
  let planer = null;
  function plane() { clearTimeout(planer); planer = setTimeout(naechstes, zufall(7000, 15000)); }

  // ---------- Reaktionen ----------
  function aktiv() {
    letzteAktivitaet = Date.now();
    if (schlaeft) aufwachen();
  }
  ['pointerdown', 'keydown', 'touchstart'].forEach((ev) => window.addEventListener(ev, aktiv, { passive: true }));

  // Beim Blättern läuft sie auf der Stelle mit – das sieht aus, als liefe sie neben der Seite her.
  // Hat sie länger gesessen, streckt sie sich zuerst und läuft dann langsam an – wie eine echte Katze.
  let letzteScroll = spur.scrollLeft;
  let streckBis = 0, zuletztUnterwegs = 0;
  spur.addEventListener('scroll', () => {
    if (wahl === 'aus' || ruhig.matches) return;
    const d = spur.scrollLeft - letzteScroll;
    letzteScroll = spur.scrollLeft;
    aktiv();
    if (anker.art === 'boden' && !aktion && !schlaeft && Math.abs(d) > 0.5) {
      const jetzt = performance.now();
      if (jetzt < streckBis) { /* streckt sich noch */ }
      else if (pose !== 'laufen' && jetzt - zuletztUnterwegs > 3000) {
        // Wie geht sie heute los? Jedes Mal ein bisschen anders – sonst wirkt es künstlich
        clearTimeout(besonders);
        blick(d > 0);
        const w = Math.random();
        if (w < 0.3) {                                  // ausgiebig strecken und gähnen
          setzePose('strecken');
          streckBis = jetzt + 850;
          zuletztUnterwegs = streckBis;
        } else if (w < 0.65) {                          // einfach gemütlich loslaufen
          setzePose('laufen', ['anlaufen']);
          setTimeout(() => el.classList.remove('anlaufen'), 700);
          zuletztUnterwegs = jetzt;
        } else if (w < 0.82) {                          // kleiner Hüpfer, dann los
          huepfen();
          zuletztUnterwegs = jetzt + 560;
          streckBis = jetzt + 560;
        } else {                                        // die „verrückten fünf Minuten“: hin und her rasen
          toben(d > 0 ? 1 : -1);
          zuletztUnterwegs = jetzt + 2000;
        }
      } else {
        clearTimeout(besonders);
        blick(d > 0);
        const neuLos = pose !== 'laufen';
        setzePose('laufen', neuLos ? ['anlaufen'] : (el.classList.contains('anlaufen') ? ['anlaufen'] : []));
        if (neuLos) setTimeout(() => el.classList.remove('anlaufen'), 700);
        zuletztUnterwegs = jetzt;
      }
    }
    clearTimeout(blaettern);
    const warten = Math.max(260, streckBis - performance.now() + 120);
    blaettern = setTimeout(() => {
      blaettern = null;
      if (anker.art === 'boden' && !aktion && !schlaeft) {
        setzePose('sitzen');
        // Kommt eine Karte ins Bild, hüpft sie manchmal gleich hinauf
        const plaetze = sitzplaetze();
        if (plaetze.length && Math.random() < 0.45) setTimeout(() => { if (!aktion && !schlaeft) zuSitzplatz(plaetze[Math.floor(Math.random() * plaetze.length)]); }, 500);
      }
    }, warten);
    wecken();
  }, { passive: true });

  // Quiz und Praxis – große Gefühle, aber zum Schmunzeln:
  // falsch → Buckel, Fell gesträubt, Ohren flach, „Pfff!“, dann demonstrativ den Rücken zudrehen und mit dem Schwanz peitschen
  // richtig → Freudensprung mit Drehung, Herzchen, schnelles Wedeln und Schnurren
  function empoeren() {
    clearTimeout(besonders);
    const t0 = performance.now();
    setzePose('buckel', ['faucht']);
    aktion = (jetzt) => {
      const z = jetzt - t0;
      const a = ankerPos() || { x: pos.x, y: bodenY() };
      pos.y = a.y; pos.x = a.x + (z < 900 ? Math.sin(z / 18) * 2.2 : 0);       // zittern vor Empörung
      const p = Math.min(1, z / 160);
      form(1 + 0.1 * p, 1 + 0.12 * p, 0);                                         // aufplustern
      if (z > 1300) {
        aktion = null; form(1, 1, 0);
        blick(el.classList.contains('links'));                                   // Rücken zudrehen
        eineWeile('sitzen', ['peitscht'], 2600);
        setTimeout(() => { if (!schlaeft && !aktion) blick(!el.classList.contains('links')); }, 2600);
      }
    };
    wecken();
  }
  function jubeln() {
    clearTimeout(besonders);
    const t0 = performance.now();
    setzePose('sitzen');
    aktion = (jetzt) => {
      const z = jetzt - t0;
      const a = ankerPos() || { x: pos.x, y: bodenY() };
      pos.x = a.x;
      if (z < 180) { const d = sanft(z / 180); form(1 + 0.1 * d, 1 - 0.18 * d, 0); pos.y = a.y; return; }   // ducken
      if (pose !== 'springen') setzePose('springen', ['jubelt']);
      const t = Math.min(1, (z - 180) / 620);
      pos.y = a.y - 4 * (hoehe * 0.85) * t * (1 - t);                             // hoher Freudensprung
      form(1, 1, -360 * sanft(t));                                                // mit einer ganzen Drehung
      if (t >= 1) {
        form(1, 1, 0);
        aktion = null;
        eineWeile('sitzen', ['freut', 'jubelt', 'schnurrt'], 2400);
      }
    };
    wecken();
  }
  document.addEventListener('click', (ev) => {
    const b = ev.target.closest && ev.target.closest('#qz-antworten button, #rs-antworten button');
    if (!b || wahl === 'aus' || ruhig.matches || schlaeft) return;
    if (aktion && !aktion.istFolge) return;
    folge = null;
    if (b.classList.contains('btn-danger')) empoeren();
    else if (b.classList.contains('btn-success')) jubeln();
  });

  // Anklicken mag sie nicht: beleidigt wegspringen
  el.addEventListener('click', (ev) => {
    if (ruhig.matches) return;
    aktiv();
    streichelt = false; lauert = false; jagdStart = 0; clearTimeout(streichelTimer);
    folgenEnde();
    jagdPause = Date.now() + 15000;
    clearTimeout(besonders);
    // weg vom Mauszeiger: kleiner Hüpfer, beleidigt ein Stück weggehen, irgendwo ungestört hinlegen
    const weg = (ev.clientX > pos.x + breite / 2) ? -1 : 1;
    const schmollen = () => {
      laufeZu(freierBoden(pos.x + weg * zufall(160, 320)), () => {
        blick(weg < 0);                                      // Rücken zum Mauszeiger
        eineWeile('schlafen', ['schmollt'], zufall(7000, 11000));
      });
    };
    if (anker.art === 'ziel') { springeZu({ art: 'boden', x: freierBoden(pos.x + weg * 70) }, schmollen); return; }
    // kleiner Hüpfer zur Seite
    const start = { x: pos.x, y: pos.y };
    const zielX = grenzeX(pos.x + weg * 60);
    const t0 = performance.now();
    blick(weg > 0);
    setzePose('springen');
    anker = { art: 'boden', x: zielX };
    aktion = (jetzt) => {
      const t = Math.min(1, (jetzt - t0) / 300);
      pos.x = start.x + (zielX - start.x) * t;
      pos.y = bodenY() - 4 * 26 * t * (1 - t);
      if (t >= 1) { aktion = null; setzePose('sitzen'); setTimeout(schmollen, 250); }
    };
    wecken();
  });

  // ---------- Spielen mit der Maus (nur am Computer) ----------
  const fein = window.matchMedia('(hover: hover) and (pointer: fine)');
  const maus = { x: -999, y: -999, t: 0 };
  let lauert = false, lauerSeit = 0, jagdStart = 0, jagdPause = 0, streichelt = false, streichelTimer = null, letzterSatz = 0;
  window.addEventListener('mousemove', (ev) => { maus.x = ev.clientX; maus.y = ev.clientY; maus.t = performance.now(); }, { passive: true });

  // Ist unter dem Mauszeiger etwas, das man bedienen will? Dann lässt sie einen in Ruhe.
  function ueberBedienung() {
    const e = document.elementFromPoint(maus.x, maus.y);
    return !!(e && !e.closest('.katze') && e.closest('a, button, input, textarea, select, label, summary, [role="button"], [contenteditable], .qz-antworten, .leiste, .kopf'));
  }
  function lauernStart() {
    lauert = true; lauerSeit = performance.now();
    zuletztUnterwegs = lauerSeit;
    if (!jagdStart) jagdStart = lauerSeit;
    clearTimeout(besonders);
    setzePose('lauern', ['lauert']);
  }
  function lauernEnde(pause) {
    if (!lauert) return;
    lauert = false; jagdStart = 0;
    if (pause) jagdPause = Date.now() + pause;
    if (!aktion && !schlaeft) setzePose('sitzen');
  }
  // Satz auf den Mauszeiger, Pfotenhieb, dann wieder lauern oder aufgeben
  function zuschnappen() {
    lauert = false;
    letzterSatz = performance.now();
    const zielX = freierBoden(maus.x - breite * (el.classList.contains('links') ? 0.25 : 0.75));
    const hoch = bodenY() + hoehe * 0.5 - maus.y;     // wie weit oben ist der Zeiger?
    const t0 = performance.now();
    const start = { x: pos.x, y: pos.y };
    blick(maus.x > pos.x + breite / 2);
    setzePose('springen');
    const sprungHoehe = Math.max(24, Math.min(hoehe * 1.4, hoch));
    anker = { art: 'boden', x: zielX };
    aktion = (jetzt) => {
      const t = Math.min(1, (jetzt - t0) / 380);
      pos.x = start.x + (zielX - start.x) * t;
      pos.y = bodenY() - 4 * sprungHoehe * t * (1 - t);
      form(1.08, 0.94, -12 * Math.sin(Math.PI * t));
      if (t >= 1) {
        form(1, 1, 0);
        aktion = null;
        eineWeile('tippen', ['tippt'], 700);           // Pfotenhieb
        setTimeout(() => { if (!schlaeft && !aktion) lauernStart(); }, 750);
      }
    };
    wecken();
  }
  // Hinterherschleichen oder -rennen: sanft dem Ziel folgen, das sich ständig ändern darf
  let folge = null;                        // { zielX, tempo }
  function folgen(zielX, tempo) {
    if (!folge) {
      folge = { zielX, tempo };
      let zuletzt = performance.now();
      const schritt = (jetzt) => {
        if (!folge) { aktion = null; return; }
        const dt = Math.min(0.05, (jetzt - zuletzt) / 1000); zuletzt = jetzt;
        const dx = grenzeX(folge.zielX) - pos.x;
        const v = Math.min(Math.abs(dx), folge.tempo * dt) * Math.sign(dx);
        pos.y = bodenY();
        if (Math.abs(dx) > 4) {
          pos.x += v;
          blick(dx > 0);
          setzePose('laufen', folge.tempo < 150 ? ['schleicht'] : []);
          form(folge.tempo < 150 ? 1.04 : 1, folge.tempo < 150 ? 0.9 : 1, 0);   // beim Schleichen geduckt
        } else {
          form(1, 1, 0);
          if (pose !== 'lauern') { lauerSeit = jetzt; setzePose('lauern', ['lauert']); }
        }
        anker = { art: 'boden', x: pos.x };
      };
      schritt.istFolge = true;
      aktion = schritt;
      wecken();
    } else { folge.zielX = zielX; folge.tempo = tempo; }
  }
  // Toben: ein paar Mal schnell hin und her rennen, mit kleinen Sprüngen beim Umdrehen
  function toben(richtung) {
    const start = pos.x;
    const punkte = [];
    let x = start, r = richtung;
    const n = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) { x = grenzeX(start + r * zufall(110, 220)); punkte.push(x); r = -r; }
    punkte.push(grenzeX(start + richtung * 30));
    let i = 0, von = pos.x, t0 = performance.now(), dauer = 0;
    const neu = () => { von = pos.x; t0 = performance.now(); dauer = Math.abs(punkte[i] - von) / 420 * 1000 + 80; blick(punkte[i] > von); setzePose('laufen'); };
    neu();
    aktion = (jetzt) => {
      const t = Math.min(1, (jetzt - t0) / dauer);
      pos.x = von + (punkte[i] - von) * sanft(t);
      pos.y = bodenY() - (t > 0.85 ? Math.sin((t - 0.85) / 0.15 * Math.PI) * 14 : 0);   // Hüpfer beim Wenden
      if (t >= 1) {
        i++;
        if (i >= punkte.length) { aktion = null; anker = { art: 'boden', x: pos.x }; setzePose('sitzen'); return; }
        neu();
      }
    };
    anker = { art: 'boden', x: pos.x };
    wecken();
  }
  function folgenEnde() { if (folge) { folge = null; aktion = null; form(1, 1, 0); } }

  let letzteMaus = { x: -999, y: -999, t: 0 }, mausTempo = 0, letzterHieb = 0, jagtBis = 0;
  function jagdTakt() {
    const jetzt = performance.now();
    // Mausgeschwindigkeit (Pixel pro Sekunde), geglättet
    const dtm = (jetzt - letzteMaus.t) / 1000;
    if (dtm > 0) { const v = Math.hypot(maus.x - letzteMaus.x, maus.y - letzteMaus.y) / dtm; mausTempo = mausTempo * 0.5 + Math.min(v, 3000) * 0.5; }
    letzteMaus = { x: maus.x, y: maus.y, t: jetzt };

    if (!fein.matches || wahl === 'aus' || ruhig.matches || schlaeft || document.hidden || streichelt) { folgenEnde(); if (lauert) lauernEnde(); return; }
    if ((aktion && !aktion.istFolge) || Date.now() < jagdPause) return;
    const cx = pos.x + breite / 2, cy = pos.y + hoehe * 0.65;
    const d = Math.hypot(maus.x - cx, maus.y - cy);
    const frisch = jetzt - maus.t < 2000;
    const erreichbar = maus.y > bodenY() - hoehe * 1.3 && maus.y < window.innerHeight - leisteHoehe() + 10;
    const spielt = lauert || folge;

    if (anker.art !== 'boden') { if (frisch && d < 300) blick(maus.x > cx); return; }   // auf einem Block: nur hinschauen
    if (!frisch || ueberBedienung() || (!erreichbar && d > 200) || d > (spielt ? 520 : 360)) {
      if (spielt && (!frisch || d > 520)) { folgenEnde(); lauernEnde(5000); }
      else if (folge) { folge.zielX = pos.x; }                                         // kurz innehalten
      return;
    }
    // nach längerem Spielen verliert sie das Interesse und tut so, als wäre nichts gewesen
    if (jagdStart && jetzt - jagdStart > 25000) { folgenEnde(); lauernEnde(14000); putzen(); return; }
    if (!spielt) { lauernStart(); return; }

    const nah = Math.abs(maus.x - cx) < breite * 0.75 && erreichbar;
    // Zuschnappen: wenn die Maus in Reichweite ist – auch in Bewegung, nach kurzem Fixieren
    if (nah && jetzt - lauerSeit > 450 && jetzt - letzterHieb > 1100) {
      folgenEnde(); letzterHieb = jetzt; zuschnappen(); return;
    }
    // Locken: langsame Maus → hinterherschleichen; schnelle Maus → hinterherrennen
    const abstand = maus.x > cx ? -breite * 0.55 : breite * 0.55;                      // knapp hinter der „Beute“ bleiben
    const ziel = maus.x - breite / 2 + abstand;
    if (mausTempo > 650) jagtBis = jetzt + 1500;                                       // Beute flieht: eine Weile volles Tempo
    if (jetzt < jagtBis || Math.abs(ziel - pos.x) > 260) folgen(ziel, handy.matches ? 220 : 320);
    else if (mausTempo > 25 || Math.abs(ziel - pos.x) > 60) folgen(ziel, 95);
    else if (folge) folge.zielX = pos.x;
  }
  setInterval(jagdTakt, 110);

  // Streicheln: langsam über die Katze fahren (ohne Klick) – sie schließt die Augen und schnurrt
  // Gestreichelt wird nur, wenn sich die Maus wirklich über sie bewegt – nicht, wenn sie gerade unter dem Zeiger gelandet ist
  let strich = 0, letzterPunkt = null;
  el.addEventListener('pointermove', (ev) => {
    if (ev.pointerType !== 'mouse' || schlaeft || aktion || streichelt) return;
    if (performance.now() - letzterSatz < 1800) return;
    if (letzterPunkt) strich += Math.hypot(ev.clientX - letzterPunkt.x, ev.clientY - letzterPunkt.y);
    letzterPunkt = { x: ev.clientX, y: ev.clientY };
    clearTimeout(streichelTimer);
    if (strich > 30) {
      streichelt = true; lauert = false; jagdStart = 0;
      clearTimeout(besonders);
      setzePose('sitzen', ['schnurrt']);
    }
  });
  el.addEventListener('pointerout', (ev) => {
    if (ev.pointerType !== 'mouse') return;
    strich = 0; letzterPunkt = null;
    clearTimeout(streichelTimer);
    if (streichelt) {
      streichelTimer = setTimeout(() => { streichelt = false; jagdPause = Date.now() + 5000; if (!aktion && !schlaeft) setzePose('sitzen'); }, 900);
    }
  });

  // ---------- Takt ----------
  let laeuft = false;
  function takt(jetzt) {
    laeuft = false;
    if (wahl === 'aus') return;
    if (aktion) aktion(jetzt);
    else {
      const a = ankerPos();
      if (!a) { aufDenBoden(); } // Sitzplatz weggescrollt oder Seite gewechselt: runterspringen
      else { pos.x = a.x; pos.y = a.y; }
    }
    zeichne();
    // weiterlaufen, solange sich etwas bewegt oder sie auf einer Karte sitzt (die beim Blättern mitwandert)
    if (aktion || anker.art === 'ziel' || blaettern) wecken();
  }
  function wecken() { if (!laeuft) { laeuft = true; requestAnimationFrame(takt); } }

  window.addEventListener('resize', () => { masse(); wecken(); });
  window.addEventListener('hashchange', () => {
    setTimeout(() => {
      if (anker.art === 'boden' && !aktion) { const x = freierBoden(anker.x); if (Math.abs(x - pos.x) > 6) laufeZu(x); }
      wecken();
    }, 120);
  });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) wecken(); });

  // ---------- Start ----------
  masse();
  anker = { art: 'boden', x: window.innerWidth - breite - (handy.matches ? 20 : 120) };
  setTimeout(() => { if (!aktion && anker.art === 'boden') anker.x = freierBoden(anker.x); wecken(); }, 400);
  const a = ankerPos();
  pos = { x: a.x, y: a.y };
  blick(false);
  setzePose('sitzen');
  zeichne();
  if (!ruhig.matches) plane();
  window.KATZE = { zustand: () => ({ lauert, folge: !!folge, pause: jagdPause - Date.now(), aktion: !!aktion, jagdStart, streichelt }), empoeren, jubeln, putzen, frech, einschlafen, aufwachen, erschrecken, zuSitzplatz, sitzplaetze, runterklettern };
})();
