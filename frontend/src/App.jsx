import React, { useState, Suspense } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

// Error Boundary Component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-red-500 text-6xl mb-4">🚨</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState(null);

  if (error) {
    return <ErrorFallback error={error} resetErrorBoundary={() => setError(null)} />;
  }

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="w-full">
        <ToastContainer />
        <Navbar setShowLogin={setShowLogin} />
        <Suspense fallback={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading app...</p>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  );
};

export default App;
