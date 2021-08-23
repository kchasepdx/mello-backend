import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./backend/routes/userRoute.js";
import productRoute from "./backend/routes/productRoute.js";
import checkoutRoute from "./backend/routes/checkoutRoute.js";
const uri = process.env.MONGODB_URI;
const { MongoClient } = require("mongodb");

dotenv.config();

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const db = client.db("mello");
  // perform actions on the collection object
  client.close();
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("mongoose connected");
    console.log(db.name);
    console.log("host", db.host);
  });
});
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.set("useCreateIndex", true);

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/checkout", checkoutRoute);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

// const db = mongoose.connection;

app.listen(process.env.PORT, () => {
  console.log("server started at https://mello-store-backend.herokuapp.com/");
});
