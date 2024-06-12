const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const financialSchema = new Schema({
  // nested schema for financial information
  cardNumber: {
    type: Number,
    required: false,
  },
  expirationDate: {
    type: String,
    required: false,
  },
  securityCode: {
    type: Number,
    required: false,
  },
  nameOnCard: {
    type: String,
    required: false,
  },
});

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
  orders: {
    // array of carts at time of order with date of order placed
    type: Array,
    require: true,
  },
  countryOrRegion: {
    type: String,
    require: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  province: {
    type: String,
    required: false,
  },
  postalCode: {
    type: String,
    required: false,
  },
  financial: financialSchema,
});

const User = model("User", userSchema);
module.exports = User;
