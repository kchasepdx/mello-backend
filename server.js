import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import checkoutRoute from "./routes/checkoutRoute.js";
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/mello";

dotenv.config();

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

const app = express();

app.use(
  cors({
    Origin: "https://mellostore.herokuapp.com",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/checkout", checkoutRoute);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("mongoose connected");
  console.log(db.name);
  console.log("host", db.host);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("server started", process.env.PORT || 5000);
});
