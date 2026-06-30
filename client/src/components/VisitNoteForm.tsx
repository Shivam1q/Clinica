import { useState } from "react";
import type { Patient } from "../types";

interface VisitNoteFormProps {
  patient: Patient;
}

const VisitNoteForm = ({ patient }: VisitNoteFormProps) => {
  const [complaint, setComplaint] = useState<string>("");
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [treatment, setTreatment] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const note = { patientId: patient.id, complaint, diagnosis, treatment };
    console.log("Visit note saved (mock):", note);
    setComplaint("");
    setDiagnosis("");
    setTreatment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>New visit note for {patient.name}</h3>
      <div>
        <label>Complaint</label>
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />
      </div>
      <div>
        <label>Diagnosis</label>
        <textarea
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />
      </div>
      <div>
        <label>Treatment</label>
        <textarea
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
        />
      </div>
      <button type="submit">Save Note</button>
    </form>
  );
};

export default VisitNoteForm;
