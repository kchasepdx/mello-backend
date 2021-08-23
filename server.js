import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./backend/routes/userRoute.js";
import productRoute from "./backend/routes/productRoute.js";
import checkoutRoute from "./backend/routes/checkoutRoute.js";
const uri = process.env.MONGODB_URI;

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
    });
    mongoose.set("useCreateIndex", true);
    console.log("mongoose connected");
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    // db.once("open", function () {
    //   console.log(db.name);
    //   console.log("host", db.host);
    // });
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

connectDB();

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

app.listen(process.env.PORT, () => {
  console.log("server started at https://mello-store-backend.herokuapp.com/");
});
