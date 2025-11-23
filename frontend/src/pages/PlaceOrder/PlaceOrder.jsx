import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { MapPin, CreditCard, ShoppingBag, ArrowRight } from "lucide-react";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    
    let response = await axios.post(url+"/api/order/place", orderData, {headers: {token}});
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    } else {
      toast.error("Errors!")
    }
  };

  useEffect(() => {
    if(!token){
      toast.error("Please Login first")
      navigate("/cart")
    }
    else if(getTotalCartAmount() === 0){
      toast.error("Please Add Items to Cart");
      navigate("/cart")
    }
  }, [token])

  return (
    <div className="app pt-28 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <MapPin className="w-10 h-10 text-black" />
            Complete Your Order
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Please provide your delivery information to complete your order
          </p>
        </div>

        <form onSubmit={placeOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Delivery Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                Delivery Information
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    required
                    name="firstName"
                    value={data.firstName}
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="First name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    required
                    name="lastName"
                    value={data.lastName}
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="Last name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition-all"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  required
                  name="email"
                  value={data.email}
                  onChange={onChangeHandler}
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition-all"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input
                  required
                  name="street"
                  value={data.street}
                  onChange={onChangeHandler}
                  type="text"
                  placeholder="Street Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    required
                    name="city"
                    value={data.city}
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    required
                    name="state"
                    value={data.state}
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="State"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                  <input
                    required
                    name="zipcode"
                    value={data.zipcode}
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="Zip Code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    required
                    name="country"
                    value={data.country}
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="Country"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition-all"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  required
                  name="phone"
                  value={data.phone}
                  onChange={onChangeHandler}
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition-all"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Side - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" />
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">${getTotalCartAmount().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold text-gray-900">${getTotalCartAmount() === 0 ? 0 : 2}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-black">
                    ${getTotalCartAmount() === 0 ? 0 : (getTotalCartAmount() + 2).toFixed(2)}
                  </span>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
              >
                <CreditCard className="w-5 h-5" />
                Proceed to Payment
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Order Items Preview */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Items in Cart</h3>
              <div className="space-y-3">
                {food_list.map((item) => {
                  if (cartItems[item._id] > 0) {
                    return (
                      <div key={item._id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center gap-3">
                          <img 
                            src={url+"/images/"+item.image} 
                            alt={item.name} 
                            className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {cartItems[item._id]}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-gray-900">${(item.price * cartItems[item._id]).toFixed(2)}</span>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default PlaceOrder;
