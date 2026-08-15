import { Link } from "react-router-dom";
import AppointmentRow from "../components/AppointmentRow";
import { useAppointments } from "../hooks/useAppointments";

const SchedulePage = () => {
  const { appointments, isLoading, error } = useAppointments();

  return (
    <main className="page">
      <header className="page-header">
        <h1>Schedule</h1>
        <p>All appointments on file.</p>
      </header>

      {error ? (
        <p className="api-error" role="alert">
          {error.message || "Could not load appointments."}
        </p>
      ) : null}

      {isLoading ? (
        <p className="loading-state">Loading schedule…</p>
      ) : appointments.length === 0 ? (
        <p className="empty-state">No appointments on file.</p>
      ) : (
        appointments.map((appointment) => (
          <AppointmentRow key={appointment.id} appointment={appointment} />
        ))
      )}

      <p className="page-footnote">
        <Link to="/dashboard">Back to dashboard</Link>
      </p>
    </main>
  );
};

export default SchedulePage;
