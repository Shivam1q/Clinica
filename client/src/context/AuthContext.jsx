import { createContext, useEffect, useMemo, useState } from "react";
import { getMe, loginRequest, logoutRequest } from "../api/auth";
import { useNotificationStore } from "../store/notificationStore";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function refreshSession() {
      try {
        const profile = await getMe();
        if (!cancelled) {
          setUser(profile);
        }
      } catch {
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    }

    refreshSession();

    const onPageShow = (event) => {
      if (event.persisted) {
        refreshSession();
      }
    };

    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("popstate", refreshSession);

    return () => {
      cancelled = true;
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("popstate", refreshSession);
    };
  }, []);

  const login = async (email, password) => {
    const data = await loginRequest(email, password);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
      useNotificationStore.getState().clear();
    }
  };

  const value = useMemo(
    () => ({
      user,
      isReady,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, isReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
