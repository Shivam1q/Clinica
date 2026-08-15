import api from "./client";

export const getVisits = () => api.get("/visits");

export const createVisit = (visit) => api.post("/visits", visit);
