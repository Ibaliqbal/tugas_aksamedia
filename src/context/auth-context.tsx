import React, { createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const staticUser = {
  username: "John Doe",
  password: "password123",
  email: "johndoe@example.com",
};

export type User = {
  username: string;
  password: string;
  email: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => boolean;
  logout: () => void;
  user: User;
  updateData: ({
    email,
    username,
  }: {
    email: string;
    username: string;
  }) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : { username: "", password: "", email: "" }
  );

  const navigate = useNavigate();

  const location = useLocation();

  const login = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    if (username === staticUser.username && password === staticUser.password) {
      localStorage.setItem("user", JSON.stringify(staticUser));
      setUser(staticUser);
      setIsAuthenticated(true);
      navigate("/");
      return true;
    } else {
      console.error("Invalid credentials");
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser({ username: "", password: "", email: "" });
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const updateData = (data: { email: string; username: string }) => {
    setUser({
      ...user,
      email: data.email,
      username: data.username,
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        email: data.email,
        username: data.username,
      })
    );
  };

  useEffect(() => {
    if (isAuthenticated && location.pathname === "/login") {
      navigate("/");
    } else if (!isAuthenticated && location.pathname !== "/login") {
      navigate("/login");
    } else {
      navigate(location.pathname);
    }
  }, [isAuthenticated, location.pathname]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, updateData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
