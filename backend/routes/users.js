import express from "express";
import {
  getTZFEScores,
  updateTZFEScores,
  getTTTScores,
  updateTTTScores,
  createTTTScores,
  deleteUser,
  getUsers,
  getUserStatistics,
} from "../controllers/users.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json("testing authentication!");
});

router.get("/user-statistics/:uid", getUserStatistics);

router.get("/user-data", getUsers);

router.delete("/user-data/:uid", deleteUser);

router.get("/scoreboard-tzfe/:size", getTZFEScores);

router.post("/update/scoreboard-tzfe/:size", updateTZFEScores);

router.put("/update/scoreboard-ttt/:size", updateTTTScores);

router.post("/create/scoreboard-ttt/:size", createTTTScores);

router.get("/scoreboard-ttt/:size", getTTTScores);

export default router;
