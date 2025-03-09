import React, { useState } from "react";
import { FaShoppingCart, FaUser, FaTimes, FaBook } from "react-icons/fa";
import { motion } from "framer-motion";
import Cart from "./Cart"; // Import Cart component
import {Link} from 'react-router-dom'
export const Header = () => {
  const [showCart, setShowCart] = useState(false);

  return (
    <header className="bg-blue-400 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* App Name */}
        <div className="text-2xl font-bold">My Restaurant</div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
        <Link to={'/myOrder'}>
        <FaBook className="text-2xl cursor-pointer hover:text-blue-200 transition-colors"/>
        </Link >

          {/* Cart Icon */}
          <div className="relative">
            <FaShoppingCart
              className="text-3xl cursor-pointer hover:text-blue-200 transition-colors"
              onClick={() => setShowCart(true)}
            />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              3 {/* Cart item count */}
            </span>
          </div>

          {/* User Icon */}
          <Link to={'/auth'}>
           <FaUser className="text-2xl cursor-pointer hover:text-blue-200 transition-colors" />
          </Link>
        </div>
      </div>

      {/* Full-Screen Cart Overlay */}
      {showCart && (
        <motion.div
          initial={{ y: "-100%", opacity: 0 }} // Drop-down animation
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-0 left-0 w-full h-full bg-white shadow-xl z-50 flex flex-col"
        >
          {/* Close Button */}
          <div className="flex justify-between items-center p-4 bg-blue-400 shadow-md">
            {/* <h2 className="text-xl font-bold">Your Cart</h2> */}
            <FaTimes
              className="text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
              onClick={() => setShowCart(false)}
            />
          </div>

          {/* Scrollable Cart Content */}
          <div className="flex-1 overflow-y-auto">
            <Cart />
          </div>
        </motion.div>
      )}
    </header>
  );
};
