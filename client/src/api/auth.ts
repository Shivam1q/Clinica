import type { AuthSession, LoginInput, User } from "@clinica/shared";
import { apiGet, apiPost } from "./client";

export const loginRequest = (
  email: LoginInput["email"],
  password: LoginInput["password"],
): Promise<AuthSession> => apiPost("/auth/login", { email, password });

export const logoutRequest = (): Promise<void> => apiPost("/auth/logout");

export const getMe = (): Promise<User> => apiGet("/auth/me");
