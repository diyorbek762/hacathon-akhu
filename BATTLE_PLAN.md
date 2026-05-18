# HACKATHON BATTLE PLAN — AI Product Agency
> **4-Hour Sprint. Two Roles. One Demo.**
> Fill `[TOPIC]`, `[APP_NAME]`, and stack fields the moment the category drops.
> Everything else is pre-decided. Do not re-debate these during the sprint.

---

## TEAM ROLES (FROZEN — DO NOT REASSIGN)

| Role | Person | Tools | Owns |
|------|--------|-------|------|
| The Visionary | Partner | Figma/paper, AI image gen, Canva | Wireframes, Asset Menu, Pitch Deck |
| The AI Director | You | OpenCode + Qwen 3.6 Plus + DeepSeek V4 Pro | All code, all terminal commands |

**Handoff protocol:** Visionary produces → AI Director feeds to model → AI Director confirms → Visionary reviews.
Never swap roles mid-sprint. Never both work on the same layer at once.

---

## PHASE 0 — CATEGORY DROP (T-minus 0, ~15 min)

> The moment the topic is revealed, do this and only this.

**Visionary does (parallel):**
- [ ] Picks app concept in ≤5 minutes (use the Decision Matrix below)
- [ ] Starts rough wireframe for the 3 core screens
- [ ] Writes the one-sentence pitch: *"[APP_NAME] helps [WHO] do [WHAT] so they can [WHY]."*

**AI Director does (parallel):**
- [ ] Fills in all `[INSERT_X_HERE]` fields in `03_project_state.md`
- [ ] Runs `/hack-scaffold` to generate project skeleton
- [ ] Confirms dev server is running before moving on

**Exit condition:** Dev server is up. Wireframe exists for Screen 1. Move to Phase 1.

---

### CONCEPT DECISION MATRIX
> Pick the box that matches the hackathon topic. Do not overthink it.

| Topic Type | Default App Concept | Core Tables Needed |
|------------|--------------------|--------------------|
| Social / Community | Feed + Post + Like | `users`, `posts`, `likes` |
| Productivity / Tools | Dashboard + Task Manager | `users`, `tasks`, `tags` |
| Health / Wellness | Tracker + Log + Insights | `users`, `logs`, `goals` |
| Sustainability / Green | Submission + Score + Leaderboard | `users`, `submissions`, `scores` |
| Education / Learning | Course + Quiz + Progress | `users`, `courses`, `progress` |
| Finance / Commerce | Inventory + Order + Cart | `users`, `products`, `orders` |
| AI / Future Tech | Input → AI Process → Output display | `users`, `requests`, `results` |
| Open / Wild Card | Voting + Submission + Result | `users`, `submissions`, `votes` |

---

## PHASE 1 — FOUNDATION (T+0:00 to T+1:00)

**Goal: Running skeleton with real data in the DB.**

| # | Task | Owner | Slash Command | Done? |
|---|------|-------|--------------|-------|
| 1.1 | Scaffold full project structure | AI Director | `/hack-scaffold` | [ ] |
| 1.2 | Create DB schema for 2–3 core tables | AI Director | `/hack-route` | [ ] |
| 1.3 | Seed all tables with dummy data | AI Director | `/hack-seed` | [ ] |
| 1.4 | Wireframe: Screen 1 (Landing/Home) | Visionary | — | [ ] |
| 1.5 | Wireframe: Screen 2 (Core Action) | Visionary | — | [ ] |
| 1.6 | Wireframe: Screen 3 (Result/Dashboard) | Visionary | — | [ ] |
| 1.7 | Asset Menu v1 written (colors, fonts) | Visionary | — | [ ] |

**Phase 1 exit check:** `curl localhost:[PORT]/[resource]` returns real data.

---

## PHASE 2 — CORE BUILD (T+1:00 to T+2:30)

**Goal: The demo flow works end-to-end, even if it's ugly.**

