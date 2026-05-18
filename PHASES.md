# StudyMatch — Build & Deploy Plan

**Stack:** Next.js (App Router) + Supabase (DB + Auth + Realtime) + Vercel

---

## Phase 0 — Project Scaffold

- Initialize Next.js 14 with App Router + TypeScript + Tailwind
- Copy existing `studymatch.html` design into reusable components
- Install deps: `@supabase/supabase-js`, `@supabase/ssr`
- Set up folder structure (`/app`, `/components`, `/lib`, `/types`)

## Phase 1 — Supabase Foundation

- Create Supabase project (user signs up at supabase.com)
- Write DB schema migration: `users`, `profiles`, `circles`, `circle_members`, `messages`, `matches`
- Set up Row Level Security (RLS) policies
- Create seed data (students, circles, messages)
- Initialize Supabase client in Next.js with server/client helpers

## Phase 2 — Auth & Layout

- Auth pages: `/sign-in`, `/sign-up`, `/auth/callback`
- Supabase SSR auth with middleware for protected routes
- Main app layout: nav bar (Discover | Circle | Messages | Profile)
- User avatar + dropdown in nav
- Route protection middleware

## Phase 3 — Core Pages

| Page | Route | Key Features |
|------|-------|-------------|
| **Landing** | `/` | Hero, stats, CTA → sign up |
| **Discover** | `/discover` | Student cards, filters (dept/course/goal/availability), match rings |
| **Profile** | `/profile` | About, interests, courses, goals, availability calendar, match styles, circle memberships |
| **Circle** | `/circle` | Browse/join circles; **click a circle → see its feed** (channel-style posts); creator can post; members can read & react |
| **Messages** | `/messages` | 1-on-1 DMs, conversation list, real-time chat via Supabase Realtime |

## Phase 4 — Realtime Messaging

- **Circle feeds:** Supabase Realtime subscription on `circle_messages` — new posts appear live to all members
- **1-on-1 DMs:** Realtime subscription on `messages` per conversation
- Online presence tracking via Realtime `presence` channel
- Read receipts (seen/unseen)
- Message input with Enter-to-send

## Phase 5 — Polish & Deploy

- Loading skeletons, error boundaries, empty states
- Responsive check (mobile-friendly nav)
- Environment variables for Vercel: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `vercel.json` config
- Deploy to Vercel via GitHub integration or `vercel` CLI

---

## DB Schema (Supabase)

**Tables:**
- `profiles` — id, username, full_name, avatar_url, university, department, bio, interests[], goals[]
- `circles` — id, name, description, icon, created_by (FK→profiles), created_at
- `circle_members` — id, circle_id, user_id, role ('admin'|'member'), joined_at
- `circle_messages` — id, circle_id, sender_id, content, created_at (Realtime subscribed)
- `messages` — id, sender_id, receiver_id, content, created_at, read_at (1-on-1 DMs)
- `matches` — id, user_id_1, user_id_2, match_score, matched_at
- `availability` — id, user_id, day_of_week, time_slot, status (free/busy/maybe)

**Auth:** Supabase Auth handles `users` table; `profiles` is synced via trigger.
