const { visits, patients, formattedDate, nextId } = require("../data/seed");

const getVisits = (_req, res) => {
  res.status(200).json(visits);
};

const createVisit = (req, res) => {
  const { patientId, date, summary } = req.body;

  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  const visit = {
    id: nextId("V"),
    patientId,
    date: date ?? formattedDate(),
    summary: summary ?? "",
  };

  visits.push(visit);
  res.status(201).json(visit);
};

module.exports = { getVisits, createVisit };