| # | Task | Owner | Module | Done? |
|---|------|-------|--------|-------|
| 2.1 | Build Screen 1 from wireframe | AI Director | `01_ui_module` | [ ] |
| 2.2 | Build Screen 2 (core action) | AI Director | `01_ui_module` | [ ] |
| 2.3 | Build Screen 3 (result view) | AI Director | `01_ui_module` | [ ] |
| 2.4 | Wire all CRUD routes to UI stubs | AI Director | `02_logic_module` | [ ] |
| 2.5 | End-to-end happy path test (manual) | Both | `/hack-demo` | [ ] |
| 2.6 | Start pitch deck (problem slide) | Visionary | — | [ ] |

**Phase 2 exit check:** Walk through demo script once without it crashing.

---

## PHASE 3 — POLISH + PITCH (T+2:30 to T+3:30)

**Goal: It looks real and the pitch is ready.**

| # | Task | Owner | Done? |
|---|------|-------|-------|
| 3.1 | Apply final Asset Menu (real colors, logo, fonts) | AI Director | [ ] |
| 3.2 | Fix only crash-level bugs (see Known Bugs list) | AI Director | [ ] |
| 3.3 | Complete pitch deck (5 slides max — see template) | Visionary | [ ] |
| 3.4 | Run demo script 2× end-to-end | Both | [ ] |
| 3.5 | Identify demo danger zones, prepare talking points | Both | [ ] |

**PITCH DECK STRUCTURE (5 slides, Visionary owns):**
1. **Hook** — The problem in one image or stat
2. **Solution** — "[APP_NAME] is the [category] app that [does X]"
3. **Demo** → live or recorded GIF
4. **How it works** — 3-bullet tech stack + AI angle
5. **Impact / Next Steps** — what you'd build with more time

---

## PHASE 4 — LOCKDOWN (T+3:30 to T+4:00)

> No new features. No refactoring. Stabilize only.

| # | Task | Owner | Done? |
|---|------|-------|-------|
| 4.1 | Kill all console errors that show on screen | AI Director | [ ] |
| 4.2 | Ensure dummy data looks realistic and complete | AI Director | [ ] |
| 4.3 | Rehearse pitch with live demo once | Both | [ ] |
| 4.4 | Prepare screenshot fallback if demo dies | Visionary | [ ] |
| 4.5 | **STOP CODING** | Both | [ ] |

---

## DECISION RULES (Pre-decided — do not debate during sprint)

| Situation | Decision |
|-----------|----------|
| Feature would take >30 min | Cut it |
| Bug doesn't affect demo path | Ignore it, log in Known Bugs |
| Disagreement on design | Visionary wins |
| Disagreement on architecture | AI Director wins |
| AI is looping / hallucinating | Kill session, start new session with `03_project_state.md` |
| Approaching token limit | Start new AI session immediately, paste state file |
| Demo breaks 20 min before judging | Switch to screenshot fallback, stop debugging |
| Scope creep idea from either person | Write it in "Next Steps" slide, do not build it |

---

## TOKEN MANAGEMENT RULES

- Start a new AI session every 60–90 minutes regardless of context.
- Always open a session by pasting `00_global_rules.md` + active module + `03_project_state.md`.
- Keep prompts under 200 words. One task per prompt.
- If the AI outputs more than 100 lines unprompted, it's hallucinating — restart the session.

---

## EMERGENCY PROCEDURES

**"The backend is completely broken 1 hour before judging"**
→ Hardcode all data as JSON in the frontend. Remove all API calls. Demo runs as a static prototype.

**"We're way behind on UI"**
→ Use a pre-built template (shadcn, DaisyUI, Flowbite). Drop all custom styling. Ship functional over pretty.

**"We ran out of tokens on the AI model"**
→ Switch models temporarily. Fallback priority: GPT-4o → Gemini Flash → Claude Haiku.

**"The Visionary's wireframes aren't ready"**
→ AI Director builds a generic layout for the concept. Visionary overrides styling in Phase 3.

---

## POST-SPRINT DEBRIEF (Optional, 15 min after judging)
- What did the AI get right on first try?
- Where did we burn the most tokens?
- Which rule saved us the most time?
- Update the module files with improvements before the next hackathon.
