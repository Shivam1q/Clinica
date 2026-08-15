import { usePatientsQuery } from "../hooks/queries/usePatientsQuery";

const PatientCount = () => {
  const { data: patients = [], isPending } = usePatientsQuery();

  if (isPending) {
    return <span className="patient-count">…</span>;
  }

  return <span className="patient-count">{patients.length} on file</span>;
};

export default PatientCount;
