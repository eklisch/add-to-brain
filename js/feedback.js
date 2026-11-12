// Add to Brain – Verbesserungsvorschläge von jeder Seite aus
// Öffnet ein kleines Fenster: Vorschlag, optional ein Bild (Screenshot oder Foto), optional E-Mail für eine Antwort.
// Gespeichert wird in der Supabase-Tabelle "feedback" (Serverstandort Frankfurt). Lesen kann nur die Betreiberin.
(function () {
  'use strict';

  const CFG = {
    url: 'https://dqpcrhzqgqwqsmasbjxb.supabase.co',
    key: 'sb_publishable_CDg0OvAYwDvSr1kBhUVGdg_aK34q6ZB' // öffentlicher Schlüssel – darf in der Webseite stehen
  };
  const MAX_BILD = 1400; // längste Bildkante in Pixeln nach dem Verkleinern

  // ---------- Aussehen (eigene Regeln, damit es auf allen Seiten gleich aussieht) ----------
  const css = `
  .fb-dialog { border: 2px solid var(--tinte, #41403e); border-radius: var(--rand, 16px); background: var(--weiss, #fffdf8); color: var(--tinte, #41403e);
    padding: 24px 26px; width: min(520px, calc(100vw - 24px)); max-height: calc(100dvh - 24px); overflow-y: auto; box-shadow: 10px 18px 28px -16px rgba(0,0,0,.4); }
  .fb-dialog::backdrop { background: rgba(40, 40, 38, .45); }
  .fb-dialog h2 { font-family: var(--kopf, 'Patrick Hand', cursive); font-weight: 400; font-size: 32px; line-height: 1.1; margin: 0 40px 6px 0; }
  .fb-dialog p, .fb-dialog label, .fb-dialog textarea, .fb-dialog input { font-family: var(--lesbar, var(--text, 'Nunito', system-ui, sans-serif)); font-size: 16px; }
  .fb-dialog .fb-leise { color: var(--grau, #7a766d); font-size: 14px; margin: 0 0 14px; line-height: 1.45; }
  .fb-dialog form { display: grid; gap: 12px; }
  .fb-dialog label { display: grid; gap: 4px; }
  .fb-dialog textarea, .fb-dialog input[type=email] { width: 100%; box-sizing: border-box; padding: 8px 10px; border: 2px solid var(--tinte, #41403e); border-radius: 6px;
    background: var(--weiss, #fffdf8); color: var(--tinte, #41403e); }
  .fb-dialog textarea { min-height: 110px; resize: vertical; }
  .fb-zeile { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
  .fb-haken { display: flex !important; gap: 8px; align-items: flex-start; grid-template-columns: none; }
  .fb-haken input { margin-top: 4px; }
  .fb-knopf { font-family: var(--kopf, 'Patrick Hand', cursive); font-size: 20px; padding: 6px 18px; border: 2px solid var(--tinte, #41403e); border-radius: var(--rand, 16px);
    background: var(--weiss, #fffdf8); color: var(--tinte, #41403e); cursor: pointer; margin: 0; }
  .fb-knopf.fb-haupt { background: var(--akzent, #2f6fb3); border-color: var(--akzent, #2f6fb3); color: var(--auf-akzent, #fff); }
  .fb-knopf[disabled] { opacity: .5; cursor: default; }
  .fb-zu { position: absolute; top: 12px; right: 16px; font-size: 28px; line-height: 1; background: none; border: 0; color: var(--tinte, #41403e); cursor: pointer; padding: 4px 8px; box-shadow: none; }
  .fb-vorschau { display: flex; gap: 10px; align-items: center; }
  .fb-vorschau img { max-width: 120px; max-height: 90px; border: 2px solid var(--tinte, #41403e); border-radius: 6px; }
  .fb-meldung { margin: 0; min-height: 1.2em; }
  .fb-meldung.fehler { color: var(--fehler, #a7342d); }
  .fb-meldung.ok { color: var(--richtig, #2d7a3e); }
  .fb-dialog [hidden] { display: none !important; }
  .fb-dialog { position: fixed; }
  `;
  const stil = document.createElement('style');
  stil.textContent = css;
  document.head.appendChild(stil);

  // ---------- Fenster ----------
  const d = document.createElement('dialog');
  d.className = 'fb-dialog';
  d.setAttribute('aria-labelledby', 'fb-titel');
  d.innerHTML = `
    <button type="button" class="fb-zu" aria-label="Schließen">×</button>
    <h2 id="fb-titel">Verbesserung vorschlagen</h2>
    <p class="fb-leise">Etwas funktioniert nicht, ist unklar oder fehlt? Schreib es mir. Jeder Hinweis hilft, Add to Brain besser zu machen.</p>
    <form id="fb-form" novalidate>
      <label>Dein Vorschlag
        <textarea id="fb-text" maxlength="3000" required placeholder="Zum Beispiel: Im Quiz ist mir aufgefallen, dass …"></textarea>
      </label>
      <div>
        <div class="fb-zeile">
          <label class="fb-knopf" for="fb-bild" style="display:inline-block">Bild anhängen</label>
          <input type="file" id="fb-bild" accept="image/*" hidden>
          <span class="fb-leise" style="margin:0">optional, z. B. ein Screenshot</span>
        </div>
        <div class="fb-vorschau" id="fb-vorschau" hidden>
          <img id="fb-vorschau-bild" alt="Vorschau des angehängten Bildes">
          <button type="button" class="fb-knopf" id="fb-bild-weg" style="font-size:16px;padding:2px 12px">Entfernen</button>
        </div>
        <p class="fb-leise" style="margin:6px 0 0">Tipp: Erst einen Screenshot machen (am PC Windows-Taste + Umschalt + S, am Handy meist zwei Tasten gleichzeitig), dann hier anhängen.</p>
      </div>
      <label class="fb-haken"><input type="checkbox" id="fb-antwort"> <span>Ich möchte eine Antwort per E-Mail.</span></label>
      <label id="fb-mail-feld" hidden>Deine E-Mail-Adresse
        <input type="email" id="fb-mail" maxlength="200" autocomplete="email">
      </label>
      <p class="fb-leise" style="margin:0">Dein Vorschlag wird mit der Seite, auf der du gerade bist, und der Bildschirmgröße gespeichert (Server in Frankfurt). Die E-Mail-Adresse nur, wenn du eine Antwort möchtest. Mehr in der <a href="datenschutz.html">Datenschutzerklärung</a>.</p>
      <div class="fb-zeile">
        <button type="submit" class="fb-knopf fb-haupt" id="fb-senden">Absenden</button>
        <button type="button" class="fb-knopf" id="fb-abbrechen">Abbrechen</button>
      </div>
      <p class="fb-meldung" id="fb-meldung" aria-live="polite"></p>
    </form>`;
  document.body.appendChild(d);

  const $ = (id) => document.getElementById(id);
  let bild = null; // verkleinertes Bild als data:image/jpeg

  function meldung(text, art) { const m = $('fb-meldung'); m.textContent = text || ''; m.className = 'fb-meldung' + (art ? ' ' + art : ''); }

  function oeffnen() {
    meldung('');
    // Angemeldet? Dann die E-Mail-Adresse vorschlagen
    try { const s = JSON.parse(localStorage.getItem('addtobrain-sitzung')); if (s && s.user && s.user.email && !$('fb-mail').value) $('fb-mail').value = s.user.email; } catch (e) { /* egal */ }
    if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
    setTimeout(() => $('fb-text').focus(), 50);
  }
  function schliessen() { if (d.open) d.close(); }

  d.querySelector('.fb-zu').addEventListener('click', schliessen);
  $('fb-abbrechen').addEventListener('click', schliessen);
  d.addEventListener('click', (ev) => { if (ev.target === d) schliessen(); }); // Klick daneben schließt
  $('fb-antwort').addEventListener('change', () => { $('fb-mail-feld').hidden = !$('fb-antwort').checked; if ($('fb-antwort').checked) $('fb-mail').focus(); });

  // Bild auswählen und verkleinern (spart Speicher und Ladezeit)
  $('fb-bild').addEventListener('change', () => {
    const datei = $('fb-bild').files && $('fb-bild').files[0];
    if (!datei) return;
    if (!/^image\//.test(datei.type)) { meldung('Bitte wähle ein Bild aus.', 'fehler'); return; }
    const leser = new FileReader();
    leser.onload = () => {
      const img = new Image();
      img.onload = () => {
        const f = Math.min(1, MAX_BILD / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * f); c.height = Math.round(img.height * f);
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        let q = 0.8;
        let daten = c.toDataURL('image/jpeg', q);
        while (daten.length > 650000 && q > 0.35) { q -= 0.1; daten = c.toDataURL('image/jpeg', q); }
        if (daten.length > 650000) { meldung('Das Bild ist leider zu groß. Probier einen kleineren Ausschnitt.', 'fehler'); return; }
        bild = daten;
        $('fb-vorschau-bild').src = bild;
        $('fb-vorschau').hidden = false;
        meldung('');
      };
      img.onerror = () => meldung('Das Bild konnte nicht gelesen werden.', 'fehler');
      img.src = leser.result;
    };
    leser.readAsDataURL(datei);
  });
  $('fb-bild-weg').addEventListener('click', () => { bild = null; $('fb-bild').value = ''; $('fb-vorschau').hidden = true; });

  function seite() {
    const name = (location.pathname.split('/').pop() || 'index.html') + (location.hash || '');
    return name.slice(0, 200);
  }

  $('fb-form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const text = $('fb-text').value.trim();
    const antwort = $('fb-antwort').checked;
    const email = $('fb-mail').value.trim();
    if (text.length < 3) { meldung('Bitte schreib kurz, worum es geht.', 'fehler'); $('fb-text').focus(); return; }
    if (antwort && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { meldung('Bitte gib eine gültige E-Mail-Adresse ein – oder nimm den Haken bei „Antwort“ raus.', 'fehler'); $('fb-mail').focus(); return; }
    const k = $('fb-senden'); k.disabled = true;
    meldung('Wird gesendet …');
    try {
      const r = await fetch(CFG.url + '/rest/v1/feedback', {
        method: 'POST',
        headers: { apikey: CFG.key, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({
          seite: seite(),
          text: text,
          email: antwort ? email : null,
          bild: bild,
          geraet: window.innerWidth + '×' + window.innerHeight + (matchMedia('(pointer: coarse)').matches ? ' Touch' : '')
        })
      });
      if (!r.ok) throw new Error('Fehler ' + r.status);
      $('fb-form').reset();
      bild = null; $('fb-vorschau').hidden = true; $('fb-mail-feld').hidden = true;
      meldung(antwort ? 'Danke! Dein Vorschlag ist angekommen. Du bekommst eine Antwort per E-Mail.' : 'Danke! Dein Vorschlag ist angekommen.', 'ok');
      setTimeout(schliessen, 2500);
    } catch (e) {
      meldung('Das Senden hat leider nicht geklappt (' + e.message + '). Probier es später noch einmal oder schreib an add-to-brain@web.de.', 'fehler');
    } finally { k.disabled = false; }
  });

  // Alle Links/Knöpfe mit data-feedback öffnen das Fenster
  document.addEventListener('click', (ev) => {
    const a = ev.target.closest && ev.target.closest('[data-feedback]');
    if (!a) return;
    ev.preventDefault();
    oeffnen();
  });

  window.FEEDBACK = { oeffnen };
})();
