import React,{useContext} from 'react';
import './Sunglass.css';
import { assets, products } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Sunglass = () => {
  const navigate = useNavigate();
  const {product_list,url} = useContext(StoreContext)

  const onClickHandler = (name) => {
    navigate(`/product/${name}`);
  };

  return (
    <div className="productList-container">
      <div className="cover">
        <img src={assets.sunglasscover} alt="" />
      </div>
      <h1>Sunglasses</h1>

      <div className="product-list">
        {product_list.map((product, index) => {
          if (product.category === 'sunglass')
            return (
              <div
                className="products"
                key={index}
                onClick={() => onClickHandler(product.name)}
              >
                <img src={url+"/images/"+product.image} alt={product.name} />
                <p className="name">{product.name}</p>
                <p className="price">Rs {product.price}</p>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default Sunglass;
