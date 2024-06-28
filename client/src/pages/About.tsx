import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { Navbar } from "../components/index";
import { AuthContext } from "../context/authContext";
import { animate, delay, motion } from "framer-motion";
import { textFieldClasses } from "@mui/material";

const About = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth < 768 ? 0 : 1); //0 for mobile, 1 for desktop
  const { darkMode } = useContext(AuthContext);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize(0);
      } else {
        setScreenSize(1);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  const header = "This page is made using";

  const containerVariantFirst = {
    initial: {
      opacity: 0,
      transition: {
        staggerChildren: 0.5,
      },
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 2.5,
      },
    },
  };

  const containerVariantSecond = {
    initial: {
      opacity: 0,
      transition: {
        staggerChildren: 0.5,
      },
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 4.5,
      },
    },
  };

  const childVariant = { initial: { opacity: 0 }, animate: { opacity: 1 } };

  return (
    <div className="relative w-full h-full">
      <Navbar pageName={"About"} />
      <section
        className={`absolute top-18 w-full flex flex-col items-center justify-center ease-in-out duration-500 ${
          darkMode ? "text-slate-200" : "text-neutral-950"
        }`}
      >
        <motion.p className="flex flex-row">
          {header.split("").map((letter, id) => (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: id / 10 }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.p>
          ))}
        </motion.p>
        <motion.div
          variants={containerVariantFirst}
          initial="initial"
          animate="animate"
          className="flex flex-row w-full items-center justify-evenly"
        >
          <motion.p
            drag
            dragConstraints={{ top: 3, bottom: 500, right: 290, left: 0 }}
            variants={childVariant}
          >
            MySQL
          </motion.p>
          <motion.p
            drag
            dragConstraints={{ top: 3, bottom: 500, right: 185, left: -80 }}
            variants={childVariant}
          >
            ExpressJS
          </motion.p>
          <motion.p
            drag
            dragConstraints={{ top: 3, bottom: 500, right: 96, left: -185 }}
            variants={childVariant}
          >
            ReactJS
          </motion.p>
          <motion.p
            drag
            dragConstraints={{ top: 3, bottom: 500, right: 0, left: -277 }}
            variants={childVariant}
          >
            NodeJS
          </motion.p>
        </motion.div>
        <motion.div
          variants={containerVariantSecond}
          initial="initial"
          animate="animate"
          className="flex flex-row w-full items-center justify-evenly"
        >
          <motion.p
            drag
            dragConstraints={{ top: 3, bottom: 500, right: 250, left: 0 }}
            variants={childVariant}
            className=""
          >
            Framer motion
          </motion.p>
          <motion.p
            drag
            dragConstraints={{ top: 3, bottom: 500, right: 135, left: -133 }}
            variants={childVariant}
          >
            React Router
          </motion.p>
          <motion.p
            drag
            dragConstraints={{ top: 3, bottom: 500, right: 70, left: -250 }}
            variants={childVariant}
          >
            Vercel
          </motion.p>
          <motion.p
            drag
            dragConstraints={{ top: 3, bottom: 500, right: 0, left: -310 }}
            variants={childVariant}
          >
            Render
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
