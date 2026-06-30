import PatientList from "./components/PatientList";
import { patients } from "./data/patients";
import { useState } from "react";
import type { Patient } from "./types";
import VisitNoteForm from "./components/VisitNoteForm";

const App = () => {
  const [selected, setSelected] = useState<Patient | null>(null);
  return (
    <>
      <h1>Clinica</h1>
      <p>Doctor Dashboard - work in progress</p>
      <h2>Patients</h2>
      <PatientList patients={patients} onSelect={setSelected} />
      {selected && <VisitNoteForm patient={selected} />}
    </>
  );
};

export default App;
