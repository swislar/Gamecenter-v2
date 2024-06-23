import React, { useState, useEffect, useContext } from "react";
import { isEqual } from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../context/authContext";

var datetime = new Date().toISOString().slice(0, 19).replace("T", " ");

//add glow upon clicking on the tile and red glow for not allowed

const createBoard = (size) => {
  const newBoard = [];
  for (let i = 0; i < size; i++) {
    newBoard.push([...Array(size)]);
  }
  return newBoard;
};
//add the size prop into the gameboard itself for selection
const TTTGameboard = (Props) => {
  const { size, player1, player2 } = Props;
  const [boardSize, setBoardSize] = useState(parseInt(size));
  const [board, setBoard] = useState(createBoard(boardSize));
  const [currPlayerTurn, setCurrentPlayerTurn] = useState(player1);
  const [endGame, setEndGame] = useState(false);
  const [drawGame, setDrawGame] = useState(false);
  const [moves, setMoves] = useState(1);
  const [currentTile, setCurrentTile] = useState("");
  const { currentUser, currentDomain } = useContext(AuthContext);

  useEffect(() => {
    console.log(board);
    console.log(endGame);
    console.log(moves);
  }, [board]);

  const updateDatabase = async () => {
    // Check if the user is currently in the database
    // Update the user current score
    const inputs = {
      uid: currentUser.uid,
      username: currentUser.username,
      datetime: datetime,
    };
    try {
      const res = await axios.put(
        `${currentDomain}/api/users/update/scoreboard-ttt/${boardSize}`,
        inputs
      );
      if (res.status === 400) {
        console.log("No data found!");
        return;
      }
    } catch (err) {
      console.log("update error!");
      console.log(err);

      // Create a new entry for the user
      try {
        const res = await axios.post(
          `${currentDomain}/api/users/create/scoreboard-ttt/${boardSize}`,
          inputs
        );
        console.log("Attempting to create new entry in the database!");
        console.log(res.data);
      } catch (err) {
        console.log("create error!");
        console.log(err);
      }
    }
    console.log("Attemping to update database");
  };

  const nextTurn = () => {
    setCurrentPlayerTurn(currPlayerTurn === player1 ? player2 : player1);
    console.log(currPlayerTurn);
  };

  const makeMove = (row, col) => {
    if (endGame || drawGame) return;
    if (board[row][col] === undefined) board[row][col] = currPlayerTurn;
    else return;
    //make a shallow copy to update the changes or else it might not re-render
    setBoard([...board]);
    // update the move for the current tile to display the animations
    setCurrentTile(row.toString() + col.toString());
    //check win after making a move on the board
    setMoves(moves + 1);
    checkWin();
  };

  const checkWin = async () => {
    console.log("checking win");
    if (diagonalWin()) {
      console.log("Winner by the diagonals");
      setEndGame(true);
      await updateDatabase();
    } else if (verticalWin()) {
      console.log("Winner by the verticals");
      setEndGame(true);
      await updateDatabase();
    } else if (horizontalWin()) {
      console.log("Winner by the horizontals");
      setEndGame(true);
      await updateDatabase();
    } else if (checkDraw()) {
      //display draw message and button to restart game
      //message: no winners this game
      console.log("No winners this round!");
      setDrawGame(true);
      await updateDatabase();
    } else nextTurn();
  };

  const checkDraw = () => {
    console.log("checking moves and size");
    console.log(moves);
    console.log(size ** 2);
    if (moves >= size ** 2) return true;
    return false;
  };

  const diagonalWin = () => {
    //board col since the row and cols are flipped in the visual
    let firstCheck = true;
    let secondCheck = true;
    //first check from top left to bottom right
    for (let i = 0; i < size; i++) {
      if (board[i][i] !== currPlayerTurn) {
        firstCheck = false;
        break;
      }
    }
    //skip the other check if there is already a winner
    if (firstCheck) return true;
    //next check from top right to bottom left
    for (let i = 0; i < size; i++) {
      if (board[size - i - 1][i] !== currPlayerTurn) {
        secondCheck = false;
        break;
      }
    }
    return secondCheck ? true : false;
  };

  const verticalWin = () => {
    //checks each column of the board
    //{row and col is flipped due to the arrangement of the boxes}
    let winner = false;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] !== currPlayerTurn) {
          //break to the next row since this row does not win
          break;
        } else if (col === size - 1) winner = true;
      }
      if (winner === true) break;
    }
    return winner;
  };

  const horizontalWin = () => {
    //checks each row of the board
    //{row and col is flipped due to the arrangement of the boxes}
    let winner = false;
    for (let col = 0; col < size; col++) {
      for (let row = 0; row < size; row++) {
        if (board[row][col] !== currPlayerTurn) {
          //break to the next row since this row does not win
          break;
        } else if (row === size - 1) winner = true;
      }
      if (winner === true) break;
    }
    return winner;
  };

  const drawPlay = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  const alreadyPlayed = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 0;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 0, bounce: 0 },
          opacity: { delay, duration: 0 },
        },
      };
    },
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <span className="flex flex-row items-center justify-between px-5 mb-3 outline-double rounded-3xl">
          <p className="pr-7">X - {player1}</p>
          <p className="pl-7">O - {player2}</p>
        </span>
        <section>
          <span className="flex flex-row pt-2">
            {board.map((row, rowIndex) => {
              return (
                <span clasName="flex flex-col" key={rowIndex}>
                  {row.map((item, colIndex) => {
                    return (
                      <motion.span
                        className={`flex w-16 h-16 outline-slate-400 outline outline-1 justify-center items-center text-md ${
                          isEqual(item, player1)
                            ? "bg-purple-haze"
                            : isEqual(item, player2)
                            ? "bg-cyan-500"
                            : "bg-neutral-300"
                        }`}
                        key={colIndex}
                        tabIndex="0"
                        onClick={() => makeMove(rowIndex, colIndex)}
                      >
                        {isEqual(
                          currentTile,
                          rowIndex.toString() + colIndex.toString()
                        ) ? (
                          isEqual(item, player1) ? (
                            <motion.svg
                              initial="hidden"
                              animate="visible"
                              className="w-full h-full"
                            >
                              <motion.line
                                x1={"25%"}
                                y1={"25%"}
                                x2={"75%"}
                                y2={"75%"}
                                variants={drawPlay}
                                stroke="#616C59"
                                strokeWidth={3}
                              />
                              <motion.line
                                x1={"75%"}
                                y1={"25%"}
                                x2={"25%"}
                                y2={"75%"}
                                variants={drawPlay}
                                stroke="#616C59"
                                strokeWidth={3}
                              />
                            </motion.svg>
                          ) : (
                            <motion.svg
                              initial="hidden"
                              animate="visible"
                              className="w-full h-full"
                            >
                              <motion.circle
                                className=""
                                cx={"50%"}
                                cy={"50%"}
                                r={"25%"}
                                variants={drawPlay}
                                stroke="#FCFBF4"
                                strokeWidth={3}
                                fill={"rgb(6, 182, 212"}
                              />
                            </motion.svg>
                          )
                        ) : isEqual(item, player1) ? (
                          <motion.svg
                            initial="invisible"
                            animate="visible"
                            className="w-full h-full"
                          >
                            <motion.line
                              x1={"25%"}
                              y1={"25%"}
                              x2={"75%"}
                              y2={"75%"}
                              variants={alreadyPlayed}
                              stroke="#616C59"
                              strokeWidth={3}
                            />
                            <motion.line
                              x1={"75%"}
                              y1={"25%"}
                              x2={"25%"}
                              y2={"75%"}
                              variants={alreadyPlayed}
                              stroke="#616C59"
                              strokeWidth={3}
                            />
                          </motion.svg>
                        ) : isEqual(item, player2) ? (
                          <motion.svg
                            initial="invisible"
                            animate="visible"
                            className="w-full h-full"
                          >
                            <motion.circle
                              className=""
                              cx={"50%"}
                              cy={"50%"}
                              r={"25%"}
                              variants={alreadyPlayed}
                              stroke="#FCFBF4"
                              strokeWidth={3}
                              fill={"rgb(6, 182, 212"}
                            />
                          </motion.svg>
                        ) : (
                          ""
                        )}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </span>
        </section>
      </div>
      <span className="w-full relative top-5">
        {drawGame || endGame ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col items-center px-2 border-2 text-neutral-100 border-stone-200 bg-gradient-to-tr from-indigo-400 to-indigo-300"
          >
            <p>Game over!</p>
            {endGame ? (
              <p>{currPlayerTurn} wins!</p>
            ) : (
              <p>No winners this round!</p>
            )}
          </motion.span>
        ) : (
          <div className="flex flex-col items-center px-2 border-2 h-7 text-neutral-100 border-stone-200 bg-gradient-to-tr from-indigo-400 to-indigo-300">
            <AnimatePresence mode="sync">
              <motion.p
                key={currPlayerTurn}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                exit={{ opacity: 0, x: 60, transition: { duration: 0.3 } }}
                exitBeforeEnter={true}
                className="relative top-0"
              >
                {currPlayerTurn}'s turn
              </motion.p>
            </AnimatePresence>
          </div>
        )}
      </span>
    </div>
  );
};

export default TTTGameboard;
