import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/authContext";
import { Moon, Sun } from "react-feather";
import styled from "styled-components";

interface HeaderProps {
  animateTitle: boolean;
}

export const Header: React.FC<HeaderProps> = ({ animateTitle }) => {
  const pageTitle = "Game center";
  const { darkMode, setDarkMode } = useContext(AuthContext);

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
    <div className="flex items-center w-full h-1/5 pb-1 md:pb-0 md:pr-1 md:w-1/3 md:h-[100vh] menu-border">
      <div className="flex flex-row items-center w-full h-full md:w-full md:h-[100vh] menu">
        <h1 className="relative left-0 text-5xl font-mono font-bold pl-10 w-64">
          {pageTitle.split("").map((letter, id) => {
            return (
              <motion.span
                initial={animateTitle ? { opacity: 0 } : { opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: id / 10 }}
                key={id}
                className=""
              >
                {letter}
              </motion.span>
            );
          })}
        </h1>
      </div>
      <div className="absolute top-3 right-3">
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
      </div>
    </div>
  );
};
