// change route to products for simplicity
const express = require("express");
const router = express.Router();
const products = require("../models/sellerProductModel");

// post new product to db
// body contains product info:
// name
// productID
// price
// seller
// catagory
router.post("/", async (req, res) => {
  try {
    // check if product exists
    let not_found =
      (await products.findOne({ productID: req.body.productID })) == null
        ? true
        : false;
    if (not_found) {
      let new_product = new products({
        name: req.body.name,
        productID: req.body.productID,
        price: req.body.price,
        seller: req.body.seller,
        category: req.body.category,
      });
      await new_product.save();
      res.status(200).json("product successfully created");
    } else {
      // err
      res.status(400).json(`Product with ID: ${req.body.productID} exists`);
    }
  } catch (error) {
    res.status(500).json(`internal server error`);
  }
});

// get all products from db
router.get("/all", async (req, res) => {
  try {
    let all_products = await products.find();
    res.status(200).json(all_products);
  } catch (error) {
    res.status(500).json(`internal server error`);
  }
});

// get product by id
router.get("/product/:id", async (req, res) => {
  try {
    let product = await products.findOne({ productID: req.params.id });
    if (product === null) {
      res.status(404).json("category does not exist");
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json(`internal server error`);
  }
});

// get products by catagory
router.get("/filter/:category", async (req, res) => {
  try {
    let products_by_category = await products.find({
      category: req.params.category,
    });

    if (products_by_category.length === 0) {
      res.status(404).json("category does not exist");
    } else {
      res.status(200).json(products_by_category);
    }
  } catch (error) {
    res.status(500).json(`internal server error`);
  }
});

// get all distinct catagories
router.get("/categories", async (req, res) => {
  try {
    let all_categories = await products.distinct("category");
    res.status(200).json(all_categories);
  } catch (error) {
    res.status(500).json(`internal server error`);
  }
});

// add review to product
router.post("/review", async (req, res) => {
  try {
    let result = await products.updateOne(
      { productID: req.body.productID },
      {
        $push: {
          reviews: {
            name: req.body.name,
            rating: req.body.rating,
            desc: req.body.desc,
          },
        },
      }
    );

    res.status(200).json("review created");
  } catch (error) {
    res.status(500).json(`internal server error`);
  }
});

module.exports = router;
