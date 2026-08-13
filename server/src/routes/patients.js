const { patients, nextId, formattedDate } = require("../data/seed");

const getAllPatients = (_req, res) => {
  res.status(200).json(patients);
};

const getPatient = (req, res) => {
  const patient = patients.find((p) => p.id === req.params.id);

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  res.status(200).json(patient);
};

const createPatient = (req, res) => {
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
};

module.exports = { getAllPatients, getPatient, createPatient };
