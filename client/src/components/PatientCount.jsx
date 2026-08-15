import { usePatients } from "../hooks/usePatients";

const PatientCount = () => {
  const { patients, isLoading } = usePatients();

  if (isLoading) {
    return <span className="patient-count">…</span>;
  }

  return <span className="patient-count">{patients.length} on file</span>;
};

export default PatientCount;
