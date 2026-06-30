import type { Patient } from "../types";

interface PatientCardProps {
  patient: Patient;
  onSelect: (patient: Patient) => void;
}

const PatientCard = ({ patient, onSelect }: PatientCardProps) => {
  return (
    <div
      className="patient-card"
      onClick={() => onSelect(patient)}
      style={{ cursor: "pointer" }}
    >
      <h3>{patient.name}</h3>
      <p>
        {patient.age} yrs · {patient.sex}
      </p>
      <p>{patient.phone}</p>
      <p>Last visit: {patient.lastVisit ?? "No visits yet"}</p>
    </div>
  );
};

export default PatientCard;
