import { db } from "../db.js";

export const getUsers = (req, res) => {
  const query = "SELECT * FROM user";

  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    } else if (data.length === 0) {
      return res.status(400).json("No users found!");
    }
    return res.status(200).json(data);
  });
};

export const deleteUser = (req, res) => {
  const userId = req.params.uid;

  const query = "DELETE FROM user WHERE uid = ?";

  db.query(query, [userId], (err, data) => {
    if (err) {
      return res.json(err);
    }
    res.status(200).json("User successfully deleted!");
  });
};

export const getTZFEScores = (req, res) => {
  const boardSize = req.params.size;
  const queryLimit = req.query?.limit || 5;

  const query =
    "SELECT * FROM scoreboard WHERE category = ? AND game = 'tzfe' ORDER BY score DESC LIMIT ?";

  db.query(query, [boardSize, parseInt(queryLimit)], (err, data) => {
    if (err) {
      return res.json(err);
    } else if (data.length === 0) return res.status(400).json("No data found!");
    res.status(200).json(data);
  });
};

export const updateTZFEScores = (req, res) => {
  const boardSize = req.params.size;

  const query =
    "INSERT INTO scoreboard(`uid`, `username`, `score`, `date`, `category`, `game`) VALUES(?, ?, ?, ?, ?, 'tzfe')";

  db.query(
    query,
    [
      req.body.uid,
      req.body.username,
      req.body.score,
      req.body.datetime,
      boardSize,
    ],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      res.status(200).json("Scoreboard updated!");
    }
  );
};
export const getTTTScores = (req, res) => {
  const boardSize = req.params.size;
  const queryLimit = req.query?.limit || 5;

  const query =
    "SELECT * FROM scoreboard WHERE category = ? AND game = 'ttt' ORDER BY score DESC LIMIT ?";

  db.query(query, [boardSize, parseInt(queryLimit)], (err, data) => {
    if (err) {
      return res.json(err);
    } else if (data.length === 0) return res.status(400).json("No data found!");
    res.status(200).json(data);
  });
};

export const createTTTScores = (req, res) => {
  const boardSize = req.params.size;

  const query =
    "INSERT INTO scoreboard(`uid`, `username`, `score`, `date`, `category`, `game`) VALUES(?, ?, 1, ?, ?, 'ttt')";

  db.query(
    query,
    [req.body.uid, req.body.username, req.body.datetime, boardSize],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      res.status(200).json("Scoreboard updated!");
    }
  );
};

export const updateTTTScores = (req, res) => {
  const boardSize = req.params.size;

  const query =
    "UPDATE scoreboard SET score = score + 1, date = ? WHERE uid = ? AND username = ? AND category = ? AND game = 'ttt'";

  db.query(
    query,
    [req.body.datetime, req.body.uid, req.body.username, boardSize],
    (err, data) => {
      if (err) {
        return res.json(err);
      } else if (data.affectedRows === 0) {
        return res.status(400).json("No data found!");
      }
      res.status(200).json("Scoreboard updated!");
    }
  );
};
