import { useState } from "react";
import { useParams } from "react-router-dom";
import PatientTimeline from "../components/PatientTimeline";
import VisitNotePanel from "../components/VisitNotePanel";

const PatientTimelinePage = () => {
  const { id } = useParams();
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  return (
    <main className="page">
      <header className="page-header">
        <h1>Patient timeline</h1>
        <p>Visit history and notes for this patient.</p>
      </header>
      <PatientTimeline selectedPatientId={id} />
      <VisitNotePanel
        selectedPatientId={id}
        isNoteOpen={isNoteOpen}
        onOpen={() => setIsNoteOpen(true)}
        onClose={() => setIsNoteOpen(false)}
      />
    </main>
  );
};

export default PatientTimelinePage;
