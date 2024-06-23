import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // check for existing user
  const query = "SELECT * FROM user WHERE username = ?";

  db.query(query, [req.body.username], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (req.body.username.length === 0 || req.body.password.length === 0)
      return res.status(400).json("Invalid inputs!");
    if (data.length) return res.status(409).json("User already exists!");

    // hash the password and create a new user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO user(`username`, `password`) VALUES(?, ?)";

    db.query(q, [req.body.username, hash], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created!");
    });
  });
};

export const login = (req, res) => {
  // check if username exists
  const query = "SELECT * FROM user WHERE username = ?";

  db.query(query, [req.body.username], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length === 0) return res.status(404).json("User not found");

    // check if the password is correct
    const correctPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!correctPassword) return res.status(400).json("Wrong password!");

    const token = jwt.sign({ id: data[0].uid }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has logged out");
};
