import { useState } from "react";
import type { Patient } from "../types";
import { createVisit } from "../services/visits";

interface VisitNoteFormProps {
  patient: Patient;
}

const VisitNoteForm = ({ patient }: VisitNoteFormProps) => {
  const [complaint, setComplaint] = useState<string>("");
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [treatment, setTreatment] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createVisit({
      patientId: patient.id,
      complaint,
      diagnosis,
      treatment,
      date: new Date().toISOString(),
    });
    setComplaint(""); setDiagnosis(""); setTreatment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>New visit note for {patient.name}</h3>
      <div>
        <label htmlFor="complaint">Complaint</label>
        <textarea
          id="complaint"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="diagnosis">Diagnosis</label>
        <textarea
          id="diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="treatment">Treatment</label>
        <textarea
          id="treatment"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
        />
      </div>
      <button type="submit">Save Note</button>
    </form>
  );
};

export default VisitNoteForm;
