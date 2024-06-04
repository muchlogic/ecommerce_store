const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// user schema for users
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  productID: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const product = model("product", productSchema);
module.exports = product;
