import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdminLoggedIn, setAdminIsLoggedIn] = useState(false);
  const login = (user) => {
    setIsLoggedIn(true);
    setUserData(user);
    localStorage.setItem("isLoggedIn", true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.setItem("isLoggedIn", false);
  };
  const loginAdmin = () => {
    setIsLoggedIn(true);
    setAdminIsLoggedIn(true);
    localStorage.setItem("isAdminLoggedIn", true);
  };

  const logoutAdmin = () => {
    setIsLoggedIn(false);
    setAdminIsLoggedIn(false);
    localStorage.setItem("isAdminLoggedIn", false);
  };
  const value = {
    isAdminLoggedIn,
    isLoggedIn,
    userData,
    login,
    logout,
    loginAdmin,
    logoutAdmin,
    setIsLoggedIn,
    setAdminIsLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
