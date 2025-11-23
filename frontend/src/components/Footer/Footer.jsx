import React from "react";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="mt-20 bg-gray-50 border-t border-gray-200" id="footer">
      <div className="app py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <span className="inline-block text-3xl font-extrabold tracking-wide text-orange-500 mb-6 select-none">QuickBite</span>
          <p className="text-gray-600 leading-relaxed mb-6">
            We are committed to delivering exceptional food experiences with quality ingredients, 
            innovative recipes, and outstanding service. Join us in creating memorable dining moments.
          </p>
          <div className="flex items-center gap-4">
            <img className="h-6 cursor-pointer hover:opacity-70 transition-opacity" src={assets.facebook_icon} alt="Facebook" />
            <img className="h-6 cursor-pointer hover:opacity-70 transition-opacity" src={assets.twitter_icon} alt="Twitter" />
            <img className="h-6 cursor-pointer hover:opacity-70 transition-opacity" src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Company</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="cursor-pointer hover:text-black transition-colors">Home</li>
            <li className="cursor-pointer hover:text-black transition-colors">About us</li>
            <li className="cursor-pointer hover:text-black transition-colors">Delivery</li>
            <li className="cursor-pointer hover:text-black transition-colors">Privacy Policy</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Get in touch</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              +92-308-4900522
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              contact@quickbite.com
            </li>
          </ul>
        </div>
      </div>
      
      <hr className="border-gray-200" />
      <p className="app py-6 text-center text-sm text-gray-500">
        Copyright 2024 @ QuickBite.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
