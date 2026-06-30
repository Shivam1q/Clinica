import { useState } from "react";
import type { Patient } from "./types";
import { patients } from "./data/patients";
import PatientList from "./components/PatientList";
import VisitNoteForm from "./components/VisitNoteForm";

const App = () => {
  const [selected, setSelected] = useState<Patient | null>(null);

  return (
    <div className="app">
      <header>
        <h1>Clinica</h1>
        <p>Doctor Dashboard - work in progress</p>
      </header>

      <div className="layout">
        <section className="sidebar">
          <h2>Patients</h2>
          <PatientList patients={patients} onSelect={setSelected} />
        </section>

        <section className="main">
          {selected ? (
            <VisitNoteForm patient={selected} />
          ) : (
            <p>Select a patient to start a visit note.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
