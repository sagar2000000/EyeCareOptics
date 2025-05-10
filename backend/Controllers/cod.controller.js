import orderModel from "../Models/order.model.js";
import UserModel from "../Models/user.model.js";
import { products } from "../Models/product.model.js";
import salesReportModel from "../Models/sales.model.js";

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
    paymentMethod,
  } = req.body;

  try {
    // 1. Save Order
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

    // 2. Clear User Cart
    await UserModel.findOneAndUpdate(
      { email: orderedBy },
      { $set: { cartData: {} } },
      { new: true }
    );

    // 3. Process Each Item in the Order
    for (const [productId, quantity] of Object.entries(items)) {
      const product = await products.findById(productId);
      if (!product) continue;

      const category = product.category;
      const sellingPrice = product.price;
      const costPrice = product.costPrice;

      const totalRevenue = sellingPrice * quantity;
      const totalCost = costPrice * quantity;

      // 3a. Update Product Stock
      await products.findByIdAndUpdate(
        productId,
        { $inc: { stock: -quantity } },
        { new: true }
      );

      // 3b. Update or Create Category Sales Report
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
    return res.status(200).json("Order placed Successfully");

  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(400).json("Error placing order");
  }
};

export { CodController };
