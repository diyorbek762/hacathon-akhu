# OPENCODE PLAYBOOK — Fixed Procedure, Any Topic
> **THIS IS YOUR ENTIRE HACKATHON IN ONE FILE.**
> Fill the Input Card once. Then execute steps 1–12 in order. Never skip. Never improvise.
> Start a NEW OpenCode session every 3 steps max. Paste the Session Header each time.

---

## ═══════════════════════════════════════════
## INPUT CARD — Fill this ONCE when topic drops
## ═══════════════════════════════════════════

```
TOPIC_TYPE   = _______________  (social | productivity | health | sustainability | education | finance | ai_product | wildcard)
APP_NAME     = _______________
ONE_LINER    = "[APP_NAME] helps [WHO] do [WHAT]"
SCHEMA_FILE  = schemas/_______.sql  (match your TOPIC_TYPE to filename)
DEMO_FLOW    = Step1 → Step2 → Step3 → Step4 → Step5
PRIMARY_HEX  = #______
SECONDARY_HEX= #______
```

**Time to fill: 2 minutes. Do not spend more.**

---

## ═══════════════════════════════════════════
## SESSION HEADER — Paste at top of EVERY new OpenCode session
## ═══════════════════════════════════════════

```
RULES: Output only changed lines. No full file rewrites. No installs without asking. No scope creep. Ubuntu bash only. Wrap all route handlers in try/except. Never crash on error.
STACK: React+Vite+Tailwind on :5173 | FastAPI+SQLite on :8000
APP: [APP_NAME] — [ONE_LINER]
CURRENT STEP: [paste the step number you're on, e.g. "Step 6"]
```

**~100 tokens. Copy this every time.**

---

## ═══════════════════════════════════════════
## THE 12 STEPS — Execute in order. No exceptions.
## ═══════════════════════════════════════════

---

## SESSION A: BACKEND (Steps 1–3)
> Start a new OpenCode session. Paste Session Header. Set CURRENT STEP: 1

---

### STEP 1 — Scaffold FastAPI Backend
**Time gate: 5 min**

**Paste this prompt:**
```
Create a FastAPI project in ./backend/ with this structure:
backend/
├── main.py        (FastAPI app, CORS enabled, imports routes)
├── database.py    (SQLite connection using sqlite3 stdlib, file: db.sqlite)
├── routes/        (empty dir, will add route files next)
└── db/
    ├── schema.sql (empty placeholder)
    └── seed.sql   (empty placeholder)

Port 8000. Add a GET /health that returns {"ok": true}.
Output the full files since they're new. Use only stdlib + fastapi + uvicorn.
```

**VERIFY:** `curl http://localhost:8000/health` returns `{"ok":true}`
**ABORT:** If it fails, run `pip install fastapi uvicorn` and try `uvicorn backend.main:app --port 8000`

---

### STEP 2 — Apply Pre-Written Schema
**Time gate: 3 min | ZERO AI TOKENS — you do this manually**

**Run these commands yourself (no AI needed):**
```bash
cp schemas/[YOUR_TOPIC_TYPE].sql backend/db/schema.sql
cd backend && python3 -c "
import sqlite3
conn = sqlite3.connect('db.sqlite')
with open('db/schema.sql') as f:
    conn.executescript(f.read())
conn.close()
print('Schema applied + data seeded')
"
```

**VERIFY:** `sqlite3 backend/db.sqlite "SELECT COUNT(*) FROM [first_table_name];"`  → shows 3-5 rows
**ABORT:** Check SQL syntax in your schema file. Run `sqlite3 backend/db.sqlite < backend/db/schema.sql` manually.

---

### STEP 3 — Generate All CRUD Routes
**Time gate: 10 min**

**Paste this prompt:**
```
[Paste Session Header]
CURRENT STEP: 3

Read backend/db/schema.sql. For EACH table (except users), create a route file in backend/routes/[table_name].py with:
- GET /[table] → list all (LIMIT 50)
- GET /[table]/{id} → get one
- POST /[table] → create (accept JSON body)
- PUT /[table]/{id} → update
- DELETE /[table]/{id} → delete

Rules:
- Use sqlite3 stdlib (import from database.py)
- Wrap every handler in try/except. On error return {"ok": false, "error": str(e)} with status 500.
- On empty result return {"ok": true, "data": []}
- Register all routers in main.py

Also create GET /users route (list only, no create/update/delete needed for demo).
```

