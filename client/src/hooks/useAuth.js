import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  const { user, isReady, isAuthenticated, login, logout } = context;
  return { user, isReady, isAuthenticated, login, logout };
};
