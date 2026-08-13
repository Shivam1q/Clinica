const {
  appointments,
  nextId,
  formattedTime,
  patients,
} = require("../data/seed");

const getAppointments = (_req, res) => {
  res.status(200).json(appointments);
};

const createAppointment = (req, res) => {
  const { time, patientId, patientName, reason } = req.body;

  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
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
};

module.exports = { getAppointments, createAppointment };
