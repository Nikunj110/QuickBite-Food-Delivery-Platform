import React from "react";
import { menu_list } from "../../assets/frontend_assets/assets";

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div id="explore-menu" className="w-full bg-gradient-to-b from-orange-50 via-white to-orange-100/50">
      <div className="w-full pt-10">
        <div className="p-2 text-center max-w-[1200px] mx-auto px-6 md:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">Our Menu</h1>
          <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
            Discover a curated selection of categories to match every craving. Tap a category to filter dishes instantly.
          </p>
        </div>
      </div>
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 py-10">
        {menu_list.map((item, index) => {
          return (
            <div 
              onClick={()=>setCategory(prev=>prev===item.menu_image.name?"All":item.menu_name)} 
              key={index} 
              className="cursor-pointer text-center group"
            >
              <div className={`w-24 h-24 mx-auto rounded-2xl border-2 p-3 transition-all duration-300 mb-3 ${
                category===item.menu_name
                  ? "border-orange-500 scale-110 shadow-lg bg-orange-50"
                  : "border-gray-200 group-hover:border-gray-400 group-hover:scale-105"
              }`}>
                <img 
                  className="w-full h-full object-cover rounded-xl" 
                  src={item.menu_image} 
                  alt={item.menu_name} 
                />
              </div>
              <p className={`text-sm font-semibold transition-colors ${
                category===item.menu_name ? "text-orange-700" : "text-gray-700 group-hover:text-gray-900"
              }`}>
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      
      <div className="w-full pb-0" />
    </div>
  );
};

export default ExploreMenu;
