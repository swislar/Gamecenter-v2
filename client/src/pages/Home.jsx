import React, { useState, useEffect, useId, useContext } from "react";
import { Navbar } from "../components/index";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TTT_logo from "../images/TTT_logo.png";
import TZFE_logo from "../images/TZFE_logo.png";
import Aeroplane_logo from "../images/Aeroplane_logo.png";
import DinoJump_logo from "../images/DinoJump_logo.png";
import { AuthContext } from "../context/authContext";

const Home = () => {
  const [showPrivacyScreen, setShowPrivacyScreen] = useState(false);
  const [screenSize, setScreenSize] = useState(0); //0 for mobile, 1 for desktop
  const { darkMode } = useContext(AuthContext);

  const tempId = useId();

  useEffect(() => {
    setShowPrivacyScreen(true);
    setTimeout(() => {
      setShowPrivacyScreen(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setScreenSize(0);
    } else {
      setScreenSize(1);
    }
  }, []);

  const workInProgress = () => {
    return;
  };

  const tzfeCard = (
    <motion.div
      whileTap={{ scale: 0.85 }}
      className="hover:scale-[1.03] hover:cursor-pointer ease-in duration-[100]"
    >
      <Link to="/tzfe" className="">
        <img
          src={TZFE_logo}
          alt="2048 Logo"
          className="h-24 w-24 md:h-52 md:w-52 rounded-5xl shadow-md shadow-gray-600"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center justify-center pt-1"
        >
          2048
        </motion.p>
      </Link>
    </motion.div>
  );

  const tttCard = (
    <motion.div
      whileTap={{ scale: 0.85 }}
      className="hover:scale-[1.03] hover:cursor-pointer ease-in duration-[100]"
    >
      <Link to="/ttt">
        <img
          src={TTT_logo}
          alt="TTT Logo"
          className="h-24 w-24 md:h-52 md:w-52 bg-gradient-to-tr from-beige-500 to-beige-400 rounded-3xl p-3 shadow-md shadow-gray-600"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center justify-center pt-1"
        >
          Tic Tac Toe
        </motion.p>
      </Link>
    </motion.div>
  );

  const aeroplaneCard = (
    <motion.div
      whileTap={{ scale: 0.85 }}
      className="hover:scale-[1.03] hover:cursor-pointer ease-in duration-[100]"
    >
      <Link onClick={() => workInProgress()}>
        <img
          src={Aeroplane_logo}
          alt="Aeroplane Logo"
          className="h-24 w-24 md:h-52 md:w-52 bg-gradient-to-tr from-grey-blue to-sky-400 rounded-3xl p-3 shadow-md shadow-gray-600"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-24 flex items-center justify-center pt-1 text-sm text-center md:w-auto"
        >
          Aeroplane Chess
        </motion.p>
      </Link>
    </motion.div>
  );
  const dinoJumpCard = (
    <motion.div
      whileTap={{ scale: 0.85 }}
      className="hover:scale-[1.03] hover:cursor-pointer ease-in duration-[100]"
    >
      <Link onClick={() => workInProgress()}>
        <img
          src={DinoJump_logo}
          alt="DinoJump Logo"
          className="h-24 w-24 md:h-52 md:w-52 bg-gradient-to-t from-amber-500 to-beige-500 rounded-3xl p-3 shadow-md shadow-gray-600"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-24 flex items-center justify-center pt-1 text-sm text-center md:w-auto"
        >
          Dinosaur Jumper
        </motion.p>
      </Link>
    </motion.div>
  );

  const cards = [
    [
      tzfeCard,
      "2048 is a popular single-player puzzle game where the objective is to slide numbered tiles on a grid to combine them and create a tile with the number 2048. Each turn, the player can move all tiles in one of the four directions. The game continues until the player creates a tile with the number 2048 or the grid fills up and there are no more valid moves. It requires strategic planning and spatial reasoning to reach the highest possible.",
    ],
    [
      tttCard,
      "Tic Tac Toe, also known as noughts and crosses, is a classic two-player game. Players take turns marking empty cells until one player achieves a winning pattern or the grid fills up with no winner, resulting in a draw. The goal is to be the first player to form a horizontal, vertical, or diagonal line of three of their symbols. Tic Tac Toe is simple to learn yet offers depth in strategic thinking, making it a timeless and enjoyable game for players of all ages.",
    ],
  ];

  const wipCards = [
    [aeroplaneCard, "Work in Progress"],
    [dinoJumpCard, "Work in Progress"],
  ];

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
            <motion.p className="relative flex w-full h-full items-center justify-center font-serif">
              Loading...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      {!showPrivacyScreen && (
        <div className="w-full absolute top-0">
          <Navbar className="w-full" />
          <section className="w-full relative top-12">
            <h1 className="font-mono text-3xl relative flex items-center justify-center w-full -mt-2 border-b-2 border-slate-400 bg-sakura-hover bg-opacity-60">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                key="games-header"
              >
                <em>Games</em>
              </motion.div>
            </h1>
            <div
              className={`relative flex flex-col items-center justify-center pt-5 ${
                darkMode ? "text-auto" : "text-slate-900"
              }`}
            >
              {cards.map((card, id) => {
                return (
                  <>
                    <motion.div
                      initial={{
                        opacity: 0,
                        x:
                          screenSize === 0
                            ? id % 2
                              ? -175
                              : 175
                            : id % 2
                            ? -300
                            : 300,
                      }}
                      whileInView={{
                        opacity: 1,
                        x:
                          screenSize === 0
                            ? id % 2
                              ? -100
                              : 100
                            : id % 2
                            ? -225
                            : 225,
                        transition: { duration: 1, delay: 1 },
                      }}
                      viewport={{ once: true }}
                      className={`flex flex-row justify-between ${
                        screenSize === 0
                          ? id === 2
                            ? ""
                            : "pb-36"
                          : id === 2
                          ? ""
                          : "pb-12"
                      }`}
                      key={id}
                    >
                      {card[0]}
                    </motion.div>
                    <motion.div
                      initial={{
                        opacity: 0,
                        x:
                          screenSize === 0
                            ? id % 2
                              ? -175
                              : 175
                            : id % 2
                            ? -250
                            : 250,
                        y:
                          screenSize === 0
                            ? id % 2
                              ? -125
                              : 140
                            : id % 2
                            ? -177
                            : 102,
                      }}
                      whileInView={{
                        opacity: 1,
                        x:
                          screenSize === 0
                            ? id % 2
                              ? -65
                              : 65
                            : id % 2
                            ? -130
                            : 130,
                        y:
                          screenSize === 0
                            ? id % 2
                              ? -125
                              : 140
                            : id % 2
                            ? -177
                            : 102,
                        transition: { duration: 1, delay: 2 },
                      }}
                      viewport={{ once: true }}
                      className={`absolute text-xs top-36 px-2 py-1 w-52 bg-white bg-opacity-20 md:text-base md:top-auto md:px-2 md:py-1 md:w-124 ${
                        screenSize === 0
                          ? "text-xs top-36 px-2 py-1 w-52"
                          : "w-124"
                      } ${id === 1 && "text-right"}`}
                      key={tempId}
                    >
                      {id === 0 ? cards[1][1] : cards[0][1]}
                    </motion.div>
                  </>
                );
              })}
            </div>
          </section>
          <section
            className={`w-full mt-28 ${
              darkMode ? "text-auto" : "text-slate-900"
            }`}
          >
            <div className="text-center border-t-2 border-b-2 border-slate-400">
              <p>Work in Progress</p>
            </div>
            <div className="relative flex flex-col items-center justify-center pt-5">
              {wipCards.map((card, id) => {
                return (
                  <>
                    <motion.div
                      initial={{
                        opacity: 0,
                        x:
                          screenSize === 0
                            ? id % 2
                              ? -175
                              : 175
                            : id % 2
                            ? -300
                            : 300,
                      }}
                      whileInView={{
                        opacity: 1,
                        x:
                          screenSize === 0
                            ? id % 2
                              ? -100
                              : 100
                            : id % 2
                            ? -225
                            : 225,
                        transition: { duration: 1, delay: 1 },
                      }}
                      viewport={{ once: true }}
                      className={`flex flex-row justify-between ${
                        screenSize === 0
                          ? id === 2
                            ? ""
                            : "pb-36"
                          : id === 2
                          ? ""
                          : "pb-12"
                      }`}
                      key={id}
                    >
                      {card[0]}
                    </motion.div>
                    <motion.div
                      initial={{
                        opacity: 0,
                        x:
                          screenSize === 0
                            ? id % 2
                              ? -175
                              : 175
                            : id % 2
                            ? -250
                            : 250,
                        y:
                          screenSize === 0
                            ? id % 2
                              ? -125
                              : 155
                            : id % 2
                            ? -250
                            : 30,
                      }}
                      whileInView={{
                        opacity: 1,
                        x:
                          screenSize === 0
                            ? id % 2
                              ? -65
                              : 65
                            : id % 2
                            ? -130
                            : 130,
                        y:
                          screenSize === 0
                            ? id % 2
                              ? -125
                              : 155
                            : id % 2
                            ? -250
                            : 30,
                        transition: { duration: 1, delay: 2 },
                      }}
                      viewport={{ once: true }}
                      className={`absolute text-xs top-36 px-2 py-1 w-52 bg-white bg-opacity-20 md:text-base md:top-auto md:px-2 md:py-1 md:w-124 ${
                        screenSize === 0
                          ? "text-xs top-36 px-2 py-1 w-52"
                          : "w-124"
                      } ${id === 1 && "text-right"}`}
                      key={tempId}
                    >
                      {wipCards[id][1]}
                    </motion.div>
                  </>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Home;
