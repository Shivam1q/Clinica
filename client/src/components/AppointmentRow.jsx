const AppointmentRow = ({ appointment }) => {
  return (
    <article className="appointment-row">
      <h3>
        {appointment.time} — {appointment.patientName}
      </h3>
      <p>{appointment.reason}</p>
    </article>
  );
};

export default AppointmentRow;
