-- Add to Brain – Datenbank einrichten
-- Einmal im Supabase-Dashboard unter "SQL Editor" einfügen und auf "Run" klicken.

-- 1. Tabelle: eine Zeile pro angemeldeter Person
create table if not exists public.nutzerdaten (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  lernstand jsonb not null default '{}'::jsonb,   -- Quiz, Module, eigene Begriffe
  tagebuch jsonb,                                  -- verschlüsselt: {salt, iv, daten} – nur mit dem Tagebuch-Passwort lesbar
  aktualisiert timestamptz not null default now()
);

-- 2. Schutzregeln (Row Level Security): jede Person sieht und ändert nur ihre eigene Zeile
alter table public.nutzerdaten enable row level security;

drop policy if exists "eigene Daten lesen" on public.nutzerdaten;
drop policy if exists "eigene Daten anlegen" on public.nutzerdaten;
drop policy if exists "eigene Daten ändern" on public.nutzerdaten;
drop policy if exists "eigene Daten löschen" on public.nutzerdaten;

create policy "eigene Daten lesen"   on public.nutzerdaten for select to authenticated using (auth.uid() = user_id);
create policy "eigene Daten anlegen" on public.nutzerdaten for insert to authenticated with check (auth.uid() = user_id);
create policy "eigene Daten ändern"  on public.nutzerdaten for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "eigene Daten löschen" on public.nutzerdaten for delete to authenticated using (auth.uid() = user_id);

-- 3. Rechte: nur angemeldete Personen dürfen auf die Tabelle zugreifen, Gäste gar nicht
revoke all on public.nutzerdaten from anon;
grant select, insert, update, delete on public.nutzerdaten to authenticated;

-- 4. Konto löschen: entfernt das Konto und (über "on delete cascade") alle Daten der Person
create or replace function public.konto_loeschen()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.konto_loeschen() from public, anon;
grant execute on function public.konto_loeschen() to authenticated;
