import api from "./client";

export const getPatients = () => api.get("/patients");

export const createPatient = (patient) => api.post("/patients", patient);
