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
