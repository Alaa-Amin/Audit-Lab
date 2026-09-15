-- Run this once in your Supabase project's SQL Editor (Supabase dashboard
-- > SQL Editor > New query > paste this > Run). It creates the one table
-- the app needs to remember each student's progress.

create table if not exists audit_lab_progress (
  student_id text primary key,
  case_id text not null default 'procurement-po-split',
  unlocked jsonb not null default '["po-1042","po-1043","po-1044","policy","vendor"]',
  messages jsonb not null default '{"ahmad": [], "fatima": []}',
  findings jsonb not null default '[]',
  verdict jsonb,
  updated_at timestamptz not null default now()
);

-- Row Level Security is left off for this table because the app talks to
-- Supabase only from the server (via the service role key in your Vercel
-- environment variables), never from the student's browser directly.
