import Dashboard from "./components/Dashboard";
import { patients, todaysAppointments, visits } from "./data/mock";

const App = () => {
  return (
    <Dashboard patients={patients} todaysAppointments={todaysAppointments} visits={visits} />
  );
};

export default App;
