import React, { useState } from "react";
import { motion } from "framer-motion";

const Cart = () => {
  // Sample cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Classic Caesar Salad",
      price: 12.99,
      quantity: 1,
      image:
        "https://i.pinimg.com/736x/27/f5/fc/27f5fc9e83acd8ba29a8e3ed9ed2df62.jpg", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Grilled Chicken",
      price: 15.99,
      quantity: 2,
      image:
        "https://i.pinimg.com/736x/27/f5/fc/27f5fc9e83acd8ba29a8e3ed9ed2df62.jpg",
    },
    {
      id: 3,
      name: "Garlic Bread",
      price: 5.99,
      quantity: 1,
      image:
        "https://i.pinimg.com/736x/27/f5/fc/27f5fc9e83acd8ba29a8e3ed9ed2df62.jpg",
    },
  ]);

  // Tax rate (e.g., 10%)
  const taxRate = 0.1;

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate tax
  const tax = subtotal * taxRate;

  // Calculate total
  const total = subtotal + tax;

  // Handle quantity increase
  const handleIncreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Handle item removal
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Food Cart</h2>

      {/* Cart Items */}
      <div className="space-y-4" >
        {cartItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative flex items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            {/* Remove Button (Top-Right Corner) */}
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200 text-sm"
            >
              ×
            </button>
            {/* Quantity Controls (Vertically aligned) */}
            <div className="flex flex-col items-center mr-4">
              <button
                onClick={() => handleIncreaseQuantity(item.id)}
                className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors duration-200 text-sm"
              >
                +
              </button>
              <span className="text-lg font-semibold text-gray-800">
                {item.quantity}
              </span>
              <button
                onClick={() => handleDecreaseQuantity(item.id)}
                className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors duration-200 text-sm"
              >
                -
              </button>
            </div>
            {/* Food Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover mr-4"
            />

            {/* Item Details (Name & Price) */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600 font-medium">
                ${item.price.toFixed(2)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-800">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-semibold text-gray-800">
              ${tax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total</span>
            <span className="font-semibold text-gray-800">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <button className="flex-1 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200">
          Order Without Paying
        </button>
        <button className="flex-1 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
