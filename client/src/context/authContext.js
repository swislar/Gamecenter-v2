import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const currentDomain = "https://gamecenter-backend.onrender.com";
  // const currentDomain = "http://localhost:8800";

  const login = async (inputs) => {
    const res = await axios.post(`${currentDomain}/api/auth/login`, inputs);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post(`${currentDomain}/api/auth/logout`);
    setCurrentUser(null);
  };

  const guestLogin = () => {
    setCurrentUser({ uid: 0, username: "Guest" });
  };

  const guestLogout = () => {
    setCurrentUser({ uid: 0, username: "Guest" });
  };

  const adminLogin = () => {
    setCurrentUser({ uid: 1, username: "admin" });
  };

  const adminLogout = () => {
    setCurrentUser({ uid: 1, username: "admin" });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [currentUser, darkMode]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        adminLogin,
        adminLogout,
        guestLogin,
        guestLogout,
        currentDomain,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
