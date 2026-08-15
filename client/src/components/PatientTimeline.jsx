const formatVisitDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value ?? "");
  }
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const PatientTimeline = ({ patients, selectedPatientId, visits }) => {
  const patient = patients.find((p) => p.id === selectedPatientId);
  const notes = visits.filter((visit) => visit.patientId === selectedPatientId);

  return (
    <section className="patient-timeline">
      <h2>Patient timeline</h2>

      {!patient ? (
        <p className="empty-state">
          Select a patient to see their details here.
        </p>
      ) : (
        <>
          <div className="patient-meta">
            <h3>{patient.name}</h3>
            <p>Age {patient.age}</p>
            <p>{patient.phone}</p>
            <p>Last visit: {patient.lastVisit}</p>
          </div>

          <h3 className="timeline-subheading">Past visits</h3>
          {notes.length === 0 ? (
            <p className="empty-state">No past visits on file.</p>
          ) : (
            <ul className="visit-list">
              {notes.map((visit) => (
                <li key={visit.id}>
                  <span className="visit-date">{formatVisitDate(visit.date)}</span>
                  <span className="visit-summary">{visit.summary}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
};

export default PatientTimeline;
