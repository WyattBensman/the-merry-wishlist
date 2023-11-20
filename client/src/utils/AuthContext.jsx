import React, { createContext, useContext } from "react";
import AuthService from "./auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const isAuthenticated = AuthService.loggedIn();

  const login = (idToken) => {
    AuthService.login(idToken);
  };

  const logout = () => {
    AuthService.logout();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
