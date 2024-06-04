const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// user schema for users
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
    require: true,
  },
});

const User = model("User", userSchema);
module.exports = User;
