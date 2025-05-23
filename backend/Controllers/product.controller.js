import { products as Product } from "../Models/product.model.js";
import fs from "fs";

const addProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    let image_filename = req.files["image"] ? req.files["image"][0].filename : "";
    let image_filenameB = req.files["imageB"] ? req.files["imageB"][0].filename : "";

    const { name, price, category, top, stock ,costPrice} = req.body;

    let productData = {
      name,
      price,
      costPrice,
      category,
      image: image_filename,
      imageB: image_filenameB,
      top,
      stock,
    };

    
    if (category === "sunglass" || category === "eyeglass") {
      const { FrameMaterial, TempleMaterial, FrameSize, FrameShape, Framecolor } = req.body;
      productData = {
        ...productData,
        FrameMaterial,
        TempleMaterial,
        FrameSize,
        FrameShape,
        Framecolor,
      };
    }

   
    if (category === "lens") {
      const { BaseCurve, Diameter, WaterContent, Packaging } = req.body;
      productData = {
        ...productData,
        BaseCurve,
        Diameter,
        WaterContent,
        Packaging,
      };
    }

    const product = new Product(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully!" });
  } catch (error) {
    console.error("Error Saving Product:", error);
    res.status(500).json({ success: false, message: "Error adding product" });
  }
};




const listProduct = async (req, res) => {
  try {
    const productList = await Product.find({});
    res.json({ success: true, data: productList });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const removeProduct = async (req, res) => {
  try {
    const productId = req.query.id;  
    console.log("Product ID:", productId); 

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    
    if (product.image) {
      fs.unlink(`uploads/${product.image}`, (err) => {
        if (err) console.error("Error deleting image:", err);
      });
    }

    if (product.imageB) {
      fs.unlink(`uploads/${product.imageB}`, (err) => {
        if (err) console.error("Error deleting imageB:", err);
      });
    }

   
    await Product.findByIdAndDelete(productId);
    res.json({ success: true, message: "Product Removed" });

  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const increaseStock = async (req, res) => {
  const { _id, count } = req.body;

  try {
    if (count && _id) {
   
      const product = await Product.findById(_id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      
      const updatedStock = product.stock + count;

      
      await Product.findByIdAndUpdate(_id, { stock: updatedStock });

      return res.status(200).json({ message: "Stock updated successfully", stock: updatedStock });
    } else {
      return res.status(400).json({ message: "Missing _id or count" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


const decreaseStock = async (req, res) => {
  const { _id, count } = req.body;

  try {
    if (count && _id) {
      const product = await Product.findById(_id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      
      if (product.stock < count) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      const updatedStock = product.stock - count;

      await Product.findByIdAndUpdate(_id, { stock: updatedStock });

      return res.status(200).json({ message: "Stock decreased successfully", stock: updatedStock });
    } else {
      return res.status(400).json({ message: "Missing _id or count" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export  {addProduct,listProduct,removeProduct,increaseStock,decreaseStock}