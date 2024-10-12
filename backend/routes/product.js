import express from "express";
import { createProduct, deleteProduct, getProduck, getProductById, updateProduct } from "../controller/product.js";

const route = express.Router();

route.get("/product", getProduck);
route.get("/product/:id", getProductById);
route.post("/product", createProduct);
route.patch("/product/:id", updateProduct);
route.delete("/product/:id", deleteProduct);

export default route;