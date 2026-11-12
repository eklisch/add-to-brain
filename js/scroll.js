// Add to Brain – horizontales Scrollen wie in einer Zeitung mit Spalten, auf allen Geräten
// Desktop: Mausrad nach unten = Inhalt nach rechts.
// Handy und Tablet: nach oben wischen (wie zum Runterscrollen) = Inhalt nach rechts.
// Auf dem Handy (unter 768 px) rastet jede Spalte bildschirmweise ein, wie Seiten in einem Buch.
(function () {
  'use strict';
  const spur = document.getElementById('spur');
  const balken = document.getElementById('balken');
  const links = document.getElementById('pfeil-links');
  const rechts = document.getElementById('pfeil-rechts');
  const handy = window.matchMedia('(max-width: 767px)');

  // Kann das Element unter dem Finger/der Maus selbst senkrecht scrollen (z. B. ein langes Textfeld)? Dann nicht umlenken.
  function scrolltSelbst(el, dy) {
    while (el && el !== spur) {
      const st = getComputedStyle(el);
      if (/(auto|scroll)/.test(st.overflowY) && el.scrollHeight > el.clientHeight + 1) {
        if ((dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) || (dy < 0 && el.scrollTop > 0)) return true;
      }
      el = el.parentElement;
    }
    return false;
  }

  // ---------- Mausrad ----------
  spur.addEventListener('wheel', (ev) => {
    if (ev.ctrlKey) return;
    if (Math.abs(ev.deltaX) > Math.abs(ev.deltaY)) return; // Touchpad seitwärts: Browser macht es selbst
    if (scrolltSelbst(ev.target, ev.deltaY)) return;
    ev.preventDefault();
    const faktor = ev.deltaMode === 1 ? 40 : ev.deltaMode === 2 ? spur.clientWidth : 1;
    spur.scrollLeft += ev.deltaY * faktor;
  }, { passive: false });

  // ---------- Wischen auf Touch-Geräten ----------
  let wisch = null;     // laufende Wischbewegung
  let schwung = 0;      // Animation nach dem Loslassen (Tablet)

  function stoppeSchwung() { if (schwung) { cancelAnimationFrame(schwung); schwung = 0; } }

  spur.addEventListener('touchstart', (ev) => {
    stoppeSchwung();
    if (ev.touches.length !== 1) { wisch = null; return; }
    const t = ev.touches[0];
    wisch = { x: t.clientX, y: t.clientY, letzteX: t.clientX, letzteY: t.clientY, zeit: ev.timeStamp,
      start: spur.scrollLeft, achse: null, tempo: 0, ziel: ev.target };
  }, { passive: true });

  spur.addEventListener('touchmove', (ev) => {
    if (!wisch || ev.touches.length !== 1) return;
    const t = ev.touches[0];
    const dx = t.clientX - wisch.x;
    const dy = t.clientY - wisch.y;
    if (!wisch.achse) {
      if (Math.hypot(dx, dy) < 8) return; // erst ab ein paar Pixeln entscheiden, damit Tippen ein Tippen bleibt
      wisch.achse = Math.abs(dy) > Math.abs(dx) ? 'y' : 'x';
      // Ein langes Textfeld darf weiter selbst scrollen
      if (wisch.achse === 'y' && scrolltSelbst(wisch.ziel, -dy)) wisch.achse = 'eigen';
    }
    if (wisch.achse === 'eigen') return;
    ev.preventDefault();
    const schrittX = wisch.letzteX - t.clientX;
    const schrittY = wisch.letzteY - t.clientY;
    const weg = wisch.achse === 'y' ? schrittY : schrittX; // Finger nach oben oder nach links = weiter nach rechts
    spur.scrollLeft += weg;
    const dt = Math.max(1, ev.timeStamp - wisch.zeit);
    wisch.tempo = 0.8 * (weg / dt) + 0.2 * wisch.tempo; // Pixel pro Millisekunde, leicht geglättet
    wisch.letzteX = t.clientX; wisch.letzteY = t.clientY; wisch.zeit = ev.timeStamp;
  }, { passive: false });

  function wischEnde() {
    if (!wisch || !wisch.achse || wisch.achse === 'eigen') { wisch = null; return; }
    const { tempo, start } = wisch;
    wisch = null;
    const max = spur.scrollWidth - spur.clientWidth;
    if (handy.matches) {
      // Handy: zur nächsten ganzen Bildschirmseite einrasten
      const breite = spur.clientWidth;
      let seite = Math.round(spur.scrollLeft / breite);
      const startSeite = Math.round(start / breite);
      if (Math.abs(tempo) > 0.25 && seite === startSeite) seite += tempo > 0 ? 1 : -1;
      seite = Math.max(0, Math.min(seite, Math.ceil(max / breite)));
      spur.scrollTo({ left: Math.min(seite * breite, max), behavior: 'smooth' });
      return;
    }
    // Tablet: mit Schwung auslaufen lassen
    let v = tempo * 16;
    const lauf = () => {
      if (Math.abs(v) < 0.5) { schwung = 0; return; }
      spur.scrollLeft += v;
      v *= 0.94;
      schwung = requestAnimationFrame(lauf);
    };
    schwung = requestAnimationFrame(lauf);
  }
  spur.addEventListener('touchend', wischEnde);
  spur.addEventListener('touchcancel', wischEnde);

  // ---------- Fortschritt und Pfeile ----------
  function aktualisiere() {
    const max = spur.scrollWidth - spur.clientWidth;
    balken.style.width = (max > 0 ? spur.scrollLeft / max * 100 : 100) + '%';
    links.disabled = spur.scrollLeft <= 2;
    rechts.disabled = spur.scrollLeft >= max - 2;
  }
  spur.addEventListener('scroll', aktualisiere, { passive: true });
  window.addEventListener('resize', aktualisiere);
  new ResizeObserver(aktualisiere).observe(spur);
  new MutationObserver(() => requestAnimationFrame(aktualisiere)).observe(spur, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });

  const schritt = () => Math.round(spur.clientWidth * (handy.matches ? 1 : 0.8));
  links.addEventListener('click', () => spur.scrollBy({ left: -schritt(), behavior: 'smooth' }));
  rechts.addEventListener('click', () => spur.scrollBy({ left: schritt(), behavior: 'smooth' }));

  // Pfeiltasten nur, wenn man nicht gerade in einem Eingabefeld schreibt
  document.addEventListener('keydown', (ev) => {
    if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (ev.key === 'ArrowRight') { ev.preventDefault(); spur.scrollBy({ left: 120, behavior: 'smooth' }); }
    if (ev.key === 'ArrowLeft') { ev.preventDefault(); spur.scrollBy({ left: -120, behavior: 'smooth' }); }
  });

  window.SPUR = {
    anfang() { stoppeSchwung(); spur.scrollLeft = 0; window.scrollTo(0, 0); aktualisiere(); }
  };
  aktualisiere();
})();
