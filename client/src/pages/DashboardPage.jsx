import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { getPatients, createPatient } from "../api/patients";
import { getVisits, createVisit } from "../api/visits";
import { todaysAppointments } from "../data/mock";

const DashboardPage = () => {
  const [patients, setPatients] = useState([]);
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      setIsLoading(true);
      setError(null);

      try {
        const [patientData, visitData] = await Promise.all([
          getPatients(),
          getVisits(),
        ]);
        if (!cancelled) {
          setPatients(patientData);
          setVisits(visitData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Could not reach the API.");
          setPatients([]);
          setVisits([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleAddPatient = async (patient) => {
    const created = await createPatient(patient);
    setPatients((current) => [...current, created]);
    return created;
  };

  const handleAddVisit = async (visit) => {
    const created = await createVisit(visit);
    setVisits((current) => [created, ...current]);
    return created;
  };

  return (
    <Dashboard
      patients={patients}
      visits={visits}
      onAddPatient={handleAddPatient}
      onAddVisit={handleAddVisit}
      todaysAppointments={todaysAppointments}
      query={query}
      setQuery={setQuery}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default DashboardPage;
