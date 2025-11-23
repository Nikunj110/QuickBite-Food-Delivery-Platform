import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ onMobileClose }) => {
  const handleNavClick = () => {
    // Close mobile sidebar when a link is clicked
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <div className='w-64 shrink-0 h-full border-r border-neutral-200 bg-white/60 backdrop-blur overflow-y-auto'>
      <div className="py-4">
        <nav className="flex flex-col">
          <NavLink 
            to='add' 
            onClick={handleNavClick}
            className={({isActive})=>`flex items-center gap-3 px-5 py-3 text-sm font-medium hover:bg-neutral-50 ${isActive? 'text-black bg-neutral-50 border-l-4 border-orange-500':'text-neutral-700'}`}
          >
            <img className="w-5" src={assets.add_icon} alt="" />
            <span>Add Items</span>
          </NavLink>
          <NavLink 
            to='list' 
            onClick={handleNavClick}
            className={({isActive})=>`flex items-center gap-3 px-5 py-3 text-sm font-medium hover:bg-neutral-50 ${isActive? 'text-black bg-neutral-50 border-l-4 border-orange-500':'text-neutral-700'}`}
          >
            <img className="w-5" src={assets.order_icon} alt="" />
            <span>List Items</span>
          </NavLink>
          <NavLink 
            to='orders' 
            onClick={handleNavClick}
            className={({isActive})=>`flex items-center gap-3 px-5 py-3 text-sm font-medium hover:bg-neutral-50 ${isActive? 'text-black bg-neutral-50 border-l-4 border-orange-500':'text-neutral-700'}`}
          >
            <img className="w-5" src={assets.order_icon} alt="" />
            <span>Orders</span>
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
