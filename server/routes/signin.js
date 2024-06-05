require("dotenv").config();

const express = require("express");
const router = express.Router();
const users = require("../models/userModel");
const jwt = require("jsonwebtoken");

let refreshTokens = []; // implement redis cache

router.get("/:email/:password", async (req, res) => {
  try {
    let userInfo = await users.findOne({ email: req.params.email });
    if (userInfo !== null) {
      // confirm match with password and fufill request, else deny
      if (userInfo.password === req.params.password) {
        const user = {
          email: userInfo.email,
          cart: userInfo.cart,
          address: userInfo.address,
        };
        const accessToken = jwt.sign(user, process.env.TOKEN_SECRET, {
          expiresIn: "30m",
        });
        const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET);
        refreshTokens.push(refreshToken);
        res
          .status(200)
          .json({ accessToken: accessToken, refreshToken: refreshToken });
      } else {
        res.status(400).json("Incorrect password");
      }
    } else {
      res.status(404).json(`User with email ${req.params.email} doesn't exist`);
    }
  } catch (err) {
    res.status(500).json("server error");
  }
});

router.post("/refresh", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const newUser = {
      email: user.email,
      cart: user.cart,
      address: user.address,
    };
    const accessToken = jwt.sign(newUser, process.env.TOKEN_SECRET, {
      expiresIn: "30m",
    });
    res.status(200).json({ accessToken: accessToken });
  });
});

router.delete("/logout", (req, res) => {
  try {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.status(200).json("user has logged out");
  } catch (err) {
    res.status(500).json("server error logging out user");
  }
});

module.exports = router;
