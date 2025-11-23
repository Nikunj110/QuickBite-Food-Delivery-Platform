import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Orders = ({ url }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrder = async () => {
    const response = await axios.get(url + "/api/order/list", {
      headers: { token },
    });
    if (response.data.success) {
      setOrders(response.data.data);
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(
      url + "/api/order/status",
      {
        orderId,
        status: event.target.value,
      },
      { headers: { token } }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchAllOrder();
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    if (!admin && !token) {
      toast.error("Please Login First");
      navigate("/");
    }
    fetchAllOrder();
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">Order Page</h3>
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="bg-white border border-neutral-200 rounded-xl p-4 flex items-start gap-4">
              <img className="w-10" src={assets.parcel_icon} alt="" />
              <div className="flex-1">
                <p className="font-medium text-neutral-900">
                  {order.items.map((item, idx) => idx === order.items.length - 1 ? `${item.name} x ${item.quantity}` : `${item.name} x ${item.quantity}, `)}
                </p>
                <p className="text-sm text-neutral-700">{order.address.firstName + " " + order.address.lastName}</p>
                <p className="text-sm text-neutral-600">{order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                <p className="text-sm text-neutral-700">{order.address.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Items: {order.items.length}</p>
                <p className="font-semibold">${order.amount}</p>
                <select className="mt-2 border border-neutral-300 rounded-md px-2 py-1 text-sm" onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