**VERIFY:** `curl http://localhost:8000/[table_name]` returns `{"ok":true,"data":[...5 rows...]}`
**ABORT:** If route crashes, paste the exact error + file name and say "Fix only this error."

---

## SESSION B: FRONTEND SCAFFOLD (Steps 4–5)
> Start a new OpenCode session. Paste Session Header. Set CURRENT STEP: 4

---

### STEP 4 — Scaffold React+Vite+Tailwind
**Time gate: 5 min | MOSTLY MANUAL**

**Run yourself:**
```bash
cp -r skeletons/react-express ./frontend
cd frontend && npm install && npm install react-router-dom
npm run dev
```

If skeleton doesn't exist, paste this prompt:
```
[Session Header]
CURRENT STEP: 4
Scaffold React+Vite+Tailwind in ./frontend/. Add react-router-dom.
Show only the bash commands to run. Nothing else.
```

**VERIFY:** Open `http://localhost:5173` → see default Vite page
**ABORT:** If Tailwind not working, check `tailwind.config.js` has `content: ["./src/**/*.{js,jsx}"]`

---

### STEP 5 — Create Page Shells + Routing
**Time gate: 8 min**

**Paste this prompt:**
```
[Session Header]
CURRENT STEP: 5

In frontend/src, create:
1. App.jsx with React Router. 3 routes:
   - / → HomePage
   - /dashboard → DashboardPage  
   - /create → CreatePage

2. pages/HomePage.jsx → empty div with text "Home" + nav link to /dashboard
3. pages/DashboardPage.jsx → empty div with text "Dashboard" + nav link to /create  
4. pages/CreatePage.jsx → empty div with text "Create" + nav link to /dashboard

Each page is a placeholder. Just routing + navigation working.
All pages import from ../pages/[Name].jsx
```

**VERIFY:** Click through all 3 pages in browser. No crashes.
**ABORT:** If routing fails, check `main.jsx` wraps App in `<BrowserRouter>`.

---

## SESSION C: SCREEN BUILDS (Steps 6–8)
> Start a new OpenCode session. Paste Session Header. Set CURRENT STEP: 6
> **WAIT for your partner's design exports before starting this session.**

---

### STEP 6 — Adopt Partner's Screen 1 (Landing/Home)
**Time gate: 15 min**

**Paste this prompt:**
```
[Session Header]
CURRENT STEP: 6

Convert this exported design code into a React+Tailwind component.
Replace the content of pages/HomePage.jsx with this design.

RULES:
- Convert all class="" to className=""
- Convert all inline styles to Tailwind utility classes
- Keep all text, colors, and layout exactly as provided
- If it uses custom CSS, convert to Tailwind equivalents
- Add navigation: a button/link that goes to /dashboard using react-router Link
- If the design has images, use placeholder divs with bg-gray-200
- Do NOT change any visual design decisions

DESIGN CODE:
---
[PASTE YOUR PARTNER'S EXPORTED HTML/CSS HERE]
---
```

**VERIFY:** Browser shows the page looking like the design. Navigation to /dashboard works.
**ABORT:** If layout is broken, say: "The [specific element] is misaligned. Fix only the layout of that element."

---

### STEP 7 — Adopt Partner's Screen 2 (Core Action)
**Time gate: 20 min**

**Paste this prompt:**
```
[Session Header]
CURRENT STEP: 7

Convert this exported design code into a React+Tailwind component.
Replace the content of pages/DashboardPage.jsx with this design.

RULES:
- Convert all class="" to className=""
- Convert all inline styles to Tailwind utility classes
- Keep all text, colors, and layout exactly as provided
- For any list/table in the design: hardcode 3-5 rows of mock data as a const array
- For any buttons: add onClick={()=> console.log("[button_name] clicked")} 
- Add a Link to /create if the design has a "create/add/new" button
- Do NOT change any visual design decisions

DESIGN CODE:
---
[PASTE YOUR PARTNER'S EXPORTED HTML/CSS HERE]
---
```

