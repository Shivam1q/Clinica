const PatientCard = ({ patient, handleClick, selectedPatientId }) => {
  const isSelected = selectedPatientId === patient.id;

  return (
    <article
      className={`patient-card${isSelected ? " is-selected" : ""}`}
      onClick={() => handleClick(patient.id)}
      aria-selected={isSelected}
    >
      <h3>{patient.name}</h3>
      <p className="patient-card-hint">Age {patient.age}</p>
    </article>
  );
};

export default PatientCard;
