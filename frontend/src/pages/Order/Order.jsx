import React, { useEffect, useState, useContext } from "react";
import "./Order.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { product_list, url, userEmail } = useContext(StoreContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post("http://localhost:4000/order/user-orders", { userEmail });

        // Sort orders in descending order based on date (newest first)
        const sortedOrders = response.data.userOrder.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userEmail]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="order-container">
      <h2>User Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Items</th>
                <th>Amount (Rs)</th>
                <th>Payment Method</th>
                <th>Payment</th>
                <th>Delivery</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const orderItems = Object.entries(order.items).filter(([_, quantity]) => quantity > 0);

                return orderItems.map(([productId, quantity], itemIndex) => {
                  const product = product_list.find((p) => p._id === productId);
                  if (!product) return null;

                  return (
                    <tr key={`${order._id}-${productId}`}>
                      {itemIndex === 0 && <td rowSpan={orderItems.length}>{index + 1}</td>}
                      <td>
                        <div className="item">
                          <img className="product-image" src={`${url}/images/${product.image}`} alt={product.name} />
                          <p>{product.name} (x{quantity})</p>
                        </div>
                      </td>
                      {itemIndex === 0 && (
                        <>
                          <td rowSpan={orderItems.length}>{order.amount}</td>
                          <td rowSpan={orderItems.length}>{order.paymentMethod}</td>
                          <td rowSpan={orderItems.length} className={`status ${order.status.toLowerCase()}`}>
                            {order.status}
                          </td>
                          <td rowSpan={orderItems.length} className={`delivery ${order.delivery.toLowerCase()}`}>
                            {order.delivery}
                          </td>
                          <td rowSpan={orderItems.length}>{formatDate(order.date)}</td>
                        </>
                      )}
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
