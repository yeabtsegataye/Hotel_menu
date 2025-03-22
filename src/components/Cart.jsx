import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext"; // Adjust the import path as necessary
import { useToast } from "@chakra-ui/react";
import { useAddorderMutation } from "../features/auth/authApiSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const Cart = () => {
  const toast = useToast();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart(); // Add clearCart function
  const [addorder, { isLoading }] = useAddorderMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const orderTable = searchParams.get("order_table");
  const id = searchParams.get("hotel");
  const navigate = useNavigate();
  console.log(id, orderTable);

  const taxRate = 0.15;
  const subtotal = cart.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleIncreaseQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };
  //////////////////////////
  const handle_submit = async () => {
    if (!id || !orderTable) {
      toast({
        title: "Missing hotel ID or order table.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const orderData = cart.map((item) => ({
      foodId: item.id,
      quantity: item.quantity,
      orderTable: orderTable,
      hotelId: parseInt(id, 10),
    }));

    try {
      setIsSubmitting(true);
      const response = await addorder(orderData).unwrap();

      if (response.orders) {
        toast({
          title: "Order placed successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Check for existing orders in localStorage
        const existingOrders = localStorage.getItem("orders");
        let updatedOrders = [];

        if (existingOrders) {
          updatedOrders = JSON.parse(existingOrders);

          // Iterate through new orders and update quantities if they already exist
          response.orders.forEach((newOrder) => {
            const existingOrderIndex = updatedOrders.findIndex(
              (order) => order.food.id === newOrder.food.id
            );

            if (existingOrderIndex !== -1) {
              // If the order already exists, update the quantity
              updatedOrders[existingOrderIndex].quantity += newOrder.quantity;
            } else {
              // If the order doesn't exist, add it to the list
              updatedOrders.push(newOrder);
            }
          });
        } else {
          // If no existing orders, use the new orders directly
          updatedOrders = response.orders;
        }

        // Save the updated orders to localStorage
        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        // Only set orderStartTime if it doesn't already exist
        if (!localStorage.getItem("orderStartTime")) {
          localStorage.setItem("orderStartTime", Date.now());
        }

        clearCart(); // Clear the cart after successful submission
        navigate(`/myOrder?order_table=${orderTable}&hotel=${id}`); // Navigate to MyOrder page
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      toast({
        title: "Failed to place order.",
        description: error.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Food Cart</h2>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative flex items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200 text-sm"
            >
              ×
            </button>
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
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600 font-medium">
                ${Number(item.price).toFixed(2)}
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
            <span className="text-gray-600">Tax ({taxRate * 100}%)</span>
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
        <button
          onClick={() => {
            toast({
              title: "Coming soon...",
              status: "info",
              duration: 3000,
              isClosable: true,
            });
          }}
          className="flex-1 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Checkout
        </button>
        <button
          onClick={handle_submit}
          className="flex-1 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          {isSubmitting ? <Spinner size="sm" /> : "Order Without Paying"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
