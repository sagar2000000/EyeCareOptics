
import orderModel from "../Models/order.model.js";

// 🏆 List all orders & delete items with qty 0 from DB
const listOrders = async (req, res) => {
  try {
    let orders = await orderModel.find({});

    // Loop through orders & remove items with qty 0 from DB
    for (let order of orders) {
      for (let productId in order.items) {
        if (order.items[productId] === 0) {
          delete order.items[productId]; // Remove from object
        }
      }
      await orderModel.findByIdAndUpdate(order._id, { items: order.items }); // Save changes
    }

    return res.status(200).json({
      success: true,
      orderlist: orders,
      message: "Orders fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(400).json({
      success: false,
      message: "Error while fetching orders",
    });
  }
};


const userOrders = async (req, res) => {
  try {
    const { userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: "User email is required",
      });
    }

    let userOrders = await orderModel.find({ orderedBy: userEmail });

    
    for (let order of userOrders) {
      for (let productId in order.items) {
        if (order.items[productId] === 0) {
          delete order.items[productId];
        }
      }
      await orderModel.findByIdAndUpdate(order._id, { items: order.items }); // Save changes
    }

    return res.status(200).json({
      success: true,
      userOrder: userOrders,
      message: "User orders fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching user orders",
    });
  }
};

const updateDelivery = async (req, res) => {
  const { order_id } = req.body;

  if (!order_id) {
    return res.status(400).json({
      message: "Order ID is required",
      success: false
    });
  }

  try {
    const updatedOrder = await orderModel.findOneAndUpdate(
      { order_id: order_id },
      {
      delivery: "Completed",
      status:"COMPLETE"},
      { new: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "Delivery updated to Completed",
      success: true,
      
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error updating the delivery status",
      success: false,
      error: error.message
    });
  }
};

export { listOrders, userOrders ,updateDelivery};
