import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppointmentRow from "./AppointmentRow";
import PatientTimeline from "./PatientTimeline";
import VisitNotePanel from "./VisitNotePanel";
import PatientForm from "./PatientForm";
import PatientList from "./PatientList";

const Dashboard = ({
  patients,
  todaysAppointments,
  visits,
  onAddPatient,
  query,
  setQuery,
  isLoading,
  error,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredPatients = patients.filter((patient) => {
    if (!normalizedQuery) return true;
    const name = patient.name.toLowerCase();
    const phone = String(patient.phone);
    return name.includes(normalizedQuery) || phone.includes(normalizedQuery);
  });

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
          {todaysAppointments.map((appointment) => (
            <AppointmentRow key={appointment.id} appointment={appointment} />
          ))}
        </section>

        <section className="dashboard-section">
          <div className="section-heading-row">
            <h2>Patients</h2>
            <button
              type="button"
              className="btn"
              onClick={() => setShowAddForm((open) => !open)}
              disabled={isLoading}
            >
              {showAddForm ? "Hide form" : "Add patient"}
            </button>
          </div>

          {error ? (
            <p className="api-error" role="alert">
              {error}
            </p>
          ) : null}

          {showAddForm ? (
            <PatientForm onAddPatient={onAddPatient} disabled={Boolean(error)} />
          ) : null}

          {isLoading ? (
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

      <PatientTimeline
        selectedPatientId={selectedPatientId}
        patients={patients}
        visits={visits}
      />
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
