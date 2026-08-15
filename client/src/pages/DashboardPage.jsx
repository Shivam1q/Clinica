import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppointments } from "../hooks/useAppointments";
import { useFilteredPatients } from "../hooks/useFilteredPatients";
import AppointmentRow from "../components/AppointmentRow";
import PatientCount from "../components/PatientCount";
import PatientForm from "../components/PatientForm";
import PatientList from "../components/PatientList";

const DashboardPage = () => {
  const navigate = useNavigate();
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
  const upcoming = appointments.slice(0, 5);

  return (
    <main className="page">
      <header className="page-header">
        <h1>Dashboard</h1>
        <p>Today&apos;s patients and schedule.</p>
      </header>

      <div className="dashboard-grid">
        <section className="dashboard-section">
          <div className="section-heading-row">
            <h2>Today&apos;s schedule</h2>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/schedule")}
            >
              Open schedule
            </button>
          </div>
          {appointmentsLoading ? (
            <p className="loading-state">Loading schedule…</p>
          ) : upcoming.length === 0 ? (
            <p className="empty-state">No appointments on file.</p>
          ) : (
            upcoming.map((appointment) => (
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
              selectedPatientId={null}
              onSelectPatient={(id) => navigate(`/patients/${id}`)}
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;
