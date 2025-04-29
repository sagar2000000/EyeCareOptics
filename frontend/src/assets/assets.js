import logomount from "./logomount.png";
import cart_icon from "./cart-icon.png";
import user from "./user.png";
import coverimg from "./coverimg.png";
import coverimg1 from "./coverimg1.png";
import hamburger from "./hamburger.png";
import coverimg2 from "./coverimg2.png";
import eyeglasses from "./eyeglasses.png";
import sunglasses from "./sunglasses.png";
import facebook from "./facebook.png";
import instagram from "./instagram.png";
import cross from "./cross.png";
import sunglasscover from "./sunglasscover.png";



import store1 from "./store1.png";
import store2 from "./store2.png";
import store3 from "./store3.png";

import leftarrow from "./leftarrow.png";
import rightarrow from "./rightarrow.png";

import sunglass1A from "./sunglassAssets/sunglass1A.png";
import sunglass1 from "./sunglassAssets/sunglass1.png";
import sunglass2A from "./sunglassAssets/sunglass2A.png";
import sunglass2 from "./sunglassAssets/sunglass2.png";
import sunglass3A from "./sunglassAssets/sunglass3A.png";
import sunglass3 from "./sunglassAssets/sunglass3.png";
import sunglass4A from "./sunglassAssets/sunglass4A.png";
import sunglass4 from "./sunglassAssets/sunglass4.png";
import sunglass5 from "./sunglassAssets/sunglass5.png";
import sunglass6A from "./sunglassAssets/sunglass6A.png";
import sunglass6 from "./sunglassAssets/sunglass6.png";
import sunglass7A from "./sunglassAssets/sunglass7A.png";
import sunglass7 from "./sunglassAssets/sunglass7.png";
import sunglass8A from "./sunglassAssets/sunglass8A.png";
import sunglass8 from "./sunglassAssets/sunglass8.png";


import eyeglass1A from "./eyeglassAssets/eyeglass1A.png";
import eyeglass1 from "./eyeglassAssets/eyeglass1.png";
import eyeglass2A from "./eyeglassAssets/eyeglass2A.png";
import eyeglass2 from "./eyeglassAssets/eyeglass2.png";
import eyeglass3A from "./eyeglassAssets/eyeglass3A.png";
import eyeglass3 from "./eyeglassAssets/eyeglass3.png";
import eyeglass4A from "./eyeglassAssets/eyeglass4A.png";
import eyeglass4 from "./eyeglassAssets/eyeglass4.png";
import eyeglass5A from "./eyeglassAssets/eyeglass5A.png";
import eyeglass5 from "./eyeglassAssets/eyeglass5.png";

import lens1 from "./Lens/lens1.png";
import lens2 from "./Lens/lens2.png";
import lens3 from "./Lens/lens3.png";

export const assets = {
  logomount,
  cart_icon,
  user,
  hamburger,
  cross,
  coverimg,
  coverimg1,
  coverimg2,
  sunglasses,
  eyeglasses,
  leftarrow,
  rightarrow,
  facebook,
  instagram,
  sunglasscover,
};

export const stores = [
  {
   
    image: store1,
   
  },
  {
  
    image: store2,
   
  },
  {
   
    image: store3,
   
  },
];

