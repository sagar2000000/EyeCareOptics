import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import './Order.css';
import emailjs from '@emailjs/browser';

function Orders({ url }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { list } = useContext(StoreContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/order/list-orders");
        setOrders(response.data.orderlist);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getItemDetails = (productId) => {
    if (!Array.isArray(list)) return {};
    return list.find((item) => item._id === productId) || {};
  };

  // This function sends the email via EmailJS after marking the delivery
  const handleDeliveryUpdate = async (orderId) => {
    try {
      const response = await axios.post("http://localhost:4000/order/update-delivery", {
        order_id: orderId,
      });

      if (response.data.success) {
        const updatedOrder = orders.find((order) => order.order_id === orderId);

        // Send email using EmailJS
        emailjs.send('service_i8yh6h7', 'template_q9zdvqt', {
          name: updatedOrder.fullname,
          email: updatedOrder.orderedBy,
          order_id: updatedOrder.order_id,
        }, 'xOS70cxLMAj3_KT-u')
          .then((result) => {
            console.log("✅ Email sent successfully:", result.text);
          })
          .catch((error) => {
            console.error("❌ Failed to send email:", error.text);
          });

        // Update the order list to mark delivery as completed
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === orderId ? { ...order, delivery: "Completed" } : order
          )
        );
      } else {
        alert("Failed to update delivery status");
      }
    } catch (error) {
      alert("Error updating delivery status");
    }
  };

  return (
    <div className="p-6 orders-container">
      <h2 className="text-2xl font-bold mb-4 orders-title">Admin Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full border-collapse border orders-table">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Items</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Region</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Ordered By</th>
              <th className="border p-2">Payment Method</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Delivery</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border">
                <td className="border p-2">{order.order_id}</td>
                <td className="border p-2">{order.fullname}</td>
                <td className="border p-2">{order.phone}</td>
                <td className="border p-2">
                  <ul className="order-items-list">
                    {Object.entries(order.items).map(([productId, quantity]) => {
                      const product = getItemDetails(productId);
                      return (
                        <li key={productId} className="order-item flex items-center gap-2">
                          {product.image ? (
                            <img
                              src={`${url}/images/${product.image}`}
                              alt={product.name}
                              className="w-12 h-12 object-cover"
                            />
                          ) : (
                            <span className="text-gray-500">No Image</span>
                          )}
                          <span>
                            {product.name ? `${product.name} - Qty: ${quantity}` : `Unknown Product - Qty: ${quantity}`}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </td>
                <td className="border p-2">रु{order.amount}</td>
                <td className="border p-2">{order.region}</td>
                <td className="border p-2">{order.location}</td>
                <td className="border p-2">{order.orderedBy}</td>
                <td className="border p-2">{order.paymentMethod}</td>
                <td className={`border p-2 order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </td>
                <td className="border p-2">
                  {order.delivery === "Completed" ? (
                    <span className="delivery-completed">Completed</span>
                  ) : (
                    <button className="delivery-button" onClick={() => handleDeliveryUpdate(order.order_id)}>
                      Mark as Delivered
                    </button>
                  )}
                </td>
                <td className="border p-2">{new Date(order.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
