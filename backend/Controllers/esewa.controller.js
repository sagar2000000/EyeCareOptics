import { EsewaPaymentGateway, EsewaCheckStatus } from "esewajs";
import orderModel from "../Models/order.model.js";
import UserModel from "../Models/user.model.js";
const EsewaInitiatePayment = async (req, res) => {
  const { amount, fullname, items, orderedBy, region, location, phone, order_id } = req.body;
  console.log(amount, fullname, items, orderedBy, region, location, phone, order_id);

  try {
    const reqPayment = await EsewaPaymentGateway(
      amount, 0, 0, 0, order_id,
      process.env.MERCHANT_ID,
      process.env.SECRET,
      process.env.SUCCESS_URL,
      process.env.FAILURE_URL,
      process.env.ESEWAPAYMENT_URL
    );

    if (!reqPayment) {
      return res.status(400).json({ message: "Error sending data to eSewa" });
    }

    if (reqPayment.status === 200) {
      const order = new orderModel({
        order_id,
        amount,
        fullname,
        items,
        orderedBy,
        region,
        location,
        phone,
        paymentMethod: "eSewa",
      });
      await order.save();
      await UserModel.findOneAndUpdate(
        { email: orderedBy },
        { $set: { cartData: {} } }, 
        { new: true } 
      );
     
      
      console.log("Transaction passed");

      return res.send({
        url: reqPayment.request.res.responseUrl,
      });
    }
  } catch (error) {
    console.error("Error initiating payment:", error);
    return res.status(400).json({ message: "Error initiating payment", error: error.message });
  }
};

const paymentStatus = async (req, res) => {
  const { order_id } = req.body;

  try {
    
    const order = await orderModel.findOne({ order_id });

    if (!order) {
      return res.status(404).json({ message: "Transaction not found" });
    }

 
    const paymentStatusCheck = await EsewaCheckStatus(
      order.amount,
      order.order_id,
      process.env.MERCHANT_ID,
      process.env.ESEWAPAYMENT_STATUS_CHECK_URL
    );

    console.log("Payment Status Check:", paymentStatusCheck.status);

    if (paymentStatusCheck.status === 200) {
     
      order.status = paymentStatusCheck.data.status;
      await order.save();  
   
      
      return res.status(200).json({ message: "Transaction status updated successfully" });
    } else {
      return res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error updating transaction status:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { EsewaInitiatePayment, paymentStatus };


