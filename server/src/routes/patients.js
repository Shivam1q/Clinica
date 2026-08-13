const { patients, nextId, formattedDate } = require("../data/seed");
const httpError = require("../middleware/httpError");

const getAllPatients = (_req, res, next) => {
  try {
    res.status(200).json(patients);
  } catch (err) {
    next(err);
  }
};

const getPatient = (req, res, next) => {
  try {
    const patient = patients.find((p) => p.id === req.params.id);
    if (!patient) {
      throw httpError(404, "Patient not found");
    }
    res.status(200).json(patient);
  } catch (err) {
    next(err);
  }
};

const createPatient = (req, res, next) => {
  try {
    const { name, age, phone, lastVisit } = req.body;

    const patient = {
      id: nextId("P"),
      name,
      age: age === undefined || age === "" ? 0 : parseInt(age, 10),
      phone,
      lastVisit: lastVisit ?? formattedDate(),
    };

    patients.push(patient);
    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllPatients, getPatient, createPatient };
