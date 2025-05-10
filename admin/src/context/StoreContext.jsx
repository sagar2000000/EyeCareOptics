import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

function StoreContextProvider(props) {
  const [list, setList] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loadingReport, setLoadingReport] = useState(true);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);
  const url = "http://localhost:4000";

  // Fetching product list
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/product/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching product list");
      }
    } catch (error) {
      toast.error("Failed to fetch product list!");
    }
  };

  // Fetching sales report
  const fetchSalesReport = async () => {
    setLoadingReport(true);
    try {
      const res = await axios.get(`${url}/report/sales`);
      if (res.data.success) {
        setReportData(res.data.report);
      } else {
        toast.error("Failed to fetch report");
      }
    } catch (error) {
      toast.error("Error fetching sales report");
    } finally {
      setLoadingReport(false);
    }
  };

  // Fetching user data
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${url}/user/data`);
      if (response.data.success) {
        setUsers(response.data.users); // Save users data
      } else {
        setErrorUsers("Failed to fetch users");
      }
    } catch (error) {
      setErrorUsers("Error fetching users");
    } finally {
      setLoadingUsers(false); // Stop the loading spinner
    }
  };

  // Remove product from list
  const removeProduct = async (productId) => {
    try {
      const response = await axios.delete(`${url}/product/remove`, {
        params: { id: productId },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to remove product!");
    }
  };

  useEffect(() => {
    fetchList();
    fetchSalesReport();
    fetchUserData(); // Fetch user data when the component mounts
  }, []);

  const contextValue = {
    list,
    setList,
    fetchList,
    removeProduct,
    reportData,
    fetchSalesReport,
    loadingReport,
    users,
    loadingUsers,
    errorUsers,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;
