require("dotenv").config();

const express = require("express");
const router = express.Router();
const users = require("../models/userModel");
const jwt = require("jsonwebtoken");

router.get("/:email/:password", async (req, res) => {
  try {
    let userInfo = await users.findOne({ email: req.params.email });
    if (userInfo !== null) {
      // confirm match with password and fufill request, else deny
      if (userInfo.password === req.params.password) {
        const accessToken = jwt.sign(
          {
            email: userInfo.email,
            cart: userInfo.cart,
            address: userInfo.address,
          },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "30m",
          }
        );
        res.status(200).json(accessToken);
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

module.exports = router;
