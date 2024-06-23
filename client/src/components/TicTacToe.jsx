import React, { useState, useEffect, useContext } from "react";
import { TTTGameboard, LoadingSpinner } from "./index";
import { RefreshCw } from "react-feather";
import {
  X,
  ChevronsRight,
  ChevronsLeft,
  ChevronRight,
  ChevronLeft,
} from "react-feather";
import axios from "axios";
import { motion } from "framer-motion";
import { AuthContext } from "../context/authContext";
import UturnLeft from "../images/UturnLeft";
import { Link } from "react-router-dom";

const TicTacToe = () => {
  const [boardSize, setBoardSize] = useState("");
  const [player1Symbol, setPlayer1Symbol] = useState("");
  const [player2Symbol, setPlayer2Symbol] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [showLB, setShowLB] = useState(false);
  const [LBMode, setLBMode] = useState(0);
  const [LBPage, setLBPage] = useState(0);
  const [LBData, setLBData] = useState([]);
  const [LBNoData, setLBNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser, currentDomain } = useContext(AuthContext);

  const gameModes = ["3", "4", "5"];

  const startingWindow = (
    <div className="">
      <motion.span whileTap={{ scale: 0.85 }} className="relative">
        <Link
          to="/home"
          className="absolute -left-10 top-0 w-7 h-7  rounded-lg p-1 menu-button "
        >
          <UturnLeft fill="none" />
        </Link>
      </motion.span>
      <motion.div
        whileTap={{ scale: 0.85 }}
        className="relative p-0.5 rounded-sm mb-1 menu-border"
      >
        <div
          className="text-center px-2 hover:cursor-pointer menu-button"
          onClick={() => {
            setLBNoData(true);
            setShowLB(true);
          }}
        >
          View leaderboards
        </div>
      </motion.div>
      <section className="menu-border p-0.5 rounded-lg">
        <section className="flex flex-col rounded-lg px-2 py-1 menu">
          <p className="text-lg">Welcome to TicTacToe</p>
          <span className="flex flex-row mt-2">
            <p>Board size: </p>
            <input
              type="text"
              placeholder="3"
              onChange={(e) => {
                if (e.target.value <= 5 && e.target.value >= 3)
                  setBoardSize(e.target.value);
                else if (e.target.value > 5) setBoardSize(5);
                else if (e.target.value < 3) setBoardSize(3);
              }}
              className="w-16 rounded-md ml-2 h-6 text-xs text-center text-black"
            />
          </span>
          <span className="flex flex-row mt-2">
            <p>Player 1 symbol: </p>
            <input
              type="text"
              placeholder="P1"
              onChange={(e) => {
                if (e.target.value.length <= 5)
                  setPlayer1Symbol(e.target.value);
              }}
              className="w-16 rounded-md ml-2 h-6 text-xs text-center text-black"
            />
          </span>
          <span className="flex flex-row mt-2 mb-2">
            <p>Player 2 symbol: </p>
            <input
              type="text"
              placeholder="P2"
              onChange={(e) => {
                if (e.target.value.length <= 5)
                  setPlayer2Symbol(e.target.value);
              }}
              className="w-16 rounded-md ml-2 h-6 text-xs text-center text-black"
            />
          </span>
          <p className="text-xxs w-44">^Board size should be 3 to 5</p>
          <p className="text-xxs w-44 leading-4">
            ^Symbols should be &lt;= 5 characters
          </p>
          <motion.button
            whileTap={{ scale: 0.85 }}
            className="rounded-md menu-button"
            onClick={() => {
              if (boardSize === "") setBoardSize("3");
              if (player1Symbol === "") setPlayer1Symbol("P1");
              if (player2Symbol === "") setPlayer2Symbol("P2");
              setStartGame(true);
            }}
          >
            Start game
          </motion.button>
        </section>
      </section>
    </div>
  );

  const gameWindow = (
    <div className="relative flex flex-col items-center justify-center">
      <TTTGameboard
        size={boardSize}
        player1={player1Symbol}
        player2={player2Symbol}
      />
      <div
        className="absolute -top-1.5 -right-10 scale-75 bg-sky-500 border-2 border-white rounded-3xl p-1 hover:cursor-pointer hover:border-slate-100 hover:text-slate-100 hover:bg-blue-300"
        onClick={() => {
          setStartGame(false);
        }}
      >
        <RefreshCw className="" />
      </div>
    </div>
  );

  const getLeaderboards = async (mode) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${currentDomain}/api/users/scoreboard-ttt/${mode}?limit=${999}`
      );
      setLoading(false);
      if (res.data.length === 0) {
        console.log("No data found!");
        setLBNoData(true);
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
              className="absolute translate-x-32 -translate-y-11 scale-75 hover:scale-100 hover:cursor-pointer ease-in-out duration-50 menu-button"
              onClick={() => {
                setShowLB(false);
              }}
            />
            <h1 className="text-lg cursor-default px-2 pt-1 select-none">
              Leaderboards (Play count)
            </h1>
            <p className="pb-1 text-sm text-center cursor-default select-none">
              Select game mode
            </p>
          </div>
          <ul className="w-full items-center justify-evenly flex flex-row p-2 border-2 border-t-0 menu">
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
                    setLBPage(1);
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
              initial="hide"
              animate="show"
              className="flex flex-col items-center justify-center cursor-default py-1.5 menu"
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
                        variants={lbChildren}
                        key={id}
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
          <div className="flex flex-row items-center justify-between w-full border-2 border-t-0 menu">
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

  return (
    <div className="relative w-full h-full">
      <div className="absolute flex justify-center items-center w-full top-3/4 z-10 ease-in-out">
        {showLB && leaderboards}
      </div>
      <div className="absolute flex justify-center items-center w-full z-0">
        {startGame ? gameWindow : startingWindow}
      </div>
    </div>
  );
};

export default TicTacToe;
