import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";

// TODO: Check for overlap in board pieces
// TODO: Check for winner
// TODO: Turn in into the center tile
const createBoard = (Players: number) => {
  const newBoard: number[][] = [];
  for (let i = 0; i < 15; i++) {
    newBoard.push([...Array(15).fill(-1)]);
  }
  //initialise to the number of players, 4 playing pieces for each player in each corner
  if (Players >= 2) {
    //set the bottom right and left corners of the board to contain the players
    //for the first player
    newBoard[13][1] = 1;
    newBoard[13][0] = 1;
    newBoard[14][1] = 1;
    newBoard[14][0] = 1;
    //for the 2nd player
    newBoard[13][13] = 2;
    newBoard[13][14] = 2;
    newBoard[14][13] = 2;
    newBoard[14][14] = 2;
  }
  if (Players >= 3) {
    //set the bottom right, left and top right corners of the board to contain the players
    newBoard[1][13] = 3;
    newBoard[1][14] = 3;
    newBoard[0][13] = 3;
    newBoard[0][14] = 3;
  }
  if (Players >= 4) {
    //set all 4 corners of the board to contain the players
    newBoard[0][0] = 4;
    newBoard[0][1] = 4;
    newBoard[1][0] = 4;
    newBoard[1][1] = 4;
  }
  return newBoard;
};

interface AirplaneGameBoardProps {
  players: number;
}

