const express = require("express");
const {
  getAllPatients,
  getPatient,
  createPatient,
} = require("./routes/patients");
const { getVisits, createVisit } = require("./routes/visits");
const { getAppointments, createAppointment } = require("./routes/appointments");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "clinica-api" });
});


app.get("/api/patients", getAllPatients);
app.post("/api/patients", createPatient);
app.get("/api/patients/:id", getPatient);


app.get("/api/visits", getVisits);
app.post("/api/visits", createVisit);


app.get("/api/appointments", getAppointments);
app.post("/api/appointments", createAppointment);

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}.`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
});
