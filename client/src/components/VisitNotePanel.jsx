import { useState } from "react";
import { useVisits } from "../hooks/useVisits";

const VisitNotePanel = ({ selectedPatientId, isNoteOpen, onOpen, onClose }) => {
  const { createVisit, isCreating } = useVisits(selectedPatientId);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setSummary("");
    setError("");
    onClose();
  };

  const handleSave = async () => {
    const trimmed = summary.trim();
    if (!trimmed) {
      setError("Write a visit note before saving.");
      return;
    }

    setError("");

    try {
      await createVisit({
        patientId: selectedPatientId,
        summary: trimmed,
      });
      setSummary("");
      onClose();
    } catch {
      // API failure already surfaces as a global error toast.
    }
  };

  return (
    <section className="visit-note-panel">
      <h2>Visit notes</h2>

      {!selectedPatientId ? (
        <p className="empty-state">
          Select a patient and start a visit to draft notes here.
        </p>
      ) : !isNoteOpen ? (
        <div className="visit-note-actions">
          <p className="empty-state">
            Draft a note for this visit when you are ready.
          </p>
          <button type="button" className="btn" onClick={onOpen}>
            New visit note
          </button>
        </div>
      ) : (
        <div className="visit-note-editor">
          <label className="visit-note-label" htmlFor="visit-note">
            Draft note
          </label>
          <textarea
            id="visit-note"
            className="visit-note-textarea"
            rows={5}
            placeholder="Write visit notes here…"
            value={summary}
            disabled={isCreating}
            onChange={(event) => {
              setSummary(event.target.value);
              setError("");
            }}
          />
          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}
          <div className="visit-note-buttons">
            <button
              type="button"
              className="btn"
              onClick={handleSave}
              disabled={isCreating}
            >
              {isCreating ? "Saving…" : "Save visit"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={isCreating}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default VisitNotePanel;
