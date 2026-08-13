import PatientCard from "./PatientCard";
import AppointmentRow from "./AppointmentRow";
import PatientTimeline from "./PatientTimeline";
import VisitNotePanel from "./VisitNotePanel";
import { useState } from "react";

const Dashboard = ({ patients, todaysAppointments, visits }) => {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  const handleClick = (id) => {
    setSelectedPatientId(id);
    setIsNoteOpen(false);
  };

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
            <PatientCard
              key={patient.id}
              patient={patient}
              handleClick={handleClick}
              selectedPatientId={selectedPatientId}
            />
          ))}
        </section>
      </div>

      <PatientTimeline selectedPatientId={selectedPatientId} patients={patients} visits={visits} />
      <VisitNotePanel
        selectedPatientId={selectedPatientId}
        isNoteOpen={isNoteOpen}
        onOpen={() => setIsNoteOpen(true)}
        onClose={() => setIsNoteOpen(false)}
      />
    </main>
  );
};

export default Dashboard;
