import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

function StoreContextProvider(props) {
  const [cartData, setCartData] = useState({});
  const [token, setToken] = useState("");
  const [product_list, setProductList] = useState([]);
  const[userEmail,setUserEmail] = useState("");
  const url = "http://localhost:4000";
  
  
  const addToCart = async (itemId) => {
    console.log(itemId);
    if (!cartData[itemId]) {
      setCartData((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartData((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url+"/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartData((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        url+"/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const i in cartData) {
      
      if (cartData[i] > 0) {
        product_list.map((product) => {
          if (product._id == i) {
            let price = product.price;
            totalAmount += price * cartData[i];
          }
        });
      }
    }
    return totalAmount;
  };
console.log(getTotalAmount())
  const fetchProductList = async () => {
    const response = await axios.get(url+"/product/list");
    setProductList(response.data.data);
    console.log(response.data.data)
   
  };
  const loadCartData = async (token) => {
    const response = await axios.post(url+"/cart/get",{},{headers:{token}});
   const cartData=response.data.cartData

    setCartData(cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchProductList();
     const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
      
      if(localStorage.getItem("token")) {
       
        setToken(localStorage.getItem("token"));
        
        
        await loadCartData(localStorage.getItem("token"));
        
      }
    }
    loadData();
  }, []);
  
  

  const contextValue = {
    cartData,
    addToCart,
    removeFromCart,
    url,
    getTotalAmount, 
    token,
    setToken,
    product_list,
    userEmail,
    setUserEmail
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;
