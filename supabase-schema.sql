-- Run this once in your Supabase project's SQL Editor (Supabase dashboard
-- > SQL Editor > New query > paste this > Run). It creates the one table
-- the app needs to remember each student's progress.

-- Run this in your Supabase project's SQL Editor. If you already created the
-- table before, run "drop table if exists audit_lab_progress;" first (only
-- safe to do with test data - it deletes any existing progress).

drop table if exists audit_lab_progress;

create table audit_lab_progress (
  student_id text not null,
  case_id text not null,
  unlocked jsonb not null default '[]',
  messages jsonb not null default '{}',
  findings jsonb not null default '[]',
  verdict jsonb,
  updated_at timestamptz not null default now(),
  primary key (student_id, case_id)
);

-- Row Level Security is left off for this table because the app talks to
-- Supabase only from the server (via the service role key in your Vercel
-- environment variables), never from the student's browser directly.
