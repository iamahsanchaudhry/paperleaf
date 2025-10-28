import Product from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";
// ALL PRODUCTS, GET PRODUCTS BY CATEGORY, BY SEARCHED, FEATURED PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const { category, subcategory, featured, search } = req.query;
    const filter = {};

    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }
    if (subcategory) {
      filter.subcategory = { $regex: new RegExp(`^${subcategory}$`, "i") };
    }
    if (featured) filter.featuredItem = featured === "true";
    if (search) {
      filter.name = { $regex: search, $options: "i" }; // case-insensitive
    }
    const products = await Product.find(filter);
    res
      .status(200)
      .json({ message: "Product fetched successfully", data: products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Products", error: error.message });
  }
};

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      availibity,
      featuredItem,
      description,
      subcategory,
    } = req.body;

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ message: "Name, Price and category required" });
    }

    let imageUrl = "";
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    const newProduct = new Product({
      name,
      price,
      availibity,
      featuredItem,
      category,
      description,
      image: imageUrl,
      subcategory: subcategory || "others",
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product Added Successfully", data: newProduct });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error Adding Product", error: error.message });
  }
};

//GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product found", data: product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Product", error: error.message });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = { ...req.body };

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.file) {
      if (product.image) {
        //Deleting old img
        const segments = product.image.split("/");
        const filename = segments[segments.length - 1].split(".")[0];
        await cloudinary.uploader.destroy(`products/${filename}`);
      }

      // Upload new image
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      updateData.image = result.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error updating product", error: err.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "product not found" });

    if (product.image) {
      if (product.image) {
        const segments = product.image.split("/");
        const filename = segments[segments.length - 1].split(".")[0];
        await cloudinary.uploader.destroy(`products/${filename}`);
      }
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: err.message });
  }
};
