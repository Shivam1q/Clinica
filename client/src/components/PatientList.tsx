import type { Patient } from "../types";
import PatientCard from "./PatientCard";

interface PatientListProps {
  patients: Patient[];
  onSelect: (patient: Patient) => void;
}

const PatientList = ({ patients, onSelect }: PatientListProps) => {
  return (
    <div>
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default PatientList;
