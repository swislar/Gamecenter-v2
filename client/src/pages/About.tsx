import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { Navbar } from "../components/index";
import { AuthContext } from "../context/authContext";

const About = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth < 768 ? 0 : 1); //0 for mobile, 1 for desktop
  const { darkMode } = useContext(AuthContext);

  useEffect(() => {}, []);

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
  return (
    <div className="relative w-full h-full">
      <Navbar pageName={"About"} />
      <section className="absolute top-18 w-full flex items-center justify-center">
        <p className="text-center">This is the about page</p>
      </section>
    </div>
  );
};

export default About;
