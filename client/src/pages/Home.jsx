import React, {
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import {
  Navbar,
  HomeGameCard,
  TZFETile,
  HomeDinoTile,
} from "../components/index";
import { motion, AnimatePresence } from "framer-motion";
import TTT_logo from "../images/TTT_logo.png";
import TZFE_logo from "../images/TZFE_logo.png";
import Aeroplane_logo from "../images/Aeroplane_logo.png";
import DinoJump_logo from "../images/DinoJump_logo.png";
import { AuthContext } from "../context/authContext";

const Home = () => {
  const [showPrivacyScreen, setShowPrivacyScreen] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth < 768 ? 0 : 1); //0 for mobile, 1 for desktop
  const { darkMode } = useContext(AuthContext);

  useEffect(() => {
    setShowPrivacyScreen(true);
    setTimeout(() => {
      setShowPrivacyScreen(false);
    }, 1000);
  }, []);

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

  const cards = [
    [
      <HomeGameCard cardName="2048" cardLogo={TZFE_logo} cardLink="/tzfe" />,
      "2048 is a popular single-player puzzle game where the objective is to slide numbered tiles on a grid to combine them and create a tile with the number 2048. Each turn, the player can move all tiles in one of the four directions.",
    ],
    [
      <HomeGameCard
        cardName="Tic Tac Toe"
        cardLogo={TTT_logo}
        cardLink="/ttt"
        BGFrom="from-beige-500"
        BGTo="to-beige-400"
      />,
      "Tic Tac Toe, also known as noughts and crosses, is a classic two-player game. Players take turns marking empty cells until one player achieves a winning pattern or the grid fills up with no winner, resulting in a draw.",
    ],
    [
      <HomeGameCard
        cardName="Aero-Chess"
        cardLogo={Aeroplane_logo}
        cardLink="/aerochess"
        BGFrom="from-grey-blue"
        BGTo="to-sky-400"
      />,
      "Aeroplane Chess is a captivating board game where players aim to maneuver their four airplane tokens from their hangar to the center destination zone before their opponents. Landing on an opponent's airplane sends it back to the hangar, adding a tactical layer of blocking and risk management.",
    ],
    [
      <HomeGameCard
        cardName="Dino Jumper"
        cardLogo={DinoJump_logo}
        cardLink="/home"
        BGFrom="from-amber-500"
        BGTo="to-beige-500"
      />,
      "Work in Progress",
    ],
  ];

  const cardContainer = {
    hidden: { opcaity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 1,
        staggerChildren: 0.25,
      },
    },
  };

  const cardChildren = {
    hidden: { opacity: 0, x: screenSize === 0 ? -50 : -100 },
    show: {
      opacity: 1,
      x: screenSize === 0 ? 0 : 0,
      transition: {
        type: "spring",
        duration: 3,
        stiffness: 40,
        mass: 0.3,
      },
    },
  };

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
          <Navbar pageName={"Home"} />
          <section className="w-full relative top-16 h-[100vh]">
            <motion.div
              variants={cardContainer}
              initial={"hidden"}
              animate={"show"}
              // whileInView={"show"}
              className={`relative grid gap-12 justify-center pt-5`}
            >
              {cards.map((card, id) => {
                return (
                  <motion.span
                    variants={cardChildren}
                    viewport={{ once: true }}
                    className={`flex flex-row justify-between w-full border-2 menu rounded-sm`}
                    key={id}
                  >
                    {card[0]}
                    <motion.span className="w-72 text-xs px-1 py-1">
                      {card[1]}
                    </motion.span>
                  </motion.span>
                );
              })}
            </motion.div>
          </section>
          <HomeDinoTile />
        </div>
      )}
    </>
  );
};

export default Home;
