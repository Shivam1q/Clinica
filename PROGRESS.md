# Clinica — Build Progress Journal

My journal for building Clinica. The goal is not just tracking work, but
learning **how to break a real project into small, shippable chunks** so I can
repeat the rhythm on future projects.

How it is organized:

- **Week** = a heading with its Sunday-to-Saturday date range.
- **Task** = a numbered unit of work inside a week (not a calendar day — some
  tasks take an hour, some take two sittings).
- **Chunks** = the small steps a task was broken into.
- Dividers: a heavy `═` rule separates **weeks**; a thin `---` rule separates
  **tasks**.
- Keep "Done" honest — it should match reality.

---

## Reusable task template (copy for each new task)

```
### Task N — <short title>

**Chunks**
- [ ] chunk
- [ ] chunk

**Done**
- what actually happened

**Learned**
- 1-3 takeaways in my own words

**Blockers / questions**
- anything that slowed me down
```

═══════════════════════════════════════════════════════════════════════

# Week 0 — Setup the Workbench (Sun 2026-06-28 → Sat 2026-07-04)

Goal: a working dev environment, a pnpm monorepo foundation pushed to GitHub,
and this journal — no app code yet.

### Task 1 — Environment + git/GitHub

**Chunks**

- [x] Install pnpm (via Homebrew, v11.9.0); verify `pnpm -v`
- [x] Confirm git identity (already set: Shivam Yadav)
- [x] Create a private GitHub repo `Clinica` (SSH)
- [x] `git init`, commit `PROGRESS.md`, connect remote, push to `origin/main`

**Done**

- pnpm installed and working.
- Repo live at `git@github.com:Shivam1q/Clinica.git`, `main` tracking `origin/main`.

**Learned**

- A GitHub "remote" and a local repo are separate things — they only link once
  `git remote add origin ...` runs. My first attempt looked done but had no
  `.git` in the folder, so the push had nothing to connect to.
- Always verify with `git status` / `git log` instead of assuming it worked.

**Blockers / questions**

- (resolved) "It looked done" but wasn't — verification caught it.

---

### Task 2 — Monorepo foundation

**Chunks**

- [x] Root `package.json` (private workspace root)
- [x] `pnpm-workspace.yaml` listing `client`, `server`, `packages/*`
- [x] Folder map with placeholder READMEs: `client/`, `server/`, `packages/types/`
- [x] `.gitignore` (node_modules, dist, .env, etc.)
- [x] `pnpm install` resolves the workspace (creates `pnpm-lock.yaml`)
- [x] Commit + push

**Done**

- Created all workspace files; `pnpm install` passes; lockfile generated.

**Learned**

- A filename typo is a silent failure: I made `packase.json` instead of
  `package.json`, so pnpm never saw a workspace root. Tools match exact names.
- YAML is whitespace-sensitive: `-"client"` is wrong; it must be `- "client"`
  (dash, space, value). The missing space caused
  "packages field is not an array" because the list was read as plain text.

**Blockers / questions**

- (resolved) Both bugs above.

---

### Task 3 — Architecture diagram + README

**Chunks**

- [x] Draw the architecture as a Mermaid flowchart (browser -> Express -> DB / AI / messaging)
- [x] Flesh out the root `README.md` (vision, V1 scope, stack, folder map, diagram)
- [x] Write the Week 0 retro (below)
- [x] Commit + push (closes Week 0)

**Done**

- Wrote a vendor-neutral architecture diagram: browser -> Express API (the hub),
  which fans out to PostgreSQL, Voice AI, AI Assistant, and Messaging.
- Built the root README around the diagram.

**Learned**

- The backbone rule: the browser never talks to the DB or AI directly — every
  request goes through the Express API, which routes to the right helper.
- In Mermaid, a node has an ID (before the brackets, invisible, used to wire
  arrows) and a label (inside `["..."]`, the text that renders). Reusing one ID
  (`API`) across lines keeps it a single shared box.
- There are two distinct AI steps, not one: voice -> text, then text -> structured note.

**Blockers / questions**

- (none)

---

### Week 0 — Retro

**What I shipped:** a pushed GitHub repo with a pnpm monorepo foundation
(`client/`, `server/`, `packages/types/`), root config files, a README with an
architecture diagram, and this journal.

**Biggest lessons:**

- Verify, don't assume — `git status`/`git log` catch "looks done but isn't."
- Tiny details fail silently: a filename typo (`packase.json`) and a missing
  YAML space (`-"client"`) each blocked a whole tool with a confusing error.
- Architecture before code: knowing Express is the hub makes everything later
  make sense.

**How I broke the work down:** 1 week -> 3 tasks -> small chunks per task. Each
chunk was one command or one file, verified before moving on. This is the
rhythm to reuse.

**Next up — Week 1:** build a static doctor dashboard with mock data in
`client/`. No backend yet.

═══════════════════════════════════════════════════════════════════════

# Week 1 — Static Doctor Dashboard (Sun 2026-06-28 → Sat 2026-07-04)

Goal: a clickable React + TypeScript app in `client/` showing fake patients —
a patient list, a patient card, and an empty visit-note form. All data lives in
component state. No backend, no styling framework yet.

### Task 1 — Scaffold the React app

**Chunks**

