// Add to Brain – horizontales Scrollen (Desktop) wie in einer Zeitung mit Spalten
// Mausrad nach unten = Inhalt nach rechts. Auf dem Handy (unter 768 px) normales Scrollen nach unten.
(function () {
  'use strict';
  const spur = document.getElementById('spur');
  const balken = document.getElementById('balken');
  const links = document.getElementById('pfeil-links');
  const rechts = document.getElementById('pfeil-rechts');
  const mobil = window.matchMedia('(max-width: 767px)');

  function horizontal() { return !mobil.matches; }

  // Kann das Element unter der Maus selbst senkrecht scrollen (z. B. ein langes Textfeld)? Dann nicht umlenken.
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

  spur.addEventListener('wheel', (ev) => {
    if (!horizontal() || ev.ctrlKey) return;
    if (Math.abs(ev.deltaX) > Math.abs(ev.deltaY)) return; // Touchpad seitwärts: Browser macht es selbst
    if (scrolltSelbst(ev.target, ev.deltaY)) return;
    ev.preventDefault();
    const faktor = ev.deltaMode === 1 ? 40 : ev.deltaMode === 2 ? spur.clientWidth : 1;
    spur.scrollLeft += ev.deltaY * faktor;
  }, { passive: false });

  function aktualisiere() {
    if (!horizontal()) {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      balken.style.width = (max > 0 ? h.scrollTop / max * 100 : 100) + '%';
      return;
    }
    const max = spur.scrollWidth - spur.clientWidth;
    balken.style.width = (max > 0 ? spur.scrollLeft / max * 100 : 100) + '%';
    links.disabled = spur.scrollLeft <= 2;
    rechts.disabled = spur.scrollLeft >= max - 2;
  }
  spur.addEventListener('scroll', aktualisiere, { passive: true });
  window.addEventListener('scroll', aktualisiere, { passive: true });
  window.addEventListener('resize', aktualisiere);
  new ResizeObserver(aktualisiere).observe(spur);
  new MutationObserver(() => requestAnimationFrame(aktualisiere)).observe(spur, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });

  const schritt = () => Math.round(spur.clientWidth * 0.8);
  links.addEventListener('click', () => spur.scrollBy({ left: -schritt(), behavior: 'smooth' }));
  rechts.addEventListener('click', () => spur.scrollBy({ left: schritt(), behavior: 'smooth' }));

  // Pfeiltasten nur, wenn man nicht gerade in einem Eingabefeld schreibt
  document.addEventListener('keydown', (ev) => {
    if (!horizontal() || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (ev.key === 'ArrowRight') { ev.preventDefault(); spur.scrollBy({ left: 120, behavior: 'smooth' }); }
    if (ev.key === 'ArrowLeft') { ev.preventDefault(); spur.scrollBy({ left: -120, behavior: 'smooth' }); }
  });

  window.SPUR = {
    anfang() { spur.scrollLeft = 0; window.scrollTo(0, 0); aktualisiere(); }
  };
  aktualisiere();
})();
