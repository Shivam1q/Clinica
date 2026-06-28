import type { Patient } from "../types";

interface PatientCardProps {
  patient: Patient;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  return (
    <div className="patient-card">
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
