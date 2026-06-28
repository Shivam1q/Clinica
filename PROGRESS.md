# Clinica — Build Progress Journal

My learning journal for building Clinica. The goal is not just tracking work,
but learning **how to break a real project into small, shippable chunks** so I
can repeat the rhythm on future projects.

How it is organized:
- **Week** = a heading with its Sunday-to-Saturday date range.
- **Task** = a numbered unit of work inside a week (not a calendar day — some
  tasks take an hour, some take two sittings).
- **Chunks** = the small steps a task was broken into.
- Keep "Done" honest — it should match reality, not the plan.

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

---

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

### Task 2 — Monorepo foundation

**Chunks**
- [x] Root `package.json` (private workspace root)
- [x] `pnpm-workspace.yaml` listing `client`, `server`, `packages/*`
- [x] Folder map with placeholder READMEs: `client/`, `server/`, `packages/types/`
- [x] `.gitignore` (node_modules, dist, .env, etc.)
- [x] `pnpm install` resolves the workspace (creates `pnpm-lock.yaml`)
- [ ] Commit + push

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

### Task 3 — Architecture diagram + README (next)

**Chunks**
- [ ] Draw the architecture (browser <-> Express <-> Postgres + Whisper/Claude)
- [ ] Flesh out the root `README.md` (vision, stack, folder map, diagram)
- [ ] Week 0 review + clean git history, push
- [ ] Write the Week 0 retro here

**Done**
-

**Learned**
-

**Blockers / questions**
-
