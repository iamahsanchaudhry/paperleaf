import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    availibity:{
      type: Boolean,
      required: true,
    },
    featuredItem:{
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["stationary", "gift","decor", "other"],
      default: "stationary",
    },
    subcategory: {
      type: String,
      trim: true, 
      default: "others",
    },
    image: {
      type: String, // URL if using Cloudinary later
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
