import prisma from "../lib/prisma.js";
import httpError from "../middleware/httpError.js";

const getAppointments = async (_req, res, next) => {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "asc" },
    });
    res.status(200).json(appointments);
  } catch (err) {
    next(err);
  }
};

const createAppointment = async (req, res, next) => {
  try {
    const { time, patientId, patientName, reason } = req.body;

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });
    if (!patient) {
      throw httpError(404, "Patient not found");
    }

    const appointment = await prisma.appointment.create({
      data: {
        time:
          time ??
          new Date().toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        patientId,
        patientName: patientName ?? patient.name,
        reason: reason ?? "",
      },
    });

    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
};

export { getAppointments, createAppointment };
