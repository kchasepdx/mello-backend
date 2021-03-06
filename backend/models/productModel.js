import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    image: String,
    price: Number,
    brand: String,
    countInStock: Number,
  },
  { bufferCommands: false }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
