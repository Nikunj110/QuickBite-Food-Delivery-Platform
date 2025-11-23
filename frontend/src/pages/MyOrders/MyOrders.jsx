import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Clock, CheckCircle, Truck, AlertCircle } from "lucide-react";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'out_for_delivery':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'cancelled':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="app mt-24 mb-16">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

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
            <Package className="w-10 h-10 text-black" />
            My Orders
          </h1>
          <p className="text-gray-600 text-lg">
            Track your order status and view order history
          </p>
        </div>

        {data.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">No orders yet</h3>
            <p className="text-gray-500 mb-8">Start ordering delicious food to see your orders here!</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {data.map((order, index) => (
                <motion.div
                  key={order._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
                    {/* Order Icon */}
                    <div className="flex items-center justify-center lg:justify-start">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <img src={assets.parcel_icon} alt="Order" className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="lg:col-span-2">
                      <h3 className="font-semibold text-gray-900 mb-2">Order Items</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {order.items.map((item, idx) => (
                          <span key={idx}>
                            {item.name} × {item.quantity}
                            {idx < order.items.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </p>
                    </div>

                    {/* Amount */}
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                      <p className="text-xl font-bold text-black">${order.amount}</p>
                    </div>

                    {/* Items Count */}
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Items</p>
                      <p className="text-lg font-semibold text-gray-900">{order.items.length}</p>
                    </div>

                    {/* Status */}
                    <div className="text-center">
                      <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                    </div>
                  </div>

                  {/* Order Details (Mobile) */}
                  <div className="lg:hidden mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Amount:</p>
                        <p className="font-semibold text-gray-900">${order.amount}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Items:</p>
                        <p className="font-semibold text-gray-900">{order.items.length}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyOrders;
