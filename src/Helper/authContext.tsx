"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

// Define Auth Context Type
interface AuthContextType {
  user: { id: string; email: string } | null;
  isAuthenticated: boolean;
  login: (token: string, userInfo: { id: string; email: string }) => void;
  logout: () => void;
}

// Provide a default value
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("access_token");
    const userId = Cookies.get("user_id");
    const email = Cookies.get("email");

    if (token && userId && email) {
      setUser({ id: userId, email });
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string, userInfo: { id: string; email: string }) => {
    Cookies.set("access_token", token);
    Cookies.set("user_id", userInfo.id);
    Cookies.set("email", userInfo.email);
    setUser(userInfo);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("user_id");
    Cookies.remove("email");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
