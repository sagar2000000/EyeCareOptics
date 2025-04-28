
import orderModel from "../Models/order.model.js";
import UserModel from "../Models/user.model.js";
import { products } from "../Models/product.model.js";

const CodController = async (req, res) => {
  const {
    amount,
    fullname,
    items,
    orderedBy,
    region,
    location,
    phone,
    order_id,
    paymentMethod
    
  } = req.body;

  try {
    const order = new orderModel({
      order_id,
      amount,
      fullname,
      items,
      orderedBy,
      region,
      location,
      phone,
      paymentMethod,
     
    });
    await order.save();
    await UserModel.findOneAndUpdate(
      { email: orderedBy }, 
      { $set: { cartData: {} } }, 
      { new: true } 
    );
    for (const [productId, quantity] of Object.entries(items)) {
      await products.findByIdAndUpdate(
          productId,
          { $inc: { stock: -quantity } }, 
          { new: true }
      );
  }

  console.log("Order placed, cart cleared, and stock updated successfully!");
    
    console.log("order saved");
    return res.status(200).json("Order placed Successfully")
  } catch (error) {
    return res.status(400).json("error sending data");
  }
};

export { CodController };
