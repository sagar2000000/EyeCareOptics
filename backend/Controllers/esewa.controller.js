import { EsewaPaymentGateway, EsewaCheckStatus } from "esewajs";
import orderModel from "../Models/order.model.js";
import UserModel from "../Models/user.model.js";
import { products } from "../Models/product.model.js";
import salesReportModel from "../Models/sales.model.js";

const EsewaInitiatePayment = async (req, res) => {
  const { amount, fullname, items, orderedBy, region, location, phone, order_id } = req.body;

  try {
    // 1. Initiate Payment via eSewa Gateway
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
      // 2. Save Order in Database
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

      // 3. Save the Order into the Database
      await order.save();

      // 4. Clear User Cart after Order is Placed
      await UserModel.findOneAndUpdate(
        { email: orderedBy },
        { $set: { cartData: {} } },
        { new: true }
      );

      // 5. Process Each Item in the Order and Update Stock & Sales Report
      for (const [productId, quantity] of Object.entries(items)) {
        const product = await products.findById(productId);
        if (!product) continue;

        const category = product.category;
        const sellingPrice = product.price;
        const costPrice = product.costPrice;

        const totalRevenue = sellingPrice * quantity;
        const totalCost = costPrice * quantity;

        // 5a. Update Product Stock
        await products.findByIdAndUpdate(
          productId,
          { $inc: { stock: -quantity } },
          { new: true }
        );

        // 5b. Update or Create Category Sales Report
        let categoryReport = await salesReportModel.findOne({ category });

        if (!categoryReport) {
          // If not found, create one
          categoryReport = new salesReportModel({
            category,
            products: {},
          });
        }

        const currentProductStats = categoryReport.products.get(productId) || {
          qtySold: 0,
          totalRevenue: 0,
          totalCost: 0,
          salesHistory: [],
        };

        // Update stats
        currentProductStats.qtySold += quantity;
        currentProductStats.totalRevenue += totalRevenue;
        currentProductStats.totalCost += totalCost;
        currentProductStats.salesHistory.push({
          date: new Date(),
          qty: quantity,
          revenue: totalRevenue,
          cost: totalCost,
        });

        // Save back to map
        categoryReport.products.set(productId, currentProductStats);
        await categoryReport.save();
      }

      console.log("Order placed, stock and sales report updated successfully.");

      // Return the eSewa payment URL for redirection
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
    // 1. Find Order in the Database
    const order = await orderModel.findOne({ order_id });

    if (!order) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // 2. Check Payment Status from eSewa
    const paymentStatusCheck = await EsewaCheckStatus(
      order.amount,
      order.order_id,
      process.env.MERCHANT_ID,
      process.env.ESEWAPAYMENT_STATUS_CHECK_URL
    );

    if (paymentStatusCheck.status === 200) {
      // 3. Update Order Status
      order.status = paymentStatusCheck.data.status;
      await order.save();

      // 4. Update Sales Report Status to match Payment Status
      await salesReportModel.findOneAndUpdate(
        { order_id },
        { status: paymentStatusCheck.data.status },
        { new: true }
      );

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


