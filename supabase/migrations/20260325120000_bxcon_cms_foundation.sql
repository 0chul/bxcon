create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'content_kind') then
    create type public.content_kind as enum ('portfolio', 'insight', 'report', 'press');
  end if;

  if not exists (select 1 from pg_type where typname = 'publish_status') then
    create type public.publish_status as enum ('draft', 'published', 'archived');
  end if;

  if not exists (select 1 from pg_type where typname = 'admin_role') then
    create type public.admin_role as enum ('admin', 'editor');
  end if;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  display_name text,
  role public.admin_role not null default 'editor',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_bucket text not null default 'site-media',
  storage_path text not null unique,
  public_url text not null,
  alt_text text,
  caption text,
  mime_type text,
  width integer,
  height integer,
  visibility text not null default 'public',
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.content_entries (
  id uuid primary key default gen_random_uuid(),
  kind public.content_kind not null,
  slug text not null,
  title text not null,
  summary text not null,
  body_html text not null,
  status public.publish_status not null default 'draft',
  hero_media_id uuid references public.media_assets (id),
  og_media_id uuid references public.media_assets (id),
  seo_title text,
  seo_description text,
  author_name text,
  published_at date not null default current_date,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  featured boolean not null default false,
  tags text[] not null default '{}',
  related_service_slugs text[] not null default '{}',
  constraint content_entries_kind_slug_key unique (kind, slug)
);

create table if not exists public.portfolio_details (
  content_id uuid primary key references public.content_entries (id) on delete cascade,
  client_name text,
  industry text,
  project_start_date date,
  project_end_date date,
  outcomes jsonb not null default '[]'::jsonb
);

create table if not exists public.insight_details (
  content_id uuid primary key references public.content_entries (id) on delete cascade,
  reading_time_minutes integer,
  source_citation text
);

create table if not exists public.report_details (
  content_id uuid primary key references public.content_entries (id) on delete cascade,
  report_type text,
  download_url text
);

create table if not exists public.press_details (
  content_id uuid primary key references public.content_entries (id) on delete cascade,
  source_name text,
  source_url text,
  source_published_at date
);

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  consent_privacy boolean not null default false,
  status text not null default 'received',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  status text not null default 'subscribed',
  consent_at timestamptz not null default timezone('utc', now()),
  source text not null default 'website',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists content_entries_kind_status_published_idx
  on public.content_entries (kind, status, published_at desc);

create index if not exists content_entries_featured_idx
  on public.content_entries (featured)
  where featured = true;

create index if not exists newsletter_subscribers_status_idx
  on public.newsletter_subscribers (status);

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

create or replace function public.is_admin_or_editor()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('admin', 'editor')
  );
$$;

alter table public.profiles enable row level security;
alter table public.media_assets enable row level security;
alter table public.content_entries enable row level security;
alter table public.portfolio_details enable row level security;
alter table public.insight_details enable row level security;
alter table public.report_details enable row level security;
alter table public.press_details enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy "profiles admin manage" on public.profiles
for all
using (public.is_admin_or_editor())
with check (public.is_admin_or_editor());

create policy "media public read" on public.media_assets
for select
using (visibility = 'public');

create policy "media admin manage" on public.media_assets
for all
using (public.is_admin_or_editor())
with check (public.is_admin_or_editor());

create policy "published content read" on public.content_entries
for select
using (status = 'published');

create policy "content admin manage" on public.content_entries
for all
using (public.is_admin_or_editor())
with check (public.is_admin_or_editor());

create policy "portfolio details read" on public.portfolio_details
for select
using (exists (select 1 from public.content_entries where id = content_id and status = 'published'));

create policy "portfolio details admin manage" on public.portfolio_details
for all
using (public.is_admin_or_editor())
with check (public.is_admin_or_editor());

create policy "insight details read" on public.insight_details
for select
using (exists (select 1 from public.content_entries where id = content_id and status = 'published'));

create policy "insight details admin manage" on public.insight_details
for all
using (public.is_admin_or_editor())
with check (public.is_admin_or_editor());

create policy "report details read" on public.report_details
for select
using (exists (select 1 from public.content_entries where id = content_id and status = 'published'));

create policy "report details admin manage" on public.report_details
for all
using (public.is_admin_or_editor())
with check (public.is_admin_or_editor());

create policy "press details read" on public.press_details
for select
using (exists (select 1 from public.content_entries where id = content_id and status = 'published'));

create policy "press details admin manage" on public.press_details
for all
using (public.is_admin_or_editor())
with check (public.is_admin_or_editor());

create policy "contact admin only" on public.contact_inquiries
for all
using (public.is_admin_or_editor())
with check (public.is_admin_or_editor());

create policy "newsletter admin only" on public.newsletter_subscribers
for all
using (public.is_admin_or_editor())
with check (public.is_admin_or_editor());
