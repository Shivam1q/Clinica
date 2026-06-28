import PatientList from "./components/PatientList";
import { patients } from "./data/patients";

const App = () => {
  return (
    <>
      <h1>Clinica</h1>
      <p>Doctor Dashboard - work in progress</p>
      <h2>Patients</h2>
      <PatientList patients={patients} />
    </>
  );
};

export default App;
