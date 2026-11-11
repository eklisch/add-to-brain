// Add to Brain – Anmeldung und Synchronisierung über Supabase (Serverstandort Frankfurt)
// Ohne zusätzliche Bibliothek: direkte Aufrufe der Supabase-Schnittstellen.
// Lernstand wird im Klartext gespeichert, das Tagebuch NUR verschlüsselt (AES-GCM, Schlüssel aus dem Tagebuch-Passwort).
(function () {
  'use strict';

  const CFG = {
    url: 'https://dqpcrhzqgqwqsmasbjxb.supabase.co',
    key: 'sb_publishable_CDg0OvAYwDvSr1kBhUVGdg_aK34q6ZB' // öffentlicher Schlüssel – darf in der Webseite stehen
  };
  const S_SITZUNG = 'addtobrain-sitzung';
  const S_TBKEY = 'addtobrain-tbschluessel';
  const $ = (id) => document.getElementById(id);

  // ---------- kleine Helfer ----------
  function lese(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function schreibe(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignorieren */ } }
  const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
  const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  function meldung(id, text, fehler) { const e = $(id); if (!e) return; e.textContent = text || ''; e.classList.toggle('fehler', !!fehler); }
  function uhrzeit(d) { return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }); }

  let sitzung = lese(S_SITZUNG);   // {access_token, refresh_token, expires_at, user:{id,email}}
  let tbSchluessel = null;          // CryptoKey für das Tagebuch
  let fernTagebuch = null;          // verschlüsselter Stand vom Server {salt, iv, daten}
  let letzteSync = null;
  let timer = null;
  let laeuft = false;

  async function api(pfad, opt = {}) {
    const headers = Object.assign({ apikey: CFG.key, 'Content-Type': 'application/json' }, opt.headers || {});
    if (opt.token) headers.Authorization = 'Bearer ' + opt.token;
    const r = await fetch(CFG.url + pfad, { method: opt.method || 'GET', headers, body: opt.body ? JSON.stringify(opt.body) : undefined });
    const text = await r.text();
    let json = null; try { json = text ? JSON.parse(text) : null; } catch (e) { json = null; }
    if (!r.ok) { const err = new Error((json && (json.msg || json.message || json.error_description || json.error)) || ('Fehler ' + r.status)); err.status = r.status; throw err; }
    return json;
  }

  // ---------- Anmeldung ----------
  function weiterleitungsAdresse() { return location.origin + location.pathname; }

  async function sendeLink(email) {
    await api('/auth/v1/otp?redirect_to=' + encodeURIComponent(weiterleitungsAdresse()), {
      method: 'POST', body: { email, create_user: true }
    });
  }

  // Nach dem Klick auf den Link in der E-Mail kommt man mit #access_token=… zurück
  async function linkAuswerten() {
    const h = location.hash.slice(1);
    if (!/access_token=|error_description=/.test(h)) return false;
    const p = new URLSearchParams(h);
    history.replaceState(null, '', location.pathname + '#konto');
    if (p.get('error_description')) { zeige(); meldung('ko-meldung', 'Anmeldung nicht möglich: ' + p.get('error_description').replace(/\+/g, ' ') + '. Bitte fordere einen neuen Link an.', true); return true; }
    const token = p.get('access_token');
    const user = await api('/auth/v1/user', { token });
    sitzung = {
      access_token: token,
      refresh_token: p.get('refresh_token'),
      expires_at: Math.floor(Date.now() / 1000) + parseInt(p.get('expires_in') || '3600', 10),
      user: { id: user.id, email: user.email }
    };
    schreibe(S_SITZUNG, sitzung);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await synchronisieren();
    return true;
  }

  async function token() {
    if (!sitzung) return null;
    if (sitzung.expires_at - 60 > Date.now() / 1000) return sitzung.access_token;
    try {
      const neu = await api('/auth/v1/token?grant_type=refresh_token', { method: 'POST', body: { refresh_token: sitzung.refresh_token } });
      sitzung = { access_token: neu.access_token, refresh_token: neu.refresh_token, expires_at: neu.expires_at || Math.floor(Date.now() / 1000) + (neu.expires_in || 3600), user: sitzung.user };
      schreibe(S_SITZUNG, sitzung);
      return sitzung.access_token;
    } catch (e) {
      if (e.status === 400 || e.status === 401 || e.status === 403) { sitzung = null; schreibe(S_SITZUNG, null); zeige(); }
      throw e;
    }
  }

  // ---------- Tagebuch verschlüsseln ----------
  async function schluesselAusPasswort(passwort, salt) {
    const basis = await crypto.subtle.importKey('raw', new TextEncoder().encode(passwort), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 310000, hash: 'SHA-256' }, basis, { name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
  }
  async function verschluesseln(obj, salt) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const daten = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, tbSchluessel, new TextEncoder().encode(JSON.stringify(obj)));
    return { salt: b64(salt), iv: b64(iv), daten: b64(daten) };
  }
  async function entschluesseln(paket, schluessel) {
    const klar = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(paket.iv) }, schluessel, unb64(paket.daten));
    return JSON.parse(new TextDecoder().decode(klar));
  }
  async function gespeichertenSchluesselLaden() {
    const s = lese(S_TBKEY);
    if (!s || !sitzung || s.user !== sitzung.user.id) return null;
    try { return await crypto.subtle.importKey('raw', unb64(s.key), { name: 'AES-GCM' }, true, ['encrypt', 'decrypt']); } catch (e) { return null; }
  }
  async function schluesselMerken(key, salt) {
    const raw = await crypto.subtle.exportKey('raw', key);
    schreibe(S_TBKEY, { user: sitzung.user.id, key: b64(raw), salt: b64(salt) });
  }

  // ---------- Daten zusammenführen (für mehrere Geräte) ----------
  function zusammenfuehren(lokal, fernLern, fernTb) {
    const L = window.ATB.leer();
    const a = Object.assign(window.ATB.leer(), lokal);
    const b = Object.assign({ kartei: {}, module: {}, eigeneBegriffe: [] }, fernLern || {});
    // Lernkartei: der zuletzt beantwortete Stand gewinnt
    const kartei = Object.assign({}, b.kartei);
    Object.entries(a.kartei).forEach(([id, k]) => {
      const f = kartei[id];
      if (!f || (k.zeit || 0) > (f.zeit || 0) || ((k.zeit || 0) === (f.zeit || 0) && k.fach > f.fach)) kartei[id] = k;
    });
    // Module: einmal bestanden bleibt bestanden
    const module = Object.assign({}, b.module);
    Object.entries(a.module).forEach(([id, m]) => {
      const f = module[id] || {};
      module[id] = { bestanden: !!(m.bestanden || f.bestanden), bestes: Math.max(m.bestes || 0, f.bestes || 0), datum: [m.datum, f.datum].filter(Boolean).sort().pop() };
    });
    // Eigene Begriffe und Tagebuch: zusammenlegen, neuere Fassung gewinnt
    function vereinen(x, y) {
      const m = new Map();
      [...(x || []), ...(y || [])].forEach((e) => { const f = m.get(e.id); if (!f || (e.geaendert || 0) > (f.geaendert || 0)) m.set(e.id, e); });
      return [...m.values()];
    }
    const geloescht = Object.assign({}, (fernTb && fernTb.geloescht) || {}, a.geloescht || {});
    let tagebuch = fernTb ? vereinen(a.tagebuch, fernTb.tagebuch) : a.tagebuch;
    tagebuch = tagebuch.filter((e) => !geloescht[e.id]);
    return Object.assign(L, a, { kartei, module, eigeneBegriffe: vereinen(a.eigeneBegriffe, b.eigeneBegriffe), tagebuch, geloescht });
  }

  // ---------- Synchronisieren ----------
  async function hochladen() {
    if (!sitzung) return;
    const d = window.ATB.daten;
    const zeile = {
      user_id: sitzung.user.id,
      lernstand: { kartei: d.kartei, module: d.module, eigeneBegriffe: d.eigeneBegriffe },
      aktualisiert: new Date().toISOString()
    };
    if (tbSchluessel) {
      const salt = unb64((lese(S_TBKEY) || {}).salt || (fernTagebuch && fernTagebuch.salt) || b64(crypto.getRandomValues(new Uint8Array(16))));
      zeile.tagebuch = await verschluesseln({ tagebuch: d.tagebuch, geloescht: d.geloescht }, salt);
      fernTagebuch = zeile.tagebuch;
    }
    await api('/rest/v1/nutzerdaten?on_conflict=user_id', {
      method: 'POST', token: await token(), body: zeile,
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }
    });
    letzteSync = new Date();
    status();
  }

  async function synchronisieren() {
    if (!sitzung || laeuft) return;
    laeuft = true;
    meldung('ko-sync', 'Synchronisiere …');
    try {
      const zeilen = await api('/rest/v1/nutzerdaten?select=lernstand,tagebuch,aktualisiert', { token: await token() });
      const zeile = zeilen && zeilen[0];
      fernTagebuch = zeile && zeile.tagebuch;
      tbSchluessel = await gespeichertenSchluesselLaden();
      let fernTb = null;
      if (fernTagebuch && tbSchluessel) {
        try { fernTb = await entschluesseln(fernTagebuch, tbSchluessel); } catch (e) { tbSchluessel = null; schreibe(S_TBKEY, null); }
      }
      window.ATB.ersetze(zusammenfuehren(window.ATB.daten, zeile && zeile.lernstand, fernTb));
      await hochladen();
    } catch (e) {
      meldung('ko-sync', 'Synchronisieren hat nicht geklappt: ' + e.message, true);
    } finally {
      laeuft = false;
      zeige();
    }
  }

  // Nach jeder Änderung: kurz warten, dann hochladen
  function geaendert() {
    if (!sitzung) return;
    clearTimeout(timer);
    timer = setTimeout(() => { hochladen().catch((e) => meldung('ko-sync', 'Hochladen hat nicht geklappt: ' + e.message, true)); }, 2000);
  }

  // ---------- Oberfläche ----------
  function status() {
    if (letzteSync) meldung('ko-sync', 'Zuletzt synchronisiert: ' + uhrzeit(letzteSync) + ' Uhr');
  }

  function zeige() {
    const drin = !!sitzung;
    if ($('ko-aus')) $('ko-aus').hidden = drin;
    if ($('ko-ein')) $('ko-ein').hidden = !drin;
    const link = $('leiste-konto');
    if (link) link.textContent = drin ? 'Mein Konto' : 'Anmelden';
    if (!drin) return;
    $('ko-email').textContent = sitzung.user.email;
    // Tagebuch-Schutz
    const aktiv = !!tbSchluessel;
    $('ko-tb-aktiv').hidden = !aktiv;
    $('ko-tb-neu').hidden = aktiv || !!fernTagebuch;
    $('ko-tb-entsperren').hidden = aktiv || !fernTagebuch;
    status();
  }

  // Anmelden
  $('ko-form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const email = $('ko-mail').value.trim();
    if (!$('ko-einwilligung').checked) { meldung('ko-meldung', 'Bitte setze zuerst das Häkchen bei der Einwilligung.', true); return; }
    const k = $('ko-senden'); k.disabled = true;
    meldung('ko-meldung', 'Einen Moment …');
    try {
      await sendeLink(email);
      meldung('ko-meldung', 'Fertig! Schau in dein Postfach (' + email + ') und klick auf den Link in der E-Mail. Danach bist du hier angemeldet. Die E-Mail kommt von Supabase – schau notfalls im Spam-Ordner nach.');
    } catch (e) {
      meldung('ko-meldung', 'Das hat nicht geklappt: ' + e.message, true);
    } finally { k.disabled = false; }
  });

  // Tagebuch-Passwort festlegen
  $('ko-tb-neu-form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const p1 = $('ko-pw1').value, p2 = $('ko-pw2').value;
    if (p1.length < 8) { meldung('ko-tb-meldung', 'Bitte mindestens 8 Zeichen.', true); return; }
    if (p1 !== p2) { meldung('ko-tb-meldung', 'Die beiden Passwörter stimmen nicht überein.', true); return; }
    if (!$('ko-pw-verstanden').checked) { meldung('ko-tb-meldung', 'Bitte bestätige, dass du dir das Passwort merkst.', true); return; }
    meldung('ko-tb-meldung', 'Schlüssel wird erzeugt …');
    const salt = crypto.getRandomValues(new Uint8Array(16));
    tbSchluessel = await schluesselAusPasswort(p1, salt);
    await schluesselMerken(tbSchluessel, salt);
    $('ko-tb-neu-form').reset();
    await hochladen().catch((e) => meldung('ko-tb-meldung', e.message, true));
    meldung('ko-tb-meldung', '');
    zeige();
  });

  // Tagebuch auf einem weiteren Gerät entsperren
  $('ko-tb-entsperren-form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    meldung('ko-tb-meldung2', 'Prüfe …');
    try {
      const salt = unb64(fernTagebuch.salt);
      const key = await schluesselAusPasswort($('ko-pw3').value, salt);
      await entschluesseln(fernTagebuch, key);   // wirft bei falschem Passwort
      await schluesselMerken(key, salt);
      $('ko-tb-entsperren-form').reset();
      meldung('ko-tb-meldung2', '');
      await synchronisieren();
    } catch (e) {
      meldung('ko-tb-meldung2', 'Das Passwort passt nicht. Versuch es noch einmal.', true);
    }
  });

  $('ko-jetzt').addEventListener('click', synchronisieren);

  async function abmelden(datenEntfernen) {
    clearTimeout(timer);
    try { if (sitzung) await api('/auth/v1/logout', { method: 'POST', token: sitzung.access_token }); } catch (e) { /* trotzdem abmelden */ }
    sitzung = null; tbSchluessel = null; fernTagebuch = null; letzteSync = null;
    schreibe(S_SITZUNG, null); schreibe(S_TBKEY, null);
    if (datenEntfernen) window.ATB.ersetze(window.ATB.leer());
    zeige();
    meldung('ko-meldung', datenEntfernen ? 'Abgemeldet. Deine Daten wurden von diesem Gerät entfernt – in deinem Konto sind sie weiter gespeichert.' : 'Abgemeldet.');
  }
  $('ko-abmelden').addEventListener('click', () => abmelden(false));
  $('ko-abmelden-entfernen').addEventListener('click', () => abmelden(true));

  $('ko-loeschen').addEventListener('click', async () => {
    const k = $('ko-loeschen');
    if (!k.dataset.sicher) { k.dataset.sicher = '1'; k.textContent = 'Wirklich endgültig löschen?'; return; }
    try {
      await api('/rest/v1/rpc/konto_loeschen', { method: 'POST', token: await token(), body: {} });
      sitzung = null; tbSchluessel = null; schreibe(S_SITZUNG, null); schreibe(S_TBKEY, null);
      k.dataset.sicher = ''; k.textContent = 'Konto löschen';
      zeige();
      meldung('ko-meldung', 'Dein Konto und alle gespeicherten Daten auf dem Server wurden gelöscht. Auf diesem Gerät ist dein Stand noch vorhanden.');
    } catch (e) { meldung('ko-sync', 'Löschen hat nicht geklappt: ' + e.message, true); }
  });

  window.KONTO = { zeige, geaendert, synchronisieren, _zusammenfuehren: zusammenfuehren };

  // Falls der Anmeldelink in einem bereits offenen Tab landet
  window.addEventListener('hashchange', () => {
    if (/access_token=|error_description=/.test(location.hash)) linkAuswerten().catch((e) => meldung('ko-meldung', 'Anmeldung nicht möglich: ' + e.message, true));
  });

  // Start
  (async () => {
    try {
      const warLink = await linkAuswerten();
      if (!warLink && sitzung) await synchronisieren();
    } catch (e) { meldung('ko-meldung', 'Anmeldung nicht möglich: ' + e.message, true); }
    zeige();
  })();
})();
