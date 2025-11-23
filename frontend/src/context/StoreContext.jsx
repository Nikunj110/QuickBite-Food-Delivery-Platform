import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToCart = async (itemId) => {
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      const response=await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
      if(response.data.success){
        toast.success("item Added to Cart")
      }else{
        toast.error("Something went wrong")
      }
    }
  };

  const removeFromCart = async (itemId) => {
    if (!token) {
      toast.error("Please login to manage your cart");
      return;
    }
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      const response= await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
      if(response.data.success){
        toast.success("item Removed from Cart")
      }else{
        toast.error("Something went wrong")
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo && itemInfo.price) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await axios.get(url + "/api/food/list", {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.data.success) {
        setFoodList(response.data.data);
        console.log("Food list loaded successfully:", response.data.data.length, "items");
      } else {
        console.error("API Error:", response.data.message);
        setError("Failed to fetch food items: " + response.data.message);
        setFoodList([]);
      }
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Network Error:", error);
      
      if (error.code === 'ECONNABORTED') {
        setError("Request timeout - backend server might be slow or unavailable");
      } else if (error.code === 'ERR_NETWORK') {
        setError("Cannot connect to backend server. Please ensure the server is running on " + url);
      } else {
        setError("Network error: " + error.message);
      }
      
      setFoodList([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCardData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCardData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  // Keep cart in sync with current authenticated user
  useEffect(() => {
    const syncCartForToken = async () => {
      if (token) {
        try {
          await loadCardData(token);
        } catch (err) {
          setCartItems({});
        }
      } else {
        setCartItems({});
      }
    };
    syncCartForToken();
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loading,
    error,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
