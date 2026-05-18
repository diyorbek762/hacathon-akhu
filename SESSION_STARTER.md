# SESSION STARTER — Minimal AI Context (~300 tokens)
# Paste this at the top of EVERY new OpenCode session.
# Fill in the [BRACKETS] before pasting. Takes 30 seconds.
# Full rules are in 00_global_rules.md — only paste that if the AI starts breaking rules.

---

## RULES (NON-NEGOTIABLE)
- Output only changed lines. Never rewrite entire files.
- Never install packages without asking first.
- No scope creep. No refactoring. Fix only what is asked.
- Wrap all route handlers in try/catch. Never crash on error.
- All shell commands must be Ubuntu/bash.

## STACK
Frontend: [e.g. React+Vite+Tailwind on :5173]
Backend: [e.g. Express+SQLite on :3001]
DB: [e.g. better-sqlite3, file: db/app.sqlite]

## APP
Name: [APP_NAME]
What it does: [one sentence]
Core demo flow: [e.g. User creates task → sees it in list → marks done]

## CURRENT TASK
[One sentence. What do you want built RIGHT NOW?]

## FILES THAT EXIST (so AI doesn't hallucinate new ones)
[List 3-5 relevant files, e.g:]
- src/components/TaskList.jsx — renders list, has MOCK DATA stub
- backend/routes/tasks.js — has all 5 CRUD routes
- backend/db/schema.sql — has tasks table

## KNOWN BUGS TO IGNORE
- [bug 1]
- [bug 2]

---
TASK: [Repeat your task here one more time, very specifically.]
