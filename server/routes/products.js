// change route to products for simplicity
const express = require("express");
const router = express.Router();
const products = require("../models/sellerProductModel");
const users = require("../models/userModel");
const jwt = require("jsonwebtoken");

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
router.post("/review", authenticateToken, async (req, res) => {
  try {
    let result = await products.updateOne(
      { productID: req.body.productID },
      {
        $push: {
          reviews: {
            email: req.user.email, // store email of reviewer for editing
            name: req.body.name,
            rating: req.body.rating,
            title: req.body.title,
            desc: req.body.desc,
            date: new Date(),
          },
        },
      }
    );
    let result2 = await users.updateOne(
      { email: req.user.email },
      {
        $push: {
          reviews: {
            productID: req.body.productID,
            name: req.body.name,
            rating: req.body.rating,
            title: req.body.title,
            desc: req.body.desc,
            date: new Date(),
          },
        },
      }
    );
    let product = await products.findOne({ productID: req.body.productID }); // retrieve updated product

    res.status(200).json({ product: product });
  } catch (error) {
    res.status(500).json(`internal server error`);
  }
});

// add review to product
router.post("/update-review", authenticateToken, async (req, res) => {
  try {
    let updatedReview = {
      email: req.user.email,
      name: req.body.name,
      rating: req.body.rating,
      title: req.body.title,
      desc: req.body.desc,
      date: new Date(),
    };

    let updatedReview2 = {
      productID: req.body.productID,
      name: req.body.name,
      rating: req.body.rating,
      title: req.body.title,
      desc: req.body.desc,
      date: new Date(),
    };

    let result = await products
      .findOne({ productID: req.body.productID })
      .updateOne(
        { "reviews.email": req.user.email },
        { $set: { "reviews.$": updatedReview } }
      );

    let result2 = await users
      .findOne({ email: req.user.email })
      .updateOne(
        { "reviews.productID": req.body.productID },
        { $set: { "reviews.$": updatedReview2 } }
      );

    // let product = await products.findOne({ productID: req.body.productID }); // retrieve updated product

    res.status(200).json("updated");
  } catch (error) {
    res.status(500).json(`internal server error`);
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
