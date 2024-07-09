import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { AirplaneBoard } from "../class/AirplaneBoard.tsx";

const createBoard = (Players: number) => {
  const newBoard: number[][] = [];
  for (let i = 0; i < 15; i++) {
    newBoard.push([...Array(15).fill(-1)]);
  }
  //initialise to the number of players, 4 playing pieces for each player in each corner
  if (Players >= 2) {
    //set the bottom right and left corners of the board to contain the players
    //for the first player
    newBoard[13][0] = 10;
    newBoard[13][1] = 11;
    newBoard[14][0] = 12;
    newBoard[14][1] = 13;
    //for the 2nd player
    newBoard[13][13] = 20;
    newBoard[13][14] = 21;
    newBoard[14][13] = 22;
    newBoard[14][14] = 23;
  }
  if (Players >= 3) {
    //set the bottom right, left and top right corners of the board to contain the players
    newBoard[0][13] = 30;
    newBoard[0][14] = 31;
    newBoard[1][13] = 32;
    newBoard[1][14] = 33;
  }
  if (Players >= 4) {
    //set all 4 corners of the board to contain the players
    newBoard[0][0] = 40;
    newBoard[0][1] = 41;
    newBoard[1][0] = 42;
    newBoard[1][1] = 43;
  }
  return newBoard;
};

interface AirplaneGameBoardProps {
  players: number;
  airplaneBoard: AirplaneBoard;
}

const AirplaneGameBoard: React.FC<AirplaneGameBoardProps> = ({
  players,
  airplaneBoard,
}) => {
  const [turnPlayer, setTurnPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [board, setBoard] = useState(createBoard(players));
  const [selectedPiece, setSelectedPiece] = useState([-1, -1]);
  const [diceRoll, setDiceRoll] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [pieceNumber, setPieceNumber] = useState(-1);
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

  const playerTiles = (indexCol: number, indexRow: number): number[][] => {
    const playerState = airplaneBoard.getBoardState();
    const filteredPlayerState = playerState.filter(
      (coordinates) =>
        coordinates[0] === indexCol && coordinates[1] === indexRow
    );
    return filteredPlayerState;
  };

  const isCurrentPlayerTile = (
    indexCol: number,
    indexRow: number,
    player: number
  ) => {
    const currentState = airplaneBoard
      .getBoardState()
      .filter(
        (coordinates) =>
          coordinates[2] === player &&
          coordinates[0] === indexCol &&
          coordinates[1] === indexRow
      );
    return currentState.length > 0;
  };

  const colourPlayerTile = (indexCol: number, indexRow: number) => {
    const playerTile = airplaneBoard
      .getBoardState()
      .filter(
        (coordinates) =>
          coordinates[0] === indexCol && coordinates[1] === indexRow
      );
    if (playerTile.length === 0) {
      return "";
    }
    switch (playerTile[0][2]) {
      case 1:
        return "bg-purple-300 bg-opacity-100";
      case 2:
        return "bg-pink-400 bg-opacity-100";
      case 3:
        return "bg-orange-300 bg-opacity-100";
      case 4:
        return "bg-red-200 bg-opacity-100";
      default:
        return "";
    }
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
    const playerIndex = airplaneBoard
      .getBoardState()
      .filter(
        (coordinates) => coordinates[0] === row && coordinates[1] === col
      );
    if (playerIndex.length === 0) return;
    else if (turnPlayer === playerIndex[0][2]) {
      setSelectedPiece([row, col]);
      setPieceNumber(playerIndex[0][3]);
    }
  };

  const startNextTurn = () => {
    setTurnPlayer(turnPlayer < players ? turnPlayer + 1 : 1);
    setErrorMessage("");
    setDiceRoll(0);
    setSelectedPiece([-1, -1]);
    setPieceNumber(-1);
  };

  const moveSelectedPiece = (
    e: React.MouseEvent<HTMLSpanElement>,
    pieceNumber: number
  ) => {
    if (diceRoll === 0) {
      setErrorMessage("Roll dice first!");
      return;
    }
    if (selectedPiece[0] === -1 && selectedPiece[1] === -1) {
      setErrorMessage("Select piece to move!");
      return;
    }

    const oldCoordinates = airplaneBoard.getCoordinates(
      turnPlayer,
      pieceNumber
    );
    console.log("Old coordinates: ", oldCoordinates);
    const resetPosition = airplaneBoard.moveTile(
      turnPlayer,
      pieceNumber,
      diceRoll
    );
    console.log("Result of moveTile: ", resetPosition);
    const newCoordinates = airplaneBoard.getCoordinates(
      turnPlayer,
      pieceNumber
    );
    console.log("New coordinates: ", newCoordinates);
    if (resetPosition[0] !== -1 && resetPosition[1] !== -1) {
      startNextTurn();
    } else setErrorMessage("Invalid move! Move another piece");
    console.log(airplaneBoard.getBoardState());
  };

  const colourCrossTile = (row: number, col: number) => {
    if (board[col][row] !== -1) {
      return "";
    } else if (colourPlayerTile(col, row)) {
      return "";
    } else if (row === 7) {
      if (col < 7) {
        return "bg-orange-200 bg-opacity-60";
      } else if (col > 7) {
        return "bg-purple-400 bg-opacity-60";
      }
    } else if (col === 7) {
      if (row < 7) {
        return "bg-beige-300 bg-opacity-60";
      } else if (row > 7) {
        return "bg-pink-300 bg-opacity-60";
      }
    }
    return "";
  };

  return (
    //set the tiles to display the players on the current tile here
    <div className="mt-16 p-4">
      <section className="flex flex-col items-center justify-center">
        <span className="flex flex-row py-2 items-center justify-center">
          {" "}
        </span>
        <span className="cursor-default select-none">
          {board.map((col, indexCol) => {
            return (
              <div className="flex flex-row" key={indexCol}>
                {col.map((row, indexRow) => {
                  return (
                    <div
                      className={`flex flex-col w-6 h-6 rounded-2xl items-center justify-center text-slate-900 cursor-default
                         ${colourCrossTile(indexRow, indexCol)} 
                         ${
                           initialiseGameBoard(indexRow, indexCol)
                             ? "border border-sky-400"
                             : ""
                         } ${colourPlayerTile(indexCol, indexRow)} ${
                        selectedPiece[0] === indexCol &&
                        selectedPiece[1] === indexRow &&
                        isCurrentPlayerTile(indexCol, indexRow, turnPlayer)
                          ? "ring-8 animate-pulse duration-[25]"
                          : ""
                      } ${
                        isCurrentPlayerTile(indexCol, indexRow, turnPlayer)
                          ? "ring-4 hover:cursor-pointer"
                          : ""
                      }`}
                      key={
                        "Row" +
                        indexRow +
                        "Col" +
                        indexCol +
                        playerTiles(indexCol, indexRow).toString()
                      }
                      onClick={(e) => {
                        handleSelectPiece(e, indexCol, indexRow);
                        console.log("Actual Index: ", indexCol, indexRow);
                      }}
                    >
                      {playerTiles(indexCol, indexRow).length > 0 ? (
                        playerTiles(indexCol, indexRow)[0][2]
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
              onClick={(e) => {
                moveSelectedPiece(e, pieceNumber);
              }}
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
