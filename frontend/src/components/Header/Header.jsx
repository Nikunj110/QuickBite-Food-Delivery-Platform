import React from "react";

const Header = () => {
  return (
    <div className="relative w-full mt-[64px]">
      <div
        className="h-[70vh] min-h-[500px] w-full bg-cover bg-center bg-gray-900"
        style={{backgroundImage: 'url(/h2.jpg)'}}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex items-center">
        <div className="w-full px-6 md:px-8 max-w-[1200px] mx-auto text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-2xl leading-tight">
            Order your favourite food here
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed mb-8">
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <a href="#explore-menu" className="inline-block">
            <button className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              View Menu
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
