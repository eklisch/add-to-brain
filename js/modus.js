// Add to Brain – Hell / Dunkel umschalten
// Standard ist hell. Die Wahl wird nur in diesem Browser gemerkt (localStorage).
(function () {
  'use strict';
  const knopf = document.getElementById('modus');
  if (!knopf) return;
  const html = document.documentElement;

  function zeige() {
    const dunkel = html.classList.contains('dark');
    knopf.textContent = dunkel ? '☀' : '☾';
    const text = dunkel ? 'Hellen Modus einschalten' : 'Dunkelmodus einschalten';
    knopf.setAttribute('aria-label', text);
    knopf.title = text;
    knopf.setAttribute('aria-pressed', String(dunkel));
  }

  knopf.addEventListener('click', () => {
    const dunkel = html.classList.toggle('dark');
    try { localStorage.setItem('atb-modus', dunkel ? 'dunkel' : 'hell'); } catch (e) { /* ohne Speicher gilt die Wahl nur bis zum Neuladen */ }
    zeige();
  });
  zeige();
})();
