import api from "./client";

export const getPatients = () => api.get("/patients");

export const getPatient = (id) => api.get(`/patients/${id}`);

export const createPatient = (patient) => api.post("/patients", patient);
