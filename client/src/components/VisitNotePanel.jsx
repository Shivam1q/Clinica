const VisitNotePanel = ({ selectedPatientId, isNoteOpen, onOpen, onClose }) => {
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
          />
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      )}
    </section>
  );
};

export default VisitNotePanel;
