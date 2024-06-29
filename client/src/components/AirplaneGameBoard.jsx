import React, { useState, useEffect } from "react";

const createBoard = (Players) => {
  const newBoard = [];
  for (let i = 0; i < 15; i++) {
    newBoard.push([...Array(15)]);
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

const AirplaneGameBoard = (Props) => {
  const { players } = Props;
  const [turnPlayer, setTurnPlayer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [board, setBoard] = useState(createBoard(players));

  const initialiseGameBoard = (row, col) => {
    //checks if the part of the board should be lighted up
    return (
      checkCorners(row, col) ||
      checkCentral(row, col) ||
      checkSpecialTiles(row, col)
    );
  };

  const checkCorners = (row, col) => {
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

  const checkCentral = (row, col) => {
    //checks the central of the board to be lighted up
    if (row === 7 || col === 7) {
      //checks for the central cross
      return true;
    }
    return false;
  };

  const checkSpecialTiles = (row, col) => {
    //checks for additional tiles that specific without a pattern
    if (
      (row === 1 && col === 3) ||
      (row === 3 && col === 1) ||
      (row === 2 && col === 2) ||
      (row === 11) & (col === 1) ||
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

  const isPlayerTile = (indexCol, indexRow) => {
    const item = board[indexCol][indexRow];
    return item === 1 || item === 2 || item === 3 || item === 4;
  };

  const colourPlayerTile = (item) => {
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
                      className={`flex flex-col w-7 h-7 rounded-2xl items-center justify-center text-slate-900 ${
                        initialiseGameBoard(indexRow, indexCol)
                          ? "border border-sky-400 hover:ring-4"
                          : ""
                      } ${colourPlayerTile(row)}`}
                      key={indexRow}
                    >
                      {isPlayerTile(indexCol, indexRow)
                        ? board[indexCol][indexRow]
                        : ""}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </span>
      </section>
      <section>
        <span className="flex flex-col items-center justify-center mt-7">
          {"Player's x turn"}
        </span>
      </section>
      <section className="flex items-start">
        <div className="flex flex-col items-center justify-center mt-5">
          Legend
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
      </section>
    </div>
  );
};

export default AirplaneGameBoard;

//airplane gameboard that only lines the outer section with dice rolls
//check if it is possible to use java instead of javascript for the logic of the gameboard
//animation for dice roll
