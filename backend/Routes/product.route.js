import express from 'express'
import { uploadProductImages } from '../Middleware/Multer.js';
import { addProduct,decreaseStock,increaseStock,listProduct, removeProduct } from '../Controllers/product.controller.js';



export const productRouter = express.Router()
productRouter.post("/add", uploadProductImages, addProduct);
productRouter.get("/list", listProduct);
productRouter.delete("/remove", removeProduct);
productRouter.post("/increase-stock",increaseStock)
productRouter.post("/decrease-stock",decreaseStock)


