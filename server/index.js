require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json()); // to parse http bodies
app.use(express.json());

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
const mongoDbUri = process.env.MONGO_URI;
console.log(process.env.MONGO_URI);
async function connect() {
  try {
    await mongoose.connect(mongoDbUri);
    console.log("connected to database");
  } catch (error) {
    console.error(error);
  }
}
connect();

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

const signinRouter = require("./routes/signin");
app.use("/signin", signinRouter);

const signupRouter = require("./routes/signup");
app.use("/signup", signupRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const productRouter = require("./routes/products");
app.use("/products", productRouter);

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
);

sslServer.listen(3000);
