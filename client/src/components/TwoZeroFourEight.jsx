import React, { useState, useEffect, useContext } from "react";
import { TZFEGameboard, LoadingSpinner } from "./index";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "react-feather";
import { Link } from "react-router-dom";
import UturnLeft from "../images/UturnLeft";
import axios from "axios";
import { easeInOut, motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/authContext";

const TwoZeroFourEight = () => {
  const [boardSize, setBoardSize] = useState(3);
  const [startGame, setStartGame] = useState(false);
  const [showLB, setShowLB] = useState(false);
  const [LBData, setLBData] = useState([]);
  const [LBMode, setLBMode] = useState(0);
  const [LBPage, setLBPage] = useState(0);
  const [LBNoData, setLBNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser, currentDomain, darkMode } = useContext(AuthContext);

  const gameModes = Array.from({ length: 6 }, (_, index) => index + 3);

  const getLeaderboards = async (mode) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${currentDomain}/api/users/scoreboard-tzfe/${mode}?limit=${999}`
      );
      setLoading(false);
      if (res.data === "No data found!") {
        console.log("No data found!");
        return;
      }
      setLBData(res.data);
      setLBNoData(false);
      setLBPage(1);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setLBData([]);
      setLBNoData(true);
      setLBPage(0);
    }
  };

  const lbContainer = {
    hide: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delayChildren: 1, staggerChildren: 0.4 },
    },
  };

  const lbChildren = {
    hide: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        mass: 0.3,
      },
    },
  };

  const leaderboards = (
    <>
      <motion.section
        initial={{ width: 0, height: 0 }}
        animate={{ width: "auto", height: "auto" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        exit={{
          width: 0,
          height: 0,
          transition: { duration: 1, delay: 1, ease: "easeInOut" },
        }}
        key="LB-BG"
        className="absolute top-0 flex flex-col items-center border-2 border-white menu"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1 },
          }}
          key="LB-Text"
        >
          <div className="flex flex-col items-center justify-center border-2 w-full menu">
            <X
              className="absolute translate-x-40 -translate-y-10 scale-75 hover:scale-100 hover:cursor-pointer ease-in-out duration-50 menu-button"
              onClick={() => {
                setShowLB(false);
              }}
            />
            <h1 className="text-lg cursor-default select-none">
              Leaderboard type
            </h1>
            <p className="pb-1 text-sm text-center cursor-default select-none">
              Select game mode
            </p>
          </div>
          <ul className="flex flex-row p-2 border-2 border-t-0 menu">
            {gameModes.map((mode, id) => {
              return (
                <li
                  key={id}
                  className={`px-2 hover:animate-pulse cursor-pointer menu-button-special ${
                    mode === LBMode
                      ? "bg-sakura-hover text-sakura-hover-text"
                      : ""
                  }`}
                  onClick={() => {
                    getLeaderboards(mode);
                    setLBMode(mode);
                  }}
                >
                  {mode} x {mode}
                </li>
              );
            })}
          </ul>
          <div className="border-2 border-t-0 w-full">
            <motion.ul
              key={LBData.toString()}
              variants={lbContainer}
              initial={"hide"}
              animate={"show"}
              className="flex flex-col items-center justify-center cursor-default py-1.5"
            >
              {loading ? (
                <LoadingSpinner className="w-12 h-12" />
              ) : LBNoData ? (
                <>
                  No data found for {LBMode} x {LBMode}
                </>
              ) : (
                LBData.slice((LBPage - 1) * 10, LBPage * 10).map(
                  (score, id) => {
                    return (
                      <motion.li
                        key={id}
                        variants={lbChildren}
                        className={`${
                          currentUser.username === score.username &&
                          "w-full text-purple-haze text-center"
                        }`}
                      >
                        {(LBPage - 1) * 10 + id + 1}. {score.username} -{" "}
                        {score.score}
                      </motion.li>
                    );
                  }
                )
              )}
            </motion.ul>
          </div>
          <div className="flex flex-row items-center justify-between w-full border-2 border-t-0">
            <span className="flex flex-row items-center justify-center">
              <ChevronsLeft
                className="rounded-xl hover:animate-pulse hover:bg-sakura-hover"
                onClick={() => {
                  setLBPage(1);
                }}
              />
              <ChevronLeft
                className="rounded-xl hover:animate-pulse hover:bg-sakura-hover"
                onClick={() => {
                  if (LBPage > 1) {
                    setLBPage(LBPage - 1);
                  }
                }}
              />
            </span>
            <p className="cursor-default select-none">
              - Page {LBPage} of {Math.ceil(LBData.length / 10)} -
            </p>
            <span className="flex flex-row items-center justify-center">
              <ChevronRight
                className="rounded-xl hover:animate-pulse hover:bg-sakura-hover"
                onClick={() => {
                  if (LBPage < Math.ceil(LBData.length / 10)) {
                    setLBPage(LBPage + 1);
                  }
                }}
              />

              <ChevronsRight
                className="rounded-xl hover:animate-pulse hover:bg-sakura-hover"
                onClick={() => {
                  setLBPage(Math.ceil(LBData.length / 10));
                }}
              />
            </span>
          </div>
        </motion.div>
      </motion.section>
    </>
  );

  const menu = (
    <section className="flex flex-col items-center justify-center">
      <motion.span whileTap={{ scale: 0.85 }} className="relative">
        <Link
          to="/home"
          className="absolute -left-32 top-0 w-7 h-7  rounded-lg p-1 menu-button "
        >
          <UturnLeft fill="none" />
        </Link>
      </motion.span>
      <motion.div
        whileTap={{ scale: 0.85 }}
        className="p-0.5 rounded-sm mb-1 menu-border relative"
      >
        <div
          className="px-2 hover:cursor-pointer menu-button"
          onClick={() => {
            setLBNoData(true);
            setShowLB(true);
            LBData.length === 0 ? setLBPage(0) : setLBPage(1);
          }}
        >
          View leaderboards
        </div>
      </motion.div>
      <section className="flex flex-col border-2 rounded-lg px-2 py-1 menu">
        <p className="text-lg flex items-center justify-center">
          Welcome to 2048
        </p>
        <span className="flex flex-row mt-2">
          <p>Board size: </p>
          <input
            type="text"
            placeholder={boardSize || "3"}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value <= 8 && value >= 3) setBoardSize(value);
              else if (value > 8) setBoardSize(8);
              else if (value < 3) setBoardSize(3);
              else setBoardSize(4);
            }}
            className="w-16 rounded-md ml-2 h-6 text-xs text-center text-black"
          />
        </span>
        <p className="text-xxs w-44 mt-1">^Board size should be 3 to 8</p>
        <motion.button
          whileTap={{ scale: 0.85 }}
          className="rounded-md mt-2 menu-button"
          onClick={() => {
            setStartGame(true);
          }}
        >
          Start game
        </motion.button>
      </section>
    </section>
  );

  const gameBoard = (
    <div>
      <span className="flex flex-col items-center justify-center">
        <TZFEGameboard size={boardSize} />
        <p
          className={`flex text-xxs pt-2 ${
            darkMode
              ? "text-neutral-50 ease-in-out duration-600"
              : "text-slate-800"
          }`}
        >
          ^Play by clicking on your arrow keys
        </p>
        <button
          className="flex outline w-40 outline-2 items-center justify-center mt-2 rounded-md px-2 py-0.5 hover:animate-pulse duration-150 menu-button"
          onClick={() => {
            setStartGame(false);
          }}
        >
          Restart
        </button>
      </span>
    </div>
  );
  return (
    <div className="relative w-full h-full">
      <div className="absolute flex justify-center items-center w-full h-3/4 z-10 ease-in-out">
        {showLB ? leaderboards : <></>}
      </div>
      <div className="absolute flex justify-center items-center w-full z-0">
        {startGame ? gameBoard : menu}
      </div>
    </div>
  );
};

export default TwoZeroFourEight;
