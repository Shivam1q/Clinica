import "dotenv/config";
import express from "express";
import logger from "./middleware/logger.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import healthRouter from "./routes/health.js";
import patientsRouter from "./routes/patients.js";
import visitsRouter from "./routes/visits.js";
import appointmentsRouter from "./routes/appointments.js";

const app = express();

app.use(logger);
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/visits", visitsRouter);
app.use("/api/appointments", appointmentsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