**VERIFY:** Browser shows the page. Mock data visible. Buttons log to console.
**ABORT:** If the page has a list/table that needs real data, move to Step 9 early for this page only.

---

### STEP 8 — Adopt Partner's Screen 3 (Create/Detail)
**Time gate: 20 min**

**Paste this prompt:**
```
[Session Header]
CURRENT STEP: 8

Convert this exported design code into a React+Tailwind component.
Replace the content of pages/CreatePage.jsx with this design.

RULES:
- Convert all class="" to className=""
- Convert all inline styles to Tailwind utility classes
- Keep all text, colors, and layout exactly as provided
- If this is a form: make all inputs controlled (useState) and add onSubmit that console.log(formData)
- If this is a detail/view page: hardcode one example item as mock data
- After form submit: navigate to /dashboard using useNavigate()
- Do NOT change any visual design decisions

DESIGN CODE:
---
[PASTE YOUR PARTNER'S EXPORTED HTML/CSS HERE]
---
```

**VERIFY:** Form submits without crashing. Navigation works. Page looks like the design.
**ABORT:** If form is complex (5+ fields), say: "Simplify to only [list the 3 most important fields]. Ignore the rest."

---

## SESSION D: WIRING (Steps 9–10)
> Start a new OpenCode session. Paste Session Header. Set CURRENT STEP: 9

---

### STEP 9 — Connect Frontend to Backend API
**Time gate: 15 min**

**Paste this prompt:**
```
[Session Header]
CURRENT STEP: 9

Wire the frontend to the FastAPI backend at http://localhost:8000.

FILES TO MODIFY:
- pages/DashboardPage.jsx: Replace mock data array with useEffect fetch from GET /[table_name]. Show loading spinner while fetching. On error show empty state.
- pages/CreatePage.jsx: Replace console.log in onSubmit with POST /[table_name] using fetch(). On success navigate to /dashboard. On error show red text "[field] failed to save" below form.

RULES:
- Use native fetch(), no axios.
- Add a simple loading state: {loading && <div>Loading...</div>}
- Add a simple error state: {error && <p className="text-red-500">{error}</p>}
- Do NOT change layout or styling. Only replace data sources and form handlers.
- Backend returns {ok: bool, data: [...]} format.
```

**VERIFY:** Dashboard loads real data from DB. Form creates a new entry and it shows in the list.
**ABORT:** If CORS error: check backend main.py has `CORSMiddleware` with `allow_origins=["*"]`. If data shape mismatch: paste one API response and say "The API returns this shape: [paste]. Fix the frontend to match."

---

### STEP 10 — End-to-End Test + Fix Blockers Only
**Time gate: 10 min**

**Do this yourself first (no AI):**
1. Open browser → go to `/`
2. Navigate to `/dashboard` → data visible?
3. Navigate to `/create` → fill form → submit → redirected to `/dashboard`?
4. New item visible in list?

**If something is broken, paste this:**
```
[Session Header]
CURRENT STEP: 10

BUG: [describe what broke in ONE sentence]
ERROR: [paste exact error from console or terminal]
FILE: [which file you think is broken]
Fix only this. No other changes.
```

**VERIFY:** The 4-step demo flow above works without crashing.
**ABORT:** If more than 2 bugs, fix only the one that blocks the demo flow. Add others to Known Bugs list.

---

## SESSION E: POLISH (Steps 11–12)
> Start a new OpenCode session. Paste Session Header. Set CURRENT STEP: 11
> **Only enter this session if time remaining > 45 min**

---

### STEP 11 — Apply Final Assets
**Time gate: 10 min**

**Paste this prompt:**
```
[Session Header]
CURRENT STEP: 11

Apply these branding changes across ALL pages (HomePage, DashboardPage, CreatePage):
- Replace all indigo/blue colors with primary: [PRIMARY_HEX] and secondary: [SECONDARY_HEX]
- App name displayed in navbar/header: "[APP_NAME]"
- If there's a tagline spot: "[ONE_LINER]"

Only change color classes and text content. Do not restructure any layout.
Use Tailwind arbitrary values: bg-[#hexcode] text-[#hexcode]
```

