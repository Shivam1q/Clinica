import { Link } from "react-router-dom";

const AppointmentRow = ({ appointment }) => {
  const title = `${appointment.time} — ${appointment.patientName}`;

  return (
    <article className="appointment-row">
      <h3>
        {appointment.patientId ? (
          <Link to={`/patients/${appointment.patientId}`}>{title}</Link>
        ) : (
          title
        )}
      </h3>
      <p>{appointment.reason}</p>
    </article>
  );
};

export default AppointmentRow;
