import api from "./client";

export const getAppointments = () => api.get("/appointments");