**VERIFY:** App looks branded. Colors match. Name visible.
**ABORT:** If colors look wrong, just leave default indigo. Don't waste time on exact shades.

---

### STEP 12 — Final Demo Check → STOP
**Time gate: 5 min**

**Do this yourself (no AI needed):**
```
DEMO CHECKLIST:
[ ] App loads without console errors showing on screen
[ ] / (home) → looks like design, has CTA button
[ ] /dashboard → shows real data from database  
[ ] /create → form works, creates entry
[ ] New entry appears in /dashboard after creation
[ ] No "undefined", "null", or "[object Object]" visible anywhere
[ ] App name + colors are applied
```

**If all pass: STOP CODING. Help partner with pitch.**
**If 1–2 fail:** Use Step 10 bug fix prompt for each. Max 5 minutes per bug.
**If 3+ fail:** Switch to screenshot fallback. Stop debugging.

---

## ═══════════════════════════════════════════
## DESIGN ADOPTION PROTOCOL — Use anytime partner gives you new code
## ═══════════════════════════════════════════

> Your partner may hand you code at ANY point. Use this universal prompt template:

```
[Session Header]
CURRENT STEP: [whichever step you're on]

Convert this design export into a React+Tailwind component.
Target file: [path — e.g. src/pages/DashboardPage.jsx or src/components/Card.jsx]

RULES:
- class="" → className=""
- Inline style → Tailwind utility class
- Keep ALL visual decisions (colors, spacing, fonts) exactly as given
- Images → <div className="bg-gray-200 w-full h-48 rounded" /> placeholder
- Links → React Router <Link to="/[path]">
- Forms → controlled inputs with useState + onSubmit console.log
- Do NOT add features, logic, or styling not in the export

DESIGN CODE:
---
[PASTE CODE HERE]
---
```

---

## ═══════════════════════════════════════════
## EMERGENCY PROMPTS — When things go wrong
## ═══════════════════════════════════════════

### "Backend is broken and I'm out of time"
```
[Session Header]
EMERGENCY: Remove all fetch() calls from DashboardPage.jsx and CreatePage.jsx.
Replace with hardcoded mock data arrays (5 items each, realistic for [APP_NAME]).
Make form onSubmit just navigate to /dashboard without saving.
The app must render without any network calls.
```

### "Design export is too complex to convert"
```
[Session Header]
EMERGENCY: Ignore the design. Build a minimal version of [PAGE_NAME] with:
- A heading "[PAGE PURPOSE]"
- [Describe the 2-3 essential elements: list/form/buttons]
- Use Tailwind defaults. White bg, gray borders, indigo buttons.
Keep it under 50 lines.
```

### "AI is hallucinating / generating garbage"
**Do NOT prompt again.** Kill the session immediately.
Start a new session. Paste Session Header. Paste ONLY the one task that failed.
If it fails twice: skip that step, move to next step, come back later.

---

## ═══════════════════════════════════════════
## TIME TRACKER — Update manually every 30 min
## ═══════════════════════════════════════════

```
START TIME:    __:__
CURRENT TIME:  __:__
ELAPSED:       __h __m
REMAINING:     __h __m

RULE:
- If remaining < 1h30m: skip Step 11 (polish). Go straight to Step 12.
- If remaining < 45m: STOP CODING. Run Step 12 checklist. Help with pitch.
- If remaining < 20m: Screenshot fallback. DO NOT touch code.
```

---

## ═══════════════════════════════════════════
## TOKEN TRACKING — Mark after each session
## ═══════════════════════════════════════════

```
SESSION A (backend):    ✓/✗  Steps completed: __/3
SESSION B (scaffold):   ✓/✗  Steps completed: __/2
SESSION C (screens):    ✓/✗  Steps completed: __/3
SESSION D (wiring):     ✓/✗  Steps completed: __/2
SESSION E (polish):     ✓/✗  Steps completed: __/2

TOTAL STEPS DONE: __/12
SESSIONS USED: __/5
```
