require("dotenv").config();

const express = require("express");
const router = express.Router();
const users = require("../models/userModel");
const jwt = require("jsonwebtoken");

router.post("/update-cart", authenticateToken, async (req, res) => {
  try {
    // 1. update cart with email
    let result = await users.updateOne(
      { email: req.user.email },
      { $set: { cart: req.body.cart } }
    );
    res.status(200).json("updated cart");
    // 2. examine update object for result
  } catch (err) {
    res.status(500).json("server error");
  }
});

router.get("/get-cart", authenticateToken, async (req, res) => {
  try {
    // 1. get cart with email
    let result = await users.findOne({ email: req.user.email });
    // 2. examine update object for result

    res.status(200).json(result.cart);
  } catch (err) {
    res.status(500).json("server error");
  }
});

router.post("/update-password", authenticateToken, async (req, res) => {
  try {
    // 1. update password with email
    let result = await users.updateOne(
      { email: req.user.email },
      { $set: { password: req.body.password } }
    );
    res.status(200).json("updated password");
    // 2. examine update object for result
  } catch (err) {
    res.status(500).json("server error");
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
