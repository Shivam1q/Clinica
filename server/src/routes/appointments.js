const {
  appointments,
  nextId,
  formattedTime,
  patients,
} = require("../data/seed");
const httpError = require("../middleware/httpError");

const getAppointments = (_req, res, next) => {
  try {
    res.status(200).json(appointments);
  } catch (err) {
    next(err);
  }
};

const createAppointment = (req, res, next) => {
  try {
    const { time, patientId, patientName, reason } = req.body;

    const patient = patients.find((p) => p.id === patientId);
    if (!patient) {
      throw httpError(404, "Patient not found");
    }

    const appointment = {
      id: nextId("A"),
      time: time ?? formattedTime(),
      patientId,
      patientName: patientName ?? patient.name,
      reason: reason ?? "",
    };

    appointments.push(appointment);
    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAppointments, createAppointment };
