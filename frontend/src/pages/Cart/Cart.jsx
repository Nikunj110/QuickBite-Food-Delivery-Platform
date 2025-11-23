import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, CreditCard } from "lucide-react";

const Cart = () => {
  const {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const cartItemsList = food_list.filter(item => cartItems[item._id] > 0);

  return (
    <div className="w-full mt-32 mb-16">
      <div className="bg-gradient-to-r from-white via-gray-50 to-white border-b border-gray-100 py-6">
        <div className="app">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Your Cart</h1>
          </div>
        </div>
      </div>
      <div className="app mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <ShoppingBag className="w-8 h-8 text-black" />
            {cartItemsList.length === 0 ? "Your cart is empty" : `${cartItemsList.length} item${cartItemsList.length>1?'s':''} in your cart`}
          </h2>
        </div>

        {cartItemsList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h3>
            <p className="text-gray-500 mb-8">Add some delicious items to get started!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              Continue Shopping
            </button>
          </motion.div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
              {/* Desktop Header */}
              <div className="hidden md:block bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-600">
                  <div className="col-span-2">Image</div>
                  <div className="col-span-4">Item</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-1 text-center">Total</div>
                  <div className="col-span-1 text-center">Action</div>
                </div>
              </div>

              <AnimatePresence>
                {cartItemsList.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="px-4 md:px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    {/* Desktop Layout */}
                    <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2">
                        <img 
                          src={url+"/images/"+item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                      <div className="col-span-4">
                        <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                        <p className="text-gray-500 text-sm">Item #{item._id}</p>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="font-semibold text-gray-900">${item.price}</span>
                      </div>
                      <div className="col-span-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <span className="font-semibold text-gray-900 min-w-[2rem]">{cartItems[item._id]}</span>
                          <button
                            onClick={() => addToCart(item._id)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-span-1 text-center">
                        <span className="font-bold text-black">${(item.price * cartItems[item._id]).toFixed(2)}</span>
                      </div>
                      <div className="col-span-1 text-center">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={url+"/images/"+item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-gray-500 text-sm">Item #{item._id}</p>
                          <p className="font-semibold text-gray-900">${item.price}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <span className="font-semibold text-gray-900 min-w-[2rem] text-center">{cartItems[item._id]}</span>
                          <button
                            onClick={() => addToCart(item._id)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="font-bold text-black">${(item.price * cartItems[item._id]).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Cart Bottom */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Cart Total */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <CreditCard className="w-6 h-6" />
                  Cart Totals
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
                    <span className="text-lg md:text-xl font-bold text-gray-900">Total</span>
                    <span className="text-xl md:text-2xl font-bold text-black">
                      ${getTotalCartAmount() === 0 ? 0 : (getTotalCartAmount() + 2).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/order')}
                  className="w-full bg-black text-white py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Proceed to Checkout
                </button>
              </motion.div>

              {/* Promo Code */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Have a Promo Code?</h3>
                <p className="text-gray-600 mb-6">Enter your promo code to get exclusive discounts</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    placeholder="Enter promo code" 
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition-all"
                  />
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors whitespace-nowrap">
                    Apply
                  </button>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    💡 <strong>Tip:</strong> Check your email for exclusive promo codes!
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </motion.div>
      </div>
    </div>
  );
};

export default Cart;
