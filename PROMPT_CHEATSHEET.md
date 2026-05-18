# PROMPT CHEATSHEET — Token-Efficient Prompts
> Copy-paste these. Fill in [BRACKETS]. Never write a prompt from scratch under time pressure.
> Rule: If your prompt is >3 sentences, it's too long. Cut it.

---

## SESSION OPENER (paste at top of EVERY new session)

```
[paste 00_global_rules.md]
[paste active module: 01_ui_module.md OR 02_logic_module.md]
STACK: [frontend framework] + [backend] + [db]
APP: [one sentence description]
CURRENT TASK: [one sentence]
```

Total: ~800 tokens for global rules + module + this header. Do not add more.

---

## SCAFFOLDING

```
Scaffold [React+Vite / Next.js / Vue+Vite]. Add Tailwind. Port 5173.
Show commands only, no explanation.
```

```
Scaffold Express+SQLite backend. Port 3001. ESM modules. 
Files: index.js, routes/, db/. Show commands only.
```

---

## SCHEMA + ROUTES

```
Create table [name] with fields: [field:type, field:type].
Output: CREATE TABLE sql, 5 INSERT rows, all 5 CRUD routes in Express.
Wrap every handler in try/catch. Return {ok:false} on error.
```

```
Add column [name] [type] to [table]. Output ALTER TABLE and update the GET route.
```

```
Seed [table] with 5 realistic rows. Domain: [app topic].
Output INSERT sql + sqlite3 run command.
```

---

## UI COMPONENTS

```
Build [ComponentName] in React+Tailwind.
Layout: [1-sentence description]
Colors: primary=[hex] bg=[hex] text=[hex]
Font: [name or "system"]
Data: hardcode [3-5 items describing what list/card shows]
Stubs: console.log for all handlers.
```

```
Style [ComponentName] to match: [description].
Only change CSS classes. Do not touch logic.
```

```
Add loading state to [ComponentName]. Show spinner while loading=true.
```

---

## CONNECTING FRONTEND TO BACKEND

```
Replace stub in [ComponentName] handleSubmit with:
POST http://localhost:3001/[resource]
Body: {[fields]}
On success: [what to do]
On error: show "[error message]" in red below the form.
```

```
Replace mock data in [ComponentName] with:
GET http://localhost:3001/[resource]
On load. Show spinner while fetching. Empty state: "[message]"
```

---

## BUG FIXES

```
Error: [paste exact error message]
File: [filename], line ~[number if known]
Fix only this. Do not refactor.
```

```
[ComponentName] shows undefined for [field].
Data shape from API: [paste one example object]
Fix the render only.
```

---

## QUICK TASKS (one-liners)

```
Add [field] to [table]. ALTER TABLE + update INSERT in seed file.
```

```
Make GET /[resource] filter by [field]=[value] when query param present.
```

```
Return empty array instead of 500 when [table] query fails in [route].
```

```
Center [ComponentName] vertically and horizontally on the page.
```

```
Add [field] to [ComponentName] form. Wire to existing handleSubmit body.
```

```
Make [ComponentName] list re-fetch after a new item is created.
```

---

## PITCH DECK COPY (give to Visionary)

```
Write 1 punchy headline (<8 words) for: [app name] that [does what].
Write 3 bullet points for "How it works" slide. Technical but simple.
Write "Next Steps" slide: 3 things we'd build with more time for [app concept].
```

---

## TOKEN EMERGENCY (when running low)

```
Summarize what we built so far in 5 bullets. Be technical and specific.
```
→ Paste that summary into `03_project_state.md` COMPLETED FEATURES, then start fresh session.

```
What is the minimum code needed to make [specific thing] work for a demo?
No edge cases. No validation. Just make it show data.
```

---

## ANTI-PATTERNS — NEVER SAY THESE (they waste tokens)

| Wasteful | Replace with |
|---------|-------------|
| "Can you help me with..." | Just state the task |
| "Please make sure to..." | Rules are in global_rules.md |
| "As discussed earlier..." | Paste state file instead |
| "What do you think about..." | You decide, then ask AI to implement |
| "Could you explain how..." | Only ask if it's blocking you |
| "Improve / refactor / clean up..." | Never during a sprint |
| Pasting 200+ lines of existing code | Paste only the relevant function |
