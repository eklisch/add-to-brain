-- Add to Brain – Verbesserungsvorschläge
-- Einmal im Supabase-Dashboard unter "SQL Editor" einfügen und auf "Run" klicken.
-- Danach findest du alle Vorschläge unter "Table Editor" → "feedback".

-- 1. Tabelle für Vorschläge
create table if not exists public.feedback (
  id bigint generated always as identity primary key,
  erstellt timestamptz not null default now(),
  seite text,                       -- auf welcher Seite der Vorschlag geschickt wurde
  text text not null,               -- der Vorschlag selbst
  email text,                       -- nur, wenn die Person eine Antwort möchte
  bild text,                        -- optionales Bild (Screenshot), verkleinert als JPEG-Daten
  geraet text,                      -- Bildschirmgröße, hilft bei Darstellungsfehlern
  erledigt boolean not null default false,
  -- Schutz vor Missbrauch: Längen begrenzen
  constraint feedback_text_laenge check (char_length(text) between 3 and 3000),
  constraint feedback_email_laenge check (email is null or char_length(email) <= 200),
  constraint feedback_seite_laenge check (seite is null or char_length(seite) <= 200),
  constraint feedback_geraet_laenge check (geraet is null or char_length(geraet) <= 200),
  constraint feedback_bild_groesse check (bild is null or (char_length(bild) <= 700000 and bild like 'data:image/jpeg;base64,%'))
);

-- 2. Schutzregeln: Jede Person darf einen Vorschlag schicken, aber niemand kann Vorschläge lesen.
--    Lesen kannst nur du im Supabase-Dashboard.
alter table public.feedback enable row level security;

drop policy if exists "Vorschlag schicken" on public.feedback;
create policy "Vorschlag schicken" on public.feedback
  for insert to anon, authenticated
  with check (erledigt = false);

revoke all on public.feedback from anon, authenticated;
grant insert (seite, text, email, bild, geraet) on public.feedback to anon, authenticated;
