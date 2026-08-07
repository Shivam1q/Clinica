const PatientCard = ({ patient }) => {
  return (
    <article className="patient-card">
      <h3>{patient.name}</h3>
      <p>Age {patient.age}</p>
      <p>{patient.phone}</p>
      <p>Last visit: {patient.lastVisit}</p>
    </article>
  );
};

export default PatientCard;
