-- Gamification tables for SkillDojo
-- Adds user_progress, user_stats, user_badges with per-user RLS policies.

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id integer not null,
  course_id text not null,
  completed_at timestamptz not null default now(),
  xp_earned integer not null default 0,
  constraint user_progress_xp_nonnegative check (xp_earned >= 0)
);

create table if not exists public.user_stats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  total_xp integer not null default 0,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_active_date date,
  level integer not null default 1,
  constraint user_stats_total_xp_nonnegative check (total_xp >= 0),
  constraint user_stats_current_streak_nonnegative check (current_streak >= 0),
  constraint user_stats_longest_streak_nonnegative check (longest_streak >= 0),
  constraint user_stats_level_positive check (level >= 1)
);

create table if not exists public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  badge_id text not null,
  earned_at timestamptz not null default now(),
  constraint user_badges_user_badge_unique unique (user_id, badge_id)
);

create index if not exists user_progress_user_id_idx on public.user_progress(user_id);
create index if not exists user_progress_course_lesson_idx on public.user_progress(course_id, lesson_id);
create index if not exists user_stats_user_id_idx on public.user_stats(user_id);
create index if not exists user_badges_user_id_idx on public.user_badges(user_id);

alter table public.user_progress enable row level security;
alter table public.user_stats enable row level security;
alter table public.user_badges enable row level security;

create policy "user_progress_select_own"
  on public.user_progress
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "user_progress_insert_own"
  on public.user_progress
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "user_progress_update_own"
  on public.user_progress
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user_progress_delete_own"
  on public.user_progress
  for delete
  to authenticated
  using (auth.uid() = user_id);

create policy "user_stats_select_own"
  on public.user_stats
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "user_stats_insert_own"
  on public.user_stats
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "user_stats_update_own"
  on public.user_stats
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user_stats_delete_own"
  on public.user_stats
  for delete
  to authenticated
  using (auth.uid() = user_id);

create policy "user_badges_select_own"
  on public.user_badges
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "user_badges_insert_own"
  on public.user_badges
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "user_badges_update_own"
  on public.user_badges
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user_badges_delete_own"
  on public.user_badges
  for delete
  to authenticated
  using (auth.uid() = user_id);
