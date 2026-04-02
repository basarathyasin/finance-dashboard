import { createContext, useEffect, useMemo, useState } from "react";
import api from "../../services/api";

const TOKEN_KEY = "finance_dashboard_token";
const USER_KEY = "finance_dashboard_user";

export const AuthContext = createContext(null);

function readStoredUser() {
  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => readStoredUser());
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  function saveSession(nextToken, nextUser) {
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  }

  function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }

  async function login(credentials) {
    const response = await api.post("/auth/login", credentials);
    saveSession(response.data.token, response.data.user);
    return response;
  }

  async function register(payload) {
    const response = await api.post("/auth/register", payload);
    saveSession(response.data.token, response.data.user);
    return response;
  }

  function logout() {
    clearSession();
  }

  useEffect(() => {
    let ignore = false;

    async function restoreSession() {
      if (!localStorage.getItem(TOKEN_KEY)) {
        setIsBootstrapping(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");

        if (!ignore) {
          setToken(localStorage.getItem(TOKEN_KEY));
          setUser(response.data.user);
        }
      } catch {
        if (!ignore) {
          clearSession();
        }
      } finally {
        if (!ignore) {
          setIsBootstrapping(false);
        }
      }
    }

    restoreSession();

    return () => {
      ignore = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      register,
      logout,
      isBootstrapping,
      isAuthenticated: Boolean(token && user),
    }),
    [token, user, isBootstrapping]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