export const products = [
  {
    _id: 1,
    name: "Matte Black Sporty Sunglass",
    price: 2100,
    image: sunglass1A,
    imageB: sunglass1,
    category: "sunglass",
    FrameMaterial: "TR 90",
    TempleMaterial: "TR 90",
    FrameShape: "Square",
    FrameSize: "53-19-146",
    Framecolor: "Matte Black",
    top: "yes",
    stock: 12
  },
  {
    _id: 2,
    name: "Matte Black Sporty Sunglass",
    price: 2200,
    image: sunglass2A,
    imageB: sunglass2,
    category: "sunglass",
    FrameMaterial: "TR 90",
    TempleMaterial: "TR 90",
    FrameShape: "Hexagon",
    FrameSize: "53-19-146",
    Framecolor: "Matte Black",
    stock: 8
  },
  {
    _id: 3,
    name: "Pastel Blue Polarized",
    price: 2350,
    image: sunglass3A,
    imageB: sunglass3,
    category: "sunglass",
    FrameMaterial: "TR ",
    TempleMaterial: "TR ",
    FrameShape: "Square",
    FrameSize: "53-19-146",
    Framecolor: "Pastel Blue",
    top:"yes",
    stock: 0
  },

  {
    _id: 4,
    name: "Printed Black Polarized Sporty Sunglass",
    price: 2100,
    image: sunglass4A,
    imageB: sunglass4,
    category: "sunglass",
    FrameMaterial: "TR ",
    TempleMaterial: "TR ",
    FrameShape: "Square",
    FrameSize: "Regular",
    Framecolor: "Printed Black",
    top: "yes",
    stock: 20
  },
  {
    _id: 5,
    name: "Matte Black Polarized Sporty Sunglass",
    price: 2050,
    image: sunglass5,
    imageB: "",
    category: "sunglass",
    FrameMaterial: "TR ",
    TempleMaterial: "TR ",
    FrameShape: "Square",
    FrameSize: "Regular",
    Framecolor: "Matte Black",
    stock: 0
  },
  {
    _id: 6,
    name: "Half Transparent Brown Womens Sunglass",
    price: 2050,
    image: sunglass6A,
    imageB: sunglass6,
    category: "sunglass",
    FrameMaterial: "PC ",
    TempleMaterial: "PC ",
    FrameShape: "Square",
    FrameSize: "64-13-141",
    Framecolor: "Transparent Brown",
    stock: 8
  },

  {
    _id: 7,
    name: "Black Blue Mercury Polarized Sporty Sunglass",
    price: 2550,
    image: sunglass7A,
    imageB: sunglass7,
    category: "sunglass",
    FrameMaterial: "TR ",
    TempleMaterial: "TR ",
    FrameShape: "Wraparound",
    FrameSize: "Regular",
    Framecolor: "Blue Mercury",
    top: "yes",
    stock: 8
  },

  {
    _id: 8,
    name: "Green Black Square Wooden Sunglass",
    price: 1720,
    image: sunglass8A,
    imageB: sunglass8,
    category: "sunglass",
    FrameMaterial: "TR",
    TempleMaterial: "Wooden",
    FrameShape: "Square",
    FrameSize: "53-19-146",
    Framecolor: "Green Black",
    stock: 8
  },
  {
    _id: 9,
    
    name: "Transparent Grey Square Eyeglass",
    price: 1800,
    image: eyeglass1A,
    imageB: eyeglass1,
    category: "eyeglass",
    FrameMaterial: "Acetate",
    TempleMaterial: "TR90",
    FrameShape: "Square",
    FrameSize: "53-19-146",
    Framecolor: "Transparent Grey",
    stock: 8
  },
  {
    _id: 10,
    name: "Square Shining Black Acetate Eyeglass",
    price: 1800,
    image: eyeglass2A,
    imageB: eyeglass2,
    category: "eyeglass",
    FrameMaterial: "TR90+Metal",
    TempleMaterial: "Metal",
    FrameShape: "Hexagon",
    FrameSize: "56-11-149",
    Framecolor: "Shining Black",
    stock: 8
  },
  {
    _id: 11,
    name: "Square Mix Black Eyeglass",
    price: 1800,
    image: eyeglass3A,
    imageB: eyeglass3,
    category: "eyeglass",
    FrameMaterial: "Acetate",
    TempleMaterial: "Acetate (inside Metal Rod)",
    FrameShape: "Square",
    FrameSize: "Regular",
    Framecolor: "Mix Black",
    stock: 8
  },

  {
    _id: 12,
    name: "Rimless Matte Black Eyeglass",
    price: 1620,
    image: eyeglass4A,
    imageB: eyeglass4,
    category: "eyeglass",
    FrameMaterial: "Metal+TR",
    TempleMaterial: "TR",
    FrameShape: "Square Rimless",
    FrameSize: "53-19-143",
    Framecolor: "Matte Black",
    top: "yes",
    stock: 8
  },

  {
    _id: 13,
    name: "Matte Gold Brown Metal Eyeglass",
    price: 2150,
    image: eyeglass5A,
    imageB: eyeglass5,
    category: "eyeglass",
    FrameMaterial: "Metal",
    TempleMaterial: "Metal",
    FrameShape: "Square",
    FrameSize: "55-19-140",
    Framecolor: "Matte Gold Brown",
    top: "yes",
    stock: 8
  },
  {
    _id: 14,
    name: "Bausch & Lomb Softlens Toric Monthly Contact Lens",
    price: 5000,
    image: lens1,
    category: "lens",
    BaseCurve: "8.6 mm",
    Diameter: "14.20mm",
    WaterContent: "59%",
    Packaging: "6 pieces of Lenses per box",
    stock: 8
  },
  {
    _id: 15,
    name: "Bausch & Lomb Softlens Daily Disposable Contact Lens",
    price: 3800,
    image: lens2,
    category: "lens",
    BaseCurve: "8.6 mm",
    Diameter: "14.20mm",
    WaterContent: "59%",
    Packaging: "6 pieces of Lenses per box",
    stock: 8
  },
  {
    _id: 16,
    name: "Proclear Omafilcon B Contact Lens",
    price: 3200,
    image: lens3,
    category: "lens",
    BaseCurve: "8.6mm",
    Diameter: "14.20mm",
    WaterContent: "62%",
    Packaging: "6 pieces of Lenses per box",
    top: "yes",
    stock: 8

  },
];




