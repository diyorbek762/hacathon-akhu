# 03_PROJECT_STATE.md — Session Memory
> **Update this file manually at the start of each AI session and after every major milestone.**
> **Paste the full contents of this file into the AI's context window before any prompt.**
> **This file replaces the need for the AI to read chat history.**

---

## TECH STACK

> Define once when the hackathon category is revealed. Do not change unless absolutely necessary.

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Frontend Framework | [INSERT_FRAMEWORK_HERE] | [INSERT_VERSION] | e.g. React 18, Vue 3, Next.js 14 |
| Styling | [INSERT_STYLING_HERE] | — | e.g. Tailwind CSS 3, plain CSS |
| Backend Framework | [INSERT_FRAMEWORK_HERE] | [INSERT_VERSION] | e.g. Express 4, FastAPI, Hono |
| Database | [INSERT_DB_HERE] | — | e.g. SQLite, PostgreSQL, Supabase |
| ORM / Query | [INSERT_ORM_HERE] | — | e.g. Prisma, Drizzle, raw SQL |
| Auth | [INSERT_AUTH_HERE] | — | e.g. none, JWT, Clerk |
| Deployment Target | [INSERT_DEPLOY_HERE] | — | e.g. localhost only, Vercel, Railway |
| Package Manager | [INSERT_PM_HERE] | — | e.g. npm, pnpm, pip |

**Active AI Models:**
- Frontend generation: Qwen 3.6 Plus
- Backend logic: DeepSeek V4 Pro

---

## PROJECT IDENTITY

**App Name:** [INSERT_APP_NAME]
**One-line description:** [INSERT_DESCRIPTION]
**Hackathon Category:** [INSERT_CATEGORY]
**Core User Flow:** [describe the 1 thing a judge will click through during the demo]

---

## DIRECTORY STRUCTURE

> Fill in once project is scaffolded.

```
[INSERT_PROJECT_NAME]/
├── [frontend dir]/
│   ├── src/
│   │   ├── components/    ← UI components
│   │   ├── pages/         ← page-level views
│   │   └── ...
├── [backend dir]/
│   ├── routes/            ← API routes
│   ├── db/                ← schema + seed files
│   └── ...
└── 03_project_state.md    ← this file
```

---

## COMPLETED FEATURES

> Check off items as they are finished. Add items as they are decided.

- [ ] Project scaffolded and dev server running
- [ ] Database schema created
- [ ] Dummy data seeded
- [ ] [FEATURE 1: e.g. Landing page]
- [ ] [FEATURE 2: e.g. Dashboard view]
- [ ] [FEATURE 3: e.g. Create item form]
- [ ] [FEATURE 4: e.g. List/table view]
- [ ] [FEATURE 5: e.g. Detail/modal view]
- [ ] Frontend stubs connected to backend API
- [ ] End-to-end demo flow tested once
- [ ] App does not crash on happy path

---

## CURRENT OBJECTIVE

> One task at a time. Replace this when the task changes.

```
OBJECTIVE: [Describe exactly what you want the AI to build right now]

INPUTS AVAILABLE:
- Wireframe: [attached / described below / pending]
- Asset Menu: [attached / see below / pending]
- API contract: [defined / pending]

DONE WHEN: [One sentence — what does "done" look like for this task?]
```

---

## KNOWN BUGS — DO NOT FIX THESE NOW

> List bugs here to prevent the AI from rabbit-holing on them during a different task.

| Bug | Severity | Why We're Ignoring It |
|-----|----------|----------------------|
| [e.g. Form doesn't clear after submit] | Low | Doesn't affect demo flow |
| [e.g. Console error on page load] | Low | Non-blocking, cosmetic |
| [ADD MORE AS FOUND] | — | — |

---

## BLOCKED / DEFERRED

> Things we've decided to skip entirely for the MVP.

- [ ] [e.g. User authentication — using hardcoded user ID = 1]
- [ ] [e.g. Real-time updates — polling is fine for demo]
- [ ] [e.g. Mobile responsiveness — judged on desktop]

---

## DEMO SCRIPT (Fill in during final hour)

> The exact sequence of clicks a judge will see. Write this before the presentation.

1. [Step 1: e.g. Open app, landing page visible]
2. [Step 2: e.g. Click "Get Started", navigate to dashboard]
3. [Step 3: e.g. Create a new [item]]
4. [Step 4: e.g. See [item] appear in list]
5. [Step 5: e.g. Click [item] to see detail view]

**Danger zones** (steps most likely to break): [list them]
**Fallback plan if demo breaks:** [e.g. screenshot slideshow ready in pitch deck]

---

## TOKEN BUDGET TRACKING

> Update manually to avoid burning through AI limits.

| Session | Model | Estimated Tokens Used | Notes |
|---------|-------|----------------------|-------|
| Session 1 | Qwen 3.6 Plus | ~______ | UI scaffolding |
| Session 2 | DeepSeek V4 Pro | ~______ | Backend routes |
| Session 3 | — | ~______ | — |

**Tip:** If a session approaches 80k tokens, start a new session and paste this file fresh.