const AirplaneGameBoard: React.FC<AirplaneGameBoardProps> = ({ players }) => {
  const [turnPlayer, setTurnPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [board, setBoard] = useState(createBoard(players));
  const [selectedPiece, setSelectedPiece] = useState([-1, -1]);
  const [diceRoll, setDiceRoll] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const { darkMode } = useContext(AuthContext);

  const initialiseGameBoard = (row: number, col: number) => {
    //checks if the part of the board should be lighted up
    return (
      checkCorners(row, col) ||
      checkCentral(row, col) ||
      checkSpecialTiles(row, col)
    );
  };

  const checkCorners = (row: number, col: number) => {
    //checks the corners of the board to be lighted up
    if (
      (col < 2 && row < 2) || // Top left sqaure
      (col < 2 && row > 12) || // Top right square
      (col > 12 && row < 2) || // Bottom left square
      (col > 12 && row > 12) // Bottom right square
    ) {
      //checks for the 4 corners
      return true;
    } else if (
      (col === 0 && row < 11 && row > 3) || // Top horizontal line
      (col === 14 && row < 11 && row > 3) || // Bottom horizontal line
      (row === 0 && col < 11 && col > 3) || // Left vertical line
      (row === 14 && col < 11 && col > 3) // Right vertical line
    ) {
      //checks the the horizontals/ verticals at the corners
      return true;
    }
    return false;
  };

  const checkCentral = (row: number, col: number) => {
    //checks the central of the board to be lighted up
    if (row === 7 || col === 7) {
      //checks for the central cross
      return true;
    }
    return false;
  };

  const checkSpecialTiles = (row: number, col: number) => {
    //checks for additional tiles that specific without a pattern
    if (
      (row === 1 && col === 3) ||
      (row === 3 && col === 1) ||
      (row === 2 && col === 2) ||
      (row === 11 && col === 1) ||
      (row === 12 && col === 2) ||
      (row === 13 && col === 3) ||
      (row === 13 && col === 11) ||
      (row === 12 && col === 12) ||
      (row === 11 && col === 13) ||
      (row === 1 && col === 11) ||
      (row === 2 && col === 12) ||
      (row === 3 && col === 13)
    ) {
      return true;
    }
  };

  const isPlayerTile = (indexCol: number, indexRow: number) => {
    const item = board[indexCol][indexRow];
    return [1, 2, 3, 4].includes(item);
  };

  const isCurrentPlayerTile = (
    indexCol: number,
    indexRow: number,
    player: number
  ) => {
    const item = board[indexCol][indexRow];
    return item === player;
  };

  const colourPlayerTile = (item: number) => {
    if (item === 1) {
      return "bg-purple-300 hover:animate-pulse";
    } else if (item === 2) {
      return "bg-pink-400 hover:animate-pulse";
    } else if (item === 3) {
      return "bg-orange-300 hover:animate-pulse";
    } else if (item === 4) {
      return "bg-red-200 hover:animate-pulse";
    } else return "";
  };

  const handleDiceRoll = (e: React.MouseEvent<HTMLElement>) => {
    if (diceRoll === 0) {
      const value = (Math.random() * 5 + 1).toFixed(0);
      setDiceRoll(parseInt(value));
    } else {
      setErrorMessage("Dice already rolled!");
    }
  };

  const handleSelectPiece = (
    e: React.MouseEvent<HTMLDivElement>,
    row: number,
    col: number
  ) => {
    if (turnPlayer === board[row][col]) {
      setSelectedPiece([row, col]);
    }
    console.log(board[row][col]);
  };

  const startNextTurn = () => {
    setTurnPlayer(turnPlayer < players ? turnPlayer + 1 : 1);
    setErrorMessage("");
    setDiceRoll(0);
    setSelectedPiece([-1, -1]);
  };

  const moveSelectedPiece = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (diceRoll === 0) {
      setErrorMessage("Roll dice first!");
      return;
    }
    if (selectedPiece[0] === -1 && selectedPiece[1] === -1) {
      setErrorMessage("Select piece to move!");
      return;
    }
    // if (board){
    //   return;
    // }

    let selectedPieceVar = selectedPiece;
    for (let i = 0; i < diceRoll; i++) {
      console.log("iteration: ", i);
      const currentRow = selectedPieceVar[0];
      const currentCol = selectedPieceVar[1];
      const newPosition = boardMovement[currentRow][currentCol];
      const newRow = newPosition[0];
      const newCol = newPosition[1];

      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[newRow][newCol] = turnPlayer;
        newBoard[currentRow][currentCol] = -1;
        return newBoard;
      });

      console.log(board);
      selectedPieceVar = newPosition;
      // console.log(newPosition);
    }
    setSelectedPiece(selectedPieceVar);
    startNextTurn();
  };

  const boardMovement = [
    [
      [2, 2],
      [2, 2],
      [-1, -1],
      [-1, -1],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
      [0, 9],
      [0, 10],
      [1, 11],
      [-1, -1],
      [-1, -1],
      [2, 12],
      [2, 12],
    ],
    [
      [2, 2],
      [2, 2],
      [-1, -1],
      [0, 4],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [2, 7],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [2, 12],
      [-1, -1],
      [2, 12],
      [2, 12],
    ],
    [
      [-1, -1],
      [-1, -1],
      [1, 3],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [3, 7],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [3, 13],
      [-1, -1],
      [-1, -1],
    ],
    [
      [-1, -1],
      [2, 2],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [4, 7],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [4, 14],
      [-1, -1],
    ],
    [
      [3, 1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [5, 7],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [5, 14],
    ],
    [
      [4, 0],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [6, 7],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [6, 14],
    ],
    [
      [5, 0],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [7, 7],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [7, 14],
    ],
    [
      [6, 0],
      [7, 2],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
      [7, 7],
      [99, 99],
      [7, 7],
      [7, 8],
      [7, 9],
      [7, 10],
      [7, 11],
      [7, 12],
      [8, 14],
    ],
    [
      [7, 0],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [7, 7],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [9, 14],
    ],
    [
      [8, 0],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [8, 7],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [10, 14],
    ],
    [
      [9, 0],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [9, 7],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [11, 13],
    ],
    [
      [-1, -1],
      [10, 0],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [10, 7],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [12, 12],
      [-1, -1],
    ],
    [
      [-1, -1],
      [-1, -1],
      [11, 1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [11, 7],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [13, 11],
      [-1, -1],
      [-1, -1],
    ],
    [
      [12, 2],
      [12, 2],
      [-1, -1],
      [12, 2],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [12, 7],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [14, 10],
      [-1, -1],
      [12, 12],
      [12, 12],
    ],
    [
      [12, 2],
      [12, 2],
      [-1, -1],
      [-1, -1],
      [13, 3],
      [14, 4],
      [14, 5],
      [14, 6],
      [14, 7],
      [14, 8],
      [14, 9],
      [-1, -1],
      [-1, -1],
      [12, 12],
      [12, 12],
    ],
  ];

  return (
    //set the tiles to display the players on the current tile here
    <div className="mt-16 p-4">
      <section className="flex flex-col items-center justify-center">
        <span className="flex flex-row py-2 items-center justify-center">
          {" "}
        </span>
        <span>
          {board.map((col, indexCol) => {
            return (
              <div className="flex flex-row" key={indexCol}>
                {col.map((row, indexRow) => {
                  return (
                    <div
                      className={`flex flex-col w-6 h-6 rounded-2xl items-center justify-center text-slate-900 cursor-default ${
                        initialiseGameBoard(indexRow, indexCol)
                          ? "border border-sky-400"
                          : ""
                      } ${colourPlayerTile(row)} ${
                        selectedPiece[0] === indexCol &&
                        selectedPiece[1] === indexRow &&
                        isCurrentPlayerTile(indexCol, indexRow, turnPlayer)
                          ? "ring-8"
                          : ""
                      } ${
                        isCurrentPlayerTile(indexCol, indexRow, turnPlayer)
                          ? "ring-4 hover:cursor-pointer"
                          : ""
                      }`}
                      key={
                        "R" +
                        indexRow +
                        "C" +
                        indexCol +
                        board[indexCol][indexRow].toString()
                      }
                      onClick={(e) => {
                        handleSelectPiece(e, indexCol, indexRow);
                        console.log(indexCol, indexRow);
                      }}
                    >
                      {isPlayerTile(indexCol, indexRow) ? (
                        board[indexCol][indexRow]
                      ) : (
                        <p>&nbsp;</p>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </span>
      </section>
      <section>
        <span
          className={`flex flex-row items-center justify-center mt-7 ${
            darkMode ? "text-neutral-200" : "text-neutral-950"
          }`}
        >
          Player {turnPlayer} turn
          {diceRoll !== 0 && <p>: Dice rolled {diceRoll}</p>}
        </span>
        <span
          className={`flex flex-row items-center justify-center mt-2 ${
            darkMode ? "text-neutral-200" : "text-neutral-950"
          }`}
        >
          {errorMessage &&
          (diceRoll || (selectedPiece[0] === -1 && selectedPiece[1] === -1)) ? (
            <p>{errorMessage}</p>
          ) : (
            <p>&nbsp;</p>
          )}
        </span>
      </section>
      <section className="flex items-center justify-between">
        <div className="flex flex-col items-center justify-center mt-5">
          <p
            className={`${darkMode ? "text-neutral-200" : "text-neutral-950"}`}
          >
            Legend
          </p>
          <div className="flex flex-col items-start border py-1 px-2 justify-center bg-slate-200 bg-opacity-20">
            <span className="flex justify-center items-center bg-purple-300 rounded-lg text-slate-800 px-2 my-0.5">
              Player 1: Purple
            </span>
            <span className="flex justify-center items-cente bg-pink-400 rounded-lg text-slate-800 px-2 my-0.5">
              Player 2: Pink
            </span>
            <span className="flex justify-center items-center bg-orange-300 rounded-lg text-slate-800 px-2 my-0.5">
              Player 3: Orange
            </span>
            <span className="flex justify-center items-center bg-red-200 rounded-lg text-slate-800 px-2 my-0.5">
              Player 4: Beige
            </span>
          </div>
        </div>
        <div className="menu-border p-0.5 rounded-sm">
          <div className="menu flex flex-col">
            <p className="bg-slate-400 py-0.5 border-2 border-slate-600 text-center">
              Make move
            </p>
            <span
              className="w-full px-2 py-0.5 border-b-2 border-b-cyan-200 menu-button hover:cursor-pointer"
              onClick={handleDiceRoll}
            >
              Roll dice
            </span>
            <span
              className="w-full px-2 py-0.5 menu-button hover:cursor-pointer"
              onClick={moveSelectedPiece}
            >
              Move selected piece
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AirplaneGameBoard;
