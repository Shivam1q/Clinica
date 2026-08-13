import PatientCard from "./PatientCard";

const PatientList = ({
  patients,
  totalCount,
  query,
  setQuery,
  selectedPatientId,
  onSelectPatient,
}) => {
  return (
    <div className="patient-list">
      <label className="search-field" htmlFor="patient-search">
        <span className="search-label">Search</span>
        <input
          id="patient-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or phone"
        />
      </label>

      {patients.length === 0 ? (
        <p className="empty-state">
          {totalCount === 0
            ? "No patients yet. Add someone above."
            : "No matches for this search."}
        </p>
      ) : (
        patients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            handleClick={onSelectPatient}
            selectedPatientId={selectedPatientId}
          />
        ))
      )}
    </div>
  );
};

export default PatientList;
