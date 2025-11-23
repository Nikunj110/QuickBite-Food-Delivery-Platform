import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const List = ({ url }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [list, setList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Failed to fetch food list");
    }
  };

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowConfirm(true);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setItemToDelete(null);
  };

  const removeFood = async () => {
    if (!itemToDelete) return;
    
    try {
      const response = await axios.post(
        `${url}/api/food/remove`,
        { id: itemToDelete._id },
        { headers: { token } }
      );
      
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh the list
      } else {
        toast.error(response.data.message || "Error removing food");
      }
    } catch (error) {
      console.error("Error removing food:", error);
      toast.error("Failed to remove food item");
    } finally {
      setShowConfirm(false);
      setItemToDelete(null);
    }
  };

  useEffect(() => {
    if (!admin && !token) {
      toast.error("Please Login First");
      navigate("/");
    } else {
      fetchList();
    }
  }, [admin, token, navigate]);

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto">
        <p className="text-2xl font-bold text-neutral-900 mb-4">All Food List</p>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <div className="grid grid-cols-12 bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-700">
            <div className="col-span-3">Image</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-3">Category</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-1 text-center">Action</div>
          </div>
          {list.map((item, index) => (
            <div key={item._id || index} className="grid grid-cols-12 items-center px-4 py-3 border-t border-neutral-100 text-sm">
              <div className="col-span-3">
                <img className="w-14 h-14 object-cover rounded-lg border" src={`${url}/images/` + item.image} alt={item.name} />
              </div>
              <div className="col-span-3">{item.name}</div>
              <div className="col-span-3">{item.category}</div>
              <div className="col-span-2">${item.price}</div>
              <div className="col-span-1 text-center">
                <button 
                  onClick={() => confirmDelete(item)} 
                  className="px-3 py-1.5 bg-red-600 text-white rounded-md text-xs hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl border border-white/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove "{itemToDelete?.name}"? This action cannot be undone and will also remove it from all user carts and orders.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={removeFood}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
