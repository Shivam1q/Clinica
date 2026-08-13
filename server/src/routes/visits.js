const prisma = require("../lib/prisma");
const httpError = require("../middleware/httpError");

const getVisits = async (_req, res, next) => {
  try {
    const visits = await prisma.visit.findMany({
      orderBy: { date: "desc" },
    });
    res.status(200).json(visits);
  } catch (err) {
    next(err);
  }
};

const createVisit = async (req, res, next) => {
  try {
    const { patientId, date, summary } = req.body;

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });
    if (!patient) {
      throw httpError(404, "Patient not found");
    }

    const visit = await prisma.visit.create({
      data: {
        patientId,
        summary: summary ?? "",
        date: date ? new Date(date) : undefined,
      },
    });

    res.status(201).json(visit);
  } catch (err) {
    next(err);
  }
};

module.exports = { getVisits, createVisit };
