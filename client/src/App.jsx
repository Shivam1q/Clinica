import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import { getPatients, createPatient } from "./api/patients";
import { todaysAppointments, visits } from "./data/mock";

const App = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPatients() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getPatients();
        if (!cancelled) {
          setPatients(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message ||
              "Could not reach the API. Is json-server running?",
          );
          setPatients([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadPatients();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleAddPatient = async (patient) => {
    const created = await createPatient(patient);
    setPatients((current) => [...current, created]);
    return created;
  };

  return (
    <Dashboard
      patients={patients}
      onAddPatient={handleAddPatient}
      todaysAppointments={todaysAppointments}
      visits={visits}
      query={query}
      setQuery={setQuery}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default App;
