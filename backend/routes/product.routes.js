import express from "express";
import {getProducts,createProduct,getProductById,updateProduct, deleteProduct} from "../controllers/product.controller.js"
const router = express.Router();
import {verifyAdmin} from '../middleware/verifyAdmin.js';
import upload from "../middleware/multer.js";
//Public Routes
router.get("/", getProducts);
router.get("/:id", getProductById);

//Admin Routes
router.post("/", verifyAdmin, upload.single("image"), createProduct);
router.put("/:id",verifyAdmin, upload.single("image"), updateProduct);
router.delete("/:id",verifyAdmin, deleteProduct);

export default router;  