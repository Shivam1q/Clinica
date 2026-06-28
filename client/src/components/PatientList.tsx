import type { Patient } from "../types";
import PatientCard from "./PatientCard";

interface PatientListProps {
  patients: Patient[];
}

const PatientList = ({ patients }: PatientListProps) => {
  return (
    <div>
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  );
};

export default PatientList;