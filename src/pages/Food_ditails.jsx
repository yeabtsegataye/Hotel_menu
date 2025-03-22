import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useGetfoodbyidQuery } from "../features/auth/authApiSlice"; // Import your API slice
import { useCart } from "../context/CartContext"; // Import the useCart hook
import F_img from '../assets/food.png';

export const FoodDetails = () => {
  const { id } = useParams(); // Get food ID from URL params
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Access the addToCart function from the context

  // Fetch food details using the API
  const {
    data: food,
    isLoading,
    isError,
    error,
  } = useGetfoodbyidQuery({ hotelID: "your-hotel-id", id }); // Replace "your-hotel-id" with the actual hotel ID

  // State for selected ingredients, comments, and new comment
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: "Current User",
        comment: newComment,
        avatar: F_img,
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  // Handle ingredient selection
  const handleIngredientSelect = (ingredientId) => {
    if (selectedIngredients.includes(ingredientId)) {
      setSelectedIngredients(selectedIngredients.filter((id) => id !== ingredientId));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientId]);
    }
  };

  // Handle adding the food item to the cart
  const handleAddToCart = () => {
    if (food) {
      const itemToAdd = {
        id: food.id,
        name: food.name,
        price: parseFloat(food.price),
        image: food.image || F_img,
        quantity: 1, // Default quantity
        selectedIngredients, // Include selected ingredients
      };
      addToCart(itemToAdd); // Add the item to the cart
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading food details...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error?.data?.message || "Failed to fetch food details"}</p>
      </div>
    );
  }

  // If no food data is found
  if (!food) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">No food details found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen mt-16 flex flex-col items-center bg-gray-100 pb-10 overflow-hidden"
    >
      {/* Curved Blue Background */}
      <div className="relative w-full h-64 bg-blue-400 flex flex-col justify-center items-center rounded-b-[50%]">
        {/* Title with responsive gap */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-8 mb-4 text-center px-4 mt-48">
          {food.name}
        </h1>

        {/* Image positioned at the center of the end of the blue curve */}
        <motion.img
          src={`${import.meta.env.VITE_API_URL}/${food.image}` || F_img}
          alt={food.name}
          className="w-64 h-64 rounded-full shadow-lg border-4 border-white transform -translate-y-12 mt-16"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </div>

      {/* Back Button */}
      <button
        className="absolute top-6 left-6 flex items-center text-white text-lg font-semibold hover:underline mb-4"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="mr-2" />
      </button>

      {/* Food Info */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-2xl rounded-lg shadow-lg mt-24 p-6 text-gray-900"
      >
        {/* Add (+) Button */}
        <div className="flex justify-center mt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white text-2xl rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 ease-in-out transform hover:shadow-xl"
            onClick={handleAddToCart} // Call handleAddToCart when clicked
          >
            +
          </motion.button>
        </div>

        {/* Price */}
        <div className="flex justify-center items-center my-6">
          <span className="text-2xl font-bold">${food.price}</span>
        </div>

        {/* Ingredients Selection */}
        <h2 className="text-xl font-semibold mt-4 mb-9">Ingredients</h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {food.ingredients?.map((ingredient) => (
            <label
              key={ingredient.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <input
                  type="checkbox"
                  checked={selectedIngredients.includes(ingredient.id)}
                  onChange={() => handleIngredientSelect(ingredient.id)}
                  className="opacity-0 absolute w-5 h-5 cursor-pointer"
                />
                <div className="w-5 h-5 bg-white border-2 border-blue-500 rounded-md flex items-center justify-center">
                  {selectedIngredients.includes(ingredient.id) && (
                    <svg
                      className="w-4 h-4 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  )}
                </div>
              </motion.div>
              <span className="text-lg">{ingredient.name}</span>
            </label>
          ))}
        </div>

        {/* Description */}
        <h2 className="text-xl font-semibold mt-6">Description</h2>
        <p className="text-gray-600 mt-2">{food.description}</p>

        {/* Rating */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Rating</h2>
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-6 h-6 ${
                  star <= Math.round(food.rate)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-gray-600">({food.rate})</span>
          </div>
        </div>

        {/* Time of Completion */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Time of Completion</h2>
          <p className="text-gray-600 mt-2">{food.timeOfComplition}</p>
        </div>

        {/* Facebook-like Commenting Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Comments</h2>
          <div className="mt-2 space-y-4">
            {/* Add Comment */}
            <div className="flex items-start space-x-2">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2a5 5 0 110 10 5 5 0 010-10zm-7 16c0-3.314 2.686-6 6-6h2c3.314 0 6 2.686 6 6a1 1 0 01-1 1H6a1 1 0 01-1-1z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg resize-none"
                  rows="2"
                  placeholder="Write a comment..."
                ></textarea>
                <button
                  onClick={handleAddComment}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Comment
                </button>
              </div>
            </div>

            {/* Comments List */}
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-2">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2a5 5 0 110 10 5 5 0 010-10zm-7 16c0-3.314 2.686-6 6-6h2c3.314 0 6 2.686 6 6a1 1 0 01-1 1H6a1 1 0 01-1-1z"
                    />
                  </svg>
                </div>
                <div className="flex-1 bg-gray-100 p-3 rounded-lg">
                  <h4 className="font-semibold">{comment.user}</h4>
                  <p className="text-gray-600">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};