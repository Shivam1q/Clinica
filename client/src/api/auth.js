import api from "./client";

export const loginRequest = (email, password) =>
  api.post("/auth/login", { email, password });

export const logoutRequest = () => api.post("/auth/logout");

export const getMe = () => api.get("/auth/me");
