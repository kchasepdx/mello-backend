import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
// import Product from "./backend/models/productModel.js";
// import userRoute from "./backend/routes/userRoute.js";
// import productRoute from "./backend/routes/productRoute.js";
// import checkoutRoute from "./backend/routes/checkoutRoute.js";
const uri = process.env.MONGODB_URI;
const app = express();

dotenv.config();
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;
console.log("mongoose connected Database name:" + db.name);
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(db.name);
  console.log("host", db.host);
});

console.log("db", db.collections, db.db, db.models, db.port);

app.use(cors());
console.log("db", db);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

//   app.get("/editproducts", async (req, res) => {
//     try {
//       const products = await Product.find({});
//       if (products) {
//         res.send(products);
//       }
//     } catch (error) {
//       res.send({ message: "could not get products, " + error });
//     }
//   });

// const db = mongoose.connection;
// console.log("mongoose connected Database name:" + db.name);
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log(db.name);
//   console.log("host", db.host);
// // });

// const app = express();

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(morgan("tiny"));
// app.use("/api/users", userRoute);
// app.use("/api/products", productRoute);
// app.use("/api/checkout", checkoutRoute);

app.listen(process.env.PORT, () => {
  console.log("server started", process.env.PORT);
});

export { connectDB };
