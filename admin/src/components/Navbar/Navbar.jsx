import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ mobileSidebarOpen, setMobileSidebarOpen }) => {
  const navigate = useNavigate();
  const { token, admin, setAdmin, setToken } = useContext(StoreContext);
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken("");
    setAdmin(false);
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="w-full bg-black text-white fixed top-0 left-0 right-0 z-40 h-16">
      <div className="max-w-6xl h-full mx-auto flex items-center justify-between px-4">
        {/* Left side - Logo and Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {/* Logo */}
          <div className="flex items-center gap-3 select-none">
            <span className="text-2xl font-extrabold tracking-tight" style={{color:'#f97316'}}>QuickBite</span>
            <span className="text-sm text-white/80 hidden sm:inline">Admin Panel</span>
          </div>
        </div>
        
        {/* Right side - Auth buttons and profile */}
        <div className="flex items-center gap-4">
          {token && admin ? (
            <button 
              className="text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors" 
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <button 
              className="text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors" 
              onClick={() => navigate("/")}
            >
              Login
            </button>
          )}
          <img className="w-9 h-9 rounded-full border border-white/20" src={assets.profile_image} alt="profile" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
