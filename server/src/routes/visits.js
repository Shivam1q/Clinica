const { visits, patients, formattedDate, nextId } = require("../data/seed");
const httpError = require("../middleware/httpError");

const getVisits = (_req, res, next) => {
  try {
    res.status(200).json(visits);
  } catch (err) {
    next(err);
  }
};

const createVisit = (req, res, next) => {
  try {
    const { patientId, date, summary } = req.body;

    const patient = patients.find((p) => p.id === patientId);
    if (!patient) {
      throw httpError(404, "Patient not found");
    }

    const visit = {
      id: nextId("V"),
      patientId,
      date: date ?? formattedDate(),
      summary: summary ?? "",
    };

    visits.push(visit);
    res.status(201).json(visit);
  } catch (err) {
    next(err);
  }
};

module.exports = { getVisits, createVisit };
