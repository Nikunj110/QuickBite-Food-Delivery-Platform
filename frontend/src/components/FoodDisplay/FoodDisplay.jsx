import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, loading, error } = useContext(StoreContext);
  
  // Debug logging
  useEffect(() => {
    console.log("FoodDisplay render:", { food_list, loading, error, category });
  }, [food_list, loading, error, category]);
  
  if (loading) {
    console.log("Showing loading state");
    return (
      <div className="w-full bg-gradient-to-b from-white via-orange-50 to-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading delicious food...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.log("Showing error state:", error);
    return (
      <div className="w-full bg-gradient-to-b from-white via-orange-50 to-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">🍕</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!food_list || food_list.length === 0) {
    console.log("Showing empty state, food_list:", food_list);
    return (
      <div className="w-full bg-gradient-to-b from-white via-orange-50 to-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No food items found</h3>
          <p className="text-gray-600">Check back later for delicious meals!</p>
        </div>
      </div>
    );
  }

  console.log("Showing food list with", food_list.length, "items");
  return (
    <div className="w-full bg-gradient-to-b from-white via-orange-50 to-white" id="food-display">
      <div className="w-full pt-10">
        <div className="p-2 mb-6 text-center max-w-[1200px] mx-auto px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            {category === "All" ? "All Dishes" : `${category} Dishes`}
          </h2>
          <div className="mt-3 h-1 w-16 bg-black mx-auto rounded-full"/>
        </div>
        <div className="mb-8" />
      </div>
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-10">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={item._id || index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
