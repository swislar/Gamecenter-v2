const boardEdges = [
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

// TODO: PREVENT MOVEMENT IF WIN
// TODO: SCORE NUMBER OF TILES IN THE WINNING ZONE
// TODO: LEADERBOARDS WITH BACKEND DB

class AirplaneTile {
  private player: number;
  private pieceNumber: number;
  private originRow: number;
  private originCol: number;
  private row: number;
  private col: number;

  constructor(player: number, row: number, col: number, pieceNumber: number) {
    this.player = player;
    this.row = row;
    this.col = col;
    this.originRow = row;
    this.originCol = col;
    this.pieceNumber = pieceNumber;
  }

  getPlayer(): number {
    return this.player;
  }

  getRow(): number {
    return this.row;
  }

  getCol(): number {
    return this.col;
  }

  getPieceNumber(): number {
    return this.pieceNumber;
  }

  getCoordinates(): number[] {
    return [this.getRow(), this.getCol()];
  }

  getOriginPosition(): number[] {
    return [this.originRow, this.originCol, this.player];
  }

  checkWin(): boolean {
    if (this.row === 7 && this.col === 7) {
      return true;
    }
    return false;
  }

  updatePosition(row: number, col: number): void {
    this.row = row;
    this.col = col;
    return;
  }

  resetPosition(): void {
    this.updatePosition(this.originRow, this.originCol);
  }

  finalMovePosition(steps: number): number[] {
    let currentRow = this.row;
    let currentCol = this.col;
    let i = 0;
    if (this.player === 1 && currentRow === 14 && currentCol === 7) {
      i = 1;
      currentRow = 13;
      currentCol = 7;
    } else if (this.player === 2 && currentRow === 7 && currentCol === 14) {
      i = 1;
      currentRow = 7;
      currentCol = 13;
    } else if (this.player === 3 && currentRow === 0 && currentCol === 7) {
      i = 1;
      currentRow = 1;
      currentCol = 7;
    } else if (this.player === 4 && currentRow === 7 && currentCol === 0) {
      i = 1;
      currentRow = 7;
      currentCol = 1;
    }
    for (i; i < steps; i++) {
      const newPos = boardEdges[currentRow][currentCol];
      currentRow = newPos[0];
      currentCol = newPos[1];
      if (currentRow === 99 && currentCol === 99) {
        break;
      }
    }
    return [currentRow, currentCol];
  }

  moveTile(steps: number): void {
    let currentRow = this.row;
    let currentCol = this.col;
    let i = 0;
    if (this.player === 1 && currentRow === 14 && currentCol === 7) {
      i = 1;
      currentRow = 13;
      currentCol = 7;
    } else if (this.player === 2 && currentRow === 7 && currentCol === 14) {
      i = 1;
      currentRow = 7;
      currentCol = 13;
    } else if (this.player === 3 && currentRow === 0 && currentCol === 7) {
      i = 1;
      currentRow = 1;
      currentCol = 7;
    } else if (this.player === 4 && currentRow === 7 && currentCol === 0) {
      i = 1;
      currentRow = 7;
      currentCol = 1;
    }
    for (i; i < steps; i++) {
      const newPos = boardEdges[currentRow][currentCol];
      currentRow = newPos[0];
      currentCol = newPos[1];
    }
    this.updatePosition(currentRow, currentCol);
  }
}

export class AirplaneBoard {
  private players: number;
  private playerOneTiles: AirplaneTile[];
  private playerTwoTiles: AirplaneTile[];
  private playerThreeTiles: AirplaneTile[];
  private playerFourTiles: AirplaneTile[];

  constructor(players: number) {
    switch (players) {
      case 2:
        this.playerOneTiles = [
          new AirplaneTile(1, 13, 0, 0),
          new AirplaneTile(1, 13, 1, 1),
          new AirplaneTile(1, 14, 0, 2),
          new AirplaneTile(1, 14, 1, 3),
        ];
        this.playerTwoTiles = [
          new AirplaneTile(2, 13, 13, 0),
          new AirplaneTile(2, 13, 14, 1),
          new AirplaneTile(2, 14, 13, 2),
          new AirplaneTile(2, 14, 14, 3),
        ];
        return;
      case 3:
        this.playerOneTiles = [
          new AirplaneTile(1, 13, 0, 0),
          new AirplaneTile(1, 13, 1, 1),
          new AirplaneTile(1, 14, 0, 2),
          new AirplaneTile(1, 14, 1, 3),
        ];
        this.playerTwoTiles = [
          new AirplaneTile(2, 13, 13, 0),
          new AirplaneTile(2, 13, 14, 1),
          new AirplaneTile(2, 14, 13, 2),
          new AirplaneTile(2, 14, 14, 3),
        ];
        this.playerThreeTiles = [
          new AirplaneTile(3, 0, 13, 0),
          new AirplaneTile(3, 0, 14, 1),
          new AirplaneTile(3, 1, 13, 2),
          new AirplaneTile(3, 1, 14, 3),
        ];
        return;
      case 4:
        this.playerOneTiles = [
          new AirplaneTile(1, 13, 0, 0),
          new AirplaneTile(1, 13, 1, 1),
          new AirplaneTile(1, 14, 0, 2),
          new AirplaneTile(1, 14, 1, 3),
        ];
        this.playerTwoTiles = [
          new AirplaneTile(2, 13, 13, 0),
          new AirplaneTile(2, 13, 14, 1),
          new AirplaneTile(2, 14, 13, 2),
          new AirplaneTile(2, 14, 14, 3),
        ];
        this.playerThreeTiles = [
          new AirplaneTile(3, 0, 13, 0),
          new AirplaneTile(3, 0, 14, 1),
          new AirplaneTile(3, 1, 13, 2),
          new AirplaneTile(3, 1, 14, 3),
        ];
        this.playerFourTiles = [
          new AirplaneTile(4, 0, 0, 0),
          new AirplaneTile(4, 0, 1, 1),
          new AirplaneTile(4, 1, 0, 2),
          new AirplaneTile(4, 1, 1, 3),
        ];
        return;
    }
  }

  getPlayers(): number {
    return this.players;
  }

  getBoardState(): number[][] {
    const pOneCoordinates = this.getPlayerOneCoordinates();
    const pTwoCoordinates = this.getPlayerTwoCoordinates();
    const pThreeCoordinates = this.getPlayerThreeCoordinates();
    const pFourCoordinates = this.getPlayerFourCoordinates();
    let result: number[][] = [];
    result = result.concat(
      pOneCoordinates,
      pTwoCoordinates,
      pThreeCoordinates,
      pFourCoordinates
    );
    return result;
  }

  getCoordinates(player: number, piece: number): number[] {
    switch (player) {
      case 1:
        return this.getPlayerOneTiles()[piece].getCoordinates();
      case 2:
        return this.getPlayerTwoTiles()[piece].getCoordinates();
      case 3:
        return this.getPlayerThreeTiles()[piece].getCoordinates();
      case 4:
        return this.getPlayerFourTiles()[piece].getCoordinates();
      default:
        return [-1, -1];
    }
  }

  getPlayerOneTiles(): AirplaneTile[] {
    return this.playerOneTiles;
  }

  getPlayerOneCoordinates(): number[][] {
    let position: number[][] = [];
    let piece = 0;
    for (const tile of this.getPlayerOneTiles()) {
      const coordinates = tile.getCoordinates();
      position.push([...coordinates, 1, piece++]);
    }
    return position;
  }

  getPlayerTwoTiles(): AirplaneTile[] {
    return this.playerTwoTiles;
  }

  getPlayerTwoCoordinates(): number[][] {
    let position: number[][] = [];
    let piece = 0;
    for (const tile of this.getPlayerTwoTiles()) {
      const coordinates = tile.getCoordinates();
      position.push([...coordinates, 2, piece++]);
    }
    return position;
  }

  getPlayerThreeTiles(): AirplaneTile[] {
    return this.playerThreeTiles;
  }

  getPlayerThreeCoordinates(): number[][] {
    let position: number[][] = [];
    let piece = 0;
    for (const tile of this.getPlayerThreeTiles()) {
      const coordinates = tile.getCoordinates();
      position.push([...coordinates, 3, piece++]);
    }
    return position;
  }

  getPlayerFourTiles(): AirplaneTile[] {
    return this.playerFourTiles;
  }

  getPlayerFourCoordinates(): number[][] {
    let position: number[][] = [];
    let piece = 0;
    for (const tile of this.getPlayerFourTiles()) {
      const coordinates = tile.getCoordinates();
      position.push([...coordinates, 4, piece++]);
    }
    return position;
  }

  overlapTiles(player: number, piece: number, steps: number): boolean {
    let newPosition: number[];
    switch (player) {
      case 1:
        newPosition = this.getPlayerOneTiles()[piece].finalMovePosition(steps);
        break;
      case 2:
        newPosition = this.getPlayerTwoTiles()[piece].finalMovePosition(steps);
        break;
      case 3:
        newPosition =
          this.getPlayerThreeTiles()[piece].finalMovePosition(steps);
        break;
      case 4:
        newPosition = this.getPlayerFourTiles()[piece].finalMovePosition(steps);
        break;
      default:
        console.log("Default overlapTiles with player: ", player);
        newPosition = [-1, -1];
        break;
    }
    console.log("Expected new position: ", newPosition);
    const newRow = newPosition[0];
    const newCol = newPosition[1];
    if (newRow === 7 && newCol === 7) {
      return false;
    } else if (newRow === 99 && newCol === 99) {
      return true;
    }
    switch (player) {
      case 1:
        for (const coordinates of this.getPlayerOneCoordinates()) {
          if (coordinates[0] === newRow && coordinates[1] === newCol) {
            return true;
          }
        }
        return false;
      case 2:
        for (const coordinates of this.getPlayerTwoCoordinates()) {
          if (coordinates[0] === newRow && coordinates[1] === newCol) {
            return true;
          }
        }
        return false;
      case 3:
        for (const coordinates of this.getPlayerThreeCoordinates()) {
          if (coordinates[0] === newRow && coordinates[1] === newCol) {
            return true;
          }
        }
        return false;
      case 4:
        for (const coordinates of this.getPlayerFourCoordinates()) {
          if (coordinates[0] === newRow && coordinates[1] === newCol) {
            return true;
          }
        }
        return false;
      default:
        return false;
    }
  }

  capturedTile(player: number, piece: number, steps: number): number[] {
    let newPosition = [-1, -1];
    switch (player) {
      case 1:
        newPosition = this.getPlayerOneTiles()[piece].finalMovePosition(steps);
        break;
      case 2:
        newPosition = this.getPlayerTwoTiles()[piece].finalMovePosition(steps);
        break;
      case 3:
        newPosition =
          this.getPlayerThreeTiles()[piece].finalMovePosition(steps);
        break;
      case 4:
        newPosition = this.getPlayerFourTiles()[piece].finalMovePosition(steps);
        break;
    }
    const newRow = newPosition[0];
    const newCol = newPosition[1];
    if (newRow === 7 && newCol === 7) {
      return [-1, -1, -1];
    }
    let positions: number[][] = [];
    const pOneCoordinates = this.getPlayerOneCoordinates();
    const pTwoCoordinates = this.getPlayerTwoCoordinates();
    const pThreeCoordinates = this.getPlayerThreeCoordinates();
    const pFourCoordinates = this.getPlayerFourCoordinates();
    switch (player) {
      case 1:
        positions = positions.concat(
          pTwoCoordinates,
          pThreeCoordinates,
          pFourCoordinates
        );
        break;
      case 2:
        positions = positions.concat(
          pOneCoordinates,
          pThreeCoordinates,
          pFourCoordinates
        );
        break;
      case 3:
        positions = positions.concat(
          pOneCoordinates,
          pTwoCoordinates,
          pFourCoordinates
        );
        break;
      case 4:
        positions = positions.concat(
          pOneCoordinates,
          pTwoCoordinates,
          pThreeCoordinates
        );
        break;
      // 4 capture 1 works but 3 capture 2 fails
    }
    const captureCoordinates = positions.find(
      (coordinates, id) =>
        coordinates[0] === newRow && coordinates[1] === newCol
    );
    console.log("Capture coordinates available: ", positions);
    if (captureCoordinates) {
      console.log("Captured: ", captureCoordinates);
      return captureCoordinates;
    } else {
      console.log("Fail to capture");
      return [-1, -1, -1];
    }
  }

  moveTile(player: number, piece: number, steps: number): number[] {
    if (this.overlapTiles(player, piece, steps)) {
      return [-1, -1]; // To prevent starting next turn
    }
    const capturedTile = this.capturedTile(player, piece, steps);
    let foundTile: AirplaneTile | undefined;
    if (capturedTile[0] !== -1 && capturedTile[1] !== -1) {
      switch (capturedTile[2]) {
        case 1:
          foundTile = this.getPlayerOneTiles().find(
            (tile) =>
              tile.getRow() === capturedTile[0] &&
              tile.getCol() === capturedTile[1]
          );
          console.log(foundTile);
          break;
        case 2:
          foundTile = this.getPlayerTwoTiles().find(
            (tile) =>
              tile.getRow() === capturedTile[0] &&
              tile.getCol() === capturedTile[1]
          );
          console.log(foundTile);
          break;
        case 3:
          foundTile = this.getPlayerThreeTiles().find(
            (tile) =>
              tile.getRow() === capturedTile[0] &&
              tile.getCol() === capturedTile[1]
          );
          console.log(foundTile);
          break;
        case 4:
          foundTile = this.getPlayerFourTiles().find(
            (tile) =>
              tile.getRow() === capturedTile[0] &&
              tile.getCol() === capturedTile[1]
          );
          console.log(foundTile);
          break;
      }
    }
    switch (player) {
      case 1:
        this.getPlayerOneTiles()[piece].moveTile(steps);
        break;
      case 2:
        this.getPlayerTwoTiles()[piece].moveTile(steps);
        break;
      case 3:
        this.getPlayerThreeTiles()[piece].moveTile(steps);
        break;
      case 4:
        this.getPlayerFourTiles()[piece].moveTile(steps);
        break;
    }
    if (foundTile) {
      console.log("Position reset!");
      foundTile.resetPosition();
      return foundTile.getOriginPosition(); // Returns original position if captured
    } else return [99, 99]; // The move is sucessful (normal)
  }

  checkWinner(): number {
    let playerOneWins = 0;
    let playerTwoWins = 0;
    let playerThreeWins = 0;
    let playerFourWins = 0;
    for (const tile of this.getPlayerOneTiles()) {
      if (tile.checkWin()) {
        playerOneWins++;
      }
      if (playerOneWins === 4) {
        return 1;
      }
    }
    for (const tile of this.getPlayerTwoTiles()) {
      if (tile.checkWin()) {
        playerTwoWins++;
      }
      if (playerTwoWins === 4) {
        return 2;
      }
    }
    for (const tile of this.getPlayerThreeTiles()) {
      if (tile.checkWin()) {
        playerThreeWins++;
      }
      if (playerThreeWins === 4) {
        return 3;
      }
    }
    for (const tile of this.getPlayerFourTiles()) {
      if (tile.checkWin()) {
        playerFourWins++;
      }
      if (playerFourWins === 4) {
        return 4;
      }
    }
    return -1;
  }
}
