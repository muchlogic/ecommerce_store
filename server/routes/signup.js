const express = require("express");
const router = express.Router();
const users = require("../models/userModel");

router.post("/", async (req, res) => {
  try {
    // 1. check db for email, if it exists respond with error (look up http error code)
    let user_exists =
      (await users.findOne({ email: req.body.email })) != null ? true : false;
    // 2. if it doesnt exist, add it to db
    if (user_exists == false) {
      // create user and save
      const user = new users({
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        orders: [],
      });
      await user.save();
      res.status(200).json("User created successfully");
    } else {
      // user does not exist, respond with error and correct http code
      res.status(409).json("User already exists");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("server error");
  }
});

module.exports = router;
