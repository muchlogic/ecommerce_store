const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// const reviewSchema = new Schema({
//   // nested schema for reviews
//   reviewer: {
//     type: String,
//     required: false,
//   },
//   text: {
//     type: Number,
//     required: false,
//   },
//   date: {
//     type: String,
//     required: false,
//   },
// });

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
  images: {
    type: Array,
    required: true, // Only if you want to make the image URL optional
  },
  reviews: {
    type: Array,
    required: false,
  },
  totalRating: {
    type: Number,
    required: false,
  },
});

const product = model("product", productSchema);
module.exports = product;
