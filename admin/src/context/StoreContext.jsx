import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const validateToken = async (storedToken) => {
    try {
      const response = await axios.post("http://localhost:4000/api/user/validate", {}, {
        headers: { token: storedToken }
      });
      
      if (response.data.success && response.data.role === "admin") {
        setToken(storedToken);
        setAdmin(true);
        return true;
      } else {
        // Invalid token or not admin, clear storage
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        setToken("");
        setAdmin(false);
        return false;
      }
    } catch (error) {
      console.error("Token validation error:", error);
      // Clear invalid token
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      setToken("");
      setAdmin(false);
      return false;
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        console.log("🔍 Starting admin data loading...");
        const storedToken = localStorage.getItem("token");
        const storedAdmin = localStorage.getItem("admin");
        
        console.log("📦 Stored data:", { 
          hasToken: !!storedToken, 
          hasAdmin: storedAdmin === "true",
          tokenLength: storedToken?.length || 0 
        });
        
        if (storedToken && storedAdmin === "true") {
          console.log("🔐 Validating stored token...");
          // Validate the stored token
          const isValid = await validateToken(storedToken);
          console.log("✅ Token validation result:", isValid);
        } else {
          console.log("❌ No valid stored credentials found");
        }
        
        // Always set loading to false, regardless of token status
        console.log("🏁 Setting loading to false");
        setLoading(false);
      } catch (error) {
        console.error("💥 Error during data loading:", error);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    token,
    setToken,
    admin,
    setAdmin,
    loading,
  };
  
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
