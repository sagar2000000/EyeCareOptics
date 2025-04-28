import React, { useEffect, useContext, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

function List({ url }) {
  const { list, fetchList, removeProduct } = useContext(StoreContext);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handleChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: Number(value) }));
  };

  const handleStockUpdate = async (id, type) => {
    const count = quantities[id];
    if (!count || count <= 0) {
      toast.warn("Please enter a valid quantity");
      return;
    }

    const endpoint = type === 'increase' ? 'increase-stock' : 'decrease-stock';

    try {
      await axios.post(`http://localhost:4000/product/${endpoint}`, {
        _id: id,
        count,
      });

      toast.success(`Stock ${type}d successfully`);
      fetchList();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update stock");
    }
  };

  return (
    <div className='list add flex col'>
      <p>All Product List</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Stock</b>
          <b>Qty</b>
          <b>+</b>
          <b>-</b>
          <b>Action</b>
        </div>

        {list && list.length > 0 ? (
          list.map((item) => (
            <div key={item._id} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>रु {item.price}</p>
              <p>{item.stock}</p>

              <input
                type="number"
                min="1"
                value={quantities[item._id] || ""}
                onChange={(e) => handleChange(item._id, e.target.value)}
                className="stock-input"
              />

              <button
                className="stock-btn increase"
                onClick={() => handleStockUpdate(item._id, 'increase')}
              >
                +
              </button>

              <button
                className="stock-btn decrease"
                onClick={() => handleStockUpdate(item._id, 'decrease')}
              >
                -
              </button>

              <p onClick={() => removeProduct(item._id)} className="cursor">❌</p>
            </div>
          ))
        ) : (
          <p style={{ padding: '20px', textAlign: 'center' }}>No products available.</p>
        )}
      </div>
    </div>
  );
}

export default List;
