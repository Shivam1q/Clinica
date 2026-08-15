import api from "./client";

export const getAppointments = () => api.get("/appointments");

export const createAppointment = (appointment) =>
  api.post("/appointments", appointment);
