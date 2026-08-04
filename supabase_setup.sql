
-- ARGENTINA WORLD STORE — CONFIGURACIÓN SUPABASE
-- Ejecutar una sola vez en Supabase:
-- Dashboard → SQL Editor → New query → pegar → Run

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  email text not null default '',
  country text not null default '',
  province_state text not null default '',
  city text not null default '',
  postal_code text not null default '',
  street text not null default '',
  phone text not null default '',
  document_number text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles for insert
to authenticated
with check ((select auth.uid()) = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (
    id,
    first_name,
    last_name,
    email,
    country,
    province_state,
    city,
    postal_code,
    street,
    phone,
    document_number
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'country', ''),
    coalesce(new.raw_user_meta_data ->> 'province_state', ''),
    coalesce(new.raw_user_meta_data ->> 'city', ''),
    coalesce(new.raw_user_meta_data ->> 'postal_code', ''),
    coalesce(new.raw_user_meta_data ->> 'street', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    coalesce(new.raw_user_meta_data ->> 'document_number', '')
  )
  on conflict (id) do update set
    first_name = excluded.first_name,
    last_name = excluded.last_name,
    email = excluded.email,
    country = excluded.country,
    province_state = excluded.province_state,
    city = excluded.city,
    postal_code = excluded.postal_code,
    street = excluded.street,
    phone = excluded.phone,
    document_number = excluded.document_number,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert or update of raw_user_meta_data on auth.users
for each row execute procedure public.handle_new_user();

grant usage on schema public to authenticated;
grant select, insert, update on public.profiles to authenticated;
