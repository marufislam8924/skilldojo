-- Run this in your Supabase SQL editor to create the vocabulary_progress table

create table if not exists public.vocabulary_progress (
  user_id uuid not null,
  word_id integer not null,
  correct_count integer not null default 0,
  next_review_date timestamptz,
  primary key (user_id, word_id)
);

create index if not exists idx_vocabulary_progress_user on public.vocabulary_progress (user_id);
