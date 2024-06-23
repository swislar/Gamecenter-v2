import React, { useContext, useEffect, useState } from "react";
import { TwoZeroFourEight, Navbar } from "../components";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/authContext";

const TZFE = () => {
  const [showPrivacyScreen, setShowPrivacyScreen] = useState(false);
  const { darkMode } = useContext(AuthContext);

  useEffect(() => {
    setShowPrivacyScreen(true);
    setTimeout(() => {
      setShowPrivacyScreen(false);
    }, 1000);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showPrivacyScreen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{
              x: "0%",
              originX: 1,
              transition: { duration: 1, ease: "circOut" },
            }}
            exit={{
              x: "-100%",
              transition: { duration: 1, ease: "circIn" },
            }}
            className={`${
              darkMode ? "privacy-screen-dark" : "privacy-screen-light"
            }`}
          >
            <p className="relative flex w-full h-full items-center justify-center font-serif">
              Loading...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute top-0 w-full h-full"
      >
        <Navbar />
        <section className="relative top-[25%] flex flex-col items-center justify-center">
          <TwoZeroFourEight />
        </section>
      </motion.section>
    </>
  );
};

export default TZFE;
