import Product from "../models/product.model.js";

// ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const { category, subcategory, featured } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (featured) filter.featuredItem = featured === "true";

    const products = await Product.find(filter);
    res.status(200).json({message:"Product fetched successfully", data:products});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Products", error: error.message });
  }
};

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, price, category,availibity,featuredItem, description, image, subcategory } = req.body;
    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ message: "Name, Price and category required" });
    }

    const newProduct = new Product({
      name,
      price,
      availibity,
      featuredItem,
      category,
      description,
      image,
      subcategory: subcategory || "others",
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product Added Successfully", data: newProduct });
  } catch (error) {
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
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated successfully" }, product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: err.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req,res) =>{
try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product) return res.status(404).json({message:"product not found"});
    res.status(200).json({message:"Product deleted"});
} catch (error) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
}
};
