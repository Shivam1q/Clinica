import { useEffect, useState } from "react";
import type { Patient } from "./types";
import { getAllPatients } from "./services/patients";
import PatientList from "./components/PatientList";
import VisitNoteForm from "./components/VisitNoteForm";

const App = () => {
  const [selected, setSelected] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllPatients()
      .then((data) => setPatients(data))
      .catch(() => setError("Failed to load patients."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Clinica</h1>
        <p>Doctor Dashboard - work in progress</p>
      </header>

      <div className="layout">
        <section className="sidebar">
          <h2>Patients</h2>
          {loading && <p>Loading patients…</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && (
            <PatientList patients={patients} onSelect={setSelected} />
          )}
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
