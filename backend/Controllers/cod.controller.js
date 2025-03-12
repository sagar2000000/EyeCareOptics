
import orderModel from "../Models/order.model.js";
import UserModel from "../Models/user.model.js";

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
      { email: orderedBy }, // Assuming `orderedBy` contains the user's email
      { $set: { cartData: {} } }, // Correct update format
      { new: true } // Returns the updated document
    );
    
    console.log("order saved");
    return res.status(200).json("Order placed Successfully")
  } catch (error) {
    return res.status(400).json("error sending data");
  }
};

export { CodController };
