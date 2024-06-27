import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "react-feather";
import { AuthContext } from "../context/authContext";
import { Moon, Sun } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ pageName = "" }) => {
  const { darkMode, setDarkMode } = useContext(AuthContext);
  const { currentUser, logout } = useContext(AuthContext);
  const location = useLocation();

  const toggleDarkMode = () => {
    if (darkMode === true) {
      document.body.style.setProperty(
        "background-color",
        "var(--lightBackground)"
      );
    } else if (darkMode === false) {
      document.body.style.setProperty(
        "background-color",
        "var(--darkBackground)"
      );
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="absolute top-0 left-0 w-full flex flex-col">
      <section className="h-10 flex justify-between navbar">
        <Link
          to={location.pathname === "/admin" ? "/" : "/home"}
          className="flex items-center pl-3 justify-center text-xl"
        >
          Game Center
        </Link>
        <span className="relative flex flex-row py-2 mr-3 top-0 right-0 items-center justify-center">
          <p className="pr-3 cursor-default">
            {currentUser ? currentUser.username : "Login →"}
          </p>
          <Link to="/">
            <LogOut
              className="mr-4 scale-150 hover:cursor-pointer ease-in duration-100 p-1 rounded-md navbar-button"
              onClick={logout}
            />
          </Link>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, rotate: 25, scale: 1.05 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 25, scale: 1.05 }}
              transition={{ duration: 1 }}
              key={darkMode ? "moon" : "sun"}
            >
              {darkMode ? (
                <Moon
                  className="hover:cursor-pointer fill-slate-400"
                  onClick={() => toggleDarkMode()}
                />
              ) : (
                <Sun
                  className="hover:cursor-pointer fill-amber-400"
                  onClick={() => {
                    toggleDarkMode();
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </span>
      </section>
      <section className="h-7 w-full flex flex-row justify-evenly items-center">
        <Link
          to="/home"
          className={`menu-button w-[50%] text-center border-2 ease-in-out duration-300 hover:cursor-pointer ${
            pageName === "Home"
              ? "border-cyan-300 border-4"
              : pageName === ""
              ? "border-cyan-200"
              : "border-cyan-200 border-r-0"
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`menu-button w-[50%] text-center border-2 ease-in-out duration-300 hover:cursor-pointer ${
            pageName === "About"
              ? "border-cyan-300 border-4"
              : "border-cyan-200 border-l-0"
          }`}
        >
          About
        </Link>
      </section>
    </div>
  );
};

export default Navbar;
