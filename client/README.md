# Clinica — Client

The React + TypeScript frontend for Clinica, built with Vite.

## Week 1 status

A static doctor dashboard (no backend yet):

- Patient list from mock data
- Click a patient to select them
- Editable visit-note form (complaint / diagnosis / treatment)

## Run

From the monorepo root:

```bash
pnpm --filter client dev
```

Opens at http://localhost:5173.

## Structure

```text
src/
  main.tsx            # entry: mounts <App> into index.html
  App.tsx             # root component; owns selected-patient state
  types.ts            # Patient type
  data/patients.ts    # mock patient data
  components/
    PatientList.tsx   # renders the list of patient cards
    PatientCard.tsx   # one patient; click to select
    VisitNoteForm.tsx # controlled form for the selected patient
  index.css           # styles
```
