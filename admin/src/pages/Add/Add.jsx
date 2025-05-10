import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function Add({ url }) {
  const [image, setImage] = useState(null);
  const [imageB, setImageB] = useState(null);
  const [data, setData] = useState({
    name: "",
    price: "",
    costPrice: "", // ✅ NEW
    category: "sunglass",
    FrameMaterial: "",
    TempleMaterial: "",
    FrameShape: "",
    FrameSize: "",
    FrameColor: "",
    BaseCurve: "",
    Diameter: "",
    WaterContent: "",
    Packaging: "",
    top: "false",
    stock: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onCategoryChange = (event) => {
    const category = event.target.value;
    setData({
      name: "",
      price: "",
      costPrice: "", 
      category,
      stock: "",
      top: "false",
      ...(category === "lens"
        ? { BaseCurve: "", Diameter: "", WaterContent: "", Packaging: "" }
        : {
            FrameMaterial: "",
            TempleMaterial: "",
            FrameShape: "",
            FrameSize: "",
            FrameColor: "",
          }),
    });
    setImage(null);
    setImageB(null);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (Number(data.price) < 0 || Number(data.costPrice) < 0) {
      toast.error("Price and Purchase Price cannot be negative.");
      return;
    }

    if (Number(data.stock) < 0) {
      toast.error("Stock quantity cannot be negative.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", Number(data.price));
    formData.append("costPrice", Number(data.costPrice)); // ✅ INCLUDE
    formData.append("category", data.category);
    formData.append("top", data.top === "true");
    formData.append("stock", Number(data.stock));

    if (data.category === "lens") {
      formData.append("BaseCurve", data.BaseCurve);
      formData.append("Diameter", data.Diameter);
      formData.append("WaterContent", data.WaterContent);
      formData.append("Packaging", data.Packaging);
    } else {
      formData.append("FrameMaterial", data.FrameMaterial);
      formData.append("TempleMaterial", data.TempleMaterial);
      formData.append("FrameShape", data.FrameShape);
      formData.append("FrameSize", data.FrameSize);
      formData.append("FrameColor", data.FrameColor);
    }

    if (image) formData.append("image", image);
    if (imageB && data.category !== "lens") formData.append("imageB", imageB);

    try {
      const response = await axios.post(`${url}/product/add`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        onCategoryChange({ target: { value: data.category } });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        {/* Image Upload */}
        <div className="add-image-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Preview" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>

        {data.category !== "lens" && (
          <div className="add-image-upload">
            <p>Upload Image B</p>
            <label htmlFor="imageB">
              <img src={imageB ? URL.createObjectURL(imageB) : assets.upload_area} alt="Preview" />
            </label>
            <input onChange={(e) => setImageB(e.target.files[0])} type="file" id="imageB" hidden required />
          </div>
        )}

        <input
          onChange={onChangeHandler}
          value={data.name}
          type="text"
          name="name"
          placeholder="Product Name (e.g., Classic Aviator Sunglasses)"
          required
        />

        {/* Category Selection */}
        <div className="add-category-price">
          <div>
            <p>Category</p>
            <select onChange={onCategoryChange} value={data.category} name="category">
              <option value="sunglass">Sunglasses</option>
              <option value="eyeglass">Eyeglasses</option>
              <option value="lens">Contact Lenses</option>
            </select>
          </div>
        </div>

        {/* Eyeglass/Sunglass Fields */}
        {data.category !== "lens" && (
          <>
            <input onChange={onChangeHandler} value={data.FrameMaterial} type="text" name="FrameMaterial" placeholder="Frame Material (e.g., Metal, Plastic)" />
            <input onChange={onChangeHandler} value={data.TempleMaterial} type="text" name="TempleMaterial" placeholder="Temple Material (e.g., Titanium, Acetate)" />
            <input onChange={onChangeHandler} value={data.FrameShape} type="text" name="FrameShape" placeholder="Frame Shape (e.g., Round, Square, Oval)" />
            <input onChange={onChangeHandler} value={data.FrameSize} type="text" name="FrameSize" placeholder="Frame Size (e.g., 55-19-140)" />
            <input onChange={onChangeHandler} value={data.FrameColor} type="text" name="FrameColor" placeholder="Frame Color (e.g., Matte Black, Gold Brown)" />
          </>
        )}

        {/* Lens Fields */}
        {data.category === "lens" && (
          <>
            <input onChange={onChangeHandler} value={data.BaseCurve} type="text" name="BaseCurve" placeholder="Base Curve (e.g., 8.6 mm)" required />
            <input onChange={onChangeHandler} value={data.Diameter} type="text" name="Diameter" placeholder="Diameter (e.g., 14.20mm)" required />
            <input onChange={onChangeHandler} value={data.WaterContent} type="text" name="WaterContent" placeholder="Water Content (e.g., 62%)" required />
            <input onChange={onChangeHandler} value={data.Packaging} type="text" name="Packaging" placeholder="Packaging (e.g., 6 pcs per box)" required />
          </>
        )}

        <input
          onChange={onChangeHandler}
          value={data.stock}
          type="number"
          name="stock"
          placeholder="Stock Quantity (e.g., 10)"
          required
          min="0"
        />
        <input
          onChange={onChangeHandler}
          value={data.price}
          type="number"
          name="price"
          placeholder="Selling Price (e.g., 2500)"
          required
          min="0"
        />
        <input
          onChange={onChangeHandler}
          value={data.costPrice}
          type="number"
          name="costPrice"
          placeholder="Purchase Price / Cost Price (e.g., 1800)"
          required
          min="0"
        />

        <div>
          <p>Top Product</p>
          <select onChange={onChangeHandler} value={data.top} name="top">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <button type="submit" className="add-btn">Add Product</button>
      </form>
    </div>
  );
}

export default Add;
