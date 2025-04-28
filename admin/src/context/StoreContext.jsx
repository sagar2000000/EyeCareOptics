import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

function StoreContextProvider(props) {
  const [list, setList] = useState([]);
  const url = "http://localhost:4000"; // Define your API base URL

  const removeProduct = async (productId) => {
    try {
      console.log("Removing Product ID:", productId);

      const response = await axios.delete(`${url}/product/remove`, {
        params: { id: productId },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh product list after removal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Failed to remove product!");
    }
  };

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/product/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching product list");
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      toast.error("Failed to fetch product list!");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const contextValue = {
    list,
    setList,
    fetchList,
    removeProduct,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;
