import { useState } from "react";
import Dashboard from "./components/Dashboard";
import { patients as seedPatients, todaysAppointments, visits } from "./data/mock";

const App = () => {
  const [patients, setPatients] = useState(seedPatients);
  const [query, setQuery] = useState("");

  const handleAddPatient = (patient) => {
    setPatients((current) => [...current, patient]);
  };

  return (
    <Dashboard
      patients={patients}
      onAddPatient={handleAddPatient}
      todaysAppointments={todaysAppointments}
      visits={visits}
      query={query}
      setQuery={setQuery}
    />
  );
};

export default App;
