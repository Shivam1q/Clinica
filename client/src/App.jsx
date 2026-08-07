import Dashboard from "./components/Dashboard";
import { patients, todaysAppointments } from "./data/mock";

const App = () => {
  return (
    <Dashboard patients={patients} todaysAppointments={todaysAppointments} />
  );
};

export default App;
