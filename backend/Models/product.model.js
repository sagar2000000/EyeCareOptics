import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: String, required: true },
  imageB: { type: String, default: null },

  category: { 
    type: String, 
    required: true, 
    enum: ["sunglass", "eyeglass", "lens"]  
  },

  
  FrameMaterial: { type: String, default: null },
  TempleMaterial: { type: String, default: null },
  FrameShape: { type: String, default: null },
  FrameSize: { type: String, default: null },
  Framecolor: { type: String, default: null },

  top: { type: Boolean, default: false },  

 
  BaseCurve: { type: String, default: null },
  Diameter: { type: String, default: null },
  WaterContent: { type: String, default: null },
  Packaging: { type: String, default: null },
});

export const products = mongoose.models.Product || mongoose.model("Product", productSchema);
