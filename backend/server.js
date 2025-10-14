import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();
connectDB();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Server is running");
})

app.use("/api/products",productRoutes);

app

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})