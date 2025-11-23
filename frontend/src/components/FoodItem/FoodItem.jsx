import React, { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const {cartItems,addToCart,removeFromCart,url,token}=useContext(StoreContext); 

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 group hover:border-gray-300">
      <div className="relative mb-4">
        <img 
          src={url+"/images/"+image} 
          alt={name} 
          className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" 
        />
        {!cartItems[id] ? (
          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm rounded-full p-2 hover:bg-black transition-colors">
            <img
              className="w-6 h-6 cursor-pointer"
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt="Add"
            />
          </div>
        ) : (
          <div className="absolute bottom-3 right-3 flex items-center gap-3 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200">
            <img 
              className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" 
              onClick={()=>removeFromCart(id)} 
              src={assets.remove_icon_red} 
              alt="Remove" 
            />
            <p className="min-w-5 text-sm font-semibold text-gray-900 text-center">{cartItems[id]}</p>
            <img 
              className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" 
              onClick={()=>addToCart(id)} 
              src={assets.add_icon_green} 
              alt="Add" 
            />
          </div>
        )}
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-lg truncate">{name}</h3>
          <img className="h-5" src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-black">${price}</p>
          <div className="text-xs text-gray-500 font-medium">
            {cartItems[id] ? `${cartItems[id]} in cart` : 'Add to cart'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
