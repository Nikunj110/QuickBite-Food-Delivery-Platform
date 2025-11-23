import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
// removed logo asset usage in favor of text logo
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { ShoppingCart, User, LogOut, ClipboardList } from "lucide-react";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (item, e, isMobile = false) => {
    e.preventDefault();
    setMenu(item);
    const targetId = item === "menu" ? "explore-menu" : item === "contact-us" ? "footer" : null;
    const performScroll = () => {
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return true;
      }
    };

    // If we're not on home and target is on home, navigate then scroll
    if ((item === "menu" || item === "contact-us") && location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        performScroll();
      }, 100);
    } else {
      performScroll();
    }
    if (isMobile) setMobileOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black shadow-sm">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="app flex justify-between items-center py-4"
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={() => {
            setMenu("home");
            setMobileOpen(false);
          }}
        >
          <span className="text-2xl font-extrabold tracking-wide text-orange-500 hover:opacity-90 transition-opacity select-none">
            QuickBite
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-gray-200 font-medium text-sm tracking-wide">
          {["home", "menu", "contact-us"].map((item) => (
            <a
              key={item}
              href="#"
              onClick={(e) => handleNavClick(item, e, false)}
              className={`relative pb-2 transition-all duration-300 ${
                menu === item
                  ? "text-white font-semibold after:absolute after:content-[''] after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-white"
                  : "text-gray-300 hover:text-white hover:scale-105"
              }`}
            >
              {item.replace("-", " ")}
            </a>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          <div className="relative">
            <Link to="/cart" onClick={() => setMobileOpen(false)}>
              <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
                <ShoppingCart className="w-6 h-6 text-gray-200 hover:text-white transition-colors" />
              </motion.div>
            </Link>
            {getTotalCartAmount() !== 0 && (
              <motion.span
                layoutId="cart-dot"
                className="absolute w-2.5 h-2.5 bg-white rounded-full -top-1 -right-1"
              />
            )}
          </div>

          {/* Auth */}
          {!token ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowLogin(true);
                setMobileOpen(false);
              }}
              className="hidden sm:block bg-white text-black px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all text-sm font-medium"
            >
              Sign In
            </motion.button>
          ) : (
            <div className="relative group hidden sm:block">
              <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
                <User className="w-6 h-6 text-gray-200 hover:text-white transition-colors" />
              </motion.div>
              <ul className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 flex-col gap-2 bg-black text-gray-200 shadow-lg p-4 rounded-lg border border-gray-700 absolute right-0 top-full mt-0 w-48 z-10">
                <li
                  onClick={() => navigate("/myorders")}
                  className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors py-2 px-3 rounded-md hover:bg-gray-800"
                >
                  <ClipboardList size={16} /> Orders
                </li>
                <li
                  onClick={logout}
                  className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors py-2 px-3 rounded-md hover:bg-gray-800"
                >
                  <LogOut size={16} /> Logout
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex flex-col gap-[5px] p-2 rounded-lg hover:bg-gray-800 transition-colors ml-auto"
          >
            <span
              className={`h-[2px] w-6 bg-gray-200 transition-all duration-300 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            ></span>
            <span
              className={`h-[2px] w-6 bg-gray-200 transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`h-[2px] w-6 bg-gray-200 transition-all duration-300 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            ></span>
          </button>
        </div>
      </motion.div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden border-t border-gray-800 bg-black shadow-sm rounded-b-2xl"
          >
            <div className="app py-6">
              <ul className="flex flex-col gap-4 text-gray-200 text-base font-medium">
                {["home", "menu", "contact-us"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={(e) => handleNavClick(item, e, true)}
                    className={`${
                      menu === item
                        ? "text-white font-semibold"
                        : "hover:text-white"
                    } transition-colors py-2 px-3 rounded-lg hover:bg-gray-800`}
                  >
                    {item.replace("-", " ")}
                  </a>
                ))}
                {!token ? (
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setMobileOpen(false);
                    }}
                    className="mt-4 w-full bg-white text-black py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                  >
                    Sign In
                  </button>
                ) : (
                  <div className="mt-4 flex flex-col gap-3">
                    <button
                      onClick={() => {
                        navigate("/myorders");
                        setMobileOpen(false);
                      }}
                      className="w-full rounded-lg border border-gray-700 px-4 py-3 hover:bg-gray-800 flex items-center gap-3 transition-colors text-left text-gray-200"
                    >
                      <ClipboardList size={16} /> Orders
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="w-full rounded-lg border border-gray-700 px-4 py-3 hover:bg-gray-800 flex items-center gap-3 transition-colors text-left text-gray-200"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
