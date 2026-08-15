import { useState } from "react";
import { useAppointments } from "../hooks/useAppointments";
import { useAuth } from "../hooks/useAuth";
import { useFilteredPatients } from "../hooks/useFilteredPatients";
import AppointmentRow from "./AppointmentRow";
import PatientCount from "./PatientCount";
import PatientForm from "./PatientForm";
import PatientList from "./PatientList";
import PatientTimeline from "./PatientTimeline";
import VisitNotePanel from "./VisitNotePanel";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [query, setQuery] = useState("");

  const {
    patients,
    filteredPatients,
    isLoading: patientsLoading,
    error: patientsError,
  } = useFilteredPatients(query);
  const {
    appointments,
    isLoading: appointmentsLoading,
    error: appointmentsError,
  } = useAppointments();

  const error = patientsError || appointmentsError;

  const handleLogout = async () => {
    await logout();
    window.location.replace("/login");
  };

  const handleSelectPatient = (id) => {
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
        <div>
          <h1>Clinica</h1>
          <p>
            {todayLabel}
            {user?.name ? ` · ${user.name}` : ""}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleLogout}
        >
          Log out
        </button>
      </header>

      <div className="dashboard-grid">
        <section className="dashboard-section">
          <h2>Today&apos;s schedule</h2>
          {appointmentsLoading ? (
            <p className="loading-state">Loading schedule…</p>
          ) : appointments.length === 0 ? (
            <p className="empty-state">No appointments on file.</p>
          ) : (
            appointments.map((appointment) => (
              <AppointmentRow key={appointment.id} appointment={appointment} />
            ))
          )}
        </section>

        <section className="dashboard-section">
          <div className="section-heading-row">
            <h2>Patients</h2>
            <PatientCount />
            <button
              type="button"
              className="btn"
              onClick={() => setShowAddForm((open) => !open)}
              disabled={patientsLoading}
            >
              {showAddForm ? "Hide form" : "Add patient"}
            </button>
          </div>

          {error ? (
            <p className="api-error" role="alert">
              {error.message || "Could not reach the API."}
            </p>
          ) : null}

          {showAddForm ? <PatientForm disabled={Boolean(error)} /> : null}

          {patientsLoading ? (
            <p className="loading-state">Loading patients…</p>
          ) : (
            <PatientList
              patients={filteredPatients}
              totalCount={patients.length}
              query={query}
              setQuery={setQuery}
              selectedPatientId={selectedPatientId}
              onSelectPatient={handleSelectPatient}
            />
          )}
        </section>
      </div>

      <PatientTimeline selectedPatientId={selectedPatientId} />
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