- [x] Scaffold Vite (react-ts) into `client/`
- [x] Confirm it joins the pnpm workspace (`pnpm install` at root)
- [x] Run the dev server and see it in the browser
- [x] Strip the Vite demo boilerplate down to a clean starting point

**Done**

- Scaffolded Vite 8 + React 19 + TypeScript into `client/` (chose ESLint, kept README).
- Dev server runs at `http://localhost:5173/`; cleaned `App.tsx`/`index.css`,
  removed demo assets, set the page title to "Clinica".

**Learned**

- The entry chain: `index.html` (has `#root`) -> `main.tsx` (mounts `<App />`)
  -> `App.tsx` (where I actually build). I only ever touch `App.tsx` and down.
- A linter (ESLint here) statically checks code for likely bugs/bad patterns
  without running it; chose ESLint over Oxlint for its mature React ecosystem.

**Blockers / questions**

- (none)

---

### Task 2 — Mock patients + patient list

**Chunks**

- [x] Define a `Patient` type (`types.ts`) and a `patients` mock array (`data/patients.ts`)
- [x] Build a `PatientCard` component (shows one patient)
- [x] Build a `PatientList` component (maps over patients -> cards)
- [x] Render the list from `App`
- [x] Commit + push

**Done**

- Created `Patient` type, 6 mock patients, `PatientCard`, and a prop-driven
  `PatientList`; `App` owns the data and passes it down. List renders.

**Learned**

- `.ts` vs `.tsx`: any file containing JSX must be `.tsx`. A component written
  in `.ts` threw a wall of errors because TS read `<div>` as a type assertion.
- Data flows DOWN via props. A child should receive data as a prop, not import
  it itself — that keeps it reusable and sets up lifting state later.
- Don't nest block components inside an `<h1>`: heading styles cascade onto
  everything (giant bold text) and it's invalid HTML. One `<h1>` per page.
- List items need a stable `key` so React can track them efficiently.

**Blockers / questions**

- (resolved) Bug 1: component saved as `.ts` not `.tsx`. Bug 2: `<PatientList>`
  nested inside `<h1>` made the whole list render huge.

---

### Task 3 — Select a patient + visit-note form

**Chunks**

- [x] Lift "selected patient" state into `App` with `useState`
- [x] Make `PatientCard`/`PatientList` clickable (pass a select handler down)
- [x] Build an empty `VisitNoteForm` (controlled inputs) for the selected patient
- [x] Commit + push

**Done**

- `App` owns `selected` state; clicking a card selects that patient (handler
  threaded App -> PatientList -> PatientCard).
- `VisitNoteForm` has 3 controlled textareas (complaint/diagnosis/treatment),
  a typed submit that mock-saves via `console.log` and resets the fields.
- Form renders only for the selected patient (conditional render).

**Learned**

- Lifting state up: when two components need the same state, put it in their
  common parent. Data flows DOWN as props, events flow UP via callback props.
- Controlled inputs: `value` + `onChange` make React state the single source of
  truth — which is what lets AI pre-fill these fields later (Week 6).
- Event typing: annotate the submit handler `React.FormEvent<HTMLFormElement>`;
  inline `onChange` handlers infer their event type automatically.
- `useState("")` infers `string` — only add a generic when inference can't
  (e.g. `useState<Patient | null>(null)`).
- `event.preventDefault()` stops the default full-page reload on form submit.

**Blockers / questions**

- (none)

---

### Task 4 — Polish & wrap

**Chunks**

- [ ] Two-panel flex layout (patient list + visit-note form) with light CSS
- [ ] Cleanups: link `<label>`s to textareas, delete leftover demo assets
- [ ] Rewrite `client/README.md`
- [ ] Final commit + Week 1 retro

**Done**

- Built a centered two-panel dashboard with flexbox (sidebar list + main form),
  card hover, styled form. Looks like a real product.
- Linked labels via `htmlFor`/`id`; removed `hero.png` and `icons.svg`.
- Rewrote the client README.

**Learned**

- Flexbox is the backbone of dashboard layout: `display: flex` + `flex` ratios
  arrange panels side by side.
- A ternary (`selected ? <Form/> : <hint/>`) renders an empty-state fallback
  instead of a blank panel.
- `htmlFor` is React's name for HTML's `for` (since `for` is reserved in JS);
  it links a label to its input so clicking the label focuses the field.

**Blockers / questions**

- (none)

---

## Week 1 — Retro

**What I shipped:** a clickable, static doctor dashboard in `client/` (React +
TypeScript, Vite) — a patient list of mock data, click-to-select, and an
editable complaint/diagnosis/treatment visit-note form. No backend.

**Biggest lessons:**

- `.ts` vs `.tsx`, and when TypeScript can infer a type vs when I must annotate
  (state, props, events).
- The core React pattern: data flows DOWN via props, events flow UP via callback
  props; shared state lives in the closest common parent ("lifting state up").
- Controlled inputs make state the source of truth — the foundation for AI
  pre-filling the note later.

**How I broke the work down:** scaffold the app -> model data + render the list
-> add interaction (selection) + the form -> polish + document. Each task ended
with a commit.

**Next up — Week 2:** wire the dashboard to a fake REST API (json-server) so it
reads/writes patients and visits over HTTP, with loading/error states and
notifications. The form skeleton from this week is where that plugs in.
