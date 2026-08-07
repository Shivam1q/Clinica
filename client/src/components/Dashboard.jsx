import PatientCard from "./PatientCard";
import AppointmentRow from "./AppointmentRow";
import VisitNotePanel from "./VisitNotePanel";

const Dashboard = ({ patients, todaysAppointments }) => {
  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Clinica</h1>
        <p>{todayLabel}</p>
      </header>

      <div className="dashboard-grid">
        <section className="dashboard-section">
          <h2>Today&apos;s schedule</h2>
          {todaysAppointments.map((appointment) => (
            <AppointmentRow key={appointment.id} appointment={appointment} />
          ))}
        </section>

        <section className="dashboard-section">
          <h2>Patients</h2>
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </section>
      </div>

      <VisitNotePanel />
    </main>
  );
};

export default Dashboard;
