import React, { useState, useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login/Login";
import { StoreContext } from "./context/StoreContext";

const App = () => {
  const url = "http://localhost:4000";
  const { loading, admin, token } = useContext(StoreContext);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <ToastContainer />
      <Navbar 
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />
      
      <div className="pt-16">
        {/* Desktop Sidebar - Fixed Position */}
        <div className="hidden md:block fixed left-0 top-16 bottom-0 w-64 z-10">
          <Sidebar />
        </div>
        
        {/* Mobile Sidebar */}
        <div className={`md:hidden fixed inset-0 z-20 transition-opacity duration-300 ${mobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {/* Blur backdrop */}
          <div 
            className="fixed inset-0 backdrop-blur-sm bg-white/30"
            onClick={() => setMobileSidebarOpen(false)}
          />
          {/* Animated sidebar */}
          <div className={`fixed left-0 top-16 bottom-0 w-64 bg-white/90 backdrop-blur-md shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <Sidebar onMobileClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
        
        {/* Main Content - Centered */}
        <main className="w-full md:pl-64">
          <div className="flex justify-center">
            <div className="w-full max-w-4xl px-4 sm:px-6 py-4 sm:py-6">
              <Routes>
                <Route path="/" element={<Login url={url}/>} />
                <Route path="/add" element={<Add url={url}/>} />
                <Route path="/list" element={<List url={url}/>} />
                <Route path="/orders" element={<Orders url={url}/>} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
