const prisma = require("../lib/prisma");
const httpError = require("../middleware/httpError");

const getAllPatients = async (_req, res, next) => {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: "asc" },
    });
    res.status(200).json(patients);
  } catch (err) {
    next(err);
  }
};

const getPatient = async (req, res, next) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: req.params.id },
    });
    if (!patient) {
      throw httpError(404, "Patient not found");
    }
    res.status(200).json(patient);
  } catch (err) {
    next(err);
  }
};

const createPatient = async (req, res, next) => {
  try {
    const { name, age, phone, lastVisit } = req.body;

    const patient = await prisma.patient.create({
      data: {
        name,
        age: age === undefined || age === "" ? 0 : parseInt(age, 10),
        phone,
        lastVisit: lastVisit ?? null,
      },
    });

    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllPatients, getPatient, createPatient };
