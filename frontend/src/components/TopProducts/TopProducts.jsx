import React, { useRef, useEffect,useContext } from 'react';
import './TopProducts.css';
import { assets } from '../../assets/assets';
import { products } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const TopProducts = () => {
  const {product_list,url} = useContext(StoreContext)
  const navigate = useNavigate()
  const topItemsRef = useRef(null);

  useEffect(() => {
    const topItems = topItemsRef.current;
    if (topItems) {
      topItems.scrollLeft = topItems.clientWidth;
    }
  }, []);

  const scrollLeft = () => {
    const topItems = topItemsRef.current;
    const scrollAmount = topItems.clientWidth / 4;
    topItems.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(() => {
      if (topItems.scrollLeft <= 0) {
        topItems.scrollLeft = topItems.scrollWidth - topItems.clientWidth;
      }
    }, 500);
  };
  const onClickHandler = (name) => {
    navigate(`/product/${name}`);
  };

  const scrollRight = () => {
    const topItems = topItemsRef.current;
    const scrollAmount = topItems.clientWidth / 4;
    topItems.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(() => {
      if (topItems.scrollLeft >= topItems.scrollWidth - topItems.clientWidth) {
        topItems.scrollLeft = 0;
      }
    }, 500);
  };

  const topProducts = product_list.filter(item => item.top === true);

  return (
    <div className='top-container'>
      <center className='center1'>TOP PRODUCTS</center>
      <center className='center2'>TRENDING PRODUCTS</center>

      <div className="content-container">
        <div className="left" onClick={scrollLeft}>
          <img src={assets.leftarrow} alt="Scroll Left" />
        </div>
        <div className="top-items" ref={topItemsRef}>
          {topProducts.map((item, index) => (
            <div className="item" key={index} onClick={()=>onClickHandler(item.name)}> 
              <img src={url+"/images/"+item.image}alt={item.name} />
              <p>{item.name}</p>
              <h4>Rs {item.price}</h4>
            </div>
          ))}
        </div>
        <div className="right" onClick={scrollRight}>
          <img src={assets.rightarrow} alt="Scroll Right" />
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
